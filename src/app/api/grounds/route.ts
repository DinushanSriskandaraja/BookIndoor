import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Ground from "@/models/Grounds";
import { verifyToken } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";

interface SportInput {
  name: string;
  pricePerHour: number;
}

// ✅ CREATE Ground
export async function POST(req: Request) {
  try {
    await dbConnect();

    const formData = await req.formData();

    const token = formData.get("token") as string;
    const name = formData.get("name") as string;
    const contactNumber = formData.get("contactNumber") as string;
    const groundType = formData.get("groundType") as string;

    // ✅ Token check
    const decoded = verifyToken(token);
    if (!decoded || !["admin", "super_admin"].includes(decoded.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // ✅ Owner fallback
    const ownerId = (formData.get("ownerId") as string) || decoded.id;

    if (!name || !contactNumber || !groundType || !ownerId) {
      return NextResponse.json(
        { error: "Missing required fields: name, contact, type, or owner" },
        { status: 400 }
      );
    }

    const location = {
      address: formData.get("location[address]") as string,
      lat: formData.get("location[lat]") ? Number(formData.get("location[lat]")) : undefined,
      lng: formData.get("location[lng]") ? Number(formData.get("location[lng]")) : undefined,
    };

    if (!location.address) {
      return NextResponse.json({ error: "Location address is required" }, { status: 400 });
    }

    const availableTime = {
      from: formData.get("availableTime[from]") as string,
      to: formData.get("availableTime[to]") as string,
    };

    if (!availableTime.from || !availableTime.to) {
      return NextResponse.json({ error: "Available time is required" }, { status: 400 });
    }

    const sportsRaw = formData.get("sports");
    const sports = sportsRaw ? (JSON.parse(sportsRaw as string) as SportInput[]) : [];

    if (sports.length === 0 || sports.some(s => !s.name || !s.pricePerHour)) {
      return NextResponse.json({ error: "Valid sports list is required" }, { status: 400 });
    }

    const amenitiesRaw = formData.get("amenities");
    const amenities = amenitiesRaw ? (JSON.parse(amenitiesRaw as string) as string[]) : [];

    // ✅ Upload images to Cloudinary
    const images: string[] = [];
    const files = formData.getAll("images") as File[];

    for (const file of files) {
      if (!(file instanceof File)) continue;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString("base64");
      const dataURI = `data:${file.type};base64,${base64}`;

      const uploadRes = await cloudinary.uploader.upload(dataURI, {
        folder: "grounds",
      });

      images.push(uploadRes.secure_url);
    }

    const ground = await Ground.create({
      name,
      location,
      contactNumber,
      groundType,
      owner: ownerId,
      sports,
      availableTime,
      amenities,
      images,
    });

    return NextResponse.json({ success: true, ground });
  } catch (err: any) {
    console.error("Ground Creation Error:", err);
    if (err.name === "ValidationError") {
      return NextResponse.json(
        { error: "Validation Failed", details: err.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create ground" },
      { status: 500 }
    );
  }
}

// ✅ GET all Grounds
export async function GET(req: Request) {
  try {
    await dbConnect();

    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1]; // Bearer token

    const decoded = token ? verifyToken(token) : null;

    let grounds;
    if (decoded && decoded.role === "super_admin") {
      grounds = await Ground.find().populate("owner", "name email role");
    } else if (decoded && decoded.role === "admin") {
      grounds = await Ground.find({ owner: decoded.id }).populate(
        "owner",
        "name email"
      );
    } else {
      grounds = await Ground.find().select(
        "name location sports images availableTime"
      );
    }

    return NextResponse.json(grounds);
  } catch (err: unknown) {
    console.error("Ground Fetch Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch grounds" },
      { status: 500 }
    );
  }
}
