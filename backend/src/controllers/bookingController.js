import { getBookingsService } from "../services/bookingService.js";

export const getBookings = async (req, res, next) => {
  try {
    const result = await getBookingsService(req.query);

    res.status(200).json({
      success: true,
      data: result.bookings,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};
