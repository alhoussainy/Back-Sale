
const objcetid = require('mongoose').Types.ObjectId
const venteModel = require('../models/venteModel')



module.exports.getAll = async (req, resp) => {

    try {
        await venteModel.find()
            .limit(40)
            .exec((err, docs) => {
                if (!err) {
                    resp.status(200).json({ docs })
                } else {
                    resp.status(400).json({ messsage: err })
                }
            })
    } catch (err) {
        resp.status(400).json({ messsage: err })
    }
}

module.exports.getbyid = async (req, resp) => {

    try {
        await venteModel.findById(req.params.id)
            .exec((err, docs) => {

                if (!err) {
                    resp.status(200).json({ docs })
                } else {
                    resp.status(400).json({ messsage: err })
                }
            })
    } catch (err) {
        resp.status(400).json({ messsage: err })
    }
}


module.exports.updatebyid = async (req, resp) => {
    if (!objcetid.isValid(req.params.id))
        return resp.status(400).send('id iconnu' + req.params.id)

    try {
        await venteModel.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true },
            (err, docs) => {
                if (!err) {
                    resp.status(200).json({ docs })
                } else {
                    resp.status(400).json({ messsage: err })
                }
            }
        )

    } catch (err) {
        resp.status(400).json({ messsage: err })
    }
}

module.exports.deletbyid = async (req, resp) => {

    if (!objcetid.isValid(req.params.id))
        return resp.status(400).send('id iconnu' + req.params.id)

    try {
        await venteModel.findByIdAndRemove(req.params.id);
        resp.status(200).send("success")

    } catch (err) {
        resp.status(400).json({ messsage: err })
    }
}


module.exports.creat = async (req, resp) => {

    await new venteModel(req.body)
        .save(
            (err, docs) => {
                if (!err) {
                    resp.status(200).json({ docs })
                } else {
                    resp.status(400).json({ messsage: err })
                }
            }
        )

}
