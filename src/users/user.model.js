import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
    },
    telefono: {
        type: String,
        minLenght: 8,
        maxLenght: 8,
        required: true0
    },
    role: {
        type: String,
        required: true,
        enum:['ADMIN_ROLE','USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

UserSchema.metods.toJson = function(){
    const{__v,password,_id, ...usuario} = this.toObject();
    usuario.uid=_id;
    return usuario;
}

export default mongoose.model('User',UserSchema);