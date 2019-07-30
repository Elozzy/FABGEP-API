import MDBConnect from '../database/Mongodb';
import Security from '../helper/encryptor';



export default class Purse {



    static async purse(request, response) {

        const { uid } = request.query;
        try {

            const account = await MDBConnect.findOne('account', { purseOwner: uid });

            if (!account) {
                response.status(404).json({ status: false, data: '', message: 'document not found' });
            }
            const secureData = Security.dataEncrypt(JSON.stringify(account));
            response.status(200).json({ status: true, data: secureData, message: 'success' });
        } catch (error) {
            response.status(500).json({ status: false, data: error, message: 'error occurred' });

        }


    }



}