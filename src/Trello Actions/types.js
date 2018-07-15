module.exports.typeParser = function actionType(data, triggered_by) {
    const type = data.type;
    let verboseData;
    if (type === "addLabelToCard") {
        if (data.data.label.name === "") {
            return verboseData = `A label of color \`${data.data.label.color}\` has been added to the card [${data.data.card.name}](https://www.trello.com/c/${data.data.card.shortLink})`;
        }
        else if (data.data.label.hasOwnProperty("color") === false) {
            return verboseData = `A label named \`${data.data.label.name}\` has been added to the card [${data.data.card.name}](https://www.trello.com/c/${data.data.card.shortLink})`;
        }
        else {
            return verboseData = `A label named \`${data.data.label.name}\` of color \`${data.data.label.color}\` has been added to the card [${data.data.card.name}](https://www.trello.com/c/${data.data.card.shortLink})`;
        }
    }
    if (type === "createCard") {
        return verboseData = `A card named [${data.data.card.name}](https://www.trello.com/c/${data.data.card.shortLink}) has been created`;
    }
    if (type === "commentCard") {
        return verboseData = `\`${triggered_by}\` commented on the card [${data.data.card.name}](https://trello.com/c/${data.data.card.shortLink}/${data.data.card.idShort}-${data.data.card.name}#comment-${data.id})\n\n**Content**:\n\`\`\`${data.data.text}\`\`\``;
    }
    if (type === "createLabel") {
        if (data.data.label.name === "") {
            return verboseData = `A label of color \`${data.data.label.color}\` has been added`;
        }
        else {
            return verboseData = `A label of name \`${data.data.label.name}\` has been added`;
        }
    }
    if (type === "updateLabel") {
        if (data.data.hasOwnProperty("old")) {
            const oldData = data.data.old;
            if (oldData.hasOwnProperty("color")) {
                if (data.data.label.name === "") {
                    return verboseData = `The color of a label has been updated from \`${oldData.color}\` to \`${data.data.label.color}\``;
                }
                else if (data.data.label.color === "") {
                    return verboseData = `The color of the label named \`${data.data.label.name}\` has been updated from \`${oldData.color}\` to undefined`;
                }
                else {
                    return verboseData = `The color of the label named \`${data.data.label.name}\` has been updated from \`${oldData.color}\` to \`${data.data.label.color}\``;
                }
            }
            if (oldData.hasOwnProperty("name")) {
                if (oldData.name === "") {
                    return verboseData = `The name of a label has been updated from undefined to \`${data.data.label.name}\``;
                }
                else if (data.data.label.name === "") {
                    return verboseData = `The name of a label has been updated from \`${oldData.name}\` to undefined`;
                }
                else {
                    return verboseData = `The name of a label has been updated from \`${oldData.name}\` to \`${data.data.label.name}\``;
                }
            }
        }
        else if (data.data.hasOwnProperty("old") === false) {
            return verboseData = `The color of a label named \`${data.data.label.name}\` has been updated from undefined to \`${data.data.label.color}\``;
        }
    }
    if (type === "deleteLabel") {
        return verboseData = `A label of ID \`${data.data.label.id}\` has been deleted`;
    }
    if (type === "removeLabelFromCard") {
        if (data.data.label.name === "") {
            return verboseData = `A label of color \`${data.data.label.color}\` has been removed from the card [${data.data.card.name}](https://www.trello.com/c/${data.data.card.shortLink})`;
        }
        else if (data.data.label.hasOwnProperty("color") === false) {
            return verboseData = `A label named \`${data.data.label.name}\` has been removed from the card [${data.data.card.name}](https://www.trello.com/c/${data.data.card.shortLink})`;
        }
        else {
            return verboseData = `A label named \`${data.data.label.name}\` of color \`${data.data.label.color}\` has been removed from the card [${data.data.card.name}](https://www.trello.com/c/${data.data.card.shortLink})`;
        }
    }
    if (type === "deleteComment") {
        return verboseData = `${triggered_by} deleted their comment on card [${data.data.card.name}](https://www.trello.com/c/${data.data.card.shortLink})`;
    }
    if (type === "updateComment") {
        return verboseData = `\`${triggered_by}\` updated their comment on card [${data.data.card.name}](https://trello.com/c/${data.data.card.shortLink}/${data.data.card.idShort}-${data.data.card.name}#comment-${data.id})\n\n**Old Content**:\n\`\`\`${data.data.old.text}\n\n**New Content**:\n\`\`\`${data.data.action.text}\`\`\``;
    }
    if (type === "addChecklistToCard") {
        return verboseData = `A checklist named \`${data.data.checklist.name}\` has been added to the card [${data.data.card.name}](https://www.trello.com/c/${data.data.card.shortLink})`;
    }
    if (type === "createCheckItem") {
        const verboseDataInitial = `An item named \`${data.data.checkItem.name}\` has been added to the checklist \`${data.data.checklist.name}\` of card [${data.data.card.name}](https://www.trello.com/c/${data.data.card.shortLink})\n\n**Users Mentioned**:\n$|8`;
        let verboseDataArray = verboseDataInitial.split("$|8");
        const unparsedData = data.data.checkItem.name.replace(/:(.*?):/g, "");
        if (unparsedData.includes("@")) {
            const splitData = unparsedData.split(" ");
            splitData.forEach(value => {
                if (value.includes("@")) {
                    let splitData2 = value.split("@");
                    splitData2.forEach(value => {
                        if (value !== "") {
                            let finalValue2 = value.match(/[a-z0-9_]/g);
                            let finalValue = finalValue2.join("");
                            if ((finalValue.length >= 3) && (finalValue.length <= 100)) {
                                return verboseDataArray.push(`* [${finalValue}](https://trello.com/${finalValue})\n`);
                            }
                        }
                    });
                    return verboseData = verboseDataArray.join("");
                }

            });
        }
        else {
            verboseDataArray.push("none");
            return verboseData = verboseDataArray.join("");
        }
    }
    if (type === "updateCheckItemStateOnCard") {
        if (data.data.checkItem.state === "complete") {
            return verboseData = `An item named \`${data.data.checkItem.name}\` of card [${data.data.card.name}](https://www.trello.com/c/${data.data.card.shortLink}) has been marked as \`completed\``;
        }
        else {
            return verboseData = `An item named \`${data.data.checkItem.name}\` of card [${data.data.card.name}](https://www.trello.com/c/${data.data.card.shortLink}) has been changed back to \`incomplete\` state`;
        }
    }
    if (type === "updateCheckItem") {
        const verboseDataInitial = `An item name of checklist \`${data.data.checklist.name}\` of card [${data.data.card.name}](https://www.trello.com/c/${data.data.card.shortLink}) has been updated from \`${data.data.old.name}\` to \`${data.data.checkItem.name}\`\n\n**Users mentioned**:\n$|8`;
        let verboseDataArray = verboseDataInitial.split("$|8");
        const rawHtmlData = data.display.entities.checkitem.nameHtml;
        const parsedHtmlData = rawHtmlData.match(/(title=)(.*?)>/g);
        if ((parsedHtmlData !== null) && Array.isArray(parsedHtmlData)) {
            let parsedHtmlData2 = parsedHtmlData.join(",").match(/"(.*?)"/g).join(",").match(/[^"]/g).join("").split(",");
            for (let i = 0; i < parsedHtmlData2.length; i++) {
                verboseDataArray.push(`${i + 1}) [${parsedHtmlData2[i]}](https://trello.com/${parsedHtmlData2[i]})\n`);
            }
            return verboseData = verboseDataArray.join("");
        }
        else {
            verboseDataArray.push("none");
            return verboseData = verboseDataArray.join("");
        }
    }
    return verboseData;
};