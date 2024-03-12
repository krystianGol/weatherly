import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_KEY = "0227f9f67a8f81150432bd9213ffc06d";
const currentDate = new Date();
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const currentDayIndex = currentDate.getDay();
let nextDaysOfWeek = [];
nextDaysOfWeek.push(daysOfWeek[currentDayIndex]);

let data;
let city;
let currentWeathericonURL;
let forecastIconUrls = [];
let fiveDaysForecastIconsUrl = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    for (let i = 1; i < 6; i++) {
        const nextDayIndex = (currentDayIndex + i) % 7;
        nextDaysOfWeek.push(daysOfWeek[nextDayIndex]);
    }

    res.render('index.ejs', {
        data: data,
        city: city,
        daysOfTheWeek: nextDaysOfWeek,
        currentWeathericonURL: currentWeathericonURL,
        forecastIconUrls: forecastIconUrls,
        fiveDaysForecastIconsUrl: fiveDaysForecastIconsUrl,
    });
})

app.post('/weather', async (req, res) => {
    forecastIconUrls = [];
    fiveDaysForecastIconsUrl = [];

    city = req.body.city;
    const API_URL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;
    try {
        const response = await axios.get(API_URL);
        //response.data.list[0].weather[0].description
        data = response.data;

        currentWeathericonURL = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png`;

        for (let i = 0; i < 9; i++) {
            forecastIconUrls.push(`https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`);
        }

        for (let i = 0; i < 5; i++) {
            fiveDaysForecastIconsUrl.push(`https://openweathermap.org/img/wn/${data.list[i * 8].weather[0].icon}@2x.png`)
        }


        res.redirect("/");
    } catch (error) {
        res.render("index.ejs", { data: "fail" });
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})