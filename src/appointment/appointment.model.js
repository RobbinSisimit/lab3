import { Schema, model } from "mongoose";

const AppointmentSchema = Schema({
    autor:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    pet:{
        type: Schema.Types.ObjectId,
        ref: 'pet',
        required: true
    },
    reason:{
        type: String
    },
    status:{
        type: String,
        default:'Confirmado'
    },
},
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('Appointment', AppointmentSchema);