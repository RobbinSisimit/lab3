import User from '../users/user.model.js';
import Pet from '../pet/pet.model.js';
import Appointment from './appointment.model.js';

export const crearCita = async (req, res) =>{
    try {
        const data = req.body
        const user = await User.findOne({email:data.email});
        const pet = await Pet.findOne({name: data.name});

        if(!user){
            return res.status(404).josn({
                success: false,
                msg: 'No hay usuario con ese ID'
            })
        }

        if(!pet){
            return res.status(404),json({
                success: false,
                msg: 'no hay mascota con ese ID :(('
            })
        }

        const appointmet = new Appointment({
            ...data,
            autor: user._id,
            pet: pet.name
        });

        await appointmet.save();

        res.status(200).json({
            success: true,
            msg: 'la cita hacido creado :D',
            appointmet
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "ESTA MAL, EN QUE ESTA MAL, EN ALGO :D",
            error
        })
    }
}
