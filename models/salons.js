import mongoose, { Schema, models } from "mongoose"

const SalonSchema = new Schema(
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
    address: {
      type: String
    },
    city: {
      type: String
    },
    images: {
      type: []
    },
    services: {
      type: []    //array of object where each object has key as service and value as price of that service. eg: [ {haircut:100},{trimming:50},....]
    },
    rating: {
      type: Number
    },
    reviews: {
      type: []  //array of two object, first object with key images and other object with key comments
    },
    salontype: {
      type: String  //two options - "salon" and "individual"
    },

    //for salon type "salon"
    openingTime: {
      type: Number
    },
    closingTime: {
      type: Number
    },
    currentNumber : {
      type: Number
    },
    availableNumber : {
      type: Number
    },

    //for salon type "individual"
    timeSlots : {
      type: []  //array of objects with key as time slot and value 0 or 1 specifiying slot available or booked. eg. [ {9-10,1},{10-11,0} ]
    }
  },
  { timestamps: true }
);

const Salons = models?.Salons || mongoose.model("Salons", SalonSchema);

export default Salons;