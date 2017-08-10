(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
		console.log(_this.props.toggleAll);
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
						console.log(this.props.toggleAll);
						console.log(this.props.toggleAll == false);
						if (this.props.toggleAll == false) {
							$('#' + id).collapse('toggle');
						} else {
							console.log(id);
							$('#' + this.props.parentId + ' .acordian-content.in').not('#' + id).collapse('hide');
							$('#' + id).collapse('toggle');
						}
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
			var className = this.props.active ? "acordian-content panel-collapse collapse in" : "acordian-content panel-collapse collapse";
			if (this.props.className) {
				className = className + " " + this.props.className;
			}
			return React.createElement(
				"div",
				{ className: "panel panel-default acordian-panel" },
				this.renderHead(id),
				React.createElement(
					"div",
					{ id: id,
						className: className,
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

},{}],2:[function(require,module,exports){
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
				if (item.inTable !== false) {
					columns.push({ title: item.lable });
				}
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
					console.log(item);
					var tdcontent = [];
					for (var x = 0; x < this.props.config.length; x++) {
						var config = this.props.config[x];
						if (config.inTable !== false) {
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
								if (item[config.value] === true) {
									tdcontent.push(React.createElement(
										'td',
										null,
										'1'
									));
								} else if (item[config.value] === false) {
									tdcontent.push(React.createElement(
										'td',
										null,
										'0'
									));
								} else {
									tdcontent.push(React.createElement(
										'td',
										null,
										item[config.value]
									));
								}
							}
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

},{"../utils/doctypeForm":3,"../utils/modal":5,"../utils/table":6}],3:[function(require,module,exports){
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
					var props = ["value", "lable", "className", "readonly", "disable", "require", "value", "rows"];
					props = ps.initProps(props, item);

					return React.createElement(Textarea, {
						key: this.props.id + index,
						value: props.value,
						className: props.className,
						lable: props.lable,
						readOnly: props.readonly,
						disabled: props.disabled,
						required: props.required,
						rows: props.rows,
						inputChanged: function inputChanged(e) {
							item.onChange(e);
						}
					});
				}.bind(this),
				input: function (item, index) {
					var props = ["type", "value", "placeholder", "lable", "className", "readonly", "disabled", "required", "error"];
					props = ps.initProps(props, item);
					if (props.type == "") {
						props.type = "text";
					}

					return React.createElement(Input, {
						key: this.props.id + index,
						type: props.type,
						value: props.value,
						placeholder: props.placeholder,
						lable: props.lable,
						className: props.className,
						readonly: props.readonly,
						disabled: props.disabled,
						required: props.required,
						error: props.error,
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
					var optinal = ["value", "className", "disable", "icon"];
					var props = ps.initProps(optinal, item);
					return React.createElement(Button, {
						key: this.props.id + index,
						value: props.value,
						className: props.className,
						disabled: props.disabled,
						icon: props.icon,
						onClick: function onClick(e) {
							item.onClick(e);
						}
					});
				}.bind(this)
			};
			this.props.fields.map(function (item, index) {
				if ($.isEmptyObject(item)) {} else {
					if (this.props.type == "inline") {
						var rowClass = 12 / this.props.rows;
						rowClass = "col-xs-" + rowClass;
						form.push(React.createElement(
							"div",
							{ className: rowClass },
							formTypes[item.field](item, index)
						));
					} else {
						form.push(React.createElement(
							"div",
							{ className: rowClass },
							formTypes[item.field](item, index)
						));
					}
				}
			}.bind(this));
			//for(var x=0; x < this.props.feilds.length x++; )
			var className = this.props.className === undefined ? "react-form" : "react-form " + this.props.className;
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

			var lable = "";
			if (this.props.lable !== undefined && this.props.lable !== "") {
				lable = React.createElement(
					"label",
					{ className: "control-label" },
					this.props.lable
				);
			}
			output = React.createElement(
				"div",
				{ className: "form-group" },
				lable,
				select
			);
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
			var wrapperClass = "form-group";
			if (this.props.error) {
				wrapperClass += " " + "has-error";
			}
			var lable = "";
			if (this.props.lable !== undefined && this.props.lable !== "") {
				lable = React.createElement(
					"label",
					{ className: "control-label" },
					this.props.lable
				);
			}
			output = React.createElement(
				"div",
				{ className: wrapperClass },
				lable,
				input
			);
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
			var lable = "";
			if (this.props.lable !== undefined && this.props.lable !== "") {
				lable = React.createElement(
					"label",
					{ className: "control-label" },
					this.props.lable
				);
			}
			output = React.createElement(
				"div",
				{ className: "form-group" },
				lable,
				input
			);
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
			var icon = "";
			if (this.props.icon !== undefined && this.props.icon !== "") {
				var iconClass = "glyphicon " + this.props.icon;
				icon = React.createElement("span", { className: iconClass, "aria-hidden": "true" });
			}
			var input = React.createElement(
				"button",
				{
					type: this.type,
					className: this.className,
					value: this.value,
					onClick: this.props.onClick,
					disabled: this.disabled
				},
				icon,
				" ",
				this.value
			);
			return React.createElement(
				"div",
				{ className: "form-group" },
				input
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

},{}],7:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _forms = require('../../public/js/modules/utils/forms');

var _forms2 = _interopRequireDefault(_forms);

var _docTable = require('../../public/js/modules/utils/docTable');

var _docTable2 = _interopRequireDefault(_docTable);

var _acordianContent = require('../../public/js/modules/utils/acordianContent');

var _acordianContent2 = _interopRequireDefault(_acordianContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*jshint ignore:start */

// import Acordian from '../../public/js/modules/utils/acordian'
// import AcordianContent from '../../public/js/modules/utils/acordianContent'


//import SprayTable from '../../public/js/modules/vineyard/sprayTable'


var app = document.getElementById('app');

var FieldForm = function (_React$Component) {
	_inherits(FieldForm, _React$Component);

	function FieldForm(props) {
		_classCallCheck(this, FieldForm);

		var _this = _possibleConstructorReturn(this, (FieldForm.__proto__ || Object.getPrototypeOf(FieldForm)).call(this, props));

		_this.feilds = [{
			field: "select",
			onChange: _this.someFunction,
			value: "Input",
			options: ["Input", "Select", "Number", "Date", "Check", "Textarea"]
		}, {
			field: "input",
			onChange: _this.someFunction
		}, {
			field: "textarea",
			className: "",
			rows: "1",
			onChange: _this.someFunction
		}, {
			field: "button",
			value: "Remove",
			className: "btn-danger",
			onClick: _this.someFunction
		}];
		return _this;
	}

	_createClass(FieldForm, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'div',
					{ className: 'row' },
					React.createElement(_forms2.default, {
						type: 'inline',
						className: 'inline',
						rows: '4',
						fields: this.feilds,
						id: 'thing'
					})
				)
			);
		}
	}]);

	return FieldForm;
}(React.Component);

var DoctypeUpdater = function (_React$Component2) {
	_inherits(DoctypeUpdater, _React$Component2);

	function DoctypeUpdater(props) {
		_classCallCheck(this, DoctypeUpdater);

		var _this2 = _possibleConstructorReturn(this, (DoctypeUpdater.__proto__ || Object.getPrototypeOf(DoctypeUpdater)).call(this, props));

		_this2.state = { active: 0 };

		_this2.fields = [{
			label: "Active",
			field: "check",
			onChange: _this2.someFunction
		}];

		return _this2;
	}

	_createClass(DoctypeUpdater, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(_forms.Check, {
					lable: 'Active',
					value: this.state.active,
					inputChanged: function () {
						console.log("hello");
						var stateChange = this.state.active;
						if (stateChange == 1) {
							stateChange = 0;
						} else {
							stateChange = 1;
						}
						this.setState({ active: stateChange });
					}.bind(this)
				}),
				React.createElement(
					'div',
					{ className: 'row inline-form-header' },
					React.createElement(
						'div',
						{ className: 'col-xs-3' },
						'Type'
					),
					React.createElement(
						'div',
						{ className: 'col-xs-3' },
						'Name'
					),
					React.createElement(
						'div',
						{ className: 'col-xs-6' },
						'Options'
					)
				),
				React.createElement(FieldForm, null),
				React.createElement(FieldForm, null),
				React.createElement(_forms.Button, {
					className: 'btn-primary',
					value: 'Add Field',
					icon: 'glyphicon-align-left'
				}),
				React.createElement(_forms.Button, {
					className: 'btn-success',
					value: 'Update',
					icon: 'glyphicon-refresh'
				})
			);
		}
	}]);

	return DoctypeUpdater;
}(React.Component);

var TaskManager = function (_React$Component3) {
	_inherits(TaskManager, _React$Component3);

	function TaskManager(props) {
		_classCallCheck(this, TaskManager);

		var _this3 = _possibleConstructorReturn(this, (TaskManager.__proto__ || Object.getPrototypeOf(TaskManager)).call(this, props));

		_this3.taskUpdate = _this3.taskUpdate.bind(_this3);
		_this3.updateNewTaskName = _this3.updateNewTaskName.bind(_this3);
		_this3.createTask = _this3.createTask.bind(_this3);

		console.log("hello");
		_this3.doctypeTool = new ps.apiTool({ module: "Tasks" }, { doctype: 'DocType' }, _this3.taskUpdate);
		_this3.state = {
			tasks: _this3.doctypeTool.items,
			taskNameError: 0,
			newTaskName: ""
		};
		return _this3;
	}

	_createClass(TaskManager, [{
		key: 'taskUpdate',
		value: function taskUpdate() {
			this.setState({
				tasks: this.doctypeTool.items
			});
		}
	}, {
		key: 'updateNewTaskName',
		value: function updateNewTaskName(e) {
			this.setState({
				newTaskName: e.target.value,
				taskNameError: 0
			});
		}
	}, {
		key: 'createTask',
		value: function createTask(e) {
			e.preventDefault();
			if (this.state.newTaskName == "") {
				ps.failAlert("Task Name Required");
				this.setState({ taskNameError: 1 });
			} else {
				this.doctypeTool.create({
					name: this.state.newTaskName,
					module: "Tasks",
					custom: 1,
					fields: [{
						fieldname: "active",
						fieldtype: "Check"
					}],
					permissions: [{
						docType: "DocPerm",
						role: "System Manager"
					}]
				});
				this.setState({ newTaskName: "" });
			}
		}
	}, {
		key: 'render',
		value: function render() {
			console.log(this.state);
			var items = [];
			this.feilds = [{
				field: "input",
				value: this.state.newTaskName,
				placeholder: "Task Name",
				error: this.state.taskNameError,
				required: 1,
				onChange: this.updateNewTaskName
			}, {
				field: "button",
				value: "Create New Task",
				className: "btn-primary",
				icon: "glyphicon-plus",
				onClick: this.createTask
			}];
			console.log(this.doctypeTool.items);
			this.state.tasks.map(function (item) {
				items.push(React.createElement(
					_acordianContent2.default,
					{
						title: item.name,
						active: false,
						parentId: item.name,
						id: "task_display_" + item.name.replace(/ /g, "_") },
					React.createElement(DoctypeUpdater, {
						hiddenFields: ["Vineyard", "Hours", "Note", "Season", "Location", "Default_Rate"],
						doctypeItem: item
					})
				));
			});
			return React.createElement(
				'div',
				null,
				items,
				React.createElement(_forms2.default, {
					className: 'inline',
					type: 'inline',
					rows: '2',
					fields: this.feilds,
					id: 'thing'
				})
			);
		}
	}]);

	return TaskManager;
}(React.Component);

