const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/get-data', (req, res) => {
    res.json({
        name: 'Io', 
        age: 17,
    });
})

app.post('/create', (req, res) => { 
    console.log(req.body);
    res.json({ success: true });
});
    

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));