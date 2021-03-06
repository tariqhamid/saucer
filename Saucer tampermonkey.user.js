// ==UserScript==
// @name         Saucer tampermonkey
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Tariq Hamid
// @match        https://script.google.com/a/*/d/*/edit?*
// @match        https://script.google.com/a/*/macros/d/*/edit?*
// @require      https://apis.google.com/js/api.js
// @require      http://code.jquery.com/jquery-latest.js
// @require      https://greasyfork.org/scripts/1003-wait-for-key-elements/code/Wait%20for%20key%20elements.js?version=49342
// @grant        none
// ==/UserScript==

var data = {};

function onLoadFn() {
    var clientDictionary = {
        'MUZanSQRlvJgBUXsWbpV2YkMeTNx2jEzZ' : "906571493642-910o6t3k0nioumud2665q9icap4ol8f0.apps.googleusercontent.com",  // tariq-oauth2
        'MW6Ktw7UUlFlremClaKWUk0MeTNx2jEzZ' : "602450155491-uddj7ebqssapb3pagvfud0oavpv71b69.apps.googleusercontent.com",  // tariq-couch
        "MikEQHX9sr8MV3Tpsauv0Gg_JiAr4mIiA" : "1045677864060-7o0uujmvgtsf55vngvgj6p4samr3240b.apps.googleusercontent.com"  // synergy
    };


    // NB authentification very sensitive to SCOPES !!!
    var SCOPES = ['https://www.google.com/calendar/feeds',
                  'https://www.googleapis.com/auth/documents',
                  'https://www.googleapis.com/auth/drive',
                  'https://www.googleapis.com/auth/forms',
                  'https://www.googleapis.com/auth/script.external_request',
                  'https://www.googleapis.com/auth/script.scriptapp',
                  'https://www.googleapis.com/auth/script.send_mail',
                  'https://www.googleapis.com/auth/script.storage',
                  'https://www.googleapis.com/auth/spreadsheets',
                  'https://www.googleapis.com/auth/userinfo.email'];


    /**
     * Check if current user has authorized this application.
     */
    function checkAuth() {
        console.log(clientDictionary[data['Project key']]);
        gapi.auth.authorize({
            'client_id': clientDictionary[data['Project key']],
            'scope': SCOPES,
            'immediate': true
        }, handleAuthResult);
    }

    /**
     * Handle response from authorization server.
     *
     * @param {Object} authResult Authorization result.
     */
    function handleAuthResult(authResult) {
        //var authorizeDiv = document.getElementById('authorize-div');
        //var loadDiv = document.getElementById('loading');
        if (authResult && !authResult.error) {
            // Hide auth UI, then load client library.
            ///authorizeDiv.style.display = 'none';
            ///loadDiv.style.display = 'block';
            callScriptFunction();
        } else {
            // Show auth UI, allowing the user to initiate authorization by
            // clicking authorize button.
            //authorizeDiv.style.display = 'inline';
        }
    }


    /**
     * Initiate auth flow in response to user clicking authorize button.
     *
     * @param {Event} event Button click event.
     */
    function handleAuthClick(event) {
        gapi.auth.authorize({
            client_id: clientDictionary[data['Project key']],
            scope: SCOPES,
            immediate: false
        },
                            handleAuthResult);
        return false;
    }

    try
    {
        handleAuthClick();
    }
    catch (e)
    {
        alert(e.message);
    }

    function callScriptFunction()
    {
        var scriptId = data['Project key'];

        // Create execution request.
        var request = {
            'function': 'saucer_getSourceStub',
            'parameters': [data],
            'devMode': true   // Optional.
        };

        // Make the request.
        var op = gapi.client.request({
            'root': 'https://script.googleapis.com',
            'path': 'v1/scripts/' + scriptId + ':run',
            'method': 'POST',
            'body': request
        });

        // Log the results of the request.
        op.execute(function(resp) {
            if (resp.error && resp.error.status) {
                // The API encountered a problem before the script started executing.
                console.log('Error calling API: ' + JSON.stringify(resp, null, 2));
            } else if (resp.error) {
                // The API executed, but the script returned an error.
                var error = resp.error.details[0];
                console.log('Script error! Message: ' + error.errorMessage);
            } else {
                // Here, the function returns an array of strings.
                var src = resp.response.result;
                console.log(src);
                console.log('Sheet names in spreadsheet:');
                src.forEach(function(name){
                    console.log(name);
                });

            }
        });

    }
}
//gapi.load("client", onLoadFn);


