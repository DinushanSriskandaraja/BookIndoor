import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Ground from "@/models/Grounds";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import { Readable } from "stream";

interface SportInput {
  name: string;
  pricePerHour: number;
}

interface GroundBody {
  token: string;
  ownerId?: string;
  name: string;
  location: { address: string; lat?: number; lng?: number };
  contactNumber: string;
  groundType: string;
  sports: SportInput[];
  availableTime: { from: string; to: string };
  amenities?: string[];
  images?: string[];
  description?: string;
}

// ✅ CREATE Ground
export async function POST(req: Request) {
  try {
    await dbConnect();

    const formData = await req.formData(); // ✅ works for multipart/form-data

    const token = formData.get("token") as string;
    const ownerId = formData.get("ownerId") as string;
    const name = formData.get("name") as string;
    const contactNumber = formData.get("contactNumber") as string;
    const groundType = formData.get("groundType") as string;

    const location = {
      address: formData.get("location[address]") as string,
      lat: Number(formData.get("location[lat]")),
      lng: Number(formData.get("location[lng]")),
    };

    const availableTime = {
      from: formData.get("availableTime[from]") as string,
      to: formData.get("availableTime[to]") as string,
    };

    const sports = JSON.parse(formData.get("sports") as string);
    const amenities = JSON.parse(formData.get("amenities") as string);

    // ✅ Token check
    const decoded = verifyToken(token);
    if (!decoded || !["admin", "super_admin"].includes(decoded.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // ✅ Upload images to Cloudinary
    const images: string[] = [];
    const files = formData.getAll("images") as File[];

    for (const file of files) {
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
  } catch (err: any) {
    console.error("Ground Fetch Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch grounds" },
      { status: 500 }
    );
  }
}
