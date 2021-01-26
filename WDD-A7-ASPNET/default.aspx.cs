/*
 *  FILE            :   default.aspx.cs
 *  PROJECT         :   WDD-A7-ASPNET
 *  PROGRAMMER      :   Josh Braga 5895818 and Balazs Karner 8646201
 *  FIRST VERSION   :   2020-12-10
 */

/*
 *  NAME            :   _default
 *  PURPOSE         :   Contains the code behind for the default.aspx file. This
 *                      class contains functionality for the File IO of the editor
 *                      to save files, open files and get a list of files from the
 *                      directory.
 */



using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using System.IO;
using System.Diagnostics;

namespace WDD_A7_ASPNET
{
    public partial class _default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }



        // METHOD           :   GetFileNames()
        // DESCRIPTION      :   Parses the directory to get list of files and sends
        //                      them back to the client.
        //
        // PARAMETERS       :
        //      Nothing.
        //
        // RETURNS          :
        //      List<string>:   A list of filenames as a string, turned into a json object
        //                      automatically.
        //
        [WebMethod]
        public static List<string> GetFileNames(string directory)
        {
            List<string> filenames = new List<string>();

            //get relative path of the aspx file
            string filepath = HttpContext.Current.Server.MapPath(directory);
            string[] arrayfilenames;

            try
            {
                arrayfilenames = Directory.GetFiles(filepath);
            }
            catch (Exception e)
            {
                List<string> empty = new List<string>();
                empty.Add("");
                Logger.Log(e.ToString());
                return empty;
            }

            int i = 0;

            foreach (string s in arrayfilenames)
            {
                arrayfilenames[i] = s.Replace(filepath + @"\", "");
                ++i;
            }

            
            filenames.AddRange(arrayfilenames);  

            return filenames;
        }




        // METHOD           :   SaveFile
        // DESCRIPTION      :   Saves a file using the filename and data passed into
        //                      the parameters.
        //
        // PARAMETERS       :
        //  string filename :   contains the filename to save the file to
        //  string data     :   contains the content of the file
        //
        // RETURNS          :
        //  string          :   returns a string containing the result of the operation.
        //
        [WebMethod]
        public static string SaveFile(string filename, string data)
        {
            string result = "File Saved";           

            //get relative path of the aspx
            string filepath = HttpContext.Current.Server.MapPath("myFiles");

            try
            {
                File.WriteAllText(filepath + @"\" + filename, data);
            }
            catch (Exception e)
            {
                Logger.Log(e.ToString());
                //return error
                result = "error";
            }
            
            return result;


        }




        // METHOD           :   OpenFile
        // DESCRIPTION      :   Opens the file specified by the parameter and then sends
        //                      the data back as a key pair containing the status and the
        //                      data itself.
        //
        // PARAMETERS       :
        //  string filename :   contains the filename to open
        //
        // RETURNS          :
        //  KeyValuePair<string,string> :   contains the status as the key and the data as the
        //                                  value.
        //
        [WebMethod]
        public static new KeyValuePair<string, string> OpenFile(string filename)
        {
            KeyValuePair<string, string> returnData;
            string filepath;

            try
            {
                //relative path of aspx
                filepath = HttpContext.Current.Server.MapPath("myFiles");
                filepath = filepath + @"\" + filename;

                if (File.Exists(filepath))
                {
                    string data = File.ReadAllText(filepath);
                    returnData = new KeyValuePair<string, string>("success", data);
                }
                else
                {
                    returnData = new KeyValuePair<string, string>("fail", "");
                }
            }
            catch (Exception e)
            {
                Logger.Log(e.ToString());
                returnData = new KeyValuePair<string, string>("fail", "");
            }

            return returnData;
        }
    }
}