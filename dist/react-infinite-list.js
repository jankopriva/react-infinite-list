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
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
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

	var InfiniteListItem = (function (_React$Component) {
	    function InfiniteListItem() {
	        _classCallCheck(this, InfiniteListItem);

	        if (_React$Component != null) {
	            _React$Component.apply(this, arguments);
	        }
	    }

	    _inherits(InfiniteListItem, _React$Component);

	    _createClass(InfiniteListItem, {
	        render: {
	            value: function render() {
	                return React.createElement(
	                    "div",
	                    { className: "infinite-list-item", style: { height: this.props.height } },
	                    this.props.title
	                );
	            }
	        }
	    });

	    return InfiniteListItem;
	})(React.Component);

	InfiniteListItem.propTypes = {
	    height: React.PropTypes.number.isRequired,
	    title: React.PropTypes.string.isRequired
	};

	var InfiniteList = (function (_React$Component2) {
	    function InfiniteList(props) {
	        _classCallCheck(this, InfiniteList);

	        _get(Object.getPrototypeOf(InfiniteList.prototype), "constructor", this).call(this, props);

	        this.state = { renderedStart: 0 };
	    }

	    _inherits(InfiniteList, _React$Component2);

	    _createClass(InfiniteList, {
	        onScroll: {
	            value: function onScroll() {
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

	                // scroll to the top when searching
	                if (itemsChanged) {
	                    React.findDOMNode(this).scrollTop = 0;
	                }

	                if (itemsChanged || heightChanged) {
	                    this._calculateVisibleItems();
	                }
	            }
	        },
	        _getItemComponent: {
	            value: function _getItemComponent(item) {
	                var ListItemComponent = this.props.listItemClass || InfiniteListItem;
	                return React.createElement(ListItemComponent, _extends({ key: item.id }, item, { height: this.props.itemHeight }));
	            }
	        },
	        render: {
	            value: function render() {
	                var renderedStart = this.state.renderedStart;var _props = this.props;
	                var items = _props.items;
	                var height = _props.height;

	                var itemHeight = _props.itemHeight;
	                // the number one guarantees there is never empty space at the end of the list
	                var numOfVisibleItems = Math.ceil(height / itemHeight) + 1;
	                var paddingHeight = renderedStart * itemHeight;
	                var totalHeight = items.length * itemHeight;

	                var visibleItems = items.slice(renderedStart, renderedStart + numOfVisibleItems);
	                var listItems = visibleItems.map(this._getItemComponent, this);

	                return React.createElement(
	                    "div",
	                    { className: "infinite-list", onScroll: this.onScroll.bind(this), style: { height: this.props.height } },
	                    React.createElement(
	                        "div",
	                        { className: "infinite-list-content", style: { height: totalHeight } },
	                        React.createElement("div", { className: "topitem", style: { height: paddingHeight }, key: "top" }),
	                        listItems
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
	    itemHeight: React.PropTypes.number.isRequired
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
