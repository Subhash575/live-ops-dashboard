import { getDashboardService } from "../services/dashboardService.js";

export const getDashboard = async (req, res, next) => {
  try {
    const data = await getDashboardService();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};
