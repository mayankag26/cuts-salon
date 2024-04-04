import connectMongoDB from "@/libs/mongodb";
import Salons from "@/models/salons";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { email } = await req.json();
    const user = await Salons.findOne({ email }).select("_id");
    console.log("Salon: ", user);
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}
