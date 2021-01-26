<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="WDD_A7_ASPNET._default" %>
<!DOCTYPE html>



<!-- 
FILE          : default.aspx
PROJECT       : WDD-A7-ASPNET
PROGRAMMER    : Balazs Karner 8646201 & Josh Braga 5895818
FIRST VERSION : 12/10/2020
DESCRIPTION   : 
    The purpose of this file is to create very simple text editor with similar functionality to notepad
    using ajax calls on a webpage. Requires use of a directory named MyFiles in the same directory as the
    aspx.
-->



<html xmlns="http://www.w3.org/1999/xhtml">
    <head runat="server">
        <title>Assignment 7 Text Editor</title>
        <link rel = "stylesheet" type = "text/css" href = "./StyleSheets/SETeditor.css" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script type = "text/javascript" src = "./Scripts/SETeditor.js"></script>

        <!-- 
            REFERENCE: 
            FreeLogoDesign. (2020, December). FreeLogoDesign. https://editor.freelogodesign.org/?lang=en&logo=5338059b-9ff9-40b2-bcea-b694926a91f6
        -->
        <link rel = "icon" href = "./Assets/Logo2_BlackText.png" />
    </head>
    <body>
        <form runat="server">
            <div>
                <!-- The navigation menu -->
                <div class="navigationBar">
                    <p class="navigationBarText">SETeditor</p>
                    <button id="newButton" type="button" onclick="newFile()">New</button>

                    <!-- The drop down menu for My Files    onclick="getFiles()" -->
                    <select name="Open" id="myFiles" onchange="openFile()">
                        <option value="Open A File">Open A File</option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                    </select>

                    <button type="button" onclick="saveExistingFile()">Save</button>
                    <button type="button" onclick="saveFileAs()">Save As</button>

                    <!-- The text to name your files before pressing "Save As" -->
                    
                    <input type="text" id="saveAsBox" placeholder="Enter Your File Name Here" class="saveAsBox"/>
                    <p id="saveAsError" class="errorText"></p>
                </div>
            </div>

            <div>
                <!-- Status Bar -->
                <div class="fileNameBar">
                    <p id="fileNameMessage" class="fileNameBarText"></p>
                </div>

                <!-- Text Editing Area-->
                <div>
                    <textarea id="textContentArea" class="textbox" onclick="clearSaveAsError()"></textarea>
                </div>
               
                
                
                <!-- Status Bar -->
                <div class="statusBar">
                    <p id="statusMessage" class="statusBarText"></p>
                </div>
            </div>

            <div class="footerPadding"></div>

            <!-- Site footer -->
            <div class="editorFooter">
                <!-- Company Logo -->
                <img class="footerLogo" src="./Assets/Logo2_WhiteText.png"></img>
                <!-- Corner Logo -->
                <img class="cornerLogo" src="./Assets/CornerLogo1.png"></img>

                <!-- About Section -->
                <br/>
                <h6 class="footerHeading">About</h6>
                <p>The simpler, easier, text editor. SETeditor.</p>
                <br/>
                <p>Start writing your dream project today without the hassle of learning a new application. 
                   SETeditor is a free for use online text editor for all your text editing needs. </p>

                <br/>
                <hr/>
                <p class="footerCopyright">Copyright &copy; 2020 All Rights Reserved by SETeditor.</p>
            </div>
        </form>
    </body>
</html>