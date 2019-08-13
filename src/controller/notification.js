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
                response.status(500).json({ status: false, data: sent, message: 'error fetching notifications' });
            }
            response.status(200).json({ status: true, data: payload, message: 'success' });
        } catch (error) {
            response.status(500).json({ status: false, data: error, message: 'error fetching notifications' });
        }
    }
    static async notifications(request, response) {
        try {
            const { query, limit } = request.body;

            const data = await MDBConnect.findMany('notification', query, limit);

            if (!data) {
                response.status(500).json({ status: false, data: data, message: 'error fetching notifications' });
            }
            response.status(200).json({ status: true, data: data, message: 'success' });
        } catch (error) {
            console.log(error);
            response.status(500).json({ status: false, data: error, message: 'error fetching notifications' });
        }
    }
    static async deleteNotification() {
        try {
            const { id } = request.body;
            const list = await MDBConnect.deleteMany('notification', { id: id });
            if (!list) {
                response.status(500).json({ status: false, data: list, message: 'error fetching notifications' });
            }
            response.status(200).json({ status: true, data: payload, message: 'success' });
        } catch (error) {
            response.status(500).json({ status: false, data: error, message: 'error fetching notifications' });
        }
    }

    static async seenNotifications(request, response) {
        try {
            const { uid } = request.userData;

            const data = await MDBConnect.updateMany('notification', { uid }, { $set: { seen: true } });

            if (!data) {
                response.status(500).json({ status: false, data: data, message: 'error updating notifications' });
            }
            response.status(200).json({ status: true, data: {}, message: 'success' });
        } catch (error) {
            console.log(error);
            response.status(500).json({ status: false, data: error, message: 'error updating notifications' });
        }
    }

}