(function (win, lib) {
  var doc = win.document;
  var docEl = doc.documentElement;
  var metaEl = doc.querySelector('meta[name="viewport"]');
  var flexibleEl = doc.querySelector('meta[name="flexible"]');
  var dpr = 0;
  var scale = 0;
  var tid;
  var flexible = lib.flexible || (lib.flexible = {});

  if (metaEl) {
    console.warn('将根据已有的meta标签来设置缩放比例');
    var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
    if (match) {
      scale = parseFloat(match[1]);
      dpr = parseInt(1 / scale);
    }
  } else if (flexibleEl) {
    var content = flexibleEl.getAttribute('content');
    if (content) {
      var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
      var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
      if (initialDpr) {
        dpr = parseFloat(initialDpr[1]);
        scale = parseFloat((1 / dpr).toFixed(2));
      }
      if (maximumDpr) {
        dpr = parseFloat(maximumDpr[1]);
        scale = parseFloat((1 / dpr).toFixed(2));
      }
    }
  }
  if (!dpr && !scale) {
    var isAndroid = win.navigator.appVersion.match(/android/gi);
    var isIPhone = win.navigator.appVersion.match(/iphone/gi);
    var devicePixelRatio = win.devicePixelRatio;
    if (isIPhone) {
      // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
      if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
        dpr = 3;
      } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
        dpr = 2;
      } else {
        dpr = 1;
      }
    } else {
      // 其他设备下，仍旧使用1倍的方案
      dpr = 1;
    }
    scale = 1 / dpr;
  }
  docEl.setAttribute('data-dpr', dpr);
  if (!metaEl) {
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
    if (docEl.firstElementChild) {
      docEl.firstElementChild.appendChild(metaEl);
    } else {
      var wrap = doc.createElement('div');
      wrap.appendChild(metaEl);
      doc.write(wrap.innerHTML);
    }
  }

  function refreshRem() {
    var width = docEl.getBoundingClientRect().width;
    if (width / dpr > 540) {
      width = 540 * dpr;
    }
    var rem = width / 10;
    docEl.style.fontSize = rem + 'px';
    flexible.rem = win.rem = rem;
  }

  win.addEventListener('resize', function () {
    clearTimeout(tid);
    tid = setTimeout(refreshRem, 300);
  }, false);
  win.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      clearTimeout(tid);
      tid = setTimeout(refreshRem, 300);
    }
  }, false);
  if (doc.readyState === 'complete') {
    doc.body.style.fontSize = 12 * dpr + 'px';
  } else {
    doc.addEventListener('DOMContentLoaded', function (e) {
      doc.body.style.fontSize = 12 * dpr + 'px';
    }, false);
  }

  refreshRem();
  flexible.dpr = win.dpr = dpr;
  flexible.refreshRem = refreshRem;
  flexible.rem2px = function (d) {
    var val = parseFloat(d) * this.rem;
    if (typeof d === 'string' && d.match(/rem$/)) {
      val += 'px';
    }
    return val;
  }
  flexible.px2rem = function (d) {
    var val = parseFloat(d) / this.rem;
    if (typeof d === 'string' && d.match(/px$/)) {
      val += 'rem';
    }
    return val;
  }
})(window, window['lib'] || (window['lib'] = {}));
(function (window) { //传入window，提高变量的查找效率
  function myQuery(selector) { //这个函数就是对外提供的接口。
    //调用这个函数的原型对象上的_init方法，并返回
    return myQuery.prototype._init(selector);
  }

  myQuery.prototype = {
    /*初始化方法，获取当前query对象的方法*/
    _init: function (selector) {
      if (typeof selector == "string") {
        //把查找到的元素存入到这个原型对象上。
        this.ele = window.document.querySelector(selector);
        //返回值其实就是原型对象。
        return this;
      }
    },
    /*单击事件：
     * 为了规避click的300ms的延迟，自定义一个单击事件
     * 触发时间：
     *   当抬起手指的时候触发
     *   需要判断手指落下和手指抬起的事件间隔，如果小于500ms表示单击时间。
     *
     *   如果是大于等于500ms，算是长按时间
     * */
    tap: function (handler) {
      this.ele.addEventListener("touchstart", touchFn);
      this.ele.addEventListener("touchend", touchFn);

      var startTime,
        endTime;

      function touchFn(e) {
        e.preventDefault()
        switch (e.type) {
          case "touchstart":
            startTime = new Date().getTime();
            break;
          case "touchend":
            endTime = new Date().getTime();
            if (endTime - startTime < 500) {
              handler.call(this, e);
            }
            break;
        }
      }
    },
    /**
     * 长按
     * @param handler
     */
    longTag: function (handler) {
      this.ele.addEventListener("touchstart", touchFn);
      this.ele.addEventListener("touchmove", touchFn);
      this.ele.addEventListener("touchend", touchFn);
      var timerId;

      function touchFn(e) {
        switch (e.type) {
          case "touchstart": //500ms之后执行
            timerId = setTimeout(function () {
              handler.call(this, e);
            }, 500)
            break;
          case "touchmove":
            //如果中间有移动也清除定时器
            clearTimeout(timerId)
            break;
          case "touchend":
            //如果在500ms之内抬起了手指，则需要定时器
            clearTimeout(timerId);
            break;
        }
      }
    },
    /**
     * 左侧滑动。
     记录手指按下的左边，在离开的时候计算 deltaX是否满足左滑的条件
     *
     */
    slideLeft: function (handler) {
      this.ele.addEventListener("touchstart", touchFn);
      this.ele.addEventListener("touchend", touchFn);
      var startX, startY, endX, endY;

      function touchFn(e) {
        e.preventDefault();
        var firstTouch = e.changedTouches[0];
        switch (e.type) {
          case "touchstart":
            startX = firstTouch.pageX;
            startY = firstTouch.pageY;
            break;
          case "touchend":
            endX = firstTouch.pageX;
            endY = firstTouch.pageY;
            //x方向移动大于y方向的移动，并且x方向的移动大于25个像素，表示在向左侧滑动
            if (Math.abs(endX - startX) >= Math.abs(endY - startY) && startX - endX >= 25) {
              handler.call(this, e);
            }
            break;
        }
      }
    },
    /**
     * 右侧滑动。
     *
     */
    rightLeft: function (e) {
      //TODO:
    }
  }
  window._ = window.myQuery = myQuery;
})(window);
