/*
* FILE             : SETeditor.css
* PROJECT          : WDD-A7-ASPNET
* PROGRAMMER       : Josh Braga 5895818 and Balazs Karner 8646201
* FIRST VERSION    : 2020-12-10
* DESCRIPTION      : 
*        The purpose of this file is to have a collection of JavaScript functions
*        Requires use of a directory named MyFiles in the same directory as the
*        aspx.
*       
*/



//global
var jQueryXMLHttpRequest; 
//folder for the files
const directoryPath = "MyFiles";



//jquery activate only when ready
//does the intial call to get the file list on document ready
$(document).ready(function ()
{ 
    getFiles();

});




/*
* FUNCTION    : newFile()
* DESCRIPTION :
*       This function clears all data from the editor to make it ready for a fresh file
* PARAMETERS  :
*      Nothing.
* RETURNS     :
*      Nothing.
*/
function newFile() {
    //Clears all status messages and the center text area for a new file
    document.getElementById("fileNameMessage").innerHTML = "";
    document.getElementById("statusMessage").innerHTML = "";
    document.getElementById("textContentArea").value = "";
    document.getElementById("saveAsBox").value = "";

}




/* 
* FUNCTION    : getUserInput()
* DESCRIPTION :
*       This function takes the ID of the element the user entered a value into and converts it to a string.
* PARAMETERS  :
*      object : textboxElement (The object automatically created from the ID that records user's input)
* RETURNS     : 
*      string : userInput (User's input to the element as a string)
* REFERENCE  :
*       This function was taken directly from my (Balazs Karner), assignment 2 in WDD.
*/
function getUserInput(elementId)
{
    var userInput = elementId.value.toString();
    return userInput;
}




/* 
* FUNCTION    : checkIfEmpty()
* DESCRIPTION :
*       This function checks if the text box is empty
* PARAMETERS  :
*      string : userInput (The user's input as a string)
* RETURNS     : 
*      bool   : true (if the string is empty after trimming whitespace)
*      bool   : false (if the string contains a value after trimming whitespace)
* REFERENCE  :
*       This function was taken directly from my (Balazs Karner), assignment 2 in WDD.
*/
function checkIfEmpty(userInput)
{
    //Trim whitespace and check if length is 0
    if ((userInput.trim()).length < 1)
    {
        return true;
    }
    else
    {
        return false;
    }
}




