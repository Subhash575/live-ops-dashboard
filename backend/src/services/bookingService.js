import Booking from "../models/Booking.js";
import Customer from "../models/Customer.js";
import Mechanic from "../models/Mechanic.js";
import AppError from "../utils/AppError.js";

const allowedSortFields = [
  "bookingId",
  "status",
  "amount",
  "scheduledAt",
  "createdAt",
];

const allowedStatuses = [
  "PENDING",
  "ASSIGNED",
  "ON_THE_WAY",
  "COMPLETED",
  "CANCELLED",
];

export const getBookingsService = async ({
  search,
  status,
  page = 1,
  limit = 10,
  sortBy = "scheduledAt",
  sortOrder = "desc",
}) => {
  const query = {};

  // Status filtering
  if (status) {
    if (!allowedStatuses.includes(status)) {
      throw new AppError(`Invalid booking status: ${status}`, 400);
    }

    query.status = status;
  }

  // Search
  if (search) {
    const searchRegex = new RegExp(search, "i");

    const customers = await Customer.find({
      $or: [
        { name: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
      ],
    }).select("_id");

    const customerIds = customers.map((customer) => customer._id);

    const mechanics = await Mechanic.find({
      $or: [{ name: searchRegex }, { phone: searchRegex }],
    }).select("_id");

    const mechanicIds = mechanics.map((mechanic) => mechanic._id);

    query.$or = [
      // Booking ID
      { bookingId: searchRegex },

      // Vehicle
      { "vehicle.make": searchRegex },
      { "vehicle.model": searchRegex },

      // Customer
      { customerId: { $in: customerIds } },
      // Mechanic
      { mechanicId: { $in: mechanicIds } },
    ];
  }

  // Pagination Validation
  const pageNumber =
    Number.isInteger(Number(page)) && Number(page) > 0 ? Number(page) : 1;

  const requestedLimit = Number(limit);

  const limitNumber =
    Number.isInteger(requestedLimit) && requestedLimit > 0
      ? Math.min(requestedLimit, 100)
      : 10;

  const skip = (pageNumber - 1) * limitNumber;

  // Sorting Validation
  const safeSortBy = allowedSortFields.includes(sortBy)
    ? sortBy
    : "scheduledAt";

  const safeSortOrder = sortOrder === "asc" ? "asc" : "desc";

  const sort = {
    [safeSortBy]: safeSortOrder === "asc" ? 1 : -1,
  };

  // Get bookings + total
  const [bookings, total] = await Promise.all([
    Booking.find(query)
      .populate("customerId", "name email phone")
      .populate("mechanicId", "name phone status")
      .sort(sort)
      .skip(skip)
      .limit(limitNumber),

    Booking.countDocuments(query),
  ]);

  return {
    bookings,
    pagination: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber),
    },
  };
};

export const getBookingByIdService = async (bookingId) => {
  const booking = await Booking.findOne({ bookingId })
    .populate("customerId", "name email phone")
    .populate("mechanicId", "name phone status jobsCompleted");

  if (!booking) {
    throw new AppError("Booking not found", 404);
  }

  return booking;
};
