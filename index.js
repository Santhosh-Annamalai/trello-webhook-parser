const express = require("express");
const bodyParser = require("body-parser");
const superagent = require("superagent");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", (req) => {
    superagent
    .post("https://discordapp.com/api/webhooks/465856126244880388/QIynzGFp2myQ0KAAYIE_Ump0uWFVFCEPDa16HMqB60S2hm3RHvjlZlzexeDPU0wWlAM5")
    .field({
        content: req.body
    })
})

app.listen(80, console.log("Listening"));