const BlockChain = require('./src/blockchain')
const Miner = require('./src/miner')
const { renderStep, renderFullBlockchain, title } = require('./src/utils')



let blockchain = new BlockChain("test")

let toto = (new Miner('toto')).connect(blockchain)
let tata = (new Miner('tata')).connect(blockchain)
let titi = (new Miner('titi')).connect(blockchain)
let tutu = (new Miner('tutu')).connect(blockchain)

renderFullBlockchain(blockchain)



console.group(title("test 1"))
renderStep('>>> add few transactions...')
toto.pay(tata, 10)
titi.pay(tata, 5)
tata.pay(tutu, 15)
renderFullBlockchain(blockchain)

renderStep('\n>>> create block...')
toto.publishBlock()
renderStep('<<< block creation succeed !\n')

renderFullBlockchain(blockchain, 'blocks')
console.groupEnd()




console.group(title("test 2"))
renderStep('>>> add other transactions and create blocks...')
tutu.pay(tata, 5)
tata.pay(toto, 5)
titi.publishBlock()
tutu.pay(toto, 5)
toto.pay(tata, 10)
titi.publishBlock()

renderFullBlockchain(blockchain, 'blocks')
console.groupEnd()




console.group(title("test 3"))
renderStep('>>> titi steals tutu\'s money in first block...')
titi.blockchain.chain[0].data[2].to = titi.id
titi.blockchain.chain[0].data[2].emphase("to")
renderFullBlockchain(blockchain, 'blocks')
console.groupEnd()