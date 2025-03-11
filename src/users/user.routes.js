import { Router } from "express";
import { check} from "express-validator";
import  {getUsers, getUserById, updateUser, deleteUser } from "./user.controller.js";
import { existeUserById } from "../helpers/db-validator.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { tieneRol } from "../middlewares/validar-roles.js";
import { validarJWT} from "../middlewares/validar-jwt.js"

const router = Router();

router.get("/", getUsers)

router.get(
    "/findUser/:id",
    [
        check("id", "id is invalid").isMongoId(),
        check("id").custom(existeUserById),
        validarCampos
    ],
    getUserById
)

router.put(
    "/:id",
    [
        check("id", "id is invalid").isMongoId(),
        check("id").custom(existeUserById),
        validarCampos
    ],
    updateUser
)

router.delete(
    "/:id",
    [
        validarJWT,
        tieneRol("ADMIN_ROLE"),
        check("id", "id is invalid").isMongoId(),
        check("id").custom(existeUserById),
        validarCampos
    ],
    deleteUser
)

export default router;