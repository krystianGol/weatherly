import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_KEY = "0227f9f67a8f81150432bd9213ffc06d";
const API_URL = `http://api.openweathermap.org/data/2.5/forecast?q=London&appid=${API_KEY}`;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    try {
        const response = await axios.get(API_URL);
        res.render("index.ejs", { data: JSON.stringify(response.data) });
    } catch (error) {
        res.render("index.ejs", { data: JSON.stringify(error.response.data) });
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})