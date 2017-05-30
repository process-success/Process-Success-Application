(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* forms */
/*jshint ignore:start */

var Form = function (_React$Component) {
	_inherits(Form, _React$Component);

	function Form(props) {
		_classCallCheck(this, Form);

		var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

		_this.submit = _this.submit.bind(_this);
		return _this;
	}

	_createClass(Form, [{
		key: "submit",
		value: function submit(e) {
			e.preventDefault();
			this.props.submit(e);
		}
	}, {
		key: "render",
		value: function render() {
			var form = [];
			var formTypes = {
				select: function select(item) {
					var value = item.value === undefined ? "" : item.value;
					var lable = item.lable === undefined ? "" : item.lable;
					var options = item.options === undefined ? "" : item.options;
					var className = item.className === undefined ? "" : item.className;
					return React.createElement(Select, {
						key: item.key,
						className: className,
						lable: lable,
						options: options
					});
				},
				input: function input(item) {
					var type = item.type === undefined ? "text" : item.type;
					var value = item.value === undefined ? "" : item.value;
					var placeholder = item.placeholder === undefined ? "" : item.placeholder;
					var lable = item.lable === undefined ? "" : item.lable;
					var className = item.className === undefined ? "" : item.className;
					return React.createElement(Input, {
						key: item.key,
						type: type,
						value: value,
						placeholder: placeholder,
						lable: lable,
						className: className,
						inputChanged: function inputChanged(e) {
							var test;
						}
					});
				},
				lable: function lable(item) {
					return React.createElement(
						"label",
						{ key: item.lable },
						item.lable
					);
				},
				radio: function radio(item) {
					return React.createElement("div", null);
				},
				textarea: function textarea(item) {
					return React.createElement("div", null);
				},
				header: function header(item) {
					return React.createElement(
						"h3",
						{ key: item.lable },
						item.lable
					);
				}
			};
			this.props.fields.map(function (item, index) {

				form.push(formTypes[item.field](item));
			}.bind(this));
			//for(var x=0; x < this.props.feilds.length x++; )
			return React.createElement(
				"form",
				{ className: "form-horizontal" },
				React.createElement(
					"fieldset",
					null,
					form,
					this.props.children
				)
			);
		}
	}]);

	return Form;
}(React.Component);

exports.default = Form;

var Select = exports.Select = function (_React$Component2) {
	_inherits(Select, _React$Component2);

	function Select(props) {
		_classCallCheck(this, Select);

		var _this2 = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

		_this2.inputChange = _this2.inputChange.bind(_this2);

		return _this2;
	}

	_createClass(Select, [{
		key: "inputChange",
		value: function inputChange(e) {
			this.props.inputChanged();
		}
	}, {
		key: "render",
		value: function render() {
			this.value = this.props.value === undefined ? "" : this.props.value;
			this.lable = this.props.lable === undefined ? "" : this.props.lable;
			this.options = this.props.options === undefined ? "" : this.props.options;
			this.className = this.props.className === undefined ? "form-control" : "form-control" + this.props.className;
			var options = [];
			var output = "";

			this.options.map(function (item, index) {
				var group = [];
				if (item.group !== undefined) {
					item.options.map(function (innerItem, index) {
						group.push(React.createElement(
							"option",
							{ key: item.group + index },
							" ",
							innerItem,
							" "
						));
					});
					options.push(React.createElement(
						"optgroup",
						{ key: item.group, label: item.group },
						" ",
						group
					));
				} else {
					options.push(React.createElement(
						"option",
						{ key: index },
						" ",
						item,
						" "
					));
				}
				console.log(options);
			}.bind(this));

			var select = React.createElement(
				"select",
				{ className: this.className, value: this.value },
				options
			);

			if (this.props.lable !== undefined || this.props.lable == "") {
				output = React.createElement(
					"div",
					{ className: "form-group " },
					React.createElement(
						"label",
						{ className: "control-label" },
						this.props.lable
					),
					React.createElement(
						"div",
						null,
						select
					)
				);
			} else {
				output = React.createElement(
					"div",
					{ className: "form-group" },
					select
				);
			}
			return React.createElement(
				"div",
				null,
				output
			);
		}
	}]);

	return Select;
}(React.Component);

var Input = exports.Input = function (_React$Component3) {
	_inherits(Input, _React$Component3);

	function Input(props) {
		_classCallCheck(this, Input);

		var _this3 = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

		_this3.inputChange = _this3.inputChange.bind(_this3);

		return _this3;
	}

	_createClass(Input, [{
		key: "inputChange",
		value: function inputChange(e) {
			this.props.inputChanged();
		}
	}, {
		key: "render",
		value: function render() {
			this.type = this.props.type === undefined ? "text" : this.props.type;
			this.value = this.props.value === undefined ? "" : this.props.value;
			this.placeholder = this.props.placeholder === undefined ? "" : this.props.placeholder;
			this.lable = this.props.lable === undefined ? "" : this.props.lable;
			var output = "";
			this.className = this.props.className === undefined ? "form-control" : "form-control " + this.props.className;
			var input = React.createElement("input", { type: this.type, className: this.className, placeholder: this.placeholder, value: this.value });

			if (this.props.lable !== undefined || this.props.lable == "") {
				output = React.createElement(
					"div",
					{ className: "form-group " },
					React.createElement(
						"label",
						{ className: "control-label" },
						this.props.lable
					),
					React.createElement(
						"div",
						{ className: "" },
						input
					)
				);
			} else {
				output = React.createElement(
					"div",
					{ className: "form-group" },
					input
				);
			}
			return React.createElement(
				"div",
				null,
				output
			);
		}
	}]);

	return Input;
}(React.Component);

},{}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _forms = require('../../public/js/modules/utils/forms');

