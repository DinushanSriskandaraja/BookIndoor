import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Ground, { IGround } from "@/models/Grounds";
import { verifyToken } from "@/lib/auth";

type Params = { params: { id: string } };

// Define a safe error interface
// interface AppError extends Error {
//   name: string;
//   errors?: Record<string, unknown>;
// }

/** ✅ GET GROUND BY ID **/
export async function GET(
  req: NextRequest,
  context: Params | { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } =
      context.params instanceof Promise ? await context.params : context.params;

    const url = new URL(req.url);
    const token = url.searchParams.get("token");
    const decoded = token ? verifyToken(token) : null;

    let ground: IGround | null = null;

    if (decoded) {
      if (["admin", "super_admin"].includes(decoded.role)) {
        ground = await Ground.findById(id).populate("owner", "name email role");
      } else {
        ground = await Ground.findById(id);
      }
    } else {
      ground = await Ground.findById(id);
    }

    if (!ground) {
      return NextResponse.json({ error: "Ground not found" }, { status: 404 });
    }

    if (
      decoded &&
      (["admin", "super_admin"].includes(decoded.role) ||
        decoded.id === String(ground.owner?._id))
    ) {
      return NextResponse.json(ground);
    }

    const publicGround = {
      name: ground.name,
      location: ground.location,
      sports: ground.sports,
      images: ground.images,
      availableTime: ground.availableTime,
      amenities: ground.amenities,
    };

    return NextResponse.json(publicGround);
  } catch (err) {
    console.error("Get Ground by ID Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch ground" },
      { status: 500 }
    );
  }
}

/** ✅ UPDATE GROUND **/
export async function PUT(
  req: NextRequest,
  context: Params | { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } =
      context.params instanceof Promise ? await context.params : context.params;

    const formData = await req.formData();
    const token = formData.get("token") as string;
    const decoded = verifyToken(token);
    if (!decoded)
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    const ground = await Ground.findById(id);
    if (!ground)
      return NextResponse.json({ error: "Ground not found" }, { status: 404 });

    if (
      !["admin", "super_admin"].includes(decoded.role) &&
      decoded.id !== String(ground.owner)
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // ✅ Update fields if present in formData
    if (formData.has("name")) ground.name = formData.get("name") as string;
    if (formData.has("contactNumber")) ground.contactNumber = formData.get("contactNumber") as string;
    if (formData.has("groundType")) ground.groundType = formData.get("groundType") as string;

    if (formData.has("location[address]")) {
      ground.location = {
        address: formData.get("location[address]") as string,
        lat: formData.get("location[lat]") ? Number(formData.get("location[lat]")) : ground.location.lat,
        lng: formData.get("location[lng]") ? Number(formData.get("location[lng]")) : ground.location.lng,
      };
    }

    if (formData.has("availableTime[from]") && formData.has("availableTime[to]")) {
      ground.availableTime = {
        from: formData.get("availableTime[from]") as string,
        to: formData.get("availableTime[to]") as string,
      };
    }

    if (formData.has("sports")) {
      ground.sports = JSON.parse(formData.get("sports") as string);
    }

    if (formData.has("amenities")) {
      ground.amenities = JSON.parse(formData.get("amenities") as string);
    }

    // ✅ Handle new images
    const files = formData.getAll("images") as File[];
    if (files.length > 0) {
      const newImages: string[] = [];
      const cloudinary = (await import("@/lib/cloudinary")).default;

      for (const file of files) {
        if (!(file instanceof File)) continue;
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64 = buffer.toString("base64");
        const dataURI = `data:${file.type};base64,${base64}`;

        const uploadRes = await cloudinary.uploader.upload(dataURI, {
          folder: "grounds",
        });
        newImages.push(uploadRes.secure_url);
      }
      // Depending on strategy: either replace or append. Let's append if specific action, but here we replace for simplicity for now.
      ground.images = [...ground.images, ...newImages];
    }

    await ground.save();
    return NextResponse.json({ success: true, ground });
  } catch (err: unknown) {
    console.error("Ground Update Error:", err);
    if (err instanceof Error && err.name === "ValidationError") {
      return NextResponse.json({ error: "Validation Failed", details: err.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to update ground" },
      { status: 500 }
    );
  }
}

/** ✅ DELETE GROUND **/
export async function DELETE(
  req: NextRequest,
  context: Params | { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } =
      context.params instanceof Promise ? await context.params : context.params;

    const { token } = await req.json();
    const decoded = verifyToken(token);
    if (!decoded)
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    const ground = await Ground.findById(id);
    if (!ground)
      return NextResponse.json({ error: "Ground not found" }, { status: 404 });

    if (
      !["admin", "super_admin"].includes(decoded.role) &&
      decoded.id !== String(ground.owner)
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await ground.deleteOne();
    return NextResponse.json({ success: true, message: "Ground deleted" });
  } catch (err) {
    console.error("Ground Delete Error:", err);
    return NextResponse.json(
      { error: "Failed to delete ground" },
      { status: 500 }
    );
  }
}