var app2 = $('#app2')[0];
(function () {
	var filter = {};
	frappe.ready(function () {
		ReactDOM.render(React.createElement(TaskManager, null), app2);
	});
})();

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

},{"../../public/js/modules/utils/acordianContent":1,"../../public/js/modules/utils/docTable":2,"../../public/js/modules/utils/forms":4}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdXRpbHMvYWNvcmRpYW5Db250ZW50LmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9kb2NUYWJsZS5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdXRpbHMvZG9jdHlwZUZvcm0uanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL3V0aWxzL2Zvcm1zLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9tb2RhbC5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdXRpbHMvdGFibGUuanN4IiwicHJvY2Vzc19zdWNjZXNzL3d3dy9wbGF5Z3JvdW5kL1BsYXlHcm91bmQuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7SUNBcUIsZTs7O0FBQ3BCLDBCQUFZLEtBQVosRUFBa0I7QUFBQTs7QUFBQSxnSUFDWCxLQURXOztBQUVqQixRQUFLLFVBQUwsR0FBa0IsTUFBSyxVQUFMLENBQWdCLElBQWhCLE9BQWxCO0FBQ0EsVUFBUSxHQUFSLENBQVksTUFBSyxLQUFMLENBQVcsU0FBdkI7QUFIaUI7QUFJakI7Ozs7NkJBQ1UsRSxFQUFHOztBQUViLFVBQ0M7QUFBQTtBQUFBLE1BQUssV0FBVSxlQUFmO0FBQ0MsV0FBSyxLQUROO0FBRUMsY0FDQyxZQUFVO0FBQ1QsY0FBUSxHQUFSLENBQVksS0FBSyxLQUFMLENBQVcsU0FBdkI7QUFDQSxjQUFRLEdBQVIsQ0FBWSxLQUFLLEtBQUwsQ0FBVyxTQUFYLElBQXNCLEtBQWxDO0FBQ0EsVUFBRyxLQUFLLEtBQUwsQ0FBVyxTQUFYLElBQXNCLEtBQXpCLEVBQStCO0FBQzlCLFNBQUUsTUFBSSxFQUFOLEVBQVUsUUFBVixD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S0FBSSxTQUFPLEVBQVg7QUFDQSxRQUFPLEtBQVAsQ0FBYSxZQUFVO0FBQ3RCLFdBQVMsTUFBVCxDQUNDLG9CQUFDLFdBQUQsT0FERCxFQUVFLElBRkY7QUFHQSxFQUpEO0FBTUEsQ0FSRDs7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWNvcmRpYW5Db250ZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMucmVuZGVySGVhZCA9IHRoaXMucmVuZGVySGVhZC5iaW5kKHRoaXMpO1xuXHRcdGNvbnNvbGUubG9nKHRoaXMucHJvcHMudG9nZ2xlQWxsKTtcblx0fVxuXHRyZW5kZXJIZWFkKGlkKXtcblxuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtaGVhZGluZ1wiIFxuXHRcdFx0XHRyb2xlPVwidGFiXCIgXG5cdFx0XHRcdG9uQ2xpY2s9e1xuXHRcdFx0XHRcdGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLnByb3BzLnRvZ2dsZUFsbCk7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLnByb3BzLnRvZ2dsZUFsbD09ZmFsc2UpO1xuXHRcdFx0XHRcdFx0aWYodGhpcy5wcm9wcy50b2dnbGVBbGw9PWZhbHNlKXtcblx0XHRcdFx0XHRcdFx0JCgnIycraWQpLmNvbGxhcHNlKCd0b2dnbGUnKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhpZCk7XG5cdFx0XHRcdFx0XHRcdCQoJyMnK3RoaXMucHJvcHMucGFyZW50SWQrJyAuYWNvcmRpYW4tY29udGVudC5pbicpLm5vdCgnIycraWQpLmNvbGxhcHNlKCdoaWRlJyk7XG5cdFx0XHRcdFx0XHRcdCQoJyMnK2lkKS5jb2xsYXBzZSgndG9nZ2xlJyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpXG5cdFx0XHRcdH1cblx0XHRcdFx0PlxuXHRcdFx0XHQ8aDQgY2xhc3NOYW1lPVwicGFuZWwtdGl0bGVcIj5cblx0XHRcdFx0XHQ8YSByb2xlPVwiYnV0dG9uXCIgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiIGRhdGEtcGFyZW50PXsnIycrdGhpcy5wcm9wcy5wYXJlbnRJZH0gYXJpYS1leHBhbmRlZD17KHRoaXMucHJvcHMuYWN0aXZlKT8gdHJ1ZTpmYWxzZX0gID5cblx0XHRcdCAgXHRcdFx0e3RoaXMucHJvcHMudGl0bGV9XG5cdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHQ8L2g0PlxuXHRcdFx0XHR7dGhpcy5wcm9wcy5leHRyYUhlYWR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHZhciBpZCA9dGhpcy5wcm9wcy5pZDtcblx0XHR2YXIgY2xhc3NOYW1lPSh0aGlzLnByb3BzLmFjdGl2ZSk/IFwiYWNvcmRpYW4tY29udGVudCBwYW5lbC1jb2xsYXBzZSBjb2xsYXBzZSBpblwiOlwiYWNvcmRpYW4tY29udGVudCBwYW5lbC1jb2xsYXBzZSBjb2xsYXBzZVwiO1xuXHRcdGlmKHRoaXMucHJvcHMuY2xhc3NOYW1lKXtcblx0XHRcdGNsYXNzTmFtZT1jbGFzc05hbWUrXCIgXCIrdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0fVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsIHBhbmVsLWRlZmF1bHQgYWNvcmRpYW4tcGFuZWxcIj5cblx0XHRcdFx0e3RoaXMucmVuZGVySGVhZChpZCl9XG5cdFx0XHRcdDxkaXYgaWQ9e2lkfSBcblx0XHRcdFx0XHRjbGFzc05hbWU9e2NsYXNzTmFtZX0gXG5cdFx0XHRcdFx0cm9sZT1cInRhYnBhbmVsXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYW5lbC1ib2R5XCI+XG5cdFx0XHRcdFx0XHR7IHRoaXMucHJvcHMuY2hpbGRyZW4gfVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuICBcdFx0KTtcblx0fVxufVxuIiwiaW1wb3J0IERvY3R5cGVGb3JtIGZyb20gJy4uL3V0aWxzL2RvY3R5cGVGb3JtJ1xuaW1wb3J0IFRhYmxlIGZyb20gJy4uL3V0aWxzL3RhYmxlJ1xuaW1wb3J0IE1vZGFsIGZyb20gJy4uL3V0aWxzL21vZGFsJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2NUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnJldHVybkNvbHVtbnM9dGhpcy5yZXR1cm5Db2x1bW5zLmJpbmQodGhpcyk7XG5cdFx0dGhpcy50YWJsZUNoYW5nZT10aGlzLnRhYmxlQ2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5yZXR1cm5Db250ZW50PXRoaXMucmV0dXJuQ29udGVudC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZWRpdGFibGVDb250ZW50PXRoaXMuZWRpdGFibGVDb250ZW50LmJpbmQodGhpcyk7XG5cdFx0Y29uc29sZS5sb2codGhpcy5wcm9wcy5maWx0ZXIpO1xuXHRcdHRoaXMudGFibGVUb29sID0gbmV3IHBzLmFwaVRvb2wodGhpcy5wcm9wcy5maWx0ZXIse2RvY3R5cGU6dGhpcy5wcm9wcy5kb2N0eXBlfSx0aGlzLnRhYmxlQ2hhbmdlKTtcblx0XHR0aGlzLnN0YXRlPXtcblx0XHRcdGl0ZW1zOnRoaXMudGFibGVUb29sLml0ZW1zLFxuXHRcdFx0Y3VycmVudEl0ZW06e30sXG5cdFx0XHRmb3JtTW9kZTpcImNyZWF0ZVwiXG5cblx0XHR9O1xuXHRcdHRoaXMubW9kYWxJRD10aGlzLnByb3BzLmlkK1wiX2Zvcm1fbW9kYWxcIjtcblx0fVxuICBcdHRhYmxlQ2hhbmdlKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7aXRlbXM6dGhpcy50YWJsZVRvb2wuaXRlbXN9KTtcblx0fVxuXHRyZXR1cm5Db2x1bW5zKCl7XG5cdFx0dmFyIGNvbHVtbnMgPVtdO1xuXHRcdGZvcih2YXIgeD0wOyB4IDwgdGhpcy5wcm9wcy5jb25maWcubGVuZ3RoOyB4Kyspe1xuXHRcdFx0dmFyIGl0ZW09dGhpcy5wcm9wcy5jb25maWdbeF07XG5cdFx0XHRpZihpdGVtLmluVGFibGUhPT1mYWxzZSl7XG5cdFx0XHRcdGNvbHVtbnMucHVzaCh7dGl0bGU6aXRlbS5sYWJsZX0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZih0aGlzLnByb3BzLmVkaXRhYmxlKXtcblx0XHRcdGNvbHVtbnMucHVzaCh7dGl0bGU6XCJFZGl0XCJ9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gY29sdW1ucztcblx0fVxuXHRyZXR1cm5Db250ZW50KCl7XG5cdFx0dmFyIGNvbnRlbnQ9W107XG5cdFx0aWYodGhpcy5zdGF0ZS5pdGVtcyE9PW51bGwpe1xuXHRcdFx0dGhpcy5zdGF0ZS5pdGVtcy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXHRcdFx0XHRjb25zb2xlLmxvZyhpdGVtKTtcblx0XHRcdFx0dmFyIHRkY29udGVudD1bXTtcblx0XHRcdFx0Zm9yKHZhciB4PTA7IHggPCB0aGlzLnByb3BzLmNvbmZpZy5sZW5ndGg7IHgrKyl7XG5cdFx0XHRcdFx0dmFyIGNvbmZpZz10aGlzLnByb3BzLmNvbmZpZ1t4XTtcblx0XHRcdFx0XHRpZihjb25maWcuaW5UYWJsZSE9PWZhbHNlKXtcblx0XHRcdFx0XHRcdGlmKGNvbmZpZy5ocmVmKXtcblx0XHRcdFx0XHRcdFx0dGRjb250ZW50LnB1c2goPHRkIGtleT17dGhpcy5wcm9wcy5pZCArIGluZGV4ICsgXCJfXCIgKyB4fSA+PGEgaHJlZj17aXRlbVtjb25maWcuaHJlZl19ID57aXRlbVtjb25maWcudmFsdWVdfTwvYT48L3RkPilcblx0XHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0XHRpZihpdGVtW2NvbmZpZy52YWx1ZV09PT10cnVlKXtcblx0XHRcdFx0XHRcdFx0XHR0ZGNvbnRlbnQucHVzaCg8dGQ+MTwvdGQ+KVxuXHRcdFx0XHRcdFx0XHR9ZWxzZSBpZiAoaXRlbVtjb25maWcudmFsdWVdPT09ZmFsc2Upe1xuXHRcdFx0XHRcdFx0XHRcdHRkY29udGVudC5wdXNoKDx0ZD4wPC90ZD4pXG5cdFx0XHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0XHRcdHRkY29udGVudC5wdXNoKDx0ZD57aXRlbVtjb25maWcudmFsdWVdfTwvdGQ+KVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKHRoaXMucHJvcHMuZWRpdGFibGUpe1xuXHRcdFx0XHRcdHRkY29udGVudC5wdXNoKFxuXHRcdFx0XHRcdFx0PHRkIGtleT17dGhpcy5wcm9wcy5pZCArIGluZGV4ICsgXCJfXCIgKyB4fSA+XG5cdFx0XHRcdFx0XHRcdDxidXR0b24gXG5cdFx0XHRcdFx0XHRcdFx0dHlwZT1cImJ1dHRvblwiIFxuXHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdCBpbmxpbmUtdGFza1wiXG5cdFx0XHRcdFx0XHRcdFx0b25DbGljaz17XG5cdFx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbigpe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRmb3JtTW9kZTpcImVkaXRcIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjdXJyZW50SXRlbTppdGVtXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkKFwiI1wiK3RoaXMubW9kYWxJRCkubW9kYWwoKTtcblx0XHRcdFx0XHRcdFx0XHRcdH0uYmluZCh0aGlzKVxuXHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0RWRpdCA8c3BhbiBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLWVkaXRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XG5cdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXG5cdFx0XHRcdFx0XHQ8L3RkPlxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29udGVudC5wdXNoKChcblx0XHRcdFx0XHQ8dHIga2V5PXt0aGlzLnByb3BzLmlkICsgaW5kZXh9PlxuXHRcdFx0XHRcdFx0e3RkY29udGVudH1cblx0XHRcdFx0XHQ8L3RyPlxuXHRcdFx0XHQpKTtcdFxuXHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHR9XG5cdFx0cmV0dXJuICg8dGJvZHk+e2NvbnRlbnR9PC90Ym9keT4pO1xuXHR9XG5cdGVkaXRhYmxlQ29udGVudCgpe1xuXHRcdHZhciBmb3JtUHJvcHM9e307XG5cdFx0Zm9ybVByb3BzLmRvY3R5cGU9dGhpcy5wcm9wcy5kb2N0eXBlO1xuXHRcdGZvcih2YXIgeD0wOyB4IDwgdGhpcy5wcm9wcy5jb25maWcubGVuZ3RoOyB4Kyspe1xuXHRcdFx0dmFyIGNvbmZpZz10aGlzLnByb3BzLmNvbmZpZ1t4XTtcblx0XHRcdGZvcm1Qcm9wc1tjb25maWcudmFsdWVdPWNvbmZpZztcblx0XHR9XG5cdFx0dmFyIGZvcm09KFxuXG5cdFx0XHRcdDxEb2N0eXBlRm9ybSBcblx0XHRcdFx0XHRjbG9zZT17ZnVuY3Rpb24oKXskKFwiI1wiK3RoaXMubW9kYWxJRCkubW9kYWwoJ2hpZGUnKTt9LmJpbmQodGhpcyl9XG5cdFx0XHRcdFx0aXRlbUNoYW5nZT17XG5cdFx0XHRcdFx0XHRmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7Y3VycmVudEl0ZW06aXRlbX0pfS5iaW5kKHRoaXMpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y3JlYXRlPXtcblx0XHRcdFx0XHRcdGZ1bmN0aW9uKGl0ZW0sZG9jdHlwZSl7XG5cdFx0XHRcdFx0XHRcdGZvcih2YXIgeD0wOyB4IDwgdGhpcy5wcm9wcy5jb25maWcubGVuZ3RoOyB4Kyspe1xuXHRcdFx0XHRcdFx0XHRcdHZhciBjb25maWc9dGhpcy5wcm9wcy5jb25maWdbeF07XG5cdFx0XHRcdFx0XHRcdFx0aWYoY29uZmlnLmRlZmF1bHQpe1xuXHRcdFx0XHRcdFx0XHRcdFx0aXRlbVtjb25maWcudmFsdWVdID0gY29uZmlnLmRlZmF1bHQ7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGl0ZW0uZG9jdHlwZT1kb2N0eXBlO1xuXHRcdFx0XHRcdFx0XHR0aGlzLnRhYmxlVG9vbC5jcmVhdGUoaXRlbSk7XG5cdFx0XHRcdFx0XHRcdCQoJyMnK3RoaXMubW9kYWxJRCkubW9kYWwoJ3RvZ2dsZScpO1xuXHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVkaXQ9e2Z1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0XHRcdFx0dGhpcy50YWJsZVRvb2wudXBkYXRlKGl0ZW0pO1xuXHRcdFx0XHRcdFx0JCgnIycrdGhpcy5tb2RhbElEKS5tb2RhbCgndG9nZ2xlJyk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpfVxuXHRcdFx0XHRcdGRlbGV0ZT17ZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdFx0XHQgIHRoaXMudGFibGVUb29sLmRlbGV0ZShpdGVtKTtcblx0XHRcdFx0XHRcdCQoJyMnK3RoaXMubW9kYWxJRCkubW9kYWwoJ3RvZ2dsZScpO1xuXHRcdFx0XHRcdH0uYmluZCh0aGlzKX1cblx0XHRcdFx0XHRtb2RlPXt0aGlzLnN0YXRlLmZvcm1Nb2RlfVxuXHRcdFx0XHRcdGl0ZW09e3RoaXMuc3RhdGUuY3VycmVudEl0ZW19XG5cdFx0XHRcdFx0aWQ9XCJ0aGluZ1wiXG5cdFx0XHRcdC8+XG5cdFx0KTtcblx0XHRcblx0XHQvL2xvb3AgdGhlIGNvbmZpZyB0byBjcmVhdGUgZm9ybSBpdGVtc1xuXG5cdFx0Zm9ybT1SZWFjdC5jbG9uZUVsZW1lbnQoZm9ybSAsZm9ybVByb3BzKTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PGJ1dHRvbiBcblx0XHRcdFx0XHR0eXBlPVwiYnV0dG9uXCIgXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgXG5cdFx0XHRcdFx0b25DbGljaz17ZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdFx0XHRmb3JtTW9kZTpcImNyZWF0ZVwiLFxuXHRcdFx0XHRcdFx0XHRjdXJyZW50SXRlbTp7fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHQkKFwiI1wiK3RoaXMubW9kYWxJRCkubW9kYWwoKTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcyl9XG5cdFx0XHRcdFx0PlxuXHRcdFx0XHRcdENyZWF0ZSB7dGhpcy5wcm9wcy5kb2N0eXBlfSA8c3BhbiBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLXBsdXNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XG5cdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHQ8TW9kYWwgXG5cdFx0XHRcdFx0aWQ9e3RoaXMubW9kYWxJRH1cblx0XHRcdFx0XHRzdWJtaXRUZXh0PVwiU3VibWl0XCIgXG5cdFx0XHRcdFx0dGl0bGU9e1wiQ3JlYXRlIFwiICsgdGhpcy5wcm9wcy5kb2N0eXBlfVxuXHRcdFx0XHRcdHN1Ym1pdD17ZmFsc2V9XG5cdFx0XHRcdFx0PlxuXHRcdFx0XHRcdHtmb3JtfVxuXHRcdFx0XHQ8L01vZGFsPlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQpO1xuXHR9XG5cdHNvbWVGdW5jdGlvbigpe1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHZhciBmb3JtPVwiXCI7XG5cdFx0aWYodGhpcy5wcm9wcy5lZGl0YWJsZSl7XG5cdFx0XHRmb3JtPXRoaXMuZWRpdGFibGVDb250ZW50KCk7XG5cdFx0fVxuXHRcdHZhciBjb2x1bW5zPXRoaXMucmV0dXJuQ29sdW1ucygpO1xuXHRcdHZhciBjb250ZW50PXRoaXMucmV0dXJuQ29udGVudCgpO1xuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxUYWJsZSBcblx0XHRcdFx0XHRpZD17dGhpcy5wcm9wcy5pZH1cblx0XHRcdFx0XHR0aXRsZT1cIlNwcmF5IFRhYmxlXCJcblx0XHRcdFx0XHRjb250ZW50PXtjb250ZW50fVxuXHRcdFx0XHRcdGNvbHVtbnM9e2NvbHVtbnN9XG5cdFx0XHRcdC8+XG5cdFx0XHRcdHtmb3JtfVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSIsImltcG9ydCBGb3JtIGZyb20gJy4uL3V0aWxzL2Zvcm1zJ1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3R5cGVGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuY29tcG9uZW50V2lsbFVwZGF0ZT10aGlzLmNvbXBvbmVudFdpbGxVcGRhdGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmRvY3R5cGVUb29sVXBkYXRlPXRoaXMuZG9jdHlwZVRvb2xVcGRhdGUuYmluZCh0aGlzKTtcblxuXHRcdHRoaXMuc3VibWl0PXRoaXMuc3VibWl0LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5zYXZlPXRoaXMuc2F2ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZGVsZXRlPXRoaXMuZGVsZXRlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5kb2N0eXBlVG9vbCA9IG5ldyBwcy5hcGlUb29sKHtuYW1lOnRoaXMucHJvcHMuZG9jdHlwZX0se2RvY3R5cGU6J0RvY1R5cGUnfSx0aGlzLmRvY3R5cGVUb29sVXBkYXRlLHRoaXMuZm9yY2VVcGRhdGUpO1xuXHRcdHRoaXMuc3RhdGU9e2l0ZW1zOnRoaXMuZG9jdHlwZVRvb2wuaXRlbXN9O1xuXHRcdC8vdGhpcy5kb2N0eXBlVG9vbCA9IG5ldyBwcy5hcGlUb29sKHtuYW1lOnRoaXMucHJvcHMuZG9jdHlwZX0se2RvY3R5cGU6J0RvY1R5cGUnfSx0aGlzLmRvY3R5cGVUb29sVXBkYXRlKTtcblx0fVxuXHRjb21wb25lbnRXaWxsVXBkYXRlKCl7XG5cblx0fVxuXHRkb2N0eXBlVG9vbFVwZGF0ZSgpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe2l0ZW1zOnRoaXMuZG9jdHlwZVRvb2wuaXRlbXN9KVxuXHR9XG5cdHN1Ym1pdChlKXtcblx0XHRjb25zb2xlLmxvZyhcIkZST00gRE9DVFlQRSBGT1JNXCIpO1xuXHRcdGNvbnNvbGUubG9nKHRoaXMucHJvcHMuaXRlbSk7XG5cdFx0Ly9GT1JNIFZBTElEQVRJT04gXG5cdFx0Ly9pZih0aGlzLnByb3BzLml0ZW0udmluZXlhcmQ9PVwiXCIgfHx0aGlzLnByb3BzLml0ZW0uc3ByYXlfdHlwZT09XCJcIiB8fCAobW9tZW50KHRoaXMucHJvcHMuaXRlbS5kYXRlLFwiTU0vREQvWVlZWVwiKS5pc1ZhbGlkKCkpIT09dHJ1ZSl7XG5cdFx0Ly9cdGNvbnNvbGUubG9nKFwibm90IHZhbGlkXCIpO1xuXHRcdC8vfWVsc2V7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR0aGlzLnByb3BzLmNyZWF0ZSh0aGlzLnByb3BzLml0ZW0sdGhpcy5wcm9wcy5kb2N0eXBlKTtcblx0XHQvL31cblx0fVxuXHRzYXZlKGUpe1xuXHRcdC8vIGlmKHRoaXMucHJvcHMuaXRlbS52aW5leWFyZD09XCJcIiB8fHRoaXMucHJvcHMuaXRlbS5zcHJheV90eXBlPT1cIlwiIHx8IChtb21lbnQodGhpcy5wcm9wcy5pdGVtLmRhdGUsXCJNTS9ERC9ZWVlZXCIpLmlzVmFsaWQoKSkhPT10cnVlKXtcblx0XHQvLyBcdGNvbnNvbGUubG9nKFwibm90IHZhbGlkXCIpO1xuXHRcdC8vIH1lbHNle1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dGhpcy5wcm9wcy5lZGl0KHRoaXMucHJvcHMuaXRlbSk7XG5cdFx0Ly8gfVxuXHR9XG5cdGRlbGV0ZShlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5wcm9wcy5kZWxldGUodGhpcy5wcm9wcy5pdGVtKTtcblx0fVxuXHRjcmVhdGVGb3JtSnNvbigpe1xuXHRcdHZhciBjcmVhdGVIaWRkZW49KHRoaXMucHJvcHMubW9kZSE9XCJjcmVhdGVcIik/XCIgaGlkZGVuXCI6XCIgbm9wZVwiO1xuXHRcdHZhciBlZGl0SGlkZGVuPSh0aGlzLnByb3BzLm1vZGUhPVwiZWRpdFwiKT9cIiBoaWRkZW5cIjpcIiBub3BlXCI7XG5cdFx0dmFyIGZpZWxkc0pzb249dGhpcy5zdGF0ZS5pdGVtc1swXS5maWVsZHM7XG5cdFx0dmFyIGZpZWxkcz1bXTtcblx0XHR2YXIgZmllbGRPYmplY3Q9e1xuXHRcdFx0TGluazogZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZmllbGQ6XCJhdXRvQ29tcGxldGVcIixcblx0XHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0XHRjb3B5W2l0ZW0uZmllbGRuYW1lXT1lLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdFx0bGFibGU6aXRlbS5sYWJlbCxcblx0XHRcdFx0XHR2YWx1ZTpjb3B5W2l0ZW0uZmllbGRuYW1lXSxcblx0XHRcdFx0XHRkb2N0eXBlOml0ZW0ub3B0aW9ucyxcblx0XHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIlxuXHRcdFx0XHR9XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRDaGVjazogZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZmllbGQ6XCJjaGVja1wiLFxuXHRcdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRcdGNvcHlbaXRlbS5maWVsZG5hbWVdPWUudGFyZ2V0LmNoZWNrZWQ7XG5cdFx0XHRcdFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRcdGxhYmxlOml0ZW0ubGFiZWwsXG5cdFx0XHRcdFx0dmFsdWU6Y29weVtpdGVtLmZpZWxkbmFtZV0sXG5cdFx0XHRcdFx0Y2xhc3NOYW1lOiBcImJpZy1jaGVja2JveFwiXG5cdFx0XHRcdH1cblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdEludDogZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZmllbGQ6XCJpbnB1dFwiLFxuXHRcdFx0XHRcdHR5cGU6XCJudW1iZXJcIixcblx0XHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0XHRjb3B5W2l0ZW0uZmllbGRuYW1lXT1lLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdFx0dmFsdWU6Y29weVtpdGVtLmZpZWxkbmFtZV0sXG5cdFx0XHRcdFx0bGFibGU6aXRlbS5sYWJlbFxuXHRcdFx0XHR9O1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0U2VsZWN0OiBmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0dmFyIG9wdGlvbnM9aXRlbS5vcHRpb25zLnNwbGl0KCBcIlxcblwiICk7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZmllbGQ6XCJzZWxlY3RcIixcblx0XHRcdFx0XHR0eXBlOlwibnVtYmVyXCIsXG5cdFx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdFx0Y29weVtpdGVtLmZpZWxkbmFtZV09ZS50YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRcdGxhYmxlOml0ZW0ubGFiZWwsXG5cdFx0XHRcdFx0dmFsdWU6Y29weVtpdGVtLmZpZWxkbmFtZV0sXG5cdFx0XHRcdFx0b3B0aW9uczpvcHRpb25zXG5cdFx0XHRcdH07XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHREYXRhOiBmdW5jdGlvbihpdGVtLHByb3BPcHRpb25zKXtcblx0XHRcdFx0aWYocHJvcE9wdGlvbnMudHlwZT09XCJ0ZXh0YXJlYVwiKXtcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0ZmllbGQ6XCJ0ZXh0YXJlYVwiLFxuXHRcdFx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdFx0XHRjb3B5W2l0ZW0uZmllbGRuYW1lXT1lLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHRcdFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRcdFx0dmFsdWU6Y29weVtpdGVtLmZpZWxkbmFtZV0sXG5cdFx0XHRcdFx0XHRsYWJsZTppdGVtLmxhYmVsXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNle1xuXHRcdFx0XHRcdHJldHVybiB7fTtcblx0XHRcdFx0fVxuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0RGF0ZTogZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZmllbGQ6XCJkYXRlXCIsXG5cdFx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdFx0Y29weVtpdGVtLmZpZWxkbmFtZV09ZS50YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRcdGxhYmxlOml0ZW0ubGFiZWxcblx0XHRcdFx0fVxuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdH1cblxuXHRcdGlmKHRoaXMucHJvcHMuaXRlbT09bnVsbCl7XG5cdFx0XHR2YXIgY29weT17fVxuXHRcdH1lbHNle1xuXHRcdFx0dmFyIGNvcHk9cHMuY2xvbmUodGhpcy5wcm9wcy5pdGVtKTtcblx0XHR9XG5cblx0XHQvL2xvb3AgdGhlIGpzb24gb2JqZWN0XG5cdFx0Ly9wcm9iYWJseSBjaGFuZ2UgdGhpcyB0byB3aWxsTW91bnRcblx0XHRmb3IodmFyIHggPSAwOyB4IDwgZmllbGRzSnNvbi5sZW5ndGg7IHgrKyl7XG5cdFx0XHR2YXIgY3VycmVudEZpZWxkPWZpZWxkc0pzb25beF07XG5cdFx0XHQvLyBjaGVjayBpZiB0aGlzIGZpZWxkIHdhcyBlbmFibGVkXG5cblx0XHRcdGlmICh0aGlzLnByb3BzW2N1cnJlbnRGaWVsZC5maWVsZG5hbWVdKXtcblx0XHRcdFx0Ly90aGVyZSBpcyBhIHByb3BzIGZvciB0aGlzIGZpZWxkXG5cblx0XHRcdFx0aWYodGhpcy5wcm9wc1tjdXJyZW50RmllbGQuZmllbGRuYW1lXS5hY3RpdmUgPT09IDEpe1xuXHRcdFx0XHRcdC8vYW5kIHRoZSBmaWVsZCBpcyBzZXQgdG8gYWN0aXZlXG5cblx0XHRcdFx0XHRpZihmaWVsZE9iamVjdFtjdXJyZW50RmllbGQuZmllbGR0eXBlXSl7XG5cdFx0XHRcdFx0XHQvL0ZlaWxkIHR5cGUgY2FuIGJlIGhhbmRsZWQ/XG5cdFx0XHRcdFx0XHQvL2hhbmRsZSB0aGUgY3JlYXRpb24gb2YgY29weSBhbmQgdGhlIGRlZmF1bHQgdmFsdWVzXG5cblx0XHRcdFx0XHRcdGlmKHRoaXMucHJvcHMubW9kZT09XCJjcmVhdGVcIil7XG5cdFx0XHRcdFx0XHRcdGlmKGNvcHlbY3VycmVudEZpZWxkLmZpZWxkbmFtZV0pe1xuXHRcdFx0XHRcdFx0XHRcdC8vdGhlIGZpZWxkIGFscmVhZHkgZXhpc3RzXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0ZWxzZSBpZih0aGlzLnByb3BzW2N1cnJlbnRGaWVsZC5maWVsZG5hbWVdLmRlZmF1bHQpe1xuXHRcdFx0XHRcdFx0XHRcdC8vc2V0IHRvIGRlZmF1bHQgdmFsdWVcblx0XHRcdFx0XHRcdFx0XHRjb3B5W2N1cnJlbnRGaWVsZC5maWVsZG5hbWVdPXRoaXMucHJvcHNbY3VycmVudEZpZWxkLmZpZWxkbmFtZV0uZGVmYXVsdDtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRlbHNle1xuXHRcdFx0XHRcdFx0XHRcdGNvcHlbY3VycmVudEZpZWxkLmZpZWxkbmFtZV09XCJcIjtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZmllbGRzLnB1c2goZmllbGRPYmplY3RbY3VycmVudEZpZWxkLmZpZWxkdHlwZV0oY3VycmVudEZpZWxkLHRoaXMucHJvcHNbY3VycmVudEZpZWxkLmZpZWxkbmFtZV0pKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoIShcImRvY3R5cGVcIiBpbiBjb3B5KSl7XG5cdFx0XHRjb3B5LmRvY3R5cGU9dGhpcy5wcm9wcy5kb2N0eXBlO1xuXHRcdH1cblx0XHQvL2FkZGluZyBidXR0b24gZmVpbGRzXG5cdFx0ZmllbGRzLnB1c2goe1xuXHRcdFx0XHRmaWVsZDpcImJ1dHRvblwiLFxuXHRcdFx0XHR0eXBlOlwic3VibWl0XCIsXG5cdFx0XHRcdHZhbHVlOlwiQ3JlYXRlIFwiICsgdGhpcy5wcm9wcy5kb2N0eXBlICsgXCIgRW50cnlcIixcblx0XHRcdFx0Y2xhc3NOYW1lOlwiYnRuLXByaW1hcnkgcHVsbC1yaWdodCBcIiArIGNyZWF0ZUhpZGRlbixcblx0XHRcdFx0b25DbGljazp0aGlzLnN1Ym1pdFxuXHRcdFx0fSk7XG5cdFx0aWYodGhpcy5wcm9wcy5jbG9zZSl7XG5cdFx0XHRmaWVsZHMucHVzaCh7XG5cdFx0XHRcdFx0ZmllbGQ6XCJidXR0b25cIixcblx0XHRcdFx0XHR2YWx1ZTpcIkNsb3NlXCIsXG5cdFx0XHRcdFx0Y2xhc3NOYW1lOlwicHVsbC1yaWdodCBcIisgZWRpdEhpZGRlbixcblx0XHRcdFx0XHRvbkNsaWNrOmZ1bmN0aW9uKGUpeyBlLnByZXZlbnREZWZhdWx0KCk7dGhpcy5wcm9wcy5jbG9zZSgpO30uYmluZCh0aGlzKVxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGZpZWxkcy5wdXNoKHtcblx0XHRcdFx0ZmllbGQ6XCJidXR0b25cIixcblx0XHRcdFx0dHlwZTpcInN1Ym1pdFwiLFxuXHRcdFx0XHR2YWx1ZTpcIkRlbGV0ZVwiLFxuXHRcdFx0XHRjbGFzc05hbWU6XCJidG4tZGFuZ2VyIHB1bGwtcmlnaHQgXCIrIGVkaXRIaWRkZW4sXG5cdFx0XHRcdG9uQ2xpY2s6dGhpcy5kZWxldGVcblx0XHR9KTtcblx0XHRmaWVsZHMucHVzaChcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJidXR0b25cIixcblx0XHRcdFx0dHlwZTpcInN1Ym1pdFwiLFxuXHRcdFx0XHR2YWx1ZTpcIlNhdmVcIixcblx0XHRcdFx0Y2xhc3NOYW1lOlwiYnRuLXN1Y2Nlc3MgcHVsbC1yaWdodCBcIisgZWRpdEhpZGRlbixcblx0XHRcdFx0b25DbGljazp0aGlzLnNhdmVcblx0XHRcdH0pO1xuXHRcdHJldHVybiBmaWVsZHM7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dmFyIG91dHB1dD17fTtcblx0XHRpZih0aGlzLnN0YXRlLml0ZW1zIT09bnVsbCl7XG5cdFx0XHR2YXIgZmllbGRzPXRoaXMuY3JlYXRlRm9ybUpzb24oKTtcblx0XHRcdHZhciBvdXRwdXQgPSAoXHRcdFx0XHRcblx0XHRcdFx0PEZvcm1cblx0XHRcdFx0XHRpZD17dGhpcy5wcm9wcy5pZH1cblx0XHRcdFx0XHR0eXBlPVwiaG9yaXpvbnRhbFwiXG5cdFx0XHRcdFx0ZmllbGRzPXtmaWVsZHN9XG5cdFx0XHRcdC8+KTtcblx0XHR9ZWxzZXsgXG5cdFx0XHRvdXRwdXQgPSAoPGRpdj4gTG9hZGluZy4uLiA8L2Rpdj4pO1xuXHRcdH1cblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2Plx0XHRcblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbiIsIi8qIGZvcm1zICovXG4vKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cblxuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnN1Ym1pdD10aGlzLnN1Ym1pdC5iaW5kKHRoaXMpO1xuXHR9XG5cdHN1Ym1pdChlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5wcm9wcy5zdWJtaXQoZSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dmFyIGZvcm09W107XG5cdFx0dmFyIGZvcm1UeXBlcz17XG5cdFx0XHRzZWxlY3RcdDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciBvcHRpbmFsPVtcInZhbHVlXCIsXCJsYWJsZVwiLFwib3B0aW9uc1wiLFwiY2xhc3NOYW1lXCIsXCJyZWFkb25seVwiLFwiZGlzYWJsZVwiLFwicmVxdWlyZVwiXTtcblx0XHRcdFx0dmFyIHByb3BzPXBzLmluaXRQcm9wcyhvcHRpbmFsLGl0ZW0pO1xuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxTZWxlY3Rcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH1cblx0XHRcdFx0XHRcdHZhbHVlPXtwcm9wcy52YWx1ZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17cHJvcHMuY2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0bGFibGU9e3Byb3BzLmxhYmxlfVxuXHRcdFx0XHRcdFx0b3B0aW9ucz17cHJvcHMub3B0aW9uc31cblx0XHRcdFx0XHRcdHJlYWRPbmx5PXtwcm9wcy5yZWFkb25seX1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXtwcm9wcy5kaXNhYmxlZH1cblx0XHRcdFx0XHRcdHJlcXVpcmVkPXtwcm9wcy5yZXF1aXJlZH1cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKTt9fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRjaGVjayA6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHR2YXIgcHJvcHM9W1widmFsdWVcIixcImxhYmxlXCIsXCJjbGFzc05hbWVcIixcInJlYWRvbmx5XCIsXCJkaXNhYmxlXCIsXCJyZXF1aXJlXCIsXCJ2YWx1ZVwiXTtcblx0XHRcdFx0cHJvcHM9cHMuaW5pdFByb3BzKHByb3BzLGl0ZW0pO1xuXG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PENoZWNrXG5cdFx0XHRcdFx0XHRrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9XG5cdFx0XHRcdFx0XHR2YWx1ZT17cHJvcHMudmFsdWV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e3Byb3BzLmNsYXNzTmFtZX1cblx0XHRcdFx0XHRcdGxhYmxlPXtwcm9wcy5sYWJsZX1cblx0XHRcdFx0XHRcdHJlYWRPbmx5PXtwcm9wcy5yZWFkb25seX1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXtwcm9wcy5kaXNhYmxlZH1cblx0XHRcdFx0XHRcdHJlcXVpcmVkPXtwcm9wcy5yZXF1aXJlZH1cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKTt9fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cblx0XHRcdHRleHRhcmVhIDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciBwcm9wcz1bXCJ2YWx1ZVwiLFwibGFibGVcIixcImNsYXNzTmFtZVwiLFwicmVhZG9ubHlcIixcImRpc2FibGVcIixcInJlcXVpcmVcIixcInZhbHVlXCIsXCJyb3dzXCJdO1xuXHRcdFx0XHRwcm9wcz1wcy5pbml0UHJvcHMocHJvcHMsaXRlbSk7XG5cblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8VGV4dGFyZWFcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH1cblx0XHRcdFx0XHRcdHZhbHVlPXtwcm9wcy52YWx1ZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17cHJvcHMuY2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0bGFibGU9e3Byb3BzLmxhYmxlfVxuXHRcdFx0XHRcdFx0cmVhZE9ubHk9e3Byb3BzLnJlYWRvbmx5fVxuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ9e3Byb3BzLmRpc2FibGVkfVxuXHRcdFx0XHRcdFx0cmVxdWlyZWQ9e3Byb3BzLnJlcXVpcmVkfVxuXHRcdFx0XHRcdFx0cm93cz17cHJvcHMucm93c31cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKTt9fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRpbnB1dCBcdDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciBwcm9wcz1bXCJ0eXBlXCIsXCJ2YWx1ZVwiLFwicGxhY2Vob2xkZXJcIixcImxhYmxlXCIsXCJjbGFzc05hbWVcIixcInJlYWRvbmx5XCIsXCJkaXNhYmxlZFwiLFwicmVxdWlyZWRcIixcImVycm9yXCJdO1xuXHRcdFx0XHRwcm9wcz1wcy5pbml0UHJvcHMocHJvcHMsaXRlbSk7XG5cdFx0XHRcdGlmKHByb3BzLnR5cGU9PVwiXCIpe1xuXHRcdFx0XHRcdHByb3BzLnR5cGU9XCJ0ZXh0XCI7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxJbnB1dFxuXHRcdFx0XHRcdFx0a2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fVxuXHRcdFx0XHRcdFx0dHlwZT17cHJvcHMudHlwZX1cblx0XHRcdFx0XHRcdHZhbHVlPXtwcm9wcy52YWx1ZX1cblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPXtwcm9wcy5wbGFjZWhvbGRlcn1cblx0XHRcdFx0XHRcdGxhYmxlPXtwcm9wcy5sYWJsZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17cHJvcHMuY2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0cmVhZG9ubHk9e3Byb3BzLnJlYWRvbmx5fVxuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ9e3Byb3BzLmRpc2FibGVkfVxuXHRcdFx0XHRcdFx0cmVxdWlyZWQ9e3Byb3BzLnJlcXVpcmVkfVxuXHRcdFx0XHRcdFx0ZXJyb3I9e3Byb3BzLmVycm9yfVxuXHRcdFx0XHRcdFx0aW5wdXRDaGFuZ2VkPXtmdW5jdGlvbihlKXtpdGVtLm9uQ2hhbmdlKGUpfX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0bGFibGUgXHQ6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHRyZXR1cm4gKFxuICAgIFx0XHRcdFx0PGxhYmVsIGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH0gPntpdGVtLmxhYmxlfTwvbGFiZWw+XG5cbiAgICBcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0cmFkaW9cdDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHJldHVybiAoPGRpdj48L2Rpdj4pO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0aGVhZGVyOiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0cmV0dXJuKDxoMyBrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9ID57aXRlbS5sYWJsZX08L2gzPilcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGRhdGU6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHR2YXIgdmFsdWUgPSAoaXRlbS52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0udmFsdWU7XG5cdFx0XHRcdHZhciBsYWJsZSA9IChpdGVtLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5sYWJsZTtcblx0XHRcdFx0dmFyIHBsYWNlaG9sZGVyID0gKGl0ZW0ucGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnBsYWNlaG9sZGVyO1xuXHRcdFx0XHR2YXIgY2xhc3NOYW1lID0gKGl0ZW0uY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5jbGFzc05hbWU7XG5cdFx0XHRcdHZhciByZWFkb25seSA9IChpdGVtLnJlYWRvbmx5ID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5yZWFkb25seTtcblx0XHRcdFx0dmFyIGRpc2FibGVkID0gKGl0ZW0uZGlzYWJsZWQgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmRpc2FibGVkO1xuXHRcdFx0XHR2YXIgcmVxdWlyZWQgPSAoaXRlbS5yZXF1aXJlZCA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucmVxdWlyZWQ7XG5cdFx0XHRcdHJldHVybihcblx0XHRcdFx0XHQ8RGF0ZUlucHV0XG5cdFx0XHRcdFx0XHRrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9XG5cdFx0XHRcdFx0XHR2YWx1ZT17dmFsdWV9XG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG5cdFx0XHRcdFx0XHRsYWJsZT17bGFibGV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e2NsYXNzTmFtZX1cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKX19XG5cdFx0XHRcdFx0XHRyZWFkb25seT17cmVhZG9ubHl9XG5cdFx0XHRcdFx0XHRkaXNhYmxlZD17ZGlzYWJsZWR9XG5cdFx0XHRcdFx0XHRyZXF1aXJlZD17cmVxdWlyZWR9XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGF1dG9Db21wbGV0ZTogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IChpdGVtLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS52YWx1ZTtcblx0XHRcdFx0dmFyIGxhYmxlID0gKGl0ZW0ubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmxhYmxlO1xuXHRcdFx0XHR2YXIgcGxhY2Vob2xkZXIgPSAoaXRlbS5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucGxhY2Vob2xkZXI7XG5cdFx0XHRcdHZhciBjbGFzc05hbWUgPSAoaXRlbS5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmNsYXNzTmFtZTtcblx0XHRcdFx0dmFyIHJlYWRvbmx5ID0gKGl0ZW0ucmVhZG9ubHkgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnJlYWRvbmx5O1xuXHRcdFx0XHR2YXIgZGlzYWJsZWQgPSAoaXRlbS5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uZGlzYWJsZWQ7XG5cdFx0XHRcdHZhciByZXF1aXJlZCA9IChpdGVtLnJlcXVpcmVkID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5yZXF1aXJlZDtcblxuXHRcdFx0XHRyZXR1cm4oXG5cdFx0XHRcdFx0PEF3ZXNvbXBsZXRlSW5wdXRcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH1cblx0XHRcdFx0XHRcdGRvY3R5cGU9e2l0ZW0uZG9jdHlwZX1cblx0XHRcdFx0XHRcdGRvY3ZhbHVlPXtpdGVtLmRvY3ZhbHVlfVxuXHRcdFx0XHRcdFx0ZG9jbGFibGU9e2l0ZW0uZG9jbGFibGV9XG5cdFx0XHRcdFx0XHR2YWx1ZT17dmFsdWV9XG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG5cdFx0XHRcdFx0XHRsYWJsZT17bGFibGV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e2NsYXNzTmFtZX1cblx0XHRcdFx0XHRcdHJlYWRvbmx5PXtyZWFkb25seX1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXtkaXNhYmxlZH1cblx0XHRcdFx0XHRcdHJlcXVpcmVkPXtyZXF1aXJlZH1cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKX19XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGJ1dHRvbjogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciBvcHRpbmFsPVtcInZhbHVlXCIsXCJjbGFzc05hbWVcIixcImRpc2FibGVcIixcImljb25cIl07XG5cdFx0XHRcdHZhciBwcm9wcz1wcy5pbml0UHJvcHMob3B0aW5hbCxpdGVtKTtcblx0XHRcdFx0cmV0dXJuKFxuXHRcdFx0XHRcdDxCdXR0b25cblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH1cblx0XHRcdFx0XHRcdHZhbHVlPXtwcm9wcy52YWx1ZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17cHJvcHMuY2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ9e3Byb3BzLmRpc2FibGVkfVxuXHRcdFx0XHRcdFx0aWNvbj17cHJvcHMuaWNvbn1cblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2Z1bmN0aW9uKGUpe2l0ZW0ub25DbGljayhlKX19XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKVxuXHRcdH1cblx0XHR0aGlzLnByb3BzLmZpZWxkcy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXHRcdFx0aWYoJC5pc0VtcHR5T2JqZWN0KGl0ZW0pKXtcblxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGlmKHRoaXMucHJvcHMudHlwZT09XCJpbmxpbmVcIil7XG5cdFx0XHRcdFx0dmFyIHJvd0NsYXNzPTEyL3RoaXMucHJvcHMucm93cztcblx0XHRcdFx0XHRyb3dDbGFzcz1cImNvbC14cy1cIityb3dDbGFzcztcblx0XHRcdFx0XHRmb3JtLnB1c2goPGRpdiBjbGFzc05hbWU9e3Jvd0NsYXNzfT57Zm9ybVR5cGVzW2l0ZW0uZmllbGRdKGl0ZW0saW5kZXgpfTwvZGl2Pik7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZXtmb3JtLnB1c2goPGRpdiBjbGFzc05hbWU9e3Jvd0NsYXNzfT57Zm9ybVR5cGVzW2l0ZW0uZmllbGRdKGl0ZW0saW5kZXgpfTwvZGl2Pik7fVxuXHRcdFx0fVxuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0Ly9mb3IodmFyIHg9MDsgeCA8IHRoaXMucHJvcHMuZmVpbGRzLmxlbmd0aCB4Kys7IClcblx0XHR2YXIgY2xhc3NOYW1lID0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJyZWFjdC1mb3JtXCI6IFwicmVhY3QtZm9ybSBcIit0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8Zm9ybSBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG5cdFx0XHRcdDxmaWVsZHNldD5cblx0XHRcdFx0e3RoaXMucHJvcHMuYmVmb3JlfVxuXHRcdFx0XHR7Zm9ybX1cblx0XHRcdFx0eyB0aGlzLnByb3BzLmNoaWxkcmVufVxuXHRcdFx0XHQ8L2ZpZWxkc2V0PlxuXHRcdFx0PC9mb3JtPlxuXHRcdCk7XG5cdH1cbn1cblxuXG5cbmV4cG9ydCBjbGFzcyBTZWxlY3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5pbnB1dENoYW5nZT10aGlzLmlucHV0Q2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblxuXHR9XG5cdGlucHV0Q2hhbmdlKGUpe1xuXHRcdHRoaXMucHJvcHMuaW5wdXRDaGFuZ2VkKCk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLmxhYmxlID0gKHRoaXMucHJvcHMubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLmxhYmxlO1xuXHRcdHRoaXMub3B0aW9ucyA9ICh0aGlzLnByb3BzLm9wdGlvbnMgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLm9wdGlvbnM7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jb250cm9sXCI6IFwiZm9ybS1jb250cm9sXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlcXVpcmVkID0gKHRoaXMucHJvcHMucmVxdWlyZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZXF1aXJlZD09ZmFsc2V8fHRoaXMucHJvcHMucmVxdWlyZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZWFkb25seSA9ICh0aGlzLnByb3BzLnJlYWRvbmx5ID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVhZG9ubHk9PWZhbHNlfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHZhciBvcHRpb25zPVtdO1xuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblxuXG5cdFx0dGhpcy5vcHRpb25zLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCl7XG5cdFx0XHR2YXIgZ3JvdXA9W107XG5cdFx0XHRpZihpdGVtLmdyb3VwICE9PSB1bmRlZmluZWQpe1xuXHRcdFx0XHRpdGVtLm9wdGlvbnMubWFwKGZ1bmN0aW9uKGlubmVySXRlbSxpbmRleCl7XG5cdFx0XHRcdFx0Z3JvdXAucHVzaCggPG9wdGlvbiBrZXk9e2l0ZW0uZ3JvdXAraW5kZXh9IHZhbHVlPXtpbm5lckl0ZW19PiB7aW5uZXJJdGVtfSA8L29wdGlvbj4pXG5cdFx0XHRcdH0pXG5cdFx0XHRcdG9wdGlvbnMucHVzaCg8b3B0Z3JvdXAga2V5PXtpdGVtLmdyb3VwfSBsYWJlbD17aXRlbS5ncm91cH0+IHtncm91cH08L29wdGdyb3VwPik7XG5cblx0XHRcdH1cblx0XHRcdGVsc2V7XG5cdFx0XHRcdG9wdGlvbnMucHVzaCggPG9wdGlvbiBrZXk9e2luZGV4fSB2YWx1ZT17aXRlbX0+IHtpdGVtfSA8L29wdGlvbj4pXG5cdFx0XHR9XG5cblxuXHRcdH0uYmluZCh0aGlzKSk7XG5cblx0XHR2YXIgc2VsZWN0PShcblx0XHRcdDxzZWxlY3Rcblx0XHRcdFx0Y2xhc3NOYW1lPXt0aGlzLmNsYXNzTmFtZX1cblx0XHRcdFx0dmFsdWU9e3RoaXMudmFsdWV9XG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnByb3BzLmlucHV0Q2hhbmdlZH1cblx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdCAgICAgICAgICBcdHJlYWRPbmx5PXt0aGlzLnJlYWRvbmx5fVxuXHQgICAgICAgICAgXHRyZXF1aXJlZD17dGhpcy5yZXF1aXJlZH1cblx0XHRcdFx0PlxuXHRcdFx0XHR7b3B0aW9uc31cblx0XHRcdDwvc2VsZWN0PlxuXHRcdCk7XG5cblx0XHR2YXIgbGFibGU9XCJcIjtcblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMucHJvcHMubGFibGUgIT09IFwiXCIpe1xuXHRcdFx0bGFibGU9KDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD4pO1xuXHRcdH1cblx0XHRvdXRwdXQgPSAoPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+e2xhYmxlfXtzZWxlY3R9PC9kaXY+KTtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5pbnB1dENoYW5nZT10aGlzLmlucHV0Q2hhbmdlLmJpbmQodGhpcyk7XG5cblx0fVxuXHRpbnB1dENoYW5nZShlKXtcblx0XHR0aGlzLnByb3BzLmlucHV0Q2hhbmdlZChlKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnR5cGUgPSAodGhpcy5wcm9wcy50eXBlID09PSB1bmRlZmluZWQpID8gXCJ0ZXh0XCI6IHRoaXMucHJvcHMudHlwZTtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMucGxhY2Vob2xkZXIgPSAodGhpcy5wcm9wcy5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXI7XG5cdFx0dGhpcy5sYWJsZSA9ICh0aGlzLnByb3BzLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5sYWJsZTtcblx0XHR2YXIgb3V0cHV0PVwiXCI7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jb250cm9sXCI6IFwiZm9ybS1jb250cm9sIFwiICt0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHR0aGlzLmRpc2FibGVkID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5kaXNhYmxlZD09ZmFsc2V8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZXF1aXJlZCA9ICh0aGlzLnByb3BzLnJlcXVpcmVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVxdWlyZWQ9PWZhbHNlfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVhZG9ubHkgPSAodGhpcy5wcm9wcy5yZWFkb25seSA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1mYWxzZXx8dGhpcy5wcm9wcy5yZWFkb25seT09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblxuXHRcdHZhciBpbnB1dD0oXG5cdFx0XHQ8aW5wdXRcblx0XHRcdFx0dHlwZT17dGhpcy50eXBlfVxuXHRcdFx0XHRjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfVxuXHRcdFx0XHRwbGFjZWhvbGRlcj17dGhpcy5wbGFjZWhvbGRlcn1cblx0XHRcdFx0dmFsdWU9e3RoaXMudmFsdWV9XG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnByb3BzLmlucHV0Q2hhbmdlZH1cblx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdCAgICAgICAgICBcdHJlYWRPbmx5PXt0aGlzLnJlYWRvbmx5fVxuXHQgICAgICAgICAgXHRyZXF1aXJlZD17dGhpcy5yZXF1aXJlZH1cblx0XHRcdC8+XG5cdFx0KTtcblx0XHR2YXIgd3JhcHBlckNsYXNzPVwiZm9ybS1ncm91cFwiO1xuXHRcdGlmKHRoaXMucHJvcHMuZXJyb3Ipe1xuXHRcdFx0XHR3cmFwcGVyQ2xhc3MrPSBcIiBcIitcImhhcy1lcnJvclwiO1xuXHRcdH1cblx0XHR2YXIgbGFibGU9XCJcIjtcblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMucHJvcHMubGFibGUgIT09IFwiXCIpe1xuXHRcdFx0bGFibGU9KDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD4pO1xuXHRcdH1cblx0XHRvdXRwdXQgPSAoPGRpdiBjbGFzc05hbWU9e3dyYXBwZXJDbGFzc30+e2xhYmxlfXtpbnB1dH08L2Rpdj4pO1xuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBDaGVjayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLmlucHV0Q2hhbmdlPXRoaXMuaW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcblxuXG5cdH1cblx0aW5wdXRDaGFuZ2UoZSl7XG5cblx0XHR0aGlzLnByb3BzLmlucHV0Q2hhbmdlZChlKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyAwIDogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLnBsYWNlaG9sZGVyID0gKHRoaXMucHJvcHMucGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnBsYWNlaG9sZGVyO1xuXHRcdHRoaXMubGFibGUgPSAodGhpcy5wcm9wcy5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMubGFibGU7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jaGVjay1pbnB1dFwiOiBcImZvcm0tY2hlY2staW5wdXQgXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlcXVpcmVkID0gKHRoaXMucHJvcHMucmVxdWlyZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZXF1aXJlZD09ZmFsc2V8fHRoaXMucHJvcHMucmVxdWlyZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZWFkb25seSA9ICh0aGlzLnByb3BzLnJlYWRvbmx5ID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVhZG9ubHk9PWZhbHNlfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXG5cdFx0dmFyIG91dHB1dD1cIlwiO1xuXHRcdHZhciBpbnB1dD0oXG5cdFx0XHQ8aW5wdXRcblx0XHRcdFx0dHlwZT1cImNoZWNrYm94XCJcblx0XHRcdFx0Y2xhc3NOYW1lPXt0aGlzLmNsYXNzTmFtZX1cblx0XHRcdFx0Y2hlY2tlZD17dGhpcy52YWx1ZX1cblxuXHRcdFx0XHRvbkNoYW5nZT17dGhpcy5wcm9wcy5pbnB1dENoYW5nZWR9XG5cdFx0XHRcdGRpc2FibGVkPXt0aGlzLmRpc2FibGVkfVxuXHQgICAgICAgICAgXHRyZWFkT25seT17dGhpcy5yZWFkb25seX1cblx0ICAgICAgICAgIFx0cmVxdWlyZWQ9e3RoaXMucmVxdWlyZWR9XG5cdFx0XHQvPlxuXHRcdCk7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkIHx8IHRoaXMucHJvcHMubGFibGUgPT1cIlwiKXtcblx0XHRcdG91dHB1dCA9IChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdCAgICBcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWxcIj5cblx0XHQgICAgICBcdFx0XHR7aW5wdXR9e3RoaXMucHJvcHMubGFibGV9XG5cdFx0ICAgICAgXHRcdDwvbGFiZWw+XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHQgICAgICBcdFx0e2lucHV0fVxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuZXhwb3J0IGNsYXNzIFRleHRhcmVhIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuaW5wdXRDaGFuZ2U9dGhpcy5pbnB1dENoYW5nZS5iaW5kKHRoaXMpO1xuXG5cdH1cblx0aW5wdXRDaGFuZ2UoZSl7XG5cdFx0dGhpcy5wcm9wcy5pbnB1dENoYW5nZWQoZSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gMCA6IHRoaXMucHJvcHMudmFsdWU7XG5cdFx0dGhpcy5wbGFjZWhvbGRlciA9ICh0aGlzLnByb3BzLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5wbGFjZWhvbGRlcjtcblx0XHR0aGlzLmxhYmxlID0gKHRoaXMucHJvcHMubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLmxhYmxlO1xuXHRcdHRoaXMuY2xhc3NOYW1lPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcImZvcm0tY29udHJvbFwiOiBcImZvcm0tY29udHJvbCBcIiArdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0dGhpcy5kaXNhYmxlZCA9ICh0aGlzLnByb3BzLmRpc2FibGVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PWZhbHNlfHx0aGlzLnByb3BzLmRpc2FibGVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVxdWlyZWQgPSAodGhpcy5wcm9wcy5yZXF1aXJlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1mYWxzZXx8dGhpcy5wcm9wcy5yZXF1aXJlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlYWRvbmx5ID0gKHRoaXMucHJvcHMucmVhZG9ubHkgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZWFkb25seT09ZmFsc2V8fHRoaXMucHJvcHMucmVhZG9ubHk9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yb3dzID0gKHRoaXMucHJvcHMucm93cyA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJvd3M9PVwiXCIpID8gMzogdGhpcy5wcm9wcy5yb3dzO1xuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblx0XHR2YXIgaW5wdXQ9KFxuXHRcdFx0PHRleHRhcmVhXG5cdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9XG5cdFx0XHRcdHZhbHVlPXt0aGlzLnZhbHVlfVxuXHRcdFx0XHRvbkNoYW5nZT17dGhpcy5wcm9wcy5pbnB1dENoYW5nZWR9XG5cdFx0XHRcdHJvd3M9e3RoaXMucm93c31cblx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdCAgICAgICAgICBcdHJlYWRPbmx5PXt0aGlzLnJlYWRvbmx5fVxuXHQgICAgICAgICAgXHRyZXF1aXJlZD17dGhpcy5yZXF1aXJlZH1cblx0XHRcdC8+XG5cdFx0KTtcblx0XHR2YXIgbGFibGU9XCJcIjtcblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMucHJvcHMubGFibGUgIT09IFwiXCIpe1xuXHRcdFx0bGFibGU9KDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD4pO1xuXHRcdH1cblx0XHRvdXRwdXQgPSAoPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+e2xhYmxlfXtpbnB1dH08L2Rpdj4pO1xuXHRcdHJldHVybihcblx0XHRcdDxkaXY+e291dHB1dH08L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5leHBvcnQgY2xhc3MgRGF0ZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuZGF0ZUluaXQ9dGhpcy5kYXRlSW5pdC5iaW5kKHRoaXMpO1xuXHR9XG5cdGRhdGVJbml0KCl7XG5cdFx0JCgnLmlucHV0LWdyb3VwLmRhdGUgLmRhdGVwaWNrJykuZGF0ZXBpY2tlcih7XG5cdFx0ICAgIHRvZGF5QnRuOiBcImxpbmtlZFwiLFxuXHRcdCAgICBvcmllbnRhdGlvbjogXCJib3R0b20gcmlnaHRcIixcblx0XHQgICAgYXV0b2Nsb3NlOiB0cnVlLFxuXHRcdCAgICB0b2RheUhpZ2hsaWdodDogdHJ1ZVxuXHRcdH0pLm9uKCdjaGFuZ2VEYXRlJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0dmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdpbnB1dCcsIHsgYnViYmxlczogdHJ1ZSB9KTtcblx0XHRcdGUudGFyZ2V0LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHRoaXMudmFsdWUgPSAodGhpcy5wcm9wcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMudmFsdWU7XG5cdFx0dGhpcy5wbGFjZWhvbGRlciA9ICh0aGlzLnByb3BzLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5wbGFjZWhvbGRlcjtcblx0XHR0aGlzLmxhYmxlID0gKHRoaXMucHJvcHMubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLmxhYmxlO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlcXVpcmVkID0gKHRoaXMucHJvcHMucmVxdWlyZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZXF1aXJlZD09ZmFsc2V8fHRoaXMucHJvcHMucmVxdWlyZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZWFkb25seSA9ICh0aGlzLnByb3BzLnJlYWRvbmx5ID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVhZG9ubHk9PWZhbHNlfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXG5cblx0XHR2YXIgb3V0cHV0PVwiXCI7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jb250cm9sIGRhdGVwaWNrXCI6IFwiZm9ybS1jb250cm9sIGRhdGVwaWNrIFwiICt0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHR2YXIgaW5wdXQ9KFxuXHRcdFx0PGlucHV0XG5cdFx0XHRcdHJlZj17dGhpcy5kYXRlSW5pdH1cblx0XHRcdFx0dHlwZT1cInRleHRcIlxuXHRcdFx0XHRjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfVxuXHRcdFx0XHRwbGFjZWhvbGRlcj17dGhpcy5wbGFjZWhvbGRlcn1cblx0XHRcdFx0dmFsdWU9e3RoaXMudmFsdWV9XG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnByb3BzLmlucHV0Q2hhbmdlZH1cblx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdCAgICAgICAgICBcdHJlYWRPbmx5PXt0aGlzLnJlYWRvbmx5fVxuXHQgICAgICAgICAgXHRyZXF1aXJlZD17dGhpcy5yZXF1aXJlZH1cblx0XHRcdFx0Lz5cblxuXHRcdCk7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkIHx8IHRoaXMucHJvcHMubGFibGUgPT1cIlwiKXtcblx0XHRcdG91dHB1dCA9IChcblx0XHQgIFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHQgIFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAgZGF0ZVwiPlxuXHRcdFx0XHRcdFx0e2lucHV0fVxuXHRcdFx0XHQgIFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cC1hZGRvblwiPlxuXHRcdFx0XHQgIFx0XHRcdDxpIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tdGhcIj48L2k+XG5cdFx0XHRcdCAgXHRcdDwvc3Bhbj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwIGRhdGVcIj5cblxuXHRcdFx0XHRcdFx0e2lucHV0fVxuXHRcdFx0XHQgIFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cC1hZGRvblwiPlxuXHRcdFx0XHQgIFx0XHRcdDxpIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tdGhcIj48L2k+XG5cdFx0XHRcdCAgXHRcdDwvc3Bhbj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuZXhwb3J0IGNsYXNzIEF3ZXNvbXBsZXRlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cblx0XHQvKiAgIERvIHRoZSBiaW5kIHRoaW5nICAqL1xuXHRcdHRoaXMuY3JlYXRlTGlzdD10aGlzLmNyZWF0ZUxpc3QuYmluZCh0aGlzKTtcblx0XHR0aGlzLmRvY0NoYW5nZWQ9dGhpcy5kb2NDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jb21wb25lbnREaWRNb3VudD10aGlzLmNvbXBvbmVudERpZE1vdW50LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5pbnB1dENoYW5nZT10aGlzLmlucHV0Q2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5hdXRvY29tcGxldGU9dGhpcy5hdXRvY29tcGxldGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmNvbXBvbmVudFdpbGxVbm1vdW50PXRoaXMuY29tcG9uZW50V2lsbFVubW91bnQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnJlZkNhbGw9dGhpcy5yZWZDYWxsLmJpbmQodGhpcyk7XG5cblx0XHQvL3RoaXMud29ya29yZGVyT2JqPXRoaXMub25TdGF0dXNDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0LyogICAgICAgICAgZW5kICAgICAgICAgICovXG5cdFx0dGhpcy5pdGVtbGlzdD1bXTtcblx0XHR0aGlzLnN0YXRlPXtpdGVtbGlzdDpbXX07XG5cdFx0dGhpcy5faXNNb3VudGVkPWZhbHNlO1xuXHRcdHZhciBhcmdzPXt9O1xuXHRcdHZhciBvcHRpb25zPXtkb2N0eXBlOnRoaXMucHJvcHMuZG9jdHlwZX07XG5cdFx0dmFyIGZpbHRlcj17fTtcblx0XHRpZiAodGhpcy5wcm9wcy5maWx0ZXI9PXVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLmZpbHRlcj09bnVsbCl7XG5cblx0XHR9ZWxzZXtcblx0XHRcdGZpbHRlcj0gdGhpcy5wcm9wcy5maWx0ZXI7XG5cdFx0fVxuXHRcdHRoaXMubGlzdFRvb2wgPSBuZXcgcHMuYXBpVG9vbChmaWx0ZXIsIG9wdGlvbnMgLHRoaXMuZG9jQ2hhbmdlZCk7XG5cdFx0aWYgKHRoaXMubGlzdFRvb2wuaXRlbXM9PT11bmRlZmluZWQgfHx0aGlzLmxpc3RUb29sLml0ZW1zPT09IDAgfHx0aGlzLmxpc3RUb29sLml0ZW1zPT09bnVsbCApe1xuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5zdGF0ZS5saXN0PXRoaXMubGlzdFRvb2wuaXRlbXM7XG5cdFx0fVxuXG5cdFx0dGhpcy5jcmVhdGVMaXN0KCk7XG5cdH1cblx0ZG9jQ2hhbmdlZCgpe1xuXHRcdHRoaXMuY3JlYXRlTGlzdCgpO1xuXHR9XG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0dGhpcy5faXNNb3VudGVkPXRydWU7XG5cdFx0dGhpcy5hdXRvY29tcGxldGUoKTtcblxuXHR9XG5cdGNyZWF0ZUxpc3QoKXtcblx0XHR0aGlzLml0ZW1saXN0PVtdO1xuXHRcdC8vbGFibGUgYW5kIHZhbHVlXG5cdFx0aWYgKHRoaXMucHJvcHMuZG9jbGFibGUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmxpc3RUb29sLml0ZW1zICE9PSB1bmRlZmluZWQgJiYgdGhpcy5saXN0VG9vbC5pdGVtcyAhPT0gbnVsbCl7XG5cdFx0XHRmb3IobGV0IGl0ZW0gb2YgdGhpcy5saXN0VG9vbC5pdGVtcyl7XG5cdFx0XHRcdHZhciB0ZW1wID1baXRlbVt0aGlzLnByb3BzLmRvY2xhYmxlXSxpdGVtW3RoaXMucHJvcHMuZG9jdmFsdWVdXTtcblx0XHRcdFx0dGhpcy5pdGVtbGlzdC5wdXNoKHRlbXApO1xuXHRcdFx0fVxuXHRcdFx0JChkb2N1bWVudCkudHJpZ2dlcignbGlzdExvYWQnICsgdGhpcy5wcm9wcy5kb2N0eXBlKTtcblx0XHR9XG5cdFx0Ly9qdXN0IGxhYmxlXG5cdFx0ZWxzZSBpZih0aGlzLmxpc3RUb29sLml0ZW1zICE9PSB1bmRlZmluZWQgJiYgdGhpcy5saXN0VG9vbC5pdGVtcyAhPT0gbnVsbCl7XG5cdFx0XHRmb3IobGV0IGl0ZW0gb2YgdGhpcy5saXN0VG9vbC5pdGVtcyl7XG5cdFx0XHRcdHRoaXMuaXRlbWxpc3QucHVzaChpdGVtW3RoaXMucHJvcHMuZG9jdmFsdWVdKTtcblx0XHRcdH1cblx0XHRcdCQoZG9jdW1lbnQpLnRyaWdnZXIoJ2xpc3RMb2FkJyArIHRoaXMucHJvcHMuZG9jdHlwZS5yZXBsYWNlKFwiIFwiLFwiXCIpKTtcblx0XHR9XG5cdH1cblx0Y29tcG9uZW50V2lsbFVubW91bnQoKXtcblx0XHQvLyBjb25zb2xlLmxvZyhcIkhFTExPXCIpO1xuXHRcdC8vIHRoaXMuYXcuZGVzdHJveSgpO1xuXHRcdC8vIGRlbGV0ZSB0aGlzLmF3O1xuXHRcdC8vIGNvbnNvbGUubG9nKFwiVEVTVFwiKTtcblx0fVxuXHRyZWZDYWxsKGlucHV0KXtcblx0XHR0aGlzLmlucHV0PWlucHV0O1xuXHR9XG5cdGF1dG9jb21wbGV0ZShpbnB1dCl7XG5cdFx0aW5wdXQ9dGhpcy5pbnB1dDtcblx0XHR2YXIgY29uZmlnPSB7XG5cdFx0XHRcdG1pbkNoYXJzOiAwLFxuXHRcdFx0XHRtYXhJdGVtczogOTksXG5cdFx0XHRcdGF1dG9GaXJzdDogdHJ1ZSxcblx0XHRcdFx0ZmlsdGVyOiBBd2Vzb21wbGV0ZS5GSUxURVJfU1RBUlRTV0lUSFxuXHRcdFx0fVxuXHRcdGlmKHRoaXMucHJvcHMuZG9jbGFibGUgIT09IHVuZGVmaW5lZCApe1xuXHRcdFx0Y29uZmlnLml0ZW09IGZ1bmN0aW9uKGl0ZW0sIGlucHV0KSB7XG5cdFx0XHRcdHZhciBkID0gaXRlbTtcblx0XHRcdFx0dmFyIGh0bWwgPSBcIjxzcGFuPlwiICsgX18oaXRlbS5sYWJlbCkrIFwiPC9zcGFuPjxicj48c3Bhbj48c21hbGw+XCIraXRlbS52YWx1ZStcIjwvc21hbGw+PC9zcGFuPlwiO1xuXHRcdFx0XHRyZXR1cm4gJCgnPGxpPjwvbGk+Jylcblx0XHRcdFx0XHQuZGF0YSgnaXRlbS5hdXRvY29tcGxldGUnLCBpdGVtKVxuXHRcdFx0XHRcdC5odG1sKCc8YT48cD4nICsgaHRtbCArICc8L3A+PC9hPicpXG5cdFx0XHRcdFx0LmdldCgwKTtcblx0XHRcdH1cblxuXHRcdH1lbHNle1xuXHRcdFx0Y29uZmlnLml0ZW09ZnVuY3Rpb24oaXRlbSwgaW5wdXQpIHtcblx0XHRcdFx0dmFyIGQgPSBpdGVtO1xuXHRcdFx0XHR2YXIgaHRtbCA9IFwiPHNwYW4+XCIgKyBfXyhpdGVtKSsgXCI8L3NwYW4+XCI7XG5cdFx0XHRcdHJldHVybiAkKCc8bGk+PC9saT4nKVxuXHRcdFx0XHRcdC5kYXRhKCdpdGVtLmF1dG9jb21wbGV0ZScsIGl0ZW0pXG5cdFx0XHRcdFx0Lmh0bWwoJzxhPjxwPicgKyBodG1sICsgJzwvcD48L2E+Jylcblx0XHRcdFx0XHQuZ2V0KDApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLmF3ID0gbmV3IEF3ZXNvbXBsZXRlKGlucHV0LGNvbmZpZyk7XG5cdFx0aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRcdCdhd2Vzb21wbGV0ZS1zZWxlY3Rjb21wbGV0ZScsXG5cdFx0XHRcdHRoaXMuaW5wdXRDaGFuZ2Vcblx0XHQpO1xuXHRcdCQoaW5wdXQpLmNsaWNrKCBmdW5jdGlvbigpIHtcblx0XHRcdGlmICh0aGlzLmF3LnVsLmNoaWxkTm9kZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdHRoaXMuYXcubWluQ2hhcnMgPSAwO1xuXHRcdFx0XHR0aGlzLmF3LmV2YWx1YXRlKCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmICh0aGlzLmF3LnVsLmhhc0F0dHJpYnV0ZSgnaGlkZGVuJykpIHtcblx0XHRcdFx0dGhpcy5hdy5vcGVuKCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dGhpcy5hdy5jbG9zZSgpO1xuXHRcdFx0fVxuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5hdy5saXN0PXRoaXMuaXRlbUxpc3Q7XG5cdFx0JChkb2N1bWVudCkuYmluZCgnbGlzdExvYWQnICsgdGhpcy5wcm9wcy5kb2N0eXBlLnJlcGxhY2UoXCIgXCIsXCJcIiksZnVuY3Rpb24oKXtcblx0XHRcdHRoaXMuYXcubGlzdD10aGlzLml0ZW1saXN0O1xuXHRcdH0uYmluZCh0aGlzKSk7XG5cdH1cblx0aW5wdXRDaGFuZ2UoZSl7XG5cdFx0dGhpcy5wcm9wcy5pbnB1dENoYW5nZWQoZSk7XG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnR5cGUgPSAodGhpcy5wcm9wcy50eXBlID09PSB1bmRlZmluZWQpID8gXCJ0ZXh0XCI6IHRoaXMucHJvcHMudHlwZTtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMucGxhY2Vob2xkZXIgPSAodGhpcy5wcm9wcy5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXI7XG5cdFx0dGhpcy5sYWJsZSA9ICh0aGlzLnByb3BzLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5sYWJsZTtcblx0XHR0aGlzLmRpc2FibGVkID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5kaXNhYmxlZD09ZmFsc2V8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZXF1aXJlZCA9ICh0aGlzLnByb3BzLnJlcXVpcmVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVxdWlyZWQ9PWZhbHNlfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVhZG9ubHkgPSAodGhpcy5wcm9wcy5yZWFkb25seSA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1mYWxzZXx8dGhpcy5wcm9wcy5yZWFkb25seT09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblxuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblx0XHR0aGlzLmNsYXNzTmFtZT0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJmb3JtLWNvbnRyb2wgYXdlc29tcGxldGVcIjogXCJmb3JtLWNvbnRyb2wgYXdlc29tcGxldGUgXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHZhciBpbnB1dD0oIDxpbnB1dFxuXHRcdFx0XHRcdHZhbHVlPXt0aGlzLnZhbHVlfVxuXG5cdFx0XHRcdFx0dHlwZT17dGhpcy50eXBlfVxuXHRcdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9XG5cdFx0XHRcdFx0cGxhY2Vob2xkZXI9e3RoaXMucGxhY2Vob2xkZXJ9XG5cdFx0XHRcdFx0cmVmPXt0aGlzLnJlZkNhbGx9XG5cdFx0ICAgICAgICAgIFx0b25DaGFuZ2U9e3RoaXMuaW5wdXRDaGFuZ2V9XG5cdFx0ICAgICAgICAgIFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdFx0ICAgICAgICAgIFx0cmVhZE9ubHk9e3RoaXMucmVhZG9ubHl9XG5cdFx0ICAgICAgICAgIFx0cmVxdWlyZWQ9e3RoaXMucmVxdWlyZWR9XG5cdFx0ICAgICAgICAgIC8+KTtcblxuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy5sYWJsZSA9PVwiXCIpe1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgXCI+XG5cdFx0ICAgIFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbFwiPnt0aGlzLnByb3BzLmxhYmxlfTwvbGFiZWw+XG5cdFx0ICAgIFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIlwiPlxuXHRcdCAgICAgIFx0XHRcdHtpbnB1dH1cblx0XHQgICAgXHRcdDwvZGl2PlxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHQgICAgICBcdFx0e2lucHV0fVxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuZXhwb3J0IGNsYXNzIEJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy50eXBlID0gKHRoaXMucHJvcHMudHlwZSA9PT0gdW5kZWZpbmVkKSA/IFwidGV4dFwiOiB0aGlzLnByb3BzLnR5cGU7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLmRpc2FibGVkID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5kaXNhYmxlZD09ZmFsc2V8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dmFyIG91dHB1dD1cIlwiO1xuXHRcdHRoaXMuY2xhc3NOYW1lPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcImJ0blwiOiBcImJ0biBcIiArdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0dmFyIGljb249XCJcIjtcblx0XHRpZih0aGlzLnByb3BzLmljb24hPT0gdW5kZWZpbmVkICYmIHRoaXMucHJvcHMuaWNvbiE9PVwiXCIpe1xuXHRcdFx0dmFyIGljb25DbGFzcz1cImdseXBoaWNvbiBcIiArdGhpcy5wcm9wcy5pY29uO1xuXHRcdFx0aWNvbj0oPHNwYW4gY2xhc3NOYW1lPXtpY29uQ2xhc3N9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj4pO1xuXHRcdH1cblx0XHR2YXIgaW5wdXQ9KFxuXHRcdFx0PGJ1dHRvblxuXHRcdFx0XHR0eXBlPXt0aGlzLnR5cGV9XG5cdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9XG5cdFx0XHRcdHZhbHVlPXt0aGlzLnZhbHVlfVxuXHRcdFx0XHRvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2xpY2t9XG5cdFx0XHRcdGRpc2FibGVkPXt0aGlzLmRpc2FibGVkfVxuXHRcdFx0PntpY29ufSB7dGhpcy52YWx1ZX08L2J1dHRvbj5cblx0XHQpO1xuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHQgIFx0XHR7aW5wdXR9XG5cdCAgXHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RhbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnN1Ym1pdD10aGlzLnN1Ym1pdC5iaW5kKHRoaXMpO1xuXHR9XG5cdHN1Ym1pdChlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5wcm9wcy5zdWJtaXQoZSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dmFyIGZvb3Rlcj1cIlwiO1xuXHRcdGlmKHRoaXMucHJvcHMuc3VibWl0IT09IGZhbHNlKXtcblx0XHRcdGZvb3Rlcj0oXHRcdFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWZvb3RlclwiPlxuXHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tc2Vjb25kYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DbG9zZTwvYnV0dG9uPlxuXHRcdFx0XHRcdDxidXR0b24gXG5cdFx0XHRcdFx0XHR0eXBlPVwic3VibWl0XCIgXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLnN1Ym1pdH0gXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiA+XG5cdFx0XHRcdFx0XHRcdHt0aGlzLnByb3BzLnN1Ym1pdFRleHR9XG5cdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KVxuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsIGZhZGUgdGV4dC1sZWZ0IHBhbmVsLWRlZmF1bHRcIiBpZD17dGhpcy5wcm9wcy5pZH0gdGFiSW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiBhcmlhLWxhYmVsbGVkYnk9XCJleGFtcGxlTW9kYWxMYWJlbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZ1wiIHJvbGU9XCJkb2N1bWVudFwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1oZWFkZXJcIj5cblx0XHRcdFx0XHRcdFx0PGg0IGNsYXNzTmFtZT1cIm1vZGFsLXRpdGxlXCIgaWQ9XCJleGFtcGxlTW9kYWxMYWJlbFwiPnt0aGlzLnByb3BzLnRpdGxlfTwvaDQ+XG5cdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGRpc3BsYXk9XCJub25lXCIgY2xhc3NOYW1lPVwiY2xvc2UgaGlkZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+XG5cdFx0XHRcdFx0XHRcdDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+XG5cdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XG5cdFx0XHRcdFx0XHRcdFx0eyB0aGlzLnByb3BzLmNoaWxkcmVuIH1cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdHtmb290ZXJ9XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuaW5pdFRhYmxlPXRoaXMuaW5pdFRhYmxlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jb21wb25lbnREaWRVcGRhdGU9dGhpcy5jb21wb25lbnREaWRVcGRhdGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmNvbXBvbmVudFdpbGxVcGRhdGU9dGhpcy5jb21wb25lbnRXaWxsVXBkYXRlLmJpbmQodGhpcyk7XG5cblx0fVxuXG5cdGluaXRUYWJsZSgpe1xuXHRcdC8vXG5cdFx0Ly8gaWYodGhpcy50YWJsZSAhPT0gdW5kZWZpbmVkKXtcblx0XHQvLyBcdHRoaXMudGFibGUuZGVzdHJveSgpO1xuXHRcdC8vIH1cblx0XHR2YXIgY29uZmlnPXtcblx0ICAgIFx0XCJkZXN0cm95XCI6IHRydWUsXG5cdCAgICBcdFwic2Nyb2xsWVwiOiAnNzB2aCcsXG4gICAgICAgIFx0XCJzY3JvbGxDb2xsYXBzZVwiOiB0cnVlLFxuXHQgICAgICAgIFwic2Nyb2xsWFwiOiB0cnVlLFxuXHQgICAgICAgIFwicGFnaW5nXCI6ICAgZmFsc2UsXG5cdCAgICAgICAgXCJzdGF0ZVNhdmVcIjogdHJ1ZSxcblx0ICAgICAgICBcImNvbHVtbnNcIjogdGhpcy5wcm9wcy5jb2x1bW5zLFxuXHQgICAgICAgIFwiaW5mb1wiOiAgICAgZmFsc2Vcblx0ICAgIH07XG5cdCAgICBpZih0aGlzLnByb3BzLnNlYXJjaCl7XG5cdCAgICBcdGNvbmZpZy5zZWFyY2hpbmc9dHJ1ZTtcblx0ICAgIH1cblx0ICAgIGVsc2V7Y29uZmlnLnNlYXJjaGluZz1mYWxzZTt9XG5cdCAgICB0aGlzLnRhYmxlPSQoXCIjXCIrdGhpcy5wcm9wcy5pZCkuRGF0YVRhYmxlKGNvbmZpZyk7XG5cdH1cblx0Y29tcG9uZW50V2lsbFVwZGF0ZSgpe1xuXG5cdFx0aWYodGhpcy50YWJsZSAhPT0gdW5kZWZpbmVkKXtcblx0XHRcdGNvbnNvbGUubG9nKFwiREVTVFJPWVwiKTtcblx0XHRcdHRoaXMudGFibGUuZGVzdHJveSgpO1xuXHRcdH1cblx0fVxuXHRjb21wb25lbnREaWRVcGRhdGUoKXtcblx0XHR0aGlzLmluaXRUYWJsZSgpO1xuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0cmV0dXJuKFxuXG5cdFx0XHQ8dGFibGVcblx0XHRcdFx0Y2xhc3NOYW1lPVwic3RyaXBlIHRhYmxlIHRhYmxlLWJvcmRlcmVkIHBzLWxpc3QtdGFibGVcIiBcblx0XHRcdFx0d2lkdGg9XCIxMDAlXCJcblx0XHRcdFx0aWQ9e3RoaXMucHJvcHMuaWR9XG5cdFx0XHRcdD5cblx0XHRcdFx0e3RoaXMucHJvcHMuY29udGVudH1cblx0XHRcdDwvdGFibGU+XG5cdFx0KTtcblx0fVxufSIsIi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuaW1wb3J0IEZvcm0gZnJvbSAnLi4vLi4vcHVibGljL2pzL21vZHVsZXMvdXRpbHMvZm9ybXMnXG5pbXBvcnQge0NoZWNrLEJ1dHRvbn0gZnJvbSAnLi4vLi4vcHVibGljL2pzL21vZHVsZXMvdXRpbHMvZm9ybXMnXG4vLyBpbXBvcnQgQWNvcmRpYW4gZnJvbSAnLi4vLi4vcHVibGljL2pzL21vZHVsZXMvdXRpbHMvYWNvcmRpYW4nXG4vLyBpbXBvcnQgQWNvcmRpYW5Db250ZW50IGZyb20gJy4uLy4uL3B1YmxpYy9qcy9tb2R1bGVzL3V0aWxzL2Fjb3JkaWFuQ29udGVudCdcbmltcG9ydCBEb2NUYWJsZSBmcm9tICcuLi8uLi9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9kb2NUYWJsZSdcbmltcG9ydCBBY29yZGlhbkNvbnRlbnQgZnJvbSAnLi4vLi4vcHVibGljL2pzL21vZHVsZXMvdXRpbHMvYWNvcmRpYW5Db250ZW50J1xuLy9pbXBvcnQgU3ByYXlUYWJsZSBmcm9tICcuLi8uLi9wdWJsaWMvanMvbW9kdWxlcy92aW5leWFyZC9zcHJheVRhYmxlJ1xuXG5cblxuY29uc3QgYXBwPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJyk7XG5jbGFzcyBGaWVsZEZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuZmVpbGRzPVtcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJzZWxlY3RcIixcblx0XHRcdFx0b25DaGFuZ2U6IHRoaXMuc29tZUZ1bmN0aW9uLFxuXHRcdFx0XHR2YWx1ZTpcIklucHV0XCIsXG5cdFx0XHRcdG9wdGlvbnM6W1xuXHRcdFx0XHRcdFwiSW5wdXRcIixcblx0XHRcdFx0XHRcIlNlbGVjdFwiLFxuXHRcdFx0XHRcdFwiTnVtYmVyXCIsXG5cdFx0XHRcdFx0XCJEYXRlXCIsXG5cdFx0XHRcdFx0XCJDaGVja1wiLFxuXHRcdFx0XHRcdFwiVGV4dGFyZWFcIlxuXHRcdFx0XHRdXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImlucHV0XCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiB0aGlzLnNvbWVGdW5jdGlvbixcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwidGV4dGFyZWFcIixcblx0XHRcdFx0Y2xhc3NOYW1lOlwiXCIsXG5cdFx0XHRcdHJvd3M6XCIxXCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiB0aGlzLnNvbWVGdW5jdGlvblxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJidXR0b25cIixcblx0XHRcdFx0dmFsdWU6XCJSZW1vdmVcIixcblx0XHRcdFx0Y2xhc3NOYW1lOlwiYnRuLWRhbmdlclwiLFxuXHRcdFx0XHRvbkNsaWNrOiB0aGlzLnNvbWVGdW5jdGlvblxuXHRcdFx0fVxuXHRcdF1cblx0fVxuXHRyZW5kZXIoKXtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuXHRcdFx0XHRcdDxGb3JtXG5cdFx0XHRcdFx0XHR0eXBlPVwiaW5saW5lXCJcblx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImlubGluZVwiXG5cdFx0XHRcdFx0XHRyb3dzPVwiNFwiXG5cdFx0XHRcdFx0XHRmaWVsZHM9e3RoaXMuZmVpbGRzfVxuXHRcdFx0XHRcdFx0aWQ9XCJ0aGluZ1wiXG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblxuXHRcdCk7XG5cdH1cbn1cbmNsYXNzIERvY3R5cGVVcGRhdGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnN0YXRlPXthY3RpdmU6MH07XG5cblx0XHR0aGlzLmZpZWxkcz1bXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmVsOlwiQWN0aXZlXCIsXG5cdFx0XHRcdGZpZWxkOlwiY2hlY2tcIixcblx0XHRcdFx0b25DaGFuZ2U6IHRoaXMuc29tZUZ1bmN0aW9uLFxuXHRcdFx0fSxcblx0XHRdO1xuXG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PENoZWNrXG5cdFx0XHRcdFx0bGFibGU9XCJBY3RpdmVcIlxuXHRcdFx0XHRcdHZhbHVlPXt0aGlzLnN0YXRlLmFjdGl2ZX1cblx0XHRcdFx0XHRpbnB1dENoYW5nZWQ9e2Z1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImhlbGxvXCIpO1xuXHRcdFx0XHRcdFx0dmFyIHN0YXRlQ2hhbmdlPXRoaXMuc3RhdGUuYWN0aXZlO1xuXHRcdFx0XHRcdFx0aWYoc3RhdGVDaGFuZ2U9PTEpe1xuXHRcdFx0XHRcdFx0XHRzdGF0ZUNoYW5nZT0wO1xuXHRcdFx0XHRcdFx0fWVsc2V7c3RhdGVDaGFuZ2U9MTt9XG5cdFx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHthY3RpdmU6c3RhdGVDaGFuZ2V9KTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcyl9XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3cgaW5saW5lLWZvcm0taGVhZGVyXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtM1wiPlR5cGU8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0zXCI+TmFtZTwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTZcIj5PcHRpb25zPC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8RmllbGRGb3JtPjwvRmllbGRGb3JtPlxuXHRcdFx0XHQ8RmllbGRGb3JtPjwvRmllbGRGb3JtPlxuXHRcdFx0XHQ8QnV0dG9uXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPVwiYnRuLXByaW1hcnlcIlxuXHRcdFx0XHRcdHZhbHVlPVwiQWRkIEZpZWxkXCJcblx0XHRcdFx0XHRpY29uPVwiZ2x5cGhpY29uLWFsaWduLWxlZnRcIlxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdDxCdXR0b25cblx0XHRcdFx0XHRjbGFzc05hbWU9XCJidG4tc3VjY2Vzc1wiXG5cdFx0XHRcdFx0dmFsdWU9XCJVcGRhdGVcIlxuXHRcdFx0XHRcdGljb249XCJnbHlwaGljb24tcmVmcmVzaFwiXG5cdFx0XHRcdFx0Lz5cblx0XHRcdDwvZGl2PlxuXG5cdFx0KTtcblx0fVxufVxuXG5cbmNsYXNzIFRhc2tNYW5hZ2VyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnRhc2tVcGRhdGU9dGhpcy50YXNrVXBkYXRlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy51cGRhdGVOZXdUYXNrTmFtZT10aGlzLnVwZGF0ZU5ld1Rhc2tOYW1lLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jcmVhdGVUYXNrPXRoaXMuY3JlYXRlVGFzay5iaW5kKHRoaXMpO1xuXG5cdFx0Y29uc29sZS5sb2coXCJoZWxsb1wiKTtcblx0XHR0aGlzLmRvY3R5cGVUb29sID0gbmV3IHBzLmFwaVRvb2woe21vZHVsZTpcIlRhc2tzXCJ9LHtkb2N0eXBlOidEb2NUeXBlJ30sdGhpcy50YXNrVXBkYXRlKTtcblx0XHR0aGlzLnN0YXRlPXtcblx0XHRcdHRhc2tzOnRoaXMuZG9jdHlwZVRvb2wuaXRlbXMsXG5cdFx0XHR0YXNrTmFtZUVycm9yOjAsXG5cdFx0XHRuZXdUYXNrTmFtZTpcIlwiXG5cdFx0fVxuXHR9XG5cdHRhc2tVcGRhdGUoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdHRhc2tzOnRoaXMuZG9jdHlwZVRvb2wuaXRlbXNcblx0XHR9KVxuXHR9XG5cdHVwZGF0ZU5ld1Rhc2tOYW1lKGUpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0bmV3VGFza05hbWU6ZS50YXJnZXQudmFsdWUsXG5cdFx0XHR0YXNrTmFtZUVycm9yOjBcblx0XHR9KTtcblx0fVxuXHRjcmVhdGVUYXNrKGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRpZih0aGlzLnN0YXRlLm5ld1Rhc2tOYW1lPT1cIlwiKXtcblx0XHRcdHBzLmZhaWxBbGVydChcIlRhc2sgTmFtZSBSZXF1aXJlZFwiKTtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3Rhc2tOYW1lRXJyb3I6MX0pO1xuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5kb2N0eXBlVG9vbC5jcmVhdGUoXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOnRoaXMuc3RhdGUubmV3VGFza05hbWUsXG5cdFx0XHRcdFx0bW9kdWxlOlwiVGFza3NcIixcblx0XHRcdFx0XHRjdXN0b206MSxcblx0XHRcdFx0XHRmaWVsZHM6W1xuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRmaWVsZG5hbWU6XCJhY3RpdmVcIixcblx0XHRcdFx0XHRcdFx0ZmllbGR0eXBlOlwiQ2hlY2tcIlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0cGVybWlzc2lvbnM6W1xuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRkb2NUeXBlOlwiRG9jUGVybVwiLFxuXHRcdFx0XHRcdFx0XHRyb2xlOlwiU3lzdGVtIE1hbmFnZXJcIlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdF1cblx0XHRcdFx0fVxuXHRcdFx0KVxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7bmV3VGFza05hbWU6XCJcIn0pO1xuXHRcdH1cblx0fVxuXHRyZW5kZXIoKXtcblx0XHRjb25zb2xlLmxvZyh0aGlzLnN0YXRlKTtcblx0XHR2YXIgaXRlbXM9W107XG5cdFx0dGhpcy5mZWlsZHM9W1xuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImlucHV0XCIsXG5cdFx0XHRcdHZhbHVlOnRoaXMuc3RhdGUubmV3VGFza05hbWUsXG5cdFx0XHRcdHBsYWNlaG9sZGVyOlwiVGFzayBOYW1lXCIsXG5cdFx0XHRcdGVycm9yOnRoaXMuc3RhdGUudGFza05hbWVFcnJvcixcblx0XHRcdFx0cmVxdWlyZWQ6MSxcblx0XHRcdFx0b25DaGFuZ2U6IHRoaXMudXBkYXRlTmV3VGFza05hbWUsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImJ1dHRvblwiLFxuXHRcdFx0XHR2YWx1ZTpcIkNyZWF0ZSBOZXcgVGFza1wiLFxuXHRcdFx0XHRjbGFzc05hbWU6XCJidG4tcHJpbWFyeVwiLFxuXHRcdFx0XHRpY29uOlwiZ2x5cGhpY29uLXBsdXNcIixcblx0XHRcdFx0b25DbGljazogdGhpcy5jcmVhdGVUYXNrXG5cdFx0XHR9XG5cdFx0XVxuXHRcdGNvbnNvbGUubG9nKHRoaXMuZG9jdHlwZVRvb2wuaXRlbXMpO1xuXHRcdHRoaXMuc3RhdGUudGFza3MubWFwKGZ1bmN0aW9uKGl0ZW0pIHtcblx0XHRcdGl0ZW1zLnB1c2goXG5cdFx0XHRcdDxBY29yZGlhbkNvbnRlbnRcblx0XHRcdFx0dGl0bGU9e2l0ZW0ubmFtZX1cblx0XHRcdFx0YWN0aXZlPXtmYWxzZX1cblx0XHRcdFx0cGFyZW50SWQ9e2l0ZW0ubmFtZX1cblx0XHRcdFx0aWQ9e1widGFza19kaXNwbGF5X1wiK2l0ZW0ubmFtZS5yZXBsYWNlKC8gL2csXCJfXCIpfSA+XG5cblx0XHRcdFx0XHQ8RG9jdHlwZVVwZGF0ZXJcblx0XHRcdFx0XHRcdGhpZGRlbkZpZWxkcz17W1wiVmluZXlhcmRcIixcIkhvdXJzXCIsXCJOb3RlXCIsXCJTZWFzb25cIixcIkxvY2F0aW9uXCIsXCJEZWZhdWx0X1JhdGVcIl19XG5cdFx0XHRcdFx0XHRkb2N0eXBlSXRlbT17aXRlbX1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdDwvQWNvcmRpYW5Db250ZW50PlxuXHRcdFx0KTtcblx0XHR9KTtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PntpdGVtc31cblxuXHRcdFx0XHRcdDxGb3JtXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJpbmxpbmVcIlxuXHRcdFx0XHRcdFx0dHlwZT1cImlubGluZVwiXG5cdFx0XHRcdFx0XHRyb3dzPVwiMlwiXG5cdFx0XHRcdFx0XHRmaWVsZHM9e3RoaXMuZmVpbGRzfVxuXHRcdFx0XHRcdFx0aWQ9XCJ0aGluZ1wiXG5cdFx0XHRcdFx0Lz5cblx0XHQ8L2Rpdj5cblx0XHQpO1xuXG5cdH1cbn1cblxuY29uc3QgYXBwMj0gJCgnI2FwcDInKVswXTtcbihmdW5jdGlvbigpe1xuXHR2YXIgZmlsdGVyPXt9O1xuXHRmcmFwcGUucmVhZHkoZnVuY3Rpb24oKXtcblx0XHRSZWFjdERPTS5yZW5kZXIoXG5cdFx0XHQ8VGFza01hbmFnZXI+PC9UYXNrTWFuYWdlcj5cblx0XHQsIGFwcDIgKTtcblx0fSlcblxufSkoKTtcblxuXG4vLyBjbGFzcyBDcmVhdGVXb3Jrb3JkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG4vLyBcdGNvbnN0cnVjdG9yKHByb3BzKXtcbi8vIFx0XHRzdXBlcihwcm9wcyk7XG4vLyBcdH1cbi8vIFx0Ly88QWZmaXhXcmFwcGVyIGNsYXNzTmFtZT1cInN0aWNreV9zdWJuYXYgdGV4dC1jZW50ZXJcIiAgb2Zmc2V0PXsxNDB9IGhlaWdodD1cIjQwcHhcIj48L0FmZml4V3JhcHBlcj5cbi8vIFx0c29tZUZ1bmN0aW9uKCl7XG5cbi8vIFx0fVxuLy8gXHRyZW5kZXIoKXtcbi8vIFx0XHR2YXIgZmllbGRzPVtcbi8vIFx0XHRcdHtcbi8vIFx0XHRcdFx0ZmllbGQ6XCJoZWFkZXJcIixcbi8vIFx0XHRcdFx0bGFibGU6XCJURVNUSU5HXCJcbi8vIFx0XHRcdH0sXG5cbi8vIFx0XHRcdHtcbi8vIFx0XHRcdFx0ZmllbGQ6XCJpbnB1dFwiLFxuLy8gXHRcdFx0XHRvbkNoYW5nZTogdGhpcy5zb21lRnVuY3Rpb24sXG4vLyBcdFx0XHRcdGxhYmxlOlwidGVzdFwiXG4vLyBcdFx0XHR9LFxuLy8gXHRcdFx0e1xuLy8gXHRcdFx0XHRmaWVsZDpcImxhYmxlXCIsXG4vLyBcdFx0XHRcdGxhYmxlOlwiVEVTWFNERlwiXG4vLyBcdFx0XHR9LFxuLy8gXHRcdFx0e1xuLy8gXHRcdFx0XHRmaWVsZDpcImlucHV0XCIsXG4vLyBcdFx0XHRcdG9uQ2hhbmdlOiB0aGlzLnNvbWVGdW5jdGlvbixcbi8vIFx0XHRcdFx0bGFibGU6XCJ0ZXN0MlwiXG4vLyBcdFx0XHR9LFxuLy8gXHRcdFx0e1xuLy8gXHRcdFx0XHRmaWVsZDpcImRhdGVcIixcbi8vIFx0XHRcdFx0b25DaGFuZ2U6IHRoaXMuc29tZUZ1bmN0aW9uLFxuLy8gXHRcdFx0XHRsYWJsZTpcIkRhdGVcIlxuLy8gXHRcdFx0fSxcbi8vIFx0XHRcdHtcbi8vIFx0XHRcdFx0ZmllbGQ6XCJzZWxlY3RcIixcbi8vIFx0XHRcdFx0b25DaGFuZ2U6IHRoaXMuc29tZUZ1bmN0aW9uLFxuLy8gXHRcdFx0XHRsYWJsZTpcInRlc3QyXCIsXG4vLyBcdFx0XHRcdG9wdGlvbnM6W1xuLy8gXHRcdFx0XHRcdHtcbi8vIFx0XHRcdFx0XHRcdGdyb3VwOiBcInRoaW5nXCIsXG4vLyBcdFx0XHRcdFx0XHRvcHRpb25zOiBbXG4vLyBcdFx0XHRcdFx0XHRcdFwib25lXCIsXG4vLyBcdFx0XHRcdFx0XHRcdFwidHdvXCIsXG4vLyBcdFx0XHRcdFx0XHRcdFwidGhyZWVcIlxuLy8gXHRcdFx0XHRcdFx0XVxuLy8gXHRcdFx0XHRcdH0sXG4vLyBcdFx0XHRcdFx0e1xuLy8gXHRcdFx0XHRcdFx0Z3JvdXA6IFwidGhpbmcyXCIsXG4vLyBcdFx0XHRcdFx0XHRvcHRpb25zOiBbXG4vLyBcdFx0XHRcdFx0XHRcdFwib25lXCIsXG4vLyBcdFx0XHRcdFx0XHRcdFwidHdvXCIsXG4vLyBcdFx0XHRcdFx0XHRcdFwidGhyZWVcIlxuLy8gXHRcdFx0XHRcdFx0XVxuLy8gXHRcdFx0XHRcdH1cbi8vIFx0XHRcdFx0XVxuLy8gXHRcdFx0fSxcbi8vIFx0XHRcdHtcbi8vIFx0XHRcdFx0ZmllbGQ6XCJzZWxlY3RcIixcbi8vIFx0XHRcdFx0b25DaGFuZ2U6IHRoaXMuc29tZUZ1bmN0aW9uLFxuLy8gXHRcdFx0XHRsYWJsZTpcInRlc3QyXCIsXG4vLyBcdFx0XHRcdHZhbHVlOlwidHdvXCIsXG4vLyBcdFx0XHRcdG9wdGlvbnM6W1xuLy8gXHRcdFx0XHRcdFwib25lXCIsXG4vLyBcdFx0XHRcdFx0XCJ0d29cIixcbi8vIFx0XHRcdFx0XHRcInRocmVlXCJcbi8vIFx0XHRcdFx0XVxuLy8gXHRcdFx0fSxcbi8vIFx0XHRcdHtcbi8vIFx0XHRcdFx0ZmllbGQ6XCJjaGVja1wiLFxuLy8gXHRcdFx0XHRjbGFzc05hbWU6XCJiaWctY2hlY2tib3hcIixcbi8vIFx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe2NvbnNvbGUubG9nKGUudGFyZ2V0LmNoZWNrZWQpfSxcbi8vIFx0XHRcdFx0bGFibGU6XCJ0aGlzIGlzIGEgdGVzdFwiXG4vLyBcdFx0XHR9LFxuLy8gXHRcdFx0e1xuLy8gXHRcdFx0XHRsYWJsZTpcIlRlc3QgVGV4dCBBcmVhXCIsXG4vLyBcdFx0XHRcdGZpZWxkOlwidGV4dGFyZWFcIixcbi8vIFx0XHRcdFx0Y2xhc3NOYW1lOlwiXCIsXG4vLyBcdFx0XHRcdG9uQ2hhbmdlOiB0aGlzLnNvbWVGdW5jdGlvblxuLy8gXHRcdFx0fSxcbi8vIFx0XHRcdHtcbi8vIFx0XHRcdFx0ZmllbGQ6XCJhdXRvQ29tcGxldGVcIixcbi8vIFx0XHRcdFx0b25DaGFuZ2U6IHRoaXMuc29tZUZ1bmN0aW9uLFxuLy8gXHRcdFx0XHRsYWJsZTpcIlZpbmV5YXJkXCIsXG4vLyBcdFx0XHRcdGRvY3R5cGU6XCJWaW5leWFyZFwiLFxuLy8gXHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIlxuLy8gXHRcdFx0fSxcbi8vIFx0XHRcdHtcbi8vIFx0XHRcdFx0ZmllbGQ6XCJhdXRvQ29tcGxldGVcIixcbi8vIFx0XHRcdFx0b25DaGFuZ2U6IHRoaXMuc29tZUZ1bmN0aW9uLFxuLy8gXHRcdFx0XHRsYWJsZTpcIkN1c3RvbWVyXCIsXG4vLyBcdFx0XHRcdGRvY3R5cGU6XCJDdXN0b21lclwiLFxuLy8gXHRcdFx0XHRkb2NsYWJsZTpcImZ1bGxfbmFtZVwiLFxuLy8gXHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIlxuLy8gXHRcdFx0fVxuLy8gXHRcdF1cbi8vIFx0XHRyZXR1cm4oXG4vLyBcdFx0XHQ8ZGl2PlxuLy8gXHRcdFx0PEZvcm1cbi8vIFx0XHRcdFx0dHlwZT1cImhvcml6b250YWxcIlxuLy8gXHRcdFx0XHRmaWVsZHM9e2ZpZWxkc31cbi8vIFx0XHRcdFx0aWQ9XCJ0aGluZ1wiXG4vLyBcdFx0XHQ+XG5cbi8vIFx0XHRcdDwvRm9ybT5cbi8vIFx0XHRcdDwvZGl2PlxuLy8gXHRcdCk7XG4vLyBcdH1cbi8vIH1cblxuXG4vKlx0XHRcdDxEb2N0eXBlRm9ybVxuXHRcdFx0XHRjbG9zZT17dGhpcy5jbG9zZX1cblx0XHRcdFx0aXRlbUNoYW5nZT17dGhpcy5vbkNoYW5nZX1cblx0XHRcdFx0Y3JlYXRlPXt0aGlzLmNyZWF0ZX1cblx0XHRcdFx0ZWRpdD17dGhpcy51cGRhdGV9XG5cdFx0XHRcdGRlbGV0ZT17dGhpcy5kZWxldGV9XG5cdFx0XHRcdG1vZGU9e3RoaXMuc3RhdGUuZm9ybU1vZGV9XG5cdFx0XHRcdGl0ZW09e2l0ZW19XG5cdFx0XHRcdGlkPXt0aGlzLnByb3BzLndvcmtvcmRlcn1cblxuXHRcdFx0XHRkb2N0eXBlPVwiU3ByYXlpbmdcIlxuXHRcdFx0XHRzZWFzb249eyB7YWN0aXZlOjF9fVxuXHRcdFx0XHRub3RlPXsge1xuXHRcdFx0XHRcdGFjdGl2ZToxLFxuXHRcdFx0XHRcdHR5cGU6XCJ0ZXh0YXJlYVwiXG5cdFx0XHRcdH19XG5cdFx0XHRcdHNwcmF5X3R5cGU9eyB7YWN0aXZlOjF9fVxuXHRcdFx0Lz4gXHQqL1xuXG5cblxuXG5cbi8vIGNvbnN0IGFwcDI9ICQoJyNhcHAyJylbMF07XG4vLyAoZnVuY3Rpb24oKXtcbi8vIFx0dmFyIGZpbHRlcj17fTtcbi8vIFx0ZnJhcHBlLnJlYWR5KGZ1bmN0aW9uKCl7XG4vLyBcdFx0UmVhY3RET00ucmVuZGVyKFxuLy8gXHRcdFx0PGRpdj48RG9jdHlwZUZvcm1cbi8vIFx0XHRcdFx0aWQ9XCJjcmVhdGVQcnVuRW50cnlcIlxuLy8gXHRcdFx0XHRkb2N0eXBlPVwiUHJ1bmluZ1wiXG4vLyBcdFx0XHRcdHNlYXNvbj17ICB7YWN0aXZlOjF9ICB9XG4vLyBcdFx0XHRcdG5vdGU9eyB7XG4vLyBcdFx0XHRcdFx0YWN0aXZlOjEsXG4vLyBcdFx0XHRcdFx0dHlwZTpcInRleHRhcmVhXCJcbi8vIFx0XHRcdFx0fX1cbi8vIFx0XHRcdFx0dHlwZT17IHthY3RpdmU6MX0gfVxuLy8gXHRcdFx0XHRiX2xvY2s9eyB7YWN0aXZlOjF9fVxuLy8gXHRcdFx0XHRyZW1vdmVkPXsge2FjdGl2ZToxfX1cbi8vIFx0XHRcdFx0cHJlX3BydW5lPXsge2FjdGl2ZToxfX1cbi8vIFx0XHRcdFx0dGFwX3JlbW92ZWQ9eyB7YWN0aXZlOjF9fVxuLy8gXHRcdFx0Lz4gPENyZWF0ZVdvcmtvcmRlciAvPjwvZGl2Plx0LCBhcHAyICk7XG4vLyBcdH0pXG5cbi8vIH0pKCk7XG5cbi8vIGNvbnN0IGFwcDI9ICQoJyNhcHAyJylbMF07XG4vLyAoZnVuY3Rpb24oKXtcbi8vIFx0dmFyIGZpbHRlcj17fTtcbi8vIFx0ZnJhcHBlLnJlYWR5KGZ1bmN0aW9uKCl7XG4vLyBcdFx0UmVhY3RET00ucmVuZGVyKCA8U3ByYXlUYWJsZSBmaWx0ZXI9e2ZpbHRlcn0gLz4gLCBhcHAyICk7XG4vLyBcdH0pXG5cbi8vIH0pKCk7XG4iXX0=
