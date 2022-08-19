var f = Object.defineProperty;
var h = (l, s, e) => s in l ? f(l, s, { enumerable: !0, configurable: !0, writable: !0, value: e }) : l[s] = e;
var c = (l, s, e) => (h(l, typeof s != "symbol" ? s + "" : s, e), e);
class a {
  constructor() {
    c(this, "listeners");
    this.listeners = {};
  }
  addEventListener(s, e, i, ...n) {
    typeof this.listeners[s] < "u" ? this.listeners[s].push({ scope: i, callback: e, args: n }) : this.listeners[s] = [{ scope: i, callback: e, args: n }];
  }
  removeEventListener(s, e, i) {
    if (typeof this.listeners[s] > "u")
      return;
    const n = this.listeners[s].length, t = [];
    for (let r = 0; r < n; r++) {
      const o = this.listeners[s][r];
      o.scope === i && o.callback === e || t.push(o);
    }
    this.listeners[s] = t;
  }
  dispatch(s, ...e) {
    if (typeof this.listeners[s] > "u")
      return;
    const i = this.listeners[s];
    for (let n = 0; n < i.length; n++) {
      const t = i[n];
      if (t && t.callback) {
        const r = e.concat(t.args);
        t.callback.apply(t.scope, r);
      }
    }
  }
  hasEventListener(s, e, i) {
    if (typeof this.listeners[s] < "u") {
      const n = this.listeners[s].length;
      if (e === void 0 && i === void 0)
        return n > 0;
      for (let t = 0; t < n; t++) {
        const r = this.listeners[s][t];
        if ((i ? r.scope === i : !0) && r.callback === e)
          return !0;
      }
    }
    return !1;
  }
}
export {
  a as default
};
