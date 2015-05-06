!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.InfiniteList=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react');

var InfiniteListItem = React.createClass({displayName: 'InfiniteListItem',
    render: function() {
        return (
            React.createElement("div", {className: "infinite-list-item", style: {height: this.props.height}}, this.props.item.title)
        );
    }
});

module.exports = React.createClass({displayName: 'exports',
    onScroll: function() {
        var scrolledPx = this.getDOMNode().scrollTop;

        var visibleStart = parseInt(scrolledPx / this.props.itemHeight);
        var visibleEnd = Math.min(visibleStart + this.props.numOfVisibleItems, this.props.items.length - 1);

        if (visibleStart !== this.state.renderedStart) {
            this._showItems(visibleStart, visibleEnd);
        }
    },

    renderFromStart: function () {
        this.getDOMNode().scrollTop = 0;

        this.setState({
            renderedStart: 0,
            renderedEnd: this.props.numOfVisibleItems
        });
    },

    _showItems: function(visibleStart, visibleEnd) {
        this.setState({
            renderedStart: visibleStart,
            renderedEnd: visibleEnd
        });
    },

    getInitialState: function() {
        return {
            renderedStart: 0,
            renderedEnd: this.props.numOfVisibleItems
        };
    },

    _getListItemClass: function(item, height) {
        if (this.props.listItemClass) {
            return React.createElement(this.props.listItemClass, {item: item, height: height});
        }

        return React.createElement(InfiniteListItem, {item: item, height: height});
    },

    render: function() {
        var itemsToRender = {};

        itemsToRender['top'] = (React.createElement("div", {className: "topitem", 
            style: {height: this.state.renderedStart * this.props.itemHeight}}));

        for (var i = this.state.renderedStart; i <= this.state.renderedEnd; i++) {
            var item = this.props.items[i];
            itemsToRender['item ' + i] = this._getListItemClass(item,
                this.props.itemHeight);
        }

        return (
            React.createElement("div", {className: "infinite-list", onScroll: this.onScroll, 
                style: {height: this.props.itemHeight * this.props.numOfVisibleItems}}, 
                React.createElement("div", {className: "infinite-list-content", 
                    style: {height: this.props.items.length * this.props.itemHeight}}, 
                    itemsToRender
                )
            )
        );
    }
});
},{"react":"react"}]},{},[1])(1)
});