<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="TestApplication1._default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Test JavaScript</title>
    
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <h1>Hello World JS 101</h1>
            <br />
            
            <input id="btnRun" type="button" value="Run My Javascript" onclick="myFunction()" />
            <br />
            <asp:Label ID="lbl1" runat="server" Text="Label"></asp:Label>
        </div>
    </form>
<script  src="js/myJS.js"></script>
</body>
</html>
