import { jwt } from 'jsonwebtoken';
import { MDBConnect } from '../database/Mongodb';


export default class purse{



    static async getNewAccountNumber(request, response) {
        try {

            const result = await MDBConnect.findOne()

            
        } catch (err) {
            response.status(500).json({
                status: 500,
                error: 'Service not available'
            })
        }
        
    }


}