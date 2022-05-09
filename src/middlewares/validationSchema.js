import joi from "joi";

export const loginSchema = (req, res, next) => {
    const login = req.body;
    const loginSchema = joi.object({ 
        email: joi.string().email().required(),
        password: joi.string().required()
    });
    const { error } = loginSchema.validate(login, { abortEarly: false });
    if (error) {
        return res.status(400).send(error.details.map((err) => err.message));
    }
    next();
};

export const userSchema = (req, res, next) => {
    const user = req.body;
    const userSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        confirmPassword: joi.ref('password')
    });
    const { error } = userSchema.validate(user, { abortEarly: false });
    if (error) {
        return res.status(400).send(error.details.map((err) => err.message));
    }
    next();
};