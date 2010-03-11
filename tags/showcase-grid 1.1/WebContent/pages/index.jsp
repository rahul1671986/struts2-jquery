<?xml version="1.0" encoding="utf-8"?>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="sj" uri="/struts-jquery-tags"%>

<s:url id="urlgrid" action="grid"/>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
    <title>Struts2 jQuery Plugin Showcase</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="Content-Style-Type" content="text/css" />
	<meta http-equiv="pragma" content="no-cache" />
	<meta http-equiv="cache-control" content="no-cache" />
	<meta http-equiv="expires" content="0" />    
	<meta http-equiv="keywords" content="struts2,jquery, hibernate, plugin,showcase, grid" />
	<meta http-equiv="description" content="Showcase for jQuery Plugin and Full Hibernate Struts2 Plugins" />
	<link href="styles/layout.css" rel="stylesheet" type="text/css" />
	<!--[if lte IE 7]>
	<link href="styles/patch_layout.css" rel="stylesheet" type="text/css" />
	<![endif]-->

    <sj:head 
    	compressed="false" 
    	useJqGridPlugin="true" 
    	jqueryui="true" 
    	jquerytheme="showcase" 
    	customBasepath="themes" 
    	loadFromGoogle="false"
    	/>
  <script type="text/javascript" src="js/showcase.js"></script>
</head>
<body>
  <div class="page_margins">
    <div class="page">
      <div id="header" class="ui-widget-header">
        <div id="headline">
	        <h1 class="ui-state-default" style="background: none; border: none;width: 700px">Showcase for jQuery Plugin and Full Hibernate Struts2 Plugins</h1>
	        <h4 class="ui-state-default" style="background: none; border: none;width: 700px">jQuery Plugin - Version 1.8.2 / Full Hibernate Plugin - Version 2.1.3</h4>
        </div>
      </div>
      <div id="nav">
        <div class="hlist ui-widget-header">
          <ul>
            <li class="ui-widget-header ui-state-active"><s:url id="urlgrid" action="grid" /><sj:a id="gridlink" href="%{urlgrid}" targets="main">Grid (Editable)</sj:a></li>
            <li class="ui-widget-header"><s:url id="urlgridsubgrid" action="grid-subgrid" /><sj:a id="gridsubgridlink" href="%{urlgridsubgrid}" targets="main">Grid with Subgrid</sj:a></li>
            <li class="ui-widget-header"><a href="http://code.google.com/p/struts2-jquery/">jQuery Plugin</a></li>
            <li class="ui-widget-header"><a href="http://code.google.com/p/full-hibernate-plugin-for-struts2/">Full Hibernate Plugin</a></li>
          </ul>
        </div>
      </div>
      <sj:div id="main" href="%{urlgrid}">
        <img id="indicator" src="images/indicator.gif" alt="Loading..."/>
      </sj:div>
      <!-- begin: #footer -->
      <div id="footer">
        Written by  <a href="http://www.jgeppert.com" title="Java Developer Blog">Johannes Geppert</a> and <a href="http://jyoshiriro.blogspot.com" title="Java Developer Blog">José Yoshiriro</a><br/>
        Hosted by  <a href="http://www.weinfreund.de" title="Wein vom Weingut, Weinforum, Wein Community">weinfreund.de</a><br/>
        Layout based on <a href="http://www.yaml.de/" title="OpenSource CSS Layout">YAML</a>
      </div>
    </div>
  </div>
</body>
</html>