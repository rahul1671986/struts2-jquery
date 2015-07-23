

# Introduction #

The Grid Tag is provided by the [jQuery Grid Plugin](http://www.trirand.com/blog/).

For custom locals use the [Head Tag](HeadTag.md)

# Samples #

  * [Make a Grid editable](EditGrid.md)
  * [Format Grid Columns](FormatGrid.md)
  * [Search Grid](SearchGrid.md)
  * [Grid with Subgrid](SubGrid.md)
  * [Add Navigator Buttons](NavigatorButtons.md)

## Diagram ##

![http://www.jgeppert.com/struts2-jquery/struts2_jquery_grid.png](http://www.jgeppert.com/struts2-jquery/struts2_jquery_grid.png)

## Configuration ##

Enable JSON support in your Struts2 Webapplication.

  * Use the json plugin that is distributed by struts2 since version 2.1.8
  * Copy struts2-json-plugin-2.x.x.jar in your WEB-INF/lib path.
  * Enable json results for your package in struts2.xml config file.

```
    <package name="showcase" extends="struts-default,json-default" namespace="/">
    </package>
```

## Create a JSON Action ##

Create a Struts2 Action that return a valid JSON result.

```
@ParentPackage(value = "showcase")
public class JsonTable extends ActionSupport {

  //Your result List
  private List<Customer>      gridModel;

  //get how many rows we want to have into the grid - rowNum attribute in the grid
  private Integer             rows             = 0;

  //Get the requested page. By default grid sets this to 1.
  private Integer             page             = 0;

  // sorting order - asc or desc
  private String              sord;

  // get index row - i.e. user click to sort.
  private String              sidx;

  // Search Field
  private String              searchField;

  // The Search String
  private String              searchString;

  // he Search Operation ['eq','ne','lt','le','gt','ge','bw','bn','in','ni','ew','en','cn','nc']
  private String              searchOper;

  // Your Total Pages
  private Integer             total            = 0;

  // All Record
  private Integer             records          = 0;

  @Actions( {
    @Action(value = "/jsontable", results = {
      @Result(name = "success", type = "json")
    })
  })
  public String execute()
  {

    int to = (rows * page);
    int from = to - rows;


    //Count Rows (select count(*) from custumer)
    records = CustumerDAO.count()

    //Your logic to search and select the required data.
    gridModel = CustumerDAO.find(from, to);

    //calculate the total pages for the query
    total =(int) Math.ceil((double)records / (double)rows);

    return SUCCESS;
  }

  public String getJSON()
  {
    return execute();
  }

  //Getters and Setters for Attributes
}
```

## Using Tags to render the Grid ##

  * Add Struts2 jQuery Plugin Tag lib to your JSP
```
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="sj" uri="/struts-jquery-tags"%>
<%@ taglib prefix="sjg" uri="/struts-jquery-grid-tags"%>
```
  * Enable jQuery Grid Plugin in your Head Tag
```
<sj:head jqueryui="true" jquerytheme="redmond" />
```
  * Add Grid and [GridColumns](GridColumnTag.md) to your Page
```
    <s:url var="remoteurl" action="jsontable"/>
    <sjg:grid
    	id="gridtable"
    	caption="Customer Examples"
    	dataType="json"
    	href="%{remoteurl}"
    	pager="true"
    	gridModel="gridModel"
    	rowList="10,15,20"
    	rowNum="15"
    	rownumbers="true"
    >
    	<sjg:gridColumn name="id" index="id" title="ID" formatter="integer" sortable="false"/>
    	<sjg:gridColumn name="name" index="name" title="Name" sortable="true"/>
    	<sjg:gridColumn name="country" index="country" title="Country" sortable="false"/>
    	<sjg:gridColumn name="city" index="city" title="City" sortable="false"/>
    	<sjg:gridColumn name="creditLimit" index="creditLimit" title="Credit Limit" formatter="currency" sortable="false"/>
    </sjg:grid>
```

# Topics #

| **Topic** | **Grid Event** | **Parameter** |
|:----------|:---------------|:--------------|
| onSelectRowTopics | onSelectRow    | event.originalEvent.id, event.originalEvent.status, event.originalEvent.grid |
| onSelectAllTopics | onSelectAll    | event.originalEvent.ids, event.originalEvent.status, event.originalEvent.grid |
| onBeforeTopics | loadBeforeSend | event.originalEvent.xhr |
| onPagingTopics | onPaging       | event.originalEvent.pgButton |
| onCellSelectTopics | onCellSelect   | event.originalEvent.rowid, event.originalEvent.iCol, event.originalEvent.cellcontent, event.originalEvent.e |
| onGridCompleteTopics | gridComplete   |               |
| onFocusTopics | beforeSelectRow | event.originalEvent.rowid, event.originalEvent.e |
| onCompleteTopics| loadComplete   | event.originalEvent.request, event.originalEvent.status |
| onErrorTopics | loadError      | event.originalEvent.request, event.originalEvent.status, event.originalEvent.error |
| onEditInlineAfterSaveTopics |                | event.originalEvent.rowid,event.originalEvent.response  |
| onEditInlineBeforeTopics |                |               |
| onEditInlineErrorTopics |                | event.originalEvent.rowid,event.originalEvent.response  |
| onEditInlineSuccessTopics |                | event.originalEvent.response |
| onCellEditErrorTopics | errorCell      | event.originalEvent.response, event.originalEvent.status |
| onCellEditSuccessTopics | afterSaveCell  | event.originalEvent.rowid, event.originalEvent.cellname, event.originalEvent.value, event.originalEvent.iRow, event.originalEvent.iCol |

## Example ##

```
<script type="text/javascript">
$.subscribe('rowselect', function(event, data) {
	alert('Selected Row : ' + event.originalEvent.id);
});
</script>

<sjg:grid
	...
	onSelectRowTopics="rowselect"
	...
>

```

# Attributes #
> <table width='100%'>
<blockquote><tr>
<blockquote><th align='left' valign='top'><h4>Name</h4></th>
<th align='left' valign='top'><h4>Required</h4></th>
<th align='left' valign='top'><h4>Default</h4></th>
<th align='left' valign='top'><h4>Evaluated</h4></th>
<th align='left' valign='top'><h4>Type</h4></th>
<th align='left' valign='top'><h4>Description</h4></th>
</blockquote></tr>
<blockquote><tr>
<blockquote><td align='left' valign='top'>accesskey</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the html accesskey attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>altClass</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>ui-priority-secondary</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>The class that is used for alternate rows. You can construct your own class and replace this value. This option is valid only if altRows options is set to true</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>altRows</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>Set a zebra-striped grid</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>autoencode</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>true</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>When set to true encodes (html encode) the incoming (from server) and posted data (from editing modules). By example < will be converted to &lt;</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>autowidth</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>When set to true, the grid width is recalculated automatically to the width of the parent element. This is done only initially when the grid is created.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>caption</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Defines the Caption layer for the grid. This caption appear above the Header layer. If the string is empty the caption does not appear.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>cellEdit</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>Enables (disables) cell editing. See Cell Editing for more details</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>cellurl</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>the url where the cell is to be saved.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>connectWith</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>empty string</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Determines the target grid(s) to which the row should be dropped. The option is a string. In case of more than one grid the ids should be delemited with comma - i.e #grid1, #grid2 </td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>cssClass</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>The css class to use for element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>cssErrorClass</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>The css error class to use for element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>cssErrorStyle</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>The css error style definitions for element to use</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>cssStyle</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>The css style definitions for element to use</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>dataType</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Type of the result. e.g. html, xml, text, json, ...</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>direction</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>ltr</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Determines the language direction in grid. The default is 'ltr' (Left To Right language). When set to 'rtl' (Right To Left) the grid automatically do the needed.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>disabled</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the html disabled attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>draggable</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Enable draggable functionality to the DIV element. Move the draggable object by clicking on it with the mouse and dragging it anywhere within the viewport. </td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>draggableAddClasses</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>If set to false, will prevent the ui-draggable class from being added. This may be desired as a performance optimization when calling draggable init on many hundreds of elements. Default: true</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>draggableAppendTo</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>The element passed to or selected by the appendTo option will be used as the draggable helper's container during dragging. By default, the helper is appended to the same container as the draggable. Default: parent</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>draggableAxis</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Constrains dragging to either the horizontal (x) or vertical (y) axis. Possible values: x or y.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>draggableCancel</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Prevents dragging from starting on specified elements.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>draggableContainment</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Constrains dragging to within the bounds of the specified element or region. Possible string values: parent, document, window, [x1, y1, x2, y2].</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>draggableCursor</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>The css cursor during the drag operation.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>draggableDelay</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Time in milliseconds after mousedown until dragging should start. This option can be used to prevent unwanted drags when clicking on an element.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>draggableDistance</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Distance in pixels after mousedown the mouse must move before dragging should start. This option can be used to prevent unwanted drags when clicking on an element.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>draggableHandle</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>If specified, restricts drag start click to the specified element(s). e.g. h2</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>draggableHelper</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Allows for a helper element to be used for dragging display. Possible values: original, clone. Default is original</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>draggableIframeFix</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>Prevent iframes from capturing the mousemove events during a drag. Useful in combination with cursorAt, or in any case, if the mouse cursor is not over the helper. If set to true, transparent overlays will be placed over all iframes on the page. If a selector is supplied, the matched iframes will have an overlay placed over them. Default: false</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>draggableOnDragTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>This event javascript function is triggered when the mouse is moved during the dragging.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>draggableOnStartTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>This event javascript function is triggered when dragging starts.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>draggableOnStopTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>This event javascript function is triggered when dragging stops.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>draggableOpacity</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Opacity for the helper while being dragged. e.g. 0.75</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>draggableRefreshPositions</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>If set to true, all droppable positions are calculated on every mousemove. Caution: This solves issues on highly dynamic pages, but dramatically decreases performance. Default: false</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>draggableRevert</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>If set to true, the element will return to its start position when dragging stops. e.g. true, valid, invalid Default: false</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>draggableRevertDuration</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>The duration of the revert animation, in milliseconds. Ignored if revert is false.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>draggableScope</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Used to group sets of draggable and droppable items, in addition to droppable's accept option. A draggable with the same scope value as a droppable will be accepted by the droppable.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>draggableScroll</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>If set to true, container auto-scrolls while dragging.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>draggableScrollSensitivity</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Distance in pixels from the edge of the viewport after which the viewport should scroll. Distance is relative to pointer, not the draggable. Default: 20</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>draggableScrollSpeed</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>The speed at which the window should scroll once the mouse pointer gets within the scrollSensitivity distance. Default: 20</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>draggableSnap</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>If set to true, the draggable will snap to the edges of the selected elements when near an edge of the element. Default: false</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>draggableSnapMode</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Determines which edges of snap elements the draggable will snap to. Ignored if snap is false. Possible values: inner, outer, both. Default: both</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>draggableSnapTolerance</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>The distance in pixels from the snap element edges at which snapping should occur. Ignored if snap is false. Default: 20</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>draggableZindex</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>z-index for the helper while being dragged.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>droppable</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Enable any DIV element to be droppable, a target for draggable elements.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>droppableAccept</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>All draggables that match the jQuery selector will be accepted. e.g. #myid or .myclass</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>droppableActiveClass</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>If specified, the class will be added to the droppable while an acceptable draggable is being dragged.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>droppableAddClasses</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>true</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>If set to false, will prevent the ui-droppable class from being added. This may be desired as a performance optimization when calling droppable init on many hundreds of elements. Default: true</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>droppableGreedy</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>If true, will prevent event propagation on nested droppables. Default: false</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>droppableHoverClass</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>If specified, the class will be added to the droppable while an acceptable draggable is being hovered.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>droppableOnActivateTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>This event javascript function is triggered any time an accepted draggable starts dragging. This can be useful if you want to make the droppable 'light up' when it can be dropped on.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>droppableOnDeactivateTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>This event javascript function is triggered any time an accepted draggable stops dragging.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>droppableOnDropTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>This event javascript function is triggered when an accepted draggable is dropped 'over' this droppable.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>droppableOnOutTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>This event javascript function is triggered when an accepted draggable is dragged 'out' this droppable.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>droppableOnOverTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>This event javascript function is triggered as an accepted draggable is dragged 'over' this droppable.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>droppableScope</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Used to group sets of draggable and droppable items, in addition to droppable's accept option. A draggable with the same scope value as a droppable will be accepted.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>droppableTolerance</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Specifies which mode to use for testing whether a draggable is over a droppable. Possible values: fit, intersect, pointer, touch. </td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>editinline</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>Enable editing inline. Default: false</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>editurl</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Defines the url for inline and form editing.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>effect</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>none</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Perform a effect on the elements specified in the 'targets' attribute. e.g. bounce, highlight, pulsate, shake, size or transfer. See more details at <a href='http://docs.jquery.com/UI/Effects'>http://docs.jquery.com/UI/Effects</a></td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>effectDuration</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>2000</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Duration of effect in milliseconds. Only valid if 'effect' attribute is set</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>effectMode</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>none</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>The Effect Mode. show, hide, toggle, none</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>effectOptions</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>jQuery options for effect, eg 'color : #aaaaaa' for the highlight effect or 'times : 3' for the bounce effect. Only valid if 'effect' attribute is set. See more details at <a href='http://docs.jquery.com/UI/Effects'>http://docs.jquery.com/UI/Effects</a></td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>errorElementId</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>This should provide the id of the element into which the error text will be placed when an error ocurrs loading the container. If 'errorTest' is provided, that  wil be used, otherwise the ajax error message text wil be used.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>errorPosition</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Define error position of form element (top|bottom)</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>errorText</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>The text to be displayed on load error. If 'errorElement' is provided, this will display the error in the elemtn (if existing), if not, it will display the error as the contents of this container</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>filter</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>This method construct searching creating input elements just below the header elements of the grid.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>filterOptions</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Options for Filter Settings as JavaScript Object. e.g. { autosearch : false, formtype : vertical }</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>footerrow</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>If set to true this will place a footer table with one row below the gird records and above the pager.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>formIds</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Comma delimited list of form ids for which to serialize all fields during submission when this element is clicked (if multiple forms have overlapping element names, it is indeterminate which will be used)</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>gridModel</td>
<td align='left' valign='top'><strong>true</strong></td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Name of you grid model. Must be a Collection</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>gridview</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>Insert the entry row at once with a jQuery append. The result is impressive - about 3-5 times faster. If set to true we can not use treeGrid, subGrid, or afterInsertRow event.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>groupCollapse</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>Defines if the initially the grid should show or hide the detailed rows of the group.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>groupColumnShow</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Show/Hide the column on which we group. The value here should be a boolean true/false for the group level. If the grouping is enabled we set this value to true. e.g. <a href='true.md'>true</a></td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>groupDataSorted</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>If this parameter is set to true we send a additional parameter to the server in order to tell him to sort the data. This way all the sorting is done at server leaving the grid only to display the grouped data. If this parameter is false additionally before to display the data we make our own sorting in order to support grouping. This of course slow down the speed on relative big data. This parameter is not valid is the datatype is local.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>groupField</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Defines the name from  colModel  on which we group. The first value is the first lavel, the second values is the second level and etc. Currently only one level is supported. e.g. ['name']</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>groupMinusIcon</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>ui-icon-circlesmall-minus</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the icon from jQuery UI Theme Roller that will be used if the grouped row is expanded</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>groupOrder</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Defines the initial sort order of the group level. Can be asc for ascending or desc for descending order. If the grouping is enabled the default value is asc. e.g. ['asc']</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>groupPlusIcon</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>ui-icon-circlesmall-plus</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the icon from jQuery UI Theme Roller that will be used if the grouped row is collapsed</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>groupShowSummaryOnHide</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>Show or hide the summary (footer) row when we collapse the group.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>groupSummary</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Enable or disable the summary (footer) row of the current group level. If grouping is set the default value for the group is false. e.g. <a href='true.md'>true</a></td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>groupText</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Defines the grouping header text for the group level that will be displayed in the grid. By default if defined the value if {0} which means that the group value name will be displayed. It is possible to specify another value {1} which meant the the total cont of this group will be displayed too. It is possible to set here any valid html content. e.g. ['<b>{0} - {1} Item(s)</b>'] </td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>height</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>The height of the grid. Can be set as number e.g. 400. Default: auto</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>hiddengrid</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>If set to true the grid initially is hidden. The data is not loaded (no request is sent) and only the caption layer is shown. When the show/hide button is clicked the first time to show grid, the request is sent to the server, the data is loaded, and grid is shown. From this point we have a regular grid.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>hidegrid</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>Enables or disables the show/hide grid button, which appears on the right side of the Caption layer. Takes effect only if the caption property is not an empty string.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>hoverrows</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>When set to false the mouse hovering is disabled in the grid data rows.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>href</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>The url to be use when this element is clicked</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>id</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>HTML id attribute</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>indicator</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>If loading content into a target, Id of element that will be displayed during loading and hidden afterwards (will override settings for the target container)</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>javascriptTooltip</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>Use JavaScript to generate tooltips</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>key</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the key (name, value, label) for this particular component</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>label</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Label expression used for rendering an element specific label</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>labelSeparator</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>:</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>String that will be appended to the label</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>labelposition</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Define label position of form element (top/left)</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>listenTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>The comma separated list 'listenTopics' is the list of topic names that is used to trigger a request.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>loadingText</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>If loading content into a target, The text to be displayed during load (will be shown if any provided, will override settings for the target container)</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>loadonce</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>If this flag is set to true, the grid loads the data from the server only once. After the first request all further manipulations are done on the client side. The functions of the pager (if present) are disabled.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>multiboxonly</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>This option works only when multiselect = true. When multiselect is set to true, clicking anywhere on a row selects that row; when multiboxonly is also set to true, the multiselection is done only when the checkbox is clicked (Yahoo style). Clicking in any other row (suppose the checkbox is not clicked) deselects all rows and the current row is selected.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>multiselect</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>If this flag is set to true a multi selection of rows is enabled. A new column at left side is added.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>multiselectWidth</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>etermines the width of the multiselect column if multiselect is set to true.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>name</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>The name to set for element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>navigator</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>Navigator is a method that can add predefined actions like editing, adding, deleting, and searching. This must be a true or false.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>navigatorAdd</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>true</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>Enables or disables the add action in the navigator. When the button is clicked a editGridRow with parameter new method is executed</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>navigatorAddOptions</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Add Options for Navigator. e.g. {height:280,reloadAfterSubmit:false},</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>navigatorCloneToTop</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>Clones all the actions from the bottom pager to the top pager if defined.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>navigatorDelete</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>true</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>Enables or disables the delete action in the navigator. When the button is clicked a delGridRow method is executed.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>navigatorDeleteOptions</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Delete Options for Navigator. e.g. {height:280,reloadAfterSubmit:false},</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>navigatorEdit</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>true</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>Enables or disables the edit action in the navigator. When the button is clicked a editGridRow method is executed with parameter the - current selected row</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>navigatorEditOptions</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Edit Options for Navigator. e.g. {height:280,reloadAfterSubmit:false},</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>navigatorExtraButtons</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Add extra buttons to Navigator. e.g.: { seperator: { title : 'seperator'  }, hidebutton : { title : 'Show Hide', icon: 'ui-icon-gear', topic: showHideGrid} }</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>navigatorInlineEditButtons</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>true</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>Show buttons for edit and add rows in case of editinline is true.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>navigatorRefresh</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>true</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>Enables or disables the refresh button in the pager. When the button is clicked a trigger(reloadGrid) is executed and the search parameters are cleared</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>navigatorSearch</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>true</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>Enables or disables the search button in the pager.When the button is clicked a searchGrid method is executed</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>navigatorSearchOptions</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Search Options for Navigator. e.g. {height:280,reloadAfterSubmit:false},</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>navigatorView</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>Enables or disables the view button in the pager. When the button is clicked a viewGridRow method is executed</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>navigatorViewOptions</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>View Options for Navigator. e.g. {sopt:['cn','bw','eq','ne','lt','gt','ew']},</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onAfterValidationTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published after the Ajax validation. event.originalEvent.formvalidate to see if validation passed/failed.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onAlwaysTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published always</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onBeforeTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Topics that are published before a load</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onBlurTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published when the element is blured</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onCellEditErrorTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published is called immediately if there is a server error.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onCellEditSuccessTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published is called immediately after the cell has been successfully saved.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onCellSelectTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published when we click on particular cell in the grid. Parameters: rowid is the id of the row, iCol is the index of the cell, cellcontent is the content of the cell, e is the event object element where we click.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onChangeTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published when the element changed</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onClickGroupTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published when a group is clicked.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onCompleteTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published when the element ajax request is completed (will override settings for a target container if provided)</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onDblClickRowTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published row was double clicked.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onDisableTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published when the element disabled</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onEditInlineAfterSaveTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published is called immediately after the data is saved to the server</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onEditInlineBeforeTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published after successfully accessing the row for editing, prior to allowing user access to the input fields.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onEditInlineErrorTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published is called immediately after the data is saved to the server</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onEditInlineSuccessTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published is called immediately after the request is successful.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onEffectCompleteTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published when an effect is completed </td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onEnableTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published when the element is enabled</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onErrorTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published when the element ajax request returns an error (will override settings for a target container if provided)</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onFocusTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published when the element is focused</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onGridCompleteTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published after all the data is loaded into the grid and all other processes are complete.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onPagingTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published after click on page button and before populating the data. Parameter: pgButton</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onRightClickRowTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published after row was right clicked. Note - this event does not work in Opera browsers, since Opera does not support oncontextmenu event</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onSelectAllTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published when multiselect option is true and you click on the header checkbox.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onSelectRowTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published when a row is selected</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onSortColTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published immediately after sortable column was clicked and before sorting the data. Parameters: index is the index name from colModel, iCol is the index of column, sortorder is the new sorting order - can be 'asc' or 'desc'</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onSubGridRowExpanded</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published when subgrid row is expanded. Set event.originalEvent.orginal.proceed = false in your topic to prevent default action.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onSuccessTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published when the element ajax request is completed successfully  (will override settings for a target container if provided)</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onblur</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'> Set the html onblur attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onchange</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the html onchange attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onclick</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the html onclick attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>ondblclick</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the html ondblclick attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onfocus</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the html onfocus attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onkeydown</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the html onkeydown attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onkeypress</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the html onkeypress attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onkeyup</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the html onkeyup attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onmousedown</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the html onmousedown attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onmousemove</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the html onmousemove attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onmouseout</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the html onmouseout attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onmouseover</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the html onmouseover attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onmouseup</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the html onmouseup attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onselect</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the html onselect attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>openTemplate</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set template to use for opening the rendered html.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>page</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>1</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the initial number of page when we make the request.This parameter is passed to the url for use by the server routine retrieving the data</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>pager</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>Defines that we want to use a pager bar to navigate through the records. This must be a true or false.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>pagerButtons</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>true</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>Determines if the Pager buttons should be shown if pager is available. Also valid only if pager is set correctly. The buttons are placed in the pager bar.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>pagerInput</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>true</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>DDetermines if the input box, where the user can change the number of requested page, should be available. The input box appear in the pager bar.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>pagerPosition</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>center</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Determines the position of the pager in the grid. By default the pager element when created is divided in 3 parts. Can be left, center, right</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>prmNames</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>{page:"page",rows:"rows", sort: "sidx",order: "sord", search:"<i>search", nd:"nd", id:"id",oper:"oper",editoper:"edit",addoper:"add",deloper:"del"}</td></i><td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Customizes names of the fields sent to the server on a Post. When some parameter is set to null they will be not sended to the server.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>recordpos</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>right</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Determines the position of the record information in the pager. Can be left, center, right</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>reloadTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that will cause this grid to reload</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>requestType</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>POST</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Type of the AJAX Request. POST, GET, PUT</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>requiredLabel</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>If set to true, the rendered element will indicate that input is required</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>requiredPosition</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Define required position of required form element (left|right)</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>resizable</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>Enable this div element to be resizable. With the cursor grab the right or bottom border and drag to the desired width or height.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>resizableAnimate</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>Animates to the final size after resizing. Default: false</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>resizableAnimateDuration</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Duration time for animating, in milliseconds.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>resizableAnimateEasing</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Easing effect for animating. Default: swing</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>resizableAspectRatio</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>If set to true, resizing is constrained by the original aspect ratio. Default: false</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>resizableAutoHide</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>If set to true, automatically hides the handles except when the mouse hovers over the element. Default: false</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>resizableContainment</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Constrains resizing to within the bounds of the specified element. Possible values: 'parent', 'document' or an id</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>resizableDelay</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Tolerance, in milliseconds, for when resizing should start. If specified, resizing will not start until after mouse is moved beyond duration. This can help prevent unintended resizing when clicking on an element.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>resizableDistance</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Tolerance, in pixels, for when resizing should start. If specified, resizing will not start until after mouse is moved beyond distance. This can help prevent unintended resizing when clicking on an element.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>resizableGhost</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>If set to true, a semi-transparent helper element is shown for resizing. Default: false</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>resizableHandles</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>If specified as a string, should be a comma-split list of any of the following: 'n, e, s, w, ne, se, sw, nw, all'. Default: e, s, se</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>resizableHelper</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>This is the css class that will be added to a proxy element to outline the resize during the drag of the resize handle. Once the resize is complete, the original element is sized. e.g. ui-state-highlight</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>resizableMaxHeight</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>This is the maximum height the resizable should be allowed to resize to.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>resizableMaxWidth</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>This is the maximum width the resizable should be allowed to resize to.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>resizableMinHeight</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>This is the minimum height the resizable should be allowed to resize to.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>resizableMinWidth</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>This is the minimum width the resizable should be allowed to resize to.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>resizableOnResizeTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>This event javascript function is triggered during the resize, on the drag of the resize handler.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>resizableOnStartTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>This event javascript function is triggered at the start of a resize operation.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>resizableOnStopTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>This event javascript function is triggered at the end of a resize operation.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>rowList</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>An array to construct a select box element in the pager in which we can change the number of the visible rows. e.g. 10,15,20</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>rowNum</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Sets how many records we want to view in the grid. This parameter is passed to the url for use by the server routine retrieving the data. Note that if you set this parameter to 10 (i.e. retrieve 10 records) and your server return 15 then only 10 records will be loaded. Set this parameter to -1 (unlimited) to disable this checking. Default: 20</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>rowTotal</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>null</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Integer</td>
<td align='left' valign='top'>When set this parameter can instruct the server to load the total number of rows needed to work on. Note that rowNum determines the total records displayed in the grid, while rowTotal the total rows on which we operate. When this parameter is set we send a additional parameter to server named totalrows. You can check for this parameter and if it is available you can replace the rows parameter with this one. Mostly this parameter can be combined wit loadonce parameter set to true.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>rownumbers</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>If this option is set to true, a new column at left of the grid is added. The purpose of this column is to count the number of available rows, beginning from 1. In this case colModel is extended automatically with new element with name - 'rn'. Also, be careful not to use the name 'rn' in gridModel</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>scroll</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Creates dynamic scrolling grids. When enabled, the pager elements are disabled and we can use the vertical scrollbar to load data. When set to true the grid will always hold all the items from the start through to the latest point ever visited.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>scrollrows</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>When enabled, selecting a row with setSelection scrolls the grid so that the selected row is visible.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>shrinkToFit</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>true</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>This option describes the type of calculation of the initial width of each column against with the width of the grid. If the value is true and the value in width option is set then: Every column width is scaled according to the defined option width.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortable</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>Enable sortable columns</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableAppendTo</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Defines where the helper that moves with the mouse is being appended to during the drag. Default: 'parent'</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableAxis</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>If defined, the items can be dragged only horizontally or vertically. Possible values:'x', 'y'.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableCancel</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Prevents sorting if you start on elements matching the selector. Default: ':input,button'</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableConnectWith</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Takes a jQuery selector with items that also have sortables applied. If used, the sortable is now connected to the other one-way, so you can drag from this sortable to the other. e.g. #myothersortable or .myothersortables</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableContainment</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Constrains dragging to within the bounds of the specified element - can be a DOM element, 'parent', 'document', 'window', or a jQuery selector.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableCursor</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Defines the cursor that is being shown while sorting.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableCursorAt</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Moves the sorting element or helper so the cursor always appears to drag from the same position. Coordinates can be given as a hash using a combination of one or two keys: top, left, right, bottom.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableDelay</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Time in milliseconds to define when the sorting should start. It helps preventing unwanted drags when clicking on an element.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableDistance</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Tolerance, in pixels, for when sorting should start. If specified, sorting will not start until after mouse is dragged beyond distance. Can be used to allow for clicks on elements within a handle.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableDropOnEmpty</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>If empty allows for an item to be dropped from a linked selectable. Default: true</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableForceHelperSize</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>If true, forces the helper to have a size. Default: false</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableForcePlaceholderSize</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>If true, forces the placeholder to have a size. Default: false</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableGrid</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Snaps the sorting element or helper to a grid, every x and y pixels. Array values: [x, y]</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableHandle</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Restricts sort start click to the specified element.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableHelper</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Allows for a helper element to be used for dragging display. The supplied function receives the event and the element being sorted, and should return a DOMElement to be used as a custom proxy helper. Possible values: 'original', 'clone'. Default: 'original'</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableItems</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Specifies which items inside the element should be sortable. Default: '> <b>'</td>
</blockquote></tr></b><tr>
<blockquote><td align='left' valign='top'>sortableOnActivateTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>This event is triggered when using connected lists, every connected list on drag start receives it.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableOnBeforeStopTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>This event is triggered when sorting stops, but when the placeholder/helper is still available.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableOnChangeTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>This event is triggered during sorting, but only when the DOM position has changed.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableOnDeactivateTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>This event is triggered when sorting was stopped, is propagated to all possible connected lists.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableOnOutTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>This event is triggered when a sortable item is moved away from a connected list.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableOnOverTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>This event is triggered when a sortable item is moved into a connected list.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableOnReceiveTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>This event is triggered when a connected sortable list has received an item from another list.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableOnRemoveTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>This event is triggered when a sortable item has been dragged out from the list and into another.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableOnSortTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>This event is triggered during sorting.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableOnStartTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>This event is triggered when sorting starts.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableOnStopTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>This event is triggered when sorting has stopped.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableOnUpdateTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>This event is triggered when the user stopped sorting and the DOM position has changed.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableOpacity</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Defines the opacity of the helper while sorting. From 0.01 to 1</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortablePlaceholder</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Class that gets applied to the otherwise white space.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableRevert</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>If set to true, the item will be reverted to its new DOM position with a smooth animation. Default: false</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableRows</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>Enable sortable rows</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableScroll</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>If set to true, the page scrolls when coming to an edge. Default: true</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableScrollSensitivity</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Defines how near the mouse must be to an edge to start scrolling. Default: 20</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableScrollSpeed</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>The speed at which the window should scroll once the mouse pointer gets within the scrollSensitivity distance. Default: 20</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableTolerance</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>This is the way the reordering behaves during drag. Possible values: 'intersect', 'pointer'. In some setups, 'pointer' is more natural. Default: 'intersect'</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortableZindex</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Z-index for element/helper while being sorted. Default: 1000</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortname</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>The initial sorting name. This parameter is added to the url. If set and the index (name) match the name from colModel then to this column by default is added a image sorting icon, according to the parameter sortorder (below).</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>sortorder</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>The initial sorting order.This parameter is added to the url - see prnNames. Two possible values - asc or desc. Default asc</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>subGridUrl</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>This option has effect only if subGrid option is set to true. This option points to the file from which we get the data for the subgrid. jqGrid adds the id of the row to this url as parameter.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>subGridWidth</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Determines the width of the subGrid column if subgrid is enabled.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>tabindex</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the html tabindex attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>targets</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma separated list of ids of container elements to load with the contents from the result of this request</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>template</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>The template (other than default) to use for rendering the element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>templateDir</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>The template directory.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>timeout</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>3000</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Integer</td>
<td align='left' valign='top'>jQuery options for timeout. Default is 3000</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>title</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the html title attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>tooltip</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the tooltip of this particular component</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>tooltipConfig</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Deprecated. Use individual tooltip configuration attributes instead.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>tooltipCssClass</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>StrutsTTClassic</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>CSS class applied to JavaScrip tooltips</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>tooltipDelay</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Classic</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Delay in milliseconds, before showing JavaScript tooltips </td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>tooltipIconPath</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Icon path used for image that will have the tooltip</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>toppager</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>When enabled this option place a pager element at top of the grid below the caption (if available).</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>userDataOnFooter</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>When set to true we directly place the user data array userData at footer. The rules are as follow: If the userData array contain name which is equal to those of colModel then the value is placed in that column.If there are no such values nothing is palced. Note that if this option is used we use the current formatter options (if available) for that column.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>value</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Preset the value of input element.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>viewrecords</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>Defines whether we want to display the number of total records from the query in the pager bar.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>viewsortcols</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>The purpose of this parameter is to define different look and behavior of sorting icons that appear near the header. This parameter is array with the following default options viewsortcols : [false,'vertical',true]. The first parameter determines if all icons should be viewed at the same time when all columns have sort property set to true. The default of false determines that only the icons of the current sorting column should be viewed. Setting this parameter to true causes all icons in all sortable columns to be viewed. The second parameter determines how icons should be placed - vertical means that the sorting icons are one under another. 'horizontal' means that the icons should be one near other. The third parameter determines the click functionality. If set to true the columns are sorted if the header is clicked. If set to false the columns are sorted only when the icons are clicked. Important note: When set a third parameter to false be a sure that the first parameter is set to true, otherwise you will loose the sorting.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>width</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>If this option is not set, the width of the grid is a sum of the widths of the columns defined in the colModel (in pixels). If this option is set, the initial width of each column is set according to the value of shrinkToFit option.</td>
</blockquote></tr>
</blockquote></blockquote><blockquote></table>