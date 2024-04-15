const { request } = require('express')
const express = require('express')
const uuid = require('uuid')
const port = 3000
const app = express()
app.use(express.json())

const orders = []

const checkOrderId = (request, response, next) => {
    
    const { id } = request.params
    
    const index = orders.findIndex( user => user.id === id)
    
    if(index < 0) {
        return response.status(404).json({error:'Order not found'})
    }

    request.orderIndex = index
    request.orderId = id

    next()
}

app.get('/orders', (request, response) => {
    return response.json(orders)
})

app.post('/orders', (request, response) => {
    const {name, order, price} = request.body

    const newOrder = {id: uuid.v4(), name , order, price, status:"Pedido Confirmado"}

    orders.push(newOrder)

    return response.status(201).json(newOrder)
})


app.put('/orders/:id', checkOrderId, (request, response) => {
    const {name, order, price} = request.body
    const index = request.orderIndex
    const id = request.orderId

    const updatedOrder = {id, name, order, price, status:"Em Preparo"}

    orders[index]= updatedOrder

    return response.json(updatedOrder)
})

app. delete('/orders/:id', checkOrderId, (request, response) => {
    const index = request.userIndex

    orders.splice(index, 1)

    return response.status(204).json(orders)
})

app.patch('/orders/:id', checkOrderId, (request, response) => {
    const {name, order, price} = request.body
    const index = request.orderIndex
    const id = request.orderId

    const updatedOrder = {id, name, order, price, status:"Pedido pronto para retirada"}

    orders[index]= updatedOrder

    return response.json(updatedOrder)
})

app.listen(port)