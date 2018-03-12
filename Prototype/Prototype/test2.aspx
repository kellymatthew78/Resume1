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

         img.center {
      display: block;
       margin-left: auto;
       margin-right: auto;
    }

       
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div class="wrapper">
        <div class="globalco">
            <h1 id="glHeader">
                GLOBAL COMPANY WITH A LOCAL FEEL
            </h1>
            <p id="glContent">
                WE HELP FORWARD-THINKING CLIENTS SUCCEED IN DIGITAL CULTURE WITH WORK THAT INVITES ACTIVE ATTENTION.
            </p>
            <section id="Transition3">
                <img id="t3-imgline" src="img/ico_ShortBlackLine.png" />
                <h4>What our Custmomers are saying</h4>
                <div id="gl-allCustomers">
                    <section class="glcustomer">
                        <div class="custimg2">
                            <img src="img/cust_Steve.png" style="width: 100px; height: 100px" />
                        </div>
                        &star;&star;&star;&star;&star;<br />
                        <p>"Thanks so much for the awsome customer service. So many companies, large and small, have a lot to learn from you. Great job!"</p>
                        <h5>GREGORGY BRADLEY</h5>
                        <h6>NEW YORK USA</h6>
                    </section>
                    <section class="glcustomer-select">
                        <div class="custimg2">
                            <img src="img/cust_Mark.png" style="width: 100px; height: 100px" />
                        </div>
                        &star;&star;&star;&star;&star;<br />
                        <p>"A great agency who are not only flexible, efficient and professional but a group of people who really care about delivering results for you."</p>
                        <h5>JONATHAN KRAUS</h5>
                        <h6>BERLIN GERMANY</h6>
                    </section>
                    <section class="glcustomer">
                        <div class="custimg2">
                            <img src="img/cust_Luara.png" style="width: 100px; height: 100px" />
                        </div>
                        &star;&star;&star;&star;&star;<br />
                        <p>
                            "The quality of product and more importantly, customer service provided means we keep coming back for more!”
                        </p>
                        <h5>Caroline De Smet</h5>
                        <h6>BRUSSELS BELGUM</h6>
                    </section>
                </div>
            </section>
        </div>
        <div class="pfooter">
            <section id="parent">
                <section class="child">
                    <img class="smico" src="img/ico_phone3.png" />
                    <span style="font-size: small; color: #FFFFFF">CALL NOW (857) 254-7758</span>
                </section>
                <header class="child">
                    <h2 id="unityborder">UNITY</h2>
                </header>
                <section class="child">
                    <img class="smico" src="img/ico_mail.png" />
                    <span style="font-size: small; color: #FFFFFF">MAIL :</span>
                    <span style="font-size: small; color: #800080; text-decoration: underline;">INFO@UNITY.COM</span>
                </section>
            </section>
            <br />
            <hr />
            <section class="parent">
                <section class="child2">
                    <section id="pfS1">
                        <h6>ABOUT US</h6>
                        <img src="img/girl_on_pc.png" style="width: 200px; height: 175px" />
                    </section>
                </section>
                <section class="child2">
                    <section id="pfS2">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make</p>
                        <section class="parent">
                            <section class="child">
                                <img class="socialico" src="img/social_facebook_circle.png" />
                                <img class="socialico" src="img/social_instagram_circle.png" />
                                <img class="socialico" src="img/social_linkedin_circle.png" />
                                <img class="socialico" src="img/social_googleplus_circle.png" />
                                <img class="socialico" src="img/social_twitter_circle.png" />
                                <img class="socialico" src="img/social_dribbble_circle.png" />
                            </section>
                        </section>
                    </section>
                </section>
                <section class="child2">
                    <section id="pfS3">
                        <h6>NEWSLETTER</h6>
                        <p>Signup for our weekly newsletter and get the latest updates</p>
                        <input type="text" name="firstname" value="Enter your Email" /><br />
                        <br />
                        <input type="submit" value="Subscribe" style="background-color: #694fca" />
                    </section>
                </section>
                <section class="child2">
                    <section id="pfS4">
                        <h6>FROM BLOG</h6>
                        <table>
                            <tr>
                                <td>
                                    <img class="smico2" src="img/footer_papper.png" />
                                </td>
                                <td class="pfblogdt">
                                    <p>&#62;Needed a redesign of our site</p>
                                    <span class="ptext">Dec 25th 2011</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img class="smico2" src="img/footer_travler.png" />
                                </td>
                                <td class="pfblogdt">
                                    <p>&#62;Maximize conversations and travel</p>
                                    <span class="ptext">Dec 25th 2011</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img class="smico2" src="img/footer_city.png" />
                                </td>
                                <td class="pfblogdt">
                                    <p>&#62;Art and literature are on the rise</p>
                                    <span class="ptext">Dec 25th 2011</span>
                                </td>
                            </tr>
                        </table>
                        <!--<section class="pfblog">
                            <section>
                                <img class="smico2" src="img/footer_papper.png" />
                            </section>
                            <section class="pfblogdt">
                                <p>&#62;Needed a redesign of our site</p>
                                <br />
                                <span class="ptext">Dec 25th 2011</span>
                            </section>
                        </section>-->
                        <!--<section class="pfblog">
                            <section>
                                <img class="smico2" src="img/footer_travler.png" />
                            </section>
                            <section class="pfblogdt">
                                <p>&#62; Maximize conversations and travel</p>
                                <br />
                                <span class="ptext">Dec 25th 2011</span>
                            </section>
                        </section>-->
                        <!--<section class="pfblog">
                            <section>
                                <img class="smico2" src="img/footer_city.png" />
                            </section>
                            <section class="pfblogdt">
                                <p>&#62;  Art and literature are on the rise</p>
                                <br />
                                <span class="ptext">Dec 25th 2011</span>
                            </section>
                        </section>-->
                    </section>
                </section>
            </section>
        </div>
        </div>
    </form>
</body>
</html>
