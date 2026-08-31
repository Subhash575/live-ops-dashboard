import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const bookingSchema = new Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
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
      make: String,
      model: String,
      year: Number,
    },

    service: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
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

module.exports = mongoose.model("Booking", bookingSchema);
