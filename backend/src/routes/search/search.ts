import { Router } from 'express';
import auth from "../../middleware/auth";
import {
    buildSQLStatement,
    getColumns,
    merge
} from "../../utils/utils"

const router = Router();

function buildEmptyObject() {
    const obj = {};

    for (const key of getColumns()) {
        // @ts-ignore
        obj[key] = "Couldn't get data";
    }
    return obj;
}


router.get("/", auth, (req, res) => {
   let requestQuery = req.query;
   if (requestQuery.query === undefined) {
       return res.status(400).json({
           data: "Bad Request"
       })
   }

   // @ts-ignore
    let parsedSearchQuery = JSON.parse(requestQuery.query);
    const queryBuilder = buildSQLStatement(parsedSearchQuery);
    const firstMergeObject = buildEmptyObject();
    queryBuilder.then(data => {
        data = data.map((obj) => {
            return merge(firstMergeObject, obj)
        })
        return res.json({
            scans: data
        })
    }).catch(err => {
        res.json({ message: `There was an error retrieving scans: ${err}` })
    })
});


export default router;
