-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
USE BookLibrary
GO

CREATE PROCEDURE [dbo].[usp_InsertBook]
	@Title varchar(50),
	@Author varchar(100),
	@BookType nchar(10), 
	@numberOfPages int,
	@publishDate date,
	@Catagory varchar(10)
AS
BEGIN
	INSERT INTO Books(Title,Author,BookType,numberOfPages,publishDate,Catagory)
	VALUES  (@Title,@Author,@BookType,@numberOfPages,@publishDate,@Catagory)
END

GO

