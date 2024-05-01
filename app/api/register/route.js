import connectMongoDB from "@/libs/mongodb";
import Salons from "@/models/salons";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password, address, city, services,genderServing, salontype,contactNo, openingTime, closingTime, detail, imagesUrl } = await req.json();
    // console.log(imagesUrl);
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    await Salons.create({ name, email, password: hashedPassword,genderServing, address,contactNo, city,services,salontype,openingTime,closingTime,detail,imagesUrl });

    return NextResponse.json({ message: "Salon registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
