import { Router } from "express";
import { check } from "express-validator";
import { crearCita } from "./appointment.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    "/",
    crearCita
)


export default router;
