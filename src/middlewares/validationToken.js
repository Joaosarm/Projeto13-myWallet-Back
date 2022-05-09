import database from "../db.js";

const validateToken = async (req, res, next) => {
    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer", "").trim();
    if (!token) return res.sendStatus(401);

    const session = await database.collection("sessions").findOne({ token });
    if (!session) return res.sendStatus(401);

    const user = await database.collection("users").findOne({ _id: session.userId });
    if (!user) return res.sendStatus(401);

    delete user.password;
    res.locals.user = user; 
    next();
};

export default validateToken;