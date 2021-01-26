/*
* FILE		    : Logger.cs
* PROJECT       : Transport Management System
* PROGRAMMER    : Balazs Karner and Josh Braga
*                 Scott Page and Jacob Seguin
* FIRST VERSION : 2020-11-25
* DESCRIPTION   :
*       
*/



using System;
using System.Collections.Generic;
using System.Linq;
using System.Configuration;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Web;


namespace WDD_A7_ASPNET
{
    /// 
    /// \class Logger
    ///
    /// \brief The purpose of this class is to document potential crashes and faults in the system by writing output to an error log file.
    /// We will be creating a text file using the Path class as part of the System.IO to find our directory to direct output. We also will 
    /// append the date and time to each of these entries for clarity sake of reading the log entries. The puspose if having a log file
    /// can help us improve debugging efforts and bug discovery. We will be using the class in most exception scenarios where a try/catch 
    /// block is used.
    /// \author <i>Scott Page, Balazs Karner, Jacob Seguin, and Josh Braga</i>
    /// 
    static class Logger
    {
        public static string LoggerPath { get; set; }
        public static string ConfigFileName { get; private set; }

        ///
        /// \brief To act as the constructor for creating a log file.
        /// \details <b>Details</b>
        ///
        /// This method instantiates a log class whenever it is invoked. Using some aspects of a config file we can avoid hardcoding the filepaths.
        /// We also utilize try/catch structures to capture any erroneous file writing.
        /// \param none  - <b>none</b> - Constructor takes no parameters
        /// 
        /// \return As this is a <i>logging</i> function for the Log class, nothing is returned. Instead the objective is file output.
        ///
        static Logger()
        {


            //now begin checking for the actual file legitimacy and it's contents
            if (!File.Exists(AppDomain.CurrentDomain.BaseDirectory + ConfigFileName))
            {
                LoggerPath = HttpRuntime.AppDomainAppPath + "webapp.log";
            }
        }

        ///
        /// \brief 
	    /// \details <b>Details</b>
	    ///
	    /// This method enables the Logging class to firstly create a text file if one does not already exist in our cirrent directory,
	    /// When accomplishing it's functionality a new entry will be entered into the file with a new message and timestamp.
	    /// \param message  - <b>string *</b> - a description of the event that occured that required an entry in the log to be written
	    /// 
	    /// \return As this is a <i>logging</i> function for the Log class, nothing is returned. Instead the objective is file output.
	    ///
        public static void Log(string message)
        {
            //lets add the date and time to the log
            message = DateTime.Now.ToString() + ": " + message;
            //then we write to a text file
            //string path = AppDomain.CurrentDomain.BaseDirectory + "TMSLogging.txt";            
            //append all text will add each entry to the end of the file + a \n
            File.AppendAllText(LoggerPath, message + Environment.NewLine);
        }
    }
}