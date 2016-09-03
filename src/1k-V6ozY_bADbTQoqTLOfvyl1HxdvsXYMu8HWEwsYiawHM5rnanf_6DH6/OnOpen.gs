function onOpen() {
  Logger.log('onOpen 1')

  //onOpenGitHub()
  
  //onOpenLinkedIn()
  
  Logger.log('onOpen')

  SpreadsheetApp.getUi() 
      .createMenu('src stuff')
      .addItem('List Code', 'listCode')
      .addItem('Form Test - Open Dialog','openDialog')
      .addItem('Self Test - Open Dialog','selfDialog')
      .addToUi()
  

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