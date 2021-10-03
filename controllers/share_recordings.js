"use strict";

const recordModel = require('../models/recording')
const shareRecordingModel = require('../models/recording_share_details')

const queryHandler = require('../config/query-handler.json')
const responseHandler = require('../config/response-handler.json')
const constants = require('../config/constants.json')

const shared = require('../lib/share')

exports.getSharedRecordingDetails = async (req, res) => {
    try {
        const { plateform,id } = req.query
        const result = await shareRecordingModel.findById(id, 'recording_id shared_at').exec();
        if (!result) {
            return res.status(404).send({
                error: true,
                message: shared.getLocalisedMessage(responseHandler.noRecording)
            })
        }
        const no_of_days = Math.floor((new Date().getTime()-new Date(result.shared_at).getTime())/86400000)
        if (plateform === 'mobile' &&  no_of_days <=constants.url_expiry_days_mobile) {
            let data = await recordModel.findById(result.recording_id).exec();
            return res.status(200).send({
                success: true,
                data: data
            });
        } else if (plateform === 'web' && no_of_days <=constants.url_expiry_days_web) {
            let data = await recordModel.findById(result.recording_id).exec();
            return res.status(200).send({
                success: true,
                data: data
            });
        } else{
            return res.status(404).send({
                error: true,
                message: shared.getLocalisedMessage(responseHandler.urlExpired)
        })}
    } catch (error) {
        console.log('EEEEEE', error)
        return res.status(500).send({
            error: true,
            message: shared.getLocalisedMessage(responseHandler.somethingWentWrong)
        })
    }
}

exports.shareRecording = async (req, res) => {
    try {
        if (!req.body.recording_id || !req.body.shared_by) {
            return res.status(400).send({
                error: true,
                message: shared.getLocalisedMessage(responseHandler.paramRequired)
            })
        }
        let data = {
            recording_id: req.body.recording_id,
            shared_by: req.body.shared_by
        }
        let result = new shareRecordingModel(data)
        await result.save()
        return res.status(201).send({
            success: true,
            data: result
        });

    } catch (error) {
        return res.status(500).send({
            error: true,
            message: shared.getLocalisedMessage(responseHandler.somethingWentWrong)
        })
    }
}

