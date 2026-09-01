import Booking from "../models/Booking.js";
import Customer from "../models/Customer.js";

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

    query.$or = [
      // Booking ID
      { bookingId: searchRegex },

      // Vehicle
      { "vehicle.make": searchRegex },
      { "vehicle.model": searchRegex },

      // Customer
      { customerId: { $in: customerIds } },
    ];
  }

  // Pagination
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const skip = (pageNumber - 1) * limitNumber;

  // Sorting
  const sort = {
    [sortBy]: sortOrder === "asc" ? 1 : -1,
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
