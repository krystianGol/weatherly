import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_KEY = "0227f9f67a8f81150432bd9213ffc06d";
const API_URL = `http://api.openweathermap.org/data/2.5/forecast?q=London&appid=${API_KEY}`;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render('index.ejs');
})

app.post('/weather', async (req, res) => {
    try {
        const response = await axios.get(API_URL);
        //response.data.list[0].weather[0].description
        console.log(response.data.list[0].dt_txt);
        res.render("index.ejs", { data: req.body.city });
    } catch (error) {
        res.render("index.ejs", { data: "fail" });
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})