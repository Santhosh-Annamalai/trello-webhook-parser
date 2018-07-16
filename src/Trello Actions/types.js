module.exports.typeParser = function actionType(data, triggered_by, model, cardLink) {
    const type = data.type;
    let verboseData;
    if (type === "addLabelToCard") {
        if (data.data.label.name === "") {
            return verboseData = `A label of color \`${data.data.label.color}\` has been added to the card ${cardLink}`;
        }
        else if (data.data.label.hasOwnProperty("color") === false) {
            return verboseData = `A label named \`${data.data.label.name}\` has been added to the card ${cardLink}`;
        }
        else {
            return verboseData = `A label named \`${data.data.label.name}\` of color \`${data.data.label.color}\` has been added to the card ${cardLink}`;
        }
    }
    if ((type === "createCard") || (type === "emailCard")) {
        return verboseData = `A card named ${cardLink} has been created`;
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
            return verboseData = `A label of color \`${data.data.label.color}\` has been removed from the card ${cardLink}`;
        }
        else if (data.data.label.hasOwnProperty("color") === false) {
            return verboseData = `A label named \`${data.data.label.name}\` has been removed from the card ${cardLink}`;
        }
        else {
            return verboseData = `A label named \`${data.data.label.name}\` of color \`${data.data.label.color}\` has been removed from the card ${cardLink}`;
        }
    }
    if (type === "deleteComment") {
        return verboseData = `${triggered_by} deleted their comment on card ${cardLink}`;
    }
    if (type === "updateComment") {
        return verboseData = `\`${triggered_by}\` updated their comment on card [${data.data.card.name}](https://trello.com/c/${data.data.card.shortLink}/${data.data.card.idShort}-${data.data.card.name}#comment-${data.id})\n\n**Old Comment**:\n\`\`\`${data.data.old.text}\`\`\`\n**New Comment**:\n\`\`\`${data.data.action.text}\`\`\``;
    }
    if (type === "addChecklistToCard") {
        return verboseData = `A checklist named \`${data.data.checklist.name}\` has been added to the card ${cardLink}`;
    }
    if (type === "createCheckItem") {
        const verboseDataInitial = `An item named \`${data.data.checkItem.name}\` has been added to the checklist \`${data.data.checklist.name}\` of card ${cardLink}\n\n**Users Mentioned**:\n$|8`;
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
            return verboseData = `An item named \`${data.data.checkItem.name}\` of card ${cardLink} has been marked as \`completed\``;
        }
        else {
            return verboseData = `An item named \`${data.data.checkItem.name}\` of card ${cardLink} has been changed back to \`incomplete\` state`;
        }
    }
    if (type === "updateCheckItem") {
        const verboseDataInitial = `An item name of checklist \`${data.data.checklist.name}\` of card ${cardLink} has been updated from \`${data.data.old.name}\` to \`${data.data.checkItem.name}\`\n\n**Users mentioned**:\n$|8`;
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
        return verboseData = `An item named \`${data.data.checkItem.name}\` has beem deleted from the Checklist \`${data.data.checklist.name}\` of card ${cardLink}`;
    }
    if (type === "convertToCardFromCheckItem") {
        return verboseData = `An item named \`${data.data.card.name}\` of card [${data.data.cardSource.name}](https://www.trello.com/c/${data.data.cardSource.shortLink}) has been converted to a card named ${cardLink} which is under the list \`${data.data.list.name}\``;
    }
    if (type === "removeChecklistFromCard") {
        return verboseData = `A checklist named \`${data.data.checklist.name}\` has been removed from the card ${cardLink}`;
    }
    if (type === "copyChecklist") {
        return verboseData = `A checklist named \`${data.data.checklistSource.name}\` has been copied from a checklist named \`${data.data.checklistSource.name}\``;
    }
    if (type === "addMemberToBoard") {
        return verboseData = `[${data.display.entities.member.text}](https://trello.com/${data.display.entities.member.username}) has been added to the board`;
    }
    if (type === "addMemberToCard") {
        return verboseData = `[${data.display.entities.member.text}](https://trello.com/${data.display.entities.member.username}) has been added to the card named ${cardLink}`;
    }
    if (type === "updateCard") {
        if (data.data.hasOwnProperty("old")) {
            const oldData = data.data.old;
            if (oldData.hasOwnProperty("desc")) {
                if (oldData.desc === "") {
                    return verboseData = `A description has been added to a card named ${cardLink}\n\n**Description**:\n\`\`\`${data.data.card.desc}\`\`\``;
                }
                else if (data.data.card.desc === "") {
                    return verboseData = `The description of a card named ${cardLink} has been cleared\n\n**Old Description**:\n\`\`\`${oldData.desc}\`\`\``;
                }
                else {
                    return verboseData = `The description of a card named ${cardLink} has been updated\n\n**Old Description**:\n\`\`\`${oldData.desc}\`\`\`\n\n**New Description**:\n\`\`\`${data.data.card.desc}\`\`\``;
                }
            }
            if (oldData.hasOwnProperty("due")) {
                if (oldData.due === null) {
                    return verboseData = `The due date of a card named ${cardLink} has been changed from undefined to \`${new Date(data.data.card.due).toUTCString()}\``;
                }
                else if (data.data.card.due === null) {
                    return verboseData = `The due date of a card named ${cardLink} has been changed from \`${new Date(oldData.due).toUTCString()}\` to undefined`;
                }
                else {
                    return verboseData = `The due date of a card named ${cardLink} has been changed from \`${new Date(oldData.due).toUTCString()}\` to \`${new Date(data.data.card.due).toUTCString()}\``;
                }
            }
            if (oldData.hasOwnProperty("idList")) {
                return verboseData = `A card named ${cardLink} has been moved from the list named \`${data.display.entities.listBefore.text}\` to the list named \`${data.display.entities.listAfter.text}\``;
            }
            if (oldData.hasOwnProperty("pos")) {
                return verboseData = `The position of a card named ${cardLink} has been updated in the list \`${data.data.list.name}\``;
            }
            if (oldData.hasOwnProperty("closed")) {
                if (oldData.closed === false) {
                    return verboseData = `A card named ${cardLink} has been archived`;
                }
                else {
                    return verboseData = `A card named ${cardLink} has been unarchived`;
                }
            }
            if (oldData.hasOwnProperty("name")) {
                return verboseData = `A card name has been changed from \`${oldData.name}\` to ${cardLink}`;
            }
            if (oldData.hasOwnProperty("idAttachmentCover")) {
                if (oldData.idAttachmentCover === "") {
                    return verboseData = `A cover image has been added to the card named ${cardLink}`;
                }
                else {
                    return verboseData = `A cover image has been removed from the card named ${cardLink}`;
                }
            }
        }
    }
    if (type === "addAttachmentToCard") {
        return verboseData = `An [Attachment](${data.data.attachment.url}) has been added to a card named ${cardLink}`;
    }
    if (type === "deleteAttachmentFromCard") {
        return verboseData = `An Attachment has been removed from a card named ${cardLink}`;
    }
    if (type === "copyCard") {
        return verboseData = `A card named ${cardLink} has been copied from [${data.data.cardSource.name}](https://www.trello.com/c/${data.data.cardSource.shortLink}) to the list \`${data.data.list.name}\``;
    }
    if (type === "copyCommentCard") {
        return verboseData = `A comment of card [${data.data.cardSource.name}](https://www.trello.com/c/${data.data.cardSource.id}) has been copied to the card named [${data.data.card.name}](https://www.trello.com/c/${data.data.card.id}#comment-${data.id})`;
    }
    if (type === "removeMemberFromCard") {
        return verboseData = `[${data.display.entities.member.text}](https://trello.com/${data.display.entities.member.username}) has been removed from the card named ${cardLink}`;
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
                    if ((model.prefs.backgroundImage === null) && (oldData.prefs.background.length <= 7)) {
                        return verboseData = `The background of this board has been changed from \`${oldData.prefs.background}\` to \`${data.data.board.prefs.background}\``;
                    }
                    else if (Array.isArray(model.prefs.backgroundImageScaled) && (oldData.prefs.background.length <= 7)) {
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
                        return verboseData = `The background of this board has been changed from an image to a color named \`${data.data.board.prefs.background}\``;
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
        return verboseData = `A plugin named \`${data.data.plugin.name}\` has been enabled`;
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
            return verboseData = `A vote has been placed on the card ${cardLink}`;
        }
        else {
            return verboseData = `A vote has been removed from the card ${cardLink}`;
        }
    }
    if (type === "disablePlugin") {
        return verboseData = `A plugin named \`${data.data.plugin.name}\` has been disabled`;
    }
    if (type === "moveCardFromBoard") {
        return verboseData = `A card of list \`${data.data.list.name}\` has been moved from this board to [${data.display.entities.board.text}](https://trello.com/c/${data.display.entities.card.id})`;
    }
    if (type === "moveCardToBoard") {
        return verboseData = `A card named [${data.data.card.name}](https://trello.com/c/${data.data.card.id}) has been moved to this board from [${data.display.entities.board.text}](https://trello.com/b/${data.data.boardSource.id})`;
    }

    return verboseData;
};