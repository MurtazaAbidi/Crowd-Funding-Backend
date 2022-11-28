require('dotenv').config();
const express = require('express');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(compression());

app.get ('/', (req, res)=>{
    res.send('App is working fine!');
});

app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`));
