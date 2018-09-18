const express = require("express");
const methodOverride = require("method-override");
const { restClient, errorWebhookID, errorWebhookToken, port } = require("./config/config.js");
const Logger = require("./src/Logger/Logger.js");
const app = express();
const { router } = require("./src/routes/routes.js");
const customError = "An error occurred. Please try again later. If the issue persists, please inform the developer!";

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use("/", router);
app.use(methodOverride());
app.use(async (err, req, res) => {
    restClient.executeWebhook(errorWebhookID, errorWebhookToken, {
        username: "Error Logger",
        avatarURL: "https://starttraffic.uk/image/cache/catalog/product-photos/signs/metal-signs/750mm-triangular/metal-sign-danger-warning-1800x1200_0.jpg",
        embeds: [
            {
                title: err.message,
                description: `**Domain**: \`${req.hostname}\`\n**Path**: \`${req.originalUrl}\`\n**URL**: [\`https://${req.hostname}${req.originalUrl}\`](https://${req.hostname}${req.originalUrl})\n\n**Stack**: \`\`\`js\n${err.stack}\`\`\``,
                color: 0xff0000,
                timestamp: new Date()
            }
        ]
    });

    Logger.error(err.stack);
    return res.status(500).send(customError);
});

app.listen(port, Logger.notice(`Listening to port ${port}`));