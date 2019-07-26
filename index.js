const express = require('express');

const PORT = process.env.port || 4000;
const app = express();

app.get('/', (req, res) => {
    res.status(200).send('server online');
})

app.listen(PORT, () => {
    console.log(`serve running on port ${PORT}`);
})