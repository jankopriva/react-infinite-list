(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["react-infinite-list"] = factory(require("React"));
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

	var InfiniteList = (function (_React$Component2) {
	    function InfiniteList(props) {
	        _classCallCheck(this, InfiniteList);

	        _get(Object.getPrototypeOf(InfiniteList.prototype), "constructor", this).call(this, props);

	        this.state = {
	            renderedStart: 0,
	            renderedEnd: this.props.numOfVisibleItems
	        };
	    }

	    _inherits(InfiniteList, _React$Component2);

	    _createClass(InfiniteList, {
	        onScroll: {
	            value: function onScroll() {
	                var scrolledPx = React.findDOMNode(this).scrollTop;

	                var visibleStart = parseInt(scrolledPx / this.props.itemHeight);
	                var visibleEnd = Math.min(visibleStart + this.props.numOfVisibleItems, this.props.items.length - 1);

	                if (visibleStart !== this.state.renderedStart) {
	                    this._showItems(visibleStart, visibleEnd);
	                }
	            }
	        },
	        renderFromStart: {
	            value: function renderFromStart() {
	                this.getDOMNode().scrollTop = 0;

	                this.setState({
	                    renderedStart: 0,
	                    renderedEnd: this.props.numOfVisibleItems
	                });
	            }
	        },
	        _showItems: {
	            value: function _showItems(visibleStart, visibleEnd) {
	                this.setState({
	                    renderedStart: visibleStart,
	                    renderedEnd: visibleEnd
	                });
	            }
	        },
	        _getListItemClass: {
	            value: function _getListItemClass(item, height) {
	                if (this.props.listItemClass) {
	                    return React.createElement(this.props.listItemClass, _extends({ key: item.id }, item, { height: height }));
	                }

	                return React.createElement(InfiniteListItem, _extends({ key: item.id }, item, { height: height }));
	            }
	        },
	        render: {
	            value: function render() {
	                var itemsToRender = {};

	                itemsToRender.top = React.createElement("div", { className: "topitem",
	                    style: { height: this.state.renderedStart * this.props.itemHeight } });

	                for (var i = this.state.renderedStart; i <= this.state.renderedEnd; i++) {
	                    var item = this.props.items[i];
	                    itemsToRender["item " + i] = this._getListItemClass(item, this.props.itemHeight);
	                }

	                return React.createElement(
	                    "div",
	                    { className: "infinite-list", onScroll: this.onScroll.bind(this),
	                        style: { height: this.props.itemHeight * this.props.numOfVisibleItems } },
	                    React.createElement(
	                        "div",
	                        { className: "infinite-list-content",
	                            style: { height: this.props.items.length * this.props.itemHeight } },
	                        React.addons.createFragment(itemsToRender)
	                    )
	                );
	            }
	        }
	    });

	    return InfiniteList;
	})(React.Component);

	module.exports = InfiniteList;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
