import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const bookingSchema = new Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    customerId: {
      type: ObjectId,
      ref: "Customer",
      required: true,
    },

    mechanicId: {
      type: ObjectId,
      ref: "Mechanic",
      default: null,
    },

    vehicle: {
      make: {
        type: String,
        required: true,
        trim: true,
      },

      model: {
        type: String,
        required: true,
        trim: true,
      },

      year: {
        type: Number,
        required: true,
      },
    },

    service: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "ASSIGNED", "ON_THE_WAY", "COMPLETED", "CANCELLED"],
      default: "PENDING",
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    scheduledAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
