import { Router } from "express";
import auth from "../../middleware/auth";
import _ from 'lodash';
import { buildSQLStatement, getColumns, merge } from "../../utils/utils";

const router = Router();

function buildEmptyObject() {
    const obj = {};
    for (const key of getColumns()) {
        // @ts-ignore
        obj[key] = "Couldn't get data";
    }
    return obj;
}
function decodeSearch(search: any): string {
    return decodeURIComponent(
        Buffer.from(search, "base64")
            .toString("utf-8")
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );
}

router.get("/", auth, (req, res) => {
    let requestQuery = req.query;
    if (requestQuery.query === undefined) {
        return res.status(400).json({
            data: "Bad Request",
        });
    }
    let parsedSearch = JSON.parse(decodeSearch(requestQuery.query));

    // Removing the offset from the parsedSearch
    var search = _.omit(parsedSearch, ["offset"]);
    let queryBuilder;
    if (parsedSearch.offset) {
        queryBuilder = buildSQLStatement(
            search,
            true,
            parsedSearch.offset
        );
        console.log("With offset")
    } else {
        queryBuilder = buildSQLStatement(
            search,
            true
        );
        console.log("Without offset")
    }

    queryBuilder
        .then((data: any[]) => {
            data = data.map((obj) => {
                return merge(buildEmptyObject(), obj);
            });
            return res.json({
                scans: data,
            });
        })
        .catch((err: Error) => {
            res.json({
                message: `There was an error retrieving scans: ${err}`,
            });
        });
});

export default router;
