import express from "express";

import {
  newTransaction,
  getTransactions,
} from "./../controllers/transactionsController.js";

import validateToken from "./../middlewares/validationToken.js";

const transactionsRouter = express.Router();
transactionsRouter.use(validateToken);

transactionsRouter.post("/transactions", newTransaction);
transactionsRouter.get("/transactions", getTransactions);

export default transactionsRouter;