/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package com.jgeppert.struts2.jquery.components;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.views.annotations.StrutsTag;
import org.apache.struts2.views.annotations.StrutsTagAttribute;
import org.apache.struts2.views.annotations.StrutsTagSkipInheritance;

import com.opensymphony.xwork2.util.ValueStack;

/**
 * <!-- START SNIPPET: javadoc -->
 * <p>
 * A tag that creates an HTML &lt;a/&gt; element, that when clicked makes an asynchronous request(XMLHttpRequest). The url
 * attribute must be build using the &lt;s:url/&gt; tag. 
 * </p>
 * <!-- END SNIPPET: javadoc -->
 * <p>Examples</p>
 * 
 * <!-- START SNIPPET: example1 -->
 * &lt;div id="div1"&gt;Div 1&lt;/div&gt;
 * &lt;s:url id="ajaxTest" value="/AjaxTest.action"/&gt;
 * 
 * &lt;sj:a id="link1" href="%{ajaxTest}" target="div1"&gt;
 *      Update Content
 * &lt;/sj:a&gt;
 * <!-- END SNIPPET: example1 -->
 * 
 * <!-- START SNIPPET: example2 -->
 * &lt;s:form id="form" action="AjaxTest"&gt;
 *      &lt;input type="textbox" name="data"&gt;   
 * &lt;/s:form&gt;
 * 
 * &lt;sj:a formId="form" targets="div1"&gt;Submit form&lt;/sj:a&gt;
 * <!-- END SNIPPET: example2 -->
 * 
 * <!-- START SNIPPET: example3 -->
 * &lt;script type="text/javascript"&gt;
 * function before(event){
 *     alert('before request');
 * };
 * function complete(event){
 *     alert('after request');
 * };
 * &lt;/script&gt;         
 * 
 * &lt;sj:a id="link1" href="%{ajaxTest}" target="div1" beforeSend="before()" complete="complete()"&gt;Raise events&lt;/sj:a&gt;
 * <!-- END SNIPPET: example3 -->
 */
@StrutsTag(name="a", tldTagClass="com.jgeppert.struts2.jquery.views.jsp.ui.AnchorTag", description="Renders an HTML anchor element that when clicked calls a URL via remote XMLHttpRequest and updates " +
                "its targets content")
public class Anchor extends AbstractRemoteBean implements RemoteBean {
    public static final String OPEN_TEMPLATE = "a";
    public static final String TEMPLATE = "a-close";
    public static final String COMPONENT_NAME = Anchor.class.getName();

    protected String targets;
    protected String openDialog;

    public Anchor(ValueStack stack, HttpServletRequest request, HttpServletResponse response) {
        super(stack, request, response);
    }

    public String getDefaultOpenTemplate() {
        return OPEN_TEMPLATE;
    }

    protected String getDefaultTemplate() {
        return TEMPLATE;
    }

    public void evaluateExtraParams() {
        super.evaluateExtraParams();

        if (targets != null)
            addParameter("targets", findString(targets));
        if (openDialog != null)
          addParameter("openDialog", findString(openDialog));
    }
    
    @Override
    @StrutsTagSkipInheritance
    public void setTheme(String theme) {
        super.setTheme(theme);
    }
    
    @Override
    public String getTheme() {
        return "jquery";
    }
    

    @StrutsTagAttribute(description="Comma delimited list of ids of the elements whose content will be updated")
    public void setTargets(String targets) {
        this.targets = targets;
    }

    @StrutsTagAttribute(description="id of dialog that will be opened when clicked.")
    public void setOpenDialog(String openDialog)
    {
      this.openDialog = openDialog;
    }
}