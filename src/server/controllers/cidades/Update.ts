import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "../../middlewares";

interface IParamProps {
  id?: number;
}

interface IBodyProps {
  nome: string;
  estado: string;
  pais: string;
}

export const updateValidation = validation({
  body: yup.object({
    nome: yup.string().required().min(3),
    estado: yup.string().required().min(3),
    pais: yup.string().required().min(3),
  }),
  params: yup.object({
    id: yup.number().required().moreThan(0),
  }),
});

export const update = async (
  req: Request<IParamProps, {}, IBodyProps>,
  res: Response
) => {
  try {
    res.status(StatusCodes.OK);
    res.json({
      message: "Cidade atualizada",
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    res.json({});
  }
};
