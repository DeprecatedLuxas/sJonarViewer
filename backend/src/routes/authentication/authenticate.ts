import { Router } from 'express';
import jwt from "jsonwebtoken";
import users from "../../database/users";
import bcrypt from 'bcrypt';
import config from "../../../../config.json";
const router = Router();

router.post("/", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = users.find((userObj) => userObj.username === username);
        if (!user) {
            return res.send({
                error: "Incorrect username or password"
            }).status(403);
        }

        const isLoggedIn = bcrypt.compareSync(password, user.password);
        if (!isLoggedIn) {
            return res.send({
                error: "Incorrect password"
            }).status(403);
        }

        const token = jwt.sign({ username }, config.jwt.secret, {
            expiresIn: config.jwt.expiresIn
        });
        if (!token) {
            return res.send({
                error: "Internal Server Error, please try again"
            }).status(500);
        }

        return res.cookie('sJonarToken', token, {httpOnly: true, maxAge: 86400000, sameSite: 'lax', secure: true}).status(200).send({ isLoggedIn })
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
})



export default router;
