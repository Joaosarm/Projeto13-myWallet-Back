import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import database from "./../db.js";

export const signUp = async  (req, res) =>{
    const user = req.body;
    const {name, email } = user;
    
    const isThere = await database.collection("users").findOne({ email });
    if (isThere) return res.status(409).send("Usuário já existe");

    try{
        const passwordHash = bcrypt.hashSync(user.password, 10);
        await database.collection("users").insertOne({name,email,password: passwordHash});
        res.sendStatus(201);
    } catch(e){
        res.sendStatus(500);
        console.log("Erro ao registrar", e);
    }
}

export const signIn = async  (req, res) =>{
    const {email, password} = req.body;

    try{
        const user = await database.collection("users").findOne({ email });
        if(user && bcrypt.compareSync(password, user.password)){
            const token = uuid();
            await database.collection("sessions").insertOne({ token, userId: user._id });
            res.status(200).send(token);
        } else res.sendStatus(404);
    } catch(e){
        res.sendStatus(500);
        console.log("Erro ao entrar", e);
    }
}