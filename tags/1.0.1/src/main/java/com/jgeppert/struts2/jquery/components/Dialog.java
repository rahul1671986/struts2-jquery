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
 * <!-- START SNIPPET: javadoc --> Renders a Dialog with local or remote content
 * <!-- END SNIPPET: javadoc -->
 * 
 * <p>
 * Examples
 * </p>
 * <!-- START SNIPPET: example1 --> &lt;sj:dialog id="mydialog1"
 * title="Local Dialog"&gt; Mauris mauris ante, blandit et, ultrices a, suscipit
 * eget, quam. Integer ut neque. Vivamus nisi metus, molestie vel, gravida in,
 * condimentum sit amet, nunc. Nam a nibh. Donec suscipit eros. Nam mi. Proin
 * viverra leo ut odio. Curabitur malesuada. Vestibulum a velit eu ante
 * scelerisque vulputate. &lt;/sj:dialog&gt; <!-- END SNIPPET: example1 -->
 * 
 * <!-- START SNIPPET: example2 --> &lt;s:url id="remoteurl"
 * action="myremoteaction"/&gt; &lt;sj:dialog id="mydialog2" href="%{remoteurl}"
 * title="Remote Dialog"/&gt; <!-- END SNIPPET: example2 -->
 * 
 * <!-- START SNIPPET: example3 --> &lt;s:url id="remoteurl"
 * action="myremoteaction"/&gt; &lt;sj:dialog id="mydialog3" href="%{remoteurl}"
 * title="Modal Remote Dialog with Effects" modal="true" showEffect="slide"
 * hideEffect="explode"/&gt; <!-- END SNIPPET: example3 -->
 * 
 * <!-- START SNIPPET: example4 --> &lt;script type="text/javascript"&gt;
 * function okButton(event){ alert('OK Button pressed!'); }; function
 * cancelButton(event){ alert('Cancel Button pressed!'); }; &lt;/script&gt;
 * &lt;s:url id="remoteurl" action="myremoteaction"/&gt; &lt;sj:dialog
 * id="mydialog4" href="%{remoteurl}" title="Dialog with Buttons" buttons=
 * "'OK':function() {okButton();},'Cancel':function() {cancelButton();}"/&gt;
 * <!-- END SNIPPET: example4 -->
 * 
 * <!-- START SNIPPET: example5 --> &lt;s:url id="remoteurl"
 * action="myremoteaction"/&gt; &lt;sj:dialog id="mydialog5" href="%{remoteurl}"
 * title="Remote Dialog open on Click" autoOpen="false" modal="true"/&gt;
 * &lt;sj:a openDialog="mydialog5"&gt;Open Dialog&lt;/sj:a&gt; <!-- END SNIPPET:
 * example5 -->
 */
@StrutsTag(name = "dialog", tldTagClass = "com.jgeppert.struts2.jquery.views.jsp.ui.DialogTag", description = "Render a Dialog")
public class Dialog extends AbstractRemoteBean implements RemoteBean {

  public static final String TEMPLATE       = "dialog";
  public static final String TEMPLATE_CLOSE = "dialog-close";
  public static final String COMPONENT_NAME = Dialog.class.getName();

  protected String           buttons;
  protected String           draggable;
  protected String           dialogClass;
  protected String           height;
  protected String           modal;
  protected String           position;
  protected String           resizable;
  protected String           title;
  protected String           width;
  protected String           zindex;
  protected String           autoOpen;
  protected String           showEffect;
  protected String           hideEffect;
  protected String           overlayColor;
  protected String           overlayOpacity;
  protected String           open;
  protected String           close;

  public Dialog(ValueStack stack, HttpServletRequest request, HttpServletResponse response) {
    super(stack, request, response);
  }

  public String getDefaultOpenTemplate()
  {
    return TEMPLATE;
  }

  protected String getDefaultTemplate()
  {
    return TEMPLATE_CLOSE;
  }

  public void evaluateExtraParams()
  {
    super.evaluateExtraParams();

    if (buttons != null) addParameter("buttons", findString(buttons));
    if (this.draggable != null) addParameter("draggable", findValue(this.draggable, Boolean.class));
    if (dialogClass != null) addParameter("dialogClass", findString(dialogClass));
    if (height != null) addParameter("height", findString(height));
    if (this.modal != null) addParameter("modal", findValue(this.modal, Boolean.class));
    if (position != null) addParameter("position", findString(position));
    if (this.resizable != null) addParameter("resizable", findValue(this.resizable, Boolean.class));
    if (title != null) addParameter("title", findString(title));
    if (width != null) addParameter("width", findString(width));
    if (zindex != null) addParameter("zindex", findString(zindex));
    if (autoOpen != null) addParameter("autoOpen", findValue(this.autoOpen, Boolean.class));
    if (showEffect != null) addParameter("showEffect", findString(showEffect));
    if (hideEffect != null) addParameter("hideEffect", findString(hideEffect));
    if (overlayColor != null) addParameter("overlayColor", findString(overlayColor));
    if (overlayOpacity != null) addParameter("overlayOpacity", findString(overlayOpacity));
    if (open != null) addParameter("open", findString(open));
    if (close != null) addParameter("close", findString(close));
  }

