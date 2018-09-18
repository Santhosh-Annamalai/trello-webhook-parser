// Tokens and other sensitive stuff imports
const discordWebhookToken = "WebhookToken";
const discordWebhookID = "WebhookID";
const errorWebhookID = "ErrorWebhookToken";
const errorWebhookToken = "ErrorWebhookToken";
const { trelloKey, trelloToken, trelloSecret } = process.env;
const idModel = "ID"; // ID of the trello board

// Client initialization
const { Client } = require("eris");
const restClient = new Client("", { restMode: true });

// API related exports
const port = 80;

module.exports = {
    discordWebhookToken,
    discordWebhookID,
    errorWebhookID,
    errorWebhookToken,
    trelloKey,
    trelloToken,
    idModel,
    restClient,
    port,
    trelloSecret
};