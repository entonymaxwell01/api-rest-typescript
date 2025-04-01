import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "../../middlewares";

interface IParamProps {
  id?: number;
}

export const deleteValidation = validation({
  params: yup.object({
    id: yup.number().required().moreThan(0),
  }),
});

export const deleteCidade = async (
  req: Request<IParamProps>,
  res: Response
) => {
  try {
    res.status(StatusCodes.OK);
    res.json({
      message: "Cidade excluida",
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    res.json({});
  }
};
