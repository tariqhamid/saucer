//
// http://stackoverflow.com/questions/27028826/how-to-embed-a-google-form-in-email-in-google-app-script
//

/**
 * Send user an email containing the given form, in HTML.
 *
 * @param {Form}   form           Form object.
 * @param {String} email          One or more email addresses, comma separated.
 */
function sendForm(form,email) {
  var url = form.getPublishedUrl();

  // Temporarily disable requiresLogin so UrlFetch will operate
  if (form.requiresLogin()) {
    var requiresLogin = true;
    form.setRequireLogin(false);
  }

  // Fetch form's HTML
  var response = UrlFetchApp.fetch(url);
  var htmlBody = HtmlService.createHtmlOutput(response).getContent();

  // Re-enable requireLogin, if necessary
  if (requiresLogin) {
    form.setRequireLogin(true);
  }

  var subject = form.getTitle();
  MailApp.sendEmail(email,
                    subject,
                    'This message requires HTML support to view.',
                    {
                      name: 'Form Emailer Script',
                      htmlBody: htmlBody
                    });
}

function test_sendForm() {
  // Build new form for testing
  var form = FormApp.create('New Form');
  var formTitle = 'Form Name';
  form.setTitle(formTitle)
      .setDescription('Description of form')
      .setConfirmationMessage('Thanks for responding!')
      .setAllowResponseEdits(true)
      .setAcceptingResponses(true)

  // Require Login (for GApp Domain accounts only)
  try { 
    form.setRequireLogin(true);
  } catch (e) {
    // Error is expected for consumer accounts - carry on.
  }

  // Just one question
  form.addTextItem().setTitle("Q1");

  // Send it to self
  var email = Session.getEffectiveUser().getEmail();
  sendForm(form,email)
}


