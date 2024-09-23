/*
 Highcharts JS v5.0.12 (2017-05-24)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (v) { "object" === typeof module && module.exports ? module.exports = v : v(Highcharts) })(function (v) {
    (function (a) {
        function r(a, b) { this.init(a, b) } var t = a.CenteredSeriesMixin, w = a.each, p = a.extend, m = a.merge, f = a.splat; p(r.prototype, {
            coll: "pane", init: function (a, b) { this.chart = b; this.background = []; b.pane.push(this); this.setOptions(a) }, setOptions: function (a) { this.options = m(this.defaultOptions, this.chart.angular ? { background: {} } : void 0, a) }, render: function () {
                var a = this.options, b = this.options.background, d = this.chart.renderer;
                this.group || (this.group = d.g("pane-group").attr({ zIndex: a.zIndex || 0 }).add()); this.updateCenter(); if (b) for (b = f(b), a = Math.max(b.length, this.background.length || 0), d = 0; d < a; d++)b[d] && this.axis ? this.renderBackground(m(this.defaultBackgroundOptions, b[d]), d) : this.background[d] && (this.background[d] = this.background[d].destroy(), this.background.splice(d, 1))
            }, renderBackground: function (a, b) {
                var d = "animate"; this.background[b] || (this.background[b] = this.chart.renderer.path().add(this.group), d = "attr"); this.background[b][d]({
                    d: this.axis.getPlotBandPath(a.from,
                        a.to, a)
                }).attr({ fill: a.backgroundColor, stroke: a.borderColor, "stroke-width": a.borderWidth, "class": "highcharts-pane " + (a.className || "") })
            }, defaultOptions: { center: ["50%", "50%"], size: "85%", startAngle: 0 }, defaultBackgroundOptions: { shape: "circle", borderWidth: 1, borderColor: "#cccccc", backgroundColor: { linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, stops: [[0, "#ffffff"], [1, "#e6e6e6"]] }, from: -Number.MAX_VALUE, innerRadius: 0, to: Number.MAX_VALUE, outerRadius: "105%" }, updateCenter: function (a) {
                this.center = (a || this.axis || {}).center =
                    t.getCenter.call(this)
            }, update: function (a, b) { m(!0, this.options, a); this.setOptions(this.options); this.render(); w(this.chart.axes, function (d) { d.pane === this && (d.pane = null, d.update({}, b)) }, this) }
        }); a.Pane = r
    })(v); (function (a) {
        var r = a.each, t = a.extend, w = a.map, p = a.merge, m = a.noop, f = a.pick, h = a.pInt, b = a.wrap, d, e, k = a.Axis.prototype; a = a.Tick.prototype; d = { getOffset: m, redraw: function () { this.isDirty = !1 }, render: function () { this.isDirty = !1 }, setScale: m, setCategories: m, setTitle: m }; e = {
            defaultRadialGaugeOptions: {
                labels: {
                    align: "center",
                    x: 0, y: null
                }, minorGridLineWidth: 0, minorTickInterval: "auto", minorTickLength: 10, minorTickPosition: "inside", minorTickWidth: 1, tickLength: 10, tickPosition: "inside", tickWidth: 2, title: { rotation: 0 }, zIndex: 2
            }, defaultRadialXOptions: { gridLineWidth: 1, labels: { align: null, distance: 15, x: 0, y: null }, maxPadding: 0, minPadding: 0, showLastLabel: !1, tickLength: 0 }, defaultRadialYOptions: { gridLineInterpolation: "circle", labels: { align: "right", x: -3, y: -2 }, showLastLabel: !1, title: { x: 4, text: null, rotation: 90 } }, setOptions: function (c) {
                c =
                this.options = p(this.defaultOptions, this.defaultRadialOptions, c); c.plotBands || (c.plotBands = [])
            }, getOffset: function () { k.getOffset.call(this); this.chart.axisOffset[this.side] = 0 }, getLinePath: function (c, b) {
                c = this.center; var d = this.chart, g = f(b, c[2] / 2 - this.offset); this.isCircular || void 0 !== b ? b = this.chart.renderer.symbols.arc(this.left + c[0], this.top + c[1], g, g, { start: this.startAngleRad, end: this.endAngleRad, open: !0, innerR: 0 }) : (b = this.postTranslate(this.angleRad, g), b = ["M", c[0] + d.plotLeft, c[1] + d.plotTop, "L", b.x,
                    b.y]); return b
            }, setAxisTranslation: function () { k.setAxisTranslation.call(this); this.center && (this.transA = this.isCircular ? (this.endAngleRad - this.startAngleRad) / (this.max - this.min || 1) : this.center[2] / 2 / (this.max - this.min || 1), this.minPixelPadding = this.isXAxis ? this.transA * this.minPointOffset : 0) }, beforeSetTickPositions: function () {
                if (this.autoConnect = this.isCircular && void 0 === f(this.userMax, this.options.max) && this.endAngleRad - this.startAngleRad === 2 * Math.PI) this.max += this.categories && 1 || this.pointRange || this.closestPointRange ||
                    0
            }, setAxisSize: function () { k.setAxisSize.call(this); this.isRadial && (this.pane.updateCenter(this), this.isCircular && (this.sector = this.endAngleRad - this.startAngleRad), this.len = this.width = this.height = this.center[2] * f(this.sector, 1) / 2) }, getPosition: function (c, b) { return this.postTranslate(this.isCircular ? this.translate(c) : this.angleRad, f(this.isCircular ? b : this.translate(c), this.center[2] / 2) - this.offset) }, postTranslate: function (c, b) {
                var d = this.chart, g = this.center; c = this.startAngleRad + c; return {
                    x: d.plotLeft +
                        g[0] + Math.cos(c) * b, y: d.plotTop + g[1] + Math.sin(c) * b
                }
            }, getPlotBandPath: function (c, b, d) {
                var g = this.center, n = this.startAngleRad, a = g[2] / 2, e = [f(d.outerRadius, "100%"), d.innerRadius, f(d.thickness, 10)], k = Math.min(this.offset, 0), z = /%$/, m, p = this.isCircular; "polygon" === this.options.gridLineInterpolation ? g = this.getPlotLinePath(c).concat(this.getPlotLinePath(b, !0)) : (c = Math.max(c, this.min), b = Math.min(b, this.max), p || (e[0] = this.translate(c), e[1] = this.translate(b)), e = w(e, function (b) { z.test(b) && (b = h(b, 10) * a / 100); return b }),
                    "circle" !== d.shape && p ? (c = n + this.translate(c), b = n + this.translate(b)) : (c = -Math.PI / 2, b = 1.5 * Math.PI, m = !0), e[0] -= k, e[2] -= k, g = this.chart.renderer.symbols.arc(this.left + g[0], this.top + g[1], e[0], e[0], { start: Math.min(c, b), end: Math.max(c, b), innerR: f(e[1], e[0] - e[2]), open: m })); return g
            }, getPlotLinePath: function (b, d) {
                var c = this, g = c.center, e = c.chart, a = c.getPosition(b), k, h, f; c.isCircular ? f = ["M", g[0] + e.plotLeft, g[1] + e.plotTop, "L", a.x, a.y] : "circle" === c.options.gridLineInterpolation ? (b = c.translate(b)) && (f = c.getLinePath(0,
                    b)) : (r(e.xAxis, function (b) { b.pane === c.pane && (k = b) }), f = [], b = c.translate(b), g = k.tickPositions, k.autoConnect && (g = g.concat([g[0]])), d && (g = [].concat(g).reverse()), r(g, function (c, d) { h = k.getPosition(c, b); f.push(d ? "L" : "M", h.x, h.y) })); return f
            }, getTitlePosition: function () { var b = this.center, d = this.chart, e = this.options.title; return { x: d.plotLeft + b[0] + (e.x || 0), y: d.plotTop + b[1] - { high: .5, middle: .25, low: 0 }[e.align] * b[2] + (e.y || 0) } }
        }; b(k, "init", function (b, g, a) {
            var c = g.angular, n = g.polar, q = a.isX, k = c && q, h, m = g.options,
            r = this.pane = g.pane[a.pane || 0], y = r.options; if (c) { if (t(this, k ? d : e), h = !q) this.defaultRadialOptions = this.defaultRadialGaugeOptions } else n && (t(this, e), this.defaultRadialOptions = (h = q) ? this.defaultRadialXOptions : p(this.defaultYAxisOptions, this.defaultRadialYOptions)); c || n ? (this.isRadial = !0, g.inverted = !1, m.chart.zoomType = null) : this.isRadial = !1; h && (r.axis = this); b.call(this, g, a); k || !c && !n || (b = this.options, this.angleRad = (b.angle || 0) * Math.PI / 180, this.startAngleRad = (y.startAngle - 90) * Math.PI / 180, this.endAngleRad =
                (f(y.endAngle, y.startAngle + 360) - 90) * Math.PI / 180, this.offset = b.offset || 0, this.isCircular = h)
        }); b(k, "autoLabelAlign", function (b) { if (!this.isRadial) return b.apply(this, [].slice.call(arguments, 1)) }); b(a, "getPosition", function (b, d, e, a, l) { var c = this.axis; return c.getPosition ? c.getPosition(e) : b.call(this, d, e, a, l) }); b(a, "getLabelPosition", function (b, d, e, a, l, q, k, h, m) {
            var c = this.axis, g = q.y, n = 20, u = q.align, x = (c.translate(this.pos) + c.startAngleRad + Math.PI / 2) / Math.PI * 180 % 360; c.isRadial ? (b = c.getPosition(this.pos,
                c.center[2] / 2 + f(q.distance, -25)), "auto" === q.rotation ? a.attr({ rotation: x }) : null === g && (g = c.chart.renderer.fontMetrics(a.styles.fontSize).b - a.getBBox().height / 2), null === u && (c.isCircular ? (this.label.getBBox().width > c.len * c.tickInterval / (c.max - c.min) && (n = 0), u = x > n && x < 180 - n ? "left" : x > 180 + n && x < 360 - n ? "right" : "center") : u = "center", a.attr({ align: u })), b.x += q.x, b.y += g) : b = b.call(this, d, e, a, l, q, k, h, m); return b
        }); b(a, "getMarkPath", function (b, d, e, a, l, k, h) {
            var c = this.axis; c.isRadial ? (b = c.getPosition(this.pos, c.center[2] /
                2 + a), d = ["M", d, e, "L", b.x, b.y]) : d = b.call(this, d, e, a, l, k, h); return d
        })
    })(v); (function (a) {
        var r = a.each, t = a.noop, w = a.pick, p = a.Series, m = a.seriesType, f = a.seriesTypes; m("arearange", "area", { lineWidth: 1, marker: null, threshold: null, tooltip: { pointFormat: '\x3cspan style\x3d"color:{series.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e' }, trackByArea: !0, dataLabels: { align: null, verticalAlign: null, xLow: 0, xHigh: 0, yLow: 0, yHigh: 0 }, states: { hover: { halo: !1 } } },
            {
                pointArrayMap: ["low", "high"], dataLabelCollections: ["dataLabel", "dataLabelUpper"], toYData: function (a) { return [a.low, a.high] }, pointValKey: "low", deferTranslatePolar: !0, highToXY: function (a) { var b = this.chart, d = this.xAxis.postTranslate(a.rectPlotX, this.yAxis.len - a.plotHigh); a.plotHighX = d.x - b.plotLeft; a.plotHigh = d.y - b.plotTop }, translate: function () {
                    var a = this, b = a.yAxis, d = !!a.modifyValue; f.area.prototype.translate.apply(a); r(a.points, function (e) {
                        var k = e.low, c = e.high, g = e.plotY; null === c || null === k ? e.isNull = !0 :
                            (e.plotLow = g, e.plotHigh = b.translate(d ? a.modifyValue(c, e) : c, 0, 1, 0, 1), d && (e.yBottom = e.plotHigh))
                    }); this.chart.polar && r(this.points, function (b) { a.highToXY(b) })
                }, getGraphPath: function (a) {
                    var b = [], d = [], e, k = f.area.prototype.getGraphPath, c, g, n; n = this.options; var u = this.chart.polar && !1 !== n.connectEnds, l = n.connectNulls, q = n.step; a = a || this.points; for (e = a.length; e--;)c = a[e], c.isNull || u || l || a[e + 1] && !a[e + 1].isNull || d.push({ plotX: c.plotX, plotY: c.plotY, doCurve: !1 }), g = {
                        polarPlotY: c.polarPlotY, rectPlotX: c.rectPlotX,
                        yBottom: c.yBottom, plotX: w(c.plotHighX, c.plotX), plotY: c.plotHigh, isNull: c.isNull
                    }, d.push(g), b.push(g), c.isNull || u || l || a[e - 1] && !a[e - 1].isNull || d.push({ plotX: c.plotX, plotY: c.plotY, doCurve: !1 }); a = k.call(this, a); q && (!0 === q && (q = "left"), n.step = { left: "right", center: "center", right: "left" }[q]); b = k.call(this, b); d = k.call(this, d); n.step = q; n = [].concat(a, b); this.chart.polar || "M" !== d[0] || (d[0] = "L"); this.graphPath = n; this.areaPath = this.areaPath.concat(a, d); n.isArea = !0; n.xMap = a.xMap; this.areaPath.xMap = a.xMap; return n
                },
                drawDataLabels: function () {
                    var a = this.data, b = a.length, d, e = [], k = p.prototype, c = this.options.dataLabels, g = c.align, n = c.verticalAlign, u = c.inside, l, q, x = this.chart.inverted; if (c.enabled || this._hasPointLabels) {
                        for (d = b; d--;)if (l = a[d]) q = u ? l.plotHigh < l.plotLow : l.plotHigh > l.plotLow, l.y = l.high, l._plotY = l.plotY, l.plotY = l.plotHigh, e[d] = l.dataLabel, l.dataLabel = l.dataLabelUpper, l.below = q, x ? g || (c.align = q ? "right" : "left") : n || (c.verticalAlign = q ? "top" : "bottom"), c.x = c.xHigh, c.y = c.yHigh; k.drawDataLabels && k.drawDataLabels.apply(this,
                            arguments); for (d = b; d--;)if (l = a[d]) q = u ? l.plotHigh < l.plotLow : l.plotHigh > l.plotLow, l.dataLabelUpper = l.dataLabel, l.dataLabel = e[d], l.y = l.low, l.plotY = l._plotY, l.below = !q, x ? g || (c.align = q ? "left" : "right") : n || (c.verticalAlign = q ? "bottom" : "top"), c.x = c.xLow, c.y = c.yLow; k.drawDataLabels && k.drawDataLabels.apply(this, arguments)
                    } c.align = g; c.verticalAlign = n
                }, alignDataLabel: function () { f.column.prototype.alignDataLabel.apply(this, arguments) }, setStackedPoints: t, getSymbol: t, drawPoints: t
            })
    })(v); (function (a) {
        var r = a.seriesType;
        r("areasplinerange", "arearange", null, { getPointSpline: a.seriesTypes.spline.prototype.getPointSpline })
    })(v); (function (a) {
        var r = a.defaultPlotOptions, t = a.each, w = a.merge, p = a.noop, m = a.pick, f = a.seriesType, h = a.seriesTypes.column.prototype; f("columnrange", "arearange", w(r.column, r.arearange, { lineWidth: 1, pointRange: null }), {
            translate: function () {
                var b = this, d = b.yAxis, a = b.xAxis, k = a.startAngleRad, c, g = b.chart, n = b.xAxis.isRadial, u; h.translate.apply(b); t(b.points, function (e) {
                    var q = e.shapeArgs, l = b.options.minPointLength,
                    f, h; e.plotHigh = u = d.translate(e.high, 0, 1, 0, 1); e.plotLow = e.plotY; h = u; f = m(e.rectPlotY, e.plotY) - u; Math.abs(f) < l ? (l -= f, f += l, h -= l / 2) : 0 > f && (f *= -1, h -= f); n ? (c = e.barX + k, e.shapeType = "path", e.shapeArgs = { d: b.polarArc(h + f, h, c, c + e.pointWidth) }) : (q.height = f, q.y = h, e.tooltipPos = g.inverted ? [d.len + d.pos - g.plotLeft - h - f / 2, a.len + a.pos - g.plotTop - q.x - q.width / 2, f] : [a.left - g.plotLeft + q.x + q.width / 2, d.pos - g.plotTop + h + f / 2, f])
                })
            }, directTouch: !0, trackerGroups: ["group", "dataLabelsGroup"], drawGraph: p, crispCol: h.crispCol, drawPoints: h.drawPoints,
            drawTracker: h.drawTracker, getColumnMetrics: h.getColumnMetrics, animate: function () { return h.animate.apply(this, arguments) }, polarArc: function () { return h.polarArc.apply(this, arguments) }, pointAttribs: h.pointAttribs
        })
    })(v); (function (a) {
        var r = a.each, t = a.isNumber, w = a.merge, p = a.pick, m = a.pInt, f = a.Series, h = a.seriesType, b = a.TrackerMixin; h("gauge", "line", {
            dataLabels: { enabled: !0, defer: !1, y: 15, borderRadius: 3, crop: !1, verticalAlign: "top", zIndex: 2, borderWidth: 1, borderColor: "#cccccc" }, dial: {}, pivot: {}, tooltip: { headerFormat: "" },
            showInLegend: !1
        }, {
            angular: !0, directTouch: !0, drawGraph: a.noop, fixedBox: !0, forceDL: !0, noSharedTooltip: !0, trackerGroups: ["group", "dataLabelsGroup"], translate: function () {
                var b = this.yAxis, a = this.options, k = b.center; this.generatePoints(); r(this.points, function (c) {
                    var d = w(a.dial, c.dial), e = m(p(d.radius, 80)) * k[2] / 200, u = m(p(d.baseLength, 70)) * e / 100, l = m(p(d.rearLength, 10)) * e / 100, q = d.baseWidth || 3, f = d.topWidth || 1, h = a.overshoot, r = b.startAngleRad + b.translate(c.y, null, null, null, !0); t(h) ? (h = h / 180 * Math.PI, r = Math.max(b.startAngleRad -
                        h, Math.min(b.endAngleRad + h, r))) : !1 === a.wrap && (r = Math.max(b.startAngleRad, Math.min(b.endAngleRad, r))); r = 180 * r / Math.PI; c.shapeType = "path"; c.shapeArgs = { d: d.path || ["M", -l, -q / 2, "L", u, -q / 2, e, -f / 2, e, f / 2, u, q / 2, -l, q / 2, "z"], translateX: k[0], translateY: k[1], rotation: r }; c.plotX = k[0]; c.plotY = k[1]
                })
            }, drawPoints: function () {
                var b = this, a = b.yAxis.center, k = b.pivot, c = b.options, g = c.pivot, n = b.chart.renderer; r(b.points, function (a) {
                    var d = a.graphic, e = a.shapeArgs, g = e.d, k = w(c.dial, a.dial); d ? (d.animate(e), e.d = g) : (a.graphic = n[a.shapeType](e).attr({
                        rotation: e.rotation,
                        zIndex: 1
                    }).addClass("highcharts-dial").add(b.group), a.graphic.attr({ stroke: k.borderColor || "none", "stroke-width": k.borderWidth || 0, fill: k.backgroundColor || "#000000" }))
                }); k ? k.animate({ translateX: a[0], translateY: a[1] }) : (b.pivot = n.circle(0, 0, p(g.radius, 5)).attr({ zIndex: 2 }).addClass("highcharts-pivot").translate(a[0], a[1]).add(b.group), b.pivot.attr({ "stroke-width": g.borderWidth || 0, stroke: g.borderColor || "#cccccc", fill: g.backgroundColor || "#000000" }))
            }, animate: function (b) {
                var a = this; b || (r(a.points, function (b) {
                    var c =
                        b.graphic; c && (c.attr({ rotation: 180 * a.yAxis.startAngleRad / Math.PI }), c.animate({ rotation: b.shapeArgs.rotation }, a.options.animation))
                }), a.animate = null)
            }, render: function () { this.group = this.plotGroup("group", "series", this.visible ? "visible" : "hidden", this.options.zIndex, this.chart.seriesGroup); f.prototype.render.call(this); this.group.clip(this.chart.clipRect) }, setData: function (b, a) { f.prototype.setData.call(this, b, !1); this.processData(); this.generatePoints(); p(a, !0) && this.chart.redraw() }, drawTracker: b && b.drawTrackerPoint
        },
            { setState: function (b) { this.state = b } })
    })(v); (function (a) {
        var r = a.each, t = a.noop, w = a.pick, p = a.seriesType, m = a.seriesTypes; p("boxplot", "column", {
            threshold: null, tooltip: { pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eMaximum: {point.high}\x3cbr/\x3eUpper quartile: {point.q3}\x3cbr/\x3eMedian: {point.median}\x3cbr/\x3eLower quartile: {point.q1}\x3cbr/\x3eMinimum: {point.low}\x3cbr/\x3e' }, whiskerLength: "50%", fillColor: "#ffffff", lineWidth: 1,
            medianWidth: 2, states: { hover: { brightness: -.3 } }, whiskerWidth: 2
        }, {
            pointArrayMap: ["low", "q1", "median", "q3", "high"], toYData: function (a) { return [a.low, a.q1, a.median, a.q3, a.high] }, pointValKey: "high", pointAttribs: function (a) { var f = this.options, b = a && a.color || this.color; return { fill: a.fillColor || f.fillColor || b, stroke: f.lineColor || b, "stroke-width": f.lineWidth || 0 } }, drawDataLabels: t, translate: function () {
                var a = this.yAxis, h = this.pointArrayMap; m.column.prototype.translate.apply(this); r(this.points, function (b) {
                    r(h,
                        function (d) { null !== b[d] && (b[d + "Plot"] = a.translate(b[d], 0, 1, 0, 1)) })
                })
            }, drawPoints: function () {
                var a = this, h = a.options, b = a.chart.renderer, d, e, k, c, g, n, u = 0, l, q, m, p, z = !1 !== a.doQuartiles, t, y = a.options.whiskerLength; r(a.points, function (f) {
                    var x = f.graphic, r = x ? "animate" : "attr", J = f.shapeArgs, v = {}, C = {}, H = {}, I = f.color || a.color; void 0 !== f.plotY && (l = J.width, q = Math.floor(J.x), m = q + l, p = Math.round(l / 2), d = Math.floor(z ? f.q1Plot : f.lowPlot), e = Math.floor(z ? f.q3Plot : f.lowPlot), k = Math.floor(f.highPlot), c = Math.floor(f.lowPlot),
                        x || (f.graphic = x = b.g("point").add(a.group), f.stem = b.path().addClass("highcharts-boxplot-stem").add(x), y && (f.whiskers = b.path().addClass("highcharts-boxplot-whisker").add(x)), z && (f.box = b.path(void 0).addClass("highcharts-boxplot-box").add(x)), f.medianShape = b.path(void 0).addClass("highcharts-boxplot-median").add(x)), v.stroke = f.stemColor || h.stemColor || I, v["stroke-width"] = w(f.stemWidth, h.stemWidth, h.lineWidth), v.dashstyle = f.stemDashStyle || h.stemDashStyle, f.stem.attr(v), y && (C.stroke = f.whiskerColor || h.whiskerColor ||
                            I, C["stroke-width"] = w(f.whiskerWidth, h.whiskerWidth, h.lineWidth), f.whiskers.attr(C)), z && (x = a.pointAttribs(f), f.box.attr(x)), H.stroke = f.medianColor || h.medianColor || I, H["stroke-width"] = w(f.medianWidth, h.medianWidth, h.lineWidth), f.medianShape.attr(H), n = f.stem.strokeWidth() % 2 / 2, u = q + p + n, f.stem[r]({ d: ["M", u, e, "L", u, k, "M", u, d, "L", u, c] }), z && (n = f.box.strokeWidth() % 2 / 2, d = Math.floor(d) + n, e = Math.floor(e) + n, q += n, m += n, f.box[r]({ d: ["M", q, e, "L", q, d, "L", m, d, "L", m, e, "L", q, e, "z"] })), y && (n = f.whiskers.strokeWidth() % 2 /
                                2, k += n, c += n, t = /%$/.test(y) ? p * parseFloat(y) / 100 : y / 2, f.whiskers[r]({ d: ["M", u - t, k, "L", u + t, k, "M", u - t, c, "L", u + t, c] })), g = Math.round(f.medianPlot), n = f.medianShape.strokeWidth() % 2 / 2, g += n, f.medianShape[r]({ d: ["M", q, g, "L", m, g] }))
                })
            }, setStackedPoints: t
        })
    })(v); (function (a) {
        var r = a.each, t = a.noop, w = a.seriesType, p = a.seriesTypes; w("errorbar", "boxplot", {
            color: "#000000", grouping: !1, linkedTo: ":previous", tooltip: { pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e' },
            whiskerWidth: null
        }, { type: "errorbar", pointArrayMap: ["low", "high"], toYData: function (a) { return [a.low, a.high] }, pointValKey: "high", doQuartiles: !1, drawDataLabels: p.arearange ? function () { var a = this.pointValKey; p.arearange.prototype.drawDataLabels.call(this); r(this.data, function (f) { f.y = f[a] }) } : t, getColumnMetrics: function () { return this.linkedParent && this.linkedParent.columnMetrics || p.column.prototype.getColumnMetrics.call(this) } })
    })(v); (function (a) {
        var r = a.correctFloat, t = a.isNumber, w = a.pick, p = a.Point, m = a.Series,
        f = a.seriesType, h = a.seriesTypes; f("waterfall", "column", { dataLabels: { inside: !0 }, lineWidth: 1, lineColor: "#333333", dashStyle: "dot", borderColor: "#333333", states: { hover: { lineWidthPlus: 0 } } }, {
            pointValKey: "y", translate: function () {
                var b = this.options, a = this.yAxis, e, k, c, g, n, f, l, q, m, p, t = w(b.minPointLength, 5), v = t / 2, y = b.threshold, D = b.stacking, A; h.column.prototype.translate.apply(this); q = m = y; k = this.points; e = 0; for (b = k.length; e < b; e++)c = k[e], l = this.processedYData[e], g = c.shapeArgs, n = D && a.stacks[(this.negStacks && l < y ? "-" :
                    "") + this.stackKey], A = this.getStackIndicator(A, c.x, this.index), p = n ? n[c.x].points[A.key] : [0, l], c.isSum ? c.y = r(l) : c.isIntermediateSum && (c.y = r(l - m)), f = Math.max(q, q + c.y) + p[0], g.y = a.translate(f, 0, 1, 0, 1), c.isSum ? (g.y = a.translate(p[1], 0, 1, 0, 1), g.height = Math.min(a.translate(p[0], 0, 1, 0, 1), a.len) - g.y) : c.isIntermediateSum ? (g.y = a.translate(p[1], 0, 1, 0, 1), g.height = Math.min(a.translate(m, 0, 1, 0, 1), a.len) - g.y, m = p[1]) : (g.height = 0 < l ? a.translate(q, 0, 1, 0, 1) - g.y : a.translate(q, 0, 1, 0, 1) - a.translate(q - l, 0, 1, 0, 1), q += n && n[c.x] ?
                        n[c.x].total : l), 0 > g.height && (g.y += g.height, g.height *= -1), c.plotY = g.y = Math.round(g.y) - this.borderWidth % 2 / 2, g.height = Math.max(Math.round(g.height), .001), c.yBottom = g.y + g.height, g.height <= t && !c.isNull ? (g.height = t, g.y -= v, c.plotY = g.y, c.minPointLengthOffset = 0 > c.y ? -v : v) : c.minPointLengthOffset = 0, g = c.plotY + (c.negative ? g.height : 0), this.chart.inverted ? c.tooltipPos[0] = a.len - g : c.tooltipPos[1] = g
            }, processData: function (b) {
                var a = this.yData, e = this.options.data, k, c = a.length, g, n, f, l, q, h; n = g = f = l = this.options.threshold ||
                    0; for (h = 0; h < c; h++)q = a[h], k = e && e[h] ? e[h] : {}, "sum" === q || k.isSum ? a[h] = r(n) : "intermediateSum" === q || k.isIntermediateSum ? a[h] = r(g) : (n += q, g += q), f = Math.min(n, f), l = Math.max(n, l); m.prototype.processData.call(this, b); this.options.stacking || (this.dataMin = f, this.dataMax = l)
            }, toYData: function (b) { return b.isSum ? 0 === b.x ? null : "sum" : b.isIntermediateSum ? 0 === b.x ? null : "intermediateSum" : b.y }, pointAttribs: function (b, a) {
                var d = this.options.upColor; d && !b.options.color && (b.color = 0 < b.y ? d : null); b = h.column.prototype.pointAttribs.call(this,
                    b, a); delete b.dashstyle; return b
            }, getGraphPath: function () { return ["M", 0, 0] }, getCrispPath: function () { var b = this.data, a = b.length, e = this.graph.strokeWidth() + this.borderWidth, e = Math.round(e) % 2 / 2, f = this.yAxis.reversed, c = [], g, n, u; for (u = 1; u < a; u++) { n = b[u].shapeArgs; g = b[u - 1].shapeArgs; n = ["M", g.x + g.width, g.y + b[u - 1].minPointLengthOffset + e, "L", n.x, g.y + b[u - 1].minPointLengthOffset + e]; if (0 > b[u - 1].y && !f || 0 < b[u - 1].y && f) n[2] += g.height, n[5] += g.height; c = c.concat(n) } return c }, drawGraph: function () {
                m.prototype.drawGraph.call(this);
                this.graph.attr({ d: this.getCrispPath() })
            }, setStackedPoints: function () { var b = this.options, a, e; m.prototype.setStackedPoints.apply(this, arguments); a = this.stackedYData ? this.stackedYData.length : 0; for (e = 1; e < a; e++)b.data[e].isSum || b.data[e].isIntermediateSum || (this.stackedYData[e] += this.stackedYData[e - 1]) }, getExtremes: function () { if (this.options.stacking) return m.prototype.getExtremes.apply(this, arguments) }
        }, {
            getClassName: function () {
                var b = p.prototype.getClassName.call(this); this.isSum ? b += " highcharts-sum" :
                    this.isIntermediateSum && (b += " highcharts-intermediate-sum"); return b
            }, isValid: function () { return t(this.y, !0) || this.isSum || this.isIntermediateSum }
        })
    })(v); (function (a) {
        var r = a.Series, t = a.seriesType, v = a.seriesTypes; t("polygon", "scatter", { marker: { enabled: !1, states: { hover: { enabled: !1 } } }, stickyTracking: !1, tooltip: { followPointer: !0, pointFormat: "" }, trackByArea: !0 }, {
            type: "polygon", getGraphPath: function () {
                for (var a = r.prototype.getGraphPath.call(this), m = a.length + 1; m--;)(m === a.length || "M" === a[m]) && 0 < m && a.splice(m,
                    0, "z"); return this.areaPath = a
            }, drawGraph: function () { this.options.fillColor = this.color; v.area.prototype.drawGraph.call(this) }, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle, drawTracker: r.prototype.drawTracker, setStackedPoints: a.noop
        })
    })(v); (function (a) {
        var r = a.arrayMax, t = a.arrayMin, v = a.Axis, p = a.color, m = a.each, f = a.isNumber, h = a.noop, b = a.pick, d = a.pInt, e = a.Point, k = a.Series, c = a.seriesType, g = a.seriesTypes; c("bubble", "scatter", {
            dataLabels: { formatter: function () { return this.point.z }, inside: !0, verticalAlign: "middle" },
            marker: { lineColor: null, lineWidth: 1, radius: null, states: { hover: { radiusPlus: 0 } }, symbol: "circle" }, minSize: 8, maxSize: "20%", softThreshold: !1, states: { hover: { halo: { size: 5 } } }, tooltip: { pointFormat: "({point.x}, {point.y}), Size: {point.z}" }, turboThreshold: 0, zThreshold: 0, zoneAxis: "z"
        }, {
            pointArrayMap: ["y", "z"], parallelArrays: ["x", "y", "z"], trackerGroups: ["group", "dataLabelsGroup"], specialGroup: "group", bubblePadding: !0, zoneAxis: "z", directTouch: !0, pointAttribs: function (a, c) {
                var d = b(this.options.marker.fillOpacity,
                    .5); a = k.prototype.pointAttribs.call(this, a, c); 1 !== d && (a.fill = p(a.fill).setOpacity(d).get("rgba")); return a
            }, getRadii: function (b, a, c, d) { var g, e, f, n = this.zData, k = [], l = this.options, q = "width" !== l.sizeBy, h = l.zThreshold, m = a - b; e = 0; for (g = n.length; e < g; e++)f = n[e], l.sizeByAbsoluteValue && null !== f && (f = Math.abs(f - h), a = Math.max(a - h, Math.abs(b - h)), b = 0), null === f ? f = null : f < b ? f = c / 2 - 1 : (f = 0 < m ? (f - b) / m : .5, q && 0 <= f && (f = Math.sqrt(f)), f = Math.ceil(c + f * (d - c)) / 2), k.push(f); this.radii = k }, animate: function (b) {
                var a = this.options.animation;
                b || (m(this.points, function (b) { var c = b.graphic, d; c && c.width && (d = { x: c.x, y: c.y, width: c.width, height: c.height }, c.attr({ x: b.plotX, y: b.plotY, width: 1, height: 1 }), c.animate(d, a)) }), this.animate = null)
            }, translate: function () { var b, c = this.data, d, e, k = this.radii; g.scatter.prototype.translate.call(this); for (b = c.length; b--;)d = c[b], e = k ? k[b] : 0, f(e) && e >= this.minPxSize / 2 ? (d.marker = a.extend(d.marker, { radius: e, width: 2 * e, height: 2 * e }), d.dlBox = { x: d.plotX - e, y: d.plotY - e, width: 2 * e, height: 2 * e }) : d.shapeArgs = d.plotY = d.dlBox = void 0 },
            alignDataLabel: g.column.prototype.alignDataLabel, buildKDTree: h, applyZones: h
        }, { haloPath: function (b) { return e.prototype.haloPath.call(this, 0 === b ? 0 : (this.marker ? this.marker.radius || 0 : 0) + b) }, ttBelow: !1 }); v.prototype.beforePadding = function () {
            var a = this, c = this.len, e = this.chart, g = 0, k = c, h = this.isXAxis, p = h ? "xData" : "yData", v = this.min, w = {}, D = Math.min(e.plotWidth, e.plotHeight), A = Number.MAX_VALUE, E = -Number.MAX_VALUE, F = this.max - v, B = c / F, G = []; m(this.series, function (c) {
                var g = c.options; !c.bubblePadding || !c.visible &&
                    e.options.chart.ignoreHiddenSeries || (a.allowZoomOutside = !0, G.push(c), h && (m(["minSize", "maxSize"], function (b) { var a = g[b], c = /%$/.test(a), a = d(a); w[b] = c ? D * a / 100 : a }), c.minPxSize = w.minSize, c.maxPxSize = Math.max(w.maxSize, w.minSize), c = c.zData, c.length && (A = b(g.zMin, Math.min(A, Math.max(t(c), !1 === g.displayNegative ? g.zThreshold : -Number.MAX_VALUE))), E = b(g.zMax, Math.max(E, r(c))))))
            }); m(G, function (b) {
                var c = b[p], d = c.length, e; h && b.getRadii(A, E, b.minPxSize, b.maxPxSize); if (0 < F) for (; d--;)f(c[d]) && a.dataMin <= c[d] && c[d] <=
                    a.dataMax && (e = b.radii[d], g = Math.min((c[d] - v) * B - e, g), k = Math.max((c[d] - v) * B + e, k))
            }); G.length && 0 < F && !this.isLog && (k -= c, B *= (c + g - k) / c, m([["min", "userMin", g], ["max", "userMax", k]], function (c) { void 0 === b(a.options[c[0]], a[c[1]]) && (a[c[0]] += c[2] / B) }))
        }
    })(v); (function (a) {
        function r(b, a) {
            var d = this.chart, f = this.options.animation, c = this.group, g = this.markerGroup, n = this.xAxis.center, h = d.plotLeft, l = d.plotTop; d.polar ? d.renderer.isSVG && (!0 === f && (f = {}), a ? (b = { translateX: n[0] + h, translateY: n[1] + l, scaleX: .001, scaleY: .001 },
                c.attr(b), g && g.attr(b)) : (b = { translateX: h, translateY: l, scaleX: 1, scaleY: 1 }, c.animate(b, f), g && g.animate(b, f), this.animate = null)) : b.call(this, a)
        } var t = a.each, v = a.pick, p = a.seriesTypes, m = a.wrap, f = a.Series.prototype, h = a.Pointer.prototype; f.searchPointByAngle = function (b) { var a = this.chart, e = this.xAxis.pane.center; return this.searchKDTree({ clientX: 180 + -180 / Math.PI * Math.atan2(b.chartX - e[0] - a.plotLeft, b.chartY - e[1] - a.plotTop) }) }; f.getConnectors = function (b, a, e, f) {
            var c, d, k, h, l, m, p, r; d = f ? 1 : 0; c = 0 <= a && a <= b.length -
                1 ? a : 0 > a ? b.length - 1 + a : 0; a = 0 > c - 1 ? b.length - (1 + d) : c - 1; d = c + 1 > b.length - 1 ? d : c + 1; k = b[a]; d = b[d]; h = k.plotX; k = k.plotY; l = d.plotX; m = d.plotY; d = b[c].plotX; c = b[c].plotY; h = (1.5 * d + h) / 2.5; k = (1.5 * c + k) / 2.5; l = (1.5 * d + l) / 2.5; p = (1.5 * c + m) / 2.5; m = Math.sqrt(Math.pow(h - d, 2) + Math.pow(k - c, 2)); r = Math.sqrt(Math.pow(l - d, 2) + Math.pow(p - c, 2)); h = Math.atan2(k - c, h - d); p = Math.PI / 2 + (h + Math.atan2(p - c, l - d)) / 2; Math.abs(h - p) > Math.PI / 2 && (p -= Math.PI); h = d + Math.cos(p) * m; k = c + Math.sin(p) * m; l = d + Math.cos(Math.PI + p) * r; p = c + Math.sin(Math.PI + p) * r; d = {
                    rightContX: l,
                    rightContY: p, leftContX: h, leftContY: k, plotX: d, plotY: c
                }; e && (d.prevPointCont = this.getConnectors(b, a, !1, f)); return d
        }; m(f, "buildKDTree", function (b) { this.chart.polar && (this.kdByAngle ? this.searchPoint = this.searchPointByAngle : this.options.findNearestPointBy = "xy"); b.apply(this) }); f.toXY = function (b) {
            var a, e = this.chart, f = b.plotX; a = b.plotY; b.rectPlotX = f; b.rectPlotY = a; a = this.xAxis.postTranslate(b.plotX, this.yAxis.len - a); b.plotX = b.polarPlotX = a.x - e.plotLeft; b.plotY = b.polarPlotY = a.y - e.plotTop; this.kdByAngle ? (e =
                (f / Math.PI * 180 + this.xAxis.pane.options.startAngle) % 360, 0 > e && (e += 360), b.clientX = e) : b.clientX = b.plotX
        }; p.spline && (m(p.spline.prototype, "getPointSpline", function (a, d, e, f) { this.chart.polar ? f ? (a = this.getConnectors(d, f, !0, this.connectEnds), a = ["C", a.prevPointCont.rightContX, a.prevPointCont.rightContY, a.leftContX, a.leftContY, a.plotX, a.plotY]) : a = ["M", e.plotX, e.plotY] : a = a.call(this, d, e, f); return a }), p.areasplinerange && (p.areasplinerange.prototype.getPointSpline = p.spline.prototype.getPointSpline)); m(f, "translate",
            function (a) { var b = this.chart; a.call(this); if (b.polar && (this.kdByAngle = b.tooltip && b.tooltip.shared, !this.preventPostTranslate)) for (a = this.points, b = a.length; b--;)this.toXY(a[b]) }); m(f, "getGraphPath", function (a, d) {
                var b = this, f, c, g; if (this.chart.polar) { d = d || this.points; for (f = 0; f < d.length; f++)if (!d[f].isNull) { c = f; break } !1 !== this.options.connectEnds && void 0 !== c && (this.connectEnds = !0, d.splice(d.length, 0, d[c]), g = !0); t(d, function (a) { void 0 === a.polarPlotY && b.toXY(a) }) } f = a.apply(this, [].slice.call(arguments,
                    1)); g && d.pop(); return f
            }); m(f, "animate", r); p.column && (p = p.column.prototype, p.polarArc = function (a, d, e, f) { var b = this.xAxis.center, g = this.yAxis.len; return this.chart.renderer.symbols.arc(b[0], b[1], g - d, null, { start: e, end: f, innerR: g - v(a, g) }) }, m(p, "animate", r), m(p, "translate", function (a) {
                var b = this.xAxis, e = b.startAngleRad, f, c, g; this.preventPostTranslate = !0; a.call(this); if (b.isRadial) for (f = this.points, g = f.length; g--;)c = f[g], a = c.barX + e, c.shapeType = "path", c.shapeArgs = {
                    d: this.polarArc(c.yBottom, c.plotY, a, a +
                        c.pointWidth)
                }, this.toXY(c), c.tooltipPos = [c.plotX, c.plotY], c.ttBelow = c.plotY > b.center[1]
            }), m(p, "alignDataLabel", function (a, d, e, k, c, g) { this.chart.polar ? (a = d.rectPlotX / Math.PI * 180, null === k.align && (k.align = 20 < a && 160 > a ? "left" : 200 < a && 340 > a ? "right" : "center"), null === k.verticalAlign && (k.verticalAlign = 45 > a || 315 < a ? "bottom" : 135 < a && 225 > a ? "top" : "middle"), f.alignDataLabel.call(this, d, e, k, c, g)) : a.call(this, d, e, k, c, g) })); m(h, "getCoordinates", function (a, d) {
                var b = this.chart, f = { xAxis: [], yAxis: [] }; b.polar ? t(b.axes, function (a) {
                    var c =
                        a.isXAxis, e = a.center, h = d.chartX - e[0] - b.plotLeft, e = d.chartY - e[1] - b.plotTop; f[c ? "xAxis" : "yAxis"].push({ axis: a, value: a.translate(c ? Math.PI - Math.atan2(h, e) : Math.sqrt(Math.pow(h, 2) + Math.pow(e, 2)), !0) })
                }) : f = a.call(this, d); return f
            }); m(a.Chart.prototype, "getAxes", function (b) { this.pane || (this.pane = []); t(a.splat(this.options.pane), function (b) { new a.Pane(b, this) }, this); b.call(this) }); m(a.Chart.prototype, "drawChartBox", function (a) { a.call(this); t(this.pane, function (a) { a.render() }) }); m(a.Chart.prototype, "get",
                function (b, d) { return a.find(this.pane, function (a) { return a.options.id === d }) || b.call(this, d) })
    })(v)
});