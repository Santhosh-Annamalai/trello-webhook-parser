module.exports.appRouter = (app, superagent, discordWebhookURL, trelloKey, trelloToken) => {

    // I added support for get request here because Trello API will send a quick http head request before it creates a webhook for a callback URL. More info about it here: https://developers.trello.com/page/webhooks#section-creating-a-webhook

    app.get("/", (req, res) => {
        const ip = req.headers['x-forwarded-for'].split(",")[0];
        if (ip === "107.23.104.115" || "107.23.149.70" || "54.152.166.250" || "54.164.77.56" || "54.209.149.230") {
            res.send("Hello World");
        }
    });

    app.post("/", (req, res) => {
        const ip = req.headers['x-forwarded-for'].split(",")[0];
        // We are doing an IP check here because Trello API sends requests only through these IP addresses.
        if (ip === "107.23.104.115" || "107.23.149.70" || "54.152.166.250" || "54.164.77.56" || "54.209.149.230") {
            const actionData = req.body.action;
            const modelData = req.body.model;
            const actionGeneratorName = actionData.memberCreator.fullName;
            const actionGeneratorUserName = actionData.memberCreator.username;
            const actionGeneratorAvatarURL = actionData.memberCreator.avatarUrl;
            const boardName = modelData.name;
            const parsedData = require("../Trello Functions/types.js").typeParser(actionData, modelData, actionGeneratorName, trelloKey, trelloToken, superagent);
            let returnData;

            superagent
                .post(discordWebhookURL)
                .query({
                    wait: true
                })
                .set("Content-Type", "application/json")
                .send({
                    embeds: [
                        {
                            title: `An action took place in the Board: ${boardName}.`,
                            description: `Action: ${parsedData}`,
                            author: {
                                name: actionGeneratorName,
                                url: `https://trello.com/${actionGeneratorUserName}`,
                                icon_url: ((actionGeneratorAvatarURL !== null) ? `${actionGeneratorAvatarURL}/170.png` : null)
                            }
                        }
                    ]
                })
                .then(value => {
                    return returnData = value.error;
                })
                .catch(err => {
                    return returnData = err.response.error.text;
                });

            // Here we are sending a response because if Trello API doesn't receive a response, it will keep sending post request successively for three times in intervals of 30, 60, and 120 seconds. Also I used an if statement here because Trello API will keep sending requests if we get an error.

            if (returnData == undefined || null || false) {
                res.send("Success!");
            }
            else {
                /*eslint-disable no-console*/
                console.log(returnData);
                /*eslint-enable no-console*/
            }
        }
    });
};