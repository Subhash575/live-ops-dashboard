import { getMechanicsService } from "../services/mechanicService.js";

export const getMechanics = async (req, res, next) => {
  try {
    const result = await getMechanicsService(req.query);

    res.status(200).json({
      success: true,
      data: result.mechanics,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};
