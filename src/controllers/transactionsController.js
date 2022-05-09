import dayjs from "dayjs";

import database from "./../db.js";


export const mainPage = async (req, res) => {
    const { user } = res.locals;

    res.send(user);
}

export const newTransaction = async (req,res) =>{
    const { user } = res.locals;

    const transaction = req.body;
    const date = dayjs().format('DD/MM');

    try{
        await database.collection('transactions').insertOne({
            date,
            userId: user._id,
            ...transaction 
         });
         res.sendStatus(201);
    } catch(e){
        res.sendStatus(500);
        console.log("Erro ao postar entrada", e);
    }
}

export const getTransactions = async (req, res) =>{
    const { user } = res.locals;

    try {
        const transactions = await database.collection("transactions").find({ userId: user._id }).toArray();
        res.status(200).send(transactions);
    } catch (error) {
      res.status(500).send(error);
    }
}