<%@ Page Language="C#" AutoEventWireup="true" CodeFile="test2.aspx.cs" Inherits="test2" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="css/Normalize.css" rel="stylesheet" />
    <link href="css/StyleSheet1.css" rel="stylesheet" />

    <style>
        #parent {
            /*width: 615px;*/
            /*background-color: #212121;*/
            /*color: white;*/
            /*border: solid 1px #aaa;*/
            font-size: small;
            letter-spacing: 1px;
            white-space: nowrap;
            line-height: 20px;
            overflow: hidden;
        }

        .parent {
            /*width: 615px;*/
            /*background-color: #212121;*/
            /*color: white;*/
            /*border: solid 1px #aaa;*/
            font-size: small;
            letter-spacing: 1px;
            white-space: nowrap;
            line-height: 20px;
            overflow: hidden;
        }

        .child {
            width: 250px;
            height: 35px;
            /*border: solid 1px #ccc;*/
            display: inline-block;
            vertical-align: auto;
        }

        #pfS1 {
            border: 2px solid red;
            width: 120px;
            
        }

        #pfS2 {
            border: 2px solid blue;
            width: 300px;
            float: right;
        }

        #pfS3 {
             border: 2px solid green;
              width: 280px;
              float: right;
        }

        #pfS4 {
             border: 2px solid yellow;
              width: 280px;
              float: right;
        }


        #unityborder {
            border-style: solid;
            border-color: white;
            border-width: 1px;
        }

        .socialico {
            width: 20px;
            height: 20px;
            opacity: 0.5;
            filter: alpha(opacity=50); /* For IE8 and earlier */
        }

        .pfooter img:hover {
            opacity: 1.0;
            filter: alpha(opacity=100); /* For IE8 and earlier */
        }

        .smico {
            width: 16px;
            height: 16px;
        }

        .smico2 {
            width: 50px;
            height: 50px;
        }

        .pfooter p {
            font-size: xx-small;
        }

        .ptext {
            color: mediumpurple;
            font-size: xx-small;
        }

        .pfblog {
            text-align: left;
            width: 280px;
        }

        .pfblogdt {
            float: right;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div class="wrapper">
        <div class="home">
            <div class="clearfix">
                <div class="homePane">
                    <section class="homeNav">
                        <header class="hnSection1">
                            <h2>UNITY</h2>
                        </header>
                        <nav class="hnSection2">
                            <ul>
                                <li><a class="active" href="#">Home</a></li>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Services</a></li>
                                <li><a href="#">Portfolio</a></li>
                                <li><a href="#">Blog</a></li>
                                <li><a href="#">Shop</a></li>
                            </ul>
                        </nav>
                    </section>
                    <section class="homeContent">
                        <h1 class="hcSection1">HONOR THE DETAILS</h1>
                        <p class="hcSection2">
                            WE BRING YOUR PRODUCTS OR SERVICES ACROSS IN WAYS THAT MAKE PEOPLE FEEL GOOD AS THEY ENGAGE WITH YOUR BUSINESS
                        </p>
                        <img class="hcSection3" src="" alt="Down Box" />
                    </section>
                    <section class="Transition1">
                        <img src="img/01Frame.png" style= "height:400px ; width: 400px;" />
                    </section>
                </div>
                <div class="sidePane">
                    <section class="hsPhone">
                        <img id="phoneimg" src="img/phoneicon.png" alt="PHONE" />
                    </section>
                    <section class="hsMedia">
                        <ul>
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">Twitter</a></li>
                            <li><a href="#">Instagram</a></li>
                            <li><a href="#">Youtube</a></li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
        <div class="invites">
            <section class=" invContentBody">
                <header id="invHeader1">Complexity should be secret</header>
                <p id="invcontent1">We know you have a story to tell. You want the world to embrace your incredible idea, produts, and services. Trouble is, your not sure about the best way to get your message across. No problem. We do.</p>
            </section>
            <br />
            <br />
            <br />
            <div class="clearfix">
                <section id="invDiv1">
                    <img src="img/12.png" />
                    <br />
                    <h2 class="invBoxHeader">HANDMADE LAYOUTS</h2>
                    <img src="img/smallWhiteLine1.png" />
                    <p>
                        Handmade layouts are awsome. They will aid your business. Customers will be more thatn happy to use your produts which will be more visible when used in a handmade layout.
                    </p>
                </section>
                <section id="invDiv2">
                    <img src="img/mortarboard.png" />
                    <br />
                    <h2 class="invBoxHeader">CREATIVE DESIGNS</h2>
                    <img src="img/smallWhiteLine1.png" />
                    <p>
                        Creative designs are great. They will aid your business. Customers will be more thatn happy to use your produts which will be more visible when used in a creatve design.
                    </p>
                </section>
                <section id="invDiv4">
                    <img src="img/tools.png" />
                    <br />
                    <h2 class="invBoxHeader">100% SUPPORT</h2>
                    <img src="img/smallWhiteLine1.png" />
                    <p>
                        100% customer support are incredible. They will aid your business. Customers will be more than happy to use your produts which will be more reliable when customer support is given.
                    </p>
                </section>
            </div>
        </div>
        </div>
    </form>
</body>
</html>
