require("babel-core/register");
import ip from 'ip';
import '@babel/polyfill';
import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import { join } from 'path';
import logger from 'morgan';
import useragent from 'express-useragent';


import Authentication from './helper/authentication';
import usersRouter from './routes/users';
import purseRouter from './routes/purse';
import notification from './routes/notification';

const app = express();

app.use(useragent.express());
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/api/v1/', usersRouter);
app.get('/', (request, response) => {
  return response.status(200).json({
    status: true, data: '',
    message: 'Welcome to Foodmoni API'
  })
})
app.use(Authentication.isAuthenticated);
app.use('/api/v1/', purseRouter);
app.use('/api/v1/', notification);



// catch 404 and forward to error handler
app.use((request, response, next) => {
  next(createError(404));
});

// error handler
app.use((error, request, response, next) => {
  console.log(error);
  response.status(error.status || 500).json({
    status: false, data: error,
    message: error.message || 'Service not available'
  })
});
const port = process.env.PORT || 5000;
const host = process.env.IP || ip.address();
app.listen(port, host, () => { console.log(`Server Running on host:${host} port: ${port}`) });

export default app;
