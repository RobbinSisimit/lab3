import { Router } from "express";
import { check } from "express-validator";
import { crearMascota, listarMascotas, eliminarMascota, actulizarMascota } from "./pet.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from '../middlewares/validar-jwt.js'
import { existePetById } from "../helpers/db-validator.js";
import { tieneRol } from "../middlewares/validar-roles.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT, // Middleware para validar JWT y autenticación
        check("name", "El nombre de la mascota es obligatorio").not().isEmpty(), // Validación del nombre de la mascota
        check("description", "La descripción de la mascota es obligatoria").not().isEmpty(), // Validación de la descripción
        check("age", "La edad de la mascota es obligatoria").isNumeric(), // Validación de la edad (número)
        check("email", "El correo electrónico del propietario es obligatorio").not().isEmpty(), // Validación del correo electrónico
        check("email", "El correo electrónico no es válido").isEmail(), // Validación de formato de correo
        validarCampos 
    ],
    crearMascota
)

router.get("/",listarMascotas)

router.put(
    "/:id",
    [
        check("id", "ID is not valid").isMongoId(),
        check("id").custom(existePetById),
        validarCampos
    ],
    actulizarMascota
)

router.delete(
    '/:id',
    [
        validarJWT,
        tieneRol("ADMIN_ROLE"),
        check("id", "ID is invalid").isMongoId(),
        validarCampos
    ],
    eliminarMascota
)

export default router;