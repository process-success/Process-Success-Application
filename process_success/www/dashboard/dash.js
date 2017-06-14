(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*jshint ignore:start */

var CreateIssue = function (_React$Component) {
	_inherits(CreateIssue, _React$Component);

	function CreateIssue(props) {
		_classCallCheck(this, CreateIssue);

		var _this = _possibleConstructorReturn(this, (CreateIssue.__proto__ || Object.getPrototypeOf(CreateIssue)).call(this, props));

		_this.modalNewIssue = _this.modalNewIssue.bind(_this);
		_this.modalEditIssue = _this.modalEditIssue.bind(_this);
		return _this;
	}

	_createClass(CreateIssue, [{
		key: 'toolTip',
		value: function toolTip() {
			$(function () {
				$('[data-toggle="tooltip"]').tooltip();
			});
		}
	}, {
		key: 'modalNewIssue',
		value: function modalNewIssue(e) {
			e.preventDefault();
			this.props.activateModalNew();
		}
	}, {
		key: 'modalEditIssue',
		value: function modalEditIssue(item, e) {
			e.preventDefault();
			console.log(item);
			this.props.activateModalEdit(item);
		}
	}, {
		key: 'render',
		value: function render() {
			// 		data-toggle="modal" 
			// data-target={"#"+this.popUpId}
			// 	aria-label="Create Issue" 
			// 	data-toggle="tooltip" 
			// 	data-placement="top" 
			// 	title="Issue" 
			// ref={this.toolTip}					// onClick={ this.popUp} >
			var dropdownItems = [];
			if (this.props.issues !== null) {
				this.props.issues.map(function (item, index) {
					if (item.status == 'Submitted' || item.status == 'Assigned') {
						dropdownItems.push(React.createElement(
							'li',
							{ key: index },
							React.createElement(
								'a',
								{ className: 'dropdown-item',
									href: '#',
									onClick: this.modalEditIssue.bind(this, item)
								},
								item.title
							)
						));
					}
				}.bind(this));
			}
			return React.createElement(
				'div',
				{ className: 'dropdown dropdown-panel-right' },
				React.createElement(
					'button',
					{
						className: 'btn btn-default btn-xs dropdown-toggle full-header-button corner',
						type: 'button',
						'data-toggle': 'dropdown',
						'aria-haspopup': 'true',
						'aria-expanded': 'false' },
					this.props.issues.length === 0 ? "" : this.props.issues.length + " ",
					React.createElement('span', { className: 'glyphicon glyphicon-exclamation-sign', 'aria-hidden': 'true' })
				),
				React.createElement(
					'ul',
					{ className: 'dropdown-menu' },
					React.createElement(
						'li',
						{ className: 'dropdown-header' },
						'Issues'
					),
					dropdownItems,
					React.createElement('li', { role: 'separator', className: 'divider' }),
					React.createElement(
						'li',
						null,
						React.createElement(
							'a',
							{
								className: 'dropdown-item',
								onClick: this.modalNewIssue,
								href: '#' },
							' + New Issue'
						)
					)
				)
			);
		}
	}]);

	return CreateIssue;
}(React.Component);

exports.default = CreateIssue;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.WorkorderFormModal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _workorderTask = require('./workorderTask');

var _workorderTask2 = _interopRequireDefault(_workorderTask);

var _forms = require('../utils/forms');

var _forms2 = _interopRequireDefault(_forms);

var _modal = require('../utils/modal');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*jshint ignore:start */


var DaysWorkorders = function (_React$Component) {
	_inherits(DaysWorkorders, _React$Component);

	function DaysWorkorders(props) {
		_classCallCheck(this, DaysWorkorders);

		var _this = _possibleConstructorReturn(this, (DaysWorkorders.__proto__ || Object.getPrototypeOf(DaysWorkorders)).call(this, props));

		var args = {};
		args.crew = _this.props.crew;
		args.date = _this.props.date;
		/*   Do the bind thing  */
		_this.onTaskChecked = _this.onTaskChecked.bind(_this);
		_this.onStatusChanged = _this.onStatusChanged.bind(_this);
		_this.workOrderChanged = _this.workOrderChanged.bind(_this);
		_this.socketUpdate = _this.socketUpdate.bind(_this);
		_this.componentWillReceiveProps = _this.componentWillReceiveProps.bind(_this);
		//this.workorderObj=this.onStatusChanged.bind(this);
		/*          end          */

		_this.state = { workorders: [] };

		var args = {};
		args.crew = _this.props.crew;
		args.date = _this.props.date;
		_this.workorderTool = new ps.apiTool(args, ps.apiSetup.workOrders, _this.workOrderChanged);
		if (_this.workorderTool.items === undefined || _this.workorderTool.items === 0 || _this.workorderTool.items === null) {} else {
			_this.state.workorders = _this.workorderTool.items;
		}

		return _this;
	}

	_createClass(DaysWorkorders, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {

			if (nextProps.crew != this.props.crew || nextProps.date != this.props.date) {

				var args = {};
				args.crew = nextProps.crew;
				args.date = nextProps.date;
				this.workorderTool = new ps.apiTool(args, ps.apiSetup.workOrders, this.workOrderChanged);
				if (this.workorderTool.items === undefined || this.workorderTool.items === 0 || this.workorderTool.items === null) {
					this.setState({ workorders: [] });
				} else {
					this.setState({ workorders: this.workorderTool.items });
				}
			}
		}
	}, {
		key: 'socketUpdate',
		value: function socketUpdate() {}
	}, {
		key: 'onTaskChecked',
		value: function onTaskChecked(wo_index, index, check) {
			this.workorderTool.items[wo_index].subtask[index].status = check ? 0 : 1;
			this.setState({ workorders: this.workorderTool.items });
			this.workorderTool.update(this.workorderTool.items[wo_index]);
			var checkedText = check ? "unchecked." : "checked.";
			//ps.successAlert(this.workorderTool.items[wo_index].subtask[index].task +" "+ checkedText );
		}
	}, {
		key: 'onStatusChanged',
		value: function onStatusChanged(status, index) {
			this.workorderTool.items[index].status = status;
			this.setState({ workorders: this.workorderTool.items });
			this.workorderTool.update(this.workorderTool.items[index]);
			if (status == "Complete") {
				ps.successAlert("Workorder completed!");
			}
		}
	}, {
		key: 'workOrderChanged',
		value: function workOrderChanged() {
			if (this.workorderTool.items !== null) {
				this.setState({ workorders: this.workorderTool.items });
				if (this.props.statusUpdate !== undefined) {
					this.props.statusUpdate(this.workorderTool.items);
				}
			} else {
				this.setState({ workorders: [] });
			}
		}
	}, {
		key: 'workorderObj',
		value: function workorderObj(item, index) {
			return React.createElement(_workorderTask2.default, {
				key: index,
				index: index,
				location_route: item.location_route,
				location: item.location,
				tasks: item.subtask,
				status: item.status,
				type: item.type,
				workorder: item.name,
				onTaskChecked: this.onTaskChecked,
				onStatusChanged: this.onStatusChanged,
				route: item.route
			});
		}

		//-----------------------
		//        Render
		//-----------------------

	}, {
		key: 'render',
		value: function render() {
			if (this.state.workorders === 0 || this.state.workorders === undefined) {
				return React.createElement(
					'div',
					{ className: 'text-center' },
					React.createElement(
						'h3',
						null,
						'No Workorders'
					)
				);
			}
			var todo = [];
			var complete = [];
			this.state.workorders.map(function (item, index) {
				if (item.status != 'Complete' && item.status != 'Incomplete') {
					todo.push(this.workorderObj(item, index));
					if (todo.length % 3 === 0) {
						todo.push(React.createElement('div', { className: 'clearfix' }));
					}
				} else {
					complete.push(this.workorderObj(item, index));
					if (complete.length % 3 === 0) {
						complete.push(React.createElement('div', { className: 'clearfix' }));
					}
				}
			}.bind(this));
			var completeHeader = React.createElement(
				'h3',
				null,
				'Complete Work Orders'
			);
			if (complete.length == 0) {
				completeHeader = "";
			}

			return React.createElement(
				'div',
				{ className: 'workorder_container' },
				React.createElement(
					'div',
					null,
					React.createElement('br', null),
					todo
				),
				React.createElement('div', { className: 'clearfix' }),
				React.createElement(
					'div',
					null,
					completeHeader,
					complete
				),
				React.createElement('div', { className: 'clearfix' }),
				React.createElement('br', null),
				React.createElement(WorkorderFormModal, {
					id: "create-wo-" + this.props.crew.replace(" ", "-"),
					crew: this.props.crew,
					date: this.props.date
				})
			);
		}
	}]);

	return DaysWorkorders;
}(React.Component);

exports.default = DaysWorkorders;

