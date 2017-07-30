/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	;(function() {
		var $ = __webpack_require__(7);
		var Ajax = __webpack_require__(8);
		var pagejump = __webpack_require__(33);

		__webpack_require__(13);
		var Emoji = __webpack_require__(34);

		/***********************实现个人中心页面的功能**************************/
		/*实现亮起功能*/
		function PersonRemind() {
		    this.len = $(".newpersoncenterwrap .customerservice li").length;
		    for (var i = 0; i < this.len; i++) {
		        if (parseFloat($(".newpersoncenterwrap .customerservice li").eq(i).find(".remind").html()) > 0) {
		            $(".newpersoncenterwrap .customerservice li").eq(i).find(".remind").show();
		        } else {
		            $(".newpersoncenterwrap .customerservice li").eq(i).find(".remind").hide();
		        }
		    }
		}
		new PersonRemind();

		/*实现TAB切换功能*/

		function PersonTab(mainEle, otherEle, tabchoice, conchoice) {
		    $(mainEle).tap(function() {
		        $(this).addClass(tabchoice).siblings().removeClass(tabchoice);
		        $(otherEle).eq($(this).index()).addClass(conchoice).siblings().removeClass(conchoice);
		    })
		}
		new PersonTab(".newpersoncenterwrap .bannertabcon li", ".newpersoncenterwrap .bannercon", "personchoice", "conshow");

		/*实现弹出框效果*/
		$(".newpersoncenterwrap .identification").tap(function() {
		    var _this = this;

		    this.tapss = $(this);
		    this.timer = 0;

		    function Taps() {
		        clearInterval(_this.timer);
		        this.content = "身份信息审核中，请耐心等待审核结果";
		        $(".newpersoncenterwrap .personremind").html(this.content);
		        $(".newpersoncenterwrap .personremind").addClass("personremindchoice");
		        _this.tapss.off("tap");

		        _this.timer = setInterval(function() {
		            $(".newpersoncenterwrap .personremind").removeClass("personremindchoice");
		            _this.tapss.on("tap", function() {
		                new Taps();
		            })
		        }, 3000)
		    }
		    // new Taps();

		})

		/*点击实现弹出框*/
		$(".newpersoncenterwrap .merchants").tap(function() {
		    var _this = this;

		    this.tapsc = $(this);
		    this.timer = 0;

		    function Tapsc() {
		        clearInterval(_this.timer);
		        this.contents = "请先进行个人实名认证";
		        $(".newpersoncenterwrap .personremind").html(this.contents);
		        $(".newpersoncenterwrap .personremind").addClass("personremindchoices");
		        _this.tapsc.off("tap");

		        _this.timer = setInterval(function() {
		            $(".newpersoncenterwrap .personremind").removeClass("personremindchoices");
		            _this.tapsc.on("tap", function() {
		                new Tapsc();
		            })
		        }, 3000)
		    }
		    new Tapsc();
		});

		var Personcenter = {
			showAjax: function() {
				Ajax({
		            urls: "member/memberIndex!getData.do",
		            types: "get",
		            dataTypes: "json",
		            successes: function(data) {
		                datas = JSON.parse(data);
		                console.log(datas);
		                if(datas.res_code == 0) {

							pagejump.loginJump((window.location.href).split("/")[(window.location.href).split("/").length - 1])
							////保存当前需要跳转的页面
							//window.sessionStorage.setItem()
							//window.location.href = "../cn/login.html";
		                } else {
		                	var face = datas.res_data.member.face == "" ? datas.res_data.member.weixin_face : datas.res_data.member.face;
		                	$(".bannerbox img").attr("src", face);
		                	$(".maincon .name span").html(datas.res_data.member.nickname);
		                	$(".personothers .vip span").html(datas.res_data.member.lvname);

		                	//白积分
		                	$(".moneycon").eq(0).find("span em").html(datas.res_data.whitePoint);

		                	//红积分
		                	$(".moneycon").eq(1).find("span em").html(datas.res_data.redPoint);

		                	//绿积分
		                	$(".moneycon").eq(2).find("span em").html(datas.res_data.member.point_green);

		                	//预存款
		                	$(".moneycon").eq(3).find("span em").html(datas.res_data.member.advance);

		                	$(".customerservice li").eq(0).find(".remind").html(datas.res_data.topay_num);
		                	$(".customerservice li").eq(1).find(".remind").html(datas.res_data.todelivery_num);
		                	$(".customerservice li").eq(2).find(".remind").html(datas.res_data.toreceive_num);
		                	$(".customerservice li").eq(3).find(".remind").html(datas.res_data.toservice_num);

		                	if(datas.CheckName) {
		                		switch(datas.res_data.CheckName.check_status) {
		                			case 0:
		                				$(".identification").html("正在审核");
		                				$(".identification").attr("href", "shimingrenzheng.html/0");
		                				break;
		                			case 1:
		                				$(".identification").html("已审核");
		                				$(".identification").attr("href", "shimingrenzheng.html/1");
		                				break;
		                			case -1:
		                				$(".identification").html("未通过");
		                				$(".identification").attr("href", "shimingrenzheng.html/-1");
		                				break;
		                		}
		                	} else {
		                		$(".identification").html("去认证");
		                	}
		                }

						//页面需要显示unicode编码的字符，可以后台或前端进行转换,数据库保存的是utf8mb4编码,读出来后，需要转换一次
						$(".emoji").emoji();
						console.log($(".emoji").emoji())
		            },
		            errors: function(data) {
		                console.log(data);
		            }
		        });
		        return this;
			},
			logOff: function() {
				$(".logoff").tap(function() {
					Ajax({
			            urls: "member/logout!logout.do",
			            types: "get",
			            dataTypes: "json",
			            successes: function(data) {
			                logdata = JSON.parse(data);
			                console.log(logdata);
			               	window.location.href = "../cn/login.html";
			            },
			            errors: function(data) {
			                console.log(data);
			            }
			        });
			        return this;
				});
			}
		}
		Personcenter.showAjax().logOff();
	})();

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

	/* Zepto v1.1.6 - zepto event ajax form ie - zeptojs.com/license */

	var Zepto = module.exports = (function() {
	  var undefined, key, $, classList, emptyArray = [], slice = emptyArray.slice, filter = emptyArray.filter,
	    document = window.document,
	    elementDisplay = {}, classCache = {},
	    cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },
	    fragmentRE = /^\s*<(\w+|!)[^>]*>/,
	    singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
	    tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
	    rootNodeRE = /^(?:body|html)$/i,
	    capitalRE = /([A-Z])/g,

	    // special attributes that should be get/set via method calls
	    methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],

	    adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],
	    table = document.createElement('table'),
	    tableRow = document.createElement('tr'),
	    containers = {
	      'tr': document.createElement('tbody'),
	      'tbody': table, 'thead': table, 'tfoot': table,
	      'td': tableRow, 'th': tableRow,
	      '*': document.createElement('div')
	    },
	    readyRE = /complete|loaded|interactive/,
	    simpleSelectorRE = /^[\w-]*$/,
	    class2type = {},
	    toString = class2type.toString,
	    zepto = {},
	    camelize, uniq,
	    tempParent = document.createElement('div'),
	    propMap = {
	      'tabindex': 'tabIndex',
	      'readonly': 'readOnly',
	      'for': 'htmlFor',
	      'class': 'className',
	      'maxlength': 'maxLength',
	      'cellspacing': 'cellSpacing',
	      'cellpadding': 'cellPadding',
	      'rowspan': 'rowSpan',
	      'colspan': 'colSpan',
	      'usemap': 'useMap',
	      'frameborder': 'frameBorder',
	      'contenteditable': 'contentEditable'
	    },
	    isArray = Array.isArray ||
	      function(object){ return object instanceof Array }

	  zepto.matches = function(element, selector) {
	    if (!selector || !element || element.nodeType !== 1) return false
	    var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector ||
	                          element.oMatchesSelector || element.matchesSelector
	    if (matchesSelector) return matchesSelector.call(element, selector)
	    // fall back to performing a selector:
	    var match, parent = element.parentNode, temp = !parent
	    if (temp) (parent = tempParent).appendChild(element)
	    match = ~zepto.qsa(parent, selector).indexOf(element)
	    temp && tempParent.removeChild(element)
	    return match
	  }

	  function type(obj) {
	    return obj == null ? String(obj) :
	      class2type[toString.call(obj)] || "object"
	  }

	  function isFunction(value) { return type(value) == "function" }
	  function isWindow(obj)     { return obj != null && obj == obj.window }
	  function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
	  function isObject(obj)     { return type(obj) == "object" }
	  function isPlainObject(obj) {
	    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
	  }
	  function likeArray(obj) { return typeof obj.length == 'number' }

	  function compact(array) { return filter.call(array, function(item){ return item != null }) }
	  function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }
	  camelize = function(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }
	  function dasherize(str) {
	    return str.replace(/::/g, '/')
	           .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
	           .replace(/([a-z\d])([A-Z])/g, '$1_$2')
	           .replace(/_/g, '-')
	           .toLowerCase()
	  }
	  uniq = function(array){ return filter.call(array, function(item, idx){ return array.indexOf(item) == idx }) }

	  function classRE(name) {
	    return name in classCache ?
	      classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
	  }

	  function maybeAddPx(name, value) {
	    return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
	  }

	  function defaultDisplay(nodeName) {
	    var element, display
	    if (!elementDisplay[nodeName]) {
	      element = document.createElement(nodeName)
	      document.body.appendChild(element)
	      display = getComputedStyle(element, '').getPropertyValue("display")
	      element.parentNode.removeChild(element)
	      display == "none" && (display = "block")
	      elementDisplay[nodeName] = display
	    }
	    return elementDisplay[nodeName]
	  }

	  function children(element) {
	    return 'children' in element ?
	      slice.call(element.children) :
	      $.map(element.childNodes, function(node){ if (node.nodeType == 1) return node })
	  }

	  // `$.zepto.fragment` takes a html string and an optional tag name
	  // to generate DOM nodes nodes from the given html string.
	  // The generated DOM nodes are returned as an array.
	  // This function can be overriden in plugins for example to make
	  // it compatible with browsers that don't support the DOM fully.
	  zepto.fragment = function(html, name, properties) {
	    var dom, nodes, container

	    // A special case optimization for a single tag
	    if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))

	    if (!dom) {
	      if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
	      if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
	      if (!(name in containers)) name = '*'

	      container = containers[name]
	      container.innerHTML = '' + html
	      dom = $.each(slice.call(container.childNodes), function(){
	        container.removeChild(this)
	      })
	    }

	    if (isPlainObject(properties)) {
	      nodes = $(dom)
	      $.each(properties, function(key, value) {
	        if (methodAttributes.indexOf(key) > -1) nodes[key](value)
	        else nodes.attr(key, value)
	      })
	    }

	    return dom
	  }

	  // `$.zepto.Z` swaps out the prototype of the given `dom` array
	  // of nodes with `$.fn` and thus supplying all the Zepto functions
	  // to the array. Note that `__proto__` is not supported on Internet
	  // Explorer. This method can be overriden in plugins.
	  zepto.Z = function(dom, selector) {
	    dom = dom || []
	    dom.__proto__ = $.fn
	    dom.selector = selector || ''
	    return dom
	  }

	  // `$.zepto.isZ` should return `true` if the given object is a Zepto
	  // collection. This method can be overriden in plugins.
	  zepto.isZ = function(object) {
	    return object instanceof zepto.Z
	  }

	  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
	  // takes a CSS selector and an optional context (and handles various
	  // special cases).
	  // This method can be overriden in plugins.
	  zepto.init = function(selector, context) {
	    var dom
	    // If nothing given, return an empty Zepto collection
	    if (!selector) return zepto.Z()
	    // Optimize for string selectors
	    else if (typeof selector == 'string') {
	      selector = selector.trim()
	      // If it's a html fragment, create nodes from it
	      // Note: In both Chrome 21 and Firefox 15, DOM error 12
	      // is thrown if the fragment doesn't begin with <
	      if (selector[0] == '<' && fragmentRE.test(selector))
	        dom = zepto.fragment(selector, RegExp.$1, context), selector = null
	      // If there's a context, create a collection on that context first, and select
	      // nodes from there
	      else if (context !== undefined) return $(context).find(selector)
	      // If it's a CSS selector, use it to select nodes.
	      else dom = zepto.qsa(document, selector)
	    }
	    // If a function is given, call it when the DOM is ready
	    else if (isFunction(selector)) return $(document).ready(selector)
	    // If a Zepto collection is given, just return it
	    else if (zepto.isZ(selector)) return selector
	    else {
	      // normalize array if an array of nodes is given
	      if (isArray(selector)) dom = compact(selector)
	      // Wrap DOM nodes.
	      else if (isObject(selector))
	        dom = [selector], selector = null
	      // If it's a html fragment, create nodes from it
	      else if (fragmentRE.test(selector))
	        dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
	      // If there's a context, create a collection on that context first, and select
	      // nodes from there
	      else if (context !== undefined) return $(context).find(selector)
	      // And last but no least, if it's a CSS selector, use it to select nodes.
	      else dom = zepto.qsa(document, selector)
	    }
	    // create a new Zepto collection from the nodes found
	    return zepto.Z(dom, selector)
	  }

	  // `$` will be the base `Zepto` object. When calling this
	  // function just call `$.zepto.init, which makes the implementation
	  // details of selecting nodes and creating Zepto collections
	  // patchable in plugins.
	  $ = function(selector, context){
	    return zepto.init(selector, context)
	  }

	  function extend(target, source, deep) {
	    for (key in source)
	      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
	        if (isPlainObject(source[key]) && !isPlainObject(target[key]))
	          target[key] = {}
	        if (isArray(source[key]) && !isArray(target[key]))
	          target[key] = []
	        extend(target[key], source[key], deep)
	      }
	      else if (source[key] !== undefined) target[key] = source[key]
	  }

	  // Copy all but undefined properties from one or more
	  // objects to the `target` object.
	  $.extend = function(target){
	    var deep, args = slice.call(arguments, 1)
	    if (typeof target == 'boolean') {
	      deep = target
	      target = args.shift()
	    }
	    args.forEach(function(arg){ extend(target, arg, deep) })
	    return target
	  }

	  // `$.zepto.qsa` is Zepto's CSS selector implementation which
	  // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
	  // This method can be overriden in plugins.
	  zepto.qsa = function(element, selector){
	    var found,
	        maybeID = selector[0] == '#',
	        maybeClass = !maybeID && selector[0] == '.',
	        nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked
	        isSimple = simpleSelectorRE.test(nameOnly)
	    return (isDocument(element) && isSimple && maybeID) ?
	      ( (found = element.getElementById(nameOnly)) ? [found] : [] ) :
	      (element.nodeType !== 1 && element.nodeType !== 9) ? [] :
	      slice.call(
	        isSimple && !maybeID ?
	          maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
	          element.getElementsByTagName(selector) : // Or a tag
	          element.querySelectorAll(selector) // Or it's not simple, and we need to query all
	      )
	  }

	  function filtered(nodes, selector) {
	    return selector == null ? $(nodes) : $(nodes).filter(selector)
	  }

	  $.contains = document.documentElement.contains ?
	    function(parent, node) {
	      return parent !== node && parent.contains(node)
	    } :
	    function(parent, node) {
	      while (node && (node = node.parentNode))
	        if (node === parent) return true
	      return false
	    }

	  function funcArg(context, arg, idx, payload) {
	    return isFunction(arg) ? arg.call(context, idx, payload) : arg
	  }

	  function setAttribute(node, name, value) {
	    value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
	  }

	  // access className property while respecting SVGAnimatedString
	  function className(node, value){
	    var klass = node.className || '',
	        svg   = klass && klass.baseVal !== undefined

	    if (value === undefined) return svg ? klass.baseVal : klass
	    svg ? (klass.baseVal = value) : (node.className = value)
	  }

	  // "true"  => true
	  // "false" => false
	  // "null"  => null
	  // "42"    => 42
	  // "42.5"  => 42.5
	  // "08"    => "08"
	  // JSON    => parse if valid
	  // String  => self
	  function deserializeValue(value) {
	    try {
	      return value ?
	        value == "true" ||
	        ( value == "false" ? false :
	          value == "null" ? null :
	          +value + "" == value ? +value :
	          /^[\[\{]/.test(value) ? $.parseJSON(value) :
	          value )
	        : value
	    } catch(e) {
	      return value
	    }
	  }

	  $.type = type
	  $.isFunction = isFunction
	  $.isWindow = isWindow
	  $.isArray = isArray
	  $.isPlainObject = isPlainObject

	  $.isEmptyObject = function(obj) {
	    var name
	    for (name in obj) return false
	    return true
	  }

	  $.inArray = function(elem, array, i){
	    return emptyArray.indexOf.call(array, elem, i)
	  }

	  $.camelCase = camelize
	  $.trim = function(str) {
	    return str == null ? "" : String.prototype.trim.call(str)
	  }

	  // plugin compatibility
	  $.uuid = 0
	  $.support = { }
	  $.expr = { }

	  $.map = function(elements, callback){
	    var value, values = [], i, key
	    if (likeArray(elements))
	      for (i = 0; i < elements.length; i++) {
	        value = callback(elements[i], i)
	        if (value != null) values.push(value)
	      }
	    else
	      for (key in elements) {
	        value = callback(elements[key], key)
	        if (value != null) values.push(value)
	      }
	    return flatten(values)
	  }

	  $.each = function(elements, callback){
	    var i, key
	    if (likeArray(elements)) {
	      for (i = 0; i < elements.length; i++)
	        if (callback.call(elements[i], i, elements[i]) === false) return elements
	    } else {
	      for (key in elements)
	        if (callback.call(elements[key], key, elements[key]) === false) return elements
	    }

	    return elements
	  }

	  $.grep = function(elements, callback){
	    return filter.call(elements, callback)
	  }

	  if (window.JSON) $.parseJSON = JSON.parse

	  // Populate the class2type map
	  $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	    class2type[ "[object " + name + "]" ] = name.toLowerCase()
	  })

	  // Define methods that will be available on all
	  // Zepto collections
	  $.fn = {
	    // Because a collection acts like an array
	    // copy over these useful array functions.
	    forEach: emptyArray.forEach,
	    reduce: emptyArray.reduce,
	    push: emptyArray.push,
	    sort: emptyArray.sort,
	    indexOf: emptyArray.indexOf,
	    concat: emptyArray.concat,

	    // `map` and `slice` in the jQuery API work differently
	    // from their array counterparts
	    map: function(fn){
	      return $($.map(this, function(el, i){ return fn.call(el, i, el) }))
	    },
	    slice: function(){
	      return $(slice.apply(this, arguments))
	    },

	    ready: function(callback){
	      // need to check if document.body exists for IE as that browser reports
	      // document ready when it hasn't yet created the body element
	      if (readyRE.test(document.readyState) && document.body) callback($)
	      else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false)
	      return this
	    },
	    get: function(idx){
	      return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
	    },
	    toArray: function(){ return this.get() },
	    size: function(){
	      return this.length
	    },
	    remove: function(){
	      return this.each(function(){
	        if (this.parentNode != null)
	          this.parentNode.removeChild(this)
	      })
	    },
	    each: function(callback){
	      emptyArray.every.call(this, function(el, idx){
	        return callback.call(el, idx, el) !== false
	      })
	      return this
	    },
	    filter: function(selector){
	      if (isFunction(selector)) return this.not(this.not(selector))
	      return $(filter.call(this, function(element){
	        return zepto.matches(element, selector)
	      }))
	    },
	    add: function(selector,context){
	      return $(uniq(this.concat($(selector,context))))
	    },
	    is: function(selector){
	      return this.length > 0 && zepto.matches(this[0], selector)
	    },
	    not: function(selector){
	      var nodes=[]
	      if (isFunction(selector) && selector.call !== undefined)
	        this.each(function(idx){
	          if (!selector.call(this,idx)) nodes.push(this)
	        })
	      else {
	        var excludes = typeof selector == 'string' ? this.filter(selector) :
	          (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
	        this.forEach(function(el){
	          if (excludes.indexOf(el) < 0) nodes.push(el)
	        })
	      }
	      return $(nodes)
	    },
	    has: function(selector){
	      return this.filter(function(){
	        return isObject(selector) ?
	          $.contains(this, selector) :
	          $(this).find(selector).size()
	      })
	    },
	    eq: function(idx){
	      return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)
	    },
	    first: function(){
	      var el = this[0]
	      return el && !isObject(el) ? el : $(el)
	    },
	    last: function(){
	      var el = this[this.length - 1]
	      return el && !isObject(el) ? el : $(el)
	    },
	    find: function(selector){
	      var result, $this = this
	      if (!selector) result = $()
	      else if (typeof selector == 'object')
	        result = $(selector).filter(function(){
	          var node = this
	          return emptyArray.some.call($this, function(parent){
	            return $.contains(parent, node)
	          })
	        })
	      else if (this.length == 1) result = $(zepto.qsa(this[0], selector))
	      else result = this.map(function(){ return zepto.qsa(this, selector) })
	      return result
	    },
	    closest: function(selector, context){
	      var node = this[0], collection = false
	      if (typeof selector == 'object') collection = $(selector)
	      while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))
	        node = node !== context && !isDocument(node) && node.parentNode
	      return $(node)
	    },
	    parents: function(selector){
	      var ancestors = [], nodes = this
	      while (nodes.length > 0)
	        nodes = $.map(nodes, function(node){
	          if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
	            ancestors.push(node)
	            return node
	          }
	        })
	      return filtered(ancestors, selector)
	    },
	    parent: function(selector){
	      return filtered(uniq(this.pluck('parentNode')), selector)
	    },
	    children: function(selector){
	      return filtered(this.map(function(){ return children(this) }), selector)
	    },
	    contents: function() {
	      return this.map(function() { return slice.call(this.childNodes) })
	    },
	    siblings: function(selector){
	      return filtered(this.map(function(i, el){
	        return filter.call(children(el.parentNode), function(child){ return child!==el })
	      }), selector)
	    },
	    empty: function(){
	      return this.each(function(){ this.innerHTML = '' })
	    },
	    // `pluck` is borrowed from Prototype.js
	    pluck: function(property){
	      return $.map(this, function(el){ return el[property] })
	    },
	    show: function(){
	      return this.each(function(){
	        this.style.display == "none" && (this.style.display = '')
	        if (getComputedStyle(this, '').getPropertyValue("display") == "none")
	          this.style.display = defaultDisplay(this.nodeName)
	      })
	    },
	    replaceWith: function(newContent){
	      return this.before(newContent).remove()
	    },
	    wrap: function(structure){
	      var func = isFunction(structure)
	      if (this[0] && !func)
	        var dom   = $(structure).get(0),
	            clone = dom.parentNode || this.length > 1

	      return this.each(function(index){
	        $(this).wrapAll(
	          func ? structure.call(this, index) :
	            clone ? dom.cloneNode(true) : dom
	        )
	      })
	    },
	    wrapAll: function(structure){
	      if (this[0]) {
	        $(this[0]).before(structure = $(structure))
	        var children
	        // drill down to the inmost element
	        while ((children = structure.children()).length) structure = children.first()
	        $(structure).append(this)
	      }
	      return this
	    },
	    wrapInner: function(structure){
	      var func = isFunction(structure)
	      return this.each(function(index){
	        var self = $(this), contents = self.contents(),
	            dom  = func ? structure.call(this, index) : structure
	        contents.length ? contents.wrapAll(dom) : self.append(dom)
	      })
	    },
	    unwrap: function(){
	      this.parent().each(function(){
	        $(this).replaceWith($(this).children())
	      })
	      return this
	    },
	    clone: function(){
	      return this.map(function(){ return this.cloneNode(true) })
	    },
	    hide: function(){
	      return this.css("display", "none")
	    },
	    toggle: function(setting){
	      return this.each(function(){
	        var el = $(this)
	        ;(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
	      })
	    },
	    prev: function(selector){ return $(this.pluck('previousElementSibling')).filter(selector || '*') },
	    next: function(selector){ return $(this.pluck('nextElementSibling')).filter(selector || '*') },
	    html: function(html){
	      return 0 in arguments ?
	        this.each(function(idx){
	          var originHtml = this.innerHTML
	          $(this).empty().append( funcArg(this, html, idx, originHtml) )
	        }) :
	        (0 in this ? this[0].innerHTML : null)
	    },
	    text: function(text){
	      return 0 in arguments ?
	        this.each(function(idx){
	          var newText = funcArg(this, text, idx, this.textContent)
	          this.textContent = newText == null ? '' : ''+newText
	        }) :
	        (0 in this ? this[0].textContent : null)
	    },
	    attr: function(name, value){
	      var result
	      return (typeof name == 'string' && !(1 in arguments)) ?
	        (!this.length || this[0].nodeType !== 1 ? undefined :
	          (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
	        ) :
	        this.each(function(idx){
	          if (this.nodeType !== 1) return
	          if (isObject(name)) for (key in name) setAttribute(this, key, name[key])
	          else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
	        })
	    },
	    removeAttr: function(name){
	      return this.each(function(){ this.nodeType === 1 && name.split(' ').forEach(function(attribute){
	        setAttribute(this, attribute)
	      }, this)})
	    },
	    prop: function(name, value){
	      name = propMap[name] || name
	      return (1 in arguments) ?
	        this.each(function(idx){
	          this[name] = funcArg(this, value, idx, this[name])
	        }) :
	        (this[0] && this[0][name])
	    },
	    data: function(name, value){
	      var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase()

	      var data = (1 in arguments) ?
	        this.attr(attrName, value) :
	        this.attr(attrName)

	      return data !== null ? deserializeValue(data) : undefined
	    },
	    val: function(value){
	      return 0 in arguments ?
	        this.each(function(idx){
	          this.value = funcArg(this, value, idx, this.value)
	        }) :
	        (this[0] && (this[0].multiple ?
	           $(this[0]).find('option').filter(function(){ return this.selected }).pluck('value') :
	           this[0].value)
	        )
	    },
	    offset: function(coordinates){
	      if (coordinates) return this.each(function(index){
	        var $this = $(this),
	            coords = funcArg(this, coordinates, index, $this.offset()),
	            parentOffset = $this.offsetParent().offset(),
	            props = {
	              top:  coords.top  - parentOffset.top,
	              left: coords.left - parentOffset.left
	            }

	        if ($this.css('position') == 'static') props['position'] = 'relative'
	        $this.css(props)
	      })
	      if (!this.length) return null
	      var obj = this[0].getBoundingClientRect()
	      return {
	        left: obj.left + window.pageXOffset,
	        top: obj.top + window.pageYOffset,
	        width: Math.round(obj.width),
	        height: Math.round(obj.height)
	      }
	    },
	    css: function(property, value){
	      if (arguments.length < 2) {
	        var computedStyle, element = this[0]
	        if(!element) return
	        computedStyle = getComputedStyle(element, '')
	        if (typeof property == 'string')
	          return element.style[camelize(property)] || computedStyle.getPropertyValue(property)
	        else if (isArray(property)) {
	          var props = {}
	          $.each(property, function(_, prop){
	            props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))
	          })
	          return props
	        }
	      }

	      var css = ''
	      if (type(property) == 'string') {
	        if (!value && value !== 0)
	          this.each(function(){ this.style.removeProperty(dasherize(property)) })
	        else
	          css = dasherize(property) + ":" + maybeAddPx(property, value)
	      } else {
	        for (key in property)
	          if (!property[key] && property[key] !== 0)
	            this.each(function(){ this.style.removeProperty(dasherize(key)) })
	          else
	            css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
	      }

	      return this.each(function(){ this.style.cssText += ';' + css })
	    },
	    index: function(element){
	      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
	    },
	    hasClass: function(name){
	      if (!name) return false
	      return emptyArray.some.call(this, function(el){
	        return this.test(className(el))
	      }, classRE(name))
	    },
	    addClass: function(name){
	      if (!name) return this
	      return this.each(function(idx){
	        if (!('className' in this)) return
	        classList = []
	        var cls = className(this), newName = funcArg(this, name, idx, cls)
	        newName.split(/\s+/g).forEach(function(klass){
	          if (!$(this).hasClass(klass)) classList.push(klass)
	        }, this)
	        classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
	      })
	    },
	    removeClass: function(name){
	      return this.each(function(idx){
	        if (!('className' in this)) return
	        if (name === undefined) return className(this, '')
	        classList = className(this)
	        funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass){
	          classList = classList.replace(classRE(klass), " ")
	        })
	        className(this, classList.trim())
	      })
	    },
	    toggleClass: function(name, when){
	      if (!name) return this
	      return this.each(function(idx){
	        var $this = $(this), names = funcArg(this, name, idx, className(this))
	        names.split(/\s+/g).forEach(function(klass){
	          (when === undefined ? !$this.hasClass(klass) : when) ?
	            $this.addClass(klass) : $this.removeClass(klass)
	        })
	      })
	    },
	    scrollTop: function(value){
	      if (!this.length) return
	      var hasScrollTop = 'scrollTop' in this[0]
	      if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset
	      return this.each(hasScrollTop ?
	        function(){ this.scrollTop = value } :
	        function(){ this.scrollTo(this.scrollX, value) })
	    },
	    scrollLeft: function(value){
	      if (!this.length) return
	      var hasScrollLeft = 'scrollLeft' in this[0]
	      if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset
	      return this.each(hasScrollLeft ?
	        function(){ this.scrollLeft = value } :
	        function(){ this.scrollTo(value, this.scrollY) })
	    },
	    position: function() {
	      if (!this.length) return

	      var elem = this[0],
	        // Get *real* offsetParent
	        offsetParent = this.offsetParent(),
	        // Get correct offsets
	        offset       = this.offset(),
	        parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset()

	      // Subtract element margins
	      // note: when an element has margin: auto the offsetLeft and marginLeft
	      // are the same in Safari causing offset.left to incorrectly be 0
	      offset.top  -= parseFloat( $(elem).css('margin-top') ) || 0
	      offset.left -= parseFloat( $(elem).css('margin-left') ) || 0

	      // Add offsetParent borders
	      parentOffset.top  += parseFloat( $(offsetParent[0]).css('border-top-width') ) || 0
	      parentOffset.left += parseFloat( $(offsetParent[0]).css('border-left-width') ) || 0

	      // Subtract the two offsets
	      return {
	        top:  offset.top  - parentOffset.top,
	        left: offset.left - parentOffset.left
	      }
	    },
	    offsetParent: function() {
	      return this.map(function(){
	        var parent = this.offsetParent || document.body
	        while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
	          parent = parent.offsetParent
	        return parent
	      })
	    }
	  }

	  // for now
	  $.fn.detach = $.fn.remove

	  // Generate the `width` and `height` functions
	  ;['width', 'height'].forEach(function(dimension){
	    var dimensionProperty =
	      dimension.replace(/./, function(m){ return m[0].toUpperCase() })

	    $.fn[dimension] = function(value){
	      var offset, el = this[0]
	      if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :
	        isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
	        (offset = this.offset()) && offset[dimension]
	      else return this.each(function(idx){
	        el = $(this)
	        el.css(dimension, funcArg(this, value, idx, el[dimension]()))
	      })
	    }
	  })

	  function traverseNode(node, fun) {
	    fun(node)
	    for (var i = 0, len = node.childNodes.length; i < len; i++)
	      traverseNode(node.childNodes[i], fun)
	  }

	  // Generate the `after`, `prepend`, `before`, `append`,
	  // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
	  adjacencyOperators.forEach(function(operator, operatorIndex) {
	    var inside = operatorIndex % 2 //=> prepend, append

	    $.fn[operator] = function(){
	      // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
	      var argType, nodes = $.map(arguments, function(arg) {
	            argType = type(arg)
	            return argType == "object" || argType == "array" || arg == null ?
	              arg : zepto.fragment(arg)
	          }),
	          parent, copyByClone = this.length > 1
	      if (nodes.length < 1) return this

	      return this.each(function(_, target){
	        parent = inside ? target : target.parentNode

	        // convert all methods to a "before" operation
	        target = operatorIndex == 0 ? target.nextSibling :
	                 operatorIndex == 1 ? target.firstChild :
	                 operatorIndex == 2 ? target :
	                 null

	        var parentInDocument = $.contains(document.documentElement, parent)

	        nodes.forEach(function(node){
	          if (copyByClone) node = node.cloneNode(true)
	          else if (!parent) return $(node).remove()

	          parent.insertBefore(node, target)
	          if (parentInDocument) traverseNode(node, function(el){
	            if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
	               (!el.type || el.type === 'text/javascript') && !el.src)
	              window['eval'].call(window, el.innerHTML)
	          })
	        })
	      })
	    }

	    // after    => insertAfter
	    // prepend  => prependTo
	    // before   => insertBefore
	    // append   => appendTo
	    $.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){
	      $(html)[operator](this)
	      return this
	    }
	  })

	  zepto.Z.prototype = $.fn

	  // Export internal API functions in the `$.zepto` namespace
	  zepto.uniq = uniq
	  zepto.deserializeValue = deserializeValue
	  $.zepto = zepto

	  return $
	})()

	;(function($){
	  var _zid = 1, undefined,
	      slice = Array.prototype.slice,
	      isFunction = $.isFunction,
	      isString = function(obj){ return typeof obj == 'string' },
	      handlers = {},
	      specialEvents={},
	      focusinSupported = 'onfocusin' in window,
	      focus = { focus: 'focusin', blur: 'focusout' },
	      hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }

	  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

	  function zid(element) {
	    return element._zid || (element._zid = _zid++)
	  }
	  function findHandlers(element, event, fn, selector) {
	    event = parse(event)
	    if (event.ns) var matcher = matcherFor(event.ns)
	    return (handlers[zid(element)] || []).filter(function(handler) {
	      return handler
	        && (!event.e  || handler.e == event.e)
	        && (!event.ns || matcher.test(handler.ns))
	        && (!fn       || zid(handler.fn) === zid(fn))
	        && (!selector || handler.sel == selector)
	    })
	  }
	  function parse(event) {
	    var parts = ('' + event).split('.')
	    return {e: parts[0], ns: parts.slice(1).sort().join(' ')}
	  }
	  function matcherFor(ns) {
	    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
	  }

	  function eventCapture(handler, captureSetting) {
	    return handler.del &&
	      (!focusinSupported && (handler.e in focus)) ||
	      !!captureSetting
	  }

	  function realEvent(type) {
	    return hover[type] || (focusinSupported && focus[type]) || type
	  }

	  function add(element, events, fn, data, selector, delegator, capture){
	    var id = zid(element), set = (handlers[id] || (handlers[id] = []))
	    events.split(/\s/).forEach(function(event){
	      if (event == 'ready') return $(document).ready(fn)
	      var handler   = parse(event)
	      handler.fn    = fn
	      handler.sel   = selector
	      // emulate mouseenter, mouseleave
	      if (handler.e in hover) fn = function(e){
	        var related = e.relatedTarget
	        if (!related || (related !== this && !$.contains(this, related)))
	          return handler.fn.apply(this, arguments)
	      }
	      handler.del   = delegator
	      var callback  = delegator || fn
	      handler.proxy = function(e){
	        e = compatible(e)
	        if (e.isImmediatePropagationStopped()) return
	        e.data = data
	        var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))
	        if (result === false) e.preventDefault(), e.stopPropagation()
	        return result
	      }
	      handler.i = set.length
	      set.push(handler)
	      if ('addEventListener' in element)
	        element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
	    })
	  }
	  function remove(element, events, fn, selector, capture){
	    var id = zid(element)
	    ;(events || '').split(/\s/).forEach(function(event){
	      findHandlers(element, event, fn, selector).forEach(function(handler){
	        delete handlers[id][handler.i]
	      if ('removeEventListener' in element)
	        element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
	      })
	    })
	  }

	  $.event = { add: add, remove: remove }

	  $.proxy = function(fn, context) {
	    var args = (2 in arguments) && slice.call(arguments, 2)
	    if (isFunction(fn)) {
	      var proxyFn = function(){ return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments) }
	      proxyFn._zid = zid(fn)
	      return proxyFn
	    } else if (isString(context)) {
	      if (args) {
	        args.unshift(fn[context], fn)
	        return $.proxy.apply(null, args)
	      } else {
	        return $.proxy(fn[context], fn)
	      }
	    } else {
	      throw new TypeError("expected function")
	    }
	  }

	  $.fn.bind = function(event, data, callback){
	    return this.on(event, data, callback)
	  }
	  $.fn.unbind = function(event, callback){
	    return this.off(event, callback)
	  }
	  $.fn.one = function(event, selector, data, callback){
	    return this.on(event, selector, data, callback, 1)
	  }

	  var returnTrue = function(){return true},
	      returnFalse = function(){return false},
	      ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/,
	      eventMethods = {
	        preventDefault: 'isDefaultPrevented',
	        stopImmediatePropagation: 'isImmediatePropagationStopped',
	        stopPropagation: 'isPropagationStopped'
	      }

	  function compatible(event, source) {
	    if (source || !event.isDefaultPrevented) {
	      source || (source = event)

	      $.each(eventMethods, function(name, predicate) {
	        var sourceMethod = source[name]
	        event[name] = function(){
	          this[predicate] = returnTrue
	          return sourceMethod && sourceMethod.apply(source, arguments)
	        }
	        event[predicate] = returnFalse
	      })

	      if (source.defaultPrevented !== undefined ? source.defaultPrevented :
	          'returnValue' in source ? source.returnValue === false :
	          source.getPreventDefault && source.getPreventDefault())
	        event.isDefaultPrevented = returnTrue
	    }
	    return event
	  }

	  function createProxy(event) {
	    var key, proxy = { originalEvent: event }
	    for (key in event)
	      if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]

	    return compatible(proxy, event)
	  }

	  $.fn.delegate = function(selector, event, callback){
	    return this.on(event, selector, callback)
	  }
	  $.fn.undelegate = function(selector, event, callback){
	    return this.off(event, selector, callback)
	  }

	  $.fn.live = function(event, callback){
	    $(document.body).delegate(this.selector, event, callback)
	    return this
	  }
	  $.fn.die = function(event, callback){
	    $(document.body).undelegate(this.selector, event, callback)
	    return this
	  }

	  $.fn.on = function(event, selector, data, callback, one){
	    var autoRemove, delegator, $this = this
	    if (event && !isString(event)) {
	      $.each(event, function(type, fn){
	        $this.on(type, selector, data, fn, one)
	      })
	      return $this
	    }

	    if (!isString(selector) && !isFunction(callback) && callback !== false)
	      callback = data, data = selector, selector = undefined
	    if (isFunction(data) || data === false)
	      callback = data, data = undefined

	    if (callback === false) callback = returnFalse

	    return $this.each(function(_, element){
	      if (one) autoRemove = function(e){
	        remove(element, e.type, callback)
	        return callback.apply(this, arguments)
	      }

	      if (selector) delegator = function(e){
	        var evt, match = $(e.target).closest(selector, element).get(0)
	        if (match && match !== element) {
	          evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})
	          return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
	        }
	      }

	      add(element, event, callback, data, selector, delegator || autoRemove)
	    })
	  }
	  $.fn.off = function(event, selector, callback){
	    var $this = this
	    if (event && !isString(event)) {
	      $.each(event, function(type, fn){
	        $this.off(type, selector, fn)
	      })
	      return $this
	    }

	    if (!isString(selector) && !isFunction(callback) && callback !== false)
	      callback = selector, selector = undefined

	    if (callback === false) callback = returnFalse

	    return $this.each(function(){
	      remove(this, event, callback, selector)
	    })
	  }

	  $.fn.trigger = function(event, args){
	    event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)
	    event._args = args
	    return this.each(function(){
	      // handle focus(), blur() by calling them directly
	      if (event.type in focus && typeof this[event.type] == "function") this[event.type]()
	      // items in the collection might not be DOM elements
	      else if ('dispatchEvent' in this) this.dispatchEvent(event)
	      else $(this).triggerHandler(event, args)
	    })
	  }

	  // triggers event handlers on current element just as if an event occurred,
	  // doesn't trigger an actual event, doesn't bubble
	  $.fn.triggerHandler = function(event, args){
	    var e, result
	    this.each(function(i, element){
	      e = createProxy(isString(event) ? $.Event(event) : event)
	      e._args = args
	      e.target = element
	      $.each(findHandlers(element, event.type || event), function(i, handler){
	        result = handler.proxy(e)
	        if (e.isImmediatePropagationStopped()) return false
	      })
	    })
	    return result
	  }

	  // shortcut methods for `.bind(event, fn)` for each event type
	  ;('focusin focusout focus blur load resize scroll unload click dblclick '+
	  'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '+
	  'change select keydown keypress keyup error').split(' ').forEach(function(event) {
	    $.fn[event] = function(callback) {
	      return (0 in arguments) ?
	        this.bind(event, callback) :
	        this.trigger(event)
	    }
	  })

	  $.Event = function(type, props) {
	    if (!isString(type)) props = type, type = props.type
	    var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
	    if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
	    event.initEvent(type, bubbles, true)
	    return compatible(event)
	  }

	})(Zepto)

	;(function($){
	  var jsonpID = 0,
	      document = window.document,
	      key,
	      name,
	      rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	      scriptTypeRE = /^(?:text|application)\/javascript/i,
	      xmlTypeRE = /^(?:text|application)\/xml/i,
	      jsonType = 'application/json',
	      htmlType = 'text/html',
	      blankRE = /^\s*$/,
	      originAnchor = document.createElement('a')

	  originAnchor.href = window.location.href

	  // trigger a custom event and return false if it was cancelled
	  function triggerAndReturn(context, eventName, data) {
	    var event = $.Event(eventName)
	    $(context).trigger(event, data)
	    return !event.isDefaultPrevented()
	  }

	  // trigger an Ajax "global" event
	  function triggerGlobal(settings, context, eventName, data) {
	    if (settings.global) return triggerAndReturn(context || document, eventName, data)
	  }

	  // Number of active Ajax requests
	  $.active = 0

	  function ajaxStart(settings) {
	    if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')
	  }
	  function ajaxStop(settings) {
	    if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop')
	  }

	  // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
	  function ajaxBeforeSend(xhr, settings) {
	    var context = settings.context
	    if (settings.beforeSend.call(context, xhr, settings) === false ||
	        triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
	      return false

	    triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])
	  }
	  function ajaxSuccess(data, xhr, settings, deferred) {
	    var context = settings.context, status = 'success'
	    settings.success.call(context, data, status, xhr)
	    if (deferred) deferred.resolveWith(context, [data, status, xhr])
	    triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])
	    ajaxComplete(status, xhr, settings)
	  }
	  // type: "timeout", "error", "abort", "parsererror"
	  function ajaxError(error, type, xhr, settings, deferred) {
	    var context = settings.context
	    settings.error.call(context, xhr, type, error)
	    if (deferred) deferred.rejectWith(context, [xhr, type, error])
	    triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type])
	    ajaxComplete(type, xhr, settings)
	  }
	  // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
	  function ajaxComplete(status, xhr, settings) {
	    var context = settings.context
	    settings.complete.call(context, xhr, status)
	    triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])
	    ajaxStop(settings)
	  }

	  // Empty function, used as default callback
	  function empty() {}

	  $.ajaxJSONP = function(options, deferred){
	    if (!('type' in options)) return $.ajax(options)

	    var _callbackName = options.jsonpCallback,
	      callbackName = ($.isFunction(_callbackName) ?
	        _callbackName() : _callbackName) || ('jsonp' + (++jsonpID)),
	      script = document.createElement('script'),
	      originalCallback = window[callbackName],
	      responseData,
	      abort = function(errorType) {
	        $(script).triggerHandler('error', errorType || 'abort')
	      },
	      xhr = { abort: abort }, abortTimeout

	    if (deferred) deferred.promise(xhr)

	    $(script).on('load error', function(e, errorType){
	      clearTimeout(abortTimeout)
	      $(script).off().remove()

	      if (e.type == 'error' || !responseData) {
	        ajaxError(null, errorType || 'error', xhr, options, deferred)
	      } else {
	        ajaxSuccess(responseData[0], xhr, options, deferred)
	      }

	      window[callbackName] = originalCallback
	      if (responseData && $.isFunction(originalCallback))
	        originalCallback(responseData[0])

	      originalCallback = responseData = undefined
	    })

	    if (ajaxBeforeSend(xhr, options) === false) {
	      abort('abort')
	      return xhr
	    }

	    window[callbackName] = function(){
	      responseData = arguments
	    }

	    script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName)
	    document.head.appendChild(script)

	    if (options.timeout > 0) abortTimeout = setTimeout(function(){
	      abort('timeout')
	    }, options.timeout)

	    return xhr
	  }

	  $.ajaxSettings = {
	    // Default type of request
	    type: 'GET',
	    // Callback that is executed before request
	    beforeSend: empty,
	    // Callback that is executed if the request succeeds
	    success: empty,
	    // Callback that is executed the the server drops error
	    error: empty,
	    // Callback that is executed on request complete (both: error and success)
	    complete: empty,
	    // The context for the callbacks
	    context: null,
	    // Whether to trigger "global" Ajax events
	    global: true,
	    // Transport
	    xhr: function () {
	      return new window.XMLHttpRequest()
	    },
	    // MIME types mapping
	    // IIS returns Javascript as "application/x-javascript"
	    accepts: {
	      script: 'text/javascript, application/javascript, application/x-javascript',
	      json:   jsonType,
	      xml:    'application/xml, text/xml',
	      html:   htmlType,
	      text:   'text/plain'
	    },
	    // Whether the request is to another domain
	    crossDomain: false,
	    // Default timeout
	    timeout: 0,
	    // Whether data should be serialized to string
	    processData: true,
	    // Whether the browser should be allowed to cache GET responses
	    cache: true
	  }

	  function mimeToDataType(mime) {
	    if (mime) mime = mime.split(';', 2)[0]
	    return mime && ( mime == htmlType ? 'html' :
	      mime == jsonType ? 'json' :
	      scriptTypeRE.test(mime) ? 'script' :
	      xmlTypeRE.test(mime) && 'xml' ) || 'text'
	  }

	  function appendQuery(url, query) {
	    if (query == '') return url
	    return (url + '&' + query).replace(/[&?]{1,2}/, '?')
	  }

	  // serialize payload and append it to the URL for GET requests
	  function serializeData(options) {
	    if (options.processData && options.data && $.type(options.data) != "string")
	      options.data = $.param(options.data, options.traditional)
	    if (options.data && (!options.type || options.type.toUpperCase() == 'GET'))
	      options.url = appendQuery(options.url, options.data), options.data = undefined
	  }

	  $.ajax = function(options){
	    var settings = $.extend({}, options || {}),
	        deferred = $.Deferred && $.Deferred(),
	        urlAnchor
	    for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key]

	    ajaxStart(settings)

	    if (!settings.crossDomain) {
	      urlAnchor = document.createElement('a')
	      urlAnchor.href = settings.url
	      urlAnchor.href = urlAnchor.href
	      settings.crossDomain = (originAnchor.protocol + '//' + originAnchor.host) !== (urlAnchor.protocol + '//' + urlAnchor.host)
	    }

	    if (!settings.url) settings.url = window.location.toString()
	    serializeData(settings)

	    var dataType = settings.dataType, hasPlaceholder = /\?.+=\?/.test(settings.url)
	    if (hasPlaceholder) dataType = 'jsonp'

	    if (settings.cache === false || (
	         (!options || options.cache !== true) &&
	         ('script' == dataType || 'jsonp' == dataType)
	        ))
	      settings.url = appendQuery(settings.url, '_=' + Date.now())

	    if ('jsonp' == dataType) {
	      if (!hasPlaceholder)
	        settings.url = appendQuery(settings.url,
	          settings.jsonp ? (settings.jsonp + '=?') : settings.jsonp === false ? '' : 'callback=?')
	      return $.ajaxJSONP(settings, deferred)
	    }

	    var mime = settings.accepts[dataType],
	        headers = { },
	        setHeader = function(name, value) { headers[name.toLowerCase()] = [name, value] },
	        protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
	        xhr = settings.xhr(),
	        nativeSetHeader = xhr.setRequestHeader,
	        abortTimeout

	    if (deferred) deferred.promise(xhr)

	    if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest')
	    setHeader('Accept', mime || '*/*')
	    if (mime = settings.mimeType || mime) {
	      if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
	      xhr.overrideMimeType && xhr.overrideMimeType(mime)
	    }
	    if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))
	      setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded')

	    if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name])
	    xhr.setRequestHeader = setHeader

	    xhr.onreadystatechange = function(){
	      if (xhr.readyState == 4) {
	        xhr.onreadystatechange = empty
	        clearTimeout(abortTimeout)
	        var result, error = false
	        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
	          dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'))
	          result = xhr.responseText

	          try {
	            // http://perfectionkills.com/global-eval-what-are-the-options/
	            if (dataType == 'script')    (1,eval)(result)
	            else if (dataType == 'xml')  result = xhr.responseXML
	            else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result)
	          } catch (e) { error = e }

	          if (error) ajaxError(error, 'parsererror', xhr, settings, deferred)
	          else ajaxSuccess(result, xhr, settings, deferred)
	        } else {
	          ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred)
	        }
	      }
	    }

	    if (ajaxBeforeSend(xhr, settings) === false) {
	      xhr.abort()
	      ajaxError(null, 'abort', xhr, settings, deferred)
	      return xhr
	    }

	    if (settings.xhrFields) for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name]

	    var async = 'async' in settings ? settings.async : true
	    xhr.open(settings.type, settings.url, async, settings.username, settings.password)

	    for (name in headers) nativeSetHeader.apply(xhr, headers[name])

	    if (settings.timeout > 0) abortTimeout = setTimeout(function(){
	        xhr.onreadystatechange = empty
	        xhr.abort()
	        ajaxError(null, 'timeout', xhr, settings, deferred)
	      }, settings.timeout)

	    // avoid sending empty string (#319)
	    xhr.send(settings.data ? settings.data : null)
	    return xhr
	  }

	  // handle optional data/success arguments
	  function parseArguments(url, data, success, dataType) {
	    if ($.isFunction(data)) dataType = success, success = data, data = undefined
	    if (!$.isFunction(success)) dataType = success, success = undefined
	    return {
	      url: url
	    , data: data
	    , success: success
	    , dataType: dataType
	    }
	  }

	  $.get = function(/* url, data, success, dataType */){
	    return $.ajax(parseArguments.apply(null, arguments))
	  }

	  $.post = function(/* url, data, success, dataType */){
	    var options = parseArguments.apply(null, arguments)
	    options.type = 'POST'
	    return $.ajax(options)
	  }

	  $.getJSON = function(/* url, data, success */){
	    var options = parseArguments.apply(null, arguments)
	    options.dataType = 'json'
	    return $.ajax(options)
	  }

	  $.fn.load = function(url, data, success){
	    if (!this.length) return this
	    var self = this, parts = url.split(/\s/), selector,
	        options = parseArguments(url, data, success),
	        callback = options.success
	    if (parts.length > 1) options.url = parts[0], selector = parts[1]
	    options.success = function(response){
	      self.html(selector ?
	        $('<div>').html(response.replace(rscript, "")).find(selector)
	        : response)
	      callback && callback.apply(self, arguments)
	    }
	    $.ajax(options)
	    return this
	  }

	  var escape = encodeURIComponent

	  function serialize(params, obj, traditional, scope){
	    var type, array = $.isArray(obj), hash = $.isPlainObject(obj)
	    $.each(obj, function(key, value) {
	      type = $.type(value)
	      if (scope) key = traditional ? scope :
	        scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']'
	      // handle data in serializeArray() format
	      if (!scope && array) params.add(value.name, value.value)
	      // recurse into nested objects
	      else if (type == "array" || (!traditional && type == "object"))
	        serialize(params, value, traditional, key)
	      else params.add(key, value)
	    })
	  }

	  $.param = function(obj, traditional){
	    var params = []
	    params.add = function(key, value) {
	      if ($.isFunction(value)) value = value()
	      if (value == null) value = ""
	      this.push(escape(key) + '=' + escape(value))
	    }
	    serialize(params, obj, traditional)
	    return params.join('&').replace(/%20/g, '+')
	  }
	})(Zepto)

	;(function($){
	  $.fn.serializeArray = function() {
	    var name, type, result = [],
	      add = function(value) {
	        if (value.forEach) return value.forEach(add)
	        result.push({ name: name, value: value })
	      }
	    if (this[0]) $.each(this[0].elements, function(_, field){
	      type = field.type, name = field.name
	      if (name && field.nodeName.toLowerCase() != 'fieldset' &&
	        !field.disabled && type != 'submit' && type != 'reset' && type != 'button' && type != 'file' &&
	        ((type != 'radio' && type != 'checkbox') || field.checked))
	          add($(field).val())
	    })
	    return result
	  }

	  $.fn.serialize = function(){
	    var result = []
	    this.serializeArray().forEach(function(elm){
	      result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value))
	    })
	    return result.join('&')
	  }

	  $.fn.submit = function(callback) {
	    if (0 in arguments) this.bind('submit', callback)
	    else if (this.length) {
	      var event = $.Event('submit')
	      this.eq(0).trigger(event)
	      if (!event.isDefaultPrevented()) this.get(0).submit()
	    }
	    return this
	  }

	})(Zepto)

	;(function($){
	  // __proto__ doesn't exist on IE<11, so redefine
	  // the Z function to use object extension instead
	  if (!('__proto__' in {})) {
	    $.extend($.zepto, {
	      Z: function(dom, selector){
	        dom = dom || []
	        $.extend(dom, $.fn)
	        dom.selector = selector || ''
	        dom.__Z = true
	        return dom
	      },
	      // this is a kludge but works
	      isZ: function(object){
	        return $.type(object) === 'array' && '__Z' in object
	      }
	    })
	  }

	  // getComputedStyle shouldn't freak out when called
	  // without a valid element as argument
	  try {
	    getComputedStyle(undefined)
	  } catch(e) {
	    var nativeGetComputedStyle = getComputedStyle;
	    window.getComputedStyle = function(element){
	      try {
	        return nativeGetComputedStyle(element)
	      } catch(e) {
	        return null
	      }
	    }
	  }
	})(Zepto)

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(7);

	//共用头部
	var publics = "http://wx.cheertea.com/";
	if(window.location.host == "wx.cheertea.com") {
	    publics = "http://wx.cheertea.com/";
	} else if(window.location.host == "test.cheertea.com") {
	    publics = "http://test.cheertea.com/";
	} else {
	    publics = "http://192.168.2.21:8080/zxxt_qyy/";
	}

	console.log(publics);
	//var publics = "http://192.168.2.24:8080/zxxt_qyy/widget?";

	 // var publics = "http://wx.cheertea.com/widget?";

	var Ajax = module.exports = function(object) {
		$.ajax({
			url: publics + object.urls,
			xhrFields: {
	            withCredentials: true
	        },
	        crossDomain: true,
	        timeout: object.timeouts,
			type: object.types,
			async: object.asyncs,
			dataType: object.datatypes,
			jsonp: object.jsonps,
			data: object.datas,
			beforeSend: object.beforeSends,
	        success: object.successes,
	        error: function(data) {
	        	console.log(object.urls, object.datas);
	        	// alert("服务器错误！")
	        },
			complete: object.completes
		});
	}


