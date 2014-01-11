/**
 * jqGrid extension - Tree Grid
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 **/
(function (a) {
    a.jgrid.extend({setTreeNode: function (c, b) {
        return this.each(function () {
            var p = this;
            if (!p.grid || !p.p.treeGrid) {
                return
            }
            var j = p.p.expColInd, l = p.p.treeReader.expanded_field, s = p.p.treeReader.leaf_field, d = p.p.treeReader.level_field, r = p.p.treeReader.icon_field, n = p.p.treeReader.loaded, u, k, e, h, m, v, t, i;
            while (c < b) {
                var g = a.jgrid.stripPref(p.p.idPrefix, p.rows[c].id), f = p.p._index[g], q;
                t = p.p.data[f];
                if (p.p.treeGridModel === "nested") {
                    if (!t[s]) {
                        u = parseInt(t[p.p.treeReader.left_field], 10);
                        k = parseInt(t[p.p.treeReader.right_field], 10);
                        t[s] = (k === u + 1) ? "true" : "false";
                        p.rows[c].cells[p.p._treeleafpos].innerHTML = t[s]
                    }
                }
                e = parseInt(t[d], 10);
                if (p.p.tree_root_level === 0) {
                    h = e + 1;
                    m = e
                } else {
                    h = e;
                    m = e - 1
                }
                v = "<div class='tree-wrap tree-wrap-" + p.p.direction + "' style='width:" + (h * 18) + "px;'>";
                v += "<div style='" + (p.p.direction === "rtl" ? "right:" : "left:") + (m * 18) + "px;' class='ui-icon ";
                if (t[n] !== undefined) {
                    if (t[n] === "true" || t[n] === true) {
                        t[n] = true
                    } else {
                        t[n] = false
                    }
                }
                if (t[s] === "true" || t[s] === true) {
                    v += ((t[r] !== undefined && t[r] !== "") ? t[r] : p.p.treeIcons.leaf) + " tree-leaf treeclick";
                    t[s] = true;
                    i = "leaf"
                } else {
                    t[s] = false;
                    i = ""
                }
                t[l] = ((t[l] === "true" || t[l] === true) ? true : false) && (t[n] || t[n] === undefined);
                if (t[l] === false) {
                    v += ((t[s] === true) ? "'" : p.p.treeIcons.plus + " tree-plus treeclick'")
                } else {
                    v += ((t[s] === true) ? "'" : p.p.treeIcons.minus + " tree-minus treeclick'")
                }
                v += "></div></div>";
                a(p.rows[c].cells[j]).wrapInner("<span class='cell-wrapper" + i + "'></span>").prepend(v);
                if (e !== parseInt(p.p.tree_root_level, 10)) {
                    var o = a(p).jqGrid("getNodeParent", t);
                    q = o && o.hasOwnProperty(l) ? o[l] : true;
                    if (!q) {
                        a(p.rows[c]).css("display", "none")
                    }
                }
                a(p.rows[c].cells[j]).find("div.treeclick").bind("click", function (x) {
                    var w = x.target || x.srcElement, z = a.jgrid.stripPref(p.p.idPrefix, a(w, p.rows).closest("tr.jqgrow")[0].id), y = p.p._index[z];
                    if (!p.p.data[y][s]) {
                        if (p.p.data[y][l]) {
                            a(p).jqGrid("collapseRow", p.p.data[y]);
                            a(p).jqGrid("collapseNode", p.p.data[y])
                        } else {
                            a(p).jqGrid("expandRow", p.p.data[y]);
                            a(p).jqGrid("expandNode", p.p.data[y])
                        }
                    }
                    return false
                });
                if (p.p.ExpandColClick === true) {
                    a(p.rows[c].cells[j]).find("span.cell-wrapper").css("cursor", "pointer").bind("click", function (x) {
                        var w = x.target || x.srcElement, z = a.jgrid.stripPref(p.p.idPrefix, a(w, p.rows).closest("tr.jqgrow")[0].id), y = p.p._index[z];
                        if (!p.p.data[y][s]) {
                            if (p.p.data[y][l]) {
                                a(p).jqGrid("collapseRow", p.p.data[y]);
                                a(p).jqGrid("collapseNode", p.p.data[y])
                            } else {
                                a(p).jqGrid("expandRow", p.p.data[y]);
                                a(p).jqGrid("expandNode", p.p.data[y])
                            }
                        }
                        a(p).jqGrid("setSelection", z);
                        return false
                    })
                }
                c++
            }
        })
    }, setTreeGrid: function () {
        return this.each(function () {
            var j = this, f = 0, d, h = false, c, e, g, b = [];
            if (!j.p.treeGrid) {
                return
            }
            if (!j.p.treedatatype) {
                a.extend(j.p, {treedatatype: j.p.datatype})
            }
            j.p.subGrid = false;
            j.p.altRows = false;
            j.p.pgbuttons = false;
            j.p.pginput = false;
            j.p.gridview = true;
            if (j.p.rowTotal === null) {
                j.p.rowNum = 10000
            }
            j.p.multiselect = false;
            j.p.rowList = [];
            j.p.expColInd = 0;
            d = "ui-icon-triangle-1-" + (j.p.direction === "rtl" ? "w" : "e");
            j.p.treeIcons = a.extend({plus: d, minus: "ui-icon-triangle-1-s", leaf: "ui-icon-radio-off"}, j.p.treeIcons || {});
            if (j.p.treeGridModel === "nested") {
                j.p.treeReader = a.extend({level_field: "level", left_field: "lft", right_field: "rgt", leaf_field: "isLeaf", expanded_field: "expanded", loaded: "loaded", icon_field: "icon"}, j.p.treeReader)
            } else {
                if (j.p.treeGridModel === "adjacency") {
                    j.p.treeReader = a.extend({level_field: "level", parent_id_field: "parent", leaf_field: "isLeaf", expanded_field: "expanded", loaded: "loaded", icon_field: "icon"}, j.p.treeReader)
                }
            }
            for (e in j.p.colModel) {
                if (j.p.colModel.hasOwnProperty(e)) {
                    c = j.p.colModel[e].name;
                    if (c === j.p.ExpandColumn && !h) {
                        h = true;
                        j.p.expColInd = f
                    }
                    f++;
                    for (g in j.p.treeReader) {
                        if (j.p.treeReader.hasOwnProperty(g) && j.p.treeReader[g] === c) {
                            b.push(c)
                        }
                    }
                }
            }
            a.each(j.p.treeReader, function (i, k) {
                if (k && a.inArray(k, b) === -1) {
                    if (i === "leaf_field") {
                        j.p._treeleafpos = f
                    }
                    f++;
                    j.p.colNames.push(k);
                    j.p.colModel.push({name: k, width: 1, hidden: true, sortable: false, resizable: false, hidedlg: true, editable: true, search: false})
                }
            })
        })
    }, expandRow: function (b) {
        this.each(function () {
            var e = this;
            if (!e.grid || !e.p.treeGrid) {
                return
            }
            var d = a(e).jqGrid("getNodeChildren", b), c = e.p.treeReader.expanded_field;
            a(d).each(function () {
                var f = e.p.idPrefix + a.jgrid.getAccessor(this, e.p.localReader.id);
                a(a(e).jqGrid("getGridRowById", f)).css("display", "");
                if (this[c]) {
                    a(e).jqGrid("expandRow", this)
                }
            })
        })
    }, collapseRow: function (b) {
        this.each(function () {
            var e = this;
            if (!e.grid || !e.p.treeGrid) {
                return
            }
            var d = a(e).jqGrid("getNodeChildren", b), c = e.p.treeReader.expanded_field;
            a(d).each(function () {
                var f = e.p.idPrefix + a.jgrid.getAccessor(this, e.p.localReader.id);
                a(a(e).jqGrid("getGridRowById", f)).css("display", "none");
                if (this[c]) {
                    a(e).jqGrid("collapseRow", this)
                }
            })
        })
    }, getRootNodes: function () {
        var b = [];
        this.each(function () {
            var e = this;
            if (!e.grid || !e.p.treeGrid) {
                return
            }
            switch (e.p.treeGridModel) {
                case"nested":
                    var d = e.p.treeReader.level_field;
                    a(e.p.data).each(function () {
                        if (parseInt(this[d], 10) === parseInt(e.p.tree_root_level, 10)) {
                            b.push(this)
                        }
                    });
                    break;
                case"adjacency":
                    var c = e.p.treeReader.parent_id_field;
                    a(e.p.data).each(function () {
                        if (this[c] === null || String(this[c]).toLowerCase() === "null") {
                            b.push(this)
                        }
                    });
                    break
            }
        });
        return b
    }, getNodeDepth: function (c) {
        var b = null;
        this.each(function () {
            if (!this.grid || !this.p.treeGrid) {
                return
            }
            var e = this;
            switch (e.p.treeGridModel) {
                case"nested":
                    var d = e.p.treeReader.level_field;
                    b = parseInt(c[d], 10) - parseInt(e.p.tree_root_level, 10);
                    break;
                case"adjacency":
                    b = a(e).jqGrid("getNodeAncestors", c).length;
                    break
            }
        });
        return b
    }, getNodeParent: function (c) {
        var b = null;
        this.each(function () {
            var g = this;
            if (!g.grid || !g.p.treeGrid) {
                return
            }
            switch (g.p.treeGridModel) {
                case"nested":
                    var f = g.p.treeReader.left_field, l = g.p.treeReader.right_field, h = g.p.treeReader.level_field, k = parseInt(c[f], 10), j = parseInt(c[l], 10), d = parseInt(c[h], 10);
                    a(this.p.data).each(function () {
                        if (parseInt(this[h], 10) === d - 1 && parseInt(this[f], 10) < k && parseInt(this[l], 10) > j) {
                            b = this;
                            return false
                        }
                    });
                    break;
                case"adjacency":
                    var i = g.p.treeReader.parent_id_field, e = g.p.localReader.id;
                    a(this.p.data).each(function () {
                        if (this[e] === a.jgrid.stripPref(g.p.idPrefix, c[i])) {
                            b = this;
                            return false
                        }
                    });
                    break
            }
        });
        return b
    }, getNodeChildren: function (c) {
        var b = [];
        this.each(function () {
            var g = this;
            if (!g.grid || !g.p.treeGrid) {
                return
            }
            switch (g.p.treeGridModel) {
                case"nested":
                    var f = g.p.treeReader.left_field, l = g.p.treeReader.right_field, h = g.p.treeReader.level_field, k = parseInt(c[f], 10), j = parseInt(c[l], 10), d = parseInt(c[h], 10);
                    a(this.p.data).each(function () {
                        if (parseInt(this[h], 10) === d + 1 && parseInt(this[f], 10) > k && parseInt(this[l], 10) < j) {
                            b.push(this)
                        }
                    });
                    break;
                case"adjacency":
                    var i = g.p.treeReader.parent_id_field, e = g.p.localReader.id;
                    a(this.p.data).each(function () {
                        if (this[i] == a.jgrid.stripPref(g.p.idPrefix, c[e])) {
                            b.push(this)
                        }
                    });
                    break
            }
        });
        return b
    }, getFullTreeNode: function (c) {
        var b = [];
        this.each(function () {
            var g = this, h;
            if (!g.grid || !g.p.treeGrid) {
                return
            }
            switch (g.p.treeGridModel) {
                case"nested":
                    var f = g.p.treeReader.left_field, m = g.p.treeReader.right_field, i = g.p.treeReader.level_field, l = parseInt(c[f], 10), k = parseInt(c[m], 10), d = parseInt(c[i], 10);
                    a(this.p.data).each(function () {
                        if (parseInt(this[i], 10) >= d && parseInt(this[f], 10) >= l && parseInt(this[f], 10) <= k) {
                            b.push(this)
                        }
                    });
                    break;
                case"adjacency":
                    if (c) {
                        b.push(c);
                        var j = g.p.treeReader.parent_id_field, e = g.p.localReader.id;
                        a(this.p.data).each(function (n) {
                            h = b.length;
                            for (n = 0; n < h; n++) {
                                if (a.jgrid.stripPref(g.p.idPrefix, b[n][e]) === this[j]) {
                                    b.push(this);
                                    break
                                }
                            }
                        })
                    }
                    break
            }
        });
        return b
    }, getNodeAncestors: function (c) {
        var b = [];
        this.each(function () {
            if (!this.grid || !this.p.treeGrid) {
                return
            }
            var d = a(this).jqGrid("getNodeParent", c);
            while (d) {
                b.push(d);
                d = a(this).jqGrid("getNodeParent", d)
            }
        });
        return b
    }, isVisibleNode: function (c) {
        var b = true;
        this.each(function () {
            var f = this;
            if (!f.grid || !f.p.treeGrid) {
                return
            }
            var e = a(f).jqGrid("getNodeAncestors", c), d = f.p.treeReader.expanded_field;
            a(e).each(function () {
                b = b && this[d];
                if (!b) {
                    return false
                }
            })
        });
        return b
    }, isNodeLoaded: function (c) {
        var b;
        this.each(function () {
            var f = this;
            if (!f.grid || !f.p.treeGrid) {
                return
            }
            var d = f.p.treeReader.leaf_field, e = f.p.treeReader.loaded;
            if (c !== undefined) {
                if (c[e] !== undefined) {
                    b = c[e]
                } else {
                    if (c[d] || a(f).jqGrid("getNodeChildren", c).length > 0) {
                        b = true
                    } else {
                        b = false
                    }
                }
            } else {
                b = false
            }
        });
        return b
    }, expandNode: function (b) {
        return this.each(function () {
            if (!this.grid || !this.p.treeGrid) {
                return
            }
            var h = this.p.treeReader.expanded_field, i = this.p.treeReader.parent_id_field, f = this.p.treeReader.loaded, c = this.p.treeReader.level_field, k = this.p.treeReader.left_field, j = this.p.treeReader.right_field;
            if (!b[h]) {
                var d = a.jgrid.getAccessor(b, this.p.localReader.id);
                var e = a("#" + this.p.idPrefix + a.jgrid.jqID(d), this.grid.bDiv)[0];
                var g = this.p._index[d];
                if (a(this).jqGrid("isNodeLoaded", this.p.data[g])) {
                    b[h] = true;
                    a("div.treeclick", e).removeClass(this.p.treeIcons.plus + " tree-plus").addClass(this.p.treeIcons.minus + " tree-minus")
                } else {
                    if (!this.grid.hDiv.loading) {
                        b[h] = true;
                        a("div.treeclick", e).removeClass(this.p.treeIcons.plus + " tree-plus").addClass(this.p.treeIcons.minus + " tree-minus");
                        this.p.treeANode = e.rowIndex;
                        this.p.datatype = this.p.treedatatype;
                        if (this.p.treeGridModel === "nested") {
                            a(this).jqGrid("setGridParam", {postData: {nodeid: d, n_left: b[k], n_right: b[j], n_level: b[c]}})
                        } else {
                            a(this).jqGrid("setGridParam", {postData: {nodeid: d, parentid: b[i], n_level: b[c]}})
                        }
                        a(this).trigger("reloadGrid");
                        b[f] = true;
                        if (this.p.treeGridModel === "nested") {
                            a(this).jqGrid("setGridParam", {postData: {nodeid: "", n_left: "", n_right: "", n_level: ""}})
                        } else {
                            a(this).jqGrid("setGridParam", {postData: {nodeid: "", parentid: "", n_level: ""}})
                        }
                    }
                }
            }
        })
    }, collapseNode: function (b) {
        return this.each(function () {
            if (!this.grid || !this.p.treeGrid) {
                return
            }
            var d = this.p.treeReader.expanded_field;
            if (b[d]) {
                b[d] = false;
                var e = a.jgrid.getAccessor(b, this.p.localReader.id);
                var c = a("#" + this.p.idPrefix + a.jgrid.jqID(e), this.grid.bDiv)[0];
                a("div.treeclick", c).removeClass(this.p.treeIcons.minus + " tree-minus").addClass(this.p.treeIcons.plus + " tree-plus")
            }
        })
    }, SortTree: function (e, c, b, d) {
        return this.each(function () {
            if (!this.grid || !this.p.treeGrid) {
                return
            }
            var k, f, m, j = [], n = this, l, h, g = a(this).jqGrid("getRootNodes");
            l = a.jgrid.from(g);
            l.orderBy(e, c, b, d);
            h = l.select();
            for (k = 0, f = h.length; k < f; k++) {
                m = h[k];
                j.push(m);
                a(this).jqGrid("collectChildrenSortTree", j, m, e, c, b, d)
            }
            a.each(j, function (i) {
                var o = a.jgrid.getAccessor(this, n.p.localReader.id);
                a("#" + a.jgrid.jqID(n.p.id) + " tbody tr:eq(" + i + ")").after(a("tr#" + a.jgrid.jqID(o), n.grid.bDiv))
            });
            l = null;
            h = null;
            j = null
        })
    }, collectChildrenSortTree: function (b, f, g, d, c, e) {
        return this.each(function () {
            if (!this.grid || !this.p.treeGrid) {
                return
            }
            var k, h, n, l, m, j;
            l = a(this).jqGrid("getNodeChildren", f);
            m = a.jgrid.from(l);
            m.orderBy(g, d, c, e);
            j = m.select();
            for (k = 0, h = j.length; k < h; k++) {
                n = j[k];
                b.push(n);
                a(this).jqGrid("collectChildrenSortTree", b, n, g, d, c, e)
            }
        })
    }, setTreeRow: function (b, c) {
        var d = false;
        this.each(function () {
            var e = this;
            if (!e.grid || !e.p.treeGrid) {
                return
            }
            d = a(e).jqGrid("setRowData", b, c)
        });
        return d
    }, delTreeNode: function (b) {
        return this.each(function () {
            var h = this, n = h.p.localReader.id, j, g = h.p.treeReader.left_field, m = h.p.treeReader.right_field, d, e, k, l;
            if (!h.grid || !h.p.treeGrid) {
                return
            }
            var c = h.p._index[b];
            if (c !== undefined) {
                d = parseInt(h.p.data[c][m], 10);
                e = d - parseInt(h.p.data[c][g], 10) + 1;
                var f = a(h).jqGrid("getFullTreeNode", h.p.data[c]);
                if (f.length > 0) {
                    for (j = 0; j < f.length; j++) {
                        a(h).jqGrid("delRowData", f[j][n])
                    }
                }
                if (h.p.treeGridModel === "nested") {
                    k = a.jgrid.from(h.p.data).greater(g, d, {stype: "integer"}).select();
                    if (k.length) {
                        for (l in k) {
                            if (k.hasOwnProperty(l)) {
                                k[l][g] = parseInt(k[l][g], 10) - e
                            }
                        }
                    }
                    k = a.jgrid.from(h.p.data).greater(m, d, {stype: "integer"}).select();
                    if (k.length) {
                        for (l in k) {
                            if (k.hasOwnProperty(l)) {
                                k[l][m] = parseInt(k[l][m], 10) - e
                            }
                        }
                    }
                }
            }
        })
    }, addChildNode: function (g, n, z, k) {
        var t = this[0];
        if (z) {
            var o = t.p.treeReader.expanded_field, w = t.p.treeReader.leaf_field, b = t.p.treeReader.level_field, h = t.p.treeReader.parent_id_field, d = t.p.treeReader.left_field, x = t.p.treeReader.right_field, p = t.p.treeReader.loaded, c, y, j, m, r, s, q = 0, l = n, v, u;
            if (k === undefined) {
                k = false
            }
            if (g === undefined || g === null) {
                r = t.p.data.length - 1;
                if (r >= 0) {
                    while (r >= 0) {
                        q = Math.max(q, parseInt(t.p.data[r][t.p.localReader.id], 10));
                        r--
                    }
                }
                g = q + 1
            }
            var C = a(t).jqGrid("getInd", n);
            v = false;
            if (n === undefined || n === null || n === "") {
                n = null;
                l = null;
                c = "last";
                m = t.p.tree_root_level;
                r = t.p.data.length + 1
            } else {
                c = "after";
                y = t.p._index[n];
                j = t.p.data[y];
                n = j[t.p.localReader.id];
                m = parseInt(j[b], 10) + 1;
                var e = a(t).jqGrid("getFullTreeNode", j);
                if (e.length) {
                    r = e[e.length - 1][t.p.localReader.id];
                    l = r;
                    r = a(t).jqGrid("getInd", l) + 1
                } else {
                    r = a(t).jqGrid("getInd", n) + 1
                }
                if (j[w]) {
                    v = true;
                    j[o] = true;
                    a(t.rows[C]).find("span.cell-wrapperleaf").removeClass("cell-wrapperleaf").addClass("cell-wrapper").end().find("div.tree-leaf").removeClass(t.p.treeIcons.leaf + " tree-leaf").addClass(t.p.treeIcons.minus + " tree-minus");
                    t.p.data[y][w] = false;
                    j[p] = true
                }
            }
            s = r + 1;
            if (z[o] === undefined) {
                z[o] = false
            }
            if (z[p] === undefined) {
                z[p] = false
            }
            z[b] = m;
            if (z[w] === undefined) {
                z[w] = true
            }
            if (t.p.treeGridModel === "adjacency") {
                z[h] = n
            }
            if (t.p.treeGridModel === "nested") {
                var f, B, A;
                if (n !== null) {
                    u = parseInt(j[x], 10);
                    f = a.jgrid.from(t.p.data);
                    f = f.greaterOrEquals(x, u, {stype: "integer"});
                    B = f.select();
                    if (B.length) {
                        for (A in B) {
                            if (B.hasOwnProperty(A)) {
                                B[A][d] = B[A][d] > u ? parseInt(B[A][d], 10) + 2 : B[A][d];
                                B[A][x] = B[A][x] >= u ? parseInt(B[A][x], 10) + 2 : B[A][x]
                            }
                        }
                    }
                    z[d] = u;
                    z[x] = u + 1
                } else {
                    u = parseInt(a(t).jqGrid("getCol", x, false, "max"), 10);
                    B = a.jgrid.from(t.p.data).greater(d, u, {stype: "integer"}).select();
                    if (B.length) {
                        for (A in B) {
                            if (B.hasOwnProperty(A)) {
                                B[A][d] = parseInt(B[A][d], 10) + 2
                            }
                        }
                    }
                    B = a.jgrid.from(t.p.data).greater(x, u, {stype: "integer"}).select();
                    if (B.length) {
                        for (A in B) {
                            if (B.hasOwnProperty(A)) {
                                B[A][x] = parseInt(B[A][x], 10) + 2
                            }
                        }
                    }
                    z[d] = u + 1;
                    z[x] = u + 2
                }
            }
            if (n === null || a(t).jqGrid("isNodeLoaded", j) || v) {
                a(t).jqGrid("addRowData", g, z, c, l);
                a(t).jqGrid("setTreeNode", r, s)
            }
            if (j && !j[o] && k) {
                a(t.rows[C]).find("div.treeclick").click()
            }
        }
    }})
})(jQuery);