var WorkorderFormModal = exports.WorkorderFormModal = function (_React$Component2) {
	_inherits(WorkorderFormModal, _React$Component2);

	function WorkorderFormModal(props) {
		_classCallCheck(this, WorkorderFormModal);

		return _possibleConstructorReturn(this, (WorkorderFormModal.__proto__ || Object.getPrototypeOf(WorkorderFormModal)).call(this, props));
	}

	_createClass(WorkorderFormModal, [{
		key: 'render',
		value: function render() {
			var fields = [{
				field: "autoComplete",
				onChange: this.someFunction,
				lable: "Vineyard",
				doctype: "Vineyard",
				docvalue: "name"
			}, {
				field: "input",
				type: "number",
				onChange: this.someFunction,
				lable: "Priority"
			}, {
				field: "date",
				onChange: this.someFunction,
				lable: "Date"
			}, {
				field: "select",
				onChange: this.someFunction,
				lable: "Type",
				options: ["Watering", "Prunning", "Repair", "Spraying"]
			}, {
				field: "autoComplete",
				onChange: this.someFunction,
				lable: "Crew",
				doctype: "Crew",
				docvalue: "name",
				doclable: "crew_lead_full_name"
			}];
			return React.createElement(
				'div',
				null,
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
					' New Work Order'
				),
				React.createElement(
					_modal2.default,
					{
						id: this.props.id,
						submitText: 'Submit',
						title: 'Create New Workorder',
						submit: this.onStatusChanged },
					React.createElement(_forms2.default, {
						id: 'CreateWorkorderForm',
						type: 'horizontal',
						fields: fields
					})
				)
			);
		}
	}]);

	return WorkorderFormModal;
}(React.Component);

},{"../utils/forms":7,"../utils/modal":8,"./workorderTask":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*jshint ignore:start */
var TaskCheck = function (_React$Component) {
	_inherits(TaskCheck, _React$Component);

	function TaskCheck(props) {
		_classCallCheck(this, TaskCheck);

		var _this = _possibleConstructorReturn(this, (TaskCheck.__proto__ || Object.getPrototypeOf(TaskCheck)).call(this, props));

		console.log(_this.props.checked);
		_this.taskChecked = _this.taskChecked.bind(_this);
		return _this;
	}

	_createClass(TaskCheck, [{
		key: "taskChecked",
		value: function taskChecked(e) {
			this.props.taskChecked(this.props.index, this.props.checked);
		}
	}, {
		key: "render",
		value: function render() {
			var checked = this.props.checked ? "line-through" : "";
			return React.createElement(
				"div",
				{ className: "checkbox" },
				React.createElement(
					"label",
					{ className: checked },
					React.createElement("input", { onChange: this.taskChecked, type: "checkbox", checked: this.props.checked }),
					this.props.lable
				)
			);
		}
	}]);

	return TaskCheck;
}(React.Component);

exports.default = TaskCheck;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _taskCheck = require('./taskCheck');

var _taskCheck2 = _interopRequireDefault(_taskCheck);

var _createIssue = require('./createIssue');

var _createIssue2 = _interopRequireDefault(_createIssue);

var _modal = require('../utils/modal');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/*jshint ignore:start */


var WorkorderTask = function (_React$Component) {
	_inherits(WorkorderTask, _React$Component);

	function WorkorderTask(props) {
		_classCallCheck(this, WorkorderTask);

		var _this = _possibleConstructorReturn(this, (WorkorderTask.__proto__ || Object.getPrototypeOf(WorkorderTask)).call(this, props));

		_this.state = {
			issues: [],
			title: '',
			modal: 'new',
			modalPriority: 'low',
			modalTitle: '',
			modalDescription: '',
			modalName: ''
		};
		_this.taskChecked = _this.taskChecked.bind(_this);
		_this.statusChange = _this.statusChange.bind(_this);
		_this.activateModalNew = _this.activateModalNew.bind(_this);
		_this.activateModalEdit = _this.activateModalEdit.bind(_this);

		_this.submitIssue = _this.submitIssue.bind(_this);
		_this.modalTitleChange = _this.modalTitleChange.bind(_this);
		_this.modalDescriptionChange = _this.modalDescriptionChange.bind(_this);
		_this.modalPriorityChange = _this.modalPriorityChange.bind(_this);
		_this.issueChanged = _this.issueChanged.bind(_this);

		_this.modalId = "issue-form-" + _this.props.workorder;

		_this.issueTool = new ps.apiTool({ "work_order": _this.props.workorder }, { doctype: 'Issue' }, _this.issueChanged);

		return _this;
	}

	_createClass(WorkorderTask, [{
		key: 'taskChecked',
		value: function taskChecked(e) {
			this.setState({ title: "CHECKED" });
		}
	}, {
		key: 'isChecked',
		value: function isChecked(value) {
			return value === this.state.selected ? 'checked line-through' : 'default';
		}
	}, {
		key: 'taskChecked',
		value: function taskChecked(index, checked) {
			var wo_index = this.props.index;
			this.props.onTaskChecked(wo_index, index, checked);
		}
	}, {
		key: 'statusChange',
		value: function statusChange(e) {
			this.props.onStatusChanged(e.target.value, this.props.index);
		}
		/*---------------------------------------
  	ISSUE FUNCTIONS
  -----------------------------------------*/

	}, {
		key: 'modalTitleChange',
		value: function modalTitleChange(e) {
			this.setState({ modalTitle: e.target.value });
		}
	}, {
		key: 'modalPriorityChange',
		value: function modalPriorityChange(e) {
			this.setState({ modalPriority: e.target.value });
		}
	}, {
		key: 'modalDescriptionChange',
		value: function modalDescriptionChange(e) {
			this.setState({ modalDescription: e.target.value });
		}
	}, {
		key: 'activateModalNew',
		value: function activateModalNew() {
			this.setState({ modal: "new" });
			this.setState({ modalPriority: '' });
			this.setState({ modalDescription: '' });
			this.setState({ modalTitle: '' });
			$('#' + this.modalId).modal();
		}
	}, {
		key: 'activateModalEdit',
		value: function activateModalEdit(issue) {
			this.setState({ modal: issue });
			this.setState({ modalPriority: issue.priority });
			this.setState({ modalDescription: issue.issue });
			this.setState({ modalTitle: issue.title });
			this.setState({ modalName: issue.name });
			$('#' + this.modalId).modal();
		}
	}, {
		key: 'issueChanged',
		value: function issueChanged() {

			this.setState({ issues: this.issueTool.items });
			console.log(this.issueTool.items);
		}
	}, {
		key: 'submitIssue',
		value: function submitIssue(e) {
			e.preventDefault();

			var newItem = {
				title: this.state.modalTitle,
				issue: this.state.modalDescription,
				priority: this.state.modalPriority,
				vineyard: this.props.location,
				work_order: this.props.workorder
			};
			if (this.state.modal == "new") {
				this.issueTool.create(newItem, function (item) {
					ps.successAlert("Issue " + item.title + " created.");
				});
			} else {
				newItem.name = this.state.modalName;
				this.issueTool.update(newItem, function (item) {
					ps.successAlert("Issue " + item.title + " updated.");
				});
			}
			//close modal
			$('#' + this.modalId).modal('toggle');
		}
	}, {
		key: 'render',
		value: function render() {
			var title = "welcome";
			var mainClass = {
				'Complete': 'panel-success',
				'Incomplete': 'panel-danger',
				'Pending': 'panel-default',
				'Started': 'panel-warning'
			}[this.props.status];
			mainClass = mainClass + " panel workorder ps-panel";
			return React.createElement(
				'div',
				{ className: 'col-md-4 col-sm-4' },
				React.createElement(
					_modal2.default,
					{
						id: this.modalId,
						submitText: 'Submit',
						title: 'Create Issue For',
						submit: this.submitIssue },
					React.createElement(
						'fieldset',
						null,
						React.createElement(
							'div',
							{ className: 'form-group' },
							React.createElement(
								'label',
								null,
								'Issue Title'
							),
							React.createElement('input', {
								type: 'text',
								className: 'form-control',
								placeholder: 'Issue Title',
								value: this.state.modalTitle,
								onChange: this.modalTitleChange
							})
						),
						React.createElement(
							'div',
							{ className: 'form-group' },
							React.createElement(
								'label',
								null,
								'Priority'
							),
							React.createElement(
								'select',
								{ className: 'form-control', value: this.state.modalPriority, onChange: this.modalPriorityChange.bind(this) },
								React.createElement(
									'option',
									null,
									'Low'
								),
								React.createElement(
									'option',
									null,
									'Medium'
								),
								React.createElement(
									'option',
									null,
									'High'
								),
								React.createElement(
									'option',
									null,
									'Critical'
								)
							)
						),
						React.createElement(
							'div',
							{ className: 'form-group' },
							React.createElement(
								'label',
								null,
								'Issue Details:'
							),
							React.createElement('textarea', {
								className: 'form-control',
								rows: '3',
								placeholder: 'Issue Details',
								value: this.state.modalDescription,
								onChange: this.modalDescriptionChange
							})
						)
					)
				),
				React.createElement(
					'div',
					{ id: '', className: mainClass },
					React.createElement(
						'div',
						{ className: 'panel-heading' },
						React.createElement(
							'div',
							{ className: 'row' },
							React.createElement(
								'h3',
								{ className: 'panel-title col-xs-8' },
								React.createElement(
									'a',
									{ className: 'float-left', href: this.props.location_route },
									this.props.location
								)
							),
							React.createElement(_createIssue2.default, {
								issues: this.state.issues,
								activateModalNew: this.activateModalNew,
								activateModalEdit: this.activateModalEdit,
								workorder: this.props.workorder

							}),
							React.createElement('div', { className: 'clearfix' })
						)
					),
					React.createElement(
						'div',
						{ className: 'panel-body' },
						React.createElement(
							'div',
							null,
							this.props.type
						),
						React.createElement(
							'label',
							{ className: 'control-label' },
							'Status'
						),
						React.createElement(
							'select',
							{ className: 'form-control status', value: this.props.status, onChange: this.statusChange },
							React.createElement(
								'option',
								{ value: 'Pending' },
								'Pending'
							),
							React.createElement(
								'option',
								{ value: 'Started' },
								'Started'
							),
							React.createElement(
								'option',
								{ value: 'Complete' },
								'Complete'
							),
							React.createElement(
								'option',
								{ value: 'Incomplete' },
								'Incomplete'
							)
						),
						React.createElement(
							'div',
							{ className: 'check_boxes' },
							this.props.tasks.map(function (item, index) {
								var checked = item.status ? true : false;
								return React.createElement(_taskCheck2.default, { key: index, index: index, lable: item.task, checked: checked, taskChecked: this.taskChecked });
							}.bind(this))
						),
						React.createElement(
							'div',
							null,
							React.createElement(
								'a',
								{ className: '', href: this.props.route },
								'More Information'
							)
						)
					)
				)
			);
		}
	}]);

	return WorkorderTask;
}(React.Component);

exports.default = WorkorderTask;

},{"../utils/modal":8,"./createIssue":1,"./taskCheck":3}],5:[function(require,module,exports){
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

},{"./acordianContent":6}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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
						React.createElement(
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
						)
					)
				)
			);
		}
	}]);

	return Modal;
}(React.Component);

exports.default = Modal;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _acordian = require('../../public/js/modules/utils/acordian');

var _acordian2 = _interopRequireDefault(_acordian);

var _acordianContent = require('../../public/js/modules/utils/acordianContent');

var _acordianContent2 = _interopRequireDefault(_acordianContent);

var _daysWorkorders = require('../../public/js/modules/days_workorders/daysWorkorders');

var _daysWorkorders2 = _interopRequireDefault(_daysWorkorders);

var _forms = require('../../public/js/modules/utils/forms');