/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

	var Zepto = __webpack_require__(7);

	;(function($){
	  var touch = {},
	    touchTimeout, tapTimeout, swipeTimeout, longTapTimeout,
	    longTapDelay = 750,
	    gesture

	  function swipeDirection(x1, x2, y1, y2) {
	    return Math.abs(x1 - x2) >=
	      Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
	  }

	  function longTap() {
	    longTapTimeout = null
	    if (touch.last) {
	      touch.el.trigger('longTap')
	      touch = {}
	    }
	  }

	  function cancelLongTap() {
	    if (longTapTimeout) clearTimeout(longTapTimeout)
	    longTapTimeout = null
	  }

	  function cancelAll() {
	    if (touchTimeout) clearTimeout(touchTimeout)
	    if (tapTimeout) clearTimeout(tapTimeout)
	    if (swipeTimeout) clearTimeout(swipeTimeout)
	    if (longTapTimeout) clearTimeout(longTapTimeout)
	    touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null
	    touch = {}
	  }

	  function isPrimaryTouch(event){
	    return (event.pointerType == 'touch' ||
	      event.pointerType == event.MSPOINTER_TYPE_TOUCH)
	      && event.isPrimary
	  }

	  function isPointerEventType(e, type){
	    return (e.type == 'pointer'+type ||
	      e.type.toLowerCase() == 'mspointer'+type)
	  }

	  $(document).ready(function(){
	    var now, delta, deltaX = 0, deltaY = 0, firstTouch, _isPointerType

	    if ('MSGesture' in window) {
	      gesture = new MSGesture()
	      gesture.target = document.body
	    }

	    $(document)
	      .bind('MSGestureEnd', function(e){
	        var swipeDirectionFromVelocity =
	          e.velocityX > 1 ? 'Right' : e.velocityX < -1 ? 'Left' : e.velocityY > 1 ? 'Down' : e.velocityY < -1 ? 'Up' : null;
	        if (swipeDirectionFromVelocity) {
	          touch.el.trigger('swipe')
	          touch.el.trigger('swipe'+ swipeDirectionFromVelocity)
	        }
	      })
	      .on('touchstart MSPointerDown pointerdown', function(e){
	        if((_isPointerType = isPointerEventType(e, 'down')) &&
	          !isPrimaryTouch(e)) return
	        firstTouch = _isPointerType ? e : e.touches[0]
	        if (e.touches && e.touches.length === 1 && touch.x2) {
	          // Clear out touch movement data if we have it sticking around
	          // This can occur if touchcancel doesn't fire due to preventDefault, etc.
	          touch.x2 = undefined
	          touch.y2 = undefined
	        }
	        now = Date.now()
	        delta = now - (touch.last || now)
	        touch.el = $('tagName' in firstTouch.target ?
	          firstTouch.target : firstTouch.target.parentNode)
	        touchTimeout && clearTimeout(touchTimeout)
	        touch.x1 = firstTouch.pageX
	        touch.y1 = firstTouch.pageY
	        if (delta > 0 && delta <= 250) touch.isDoubleTap = true
	        touch.last = now
	        longTapTimeout = setTimeout(longTap, longTapDelay)
	        // adds the current touch contact for IE gesture recognition
	        if (gesture && _isPointerType) gesture.addPointer(e.pointerId);
	      })
	      .on('touchmove MSPointerMove pointermove', function(e){
	        if((_isPointerType = isPointerEventType(e, 'move')) &&
	          !isPrimaryTouch(e)) return
	        firstTouch = _isPointerType ? e : e.touches[0]
	        cancelLongTap()
	        touch.x2 = firstTouch.pageX
	        touch.y2 = firstTouch.pageY

	        deltaX += Math.abs(touch.x1 - touch.x2)
	        deltaY += Math.abs(touch.y1 - touch.y2)
	      })
	      .on('touchend MSPointerUp pointerup', function(e){
	        if((_isPointerType = isPointerEventType(e, 'up')) &&
	          !isPrimaryTouch(e)) return
	        cancelLongTap()

	        // swipe
	        if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
	            (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30))

	          swipeTimeout = setTimeout(function() {
	            touch.el.trigger('swipe')
	            touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
	            touch = {}
	          }, 0)

	        // normal tap
	        else if ('last' in touch)
	          // don't fire tap when delta position changed by more than 30 pixels,
	          // for instance when moving to a point and back to origin
	          if (deltaX < 30 && deltaY < 30) {
	            // delay by one tick so we can cancel the 'tap' event if 'scroll' fires
	            // ('tap' fires before 'scroll')
	            tapTimeout = setTimeout(function() {

	              // trigger universal 'tap' with the option to cancelTouch()
	              // (cancelTouch cancels processing of single vs double taps for faster 'tap' response)
	              var event = $.Event('tap')
	              event.cancelTouch = cancelAll
	              touch.el.trigger(event)

	              // trigger double tap immediately
	              if (touch.isDoubleTap) {
	                if (touch.el) touch.el.trigger('doubleTap')
	                touch = {}
	              }

	              // trigger single tap after 250ms of inactivity
	              else {
	                touchTimeout = setTimeout(function(){
	                  touchTimeout = null
	                  if (touch.el) touch.el.trigger('singleTap')
	                  touch = {}
	                }, 250)
	              }
	            }, 0)
	          } else {
	            touch = {}
	          }
	          deltaX = deltaY = 0

	      })
	      // when the browser window loses focus,
	      // for example when a modal dialog is shown,
	      // cancel all ongoing events
	      .on('touchcancel MSPointerCancel pointercancel', cancelAll)

	    // scrolling the window indicates intention of the user
	    // to scroll, not tap or swipe, so cancel all ongoing events
	    $(window).on('scroll', cancelAll)
	  })

	  ;['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown',
	    'doubleTap', 'tap', 'singleTap', 'longTap'].forEach(function(eventName){
	    $.fn[eventName] = function(callback){ return this.on(eventName, callback) }
	  })
	})(Zepto)


