import express from 'express';
import * as bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import routes from "./routes";
import cors from 'cors';
const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser());
app.use(helmet());
app.use(cors())

app.use('/api', routes);

app.listen(5000, () => {
    console.log("Started backend server.")
})




