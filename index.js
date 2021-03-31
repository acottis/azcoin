const BlockChain = require('./blockchain')

BlockChain.new_transaction("Adam", "Naomi", 69 )
BlockChain.new_transaction("Adam", "Naomi", 14 )

console.log(BlockChain.last_proof())

let x = BlockChain.proof_of_work(BlockChain.last_proof())
BlockChain.solve(x)

BlockChain.new_transaction("Adam", "Aomi", 14 )

x = BlockChain.proof_of_work(BlockChain.last_proof())
BlockChain.solve(x)



BlockChain.new_transaction("Adam", "Naomi", 69 )
BlockChain.new_transaction("Adam", "Naomi", 14 )

x = BlockChain.proof_of_work(BlockChain.last_proof())
BlockChain.solve(x)

console.log(BlockChain.chain)