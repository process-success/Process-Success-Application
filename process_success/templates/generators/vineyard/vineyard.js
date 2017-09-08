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
			if (this.props.close) {
				fields.push({
					field: "button",
					type: "submit",
					value: "Create " + this.props.doctype + " Entry",
					className: "btn-primary pull-right " + createHidden,
					onClick: this.submit
				});
			}
			if (this.props.create) {
				fields.push({
					field: "button",
					value: "Close",
					className: "pull-right " + editHidden,
					onClick: function (e) {
						e.preventDefault();this.props.close();
					}.bind(this)
				});
			}
			if (this.props.delete) {
				fields.push({
					field: "button",
					type: "submit",
					value: "Delete",
					className: "btn-danger pull-right " + editHidden,
					onClick: this.delete
				});
			}
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
			console.log("render area");
			var output = {};
			if (this.state.items !== null) {
				var fields = this.createFormJson();
				console.log(fields);
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
				"HORE",
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
					var optinal = ["value", "lable", "options", "className", "readonly", "disabled", "require"];
					var props = ps.initProps(optinal, item);
					return React.createElement(Select, {
						key: this.props.id + index,
						value: props.value,
						className: props.className,
						lable: props.lable,
						options: props.options,
						readonly: props.readonly,
						disabled: props.disabled,
						required: props.required,
						inputChanged: function inputChanged(e) {
							item.onChange(e);
						}
					});
				}.bind(this),
				check: function (item, index) {
					var props = ["value", "lable", "className", "readonly", "disabled", "require", "value"];
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
					var props = ["value", "lable", "className", "readonly", "disabled", "require", "value", "rows"];
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
					var optinal = ["value", "className", "disabled", "icon"];
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
							{ key: this.props.id + index, className: rowClass },
							formTypes[item.field](item, index)
						));
					} else {
						form.push(React.createElement(
							"div",
							{ key: this.props.id + index, className: rowClass },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdXRpbHMvYWNvcmRpYW5Db250ZW50LmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9kb2NUYWJsZS5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdXRpbHMvZG9jdHlwZUZvcm0uanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL3V0aWxzL2Zvcm1zLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9tb2RhbC5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdXRpbHMvdGFibGUuanN4IiwicHJvY2Vzc19zdWNjZXNzL3RlbXBsYXRlcy9nZW5lcmF0b3JzL3ZpbmV5YXJkL3ZpbmV5YXJkLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0lDQXFCLGU7OztBQUNwQiwwQkFBWSxLQUFaLEVBQWtCO0FBQUE7O0FBQUEsZ0lBQ1gsS0FEVzs7QUFFakIsUUFBSyxVQUFMLEdBQWtCLE1BQUssVUFBTCxDQUFnQixJQUFoQixPQUFsQjtBQUNBLFVBQVEsR0FBUixDQUFZLE1BQUssS0FBTCxDQUFXLFNBQXZCO0FBSGlCO0FBSWpCOzs7OzZCQUNVLEUsRUFBRzs7QUFFYixVQUNDO0FBQUE7QUFBQSxNQUFLLFdBQVUsZUFBZjtBQUNDLFdBQUssS0FETjtBQUVDLGNBQ0MsWUFBVTtBQUNULGNBQVEsR0FBUixDQUFZLEtBQUssS0FBTCxDQUFXLFNBQXZCO0FBQ0EsY0FBUSxHQUFSLENBQVksS0FBSyxLQUFMLENBQVcsU0FBWCxJQUFzQixLQUFsQztBQUNBLFVBQUcsS0FBSyxLQUFMLENBQVcsU0FBWCxJQUFzQixLQUF6QixFQUErQjtBQUM5QixTQUFFLE1BQUksRUFB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VDtBQUVDLGNBQVEsTUFGVDtBQUdDLFNBQUcsV0FISjtBQUlDLGFBQVMsRUFKVjtBQUtDLGFBQVEsVUFMVDtBQU1DLGVBQVU7QUFOWDtBQU5EO0FBdkhnQixHQUFqQixFQXdJRSxHQXhJRjtBQXlJQTtBQUNBLEVBMWJEO0FBNGJBLENBOWJEOztBQWdjQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBBY29yZGlhbkNvbnRlbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5yZW5kZXJIZWFkID0gdGhpcy5yZW5kZXJIZWFkLmJpbmQodGhpcyk7XG5cdFx0Y29uc29sZS5sb2codGhpcy5wcm9wcy50b2dnbGVBbGwpO1xuXHR9XG5cdHJlbmRlckhlYWQoaWQpe1xuXG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYW5lbC1oZWFkaW5nXCIgXG5cdFx0XHRcdHJvbGU9XCJ0YWJcIiBcblx0XHRcdFx0b25DbGljaz17XG5cdFx0XHRcdFx0ZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKHRoaXMucHJvcHMudG9nZ2xlQWxsKTtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKHRoaXMucHJvcHMudG9nZ2xlQWxsPT1mYWxzZSk7XG5cdFx0XHRcdFx0XHRpZih0aGlzLnByb3BzLnRvZ2dsZUFsbD09ZmFsc2Upe1xuXHRcdFx0XHRcdFx0XHQkKCcjJytpZCkuY29sbGFwc2UoJ3RvZ2dsZScpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGlkKTtcblx0XHRcdFx0XHRcdFx0JCgnIycrdGhpcy5wcm9wcy5wYXJlbnRJZCsnIC5hY29yZGlhbi1jb250ZW50LmluJykubm90KCcjJytpZCkuY29sbGFwc2UoJ2hpZGUnKTtcblx0XHRcdFx0XHRcdFx0JCgnIycraWQpLmNvbGxhcHNlKCd0b2dnbGUnKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LmJpbmQodGhpcylcblx0XHRcdFx0fVxuXHRcdFx0XHQ+XG5cdFx0XHRcdDxoNCBjbGFzc05hbWU9XCJwYW5lbC10aXRsZVwiPlxuXHRcdFx0XHRcdDxhIHJvbGU9XCJidXR0b25cIiBkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCIgZGF0YS1wYXJlbnQ9eycjJyt0aGlzLnByb3BzLnBhcmVudElkfSBhcmlhLWV4cGFuZGVkPXsodGhpcy5wcm9wcy5hY3RpdmUpPyB0cnVlOmZhbHNlfSAgPlxuXHRcdFx0ICBcdFx0XHR7dGhpcy5wcm9wcy50aXRsZX1cblx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdDwvaDQ+XG5cdFx0XHRcdHt0aGlzLnByb3BzLmV4dHJhSGVhZH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dmFyIGlkID10aGlzLnByb3BzLmlkO1xuXHRcdHZhciBjbGFzc05hbWU9KHRoaXMucHJvcHMuYWN0aXZlKT8gXCJhY29yZGlhbi1jb250ZW50IHBhbmVsLWNvbGxhcHNlIGNvbGxhcHNlIGluXCI6XCJhY29yZGlhbi1jb250ZW50IHBhbmVsLWNvbGxhcHNlIGNvbGxhcHNlXCI7XG5cdFx0aWYodGhpcy5wcm9wcy5jbGFzc05hbWUpe1xuXHRcdFx0Y2xhc3NOYW1lPWNsYXNzTmFtZStcIiBcIit0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHR9XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFuZWwgcGFuZWwtZGVmYXVsdCBhY29yZGlhbi1wYW5lbFwiPlxuXHRcdFx0XHR7dGhpcy5yZW5kZXJIZWFkKGlkKX1cblx0XHRcdFx0PGRpdiBpZD17aWR9IFxuXHRcdFx0XHRcdGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBcblx0XHRcdFx0XHRyb2xlPVwidGFicGFuZWxcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWJvZHlcIj5cblx0XHRcdFx0XHRcdHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG4gIFx0XHQpO1xuXHR9XG59XG4iLCJpbXBvcnQgRG9jdHlwZUZvcm0gZnJvbSAnLi4vdXRpbHMvZG9jdHlwZUZvcm0nXG5pbXBvcnQgVGFibGUgZnJvbSAnLi4vdXRpbHMvdGFibGUnXG5pbXBvcnQgTW9kYWwgZnJvbSAnLi4vdXRpbHMvbW9kYWwnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY1RhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMucmV0dXJuQ29sdW1ucz10aGlzLnJldHVybkNvbHVtbnMuYmluZCh0aGlzKTtcblx0XHR0aGlzLnRhYmxlQ2hhbmdlPXRoaXMudGFibGVDaGFuZ2UuYmluZCh0aGlzKTtcblx0XHR0aGlzLnJldHVybkNvbnRlbnQ9dGhpcy5yZXR1cm5Db250ZW50LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5lZGl0YWJsZUNvbnRlbnQ9dGhpcy5lZGl0YWJsZUNvbnRlbnQuYmluZCh0aGlzKTtcblx0XHRjb25zb2xlLmxvZyh0aGlzLnByb3BzLmZpbHRlcik7XG5cdFx0dGhpcy50YWJsZVRvb2wgPSBuZXcgcHMuYXBpVG9vbCh0aGlzLnByb3BzLmZpbHRlcix7ZG9jdHlwZTp0aGlzLnByb3BzLmRvY3R5cGV9LHRoaXMudGFibGVDaGFuZ2UpO1xuXHRcdHRoaXMuc3RhdGU9e1xuXHRcdFx0aXRlbXM6dGhpcy50YWJsZVRvb2wuaXRlbXMsXG5cdFx0XHRjdXJyZW50SXRlbTp7fSxcblx0XHRcdGZvcm1Nb2RlOlwiY3JlYXRlXCJcblxuXHRcdH07XG5cdFx0dGhpcy5tb2RhbElEPXRoaXMucHJvcHMuaWQrXCJfZm9ybV9tb2RhbFwiO1xuXHR9XG4gIFx0dGFibGVDaGFuZ2UoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtpdGVtczp0aGlzLnRhYmxlVG9vbC5pdGVtc30pO1xuXHR9XG5cdHJldHVybkNvbHVtbnMoKXtcblx0XHR2YXIgY29sdW1ucyA9W107XG5cdFx0Zm9yKHZhciB4PTA7IHggPCB0aGlzLnByb3BzLmNvbmZpZy5sZW5ndGg7IHgrKyl7XG5cdFx0XHR2YXIgaXRlbT10aGlzLnByb3BzLmNvbmZpZ1t4XTtcblx0XHRcdGlmKGl0ZW0uaW5UYWJsZSE9PWZhbHNlKXtcblx0XHRcdFx0Y29sdW1ucy5wdXNoKHt0aXRsZTppdGVtLmxhYmxlfSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHRoaXMucHJvcHMuZWRpdGFibGUpe1xuXHRcdFx0Y29sdW1ucy5wdXNoKHt0aXRsZTpcIkVkaXRcIn0pO1xuXHRcdH1cblxuXHRcdHJldHVybiBjb2x1bW5zO1xuXHR9XG5cdHJldHVybkNvbnRlbnQoKXtcblx0XHR2YXIgY29udGVudD1bXTtcblx0XHRpZih0aGlzLnN0YXRlLml0ZW1zIT09bnVsbCl7XG5cdFx0XHR0aGlzLnN0YXRlLml0ZW1zLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCl7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGl0ZW0pO1xuXHRcdFx0XHR2YXIgdGRjb250ZW50PVtdO1xuXHRcdFx0XHRmb3IodmFyIHg9MDsgeCA8IHRoaXMucHJvcHMuY29uZmlnLmxlbmd0aDsgeCsrKXtcblx0XHRcdFx0XHR2YXIgY29uZmlnPXRoaXMucHJvcHMuY29uZmlnW3hdO1xuXHRcdFx0XHRcdGlmKGNvbmZpZy5pblRhYmxlIT09ZmFsc2Upe1xuXHRcdFx0XHRcdFx0aWYoY29uZmlnLmhyZWYpe1xuXHRcdFx0XHRcdFx0XHR0ZGNvbnRlbnQucHVzaCg8dGQga2V5PXt0aGlzLnByb3BzLmlkICsgaW5kZXggKyBcIl9cIiArIHh9ID48YSBocmVmPXtpdGVtW2NvbmZpZy5ocmVmXX0gPntpdGVtW2NvbmZpZy52YWx1ZV19PC9hPjwvdGQ+KVxuXHRcdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHRcdGlmKGl0ZW1bY29uZmlnLnZhbHVlXT09PXRydWUpe1xuXHRcdFx0XHRcdFx0XHRcdHRkY29udGVudC5wdXNoKDx0ZD4xPC90ZD4pXG5cdFx0XHRcdFx0XHRcdH1lbHNlIGlmIChpdGVtW2NvbmZpZy52YWx1ZV09PT1mYWxzZSl7XG5cdFx0XHRcdFx0XHRcdFx0dGRjb250ZW50LnB1c2goPHRkPjA8L3RkPilcblx0XHRcdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHRcdFx0dGRjb250ZW50LnB1c2goPHRkPntpdGVtW2NvbmZpZy52YWx1ZV19PC90ZD4pXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYodGhpcy5wcm9wcy5lZGl0YWJsZSl7XG5cdFx0XHRcdFx0dGRjb250ZW50LnB1c2goXG5cdFx0XHRcdFx0XHQ8dGQga2V5PXt0aGlzLnByb3BzLmlkICsgaW5kZXggKyBcIl9cIiArIHh9ID5cblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiBcblx0XHRcdFx0XHRcdFx0XHR0eXBlPVwiYnV0dG9uXCIgXG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0IGlubGluZS10YXNrXCJcblx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXtcblx0XHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGZvcm1Nb2RlOlwiZWRpdFwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGN1cnJlbnRJdGVtOml0ZW1cblx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdCQoXCIjXCIrdGhpcy5tb2RhbElEKS5tb2RhbCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpXG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRFZGl0IDxzcGFuIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tZWRpdFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0PC9idXR0b24+XG5cblx0XHRcdFx0XHRcdDwvdGQ+XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjb250ZW50LnB1c2goKFxuXHRcdFx0XHRcdDx0ciBrZXk9e3RoaXMucHJvcHMuaWQgKyBpbmRleH0+XG5cdFx0XHRcdFx0XHR7dGRjb250ZW50fVxuXHRcdFx0XHRcdDwvdHI+XG5cdFx0XHRcdCkpO1x0XG5cdFx0XHR9LmJpbmQodGhpcykpO1xuXHRcdH1cblx0XHRyZXR1cm4gKDx0Ym9keT57Y29udGVudH08L3Rib2R5Pik7XG5cdH1cblx0ZWRpdGFibGVDb250ZW50KCl7XG5cdFx0dmFyIGZvcm1Qcm9wcz17fTtcblx0XHRmb3JtUHJvcHMuZG9jdHlwZT10aGlzLnByb3BzLmRvY3R5cGU7XG5cdFx0Zm9yKHZhciB4PTA7IHggPCB0aGlzLnByb3BzLmNvbmZpZy5sZW5ndGg7IHgrKyl7XG5cdFx0XHR2YXIgY29uZmlnPXRoaXMucHJvcHMuY29uZmlnW3hdO1xuXHRcdFx0Zm9ybVByb3BzW2NvbmZpZy52YWx1ZV09Y29uZmlnO1xuXHRcdH1cblx0XHR2YXIgZm9ybT0oXG5cblx0XHRcdFx0PERvY3R5cGVGb3JtIFxuXHRcdFx0XHRcdGNsb3NlPXtmdW5jdGlvbigpeyQoXCIjXCIrdGhpcy5tb2RhbElEKS5tb2RhbCgnaGlkZScpO30uYmluZCh0aGlzKX1cblx0XHRcdFx0XHRpdGVtQ2hhbmdlPXtcblx0XHRcdFx0XHRcdGZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtjdXJyZW50SXRlbTppdGVtfSl9LmJpbmQodGhpcylcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjcmVhdGU9e1xuXHRcdFx0XHRcdFx0ZnVuY3Rpb24oaXRlbSxkb2N0eXBlKXtcblx0XHRcdFx0XHRcdFx0Zm9yKHZhciB4PTA7IHggPCB0aGlzLnByb3BzLmNvbmZpZy5sZW5ndGg7IHgrKyl7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGNvbmZpZz10aGlzLnByb3BzLmNvbmZpZ1t4XTtcblx0XHRcdFx0XHRcdFx0XHRpZihjb25maWcuZGVmYXVsdCl7XG5cdFx0XHRcdFx0XHRcdFx0XHRpdGVtW2NvbmZpZy52YWx1ZV0gPSBjb25maWcuZGVmYXVsdDtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aXRlbS5kb2N0eXBlPWRvY3R5cGU7XG5cdFx0XHRcdFx0XHRcdHRoaXMudGFibGVUb29sLmNyZWF0ZShpdGVtKTtcblx0XHRcdFx0XHRcdFx0JCgnIycrdGhpcy5tb2RhbElEKS5tb2RhbCgndG9nZ2xlJyk7XG5cdFx0XHRcdFx0XHR9LmJpbmQodGhpcylcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWRpdD17ZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdFx0XHR0aGlzLnRhYmxlVG9vbC51cGRhdGUoaXRlbSk7XG5cdFx0XHRcdFx0XHQkKCcjJyt0aGlzLm1vZGFsSUQpLm1vZGFsKCd0b2dnbGUnKTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcyl9XG5cdFx0XHRcdFx0ZGVsZXRlPXtmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0XHRcdCAgdGhpcy50YWJsZVRvb2wuZGVsZXRlKGl0ZW0pO1xuXHRcdFx0XHRcdFx0JCgnIycrdGhpcy5tb2RhbElEKS5tb2RhbCgndG9nZ2xlJyk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpfVxuXHRcdFx0XHRcdG1vZGU9e3RoaXMuc3RhdGUuZm9ybU1vZGV9XG5cdFx0XHRcdFx0aXRlbT17dGhpcy5zdGF0ZS5jdXJyZW50SXRlbX1cblx0XHRcdFx0XHRpZD1cInRoaW5nXCJcblx0XHRcdFx0Lz5cblx0XHQpO1xuXHRcdFxuXHRcdC8vbG9vcCB0aGUgY29uZmlnIHRvIGNyZWF0ZSBmb3JtIGl0ZW1zXG5cblx0XHRmb3JtPVJlYWN0LmNsb25lRWxlbWVudChmb3JtICxmb3JtUHJvcHMpO1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8YnV0dG9uIFxuXHRcdFx0XHRcdHR5cGU9XCJidXR0b25cIiBcblx0XHRcdFx0XHRjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBcblx0XHRcdFx0XHRvbkNsaWNrPXtmdW5jdGlvbigpe1xuXHRcdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0XHRcdGZvcm1Nb2RlOlwiY3JlYXRlXCIsXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRJdGVtOnt9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdCQoXCIjXCIrdGhpcy5tb2RhbElEKS5tb2RhbCgpO1xuXHRcdFx0XHRcdH0uYmluZCh0aGlzKX1cblx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0Q3JlYXRlIHt0aGlzLnByb3BzLmRvY3R5cGV9IDxzcGFuIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tcGx1c1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cblx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdDxNb2RhbCBcblx0XHRcdFx0XHRpZD17dGhpcy5tb2RhbElEfVxuXHRcdFx0XHRcdHN1Ym1pdFRleHQ9XCJTdWJtaXRcIiBcblx0XHRcdFx0XHR0aXRsZT17XCJDcmVhdGUgXCIgKyB0aGlzLnByb3BzLmRvY3R5cGV9XG5cdFx0XHRcdFx0c3VibWl0PXtmYWxzZX1cblx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0e2Zvcm19XG5cdFx0XHRcdDwvTW9kYWw+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdCk7XG5cdH1cblx0c29tZUZ1bmN0aW9uKCl7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dmFyIGZvcm09XCJcIjtcblx0XHRpZih0aGlzLnByb3BzLmVkaXRhYmxlKXtcblx0XHRcdGZvcm09dGhpcy5lZGl0YWJsZUNvbnRlbnQoKTtcblx0XHR9XG5cdFx0dmFyIGNvbHVtbnM9dGhpcy5yZXR1cm5Db2x1bW5zKCk7XG5cdFx0dmFyIGNvbnRlbnQ9dGhpcy5yZXR1cm5Db250ZW50KCk7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PFRhYmxlIFxuXHRcdFx0XHRcdGlkPXt0aGlzLnByb3BzLmlkfVxuXHRcdFx0XHRcdHRpdGxlPVwiU3ByYXkgVGFibGVcIlxuXHRcdFx0XHRcdGNvbnRlbnQ9e2NvbnRlbnR9XG5cdFx0XHRcdFx0Y29sdW1ucz17Y29sdW1uc31cblx0XHRcdFx0Lz5cblx0XHRcdFx0e2Zvcm19XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59IiwiaW1wb3J0IEZvcm0gZnJvbSAnLi4vdXRpbHMvZm9ybXMnXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdHlwZUZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5jb21wb25lbnRXaWxsVXBkYXRlPXRoaXMuY29tcG9uZW50V2lsbFVwZGF0ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZG9jdHlwZVRvb2xVcGRhdGU9dGhpcy5kb2N0eXBlVG9vbFVwZGF0ZS5iaW5kKHRoaXMpO1xuXG5cdFx0dGhpcy5zdWJtaXQ9dGhpcy5zdWJtaXQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnNhdmU9dGhpcy5zYXZlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5kZWxldGU9dGhpcy5kZWxldGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmRvY3R5cGVUb29sID0gbmV3IHBzLmFwaVRvb2woe25hbWU6dGhpcy5wcm9wcy5kb2N0eXBlfSx7ZG9jdHlwZTonRG9jVHlwZSd9LHRoaXMuZG9jdHlwZVRvb2xVcGRhdGUsdGhpcy5mb3JjZVVwZGF0ZSk7XG5cdFx0dGhpcy5zdGF0ZT17aXRlbXM6dGhpcy5kb2N0eXBlVG9vbC5pdGVtc307XG5cdFx0Ly90aGlzLmRvY3R5cGVUb29sID0gbmV3IHBzLmFwaVRvb2woe25hbWU6dGhpcy5wcm9wcy5kb2N0eXBlfSx7ZG9jdHlwZTonRG9jVHlwZSd9LHRoaXMuZG9jdHlwZVRvb2xVcGRhdGUpO1xuXHR9XG5cdGNvbXBvbmVudFdpbGxVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpe1xuXHRcdGlmKHRoaXMucHJvcHMuZG9jdHlwZSAhPSBuZXh0UHJvcHMuZG9jdHlwZSl7XG5cdFx0XHR0aGlzLmRvY3R5cGVUb29sID0gbmV3IHBzLmFwaVRvb2woe25hbWU6bmV4dFByb3BzLmRvY3R5cGV9LHtkb2N0eXBlOidEb2NUeXBlJ30sdGhpcy5kb2N0eXBlVG9vbFVwZGF0ZSx0aGlzLmZvcmNlVXBkYXRlKTtcblx0XHR9XG5cdH1cblx0ZG9jdHlwZVRvb2xVcGRhdGUoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtpdGVtczp0aGlzLmRvY3R5cGVUb29sLml0ZW1zfSlcblx0fVxuXHRzdWJtaXQoZSl7XG5cdFx0Ly9GT1JNIFZBTElEQVRJT05cblx0XHQvL2lmKHRoaXMucHJvcHMuaXRlbS52aW5leWFyZD09XCJcIiB8fHRoaXMucHJvcHMuaXRlbS5zcHJheV90eXBlPT1cIlwiIHx8IChtb21lbnQodGhpcy5wcm9wcy5pdGVtLmRhdGUsXCJNTS9ERC9ZWVlZXCIpLmlzVmFsaWQoKSkhPT10cnVlKXtcblx0XHQvL1x0Y29uc29sZS5sb2coXCJub3QgdmFsaWRcIik7XG5cdFx0Ly99ZWxzZXtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRoaXMucHJvcHMuY3JlYXRlKHRoaXMucHJvcHMuaXRlbSx0aGlzLnByb3BzLmRvY3R5cGUpO1xuXHRcdC8vfVxuXHR9XG5cdHNhdmUoZSl7XG5cdFx0Ly8gaWYodGhpcy5wcm9wcy5pdGVtLnZpbmV5YXJkPT1cIlwiIHx8dGhpcy5wcm9wcy5pdGVtLnNwcmF5X3R5cGU9PVwiXCIgfHwgKG1vbWVudCh0aGlzLnByb3BzLml0ZW0uZGF0ZSxcIk1NL0REL1lZWVlcIikuaXNWYWxpZCgpKSE9PXRydWUpe1xuXHRcdC8vIFx0Y29uc29sZS5sb2coXCJub3QgdmFsaWRcIik7XG5cdFx0Ly8gfWVsc2V7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR0aGlzLnByb3BzLmVkaXQodGhpcy5wcm9wcy5pdGVtKTtcblx0XHQvLyB9XG5cdH1cblx0ZGVsZXRlKGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR0aGlzLnByb3BzLmRlbGV0ZSh0aGlzLnByb3BzLml0ZW0pO1xuXHR9XG5cdGNyZWF0ZUZvcm1Kc29uKCl7XG5cdFx0dmFyIGNyZWF0ZUhpZGRlbj0odGhpcy5wcm9wcy5tb2RlIT1cImNyZWF0ZVwiKT9cIiBoaWRkZW5cIjpcIiBub3BlXCI7XG5cdFx0dmFyIGVkaXRIaWRkZW49KHRoaXMucHJvcHMubW9kZSE9XCJlZGl0XCIpP1wiIGhpZGRlblwiOlwiIG5vcGVcIjtcblx0XHR2YXIgZmllbGRzSnNvbj10aGlzLnN0YXRlLml0ZW1zWzBdLmZpZWxkcztcblx0XHR2YXIgZmllbGRzPVtdO1xuXHRcdHZhciBmaWVsZE9iamVjdD17XG5cdFx0XHRMaW5rOiBmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRmaWVsZDpcImF1dG9Db21wbGV0ZVwiLFxuXHRcdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRcdGNvcHlbaXRlbS5maWVsZG5hbWVdPWUudGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0XHRsYWJsZTppdGVtLmxhYmVsLFxuXHRcdFx0XHRcdHZhbHVlOmNvcHlbaXRlbS5maWVsZG5hbWVdLFxuXHRcdFx0XHRcdGRvY3R5cGU6aXRlbS5vcHRpb25zLFxuXHRcdFx0XHRcdGRvY3ZhbHVlOlwibmFtZVwiXG5cdFx0XHRcdH1cblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdENoZWNrOiBmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRmaWVsZDpcImNoZWNrXCIsXG5cdFx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdFx0Y29weVtpdGVtLmZpZWxkbmFtZV09ZS50YXJnZXQuY2hlY2tlZDtcblx0XHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdFx0bGFibGU6aXRlbS5sYWJlbCxcblx0XHRcdFx0XHR2YWx1ZTpjb3B5W2l0ZW0uZmllbGRuYW1lXSxcblx0XHRcdFx0XHRjbGFzc05hbWU6IFwiYmlnLWNoZWNrYm94XCJcblx0XHRcdFx0fVxuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0SW50OiBmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRmaWVsZDpcImlucHV0XCIsXG5cdFx0XHRcdFx0dHlwZTpcIm51bWJlclwiLFxuXHRcdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRcdGNvcHlbaXRlbS5maWVsZG5hbWVdPWUudGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0XHR2YWx1ZTpjb3B5W2l0ZW0uZmllbGRuYW1lXSxcblx0XHRcdFx0XHRsYWJsZTppdGVtLmxhYmVsXG5cdFx0XHRcdH07XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRTZWxlY3Q6IGZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0XHR2YXIgb3B0aW9ucz1pdGVtLm9wdGlvbnMuc3BsaXQoIFwiXFxuXCIgKTtcblx0XHRcdFx0Ly8gaWYoY29weVtpdGVtLmZpZWxkbmFtZV0hPVwiXCIpe1xuXHRcdFx0XHQvLyBcdGNvcHlbaXRlbS5maWVsZG5hbWVdPW9wdGlvbnNbMF07XG5cdFx0XHRcdC8vIFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0XHQvLyB9XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZmllbGQ6XCJzZWxlY3RcIixcblx0XHRcdFx0XHR0eXBlOlwibnVtYmVyXCIsXG5cdFx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdFx0Y29weVtpdGVtLmZpZWxkbmFtZV09ZS50YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRcdGxhYmxlOml0ZW0ubGFiZWwsXG5cdFx0XHRcdFx0dmFsdWU6Y29weVtpdGVtLmZpZWxkbmFtZV0sXG5cdFx0XHRcdFx0b3B0aW9uczpvcHRpb25zXG5cdFx0XHRcdH07XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHREYXRhOiBmdW5jdGlvbihpdGVtLHByb3BPcHRpb25zKXtcblx0XHRcdFx0aWYocHJvcE9wdGlvbnMudHlwZT09XCJ0ZXh0YXJlYVwiKXtcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0ZmllbGQ6XCJ0ZXh0YXJlYVwiLFxuXHRcdFx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdFx0XHRjb3B5W2l0ZW0uZmllbGRuYW1lXT1lLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHRcdFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRcdFx0dmFsdWU6Y29weVtpdGVtLmZpZWxkbmFtZV0sXG5cdFx0XHRcdFx0XHRsYWJsZTppdGVtLmxhYmVsXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNle1xuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRmaWVsZDpcImlucHV0XCIsXG5cdFx0XHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0XHRcdGNvcHlbaXRlbS5maWVsZG5hbWVdPWUudGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdFx0XHR2YWx1ZTpjb3B5W2l0ZW0uZmllbGRuYW1lXSxcblx0XHRcdFx0XHRcdGxhYmxlOml0ZW0ubGFiZWxcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHREYXRlOiBmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRmaWVsZDpcImRhdGVcIixcblx0XHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0XHRjb3B5W2l0ZW0uZmllbGRuYW1lXT1lLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdFx0bGFibGU6aXRlbS5sYWJlbFxuXHRcdFx0XHR9XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0fVxuXG5cdFx0aWYodGhpcy5wcm9wcy5pdGVtPT1udWxsKXtcblx0XHRcdHZhciBjb3B5PXt9XG5cdFx0fWVsc2V7XG5cdFx0XHR2YXIgY29weT1wcy5jbG9uZSh0aGlzLnByb3BzLml0ZW0pO1xuXHRcdH1cblxuXHRcdC8vbG9vcCB0aGUganNvbiBvYmplY3Rcblx0XHQvL3Byb2JhYmx5IGNoYW5nZSB0aGlzIHRvIHdpbGxNb3VudFxuXHRcdGNvbnNvbGUubG9nKGZpZWxkc0pzb24pO1xuXG5cdFx0Zm9yKHZhciB4ID0gMDsgeCA8IGZpZWxkc0pzb24ubGVuZ3RoOyB4Kyspe1xuXHRcdFx0dmFyIGN1cnJlbnRGaWVsZD1maWVsZHNKc29uW3hdO1xuXHRcdFx0Y29uc29sZS5sb2coY3VycmVudEZpZWxkLmZpZWxkbmFtZSk7XG5cdFx0XHQvLyBjaGVjayBpZiB0aGlzIGZpZWxkIHdhcyBlbmFibGVkXG5cblx0XHRcdGlmICh0aGlzLnByb3BzW2N1cnJlbnRGaWVsZC5maWVsZG5hbWVdKXtcblx0XHRcdFx0Ly90aGVyZSBpcyBhIHByb3BzIGZvciB0aGlzIGZpZWxkXG5cblx0XHRcdFx0aWYodGhpcy5wcm9wc1tjdXJyZW50RmllbGQuZmllbGRuYW1lXS5hY3RpdmUgPT09IDEpe1xuXHRcdFx0XHRcdC8vYW5kIHRoZSBmaWVsZCBpcyBzZXQgdG8gYWN0aXZlXG5cblx0XHRcdFx0XHRpZihmaWVsZE9iamVjdFtjdXJyZW50RmllbGQuZmllbGR0eXBlXSl7XG5cdFx0XHRcdFx0XHQvL0ZlaWxkIHR5cGUgY2FuIGJlIGhhbmRsZWQ/XG5cdFx0XHRcdFx0XHQvL2hhbmRsZSB0aGUgY3JlYXRpb24gb2YgY29weSBhbmQgdGhlIGRlZmF1bHQgdmFsdWVzXG5cblx0XHRcdFx0XHRcdGlmKHRoaXMucHJvcHMubW9kZT09XCJjcmVhdGVcIil7XG5cdFx0XHRcdFx0XHRcdGlmKGNvcHlbY3VycmVudEZpZWxkLmZpZWxkbmFtZV0pe1xuXHRcdFx0XHRcdFx0XHRcdC8vdGhlIGZpZWxkIGFscmVhZHkgZXhpc3RzXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0ZWxzZSBpZih0aGlzLnByb3BzW2N1cnJlbnRGaWVsZC5maWVsZG5hbWVdLmRlZmF1bHQpe1xuXHRcdFx0XHRcdFx0XHRcdC8vc2V0IHRvIGRlZmF1bHQgdmFsdWVcblx0XHRcdFx0XHRcdFx0XHRjb3B5W2N1cnJlbnRGaWVsZC5maWVsZG5hbWVdPXRoaXMucHJvcHNbY3VycmVudEZpZWxkLmZpZWxkbmFtZV0uZGVmYXVsdDtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRlbHNle1xuXHRcdFx0XHRcdFx0XHRcdGNvcHlbY3VycmVudEZpZWxkLmZpZWxkbmFtZV09XCJcIjtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyhjdXJyZW50RmllbGQuZmllbGRuYW1lKTtcblx0XHRcdFx0XHRcdGZpZWxkcy5wdXNoKGZpZWxkT2JqZWN0W2N1cnJlbnRGaWVsZC5maWVsZHR5cGVdKGN1cnJlbnRGaWVsZCx0aGlzLnByb3BzW2N1cnJlbnRGaWVsZC5maWVsZG5hbWVdKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKCEoXCJkb2N0eXBlXCIgaW4gY29weSkpe1xuXHRcdFx0Y29weS5kb2N0eXBlPXRoaXMucHJvcHMuZG9jdHlwZTtcblx0XHR9XG5cdFx0Ly9hZGRpbmcgYnV0dG9uIGZlaWxkc1xuXHRcdGlmKHRoaXMucHJvcHMuY2xvc2Upe1xuXHRcdFx0ZmllbGRzLnB1c2goe1xuXHRcdFx0XHRmaWVsZDpcImJ1dHRvblwiLFxuXHRcdFx0XHR0eXBlOlwic3VibWl0XCIsXG5cdFx0XHRcdHZhbHVlOlwiQ3JlYXRlIFwiICsgdGhpcy5wcm9wcy5kb2N0eXBlICsgXCIgRW50cnlcIixcblx0XHRcdFx0Y2xhc3NOYW1lOlwiYnRuLXByaW1hcnkgcHVsbC1yaWdodCBcIiArIGNyZWF0ZUhpZGRlbixcblx0XHRcdFx0b25DbGljazp0aGlzLnN1Ym1pdFxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGlmKHRoaXMucHJvcHMuY3JlYXRlKXtcblx0XHRcdGZpZWxkcy5wdXNoKHtcblx0XHRcdFx0XHRmaWVsZDpcImJ1dHRvblwiLFxuXHRcdFx0XHRcdHZhbHVlOlwiQ2xvc2VcIixcblx0XHRcdFx0XHRjbGFzc05hbWU6XCJwdWxsLXJpZ2h0IFwiKyBlZGl0SGlkZGVuLFxuXHRcdFx0XHRcdG9uQ2xpY2s6ZnVuY3Rpb24oZSl7IGUucHJldmVudERlZmF1bHQoKTt0aGlzLnByb3BzLmNsb3NlKCk7fS5iaW5kKHRoaXMpXG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0aWYodGhpcy5wcm9wcy5kZWxldGUpe1xuXHRcdFx0ZmllbGRzLnB1c2goe1xuXHRcdFx0XHRcdGZpZWxkOlwiYnV0dG9uXCIsXG5cdFx0XHRcdFx0dHlwZTpcInN1Ym1pdFwiLFxuXHRcdFx0XHRcdHZhbHVlOlwiRGVsZXRlXCIsXG5cdFx0XHRcdFx0Y2xhc3NOYW1lOlwiYnRuLWRhbmdlciBwdWxsLXJpZ2h0IFwiKyBlZGl0SGlkZGVuLFxuXHRcdFx0XHRcdG9uQ2xpY2s6dGhpcy5kZWxldGVcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRmaWVsZHMucHVzaChcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJidXR0b25cIixcblx0XHRcdFx0dHlwZTpcInN1Ym1pdFwiLFxuXHRcdFx0XHR2YWx1ZTpcIlNhdmVcIixcblx0XHRcdFx0Y2xhc3NOYW1lOlwiYnRuLXN1Y2Nlc3MgcHVsbC1yaWdodCBcIisgZWRpdEhpZGRlbixcblx0XHRcdFx0b25DbGljazp0aGlzLnNhdmVcblx0XHRcdH0pO1xuXHRcdHJldHVybiBmaWVsZHM7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0Y29uc29sZS5sb2coXCJyZW5kZXIgYXJlYVwiKTtcblx0XHR2YXIgb3V0cHV0PXt9O1xuXHRcdGlmKHRoaXMuc3RhdGUuaXRlbXMhPT1udWxsKXtcblx0XHRcdHZhciBmaWVsZHM9dGhpcy5jcmVhdGVGb3JtSnNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2coZmllbGRzKTtcblx0XHRcdHZhciBvdXRwdXQgPSAoXG5cdFx0XHRcdDxGb3JtXG5cdFx0XHRcdFx0aWQ9e3RoaXMucHJvcHMuaWR9XG5cdFx0XHRcdFx0dHlwZT1cImhvcml6b250YWxcIlxuXHRcdFx0XHRcdGZpZWxkcz17ZmllbGRzfVxuXHRcdFx0XHQvPik7XG5cdFx0fWVsc2V7XG5cdFx0XHRvdXRwdXQgPSAoPGRpdj4gTG9hZGluZy4uLiA8L2Rpdj4pO1xuXHRcdH1cblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2PntcIkhPUkVcIn1cblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbiIsIi8qIGZvcm1zICovXG4vKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cblxuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnN1Ym1pdD10aGlzLnN1Ym1pdC5iaW5kKHRoaXMpO1xuXHR9XG5cdHN1Ym1pdChlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5wcm9wcy5zdWJtaXQoZSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dmFyIGZvcm09W107XG5cdFx0dmFyIGZvcm1UeXBlcz17XG5cdFx0XHRzZWxlY3RcdDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciBvcHRpbmFsPVtcInZhbHVlXCIsXCJsYWJsZVwiLFwib3B0aW9uc1wiLFwiY2xhc3NOYW1lXCIsXCJyZWFkb25seVwiLFwiZGlzYWJsZWRcIixcInJlcXVpcmVcIl07XG5cdFx0XHRcdHZhciBwcm9wcz1wcy5pbml0UHJvcHMob3B0aW5hbCxpdGVtKTtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8U2VsZWN0XG5cdFx0XHRcdFx0XHRrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9XG5cdFx0XHRcdFx0XHR2YWx1ZT17cHJvcHMudmFsdWV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e3Byb3BzLmNsYXNzTmFtZX1cblx0XHRcdFx0XHRcdGxhYmxlPXtwcm9wcy5sYWJsZX1cblx0XHRcdFx0XHRcdG9wdGlvbnM9e3Byb3BzLm9wdGlvbnN9XG5cdFx0XHRcdFx0XHRyZWFkb25seT17cHJvcHMucmVhZG9ubHl9XG5cdFx0XHRcdFx0XHRkaXNhYmxlZD17cHJvcHMuZGlzYWJsZWR9XG5cdFx0XHRcdFx0XHRyZXF1aXJlZD17cHJvcHMucmVxdWlyZWR9XG5cdFx0XHRcdFx0XHRpbnB1dENoYW5nZWQ9e2Z1bmN0aW9uKGUpe2l0ZW0ub25DaGFuZ2UoZSk7fX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0Y2hlY2sgOiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0dmFyIHByb3BzPVtcInZhbHVlXCIsXCJsYWJsZVwiLFwiY2xhc3NOYW1lXCIsXCJyZWFkb25seVwiLFwiZGlzYWJsZWRcIixcInJlcXVpcmVcIixcInZhbHVlXCJdO1xuXHRcdFx0XHRwcm9wcz1wcy5pbml0UHJvcHMocHJvcHMsaXRlbSk7XG5cblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8Q2hlY2tcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH1cblx0XHRcdFx0XHRcdHZhbHVlPXtwcm9wcy52YWx1ZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17cHJvcHMuY2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0bGFibGU9e3Byb3BzLmxhYmxlfVxuXHRcdFx0XHRcdFx0cmVhZE9ubHk9e3Byb3BzLnJlYWRvbmx5fVxuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ9e3Byb3BzLmRpc2FibGVkfVxuXHRcdFx0XHRcdFx0cmVxdWlyZWQ9e3Byb3BzLnJlcXVpcmVkfVxuXHRcdFx0XHRcdFx0aW5wdXRDaGFuZ2VkPXtmdW5jdGlvbihlKXtpdGVtLm9uQ2hhbmdlKGUpO319XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblxuXHRcdFx0dGV4dGFyZWEgOiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0dmFyIHByb3BzPVtcInZhbHVlXCIsXCJsYWJsZVwiLFwiY2xhc3NOYW1lXCIsXCJyZWFkb25seVwiLFwiZGlzYWJsZWRcIixcInJlcXVpcmVcIixcInZhbHVlXCIsXCJyb3dzXCJdO1xuXHRcdFx0XHRwcm9wcz1wcy5pbml0UHJvcHMocHJvcHMsaXRlbSk7XG5cblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8VGV4dGFyZWFcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH1cblx0XHRcdFx0XHRcdHZhbHVlPXtwcm9wcy52YWx1ZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17cHJvcHMuY2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0bGFibGU9e3Byb3BzLmxhYmxlfVxuXHRcdFx0XHRcdFx0cmVhZE9ubHk9e3Byb3BzLnJlYWRvbmx5fVxuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ9e3Byb3BzLmRpc2FibGVkfVxuXHRcdFx0XHRcdFx0cmVxdWlyZWQ9e3Byb3BzLnJlcXVpcmVkfVxuXHRcdFx0XHRcdFx0cm93cz17cHJvcHMucm93c31cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKTt9fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRpbnB1dCBcdDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciBwcm9wcz1bXCJ0eXBlXCIsXCJ2YWx1ZVwiLFwicGxhY2Vob2xkZXJcIixcImxhYmxlXCIsXCJjbGFzc05hbWVcIixcInJlYWRvbmx5XCIsXCJkaXNhYmxlZFwiLFwicmVxdWlyZWRcIixcImVycm9yXCJdO1xuXHRcdFx0XHRwcm9wcz1wcy5pbml0UHJvcHMocHJvcHMsaXRlbSk7XG5cdFx0XHRcdGlmKHByb3BzLnR5cGU9PVwiXCIpe1xuXHRcdFx0XHRcdHByb3BzLnR5cGU9XCJ0ZXh0XCI7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxJbnB1dFxuXHRcdFx0XHRcdFx0a2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fVxuXHRcdFx0XHRcdFx0dHlwZT17cHJvcHMudHlwZX1cblx0XHRcdFx0XHRcdHZhbHVlPXtwcm9wcy52YWx1ZX1cblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPXtwcm9wcy5wbGFjZWhvbGRlcn1cblx0XHRcdFx0XHRcdGxhYmxlPXtwcm9wcy5sYWJsZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17cHJvcHMuY2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0cmVhZG9ubHk9e3Byb3BzLnJlYWRvbmx5fVxuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ9e3Byb3BzLmRpc2FibGVkfVxuXHRcdFx0XHRcdFx0cmVxdWlyZWQ9e3Byb3BzLnJlcXVpcmVkfVxuXHRcdFx0XHRcdFx0ZXJyb3I9e3Byb3BzLmVycm9yfVxuXHRcdFx0XHRcdFx0aW5wdXRDaGFuZ2VkPXtmdW5jdGlvbihlKXtpdGVtLm9uQ2hhbmdlKGUpfX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0bGFibGUgXHQ6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHRyZXR1cm4gKFxuICAgIFx0XHRcdFx0PGxhYmVsIGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH0gPntpdGVtLmxhYmxlfTwvbGFiZWw+XG5cbiAgICBcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0cmFkaW9cdDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHJldHVybiAoPGRpdj48L2Rpdj4pO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0aGVhZGVyOiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0cmV0dXJuKDxoMyBrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9ID57aXRlbS5sYWJsZX08L2gzPilcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGRhdGU6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHR2YXIgdmFsdWUgPSAoaXRlbS52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0udmFsdWU7XG5cdFx0XHRcdHZhciBsYWJsZSA9IChpdGVtLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5sYWJsZTtcblx0XHRcdFx0dmFyIHBsYWNlaG9sZGVyID0gKGl0ZW0ucGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnBsYWNlaG9sZGVyO1xuXHRcdFx0XHR2YXIgY2xhc3NOYW1lID0gKGl0ZW0uY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5jbGFzc05hbWU7XG5cdFx0XHRcdHZhciByZWFkb25seSA9IChpdGVtLnJlYWRvbmx5ID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5yZWFkb25seTtcblx0XHRcdFx0dmFyIGRpc2FibGVkID0gKGl0ZW0uZGlzYWJsZWQgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmRpc2FibGVkO1xuXHRcdFx0XHR2YXIgcmVxdWlyZWQgPSAoaXRlbS5yZXF1aXJlZCA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucmVxdWlyZWQ7XG5cdFx0XHRcdHJldHVybihcblx0XHRcdFx0XHQ8RGF0ZUlucHV0XG5cdFx0XHRcdFx0XHRrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9XG5cdFx0XHRcdFx0XHR2YWx1ZT17dmFsdWV9XG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG5cdFx0XHRcdFx0XHRsYWJsZT17bGFibGV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e2NsYXNzTmFtZX1cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKX19XG5cdFx0XHRcdFx0XHRyZWFkb25seT17cmVhZG9ubHl9XG5cdFx0XHRcdFx0XHRkaXNhYmxlZD17ZGlzYWJsZWR9XG5cdFx0XHRcdFx0XHRyZXF1aXJlZD17cmVxdWlyZWR9XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGF1dG9Db21wbGV0ZTogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IChpdGVtLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS52YWx1ZTtcblx0XHRcdFx0dmFyIGxhYmxlID0gKGl0ZW0ubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmxhYmxlO1xuXHRcdFx0XHR2YXIgcGxhY2Vob2xkZXIgPSAoaXRlbS5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucGxhY2Vob2xkZXI7XG5cdFx0XHRcdHZhciBjbGFzc05hbWUgPSAoaXRlbS5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmNsYXNzTmFtZTtcblx0XHRcdFx0dmFyIHJlYWRvbmx5ID0gKGl0ZW0ucmVhZG9ubHkgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnJlYWRvbmx5O1xuXHRcdFx0XHR2YXIgZGlzYWJsZWQgPSAoaXRlbS5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uZGlzYWJsZWQ7XG5cdFx0XHRcdHZhciByZXF1aXJlZCA9IChpdGVtLnJlcXVpcmVkID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5yZXF1aXJlZDtcblxuXHRcdFx0XHRyZXR1cm4oXG5cdFx0XHRcdFx0PEF3ZXNvbXBsZXRlSW5wdXRcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH1cblx0XHRcdFx0XHRcdGRvY3R5cGU9e2l0ZW0uZG9jdHlwZX1cblx0XHRcdFx0XHRcdGRvY3ZhbHVlPXtpdGVtLmRvY3ZhbHVlfVxuXHRcdFx0XHRcdFx0ZG9jbGFibGU9e2l0ZW0uZG9jbGFibGV9XG5cdFx0XHRcdFx0XHR2YWx1ZT17dmFsdWV9XG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG5cdFx0XHRcdFx0XHRsYWJsZT17bGFibGV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e2NsYXNzTmFtZX1cblx0XHRcdFx0XHRcdHJlYWRvbmx5PXtyZWFkb25seX1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXtkaXNhYmxlZH1cblx0XHRcdFx0XHRcdHJlcXVpcmVkPXtyZXF1aXJlZH1cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKX19XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGJ1dHRvbjogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciBvcHRpbmFsPVtcInZhbHVlXCIsXCJjbGFzc05hbWVcIixcImRpc2FibGVkXCIsXCJpY29uXCJdO1xuXHRcdFx0XHR2YXIgcHJvcHM9cHMuaW5pdFByb3BzKG9wdGluYWwsaXRlbSk7XG5cdFx0XHRcdHJldHVybihcblx0XHRcdFx0XHQ8QnV0dG9uXG5cdFx0XHRcdFx0XHRrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9XG5cdFx0XHRcdFx0XHR2YWx1ZT17cHJvcHMudmFsdWV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e3Byb3BzLmNsYXNzTmFtZX1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXtwcm9wcy5kaXNhYmxlZH1cblx0XHRcdFx0XHRcdGljb249e3Byb3BzLmljb259XG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtmdW5jdGlvbihlKXtpdGVtLm9uQ2xpY2soZSl9fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcylcblx0XHR9XG5cdFx0dGhpcy5wcm9wcy5maWVsZHMubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblx0XHRcdGlmKCQuaXNFbXB0eU9iamVjdChpdGVtKSl7XG5cblx0XHRcdH1lbHNle1xuXHRcdFx0XHRpZih0aGlzLnByb3BzLnR5cGU9PVwiaW5saW5lXCIpe1xuXHRcdFx0XHRcdHZhciByb3dDbGFzcz0xMi90aGlzLnByb3BzLnJvd3M7XG5cdFx0XHRcdFx0cm93Q2xhc3M9XCJjb2wteHMtXCIrcm93Q2xhc3M7XG5cdFx0XHRcdFx0Zm9ybS5wdXNoKDxkaXYga2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fSBjbGFzc05hbWU9e3Jvd0NsYXNzfT57Zm9ybVR5cGVzW2l0ZW0uZmllbGRdKGl0ZW0saW5kZXgpfTwvZGl2Pik7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZXtmb3JtLnB1c2goPGRpdiBrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9IGNsYXNzTmFtZT17cm93Q2xhc3N9Pntmb3JtVHlwZXNbaXRlbS5maWVsZF0oaXRlbSxpbmRleCl9PC9kaXY+KTt9XG5cdFx0XHR9XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0XHQvL2Zvcih2YXIgeD0wOyB4IDwgdGhpcy5wcm9wcy5mZWlsZHMubGVuZ3RoIHgrKzsgKVxuXHRcdHZhciBjbGFzc05hbWUgPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcInJlYWN0LWZvcm1cIjogXCJyZWFjdC1mb3JtIFwiK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHJldHVybihcblx0XHRcdDxmb3JtIGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cblx0XHRcdFx0PGZpZWxkc2V0PlxuXHRcdFx0XHR7dGhpcy5wcm9wcy5iZWZvcmV9XG5cdFx0XHRcdHtmb3JtfVxuXHRcdFx0XHR7IHRoaXMucHJvcHMuY2hpbGRyZW59XG5cdFx0XHRcdDwvZmllbGRzZXQ+XG5cdFx0XHQ8L2Zvcm0+XG5cdFx0KTtcblx0fVxufVxuXG5cblxuZXhwb3J0IGNsYXNzIFNlbGVjdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLmlucHV0Q2hhbmdlPXRoaXMuaW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXG5cdH1cblx0aW5wdXRDaGFuZ2UoZSl7XG5cdFx0dGhpcy5wcm9wcy5pbnB1dENoYW5nZWQoKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMubGFibGUgPSAodGhpcy5wcm9wcy5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMubGFibGU7XG5cdFx0dGhpcy5vcHRpb25zID0gKHRoaXMucHJvcHMub3B0aW9ucyA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMub3B0aW9ucztcblx0XHR0aGlzLmNsYXNzTmFtZT0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJmb3JtLWNvbnRyb2xcIjogXCJmb3JtLWNvbnRyb2xcIiArdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0dGhpcy5kaXNhYmxlZCA9ICh0aGlzLnByb3BzLmRpc2FibGVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PWZhbHNlfHx0aGlzLnByb3BzLmRpc2FibGVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVxdWlyZWQgPSAodGhpcy5wcm9wcy5yZXF1aXJlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1mYWxzZXx8dGhpcy5wcm9wcy5yZXF1aXJlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlYWRvbmx5ID0gKHRoaXMucHJvcHMucmVhZG9ubHkgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZWFkb25seT09ZmFsc2V8fHRoaXMucHJvcHMucmVhZG9ubHk9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dmFyIG9wdGlvbnM9W107XG5cdFx0dmFyIG91dHB1dD1cIlwiO1xuXG5cblx0XHR0aGlzLm9wdGlvbnMubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblx0XHRcdHZhciBncm91cD1bXTtcblx0XHRcdGlmKGl0ZW0uZ3JvdXAgIT09IHVuZGVmaW5lZCl7XG5cdFx0XHRcdGl0ZW0ub3B0aW9ucy5tYXAoZnVuY3Rpb24oaW5uZXJJdGVtLGluZGV4KXtcblx0XHRcdFx0XHRncm91cC5wdXNoKCA8b3B0aW9uIGtleT17aXRlbS5ncm91cCtpbmRleH0gdmFsdWU9e2lubmVySXRlbX0+IHtpbm5lckl0ZW19IDwvb3B0aW9uPilcblx0XHRcdFx0fSlcblx0XHRcdFx0b3B0aW9ucy5wdXNoKDxvcHRncm91cCBrZXk9e2l0ZW0uZ3JvdXB9IGxhYmVsPXtpdGVtLmdyb3VwfT4ge2dyb3VwfTwvb3B0Z3JvdXA+KTtcblxuXHRcdFx0fVxuXHRcdFx0ZWxzZXtcblx0XHRcdFx0b3B0aW9ucy5wdXNoKCA8b3B0aW9uIGtleT17aW5kZXh9IHZhbHVlPXtpdGVtfT4ge2l0ZW19IDwvb3B0aW9uPilcblx0XHRcdH1cblxuXG5cdFx0fS5iaW5kKHRoaXMpKTtcblxuXHRcdHZhciBzZWxlY3Q9KFxuXHRcdFx0PHNlbGVjdFxuXHRcdFx0XHRjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfVxuXHRcdFx0XHR2YWx1ZT17dGhpcy52YWx1ZX1cblx0XHRcdFx0b25DaGFuZ2U9e3RoaXMucHJvcHMuaW5wdXRDaGFuZ2VkfVxuXHRcdFx0XHRkaXNhYmxlZD17dGhpcy5kaXNhYmxlZH1cblx0ICAgICAgICAgIFx0cmVhZE9ubHk9e3RoaXMucmVhZG9ubHl9XG5cdCAgICAgICAgICBcdHJlcXVpcmVkPXt0aGlzLnJlcXVpcmVkfVxuXHRcdFx0XHQ+XG5cdFx0XHRcdHtvcHRpb25zfVxuXHRcdFx0PC9zZWxlY3Q+XG5cdFx0KTtcblxuXHRcdHZhciBsYWJsZT1cIlwiO1xuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgJiYgdGhpcy5wcm9wcy5sYWJsZSAhPT0gXCJcIil7XG5cdFx0XHRsYWJsZT0oPGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWxcIj57dGhpcy5wcm9wcy5sYWJsZX08L2xhYmVsPik7XG5cdFx0fVxuXHRcdG91dHB1dCA9ICg8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj57bGFibGV9e3NlbGVjdH08L2Rpdj4pO1xuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLmlucHV0Q2hhbmdlPXRoaXMuaW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcblxuXHR9XG5cdGlucHV0Q2hhbmdlKGUpe1xuXHRcdHRoaXMucHJvcHMuaW5wdXRDaGFuZ2VkKGUpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHRoaXMudHlwZSA9ICh0aGlzLnByb3BzLnR5cGUgPT09IHVuZGVmaW5lZCkgPyBcInRleHRcIjogdGhpcy5wcm9wcy50eXBlO1xuXHRcdHRoaXMudmFsdWUgPSAodGhpcy5wcm9wcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMudmFsdWU7XG5cdFx0dGhpcy5wbGFjZWhvbGRlciA9ICh0aGlzLnByb3BzLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5wbGFjZWhvbGRlcjtcblx0XHR0aGlzLmxhYmxlID0gKHRoaXMucHJvcHMubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLmxhYmxlO1xuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblx0XHR0aGlzLmNsYXNzTmFtZT0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJmb3JtLWNvbnRyb2xcIjogXCJmb3JtLWNvbnRyb2wgXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlcXVpcmVkID0gKHRoaXMucHJvcHMucmVxdWlyZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZXF1aXJlZD09ZmFsc2V8fHRoaXMucHJvcHMucmVxdWlyZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZWFkb25seSA9ICh0aGlzLnByb3BzLnJlYWRvbmx5ID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVhZG9ubHk9PWZhbHNlfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXG5cdFx0dmFyIGlucHV0PShcblx0XHRcdDxpbnB1dFxuXHRcdFx0XHR0eXBlPXt0aGlzLnR5cGV9XG5cdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9XG5cdFx0XHRcdHBsYWNlaG9sZGVyPXt0aGlzLnBsYWNlaG9sZGVyfVxuXHRcdFx0XHR2YWx1ZT17dGhpcy52YWx1ZX1cblx0XHRcdFx0b25DaGFuZ2U9e3RoaXMucHJvcHMuaW5wdXRDaGFuZ2VkfVxuXHRcdFx0XHRkaXNhYmxlZD17dGhpcy5kaXNhYmxlZH1cblx0ICAgICAgICAgIFx0cmVhZE9ubHk9e3RoaXMucmVhZG9ubHl9XG5cdCAgICAgICAgICBcdHJlcXVpcmVkPXt0aGlzLnJlcXVpcmVkfVxuXHRcdFx0Lz5cblx0XHQpO1xuXHRcdHZhciB3cmFwcGVyQ2xhc3M9XCJmb3JtLWdyb3VwXCI7XG5cdFx0aWYodGhpcy5wcm9wcy5lcnJvcil7XG5cdFx0XHRcdHdyYXBwZXJDbGFzcys9IFwiIFwiK1wiaGFzLWVycm9yXCI7XG5cdFx0fVxuXHRcdHZhciBsYWJsZT1cIlwiO1xuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgJiYgdGhpcy5wcm9wcy5sYWJsZSAhPT0gXCJcIil7XG5cdFx0XHRsYWJsZT0oPGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWxcIj57dGhpcy5wcm9wcy5sYWJsZX08L2xhYmVsPik7XG5cdFx0fVxuXHRcdG91dHB1dCA9ICg8ZGl2IGNsYXNzTmFtZT17d3JhcHBlckNsYXNzfT57bGFibGV9e2lucHV0fTwvZGl2Pik7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIENoZWNrIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuaW5wdXRDaGFuZ2U9dGhpcy5pbnB1dENoYW5nZS5iaW5kKHRoaXMpO1xuXG5cblx0fVxuXHRpbnB1dENoYW5nZShlKXtcblxuXHRcdHRoaXMucHJvcHMuaW5wdXRDaGFuZ2VkKGUpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHRoaXMudmFsdWUgPSAodGhpcy5wcm9wcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IDAgOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMucGxhY2Vob2xkZXIgPSAodGhpcy5wcm9wcy5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXI7XG5cdFx0dGhpcy5sYWJsZSA9ICh0aGlzLnByb3BzLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5sYWJsZTtcblx0XHR0aGlzLmNsYXNzTmFtZT0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJmb3JtLWNoZWNrLWlucHV0XCI6IFwiZm9ybS1jaGVjay1pbnB1dCBcIiArdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0dGhpcy5kaXNhYmxlZCA9ICh0aGlzLnByb3BzLmRpc2FibGVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PWZhbHNlfHx0aGlzLnByb3BzLmRpc2FibGVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVxdWlyZWQgPSAodGhpcy5wcm9wcy5yZXF1aXJlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1mYWxzZXx8dGhpcy5wcm9wcy5yZXF1aXJlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlYWRvbmx5ID0gKHRoaXMucHJvcHMucmVhZG9ubHkgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZWFkb25seT09ZmFsc2V8fHRoaXMucHJvcHMucmVhZG9ubHk9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cblx0XHR2YXIgb3V0cHV0PVwiXCI7XG5cdFx0dmFyIGlucHV0PShcblx0XHRcdDxpbnB1dFxuXHRcdFx0XHR0eXBlPVwiY2hlY2tib3hcIlxuXHRcdFx0XHRjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfVxuXHRcdFx0XHRjaGVja2VkPXt0aGlzLnZhbHVlfVxuXG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnByb3BzLmlucHV0Q2hhbmdlZH1cblx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdCAgICAgICAgICBcdHJlYWRPbmx5PXt0aGlzLnJlYWRvbmx5fVxuXHQgICAgICAgICAgXHRyZXF1aXJlZD17dGhpcy5yZXF1aXJlZH1cblx0XHRcdC8+XG5cdFx0KTtcblxuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy5sYWJsZSA9PVwiXCIpe1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0ICAgIFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbFwiPlxuXHRcdCAgICAgIFx0XHRcdHtpbnB1dH17dGhpcy5wcm9wcy5sYWJsZX1cblx0XHQgICAgICBcdFx0PC9sYWJlbD5cblx0XHQgIFx0XHQ8L2Rpdj5cblx0XHQgIFx0KTtcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdG91dHB1dCA9IChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdCAgICAgIFx0XHR7aW5wdXR9XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5leHBvcnQgY2xhc3MgVGV4dGFyZWEgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5pbnB1dENoYW5nZT10aGlzLmlucHV0Q2hhbmdlLmJpbmQodGhpcyk7XG5cblx0fVxuXHRpbnB1dENoYW5nZShlKXtcblx0XHR0aGlzLnByb3BzLmlucHV0Q2hhbmdlZChlKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyAwIDogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLnBsYWNlaG9sZGVyID0gKHRoaXMucHJvcHMucGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnBsYWNlaG9sZGVyO1xuXHRcdHRoaXMubGFibGUgPSAodGhpcy5wcm9wcy5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMubGFibGU7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jb250cm9sXCI6IFwiZm9ybS1jb250cm9sIFwiICt0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHR0aGlzLmRpc2FibGVkID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5kaXNhYmxlZD09ZmFsc2V8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZXF1aXJlZCA9ICh0aGlzLnByb3BzLnJlcXVpcmVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVxdWlyZWQ9PWZhbHNlfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVhZG9ubHkgPSAodGhpcy5wcm9wcy5yZWFkb25seSA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1mYWxzZXx8dGhpcy5wcm9wcy5yZWFkb25seT09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJvd3MgPSAodGhpcy5wcm9wcy5yb3dzID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucm93cz09XCJcIikgPyAzOiB0aGlzLnByb3BzLnJvd3M7XG5cdFx0dmFyIG91dHB1dD1cIlwiO1xuXHRcdHZhciBpbnB1dD0oXG5cdFx0XHQ8dGV4dGFyZWFcblx0XHRcdFx0Y2xhc3NOYW1lPXt0aGlzLmNsYXNzTmFtZX1cblx0XHRcdFx0dmFsdWU9e3RoaXMudmFsdWV9XG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnByb3BzLmlucHV0Q2hhbmdlZH1cblx0XHRcdFx0cm93cz17dGhpcy5yb3dzfVxuXHRcdFx0XHRkaXNhYmxlZD17dGhpcy5kaXNhYmxlZH1cblx0ICAgICAgICAgIFx0cmVhZE9ubHk9e3RoaXMucmVhZG9ubHl9XG5cdCAgICAgICAgICBcdHJlcXVpcmVkPXt0aGlzLnJlcXVpcmVkfVxuXHRcdFx0Lz5cblx0XHQpO1xuXHRcdHZhciBsYWJsZT1cIlwiO1xuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgJiYgdGhpcy5wcm9wcy5sYWJsZSAhPT0gXCJcIil7XG5cdFx0XHRsYWJsZT0oPGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWxcIj57dGhpcy5wcm9wcy5sYWJsZX08L2xhYmVsPik7XG5cdFx0fVxuXHRcdG91dHB1dCA9ICg8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj57bGFibGV9e2lucHV0fTwvZGl2Pik7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj57b3V0cHV0fTwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbmV4cG9ydCBjbGFzcyBEYXRlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5kYXRlSW5pdD10aGlzLmRhdGVJbml0LmJpbmQodGhpcyk7XG5cdH1cblx0ZGF0ZUluaXQoKXtcblx0XHQkKCcuaW5wdXQtZ3JvdXAuZGF0ZSAuZGF0ZXBpY2snKS5kYXRlcGlja2VyKHtcblx0XHQgICAgdG9kYXlCdG46IFwibGlua2VkXCIsXG5cdFx0ICAgIG9yaWVudGF0aW9uOiBcImJvdHRvbSByaWdodFwiLFxuXHRcdCAgICBhdXRvY2xvc2U6IHRydWUsXG5cdFx0ICAgIHRvZGF5SGlnaGxpZ2h0OiB0cnVlXG5cdFx0fSkub24oJ2NoYW5nZURhdGUnLCBmdW5jdGlvbihlKSB7XG5cdFx0XHR2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2lucHV0JywgeyBidWJibGVzOiB0cnVlIH0pO1xuXHRcdFx0ZS50YXJnZXQuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cdFx0fSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLnBsYWNlaG9sZGVyID0gKHRoaXMucHJvcHMucGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnBsYWNlaG9sZGVyO1xuXHRcdHRoaXMubGFibGUgPSAodGhpcy5wcm9wcy5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMubGFibGU7XG5cdFx0dGhpcy5kaXNhYmxlZCA9ICh0aGlzLnByb3BzLmRpc2FibGVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PWZhbHNlfHx0aGlzLnByb3BzLmRpc2FibGVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVxdWlyZWQgPSAodGhpcy5wcm9wcy5yZXF1aXJlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1mYWxzZXx8dGhpcy5wcm9wcy5yZXF1aXJlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlYWRvbmx5ID0gKHRoaXMucHJvcHMucmVhZG9ubHkgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZWFkb25seT09ZmFsc2V8fHRoaXMucHJvcHMucmVhZG9ubHk9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cblxuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblx0XHR0aGlzLmNsYXNzTmFtZT0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJmb3JtLWNvbnRyb2wgZGF0ZXBpY2tcIjogXCJmb3JtLWNvbnRyb2wgZGF0ZXBpY2sgXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHZhciBpbnB1dD0oXG5cdFx0XHQ8aW5wdXRcblx0XHRcdFx0cmVmPXt0aGlzLmRhdGVJbml0fVxuXHRcdFx0XHR0eXBlPVwidGV4dFwiXG5cdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9XG5cdFx0XHRcdHBsYWNlaG9sZGVyPXt0aGlzLnBsYWNlaG9sZGVyfVxuXHRcdFx0XHR2YWx1ZT17dGhpcy52YWx1ZX1cblx0XHRcdFx0b25DaGFuZ2U9e3RoaXMucHJvcHMuaW5wdXRDaGFuZ2VkfVxuXHRcdFx0XHRkaXNhYmxlZD17dGhpcy5kaXNhYmxlZH1cblx0ICAgICAgICAgIFx0cmVhZE9ubHk9e3RoaXMucmVhZG9ubHl9XG5cdCAgICAgICAgICBcdHJlcXVpcmVkPXt0aGlzLnJlcXVpcmVkfVxuXHRcdFx0XHQvPlxuXG5cdFx0KTtcblxuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy5sYWJsZSA9PVwiXCIpe1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdCAgXHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdCAgXHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWxcIj57dGhpcy5wcm9wcy5sYWJsZX08L2xhYmVsPlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cCBkYXRlXCI+XG5cdFx0XHRcdFx0XHR7aW5wdXR9XG5cdFx0XHRcdCAgXHRcdDxzcGFuIGNsYXNzTmFtZT1cImlucHV0LWdyb3VwLWFkZG9uXCI+XG5cdFx0XHRcdCAgXHRcdFx0PGkgY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi10aFwiPjwvaT5cblx0XHRcdFx0ICBcdFx0PC9zcGFuPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHQgIFx0KTtcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdG91dHB1dCA9IChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAgZGF0ZVwiPlxuXG5cdFx0XHRcdFx0XHR7aW5wdXR9XG5cdFx0XHRcdCAgXHRcdDxzcGFuIGNsYXNzTmFtZT1cImlucHV0LWdyb3VwLWFkZG9uXCI+XG5cdFx0XHRcdCAgXHRcdFx0PGkgY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi10aFwiPjwvaT5cblx0XHRcdFx0ICBcdFx0PC9zcGFuPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5leHBvcnQgY2xhc3MgQXdlc29tcGxldGVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblxuXHRcdC8qICAgRG8gdGhlIGJpbmQgdGhpbmcgICovXG5cdFx0dGhpcy5jcmVhdGVMaXN0PXRoaXMuY3JlYXRlTGlzdC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZG9jQ2hhbmdlZD10aGlzLmRvY0NoYW5nZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLmNvbXBvbmVudERpZE1vdW50PXRoaXMuY29tcG9uZW50RGlkTW91bnQuYmluZCh0aGlzKTtcblx0XHR0aGlzLmlucHV0Q2hhbmdlPXRoaXMuaW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcblx0XHR0aGlzLmF1dG9jb21wbGV0ZT10aGlzLmF1dG9jb21wbGV0ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY29tcG9uZW50V2lsbFVubW91bnQ9dGhpcy5jb21wb25lbnRXaWxsVW5tb3VudC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMucmVmQ2FsbD10aGlzLnJlZkNhbGwuYmluZCh0aGlzKTtcblxuXHRcdC8vdGhpcy53b3Jrb3JkZXJPYmo9dGhpcy5vblN0YXR1c0NoYW5nZWQuYmluZCh0aGlzKTtcblx0XHQvKiAgICAgICAgICBlbmQgICAgICAgICAgKi9cblx0XHR0aGlzLml0ZW1saXN0PVtdO1xuXHRcdHRoaXMuc3RhdGU9e2l0ZW1saXN0OltdfTtcblx0XHR0aGlzLl9pc01vdW50ZWQ9ZmFsc2U7XG5cdFx0dmFyIGFyZ3M9e307XG5cdFx0dmFyIG9wdGlvbnM9e2RvY3R5cGU6dGhpcy5wcm9wcy5kb2N0eXBlfTtcblx0XHR2YXIgZmlsdGVyPXt9O1xuXHRcdGlmICh0aGlzLnByb3BzLmZpbHRlcj09dW5kZWZpbmVkIHx8IHRoaXMucHJvcHMuZmlsdGVyPT1udWxsKXtcblxuXHRcdH1lbHNle1xuXHRcdFx0ZmlsdGVyPSB0aGlzLnByb3BzLmZpbHRlcjtcblx0XHR9XG5cdFx0dGhpcy5saXN0VG9vbCA9IG5ldyBwcy5hcGlUb29sKGZpbHRlciwgb3B0aW9ucyAsdGhpcy5kb2NDaGFuZ2VkKTtcblx0XHRpZiAodGhpcy5saXN0VG9vbC5pdGVtcz09PXVuZGVmaW5lZCB8fHRoaXMubGlzdFRvb2wuaXRlbXM9PT0gMCB8fHRoaXMubGlzdFRvb2wuaXRlbXM9PT1udWxsICl7XG5cdFx0fWVsc2V7XG5cdFx0XHR0aGlzLnN0YXRlLmxpc3Q9dGhpcy5saXN0VG9vbC5pdGVtcztcblx0XHR9XG5cblx0XHR0aGlzLmNyZWF0ZUxpc3QoKTtcblx0fVxuXHRkb2NDaGFuZ2VkKCl7XG5cdFx0dGhpcy5jcmVhdGVMaXN0KCk7XG5cdH1cblx0Y29tcG9uZW50RGlkTW91bnQoKXtcblx0XHR0aGlzLl9pc01vdW50ZWQ9dHJ1ZTtcblx0XHR0aGlzLmF1dG9jb21wbGV0ZSgpO1xuXG5cdH1cblx0Y3JlYXRlTGlzdCgpe1xuXHRcdHRoaXMuaXRlbWxpc3Q9W107XG5cdFx0Ly9sYWJsZSBhbmQgdmFsdWVcblx0XHRpZiAodGhpcy5wcm9wcy5kb2NsYWJsZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMubGlzdFRvb2wuaXRlbXMgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmxpc3RUb29sLml0ZW1zICE9PSBudWxsKXtcblx0XHRcdGZvcihsZXQgaXRlbSBvZiB0aGlzLmxpc3RUb29sLml0ZW1zKXtcblx0XHRcdFx0dmFyIHRlbXAgPVtpdGVtW3RoaXMucHJvcHMuZG9jbGFibGVdLGl0ZW1bdGhpcy5wcm9wcy5kb2N2YWx1ZV1dO1xuXHRcdFx0XHR0aGlzLml0ZW1saXN0LnB1c2godGVtcCk7XG5cdFx0XHR9XG5cdFx0XHQkKGRvY3VtZW50KS50cmlnZ2VyKCdsaXN0TG9hZCcgKyB0aGlzLnByb3BzLmRvY3R5cGUpO1xuXHRcdH1cblx0XHQvL2p1c3QgbGFibGVcblx0XHRlbHNlIGlmKHRoaXMubGlzdFRvb2wuaXRlbXMgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmxpc3RUb29sLml0ZW1zICE9PSBudWxsKXtcblx0XHRcdGZvcihsZXQgaXRlbSBvZiB0aGlzLmxpc3RUb29sLml0ZW1zKXtcblx0XHRcdFx0dGhpcy5pdGVtbGlzdC5wdXNoKGl0ZW1bdGhpcy5wcm9wcy5kb2N2YWx1ZV0pO1xuXHRcdFx0fVxuXHRcdFx0JChkb2N1bWVudCkudHJpZ2dlcignbGlzdExvYWQnICsgdGhpcy5wcm9wcy5kb2N0eXBlLnJlcGxhY2UoXCIgXCIsXCJcIikpO1xuXHRcdH1cblx0fVxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuXHRcdC8vIGNvbnNvbGUubG9nKFwiSEVMTE9cIik7XG5cdFx0Ly8gdGhpcy5hdy5kZXN0cm95KCk7XG5cdFx0Ly8gZGVsZXRlIHRoaXMuYXc7XG5cdFx0Ly8gY29uc29sZS5sb2coXCJURVNUXCIpO1xuXHR9XG5cdHJlZkNhbGwoaW5wdXQpe1xuXHRcdHRoaXMuaW5wdXQ9aW5wdXQ7XG5cdH1cblx0YXV0b2NvbXBsZXRlKGlucHV0KXtcblx0XHRpbnB1dD10aGlzLmlucHV0O1xuXHRcdHZhciBjb25maWc9IHtcblx0XHRcdFx0bWluQ2hhcnM6IDAsXG5cdFx0XHRcdG1heEl0ZW1zOiA5OSxcblx0XHRcdFx0YXV0b0ZpcnN0OiB0cnVlLFxuXHRcdFx0XHRmaWx0ZXI6IEF3ZXNvbXBsZXRlLkZJTFRFUl9TVEFSVFNXSVRIXG5cdFx0XHR9XG5cdFx0aWYodGhpcy5wcm9wcy5kb2NsYWJsZSAhPT0gdW5kZWZpbmVkICl7XG5cdFx0XHRjb25maWcuaXRlbT0gZnVuY3Rpb24oaXRlbSwgaW5wdXQpIHtcblx0XHRcdFx0dmFyIGQgPSBpdGVtO1xuXHRcdFx0XHR2YXIgaHRtbCA9IFwiPHNwYW4+XCIgKyBfXyhpdGVtLmxhYmVsKSsgXCI8L3NwYW4+PGJyPjxzcGFuPjxzbWFsbD5cIitpdGVtLnZhbHVlK1wiPC9zbWFsbD48L3NwYW4+XCI7XG5cdFx0XHRcdHJldHVybiAkKCc8bGk+PC9saT4nKVxuXHRcdFx0XHRcdC5kYXRhKCdpdGVtLmF1dG9jb21wbGV0ZScsIGl0ZW0pXG5cdFx0XHRcdFx0Lmh0bWwoJzxhPjxwPicgKyBodG1sICsgJzwvcD48L2E+Jylcblx0XHRcdFx0XHQuZ2V0KDApO1xuXHRcdFx0fVxuXG5cdFx0fWVsc2V7XG5cdFx0XHRjb25maWcuaXRlbT1mdW5jdGlvbihpdGVtLCBpbnB1dCkge1xuXHRcdFx0XHR2YXIgZCA9IGl0ZW07XG5cdFx0XHRcdHZhciBodG1sID0gXCI8c3Bhbj5cIiArIF9fKGl0ZW0pKyBcIjwvc3Bhbj5cIjtcblx0XHRcdFx0cmV0dXJuICQoJzxsaT48L2xpPicpXG5cdFx0XHRcdFx0LmRhdGEoJ2l0ZW0uYXV0b2NvbXBsZXRlJywgaXRlbSlcblx0XHRcdFx0XHQuaHRtbCgnPGE+PHA+JyArIGh0bWwgKyAnPC9wPjwvYT4nKVxuXHRcdFx0XHRcdC5nZXQoMCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuYXcgPSBuZXcgQXdlc29tcGxldGUoaW5wdXQsY29uZmlnKTtcblx0XHRpbnB1dC5hZGRFdmVudExpc3RlbmVyKFxuXHRcdFx0J2F3ZXNvbXBsZXRlLXNlbGVjdGNvbXBsZXRlJyxcblx0XHRcdFx0dGhpcy5pbnB1dENoYW5nZVxuXHRcdCk7XG5cdFx0JChpbnB1dCkuY2xpY2soIGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKHRoaXMuYXcudWwuY2hpbGROb2Rlcy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0dGhpcy5hdy5taW5DaGFycyA9IDA7XG5cdFx0XHRcdHRoaXMuYXcuZXZhbHVhdGUoKTtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKHRoaXMuYXcudWwuaGFzQXR0cmlidXRlKCdoaWRkZW4nKSkge1xuXHRcdFx0XHR0aGlzLmF3Lm9wZW4oKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHR0aGlzLmF3LmNsb3NlKCk7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLmF3Lmxpc3Q9dGhpcy5pdGVtTGlzdDtcblx0XHQkKGRvY3VtZW50KS5iaW5kKCdsaXN0TG9hZCcgKyB0aGlzLnByb3BzLmRvY3R5cGUucmVwbGFjZShcIiBcIixcIlwiKSxmdW5jdGlvbigpe1xuXHRcdFx0dGhpcy5hdy5saXN0PXRoaXMuaXRlbWxpc3Q7XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0fVxuXHRpbnB1dENoYW5nZShlKXtcblx0XHR0aGlzLnByb3BzLmlucHV0Q2hhbmdlZChlKTtcblx0fVxuXG5cdHJlbmRlcigpe1xuXHRcdHRoaXMudHlwZSA9ICh0aGlzLnByb3BzLnR5cGUgPT09IHVuZGVmaW5lZCkgPyBcInRleHRcIjogdGhpcy5wcm9wcy50eXBlO1xuXHRcdHRoaXMudmFsdWUgPSAodGhpcy5wcm9wcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMudmFsdWU7XG5cdFx0dGhpcy5wbGFjZWhvbGRlciA9ICh0aGlzLnByb3BzLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5wbGFjZWhvbGRlcjtcblx0XHR0aGlzLmxhYmxlID0gKHRoaXMucHJvcHMubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLmxhYmxlO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlcXVpcmVkID0gKHRoaXMucHJvcHMucmVxdWlyZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZXF1aXJlZD09ZmFsc2V8fHRoaXMucHJvcHMucmVxdWlyZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZWFkb25seSA9ICh0aGlzLnByb3BzLnJlYWRvbmx5ID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVhZG9ubHk9PWZhbHNlfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXG5cdFx0dmFyIG91dHB1dD1cIlwiO1xuXHRcdHRoaXMuY2xhc3NOYW1lPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcImZvcm0tY29udHJvbCBhd2Vzb21wbGV0ZVwiOiBcImZvcm0tY29udHJvbCBhd2Vzb21wbGV0ZSBcIiArdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0dmFyIGlucHV0PSggPGlucHV0XG5cdFx0XHRcdFx0dmFsdWU9e3RoaXMudmFsdWV9XG5cblx0XHRcdFx0XHR0eXBlPXt0aGlzLnR5cGV9XG5cdFx0XHRcdFx0Y2xhc3NOYW1lPXt0aGlzLmNsYXNzTmFtZX1cblx0XHRcdFx0XHRwbGFjZWhvbGRlcj17dGhpcy5wbGFjZWhvbGRlcn1cblx0XHRcdFx0XHRyZWY9e3RoaXMucmVmQ2FsbH1cblx0XHQgICAgICAgICAgXHRvbkNoYW5nZT17dGhpcy5pbnB1dENoYW5nZX1cblx0XHQgICAgICAgICAgXHRkaXNhYmxlZD17dGhpcy5kaXNhYmxlZH1cblx0XHQgICAgICAgICAgXHRyZWFkT25seT17dGhpcy5yZWFkb25seX1cblx0XHQgICAgICAgICAgXHRyZXF1aXJlZD17dGhpcy5yZXF1aXJlZH1cblx0XHQgICAgICAgICAgLz4pO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMubGFibGUgIT09IHVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLmxhYmxlID09XCJcIil7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBcIj5cblx0XHQgICAgXHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD5cblx0XHQgICAgXHRcdDxkaXYgY2xhc3NOYW1lPVwiXCI+XG5cdFx0ICAgICAgXHRcdFx0e2lucHV0fVxuXHRcdCAgICBcdFx0PC9kaXY+XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdCAgICAgIFx0XHR7aW5wdXR9XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5leHBvcnQgY2xhc3MgQnV0dG9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnR5cGUgPSAodGhpcy5wcm9wcy50eXBlID09PSB1bmRlZmluZWQpID8gXCJ0ZXh0XCI6IHRoaXMucHJvcHMudHlwZTtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR2YXIgb3V0cHV0PVwiXCI7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiYnRuXCI6IFwiYnRuIFwiICt0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHR2YXIgaWNvbj1cIlwiO1xuXHRcdGlmKHRoaXMucHJvcHMuaWNvbiE9PSB1bmRlZmluZWQgJiYgdGhpcy5wcm9wcy5pY29uIT09XCJcIil7XG5cdFx0XHR2YXIgaWNvbkNsYXNzPVwiZ2x5cGhpY29uIFwiICt0aGlzLnByb3BzLmljb247XG5cdFx0XHRpY29uPSg8c3BhbiBjbGFzc05hbWU9e2ljb25DbGFzc30gYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPik7XG5cdFx0fVxuXHRcdHZhciBpbnB1dD0oXG5cdFx0XHQ8YnV0dG9uXG5cdFx0XHRcdHR5cGU9e3RoaXMudHlwZX1cblx0XHRcdFx0Y2xhc3NOYW1lPXt0aGlzLmNsYXNzTmFtZX1cblx0XHRcdFx0dmFsdWU9e3RoaXMudmFsdWV9XG5cdFx0XHRcdG9uQ2xpY2s9e3RoaXMucHJvcHMub25DbGlja31cblx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdFx0XHQ+e2ljb259IHt0aGlzLnZhbHVlfTwvYnV0dG9uPlxuXHRcdCk7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG5cdCAgXHRcdHtpbnB1dH1cblx0ICBcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbiIsIi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZGFsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuc3VibWl0PXRoaXMuc3VibWl0LmJpbmQodGhpcyk7XG5cdH1cblx0c3VibWl0KGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR0aGlzLnByb3BzLnN1Ym1pdChlKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR2YXIgZm9vdGVyPVwiXCI7XG5cdFx0aWYodGhpcy5wcm9wcy5zdWJtaXQhPT0gZmFsc2Upe1xuXHRcdFx0Zm9vdGVyPShcdFx0XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZm9vdGVyXCI+XG5cdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNsb3NlPC9idXR0b24+XG5cdFx0XHRcdFx0PGJ1dHRvbiBcblx0XHRcdFx0XHRcdHR5cGU9XCJzdWJtaXRcIiBcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMuc3VibWl0fSBcblx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiID5cblx0XHRcdFx0XHRcdFx0e3RoaXMucHJvcHMuc3VibWl0VGV4dH1cblx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQpXG5cdFx0fVxuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwgZmFkZSB0ZXh0LWxlZnQgcGFuZWwtZGVmYXVsdFwiIGlkPXt0aGlzLnByb3BzLmlkfSB0YWJJbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiIGFyaWEtbGFiZWxsZWRieT1cImV4YW1wbGVNb2RhbExhYmVsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nXCIgcm9sZT1cImRvY3VtZW50XCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWhlYWRlclwiPlxuXHRcdFx0XHRcdFx0XHQ8aDQgY2xhc3NOYW1lPVwibW9kYWwtdGl0bGVcIiBpZD1cImV4YW1wbGVNb2RhbExhYmVsXCI+e3RoaXMucHJvcHMudGl0bGV9PC9oND5cblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgZGlzcGxheT1cIm5vbmVcIiBjbGFzc05hbWU9XCJjbG9zZSBoaWRlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj5cblx0XHRcdFx0XHRcdFx0PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHlcIj5cblx0XHRcdFx0XHRcdFx0XHR7IHRoaXMucHJvcHMuY2hpbGRyZW4gfVxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0e2Zvb3Rlcn1cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cblxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5pbml0VGFibGU9dGhpcy5pbml0VGFibGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmNvbXBvbmVudERpZFVwZGF0ZT10aGlzLmNvbXBvbmVudERpZFVwZGF0ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY29tcG9uZW50V2lsbFVwZGF0ZT10aGlzLmNvbXBvbmVudFdpbGxVcGRhdGUuYmluZCh0aGlzKTtcblxuXHR9XG5cblx0aW5pdFRhYmxlKCl7XG5cdFx0Ly9cblx0XHQvLyBpZih0aGlzLnRhYmxlICE9PSB1bmRlZmluZWQpe1xuXHRcdC8vIFx0dGhpcy50YWJsZS5kZXN0cm95KCk7XG5cdFx0Ly8gfVxuXHRcdHZhciBjb25maWc9e1xuXHQgICAgXHRcImRlc3Ryb3lcIjogdHJ1ZSxcblx0ICAgIFx0XCJzY3JvbGxZXCI6ICc3MHZoJyxcbiAgICAgICAgXHRcInNjcm9sbENvbGxhcHNlXCI6IHRydWUsXG5cdCAgICAgICAgXCJzY3JvbGxYXCI6IHRydWUsXG5cdCAgICAgICAgXCJwYWdpbmdcIjogICBmYWxzZSxcblx0ICAgICAgICBcInN0YXRlU2F2ZVwiOiB0cnVlLFxuXHQgICAgICAgIFwiY29sdW1uc1wiOiB0aGlzLnByb3BzLmNvbHVtbnMsXG5cdCAgICAgICAgXCJpbmZvXCI6ICAgICBmYWxzZVxuXHQgICAgfTtcblx0ICAgIGlmKHRoaXMucHJvcHMuc2VhcmNoKXtcblx0ICAgIFx0Y29uZmlnLnNlYXJjaGluZz10cnVlO1xuXHQgICAgfVxuXHQgICAgZWxzZXtjb25maWcuc2VhcmNoaW5nPWZhbHNlO31cblx0ICAgIHRoaXMudGFibGU9JChcIiNcIit0aGlzLnByb3BzLmlkKS5EYXRhVGFibGUoY29uZmlnKTtcblx0fVxuXHRjb21wb25lbnRXaWxsVXBkYXRlKCl7XG5cblx0XHRpZih0aGlzLnRhYmxlICE9PSB1bmRlZmluZWQpe1xuXHRcdFx0Y29uc29sZS5sb2coXCJERVNUUk9ZXCIpO1xuXHRcdFx0dGhpcy50YWJsZS5kZXN0cm95KCk7XG5cdFx0fVxuXHR9XG5cdGNvbXBvbmVudERpZFVwZGF0ZSgpe1xuXHRcdHRoaXMuaW5pdFRhYmxlKCk7XG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHRyZXR1cm4oXG5cblx0XHRcdDx0YWJsZVxuXHRcdFx0XHRjbGFzc05hbWU9XCJzdHJpcGUgdGFibGUgdGFibGUtYm9yZGVyZWQgcHMtbGlzdC10YWJsZVwiIFxuXHRcdFx0XHR3aWR0aD1cIjEwMCVcIlxuXHRcdFx0XHRpZD17dGhpcy5wcm9wcy5pZH1cblx0XHRcdFx0PlxuXHRcdFx0XHR7dGhpcy5wcm9wcy5jb250ZW50fVxuXHRcdFx0PC90YWJsZT5cblx0XHQpO1xuXHR9XG59IiwiaW1wb3J0IERvY1RhYmxlIGZyb20gJy4uLy4uLy4uL3B1YmxpYy9qcy9tb2R1bGVzL3V0aWxzL2RvY1RhYmxlJ1xuaW1wb3J0IEFjb3JkaWFuQ29udGVudCBmcm9tICcuLi8uLi8uLi9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9hY29yZGlhbkNvbnRlbnQnXG5cblxuY29uc3QgYXBwPSAkKCcjYXBwJylbMF07XG5cbihmdW5jdGlvbigpe1xuXHR2YXIgZmlsdGVyPXt9O1xuXHRmcmFwcGUucmVhZHkoZnVuY3Rpb24oKXtcblx0XHR2YXIgd29ya29yZGVyQ29uZmlnPVtcblx0XHRcdHtcblx0XHRcdFx0bGFibGU6XCJWaW5leWFyZFwiLFxuXHRcdFx0XHR2YWx1ZTpcImxvY2F0aW9uXCIsXG5cdFx0XHRcdGhyZWY6XCJsb2NhdGlvbl9yb3V0ZVwiLFxuXHRcdFx0XHRpblRhYmxlOmZhbHNlLFxuXHRcdFx0XHRhY3RpdmU6MCxcblx0XHRcdFx0ZGVmYXVsdDpjdXJyZW50VmluZXlhcmRcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmxlOlwiU3RhdHVzXCIsXG5cdFx0XHRcdHZhbHVlOlwic3RhdHVzXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmxlOlwiUHJpb3JpdHlcIixcblx0XHRcdFx0dmFsdWU6XCJwcmlvcml0eVwiLFxuXHRcdFx0XHRhY3RpdmU6MVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bGFibGU6XCJTZWFzb25cIixcblx0XHRcdFx0dmFsdWU6XCJzZWFzb25cIixcblx0XHRcdFx0YWN0aXZlOjFcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmxlOlwiRGF0ZVwiLFxuXHRcdFx0XHR2YWx1ZTpcImRhdGVcIixcblx0XHRcdFx0YWN0aXZlOjFcblx0XHRcdH1cblx0XHRdO1xuXHRcdHZhciBpc3N1ZUNvbmZpZz1bXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmxlOlwiVmluZXlhcmRcIixcblx0XHRcdFx0dmFsdWU6XCJ2aW5leWFyZFwiLFxuXHRcdFx0XHRocmVmOlwidmluZXlhcmRfcm91dGVcIixcblx0XHRcdFx0aW5UYWJsZTpmYWxzZSxcblx0XHRcdFx0YWN0aXZlOjAsXG5cdFx0XHRcdGRlZmF1bHQ6Y3VycmVudFZpbmV5YXJkXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIlN0YXR1c1wiLFxuXHRcdFx0XHR2YWx1ZTpcInN0YXR1c1wiLFxuXHRcdFx0XHRhY3RpdmU6MVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bGFibGU6XCJQcmlvcml0eVwiLFxuXHRcdFx0XHR2YWx1ZTpcInByaW9yaXR5XCIsXG5cdFx0XHRcdGFjdGl2ZToxXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIldvcmsgT3JkZXJcIixcblx0XHRcdFx0dmFsdWU6XCJ3b3JrX29yZGVyXCIsXG5cdFx0XHRcdGFjdGl2ZToxXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIklzc3VlXCIsXG5cdFx0XHRcdHZhbHVlOlwiaXNzdWVcIixcblx0XHRcdFx0YWN0aXZlOjEsXG5cdFx0XHRcdHR5cGU6XCJ0ZXh0YXJlYVwiXG5cdFx0XHR9XG5cdFx0XTtcblx0XHR2YXIgc3ByYXlDb25maWc9W1xuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIlZpbmV5YXJkXCIsXG5cdFx0XHRcdHZhbHVlOlwidmluZXlhcmRcIixcblx0XHRcdFx0aHJlZjpcInZpbmV5YXJkX3JvdXRlXCIsXG5cdFx0XHRcdGluVGFibGU6ZmFsc2UsXG5cdFx0XHRcdGFjdGl2ZTowLFxuXHRcdFx0XHRkZWZhdWx0OmN1cnJlbnRWaW5leWFyZFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bGFibGU6XCJXb3JrIE9yZGVyXCIsXG5cdFx0XHRcdHZhbHVlOlwid29ya19vcmRlclwiLFxuXHRcdFx0XHRhY3RpdmU6MVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bGFibGU6XCJTZWFzb25cIixcblx0XHRcdFx0dmFsdWU6XCJzZWFzb25cIixcblx0XHRcdFx0YWN0aXZlOjFcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmxlOlwiTm90ZVwiLFxuXHRcdFx0XHR2YWx1ZTpcIm5vdGVcIixcblx0XHRcdFx0YWN0aXZlOjEsXG5cdFx0XHRcdHR5cGU6XCJ0ZXh0YXJlYVwiXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIlNwcmF5IFR5cGVcIixcblx0XHRcdFx0dmFsdWU6XCJzcHJheV90eXBlXCIsXG5cdFx0XHRcdGFjdGl2ZToxXG5cdFx0XHR9XG5cdFx0XTtcblx0XHQvL2RvbmVcblx0XHR2YXIgcHJ1bm5pbmdDb25maWc9W1xuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIlZpbmV5YXJkXCIsXG5cdFx0XHRcdHZhbHVlOlwidmluZXlhcmRcIixcblx0XHRcdFx0aHJlZjpcInZpbmV5YXJkX3JvdXRlXCIsXG5cdFx0XHRcdGluVGFibGU6ZmFsc2UsXG5cdFx0XHRcdGFjdGl2ZTowLFxuXHRcdFx0XHRkZWZhdWx0OmN1cnJlbnRWaW5leWFyZFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bGFibGU6XCJXb3JrIE9yZGVyXCIsXG5cdFx0XHRcdHZhbHVlOlwid29ya19vcmRlclwiLFxuXHRcdFx0XHRhY3RpdmU6MVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bGFibGU6XCJTZWFzb25cIixcblx0XHRcdFx0dmFsdWU6XCJzZWFzb25cIixcblx0XHRcdFx0YWN0aXZlOjFcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmxlOlwiTm90ZVwiLFxuXHRcdFx0XHR2YWx1ZTpcIm5vdGVcIixcblx0XHRcdFx0YWN0aXZlOjEsXG5cdFx0XHRcdHR5cGU6XCJ0ZXh0YXJlYVwiXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIkRhdGVcIixcblx0XHRcdFx0dmFsdWU6XCJkYXRlXCIsXG5cdFx0XHRcdGFjdGl2ZToxXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIlN0eWxlXCIsXG5cdFx0XHRcdHZhbHVlOlwidHlwZVwiLFxuXHRcdFx0XHRhY3RpdmU6MVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bGFibGU6XCJCLUxvY2tcIixcblx0XHRcdFx0dmFsdWU6XCJiX2xvY2tcIixcblx0XHRcdFx0YWN0aXZlOjFcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmxlOlwiUHJ1bmluZyBSZW1vdmVkXCIsXG5cdFx0XHRcdHZhbHVlOlwicmVtb3ZlZFwiLFxuXHRcdFx0XHRhY3RpdmU6MVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bGFibGU6XCJQcmUgUHJ1bmVcIixcblx0XHRcdFx0dmFsdWU6XCJwcmVfcHJ1bmVcIixcblx0XHRcdFx0YWN0aXZlOjFcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmxlOlwiVGFwIFJlbW92ZWRcIixcblx0XHRcdFx0dmFsdWU6XCJ0YXBfcmVtb3ZlZFwiLFxuXHRcdFx0XHRhY3RpdmU6MVxuXHRcdFx0fVxuXHRcdF07XG5cdFx0dmFyIGhhcnZlc3RDb25maWc9W1xuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIlZpbmV5YXJkXCIsXG5cdFx0XHRcdHZhbHVlOlwidmluZXlhcmRcIixcblx0XHRcdFx0aHJlZjpcInZpbmV5YXJkX3JvdXRlXCIsXG5cdFx0XHRcdGluVGFibGU6ZmFsc2UsXG5cdFx0XHRcdGFjdGl2ZTowLFxuXHRcdFx0XHRkZWZhdWx0OmN1cnJlbnRWaW5leWFyZFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bGFibGU6XCJXb3JrIE9yZGVyXCIsXG5cdFx0XHRcdHZhbHVlOlwid29ya19vcmRlclwiLFxuXHRcdFx0XHRhY3RpdmU6MVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bGFibGU6XCJTZWFzb25cIixcblx0XHRcdFx0dmFsdWU6XCJzZWFzb25cIixcblx0XHRcdFx0YWN0aXZlOjFcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmxlOlwiTm90ZVwiLFxuXHRcdFx0XHR2YWx1ZTpcIm5vdGVcIixcblx0XHRcdFx0YWN0aXZlOjEsXG5cdFx0XHRcdHR5cGU6XCJ0ZXh0YXJlYVwiXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIlBvdW5kc1wiLFxuXHRcdFx0XHR2YWx1ZTpcInBvdW5kc1wiLFxuXHRcdFx0XHRhY3RpdmU6MVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bGFibGU6XCJQb3N0IEhhcnZlc3QgV2F0ZXJcIixcblx0XHRcdFx0dmFsdWU6XCJwb3N0X2hhcnZlc3Rfd2F0ZXJcIixcblx0XHRcdFx0YWN0aXZlOjFcblx0XHRcdH1cblx0XHRdO1xuXHRcdHZhciBiaXJkTmV0c0NvbmZpZz1bXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmxlOlwiVmluZXlhcmRcIixcblx0XHRcdFx0dmFsdWU6XCJ2aW5leWFyZFwiLFxuXHRcdFx0XHRocmVmOlwidmluZXlhcmRfcm91dGVcIixcblx0XHRcdFx0aW5UYWJsZTpmYWxzZSxcblx0XHRcdFx0YWN0aXZlOjAsXG5cdFx0XHRcdGRlZmF1bHQ6Y3VycmVudFZpbmV5YXJkXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIldvcmsgT3JkZXJcIixcblx0XHRcdFx0dmFsdWU6XCJ3b3JrX29yZGVyXCIsXG5cdFx0XHRcdGFjdGl2ZToxXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIlNlYXNvblwiLFxuXHRcdFx0XHR2YWx1ZTpcInNlYXNvblwiLFxuXHRcdFx0XHRhY3RpdmU6MVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bGFibGU6XCJOb3RlXCIsXG5cdFx0XHRcdHZhbHVlOlwibm90ZVwiLFxuXHRcdFx0XHRhY3RpdmU6MSxcblx0XHRcdFx0dHlwZTpcInRleHRhcmVhXCJcblx0XHRcdH1cblx0XHRdO1xuXHRcdHZhciB3YXRlcmluZ0NvbmZpZz1bXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmxlOlwiVmluZXlhcmRcIixcblx0XHRcdFx0dmFsdWU6XCJ2aW5leWFyZFwiLFxuXHRcdFx0XHRocmVmOlwidmluZXlhcmRfcm91dGVcIixcblx0XHRcdFx0aW5UYWJsZTpmYWxzZSxcblx0XHRcdFx0YWN0aXZlOjAsXG5cdFx0XHRcdGRlZmF1bHQ6Y3VycmVudFZpbmV5YXJkXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIldvcmsgT3JkZXJcIixcblx0XHRcdFx0dmFsdWU6XCJ3b3JrX29yZGVyXCIsXG5cdFx0XHRcdGFjdGl2ZToxXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIlNlYXNvblwiLFxuXHRcdFx0XHR2YWx1ZTpcInNlYXNvblwiLFxuXHRcdFx0XHRhY3RpdmU6MVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bGFibGU6XCJOb3RlXCIsXG5cdFx0XHRcdHZhbHVlOlwibm90ZVwiLFxuXHRcdFx0XHRhY3RpdmU6MSxcblx0XHRcdFx0dHlwZTpcInRleHRhcmVhXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmxlOlwiRHVyYXRpb25cIixcblx0XHRcdFx0dmFsdWU6XCJkdXJhdGlvblwiLFxuXHRcdFx0XHRhY3RpdmU6MVxuXHRcdFx0fVxuXHRcdF07XG5cdFx0dmFyIGNhbm9weUNvbmZpZz1bXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmxlOlwiVmluZXlhcmRcIixcblx0XHRcdFx0dmFsdWU6XCJ2aW5leWFyZFwiLFxuXHRcdFx0XHRocmVmOlwidmluZXlhcmRfcm91dGVcIixcblx0XHRcdFx0aW5UYWJsZTpmYWxzZSxcblx0XHRcdFx0YWN0aXZlOjAsXG5cdFx0XHRcdGRlZmF1bHQ6Y3VycmVudFZpbmV5YXJkXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIldvcmsgT3JkZXJcIixcblx0XHRcdFx0dmFsdWU6XCJ3b3JrX29yZGVyXCIsXG5cdFx0XHRcdGFjdGl2ZToxXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIlNlYXNvblwiLFxuXHRcdFx0XHR2YWx1ZTpcInNlYXNvblwiLFxuXHRcdFx0XHRhY3RpdmU6MVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bGFibGU6XCJOb3RlXCIsXG5cdFx0XHRcdHZhbHVlOlwibm90ZVwiLFxuXHRcdFx0XHRhY3RpdmU6MSxcblx0XHRcdFx0dHlwZTpcInRleHRhcmVhXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmxlOlwiVHlwZVwiLFxuXHRcdFx0XHR2YWx1ZTpcInR5cGVcIixcblx0XHRcdFx0YWN0aXZlOjFcblx0XHRcdH1cblx0XHRdO1xuXHRcdHZhciBicml4Q29uZmlnPVtcblx0XHRcdHtcblx0XHRcdFx0bGFibGU6XCJWaW5leWFyZFwiLFxuXHRcdFx0XHR2YWx1ZTpcInZpbmV5YXJkXCIsXG5cdFx0XHRcdGhyZWY6Y3VycmVudFZpbmV5YXJkLFxuXHRcdFx0XHRpblRhYmxlOmZhbHNlLFxuXHRcdFx0XHRhY3RpdmU6MCxcblx0XHRcdFx0ZGVmYXVsdDpcIkNSViBWaW5lc1wiXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIlNlYXNvblwiLFxuXHRcdFx0XHR2YWx1ZTpcInNlYXNvblwiLFxuXHRcdFx0XHRhY3RpdmU6MVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bGFibGU6XCJOb3RlXCIsXG5cdFx0XHRcdHZhbHVlOlwibm90ZVwiLFxuXHRcdFx0XHRhY3RpdmU6MSxcblx0XHRcdFx0dHlwZTpcInRleHRhcmVhXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmxlOlwiQnJpeCBBXCIsXG5cdFx0XHRcdHZhbHVlOlwiYnJpeF9hXCIsXG5cdFx0XHRcdGFjdGl2ZToxXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJsZTpcIkJyaXggQlwiLFxuXHRcdFx0XHR2YWx1ZTpcImJyaXhfYlwiLFxuXHRcdFx0XHRhY3RpdmU6MVxuXHRcdFx0fVxuXHRcdF07XG5cdFx0UmVhY3RET00ucmVuZGVyKCA8ZGl2PlxuXHRcdFx0PEFjb3JkaWFuQ29udGVudFxuXHRcdFx0XHR0aXRsZT1cIldvcmtvcmRlciBUYWJsZVwiXG5cdFx0XHRcdGFjdGl2ZT17ZmFsc2V9XG5cdFx0XHRcdHBhcmVudElkPVwid29ya19vcmRlclwiXG5cdFx0XHRcdGlkPVwiV29ya29yZGVyQWNvcmRpYW5cIiA+IFxuXHRcdFx0XHQ8RG9jVGFibGUgXG5cdFx0XHRcdFx0c2VhcmNoPXtmYWxzZX1cblx0XHRcdFx0XHRkb2N0eXBlPVwid29ya19vcmRlclwiXG5cdFx0XHRcdFx0aWQ9XCJXb3Jrb3JkZXJUYWJsZVwiXG5cdFx0XHRcdFx0ZmlsdGVyPXsge2xvY2F0aW9uOmN1cnJlbnRWaW5leWFyZH0gfVxuXHRcdFx0XHRcdGNvbmZpZz17d29ya29yZGVyQ29uZmlnfVxuXHRcdFx0XHRcdGVkaXRhYmxlPXsxfVxuXHRcdFx0XHQvPiBcblx0XHRcdDwvQWNvcmRpYW5Db250ZW50PlxuXHRcdFx0PEFjb3JkaWFuQ29udGVudFxuXHRcdFx0XHR0aXRsZT1cIklzc3VlIFRhYmxlXCJcblx0XHRcdFx0YWN0aXZlPXtmYWxzZX1cblx0XHRcdFx0cGFyZW50SWQ9XCJJc3N1ZVwiXG5cdFx0XHRcdGlkPVwiSXNzdWVBY29yZGlhblwiPiBcblx0XHRcdFx0PERvY1RhYmxlIFxuXHRcdFx0XHRcdHNlYXJjaD17ZmFsc2V9XG5cdFx0XHRcdFx0ZG9jdHlwZT1cIklzc3VlXCJcblx0XHRcdFx0XHRpZD1cIklzc3VlVGFibGVcIlxuXHRcdFx0XHRcdGZpbHRlcj17IHt2aW5leWFyZDpjdXJyZW50VmluZXlhcmR9IH1cblx0XHRcdFx0XHRjb25maWc9e2lzc3VlQ29uZmlnfVxuXHRcdFx0XHRcdGVkaXRhYmxlPXsxfVxuXHRcdFx0XHQvPiBcblx0XHRcdDwvQWNvcmRpYW5Db250ZW50PlxuXHRcdFx0PEFjb3JkaWFuQ29udGVudFxuXHRcdFx0XHRjbGFzc05hbWU9XCJ0YWJsZVBhbmVsXCJcblx0XHRcdFx0dGl0bGU9XCJTcHJheWluZyBUYWJsZVwiXG5cdFx0XHRcdGFjdGl2ZT17ZmFsc2V9XG5cdFx0XHRcdHBhcmVudElkPVwiU3ByYXlpbmdcIlxuXHRcdFx0XHRpZD1cIlNwcmF5aW5nXCIgPiBcblx0XHRcdFx0PERvY1RhYmxlIFxuXHRcdFx0XHRcdHNlYXJjaD17ZmFsc2V9XG5cdFx0XHRcdFx0ZG9jdHlwZT1cIlNwcmF5aW5nXCJcblx0XHRcdFx0XHRpZD1cImRvY3RhYmxlXCJcblx0XHRcdFx0XHRmaWx0ZXI9eyB7dmluZXlhcmQ6Y3VycmVudFZpbmV5YXJkfSB9XG5cdFx0XHRcdFx0Y29uZmlnPXtzcHJheUNvbmZpZ31cblx0XHRcdFx0XHRlZGl0YWJsZT17MX1cblx0XHRcdFx0Lz4gXG5cdFx0XHQ8L0Fjb3JkaWFuQ29udGVudD5cblx0XHRcdDxBY29yZGlhbkNvbnRlbnRcblx0XHRcdFx0Y2xhc3NOYW1lPVwidGFibGVQYW5lbFwiXG5cdFx0XHRcdHRpdGxlPVwiUHJ1bmluZyBUYWJsZVwiXG5cdFx0XHRcdGFjdGl2ZT17ZmFsc2V9XG5cdFx0XHRcdHBhcmVudElkPVwicHJ1bmluZ1wiXG5cdFx0XHRcdGlkPVwicHJ1bmluZ1wiPiBcblx0XHRcdFx0PERvY1RhYmxlIFxuXHRcdFx0XHRcdHNlYXJjaD17ZmFsc2V9XG5cdFx0XHRcdFx0ZG9jdHlwZT1cIlBydW5pbmdcIlxuXHRcdFx0XHRcdGlkPVwiUHJ1bmluZ1RhYmxlXCJcblx0XHRcdFx0XHRmaWx0ZXI9eyB7dmluZXlhcmQ6Y3VycmVudFZpbmV5YXJkfSB9XG5cdFx0XHRcdFx0Y29uZmlnPXtwcnVubmluZ0NvbmZpZ31cblx0XHRcdFx0XHRlZGl0YWJsZT17MX1cblx0XHRcdFx0Lz4gXG5cdFx0XHQ8L0Fjb3JkaWFuQ29udGVudD5cblx0XHRcdDxBY29yZGlhbkNvbnRlbnRcblx0XHRcdFx0Y2xhc3NOYW1lPVwidGFibGVQYW5lbFwiXG5cdFx0XHRcdHRpdGxlPVwiSGFydmVzdCBUYWJsZVwiXG5cdFx0XHRcdGFjdGl2ZT17ZmFsc2V9XG5cdFx0XHRcdHBhcmVudElkPVwiaGFydmVzdFwiXG5cdFx0XHRcdGlkPVwiaGFydmVzdEFjb3JkaWFuXCI+IFxuXHRcdFx0XHQ8RG9jVGFibGUgXG5cdFx0XHRcdFx0c2VhcmNoPXtmYWxzZX1cblx0XHRcdFx0XHRkb2N0eXBlPVwiSGFydmVzdFwiXG5cdFx0XHRcdFx0aWQ9XCJIYXJ2ZXN0VGFibGVcIlxuXHRcdFx0XHRcdGZpbHRlcj17IHt2aW5leWFyZDpjdXJyZW50VmluZXlhcmR9IH1cblx0XHRcdFx0XHRjb25maWc9e2hhcnZlc3RDb25maWd9XG5cdFx0XHRcdFx0ZWRpdGFibGU9ezF9XG5cdFx0XHRcdC8+IFxuXHRcdFx0PC9BY29yZGlhbkNvbnRlbnQ+XG5cdFx0XHQ8QWNvcmRpYW5Db250ZW50XG5cdFx0XHRcdGNsYXNzTmFtZT1cInRhYmxlUGFuZWxcIlxuXHRcdFx0XHR0aXRsZT1cIkJpcmQgTmV0cyBUYWJsZVwiXG5cdFx0XHRcdGFjdGl2ZT17ZmFsc2V9XG5cdFx0XHRcdHBhcmVudElkPVwiYmlyZG5ldHNcIlxuXHRcdFx0XHRpZD1cImJpcmROZXRzQWNvcmRpYW5cIj4gXG5cdFx0XHRcdDxEb2NUYWJsZSBcblx0XHRcdFx0XHRzZWFyY2g9e2ZhbHNlfVxuXHRcdFx0XHRcdGRvY3R5cGU9XCJCaXJkIE5ldHNcIlxuXHRcdFx0XHRcdGlkPVwiYmlyZE5ldHNUYWJsZVwiXG5cdFx0XHRcdFx0ZmlsdGVyPXsge3ZpbmV5YXJkOmN1cnJlbnRWaW5leWFyZH0gfVxuXHRcdFx0XHRcdGNvbmZpZz17YmlyZE5ldHNDb25maWd9XG5cdFx0XHRcdFx0ZWRpdGFibGU9ezF9XG5cdFx0XHRcdC8+IFxuXHRcdFx0PC9BY29yZGlhbkNvbnRlbnQ+XG5cdFx0XHQ8QWNvcmRpYW5Db250ZW50XG5cdFx0XHRcdGNsYXNzTmFtZT1cInRhYmxlUGFuZWxcIlxuXHRcdFx0XHR0aXRsZT1cIldhdGVyaW5nIFRhYmxlXCJcblx0XHRcdFx0YWN0aXZlPXtmYWxzZX1cblx0XHRcdFx0cGFyZW50SWQ9XCJ3YXRlcmluZ1wiXG5cdFx0XHRcdGlkPVwid2F0ZXJpbmdBY29yZGlhblwiPiBcblx0XHRcdFx0PERvY1RhYmxlIFxuXHRcdFx0XHRcdHNlYXJjaD17ZmFsc2V9XG5cdFx0XHRcdFx0ZG9jdHlwZT1cIldhdGVyaW5nXCJcblx0XHRcdFx0XHRpZD1cIldhdGVyaW5nVGFibGVcIlxuXHRcdFx0XHRcdGZpbHRlcj17IHt2aW5leWFyZDpjdXJyZW50VmluZXlhcmR9IH1cblx0XHRcdFx0XHRjb25maWc9e3dhdGVyaW5nQ29uZmlnfVxuXHRcdFx0XHRcdGVkaXRhYmxlPXsxfVxuXHRcdFx0XHQvPiBcblx0XHRcdDwvQWNvcmRpYW5Db250ZW50PlxuXHRcdFx0PEFjb3JkaWFuQ29udGVudFxuXHRcdFx0XHRjbGFzc05hbWU9XCJ0YWJsZVBhbmVsXCJcblx0XHRcdFx0dGl0bGU9XCJDYW5vcHkgVGFibGVcIlxuXHRcdFx0XHRhY3RpdmU9e2ZhbHNlfVxuXHRcdFx0XHRwYXJlbnRJZD1cImNhbm9weVwiXG5cdFx0XHRcdGlkPVwiY2Fub3B5QWNvcmRpYW5cIj4gXG5cdFx0XHRcdDxEb2NUYWJsZSBcblx0XHRcdFx0XHRzZWFyY2g9e2ZhbHNlfVxuXHRcdFx0XHRcdGRvY3R5cGU9XCJDYW5vcHlcIlxuXHRcdFx0XHRcdGlkPVwiY2Fub3B5VGFibGVcIlxuXHRcdFx0XHRcdGZpbHRlcj17IHt2aW5leWFyZDpjdXJyZW50VmluZXlhcmR9IH1cblx0XHRcdFx0XHRjb25maWc9e2Nhbm9weUNvbmZpZ31cblx0XHRcdFx0XHRlZGl0YWJsZT17MX1cblx0XHRcdFx0Lz4gXG5cdFx0XHQ8L0Fjb3JkaWFuQ29udGVudD5cblx0XHRcdDxBY29yZGlhbkNvbnRlbnRcblx0XHRcdFx0Y2xhc3NOYW1lPVwidGFibGVQYW5lbFwiXG5cdFx0XHRcdHRpdGxlPVwiQnJpeCBUYWJsZVwiXG5cdFx0XHRcdGFjdGl2ZT17ZmFsc2V9XG5cdFx0XHRcdHBhcmVudElkPVwiYnJpeFwiXG5cdFx0XHRcdGlkPVwiYnJpeEFjb3JkaWFuXCI+IFxuXHRcdFx0XHQ8RG9jVGFibGUgXG5cdFx0XHRcdFx0c2VhcmNoPXtmYWxzZX1cblx0XHRcdFx0XHRkb2N0eXBlPVwiQnJpeFwiXG5cdFx0XHRcdFx0aWQ9XCJicml4VGFibGVcIlxuXHRcdFx0XHRcdGZpbHRlcj17IHt9IH1cblx0XHRcdFx0XHRjb25maWc9e2JyaXhDb25maWd9XG5cdFx0XHRcdFx0ZWRpdGFibGU9ezF9XG5cdFx0XHRcdC8+IFxuXHRcdFx0PC9BY29yZGlhbkNvbnRlbnQ+XG5cdFx0XHQ8L2Rpdj5cblxuXHRcdCwgYXBwICk7XG5cdFx0Ly8kKCcudGFibGVQYW5lbCcpLmNvbGxhcHNlKCdoaWRlJyk7XG5cdH0pXG5cdFxufSkoKTsgIFxuXG4vLyQoJy50YWJsZVBhbmVsJykuY29sbGFwc2UoJ2hpZGUnKTtcbiJdfQ==
