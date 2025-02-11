import { Router } from "express"
import { check } from "express-validator"
import { getPets, savePet, searchPet, deletePet, updatePet } from "./pet.controller.js"
import { validarCampos} from "../middlewares/validar-campos.js"
import { validarJWT } from "../middlewares/validar-jwt.js"
import { uploadProfilePicture } from "../middlewares/multer-upload.js"
import { existeUsuarioById } from "../helpers/db-validator.js"

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check('email', 'Este no es un correo valido').not().isEmpty(),
        validarCampos
    ],
    savePet
)
router.get('/', getPets)


router.get(
    "/:id",
    [
        validarJWT,
        check("id", "No es un Id valido").isMongoId(),
        validarCampos
    ],
    searchPet
)

router.delete(
    '/:id',
    [
        validarJWT,
        check("id", "no es un Id validio").isMongoId(),
        validarCampos
    ],
    deletePet
)

router.put(
    "/:id",
    uploadPetPicture.single('petPicture'),
    [
        check("id", "ID is not valid").isMongoId(),
        check("id").custom(existePetById),
        validarCampos
    ],
    updatePet
)

export default router;