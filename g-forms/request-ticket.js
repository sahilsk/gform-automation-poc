var formTitle = "My Awesome Form 1"

function getAllForms(formTitle) {
    var files = DriveApp.getFilesByType("application/vnd.google-apps.form")
    while (files.hasNext()) {
        var file = files.next();
        Logger.log("Started");
        Logger.log('file info-> %s : %s.', file.getName(), file.getMimeType());
        Logger.log('url: %s', file.getId());
    }
}

function findExistingForm(title) {
    var files = DriveApp.getFilesByType("application/vnd.google-apps.form")
    while (files.hasNext()) {
        var file = files.next();
        Logger.log("Started");
        if (file.getName() == title) {
            return file.getId()
        }
        Logger.log('file info-> %s : %s.', file.getName(), file.getMimeType());
        Logger.log('url: %s', file.getId());
    }
    return null
}


function createOrUpdateForm() {
    var form = null;
    var id = findExistingForm(formTitle);
    if (id == null) {
        Logger.log("Creating a new form");
        form = FormApp.create(formTitle);
    } else {
        Logger.log("Found existing form. Opening it");
        form = FormApp.openById(id);
    }

    resetForm(form);
    updateForm(form);
    registerTriggers(form);
}


function resetForm(form) {
    //clear all items
    var items = form.getItems();
    for (var i = 0; i < items.length; i++) {
        form.deleteItem(items[i]);
    }
    // Deletes all triggers
    var triggers = ScriptApp.getUserTriggers(form);
    for (var i = 0; i < triggers.length; i++) {
        ScriptApp.deleteTrigger(triggers[i]);
    }
}

function updateForm(form) {

    var item = form.addCheckboxItem();
    item.setTitle('What condiments would you like on your hot dog?');
    item.setChoices([
        item.createChoice('Ketchup223'),
        item.createChoice('Mustard'),
        item.createChoice('Relish')
    ]);
    form.addMultipleChoiceItem()
        .setTitle('Do you prefer cats or dogs?')
        .setChoiceValues(['Cats', 'Dogs'])
        .showOtherOption(true);
    form.addPageBreakItem()
        .setTitle('Getting to know you');
    form.addDateItem()
        .setTitle('When were you born?');
    form.addGridItem()
        .setTitle('Rate your interests')
        .setRows(['Cars', 'Computers', 'Celebrities'])
        .setColumns(['Boring', 'So-so', 'Interesting']);
    Logger.log('Published URL: ' + form.getPublishedUrl());
    Logger.log('Editor URL: ' + form.getEditUrl());
}

function registerTriggers(form) {
    // Log the authorization status (REQUIRED or NOT_REQUIRED).
    var authInfo = ScriptApp.getAuthorizationInfo(ScriptApp.AuthMode.FULL);
    Logger.log(authInfo.getAuthorizationStatus());
    Logger.log(authInfo.getAuthorizationUrl());

    //create onFormSubmit Trigger  
    ScriptApp.newTrigger('onSubmit')
        .forForm(form)
        .onFormSubmit()
        .create();
}

function onSubmit(e) {
    var googleLogoUrl = "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";
    var youtubeLogoUrl =
        "https://developers.google.com/youtube/images/YouTube_logo_standard_white.png";
    var googleLogoBlob = UrlFetchApp
        .fetch(googleLogoUrl)
        .getBlob()
        .setName("googleLogoBlob");
    var youtubeLogoBlob = UrlFetchApp
        .fetch(youtubeLogoUrl)
        .getBlob()
        .setName("youtubeLogoBlob");
    MailApp.sendEmail({
        to: "sonu.meena@aurea.com",
        subject: "Logos",
        htmlBody: "inline Google Logo<img src='cid:googleLogo'> images! <br>" +
            "inline YouTube Logo <img src='cid:youtubeLogo'>",
        inlineImages:
        {
            googleLogo: googleLogoBlob,
            youtubeLogo: youtubeLogoBlob
        }
    });

    onFormSubmit(e);
}

function HelloWorld() {
    Logger.log("Hello, world");
}

function onFormSubmit(e) {
    var url = "https://stackstorm.aureacentral.com/api/v1/webhooks/gforms?st2-api-key=YmEzNmU5OGYxODcxNjczNjZiM2I3ZjEwZGM4NjRkOGI3NzI1OTQzOGU3MzA4NDA5YTIyNDY3N2RlODA5MzUxMw";
    var formResponse = e.response;
    var itemResponses = formResponse.getItemResponses();
    var data = {}
    for (var j = 0; j < itemResponses.length; j++) {
        var itemResponse = itemResponses[j];
        Logger.log('Response #%s to the question "%s" was "%s"',
            (i + 1).toString(),
            itemResponse.getItem().getTitle(),
            itemResponse.getResponse());
        data[itemResponse.getItem().getTitle()] = itemResponse.getResponse();
    }

    var options = {
        "method": "post",
        "headers": {
            "Content-Type": "application/json"
        },
        "payload": JSON.stringify(data)
    };
    var response = UrlFetchApp.fetch(url, options);

}