/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(7);

	var pageJump = module.exports = {
	    loginJump: function(oldUrl, loginUrl) {
	        window.sessionStorage.clear();
	        window.sessionStorage.setItem("oldUrl", oldUrl);
	        if(window.sessionStorage) {
	            window.location.href = "../cn/login.html";
	        }
	    }
	}


/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(7);

	var Emoji = module.exports = {

		reg: /\ud83d\ude04|\ud83d\ude03|\ud83d\ude00|\ud83d\ude0a|\u263a\ufe0f|\ud83d\ude09|\ud83d\ude0d|\ud83d\ude18|\ud83d\ude1a|\ud83d\ude17|\ud83d\ude19|\ud83d\ude1c|\ud83d\ude1d|\ud83d\ude1b|\ud83d\ude33|\ud83d\ude01|\ud83d\ude14|\ud83d\ude0c|\ud83d\ude12|\ud83d\ude1e|\ud83d\ude23|\ud83d\ude22|\ud83d\ude02|\ud83d\ude2d|\ud83d\ude2a|\ud83d\ude25|\ud83d\ude30|\ud83d\ude05|\ud83d\ude13|\ud83d\ude29|\ud83d\ude2b|\ud83d\ude28|\ud83d\ude31|\ud83d\ude20|\ud83d\ude21|\ud83d\ude24|\ud83d\ude16|\ud83d\ude06|\ud83d\ude0b|\ud83d\ude37|\ud83d\ude0e|\ud83d\ude34|\ud83d\ude35|\ud83d\ude32|\ud83d\ude1f|\ud83d\ude26|\ud83d\ude27|\ud83d\ude08|\ud83d\udc7f|\ud83d\ude2e|\ud83d\ude2c|\ud83d\ude10|\ud83d\ude15|\ud83d\ude2f|\ud83d\ude36|\ud83d\ude07|\ud83d\ude0f|\ud83d\ude11|\ud83d\udc72|\ud83d\udc73|\ud83d\udc6e|\ud83d\udc77|\ud83d\udc82|\ud83d\udc76|\ud83d\udc66|\ud83d\udc67|\ud83d\udc68|\ud83d\udc69|\ud83d\udc74|\ud83d\udc75|\ud83d\udc71|\ud83d\udc7c|\ud83d\udc78|\ud83d\ude3a|\ud83d\ude38|\ud83d\ude3b|\ud83d\ude3d|\ud83d\ude3c|\ud83d\ude40|\ud83d\ude3f|\ud83d\ude39|\ud83d\ude3e|\ud83d\udc79|\ud83d\udc7a|\ud83d\ude48|\ud83d\ude49|\ud83d\ude4a|\ud83d\udc80|\ud83d\udc7d|\ud83d\udca9|\ud83d\udd25|\u2728|\ud83c\udf1f|\ud83d\udcab|\ud83d\udca5|\ud83d\udca2|\ud83d\udca6|\ud83d\udca7|\ud83d\udca4|\ud83d\udca8|\ud83d\udc42|\ud83d\udc40|\ud83d\udc43|\ud83d\udc45|\ud83d\udc44|\ud83d\udc4d|\ud83d\udc4e|\ud83d\udc4c|\ud83d\udc4a|\u270a|\u270c\ufe0f|\ud83d\udc4b|\u270b|\ud83d\udc50|\ud83d\udc46|\ud83d\udc47|\ud83d\udc49|\ud83d\udc48|\ud83d\ude4c|\ud83d\ude4f|\u261d\ufe0f|\ud83d\udc4f|\ud83d\udcaa|\ud83d\udeb6|\ud83c\udfc3|\ud83d\udc83|\ud83d\udc6b|\ud83d\udc6a|\ud83d\udc6c|\ud83d\udc6d|\ud83d\udc8f|\ud83d\udc91|\ud83d\udc6f|\ud83d\ude46|\ud83d\ude45|\ud83d\udc81|\ud83d\ude4b|\ud83d\udc86|\ud83d\udc87|\ud83d\udc85|\ud83d\udc70|\ud83d\ude4e|\ud83d\ude4d|\ud83d\ude47|\ud83c\udfa9|\ud83d\udc51|\ud83d\udc52|\ud83d\udc5f|\ud83d\udc5e|\ud83d\udc61|\ud83d\udc60|\ud83d\udc62|\ud83d\udc55|\ud83d\udc54|\ud83d\udc5a|\ud83d\udc57|\ud83c\udfbd|\ud83d\udc56|\ud83d\udc58|\ud83d\udc59|\ud83d\udcbc|\ud83d\udc5c|\ud83d\udc5d|\ud83d\udc5b|\ud83d\udc53|\ud83c\udf80|\ud83c\udf02|\ud83d\udc84|\ud83d\udc9b|\ud83d\udc99|\ud83d\udc9c|\ud83d\udc9a|\u2764\ufe0f|\ud83d\udc94|\ud83d\udc97|\ud83d\udc93|\ud83d\udc95|\ud83d\udc96|\ud83d\udc9e|\ud83d\udc98|\ud83d\udc8c|\ud83d\udc8b|\ud83d\udc8d|\ud83d\udc8e|\ud83d\udc64|\ud83d\udc65|\ud83d\udcac|\ud83d\udc63|\ud83d\udcad|\ud83d\udc36|\ud83d\udc3a|\ud83d\udc31|\ud83d\udc2d|\ud83d\udc39|\ud83d\udc30|\ud83d\udc38|\ud83d\udc2f|\ud83d\udc28|\ud83d\udc3b|\ud83d\udc37|\ud83d\udc3d|\ud83d\udc2e|\ud83d\udc17|\ud83d\udc35|\ud83d\udc12|\ud83d\udc34|\ud83d\udc11|\ud83d\udc18|\ud83d\udc3c|\ud83d\udc27|\ud83d\udc26|\ud83d\udc24|\ud83d\udc25|\ud83d\udc23|\ud83d\udc14|\ud83d\udc0d|\ud83d\udc22|\ud83d\udc1b|\ud83d\udc1d|\ud83d\udc1c|\ud83d\udc1e|\ud83d\udc0c|\ud83d\udc19|\ud83d\udc1a|\ud83d\udc20|\ud83d\udc1f|\ud83d\udc2c|\ud83d\udc33|\ud83d\udc0b|\ud83d\udc04|\ud83d\udc0f|\ud83d\udc00|\ud83d\udc03|\ud83d\udc05|\ud83d\udc07|\ud83d\udc09|\ud83d\udc0e|\ud83d\udc10|\ud83d\udc13|\ud83d\udc15|\ud83d\udc16|\ud83d\udc01|\ud83d\udc02|\ud83d\udc32|\ud83d\udc21|\ud83d\udc0a|\ud83d\udc2b|\ud83d\udc2a|\ud83d\udc06|\ud83d\udc08|\ud83d\udc29|\ud83d\udc3e|\ud83d\udc90|\ud83c\udf38|\ud83c\udf37|\ud83c\udf40|\ud83c\udf39|\ud83c\udf3b|\ud83c\udf3a|\ud83c\udf41|\ud83c\udf43|\ud83c\udf42|\ud83c\udf3f|\ud83c\udf3e|\ud83c\udf44|\ud83c\udf35|\ud83c\udf34|\ud83c\udf32|\ud83c\udf33|\ud83c\udf30|\ud83c\udf31|\ud83c\udf3c|\ud83c\udf10|\ud83c\udf1e|\ud83c\udf1d|\ud83c\udf1a|\ud83c\udf11|\ud83c\udf12|\ud83c\udf13|\ud83c\udf14|\ud83c\udf15|\ud83c\udf16|\ud83c\udf17|\ud83c\udf18|\ud83c\udf1c|\ud83c\udf1b|\ud83c\udf19|\ud83c\udf0d|\ud83c\udf0e|\ud83c\udf0f|\ud83c\udf0b|\ud83c\udf0c|\ud83c\udf20|\u2b50\ufe0f|\u2600\ufe0f|\u26c5\ufe0f|\u2601\ufe0f|\u26a1\ufe0f|\u2614\ufe0f|\u2744\ufe0f|\u26c4\ufe0f|\ud83c\udf00|\ud83c\udf01|\ud83c\udf08|\ud83c\udf0a|\ud83c\udf8d|\ud83d\udc9d|\ud83c\udf8e|\ud83c\udf92|\ud83c\udf93|\ud83c\udf8f|\ud83c\udf86|\ud83c\udf87|\ud83c\udf90|\ud83c\udf91|\ud83c\udf83|\ud83d\udc7b|\ud83c\udf85|\ud83c\udf84|\ud83c\udf81|\ud83c\udf8b|\ud83c\udf89|\ud83c\udf8a|\ud83c\udf88|\ud83c\udf8c|\ud83d\udd2e|\ud83c\udfa5|\ud83d\udcf7|\ud83d\udcf9|\ud83d\udcfc|\ud83d\udcbf|\ud83d\udcc0|\ud83d\udcbd|\ud83d\udcbe|\ud83d\udcbb|\ud83d\udcf1|\u260e\ufe0f|\ud83d\udcde|\ud83d\udcdf|\ud83d\udce0|\ud83d\udce1|\ud83d\udcfa|\ud83d\udcfb|\ud83d\udd0a|\ud83d\udd09|\ud83d\udd08|\ud83d\udd07|\ud83d\udd14|\ud83d\udd15|\ud83d\udce2|\ud83d\udce3|\u23f3|\u231b\ufe0f|\u23f0|\u231a\ufe0f|\ud83d\udd13|\ud83d\udd12|\ud83d\udd0f|\ud83d\udd10|\ud83d\udd11|\ud83d\udd0e|\ud83d\udca1|\ud83d\udd26|\ud83d\udd06|\ud83d\udd05|\ud83d\udd0c|\ud83d\udd0b|\ud83d\udd0d|\ud83d\udec1|\ud83d\udec0|\ud83d\udebf|\ud83d\udebd|\ud83d\udd27|\ud83d\udd29|\ud83d\udd28|\ud83d\udeaa|\ud83d\udeac|\ud83d\udca3|\ud83d\udd2b|\ud83d\udd2a|\ud83d\udc8a|\ud83d\udc89|\ud83d\udcb0|\ud83d\udcb4|\ud83d\udcb5|\ud83d\udcb7|\ud83d\udcb6|\ud83d\udcb3|\ud83d\udcb8|\ud83d\udcf2|\ud83d\udce7|\ud83d\udce5|\ud83d\udce4|\u2709\ufe0f|\ud83d\udce9|\ud83d\udce8|\ud83d\udcef|\ud83d\udceb|\ud83d\udcea|\ud83d\udcec|\ud83d\udced|\ud83d\udcee|\ud83d\udce6|\ud83d\udcdd|\ud83d\udcc4|\ud83d\udcc3|\ud83d\udcd1|\ud83d\udcca|\ud83d\udcc8|\ud83d\udcc9|\ud83d\udcdc|\ud83d\udccb|\ud83d\udcc5|\ud83d\udcc6|\ud83d\udcc7|\ud83d\udcc1|\ud83d\udcc2|\u2702\ufe0f|\ud83d\udccc|\ud83d\udcce|\u2712\ufe0f|\u270f\ufe0f|\ud83d\udccf|\ud83d\udcd0|\ud83d\udcd5|\ud83d\udcd7|\ud83d\udcd8|\ud83d\udcd9|\ud83d\udcd3|\ud83d\udcd4|\ud83d\udcd2|\ud83d\udcda|\ud83d\udcd6|\ud83d\udd16|\ud83d\udcdb|\ud83d\udd2c|\ud83d\udd2d|\ud83d\udcf0|\ud83c\udfa8|\ud83c\udfac|\ud83c\udfa4|\ud83c\udfa7|\ud83c\udfbc|\ud83c\udfb5|\ud83c\udfb6|\ud83c\udfb9|\ud83c\udfbb|\ud83c\udfba|\ud83c\udfb7|\ud83c\udfb8|\ud83d\udc7e|\ud83c\udfae|\ud83c\udccf|\ud83c\udfb4|\ud83c\udc04\ufe0f|\ud83c\udfb2|\ud83c\udfaf|\ud83c\udfc8|\ud83c\udfc0|\u26bd\ufe0f|\u26be\ufe0f|\ud83c\udfbe|\ud83c\udfb1|\ud83c\udfc9|\ud83c\udfb3|\u26f3\ufe0f|\ud83d\udeb5|\ud83d\udeb4|\ud83c\udfc1|\ud83c\udfc7|\ud83c\udfc6|\ud83c\udfbf|\ud83c\udfc2|\ud83c\udfca|\ud83c\udfc4|\ud83c\udfa3|\u2615\ufe0f|\ud83c\udf75|\ud83c\udf76|\ud83c\udf7c|\ud83c\udf7a|\ud83c\udf7b|\ud83c\udf78|\ud83c\udf79|\ud83c\udf77|\ud83c\udf74|\ud83c\udf55|\ud83c\udf54|\ud83c\udf5f|\ud83c\udf57|\ud83c\udf56|\ud83c\udf5d|\ud83c\udf5b|\ud83c\udf64|\ud83c\udf71|\ud83c\udf63|\ud83c\udf65|\ud83c\udf59|\ud83c\udf58|\ud83c\udf5a|\ud83c\udf5c|\ud83c\udf72|\ud83c\udf62|\ud83c\udf61|\ud83c\udf73|\ud83c\udf5e|\ud83c\udf69|\ud83c\udf6e|\ud83c\udf66|\ud83c\udf68|\ud83c\udf67|\ud83c\udf82|\ud83c\udf70|\ud83c\udf6a|\ud83c\udf6b|\ud83c\udf6c|\ud83c\udf6d|\ud83c\udf6f|\ud83c\udf4e|\ud83c\udf4f|\ud83c\udf4a|\ud83c\udf4b|\ud83c\udf52|\ud83c\udf47|\ud83c\udf49|\ud83c\udf53|\ud83c\udf51|\ud83c\udf48|\ud83c\udf4c|\ud83c\udf50|\ud83c\udf4d|\ud83c\udf60|\ud83c\udf46|\ud83c\udf45|\ud83c\udf3d|\ud83c\udfe0|\ud83c\udfe1|\ud83c\udfeb|\ud83c\udfe2|\ud83c\udfe3|\ud83c\udfe5|\ud83c\udfe6|\ud83c\udfea|\ud83c\udfe9|\ud83c\udfe8|\ud83d\udc92|\u26ea\ufe0f|\ud83c\udfec|\ud83c\udfe4|\ud83c\udf07|\ud83c\udf06|\ud83c\udfef|\ud83c\udff0|\u26fa\ufe0f|\ud83c\udfed|\ud83d\uddfc|\ud83d\uddfe|\ud83d\uddfb|\ud83c\udf04|\ud83c\udf05|\ud83c\udf03|\ud83d\uddfd|\ud83c\udf09|\ud83c\udfa0|\ud83c\udfa1|\u26f2\ufe0f|\ud83c\udfa2|\ud83d\udea2|\u26f5\ufe0f|\ud83d\udea4|\ud83d\udea3|\u2693\ufe0f|\ud83d\ude80|\u2708\ufe0f|\ud83d\udcba|\ud83d\ude81|\ud83d\ude82|\ud83d\ude8a|\ud83d\ude89|\ud83d\ude9e|\ud83d\ude86|\ud83d\ude84|\ud83d\ude85|\ud83d\ude88|\ud83d\ude87|\ud83d\ude9d|\ud83d\ude8b|\ud83d\ude83|\ud83d\ude8e|\ud83d\ude8c|\ud83d\ude8d|\ud83d\ude99|\ud83d\ude98|\ud83d\ude97|\ud83d\ude95|\ud83d\ude96|\ud83d\ude9b|\ud83d\ude9a|\ud83d\udea8|\ud83d\ude93|\ud83d\ude94|\ud83d\ude92|\ud83d\ude91|\ud83d\ude90|\ud83d\udeb2|\ud83d\udea1|\ud83d\ude9f|\ud83d\udea0|\ud83d\ude9c|\ud83d\udc88|\ud83d\ude8f|\ud83c\udfab|\ud83d\udea6|\ud83d\udea5|\u26a0\ufe0f|\ud83d\udea7|\ud83d\udd30|\u26fd\ufe0f|\ud83c\udfee|\ud83c\udfb0|\u2668\ufe0f|\ud83d\uddff|\ud83c\udfaa|\ud83c\udfad|\ud83d\udccd|\ud83d\udea9|\ud83c\uddef\ud83c\uddf5|\ud83c\uddf0\ud83c\uddf7|\ud83c\udde9\ud83c\uddea|\ud83c\udde8\ud83c\uddf3|\ud83c\uddfa\ud83c\uddf8|\ud83c\uddeb\ud83c\uddf7|\ud83c\uddea\ud83c\uddf8|\ud83c\uddee\ud83c\uddf9|\ud83c\uddf7\ud83c\uddfa|\ud83c\uddec\ud83c\udde7|\u0031\ufe0f\u20e3|\u0032\ufe0f\u20e3|\u0033\ufe0f\u20e3|\u0034\ufe0f\u20e3|\u0035\ufe0f\u20e3|\u0036\ufe0f\u20e3|\u0037\ufe0f\u20e3|\u0038\ufe0f\u20e3|\u0039\ufe0f\u20e3|\u0030\ufe0f\u20e3|\ud83d\udd1f|\ud83d\udd22|\u0023\ufe0f\u20e3|\ud83d\udd23|\u2b06\ufe0f|\u2b07\ufe0f|\u2b05\ufe0f|\u27a1\ufe0f|\ud83d\udd20|\ud83d\udd21|\ud83d\udd24|\u2197\ufe0f|\u2196\ufe0f|\u2198\ufe0f|\u2199\ufe0f|\u2194\ufe0f|\u2195\ufe0f|\ud83d\udd04|\u25c0\ufe0f|\u25b6\ufe0f|\ud83d\udd3c|\ud83d\udd3d|\u21a9\ufe0f|\u21aa\ufe0f|\u2139\ufe0f|\u23ea|\u23e9|\u23eb|\u23ec|\u2935\ufe0f|\u2934\ufe0f|\ud83c\udd97|\ud83d\udd00|\ud83d\udd01|\ud83d\udd02|\ud83c\udd95|\ud83c\udd99|\ud83c\udd92|\ud83c\udd93|\ud83c\udd96|\ud83d\udcf6|\ud83c\udfa6|\ud83c\ude01|\ud83c\ude2f\ufe0f|\ud83c\ude33|\ud83c\ude35|\ud83c\ude34|\ud83c\ude32|\ud83c\ude50|\ud83c\ude39|\ud83c\ude3a|\ud83c\ude36|\ud83c\ude1a\ufe0f|\ud83d\udebb|\ud83d\udeb9|\ud83d\udeba|\ud83d\udebc|\ud83d\udebe|\ud83d\udeb0|\ud83d\udeae|\ud83c\udd7f\ufe0f|\u267f\ufe0f|\ud83d\udead|\ud83c\ude37|\ud83c\ude38|\ud83c\ude02|\u24c2\ufe0f|\ud83d\udec2|\ud83d\udec4|\ud83d\udec5|\ud83d\udec3|\ud83c\ude51|\u3299\ufe0f|\u3297\ufe0f|\ud83c\udd91|\ud83c\udd98|\ud83c\udd94|\ud83d\udeab|\ud83d\udd1e|\ud83d\udcf5|\ud83d\udeaf|\ud83d\udeb1|\ud83d\udeb3|\ud83d\udeb7|\ud83d\udeb8|\u26d4\ufe0f|\u2733\ufe0f|\u2747\ufe0f|\u274e|\u2705|\u2734\ufe0f|\ud83d\udc9f|\ud83c\udd9a|\ud83d\udcf3|\ud83d\udcf4|\ud83c\udd70|\ud83c\udd71|\ud83c\udd8e|\ud83c\udd7e|\ud83d\udca0|\u27bf|\u267b\ufe0f|\u2648\ufe0f|\u2649\ufe0f|\u264a\ufe0f|\u264b\ufe0f|\u264c\ufe0f|\u264d\ufe0f|\u264e\ufe0f|\u264f\ufe0f|\u2650\ufe0f|\u2651\ufe0f|\u2652\ufe0f|\u2653\ufe0f|\u26ce|\ud83d\udd2f|\ud83c\udfe7|\ud83d\udcb9|\ud83d\udcb2|\ud83d\udcb1|\u00a9|\u00ae|\u2122|\u274c|\u203c\ufe0f|\u2049\ufe0f|\u2757\ufe0f|\u2753|\u2755|\u2754|\u2b55\ufe0f|\ud83d\udd1d|\ud83d\udd1a|\ud83d\udd19|\ud83d\udd1b|\ud83d\udd1c|\ud83d\udd03|\ud83d\udd5b|\ud83d\udd67|\ud83d\udd50|\ud83d\udd5c|\ud83d\udd51|\ud83d\udd5d|\ud83d\udd52|\ud83d\udd5e|\ud83d\udd53|\ud83d\udd5f|\ud83d\udd54|\ud83d\udd60|\ud83d\udd55|\ud83d\udd56|\ud83d\udd57|\ud83d\udd58|\ud83d\udd59|\ud83d\udd5a|\ud83d\udd61|\ud83d\udd62|\ud83d\udd63|\ud83d\udd64|\ud83d\udd65|\ud83d\udd66|\u2716\ufe0f|\u2795|\u2796|\u2797|\u2660\ufe0f|\u2665\ufe0f|\u2663\ufe0f|\u2666\ufe0f|\ud83d\udcae|\ud83d\udcaf|\u2714\ufe0f|\u2611\ufe0f|\ud83d\udd18|\ud83d\udd17|\u27b0|\u3030|\u303d\ufe0f|\ud83d\udd31|\u25fc\ufe0f|\u25fb\ufe0f|\u25fe\ufe0f|\u25fd\ufe0f|\u25aa\ufe0f|\u25ab\ufe0f|\ud83d\udd3a|\ud83d\udd32|\ud83d\udd33|\u26ab\ufe0f|\u26aa\ufe0f|\ud83d\udd34|\ud83d\udd35|\ud83d\udd3b|\u2b1c\ufe0f|\u2b1b\ufe0f|\ud83d\udd36|\ud83d\udd37|\ud83d\udd38|\ud83d\udd39/g,

		emojiPath: 'images/',

		//表情图片的最大尺寸
		maxSize: 20,

		emoji: function(text) {

			//在第一次调用的时候检查浏览器是否支持emoji符号
			var supportEmoji = false,
				UA = navigator.userAgent;

			if (UA.match(/Mac\s+OS/i) && !UA.match(/(Chrome|Firefox)/i)) {
				supportEmoji = true;
			}

			//如果浏览器支持原生的emoji，无需转换，把转换方法置空
			if (supportEmoji) {
				Emoji.emoji = function() {};

				//置空$().emoji()方法
				if (typeof $ !== 'undefined') {
					$.fn.emoji = function() {};
					return false; //return false是为了终止$().each()循环
				}
			} else {

				//判断屏幕分辨率，如果是高清屏的话使用稍大尺寸的表情图片
				var pixelRatio = parseFloat(window.devicePixelRatio) || 1;
				if (pixelRatio > 1.2) {
					Emoji.emojiPath += '2x/';
				}

				Emoji.emoji = function(text) {
					setTimeout(function() {
						Emoji.trans(text);
					}, 0);
				}

				Emoji.emoji(text);
			}
		},

		trans:  function(text) {
			var isElement, el, fontSize;
			if (text.nodeType) {
				el = text;
				fontSize = (el.currentStyle || window.getComputedStyle(el, ''))['fontSize'];

				//IE浏览器下如果css中的font-size单位不是象素的话，需要转换一下
				if (!/px$/i.test(fontSize)) {
					var left = el.style.left;
						el.style.left = '1em';

					fontSize = el.style.pixelLeft;
					el.style.left = left;
				}

				fontSize = parseFloat(fontSize);
				text = el.innerHTML;
				isElement = true;
			} else {
				fontSize = fontSize || 14;
			}

			fontSize += 4;
			fontSize = Math.min(fontSize, Emoji.maxSize);
			var hexToDec = function(str) {
				str=str.replace(/\\/g,"%");
				return unescape(str);
			}
			//unicode字符串转换，否则会当作普通字符处理
			var text = hexToDec(text);
			text = text.replace(Emoji.reg, function(code) {
				return '<img width=' + fontSize + ' class="emoji" style="vertical-align:middle" src="' + Emoji.emojiPath + Emoji._escapeToUtf32(code) + '.png">';
			});

			if (isElement) {
				el.innerHTML = text;
			}
			return text;
		},

		//编码转换
		_escapeToUtf32: function(str) {
			var escaped = [],
				unicodeCodes = Emoji._convertStringToUnicodeCodePoints(str),
				i = 0,
				l = unicodeCodes.length,
				hex;

			for (; i < l; i++) {
				hex = unicodeCodes[i].toString(16);
				escaped.push('0000'.substr(hex.length) + hex);
			}
			return escaped.join('-');
		},

		_convertStringToUnicodeCodePoints: function(str) {
			var surrogate1st = 0,
				unicodeCodes = [],
				i = 0,
				l = str.length;

			for (; i < l; i++) {
				var utf16Code = str.charCodeAt(i);
				if (surrogate1st != 0) {
					if (utf16Code >= 0xDC00 && utf16Code <= 0xDFFF) {
						var surrogate2nd = utf16Code,
							unicodeCode = (surrogate1st - 0xD800) * (1 << 10) + (1 << 16) + (surrogate2nd - 0xDC00);
						unicodeCodes.push(unicodeCode);
					}
					surrogate1st = 0;
				} else if (utf16Code >= 0xD800 && utf16Code <= 0xDBFF) {
					surrogate1st = utf16Code;
				} else {
					unicodeCodes.push(utf16Code);
				}
			}
			return unicodeCodes;
		}
	};

	if (typeof $ !== 'undefined') {
		$.fn.emoji = function() {
			this.each(function(index, element) {
				Emoji.emoji(element);
			});
		};
	}


/***/ })

/******/ });