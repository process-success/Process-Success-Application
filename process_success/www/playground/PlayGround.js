(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _acordianContent = require("./acordianContent");

var _acordianContent2 = _interopRequireDefault(_acordianContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Acordian = function (_React$Component) {
	_inherits(Acordian, _React$Component);

	function Acordian(props) {
		_classCallCheck(this, Acordian);

		return _possibleConstructorReturn(this, (Acordian.__proto__ || Object.getPrototypeOf(Acordian)).call(this, props));
	}

	_createClass(Acordian, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "panel-group", id: this.props.id, role: "tablist", "aria-multiselectable": "true" },
				this.props.children
			);
		}
	}]);

	return Acordian;
}(React.Component);

exports.default = Acordian;

},{"./acordianContent":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AcordianContent = function (_React$Component) {
	_inherits(AcordianContent, _React$Component);

	function AcordianContent(props) {
		_classCallCheck(this, AcordianContent);

		var _this = _possibleConstructorReturn(this, (AcordianContent.__proto__ || Object.getPrototypeOf(AcordianContent)).call(this, props));

		_this.renderHead = _this.renderHead.bind(_this);
		return _this;
	}

	_createClass(AcordianContent, [{
		key: "renderHead",
		value: function renderHead(id) {

			return React.createElement(
				"div",
				{ className: "panel-heading",
					role: "tab",
					onClick: function () {
						console.log(id);
						$('#' + this.props.parentId + ' .acordian-content.in').not('#' + id).collapse('hide');
						$('#' + id).collapse('toggle');
					}.bind(this)
				},
				React.createElement(
					"h4",
					{ className: "panel-title" },
					React.createElement(
						"a",
						{ role: "button", "data-toggle": "collapse", "data-parent": '#' + this.props.parentId, "aria-expanded": this.props.active ? true : false },
						this.props.title
					)
				),
				this.props.extraHead
			);
		}
	}, {
		key: "render",
		value: function render() {
			var id = this.props.id;
			return React.createElement(
				"div",
				{ className: "panel panel-default" },
				this.renderHead(id),
				React.createElement(
					"div",
					{ id: id,
						className: this.props.active ? "acordian-content panel-collapse collapse in" : "acordian-content panel-collapse collapse",
						role: "tabpanel" },
					React.createElement(
						"div",
						{ className: "panel-body" },
						this.props.children
					)
				)
			);
		}
	}]);

	return AcordianContent;
}(React.Component);

exports.default = AcordianContent;

},{}],3:[function(require,module,exports){
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
				select: function (item, index) {
					var value = item.value === undefined ? "" : item.value;
					var lable = item.lable === undefined ? "" : item.lable;
					var options = item.options === undefined ? "" : item.options;
					var className = item.className === undefined ? "" : item.className;
					return React.createElement(Select, {
						key: this.props.id + index,
						className: className,
						lable: lable,
						options: options
					});
				}.bind(this),
				input: function (item, index) {
					var type = item.type === undefined ? "text" : item.type;
					var value = item.value === undefined ? "" : item.value;
					var placeholder = item.placeholder === undefined ? "" : item.placeholder;
					var lable = item.lable === undefined ? "" : item.lable;
					var className = item.className === undefined ? "" : item.className;
					return React.createElement(Input, {
						key: this.props.id + index,
						type: type,
						value: value,
						placeholder: placeholder,
						lable: lable,
						className: className,
						inputChanged: function inputChanged(e) {
							var test;
						}
					});
				}.bind(this),
				lable: function (item, index) {
					return React.createElement(
						"label",
						{ key: this.props.id + index },
						item.lable
					);
				}.bind(this),
				radio: function (item, index) {
					return React.createElement("div", null);
				}.bind(this),
				textarea: function (item, index) {
					return React.createElement("div", null);
				}.bind(this),
				header: function (item, index) {
					return React.createElement(
						"h3",
						{ key: this.props.id + index },
						item.lable
					);
				}.bind(this),
				date: function (item, index) {
					var value = item.value === undefined ? "" : item.value;
					var lable = item.lable === undefined ? "" : item.lable;
					var placeholder = item.placeholder === undefined ? "" : item.placeholder;
					var className = item.className === undefined ? "" : item.className;
					return React.createElement(DateInput, {
						key: this.props.id + index,
						value: value,
						placeholder: placeholder,
						lable: lable,
						className: className,
						inputChanged: function inputChanged(e) {
							item.onChange(e);
						}
					});
				}.bind(this),
				autoComplete: function (item, index) {
					var value = item.value === undefined ? "" : item.value;
					var lable = item.lable === undefined ? "" : item.lable;
					var placeholder = item.placeholder === undefined ? "" : item.placeholder;
					var className = item.className === undefined ? "" : item.className;
					return React.createElement(AwesompleteInput, {
						key: this.props.id + index,
						doctype: item.doctype,
						docvalue: item.docvalue,
						doclable: item.doclable,
						value: value,
						placeholder: placeholder,
						lable: lable,
						className: className,
						inputChanged: function inputChanged(e) {
							item.onChange(e);
						}
					});
				}.bind(this)
			};
			this.props.fields.map(function (item, index) {

				form.push(formTypes[item.field](item, index));
			}.bind(this));
			//for(var x=0; x < this.props.feilds.length x++; )
			var className = this.props.className === undefined ? "react-form" : "form-horizontal react-form " + this.props.className;
			return React.createElement(
				"form",
				{ className: className },
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

var DateInput = exports.DateInput = function (_React$Component4) {
	_inherits(DateInput, _React$Component4);

	function DateInput(props) {
		_classCallCheck(this, DateInput);

		var _this4 = _possibleConstructorReturn(this, (DateInput.__proto__ || Object.getPrototypeOf(DateInput)).call(this, props));

		_this4.inputChange = _this4.inputChange.bind(_this4);
		_this4.dateInit = _this4.dateInit.bind(_this4);

		return _this4;
	}

	_createClass(DateInput, [{
		key: "inputChange",
		value: function inputChange(e) {
			this.props.inputChanged();
		}
	}, {
		key: "dateInit",
		value: function dateInit() {
			$('.input-group.date .datepick').datepicker({
				todayBtn: "linked",
				orientation: "bottom right",
				autoclose: true,
				todayHighlight: true
			}).on('changeDate', function (e) {
				var event = new Event('input', { bubbles: true });
				e.target.dispatchEvent(event);
			});
		}
	}, {
		key: "render",
		value: function render() {
			this.value = this.props.value === undefined ? "" : this.props.value;
			this.placeholder = this.props.placeholder === undefined ? "" : this.props.placeholder;
			this.lable = this.props.lable === undefined ? "" : this.props.lable;
			var output = "";
			this.className = this.props.className === undefined ? "form-control datepick" : "form-control datepick " + this.props.className;
			var input = React.createElement("input", {
				ref: this.dateInit,
				type: "text",
				className: this.className,
				placeholder: this.placeholder,
				value: this.value,
				onChange: this.props.inputChanged
			});

			if (this.props.lable !== undefined || this.props.lable == "") {
				output = React.createElement(
					"div",
					{ className: "form-group" },
					React.createElement(
						"label",
						{ className: "control-label" },
						this.props.lable
					),
					React.createElement(
						"div",
						{ className: "input-group date" },
						input,
						React.createElement(
							"span",
							{ className: "input-group-addon" },
							React.createElement("i", { className: "glyphicon glyphicon-th" })
						)
					)
				);
			} else {
				output = React.createElement(
					"div",
					{ className: "form-group" },
					React.createElement(
						"div",
						{ className: "input-group date" },
						input,
						React.createElement(
							"span",
							{ className: "input-group-addon" },
							React.createElement("i", { className: "glyphicon glyphicon-th" })
						)
					)
				);
			}
			return React.createElement(
				"div",
				null,
				output
			);
		}
	}]);

	return DateInput;
}(React.Component);

var AwesompleteInput = exports.AwesompleteInput = function (_React$Component5) {
	_inherits(AwesompleteInput, _React$Component5);

	function AwesompleteInput(props) {
		_classCallCheck(this, AwesompleteInput);

		/*   Do the bind thing  */
		var _this5 = _possibleConstructorReturn(this, (AwesompleteInput.__proto__ || Object.getPrototypeOf(AwesompleteInput)).call(this, props));

		_this5.createList = _this5.createList.bind(_this5);
		_this5.docChanged = _this5.docChanged.bind(_this5);
		_this5.componentDidMount = _this5.componentDidMount.bind(_this5);
		_this5.inputChange = _this5.inputChange.bind(_this5);
		_this5.autocomplete = _this5.autocomplete.bind(_this5);
		//this.workorderObj=this.onStatusChanged.bind(this);
		/*          end          */
		_this5.itemlist = [];
		_this5.state = { itemlist: [] };
		_this5._isMounted = false;
		var args = {};
		var options = { doctype: _this5.props.doctype };
		_this5.listTool = new ps.apiTool({}, options, _this5.docChanged);
		if (_this5.listTool.items === undefined || _this5.listTool.items === 0 || _this5.listTool.items === null) {} else {
			_this5.state.list = _this5.listTool.items;
		}

		_this5.createList();
		return _this5;
	}

	_createClass(AwesompleteInput, [{
		key: "docChanged",
		value: function docChanged() {
			this.createList();
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			this._isMounted = true;
		}
	}, {
		key: "createList",
		value: function createList() {
			this.itemlist = [];
			if (this.props.doclable !== undefined && this.listTool.items !== undefined) {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = this.listTool.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var item = _step.value;

						var temp = [item[this.props.doclable], item[this.props.docvalue]];
						this.itemlist.push(temp);
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			} else if (this.listTool.items !== undefined) {
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = this.listTool.items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var _item = _step2.value;

						this.itemlist.push(_item[this.props.docvalue]);
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
			}
			if (this._isMounted) {
				//this.setState({itemlist:this.state.itemlist});
			}
			$(document).trigger('listLoad' + this.props.doctype);
		}
	}, {
		key: "autocomplete",
		value: function autocomplete(input) {
			var config = {
				minChars: 0,
				maxItems: 99,
				autoFirst: true,
				filter: Awesomplete.FILTER_STARTSWITH
			};
			if (this.props.doclable !== undefined) {
				config.item = function (item, input) {
					var d = item;
					var html = "<span>" + __(item.label) + "</span><br><span><small>" + item.value + "</small></span>";
					return $('<li></li>').data('item.autocomplete', item).html('<a><p>' + html + '</p></a>').get(0);
				};
			} else {
				config.item = function (item, input) {
					var d = item;
					var html = "<span>" + __(item) + "</span>";
					return $('<li></li>').data('item.autocomplete', item).html('<a><p>' + html + '</p></a>').get(0);
				};
			}
			this.aw = new Awesomplete(input, config);
			input.addEventListener('awesomplete-selectcomplete', this.inputChange);
			// $('#poo').focus(function(){
			// 		this.aw.open();
			// }.bind(this));
			//console.log()
			// input.target.onfocus( function() {
			// 	console.log(focus);
			// 	if (aw.ul.hasAttribute('hidden')) {
			// 		aw.open();
			// 	}
			// 	else {
			// 		aw.close();
			// 	}
			// });
			// input.addEventListener("onblur", function() {
			// 	if (aw.ul.childNodes.length === 0) {
			// 		aw.minChars = 0;
			// 		aw.evaluate();
			// 	}
			// 	else {
			// 		aw.close();
			// 	}
			// });

			this.aw.list = this.itemList;
			$(document).bind('listLoad' + this.props.doctype, function () {
				this.aw.list = this.itemlist;
			}.bind(this));
		}
	}, {
		key: "inputChange",
		value: function inputChange(e) {
			this.props.inputChanged(e);
		}
	}, {
		key: "render",
		value: function render() {
			this.type = this.props.type === undefined ? "text" : this.props.type;
			this.value = this.props.value === undefined ? "" : this.props.value;
			this.placeholder = this.props.placeholder === undefined ? "" : this.props.placeholder;
			this.lable = this.props.lable === undefined ? "" : this.props.lable;
			var output = "";
			this.className = this.props.className === undefined ? "form-control awesomplete" : "form-control awesomplete " + this.props.className;
			var input = React.createElement("input", {
				type: this.type,
				className: this.className,
				placeholder: this.placeholder,
				ref: this.autocomplete,
				onChange: this.inputChange
			});

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

	return AwesompleteInput;
}(React.Component);

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _forms = require('../../public/js/modules/utils/forms');

var _forms2 = _interopRequireDefault(_forms);

var _acordian = require('../../public/js/modules/utils/acordian');

var _acordian2 = _interopRequireDefault(_acordian);

var _acordianContent = require('../../public/js/modules/utils/acordianContent');

var _acordianContent2 = _interopRequireDefault(_acordianContent);

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
				field: "date",
				onChange: this.someFunction,
				lable: "Date",
				key: "other3"
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
			}, {
				field: "autoComplete",
				onChange: this.someFunction,
				lable: "Vineyard",
				doctype: "Vineyard",
				docvalue: "name",
				key: "autoComplete"
			}, {
				field: "autoComplete",
				onChange: this.someFunction,
				lable: "Customer",
				doctype: "Customer",
				doclable: "full_name",
				docvalue: "name",
				key: "customer"
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

var CrewDash = function (_React$Component2) {
	_inherits(CrewDash, _React$Component2);

	function CrewDash(props) {
		_classCallCheck(this, CrewDash);

		var _this2 = _possibleConstructorReturn(this, (CrewDash.__proto__ || Object.getPrototypeOf(CrewDash)).call(this, props));

		_this2.state = {
			crew: [],
			title: ''
		};
		_this2.crewChanged = _this2.crewChanged.bind(_this2);
		_this2.crewsAcordion = _this2.crewsAcordion.bind(_this2);
		_this2.crewTool = new ps.apiTool({}, { doctype: 'Crew' }, _this2.crewChanged);
		_this2.acordianId = "crew-dash-acordian";
		return _this2;
	}

	_createClass(CrewDash, [{
		key: 'crewChanged',
		value: function crewChanged() {
			console.log(this.crewTool.items);
			this.setState({ crew: this.crewTool.items });
		}
	}, {
		key: 'crewsAcordion',
		value: function crewsAcordion() {
			var output = [];
			this.state.crew.map(function (item, index) {
				output.push(React.createElement(
					_acordianContent2.default,
					{
						key: this.acordianId + index,
						id: this.acordianId + index,
						title: item.crew_name,
						active: index === 1 ? true : false,
						parentId: this.acordianId
					},
					'TESTING ',
					index
				));
			}.bind(this));
			return React.createElement(
				_acordian2.default,
				{ id: this.acordianId },
				output
			);
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				this.crewsAcordion()
			);
		}
	}]);

	return CrewDash;
}(React.Component);

exports.default = CrewDash;


var app2 = $('#app2')[0];
(function () {
	frappe.ready(function () {
		ReactDOM.render(React.createElement(CrewDash, null), app2);
	});
})();
// (function(){
// 	frappe.ready(function(){
// 		ReactDOM.render( 
// 		<Acordian id="testacordian">				
// 			<AcordianContent
// 				key="1"
// 				id="1"
// 				title="test1"
// 				active="true"
// 				parentId="testacordian" >
// 				TESTING 123

// 			</AcordianContent>
// 			<AcordianContent
// 				key="2"
// 				id="2"
// 				title="test2"
// 				parentId="testacordian" >

// 				TESTING 123q3245234562345

// 			</AcordianContent>
// 			<AcordianContent
// 				key="3"
// 				id="3"
// 				title="test3"
// 				parentId="testacordian" >

// 				TESTING 123q3245234562345

// 			</AcordianContent>
// 		</Acordian>,app2 );
// 	})

// })();

},{"../../public/js/modules/utils/acordian":1,"../../public/js/modules/utils/acordianContent":2,"../../public/js/modules/utils/forms":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdXRpbHMvYWNvcmRpYW4uanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL3V0aWxzL2Fjb3JkaWFuQ29udGVudC5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdXRpbHMvZm9ybXMuanN4IiwicHJvY2Vzc19zdWNjZXNzL3d3dy9wbGF5Z3JvdW5kL1BsYXlHcm91bmQuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0lBRXFCLFE7OztBQUNwQixtQkFBWSxLQUFaLEVBQWtCO0FBQUE7O0FBQUEsNkdBQ1gsS0FEVztBQUVqQjs7OzsyQkFDTztBQUNQLFVBQ0M7QUFBQTtBQUFBLE1BQUssV0FBVSxhQUFmLEVBQTZCLElBQUksS0FBSyxLQUFMLENBQVcsRUFBNUMsRUFBZ0QsTUFBSyxTQUFyRCxFQUErRCx3QkFBcUIsTUFBcEY7QUFDRyxTQUFLLEtBQUwsQ0FBVztBQURkLElBREQ7QUFLQTs7OztFQVZvQyxNQUFNLFM7O2tCQUF2QixROzs7Ozs7Ozs7Ozs7Ozs7OztJQ0ZBLGU7OztBQUNwQiwwQkFBWSxLQUFaLEVBQWtCO0FBQUE7O0FBQUEsZ0lBQ1gsS0FEVzs7QUFFakIsUUFBSyxVQUFMLEdBQWtCLE1BQUssVUFBTCxDQUFnQixJQUFoQixPQUFsQjtBQUZpQjtBQUdqQjs7Ozs2QkFDVSxFLEVBQUc7O0FBRWIsVUFDQztBQUFBO0FBQUEsTUFBSyxXQUFVLGVBQWY7QUFDQyxXQUFLLEtBRE47QUFFQyxjQUNDLFlBQVU7QUFDVCxjQUFRLEdBQVIsQ0FBWSxFQUFaO0FBQ0EsUUFBRSxNQUFJLEtBQUssS0FBTCxDQUFXLFFBQWYsR0FBd0IsdUJBQTFCLEVBQW1ELEdBQW5ELENBQXVELE1B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REEsRUFDYSxJQURiO0FBRUEsRUFIRDtBQUtBLENBTkQ7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBBY29yZGlhbkNvbnRlbnQgZnJvbSAnLi9hY29yZGlhbkNvbnRlbnQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjb3JkaWFuIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWdyb3VwXCIgaWQ9e3RoaXMucHJvcHMuaWR9IHJvbGU9XCJ0YWJsaXN0XCIgYXJpYS1tdWx0aXNlbGVjdGFibGU9XCJ0cnVlXCI+XG5cdFx0XHRcdHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWNvcmRpYW5Db250ZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMucmVuZGVySGVhZCA9IHRoaXMucmVuZGVySGVhZC5iaW5kKHRoaXMpO1xuXHR9XG5cdHJlbmRlckhlYWQoaWQpe1xuXG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYW5lbC1oZWFkaW5nXCIgXG5cdFx0XHRcdHJvbGU9XCJ0YWJcIiBcblx0XHRcdFx0b25DbGljaz17XG5cdFx0XHRcdFx0ZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGlkKTtcblx0XHRcdFx0XHRcdCQoJyMnK3RoaXMucHJvcHMucGFyZW50SWQrJyAuYWNvcmRpYW4tY29udGVudC5pbicpLm5vdCgnIycraWQpLmNvbGxhcHNlKCdoaWRlJyk7XG5cdFx0XHRcdFx0XHQkKCcjJytpZCkuY29sbGFwc2UoJ3RvZ2dsZScpO1xuXHRcdFx0XHRcdH0uYmluZCh0aGlzKVxuXHRcdFx0XHR9XG5cdFx0XHRcdD5cblx0XHRcdFx0PGg0IGNsYXNzTmFtZT1cInBhbmVsLXRpdGxlXCI+XG5cdFx0XHRcdFx0PGEgcm9sZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBkYXRhLXBhcmVudD17JyMnK3RoaXMucHJvcHMucGFyZW50SWR9IGFyaWEtZXhwYW5kZWQ9eyh0aGlzLnByb3BzLmFjdGl2ZSk/IHRydWU6ZmFsc2V9ICA+XG5cdFx0XHQgIFx0XHRcdHt0aGlzLnByb3BzLnRpdGxlfVxuXHRcdFx0XHRcdDwvYT5cblx0XHRcdFx0PC9oND5cblx0XHRcdFx0e3RoaXMucHJvcHMuZXh0cmFIZWFkfVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR2YXIgaWQgPXRoaXMucHJvcHMuaWQ7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFuZWwgcGFuZWwtZGVmYXVsdFwiPlxuXHRcdFx0XHR7dGhpcy5yZW5kZXJIZWFkKGlkKX1cblx0XHRcdFx0PGRpdiBpZD17aWR9IFxuXHRcdFx0XHRcdGNsYXNzTmFtZT17KHRoaXMucHJvcHMuYWN0aXZlKT8gXCJhY29yZGlhbi1jb250ZW50IHBhbmVsLWNvbGxhcHNlIGNvbGxhcHNlIGluXCI6XCJhY29yZGlhbi1jb250ZW50IHBhbmVsLWNvbGxhcHNlIGNvbGxhcHNlXCJ9IFxuXHRcdFx0XHRcdHJvbGU9XCJ0YWJwYW5lbFwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtYm9keVwiPlxuXHRcdFx0XHRcdFx0eyB0aGlzLnByb3BzLmNoaWxkcmVuIH1cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cbiAgXHRcdCk7XG5cdH1cbn1cbiIsIi8qIGZvcm1zICovXG4vKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnN1Ym1pdD10aGlzLnN1Ym1pdC5iaW5kKHRoaXMpO1xuXHR9XG5cdHN1Ym1pdChlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5wcm9wcy5zdWJtaXQoZSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dmFyIGZvcm09W107XG5cdFx0dmFyIGZvcm1UeXBlcz17XG5cdFx0XHRzZWxlY3RcdDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IChpdGVtLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS52YWx1ZTtcblx0XHRcdFx0dmFyIGxhYmxlID0gKGl0ZW0ubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmxhYmxlO1xuXHRcdFx0XHR2YXIgb3B0aW9ucyA9IChpdGVtLm9wdGlvbnMgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLm9wdGlvbnM7XG5cdFx0XHRcdHZhciBjbGFzc05hbWUgPSAoaXRlbS5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmNsYXNzTmFtZTtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8U2VsZWN0XG5cdFx0XHRcdFx0XHRrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9IFxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXtjbGFzc05hbWV9XG5cdFx0XHRcdFx0XHRsYWJsZT17bGFibGV9XG5cdFx0XHRcdFx0XHRvcHRpb25zPXtvcHRpb25zfVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRpbnB1dCBcdDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciB0eXBlID0gKGl0ZW0udHlwZSA9PT0gdW5kZWZpbmVkKSA/IFwidGV4dFwiOiBpdGVtLnR5cGU7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IChpdGVtLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS52YWx1ZTtcblx0XHRcdFx0dmFyIHBsYWNlaG9sZGVyID0gKGl0ZW0ucGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnBsYWNlaG9sZGVyO1xuXHRcdFx0XHR2YXIgbGFibGUgPSAoaXRlbS5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ubGFibGU7XG5cdFx0XHRcdHZhciBjbGFzc05hbWUgPSAoaXRlbS5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmNsYXNzTmFtZTtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8SW5wdXRcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH0gXG5cdFx0XHRcdFx0XHR0eXBlPXt0eXBlfVxuXHRcdFx0XHRcdFx0dmFsdWU9e3ZhbHVlfVxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuXHRcdFx0XHRcdFx0bGFibGU9e2xhYmxlfVxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXtjbGFzc05hbWV9XG5cdFx0XHRcdFx0XHRpbnB1dENoYW5nZWQ9e2Z1bmN0aW9uKGUpe3ZhciB0ZXN0O319XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGxhYmxlIFx0OiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0cmV0dXJuICggIFxuICAgIFx0XHRcdFx0PGxhYmVsIGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH0gPntpdGVtLmxhYmxlfTwvbGFiZWw+XG5cbiAgICBcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0cmFkaW9cdDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHJldHVybiAoPGRpdj48L2Rpdj4pO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0dGV4dGFyZWE6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHRyZXR1cm4gKDxkaXY+PC9kaXY+KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGhlYWRlcjogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHJldHVybig8aDMga2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fSA+e2l0ZW0ubGFibGV9PC9oMz4pXG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRkYXRlOiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0dmFyIHZhbHVlID0gKGl0ZW0udmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnZhbHVlO1xuXHRcdFx0XHR2YXIgbGFibGUgPSAoaXRlbS5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ubGFibGU7XG5cdFx0XHRcdHZhciBwbGFjZWhvbGRlciA9IChpdGVtLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5wbGFjZWhvbGRlcjtcblx0XHRcdFx0dmFyIGNsYXNzTmFtZSA9IChpdGVtLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uY2xhc3NOYW1lO1xuXHRcdFx0XHRyZXR1cm4oXG5cdFx0XHRcdFx0PERhdGVJbnB1dFxuXHRcdFx0XHRcdFx0a2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fSBcblx0XHRcdFx0XHRcdHZhbHVlPXt2YWx1ZX1cblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cblx0XHRcdFx0XHRcdGxhYmxlPXtsYWJsZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0aW5wdXRDaGFuZ2VkPXtmdW5jdGlvbihlKXtpdGVtLm9uQ2hhbmdlKGUpfX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0YXV0b0NvbXBsZXRlOiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0dmFyIHZhbHVlID0gKGl0ZW0udmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnZhbHVlO1xuXHRcdFx0XHR2YXIgbGFibGUgPSAoaXRlbS5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ubGFibGU7XG5cdFx0XHRcdHZhciBwbGFjZWhvbGRlciA9IChpdGVtLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5wbGFjZWhvbGRlcjtcblx0XHRcdFx0dmFyIGNsYXNzTmFtZSA9IChpdGVtLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uY2xhc3NOYW1lO1xuXHRcdFx0XHRyZXR1cm4oXG5cdFx0XHRcdFx0PEF3ZXNvbXBsZXRlSW5wdXRcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH1cblx0XHRcdFx0XHRcdGRvY3R5cGU9e2l0ZW0uZG9jdHlwZX1cblx0XHRcdFx0XHRcdGRvY3ZhbHVlPXtpdGVtLmRvY3ZhbHVlfVxuXHRcdFx0XHRcdFx0ZG9jbGFibGU9e2l0ZW0uZG9jbGFibGV9XG5cdFx0XHRcdFx0XHR2YWx1ZT17dmFsdWV9XG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG5cdFx0XHRcdFx0XHRsYWJsZT17bGFibGV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e2NsYXNzTmFtZX1cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKX19XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKVxuXHRcdH1cblx0XHR0aGlzLnByb3BzLmZpZWxkcy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXG5cdFx0XHRmb3JtLnB1c2goZm9ybVR5cGVzW2l0ZW0uZmllbGRdKGl0ZW0saW5kZXgpKTtcblx0XHR9LmJpbmQodGhpcykpO1xuXHRcdC8vZm9yKHZhciB4PTA7IHggPCB0aGlzLnByb3BzLmZlaWxkcy5sZW5ndGggeCsrOyApXG5cdFx0dmFyIGNsYXNzTmFtZSA9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwicmVhY3QtZm9ybVwiOiBcImZvcm0taG9yaXpvbnRhbCByZWFjdC1mb3JtIFwiK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHJldHVybihcblx0XHRcdDxmb3JtIGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cblx0XHRcdFx0PGZpZWxkc2V0PlxuXHRcdFx0XHR7Zm9ybX1cblx0XHRcdFx0eyB0aGlzLnByb3BzLmNoaWxkcmVuIH1cblx0XHRcdFx0PC9maWVsZHNldD5cblx0XHRcdDwvZm9ybT5cblx0XHQpO1xuXHR9XG59XG5cblxuXG5leHBvcnQgY2xhc3MgU2VsZWN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuaW5wdXRDaGFuZ2U9dGhpcy5pbnB1dENoYW5nZS5iaW5kKHRoaXMpO1xuXG5cdH1cblx0aW5wdXRDaGFuZ2UoZSl7XG5cdFx0dGhpcy5wcm9wcy5pbnB1dENoYW5nZWQoKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMubGFibGUgPSAodGhpcy5wcm9wcy5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMubGFibGU7XG5cdFx0dGhpcy5vcHRpb25zID0gKHRoaXMucHJvcHMub3B0aW9ucyA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMub3B0aW9ucztcblx0XHR0aGlzLmNsYXNzTmFtZT0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJmb3JtLWNvbnRyb2xcIjogXCJmb3JtLWNvbnRyb2xcIiArdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0dmFyIG9wdGlvbnM9W107XG5cdFx0dmFyIG91dHB1dD1cIlwiO1xuXG5cblx0XHR0aGlzLm9wdGlvbnMubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblx0XHRcdHZhciBncm91cD1bXTtcblx0XHRcdGlmKGl0ZW0uZ3JvdXAgIT09IHVuZGVmaW5lZCl7XG5cdFx0XHRcdGl0ZW0ub3B0aW9ucy5tYXAoZnVuY3Rpb24oaW5uZXJJdGVtLGluZGV4KXtcblx0XHRcdFx0XHRncm91cC5wdXNoKCA8b3B0aW9uIGtleT17aXRlbS5ncm91cCtpbmRleH0+IHtpbm5lckl0ZW19IDwvb3B0aW9uPilcblx0XHRcdFx0fSlcblx0XHRcdFx0b3B0aW9ucy5wdXNoKDxvcHRncm91cCBrZXk9e2l0ZW0uZ3JvdXB9IGxhYmVsPXtpdGVtLmdyb3VwfT4ge2dyb3VwfTwvb3B0Z3JvdXA+KTtcblxuXHRcdFx0fVxuXHRcdFx0ZWxzZXtcblx0XHRcdFx0b3B0aW9ucy5wdXNoKCA8b3B0aW9uIGtleT17aW5kZXh9PiB7aXRlbX0gPC9vcHRpb24+KVxuXHRcdFx0fVxuXG5cdFx0XHRcblx0XHR9LmJpbmQodGhpcykpO1xuXHRcdFxuXG5cdFx0dmFyIHNlbGVjdD0oXG5cdFx0XHQ8c2VsZWN0IGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9IHZhbHVlPXt0aGlzLnZhbHVlfT5cblx0XHRcdFx0e29wdGlvbnN9XG5cdFx0XHQ8L3NlbGVjdD5cblx0XHQpO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMubGFibGUgIT09IHVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLmxhYmxlID09XCJcIil7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBcIj5cblx0XHQgICAgXHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD5cblx0XHQgICAgXHRcdDxkaXY+XG5cdFx0ICAgIFx0XHR7c2VsZWN0fVxuXHRcdCAgICBcdFx0PC9kaXY+XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdCAgICAgIFx0XHR7c2VsZWN0fVxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5pbnB1dENoYW5nZT10aGlzLmlucHV0Q2hhbmdlLmJpbmQodGhpcyk7XG5cblx0fVxuXHRpbnB1dENoYW5nZShlKXtcblx0XHR0aGlzLnByb3BzLmlucHV0Q2hhbmdlZCgpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHRoaXMudHlwZSA9ICh0aGlzLnByb3BzLnR5cGUgPT09IHVuZGVmaW5lZCkgPyBcInRleHRcIjogdGhpcy5wcm9wcy50eXBlO1xuXHRcdHRoaXMudmFsdWUgPSAodGhpcy5wcm9wcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMudmFsdWU7XG5cdFx0dGhpcy5wbGFjZWhvbGRlciA9ICh0aGlzLnByb3BzLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5wbGFjZWhvbGRlcjtcblx0XHR0aGlzLmxhYmxlID0gKHRoaXMucHJvcHMubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLmxhYmxlO1xuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblx0XHR0aGlzLmNsYXNzTmFtZT0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJmb3JtLWNvbnRyb2xcIjogXCJmb3JtLWNvbnRyb2wgXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHZhciBpbnB1dD0oIDxpbnB1dCB0eXBlPXt0aGlzLnR5cGV9IGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9IHBsYWNlaG9sZGVyPXt0aGlzLnBsYWNlaG9sZGVyfSB2YWx1ZT17dGhpcy52YWx1ZX0gLz4pO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMubGFibGUgIT09IHVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLmxhYmxlID09XCJcIil7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBcIj5cblx0XHQgICAgXHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD5cblx0XHQgICAgXHRcdDxkaXYgY2xhc3NOYW1lPVwiXCI+XG5cdFx0ICAgICAgXHRcdFx0e2lucHV0fVxuXHRcdCAgICBcdFx0PC9kaXY+XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdCAgICAgIFx0XHR7aW5wdXR9XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5leHBvcnQgY2xhc3MgRGF0ZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuaW5wdXRDaGFuZ2U9dGhpcy5pbnB1dENoYW5nZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZGF0ZUluaXQ9dGhpcy5kYXRlSW5pdC5iaW5kKHRoaXMpO1xuXG5cdH1cblx0aW5wdXRDaGFuZ2UoZSl7XG5cdFx0dGhpcy5wcm9wcy5pbnB1dENoYW5nZWQoKTtcblx0fVxuXHRkYXRlSW5pdCgpe1xuXHRcdCQoJy5pbnB1dC1ncm91cC5kYXRlIC5kYXRlcGljaycpLmRhdGVwaWNrZXIoe1xuXHRcdCAgICB0b2RheUJ0bjogXCJsaW5rZWRcIixcblx0XHQgICAgb3JpZW50YXRpb246IFwiYm90dG9tIHJpZ2h0XCIsXG5cdFx0ICAgIGF1dG9jbG9zZTogdHJ1ZSxcblx0XHQgICAgdG9kYXlIaWdobGlnaHQ6IHRydWVcblx0XHR9KS5vbignY2hhbmdlRGF0ZScsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdHZhciBldmVudCA9IG5ldyBFdmVudCgnaW5wdXQnLCB7IGJ1YmJsZXM6IHRydWUgfSk7XG5cdFx0XHRlLnRhcmdldC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblx0XHR9KTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMucGxhY2Vob2xkZXIgPSAodGhpcy5wcm9wcy5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXI7XG5cdFx0dGhpcy5sYWJsZSA9ICh0aGlzLnByb3BzLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5sYWJsZTtcblx0XHR2YXIgb3V0cHV0PVwiXCI7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jb250cm9sIGRhdGVwaWNrXCI6IFwiZm9ybS1jb250cm9sIGRhdGVwaWNrIFwiICt0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHR2YXIgaW5wdXQ9KCBcblx0XHRcdDxpbnB1dFxuXHRcdFx0XHRyZWY9e3RoaXMuZGF0ZUluaXR9IFxuXHRcdFx0XHR0eXBlPVwidGV4dFwiXG5cdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9XG5cdFx0XHRcdHBsYWNlaG9sZGVyPXt0aGlzLnBsYWNlaG9sZGVyfSAgXG5cdFx0XHRcdHZhbHVlPXt0aGlzLnZhbHVlfSBcblx0XHRcdFx0b25DaGFuZ2U9e3RoaXMucHJvcHMuaW5wdXRDaGFuZ2VkfVxuXHRcdFx0XHQvPlxuXG5cdFx0KTtcblxuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy5sYWJsZSA9PVwiXCIpe1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdCAgXHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdCAgXHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWxcIj57dGhpcy5wcm9wcy5sYWJsZX08L2xhYmVsPlxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cCBkYXRlXCI+XG5cdFx0XHRcdFx0XHR7aW5wdXR9XG5cdFx0XHRcdCAgXHRcdDxzcGFuIGNsYXNzTmFtZT1cImlucHV0LWdyb3VwLWFkZG9uXCI+XG5cdFx0XHRcdCAgXHRcdFx0PGkgY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi10aFwiPjwvaT5cblx0XHRcdFx0ICBcdFx0PC9zcGFuPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHQgIFx0KTtcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdG91dHB1dCA9IChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAgZGF0ZVwiPlxuXG5cdFx0XHRcdFx0XHR7aW5wdXR9XG5cdFx0XHRcdCAgXHRcdDxzcGFuIGNsYXNzTmFtZT1cImlucHV0LWdyb3VwLWFkZG9uXCI+XG5cdFx0XHRcdCAgXHRcdFx0PGkgY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi10aFwiPjwvaT5cblx0XHRcdFx0ICBcdFx0PC9zcGFuPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5leHBvcnQgY2xhc3MgQXdlc29tcGxldGVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblxuXHRcdC8qICAgRG8gdGhlIGJpbmQgdGhpbmcgICovXG5cdFx0dGhpcy5jcmVhdGVMaXN0PXRoaXMuY3JlYXRlTGlzdC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZG9jQ2hhbmdlZD10aGlzLmRvY0NoYW5nZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLmNvbXBvbmVudERpZE1vdW50PXRoaXMuY29tcG9uZW50RGlkTW91bnQuYmluZCh0aGlzKTtcblx0XHR0aGlzLmlucHV0Q2hhbmdlPXRoaXMuaW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcblx0XHR0aGlzLmF1dG9jb21wbGV0ZT10aGlzLmF1dG9jb21wbGV0ZS5iaW5kKHRoaXMpO1xuXHRcdC8vdGhpcy53b3Jrb3JkZXJPYmo9dGhpcy5vblN0YXR1c0NoYW5nZWQuYmluZCh0aGlzKTtcblx0XHQvKiAgICAgICAgICBlbmQgICAgICAgICAgKi9cblx0XHR0aGlzLml0ZW1saXN0PVtdO1xuXHRcdHRoaXMuc3RhdGU9e2l0ZW1saXN0OltdfTtcblx0XHR0aGlzLl9pc01vdW50ZWQ9ZmFsc2U7XG5cdFx0dmFyIGFyZ3M9e307XG5cdFx0dmFyIG9wdGlvbnM9e2RvY3R5cGU6dGhpcy5wcm9wcy5kb2N0eXBlfTtcblx0XHR0aGlzLmxpc3RUb29sID0gbmV3IHBzLmFwaVRvb2woe30sIG9wdGlvbnMgLHRoaXMuZG9jQ2hhbmdlZCk7XG5cdFx0aWYgKHRoaXMubGlzdFRvb2wuaXRlbXM9PT11bmRlZmluZWQgfHx0aGlzLmxpc3RUb29sLml0ZW1zPT09IDAgfHx0aGlzLmxpc3RUb29sLml0ZW1zPT09bnVsbCApe1xuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5zdGF0ZS5saXN0PXRoaXMubGlzdFRvb2wuaXRlbXM7XG5cdFx0fVxuXG5cdFx0dGhpcy5jcmVhdGVMaXN0KCk7XG5cdH1cblx0ZG9jQ2hhbmdlZCgpe1xuXHRcdHRoaXMuY3JlYXRlTGlzdCgpO1xuXHR9XG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0dGhpcy5faXNNb3VudGVkPXRydWU7XG5cblx0fVxuXHRjcmVhdGVMaXN0KCl7XG5cdFx0dGhpcy5pdGVtbGlzdD1bXTtcblx0XHRpZiAodGhpcy5wcm9wcy5kb2NsYWJsZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMubGlzdFRvb2wuaXRlbXMgIT09IHVuZGVmaW5lZCl7XG5cdFx0XHRmb3IobGV0IGl0ZW0gb2YgdGhpcy5saXN0VG9vbC5pdGVtcyl7XG5cdFx0XHRcdHZhciB0ZW1wID1baXRlbVt0aGlzLnByb3BzLmRvY2xhYmxlXSxpdGVtW3RoaXMucHJvcHMuZG9jdmFsdWVdXTtcblx0XHRcdFx0dGhpcy5pdGVtbGlzdC5wdXNoKHRlbXApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIGlmKHRoaXMubGlzdFRvb2wuaXRlbXMgIT09IHVuZGVmaW5lZCl7XG5cdFx0XHRmb3IobGV0IGl0ZW0gb2YgdGhpcy5saXN0VG9vbC5pdGVtcyl7XG5cdFx0XHRcdHRoaXMuaXRlbWxpc3QucHVzaChpdGVtW3RoaXMucHJvcHMuZG9jdmFsdWVdKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYodGhpcy5faXNNb3VudGVkKXtcblx0XHRcdC8vdGhpcy5zZXRTdGF0ZSh7aXRlbWxpc3Q6dGhpcy5zdGF0ZS5pdGVtbGlzdH0pO1xuXHRcdH1cblx0XHQkKGRvY3VtZW50KS50cmlnZ2VyKCdsaXN0TG9hZCcgKyB0aGlzLnByb3BzLmRvY3R5cGUpO1xuXHR9XG5cblx0YXV0b2NvbXBsZXRlKGlucHV0KXtcblx0XHR2YXIgY29uZmlnPSB7XG5cdFx0XHRcdG1pbkNoYXJzOiAwLFxuXHRcdFx0XHRtYXhJdGVtczogOTksXG5cdFx0XHRcdGF1dG9GaXJzdDogdHJ1ZSxcblx0XHRcdFx0ZmlsdGVyOiBBd2Vzb21wbGV0ZS5GSUxURVJfU1RBUlRTV0lUSFxuXHRcdFx0fVxuXHRcdGlmKHRoaXMucHJvcHMuZG9jbGFibGUgIT09IHVuZGVmaW5lZCApe1xuXHRcdFx0Y29uZmlnLml0ZW09IGZ1bmN0aW9uKGl0ZW0sIGlucHV0KSB7XG5cdFx0XHRcdHZhciBkID0gaXRlbTtcblx0XHRcdFx0dmFyIGh0bWwgPSBcIjxzcGFuPlwiICsgX18oaXRlbS5sYWJlbCkrIFwiPC9zcGFuPjxicj48c3Bhbj48c21hbGw+XCIraXRlbS52YWx1ZStcIjwvc21hbGw+PC9zcGFuPlwiO1xuXHRcdFx0XHRyZXR1cm4gJCgnPGxpPjwvbGk+Jylcblx0XHRcdFx0XHQuZGF0YSgnaXRlbS5hdXRvY29tcGxldGUnLCBpdGVtKVxuXHRcdFx0XHRcdC5odG1sKCc8YT48cD4nICsgaHRtbCArICc8L3A+PC9hPicpXG5cdFx0XHRcdFx0LmdldCgwKTtcblx0XHRcdH1cblxuXHRcdH1lbHNle1xuXHRcdFx0Y29uZmlnLml0ZW09ZnVuY3Rpb24oaXRlbSwgaW5wdXQpIHtcblx0XHRcdFx0dmFyIGQgPSBpdGVtO1xuXHRcdFx0XHR2YXIgaHRtbCA9IFwiPHNwYW4+XCIgKyBfXyhpdGVtKSsgXCI8L3NwYW4+XCI7XG5cdFx0XHRcdHJldHVybiAkKCc8bGk+PC9saT4nKVxuXHRcdFx0XHRcdC5kYXRhKCdpdGVtLmF1dG9jb21wbGV0ZScsIGl0ZW0pXG5cdFx0XHRcdFx0Lmh0bWwoJzxhPjxwPicgKyBodG1sICsgJzwvcD48L2E+Jylcblx0XHRcdFx0XHQuZ2V0KDApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLmF3ID0gbmV3IEF3ZXNvbXBsZXRlKGlucHV0LGNvbmZpZyk7XG5cdFx0aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRcdCdhd2Vzb21wbGV0ZS1zZWxlY3Rjb21wbGV0ZScsXG5cdFx0XHRcdHRoaXMuaW5wdXRDaGFuZ2Vcblx0XHQpO1xuXHRcdC8vICQoJyNwb28nKS5mb2N1cyhmdW5jdGlvbigpe1xuXHRcdC8vIFx0XHR0aGlzLmF3Lm9wZW4oKTtcblx0XHQvLyB9LmJpbmQodGhpcykpO1xuXHRcdC8vY29uc29sZS5sb2coKVxuXHRcdC8vIGlucHV0LnRhcmdldC5vbmZvY3VzKCBmdW5jdGlvbigpIHtcblx0XHQvLyBcdGNvbnNvbGUubG9nKGZvY3VzKTtcblx0XHQvLyBcdGlmIChhdy51bC5oYXNBdHRyaWJ1dGUoJ2hpZGRlbicpKSB7XG5cdFx0Ly8gXHRcdGF3Lm9wZW4oKTtcblx0XHQvLyBcdH1cblx0XHQvLyBcdGVsc2Uge1xuXHRcdC8vIFx0XHRhdy5jbG9zZSgpO1xuXHRcdC8vIFx0fVxuXHRcdC8vIH0pO1xuXHRcdC8vIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJvbmJsdXJcIiwgZnVuY3Rpb24oKSB7XG5cdFx0Ly8gXHRpZiAoYXcudWwuY2hpbGROb2Rlcy5sZW5ndGggPT09IDApIHtcblx0XHQvLyBcdFx0YXcubWluQ2hhcnMgPSAwO1xuXHRcdC8vIFx0XHRhdy5ldmFsdWF0ZSgpO1xuXHRcdC8vIFx0fVxuXHRcdC8vIFx0ZWxzZSB7XG5cdFx0Ly8gXHRcdGF3LmNsb3NlKCk7XG5cdFx0Ly8gXHR9XG5cdFx0Ly8gfSk7XG5cblx0XHR0aGlzLmF3Lmxpc3Q9dGhpcy5pdGVtTGlzdDtcblx0XHQkKGRvY3VtZW50KS5iaW5kKCdsaXN0TG9hZCcgKyB0aGlzLnByb3BzLmRvY3R5cGUsZnVuY3Rpb24oKXtcblx0XHRcdHRoaXMuYXcubGlzdD10aGlzLml0ZW1saXN0O1xuXHRcdH0uYmluZCh0aGlzKSk7XG5cdH1cblx0aW5wdXRDaGFuZ2UoZSl7XG5cdFx0dGhpcy5wcm9wcy5pbnB1dENoYW5nZWQoZSk7XG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnR5cGUgPSAodGhpcy5wcm9wcy50eXBlID09PSB1bmRlZmluZWQpID8gXCJ0ZXh0XCI6IHRoaXMucHJvcHMudHlwZTtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMucGxhY2Vob2xkZXIgPSAodGhpcy5wcm9wcy5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXI7XG5cdFx0dGhpcy5sYWJsZSA9ICh0aGlzLnByb3BzLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5sYWJsZTtcblx0XHR2YXIgb3V0cHV0PVwiXCI7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jb250cm9sIGF3ZXNvbXBsZXRlXCI6IFwiZm9ybS1jb250cm9sIGF3ZXNvbXBsZXRlIFwiICt0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHR2YXIgaW5wdXQ9KCA8aW5wdXQgXG5cdFx0XHRcdFx0dHlwZT17dGhpcy50eXBlfSBcblx0XHRcdFx0XHRjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfSBcblx0XHRcdFx0XHRwbGFjZWhvbGRlcj17dGhpcy5wbGFjZWhvbGRlcn0gXG5cdFx0XHRcdFx0cmVmPXt0aGlzLmF1dG9jb21wbGV0ZX1cblx0XHQgICAgICAgICAgXHRvbkNoYW5nZT17dGhpcy5pbnB1dENoYW5nZX0gXG5cdFx0ICAgICAgICAgIC8+KTtcblxuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy5sYWJsZSA9PVwiXCIpe1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgXCI+XG5cdFx0ICAgIFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbFwiPnt0aGlzLnByb3BzLmxhYmxlfTwvbGFiZWw+XG5cdFx0ICAgIFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIlwiPlxuXHRcdCAgICAgIFx0XHRcdHtpbnB1dH1cblx0XHQgICAgXHRcdDwvZGl2PlxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHQgICAgICBcdFx0e2lucHV0fVxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5cbiIsIi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuaW1wb3J0IEZvcm0gZnJvbSAnLi4vLi4vcHVibGljL2pzL21vZHVsZXMvdXRpbHMvZm9ybXMnXG5pbXBvcnQgQWNvcmRpYW4gZnJvbSAnLi4vLi4vcHVibGljL2pzL21vZHVsZXMvdXRpbHMvYWNvcmRpYW4nXG5pbXBvcnQgQWNvcmRpYW5Db250ZW50IGZyb20gJy4uLy4uL3B1YmxpYy9qcy9tb2R1bGVzL3V0aWxzL2Fjb3JkaWFuQ29udGVudCdcblxuXG4vL2NvbnN0IGFwcD0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpO1xuY29uc3QgYXBwPSAkKCcjYXBwJylbMF07XG5cbmNsYXNzIENyZWF0ZVdvcmtvcmRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0fVxuXHQvLzxBZmZpeFdyYXBwZXIgY2xhc3NOYW1lPVwic3RpY2t5X3N1Ym5hdiB0ZXh0LWNlbnRlclwiICBvZmZzZXQ9ezE0MH0gaGVpZ2h0PVwiNDBweFwiPjwvQWZmaXhXcmFwcGVyPlxuXHRzb21lRnVuY3Rpb24oKXtcblxuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHZhciBmaWVsZHM9W1xuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImhlYWRlclwiLFxuXHRcdFx0XHRsYWJsZTpcIlRFU1RJTkdcIlxuXHRcdFx0fSxcblxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImlucHV0XCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiB0aGlzLnNvbWVGdW5jdGlvbixcblx0XHRcdFx0bGFibGU6XCJ0ZXN0XCIsXG5cdFx0XHRcdGtleTpcInR5cGVcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJsYWJsZVwiLFxuXHRcdFx0XHRsYWJsZTpcIlRFU1hTREZcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJpbnB1dFwiLFxuXHRcdFx0XHRvbkNoYW5nZTogdGhpcy5zb21lRnVuY3Rpb24sXG5cdFx0XHRcdGxhYmxlOlwidGVzdDJcIixcblx0XHRcdFx0a2V5Olwib3RoZXJcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJkYXRlXCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiB0aGlzLnNvbWVGdW5jdGlvbixcblx0XHRcdFx0bGFibGU6XCJEYXRlXCIsXG5cdFx0XHRcdGtleTpcIm90aGVyM1wiXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcInNlbGVjdFwiLFxuXHRcdFx0XHRvbkNoYW5nZTogdGhpcy5zb21lRnVuY3Rpb24sXG5cdFx0XHRcdGxhYmxlOlwidGVzdDJcIixcblx0XHRcdFx0a2V5OlwiZ3JvdXBzU2VsZWN0XCIsXG5cdFx0XHRcdG9wdGlvbnM6W1xuXHRcdFx0XHRcdHsgXG5cdFx0XHRcdFx0XHRncm91cDogXCJ0aGluZ1wiLFxuXHRcdFx0XHRcdFx0b3B0aW9uczogW1xuXHRcdFx0XHRcdFx0XHRcIm9uZVwiLFxuXHRcdFx0XHRcdFx0XHRcInR3b1wiLFxuXHRcdFx0XHRcdFx0XHRcInRocmVlXCJcblx0XHRcdFx0XHRcdF1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGdyb3VwOiBcInRoaW5nMlwiLFxuXHRcdFx0XHRcdFx0b3B0aW9uczogW1xuXHRcdFx0XHRcdFx0XHRcIm9uZVwiLFxuXHRcdFx0XHRcdFx0XHRcInR3b1wiLFxuXHRcdFx0XHRcdFx0XHRcInRocmVlXCJcblx0XHRcdFx0XHRcdF1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdF1cblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwic2VsZWN0XCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiB0aGlzLnNvbWVGdW5jdGlvbixcblx0XHRcdFx0bGFibGU6XCJ0ZXN0MlwiLFxuXHRcdFx0XHRrZXk6XCJub3JtYWxTZWxlY3RcIixcblx0XHRcdFx0b3B0aW9uczpbXG5cdFx0XHRcdFx0XCJvbmVcIixcblx0XHRcdFx0XHRcInR3b1wiLFxuXHRcdFx0XHRcdFwidGhyZWVcIlxuXHRcdFx0XHRdXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImF1dG9Db21wbGV0ZVwiLFxuXHRcdFx0XHRvbkNoYW5nZTogdGhpcy5zb21lRnVuY3Rpb24sXG5cdFx0XHRcdGxhYmxlOlwiVmluZXlhcmRcIixcblx0XHRcdFx0ZG9jdHlwZTpcIlZpbmV5YXJkXCIsXG5cdFx0XHRcdGRvY3ZhbHVlOlwibmFtZVwiLFxuXHRcdFx0XHRrZXk6XCJhdXRvQ29tcGxldGVcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJhdXRvQ29tcGxldGVcIixcblx0XHRcdFx0b25DaGFuZ2U6IHRoaXMuc29tZUZ1bmN0aW9uLFxuXHRcdFx0XHRsYWJsZTpcIkN1c3RvbWVyXCIsXG5cdFx0XHRcdGRvY3R5cGU6XCJDdXN0b21lclwiLFxuXHRcdFx0XHRkb2NsYWJsZTpcImZ1bGxfbmFtZVwiLFxuXHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIixcblx0XHRcdFx0a2V5OlwiY3VzdG9tZXJcIlxuXHRcdFx0fVxuXHRcdF1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0PEZvcm1cblx0XHRcdFx0dHlwZT1cImhvcml6b250YWxcIlxuXHRcdFx0XHRmaWVsZHM9e2ZpZWxkc31cblx0XHRcdD5cblxuXHRcdFx0PC9Gb3JtPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5cblxuKGZ1bmN0aW9uKCl7XG5cdGZyYXBwZS5yZWFkeShmdW5jdGlvbigpe1xuXHRcdFJlYWN0RE9NLnJlbmRlciggXG5cdFx0PENyZWF0ZVdvcmtvcmRlciAvPixhcHAgKTtcblx0fSlcblxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3Jld0Rhc2ggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5zdGF0ZT17XG5cdFx0XHRjcmV3OltdLFxuXHRcdFx0dGl0bGU6Jydcblx0XHR9O1xuXHRcdHRoaXMuY3Jld0NoYW5nZWQ9dGhpcy5jcmV3Q2hhbmdlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY3Jld3NBY29yZGlvbj10aGlzLmNyZXdzQWNvcmRpb24uYmluZCh0aGlzKTtcblx0XHR0aGlzLmNyZXdUb29sID0gbmV3IHBzLmFwaVRvb2woe30se2RvY3R5cGU6J0NyZXcnfSx0aGlzLmNyZXdDaGFuZ2VkKTtcblx0XHR0aGlzLmFjb3JkaWFuSWQ9XCJjcmV3LWRhc2gtYWNvcmRpYW5cIjtcblx0fVxuXG4gIFx0Y3Jld0NoYW5nZWQoKXtcbiAgXHRcdGNvbnNvbGUubG9nKHRoaXMuY3Jld1Rvb2wuaXRlbXMpO1xuXHRcdHRoaXMuc2V0U3RhdGUoe2NyZXc6dGhpcy5jcmV3VG9vbC5pdGVtc30pO1xuXHR9XG5cdGNyZXdzQWNvcmRpb24oKXtcblx0XHR2YXIgb3V0cHV0PVtdO1xuXHRcdHRoaXMuc3RhdGUuY3Jldy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXHRcdFx0b3V0cHV0LnB1c2goKFxuXHRcdFx0XHQ8QWNvcmRpYW5Db250ZW50XG5cdFx0XHRcdFx0a2V5PXt0aGlzLmFjb3JkaWFuSWQraW5kZXh9XG5cdFx0XHRcdFx0aWQ9e3RoaXMuYWNvcmRpYW5JZCtpbmRleH1cblx0XHRcdFx0XHR0aXRsZT17aXRlbS5jcmV3X25hbWV9XG5cdFx0XHRcdFx0YWN0aXZlPXsoaW5kZXg9PT0xKT90cnVlOmZhbHNlfVxuXHRcdFx0XHRcdHBhcmVudElkPXt0aGlzLmFjb3JkaWFuSWR9XG5cdFx0XHRcdD5cblx0XHRcdFx0VEVTVElORyB7aW5kZXh9XG5cblx0XHRcdFx0PC9BY29yZGlhbkNvbnRlbnQ+KSk7XHRcblx0XHR9LmJpbmQodGhpcykpO1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8QWNvcmRpYW4gaWQ9e3RoaXMuYWNvcmRpYW5JZH0+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L0Fjb3JkaWFuPlxuXHRcdCk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0cmV0dXJuKDxkaXY+e3RoaXMuY3Jld3NBY29yZGlvbigpfTwvZGl2Pik7XG5cdH1cbn1cblxuXG5jb25zdCBhcHAyPSAkKCcjYXBwMicpWzBdO1xuKGZ1bmN0aW9uKCl7XG5cdGZyYXBwZS5yZWFkeShmdW5jdGlvbigpe1xuXHRcdFJlYWN0RE9NLnJlbmRlciggXG5cdFx0PENyZXdEYXNoIC8+LGFwcDIgKTtcblx0fSlcblxufSkoKTtcbi8vIChmdW5jdGlvbigpe1xuLy8gXHRmcmFwcGUucmVhZHkoZnVuY3Rpb24oKXtcbi8vIFx0XHRSZWFjdERPTS5yZW5kZXIoIFxuLy8gXHRcdDxBY29yZGlhbiBpZD1cInRlc3RhY29yZGlhblwiPlx0XHRcdFx0XG4vLyBcdFx0XHQ8QWNvcmRpYW5Db250ZW50XG4vLyBcdFx0XHRcdGtleT1cIjFcIlxuLy8gXHRcdFx0XHRpZD1cIjFcIlxuLy8gXHRcdFx0XHR0aXRsZT1cInRlc3QxXCJcbi8vIFx0XHRcdFx0YWN0aXZlPVwidHJ1ZVwiXG4vLyBcdFx0XHRcdHBhcmVudElkPVwidGVzdGFjb3JkaWFuXCIgPlxuLy8gXHRcdFx0XHRURVNUSU5HIDEyM1xuXG4vLyBcdFx0XHQ8L0Fjb3JkaWFuQ29udGVudD5cbi8vIFx0XHRcdDxBY29yZGlhbkNvbnRlbnRcbi8vIFx0XHRcdFx0a2V5PVwiMlwiXG4vLyBcdFx0XHRcdGlkPVwiMlwiXG4vLyBcdFx0XHRcdHRpdGxlPVwidGVzdDJcIlxuLy8gXHRcdFx0XHRwYXJlbnRJZD1cInRlc3RhY29yZGlhblwiID5cblxuLy8gXHRcdFx0XHRURVNUSU5HIDEyM3EzMjQ1MjM0NTYyMzQ1XG5cbi8vIFx0XHRcdDwvQWNvcmRpYW5Db250ZW50PlxuLy8gXHRcdFx0PEFjb3JkaWFuQ29udGVudFxuLy8gXHRcdFx0XHRrZXk9XCIzXCJcbi8vIFx0XHRcdFx0aWQ9XCIzXCJcbi8vIFx0XHRcdFx0dGl0bGU9XCJ0ZXN0M1wiXG4vLyBcdFx0XHRcdHBhcmVudElkPVwidGVzdGFjb3JkaWFuXCIgPlxuXG4vLyBcdFx0XHRcdFRFU1RJTkcgMTIzcTMyNDUyMzQ1NjIzNDVcblxuLy8gXHRcdFx0PC9BY29yZGlhbkNvbnRlbnQ+XG4vLyBcdFx0PC9BY29yZGlhbj4sYXBwMiApO1xuLy8gXHR9KVxuXG4vLyB9KSgpO1xuXG5cbiJdfQ==
