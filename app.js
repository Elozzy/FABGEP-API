import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import { join } from 'path';
import logger from 'morgan';
import { MongoClient } from 'mongodb';
import { ObjectID } from 'mongodb';

import usersRouter from './routes/users';
const CONNECTION_URL = "mongodb+srv://foodmoni:B9aCRPAHQf5T1sjZ@cluster0-ax5bs.mongodb.net/";
const DATABASE_NAME = 'foodmoni';

const app = express();


app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/api/v1/', usersRouter);
app.get('/', (request, response)=>{
  return response.status(200).json({
    status: 200,
    error: 'Welcome to Farmmoni API'
  })
})
// catch 404 and forward to error handler
app.use((request, response, next) =>{
  next(createError(404));
});

// error handler
app.use((error, request, response, next)=> {
 
  response.status(error.status || 500).json({
    status: error || 500,
    error: request.app.get('env') === 'development' ? error : {}
  })
});
const port = process.env.PORT || 5000;
app.listen(port, ()=>{ 
  MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
  if(error) {
      throw error;
  }
   const database = client.db(DATABASE_NAME);
   const collection = database.collection("users");
  console.log("Connected to `" + DATABASE_NAME + "`!");
}); });

export default app;