/* 
* FUNCTION    : validateNameFormat()
* DESCRIPTION :
*       This method checks the user entered name in the text box to the regex pattern to see if the correct format was followed.
* PARAMETERS  :
*       string : userInput ()
* RETURNS     : 
*       bool : hasMatch (true if the user entered string matches the regex pattern for a name)
*       bool : hasMatch (false if the user entered string does not match the regex pattern for a name)
* REFERENCE  :
*       This function was taken directly from my (Balazs Karner), assignment 2 in WDD.
*/
function validateNameFormat(userInput)
{
    //Checks if the user entered filename has any special characters for a file name ()?></":*)
    var namePattern = /^[a-zA-Z0-9\s\!\@\#\$\%\^\&\(\)\-\_\+\=\'\;\`\~\.\,\[\]\{\}]+$/i;
    var hasMatch = namePattern.test(userInput);
    return hasMatch;
}




/* 
* FUNCTION    : validateFileName()
* DESCRIPTION :
*       This function will validate the file name passed in
* PARAMETERS  :
*      string data     :   contains filename to validate
* RETURNS     : 
*      Boolean  :      :   returns true if valid name valid, false otherwise
* REFERENCE  :
*       This function was adapted from my (Balazs Karner), assignment 2 in WDD.
*/
function validateFileName(data)
{
    var valid = true;
    //Clear Error text
    document.getElementById("saveAsError").innerHTML = "";

    //Get the input saveAsBox, convert it to a string and check for valid format
    var input = data
    var isEmpty = checkIfEmpty(input);
    var isNameValid = validateNameFormat(input);

    //If the name textbox is empty then enter here and display an error to the user
    if (isEmpty == true)
    {
        document.getElementById("saveAsBox").value = "";
        document.getElementById("saveAsError").innerHTML = "<b>Error:</b> File Name Cannot be Blank.";
        valid = false;
    }
    //Otherwise enter here and check if the user's name is valid format
    else if (isNameValid == false)
    {
        document.getElementById("saveAsBox").value = "";
        document.getElementById("saveAsError").innerHTML = '<b>Error:</b> Invalid File Name. File Name Cannot Contain Special Characters [<>:"/\|?*].';
        valid = false;
    }

    return valid;

}




/*
* FUNCTION    : populateDropdown()
* DESCRIPTION :
*       This function sends each filename from the array to a function that adds
*       the filename dynamically to the drop down selection box
* PARAMETERS  :
*      array : data (An array of file names in the MyFiles directory)
* RETURNS     :
*      void: void
*/
function populateDropdown(data)
{
    //Add the first option as a palceholder for the dropdown menu
    document.getElementById("myFiles").innerHTML = '<option value="Open A File">Open A File</option>';

    //Iterate over the array and add each option to the select box by calling a function
    for (var i = 0; i < data.d.length; i ++)
    {
        addNewListOption(data.d[i]);
    }
}




/*
* FUNCTION    : addNewListOption()
* DESCRIPTION :
*       This function adds the incoming string to the drop down selection box
*       on the status bar in the main html page.
* PARAMETERS  :
*      string : fileName (String of the filename)
* RETURNS     :
*      void: void
*/
function addNewListOption(fileName)
{
    var select = document.getElementById("myFiles");
    select.options[select.options.length] = new Option(fileName, fileName);
}




/*
* FUNCTION    : setFileNameBar()
* DESCRIPTION :
*        This function changes the file name label on the file name bar above the text area to
 *       the current file being worked on.
* PARAMETERS  :
*      string : fileName (String of the filename)
* RETURNS     :
*      void: void
*/
function setFileNameBar(fileName)
{
    document.getElementById("fileNameMessage").innerHTML = "File Name: " + fileName;
}




/*
* FUNCTION    : getFiles()
* DESCRIPTION :
*        This function gets a list of files from the MyFiles directory and calls the
 *       populateDropDown function in order to add new file names to the drop down
 *       menu on the navigatio bar
* PARAMETERS  :
*      void : void
* RETURNS     :
*      void : void
*/
function getFiles() { 

    //clearing up error messages
    clearSaveAsError();
    clearStatus();

    //build the json
    var jsonData = {directory: directoryPath};
    var jsonString = JSON.stringify(jsonData);


    //ajax call to GetFiles webmethod sending and receiving json
    jQueryXMLHttpRequest = $.ajax({
        type: "POST",
        url: "default.aspx/GetFileNames",
        data: jsonString,
        contentType: "application/json; charset=utf-8",
        dataType: "json",        
        success: function (data) {
            if (data.d == "") {
                document.getElementById("statusMessage").innerHTML = "Could not find files";
            }

            //On success, calls function to repopulate the select drop down box with updated directory list
            populateDropdown(data);
        },
        fail: function (data) {
            document.getElementById("statusMessage").innerHTML = "File load error";
        }
    });

}




/*
* FUNCTION    : saveFileAs()
* DESCRIPTION :
*       This function calls the save function with a parameter set for saving a new file
* PARAMETERS  :
*      Nothing.
* RETURNS     :
*      Nothing.
*/
function saveFileAs() {
    saveFile(true);
}




/*
* FUNCTION    : saveExistingFile()
* DESCRIPTION :
*       This function calls the save function with a parameter set for saving existing files
* PARAMETERS  :
*      Nothing.
* RETURNS     :
*      Nothing.
*/
function saveExistingFile() {
    saveFile(false);
}




/*
* FUNCTION    : saveFile()
* DESCRIPTION :
*       This function initiates file save. It does a save as function if parameter is false
 *       and Save As if the parameter is true.
* PARAMETERS  :
*      saveAsFlag   :   contains whether to use the Save As or regular save functionality
* RETURNS     :
*      Nothing.
*/
function saveFile(saveAsFlag) {

    //clearing up error messages
    clearSaveAsError(); 
    clearStatus();

    var filenameData = "";
    var saveFlag = false;


    if (document.getElementById("fileNameMessage").innerHTML != null) {
        filenameData = document.getElementById("fileNameMessage").innerHTML
    }

    var textboxData = "";
    textboxData = document.getElementById("textContentArea").value;
    var saveboxData = "";
    saveboxData = document.getElementById("saveAsBox").value;

    var filetosave = "";

    //checking whether to treat this call as Save Existing or Save As
    if (filenameData == "" || filenameData == null || saveAsFlag == true ) {

        if (validateFileName(saveboxData) == true) {
            filetosave = saveboxData;
            saveFlag = true;
        }
    }
    else {
        if (validateFileName(filenameData) == true) {
            filetosave = filenameData;
            saveFlag = true;
        }
        
    }


    if (saveFlag == true) {

        //build the json
        var jsonData = { filename: filetosave, data: textboxData };
        var jsonString = JSON.stringify(jsonData);

        //ajax call to SaveFile webmethod sending and receiving json
        jQueryXMLHttpRequest = $.ajax({
            type: "POST",
            url: "default.aspx/SaveFile",
            data: jsonString,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                document.getElementById("statusMessage").innerHTML = "Saving file...";
            },
            success: function (data) {
                getFiles(); 
                document.getElementById("fileNameMessage").innerHTML = filetosave;                
                document.getElementById("saveAsBox").value = "";
                //repopulate list on save to add new file to list                
                document.getElementById("statusMessage").innerHTML = "File Saved";
            },
            fail: function () {
                document.getElementById("statusMessage").innerHTML = "Error saving file";
            }
        });

    }

}




