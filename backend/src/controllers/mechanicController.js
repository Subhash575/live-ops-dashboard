import {
  getMechanicsService,
  getMechanicByIdService,
} from "../services/mechanicService.js";

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

export const getMechanicById = async (req, res, next) => {
  try {
    const result = await getMechanicByIdService(req.params.id);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
