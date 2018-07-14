const express = require("express");
const bodyParser = require("body-parser");
const superagent = require("superagent");
const app = express();
const discordWebhookURL = require("./config.js").discordWebhookURL;
const trelloKey = require("./config.js").trelloKey;
const trelloToken = require("./config.js").trelloToken;
const idModel = require("./config.js").idModel;
const port = 80;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

require("./routes/routes.js").appRouter(app, superagent, discordWebhookURL, trelloKey, trelloToken);

/*eslint-disable no-console*/
app.listen(port, console.log(`Listening to port ${port}`));
/*eslint-enable no-console*/