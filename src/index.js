import cors from "cors";
import dotenv from "dotenv";
import express, {json} from "express";
dotenv.config();

import authorizationRouter from "./routers/authorizationRouter.js";
import transactionsRouter from "./routers/transactionsRouter.js";

const app = express();
app.use(cors());
app.use(json());

app.use(authorizationRouter);
app.use(transactionsRouter);


app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});