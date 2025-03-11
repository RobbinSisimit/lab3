import User from '../users/user.model.js';
import Pet from '../pet/pet.model.js';
import Appointment from './appointment.model.js';

export const crearCita = async (req, res) => {
    try {
        const data = req.body;
        const user = await User.findOne({ email: data.email });
        const pet = await Pet.findOne({ name: data.name });  // Buscar mascota por nombre

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: 'No hay usuario con ese ID'
            });
        }

        if (!pet) {
            return res.status(404).json({
                success: false,
                msg: 'No hay mascota con ese nombre'
            });
        }

        const appointment = new Appointment({
            ...data,
            autor: user._id,
            pet: pet._id // Guardar el ObjectId de la mascota
        });

        await appointment.save();

        res.status(200).json({
            success: true,
            msg: 'La cita ha sido creada :D',
            appointment
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error, algo salió mal :D",
            error
        });
    }
};
