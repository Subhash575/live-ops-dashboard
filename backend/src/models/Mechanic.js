import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const mechanicSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["AVAILABLE", "BUSY", "OFFLINE"],
      default: "AVAILABLE",
    },

    jobsCompleted: {
      type: Number,
      default: 0,
      min: 0,
    },

    currentBookingId: {
      //   type: mongoose.Schema.Types.ObjectId,
      type: ObjectId,
      ref: "Booking",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Mechanic = mongoose.model("Mechanic", mechanicSchema);
export default Mechanic;
