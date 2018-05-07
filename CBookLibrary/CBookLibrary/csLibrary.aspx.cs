using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;

namespace CBookLibrary
{
    public partial class csLibrary : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btnAddBook_Click(object sender, EventArgs e)
        {
            var title = txtTitle.Text;
            var author = txtAuthor.Text;
            var booktype = rblBookType.SelectedValue;
            var pubdate = pubDate.SelectedDate.Date;
            var cat = dlCategory.SelectedValue;
            var numpages = txtPageNum.Text;
            var plot = txtPlot.Text;
            var summary = txtSummary.Text;
            var bookcover = FileUpload1.PostedFile;
            var rowcount = 0;

            string connetionString = "Data Source=LAPTOP-11V03IUE\\SQLEXPRESS;Initial Catalog=BookLibrary;Integrated Security=True";
            string CommandText = "dbo.usp_NewBook";
            try
            {
                using (SqlConnection sqlConn = new SqlConnection(connetionString))
                {
                    sqlConn.Open();
                    using (SqlCommand cmd = new SqlCommand(CommandText))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@Title", title));
                        cmd.Parameters.Add(new SqlParameter("@Author", author));
                        cmd.Parameters.Add(new SqlParameter("@BookType", booktype));
                        if (numpages is null)
                        { cmd.Parameters.Add(new SqlParameter("@numberOfPages", DBNull.Value)); }
                        else
                        { cmd.Parameters.Add(new SqlParameter("@numberOfPages", numpages)); }
                        cmd.Parameters.Add(new SqlParameter("@publishDate", pubdate));
                        cmd.Parameters.Add(new SqlParameter("@Catagory", cat));

                        if (plot is null)
                        { cmd.Parameters.Add(new SqlParameter("@Plot", DBNull.Value)); }
                        else
                        { cmd.Parameters.Add(new SqlParameter("@Plot", plot)); }
                        if (summary is null)
                        { cmd.Parameters.Add(new SqlParameter("@Summary", DBNull.Value)); }
                        else
                        { cmd.Parameters.Add(new SqlParameter("@Summary", summary)); }
                        cmd.Parameters.Add(new SqlParameter("@Rating", DBNull.Value));
                        if (bookcover is null)
                        { cmd.Parameters.Add(new SqlParameter("@bookCover", DBNull.Value)); }
                        else
                        { cmd.Parameters.Add(new SqlParameter("@bookCover", bookcover)); }
                        rowcount = cmd.ExecuteNonQuery();
                    }

                    sqlConn.Close();
                }

                //SqlCommand cmd = new SqlCommand();
                //SqlConnection conn = new SqlConnection(connetionString);
                //cmd.CommandText = "dbo.usp_NewBook";
                //cmd.CommandType = CommandType.StoredProcedure;
                //cmd.Parameters.Add(new SqlParameter("@Title", title));
                //cmd.Parameters.Add(new SqlParameter("@Author", author));
                //cmd.Parameters.Add(new SqlParameter("@BookType", booktype));
                //if (numpages is null)
                //{ cmd.Parameters.Add(new SqlParameter("@numberOfPages", DBNull.Value)); }
                //else
                //{ cmd.Parameters.Add(new SqlParameter("@numberOfPages", numpages)); }
                //cmd.Parameters.Add(new SqlParameter("@publishDate", pubdate));
                //cmd.Parameters.Add(new SqlParameter("@Catagory", cat));

                //if (plot is null)
                //{ cmd.Parameters.Add(new SqlParameter("@Plot", DBNull.Value)); }
                //else
                //{ cmd.Parameters.Add(new SqlParameter("@Plot", plot)); }
                //if (summary is null)
                //{ cmd.Parameters.Add(new SqlParameter("@Summary", DBNull.Value)); }
                //else
                //{ cmd.Parameters.Add(new SqlParameter("@Summary", summary)); }
                //cmd.Parameters.Add(new SqlParameter("@Rating", DBNull.Value));
                //if (bookcover is null)
                //{ cmd.Parameters.Add(new SqlParameter("@bookCover", DBNull.Value)); }
                //else
                //{ cmd.Parameters.Add(new SqlParameter("@bookCover", bookcover)); }
                //cmd.Connection = conn;

               
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            finally
            {

            }
        }
    }


}