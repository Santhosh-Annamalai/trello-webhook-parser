module.exports.typeParser = function actionType(data, triggered_by) {
    const type = data.type;
    let verboseData;
    if (type == "addLabelToCard") {
        if (data.data.label.name === "") {
            return verboseData = `A label of color ${data.data.label.color} has been added to the card [${data.data.card.name}](https://www.trello.com/c/${data.data.card.shortLink}/)`;
        }
        else {
            return verboseData = `A label named ${data.data.label.name} has been added to the card [${data.data.card.name}](https://www.trello.com/c/${data.data.card.shortLink}/)`;
        }
    }
    if (type == "createCard") {
        return verboseData = `A card named [${data.data.card.name}](https://www.trello.com/c/${data.data.card.shortLink}/) has been created by ${triggered_by}`;
    }
    if (type == "commentCard") {
        return verboseData = `${triggered_by} commented on the card [${data.data.card.name}](https://www.trello.com/${data.data.card.shortLink}#comment-${data.id}/)`;
    }
    if (type == "createLabel") {
        if (data.data.label.name === "") {
            return verboseData = `A label of color ${data.data.label.color} has been added to this board`;
        }
        else {
            return verboseData = `A label of name ${data.data.label.name} has been added to this board`;
        }
    }
    if (type == "updateLabel") {
        const oldData = data.data.old;
        if (oldData.hasOwnProperty("color")) {
            if (data.data.label.name === "") {
                return verboseData = `The color of a label has been updated from ${oldData.color} to ${data.data.label.color}`;
            }
            else {
                return verboseData = `The color of the label named ${data.data.label.name} has been updated from ${oldData.color} to ${data.data.label.color}`;
            }
        }
        if (oldData.hasOwnProperty("name")) {
            if (oldData.name === "") {
                return verboseData = `The name of the label has been updated from undefined to ${data.data.label.name}`;
            }
            else {
                return verboseData = `The name of the label has been updated from ${oldData.name} to ${data.data.label.name}`;
            }
        }
    }
    return verboseData;
};