import MDBConnect from '../database/Mongodb';
import Security from '../helper/encryptor';
import NOtification from '../controller/notifiaction';
import Notification from '../controller/notifiaction';
import uuid from 'uuid/v4';

export default class Purse {

    static generateNumber() {
        const random = Date.now().toString();
        const sub = random.substr(6, random.length)

        const salt = Math.floor(100 + Math.random() * 900);
        const num = Number(`${salt}${sub}`);
        return num;

    };
    static async userProfile(request, response) {
        try {
            const { uid } = request.query;
            const data = await MDBConnect.findOne('users', { uid });
            if (!data) {
                return response.status(404).json({
                    status: false,
                    message: 'no document found',
                    'data': data
                })
            }
            return response.status(200).json({
                'status': true,
                data,

                'message': `document found`,
            });
        } catch (error) {
            return response.status(500).json({
                status: false,
                message: 'error occurred',
                'data': error
            })
        }
    }
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
    static async onTransferFailed(transactionRefId, senderData, amount, toAccount) {
        const payload = {
            uid: senderData.uid,
            title: "Transaction Failed",
            desc: `Your transfer of ${amount} to purse ${toAccount} has failed contact support for more information ref: ${transactionRefId} ${new Date().toLocaleDateString()}`,
            type: 'danger',
            seen: false,
            timestamp: Date.now()
        };
        const e = await MDBConnect.insertOne('collection', payload);
        return e;
    }
    static async transfer(request, response) {
        const { amount, toAccount, purpose, pin } = request.body;
        console.log(request.body);

        // Fetch sender data
        const senderData = request.userData;
        console.log(senderData);


        // validate sender pin
        if (pin != senderData.pin) {
            if (!senderPurse) {
                console.log('invalid pin number');
                return response.status(400).json({ data: '', status: false, message: 'invalid pin number' });
            }
        }

        // Fetch sender purse account
        const senderPurse = await MDBConnect.findOne('account', { purseOwner: senderData.uid, number: senderData.purseNumber });
        if (!senderPurse) {
            console.log('invalid account number');
            return response.status(404).json({ data: '', status: false, message: 'invalid account number' });
        }

        console.log(senderPurse);


        // Fetch receiver data
        const receiverData = await MDBConnect.findOne('users', { purseNumber: toAccount });
        if (!receiverData) {
            console.log('invalid receiver account number');
            return response.status(404).json({ data: '', status: false, message: 'invalid receiver account number' });
        }
        console.log(receiverData);

        // Fetch receiver purse account
        const receiverPurse = await MDBConnect.findOne('account', { purseOwner: receiverData.uid, number: toAccount });
        if (!receiverPurse) {
            console.log('invalid account number');
            return response.status(404).json({ data: '', status: false, message: 'invalid account number' });
        }
        console.log(receiverPurse);


        // validate sender has sufficient funds to make transfer
        if (amount > senderPurse.balance) {
            console.log('insufficient funds');
            return response.status(402).json({ data: '', status: false, message: 'insufficient funds' });
        }

        // Create Transaction receipt
        const transactionRefId = `FMT-${senderData.purseNumber.toString().substr(6, 10)}-${toAccount.toString().substr(6, 10)}-${Purse.generateNumber()}`;

        // create transaction
        const senderTransaction = {
            ref: transactionRefId,
            type: 'TRANSFER',
            from: senderData.purseNumber,
            to: toAccount,
            fromAccountName: `${senderData.firstName} ${senderData.lastName}`,
            toAccountName: `${receiverData.firstName} ${receiverData.lastName}`,
            uid: senderData.uid,
            amount: amount,
            currency: 'USD',
            status: 'P',
            title: 'Transfer',
            desc: `Transferred $${amount} from your account to ${receiverData.firstName} ${receiverData.lastName} (${toAccount}). ${purpose}`, timestamp: Date.now(),
            metadata: { ip: Purse.getIp(), useragent: request.useragent },
        };
        const receiverTransaction = {
            ref: transactionRefId,
            type: 'TRANSFER',
            from: senderData.purseNumber,
            to: toAccount,
            fromAccountName: `${senderData.firstName} ${senderData.lastName}`,
            toAccountName: `${receiverData.firstName} ${receiverData.lastName}`,
            uid: receiverData.uid,
            amount: amount,
            currency: 'USD',
            status: 'P',
            title: 'Transfer',
            desc: `Transferred $${amount} from your account to ${receiverData.firstName} ${receiverData.lastName} (${toAccount}). ${purpose}`, timestamp: Date.now(),
            metadata: { ip: Purse.getIp(), useragent: request.useragent },
        };

        const createTransaction = await MDBConnect.insertMany('transaction', [senderTransaction, receiverTransaction]);
        if (!createTransaction) {
            const failed = await onTransferFailed(transactionRefId, senderData.uid, amount, toAccount);
            console.log('unable to initiate transaction');
            return response.status(500).json({ data: '', status: false, message: 'unable to initiate transaction' });
        }

        // log sender and receiver purse snapshot
        const log = await MDBConnect.insertMany('purseSnapshot', [{ ref: transactionRefId, senderPurse: senderPurse, receiverPurse: receiverPurse }]);
        if (!log) {
            const failed = await onTransferFailed(transactionRefId, senderData.uid, amount, toAccount);
            console.log('unable to initiate transaction');
            return response.status(500).json({ data: '', status: false, message: 'unable to initiate transaction' });
        }

        // deduct from sender account
        const updateSenderPurseAccount = await MDBConnect.updateOne('account', { number: senderData.purseNumber, purseOwner: senderData.uid }, { '$inc': { balance: -amount } })
        if (!updateSenderPurseAccount) {
            const failed = await onTransferFailed(transactionRefId, senderData.uid, amount, toAccount);
            console.log('unable to process transaction');
            return response.status(500).json({ data: '', status: false, message: 'unable to process transaction' });
        }

        // increase receiver account
        const updateReceiverPurseAccount = await MDBConnect.updateOne('account', { number: toAccount, purseOwner: receiverData.uid }, { '$inc': { balance: amount } });
        if (!updateReceiverPurseAccount) {
            const failed = await onTransferFailed(transactionRefId, senderData.uid, amount, toAccount);
            console.log('unable to process transaction');
            return response.status(500).json({ data: '', status: false, message: 'unable to process transaction' });
        }

        // update transaction record
        const updateTransaction = await MDBConnect.updateMany('transaction', { ref: transactionRefId, }, { '$set': { status: 'S' } });
        if (!updateTransaction) {
            const failed = await onTransferFailed(transactionRefId, senderData.uid, amount, toAccount);
            console.log('unable to update transaction');
            return response.status(500).json({ data: '', status: false, message: 'unable to update transaction' });
        }

        // create Sender Notification
        const senderNotification = [{
            uid: senderData.uid,
            title: "Debit Alert",
            desc: `Your purse xxxxxx${senderData.purseNumber.toString().substr(6, 10)} has been debited ${amount} ref: ${transactionRefId} Date: ${new Date().toLocaleDateString()}`,
            type: 'success',
            seen: false,
            timestamp: Date.now()
        },
        {
            uid: senderData.uid,
            title: "Transaction Successfully",
            desc: `${amount} has been successfully sent to purse xxxxxx${toAccount.toString().substr(6, 10)} ref: ${transactionRefId} Date: ${new Date().toLocaleDateString()}`,
            type: 'success',
            seen: false,
            timestamp: Date.now()
        }
        ];

        // create Receiver Notification
        const receiverNotification = {
            uid: receiverData.uid,
            title: "Credit Alert",
            desc: `Your purse has been credited with ${amount} from ${senderData.firstName} ${senderData.lastName} xxxxxx${senderData.purseNumber.toString().substr(6, 10)} ref: ${transactionRefId}. Purpose: ${purpose} Date: ${new Date().toLocaleDateString()}`,
            type: 'success',
            seen: false,
            timestamp: Date.now()
        };

        const sendNotification = await MDBConnect.insertMany('notification', [...senderNotification, receiverNotification]);

        if (!sendNotification) {
            console.log('unable to send notification');
        }

        return response.status(200).json({ data: { ...senderTransaction, status: 'S' }, status: true, message: "Transfer Successfully" });


    }
    static async deposit(request, response) {

    }

