import connectMongoDB from "@/libs/mongodb";
import UserInfo from "@/components/UserInfo";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Salons from "@/models/salons";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Login() {
    const session = await getServerSession(authOptions);

    if (!session) redirect("/login");
    const emailid = session.user.email;
    // console.log({ emailid });

    try {
        await connectMongoDB();
        var user = await Salons.findOne({ email: emailid });
    }
    catch (err) {
        console.log("Error: ",err);
    }
    // console.log(user);

    return <UserInfo user={user} />;
}