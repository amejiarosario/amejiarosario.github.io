---
layout: post
title: How to setup Drupal WYSIWYG and Images uploading?
created: 1320876440000
updated: 1320876440000
comments: true
pageviews__total: 826
pageviews__recent: 1
pageviews__avg_time: 181
tutorial__order: 0
tags:
  - drupal
categories:
  - Technologies
#categories: [drupal, wysiwyg, imce, ckeditor]
---
<p>It have been a pain for me to upload images and deal with tons of WYSIWYG editors... After many trials in this post I recompiled my experiences and the best method that I have found so far. If you have any suggestion I&#39;m willing to hear it, too.</p>
<!--More-->
<div>
	<strong>1. Install and enable the following modules:</strong></div>
<div>
	&nbsp;</div>
<div>
	http://drupal.org/project/ckeditor (disable the WYSIWYG module if you have it install it)</div>
<div>
	http://drupal.org/project/imce -or- http://drupal.org/project/elfinder</div>
<div>
	&nbsp;</div>
<div>
	- optional -</div>
<div>
	http://drupal.org/project/ckeditor_link</div>
<div>
	&nbsp;</div>
<div>
	<div>
		How to setup Drupal WYSIWYG and Images uploading?</div>
	<div>
		&nbsp;</div>
	<div>
		It have been a pain for me to upload images and deal with tons of WYSIWYG editors... After many trials in this post I recompiled my experiences and the best method that I have found so far. If you have any suggestion I&#39;m willing to hear it, too.</div>
	<div>
		&nbsp;</div>
	<div>
		&nbsp;</div>
	<div>
		<strong>1. Install and enable the following modules:</strong></div>
	<div>
		&nbsp;</div>
	<div>
		http://drupal.org/project/ckeditor (disable the WYSIWYG module if you have it install it)</div>
	<div>
		http://drupal.org/project/imce -or- http://drupal.org/project/elfinder</div>
	<div>
		&nbsp;</div>
	<div>
		- optional -</div>
	<div>
		http://drupal.org/project/ckeditor_link</div>
	<div>
		&nbsp;</div>
	<div>
		<strong>2. Setting up IMCE</strong></div>
	<div>
		a. Install and enable the IMCE module at module administration page.</div>
	<div>
		b. Create configuration profiles and assign them to user roles at /?q=/admin/config/media/imce <strong>-or-</strong> Menu: Configuration &raquo; Media &raquo; IMCE&nbsp;</div>
	<div>
		c. Test it at /imce.</div>
	<div>
		&nbsp;</div>
	<div>
		<strong>3. Setup text formats. </strong>You can create two new ones to be used by the ckeditor (basic and full):</div>
	<div>
		a. Menu: Configuration &raquo; Content authoring &raquo; Text formats</div>
	<div>
		b. Click &quot;+ Add text format&quot; and add two new formats &quot;ckeditor-basic&quot; and &quot;ckeditor-full&quot; with the &quot;administrator&quot; and &quot;authenticated users&quot; check boxes marked. Everything else could remain in their default values.</div>
	<div>
		c. Back to Configuration &raquo; Content authoring, you can rearrange the order, the top most one will be the default.</div>
	<div>
		&nbsp;</div>
	<div>
		<strong>4. Setup CKEditor</strong></div>
	<div>
		After you install the CKEditor module, download the latest version of ckeditor from http://ckeditor.com/download</div>
	<div>
		a. &quot;Create a new profile&quot; link</div>
	<div>
		b. Setup the name in the &quot;Basic Setup&quot; section and choose one of Input format that you created in step (3)</div>
	<div>
		c. In &quot;Editor Appearance&quot; you can setup the toolbar load (basic, full, advance)</div>
	<div>
		d. In &quot;FILE BROWSER SETTINGS&quot; select &quot;IMCE&quot; as the &quot;File browser type&quot;</div>
	<div>
		e. Save and you can repeated this steps for full and basic.</div>
	<div>
		&nbsp;</div>
	<div>
		<strong>5. You are all set.&nbsp;</strong>When you add new content your Textbox and imaging uploading should look like this:</div>
</div>
<div>
	&nbsp;</div>
<div>

<!-- <img alt="" src="http://adrianmejiarosario.com/sites/default/files/Screen%20Shot%202011-11-09%20at%205.05.23%20PM.png" style="width: 500px; height: 325px; " /> -->
</div>
<div>
	&nbsp;</div>
