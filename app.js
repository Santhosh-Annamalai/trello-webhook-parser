const express = require("express");
const bodyParser = require("body-parser");
const superagent = require("superagent");
const app = express();
const discordWebhookURL = require("./config.js").discordWebhookURL;
const port = 80;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

require("./src/routes/routes.js").appRouter(app, superagent, discordWebhookURL);

/*eslint-disable no-console*/
app.listen(port, console.log(`Listening to port ${port}`));
/*eslint-enable no-console*/