/*
* FUNCTION    : openFile()
* DESCRIPTION :
*       This function opens a file from the system. It uses an ajax call to access the code
 *       behind webmethod OpenFile to do the file IO and return the data.
* PARAMETERS  :
*      Nothing.
* RETURNS     :
*      Nothing.
*/
function openFile() {

    //clearing up error messages
    clearSaveAsError(); 
    clearStatus();
    var fileselection = document.getElementById("myFiles");
    var openFileData = "";

    //get the selected file in the list box
    openfileData = fileselection[fileselection.selectedIndex].value;

    //build the json
    var jsonData = { filename: openfileData};
    var jsonString = JSON.stringify(jsonData);

        

    //ajax call to OpenFile webmethod sending and receiving json
    jQueryXMLHttpRequest = $.ajax({
        type: "POST",
        url: "default.aspx/OpenFile",
        data: jsonString,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            document.getElementById("statusMessage").innerHTML = "Opening file..."

        },
        success: function (data) {

            if (data.d.Key == "fail") {

                document.getElementById("statusMessage").innerHTML = "File does not exist";
            }
            else {
                
                document.getElementById("fileNameMessage").innerHTML = openfileData;                
                document.getElementById("textContentArea").value = data.d.Value;
                //repopulate list on save to add new file to list
                getFiles();
                document.getElementById("statusMessage").innerHTML = "File opened";
            }

            

        },
        fail: function () {
            document.getElementById("statusMessage").innerHTML = "File failed to open";
        }

    });


}    




/*
* FUNCTION    : clearStatus()
* DESCRIPTION :
*       Clears the status text for the bottom status bar.
* PARAMETERS  :
*      Nothing.
* RETURNS     :
*      Nothing.
*/
function clearStatus() {
    document.getElementById("statusMessage").innerHTML = "";
}




/*
* FUNCTION    : clearSaveAs()
* DESCRIPTION :
*       Clears the Save As error text.
* PARAMETERS  :
*      Nothing.
* RETURNS     :
*      Nothing.
*/
function clearSaveAsError() {
    document.getElementById("saveAsError").innerHTML = "";
}


