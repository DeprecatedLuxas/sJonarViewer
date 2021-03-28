import { Router } from "express";
import auth from "../../middleware/auth";
import _ from "lodash";
import { buildSQLStatement} from "../../utils/utils";
const router = Router();


export function decodeSearch(search: any): string {
    return decodeURIComponent(
        Array.prototype.map
            .call(
                Buffer.from(search, "base64").toString("binary"),
                function (c: any) {
                    return (
                        "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                    );
                }
            )
            .join("")
    );
}

export function encodeSearch(search: string) {
    return Buffer.from(
        encodeURIComponent(search).replace(
            /%([0-9A-F]{2})/g,
            function (match, p1) {
                return String.fromCharCode(parseInt(p1, 16));
            }
        )
    ).toString('base64');
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
        queryBuilder = buildSQLStatement(search, true, parsedSearch.offset);
    } else {
        queryBuilder = buildSQLStatement(search, true);
    }
    queryBuilder
        .then((data: any[]) => res.json({
            scans: data,
        }))
        .catch((err: Error) => {
            res.json({
                message: `There was an error retrieving scans: ${err}`,
            });
        });
});

export default router;
