import User from '../users/user.model.js'
import Pet from './pet.model.js'

export const crearMascota = async (req, res) => {
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
            propietario: user._id
        });

        await pet.save();

        

        res.status(200).json({
            succes: true,
            msg:'pet saved succesfuly',
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

export const listarMascotas = async (req, res) => {
    const { limite = 10, desde = 0} = req.query;
    const query = {status: true};

    try{

        
        const pets =  await Pet.find(query)
        .skip(Number(desde))
        .limit(Number(limite));

        
        const petWithOwnerNames = await Promise.all(pets.map(async (pet) => {
            const owner = await User.findById(pet.keeper);
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

export const actulizarMascota = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { _id, ...data } = req.body;
        
        const pet = await Pet.findByIdAndUpdate(id, data, {new: true});

        res.status(200).json({
            success: true,
            msg: 'Pet updated successfully',
            pet
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            msg:'Error to update the pet',
            error
        })
    }
}

export const eliminarMascota = async (req, res) =>{
    const {id} = req.params;
    try{
        await Pet.findByIdAndUpdate(id ,{ status: false});

        res.status(200).json({
            success: true,
            message: 'Pet Eliminado exitoso'
        })

    }catch(error){
        res.status(500).json({
            seccess: false,
            message: 'error al eliminar mascora',
            error
        })
    }
}
