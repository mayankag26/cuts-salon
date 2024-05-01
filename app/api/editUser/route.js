import connectMongoDB from "@/libs/mongodb";
import Salons from "@/models/salons";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const {name, email, address, city, services,genderServing, salontype,contactNo, openingTime, closingTime, detail } = await req.json();   
    await connectMongoDB();
    // const res = await Bookings.findById(clickedBooking._id);
    // const res = await Bookings.findOne({_id : new BSON.ObjectId(clickedBooking._id)});
    // console.log("dsfoks",clickedBooking._id);
    await Salons.findOneAndUpdate({email: email},{name:name, email:email, address:address, city:city, services:services,genderServing:genderServing, salontype:salontype,contactNo:contactNo, openingTime:openingTime, closingTime:closingTime, detail:detail 
    } );
    // console.log({res})

    return NextResponse.json({ message: "Salon data updated." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "error : ",error },
      { status: 500 },
      {new:true}
    );
  }
}