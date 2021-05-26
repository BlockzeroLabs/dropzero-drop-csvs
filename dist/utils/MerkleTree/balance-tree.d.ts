/// <reference types="node" />
import { BigNumber } from "ethers";
export default class BalanceTree {
    private readonly tree;
    decimal: number;
    constructor(balances: any, decimal: any);
    verifyProof(index: number | BigNumber, account: string, amount: BigNumber, proof: Buffer[], root: Buffer): boolean;
    toNode(index: number | BigNumber, address: string, amount: BigNumber): Buffer;
    getHexRoot(): string;
    getProof(index: number | BigNumber, account: string, amount: BigNumber): string[];
}
