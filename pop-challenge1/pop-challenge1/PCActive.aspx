<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PCActive.aspx.cs" Inherits="PCActive" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8" />
    <title>Pop-Challenge</title>
    <link href="css/StyleSheet.css" rel="stylesheet" />
    <script src="JavaScript.js"></script>

    <script src="//use.typekit.net/rzv2mwh.js"></script>
    <script>try { Typekit.load(); } catch (e) { }</script>

    <script>
       
</script>
</head>
<body>
    <form id="form1" runat="server">
        <div class="container">
            <h1>Recreate this using HTML &amp; CSS</h1>
            <img src="img/Image 2014-12-19 at 10.07.09 AM.png" width="303" />

            <!--Your HTML goes here-->

            <div class="speech-bubble">
                <h5>$5,000 Goal</h5>
                <h5>$<span id="lblamount">167</span> &nbsp; still needed for this project</h5>
            </div>
            <div class="content">
                <div class="baseline">
                    <section id="barline" class="barline"></section>
                </div>
                <br />
                <p>
                    <span class="snotice1">Only &nbsp; <span id="lblDays" class="snotice1">3</span> 
                   &nbsp;  days left</span>&nbsp; to fund this project
                </p>
                <p>
                    Join the &nbsp; <span id="lblPeople">42</span> 
                    &nbsp; other doners who have already supported this project. Every dollar helps.
                </p>
                <div class="donation">
                    <input id="txtDonate" class="inputs" type="text" value="$50" />
                    <input id="btnGive" class="inputs" type="button" value="Give Now" onclick="clickCounter()" /><br />
                    <span class="why"><a href="javascript:void(0)">Why give $50</a></span>
                </div>
            </div>
            <footer>
                <input id="btnSave" class="inputs" type="button" value="Save for Later" />
                <input id="btnTell" class="inputs" type="button" value="Tell your Friends" />
            </footer>
        </div>
         <input id="Button2" type="button" value="Set Up" onclick="jsSetup()" />
    </form>
</body>
</html>
