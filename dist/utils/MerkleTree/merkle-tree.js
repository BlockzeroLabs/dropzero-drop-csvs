"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethereumjs_util_1 = require("ethereumjs-util");
class MerkleTree {
    constructor(elements) {
        this.elements = [...elements];
        this.elements.sort(Buffer.compare);
        this.elements = MerkleTree.bufDedup(this.elements);
        this.bufferElementPositionIndex = this.elements.reduce((memo, el, index) => {
            memo[ethereumjs_util_1.bufferToHex(el)] = index;
            return memo;
        }, {});
        this.layers = this.getLayers(this.elements);
    }
    getLayers(elements) {
        if (elements.length === 0) {
            throw new Error("empty tree");
        }
        const layers = [];
        layers.push(elements);
        while (layers[layers.length - 1].length > 1) {
            layers.push(this.getNextLayer(layers[layers.length - 1]));
        }
        return layers;
    }
    getNextLayer(elements) {
        return elements.reduce((layer, el, idx, arr) => {
            if (idx % 2 === 0) {
                layer.push(MerkleTree.combinedHash(el, arr[idx + 1]));
            }
            return layer;
        }, []);
    }
    static combinedHash(first, second) {
        if (!first) {
            return second;
        }
        if (!second) {
            return first;
        }
        return ethereumjs_util_1.keccak256(MerkleTree.sortAndConcat(first, second));
    }
    getRoot() {
        return this.layers[this.layers.length - 1][0];
    }
    getHexRoot() {
        return ethereumjs_util_1.bufferToHex(this.getRoot());
    }
    getProof(el) {
        let idx = this.bufferElementPositionIndex[ethereumjs_util_1.bufferToHex(el)];
        if (typeof idx !== "number") {
            throw new Error("Element does not exist in Merkle tree");
        }
        return this.layers.reduce((proof, layer) => {
            const pairElement = MerkleTree.getPairElement(idx, layer);
            if (pairElement) {
                proof.push(pairElement);
            }
            idx = Math.floor(idx / 2);
            return proof;
        }, []);
    }
    getHexProof(el) {
        const proof = this.getProof(el);
        return MerkleTree.bufArrToHexArr(proof);
    }
    static getPairElement(idx, layer) {
        const pairIdx = idx % 2 === 0 ? idx + 1 : idx - 1;
        if (pairIdx < layer.length) {
            return layer[pairIdx];
        }
        else {
            return null;
        }
    }
    static bufDedup(elements) {
        return elements.filter((el, idx) => {
            return idx === 0 || !elements[idx - 1].equals(el);
        });
    }
    static bufArrToHexArr(arr) {
        if (arr.some((el) => !Buffer.isBuffer(el))) {
            throw new Error("Array is not an array of buffers");
        }
        return arr.map((el) => "0x" + el.toString("hex"));
    }
    static sortAndConcat(...args) {
        return Buffer.concat([...args].sort(Buffer.compare));
    }
}
exports.default = MerkleTree;
//# sourceMappingURL=merkle-tree.js.map