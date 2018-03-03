####################################################################################################

HOW TO TEST
----------------------------------------------------------------------------------------------------
Database is created and open on index page load.
To add initial data to database, click on button 'Insert default values into db' and refresh page.
Click on button '+ Filter' to show dropdown lists.

Select 'Absenger' team and '2014' year and click 'Show' button.
Table with dump data should be shown. 

Click on any cell for 'Apr' column, because only those data are in database.
Table with data from database should be shown.
Data in table can be edited but cannot be saved.

####################################################################################################

ABOUT CODE
----------------------------------------------------------------------------------------------------
'Team' dropdown list is populated from database (store: 'teams').
'Year' dropdown list is populated from fixed array.

Yearly table
Column headers (months) are populated from fixed array.
Row headers are populated from database (store: 'members').
Cells in table body are created and populated with dump data as initial cell values.
For every cell atrributes are added (corresponding month and member).
Total in table footer is calculated as average value of column values.

Monthly table
Column headers are populated from dynamic array.
Row headers are populated from database (store: 'projects').
Cells in table body are created and populated with dump data as initial cell values.
For every cell atrributes are added (corresponding monday and project).
Available values are fixed values.
Work hours are obtained from database (store: 'workhours') based on member, year and month
and corresponding cells are populated.
Total in table footer is calculated as percentage value of project and available hours in column.