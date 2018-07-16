module.exports.typeParser = function actionType(data, triggered_by, model) {
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
        return verboseData = `\`${triggered_by}\` updated their comment on card [${data.data.card.name}](https://trello.com/c/${data.data.card.shortLink}/${data.data.card.idShort}-${data.data.card.name}#comment-${data.id})\n\n**Old Comment**:\n\`\`\`${data.data.old.text}\n\n**New Comment**:\n\`\`\`${data.data.action.text}\`\`\``;
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
    if (type === "deleteCheckItem") {
        return verboseData = `An item named \`${data.data.checkItem.name}\` has beem deleted from the Checklist \`${data.data.checklist.name}\` of card [${data.data.card.name}](https://www.trello.com/c/${data.data.card.shortLink})`;
    }
    if (type === "convertToCardFromCheckItem") {
        return verboseData = `An item named \`${data.data.card.name}\` of card [${data.data.cardSource.name}](https://www.trello.com/c/${data.data.cardSource.shortLink}) has been converted to a card named [${data.data.card.name}](https://www.trello.com/c/${data.data.card.shortLink}) which is under the list \`${data.data.list.name}\``;
    }
    if (type === "removeChecklistFromCard") {
        return verboseData = `A checklist named \`${data.data.checklist.name}\` has been removed from the card [${data.data.card.name}](https://www.trello.com/c/${data.data.card.shortLink})`;
    }
    if (type === "copyChecklist") {
        return verboseData = `A checklist named ${data.data.checklistSource.name} has been copied from a card`;
    }
    if (type === "addMemberToBoard") {
        return verboseData = `[${data.display.entities.member.text}](https://trello.com/${data.display.entities.member.username}) has been added to the board`;
    }
    if (type === "addMemberToCard") {
        return verboseData = `[${data.display.entities.member.text}](https://trello.com/${data.display.entities.member.username}) has been added to the card named [${data.data.card.name}](https://www.trello.com/c/${data.data.card.shortLink})`;
    }
    if (type === "updateCard") {
        if (data.data.hasOwnProperty("old")) {
            const oldData = data.data.old;
            if (oldData.hasOwnProperty("desc")) {
                if (oldData.desc === "") {
                    return verboseData = `The description of a card named [${data.data.card.name}](https://www.trello.com/c/${data.data.card.shortLink}) has been added\n\n**Description**:\n\`\`\`${data.data.card.desc}`;
                }
                else if (data.data.card.desc === "") {
                    return verboseData = `The description of a card named [${data.data.card.name}](https://www.trello.com/c/${data.data.card.shortLink}) has been cleared\n\n**Old Description**:\n\`\`\`${oldData.desc}\`\`\``;
                }
                else {
                    return verboseData = `The description of a card named [${data.data.card.name}](https://www.trello.com/c/${data.data.card.shortLink}) has been updated\n\n**Old Description**:\n\`\`\`${oldData.desc}\n\n**New Description**:\n\`\`\`${data.data.card.desc}\`\`\``;
                }
            }
            if (oldData.hasOwnProperty("due")) {
                if (oldData.due === null) {
                    return verboseData = `The due date of a card named [${data.data.card.name}](https://www.trello.com/c/${data.data.card.shortLink}) has been changed from undefined to ${new Date(data.data.card.due).toUTCString()}`;
                }
                else if (data.data.card.due === null) {
                    return verboseData = `The due date of a card named [${data.data.card.name}](https://www.trello.com/c/${data.data.card.shortLink}) has been changed from ${new Date(oldData.due).toUTCString()} to undefined`;
                }
                else {
                    return verboseData = `The due date of a card named [${data.data.card.name}](https://www.trello.com/c/${data.data.card.shortLink}) has been changed from ${new Date(oldData.due).toUTCString()} to ${new Date(data.data.card.due).toUTCString()}`;
                }
            }
            if (oldData.hasOwnProperty("idList")) {
                return verboseData = `A card named [${data.data.card.name}](https://www.trello.com/c/${data.data.card.shortLink}) has been moved from the list named \`${data.display.entities.listBefore.text}\` to the list named \`${data.display.entities.listAfter.text}\``;
            }
            if (oldData.hasOwnProperty("pos")) {
                return verboseData = `The join position of a card named [${data.data.card.name}](https://www.trello.com/c/${data.data.card.shortLink}) has been updated in the list \`${data.data.list.name}\``;
            }
            if (oldData.hasOwnProperty("closed")) {
                if (oldData.closed === false) {
                    return verboseData = `A card named [${data.data.card.name}](https://www.trello.com/c/${data.data.card.shortLink}) has been archived`;
                }
                else {
                    return verboseData = `A card named [${data.data.card.name}](https://www.trello.com/c/${data.data.card.shortLink}) has been unarchived`;
                }
            }
            if (oldData.hasOwnProperty("name")) {
                return verboseData = `A card name has been changed from \`${oldData.name}\` to [${data.data.card.name}](https://www.trello.com/c/${data.data.card.shortLink})`;
            }
        }
    }
    if (type === "addAttachmentToCard") {
        return verboseData = `An [Attachment](${data.data.attachment.url}) has been added to a card named [${data.data.card.name}](https://www.trello.com/c/${data.data.card.shortLink})`;
    }
    if (type === "copyCard") {
        return verboseData = `A card named [${data.data.card.name}](https://www.trello.com/c/${data.data.card.shortLink}) has been copied from [${data.data.cardSource.name}](https://www.trello.com/c/${data.data.cardSource.shortLink}) to the list \`${data.data.list.name}\``;
    }
    if (type === "removeMemberFromCard") {
        return verboseData = `[${data.display.entities.member.text}](https://trello.com/${data.display.entities.member.username}) has been removed from the card named [${data.data.card.name}](https://www.trello.com/c/${data.data.card.shortLink})`;
    }
    if (type === "removeMemberFromBoard") {
        return verboseData = `[${data.display.entities.member.text}](https://trello.com/${data.display.entities.member.username}) has been removed from this board`;
    }
    if (type === "makeAdminOfBoard") {
        return verboseData = `[${data.display.entities.member.text}](https://trello.com/${data.display.entities.member.username}) has been made as an Admin of this board`;
    }
    if (type === "updateBoard") {
        if (data.data.hasOwnProperty("old")) {
            const oldData = data.data.old;
            if (oldData.hasOwnProperty("prefs")) {
                if (oldData.prefs.hasOwnProperty("permissionLevel")) {
                    return verboseData = `The board has been changed from ${oldData.prefs.permissionLevel} to ${data.data.board.prefs.permissionLevel}`;
                }
                if (oldData.prefs.hasOwnProperty("background")) {
                    if ((model.prefs.backgroundImage === null) && (oldData.length <= 7)) {
                        return verboseData = `The background of this board has been changed from \`${oldData.prefs.background}\` to \`${data.data.board.prefs.background}\``;
                    }
                    else if (Array.isArray(model.prefs.backgroundImageScaled) && (oldData.length <= 7)) {
                        const background = model.prefs.backgroundImageScaled;
                        let finalBackgroundURL;
                        background.find(value => {
                            if (value.width === 1920) {
                                return finalBackgroundURL = value.url;
                            }
                        });
                        return verboseData = `The background of this board has been updated from \`${oldData.prefs.background}\` to an [image](${finalBackgroundURL})`;
                    }
                    else {
                        const background = model.prefs.backgroundImageScaled;
                        let finalBackgroundURL;
                        background.find(value => {
                            if (value.width === 1920) {
                                return finalBackgroundURL = value.url;
                            }
                        });
                        return verboseData = `The background of this board has been changed from an [image](${finalBackgroundURL}) to a color named \`${oldData.prefs.background}\``;
                    }
                }
                if (oldData.prefs.hasOwnProperty("voting")) {
                    return verboseData = `Voting permission has been changed from \`${oldData.prefs.voting}\` to \`${data.data.board.prefs.voting}\``;
                }
            }
        }
    }
    if (type === "deleteCard") {
        return verboseData = `A card has been deleted in the list \`${data.data.list.name}\``;
    }
    if (type === "removeFromOrganizationBoard") {
        return verboseData = `This board has been removed from the organization named \`${data.data.organization.name}\``;
    }
    if (type === "addToOrganizationBoard") {
        return verboseData = `This board has been made part of an organization named \`${data.data.organization.name}\``;
    }
    if (type === "enablePlugin") {
        return verboseData = `A plugin named ${data.data.plugin.name} has been enabled in this board`;
    }
    if (type === "createList") {
        return verboseData = `A list named \`${data.data.list.name}\` has been created`;
    }
    if (type === "updateList") {
        if (data.data.hasOwnProperty("old")) {
            const oldData = data.data.old;
            if (oldData.hasOwnProperty("pos")) {
                return verboseData = `The position of a list named ${data.data.list.name} has been changed`;
            }
            if (oldData.hasOwnProperty("name")) {
                return verboseData = `The name of a list has been changed from \`${oldData.name}\` to \`${data.data.list.name}\``;
            }
            if (oldData.hasOwnProperty("closed")) {
                if (oldData.closed === false) {
                    return verboseData = `A label named \`${data.data.label.name}\` has been archived`;
                }
                else {
                    return verboseData = `A label named \`${data.data.label.name}\` has been unarchived`;
                }
            }
        }
    }
    if (type === "moveListFromBoard") {
        return verboseData = `A list named \`${data.data.list.name}\` has been moved to a board named [${data.display.entities.board.text}](https://trello.com/b/${data.display.entities.board.shortLink})`;
    }
    if (type === "voteOnCard") {
        if (data.data.voted === true) {
            return verboseData = `A vote has been placed on the card [${data.data.card.name}](https://trello.com/c/${data.data.card.shortLink})`;
        }
        else {
            return verboseData = `A vote has been removed from the card [${data.data.card.name}](https://trello.com/c/${data.data.card.shortLink})`;
        }
    }

    return verboseData;
};