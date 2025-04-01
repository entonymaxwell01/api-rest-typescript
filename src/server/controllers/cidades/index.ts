import { create } from "./Create";
import { createValidation } from "./Create";
import { getAllValidation, getAll } from "./GetAll";
import { getByIdValidation, getById } from "./GetById";
import { update, updateValidation } from "./Update";
import { deleteValidation, deleteCidade } from "./Delete";

export const CidadesController = {
  create,
  createValidation,
  getAll,
  getAllValidation,
  getById,
  getByIdValidation,
  update,
  updateValidation,
  deleteCidade,
  deleteValidation,
};
