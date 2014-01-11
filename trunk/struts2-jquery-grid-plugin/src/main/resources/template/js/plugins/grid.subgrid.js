/**
 * jqGrid extension for SubGrid Data
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 **/
(function (a) {
    a.jgrid.extend({setSubGrid: function () {
        return this.each(function () {
            var e = this, b, d, c = {plusicon: "ui-icon-plus", minusicon: "ui-icon-minus", openicon: "ui-icon-carat-1-sw", expandOnLoad: false, delayOnLoad: 50, selectOnExpand: false, selectOnCollapse: false, reloadOnExpand: true};
            e.p.subGridOptions = a.extend(c, e.p.subGridOptions || {});
            e.p.colNames.unshift("");
            e.p.colModel.unshift({name: "subgrid", width: a.jgrid.cell_width ? e.p.subGridWidth + e.p.cellLayout : e.p.subGridWidth, sortable: false, resizable: false, hidedlg: true, search: false, fixed: true});
            b = e.p.subGridModel;
            if (b[0]) {
                b[0].align = a.extend([], b[0].align || []);
                for (d = 0; d < b[0].name.length; d++) {
                    b[0].align[d] = b[0].align[d] || "left"
                }
            }
        })
    }, addSubGridCell: function (f, e) {
        var d = "", b, c;
        this.each(function () {
            d = this.formatCol(f, e);
            c = this.p.id;
            b = this.p.subGridOptions.plusicon
        });
        return'<td role="gridcell" aria-describedby="' + c + '_subgrid" class="ui-sgcollapsed sgcollapsed" ' + d + "><a style='cursor:pointer;'><span class='ui-icon " + b + "'></span></a></td>"
    }, addSubGrid: function (c, b) {
        return this.each(function () {
            var n = this;
            if (!n.grid) {
                return
            }
            var f = function (r, i, t) {
                var s = a("<td align='" + n.p.subGridModel[0].align[t] + "'></td>").html(i);
                a(r).append(s)
            };
            var e = function (s, y) {
                var x, v, u, w = a("<table cellspacing='0' cellpadding='0' border='0'><tbody></tbody></table>"), r = a("<tr></tr>");
                for (v = 0; v < n.p.subGridModel[0].name.length; v++) {
                    x = a("<th class='ui-state-default ui-th-subgrid ui-th-column ui-th-" + n.p.direction + "'></th>");
                    a(x).html(n.p.subGridModel[0].name[v]);
                    a(x).width(n.p.subGridModel[0].width[v]);
                    a(r).append(x)
                }
                a(w).append(r);
                if (s) {
                    u = n.p.xmlReader.subgrid;
                    a(u.root + " " + u.row, s).each(function () {
                        r = a("<tr class='ui-widget-content ui-subtblcell'></tr>");
                        if (u.repeatitems === true) {
                            a(u.cell, this).each(function (z) {
                                f(r, a(this).text() || "&#160;", z)
                            })
                        } else {
                            var i = n.p.subGridModel[0].mapping || n.p.subGridModel[0].name;
                            if (i) {
                                for (v = 0; v < i.length; v++) {
                                    f(r, a(i[v], this).text() || "&#160;", v)
                                }
                            }
                        }
                        a(w).append(r)
                    })
                }
                var t = a("table:first", n.grid.bDiv).attr("id") + "_";
                a("#" + a.jgrid.jqID(t + y)).append(w);
                n.grid.hDiv.loading = false;
                a("#load_" + a.jgrid.jqID(n.p.id)).hide();
                return false
            };
            var g = function (y, v) {
                var A, C, w, z, r, u, t = a("<table cellspacing='0' cellpadding='0' border='0'><tbody></tbody></table>"), s = a("<tr></tr>");
                for (w = 0; w < n.p.subGridModel[0].name.length; w++) {
                    A = a("<th class='ui-state-default ui-th-subgrid ui-th-column ui-th-" + n.p.direction + "'></th>");
                    a(A).html(n.p.subGridModel[0].name[w]);
                    a(A).width(n.p.subGridModel[0].width[w]);
                    a(s).append(A)
                }
                a(t).append(s);
                if (y) {
                    r = n.p.jsonReader.subgrid;
                    C = a.jgrid.getAccessor(y, r.root);
                    if (C !== undefined) {
                        for (w = 0; w < C.length; w++) {
                            z = C[w];
                            s = a("<tr class='ui-widget-content ui-subtblcell'></tr>");
                            if (r.repeatitems === true) {
                                if (r.cell) {
                                    z = z[r.cell]
                                }
                                for (u = 0; u < z.length; u++) {
                                    f(s, z[u] || "&#160;", u)
                                }
                            } else {
                                var x = n.p.subGridModel[0].mapping || n.p.subGridModel[0].name;
                                if (x.length) {
                                    for (u = 0; u < x.length; u++) {
                                        f(s, z[x[u]] || "&#160;", u)
                                    }
                                }
                            }
                            a(t).append(s)
                        }
                    }
                }
                var B = a("table:first", n.grid.bDiv).attr("id") + "_";
                a("#" + a.jgrid.jqID(B + v)).append(t);
                n.grid.hDiv.loading = false;
                a("#load_" + a.jgrid.jqID(n.p.id)).hide();
                return false
            };
            var o = function (u) {
                var r, v, t, s;
                r = a(u).attr("id");
                v = {nd_: (new Date().getTime())};
                v[n.p.prmNames.subgridid] = r;
                if (!n.p.subGridModel[0]) {
                    return false
                }
                if (n.p.subGridModel[0].params) {
                    for (s = 0; s < n.p.subGridModel[0].params.length; s++) {
                        for (t = 0; t < n.p.colModel.length; t++) {
                            if (n.p.colModel[t].name === n.p.subGridModel[0].params[s]) {
                                v[n.p.colModel[t].name] = a("td:eq(" + t + ")", u).text().replace(/\&#160\;/ig, "")
                            }
                        }
                    }
                }
                if (!n.grid.hDiv.loading) {
                    n.grid.hDiv.loading = true;
                    a("#load_" + a.jgrid.jqID(n.p.id)).show();
                    if (!n.p.subgridtype) {
                        n.p.subgridtype = n.p.datatype
                    }
                    if (a.isFunction(n.p.subgridtype)) {
                        n.p.subgridtype.call(n, v)
                    } else {
                        n.p.subgridtype = n.p.subgridtype.toLowerCase()
                    }
                    switch (n.p.subgridtype) {
                        case"xml":
                        case"json":
                            a.ajax(a.extend({type: n.p.mtype, url: n.p.subGridUrl, dataType: n.p.subgridtype, data: a.isFunction(n.p.serializeSubGridData) ? n.p.serializeSubGridData.call(n, v) : v, complete: function (i) {
                                if (n.p.subgridtype === "xml") {
                                    e(i.responseXML, r)
                                } else {
                                    g(a.jgrid.parse(i.responseText), r)
                                }
                                i = null
                            }}, a.jgrid.ajaxOptions, n.p.ajaxSubgridOptions || {}));
                            break
                    }
                }
                return false
            };
            var p, q, j, l = 0, h, d;
            a.each(n.p.colModel, function () {
                if (this.hidden === true || this.name === "rn" || this.name === "cb") {
                    l++
                }
            });
            var m = n.rows.length, k = 1;
            if (b !== undefined && b > 0) {
                k = b;
                m = b + 1
            }
            while (k < m) {
                if (a(n.rows[k]).hasClass("jqgrow")) {
                    a(n.rows[k].cells[c]).bind("click", function () {
                        var i = a(this).parent("tr")[0];
                        d = i.nextSibling;
                        if (a(this).hasClass("sgcollapsed")) {
                            q = n.p.id;
                            p = i.id;
                            if (n.p.subGridOptions.reloadOnExpand === true || (n.p.subGridOptions.reloadOnExpand === false && !a(d).hasClass("ui-subgrid"))) {
                                j = c >= 1 ? "<td colspan='" + c + "'>&#160;</td>" : "";
                                h = a(n).triggerHandler("jqGridSubGridBeforeExpand", [q + "_" + p, p]);
                                h = (h === false || h === "stop") ? false : true;
                                if (h && a.isFunction(n.p.subGridBeforeExpand)) {
                                    h = n.p.subGridBeforeExpand.call(n, q + "_" + p, p)
                                }
                                if (h === false) {
                                    return false
                                }
                                a(i).after("<tr role='row' class='ui-subgrid'>" + j + "<td class='ui-widget-content subgrid-cell'><span class='ui-icon " + n.p.subGridOptions.openicon + "'></span></td><td colspan='" + parseInt(n.p.colNames.length - 1 - l, 10) + "' class='ui-widget-content subgrid-data'><div id=" + q + "_" + p + " class='tablediv'></div></td></tr>");
                                a(n).triggerHandler("jqGridSubGridRowExpanded", [q + "_" + p, p]);
                                if (a.isFunction(n.p.subGridRowExpanded)) {
                                    n.p.subGridRowExpanded.call(n, q + "_" + p, p)
                                } else {
                                    o(i)
                                }
                            } else {
                                a(d).show()
                            }
                            a(this).html("<a style='cursor:pointer;'><span class='ui-icon " + n.p.subGridOptions.minusicon + "'></span></a>").removeClass("sgcollapsed").addClass("sgexpanded");
                            if (n.p.subGridOptions.selectOnExpand) {
                                a(n).jqGrid("setSelection", p)
                            }
                        } else {
                            if (a(this).hasClass("sgexpanded")) {
                                h = a(n).triggerHandler("jqGridSubGridRowColapsed", [q + "_" + p, p]);
                                h = (h === false || h === "stop") ? false : true;
                                p = i.id;
                                if (h && a.isFunction(n.p.subGridRowColapsed)) {
                                    h = n.p.subGridRowColapsed.call(n, q + "_" + p, p)
                                }
                                if (h === false) {
                                    return false
                                }
                                if (n.p.subGridOptions.reloadOnExpand === true) {
                                    a(d).remove(".ui-subgrid")
                                } else {
                                    if (a(d).hasClass("ui-subgrid")) {
                                        a(d).hide()
                                    }
                                }
                                a(this).html("<a style='cursor:pointer;'><span class='ui-icon " + n.p.subGridOptions.plusicon + "'></span></a>").removeClass("sgexpanded").addClass("sgcollapsed");
                                if (n.p.subGridOptions.selectOnCollapse) {
                                    a(n).jqGrid("setSelection", p)
                                }
                            }
                        }
                        return false
                    })
                }
                k++
            }
            if (n.p.subGridOptions.expandOnLoad === true) {
                a(n.rows).filter(".jqgrow").each(function (i, r) {
                    a(r.cells[0]).click()
                })
            }
            n.subGridXml = function (r, i) {
                e(r, i)
            };
            n.subGridJson = function (r, i) {
                g(r, i)
            }
        })
    }, expandSubGridRow: function (b) {
        return this.each(function () {
            var e = this;
            if (!e.grid && !b) {
                return
            }
            if (e.p.subGrid === true) {
                var c = a(this).jqGrid("getInd", b, true);
                if (c) {
                    var d = a("td.sgcollapsed", c)[0];
                    if (d) {
                        a(d).trigger("click")
                    }
                }
            }
        })
    }, collapseSubGridRow: function (b) {
        return this.each(function () {
            var e = this;
            if (!e.grid && !b) {
                return
            }
            if (e.p.subGrid === true) {
                var c = a(this).jqGrid("getInd", b, true);
                if (c) {
                    var d = a("td.sgexpanded", c)[0];
                    if (d) {
                        a(d).trigger("click")
                    }
                }
            }
        })
    }, toggleSubGridRow: function (b) {
        return this.each(function () {
            var e = this;
            if (!e.grid && !b) {
                return
            }
            if (e.p.subGrid === true) {
                var c = a(this).jqGrid("getInd", b, true);
                if (c) {
                    var d = a("td.sgcollapsed", c)[0];
                    if (d) {
                        a(d).trigger("click")
                    } else {
                        d = a("td.sgexpanded", c)[0];
                        if (d) {
                            a(d).trigger("click")
                        }
                    }
                }
            }
        })
    }})
})(jQuery);
