"use strict";

const recordModel = require('../models/recording')
const answerPoints = require('../models/answer_points')

exports.getPointsHistory = async (req,res) => {
    try {
        const { user_id } = req.query
        const data = await answerPoints.find({user_id:user_id})
        return res.status(200).send({
                success: true,
                data: data
            });
    } catch (error) {
        console.log('EEEEEE', error)
        return res.status(500).send({
            error: true,
            message: shared.getLocalisedMessage(responseHandler.somethingWentWrong)
        })
    }
}
