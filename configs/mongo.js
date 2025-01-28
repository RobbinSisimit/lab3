'use strict'

import mongoose from "mongoose";

export const dbConnection = async() =>{
    try {
        mongoose.conection.on('error', ()=>{
            console.log('MongoDB no conect');
            mongoose.disconect();
        });
        mongoose.conection.on('connecting',()=>{
            console.log('MongoDB trying conection');
        });
        mongoose.conection.on('connected',()=>{
            console.log('MongoDB conected to MongoDB');
        });
        mongoose.conection.on('open',()=>{
            console.log('MongoDB connected to database');
        });
        mongoose.conection.on('reconnected',()=>{
            console.log('MongoDB reconnect to Mongo DB');
        });
        mongoose.conection.on('disconnected',()=>{
            console.log('MongoDB disconnected');
        });
        await mongoose.connect(process.env.URI_MONGO,{
            serverSelectionTimeoutMS: 5000,
            maxPoolSize:50,
        });
    } catch (error) {
        console.log('Database connection failed')
    }
}