(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["react-infinite-list"] = factory(require("react"));
	else
		root["react-infinite-list"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = _interopRequire(__webpack_require__(1));

	var classnames = _interopRequire(__webpack_require__(2));

	var isWebkit = /WebKit/.test(navigator && navigator.userAgent || "");

	function isHighDensity() {
	    return window.matchMedia && (window.matchMedia("only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)").matches || window.matchMedia("only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)").matches) || window.devicePixelRatio && window.devicePixelRatio > 1.3;
	}

	var LoadingListItem = (function (_React$Component) {
	    function LoadingListItem() {
	        _classCallCheck(this, LoadingListItem);

	        if (_React$Component != null) {
	            _React$Component.apply(this, arguments);
	        }
	    }

	    _inherits(LoadingListItem, _React$Component);

	    _createClass(LoadingListItem, {
	        render: {
	            value: function render() {
	                return React.createElement(
	                    "div",
	                    { key: this.props.id, className: "infinite-list-item item-loading" },
	                    "Loading..."
	                );
	            }
	        }
	    });

	    return LoadingListItem;
	})(React.Component);

	var InfiniteListItem = (function (_React$Component2) {
	    function InfiniteListItem() {
	        _classCallCheck(this, InfiniteListItem);

	        if (_React$Component2 != null) {
	            _React$Component2.apply(this, arguments);
	        }
	    }

	    _inherits(InfiniteListItem, _React$Component2);

	    _createClass(InfiniteListItem, {
	        render: {
	            value: function render() {
	                return React.createElement(
	                    "div",
	                    { key: this.props.id, className: "infinite-list-item" },
	                    this.props.title
	                );
	            }
	        }
	    });

	    return InfiniteListItem;
	})(React.Component);

	InfiniteListItem.propTypes = {
	    title: React.PropTypes.string.isRequired,
	    id: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]).isRequired
	};

	var InfiniteList = (function (_React$Component3) {
	    function InfiniteList(props) {
	        _classCallCheck(this, InfiniteList);

	        _get(Object.getPrototypeOf(InfiniteList.prototype), "constructor", this).call(this, props);

	        this._scrollTimer = null;
	        this.state = { renderedStart: 0 };
	    }

	    _inherits(InfiniteList, _React$Component3);

	    _createClass(InfiniteList, {
	        onWheel: {
	            value: function onWheel() {
	                this._scrolledByWheel = true;
	            }
	        },
	        onScroll: {
	            value: function onScroll(e) {
	                e.stopPropagation();

	                // webkit when scrolling by wheel
	                if (isWebkit && this._scrolledByWheel && !isHighDensity()) {
	                    this._scrolledByWheel = false;

	                    if (!this._scrollTimer) {
	                        this._scrollTimer = setTimeout((function () {
	                            this._scrollTimer = null;
	                            this._calculateVisibleItems();
	                        }).bind(this), 150);
	                    }

	                    return;
	                }

	                this._calculateVisibleItems();
	            }
	        },
	        _calculateVisibleItems: {
	            value: function _calculateVisibleItems() {
	                var scrolledPx = React.findDOMNode(this).scrollTop;

	                var visibleStart = Math.floor(scrolledPx / this.props.itemHeight);

	                if (visibleStart !== this.state.renderedStart) {
	                    this.setState({ renderedStart: visibleStart });
	                }
	            }
	        },
	        componentWillReceiveProps: {
	            value: function componentWillReceiveProps(nextProps) {
	                var itemsChanged = this.props.items.length !== nextProps.items.length,
	                    heightChanged = this.props.height !== nextProps.height;

	                if (itemsChanged || heightChanged) {
	                    this._calculateVisibleItems();
	                }
	            }
	        },
	        _getItemComponent: {
	            value: function _getItemComponent(item, i) {
	                var ListItemComponent = this.props.listItemClass;

	                if (this.props.isItemLoading(item)) {
	                    ListItemComponent = this.props.loadingListItemClass;
	                }

	                var key = item ? item.id : i;

	                return React.createElement(ListItemComponent, _extends({ key: key }, item));
	            }
	        },
	        _getClassNames: {
	            value: function _getClassNames() {
	                return classnames("infinite-list", this.props.className);
	            }
	        },
	        componentDidMount: {
	            value: function componentDidMount() {
	                var _this = this;

	                this.state.isInitialRender = false;

	                var node = React.findDOMNode(this);
	                setTimeout(function () {
	                    node.scrollTop = _this.props.firstVisibleItemIndex * _this.props.itemHeight;
	                }, 0);
	            }
	        },
	        _getVisibleSlice: {
	            value: function _getVisibleSlice(items, start, end) {
	                var result = [];

	                for (var i = start; i < end; i++) {
	                    result.push(items[i]);
	                }

	                return result;
	            }
	        },
	        _prepareVisibleItems: {
	            value: function _prepareVisibleItems(itemsPerPage) {
	                var visibleStart = this.state.renderedStart,
	                    visibleEnd = Math.min(this.props.itemsCount, visibleStart + itemsPerPage);

	                var visibleItems = this._getVisibleSlice(this.props.items, visibleStart, visibleEnd);

	                if (this.props.paging && _.any(visibleItems, this.props.isItemLoading)) {
	                    this.props.onRangeChange(visibleStart, visibleEnd);
	                }

	                return visibleItems;
	            }
	        },
	        _getContentStyle: {
	            value: function _getContentStyle(itemsPerPage) {
	                var itemHeight = this.props.itemHeight;

	                // the number one guarantees there is never empty space at the end of the list
	                var totalHeight = this.props.itemsCount * itemHeight,
	                    pageHeight = itemsPerPage * itemHeight;

	                // if maximum number of items on page is larger than actual number of items, maxPadding can be < 0
	                var maxPadding = Math.max(0, totalHeight - pageHeight + itemHeight),
	                    padding = this.state.renderedStart * this.props.itemHeight,
	                    paddingTop = Math.min(maxPadding, padding);

	                return {
	                    height: totalHeight - paddingTop,
	                    paddingTop: paddingTop
	                };
	            }
	        },
	        render: {
	            value: function render() {
	                var itemsPerPage = Math.ceil(this.props.height / this.props.itemHeight) + 1;

	                var visibleItems = this._prepareVisibleItems(itemsPerPage);
	                var itemComponents = visibleItems.map(this._getItemComponent, this);
	                var contentStyle = this._getContentStyle(itemsPerPage);

	                return React.createElement(
	                    "div",
	                    { className: this._getClassNames(),
	                        onWheel: this.onWheel.bind(this),
	                        onScroll: this.onScroll.bind(this),
	                        style: { height: this.props.height } },
	                    React.createElement(
	                        "div",
	                        { className: "infinite-list-content", style: contentStyle },
	                        itemComponents
	                    )
	                );
	            }
	        }
	    });

	    return InfiniteList;
	})(React.Component);

	module.exports = InfiniteList;

	InfiniteList.propTypes = {
	    items: React.PropTypes.array.isRequired,
	    height: React.PropTypes.number.isRequired,
	    itemHeight: React.PropTypes.number.isRequired,
	    isItemLoading: React.PropTypes.func,
	    listItemClass: React.PropTypes.func,
	    loadingListItemClass: React.PropTypes.func,
	    firstVisibleItemIndex: React.PropTypes.number,
	    paging: React.PropTypes.bool,
	    itemsCount: React.PropTypes.number.isRequired

	};

	InfiniteList.defaultProps = {
	    firstVisibleItemIndex: 0,
	    isItemLoading: function () {
	        return false;
	    },
	    paging: false,
	    listItemClass: InfiniteListItem,
	    lodingListItemClass: LoadingListItem
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/

	(function () {
		'use strict';

		function classNames () {

			var classes = '';

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if ('string' === argType || 'number' === argType) {
					classes += ' ' + arg;

				} else if (Array.isArray(arg)) {
					classes += ' ' + classNames.apply(null, arg);

				} else if ('object' === argType) {
					for (var key in arg) {
						if (arg.hasOwnProperty(key) && arg[key]) {
							classes += ' ' + key;
						}
					}
				}
			}

			return classes.substr(1);
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true){
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}

	}());


/***/ }
/******/ ])
});
;