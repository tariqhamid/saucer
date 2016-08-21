

//https://docs.google.com/spreadsheets/d/1mAcxMz4yeif70UKf44a4s0aFt4ayx69a6zmlabJwumE/pubhtml


function myFunction() {
  
  // Add one line to use BetterLog
  // https://docs.google.com/spreadsheets/d/1mAcxMz4yeif70UKf44a4s0aFt4ayx69a6zmlabJwumE/pubhtml
  Logger = BetterLog.useSpreadsheet('1mAcxMz4yeif70UKf44a4s0aFt4ayx69a6zmlabJwumE')
  
  //Now you can log and it will also log to the spreadsheet
  Logger.log("That's all you need to do")
  
}



function myFunction2()
{
  try {
    // Add one line to use BetterLog and log to a spreadsheet
    Logger = BetterLog.useSpreadsheet('your-spreadsheet-key-goes-here'); 

    //Now you can log and it will also log to the spreadsheet
    Logger.log("That's all you need to do");  

    //Do more logging
    for (var i = 0; i < 5; i++) {
      var processingMessage = 'Processing ' + i;
      Logger.finest('This is inside my loop. i is %s', i );
    }
    //We're done
    Logger.log('The loop is done and i is now %s', i );

  } catch (e) { //with stack tracing if your exceptions bubble up to here
    e = (typeof e === 'string') ? new Error(e) : e;
    Logger.severe('%s: %s (line %s, file "%s"). Stack: "%s" . While processing %s.',e.name||'', 
               e.message||'', e.lineNumber||'', e.fileName||'', e.stack||'', processingMessage||'');
    throw e;
  }
}