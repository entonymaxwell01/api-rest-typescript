import { RequestHandler } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";

type TProperty = "body" | "header" | "params" | "query";

type TAllSchemas = Record<TProperty, yup.ObjectSchema<any>>;

type TValidation = (schemas: Partial<TAllSchemas>) => RequestHandler;

export const validation: TValidation = (schemas) => {
  return async (req, res, next) => {
    const errorsResults: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {
      try {
        schema.validateSync(req[key as TProperty], { abortEarly: false });
      } catch (error) {
        const yupError = error as yup.ValidationError;
        const validationErrors: Record<string, string> = {};

        yupError.inner.forEach((error) => {
          validationErrors[error.path as string] = error.message;
        });

        errorsResults[key] = validationErrors;
      }
    });

    if (Object.entries(errorsResults).length === 0) {
      next();
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        errors: errorsResults,
      });
    }
  };
};
