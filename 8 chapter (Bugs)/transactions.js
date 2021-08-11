const accounts = {
    1: {
    name: 'Vlad',
    balance: 70000
    },
    2: {
    name: 'Lena',
    balance: 10500
    },
}

function getClient(id1, id2) {
    if (accounts.hasOwnProperty(id1) || accounts.hasOwnProperty(id2))
        return {account_from: accounts[id1], account_to: accounts[id2]}
    else throw new Error('Wrong account!')
}

function createTransaction(from_id, to_id, value) {
    let status = 0
    try {

        var {account_from, account_to} = getClient(from_id, to_id)

        if (account_from.balance < value) return
        account_from.balance -= value
        status = 1
        account_to.balance += value
        status = 2
    } 
    catch(err) {
        console.log(err)
    } 
    finally {
        if (status === 1) accounts[from_id].balance += value
    }
}

createTransaction(from_id = '1', to_id = '32', value=500)
