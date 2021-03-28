import _ from "lodash";

export function merge<A, B>(a: A, b: B): A | B {
    return Object.assign({}, a, b);
}

export function checkEmptyObject(obj: any): any {
    if (_.isEmpty(obj)) return true;
    return _.isEmpty(
        Object.entries(obj)
            .map(([key, value]) => {
                if (_.isEmpty(value)) return true;
                if (value instanceof Object) return checkEmptyObject(value);
                return false;
            })
            .filter((b) => b === false)
    );
}
