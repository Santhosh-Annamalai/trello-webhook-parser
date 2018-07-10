const express = require("express");
const bodyParser = require("body-parser");
const superagent = require("superagent");
const app = express();
const discordWebhookURL = require("./config.js").discordWebhookURL;

/*eslint-disable no-console*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", (req) => {
    superagent
    .post(`${discordWebhookURL}`)
    .field({
        content: req.body
    })
    .then(value => console.log(value.text))
    .catch(err => console.log(err.text));
});

app.listen(80, console.log("Listening"));