"use strict";

const responseHandler = require('../../config/response-handler.json')

exports.testApi = async (req,res) => {
    try {
        return res.status(200).send({
                success: true,
                msg: responseHandler.adminTest
            });
    } catch (error) {
        console.log('EEEEEE', error)
        return res.status(500).send({
            error: true,
            message: shared.getLocalisedMessage(responseHandler.somethingWentWrong)
        })
    }
}
