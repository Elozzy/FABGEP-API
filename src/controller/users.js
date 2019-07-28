import jwt from 'jsonwebtoken';
import MDBConnect from '../database/Mongodb';

class Users {

    static async userSignup(request, response) {
        try {
            const userData = { ...request.body };
            const result = await MDBConnect.insert('users', userData);
            const data = { ...result.ops[0] };
            const token = jwt.sign(data, 'foodmoni');
            return response.status(200).json({
                status: true, data: '',
                data: { token, data },
                message: 'success'
            })

        } catch (error) {
            return response.status(500).json({
                status: true, data: '',
                message: 'Service not available',
                'data': ''
            })
        }
    }
    static userLogin(request, response) {

    }
    static userProfile(request, response) {

    }
}

export default Users;