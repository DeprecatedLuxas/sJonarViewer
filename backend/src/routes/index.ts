import { Router } from 'express';
import verifyRouter from './authentication/verify'
import authenticateRoute from "./authentication/authenticate";
import searchRoute from './search/search';
import knownRoute from "./known/known"
const routes = Router();

routes.use('/authenticate', authenticateRoute);
routes.use('/verify', verifyRouter);
routes.use('/search', searchRoute);
routes.use("/known", knownRoute);
export = routes;
