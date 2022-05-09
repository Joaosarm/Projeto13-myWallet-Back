import express from "express";

import { signIn, signUp } from "../controllers/authorizationController.js";
import {
    mainPage
  } from "./../controllers/transactionsController.js";

import {
  loginSchema,
  userSchema
} from "../middlewares/validationSchema.js";

import validateToken from "../middlewares/validationToken.js";

const authorizationRouter = express.Router();

authorizationRouter.get("/main-page", validateToken, mainPage);
authorizationRouter.post("/sign-in", loginSchema, signIn);
authorizationRouter.post("/sign-up", userSchema, signUp);

export default authorizationRouter;