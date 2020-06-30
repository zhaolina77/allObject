(function(global, factory) {
	if(typeof define === "function" && define.amd) define(function() {
		return factory(global)
	});
	else factory(global)
})(this, function(window) {
	var Zepto = function() {
		var undefined, key, $, classList, emptyArray = [],
			concat = emptyArray.concat,
			filter = emptyArray.filter,
			slice = emptyArray.slice,
			document = window.document,
			elementDisplay = {},
			classCache = {},
			cssNumber = {
				"column-count": 1,
				columns: 1,
				"font-weight": 1,
				"line-height": 1,
				opacity: 1,
				"z-index": 1,
				zoom: 1
			},
			fragmentRE = /^\s*<(\w+|!)[^>]*>/,
			singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
			tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
			rootNodeRE = /^(?:body|html)$/i,
			capitalRE = /([A-Z])/g,
			methodAttributes = ["val", "css", "html", "text", "data", "width", "height", "offset"],
			adjacencyOperators = ["after", "prepend", "before", "append"],
			table = document.createElement("table"),
			tableRow = document.createElement("tr"),
			containers = {
				tr: document.createElement("tbody"),
				tbody: table,
				thead: table,
				tfoot: table,
				td: tableRow,
				th: tableRow,
				"*": document.createElement("div")
			},
			readyRE = /complete|loaded|interactive/,
			simpleSelectorRE = /^[\w-]*$/,
			class2type = {},
			toString = class2type.toString,
			zepto = {},
			camelize, uniq, tempParent = document.createElement("div"),
			propMap = {
				tabindex: "tabIndex",
				readonly: "readOnly",
				for: "htmlFor",
				class: "className",
				maxlength: "maxLength",
				cellspacing: "cellSpacing",
				cellpadding: "cellPadding",
				rowspan: "rowSpan",
				colspan: "colSpan",
				usemap: "useMap",
				frameborder: "frameBorder",
				contenteditable: "contentEditable"
			},
			isArray = Array.isArray || function(object) {
				return object instanceof Array
			};
		zepto.matches = function(element, selector) {
			if(!selector || !element || element.nodeType !== 1) return false;
			var matchesSelector = element.matches || element.webkitMatchesSelector || element.mozMatchesSelector || element.oMatchesSelector || element.matchesSelector;
			if(matchesSelector) return matchesSelector.call(element, selector);
			var match, parent = element.parentNode,
				temp = !parent;
			if(temp)(parent = tempParent).appendChild(element);
			match = ~zepto.qsa(parent, selector).indexOf(element);
			temp && tempParent.removeChild(element);
			return match
		};

		function type(obj) {
			return obj == null ? String(obj) : class2type[toString.call(obj)] || "object"
		}

		function isFunction(value) {
			return type(value) == "function"
		}

		function isWindow(obj) {
			return obj != null && obj == obj.window
		}

		function isDocument(obj) {
			return obj != null && obj.nodeType == obj.DOCUMENT_NODE
		}

		function isObject(obj) {
			return type(obj) == "object"
		}

		function isPlainObject(obj) {
			return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
		}

		function likeArray(obj) {
			var length = !!obj && "length" in obj && obj.length,
				type = $.type(obj);
			return "function" != type && !isWindow(obj) && ("array" == type || length === 0 || typeof length == "number" && length > 0 && length - 1 in obj)
		}

		function compact(array) {
			return filter.call(array, function(item) {
				return item != null
			})
		}

		function flatten(array) {
			return array.length > 0 ? $.fn.concat.apply([], array) : array
		}
		camelize = function(str) {
			return str.replace(/-+(.)?/g, function(match, chr) {
				return chr ? chr.toUpperCase() : ""
			})
		};

		function dasherize(str) {
			return str.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
		}
		uniq = function(array) {
			return filter.call(array, function(item, idx) {
				return array.indexOf(item) == idx
			})
		};

		function classRE(name) {
			return name in classCache ? classCache[name] : classCache[name] = new RegExp("(^|\\s)" + name + "(\\s|$)")
		}

		function maybeAddPx(name, value) {
			return typeof value == "number" && !cssNumber[dasherize(name)] ? value + "px" : value
		}

		function defaultDisplay(nodeName) {
			var element, display;
			if(!elementDisplay[nodeName]) {
				element = document.createElement(nodeName);
				document.body.appendChild(element);
				display = getComputedStyle(element, "").getPropertyValue("display");
				element.parentNode.removeChild(element);
				display == "none" && (display = "block");
				elementDisplay[nodeName] = display
			}
			return elementDisplay[nodeName]
		}

		function children(element) {
			return "children" in element ? slice.call(element.children) : $.map(element.childNodes, function(node) {
				if(node.nodeType == 1) return node
			})
		}

		function Z(dom, selector) {
			var i, len = dom ? dom.length : 0;
			for(i = 0; i < len; i++) this[i] = dom[i];
			this.length = len;
			this.selector = selector || ""
		}
		zepto.fragment = function(html, name, properties) {
			var dom, nodes, container;
			if(singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1));
			if(!dom) {
				if(html.replace) html = html.replace(tagExpanderRE, "<$1></$2>");
				if(name === undefined) name = fragmentRE.test(html) && RegExp.$1;
				if(!(name in containers)) name = "*";
				container = containers[name];
				container.innerHTML = "" + html;
				dom = $.each(slice.call(container.childNodes), function() {
					container.removeChild(this)
				})
			}
			if(isPlainObject(properties)) {
				nodes = $(dom);
				$.each(properties, function(key, value) {
					if(methodAttributes.indexOf(key) > -1) nodes[key](value);
					else nodes.attr(key, value)
				})
			}
			return dom
		};
		zepto.Z = function(dom, selector) {
			return new Z(dom, selector)
		};
		zepto.isZ = function(object) {
			return object instanceof zepto.Z
		};
		zepto.init = function(selector, context) {
			var dom;
			if(!selector) return zepto.Z();
			else if(typeof selector == "string") {
				selector = selector.trim();
				if(selector[0] == "<" && fragmentRE.test(selector)) dom = zepto.fragment(selector, RegExp.$1, context), selector = null;
				else if(context !== undefined) return $(context).find(selector);
				else dom = zepto.qsa(document, selector)
			} else if(isFunction(selector)) return $(document).ready(selector);
			else if(zepto.isZ(selector)) return selector;
			else {
				if(isArray(selector)) dom = compact(selector);
				else if(isObject(selector)) dom = [selector], selector = null;
				else if(fragmentRE.test(selector)) dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null;
				else if(context !== undefined) return $(context).find(selector);
				else dom = zepto.qsa(document, selector)
			}
			return zepto.Z(dom, selector)
		};
		$ = function(selector, context) {
			return zepto.init(selector, context)
		};

		function extend(target, source, deep) {
			for(key in source)
				if(deep && (isPlainObject(source[key]) || isArray(source[key]))) {
					if(isPlainObject(source[key]) && !isPlainObject(target[key])) target[key] = {};
					if(isArray(source[key]) && !isArray(target[key])) target[key] = [];
					extend(target[key], source[key], deep)
				} else if(source[key] !== undefined) target[key] = source[key]
		}
		$.extend = function(target) {
			var deep, args = slice.call(arguments, 1);
			if(typeof target == "boolean") {
				deep = target;
				target = args.shift()
			}
			args.forEach(function(arg) {
				extend(target, arg, deep)
			});
			return target
		};
		zepto.qsa = function(element, selector) {
			var found, maybeID = selector[0] == "#",
				maybeClass = !maybeID && selector[0] == ".",
				nameOnly = maybeID || maybeClass ? selector.slice(1) : selector,
				isSimple = simpleSelectorRE.test(nameOnly);
			return element.getElementById && isSimple && maybeID ? (found = element.getElementById(nameOnly)) ? [found] : [] : element.nodeType !== 1 && element.nodeType !== 9 && element.nodeType !== 11 ? [] : slice.call(isSimple && !maybeID && element.getElementsByClassName ? maybeClass ? element.getElementsByClassName(nameOnly) : element.getElementsByTagName(selector) : element.querySelectorAll(selector))
		};

		function filtered(nodes, selector) {
			return selector == null ? $(nodes) : $(nodes).filter(selector)
		}
		$.contains = document.documentElement.contains ? function(parent, node) {
			return parent !== node && parent.contains(node)
		} : function(parent, node) {
			while(node && (node = node.parentNode))
				if(node === parent) return true;
			return false
		};

		function funcArg(context, arg, idx, payload) {
			return isFunction(arg) ? arg.call(context, idx, payload) : arg
		}

		function setAttribute(node, name, value) {
			value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
		}

		function className(node, value) {
			var klass = node.className || "",
				svg = klass && klass.baseVal !== undefined;
			if(value === undefined) return svg ? klass.baseVal : klass;
			svg ? klass.baseVal = value : node.className = value
		}

		function deserializeValue(value) {
			try {
				return value ? value == "true" || (value == "false" ? false : value == "null" ? null : +value + "" == value ? +value : /^[\[\{]/.test(value) ? $.parseJSON(value) : value) : value
			} catch(e) {
				return value
			}
		}
		$.type = type;
		$.isFunction = isFunction;
		$.isWindow = isWindow;
		$.isArray = isArray;
		$.isPlainObject = isPlainObject;
		$.isEmptyObject = function(obj) {
			var name;
			for(name in obj) return false;
			return true
		};
		$.isNumeric = function(val) {
			var num = Number(val),
				type = typeof val;
			return val != null && type != "boolean" && (type != "string" || val.length) && !isNaN(num) && isFinite(num) || false
		};
		$.inArray = function(elem, array, i) {
			return emptyArray.indexOf.call(array, elem, i)
		};
		$.camelCase = camelize;
		$.trim = function(str) {
			return str == null ? "" : String.prototype.trim.call(str)
		};
		$.uuid = 0;
		$.support = {};
		$.expr = {};
		$.noop = function() {};
		$.map = function(elements, callback) {
			var value, values = [],
				i, key;
			if(likeArray(elements))
				for(i = 0; i < elements.length; i++) {
					value = callback(elements[i], i);
					if(value != null) values.push(value)
				} else
					for(key in elements) {
						value = callback(elements[key], key);
						if(value != null) values.push(value)
					}
			return flatten(values)
		};
		$.each = function(elements, callback) {
			var i, key;
			if(likeArray(elements)) {
				for(i = 0; i < elements.length; i++)
					if(callback.call(elements[i], i, elements[i]) === false) return elements
			} else {
				for(key in elements)
					if(callback.call(elements[key], key, elements[key]) === false) return elements
			}
			return elements
		};
		$.grep = function(elements, callback) {
			return filter.call(elements, callback)
		};
		if(window.JSON) $.parseJSON = JSON.parse;
		$.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
			class2type["[object " + name + "]"] = name.toLowerCase()
		});
		$.fn = {
			constructor: zepto.Z,
			length: 0,
			forEach: emptyArray.forEach,
			reduce: emptyArray.reduce,
			push: emptyArray.push,
			sort: emptyArray.sort,
			splice: emptyArray.splice,
			indexOf: emptyArray.indexOf,
			concat: function() {
				var i, value, args = [];
				for(i = 0; i < arguments.length; i++) {
					value = arguments[i];
					args[i] = zepto.isZ(value) ? value.toArray() : value
				}
				return concat.apply(zepto.isZ(this) ? this.toArray() : this, args)
			},
			map: function(fn) {
				return $($.map(this, function(el, i) {
					return fn.call(el, i, el)
				}))
			},
			slice: function() {
				return $(slice.apply(this, arguments))
			},
			ready: function(callback) {
				if(readyRE.test(document.readyState) && document.body) callback($);
				else document.addEventListener("DOMContentLoaded", function() {
					callback($)
				}, false);
				return this
			},
			get: function(idx) {
				return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
			},
			toArray: function() {
				return this.get()
			},
			size: function() {
				return this.length
			},
			remove: function() {
				return this.each(function() {
					if(this.parentNode != null) this.parentNode.removeChild(this)
				})
			},
			each: function(callback) {
				emptyArray.every.call(this, function(el, idx) {
					return callback.call(el, idx, el) !== false
				});
				return this
			},
			filter: function(selector) {
				if(isFunction(selector)) return this.not(this.not(selector));
				return $(filter.call(this, function(element) {
					return zepto.matches(element, selector)
				}))
			},
			add: function(selector, context) {
				return $(uniq(this.concat($(selector, context))))
			},
			is: function(selector) {
				return this.length > 0 && zepto.matches(this[0], selector)
			},
			not: function(selector) {
				var nodes = [];
				if(isFunction(selector) && selector.call !== undefined) this.each(function(idx) {
					if(!selector.call(this, idx)) nodes.push(this)
				});
				else {
					var excludes = typeof selector == "string" ? this.filter(selector) : likeArray(selector) && isFunction(selector.item) ? slice.call(selector) : $(selector);
					this.forEach(function(el) {
						if(excludes.indexOf(el) < 0) nodes.push(el)
					})
				}
				return $(nodes)
			},
			has: function(selector) {
				return this.filter(function() {
					return isObject(selector) ? $.contains(this, selector) : $(this).find(selector).size()
				})
			},
			eq: function(idx) {
				return idx === -1 ? this.slice(idx) : this.slice(idx, +idx + 1)
			},
			first: function() {
				var el = this[0];
				return el && !isObject(el) ? el : $(el)
			},
			last: function() {
				var el = this[this.length - 1];
				return el && !isObject(el) ? el : $(el)
			},
			find: function(selector) {
				var result, $this = this;
				if(!selector) result = $();
				else if(typeof selector == "object") result = $(selector).filter(function() {
					var node = this;
					return emptyArray.some.call($this, function(parent) {
						return $.contains(parent, node)
					})
				});
				else if(this.length == 1) result = $(zepto.qsa(this[0], selector));
				else result = this.map(function() {
					return zepto.qsa(this, selector)
				});
				return result
			},
			closest: function(selector, context) {
				var nodes = [],
					collection = typeof selector == "object" && $(selector);
				this.each(function(_, node) {
					while(node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector))) node = node !== context && !isDocument(node) && node.parentNode;
					if(node && nodes.indexOf(node) < 0) nodes.push(node)
				});
				return $(nodes)
			},
			parents: function(selector) {
				var ancestors = [],
					nodes = this;
				while(nodes.length > 0) nodes = $.map(nodes, function(node) {
					if((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
						ancestors.push(node);
						return node
					}
				});
				return filtered(ancestors, selector)
			},
			parent: function(selector) {
				return filtered(uniq(this.pluck("parentNode")), selector)
			},
			children: function(selector) {
				return filtered(this.map(function() {
					return children(this)
				}), selector)
			},
			contents: function() {
				return this.map(function() {
					return this.contentDocument || slice.call(this.childNodes)
				})
			},
			siblings: function(selector) {
				return filtered(this.map(function(i, el) {
					return filter.call(children(el.parentNode), function(child) {
						return child !== el
					})
				}), selector)
			},
			empty: function() {
				return this.each(function() {
					this.innerHTML = ""
				})
			},
			pluck: function(property) {
				return $.map(this, function(el) {
					return el[property]
				})
			},
			show: function() {
				return this.each(function() {
					this.style.display == "none" && (this.style.display = "");
					if(getComputedStyle(this, "").getPropertyValue("display") == "none") this.style.display = defaultDisplay(this.nodeName)
				})
			},
			replaceWith: function(newContent) {
				return this.before(newContent).remove()
			},
			wrap: function(structure) {
				var func = isFunction(structure);
				if(this[0] && !func) var dom = $(structure).get(0),
					clone = dom.parentNode || this.length > 1;
				return this.each(function(index) {
					$(this).wrapAll(func ? structure.call(this, index) : clone ? dom.cloneNode(true) : dom)
				})
			},
			wrapAll: function(structure) {
				if(this[0]) {
					$(this[0]).before(structure = $(structure));
					var children;
					while((children = structure.children()).length) structure = children.first();
					$(structure).append(this)
				}
				return this
			},
			wrapInner: function(structure) {
				var func = isFunction(structure);
				return this.each(function(index) {
					var self = $(this),
						contents = self.contents(),
						dom = func ? structure.call(this, index) : structure;
					contents.length ? contents.wrapAll(dom) : self.append(dom)
				})
			},
			unwrap: function() {
				this.parent().each(function() {
					$(this).replaceWith($(this).children())
				});
				return this
			},
			clone: function() {
				return this.map(function() {
					return this.cloneNode(true)
				})
			},
			hide: function() {
				return this.css("display", "none")
			},
			toggle: function(setting) {
				return this.each(function() {
					var el = $(this);
					(setting === undefined ? el.css("display") == "none" : setting) ? el.show(): el.hide()
				})
			},
			prev: function(selector) {
				return $(this.pluck("previousElementSibling")).filter(selector || "*")
			},
			next: function(selector) {
				return $(this.pluck("nextElementSibling")).filter(selector || "*")
			},
			html: function(html) {
				return 0 in arguments ? this.each(function(idx) {
					var originHtml = this.innerHTML;
					$(this).empty().append(funcArg(this, html, idx, originHtml))
				}) : 0 in this ? this[0].innerHTML : null
			},
			text: function(text) {
				return 0 in arguments ? this.each(function(idx) {
					var newText = funcArg(this, text, idx, this.textContent);
					this.textContent = newText == null ? "" : "" + newText
				}) : 0 in this ? this.pluck("textContent").join("") : null
			},
			attr: function(name, value) {
				var result;
				return typeof name == "string" && !(1 in arguments) ? 0 in this && this[0].nodeType == 1 && (result = this[0].getAttribute(name)) != null ? result : undefined : this.each(function(idx) {
					if(this.nodeType !== 1) return;
					if(isObject(name))
						for(key in name) setAttribute(this, key, name[key]);
					else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
				})
			},
			removeAttr: function(name) {
				return this.each(function() {
					this.nodeType === 1 && name.split(" ").forEach(function(attribute) {
						setAttribute(this, attribute)
					}, this)
				})
			},
			prop: function(name, value) {
				name = propMap[name] || name;
				return 1 in arguments ? this.each(function(idx) {
					this[name] = funcArg(this, value, idx, this[name])
				}) : this[0] && this[0][name]
			},
			removeProp: function(name) {
				name = propMap[name] || name;
				return this.each(function() {
					delete this[name]
				})
			},
			data: function(name, value) {
				var attrName = "data-" + name.replace(capitalRE, "-$1").toLowerCase();
				var data = 1 in arguments ? this.attr(attrName, value) : this.attr(attrName);
				return data !== null ? deserializeValue(data) : undefined
			},
			val: function(value) {
				if(0 in arguments) {
					if(value == null) value = "";
					return this.each(function(idx) {
						this.value = funcArg(this, value, idx, this.value)
					})
				} else {
					return this[0] && (this[0].multiple ? $(this[0]).find("option").filter(function() {
						return this.selected
					}).pluck("value") : this[0].value)
				}
			},
			offset: function(coordinates) {
				if(coordinates) return this.each(function(index) {
					var $this = $(this),
						coords = funcArg(this, coordinates, index, $this.offset()),
						parentOffset = $this.offsetParent().offset(),
						props = {
							top: coords.top - parentOffset.top,
							left: coords.left - parentOffset.left
						};
					if($this.css("position") == "static") props["position"] = "relative";
					$this.css(props)
				});
				if(!this.length) return null;
				if(document.documentElement !== this[0] && !$.contains(document.documentElement, this[0])) return {
					top: 0,
					left: 0
				};
				var obj = this[0].getBoundingClientRect();
				return {
					left: obj.left + window.pageXOffset,
					top: obj.top + window.pageYOffset,
					width: Math.round(obj.width),
					height: Math.round(obj.height)
				}
			},
			css: function(property, value) {
				if(arguments.length < 2) {
					var element = this[0];
					if(typeof property == "string") {
						if(!element) return;
						return element.style[camelize(property)] || getComputedStyle(element, "").getPropertyValue(property)
					} else if(isArray(property)) {
						if(!element) return;
						var props = {};
						var computedStyle = getComputedStyle(element, "");
						$.each(property, function(_, prop) {
							props[prop] = element.style[camelize(prop)] || computedStyle.getPropertyValue(prop)
						});
						return props
					}
				}
				var css = "";
				if(type(property) == "string") {
					if(!value && value !== 0) this.each(function() {
						this.style.removeProperty(dasherize(property))
					});
					else css = dasherize(property) + ":" + maybeAddPx(property, value)
				} else {
					for(key in property)
						if(!property[key] && property[key] !== 0) this.each(function() {
							this.style.removeProperty(dasherize(key))
						});
						else css += dasherize(key) + ":" + maybeAddPx(key, property[key]) + ";"
				}
				return this.each(function() {
					this.style.cssText += ";" + css
				})
			},
			index: function(element) {
				return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
			},
			hasClass: function(name) {
				if(!name) return false;
				return emptyArray.some.call(this, function(el) {
					return this.test(className(el))
				}, classRE(name))
			},
			addClass: function(name) {
				if(!name) return this;
				return this.each(function(idx) {
					if(!("className" in this)) return;
					classList = [];
					var cls = className(this),
						newName = funcArg(this, name, idx, cls);
					newName.split(/\s+/g).forEach(function(klass) {
						if(!$(this).hasClass(klass)) classList.push(klass)
					}, this);
					classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
				})
			},
			removeClass: function(name) {
				return this.each(function(idx) {
					if(!("className" in this)) return;
					if(name === undefined) return className(this, "");
					classList = className(this);
					funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass) {
						classList = classList.replace(classRE(klass), " ")
					});
					className(this, classList.trim())
				})
			},
			toggleClass: function(name, when) {
				if(!name) return this;
				return this.each(function(idx) {
					var $this = $(this),
						names = funcArg(this, name, idx, className(this));
					names.split(/\s+/g).forEach(function(klass) {
						(when === undefined ? !$this.hasClass(klass) : when) ? $this.addClass(klass): $this.removeClass(klass)
					})
				})
			},
			scrollTop: function(value) {
				if(!this.length) return;
				var hasScrollTop = "scrollTop" in this[0];
				if(value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset;
				return this.each(hasScrollTop ? function() {
					this.scrollTop = value
				} : function() {
					this.scrollTo(this.scrollX, value)
				})
			},
			scrollLeft: function(value) {
				if(!this.length) return;
				var hasScrollLeft = "scrollLeft" in this[0];
				if(value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset;
				return this.each(hasScrollLeft ? function() {
					this.scrollLeft = value
				} : function() {
					this.scrollTo(value, this.scrollY)
				})
			},
			position: function() {
				if(!this.length) return;
				var elem = this[0],
					offsetParent = this.offsetParent(),
					offset = this.offset(),
					parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? {
						top: 0,
						left: 0
					} : offsetParent.offset();
				offset.top -= parseFloat($(elem).css("margin-top")) || 0;
				offset.left -= parseFloat($(elem).css("margin-left")) || 0;
				parentOffset.top += parseFloat($(offsetParent[0]).css("border-top-width")) || 0;
				parentOffset.left += parseFloat($(offsetParent[0]).css("border-left-width")) || 0;
				return {
					top: offset.top - parentOffset.top,
					left: offset.left - parentOffset.left
				}
			},
			offsetParent: function() {
				return this.map(function() {
					var parent = this.offsetParent || document.body;
					while(parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static") parent = parent.offsetParent;
					return parent
				})
			}
		};
		$.fn.detach = $.fn.remove;
		["width", "height"].forEach(function(dimension) {
			var dimensionProperty = dimension.replace(/./, function(m) {
				return m[0].toUpperCase()
			});
			$.fn[dimension] = function(value) {
				var offset, el = this[0];
				if(value === undefined) return isWindow(el) ? el["inner" + dimensionProperty] : isDocument(el) ? el.documentElement["scroll" + dimensionProperty] : (offset = this.offset()) && offset[dimension];
				else return this.each(function(idx) {
					el = $(this);
					el.css(dimension, funcArg(this, value, idx, el[dimension]()))
				})
			}
		});

		function traverseNode(node, fun) {
			fun(node);
			for(var i = 0, len = node.childNodes.length; i < len; i++) traverseNode(node.childNodes[i], fun)
		}
		adjacencyOperators.forEach(function(operator, operatorIndex) {
			var inside = operatorIndex % 2;
			$.fn[operator] = function() {
				var argType, nodes = $.map(arguments, function(arg) {
						var arr = [];
						argType = type(arg);
						if(argType == "array") {
							arg.forEach(function(el) {
								if(el.nodeType !== undefined) return arr.push(el);
								else if($.zepto.isZ(el)) return arr = arr.concat(el.get());
								arr = arr.concat(zepto.fragment(el))
							});
							return arr
						}
						return argType == "object" || arg == null ? arg : zepto.fragment(arg)
					}),
					parent, copyByClone = this.length > 1;
				if(nodes.length < 1) return this;
				return this.each(function(_, target) {
					parent = inside ? target : target.parentNode;
					target = operatorIndex == 0 ? target.nextSibling : operatorIndex == 1 ? target.firstChild : operatorIndex == 2 ? target : null;
					var parentInDocument = $.contains(document.documentElement, parent);
					nodes.forEach(function(node) {
						if(copyByClone) node = node.cloneNode(true);
						else if(!parent) return $(node).remove();
						parent.insertBefore(node, target);
						if(parentInDocument) traverseNode(node, function(el) {
							if(el.nodeName != null && el.nodeName.toUpperCase() === "SCRIPT" && (!el.type || el.type === "text/javascript") && !el.src) {
								var target = el.ownerDocument ? el.ownerDocument.defaultView : window;
								target["eval"].call(target, el.innerHTML)
							}
						})
					})
				})
			};
			$.fn[inside ? operator + "To" : "insert" + (operatorIndex ? "Before" : "After")] = function(html) {
				$(html)[operator](this);
				return this
			}
		});
		zepto.Z.prototype = Z.prototype = $.fn;
		zepto.uniq = uniq;
		zepto.deserializeValue = deserializeValue;
		$.zepto = zepto;
		return $
	}();
	window.Zepto = Zepto;
	window.$ === undefined && (window.$ = Zepto);
	(function($) {
		var _zid = 1,
			undefined, slice = Array.prototype.slice,
			isFunction = $.isFunction,
			isString = function(obj) {
				return typeof obj == "string"
			},
			handlers = {},
			specialEvents = {},
			focusinSupported = "onfocusin" in window,
			focus = {
				focus: "focusin",
				blur: "focusout"
			},
			hover = {
				mouseenter: "mouseover",
				mouseleave: "mouseout"
			};
		specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = "MouseEvents";

		function zid(element) {
			return element._zid || (element._zid = _zid++)
		}

		function findHandlers(element, event, fn, selector) {
			event = parse(event);
			if(event.ns) var matcher = matcherFor(event.ns);
			return(handlers[zid(element)] || []).filter(function(handler) {
				return handler && (!event.e || handler.e == event.e) && (!event.ns || matcher.test(handler.ns)) && (!fn || zid(handler.fn) === zid(fn)) && (!selector || handler.sel == selector)
			})
		}

		function parse(event) {
			var parts = ("" + event).split(".");
			return {
				e: parts[0],
				ns: parts.slice(1).sort().join(" ")
			}
		}

		function matcherFor(ns) {
			return new RegExp("(?:^| )" + ns.replace(" ", " .* ?") + "(?: |$)")
		}

		function eventCapture(handler, captureSetting) {
			return handler.del && (!focusinSupported && handler.e in focus) || !!captureSetting
		}

		function realEvent(type) {
			return hover[type] || focusinSupported && focus[type] || type
		}

		function add(element, events, fn, data, selector, delegator, capture) {
			var id = zid(element),
				set = handlers[id] || (handlers[id] = []);
			events.split(/\s/).forEach(function(event) {
				if(event == "ready") return $(document).ready(fn);
				var handler = parse(event);
				handler.fn = fn;
				handler.sel = selector;
				if(handler.e in hover) fn = function(e) {
					var related = e.relatedTarget;
					if(!related || related !== this && !$.contains(this, related)) return handler.fn.apply(this, arguments)
				};
				handler.del = delegator;
				var callback = delegator || fn;
				handler.proxy = function(e) {
					e = compatible(e);
					if(e.isImmediatePropagationStopped()) return;
					e.data = data;
					var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args));
					if(result === false) e.preventDefault(), e.stopPropagation();
					return result
				};
				handler.i = set.length;
				set.push(handler);
				if("addEventListener" in element) element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
			})
		}

		function remove(element, events, fn, selector, capture) {
			var id = zid(element);
			(events || "").split(/\s/).forEach(function(event) {
				findHandlers(element, event, fn, selector).forEach(function(handler) {
					delete handlers[id][handler.i];
					if("removeEventListener" in element) element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
				})
			})
		}
		$.event = {
			add: add,
			remove: remove
		};
		$.proxy = function(fn, context) {
			var args = 2 in arguments && slice.call(arguments, 2);
			if(isFunction(fn)) {
				var proxyFn = function() {
					return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments)
				};
				proxyFn._zid = zid(fn);
				return proxyFn
			} else if(isString(context)) {
				if(args) {
					args.unshift(fn[context], fn);
					return $.proxy.apply(null, args)
				} else {
					return $.proxy(fn[context], fn)
				}
			} else {
				throw new TypeError("expected function")
			}
		};
		$.fn.bind = function(event, data, callback) {
			return this.on(event, data, callback)
		};
		$.fn.unbind = function(event, callback) {
			return this.off(event, callback)
		};
		$.fn.one = function(event, selector, data, callback) {
			return this.on(event, selector, data, callback, 1)
		};
		var returnTrue = function() {
				return true
			},
			returnFalse = function() {
				return false
			},
			ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,
			eventMethods = {
				preventDefault: "isDefaultPrevented",
				stopImmediatePropagation: "isImmediatePropagationStopped",
				stopPropagation: "isPropagationStopped"
			};

		function compatible(event, source) {
			if(source || !event.isDefaultPrevented) {
				source || (source = event);
				$.each(eventMethods, function(name, predicate) {
					var sourceMethod = source[name];
					event[name] = function() {
						this[predicate] = returnTrue;
						return sourceMethod && sourceMethod.apply(source, arguments)
					};
					event[predicate] = returnFalse
				});
				event.timeStamp || (event.timeStamp = Date.now());
				if(source.defaultPrevented !== undefined ? source.defaultPrevented : "returnValue" in source ? source.returnValue === false : source.getPreventDefault && source.getPreventDefault()) event.isDefaultPrevented = returnTrue
			}
			return event
		}

		function createProxy(event) {
			var key, proxy = {
				originalEvent: event
			};
			for(key in event)
				if(!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key];
			return compatible(proxy, event)
		}
		$.fn.delegate = function(selector, event, callback) {
			return this.on(event, selector, callback)
		};
		$.fn.undelegate = function(selector, event, callback) {
			return this.off(event, selector, callback)
		};
		$.fn.live = function(event, callback) {
			$(document.body).delegate(this.selector, event, callback);
			return this
		};
		$.fn.die = function(event, callback) {
			$(document.body).undelegate(this.selector, event, callback);
			return this
		};
		$.fn.on = function(event, selector, data, callback, one) {
			var autoRemove, delegator, $this = this;
			if(event && !isString(event)) {
				$.each(event, function(type, fn) {
					$this.on(type, selector, data, fn, one)
				});
				return $this
			}
			if(!isString(selector) && !isFunction(callback) && callback !== false) callback = data, data = selector, selector = undefined;
			if(callback === undefined || data === false) callback = data, data = undefined;
			if(callback === false) callback = returnFalse;
			return $this.each(function(_, element) {
				if(one) autoRemove = function(e) {
					remove(element, e.type, callback);
					return callback.apply(this, arguments)
				};
				if(selector) delegator = function(e) {
					var evt, match = $(e.target).closest(selector, element).get(0);
					if(match && match !== element) {
						evt = $.extend(createProxy(e), {
							currentTarget: match,
							liveFired: element
						});
						return(autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
					}
				};
				add(element, event, callback, data, selector, delegator || autoRemove)
			})
		};
		$.fn.off = function(event, selector, callback) {
			var $this = this;
			if(event && !isString(event)) {
				$.each(event, function(type, fn) {
					$this.off(type, selector, fn)
				});
				return $this
			}
			if(!isString(selector) && !isFunction(callback) && callback !== false) callback = selector, selector = undefined;
			if(callback === false) callback = returnFalse;
			return $this.each(function() {
				remove(this, event, callback, selector)
			})
		};
		$.fn.trigger = function(event, args) {
			event = isString(event) || $.isPlainObject(event) ? $.Event(event) : compatible(event);
			event._args = args;
			return this.each(function() {
				if(event.type in focus && typeof this[event.type] == "function") this[event.type]();
				else if("dispatchEvent" in this) this.dispatchEvent(event);
				else $(this).triggerHandler(event, args)
			})
		};
		$.fn.triggerHandler = function(event, args) {
			var e, result;
			this.each(function(i, element) {
				e = createProxy(isString(event) ? $.Event(event) : event);
				e._args = args;
				e.target = element;
				$.each(findHandlers(element, event.type || event), function(i, handler) {
					result = handler.proxy(e);
					if(e.isImmediatePropagationStopped()) return false
				})
			});
			return result
		};
		("focusin focusout focus blur load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select keydown keypress keyup error").split(" ").forEach(function(event) {
			$.fn[event] = function(callback) {
				return 0 in arguments ? this.bind(event, callback) : this.trigger(event)
			}
		});
		$.Event = function(type, props) {
			if(!isString(type)) props = type, type = props.type;
			var event = document.createEvent(specialEvents[type] || "Events"),
				bubbles = true;
			if(props)
				for(var name in props) name == "bubbles" ? bubbles = !!props[name] : event[name] = props[name];
			event.initEvent(type, bubbles, true);
			return compatible(event)
		}
	})(Zepto);
	(function($) {
		var jsonpID = +new Date,
			document = window.document,
			key, name, rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
			scriptTypeRE = /^(?:text|application)\/javascript/i,
			xmlTypeRE = /^(?:text|application)\/xml/i,
			jsonType = "application/json",
			htmlType = "text/html",
			blankRE = /^\s*$/,
			originAnchor = document.createElement("a");
		originAnchor.href = window.location.href;

		function triggerAndReturn(context, eventName, data) {
			var event = $.Event(eventName);
			$(context).trigger(event, data);
			return !event.isDefaultPrevented()
		}

		function triggerGlobal(settings, context, eventName, data) {
			if(settings.global) return triggerAndReturn(context || document, eventName, data)
		}
		$.active = 0;

		function ajaxStart(settings) {
			if(settings.global && $.active++ === 0) triggerGlobal(settings, null, "ajaxStart")
		}

		function ajaxStop(settings) {
			if(settings.global && !--$.active) triggerGlobal(settings, null, "ajaxStop")
		}

		function ajaxBeforeSend(xhr, settings) {
			var context = settings.context;
			if(settings.beforeSend.call(context, xhr, settings) === false || triggerGlobal(settings, context, "ajaxBeforeSend", [xhr, settings]) === false) return false;
			triggerGlobal(settings, context, "ajaxSend", [xhr, settings])
		}

		function ajaxSuccess(data, xhr, settings, deferred) {
			var context = settings.context,
				status = "success";
			settings.success.call(context, data, status, xhr);
			if(deferred) deferred.resolveWith(context, [data, status, xhr]);
			triggerGlobal(settings, context, "ajaxSuccess", [xhr, settings, data]);
			ajaxComplete(status, xhr, settings)
		}

		function ajaxError(error, type, xhr, settings, deferred) {
			var context = settings.context;
			settings.error.call(context, xhr, type, error);
			if(deferred) deferred.rejectWith(context, [xhr, type, error]);
			triggerGlobal(settings, context, "ajaxError", [xhr, settings, error || type]);
			ajaxComplete(type, xhr, settings)
		}

		function ajaxComplete(status, xhr, settings) {
			var context = settings.context;
			settings.complete.call(context, xhr, status);
			triggerGlobal(settings, context, "ajaxComplete", [xhr, settings]);
			ajaxStop(settings)
		}

		function ajaxDataFilter(data, type, settings) {
			if(settings.dataFilter == empty) return data;
			var context = settings.context;
			return settings.dataFilter.call(context, data, type)
		}

		function empty() {}
		$.ajaxJSONP = function(options, deferred) {
			if(!("type" in options)) return $.ajax(options);
			var _callbackName = options.jsonpCallback,
				callbackName = ($.isFunction(_callbackName) ? _callbackName() : _callbackName) || "Zepto" + jsonpID++,
				script = document.createElement("script"),
				originalCallback = window[callbackName],
				responseData, abort = function(errorType) {
					$(script).triggerHandler("error", errorType || "abort")
				},
				xhr = {
					abort: abort
				},
				abortTimeout;
			if(deferred) deferred.promise(xhr);
			$(script).on("load error", function(e, errorType) {
				clearTimeout(abortTimeout);
				$(script).off().remove();
				if(e.type == "error" || !responseData) {
					ajaxError(null, errorType || "error", xhr, options, deferred)
				} else {
					ajaxSuccess(responseData[0], xhr, options, deferred)
				}
				window[callbackName] = originalCallback;
				if(responseData && $.isFunction(originalCallback)) originalCallback(responseData[0]);
				originalCallback = responseData = undefined
			});
			if(ajaxBeforeSend(xhr, options) === false) {
				abort("abort");
				return xhr
			}
			window[callbackName] = function() {
				responseData = arguments
			};
			script.src = options.url.replace(/\?(.+)=\?/, "?$1=" + callbackName);
			document.head.appendChild(script);
			if(options.timeout > 0) abortTimeout = setTimeout(function() {
				abort("timeout")
			}, options.timeout);
			return xhr
		};
		$.ajaxSettings = {
			type: "GET",
			beforeSend: empty,
			success: empty,
			error: empty,
			complete: empty,
			context: null,
			global: true,
			xhr: function() {
				return new window.XMLHttpRequest
			},
			accepts: {
				script: "text/javascript, application/javascript, application/x-javascript",
				json: jsonType,
				xml: "application/xml, text/xml",
				html: htmlType,
				text: "text/plain"
			},
			crossDomain: false,
			timeout: 0,
			processData: true,
			cache: true,
			dataFilter: empty
		};

		function mimeToDataType(mime) {
			if(mime) mime = mime.split(";", 2)[0];
			return mime && (mime == htmlType ? "html" : mime == jsonType ? "json" : scriptTypeRE.test(mime) ? "script" : xmlTypeRE.test(mime) && "xml") || "text"
		}

		function appendQuery(url, query) {
			if(query == "") return url;
			return(url + "&" + query).replace(/[&?]{1,2}/, "?")
		}

		function serializeData(options) {
			if(options.processData && options.data && $.type(options.data) != "string") options.data = $.param(options.data, options.traditional);
			if(options.data && (!options.type || options.type.toUpperCase() == "GET" || "jsonp" == options.dataType)) options.url = appendQuery(options.url, options.data), options.data = undefined
		}
		$.ajax = function(options) {
			var settings = $.extend({}, options || {}),
				deferred = $.Deferred && $.Deferred(),
				urlAnchor, hashIndex;
			for(key in $.ajaxSettings)
				if(settings[key] === undefined) settings[key] = $.ajaxSettings[key];
			ajaxStart(settings);
			if(!settings.crossDomain) {
				urlAnchor = document.createElement("a");
				urlAnchor.href = settings.url;
				urlAnchor.href = urlAnchor.href;
				settings.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host
			}
			if(!settings.url) settings.url = window.location.toString();
			if((hashIndex = settings.url.indexOf("#")) > -1) settings.url = settings.url.slice(0, hashIndex);
			serializeData(settings);
			var dataType = settings.dataType,
				hasPlaceholder = /\?.+=\?/.test(settings.url);
			if(hasPlaceholder) dataType = "jsonp";
			if(settings.cache === false || (!options || options.cache !== true) && ("script" == dataType || "jsonp" == dataType)) settings.url = appendQuery(settings.url, "_=" + Date.now());
			if("jsonp" == dataType) {
				if(!hasPlaceholder) settings.url = appendQuery(settings.url, settings.jsonp ? settings.jsonp + "=?" : settings.jsonp === false ? "" : "callback=?");
				return $.ajaxJSONP(settings, deferred)
			}
			var mime = settings.accepts[dataType],
				headers = {},
				setHeader = function(name, value) {
					headers[name.toLowerCase()] = [name, value]
				},
				protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
				xhr = settings.xhr(),
				nativeSetHeader = xhr.setRequestHeader,
				abortTimeout;
			if(deferred) deferred.promise(xhr);
			if(!settings.crossDomain) setHeader("X-Requested-With", "XMLHttpRequest");
			setHeader("Accept", mime || "*/*");
			if(mime = settings.mimeType || mime) {
				if(mime.indexOf(",") > -1) mime = mime.split(",", 2)[0];
				xhr.overrideMimeType && xhr.overrideMimeType(mime)
			}
			if(settings.contentType || settings.contentType !== false && settings.data && settings.type.toUpperCase() != "GET") setHeader("Content-Type", settings.contentType || "application/x-www-form-urlencoded");
			if(settings.headers)
				for(name in settings.headers) setHeader(name, settings.headers[name]);
			xhr.setRequestHeader = setHeader;
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4) {
					xhr.onreadystatechange = empty;
					clearTimeout(abortTimeout);
					var result, error = false;
					if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 || xhr.status == 0 && protocol == "file:") {
						dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader("content-type"));
						if(xhr.responseType == "arraybuffer" || xhr.responseType == "blob") result = xhr.response;
						else {
							result = xhr.responseText;
							try {
								result = ajaxDataFilter(result, dataType, settings);
								if(dataType == "script")(1, eval)(result);
								else if(dataType == "xml") result = xhr.responseXML;
								else if(dataType == "json") result = blankRE.test(result) ? null : $.parseJSON(result)
							} catch(e) {
								error = e
							}
							if(error) return ajaxError(error, "parsererror", xhr, settings, deferred)
						}
						ajaxSuccess(result, xhr, settings, deferred)
					} else {
						ajaxError(xhr.statusText || null, xhr.status ? "error" : "abort", xhr, settings, deferred)
					}
				}
			};
			if(ajaxBeforeSend(xhr, settings) === false) {
				xhr.abort();
				ajaxError(null, "abort", xhr, settings, deferred);
				return xhr
			}
			var async = "async" in settings ? settings.async : true;
			xhr.open(settings.type, settings.url, async, settings.username, settings.password);
			if(settings.xhrFields)
				for(name in settings.xhrFields) xhr[name] = settings.xhrFields[name];
			for(name in headers) nativeSetHeader.apply(xhr, headers[name]);
			if(settings.timeout > 0) abortTimeout = setTimeout(function() {
				xhr.onreadystatechange = empty;
				xhr.abort();
				ajaxError(null, "timeout", xhr, settings, deferred)
			}, settings.timeout);
			xhr.send(settings.data ? settings.data : null);
			return xhr
		};

		function parseArguments(url, data, success, dataType) {
			if($.isFunction(data)) dataType = success, success = data, data = undefined;
			if(!$.isFunction(success)) dataType = success, success = undefined;
			return {
				url: url,
				data: data,
				success: success,
				dataType: dataType
			}
		}
		$.get = function() {
			return $.ajax(parseArguments.apply(null, arguments))
		};
		$.post = function() {
			var options = parseArguments.apply(null, arguments);
			options.type = "POST";
			return $.ajax(options)
		};
		$.getJSON = function() {
			var options = parseArguments.apply(null, arguments);
			options.dataType = "json";
			return $.ajax(options)
		};
		$.fn.load = function(url, data, success) {
			if(!this.length) return this;
			var self = this,
				parts = url.split(/\s/),
				selector, options = parseArguments(url, data, success),
				callback = options.success;
			if(parts.length > 1) options.url = parts[0], selector = parts[1];
			options.success = function(response) {
				self.html(selector ? $("<div>").html(response.replace(rscript, "")).find(selector) : response);
				callback && callback.apply(self, arguments)
			};
			$.ajax(options);
			return this
		};
		var escape = encodeURIComponent;

		function serialize(params, obj, traditional, scope) {
			var type, array = $.isArray(obj),
				hash = $.isPlainObject(obj);
			$.each(obj, function(key, value) {
				type = $.type(value);
				if(scope) key = traditional ? scope : scope + "[" + (hash || type == "object" || type == "array" ? key : "") + "]";
				if(!scope && array) params.add(value.name, value.value);
				else if(type == "array" || !traditional && type == "object") serialize(params, value, traditional, key);
				else params.add(key, value)
			})
		}
		$.param = function(obj, traditional) {
			var params = [];
			params.add = function(key, value) {
				if($.isFunction(value)) value = value();
				if(value == null) value = "";
				this.push(escape(key) + "=" + escape(value))
			};
			serialize(params, obj, traditional);
			return params.join("&").replace(/%20/g, "+")
		}
	})(Zepto);
	(function($) {
		$.fn.serializeArray = function() {
			var name, type, result = [],
				add = function(value) {
					if(value.forEach) return value.forEach(add);
					result.push({
						name: name,
						value: value
					})
				};
			if(this[0]) $.each(this[0].elements, function(_, field) {
				type = field.type, name = field.name;
				if(name && field.nodeName.toLowerCase() != "fieldset" && !field.disabled && type != "submit" && type != "reset" && type != "button" && type != "file" && (type != "radio" && type != "checkbox" || field.checked)) add($(field).val())
			});
			return result
		};
		$.fn.serialize = function() {
			var result = [];
			this.serializeArray().forEach(function(elm) {
				result.push(encodeURIComponent(elm.name) + "=" + encodeURIComponent(elm.value))
			});
			return result.join("&")
		};
		$.fn.submit = function(callback) {
			if(0 in arguments) this.bind("submit", callback);
			else if(this.length) {
				var event = $.Event("submit");
				this.eq(0).trigger(event);
				if(!event.isDefaultPrevented()) this.get(0).submit()
			}
			return this
		}
	})(Zepto);
	(function() {
		try {
			getComputedStyle(undefined)
		} catch(e) {
			var nativeGetComputedStyle = getComputedStyle;
			window.getComputedStyle = function(element, pseudoElement) {
				try {
					return nativeGetComputedStyle(element, pseudoElement)
				} catch(e) {
					return null
				}
			}
		}
	})();
	(function($) {
		var touch = {},
			touchTimeout, tapTimeout, swipeTimeout, longTapTimeout, longTapDelay = 750,
			gesture, down, up, move, eventMap, initialized = false;

		function swipeDirection(x1, x2, y1, y2) {
			return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? x1 - x2 > 0 ? "Left" : "Right" : y1 - y2 > 0 ? "Up" : "Down"
		}

		function longTap() {
			longTapTimeout = null;
			if(touch.last) {
				touch.el.trigger("longTap");
				touch = {}
			}
		}

		function cancelLongTap() {
			if(longTapTimeout) clearTimeout(longTapTimeout);
			longTapTimeout = null
		}

		function cancelAll() {
			if(touchTimeout) clearTimeout(touchTimeout);
			if(tapTimeout) clearTimeout(tapTimeout);
			if(swipeTimeout) clearTimeout(swipeTimeout);
			if(longTapTimeout) clearTimeout(longTapTimeout);
			touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null;
			touch = {}
		}

		function isPrimaryTouch(event) {
			return(event.pointerType == "touch" || event.pointerType == event.MSPOINTER_TYPE_TOUCH) && event.isPrimary
		}

		function isPointerEventType(e, type) {
			return e.type == "pointer" + type || e.type.toLowerCase() == "mspointer" + type
		}

		function unregisterTouchEvents() {
			if(!initialized) return;
			$(document).off(eventMap.down, down).off(eventMap.up, up).off(eventMap.move, move).off(eventMap.cancel, cancelAll);
			$(window).off("scroll", cancelAll);
			cancelAll();
			initialized = false
		}

		function setup(__eventMap) {
			var now, delta, deltaX = 0,
				deltaY = 0,
				firstTouch, _isPointerType;
			unregisterTouchEvents();
			eventMap = __eventMap && "down" in __eventMap ? __eventMap : "ontouchstart" in document ? {
				down: "touchstart",
				up: "touchend",
				move: "touchmove",
				cancel: "touchcancel"
			} : "onpointerdown" in document ? {
				down: "pointerdown",
				up: "pointerup",
				move: "pointermove",
				cancel: "pointercancel"
			} : "onmspointerdown" in document ? {
				down: "MSPointerDown",
				up: "MSPointerUp",
				move: "MSPointerMove",
				cancel: "MSPointerCancel"
			} : false;
			if(!eventMap) return;
			if("MSGesture" in window) {
				gesture = new MSGesture;
				gesture.target = document.body;
				$(document).bind("MSGestureEnd", function(e) {
					var swipeDirectionFromVelocity = e.velocityX > 1 ? "Right" : e.velocityX < -1 ? "Left" : e.velocityY > 1 ? "Down" : e.velocityY < -1 ? "Up" : null;
					if(swipeDirectionFromVelocity) {
						touch.el.trigger("swipe");
						touch.el.trigger("swipe" + swipeDirectionFromVelocity)
					}
				})
			}
			down = function(e) {
				if((_isPointerType = isPointerEventType(e, "down")) && !isPrimaryTouch(e)) return;
				firstTouch = _isPointerType ? e : e.touches[0];
				if(e.touches && e.touches.length === 1 && touch.x2) {
					touch.x2 = undefined;
					touch.y2 = undefined
				}
				now = Date.now();
				delta = now - (touch.last || now);
				touch.el = $("tagName" in firstTouch.target ? firstTouch.target : firstTouch.target.parentNode);
				touchTimeout && clearTimeout(touchTimeout);
				touch.x1 = firstTouch.pageX;
				touch.y1 = firstTouch.pageY;
				if(delta > 0 && delta <= 250) touch.isDoubleTap = true;
				touch.last = now;
				longTapTimeout = setTimeout(longTap, longTapDelay);
				if(gesture && _isPointerType) gesture.addPointer(e.pointerId)
			};
			move = function(e) {
				if((_isPointerType = isPointerEventType(e, "move")) && !isPrimaryTouch(e)) return;
				firstTouch = _isPointerType ? e : e.touches[0];
				cancelLongTap();
				touch.x2 = firstTouch.pageX;
				touch.y2 = firstTouch.pageY;
				deltaX += Math.abs(touch.x1 - touch.x2);
				deltaY += Math.abs(touch.y1 - touch.y2)
			};
			up = function(e) {
				if((_isPointerType = isPointerEventType(e, "up")) && !isPrimaryTouch(e)) return;
				cancelLongTap();
				if(touch.x2 && Math.abs(touch.x1 - touch.x2) > 30 || touch.y2 && Math.abs(touch.y1 - touch.y2) > 30) swipeTimeout = setTimeout(function() {
					if(touch.el) {
						touch.el.trigger("swipe");
						touch.el.trigger("swipe" + swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2))
					}
					touch = {}
				}, 0);
				else if("last" in touch)
					if(deltaX < 30 && deltaY < 30) {
						tapTimeout = setTimeout(function() {
							var event = $.Event("tap");
							event.cancelTouch = cancelAll;
							if(touch.el) touch.el.trigger(event);
							if(touch.isDoubleTap) {
								if(touch.el) touch.el.trigger("doubleTap");
								touch = {}
							} else {
								touchTimeout = setTimeout(function() {
									touchTimeout = null;
									if(touch.el) touch.el.trigger("singleTap");
									touch = {}
								}, 250)
							}
						}, 0)
					} else {
						touch = {}
					}
				deltaX = deltaY = 0
			};
			$(document).on(eventMap.up, up).on(eventMap.down, down).on(eventMap.move, move);
			$(document).on(eventMap.cancel, cancelAll);
			$(window).on("scroll", cancelAll);
			initialized = true
		}["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(eventName) {
			$.fn[eventName] = function(callback) {
				return this.on(eventName, callback)
			}
		});
		$.touch = {
			setup: setup
		};
		$(document).ready(setup)
	})(Zepto);
	(function($, undefined) {
		var prefix = "",
			eventPrefix, vendors = {
				Webkit: "webkit",
				Moz: "",
				O: "o"
			},
			testEl = document.createElement("div"),
			supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
			transform, transitionProperty, transitionDuration, transitionTiming, transitionDelay, animationName, animationDuration, animationTiming, animationDelay, cssReset = {};

		function dasherize(str) {
			return str.replace(/([A-Z])/g, "-$1").toLowerCase()
		}

		function normalizeEvent(name) {
			return eventPrefix ? eventPrefix + name : name.toLowerCase()
		}
		if(testEl.style.transform === undefined) $.each(vendors, function(vendor, event) {
			if(testEl.style[vendor + "TransitionProperty"] !== undefined) {
				prefix = "-" + vendor.toLowerCase() + "-";
				eventPrefix = event;
				return false
			}
		});
		transform = prefix + "transform";
		cssReset[transitionProperty = prefix + "transition-property"] = cssReset[transitionDuration = prefix + "transition-duration"] = cssReset[transitionDelay = prefix + "transition-delay"] = cssReset[transitionTiming = prefix + "transition-timing-function"] = cssReset[animationName = prefix + "animation-name"] = cssReset[animationDuration = prefix + "animation-duration"] = cssReset[animationDelay = prefix + "animation-delay"] = cssReset[animationTiming = prefix + "animation-timing-function"] = "";
		$.fx = {
			off: eventPrefix === undefined && testEl.style.transitionProperty === undefined,
			speeds: {
				_default: 400,
				fast: 200,
				slow: 600
			},
			cssPrefix: prefix,
			transitionEnd: normalizeEvent("TransitionEnd"),
			animationEnd: normalizeEvent("AnimationEnd")
		};
		$.fn.animate = function(properties, duration, ease, callback, delay) {
			if($.isFunction(duration)) callback = duration, ease = undefined, duration = undefined;
			if($.isFunction(ease)) callback = ease, ease = undefined;
			if($.isPlainObject(duration)) ease = duration.easing, callback = duration.complete, delay = duration.delay, duration = duration.duration;
			if(duration) duration = (typeof duration == "number" ? duration : $.fx.speeds[duration] || $.fx.speeds._default) / 1e3;
			if(delay) delay = parseFloat(delay) / 1e3;
			return this.anim(properties, duration, ease, callback, delay)
		};
		$.fn.anim = function(properties, duration, ease, callback, delay) {
			var key, cssValues = {},
				cssProperties, transforms = "",
				that = this,
				wrappedCallback, endEvent = $.fx.transitionEnd,
				fired = false;
			if(duration === undefined) duration = $.fx.speeds._default / 1e3;
			if(delay === undefined) delay = 0;
			if($.fx.off) duration = 0;
			if(typeof properties == "string") {
				cssValues[animationName] = properties;
				cssValues[animationDuration] = duration + "s";
				cssValues[animationDelay] = delay + "s";
				cssValues[animationTiming] = ease || "linear";
				endEvent = $.fx.animationEnd
			} else {
				cssProperties = [];
				for(key in properties)
					if(supportedTransforms.test(key)) transforms += key + "(" + properties[key] + ") ";
					else cssValues[key] = properties[key], cssProperties.push(dasherize(key));
				if(transforms) cssValues[transform] = transforms, cssProperties.push(transform);
				if(duration > 0 && typeof properties === "object") {
					cssValues[transitionProperty] = cssProperties.join(", ");
					cssValues[transitionDuration] = duration + "s";
					cssValues[transitionDelay] = delay + "s";
					cssValues[transitionTiming] = ease || "linear"
				}
			}
			wrappedCallback = function(event) {
				if(typeof event !== "undefined") {
					if(event.target !== event.currentTarget) return;
					$(event.target).unbind(endEvent, wrappedCallback)
				} else $(this).unbind(endEvent, wrappedCallback);
				fired = true;
				$(this).css(cssReset);
				callback && callback.call(this)
			};
			if(duration > 0) {
				this.bind(endEvent, wrappedCallback);
				setTimeout(function() {
					if(fired) return;
					wrappedCallback.call(that)
				}, (duration + delay) * 1e3 + 25)
			}
			this.size() && this.get(0).clientLeft;
			this.css(cssValues);
			if(duration <= 0) setTimeout(function() {
				that.each(function() {
					wrappedCallback.call(this)
				})
			}, 0);
			return this
		};
		testEl = null
	})(Zepto);
	(function($, undefined) {
		var document = window.document,
			origShow = $.fn.show,
			origHide = $.fn.hide,
			origToggle = $.fn.toggle;

		function anim(el, speed, opacity, scale, callback) {
			if(typeof speed == "function" && !callback) callback = speed, speed = undefined;
			var props = {
				opacity: opacity
			};
			if(scale) {
				props.scale = scale;
				el.css($.fx.cssPrefix + "transform-origin", "0 0")
			}
			return el.animate(props, speed, null, callback)
		}

		function hide(el, speed, scale, callback) {
			return anim(el, speed, 0, scale, function() {
				origHide.call($(this));
				callback && callback.call(this)
			})
		}
		$.fn.show = function(speed, callback) {
			origShow.call(this);
			if(speed === undefined) speed = 0;
			else this.css("opacity", 0);
			return anim(this, speed, 1, "1,1", callback)
		};
		$.fn.hide = function(speed, callback) {
			if(speed === undefined) return origHide.call(this);
			else return hide(this, speed, "0,0", callback)
		};
		$.fn.toggle = function(speed, callback) {
			if(speed === undefined || typeof speed == "boolean") return origToggle.call(this, speed);
			else return this.each(function() {
				var el = $(this);
				el[el.css("display") == "none" ? "show" : "hide"](speed, callback)
			})
		};
		$.fn.fadeTo = function(speed, opacity, callback) {
			return anim(this, speed, opacity, null, callback)
		};
		$.fn.fadeIn = function(speed, callback) {
			var target = this.css("opacity");
			if(target > 0) this.css("opacity", 0);
			else target = 1;
			return origShow.call(this).fadeTo(speed, target, callback)
		};
		$.fn.fadeOut = function(speed, callback) {
			return hide(this, speed, null, callback)
		};
		$.fn.fadeToggle = function(speed, callback) {
			return this.each(function() {
				var el = $(this);
				el[el.css("opacity") == 0 || el.css("display") == "none" ? "fadeIn" : "fadeOut"](speed, callback)
			})
		}
	})(Zepto);
	(function($) {
		var zepto = $.zepto,
			oldQsa = zepto.qsa,
			oldMatches = zepto.matches;

		function visible(elem) {
			elem = $(elem);
			return !!(elem.width() || elem.height()) && elem.css("display") !== "none"
		}
		var filters = $.expr[":"] = {
			visible: function() {
				if(visible(this)) return this
			},
			hidden: function() {
				if(!visible(this)) return this
			},
			selected: function() {
				if(this.selected) return this
			},
			checked: function() {
				if(this.checked) return this
			},
			parent: function() {
				return this.parentNode
			},
			first: function(idx) {
				if(idx === 0) return this
			},
			last: function(idx, nodes) {
				if(idx === nodes.length - 1) return this
			},
			eq: function(idx, _, value) {
				if(idx === value) return this
			},
			contains: function(idx, _, text) {
				if($(this).text().indexOf(text) > -1) return this
			},
			has: function(idx, _, sel) {
				if(zepto.qsa(this, sel).length) return this
			}
		};
		var filterRe = new RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*"),
			childRe = /^\s*>/,
			classTag = "Zepto" + +new Date;

		function process(sel, fn) {
			sel = sel.replace(/=#\]/g, '="#"]');
			var filter, arg, match = filterRe.exec(sel);
			if(match && match[2] in filters) {
				filter = filters[match[2]], arg = match[3];
				sel = match[1];
				if(arg) {
					var num = Number(arg);
					if(isNaN(num)) arg = arg.replace(/^["']|["']$/g, "");
					else arg = num
				}
			}
			return fn(sel, filter, arg)
		}
		zepto.qsa = function(node, selector) {
			return process(selector, function(sel, filter, arg) {
				try {
					var taggedParent;
					if(!sel && filter) sel = "*";
					else if(childRe.test(sel)) taggedParent = $(node).addClass(classTag), sel = "." + classTag + " " + sel;
					var nodes = oldQsa(node, sel)
				} catch(e) {
					console.error("error performing selector: %o", selector);
					throw e
				} finally {
					if(taggedParent) taggedParent.removeClass(classTag)
				}
				return !filter ? nodes : zepto.uniq($.map(nodes, function(n, i) {
					return filter.call(n, i, nodes, arg)
				}))
			})
		};
		zepto.matches = function(node, selector) {
			return process(selector, function(sel, filter, arg) {
				return(!sel || oldMatches(node, sel)) && (!filter || filter.call(node, null, arg) === node)
			})
		}
	})(Zepto);
	(function($) {
		function detect(ua, platform) {
			var os = this.os = {},
				browser = this.browser = {},
				webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
				android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
				osx = !!ua.match(/\(Macintosh\; Intel /),
				ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
				ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
				iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
				webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
				win = /Win\d{2}|Windows/.test(platform),
				wp = ua.match(/Windows Phone ([\d.]+)/),
				touchpad = webos && ua.match(/TouchPad/),
				kindle = ua.match(/Kindle\/([\d.]+)/),
				silk = ua.match(/Silk\/([\d._]+)/),
				blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
				bb10 = ua.match(/(BB10).*Version\/([\d.]+)/),
				rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
				playbook = ua.match(/PlayBook/),
				chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
				firefox = ua.match(/Firefox\/([\d.]+)/),
				firefoxos = ua.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/),
				ie = ua.match(/MSIE\s([\d.]+)/) || ua.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
				webview = !chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
				safari = webview || ua.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);
			if(browser.webkit = !!webkit) browser.version = webkit[1];
			if(android) os.android = true, os.version = android[2];
			if(iphone && !ipod) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, ".");
			if(ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, ".");
			if(ipod) os.ios = os.ipod = true, os.version = ipod[3] ? ipod[3].replace(/_/g, ".") : null;
			if(wp) os.wp = true, os.version = wp[1];
			if(webos) os.webos = true, os.version = webos[2];
			if(touchpad) os.touchpad = true;
			if(blackberry) os.blackberry = true, os.version = blackberry[2];
			if(bb10) os.bb10 = true, os.version = bb10[2];
			if(rimtabletos) os.rimtabletos = true, os.version = rimtabletos[2];
			if(playbook) browser.playbook = true;
			if(kindle) os.kindle = true, os.version = kindle[1];
			if(silk) browser.silk = true, browser.version = silk[1];
			if(!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true;
			if(chrome) browser.chrome = true, browser.version = chrome[1];
			if(firefox) browser.firefox = true, browser.version = firefox[1];
			if(firefoxos) os.firefoxos = true, os.version = firefoxos[1];
			if(ie) browser.ie = true, browser.version = ie[1];
			if(safari && (osx || os.ios || win)) {
				browser.safari = true;
				if(!os.ios) browser.version = safari[1]
			}
			if(webview) browser.webview = true;
			os.tablet = !!(ipad || playbook || android && !ua.match(/Mobile/) || firefox && ua.match(/Tablet/) || ie && !ua.match(/Phone/) && ua.match(/Touch/));
			os.phone = !!(!os.tablet && !os.ipod && (android || iphone || webos || blackberry || bb10 || chrome && ua.match(/Android/) || chrome && ua.match(/CriOS\/([\d.]+)/) || firefox && ua.match(/Mobile/) || ie && ua.match(/Touch/)))
		}
		detect.call($, navigator.userAgent, navigator.platform);
		$.__detect = detect
	})(Zepto);
	(function($) {
		var slice = Array.prototype.slice;

		function Deferred(func) {
			var tuples = [
					["resolve", "done", $.Callbacks({
						once: 1,
						memory: 1
					}), "resolved"],
					["reject", "fail", $.Callbacks({
						once: 1,
						memory: 1
					}), "rejected"],
					["notify", "progress", $.Callbacks({
						memory: 1
					})]
				],
				state = "pending",
				promise = {
					state: function() {
						return state
					},
					always: function() {
						deferred.done(arguments).fail(arguments);
						return this
					},
					then: function() {
						var fns = arguments;
						return Deferred(function(defer) {
							$.each(tuples, function(i, tuple) {
								var fn = $.isFunction(fns[i]) && fns[i];
								deferred[tuple[1]](function() {
									var returned = fn && fn.apply(this, arguments);
									if(returned && $.isFunction(returned.promise)) {
										returned.promise().done(defer.resolve).fail(defer.reject).progress(defer.notify)
									} else {
										var context = this === promise ? defer.promise() : this,
											values = fn ? [returned] : arguments;
										defer[tuple[0] + "With"](context, values)
									}
								})
							});
							fns = null
						}).promise()
					},
					promise: function(obj) {
						return obj != null ? $.extend(obj, promise) : promise
					}
				},
				deferred = {};
			$.each(tuples, function(i, tuple) {
				var list = tuple[2],
					stateString = tuple[3];
				promise[tuple[1]] = list.add;
				if(stateString) {
					list.add(function() {
						state = stateString
					}, tuples[i ^ 1][2].disable, tuples[2][2].lock)
				}
				deferred[tuple[0]] = function() {
					deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
					return this
				};
				deferred[tuple[0] + "With"] = list.fireWith
			});
			promise.promise(deferred);
			if(func) func.call(deferred, deferred);
			return deferred
		}
		$.when = function(sub) {
			var resolveValues = slice.call(arguments),
				len = resolveValues.length,
				i = 0,
				remain = len !== 1 || sub && $.isFunction(sub.promise) ? len : 0,
				deferred = remain === 1 ? sub : Deferred(),
				progressValues, progressContexts, resolveContexts, updateFn = function(i, ctx, val) {
					return function(value) {
						ctx[i] = this;
						val[i] = arguments.length > 1 ? slice.call(arguments) : value;
						if(val === progressValues) {
							deferred.notifyWith(ctx, val)
						} else if(!--remain) {
							deferred.resolveWith(ctx, val)
						}
					}
				};
			if(len > 1) {
				progressValues = new Array(len);
				progressContexts = new Array(len);
				resolveContexts = new Array(len);
				for(; i < len; ++i) {
					if(resolveValues[i] && $.isFunction(resolveValues[i].promise)) {
						resolveValues[i].promise().done(updateFn(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFn(i, progressContexts, progressValues))
					} else {
						--remain
					}
				}
			}
			if(!remain) deferred.resolveWith(resolveContexts, resolveValues);
			return deferred.promise()
		};
		$.Deferred = Deferred
	})(Zepto);
	(function($) {
		$.Callbacks = function(options) {
			options = $.extend({}, options);
			var memory, fired, firing, firingStart, firingLength, firingIndex, list = [],
				stack = !options.once && [],
				fire = function(data) {
					memory = options.memory && data;
					fired = true;
					firingIndex = firingStart || 0;
					firingStart = 0;
					firingLength = list.length;
					firing = true;
					for(; list && firingIndex < firingLength; ++firingIndex) {
						if(list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
							memory = false;
							break
						}
					}
					firing = false;
					if(list) {
						if(stack) stack.length && fire(stack.shift());
						else if(memory) list.length = 0;
						else Callbacks.disable()
					}
				},
				Callbacks = {
					add: function() {
						if(list) {
							var start = list.length,
								add = function(args) {
									$.each(args, function(_, arg) {
										if(typeof arg === "function") {
											if(!options.unique || !Callbacks.has(arg)) list.push(arg)
										} else if(arg && arg.length && typeof arg !== "string") add(arg)
									})
								};
							add(arguments);
							if(firing) firingLength = list.length;
							else if(memory) {
								firingStart = start;
								fire(memory)
							}
						}
						return this
					},
					remove: function() {
						if(list) {
							$.each(arguments, function(_, arg) {
								var index;
								while((index = $.inArray(arg, list, index)) > -1) {
									list.splice(index, 1);
									if(firing) {
										if(index <= firingLength) --firingLength;
										if(index <= firingIndex) --firingIndex
									}
								}
							})
						}
						return this
					},
					has: function(fn) {
						return !!(list && (fn ? $.inArray(fn, list) > -1 : list.length))
					},
					empty: function() {
						firingLength = list.length = 0;
						return this
					},
					disable: function() {
						list = stack = memory = undefined;
						return this
					},
					disabled: function() {
						return !list
					},
					lock: function() {
						stack = undefined;
						if(!memory) Callbacks.disable();
						return this
					},
					locked: function() {
						return !stack
					},
					fireWith: function(context, args) {
						if(list && (!fired || stack)) {
							args = args || [];
							args = [context, args.slice ? args.slice() : args];
							if(firing) stack.push(args);
							else fire(args)
						}
						return this
					},
					fire: function() {
						return Callbacks.fireWith(this, arguments)
					},
					fired: function() {
						return !!fired
					}
				};
			return Callbacks
		}
	})(Zepto);
	(function($) {
		"use strict";
		var defaults = {
			click: undefined,
			number: 5,
			numberMax: 10,
			path: "/images",
			readOnly: false,
			size: "small",
			score: undefined,
			space: true,
			starOff: "star-off.png",
			starOn: "star-on.png"
		};
		var raty = {
			init: function(options) {
				return this.each(function() {
					this.self = $(this);
					this.opt = $.extend(true, {}, defaults, options);
					raty._destroy.call(this.self);
					this.opt.score = raty._adjustedScore.call(this, this.opt.score);
					raty._adjustNumber.call(this);
					raty._adjustStarSize.call(this);
					raty._adjustPath.call(this);
					raty._createStars.call(this);
					raty._fill.call(this, this.opt.score);
					if(this.opt.readOnly) {
						this.style.cursor = "";
						this.self.data("readonly", true)
					} else {
						this.style.cursor = "pointer";
						raty._bindClick.call(this)
					}
				})
			},
			_adjustedScore: function(score) {
				if(score) {
					return raty._between(score, 0, this.opt.number)
				}
				return score
			},
			_adjustNumber: function() {
				this.opt.number = raty._between(this.opt.number, 1, this.opt.numberMax)
			},
			_adjustPath: function() {
				this.opt.path = this.opt.path || "";
				if(this.opt.path && this.opt.path.charAt(this.opt.path.length - 1) !== "/") {
					this.opt.path += "/"
				}
			},
			_adjustStarSize: function() {
				if(this.opt["size"] === "small") return
			},
			_between: function(value, min, max) {
				return Math.min(Math.max(parseFloat(value), min), max)
			},
			_bindClick: function() {
				var that = this;
				that.stars.on("click.raty", function(evt) {
					var execute = true,
						score = this.alt || $(this).data("alt");
					if(that.opt.click) {
						execute = that.opt.click.call(that, +score, evt)
					}
					if(execute || execute === undefined) {
						raty._fill.call(that, score)
					}
				})
			},
			_createStars: function() {
				for(var i = 1; i <= this.opt.number; i++) {
					var name = this.opt.score && this.opt.score >= i ? "starOn" : "starOff",
						attrs = {
							alt: i,
							src: this.opt.path + this.opt[name]
						};
					$("<" + "img" + " />", attrs).appendTo(this);
					if(this.opt.space) {
						this.self.append(i < this.opt.number ? "&#160;" : "")
					}
				}
				this.stars = this.self.children("img")
			},
			_fill: function(score) {
				for(var i = 1; i <= this.stars.length; i++) {
					var icon, star = this.stars[i - 1],
						turnOn = i <= score;
					icon = this.opt[turnOn ? "starOn" : "starOff"];
					star["src"] = this.opt.path + icon
				}
			},
			_destroy: function() {
				return this.each(function() {
					var self = $(this),
						raw = self.data("raw");
					if(raw) {
						self.off(".raty").empty().css({
							cursor: raw.style.cursor
						}).removeData("readonly")
					} else {
						self.data("raw", self.clone()[0])
					}
				})
			}
		};
		$.fn.raty = function(options) {
			if(typeof options === "object" || !options) {
				return raty.init.apply(this, arguments)
			}
		}
	})(Zepto);
	return Zepto
});

function Request(strName) {
	var strHref = window.location + "";
	var intPos = strHref.indexOf("?");
	var strRight = strHref.substr(intPos + 1);
	var arrTmp = strRight.split("&");
	for(var i = 0; i < arrTmp.length; i++) {
		var arrTemp = arrTmp[i].split("=");
		if(arrTemp[0].toUpperCase() == strName.toUpperCase()) return arrTemp[1]
	}
	return null
}(function() {
	function getClass(dom, string) {
		return dom.getElementsByClassName(string)
	}

	function MobileSelect(config) {
		this.mobileSelect;
		this.wheelsData = config.wheels;
		this.jsonType = false;
		this.cascadeJsonData = [];
		this.displayJson = [];
		this.curValue = null;
		this.curIndexArr = [];
		this.cascade = false;
		this.startY;
		this.moveEndY;
		this.moveY;
		this.oldMoveY;
		this.offset = 0;
		this.offsetSum = 0;
		this.oversizeBorder;
		this.curDistance = [];
		this.clickStatus = false;
		this.isPC = true;
		this.init(config)
	}
	MobileSelect.prototype = {
		constructor: MobileSelect,
		init: function(config) {
			var _this = this;
			_this.keyMap = config.keyMap ? config.keyMap : {
				id: "id",
				value: "value",
				childs: "childs"
			};
			_this.checkDataType();
			_this.renderWheels(_this.wheelsData, config.cancelBtnText, config.ensureBtnText);
			_this.trigger = document.querySelector(config.trigger);
			if(!_this.trigger) {
				console.error("mobileSelect has been successfully installed, but no trigger found on your page.");
				return false
			}
			_this.wheel = getClass(_this.mobileSelect, "wheel");
			_this.slider = getClass(_this.mobileSelect, "selectContainer");
			_this.wheels = _this.mobileSelect.querySelector(".wheels");
			_this.liHeight = _this.mobileSelect.querySelector("li").offsetHeight;
			_this.ensureBtn = _this.mobileSelect.querySelector(".ensure");
			_this.cancelBtn = _this.mobileSelect.querySelector(".cancel");
			_this.grayLayer = _this.mobileSelect.querySelector(".grayLayer");
			_this.popUp = _this.mobileSelect.querySelector(".content");
			_this.callback = config.callback || function() {};
			_this.transitionEnd = config.transitionEnd || function() {};
			_this.onShow = config.onShow || function() {};
			_this.onHide = config.onHide || function() {};
			_this.initPosition = config.position || [];
			_this.titleText = config.title || "";
			_this.connector = config.connector || " ";
			_this.triggerDisplayData = !(typeof config.triggerDisplayData == "undefined") ? config.triggerDisplayData : true;
			_this.trigger.style.cursor = "pointer";
			_this.setStyle(config);
			_this.setTitle(_this.titleText);
			_this.checkIsPC();
			_this.checkCascade();
			_this.addListenerAll();
			if(_this.cascade) {
				_this.initCascade()
			}
			if(_this.initPosition.length < _this.slider.length) {
				var diff = _this.slider.length - _this.initPosition.length;
				for(var i = 0; i < diff; i++) {
					_this.initPosition.push(0)
				}
			}
			_this.setCurDistance(_this.initPosition);
			_this.cancelBtn.addEventListener("click", function() {
				_this.hide()
			});
			_this.ensureBtn.addEventListener("click", function() {
				_this.hide();
				var tempValue = "";
				for(var i = 0; i < _this.wheel.length; i++) {
					i == _this.wheel.length - 1 ? tempValue += _this.getInnerHtml(i) : tempValue += _this.getInnerHtml(i) + _this.connector
				}
				if(_this.triggerDisplayData) {
					_this.trigger.innerHTML = tempValue
				}
				_this.curIndexArr = _this.getIndexArr();
				_this.curValue = _this.getCurValue();
				_this.callback(_this.curIndexArr, _this.curValue)
			});
			_this.trigger.addEventListener("click", function() {
				_this.show()
			});
			_this.grayLayer.addEventListener("click", function() {
				_this.hide()
			});
			_this.popUp.addEventListener("click", function() {
				event.stopPropagation()
			});
			_this.fixRowStyle()
		},
		setTitle: function(string) {
			var _this = this;
			_this.titleText = string;
			_this.mobileSelect.querySelector(".title").innerHTML = _this.titleText
		},
		setStyle: function(config) {
			var _this = this;
			if(config.ensureBtnColor) {
				_this.ensureBtn.style.color = config.ensureBtnColor
			}
			if(config.cancelBtnColor) {
				_this.cancelBtn.style.color = config.cancelBtnColor
			}
			if(config.titleColor) {
				_this.title = _this.mobileSelect.querySelector(".title");
				_this.title.style.color = config.titleColor
			}
			if(config.textColor) {
				_this.panel = _this.mobileSelect.querySelector(".panel");
				_this.panel.style.color = config.textColor
			}
			if(config.titleBgColor) {
				_this.btnBar = _this.mobileSelect.querySelector(".btnBar");
				_this.btnBar.style.backgroundColor = config.titleBgColor
			}
			if(config.bgColor) {
				_this.panel = _this.mobileSelect.querySelector(".panel");
				_this.shadowMask = _this.mobileSelect.querySelector(".shadowMask");
				_this.panel.style.backgroundColor = config.bgColor;
				_this.shadowMask.style.background = "linear-gradient(to bottom, " + config.bgColor + ", rgba(255, 255, 255, 0), " + config.bgColor + ")"
			}
		},
		checkIsPC: function() {
			var _this = this;
			var sUserAgent = navigator.userAgent.toLowerCase();
			var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
			var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
			var bIsMidp = sUserAgent.match(/midp/i) == "midp";
			var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
			var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
			var bIsAndroid = sUserAgent.match(/android/i) == "android";
			var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
			var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
			if(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
				_this.isPC = false
			}
		},
		show: function() {
			this.mobileSelect.classList.add("mobileSelect-show");
			if(typeof this.onShow === "function") {
				this.onShow(this)
			}
		},
		hide: function() {
			this.mobileSelect.classList.remove("mobileSelect-show");
			if(typeof this.onHide === "function") {
				this.onHide(this)
			}
		},
		renderWheels: function(wheelsData, cancelBtnText, ensureBtnText) {
			var _this = this;
			var cancelText = cancelBtnText ? cancelBtnText : "鍙栨秷";
			var ensureText = ensureBtnText ? ensureBtnText : "纭";
			_this.mobileSelect = document.createElement("div");
			_this.mobileSelect.className = "mobileSelect";
			_this.mobileSelect.innerHTML = '<div class="grayLayer"></div>' + '<div class="content">' + '<div class="btnBar">' + '<div class="fixWidth">' + '<div class="cancel">' + cancelText + "</div>" + '<div class="title"></div>' + '<div class="ensure">' + ensureText + "</div>" + "</div>" + "</div>" + '<div class="panel">' + '<div class="fixWidth">' + '<div class="wheels">' + "</div>" + '<div class="selectLine"></div>' + '<div class="shadowMask"></div>' + "</div>" + "</div>" + "</div>";
			document.body.appendChild(_this.mobileSelect);
			var tempHTML = "";
			for(var i = 0; i < wheelsData.length; i++) {
				tempHTML += '<div class="wheel"><ul class="selectContainer">';
				if(_this.jsonType) {
					for(var j = 0; j < wheelsData[i].data.length; j++) {
						tempHTML += '<li data-id="' + wheelsData[i].data[j][_this.keyMap.id] + '">' + wheelsData[i].data[j][_this.keyMap.value] + "</li>"
					}
				} else {
					for(var j = 0; j < wheelsData[i].data.length; j++) {
						tempHTML += "<li>" + wheelsData[i].data[j] + "</li>"
					}
				}
				tempHTML += "</ul></div>"
			}
			_this.mobileSelect.querySelector(".wheels").innerHTML = tempHTML
		},
		addListenerAll: function() {
			var _this = this;
			for(var i = 0; i < _this.slider.length; i++) {
				(function(i) {
					_this.addListenerWheel(_this.wheel[i], i);
					_this.addListenerLi(i)
				})(i)
			}
		},
		addListenerWheel: function(theWheel, index) {
			var _this = this;
			theWheel.addEventListener("touchstart", function() {
				_this.touch(event, this.firstChild, index)
			}, false);
			theWheel.addEventListener("touchend", function() {
				_this.touch(event, this.firstChild, index)
			}, false);
			theWheel.addEventListener("touchmove", function() {
				_this.touch(event, this.firstChild, index)
			}, false);
			if(_this.isPC) {
				theWheel.addEventListener("mousedown", function() {
					_this.dragClick(event, this.firstChild, index)
				}, false);
				theWheel.addEventListener("mousemove", function() {
					_this.dragClick(event, this.firstChild, index)
				}, false);
				theWheel.addEventListener("mouseup", function() {
					_this.dragClick(event, this.firstChild, index)
				}, true)
			}
		},
		addListenerLi: function(sliderIndex) {
			var _this = this;
			var curWheelLi = _this.slider[sliderIndex].getElementsByTagName("li");
			for(var j = 0; j < curWheelLi.length; j++) {
				(function(j) {
					curWheelLi[j].addEventListener("click", function() {
						_this.singleClick(this, j, sliderIndex)
					}, false)
				})(j)
			}
		},
		checkDataType: function() {
			var _this = this;
			if(typeof _this.wheelsData[0].data[0] == "object") {
				_this.jsonType = true
			}
		},
		checkCascade: function() {
			var _this = this;
			if(_this.jsonType) {
				var node = _this.wheelsData[0].data;
				for(var i = 0; i < node.length; i++) {
					if(_this.keyMap.childs in node[i] && node[i][_this.keyMap.childs].length > 0) {
						_this.cascade = true;
						_this.cascadeJsonData = _this.wheelsData[0].data;
						break
					}
				}
			} else {
				_this.cascade = false
			}
		},
		generateArrData: function(targetArr) {
			var tempArr = [];
			var keyMap_id = this.keyMap.id;
			var keyMap_value = this.keyMap.value;
			for(var i = 0; i < targetArr.length; i++) {
				var tempObj = {};
				tempObj[keyMap_id] = targetArr[i][this.keyMap.id];
				tempObj[keyMap_value] = targetArr[i][this.keyMap.value];
				tempArr.push(tempObj)
			}
			return tempArr
		},
		initCascade: function() {
			var _this = this;
			_this.displayJson.push(_this.generateArrData(_this.cascadeJsonData));
			if(_this.initPosition.length > 0) {
				_this.initDeepCount = 0;
				_this.initCheckArrDeep(_this.cascadeJsonData[_this.initPosition[0]])
			} else {
				_this.checkArrDeep(_this.cascadeJsonData[0])
			}
			_this.reRenderWheels()
		},
		initCheckArrDeep: function(parent) {
			var _this = this;
			if(parent) {
				if(_this.keyMap.childs in parent && parent[_this.keyMap.childs].length > 0) {
					_this.displayJson.push(_this.generateArrData(parent[_this.keyMap.childs]));
					_this.initDeepCount++;
					var nextNode = parent[_this.keyMap.childs][_this.initPosition[_this.initDeepCount]];
					if(nextNode) {
						_this.initCheckArrDeep(nextNode)
					} else {
						_this.checkArrDeep(parent[_this.keyMap.childs][0])
					}
				}
			}
		},
		checkArrDeep: function(parent) {
			var _this = this;
			if(parent) {
				if(_this.keyMap.childs in parent && parent[_this.keyMap.childs].length > 0) {
					_this.displayJson.push(_this.generateArrData(parent[_this.keyMap.childs]));
					_this.checkArrDeep(parent[_this.keyMap.childs][0])
				}
			}
		},
		checkRange: function(index, posIndexArr) {
			var _this = this;
			var deleteNum = _this.displayJson.length - 1 - index;
			for(var i = 0; i < deleteNum; i++) {
				_this.displayJson.pop()
			}
			var resultNode;
			for(var i = 0; i <= index; i++) {
				if(i == 0) {
					resultNode = _this.cascadeJsonData[posIndexArr[0]]
				} else {
					resultNode = resultNode[_this.keyMap.childs][posIndexArr[i]]
				}
			}
			_this.checkArrDeep(resultNode);
			_this.reRenderWheels();
			_this.fixRowStyle();
			_this.setCurDistance(_this.resetPosition(index, posIndexArr))
		},
		resetPosition: function(index, posIndexArr) {
			var _this = this;
			var tempPosArr = posIndexArr;
			var tempCount;
			if(_this.slider.length > posIndexArr.length) {
				tempCount = _this.slider.length - posIndexArr.length;
				for(var i = 0; i < tempCount; i++) {
					tempPosArr.push(0)
				}
			} else {
				if(_this.slider.length < posIndexArr.length) {
					tempCount = posIndexArr.length - _this.slider.length;
					for(var i = 0; i < tempCount; i++) {
						tempPosArr.pop()
					}
				}
			}
			for(var i = index + 1; i < tempPosArr.length; i++) {
				tempPosArr[i] = 0
			}
			return tempPosArr
		},
		reRenderWheels: function() {
			var _this = this;
			if(_this.wheel.length > _this.displayJson.length) {
				var count = _this.wheel.length - _this.displayJson.length;
				for(var i = 0; i < count; i++) {
					_this.wheels.removeChild(_this.wheel[_this.wheel.length - 1])
				}
			}
			for(var i = 0; i < _this.displayJson.length; i++) {
				(function(i) {
					var tempHTML = "";
					if(_this.wheel[i]) {
						for(var j = 0; j < _this.displayJson[i].length; j++) {
							tempHTML += '<li data-id="' + _this.displayJson[i][j][_this.keyMap.id] + '">' + _this.displayJson[i][j][_this.keyMap.value] + "</li>"
						}
						_this.slider[i].innerHTML = tempHTML
					} else {
						var tempWheel = document.createElement("div");
						tempWheel.className = "wheel";
						tempHTML = '<ul class="selectContainer">';
						for(var j = 0; j < _this.displayJson[i].length; j++) {
							tempHTML += '<li data-id="' + _this.displayJson[i][j][_this.keyMap.id] + '">' + _this.displayJson[i][j][_this.keyMap.value] + "</li>"
						}
						tempHTML += "</ul>";
						tempWheel.innerHTML = tempHTML;
						_this.addListenerWheel(tempWheel, i);
						_this.wheels.appendChild(tempWheel)
					}
					_this.addListenerLi(i)
				})(i)
			}
		},
		updateWheels: function(data) {
			var _this = this;
			if(_this.cascade) {
				_this.cascadeJsonData = data;
				_this.displayJson = [];
				_this.initCascade();
				if(_this.initPosition.length < _this.slider.length) {
					var diff = _this.slider.length - _this.initPosition.length;
					for(var i = 0; i < diff; i++) {
						_this.initPosition.push(0)
					}
				}
				_this.setCurDistance(_this.initPosition);
				_this.fixRowStyle()
			}
		},
		updateWheel: function(sliderIndex, data) {
			var _this = this;
			var tempHTML = "";
			if(_this.cascade) {
				console.error("绾ц仈鏍煎紡涓嶆敮鎸乽pdateWheel(),璇蜂娇鐢╱pdateWheels()鏇存柊鏁翠釜鏁版嵁婧�");
				return false
			} else {
				if(_this.jsonType) {
					for(var j = 0; j < data.length; j++) {
						tempHTML += '<li data-id="' + data[j][_this.keyMap.id] + '">' + data[j][_this.keyMap.value] + "</li>"
					}
					_this.wheelsData[sliderIndex] = {
						data: data
					}
				} else {
					for(var j = 0; j < data.length; j++) {
						tempHTML += "<li>" + data[j] + "</li>"
					}
					_this.wheelsData[sliderIndex] = data
				}
			}
			_this.slider[sliderIndex].innerHTML = tempHTML;
			_this.addListenerLi(sliderIndex)
		},
		fixRowStyle: function() {
			var _this = this;
			var width = (100 / _this.wheel.length).toFixed(2);
			for(var i = 0; i < _this.wheel.length; i++) {
				_this.wheel[i].style.width = width + "%"
			}
		},
		getIndex: function(distance) {
			return Math.round((2 * this.liHeight - distance) / this.liHeight)
		},
		getIndexArr: function() {
			var _this = this;
			var temp = [];
			for(var i = 0; i < _this.curDistance.length; i++) {
				temp.push(_this.getIndex(_this.curDistance[i]))
			}
			return temp
		},
		getCurValue: function() {
			var _this = this;
			var temp = [];
			var positionArr = _this.getIndexArr();
			if(_this.cascade) {
				for(var i = 0; i < _this.wheel.length; i++) {
					temp.push(_this.displayJson[i][positionArr[i]])
				}
			} else {
				if(_this.jsonType) {
					for(var i = 0; i < _this.curDistance.length; i++) {
						temp.push(_this.wheelsData[i].data[_this.getIndex(_this.curDistance[i])])
					}
				} else {
					for(var i = 0; i < _this.curDistance.length; i++) {
						temp.push(_this.getInnerHtml(i))
					}
				}
			}
			return temp
		},
		getValue: function() {
			return this.curValue
		},
		calcDistance: function(index) {
			return 2 * this.liHeight - index * this.liHeight
		},
		setCurDistance: function(indexArr) {
			var _this = this;
			var temp = [];
			for(var i = 0; i < _this.slider.length; i++) {
				temp.push(_this.calcDistance(indexArr[i]));
				_this.movePosition(_this.slider[i], temp[i])
			}
			_this.curDistance = temp
		},
		fixPosition: function(distance) {
			return -(this.getIndex(distance) - 2) * this.liHeight
		},
		movePosition: function(theSlider, distance) {
			theSlider.style.webkitTransform = "translate3d(0," + distance + "px, 0)";
			theSlider.style.transform = "translate3d(0," + distance + "px, 0)"
		},
		locatePosition: function(index, posIndex) {
			var _this = this;
			this.curDistance[index] = this.calcDistance(posIndex);
			this.movePosition(this.slider[index], this.curDistance[index]);
			if(_this.cascade) {
				_this.checkRange(index, _this.getIndexArr())
			}
		},
		updateCurDistance: function(theSlider, index) {
			this.curDistance[index] = parseInt(theSlider.style.transform.split(",")[1])
		},
		getDistance: function(theSlider) {
			return parseInt(theSlider.style.transform.split(",")[1])
		},
		getInnerHtml: function(sliderIndex) {
			var _this = this;
			var index = _this.getIndex(_this.curDistance[sliderIndex]);
			return _this.slider[sliderIndex].getElementsByTagName("li")[index].innerHTML
		},
		touch: function(event, theSlider, index) {
			var _this = this;
			event = event || window.event;
			switch(event.type) {
				case "touchstart":
					_this.startY = event.touches[0].clientY;
					_this.oldMoveY = _this.startY;
					break;
				case "touchend":
					_this.moveEndY = event.changedTouches[0].clientY;
					_this.offsetSum = _this.moveEndY - _this.startY;
					_this.updateCurDistance(theSlider, index);
					_this.curDistance[index] = _this.fixPosition(_this.curDistance[index]);
					_this.movePosition(theSlider, _this.curDistance[index]);
					_this.oversizeBorder = -(theSlider.getElementsByTagName("li").length - 3) * _this.liHeight;
					if(_this.curDistance[index] + _this.offsetSum > 2 * _this.liHeight) {
						_this.curDistance[index] = 2 * _this.liHeight;
						setTimeout(function() {
							_this.movePosition(theSlider, _this.curDistance[index])
						}, 100)
					} else {
						if(_this.curDistance[index] + _this.offsetSum < _this.oversizeBorder) {
							_this.curDistance[index] = _this.oversizeBorder;
							setTimeout(function() {
								_this.movePosition(theSlider, _this.curDistance[index])
							}, 100)
						}
					}
					_this.transitionEnd(_this.getIndexArr(), _this.getCurValue());
					if(_this.cascade) {
						_this.checkRange(index, _this.getIndexArr())
					}
					break;
				case "touchmove":
					event.preventDefault();
					_this.moveY = event.touches[0].clientY;
					_this.offset = _this.moveY - _this.oldMoveY;
					_this.updateCurDistance(theSlider, index);
					_this.curDistance[index] = _this.curDistance[index] + _this.offset;
					_this.movePosition(theSlider, _this.curDistance[index]);
					_this.oldMoveY = _this.moveY;
					break
			}
		},
		dragClick: function(event, theSlider, index) {
			var _this = this;
			event = event || window.event;
			switch(event.type) {
				case "mousedown":
					_this.startY = event.clientY;
					_this.oldMoveY = _this.startY;
					_this.clickStatus = true;
					break;
				case "mouseup":
					_this.moveEndY = event.clientY;
					_this.offsetSum = _this.moveEndY - _this.startY;
					_this.updateCurDistance(theSlider, index);
					_this.curDistance[index] = _this.fixPosition(_this.curDistance[index]);
					_this.movePosition(theSlider, _this.curDistance[index]);
					_this.oversizeBorder = -(theSlider.getElementsByTagName("li").length - 3) * _this.liHeight;
					if(_this.curDistance[index] + _this.offsetSum > 2 * _this.liHeight) {
						_this.curDistance[index] = 2 * _this.liHeight;
						setTimeout(function() {
							_this.movePosition(theSlider, _this.curDistance[index])
						}, 100)
					} else {
						if(_this.curDistance[index] + _this.offsetSum < _this.oversizeBorder) {
							_this.curDistance[index] = _this.oversizeBorder;
							setTimeout(function() {
								_this.movePosition(theSlider, _this.curDistance[index])
							}, 100)
						}
					}
					_this.clickStatus = false;
					_this.transitionEnd(_this.getIndexArr(), _this.getCurValue());
					if(_this.cascade) {
						_this.checkRange(index, _this.getIndexArr())
					}
					break;
				case "mousemove":
					event.preventDefault();
					if(_this.clickStatus) {
						_this.moveY = event.clientY;
						_this.offset = _this.moveY - _this.oldMoveY;
						_this.updateCurDistance(theSlider, index);
						_this.curDistance[index] = _this.curDistance[index] + _this.offset;
						_this.movePosition(theSlider, _this.curDistance[index]);
						_this.oldMoveY = _this.moveY
					}
					break
			}
		},
		singleClick: function(theLi, index, sliderIndex) {
			var _this = this;
			if(_this.cascade) {
				var tempPosArr = _this.getIndexArr();
				tempPosArr[sliderIndex] = index;
				_this.checkRange(sliderIndex, tempPosArr)
			} else {
				_this.curDistance[sliderIndex] = (2 - index) * _this.liHeight;
				_this.movePosition(theLi.parentNode, _this.curDistance[sliderIndex])
			}
			_this.transitionEnd(_this.getIndexArr(), _this.getCurValue())
		}
	};
	if(typeof exports == "object") {
		module.exports = MobileSelect
	} else {
		if(typeof define == "function" && define.amd) {
			define([], function() {
				return MobileSelect
			})
		} else {
			window.MobileSelect = MobileSelect
		}
	}
})();
var errTips = null;

function tips(mes, state, autoHide, hideTime) {
	var mesBox = $("#mesBox"),
		title = $("#mesBox_title"),
		_close = $("#mesBox_close"),
		isShow = false;
	this.set = function(_mes, _state, _autoHide, _hideTime) {
		mes = _mes;
		state = _state;
		autoHide = _autoHide;
		hideTime = _hideTime;
		this.init()
	};
	this.init = function() {
		if(autoHide == undefined) autoHide = 1;
		if(hideTime == undefined) hideTime = 3e3;
		if(state == 1) hideTime = 3e3;
		title.html(mes);
		if(state == 1) {
			mesBox.removeClass("failure");
			mesBox.removeClass("waiting");
			mesBox.addClass("success")
		} else if(state == 2) {
			mesBox.removeClass("failure");
			mesBox.removeClass("success");
			mesBox.addClass("waiting")
		} else {
			mesBox.removeClass("success");
			mesBox.removeClass("waiting");
			mesBox.addClass("failure")
		}
		if(autoHide == 1) {
			setTimeout("tipAlerts_hide()", hideTime)
		}
	};
	this.show = function() {
		if(!isShow) {
			isShow = true;
			mesBox.show()
		}
	};
	this.hide = function() {
		if(isShow) {
			isShow = false;
			mesBox.hide()
		}
	};
	_close.click(function() {
		isShow = false;
		mesBox.hide()
	});
	this.init()
}

function tipAlerts(mes, state, autoHide, hideTime) {
	if(errTips == null) {
		errTips = new tips(mes, state, autoHide, hideTime)
	} else {
		errTips.set(mes, state, autoHide, hideTime)
	}
	errTips.show()
}

function tipAlerts_hide() {
	if(errTips != null) {
		errTips.hide()
	}
}