// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList');
var $lastLi = $siteList.find('li.last');
var x = localStorage.getItem('x');
var xObject = JSON.parse(x);
window.hashMap = xObject || [{
  logo: "M",
  name: "MDN",
  url: "https://mdn.io"
}, {
  logo: "J",
  name: "掘金",
  url: "https://juejin.im"
}, {
  logo: "Z",
  name: "知乎",
  url: "https://zhihu.com"
}, {
  logo: "C",
  name: "CSDN",
  url: "https://bbs.csdn.net"
}, {
  logo: "G",
  name: "Github",
  url: "https://github.io"
}, {
  logo: "I",
  name: "Iconfont",
  url: "https://www.iconfont.cn"
}, {
  logo: "N",
  name: "牛客网",
  url: "https://www.nowcoder.com/"
}];

var simplifyURL = function simplifyURL(url) {
  return url.replace('https://', '').replace('http://', '').replace("www.", '').replace(/\/.*/, ''); //删除以 / 开头的内容
};

var render = function render() {
  $siteList.find('li:not(.last)').remove();
  hashMap.forEach(function (node, index) {
    var $li = $("<li>\n            <div class=\"site\">\n                <div class=\"logo\">\n                    ".concat(node.logo[0], "\n                </div>\n                <div class=\"link\">\n                ").concat(node.name, "\n                </div>\n                <div class=\"close\">\n                <svg class=\"icon\">\n                    <use xlink:href=\"#icon-close\"></use>\n                </svg>\n                </div>\n            </div>\n         </li>")).insertBefore($lastLi);
    $li.on('click', function () {
      window.open(node.url);
    });
    $li.on('click', '.close', function (e) {
      alert("是否删除此站点卡片？");
      e.stopPropagation(); // 点close退出时不会进入a标签

      hashMap.splice(index, 1);
      render();
    });
  });
};

render();

var resetInput = function resetInput() {
  $('input[name="name"]').val("");
  $('input[name="url"]').val("");
};

var getInput = function getInput() {
  var name = $('input[name="name"]').val();
  var url = $('input[name="url"]').val();
  console.log(name, url);

  if (url.indexOf('http') !== 0 && url !== "") {
    url = 'https://' + url; // 网址开头不是http时自动在开头添加https
  }

  if (name === "") {
    name = simplifyURL(url); // 用户没有填写快捷方式名称时，则把url作为站点名称
  }

  hashMap.push({
    logo: simplifyURL(url)[0].toUpperCase(),
    name: name,
    url: url
  });
  resetInput();
  render();
  return name, url;
};

$('.cancel').on('click', function () {
  $('.dialogContainer').hide();
});
$('.confirm').on('click', function () {
  $('.dialogContainer').hide();
  getInput();
});
$('.nameInput').on('focus', function () {
  $('.underlineName').fadeIn();
}).on('blur', function () {
  $('.underlineName').fadeOut('fast');
});
$('.urlInput').on('focus', function () {
  $('.underlineUrl').fadeIn();
}).on('blur', function () {
  $('.underlineUrl').fadeOut('fast');
}).on('keyup', function () {
  if (event.keyCode === 13) {
    getInput();
    $('.dialogContainer').hide();
  }
});
$('.addButton').on('click', function () {
  $('.dialogContainer').show();
});

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  window.localStorage.setItem('x', string); // 在用户离开页面时把网址块存到localStorage中
};
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.11faf864.js.map