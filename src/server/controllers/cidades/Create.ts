import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../middlewares";

interface ICidade {
  nome: string;
  estado: string;
  pais: string;
}

interface iFilter {
  filter?: string;
}

const bodyValidation: yup.ObjectSchema<ICidade> = yup.object({
  nome: yup.string().required().min(3),
  estado: yup.string().min(3).required(),
  pais: yup.string().min(3).required(),
});

const queryValidation: yup.ObjectSchema<iFilter> = yup.object({
  filter: yup.string().required().min(3),
});

export const createValidation = validation({
  body: yup.object({
    nome: yup.string().required().min(3),
    estado: yup.string().min(3).required(),
    pais: yup.string().min(3).required(),
  }),

  query: yup.object({
    filter: yup.string().required().min(3),
  }),
});

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  let validatedData: ICidade | undefined = req.body;
  res
    .status(StatusCodes.CREATED)
    .json({ validatedData, message: "Cidade criada com sucesso" });
};