  @Override
  @StrutsTagSkipInheritance
  public void setTheme(String theme)
  {
    super.setTheme(theme);
  }

  @Override
  public String getTheme()
  {
    return "jquery";
  }

  @StrutsTagAttribute(description = "Specifies which buttons should be displayed on the dialog. The property key is the text of the button. The value is the callback function for when the button is clicked.")
  public void setButtons(String buttons)
  {
    this.buttons = buttons;
  }

  @StrutsTagAttribute(description = "If set to true, the dialog will be draggable will be draggable by the titlebar. Default: true", defaultValue = "true", type = "Boolean")
  public void setDraggable(String draggable)
  {
    this.draggable = draggable;
  }

  @StrutsTagAttribute(description = "The specified class name(s) will be added to the dialog, for additional theming.")
  public void setDialogClass(String dialogClass)
  {
    this.dialogClass = dialogClass;
  }

  @StrutsTagAttribute(description = "The height of the dialog, in pixels.")
  public void setHeight(String height)
  {
    this.height = height;
  }

  @StrutsTagAttribute(description = "If set to true, the dialog will have modal behavior; other items on the page will be disabled (i.e. cannot be interacted with). Modal dialogs create an overlay below the dialog but above other page elements. Default: false", defaultValue = "false", type = "Boolean")
  public void setModal(String modal)
  {
    this.modal = modal;
  }

  @StrutsTagAttribute(description = "Specifies where the dialog should be displayed. Possible values: 'center', 'left', 'right', 'top', 'bottom', or an array containing a coordinate pair (in pixel offset from top left of viewport) or the possible string values (e.g. ['right','top'] for top right corner). Default: 'center'")
  public void setPosition(String position)
  {
    this.position = position;
  }

  @StrutsTagAttribute(description = "If set to true, the dialog will be resizeable. Default: true", defaultValue = "true", type = "Boolean")
  public void setResizable(String resizable)
  {
    this.resizable = resizable;
  }

  @StrutsTagAttribute(description = "Specifies the title of the dialog. The title can also be specified by the title attribute on the dialog source element.")
  public void setTitle(String title)
  {
    this.title = title;
  }

  @StrutsTagAttribute(description = "The width of the dialog, in pixels. Default: 300")
  public void setWidth(String width)
  {
    this.width = width;
  }

  @StrutsTagAttribute(description = "The starting z-index for the dialog. Default: 1000")
  public void setZindex(String zindex)
  {
    this.zindex = zindex;
  }

  @StrutsTagAttribute(description = "When autoOpen is true the dialog will open automatically when dialog is called. If false it will stay hidden until .dialog('open') is called on it. Default: true", defaultValue = "true", type = "Boolean")
  public void setAutoOpen(String autoOpen)
  {
    this.autoOpen = autoOpen;
  }

  @StrutsTagAttribute(description = "The effect to be used when the dialog is opened. Values are slide, scale, blind, clip, puff, explode, fold and drop. Default: none")
  public void setShowEffect(String showEffect)
  {
    this.showEffect = showEffect;
  }

  @StrutsTagAttribute(description = "The effect to be used when the dialog is closed. Values are slide, scale, blind, clip, puff, explode, fold and drop. Default: none")
  public void setHideEffect(String hideEffect)
  {
    this.hideEffect = hideEffect;
  }

  @StrutsTagAttribute(description = "Overlay color when modal is true. e.g. #000")
  public void setOverlayColor(String overlayColor)
  {
    this.overlayColor = overlayColor;
  }

  @StrutsTagAttribute(description = "Overlay opacity when modal is true. e.g. 0.7")
  public void setOverlayOpacity(String overlayOpacity)
  {
    this.overlayOpacity = overlayOpacity;
  }

  @StrutsTagAttribute(description = "This event is triggered when dialog is opened.")
  public void setOpen(String open)
  {
    this.open = open;
  }

  @StrutsTagAttribute(description = "This event is triggered when the dialog is closed.")
  public void setClose(String close)
  {
    this.close = close;
  }

}