    static async initTransaction(request, response) {

        const { metadata } = request.body;
        const userData = request.userData;
        // Create Transaction receipt
        const transactionRefId = `FMT-${userData.purseNumber.toString().substr(6, 10)}-0000-${Purse.generateNumber()}`;

        // create transaction
        const transaction = {
            ref: transactionRefId,
            status: 'P',
            metadata: { ip: Purse.getIp(), useragent: request.useragent },
            timestamp: Date.now()
        };
        if (metadata) {
            transaction.metadata = { ...transaction.metadata, ...metadata }
        }

        // Save transaction to database
        const createTransaction = await MDBConnect.insertOne('transaction', transaction);

        // error should occurred
        if (!createTransaction) {
            const failed = await onTransferFailed(transactionRefId, senderData.uid, amount, toAccount);
            console.log('unable to initiate transaction');
            return response.status(500).json({ data: '', status: false, message: 'unable to initiate transaction' });
        }

        //return transaction Ref

        return response.status(201).json({ data: transactionRefId, message: "success", status: true });

    }

    static getIp() {
        // Try and get request origin ip address
        let ip = '';
        try {
            ip = (req.headers['x-forwarded-for'] || '').split(',').pop() ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress
            console.log(`request ip address: ${ip}`);
        } catch (error) {

        }
        return ip;
    }
}