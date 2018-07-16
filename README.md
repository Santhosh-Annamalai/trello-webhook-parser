# trello-webhook-parser

**Note**:  
This is a project which is still in development, in case the webhook didn't parse an action, please open an [issue](https://github.com/Santhosh-Annamalai/trello-webhook-parser/issues) in this repo which includes the type of action (i.e. `action.type`) and I would gladly add support for it. If you happen to face any issue / stuck upon a bug, feel free to open an issue explaining all the details.

**Dependencies**:  
    1) Express.js => `npm install express --save`  
    2) BodyParser => `npm install body-parser --save`  
    3) SuperAgent => `npm install superagent --save`  

**Description and Instructions on setting it up**:  
This is an API which will parse Trello Webhooks and send them in the proper format to Discord using Discord Webhooks. To set this API, please make sure you create a Trello Webhook. You can directly create a Trello Webhook at the Trello API Docs page, or you could send a post request to `https://api.trello.com/1/tokens/{APIToken}/webhooks` with your API key as the query string.

To create a Trello Webhook, you would have to host the API which would listen to port 80 (Or whatever port you prefer. To do so, change the port configuration [here](https://github.com/Santhosh-Annamalai/trello-webhook-parser/blob/3d2dd59dea0f7183421eb04ee6598bd0aaf8731f/app.js#L9)). If you have trouble getting a domain for hosting, you can use [ngrok](https://ngrok.com/) for hosting purposes (wouldn't recommend using ngrok for production purposes, use it if you're gonna host this API for personal / testing purposes). Make sure you also change the Discord Webhook URL [here](https://github.com/Santhosh-Annamalai/trello-webhook-parser/blob/3d2dd59dea0f7183421eb04ee6598bd0aaf8731f/app.js#L5).

After going through the aforementioned instructions, run `node app.js` in a node.js command prompt to make it listen to API calls.

Here is an example POST request which uses [superagent](http://visionmedia.github.io/superagent).

```js
const superagent = require("superagent");

superagent
.post("https://api.trello.com/1/tokens/{APIToken}/webhooks")
.set("Content-Type", "application/json")
.query({
    key: APIKey
})
.field({
    description: "Anything you want (Used for identification purposes when you view the details of a Webhook. More info about it here: https://developers.trello.com/v1.0/reference#webhook-object-1",
    callBackURL: "The URL to which this API should respond",
    idModel: "The ID of the Trello Board to watch"
})
.then(value => console.log(value.error))
.catch(error => console.log(error.response.error.text));
```

If these instructions were followed as explained, this API should work properly and would parse the JSON data before sending it as a Discord Webhook.