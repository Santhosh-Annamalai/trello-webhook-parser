const { Router } = require("express");
const { createHmac, timingSafeEqual } = require("crypto");
const router = Router();
const { discordWebhookID, discordWebhookToken, restClient, trelloSecret } = require("../../config/config.js");
const allowedIP = ["107.23.104.115", "107.23.149.70", "54.152.166.250", "54.164.77.56", "54.209.149.230"];

router.get("/webhookparser", (req, res, next) => {
    try {
        const ip = req.headers["x-forwarded-for"].split(",")[0];
        if (ip === allowedIP.find(value => {
            return value === ip;
        })) {
            return res.send("Hello World");
        }
    }
    catch (error) {
        return next(error);
    }
});

router.post("/webhookparser", async (req, res, next) => {
    try {
        const HMAC = createHmac("sha1", trelloSecret).update(JSON.stringify(req.body) + `https://${req.hostname}/webhookparser`).digest("base64");
        const timeSafeEqual = timingSafeEqual(Buffer.from(HMAC, "base64"), Buffer.from(req.headers["x-trello-webhook"], "base64"));
        if (timeSafeEqual === true) {
            const actionData = req.body.action;
            const modelData = req.body.model;
            const actionGeneratorName = actionData.memberCreator.fullName;
            const actionGeneratorUserName = actionData.memberCreator.username;
            const actionGeneratorAvatarURL = actionData.memberCreator.avatarUrl;
            const boardName = modelData.name;
            const cardLink =
                (actionData.data.hasOwnProperty("card"))
                    ? ((actionData.data.card.hasOwnProperty("name") && actionData.data.card.hasOwnProperty("shortLink"))
                        ? `[\`${actionData.data.card.name}\`](https://www.trello.com/c/${actionData.data.card.shortLink})` : null) : null;
            const parsedData = await require("../Trello Actions/types.js").typeParser(actionData, actionGeneratorName, modelData, cardLink);

            await restClient.executeWebhook(discordWebhookID, discordWebhookToken, {
                username: "Trello",
                avatarURL: "https://www.shareicon.net/data/128x128/2017/06/23/887696_cards_512x512.png",
                embeds: [
                    {
                        title: `Board: ${boardName}`,
                        url: modelData.url,
                        description: parsedData[0],
                        color: parsedData[1],
                        author: {
                            name: actionGeneratorName,
                            url: `https://trello.com/${actionGeneratorUserName}`,
                            icon_url: ((actionGeneratorAvatarURL !== null) ? `${actionGeneratorAvatarURL}/170.png` : null)
                        },
                        timestamp: actionData.date
                    }
                ],
                wait: true
            });

            return res.send("Success!");
        }
    }
    catch (error) {
        return next(error);
    }
});

module.exports = {
    router
};