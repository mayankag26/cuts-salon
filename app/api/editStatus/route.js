import connectMongoDB from "@/libs/mongodb";
import Bookings from "@/models/bookings";
import Salons from "@/models/salons";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const { clickedBooking } = await req.json();
    // console.log({clickedBooking});
    await connectMongoDB();
    // const res = await Bookings.findById(clickedBooking._id);
    // const res = await Bookings.findOne({_id : new BSON.ObjectId(clickedBooking._id)});
    // console.log("dsfoks",clickedBooking._id);
    await Bookings.findOneAndUpdate({_id: clickedBooking._id},{ status:true} );
    await Salons.findOneAndUpdate({_id: clickedBooking.salonid},{ currentNumber:clickedBooking.queueNo+1} );
    // console.log({res})

    return NextResponse.json({ message: "Status updated." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "error : ",error },
      { status: 500 },
      {new:true}
    );
  }
}