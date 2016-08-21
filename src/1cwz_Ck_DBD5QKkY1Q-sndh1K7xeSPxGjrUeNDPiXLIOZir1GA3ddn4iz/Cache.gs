function myFunction() {
  var u = Session.getActiveUser().getEmail()
  var u2 = Session.getEffectiveUser().getEmail()
  
  
  var keys = []
  var s = CacheService.getScriptCache().getAll(keys)
  
  var a = ScriptApp.getInstallationSource().NONE
  

  gasGit.doExtraction()
}
