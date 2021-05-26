"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const merkle_tree_1 = require("./merkle-tree");
const ethers_1 = require("ethers");
class BalanceTree {
    constructor(balances, decimal) {
        this.decimal = decimal;
        this.tree = new merkle_tree_1.default(balances.map(({ address, amount }, index) => {
            return this.toNode(index, address, amount);
        }));
    }
    verifyProof(index, account, amount, proof, root) {
        let pair = this.toNode(index, account, amount);
        for (const item of proof) {
            pair = merkle_tree_1.default.combinedHash(pair, item);
        }
        return pair.equals(root);
    }
    toNode(index, address, amount) {
        return Buffer.from(ethers_1.utils
            .solidityKeccak256(["uint256", "address", "uint256"], [index, address, ethers_1.utils.parseUnits(String(amount), this.decimal)])
            .substr(2), "hex");
    }
    getHexRoot() {
        return this.tree.getHexRoot();
    }
    getProof(index, account, amount) {
        return this.tree.getHexProof(this.toNode(index, account, amount));
    }
}
exports.default = BalanceTree;
//# sourceMappingURL=balance-tree.js.map