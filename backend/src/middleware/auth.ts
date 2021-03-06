import jwt, {VerifyCallback, VerifyErrors} from 'jsonwebtoken';
import config from "../../../config.json";


export default function auth(req: any, res: any, next: any) {
    let { username } = req;
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;

    if (!token) return res.status(401).send("Unauthorized: No token provided");
    jwt.verify(token, config.jwt.secret, (err: VerifyErrors | null, decoded: object | undefined): VerifyCallback => {
        if (err) {
            return res.status(401).send("Unauthorized: Invalid token")
        }
        // @ts-ignore
        username = decoded.username;
        return next();
    })
}
