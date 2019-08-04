import MDBConnect from '../database/Mongodb';



export default class Notification {

    static async notify(payload) {
        const sent = await MDBConnect.insertOne('notification', payload);
        if (!sent) {
            return false;
        }
        return true;
    }

    static async sendNotification(request, response) {
        try {
            const payload = request.body;
            const sent = await Notification.notify(payload);
            if (!sent) {
                response.status(200).json({ status: false, data: sent, message: 'failed' });
            }
            response.status(200).json({ status: true, data: payload, message: 'success' });
        } catch (error) {
            response.status(500).json({ status: false, data: error, message: 'failed' });
        }
    }
    static async notifications(request, response) {
        try {
            const { uid, limit } = request.body;
            const list = await MDBConnect.findMany('notification', { uid }, limit);
            if (!list) {
                response.status(200).json({ status: false, data: list, message: 'failed' });
            }
            response.status(200).json({ status: true, data: payload, message: 'success' });
        } catch (error) {
            response.status(500).json({ status: false, data: error, message: 'failed' });
        }
    }
    static async deleteNotification() {

    }



}