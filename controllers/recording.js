"use strict";

const recordModel = require('../models/recording')
const queryHandler = require('../config/query-handler.json')
const responseHandler = require('../config/response-handler.json')
const transcribeQueue = require('../services/transcribe_queue')
const answeredPoints = require('../services/answer_points')
const shared = require('../lib/share')

exports.getRecordings = async (req, res) => {
    try {
        let userID = '123'
        let page = Number(req.query.page) ? Number(req.query.page) : 0
        const options = {
            select: queryHandler.getRecordings,
            sort: { title: 1 },
            page: page,
            limit: 10,
            collation: {
                locale: "en",
            },
        };
        let result = await recordModel.paginate({
            user_id: userID
        }, options)
        if (result.docs.length > 0) {
            return res.status(200).send({
                success: true,
                data: result
            });
        } else {
            return res.status(200).send({
                success: true,
                message: shared.getLocalisedMessage(responseHandler.noResultFound),
                data: { docs: [] }
            });
        }
    } catch (error) {
        console.log('EEEEEE', error)
        return res.status(500).send({
            error: true,
            message: shared.getLocalisedMessage(responseHandler.somethingWentWrong)
        })
    }
}

exports.createRecording = async (req, res) => {
    try {
        if (!req.body.title || !req.body.questiond_Id || !req.body.category_Id || !req.body.recording_url) {
            return res.status(400).send({
                error: true,
                message: shared.getLocalisedMessage(responseHandler.paramRequired)
            })
        }
        let data = {
            title: req.body.title,
            questiond_Id: req.body.questiond_Id,
            category_Id: req.body.category_Id,
            recording_url: req.body.recording_url,
            user_id: '123'
        }
        let result = new recordModel(data)
        const res = await result.save()
        await addAnsweredPoints(user_id, result._id)
        transcribeQueue.getAndSaveRecordingTranscription(result)
        return res.status(201).send({
            success: true,
            message: shared.getLocalisedMessage(responseHandler.recordingCreated)
        });

    } catch (error) {
        return res.status(500).send({
            error: true,
            message: shared.getLocalisedMessage(responseHandler.somethingWentWrong)
        })
    }
}

exports.deleteRecording = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(400).send({
                error: true,
                message: shared.getLocalisedMessage(responseHandler.paramRequired)
            })
        }
        await recordModel.findOneAndDelete({
            _id: req.body.id
        })
        return res.status(201).send({
            success: true,
            message: shared.getLocalisedMessage(responseHandler.recordingDelete)
        });
    } catch (error) {
        return res.status(500).send({
            error: true,
            message: shared.getLocalisedMessage(responseHandler.somethingWentWrong)
        })
    }
}

exports.editRecording = async (req, res) => {
    try {
        // recordModel.findOneAndUpdate({
        //     _id: req.body.id
        // }, $set: {

        // })
    } catch (error) {
        return res.status(500).send({
            error: true,
            message: shared.getLocalisedMessage(responseHandler.somethingWentWrong)
        })
    }
}