var _forms2 = _interopRequireDefault(_forms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*jshint ignore:start */


//const app= document.getElementById('app');
var app = $('#app')[0];

var CreateWorkorder = function (_React$Component) {
	_inherits(CreateWorkorder, _React$Component);

	function CreateWorkorder(props) {
		_classCallCheck(this, CreateWorkorder);

		return _possibleConstructorReturn(this, (CreateWorkorder.__proto__ || Object.getPrototypeOf(CreateWorkorder)).call(this, props));
	}
	//<AffixWrapper className="sticky_subnav text-center"  offset={140} height="40px"></AffixWrapper>


	_createClass(CreateWorkorder, [{
		key: 'someFunction',
		value: function someFunction() {}
	}, {
		key: 'render',
		value: function render() {
			var fields = [{
				field: "header",
				lable: "TESTING"
			}, {
				field: "input",
				onChange: this.someFunction,
				lable: "test",
				key: "type"
			}, {
				field: "lable",
				lable: "TESXSDF"
			}, {
				field: "input",
				onChange: this.someFunction,
				lable: "test2",
				key: "other"
			}, {
				field: "select",
				onChange: this.someFunction,
				lable: "test2",
				key: "groupsSelect",
				options: [{
					group: "thing",
					options: ["one", "two", "three"]
				}, {
					group: "thing2",
					options: ["one", "two", "three"]
				}]
			}, {
				field: "select",
				onChange: this.someFunction,
				lable: "test2",
				key: "normalSelect",
				options: ["one", "two", "three"]
			}];
			return React.createElement(
				'div',
				null,
				React.createElement(_forms2.default, {
					type: 'horizontal',
					fields: fields
				})
			);
		}
	}]);

	return CreateWorkorder;
}(React.Component);

(function () {
	frappe.ready(function () {
		ReactDOM.render(React.createElement(CreateWorkorder, null), app);
	});
})();

$(document).ready(function () {
	$(".table").DataTable({
		"scrollY": 300,
		"data": dataSet,
		"scrollX": true,
		"paging": false,
		"stateSave": true,
		"info": false,
		columns: [{ title: "Name" }, { title: "Position" }, { title: "Office" }, { title: "Extn." }, { title: "Start date" }, { title: "Salary" }]
	});
});

},{"../../public/js/modules/utils/forms":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdXRpbHMvZm9ybXMuanN4IiwicHJvY2Vzc19zdWNjZXNzL3d3dy9wbGF5Z3JvdW5kL1BsYXlHcm91bmQuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBOztJQUVxQixJOzs7QUFDcEIsZUFBWSxLQUFaLEVBQWtCO0FBQUE7O0FBQUEsMEdBQ1gsS0FEVzs7QUFFakIsUUFBSyxNQUFMLEdBQVksTUFBSyxNQUFMLENBQVksSUFBWixPQUFaO0FBRmlCO0FBR2pCOzs7O3lCQUNNLEMsRUFBRTtBQUNSLEtBQUUsY0FBRjtBQUNBLFFBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsQ0FBbEI7QUFDQTs7OzJCQUNPO0FBQ1AsT0FBSSxPQUFLLEVBQVQ7QUFDQSxPQUFJLFlBQVU7QUFDYixZQUFTLGdCQUFTLElBQVQsRUFBYztBQUN0QixTQUFJLFFBQVMsS0FBSyxLQUFMLEtBQWUsU0FBaEIsR0FBNkIsRUFBN0IsR0FBaUMsS0FBSyxLQUFsRDtBQUNBLFNBQUksUUFBUyxLQUFLLEtBQUwsS0FBZSxTQUFoQixHQUE2QixFQUE3QixHQUFpQyxLQUFLLEtBQWxEO0FBQ0EsU0FBSSxVQUFXLEtBQUssT0FBTCxLQUFpQixTQUFsQixHQUErQixFQUEvQixHQUFtQyxLQUFLLE9BQXREO0FBQ0EsU0FBSSxZQUFhLEtBQUssU0FBTCxLQUFtQixTQUFwQixHQUFpQyxFQUFqQyxHQUFxQyxLQUFLLFNBQTFEO0FBQ0EsWUFDQyxvQkFBQyxNQUFEO0FBQ0MsV0FBSyxLQUFLLEdBRFg7QUFFQyxpQkFBVyxTQUZaO0FBR0MsYUFBTyxLQUhSO0FBSUMsZUFBUztBQUpWLE9BREQ7QUFRQSxLQWRZO0FBZWIsV0FBUyxlQUFTLElBQVQsRUFBYztBQUN0QixTQUFJLE9B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R0MsV0FBTSxPQUhQO0FBSUMsU0FBSSxjQUpMO0FBS0MsYUFBUSxDQUNQLEtBRE8sRUFFUCxLQUZPLEVBR1AsT0FITztBQUxULElBOUNVLENBQVg7QUEwREEsVUFDQztBQUFBO0FBQUE7QUFDQTtBQUNDLFdBQUssWUFETjtBQUVDLGFBQVE7QUFGVDtBQURBLElBREQ7QUFVQTs7OztFQTdFNEIsTUFBTSxTOztBQWtGcEMsQ0FBQyxZQUFVO0FBQ1YsUUFBTyxLQUFQLENBQWEsWUFBVTtBQUN0QixXQUFTLE1BQVQsQ0FDQSxvQkFBQyxlQUFELE9BREEsRUFDb0IsR0FEcEI7QUFFQSxFQUhEO0FBS0EsQ0FORDs7QUFTQSxFQUFFLFFBQUYsRUFBWSxLQUFaLENBQWtCLFlBQVc7QUFDekIsR0FBRSxRQUFGLEVBQVksU0FBWixDQUFzQjtBQUNsQixhQUFXLEdBRE87QUFFbEIsVUFBUSxPQUZVO0FBR2xCLGFBQVcsSUFITztBQUlsQixZQUFZLEtBSk07QUFLbEIsZUFBYSxJQUxLO0FBTWxCLFVBQVksS0FOTTtBQU9aLFdBQVMsQ0FDWCxFQUFFLE9BQU8sTUFBVCxFQURXLEVBRVgsRUFBRSxPQUFPLFVBQVQsRUFGVyxFQUdYLEVBQUUsT0FBTyxRQUFULEVBSFcsRUFJWCxFQUFFLE9BQU8sT0FBVCxFQUpXLEVBS1gsRUFBRSxPQUFPLFlBQVQsRUFMVyxFQU1YLEVBQUUsT0FBTyxRQUFULEVBTlc7QUFQRyxFQUF0QjtBQWdCSCxDQWpCRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBmb3JtcyAqL1xuLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5zdWJtaXQ9dGhpcy5zdWJtaXQuYmluZCh0aGlzKTtcblx0fVxuXHRzdWJtaXQoZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMucHJvcHMuc3VibWl0KGUpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHZhciBmb3JtPVtdO1xuXHRcdHZhciBmb3JtVHlwZXM9e1xuXHRcdFx0c2VsZWN0XHQ6IGZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0XHR2YXIgdmFsdWUgPSAoaXRlbS52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0udmFsdWU7XG5cdFx0XHRcdHZhciBsYWJsZSA9IChpdGVtLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5sYWJsZTtcblx0XHRcdFx0dmFyIG9wdGlvbnMgPSAoaXRlbS5vcHRpb25zID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5vcHRpb25zO1xuXHRcdFx0XHR2YXIgY2xhc3NOYW1lID0gKGl0ZW0uY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5jbGFzc05hbWU7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PFNlbGVjdFxuXHRcdFx0XHRcdFx0a2V5PXtpdGVtLmtleX0gXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e2NsYXNzTmFtZX1cblx0XHRcdFx0XHRcdGxhYmxlPXtsYWJsZX1cblx0XHRcdFx0XHRcdG9wdGlvbnM9e29wdGlvbnN9XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0sXG5cdFx0XHRpbnB1dCBcdDogZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdHZhciB0eXBlID0gKGl0ZW0udHlwZSA9PT0gdW5kZWZpbmVkKSA/IFwidGV4dFwiOiBpdGVtLnR5cGU7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IChpdGVtLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS52YWx1ZTtcblx0XHRcdFx0dmFyIHBsYWNlaG9sZGVyID0gKGl0ZW0ucGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnBsYWNlaG9sZGVyO1xuXHRcdFx0XHR2YXIgbGFibGUgPSAoaXRlbS5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ubGFibGU7XG5cdFx0XHRcdHZhciBjbGFzc05hbWUgPSAoaXRlbS5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmNsYXNzTmFtZTtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8SW5wdXRcblx0XHRcdFx0XHRcdGtleT17aXRlbS5rZXl9IFxuXHRcdFx0XHRcdFx0dHlwZT17dHlwZX1cblx0XHRcdFx0XHRcdHZhbHVlPXt2YWx1ZX1cblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cblx0XHRcdFx0XHRcdGxhYmxlPXtsYWJsZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0aW5wdXRDaGFuZ2VkPXtmdW5jdGlvbihlKXt2YXIgdGVzdDt9fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9LFxuXHRcdFx0bGFibGUgXHQ6IGZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0XHRyZXR1cm4gKCAgXG4gICAgXHRcdFx0XHQ8bGFiZWwga2V5PXtpdGVtLmxhYmxlfSA+e2l0ZW0ubGFibGV9PC9sYWJlbD5cblxuICAgIFx0XHRcdCk7XG5cdFx0XHR9LFxuXHRcdFx0cmFkaW9cdDogZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdHJldHVybiAoPGRpdj48L2Rpdj4pO1xuXHRcdFx0fSxcblx0XHRcdHRleHRhcmVhOiBmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0cmV0dXJuICg8ZGl2PjwvZGl2Pik7XG5cdFx0XHR9LFxuXHRcdFx0aGVhZGVyOiBmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0cmV0dXJuKDxoMyBrZXk9e2l0ZW0ubGFibGV9ID57aXRlbS5sYWJsZX08L2gzPilcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5wcm9wcy5maWVsZHMubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblxuXHRcdFx0Zm9ybS5wdXNoKGZvcm1UeXBlc1tpdGVtLmZpZWxkXShpdGVtKSk7XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0XHQvL2Zvcih2YXIgeD0wOyB4IDwgdGhpcy5wcm9wcy5mZWlsZHMubGVuZ3RoIHgrKzsgKVxuXHRcdHJldHVybihcblx0XHRcdDxmb3JtIGNsYXNzTmFtZT1cImZvcm0taG9yaXpvbnRhbFwiPlxuXHRcdFx0XHQ8ZmllbGRzZXQ+XG5cdFx0XHRcdHtmb3JtfVxuXHRcdFx0XHR7IHRoaXMucHJvcHMuY2hpbGRyZW4gfVxuXHRcdFx0XHQ8L2ZpZWxkc2V0PlxuXHRcdFx0PC9mb3JtPlxuXHRcdCk7XG5cdH1cbn1cblxuXG5cbmV4cG9ydCBjbGFzcyBTZWxlY3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5pbnB1dENoYW5nZT10aGlzLmlucHV0Q2hhbmdlLmJpbmQodGhpcyk7XG5cblx0fVxuXHRpbnB1dENoYW5nZShlKXtcblx0XHR0aGlzLnByb3BzLmlucHV0Q2hhbmdlZCgpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHRoaXMudmFsdWUgPSAodGhpcy5wcm9wcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMudmFsdWU7XG5cdFx0dGhpcy5sYWJsZSA9ICh0aGlzLnByb3BzLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5sYWJsZTtcblx0XHR0aGlzLm9wdGlvbnMgPSAodGhpcy5wcm9wcy5vcHRpb25zID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5vcHRpb25zO1xuXHRcdHRoaXMuY2xhc3NOYW1lPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcImZvcm0tY29udHJvbFwiOiBcImZvcm0tY29udHJvbFwiICt0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHR2YXIgb3B0aW9ucz1bXTtcblx0XHR2YXIgb3V0cHV0PVwiXCI7XG5cblxuXHRcdHRoaXMub3B0aW9ucy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXHRcdFx0dmFyIGdyb3VwPVtdO1xuXHRcdFx0aWYoaXRlbS5ncm91cCAhPT0gdW5kZWZpbmVkKXtcblx0XHRcdFx0aXRlbS5vcHRpb25zLm1hcChmdW5jdGlvbihpbm5lckl0ZW0saW5kZXgpe1xuXHRcdFx0XHRcdGdyb3VwLnB1c2goIDxvcHRpb24ga2V5PXtpdGVtLmdyb3VwK2luZGV4fT4ge2lubmVySXRlbX0gPC9vcHRpb24+KVxuXHRcdFx0XHR9KVxuXHRcdFx0XHRvcHRpb25zLnB1c2goPG9wdGdyb3VwIGtleT17aXRlbS5ncm91cH0gbGFiZWw9e2l0ZW0uZ3JvdXB9PiB7Z3JvdXB9PC9vcHRncm91cD4pO1xuXG5cdFx0XHR9XG5cdFx0XHRlbHNle1xuXHRcdFx0XHRvcHRpb25zLnB1c2goIDxvcHRpb24ga2V5PXtpbmRleH0+IHtpdGVtfSA8L29wdGlvbj4pXG5cdFx0XHR9XG5cdFx0XHRjb25zb2xlLmxvZyhvcHRpb25zKVxuXHRcdFx0XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRcblxuXHRcdHZhciBzZWxlY3Q9KFxuXHRcdFx0PHNlbGVjdCBjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfSB2YWx1ZT17dGhpcy52YWx1ZX0+XG5cdFx0XHRcdHtvcHRpb25zfVxuXHRcdFx0PC9zZWxlY3Q+XG5cdFx0KTtcblxuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy5sYWJsZSA9PVwiXCIpe1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgXCI+XG5cdFx0ICAgIFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbFwiPnt0aGlzLnByb3BzLmxhYmxlfTwvbGFiZWw+XG5cdFx0ICAgIFx0XHQ8ZGl2PlxuXHRcdCAgICBcdFx0e3NlbGVjdH1cblx0XHQgICAgXHRcdDwvZGl2PlxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHQgICAgICBcdFx0e3NlbGVjdH1cblx0XHQgIFx0XHQ8L2Rpdj5cblx0XHQgIFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIElucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuaW5wdXRDaGFuZ2U9dGhpcy5pbnB1dENoYW5nZS5iaW5kKHRoaXMpO1xuXG5cdH1cblx0aW5wdXRDaGFuZ2UoZSl7XG5cdFx0dGhpcy5wcm9wcy5pbnB1dENoYW5nZWQoKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnR5cGUgPSAodGhpcy5wcm9wcy50eXBlID09PSB1bmRlZmluZWQpID8gXCJ0ZXh0XCI6IHRoaXMucHJvcHMudHlwZTtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMucGxhY2Vob2xkZXIgPSAodGhpcy5wcm9wcy5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXI7XG5cdFx0dGhpcy5sYWJsZSA9ICh0aGlzLnByb3BzLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5sYWJsZTtcblx0XHR2YXIgb3V0cHV0PVwiXCI7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jb250cm9sXCI6IFwiZm9ybS1jb250cm9sIFwiICt0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHR2YXIgaW5wdXQ9KCA8aW5wdXQgdHlwZT17dGhpcy50eXBlfSBjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfSBwbGFjZWhvbGRlcj17dGhpcy5wbGFjZWhvbGRlcn0gdmFsdWU9e3RoaXMudmFsdWV9IC8+KTtcblxuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy5sYWJsZSA9PVwiXCIpe1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgXCI+XG5cdFx0ICAgIFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbFwiPnt0aGlzLnByb3BzLmxhYmxlfTwvbGFiZWw+XG5cdFx0ICAgIFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIlwiPlxuXHRcdCAgICAgIFx0XHRcdHtpbnB1dH1cblx0XHQgICAgXHRcdDwvZGl2PlxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHQgICAgICBcdFx0e2lucHV0fVxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5cbiIsIi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuaW1wb3J0IEZvcm0gZnJvbSAnLi4vLi4vcHVibGljL2pzL21vZHVsZXMvdXRpbHMvZm9ybXMnXG5cblxuLy9jb25zdCBhcHA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKTtcbmNvbnN0IGFwcD0gJCgnI2FwcCcpWzBdO1xuXG5jbGFzcyBDcmVhdGVXb3Jrb3JkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdH1cblx0Ly88QWZmaXhXcmFwcGVyIGNsYXNzTmFtZT1cInN0aWNreV9zdWJuYXYgdGV4dC1jZW50ZXJcIiAgb2Zmc2V0PXsxNDB9IGhlaWdodD1cIjQwcHhcIj48L0FmZml4V3JhcHBlcj5cblx0c29tZUZ1bmN0aW9uKCl7XG5cblx0fVxuXHRyZW5kZXIoKXtcblx0XHR2YXIgZmllbGRzPVtcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJoZWFkZXJcIixcblx0XHRcdFx0bGFibGU6XCJURVNUSU5HXCJcblx0XHRcdH0sXG5cblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJpbnB1dFwiLFxuXHRcdFx0XHRvbkNoYW5nZTogdGhpcy5zb21lRnVuY3Rpb24sXG5cdFx0XHRcdGxhYmxlOlwidGVzdFwiLFxuXHRcdFx0XHRrZXk6XCJ0eXBlXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwibGFibGVcIixcblx0XHRcdFx0bGFibGU6XCJURVNYU0RGXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiaW5wdXRcIixcblx0XHRcdFx0b25DaGFuZ2U6IHRoaXMuc29tZUZ1bmN0aW9uLFxuXHRcdFx0XHRsYWJsZTpcInRlc3QyXCIsXG5cdFx0XHRcdGtleTpcIm90aGVyXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwic2VsZWN0XCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiB0aGlzLnNvbWVGdW5jdGlvbixcblx0XHRcdFx0bGFibGU6XCJ0ZXN0MlwiLFxuXHRcdFx0XHRrZXk6XCJncm91cHNTZWxlY3RcIixcblx0XHRcdFx0b3B0aW9uczpbXG5cdFx0XHRcdFx0eyBcblx0XHRcdFx0XHRcdGdyb3VwOiBcInRoaW5nXCIsXG5cdFx0XHRcdFx0XHRvcHRpb25zOiBbXG5cdFx0XHRcdFx0XHRcdFwib25lXCIsXG5cdFx0XHRcdFx0XHRcdFwidHdvXCIsXG5cdFx0XHRcdFx0XHRcdFwidGhyZWVcIlxuXHRcdFx0XHRcdFx0XVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0Z3JvdXA6IFwidGhpbmcyXCIsXG5cdFx0XHRcdFx0XHRvcHRpb25zOiBbXG5cdFx0XHRcdFx0XHRcdFwib25lXCIsXG5cdFx0XHRcdFx0XHRcdFwidHdvXCIsXG5cdFx0XHRcdFx0XHRcdFwidGhyZWVcIlxuXHRcdFx0XHRcdFx0XVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJzZWxlY3RcIixcblx0XHRcdFx0b25DaGFuZ2U6IHRoaXMuc29tZUZ1bmN0aW9uLFxuXHRcdFx0XHRsYWJsZTpcInRlc3QyXCIsXG5cdFx0XHRcdGtleTpcIm5vcm1hbFNlbGVjdFwiLFxuXHRcdFx0XHRvcHRpb25zOltcblx0XHRcdFx0XHRcIm9uZVwiLFxuXHRcdFx0XHRcdFwidHdvXCIsXG5cdFx0XHRcdFx0XCJ0aHJlZVwiXG5cdFx0XHRcdF1cblx0XHRcdH1cblx0XHRdXG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdDxGb3JtXG5cdFx0XHRcdHR5cGU9XCJob3Jpem9udGFsXCJcblx0XHRcdFx0ZmllbGRzPXtmaWVsZHN9XG5cdFx0XHQ+XG5cblx0XHRcdDwvRm9ybT5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuXG5cbihmdW5jdGlvbigpe1xuXHRmcmFwcGUucmVhZHkoZnVuY3Rpb24oKXtcblx0XHRSZWFjdERPTS5yZW5kZXIoIFxuXHRcdDxDcmVhdGVXb3Jrb3JkZXIgLz4sYXBwICk7XG5cdH0pXG5cbn0pKCk7XG5cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgJChcIi50YWJsZVwiKS5EYXRhVGFibGUoe1xuICAgICAgICBcInNjcm9sbFlcIjogMzAwLFxuICAgICAgICBcImRhdGFcIjogZGF0YVNldCxcbiAgICAgICAgXCJzY3JvbGxYXCI6IHRydWUsXG4gICAgICAgIFwicGFnaW5nXCI6ICAgZmFsc2UsXG4gICAgICAgIFwic3RhdGVTYXZlXCI6IHRydWUsXG4gICAgICAgIFwiaW5mb1wiOiAgICAgZmFsc2UsXG4gICAgICAgICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICAgIHsgdGl0bGU6IFwiTmFtZVwiIH0sXG4gICAgICAgICAgICB7IHRpdGxlOiBcIlBvc2l0aW9uXCIgfSxcbiAgICAgICAgICAgIHsgdGl0bGU6IFwiT2ZmaWNlXCIgfSxcbiAgICAgICAgICAgIHsgdGl0bGU6IFwiRXh0bi5cIiB9LFxuICAgICAgICAgICAgeyB0aXRsZTogXCJTdGFydCBkYXRlXCIgfSxcbiAgICAgICAgICAgIHsgdGl0bGU6IFwiU2FsYXJ5XCIgfVxuICAgICAgICBdXG4gICAgfSk7XG59ICk7XG5cblxuXG5cblxuIl19
