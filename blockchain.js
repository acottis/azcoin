const crypto = require('crypto')

// My blockchain
const chain = []
let current_transactions = []
let salt = Math.floor(Math.random()*100)

// CONSTRUCTUR
const create_first_block = () =>{
    chain.push({
        index: chain.length,
        timestamp: Date.now(),
        transactions: [],
        proof: 100,
        previous_hash: "1" 
    })
}

const new_block = (proof, previous_hash) => {
    chain.push({
        index: chain.length,
        timestamp: Date.now(),
        transactions: current_transactions,
        proof: proof,
        previous_hash: previous_hash
    })
    // Empty Array
    current_transactions = [] 
    salt = Math.floor(Math.random()*100)
}

const new_transaction = (sender, recipient, amount) => {
    current_transactions.push({
        sender: sender,
        recipient: recipient,
        amount: amount
    })
}

const last_block = () => {
    return chain[chain.length - 1]
}

const last_proof = () =>{
    return chain[chain.length -1].proof
}

// Check the solver has got the correct answer
const valid_proof = (last_proof, proof) => {
    
    const guess = crypto.createHash('sha256').update((last_proof*proof*salt).toString()).digest('hex')
    return guess.slice(-4) == "0000" 
}

const hash_block = (block) => {
    const block_string = JSON.stringify(block)
    const hashed_block = crypto.createHash('SHA256').update(block_string).digest('hex')
    return hashed_block
}

const solve = (guess) => {
    if (valid_proof(last_block().proof, guess)){
        console.log(`Solved with guess ${guess} - pushing transactions to new block`)
        // When solved we hash create a new block with the correct guess and the hash of the last block
        new_block(guess, hash_block(last_block()))        
    }
    else{
        console.log(`Not solved with guess ${guess} - no change to blockchain`)
    }
}

//Init Blockchain
create_first_block();

// MINING
const proof_of_work = (last_proof) =>{

    let proof = 0
    while (!valid_proof(last_proof, proof)){
        proof++
    }
    console.log(`Next proof of work is ${proof}`)
    return proof
}

module.exports = {
    new_transaction,
    last_proof,
    solve,
    proof_of_work,
    chain,
}