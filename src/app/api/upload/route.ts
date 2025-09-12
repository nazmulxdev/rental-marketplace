import { NextResponse } from "next/server";
import cloudinary from "../../../lib/cloudinary";

export async function POST(req: Request) {
  try {
    const imageData = await req.formData();
    const file = imageData.get("file") as File;
    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded yet." },
        { status: 400 },
      );
    }

    // converting file to buffer base64
    const bufferImage = await file.arrayBuffer();
    const buffer = Buffer.from(bufferImage);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const uploadResponse = await cloudinary.uploader.upload(base64, {
      folder: "rental-marketplace",
    });

    return NextResponse.json(
      { url: uploadResponse.secure_url },
      { status: 201 },
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
