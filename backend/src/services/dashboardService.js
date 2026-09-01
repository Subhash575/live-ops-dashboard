import Booking from "../models/Booking.js";
import Mechanic from "../models/Mechanic.js";
import Customer from "../models/Customer.js";

export const getDashboardService = async () => {
  // Start and end of today
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const [
    totalBookings,
    todayBookings,
    completedBookings,
    pendingBookings,
    cancelledBookings,
    revenueResult,
    activeMechanics,
    newCustomers,
    bookingsOverTime,
    revenueOverTime,
    bookingStatus,
    serviceBreakdown,
  ] = await Promise.all([
    // Total bookings
    Booking.countDocuments(),

    // Today's bookings
    Booking.countDocuments({
      scheduledAt: {
        $gte: startOfToday,
        $lte: endOfToday,
      },
    }),

    // Completed bookings
    Booking.countDocuments({
      status: "COMPLETED",
    }),

    // Pending bookings
    Booking.countDocuments({
      status: "PENDING",
    }),

    // Cancelled bookings
    Booking.countDocuments({
      status: "CANCELLED",
    }),

    // Total revenue
    Booking.aggregate([
      {
        $match: {
          status: "COMPLETED",
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]),

    // Active mechanics
    Mechanic.countDocuments({
      status: {
        $in: ["AVAILABLE", "BUSY"],
      },
    }),

    // New customers today
    Customer.countDocuments({
      createdAt: {
        $gte: startOfToday,
        $lte: endOfToday,
      },
    }),

    // ANALYTICS
    // 1. Bookings over time (every date book)
    Booking.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$scheduledAt",
            },
          },
          bookings: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]),

    // 2. Revenue over time
    Booking.aggregate([
      {
        $match: {
          status: "COMPLETED",
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$scheduledAt",
            },
          },
          revenue: {
            $sum: "$amount",
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]),

    // 3. Booking status breakdown
    Booking.aggregate([
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]),

    // 4. Service/category breakdown
    Booking.aggregate([
      {
        $group: {
          _id: {
            category: "$category",
            service: "$service",
          },
          count: {
            $sum: 1,
          },
          revenue: {
            // round of value up to 2 decimal
            $round: [
              {
                $sum: "$amount",
              },
              2,
            ],
          },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id.category",
          service: "$_id.service",
          count: 1,
          revenue: 1,
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]),
  ]);

  return {
    overview: {
      totalBookings,
      todayBookings,
      completedBookings,
      pendingBookings,
      cancelledBookings,
      totalRevenue: revenueResult[0]?.total || 0,
      activeMechanics,
      newCustomers,
    },

    analytics: {
      bookingsOverTime,
      revenueOverTime,
      bookingStatus,
      serviceBreakdown,
    },
  };
};
