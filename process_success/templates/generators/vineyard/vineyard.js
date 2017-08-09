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
		value: function componentWillUpdate(nextProps, nextState) {
			if (this.props.doctype != nextProps.doctype) {
				this.doctypeTool = new ps.apiTool({ name: nextProps.doctype }, { doctype: 'DocType' }, this.doctypeToolUpdate, this.forceUpdate);
			}
		}
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
					// if(copy[item.fieldname]!=""){
					// 	copy[item.fieldname]=options[0];
					// 	this.props.itemChange(copy);
					// }
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
						return {
							field: "input",
							onChange: function (e) {
								copy[item.fieldname] = e.target.value;
								this.props.itemChange(copy);
							}.bind(this),
							value: copy[item.fieldname],
							lable: item.label
						};
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
			console.log(fieldsJson);

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
							//console.log(currentField.fieldname);
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

var _docTable = require('../../../public/js/modules/utils/docTable');

var _docTable2 = _interopRequireDefault(_docTable);

var _acordianContent = require('../../../public/js/modules/utils/acordianContent');

var _acordianContent2 = _interopRequireDefault(_acordianContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = $('#app')[0];

(function () {
	var filter = {};
	frappe.ready(function () {
		var workorderConfig = [{
			lable: "Vineyard",
			value: "location",
			href: "location_route",
			inTable: false,
			active: 0,
			default: currentVineyard
		}, {
			lable: "Status",
			value: "status"
		}, {
			lable: "Priority",
			value: "priority",
			active: 1
		}, {
			lable: "Season",
			value: "season",
			active: 1
		}, {
			lable: "Date",
			value: "date",
			active: 1
		}];
		var issueConfig = [{
			lable: "Vineyard",
			value: "vineyard",
			href: "vineyard_route",
			inTable: false,
			active: 0,
			default: currentVineyard
		}, {
			lable: "Status",
			value: "status",
			active: 1
		}, {
			lable: "Priority",
			value: "priority",
			active: 1
		}, {
			lable: "Work Order",
			value: "work_order",
			active: 1
		}, {
			lable: "Issue",
			value: "issue",
			active: 1,
			type: "textarea"
		}];
		var sprayConfig = [{
			lable: "Vineyard",
			value: "vineyard",
			href: "vineyard_route",
			inTable: false,
			active: 0,
			default: currentVineyard
		}, {
			lable: "Work Order",
			value: "work_order",
			active: 1
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
		}];
		//done
		var prunningConfig = [{
			lable: "Vineyard",
			value: "vineyard",
			href: "vineyard_route",
			inTable: false,
			active: 0,
			default: currentVineyard
		}, {
			lable: "Work Order",
			value: "work_order",
			active: 1
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
			lable: "Date",
			value: "date",
			active: 1
		}, {
			lable: "Style",
			value: "type",
			active: 1
		}, {
			lable: "B-Lock",
			value: "b_lock",
			active: 1
		}, {
			lable: "Pruning Removed",
			value: "removed",
			active: 1
		}, {
			lable: "Pre Prune",
			value: "pre_prune",
			active: 1
		}, {
			lable: "Tap Removed",
			value: "tap_removed",
			active: 1
		}];
		var harvestConfig = [{
			lable: "Vineyard",
			value: "vineyard",
			href: "vineyard_route",
			inTable: false,
			active: 0,
			default: currentVineyard
		}, {
			lable: "Work Order",
			value: "work_order",
			active: 1
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
			lable: "Pounds",
			value: "pounds",
			active: 1
		}, {
			lable: "Post Harvest Water",
			value: "post_harvest_water",
			active: 1
		}];
		var birdNetsConfig = [{
			lable: "Vineyard",
			value: "vineyard",
			href: "vineyard_route",
			inTable: false,
			active: 0,
			default: currentVineyard
		}, {
			lable: "Work Order",
			value: "work_order",
			active: 1
		}, {
			lable: "Season",
			value: "season",
			active: 1
		}, {
			lable: "Note",
			value: "note",
			active: 1,
			type: "textarea"
		}];
		var wateringConfig = [{
			lable: "Vineyard",
			value: "vineyard",
			href: "vineyard_route",
			inTable: false,
			active: 0,
			default: currentVineyard
		}, {
			lable: "Work Order",
			value: "work_order",
			active: 1
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
			lable: "Duration",
			value: "duration",
			active: 1
		}];
		var canopyConfig = [{
			lable: "Vineyard",
			value: "vineyard",
			href: "vineyard_route",
			inTable: false,
			active: 0,
			default: currentVineyard
		}, {
			lable: "Work Order",
			value: "work_order",
			active: 1
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
			lable: "Type",
			value: "type",
			active: 1
		}];
		var brixConfig = [{
			lable: "Vineyard",
			value: "vineyard",
			href: currentVineyard,
			inTable: false,
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
			lable: "Brix A",
			value: "brix_a",
			active: 1
		}, {
			lable: "Brix B",
			value: "brix_b",
			active: 1
		}];
		ReactDOM.render(React.createElement(
			'div',
			null,
			React.createElement(
				_acordianContent2.default,
				{
					title: 'Workorder Table',
					active: false,
					parentId: 'work_order',
					id: 'WorkorderAcordian' },
				React.createElement(_docTable2.default, {
					search: false,
					doctype: 'work_order',
					id: 'WorkorderTable',
					filter: { location: currentVineyard },
					config: workorderConfig,
					editable: 1
				})
			),
			React.createElement(
				_acordianContent2.default,
				{
					title: 'Issue Table',
					active: false,
					parentId: 'Issue',
					id: 'IssueAcordian' },
				React.createElement(_docTable2.default, {
					search: false,
					doctype: 'Issue',
					id: 'IssueTable',
					filter: { vineyard: currentVineyard },
					config: issueConfig,
					editable: 1
				})
			),
			React.createElement(
				_acordianContent2.default,
				{
					className: 'tablePanel',
					title: 'Spraying Table',
					active: false,
					parentId: 'Spraying',
					id: 'Spraying' },
				React.createElement(_docTable2.default, {
					search: false,
					doctype: 'Spraying',
					id: 'doctable',
					filter: { vineyard: currentVineyard },
					config: sprayConfig,
					editable: 1
				})
			),
			React.createElement(
				_acordianContent2.default,
				{
					className: 'tablePanel',
					title: 'Pruning Table',
					active: false,
					parentId: 'pruning',
					id: 'pruning' },
				React.createElement(_docTable2.default, {
					search: false,
					doctype: 'Pruning',
					id: 'PruningTable',
					filter: { vineyard: currentVineyard },
					config: prunningConfig,
					editable: 1
				})
			),
			React.createElement(
				_acordianContent2.default,
				{
					className: 'tablePanel',
					title: 'Harvest Table',
					active: false,
					parentId: 'harvest',
					id: 'harvestAcordian' },
				React.createElement(_docTable2.default, {
					search: false,
					doctype: 'Harvest',
					id: 'HarvestTable',
					filter: { vineyard: currentVineyard },
					config: harvestConfig,
					editable: 1
				})
			),
			React.createElement(
				_acordianContent2.default,
				{
					className: 'tablePanel',
					title: 'Bird Nets Table',
					active: false,
					parentId: 'birdnets',
					id: 'birdNetsAcordian' },
				React.createElement(_docTable2.default, {
					search: false,
					doctype: 'Bird Nets',
					id: 'birdNetsTable',
					filter: { vineyard: currentVineyard },
					config: birdNetsConfig,
					editable: 1
				})
			),
			React.createElement(
				_acordianContent2.default,
				{
					className: 'tablePanel',
					title: 'Watering Table',
					active: false,
					parentId: 'watering',
					id: 'wateringAcordian' },
				React.createElement(_docTable2.default, {
					search: false,
					doctype: 'Watering',
					id: 'WateringTable',
					filter: { vineyard: currentVineyard },
					config: wateringConfig,
					editable: 1
				})
			),
			React.createElement(
				_acordianContent2.default,
				{
					className: 'tablePanel',
					title: 'Canopy Table',
					active: false,
					parentId: 'canopy',
					id: 'canopyAcordian' },
				React.createElement(_docTable2.default, {
					search: false,
					doctype: 'Canopy',
					id: 'canopyTable',
					filter: { vineyard: currentVineyard },
					config: canopyConfig,
					editable: 1
				})
			),
			React.createElement(
				_acordianContent2.default,
				{
					className: 'tablePanel',
					title: 'Brix Table',
					active: false,
					parentId: 'brix',
					id: 'brixAcordian' },
				React.createElement(_docTable2.default, {
					search: false,
					doctype: 'Brix',
					id: 'brixTable',
					filter: {},
					config: brixConfig,
					editable: 1
				})
			)
		), app);
		//$('.tablePanel').collapse('hide');
	});
})();

//$('.tablePanel').collapse('hide');

},{"../../../public/js/modules/utils/acordianContent":1,"../../../public/js/modules/utils/docTable":2}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdXRpbHMvYWNvcmRpYW5Db250ZW50LmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9kb2NUYWJsZS5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdXRpbHMvZG9jdHlwZUZvcm0uanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL3V0aWxzL2Zvcm1zLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9tb2RhbC5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdXRpbHMvdGFibGUuanN4IiwicHJvY2Vzc19zdWNjZXNzL3RlbXBsYXRlcy9nZW5lcmF0b3JzL3ZpbmV5YXJkL3ZpbmV5YXJkLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0lDQXFCLGU7OztBQUNwQiwwQkFBWSxLQUFaLEVBQWtCO0FBQUE7O0FBQUEsZ0lBQ1gsS0FEVzs7QUFFakIsUUFBSyxVQUFMLEdBQWtCLE1BQUssVUFBTCxDQUFnQixJQUFoQixPQUFsQjtBQUNBLFVBQVEsR0FBUixDQUFZLE1BQUssS0FBTCxDQUFXLFNBQXZCO0FBSGlCO0FBSWpCOzs7OzZCQUNVLEUsRUFBRzs7QUFFYixVQUNDO0FBQUE7QUFBQSxNQUFLLFdBQVUsZUFBZjtBQUNDLFdBQUssS0FETjtBQUVDLGNBQ0MsWUFBVTtBQUNULGNBQVEsR0FBUixDQUFZLEtBQUssS0FBTCxDQUFXLFNBQXZCO0FBQ0EsY0FBUSxHQUFSLENBQVksS0FBSyxLQUFMLENBQVcsU0FBWCxJQUFzQixLQUFsQztBQUNBLFVBQUcsS0FBSyxLQUFMLENBQVcsU0FBWCxJQUFzQixLQUF6QixF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QUFNLGdCQUZQO0FBR0MsYUFBUSxLQUhUO0FBSUMsZUFBUyxVQUpWO0FBS0MsU0FBRyxrQkFMSjtBQU1DO0FBQ0MsYUFBUSxLQURUO0FBRUMsY0FBUSxVQUZUO0FBR0MsU0FBRyxlQUhKO0FBSUMsYUFBUyxFQUFDLFVBQVMsZUFBVixFQUpWO0FBS0MsYUFBUSxjQUxUO0FBTUMsZUFBVTtBQU5YO0FBTkQsSUF6RmdCO0FBd0doQjtBQUFBO0FBQUE7QUFDQyxnQkFBVSxZQURYO0FBRUMsWUFBTSxjQUZQO0FBR0MsYUFBUSxLQUhUO0FBSUMsZUFBUyxRQUpWO0FBS0MsU0FBRyxnQkFMSjtBQU1DO0FBQ0MsYUFBUSxLQURUO0FBRUMsY0FBUSxRQUZUO0FBR0MsU0FBRyxhQUhKO0FBSUMsYUFBUyxFQUFDLFVBQVMsZUFBVixFQUpWO0FBS0MsYUFBUSxZQUxUO0FBTUMsZUFBVTtBQU5YO0FBTkQsSUF4R2dCO0FBdUhoQjtBQUFBO0FBQUE7QUFDQyxnQkFBVSxZQURYO0FBRUMsWUFBTSxZQUZQO0FBR0MsYUFBUSxLQUhUO0FBSUMsZUFBUyxNQUpWO0FBS0MsU0FBRyxjQUxKO0FBTUM7QUFDQyxhQUFRLEtBRFQ7QUFFQyxjQUFRLE1BRlQ7QUFHQyxTQUFHLFdBSEo7QUFJQyxhQUFTLEVBSlY7QUFLQyxhQUFRLFVBTFQ7QUFNQyxlQUFVO0FBTlg7QUFORDtBQXZIZ0IsR0FBakIsRUF3SUUsR0F4SUY7QUF5SUE7QUFDQSxFQTFiRDtBQTRiQSxDQTliRDs7QUFnY0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWNvcmRpYW5Db250ZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMucmVuZGVySGVhZCA9IHRoaXMucmVuZGVySGVhZC5iaW5kKHRoaXMpO1xuXHRcdGNvbnNvbGUubG9nKHRoaXMucHJvcHMudG9nZ2xlQWxsKTtcblx0fVxuXHRyZW5kZXJIZWFkKGlkKXtcblxuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtaGVhZGluZ1wiIFxuXHRcdFx0XHRyb2xlPVwidGFiXCIgXG5cdFx0XHRcdG9uQ2xpY2s9e1xuXHRcdFx0XHRcdGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLnByb3BzLnRvZ2dsZUFsbCk7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLnByb3BzLnRvZ2dsZUFsbD09ZmFsc2UpO1xuXHRcdFx0XHRcdFx0aWYodGhpcy5wcm9wcy50b2dnbGVBbGw9PWZhbHNlKXtcblx0XHRcdFx0XHRcdFx0JCgnIycraWQpLmNvbGxhcHNlKCd0b2dnbGUnKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhpZCk7XG5cdFx0XHRcdFx0XHRcdCQoJyMnK3RoaXMucHJvcHMucGFyZW50SWQrJyAuYWNvcmRpYW4tY29udGVudC5pbicpLm5vdCgnIycraWQpLmNvbGxhcHNlKCdoaWRlJyk7XG5cdFx0XHRcdFx0XHRcdCQoJyMnK2lkKS5jb2xsYXBzZSgndG9nZ2xlJyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpXG5cdFx0XHRcdH1cblx0XHRcdFx0PlxuXHRcdFx0XHQ8aDQgY2xhc3NOYW1lPVwicGFuZWwtdGl0bGVcIj5cblx0XHRcdFx0XHQ8YSByb2xlPVwiYnV0dG9uXCIgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiIGRhdGEtcGFyZW50PXsnIycrdGhpcy5wcm9wcy5wYXJlbnRJZH0gYXJpYS1leHBhbmRlZD17KHRoaXMucHJvcHMuYWN0aXZlKT8gdHJ1ZTpmYWxzZX0gID5cblx0XHRcdCAgXHRcdFx0e3RoaXMucHJvcHMudGl0bGV9XG5cdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHQ8L2g0PlxuXHRcdFx0XHR7dGhpcy5wcm9wcy5leHRyYUhlYWR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHZhciBpZCA9dGhpcy5wcm9wcy5pZDtcblx0XHR2YXIgY2xhc3NOYW1lPSh0aGlzLnByb3BzLmFjdGl2ZSk/IFwiYWNvcmRpYW4tY29udGVudCBwYW5lbC1jb2xsYXBzZSBjb2xsYXBzZSBpblwiOlwiYWNvcmRpYW4tY29udGVudCBwYW5lbC1jb2xsYXBzZSBjb2xsYXBzZVwiO1xuXHRcdGlmKHRoaXMucHJvcHMuY2xhc3NOYW1lKXtcblx0XHRcdGNsYXNzTmFtZT1jbGFzc05hbWUrXCIgXCIrdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0fVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsIHBhbmVsLWRlZmF1bHQgYWNvcmRpYW4tcGFuZWxcIj5cblx0XHRcdFx0e3RoaXMucmVuZGVySGVhZChpZCl9XG5cdFx0XHRcdDxkaXYgaWQ9e2lkfSBcblx0XHRcdFx0XHRjbGFzc05hbWU9e2NsYXNzTmFtZX0gXG5cdFx0XHRcdFx0cm9sZT1cInRhYnBhbmVsXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYW5lbC1ib2R5XCI+XG5cdFx0XHRcdFx0XHR7IHRoaXMucHJvcHMuY2hpbGRyZW4gfVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuICBcdFx0KTtcblx0fVxufVxuIiwiaW1wb3J0IERvY3R5cGVGb3JtIGZyb20gJy4uL3V0aWxzL2RvY3R5cGVGb3JtJ1xuaW1wb3J0IFRhYmxlIGZyb20gJy4uL3V0aWxzL3RhYmxlJ1xuaW1wb3J0IE1vZGFsIGZyb20gJy4uL3V0aWxzL21vZGFsJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2NUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnJldHVybkNvbHVtbnM9dGhpcy5yZXR1cm5Db2x1bW5zLmJpbmQodGhpcyk7XG5cdFx0dGhpcy50YWJsZUNoYW5nZT10aGlzLnRhYmxlQ2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5yZXR1cm5Db250ZW50PXRoaXMucmV0dXJuQ29udGVudC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZWRpdGFibGVDb250ZW50PXRoaXMuZWRpdGFibGVDb250ZW50LmJpbmQodGhpcyk7XG5cdFx0Y29uc29sZS5sb2codGhpcy5wcm9wcy5maWx0ZXIpO1xuXHRcdHRoaXMudGFibGVUb29sID0gbmV3IHBzLmFwaVRvb2wodGhpcy5wcm9wcy5maWx0ZXIse2RvY3R5cGU6dGhpcy5wcm9wcy5kb2N0eXBlfSx0aGlzLnRhYmxlQ2hhbmdlKTtcblx0XHR0aGlzLnN0YXRlPXtcblx0XHRcdGl0ZW1zOnRoaXMudGFibGVUb29sLml0ZW1zLFxuXHRcdFx0Y3VycmVudEl0ZW06e30sXG5cdFx0XHRmb3JtTW9kZTpcImNyZWF0ZVwiXG5cblx0XHR9O1xuXHRcdHRoaXMubW9kYWxJRD10aGlzLnByb3BzLmlkK1wiX2Zvcm1fbW9kYWxcIjtcblx0fVxuICBcdHRhYmxlQ2hhbmdlKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7aXRlbXM6dGhpcy50YWJsZVRvb2wuaXRlbXN9KTtcblx0fVxuXHRyZXR1cm5Db2x1bW5zKCl7XG5cdFx0dmFyIGNvbHVtbnMgPVtdO1xuXHRcdGZvcih2YXIgeD0wOyB4IDwgdGhpcy5wcm9wcy5jb25maWcubGVuZ3RoOyB4Kyspe1xuXHRcdFx0dmFyIGl0ZW09dGhpcy5wcm9wcy5jb25maWdbeF07XG5cdFx0XHRpZihpdGVtLmluVGFibGUhPT1mYWxzZSl7XG5cdFx0XHRcdGNvbHVtbnMucHVzaCh7dGl0bGU6aXRlbS5sYWJsZX0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZih0aGlzLnByb3BzLmVkaXRhYmxlKXtcblx0XHRcdGNvbHVtbnMucHVzaCh7dGl0bGU6XCJFZGl0XCJ9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gY29sdW1ucztcblx0fVxuXHRyZXR1cm5Db250ZW50KCl7XG5cdFx0dmFyIGNvbnRlbnQ9W107XG5cdFx0aWYodGhpcy5zdGF0ZS5pdGVtcyE9PW51bGwpe1xuXHRcdFx0dGhpcy5zdGF0ZS5pdGVtcy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXHRcdFx0XHRjb25zb2xlLmxvZyhpdGVtKTtcblx0XHRcdFx0dmFyIHRkY29udGVudD1bXTtcblx0XHRcdFx0Zm9yKHZhciB4PTA7IHggPCB0aGlzLnByb3BzLmNvbmZpZy5sZW5ndGg7IHgrKyl7XG5cdFx0XHRcdFx0dmFyIGNvbmZpZz10aGlzLnByb3BzLmNvbmZpZ1t4XTtcblx0XHRcdFx0XHRpZihjb25maWcuaW5UYWJsZSE9PWZhbHNlKXtcblx0XHRcdFx0XHRcdGlmKGNvbmZpZy5ocmVmKXtcblx0XHRcdFx0XHRcdFx0dGRjb250ZW50LnB1c2goPHRkIGtleT17dGhpcy5wcm9wcy5pZCArIGluZGV4ICsgXCJfXCIgKyB4fSA+PGEgaHJlZj17aXRlbVtjb25maWcuaHJlZl19ID57aXRlbVtjb25maWcudmFsdWVdfTwvYT48L3RkPilcblx0XHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0XHRpZihpdGVtW2NvbmZpZy52YWx1ZV09PT10cnVlKXtcblx0XHRcdFx0XHRcdFx0XHR0ZGNvbnRlbnQucHVzaCg8dGQ+MTwvdGQ+KVxuXHRcdFx0XHRcdFx0XHR9ZWxzZSBpZiAoaXRlbVtjb25maWcudmFsdWVdPT09ZmFsc2Upe1xuXHRcdFx0XHRcdFx0XHRcdHRkY29udGVudC5wdXNoKDx0ZD4wPC90ZD4pXG5cdFx0XHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0XHRcdHRkY29udGVudC5wdXNoKDx0ZD57aXRlbVtjb25maWcudmFsdWVdfTwvdGQ+KVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKHRoaXMucHJvcHMuZWRpdGFibGUpe1xuXHRcdFx0XHRcdHRkY29udGVudC5wdXNoKFxuXHRcdFx0XHRcdFx0PHRkIGtleT17dGhpcy5wcm9wcy5pZCArIGluZGV4ICsgXCJfXCIgKyB4fSA+XG5cdFx0XHRcdFx0XHRcdDxidXR0b24gXG5cdFx0XHRcdFx0XHRcdFx0dHlwZT1cImJ1dHRvblwiIFxuXHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdCBpbmxpbmUtdGFza1wiXG5cdFx0XHRcdFx0XHRcdFx0b25DbGljaz17XG5cdFx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbigpe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRmb3JtTW9kZTpcImVkaXRcIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjdXJyZW50SXRlbTppdGVtXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkKFwiI1wiK3RoaXMubW9kYWxJRCkubW9kYWwoKTtcblx0XHRcdFx0XHRcdFx0XHRcdH0uYmluZCh0aGlzKVxuXHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0RWRpdCA8c3BhbiBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLWVkaXRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XG5cdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXG5cdFx0XHRcdFx0XHQ8L3RkPlxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29udGVudC5wdXNoKChcblx0XHRcdFx0XHQ8dHIga2V5PXt0aGlzLnByb3BzLmlkICsgaW5kZXh9PlxuXHRcdFx0XHRcdFx0e3RkY29udGVudH1cblx0XHRcdFx0XHQ8L3RyPlxuXHRcdFx0XHQpKTtcdFxuXHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHR9XG5cdFx0cmV0dXJuICg8dGJvZHk+e2NvbnRlbnR9PC90Ym9keT4pO1xuXHR9XG5cdGVkaXRhYmxlQ29udGVudCgpe1xuXHRcdHZhciBmb3JtUHJvcHM9e307XG5cdFx0Zm9ybVByb3BzLmRvY3R5cGU9dGhpcy5wcm9wcy5kb2N0eXBlO1xuXHRcdGZvcih2YXIgeD0wOyB4IDwgdGhpcy5wcm9wcy5jb25maWcubGVuZ3RoOyB4Kyspe1xuXHRcdFx0dmFyIGNvbmZpZz10aGlzLnByb3BzLmNvbmZpZ1t4XTtcblx0XHRcdGZvcm1Qcm9wc1tjb25maWcudmFsdWVdPWNvbmZpZztcblx0XHR9XG5cdFx0dmFyIGZvcm09KFxuXG5cdFx0XHRcdDxEb2N0eXBlRm9ybSBcblx0XHRcdFx0XHRjbG9zZT17ZnVuY3Rpb24oKXskKFwiI1wiK3RoaXMubW9kYWxJRCkubW9kYWwoJ2hpZGUnKTt9LmJpbmQodGhpcyl9XG5cdFx0XHRcdFx0aXRlbUNoYW5nZT17XG5cdFx0XHRcdFx0XHRmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7Y3VycmVudEl0ZW06aXRlbX0pfS5iaW5kKHRoaXMpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y3JlYXRlPXtcblx0XHRcdFx0XHRcdGZ1bmN0aW9uKGl0ZW0sZG9jdHlwZSl7XG5cdFx0XHRcdFx0XHRcdGZvcih2YXIgeD0wOyB4IDwgdGhpcy5wcm9wcy5jb25maWcubGVuZ3RoOyB4Kyspe1xuXHRcdFx0XHRcdFx0XHRcdHZhciBjb25maWc9dGhpcy5wcm9wcy5jb25maWdbeF07XG5cdFx0XHRcdFx0XHRcdFx0aWYoY29uZmlnLmRlZmF1bHQpe1xuXHRcdFx0XHRcdFx0XHRcdFx0aXRlbVtjb25maWcudmFsdWVdID0gY29uZmlnLmRlZmF1bHQ7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGl0ZW0uZG9jdHlwZT1kb2N0eXBlO1xuXHRcdFx0XHRcdFx0XHR0aGlzLnRhYmxlVG9vbC5jcmVhdGUoaXRlbSk7XG5cdFx0XHRcdFx0XHRcdCQoJyMnK3RoaXMubW9kYWxJRCkubW9kYWwoJ3RvZ2dsZScpO1xuXHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVkaXQ9e2Z1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0XHRcdFx0dGhpcy50YWJsZVRvb2wudXBkYXRlKGl0ZW0pO1xuXHRcdFx0XHRcdFx0JCgnIycrdGhpcy5tb2RhbElEKS5tb2RhbCgndG9nZ2xlJyk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpfVxuXHRcdFx0XHRcdGRlbGV0ZT17ZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdFx0XHQgIHRoaXMudGFibGVUb29sLmRlbGV0ZShpdGVtKTtcblx0XHRcdFx0XHRcdCQoJyMnK3RoaXMubW9kYWxJRCkubW9kYWwoJ3RvZ2dsZScpO1xuXHRcdFx0XHRcdH0uYmluZCh0aGlzKX1cblx0XHRcdFx0XHRtb2RlPXt0aGlzLnN0YXRlLmZvcm1Nb2RlfVxuXHRcdFx0XHRcdGl0ZW09e3RoaXMuc3RhdGUuY3VycmVudEl0ZW19XG5cdFx0XHRcdFx0aWQ9XCJ0aGluZ1wiXG5cdFx0XHRcdC8+XG5cdFx0KTtcblx0XHRcblx0XHQvL2xvb3AgdGhlIGNvbmZpZyB0byBjcmVhdGUgZm9ybSBpdGVtc1xuXG5cdFx0Zm9ybT1SZWFjdC5jbG9uZUVsZW1lbnQoZm9ybSAsZm9ybVByb3BzKTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PGJ1dHRvbiBcblx0XHRcdFx0XHR0eXBlPVwiYnV0dG9uXCIgXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgXG5cdFx0XHRcdFx0b25DbGljaz17ZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdFx0XHRmb3JtTW9kZTpcImNyZWF0ZVwiLFxuXHRcdFx0XHRcdFx0XHRjdXJyZW50SXRlbTp7fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHQkKFwiI1wiK3RoaXMubW9kYWxJRCkubW9kYWwoKTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcyl9XG5cdFx0XHRcdFx0PlxuXHRcdFx0XHRcdENyZWF0ZSB7dGhpcy5wcm9wcy5kb2N0eXBlfSA8c3BhbiBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLXBsdXNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XG5cdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHQ8TW9kYWwgXG5cdFx0XHRcdFx0aWQ9e3RoaXMubW9kYWxJRH1cblx0XHRcdFx0XHRzdWJtaXRUZXh0PVwiU3VibWl0XCIgXG5cdFx0XHRcdFx0dGl0bGU9e1wiQ3JlYXRlIFwiICsgdGhpcy5wcm9wcy5kb2N0eXBlfVxuXHRcdFx0XHRcdHN1Ym1pdD17ZmFsc2V9XG5cdFx0XHRcdFx0PlxuXHRcdFx0XHRcdHtmb3JtfVxuXHRcdFx0XHQ8L01vZGFsPlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQpO1xuXHR9XG5cdHNvbWVGdW5jdGlvbigpe1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHZhciBmb3JtPVwiXCI7XG5cdFx0aWYodGhpcy5wcm9wcy5lZGl0YWJsZSl7XG5cdFx0XHRmb3JtPXRoaXMuZWRpdGFibGVDb250ZW50KCk7XG5cdFx0fVxuXHRcdHZhciBjb2x1bW5zPXRoaXMucmV0dXJuQ29sdW1ucygpO1xuXHRcdHZhciBjb250ZW50PXRoaXMucmV0dXJuQ29udGVudCgpO1xuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxUYWJsZSBcblx0XHRcdFx0XHRpZD17dGhpcy5wcm9wcy5pZH1cblx0XHRcdFx0XHR0aXRsZT1cIlNwcmF5IFRhYmxlXCJcblx0XHRcdFx0XHRjb250ZW50PXtjb250ZW50fVxuXHRcdFx0XHRcdGNvbHVtbnM9e2NvbHVtbnN9XG5cdFx0XHRcdC8+XG5cdFx0XHRcdHtmb3JtfVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSIsImltcG9ydCBGb3JtIGZyb20gJy4uL3V0aWxzL2Zvcm1zJ1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3R5cGVGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuY29tcG9uZW50V2lsbFVwZGF0ZT10aGlzLmNvbXBvbmVudFdpbGxVcGRhdGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmRvY3R5cGVUb29sVXBkYXRlPXRoaXMuZG9jdHlwZVRvb2xVcGRhdGUuYmluZCh0aGlzKTtcblxuXHRcdHRoaXMuc3VibWl0PXRoaXMuc3VibWl0LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5zYXZlPXRoaXMuc2F2ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZGVsZXRlPXRoaXMuZGVsZXRlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5kb2N0eXBlVG9vbCA9IG5ldyBwcy5hcGlUb29sKHtuYW1lOnRoaXMucHJvcHMuZG9jdHlwZX0se2RvY3R5cGU6J0RvY1R5cGUnfSx0aGlzLmRvY3R5cGVUb29sVXBkYXRlLHRoaXMuZm9yY2VVcGRhdGUpO1xuXHRcdHRoaXMuc3RhdGU9e2l0ZW1zOnRoaXMuZG9jdHlwZVRvb2wuaXRlbXN9O1xuXHRcdC8vdGhpcy5kb2N0eXBlVG9vbCA9IG5ldyBwcy5hcGlUb29sKHtuYW1lOnRoaXMucHJvcHMuZG9jdHlwZX0se2RvY3R5cGU6J0RvY1R5cGUnfSx0aGlzLmRvY3R5cGVUb29sVXBkYXRlKTtcblx0fVxuXHRjb21wb25lbnRXaWxsVXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKXtcblx0XHRpZih0aGlzLnByb3BzLmRvY3R5cGUgIT0gbmV4dFByb3BzLmRvY3R5cGUpe1xuXHRcdFx0dGhpcy5kb2N0eXBlVG9vbCA9IG5ldyBwcy5hcGlUb29sKHtuYW1lOm5leHRQcm9wcy5kb2N0eXBlfSx7ZG9jdHlwZTonRG9jVHlwZSd9LHRoaXMuZG9jdHlwZVRvb2xVcGRhdGUsdGhpcy5mb3JjZVVwZGF0ZSk7XG5cdFx0fVxuXHR9XG5cdGRvY3R5cGVUb29sVXBkYXRlKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7aXRlbXM6dGhpcy5kb2N0eXBlVG9vbC5pdGVtc30pXG5cdH1cblx0c3VibWl0KGUpe1xuXHRcdC8vRk9STSBWQUxJREFUSU9OIFxuXHRcdC8vaWYodGhpcy5wcm9wcy5pdGVtLnZpbmV5YXJkPT1cIlwiIHx8dGhpcy5wcm9wcy5pdGVtLnNwcmF5X3R5cGU9PVwiXCIgfHwgKG1vbWVudCh0aGlzLnByb3BzLml0ZW0uZGF0ZSxcIk1NL0REL1lZWVlcIikuaXNWYWxpZCgpKSE9PXRydWUpe1xuXHRcdC8vXHRjb25zb2xlLmxvZyhcIm5vdCB2YWxpZFwiKTtcblx0XHQvL31lbHNle1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dGhpcy5wcm9wcy5jcmVhdGUodGhpcy5wcm9wcy5pdGVtLHRoaXMucHJvcHMuZG9jdHlwZSk7XG5cdFx0Ly99XG5cdH1cblx0c2F2ZShlKXtcblx0XHQvLyBpZih0aGlzLnByb3BzLml0ZW0udmluZXlhcmQ9PVwiXCIgfHx0aGlzLnByb3BzLml0ZW0uc3ByYXlfdHlwZT09XCJcIiB8fCAobW9tZW50KHRoaXMucHJvcHMuaXRlbS5kYXRlLFwiTU0vREQvWVlZWVwiKS5pc1ZhbGlkKCkpIT09dHJ1ZSl7XG5cdFx0Ly8gXHRjb25zb2xlLmxvZyhcIm5vdCB2YWxpZFwiKTtcblx0XHQvLyB9ZWxzZXtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRoaXMucHJvcHMuZWRpdCh0aGlzLnByb3BzLml0ZW0pO1xuXHRcdC8vIH1cblx0fVxuXHRkZWxldGUoZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMucHJvcHMuZGVsZXRlKHRoaXMucHJvcHMuaXRlbSk7XG5cdH1cblx0Y3JlYXRlRm9ybUpzb24oKXtcblx0XHR2YXIgY3JlYXRlSGlkZGVuPSh0aGlzLnByb3BzLm1vZGUhPVwiY3JlYXRlXCIpP1wiIGhpZGRlblwiOlwiIG5vcGVcIjtcblx0XHR2YXIgZWRpdEhpZGRlbj0odGhpcy5wcm9wcy5tb2RlIT1cImVkaXRcIik/XCIgaGlkZGVuXCI6XCIgbm9wZVwiO1xuXHRcdHZhciBmaWVsZHNKc29uPXRoaXMuc3RhdGUuaXRlbXNbMF0uZmllbGRzO1xuXHRcdHZhciBmaWVsZHM9W107XG5cdFx0dmFyIGZpZWxkT2JqZWN0PXtcblx0XHRcdExpbms6IGZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGZpZWxkOlwiYXV0b0NvbXBsZXRlXCIsXG5cdFx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdFx0Y29weVtpdGVtLmZpZWxkbmFtZV09ZS50YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRcdGxhYmxlOml0ZW0ubGFiZWwsXG5cdFx0XHRcdFx0dmFsdWU6Y29weVtpdGVtLmZpZWxkbmFtZV0sXG5cdFx0XHRcdFx0ZG9jdHlwZTppdGVtLm9wdGlvbnMsXG5cdFx0XHRcdFx0ZG9jdmFsdWU6XCJuYW1lXCJcblx0XHRcdFx0fVxuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0Q2hlY2s6IGZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGZpZWxkOlwiY2hlY2tcIixcblx0XHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0XHRjb3B5W2l0ZW0uZmllbGRuYW1lXT1lLnRhcmdldC5jaGVja2VkO1xuXHRcdFx0XHRcdFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0XHRsYWJsZTppdGVtLmxhYmVsLFxuXHRcdFx0XHRcdHZhbHVlOmNvcHlbaXRlbS5maWVsZG5hbWVdLFxuXHRcdFx0XHRcdGNsYXNzTmFtZTogXCJiaWctY2hlY2tib3hcIlxuXHRcdFx0XHR9XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRJbnQ6IGZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGZpZWxkOlwiaW5wdXRcIixcblx0XHRcdFx0XHR0eXBlOlwibnVtYmVyXCIsXG5cdFx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdFx0Y29weVtpdGVtLmZpZWxkbmFtZV09ZS50YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRcdHZhbHVlOmNvcHlbaXRlbS5maWVsZG5hbWVdLFxuXHRcdFx0XHRcdGxhYmxlOml0ZW0ubGFiZWxcblx0XHRcdFx0fTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFNlbGVjdDogZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdHZhciBvcHRpb25zPWl0ZW0ub3B0aW9ucy5zcGxpdCggXCJcXG5cIiApO1xuXHRcdFx0XHQvLyBpZihjb3B5W2l0ZW0uZmllbGRuYW1lXSE9XCJcIil7XG5cdFx0XHRcdC8vIFx0Y29weVtpdGVtLmZpZWxkbmFtZV09b3B0aW9uc1swXTtcblx0XHRcdFx0Ly8gXHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHRcdC8vIH1cblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRmaWVsZDpcInNlbGVjdFwiLFxuXHRcdFx0XHRcdHR5cGU6XCJudW1iZXJcIixcblx0XHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0XHRjb3B5W2l0ZW0uZmllbGRuYW1lXT1lLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdFx0bGFibGU6aXRlbS5sYWJlbCxcblx0XHRcdFx0XHR2YWx1ZTpjb3B5W2l0ZW0uZmllbGRuYW1lXSxcblx0XHRcdFx0XHRvcHRpb25zOm9wdGlvbnNcblx0XHRcdFx0fTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdERhdGE6IGZ1bmN0aW9uKGl0ZW0scHJvcE9wdGlvbnMpe1xuXHRcdFx0XHRpZihwcm9wT3B0aW9ucy50eXBlPT1cInRleHRhcmVhXCIpe1xuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRmaWVsZDpcInRleHRhcmVhXCIsXG5cdFx0XHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0XHRcdGNvcHlbaXRlbS5maWVsZG5hbWVdPWUudGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdFx0XHR2YWx1ZTpjb3B5W2l0ZW0uZmllbGRuYW1lXSxcblx0XHRcdFx0XHRcdGxhYmxlOml0ZW0ubGFiZWxcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdGZpZWxkOlwiaW5wdXRcIixcblx0XHRcdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRcdFx0Y29weVtpdGVtLmZpZWxkbmFtZV09ZS50YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0XHRcdHZhbHVlOmNvcHlbaXRlbS5maWVsZG5hbWVdLFxuXHRcdFx0XHRcdFx0bGFibGU6aXRlbS5sYWJlbFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdERhdGU6IGZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGZpZWxkOlwiZGF0ZVwiLFxuXHRcdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRcdGNvcHlbaXRlbS5maWVsZG5hbWVdPWUudGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0XHRsYWJsZTppdGVtLmxhYmVsXG5cdFx0XHRcdH1cblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHR9XG5cblx0XHRpZih0aGlzLnByb3BzLml0ZW09PW51bGwpe1xuXHRcdFx0dmFyIGNvcHk9e31cblx0XHR9ZWxzZXtcblx0XHRcdHZhciBjb3B5PXBzLmNsb25lKHRoaXMucHJvcHMuaXRlbSk7XG5cdFx0fVxuXG5cdFx0Ly9sb29wIHRoZSBqc29uIG9iamVjdFxuXHRcdC8vcHJvYmFibHkgY2hhbmdlIHRoaXMgdG8gd2lsbE1vdW50XG5cdFx0Y29uc29sZS5sb2coZmllbGRzSnNvbik7XG5cblx0XHRmb3IodmFyIHggPSAwOyB4IDwgZmllbGRzSnNvbi5sZW5ndGg7IHgrKyl7XG5cdFx0XHR2YXIgY3VycmVudEZpZWxkPWZpZWxkc0pzb25beF07XG5cdFx0XHRjb25zb2xlLmxvZyhjdXJyZW50RmllbGQuZmllbGRuYW1lKTtcblx0XHRcdC8vIGNoZWNrIGlmIHRoaXMgZmllbGQgd2FzIGVuYWJsZWRcblxuXHRcdFx0aWYgKHRoaXMucHJvcHNbY3VycmVudEZpZWxkLmZpZWxkbmFtZV0pe1xuXHRcdFx0XHQvL3RoZXJlIGlzIGEgcHJvcHMgZm9yIHRoaXMgZmllbGRcblxuXHRcdFx0XHRpZih0aGlzLnByb3BzW2N1cnJlbnRGaWVsZC5maWVsZG5hbWVdLmFjdGl2ZSA9PT0gMSl7XG5cdFx0XHRcdFx0Ly9hbmQgdGhlIGZpZWxkIGlzIHNldCB0byBhY3RpdmVcblxuXHRcdFx0XHRcdGlmKGZpZWxkT2JqZWN0W2N1cnJlbnRGaWVsZC5maWVsZHR5cGVdKXtcblx0XHRcdFx0XHRcdC8vRmVpbGQgdHlwZSBjYW4gYmUgaGFuZGxlZD9cblx0XHRcdFx0XHRcdC8vaGFuZGxlIHRoZSBjcmVhdGlvbiBvZiBjb3B5IGFuZCB0aGUgZGVmYXVsdCB2YWx1ZXNcblxuXHRcdFx0XHRcdFx0aWYodGhpcy5wcm9wcy5tb2RlPT1cImNyZWF0ZVwiKXtcblx0XHRcdFx0XHRcdFx0aWYoY29weVtjdXJyZW50RmllbGQuZmllbGRuYW1lXSl7XG5cdFx0XHRcdFx0XHRcdFx0Ly90aGUgZmllbGQgYWxyZWFkeSBleGlzdHNcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRlbHNlIGlmKHRoaXMucHJvcHNbY3VycmVudEZpZWxkLmZpZWxkbmFtZV0uZGVmYXVsdCl7XG5cdFx0XHRcdFx0XHRcdFx0Ly9zZXQgdG8gZGVmYXVsdCB2YWx1ZVxuXHRcdFx0XHRcdFx0XHRcdGNvcHlbY3VycmVudEZpZWxkLmZpZWxkbmFtZV09dGhpcy5wcm9wc1tjdXJyZW50RmllbGQuZmllbGRuYW1lXS5kZWZhdWx0O1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0XHRcdFx0Y29weVtjdXJyZW50RmllbGQuZmllbGRuYW1lXT1cIlwiO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKGN1cnJlbnRGaWVsZC5maWVsZG5hbWUpO1xuXHRcdFx0XHRcdFx0ZmllbGRzLnB1c2goZmllbGRPYmplY3RbY3VycmVudEZpZWxkLmZpZWxkdHlwZV0oY3VycmVudEZpZWxkLHRoaXMucHJvcHNbY3VycmVudEZpZWxkLmZpZWxkbmFtZV0pKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoIShcImRvY3R5cGVcIiBpbiBjb3B5KSl7XG5cdFx0XHRjb3B5LmRvY3R5cGU9dGhpcy5wcm9wcy5kb2N0eXBlO1xuXHRcdH1cblx0XHQvL2FkZGluZyBidXR0b24gZmVpbGRzXG5cdFx0ZmllbGRzLnB1c2goe1xuXHRcdFx0XHRmaWVsZDpcImJ1dHRvblwiLFxuXHRcdFx0XHR0eXBlOlwic3VibWl0XCIsXG5cdFx0XHRcdHZhbHVlOlwiQ3JlYXRlIFwiICsgdGhpcy5wcm9wcy5kb2N0eXBlICsgXCIgRW50cnlcIixcblx0XHRcdFx0Y2xhc3NOYW1lOlwiYnRuLXByaW1hcnkgcHVsbC1yaWdodCBcIiArIGNyZWF0ZUhpZGRlbixcblx0XHRcdFx0b25DbGljazp0aGlzLnN1Ym1pdFxuXHRcdFx0fSk7XG5cdFx0aWYodGhpcy5wcm9wcy5jbG9zZSl7XG5cdFx0XHRmaWVsZHMucHVzaCh7XG5cdFx0XHRcdFx0ZmllbGQ6XCJidXR0b25cIixcblx0XHRcdFx0XHR2YWx1ZTpcIkNsb3NlXCIsXG5cdFx0XHRcdFx0Y2xhc3NOYW1lOlwicHVsbC1yaWdodCBcIisgZWRpdEhpZGRlbixcblx0XHRcdFx0XHRvbkNsaWNrOmZ1bmN0aW9uKGUpeyBlLnByZXZlbnREZWZhdWx0KCk7dGhpcy5wcm9wcy5jbG9zZSgpO30uYmluZCh0aGlzKVxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGZpZWxkcy5wdXNoKHtcblx0XHRcdFx0ZmllbGQ6XCJidXR0b25cIixcblx0XHRcdFx0dHlwZTpcInN1Ym1pdFwiLFxuXHRcdFx0XHR2YWx1ZTpcIkRlbGV0ZVwiLFxuXHRcdFx0XHRjbGFzc05hbWU6XCJidG4tZGFuZ2VyIHB1bGwtcmlnaHQgXCIrIGVkaXRIaWRkZW4sXG5cdFx0XHRcdG9uQ2xpY2s6dGhpcy5kZWxldGVcblx0XHR9KTtcblx0XHRmaWVsZHMucHVzaChcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJidXR0b25cIixcblx0XHRcdFx0dHlwZTpcInN1Ym1pdFwiLFxuXHRcdFx0XHR2YWx1ZTpcIlNhdmVcIixcblx0XHRcdFx0Y2xhc3NOYW1lOlwiYnRuLXN1Y2Nlc3MgcHVsbC1yaWdodCBcIisgZWRpdEhpZGRlbixcblx0XHRcdFx0b25DbGljazp0aGlzLnNhdmVcblx0XHRcdH0pO1xuXHRcdHJldHVybiBmaWVsZHM7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dmFyIG91dHB1dD17fTtcblx0XHRpZih0aGlzLnN0YXRlLml0ZW1zIT09bnVsbCl7XG5cdFx0XHR2YXIgZmllbGRzPXRoaXMuY3JlYXRlRm9ybUpzb24oKTtcblx0XHRcdHZhciBvdXRwdXQgPSAoXHRcdFx0XHRcblx0XHRcdFx0PEZvcm1cblx0XHRcdFx0XHRpZD17dGhpcy5wcm9wcy5pZH1cblx0XHRcdFx0XHR0eXBlPVwiaG9yaXpvbnRhbFwiXG5cdFx0XHRcdFx0ZmllbGRzPXtmaWVsZHN9XG5cdFx0XHRcdC8+KTtcblx0XHR9ZWxzZXsgXG5cdFx0XHRvdXRwdXQgPSAoPGRpdj4gTG9hZGluZy4uLiA8L2Rpdj4pO1xuXHRcdH1cblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2Plx0XHRcblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbiIsIi8qIGZvcm1zICovXG4vKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cblxuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnN1Ym1pdD10aGlzLnN1Ym1pdC5iaW5kKHRoaXMpO1xuXHR9XG5cdHN1Ym1pdChlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5wcm9wcy5zdWJtaXQoZSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dmFyIGZvcm09W107XG5cdFx0dmFyIGZvcm1UeXBlcz17XG5cdFx0XHRzZWxlY3RcdDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciBvcHRpbmFsPVtcInZhbHVlXCIsXCJsYWJsZVwiLFwib3B0aW9uc1wiLFwiY2xhc3NOYW1lXCIsXCJyZWFkb25seVwiLFwiZGlzYWJsZVwiLFwicmVxdWlyZVwiXTtcblx0XHRcdFx0dmFyIHByb3BzPXBzLmluaXRQcm9wcyhvcHRpbmFsLGl0ZW0pO1xuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxTZWxlY3Rcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH1cblx0XHRcdFx0XHRcdHZhbHVlPXtwcm9wcy52YWx1ZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17cHJvcHMuY2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0bGFibGU9e3Byb3BzLmxhYmxlfVxuXHRcdFx0XHRcdFx0b3B0aW9ucz17cHJvcHMub3B0aW9uc31cblx0XHRcdFx0XHRcdHJlYWRPbmx5PXtwcm9wcy5yZWFkb25seX1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXtwcm9wcy5kaXNhYmxlZH1cblx0XHRcdFx0XHRcdHJlcXVpcmVkPXtwcm9wcy5yZXF1aXJlZH1cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKTt9fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRjaGVjayA6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHR2YXIgcHJvcHM9W1widmFsdWVcIixcImxhYmxlXCIsXCJjbGFzc05hbWVcIixcInJlYWRvbmx5XCIsXCJkaXNhYmxlXCIsXCJyZXF1aXJlXCIsXCJ2YWx1ZVwiXTtcblx0XHRcdFx0cHJvcHM9cHMuaW5pdFByb3BzKHByb3BzLGl0ZW0pO1xuXG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PENoZWNrXG5cdFx0XHRcdFx0XHRrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9XG5cdFx0XHRcdFx0XHR2YWx1ZT17cHJvcHMudmFsdWV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e3Byb3BzLmNsYXNzTmFtZX1cblx0XHRcdFx0XHRcdGxhYmxlPXtwcm9wcy5sYWJsZX1cblx0XHRcdFx0XHRcdHJlYWRPbmx5PXtwcm9wcy5yZWFkb25seX1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXtwcm9wcy5kaXNhYmxlZH1cblx0XHRcdFx0XHRcdHJlcXVpcmVkPXtwcm9wcy5yZXF1aXJlZH1cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKTt9fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cblx0XHRcdHRleHRhcmVhIDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciBwcm9wcz1bXCJ2YWx1ZVwiLFwibGFibGVcIixcImNsYXNzTmFtZVwiLFwicmVhZG9ubHlcIixcImRpc2FibGVcIixcInJlcXVpcmVcIixcInZhbHVlXCJdO1xuXHRcdFx0XHRwcm9wcz1wcy5pbml0UHJvcHMocHJvcHMsaXRlbSk7XG5cblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8VGV4dGFyZWFcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH1cblx0XHRcdFx0XHRcdHZhbHVlPXtwcm9wcy52YWx1ZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17cHJvcHMuY2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0bGFibGU9e3Byb3BzLmxhYmxlfVxuXHRcdFx0XHRcdFx0cmVhZE9ubHk9e3Byb3BzLnJlYWRvbmx5fVxuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ9e3Byb3BzLmRpc2FibGVkfVxuXHRcdFx0XHRcdFx0cmVxdWlyZWQ9e3Byb3BzLnJlcXVpcmVkfVxuXHRcdFx0XHRcdFx0aW5wdXRDaGFuZ2VkPXtmdW5jdGlvbihlKXtpdGVtLm9uQ2hhbmdlKGUpO319XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGlucHV0IFx0OiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0dmFyIHR5cGUgPSAoaXRlbS50eXBlID09PSB1bmRlZmluZWQpID8gXCJ0ZXh0XCI6IGl0ZW0udHlwZTtcblx0XHRcdFx0dmFyIHZhbHVlID0gKGl0ZW0udmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnZhbHVlO1xuXHRcdFx0XHR2YXIgcGxhY2Vob2xkZXIgPSAoaXRlbS5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucGxhY2Vob2xkZXI7XG5cdFx0XHRcdHZhciBsYWJsZSA9IChpdGVtLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5sYWJsZTtcblx0XHRcdFx0dmFyIGNsYXNzTmFtZSA9IChpdGVtLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uY2xhc3NOYW1lO1xuXHRcdFx0XHR2YXIgcmVhZG9ubHkgPSAoaXRlbS5yZWFkb25seSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucmVhZG9ubHk7XG5cdFx0XHRcdHZhciBkaXNhYmxlZCA9IChpdGVtLmRpc2FibGVkID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5kaXNhYmxlZDtcblx0XHRcdFx0dmFyIHJlcXVpcmVkID0gKGl0ZW0ucmVxdWlyZWQgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnJlcXVpcmVkO1xuXHRcdFx0XHRcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8SW5wdXRcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH0gXG5cdFx0XHRcdFx0XHR0eXBlPXt0eXBlfVxuXHRcdFx0XHRcdFx0dmFsdWU9e3ZhbHVlfVxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuXHRcdFx0XHRcdFx0bGFibGU9e2xhYmxlfVxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXtjbGFzc05hbWV9XG5cdFx0XHRcdFx0XHRyZWFkb25seT17cmVhZG9ubHl9XG5cdFx0XHRcdFx0XHRkaXNhYmxlZD17ZGlzYWJsZWR9XG5cdFx0XHRcdFx0XHRyZXF1aXJlZD17cmVxdWlyZWR9XG5cdFx0XHRcdFx0XHRpbnB1dENoYW5nZWQ9e2Z1bmN0aW9uKGUpe2l0ZW0ub25DaGFuZ2UoZSl9fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRsYWJsZSBcdDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHJldHVybiAoICBcbiAgICBcdFx0XHRcdDxsYWJlbCBrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9ID57aXRlbS5sYWJsZX08L2xhYmVsPlxuXG4gICAgXHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdHJhZGlvXHQ6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHRyZXR1cm4gKDxkaXY+PC9kaXY+KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGhlYWRlcjogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHJldHVybig8aDMga2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fSA+e2l0ZW0ubGFibGV9PC9oMz4pXG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRkYXRlOiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0dmFyIHZhbHVlID0gKGl0ZW0udmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnZhbHVlO1xuXHRcdFx0XHR2YXIgbGFibGUgPSAoaXRlbS5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ubGFibGU7XG5cdFx0XHRcdHZhciBwbGFjZWhvbGRlciA9IChpdGVtLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5wbGFjZWhvbGRlcjtcblx0XHRcdFx0dmFyIGNsYXNzTmFtZSA9IChpdGVtLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uY2xhc3NOYW1lO1xuXHRcdFx0XHR2YXIgcmVhZG9ubHkgPSAoaXRlbS5yZWFkb25seSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucmVhZG9ubHk7XG5cdFx0XHRcdHZhciBkaXNhYmxlZCA9IChpdGVtLmRpc2FibGVkID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5kaXNhYmxlZDtcblx0XHRcdFx0dmFyIHJlcXVpcmVkID0gKGl0ZW0ucmVxdWlyZWQgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnJlcXVpcmVkO1xuXHRcdFx0XHRyZXR1cm4oXG5cdFx0XHRcdFx0PERhdGVJbnB1dFxuXHRcdFx0XHRcdFx0a2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fSBcblx0XHRcdFx0XHRcdHZhbHVlPXt2YWx1ZX1cblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cblx0XHRcdFx0XHRcdGxhYmxlPXtsYWJsZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0aW5wdXRDaGFuZ2VkPXtmdW5jdGlvbihlKXtpdGVtLm9uQ2hhbmdlKGUpfX1cblx0XHRcdFx0XHRcdHJlYWRvbmx5PXtyZWFkb25seX1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXtkaXNhYmxlZH1cblx0XHRcdFx0XHRcdHJlcXVpcmVkPXtyZXF1aXJlZH1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0YXV0b0NvbXBsZXRlOiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0dmFyIHZhbHVlID0gKGl0ZW0udmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnZhbHVlO1xuXHRcdFx0XHR2YXIgbGFibGUgPSAoaXRlbS5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ubGFibGU7XG5cdFx0XHRcdHZhciBwbGFjZWhvbGRlciA9IChpdGVtLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5wbGFjZWhvbGRlcjtcblx0XHRcdFx0dmFyIGNsYXNzTmFtZSA9IChpdGVtLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uY2xhc3NOYW1lO1xuXHRcdFx0XHR2YXIgcmVhZG9ubHkgPSAoaXRlbS5yZWFkb25seSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucmVhZG9ubHk7XG5cdFx0XHRcdHZhciBkaXNhYmxlZCA9IChpdGVtLmRpc2FibGVkID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5kaXNhYmxlZDtcblx0XHRcdFx0dmFyIHJlcXVpcmVkID0gKGl0ZW0ucmVxdWlyZWQgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnJlcXVpcmVkO1xuXG5cdFx0XHRcdHJldHVybihcblx0XHRcdFx0XHQ8QXdlc29tcGxldGVJbnB1dFxuXHRcdFx0XHRcdFx0a2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fVxuXHRcdFx0XHRcdFx0ZG9jdHlwZT17aXRlbS5kb2N0eXBlfVxuXHRcdFx0XHRcdFx0ZG9jdmFsdWU9e2l0ZW0uZG9jdmFsdWV9XG5cdFx0XHRcdFx0XHRkb2NsYWJsZT17aXRlbS5kb2NsYWJsZX1cblx0XHRcdFx0XHRcdHZhbHVlPXt2YWx1ZX1cblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cblx0XHRcdFx0XHRcdGxhYmxlPXtsYWJsZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0cmVhZG9ubHk9e3JlYWRvbmx5fVxuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ9e2Rpc2FibGVkfVxuXHRcdFx0XHRcdFx0cmVxdWlyZWQ9e3JlcXVpcmVkfVxuXHRcdFx0XHRcdFx0aW5wdXRDaGFuZ2VkPXtmdW5jdGlvbihlKXtpdGVtLm9uQ2hhbmdlKGUpfX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0YnV0dG9uOiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0dmFyIHZhbHVlID0gKGl0ZW0udmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnZhbHVlO1xuXHRcdFx0XHR2YXIgY2xhc3NOYW1lID0gKGl0ZW0uY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5jbGFzc05hbWU7XG5cdFx0XHRcdHZhciBkaXNhYmxlZCA9IChpdGVtLmRpc2FibGVkID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5kaXNhYmxlZDtcblx0XHRcdFx0cmV0dXJuKFxuXHRcdFx0XHRcdDxCdXR0b25cblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH1cblx0XHRcdFx0XHRcdHZhbHVlPXt2YWx1ZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ9e2Rpc2FibGVkfVxuXHRcdFx0XHRcdFx0b25DbGljaz17ZnVuY3Rpb24oZSl7aXRlbS5vbkNsaWNrKGUpfX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpXG5cdFx0fVxuXHRcdHRoaXMucHJvcHMuZmllbGRzLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCl7XG5cdFx0XHRpZigkLmlzRW1wdHlPYmplY3QoaXRlbSkpe1xuXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Zm9ybS5wdXNoKGZvcm1UeXBlc1tpdGVtLmZpZWxkXShpdGVtLGluZGV4KSk7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0XHQvL2Zvcih2YXIgeD0wOyB4IDwgdGhpcy5wcm9wcy5mZWlsZHMubGVuZ3RoIHgrKzsgKVxuXHRcdHZhciBjbGFzc05hbWUgPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcInJlYWN0LWZvcm1cIjogXCJmb3JtLWhvcml6b250YWwgcmVhY3QtZm9ybSBcIit0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8Zm9ybSBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG5cdFx0XHRcdDxmaWVsZHNldD5cblx0XHRcdFx0e3RoaXMucHJvcHMuYmVmb3JlfVxuXHRcdFx0XHR7Zm9ybX1cblx0XHRcdFx0eyB0aGlzLnByb3BzLmNoaWxkcmVufVxuXHRcdFx0XHQ8L2ZpZWxkc2V0PlxuXHRcdFx0PC9mb3JtPlxuXHRcdCk7XG5cdH1cbn1cblxuXG5cbmV4cG9ydCBjbGFzcyBTZWxlY3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5pbnB1dENoYW5nZT10aGlzLmlucHV0Q2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblxuXHR9XG5cdGlucHV0Q2hhbmdlKGUpe1xuXHRcdHRoaXMucHJvcHMuaW5wdXRDaGFuZ2VkKCk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLmxhYmxlID0gKHRoaXMucHJvcHMubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLmxhYmxlO1xuXHRcdHRoaXMub3B0aW9ucyA9ICh0aGlzLnByb3BzLm9wdGlvbnMgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLm9wdGlvbnM7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jb250cm9sXCI6IFwiZm9ybS1jb250cm9sXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlcXVpcmVkID0gKHRoaXMucHJvcHMucmVxdWlyZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZXF1aXJlZD09ZmFsc2V8fHRoaXMucHJvcHMucmVxdWlyZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZWFkb25seSA9ICh0aGlzLnByb3BzLnJlYWRvbmx5ID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVhZG9ubHk9PWZhbHNlfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHZhciBvcHRpb25zPVtdO1xuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblxuXG5cdFx0dGhpcy5vcHRpb25zLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCl7XG5cdFx0XHR2YXIgZ3JvdXA9W107XG5cdFx0XHRpZihpdGVtLmdyb3VwICE9PSB1bmRlZmluZWQpe1xuXHRcdFx0XHRpdGVtLm9wdGlvbnMubWFwKGZ1bmN0aW9uKGlubmVySXRlbSxpbmRleCl7XG5cdFx0XHRcdFx0Z3JvdXAucHVzaCggPG9wdGlvbiBrZXk9e2l0ZW0uZ3JvdXAraW5kZXh9IHZhbHVlPXtpbm5lckl0ZW19PiB7aW5uZXJJdGVtfSA8L29wdGlvbj4pXG5cdFx0XHRcdH0pXG5cdFx0XHRcdG9wdGlvbnMucHVzaCg8b3B0Z3JvdXAga2V5PXtpdGVtLmdyb3VwfSBsYWJlbD17aXRlbS5ncm91cH0+IHtncm91cH08L29wdGdyb3VwPik7XG5cblx0XHRcdH1cblx0XHRcdGVsc2V7XG5cdFx0XHRcdG9wdGlvbnMucHVzaCggPG9wdGlvbiBrZXk9e2luZGV4fSB2YWx1ZT17aXRlbX0+IHtpdGVtfSA8L29wdGlvbj4pXG5cdFx0XHR9XG5cblx0XHRcdFxuXHRcdH0uYmluZCh0aGlzKSk7XG5cblx0XHR2YXIgc2VsZWN0PShcblx0XHRcdDxzZWxlY3QgXG5cdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9IFxuXHRcdFx0XHR2YWx1ZT17dGhpcy52YWx1ZX0gXG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnByb3BzLmlucHV0Q2hhbmdlZH1cblx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdCAgICAgICAgICBcdHJlYWRPbmx5PXt0aGlzLnJlYWRvbmx5fVxuXHQgICAgICAgICAgXHRyZXF1aXJlZD17dGhpcy5yZXF1aXJlZH1cblx0XHRcdFx0PlxuXHRcdFx0XHR7b3B0aW9uc31cblx0XHRcdDwvc2VsZWN0PlxuXHRcdCk7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkIHx8IHRoaXMucHJvcHMubGFibGUgPT1cIlwiKXtcblx0XHRcdG91dHB1dCA9IChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIFwiPlxuXHRcdCAgICBcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWxcIj57dGhpcy5wcm9wcy5sYWJsZX08L2xhYmVsPlxuXHRcdCAgICBcdFx0PGRpdj5cblx0XHQgICAgXHRcdHtzZWxlY3R9XG5cdFx0ICAgIFx0XHQ8L2Rpdj5cblx0XHQgIFx0XHQ8L2Rpdj5cblx0XHQgIFx0KTtcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdG91dHB1dCA9IChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG5cdFx0ICAgICAgXHRcdHtzZWxlY3R9XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLmlucHV0Q2hhbmdlPXRoaXMuaW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcblxuXHR9XG5cdGlucHV0Q2hhbmdlKGUpe1xuXHRcdHRoaXMucHJvcHMuaW5wdXRDaGFuZ2VkKGUpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHRoaXMudHlwZSA9ICh0aGlzLnByb3BzLnR5cGUgPT09IHVuZGVmaW5lZCkgPyBcInRleHRcIjogdGhpcy5wcm9wcy50eXBlO1xuXHRcdHRoaXMudmFsdWUgPSAodGhpcy5wcm9wcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMudmFsdWU7XG5cdFx0dGhpcy5wbGFjZWhvbGRlciA9ICh0aGlzLnByb3BzLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5wbGFjZWhvbGRlcjtcblx0XHR0aGlzLmxhYmxlID0gKHRoaXMucHJvcHMubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLmxhYmxlO1xuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblx0XHR0aGlzLmNsYXNzTmFtZT0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJmb3JtLWNvbnRyb2xcIjogXCJmb3JtLWNvbnRyb2wgXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlcXVpcmVkID0gKHRoaXMucHJvcHMucmVxdWlyZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZXF1aXJlZD09ZmFsc2V8fHRoaXMucHJvcHMucmVxdWlyZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZWFkb25seSA9ICh0aGlzLnByb3BzLnJlYWRvbmx5ID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVhZG9ubHk9PWZhbHNlfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHZhciBpbnB1dD0oIFxuXHRcdFx0PGlucHV0IFxuXHRcdFx0XHR0eXBlPXt0aGlzLnR5cGV9IFxuXHRcdFx0XHRjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfSBcblx0XHRcdFx0cGxhY2Vob2xkZXI9e3RoaXMucGxhY2Vob2xkZXJ9IFxuXHRcdFx0XHR2YWx1ZT17dGhpcy52YWx1ZX1cblx0XHRcdFx0b25DaGFuZ2U9e3RoaXMucHJvcHMuaW5wdXRDaGFuZ2VkfVxuXHRcdFx0XHRkaXNhYmxlZD17dGhpcy5kaXNhYmxlZH1cblx0ICAgICAgICAgIFx0cmVhZE9ubHk9e3RoaXMucmVhZG9ubHl9XG5cdCAgICAgICAgICBcdHJlcXVpcmVkPXt0aGlzLnJlcXVpcmVkfVxuXHRcdFx0Lz5cblx0XHQpO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMubGFibGUgIT09IHVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLmxhYmxlID09XCJcIil7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBcIj5cblx0XHQgICAgXHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD5cblx0XHQgICAgXHRcdDxkaXYgY2xhc3NOYW1lPVwiXCI+XG5cdFx0ICAgICAgXHRcdFx0e2lucHV0fVxuXHRcdCAgICBcdFx0PC9kaXY+XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdCAgICAgIFx0XHR7aW5wdXR9XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBDaGVjayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLmlucHV0Q2hhbmdlPXRoaXMuaW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcblxuXG5cdH1cblx0aW5wdXRDaGFuZ2UoZSl7XG5cblx0XHR0aGlzLnByb3BzLmlucHV0Q2hhbmdlZChlKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyAwIDogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLnBsYWNlaG9sZGVyID0gKHRoaXMucHJvcHMucGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnBsYWNlaG9sZGVyO1xuXHRcdHRoaXMubGFibGUgPSAodGhpcy5wcm9wcy5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMubGFibGU7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jaGVjay1pbnB1dFwiOiBcImZvcm0tY2hlY2staW5wdXQgXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlcXVpcmVkID0gKHRoaXMucHJvcHMucmVxdWlyZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZXF1aXJlZD09ZmFsc2V8fHRoaXMucHJvcHMucmVxdWlyZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZWFkb25seSA9ICh0aGlzLnByb3BzLnJlYWRvbmx5ID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVhZG9ubHk9PWZhbHNlfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdFxuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblx0XHR2YXIgaW5wdXQ9KCBcblx0XHRcdDxpbnB1dCBcblx0XHRcdFx0dHlwZT1cImNoZWNrYm94XCIgXG5cdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9IFxuXHRcdFx0XHRjaGVja2VkPXt0aGlzLnZhbHVlfVxuXHRcdFx0XHRcblx0XHRcdFx0b25DaGFuZ2U9e3RoaXMucHJvcHMuaW5wdXRDaGFuZ2VkfVxuXHRcdFx0XHRkaXNhYmxlZD17dGhpcy5kaXNhYmxlZH1cblx0ICAgICAgICAgIFx0cmVhZE9ubHk9e3RoaXMucmVhZG9ubHl9XG5cdCAgICAgICAgICBcdHJlcXVpcmVkPXt0aGlzLnJlcXVpcmVkfVxuXHRcdFx0Lz5cblx0XHQpO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMubGFibGUgIT09IHVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLmxhYmxlID09XCJcIil7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHQgICAgXHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+XG5cdFx0ICAgICAgXHRcdFx0e2lucHV0fXt0aGlzLnByb3BzLmxhYmxlfVxuXHRcdCAgICAgIFx0XHQ8L2xhYmVsPlxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0ICAgICAgXHRcdHtpbnB1dH1cblx0XHQgIFx0XHQ8L2Rpdj5cblx0XHQgIFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbmV4cG9ydCBjbGFzcyBUZXh0YXJlYSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLmlucHV0Q2hhbmdlPXRoaXMuaW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcblxuXHR9XG5cdGlucHV0Q2hhbmdlKGUpe1xuXHRcdHRoaXMucHJvcHMuaW5wdXRDaGFuZ2VkKGUpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHRoaXMudmFsdWUgPSAodGhpcy5wcm9wcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IDAgOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMucGxhY2Vob2xkZXIgPSAodGhpcy5wcm9wcy5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXI7XG5cdFx0dGhpcy5sYWJsZSA9ICh0aGlzLnByb3BzLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5sYWJsZTtcblx0XHR0aGlzLmNsYXNzTmFtZT0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJmb3JtLWNvbnRyb2xcIjogXCJmb3JtLWNvbnRyb2wgXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlcXVpcmVkID0gKHRoaXMucHJvcHMucmVxdWlyZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZXF1aXJlZD09ZmFsc2V8fHRoaXMucHJvcHMucmVxdWlyZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZWFkb25seSA9ICh0aGlzLnByb3BzLnJlYWRvbmx5ID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVhZG9ubHk9PWZhbHNlfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucm93cyA9ICh0aGlzLnByb3BzLnJvd3MgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yb3dzPT1cIlwiKSA/IDM6IHRoaXMucHJvcHMucm93cztcblx0XHR2YXIgb3V0cHV0PVwiXCI7XG5cdFx0dmFyIGlucHV0PSggXG5cdFx0XHQ8dGV4dGFyZWEgXG5cdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9IFxuXHRcdFx0XHR2YWx1ZT17dGhpcy52YWx1ZX1cblx0XHRcdFx0b25DaGFuZ2U9e3RoaXMucHJvcHMuaW5wdXRDaGFuZ2VkfVxuXHRcdFx0XHRyb3dzPXt0aGlzLnJvd3N9XG5cdFx0XHRcdGRpc2FibGVkPXt0aGlzLmRpc2FibGVkfVxuXHQgICAgICAgICAgXHRyZWFkT25seT17dGhpcy5yZWFkb25seX1cblx0ICAgICAgICAgIFx0cmVxdWlyZWQ9e3RoaXMucmVxdWlyZWR9XG5cdFx0XHQvPlxuXHRcdCk7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkIHx8IHRoaXMucHJvcHMubGFibGUgPT1cIlwiKXtcblx0XHRcdG91dHB1dCA9IChcblx0XHRcdFx0PGRpdj5cblx0XHQgICAgXHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+XG5cdFx0ICAgICAgXHRcdFx0e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD57aW5wdXR9XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiXCI+XG5cdFx0ICAgICAgXHRcdHtpbnB1dH1cblx0XHQgIFx0XHQ8L2Rpdj5cblx0XHQgIFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbmV4cG9ydCBjbGFzcyBEYXRlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5kYXRlSW5pdD10aGlzLmRhdGVJbml0LmJpbmQodGhpcyk7XG5cdH1cblx0ZGF0ZUluaXQoKXtcblx0XHQkKCcuaW5wdXQtZ3JvdXAuZGF0ZSAuZGF0ZXBpY2snKS5kYXRlcGlja2VyKHtcblx0XHQgICAgdG9kYXlCdG46IFwibGlua2VkXCIsXG5cdFx0ICAgIG9yaWVudGF0aW9uOiBcImJvdHRvbSByaWdodFwiLFxuXHRcdCAgICBhdXRvY2xvc2U6IHRydWUsXG5cdFx0ICAgIHRvZGF5SGlnaGxpZ2h0OiB0cnVlXG5cdFx0fSkub24oJ2NoYW5nZURhdGUnLCBmdW5jdGlvbihlKSB7XG5cdFx0XHR2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2lucHV0JywgeyBidWJibGVzOiB0cnVlIH0pO1xuXHRcdFx0ZS50YXJnZXQuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cdFx0fSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLnBsYWNlaG9sZGVyID0gKHRoaXMucHJvcHMucGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnBsYWNlaG9sZGVyO1xuXHRcdHRoaXMubGFibGUgPSAodGhpcy5wcm9wcy5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMubGFibGU7XG5cdFx0dGhpcy5kaXNhYmxlZCA9ICh0aGlzLnByb3BzLmRpc2FibGVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PWZhbHNlfHx0aGlzLnByb3BzLmRpc2FibGVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVxdWlyZWQgPSAodGhpcy5wcm9wcy5yZXF1aXJlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1mYWxzZXx8dGhpcy5wcm9wcy5yZXF1aXJlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlYWRvbmx5ID0gKHRoaXMucHJvcHMucmVhZG9ubHkgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZWFkb25seT09ZmFsc2V8fHRoaXMucHJvcHMucmVhZG9ubHk9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cblxuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblx0XHR0aGlzLmNsYXNzTmFtZT0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJmb3JtLWNvbnRyb2wgZGF0ZXBpY2tcIjogXCJmb3JtLWNvbnRyb2wgZGF0ZXBpY2sgXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHZhciBpbnB1dD0oIFxuXHRcdFx0PGlucHV0XG5cdFx0XHRcdHJlZj17dGhpcy5kYXRlSW5pdH0gXG5cdFx0XHRcdHR5cGU9XCJ0ZXh0XCJcblx0XHRcdFx0Y2xhc3NOYW1lPXt0aGlzLmNsYXNzTmFtZX1cblx0XHRcdFx0cGxhY2Vob2xkZXI9e3RoaXMucGxhY2Vob2xkZXJ9ICBcblx0XHRcdFx0dmFsdWU9e3RoaXMudmFsdWV9IFxuXHRcdFx0XHRvbkNoYW5nZT17dGhpcy5wcm9wcy5pbnB1dENoYW5nZWR9XG5cdFx0XHRcdGRpc2FibGVkPXt0aGlzLmRpc2FibGVkfVxuXHQgICAgICAgICAgXHRyZWFkT25seT17dGhpcy5yZWFkb25seX1cblx0ICAgICAgICAgIFx0cmVxdWlyZWQ9e3RoaXMucmVxdWlyZWR9XG5cdFx0XHRcdC8+XG5cblx0XHQpO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMubGFibGUgIT09IHVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLmxhYmxlID09XCJcIil7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0ICBcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG5cdFx0ICBcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbFwiPnt0aGlzLnByb3BzLmxhYmxlfTwvbGFiZWw+XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwIGRhdGVcIj5cblx0XHRcdFx0XHRcdHtpbnB1dH1cblx0XHRcdFx0ICBcdFx0PHNwYW4gY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAtYWRkb25cIj5cblx0XHRcdFx0ICBcdFx0XHQ8aSBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLXRoXCI+PC9pPlxuXHRcdFx0XHQgIFx0XHQ8L3NwYW4+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cCBkYXRlXCI+XG5cblx0XHRcdFx0XHRcdHtpbnB1dH1cblx0XHRcdFx0ICBcdFx0PHNwYW4gY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAtYWRkb25cIj5cblx0XHRcdFx0ICBcdFx0XHQ8aSBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLXRoXCI+PC9pPlxuXHRcdFx0XHQgIFx0XHQ8L3NwYW4+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHQgIFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbmV4cG9ydCBjbGFzcyBBd2Vzb21wbGV0ZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXG5cdFx0LyogICBEbyB0aGUgYmluZCB0aGluZyAgKi9cblx0XHR0aGlzLmNyZWF0ZUxpc3Q9dGhpcy5jcmVhdGVMaXN0LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5kb2NDaGFuZ2VkPXRoaXMuZG9jQ2hhbmdlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY29tcG9uZW50RGlkTW91bnQ9dGhpcy5jb21wb25lbnREaWRNb3VudC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuaW5wdXRDaGFuZ2U9dGhpcy5pbnB1dENoYW5nZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuYXV0b2NvbXBsZXRlPXRoaXMuYXV0b2NvbXBsZXRlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jb21wb25lbnRXaWxsVW5tb3VudD10aGlzLmNvbXBvbmVudFdpbGxVbm1vdW50LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5yZWZDYWxsPXRoaXMucmVmQ2FsbC5iaW5kKHRoaXMpO1xuXHRcdFxuXHRcdC8vdGhpcy53b3Jrb3JkZXJPYmo9dGhpcy5vblN0YXR1c0NoYW5nZWQuYmluZCh0aGlzKTtcblx0XHQvKiAgICAgICAgICBlbmQgICAgICAgICAgKi9cblx0XHR0aGlzLml0ZW1saXN0PVtdO1xuXHRcdHRoaXMuc3RhdGU9e2l0ZW1saXN0OltdfTtcblx0XHR0aGlzLl9pc01vdW50ZWQ9ZmFsc2U7XG5cdFx0dmFyIGFyZ3M9e307XG5cdFx0dmFyIG9wdGlvbnM9e2RvY3R5cGU6dGhpcy5wcm9wcy5kb2N0eXBlfTtcblx0XHR2YXIgZmlsdGVyPXt9O1xuXHRcdGlmICh0aGlzLnByb3BzLmZpbHRlcj09dW5kZWZpbmVkIHx8IHRoaXMucHJvcHMuZmlsdGVyPT1udWxsKXtcblx0XHRcblx0XHR9ZWxzZXtcblx0XHRcdGZpbHRlcj0gdGhpcy5wcm9wcy5maWx0ZXI7XG5cdFx0fVxuXHRcdHRoaXMubGlzdFRvb2wgPSBuZXcgcHMuYXBpVG9vbChmaWx0ZXIsIG9wdGlvbnMgLHRoaXMuZG9jQ2hhbmdlZCk7XG5cdFx0aWYgKHRoaXMubGlzdFRvb2wuaXRlbXM9PT11bmRlZmluZWQgfHx0aGlzLmxpc3RUb29sLml0ZW1zPT09IDAgfHx0aGlzLmxpc3RUb29sLml0ZW1zPT09bnVsbCApe1xuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5zdGF0ZS5saXN0PXRoaXMubGlzdFRvb2wuaXRlbXM7XG5cdFx0fVxuXG5cdFx0dGhpcy5jcmVhdGVMaXN0KCk7XG5cdH1cblx0ZG9jQ2hhbmdlZCgpe1xuXHRcdHRoaXMuY3JlYXRlTGlzdCgpO1xuXHR9XG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0dGhpcy5faXNNb3VudGVkPXRydWU7XG5cdFx0dGhpcy5hdXRvY29tcGxldGUoKTtcblxuXHR9XG5cdGNyZWF0ZUxpc3QoKXtcblx0XHR0aGlzLml0ZW1saXN0PVtdO1xuXHRcdC8vbGFibGUgYW5kIHZhbHVlXG5cdFx0aWYgKHRoaXMucHJvcHMuZG9jbGFibGUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmxpc3RUb29sLml0ZW1zICE9PSB1bmRlZmluZWQgJiYgdGhpcy5saXN0VG9vbC5pdGVtcyAhPT0gbnVsbCl7XG5cdFx0XHRmb3IobGV0IGl0ZW0gb2YgdGhpcy5saXN0VG9vbC5pdGVtcyl7XG5cdFx0XHRcdHZhciB0ZW1wID1baXRlbVt0aGlzLnByb3BzLmRvY2xhYmxlXSxpdGVtW3RoaXMucHJvcHMuZG9jdmFsdWVdXTtcblx0XHRcdFx0dGhpcy5pdGVtbGlzdC5wdXNoKHRlbXApO1xuXHRcdFx0fVxuXHRcdFx0JChkb2N1bWVudCkudHJpZ2dlcignbGlzdExvYWQnICsgdGhpcy5wcm9wcy5kb2N0eXBlKTtcblx0XHR9XG5cdFx0Ly9qdXN0IGxhYmxlXG5cdFx0ZWxzZSBpZih0aGlzLmxpc3RUb29sLml0ZW1zICE9PSB1bmRlZmluZWQgJiYgdGhpcy5saXN0VG9vbC5pdGVtcyAhPT0gbnVsbCl7XG5cdFx0XHRmb3IobGV0IGl0ZW0gb2YgdGhpcy5saXN0VG9vbC5pdGVtcyl7XG5cdFx0XHRcdHRoaXMuaXRlbWxpc3QucHVzaChpdGVtW3RoaXMucHJvcHMuZG9jdmFsdWVdKTtcblx0XHRcdH1cblx0XHRcdCQoZG9jdW1lbnQpLnRyaWdnZXIoJ2xpc3RMb2FkJyArIHRoaXMucHJvcHMuZG9jdHlwZS5yZXBsYWNlKFwiIFwiLFwiXCIpKTtcblx0XHR9XG5cdH1cblx0Y29tcG9uZW50V2lsbFVubW91bnQoKXtcblx0XHQvLyBjb25zb2xlLmxvZyhcIkhFTExPXCIpO1xuXHRcdC8vIHRoaXMuYXcuZGVzdHJveSgpO1xuXHRcdC8vIGRlbGV0ZSB0aGlzLmF3O1xuXHRcdC8vIGNvbnNvbGUubG9nKFwiVEVTVFwiKTtcblx0fVxuXHRyZWZDYWxsKGlucHV0KXtcblx0XHR0aGlzLmlucHV0PWlucHV0O1xuXHR9XG5cdGF1dG9jb21wbGV0ZShpbnB1dCl7XG5cdFx0aW5wdXQ9dGhpcy5pbnB1dDtcblx0XHR2YXIgY29uZmlnPSB7XG5cdFx0XHRcdG1pbkNoYXJzOiAwLFxuXHRcdFx0XHRtYXhJdGVtczogOTksXG5cdFx0XHRcdGF1dG9GaXJzdDogdHJ1ZSxcblx0XHRcdFx0ZmlsdGVyOiBBd2Vzb21wbGV0ZS5GSUxURVJfU1RBUlRTV0lUSFxuXHRcdFx0fVxuXHRcdGlmKHRoaXMucHJvcHMuZG9jbGFibGUgIT09IHVuZGVmaW5lZCApe1xuXHRcdFx0Y29uZmlnLml0ZW09IGZ1bmN0aW9uKGl0ZW0sIGlucHV0KSB7XG5cdFx0XHRcdHZhciBkID0gaXRlbTtcblx0XHRcdFx0dmFyIGh0bWwgPSBcIjxzcGFuPlwiICsgX18oaXRlbS5sYWJlbCkrIFwiPC9zcGFuPjxicj48c3Bhbj48c21hbGw+XCIraXRlbS52YWx1ZStcIjwvc21hbGw+PC9zcGFuPlwiO1xuXHRcdFx0XHRyZXR1cm4gJCgnPGxpPjwvbGk+Jylcblx0XHRcdFx0XHQuZGF0YSgnaXRlbS5hdXRvY29tcGxldGUnLCBpdGVtKVxuXHRcdFx0XHRcdC5odG1sKCc8YT48cD4nICsgaHRtbCArICc8L3A+PC9hPicpXG5cdFx0XHRcdFx0LmdldCgwKTtcblx0XHRcdH1cblxuXHRcdH1lbHNle1xuXHRcdFx0Y29uZmlnLml0ZW09ZnVuY3Rpb24oaXRlbSwgaW5wdXQpIHtcblx0XHRcdFx0dmFyIGQgPSBpdGVtO1xuXHRcdFx0XHR2YXIgaHRtbCA9IFwiPHNwYW4+XCIgKyBfXyhpdGVtKSsgXCI8L3NwYW4+XCI7XG5cdFx0XHRcdHJldHVybiAkKCc8bGk+PC9saT4nKVxuXHRcdFx0XHRcdC5kYXRhKCdpdGVtLmF1dG9jb21wbGV0ZScsIGl0ZW0pXG5cdFx0XHRcdFx0Lmh0bWwoJzxhPjxwPicgKyBodG1sICsgJzwvcD48L2E+Jylcblx0XHRcdFx0XHQuZ2V0KDApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLmF3ID0gbmV3IEF3ZXNvbXBsZXRlKGlucHV0LGNvbmZpZyk7XG5cdFx0aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRcdCdhd2Vzb21wbGV0ZS1zZWxlY3Rjb21wbGV0ZScsXG5cdFx0XHRcdHRoaXMuaW5wdXRDaGFuZ2Vcblx0XHQpO1xuXHRcdCQoaW5wdXQpLmNsaWNrKCBmdW5jdGlvbigpIHtcblx0XHRcdGlmICh0aGlzLmF3LnVsLmNoaWxkTm9kZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdHRoaXMuYXcubWluQ2hhcnMgPSAwO1xuXHRcdFx0XHR0aGlzLmF3LmV2YWx1YXRlKCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmICh0aGlzLmF3LnVsLmhhc0F0dHJpYnV0ZSgnaGlkZGVuJykpIHtcblx0XHRcdFx0dGhpcy5hdy5vcGVuKCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dGhpcy5hdy5jbG9zZSgpO1xuXHRcdFx0fVxuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5hdy5saXN0PXRoaXMuaXRlbUxpc3Q7XG5cdFx0JChkb2N1bWVudCkuYmluZCgnbGlzdExvYWQnICsgdGhpcy5wcm9wcy5kb2N0eXBlLnJlcGxhY2UoXCIgXCIsXCJcIiksZnVuY3Rpb24oKXtcblx0XHRcdHRoaXMuYXcubGlzdD10aGlzLml0ZW1saXN0O1xuXHRcdH0uYmluZCh0aGlzKSk7XG5cdH1cblx0aW5wdXRDaGFuZ2UoZSl7XG5cdFx0dGhpcy5wcm9wcy5pbnB1dENoYW5nZWQoZSk7XG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnR5cGUgPSAodGhpcy5wcm9wcy50eXBlID09PSB1bmRlZmluZWQpID8gXCJ0ZXh0XCI6IHRoaXMucHJvcHMudHlwZTtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMucGxhY2Vob2xkZXIgPSAodGhpcy5wcm9wcy5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXI7XG5cdFx0dGhpcy5sYWJsZSA9ICh0aGlzLnByb3BzLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5sYWJsZTtcblx0XHR0aGlzLmRpc2FibGVkID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5kaXNhYmxlZD09ZmFsc2V8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZXF1aXJlZCA9ICh0aGlzLnByb3BzLnJlcXVpcmVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVxdWlyZWQ9PWZhbHNlfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVhZG9ubHkgPSAodGhpcy5wcm9wcy5yZWFkb25seSA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1mYWxzZXx8dGhpcy5wcm9wcy5yZWFkb25seT09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblxuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblx0XHR0aGlzLmNsYXNzTmFtZT0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJmb3JtLWNvbnRyb2wgYXdlc29tcGxldGVcIjogXCJmb3JtLWNvbnRyb2wgYXdlc29tcGxldGUgXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHZhciBpbnB1dD0oIDxpbnB1dFxuXHRcdFx0XHRcdHZhbHVlPXt0aGlzLnZhbHVlfVxuXG5cdFx0XHRcdFx0dHlwZT17dGhpcy50eXBlfSBcblx0XHRcdFx0XHRjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfSBcblx0XHRcdFx0XHRwbGFjZWhvbGRlcj17dGhpcy5wbGFjZWhvbGRlcn0gXG5cdFx0XHRcdFx0cmVmPXt0aGlzLnJlZkNhbGx9XG5cdFx0ICAgICAgICAgIFx0b25DaGFuZ2U9e3RoaXMuaW5wdXRDaGFuZ2V9XG5cdFx0ICAgICAgICAgIFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdFx0ICAgICAgICAgIFx0cmVhZE9ubHk9e3RoaXMucmVhZG9ubHl9XG5cdFx0ICAgICAgICAgIFx0cmVxdWlyZWQ9e3RoaXMucmVxdWlyZWR9XG5cdFx0ICAgICAgICAgIC8+KTtcblxuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy5sYWJsZSA9PVwiXCIpe1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgXCI+XG5cdFx0ICAgIFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbFwiPnt0aGlzLnByb3BzLmxhYmxlfTwvbGFiZWw+XG5cdFx0ICAgIFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIlwiPlxuXHRcdCAgICAgIFx0XHRcdHtpbnB1dH1cblx0XHQgICAgXHRcdDwvZGl2PlxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHQgICAgICBcdFx0e2lucHV0fVxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuZXhwb3J0IGNsYXNzIEJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy50eXBlID0gKHRoaXMucHJvcHMudHlwZSA9PT0gdW5kZWZpbmVkKSA/IFwidGV4dFwiOiB0aGlzLnByb3BzLnR5cGU7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLmRpc2FibGVkID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5kaXNhYmxlZD09ZmFsc2V8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dmFyIG91dHB1dD1cIlwiO1xuXHRcdHRoaXMuY2xhc3NOYW1lPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcImJ0blwiOiBcImJ0biBcIiArdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0dmFyIGlucHV0PSggXG5cdFx0XHQ8YnV0dG9uIFxuXHRcdFx0XHR0eXBlPXt0aGlzLnR5cGV9XG5cdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9IFxuXHRcdFx0XHR2YWx1ZT17dGhpcy52YWx1ZX1cblx0XHRcdFx0b25DbGljaz17dGhpcy5wcm9wcy5vbkNsaWNrfVxuXHRcdFx0XHRkaXNhYmxlZD17dGhpcy5kaXNhYmxlZH1cblx0XHRcdD57dGhpcy52YWx1ZX08L2J1dHRvbj5cblx0XHQpO1xuXG5cblx0XHRvdXRwdXQgPSAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0ICAgICAgXHRcdHtpbnB1dH1cblx0ICBcdFx0PC9kaXY+XG5cdCAgXHQpO1xuXG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuIiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kYWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5zdWJtaXQ9dGhpcy5zdWJtaXQuYmluZCh0aGlzKTtcblx0fVxuXHRzdWJtaXQoZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMucHJvcHMuc3VibWl0KGUpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHZhciBmb290ZXI9XCJcIjtcblx0XHRpZih0aGlzLnByb3BzLnN1Ym1pdCE9PSBmYWxzZSl7XG5cdFx0XHRmb290ZXI9KFx0XHRcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1mb290ZXJcIj5cblx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXNlY29uZGFyeVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2xvc2U8L2J1dHRvbj5cblx0XHRcdFx0XHQ8YnV0dG9uIFxuXHRcdFx0XHRcdFx0dHlwZT1cInN1Ym1pdFwiIFxuXHRcdFx0XHRcdFx0b25DbGljaz17dGhpcy5zdWJtaXR9IFxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgPlxuXHRcdFx0XHRcdFx0XHR7dGhpcy5wcm9wcy5zdWJtaXRUZXh0fVxuXHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdClcblx0XHR9XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbCBmYWRlIHRleHQtbGVmdCBwYW5lbC1kZWZhdWx0XCIgaWQ9e3RoaXMucHJvcHMuaWR9IHRhYkluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCIgYXJpYS1sYWJlbGxlZGJ5PVwiZXhhbXBsZU1vZGFsTGFiZWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2dcIiByb2xlPVwiZG9jdW1lbnRcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XG5cdFx0XHRcdFx0XHRcdDxoNCBjbGFzc05hbWU9XCJtb2RhbC10aXRsZVwiIGlkPVwiZXhhbXBsZU1vZGFsTGFiZWxcIj57dGhpcy5wcm9wcy50aXRsZX08L2g0PlxuXHRcdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBkaXNwbGF5PVwibm9uZVwiIGNsYXNzTmFtZT1cImNsb3NlIGhpZGVcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPlxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxuXHRcdFx0XHRcdFx0XHRcdHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHR7Zm9vdGVyfVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLmluaXRUYWJsZT10aGlzLmluaXRUYWJsZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY29tcG9uZW50RGlkVXBkYXRlPXRoaXMuY29tcG9uZW50RGlkVXBkYXRlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jb21wb25lbnRXaWxsVXBkYXRlPXRoaXMuY29tcG9uZW50V2lsbFVwZGF0ZS5iaW5kKHRoaXMpO1xuXG5cdH1cblxuXHRpbml0VGFibGUoKXtcblx0XHQvL1xuXHRcdC8vIGlmKHRoaXMudGFibGUgIT09IHVuZGVmaW5lZCl7XG5cdFx0Ly8gXHR0aGlzLnRhYmxlLmRlc3Ryb3koKTtcblx0XHQvLyB9XG5cdFx0dmFyIGNvbmZpZz17XG5cdCAgICBcdFwiZGVzdHJveVwiOiB0cnVlLFxuXHQgICAgXHRcInNjcm9sbFlcIjogJzcwdmgnLFxuICAgICAgICBcdFwic2Nyb2xsQ29sbGFwc2VcIjogdHJ1ZSxcblx0ICAgICAgICBcInNjcm9sbFhcIjogdHJ1ZSxcblx0ICAgICAgICBcInBhZ2luZ1wiOiAgIGZhbHNlLFxuXHQgICAgICAgIFwic3RhdGVTYXZlXCI6IHRydWUsXG5cdCAgICAgICAgXCJjb2x1bW5zXCI6IHRoaXMucHJvcHMuY29sdW1ucyxcblx0ICAgICAgICBcImluZm9cIjogICAgIGZhbHNlXG5cdCAgICB9O1xuXHQgICAgaWYodGhpcy5wcm9wcy5zZWFyY2gpe1xuXHQgICAgXHRjb25maWcuc2VhcmNoaW5nPXRydWU7XG5cdCAgICB9XG5cdCAgICBlbHNle2NvbmZpZy5zZWFyY2hpbmc9ZmFsc2U7fVxuXHQgICAgdGhpcy50YWJsZT0kKFwiI1wiK3RoaXMucHJvcHMuaWQpLkRhdGFUYWJsZShjb25maWcpO1xuXHR9XG5cdGNvbXBvbmVudFdpbGxVcGRhdGUoKXtcblxuXHRcdGlmKHRoaXMudGFibGUgIT09IHVuZGVmaW5lZCl7XG5cdFx0XHRjb25zb2xlLmxvZyhcIkRFU1RST1lcIik7XG5cdFx0XHR0aGlzLnRhYmxlLmRlc3Ryb3koKTtcblx0XHR9XG5cdH1cblx0Y29tcG9uZW50RGlkVXBkYXRlKCl7XG5cdFx0dGhpcy5pbml0VGFibGUoKTtcblx0fVxuXG5cdHJlbmRlcigpe1xuXHRcdHJldHVybihcblxuXHRcdFx0PHRhYmxlXG5cdFx0XHRcdGNsYXNzTmFtZT1cInN0cmlwZSB0YWJsZSB0YWJsZS1ib3JkZXJlZCBwcy1saXN0LXRhYmxlXCIgXG5cdFx0XHRcdHdpZHRoPVwiMTAwJVwiXG5cdFx0XHRcdGlkPXt0aGlzLnByb3BzLmlkfVxuXHRcdFx0XHQ+XG5cdFx0XHRcdHt0aGlzLnByb3BzLmNvbnRlbnR9XG5cdFx0XHQ8L3RhYmxlPlxuXHRcdCk7XG5cdH1cbn0iLCJpbXBvcnQgRG9jVGFibGUgZnJvbSAnLi4vLi4vLi4vcHVibGljL2pzL21vZHVsZXMvdXRpbHMvZG9jVGFibGUnXG5pbXBvcnQgQWNvcmRpYW5Db250ZW50IGZyb20gJy4uLy4uLy4uL3B1YmxpYy9qcy9tb2R1bGVzL3V0aWxzL2Fjb3JkaWFuQ29udGVudCdcblxuXG5jb25zdCBhcHA9ICQoJyNhcHAnKVswXTtcblxuKGZ1bmN0aW9uKCl7XG5cdHZhciBmaWx0ZXI9e307XG5cdGZyYXBwZS5yZWFkeShmdW5jdGlvbigpe1xuXHRcdHZhciB3b3Jrb3JkZXJDb25maWc9W1xuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIlZpbmV5YXJkXCIsXG5cdFx0XHRcdHZhbHVlOlwibG9jYXRpb25cIixcblx0XHRcdFx0aHJlZjpcImxvY2F0aW9uX3JvdXRlXCIsXG5cdFx0XHRcdGluVGFibGU6ZmFsc2UsXG5cdFx0XHRcdGFjdGl2ZTowLFxuXHRcdFx0XHRkZWZhdWx0OmN1cnJlbnRWaW5leWFyZFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bGFibGU6XCJTdGF0dXNcIixcblx0XHRcdFx0dmFsdWU6XCJzdGF0dXNcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bGFibGU6XCJQcmlvcml0eVwiLFxuXHRcdFx0XHR2YWx1ZTpcInByaW9yaXR5XCIsXG5cdFx0XHRcdGFjdGl2ZToxXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIlNlYXNvblwiLFxuXHRcdFx0XHR2YWx1ZTpcInNlYXNvblwiLFxuXHRcdFx0XHRhY3RpdmU6MVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bGFibGU6XCJEYXRlXCIsXG5cdFx0XHRcdHZhbHVlOlwiZGF0ZVwiLFxuXHRcdFx0XHRhY3RpdmU6MVxuXHRcdFx0fVxuXHRcdF07XG5cdFx0dmFyIGlzc3VlQ29uZmlnPVtcblx0XHRcdHtcblx0XHRcdFx0bGFibGU6XCJWaW5leWFyZFwiLFxuXHRcdFx0XHR2YWx1ZTpcInZpbmV5YXJkXCIsXG5cdFx0XHRcdGhyZWY6XCJ2aW5leWFyZF9yb3V0ZVwiLFxuXHRcdFx0XHRpblRhYmxlOmZhbHNlLFxuXHRcdFx0XHRhY3RpdmU6MCxcblx0XHRcdFx0ZGVmYXVsdDpjdXJyZW50VmluZXlhcmRcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmxlOlwiU3RhdHVzXCIsXG5cdFx0XHRcdHZhbHVlOlwic3RhdHVzXCIsXG5cdFx0XHRcdGFjdGl2ZToxXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIlByaW9yaXR5XCIsXG5cdFx0XHRcdHZhbHVlOlwicHJpb3JpdHlcIixcblx0XHRcdFx0YWN0aXZlOjFcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmxlOlwiV29yayBPcmRlclwiLFxuXHRcdFx0XHR2YWx1ZTpcIndvcmtfb3JkZXJcIixcblx0XHRcdFx0YWN0aXZlOjFcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmxlOlwiSXNzdWVcIixcblx0XHRcdFx0dmFsdWU6XCJpc3N1ZVwiLFxuXHRcdFx0XHRhY3RpdmU6MSxcblx0XHRcdFx0dHlwZTpcInRleHRhcmVhXCJcblx0XHRcdH1cblx0XHRdO1xuXHRcdHZhciBzcHJheUNvbmZpZz1bXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmxlOlwiVmluZXlhcmRcIixcblx0XHRcdFx0dmFsdWU6XCJ2aW5leWFyZFwiLFxuXHRcdFx0XHRocmVmOlwidmluZXlhcmRfcm91dGVcIixcblx0XHRcdFx0aW5UYWJsZTpmYWxzZSxcblx0XHRcdFx0YWN0aXZlOjAsXG5cdFx0XHRcdGRlZmF1bHQ6Y3VycmVudFZpbmV5YXJkXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIldvcmsgT3JkZXJcIixcblx0XHRcdFx0dmFsdWU6XCJ3b3JrX29yZGVyXCIsXG5cdFx0XHRcdGFjdGl2ZToxXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIlNlYXNvblwiLFxuXHRcdFx0XHR2YWx1ZTpcInNlYXNvblwiLFxuXHRcdFx0XHRhY3RpdmU6MVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bGFibGU6XCJOb3RlXCIsXG5cdFx0XHRcdHZhbHVlOlwibm90ZVwiLFxuXHRcdFx0XHRhY3RpdmU6MSxcblx0XHRcdFx0dHlwZTpcInRleHRhcmVhXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmxlOlwiU3ByYXkgVHlwZVwiLFxuXHRcdFx0XHR2YWx1ZTpcInNwcmF5X3R5cGVcIixcblx0XHRcdFx0YWN0aXZlOjFcblx0XHRcdH1cblx0XHRdO1xuXHRcdC8vZG9uZVxuXHRcdHZhciBwcnVubmluZ0NvbmZpZz1bXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmxlOlwiVmluZXlhcmRcIixcblx0XHRcdFx0dmFsdWU6XCJ2aW5leWFyZFwiLFxuXHRcdFx0XHRocmVmOlwidmluZXlhcmRfcm91dGVcIixcblx0XHRcdFx0aW5UYWJsZTpmYWxzZSxcblx0XHRcdFx0YWN0aXZlOjAsXG5cdFx0XHRcdGRlZmF1bHQ6Y3VycmVudFZpbmV5YXJkXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIldvcmsgT3JkZXJcIixcblx0XHRcdFx0dmFsdWU6XCJ3b3JrX29yZGVyXCIsXG5cdFx0XHRcdGFjdGl2ZToxXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIlNlYXNvblwiLFxuXHRcdFx0XHR2YWx1ZTpcInNlYXNvblwiLFxuXHRcdFx0XHRhY3RpdmU6MVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bGFibGU6XCJOb3RlXCIsXG5cdFx0XHRcdHZhbHVlOlwibm90ZVwiLFxuXHRcdFx0XHRhY3RpdmU6MSxcblx0XHRcdFx0dHlwZTpcInRleHRhcmVhXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmxlOlwiRGF0ZVwiLFxuXHRcdFx0XHR2YWx1ZTpcImRhdGVcIixcblx0XHRcdFx0YWN0aXZlOjFcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmxlOlwiU3R5bGVcIixcblx0XHRcdFx0dmFsdWU6XCJ0eXBlXCIsXG5cdFx0XHRcdGFjdGl2ZToxXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIkItTG9ja1wiLFxuXHRcdFx0XHR2YWx1ZTpcImJfbG9ja1wiLFxuXHRcdFx0XHRhY3RpdmU6MVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bGFibGU6XCJQcnVuaW5nIFJlbW92ZWRcIixcblx0XHRcdFx0dmFsdWU6XCJyZW1vdmVkXCIsXG5cdFx0XHRcdGFjdGl2ZToxXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIlByZSBQcnVuZVwiLFxuXHRcdFx0XHR2YWx1ZTpcInByZV9wcnVuZVwiLFxuXHRcdFx0XHRhY3RpdmU6MVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bGFibGU6XCJUYXAgUmVtb3ZlZFwiLFxuXHRcdFx0XHR2YWx1ZTpcInRhcF9yZW1vdmVkXCIsXG5cdFx0XHRcdGFjdGl2ZToxXG5cdFx0XHR9XG5cdFx0XTtcblx0XHR2YXIgaGFydmVzdENvbmZpZz1bXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmxlOlwiVmluZXlhcmRcIixcblx0XHRcdFx0dmFsdWU6XCJ2aW5leWFyZFwiLFxuXHRcdFx0XHRocmVmOlwidmluZXlhcmRfcm91dGVcIixcblx0XHRcdFx0aW5UYWJsZTpmYWxzZSxcblx0XHRcdFx0YWN0aXZlOjAsXG5cdFx0XHRcdGRlZmF1bHQ6Y3VycmVudFZpbmV5YXJkXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIldvcmsgT3JkZXJcIixcblx0XHRcdFx0dmFsdWU6XCJ3b3JrX29yZGVyXCIsXG5cdFx0XHRcdGFjdGl2ZToxXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIlNlYXNvblwiLFxuXHRcdFx0XHR2YWx1ZTpcInNlYXNvblwiLFxuXHRcdFx0XHRhY3RpdmU6MVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bGFibGU6XCJOb3RlXCIsXG5cdFx0XHRcdHZhbHVlOlwibm90ZVwiLFxuXHRcdFx0XHRhY3RpdmU6MSxcblx0XHRcdFx0dHlwZTpcInRleHRhcmVhXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmxlOlwiUG91bmRzXCIsXG5cdFx0XHRcdHZhbHVlOlwicG91bmRzXCIsXG5cdFx0XHRcdGFjdGl2ZToxXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIlBvc3QgSGFydmVzdCBXYXRlclwiLFxuXHRcdFx0XHR2YWx1ZTpcInBvc3RfaGFydmVzdF93YXRlclwiLFxuXHRcdFx0XHRhY3RpdmU6MVxuXHRcdFx0fVxuXHRcdF07XG5cdFx0dmFyIGJpcmROZXRzQ29uZmlnPVtcblx0XHRcdHtcblx0XHRcdFx0bGFibGU6XCJWaW5leWFyZFwiLFxuXHRcdFx0XHR2YWx1ZTpcInZpbmV5YXJkXCIsXG5cdFx0XHRcdGhyZWY6XCJ2aW5leWFyZF9yb3V0ZVwiLFxuXHRcdFx0XHRpblRhYmxlOmZhbHNlLFxuXHRcdFx0XHRhY3RpdmU6MCxcblx0XHRcdFx0ZGVmYXVsdDpjdXJyZW50VmluZXlhcmRcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmxlOlwiV29yayBPcmRlclwiLFxuXHRcdFx0XHR2YWx1ZTpcIndvcmtfb3JkZXJcIixcblx0XHRcdFx0YWN0aXZlOjFcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmxlOlwiU2Vhc29uXCIsXG5cdFx0XHRcdHZhbHVlOlwic2Vhc29uXCIsXG5cdFx0XHRcdGFjdGl2ZToxXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIk5vdGVcIixcblx0XHRcdFx0dmFsdWU6XCJub3RlXCIsXG5cdFx0XHRcdGFjdGl2ZToxLFxuXHRcdFx0XHR0eXBlOlwidGV4dGFyZWFcIlxuXHRcdFx0fVxuXHRcdF07XG5cdFx0dmFyIHdhdGVyaW5nQ29uZmlnPVtcblx0XHRcdHtcblx0XHRcdFx0bGFibGU6XCJWaW5leWFyZFwiLFxuXHRcdFx0XHR2YWx1ZTpcInZpbmV5YXJkXCIsXG5cdFx0XHRcdGhyZWY6XCJ2aW5leWFyZF9yb3V0ZVwiLFxuXHRcdFx0XHRpblRhYmxlOmZhbHNlLFxuXHRcdFx0XHRhY3RpdmU6MCxcblx0XHRcdFx0ZGVmYXVsdDpjdXJyZW50VmluZXlhcmRcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmxlOlwiV29yayBPcmRlclwiLFxuXHRcdFx0XHR2YWx1ZTpcIndvcmtfb3JkZXJcIixcblx0XHRcdFx0YWN0aXZlOjFcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmxlOlwiU2Vhc29uXCIsXG5cdFx0XHRcdHZhbHVlOlwic2Vhc29uXCIsXG5cdFx0XHRcdGFjdGl2ZToxXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIk5vdGVcIixcblx0XHRcdFx0dmFsdWU6XCJub3RlXCIsXG5cdFx0XHRcdGFjdGl2ZToxLFxuXHRcdFx0XHR0eXBlOlwidGV4dGFyZWFcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bGFibGU6XCJEdXJhdGlvblwiLFxuXHRcdFx0XHR2YWx1ZTpcImR1cmF0aW9uXCIsXG5cdFx0XHRcdGFjdGl2ZToxXG5cdFx0XHR9XG5cdFx0XTtcblx0XHR2YXIgY2Fub3B5Q29uZmlnPVtcblx0XHRcdHtcblx0XHRcdFx0bGFibGU6XCJWaW5leWFyZFwiLFxuXHRcdFx0XHR2YWx1ZTpcInZpbmV5YXJkXCIsXG5cdFx0XHRcdGhyZWY6XCJ2aW5leWFyZF9yb3V0ZVwiLFxuXHRcdFx0XHRpblRhYmxlOmZhbHNlLFxuXHRcdFx0XHRhY3RpdmU6MCxcblx0XHRcdFx0ZGVmYXVsdDpjdXJyZW50VmluZXlhcmRcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmxlOlwiV29yayBPcmRlclwiLFxuXHRcdFx0XHR2YWx1ZTpcIndvcmtfb3JkZXJcIixcblx0XHRcdFx0YWN0aXZlOjFcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmxlOlwiU2Vhc29uXCIsXG5cdFx0XHRcdHZhbHVlOlwic2Vhc29uXCIsXG5cdFx0XHRcdGFjdGl2ZToxXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIk5vdGVcIixcblx0XHRcdFx0dmFsdWU6XCJub3RlXCIsXG5cdFx0XHRcdGFjdGl2ZToxLFxuXHRcdFx0XHR0eXBlOlwidGV4dGFyZWFcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bGFibGU6XCJUeXBlXCIsXG5cdFx0XHRcdHZhbHVlOlwidHlwZVwiLFxuXHRcdFx0XHRhY3RpdmU6MVxuXHRcdFx0fVxuXHRcdF07XG5cdFx0dmFyIGJyaXhDb25maWc9W1xuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIlZpbmV5YXJkXCIsXG5cdFx0XHRcdHZhbHVlOlwidmluZXlhcmRcIixcblx0XHRcdFx0aHJlZjpjdXJyZW50VmluZXlhcmQsXG5cdFx0XHRcdGluVGFibGU6ZmFsc2UsXG5cdFx0XHRcdGFjdGl2ZTowLFxuXHRcdFx0XHRkZWZhdWx0OlwiQ1JWIFZpbmVzXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmxlOlwiU2Vhc29uXCIsXG5cdFx0XHRcdHZhbHVlOlwic2Vhc29uXCIsXG5cdFx0XHRcdGFjdGl2ZToxXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIk5vdGVcIixcblx0XHRcdFx0dmFsdWU6XCJub3RlXCIsXG5cdFx0XHRcdGFjdGl2ZToxLFxuXHRcdFx0XHR0eXBlOlwidGV4dGFyZWFcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bGFibGU6XCJCcml4IEFcIixcblx0XHRcdFx0dmFsdWU6XCJicml4X2FcIixcblx0XHRcdFx0YWN0aXZlOjFcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmxlOlwiQnJpeCBCXCIsXG5cdFx0XHRcdHZhbHVlOlwiYnJpeF9iXCIsXG5cdFx0XHRcdGFjdGl2ZToxXG5cdFx0XHR9XG5cdFx0XTtcblx0XHRSZWFjdERPTS5yZW5kZXIoIDxkaXY+XG5cdFx0XHQ8QWNvcmRpYW5Db250ZW50XG5cdFx0XHRcdHRpdGxlPVwiV29ya29yZGVyIFRhYmxlXCJcblx0XHRcdFx0YWN0aXZlPXtmYWxzZX1cblx0XHRcdFx0cGFyZW50SWQ9XCJ3b3JrX29yZGVyXCJcblx0XHRcdFx0aWQ9XCJXb3Jrb3JkZXJBY29yZGlhblwiID4gXG5cdFx0XHRcdDxEb2NUYWJsZSBcblx0XHRcdFx0XHRzZWFyY2g9e2ZhbHNlfVxuXHRcdFx0XHRcdGRvY3R5cGU9XCJ3b3JrX29yZGVyXCJcblx0XHRcdFx0XHRpZD1cIldvcmtvcmRlclRhYmxlXCJcblx0XHRcdFx0XHRmaWx0ZXI9eyB7bG9jYXRpb246Y3VycmVudFZpbmV5YXJkfSB9XG5cdFx0XHRcdFx0Y29uZmlnPXt3b3Jrb3JkZXJDb25maWd9XG5cdFx0XHRcdFx0ZWRpdGFibGU9ezF9XG5cdFx0XHRcdC8+IFxuXHRcdFx0PC9BY29yZGlhbkNvbnRlbnQ+XG5cdFx0XHQ8QWNvcmRpYW5Db250ZW50XG5cdFx0XHRcdHRpdGxlPVwiSXNzdWUgVGFibGVcIlxuXHRcdFx0XHRhY3RpdmU9e2ZhbHNlfVxuXHRcdFx0XHRwYXJlbnRJZD1cIklzc3VlXCJcblx0XHRcdFx0aWQ9XCJJc3N1ZUFjb3JkaWFuXCI+IFxuXHRcdFx0XHQ8RG9jVGFibGUgXG5cdFx0XHRcdFx0c2VhcmNoPXtmYWxzZX1cblx0XHRcdFx0XHRkb2N0eXBlPVwiSXNzdWVcIlxuXHRcdFx0XHRcdGlkPVwiSXNzdWVUYWJsZVwiXG5cdFx0XHRcdFx0ZmlsdGVyPXsge3ZpbmV5YXJkOmN1cnJlbnRWaW5leWFyZH0gfVxuXHRcdFx0XHRcdGNvbmZpZz17aXNzdWVDb25maWd9XG5cdFx0XHRcdFx0ZWRpdGFibGU9ezF9XG5cdFx0XHRcdC8+IFxuXHRcdFx0PC9BY29yZGlhbkNvbnRlbnQ+XG5cdFx0XHQ8QWNvcmRpYW5Db250ZW50XG5cdFx0XHRcdGNsYXNzTmFtZT1cInRhYmxlUGFuZWxcIlxuXHRcdFx0XHR0aXRsZT1cIlNwcmF5aW5nIFRhYmxlXCJcblx0XHRcdFx0YWN0aXZlPXtmYWxzZX1cblx0XHRcdFx0cGFyZW50SWQ9XCJTcHJheWluZ1wiXG5cdFx0XHRcdGlkPVwiU3ByYXlpbmdcIiA+IFxuXHRcdFx0XHQ8RG9jVGFibGUgXG5cdFx0XHRcdFx0c2VhcmNoPXtmYWxzZX1cblx0XHRcdFx0XHRkb2N0eXBlPVwiU3ByYXlpbmdcIlxuXHRcdFx0XHRcdGlkPVwiZG9jdGFibGVcIlxuXHRcdFx0XHRcdGZpbHRlcj17IHt2aW5leWFyZDpjdXJyZW50VmluZXlhcmR9IH1cblx0XHRcdFx0XHRjb25maWc9e3NwcmF5Q29uZmlnfVxuXHRcdFx0XHRcdGVkaXRhYmxlPXsxfVxuXHRcdFx0XHQvPiBcblx0XHRcdDwvQWNvcmRpYW5Db250ZW50PlxuXHRcdFx0PEFjb3JkaWFuQ29udGVudFxuXHRcdFx0XHRjbGFzc05hbWU9XCJ0YWJsZVBhbmVsXCJcblx0XHRcdFx0dGl0bGU9XCJQcnVuaW5nIFRhYmxlXCJcblx0XHRcdFx0YWN0aXZlPXtmYWxzZX1cblx0XHRcdFx0cGFyZW50SWQ9XCJwcnVuaW5nXCJcblx0XHRcdFx0aWQ9XCJwcnVuaW5nXCI+IFxuXHRcdFx0XHQ8RG9jVGFibGUgXG5cdFx0XHRcdFx0c2VhcmNoPXtmYWxzZX1cblx0XHRcdFx0XHRkb2N0eXBlPVwiUHJ1bmluZ1wiXG5cdFx0XHRcdFx0aWQ9XCJQcnVuaW5nVGFibGVcIlxuXHRcdFx0XHRcdGZpbHRlcj17IHt2aW5leWFyZDpjdXJyZW50VmluZXlhcmR9IH1cblx0XHRcdFx0XHRjb25maWc9e3BydW5uaW5nQ29uZmlnfVxuXHRcdFx0XHRcdGVkaXRhYmxlPXsxfVxuXHRcdFx0XHQvPiBcblx0XHRcdDwvQWNvcmRpYW5Db250ZW50PlxuXHRcdFx0PEFjb3JkaWFuQ29udGVudFxuXHRcdFx0XHRjbGFzc05hbWU9XCJ0YWJsZVBhbmVsXCJcblx0XHRcdFx0dGl0bGU9XCJIYXJ2ZXN0IFRhYmxlXCJcblx0XHRcdFx0YWN0aXZlPXtmYWxzZX1cblx0XHRcdFx0cGFyZW50SWQ9XCJoYXJ2ZXN0XCJcblx0XHRcdFx0aWQ9XCJoYXJ2ZXN0QWNvcmRpYW5cIj4gXG5cdFx0XHRcdDxEb2NUYWJsZSBcblx0XHRcdFx0XHRzZWFyY2g9e2ZhbHNlfVxuXHRcdFx0XHRcdGRvY3R5cGU9XCJIYXJ2ZXN0XCJcblx0XHRcdFx0XHRpZD1cIkhhcnZlc3RUYWJsZVwiXG5cdFx0XHRcdFx0ZmlsdGVyPXsge3ZpbmV5YXJkOmN1cnJlbnRWaW5leWFyZH0gfVxuXHRcdFx0XHRcdGNvbmZpZz17aGFydmVzdENvbmZpZ31cblx0XHRcdFx0XHRlZGl0YWJsZT17MX1cblx0XHRcdFx0Lz4gXG5cdFx0XHQ8L0Fjb3JkaWFuQ29udGVudD5cblx0XHRcdDxBY29yZGlhbkNvbnRlbnRcblx0XHRcdFx0Y2xhc3NOYW1lPVwidGFibGVQYW5lbFwiXG5cdFx0XHRcdHRpdGxlPVwiQmlyZCBOZXRzIFRhYmxlXCJcblx0XHRcdFx0YWN0aXZlPXtmYWxzZX1cblx0XHRcdFx0cGFyZW50SWQ9XCJiaXJkbmV0c1wiXG5cdFx0XHRcdGlkPVwiYmlyZE5ldHNBY29yZGlhblwiPiBcblx0XHRcdFx0PERvY1RhYmxlIFxuXHRcdFx0XHRcdHNlYXJjaD17ZmFsc2V9XG5cdFx0XHRcdFx0ZG9jdHlwZT1cIkJpcmQgTmV0c1wiXG5cdFx0XHRcdFx0aWQ9XCJiaXJkTmV0c1RhYmxlXCJcblx0XHRcdFx0XHRmaWx0ZXI9eyB7dmluZXlhcmQ6Y3VycmVudFZpbmV5YXJkfSB9XG5cdFx0XHRcdFx0Y29uZmlnPXtiaXJkTmV0c0NvbmZpZ31cblx0XHRcdFx0XHRlZGl0YWJsZT17MX1cblx0XHRcdFx0Lz4gXG5cdFx0XHQ8L0Fjb3JkaWFuQ29udGVudD5cblx0XHRcdDxBY29yZGlhbkNvbnRlbnRcblx0XHRcdFx0Y2xhc3NOYW1lPVwidGFibGVQYW5lbFwiXG5cdFx0XHRcdHRpdGxlPVwiV2F0ZXJpbmcgVGFibGVcIlxuXHRcdFx0XHRhY3RpdmU9e2ZhbHNlfVxuXHRcdFx0XHRwYXJlbnRJZD1cIndhdGVyaW5nXCJcblx0XHRcdFx0aWQ9XCJ3YXRlcmluZ0Fjb3JkaWFuXCI+IFxuXHRcdFx0XHQ8RG9jVGFibGUgXG5cdFx0XHRcdFx0c2VhcmNoPXtmYWxzZX1cblx0XHRcdFx0XHRkb2N0eXBlPVwiV2F0ZXJpbmdcIlxuXHRcdFx0XHRcdGlkPVwiV2F0ZXJpbmdUYWJsZVwiXG5cdFx0XHRcdFx0ZmlsdGVyPXsge3ZpbmV5YXJkOmN1cnJlbnRWaW5leWFyZH0gfVxuXHRcdFx0XHRcdGNvbmZpZz17d2F0ZXJpbmdDb25maWd9XG5cdFx0XHRcdFx0ZWRpdGFibGU9ezF9XG5cdFx0XHRcdC8+IFxuXHRcdFx0PC9BY29yZGlhbkNvbnRlbnQ+XG5cdFx0XHQ8QWNvcmRpYW5Db250ZW50XG5cdFx0XHRcdGNsYXNzTmFtZT1cInRhYmxlUGFuZWxcIlxuXHRcdFx0XHR0aXRsZT1cIkNhbm9weSBUYWJsZVwiXG5cdFx0XHRcdGFjdGl2ZT17ZmFsc2V9XG5cdFx0XHRcdHBhcmVudElkPVwiY2Fub3B5XCJcblx0XHRcdFx0aWQ9XCJjYW5vcHlBY29yZGlhblwiPiBcblx0XHRcdFx0PERvY1RhYmxlIFxuXHRcdFx0XHRcdHNlYXJjaD17ZmFsc2V9XG5cdFx0XHRcdFx0ZG9jdHlwZT1cIkNhbm9weVwiXG5cdFx0XHRcdFx0aWQ9XCJjYW5vcHlUYWJsZVwiXG5cdFx0XHRcdFx0ZmlsdGVyPXsge3ZpbmV5YXJkOmN1cnJlbnRWaW5leWFyZH0gfVxuXHRcdFx0XHRcdGNvbmZpZz17Y2Fub3B5Q29uZmlnfVxuXHRcdFx0XHRcdGVkaXRhYmxlPXsxfVxuXHRcdFx0XHQvPiBcblx0XHRcdDwvQWNvcmRpYW5Db250ZW50PlxuXHRcdFx0PEFjb3JkaWFuQ29udGVudFxuXHRcdFx0XHRjbGFzc05hbWU9XCJ0YWJsZVBhbmVsXCJcblx0XHRcdFx0dGl0bGU9XCJCcml4IFRhYmxlXCJcblx0XHRcdFx0YWN0aXZlPXtmYWxzZX1cblx0XHRcdFx0cGFyZW50SWQ9XCJicml4XCJcblx0XHRcdFx0aWQ9XCJicml4QWNvcmRpYW5cIj4gXG5cdFx0XHRcdDxEb2NUYWJsZSBcblx0XHRcdFx0XHRzZWFyY2g9e2ZhbHNlfVxuXHRcdFx0XHRcdGRvY3R5cGU9XCJCcml4XCJcblx0XHRcdFx0XHRpZD1cImJyaXhUYWJsZVwiXG5cdFx0XHRcdFx0ZmlsdGVyPXsge30gfVxuXHRcdFx0XHRcdGNvbmZpZz17YnJpeENvbmZpZ31cblx0XHRcdFx0XHRlZGl0YWJsZT17MX1cblx0XHRcdFx0Lz4gXG5cdFx0XHQ8L0Fjb3JkaWFuQ29udGVudD5cblx0XHRcdDwvZGl2PlxuXG5cdFx0LCBhcHAgKTtcblx0XHQvLyQoJy50YWJsZVBhbmVsJykuY29sbGFwc2UoJ2hpZGUnKTtcblx0fSlcblx0XG59KSgpOyAgXG5cbi8vJCgnLnRhYmxlUGFuZWwnKS5jb2xsYXBzZSgnaGlkZScpO1xuIl19
