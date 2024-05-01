import connectMongoDB from "@/libs/mongodb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Salons from "@/models/salons";
import Bookings from "@/models/bookings";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Dashboard from "@/components/Dashboard";
import Users from "@/models/users";

export default async function Login() {
    const session = await getServerSession(authOptions);

    if (!session) redirect("/login");
    // console.log("Session ", session);
    const emailid = session.user.email;

    try {
        await connectMongoDB();
        var salonId = await Salons.findOne({ email: emailid });
        salonId = salonId._id;
        // console.log(salonId);
        var bookings = await Bookings.where("salonid").equals(salonId);
    }
    catch (err) {
        console.log(err);
    }

    try {
        var users = await Promise.all(bookings.map(booking => ( Users.findOne({ email: booking.useremail }))))
    }
    catch (err) {
        console.log(err);
    }

    for (let i = 0; i < bookings.length; i++) bookings[i]._doc.user = users[i] 

    bookings = bookings.sort((a,b)=>{
        return a.queueNo-b.queueNo;
    })

    return <Dashboard bookings={bookings} />
}