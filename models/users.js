import mongoose, { Schema, models } from "mongoose"

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    contactNo : {
      type: Number
    },
    address : {
      type:String
    },
    bookings : {
      type: []  //array containing booking ids
    }
  },
  { timestamps: true }
);

const Users = models?.Users || mongoose.model("Users", userSchema);

export default Users;