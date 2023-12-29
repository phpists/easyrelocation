!(function (b) {
  function a(d, c) {
    return this instanceof a
      ? (b.isPlainObject(d) ? (c = d) : ((c = c || {}).alias = d),
        (this.el = void 0),
        (this.opts = b.extend(!0, {}, this.defaults, c)),
        (this.noMasksCache = c && void 0 !== c.definitions),
        (this.userOptions = c || {}),
        (this.events = {}),
        (this.dataAttribute = "data-inputmask"),
        void e(this.opts.alias, c, this.opts))
      : new a(d, c);
  }

  function e(d, f, a) {
    var c = a.aliases[d];
    return c
      ? (c.alias && e(c.alias, void 0, a),
        b.extend(!0, a, c),
        b.extend(!0, a, f),
        !0)
      : (null === a.mask && (a.mask = d), !1);
  }

  function f(c, g) {
    function d(d, f, c) {
      if (null !== d && "" !== d) {
        if (
          (1 === d.length &&
            !1 === c.greedy &&
            0 !== c.repeat &&
            (c.placeholder = ""),
          c.repeat > 0 || "*" === c.repeat || "+" === c.repeat)
        ) {
          var e,
            h = "*" === c.repeat ? 0 : "+" === c.repeat ? 1 : c.repeat;
          d =
            c.groupmarker.start +
            d +
            c.groupmarker.end +
            c.quantifiermarker.start +
            h +
            "," +
            c.repeat +
            c.quantifiermarker.end;
        }
        return (
          void 0 === a.prototype.masksCache[d] || !0 === g
            ? ((e = {
                mask: d,
                maskToken: a.analyseMask(d, c),
                validPositions: {},
                _buffer: void 0,
                buffer: void 0,
                tests: {},
                metadata: f,
                maskLength: void 0,
              }),
              !0 !== g &&
                ((a.prototype.masksCache[
                  c.numericInput ? d.split("").reverse().join("") : d
                ] = e),
                (e = b.extend(
                  !0,
                  {},
                  a.prototype.masksCache[
                    c.numericInput ? d.split("").reverse().join("") : d
                  ]
                ))))
            : (e = b.extend(
                !0,
                {},
                a.prototype.masksCache[
                  c.numericInput ? d.split("").reverse().join("") : d
                ]
              )),
          e
        );
      }
    }

    if ((b.isFunction(c.mask) && (c.mask = c.mask(c)), b.isArray(c.mask))) {
      if (c.mask.length > 1) {
        c.keepStatic = null === c.keepStatic || c.keepStatic;
        var e,
          f = c.groupmarker.start;
        return (
          b.each(c.numericInput ? c.mask.reverse() : c.mask, function (d, a) {
            f.length > 1 &&
              (f +=
                c.groupmarker.end + c.alternatormarker + c.groupmarker.start),
              (f += void 0 === a.mask || b.isFunction(a.mask) ? a : a.mask);
          }),
          d((f += c.groupmarker.end), c.mask, c)
        );
      }
      c.mask = c.mask.pop();
    }
    return (
      c.mask &&
        (e = d(
          void 0 === c.mask.mask || b.isFunction(c.mask.mask)
            ? c.mask
            : c.mask.mask,
          c.mask,
          c
        )),
      e
    );
  }

  function g(f, l, e) {
    function C(i, g, j) {
      g = g || 0;
      var h,
        b,
        f,
        d = [],
        a = 0,
        k = v();
      -1 === (an = void 0 !== c ? c.maxLength : void 0) && (an = void 0);
      do
        !0 === i && l.validPositions[a]
          ? ((b = (f = l.validPositions[a]).match),
            (h = f.locator.slice()),
            d.push(!0 === j ? f.input : T(a, b)))
          : ((b = (f = G(a, h, a - 1)).match),
            (h = f.locator.slice()),
            (!1 === e.jitMasking ||
              a < k ||
              (Number.isFinite(e.jitMasking) && e.jitMasking > a)) &&
              d.push(T(a, b))),
          a++;
      while (
        ((void 0 === an || a < an) && (null !== b.fn || "" !== b.def)) ||
        g > a
      );
      return "" === d[d.length - 1] && d.pop(), (l.maskLength = a + 1), d;
    }

    function D(b) {
      var a = l;
      (a.buffer = void 0),
        !0 !== b && ((a._buffer = void 0), (a.validPositions = {}), (a.p = 0));
    }

    function v(a, f, g) {
      var c = -1,
        d = -1,
        e = g || l.validPositions;
      for (var h in (void 0 === a && (a = -1), e)) {
        var b = parseInt(h);
        e[b] &&
          (f || null !== e[b].match.fn) &&
          (b <= a && (c = b), b >= a && (d = b));
      }
      return (-1 !== c && a - c > 1) || d < a ? c : d;
    }

    function E(g, i, j, k) {
      function m(a) {
        var b = l.validPositions[a];
        if (void 0 !== b && null === b.match.fn) {
          var c = l.validPositions[a - 1],
            d = l.validPositions[a + 1];
          return void 0 !== c && void 0 !== d;
        }
        return !1;
      }

      var a,
        c = g,
        f = b.extend(!0, {}, l.validPositions),
        h = !1;
      for (l.p = g, a = i - 1; a >= c; a--)
        void 0 !== l.validPositions[a] &&
          ((!0 !== j &&
            ((!l.validPositions[a].match.optionality && m(a)) ||
              !1 === e.canClearPosition(l, a, v(), k, e))) ||
            delete l.validPositions[a]);
      for (D(!0), a = c + 1; a <= v(); ) {
        for (; void 0 !== l.validPositions[c]; ) c++;
        var n = l.validPositions[c];
        if (
          (a < c && (a = c + 1),
          (void 0 === l.validPositions[a] && x(a)) || void 0 !== n)
        )
          a++;
        else {
          var d = G(a);
          !1 === h && f[c] && f[c].match.def === d.match.def
            ? ((l.validPositions[c] = b.extend(!0, {}, f[c])),
              (l.validPositions[c].input = d.input),
              delete l.validPositions[a],
              a++)
            : I(c, d.match.def)
            ? !1 !== O(c, d.input || T(a), !0) &&
              (delete l.validPositions[a], a++, (h = !0))
            : x(a) || (a++, c--),
            c++;
        }
      }
      D(!0);
    }

    function F(f, g) {
      for (
        var a,
          d = f,
          h = v(),
          b = l.validPositions[h] || K(0)[0],
          i =
            void 0 !== b.alternation
              ? b.locator[b.alternation].toString().split(",")
              : [],
          c = 0;
        c < d.length &&
        (!(
          (a = d[c]).match &&
          ((e.greedy && !0 !== a.match.optionalQuantifier) ||
            ((!1 === a.match.optionality || !1 === a.match.newBlockMarker) &&
              !0 !== a.match.optionalQuantifier)) &&
          (void 0 === b.alternation ||
            b.alternation !== a.alternation ||
            (void 0 !== a.locator[b.alternation] &&
              N(a.locator[b.alternation].toString().split(","), i)))
        ) ||
          (!0 === g &&
            (null !== a.match.fn || /[0-9a-bA-Z]/.test(a.match.def))));
        c++
      );
      return a;
    }

    function G(b, a, c) {
      return l.validPositions[b] || F(K(b, a ? a.slice() : a, c));
    }

    function H(a) {
      return l.validPositions[a] ? l.validPositions[a] : K(a)[0];
    }

    function I(d, e) {
      for (var c = !1, b = K(d), a = 0; a < b.length; a++)
        if (b[a].match && b[a].match.def === e) {
          c = !0;
          break;
        }
      return c;
    }

    function J(a, d) {
      var c, e;
      return (
        (l.tests[a] || l.validPositions[a]) &&
          b.each(l.tests[a] || [l.validPositions[a]], function (f, a) {
            var b = a.alternation
              ? a.locator[a.alternation].toString().indexOf(d)
              : -1;
            (void 0 === e || b < e) && -1 !== b && ((c = a), (e = b));
          }),
        c
      );
    }

    function K(a, d, q) {
      function r(d, f, i, j) {
        function m(c, j, u) {
          function E(d, a) {
            var c = 0 === b.inArray(d, a.matches);
            return (
              c ||
                b.each(a.matches, function (b, e) {
                  if (!0 === e.isQuantifier && (c = E(d, a.matches[b - 1])))
                    return !1;
                }),
              c
            );
          }

          function H(b, c) {
            var a = J(b, c);
            return a ? a.locator.slice(a.alternation + 1) : void 0;
          }

          function I(b, c) {
            return (
              null === b.match.fn &&
              null !== c.match.fn &&
              c.match.fn.test(b.match.def, l, a, !1, e, !1)
            );
          }

          if (k > 1e4)
            throw (
              "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " +
              l.mask
            );
          if (k === a && void 0 === c.matches)
            return g.push({ match: c, locator: j.reverse(), cd: n }), !0;
          if (void 0 !== c.matches) {
            if (c.isGroup && u !== c) {
              if ((c = m(d.matches[b.inArray(c, d.matches) + 1], j))) return !0;
            } else if (c.isOptional) {
              var K = c;
              if ((c = r(c, f, j, u))) {
                if (!E((t = g[g.length - 1].match), K)) return !0;
                (s = !0), (k = a);
              }
            } else if (c.isAlternator) {
              var A,
                x = c,
                y = [],
                L = g.slice(),
                M = j.length,
                p = f.length > 0 ? f.shift() : -1;
              if (-1 === p || "string" == typeof p) {
                var o,
                  N = k,
                  F = f.slice(),
                  q = [];
                if ("string" == typeof p) q = p.split(",");
                else for (o = 0; o < x.matches.length; o++) q.push(o);
                for (var B = 0; B < q.length; B++) {
                  if (
                    ((o = parseInt(q[B])),
                    (g = []),
                    (f = H(k, o) || F.slice()),
                    !0 !==
                      (c =
                        m(x.matches[o] || d.matches[o], [o].concat(j), u) ||
                        c) &&
                      void 0 !== c &&
                      q[q.length - 1] < x.matches.length)
                  ) {
                    var z = b.inArray(c, d.matches) + 1;
                    d.matches.length > z &&
                      (c = m(
                        d.matches[z],
                        [z].concat(j.slice(1, j.length)),
                        u
                      )) &&
                      (q.push(z.toString()),
                      b.each(g, function (b, a) {
                        a.alternation = j.length - 1;
                      }));
                  }
                  (A = g.slice()), (k = N), (g = []);
                  for (var C = 0; C < A.length; C++) {
                    var h = A[C],
                      G = !1;
                    h.alternation = h.alternation || M;
                    for (var _ = 0; _ < y.length; _++) {
                      var i = y[_];
                      if (
                        ("string" != typeof p ||
                          -1 !==
                            b.inArray(
                              h.locator[h.alternation].toString(),
                              q
                            )) &&
                        (h.match.def === i.match.def || I(h, i))
                      ) {
                        (G = h.match.nativeDef === i.match.nativeDef),
                          h.alternation == i.alternation &&
                            -1 ===
                              i.locator[i.alternation]
                                .toString()
                                .indexOf(h.locator[h.alternation]) &&
                            ((i.locator[i.alternation] =
                              i.locator[i.alternation] +
                              "," +
                              h.locator[h.alternation]),
                            (i.alternation = h.alternation),
                            null == h.match.fn &&
                              ((i.na =
                                i.na || h.locator[h.alternation].toString()),
                              -1 === i.na.indexOf(h.locator[h.alternation]) &&
                                (i.na =
                                  i.na + "," + h.locator[h.alternation])));
                        break;
                      }
                    }
                    G || y.push(h);
                  }
                }
                (g = L.concat(y)), (k = a), (s = g.length > 0), (f = F.slice());
              } else c = m(x.matches[p] || d.matches[p], [p].concat(j), u);
              if (c) return !0;
            } else if (
              c.isQuantifier &&
              u !== d.matches[b.inArray(c, d.matches) - 1]
            )
              for (
                var w = c, v = f.length > 0 ? f.shift() : 0;
                v < (isNaN(w.quantifier.max) ? v + 1 : w.quantifier.max) &&
                k <= a;
                v++
              ) {
                var D = d.matches[b.inArray(w, d.matches) - 1];
                if ((c = m(D, [v].concat(j), D))) {
                  if (
                    (((t = g[g.length - 1].match).optionalQuantifier =
                      v > w.quantifier.min - 1),
                    E(t, D) && v > w.quantifier.min - 1)
                  ) {
                    (s = !0), (k = a);
                    break;
                  }
                  return !0;
                }
              }
            else if ((c = r(c, f, j, u))) return !0;
          } else k++;
        }

        for (var c = f.length > 0 ? f.shift() : 0; c < d.matches.length; c++)
          if (!0 !== d.matches[c].isQuantifier) {
            var h = m(d.matches[c], [c].concat(i), j);
            if (h && k === a) return h;
            if (k > a) break;
          }
      }

      function j(b) {
        return e.keepStatic &&
          a > 0 &&
          b.length > 1 + ("" === b[b.length - 1].match.def ? 1 : 0) &&
          !0 !== b[0].match.optionality &&
          !0 !== b[0].match.optionalQuantifier &&
          null === b[0].match.fn &&
          !/[0-9a-bA-Z]/.test(b[0].match.def)
          ? [F(b)]
          : b;
      }

      var t,
        p = l.maskToken,
        k = d ? q : 0,
        m = d ? d.slice() : [0],
        g = [],
        s = !1,
        n = d ? d.join("") : "";
      if (a > -1) {
        if (void 0 === d) {
          for (
            var c, h, o, f = a - 1;
            void 0 === (o = l.validPositions[f] || l.tests[f]) && f > -1;

          )
            f--;
          void 0 !== o &&
            f > -1 &&
            ((n = (m =
              ((c = o),
              (h = []),
              b.isArray(c) || (c = [c]),
              c.length > 0 &&
                (void 0 === c[0].alternation
                  ? 0 === (h = F(c.slice()).locator.slice()).length &&
                    (h = c[0].locator.slice())
                  : b.each(c, function (c, b) {
                      if ("" !== b.def) {
                        if (0 === h.length) h = b.locator.slice();
                        else
                          for (var a = 0; a < h.length; a++)
                            b.locator[a] &&
                              -1 === h[a].toString().indexOf(b.locator[a]) &&
                              (h[a] += "," + b.locator[a]);
                      }
                    })),
              h)).join("")),
            (k = f));
        }
        if (l.tests[a] && l.tests[a][0].cd === n) return j(l.tests[a]);
        for (
          var i = m.shift();
          i < p.length && (!r(p[i], m, [i]) || k !== a) && !(k > a);
          i++
        );
      }
      return (
        (0 === g.length || s) &&
          g.push({
            match: {
              fn: null,
              cardinality: 0,
              optionality: !0,
              casing: null,
              def: "",
              placeholder: "",
            },
            locator: [],
            cd: n,
          }),
        void 0 !== d && l.tests[a]
          ? j(b.extend(!0, [], g))
          : ((l.tests[a] = b.extend(!0, [], g)), j(l.tests[a]))
      );
    }

    function w() {
      return (
        void 0 === l._buffer &&
          ((l._buffer = C(!1, 1)), void 0 === l.buffer && l._buffer.slice()),
        l._buffer
      );
    }

    function m(a) {
      return (
        (void 0 !== l.buffer && !0 !== a) || (l.buffer = C(!0, v(), !0)),
        l.buffer
      );
    }

    function L(b, c, d) {
      var a;
      if (!0 === b) D(), (b = 0), (c = d.length);
      else for (a = b; a < c; a++) delete l.validPositions[a];
      for (a = b; a < c; a++)
        D(!0), d[a] !== e.skipOptionalPartCharacter && O(a, d[a], !0, !0);
    }

    function M(b, f, c) {
      switch (e.casing || f.casing) {
        case "upper":
          b = b.toUpperCase();
          break;
        case "lower":
          b = b.toLowerCase();
          break;
        case "title":
          var d = l.validPositions[c - 1];
          b =
            0 === c || (d && d.input === String.fromCharCode(a.keyCode.SPACE))
              ? b.toUpperCase()
              : b.toLowerCase();
      }
      return b;
    }

    function N(c, d) {
      for (
        var g = e.greedy ? d : d.slice(0, 1), f = !1, a = 0;
        a < c.length;
        a++
      )
        if (-1 !== b.inArray(c[a], g)) {
          f = !0;
          break;
        }
      return f;
    }

    function O(g, h, f, p, r) {
      function q(a) {
        var b = n
          ? a.begin - a.end > 1 || (a.begin - a.end == 1 && e.insertMode)
          : a.end - a.begin > 1 || (a.end - a.begin == 1 && e.insertMode);
        return b && 0 === a.begin && a.end === l.maskLength ? "full" : b;
      }

      function k(a, d, f) {
        var c = !1;
        return (
          b.each(K(a), function (s, r) {
            for (
              var h = r.match, t = d ? 1 : 0, n = "", o = h.cardinality;
              o > t;
              o--
            )
              n += R(a - (o - 1));
            if (
              (d && (n += d),
              m(!0),
              !1 !==
                (c =
                  null != h.fn
                    ? h.fn.test(n, l, a, f, e, q(g))
                    : (d === h.def || d === e.skipOptionalPartCharacter) &&
                      "" !== h.def && {
                        c: h.placeholder || h.def,
                        pos: a,
                      }))
            ) {
              var j = void 0 !== c.c ? c.c : d;
              j =
                j === e.skipOptionalPartCharacter && null === h.fn
                  ? h.placeholder || h.def
                  : j;
              var i = a,
                u = m();
              if (
                (void 0 !== c.remove &&
                  (b.isArray(c.remove) || (c.remove = [c.remove]),
                  b.each(
                    c.remove.sort(function (a, b) {
                      return b - a;
                    }),
                    function (b, a) {
                      E(a, a + 1, !0);
                    }
                  )),
                void 0 !== c.insert &&
                  (b.isArray(c.insert) || (c.insert = [c.insert]),
                  b.each(
                    c.insert.sort(function (a, b) {
                      return a - b;
                    }),
                    function (b, a) {
                      O(a.pos, a.c, !0, p);
                    }
                  )),
                c.refreshFromBuffer)
              ) {
                var k = c.refreshFromBuffer;
                if (
                  ((f = !0),
                  L(!0 === k ? k : k.start, k.end, u),
                  void 0 === c.pos && void 0 === c.c)
                )
                  return (c.pos = v()), !1;
                if ((i = void 0 !== c.pos ? c.pos : a) !== a)
                  return (c = b.extend(c, O(i, j, !0, p))), !1;
              } else if (
                !0 !== c &&
                void 0 !== c.pos &&
                c.pos !== a &&
                (L(a, (i = c.pos), m().slice()), i !== a)
              )
                return (c = b.extend(c, O(i, j, !0))), !1;
              return (
                (!0 === c || void 0 !== c.pos || void 0 !== c.c) &&
                (s > 0 && D(!0),
                y(i, b.extend({}, r, { input: M(j, h, i) }), p, q(g)) ||
                  (c = !1),
                !1)
              );
            }
          }),
          c
        );
      }

      function s(g, d) {
        var e = l.validPositions[d];
        if (e) {
          for (var h = e.locator, i = h.length, a = g; a < d; a++)
            if (void 0 === l.validPositions[a] && !x(a, !0)) {
              var f = K(a),
                c = f[0],
                j = -1;
              b.each(f, function (d, b) {
                for (
                  var a = 0;
                  a < i &&
                  void 0 !== b.locator[a] &&
                  N(
                    b.locator[a].toString().split(","),
                    h[a].toString().split(",")
                  );
                  a++
                )
                  j < a && ((j = a), (c = b));
              }),
                y(
                  a,
                  b.extend({}, c, {
                    input: c.match.placeholder || c.match.def,
                  }),
                  !0
                );
            }
        }
      }

      function y(g, m, q, r) {
        if (
          r ||
          (e.insertMode && void 0 !== l.validPositions[g] && void 0 === q)
        ) {
          var c,
            h = b.extend(!0, {}, l.validPositions),
            n = v(void 0, !0);
          for (c = g; c <= n; c++) delete l.validPositions[c];
          l.validPositions[g] = b.extend(!0, {}, m);
          var i,
            f = !0,
            j = l.validPositions,
            o = !1,
            p = l.maskLength;
          for (c = i = g; c <= n; c++) {
            var d = h[c];
            if (void 0 !== d)
              for (
                var a = i;
                a < l.maskLength &&
                ((null == d.match.fn &&
                  j[c] &&
                  (!0 === j[c].match.optionalQuantifier ||
                    !0 === j[c].match.optionality)) ||
                  null != d.match.fn);

              ) {
                if ((a++, !1 === o && h[a] && h[a].match.def === d.match.def))
                  (l.validPositions[a] = b.extend(!0, {}, h[a])),
                    (l.validPositions[a].input = d.input),
                    t(a),
                    (i = a),
                    (f = !0);
                else if (I(a, d.match.def)) {
                  var k = O(a, d.input, !0, !0);
                  (f = !1 !== k), (i = k.caret || k.insert ? v() : a), (o = !0);
                } else f = !0 === d.generatedInput;
                if ((l.maskLength < p && (l.maskLength = p), f)) break;
              }
            if (!f) break;
          }
          if (!f) return (l.validPositions = b.extend(!0, {}, h)), D(!0), !1;
        } else l.validPositions[g] = b.extend(!0, {}, m);
        return D(!0), !0;
      }

      function t(g) {
        for (var c, f, a = g - 1; a > -1 && !l.validPositions[a]; a--);
        for (a++; a < g; a++)
          void 0 === l.validPositions[a] &&
            (!1 === e.jitMasking || e.jitMasking > a) &&
            ("" ===
              (f = K(a, G(a - 1).locator, a - 1).slice())[f.length - 1].match
                .def && f.pop(),
            (c = F(f)) &&
              (c.match.def === e.radixPointDefinitionSymbol ||
                !x(a, !0) ||
                (b.inArray(e.radixPoint, m()) < a &&
                  c.match.fn &&
                  c.match.fn.test(T(a), l, a, !1, e))) &&
              !1 !==
                (d = k(
                  a,
                  c.match.placeholder ||
                    (null == c.match.fn
                      ? c.match.def
                      : "" !== T(a)
                      ? T(a)
                      : m()[a]),
                  !0
                )) &&
              (l.validPositions[d.pos || a].generatedInput = !0));
      }

      f = !0 === f;
      var c = g;
      void 0 !== g.begin && (c = n && !q(g) ? g.end : g.begin);
      var d = !1,
        u = b.extend(!0, {}, l.validPositions);
      if (
        (t(c),
        q(g) && (W(void 0, a.keyCode.DELETE, g), (c = l.p)),
        c < l.maskLength && ((d = k(c, h, f)), (!f || !0 === p) && !1 === d))
      ) {
        var o = l.validPositions[c];
        if (
          o &&
          null === o.match.fn &&
          (o.match.def === h || h === e.skipOptionalPartCharacter)
        )
          d = { caret: P(c) };
        else if (
          (e.insertMode || void 0 === l.validPositions[P(c)]) &&
          !x(c, !0)
        ) {
          var j = K(c).slice();
          "" === j[j.length - 1].match.def && j.pop();
          var _ = F(j, !0);
          _ &&
            null === _.match.fn &&
            (k(c, (_ = _.match.placeholder || _.match.def), f),
            (l.validPositions[c].generatedInput = !0));
          for (var i = c + 1, w = P(c); i <= w; i++)
            if (!1 !== (d = k(i, h, f))) {
              s(c, void 0 !== d.pos ? d.pos : i), (c = i);
              break;
            }
        }
      }
      return (
        !1 === d &&
          e.keepStatic &&
          !f &&
          !0 !== r &&
          (d = (function (n, o, q) {
            var h,
              g,
              c,
              a,
              r,
              s,
              k,
              d,
              t = b.extend(!0, {}, l.validPositions),
              m = !1,
              f = v();
            for (a = l.validPositions[f]; f >= 0; f--)
              if ((c = l.validPositions[f]) && void 0 !== c.alternation) {
                if (
                  ((h = f),
                  (g = l.validPositions[h].alternation),
                  a.locator[c.alternation] !== c.locator[c.alternation])
                )
                  break;
                a = c;
              }
            if (void 0 !== g) {
              d = parseInt(h);
              var i =
                void 0 !== a.locator[a.alternation || g]
                  ? a.locator[a.alternation || g]
                  : k[0];
              i.length > 0 && (i = i.split(",")[0]);
              var u = l.validPositions[d],
                j = l.validPositions[d - 1];
              b.each(K(d, j ? j.locator : void 0, d - 1), function (A, a) {
                k = a.locator[g] ? a.locator[g].toString().split(",") : [];
                for (var f = 0; f < k.length; f++) {
                  var c = [],
                    j = 0,
                    h = 0,
                    w = !1;
                  if (
                    i < k[f] &&
                    (void 0 === a.na || -1 === b.inArray(k[f], a.na.split(",")))
                  ) {
                    l.validPositions[d] = b.extend(!0, {}, a);
                    var z = l.validPositions[d].locator;
                    for (
                      l.validPositions[d].locator[g] = parseInt(k[f]),
                        null == a.match.fn
                          ? (u.input !== a.match.def &&
                              ((w = !0),
                              !0 !== u.generatedInput && c.push(u.input)),
                            h++,
                            (l.validPositions[d].generatedInput =
                              !/[0-9a-bA-Z]/.test(a.match.def)),
                            (l.validPositions[d].input = a.match.def))
                          : (l.validPositions[d].input = u.input),
                        r = d + 1;
                      r < v(void 0, !0) + 1;
                      r++
                    )
                      (s = l.validPositions[r]) &&
                      !0 !== s.generatedInput &&
                      /[0-9a-bA-Z]/.test(s.input)
                        ? c.push(s.input)
                        : r < n && j++,
                        delete l.validPositions[r];
                    for (
                      w && c[0] === a.match.def && c.shift(), D(!0), m = !0;
                      c.length > 0;

                    ) {
                      var x = c.shift();
                      if (
                        x !== e.skipOptionalPartCharacter &&
                        !(m = O(v(void 0, !0) + 1, x, !1, p, !0))
                      )
                        break;
                    }
                    if (m) {
                      l.validPositions[d].locator = z;
                      var y = v(n) + 1;
                      for (r = d + 1; r < v() + 1; r++)
                        (void 0 === (s = l.validPositions[r]) ||
                          null == s.match.fn) &&
                          r < n + (h - j) &&
                          h++;
                      (n += h - j), (m = O(n > y ? y : n, o, q, p, !0));
                    }
                    if (m) return !1;
                    D(), (l.validPositions = b.extend(!0, {}, t));
                  }
                }
              });
            }
            return m;
          })(c, h, f)),
        !0 === d && (d = { pos: c }),
        b.isFunction(e.postValidation) &&
          !1 !== d &&
          !f &&
          !0 !== p &&
          (d = !!e.postValidation(m(!0), d, e) && d),
        void 0 === d.pos && (d.pos = c),
        !1 === d && (D(!0), (l.validPositions = b.extend(!0, {}, u))),
        d
      );
    }

    function x(a, d) {
      var b;
      if (
        (d ? "" === (b = G(a).match).def && (b = H(a).match) : (b = H(a).match),
        null != b.fn)
      )
        return b.fn;
      if (!0 !== d && a > -1) {
        var c = K(a);
        return c.length > 1 + ("" === c[c.length - 1].match.def ? 1 : 0);
      }
      return !1;
    }

    function P(c, d) {
      var b = l.maskLength;
      if (c >= b) return b;
      for (
        var a = c;
        ++a < b &&
        ((!0 === d && (!0 !== H(a).match.newBlockMarker || !x(a))) ||
          (!0 !== d && !x(a)));

      );
      return a;
    }

    function Q(d, c) {
      var b,
        a = d;
      if (a <= 0) return 0;
      for (
        ;
        --a > 0 &&
        ((!0 === c && !0 !== H(a).match.newBlockMarker) ||
          (!0 !== c &&
            !x(a) &&
            ((b = K(a)).length < 2 ||
              (2 === b.length && "" === b[1].match.def))));

      );
      return a;
    }

    function R(a) {
      return void 0 === l.validPositions[a] ? T(a) : l.validPositions[a].input;
    }

    function S(f, d, a, g, i) {
      if (g && b.isFunction(e.onBeforeWrite)) {
        var c = e.onBeforeWrite(g, d, a, e);
        if (c) {
          if (c.refreshFromBuffer) {
            var h = c.refreshFromBuffer;
            L(!0 === h ? h : h.start, h.end, c.buffer || d), (d = m(!0));
          }
          void 0 !== a && (a = void 0 !== c.caret ? c.caret : a);
        }
      }
      f.inputmask._valueSet(d.join("")),
        void 0 === a || (void 0 !== g && "blur" === g.type)
          ? al(f, d, a)
          : U(f, a),
        !0 === i && ((aq = !0), b(f).trigger("input"));
    }

    function T(c, d) {
      if (void 0 !== (d = d || H(c).match).placeholder) return d.placeholder;
      if (null === d.fn) {
        if (c > -1 && void 0 === l.validPositions[c]) {
          var f,
            a = K(c),
            g = [];
          if (a.length > 1 + ("" === a[a.length - 1].match.def ? 1 : 0)) {
            for (var b = 0; b < a.length; b++)
              if (
                !0 !== a[b].match.optionality &&
                !0 !== a[b].match.optionalQuantifier &&
                (null === a[b].match.fn ||
                  void 0 === f ||
                  !1 !== a[b].match.fn.test(f.match.def, l, c, !0, e)) &&
                (g.push(a[b]),
                null === a[b].match.fn && (f = a[b]),
                g.length > 1 && /[0-9a-bA-Z]/.test(g[0].match.def))
              )
                return e.placeholder.charAt(c % e.placeholder.length);
          }
        }
        return d.def;
      }
      return e.placeholder.charAt(c % e.placeholder.length);
    }

    function q(g, o, p, q, h, r) {
      var i = q.slice(),
        s = "",
        f = 0,
        c = void 0;
      if ((D(), (l.p = P(-1)), !p)) {
        if (!0 !== e.autoUnmask) {
          var k = w().slice(0, P(-1)).join(""),
            j = i.join("").match(new RegExp("^" + a.escapeRegex(k), "g"));
          j && j.length > 0 && (i.splice(0, j.length * k.length), (f = P(f)));
        } else f = P(f);
      }
      if (
        (b.each(i, function (o, i) {
          if (void 0 !== i) {
            var d = new b.Event("keypress");
            (d.which = i.charCodeAt(0)), (s += i);
            var a = v(void 0, !0),
              j = l.validPositions[a],
              k = G(a + 1, j ? j.locator.slice() : void 0, a);
            if (
              !(function () {
                var a = !1,
                  c = w().slice(f, P(f)).join("").indexOf(s);
                if (-1 !== c && !x(f)) {
                  a = !0;
                  for (var d = w().slice(f, f + c), b = 0; b < d.length; b++)
                    if (" " !== d[b]) {
                      a = !1;
                      break;
                    }
                }
                return a;
              })() ||
              p ||
              e.autoUnmask
            ) {
              var n = p
                ? o
                : null == k.match.fn && k.match.optionality && a + 1 < l.p
                ? a + 1
                : l.p;
              (c = Y.call(g, d, !0, !1, p, n)), (f = n + 1), (s = "");
            } else c = Y.call(g, d, !0, !1, !0, a + 1);
            if (
              !p &&
              b.isFunction(e.onBeforeWrite) &&
              (c = e.onBeforeWrite(d, m(), c.forwardPosition, e)) &&
              c.refreshFromBuffer
            ) {
              var h = c.refreshFromBuffer;
              L(!0 === h ? h : h.start, h.end, c.buffer),
                D(!0),
                c.caret && (l.p = c.caret);
            }
          }
        }),
        o)
      ) {
        var d = void 0,
          n = v();
        document.activeElement === g &&
          (h || c) &&
          ((d = U(g).begin),
          h && !1 === c && (d = P(v(d))),
          c &&
            !0 !== r &&
            (d < n + 1 || -1 === n) &&
            (d =
              e.numericInput && void 0 === c.caret
                ? Q(c.forwardPosition)
                : c.forwardPosition)),
          S(g, m(), d, h || new b.Event("checkval"));
      }
    }

    function _(f) {
      if (f && void 0 === f.inputmask) return f.value;
      var a = [],
        c = l.validPositions;
      for (var g in c)
        c[g].match && null != c[g].match.fn && a.push(c[g].input);
      var d = 0 === a.length ? "" : (n ? a.reverse() : a).join("");
      if (b.isFunction(e.onUnMask)) {
        var h = (n ? m().slice().reverse() : m()).join("");
        d = e.onUnMask(h, d, e) || d;
      }
      return d;
    }

    function U(a, c, b, k) {
      function f(a) {
        return (
          !0 !== k &&
            n &&
            "number" == typeof a &&
            (!e.greedy || "" !== e.placeholder) &&
            (a = m().join("").length - a),
          a
        );
      }

      if ("number" != typeof c)
        return (
          a.setSelectionRange
            ? ((c = a.selectionStart), (b = a.selectionEnd))
            : window.getSelection
            ? ((d = window.getSelection().getRangeAt(0)).commonAncestorContainer
                .parentNode !== a &&
                d.commonAncestorContainer !== a) ||
              ((c = d.startOffset), (b = d.endOffset))
            : document.selection &&
              document.selection.createRange &&
              (b =
                (c =
                  0 -
                  (d = document.selection.createRange())
                    .duplicate()
                    .moveStart("character", -a.inputmask._valueGet().length)) +
                d.text.length),
          {
            begin: f(c),
            end: f(b),
          }
        );
      (c = f(c)), (b = f(b)), (b = "number" == typeof b ? b : c);
      var d,
        g =
          parseInt(
            ((a.ownerDocument.defaultView || window).getComputedStyle
              ? (a.ownerDocument.defaultView || window).getComputedStyle(
                  a,
                  null
                )
              : a.currentStyle
            ).fontSize
          ) * b;
      if (
        ((a.scrollLeft = g > a.scrollWidth ? g : 0),
        h || !1 !== e.insertMode || c !== b || b++,
        a.setSelectionRange)
      )
        (a.selectionStart = c), (a.selectionEnd = b);
      else if (window.getSelection) {
        if (
          ((d = document.createRange()),
          void 0 === a.firstChild || null === a.firstChild)
        ) {
          var j = document.createTextNode("");
          a.appendChild(j);
        }
        d.setStart(
          a.firstChild,
          c < a.inputmask._valueGet().length
            ? c
            : a.inputmask._valueGet().length
        ),
          d.setEnd(
            a.firstChild,
            b < a.inputmask._valueGet().length
              ? b
              : a.inputmask._valueGet().length
          ),
          d.collapse(!0);
        var i = window.getSelection();
        i.removeAllRanges(), i.addRange(d);
      } else
        a.createTextRange &&
          ((d = a.createTextRange()).collapse(!0),
          d.moveEnd("character", b),
          d.moveStart("character", c),
          d.select());
      al(a, void 0, { begin: c, end: b });
    }

    function y(k) {
      var a,
        c,
        g = m(),
        e = g.length,
        h = v(),
        f = {},
        d = l.validPositions[h],
        j = void 0 !== d ? d.locator.slice() : void 0;
      for (a = h + 1; a < g.length; a++)
        (j = (c = G(a, j, a - 1)).locator.slice()),
          (f[a] = b.extend(!0, {}, c));
      var i = d && void 0 !== d.alternation ? d.locator[d.alternation] : void 0;
      for (
        a = e - 1;
        a > h &&
        ((c = f[a]).match.optionality ||
          c.match.optionalQuantifier ||
          (i &&
            ((i !== f[a].locator[d.alternation] && null != c.match.fn) ||
              (null === c.match.fn &&
                c.locator[d.alternation] &&
                N(
                  c.locator[d.alternation].toString().split(","),
                  i.toString().split(",")
                ) &&
                "" !== K(a)[0].def)))) &&
        g[a] === T(a, c.match);
        a--
      )
        e--;
      return k ? { l: e, def: f[e] ? f[e].match : void 0 } : e;
    }

    function V(b) {
      for (var c = y(), a = b.length - 1; a > c && !x(a); a--);
      return b.splice(c, a + 1 - c), b;
    }

    function u(g) {
      if (b.isFunction(e.isComplete)) return e.isComplete(g, e);
      if ("*" !== e.repeat) {
        var f = !1,
          c = y(!0),
          h = Q(c.l);
        if (
          void 0 === c.def ||
          c.def.newBlockMarker ||
          c.def.optionality ||
          c.def.optionalQuantifier
        ) {
          f = !0;
          for (var a = 0; a <= h; a++) {
            var d = G(a).match;
            if (
              (null !== d.fn &&
                void 0 === l.validPositions[a] &&
                !0 !== d.optionality &&
                !0 !== d.optionalQuantifier) ||
              (null === d.fn && g[a] !== T(a, d))
            ) {
              f = !1;
              break;
            }
          }
        }
        return f;
      }
    }

    function W(i, d, c, f) {
      if (
        (e.numericInput || n) &&
        (d === a.keyCode.BACKSPACE
          ? (d = a.keyCode.DELETE)
          : d === a.keyCode.DELETE && (d = a.keyCode.BACKSPACE),
        n)
      ) {
        var h = c.end;
        (c.end = c.begin), (c.begin = h);
      }
      d === a.keyCode.BACKSPACE && (c.end - c.begin < 1 || !1 === e.insertMode)
        ? ((c.begin = Q(c.begin)),
          void 0 === l.validPositions[c.begin] ||
            (l.validPositions[c.begin].input !== e.groupSeparator &&
              l.validPositions[c.begin].input !== e.radixPoint) ||
            c.begin--)
        : d === a.keyCode.DELETE &&
          c.begin === c.end &&
          ((c.end = x(c.end, !0) ? c.end + 1 : P(c.end) + 1),
          void 0 === l.validPositions[c.begin] ||
            (l.validPositions[c.begin].input !== e.groupSeparator &&
              l.validPositions[c.begin].input !== e.radixPoint) ||
            c.end++),
        E(c.begin, c.end, !1, f),
        !0 !== f &&
          (function () {
            if (e.keepStatic) {
              for (
                var d = [],
                  c = v(-1, !0),
                  h = b.extend(!0, {}, l.validPositions),
                  f = l.validPositions[c];
                c >= 0;
                c--
              ) {
                var a = l.validPositions[c];
                if (a) {
                  if (
                    (!0 !== a.generatedInput &&
                      /[0-9a-bA-Z]/.test(a.input) &&
                      d.push(a.input),
                    delete l.validPositions[c],
                    void 0 !== a.alternation &&
                      a.locator[a.alternation] !== f.locator[a.alternation])
                  )
                    break;
                  f = a;
                }
              }
              if (c > -1)
                for (l.p = P(v(-1, !0)); d.length > 0; ) {
                  var g = new b.Event("keypress");
                  (g.which = d.pop().charCodeAt(0)),
                    Y.call(i, g, !0, !1, !1, l.p);
                }
              else l.validPositions = b.extend(!0, {}, h);
            }
          })();
      var g = v(c.begin, !0);
      g < c.begin ? (l.p = P(g)) : !0 !== f && (l.p = c.begin);
    }

    function X(d) {
      var h,
        k,
        o,
        g = this,
        p = b(g),
        f = d.keyCode,
        c = U(g);
      if (
        f === a.keyCode.BACKSPACE ||
        f === a.keyCode.DELETE ||
        (i && f === a.keyCode.BACKSPACE_SAFARI) ||
        (d.ctrlKey &&
          f === a.keyCode.X &&
          ((o = (k = "oncut") in (h = document.createElement("input"))) ||
            (h.setAttribute(k, "return;"), (o = "function" == typeof h[k])),
          (h = null),
          !o))
      )
        d.preventDefault(),
          W(g, f, c),
          S(g, m(!0), l.p, d, g.inputmask._valueGet() !== m().join("")),
          g.inputmask._valueGet() === w().join("")
            ? p.trigger("cleared")
            : !0 === u(m()) && p.trigger("complete"),
          e.showTooltip && (g.title = e.tooltip || l.mask);
      else if (f === a.keyCode.END || f === a.keyCode.PAGE_DOWN) {
        d.preventDefault();
        var j = P(v());
        e.insertMode || j !== l.maskLength || d.shiftKey || j--,
          U(g, d.shiftKey ? c.begin : j, j, !0);
      } else
        (f !== a.keyCode.HOME || d.shiftKey) && f !== a.keyCode.PAGE_UP
          ? ((e.undoOnEscape && f === a.keyCode.ESCAPE) ||
              (90 === f && d.ctrlKey)) &&
            !0 !== d.altKey
            ? (q(g, !0, !1, am.split("")), p.trigger("click"))
            : f !== a.keyCode.INSERT || d.shiftKey || d.ctrlKey
            ? !0 === e.tabThrough && f === a.keyCode.TAB
              ? (!0 === d.shiftKey
                  ? (null === H(c.begin).match.fn && (c.begin = P(c.begin)),
                    (c.end = Q(c.begin, !0)),
                    (c.begin = Q(c.end, !0)))
                  : ((c.begin = P(c.begin, !0)),
                    (c.end = P(c.begin, !0)),
                    c.end < l.maskLength && c.end--),
                c.begin < l.maskLength &&
                  (d.preventDefault(), U(g, c.begin, c.end)))
              : d.shiftKey ||
                (!1 === e.insertMode
                  ? f === a.keyCode.RIGHT
                    ? setTimeout(function () {
                        var a = U(g);
                        U(g, a.begin);
                      }, 0)
                    : f === a.keyCode.LEFT &&
                      setTimeout(function () {
                        var a = U(g);
                        U(g, n ? a.begin + 1 : a.begin - 1);
                      }, 0)
                  : setTimeout(function () {
                      al(g);
                    }, 0))
            : ((e.insertMode = !e.insertMode),
              U(
                g,
                e.insertMode || c.begin !== l.maskLength ? c.begin : c.begin - 1
              ))
          : (d.preventDefault(), U(g, 0, d.shiftKey ? c.begin : 0, !0));
      e.onKeyDown.call(this, d, m(), U(g).begin, e),
        (ar = -1 !== b.inArray(f, e.ignorables));
    }

    function Y(c, f, k, n, j) {
      var i = this,
        r = b(i),
        g = c.which || c.charCode || c.keyCode;
      if (
        !(!0 === f || (c.ctrlKey && c.altKey)) &&
        (c.ctrlKey || c.metaKey || ar)
      )
        return (
          g === a.keyCode.ENTER &&
            am !== m().join("") &&
            ((am = m().join("")),
            setTimeout(function () {
              r.trigger("change");
            }, 0)),
          !0
        );
      if (g) {
        46 === g && !1 === c.shiftKey && "," === e.radixPoint && (g = 44);
        var h,
          o = f ? { begin: j, end: j } : U(i),
          p = String.fromCharCode(g);
        l.writeOutBuffer = !0;
        var d = O(o, p, n);
        if (
          (!1 !== d &&
            (D(!0),
            (h = void 0 !== d.caret ? d.caret : f ? d.pos + 1 : P(d.pos)),
            (l.p = h)),
          !1 !== k)
        ) {
          var s = this;
          if (
            (setTimeout(function () {
              e.onKeyValidation.call(s, g, d, e);
            }, 0),
            l.writeOutBuffer && !1 !== d)
          ) {
            var q = m();
            S(
              i,
              q,
              e.numericInput && void 0 === d.caret ? Q(h) : h,
              c,
              !0 !== f
            ),
              !0 !== f &&
                setTimeout(function () {
                  !0 === u(q) && r.trigger("complete");
                }, 0);
          }
        }
        if (
          (e.showTooltip && (i.title = e.tooltip || l.mask),
          c.preventDefault(),
          f)
        )
          return (d.forwardPosition = h), d;
      }
    }

    function Z(g) {
      var j,
        h = this,
        k = g.originalEvent || g,
        l = b(h),
        a = h.inputmask._valueGet(!0),
        c = U(h);
      n && ((j = c.end), (c.end = c.begin), (c.begin = j));
      var d = a.substr(0, c.begin),
        f = a.substr(c.end, a.length);
      if (
        (d === (n ? w().reverse() : w()).slice(0, c.begin).join("") && (d = ""),
        f === (n ? w().reverse() : w()).slice(c.end).join("") && (f = ""),
        n && ((j = d), (d = f), (f = j)),
        window.clipboardData && window.clipboardData.getData)
      )
        a = d + window.clipboardData.getData("Text") + f;
      else {
        if (!k.clipboardData || !k.clipboardData.getData) return !0;
        a = d + k.clipboardData.getData("text/plain") + f;
      }
      var i = a;
      if (b.isFunction(e.onBeforePaste)) {
        if (!1 === (i = e.onBeforePaste(a, e))) return g.preventDefault();
        i || (i = a);
      }
      return (
        q(h, !1, !1, n ? i.split("").reverse() : i.toString().split("")),
        S(h, m(), P(v()), g, am !== m().join("")),
        !0 === u(m()) && l.trigger("complete"),
        g.preventDefault()
      );
    }

    function aa(g) {
      var f = this,
        c = f.inputmask._valueGet();
      if (m().join("") !== c) {
        var e = U(f);
        if (
          ((c = c.replace(
            new RegExp("(" + a.escapeRegex(w().join("")) + ")*"),
            ""
          )),
          d)
        ) {
          var i = c.replace(m().join(""), "");
          if (1 === i.length) {
            var j = new b.Event("keypress");
            return (
              (j.which = i.charCodeAt(0)),
              Y.call(
                f,
                j,
                !0,
                !0,
                !1,
                l.validPositions[e.begin - 1] ? e.begin : e.begin - 1
              ),
              !1
            );
          }
        }
        if (
          (e.begin > c.length && (U(f, c.length), (e = U(f))),
          m().length - c.length != 1 ||
            c.charAt(e.begin) === m()[e.begin] ||
            c.charAt(e.begin + 1) === m()[e.begin] ||
            x(e.begin))
        ) {
          for (
            var k = v() + 1, h = w().join("");
            null === c.match(a.escapeRegex(h) + "$");

          )
            h = h.slice(1);
          (c = (c = c.replace(h, "")).split("")),
            q(f, !0, !1, c, g, e.begin < k),
            !0 === u(m()) && b(f).trigger("complete");
        } else (g.keyCode = a.keyCode.BACKSPACE), X.call(f, g);
        g.preventDefault();
      }
    }

    function ab(c) {
      var a = this.inputmask._valueGet();
      q(
        this,
        !0,
        !1,
        ((b.isFunction(e.onBeforeMask) && e.onBeforeMask(a, e)) || a).split("")
      ),
        (am = m().join("")),
        (e.clearMaskOnLostFocus || e.clearIncomplete) &&
          this.inputmask._valueGet() === w().join("") &&
          this.inputmask._valueSet("");
    }

    function ac(b) {
      var a = this.inputmask._valueGet();
      e.showMaskOnFocus &&
        (!e.showMaskOnHover || (e.showMaskOnHover && "" === a)) &&
        (this.inputmask._valueGet() !== m().join("")
          ? S(this, m(), P(v()))
          : !1 === as && U(this, P(v()))),
        !0 === e.positionCaretOnTab &&
          setTimeout(function () {
            ae.apply(this, [b]);
          }, 0),
        (am = m().join(""));
    }

    function ad(c) {
      if (
        ((as = !1), e.clearMaskOnLostFocus && document.activeElement !== this)
      ) {
        var a = m().slice(),
          b = this.inputmask._valueGet();
        b !== this.getAttribute("placeholder") &&
          "" !== b &&
          (-1 === v() && b === w().join("") ? (a = []) : V(a), S(this, a));
      }
    }

    function ae(a) {
      var c = this;
      setTimeout(function () {
        if (document.activeElement === c) {
          var f = U(c);
          if (f.begin === f.end)
            switch (e.positionCaretOnClick) {
              case "none":
                break;
              case "radixFocus":
                if (
                  (function (a) {
                    if ("" !== e.radixPoint) {
                      var c = l.validPositions;
                      if (void 0 === c[a] || c[a].input === T(a)) {
                        if (a < P(-1)) return !0;
                        var f = b.inArray(e.radixPoint, m());
                        if (-1 !== f) {
                          for (var d in c)
                            if (f < d && c[d].input !== T(d)) return !1;
                          return !0;
                        }
                      }
                    }
                    return !1;
                  })(f.begin)
                ) {
                  var h = b.inArray(e.radixPoint, m().join(""));
                  U(c, e.numericInput ? P(h) : h);
                  break;
                }
              default:
                var d = f.begin,
                  i = v(d, !0),
                  a = P(i);
                if (d < a) U(c, x(d) || x(d - 1) ? d : P(d));
                else {
                  var g = T(a);
                  (("" === g ||
                    m()[a] === g ||
                    !0 === H(a).match.optionalQuantifier) &&
                    (x(a) || H(a).match.def !== g)) ||
                    (a = P(a)),
                    U(c, a);
                }
            }
        }
      }, 0);
    }

    function $(a) {
      var b = this;
      setTimeout(function () {
        U(b, 0, P(v()));
      }, 0);
    }

    function af(f) {
      var c = this,
        h = b(c),
        d = U(c),
        i = f.originalEvent || f,
        j = window.clipboardData || i.clipboardData,
        g = n ? m().slice(d.end, d.begin) : m().slice(d.begin, d.end);
      j.setData("text", n ? g.reverse().join("") : g.join("")),
        document.execCommand && document.execCommand("copy"),
        W(c, a.keyCode.DELETE, d),
        S(c, m(), l.p, f, am !== m().join("")),
        c.inputmask._valueGet() === w().join("") && h.trigger("cleared"),
        e.showTooltip && (c.title = e.tooltip || l.mask);
    }

    function ag(d) {
      var f = b(this);
      if (this.inputmask) {
        var c = this.inputmask._valueGet(),
          a = m().slice();
        am !== a.join("") &&
          setTimeout(function () {
            f.trigger("change"), (am = a.join(""));
          }, 0),
          "" !== c &&
            (e.clearMaskOnLostFocus &&
              (-1 === v() && c === w().join("") ? (a = []) : V(a)),
            !1 === u(a) &&
              (setTimeout(function () {
                f.trigger("incomplete");
              }, 0),
              e.clearIncomplete &&
                (D(), (a = e.clearMaskOnLostFocus ? [] : w().slice()))),
            S(this, a, void 0, d));
      }
    }

    function ah(a) {
      (as = !0),
        document.activeElement !== this &&
          e.showMaskOnHover &&
          this.inputmask._valueGet() !== m().join("") &&
          S(this, m());
    }

    function ai(a) {
      am !== m().join("") && z.trigger("change"),
        e.clearMaskOnLostFocus &&
          -1 === v() &&
          c.inputmask._valueGet &&
          c.inputmask._valueGet() === w().join("") &&
          c.inputmask._valueSet(""),
        e.removeMaskOnSubmit &&
          (c.inputmask._valueSet(c.inputmask.unmaskedvalue(), !0),
          setTimeout(function () {
            S(c, m());
          }, 0));
    }

    function aj(a) {
      setTimeout(function () {
        z.trigger("setvalue");
      }, 0);
    }

    function ak(a) {
      function e() {
        (ao.style.position = "absolute"),
          (ao.style.top = f.top + "px"),
          (ao.style.left = f.left + "px"),
          (ao.style.width =
            parseInt(a.offsetWidth) -
            parseInt(d.paddingLeft) -
            parseInt(d.paddingRight) -
            parseInt(d.borderLeftWidth) -
            parseInt(d.borderRightWidth) +
            "px"),
          (ao.style.height =
            parseInt(a.offsetHeight) -
            parseInt(d.paddingTop) -
            parseInt(d.paddingBottom) -
            parseInt(d.borderTopWidth) -
            parseInt(d.borderBottomWidth) +
            "px"),
          (ao.style.lineHeight = ao.style.height),
          (ao.style.zIndex = isNaN(d.zIndex) ? -1 : d.zIndex - 1),
          (ao.style.webkitAppearance = "textfield"),
          (ao.style.mozAppearance = "textfield"),
          (ao.style.Appearance = "textfield");
      }

      var f = b(a).position(),
        d = (a.ownerDocument.defaultView || window).getComputedStyle(a, null);
      for (var c in (a.parentNode,
      (ao = document.createElement("div")),
      document.body.appendChild(ao),
      d))
        isNaN(c) &&
          "cssText" !== c &&
          -1 == c.indexOf("webkit") &&
          (ao.style[c] = d[c]);
      (a.style.backgroundColor = "transparent"),
        (a.style.color = "transparent"),
        (a.style.webkitAppearance = "caret"),
        (a.style.mozAppearance = "caret"),
        (a.style.Appearance = "caret"),
        e(),
        b(window).on("resize", function (c) {
          (f = b(a).position()),
            (d = (a.ownerDocument.defaultView || window).getComputedStyle(
              a,
              null
            )),
            e();
        }),
        b(a).on("click", function (b) {
          return (
            U(
              a,
              (function (f) {
                var c,
                  b = document.createElement("span");
                for (var e in d)
                  isNaN(e) && -1 !== e.indexOf("font") && (b.style[e] = d[e]);
                (b.style.textTransform = d.textTransform),
                  (b.style.letterSpacing = d.letterSpacing),
                  (b.style.position = "absolute"),
                  (b.style.height = "auto"),
                  (b.style.width = "auto"),
                  (b.style.visibility = "hidden"),
                  (b.style.whiteSpace = "nowrap"),
                  document.body.appendChild(b);
                var h,
                  g = a.inputmask._valueGet(),
                  i = 0;
                for (c = 0, h = g.length; c <= h; c++) {
                  if (
                    ((b.innerHTML += g.charAt(c) || "_"), b.offsetWidth >= f)
                  ) {
                    var j = f - i,
                      k = b.offsetWidth - f;
                    (b.innerHTML = g.charAt(c)),
                      (j -= b.offsetWidth / 3),
                      (c = j < k ? c - 1 : c);
                    break;
                  }
                  i = b.offsetWidth;
                }
                return document.body.removeChild(b), c;
              })(b.clientX)
            ),
            ae.call(this, [b])
          );
        });
    }

    function al(i, g, b) {
      function j() {
        n || (null !== c.fn && void 0 !== d.input)
          ? n &&
            null !== c.fn &&
            void 0 !== d.input &&
            ((n = !1), (f += "</span>"))
          : ((n = !0), (f += "<span class='im-static''>"));
      }

      if (void 0 !== ao) {
        (g = g || m()),
          void 0 === b
            ? (b = U(i))
            : void 0 === b.begin && (b = { begin: b, end: b });
        var f = "",
          n = !1;
        if ("" != g) {
          var h,
            c,
            d,
            a = 0,
            k = v();
          do
            a === b.begin &&
              document.activeElement === i &&
              (f +=
                "<span class='im-caret' style='border-right-width: 1px;border-right-style: solid;'></span>"),
              l.validPositions[a]
                ? ((c = (d = l.validPositions[a]).match),
                  (h = d.locator.slice()),
                  j(),
                  (f += d.input))
                : ((c = (d = G(a, h, a - 1)).match),
                  (h = d.locator.slice()),
                  (!1 === e.jitMasking ||
                    a < k ||
                    (Number.isFinite(e.jitMasking) && e.jitMasking > a)) &&
                    (j(), (f += T(a, c)))),
              a++;
          while (
            ((void 0 === an || a < an) && (null !== c.fn || "" !== c.def)) ||
            k > a
          );
        }
        ao.innerHTML = f;
      }
    }

    var am,
      c,
      z,
      an,
      ao,
      k,
      n = !1,
      ap = !1,
      aq = !1,
      ar = !1,
      as = !1,
      A = {
        on: function (c, f, h) {
          var g = function (c) {
            if (void 0 === this.inputmask && "FORM" !== this.nodeName) {
              var f = b.data(this, "_inputmask_opts");
              f ? new a(f).mask(this) : A.off(this);
            } else {
              if (
                "setvalue" === c.type ||
                !(
                  this.disabled ||
                  (this.readOnly &&
                    !(
                      ("keydown" === c.type && c.ctrlKey && 67 === c.keyCode) ||
                      (!1 === e.tabThrough && c.keyCode === a.keyCode.TAB)
                    ))
                )
              ) {
                switch (c.type) {
                  case "input":
                    if (!0 === aq) return (aq = !1), c.preventDefault();
                    break;
                  case "keydown":
                    (ap = !1), (aq = !1);
                    break;
                  case "keypress":
                    if (!0 === ap) return c.preventDefault();
                    ap = !0;
                    break;
                  case "click":
                    if (d || i) {
                      var j = this,
                        k = arguments;
                      return (
                        setTimeout(function () {
                          h.apply(j, k);
                        }, 0),
                        !1
                      );
                    }
                }
                var g = h.apply(this, arguments);
                return !1 === g && (c.preventDefault(), c.stopPropagation()), g;
              }
              c.preventDefault();
            }
          };
          (c.inputmask.events[f] = c.inputmask.events[f] || []),
            c.inputmask.events[f].push(g),
            -1 !== b.inArray(f, ["submit", "reset"])
              ? null != c.form && b(c.form).on(f, g)
              : b(c).on(f, g);
        },
        off: function (a, c) {
          if (a.inputmask && a.inputmask.events) {
            var d;
            c
              ? ((d = [])[c] = a.inputmask.events[c])
              : (d = a.inputmask.events),
              b.each(d, function (c, d) {
                for (; d.length > 0; ) {
                  var e = d.pop();
                  -1 !== b.inArray(c, ["submit", "reset"])
                    ? null != a.form && b(a.form).off(c, e)
                    : b(a).off(c, e);
                }
                delete a.inputmask.events[c];
              });
          }
        },
      };
    if (void 0 !== f)
      switch (f.action) {
        case "isComplete":
          return (c = f.el), u(m());
        case "unmaskedvalue":
          return (
            void 0 !== (c = f.el) && void 0 !== c.inputmask
              ? ((l = c.inputmask.maskset),
                (e = c.inputmask.opts),
                (n = c.inputmask.isRTL))
              : ((k = f.value),
                e.numericInput && (n = !0),
                (k = (
                  (b.isFunction(e.onBeforeMask) && e.onBeforeMask(k, e)) ||
                  k
                ).split("")),
                q(void 0, !1, !1, n ? k.reverse() : k),
                b.isFunction(e.onBeforeWrite) &&
                  e.onBeforeWrite(void 0, m(), 0, e)),
            _(c)
          );
        case "mask":
          (l = (c = f.el).inputmask.maskset),
            (e = c.inputmask.opts),
            (n = c.inputmask.isRTL),
            (function (d) {
              if (
                (function (a, f) {
                  var e = a.getAttribute("type"),
                    c =
                      ("INPUT" === a.tagName &&
                        -1 !== b.inArray(e, f.supportsInputType)) ||
                      a.isContentEditable ||
                      "TEXTAREA" === a.tagName;
                  if (!c && "INPUT" === a.tagName) {
                    var d = document.createElement("input");
                    d.setAttribute("type", e),
                      (c = "text" === d.type),
                      (d = null);
                  }
                  return c;
                })(d, e) &&
                ((z = b((c = d))),
                e.showTooltip && (c.title = e.tooltip || l.mask),
                ("rtl" === c.dir || e.rightAlign) &&
                  (c.style.textAlign = "right"),
                ("rtl" === c.dir || e.numericInput) &&
                  ((c.dir = "ltr"),
                  c.removeAttribute("dir"),
                  (c.inputmask.isRTL = !0),
                  (n = !0)),
                !0 === e.colorMask && ak(c),
                j &&
                  (c.hasOwnProperty("inputmode") &&
                    ((c.inputmode = e.inputmode),
                    c.setAttribute("inputmode", e.inputmode)),
                  "rtfm" === e.androidHack &&
                    (!0 !== e.colorMask && ak(c), (c.type = "password"))),
                A.off(c),
                (function (a) {
                  function g() {
                    return this.inputmask
                      ? this.inputmask.opts.autoUnmask
                        ? this.inputmask.unmaskedvalue()
                        : -1 !== v() || !0 !== e.nullable
                        ? document.activeElement === this &&
                          e.clearMaskOnLostFocus
                          ? (n
                              ? V(m().slice()).reverse()
                              : V(m().slice())
                            ).join("")
                          : c.call(this)
                        : ""
                      : c.call(this);
                  }

                  function h(a) {
                    d.call(this, a),
                      this.inputmask && b(this).trigger("setvalue");
                  }

                  if (!a.inputmask.__valueGet) {
                    if (!0 !== e.noValuePatching) {
                      if (Object.getOwnPropertyDescriptor) {
                        "function" != typeof Object.getPrototypeOf &&
                          (Object.getPrototypeOf =
                            "object" == typeof "test".__proto__
                              ? function (a) {
                                  return a.__proto__;
                                }
                              : function (a) {
                                  return a.constructor.prototype;
                                });
                        var i,
                          c,
                          d,
                          f = Object.getPrototypeOf
                            ? Object.getOwnPropertyDescriptor(
                                Object.getPrototypeOf(a),
                                "value"
                              )
                            : void 0;
                        f && f.get && f.set
                          ? ((c = f.get),
                            (d = f.set),
                            Object.defineProperty(a, "value", {
                              get: g,
                              set: h,
                              configurable: !0,
                            }))
                          : "INPUT" !== a.tagName &&
                            ((c = function () {
                              return this.textContent;
                            }),
                            (d = function (a) {
                              this.textContent = a;
                            }),
                            Object.defineProperty(a, "value", {
                              get: g,
                              set: h,
                              configurable: !0,
                            }));
                      } else
                        document.__lookupGetter__ &&
                          a.__lookupGetter__("value") &&
                          ((c = a.__lookupGetter__("value")),
                          (d = a.__lookupSetter__("value")),
                          a.__defineGetter__("value", g),
                          a.__defineSetter__("value", h));
                      (a.inputmask.__valueGet = c),
                        (a.inputmask.__valueSet = d);
                    }
                    (a.inputmask._valueGet = function (a) {
                      return n && !0 !== a
                        ? c.call(this.el).split("").reverse().join("")
                        : c.call(this.el);
                    }),
                      (a.inputmask._valueSet = function (a, b) {
                        d.call(
                          this.el,
                          null == a
                            ? ""
                            : !0 !== b && n
                            ? a.split("").reverse().join("")
                            : a
                        );
                      }),
                      void 0 === c &&
                        ((c = function () {
                          return this.value;
                        }),
                        (d = function (a) {
                          this.value = a;
                        }),
                        (function (a) {
                          if (
                            b.valHooks &&
                            (void 0 === b.valHooks[a] ||
                              !0 !== b.valHooks[a].inputmaskpatch)
                          ) {
                            var c =
                                b.valHooks[a] && b.valHooks[a].get
                                  ? b.valHooks[a].get
                                  : function (a) {
                                      return a.value;
                                    },
                              d =
                                b.valHooks[a] && b.valHooks[a].set
                                  ? b.valHooks[a].set
                                  : function (a, b) {
                                      return (a.value = b), a;
                                    };
                            b.valHooks[a] = {
                              get: function (a) {
                                if (a.inputmask) {
                                  if (a.inputmask.opts.autoUnmask)
                                    return a.inputmask.unmaskedvalue();
                                  var b = c(a);
                                  return -1 !==
                                    v(
                                      void 0,
                                      void 0,
                                      a.inputmask.maskset.validPositions
                                    ) || !0 !== e.nullable
                                    ? b
                                    : "";
                                }
                                return c(a);
                              },
                              set: function (a, e) {
                                var c,
                                  f = b(a);
                                return (
                                  (c = d(a, e)),
                                  a.inputmask && f.trigger("setvalue"),
                                  c
                                );
                              },
                              inputmaskpatch: !0,
                            };
                          }
                        })(a.type),
                        (i = a),
                        A.on(i, "mouseenter", function (c) {
                          var a = b(this);
                          this.inputmask._valueGet() !== m().join("") &&
                            a.trigger("setvalue");
                        }));
                  }
                })(c),
                A.on(c, "submit", ai),
                A.on(c, "reset", aj),
                A.on(c, "mouseenter", ah),
                A.on(c, "blur", ag),
                A.on(c, "focus", ac),
                A.on(c, "mouseleave", ad),
                !0 !== e.colorMask && A.on(c, "click", ae),
                A.on(c, "dblclick", $),
                A.on(c, "paste", Z),
                A.on(c, "dragdrop", Z),
                A.on(c, "drop", Z),
                A.on(c, "cut", af),
                A.on(c, "complete", e.oncomplete),
                A.on(c, "incomplete", e.onincomplete),
                A.on(c, "cleared", e.oncleared),
                !0 !== e.inputEventOnly &&
                  (A.on(c, "keydown", X), A.on(c, "keypress", Y)),
                A.on(c, "compositionstart", b.noop),
                A.on(c, "compositionupdate", b.noop),
                A.on(c, "compositionend", b.noop),
                A.on(c, "keyup", b.noop),
                A.on(c, "input", aa),
                A.on(c, "setvalue", ab),
                w(),
                "" !== c.inputmask._valueGet() ||
                  !1 === e.clearMaskOnLostFocus ||
                  document.activeElement === c)
              ) {
                var f =
                  (b.isFunction(e.onBeforeMask) &&
                    e.onBeforeMask(c.inputmask._valueGet(), e)) ||
                  c.inputmask._valueGet();
                q(c, !0, !1, f.split(""));
                var a = m().slice();
                (am = a.join("")),
                  !1 === u(a) && e.clearIncomplete && D(),
                  e.clearMaskOnLostFocus &&
                    document.activeElement !== c &&
                    (-1 === v() ? (a = []) : V(a)),
                  S(c, a),
                  document.activeElement === c && U(c, P(v()));
              }
            })(c);
          break;
        case "format":
          return (
            e.numericInput && (n = !0),
            (k = (
              (b.isFunction(e.onBeforeMask) && e.onBeforeMask(f.value, e)) ||
              f.value
            ).split("")),
            q(void 0, !1, !1, n ? k.reverse() : k),
            b.isFunction(e.onBeforeWrite) && e.onBeforeWrite(void 0, m(), 0, e),
            f.metadata
              ? {
                  value: n ? m().slice().reverse().join("") : m().join(""),
                  metadata: g({ action: "getmetadata" }, l, e),
                }
              : n
              ? m().slice().reverse().join("")
              : m().join("")
          );
        case "isValid":
          e.numericInput && (n = !0),
            f.value
              ? ((k = f.value.split("")),
                q(void 0, !1, !0, n ? k.reverse() : k))
              : (f.value = m().join(""));
          for (var r = m(), s = y(), p = r.length - 1; p > s && !x(p); p--);
          return r.splice(s, p + 1 - s), u(r) && f.value === m().join("");
        case "getemptymask":
          return w().join("");
        case "remove":
          (z = b((c = f.el))),
            (l = c.inputmask.maskset),
            (e = c.inputmask.opts),
            c.inputmask._valueSet(_(c)),
            A.off(c),
            Object.getOwnPropertyDescriptor && Object.getPrototypeOf
              ? Object.getOwnPropertyDescriptor(
                  Object.getPrototypeOf(c),
                  "value"
                ) &&
                c.inputmask.__valueGet &&
                Object.defineProperty(c, "value", {
                  get: c.inputmask.__valueGet,
                  set: c.inputmask.__valueSet,
                  configurable: !0,
                })
              : document.__lookupGetter__ &&
                c.__lookupGetter__("value") &&
                c.inputmask.__valueGet &&
                (c.__defineGetter__("value", c.inputmask.__valueGet),
                c.__defineSetter__("value", c.inputmask.__valueSet)),
            (c.inputmask = void 0);
          break;
        case "getmetadata":
          if (b.isArray(l.metadata)) {
            for (var t, B = v(void 0, !0), o = B; o >= 0; o--)
              if (
                l.validPositions[o] &&
                void 0 !== l.validPositions[o].alternation
              ) {
                t = l.validPositions[o].alternation;
                break;
              }
            return void 0 !== t
              ? l.metadata[l.validPositions[o].locator[t]]
              : [];
          }
          return l.metadata;
      }
  }

  (a.prototype = {
    defaults: {
      placeholder: "_",
      optionalmarker: { start: "[", end: "]" },
      quantifiermarker: { start: "{", end: "}" },
      groupmarker: { start: "(", end: ")" },
      alternatormarker: "|",
      escapeChar: "\\",
      mask: null,
      oncomplete: b.noop,
      onincomplete: b.noop,
      oncleared: b.noop,
      repeat: 0,
      greedy: !0,
      autoUnmask: !1,
      removeMaskOnSubmit: !1,
      clearMaskOnLostFocus: !0,
      insertMode: !0,
      clearIncomplete: !1,
      aliases: {},
      alias: null,
      onKeyDown: b.noop,
      onBeforeMask: null,
      onBeforePaste: function (c, a) {
        return b.isFunction(a.onBeforeMask) ? a.onBeforeMask(c, a) : c;
      },
      onBeforeWrite: null,
      onUnMask: null,
      showMaskOnFocus: !0,
      showMaskOnHover: !0,
      onKeyValidation: b.noop,
      skipOptionalPartCharacter: " ",
      showTooltip: !1,
      tooltip: void 0,
      numericInput: !1,
      rightAlign: !1,
      undoOnEscape: !0,
      radixPoint: "",
      radixPointDefinitionSymbol: void 0,
      groupSeparator: "",
      keepStatic: null,
      positionCaretOnTab: !0,
      tabThrough: !1,
      supportsInputType: ["text", "tel", "password"],
      definitions: {
        9: { validator: "[0-9]", cardinality: 1, definitionSymbol: "*" },
        a: {
          validator: "[A-Za-z?-???A-y?]",
          cardinality: 1,
          definitionSymbol: "*",
        },
        "*": { validator: "[0-9A-Za-z?-???A-y?]", cardinality: 1 },
      },
      ignorables: [
        8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113,
        114, 115, 116, 117, 118, 119, 120, 121, 122, 123,
      ],
      isComplete: null,
      canClearPosition: b.noop,
      postValidation: null,
      staticDefinitionSymbol: void 0,
      jitMasking: !1,
      nullable: !0,
      inputEventOnly: !1,
      noValuePatching: !1,
      positionCaretOnClick: "lvp",
      casing: null,
      inputmode: "verbatim",
      colorMask: !1,
      androidHack: !1,
    },
    masksCache: {},
    mask: function (c) {
      var d = this;
      return (
        "string" == typeof c &&
          (c = document.getElementById(c) || document.querySelectorAll(c)),
        (c = c.nodeName ? [c] : c),
        b.each(c, function (j, c) {
          var h = b.extend(!0, {}, d.opts);
          (function (k, h, g, l) {
            function j(b, a) {
              null !== (a = void 0 !== a ? a : k.getAttribute(l + "-" + b)) &&
                ("string" == typeof a &&
                  (0 === b.indexOf("on")
                    ? (a = window[a])
                    : "false" === a
                    ? (a = !1)
                    : "true" === a && (a = !0)),
                (g[b] = a));
            }

            var i,
              a,
              c,
              d,
              f = k.getAttribute(l);
            if (
              (f &&
                "" !== f &&
                ((f = f.replace(new RegExp("'", "g"), '"')),
                (a = JSON.parse("{" + f + "}"))),
              a)
            ) {
              for (d in ((c = void 0), a))
                if ("alias" === d.toLowerCase()) {
                  c = a[d];
                  break;
                }
            }
            for (i in (j("alias", c), g.alias && e(g.alias, g, h), h)) {
              if (a) {
                for (d in ((c = void 0), a))
                  if (d.toLowerCase() === i.toLowerCase()) {
                    c = a[d];
                    break;
                  }
              }
              j(i, c);
            }
            b.extend(!0, h, g);
          })(c, h, b.extend(!0, {}, d.userOptions), d.dataAttribute);
          var i = f(h, d.noMasksCache);
          void 0 !== i &&
            (void 0 !== c.inputmask && c.inputmask.remove(),
            (c.inputmask = new a()),
            (c.inputmask.opts = h),
            (c.inputmask.noMasksCache = d.noMasksCache),
            (c.inputmask.userOptions = b.extend(!0, {}, d.userOptions)),
            (c.inputmask.el = c),
            (c.inputmask.maskset = i),
            (c.inputmask.isRTL = !1),
            b.data(c, "_inputmask_opts", h),
            g({
              action: "mask",
              el: c,
            }));
        }),
        (c && c[0] && c[0].inputmask) || this
      );
    },
    option: function (a, c) {
      return "string" == typeof a
        ? this.opts[a]
        : "object" == typeof a
        ? (b.extend(this.userOptions, a),
          this.el && !0 !== c && this.mask(this.el),
          this)
        : void 0;
    },
    unmaskedvalue: function (a) {
      return g(
        {
          action: "unmaskedvalue",
          el: this.el,
          value: a,
        },
        this.el && this.el.inputmask
          ? this.el.inputmask.maskset
          : f(this.opts, this.noMasksCache),
        this.opts
      );
    },
    remove: function () {
      if (this.el)
        return (
          g({ action: "remove", el: this.el }),
          (this.el.inputmask = void 0),
          this.el
        );
    },
    getemptymask: function () {
      return g(
        { action: "getemptymask" },
        this.maskset || f(this.opts, this.noMasksCache),
        this.opts
      );
    },
    hasMaskedValue: function () {
      return !this.opts.autoUnmask;
    },
    isComplete: function () {
      return g(
        { action: "isComplete", el: this.el },
        this.maskset || f(this.opts, this.noMasksCache),
        this.opts
      );
    },
    getmetadata: function () {
      return g(
        { action: "getmetadata" },
        this.maskset || f(this.opts, this.noMasksCache),
        this.opts
      );
    },
    isValid: function (a) {
      return g(
        { action: "isValid", value: a },
        this.maskset || f(this.opts, this.noMasksCache),
        this.opts
      );
    },
    format: function (a, b) {
      return g(
        {
          action: "format",
          value: a,
          metadata: b,
        },
        this.maskset || f(this.opts, this.noMasksCache),
        this.opts
      );
    },
  }),
    (a.extendDefaults = function (c) {
      b.extend(!0, a.prototype.defaults, c);
    }),
    (a.extendDefinitions = function (c) {
      b.extend(!0, a.prototype.defaults.definitions, c);
    }),
    (a.extendAliases = function (c) {
      b.extend(!0, a.prototype.defaults.aliases, c);
    }),
    (a.format = function (b, c, d) {
      return a(c).format(b, d);
    }),
    (a.unmask = function (b, c) {
      return a(c).unmaskedvalue(b);
    }),
    (a.isValid = function (b, c) {
      return a(c).isValid(b);
    }),
    (a.remove = function (a) {
      b.each(a, function (b, a) {
        a.inputmask && a.inputmask.remove();
      });
    }),
    (a.escapeRegex = function (a) {
      return a.replace(
        new RegExp(
          "(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^)",
          "gim"
        ),
        "\\$1"
      );
    }),
    (a.keyCode = {
      ALT: 18,
      BACKSPACE: 8,
      BACKSPACE_SAFARI: 127,
      CAPS_LOCK: 20,
      COMMA: 188,
      COMMAND: 91,
      COMMAND_LEFT: 91,
      COMMAND_RIGHT: 93,
      CONTROL: 17,
      DELETE: 46,
      DOWN: 40,
      END: 35,
      ENTER: 13,
      ESCAPE: 27,
      HOME: 36,
      INSERT: 45,
      LEFT: 37,
      MENU: 93,
      NUMPAD_ADD: 107,
      NUMPAD_DECIMAL: 110,
      NUMPAD_DIVIDE: 111,
      NUMPAD_ENTER: 108,
      NUMPAD_MULTIPLY: 106,
      NUMPAD_SUBTRACT: 109,
      PAGE_DOWN: 34,
      PAGE_UP: 33,
      PERIOD: 190,
      RIGHT: 39,
      SHIFT: 16,
      SPACE: 32,
      TAB: 9,
      UP: 38,
      WINDOWS: 91,
      X: 88,
    }),
    (a.analyseMask = function (w, e) {
      function f(a, b, c, d) {
        (this.matches = []),
          (this.isGroup = a || !1),
          (this.isOptional = b || !1),
          (this.isQuantifier = c || !1),
          (this.isAlternator = d || !1),
          (this.quantifier = {
            min: 1,
            max: 1,
          });
      }

      function z(d, c, f) {
        var a = e.definitions[c];
        f = void 0 !== f ? f : d.matches.length;
        var g = d.matches[f - 1];
        if (a && !v) {
          a.placeholder = b.isFunction(a.placeholder)
            ? a.placeholder(e)
            : a.placeholder;
          for (
            var i = a.prevalidator, l = i ? i.length : 0, h = 1;
            h < a.cardinality;
            h++
          ) {
            var k = l >= h ? i[h - 1] : [],
              j = k.validator,
              m = k.cardinality;
            d.matches.splice(f++, 0, {
              fn: j
                ? "string" == typeof j
                  ? new RegExp(j)
                  : new (function () {
                      this.test = j;
                    })()
                : new RegExp("."),
              cardinality: m || 1,
              optionality: d.isOptional,
              newBlockMarker:
                void 0 === g || g.def !== (a.definitionSymbol || c),
              casing: a.casing,
              def: a.definitionSymbol || c,
              placeholder: a.placeholder,
              nativeDef: c,
            }),
              (g = d.matches[f - 1]);
          }
          d.matches.splice(f++, 0, {
            fn: a.validator
              ? "string" == typeof a.validator
                ? new RegExp(a.validator)
                : new (function () {
                    this.test = a.validator;
                  })()
              : new RegExp("."),
            cardinality: a.cardinality,
            optionality: d.isOptional,
            newBlockMarker: void 0 === g || g.def !== (a.definitionSymbol || c),
            casing: a.casing,
            def: a.definitionSymbol || c,
            placeholder: a.placeholder,
            nativeDef: c,
          });
        } else
          d.matches.splice(f++, 0, {
            fn: null,
            cardinality: 0,
            optionality: d.isOptional,
            newBlockMarker: void 0 === g || g.def !== c,
            casing: null,
            def: e.staticDefinitionSymbol || c,
            placeholder: void 0 !== e.staticDefinitionSymbol ? c : void 0,
            nativeDef: c,
          }),
            (v = !1);
      }

      function u(a, b) {
        a.isGroup &&
          ((a.isGroup = !1),
          z(a, e.groupmarker.start, 0),
          !0 !== b && z(a, e.groupmarker.end));
      }

      function A(c, a, d, b) {
        a.matches.length > 0 &&
          (void 0 === b || b) &&
          u(a.matches[a.matches.length - 1]),
          z(a, c);
      }

      function o() {
        if (a.length > 0) {
          if (
            (A(j, (k = a[a.length - 1]), l, !k.isAlternator), k.isAlternator)
          ) {
            g = a.pop();
            for (var b = 0; b < g.matches.length; b++)
              g.matches[b].isGroup = !1;
            a.length > 0
              ? (k = a[a.length - 1]).matches.push(g)
              : c.matches.push(g);
          }
        } else A(j, c, l);
      }

      function x(a) {
        function d(a) {
          return (
            a === e.optionalmarker.start
              ? (a = e.optionalmarker.end)
              : a === e.optionalmarker.end
              ? (a = e.optionalmarker.start)
              : a === e.groupmarker.start
              ? (a = e.groupmarker.end)
              : a === e.groupmarker.end && (a = e.groupmarker.start),
            a
          );
        }

        for (var b in ((a.matches = a.matches.reverse()), a.matches)) {
          var c = parseInt(b);
          if (
            a.matches[b].isQuantifier &&
            a.matches[c + 1] &&
            a.matches[c + 1].isGroup
          ) {
            var f = a.matches[b];
            a.matches.splice(b, 1), a.matches.splice(c + 1, 0, f);
          }
          void 0 !== a.matches[b].matches
            ? (a.matches[b] = x(a.matches[b]))
            : (a.matches[b] = d(a.matches[b]));
        }
        return a;
      }

      for (
        var d,
          j,
          i,
          k,
          g,
          l,
          m,
          y = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})|[^.?*+^${[]()|\\]+|./g,
          v = !1,
          c = new f(),
          a = [],
          p = [];
        (d = y.exec(w));

      )
        if (((j = d[0]), v)) o();
        else
          switch (j.charAt(0)) {
            case e.escapeChar:
              v = !0;
              break;
            case e.optionalmarker.end:
            case e.groupmarker.end:
              if (void 0 !== (i = a.pop())) {
                if (a.length > 0) {
                  if (((k = a[a.length - 1]).matches.push(i), k.isAlternator)) {
                    g = a.pop();
                    for (var q = 0; q < g.matches.length; q++)
                      g.matches[q].isGroup = !1;
                    a.length > 0
                      ? (k = a[a.length - 1]).matches.push(g)
                      : c.matches.push(g);
                  }
                } else c.matches.push(i);
              } else o();
              break;
            case e.optionalmarker.start:
              a.push(new f(!1, !0));
              break;
            case e.groupmarker.start:
              a.push(new f(!0));
              break;
            case e.quantifiermarker.start:
              var r = new f(!1, !1, !0),
                h = (j = j.replace(/[{}]/g, "")).split(","),
                s = isNaN(h[0]) ? h[0] : parseInt(h[0]),
                n = 1 === h.length ? s : isNaN(h[1]) ? h[1] : parseInt(h[1]);
              if (
                (("*" !== n && "+" !== n) || (s = "*" === n ? 0 : 1),
                (r.quantifier = { min: s, max: n }),
                a.length > 0)
              ) {
                var t = a[a.length - 1].matches;
                (d = t.pop()).isGroup ||
                  ((m = new f(!0)).matches.push(d), (d = m)),
                  t.push(d),
                  t.push(r);
              } else
                (d = c.matches.pop()).isGroup ||
                  ((m = new f(!0)).matches.push(d), (d = m)),
                  c.matches.push(d),
                  c.matches.push(r);
              break;
            case e.alternatormarker:
              (l =
                a.length > 0
                  ? (k = a[a.length - 1]).matches.pop()
                  : c.matches.pop()).isAlternator
                ? a.push(l)
                : ((g = new f(!1, !1, !1, !0)).matches.push(l), a.push(g));
              break;
            default:
              o();
          }
      for (; a.length > 0; ) u((i = a.pop()), !0), c.matches.push(i);
      return (
        c.matches.length > 0 &&
          (u((l = c.matches[c.matches.length - 1])), p.push(c)),
        e.numericInput && x(p[0]),
        p
      );
    });
  var c = navigator.userAgent,
    h = /mobile/i.test(c),
    d = /iemobile/i.test(c),
    i = /iphone/i.test(c) && !d,
    j = /android/i.test(c) && !d;
  return (window.Inputmask = a), a;
})(jQuery),
  (function (a, b) {
    void 0 === a.fn.inputmask &&
      (a.fn.inputmask = function (d, e) {
        var f,
          c = this[0];
        if ((void 0 === e && (e = {}), "string" == typeof d))
          switch (d) {
            case "unmaskedvalue":
              return c && c.inputmask
                ? c.inputmask.unmaskedvalue()
                : a(c).val();
            case "remove":
              return this.each(function () {
                this.inputmask && this.inputmask.remove();
              });
            case "getemptymask":
              return c && c.inputmask ? c.inputmask.getemptymask() : "";
            case "hasMaskedValue":
              return !(!c || !c.inputmask) && c.inputmask.hasMaskedValue();
            case "isComplete":
              return !c || !c.inputmask || c.inputmask.isComplete();
            case "getmetadata":
              return c && c.inputmask ? c.inputmask.getmetadata() : void 0;
            case "setvalue":
              a(c).val(e),
                c && void 0 === c.inputmask && a(c).triggerHandler("setvalue");
              break;
            case "option":
              if ("string" != typeof e)
                return this.each(function () {
                  if (void 0 !== this.inputmask)
                    return this.inputmask.option(e);
                });
              if (c && void 0 !== c.inputmask) return c.inputmask.option(e);
              break;
            default:
              return (
                (e.alias = d),
                (f = new b(e)),
                this.each(function () {
                  f.mask(this);
                })
              );
          }
        else {
          if ("object" == typeof d)
            return (
              (f = new b(d)),
              void 0 === d.mask && void 0 === d.alias
                ? this.each(function () {
                    return void 0 !== this.inputmask
                      ? this.inputmask.option(d)
                      : void f.mask(this);
                  })
                : this.each(function () {
                    f.mask(this);
                  })
            );
          if (void 0 === d)
            return this.each(function () {
              (f = new b(e)).mask(this);
            });
        }
      }),
      a.fn.inputmask;
  })(jQuery, Inputmask),
  (function (b, a) {
    a.extendAliases({
      "dd/mm/yyyy": {
        mask: "1/2/y",
        placeholder: "dd/mm/yyyy",
        regex: {
          val1pre: /[0-3]/,
          val1: new RegExp("0[1-9]|[12][0-9]|3[01]"),
          val2pre: function (b) {
            var c = a.escapeRegex.call(this, b);
            return new RegExp("((0[1-9]|[12][0-9]|3[01])" + c + "[01])");
          },
          val2: function (c) {
            var b = a.escapeRegex.call(this, c);
            return new RegExp(
              "((0[1-9]|[12][0-9])" +
                b +
                "(0[1-9]|1[012]))|(30" +
                b +
                "(0[13-9]|1[012]))|(31" +
                b +
                "(0[13578]|1[02]))"
            );
          },
        },
        leapday: "29/02/",
        separator: "/",
        yearrange: { minyear: 1900, maxyear: 2099 },
        isInYearRange: function (a, b, c) {
          if (isNaN(a)) return !1;
          var d = parseInt(a.concat(b.toString().slice(a.length))),
            e = parseInt(a.concat(c.toString().slice(a.length)));
          return (
            (!isNaN(d) && b <= d && d <= c) || (!isNaN(e) && b <= e && e <= c)
          );
        },
        determinebaseyear: function (a, b, d) {
          var c = new Date().getFullYear();
          if (a > c) return a;
          if (b < c) {
            for (
              var e = b.toString().slice(0, 2), i = b.toString().slice(2, 4);
              b < e + d;

            )
              e--;
            var g = e + i;
            return a > g ? a : g;
          }
          if (a <= c && c <= b) {
            for (var f = c.toString().slice(0, 2); b < f + d; ) f--;
            var h = f + d;
            return h < a ? a : h;
          }
          return c;
        },
        onKeyDown: function (d, f, g, h) {
          var e = b(this);
          if (d.ctrlKey && d.keyCode === a.keyCode.RIGHT) {
            var c = new Date();
            e.val(
              c.getDate().toString() +
                (c.getMonth() + 1).toString() +
                c.getFullYear().toString()
            ),
              e.trigger("setvalue");
          }
        },
        getFrontValue: function (c, f, g) {
          for (
            var d = 0, a = 0, b = 0;
            b < c.length && "2" !== c.charAt(b);
            b++
          ) {
            var e = g.definitions[c.charAt(b)];
            e ? ((d += a), (a = e.cardinality)) : a++;
          }
          return f.join("").substr(d, a);
        },
        postValidation: function (f, g, d) {
          var b,
            c,
            e,
            a = f.join("");
          return (
            0 === d.mask.indexOf("y")
              ? ((c = a.substr(0, 4)), (b = a.substr(4, 11)))
              : ((c = a.substr(6, 11)), (b = a.substr(0, 6))),
            g &&
              (b !== d.leapday ||
                isNaN((e = c)) ||
                29 === new Date(e, 2, 0).getDate())
          );
        },
        definitions: {
          1: {
            validator: function (a, e, b, f, c) {
              var d = c.regex.val1.test(a);
              return !f &&
                !d &&
                (a.charAt(1) === c.separator ||
                  -1 !== "-./".indexOf(a.charAt(1))) &&
                (d = c.regex.val1.test("0" + a.charAt(0)))
                ? ((e.buffer[b - 1] = "0"),
                  {
                    refreshFromBuffer: {
                      start: b - 1,
                      end: b,
                    },
                    pos: b,
                    c: a.charAt(0),
                  })
                : d;
            },
            cardinality: 2,
            prevalidator: [
              {
                validator: function (c, b, a, g, d) {
                  var e = c;
                  isNaN(b.buffer[a + 1]) || (e += b.buffer[a + 1]);
                  var f =
                    1 === e.length
                      ? d.regex.val1pre.test(e)
                      : d.regex.val1.test(e);
                  if (!g && !f) {
                    if ((f = d.regex.val1.test(c + "0")))
                      return (
                        (b.buffer[a] = c),
                        (b.buffer[++a] = "0"),
                        {
                          pos: a,
                          c: "0",
                        }
                      );
                    if ((f = d.regex.val1.test("0" + c)))
                      return (b.buffer[a] = "0"), { pos: ++a };
                  }
                  return f;
                },
                cardinality: 1,
              },
            ],
          },
          2: {
            validator: function (b, e, c, g, a) {
              var d = a.getFrontValue(e.mask, e.buffer, a);
              -1 !== d.indexOf(a.placeholder[0]) && (d = "01" + a.separator);
              var f = a.regex.val2(a.separator).test(d + b);
              return !g &&
                !f &&
                (b.charAt(1) === a.separator ||
                  -1 !== "-./".indexOf(b.charAt(1))) &&
                (f = a.regex.val2(a.separator).test(d + "0" + b.charAt(0)))
                ? ((e.buffer[c - 1] = "0"),
                  {
                    refreshFromBuffer: {
                      start: c - 1,
                      end: c,
                    },
                    pos: c,
                    c: b.charAt(0),
                  })
                : f;
            },
            cardinality: 2,
            prevalidator: [
              {
                validator: function (b, c, e, g, a) {
                  isNaN(c.buffer[e + 1]) || (b += c.buffer[e + 1]);
                  var d = a.getFrontValue(c.mask, c.buffer, a);
                  -1 !== d.indexOf(a.placeholder[0]) &&
                    (d = "01" + a.separator);
                  var f =
                    1 === b.length
                      ? a.regex.val2pre(a.separator).test(d + b)
                      : a.regex.val2(a.separator).test(d + b);
                  return !g &&
                    !f &&
                    (f = a.regex.val2(a.separator).test(d + "0" + b))
                    ? ((c.buffer[e] = "0"), { pos: ++e })
                    : f;
                },
                cardinality: 1,
              },
            ],
          },
          y: {
            validator: function (b, c, d, e, a) {
              return a.isInYearRange(
                b,
                a.yearrange.minyear,
                a.yearrange.maxyear
              );
            },
            cardinality: 4,
            prevalidator: [
              {
                validator: function (c, f, d, g, a) {
                  var e = a.isInYearRange(
                    c,
                    a.yearrange.minyear,
                    a.yearrange.maxyear
                  );
                  if (!g && !e) {
                    var b = a
                      .determinebaseyear(
                        a.yearrange.minyear,
                        a.yearrange.maxyear,
                        c + "0"
                      )
                      .toString()
                      .slice(0, 1);
                    if (
                      (e = a.isInYearRange(
                        b + c,
                        a.yearrange.minyear,
                        a.yearrange.maxyear
                      ))
                    )
                      return (f.buffer[d++] = b.charAt(0)), { pos: d };
                    if (
                      ((b = a
                        .determinebaseyear(
                          a.yearrange.minyear,
                          a.yearrange.maxyear,
                          c + "0"
                        )
                        .toString()
                        .slice(0, 2)),
                      (e = a.isInYearRange(
                        b + c,
                        a.yearrange.minyear,
                        a.yearrange.maxyear
                      )))
                    )
                      return (
                        (f.buffer[d++] = b.charAt(0)),
                        (f.buffer[d++] = b.charAt(1)),
                        { pos: d }
                      );
                  }
                  return e;
                },
                cardinality: 1,
              },
              {
                validator: function (c, e, b, g, a) {
                  var f = a.isInYearRange(
                    c,
                    a.yearrange.minyear,
                    a.yearrange.maxyear
                  );
                  if (!g && !f) {
                    var d = a
                      .determinebaseyear(
                        a.yearrange.minyear,
                        a.yearrange.maxyear,
                        c
                      )
                      .toString()
                      .slice(0, 2);
                    if (
                      (f = a.isInYearRange(
                        c[0] + d[1] + c[1],
                        a.yearrange.minyear,
                        a.yearrange.maxyear
                      ))
                    )
                      return (e.buffer[b++] = d.charAt(1)), { pos: b };
                    if (
                      ((d = a
                        .determinebaseyear(
                          a.yearrange.minyear,
                          a.yearrange.maxyear,
                          c
                        )
                        .toString()
                        .slice(0, 2)),
                      (f = a.isInYearRange(
                        d + c,
                        a.yearrange.minyear,
                        a.yearrange.maxyear
                      )))
                    )
                      return (
                        (e.buffer[b - 1] = d.charAt(0)),
                        (e.buffer[b++] = d.charAt(1)),
                        (e.buffer[b++] = c.charAt(0)),
                        {
                          refreshFromBuffer: {
                            start: b - 3,
                            end: b,
                          },
                          pos: b,
                        }
                      );
                  }
                  return f;
                },
                cardinality: 2,
              },
              {
                validator: function (b, c, d, e, a) {
                  return a.isInYearRange(
                    b,
                    a.yearrange.minyear,
                    a.yearrange.maxyear
                  );
                },
                cardinality: 3,
              },
            ],
          },
        },
        insertMode: !1,
        autoUnmask: !1,
      },
      "mm/dd/yyyy": {
        placeholder: "mm/dd/yyyy",
        alias: "dd/mm/yyyy",
        regex: {
          val2pre: function (c) {
            var b = a.escapeRegex.call(this, c);
            return new RegExp(
              "((0[13-9]|1[012])" + b + "[0-3])|(02" + b + "[0-2])"
            );
          },
          val2: function (c) {
            var b = a.escapeRegex.call(this, c);
            return new RegExp(
              "((0[1-9]|1[012])" +
                b +
                "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" +
                b +
                "30)|((0[13578]|1[02])" +
                b +
                "31)"
            );
          },
          val1pre: /[01]/,
          val1: new RegExp("0[1-9]|1[012]"),
        },
        leapday: "02/29/",
        onKeyDown: function (d, f, g, h) {
          var e = b(this);
          if (d.ctrlKey && d.keyCode === a.keyCode.RIGHT) {
            var c = new Date();
            e.val(
              (c.getMonth() + 1).toString() +
                c.getDate().toString() +
                c.getFullYear().toString()
            ),
              e.trigger("setvalue");
          }
        },
      },
      "yyyy/mm/dd": {
        mask: "y/1/2",
        placeholder: "yyyy/mm/dd",
        alias: "mm/dd/yyyy",
        leapday: "/02/29",
        onKeyDown: function (d, f, g, h) {
          var e = b(this);
          if (d.ctrlKey && d.keyCode === a.keyCode.RIGHT) {
            var c = new Date();
            e.val(
              c.getFullYear().toString() +
                (c.getMonth() + 1).toString() +
                c.getDate().toString()
            ),
              e.trigger("setvalue");
          }
        },
      },
      "dd.mm.yyyy": {
        mask: "1.2.y",
        placeholder: "dd.mm.yyyy",
        leapday: "29.02.",
        separator: ".",
        alias: "dd/mm/yyyy",
      },
      "dd-mm-yyyy": {
        mask: "1-2-y",
        placeholder: "dd-mm-yyyy",
        leapday: "29-02-",
        separator: "-",
        alias: "dd/mm/yyyy",
      },
      "mm.dd.yyyy": {
        mask: "1.2.y",
        placeholder: "mm.dd.yyyy",
        leapday: "02.29.",
        separator: ".",
        alias: "mm/dd/yyyy",
      },
      "mm-dd-yyyy": {
        mask: "1-2-y",
        placeholder: "mm-dd-yyyy",
        leapday: "02-29-",
        separator: "-",
        alias: "mm/dd/yyyy",
      },
      "yyyy.mm.dd": {
        mask: "y.1.2",
        placeholder: "yyyy.mm.dd",
        leapday: ".02.29",
        separator: ".",
        alias: "yyyy/mm/dd",
      },
      "yyyy-mm-dd": {
        mask: "y-1-2",
        placeholder: "yyyy-mm-dd",
        leapday: "-02-29",
        separator: "-",
        alias: "yyyy/mm/dd",
      },
      datetime: {
        mask: "1/2/y h:s",
        placeholder: "dd/mm/yyyy hh:mm",
        alias: "dd/mm/yyyy",
        regex: {
          hrspre: /[012]/,
          hrs24: new RegExp("2[0-4]|1[3-9]"),
          hrs: new RegExp("[01][0-9]|2[0-4]"),
          ampm: new RegExp("^[a|p|A|P][m|M]"),
          mspre: /[0-5]/,
          ms: /[0-5][0-9]/,
        },
        timeseparator: ":",
        hourFormat: "24",
        definitions: {
          h: {
            validator: function (c, b, a, g, d) {
              if ("24" === d.hourFormat && 24 === parseInt(c, 10))
                return (
                  (b.buffer[a - 1] = "0"),
                  (b.buffer[a] = "0"),
                  {
                    refreshFromBuffer: {
                      start: a - 1,
                      end: a,
                    },
                    c: "0",
                  }
                );
              var f = d.regex.hrs.test(c);
              if (
                !g &&
                !f &&
                (c.charAt(1) === d.timeseparator ||
                  -1 !== "-.:".indexOf(c.charAt(1))) &&
                (f = d.regex.hrs.test("0" + c.charAt(0)))
              )
                return (
                  (b.buffer[a - 1] = "0"),
                  (b.buffer[a] = c.charAt(0)),
                  {
                    refreshFromBuffer: {
                      start: ++a - 2,
                      end: a,
                    },
                    pos: a,
                    c: d.timeseparator,
                  }
                );
              if (f && "24" !== d.hourFormat && d.regex.hrs24.test(c)) {
                var e = parseInt(c, 10);
                return (
                  24 === e
                    ? ((b.buffer[a + 5] = "a"), (b.buffer[a + 6] = "m"))
                    : ((b.buffer[a + 5] = "p"), (b.buffer[a + 6] = "m")),
                  (e -= 12) < 10
                    ? ((b.buffer[a] = e.toString()), (b.buffer[a - 1] = "0"))
                    : ((b.buffer[a] = e.toString().charAt(1)),
                      (b.buffer[a - 1] = e.toString().charAt(0))),
                  {
                    refreshFromBuffer: {
                      start: a - 1,
                      end: a + 6,
                    },
                    c: b.buffer[a],
                  }
                );
              }
              return f;
            },
            cardinality: 2,
            prevalidator: [
              {
                validator: function (b, e, c, f, d) {
                  var a = d.regex.hrspre.test(b);
                  return !f && !a && (a = d.regex.hrs.test("0" + b))
                    ? ((e.buffer[c] = "0"), { pos: ++c })
                    : a;
                },
                cardinality: 1,
              },
            ],
          },
          s: {
            validator: "[0-5][0-9]",
            cardinality: 2,
            prevalidator: [
              {
                validator: function (b, e, c, f, d) {
                  var a = d.regex.mspre.test(b);
                  return !f && !a && (a = d.regex.ms.test("0" + b))
                    ? ((e.buffer[c] = "0"), { pos: ++c })
                    : a;
                },
                cardinality: 1,
              },
            ],
          },
          t: {
            validator: function (a, c, d, e, b) {
              return b.regex.ampm.test(a + "m");
            },
            casing: "lower",
            cardinality: 1,
          },
        },
        insertMode: !1,
        autoUnmask: !1,
      },
      datetime12: {
        mask: "1/2/y h:s t\\m",
        placeholder: "dd/mm/yyyy hh:mm xm",
        alias: "datetime",
        hourFormat: "12",
      },
      "mm/dd/yyyy hh:mm xm": {
        mask: "1/2/y h:s t\\m",
        placeholder: "mm/dd/yyyy hh:mm xm",
        alias: "datetime12",
        regex: {
          val2pre: function (c) {
            var b = a.escapeRegex.call(this, c);
            return new RegExp(
              "((0[13-9]|1[012])" + b + "[0-3])|(02" + b + "[0-2])"
            );
          },
          val2: function (c) {
            var b = a.escapeRegex.call(this, c);
            return new RegExp(
              "((0[1-9]|1[012])" +
                b +
                "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" +
                b +
                "30)|((0[13578]|1[02])" +
                b +
                "31)"
            );
          },
          val1pre: /[01]/,
          val1: new RegExp("0[1-9]|1[012]"),
        },
        leapday: "02/29/",
        onKeyDown: function (d, f, g, h) {
          var e = b(this);
          if (d.ctrlKey && d.keyCode === a.keyCode.RIGHT) {
            var c = new Date();
            e.val(
              (c.getMonth() + 1).toString() +
                c.getDate().toString() +
                c.getFullYear().toString()
            ),
              e.trigger("setvalue");
          }
        },
      },
      "hh:mm t": {
        mask: "h:s t\\m",
        placeholder: "hh:mm xm",
        alias: "datetime",
        hourFormat: "12",
      },
      "h:s t": {
        mask: "h:s t\\m",
        placeholder: "hh:mm xm",
        alias: "datetime",
        hourFormat: "12",
      },
      "hh:mm:ss": {
        mask: "h:s:s",
        placeholder: "hh:mm:ss",
        alias: "datetime",
        autoUnmask: !1,
      },
      "hh:mm": {
        mask: "h:s",
        placeholder: "hh:mm",
        alias: "datetime",
        autoUnmask: !1,
      },
      date: { alias: "dd/mm/yyyy" },
      "mm/yyyy": {
        mask: "1/y",
        placeholder: "mm/yyyy",
        leapday: "donotuse",
        separator: "/",
        alias: "mm/dd/yyyy",
      },
      shamsi: {
        regex: {
          val2pre: function (b) {
            var c = a.escapeRegex.call(this, b);
            return new RegExp("((0[1-9]|1[012])" + c + "[0-3])");
          },
          val2: function (c) {
            var b = a.escapeRegex.call(this, c);
            return new RegExp(
              "((0[1-9]|1[012])" +
                b +
                "(0[1-9]|[12][0-9]))|((0[1-9]|1[012])" +
                b +
                "30)|((0[1-6])" +
                b +
                "31)"
            );
          },
          val1pre: /[01]/,
          val1: new RegExp("0[1-9]|1[012]"),
        },
        yearrange: { minyear: 1300, maxyear: 1499 },
        mask: "y/1/2",
        leapday: "/12/30",
        placeholder: "yyyy/mm/dd",
        alias: "mm/dd/yyyy",
        clearIncomplete: !0,
      },
    });
  })(jQuery, Inputmask),
  (function (b, a) {
    a.extendDefinitions({
      A: { validator: "[A-Za-z?-???A-y?]", cardinality: 1, casing: "upper" },
      "&": {
        validator: "[0-9A-Za-z?-???A-y?]",
        cardinality: 1,
        casing: "upper",
      },
      "#": { validator: "[0-9A-Fa-f]", cardinality: 1, casing: "upper" },
    }),
      a.extendAliases({
        url: {
          definitions: { i: { validator: ".", cardinality: 1 } },
          mask: "(\\http://)|(\\http\\s://)|(ftp://)|(ftp\\s://)i{+}",
          insertMode: !1,
          autoUnmask: !1,
          inputmode: "url",
        },
        ip: {
          mask: "i[i[i]].i[i[i]].i[i[i]].i[i[i]]",
          definitions: {
            i: {
              validator: function (a, c, b, d, e) {
                return (
                  b - 1 > -1 && "." !== c.buffer[b - 1]
                    ? ((a = c.buffer[b - 1] + a),
                      (a =
                        b - 2 > -1 && "." !== c.buffer[b - 2]
                          ? c.buffer[b - 2] + a
                          : "0" + a))
                    : (a = "00" + a),
                  new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(a)
                );
              },
              cardinality: 1,
            },
          },
          onUnMask: function (a, b, c) {
            return a;
          },
          inputmode: "numeric",
        },
        email: {
          mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
          greedy: !1,
          onBeforePaste: function (a, b) {
            return (a = a.toLowerCase()).replace("mailto:", "");
          },
          definitions: {
            "*": {
              validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",
              cardinality: 1,
              casing: "lower",
            },
            "-": { validator: "[0-9A-Za-z-]", cardinality: 1, casing: "lower" },
          },
          onUnMask: function (a, b, c) {
            return a;
          },
          inputmode: "email",
        },
        mac: { mask: "##:##:##:##:##:##" },
        vin: {
          mask: "V{13}9{4}",
          definitions: {
            V: {
              validator: "[A-HJ-NPR-Za-hj-npr-z\\d]",
              cardinality: 1,
              casing: "upper",
            },
          },
          clearIncomplete: !0,
          autoUnmask: !0,
        },
      });
  })(jQuery, Inputmask),
  (function (b, a) {
    a.extendAliases({
      numeric: {
        mask: function (b) {
          function e(c) {
            for (var d = "", a = 0; a < c.length; a++)
              d +=
                b.definitions[c.charAt(a)] ||
                b.optionalmarker.start === c.charAt(a) ||
                b.optionalmarker.end === c.charAt(a) ||
                b.quantifiermarker.start === c.charAt(a) ||
                b.quantifiermarker.end === c.charAt(a) ||
                b.groupmarker.start === c.charAt(a) ||
                b.groupmarker.end === c.charAt(a) ||
                b.alternatormarker === c.charAt(a)
                  ? "\\" + c.charAt(a)
                  : c.charAt(a);
            return d;
          }

          if (
            (0 !== b.repeat &&
              isNaN(b.integerDigits) &&
              (b.integerDigits = b.repeat),
            (b.repeat = 0),
            b.groupSeparator === b.radixPoint &&
              ("." === b.radixPoint
                ? (b.groupSeparator = ",")
                : "," === b.radixPoint
                ? (b.groupSeparator = ".")
                : (b.groupSeparator = "")),
            " " === b.groupSeparator && (b.skipOptionalPartCharacter = void 0),
            (b.autoGroup = b.autoGroup && "" !== b.groupSeparator),
            b.autoGroup &&
              ("string" == typeof b.groupSize &&
                isFinite(b.groupSize) &&
                (b.groupSize = parseInt(b.groupSize)),
              isFinite(b.integerDigits)))
          ) {
            var f = Math.floor(b.integerDigits / b.groupSize),
              g = b.integerDigits % b.groupSize;
            (b.integerDigits =
              parseInt(b.integerDigits) + (0 === g ? f - 1 : f)),
              b.integerDigits < 1 && (b.integerDigits = "*");
          }
          b.placeholder.length > 1 && (b.placeholder = b.placeholder.charAt(0)),
            "radixFocus" === b.positionCaretOnClick &&
              "" === b.placeholder &&
              !1 === b.integerOptional &&
              (b.positionCaretOnClick = "lvp"),
            (b.definitions[";"] = b.definitions["~"]),
            (b.definitions[";"].definitionSymbol = "~"),
            !0 === b.numericInput &&
              ((b.positionCaretOnClick =
                "radixFocus" === b.positionCaretOnClick
                  ? "lvp"
                  : b.positionCaretOnClick),
              (b.digitsOptional = !1),
              isNaN(b.digits) && (b.digits = 2),
              (b.decimalProtect = !1));
          var c = "[+]";
          if (
            ((c += e(b.prefix)),
            (c +=
              !0 === b.integerOptional
                ? "~{1," + b.integerDigits + "}"
                : "~{" + b.integerDigits + "}"),
            void 0 !== b.digits)
          ) {
            b.decimalProtect && (b.radixPointDefinitionSymbol = ":");
            var d = b.digits.toString().split(",");
            isFinite(d[0] && d[1] && isFinite(d[1]))
              ? (c +=
                  (b.decimalProtect ? ":" : b.radixPoint) +
                  ";{" +
                  b.digits +
                  "}")
              : (isNaN(b.digits) || parseInt(b.digits) > 0) &&
                (c += b.digitsOptional
                  ? "[" +
                    (b.decimalProtect ? ":" : b.radixPoint) +
                    ";{1," +
                    b.digits +
                    "}]"
                  : (b.decimalProtect ? ":" : b.radixPoint) +
                    ";{" +
                    b.digits +
                    "}");
          }
          return (
            (c += e(b.suffix)),
            (c += "[-]"),
            (b.greedy = !1),
            null !== b.min &&
              ((b.min = b.min
                .toString()
                .replace(new RegExp(a.escapeRegex(b.groupSeparator), "g"), "")),
              "," === b.radixPoint &&
                (b.min = b.min.replace(b.radixPoint, "."))),
            null !== b.max &&
              ((b.max = b.max
                .toString()
                .replace(new RegExp(a.escapeRegex(b.groupSeparator), "g"), "")),
              "," === b.radixPoint &&
                (b.max = b.max.replace(b.radixPoint, "."))),
            c
          );
        },
        placeholder: "",
        greedy: !1,
        digits: "*",
        digitsOptional: !0,
        radixPoint: ".",
        positionCaretOnClick: "radixFocus",
        groupSize: 3,
        groupSeparator: "",
        autoGroup: !1,
        allowPlus: !0,
        allowMinus: !0,
        negationSymbol: { front: "-", back: "" },
        integerDigits: "+",
        integerOptional: !0,
        prefix: "",
        suffix: "",
        rightAlign: !0,
        decimalProtect: !0,
        min: null,
        max: null,
        step: 1,
        insertMode: !0,
        autoUnmask: !1,
        unmaskAsNumber: !1,
        inputmode: "numeric",
        postFormat: function (e, f, c) {
          !0 === c.numericInput &&
            ((e = e.reverse()), isFinite(f) && (f = e.join("").length - f - 1)),
            (f = f >= e.length ? e.length - 1 : f < 0 ? 0 : f);
          var k,
            m,
            i = e[f],
            h = e.slice();
          i === c.groupSeparator && (h.splice(f--, 1), (i = h[f]));
          var j = h
            .join("")
            .match(new RegExp("^" + a.escapeRegex(c.negationSymbol.front)));
          f >
            ((j = null !== j && 1 === j.length)
              ? c.negationSymbol.front.length
              : 0) +
              c.prefix.length &&
            f < h.length - c.suffix.length &&
            (h[f] = "!");
          var d = h.join(""),
            p = h.join();
          if (
            (j &&
              (d = (d = d.replace(
                new RegExp("^" + a.escapeRegex(c.negationSymbol.front)),
                ""
              )).replace(
                new RegExp(a.escapeRegex(c.negationSymbol.back) + "$"),
                ""
              )),
            ((d = (d = d.replace(
              new RegExp(a.escapeRegex(c.suffix) + "$"),
              ""
            )).replace(new RegExp("^" + a.escapeRegex(c.prefix)), "")).length >
              0 &&
              c.autoGroup) ||
              -1 !== d.indexOf(c.groupSeparator))
          ) {
            var q = a.escapeRegex(c.groupSeparator),
              l = (d = d.replace(new RegExp(q, "g"), "")).split(
                i === c.radixPoint ? "!" : c.radixPoint
              );
            if (
              ((d = "" === c.radixPoint ? d : l[0]),
              i !== c.negationSymbol.front && (d = d.replace("!", "?")),
              d.length > c.groupSize)
            )
              for (
                var n = new RegExp(
                  "([-+]?[\\d?]+)([\\d?]{" + c.groupSize + "})"
                );
                n.test(d) && "" !== c.groupSeparator;

              )
                d = (d = d.replace(n, "$1" + c.groupSeparator + "$2")).replace(
                  c.groupSeparator + c.groupSeparator,
                  c.groupSeparator
                );
            (d = d.replace("?", "!")),
              "" !== c.radixPoint &&
                l.length > 1 &&
                (d += (i === c.radixPoint ? "!" : c.radixPoint) + l[1]);
          }
          (d = c.prefix + d + c.suffix),
            j && (d = c.negationSymbol.front + d + c.negationSymbol.back);
          var o = p !== d.split("").join(),
            g = b.inArray("!", d);
          if ((-1 === g && (g = f), o)) {
            for (e.length = d.length, k = 0, m = d.length; k < m; k++)
              e[k] = d.charAt(k);
            e[g] = i;
          }
          return (
            (g = c.numericInput && isFinite(f) ? e.join("").length - g - 1 : g),
            c.numericInput &&
              ((e = e.reverse()),
              b.inArray(c.radixPoint, e) < g &&
                e.join("").length - c.suffix.length !== g &&
                (g -= 1)),
            {
              pos: g,
              refreshFromBuffer: o,
              buffer: e,
              isNegative: j,
            }
          );
        },
        onBeforeWrite: function (l, m, j, c) {
          var e;
          if (
            l &&
            ("blur" === l.type || "checkval" === l.type || "keydown" === l.type)
          ) {
            var k = c.numericInput ? m.slice().reverse().join("") : m.join(""),
              d = k.replace(c.prefix, "");
            (d = (d = d.replace(c.suffix, "")).replace(
              new RegExp(a.escapeRegex(c.groupSeparator), "g"),
              ""
            )),
              "," === c.radixPoint && (d = d.replace(c.radixPoint, "."));
            var g = d.match(
              new RegExp(
                "[-" + a.escapeRegex(c.negationSymbol.front) + "]",
                "g"
              )
            );
            if (
              ((g = null !== g && 1 === g.length),
              (d = (d = d.replace(
                new RegExp(
                  "[-" + a.escapeRegex(c.negationSymbol.front) + "]",
                  "g"
                ),
                ""
              )).replace(
                new RegExp(a.escapeRegex(c.negationSymbol.back) + "$"),
                ""
              )),
              isNaN(c.placeholder) &&
                (d = d.replace(
                  new RegExp(a.escapeRegex(c.placeholder), "g"),
                  ""
                )),
              "" !== (d = d === c.negationSymbol.front ? d + "0" : d) &&
                isFinite(d))
            ) {
              var h = parseFloat(d),
                o = g ? -1 * h : h;
              if (
                (null !== c.min && isFinite(c.min) && o < parseFloat(c.min)
                  ? ((h = Math.abs(c.min)), (g = c.min < 0), (k = void 0))
                  : null !== c.max &&
                    isFinite(c.max) &&
                    o > parseFloat(c.max) &&
                    ((h = Math.abs(c.max)), (g = c.max < 0), (k = void 0)),
                (d = h.toString().replace(".", c.radixPoint).split("")),
                isFinite(c.digits))
              ) {
                var i = b.inArray(c.radixPoint, d),
                  n = b.inArray(c.radixPoint, k);
                -1 === i && (d.push(c.radixPoint), (i = d.length - 1));
                for (var f = 1; f <= c.digits; f++)
                  c.digitsOptional ||
                  (void 0 !== d[i + f] && d[i + f] !== c.placeholder.charAt(0))
                    ? -1 !== n &&
                      void 0 !== k[n + f] &&
                      (d[i + f] = d[i + f] || k[n + f])
                    : (d[i + f] = "0");
                d[d.length - 1] === c.radixPoint && delete d[d.length - 1];
              }
              if ((h.toString() !== d && h.toString() + "." !== d) || g)
                return (
                  (d = (c.prefix + d.join("")).split("")),
                  g &&
                    (0 !== h || "blur" !== l.type) &&
                    (d.unshift(c.negationSymbol.front),
                    d.push(c.negationSymbol.back)),
                  c.numericInput && (d = d.reverse()),
                  (e = c.postFormat(d, c.numericInput ? j : j - 1, c)).buffer &&
                    (e.refreshFromBuffer = e.buffer.join("") !== m.join("")),
                  e
                );
            }
          }
          if (c.autoGroup)
            return (
              ((e = c.postFormat(m, c.numericInput ? j : j - 1, c)).caret =
                j <
                  (e.isNegative ? c.negationSymbol.front.length : 0) +
                    c.prefix.length ||
                j >
                  e.buffer.length -
                    (e.isNegative ? c.negationSymbol.back.length : 0)
                  ? e.pos
                  : e.pos + 1),
              e
            );
        },
        regex: {
          integerPart: function (b) {
            return new RegExp(
              "[" + a.escapeRegex(b.negationSymbol.front) + "+]?\\d+"
            );
          },
          integerNPart: function (b) {
            return new RegExp(
              "[\\d" +
                a.escapeRegex(b.groupSeparator) +
                a.escapeRegex(b.placeholder.charAt(0)) +
                "]+"
            );
          },
        },
        signHandler: function (c, d, b, f, a) {
          if ((!f && a.allowMinus && "-" === c) || (a.allowPlus && "+" === c)) {
            var e = d.buffer.join("").match(a.regex.integerPart(a));
            if (e && e[0].length > 0)
              return d.buffer[e.index] ===
                ("-" === c ? "+" : a.negationSymbol.front)
                ? "-" === c
                  ? "" !== a.negationSymbol.back
                    ? {
                        pos: 0,
                        c: a.negationSymbol.front,
                        remove: 0,
                        caret: b,
                        insert: {
                          pos: d.buffer.length - 1,
                          c: a.negationSymbol.back,
                        },
                      }
                    : {
                        pos: 0,
                        c: a.negationSymbol.front,
                        remove: 0,
                        caret: b,
                      }
                  : "" !== a.negationSymbol.back
                  ? {
                      pos: 0,
                      c: "+",
                      remove: [0, d.buffer.length - 1],
                      caret: b,
                    }
                  : {
                      pos: 0,
                      c: "+",
                      remove: 0,
                      caret: b,
                    }
                : d.buffer[0] === ("-" === c ? a.negationSymbol.front : "+")
                ? "-" === c && "" !== a.negationSymbol.back
                  ? {
                      remove: [0, d.buffer.length - 1],
                      caret: b - 1,
                    }
                  : { remove: 0, caret: b - 1 }
                : "-" === c
                ? "" !== a.negationSymbol.back
                  ? {
                      pos: 0,
                      c: a.negationSymbol.front,
                      caret: b + 1,
                      insert: {
                        pos: d.buffer.length,
                        c: a.negationSymbol.back,
                      },
                    }
                  : { pos: 0, c: a.negationSymbol.front, caret: b + 1 }
                : { pos: 0, c: c, caret: b + 1 };
          }
          return !1;
        },
        radixHandler: function (g, d, f, h, a) {
          if (
            !h &&
            !0 !== a.numericInput &&
            g === a.radixPoint &&
            void 0 !== a.digits &&
            (isNaN(a.digits) || parseInt(a.digits) > 0)
          ) {
            var e = b.inArray(a.radixPoint, d.buffer),
              c = d.buffer.join("").match(a.regex.integerPart(a));
            if (-1 !== e && d.validPositions[e])
              return d.validPositions[e - 1]
                ? { caret: e + 1 }
                : {
                    pos: c.index,
                    c: c[0],
                    caret: e + 1,
                  };
            if (!c || ("0" === c[0] && c.index + 1 !== f))
              return (
                (d.buffer[c ? c.index : f] = "0"),
                {
                  pos: (c ? c.index : f) + 1,
                  c: a.radixPoint,
                }
              );
          }
          return !1;
        },
        leadingZeroHandler: function (h, g, e, i, a, j) {
          if (!i) {
            var c = g.buffer.slice("");
            if (
              (c.splice(0, a.prefix.length),
              c.splice(c.length - a.suffix.length, a.suffix.length),
              !0 === a.numericInput)
            ) {
              var c = c.reverse();
              if ("0" === c[0] && void 0 === g.validPositions[e - 1])
                return { pos: e, remove: c.length - 1 };
            } else {
              e -= a.prefix.length;
              var f = b.inArray(a.radixPoint, c),
                d = c
                  .slice(0, -1 !== f ? f : void 0)
                  .join("")
                  .match(a.regex.integerNPart(a));
              if (d && (-1 === f || e <= f)) {
                var k = -1 === f ? 0 : parseInt(c.slice(f + 1).join(""));
                if (
                  0 ===
                    d[0].indexOf(
                      "" !== a.placeholder ? a.placeholder.charAt(0) : "0"
                    ) &&
                  (d.index + 1 === e || (!0 !== j && 0 === k))
                )
                  return (
                    g.buffer.splice(d.index + a.prefix.length, 1),
                    {
                      pos: d.index + a.prefix.length,
                      remove: d.index + a.prefix.length,
                    }
                  );
                if ("0" === h && e <= d.index && d[0] !== a.groupSeparator)
                  return !1;
              }
            }
          }
          return !0;
        },
        definitions: {
          "~": {
            validator: function (f, g, d, h, c, j) {
              var e = c.signHandler(f, g, d, h, c);
              if (
                !e &&
                !(e = c.radixHandler(f, g, d, h, c)) &&
                !0 ===
                  (e = h
                    ? new RegExp(
                        "[0-9" + a.escapeRegex(c.groupSeparator) + "]"
                      ).test(f)
                    : /[0-9]/.test(f)) &&
                !0 === (e = c.leadingZeroHandler(f, g, d, h, c, j))
              ) {
                var i = b.inArray(c.radixPoint, g.buffer);
                e =
                  -1 !== i &&
                  (!1 === c.digitsOptional || g.validPositions[d]) &&
                  !0 !== c.numericInput &&
                  d > i &&
                  !h
                    ? {
                        pos: d,
                        remove: d,
                      }
                    : { pos: d };
              }
              return e;
            },
            cardinality: 1,
          },
          "+": {
            validator: function (b, f, c, d, a) {
              var e = a.signHandler(b, f, c, d, a);
              return (
                !e &&
                  ((d && a.allowMinus && b === a.negationSymbol.front) ||
                    (a.allowMinus && "-" === b) ||
                    (a.allowPlus && "+" === b)) &&
                  (e =
                    !(!d && "-" === b) ||
                    ("" !== a.negationSymbol.back
                      ? {
                          pos: c,
                          c: "-" === b ? a.negationSymbol.front : "+",
                          caret: c + 1,
                          insert: {
                            pos: f.buffer.length,
                            c: a.negationSymbol.back,
                          },
                        }
                      : {
                          pos: c,
                          c: "-" === b ? a.negationSymbol.front : "+",
                          caret: c + 1,
                        })),
                e
              );
            },
            cardinality: 1,
            placeholder: "",
          },
          "-": {
            validator: function (c, e, f, d, a) {
              var b = a.signHandler(c, e, f, d, a);
              return (
                !b &&
                  d &&
                  a.allowMinus &&
                  c === a.negationSymbol.back &&
                  (b = !0),
                b
              );
            },
            cardinality: 1,
            placeholder: "",
          },
          ":": {
            validator: function (f, e, b, g, c) {
              var d = c.signHandler(f, e, b, g, c);
              if (!d) {
                var h = "[" + a.escapeRegex(c.radixPoint) + "]";
                (d = new RegExp(h).test(f)) &&
                  e.validPositions[b] &&
                  e.validPositions[b].match.placeholder === c.radixPoint &&
                  (d = { caret: b + 1 });
              }
              return d;
            },
            cardinality: 1,
            placeholder: function (a) {
              return a.radixPoint;
            },
          },
        },
        onUnMask: function (e, d, b) {
          if ("" === d && !0 === b.nullable) return d;
          var c = e.replace(b.prefix, "");
          return (
            (c = (c = c.replace(b.suffix, "")).replace(
              new RegExp(a.escapeRegex(b.groupSeparator), "g"),
              ""
            )),
            b.unmaskAsNumber
              ? ("" !== b.radixPoint &&
                  -1 !== c.indexOf(b.radixPoint) &&
                  (c = c.replace(a.escapeRegex.call(this, b.radixPoint), ".")),
                Number(c))
              : c
          );
        },
        isComplete: function (d, b) {
          var e = d.join(""),
            f = d.slice();
          if ((b.postFormat(f, 0, b), f.join("") !== e)) return !1;
          var c = e.replace(b.prefix, "");
          return (
            (c = (c = c.replace(b.suffix, "")).replace(
              new RegExp(a.escapeRegex(b.groupSeparator), "g"),
              ""
            )),
            "," === b.radixPoint &&
              (c = c.replace(a.escapeRegex(b.radixPoint), ".")),
            isFinite(c)
          );
        },
        onBeforeMask: function (b, c) {
          if (
            (!0 === c.numericInput && (b = b.split("").reverse().join("")),
            "" !== c.radixPoint && isFinite(b))
          ) {
            var d = b.split("."),
              g = "" !== c.groupSeparator ? parseInt(c.groupSize) : 0;
            2 === d.length &&
              (d[0].length > g || d[1].length > g) &&
              (b = b.toString().replace(".", c.radixPoint));
          }
          var e = b.match(/,/g),
            f = b.match(/\./g);
          if (
            ((b =
              f && e
                ? f.length > e.length
                  ? (b = b.replace(/\./g, "")).replace(",", c.radixPoint)
                  : e.length > f.length
                  ? (b = b.replace(/,/g, "")).replace(".", c.radixPoint)
                  : b.indexOf(".") < b.indexOf(",")
                  ? b.replace(/\./g, "")
                  : (b = b.replace(/,/g, ""))
                : b.replace(
                    new RegExp(a.escapeRegex(c.groupSeparator), "g"),
                    ""
                  )),
            0 === c.digits &&
              (-1 !== b.indexOf(".")
                ? (b = b.substring(0, b.indexOf(".")))
                : -1 !== b.indexOf(",") &&
                  (b = b.substring(0, b.indexOf(",")))),
            "" !== c.radixPoint &&
              isFinite(c.digits) &&
              -1 !== b.indexOf(c.radixPoint))
          ) {
            var i = b.split(c.radixPoint)[1].match(new RegExp("\\d*"))[0];
            if (parseInt(c.digits) < i.toString().length) {
              var h = Math.pow(10, parseInt(c.digits));
              b = (b =
                Math.round(
                  parseFloat(
                    (b = b.replace(a.escapeRegex(c.radixPoint), "."))
                  ) * h
                ) / h)
                .toString()
                .replace(".", c.radixPoint);
            }
          }
          return (
            !0 === c.numericInput && (b = b.split("").reverse().join("")),
            b.toString()
          );
        },
        canClearPosition: function (d, c, e, f, a) {
          var b = d.validPositions[c].input;
          return (
            b !== a.radixPoint ||
            (null !== d.validPositions[c].match.fn &&
              !1 === a.decimalProtect) ||
            isFinite(b) ||
            c === e ||
            b === a.groupSeparator ||
            b === a.negationSymbol.front ||
            b === a.negationSymbol.back
          );
        },
        onKeyDown: function (d, f, g, e) {
          var c = b(this);
          if (d.ctrlKey)
            switch (d.keyCode) {
              case a.keyCode.UP:
                c.val(
                  parseFloat(this.inputmask.unmaskedvalue()) + parseInt(e.step)
                ),
                  c.trigger("setvalue");
                break;
              case a.keyCode.DOWN:
                c.val(
                  parseFloat(this.inputmask.unmaskedvalue()) - parseInt(e.step)
                ),
                  c.trigger("setvalue");
            }
        },
      },
      currency: {
        prefix: "$ ",
        groupSeparator: ",",
        alias: "numeric",
        placeholder: "0",
        autoGroup: !0,
        digits: 2,
        digitsOptional: !1,
        clearMaskOnLostFocus: !1,
      },
      decimal: { alias: "numeric" },
      integer: { alias: "numeric", digits: 0, radixPoint: "" },
      percentage: {
        alias: "numeric",
        digits: 2,
        radixPoint: ".",
        placeholder: "0",
        autoGroup: !1,
        min: 0,
        max: 100,
        suffix: " %",
        allowPlus: !1,
        allowMinus: !1,
      },
    });
  })(jQuery, Inputmask),
  (function (b, a) {
    function c(a, b) {
      var e = (a.mask || a)
          .replace(/#/g, "9")
          .replace(/\)/, "9")
          .replace(/[+()#-]/g, ""),
        f = (b.mask || b)
          .replace(/#/g, "9")
          .replace(/\)/, "9")
          .replace(/[+()#-]/g, ""),
        c = (a.mask || a).split("#")[0],
        d = (b.mask || b).split("#")[0];
      return 0 === d.indexOf(c)
        ? -1
        : 0 === c.indexOf(d)
        ? 1
        : e.localeCompare(f);
    }

    var d = a.analyseMask;
    (a.analyseMask = function (c, a) {
      function e(h, b, d) {
        (b = b || ""), (d = d || g), "" !== b && (d[b] = {});
        for (var i = "", a = d[b] || d, f = h.length - 1; f >= 0; f--)
          (a[(i = (c = h[f].mask || h[f]).substr(0, 1))] = a[i] || []),
            a[i].unshift(c.substr(1)),
            h.splice(f, 1);
        for (var j in a) a[j].length > 1e3 && e(a[j].slice(), j, a);
      }

      function f(d) {
        var e = [];
        for (var c in d)
          b.isArray(d[c])
            ? 1 === d[c].length
              ? e.push(c + d[c])
              : e.push(
                  c +
                    a.groupmarker.start +
                    d[c].join(
                      a.groupmarker.end +
                        a.alternatormarker +
                        a.groupmarker.start
                    ) +
                    a.groupmarker.end
                )
            : e.push(c + f(d[c]));
        return (
          "" +
          (1 === e.length
            ? e[0]
            : a.groupmarker.start +
              e.join(
                a.groupmarker.end + a.alternatormarker + a.groupmarker.start
              ) +
              a.groupmarker.end)
        );
      }

      var g = {};
      return (
        a.phoneCodes &&
          a.phoneCodes.length > 2e3 &&
          (e(
            (c = c.substr(1, c.length - 2)).split(
              a.groupmarker.end + a.alternatormarker + a.groupmarker.start
            )
          ),
          (c = f(g))),
        d.call(this, c, a)
      );
    }),
      a.extendAliases({
        abstractphone: {
          groupmarker: { start: "<", end: ">" },
          countrycode: "",
          phoneCodes: [],
          mask: function (a) {
            return (
              (a.definitions = { "#": a.definitions[9] }), a.phoneCodes.sort(c)
            );
          },
          keepStatic: !0,
          onBeforeMask: function (c, b) {
            var a = c.replace(/^0{1,2}/, "").replace(/[\s]/g, "");
            return (
              (a.indexOf(b.countrycode) > 1 ||
                -1 === a.indexOf(b.countrycode)) &&
                (a = "+" + b.countrycode + a),
              a
            );
          },
          onUnMask: function (b, a, c) {
            return a;
          },
          inputmode: "tel",
        },
      });
  })(jQuery, Inputmask),
  (function (b, a) {
    a.extendAliases({
      Regex: {
        mask: "r",
        greedy: !1,
        repeat: "*",
        regex: null,
        regexTokens: null,
        tokenizer:
          /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
        quantifierFilter: /[0-9]+[^,]/,
        isComplete: function (a, b) {
          return new RegExp(b.regex).test(a.join(""));
        },
        definitions: {
          r: {
            validator: function (g, h, i, l, a) {
              function m(a, b) {
                (this.matches = []),
                  (this.isGroup = a || !1),
                  (this.isQuantifier = b || !1),
                  (this.quantifier = {
                    min: 1,
                    max: 1,
                  }),
                  (this.repeaterPart = void 0);
              }

              function j(f, h) {
                var c = !1;
                h && ((o += "("), p++);
                for (var i = 0; i < f.matches.length; i++) {
                  var d,
                    a = f.matches[i];
                  if (!0 === a.isGroup) c = j(a, !0);
                  else if (!0 === a.isQuantifier) {
                    var s = b.inArray(a, f.matches),
                      l = f.matches[s - 1],
                      q = o;
                    if (isNaN(a.quantifier.max)) {
                      for (
                        ;
                        a.repeaterPart &&
                        a.repeaterPart !== o &&
                        a.repeaterPart.length > o.length &&
                        !(c = j(l, !0));

                      );
                      (c = c || j(l, !0)) && (a.repeaterPart = o),
                        (o = q + a.quantifier.max);
                    } else {
                      for (
                        var r = 0, t = a.quantifier.max - 1;
                        r < t && !(c = j(l, !0));
                        r++
                      );
                      o =
                        q +
                        "{" +
                        a.quantifier.min +
                        "," +
                        a.quantifier.max +
                        "}";
                    }
                  } else if (void 0 !== a.matches)
                    for (var m = 0; m < a.length && !(c = j(a[m], h)); m++);
                  else {
                    if ("[" == a.charAt(0)) {
                      (d = o), (d += a);
                      for (var e = 0; e < p; e++) d += ")";
                      var n = new RegExp("^(" + d + ")$");
                      c = n.test(k);
                    } else
                      for (var g = 0, u = a.length; g < u; g++)
                        if ("\\" !== a.charAt(g)) {
                          (d = o),
                            (d += a.substr(0, g + 1)),
                            (d = d.replace(/\|$/, ""));
                          for (var e = 0; e < p; e++) d += ")";
                          var n = new RegExp("^(" + d + ")$");
                          if ((c = n.test(k))) break;
                        }
                    o += a;
                  }
                  if (c) break;
                }
                return h && ((o += ")"), p--), c;
              }

              var k,
                n,
                d = h.buffer.slice(),
                o = "",
                e = !1,
                p = 0;
              null === a.regexTokens &&
                (function () {
                  var c,
                    f,
                    d = new m(),
                    b = [];
                  for (a.regexTokens = []; (c = a.tokenizer.exec(a.regex)); )
                    switch ((f = c[0]).charAt(0)) {
                      case "(":
                        b.push(new m(!0));
                        break;
                      case ")":
                        (n = b.pop()),
                          b.length > 0
                            ? b[b.length - 1].matches.push(n)
                            : d.matches.push(n);
                        break;
                      case "{":
                      case "+":
                      case "*":
                        var g = new m(!1, !0),
                          e = (f = f.replace(/[{}]/g, "")).split(","),
                          i = isNaN(e[0]) ? e[0] : parseInt(e[0]),
                          j =
                            1 === e.length
                              ? i
                              : isNaN(e[1])
                              ? e[1]
                              : parseInt(e[1]);
                        if (
                          ((g.quantifier = { min: i, max: j }), b.length > 0)
                        ) {
                          var h = b[b.length - 1].matches;
                          (c = h.pop()).isGroup ||
                            ((n = new m(!0)).matches.push(c), (c = n)),
                            h.push(c),
                            h.push(g);
                        } else
                          (c = d.matches.pop()).isGroup ||
                            ((n = new m(!0)).matches.push(c), (c = n)),
                            d.matches.push(c),
                            d.matches.push(g);
                        break;
                      default:
                        b.length > 0
                          ? b[b.length - 1].matches.push(f)
                          : d.matches.push(f);
                    }
                  d.matches.length > 0 && a.regexTokens.push(d);
                })(),
                d.splice(i, 0, g),
                (k = d.join(""));
              for (var c = 0; c < a.regexTokens.length; c++) {
                var f = a.regexTokens[c];
                if ((e = j(f, f.isGroup))) break;
              }
              return e;
            },
            cardinality: 1,
          },
        },
      },
    });
  })(jQuery, Inputmask),
  (function (a) {
    (a.masksLoad = function (b) {
      var c;
      return (
        a.ajax({
          url: b,
          async: !1,
          dataType: "json",
          success: function (a) {
            c = a;
          },
        }),
        c
      );
    }),
      (a.masksSort = function (b, c, d, e) {
        return (
          b.sort(function (g, h) {
            for (var b = 0, f = 0; b < g[e].length && f < h[e].length; ) {
              var i = g[e].charAt(b),
                j = h[e].charAt(f);
              if (d.test(i)) {
                if (d.test(j)) {
                  if (-1 != a.inArray(i, c) && -1 == a.inArray(j, c)) return 1;
                  if (-1 == a.inArray(i, c) && -1 != a.inArray(j, c)) return -1;
                  if (-1 == a.inArray(i, c) && -1 == a.inArray(j, c) && i != j)
                    return j > i ? -1 : 1;
                  b++, f++;
                } else f++;
              } else b++;
            }
            for (; b < g[e].length || f < h[e].length; )
              if (b < g[e].length && !d.test(g[e].charAt(b))) b++;
              else if (f < h[e].length && !d.test(h[e].charAt(f))) f++;
              else {
                if (b < g[e].length) return 1;
                if (f < h[e].length) return -1;
              }
            return 0;
          }),
          b
        );
      });
    var b = function (b, a) {
        if ("number" != typeof b) {
          if (this.setSelectionRange)
            (b = this.selectionStart), (a = this.selectionEnd);
          else if (document.selection && document.selection.createRange) {
            var c = document.selection.createRange();
            a =
              (b = 0 - c.duplicate().moveStart("character", -1e5)) +
              c.text.length;
          }
          return { begin: b, end: a };
        }
        if (((a = "number" == typeof a ? a : b), this.setSelectionRange))
          this.setSelectionRange(b, a);
        else if (this.createTextRange) {
          var c = this.createTextRange();
          c.collapse(!0),
            c.moveEnd("character", a),
            c.moveStart("character", b),
            c.select();
        }
      },
      c =
        Object.keys ||
        function (a) {
          if (a !== Object(a)) throw new TypeError("Invalid object");
          var b = [];
          for (var c in a) b[b.length] = c;
          return b;
        },
      d = function (j) {
        for (
          var a = this.inputmasks.options, f = "", h = 0;
          h < j.length;
          h++
        ) {
          var i = j.charAt(h);
          if (i == this.inputmasks.placeholder) break;
          a.match.test(i) && (f += i);
        }
        for (var k in a.list) {
          for (
            var b = a.list[k][a.listKey], l = !0, g = 0, d = 0;
            g < f.length && d < b.length;

          ) {
            var e = b.charAt(d),
              m = f.charAt(g);
            if (a.match.test(e) || e in this.inputmasks.defs) {
              if (
                !(
                  (e in this.inputmasks.defs &&
                    this.inputmasks.defs[e].test(m)) ||
                  m == e
                )
              ) {
                l = !1;
                break;
              }
              g++, d++;
            } else d++;
          }
          if (l && g == f.length) {
            var n = -1 == b.substr(d).search(a.match);
            b = b.replace(
              new RegExp(
                [a.match.source].concat(c(this.inputmasks.defs)).join("|"),
                "g"
              ),
              a.replace
            );
            var o = -1 == b.substr(d).search(a.replace);
            return { mask: b, obj: a.list[k], determined: n, completed: o };
          }
        }
        return !1;
      },
      e = function (f, b, g) {
        var c = this.inputmasks.options;
        if (!f) return 0;
        for (var a = 0, d = 0; a < g.begin; a++)
          f.charAt(a) == c.replace && d++;
        for (var e = 0; a < g.end; a++) f.charAt(a) == c.replace && e++;
        for (a = 0; a < b.length && (d > 0 || b.charAt(a) != c.replace); a++)
          b.charAt(a) == c.replace && d--;
        for (d = a; a < b.length && e > 0; a++) b.charAt(a) == c.replace && e--;
        return { begin: d, end: (e = a) };
      },
      f = function () {
        a(this).off(".inputmasks");
      },
      g = function () {
        events = a._data(this, "events");
        var b = this;
        a.each(
          [
            "keydown",
            "keypress",
            "paste",
            "dragdrop",
            "drop",
            "setvalue",
            "reset",
            "cut",
            "blur",
          ],
          function (d, c) {
            a.each(b.inputmask.events[c], function (e, d) {
              a(b).off(c, d);
            });
          }
        );
      },
      h = function (b) {
        var c = this;
        a.each(this.inputmask.events[b.type], function (d, a) {
          a.call(c, b);
        });
      },
      i = function () {
        a(this)
          .on("keydown.inputmasks", l)
          .on("keypress.inputmasks", m)
          .on("paste.inputmasks", o)
          .on("dragdrop.inputmasks", o)
          .on("drop.inputmasks", o)
          .on("cut.inputmasks", o)
          .on("setvalue.inputmasks", n)
          .on("blur.inputmasks", n)
          .on("reset.inputmasks", n);
      },
      j = function (c, d) {
        var f,
          h = this.inputmasks.options;
        c &&
          (void 0 !== d || c.mask != this.inputmasks.oldmatch.mask) &&
          (void 0 === d
            ? (f = e.call(
                this,
                this.inputmasks.oldmatch.mask,
                c.mask,
                b.call(this)
              ))
            : (this.inputmask && this.inputmask.remove(), (this.value = d)),
          a(this).inputmask(
            c.mask,
            a.extend(!0, h.inputmask, {
              insertMode: this.inputmasks.insertMode,
            })
          ),
          g.call(this),
          void 0 === d && b.call(this, f.begin, f.end)),
          (this.inputmasks.oldmatch = c),
          h.onMaskChange.call(this, c.obj, c.determined);
      },
      k = function (b, c, e) {
        var a = d.call(this, c);
        return a &&
          a.obj == this.inputmasks.oldmatch.obj &&
          a.determined == this.inputmasks.oldmatch.determined
          ? (h.call(this, b), !0)
          : (a
              ? e
                ? (j.call(this, a), h.call(this, b))
                : (h.call(this, b), j.call(this, a))
              : (e && this.inputmasks.insertMode) || p.call(this, c),
            !1);
      },
      l = function (c) {
        if (c.metaKey) return h.call(this, c), !0;
        var g = this.inputmasks.options,
          e = (c = c || window.event).which || c.charCode || c.keyCode;
        if (8 == e || 46 == e || (this.inputmasks.iphone && 127 == e)) {
          var a = this.inputmask._valueGet(),
            f = b.call(this);
          if (f.begin == f.end) {
            var d = f.begin;
            do {
              46 != e && d--;
              var i = a.charAt(d);
              a = a.substring(0, d) + a.substring(d + 1);
            } while (
              d > 0 &&
              d < a.length &&
              i != this.inputmasks.placeholder &&
              !g.match.test(i)
            );
          } else a = a.substring(0, f.begin) + a.substring(f.end);
          return k.call(this, c, a, !1);
        }
        return (
          45 == e && (this.inputmasks.insertMode = !this.inputmasks.insertMode),
          h.call(this, c),
          !0
        );
      },
      m = function (a) {
        if (a.metaKey) return h.call(this, a), !0;
        var c = this.inputmask._valueGet(),
          e = (a = a || window.event).which || a.charCode || a.keyCode,
          d = String.fromCharCode(e);
        return (
          (c =
            (caretPos = b.call(this)).begin == caretPos.end &&
            c.charAt(caretPos.begin) == this.inputmasks.placeholder
              ? c.substring(0, caretPos.begin) +
                d +
                c.substring(caretPos.end + 1)
              : c.substring(0, caretPos.begin) + d + c.substring(caretPos.end)),
          k.call(this, a, c, !0)
        );
      },
      n = function (a) {
        return p.call(this), !0;
      },
      o = function (a) {
        var b = this;
        return (
          setTimeout(function () {
            p.call(b);
          }, 0),
          !0
        );
      },
      p = function (a) {
        void 0 === a &&
          (a =
            this.inputmask && this.inputmask._valueGet
              ? this.inputmask._valueGet()
              : this.value);
        for (var b = d.call(this, a); !b && a.length > 0; )
          (a = a.substr(0, a.length - 1)), (b = d.call(this, a));
        j.call(this, b, a);
      },
      q = function (b) {
        b = a.extend(!0, { onMaskChange: a.noop }, b);
        var d = {};
        for (var c in b.inputmask.definitions) {
          var e = b.inputmask.definitions[c].validator;
          switch (typeof e) {
            case "string":
              d[c] = new RegExp(e);
              break;
            case "object":
              "test" in b.definitions[c].validator && (d[c] = e);
              break;
            case "function":
              d[c] = { test: e };
          }
        }
        (b.inputmask.definitions[b.replace] = {
          validator: b.match.source,
          cardinality: 1,
        }),
          this.inputmasks && a(this).inputmasks("remove"),
          (this.inputmasks = {}),
          (this.inputmasks.options = b),
          (this.inputmasks.defs = d),
          (this.inputmasks.iphone =
            null != navigator.userAgent.match(/iphone/i)),
          (this.inputmasks.oldmatch = !1),
          (this.inputmasks.placeholder =
            b.inputmask.placeholder ||
            Inputmask.prototype.defaults.placeholder),
          (this.inputmasks.insertMode =
            void 0 !== b.inputmask.insertMode
              ? b.inputmask.insertMode
              : Inputmask.prototype.defaults.insertMode),
          p.call(this);
      };
    a.fn.inputmasks = function (c) {
      switch (c) {
        case "remove":
          f.call(this), (this.inputmasks = void 0), a(this).inputmask("remove");
          break;
        case "isCompleted":
          var b = d.call(
            this[0],
            (this[0].inputmask && this[0].inputmask._valueGet()) ||
              this[0].value
          );
          return b && b.completed;
        default:
          return (
            this.each(function () {
              q.call(this, c), i.call(this);
            }),
            this
          );
      }
    };
  })(jQuery),
  (function () {
    function a() {
      var b = this,
        a = $.masksSort(this.options.phoneCodes, ["#"], /[0-9]|#/, "mask");
      $(this.options.element).inputmask("remove"),
        $(this.options.element).inputmasks({
          inputmask: {
            definitions: {
              "#": {
                validator: "[0-9]",
                cardinality: 1,
              },
            },
            showMaskOnHover: !1,
            autoUnmask: !1,
            clearMaskOnLostFocus: !0,
          },
          match: /[0-9]/,
          replace: "#",
          list: a,
          listKey: "mask",
          onMaskChange: function (a, c) {
            var d = b.options.defaultMask;
            c && (d = a.mask),
              $(this).each(function () {
                var a = d
                  .replace(/#/g, "\\d")
                  .replace(/\+/g, "\\+")
                  .replace(/\(/g, "\\(")
                  .replace(/\)/g, "\\)");
                $(this).attr("pattern", "^" + a + "$");
              });
          },
        });
    }

    (this.IPTelMask = function () {
      (this.userIP = null),
        (this.userCC = null),
        arguments[0] &&
          "object" == typeof arguments[0] &&
          (this.options = (function (c, b) {
            var a;
            for (a in b) b.hasOwnProperty(a) && (c[a] = b[a]);
            return c;
          })(
            {
              phoneCodes: [
                { mask: "+247-####", cc: "AC", cd: "Ascension" },
                {
                  mask: "+376-###-###",
                  cc: "AD",
                  cd: "Andorra",
                },
                {
                  mask: "+971-5#-###-####",
                  cc: "AE",
                  cd: "United Arab Emirates",
                },
                {
                  mask: "+971-#-###-####",
                  cc: "AE",
                  cd: "United Arab Emirates",
                },
                { mask: "+93-##-###-####", cc: "AF", cd: "Afghanistan" },
                {
                  mask: "+1(268)###-####",
                  cc: "AG",
                  cd: "Antigua & Barbuda",
                },
                { mask: "+1(264)###-####", cc: "AI", cd: "Anguilla" },
                {
                  mask: "+355(###)###-###",
                  cc: "AL",
                  cd: "Albania",
                },
                { mask: "+374-##-###-###", cc: "AM", cd: "Armenia" },
                {
                  mask: "+599-###-####",
                  cc: "AN",
                  cd: "Caribbean Netherlands",
                },
                { mask: "+599-###-####", cc: "AN", cd: "Netherlands Antilles" },
                {
                  mask: "+599-9###-####",
                  cc: "AN",
                  cd: "Netherlands Antilles",
                },
                { mask: "+244(###)###-###", cc: "AO", cd: "Angola" },
                {
                  mask: "+672-1##-###",
                  cc: "AQ",
                  cd: "Australian bases in Antarctica",
                },
                { mask: "+54(###)###-####", cc: "AR", cd: "Argentina" },
                {
                  mask: "+1(684)###-####",
                  cc: "AS",
                  cd: "American Samoa",
                },
                { mask: "+43(###)###-####", cc: "AT", cd: "Austria" },
                {
                  mask: "+61-#-####-####",
                  cc: "AU",
                  cd: "Australia",
                },
                { mask: "+297-###-####", cc: "AW", cd: "Aruba" },
                {
                  mask: "+994-##-###-##-##",
                  cc: "AZ",
                  cd: "Azerbaijan",
                },
                {
                  mask: "+387-##-#####",
                  cc: "BA",
                  cd: "Bosnia and Herzegovina",
                },
                {
                  mask: "+387-##-####",
                  cc: "BA",
                  cd: "Bosnia and Herzegovina",
                },
                { mask: "+1(246)###-####", cc: "BB", cd: "Barbados" },
                {
                  mask: "+880-##-###-###",
                  cc: "BD",
                  cd: "Bangladesh",
                },
                { mask: "+32(###)###-###", cc: "BE", cd: "Belgium" },
                {
                  mask: "+226-##-##-####",
                  cc: "BF",
                  cd: "Burkina Faso",
                },
                { mask: "+359(###)###-###", cc: "BG", cd: "Bulgaria" },
                {
                  mask: "+973-####-####",
                  cc: "BH",
                  cd: "Bahrain",
                },
                { mask: "+257-##-##-####", cc: "BI", cd: "Burundi" },
                {
                  mask: "+229-##-##-####",
                  cc: "BJ",
                  cd: "Benin",
                },
                { mask: "+1(441)###-####", cc: "BM", cd: "Bermuda" },
                {
                  mask: "+673-###-####",
                  cc: "BN",
                  cd: "Brunei Darussalam",
                },
                { mask: "+591-#-###-####", cc: "BO", cd: "Bolivia" },
                {
                  mask: "+55-##-####-####",
                  cc: "BR",
                  cd: "Brazil",
                },
                { mask: "+55-##-#####-####", cc: "BR", cd: "Brazil" },
                {
                  mask: "+1(242)###-####",
                  cc: "BS",
                  cd: "Bahamas",
                },
                { mask: "+975-17-###-###", cc: "BT", cd: "Bhutan" },
                {
                  mask: "+975-#-###-###",
                  cc: "BT",
                  cd: "Bhutan",
                },
                { mask: "+267-##-###-###", cc: "BW", cd: "Botswana" },
                {
                  mask: "+375(##)###-##-##",
                  cc: "BY",
                  cd: "Belarus",
                },
                { mask: "+501-###-####", cc: "BZ", cd: "Belize" },
                {
                  mask: "+243(###)###-###",
                  cc: "CD",
                  cd: "Dem. Rep. Congo",
                },
                {
                  mask: "+236-##-##-####",
                  cc: "CF",
                  cd: "Central African Republic",
                },
                {
                  mask: "+242-##-###-####",
                  cc: "CG",
                  cd: "Congo (Brazzaville)",
                },
                { mask: "+41-##-###-####", cc: "CH", cd: "Switzerland" },
                {
                  mask: "+225-##-###-###",
                  cc: "CI",
                  cd: "Cote d?Ivoire?(Ivory Coast)",
                },
                { mask: "+682-##-###", cc: "CK", cd: "Cook Islands" },
                {
                  mask: "+56-#-####-####",
                  cc: "CL",
                  cd: "Chile",
                },
                { mask: "+237-####-####", cc: "CM", cd: "Cameroon" },
                {
                  mask: "+86(###)####-####",
                  cc: "CN",
                  cd: "China (PRC)",
                },
                { mask: "+86(###)####-###", cc: "CN", cd: "China (PRC)" },
                {
                  mask: "+86-##-#####-#####",
                  cc: "CN",
                  cd: "China (PRC)",
                },
                { mask: "+57(###)###-####", cc: "CO", cd: "Colombia" },
                {
                  mask: "+506-####-####",
                  cc: "CR",
                  cd: "Costa Rica",
                },
                { mask: "+53-#-###-####", cc: "CU", cd: "Cuba" },
                {
                  mask: "+238(###)##-##",
                  cc: "CV",
                  cd: "Cape Verde",
                },
                { mask: "+599-###-####", cc: "CW", cd: "Curacao" },
                {
                  mask: "+357-##-###-###",
                  cc: "CY",
                  cd: "Cyprus",
                },
                { mask: "+420(###)###-###", cc: "CZ", cd: "Czech Republic" },
                {
                  mask: "+49(####)###-####",
                  cc: "DE",
                  cd: "Germany",
                },
                { mask: "+49(###)###-####", cc: "DE", cd: "Germany" },
                {
                  mask: "+49(###)##-####",
                  cc: "DE",
                  cd: "Germany",
                },
                { mask: "+49(###)##-###", cc: "DE", cd: "Germany" },
                {
                  mask: "+49(###)##-##",
                  cc: "DE",
                  cd: "Germany",
                },
                { mask: "+49-###-###", cc: "DE", cd: "Germany" },
                {
                  mask: "+253-##-##-##-##",
                  cc: "DJ",
                  cd: "Djibouti",
                },
                { mask: "+45-##-##-##-##", cc: "DK", cd: "Denmark" },
                {
                  mask: "+1(767)###-####",
                  cc: "DM",
                  cd: "Dominica",
                },
                { mask: "+1(809)###-####", cc: "DO", cd: "Dominican Republic" },
                {
                  mask: "+1(829)###-####",
                  cc: "DO",
                  cd: "Dominican Republic",
                },
                { mask: "+1(849)###-####", cc: "DO", cd: "Dominican Republic" },
                {
                  mask: "+213-##-###-####",
                  cc: "DZ",
                  cd: "Algeria",
                },
                { mask: "+593-##-###-####", cc: "EC", cd: "Ecuador " },
                {
                  mask: "+593-#-###-####",
                  cc: "EC",
                  cd: "Ecuador",
                },
                { mask: "+372-####-####", cc: "EE", cd: "Estonia " },
                {
                  mask: "+372-###-####",
                  cc: "EE",
                  cd: "Estonia",
                },
                { mask: "+20(###)###-####", cc: "EG", cd: "Egypt" },
                {
                  mask: "+291-#-###-###",
                  cc: "ER",
                  cd: "Eritrea",
                },
                { mask: "+34(###)###-###", cc: "ES", cd: "Spain" },
                {
                  mask: "+251-##-###-####",
                  cc: "ET",
                  cd: "Ethiopia",
                },
                { mask: "+358(###)###-##-##", cc: "FI", cd: "Finland" },
                {
                  mask: "+679-##-#####",
                  cc: "FJ",
                  cd: "Fiji",
                },
                { mask: "+500-#####", cc: "FK", cd: "Falkland Islands" },
                {
                  mask: "+691-###-####",
                  cc: "FM",
                  cd: "F.S. Micronesia",
                },
                { mask: "+298-###-###", cc: "FO", cd: "Faroe Islands" },
                {
                  mask: "+262-#####-####",
                  cc: "FR",
                  cd: "Mayotte",
                },
                { mask: "+33(###)###-###", cc: "FR", cd: "France" },
                {
                  mask: "+508-##-####",
                  cc: "FR",
                  cd: "St Pierre & Miquelon",
                },
                { mask: "+590(###)###-###", cc: "FR", cd: "Guadeloupe" },
                {
                  mask: "+241-#-##-##-##",
                  cc: "GA",
                  cd: "Gabon",
                },
                { mask: "+1(473)###-####", cc: "GD", cd: "Grenada" },
                {
                  mask: "+995(###)###-###",
                  cc: "GE",
                  cd: "Rep. of Georgia",
                },
                { mask: "+594-#####-####", cc: "GF", cd: "Guiana (French)" },
                {
                  mask: "+233(###)###-###",
                  cc: "GH",
                  cd: "Ghana",
                },
                { mask: "+350-###-#####", cc: "GI", cd: "Gibraltar" },
                {
                  mask: "+299-##-##-##",
                  cc: "GL",
                  cd: "Greenland",
                },
                { mask: "+220(###)##-##", cc: "GM", cd: "Gambia" },
                {
                  mask: "+224-##-###-###",
                  cc: "GN",
                  cd: "Guinea",
                },
                { mask: "+240-##-###-####", cc: "GQ", cd: "Equatorial Guinea" },
                {
                  mask: "+30(###)###-####",
                  cc: "GR",
                  cd: "Greece",
                },
                { mask: "+502-#-###-####", cc: "GT", cd: "Guatemala" },
                {
                  mask: "+1(671)###-####",
                  cc: "GU",
                  cd: "Guam",
                },
                { mask: "+245-#-######", cc: "GW", cd: "Guinea-Bissau" },
                {
                  mask: "+592-###-####",
                  cc: "GY",
                  cd: "Guyana",
                },
                { mask: "+852-####-####", cc: "HK", cd: "Hong Kong" },
                {
                  mask: "+504-####-####",
                  cc: "HN",
                  cd: "Honduras",
                },
                { mask: "+385-(##)-###-###[#]", cc: "HR", cd: "Croatia" },
                {
                  mask: "+385-1-####-###",
                  cc: "HR",
                  cd: "Croatia",
                },
                { mask: "+509-##-##-####", cc: "HT", cd: "Haiti" },
                {
                  mask: "+36(###)###-###",
                  cc: "HU",
                  cd: "Hungary",
                },
                { mask: "+62(8##)###-####", cc: "ID", cd: "Indonesia " },
                {
                  mask: "+62-##-###-##",
                  cc: "ID",
                  cd: "Indonesia",
                },
                { mask: "+62-##-###-###", cc: "ID", cd: "Indonesia" },
                {
                  mask: "+62-##-###-####",
                  cc: "ID",
                  cd: "Indonesia",
                },
                { mask: "+62(8##)###-###", cc: "ID", cd: "Indonesia " },
                {
                  mask: "+62(8##)###-##-###",
                  cc: "ID",
                  cd: "Indonesia ",
                },
                { mask: "+353(###)###-###", cc: "IE", cd: "Ireland" },
                {
                  mask: "+972-5#-###-####",
                  cc: "IL",
                  cd: "Israel ",
                },
                { mask: "+972-#-###-####", cc: "IL", cd: "Israel" },
                {
                  mask: "+91(####)###-###",
                  cc: "IN",
                  cd: "India",
                },
                { mask: "+246-###-####", cc: "IO", cd: "Diego Garcia" },
                {
                  mask: "+964(###)###-####",
                  cc: "IQ",
                  cd: "Iraq",
                },
                { mask: "+98(###)###-####", cc: "IR", cd: "Iran" },
                {
                  mask: "+354-###-####",
                  cc: "IS",
                  cd: "Iceland",
                },
                { mask: "+39(###)####-###", cc: "IT", cd: "Italy" },
                {
                  mask: "+1(876)###-####",
                  cc: "JM",
                  cd: "Jamaica",
                },
                { mask: "+962-#-####-####", cc: "JO", cd: "Jordan" },
                {
                  mask: "+81-##-####-####",
                  cc: "JP",
                  cd: "Japan ",
                },
                { mask: "+81(###)###-###", cc: "JP", cd: "Japan" },
                {
                  mask: "+254-###-######",
                  cc: "KE",
                  cd: "Kenya",
                },
                { mask: "+996(###)###-###", cc: "KG", cd: "Kyrgyzstan" },
                {
                  mask: "+855-##-###-###",
                  cc: "KH",
                  cd: "Cambodia",
                },
                { mask: "+686-##-###", cc: "KI", cd: "Kiribati" },
                {
                  mask: "+269-##-#####",
                  cc: "KM",
                  cd: "Comoros",
                },
                {
                  mask: "+1(869)###-####",
                  cc: "KN",
                  cd: "Saint Kitts & Nevis",
                },
                {
                  mask: "+850-191-###-####",
                  cc: "KP",
                  cd: "DPR Korea (North) ",
                },
                { mask: "+850-##-###-###", cc: "KP", cd: "DPR Korea (North)" },
                {
                  mask: "+850-###-####-###",
                  cc: "KP",
                  cd: "DPR Korea (North)",
                },
                { mask: "+850-###-###", cc: "KP", cd: "DPR Korea (North)" },
                {
                  mask: "+850-####-####",
                  cc: "KP",
                  cd: "DPR Korea (North)",
                },
                {
                  mask: "+850-####-#############",
                  cc: "KP",
                  cd: "DPR Korea (North)",
                },
                {
                  mask: "+82-##-###-####",
                  cc: "KR",
                  cd: "Korea (South)",
                },
                { mask: "+965-####-####", cc: "KW", cd: "Kuwait" },
                {
                  mask: "+1(345)###-####",
                  cc: "KY",
                  cd: "Cayman Islands",
                },
                { mask: "+7(6##)###-##-##", cc: "KZ", cd: "Kazakhstan" },
                {
                  mask: "+7(7##)###-##-##",
                  cc: "KZ",
                  cd: "Kazakhstan",
                },
                { mask: "+856(20##)###-###", cc: "LA", cd: "Laos " },
                {
                  mask: "+856-##-###-###",
                  cc: "LA",
                  cd: "Laos",
                },
                { mask: "+961-##-###-###", cc: "LB", cd: "Lebanon " },
                {
                  mask: "+961-#-###-###",
                  cc: "LB",
                  cd: "Lebanon",
                },
                { mask: "+1(758)###-####", cc: "LC", cd: "Saint Lucia" },
                {
                  mask: "+423(###)###-####",
                  cc: "LI",
                  cd: "Liechtenstein",
                },
                { mask: "+94-##-###-####", cc: "LK", cd: "Sri Lanka" },
                {
                  mask: "+231-##-###-###",
                  cc: "LR",
                  cd: "Liberia",
                },
                { mask: "+266-#-###-####", cc: "LS", cd: "Lesotho" },
                {
                  mask: "+370(###)##-###",
                  cc: "LT",
                  cd: "Lithuania",
                },
                { mask: "+352(###)###-###", cc: "LU", cd: "Luxembourg" },
                {
                  mask: "+371-##-###-###",
                  cc: "LV",
                  cd: "Latvia",
                },
                { mask: "+218-##-###-###", cc: "LY", cd: "Libya" },
                {
                  mask: "+218-21-###-####",
                  cc: "LY",
                  cd: "Libya",
                },
                { mask: "+212-##-####-###", cc: "MA", cd: "Morocco" },
                {
                  mask: "+377(###)###-###",
                  cc: "MC",
                  cd: "Monaco",
                },
                { mask: "+377-##-###-###", cc: "MC", cd: "Monaco" },
                {
                  mask: "+373-####-####",
                  cc: "MD",
                  cd: "Moldova",
                },
                { mask: "+382-##-###-###", cc: "ME", cd: "Montenegro" },
                {
                  mask: "+261-##-##-#####",
                  cc: "MG",
                  cd: "Madagascar",
                },
                { mask: "+692-###-####", cc: "MH", cd: "Marshall Islands" },
                {
                  mask: "+389-##-###-###",
                  cc: "MK",
                  cd: "Republic of Macedonia",
                },
                { mask: "+223-##-##-####", cc: "ML", cd: "Mali" },
                {
                  mask: "+95-##-###-###",
                  cc: "MM",
                  cd: "Burma (Myanmar)",
                },
                { mask: "+95-#-###-###", cc: "MM", cd: "Burma (Myanmar)" },
                {
                  mask: "+95-###-###",
                  cc: "MM",
                  cd: "Burma (Myanmar)",
                },
                { mask: "+976-##-##-####", cc: "MN", cd: "Mongolia" },
                {
                  mask: "+853-####-####",
                  cc: "MO",
                  cd: "Macau",
                },
                {
                  mask: "+1(670)###-####",
                  cc: "MP",
                  cd: "Northern Mariana Islands",
                },
                {
                  mask: "+596(###)##-##-##",
                  cc: "MQ",
                  cd: "Martinique",
                },
                { mask: "+222-##-##-####", cc: "MR", cd: "Mauritania" },
                {
                  mask: "+1(664)###-####",
                  cc: "MS",
                  cd: "Montserrat",
                },
                { mask: "+356-####-####", cc: "MT", cd: "Malta" },
                {
                  mask: "+230-###-####",
                  cc: "MU",
                  cd: "Mauritius",
                },
                { mask: "+960-###-####", cc: "MV", cd: "Maldives" },
                {
                  mask: "+265-1-###-###",
                  cc: "MW",
                  cd: "Malawi",
                },
                { mask: "+265-#-####-####", cc: "MW", cd: "Malawi" },
                {
                  mask: "+52(###)###-####",
                  cc: "MX",
                  cd: "Mexico",
                },
                { mask: "+52-##-##-####", cc: "MX", cd: "Mexico" },
                {
                  mask: "+60-##-###-####",
                  cc: "MY",
                  cd: "Malaysia ",
                },
                { mask: "+60(###)###-###", cc: "MY", cd: "Malaysia" },
                {
                  mask: "+60-##-###-###",
                  cc: "MY",
                  cd: "Malaysia",
                },
                { mask: "+60-#-###-###", cc: "MY", cd: "Malaysia" },
                {
                  mask: "+258-##-###-###",
                  cc: "MZ",
                  cd: "Mozambique",
                },
                { mask: "+264-##-###-####", cc: "NA", cd: "Namibia" },
                {
                  mask: "+687-##-####",
                  cc: "NC",
                  cd: "New Caledonia",
                },
                { mask: "+227-##-##-####", cc: "NE", cd: "Niger" },
                {
                  mask: "+672-3##-###",
                  cc: "NF",
                  cd: "Norfolk Island",
                },
                { mask: "+234(###)###-####", cc: "NG", cd: "Nigeria" },
                {
                  mask: "+234-##-###-###",
                  cc: "NG",
                  cd: "Nigeria",
                },
                { mask: "+234-##-###-##", cc: "NG", cd: "Nigeria" },
                {
                  mask: "+234(###)###-####",
                  cc: "NG",
                  cd: "Nigeria ",
                },
                { mask: "+505-####-####", cc: "NI", cd: "Nicaragua" },
                {
                  mask: "+31-##-###-####",
                  cc: "NL",
                  cd: "Netherlands",
                },
                { mask: "+47(###)##-###", cc: "NO", cd: "Norway" },
                {
                  mask: "+977-##-###-###",
                  cc: "NP",
                  cd: "Nepal",
                },
                { mask: "+674-###-####", cc: "NR", cd: "Nauru" },
                {
                  mask: "+683-####",
                  cc: "NU",
                  cd: "Niue",
                },
                { mask: "+64(###)###-###", cc: "NZ", cd: "New Zealand" },
                {
                  mask: "+64-##-###-###",
                  cc: "NZ",
                  cd: "New Zealand",
                },
                { mask: "+64(###)###-####", cc: "NZ", cd: "New Zealand" },
                {
                  mask: "+968-##-###-###",
                  cc: "OM",
                  cd: "Oman",
                },
                { mask: "+507-###-####", cc: "PA", cd: "Panama" },
                {
                  mask: "+51(###)###-###",
                  cc: "PE",
                  cd: "Peru",
                },
                { mask: "+689-##-##-##", cc: "PF", cd: "French Polynesia" },
                {
                  mask: "+675(###)##-###",
                  cc: "PG",
                  cd: "Papua New Guinea",
                },
                { mask: "+63(###)###-####", cc: "PH", cd: "Philippines" },
                {
                  mask: "+92(###)###-####",
                  cc: "PK",
                  cd: "Pakistan",
                },
                { mask: "+48(###)###-###", cc: "PL", cd: "Poland" },
                {
                  mask: "+970-##-###-####",
                  cc: "PS",
                  cd: "Palestine",
                },
                { mask: "+351-##-###-####", cc: "PT", cd: "Portugal" },
                {
                  mask: "+680-###-####",
                  cc: "PW",
                  cd: "Palau",
                },
                { mask: "+595(###)###-###", cc: "PY", cd: "Paraguay" },
                {
                  mask: "+974-####-####",
                  cc: "QA",
                  cd: "Qatar",
                },
                { mask: "+262-#####-####", cc: "RE", cd: "Reunion" },
                {
                  mask: "+40-##-###-####",
                  cc: "RO",
                  cd: "Romania",
                },
                { mask: "+381-##-###-####", cc: "RS", cd: "Serbia" },
                {
                  mask: "+7(###)###-##-##",
                  cc: "RU",
                  cd: "Russia",
                },
                { mask: "8(###)###-##-##", cc: "RU", cd: "Russia" },
                {
                  mask: "+250(###)###-###",
                  cc: "RW",
                  cd: "Rwanda",
                },
                { mask: "+966-5-####-####", cc: "SA", cd: "Saudi Arabia " },
                {
                  mask: "+966-#-###-####",
                  cc: "SA",
                  cd: "Saudi Arabia",
                },
                { mask: "+677-###-####", cc: "SB", cd: "Solomon Islands " },
                {
                  mask: "+677-#####",
                  cc: "SB",
                  cd: "Solomon Islands",
                },
                { mask: "+248-#-###-###", cc: "SC", cd: "Seychelles" },
                {
                  mask: "+249-##-###-####",
                  cc: "SD",
                  cd: "Sudan",
                },
                { mask: "+46-##-###-####", cc: "SE", cd: "Sweden" },
                {
                  mask: "+65-####-####",
                  cc: "SG",
                  cd: "Singapore",
                },
                { mask: "+290-####", cc: "SH", cd: "Saint Helena" },
                {
                  mask: "+290-####",
                  cc: "SH",
                  cd: "Tristan da Cunha",
                },
                { mask: "+386-##-###-###", cc: "SI", cd: "Slovenia" },
                {
                  mask: "+421(###)###-###",
                  cc: "SK",
                  cd: "Slovakia",
                },
                { mask: "+232-##-######", cc: "SL", cd: "Sierra Leone" },
                {
                  mask: "+378-####-######",
                  cc: "SM",
                  cd: "San Marino",
                },
                { mask: "+221-##-###-####", cc: "SN", cd: "Senegal" },
                {
                  mask: "+252-##-###-###",
                  cc: "SO",
                  cd: "Somalia",
                },
                { mask: "+252-#-###-###", cc: "SO", cd: "Somalia" },
                {
                  mask: "+252-#-###-###",
                  cc: "SO",
                  cd: "Somalia ",
                },
                { mask: "+597-###-####", cc: "SR", cd: "Suriname " },
                {
                  mask: "+597-###-###",
                  cc: "SR",
                  cd: "Suriname",
                },
                { mask: "+211-##-###-####", cc: "SS", cd: "South Sudan" },
                {
                  mask: "+239-##-#####",
                  cc: "ST",
                  cd: "Sao Tome and Principe",
                },
                { mask: "+503-##-##-####", cc: "SV", cd: "El Salvador" },
                {
                  mask: "+1(721)###-####",
                  cc: "SX",
                  cd: "Sint Maarten",
                },
                {
                  mask: "+963-##-####-###",
                  cc: "SY",
                  cd: "Syrian Arab Republic",
                },
                {
                  mask: "+268-##-##-####",
                  cc: "SZ",
                  cd: "Swaziland",
                },
                { mask: "+1(649)###-####", cc: "TC", cd: "Turks & Caicos" },
                {
                  mask: "+235-##-##-##-##",
                  cc: "TD",
                  cd: "Chad",
                },
                { mask: "+228-##-###-###", cc: "TG", cd: "Togo" },
                {
                  mask: "+66-##-###-####",
                  cc: "TH",
                  cd: "Thailand ",
                },
                { mask: "+66-##-###-###", cc: "TH", cd: "Thailand" },
                {
                  mask: "+992-##-###-####",
                  cc: "TJ",
                  cd: "Tajikistan",
                },
                { mask: "+690-####", cc: "TK", cd: "Tokelau" },
                {
                  mask: "+670-###-####",
                  cc: "TL",
                  cd: "East Timor",
                },
                { mask: "+670-77#-#####", cc: "TL", cd: "East Timor" },
                {
                  mask: "+670-78#-#####",
                  cc: "TL",
                  cd: "East Timor",
                },
                { mask: "+993-#-###-####", cc: "TM", cd: "Turkmenistan" },
                {
                  mask: "+216-##-###-###",
                  cc: "TN",
                  cd: "Tunisia",
                },
                { mask: "+676-#####", cc: "TO", cd: "Tonga" },
                {
                  mask: "+90(###)###-####",
                  cc: "TR",
                  cd: "Turkey",
                },
                { mask: "+1(868)###-####", cc: "TT", cd: "Trinidad & Tobago" },
                {
                  mask: "+688-90####",
                  cc: "TV",
                  cd: "Tuvalu ",
                },
                { mask: "+688-2####", cc: "TV", cd: "Tuvalu" },
                {
                  mask: "+886-#-####-####",
                  cc: "TW",
                  cd: "Taiwan",
                },
                { mask: "+886-####-####", cc: "TW", cd: "Taiwan" },
                {
                  mask: "+255-##-###-####",
                  cc: "TZ",
                  cd: "Tanzania",
                },
                { mask: "+38(0##)###-##-##", cc: "UA", cd: "Ukraine" },
                {
                  mask: "+256(###)###-###",
                  cc: "UG",
                  cd: "Uganda",
                },
                { mask: "+44-##-####-####", cc: "UK", cd: "United Kingdom" },
                {
                  mask: "+598-#-###-##-##",
                  cc: "UY",
                  cd: "Uruguay",
                },
                { mask: "+998-##-###-####", cc: "UZ", cd: "Uzbekistan" },
                {
                  mask: "+39-6-698-#####",
                  cc: "VA",
                  cd: "Vatican City",
                },
                {
                  mask: "+1(784)###-####",
                  cc: "VC",
                  cd: "Saint Vincent & the Grenadines",
                },
                {
                  mask: "+58(###)###-####",
                  cc: "VE",
                  cd: "Venezuela",
                },
                {
                  mask: "+1(284)###-####",
                  cc: "VG",
                  cd: "British Virgin Islands",
                },
                {
                  mask: "+1(340)###-####",
                  cc: "VI",
                  cd: "US Virgin Islands",
                },
                { mask: "+84-##-####-###", cc: "VN", cd: "Vietnam" },
                {
                  mask: "+84(###)####-###",
                  cc: "VN",
                  cd: "Vietnam",
                },
                { mask: "+678-##-#####", cc: "VU", cd: "Vanuatu " },
                {
                  mask: "+678-#####",
                  cc: "VU",
                  cd: "Vanuatu",
                },
                { mask: "+681-##-####", cc: "WF", cd: "Wallis and Futuna" },
                {
                  mask: "+685-##-####",
                  cc: "WS",
                  cd: "Samoa",
                },
                { mask: "+967-###-###-###", cc: "YE", cd: "Yemen " },
                {
                  mask: "+967-#-###-###",
                  cc: "YE",
                  cd: "Yemen",
                },
                { mask: "+967-##-###-###", cc: "YE", cd: "Yemen" },
                {
                  mask: "+27-##-###-####",
                  cc: "ZA",
                  cd: "South Africa",
                },
                { mask: "+260-##-###-####", cc: "ZM", cd: "Zambia" },
                {
                  mask: "+263-#-######",
                  cc: "ZW",
                  cd: "Zimbabwe",
                },
                { mask: "+1(###)###-####", cc: "US", cd: "USA and Canada" },
                {
                  mask: "+1(###)###-####",
                  cc: "CA",
                  cd: "USA and Canada",
                },
              ],
              ipProvider: "http://freegeoip.net/json/?callback=?",
              defaultMask: "+38(###)###-##-##",
              clearSymbols: !1,
              element: 'input[type="tel"]',
            },
            arguments[0]
          ));
    }),
      (IPTelMask.prototype.init = function () {
        0 !== $(this.options.element).lenght
          ? a.call(this)
          : console.log("Elements to aplly mask not found!");
      });
  })();
