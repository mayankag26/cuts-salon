import mongoose, { Schema, models } from "mongoose"
import Users from "./users";
import Salons from "./salons";

const bookingsSchema = new Schema(
    {
        userid: {
            type: String
        },
        salonid: {
            type: String
        },
        useremail: {
            type: String
        },
        status: {
            type: Boolean
        },
        queueNo: {
            type: Number //time of booking, not which slot but time at which queue number booked by user
        },
        rating: {
            type: Number //rating given by user
        },
        review: {
            type: String //comment/review given by user
        },
        reviewImages: {
            type: [] //array containing links of images
        },
    },
    { timestamps: true }
);

const Bookings = models?.Bookings || mongoose.model("Bookings", bookingsSchema);

export default Bookings;