//----------------------------------------------------------


function getKey(idx)
{
    return $('body > div.modal-dialog.properties-data-dialog > div.modal-dialog-content > div:nth-child(2) > div:nth-child(1) > table > tbody > tr:nth-child(' + idx + ') > td:nth-child(1) > div')[0];
}

function getValue(idx)
{
    return $('body > div.modal-dialog.properties-data-dialog > div.modal-dialog-content > div:nth-child(2) > div:nth-child(1) > table > tbody > tr:nth-child(' + idx + ') > td:nth-child(2) > div')[0];
}

waitForKeyElements (".project-items-list", actionFunction);

function actionFunction (jNode) {
    //-- DO WHAT YOU WANT TO THE TARGETED ELEMENTS HERE.
    jNode.css ("background", "yellow"); // example

    //$('.project-items-list')[0].children.map(function(e) {console.log(e);});
    var anArray = $('.project-items-list')[0].children;
    var vals = [];
    for (var i in anArray)
    {
        var n = anArray[i].attributes;
        if (n)
        {
            var x = n.getNamedItem('aria-label');
            vals.push(x.nodeValue);
        }
    }
    console.log(vals);

    goog.shell.showPropertiesDataDialog();

    var getDialogValuesFn = function(){

        var label = getKey(6);
        var value = getValue(6);

        if (label)
            label = label.innerHTML;

        if (value)
        {
            value = value.innerHTML;
            $('.modal-dialog.properties-data-dialog').find('button[name="cancel"]').trigger('click');

            // send data
            var val = getValue(5).innerHTML;
            data[getKey(5).innerHTML] = val;
            data['Project key'] = val;
            data[label] = value;
            data.fileNames = vals;

            console.log(data);

            gapi.load("client", onLoadFn);
        }
        else // retry
            setTimeout(getDialogValuesFn ,500);
    };

    setTimeout(getDialogValuesFn,500);

}




/*
        for (var m in a)
        Ik("goog.shell.ActionId." + m, a[m], void 0);
    Ik("goog.shell.setActionCallback", W7, void 0);
    Ik("goog.shell.setRunTargets", L7, void 0);
    Ik("goog.shell.getSelectedRunTarget", M7, void 0);
    Ik("goog.shell.setSelectedRunTarget", P7, void 0);
    Ik("goog.shell.setActionEnabled", Q7, void 0);
    Ik("goog.shell.setActionSelected", R7, void 0);
    Ik("goog.shell.isActionSelected", S7, void 0);
    Ik("goog.shell.setActionVisible", T7, void 0);
    Ik("goog.shell.setTitle", U7, void 0);
    Ik("goog.shell.isDialogVisible", X7, void 0);
    Ik("goog.shell.focusOnEditor", Y7, void 0);
    Ik("goog.shell.focusOnMenubar", Z7, void 0);
    Ik("goog.shell.showMessage", V7, void 0);
    Ik("goog.shell.showSharingDialog", a8, void 0);
    Ik("goog.shell.showOpenDialog", b8, void 0);
    Ik("goog.shell.toggleCompactControls", M8, void 0);
    Ik("goog.shell.clearMessage", f8, void 0);
    Ik("goog.shell.showDeployDialog", e8, void 0);
    Ik("goog.shell.showDryRunDialog", h8, void 0);
    Ik("goog.shell.showExecLoggingDialog", l8, void 0);
    Ik("goog.shell.showUserLoggingDialog", j8, void 0);
    Ik("goog.shell.showConsoleLogsInNewWindow", o8, void 0);
    Ik("goog.shell.showOptimizeModeDialog", O8, void 0);
    Ik("goog.shell.showPropertiesDataDialog", N8, void 0);
    Ik("goog.shell.showDevConsoleProjectDialog", E8, void 0);
    Ik("goog.shell.showExecutionApiDialog", y8, void 0);
    Ik("goog.shell.getSessionId", N7, void 0);
    Ik("goog.shell.getScriptTimeoutMs", O7, void 0);
    Ik("goog.shell.finishLoad", $7, void 0);
    Ik("goog.shell.setShowHintsActionEnabled", I8, void 0);
    Ik("goog.shell.showHints", K8, void 0);
    Ik("goog.shell.closeHints", L8, void 0);
    Ik("goog.shell.showManageMobileAddonsDialog", C8, void 0);

*/