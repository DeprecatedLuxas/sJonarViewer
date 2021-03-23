import jwt, {VerifyCallback, VerifyErrors} from 'jsonwebtoken';
import config from "../../../config.json";

type JWTObject = {
    username: string
}
export default function auth(req: any, res: any, next: any) {
    let { username } = req;
    const sJonarToken =
        req.body.sJonarToken ||
        req.query.sJonarToken ||
        req.headers['x-access-token'] ||
        req.cookies.sJonarToken;

    if (!sJonarToken) return res.status(401).send("Unauthorized: No token provided");
    jwt.verify(sJonarToken, config.jwt.secret, (err: VerifyErrors | null, decoded: JWTObject | undefined): VerifyCallback => {
        if (err) {
            return res.status(401).send("Unauthorized: Invalid token")
        }
        username = decoded.username;
        return next();
    })
}
