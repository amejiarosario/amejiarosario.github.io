---
layout: post
title: How to execute SQL statements on MS Access?
created: 1320855136000
updated: 1320855136000
comments: true
pageviews__total: 1743
pageviews__recent: 46
pageviews__avg_time: 94
tutorial__order: 0
#categories: [ms access, sql, visual basic, macros, how-to]
---
Sometimes is quicker to use SQL statements than create tables using the MS Access Visual Designer. For instance, if you already have the SQL code from other databases this could be useful.
<!--More-->

Here are the steps of how to create a new table programmatically in Access (2007):

1. Open/create your database on MS Access
2. Menu: 'Databases Tools' > 'Visual Basic' (this will open the visual basic editor
3. in the Visual Basic Editor, Menu: Run
4. Insert the name of your macro and click 'create' button
5. Insert a code similar to the shown below. Replace the path in 'OpenDatabase' with your database path; and fill 'dbs.Execute' with your own SQL statements



Sub createdb()
    Dim dbs As Database

    ' Modify this line to include the path to Northwind
    ' on your computer.
    Set dbs = OpenDatabase("C:\\amr\\projects\\sites\\files\\tf_pledge_reminder_email.accdb")

    ' Create a table with two text fields.
    dbs.Execute "create table RIT_TF_PLG_REM_EMAIL_TEST2 (   pref_mail_name  VARCHAR(60), pd_to_date      NUMBER,   this_payment    NUMBER )"

    dbs.Close
End Sub

6. Menu: Run
7. You are all set.

If you have any questions you can contact me or write a comment
