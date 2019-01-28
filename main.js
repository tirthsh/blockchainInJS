//import hash functionality 
const SHA256 = require('crypto-js/sha256')

class Block {
    //initialize type block
    //givep properties
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        //use function to calcuate hash function
        this.hash = this.calculateHash();
    }

    //use sha256 lib to calcuate hash
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

//class to create chain of blocks
class Blockchain {
    //initialize chain with a genesis block by default
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    //first block
    //has no previousHash attribute
    createGenesisBlock() {
        return new Block(0, "01/27/19", "This is the first block", "0");
    }

    //this function returns the last block object
    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    //add block to chain 
    addBlock(newBlock) {
        //adjust properties
        //same concept as linked list
        newBlock.previousHash = this.getLastBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        //push new block to chain
        this.chain.push(newBlock);
    }
}

//init new block
let sampleChain = new Blockchain();
sampleChain.addBlock(new Block(1, "01/28/19", { amount: 4 }));
sampleChain.addBlock(new Block(2, "01/30/19", { amount: 10 }));

console.log(JSON.stringify(sampleChain));