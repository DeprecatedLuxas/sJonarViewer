export interface IKnowns {
    knowns: IKnownsObject[]
}

export interface IKnownsObject {
    name: string,
    amount: number,
    sslImplementationTested: string,
    jarmHash: string,
    link: string
}