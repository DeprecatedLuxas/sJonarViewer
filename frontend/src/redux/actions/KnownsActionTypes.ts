export const KNOWNS_LOADING = "KNOWNS_LOADING";
export const KNOWNS_FAIL = "KNOWNS_FAIL";
export const KNOWNS_SUCCESS = "KNOWNS_SUCCESS";


export type Knowns = {
    knowns: {
        id: string;
        name: string;
        amount: number;
        sslImplementationTested: string;
        jarmHash: string;
        link: string;
    }[];
};

export interface KnownsLoading {
    type: typeof KNOWNS_LOADING;
}

export interface KnownsFail {
    type: typeof KNOWNS_FAIL;
}

export interface KnownsSuccess {
    type: typeof KNOWNS_SUCCESS;
    payload: {
        id: string;
        name: string;
        amount: number;
        sslImplementationTested: string;
        jarmHash: string;
        link: string;
    }[];
}

export type KnownsDispatchTypes = KnownsLoading | KnownsFail | KnownsSuccess;
