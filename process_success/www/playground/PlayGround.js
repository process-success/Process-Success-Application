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
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _forms = require('../utils/forms');

var _forms2 = _interopRequireDefault(_forms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DoctypeForm = function (_React$Component) {
	_inherits(DoctypeForm, _React$Component);

	function DoctypeForm(props) {
		_classCallCheck(this, DoctypeForm);

		var _this = _possibleConstructorReturn(this, (DoctypeForm.__proto__ || Object.getPrototypeOf(DoctypeForm)).call(this, props));

		_this.componentWillUpdate = _this.componentWillUpdate.bind(_this);
		_this.doctypeToolUpdate = _this.doctypeToolUpdate.bind(_this);

		_this.submit = _this.submit.bind(_this);
		_this.save = _this.save.bind(_this);
		_this.delete = _this.delete.bind(_this);
		_this.doctypeTool = new ps.apiTool({ name: _this.props.doctype }, { doctype: 'DocType' }, _this.doctypeToolUpdate, _this.forceUpdate);
		_this.state = { items: _this.doctypeTool.items };
		//this.doctypeTool = new ps.apiTool({name:this.props.doctype},{doctype:'DocType'},this.doctypeToolUpdate);
		return _this;
	}

	_createClass(DoctypeForm, [{
		key: 'componentWillUpdate',
		value: function componentWillUpdate() {}
	}, {
		key: 'doctypeToolUpdate',
		value: function doctypeToolUpdate() {
			this.setState({ items: this.doctypeTool.items });
		}
	}, {
		key: 'submit',
		value: function submit(e) {
			//FORM VALIDATION 
			//if(this.props.item.vineyard=="" ||this.props.item.spray_type=="" || (moment(this.props.item.date,"MM/DD/YYYY").isValid())!==true){
			//	console.log("not valid");
			//}else{
			e.preventDefault();
			this.props.create(this.props.item, this.props.doctype);
			//}
		}
	}, {
		key: 'save',
		value: function save(e) {
			// if(this.props.item.vineyard=="" ||this.props.item.spray_type=="" || (moment(this.props.item.date,"MM/DD/YYYY").isValid())!==true){
			// 	console.log("not valid");
			// }else{
			e.preventDefault();
			this.props.edit(this.props.item);
			// }
		}
	}, {
		key: 'delete',
		value: function _delete(e) {
			e.preventDefault();
			this.props.delete(this.props.item);
		}
	}, {
		key: 'createFormJson',
		value: function createFormJson() {
			var createHidden = this.props.mode != "create" ? " hidden" : " nope";
			var editHidden = this.props.mode != "edit" ? " hidden" : " nope";
			var fieldsJson = this.state.items[0].fields;
			var fields = [];
			var fieldObject = {
				Link: function (item) {
					return {
						field: "autoComplete",
						onChange: function (e) {
							copy[item.fieldname] = e.target.value;
							this.props.itemChange(copy);
						}.bind(this),
						lable: item.label,
						value: copy[item.fieldname],
						doctype: item.options,
						docvalue: "name"
					};
				}.bind(this),
				Check: function (item) {
					return {
						field: "check",
						onChange: function (e) {
							copy[item.fieldname] = e.target.checked;
							this.props.itemChange(copy);
						}.bind(this),
						lable: item.label,
						value: copy[item.fieldname],
						className: "big-checkbox"
					};
				}.bind(this),
				Int: function (item) {
					return {
						field: "input",
						type: "number",
						onChange: function (e) {
							copy[item.fieldname] = e.target.value;
							this.props.itemChange(copy);
						}.bind(this),
						value: copy[item.fieldname],
						lable: item.label
					};
				}.bind(this),
				Select: function (item) {
					var options = item.options.split("\n");
					return {
						field: "select",
						type: "number",
						onChange: function (e) {
							copy[item.fieldname] = e.target.value;
							this.props.itemChange(copy);
						}.bind(this),
						lable: item.label,
						value: copy[item.fieldname],
						options: options
					};
				}.bind(this),
				Data: function (item, propOptions) {
					if (propOptions.type == "textarea") {
						return {
							field: "textarea",
							onChange: function (e) {
								copy[item.fieldname] = e.target.value;
								this.props.itemChange(copy);
							}.bind(this),
							value: copy[item.fieldname],
							lable: item.label
						};
					} else {
						return {};
					}
				}.bind(this),
				Date: function (item) {
					return {
						field: "date",
						onChange: function (e) {
							copy[item.fieldname] = e.target.value;
							this.props.itemChange(copy);
						}.bind(this),
						lable: item.label
					};
				}.bind(this)
			};

			if (this.props.item == null) {
				var copy = {};
			} else {
				var copy = ps.clone(this.props.item);
			}

			//loop the json object
			//probably change this to willMount
			for (var x = 0; x < fieldsJson.length; x++) {
				var currentField = fieldsJson[x];
				console.log(currentField.fieldname);
				// check if this field was enabled

				if (this.props[currentField.fieldname]) {
					//there is a props for this field

					if (this.props[currentField.fieldname].active === 1) {
						//and the field is set to active

						if (fieldObject[currentField.fieldtype]) {
							//Feild type can be handled?
							//handle the creation of copy and the default values

							if (this.props.mode == "create") {
								if (copy[currentField.fieldname]) {
									//the field already exists
								} else if (this.props[currentField.fieldname].default) {
									//set to default value
									copy[currentField.fieldname] = this.props[currentField.fieldname].default;
								} else {
									copy[currentField.fieldname] = "";
								}
							}
							console.log(currentField.fieldname);
							fields.push(fieldObject[currentField.fieldtype](currentField, this.props[currentField.fieldname]));
						}
					}
				}
			}
			if (!("doctype" in copy)) {
				copy.doctype = this.props.doctype;
			}
			//adding button feilds
			fields.push({
				field: "button",
				type: "submit",
				value: "Create " + this.props.doctype + " Entry",
				className: "btn-primary pull-right " + createHidden,
				onClick: this.submit
			});
			if (this.props.close) {
				fields.push({
					field: "button",
					value: "Close",
					className: "pull-right " + editHidden,
					onClick: this.props.close
				});
			}
			fields.push({
				field: "button",
				type: "submit",
				value: "Delete",
				className: "btn-danger pull-right " + editHidden,
				onClick: this.delete
			});
			fields.push({
				field: "button",
				type: "submit",
				value: "Save",
				className: "btn-success pull-right " + editHidden,
				onClick: this.save
			});
			return fields;
		}
	}, {
		key: 'render',
		value: function render() {
			var output = {};
			if (this.state.items !== null) {
				var fields = this.createFormJson();
				var output = React.createElement(_forms2.default, {
					id: this.props.id,
					type: 'horizontal',
					fields: fields
				});
			} else {
				output = React.createElement(
					'div',
					null,
					' Loading... '
				);
			}

			return React.createElement(
				'div',
				null,
				output
			);
		}
	}]);

	return DoctypeForm;
}(React.Component);

exports.default = DoctypeForm;

},{"../utils/forms":4}],4:[function(require,module,exports){
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
					var optinal = ["value", "lable", "options", "className", "readonly", "disable", "require"];
					var props = ps.initProps(optinal, item);
					return React.createElement(Select, {
						key: this.props.id + index,
						value: props.value,
						className: props.className,
						lable: props.lable,
						options: props.options,
						readOnly: props.readonly,
						disabled: props.disabled,
						required: props.required,
						inputChanged: function inputChanged(e) {
							item.onChange(e);
						}
					});
				}.bind(this),
				check: function (item, index) {
					var props = ["value", "lable", "className", "readonly", "disable", "require", "value"];
					props = ps.initProps(props, item);

					return React.createElement(Check, {
						key: this.props.id + index,
						value: props.value,
						className: props.className,
						lable: props.lable,
						readOnly: props.readonly,
						disabled: props.disabled,
						required: props.required,
						inputChanged: function inputChanged(e) {
							item.onChange(e);
						}
					});
				}.bind(this),

				textarea: function (item, index) {
					var props = ["value", "lable", "className", "readonly", "disable", "require", "value"];
					props = ps.initProps(props, item);

					return React.createElement(Textarea, {
						key: this.props.id + index,
						value: props.value,
						className: props.className,
						lable: props.lable,
						readOnly: props.readonly,
						disabled: props.disabled,
						required: props.required,
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
		_this2.value = _this2.props.value === undefined ? "" : _this2.props.value;

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
							{ key: item.group + index, value: innerItem },
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
						{ key: index, value: item },
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

var Check = exports.Check = function (_React$Component4) {
	_inherits(Check, _React$Component4);

	function Check(props) {
		_classCallCheck(this, Check);

		var _this4 = _possibleConstructorReturn(this, (Check.__proto__ || Object.getPrototypeOf(Check)).call(this, props));

		_this4.inputChange = _this4.inputChange.bind(_this4);

		return _this4;
	}

	_createClass(Check, [{
		key: "inputChange",
		value: function inputChange(e) {

			this.props.inputChanged(e);
		}
	}, {
		key: "render",
		value: function render() {
			this.value = this.props.value === undefined ? 0 : this.props.value;
			this.placeholder = this.props.placeholder === undefined ? "" : this.props.placeholder;
			this.lable = this.props.lable === undefined ? "" : this.props.lable;
			this.className = this.props.className === undefined ? "form-check-input" : "form-check-input " + this.props.className;
			this.disabled = this.props.disabled === undefined || this.props.disabled == false || this.props.disabled == "" ? false : true;
			this.required = this.props.required === undefined || this.props.required == false || this.props.required == "" ? false : true;
			this.readonly = this.props.readonly === undefined || this.props.readonly == false || this.props.readonly == "" ? false : true;

			var output = "";
			var input = React.createElement("input", {
				type: "checkbox",
				className: this.className,
				checked: this.value,

				onChange: this.props.inputChanged,
				disabled: this.disabled,
				readOnly: this.readonly,
				required: this.required
			});

			if (this.props.lable !== undefined || this.props.lable == "") {
				output = React.createElement(
					"div",
					{ className: "checkbox" },
					React.createElement(
						"label",
						{ className: "control-label" },
						input,
						this.props.lable
					)
				);
			} else {
				output = React.createElement(
					"div",
					{ className: "checkbox" },
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

	return Check;
}(React.Component);

var Textarea = exports.Textarea = function (_React$Component5) {
	_inherits(Textarea, _React$Component5);

	function Textarea(props) {
		_classCallCheck(this, Textarea);

		var _this5 = _possibleConstructorReturn(this, (Textarea.__proto__ || Object.getPrototypeOf(Textarea)).call(this, props));

		_this5.inputChange = _this5.inputChange.bind(_this5);

		return _this5;
	}

	_createClass(Textarea, [{
		key: "inputChange",
		value: function inputChange(e) {
			this.props.inputChanged(e);
		}
	}, {
		key: "render",
		value: function render() {
			this.value = this.props.value === undefined ? 0 : this.props.value;
			this.placeholder = this.props.placeholder === undefined ? "" : this.props.placeholder;
			this.lable = this.props.lable === undefined ? "" : this.props.lable;
			this.className = this.props.className === undefined ? "form-control" : "form-control " + this.props.className;
			this.disabled = this.props.disabled === undefined || this.props.disabled == false || this.props.disabled == "" ? false : true;
			this.required = this.props.required === undefined || this.props.required == false || this.props.required == "" ? false : true;
			this.readonly = this.props.readonly === undefined || this.props.readonly == false || this.props.readonly == "" ? false : true;
			this.rows = this.props.rows === undefined || this.props.rows == "" ? 3 : this.props.rows;
			var output = "";
			var input = React.createElement("textarea", {
				className: this.className,
				value: this.value,
				onChange: this.props.inputChanged,
				rows: this.rows,
				disabled: this.disabled,
				readOnly: this.readonly,
				required: this.required
			});

			if (this.props.lable !== undefined || this.props.lable == "") {
				output = React.createElement(
					"div",
					null,
					React.createElement(
						"label",
						{ className: "control-label" },
						this.props.lable
					),
					input
				);
			} else {
				output = React.createElement(
					"div",
					{ className: "" },
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

	return Textarea;
}(React.Component);

var DateInput = exports.DateInput = function (_React$Component6) {
	_inherits(DateInput, _React$Component6);

	function DateInput(props) {
		_classCallCheck(this, DateInput);

		var _this6 = _possibleConstructorReturn(this, (DateInput.__proto__ || Object.getPrototypeOf(DateInput)).call(this, props));

		_this6.dateInit = _this6.dateInit.bind(_this6);
		return _this6;
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

var AwesompleteInput = exports.AwesompleteInput = function (_React$Component7) {
	_inherits(AwesompleteInput, _React$Component7);

	function AwesompleteInput(props) {
		_classCallCheck(this, AwesompleteInput);

		/*   Do the bind thing  */
		var _this7 = _possibleConstructorReturn(this, (AwesompleteInput.__proto__ || Object.getPrototypeOf(AwesompleteInput)).call(this, props));

		_this7.createList = _this7.createList.bind(_this7);
		_this7.docChanged = _this7.docChanged.bind(_this7);
		_this7.componentDidMount = _this7.componentDidMount.bind(_this7);
		_this7.inputChange = _this7.inputChange.bind(_this7);
		_this7.autocomplete = _this7.autocomplete.bind(_this7);
		_this7.componentWillUnmount = _this7.componentWillUnmount.bind(_this7);
		_this7.refCall = _this7.refCall.bind(_this7);

		//this.workorderObj=this.onStatusChanged.bind(this);
		/*          end          */
		_this7.itemlist = [];
		_this7.state = { itemlist: [] };
		_this7._isMounted = false;
		var args = {};
		var options = { doctype: _this7.props.doctype };
		var filter = {};
		if (_this7.props.filter == undefined || _this7.props.filter == null) {} else {
			filter = _this7.props.filter;
		}
		_this7.listTool = new ps.apiTool(filter, options, _this7.docChanged);
		if (_this7.listTool.items === undefined || _this7.listTool.items === 0 || _this7.listTool.items === null) {} else {
			_this7.state.list = _this7.listTool.items;
		}

		_this7.createList();
		return _this7;
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
			$(input).click(function () {
				if (this.aw.ul.childNodes.length === 0) {
					this.aw.minChars = 0;
					this.aw.evaluate();
				} else if (this.aw.ul.hasAttribute('hidden')) {
					this.aw.open();
				} else {
					this.aw.close();
				}
			}.bind(this));
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

var Button = exports.Button = function (_React$Component8) {
	_inherits(Button, _React$Component8);

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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{"../utils/forms":4,"../utils/modal":5,"../utils/table":6}],8:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _forms = require('../../public/js/modules/utils/forms');

var _forms2 = _interopRequireDefault(_forms);

var _acordian = require('../../public/js/modules/utils/acordian');

var _acordian2 = _interopRequireDefault(_acordian);

var _acordianContent = require('../../public/js/modules/utils/acordianContent');

var _acordianContent2 = _interopRequireDefault(_acordianContent);

var _doctypeForm = require('../../public/js/modules/utils/doctypeForm');

var _doctypeForm2 = _interopRequireDefault(_doctypeForm);

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
				lable: "test"
			}, {
				field: "lable",
				lable: "TESXSDF"
			}, {
				field: "input",
				onChange: this.someFunction,
				lable: "test2"
			}, {
				field: "date",
				onChange: this.someFunction,
				lable: "Date"
			}, {
				field: "select",
				onChange: this.someFunction,
				lable: "test2",
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
				value: "two",
				options: ["one", "two", "three"]
			}, {
				field: "check",
				className: "big-checkbox",
				onChange: function onChange(e) {
					console.log(e.target.checked);
				},
				lable: "this is a test"
			}, {
				lable: "Test Text Area",
				field: "textarea",
				className: "",
				onChange: this.someFunction
			}, {
				field: "autoComplete",
				onChange: this.someFunction,
				lable: "Vineyard",
				doctype: "Vineyard",
				docvalue: "name"
			}, {
				field: "autoComplete",
				onChange: this.someFunction,
				lable: "Customer",
				doctype: "Customer",
				doclable: "full_name",
				docvalue: "name"
			}];
			return React.createElement(
				'div',
				null,
				React.createElement(_forms2.default, {
					type: 'horizontal',
					fields: fields,
					id: 'thing'
				})
			);
		}
	}]);

	return CreateWorkorder;
}(React.Component);

var TestBro = function (_React$Component2) {
	_inherits(TestBro, _React$Component2);

	function TestBro(props) {
		_classCallCheck(this, TestBro);

		var _this2 = _possibleConstructorReturn(this, (TestBro.__proto__ || Object.getPrototypeOf(TestBro)).call(this, props));

		_this2.taskChanged = _this2.taskChanged.bind(_this2);
		_this2.sprayingFeilds = new ps.apiTool({ name: 'Spraying' }, { doctype: 'DocType' }, _this2.taskChanged);
		return _this2;
	}

	_createClass(TestBro, [{
		key: 'taskChanged',
		value: function taskChanged() {
			console.log(this.sprayingFeilds.items);
		}
	}, {
		key: 'someFunction',
		value: function someFunction() {}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				'test'
			);
		}
	}]);

	return TestBro;
}(React.Component);

var app2 = $('#app2')[0];
(function () {
	var filter = {};
	frappe.ready(function () {
		ReactDOM.render(React.createElement(
			'div',
			null,
			React.createElement(_doctypeForm2.default, {
				id: 'createPrunEntry',
				doctype: 'Pruning',
				season: { active: 1 },
				note: {
					active: 1,
					type: "textarea"
				},
				type: { active: 1 },
				b_lock: { active: 1 },
				removed: { active: 1 },
				pre_prune: { active: 1 },
				tap_removed: { active: 1 }
			}),
			' ',
			React.createElement(CreateWorkorder, null)
		), app2);
	});
})();

// const app2= $('#app2')[0];
// (function(){
// 	var filter={};
// 	frappe.ready(function(){
// 		ReactDOM.render( <SprayTable filter={filter} /> , app2 );
// 	})

// })();

},{"../../public/js/modules/utils/acordian":1,"../../public/js/modules/utils/acordianContent":2,"../../public/js/modules/utils/doctypeForm":3,"../../public/js/modules/utils/forms":4,"../../public/js/modules/vineyard/sprayTable":7}]},{},[8])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdXRpbHMvYWNvcmRpYW4uanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL3V0aWxzL2Fjb3JkaWFuQ29udGVudC5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdXRpbHMvZG9jdHlwZUZvcm0uanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL3V0aWxzL2Zvcm1zLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9tb2RhbC5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdXRpbHMvdGFibGUuanMiLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdmluZXlhcmQvc3ByYXlUYWJsZS5qc3giLCJwcm9jZXNzX3N1Y2Nlc3Mvd3d3L3BsYXlncm91bmQvUGxheUdyb3VuZC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7SUFFcUIsUTs7O0FBQ3BCLG1CQUFZLEtBQVosRUFBa0I7QUFBQTs7QUFBQSw2R0FDWCxLQURXO0FBRWpCOzs7OzJCQUNPO0FBQ1AsVUFDQztBQUFBO0FBQUEsTUFBSyxXQUFVLGFBQWYsRUFBNkIsSUFBSSxLQUFLLEtBQUwsQ0FBVyxFQUE1QyxFQUFnRCxNQUFLLFNBQXJELEVBQStELHdCQUFxQixNQUFwRjtBQUNHLFNBQUssS0FBTCxDQUFXO0FBRGQsSUFERDtBQUtBOzs7O0VBVm9DLE1BQU0sUzs7a0JBQXZCLFE7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDRkEsZTs7O0FBQ3BCLDBCQUFZLEtBQVosRUFBa0I7QUFBQTs7QUFBQSxnSUFDWCxLQURXOztBQUVqQixRQUFLLFVBQUws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QUNDO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFERDtBQUtBOzs7O0VBakJvQixNQUFNLFM7O0FBb0I1QixJQUFNLE9BQU0sRUFBRSxPQUFGLEVBQVcsQ0FBWCxDQUFaO0FBQ0EsQ0FBQyxZQUFVO0FBQ1YsS0FBSSxTQUFPLEVBQVg7QUFDQSxRQUFPLEtBQVAsQ0FBYSxZQUFVO0FBQ3RCLFdBQVMsTUFBVCxDQUNDO0FBQUE7QUFBQTtBQUFLO0FBQ0osUUFBRyxpQkFEQztBQUVKLGFBQVEsU0FGSjtBQUdKLFlBQVEsRUFBQyxRQUFPLENBQVIsRUFISjtBQUlKLFVBQU07QUFDTCxhQUFPLENBREY7QUFFTCxXQUFLO0FBRkEsS0FKRjtBQVFKLFVBQU0sRUFBQyxRQUFPLENBQVIsRUFSRjtBQVNKLFlBQVEsRUFBQyxRQUFPLENBQVIsRUFUSjtBQVVKLGFBQVMsRUFBQyxRQUFPLENBQVIsRUFWTDtBQVdKLGVBQVcsRUFBQyxRQUFPLENBQVIsRUFYUDtBQVlKLGlCQUFhLEVBQUMsUUFBTyxDQUFSO0FBWlQsS0FBTDtBQUFBO0FBYUcsdUJBQUMsZUFBRDtBQWJILEdBREQsRUFjZ0MsSUFkaEM7QUFlQSxFQWhCRDtBQWtCQSxDQXBCRDs7QUFzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBBY29yZGlhbkNvbnRlbnQgZnJvbSAnLi9hY29yZGlhbkNvbnRlbnQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjb3JkaWFuIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWdyb3VwXCIgaWQ9e3RoaXMucHJvcHMuaWR9IHJvbGU9XCJ0YWJsaXN0XCIgYXJpYS1tdWx0aXNlbGVjdGFibGU9XCJ0cnVlXCI+XG5cdFx0XHRcdHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWNvcmRpYW5Db250ZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMucmVuZGVySGVhZCA9IHRoaXMucmVuZGVySGVhZC5iaW5kKHRoaXMpO1xuXHR9XG5cdHJlbmRlckhlYWQoaWQpe1xuXG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYW5lbC1oZWFkaW5nXCIgXG5cdFx0XHRcdHJvbGU9XCJ0YWJcIiBcblx0XHRcdFx0b25DbGljaz17XG5cdFx0XHRcdFx0ZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGlkKTtcblx0XHRcdFx0XHRcdCQoJyMnK3RoaXMucHJvcHMucGFyZW50SWQrJyAuYWNvcmRpYW4tY29udGVudC5pbicpLm5vdCgnIycraWQpLmNvbGxhcHNlKCdoaWRlJyk7XG5cdFx0XHRcdFx0XHQkKCcjJytpZCkuY29sbGFwc2UoJ3RvZ2dsZScpO1xuXHRcdFx0XHRcdH0uYmluZCh0aGlzKVxuXHRcdFx0XHR9XG5cdFx0XHRcdD5cblx0XHRcdFx0PGg0IGNsYXNzTmFtZT1cInBhbmVsLXRpdGxlXCI+XG5cdFx0XHRcdFx0PGEgcm9sZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBkYXRhLXBhcmVudD17JyMnK3RoaXMucHJvcHMucGFyZW50SWR9IGFyaWEtZXhwYW5kZWQ9eyh0aGlzLnByb3BzLmFjdGl2ZSk/IHRydWU6ZmFsc2V9ICA+XG5cdFx0XHQgIFx0XHRcdHt0aGlzLnByb3BzLnRpdGxlfVxuXHRcdFx0XHRcdDwvYT5cblx0XHRcdFx0PC9oND5cblx0XHRcdFx0e3RoaXMucHJvcHMuZXh0cmFIZWFkfVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR2YXIgaWQgPXRoaXMucHJvcHMuaWQ7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFuZWwgcGFuZWwtZGVmYXVsdFwiPlxuXHRcdFx0XHR7dGhpcy5yZW5kZXJIZWFkKGlkKX1cblx0XHRcdFx0PGRpdiBpZD17aWR9IFxuXHRcdFx0XHRcdGNsYXNzTmFtZT17KHRoaXMucHJvcHMuYWN0aXZlKT8gXCJhY29yZGlhbi1jb250ZW50IHBhbmVsLWNvbGxhcHNlIGNvbGxhcHNlIGluXCI6XCJhY29yZGlhbi1jb250ZW50IHBhbmVsLWNvbGxhcHNlIGNvbGxhcHNlXCJ9IFxuXHRcdFx0XHRcdHJvbGU9XCJ0YWJwYW5lbFwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtYm9keVwiPlxuXHRcdFx0XHRcdFx0eyB0aGlzLnByb3BzLmNoaWxkcmVuIH1cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cbiAgXHRcdCk7XG5cdH1cbn1cbiIsImltcG9ydCBGb3JtIGZyb20gJy4uL3V0aWxzL2Zvcm1zJ1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3R5cGVGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuY29tcG9uZW50V2lsbFVwZGF0ZT10aGlzLmNvbXBvbmVudFdpbGxVcGRhdGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmRvY3R5cGVUb29sVXBkYXRlPXRoaXMuZG9jdHlwZVRvb2xVcGRhdGUuYmluZCh0aGlzKTtcblxuXHRcdHRoaXMuc3VibWl0PXRoaXMuc3VibWl0LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5zYXZlPXRoaXMuc2F2ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZGVsZXRlPXRoaXMuZGVsZXRlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5kb2N0eXBlVG9vbCA9IG5ldyBwcy5hcGlUb29sKHtuYW1lOnRoaXMucHJvcHMuZG9jdHlwZX0se2RvY3R5cGU6J0RvY1R5cGUnfSx0aGlzLmRvY3R5cGVUb29sVXBkYXRlLHRoaXMuZm9yY2VVcGRhdGUpO1xuXHRcdHRoaXMuc3RhdGU9e2l0ZW1zOnRoaXMuZG9jdHlwZVRvb2wuaXRlbXN9O1xuXHRcdC8vdGhpcy5kb2N0eXBlVG9vbCA9IG5ldyBwcy5hcGlUb29sKHtuYW1lOnRoaXMucHJvcHMuZG9jdHlwZX0se2RvY3R5cGU6J0RvY1R5cGUnfSx0aGlzLmRvY3R5cGVUb29sVXBkYXRlKTtcblx0fVxuXHRjb21wb25lbnRXaWxsVXBkYXRlKCl7XG5cblx0fVxuXHRkb2N0eXBlVG9vbFVwZGF0ZSgpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe2l0ZW1zOnRoaXMuZG9jdHlwZVRvb2wuaXRlbXN9KVxuXHR9XG5cdHN1Ym1pdChlKXtcblx0XHQvL0ZPUk0gVkFMSURBVElPTiBcblx0XHQvL2lmKHRoaXMucHJvcHMuaXRlbS52aW5leWFyZD09XCJcIiB8fHRoaXMucHJvcHMuaXRlbS5zcHJheV90eXBlPT1cIlwiIHx8IChtb21lbnQodGhpcy5wcm9wcy5pdGVtLmRhdGUsXCJNTS9ERC9ZWVlZXCIpLmlzVmFsaWQoKSkhPT10cnVlKXtcblx0XHQvL1x0Y29uc29sZS5sb2coXCJub3QgdmFsaWRcIik7XG5cdFx0Ly99ZWxzZXtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRoaXMucHJvcHMuY3JlYXRlKHRoaXMucHJvcHMuaXRlbSx0aGlzLnByb3BzLmRvY3R5cGUpO1xuXHRcdC8vfVxuXHR9XG5cdHNhdmUoZSl7XG5cdFx0Ly8gaWYodGhpcy5wcm9wcy5pdGVtLnZpbmV5YXJkPT1cIlwiIHx8dGhpcy5wcm9wcy5pdGVtLnNwcmF5X3R5cGU9PVwiXCIgfHwgKG1vbWVudCh0aGlzLnByb3BzLml0ZW0uZGF0ZSxcIk1NL0REL1lZWVlcIikuaXNWYWxpZCgpKSE9PXRydWUpe1xuXHRcdC8vIFx0Y29uc29sZS5sb2coXCJub3QgdmFsaWRcIik7XG5cdFx0Ly8gfWVsc2V7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR0aGlzLnByb3BzLmVkaXQodGhpcy5wcm9wcy5pdGVtKTtcblx0XHQvLyB9XG5cdH1cblx0ZGVsZXRlKGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR0aGlzLnByb3BzLmRlbGV0ZSh0aGlzLnByb3BzLml0ZW0pO1xuXHR9XG5cdGNyZWF0ZUZvcm1Kc29uKCl7XG5cdFx0dmFyIGNyZWF0ZUhpZGRlbj0odGhpcy5wcm9wcy5tb2RlIT1cImNyZWF0ZVwiKT9cIiBoaWRkZW5cIjpcIiBub3BlXCI7XG5cdFx0dmFyIGVkaXRIaWRkZW49KHRoaXMucHJvcHMubW9kZSE9XCJlZGl0XCIpP1wiIGhpZGRlblwiOlwiIG5vcGVcIjtcblx0XHR2YXIgZmllbGRzSnNvbj10aGlzLnN0YXRlLml0ZW1zWzBdLmZpZWxkcztcblx0XHR2YXIgZmllbGRzPVtdO1xuXHRcdHZhciBmaWVsZE9iamVjdD17XG5cdFx0XHRMaW5rOiBmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRmaWVsZDpcImF1dG9Db21wbGV0ZVwiLFxuXHRcdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRcdGNvcHlbaXRlbS5maWVsZG5hbWVdPWUudGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0XHRsYWJsZTppdGVtLmxhYmVsLFxuXHRcdFx0XHRcdHZhbHVlOmNvcHlbaXRlbS5maWVsZG5hbWVdLFxuXHRcdFx0XHRcdGRvY3R5cGU6aXRlbS5vcHRpb25zLFxuXHRcdFx0XHRcdGRvY3ZhbHVlOlwibmFtZVwiXG5cdFx0XHRcdH1cblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdENoZWNrOiBmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRmaWVsZDpcImNoZWNrXCIsXG5cdFx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdFx0Y29weVtpdGVtLmZpZWxkbmFtZV09ZS50YXJnZXQuY2hlY2tlZDtcblx0XHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdFx0bGFibGU6aXRlbS5sYWJlbCxcblx0XHRcdFx0XHR2YWx1ZTpjb3B5W2l0ZW0uZmllbGRuYW1lXSxcblx0XHRcdFx0XHRjbGFzc05hbWU6IFwiYmlnLWNoZWNrYm94XCJcblx0XHRcdFx0fVxuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0SW50OiBmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRmaWVsZDpcImlucHV0XCIsXG5cdFx0XHRcdFx0dHlwZTpcIm51bWJlclwiLFxuXHRcdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRcdGNvcHlbaXRlbS5maWVsZG5hbWVdPWUudGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0XHR2YWx1ZTpjb3B5W2l0ZW0uZmllbGRuYW1lXSxcblx0XHRcdFx0XHRsYWJsZTppdGVtLmxhYmVsXG5cdFx0XHRcdH07XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRTZWxlY3Q6IGZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0XHR2YXIgb3B0aW9ucz1pdGVtLm9wdGlvbnMuc3BsaXQoIFwiXFxuXCIgKTtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRmaWVsZDpcInNlbGVjdFwiLFxuXHRcdFx0XHRcdHR5cGU6XCJudW1iZXJcIixcblx0XHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0XHRjb3B5W2l0ZW0uZmllbGRuYW1lXT1lLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdFx0bGFibGU6aXRlbS5sYWJlbCxcblx0XHRcdFx0XHR2YWx1ZTpjb3B5W2l0ZW0uZmllbGRuYW1lXSxcblx0XHRcdFx0XHRvcHRpb25zOm9wdGlvbnNcblx0XHRcdFx0fTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdERhdGE6IGZ1bmN0aW9uKGl0ZW0scHJvcE9wdGlvbnMpe1xuXHRcdFx0XHRpZihwcm9wT3B0aW9ucy50eXBlPT1cInRleHRhcmVhXCIpe1xuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRmaWVsZDpcInRleHRhcmVhXCIsXG5cdFx0XHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0XHRcdGNvcHlbaXRlbS5maWVsZG5hbWVdPWUudGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdFx0XHR2YWx1ZTpjb3B5W2l0ZW0uZmllbGRuYW1lXSxcblx0XHRcdFx0XHRcdGxhYmxlOml0ZW0ubGFiZWxcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0cmV0dXJuIHt9O1xuXHRcdFx0XHR9XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHREYXRlOiBmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRmaWVsZDpcImRhdGVcIixcblx0XHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0XHRjb3B5W2l0ZW0uZmllbGRuYW1lXT1lLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdFx0bGFibGU6aXRlbS5sYWJlbFxuXHRcdFx0XHR9XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0fVxuXG5cdFx0aWYodGhpcy5wcm9wcy5pdGVtPT1udWxsKXtcblx0XHRcdHZhciBjb3B5PXt9XG5cdFx0fWVsc2V7XG5cdFx0XHR2YXIgY29weT1wcy5jbG9uZSh0aGlzLnByb3BzLml0ZW0pO1xuXHRcdH1cblxuXHRcdC8vbG9vcCB0aGUganNvbiBvYmplY3Rcblx0XHQvL3Byb2JhYmx5IGNoYW5nZSB0aGlzIHRvIHdpbGxNb3VudFxuXHRcdGZvcih2YXIgeCA9IDA7IHggPCBmaWVsZHNKc29uLmxlbmd0aDsgeCsrKXtcblx0XHRcdHZhciBjdXJyZW50RmllbGQ9ZmllbGRzSnNvblt4XTtcblx0XHRcdGNvbnNvbGUubG9nKGN1cnJlbnRGaWVsZC5maWVsZG5hbWUpO1xuXHRcdFx0Ly8gY2hlY2sgaWYgdGhpcyBmaWVsZCB3YXMgZW5hYmxlZFxuXG5cdFx0XHRpZiAodGhpcy5wcm9wc1tjdXJyZW50RmllbGQuZmllbGRuYW1lXSl7XG5cdFx0XHRcdC8vdGhlcmUgaXMgYSBwcm9wcyBmb3IgdGhpcyBmaWVsZFxuXG5cdFx0XHRcdGlmKHRoaXMucHJvcHNbY3VycmVudEZpZWxkLmZpZWxkbmFtZV0uYWN0aXZlID09PSAxKXtcblx0XHRcdFx0XHQvL2FuZCB0aGUgZmllbGQgaXMgc2V0IHRvIGFjdGl2ZVxuXG5cdFx0XHRcdFx0aWYoZmllbGRPYmplY3RbY3VycmVudEZpZWxkLmZpZWxkdHlwZV0pe1xuXHRcdFx0XHRcdFx0Ly9GZWlsZCB0eXBlIGNhbiBiZSBoYW5kbGVkP1xuXHRcdFx0XHRcdFx0Ly9oYW5kbGUgdGhlIGNyZWF0aW9uIG9mIGNvcHkgYW5kIHRoZSBkZWZhdWx0IHZhbHVlc1xuXG5cdFx0XHRcdFx0XHRpZih0aGlzLnByb3BzLm1vZGU9PVwiY3JlYXRlXCIpe1xuXHRcdFx0XHRcdFx0XHRpZihjb3B5W2N1cnJlbnRGaWVsZC5maWVsZG5hbWVdKXtcblx0XHRcdFx0XHRcdFx0XHQvL3RoZSBmaWVsZCBhbHJlYWR5IGV4aXN0c1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGVsc2UgaWYodGhpcy5wcm9wc1tjdXJyZW50RmllbGQuZmllbGRuYW1lXS5kZWZhdWx0KXtcblx0XHRcdFx0XHRcdFx0XHQvL3NldCB0byBkZWZhdWx0IHZhbHVlXG5cdFx0XHRcdFx0XHRcdFx0Y29weVtjdXJyZW50RmllbGQuZmllbGRuYW1lXT10aGlzLnByb3BzW2N1cnJlbnRGaWVsZC5maWVsZG5hbWVdLmRlZmF1bHQ7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHRcdFx0XHRjb3B5W2N1cnJlbnRGaWVsZC5maWVsZG5hbWVdPVwiXCI7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGN1cnJlbnRGaWVsZC5maWVsZG5hbWUpO1xuXHRcdFx0XHRcdFx0ZmllbGRzLnB1c2goZmllbGRPYmplY3RbY3VycmVudEZpZWxkLmZpZWxkdHlwZV0oY3VycmVudEZpZWxkLHRoaXMucHJvcHNbY3VycmVudEZpZWxkLmZpZWxkbmFtZV0pKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoIShcImRvY3R5cGVcIiBpbiBjb3B5KSl7XG5cdFx0XHRjb3B5LmRvY3R5cGU9dGhpcy5wcm9wcy5kb2N0eXBlO1xuXHRcdH1cblx0XHQvL2FkZGluZyBidXR0b24gZmVpbGRzXG5cdFx0ZmllbGRzLnB1c2goe1xuXHRcdFx0XHRmaWVsZDpcImJ1dHRvblwiLFxuXHRcdFx0XHR0eXBlOlwic3VibWl0XCIsXG5cdFx0XHRcdHZhbHVlOlwiQ3JlYXRlIFwiICsgdGhpcy5wcm9wcy5kb2N0eXBlICsgXCIgRW50cnlcIixcblx0XHRcdFx0Y2xhc3NOYW1lOlwiYnRuLXByaW1hcnkgcHVsbC1yaWdodCBcIiArIGNyZWF0ZUhpZGRlbixcblx0XHRcdFx0b25DbGljazp0aGlzLnN1Ym1pdFxuXHRcdFx0fSk7XG5cdFx0aWYodGhpcy5wcm9wcy5jbG9zZSl7XG5cdFx0XHRmaWVsZHMucHVzaCh7XG5cdFx0XHRcdFx0ZmllbGQ6XCJidXR0b25cIixcblx0XHRcdFx0XHR2YWx1ZTpcIkNsb3NlXCIsXG5cdFx0XHRcdFx0Y2xhc3NOYW1lOlwicHVsbC1yaWdodCBcIisgZWRpdEhpZGRlbixcblx0XHRcdFx0XHRvbkNsaWNrOnRoaXMucHJvcHMuY2xvc2Vcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRmaWVsZHMucHVzaCh7XG5cdFx0XHRcdGZpZWxkOlwiYnV0dG9uXCIsXG5cdFx0XHRcdHR5cGU6XCJzdWJtaXRcIixcblx0XHRcdFx0dmFsdWU6XCJEZWxldGVcIixcblx0XHRcdFx0Y2xhc3NOYW1lOlwiYnRuLWRhbmdlciBwdWxsLXJpZ2h0IFwiKyBlZGl0SGlkZGVuLFxuXHRcdFx0XHRvbkNsaWNrOnRoaXMuZGVsZXRlXG5cdFx0fSk7XG5cdFx0ZmllbGRzLnB1c2goXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiYnV0dG9uXCIsXG5cdFx0XHRcdHR5cGU6XCJzdWJtaXRcIixcblx0XHRcdFx0dmFsdWU6XCJTYXZlXCIsXG5cdFx0XHRcdGNsYXNzTmFtZTpcImJ0bi1zdWNjZXNzIHB1bGwtcmlnaHQgXCIrIGVkaXRIaWRkZW4sXG5cdFx0XHRcdG9uQ2xpY2s6dGhpcy5zYXZlXG5cdFx0XHR9KTtcblx0XHRyZXR1cm4gZmllbGRzO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHZhciBvdXRwdXQ9e307XG5cdFx0aWYodGhpcy5zdGF0ZS5pdGVtcyE9PW51bGwpe1xuXHRcdFx0dmFyIGZpZWxkcz10aGlzLmNyZWF0ZUZvcm1Kc29uKCk7XG5cdFx0XHR2YXIgb3V0cHV0ID0gKFx0XHRcdFx0XG5cdFx0XHRcdDxGb3JtXG5cdFx0XHRcdFx0aWQ9e3RoaXMucHJvcHMuaWR9XG5cdFx0XHRcdFx0dHlwZT1cImhvcml6b250YWxcIlxuXHRcdFx0XHRcdGZpZWxkcz17ZmllbGRzfVxuXHRcdFx0XHQvPik7XG5cdFx0fWVsc2V7IFxuXHRcdFx0b3V0cHV0ID0gKDxkaXY+IExvYWRpbmcuLi4gPC9kaXY+KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cdFx0XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCIvKiBmb3JtcyAqL1xuLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5cblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5zdWJtaXQ9dGhpcy5zdWJtaXQuYmluZCh0aGlzKTtcblx0fVxuXHRzdWJtaXQoZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMucHJvcHMuc3VibWl0KGUpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHZhciBmb3JtPVtdO1xuXHRcdHZhciBmb3JtVHlwZXM9e1xuXHRcdFx0c2VsZWN0XHQ6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHR2YXIgb3B0aW5hbD1bXCJ2YWx1ZVwiLFwibGFibGVcIixcIm9wdGlvbnNcIixcImNsYXNzTmFtZVwiLFwicmVhZG9ubHlcIixcImRpc2FibGVcIixcInJlcXVpcmVcIl07XG5cdFx0XHRcdHZhciBwcm9wcz1wcy5pbml0UHJvcHMob3B0aW5hbCxpdGVtKTtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8U2VsZWN0XG5cdFx0XHRcdFx0XHRrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9XG5cdFx0XHRcdFx0XHR2YWx1ZT17cHJvcHMudmFsdWV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e3Byb3BzLmNsYXNzTmFtZX1cblx0XHRcdFx0XHRcdGxhYmxlPXtwcm9wcy5sYWJsZX1cblx0XHRcdFx0XHRcdG9wdGlvbnM9e3Byb3BzLm9wdGlvbnN9XG5cdFx0XHRcdFx0XHRyZWFkT25seT17cHJvcHMucmVhZG9ubHl9XG5cdFx0XHRcdFx0XHRkaXNhYmxlZD17cHJvcHMuZGlzYWJsZWR9XG5cdFx0XHRcdFx0XHRyZXF1aXJlZD17cHJvcHMucmVxdWlyZWR9XG5cdFx0XHRcdFx0XHRpbnB1dENoYW5nZWQ9e2Z1bmN0aW9uKGUpe2l0ZW0ub25DaGFuZ2UoZSk7fX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0Y2hlY2sgOiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0dmFyIHByb3BzPVtcInZhbHVlXCIsXCJsYWJsZVwiLFwiY2xhc3NOYW1lXCIsXCJyZWFkb25seVwiLFwiZGlzYWJsZVwiLFwicmVxdWlyZVwiLFwidmFsdWVcIl07XG5cdFx0XHRcdHByb3BzPXBzLmluaXRQcm9wcyhwcm9wcyxpdGVtKTtcblxuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxDaGVja1xuXHRcdFx0XHRcdFx0a2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fVxuXHRcdFx0XHRcdFx0dmFsdWU9e3Byb3BzLnZhbHVlfVxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXtwcm9wcy5jbGFzc05hbWV9XG5cdFx0XHRcdFx0XHRsYWJsZT17cHJvcHMubGFibGV9XG5cdFx0XHRcdFx0XHRyZWFkT25seT17cHJvcHMucmVhZG9ubHl9XG5cdFx0XHRcdFx0XHRkaXNhYmxlZD17cHJvcHMuZGlzYWJsZWR9XG5cdFx0XHRcdFx0XHRyZXF1aXJlZD17cHJvcHMucmVxdWlyZWR9XG5cdFx0XHRcdFx0XHRpbnB1dENoYW5nZWQ9e2Z1bmN0aW9uKGUpe2l0ZW0ub25DaGFuZ2UoZSk7fX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXG5cdFx0XHR0ZXh0YXJlYSA6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHR2YXIgcHJvcHM9W1widmFsdWVcIixcImxhYmxlXCIsXCJjbGFzc05hbWVcIixcInJlYWRvbmx5XCIsXCJkaXNhYmxlXCIsXCJyZXF1aXJlXCIsXCJ2YWx1ZVwiXTtcblx0XHRcdFx0cHJvcHM9cHMuaW5pdFByb3BzKHByb3BzLGl0ZW0pO1xuXG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PFRleHRhcmVhXG5cdFx0XHRcdFx0XHRrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9XG5cdFx0XHRcdFx0XHR2YWx1ZT17cHJvcHMudmFsdWV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e3Byb3BzLmNsYXNzTmFtZX1cblx0XHRcdFx0XHRcdGxhYmxlPXtwcm9wcy5sYWJsZX1cblx0XHRcdFx0XHRcdHJlYWRPbmx5PXtwcm9wcy5yZWFkb25seX1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXtwcm9wcy5kaXNhYmxlZH1cblx0XHRcdFx0XHRcdHJlcXVpcmVkPXtwcm9wcy5yZXF1aXJlZH1cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKTt9fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRpbnB1dCBcdDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciB0eXBlID0gKGl0ZW0udHlwZSA9PT0gdW5kZWZpbmVkKSA/IFwidGV4dFwiOiBpdGVtLnR5cGU7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IChpdGVtLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS52YWx1ZTtcblx0XHRcdFx0dmFyIHBsYWNlaG9sZGVyID0gKGl0ZW0ucGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnBsYWNlaG9sZGVyO1xuXHRcdFx0XHR2YXIgbGFibGUgPSAoaXRlbS5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ubGFibGU7XG5cdFx0XHRcdHZhciBjbGFzc05hbWUgPSAoaXRlbS5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmNsYXNzTmFtZTtcblx0XHRcdFx0dmFyIHJlYWRvbmx5ID0gKGl0ZW0ucmVhZG9ubHkgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnJlYWRvbmx5O1xuXHRcdFx0XHR2YXIgZGlzYWJsZWQgPSAoaXRlbS5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uZGlzYWJsZWQ7XG5cdFx0XHRcdHZhciByZXF1aXJlZCA9IChpdGVtLnJlcXVpcmVkID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5yZXF1aXJlZDtcblx0XHRcdFx0XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PElucHV0XG5cdFx0XHRcdFx0XHRrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9IFxuXHRcdFx0XHRcdFx0dHlwZT17dHlwZX1cblx0XHRcdFx0XHRcdHZhbHVlPXt2YWx1ZX1cblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cblx0XHRcdFx0XHRcdGxhYmxlPXtsYWJsZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0cmVhZG9ubHk9e3JlYWRvbmx5fVxuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ9e2Rpc2FibGVkfVxuXHRcdFx0XHRcdFx0cmVxdWlyZWQ9e3JlcXVpcmVkfVxuXHRcdFx0XHRcdFx0aW5wdXRDaGFuZ2VkPXtmdW5jdGlvbihlKXtpdGVtLm9uQ2hhbmdlKGUpfX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0bGFibGUgXHQ6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHRyZXR1cm4gKCAgXG4gICAgXHRcdFx0XHQ8bGFiZWwga2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fSA+e2l0ZW0ubGFibGV9PC9sYWJlbD5cblxuICAgIFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRyYWRpb1x0OiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0cmV0dXJuICg8ZGl2PjwvZGl2Pik7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRoZWFkZXI6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHRyZXR1cm4oPGgzIGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH0gPntpdGVtLmxhYmxlfTwvaDM+KVxuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0ZGF0ZTogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IChpdGVtLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS52YWx1ZTtcblx0XHRcdFx0dmFyIGxhYmxlID0gKGl0ZW0ubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmxhYmxlO1xuXHRcdFx0XHR2YXIgcGxhY2Vob2xkZXIgPSAoaXRlbS5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucGxhY2Vob2xkZXI7XG5cdFx0XHRcdHZhciBjbGFzc05hbWUgPSAoaXRlbS5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmNsYXNzTmFtZTtcblx0XHRcdFx0dmFyIHJlYWRvbmx5ID0gKGl0ZW0ucmVhZG9ubHkgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnJlYWRvbmx5O1xuXHRcdFx0XHR2YXIgZGlzYWJsZWQgPSAoaXRlbS5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uZGlzYWJsZWQ7XG5cdFx0XHRcdHZhciByZXF1aXJlZCA9IChpdGVtLnJlcXVpcmVkID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5yZXF1aXJlZDtcblx0XHRcdFx0cmV0dXJuKFxuXHRcdFx0XHRcdDxEYXRlSW5wdXRcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH0gXG5cdFx0XHRcdFx0XHR2YWx1ZT17dmFsdWV9XG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG5cdFx0XHRcdFx0XHRsYWJsZT17bGFibGV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e2NsYXNzTmFtZX1cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKX19XG5cdFx0XHRcdFx0XHRyZWFkb25seT17cmVhZG9ubHl9XG5cdFx0XHRcdFx0XHRkaXNhYmxlZD17ZGlzYWJsZWR9XG5cdFx0XHRcdFx0XHRyZXF1aXJlZD17cmVxdWlyZWR9XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGF1dG9Db21wbGV0ZTogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IChpdGVtLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS52YWx1ZTtcblx0XHRcdFx0dmFyIGxhYmxlID0gKGl0ZW0ubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmxhYmxlO1xuXHRcdFx0XHR2YXIgcGxhY2Vob2xkZXIgPSAoaXRlbS5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucGxhY2Vob2xkZXI7XG5cdFx0XHRcdHZhciBjbGFzc05hbWUgPSAoaXRlbS5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmNsYXNzTmFtZTtcblx0XHRcdFx0dmFyIHJlYWRvbmx5ID0gKGl0ZW0ucmVhZG9ubHkgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnJlYWRvbmx5O1xuXHRcdFx0XHR2YXIgZGlzYWJsZWQgPSAoaXRlbS5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uZGlzYWJsZWQ7XG5cdFx0XHRcdHZhciByZXF1aXJlZCA9IChpdGVtLnJlcXVpcmVkID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5yZXF1aXJlZDtcblxuXHRcdFx0XHRyZXR1cm4oXG5cdFx0XHRcdFx0PEF3ZXNvbXBsZXRlSW5wdXRcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH1cblx0XHRcdFx0XHRcdGRvY3R5cGU9e2l0ZW0uZG9jdHlwZX1cblx0XHRcdFx0XHRcdGRvY3ZhbHVlPXtpdGVtLmRvY3ZhbHVlfVxuXHRcdFx0XHRcdFx0ZG9jbGFibGU9e2l0ZW0uZG9jbGFibGV9XG5cdFx0XHRcdFx0XHR2YWx1ZT17dmFsdWV9XG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG5cdFx0XHRcdFx0XHRsYWJsZT17bGFibGV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e2NsYXNzTmFtZX1cblx0XHRcdFx0XHRcdHJlYWRvbmx5PXtyZWFkb25seX1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXtkaXNhYmxlZH1cblx0XHRcdFx0XHRcdHJlcXVpcmVkPXtyZXF1aXJlZH1cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKX19XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGJ1dHRvbjogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IChpdGVtLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS52YWx1ZTtcblx0XHRcdFx0dmFyIGNsYXNzTmFtZSA9IChpdGVtLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uY2xhc3NOYW1lO1xuXHRcdFx0XHR2YXIgZGlzYWJsZWQgPSAoaXRlbS5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uZGlzYWJsZWQ7XG5cdFx0XHRcdHJldHVybihcblx0XHRcdFx0XHQ8QnV0dG9uXG5cdFx0XHRcdFx0XHRrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9XG5cdFx0XHRcdFx0XHR2YWx1ZT17dmFsdWV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e2NsYXNzTmFtZX1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXtkaXNhYmxlZH1cblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2Z1bmN0aW9uKGUpe2l0ZW0ub25DbGljayhlKX19XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKVxuXHRcdH1cblx0XHR0aGlzLnByb3BzLmZpZWxkcy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXHRcdFx0aWYoJC5pc0VtcHR5T2JqZWN0KGl0ZW0pKXtcblxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGZvcm0ucHVzaChmb3JtVHlwZXNbaXRlbS5maWVsZF0oaXRlbSxpbmRleCkpO1xuXHRcdFx0fVxuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0Ly9mb3IodmFyIHg9MDsgeCA8IHRoaXMucHJvcHMuZmVpbGRzLmxlbmd0aCB4Kys7IClcblx0XHR2YXIgY2xhc3NOYW1lID0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJyZWFjdC1mb3JtXCI6IFwiZm9ybS1ob3Jpem9udGFsIHJlYWN0LWZvcm0gXCIrdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGZvcm0gY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxuXHRcdFx0XHQ8ZmllbGRzZXQ+XG5cdFx0XHRcdHt0aGlzLnByb3BzLmJlZm9yZX1cblx0XHRcdFx0e2Zvcm19XG5cdFx0XHRcdHsgdGhpcy5wcm9wcy5jaGlsZHJlbn1cblx0XHRcdFx0PC9maWVsZHNldD5cblx0XHRcdDwvZm9ybT5cblx0XHQpO1xuXHR9XG59XG5cblxuXG5leHBvcnQgY2xhc3MgU2VsZWN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuaW5wdXRDaGFuZ2U9dGhpcy5pbnB1dENoYW5nZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMudmFsdWUgPSAodGhpcy5wcm9wcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMudmFsdWU7XG5cblx0fVxuXHRpbnB1dENoYW5nZShlKXtcblx0XHR0aGlzLnByb3BzLmlucHV0Q2hhbmdlZCgpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHRoaXMudmFsdWUgPSAodGhpcy5wcm9wcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMudmFsdWU7XG5cdFx0dGhpcy5sYWJsZSA9ICh0aGlzLnByb3BzLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5sYWJsZTtcblx0XHR0aGlzLm9wdGlvbnMgPSAodGhpcy5wcm9wcy5vcHRpb25zID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5vcHRpb25zO1xuXHRcdHRoaXMuY2xhc3NOYW1lPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcImZvcm0tY29udHJvbFwiOiBcImZvcm0tY29udHJvbFwiICt0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHR0aGlzLmRpc2FibGVkID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5kaXNhYmxlZD09ZmFsc2V8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZXF1aXJlZCA9ICh0aGlzLnByb3BzLnJlcXVpcmVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVxdWlyZWQ9PWZhbHNlfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVhZG9ubHkgPSAodGhpcy5wcm9wcy5yZWFkb25seSA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1mYWxzZXx8dGhpcy5wcm9wcy5yZWFkb25seT09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR2YXIgb3B0aW9ucz1bXTtcblx0XHR2YXIgb3V0cHV0PVwiXCI7XG5cblxuXHRcdHRoaXMub3B0aW9ucy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXHRcdFx0dmFyIGdyb3VwPVtdO1xuXHRcdFx0aWYoaXRlbS5ncm91cCAhPT0gdW5kZWZpbmVkKXtcblx0XHRcdFx0aXRlbS5vcHRpb25zLm1hcChmdW5jdGlvbihpbm5lckl0ZW0saW5kZXgpe1xuXHRcdFx0XHRcdGdyb3VwLnB1c2goIDxvcHRpb24ga2V5PXtpdGVtLmdyb3VwK2luZGV4fSB2YWx1ZT17aW5uZXJJdGVtfT4ge2lubmVySXRlbX0gPC9vcHRpb24+KVxuXHRcdFx0XHR9KVxuXHRcdFx0XHRvcHRpb25zLnB1c2goPG9wdGdyb3VwIGtleT17aXRlbS5ncm91cH0gbGFiZWw9e2l0ZW0uZ3JvdXB9PiB7Z3JvdXB9PC9vcHRncm91cD4pO1xuXG5cdFx0XHR9XG5cdFx0XHRlbHNle1xuXHRcdFx0XHRvcHRpb25zLnB1c2goIDxvcHRpb24ga2V5PXtpbmRleH0gdmFsdWU9e2l0ZW19PiB7aXRlbX0gPC9vcHRpb24+KVxuXHRcdFx0fVxuXG5cdFx0XHRcblx0XHR9LmJpbmQodGhpcykpO1xuXG5cdFx0dmFyIHNlbGVjdD0oXG5cdFx0XHQ8c2VsZWN0IFxuXHRcdFx0XHRjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfSBcblx0XHRcdFx0dmFsdWU9e3RoaXMudmFsdWV9IFxuXHRcdFx0XHRvbkNoYW5nZT17dGhpcy5wcm9wcy5pbnB1dENoYW5nZWR9XG5cdFx0XHRcdGRpc2FibGVkPXt0aGlzLmRpc2FibGVkfVxuXHQgICAgICAgICAgXHRyZWFkT25seT17dGhpcy5yZWFkb25seX1cblx0ICAgICAgICAgIFx0cmVxdWlyZWQ9e3RoaXMucmVxdWlyZWR9XG5cdFx0XHRcdD5cblx0XHRcdFx0e29wdGlvbnN9XG5cdFx0XHQ8L3NlbGVjdD5cblx0XHQpO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMubGFibGUgIT09IHVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLmxhYmxlID09XCJcIil7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBcIj5cblx0XHQgICAgXHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD5cblx0XHQgICAgXHRcdDxkaXY+XG5cdFx0ICAgIFx0XHR7c2VsZWN0fVxuXHRcdCAgICBcdFx0PC9kaXY+XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdCAgICAgIFx0XHR7c2VsZWN0fVxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5pbnB1dENoYW5nZT10aGlzLmlucHV0Q2hhbmdlLmJpbmQodGhpcyk7XG5cblx0fVxuXHRpbnB1dENoYW5nZShlKXtcblx0XHR0aGlzLnByb3BzLmlucHV0Q2hhbmdlZChlKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnR5cGUgPSAodGhpcy5wcm9wcy50eXBlID09PSB1bmRlZmluZWQpID8gXCJ0ZXh0XCI6IHRoaXMucHJvcHMudHlwZTtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMucGxhY2Vob2xkZXIgPSAodGhpcy5wcm9wcy5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXI7XG5cdFx0dGhpcy5sYWJsZSA9ICh0aGlzLnByb3BzLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5sYWJsZTtcblx0XHR2YXIgb3V0cHV0PVwiXCI7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jb250cm9sXCI6IFwiZm9ybS1jb250cm9sIFwiICt0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHR0aGlzLmRpc2FibGVkID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5kaXNhYmxlZD09ZmFsc2V8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZXF1aXJlZCA9ICh0aGlzLnByb3BzLnJlcXVpcmVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVxdWlyZWQ9PWZhbHNlfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVhZG9ubHkgPSAodGhpcy5wcm9wcy5yZWFkb25seSA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1mYWxzZXx8dGhpcy5wcm9wcy5yZWFkb25seT09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR2YXIgaW5wdXQ9KCBcblx0XHRcdDxpbnB1dCBcblx0XHRcdFx0dHlwZT17dGhpcy50eXBlfSBcblx0XHRcdFx0Y2xhc3NOYW1lPXt0aGlzLmNsYXNzTmFtZX0gXG5cdFx0XHRcdHBsYWNlaG9sZGVyPXt0aGlzLnBsYWNlaG9sZGVyfSBcblx0XHRcdFx0dmFsdWU9e3RoaXMudmFsdWV9XG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnByb3BzLmlucHV0Q2hhbmdlZH1cblx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdCAgICAgICAgICBcdHJlYWRPbmx5PXt0aGlzLnJlYWRvbmx5fVxuXHQgICAgICAgICAgXHRyZXF1aXJlZD17dGhpcy5yZXF1aXJlZH1cblx0XHRcdC8+XG5cdFx0KTtcblxuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy5sYWJsZSA9PVwiXCIpe1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgXCI+XG5cdFx0ICAgIFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbFwiPnt0aGlzLnByb3BzLmxhYmxlfTwvbGFiZWw+XG5cdFx0ICAgIFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIlwiPlxuXHRcdCAgICAgIFx0XHRcdHtpbnB1dH1cblx0XHQgICAgXHRcdDwvZGl2PlxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHQgICAgICBcdFx0e2lucHV0fVxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgQ2hlY2sgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5pbnB1dENoYW5nZT10aGlzLmlucHV0Q2hhbmdlLmJpbmQodGhpcyk7XG5cblxuXHR9XG5cdGlucHV0Q2hhbmdlKGUpe1xuXG5cdFx0dGhpcy5wcm9wcy5pbnB1dENoYW5nZWQoZSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gMCA6IHRoaXMucHJvcHMudmFsdWU7XG5cdFx0dGhpcy5wbGFjZWhvbGRlciA9ICh0aGlzLnByb3BzLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5wbGFjZWhvbGRlcjtcblx0XHR0aGlzLmxhYmxlID0gKHRoaXMucHJvcHMubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLmxhYmxlO1xuXHRcdHRoaXMuY2xhc3NOYW1lPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcImZvcm0tY2hlY2staW5wdXRcIjogXCJmb3JtLWNoZWNrLWlucHV0IFwiICt0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHR0aGlzLmRpc2FibGVkID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5kaXNhYmxlZD09ZmFsc2V8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZXF1aXJlZCA9ICh0aGlzLnByb3BzLnJlcXVpcmVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVxdWlyZWQ9PWZhbHNlfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVhZG9ubHkgPSAodGhpcy5wcm9wcy5yZWFkb25seSA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1mYWxzZXx8dGhpcy5wcm9wcy5yZWFkb25seT09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHRcblx0XHR2YXIgb3V0cHV0PVwiXCI7XG5cdFx0dmFyIGlucHV0PSggXG5cdFx0XHQ8aW5wdXQgXG5cdFx0XHRcdHR5cGU9XCJjaGVja2JveFwiIFxuXHRcdFx0XHRjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfSBcblx0XHRcdFx0Y2hlY2tlZD17dGhpcy52YWx1ZX1cblx0XHRcdFx0XG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnByb3BzLmlucHV0Q2hhbmdlZH1cblx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdCAgICAgICAgICBcdHJlYWRPbmx5PXt0aGlzLnJlYWRvbmx5fVxuXHQgICAgICAgICAgXHRyZXF1aXJlZD17dGhpcy5yZXF1aXJlZH1cblx0XHRcdC8+XG5cdFx0KTtcblxuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy5sYWJsZSA9PVwiXCIpe1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0ICAgIFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbFwiPlxuXHRcdCAgICAgIFx0XHRcdHtpbnB1dH17dGhpcy5wcm9wcy5sYWJsZX1cblx0XHQgICAgICBcdFx0PC9sYWJlbD5cblx0XHQgIFx0XHQ8L2Rpdj5cblx0XHQgIFx0KTtcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdG91dHB1dCA9IChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdCAgICAgIFx0XHR7aW5wdXR9XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5leHBvcnQgY2xhc3MgVGV4dGFyZWEgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5pbnB1dENoYW5nZT10aGlzLmlucHV0Q2hhbmdlLmJpbmQodGhpcyk7XG5cblx0fVxuXHRpbnB1dENoYW5nZShlKXtcblx0XHR0aGlzLnByb3BzLmlucHV0Q2hhbmdlZChlKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyAwIDogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLnBsYWNlaG9sZGVyID0gKHRoaXMucHJvcHMucGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnBsYWNlaG9sZGVyO1xuXHRcdHRoaXMubGFibGUgPSAodGhpcy5wcm9wcy5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMubGFibGU7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jb250cm9sXCI6IFwiZm9ybS1jb250cm9sIFwiICt0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHR0aGlzLmRpc2FibGVkID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5kaXNhYmxlZD09ZmFsc2V8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZXF1aXJlZCA9ICh0aGlzLnByb3BzLnJlcXVpcmVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVxdWlyZWQ9PWZhbHNlfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVhZG9ubHkgPSAodGhpcy5wcm9wcy5yZWFkb25seSA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1mYWxzZXx8dGhpcy5wcm9wcy5yZWFkb25seT09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJvd3MgPSAodGhpcy5wcm9wcy5yb3dzID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucm93cz09XCJcIikgPyAzOiB0aGlzLnByb3BzLnJvd3M7XG5cdFx0dmFyIG91dHB1dD1cIlwiO1xuXHRcdHZhciBpbnB1dD0oIFxuXHRcdFx0PHRleHRhcmVhIFxuXHRcdFx0XHRjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfSBcblx0XHRcdFx0dmFsdWU9e3RoaXMudmFsdWV9XG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnByb3BzLmlucHV0Q2hhbmdlZH1cblx0XHRcdFx0cm93cz17dGhpcy5yb3dzfVxuXHRcdFx0XHRkaXNhYmxlZD17dGhpcy5kaXNhYmxlZH1cblx0ICAgICAgICAgIFx0cmVhZE9ubHk9e3RoaXMucmVhZG9ubHl9XG5cdCAgICAgICAgICBcdHJlcXVpcmVkPXt0aGlzLnJlcXVpcmVkfVxuXHRcdFx0Lz5cblx0XHQpO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMubGFibGUgIT09IHVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLmxhYmxlID09XCJcIil7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXY+XG5cdFx0ICAgIFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbFwiPlxuXHRcdCAgICAgIFx0XHRcdHt0aGlzLnByb3BzLmxhYmxlfTwvbGFiZWw+e2lucHV0fVxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIlwiPlxuXHRcdCAgICAgIFx0XHR7aW5wdXR9XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5leHBvcnQgY2xhc3MgRGF0ZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuZGF0ZUluaXQ9dGhpcy5kYXRlSW5pdC5iaW5kKHRoaXMpO1xuXHR9XG5cdGRhdGVJbml0KCl7XG5cdFx0JCgnLmlucHV0LWdyb3VwLmRhdGUgLmRhdGVwaWNrJykuZGF0ZXBpY2tlcih7XG5cdFx0ICAgIHRvZGF5QnRuOiBcImxpbmtlZFwiLFxuXHRcdCAgICBvcmllbnRhdGlvbjogXCJib3R0b20gcmlnaHRcIixcblx0XHQgICAgYXV0b2Nsb3NlOiB0cnVlLFxuXHRcdCAgICB0b2RheUhpZ2hsaWdodDogdHJ1ZVxuXHRcdH0pLm9uKCdjaGFuZ2VEYXRlJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0dmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdpbnB1dCcsIHsgYnViYmxlczogdHJ1ZSB9KTtcblx0XHRcdGUudGFyZ2V0LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHRoaXMudmFsdWUgPSAodGhpcy5wcm9wcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMudmFsdWU7XG5cdFx0dGhpcy5wbGFjZWhvbGRlciA9ICh0aGlzLnByb3BzLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5wbGFjZWhvbGRlcjtcblx0XHR0aGlzLmxhYmxlID0gKHRoaXMucHJvcHMubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLmxhYmxlO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlcXVpcmVkID0gKHRoaXMucHJvcHMucmVxdWlyZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZXF1aXJlZD09ZmFsc2V8fHRoaXMucHJvcHMucmVxdWlyZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZWFkb25seSA9ICh0aGlzLnByb3BzLnJlYWRvbmx5ID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVhZG9ubHk9PWZhbHNlfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXG5cblx0XHR2YXIgb3V0cHV0PVwiXCI7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jb250cm9sIGRhdGVwaWNrXCI6IFwiZm9ybS1jb250cm9sIGRhdGVwaWNrIFwiICt0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHR2YXIgaW5wdXQ9KCBcblx0XHRcdDxpbnB1dFxuXHRcdFx0XHRyZWY9e3RoaXMuZGF0ZUluaXR9IFxuXHRcdFx0XHR0eXBlPVwidGV4dFwiXG5cdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9XG5cdFx0XHRcdHBsYWNlaG9sZGVyPXt0aGlzLnBsYWNlaG9sZGVyfSAgXG5cdFx0XHRcdHZhbHVlPXt0aGlzLnZhbHVlfSBcblx0XHRcdFx0b25DaGFuZ2U9e3RoaXMucHJvcHMuaW5wdXRDaGFuZ2VkfVxuXHRcdFx0XHRkaXNhYmxlZD17dGhpcy5kaXNhYmxlZH1cblx0ICAgICAgICAgIFx0cmVhZE9ubHk9e3RoaXMucmVhZG9ubHl9XG5cdCAgICAgICAgICBcdHJlcXVpcmVkPXt0aGlzLnJlcXVpcmVkfVxuXHRcdFx0XHQvPlxuXG5cdFx0KTtcblxuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy5sYWJsZSA9PVwiXCIpe1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdCAgXHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdCAgXHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWxcIj57dGhpcy5wcm9wcy5sYWJsZX08L2xhYmVsPlxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cCBkYXRlXCI+XG5cdFx0XHRcdFx0XHR7aW5wdXR9XG5cdFx0XHRcdCAgXHRcdDxzcGFuIGNsYXNzTmFtZT1cImlucHV0LWdyb3VwLWFkZG9uXCI+XG5cdFx0XHRcdCAgXHRcdFx0PGkgY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi10aFwiPjwvaT5cblx0XHRcdFx0ICBcdFx0PC9zcGFuPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHQgIFx0KTtcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdG91dHB1dCA9IChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAgZGF0ZVwiPlxuXG5cdFx0XHRcdFx0XHR7aW5wdXR9XG5cdFx0XHRcdCAgXHRcdDxzcGFuIGNsYXNzTmFtZT1cImlucHV0LWdyb3VwLWFkZG9uXCI+XG5cdFx0XHRcdCAgXHRcdFx0PGkgY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi10aFwiPjwvaT5cblx0XHRcdFx0ICBcdFx0PC9zcGFuPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5leHBvcnQgY2xhc3MgQXdlc29tcGxldGVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblxuXHRcdC8qICAgRG8gdGhlIGJpbmQgdGhpbmcgICovXG5cdFx0dGhpcy5jcmVhdGVMaXN0PXRoaXMuY3JlYXRlTGlzdC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZG9jQ2hhbmdlZD10aGlzLmRvY0NoYW5nZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLmNvbXBvbmVudERpZE1vdW50PXRoaXMuY29tcG9uZW50RGlkTW91bnQuYmluZCh0aGlzKTtcblx0XHR0aGlzLmlucHV0Q2hhbmdlPXRoaXMuaW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcblx0XHR0aGlzLmF1dG9jb21wbGV0ZT10aGlzLmF1dG9jb21wbGV0ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY29tcG9uZW50V2lsbFVubW91bnQ9dGhpcy5jb21wb25lbnRXaWxsVW5tb3VudC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMucmVmQ2FsbD10aGlzLnJlZkNhbGwuYmluZCh0aGlzKTtcblx0XHRcblx0XHQvL3RoaXMud29ya29yZGVyT2JqPXRoaXMub25TdGF0dXNDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0LyogICAgICAgICAgZW5kICAgICAgICAgICovXG5cdFx0dGhpcy5pdGVtbGlzdD1bXTtcblx0XHR0aGlzLnN0YXRlPXtpdGVtbGlzdDpbXX07XG5cdFx0dGhpcy5faXNNb3VudGVkPWZhbHNlO1xuXHRcdHZhciBhcmdzPXt9O1xuXHRcdHZhciBvcHRpb25zPXtkb2N0eXBlOnRoaXMucHJvcHMuZG9jdHlwZX07XG5cdFx0dmFyIGZpbHRlcj17fTtcblx0XHRpZiAodGhpcy5wcm9wcy5maWx0ZXI9PXVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLmZpbHRlcj09bnVsbCl7XG5cdFx0XG5cdFx0fWVsc2V7XG5cdFx0XHRmaWx0ZXI9IHRoaXMucHJvcHMuZmlsdGVyO1xuXHRcdH1cblx0XHR0aGlzLmxpc3RUb29sID0gbmV3IHBzLmFwaVRvb2woZmlsdGVyLCBvcHRpb25zICx0aGlzLmRvY0NoYW5nZWQpO1xuXHRcdGlmICh0aGlzLmxpc3RUb29sLml0ZW1zPT09dW5kZWZpbmVkIHx8dGhpcy5saXN0VG9vbC5pdGVtcz09PSAwIHx8dGhpcy5saXN0VG9vbC5pdGVtcz09PW51bGwgKXtcblx0XHR9ZWxzZXtcblx0XHRcdHRoaXMuc3RhdGUubGlzdD10aGlzLmxpc3RUb29sLml0ZW1zO1xuXHRcdH1cblxuXHRcdHRoaXMuY3JlYXRlTGlzdCgpO1xuXHR9XG5cdGRvY0NoYW5nZWQoKXtcblx0XHR0aGlzLmNyZWF0ZUxpc3QoKTtcblx0fVxuXHRjb21wb25lbnREaWRNb3VudCgpe1xuXHRcdHRoaXMuX2lzTW91bnRlZD10cnVlO1xuXHRcdHRoaXMuYXV0b2NvbXBsZXRlKCk7XG5cblx0fVxuXHRjcmVhdGVMaXN0KCl7XG5cdFx0dGhpcy5pdGVtbGlzdD1bXTtcblx0XHQvL2xhYmxlIGFuZCB2YWx1ZVxuXHRcdGlmICh0aGlzLnByb3BzLmRvY2xhYmxlICE9PSB1bmRlZmluZWQgJiYgdGhpcy5saXN0VG9vbC5pdGVtcyAhPT0gdW5kZWZpbmVkICYmIHRoaXMubGlzdFRvb2wuaXRlbXMgIT09IG51bGwpe1xuXHRcdFx0Zm9yKGxldCBpdGVtIG9mIHRoaXMubGlzdFRvb2wuaXRlbXMpe1xuXHRcdFx0XHR2YXIgdGVtcCA9W2l0ZW1bdGhpcy5wcm9wcy5kb2NsYWJsZV0saXRlbVt0aGlzLnByb3BzLmRvY3ZhbHVlXV07XG5cdFx0XHRcdHRoaXMuaXRlbWxpc3QucHVzaCh0ZW1wKTtcblx0XHRcdH1cblx0XHRcdCQoZG9jdW1lbnQpLnRyaWdnZXIoJ2xpc3RMb2FkJyArIHRoaXMucHJvcHMuZG9jdHlwZSk7XG5cdFx0fVxuXHRcdC8vanVzdCBsYWJsZVxuXHRcdGVsc2UgaWYodGhpcy5saXN0VG9vbC5pdGVtcyAhPT0gdW5kZWZpbmVkICYmIHRoaXMubGlzdFRvb2wuaXRlbXMgIT09IG51bGwpe1xuXHRcdFx0Zm9yKGxldCBpdGVtIG9mIHRoaXMubGlzdFRvb2wuaXRlbXMpe1xuXHRcdFx0XHR0aGlzLml0ZW1saXN0LnB1c2goaXRlbVt0aGlzLnByb3BzLmRvY3ZhbHVlXSk7XG5cdFx0XHR9XG5cdFx0XHQkKGRvY3VtZW50KS50cmlnZ2VyKCdsaXN0TG9hZCcgKyB0aGlzLnByb3BzLmRvY3R5cGUucmVwbGFjZShcIiBcIixcIlwiKSk7XG5cdFx0fVxuXHR9XG5cdGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG5cdFx0Ly8gY29uc29sZS5sb2coXCJIRUxMT1wiKTtcblx0XHQvLyB0aGlzLmF3LmRlc3Ryb3koKTtcblx0XHQvLyBkZWxldGUgdGhpcy5hdztcblx0XHQvLyBjb25zb2xlLmxvZyhcIlRFU1RcIik7XG5cdH1cblx0cmVmQ2FsbChpbnB1dCl7XG5cdFx0dGhpcy5pbnB1dD1pbnB1dDtcblx0fVxuXHRhdXRvY29tcGxldGUoaW5wdXQpe1xuXHRcdGlucHV0PXRoaXMuaW5wdXQ7XG5cdFx0dmFyIGNvbmZpZz0ge1xuXHRcdFx0XHRtaW5DaGFyczogMCxcblx0XHRcdFx0bWF4SXRlbXM6IDk5LFxuXHRcdFx0XHRhdXRvRmlyc3Q6IHRydWUsXG5cdFx0XHRcdGZpbHRlcjogQXdlc29tcGxldGUuRklMVEVSX1NUQVJUU1dJVEhcblx0XHRcdH1cblx0XHRpZih0aGlzLnByb3BzLmRvY2xhYmxlICE9PSB1bmRlZmluZWQgKXtcblx0XHRcdGNvbmZpZy5pdGVtPSBmdW5jdGlvbihpdGVtLCBpbnB1dCkge1xuXHRcdFx0XHR2YXIgZCA9IGl0ZW07XG5cdFx0XHRcdHZhciBodG1sID0gXCI8c3Bhbj5cIiArIF9fKGl0ZW0ubGFiZWwpKyBcIjwvc3Bhbj48YnI+PHNwYW4+PHNtYWxsPlwiK2l0ZW0udmFsdWUrXCI8L3NtYWxsPjwvc3Bhbj5cIjtcblx0XHRcdFx0cmV0dXJuICQoJzxsaT48L2xpPicpXG5cdFx0XHRcdFx0LmRhdGEoJ2l0ZW0uYXV0b2NvbXBsZXRlJywgaXRlbSlcblx0XHRcdFx0XHQuaHRtbCgnPGE+PHA+JyArIGh0bWwgKyAnPC9wPjwvYT4nKVxuXHRcdFx0XHRcdC5nZXQoMCk7XG5cdFx0XHR9XG5cblx0XHR9ZWxzZXtcblx0XHRcdGNvbmZpZy5pdGVtPWZ1bmN0aW9uKGl0ZW0sIGlucHV0KSB7XG5cdFx0XHRcdHZhciBkID0gaXRlbTtcblx0XHRcdFx0dmFyIGh0bWwgPSBcIjxzcGFuPlwiICsgX18oaXRlbSkrIFwiPC9zcGFuPlwiO1xuXHRcdFx0XHRyZXR1cm4gJCgnPGxpPjwvbGk+Jylcblx0XHRcdFx0XHQuZGF0YSgnaXRlbS5hdXRvY29tcGxldGUnLCBpdGVtKVxuXHRcdFx0XHRcdC5odG1sKCc8YT48cD4nICsgaHRtbCArICc8L3A+PC9hPicpXG5cdFx0XHRcdFx0LmdldCgwKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5hdyA9IG5ldyBBd2Vzb21wbGV0ZShpbnB1dCxjb25maWcpO1xuXHRcdGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXG5cdFx0XHQnYXdlc29tcGxldGUtc2VsZWN0Y29tcGxldGUnLFxuXHRcdFx0XHR0aGlzLmlucHV0Q2hhbmdlXG5cdFx0KTtcblx0XHQkKGlucHV0KS5jbGljayggZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAodGhpcy5hdy51bC5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHR0aGlzLmF3Lm1pbkNoYXJzID0gMDtcblx0XHRcdFx0dGhpcy5hdy5ldmFsdWF0ZSgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAodGhpcy5hdy51bC5oYXNBdHRyaWJ1dGUoJ2hpZGRlbicpKSB7XG5cdFx0XHRcdHRoaXMuYXcub3BlbigpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHRoaXMuYXcuY2xvc2UoKTtcblx0XHRcdH1cblx0XHR9LmJpbmQodGhpcykpO1xuXHRcdHRoaXMuYXcubGlzdD10aGlzLml0ZW1MaXN0O1xuXHRcdCQoZG9jdW1lbnQpLmJpbmQoJ2xpc3RMb2FkJyArIHRoaXMucHJvcHMuZG9jdHlwZS5yZXBsYWNlKFwiIFwiLFwiXCIpLGZ1bmN0aW9uKCl7XG5cdFx0XHR0aGlzLmF3Lmxpc3Q9dGhpcy5pdGVtbGlzdDtcblx0XHR9LmJpbmQodGhpcykpO1xuXHR9XG5cdGlucHV0Q2hhbmdlKGUpe1xuXHRcdHRoaXMucHJvcHMuaW5wdXRDaGFuZ2VkKGUpO1xuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy50eXBlID0gKHRoaXMucHJvcHMudHlwZSA9PT0gdW5kZWZpbmVkKSA/IFwidGV4dFwiOiB0aGlzLnByb3BzLnR5cGU7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLnBsYWNlaG9sZGVyID0gKHRoaXMucHJvcHMucGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnBsYWNlaG9sZGVyO1xuXHRcdHRoaXMubGFibGUgPSAodGhpcy5wcm9wcy5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMubGFibGU7XG5cdFx0dGhpcy5kaXNhYmxlZCA9ICh0aGlzLnByb3BzLmRpc2FibGVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PWZhbHNlfHx0aGlzLnByb3BzLmRpc2FibGVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVxdWlyZWQgPSAodGhpcy5wcm9wcy5yZXF1aXJlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1mYWxzZXx8dGhpcy5wcm9wcy5yZXF1aXJlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlYWRvbmx5ID0gKHRoaXMucHJvcHMucmVhZG9ubHkgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZWFkb25seT09ZmFsc2V8fHRoaXMucHJvcHMucmVhZG9ubHk9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cblx0XHR2YXIgb3V0cHV0PVwiXCI7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jb250cm9sIGF3ZXNvbXBsZXRlXCI6IFwiZm9ybS1jb250cm9sIGF3ZXNvbXBsZXRlIFwiICt0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHR2YXIgaW5wdXQ9KCA8aW5wdXRcblx0XHRcdFx0XHR2YWx1ZT17dGhpcy52YWx1ZX1cblxuXHRcdFx0XHRcdHR5cGU9e3RoaXMudHlwZX0gXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPXt0aGlzLmNsYXNzTmFtZX0gXG5cdFx0XHRcdFx0cGxhY2Vob2xkZXI9e3RoaXMucGxhY2Vob2xkZXJ9IFxuXHRcdFx0XHRcdHJlZj17dGhpcy5yZWZDYWxsfVxuXHRcdCAgICAgICAgICBcdG9uQ2hhbmdlPXt0aGlzLmlucHV0Q2hhbmdlfVxuXHRcdCAgICAgICAgICBcdGRpc2FibGVkPXt0aGlzLmRpc2FibGVkfVxuXHRcdCAgICAgICAgICBcdHJlYWRPbmx5PXt0aGlzLnJlYWRvbmx5fVxuXHRcdCAgICAgICAgICBcdHJlcXVpcmVkPXt0aGlzLnJlcXVpcmVkfVxuXHRcdCAgICAgICAgICAvPik7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkIHx8IHRoaXMucHJvcHMubGFibGUgPT1cIlwiKXtcblx0XHRcdG91dHB1dCA9IChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIFwiPlxuXHRcdCAgICBcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWxcIj57dGhpcy5wcm9wcy5sYWJsZX08L2xhYmVsPlxuXHRcdCAgICBcdFx0PGRpdiBjbGFzc05hbWU9XCJcIj5cblx0XHQgICAgICBcdFx0XHR7aW5wdXR9XG5cdFx0ICAgIFx0XHQ8L2Rpdj5cblx0XHQgIFx0XHQ8L2Rpdj5cblx0XHQgIFx0KTtcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdG91dHB1dCA9IChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG5cdFx0ICAgICAgXHRcdHtpbnB1dH1cblx0XHQgIFx0XHQ8L2Rpdj5cblx0XHQgIFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbmV4cG9ydCBjbGFzcyBCdXR0b24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cblx0fVxuXG5cdHJlbmRlcigpe1xuXHRcdHRoaXMudHlwZSA9ICh0aGlzLnByb3BzLnR5cGUgPT09IHVuZGVmaW5lZCkgPyBcInRleHRcIjogdGhpcy5wcm9wcy50eXBlO1xuXHRcdHRoaXMudmFsdWUgPSAodGhpcy5wcm9wcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMudmFsdWU7XG5cdFx0dGhpcy5kaXNhYmxlZCA9ICh0aGlzLnByb3BzLmRpc2FibGVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PWZhbHNlfHx0aGlzLnByb3BzLmRpc2FibGVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblx0XHR0aGlzLmNsYXNzTmFtZT0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJidG5cIjogXCJidG4gXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHZhciBpbnB1dD0oIFxuXHRcdFx0PGJ1dHRvbiBcblx0XHRcdFx0dHlwZT17dGhpcy50eXBlfVxuXHRcdFx0XHRjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfSBcblx0XHRcdFx0dmFsdWU9e3RoaXMudmFsdWV9XG5cdFx0XHRcdG9uQ2xpY2s9e3RoaXMucHJvcHMub25DbGlja31cblx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdFx0XHQ+e3RoaXMudmFsdWV9PC9idXR0b24+XG5cdFx0KTtcblxuXG5cdFx0b3V0cHV0ID0gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG5cdCAgICAgIFx0XHR7aW5wdXR9XG5cdCAgXHRcdDwvZGl2PlxuXHQgIFx0KTtcblxuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbiIsIi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZGFsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuc3VibWl0PXRoaXMuc3VibWl0LmJpbmQodGhpcyk7XG5cdH1cblx0c3VibWl0KGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR0aGlzLnByb3BzLnN1Ym1pdChlKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR2YXIgZm9vdGVyPVwiXCI7XG5cdFx0aWYodGhpcy5wcm9wcy5zdWJtaXQhPT0gZmFsc2Upe1xuXHRcdFx0Zm9vdGVyPShcdFx0XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZm9vdGVyXCI+XG5cdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNsb3NlPC9idXR0b24+XG5cdFx0XHRcdFx0PGJ1dHRvbiBcblx0XHRcdFx0XHRcdHR5cGU9XCJzdWJtaXRcIiBcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMuc3VibWl0fSBcblx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiID5cblx0XHRcdFx0XHRcdFx0e3RoaXMucHJvcHMuc3VibWl0VGV4dH1cblx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQpXG5cdFx0fVxuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwgZmFkZSB0ZXh0LWxlZnQgcGFuZWwtZGVmYXVsdFwiIGlkPXt0aGlzLnByb3BzLmlkfSB0YWJJbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiIGFyaWEtbGFiZWxsZWRieT1cImV4YW1wbGVNb2RhbExhYmVsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nXCIgcm9sZT1cImRvY3VtZW50XCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWhlYWRlclwiPlxuXHRcdFx0XHRcdFx0XHQ8aDQgY2xhc3NOYW1lPVwibW9kYWwtdGl0bGVcIiBpZD1cImV4YW1wbGVNb2RhbExhYmVsXCI+e3RoaXMucHJvcHMudGl0bGV9PC9oND5cblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgZGlzcGxheT1cIm5vbmVcIiBjbGFzc05hbWU9XCJjbG9zZSBoaWRlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj5cblx0XHRcdFx0XHRcdFx0PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHlcIj5cblx0XHRcdFx0XHRcdFx0XHR7IHRoaXMucHJvcHMuY2hpbGRyZW4gfVxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0e2Zvb3Rlcn1cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cblxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5pbml0VGFibGU9dGhpcy5pbml0VGFibGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmNvbXBvbmVudERpZFVwZGF0ZT10aGlzLmNvbXBvbmVudERpZFVwZGF0ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY29tcG9uZW50V2lsbFVwZGF0ZT10aGlzLmNvbXBvbmVudFdpbGxVcGRhdGUuYmluZCh0aGlzKTtcblxuXHR9XG5cblx0aW5pdFRhYmxlKCl7XG5cdFx0Ly9cblx0XHQvLyBpZih0aGlzLnRhYmxlICE9PSB1bmRlZmluZWQpe1xuXHRcdC8vIFx0dGhpcy50YWJsZS5kZXN0cm95KCk7XG5cdFx0Ly8gfVxuXHRcdGNvbnNvbGUubG9nKHRoaXMucHJvcHMuY29udGVudCk7XG5cdCAgICB0aGlzLnRhYmxlPSQoXCIjXCIrdGhpcy5wcm9wcy5pZCkuRGF0YVRhYmxlKHtcblx0ICAgIFx0XCJkZXN0cm95XCI6IHRydWUsXG5cdCAgICBcdFwic2Nyb2xsWVwiOiAnNzB2aCcsXG4gICAgICAgIFx0XCJzY3JvbGxDb2xsYXBzZVwiOiB0cnVlLFxuXHQgICAgICAgIFwic2Nyb2xsWFwiOiB0cnVlLFxuXHQgICAgICAgIFwicGFnaW5nXCI6ICAgZmFsc2UsXG5cdCAgICAgICAgXCJzdGF0ZVNhdmVcIjogdHJ1ZSxcblx0ICAgICAgICBcImNvbHVtbnNcIjogdGhpcy5wcm9wcy5jb2x1bW5zLFxuXHQgICAgICAgIFwiaW5mb1wiOiAgICAgZmFsc2Vcblx0ICAgIH0pO1xuXHR9XG5cdGNvbXBvbmVudFdpbGxVcGRhdGUoKXtcblxuXHRcdGlmKHRoaXMudGFibGUgIT09IHVuZGVmaW5lZCl7XG5cdFx0XHRjb25zb2xlLmxvZyhcIkRFU1RST1lcIik7XG5cdFx0XHR0aGlzLnRhYmxlLmRlc3Ryb3koKTtcblx0XHR9XG5cdH1cblx0Y29tcG9uZW50RGlkVXBkYXRlKCl7XG5cdFx0dGhpcy5pbml0VGFibGUoKTtcblx0fVxuXG5cdHJlbmRlcigpe1xuXHRcdHJldHVybihcblxuXHRcdFx0PHRhYmxlXG5cdFx0XHRcdGNsYXNzTmFtZT1cInN0cmlwZSB0YWJsZSB0YWJsZS1ib3JkZXJlZCBwcy1saXN0LXRhYmxlXCIgXG5cdFx0XHRcdHdpZHRoPVwiMTAwJVwiXG5cdFx0XHRcdGlkPXt0aGlzLnByb3BzLmlkfVxuXHRcdFx0XHQ+XG5cdFx0XHRcdHt0aGlzLnByb3BzLmNvbnRlbnR9XG5cdFx0XHQ8L3RhYmxlPlxuXHRcdCk7XG5cdH1cbn0iLCJpbXBvcnQgVGFibGUgZnJvbSAnLi4vdXRpbHMvdGFibGUnXG5pbXBvcnQgRm9ybSBmcm9tICcuLi91dGlscy9mb3JtcydcbmltcG9ydCBNb2RhbCBmcm9tICcuLi91dGlscy9tb2RhbCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ByYXlUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnN0YXRlPXtcblx0XHRcdHNwcmF5aW5nOltdXG5cdFx0fTtcblx0XHR0aGlzLnNwcmF5Q2hhbmdlPXRoaXMuc3ByYXlDaGFuZ2UuYmluZCh0aGlzKTtcblx0XHR0aGlzLnJldHVybkNvbnRlbnQ9dGhpcy5yZXR1cm5Db250ZW50LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jcmVhdGVTcHJheUVudHJ5PXRoaXMuY3JlYXRlU3ByYXlFbnRyeS5iaW5kKHRoaXMpO1xuXHRcdFxuXHRcdHRoaXMuc3ByYXlUb29sID0gbmV3IHBzLmFwaVRvb2wodGhpcy5wcm9wcy5maWx0ZXIse2RvY3R5cGU6J1NwcmF5aW5nJ30sdGhpcy5zcHJheUNoYW5nZSk7XG5cdH1cblxuICBcdHNwcmF5Q2hhbmdlKCl7XG4gIFx0XHRjb25zb2xlLmxvZyh0aGlzLnNwcmF5VG9vbC5pdGVtcyk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7c3ByYXlpbmc6dGhpcy5zcHJheVRvb2wuaXRlbXN9KTtcblx0fVxuXHRyZXR1cm5Db2x1bW5zKCl7XG5cdFx0cmV0dXJuIFtcblx0XHRcdHt0aXRsZTpcIlZpbmV5YXJkXCJ9LFxuXHRcdFx0e3RpdGxlOlwiU2Vhc29uXCJ9LFxuXHRcdFx0e3RpdGxlOlwiRGF0ZVwifSxcblx0XHRcdHt0aXRsZTpcIlNwcmF5IFR5cGVcIn0sXG5cdFx0XHR7dGl0bGU6XCJRdWFudGl0eVwifVxuXHRcdF07XG5cdH1cblx0cmV0dXJuQ29udGVudCgpe1xuXHRcdHZhciBjb250ZW50PVtdO1xuXHRcdGlmKHRoaXMuc3RhdGUuc3ByYXlpbmchPT1udWxsKXtcblx0XHRcdHRoaXMuc3RhdGUuc3ByYXlpbmcubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblx0XHRcdFx0Y29udGVudC5wdXNoKFxuXHRcdFx0XHRcdCg8dHIga2V5PXtpbmRleH0+XG5cdFx0XHRcdFx0XHQ8dGQ+e2l0ZW0udmluZXlhcmR9PC90ZD5cblx0XHRcdFx0XHRcdDx0ZD57aXRlbS5zZWFzb259PC90ZD5cblx0XHRcdFx0XHRcdDx0ZD57aXRlbS5kYXRlfTwvdGQ+XG5cdFx0XHRcdFx0XHQ8dGQ+e2l0ZW0uc3ByYXlfdHlwZX08L3RkPlxuXHRcdFx0XHRcdFx0PHRkPntpdGVtLnF1YW50aXR5fTwvdGQ+XG5cdFx0XHRcdFx0PC90cj4pXG5cdFx0XHRcdCk7XHRcblx0XHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0fVxuXG5cblx0XHRyZXR1cm4gKDx0Ym9keT57Y29udGVudH08L3Rib2R5Pik7XG5cdH1cblx0Y3JlYXRlU3ByYXlFbnRyeShpdGVtKXtcblx0XHRjb25zb2xlLmxvZyhcIkNyZWF0aW5nXCIpO1xuXHRcdGl0ZW0uZGF0ZT1tb21lbnQoaXRlbS5kYXRlLFwiTU0vREQvWVlZWVwiKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcblx0XHR0aGlzLnNwcmF5VG9vbC5jcmVhdGUoaXRlbSxmdW5jdGlvbihpdGVtKXtcblx0XHRcdHBzLnN1Y2Nlc3NBbGVydChcIlNwcmV5aW5nIEVudHJ5IFwiICtpdGVtLm5hbWUrIFwiIGNyZWF0ZWQuXCIpXG5cdFx0fSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dmFyIGNvbHVtbnM9dGhpcy5yZXR1cm5Db2x1bW5zKCk7XG5cdFx0dmFyIGNvbnRlbnQ9dGhpcy5yZXR1cm5Db250ZW50KCk7XG5cdFx0Y29uc29sZS5sb2coY29sdW1ucyk7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdDxUYWJsZSBcblx0XHRcdFx0aWQ9XCJzcHJheVRhYmxlXCJcblx0XHRcdFx0dGl0bGU9XCJTcHJheSBUYWJsZVwiXG5cdFx0XHRcdGNvbnRlbnQ9e2NvbnRlbnR9XG5cdFx0XHRcdGNvbHVtbnM9e2NvbHVtbnN9XG5cdFx0XHQvPlxuXHRcdFx0PFNwcmF5Rm9ybU1vZGFsXG5cdFx0XHRcdGlkPVwiY3JlYXRlU3ByYXlFbnRyeVwiXG5cdFx0XHRcdGNyZWF0ZVNwcmF5RW50cnk9e3RoaXMuY3JlYXRlU3ByYXlFbnRyeX1cblx0XHRcdC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdFxuXHRcdCk7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIFNwcmF5Rm9ybU1vZGFsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXG5cdFx0dGhpcy5zdWJtaXQ9dGhpcy5zdWJtaXQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnN0YXRlPXtcblx0XHRcdHZpbmV5YXJkOlwiXCIsXG5cdFx0XHRzZWFzb246XCJcIixcblx0XHRcdGRhdGU6bW9tZW50KCkuZm9ybWF0KFwiTU0vREQvWVlZWVwiKSxcblx0XHRcdHNwcmF5VHlwZTpcIlwiLFxuXHRcdFx0cXVhbnRpdHk6MFxuXHRcdH1cblx0fVxuXG5cdHN1Ym1pdChlKXtcblx0XHRpZih0aGlzLnN0YXRlLnZpbmV5YXJkPT1cIlwiIHx8dGhpcy5zdGF0ZS5zcHJheV90eXBlPT1cIlwiIHx8IChtb21lbnQodGhpcy5zdGF0ZS5kYXRlLFwiTU0vREQvWVlZWVwiKS5pc1ZhbGlkKCkpIT09dHJ1ZSl7XG5cdFx0XHRjb25zb2xlLmxvZyhcIm5vdCB2YWxpZFwiKTtcblx0XHR9ZWxzZXtcblx0XHRcdHZhciBjb3B5PXBzLmNsb25lKHRoaXMuc3RhdGUpO1xuXHRcdFx0JCgnIycrIHRoaXMucHJvcHMuaWQpLm1vZGFsKCdoaWRlJylcblx0XHRcdHRoaXMuc3RhdGU9e1xuXHRcdFx0XHR2aW5leWFyZDpcIlwiLFxuXHRcdFx0XHRzZWFzb246XCJcIixcblx0XHRcdFx0ZGF0ZTptb21lbnQoKS5mb3JtYXQoXCJNTS9ERC9ZWVlZXCIpLFxuXHRcdFx0XHRzcHJheV90eXBlOlwiXCIsXG5cdFx0XHRcdHF1YW50aXR5OjBcblx0XHRcdH1cblx0XHRcdHRoaXMuc2V0U3RhdGUodGhpcy5zdGF0ZSk7XG5cdFx0XHRjb25zb2xlLmxvZyhcIklOIFNVQk1JVFwiKTtcblx0XHRcdHRoaXMucHJvcHMuY3JlYXRlU3ByYXlFbnRyeShjb3B5KTtcblx0XHR9XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dmFyIGZpZWxkcz1bXHRcdFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImF1dG9Db21wbGV0ZVwiLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7dmluZXlhcmQ6ZS50YXJnZXQudmFsdWV9KVxuXHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdHZhbHVlOnRoaXMuc3RhdGUudmluZXlhcmQsXG5cdFx0XHRcdHJlcXVpcmVkOnRydWUsXG5cdFx0XHRcdGxhYmxlOlwiVmluZXlhcmRcIixcblx0XHRcdFx0ZG9jdHlwZTpcIlZpbmV5YXJkXCIsXG5cdFx0XHRcdGRvY3ZhbHVlOlwibmFtZVwiXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImF1dG9Db21wbGV0ZVwiLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7c2Vhc29uOmUudGFyZ2V0LnZhbHVlfSlcblx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHR2YWx1ZTp0aGlzLnN0YXRlLnNlYXNvbixcblx0XHRcdFx0cmVxdWlyZWQ6dHJ1ZSxcblx0XHRcdFx0bGFibGU6XCJTZWFzb25cIixcblx0XHRcdFx0ZG9jdHlwZTpcIlNlYXNvblwiLFxuXHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJkYXRlXCIsXG5cdFx0XHRcdHJlcXVpcmVkOnRydWUsXG5cdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtkYXRlOmUudGFyZ2V0LnZhbHVlfSk7XG5cdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0dmFsdWU6dGhpcy5zdGF0ZS5kYXRlLFxuXHRcdFx0XHRsYWJsZTpcIkRhdGVcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJhdXRvQ29tcGxldGVcIixcblx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpeyBcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtzcHJheV90eXBlOmUudGFyZ2V0LnZhbHVlfSlcblx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHR2YWx1ZTp0aGlzLnN0YXRlLnNwcmF5X3R5cGUsXG5cdFx0XHRcdHJlcXVpcmVkOnRydWUsXG5cdFx0XHRcdGxhYmxlOlwiU3ByYXkgVHlwZVwiLFxuXHRcdFx0XHRkb2N0eXBlOlwiU3ByYXkgVHlwZVwiLFxuXHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJpbnB1dFwiLFxuXHRcdFx0XHRjbGFzc05hbWU6XCJ2aW5leWFyZC1pbnB1dFwiLFxuXHRcdFx0XHR0eXBlOlwibnVtYmVyXCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtxdWFudGl0eTplLnRhcmdldC52YWx1ZX0pXG5cdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0dmFsdWU6dGhpcy5zdGF0ZS5xdWFudGl0eSxcblx0XHRcdFx0bGFibGU6XCJxdWFudGl0eVwiXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImJ1dHRvblwiLFxuXHRcdFx0XHR0eXBlOlwic3VibWl0XCIsXG5cdFx0XHRcdHZhbHVlOlwiQ3JlYXRlIFNwcmF5aW5nIEVudHJ5XCIsXG5cdFx0XHRcdGNsYXNzTmFtZTpcImJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIixcblx0XHRcdFx0b25DbGljazp0aGlzLnN1Ym1pdFxuXHRcdFx0fVxuXG5cblx0XHRdXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxiciAvPlx0XHRcdFx0XG5cdFx0XHRcdDxhIFxuXHRcdFx0XHRcdGhyZWY9XCIjXCIgXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCJcblx0XHRcdFx0XHRvbkNsaWNrPXtmdW5jdGlvbigpeyQoJyMnKyB0aGlzLnByb3BzLmlkKS5tb2RhbCgpfS5iaW5kKHRoaXMpfVxuXHRcdFx0XHRcdD5cblx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLXBsdXNcIj48L3NwYW4+IENyZWF0ZSBTcHJheWluZyBFbnRyeTwvYT5cblx0XHRcdFx0PE1vZGFsIFxuXHRcdFx0XHRcdGlkPXt0aGlzLnByb3BzLmlkfSBcblx0XHRcdFx0XHRzdWJtaXRUZXh0PVwiU3VibWl0XCIgXG5cdFx0XHRcdFx0dGl0bGU9XCJDcmVhdGUgTmV3IFNwcmF5aW5nIEVudHJ5XCJcblx0XHRcdFx0XHRzdWJtaXQ9e2ZhbHNlfVxuXHRcdFx0XHRcdD5cblxuXHRcdFx0XHRcdDxGb3JtXG5cdFx0XHRcdFx0XHRpZD1cIkNyZWF0ZVNwcmF5aW5nRW50cnlGb3JtXCJcblx0XHRcdFx0XHRcdHR5cGU9XCJob3Jpem9udGFsXCJcblx0XHRcdFx0XHRcdGZpZWxkcz17ZmllbGRzfVxuXG5cdFx0XHRcdFx0Lz5cblxuXHRcdFx0XHQ8L01vZGFsPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSIsIi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuaW1wb3J0IEZvcm0gZnJvbSAnLi4vLi4vcHVibGljL2pzL21vZHVsZXMvdXRpbHMvZm9ybXMnXG5pbXBvcnQgQWNvcmRpYW4gZnJvbSAnLi4vLi4vcHVibGljL2pzL21vZHVsZXMvdXRpbHMvYWNvcmRpYW4nXG5pbXBvcnQgQWNvcmRpYW5Db250ZW50IGZyb20gJy4uLy4uL3B1YmxpYy9qcy9tb2R1bGVzL3V0aWxzL2Fjb3JkaWFuQ29udGVudCdcbmltcG9ydCBEb2N0eXBlRm9ybSBmcm9tICcuLi8uLi9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9kb2N0eXBlRm9ybSdcbmltcG9ydCBTcHJheVRhYmxlIGZyb20gJy4uLy4uL3B1YmxpYy9qcy9tb2R1bGVzL3ZpbmV5YXJkL3NwcmF5VGFibGUnXG5cblxuXG4vL2NvbnN0IGFwcD0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpO1xuY29uc3QgYXBwPSAkKCcjYXBwJylbMF07XG5cbmNsYXNzIENyZWF0ZVdvcmtvcmRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0fVxuXHQvLzxBZmZpeFdyYXBwZXIgY2xhc3NOYW1lPVwic3RpY2t5X3N1Ym5hdiB0ZXh0LWNlbnRlclwiICBvZmZzZXQ9ezE0MH0gaGVpZ2h0PVwiNDBweFwiPjwvQWZmaXhXcmFwcGVyPlxuXHRzb21lRnVuY3Rpb24oKXtcblxuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHZhciBmaWVsZHM9W1xuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImhlYWRlclwiLFxuXHRcdFx0XHRsYWJsZTpcIlRFU1RJTkdcIlxuXHRcdFx0fSxcblxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImlucHV0XCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiB0aGlzLnNvbWVGdW5jdGlvbixcblx0XHRcdFx0bGFibGU6XCJ0ZXN0XCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwibGFibGVcIixcblx0XHRcdFx0bGFibGU6XCJURVNYU0RGXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiaW5wdXRcIixcblx0XHRcdFx0b25DaGFuZ2U6IHRoaXMuc29tZUZ1bmN0aW9uLFxuXHRcdFx0XHRsYWJsZTpcInRlc3QyXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiZGF0ZVwiLFxuXHRcdFx0XHRvbkNoYW5nZTogdGhpcy5zb21lRnVuY3Rpb24sXG5cdFx0XHRcdGxhYmxlOlwiRGF0ZVwiXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcInNlbGVjdFwiLFxuXHRcdFx0XHRvbkNoYW5nZTogdGhpcy5zb21lRnVuY3Rpb24sXG5cdFx0XHRcdGxhYmxlOlwidGVzdDJcIixcblx0XHRcdFx0b3B0aW9uczpbXG5cdFx0XHRcdFx0eyBcblx0XHRcdFx0XHRcdGdyb3VwOiBcInRoaW5nXCIsXG5cdFx0XHRcdFx0XHRvcHRpb25zOiBbXG5cdFx0XHRcdFx0XHRcdFwib25lXCIsXG5cdFx0XHRcdFx0XHRcdFwidHdvXCIsXG5cdFx0XHRcdFx0XHRcdFwidGhyZWVcIlxuXHRcdFx0XHRcdFx0XVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0Z3JvdXA6IFwidGhpbmcyXCIsXG5cdFx0XHRcdFx0XHRvcHRpb25zOiBbXG5cdFx0XHRcdFx0XHRcdFwib25lXCIsXG5cdFx0XHRcdFx0XHRcdFwidHdvXCIsXG5cdFx0XHRcdFx0XHRcdFwidGhyZWVcIlxuXHRcdFx0XHRcdFx0XVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJzZWxlY3RcIixcblx0XHRcdFx0b25DaGFuZ2U6IHRoaXMuc29tZUZ1bmN0aW9uLFxuXHRcdFx0XHRsYWJsZTpcInRlc3QyXCIsXG5cdFx0XHRcdHZhbHVlOlwidHdvXCIsXG5cdFx0XHRcdG9wdGlvbnM6W1xuXHRcdFx0XHRcdFwib25lXCIsXG5cdFx0XHRcdFx0XCJ0d29cIixcblx0XHRcdFx0XHRcInRocmVlXCJcblx0XHRcdFx0XVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJjaGVja1wiLFxuXHRcdFx0XHRjbGFzc05hbWU6XCJiaWctY2hlY2tib3hcIixcblx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe2NvbnNvbGUubG9nKGUudGFyZ2V0LmNoZWNrZWQpfSxcblx0XHRcdFx0bGFibGU6XCJ0aGlzIGlzIGEgdGVzdFwiXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIlRlc3QgVGV4dCBBcmVhXCIsXG5cdFx0XHRcdGZpZWxkOlwidGV4dGFyZWFcIixcblx0XHRcdFx0Y2xhc3NOYW1lOlwiXCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiB0aGlzLnNvbWVGdW5jdGlvblxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJhdXRvQ29tcGxldGVcIixcblx0XHRcdFx0b25DaGFuZ2U6IHRoaXMuc29tZUZ1bmN0aW9uLFxuXHRcdFx0XHRsYWJsZTpcIlZpbmV5YXJkXCIsXG5cdFx0XHRcdGRvY3R5cGU6XCJWaW5leWFyZFwiLFxuXHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJhdXRvQ29tcGxldGVcIixcblx0XHRcdFx0b25DaGFuZ2U6IHRoaXMuc29tZUZ1bmN0aW9uLFxuXHRcdFx0XHRsYWJsZTpcIkN1c3RvbWVyXCIsXG5cdFx0XHRcdGRvY3R5cGU6XCJDdXN0b21lclwiLFxuXHRcdFx0XHRkb2NsYWJsZTpcImZ1bGxfbmFtZVwiLFxuXHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIlxuXHRcdFx0fVxuXHRcdF1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0PEZvcm1cblx0XHRcdFx0dHlwZT1cImhvcml6b250YWxcIlxuXHRcdFx0XHRmaWVsZHM9e2ZpZWxkc31cblx0XHRcdFx0aWQ9XCJ0aGluZ1wiXG5cdFx0XHQ+XG5cblx0XHRcdDwvRm9ybT5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuY2xhc3MgVGVzdEJybyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnRhc2tDaGFuZ2VkPXRoaXMudGFza0NoYW5nZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnNwcmF5aW5nRmVpbGRzID0gbmV3IHBzLmFwaVRvb2woe25hbWU6J1NwcmF5aW5nJ30se2RvY3R5cGU6J0RvY1R5cGUnfSx0aGlzLnRhc2tDaGFuZ2VkKTtcblx0fVxuXHR0YXNrQ2hhbmdlZCgpe1xuXHRcdGNvbnNvbGUubG9nKHRoaXMuc3ByYXlpbmdGZWlsZHMuaXRlbXMpO1xuICBcdH1cblx0c29tZUZ1bmN0aW9uKCl7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0dGVzdFxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5jb25zdCBhcHAyPSAkKCcjYXBwMicpWzBdO1xuKGZ1bmN0aW9uKCl7XG5cdHZhciBmaWx0ZXI9e307XG5cdGZyYXBwZS5yZWFkeShmdW5jdGlvbigpe1xuXHRcdFJlYWN0RE9NLnJlbmRlciggXG5cdFx0XHQ8ZGl2PjxEb2N0eXBlRm9ybSBcblx0XHRcdFx0aWQ9XCJjcmVhdGVQcnVuRW50cnlcIiBcblx0XHRcdFx0ZG9jdHlwZT1cIlBydW5pbmdcIlxuXHRcdFx0XHRzZWFzb249e3thY3RpdmU6MX19XG5cdFx0XHRcdG5vdGU9e3tcblx0XHRcdFx0XHRhY3RpdmU6MSxcblx0XHRcdFx0XHR0eXBlOlwidGV4dGFyZWFcIiBcblx0XHRcdFx0fX1cblx0XHRcdFx0dHlwZT17e2FjdGl2ZToxfX1cblx0XHRcdFx0Yl9sb2NrPXt7YWN0aXZlOjF9fVxuXHRcdFx0XHRyZW1vdmVkPXt7YWN0aXZlOjF9fVxuXHRcdFx0XHRwcmVfcHJ1bmU9e3thY3RpdmU6MX19XG5cdFx0XHRcdHRhcF9yZW1vdmVkPXt7YWN0aXZlOjF9fVxuXHRcdFx0Lz4gPENyZWF0ZVdvcmtvcmRlciAvPjwvZGl2Plx0LCBhcHAyICk7XG5cdH0pXG5cbn0pKCk7XG5cbi8vIGNvbnN0IGFwcDI9ICQoJyNhcHAyJylbMF07XG4vLyAoZnVuY3Rpb24oKXtcbi8vIFx0dmFyIGZpbHRlcj17fTtcbi8vIFx0ZnJhcHBlLnJlYWR5KGZ1bmN0aW9uKCl7XG4vLyBcdFx0UmVhY3RET00ucmVuZGVyKCA8U3ByYXlUYWJsZSBmaWx0ZXI9e2ZpbHRlcn0gLz4gLCBhcHAyICk7XG4vLyBcdH0pXG5cbi8vIH0pKCk7XG5cblxuXG4iXX0=
