(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _doctypeForm = require('../utils/doctypeForm');

var _doctypeForm2 = _interopRequireDefault(_doctypeForm);

var _table = require('../utils/table');

var _table2 = _interopRequireDefault(_table);

var _modal = require('../utils/modal');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DocTable = function (_React$Component) {
	_inherits(DocTable, _React$Component);

	function DocTable(props) {
		_classCallCheck(this, DocTable);

		var _this = _possibleConstructorReturn(this, (DocTable.__proto__ || Object.getPrototypeOf(DocTable)).call(this, props));

		_this.returnColumns = _this.returnColumns.bind(_this);
		_this.tableChange = _this.tableChange.bind(_this);
		_this.returnContent = _this.returnContent.bind(_this);
		_this.editableContent = _this.editableContent.bind(_this);
		console.log(_this.props.filter);
		_this.tableTool = new ps.apiTool(_this.props.filter, { doctype: _this.props.doctype }, _this.tableChange);
		_this.state = {
			items: _this.tableTool.items,
			currentItem: {},
			formMode: "create"

		};
		_this.modalID = _this.props.id + "_form_modal";
		return _this;
	}

	_createClass(DocTable, [{
		key: 'tableChange',
		value: function tableChange() {
			this.setState({ items: this.tableTool.items });
		}
	}, {
		key: 'returnColumns',
		value: function returnColumns() {
			var columns = [];
			for (var x = 0; x < this.props.config.length; x++) {
				var item = this.props.config[x];
				columns.push({ title: item.lable });
			}
			if (this.props.editable) {
				columns.push({ title: "Edit" });
			}

			return columns;
		}
	}, {
		key: 'returnContent',
		value: function returnContent() {
			var content = [];
			if (this.state.items !== null) {
				this.state.items.map(function (item, index) {
					var tdcontent = [];
					for (var x = 0; x < this.props.config.length; x++) {
						var config = this.props.config[x];
						if (config.href) {
							tdcontent.push(React.createElement(
								'td',
								{ key: this.props.id + index + "_" + x },
								React.createElement(
									'a',
									{ href: item[config.href] },
									item[config.value]
								)
							));
						} else {
							tdcontent.push(React.createElement(
								'td',
								null,
								item[config.value]
							));
						}
					}
					if (this.props.editable) {
						tdcontent.push(React.createElement(
							'td',
							{ key: this.props.id + index + "_" + x },
							React.createElement(
								'button',
								{
									type: 'button',
									className: 'btn btn-default inline-task',
									onClick: function () {
										this.setState({
											formMode: "edit",
											currentItem: item
										});
										$("#" + this.modalID).modal();
									}.bind(this)

								},
								'Edit ',
								React.createElement('span', { className: 'glyphicon glyphicon-edit', 'aria-hidden': 'true' })
							)
						));
					}
					content.push(React.createElement(
						'tr',
						{ key: this.props.id + index },
						tdcontent
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
		key: 'editableContent',
		value: function editableContent() {
			var formProps = {};
			formProps.doctype = this.props.doctype;
			for (var x = 0; x < this.props.config.length; x++) {
				var config = this.props.config[x];
				formProps[config.value] = config;
			}
			var form = React.createElement(_doctypeForm2.default, {
				close: function () {
					$("#" + this.modalID).modal('hide');
				}.bind(this),
				itemChange: function (item) {
					this.setState({ currentItem: item });
				}.bind(this),
				create: function (item, doctype) {
					for (var x = 0; x < this.props.config.length; x++) {
						var config = this.props.config[x];
						if (config.default) {
							item[config.value] = config.default;
						}
					}
					item.doctype = doctype;
					this.tableTool.create(item);
					$('#' + this.modalID).modal('toggle');
				}.bind(this),
				edit: function (item) {
					this.tableTool.update(item);
					$('#' + this.modalID).modal('toggle');
				}.bind(this),
				'delete': function (item) {
					this.tableTool.delete(item);
					$('#' + this.modalID).modal('toggle');
				}.bind(this),
				mode: this.state.formMode,
				item: this.state.currentItem,
				id: 'thing'
			});

			//loop the config to create form items

			form = React.cloneElement(form, formProps);
			return React.createElement(
				'div',
				null,
				React.createElement(
					'button',
					{
						type: 'button',
						className: 'btn btn-primary',
						onClick: function () {
							this.setState({
								formMode: "create",
								currentItem: {}
							});
							$("#" + this.modalID).modal();
						}.bind(this)
					},
					'Create ',
					this.props.doctype,
					' ',
					React.createElement('span', { className: 'glyphicon glyphicon-plus', 'aria-hidden': 'true' })
				),
				React.createElement(
					_modal2.default,
					{
						id: this.modalID,
						submitText: 'Submit',
						title: "Create " + this.props.doctype,
						submit: false
					},
					form
				)
			);
		}
	}, {
		key: 'someFunction',
		value: function someFunction() {}
	}, {
		key: 'render',
		value: function render() {
			var form = "";
			if (this.props.editable) {
				form = this.editableContent();
			}
			var columns = this.returnColumns();
			var content = this.returnContent();
			return React.createElement(
				'div',
				null,
				React.createElement(_table2.default, {
					id: this.props.id,
					title: 'Spray Table',
					content: content,
					columns: columns
				}),
				form
			);
		}
	}]);

	return DocTable;
}(React.Component);

exports.default = DocTable;

},{"../utils/doctypeForm":2,"../utils/modal":4,"../utils/table":5}],2:[function(require,module,exports){
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
			console.log("FROM DOCTYPE FORM");
			console.log(this.props.item);
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
					onClick: function (e) {
						e.preventDefault();this.props.close();
					}.bind(this)
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

},{"../utils/forms":3}],3:[function(require,module,exports){
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
			var config = {
				"destroy": true,
				"scrollY": '70vh',
				"scrollCollapse": true,
				"scrollX": true,
				"paging": false,
				"stateSave": true,
				"columns": this.props.columns,
				"info": false
			};
			if (this.props.search) {
				config.searching = true;
			} else {
				config.searching = false;
			}
			this.table = $("#" + this.props.id).DataTable(config);
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

var _docTable = require('../../public/js/modules/utils/docTable');

var _docTable2 = _interopRequireDefault(_docTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import SprayTable from '../../public/js/modules/vineyard/sprayTable'


//const app= document.getElementById('app');
var app = $('#app')[0];

// class CreateWorkorder extends React.Component{
// 	constructor(props){
// 		super(props);
// 	}
// 	//<AffixWrapper className="sticky_subnav text-center"  offset={140} height="40px"></AffixWrapper>
// 	someFunction(){

// 	}
// 	render(){
// 		var fields=[
// 			{
// 				field:"header",
// 				lable:"TESTING"
// 			},

// 			{
// 				field:"input",
// 				onChange: this.someFunction,
// 				lable:"test"
// 			},
// 			{
// 				field:"lable",
// 				lable:"TESXSDF"
// 			},
// 			{
// 				field:"input",
// 				onChange: this.someFunction,
// 				lable:"test2"
// 			},
// 			{
// 				field:"date",
// 				onChange: this.someFunction,
// 				lable:"Date"
// 			},
// 			{
// 				field:"select",
// 				onChange: this.someFunction,
// 				lable:"test2",
// 				options:[
// 					{ 
// 						group: "thing",
// 						options: [
// 							"one",
// 							"two",
// 							"three"
// 						]
// 					},
// 					{
// 						group: "thing2",
// 						options: [
// 							"one",
// 							"two",
// 							"three"
// 						]
// 					}
// 				]
// 			},
// 			{
// 				field:"select",
// 				onChange: this.someFunction,
// 				lable:"test2",
// 				value:"two",
// 				options:[
// 					"one",
// 					"two",
// 					"three"
// 				]
// 			},
// 			{
// 				field:"check",
// 				className:"big-checkbox",
// 				onChange: function(e){console.log(e.target.checked)},
// 				lable:"this is a test"
// 			},
// 			{
// 				lable:"Test Text Area",
// 				field:"textarea",
// 				className:"",
// 				onChange: this.someFunction
// 			},
// 			{
// 				field:"autoComplete",
// 				onChange: this.someFunction,
// 				lable:"Vineyard",
// 				doctype:"Vineyard",
// 				docvalue:"name"
// 			},
// 			{
// 				field:"autoComplete",
// 				onChange: this.someFunction,
// 				lable:"Customer",
// 				doctype:"Customer",
// 				doclable:"full_name",
// 				docvalue:"name"
// 			}
// 		]
// 		return(
// 			<div>
// 			<Form
// 				type="horizontal"
// 				fields={fields}
// 				id="thing"
// 			>

// 			</Form>
// 			</div>
// 		);
// 	}
// }


/*			<DoctypeForm 
				close={this.close}
				itemChange={this.onChange}
				create={this.create}
				edit={this.update}
				delete={this.delete}
				mode={this.state.formMode}
				item={item}
				id={this.props.workorder}

				doctype="Spraying"
				season={ {active:1}}
				note={ {
					active:1,
					type:"textarea" 
				}} 
				spray_type={ {active:1}}
			/> 	*/

/*jshint ignore:start */
// import Form from '../../public/js/modules/utils/forms'
// import Acordian from '../../public/js/modules/utils/acordian'
// import AcordianContent from '../../public/js/modules/utils/acordianContent'
var app2 = $('#app2')[0];
(function () {
	var filter = {};
	frappe.ready(function () {
		ReactDOM.render(React.createElement(_docTable2.default, {
			doctype: 'Spraying',
			id: 'doctable',
			filter: {},
			config: [{
				lable: "Vineyard",
				value: "vineyard",
				href: "vineyard_route",
				active: 0,
				default: "CRV Vines"
			}, {
				lable: "Season",
				value: "season",
				active: 1
			}, {
				lable: "Note",
				value: "note",
				active: 1,
				type: "textarea"
			}, {
				lable: "Spray Type",
				value: "spray_type",
				active: 1
			}],
			editable: 1
		}), app2);
	});
})();

// const app2= $('#app2')[0];
// (function(){
// 	var filter={};
// 	frappe.ready(function(){
// 		ReactDOM.render( 
// 			<div><DoctypeForm 
// 				id="createPrunEntry" 
// 				doctype="Pruning"
// 				season={  {active:1}  }
// 				note={ {
// 					active:1,
// 					type:"textarea" 
// 				}}
// 				type={ {active:1} }
// 				b_lock={ {active:1}}
// 				removed={ {active:1}}
// 				pre_prune={ {active:1}}
// 				tap_removed={ {active:1}}
// 			/> <CreateWorkorder /></div>	, app2 );
// 	})

// })();

// const app2= $('#app2')[0];
// (function(){
// 	var filter={};
// 	frappe.ready(function(){
// 		ReactDOM.render( <SprayTable filter={filter} /> , app2 );
// 	})

// })();

},{"../../public/js/modules/utils/docTable":1}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdXRpbHMvZG9jVGFibGUuanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL3V0aWxzL2RvY3R5cGVGb3JtLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9mb3Jtcy5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdXRpbHMvbW9kYWwuanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL3V0aWxzL3RhYmxlLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy93d3cvcGxheWdyb3VuZC9QbGF5R3JvdW5kLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUIsUTs7O0FBQ3BCLG1CQUFZLEtBQVosRUFBa0I7QUFBQTs7QUFBQSxrSEFDWCxLQURXOztBQUVqQixRQUFLLGFBQUwsR0FBbUIsTUFBSyxhQUFMLENBQW1CLElBQW5CLE9BQW5CO0FBQ0EsUUFBSyxXQUFMLEdBQWlCLE1BQUssV0FBTCxDQUFpQixJQUFqQixPQUFqQjtBQUNBLFFBQUssYUFBTCxHQUFtQixNQUFLLGFBQUwsQ0FBbUIsSUFBbkIsT0FBbkI7QUFDQSxRQUFLLGVBQUwsR0FBcUIsTUFBSyxlQUFMLENBQXFCLElBQXJCLE9BQXJCO0FBQ0EsVUFBUSxHQUFSLENBQVksTUFBSyxLQUFMLENBQVcsTUFBdkI7QUFDQSxRQUFLLFNBQUwsR0FBaUIsSUFBSSxHQUFHLE9BQVAsQ0FBZSxNQUFLLEtBQUwsQ0FBVyxNQUExQixFQUFpQyxFQUFDLFNBQVEsTUFBSyxLQUFMLENBQVcsT0FBcEIsRUFBakMsRUFBOEQsTUFBSyxXQUFuRSxDQUFqQjtBQUNB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UDtBQUVDLFdBQU0sUUFGUDtBQUdDLFlBQU87QUFIUixJQVJPLEVBYVA7QUFDQyxXQUFNLE1BRFA7QUFFQyxXQUFNLE1BRlA7QUFHQyxZQUFPLENBSFI7QUFJQyxVQUFLO0FBSk4sSUFiTyxFQW1CUDtBQUNDLFdBQU0sWUFEUDtBQUVDLFdBQU0sWUFGUDtBQUdDLFlBQU87QUFIUixJQW5CTyxDQUpUO0FBNkJDLGFBQVU7QUE3QlgsSUFERCxFQWdDRSxJQWhDRjtBQWlDQSxFQWxDRDtBQW9DQSxDQXRDRDs7QUF5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IERvY3R5cGVGb3JtIGZyb20gJy4uL3V0aWxzL2RvY3R5cGVGb3JtJ1xuaW1wb3J0IFRhYmxlIGZyb20gJy4uL3V0aWxzL3RhYmxlJ1xuaW1wb3J0IE1vZGFsIGZyb20gJy4uL3V0aWxzL21vZGFsJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2NUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnJldHVybkNvbHVtbnM9dGhpcy5yZXR1cm5Db2x1bW5zLmJpbmQodGhpcyk7XG5cdFx0dGhpcy50YWJsZUNoYW5nZT10aGlzLnRhYmxlQ2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5yZXR1cm5Db250ZW50PXRoaXMucmV0dXJuQ29udGVudC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZWRpdGFibGVDb250ZW50PXRoaXMuZWRpdGFibGVDb250ZW50LmJpbmQodGhpcyk7XG5cdFx0Y29uc29sZS5sb2codGhpcy5wcm9wcy5maWx0ZXIpO1xuXHRcdHRoaXMudGFibGVUb29sID0gbmV3IHBzLmFwaVRvb2wodGhpcy5wcm9wcy5maWx0ZXIse2RvY3R5cGU6dGhpcy5wcm9wcy5kb2N0eXBlfSx0aGlzLnRhYmxlQ2hhbmdlKTtcblx0XHR0aGlzLnN0YXRlPXtcblx0XHRcdGl0ZW1zOnRoaXMudGFibGVUb29sLml0ZW1zLFxuXHRcdFx0Y3VycmVudEl0ZW06e30sXG5cdFx0XHRmb3JtTW9kZTpcImNyZWF0ZVwiXG5cblx0XHR9O1xuXHRcdHRoaXMubW9kYWxJRD10aGlzLnByb3BzLmlkK1wiX2Zvcm1fbW9kYWxcIjtcblx0fVxuICBcdHRhYmxlQ2hhbmdlKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7aXRlbXM6dGhpcy50YWJsZVRvb2wuaXRlbXN9KTtcblx0fVxuXHRyZXR1cm5Db2x1bW5zKCl7XG5cdFx0dmFyIGNvbHVtbnMgPVtdO1xuXHRcdGZvcih2YXIgeD0wOyB4IDwgdGhpcy5wcm9wcy5jb25maWcubGVuZ3RoOyB4Kyspe1xuXHRcdFx0dmFyIGl0ZW09dGhpcy5wcm9wcy5jb25maWdbeF07XG5cdFx0XHRjb2x1bW5zLnB1c2goe3RpdGxlOml0ZW0ubGFibGV9KTtcblx0XHR9XG5cdFx0aWYodGhpcy5wcm9wcy5lZGl0YWJsZSl7XG5cdFx0XHRjb2x1bW5zLnB1c2goe3RpdGxlOlwiRWRpdFwifSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNvbHVtbnM7XG5cdH1cblx0cmV0dXJuQ29udGVudCgpe1xuXHRcdHZhciBjb250ZW50PVtdO1xuXHRcdGlmKHRoaXMuc3RhdGUuaXRlbXMhPT1udWxsKXtcblx0XHRcdHRoaXMuc3RhdGUuaXRlbXMubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblx0XHRcdFx0dmFyIHRkY29udGVudD1bXTtcblx0XHRcdFx0Zm9yKHZhciB4PTA7IHggPCB0aGlzLnByb3BzLmNvbmZpZy5sZW5ndGg7IHgrKyl7XG5cdFx0XHRcdFx0dmFyIGNvbmZpZz10aGlzLnByb3BzLmNvbmZpZ1t4XTtcblx0XHRcdFx0XHRpZihjb25maWcuaHJlZil7XG5cdFx0XHRcdFx0XHR0ZGNvbnRlbnQucHVzaCg8dGQga2V5PXt0aGlzLnByb3BzLmlkICsgaW5kZXggKyBcIl9cIiArIHh9ID48YSBocmVmPXtpdGVtW2NvbmZpZy5ocmVmXX0gPntpdGVtW2NvbmZpZy52YWx1ZV19PC9hPjwvdGQ+KVxuXHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0dGRjb250ZW50LnB1c2goPHRkPntpdGVtW2NvbmZpZy52YWx1ZV19PC90ZD4pXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKHRoaXMucHJvcHMuZWRpdGFibGUpe1xuXHRcdFx0XHRcdHRkY29udGVudC5wdXNoKFxuXHRcdFx0XHRcdFx0PHRkIGtleT17dGhpcy5wcm9wcy5pZCArIGluZGV4ICsgXCJfXCIgKyB4fSA+XG5cdFx0XHRcdFx0XHRcdDxidXR0b24gXG5cdFx0XHRcdFx0XHRcdFx0dHlwZT1cImJ1dHRvblwiIFxuXHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdCBpbmxpbmUtdGFza1wiXG5cdFx0XHRcdFx0XHRcdFx0b25DbGljaz17XG5cdFx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbigpe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRmb3JtTW9kZTpcImVkaXRcIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjdXJyZW50SXRlbTppdGVtXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkKFwiI1wiK3RoaXMubW9kYWxJRCkubW9kYWwoKTtcblx0XHRcdFx0XHRcdFx0XHRcdH0uYmluZCh0aGlzKVxuXHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0RWRpdCA8c3BhbiBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLWVkaXRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XG5cdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXG5cdFx0XHRcdFx0XHQ8L3RkPlxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29udGVudC5wdXNoKChcblx0XHRcdFx0XHQ8dHIga2V5PXt0aGlzLnByb3BzLmlkICsgaW5kZXh9PlxuXHRcdFx0XHRcdFx0e3RkY29udGVudH1cblx0XHRcdFx0XHQ8L3RyPlxuXHRcdFx0XHQpKTtcdFxuXHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHR9XG5cdFx0cmV0dXJuICg8dGJvZHk+e2NvbnRlbnR9PC90Ym9keT4pO1xuXHR9XG5cdGVkaXRhYmxlQ29udGVudCgpe1xuXHRcdHZhciBmb3JtUHJvcHM9e307XG5cdFx0Zm9ybVByb3BzLmRvY3R5cGU9dGhpcy5wcm9wcy5kb2N0eXBlO1xuXHRcdGZvcih2YXIgeD0wOyB4IDwgdGhpcy5wcm9wcy5jb25maWcubGVuZ3RoOyB4Kyspe1xuXHRcdFx0dmFyIGNvbmZpZz10aGlzLnByb3BzLmNvbmZpZ1t4XTtcblx0XHRcdGZvcm1Qcm9wc1tjb25maWcudmFsdWVdPWNvbmZpZztcblx0XHR9XG5cdFx0dmFyIGZvcm09KFxuXG5cdFx0XHRcdDxEb2N0eXBlRm9ybSBcblx0XHRcdFx0XHRjbG9zZT17ZnVuY3Rpb24oKXskKFwiI1wiK3RoaXMubW9kYWxJRCkubW9kYWwoJ2hpZGUnKTt9LmJpbmQodGhpcyl9XG5cdFx0XHRcdFx0aXRlbUNoYW5nZT17XG5cdFx0XHRcdFx0XHRmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7Y3VycmVudEl0ZW06aXRlbX0pfS5iaW5kKHRoaXMpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y3JlYXRlPXtcblx0XHRcdFx0XHRcdGZ1bmN0aW9uKGl0ZW0sZG9jdHlwZSl7XG5cdFx0XHRcdFx0XHRcdGZvcih2YXIgeD0wOyB4IDwgdGhpcy5wcm9wcy5jb25maWcubGVuZ3RoOyB4Kyspe1xuXHRcdFx0XHRcdFx0XHRcdHZhciBjb25maWc9dGhpcy5wcm9wcy5jb25maWdbeF07XG5cdFx0XHRcdFx0XHRcdFx0aWYoY29uZmlnLmRlZmF1bHQpe1xuXHRcdFx0XHRcdFx0XHRcdFx0aXRlbVtjb25maWcudmFsdWVdID0gY29uZmlnLmRlZmF1bHQ7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGl0ZW0uZG9jdHlwZT1kb2N0eXBlO1xuXHRcdFx0XHRcdFx0XHR0aGlzLnRhYmxlVG9vbC5jcmVhdGUoaXRlbSk7XG5cdFx0XHRcdFx0XHRcdCQoJyMnK3RoaXMubW9kYWxJRCkubW9kYWwoJ3RvZ2dsZScpO1xuXHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVkaXQ9e2Z1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0XHRcdFx0dGhpcy50YWJsZVRvb2wudXBkYXRlKGl0ZW0pO1xuXHRcdFx0XHRcdFx0JCgnIycrdGhpcy5tb2RhbElEKS5tb2RhbCgndG9nZ2xlJyk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpfVxuXHRcdFx0XHRcdGRlbGV0ZT17ZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdFx0XHQgIHRoaXMudGFibGVUb29sLmRlbGV0ZShpdGVtKTtcblx0XHRcdFx0XHRcdCQoJyMnK3RoaXMubW9kYWxJRCkubW9kYWwoJ3RvZ2dsZScpO1xuXHRcdFx0XHRcdH0uYmluZCh0aGlzKX1cblx0XHRcdFx0XHRtb2RlPXt0aGlzLnN0YXRlLmZvcm1Nb2RlfVxuXHRcdFx0XHRcdGl0ZW09e3RoaXMuc3RhdGUuY3VycmVudEl0ZW19XG5cdFx0XHRcdFx0aWQ9XCJ0aGluZ1wiXG5cdFx0XHRcdC8+XG5cdFx0KTtcblx0XHRcblx0XHQvL2xvb3AgdGhlIGNvbmZpZyB0byBjcmVhdGUgZm9ybSBpdGVtc1xuXG5cdFx0Zm9ybT1SZWFjdC5jbG9uZUVsZW1lbnQoZm9ybSAsZm9ybVByb3BzKTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PGJ1dHRvbiBcblx0XHRcdFx0XHR0eXBlPVwiYnV0dG9uXCIgXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgXG5cdFx0XHRcdFx0b25DbGljaz17ZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdFx0XHRmb3JtTW9kZTpcImNyZWF0ZVwiLFxuXHRcdFx0XHRcdFx0XHRjdXJyZW50SXRlbTp7fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHQkKFwiI1wiK3RoaXMubW9kYWxJRCkubW9kYWwoKTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcyl9XG5cdFx0XHRcdFx0PlxuXHRcdFx0XHRcdENyZWF0ZSB7dGhpcy5wcm9wcy5kb2N0eXBlfSA8c3BhbiBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLXBsdXNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XG5cdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHQ8TW9kYWwgXG5cdFx0XHRcdFx0aWQ9e3RoaXMubW9kYWxJRH1cblx0XHRcdFx0XHRzdWJtaXRUZXh0PVwiU3VibWl0XCIgXG5cdFx0XHRcdFx0dGl0bGU9e1wiQ3JlYXRlIFwiICsgdGhpcy5wcm9wcy5kb2N0eXBlfVxuXHRcdFx0XHRcdHN1Ym1pdD17ZmFsc2V9XG5cdFx0XHRcdFx0PlxuXHRcdFx0XHRcdHtmb3JtfVxuXHRcdFx0XHQ8L01vZGFsPlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQpO1xuXHR9XG5cdHNvbWVGdW5jdGlvbigpe1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHZhciBmb3JtPVwiXCI7XG5cdFx0aWYodGhpcy5wcm9wcy5lZGl0YWJsZSl7XG5cdFx0XHRmb3JtPXRoaXMuZWRpdGFibGVDb250ZW50KCk7XG5cdFx0fVxuXHRcdHZhciBjb2x1bW5zPXRoaXMucmV0dXJuQ29sdW1ucygpO1xuXHRcdHZhciBjb250ZW50PXRoaXMucmV0dXJuQ29udGVudCgpO1xuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxUYWJsZSBcblx0XHRcdFx0XHRpZD17dGhpcy5wcm9wcy5pZH1cblx0XHRcdFx0XHR0aXRsZT1cIlNwcmF5IFRhYmxlXCJcblx0XHRcdFx0XHRjb250ZW50PXtjb250ZW50fVxuXHRcdFx0XHRcdGNvbHVtbnM9e2NvbHVtbnN9XG5cdFx0XHRcdC8+XG5cdFx0XHRcdHtmb3JtfVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSIsImltcG9ydCBGb3JtIGZyb20gJy4uL3V0aWxzL2Zvcm1zJ1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3R5cGVGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuY29tcG9uZW50V2lsbFVwZGF0ZT10aGlzLmNvbXBvbmVudFdpbGxVcGRhdGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmRvY3R5cGVUb29sVXBkYXRlPXRoaXMuZG9jdHlwZVRvb2xVcGRhdGUuYmluZCh0aGlzKTtcblxuXHRcdHRoaXMuc3VibWl0PXRoaXMuc3VibWl0LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5zYXZlPXRoaXMuc2F2ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZGVsZXRlPXRoaXMuZGVsZXRlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5kb2N0eXBlVG9vbCA9IG5ldyBwcy5hcGlUb29sKHtuYW1lOnRoaXMucHJvcHMuZG9jdHlwZX0se2RvY3R5cGU6J0RvY1R5cGUnfSx0aGlzLmRvY3R5cGVUb29sVXBkYXRlLHRoaXMuZm9yY2VVcGRhdGUpO1xuXHRcdHRoaXMuc3RhdGU9e2l0ZW1zOnRoaXMuZG9jdHlwZVRvb2wuaXRlbXN9O1xuXHRcdC8vdGhpcy5kb2N0eXBlVG9vbCA9IG5ldyBwcy5hcGlUb29sKHtuYW1lOnRoaXMucHJvcHMuZG9jdHlwZX0se2RvY3R5cGU6J0RvY1R5cGUnfSx0aGlzLmRvY3R5cGVUb29sVXBkYXRlKTtcblx0fVxuXHRjb21wb25lbnRXaWxsVXBkYXRlKCl7XG5cblx0fVxuXHRkb2N0eXBlVG9vbFVwZGF0ZSgpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe2l0ZW1zOnRoaXMuZG9jdHlwZVRvb2wuaXRlbXN9KVxuXHR9XG5cdHN1Ym1pdChlKXtcblx0XHRjb25zb2xlLmxvZyhcIkZST00gRE9DVFlQRSBGT1JNXCIpO1xuXHRcdGNvbnNvbGUubG9nKHRoaXMucHJvcHMuaXRlbSk7XG5cdFx0Ly9GT1JNIFZBTElEQVRJT04gXG5cdFx0Ly9pZih0aGlzLnByb3BzLml0ZW0udmluZXlhcmQ9PVwiXCIgfHx0aGlzLnByb3BzLml0ZW0uc3ByYXlfdHlwZT09XCJcIiB8fCAobW9tZW50KHRoaXMucHJvcHMuaXRlbS5kYXRlLFwiTU0vREQvWVlZWVwiKS5pc1ZhbGlkKCkpIT09dHJ1ZSl7XG5cdFx0Ly9cdGNvbnNvbGUubG9nKFwibm90IHZhbGlkXCIpO1xuXHRcdC8vfWVsc2V7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR0aGlzLnByb3BzLmNyZWF0ZSh0aGlzLnByb3BzLml0ZW0sdGhpcy5wcm9wcy5kb2N0eXBlKTtcblx0XHQvL31cblx0fVxuXHRzYXZlKGUpe1xuXHRcdC8vIGlmKHRoaXMucHJvcHMuaXRlbS52aW5leWFyZD09XCJcIiB8fHRoaXMucHJvcHMuaXRlbS5zcHJheV90eXBlPT1cIlwiIHx8IChtb21lbnQodGhpcy5wcm9wcy5pdGVtLmRhdGUsXCJNTS9ERC9ZWVlZXCIpLmlzVmFsaWQoKSkhPT10cnVlKXtcblx0XHQvLyBcdGNvbnNvbGUubG9nKFwibm90IHZhbGlkXCIpO1xuXHRcdC8vIH1lbHNle1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dGhpcy5wcm9wcy5lZGl0KHRoaXMucHJvcHMuaXRlbSk7XG5cdFx0Ly8gfVxuXHR9XG5cdGRlbGV0ZShlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5wcm9wcy5kZWxldGUodGhpcy5wcm9wcy5pdGVtKTtcblx0fVxuXHRjcmVhdGVGb3JtSnNvbigpe1xuXHRcdHZhciBjcmVhdGVIaWRkZW49KHRoaXMucHJvcHMubW9kZSE9XCJjcmVhdGVcIik/XCIgaGlkZGVuXCI6XCIgbm9wZVwiO1xuXHRcdHZhciBlZGl0SGlkZGVuPSh0aGlzLnByb3BzLm1vZGUhPVwiZWRpdFwiKT9cIiBoaWRkZW5cIjpcIiBub3BlXCI7XG5cdFx0dmFyIGZpZWxkc0pzb249dGhpcy5zdGF0ZS5pdGVtc1swXS5maWVsZHM7XG5cdFx0dmFyIGZpZWxkcz1bXTtcblx0XHR2YXIgZmllbGRPYmplY3Q9e1xuXHRcdFx0TGluazogZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZmllbGQ6XCJhdXRvQ29tcGxldGVcIixcblx0XHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0XHRjb3B5W2l0ZW0uZmllbGRuYW1lXT1lLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdFx0bGFibGU6aXRlbS5sYWJlbCxcblx0XHRcdFx0XHR2YWx1ZTpjb3B5W2l0ZW0uZmllbGRuYW1lXSxcblx0XHRcdFx0XHRkb2N0eXBlOml0ZW0ub3B0aW9ucyxcblx0XHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIlxuXHRcdFx0XHR9XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRDaGVjazogZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZmllbGQ6XCJjaGVja1wiLFxuXHRcdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRcdGNvcHlbaXRlbS5maWVsZG5hbWVdPWUudGFyZ2V0LmNoZWNrZWQ7XG5cdFx0XHRcdFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRcdGxhYmxlOml0ZW0ubGFiZWwsXG5cdFx0XHRcdFx0dmFsdWU6Y29weVtpdGVtLmZpZWxkbmFtZV0sXG5cdFx0XHRcdFx0Y2xhc3NOYW1lOiBcImJpZy1jaGVja2JveFwiXG5cdFx0XHRcdH1cblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdEludDogZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZmllbGQ6XCJpbnB1dFwiLFxuXHRcdFx0XHRcdHR5cGU6XCJudW1iZXJcIixcblx0XHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0XHRjb3B5W2l0ZW0uZmllbGRuYW1lXT1lLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdFx0dmFsdWU6Y29weVtpdGVtLmZpZWxkbmFtZV0sXG5cdFx0XHRcdFx0bGFibGU6aXRlbS5sYWJlbFxuXHRcdFx0XHR9O1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0U2VsZWN0OiBmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0dmFyIG9wdGlvbnM9aXRlbS5vcHRpb25zLnNwbGl0KCBcIlxcblwiICk7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZmllbGQ6XCJzZWxlY3RcIixcblx0XHRcdFx0XHR0eXBlOlwibnVtYmVyXCIsXG5cdFx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdFx0Y29weVtpdGVtLmZpZWxkbmFtZV09ZS50YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRcdGxhYmxlOml0ZW0ubGFiZWwsXG5cdFx0XHRcdFx0dmFsdWU6Y29weVtpdGVtLmZpZWxkbmFtZV0sXG5cdFx0XHRcdFx0b3B0aW9uczpvcHRpb25zXG5cdFx0XHRcdH07XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHREYXRhOiBmdW5jdGlvbihpdGVtLHByb3BPcHRpb25zKXtcblx0XHRcdFx0aWYocHJvcE9wdGlvbnMudHlwZT09XCJ0ZXh0YXJlYVwiKXtcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0ZmllbGQ6XCJ0ZXh0YXJlYVwiLFxuXHRcdFx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdFx0XHRjb3B5W2l0ZW0uZmllbGRuYW1lXT1lLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHRcdFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRcdFx0dmFsdWU6Y29weVtpdGVtLmZpZWxkbmFtZV0sXG5cdFx0XHRcdFx0XHRsYWJsZTppdGVtLmxhYmVsXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNle1xuXHRcdFx0XHRcdHJldHVybiB7fTtcblx0XHRcdFx0fVxuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0RGF0ZTogZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZmllbGQ6XCJkYXRlXCIsXG5cdFx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdFx0Y29weVtpdGVtLmZpZWxkbmFtZV09ZS50YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRcdGxhYmxlOml0ZW0ubGFiZWxcblx0XHRcdFx0fVxuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdH1cblxuXHRcdGlmKHRoaXMucHJvcHMuaXRlbT09bnVsbCl7XG5cdFx0XHR2YXIgY29weT17fVxuXHRcdH1lbHNle1xuXHRcdFx0dmFyIGNvcHk9cHMuY2xvbmUodGhpcy5wcm9wcy5pdGVtKTtcblx0XHR9XG5cblx0XHQvL2xvb3AgdGhlIGpzb24gb2JqZWN0XG5cdFx0Ly9wcm9iYWJseSBjaGFuZ2UgdGhpcyB0byB3aWxsTW91bnRcblx0XHRmb3IodmFyIHggPSAwOyB4IDwgZmllbGRzSnNvbi5sZW5ndGg7IHgrKyl7XG5cdFx0XHR2YXIgY3VycmVudEZpZWxkPWZpZWxkc0pzb25beF07XG5cdFx0XHQvLyBjaGVjayBpZiB0aGlzIGZpZWxkIHdhcyBlbmFibGVkXG5cblx0XHRcdGlmICh0aGlzLnByb3BzW2N1cnJlbnRGaWVsZC5maWVsZG5hbWVdKXtcblx0XHRcdFx0Ly90aGVyZSBpcyBhIHByb3BzIGZvciB0aGlzIGZpZWxkXG5cblx0XHRcdFx0aWYodGhpcy5wcm9wc1tjdXJyZW50RmllbGQuZmllbGRuYW1lXS5hY3RpdmUgPT09IDEpe1xuXHRcdFx0XHRcdC8vYW5kIHRoZSBmaWVsZCBpcyBzZXQgdG8gYWN0aXZlXG5cblx0XHRcdFx0XHRpZihmaWVsZE9iamVjdFtjdXJyZW50RmllbGQuZmllbGR0eXBlXSl7XG5cdFx0XHRcdFx0XHQvL0ZlaWxkIHR5cGUgY2FuIGJlIGhhbmRsZWQ/XG5cdFx0XHRcdFx0XHQvL2hhbmRsZSB0aGUgY3JlYXRpb24gb2YgY29weSBhbmQgdGhlIGRlZmF1bHQgdmFsdWVzXG5cblx0XHRcdFx0XHRcdGlmKHRoaXMucHJvcHMubW9kZT09XCJjcmVhdGVcIil7XG5cdFx0XHRcdFx0XHRcdGlmKGNvcHlbY3VycmVudEZpZWxkLmZpZWxkbmFtZV0pe1xuXHRcdFx0XHRcdFx0XHRcdC8vdGhlIGZpZWxkIGFscmVhZHkgZXhpc3RzXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0ZWxzZSBpZih0aGlzLnByb3BzW2N1cnJlbnRGaWVsZC5maWVsZG5hbWVdLmRlZmF1bHQpe1xuXHRcdFx0XHRcdFx0XHRcdC8vc2V0IHRvIGRlZmF1bHQgdmFsdWVcblx0XHRcdFx0XHRcdFx0XHRjb3B5W2N1cnJlbnRGaWVsZC5maWVsZG5hbWVdPXRoaXMucHJvcHNbY3VycmVudEZpZWxkLmZpZWxkbmFtZV0uZGVmYXVsdDtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRlbHNle1xuXHRcdFx0XHRcdFx0XHRcdGNvcHlbY3VycmVudEZpZWxkLmZpZWxkbmFtZV09XCJcIjtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZmllbGRzLnB1c2goZmllbGRPYmplY3RbY3VycmVudEZpZWxkLmZpZWxkdHlwZV0oY3VycmVudEZpZWxkLHRoaXMucHJvcHNbY3VycmVudEZpZWxkLmZpZWxkbmFtZV0pKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoIShcImRvY3R5cGVcIiBpbiBjb3B5KSl7XG5cdFx0XHRjb3B5LmRvY3R5cGU9dGhpcy5wcm9wcy5kb2N0eXBlO1xuXHRcdH1cblx0XHQvL2FkZGluZyBidXR0b24gZmVpbGRzXG5cdFx0ZmllbGRzLnB1c2goe1xuXHRcdFx0XHRmaWVsZDpcImJ1dHRvblwiLFxuXHRcdFx0XHR0eXBlOlwic3VibWl0XCIsXG5cdFx0XHRcdHZhbHVlOlwiQ3JlYXRlIFwiICsgdGhpcy5wcm9wcy5kb2N0eXBlICsgXCIgRW50cnlcIixcblx0XHRcdFx0Y2xhc3NOYW1lOlwiYnRuLXByaW1hcnkgcHVsbC1yaWdodCBcIiArIGNyZWF0ZUhpZGRlbixcblx0XHRcdFx0b25DbGljazp0aGlzLnN1Ym1pdFxuXHRcdFx0fSk7XG5cdFx0aWYodGhpcy5wcm9wcy5jbG9zZSl7XG5cdFx0XHRmaWVsZHMucHVzaCh7XG5cdFx0XHRcdFx0ZmllbGQ6XCJidXR0b25cIixcblx0XHRcdFx0XHR2YWx1ZTpcIkNsb3NlXCIsXG5cdFx0XHRcdFx0Y2xhc3NOYW1lOlwicHVsbC1yaWdodCBcIisgZWRpdEhpZGRlbixcblx0XHRcdFx0XHRvbkNsaWNrOmZ1bmN0aW9uKGUpeyBlLnByZXZlbnREZWZhdWx0KCk7dGhpcy5wcm9wcy5jbG9zZSgpO30uYmluZCh0aGlzKVxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGZpZWxkcy5wdXNoKHtcblx0XHRcdFx0ZmllbGQ6XCJidXR0b25cIixcblx0XHRcdFx0dHlwZTpcInN1Ym1pdFwiLFxuXHRcdFx0XHR2YWx1ZTpcIkRlbGV0ZVwiLFxuXHRcdFx0XHRjbGFzc05hbWU6XCJidG4tZGFuZ2VyIHB1bGwtcmlnaHQgXCIrIGVkaXRIaWRkZW4sXG5cdFx0XHRcdG9uQ2xpY2s6dGhpcy5kZWxldGVcblx0XHR9KTtcblx0XHRmaWVsZHMucHVzaChcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJidXR0b25cIixcblx0XHRcdFx0dHlwZTpcInN1Ym1pdFwiLFxuXHRcdFx0XHR2YWx1ZTpcIlNhdmVcIixcblx0XHRcdFx0Y2xhc3NOYW1lOlwiYnRuLXN1Y2Nlc3MgcHVsbC1yaWdodCBcIisgZWRpdEhpZGRlbixcblx0XHRcdFx0b25DbGljazp0aGlzLnNhdmVcblx0XHRcdH0pO1xuXHRcdHJldHVybiBmaWVsZHM7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dmFyIG91dHB1dD17fTtcblx0XHRpZih0aGlzLnN0YXRlLml0ZW1zIT09bnVsbCl7XG5cdFx0XHR2YXIgZmllbGRzPXRoaXMuY3JlYXRlRm9ybUpzb24oKTtcblx0XHRcdHZhciBvdXRwdXQgPSAoXHRcdFx0XHRcblx0XHRcdFx0PEZvcm1cblx0XHRcdFx0XHRpZD17dGhpcy5wcm9wcy5pZH1cblx0XHRcdFx0XHR0eXBlPVwiaG9yaXpvbnRhbFwiXG5cdFx0XHRcdFx0ZmllbGRzPXtmaWVsZHN9XG5cdFx0XHRcdC8+KTtcblx0XHR9ZWxzZXsgXG5cdFx0XHRvdXRwdXQgPSAoPGRpdj4gTG9hZGluZy4uLiA8L2Rpdj4pO1xuXHRcdH1cblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2Plx0XHRcblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbiIsIi8qIGZvcm1zICovXG4vKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cblxuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnN1Ym1pdD10aGlzLnN1Ym1pdC5iaW5kKHRoaXMpO1xuXHR9XG5cdHN1Ym1pdChlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5wcm9wcy5zdWJtaXQoZSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dmFyIGZvcm09W107XG5cdFx0dmFyIGZvcm1UeXBlcz17XG5cdFx0XHRzZWxlY3RcdDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciBvcHRpbmFsPVtcInZhbHVlXCIsXCJsYWJsZVwiLFwib3B0aW9uc1wiLFwiY2xhc3NOYW1lXCIsXCJyZWFkb25seVwiLFwiZGlzYWJsZVwiLFwicmVxdWlyZVwiXTtcblx0XHRcdFx0dmFyIHByb3BzPXBzLmluaXRQcm9wcyhvcHRpbmFsLGl0ZW0pO1xuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxTZWxlY3Rcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH1cblx0XHRcdFx0XHRcdHZhbHVlPXtwcm9wcy52YWx1ZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17cHJvcHMuY2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0bGFibGU9e3Byb3BzLmxhYmxlfVxuXHRcdFx0XHRcdFx0b3B0aW9ucz17cHJvcHMub3B0aW9uc31cblx0XHRcdFx0XHRcdHJlYWRPbmx5PXtwcm9wcy5yZWFkb25seX1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXtwcm9wcy5kaXNhYmxlZH1cblx0XHRcdFx0XHRcdHJlcXVpcmVkPXtwcm9wcy5yZXF1aXJlZH1cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKTt9fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRjaGVjayA6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHR2YXIgcHJvcHM9W1widmFsdWVcIixcImxhYmxlXCIsXCJjbGFzc05hbWVcIixcInJlYWRvbmx5XCIsXCJkaXNhYmxlXCIsXCJyZXF1aXJlXCIsXCJ2YWx1ZVwiXTtcblx0XHRcdFx0cHJvcHM9cHMuaW5pdFByb3BzKHByb3BzLGl0ZW0pO1xuXG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PENoZWNrXG5cdFx0XHRcdFx0XHRrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9XG5cdFx0XHRcdFx0XHR2YWx1ZT17cHJvcHMudmFsdWV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e3Byb3BzLmNsYXNzTmFtZX1cblx0XHRcdFx0XHRcdGxhYmxlPXtwcm9wcy5sYWJsZX1cblx0XHRcdFx0XHRcdHJlYWRPbmx5PXtwcm9wcy5yZWFkb25seX1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXtwcm9wcy5kaXNhYmxlZH1cblx0XHRcdFx0XHRcdHJlcXVpcmVkPXtwcm9wcy5yZXF1aXJlZH1cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKTt9fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cblx0XHRcdHRleHRhcmVhIDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciBwcm9wcz1bXCJ2YWx1ZVwiLFwibGFibGVcIixcImNsYXNzTmFtZVwiLFwicmVhZG9ubHlcIixcImRpc2FibGVcIixcInJlcXVpcmVcIixcInZhbHVlXCJdO1xuXHRcdFx0XHRwcm9wcz1wcy5pbml0UHJvcHMocHJvcHMsaXRlbSk7XG5cblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8VGV4dGFyZWFcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH1cblx0XHRcdFx0XHRcdHZhbHVlPXtwcm9wcy52YWx1ZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17cHJvcHMuY2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0bGFibGU9e3Byb3BzLmxhYmxlfVxuXHRcdFx0XHRcdFx0cmVhZE9ubHk9e3Byb3BzLnJlYWRvbmx5fVxuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ9e3Byb3BzLmRpc2FibGVkfVxuXHRcdFx0XHRcdFx0cmVxdWlyZWQ9e3Byb3BzLnJlcXVpcmVkfVxuXHRcdFx0XHRcdFx0aW5wdXRDaGFuZ2VkPXtmdW5jdGlvbihlKXtpdGVtLm9uQ2hhbmdlKGUpO319XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGlucHV0IFx0OiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0dmFyIHR5cGUgPSAoaXRlbS50eXBlID09PSB1bmRlZmluZWQpID8gXCJ0ZXh0XCI6IGl0ZW0udHlwZTtcblx0XHRcdFx0dmFyIHZhbHVlID0gKGl0ZW0udmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnZhbHVlO1xuXHRcdFx0XHR2YXIgcGxhY2Vob2xkZXIgPSAoaXRlbS5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucGxhY2Vob2xkZXI7XG5cdFx0XHRcdHZhciBsYWJsZSA9IChpdGVtLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5sYWJsZTtcblx0XHRcdFx0dmFyIGNsYXNzTmFtZSA9IChpdGVtLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uY2xhc3NOYW1lO1xuXHRcdFx0XHR2YXIgcmVhZG9ubHkgPSAoaXRlbS5yZWFkb25seSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucmVhZG9ubHk7XG5cdFx0XHRcdHZhciBkaXNhYmxlZCA9IChpdGVtLmRpc2FibGVkID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5kaXNhYmxlZDtcblx0XHRcdFx0dmFyIHJlcXVpcmVkID0gKGl0ZW0ucmVxdWlyZWQgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnJlcXVpcmVkO1xuXHRcdFx0XHRcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8SW5wdXRcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH0gXG5cdFx0XHRcdFx0XHR0eXBlPXt0eXBlfVxuXHRcdFx0XHRcdFx0dmFsdWU9e3ZhbHVlfVxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuXHRcdFx0XHRcdFx0bGFibGU9e2xhYmxlfVxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXtjbGFzc05hbWV9XG5cdFx0XHRcdFx0XHRyZWFkb25seT17cmVhZG9ubHl9XG5cdFx0XHRcdFx0XHRkaXNhYmxlZD17ZGlzYWJsZWR9XG5cdFx0XHRcdFx0XHRyZXF1aXJlZD17cmVxdWlyZWR9XG5cdFx0XHRcdFx0XHRpbnB1dENoYW5nZWQ9e2Z1bmN0aW9uKGUpe2l0ZW0ub25DaGFuZ2UoZSl9fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRsYWJsZSBcdDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHJldHVybiAoICBcbiAgICBcdFx0XHRcdDxsYWJlbCBrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9ID57aXRlbS5sYWJsZX08L2xhYmVsPlxuXG4gICAgXHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdHJhZGlvXHQ6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHRyZXR1cm4gKDxkaXY+PC9kaXY+KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGhlYWRlcjogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHJldHVybig8aDMga2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fSA+e2l0ZW0ubGFibGV9PC9oMz4pXG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRkYXRlOiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0dmFyIHZhbHVlID0gKGl0ZW0udmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnZhbHVlO1xuXHRcdFx0XHR2YXIgbGFibGUgPSAoaXRlbS5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ubGFibGU7XG5cdFx0XHRcdHZhciBwbGFjZWhvbGRlciA9IChpdGVtLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5wbGFjZWhvbGRlcjtcblx0XHRcdFx0dmFyIGNsYXNzTmFtZSA9IChpdGVtLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uY2xhc3NOYW1lO1xuXHRcdFx0XHR2YXIgcmVhZG9ubHkgPSAoaXRlbS5yZWFkb25seSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucmVhZG9ubHk7XG5cdFx0XHRcdHZhciBkaXNhYmxlZCA9IChpdGVtLmRpc2FibGVkID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5kaXNhYmxlZDtcblx0XHRcdFx0dmFyIHJlcXVpcmVkID0gKGl0ZW0ucmVxdWlyZWQgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnJlcXVpcmVkO1xuXHRcdFx0XHRyZXR1cm4oXG5cdFx0XHRcdFx0PERhdGVJbnB1dFxuXHRcdFx0XHRcdFx0a2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fSBcblx0XHRcdFx0XHRcdHZhbHVlPXt2YWx1ZX1cblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cblx0XHRcdFx0XHRcdGxhYmxlPXtsYWJsZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0aW5wdXRDaGFuZ2VkPXtmdW5jdGlvbihlKXtpdGVtLm9uQ2hhbmdlKGUpfX1cblx0XHRcdFx0XHRcdHJlYWRvbmx5PXtyZWFkb25seX1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXtkaXNhYmxlZH1cblx0XHRcdFx0XHRcdHJlcXVpcmVkPXtyZXF1aXJlZH1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0YXV0b0NvbXBsZXRlOiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0dmFyIHZhbHVlID0gKGl0ZW0udmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnZhbHVlO1xuXHRcdFx0XHR2YXIgbGFibGUgPSAoaXRlbS5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ubGFibGU7XG5cdFx0XHRcdHZhciBwbGFjZWhvbGRlciA9IChpdGVtLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5wbGFjZWhvbGRlcjtcblx0XHRcdFx0dmFyIGNsYXNzTmFtZSA9IChpdGVtLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uY2xhc3NOYW1lO1xuXHRcdFx0XHR2YXIgcmVhZG9ubHkgPSAoaXRlbS5yZWFkb25seSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucmVhZG9ubHk7XG5cdFx0XHRcdHZhciBkaXNhYmxlZCA9IChpdGVtLmRpc2FibGVkID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5kaXNhYmxlZDtcblx0XHRcdFx0dmFyIHJlcXVpcmVkID0gKGl0ZW0ucmVxdWlyZWQgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnJlcXVpcmVkO1xuXG5cdFx0XHRcdHJldHVybihcblx0XHRcdFx0XHQ8QXdlc29tcGxldGVJbnB1dFxuXHRcdFx0XHRcdFx0a2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fVxuXHRcdFx0XHRcdFx0ZG9jdHlwZT17aXRlbS5kb2N0eXBlfVxuXHRcdFx0XHRcdFx0ZG9jdmFsdWU9e2l0ZW0uZG9jdmFsdWV9XG5cdFx0XHRcdFx0XHRkb2NsYWJsZT17aXRlbS5kb2NsYWJsZX1cblx0XHRcdFx0XHRcdHZhbHVlPXt2YWx1ZX1cblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cblx0XHRcdFx0XHRcdGxhYmxlPXtsYWJsZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0cmVhZG9ubHk9e3JlYWRvbmx5fVxuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ9e2Rpc2FibGVkfVxuXHRcdFx0XHRcdFx0cmVxdWlyZWQ9e3JlcXVpcmVkfVxuXHRcdFx0XHRcdFx0aW5wdXRDaGFuZ2VkPXtmdW5jdGlvbihlKXtpdGVtLm9uQ2hhbmdlKGUpfX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0YnV0dG9uOiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0dmFyIHZhbHVlID0gKGl0ZW0udmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnZhbHVlO1xuXHRcdFx0XHR2YXIgY2xhc3NOYW1lID0gKGl0ZW0uY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5jbGFzc05hbWU7XG5cdFx0XHRcdHZhciBkaXNhYmxlZCA9IChpdGVtLmRpc2FibGVkID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5kaXNhYmxlZDtcblx0XHRcdFx0cmV0dXJuKFxuXHRcdFx0XHRcdDxCdXR0b25cblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH1cblx0XHRcdFx0XHRcdHZhbHVlPXt2YWx1ZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ9e2Rpc2FibGVkfVxuXHRcdFx0XHRcdFx0b25DbGljaz17ZnVuY3Rpb24oZSl7aXRlbS5vbkNsaWNrKGUpfX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpXG5cdFx0fVxuXHRcdHRoaXMucHJvcHMuZmllbGRzLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCl7XG5cdFx0XHRpZigkLmlzRW1wdHlPYmplY3QoaXRlbSkpe1xuXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Zm9ybS5wdXNoKGZvcm1UeXBlc1tpdGVtLmZpZWxkXShpdGVtLGluZGV4KSk7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0XHQvL2Zvcih2YXIgeD0wOyB4IDwgdGhpcy5wcm9wcy5mZWlsZHMubGVuZ3RoIHgrKzsgKVxuXHRcdHZhciBjbGFzc05hbWUgPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcInJlYWN0LWZvcm1cIjogXCJmb3JtLWhvcml6b250YWwgcmVhY3QtZm9ybSBcIit0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8Zm9ybSBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG5cdFx0XHRcdDxmaWVsZHNldD5cblx0XHRcdFx0e3RoaXMucHJvcHMuYmVmb3JlfVxuXHRcdFx0XHR7Zm9ybX1cblx0XHRcdFx0eyB0aGlzLnByb3BzLmNoaWxkcmVufVxuXHRcdFx0XHQ8L2ZpZWxkc2V0PlxuXHRcdFx0PC9mb3JtPlxuXHRcdCk7XG5cdH1cbn1cblxuXG5cbmV4cG9ydCBjbGFzcyBTZWxlY3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5pbnB1dENoYW5nZT10aGlzLmlucHV0Q2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblxuXHR9XG5cdGlucHV0Q2hhbmdlKGUpe1xuXHRcdHRoaXMucHJvcHMuaW5wdXRDaGFuZ2VkKCk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLmxhYmxlID0gKHRoaXMucHJvcHMubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLmxhYmxlO1xuXHRcdHRoaXMub3B0aW9ucyA9ICh0aGlzLnByb3BzLm9wdGlvbnMgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLm9wdGlvbnM7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jb250cm9sXCI6IFwiZm9ybS1jb250cm9sXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlcXVpcmVkID0gKHRoaXMucHJvcHMucmVxdWlyZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZXF1aXJlZD09ZmFsc2V8fHRoaXMucHJvcHMucmVxdWlyZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZWFkb25seSA9ICh0aGlzLnByb3BzLnJlYWRvbmx5ID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVhZG9ubHk9PWZhbHNlfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHZhciBvcHRpb25zPVtdO1xuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblxuXG5cdFx0dGhpcy5vcHRpb25zLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCl7XG5cdFx0XHR2YXIgZ3JvdXA9W107XG5cdFx0XHRpZihpdGVtLmdyb3VwICE9PSB1bmRlZmluZWQpe1xuXHRcdFx0XHRpdGVtLm9wdGlvbnMubWFwKGZ1bmN0aW9uKGlubmVySXRlbSxpbmRleCl7XG5cdFx0XHRcdFx0Z3JvdXAucHVzaCggPG9wdGlvbiBrZXk9e2l0ZW0uZ3JvdXAraW5kZXh9IHZhbHVlPXtpbm5lckl0ZW19PiB7aW5uZXJJdGVtfSA8L29wdGlvbj4pXG5cdFx0XHRcdH0pXG5cdFx0XHRcdG9wdGlvbnMucHVzaCg8b3B0Z3JvdXAga2V5PXtpdGVtLmdyb3VwfSBsYWJlbD17aXRlbS5ncm91cH0+IHtncm91cH08L29wdGdyb3VwPik7XG5cblx0XHRcdH1cblx0XHRcdGVsc2V7XG5cdFx0XHRcdG9wdGlvbnMucHVzaCggPG9wdGlvbiBrZXk9e2luZGV4fSB2YWx1ZT17aXRlbX0+IHtpdGVtfSA8L29wdGlvbj4pXG5cdFx0XHR9XG5cblx0XHRcdFxuXHRcdH0uYmluZCh0aGlzKSk7XG5cblx0XHR2YXIgc2VsZWN0PShcblx0XHRcdDxzZWxlY3QgXG5cdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9IFxuXHRcdFx0XHR2YWx1ZT17dGhpcy52YWx1ZX0gXG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnByb3BzLmlucHV0Q2hhbmdlZH1cblx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdCAgICAgICAgICBcdHJlYWRPbmx5PXt0aGlzLnJlYWRvbmx5fVxuXHQgICAgICAgICAgXHRyZXF1aXJlZD17dGhpcy5yZXF1aXJlZH1cblx0XHRcdFx0PlxuXHRcdFx0XHR7b3B0aW9uc31cblx0XHRcdDwvc2VsZWN0PlxuXHRcdCk7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkIHx8IHRoaXMucHJvcHMubGFibGUgPT1cIlwiKXtcblx0XHRcdG91dHB1dCA9IChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIFwiPlxuXHRcdCAgICBcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWxcIj57dGhpcy5wcm9wcy5sYWJsZX08L2xhYmVsPlxuXHRcdCAgICBcdFx0PGRpdj5cblx0XHQgICAgXHRcdHtzZWxlY3R9XG5cdFx0ICAgIFx0XHQ8L2Rpdj5cblx0XHQgIFx0XHQ8L2Rpdj5cblx0XHQgIFx0KTtcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdG91dHB1dCA9IChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG5cdFx0ICAgICAgXHRcdHtzZWxlY3R9XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLmlucHV0Q2hhbmdlPXRoaXMuaW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcblxuXHR9XG5cdGlucHV0Q2hhbmdlKGUpe1xuXHRcdHRoaXMucHJvcHMuaW5wdXRDaGFuZ2VkKGUpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHRoaXMudHlwZSA9ICh0aGlzLnByb3BzLnR5cGUgPT09IHVuZGVmaW5lZCkgPyBcInRleHRcIjogdGhpcy5wcm9wcy50eXBlO1xuXHRcdHRoaXMudmFsdWUgPSAodGhpcy5wcm9wcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMudmFsdWU7XG5cdFx0dGhpcy5wbGFjZWhvbGRlciA9ICh0aGlzLnByb3BzLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5wbGFjZWhvbGRlcjtcblx0XHR0aGlzLmxhYmxlID0gKHRoaXMucHJvcHMubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLmxhYmxlO1xuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblx0XHR0aGlzLmNsYXNzTmFtZT0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJmb3JtLWNvbnRyb2xcIjogXCJmb3JtLWNvbnRyb2wgXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlcXVpcmVkID0gKHRoaXMucHJvcHMucmVxdWlyZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZXF1aXJlZD09ZmFsc2V8fHRoaXMucHJvcHMucmVxdWlyZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZWFkb25seSA9ICh0aGlzLnByb3BzLnJlYWRvbmx5ID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVhZG9ubHk9PWZhbHNlfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHZhciBpbnB1dD0oIFxuXHRcdFx0PGlucHV0IFxuXHRcdFx0XHR0eXBlPXt0aGlzLnR5cGV9IFxuXHRcdFx0XHRjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfSBcblx0XHRcdFx0cGxhY2Vob2xkZXI9e3RoaXMucGxhY2Vob2xkZXJ9IFxuXHRcdFx0XHR2YWx1ZT17dGhpcy52YWx1ZX1cblx0XHRcdFx0b25DaGFuZ2U9e3RoaXMucHJvcHMuaW5wdXRDaGFuZ2VkfVxuXHRcdFx0XHRkaXNhYmxlZD17dGhpcy5kaXNhYmxlZH1cblx0ICAgICAgICAgIFx0cmVhZE9ubHk9e3RoaXMucmVhZG9ubHl9XG5cdCAgICAgICAgICBcdHJlcXVpcmVkPXt0aGlzLnJlcXVpcmVkfVxuXHRcdFx0Lz5cblx0XHQpO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMubGFibGUgIT09IHVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLmxhYmxlID09XCJcIil7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBcIj5cblx0XHQgICAgXHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD5cblx0XHQgICAgXHRcdDxkaXYgY2xhc3NOYW1lPVwiXCI+XG5cdFx0ICAgICAgXHRcdFx0e2lucHV0fVxuXHRcdCAgICBcdFx0PC9kaXY+XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdCAgICAgIFx0XHR7aW5wdXR9XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBDaGVjayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLmlucHV0Q2hhbmdlPXRoaXMuaW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcblxuXG5cdH1cblx0aW5wdXRDaGFuZ2UoZSl7XG5cblx0XHR0aGlzLnByb3BzLmlucHV0Q2hhbmdlZChlKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyAwIDogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLnBsYWNlaG9sZGVyID0gKHRoaXMucHJvcHMucGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnBsYWNlaG9sZGVyO1xuXHRcdHRoaXMubGFibGUgPSAodGhpcy5wcm9wcy5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMubGFibGU7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jaGVjay1pbnB1dFwiOiBcImZvcm0tY2hlY2staW5wdXQgXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlcXVpcmVkID0gKHRoaXMucHJvcHMucmVxdWlyZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZXF1aXJlZD09ZmFsc2V8fHRoaXMucHJvcHMucmVxdWlyZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZWFkb25seSA9ICh0aGlzLnByb3BzLnJlYWRvbmx5ID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVhZG9ubHk9PWZhbHNlfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdFxuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblx0XHR2YXIgaW5wdXQ9KCBcblx0XHRcdDxpbnB1dCBcblx0XHRcdFx0dHlwZT1cImNoZWNrYm94XCIgXG5cdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9IFxuXHRcdFx0XHRjaGVja2VkPXt0aGlzLnZhbHVlfVxuXHRcdFx0XHRcblx0XHRcdFx0b25DaGFuZ2U9e3RoaXMucHJvcHMuaW5wdXRDaGFuZ2VkfVxuXHRcdFx0XHRkaXNhYmxlZD17dGhpcy5kaXNhYmxlZH1cblx0ICAgICAgICAgIFx0cmVhZE9ubHk9e3RoaXMucmVhZG9ubHl9XG5cdCAgICAgICAgICBcdHJlcXVpcmVkPXt0aGlzLnJlcXVpcmVkfVxuXHRcdFx0Lz5cblx0XHQpO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMubGFibGUgIT09IHVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLmxhYmxlID09XCJcIil7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHQgICAgXHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+XG5cdFx0ICAgICAgXHRcdFx0e2lucHV0fXt0aGlzLnByb3BzLmxhYmxlfVxuXHRcdCAgICAgIFx0XHQ8L2xhYmVsPlxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0ICAgICAgXHRcdHtpbnB1dH1cblx0XHQgIFx0XHQ8L2Rpdj5cblx0XHQgIFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbmV4cG9ydCBjbGFzcyBUZXh0YXJlYSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLmlucHV0Q2hhbmdlPXRoaXMuaW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcblxuXHR9XG5cdGlucHV0Q2hhbmdlKGUpe1xuXHRcdHRoaXMucHJvcHMuaW5wdXRDaGFuZ2VkKGUpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHRoaXMudmFsdWUgPSAodGhpcy5wcm9wcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IDAgOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMucGxhY2Vob2xkZXIgPSAodGhpcy5wcm9wcy5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXI7XG5cdFx0dGhpcy5sYWJsZSA9ICh0aGlzLnByb3BzLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5sYWJsZTtcblx0XHR0aGlzLmNsYXNzTmFtZT0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJmb3JtLWNvbnRyb2xcIjogXCJmb3JtLWNvbnRyb2wgXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlcXVpcmVkID0gKHRoaXMucHJvcHMucmVxdWlyZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZXF1aXJlZD09ZmFsc2V8fHRoaXMucHJvcHMucmVxdWlyZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZWFkb25seSA9ICh0aGlzLnByb3BzLnJlYWRvbmx5ID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVhZG9ubHk9PWZhbHNlfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucm93cyA9ICh0aGlzLnByb3BzLnJvd3MgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yb3dzPT1cIlwiKSA/IDM6IHRoaXMucHJvcHMucm93cztcblx0XHR2YXIgb3V0cHV0PVwiXCI7XG5cdFx0dmFyIGlucHV0PSggXG5cdFx0XHQ8dGV4dGFyZWEgXG5cdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9IFxuXHRcdFx0XHR2YWx1ZT17dGhpcy52YWx1ZX1cblx0XHRcdFx0b25DaGFuZ2U9e3RoaXMucHJvcHMuaW5wdXRDaGFuZ2VkfVxuXHRcdFx0XHRyb3dzPXt0aGlzLnJvd3N9XG5cdFx0XHRcdGRpc2FibGVkPXt0aGlzLmRpc2FibGVkfVxuXHQgICAgICAgICAgXHRyZWFkT25seT17dGhpcy5yZWFkb25seX1cblx0ICAgICAgICAgIFx0cmVxdWlyZWQ9e3RoaXMucmVxdWlyZWR9XG5cdFx0XHQvPlxuXHRcdCk7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkIHx8IHRoaXMucHJvcHMubGFibGUgPT1cIlwiKXtcblx0XHRcdG91dHB1dCA9IChcblx0XHRcdFx0PGRpdj5cblx0XHQgICAgXHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+XG5cdFx0ICAgICAgXHRcdFx0e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD57aW5wdXR9XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiXCI+XG5cdFx0ICAgICAgXHRcdHtpbnB1dH1cblx0XHQgIFx0XHQ8L2Rpdj5cblx0XHQgIFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbmV4cG9ydCBjbGFzcyBEYXRlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5kYXRlSW5pdD10aGlzLmRhdGVJbml0LmJpbmQodGhpcyk7XG5cdH1cblx0ZGF0ZUluaXQoKXtcblx0XHQkKCcuaW5wdXQtZ3JvdXAuZGF0ZSAuZGF0ZXBpY2snKS5kYXRlcGlja2VyKHtcblx0XHQgICAgdG9kYXlCdG46IFwibGlua2VkXCIsXG5cdFx0ICAgIG9yaWVudGF0aW9uOiBcImJvdHRvbSByaWdodFwiLFxuXHRcdCAgICBhdXRvY2xvc2U6IHRydWUsXG5cdFx0ICAgIHRvZGF5SGlnaGxpZ2h0OiB0cnVlXG5cdFx0fSkub24oJ2NoYW5nZURhdGUnLCBmdW5jdGlvbihlKSB7XG5cdFx0XHR2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2lucHV0JywgeyBidWJibGVzOiB0cnVlIH0pO1xuXHRcdFx0ZS50YXJnZXQuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cdFx0fSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLnBsYWNlaG9sZGVyID0gKHRoaXMucHJvcHMucGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnBsYWNlaG9sZGVyO1xuXHRcdHRoaXMubGFibGUgPSAodGhpcy5wcm9wcy5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMubGFibGU7XG5cdFx0dGhpcy5kaXNhYmxlZCA9ICh0aGlzLnByb3BzLmRpc2FibGVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PWZhbHNlfHx0aGlzLnByb3BzLmRpc2FibGVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVxdWlyZWQgPSAodGhpcy5wcm9wcy5yZXF1aXJlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1mYWxzZXx8dGhpcy5wcm9wcy5yZXF1aXJlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlYWRvbmx5ID0gKHRoaXMucHJvcHMucmVhZG9ubHkgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZWFkb25seT09ZmFsc2V8fHRoaXMucHJvcHMucmVhZG9ubHk9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cblxuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblx0XHR0aGlzLmNsYXNzTmFtZT0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJmb3JtLWNvbnRyb2wgZGF0ZXBpY2tcIjogXCJmb3JtLWNvbnRyb2wgZGF0ZXBpY2sgXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHZhciBpbnB1dD0oIFxuXHRcdFx0PGlucHV0XG5cdFx0XHRcdHJlZj17dGhpcy5kYXRlSW5pdH0gXG5cdFx0XHRcdHR5cGU9XCJ0ZXh0XCJcblx0XHRcdFx0Y2xhc3NOYW1lPXt0aGlzLmNsYXNzTmFtZX1cblx0XHRcdFx0cGxhY2Vob2xkZXI9e3RoaXMucGxhY2Vob2xkZXJ9ICBcblx0XHRcdFx0dmFsdWU9e3RoaXMudmFsdWV9IFxuXHRcdFx0XHRvbkNoYW5nZT17dGhpcy5wcm9wcy5pbnB1dENoYW5nZWR9XG5cdFx0XHRcdGRpc2FibGVkPXt0aGlzLmRpc2FibGVkfVxuXHQgICAgICAgICAgXHRyZWFkT25seT17dGhpcy5yZWFkb25seX1cblx0ICAgICAgICAgIFx0cmVxdWlyZWQ9e3RoaXMucmVxdWlyZWR9XG5cdFx0XHRcdC8+XG5cblx0XHQpO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMubGFibGUgIT09IHVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLmxhYmxlID09XCJcIil7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0ICBcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG5cdFx0ICBcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbFwiPnt0aGlzLnByb3BzLmxhYmxlfTwvbGFiZWw+XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwIGRhdGVcIj5cblx0XHRcdFx0XHRcdHtpbnB1dH1cblx0XHRcdFx0ICBcdFx0PHNwYW4gY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAtYWRkb25cIj5cblx0XHRcdFx0ICBcdFx0XHQ8aSBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLXRoXCI+PC9pPlxuXHRcdFx0XHQgIFx0XHQ8L3NwYW4+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cCBkYXRlXCI+XG5cblx0XHRcdFx0XHRcdHtpbnB1dH1cblx0XHRcdFx0ICBcdFx0PHNwYW4gY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAtYWRkb25cIj5cblx0XHRcdFx0ICBcdFx0XHQ8aSBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLXRoXCI+PC9pPlxuXHRcdFx0XHQgIFx0XHQ8L3NwYW4+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHQgIFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbmV4cG9ydCBjbGFzcyBBd2Vzb21wbGV0ZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXG5cdFx0LyogICBEbyB0aGUgYmluZCB0aGluZyAgKi9cblx0XHR0aGlzLmNyZWF0ZUxpc3Q9dGhpcy5jcmVhdGVMaXN0LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5kb2NDaGFuZ2VkPXRoaXMuZG9jQ2hhbmdlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY29tcG9uZW50RGlkTW91bnQ9dGhpcy5jb21wb25lbnREaWRNb3VudC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuaW5wdXRDaGFuZ2U9dGhpcy5pbnB1dENoYW5nZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuYXV0b2NvbXBsZXRlPXRoaXMuYXV0b2NvbXBsZXRlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jb21wb25lbnRXaWxsVW5tb3VudD10aGlzLmNvbXBvbmVudFdpbGxVbm1vdW50LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5yZWZDYWxsPXRoaXMucmVmQ2FsbC5iaW5kKHRoaXMpO1xuXHRcdFxuXHRcdC8vdGhpcy53b3Jrb3JkZXJPYmo9dGhpcy5vblN0YXR1c0NoYW5nZWQuYmluZCh0aGlzKTtcblx0XHQvKiAgICAgICAgICBlbmQgICAgICAgICAgKi9cblx0XHR0aGlzLml0ZW1saXN0PVtdO1xuXHRcdHRoaXMuc3RhdGU9e2l0ZW1saXN0OltdfTtcblx0XHR0aGlzLl9pc01vdW50ZWQ9ZmFsc2U7XG5cdFx0dmFyIGFyZ3M9e307XG5cdFx0dmFyIG9wdGlvbnM9e2RvY3R5cGU6dGhpcy5wcm9wcy5kb2N0eXBlfTtcblx0XHR2YXIgZmlsdGVyPXt9O1xuXHRcdGlmICh0aGlzLnByb3BzLmZpbHRlcj09dW5kZWZpbmVkIHx8IHRoaXMucHJvcHMuZmlsdGVyPT1udWxsKXtcblx0XHRcblx0XHR9ZWxzZXtcblx0XHRcdGZpbHRlcj0gdGhpcy5wcm9wcy5maWx0ZXI7XG5cdFx0fVxuXHRcdHRoaXMubGlzdFRvb2wgPSBuZXcgcHMuYXBpVG9vbChmaWx0ZXIsIG9wdGlvbnMgLHRoaXMuZG9jQ2hhbmdlZCk7XG5cdFx0aWYgKHRoaXMubGlzdFRvb2wuaXRlbXM9PT11bmRlZmluZWQgfHx0aGlzLmxpc3RUb29sLml0ZW1zPT09IDAgfHx0aGlzLmxpc3RUb29sLml0ZW1zPT09bnVsbCApe1xuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5zdGF0ZS5saXN0PXRoaXMubGlzdFRvb2wuaXRlbXM7XG5cdFx0fVxuXG5cdFx0dGhpcy5jcmVhdGVMaXN0KCk7XG5cdH1cblx0ZG9jQ2hhbmdlZCgpe1xuXHRcdHRoaXMuY3JlYXRlTGlzdCgpO1xuXHR9XG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0dGhpcy5faXNNb3VudGVkPXRydWU7XG5cdFx0dGhpcy5hdXRvY29tcGxldGUoKTtcblxuXHR9XG5cdGNyZWF0ZUxpc3QoKXtcblx0XHR0aGlzLml0ZW1saXN0PVtdO1xuXHRcdC8vbGFibGUgYW5kIHZhbHVlXG5cdFx0aWYgKHRoaXMucHJvcHMuZG9jbGFibGUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmxpc3RUb29sLml0ZW1zICE9PSB1bmRlZmluZWQgJiYgdGhpcy5saXN0VG9vbC5pdGVtcyAhPT0gbnVsbCl7XG5cdFx0XHRmb3IobGV0IGl0ZW0gb2YgdGhpcy5saXN0VG9vbC5pdGVtcyl7XG5cdFx0XHRcdHZhciB0ZW1wID1baXRlbVt0aGlzLnByb3BzLmRvY2xhYmxlXSxpdGVtW3RoaXMucHJvcHMuZG9jdmFsdWVdXTtcblx0XHRcdFx0dGhpcy5pdGVtbGlzdC5wdXNoKHRlbXApO1xuXHRcdFx0fVxuXHRcdFx0JChkb2N1bWVudCkudHJpZ2dlcignbGlzdExvYWQnICsgdGhpcy5wcm9wcy5kb2N0eXBlKTtcblx0XHR9XG5cdFx0Ly9qdXN0IGxhYmxlXG5cdFx0ZWxzZSBpZih0aGlzLmxpc3RUb29sLml0ZW1zICE9PSB1bmRlZmluZWQgJiYgdGhpcy5saXN0VG9vbC5pdGVtcyAhPT0gbnVsbCl7XG5cdFx0XHRmb3IobGV0IGl0ZW0gb2YgdGhpcy5saXN0VG9vbC5pdGVtcyl7XG5cdFx0XHRcdHRoaXMuaXRlbWxpc3QucHVzaChpdGVtW3RoaXMucHJvcHMuZG9jdmFsdWVdKTtcblx0XHRcdH1cblx0XHRcdCQoZG9jdW1lbnQpLnRyaWdnZXIoJ2xpc3RMb2FkJyArIHRoaXMucHJvcHMuZG9jdHlwZS5yZXBsYWNlKFwiIFwiLFwiXCIpKTtcblx0XHR9XG5cdH1cblx0Y29tcG9uZW50V2lsbFVubW91bnQoKXtcblx0XHQvLyBjb25zb2xlLmxvZyhcIkhFTExPXCIpO1xuXHRcdC8vIHRoaXMuYXcuZGVzdHJveSgpO1xuXHRcdC8vIGRlbGV0ZSB0aGlzLmF3O1xuXHRcdC8vIGNvbnNvbGUubG9nKFwiVEVTVFwiKTtcblx0fVxuXHRyZWZDYWxsKGlucHV0KXtcblx0XHR0aGlzLmlucHV0PWlucHV0O1xuXHR9XG5cdGF1dG9jb21wbGV0ZShpbnB1dCl7XG5cdFx0aW5wdXQ9dGhpcy5pbnB1dDtcblx0XHR2YXIgY29uZmlnPSB7XG5cdFx0XHRcdG1pbkNoYXJzOiAwLFxuXHRcdFx0XHRtYXhJdGVtczogOTksXG5cdFx0XHRcdGF1dG9GaXJzdDogdHJ1ZSxcblx0XHRcdFx0ZmlsdGVyOiBBd2Vzb21wbGV0ZS5GSUxURVJfU1RBUlRTV0lUSFxuXHRcdFx0fVxuXHRcdGlmKHRoaXMucHJvcHMuZG9jbGFibGUgIT09IHVuZGVmaW5lZCApe1xuXHRcdFx0Y29uZmlnLml0ZW09IGZ1bmN0aW9uKGl0ZW0sIGlucHV0KSB7XG5cdFx0XHRcdHZhciBkID0gaXRlbTtcblx0XHRcdFx0dmFyIGh0bWwgPSBcIjxzcGFuPlwiICsgX18oaXRlbS5sYWJlbCkrIFwiPC9zcGFuPjxicj48c3Bhbj48c21hbGw+XCIraXRlbS52YWx1ZStcIjwvc21hbGw+PC9zcGFuPlwiO1xuXHRcdFx0XHRyZXR1cm4gJCgnPGxpPjwvbGk+Jylcblx0XHRcdFx0XHQuZGF0YSgnaXRlbS5hdXRvY29tcGxldGUnLCBpdGVtKVxuXHRcdFx0XHRcdC5odG1sKCc8YT48cD4nICsgaHRtbCArICc8L3A+PC9hPicpXG5cdFx0XHRcdFx0LmdldCgwKTtcblx0XHRcdH1cblxuXHRcdH1lbHNle1xuXHRcdFx0Y29uZmlnLml0ZW09ZnVuY3Rpb24oaXRlbSwgaW5wdXQpIHtcblx0XHRcdFx0dmFyIGQgPSBpdGVtO1xuXHRcdFx0XHR2YXIgaHRtbCA9IFwiPHNwYW4+XCIgKyBfXyhpdGVtKSsgXCI8L3NwYW4+XCI7XG5cdFx0XHRcdHJldHVybiAkKCc8bGk+PC9saT4nKVxuXHRcdFx0XHRcdC5kYXRhKCdpdGVtLmF1dG9jb21wbGV0ZScsIGl0ZW0pXG5cdFx0XHRcdFx0Lmh0bWwoJzxhPjxwPicgKyBodG1sICsgJzwvcD48L2E+Jylcblx0XHRcdFx0XHQuZ2V0KDApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLmF3ID0gbmV3IEF3ZXNvbXBsZXRlKGlucHV0LGNvbmZpZyk7XG5cdFx0aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRcdCdhd2Vzb21wbGV0ZS1zZWxlY3Rjb21wbGV0ZScsXG5cdFx0XHRcdHRoaXMuaW5wdXRDaGFuZ2Vcblx0XHQpO1xuXHRcdCQoaW5wdXQpLmNsaWNrKCBmdW5jdGlvbigpIHtcblx0XHRcdGlmICh0aGlzLmF3LnVsLmNoaWxkTm9kZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdHRoaXMuYXcubWluQ2hhcnMgPSAwO1xuXHRcdFx0XHR0aGlzLmF3LmV2YWx1YXRlKCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmICh0aGlzLmF3LnVsLmhhc0F0dHJpYnV0ZSgnaGlkZGVuJykpIHtcblx0XHRcdFx0dGhpcy5hdy5vcGVuKCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dGhpcy5hdy5jbG9zZSgpO1xuXHRcdFx0fVxuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5hdy5saXN0PXRoaXMuaXRlbUxpc3Q7XG5cdFx0JChkb2N1bWVudCkuYmluZCgnbGlzdExvYWQnICsgdGhpcy5wcm9wcy5kb2N0eXBlLnJlcGxhY2UoXCIgXCIsXCJcIiksZnVuY3Rpb24oKXtcblx0XHRcdHRoaXMuYXcubGlzdD10aGlzLml0ZW1saXN0O1xuXHRcdH0uYmluZCh0aGlzKSk7XG5cdH1cblx0aW5wdXRDaGFuZ2UoZSl7XG5cdFx0dGhpcy5wcm9wcy5pbnB1dENoYW5nZWQoZSk7XG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnR5cGUgPSAodGhpcy5wcm9wcy50eXBlID09PSB1bmRlZmluZWQpID8gXCJ0ZXh0XCI6IHRoaXMucHJvcHMudHlwZTtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMucGxhY2Vob2xkZXIgPSAodGhpcy5wcm9wcy5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXI7XG5cdFx0dGhpcy5sYWJsZSA9ICh0aGlzLnByb3BzLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5sYWJsZTtcblx0XHR0aGlzLmRpc2FibGVkID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5kaXNhYmxlZD09ZmFsc2V8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZXF1aXJlZCA9ICh0aGlzLnByb3BzLnJlcXVpcmVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVxdWlyZWQ9PWZhbHNlfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVhZG9ubHkgPSAodGhpcy5wcm9wcy5yZWFkb25seSA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1mYWxzZXx8dGhpcy5wcm9wcy5yZWFkb25seT09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblxuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblx0XHR0aGlzLmNsYXNzTmFtZT0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJmb3JtLWNvbnRyb2wgYXdlc29tcGxldGVcIjogXCJmb3JtLWNvbnRyb2wgYXdlc29tcGxldGUgXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHZhciBpbnB1dD0oIDxpbnB1dFxuXHRcdFx0XHRcdHZhbHVlPXt0aGlzLnZhbHVlfVxuXG5cdFx0XHRcdFx0dHlwZT17dGhpcy50eXBlfSBcblx0XHRcdFx0XHRjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfSBcblx0XHRcdFx0XHRwbGFjZWhvbGRlcj17dGhpcy5wbGFjZWhvbGRlcn0gXG5cdFx0XHRcdFx0cmVmPXt0aGlzLnJlZkNhbGx9XG5cdFx0ICAgICAgICAgIFx0b25DaGFuZ2U9e3RoaXMuaW5wdXRDaGFuZ2V9XG5cdFx0ICAgICAgICAgIFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdFx0ICAgICAgICAgIFx0cmVhZE9ubHk9e3RoaXMucmVhZG9ubHl9XG5cdFx0ICAgICAgICAgIFx0cmVxdWlyZWQ9e3RoaXMucmVxdWlyZWR9XG5cdFx0ICAgICAgICAgIC8+KTtcblxuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy5sYWJsZSA9PVwiXCIpe1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgXCI+XG5cdFx0ICAgIFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbFwiPnt0aGlzLnByb3BzLmxhYmxlfTwvbGFiZWw+XG5cdFx0ICAgIFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIlwiPlxuXHRcdCAgICAgIFx0XHRcdHtpbnB1dH1cblx0XHQgICAgXHRcdDwvZGl2PlxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHQgICAgICBcdFx0e2lucHV0fVxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuZXhwb3J0IGNsYXNzIEJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy50eXBlID0gKHRoaXMucHJvcHMudHlwZSA9PT0gdW5kZWZpbmVkKSA/IFwidGV4dFwiOiB0aGlzLnByb3BzLnR5cGU7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLmRpc2FibGVkID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5kaXNhYmxlZD09ZmFsc2V8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dmFyIG91dHB1dD1cIlwiO1xuXHRcdHRoaXMuY2xhc3NOYW1lPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcImJ0blwiOiBcImJ0biBcIiArdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0dmFyIGlucHV0PSggXG5cdFx0XHQ8YnV0dG9uIFxuXHRcdFx0XHR0eXBlPXt0aGlzLnR5cGV9XG5cdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9IFxuXHRcdFx0XHR2YWx1ZT17dGhpcy52YWx1ZX1cblx0XHRcdFx0b25DbGljaz17dGhpcy5wcm9wcy5vbkNsaWNrfVxuXHRcdFx0XHRkaXNhYmxlZD17dGhpcy5kaXNhYmxlZH1cblx0XHRcdD57dGhpcy52YWx1ZX08L2J1dHRvbj5cblx0XHQpO1xuXG5cblx0XHRvdXRwdXQgPSAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0ICAgICAgXHRcdHtpbnB1dH1cblx0ICBcdFx0PC9kaXY+XG5cdCAgXHQpO1xuXG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuIiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kYWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5zdWJtaXQ9dGhpcy5zdWJtaXQuYmluZCh0aGlzKTtcblx0fVxuXHRzdWJtaXQoZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMucHJvcHMuc3VibWl0KGUpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHZhciBmb290ZXI9XCJcIjtcblx0XHRpZih0aGlzLnByb3BzLnN1Ym1pdCE9PSBmYWxzZSl7XG5cdFx0XHRmb290ZXI9KFx0XHRcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1mb290ZXJcIj5cblx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXNlY29uZGFyeVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2xvc2U8L2J1dHRvbj5cblx0XHRcdFx0XHQ8YnV0dG9uIFxuXHRcdFx0XHRcdFx0dHlwZT1cInN1Ym1pdFwiIFxuXHRcdFx0XHRcdFx0b25DbGljaz17dGhpcy5zdWJtaXR9IFxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgPlxuXHRcdFx0XHRcdFx0XHR7dGhpcy5wcm9wcy5zdWJtaXRUZXh0fVxuXHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdClcblx0XHR9XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbCBmYWRlIHRleHQtbGVmdCBwYW5lbC1kZWZhdWx0XCIgaWQ9e3RoaXMucHJvcHMuaWR9IHRhYkluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCIgYXJpYS1sYWJlbGxlZGJ5PVwiZXhhbXBsZU1vZGFsTGFiZWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2dcIiByb2xlPVwiZG9jdW1lbnRcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XG5cdFx0XHRcdFx0XHRcdDxoNCBjbGFzc05hbWU9XCJtb2RhbC10aXRsZVwiIGlkPVwiZXhhbXBsZU1vZGFsTGFiZWxcIj57dGhpcy5wcm9wcy50aXRsZX08L2g0PlxuXHRcdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBkaXNwbGF5PVwibm9uZVwiIGNsYXNzTmFtZT1cImNsb3NlIGhpZGVcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPlxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxuXHRcdFx0XHRcdFx0XHRcdHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHR7Zm9vdGVyfVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLmluaXRUYWJsZT10aGlzLmluaXRUYWJsZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY29tcG9uZW50RGlkVXBkYXRlPXRoaXMuY29tcG9uZW50RGlkVXBkYXRlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jb21wb25lbnRXaWxsVXBkYXRlPXRoaXMuY29tcG9uZW50V2lsbFVwZGF0ZS5iaW5kKHRoaXMpO1xuXG5cdH1cblxuXHRpbml0VGFibGUoKXtcblx0XHQvL1xuXHRcdC8vIGlmKHRoaXMudGFibGUgIT09IHVuZGVmaW5lZCl7XG5cdFx0Ly8gXHR0aGlzLnRhYmxlLmRlc3Ryb3koKTtcblx0XHQvLyB9XG5cdFx0dmFyIGNvbmZpZz17XG5cdCAgICBcdFwiZGVzdHJveVwiOiB0cnVlLFxuXHQgICAgXHRcInNjcm9sbFlcIjogJzcwdmgnLFxuICAgICAgICBcdFwic2Nyb2xsQ29sbGFwc2VcIjogdHJ1ZSxcblx0ICAgICAgICBcInNjcm9sbFhcIjogdHJ1ZSxcblx0ICAgICAgICBcInBhZ2luZ1wiOiAgIGZhbHNlLFxuXHQgICAgICAgIFwic3RhdGVTYXZlXCI6IHRydWUsXG5cdCAgICAgICAgXCJjb2x1bW5zXCI6IHRoaXMucHJvcHMuY29sdW1ucyxcblx0ICAgICAgICBcImluZm9cIjogICAgIGZhbHNlXG5cdCAgICB9O1xuXHQgICAgaWYodGhpcy5wcm9wcy5zZWFyY2gpe1xuXHQgICAgXHRjb25maWcuc2VhcmNoaW5nPXRydWU7XG5cdCAgICB9XG5cdCAgICBlbHNle2NvbmZpZy5zZWFyY2hpbmc9ZmFsc2U7fVxuXHQgICAgdGhpcy50YWJsZT0kKFwiI1wiK3RoaXMucHJvcHMuaWQpLkRhdGFUYWJsZShjb25maWcpO1xuXHR9XG5cdGNvbXBvbmVudFdpbGxVcGRhdGUoKXtcblxuXHRcdGlmKHRoaXMudGFibGUgIT09IHVuZGVmaW5lZCl7XG5cdFx0XHRjb25zb2xlLmxvZyhcIkRFU1RST1lcIik7XG5cdFx0XHR0aGlzLnRhYmxlLmRlc3Ryb3koKTtcblx0XHR9XG5cdH1cblx0Y29tcG9uZW50RGlkVXBkYXRlKCl7XG5cdFx0dGhpcy5pbml0VGFibGUoKTtcblx0fVxuXG5cdHJlbmRlcigpe1xuXHRcdHJldHVybihcblxuXHRcdFx0PHRhYmxlXG5cdFx0XHRcdGNsYXNzTmFtZT1cInN0cmlwZSB0YWJsZSB0YWJsZS1ib3JkZXJlZCBwcy1saXN0LXRhYmxlXCIgXG5cdFx0XHRcdHdpZHRoPVwiMTAwJVwiXG5cdFx0XHRcdGlkPXt0aGlzLnByb3BzLmlkfVxuXHRcdFx0XHQ+XG5cdFx0XHRcdHt0aGlzLnByb3BzLmNvbnRlbnR9XG5cdFx0XHQ8L3RhYmxlPlxuXHRcdCk7XG5cdH1cbn0iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbi8vIGltcG9ydCBGb3JtIGZyb20gJy4uLy4uL3B1YmxpYy9qcy9tb2R1bGVzL3V0aWxzL2Zvcm1zJ1xuLy8gaW1wb3J0IEFjb3JkaWFuIGZyb20gJy4uLy4uL3B1YmxpYy9qcy9tb2R1bGVzL3V0aWxzL2Fjb3JkaWFuJ1xuLy8gaW1wb3J0IEFjb3JkaWFuQ29udGVudCBmcm9tICcuLi8uLi9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9hY29yZGlhbkNvbnRlbnQnXG5pbXBvcnQgRG9jVGFibGUgZnJvbSAnLi4vLi4vcHVibGljL2pzL21vZHVsZXMvdXRpbHMvZG9jVGFibGUnXG5cbi8vaW1wb3J0IFNwcmF5VGFibGUgZnJvbSAnLi4vLi4vcHVibGljL2pzL21vZHVsZXMvdmluZXlhcmQvc3ByYXlUYWJsZSdcblxuXG5cbi8vY29uc3QgYXBwPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJyk7XG5jb25zdCBhcHA9ICQoJyNhcHAnKVswXTtcblxuLy8gY2xhc3MgQ3JlYXRlV29ya29yZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuLy8gXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG4vLyBcdFx0c3VwZXIocHJvcHMpO1xuLy8gXHR9XG4vLyBcdC8vPEFmZml4V3JhcHBlciBjbGFzc05hbWU9XCJzdGlja3lfc3VibmF2IHRleHQtY2VudGVyXCIgIG9mZnNldD17MTQwfSBoZWlnaHQ9XCI0MHB4XCI+PC9BZmZpeFdyYXBwZXI+XG4vLyBcdHNvbWVGdW5jdGlvbigpe1xuXG4vLyBcdH1cbi8vIFx0cmVuZGVyKCl7XG4vLyBcdFx0dmFyIGZpZWxkcz1bXG4vLyBcdFx0XHR7XG4vLyBcdFx0XHRcdGZpZWxkOlwiaGVhZGVyXCIsXG4vLyBcdFx0XHRcdGxhYmxlOlwiVEVTVElOR1wiXG4vLyBcdFx0XHR9LFxuXG4vLyBcdFx0XHR7XG4vLyBcdFx0XHRcdGZpZWxkOlwiaW5wdXRcIixcbi8vIFx0XHRcdFx0b25DaGFuZ2U6IHRoaXMuc29tZUZ1bmN0aW9uLFxuLy8gXHRcdFx0XHRsYWJsZTpcInRlc3RcIlxuLy8gXHRcdFx0fSxcbi8vIFx0XHRcdHtcbi8vIFx0XHRcdFx0ZmllbGQ6XCJsYWJsZVwiLFxuLy8gXHRcdFx0XHRsYWJsZTpcIlRFU1hTREZcIlxuLy8gXHRcdFx0fSxcbi8vIFx0XHRcdHtcbi8vIFx0XHRcdFx0ZmllbGQ6XCJpbnB1dFwiLFxuLy8gXHRcdFx0XHRvbkNoYW5nZTogdGhpcy5zb21lRnVuY3Rpb24sXG4vLyBcdFx0XHRcdGxhYmxlOlwidGVzdDJcIlxuLy8gXHRcdFx0fSxcbi8vIFx0XHRcdHtcbi8vIFx0XHRcdFx0ZmllbGQ6XCJkYXRlXCIsXG4vLyBcdFx0XHRcdG9uQ2hhbmdlOiB0aGlzLnNvbWVGdW5jdGlvbixcbi8vIFx0XHRcdFx0bGFibGU6XCJEYXRlXCJcbi8vIFx0XHRcdH0sXG4vLyBcdFx0XHR7XG4vLyBcdFx0XHRcdGZpZWxkOlwic2VsZWN0XCIsXG4vLyBcdFx0XHRcdG9uQ2hhbmdlOiB0aGlzLnNvbWVGdW5jdGlvbixcbi8vIFx0XHRcdFx0bGFibGU6XCJ0ZXN0MlwiLFxuLy8gXHRcdFx0XHRvcHRpb25zOltcbi8vIFx0XHRcdFx0XHR7IFxuLy8gXHRcdFx0XHRcdFx0Z3JvdXA6IFwidGhpbmdcIixcbi8vIFx0XHRcdFx0XHRcdG9wdGlvbnM6IFtcbi8vIFx0XHRcdFx0XHRcdFx0XCJvbmVcIixcbi8vIFx0XHRcdFx0XHRcdFx0XCJ0d29cIixcbi8vIFx0XHRcdFx0XHRcdFx0XCJ0aHJlZVwiXG4vLyBcdFx0XHRcdFx0XHRdXG4vLyBcdFx0XHRcdFx0fSxcbi8vIFx0XHRcdFx0XHR7XG4vLyBcdFx0XHRcdFx0XHRncm91cDogXCJ0aGluZzJcIixcbi8vIFx0XHRcdFx0XHRcdG9wdGlvbnM6IFtcbi8vIFx0XHRcdFx0XHRcdFx0XCJvbmVcIixcbi8vIFx0XHRcdFx0XHRcdFx0XCJ0d29cIixcbi8vIFx0XHRcdFx0XHRcdFx0XCJ0aHJlZVwiXG4vLyBcdFx0XHRcdFx0XHRdXG4vLyBcdFx0XHRcdFx0fVxuLy8gXHRcdFx0XHRdXG4vLyBcdFx0XHR9LFxuLy8gXHRcdFx0e1xuLy8gXHRcdFx0XHRmaWVsZDpcInNlbGVjdFwiLFxuLy8gXHRcdFx0XHRvbkNoYW5nZTogdGhpcy5zb21lRnVuY3Rpb24sXG4vLyBcdFx0XHRcdGxhYmxlOlwidGVzdDJcIixcbi8vIFx0XHRcdFx0dmFsdWU6XCJ0d29cIixcbi8vIFx0XHRcdFx0b3B0aW9uczpbXG4vLyBcdFx0XHRcdFx0XCJvbmVcIixcbi8vIFx0XHRcdFx0XHRcInR3b1wiLFxuLy8gXHRcdFx0XHRcdFwidGhyZWVcIlxuLy8gXHRcdFx0XHRdXG4vLyBcdFx0XHR9LFxuLy8gXHRcdFx0e1xuLy8gXHRcdFx0XHRmaWVsZDpcImNoZWNrXCIsXG4vLyBcdFx0XHRcdGNsYXNzTmFtZTpcImJpZy1jaGVja2JveFwiLFxuLy8gXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7Y29uc29sZS5sb2coZS50YXJnZXQuY2hlY2tlZCl9LFxuLy8gXHRcdFx0XHRsYWJsZTpcInRoaXMgaXMgYSB0ZXN0XCJcbi8vIFx0XHRcdH0sXG4vLyBcdFx0XHR7XG4vLyBcdFx0XHRcdGxhYmxlOlwiVGVzdCBUZXh0IEFyZWFcIixcbi8vIFx0XHRcdFx0ZmllbGQ6XCJ0ZXh0YXJlYVwiLFxuLy8gXHRcdFx0XHRjbGFzc05hbWU6XCJcIixcbi8vIFx0XHRcdFx0b25DaGFuZ2U6IHRoaXMuc29tZUZ1bmN0aW9uXG4vLyBcdFx0XHR9LFxuLy8gXHRcdFx0e1xuLy8gXHRcdFx0XHRmaWVsZDpcImF1dG9Db21wbGV0ZVwiLFxuLy8gXHRcdFx0XHRvbkNoYW5nZTogdGhpcy5zb21lRnVuY3Rpb24sXG4vLyBcdFx0XHRcdGxhYmxlOlwiVmluZXlhcmRcIixcbi8vIFx0XHRcdFx0ZG9jdHlwZTpcIlZpbmV5YXJkXCIsXG4vLyBcdFx0XHRcdGRvY3ZhbHVlOlwibmFtZVwiXG4vLyBcdFx0XHR9LFxuLy8gXHRcdFx0e1xuLy8gXHRcdFx0XHRmaWVsZDpcImF1dG9Db21wbGV0ZVwiLFxuLy8gXHRcdFx0XHRvbkNoYW5nZTogdGhpcy5zb21lRnVuY3Rpb24sXG4vLyBcdFx0XHRcdGxhYmxlOlwiQ3VzdG9tZXJcIixcbi8vIFx0XHRcdFx0ZG9jdHlwZTpcIkN1c3RvbWVyXCIsXG4vLyBcdFx0XHRcdGRvY2xhYmxlOlwiZnVsbF9uYW1lXCIsXG4vLyBcdFx0XHRcdGRvY3ZhbHVlOlwibmFtZVwiXG4vLyBcdFx0XHR9XG4vLyBcdFx0XVxuLy8gXHRcdHJldHVybihcbi8vIFx0XHRcdDxkaXY+XG4vLyBcdFx0XHQ8Rm9ybVxuLy8gXHRcdFx0XHR0eXBlPVwiaG9yaXpvbnRhbFwiXG4vLyBcdFx0XHRcdGZpZWxkcz17ZmllbGRzfVxuLy8gXHRcdFx0XHRpZD1cInRoaW5nXCJcbi8vIFx0XHRcdD5cblxuLy8gXHRcdFx0PC9Gb3JtPlxuLy8gXHRcdFx0PC9kaXY+XG4vLyBcdFx0KTtcbi8vIFx0fVxuLy8gfVxuXG5cbi8qXHRcdFx0PERvY3R5cGVGb3JtIFxuXHRcdFx0XHRjbG9zZT17dGhpcy5jbG9zZX1cblx0XHRcdFx0aXRlbUNoYW5nZT17dGhpcy5vbkNoYW5nZX1cblx0XHRcdFx0Y3JlYXRlPXt0aGlzLmNyZWF0ZX1cblx0XHRcdFx0ZWRpdD17dGhpcy51cGRhdGV9XG5cdFx0XHRcdGRlbGV0ZT17dGhpcy5kZWxldGV9XG5cdFx0XHRcdG1vZGU9e3RoaXMuc3RhdGUuZm9ybU1vZGV9XG5cdFx0XHRcdGl0ZW09e2l0ZW19XG5cdFx0XHRcdGlkPXt0aGlzLnByb3BzLndvcmtvcmRlcn1cblxuXHRcdFx0XHRkb2N0eXBlPVwiU3ByYXlpbmdcIlxuXHRcdFx0XHRzZWFzb249eyB7YWN0aXZlOjF9fVxuXHRcdFx0XHRub3RlPXsge1xuXHRcdFx0XHRcdGFjdGl2ZToxLFxuXHRcdFx0XHRcdHR5cGU6XCJ0ZXh0YXJlYVwiIFxuXHRcdFx0XHR9fSBcblx0XHRcdFx0c3ByYXlfdHlwZT17IHthY3RpdmU6MX19XG5cdFx0XHQvPiBcdCovXG5cbmNvbnN0IGFwcDI9ICQoJyNhcHAyJylbMF07XG4oZnVuY3Rpb24oKXtcblx0dmFyIGZpbHRlcj17fTtcblx0ZnJhcHBlLnJlYWR5KGZ1bmN0aW9uKCl7XG5cdFx0UmVhY3RET00ucmVuZGVyKCBcblx0XHRcdDxEb2NUYWJsZSBcblx0XHRcdFx0ZG9jdHlwZT1cIlNwcmF5aW5nXCJcblx0XHRcdFx0aWQ9XCJkb2N0YWJsZVwiXG5cdFx0XHRcdGZpbHRlcj17IHt9IH1cblx0XHRcdFx0Y29uZmlnPXtbXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bGFibGU6XCJWaW5leWFyZFwiLFxuXHRcdFx0XHRcdFx0dmFsdWU6XCJ2aW5leWFyZFwiLFxuXHRcdFx0XHRcdFx0aHJlZjpcInZpbmV5YXJkX3JvdXRlXCIsXG5cdFx0XHRcdFx0XHRhY3RpdmU6MCxcblx0XHRcdFx0XHRcdGRlZmF1bHQ6XCJDUlYgVmluZXNcIlxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bGFibGU6XCJTZWFzb25cIixcblx0XHRcdFx0XHRcdHZhbHVlOlwic2Vhc29uXCIsXG5cdFx0XHRcdFx0XHRhY3RpdmU6MVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bGFibGU6XCJOb3RlXCIsXG5cdFx0XHRcdFx0XHR2YWx1ZTpcIm5vdGVcIixcblx0XHRcdFx0XHRcdGFjdGl2ZToxLFxuXHRcdFx0XHRcdFx0dHlwZTpcInRleHRhcmVhXCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGxhYmxlOlwiU3ByYXkgVHlwZVwiLFxuXHRcdFx0XHRcdFx0dmFsdWU6XCJzcHJheV90eXBlXCIsXG5cdFx0XHRcdFx0XHRhY3RpdmU6MVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XX1cblx0XHRcdFx0ZWRpdGFibGU9ezF9XG5cdFx0XHQvPiBcblx0XHQsIGFwcDIgKTtcblx0fSlcblxufSkoKTtcblxuXG4vLyBjb25zdCBhcHAyPSAkKCcjYXBwMicpWzBdO1xuLy8gKGZ1bmN0aW9uKCl7XG4vLyBcdHZhciBmaWx0ZXI9e307XG4vLyBcdGZyYXBwZS5yZWFkeShmdW5jdGlvbigpe1xuLy8gXHRcdFJlYWN0RE9NLnJlbmRlciggXG4vLyBcdFx0XHQ8ZGl2PjxEb2N0eXBlRm9ybSBcbi8vIFx0XHRcdFx0aWQ9XCJjcmVhdGVQcnVuRW50cnlcIiBcbi8vIFx0XHRcdFx0ZG9jdHlwZT1cIlBydW5pbmdcIlxuLy8gXHRcdFx0XHRzZWFzb249eyAge2FjdGl2ZToxfSAgfVxuLy8gXHRcdFx0XHRub3RlPXsge1xuLy8gXHRcdFx0XHRcdGFjdGl2ZToxLFxuLy8gXHRcdFx0XHRcdHR5cGU6XCJ0ZXh0YXJlYVwiIFxuLy8gXHRcdFx0XHR9fVxuLy8gXHRcdFx0XHR0eXBlPXsge2FjdGl2ZToxfSB9XG4vLyBcdFx0XHRcdGJfbG9jaz17IHthY3RpdmU6MX19XG4vLyBcdFx0XHRcdHJlbW92ZWQ9eyB7YWN0aXZlOjF9fVxuLy8gXHRcdFx0XHRwcmVfcHJ1bmU9eyB7YWN0aXZlOjF9fVxuLy8gXHRcdFx0XHR0YXBfcmVtb3ZlZD17IHthY3RpdmU6MX19XG4vLyBcdFx0XHQvPiA8Q3JlYXRlV29ya29yZGVyIC8+PC9kaXY+XHQsIGFwcDIgKTtcbi8vIFx0fSlcblxuLy8gfSkoKTtcblxuLy8gY29uc3QgYXBwMj0gJCgnI2FwcDInKVswXTtcbi8vIChmdW5jdGlvbigpe1xuLy8gXHR2YXIgZmlsdGVyPXt9O1xuLy8gXHRmcmFwcGUucmVhZHkoZnVuY3Rpb24oKXtcbi8vIFx0XHRSZWFjdERPTS5yZW5kZXIoIDxTcHJheVRhYmxlIGZpbHRlcj17ZmlsdGVyfSAvPiAsIGFwcDIgKTtcbi8vIFx0fSlcblxuLy8gfSkoKTtcblxuXG5cbiJdfQ==
