import {Router} from 'express';
import knownsList from "../../database/knowns";
import _ from 'lodash';
import database from '../../database/database';
import async from 'async';
import config from "../../../../config.json";
const router = Router();


router.get("/", async (_: any, res: any) => {
    async.each(knownsList.knowns, (object, callback) => {
        return database.select('jarmhash').from(config.database.table).where('jarmhash', object.jarmHash).asCallback((err: any, rows: any) => {
            if (err) {
                callback(err)
            } else {
                object.amount = rows.length;
                
                callback();
            }
        })
    }, (err: any) => {
        if(err) {
            res.status(500).json(err)
          } else {
            res.status(200).json(knownsList) 
          }
    })
});


export default router;
