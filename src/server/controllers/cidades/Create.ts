import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

interface ICidade {
  nome: string;
  estado: string;
  pais: string;
}

const bodyValidation: yup.ObjectSchema<ICidade> = yup.object({
  nome: yup.string().required().min(3),
  estado: yup.string().min(3).required(),
  pais: yup.string().min(3).required(),
});

export const createBodyValidator: RequestHandler = async (req, res, next) => {
  try {
    await bodyValidation.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const yupError = error as yup.ValidationError;
    const validationErrors: Record<string, string> = {};

    yupError.inner.forEach((error) => {
      validationErrors[error.path as string] = error.message;
    });

    res.status(StatusCodes.BAD_REQUEST).json({
      errors: validationErrors,
    });
  }
};

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  let validatedData: ICidade | undefined = undefined;
  res
    .status(StatusCodes.CREATED)
    .json({ validatedData, message: "Cidade criada com sucesso" });
};
