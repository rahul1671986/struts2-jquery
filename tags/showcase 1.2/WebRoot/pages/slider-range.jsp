<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="sj" uri="/struts-jquery-tags"%>
<div id="col1">
  <div id="col1_content" class="clearfix">
    <ul>
      <li><s:url id="urlslider" action="slider"/><sj:a href="%{urlslider}" targets="main">Slider</sj:a></li>
      <li><s:url id="urlsliderform" action="slider-form"/><sj:a href="%{urlsliderform}" targets="main">Slider in a Form</sj:a></li>
      <li><s:url id="urlsliderrange" action="slider-range"/><sj:a href="%{urlsliderrange}" targets="main">Slider with Range and Events</sj:a></li>
    </ul>
  </div>
</div>
<div id="col3">
  <div id="col3_content" class="clearfix">
    <script type="text/javascript">
    $.subscribe('sliderStop', function(event,data) {
        alert('Slider stop with value : '+event.originalEvent.ui.value);
    });
    </script>        
	<h2>Sliders with min and max Range and Events</h2>
	<p>
	    Slider with min and max Range in a form with AJAX submit.<br/>
	    The slider raise an event when slide is stoping.
	</p>
    <strong>Result Div :</strong>
	<div id="result" class="result ui-widget-content ui-corner-all">Submit form bellow.</div>
    
    <s:form id="form1" action="echo" theme="xhtml" cssStyle="width: 400px; margin: 10px;">
         <sj:slider id="echo1" name="echo" label="Echo" value="70" onCompleteTopics="sliderStop" range="min" min="20" max="200" step="5" cssStyle="width: 300px; margin: 10px;"/>
         <sj:submit id="slidersubmit1" targets="result" value="AJAX Submit" indicator="indicator_slider_range"/> <img id="indicator_slider_range" src="images/indicator.gif" alt="Loading..." style="display:none"/> 
    </s:form>
    <s:form id="form2" action="echo" theme="xhtml" cssStyle="width: 400px; margin: 10px;">
         <sj:slider id="echo2" name="echo" label="Echo" value="120" orientation="vertical" onCompleteTopics="sliderStop" range="max" min="20" max="200" step="5" cssStyle="height: 200px; margin: 10px;"/>
         <sj:submit id="slidersubmit2" targets="result" value="AJAX Submit" indicator="indicator_slider_range"/> <img id="indicator_slider_range" src="images/indicator.gif" alt="Loading..." style="display:none"/> 
    </s:form>

	<div class="code ui-widget-content ui-corner-all">
	  <strong>Code:</strong>
	  <pre>
	    &lt;script type="text/javascript"&gt;
    $.subscribe('sliderStop', function(event,data) {
        alert('Slider stop with value : '+event.originalEvent.ui.value);
    });
	    &lt;/script&gt;        

	&lt;div id=&quot;result&quot; class=&quot;result ui-widget-content ui-corner-all&quot;&gt;Submit form bellow.&lt;/div&gt;
    
    &lt;s:form id=&quot;form1&quot; action=&quot;echo&quot; theme=&quot;xhtml&quot; cssStyle=&quot;width: 400px; margin: 10px;&quot;&gt;
         &lt;sj:slider id=&quot;echo1&quot; name=&quot;echo&quot; label=&quot;Echo&quot; value=&quot;70&quot; onCompleteTopics=&quot;sliderStop&quot; range=&quot;min&quot; min=&quot;20&quot; max=&quot;200&quot; step=&quot;5&quot; cssStyle=&quot;width: 300px; margin: 10px;&quot;/&gt;
         &lt;sj:submit id=&quot;slidersubmit1&quot; targets=&quot;result&quot; value=&quot;AJAX Submit&quot; indicator=&quot;indicator_slider_range&quot;/&gt; &lt;img id=&quot;indicator_slider_range&quot; src=&quot;images/indicator.gif&quot; alt=&quot;Loading...&quot; style=&quot;display:none&quot;/&gt; 
    &lt;/s:form&gt;
    &lt;s:form id=&quot;form2&quot; action=&quot;echo&quot; theme=&quot;xhtml&quot; cssStyle=&quot;width: 400px; margin: 10px;&quot;&gt;
         &lt;sj:slider id=&quot;echo2&quot; name=&quot;echo&quot; label=&quot;Echo&quot; value=&quot;120&quot; orientation=&quot;vertical&quot; onCompleteTopics=&quot;sliderStop&quot; range=&quot;max&quot; min=&quot;20&quot; max=&quot;200&quot; step=&quot;5&quot; cssStyle=&quot;height: 200px; margin: 10px;&quot;/&gt;
         &lt;sj:submit id=&quot;slidersubmit2&quot; targets=&quot;result&quot; value=&quot;AJAX Submit&quot; indicator=&quot;indicator_slider_range&quot;/&gt; &lt;img id=&quot;indicator_slider_range&quot; src=&quot;images/indicator.gif&quot; alt=&quot;Loading...&quot; style=&quot;display:none&quot;/&gt; 
    &lt;/s:form&gt;
	  </pre>
	</div>
  </div>
  <!-- IE Column Clearing -->
  <div id="ie_clearing"> &#160; </div>
</div>