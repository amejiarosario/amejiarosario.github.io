---
layout: post
title: Regular Expressions in C# and Java - CSV Example
created: 1320937797000
updated: 1320937797000
comments: true
pageviews__total: 2685
pageviews__recent: 30
pageviews__avg_time: 772
tutorial__order: 0
tags:
  - java
  - c#
categories:
  - Technologies
#categories: [c#, csv, regex, java]
---
<p>Regular expressions are used to find matches in texts. The following is a real application of Regex in C# and Java.&nbsp;</p>
<!--More-->
<div>
	<div>
		CSV are files that all the data is separated by a comma. E.g:</div>
	<pre>
name,line1,line2,city,zip code,country</pre>
	<div>
		You cand easily use String.Split() in C# to get all the values. But, there are cases when the data can contain comma. E.g:</div>
	<pre>
&quot;Mr. John Doe, Jr.&quot;,7926 Glenbrook Dr., 14623</pre>
	<div>
		In this case a regular expression (regex) could be use to determine if the comma is inside a quote or not.</div>
	<div>
		&nbsp;</div>
	<div>
		C# Example:</div>
	<div>
		&nbsp;</div>
	<div>
		<pre>
    public string[] parseCSV(string line)
    {
        List&lt;string&gt; datalist = new List&lt;string&gt;();

        /*
         * Define a regular expression for csv.
         * This Pattern will match on either quoted text or text between commas, including
         * whitespace, and accounting for beginning and end of line.
         */

        Regex rx = new Regex(&quot;\&quot;([^\&quot;]*)\&quot;|(?&lt;=,|^)([^,]*)(?:,|$)&quot;,
          RegexOptions.Compiled | RegexOptions.IgnoreCase);

        // Find matches.
        MatchCollection matches = rx.Matches(line);

        // Report the number of matches found.
        Console.WriteLine(&quot;{0} matches found.&quot;, matches.Count);

        // Report on each match.
        foreach (Match match in matches)
        {
            if (match.Groups[1].Value.Length &gt; 0)
                datalist.Add(match.Groups[1].Value); // match csv values inside commas
            else
                datalist.Add(match.Groups[2].Value); // match csv values outside commas
        }
        return datalist.ToArray();
    }</pre>
	</div>
	<div>
		&nbsp;</div>
	<div>
		&nbsp;</div>
	<div>
		Java Example:</div>
	<div>
		<pre>
    public String[] parse(String csvLine) {
        Pattern csvPattern = Pattern.compile(&quot;\&quot;([^\&quot;]*)\&quot;|(?&lt;=,|^)([^,]*)(?:,|$)&quot;);
        matcher = csvPattern.matcher(csvLine);
        allMatches.clear();
        String match;

        while (matcher.find()) {
                match = matcher.group(1);

                if (match!=null) {
                        allMatches.add(match);
                }
                else {
                        allMatches.add(matcher.group(2));
                }
        }

        size = allMatches.size();
        if (size &gt; 0) {
                return allMatches.toArray(new String[size]);
        }
        else {
                return new String[0];
        }
    } </pre>
	</div>
</div>
<p>&nbsp;</p>
