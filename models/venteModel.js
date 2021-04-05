const mongoose = require('mongoose')

const venteShema = mongoose.Schema(

    {
        saleDate: {
            type: Date,
            default: Date.now,
            required: true
        },
        items: {
            type: Array
        },

        storeLocation: {
            type: String,
            required: true
        },

        customer: {
            gender: {
                type: String
            },
            age: {
                type: Number
            },
            email: {
                type: String
            },
            satisfaction: {
                type: Number
            }
        },
        couponUsed: {
            type: Boolean
        },
        purchaseMethod: {
            type: String,
        },
        users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    }
)

const venteModel = mongoose.model('sale', venteShema)
module.exports = venteModel