import { getCustomersService } from "../services/customerService.js";

export const getCustomers = async (req, res, next) => {
  try {
    const result = await getCustomersService(req.query);

    res.status(200).json({
      success: true,
      data: result.customers,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};
