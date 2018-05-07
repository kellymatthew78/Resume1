<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="csLibrary.aspx.cs" Inherits="CBookLibrary.csLibrary" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>My Book Library</title>

    <!-- CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <link href="css/csLib.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <div class="container-fluid">
            <header class="row">
                <div class="col-lg-12">
                    <div id="libraryCarousel" class="carousel slide" data-ride="carousel">
                        <ol class="carousel-indicators">
                            <li data-target="#libraryCarousel" data-slide-to="0" class="active"></li>
                            <li data-target="#libraryCarousel" data-slide-to="1"></li>
                            <li data-target="#libraryCarousel" data-slide-to="2"></li>
                        </ol>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img class="d-block w-100" src="#" alt="First slide" />
                            </div>
                            <div class="carousel-item">
                                <img class="d-block w-100" src="#" alt="Second slide" />
                            </div>
                            <div class="carousel-item">
                                <img class="d-block w-100" src="#" alt="Third slide" />
                            </div>
                        </div>
                        <a class="carousel-control-prev" href="#libraryCarousel" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#libraryCarousel" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </header>
            <main class="row">
                <div class="col-lg-12">
                    <section class="row topNav">
                        <div class="col-lg-12">
                            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                                <h1 class="pr-2">TechTonic Library</h1>
                                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                                <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                                    <a class="navbar-brand" href="javascript: void (0)">Administration</a>
                                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                                        <li class="nav-item active">
                                            <a class="nav-link" id="Home" href="javascript: void (0)">Home <span class="sr-only">(current)</span></a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" data-toggle="modal" data-target="#addBook" href="javascript: void (0)">Add Books</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" data-toggle="modal" data-target="#removeAuthors" href="javascript: void (0)">Remove Authors</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="getAuthors" href="javascript: void (0)">Get Authors</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="getRandom" href="javascript: void (0)">Random Book</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link disabled" href="javascript: void (0)">Disabled</a>
                                        </li>
                                    </ul>
                                    <section class="form">
                                        <div class="form-row">
                                            <div class="form-group">
                                                <div class="input-group md-form form-sm form-1 pl-0">
                                                    <div id="searchLib" class="input-group-prepend">
                                                        <a href="javascript: void (0)"><span class="input-group-text purple lighten-3" id="basic-text1"><i class="fa fa-search text-white" aria-hidden="true"></i></span></a>

                                                    </div>
                                                    <input id="txtSearch" class="form-control my-0 py-1" type="text" placeholder="Search" aria-label="Search" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group">
                                                <div class="form-check">
                                                    <div class="ra checkbox-inline checkbox-primary">
                                                        <!--<input type="checkbox" id="cbAll" value="All" checked="">
                                            <label for="cbAll"> Any </label>-->
                                                        <input type="checkbox" id="cbTitle" value="Title" />
                                                        <label for="cbTitle">Title</label>
                                                        <input type="checkbox" id="cbAuthor" value="Author" />
                                                        <label for="cbAuthor">Author</label>
                                                        <input type="checkbox" id="cbTitleAuthor" value="TitleAuthor" />
                                                        <label for="cbTitleAuthor">Title / Author</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </nav>
                        </div>
                    </section>
                    <section class="row align-content-center content">
                        <div class="col-lg-9">
                        </div>
                        <div class="col-lg-3">
                            <!-- Rotating card -->
                            <section class="card-wrapper ">
                                <div id="cdBookInfo" class="card border-0" onclick="flip()">
                                    <div class="front">
                                        <img id="cbBookImg" class="card-img-top img-responsive" src="#" alt="Book Image">
                                        <div class="card-body">
                                            <h4 id="cardtitle" class="">Card title</h4>
                                            <small id="cardAuthor" class="">Written By: The Dude</small>
                                            <hr />
                                            <p id="cardPlot" class="card-text">Welcome to Derry, Maine. It’s a small city, a place as hauntingly familiar as your own hometown. Only in Derry the haunting is real.</p>
                                            <a class="link-text">
                                                <h5>Summary<i class="fa fa-angle-double-right"></i></h5>
                                                <h5 id="cdBookInfo_close">Close<i class="fa fa-angle-double-right"></i></h5>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="back">
                                        <h4 class="card-title font-weight-bold my-4">Book Summery <i class="fas fa-book" data-card="cdBookInfo"></i></h4>

                                        <small></small>
                                        <hr />
                                        <div id="plot">
                                            <p>Welcome to Derry, Maine. It’s a small city, a place as hauntingly familiar as your own hometown. Only in Derry the haunting is real.</p>
                                            <p>They were seven teenagers when they first stumbled upon the horror. Now they are grown-up men and women who have gone out into the big world to gain success and happiness. But the promise they made twenty-eight years ago calls them reunite in the same place where, as teenagers, they battled an evil creature that preyed on the city’s children. Now, children are being murdered again and their repressed memories of that terrifying summer return as they prepare to once again battle the monster lurking in Derry’s sewers.</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </section>

                    <section class="AddBookForm">
                        <!-- The Add Book Modal -->
                        <div class="modal fade" id="addBook">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <!-- Modal Header -->
                                    <div class="modal-header">
                                        <h4 class="modal-title">Add Books to the Library</h4>
                                        <br />

                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    </div>
                                    <!-- Modal body -->
                                    <div class="modal-body">
                                        <div class="form-group row">
                                            <div class="col">
                                                <h5 id="addbookmsg"></h5>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="txtTitle" class="col-sm-2 col-form-label">Title</label>
                                            <div class="col-sm-10">
                                                <asp:TextBox ID="txtTitle" class="form-control" runat="server"></asp:TextBox>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="txtAuthor" class="col-sm-2 col-form-label">Author</label>
                                            <div class="col-sm-10">
                                                <asp:TextBox ID="txtAuthor" class="form-control" runat="server"></asp:TextBox>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="rblBookType" class="col-sm-2 col-form-label">BookType</label>
                                            <div class="col-sm-10">
                                                <asp:RadioButtonList ID="rblBookType" class="form-control" RepeatDirection="Horizontal" runat="server" CellPadding="5">
                                                    <asp:ListItem Value="Hardcover" Selected="True">Hardcover</asp:ListItem>
                                                    <asp:ListItem Value="Paperback">Paperback</asp:ListItem>
                                                    <asp:ListItem Value="Digital">Digital</asp:ListItem>
                                                    <asp:ListItem Value="Audiobook">Audiobook</asp:ListItem>
                                                </asp:RadioButtonList>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="txtPageNum" class="col-sm-2 col-form-label"># of Pages</label>
                                            <div class="col-sm-10">
                                                <asp:TextBox ID="txtPageNum" class="form-control" runat="server" TextMode="Number"></asp:TextBox>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="txtPubDate" class="col-sm-2 col-form-label">Publish Date</label>
                                            <div class="col-sm-10">
                                                <asp:Calendar ID="pubDate" class="form-control"  runat="server"></asp:Calendar>
                                                <%--<input type="date" class="form-control" id="txtPubDate" />--%>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="txtPlot" class="col-sm-2 col-form-label">Plot</label>
                                            <div class="col-sm-10">
                                                <asp:TextBox ID="txtPlot" class="form-control" runat="server" TextMode="MultiLine"></asp:TextBox>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="txtSummary" class="col-sm-2 col-form-label">Summary</label>
                                            <div class="col-sm-10">
                                                <asp:TextBox ID="txtSummary" class="form-control" runat="server" TextMode="MultiLine"></asp:TextBox>
                                            </div>
                                        </div>
                                        <label class="mr-sm-2" for="inlineFormCustomSelect">Category</label>
                                        <asp:DropDownList ID="dlCategory" class="custom-select mr-sm-2" runat="server">
                                            <asp:ListItem value="Drama" Selected="True">Drama</asp:ListItem>
                                            <asp:ListItem value="Comedy">Comedy</asp:ListItem>
                                            <asp:ListItem value="Horror">Horror</asp:ListItem>
                                            <asp:ListItem value="Western">Western</asp:ListItem>
                                        </asp:DropDownList>
                                        <div class="form-group">
                                            <label for="imgFile1">Upload File</label>
                                            <asp:FileUpload ID="FileUpload1" runat="server" />
                                            <%--<input type="file" class="form-control-file" id="imgFile1">--%>
                                        </div>
                                    </div>
                                    <!-- Modal footer -->
                                    <div class="modal-footer">
                                        <%--<button id="btnAddBook" type="button" class="btn btn-outline-primary">Add Book</button>--%>
                                        <asp:Button ID="btnAddBook" class="btn btn-outline-primary" runat="server" Text="Button" OnClick="btnAddBook_Click" />
                                        <button type="button" class="btn btn-outline-primary" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>
                    <!-- End Add Book Modal -->

                </div>
            </main>
            <footer class="row">
            </footer>
        </div>
    </form>
    <!-- jQuery and necessary Bootstrap's files plus any CDN) -->
    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/jquery.min.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/myScriptE6.js"></script>
    <script src="js/fontawesome-all.js"></script>

</body>
</html>
