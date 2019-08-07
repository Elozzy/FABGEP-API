import MDBConnect from '../database/Mongodb';
import Security from '../helper/encryptor';
import NOtification from '../controller/notifiaction';
import Notification from '../controller/notifiaction';

export default class Purse {



    static async purse(request, response) {

        const { uid } = request.query;
        console.log(uid);
        try {

            const account = await MDBConnect.findOne('account', { purseOwner: uid });
            if (!account) {
                response.status(404).json({ status: false, data: '', message: 'document not found' });
            }
            // const secureData = Security.dataEncrypt(JSON.stringify(account));
            response.status(200).json({ status: true, data: account, message: 'success' });
        } catch (error) {
            console.log(error);
            response.status(500).json({ status: false, data: error, message: 'error occurred' });

        }


    }

    // static async updatePurse(request, response) {
    //     const input = request.body;
    //     const output = await MDBConnect.updateOne("account",{uid:input.uid},{pur})

    // }


    static async transaction(request, response) {
        const transaction = request.body;
        try {
            const newTransaction = await MDBConnect.insertOne('transaction', { uid: transaction.uid });
            console.log(newTransaction);
            if (!newTransaction) {
                response.status(404).json({ status: false, data: '', message: 'no document found', });
            }
            const sent = await Notification.notify({
                "uid": transaction.uid,
                "title": transaction.title,
                "desc": transaction.desc,
                "type": transaction.status ? 'danger' : 'info',
                "seen": false,
                "timestamp": Date.now()
            });

            response.status(200).json({ status: true, data: recentTransaction, message: 'success' });
        } catch (err) {
            response.status(500).json({ status: false, data: err, message: 'error occurred' });

        }
    }

    static async transactions(request, response) {
        const { uid, limit } = request.body;
        try {
            const recentTransaction = await MDBConnect.find('transaction', { uid }, limit);
            console.log(recentTransaction);
            if (!recentTransaction) {
                response.status(404).json({ status: false, data: '', message: 'no document found', });
            }
            response.status(200).json({ status: true, data: recentTransaction, message: 'success' });
        } catch (err) {
            response.status(500).json({ status: false, data: err, message: 'error occurred' });

        }
    }



    

}