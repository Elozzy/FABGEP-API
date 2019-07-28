import jwt from 'jsonwebtoken';
import MDBConnect  from '../database/Mongodb';

class Users{

    static async userSignup(request, response){
        try{
        const userData = { ...request.body };
        const result = await MDBConnect.insert('users', userData);
        const data = { ...result.ops[0]};
        const token = jwt.sign(data, 'foodmoni');
        return response.status(200).json({
            status: 200,
            token,
            data
        })

        }catch(error){
           return response.status(500).json({
               status: 500,
               error: 'Service not available'
           })
        }     
    }
    static userLogin(request, response){

    }
    static userProfile(request, response){
        
    }
}

export default Users;