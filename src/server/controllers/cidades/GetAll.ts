import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "../../middlewares";

interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation({
  query: yup.object({
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    filter: yup.string().optional(),
  }),
});

export const getAll = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response
) => {
  try {
    res.status(StatusCodes.OK);
    res.json({
      message: "Cidades",
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    res.json({});
  }
};
