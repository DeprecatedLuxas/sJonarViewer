import { Router } from 'express';
import jwt, {VerifyErrors} from "jsonwebtoken";
const router = Router();
import config from "../../../../config.json";


router.get("/", (req, res) => {
    const { cookies: { token }} = req;
    jwt.verify(token, config.jwt.secret, (err: VerifyErrors | null, decoded: object | undefined) => {
        res.send({
            isValidCookie: !(err || decoded === undefined)
        });
    })
})


export default router;
