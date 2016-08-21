 
/* 
 
 
  ======================================
  Who Can See Your Files in Google Drive 
  ======================================
  
  Written by Amit Agarwal on 01/11/2014 
  
  Tutorial :: http://labnol.org/?p=28237
  
 
*/
 
 
function ScanGoogleDrive() {
    
  var files = DriveApp.getFiles();  
  var timezone = Session.getScriptTimeZone();
  var email = Session.getActiveUser().getEmail();
  
  var file, date, access, url, permission;
  var privacy, view, viewers, edit, editors;
  
  var rows = [["File Name", "Who has access?", "Date Created"]];
  
  while ( files.hasNext() ) {
    
    file = files.next();
    
    try {
      
      access     = file.getSharingAccess();
      permission = file.getSharingPermission();
      viewers    = file.getViewers();      
      editors    = file.getEditors();
      
      view = [];
      edit = [];
      
      date =  Utilities.formatDate(file.getDateCreated(), timezone, "yyyy-MM-dd HH:mm")
      url = '<a href="' + file.getUrl() + '">' + file.getName() + '</a>';
      
      for (var v=0; v<viewers.length; v++) {                
        view.push(viewers[v].getName() + " " + viewers[v].getEmail());
      }
      
      for (var ed=0; ed<editors.length; ed++) {                
        edit.push(editors[ed].getName() + " " + editors[ed].getEmail());
      }
      
      switch(access) {
        case DriveApp.Access.PRIVATE:
          privacy = "Private";
          break;
        case DriveApp.Access.ANYONE:
          privacy = "Anyone";
          break;
        case DriveApp.Access.ANYONE_WITH_LINK:
          privacy = "Anyone with a link";
          break;
        case DriveApp.Access.DOMAIN:
          privacy = "Anyone inside domain";
          break;
        case DriveApp.Access.DOMAIN_WITH_LINK:
          privacy = "Anyone inside domain who has the link";
          break;
        default:
          privacy = "Unknown";
      }
      
      switch(permission) {
        case DriveApp.Permission.COMMENT:
          permission = "can comment";
          break;
        case DriveApp.Permission.VIEW:
          permission = "can view";
          break;
        case DriveApp.Permission.EDIT:
          permission = "can edit";
          break;
        default:
          permission = "";
      }
      
      view = view.join(", ");
            
      edit = edit.join(", ");
            
      privacy += (permission === "" ? "" : " " + permission) 
               + (edit === "" ? "" : ", " + edit + " can edit")
               + (view === "" ? "" : ", " + view + " can view")
      
      rows.push([url, privacy, date]);
      
    } catch (e) {Logger.log(e.toString()); Logger.log(file.getName());};
    
  }
  
  var html = "<p>File Permissions Report for Google Drive</p>";
  
  html += "<table><tr><td><b>" + rows[0].join("</b></td><td><b>") + "</b></td></tr>";
  
  for (var i=1; i<rows.length; i++) {
    html += "<tr><td>" + rows[i].join("</td><td>") + "</td></tr>";
  }
  
  html += "</table><br>For help, refer to this <a href='http://www.labnol.org/internet/google-drive-access/28237/'>online tutorial</a> written by <a href='https://ctrlq.org/'>Amit Agarwal</a>.";
  
  MailApp.sendEmail(email, "Google Drive - File Permissions Report", "", {htmlBody: html});
  
}
