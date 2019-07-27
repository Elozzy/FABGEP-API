const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoute = require('./routes/user');
const PORT = process.env.port || 4000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(userRoute);


app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        status: err.status,
        message: 'fatal error',
        data: ""
    })
})

app.listen(PORT, () => {
    console.log(`serve running on port ${PORT}`);
})

module.exports = app;