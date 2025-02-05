import User from '../users/user.model.js'
import Pet from './pet.model.js'

export const savePet = async (req, res) => {
    try{
        const data = req.body;
        const user = await User.findOne({email: data.email});

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'Propiertario no encontrado'
            })
        }

        const pet = new Pet({
            ...data,
            keeper: user._id
        })

        await pet.save();

        res.status(200).json({
            success: true,
            pet
        })

    }catch(error){
        res.status(500).json({
            success: false,
            message: 'error al aguardar mascota',
            error
        })
    }
}

export const getPets = async (req, res) => {
    const { limite = 10, desde = 0} = req.query;
    const query = {status: true};

    try{

        const pets =  await Pet.find(query)
        .skip(Number(desde))
        .limite(Number(limite));

        const petWithOwnerNames = await Promise.all(pets.map(async (pet) => {
            return {
                ...pet.toObject(),
                keeper: owner ? owner.nombre : "Propietario no encontrdo"
            }
        }));

        const total = await Pet.countDocuments(query);

        res.status(200).json({
            success: true,
            total,
            pets: petWithOwnerNames
        })

    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Error al obtener mascotas',
            error
        })
    }
}