function onOpen() {

  //onOpenGitHub()
  
  // onOpenLinkedIn()
  

  
  var menu1 = SpreadsheetApp.getUi()
      .createMenu('OAuth Stuff')
      .addItem('LinkedIn Authorize', 'showSidebarLinkedIn')
      //.addToUi();
  
  
  var menu2 =SpreadsheetApp.getUi()
    .createMenu('GitHub')
    .addItem('Authorize', 'openAuthDialog')
    .addItem('Export', 'openExportDialog')
    //.addToUi();
  
  
  SpreadsheetApp.getUi()
      .createMenu('External Logins')
      .addSubMenu(menu1)
      .addSubMenu(menu2)
      .addToUi()


}