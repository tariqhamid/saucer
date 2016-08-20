//
// https://ctrlq.org/code/19989-convert-excel-vba-macros-to-google-sheet
//

/*

Function GetFundName(symbol As String) As String
 
    Dim Inet1 'As Inet
    Dim fndSym As Integer, endCnt As Integer, begCnt As Integer
    Dim bFound As Boolean
 
    Application.StatusBar = "Getting Fund Name for " & symbol
 
    Set Inet1 = CreateObject("Microsoft.XMLHTTP")
    sStockPage = "http://finance.yahoo.com/q/hp?s=" & symbol
    With Inet1
        .Open "GET", sStockPage, False
        .send
        sStockPage = Inet1.ResponseText
    End With
    Set Inet1 = Nothing
 
    fndSym = InStrRev(sStockPage, "(" & symbol) // .indexOf in JS
    endCnt = fndSym - 2
    bFound = False
    Do Until bFound
        fndSym = fndSym - 1
        'Debug.Print (Mid(sStockPage, fndSym, 1)) // Logger.log in Google Scripts
        bFound = (Mid(sStockPage, fndSym, 1) = ">")
    Loop
 
    GetFundName = Mid(sStockPage, fndSym + 1, endCnt - fndSym + 1) // .substring() in JS
 
    Application.StatusBar = False
 
End Function

*/


