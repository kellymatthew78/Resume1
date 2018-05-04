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
            try
            {
                var title = txtTitle.Text;
                var author = txtAuthor.Text;
                var booktype = rblBookType.SelectedValue;
                var numpages = txtPageNum.Text;
                var pubdate = pubDate.SelectedDate.Date;
                var cat = dlCategory.SelectedValue;
                var plot = txtPlot.Text;
                var summary = txtSummary.Text;
                var bookcover = FileUpload1.PostedFile;

                string connetionString = null;
                SqlConnection connection;
                SqlDataAdapter adapter;
                SqlDataReader reader = null;
                SqlCommand command = new SqlCommand();
                SqlParameter param;
                DataSet ds = new DataSet();

                int i = 0;

                connetionString = "Data Source=LAPTOP-11V03IUE\SQLEXPRESS;Initial Catalog=BookLibrary;Integrated Security=True";
                connection = new SqlConnection(connetionString);

                connection.Open();
                command.Connection = connection;
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "dbo.usp_NewBook";

                param = new SqlParameter("@COUNTRY", "Germany");
                param.Direction = ParameterDirection.Input;
                param.DbType = DbType.String;
                command.Parameters.Add(param);

                adapter = new SqlDataAdapter(command);
                adapter.Fill(ds);

                for (i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
                {
                    MessageBox.Show(ds.Tables[0].Rows[i][0].ToString());
                }

                connection.Close();
            }
            finally
            {
               
            }
        }
    }


}