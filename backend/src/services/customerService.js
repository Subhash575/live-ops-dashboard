import Customer from "../models/Customer.js";
import Booking from "../models/Booking.js";
import AppError from "../utils/AppError.js";

const allowedSortFields = ["name", "email", "phone", "createdAt"];

export const getCustomersService = async ({
  search,
  page = 1,
  limit = 10,
  sortBy = "name",
  sortOrder = "asc",
}) => {
  const query = {};

  // Search
  if (search) {
    const searchRegex = new RegExp(search, "i");

    query.$or = [
      { name: searchRegex },
      { email: searchRegex },
      { phone: searchRegex },
    ];
  }

  // Pagination
  const pageNumber =
    Number.isInteger(Number(page)) && Number(page) > 0 ? Number(page) : 1;

  const requestedLimit = Number(limit);

  const limitNumber =
    Number.isInteger(requestedLimit) && requestedLimit > 0
      ? Math.min(requestedLimit, 100)
      : 10;

  const skip = (pageNumber - 1) * limitNumber;

  // Sorting
  const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : "name";

  const safeSortOrder = sortOrder === "desc" ? "desc" : "asc";

  const sort = {
    [safeSortBy]: safeSortOrder === "asc" ? 1 : -1,
  };

  // Get customers
  const [customers, total] = await Promise.all([
    Customer.find(query).sort(sort).skip(skip).limit(limitNumber).lean(),

    Customer.countDocuments(query),
  ]);

  // Get booking counts
  const customerIds = customers.map((customer) => customer._id);

  const bookingCounts = await Booking.aggregate([
    {
      $match: {
        customerId: { $in: customerIds },
      },
    },
    {
      $group: {
        _id: "$customerId",
        bookingCount: { $sum: 1 },
      },
    },
  ]);

  const bookingCountMap = new Map(
    bookingCounts.map((item) => [item._id.toString(), item.bookingCount]),
  );

  const customersWithStats = customers.map((customer) => ({
    ...customer,
    bookingCount: bookingCountMap.get(customer._id.toString()) || 0,
  }));

  return {
    customers: customersWithStats,
    pagination: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber),
    },
  };
};