var _forms2 = _interopRequireDefault(_forms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CrewDash = function (_React$Component) {
	_inherits(CrewDash, _React$Component);

	function CrewDash(props) {
		_classCallCheck(this, CrewDash);

		var _this = _possibleConstructorReturn(this, (CrewDash.__proto__ || Object.getPrototypeOf(CrewDash)).call(this, props));

		_this.crewChanged = _this.crewChanged.bind(_this);
		_this.crewsAcordion = _this.crewsAcordion.bind(_this);
		_this.dateChanged = _this.dateChanged.bind(_this);
		_this.workOrderStatus = _this.workOrderStatus.bind(_this);

		_this.currentUser = ps.initCurrentUser();
		_this.currentUser.get({}, function (items) {
			if (this.currentUser.items.username == "Guest") {
				window.location = "/login";
			} else {
				$(document).trigger("userLoaded");
				//console.log("after Load",this.currentUser.items);
			}
		}.bind(_this));
		//this.state={};
		_this.state = {
			crew: [],
			status: [],
			title: '',
			userinfo: _this.currentUser.items,
			selectedDate: moment().format("MM/DD/YYYY")
		};
		console.log(_this.currentUser.items.today);
		_this.crewTool = new ps.apiTool({}, { doctype: 'Crew' }, _this.crewChanged);
		_this.acordianId = "crew-dash-acordian";
		return _this;
	}

	_createClass(CrewDash, [{
		key: 'crewChanged',
		value: function crewChanged() {
			this.setState({ crew: this.crewTool.items });
		}
	}, {
		key: 'dateChanged',
		value: function dateChanged(e) {
			this.setState({ selectedDate: e.target.value });
		}
	}, {
		key: 'workOrderStatus',
		value: function workOrderStatus(index) {
			return function (items) {
				var status = "None";
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var item = _step.value;

						if (item.status == "Started") {
							status = "Working";
						}
						if (item.status == "Complete" && status != "Working") {
							status = "Completed";
						}
						if (item.status == "Pending" && status == "Completed") {
							status = "Driving";
						}
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

				this.state.status[index] = status;
				this.setState({ status: this.state.status });
			}.bind(this);
		}
	}, {
		key: 'crewsAcordion',
		value: function crewsAcordion() {
			//if all pending && clocked in driving
			//if not clocked in: not strated
			//clocked out: clocked out


			var convertedDate = moment(this.state.selectedDate, 'MM/DD/YYYY').format('YYYY-MM-DD');
			var output = [];
			this.state.crew.map(function (item, index) {
				if (this.state.status[index] === undefined) {
					this.state.status[index] = "No Work Orders";
				}
				output.push(React.createElement(
					_acordianContent2.default,
					{
						key: this.acordianId + index,
						id: this.acordianId + index,
						title: item.crew_name,
						active: index === 0 ? true : false,
						parentId: this.acordianId
					},
					this.state.status[index],
					React.createElement(_daysWorkorders2.default, {
						date: convertedDate,
						crew: item.name,
						statusUpdate: this.workOrderStatus(index)
					})
				));
			}.bind(this));
			return React.createElement(
				'div',
				null,
				React.createElement(_forms2.default, {
					className: 'center-block short',
					type: 'horizontal',
					fields: [{
						field: "date",
						value: this.state.selectedDate,
						onChange: this.dateChanged,
						className: "input-lg",
						key: "other3"
					}]
				}),
				React.createElement(
					_acordian2.default,
					{ id: this.acordianId },
					output
				)
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


var app = $('#app')[0];
(function () {
	frappe.ready(function () {
		ReactDOM.render(React.createElement(CrewDash, null), app);
	});
})();

/*
					<DaysWorkorders 
						date={this.props.date}
						crew={item.name}
					/>
					*/

},{"../../public/js/modules/days_workorders/daysWorkorders":2,"../../public/js/modules/utils/acordian":5,"../../public/js/modules/utils/acordianContent":6,"../../public/js/modules/utils/forms":7}]},{},[9])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c193b3Jrb3JkZXJzL2NyZWF0ZUlzc3VlLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy9kYXlzX3dvcmtvcmRlcnMvZGF5c1dvcmtvcmRlcnMuanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL2RheXNfd29ya29yZGVycy90YXNrQ2hlY2suanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL2RheXNfd29ya29yZGVycy93b3Jrb3JkZXJUYXNrLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9hY29yZGlhbi5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdXRpbHMvYWNvcmRpYW5Db250ZW50LmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9mb3Jtcy5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdXRpbHMvbW9kYWwuanN4IiwicHJvY2Vzc19zdWNjZXNzL3d3dy9kYXNoYm9hcmQvZGFzaC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOztJQUdxQixXOzs7QUFDcEIsc0JBQVksS0FBWixFQUFrQjtBQUFBOztBQUFBLHdIQUNYLEtBRFc7O0FBRWpCLFFBQUssYUFBTCxHQUFtQixNQUFLLGFBQUwsQ0FBbUIsSUFBbkIsT0FBbkI7QUFDQSxRQUFLLGNBQUwsR0FBb0IsTUFBSyxjQUFMLENBQW9CLElBQXBCLE9BQXBCO0FBSGlCO0FBSWpCOzs7OzRCQUNRO0FBQ1IsS0FBRSxZQUFZO0FBQ1osTUFBRSx5QkFBRixFQUE2QixPQUE3QjtBQUNELElB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QSxFQUNhLEdBRGI7QUFFQSxFQUhEO0FBS0EsQ0FORDs7QUFRQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDcmVhdGVJc3N1ZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKVxuXHRcdHRoaXMubW9kYWxOZXdJc3N1ZT10aGlzLm1vZGFsTmV3SXNzdWUuYmluZCh0aGlzKTtcblx0XHR0aGlzLm1vZGFsRWRpdElzc3VlPXRoaXMubW9kYWxFZGl0SXNzdWUuYmluZCh0aGlzKTtcblx0fVxuXHR0b29sVGlwKCl7XG5cdFx0JChmdW5jdGlvbiAoKSB7XG5cdFx0IFx0JCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoKTtcblx0XHR9KVxuXHR9XG5cdG1vZGFsTmV3SXNzdWUoZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMucHJvcHMuYWN0aXZhdGVNb2RhbE5ldygpO1xuXHR9XG5cdG1vZGFsRWRpdElzc3VlKGl0ZW0sZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGNvbnNvbGUubG9nKGl0ZW0pXG5cdFx0dGhpcy5wcm9wcy5hY3RpdmF0ZU1vZGFsRWRpdChpdGVtKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHRcdFx0XHQvLyBcdFx0ZGF0YS10b2dnbGU9XCJtb2RhbFwiIFxuXHRcdFx0XHRcdC8vIGRhdGEtdGFyZ2V0PXtcIiNcIit0aGlzLnBvcFVwSWR9XG5cdFx0XHRcdCAvLyBcdGFyaWEtbGFiZWw9XCJDcmVhdGUgSXNzdWVcIiBcblx0XHRcdFx0IC8vIFx0ZGF0YS10b2dnbGU9XCJ0b29sdGlwXCIgXG5cdFx0XHRcdCAvLyBcdGRhdGEtcGxhY2VtZW50PVwidG9wXCIgXG5cdFx0XHRcdCAvLyBcdHRpdGxlPVwiSXNzdWVcIiBcblx0XHRcdFx0XHQvLyByZWY9e3RoaXMudG9vbFRpcH1cdFx0XHRcdFx0Ly8gb25DbGljaz17IHRoaXMucG9wVXB9ID5cblx0XHR2YXIgZHJvcGRvd25JdGVtcz1bXTtcblx0XHRpZih0aGlzLnByb3BzLmlzc3VlcyE9PW51bGwpe1xuXHRcdFx0dGhpcy5wcm9wcy5pc3N1ZXMubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblx0XHRcdFx0aWYgKGl0ZW0uc3RhdHVzID09J1N1Ym1pdHRlZCcgfHwgaXRlbS5zdGF0dXM9PSdBc3NpZ25lZCcpe1xuXHRcdFx0XHRcdGRyb3Bkb3duSXRlbXMucHVzaChcblx0XHRcdFx0XHRcdDxsaSBrZXk9e2luZGV4fT4gXG5cdFx0XHRcdFx0XHRcdDxhIGNsYXNzTmFtZT1cImRyb3Bkb3duLWl0ZW1cIiBcblx0XHRcdFx0XHRcdFx0XHRocmVmPVwiI1wiIFxuXHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMubW9kYWxFZGl0SXNzdWUuYmluZCh0aGlzLGl0ZW0pfSBcblx0XHRcdFx0XHRcdFx0PntpdGVtLnRpdGxlfTwvYT5cblx0XHRcdFx0XHRcdDwvbGk+KTtcblx0XHRcdFx0fVxuXHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHR9XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJkcm9wZG93biBkcm9wZG93bi1wYW5lbC1yaWdodFwiPlxuXG5cdFx0XHRcdDxidXR0b25cblx0XHRcdFx0XHRjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHQgYnRuLXhzIGRyb3Bkb3duLXRvZ2dsZSBmdWxsLWhlYWRlci1idXR0b24gY29ybmVyXCIgXG5cdFx0XHRcdFx0dHlwZT1cImJ1dHRvblwiIFxuXHRcdFx0XHRcdGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBcblx0XHRcdFx0XHRhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIFxuXHRcdFx0XHRcdGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiID5cblxuXHRcdFx0XHQgXHR7KHRoaXMucHJvcHMuaXNzdWVzLmxlbmd0aD09PTApP1wiXCI6dGhpcy5wcm9wcy5pc3N1ZXMubGVuZ3RoK1wiIFwifTxzcGFuIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tZXhjbGFtYXRpb24tc2lnblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cblx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdDx1bCBjbGFzc05hbWU9XCJkcm9wZG93bi1tZW51XCI+XG5cdFx0XHRcdCAgICA8bGkgY2xhc3NOYW1lPVwiZHJvcGRvd24taGVhZGVyXCI+SXNzdWVzPC9saT5cblx0XHRcdFx0ICAgIHtkcm9wZG93bkl0ZW1zfVxuXHRcdFx0XHQgICAgPGxpIHJvbGU9XCJzZXBhcmF0b3JcIiBjbGFzc05hbWU9XCJkaXZpZGVyXCI+PC9saT5cblx0XHRcdFx0ICAgIDxsaT48YSBcblx0XHRcdFx0ICAgIFx0Y2xhc3NOYW1lPVwiZHJvcGRvd24taXRlbVwiXG5cdFx0XHRcdCAgICBcdG9uQ2xpY2s9e3RoaXMubW9kYWxOZXdJc3N1ZX1cblx0XHRcdFx0ICAgIFx0aHJlZj1cIiNcIiA+ICsgTmV3IElzc3VlPC9hPjwvbGk+XG5cdFx0XHRcdDwvdWw+XG5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuXG4iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmltcG9ydCBXb3Jrb3JkZXJUYXNrIGZyb20gJy4vd29ya29yZGVyVGFzayc7XG5cbmltcG9ydCBGb3JtIGZyb20gJy4uL3V0aWxzL2Zvcm1zJ1xuaW1wb3J0IE1vZGFsIGZyb20gJy4uL3V0aWxzL21vZGFsJ1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF5c1dvcmtvcmRlcnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dmFyIGFyZ3M9e307XG5cdFx0YXJncy5jcmV3PXRoaXMucHJvcHMuY3Jldztcblx0XHRhcmdzLmRhdGU9dGhpcy5wcm9wcy5kYXRlO1xuXHRcdC8qICAgRG8gdGhlIGJpbmQgdGhpbmcgICovXG5cdFx0dGhpcy5vblRhc2tDaGVja2VkPXRoaXMub25UYXNrQ2hlY2tlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMub25TdGF0dXNDaGFuZ2VkPXRoaXMub25TdGF0dXNDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy53b3JrT3JkZXJDaGFuZ2VkPXRoaXMud29ya09yZGVyQ2hhbmdlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuc29ja2V0VXBkYXRlPXRoaXMuc29ja2V0VXBkYXRlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzPXRoaXMuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcy5iaW5kKHRoaXMpO1xuXHRcdC8vdGhpcy53b3Jrb3JkZXJPYmo9dGhpcy5vblN0YXR1c0NoYW5nZWQuYmluZCh0aGlzKTtcblx0XHQvKiAgICAgICAgICBlbmQgICAgICAgICAgKi9cblxuXHRcdHRoaXMuc3RhdGU9e3dvcmtvcmRlcnM6W119O1xuXG5cdFx0dmFyIGFyZ3M9e307XG5cdFx0YXJncy5jcmV3PXRoaXMucHJvcHMuY3Jldztcblx0XHRhcmdzLmRhdGU9dGhpcy5wcm9wcy5kYXRlO1xuXHRcdHRoaXMud29ya29yZGVyVG9vbCA9IG5ldyBwcy5hcGlUb29sKGFyZ3MscHMuYXBpU2V0dXAud29ya09yZGVycyx0aGlzLndvcmtPcmRlckNoYW5nZWQpO1xuXHRcdGlmICh0aGlzLndvcmtvcmRlclRvb2wuaXRlbXM9PT11bmRlZmluZWQgfHx0aGlzLndvcmtvcmRlclRvb2wuaXRlbXM9PT0gMCB8fHRoaXMud29ya29yZGVyVG9vbC5pdGVtcz09PW51bGwgKXtcblx0XHR9ZWxzZXtcblx0XHRcdHRoaXMuc3RhdGUud29ya29yZGVycz10aGlzLndvcmtvcmRlclRvb2wuaXRlbXM7XG5cdFx0fVxuXG5cdH1cblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xuXG5cdFx0aWYobmV4dFByb3BzLmNyZXchPXRoaXMucHJvcHMuY3JldyB8fCBuZXh0UHJvcHMuZGF0ZSE9dGhpcy5wcm9wcy5kYXRlICl7XG5cblx0XHRcdHZhciBhcmdzPXt9O1xuXHRcdFx0YXJncy5jcmV3PW5leHRQcm9wcy5jcmV3O1xuXHRcdFx0YXJncy5kYXRlPW5leHRQcm9wcy5kYXRlO1xuXHRcdFx0dGhpcy53b3Jrb3JkZXJUb29sID0gbmV3IHBzLmFwaVRvb2woYXJncyxwcy5hcGlTZXR1cC53b3JrT3JkZXJzLHRoaXMud29ya09yZGVyQ2hhbmdlZCk7XG5cdFx0XHRpZiAodGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zPT09dW5kZWZpbmVkIHx8dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zPT09IDAgfHx0aGlzLndvcmtvcmRlclRvb2wuaXRlbXM9PT1udWxsICl7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3dvcmtvcmRlcnM6W119KTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHt3b3Jrb3JkZXJzOnRoaXMud29ya29yZGVyVG9vbC5pdGVtc30pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHNvY2tldFVwZGF0ZSgpe1xuXG5cdH1cblx0b25UYXNrQ2hlY2tlZCh3b19pbmRleCxpbmRleCxjaGVjayl7XG5cdFx0dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zW3dvX2luZGV4XS5zdWJ0YXNrW2luZGV4XS5zdGF0dXM9Y2hlY2s/MDoxO1xuXHRcdHRoaXMuc2V0U3RhdGUoe3dvcmtvcmRlcnM6dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zfSk7XG5cdFx0dGhpcy53b3Jrb3JkZXJUb29sLnVwZGF0ZSh0aGlzLndvcmtvcmRlclRvb2wuaXRlbXNbd29faW5kZXhdKTtcblx0XHR2YXIgY2hlY2tlZFRleHQ9Y2hlY2s/XCJ1bmNoZWNrZWQuXCI6XCJjaGVja2VkLlwiXG5cdFx0Ly9wcy5zdWNjZXNzQWxlcnQodGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zW3dvX2luZGV4XS5zdWJ0YXNrW2luZGV4XS50YXNrICtcIiBcIisgY2hlY2tlZFRleHQgKTtcblx0fVxuXHRvblN0YXR1c0NoYW5nZWQoc3RhdHVzLCBpbmRleCl7XG5cdFx0dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zW2luZGV4XS5zdGF0dXM9c3RhdHVzO1xuXHRcdHRoaXMuc2V0U3RhdGUoe3dvcmtvcmRlcnM6dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zfSk7XG5cdFx0dGhpcy53b3Jrb3JkZXJUb29sLnVwZGF0ZSh0aGlzLndvcmtvcmRlclRvb2wuaXRlbXNbaW5kZXhdKTtcblx0XHRpZihzdGF0dXM9PVwiQ29tcGxldGVcIil7XG5cdFx0XHRwcy5zdWNjZXNzQWxlcnQoXCJXb3Jrb3JkZXIgY29tcGxldGVkIVwiKTtcblx0XHR9XG5cdH1cblx0d29ya09yZGVyQ2hhbmdlZCgpe1xuXHRcdGlmICh0aGlzLndvcmtvcmRlclRvb2wuaXRlbXMhPT1udWxsKXtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3dvcmtvcmRlcnM6dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zfSk7XG5cdFx0XHRpZih0aGlzLnByb3BzLnN0YXR1c1VwZGF0ZSAhPT0gdW5kZWZpbmVkKXtcblx0XHRcdFx0dGhpcy5wcm9wcy5zdGF0dXNVcGRhdGUodGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zKTtcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3dvcmtvcmRlcnM6W119KTtcblx0XHR9XG5cblx0fVxuXHR3b3Jrb3JkZXJPYmooaXRlbSxpbmRleCl7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PFdvcmtvcmRlclRhc2sgXG5cdFx0XHRcdGtleT17aW5kZXh9IFxuXHRcdFx0XHRpbmRleD17aW5kZXh9IFxuXHRcdFx0XHRsb2NhdGlvbl9yb3V0ZT17aXRlbS5sb2NhdGlvbl9yb3V0ZX1cblx0XHRcdFx0bG9jYXRpb249e2l0ZW0ubG9jYXRpb259XG5cdFx0XHRcdHRhc2tzPXtpdGVtLnN1YnRhc2t9XG5cdFx0XHRcdHN0YXR1cz17aXRlbS5zdGF0dXN9XG5cdFx0XHRcdHR5cGU9e2l0ZW0udHlwZX1cblx0XHRcdFx0d29ya29yZGVyPXtpdGVtLm5hbWV9XG5cdFx0XHRcdG9uVGFza0NoZWNrZWQ9e3RoaXMub25UYXNrQ2hlY2tlZH1cblx0XHRcdFx0b25TdGF0dXNDaGFuZ2VkPXt0aGlzLm9uU3RhdHVzQ2hhbmdlZH1cblx0XHRcdFx0cm91dGU9e2l0ZW0ucm91dGV9XG5cdFx0XHQvPlxuXHRcdCk7XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vICAgICAgICBSZW5kZXJcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRyZW5kZXIoKXtcblx0XHRpZiAodGhpcy5zdGF0ZS53b3Jrb3JkZXJzPT09MHx8dGhpcy5zdGF0ZS53b3Jrb3JkZXJzPT09dW5kZWZpbmVkKXtcblx0XHRcdHJldHVybiAoPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPjxoMz5ObyBXb3Jrb3JkZXJzPC9oMz48L2Rpdj4pO1xuXHRcdH1cblx0XHR2YXIgdG9kbz1bXTtcblx0XHR2YXIgY29tcGxldGU9W107XG5cdFx0dGhpcy5zdGF0ZS53b3Jrb3JkZXJzLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCl7XG5cdFx0XHRpZiAoaXRlbS5zdGF0dXMhPSdDb21wbGV0ZScmJml0ZW0uc3RhdHVzIT0nSW5jb21wbGV0ZScpe1xuXHRcdFx0XHR0b2RvLnB1c2godGhpcy53b3Jrb3JkZXJPYmooaXRlbSxpbmRleCkpO1xuXHRcdFx0XHRpZih0b2RvLmxlbmd0aCUzPT09MCl7dG9kby5wdXNoKDxkaXYgY2xhc3NOYW1lPSdjbGVhcmZpeCc+PC9kaXY+KX1cblx0XHRcdH1lbHNle1xuXHRcdFx0XHRjb21wbGV0ZS5wdXNoKHRoaXMud29ya29yZGVyT2JqKGl0ZW0saW5kZXgpKTtcblx0XHRcdFx0aWYoY29tcGxldGUubGVuZ3RoJTM9PT0wKXtjb21wbGV0ZS5wdXNoKDxkaXYgY2xhc3NOYW1lPSdjbGVhcmZpeCc+PC9kaXY+KX1cblx0XHRcdH1cblx0XHR9LmJpbmQodGhpcykpO1xuXHRcdHZhciBjb21wbGV0ZUhlYWRlcj0oPGgzPkNvbXBsZXRlIFdvcmsgT3JkZXJzPC9oMz4pO1xuXHRcdGlmKGNvbXBsZXRlLmxlbmd0aD09MCl7XG5cdFx0XHRjb21wbGV0ZUhlYWRlcj1cIlwiO1xuXHRcdH1cblxuXG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ3b3Jrb3JkZXJfY29udGFpbmVyXCI+XG5cdFx0XHRcdDxkaXY+PGJyLz5cblx0XHRcdFx0XHR7dG9kb31cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj48L2Rpdj5cblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHR7Y29tcGxldGVIZWFkZXJ9XG5cdFx0XHRcdFx0e2NvbXBsZXRlfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPjwvZGl2PlxuXHRcdFx0XHQ8YnIvPlxuXHRcdFx0XHQ8V29ya29yZGVyRm9ybU1vZGFsXG5cdFx0XHRcdFx0aWQ9e1wiY3JlYXRlLXdvLVwiK3RoaXMucHJvcHMuY3Jldy5yZXBsYWNlKFwiIFwiLFwiLVwiKX1cblx0XHRcdFx0XHRjcmV3PXt0aGlzLnByb3BzLmNyZXd9XG5cdFx0XHRcdFx0ZGF0ZT17dGhpcy5wcm9wcy5kYXRlfVxuXHRcdFx0XHQvPlxuXG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXG5cdH07XHRcbn1cblxuZXhwb3J0IGNsYXNzIFdvcmtvcmRlckZvcm1Nb2RhbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR2YXIgZmllbGRzPVtcdFx0XG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiYXV0b0NvbXBsZXRlXCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiB0aGlzLnNvbWVGdW5jdGlvbixcblx0XHRcdFx0bGFibGU6XCJWaW5leWFyZFwiLFxuXHRcdFx0XHRkb2N0eXBlOlwiVmluZXlhcmRcIixcblx0XHRcdFx0ZG9jdmFsdWU6XCJuYW1lXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiaW5wdXRcIixcblx0XHRcdFx0dHlwZTpcIm51bWJlclwiLFxuXHRcdFx0XHRvbkNoYW5nZTogdGhpcy5zb21lRnVuY3Rpb24sXG5cdFx0XHRcdGxhYmxlOlwiUHJpb3JpdHlcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJkYXRlXCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiB0aGlzLnNvbWVGdW5jdGlvbixcblx0XHRcdFx0bGFibGU6XCJEYXRlXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwic2VsZWN0XCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiB0aGlzLnNvbWVGdW5jdGlvbixcblx0XHRcdFx0bGFibGU6XCJUeXBlXCIsXG5cdFx0XHRcdG9wdGlvbnM6W1xuXHRcdFx0XHRcdFwiV2F0ZXJpbmdcIixcblx0XHRcdFx0XHRcIlBydW5uaW5nXCIsXG5cdFx0XHRcdFx0XCJSZXBhaXJcIixcblx0XHRcdFx0XHRcIlNwcmF5aW5nXCJcblx0XHRcdFx0XVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJhdXRvQ29tcGxldGVcIixcblx0XHRcdFx0b25DaGFuZ2U6IHRoaXMuc29tZUZ1bmN0aW9uLFxuXHRcdFx0XHRsYWJsZTpcIkNyZXdcIixcblx0XHRcdFx0ZG9jdHlwZTpcIkNyZXdcIixcblx0XHRcdFx0ZG9jdmFsdWU6XCJuYW1lXCIsXG5cdFx0XHRcdGRvY2xhYmxlOlwiY3Jld19sZWFkX2Z1bGxfbmFtZVwiXG5cdFx0XHR9XG5cblx0XHRdXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XHRcdFx0XHRcblx0XHRcdFx0PGEgXG5cdFx0XHRcdFx0aHJlZj1cIiNcIiBcblx0XHRcdFx0XHRjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIlxuXHRcdFx0XHRcdG9uQ2xpY2s9e2Z1bmN0aW9uKCl7JCgnIycrIHRoaXMucHJvcHMuaWQpLm1vZGFsKCl9LmJpbmQodGhpcyl9XG5cdFx0XHRcdFx0PlxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tcGx1c1wiPjwvc3Bhbj4gTmV3IFdvcmsgT3JkZXI8L2E+XG5cdFx0XHRcdDxNb2RhbCBcblx0XHRcdFx0XHRpZD17dGhpcy5wcm9wcy5pZH0gXG5cdFx0XHRcdFx0c3VibWl0VGV4dD1cIlN1Ym1pdFwiIFxuXHRcdFx0XHRcdHRpdGxlPVwiQ3JlYXRlIE5ldyBXb3Jrb3JkZXJcIlxuXHRcdFx0XHRcdHN1Ym1pdD17dGhpcy5vblN0YXR1c0NoYW5nZWR9PlxuXG5cdFx0XHRcdFx0PEZvcm1cblx0XHRcdFx0XHRcdGlkPVwiQ3JlYXRlV29ya29yZGVyRm9ybVwiXG5cdFx0XHRcdFx0XHR0eXBlPVwiaG9yaXpvbnRhbFwiXG5cdFx0XHRcdFx0XHRmaWVsZHM9e2ZpZWxkc31cblx0XHRcdFx0XHQvPlxuXG5cdFx0XHRcdDwvTW9kYWw+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2tDaGVjayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHRjb25zb2xlLmxvZyh0aGlzLnByb3BzLmNoZWNrZWQpO1xuXHRcdHRoaXMudGFza0NoZWNrZWQgPSB0aGlzLnRhc2tDaGVja2VkLmJpbmQodGhpcyk7XG5cdH1cblx0dGFza0NoZWNrZWQoZSl7XG5cdFx0dGhpcy5wcm9wcy50YXNrQ2hlY2tlZCh0aGlzLnByb3BzLmluZGV4LCB0aGlzLnByb3BzLmNoZWNrZWQpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IGNoZWNrZWQgPSB0aGlzLnByb3BzLmNoZWNrZWQgPyBcImxpbmUtdGhyb3VnaFwiIDogXCJcIjtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9e2NoZWNrZWR9PlxuXHRcdFx0XHRcdDxpbnB1dCBvbkNoYW5nZT17dGhpcy50YXNrQ2hlY2tlZH0gdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD17dGhpcy5wcm9wcy5jaGVja2VkfSAvPlxuXHRcdFx0XHRcdHt0aGlzLnByb3BzLmxhYmxlfVxuXHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVx0XG59IiwiXG4vKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmltcG9ydCBUYXNrQ2hlY2sgZnJvbSAnLi90YXNrQ2hlY2snXG5pbXBvcnQgQ3JlYXRlSXNzdWUgZnJvbSAnLi9jcmVhdGVJc3N1ZSdcbmltcG9ydCBNb2RhbCBmcm9tICcuLi91dGlscy9tb2RhbCdcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXb3Jrb3JkZXJUYXNrIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuc3RhdGU9e1xuXHRcdFx0aXNzdWVzOltdLFxuXHRcdFx0dGl0bGU6JycsXG5cdFx0XHRtb2RhbDonbmV3Jyxcblx0XHRcdG1vZGFsUHJpb3JpdHk6J2xvdycsXG5cdFx0XHRtb2RhbFRpdGxlOicnLFxuXHRcdFx0bW9kYWxEZXNjcmlwdGlvbjonJyxcblx0XHRcdG1vZGFsTmFtZTonJ1xuXHRcdH07XG5cdFx0dGhpcy50YXNrQ2hlY2tlZD10aGlzLnRhc2tDaGVja2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5zdGF0dXNDaGFuZ2U9dGhpcy5zdGF0dXNDaGFuZ2UuYmluZCh0aGlzKTtcblx0XHR0aGlzLmFjdGl2YXRlTW9kYWxOZXc9dGhpcy5hY3RpdmF0ZU1vZGFsTmV3LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5hY3RpdmF0ZU1vZGFsRWRpdD10aGlzLmFjdGl2YXRlTW9kYWxFZGl0LmJpbmQodGhpcyk7XG5cdFx0XG5cdFx0dGhpcy5zdWJtaXRJc3N1ZT10aGlzLnN1Ym1pdElzc3VlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5tb2RhbFRpdGxlQ2hhbmdlPXRoaXMubW9kYWxUaXRsZUNoYW5nZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMubW9kYWxEZXNjcmlwdGlvbkNoYW5nZT10aGlzLm1vZGFsRGVzY3JpcHRpb25DaGFuZ2UuYmluZCh0aGlzKTtcblx0XHR0aGlzLm1vZGFsUHJpb3JpdHlDaGFuZ2U9dGhpcy5tb2RhbFByaW9yaXR5Q2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5pc3N1ZUNoYW5nZWQ9dGhpcy5pc3N1ZUNoYW5nZWQuYmluZCh0aGlzKTtcblxuXG5cdFx0dGhpcy5tb2RhbElkPVwiaXNzdWUtZm9ybS1cIit0aGlzLnByb3BzLndvcmtvcmRlcjtcblxuXHRcdFxuXHRcdHRoaXMuaXNzdWVUb29sID0gbmV3IHBzLmFwaVRvb2woe1wid29ya19vcmRlclwiOnRoaXMucHJvcHMud29ya29yZGVyfSx7ZG9jdHlwZTonSXNzdWUnfSx0aGlzLmlzc3VlQ2hhbmdlZCk7XG5cblxuXHR9XG5cdHRhc2tDaGVja2VkKGUpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe3RpdGxlOlwiQ0hFQ0tFRFwifSk7XG5cdH1cblx0aXNDaGVja2VkKHZhbHVlKXtcbiAgICBcdHJldHVybiAoKHZhbHVlPT09dGhpcy5zdGF0ZS5zZWxlY3RlZCkgPydjaGVja2VkIGxpbmUtdGhyb3VnaCc6J2RlZmF1bHQnKTtcbiAgXHR9XG4gIFx0dGFza0NoZWNrZWQoaW5kZXgsY2hlY2tlZCl7XG4gIFx0XHR2YXIgd29faW5kZXg9dGhpcy5wcm9wcy5pbmRleDtcbiAgXHRcdHRoaXMucHJvcHMub25UYXNrQ2hlY2tlZCh3b19pbmRleCxpbmRleCxjaGVja2VkKTtcbiAgXHR9XG4gIFx0c3RhdHVzQ2hhbmdlKGUpe1xuICBcdFx0dGhpcy5wcm9wcy5vblN0YXR1c0NoYW5nZWQoZS50YXJnZXQudmFsdWUsdGhpcy5wcm9wcy5pbmRleCk7XG5cbiAgXHR9XG4gIFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRcdFx0SVNTVUUgRlVOQ1RJT05TXG4gIFx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICBcdG1vZGFsVGl0bGVDaGFuZ2UoZSl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7bW9kYWxUaXRsZTplLnRhcmdldC52YWx1ZX0pO1xuICBcdH1cblx0bW9kYWxQcmlvcml0eUNoYW5nZShlKXtcblx0XHR0aGlzLnNldFN0YXRlKHttb2RhbFByaW9yaXR5OmUudGFyZ2V0LnZhbHVlfSk7XG5cdH1cblx0bW9kYWxEZXNjcmlwdGlvbkNoYW5nZShlKXtcblx0XHR0aGlzLnNldFN0YXRlKHttb2RhbERlc2NyaXB0aW9uOmUudGFyZ2V0LnZhbHVlfSk7XG5cdH1cbiAgXHRhY3RpdmF0ZU1vZGFsTmV3KCl7XG4gIFx0XHR0aGlzLnNldFN0YXRlKHttb2RhbDpcIm5ld1wifSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7bW9kYWxQcmlvcml0eTonJ30pO1xuXHRcdHRoaXMuc2V0U3RhdGUoe21vZGFsRGVzY3JpcHRpb246Jyd9KTtcblx0XHR0aGlzLnNldFN0YXRlKHttb2RhbFRpdGxlOicnfSk7XG4gIFx0XHQkKCcjJyt0aGlzLm1vZGFsSWQpLm1vZGFsKCk7XG4gIFx0fVxuICBcdGFjdGl2YXRlTW9kYWxFZGl0KGlzc3VlKXtcblx0XHR0aGlzLnNldFN0YXRlKHttb2RhbDppc3N1ZX0pO1xuXHRcdHRoaXMuc2V0U3RhdGUoe21vZGFsUHJpb3JpdHk6aXNzdWUucHJpb3JpdHl9KTtcblx0XHR0aGlzLnNldFN0YXRlKHttb2RhbERlc2NyaXB0aW9uOmlzc3VlLmlzc3VlfSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7bW9kYWxUaXRsZTppc3N1ZS50aXRsZX0pO1xuXHRcdHRoaXMuc2V0U3RhdGUoe21vZGFsTmFtZTppc3N1ZS5uYW1lfSk7XG4gIFx0XHQkKCcjJyt0aGlzLm1vZGFsSWQpLm1vZGFsKCk7XG4gIFx0fVxuICBcdGlzc3VlQ2hhbmdlZCgpe1xuXG5cdFx0dGhpcy5zZXRTdGF0ZSh7aXNzdWVzOnRoaXMuaXNzdWVUb29sLml0ZW1zfSk7XG5cdFx0Y29uc29sZS5sb2codGhpcy5pc3N1ZVRvb2wuaXRlbXMpO1xuXHR9XG4gIFx0c3VibWl0SXNzdWUoZSl7XG4gIFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHR2YXIgbmV3SXRlbT17XG5cdFx0XHR0aXRsZTp0aGlzLnN0YXRlLm1vZGFsVGl0bGUsXG5cdFx0XHRpc3N1ZTp0aGlzLnN0YXRlLm1vZGFsRGVzY3JpcHRpb24sXG5cdFx0XHRwcmlvcml0eTp0aGlzLnN0YXRlLm1vZGFsUHJpb3JpdHksXG5cdFx0XHR2aW5leWFyZDp0aGlzLnByb3BzLmxvY2F0aW9uLFxuXHRcdFx0d29ya19vcmRlcjp0aGlzLnByb3BzLndvcmtvcmRlclxuXHRcdH1cblx0XHRpZih0aGlzLnN0YXRlLm1vZGFsPT1cIm5ld1wiKXtcblx0XHRcdHRoaXMuaXNzdWVUb29sLmNyZWF0ZShuZXdJdGVtLGZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0XHRwcy5zdWNjZXNzQWxlcnQoXCJJc3N1ZSBcIiAraXRlbS50aXRsZSsgXCIgY3JlYXRlZC5cIilcblx0XHRcdH0pO1xuXHRcdH1lbHNle1xuXHRcdFx0bmV3SXRlbS5uYW1lPXRoaXMuc3RhdGUubW9kYWxOYW1lO1xuXHRcdFx0dGhpcy5pc3N1ZVRvb2wudXBkYXRlKG5ld0l0ZW0sZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdHBzLnN1Y2Nlc3NBbGVydChcIklzc3VlIFwiICtpdGVtLnRpdGxlK1wiIHVwZGF0ZWQuXCIpXG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0Ly9jbG9zZSBtb2RhbFxuXHRcdCQoJyMnK3RoaXMubW9kYWxJZCkubW9kYWwoJ3RvZ2dsZScpO1xuXHR9XG5cblxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB0aXRsZT1cIndlbGNvbWVcIjtcblx0XHR2YXIgbWFpbkNsYXNzPXtcblx0XHRcdCdDb21wbGV0ZSc6J3BhbmVsLXN1Y2Nlc3MnLFxuXHRcdFx0J0luY29tcGxldGUnOidwYW5lbC1kYW5nZXInLFxuXHRcdFx0J1BlbmRpbmcnOidwYW5lbC1kZWZhdWx0Jyxcblx0XHRcdCdTdGFydGVkJzoncGFuZWwtd2FybmluZydcblx0XHR9W3RoaXMucHJvcHMuc3RhdHVzXTtcblx0XHRtYWluQ2xhc3MgPSBtYWluQ2xhc3MgKyBcIiBwYW5lbCB3b3Jrb3JkZXIgcHMtcGFuZWxcIjtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nY29sLW1kLTQgY29sLXNtLTQnPlxuXHRcdFx0XHQ8TW9kYWwgXG5cdFx0XHRcdFx0aWQ9e3RoaXMubW9kYWxJZH0gXG5cdFx0XHRcdFx0c3VibWl0VGV4dD1cIlN1Ym1pdFwiIFxuXHRcdFx0XHRcdHRpdGxlPVwiQ3JlYXRlIElzc3VlIEZvclwiXG5cdFx0XHRcdFx0c3VibWl0PXt0aGlzLnN1Ym1pdElzc3VlfT5cblxuXHRcdFx0XHRcdFx0PGZpZWxkc2V0PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHRcdFx0XHRcdFx0XHQ8bGFiZWw+SXNzdWUgVGl0bGU8L2xhYmVsPlxuXHRcdFx0XHRcdFx0XHRcdDxpbnB1dCBcblx0XHRcdFx0XHRcdFx0XHRcdHR5cGU9XCJ0ZXh0XCIgXG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBcblx0XHRcdFx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwiSXNzdWUgVGl0bGVcIiBcblx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlPXt0aGlzLnN0YXRlLm1vZGFsVGl0bGV9IFxuXHRcdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMubW9kYWxUaXRsZUNoYW5nZX1cblx0XHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRcdFx0PGxhYmVsPlByaW9yaXR5PC9sYWJlbD5cblx0XHRcdFx0XHRcdFx0XHQ8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHZhbHVlPXt0aGlzLnN0YXRlLm1vZGFsUHJpb3JpdHl9IG9uQ2hhbmdlPXt0aGlzLm1vZGFsUHJpb3JpdHlDaGFuZ2UuYmluZCh0aGlzKX0+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8b3B0aW9uPkxvdzwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0XHRcdFx0PG9wdGlvbj5NZWRpdW08L29wdGlvbj5cblx0XHRcdFx0XHRcdFx0XHRcdDxvcHRpb24+SGlnaDwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0XHRcdFx0PG9wdGlvbj5Dcml0aWNhbDwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0XHRcdDwvc2VsZWN0PlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRcdCAgXHQ8bGFiZWw+SXNzdWUgRGV0YWlsczo8L2xhYmVsPlxuXHRcdFx0XHRcdFx0XHQgIFx0PHRleHRhcmVhIFxuXHRcdFx0XHRcdFx0XHQgIFx0XHRjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBcblx0XHRcdFx0XHRcdFx0ICBcdFx0cm93cz1cIjNcIiBcblx0XHRcdFx0XHRcdFx0ICBcdFx0cGxhY2Vob2xkZXI9XCJJc3N1ZSBEZXRhaWxzXCIgXG5cdFx0XHRcdFx0XHRcdCAgXHRcdHZhbHVlPXt0aGlzLnN0YXRlLm1vZGFsRGVzY3JpcHRpb259XG5cdFx0XHRcdFx0XHRcdCAgXHRcdG9uQ2hhbmdlPXt0aGlzLm1vZGFsRGVzY3JpcHRpb25DaGFuZ2V9XG5cdFx0XHRcdFx0XHRcdCAgXHQ+PC90ZXh0YXJlYT5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8L2ZpZWxkc2V0PlxuXHRcdFx0XHQ8L01vZGFsPlxuXHRcdFx0PGRpdiBpZD1cIlwiIGNsYXNzTmFtZT17bWFpbkNsYXNzfT5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYW5lbC1oZWFkaW5nXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cblx0XHRcdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJwYW5lbC10aXRsZSBjb2wteHMtOFwiPlxuXHRcdFx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9XCJmbG9hdC1sZWZ0XCIgaHJlZj17dGhpcy5wcm9wcy5sb2NhdGlvbl9yb3V0ZX0+e3RoaXMucHJvcHMubG9jYXRpb259PC9hPlxuXHRcdFx0XHRcdFx0PC9oMz5cblxuXG5cblx0XHRcdFx0XHRcdFx0PENyZWF0ZUlzc3VlXG5cdFx0XHRcdFx0XHRcdFx0aXNzdWVzPXt0aGlzLnN0YXRlLmlzc3Vlc31cblx0XHRcdFx0XHRcdFx0XHRhY3RpdmF0ZU1vZGFsTmV3PXt0aGlzLmFjdGl2YXRlTW9kYWxOZXd9XG5cdFx0XHRcdFx0XHRcdFx0YWN0aXZhdGVNb2RhbEVkaXQ9e3RoaXMuYWN0aXZhdGVNb2RhbEVkaXR9XG5cdFx0XHRcdFx0XHRcdFx0d29ya29yZGVyPXt0aGlzLnByb3BzLndvcmtvcmRlcn1cblxuXHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNsZWFyZml4XCI+PC9kaXY+XG5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFxuXG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWJvZHlcIj5cblx0XHRcdFx0XHQ8ZGl2Pnt0aGlzLnByb3BzLnR5cGV9PC9kaXY+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWxcIj5TdGF0dXM8L2xhYmVsPlxuXHRcdFx0XHRcdDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIHN0YXR1c1wiIHZhbHVlPXt0aGlzLnByb3BzLnN0YXR1c30gb25DaGFuZ2U9e3RoaXMuc3RhdHVzQ2hhbmdlfT5cblx0XHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9XCJQZW5kaW5nXCI+UGVuZGluZzwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIlN0YXJ0ZWRcIj5TdGFydGVkPC9vcHRpb24+XG5cdFx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPVwiQ29tcGxldGVcIj5Db21wbGV0ZTwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIkluY29tcGxldGVcIj5JbmNvbXBsZXRlPC9vcHRpb24+XG5cdFx0XHRcdFx0PC9zZWxlY3Q+XG5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoZWNrX2JveGVzXCI+XG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHRoaXMucHJvcHMudGFza3MubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblx0XHRcdFx0XHRcdFx0XHR2YXIgY2hlY2tlZD1pdGVtLnN0YXR1cz90cnVlOmZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiAoPFRhc2tDaGVjayBrZXk9e2luZGV4fSBpbmRleD17aW5kZXh9IGxhYmxlPXtpdGVtLnRhc2t9IGNoZWNrZWQ9e2NoZWNrZWR9IHRhc2tDaGVja2VkPXt0aGlzLnRhc2tDaGVja2VkfS8+KTtcblx0XHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRcdDxhIGNsYXNzTmFtZT1cIlwiIGhyZWY9e3RoaXMucHJvcHMucm91dGV9Pk1vcmUgSW5mb3JtYXRpb248L2E+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cblxuXG4iLCJpbXBvcnQgQWNvcmRpYW5Db250ZW50IGZyb20gJy4vYWNvcmRpYW5Db250ZW50J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY29yZGlhbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYW5lbC1ncm91cFwiIGlkPXt0aGlzLnByb3BzLmlkfSByb2xlPVwidGFibGlzdFwiIGFyaWEtbXVsdGlzZWxlY3RhYmxlPVwidHJ1ZVwiPlxuXHRcdFx0XHR7IHRoaXMucHJvcHMuY2hpbGRyZW4gfVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjb3JkaWFuQ29udGVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnJlbmRlckhlYWQgPSB0aGlzLnJlbmRlckhlYWQuYmluZCh0aGlzKTtcblx0fVxuXHRyZW5kZXJIZWFkKGlkKXtcblxuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtaGVhZGluZ1wiIFxuXHRcdFx0XHRyb2xlPVwidGFiXCIgXG5cdFx0XHRcdG9uQ2xpY2s9e1xuXHRcdFx0XHRcdGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhpZCk7XG5cdFx0XHRcdFx0XHQkKCcjJyt0aGlzLnByb3BzLnBhcmVudElkKycgLmFjb3JkaWFuLWNvbnRlbnQuaW4nKS5ub3QoJyMnK2lkKS5jb2xsYXBzZSgnaGlkZScpO1xuXHRcdFx0XHRcdFx0JCgnIycraWQpLmNvbGxhcHNlKCd0b2dnbGUnKTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcylcblx0XHRcdFx0fVxuXHRcdFx0XHQ+XG5cdFx0XHRcdDxoNCBjbGFzc05hbWU9XCJwYW5lbC10aXRsZVwiPlxuXHRcdFx0XHRcdDxhIHJvbGU9XCJidXR0b25cIiBkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCIgZGF0YS1wYXJlbnQ9eycjJyt0aGlzLnByb3BzLnBhcmVudElkfSBhcmlhLWV4cGFuZGVkPXsodGhpcy5wcm9wcy5hY3RpdmUpPyB0cnVlOmZhbHNlfSAgPlxuXHRcdFx0ICBcdFx0XHR7dGhpcy5wcm9wcy50aXRsZX1cblx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdDwvaDQ+XG5cdFx0XHRcdHt0aGlzLnByb3BzLmV4dHJhSGVhZH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dmFyIGlkID10aGlzLnByb3BzLmlkO1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsIHBhbmVsLWRlZmF1bHRcIj5cblx0XHRcdFx0e3RoaXMucmVuZGVySGVhZChpZCl9XG5cdFx0XHRcdDxkaXYgaWQ9e2lkfSBcblx0XHRcdFx0XHRjbGFzc05hbWU9eyh0aGlzLnByb3BzLmFjdGl2ZSk/IFwiYWNvcmRpYW4tY29udGVudCBwYW5lbC1jb2xsYXBzZSBjb2xsYXBzZSBpblwiOlwiYWNvcmRpYW4tY29udGVudCBwYW5lbC1jb2xsYXBzZSBjb2xsYXBzZVwifSBcblx0XHRcdFx0XHRyb2xlPVwidGFicGFuZWxcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWJvZHlcIj5cblx0XHRcdFx0XHRcdHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG4gIFx0XHQpO1xuXHR9XG59XG4iLCIvKiBmb3JtcyAqL1xuLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5zdWJtaXQ9dGhpcy5zdWJtaXQuYmluZCh0aGlzKTtcblx0fVxuXHRzdWJtaXQoZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMucHJvcHMuc3VibWl0KGUpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHZhciBmb3JtPVtdO1xuXHRcdHZhciBmb3JtVHlwZXM9e1xuXHRcdFx0c2VsZWN0XHQ6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHR2YXIgdmFsdWUgPSAoaXRlbS52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0udmFsdWU7XG5cdFx0XHRcdHZhciBsYWJsZSA9IChpdGVtLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5sYWJsZTtcblx0XHRcdFx0dmFyIG9wdGlvbnMgPSAoaXRlbS5vcHRpb25zID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5vcHRpb25zO1xuXHRcdFx0XHR2YXIgY2xhc3NOYW1lID0gKGl0ZW0uY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5jbGFzc05hbWU7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PFNlbGVjdFxuXHRcdFx0XHRcdFx0a2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fSBcblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0bGFibGU9e2xhYmxlfVxuXHRcdFx0XHRcdFx0b3B0aW9ucz17b3B0aW9uc31cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0aW5wdXQgXHQ6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHR2YXIgdHlwZSA9IChpdGVtLnR5cGUgPT09IHVuZGVmaW5lZCkgPyBcInRleHRcIjogaXRlbS50eXBlO1xuXHRcdFx0XHR2YXIgdmFsdWUgPSAoaXRlbS52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0udmFsdWU7XG5cdFx0XHRcdHZhciBwbGFjZWhvbGRlciA9IChpdGVtLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5wbGFjZWhvbGRlcjtcblx0XHRcdFx0dmFyIGxhYmxlID0gKGl0ZW0ubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmxhYmxlO1xuXHRcdFx0XHR2YXIgY2xhc3NOYW1lID0gKGl0ZW0uY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5jbGFzc05hbWU7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PElucHV0XG5cdFx0XHRcdFx0XHRrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9IFxuXHRcdFx0XHRcdFx0dHlwZT17dHlwZX1cblx0XHRcdFx0XHRcdHZhbHVlPXt2YWx1ZX1cblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cblx0XHRcdFx0XHRcdGxhYmxlPXtsYWJsZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0aW5wdXRDaGFuZ2VkPXtmdW5jdGlvbihlKXt2YXIgdGVzdDt9fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRsYWJsZSBcdDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHJldHVybiAoICBcbiAgICBcdFx0XHRcdDxsYWJlbCBrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9ID57aXRlbS5sYWJsZX08L2xhYmVsPlxuXG4gICAgXHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdHJhZGlvXHQ6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHRyZXR1cm4gKDxkaXY+PC9kaXY+KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdHRleHRhcmVhOiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0cmV0dXJuICg8ZGl2PjwvZGl2Pik7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRoZWFkZXI6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHRyZXR1cm4oPGgzIGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH0gPntpdGVtLmxhYmxlfTwvaDM+KVxuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0ZGF0ZTogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IChpdGVtLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS52YWx1ZTtcblx0XHRcdFx0dmFyIGxhYmxlID0gKGl0ZW0ubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmxhYmxlO1xuXHRcdFx0XHR2YXIgcGxhY2Vob2xkZXIgPSAoaXRlbS5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucGxhY2Vob2xkZXI7XG5cdFx0XHRcdHZhciBjbGFzc05hbWUgPSAoaXRlbS5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmNsYXNzTmFtZTtcblx0XHRcdFx0cmV0dXJuKFxuXHRcdFx0XHRcdDxEYXRlSW5wdXRcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH0gXG5cdFx0XHRcdFx0XHR2YWx1ZT17dmFsdWV9XG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG5cdFx0XHRcdFx0XHRsYWJsZT17bGFibGV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e2NsYXNzTmFtZX1cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKX19XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGF1dG9Db21wbGV0ZTogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IChpdGVtLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS52YWx1ZTtcblx0XHRcdFx0dmFyIGxhYmxlID0gKGl0ZW0ubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmxhYmxlO1xuXHRcdFx0XHR2YXIgcGxhY2Vob2xkZXIgPSAoaXRlbS5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucGxhY2Vob2xkZXI7XG5cdFx0XHRcdHZhciBjbGFzc05hbWUgPSAoaXRlbS5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmNsYXNzTmFtZTtcblx0XHRcdFx0cmV0dXJuKFxuXHRcdFx0XHRcdDxBd2Vzb21wbGV0ZUlucHV0XG5cdFx0XHRcdFx0XHRrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9XG5cdFx0XHRcdFx0XHRkb2N0eXBlPXtpdGVtLmRvY3R5cGV9XG5cdFx0XHRcdFx0XHRkb2N2YWx1ZT17aXRlbS5kb2N2YWx1ZX1cblx0XHRcdFx0XHRcdGRvY2xhYmxlPXtpdGVtLmRvY2xhYmxlfVxuXHRcdFx0XHRcdFx0dmFsdWU9e3ZhbHVlfVxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuXHRcdFx0XHRcdFx0bGFibGU9e2xhYmxlfVxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXtjbGFzc05hbWV9XG5cdFx0XHRcdFx0XHRpbnB1dENoYW5nZWQ9e2Z1bmN0aW9uKGUpe2l0ZW0ub25DaGFuZ2UoZSl9fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcylcblx0XHR9XG5cdFx0dGhpcy5wcm9wcy5maWVsZHMubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblxuXHRcdFx0Zm9ybS5wdXNoKGZvcm1UeXBlc1tpdGVtLmZpZWxkXShpdGVtLGluZGV4KSk7XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0XHQvL2Zvcih2YXIgeD0wOyB4IDwgdGhpcy5wcm9wcy5mZWlsZHMubGVuZ3RoIHgrKzsgKVxuXHRcdHZhciBjbGFzc05hbWUgPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcInJlYWN0LWZvcm1cIjogXCJmb3JtLWhvcml6b250YWwgcmVhY3QtZm9ybSBcIit0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8Zm9ybSBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG5cdFx0XHRcdDxmaWVsZHNldD5cblx0XHRcdFx0e2Zvcm19XG5cdFx0XHRcdHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9XG5cdFx0XHRcdDwvZmllbGRzZXQ+XG5cdFx0XHQ8L2Zvcm0+XG5cdFx0KTtcblx0fVxufVxuXG5cblxuZXhwb3J0IGNsYXNzIFNlbGVjdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLmlucHV0Q2hhbmdlPXRoaXMuaW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcblxuXHR9XG5cdGlucHV0Q2hhbmdlKGUpe1xuXHRcdHRoaXMucHJvcHMuaW5wdXRDaGFuZ2VkKCk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLmxhYmxlID0gKHRoaXMucHJvcHMubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLmxhYmxlO1xuXHRcdHRoaXMub3B0aW9ucyA9ICh0aGlzLnByb3BzLm9wdGlvbnMgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLm9wdGlvbnM7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jb250cm9sXCI6IFwiZm9ybS1jb250cm9sXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHZhciBvcHRpb25zPVtdO1xuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblxuXG5cdFx0dGhpcy5vcHRpb25zLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCl7XG5cdFx0XHR2YXIgZ3JvdXA9W107XG5cdFx0XHRpZihpdGVtLmdyb3VwICE9PSB1bmRlZmluZWQpe1xuXHRcdFx0XHRpdGVtLm9wdGlvbnMubWFwKGZ1bmN0aW9uKGlubmVySXRlbSxpbmRleCl7XG5cdFx0XHRcdFx0Z3JvdXAucHVzaCggPG9wdGlvbiBrZXk9e2l0ZW0uZ3JvdXAraW5kZXh9PiB7aW5uZXJJdGVtfSA8L29wdGlvbj4pXG5cdFx0XHRcdH0pXG5cdFx0XHRcdG9wdGlvbnMucHVzaCg8b3B0Z3JvdXAga2V5PXtpdGVtLmdyb3VwfSBsYWJlbD17aXRlbS5ncm91cH0+IHtncm91cH08L29wdGdyb3VwPik7XG5cblx0XHRcdH1cblx0XHRcdGVsc2V7XG5cdFx0XHRcdG9wdGlvbnMucHVzaCggPG9wdGlvbiBrZXk9e2luZGV4fT4ge2l0ZW19IDwvb3B0aW9uPilcblx0XHRcdH1cblxuXHRcdFx0XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRcblxuXHRcdHZhciBzZWxlY3Q9KFxuXHRcdFx0PHNlbGVjdCBjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfSB2YWx1ZT17dGhpcy52YWx1ZX0+XG5cdFx0XHRcdHtvcHRpb25zfVxuXHRcdFx0PC9zZWxlY3Q+XG5cdFx0KTtcblxuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy5sYWJsZSA9PVwiXCIpe1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgXCI+XG5cdFx0ICAgIFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbFwiPnt0aGlzLnByb3BzLmxhYmxlfTwvbGFiZWw+XG5cdFx0ICAgIFx0XHQ8ZGl2PlxuXHRcdCAgICBcdFx0e3NlbGVjdH1cblx0XHQgICAgXHRcdDwvZGl2PlxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHQgICAgICBcdFx0e3NlbGVjdH1cblx0XHQgIFx0XHQ8L2Rpdj5cblx0XHQgIFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIElucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuaW5wdXRDaGFuZ2U9dGhpcy5pbnB1dENoYW5nZS5iaW5kKHRoaXMpO1xuXG5cdH1cblx0aW5wdXRDaGFuZ2UoZSl7XG5cdFx0dGhpcy5wcm9wcy5pbnB1dENoYW5nZWQoKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnR5cGUgPSAodGhpcy5wcm9wcy50eXBlID09PSB1bmRlZmluZWQpID8gXCJ0ZXh0XCI6IHRoaXMucHJvcHMudHlwZTtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMucGxhY2Vob2xkZXIgPSAodGhpcy5wcm9wcy5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXI7XG5cdFx0dGhpcy5sYWJsZSA9ICh0aGlzLnByb3BzLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5sYWJsZTtcblx0XHR2YXIgb3V0cHV0PVwiXCI7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jb250cm9sXCI6IFwiZm9ybS1jb250cm9sIFwiICt0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHR2YXIgaW5wdXQ9KCA8aW5wdXQgdHlwZT17dGhpcy50eXBlfSBjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfSBwbGFjZWhvbGRlcj17dGhpcy5wbGFjZWhvbGRlcn0gdmFsdWU9e3RoaXMudmFsdWV9IC8+KTtcblxuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy5sYWJsZSA9PVwiXCIpe1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgXCI+XG5cdFx0ICAgIFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbFwiPnt0aGlzLnByb3BzLmxhYmxlfTwvbGFiZWw+XG5cdFx0ICAgIFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIlwiPlxuXHRcdCAgICAgIFx0XHRcdHtpbnB1dH1cblx0XHQgICAgXHRcdDwvZGl2PlxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHQgICAgICBcdFx0e2lucHV0fVxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuZXhwb3J0IGNsYXNzIERhdGVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLmlucHV0Q2hhbmdlPXRoaXMuaW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcblx0XHR0aGlzLmRhdGVJbml0PXRoaXMuZGF0ZUluaXQuYmluZCh0aGlzKTtcblxuXHR9XG5cdGlucHV0Q2hhbmdlKGUpe1xuXHRcdHRoaXMucHJvcHMuaW5wdXRDaGFuZ2VkKCk7XG5cdH1cblx0ZGF0ZUluaXQoKXtcblx0XHQkKCcuaW5wdXQtZ3JvdXAuZGF0ZSAuZGF0ZXBpY2snKS5kYXRlcGlja2VyKHtcblx0XHQgICAgdG9kYXlCdG46IFwibGlua2VkXCIsXG5cdFx0ICAgIG9yaWVudGF0aW9uOiBcImJvdHRvbSByaWdodFwiLFxuXHRcdCAgICBhdXRvY2xvc2U6IHRydWUsXG5cdFx0ICAgIHRvZGF5SGlnaGxpZ2h0OiB0cnVlXG5cdFx0fSkub24oJ2NoYW5nZURhdGUnLCBmdW5jdGlvbihlKSB7XG5cdFx0XHR2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2lucHV0JywgeyBidWJibGVzOiB0cnVlIH0pO1xuXHRcdFx0ZS50YXJnZXQuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cdFx0fSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLnBsYWNlaG9sZGVyID0gKHRoaXMucHJvcHMucGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnBsYWNlaG9sZGVyO1xuXHRcdHRoaXMubGFibGUgPSAodGhpcy5wcm9wcy5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMubGFibGU7XG5cdFx0dmFyIG91dHB1dD1cIlwiO1xuXHRcdHRoaXMuY2xhc3NOYW1lPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcImZvcm0tY29udHJvbCBkYXRlcGlja1wiOiBcImZvcm0tY29udHJvbCBkYXRlcGljayBcIiArdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0dmFyIGlucHV0PSggXG5cdFx0XHQ8aW5wdXRcblx0XHRcdFx0cmVmPXt0aGlzLmRhdGVJbml0fSBcblx0XHRcdFx0dHlwZT1cInRleHRcIlxuXHRcdFx0XHRjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfVxuXHRcdFx0XHRwbGFjZWhvbGRlcj17dGhpcy5wbGFjZWhvbGRlcn0gIFxuXHRcdFx0XHR2YWx1ZT17dGhpcy52YWx1ZX0gXG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnByb3BzLmlucHV0Q2hhbmdlZH1cblx0XHRcdFx0Lz5cblxuXHRcdCk7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkIHx8IHRoaXMucHJvcHMubGFibGUgPT1cIlwiKXtcblx0XHRcdG91dHB1dCA9IChcblx0XHQgIFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHQgIFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD5cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAgZGF0ZVwiPlxuXHRcdFx0XHRcdFx0e2lucHV0fVxuXHRcdFx0XHQgIFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cC1hZGRvblwiPlxuXHRcdFx0XHQgIFx0XHRcdDxpIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tdGhcIj48L2k+XG5cdFx0XHRcdCAgXHRcdDwvc3Bhbj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwIGRhdGVcIj5cblxuXHRcdFx0XHRcdFx0e2lucHV0fVxuXHRcdFx0XHQgIFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cC1hZGRvblwiPlxuXHRcdFx0XHQgIFx0XHRcdDxpIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tdGhcIj48L2k+XG5cdFx0XHRcdCAgXHRcdDwvc3Bhbj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuZXhwb3J0IGNsYXNzIEF3ZXNvbXBsZXRlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cblx0XHQvKiAgIERvIHRoZSBiaW5kIHRoaW5nICAqL1xuXHRcdHRoaXMuY3JlYXRlTGlzdD10aGlzLmNyZWF0ZUxpc3QuYmluZCh0aGlzKTtcblx0XHR0aGlzLmRvY0NoYW5nZWQ9dGhpcy5kb2NDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jb21wb25lbnREaWRNb3VudD10aGlzLmNvbXBvbmVudERpZE1vdW50LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5pbnB1dENoYW5nZT10aGlzLmlucHV0Q2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5hdXRvY29tcGxldGU9dGhpcy5hdXRvY29tcGxldGUuYmluZCh0aGlzKTtcblx0XHQvL3RoaXMud29ya29yZGVyT2JqPXRoaXMub25TdGF0dXNDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0LyogICAgICAgICAgZW5kICAgICAgICAgICovXG5cdFx0dGhpcy5pdGVtbGlzdD1bXTtcblx0XHR0aGlzLnN0YXRlPXtpdGVtbGlzdDpbXX07XG5cdFx0dGhpcy5faXNNb3VudGVkPWZhbHNlO1xuXHRcdHZhciBhcmdzPXt9O1xuXHRcdHZhciBvcHRpb25zPXtkb2N0eXBlOnRoaXMucHJvcHMuZG9jdHlwZX07XG5cdFx0dGhpcy5saXN0VG9vbCA9IG5ldyBwcy5hcGlUb29sKHt9LCBvcHRpb25zICx0aGlzLmRvY0NoYW5nZWQpO1xuXHRcdGlmICh0aGlzLmxpc3RUb29sLml0ZW1zPT09dW5kZWZpbmVkIHx8dGhpcy5saXN0VG9vbC5pdGVtcz09PSAwIHx8dGhpcy5saXN0VG9vbC5pdGVtcz09PW51bGwgKXtcblx0XHR9ZWxzZXtcblx0XHRcdHRoaXMuc3RhdGUubGlzdD10aGlzLmxpc3RUb29sLml0ZW1zO1xuXHRcdH1cblxuXHRcdHRoaXMuY3JlYXRlTGlzdCgpO1xuXHR9XG5cdGRvY0NoYW5nZWQoKXtcblx0XHR0aGlzLmNyZWF0ZUxpc3QoKTtcblx0fVxuXHRjb21wb25lbnREaWRNb3VudCgpe1xuXHRcdHRoaXMuX2lzTW91bnRlZD10cnVlO1xuXG5cdH1cblx0Y3JlYXRlTGlzdCgpe1xuXHRcdHRoaXMuaXRlbWxpc3Q9W107XG5cdFx0aWYgKHRoaXMucHJvcHMuZG9jbGFibGUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmxpc3RUb29sLml0ZW1zICE9PSB1bmRlZmluZWQpe1xuXHRcdFx0Zm9yKGxldCBpdGVtIG9mIHRoaXMubGlzdFRvb2wuaXRlbXMpe1xuXHRcdFx0XHR2YXIgdGVtcCA9W2l0ZW1bdGhpcy5wcm9wcy5kb2NsYWJsZV0saXRlbVt0aGlzLnByb3BzLmRvY3ZhbHVlXV07XG5cdFx0XHRcdHRoaXMuaXRlbWxpc3QucHVzaCh0ZW1wKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSBpZih0aGlzLmxpc3RUb29sLml0ZW1zICE9PSB1bmRlZmluZWQpe1xuXHRcdFx0Zm9yKGxldCBpdGVtIG9mIHRoaXMubGlzdFRvb2wuaXRlbXMpe1xuXHRcdFx0XHR0aGlzLml0ZW1saXN0LnB1c2goaXRlbVt0aGlzLnByb3BzLmRvY3ZhbHVlXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHRoaXMuX2lzTW91bnRlZCl7XG5cdFx0XHQvL3RoaXMuc2V0U3RhdGUoe2l0ZW1saXN0OnRoaXMuc3RhdGUuaXRlbWxpc3R9KTtcblx0XHR9XG5cdFx0JChkb2N1bWVudCkudHJpZ2dlcignbGlzdExvYWQnICsgdGhpcy5wcm9wcy5kb2N0eXBlKTtcblx0fVxuXG5cdGF1dG9jb21wbGV0ZShpbnB1dCl7XG5cdFx0dmFyIGNvbmZpZz0ge1xuXHRcdFx0XHRtaW5DaGFyczogMCxcblx0XHRcdFx0bWF4SXRlbXM6IDk5LFxuXHRcdFx0XHRhdXRvRmlyc3Q6IHRydWUsXG5cdFx0XHRcdGZpbHRlcjogQXdlc29tcGxldGUuRklMVEVSX1NUQVJUU1dJVEhcblx0XHRcdH1cblx0XHRpZih0aGlzLnByb3BzLmRvY2xhYmxlICE9PSB1bmRlZmluZWQgKXtcblx0XHRcdGNvbmZpZy5pdGVtPSBmdW5jdGlvbihpdGVtLCBpbnB1dCkge1xuXHRcdFx0XHR2YXIgZCA9IGl0ZW07XG5cdFx0XHRcdHZhciBodG1sID0gXCI8c3Bhbj5cIiArIF9fKGl0ZW0ubGFiZWwpKyBcIjwvc3Bhbj48YnI+PHNwYW4+PHNtYWxsPlwiK2l0ZW0udmFsdWUrXCI8L3NtYWxsPjwvc3Bhbj5cIjtcblx0XHRcdFx0cmV0dXJuICQoJzxsaT48L2xpPicpXG5cdFx0XHRcdFx0LmRhdGEoJ2l0ZW0uYXV0b2NvbXBsZXRlJywgaXRlbSlcblx0XHRcdFx0XHQuaHRtbCgnPGE+PHA+JyArIGh0bWwgKyAnPC9wPjwvYT4nKVxuXHRcdFx0XHRcdC5nZXQoMCk7XG5cdFx0XHR9XG5cblx0XHR9ZWxzZXtcblx0XHRcdGNvbmZpZy5pdGVtPWZ1bmN0aW9uKGl0ZW0sIGlucHV0KSB7XG5cdFx0XHRcdHZhciBkID0gaXRlbTtcblx0XHRcdFx0dmFyIGh0bWwgPSBcIjxzcGFuPlwiICsgX18oaXRlbSkrIFwiPC9zcGFuPlwiO1xuXHRcdFx0XHRyZXR1cm4gJCgnPGxpPjwvbGk+Jylcblx0XHRcdFx0XHQuZGF0YSgnaXRlbS5hdXRvY29tcGxldGUnLCBpdGVtKVxuXHRcdFx0XHRcdC5odG1sKCc8YT48cD4nICsgaHRtbCArICc8L3A+PC9hPicpXG5cdFx0XHRcdFx0LmdldCgwKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5hdyA9IG5ldyBBd2Vzb21wbGV0ZShpbnB1dCxjb25maWcpO1xuXHRcdGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXG5cdFx0XHQnYXdlc29tcGxldGUtc2VsZWN0Y29tcGxldGUnLFxuXHRcdFx0XHR0aGlzLmlucHV0Q2hhbmdlXG5cdFx0KTtcblx0XHQvLyAkKCcjcG9vJykuZm9jdXMoZnVuY3Rpb24oKXtcblx0XHQvLyBcdFx0dGhpcy5hdy5vcGVuKCk7XG5cdFx0Ly8gfS5iaW5kKHRoaXMpKTtcblx0XHQvL2NvbnNvbGUubG9nKClcblx0XHQvLyBpbnB1dC50YXJnZXQub25mb2N1cyggZnVuY3Rpb24oKSB7XG5cdFx0Ly8gXHRjb25zb2xlLmxvZyhmb2N1cyk7XG5cdFx0Ly8gXHRpZiAoYXcudWwuaGFzQXR0cmlidXRlKCdoaWRkZW4nKSkge1xuXHRcdC8vIFx0XHRhdy5vcGVuKCk7XG5cdFx0Ly8gXHR9XG5cdFx0Ly8gXHRlbHNlIHtcblx0XHQvLyBcdFx0YXcuY2xvc2UoKTtcblx0XHQvLyBcdH1cblx0XHQvLyB9KTtcblx0XHQvLyBpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwib25ibHVyXCIsIGZ1bmN0aW9uKCkge1xuXHRcdC8vIFx0aWYgKGF3LnVsLmNoaWxkTm9kZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0Ly8gXHRcdGF3Lm1pbkNoYXJzID0gMDtcblx0XHQvLyBcdFx0YXcuZXZhbHVhdGUoKTtcblx0XHQvLyBcdH1cblx0XHQvLyBcdGVsc2Uge1xuXHRcdC8vIFx0XHRhdy5jbG9zZSgpO1xuXHRcdC8vIFx0fVxuXHRcdC8vIH0pO1xuXG5cdFx0dGhpcy5hdy5saXN0PXRoaXMuaXRlbUxpc3Q7XG5cdFx0JChkb2N1bWVudCkuYmluZCgnbGlzdExvYWQnICsgdGhpcy5wcm9wcy5kb2N0eXBlLGZ1bmN0aW9uKCl7XG5cdFx0XHR0aGlzLmF3Lmxpc3Q9dGhpcy5pdGVtbGlzdDtcblx0XHR9LmJpbmQodGhpcykpO1xuXHR9XG5cdGlucHV0Q2hhbmdlKGUpe1xuXHRcdHRoaXMucHJvcHMuaW5wdXRDaGFuZ2VkKGUpO1xuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy50eXBlID0gKHRoaXMucHJvcHMudHlwZSA9PT0gdW5kZWZpbmVkKSA/IFwidGV4dFwiOiB0aGlzLnByb3BzLnR5cGU7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLnBsYWNlaG9sZGVyID0gKHRoaXMucHJvcHMucGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnBsYWNlaG9sZGVyO1xuXHRcdHRoaXMubGFibGUgPSAodGhpcy5wcm9wcy5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMubGFibGU7XG5cdFx0dmFyIG91dHB1dD1cIlwiO1xuXHRcdHRoaXMuY2xhc3NOYW1lPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcImZvcm0tY29udHJvbCBhd2Vzb21wbGV0ZVwiOiBcImZvcm0tY29udHJvbCBhd2Vzb21wbGV0ZSBcIiArdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0dmFyIGlucHV0PSggPGlucHV0IFxuXHRcdFx0XHRcdHR5cGU9e3RoaXMudHlwZX0gXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPXt0aGlzLmNsYXNzTmFtZX0gXG5cdFx0XHRcdFx0cGxhY2Vob2xkZXI9e3RoaXMucGxhY2Vob2xkZXJ9IFxuXHRcdFx0XHRcdHJlZj17dGhpcy5hdXRvY29tcGxldGV9XG5cdFx0ICAgICAgICAgIFx0b25DaGFuZ2U9e3RoaXMuaW5wdXRDaGFuZ2V9IFxuXHRcdCAgICAgICAgICAvPik7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkIHx8IHRoaXMucHJvcHMubGFibGUgPT1cIlwiKXtcblx0XHRcdG91dHB1dCA9IChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIFwiPlxuXHRcdCAgICBcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWxcIj57dGhpcy5wcm9wcy5sYWJsZX08L2xhYmVsPlxuXHRcdCAgICBcdFx0PGRpdiBjbGFzc05hbWU9XCJcIj5cblx0XHQgICAgICBcdFx0XHR7aW5wdXR9XG5cdFx0ICAgIFx0XHQ8L2Rpdj5cblx0XHQgIFx0XHQ8L2Rpdj5cblx0XHQgIFx0KTtcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdG91dHB1dCA9IChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG5cdFx0ICAgICAgXHRcdHtpbnB1dH1cblx0XHQgIFx0XHQ8L2Rpdj5cblx0XHQgIFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuXG4iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RhbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnN1Ym1pdD10aGlzLnN1Ym1pdC5iaW5kKHRoaXMpO1xuXHR9XG5cdHN1Ym1pdChlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5wcm9wcy5zdWJtaXQoZSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbCBmYWRlIHRleHQtbGVmdCBwYW5lbC1kZWZhdWx0XCIgaWQ9e3RoaXMucHJvcHMuaWR9IHRhYkluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCIgYXJpYS1sYWJlbGxlZGJ5PVwiZXhhbXBsZU1vZGFsTGFiZWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2dcIiByb2xlPVwiZG9jdW1lbnRcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XG5cdFx0XHRcdFx0XHRcdDxoNCBjbGFzc05hbWU9XCJtb2RhbC10aXRsZVwiIGlkPVwiZXhhbXBsZU1vZGFsTGFiZWxcIj57dGhpcy5wcm9wcy50aXRsZX08L2g0PlxuXHRcdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBkaXNwbGF5PVwibm9uZVwiIGNsYXNzTmFtZT1cImNsb3NlIGhpZGVcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPlxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxuXHRcdFx0XHRcdFx0XHRcdHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWZvb3RlclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tc2Vjb25kYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DbG9zZTwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0XHRcdDxidXR0b24gXG5cdFx0XHRcdFx0XHRcdFx0XHR0eXBlPVwic3VibWl0XCIgXG5cdFx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLnN1Ym1pdH0gXG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiA+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHt0aGlzLnByb3BzLnN1Ym1pdFRleHR9XG5cdFx0XHRcdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuXG4iLCJcbmltcG9ydCBBY29yZGlhbiBmcm9tICcuLi8uLi9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9hY29yZGlhbidcbmltcG9ydCBBY29yZGlhbkNvbnRlbnQgZnJvbSAnLi4vLi4vcHVibGljL2pzL21vZHVsZXMvdXRpbHMvYWNvcmRpYW5Db250ZW50J1xuaW1wb3J0IERheXNXb3Jrb3JkZXJzIGZyb20gJy4uLy4uL3B1YmxpYy9qcy9tb2R1bGVzL2RheXNfd29ya29yZGVycy9kYXlzV29ya29yZGVycydcbmltcG9ydCBGb3JtIGZyb20gJy4uLy4uL3B1YmxpYy9qcy9tb2R1bGVzL3V0aWxzL2Zvcm1zJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDcmV3RGFzaCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblxuXHRcdHRoaXMuY3Jld0NoYW5nZWQ9dGhpcy5jcmV3Q2hhbmdlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY3Jld3NBY29yZGlvbj10aGlzLmNyZXdzQWNvcmRpb24uYmluZCh0aGlzKTtcblx0XHR0aGlzLmRhdGVDaGFuZ2VkPXRoaXMuZGF0ZUNoYW5nZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLndvcmtPcmRlclN0YXR1cz10aGlzLndvcmtPcmRlclN0YXR1cy5iaW5kKHRoaXMpO1xuXG5cblx0XHR0aGlzLmN1cnJlbnRVc2VyPXBzLmluaXRDdXJyZW50VXNlcigpO1xuXHRcdHRoaXMuY3VycmVudFVzZXIuZ2V0KHt9LGZ1bmN0aW9uKGl0ZW1zKXtcblx0XHRcdGlmKHRoaXMuY3VycmVudFVzZXIuaXRlbXMudXNlcm5hbWU9PVwiR3Vlc3RcIil7XG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbiA9IFwiL2xvZ2luXCI7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0JChkb2N1bWVudCkudHJpZ2dlcihcInVzZXJMb2FkZWRcIik7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coXCJhZnRlciBMb2FkXCIsdGhpcy5jdXJyZW50VXNlci5pdGVtcyk7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKHRoaXMpKTsgXG5cdFx0Ly90aGlzLnN0YXRlPXt9O1xuXHRcdHRoaXMuc3RhdGU9e1xuXHRcdFx0Y3JldzpbXSxcblx0XHRcdHN0YXR1czpbXSxcblx0XHRcdHRpdGxlOicnLFxuXHRcdFx0dXNlcmluZm86dGhpcy5jdXJyZW50VXNlci5pdGVtcyxcblx0XHRcdHNlbGVjdGVkRGF0ZTptb21lbnQoKS5mb3JtYXQoXCJNTS9ERC9ZWVlZXCIpXG5cdFx0fTtcblx0XHRjb25zb2xlLmxvZyh0aGlzLmN1cnJlbnRVc2VyLml0ZW1zLnRvZGF5KTtcblx0XHR0aGlzLmNyZXdUb29sID0gbmV3IHBzLmFwaVRvb2woe30se2RvY3R5cGU6J0NyZXcnfSx0aGlzLmNyZXdDaGFuZ2VkKTtcblx0XHR0aGlzLmFjb3JkaWFuSWQ9XCJjcmV3LWRhc2gtYWNvcmRpYW5cIjtcblx0fVxuXG4gIFx0Y3Jld0NoYW5nZWQoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtjcmV3OnRoaXMuY3Jld1Rvb2wuaXRlbXN9KTtcblx0fVxuXHRkYXRlQ2hhbmdlZChlKXtcblx0XHR0aGlzLnNldFN0YXRlKHtzZWxlY3RlZERhdGU6ZS50YXJnZXQudmFsdWV9KTtcblx0fVxuXHR3b3JrT3JkZXJTdGF0dXMoaW5kZXgpe1xuXHRcdHJldHVybiBmdW5jdGlvbihpdGVtcyl7XG5cdFx0XHR2YXIgc3RhdHVzPVwiTm9uZVwiO1xuXHRcdFx0Zm9yIChsZXQgaXRlbSBvZiBpdGVtcyl7XG5cdFx0XHRcdGlmKGl0ZW0uc3RhdHVzPT1cIlN0YXJ0ZWRcIil7XG5cdFx0XHRcdFx0c3RhdHVzPVwiV29ya2luZ1wiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKGl0ZW0uc3RhdHVzPT1cIkNvbXBsZXRlXCIgJiYgc3RhdHVzIT1cIldvcmtpbmdcIil7XG5cdFx0XHRcdFx0c3RhdHVzPVwiQ29tcGxldGVkXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoaXRlbS5zdGF0dXM9PVwiUGVuZGluZ1wiICYmIHN0YXR1cz09XCJDb21wbGV0ZWRcIil7XG5cdFx0XHRcdFx0c3RhdHVzPVwiRHJpdmluZ1wiO1xuXHRcdFx0XHR9XG5cblx0XHRcdH1cblx0XHRcdHRoaXMuc3RhdGUuc3RhdHVzW2luZGV4XT1zdGF0dXM7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtzdGF0dXM6dGhpcy5zdGF0ZS5zdGF0dXN9KTtcblx0XHR9LmJpbmQodGhpcyk7XG5cdH1cblxuXHRjcmV3c0Fjb3JkaW9uKCl7XG5cdFx0XHQvL2lmIGFsbCBwZW5kaW5nICYmIGNsb2NrZWQgaW4gZHJpdmluZ1xuXHRcdFx0Ly9pZiBub3QgY2xvY2tlZCBpbjogbm90IHN0cmF0ZWRcblx0XHRcdC8vY2xvY2tlZCBvdXQ6IGNsb2NrZWQgb3V0XG5cblxuXHRcdHZhciBjb252ZXJ0ZWREYXRlID0gbW9tZW50KHRoaXMuc3RhdGUuc2VsZWN0ZWREYXRlLCAnTU0vREQvWVlZWScpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xuXHRcdHZhciBvdXRwdXQ9W107XG5cdFx0dGhpcy5zdGF0ZS5jcmV3Lm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCl7XG5cdFx0XHRpZih0aGlzLnN0YXRlLnN0YXR1c1tpbmRleF09PT11bmRlZmluZWQpe1xuXHRcdFx0XHR0aGlzLnN0YXRlLnN0YXR1c1tpbmRleF09XCJObyBXb3JrIE9yZGVyc1wiO1xuXHRcdFx0fVxuXHRcdFx0b3V0cHV0LnB1c2goKFxuXHRcdFx0XHQ8QWNvcmRpYW5Db250ZW50XG5cdFx0XHRcdFx0a2V5PXt0aGlzLmFjb3JkaWFuSWQraW5kZXh9XG5cdFx0XHRcdFx0aWQ9e3RoaXMuYWNvcmRpYW5JZCtpbmRleH1cblx0XHRcdFx0XHR0aXRsZT17aXRlbS5jcmV3X25hbWV9XG5cdFx0XHRcdFx0YWN0aXZlPXsoaW5kZXg9PT0wKT90cnVlOmZhbHNlfVxuXHRcdFx0XHRcdHBhcmVudElkPXt0aGlzLmFjb3JkaWFuSWR9XG5cdFx0XHRcdD5cblx0XHRcdFx0XHR7dGhpcy5zdGF0ZS5zdGF0dXNbaW5kZXhdfVxuXHRcdFx0XHRcdDxEYXlzV29ya29yZGVycyBcblx0XHRcdFx0XHRcdGRhdGU9e2NvbnZlcnRlZERhdGV9XG5cdFx0XHRcdFx0XHRjcmV3PXtpdGVtLm5hbWV9XG5cdFx0XHRcdFx0XHRzdGF0dXNVcGRhdGU9e3RoaXMud29ya09yZGVyU3RhdHVzKGluZGV4KX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQ8L0Fjb3JkaWFuQ29udGVudD4pKTtcdFxuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuICg8ZGl2PlxuXHRcdFx0PEZvcm1cblx0XHRcdFx0Y2xhc3NOYW1lPVwiY2VudGVyLWJsb2NrIHNob3J0XCJcblx0XHRcdFx0dHlwZT1cImhvcml6b250YWxcIlxuXHRcdFx0XHRmaWVsZHM9e1t7XG5cdFx0XHRcdFx0ZmllbGQ6XCJkYXRlXCIsXG5cdFx0XHRcdFx0dmFsdWU6dGhpcy5zdGF0ZS5zZWxlY3RlZERhdGUsXG5cdFx0XHRcdFx0b25DaGFuZ2U6IHRoaXMuZGF0ZUNoYW5nZWQsXG5cdFx0XHRcdFx0Y2xhc3NOYW1lOlwiaW5wdXQtbGdcIixcblx0XHRcdFx0XHRrZXk6XCJvdGhlcjNcIlxuXHRcdFx0XHR9XX1cblx0XHRcdC8+XG5cdFx0XHQ8QWNvcmRpYW4gaWQ9e3RoaXMuYWNvcmRpYW5JZH0+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L0Fjb3JkaWFuPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHRyZXR1cm4oPGRpdj57dGhpcy5jcmV3c0Fjb3JkaW9uKCl9PC9kaXY+KTtcblx0fVxufVxuXG5cbmNvbnN0IGFwcD0gJCgnI2FwcCcpWzBdO1xuKGZ1bmN0aW9uKCl7XG5cdGZyYXBwZS5yZWFkeShmdW5jdGlvbigpe1xuXHRcdFJlYWN0RE9NLnJlbmRlciggXG5cdFx0PENyZXdEYXNoIC8+LGFwcCApO1xuXHR9KVxuXG59KSgpO1xuXG4vKlxuXHRcdFx0XHRcdDxEYXlzV29ya29yZGVycyBcblx0XHRcdFx0XHRcdGRhdGU9e3RoaXMucHJvcHMuZGF0ZX1cblx0XHRcdFx0XHRcdGNyZXc9e2l0ZW0ubmFtZX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdCovIl19
