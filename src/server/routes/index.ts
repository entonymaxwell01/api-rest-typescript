import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { CidadesController } from "../controllers/index";

const router = Router();

router.get("/", (req, res) => {
  res.status(StatusCodes.OK);
  res.json({ message: "Servidor rodando" });
});

router.post(
  "/cidades",
  CidadesController.createValidation,
  CidadesController.create
);

router.get(
  "/cidades",
  CidadesController.getAllValidation,
  CidadesController.getAll
);

router.get(
  "/cidades/:id",
  CidadesController.getByIdValidation,
  CidadesController.getById
);

router.put(
  "/cidades/:id",
  CidadesController.updateValidation,
  CidadesController.update
);

router.delete(
  "/cidades/:id",
  CidadesController.deleteValidation,
  CidadesController.deleteCidade
);

export { router };
