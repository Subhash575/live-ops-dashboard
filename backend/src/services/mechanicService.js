import Mechanic from "../models/Mechanic.js";
import AppError from "../utils/AppError.js";

const allowedStatuses = ["AVAILABLE", "BUSY", "OFFLINE"];

const allowedSortFields = ["name", "status", "jobsCompleted", "createdAt"];

export const getMechanicsService = async ({
  search,
  status,
  page = 1,
  limit = 10,
  sortBy = "name",
  sortOrder = "asc",
}) => {
  const query = {};

  // Search
  if (search) {
    const searchRegex = new RegExp(search, "i");

    query.$or = [{ name: searchRegex }, { phone: searchRegex }];
  }

  // Status filter
  if (status) {
    if (!allowedStatuses.includes(status)) {
      throw new AppError(`Invalid mechanic status: ${status}`, 400);
    }

    query.status = status;
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

  // Get mechanics and total count
  const [mechanics, total] = await Promise.all([
    Mechanic.find(query)
      .populate("currentBookingId", "bookingId service status scheduledAt")
      .sort(sort)
      .skip(skip)
      .limit(limitNumber),

    Mechanic.countDocuments(query),
  ]);

  return {
    mechanics,
    pagination: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber),
    },
  };
};
