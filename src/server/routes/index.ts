import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { CidadesController } from "../controllers/index";

const router = Router();

router.get("/", (req, res) => {
  res.status(StatusCodes.OK);
  res.json({ message: "Servidor rodando" });
});

router.post("/cidades", CidadesController.create);

export { router };
