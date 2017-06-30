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
					var readonly = item.readonly === undefined ? "" : item.readonly;
					var disabled = item.disabled === undefined ? "" : item.disabled;
					var required = item.required === undefined ? "" : item.required;
					return React.createElement(Select, {
						key: this.props.id + index,
						value: value,
						className: className,
						lable: lable,
						options: options,
						readonly: readonly,
						disabled: disabled,
						required: required,
						inputChanged: function inputChanged(e) {
							item.onChange(e);
						}
					});
				}.bind(this),
				input: function (item, index) {
					var type = item.type === undefined ? "text" : item.type;
					var value = item.value === undefined ? "" : item.value;
					var placeholder = item.placeholder === undefined ? "" : item.placeholder;
					var lable = item.lable === undefined ? "" : item.lable;
					var className = item.className === undefined ? "" : item.className;
					var readonly = item.readonly === undefined ? "" : item.readonly;
					var disabled = item.disabled === undefined ? "" : item.disabled;
					var required = item.required === undefined ? "" : item.required;

					return React.createElement(Input, {
						key: this.props.id + index,
						type: type,
						value: value,
						placeholder: placeholder,
						lable: lable,
						className: className,
						readonly: readonly,
						disabled: disabled,
						required: required,
						inputChanged: function inputChanged(e) {
							item.onChange(e);
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
					var readonly = item.readonly === undefined ? "" : item.readonly;
					var disabled = item.disabled === undefined ? "" : item.disabled;
					var required = item.required === undefined ? "" : item.required;
					return React.createElement(DateInput, {
						key: this.props.id + index,
						value: value,
						placeholder: placeholder,
						lable: lable,
						className: className,
						inputChanged: function inputChanged(e) {
							item.onChange(e);
						},
						readonly: readonly,
						disabled: disabled,
						required: required
					});
				}.bind(this),
				autoComplete: function (item, index) {
					var value = item.value === undefined ? "" : item.value;
					var lable = item.lable === undefined ? "" : item.lable;
					var placeholder = item.placeholder === undefined ? "" : item.placeholder;
					var className = item.className === undefined ? "" : item.className;
					var readonly = item.readonly === undefined ? "" : item.readonly;
					var disabled = item.disabled === undefined ? "" : item.disabled;
					var required = item.required === undefined ? "" : item.required;

					return React.createElement(AwesompleteInput, {
						key: this.props.id + index,
						doctype: item.doctype,
						docvalue: item.docvalue,
						doclable: item.doclable,
						value: value,
						placeholder: placeholder,
						lable: lable,
						className: className,
						readonly: readonly,
						disabled: disabled,
						required: required,
						inputChanged: function inputChanged(e) {
							item.onChange(e);
						}
					});
				}.bind(this),
				button: function (item, index) {
					var value = item.value === undefined ? "" : item.value;
					var className = item.className === undefined ? "" : item.className;
					var disabled = item.disabled === undefined ? "" : item.disabled;
					return React.createElement(Button, {
						key: this.props.id + index,
						value: value,
						className: className,
						disabled: disabled,
						onClick: function onClick(e) {
							item.onClick(e);
						}
					});
				}.bind(this)
			};
			this.props.fields.map(function (item, index) {
				if ($.isEmptyObject(item)) {} else {
					form.push(formTypes[item.field](item, index));
				}
			}.bind(this));
			//for(var x=0; x < this.props.feilds.length x++; )
			var className = this.props.className === undefined ? "react-form" : "form-horizontal react-form " + this.props.className;
			return React.createElement(
				"form",
				{ className: className },
				React.createElement(
					"fieldset",
					null,
					this.props.before,
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
			this.disabled = this.props.disabled === undefined || this.props.disabled == false || this.props.disabled == "" ? false : true;
			this.required = this.props.required === undefined || this.props.required == false || this.props.required == "" ? false : true;
			this.readonly = this.props.readonly === undefined || this.props.readonly == false || this.props.readonly == "" ? false : true;
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
				{
					className: this.className,
					value: this.value,
					onChange: this.props.inputChanged,
					disabled: this.disabled,
					readOnly: this.readonly,
					required: this.required
				},
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
			this.className = this.props.className === undefined ? "form-control" : "form-control " + this.props.className;
			this.disabled = this.props.disabled === undefined || this.props.disabled == false || this.props.disabled == "" ? false : true;
			this.required = this.props.required === undefined || this.props.required == false || this.props.required == "" ? false : true;
			this.readonly = this.props.readonly === undefined || this.props.readonly == false || this.props.readonly == "" ? false : true;
			var input = React.createElement("input", {
				type: this.type,
				className: this.className,
				placeholder: this.placeholder,
				value: this.value,
				onChange: this.props.inputChanged,
				disabled: this.disabled,
				readOnly: this.readonly,
				required: this.required
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

	return Input;
}(React.Component);

var DateInput = exports.DateInput = function (_React$Component4) {
	_inherits(DateInput, _React$Component4);

	function DateInput(props) {
		_classCallCheck(this, DateInput);

		var _this4 = _possibleConstructorReturn(this, (DateInput.__proto__ || Object.getPrototypeOf(DateInput)).call(this, props));

		_this4.dateInit = _this4.dateInit.bind(_this4);
		return _this4;
	}

	_createClass(DateInput, [{
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
			this.disabled = this.props.disabled === undefined || this.props.disabled == false || this.props.disabled == "" ? false : true;
			this.required = this.props.required === undefined || this.props.required == false || this.props.required == "" ? false : true;
			this.readonly = this.props.readonly === undefined || this.props.readonly == false || this.props.readonly == "" ? false : true;

			var output = "";
			this.className = this.props.className === undefined ? "form-control datepick" : "form-control datepick " + this.props.className;
			var input = React.createElement("input", {
				ref: this.dateInit,
				type: "text",
				className: this.className,
				placeholder: this.placeholder,
				value: this.value,
				onChange: this.props.inputChanged,
				disabled: this.disabled,
				readOnly: this.readonly,
				required: this.required
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
		_this5.componentWillUnmount = _this5.componentWillUnmount.bind(_this5);
		_this5.refCall = _this5.refCall.bind(_this5);

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
			this.autocomplete();
		}
	}, {
		key: "createList",
		value: function createList() {
			this.itemlist = [];
			//lable and value
			if (this.props.doclable !== undefined && this.listTool.items !== undefined && this.listTool.items !== null) {
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

				$(document).trigger('listLoad' + this.props.doctype);
			}
			//just lable
			else if (this.listTool.items !== undefined && this.listTool.items !== null) {
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

					$(document).trigger('listLoad' + this.props.doctype.replace(" ", ""));
				}
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			// console.log("HELLO");
			// this.aw.destroy();
			// delete this.aw;
			// console.log("TEST");
		}
	}, {
		key: "refCall",
		value: function refCall(input) {
			this.input = input;
		}
	}, {
		key: "autocomplete",
		value: function autocomplete(input) {
			input = this.input;
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

			this.aw.list = this.itemList;
			$(document).bind('listLoad' + this.props.doctype.replace(" ", ""), function () {
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
			this.disabled = this.props.disabled === undefined || this.props.disabled == false || this.props.disabled == "" ? false : true;
			this.required = this.props.required === undefined || this.props.required == false || this.props.required == "" ? false : true;
			this.readonly = this.props.readonly === undefined || this.props.readonly == false || this.props.readonly == "" ? false : true;

			var output = "";
			this.className = this.props.className === undefined ? "form-control awesomplete" : "form-control awesomplete " + this.props.className;
			var input = React.createElement("input", {
				value: this.value,

				type: this.type,
				className: this.className,
				placeholder: this.placeholder,
				ref: this.refCall,
				onChange: this.inputChange,
				disabled: this.disabled,
				readOnly: this.readonly,
				required: this.required
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

var Button = exports.Button = function (_React$Component6) {
	_inherits(Button, _React$Component6);

	function Button(props) {
		_classCallCheck(this, Button);

		return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));
	}

	_createClass(Button, [{
		key: "render",
		value: function render() {
			this.type = this.props.type === undefined ? "text" : this.props.type;
			this.value = this.props.value === undefined ? "" : this.props.value;
			this.disabled = this.props.disabled === undefined || this.props.disabled == false || this.props.disabled == "" ? false : true;
			var output = "";
			this.className = this.props.className === undefined ? "btn" : "btn " + this.props.className;
			var input = React.createElement(
				"button",
				{
					type: this.type,
					className: this.className,
					value: this.value,
					onClick: this.props.onClick,
					disabled: this.disabled
				},
				this.value
			);

			output = React.createElement(
				"div",
				{ className: "form-group" },
				input
			);

			return React.createElement(
				"div",
				null,
				output
			);
		}
	}]);

	return Button;
}(React.Component);

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*jshint ignore:start */

var Modal = function (_React$Component) {
	_inherits(Modal, _React$Component);

	function Modal(props) {
		_classCallCheck(this, Modal);

		var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

		_this.submit = _this.submit.bind(_this);
		return _this;
	}

	_createClass(Modal, [{
		key: "submit",
		value: function submit(e) {
			e.preventDefault();
			this.props.submit(e);
		}
	}, {
		key: "render",
		value: function render() {
			var footer = "";
			if (this.props.submit !== false) {
				footer = React.createElement(
					"div",
					{ className: "modal-footer" },
					React.createElement(
						"button",
						{ type: "button", className: "btn btn-secondary", "data-dismiss": "modal" },
						"Close"
					),
					React.createElement(
						"button",
						{
							type: "submit",
							onClick: this.submit,
							className: "btn btn-primary" },
						this.props.submitText
					)
				);
			}
			return React.createElement(
				"div",
				{ className: "modal fade text-left panel-default", id: this.props.id, tabIndex: "-1", role: "dialog", "aria-labelledby": "exampleModalLabel", "aria-hidden": "true" },
				React.createElement(
					"div",
					{ className: "modal-dialog", role: "document" },
					React.createElement(
						"div",
						{ className: "modal-content" },
						React.createElement(
							"div",
							{ className: "modal-header" },
							React.createElement(
								"h4",
								{ className: "modal-title", id: "exampleModalLabel" },
								this.props.title
							),
							React.createElement(
								"button",
								{ type: "button", display: "none", className: "close hide", "data-dismiss": "modal", "aria-label": "Close" },
								React.createElement(
									"span",
									{ "aria-hidden": "true" },
									"\xD7"
								)
							)
						),
						React.createElement(
							"div",
							{ className: "modal-body" },
							this.props.children
						),
						footer
					)
				)
			);
		}
	}]);

	return Modal;
}(React.Component);

exports.default = Modal;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = function (_React$Component) {
	_inherits(Table, _React$Component);

	function Table(props) {
		_classCallCheck(this, Table);

		var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

		_this.initTable = _this.initTable.bind(_this);
		_this.componentDidUpdate = _this.componentDidUpdate.bind(_this);
		_this.componentWillUpdate = _this.componentWillUpdate.bind(_this);

		return _this;
	}

	_createClass(Table, [{
		key: "initTable",
		value: function initTable() {
			//
			// if(this.table !== undefined){
			// 	this.table.destroy();
			// }
			console.log(this.props.content);
			this.table = $("#" + this.props.id).DataTable({
				"destroy": true,
				"scrollY": '70vh',
				"scrollCollapse": true,
				"scrollX": true,
				"paging": false,
				"stateSave": true,
				"columns": this.props.columns,
				"info": false
			});
		}
	}, {
		key: "componentWillUpdate",
		value: function componentWillUpdate() {

			if (this.table !== undefined) {
				console.log("DESTROY");
				this.table.destroy();
			}
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate() {
			this.initTable();
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"table",
				{
					className: "stripe table table-bordered ps-list-table",
					width: "100%",
					id: this.props.id
				},
				this.props.content
			);
		}
	}]);

	return Table;
}(React.Component);

exports.default = Table;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SprayFormModal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _table = require('../utils/table');

var _table2 = _interopRequireDefault(_table);

var _forms = require('../utils/forms');

var _forms2 = _interopRequireDefault(_forms);

var _modal = require('../utils/modal');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SprayTable = function (_React$Component) {
	_inherits(SprayTable, _React$Component);

	function SprayTable(props) {
		_classCallCheck(this, SprayTable);

		var _this = _possibleConstructorReturn(this, (SprayTable.__proto__ || Object.getPrototypeOf(SprayTable)).call(this, props));

		_this.state = {
			spraying: []
		};
		_this.sprayChange = _this.sprayChange.bind(_this);
		_this.returnContent = _this.returnContent.bind(_this);
		_this.createSprayEntry = _this.createSprayEntry.bind(_this);

		_this.sprayTool = new ps.apiTool(_this.props.filter, { doctype: 'Spraying' }, _this.sprayChange);
		return _this;
	}

	_createClass(SprayTable, [{
		key: 'sprayChange',
		value: function sprayChange() {
			console.log(this.sprayTool.items);
			this.setState({ spraying: this.sprayTool.items });
		}
	}, {
		key: 'returnColumns',
		value: function returnColumns() {
			return [{ title: "Vineyard" }, { title: "Season" }, { title: "Date" }, { title: "Spray Type" }, { title: "Quantity" }];
		}
	}, {
		key: 'returnContent',
		value: function returnContent() {
			var content = [];
			if (this.state.spraying !== null) {
				this.state.spraying.map(function (item, index) {
					content.push(React.createElement(
						'tr',
						{ key: index },
						React.createElement(
							'td',
							null,
							item.vineyard
						),
						React.createElement(
							'td',
							null,
							item.season
						),
						React.createElement(
							'td',
							null,
							item.date
						),
						React.createElement(
							'td',
							null,
							item.spray_type
						),
						React.createElement(
							'td',
							null,
							item.quantity
						)
					));
				}.bind(this));
			}

			return React.createElement(
				'tbody',
				null,
				content
			);
		}
	}, {
		key: 'createSprayEntry',
		value: function createSprayEntry(item) {
			console.log("Creating");
			item.date = moment(item.date, "MM/DD/YYYY").format('YYYY-MM-DD');
			this.sprayTool.create(item, function (item) {
				ps.successAlert("Spreying Entry " + item.name + " created.");
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var columns = this.returnColumns();
			var content = this.returnContent();
			console.log(columns);
			return React.createElement(
				'div',
				null,
				React.createElement(_table2.default, {
					id: 'sprayTable',
					title: 'Spray Table',
					content: content,
					columns: columns
				}),
				React.createElement(SprayFormModal, {
					id: 'createSprayEntry',
					createSprayEntry: this.createSprayEntry
				})
			);
		}
	}]);

	return SprayTable;
}(React.Component);

exports.default = SprayTable;

var SprayFormModal = exports.SprayFormModal = function (_React$Component2) {
	_inherits(SprayFormModal, _React$Component2);

	function SprayFormModal(props) {
		_classCallCheck(this, SprayFormModal);

		var _this2 = _possibleConstructorReturn(this, (SprayFormModal.__proto__ || Object.getPrototypeOf(SprayFormModal)).call(this, props));

		_this2.submit = _this2.submit.bind(_this2);
		_this2.state = {
			vineyard: "",
			season: "",
			date: moment().format("MM/DD/YYYY"),
			sprayType: "",
			quantity: 0
		};
		return _this2;
	}

	_createClass(SprayFormModal, [{
		key: 'submit',
		value: function submit(e) {
			if (this.state.vineyard == "" || this.state.spray_type == "" || moment(this.state.date, "MM/DD/YYYY").isValid() !== true) {
				console.log("not valid");
			} else {
				var copy = ps.clone(this.state);
				$('#' + this.props.id).modal('hide');
				this.state = {
					vineyard: "",
					season: "",
					date: moment().format("MM/DD/YYYY"),
					spray_type: "",
					quantity: 0
				};
				this.setState(this.state);
				console.log("IN SUBMIT");
				this.props.createSprayEntry(copy);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var fields = [{
				field: "autoComplete",
				onChange: function (e) {
					this.setState({ vineyard: e.target.value });
				}.bind(this),
				value: this.state.vineyard,
				required: true,
				lable: "Vineyard",
				doctype: "Vineyard",
				docvalue: "name"
			}, {
				field: "autoComplete",
				onChange: function (e) {
					this.setState({ season: e.target.value });
				}.bind(this),
				value: this.state.season,
				required: true,
				lable: "Season",
				doctype: "Season",
				docvalue: "name"
			}, {
				field: "date",
				required: true,
				onChange: function (e) {
					this.setState({ date: e.target.value });
				}.bind(this),
				value: this.state.date,
				lable: "Date"
			}, {
				field: "autoComplete",
				onChange: function (e) {
					this.setState({ spray_type: e.target.value });
				}.bind(this),
				value: this.state.spray_type,
				required: true,
				lable: "Spray Type",
				doctype: "Spray Type",
				docvalue: "name"
			}, {
				field: "input",
				className: "vineyard-input",
				type: "number",
				onChange: function (e) {
					this.setState({ quantity: e.target.value });
				}.bind(this),
				value: this.state.quantity,
				lable: "quantity"
			}, {
				field: "button",
				type: "submit",
				value: "Create Spraying Entry",
				className: "btn-primary pull-right",
				onClick: this.submit
			}];
			return React.createElement(
				'div',
				null,
				React.createElement('br', null),
				React.createElement(
					'a',
					{
						href: '#',
						className: 'btn btn-primary',
						onClick: function () {
							$('#' + this.props.id).modal();
						}.bind(this)
					},
					React.createElement('span', { className: 'glyphicon glyphicon-plus' }),
					' Create Spraying Entry'
				),
				React.createElement(
					_modal2.default,
					{
						id: this.props.id,
						submitText: 'Submit',
						title: 'Create New Spraying Entry',
						submit: false
					},
					React.createElement(_forms2.default, {
						id: 'CreateSprayingEntryForm',
						type: 'horizontal',
						fields: fields

					})
				)
			);
		}
	}]);

	return SprayFormModal;
}(React.Component);

},{"../utils/forms":3,"../utils/modal":4,"../utils/table":5}],7:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _forms = require('../../public/js/modules/utils/forms');

var _forms2 = _interopRequireDefault(_forms);

var _acordian = require('../../public/js/modules/utils/acordian');

var _acordian2 = _interopRequireDefault(_acordian);

var _acordianContent = require('../../public/js/modules/utils/acordianContent');

var _acordianContent2 = _interopRequireDefault(_acordianContent);

var _sprayTable = require('../../public/js/modules/vineyard/sprayTable');

var _sprayTable2 = _interopRequireDefault(_sprayTable);

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

var app2 = $('#app2')[0];
(function () {
	var filter = {};
	frappe.ready(function () {
		ReactDOM.render(React.createElement(_sprayTable2.default, { filter: filter }), app2);
	});
})();

},{"../../public/js/modules/utils/acordian":1,"../../public/js/modules/utils/acordianContent":2,"../../public/js/modules/utils/forms":3,"../../public/js/modules/vineyard/sprayTable":6}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdXRpbHMvYWNvcmRpYW4uanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL3V0aWxzL2Fjb3JkaWFuQ29udGVudC5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdXRpbHMvZm9ybXMuanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL3V0aWxzL21vZGFsLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy91dGlscy90YWJsZS5qcyIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy92aW5leWFyZC9zcHJheVRhYmxlLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy93d3cvcGxheWdyb3VuZC9QbGF5R3JvdW5kLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztJQUVxQixROzs7QUFDcEIsbUJBQVksS0FBWixFQUFrQjtBQUFBOztBQUFBLDZHQUNYLEtBRFc7QUFFakI7Ozs7MkJBQ087QUFDUCxVQUNDO0FBQUE7QUFBQSxNQUFLLFdBQVUsYUFBZixFQUE2QixJQUFJLEtBQUssS0FBTCxDQUFXLEVBQTVDLEVBQWdELE1BQUssU0FBckQsRUFBK0Qsd0JBQXFCLE1BQXBGO0FBQ0csU0FBSyxLQUFMLENBQVc7QUFEZCxJQUREO0FBS0E7Ozs7RUFWb0MsTUFBTSxTOztrQkFBdkIsUTs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNGQSxlOzs7QUFDcEIsMEJBQVksS0FBWixFQUFrQjtBQUFBOztBQUFBLGdJQUNYLEtBRFc7O0FBRWpCLFFBQUssVUFBTCxHQUFrQixNQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsT0FBbEI7QUFGaUI7QUFHakI7Ozs7NkJBQ1UsRSxF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LFlBQVU7QUFDVixLQUFJLFNBQU8sRUFBWDtBQUNBLFFBQU8sS0FBUCxDQUFhLFlBQVU7QUFDdEIsV0FBUyxNQUFULENBQWlCLDRDQUFZLFFBQVEsTUFBcEIsR0FBakIsRUFBa0QsSUFBbEQ7QUFDQSxFQUZEO0FBSUEsQ0FORCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgQWNvcmRpYW5Db250ZW50IGZyb20gJy4vYWNvcmRpYW5Db250ZW50J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY29yZGlhbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYW5lbC1ncm91cFwiIGlkPXt0aGlzLnByb3BzLmlkfSByb2xlPVwidGFibGlzdFwiIGFyaWEtbXVsdGlzZWxlY3RhYmxlPVwidHJ1ZVwiPlxuXHRcdFx0XHR7IHRoaXMucHJvcHMuY2hpbGRyZW4gfVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjb3JkaWFuQ29udGVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnJlbmRlckhlYWQgPSB0aGlzLnJlbmRlckhlYWQuYmluZCh0aGlzKTtcblx0fVxuXHRyZW5kZXJIZWFkKGlkKXtcblxuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtaGVhZGluZ1wiIFxuXHRcdFx0XHRyb2xlPVwidGFiXCIgXG5cdFx0XHRcdG9uQ2xpY2s9e1xuXHRcdFx0XHRcdGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhpZCk7XG5cdFx0XHRcdFx0XHQkKCcjJyt0aGlzLnByb3BzLnBhcmVudElkKycgLmFjb3JkaWFuLWNvbnRlbnQuaW4nKS5ub3QoJyMnK2lkKS5jb2xsYXBzZSgnaGlkZScpO1xuXHRcdFx0XHRcdFx0JCgnIycraWQpLmNvbGxhcHNlKCd0b2dnbGUnKTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcylcblx0XHRcdFx0fVxuXHRcdFx0XHQ+XG5cdFx0XHRcdDxoNCBjbGFzc05hbWU9XCJwYW5lbC10aXRsZVwiPlxuXHRcdFx0XHRcdDxhIHJvbGU9XCJidXR0b25cIiBkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCIgZGF0YS1wYXJlbnQ9eycjJyt0aGlzLnByb3BzLnBhcmVudElkfSBhcmlhLWV4cGFuZGVkPXsodGhpcy5wcm9wcy5hY3RpdmUpPyB0cnVlOmZhbHNlfSAgPlxuXHRcdFx0ICBcdFx0XHR7dGhpcy5wcm9wcy50aXRsZX1cblx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdDwvaDQ+XG5cdFx0XHRcdHt0aGlzLnByb3BzLmV4dHJhSGVhZH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dmFyIGlkID10aGlzLnByb3BzLmlkO1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsIHBhbmVsLWRlZmF1bHRcIj5cblx0XHRcdFx0e3RoaXMucmVuZGVySGVhZChpZCl9XG5cdFx0XHRcdDxkaXYgaWQ9e2lkfSBcblx0XHRcdFx0XHRjbGFzc05hbWU9eyh0aGlzLnByb3BzLmFjdGl2ZSk/IFwiYWNvcmRpYW4tY29udGVudCBwYW5lbC1jb2xsYXBzZSBjb2xsYXBzZSBpblwiOlwiYWNvcmRpYW4tY29udGVudCBwYW5lbC1jb2xsYXBzZSBjb2xsYXBzZVwifSBcblx0XHRcdFx0XHRyb2xlPVwidGFicGFuZWxcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWJvZHlcIj5cblx0XHRcdFx0XHRcdHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG4gIFx0XHQpO1xuXHR9XG59XG4iLCIvKiBmb3JtcyAqL1xuLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5zdWJtaXQ9dGhpcy5zdWJtaXQuYmluZCh0aGlzKTtcblx0fVxuXHRzdWJtaXQoZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMucHJvcHMuc3VibWl0KGUpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHZhciBmb3JtPVtdO1xuXHRcdHZhciBmb3JtVHlwZXM9e1xuXHRcdFx0c2VsZWN0XHQ6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHR2YXIgdmFsdWUgPSAoaXRlbS52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0udmFsdWU7XG5cdFx0XHRcdHZhciBsYWJsZSA9IChpdGVtLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5sYWJsZTtcblx0XHRcdFx0dmFyIG9wdGlvbnMgPSAoaXRlbS5vcHRpb25zID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5vcHRpb25zO1xuXHRcdFx0XHR2YXIgY2xhc3NOYW1lID0gKGl0ZW0uY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5jbGFzc05hbWU7XG5cdFx0XHRcdHZhciByZWFkb25seSA9IChpdGVtLnJlYWRvbmx5ID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5yZWFkb25seTtcblx0XHRcdFx0dmFyIGRpc2FibGVkID0gKGl0ZW0uZGlzYWJsZWQgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmRpc2FibGVkO1xuXHRcdFx0XHR2YXIgcmVxdWlyZWQgPSAoaXRlbS5yZXF1aXJlZCA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucmVxdWlyZWQ7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PFNlbGVjdFxuXHRcdFx0XHRcdFx0a2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fVxuXHRcdFx0XHRcdFx0dmFsdWU9e3ZhbHVlfVxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXtjbGFzc05hbWV9XG5cdFx0XHRcdFx0XHRsYWJsZT17bGFibGV9XG5cdFx0XHRcdFx0XHRvcHRpb25zPXtvcHRpb25zfVxuXHRcdFx0XHRcdFx0cmVhZG9ubHk9e3JlYWRvbmx5fVxuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ9e2Rpc2FibGVkfVxuXHRcdFx0XHRcdFx0cmVxdWlyZWQ9e3JlcXVpcmVkfVxuXHRcdFx0XHRcdFx0aW5wdXRDaGFuZ2VkPXtmdW5jdGlvbihlKXtpdGVtLm9uQ2hhbmdlKGUpO319XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGlucHV0IFx0OiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0dmFyIHR5cGUgPSAoaXRlbS50eXBlID09PSB1bmRlZmluZWQpID8gXCJ0ZXh0XCI6IGl0ZW0udHlwZTtcblx0XHRcdFx0dmFyIHZhbHVlID0gKGl0ZW0udmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnZhbHVlO1xuXHRcdFx0XHR2YXIgcGxhY2Vob2xkZXIgPSAoaXRlbS5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucGxhY2Vob2xkZXI7XG5cdFx0XHRcdHZhciBsYWJsZSA9IChpdGVtLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5sYWJsZTtcblx0XHRcdFx0dmFyIGNsYXNzTmFtZSA9IChpdGVtLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uY2xhc3NOYW1lO1xuXHRcdFx0XHR2YXIgcmVhZG9ubHkgPSAoaXRlbS5yZWFkb25seSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucmVhZG9ubHk7XG5cdFx0XHRcdHZhciBkaXNhYmxlZCA9IChpdGVtLmRpc2FibGVkID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5kaXNhYmxlZDtcblx0XHRcdFx0dmFyIHJlcXVpcmVkID0gKGl0ZW0ucmVxdWlyZWQgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnJlcXVpcmVkO1xuXHRcdFx0XHRcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8SW5wdXRcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH0gXG5cdFx0XHRcdFx0XHR0eXBlPXt0eXBlfVxuXHRcdFx0XHRcdFx0dmFsdWU9e3ZhbHVlfVxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuXHRcdFx0XHRcdFx0bGFibGU9e2xhYmxlfVxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXtjbGFzc05hbWV9XG5cdFx0XHRcdFx0XHRyZWFkb25seT17cmVhZG9ubHl9XG5cdFx0XHRcdFx0XHRkaXNhYmxlZD17ZGlzYWJsZWR9XG5cdFx0XHRcdFx0XHRyZXF1aXJlZD17cmVxdWlyZWR9XG5cdFx0XHRcdFx0XHRpbnB1dENoYW5nZWQ9e2Z1bmN0aW9uKGUpe2l0ZW0ub25DaGFuZ2UoZSl9fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRsYWJsZSBcdDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHJldHVybiAoICBcbiAgICBcdFx0XHRcdDxsYWJlbCBrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9ID57aXRlbS5sYWJsZX08L2xhYmVsPlxuXG4gICAgXHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdHJhZGlvXHQ6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHRyZXR1cm4gKDxkaXY+PC9kaXY+KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdHRleHRhcmVhOiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0cmV0dXJuICg8ZGl2PjwvZGl2Pik7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRoZWFkZXI6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHRyZXR1cm4oPGgzIGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH0gPntpdGVtLmxhYmxlfTwvaDM+KVxuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0ZGF0ZTogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IChpdGVtLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS52YWx1ZTtcblx0XHRcdFx0dmFyIGxhYmxlID0gKGl0ZW0ubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmxhYmxlO1xuXHRcdFx0XHR2YXIgcGxhY2Vob2xkZXIgPSAoaXRlbS5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucGxhY2Vob2xkZXI7XG5cdFx0XHRcdHZhciBjbGFzc05hbWUgPSAoaXRlbS5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmNsYXNzTmFtZTtcblx0XHRcdFx0dmFyIHJlYWRvbmx5ID0gKGl0ZW0ucmVhZG9ubHkgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnJlYWRvbmx5O1xuXHRcdFx0XHR2YXIgZGlzYWJsZWQgPSAoaXRlbS5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uZGlzYWJsZWQ7XG5cdFx0XHRcdHZhciByZXF1aXJlZCA9IChpdGVtLnJlcXVpcmVkID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5yZXF1aXJlZDtcblx0XHRcdFx0cmV0dXJuKFxuXHRcdFx0XHRcdDxEYXRlSW5wdXRcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH0gXG5cdFx0XHRcdFx0XHR2YWx1ZT17dmFsdWV9XG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG5cdFx0XHRcdFx0XHRsYWJsZT17bGFibGV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e2NsYXNzTmFtZX1cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKX19XG5cdFx0XHRcdFx0XHRyZWFkb25seT17cmVhZG9ubHl9XG5cdFx0XHRcdFx0XHRkaXNhYmxlZD17ZGlzYWJsZWR9XG5cdFx0XHRcdFx0XHRyZXF1aXJlZD17cmVxdWlyZWR9XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGF1dG9Db21wbGV0ZTogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IChpdGVtLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS52YWx1ZTtcblx0XHRcdFx0dmFyIGxhYmxlID0gKGl0ZW0ubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmxhYmxlO1xuXHRcdFx0XHR2YXIgcGxhY2Vob2xkZXIgPSAoaXRlbS5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucGxhY2Vob2xkZXI7XG5cdFx0XHRcdHZhciBjbGFzc05hbWUgPSAoaXRlbS5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmNsYXNzTmFtZTtcblx0XHRcdFx0dmFyIHJlYWRvbmx5ID0gKGl0ZW0ucmVhZG9ubHkgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnJlYWRvbmx5O1xuXHRcdFx0XHR2YXIgZGlzYWJsZWQgPSAoaXRlbS5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uZGlzYWJsZWQ7XG5cdFx0XHRcdHZhciByZXF1aXJlZCA9IChpdGVtLnJlcXVpcmVkID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5yZXF1aXJlZDtcblxuXHRcdFx0XHRyZXR1cm4oXG5cdFx0XHRcdFx0PEF3ZXNvbXBsZXRlSW5wdXRcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH1cblx0XHRcdFx0XHRcdGRvY3R5cGU9e2l0ZW0uZG9jdHlwZX1cblx0XHRcdFx0XHRcdGRvY3ZhbHVlPXtpdGVtLmRvY3ZhbHVlfVxuXHRcdFx0XHRcdFx0ZG9jbGFibGU9e2l0ZW0uZG9jbGFibGV9XG5cdFx0XHRcdFx0XHR2YWx1ZT17dmFsdWV9XG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG5cdFx0XHRcdFx0XHRsYWJsZT17bGFibGV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e2NsYXNzTmFtZX1cblx0XHRcdFx0XHRcdHJlYWRvbmx5PXtyZWFkb25seX1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXtkaXNhYmxlZH1cblx0XHRcdFx0XHRcdHJlcXVpcmVkPXtyZXF1aXJlZH1cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKX19XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGJ1dHRvbjogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IChpdGVtLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS52YWx1ZTtcblx0XHRcdFx0dmFyIGNsYXNzTmFtZSA9IChpdGVtLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uY2xhc3NOYW1lO1xuXHRcdFx0XHR2YXIgZGlzYWJsZWQgPSAoaXRlbS5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uZGlzYWJsZWQ7XG5cdFx0XHRcdHJldHVybihcblx0XHRcdFx0XHQ8QnV0dG9uXG5cdFx0XHRcdFx0XHRrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9XG5cdFx0XHRcdFx0XHR2YWx1ZT17dmFsdWV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e2NsYXNzTmFtZX1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXtkaXNhYmxlZH1cblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2Z1bmN0aW9uKGUpe2l0ZW0ub25DbGljayhlKX19XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKVxuXHRcdH1cblx0XHR0aGlzLnByb3BzLmZpZWxkcy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXHRcdFx0aWYoJC5pc0VtcHR5T2JqZWN0KGl0ZW0pKXtcblxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGZvcm0ucHVzaChmb3JtVHlwZXNbaXRlbS5maWVsZF0oaXRlbSxpbmRleCkpO1xuXHRcdFx0fVxuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0Ly9mb3IodmFyIHg9MDsgeCA8IHRoaXMucHJvcHMuZmVpbGRzLmxlbmd0aCB4Kys7IClcblx0XHR2YXIgY2xhc3NOYW1lID0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJyZWFjdC1mb3JtXCI6IFwiZm9ybS1ob3Jpem9udGFsIHJlYWN0LWZvcm0gXCIrdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGZvcm0gY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxuXHRcdFx0XHQ8ZmllbGRzZXQ+XG5cdFx0XHRcdHt0aGlzLnByb3BzLmJlZm9yZX1cblx0XHRcdFx0e2Zvcm19XG5cdFx0XHRcdHsgdGhpcy5wcm9wcy5jaGlsZHJlbn1cblx0XHRcdFx0PC9maWVsZHNldD5cblx0XHRcdDwvZm9ybT5cblx0XHQpO1xuXHR9XG59XG5cblxuXG5leHBvcnQgY2xhc3MgU2VsZWN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuaW5wdXRDaGFuZ2U9dGhpcy5pbnB1dENoYW5nZS5iaW5kKHRoaXMpO1xuXG5cdH1cblx0aW5wdXRDaGFuZ2UoZSl7XG5cdFx0dGhpcy5wcm9wcy5pbnB1dENoYW5nZWQoKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMubGFibGUgPSAodGhpcy5wcm9wcy5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMubGFibGU7XG5cdFx0dGhpcy5vcHRpb25zID0gKHRoaXMucHJvcHMub3B0aW9ucyA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMub3B0aW9ucztcblx0XHR0aGlzLmNsYXNzTmFtZT0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJmb3JtLWNvbnRyb2xcIjogXCJmb3JtLWNvbnRyb2xcIiArdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0dGhpcy5kaXNhYmxlZCA9ICh0aGlzLnByb3BzLmRpc2FibGVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PWZhbHNlfHx0aGlzLnByb3BzLmRpc2FibGVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVxdWlyZWQgPSAodGhpcy5wcm9wcy5yZXF1aXJlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1mYWxzZXx8dGhpcy5wcm9wcy5yZXF1aXJlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlYWRvbmx5ID0gKHRoaXMucHJvcHMucmVhZG9ubHkgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZWFkb25seT09ZmFsc2V8fHRoaXMucHJvcHMucmVhZG9ubHk9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dmFyIG9wdGlvbnM9W107XG5cdFx0dmFyIG91dHB1dD1cIlwiO1xuXG5cblx0XHR0aGlzLm9wdGlvbnMubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblx0XHRcdHZhciBncm91cD1bXTtcblx0XHRcdGlmKGl0ZW0uZ3JvdXAgIT09IHVuZGVmaW5lZCl7XG5cdFx0XHRcdGl0ZW0ub3B0aW9ucy5tYXAoZnVuY3Rpb24oaW5uZXJJdGVtLGluZGV4KXtcblx0XHRcdFx0XHRncm91cC5wdXNoKCA8b3B0aW9uIGtleT17aXRlbS5ncm91cCtpbmRleH0+IHtpbm5lckl0ZW19IDwvb3B0aW9uPilcblx0XHRcdFx0fSlcblx0XHRcdFx0b3B0aW9ucy5wdXNoKDxvcHRncm91cCBrZXk9e2l0ZW0uZ3JvdXB9IGxhYmVsPXtpdGVtLmdyb3VwfT4ge2dyb3VwfTwvb3B0Z3JvdXA+KTtcblxuXHRcdFx0fVxuXHRcdFx0ZWxzZXtcblx0XHRcdFx0b3B0aW9ucy5wdXNoKCA8b3B0aW9uIGtleT17aW5kZXh9PiB7aXRlbX0gPC9vcHRpb24+KVxuXHRcdFx0fVxuXG5cdFx0XHRcblx0XHR9LmJpbmQodGhpcykpO1xuXG5cdFx0dmFyIHNlbGVjdD0oXG5cdFx0XHQ8c2VsZWN0IFxuXHRcdFx0XHRjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfSBcblx0XHRcdFx0dmFsdWU9e3RoaXMudmFsdWV9IFxuXHRcdFx0XHRvbkNoYW5nZT17dGhpcy5wcm9wcy5pbnB1dENoYW5nZWR9XG5cdFx0XHRcdGRpc2FibGVkPXt0aGlzLmRpc2FibGVkfVxuXHQgICAgICAgICAgXHRyZWFkT25seT17dGhpcy5yZWFkb25seX1cblx0ICAgICAgICAgIFx0cmVxdWlyZWQ9e3RoaXMucmVxdWlyZWR9XG5cdFx0XHRcdD5cblx0XHRcdFx0e29wdGlvbnN9XG5cdFx0XHQ8L3NlbGVjdD5cblx0XHQpO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMubGFibGUgIT09IHVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLmxhYmxlID09XCJcIil7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBcIj5cblx0XHQgICAgXHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD5cblx0XHQgICAgXHRcdDxkaXY+XG5cdFx0ICAgIFx0XHR7c2VsZWN0fVxuXHRcdCAgICBcdFx0PC9kaXY+XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdCAgICAgIFx0XHR7c2VsZWN0fVxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5pbnB1dENoYW5nZT10aGlzLmlucHV0Q2hhbmdlLmJpbmQodGhpcyk7XG5cblx0fVxuXHRpbnB1dENoYW5nZShlKXtcblx0XHR0aGlzLnByb3BzLmlucHV0Q2hhbmdlZChlKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnR5cGUgPSAodGhpcy5wcm9wcy50eXBlID09PSB1bmRlZmluZWQpID8gXCJ0ZXh0XCI6IHRoaXMucHJvcHMudHlwZTtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMucGxhY2Vob2xkZXIgPSAodGhpcy5wcm9wcy5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXI7XG5cdFx0dGhpcy5sYWJsZSA9ICh0aGlzLnByb3BzLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5sYWJsZTtcblx0XHR2YXIgb3V0cHV0PVwiXCI7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jb250cm9sXCI6IFwiZm9ybS1jb250cm9sIFwiICt0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHR0aGlzLmRpc2FibGVkID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5kaXNhYmxlZD09ZmFsc2V8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZXF1aXJlZCA9ICh0aGlzLnByb3BzLnJlcXVpcmVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVxdWlyZWQ9PWZhbHNlfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVhZG9ubHkgPSAodGhpcy5wcm9wcy5yZWFkb25seSA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1mYWxzZXx8dGhpcy5wcm9wcy5yZWFkb25seT09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR2YXIgaW5wdXQ9KCBcblx0XHRcdDxpbnB1dCBcblx0XHRcdFx0dHlwZT17dGhpcy50eXBlfSBcblx0XHRcdFx0Y2xhc3NOYW1lPXt0aGlzLmNsYXNzTmFtZX0gXG5cdFx0XHRcdHBsYWNlaG9sZGVyPXt0aGlzLnBsYWNlaG9sZGVyfSBcblx0XHRcdFx0dmFsdWU9e3RoaXMudmFsdWV9XG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnByb3BzLmlucHV0Q2hhbmdlZH1cblx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdCAgICAgICAgICBcdHJlYWRPbmx5PXt0aGlzLnJlYWRvbmx5fVxuXHQgICAgICAgICAgXHRyZXF1aXJlZD17dGhpcy5yZXF1aXJlZH1cblx0XHRcdC8+XG5cdFx0KTtcblxuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy5sYWJsZSA9PVwiXCIpe1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgXCI+XG5cdFx0ICAgIFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbFwiPnt0aGlzLnByb3BzLmxhYmxlfTwvbGFiZWw+XG5cdFx0ICAgIFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIlwiPlxuXHRcdCAgICAgIFx0XHRcdHtpbnB1dH1cblx0XHQgICAgXHRcdDwvZGl2PlxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHQgICAgICBcdFx0e2lucHV0fVxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuZXhwb3J0IGNsYXNzIERhdGVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLmRhdGVJbml0PXRoaXMuZGF0ZUluaXQuYmluZCh0aGlzKTtcblx0fVxuXHRkYXRlSW5pdCgpe1xuXHRcdCQoJy5pbnB1dC1ncm91cC5kYXRlIC5kYXRlcGljaycpLmRhdGVwaWNrZXIoe1xuXHRcdCAgICB0b2RheUJ0bjogXCJsaW5rZWRcIixcblx0XHQgICAgb3JpZW50YXRpb246IFwiYm90dG9tIHJpZ2h0XCIsXG5cdFx0ICAgIGF1dG9jbG9zZTogdHJ1ZSxcblx0XHQgICAgdG9kYXlIaWdobGlnaHQ6IHRydWVcblx0XHR9KS5vbignY2hhbmdlRGF0ZScsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdHZhciBldmVudCA9IG5ldyBFdmVudCgnaW5wdXQnLCB7IGJ1YmJsZXM6IHRydWUgfSk7XG5cdFx0XHRlLnRhcmdldC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblx0XHR9KTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMucGxhY2Vob2xkZXIgPSAodGhpcy5wcm9wcy5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXI7XG5cdFx0dGhpcy5sYWJsZSA9ICh0aGlzLnByb3BzLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5sYWJsZTtcblx0XHR0aGlzLmRpc2FibGVkID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5kaXNhYmxlZD09ZmFsc2V8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZXF1aXJlZCA9ICh0aGlzLnByb3BzLnJlcXVpcmVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVxdWlyZWQ9PWZhbHNlfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVhZG9ubHkgPSAodGhpcy5wcm9wcy5yZWFkb25seSA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1mYWxzZXx8dGhpcy5wcm9wcy5yZWFkb25seT09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblxuXG5cdFx0dmFyIG91dHB1dD1cIlwiO1xuXHRcdHRoaXMuY2xhc3NOYW1lPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcImZvcm0tY29udHJvbCBkYXRlcGlja1wiOiBcImZvcm0tY29udHJvbCBkYXRlcGljayBcIiArdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0dmFyIGlucHV0PSggXG5cdFx0XHQ8aW5wdXRcblx0XHRcdFx0cmVmPXt0aGlzLmRhdGVJbml0fSBcblx0XHRcdFx0dHlwZT1cInRleHRcIlxuXHRcdFx0XHRjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfVxuXHRcdFx0XHRwbGFjZWhvbGRlcj17dGhpcy5wbGFjZWhvbGRlcn0gIFxuXHRcdFx0XHR2YWx1ZT17dGhpcy52YWx1ZX0gXG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnByb3BzLmlucHV0Q2hhbmdlZH1cblx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdCAgICAgICAgICBcdHJlYWRPbmx5PXt0aGlzLnJlYWRvbmx5fVxuXHQgICAgICAgICAgXHRyZXF1aXJlZD17dGhpcy5yZXF1aXJlZH1cblx0XHRcdFx0Lz5cblxuXHRcdCk7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkIHx8IHRoaXMucHJvcHMubGFibGUgPT1cIlwiKXtcblx0XHRcdG91dHB1dCA9IChcblx0XHQgIFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHQgIFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD5cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAgZGF0ZVwiPlxuXHRcdFx0XHRcdFx0e2lucHV0fVxuXHRcdFx0XHQgIFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cC1hZGRvblwiPlxuXHRcdFx0XHQgIFx0XHRcdDxpIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tdGhcIj48L2k+XG5cdFx0XHRcdCAgXHRcdDwvc3Bhbj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwIGRhdGVcIj5cblxuXHRcdFx0XHRcdFx0e2lucHV0fVxuXHRcdFx0XHQgIFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cC1hZGRvblwiPlxuXHRcdFx0XHQgIFx0XHRcdDxpIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tdGhcIj48L2k+XG5cdFx0XHRcdCAgXHRcdDwvc3Bhbj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuZXhwb3J0IGNsYXNzIEF3ZXNvbXBsZXRlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cblx0XHQvKiAgIERvIHRoZSBiaW5kIHRoaW5nICAqL1xuXHRcdHRoaXMuY3JlYXRlTGlzdD10aGlzLmNyZWF0ZUxpc3QuYmluZCh0aGlzKTtcblx0XHR0aGlzLmRvY0NoYW5nZWQ9dGhpcy5kb2NDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jb21wb25lbnREaWRNb3VudD10aGlzLmNvbXBvbmVudERpZE1vdW50LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5pbnB1dENoYW5nZT10aGlzLmlucHV0Q2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5hdXRvY29tcGxldGU9dGhpcy5hdXRvY29tcGxldGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmNvbXBvbmVudFdpbGxVbm1vdW50PXRoaXMuY29tcG9uZW50V2lsbFVubW91bnQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnJlZkNhbGw9dGhpcy5yZWZDYWxsLmJpbmQodGhpcyk7XG5cdFx0XG5cdFx0Ly90aGlzLndvcmtvcmRlck9iaj10aGlzLm9uU3RhdHVzQ2hhbmdlZC5iaW5kKHRoaXMpO1xuXHRcdC8qICAgICAgICAgIGVuZCAgICAgICAgICAqL1xuXHRcdHRoaXMuaXRlbWxpc3Q9W107XG5cdFx0dGhpcy5zdGF0ZT17aXRlbWxpc3Q6W119O1xuXHRcdHRoaXMuX2lzTW91bnRlZD1mYWxzZTtcblx0XHR2YXIgYXJncz17fTtcblx0XHR2YXIgb3B0aW9ucz17ZG9jdHlwZTp0aGlzLnByb3BzLmRvY3R5cGV9O1xuXHRcdHRoaXMubGlzdFRvb2wgPSBuZXcgcHMuYXBpVG9vbCh7fSwgb3B0aW9ucyAsdGhpcy5kb2NDaGFuZ2VkKTtcblx0XHRpZiAodGhpcy5saXN0VG9vbC5pdGVtcz09PXVuZGVmaW5lZCB8fHRoaXMubGlzdFRvb2wuaXRlbXM9PT0gMCB8fHRoaXMubGlzdFRvb2wuaXRlbXM9PT1udWxsICl7XG5cdFx0fWVsc2V7XG5cdFx0XHR0aGlzLnN0YXRlLmxpc3Q9dGhpcy5saXN0VG9vbC5pdGVtcztcblx0XHR9XG5cblx0XHR0aGlzLmNyZWF0ZUxpc3QoKTtcblx0fVxuXHRkb2NDaGFuZ2VkKCl7XG5cdFx0dGhpcy5jcmVhdGVMaXN0KCk7XG5cdH1cblx0Y29tcG9uZW50RGlkTW91bnQoKXtcblx0XHR0aGlzLl9pc01vdW50ZWQ9dHJ1ZTtcblx0XHR0aGlzLmF1dG9jb21wbGV0ZSgpO1xuXG5cdH1cblx0Y3JlYXRlTGlzdCgpe1xuXHRcdHRoaXMuaXRlbWxpc3Q9W107XG5cdFx0Ly9sYWJsZSBhbmQgdmFsdWVcblx0XHRpZiAodGhpcy5wcm9wcy5kb2NsYWJsZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMubGlzdFRvb2wuaXRlbXMgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmxpc3RUb29sLml0ZW1zICE9PSBudWxsKXtcblx0XHRcdGZvcihsZXQgaXRlbSBvZiB0aGlzLmxpc3RUb29sLml0ZW1zKXtcblx0XHRcdFx0dmFyIHRlbXAgPVtpdGVtW3RoaXMucHJvcHMuZG9jbGFibGVdLGl0ZW1bdGhpcy5wcm9wcy5kb2N2YWx1ZV1dO1xuXHRcdFx0XHR0aGlzLml0ZW1saXN0LnB1c2godGVtcCk7XG5cdFx0XHR9XG5cdFx0XHQkKGRvY3VtZW50KS50cmlnZ2VyKCdsaXN0TG9hZCcgKyB0aGlzLnByb3BzLmRvY3R5cGUpO1xuXHRcdH1cblx0XHQvL2p1c3QgbGFibGVcblx0XHRlbHNlIGlmKHRoaXMubGlzdFRvb2wuaXRlbXMgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmxpc3RUb29sLml0ZW1zICE9PSBudWxsKXtcblx0XHRcdGZvcihsZXQgaXRlbSBvZiB0aGlzLmxpc3RUb29sLml0ZW1zKXtcblx0XHRcdFx0dGhpcy5pdGVtbGlzdC5wdXNoKGl0ZW1bdGhpcy5wcm9wcy5kb2N2YWx1ZV0pO1xuXHRcdFx0fVxuXHRcdFx0JChkb2N1bWVudCkudHJpZ2dlcignbGlzdExvYWQnICsgdGhpcy5wcm9wcy5kb2N0eXBlLnJlcGxhY2UoXCIgXCIsXCJcIikpO1xuXHRcdH1cblx0fVxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuXHRcdC8vIGNvbnNvbGUubG9nKFwiSEVMTE9cIik7XG5cdFx0Ly8gdGhpcy5hdy5kZXN0cm95KCk7XG5cdFx0Ly8gZGVsZXRlIHRoaXMuYXc7XG5cdFx0Ly8gY29uc29sZS5sb2coXCJURVNUXCIpO1xuXHR9XG5cdHJlZkNhbGwoaW5wdXQpe1xuXHRcdHRoaXMuaW5wdXQ9aW5wdXQ7XG5cdH1cblx0YXV0b2NvbXBsZXRlKGlucHV0KXtcblx0XHRpbnB1dD10aGlzLmlucHV0O1xuXHRcdHZhciBjb25maWc9IHtcblx0XHRcdFx0bWluQ2hhcnM6IDAsXG5cdFx0XHRcdG1heEl0ZW1zOiA5OSxcblx0XHRcdFx0YXV0b0ZpcnN0OiB0cnVlLFxuXHRcdFx0XHRmaWx0ZXI6IEF3ZXNvbXBsZXRlLkZJTFRFUl9TVEFSVFNXSVRIXG5cdFx0XHR9XG5cdFx0aWYodGhpcy5wcm9wcy5kb2NsYWJsZSAhPT0gdW5kZWZpbmVkICl7XG5cdFx0XHRjb25maWcuaXRlbT0gZnVuY3Rpb24oaXRlbSwgaW5wdXQpIHtcblx0XHRcdFx0dmFyIGQgPSBpdGVtO1xuXHRcdFx0XHR2YXIgaHRtbCA9IFwiPHNwYW4+XCIgKyBfXyhpdGVtLmxhYmVsKSsgXCI8L3NwYW4+PGJyPjxzcGFuPjxzbWFsbD5cIitpdGVtLnZhbHVlK1wiPC9zbWFsbD48L3NwYW4+XCI7XG5cdFx0XHRcdHJldHVybiAkKCc8bGk+PC9saT4nKVxuXHRcdFx0XHRcdC5kYXRhKCdpdGVtLmF1dG9jb21wbGV0ZScsIGl0ZW0pXG5cdFx0XHRcdFx0Lmh0bWwoJzxhPjxwPicgKyBodG1sICsgJzwvcD48L2E+Jylcblx0XHRcdFx0XHQuZ2V0KDApO1xuXHRcdFx0fVxuXG5cdFx0fWVsc2V7XG5cdFx0XHRjb25maWcuaXRlbT1mdW5jdGlvbihpdGVtLCBpbnB1dCkge1xuXHRcdFx0XHR2YXIgZCA9IGl0ZW07XG5cdFx0XHRcdHZhciBodG1sID0gXCI8c3Bhbj5cIiArIF9fKGl0ZW0pKyBcIjwvc3Bhbj5cIjtcblx0XHRcdFx0cmV0dXJuICQoJzxsaT48L2xpPicpXG5cdFx0XHRcdFx0LmRhdGEoJ2l0ZW0uYXV0b2NvbXBsZXRlJywgaXRlbSlcblx0XHRcdFx0XHQuaHRtbCgnPGE+PHA+JyArIGh0bWwgKyAnPC9wPjwvYT4nKVxuXHRcdFx0XHRcdC5nZXQoMCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuYXcgPSBuZXcgQXdlc29tcGxldGUoaW5wdXQsY29uZmlnKTtcblx0XHRpbnB1dC5hZGRFdmVudExpc3RlbmVyKFxuXHRcdFx0J2F3ZXNvbXBsZXRlLXNlbGVjdGNvbXBsZXRlJyxcblx0XHRcdFx0dGhpcy5pbnB1dENoYW5nZVxuXHRcdCk7XG5cblx0XHR0aGlzLmF3Lmxpc3Q9dGhpcy5pdGVtTGlzdDtcblx0XHQkKGRvY3VtZW50KS5iaW5kKCdsaXN0TG9hZCcgKyB0aGlzLnByb3BzLmRvY3R5cGUucmVwbGFjZShcIiBcIixcIlwiKSxmdW5jdGlvbigpe1xuXHRcdFx0dGhpcy5hdy5saXN0PXRoaXMuaXRlbWxpc3Q7XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0fVxuXHRpbnB1dENoYW5nZShlKXtcblx0XHR0aGlzLnByb3BzLmlucHV0Q2hhbmdlZChlKTtcblx0fVxuXG5cdHJlbmRlcigpe1xuXHRcdHRoaXMudHlwZSA9ICh0aGlzLnByb3BzLnR5cGUgPT09IHVuZGVmaW5lZCkgPyBcInRleHRcIjogdGhpcy5wcm9wcy50eXBlO1xuXHRcdHRoaXMudmFsdWUgPSAodGhpcy5wcm9wcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMudmFsdWU7XG5cdFx0dGhpcy5wbGFjZWhvbGRlciA9ICh0aGlzLnByb3BzLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5wbGFjZWhvbGRlcjtcblx0XHR0aGlzLmxhYmxlID0gKHRoaXMucHJvcHMubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLmxhYmxlO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlcXVpcmVkID0gKHRoaXMucHJvcHMucmVxdWlyZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZXF1aXJlZD09ZmFsc2V8fHRoaXMucHJvcHMucmVxdWlyZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZWFkb25seSA9ICh0aGlzLnByb3BzLnJlYWRvbmx5ID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVhZG9ubHk9PWZhbHNlfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXG5cdFx0dmFyIG91dHB1dD1cIlwiO1xuXHRcdHRoaXMuY2xhc3NOYW1lPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcImZvcm0tY29udHJvbCBhd2Vzb21wbGV0ZVwiOiBcImZvcm0tY29udHJvbCBhd2Vzb21wbGV0ZSBcIiArdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0dmFyIGlucHV0PSggPGlucHV0XG5cdFx0XHRcdFx0dmFsdWU9e3RoaXMudmFsdWV9XG5cblx0XHRcdFx0XHR0eXBlPXt0aGlzLnR5cGV9IFxuXHRcdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9IFxuXHRcdFx0XHRcdHBsYWNlaG9sZGVyPXt0aGlzLnBsYWNlaG9sZGVyfSBcblx0XHRcdFx0XHRyZWY9e3RoaXMucmVmQ2FsbH1cblx0XHQgICAgICAgICAgXHRvbkNoYW5nZT17dGhpcy5pbnB1dENoYW5nZX1cblx0XHQgICAgICAgICAgXHRkaXNhYmxlZD17dGhpcy5kaXNhYmxlZH1cblx0XHQgICAgICAgICAgXHRyZWFkT25seT17dGhpcy5yZWFkb25seX1cblx0XHQgICAgICAgICAgXHRyZXF1aXJlZD17dGhpcy5yZXF1aXJlZH1cblx0XHQgICAgICAgICAgLz4pO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMubGFibGUgIT09IHVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLmxhYmxlID09XCJcIil7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBcIj5cblx0XHQgICAgXHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD5cblx0XHQgICAgXHRcdDxkaXYgY2xhc3NOYW1lPVwiXCI+XG5cdFx0ICAgICAgXHRcdFx0e2lucHV0fVxuXHRcdCAgICBcdFx0PC9kaXY+XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdCAgICAgIFx0XHR7aW5wdXR9XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5leHBvcnQgY2xhc3MgQnV0dG9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnR5cGUgPSAodGhpcy5wcm9wcy50eXBlID09PSB1bmRlZmluZWQpID8gXCJ0ZXh0XCI6IHRoaXMucHJvcHMudHlwZTtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR2YXIgb3V0cHV0PVwiXCI7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiYnRuXCI6IFwiYnRuIFwiICt0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHR2YXIgaW5wdXQ9KCBcblx0XHRcdDxidXR0b24gXG5cdFx0XHRcdHR5cGU9e3RoaXMudHlwZX1cblx0XHRcdFx0Y2xhc3NOYW1lPXt0aGlzLmNsYXNzTmFtZX0gXG5cdFx0XHRcdHZhbHVlPXt0aGlzLnZhbHVlfVxuXHRcdFx0XHRvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2xpY2t9XG5cdFx0XHRcdGRpc2FibGVkPXt0aGlzLmRpc2FibGVkfVxuXHRcdFx0Pnt0aGlzLnZhbHVlfTwvYnV0dG9uPlxuXHRcdCk7XG5cblxuXHRcdG91dHB1dCA9IChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHQgICAgICBcdFx0e2lucHV0fVxuXHQgIFx0XHQ8L2Rpdj5cblx0ICBcdCk7XG5cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG4iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RhbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnN1Ym1pdD10aGlzLnN1Ym1pdC5iaW5kKHRoaXMpO1xuXHR9XG5cdHN1Ym1pdChlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5wcm9wcy5zdWJtaXQoZSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dmFyIGZvb3Rlcj1cIlwiO1xuXHRcdGlmKHRoaXMucHJvcHMuc3VibWl0IT09IGZhbHNlKXtcblx0XHRcdGZvb3Rlcj0oXHRcdFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWZvb3RlclwiPlxuXHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tc2Vjb25kYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DbG9zZTwvYnV0dG9uPlxuXHRcdFx0XHRcdDxidXR0b24gXG5cdFx0XHRcdFx0XHR0eXBlPVwic3VibWl0XCIgXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLnN1Ym1pdH0gXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiA+XG5cdFx0XHRcdFx0XHRcdHt0aGlzLnByb3BzLnN1Ym1pdFRleHR9XG5cdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KVxuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsIGZhZGUgdGV4dC1sZWZ0IHBhbmVsLWRlZmF1bHRcIiBpZD17dGhpcy5wcm9wcy5pZH0gdGFiSW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiBhcmlhLWxhYmVsbGVkYnk9XCJleGFtcGxlTW9kYWxMYWJlbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZ1wiIHJvbGU9XCJkb2N1bWVudFwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1oZWFkZXJcIj5cblx0XHRcdFx0XHRcdFx0PGg0IGNsYXNzTmFtZT1cIm1vZGFsLXRpdGxlXCIgaWQ9XCJleGFtcGxlTW9kYWxMYWJlbFwiPnt0aGlzLnByb3BzLnRpdGxlfTwvaDQ+XG5cdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGRpc3BsYXk9XCJub25lXCIgY2xhc3NOYW1lPVwiY2xvc2UgaGlkZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+XG5cdFx0XHRcdFx0XHRcdDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+XG5cdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XG5cdFx0XHRcdFx0XHRcdFx0eyB0aGlzLnByb3BzLmNoaWxkcmVuIH1cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdHtmb290ZXJ9XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuaW5pdFRhYmxlPXRoaXMuaW5pdFRhYmxlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jb21wb25lbnREaWRVcGRhdGU9dGhpcy5jb21wb25lbnREaWRVcGRhdGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmNvbXBvbmVudFdpbGxVcGRhdGU9dGhpcy5jb21wb25lbnRXaWxsVXBkYXRlLmJpbmQodGhpcyk7XG5cblx0fVxuXG5cdGluaXRUYWJsZSgpe1xuXHRcdC8vXG5cdFx0Ly8gaWYodGhpcy50YWJsZSAhPT0gdW5kZWZpbmVkKXtcblx0XHQvLyBcdHRoaXMudGFibGUuZGVzdHJveSgpO1xuXHRcdC8vIH1cblx0XHRjb25zb2xlLmxvZyh0aGlzLnByb3BzLmNvbnRlbnQpO1xuXHQgICAgdGhpcy50YWJsZT0kKFwiI1wiK3RoaXMucHJvcHMuaWQpLkRhdGFUYWJsZSh7XG5cdCAgICBcdFwiZGVzdHJveVwiOiB0cnVlLFxuXHQgICAgXHRcInNjcm9sbFlcIjogJzcwdmgnLFxuICAgICAgICBcdFwic2Nyb2xsQ29sbGFwc2VcIjogdHJ1ZSxcblx0ICAgICAgICBcInNjcm9sbFhcIjogdHJ1ZSxcblx0ICAgICAgICBcInBhZ2luZ1wiOiAgIGZhbHNlLFxuXHQgICAgICAgIFwic3RhdGVTYXZlXCI6IHRydWUsXG5cdCAgICAgICAgXCJjb2x1bW5zXCI6IHRoaXMucHJvcHMuY29sdW1ucyxcblx0ICAgICAgICBcImluZm9cIjogICAgIGZhbHNlXG5cdCAgICB9KTtcblx0fVxuXHRjb21wb25lbnRXaWxsVXBkYXRlKCl7XG5cblx0XHRpZih0aGlzLnRhYmxlICE9PSB1bmRlZmluZWQpe1xuXHRcdFx0Y29uc29sZS5sb2coXCJERVNUUk9ZXCIpO1xuXHRcdFx0dGhpcy50YWJsZS5kZXN0cm95KCk7XG5cdFx0fVxuXHR9XG5cdGNvbXBvbmVudERpZFVwZGF0ZSgpe1xuXHRcdHRoaXMuaW5pdFRhYmxlKCk7XG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHRyZXR1cm4oXG5cblx0XHRcdDx0YWJsZVxuXHRcdFx0XHRjbGFzc05hbWU9XCJzdHJpcGUgdGFibGUgdGFibGUtYm9yZGVyZWQgcHMtbGlzdC10YWJsZVwiIFxuXHRcdFx0XHR3aWR0aD1cIjEwMCVcIlxuXHRcdFx0XHRpZD17dGhpcy5wcm9wcy5pZH1cblx0XHRcdFx0PlxuXHRcdFx0XHR7dGhpcy5wcm9wcy5jb250ZW50fVxuXHRcdFx0PC90YWJsZT5cblx0XHQpO1xuXHR9XG59IiwiaW1wb3J0IFRhYmxlIGZyb20gJy4uL3V0aWxzL3RhYmxlJ1xuaW1wb3J0IEZvcm0gZnJvbSAnLi4vdXRpbHMvZm9ybXMnXG5pbXBvcnQgTW9kYWwgZnJvbSAnLi4vdXRpbHMvbW9kYWwnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwcmF5VGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5zdGF0ZT17XG5cdFx0XHRzcHJheWluZzpbXVxuXHRcdH07XG5cdFx0dGhpcy5zcHJheUNoYW5nZT10aGlzLnNwcmF5Q2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5yZXR1cm5Db250ZW50PXRoaXMucmV0dXJuQ29udGVudC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY3JlYXRlU3ByYXlFbnRyeT10aGlzLmNyZWF0ZVNwcmF5RW50cnkuYmluZCh0aGlzKTtcblx0XHRcblx0XHR0aGlzLnNwcmF5VG9vbCA9IG5ldyBwcy5hcGlUb29sKHRoaXMucHJvcHMuZmlsdGVyLHtkb2N0eXBlOidTcHJheWluZyd9LHRoaXMuc3ByYXlDaGFuZ2UpO1xuXHR9XG5cbiAgXHRzcHJheUNoYW5nZSgpe1xuICBcdFx0Y29uc29sZS5sb2codGhpcy5zcHJheVRvb2wuaXRlbXMpO1xuXHRcdHRoaXMuc2V0U3RhdGUoe3NwcmF5aW5nOnRoaXMuc3ByYXlUb29sLml0ZW1zfSk7XG5cdH1cblx0cmV0dXJuQ29sdW1ucygpe1xuXHRcdHJldHVybiBbXG5cdFx0XHR7dGl0bGU6XCJWaW5leWFyZFwifSxcblx0XHRcdHt0aXRsZTpcIlNlYXNvblwifSxcblx0XHRcdHt0aXRsZTpcIkRhdGVcIn0sXG5cdFx0XHR7dGl0bGU6XCJTcHJheSBUeXBlXCJ9LFxuXHRcdFx0e3RpdGxlOlwiUXVhbnRpdHlcIn1cblx0XHRdO1xuXHR9XG5cdHJldHVybkNvbnRlbnQoKXtcblx0XHR2YXIgY29udGVudD1bXTtcblx0XHRpZih0aGlzLnN0YXRlLnNwcmF5aW5nIT09bnVsbCl7XG5cdFx0XHR0aGlzLnN0YXRlLnNwcmF5aW5nLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCl7XG5cdFx0XHRcdGNvbnRlbnQucHVzaChcblx0XHRcdFx0XHQoPHRyIGtleT17aW5kZXh9PlxuXHRcdFx0XHRcdFx0PHRkPntpdGVtLnZpbmV5YXJkfTwvdGQ+XG5cdFx0XHRcdFx0XHQ8dGQ+e2l0ZW0uc2Vhc29ufTwvdGQ+XG5cdFx0XHRcdFx0XHQ8dGQ+e2l0ZW0uZGF0ZX08L3RkPlxuXHRcdFx0XHRcdFx0PHRkPntpdGVtLnNwcmF5X3R5cGV9PC90ZD5cblx0XHRcdFx0XHRcdDx0ZD57aXRlbS5xdWFudGl0eX08L3RkPlxuXHRcdFx0XHRcdDwvdHI+KVxuXHRcdFx0XHQpO1x0XG5cdFx0XHR9LmJpbmQodGhpcykpO1xuXHRcdH1cblxuXG5cdFx0cmV0dXJuICg8dGJvZHk+e2NvbnRlbnR9PC90Ym9keT4pO1xuXHR9XG5cdGNyZWF0ZVNwcmF5RW50cnkoaXRlbSl7XG5cdFx0Y29uc29sZS5sb2coXCJDcmVhdGluZ1wiKTtcblx0XHRpdGVtLmRhdGU9bW9tZW50KGl0ZW0uZGF0ZSxcIk1NL0REL1lZWVlcIikuZm9ybWF0KCdZWVlZLU1NLUREJyk7XG5cdFx0dGhpcy5zcHJheVRvb2wuY3JlYXRlKGl0ZW0sZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRwcy5zdWNjZXNzQWxlcnQoXCJTcHJleWluZyBFbnRyeSBcIiAraXRlbS5uYW1lKyBcIiBjcmVhdGVkLlwiKVxuXHRcdH0pO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHZhciBjb2x1bW5zPXRoaXMucmV0dXJuQ29sdW1ucygpO1xuXHRcdHZhciBjb250ZW50PXRoaXMucmV0dXJuQ29udGVudCgpO1xuXHRcdGNvbnNvbGUubG9nKGNvbHVtbnMpO1xuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHQ8VGFibGUgXG5cdFx0XHRcdGlkPVwic3ByYXlUYWJsZVwiXG5cdFx0XHRcdHRpdGxlPVwiU3ByYXkgVGFibGVcIlxuXHRcdFx0XHRjb250ZW50PXtjb250ZW50fVxuXHRcdFx0XHRjb2x1bW5zPXtjb2x1bW5zfVxuXHRcdFx0Lz5cblx0XHRcdDxTcHJheUZvcm1Nb2RhbFxuXHRcdFx0XHRpZD1cImNyZWF0ZVNwcmF5RW50cnlcIlxuXHRcdFx0XHRjcmVhdGVTcHJheUVudHJ5PXt0aGlzLmNyZWF0ZVNwcmF5RW50cnl9XG5cdFx0XHQvPlxuXHRcdFx0PC9kaXY+XG5cdFx0XHRcblx0XHQpO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBTcHJheUZvcm1Nb2RhbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblxuXHRcdHRoaXMuc3VibWl0PXRoaXMuc3VibWl0LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5zdGF0ZT17XG5cdFx0XHR2aW5leWFyZDpcIlwiLFxuXHRcdFx0c2Vhc29uOlwiXCIsXG5cdFx0XHRkYXRlOm1vbWVudCgpLmZvcm1hdChcIk1NL0REL1lZWVlcIiksXG5cdFx0XHRzcHJheVR5cGU6XCJcIixcblx0XHRcdHF1YW50aXR5OjBcblx0XHR9XG5cdH1cblxuXHRzdWJtaXQoZSl7XG5cdFx0aWYodGhpcy5zdGF0ZS52aW5leWFyZD09XCJcIiB8fHRoaXMuc3RhdGUuc3ByYXlfdHlwZT09XCJcIiB8fCAobW9tZW50KHRoaXMuc3RhdGUuZGF0ZSxcIk1NL0REL1lZWVlcIikuaXNWYWxpZCgpKSE9PXRydWUpe1xuXHRcdFx0Y29uc29sZS5sb2coXCJub3QgdmFsaWRcIik7XG5cdFx0fWVsc2V7XG5cdFx0XHR2YXIgY29weT1wcy5jbG9uZSh0aGlzLnN0YXRlKTtcblx0XHRcdCQoJyMnKyB0aGlzLnByb3BzLmlkKS5tb2RhbCgnaGlkZScpXG5cdFx0XHR0aGlzLnN0YXRlPXtcblx0XHRcdFx0dmluZXlhcmQ6XCJcIixcblx0XHRcdFx0c2Vhc29uOlwiXCIsXG5cdFx0XHRcdGRhdGU6bW9tZW50KCkuZm9ybWF0KFwiTU0vREQvWVlZWVwiKSxcblx0XHRcdFx0c3ByYXlfdHlwZTpcIlwiLFxuXHRcdFx0XHRxdWFudGl0eTowXG5cdFx0XHR9XG5cdFx0XHR0aGlzLnNldFN0YXRlKHRoaXMuc3RhdGUpO1xuXHRcdFx0Y29uc29sZS5sb2coXCJJTiBTVUJNSVRcIik7XG5cdFx0XHR0aGlzLnByb3BzLmNyZWF0ZVNwcmF5RW50cnkoY29weSk7XG5cdFx0fVxuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHZhciBmaWVsZHM9W1x0XHRcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJhdXRvQ29tcGxldGVcIixcblx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3ZpbmV5YXJkOmUudGFyZ2V0LnZhbHVlfSlcblx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHR2YWx1ZTp0aGlzLnN0YXRlLnZpbmV5YXJkLFxuXHRcdFx0XHRyZXF1aXJlZDp0cnVlLFxuXHRcdFx0XHRsYWJsZTpcIlZpbmV5YXJkXCIsXG5cdFx0XHRcdGRvY3R5cGU6XCJWaW5leWFyZFwiLFxuXHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJhdXRvQ29tcGxldGVcIixcblx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3NlYXNvbjplLnRhcmdldC52YWx1ZX0pXG5cdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0dmFsdWU6dGhpcy5zdGF0ZS5zZWFzb24sXG5cdFx0XHRcdHJlcXVpcmVkOnRydWUsXG5cdFx0XHRcdGxhYmxlOlwiU2Vhc29uXCIsXG5cdFx0XHRcdGRvY3R5cGU6XCJTZWFzb25cIixcblx0XHRcdFx0ZG9jdmFsdWU6XCJuYW1lXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiZGF0ZVwiLFxuXHRcdFx0XHRyZXF1aXJlZDp0cnVlLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7ZGF0ZTplLnRhcmdldC52YWx1ZX0pO1xuXHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdHZhbHVlOnRoaXMuc3RhdGUuZGF0ZSxcblx0XHRcdFx0bGFibGU6XCJEYXRlXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiYXV0b0NvbXBsZXRlXCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXsgXG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7c3ByYXlfdHlwZTplLnRhcmdldC52YWx1ZX0pXG5cdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0dmFsdWU6dGhpcy5zdGF0ZS5zcHJheV90eXBlLFxuXHRcdFx0XHRyZXF1aXJlZDp0cnVlLFxuXHRcdFx0XHRsYWJsZTpcIlNwcmF5IFR5cGVcIixcblx0XHRcdFx0ZG9jdHlwZTpcIlNwcmF5IFR5cGVcIixcblx0XHRcdFx0ZG9jdmFsdWU6XCJuYW1lXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiaW5wdXRcIixcblx0XHRcdFx0Y2xhc3NOYW1lOlwidmluZXlhcmQtaW5wdXRcIixcblx0XHRcdFx0dHlwZTpcIm51bWJlclwiLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7cXVhbnRpdHk6ZS50YXJnZXQudmFsdWV9KVxuXHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdHZhbHVlOnRoaXMuc3RhdGUucXVhbnRpdHksXG5cdFx0XHRcdGxhYmxlOlwicXVhbnRpdHlcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJidXR0b25cIixcblx0XHRcdFx0dHlwZTpcInN1Ym1pdFwiLFxuXHRcdFx0XHR2YWx1ZTpcIkNyZWF0ZSBTcHJheWluZyBFbnRyeVwiLFxuXHRcdFx0XHRjbGFzc05hbWU6XCJidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIsXG5cdFx0XHRcdG9uQ2xpY2s6dGhpcy5zdWJtaXRcblx0XHRcdH1cblxuXG5cdFx0XVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8YnIgLz5cdFx0XHRcdFxuXHRcdFx0XHQ8YSBcblx0XHRcdFx0XHRocmVmPVwiI1wiIFxuXHRcdFx0XHRcdGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiXG5cdFx0XHRcdFx0b25DbGljaz17ZnVuY3Rpb24oKXskKCcjJysgdGhpcy5wcm9wcy5pZCkubW9kYWwoKX0uYmluZCh0aGlzKX1cblx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzXCI+PC9zcGFuPiBDcmVhdGUgU3ByYXlpbmcgRW50cnk8L2E+XG5cdFx0XHRcdDxNb2RhbCBcblx0XHRcdFx0XHRpZD17dGhpcy5wcm9wcy5pZH0gXG5cdFx0XHRcdFx0c3VibWl0VGV4dD1cIlN1Ym1pdFwiIFxuXHRcdFx0XHRcdHRpdGxlPVwiQ3JlYXRlIE5ldyBTcHJheWluZyBFbnRyeVwiXG5cdFx0XHRcdFx0c3VibWl0PXtmYWxzZX1cblx0XHRcdFx0XHQ+XG5cblx0XHRcdFx0XHQ8Rm9ybVxuXHRcdFx0XHRcdFx0aWQ9XCJDcmVhdGVTcHJheWluZ0VudHJ5Rm9ybVwiXG5cdFx0XHRcdFx0XHR0eXBlPVwiaG9yaXpvbnRhbFwiXG5cdFx0XHRcdFx0XHRmaWVsZHM9e2ZpZWxkc31cblxuXHRcdFx0XHRcdC8+XG5cblx0XHRcdFx0PC9Nb2RhbD5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmltcG9ydCBGb3JtIGZyb20gJy4uLy4uL3B1YmxpYy9qcy9tb2R1bGVzL3V0aWxzL2Zvcm1zJ1xuaW1wb3J0IEFjb3JkaWFuIGZyb20gJy4uLy4uL3B1YmxpYy9qcy9tb2R1bGVzL3V0aWxzL2Fjb3JkaWFuJ1xuaW1wb3J0IEFjb3JkaWFuQ29udGVudCBmcm9tICcuLi8uLi9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9hY29yZGlhbkNvbnRlbnQnXG5pbXBvcnQgU3ByYXlUYWJsZSBmcm9tICcuLi8uLi9wdWJsaWMvanMvbW9kdWxlcy92aW5leWFyZC9zcHJheVRhYmxlJ1xuXG5cblxuLy9jb25zdCBhcHA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKTtcbmNvbnN0IGFwcD0gJCgnI2FwcCcpWzBdO1xuXG5jbGFzcyBDcmVhdGVXb3Jrb3JkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdH1cblx0Ly88QWZmaXhXcmFwcGVyIGNsYXNzTmFtZT1cInN0aWNreV9zdWJuYXYgdGV4dC1jZW50ZXJcIiAgb2Zmc2V0PXsxNDB9IGhlaWdodD1cIjQwcHhcIj48L0FmZml4V3JhcHBlcj5cblx0c29tZUZ1bmN0aW9uKCl7XG5cblx0fVxuXHRyZW5kZXIoKXtcblx0XHR2YXIgZmllbGRzPVtcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJoZWFkZXJcIixcblx0XHRcdFx0bGFibGU6XCJURVNUSU5HXCJcblx0XHRcdH0sXG5cblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJpbnB1dFwiLFxuXHRcdFx0XHRvbkNoYW5nZTogdGhpcy5zb21lRnVuY3Rpb24sXG5cdFx0XHRcdGxhYmxlOlwidGVzdFwiLFxuXHRcdFx0XHRrZXk6XCJ0eXBlXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwibGFibGVcIixcblx0XHRcdFx0bGFibGU6XCJURVNYU0RGXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiaW5wdXRcIixcblx0XHRcdFx0b25DaGFuZ2U6IHRoaXMuc29tZUZ1bmN0aW9uLFxuXHRcdFx0XHRsYWJsZTpcInRlc3QyXCIsXG5cdFx0XHRcdGtleTpcIm90aGVyXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiZGF0ZVwiLFxuXHRcdFx0XHRvbkNoYW5nZTogdGhpcy5zb21lRnVuY3Rpb24sXG5cdFx0XHRcdGxhYmxlOlwiRGF0ZVwiLFxuXHRcdFx0XHRrZXk6XCJvdGhlcjNcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJzZWxlY3RcIixcblx0XHRcdFx0b25DaGFuZ2U6IHRoaXMuc29tZUZ1bmN0aW9uLFxuXHRcdFx0XHRsYWJsZTpcInRlc3QyXCIsXG5cdFx0XHRcdGtleTpcImdyb3Vwc1NlbGVjdFwiLFxuXHRcdFx0XHRvcHRpb25zOltcblx0XHRcdFx0XHR7IFxuXHRcdFx0XHRcdFx0Z3JvdXA6IFwidGhpbmdcIixcblx0XHRcdFx0XHRcdG9wdGlvbnM6IFtcblx0XHRcdFx0XHRcdFx0XCJvbmVcIixcblx0XHRcdFx0XHRcdFx0XCJ0d29cIixcblx0XHRcdFx0XHRcdFx0XCJ0aHJlZVwiXG5cdFx0XHRcdFx0XHRdXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRncm91cDogXCJ0aGluZzJcIixcblx0XHRcdFx0XHRcdG9wdGlvbnM6IFtcblx0XHRcdFx0XHRcdFx0XCJvbmVcIixcblx0XHRcdFx0XHRcdFx0XCJ0d29cIixcblx0XHRcdFx0XHRcdFx0XCJ0aHJlZVwiXG5cdFx0XHRcdFx0XHRdXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRdXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcInNlbGVjdFwiLFxuXHRcdFx0XHRvbkNoYW5nZTogdGhpcy5zb21lRnVuY3Rpb24sXG5cdFx0XHRcdGxhYmxlOlwidGVzdDJcIixcblx0XHRcdFx0a2V5Olwibm9ybWFsU2VsZWN0XCIsXG5cdFx0XHRcdG9wdGlvbnM6W1xuXHRcdFx0XHRcdFwib25lXCIsXG5cdFx0XHRcdFx0XCJ0d29cIixcblx0XHRcdFx0XHRcInRocmVlXCJcblx0XHRcdFx0XVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJhdXRvQ29tcGxldGVcIixcblx0XHRcdFx0b25DaGFuZ2U6IHRoaXMuc29tZUZ1bmN0aW9uLFxuXHRcdFx0XHRsYWJsZTpcIlZpbmV5YXJkXCIsXG5cdFx0XHRcdGRvY3R5cGU6XCJWaW5leWFyZFwiLFxuXHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIixcblx0XHRcdFx0a2V5OlwiYXV0b0NvbXBsZXRlXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiYXV0b0NvbXBsZXRlXCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiB0aGlzLnNvbWVGdW5jdGlvbixcblx0XHRcdFx0bGFibGU6XCJDdXN0b21lclwiLFxuXHRcdFx0XHRkb2N0eXBlOlwiQ3VzdG9tZXJcIixcblx0XHRcdFx0ZG9jbGFibGU6XCJmdWxsX25hbWVcIixcblx0XHRcdFx0ZG9jdmFsdWU6XCJuYW1lXCIsXG5cdFx0XHRcdGtleTpcImN1c3RvbWVyXCJcblx0XHRcdH1cblx0XHRdXG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdDxGb3JtXG5cdFx0XHRcdHR5cGU9XCJob3Jpem9udGFsXCJcblx0XHRcdFx0ZmllbGRzPXtmaWVsZHN9XG5cdFx0XHQ+XG5cblx0XHRcdDwvRm9ybT5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuXG5cbmNvbnN0IGFwcDI9ICQoJyNhcHAyJylbMF07XG4oZnVuY3Rpb24oKXtcblx0dmFyIGZpbHRlcj17fTtcblx0ZnJhcHBlLnJlYWR5KGZ1bmN0aW9uKCl7XG5cdFx0UmVhY3RET00ucmVuZGVyKCA8U3ByYXlUYWJsZSBmaWx0ZXI9e2ZpbHRlcn0gLz4gLCBhcHAyICk7XG5cdH0pXG5cbn0pKCk7XG5cblxuXG4iXX0=
