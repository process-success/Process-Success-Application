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
				{ className: 'text-right' },
				React.createElement(
					'button',
					{
						className: 'btn btn-default btn-xs dropdown-toggle create-issue',
						type: 'button',
						'data-toggle': 'dropdown',
						'aria-haspopup': 'true',
						'aria-expanded': 'false' },
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
					id: "create-wo-" + this.props.crew.replace(" ", "-")
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
			mainClass = mainClass + " panel workorder";
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
								{ className: 'panel-title col-xs-10' },
								React.createElement(
									'a',
									{ className: 'float-left', href: this.props.location_route },
									this.props.location
								)
							),
							React.createElement(
								'div',
								{ className: 'col-xs-2 create-issue-header-button-container' },
								React.createElement(_createIssue2.default, {
									issues: this.state.issues,
									activateModalNew: this.activateModalNew,
									activateModalEdit: this.activateModalEdit,
									workorder: this.props.workorder

								})
							)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c193b3Jrb3JkZXJzL2NyZWF0ZUlzc3VlLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy9kYXlzX3dvcmtvcmRlcnMvZGF5c1dvcmtvcmRlcnMuanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL2RheXNfd29ya29yZGVycy90YXNrQ2hlY2suanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL2RheXNfd29ya29yZGVycy93b3Jrb3JkZXJUYXNrLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9hY29yZGlhbi5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdXRpbHMvYWNvcmRpYW5Db250ZW50LmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9mb3Jtcy5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdXRpbHMvbW9kYWwuanN4IiwicHJvY2Vzc19zdWNjZXNzL3d3dy9kYXNoYm9hcmQvZGFzaC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOztJQUdxQixXOzs7QUFDcEIsc0JBQVksS0FBWixFQUFrQjtBQUFBOztBQUFBLHdIQUNYLEtBRFc7O0FBRWpCLFFBQUssYUFBTCxHQUFtQixNQUFLLGFBQUwsQ0FBbUIsSUFBbkIsT0FBbkI7QUFDQSxRQUFLLGNBQUwsR0FBb0IsTUFBSyxjQUFMLENBQW9CLElBQXBCLE9BQXBCO0FBSGlCO0FBSWpCOzs7OzRCQUNRO0FBQ1IsS0FBRSxZQUFZO0FBQ1osTUFBRSx5QkFBRixFQUE2QixPQUE3QjtBQUNELElB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QUhiO0FBSUMsY0FBUyxVQUFRLENBQVQsR0FBWSxJQUFaLEdBQWlCLEtBSjFCO0FBS0MsZ0JBQVUsS0FBSztBQUxoQjtBQU9FLFVBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsS0FBbEIsQ0FQRjtBQVFDO0FBQ0MsWUFBTSxhQURQO0FBRUMsWUFBTSxLQUFLLElBRlo7QUFHQyxvQkFBYyxLQUFLLGVBQUwsQ0FBcUIsS0FBckI7QUFIZjtBQVJELEtBREQ7QUFlQSxJQW5CbUIsQ0FtQmxCLElBbkJrQixDQW1CYixJQW5CYSxDQUFwQjtBQW9CQSxVQUFRO0FBQUE7QUFBQTtBQUNQO0FBQ0MsZ0JBQVUsb0JBRFg7QUFFQyxXQUFLLFlBRk47QUFHQyxhQUFRLENBQUM7QUFDUixhQUFNLE1BREU7QUFFUixhQUFNLEtBQUssS0FBTCxDQUFXLFlBRlQ7QUFHUixnQkFBVSxLQUFLLFdBSFA7QUFJUixpQkFBVSxVQUpGO0FBS1IsV0FBSTtBQUxJLE1BQUQ7QUFIVCxNQURPO0FBWVA7QUFBQTtBQUFBLE9BQVUsSUFBSSxLQUFLLFVBQW5CO0FBQ0U7QUFERjtBQVpPLElBQVI7QUFpQkE7OzsyQkFDTztBQUNQLFVBQU87QUFBQTtBQUFBO0FBQU0sU0FBSyxhQUFMO0FBQU4sSUFBUDtBQUNBOzs7O0VBMUdvQyxNQUFNLFM7O2tCQUF2QixROzs7QUE4R3JCLElBQU0sTUFBSyxFQUFFLE1BQUYsRUFBVSxDQUFWLENBQVg7QUFDQSxDQUFDLFlBQVU7QUFDVixRQUFPLEtBQVAsQ0FBYSxZQUFVO0FBQ3RCLFdBQVMsTUFBVCxDQUNBLG9CQUFDLFFBQUQsT0FEQSxFQUNhLEdBRGI7QUFFQSxFQUhEO0FBS0EsQ0FORDs7QUFRQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDcmVhdGVJc3N1ZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKVxuXHRcdHRoaXMubW9kYWxOZXdJc3N1ZT10aGlzLm1vZGFsTmV3SXNzdWUuYmluZCh0aGlzKTtcblx0XHR0aGlzLm1vZGFsRWRpdElzc3VlPXRoaXMubW9kYWxFZGl0SXNzdWUuYmluZCh0aGlzKTtcblx0fVxuXHR0b29sVGlwKCl7XG5cdFx0JChmdW5jdGlvbiAoKSB7XG5cdFx0IFx0JCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoKTtcblx0XHR9KVxuXHR9XG5cdG1vZGFsTmV3SXNzdWUoZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMucHJvcHMuYWN0aXZhdGVNb2RhbE5ldygpO1xuXHR9XG5cdG1vZGFsRWRpdElzc3VlKGl0ZW0sZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGNvbnNvbGUubG9nKGl0ZW0pXG5cdFx0dGhpcy5wcm9wcy5hY3RpdmF0ZU1vZGFsRWRpdChpdGVtKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHRcdFx0XHQvLyBcdFx0ZGF0YS10b2dnbGU9XCJtb2RhbFwiIFxuXHRcdFx0XHRcdC8vIGRhdGEtdGFyZ2V0PXtcIiNcIit0aGlzLnBvcFVwSWR9XG5cdFx0XHRcdCAvLyBcdGFyaWEtbGFiZWw9XCJDcmVhdGUgSXNzdWVcIiBcblx0XHRcdFx0IC8vIFx0ZGF0YS10b2dnbGU9XCJ0b29sdGlwXCIgXG5cdFx0XHRcdCAvLyBcdGRhdGEtcGxhY2VtZW50PVwidG9wXCIgXG5cdFx0XHRcdCAvLyBcdHRpdGxlPVwiSXNzdWVcIiBcblx0XHRcdFx0XHQvLyByZWY9e3RoaXMudG9vbFRpcH1cdFx0XHRcdFx0Ly8gb25DbGljaz17IHRoaXMucG9wVXB9ID5cblx0XHR2YXIgZHJvcGRvd25JdGVtcz1bXTtcblx0XHRpZih0aGlzLnByb3BzLmlzc3VlcyE9PW51bGwpe1xuXHRcdFx0dGhpcy5wcm9wcy5pc3N1ZXMubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblx0XHRcdFx0aWYgKGl0ZW0uc3RhdHVzID09J1N1Ym1pdHRlZCcgfHwgaXRlbS5zdGF0dXM9PSdBc3NpZ25lZCcpe1xuXHRcdFx0XHRcdGRyb3Bkb3duSXRlbXMucHVzaChcblx0XHRcdFx0XHRcdDxsaSBrZXk9e2luZGV4fT4gXG5cdFx0XHRcdFx0XHRcdDxhIGNsYXNzTmFtZT1cImRyb3Bkb3duLWl0ZW1cIiBcblx0XHRcdFx0XHRcdFx0XHRocmVmPVwiI1wiIFxuXHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMubW9kYWxFZGl0SXNzdWUuYmluZCh0aGlzLGl0ZW0pfSBcblx0XHRcdFx0XHRcdFx0PntpdGVtLnRpdGxlfTwvYT5cblx0XHRcdFx0XHRcdDwvbGk+KTtcblx0XHRcdFx0fVxuXHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHR9XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXJpZ2h0XCI+XG5cblx0XHRcdFx0PGJ1dHRvblxuXHRcdFx0XHRcdGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdCBidG4teHMgZHJvcGRvd24tdG9nZ2xlIGNyZWF0ZS1pc3N1ZVwiIFxuXHRcdFx0XHRcdHR5cGU9XCJidXR0b25cIiBcblx0XHRcdFx0XHRkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgXG5cdFx0XHRcdFx0YXJpYS1oYXNwb3B1cD1cInRydWVcIiBcblx0XHRcdFx0XHRhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIiA+XG5cblx0XHRcdFx0IFx0PHNwYW4gY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1leGNsYW1hdGlvbi1zaWduXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxuXHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0PHVsIGNsYXNzTmFtZT1cImRyb3Bkb3duLW1lbnVcIj5cblx0XHRcdFx0ICAgIDxsaSBjbGFzc05hbWU9XCJkcm9wZG93bi1oZWFkZXJcIj5Jc3N1ZXM8L2xpPlxuXHRcdFx0XHQgICAge2Ryb3Bkb3duSXRlbXN9XG5cdFx0XHRcdCAgICA8bGkgcm9sZT1cInNlcGFyYXRvclwiIGNsYXNzTmFtZT1cImRpdmlkZXJcIj48L2xpPlxuXHRcdFx0XHQgICAgPGxpPjxhIFxuXHRcdFx0XHQgICAgXHRjbGFzc05hbWU9XCJkcm9wZG93bi1pdGVtXCJcblx0XHRcdFx0ICAgIFx0b25DbGljaz17dGhpcy5tb2RhbE5ld0lzc3VlfVxuXHRcdFx0XHQgICAgXHRocmVmPVwiI1wiID4gKyBOZXcgSXNzdWU8L2E+PC9saT5cblx0XHRcdFx0PC91bD5cblxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5cbiIsIi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuaW1wb3J0IFdvcmtvcmRlclRhc2sgZnJvbSAnLi93b3Jrb3JkZXJUYXNrJztcblxuaW1wb3J0IEZvcm0gZnJvbSAnLi4vdXRpbHMvZm9ybXMnXG5pbXBvcnQgTW9kYWwgZnJvbSAnLi4vdXRpbHMvbW9kYWwnXG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXlzV29ya29yZGVycyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR2YXIgYXJncz17fTtcblx0XHRhcmdzLmNyZXc9dGhpcy5wcm9wcy5jcmV3O1xuXHRcdGFyZ3MuZGF0ZT10aGlzLnByb3BzLmRhdGU7XG5cdFx0LyogICBEbyB0aGUgYmluZCB0aGluZyAgKi9cblx0XHR0aGlzLm9uVGFza0NoZWNrZWQ9dGhpcy5vblRhc2tDaGVja2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5vblN0YXR1c0NoYW5nZWQ9dGhpcy5vblN0YXR1c0NoYW5nZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLndvcmtPcmRlckNoYW5nZWQ9dGhpcy53b3JrT3JkZXJDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5zb2NrZXRVcGRhdGU9dGhpcy5zb2NrZXRVcGRhdGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM9dGhpcy5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzLmJpbmQodGhpcyk7XG5cdFx0Ly90aGlzLndvcmtvcmRlck9iaj10aGlzLm9uU3RhdHVzQ2hhbmdlZC5iaW5kKHRoaXMpO1xuXHRcdC8qICAgICAgICAgIGVuZCAgICAgICAgICAqL1xuXG5cdFx0dGhpcy5zdGF0ZT17d29ya29yZGVyczpbXX07XG5cblx0XHR2YXIgYXJncz17fTtcblx0XHRhcmdzLmNyZXc9dGhpcy5wcm9wcy5jcmV3O1xuXHRcdGFyZ3MuZGF0ZT10aGlzLnByb3BzLmRhdGU7XG5cdFx0dGhpcy53b3Jrb3JkZXJUb29sID0gbmV3IHBzLmFwaVRvb2woYXJncyxwcy5hcGlTZXR1cC53b3JrT3JkZXJzLHRoaXMud29ya09yZGVyQ2hhbmdlZCk7XG5cdFx0aWYgKHRoaXMud29ya29yZGVyVG9vbC5pdGVtcz09PXVuZGVmaW5lZCB8fHRoaXMud29ya29yZGVyVG9vbC5pdGVtcz09PSAwIHx8dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zPT09bnVsbCApe1xuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5zdGF0ZS53b3Jrb3JkZXJzPXRoaXMud29ya29yZGVyVG9vbC5pdGVtcztcblx0XHR9XG5cblx0fVxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XG5cblx0XHRpZihuZXh0UHJvcHMuY3JldyE9dGhpcy5wcm9wcy5jcmV3IHx8IG5leHRQcm9wcy5kYXRlIT10aGlzLnByb3BzLmRhdGUgKXtcblxuXHRcdFx0dmFyIGFyZ3M9e307XG5cdFx0XHRhcmdzLmNyZXc9bmV4dFByb3BzLmNyZXc7XG5cdFx0XHRhcmdzLmRhdGU9bmV4dFByb3BzLmRhdGU7XG5cdFx0XHR0aGlzLndvcmtvcmRlclRvb2wgPSBuZXcgcHMuYXBpVG9vbChhcmdzLHBzLmFwaVNldHVwLndvcmtPcmRlcnMsdGhpcy53b3JrT3JkZXJDaGFuZ2VkKTtcblx0XHRcdGlmICh0aGlzLndvcmtvcmRlclRvb2wuaXRlbXM9PT11bmRlZmluZWQgfHx0aGlzLndvcmtvcmRlclRvb2wuaXRlbXM9PT0gMCB8fHRoaXMud29ya29yZGVyVG9vbC5pdGVtcz09PW51bGwgKXtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7d29ya29yZGVyczpbXX0pO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3dvcmtvcmRlcnM6dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zfSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0c29ja2V0VXBkYXRlKCl7XG5cblx0fVxuXHRvblRhc2tDaGVja2VkKHdvX2luZGV4LGluZGV4LGNoZWNrKXtcblx0XHR0aGlzLndvcmtvcmRlclRvb2wuaXRlbXNbd29faW5kZXhdLnN1YnRhc2tbaW5kZXhdLnN0YXR1cz1jaGVjaz8wOjE7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7d29ya29yZGVyczp0aGlzLndvcmtvcmRlclRvb2wuaXRlbXN9KTtcblx0XHR0aGlzLndvcmtvcmRlclRvb2wudXBkYXRlKHRoaXMud29ya29yZGVyVG9vbC5pdGVtc1t3b19pbmRleF0pO1xuXHRcdHZhciBjaGVja2VkVGV4dD1jaGVjaz9cInVuY2hlY2tlZC5cIjpcImNoZWNrZWQuXCJcblx0XHQvL3BzLnN1Y2Nlc3NBbGVydCh0aGlzLndvcmtvcmRlclRvb2wuaXRlbXNbd29faW5kZXhdLnN1YnRhc2tbaW5kZXhdLnRhc2sgK1wiIFwiKyBjaGVja2VkVGV4dCApO1xuXHR9XG5cdG9uU3RhdHVzQ2hhbmdlZChzdGF0dXMsIGluZGV4KXtcblx0XHR0aGlzLndvcmtvcmRlclRvb2wuaXRlbXNbaW5kZXhdLnN0YXR1cz1zdGF0dXM7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7d29ya29yZGVyczp0aGlzLndvcmtvcmRlclRvb2wuaXRlbXN9KTtcblx0XHR0aGlzLndvcmtvcmRlclRvb2wudXBkYXRlKHRoaXMud29ya29yZGVyVG9vbC5pdGVtc1tpbmRleF0pO1xuXHRcdGlmKHN0YXR1cz09XCJDb21wbGV0ZVwiKXtcblx0XHRcdHBzLnN1Y2Nlc3NBbGVydChcIldvcmtvcmRlciBjb21wbGV0ZWQhXCIpO1xuXHRcdH1cblx0fVxuXHR3b3JrT3JkZXJDaGFuZ2VkKCl7XG5cdFx0aWYgKHRoaXMud29ya29yZGVyVG9vbC5pdGVtcyE9PW51bGwpe1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7d29ya29yZGVyczp0aGlzLndvcmtvcmRlclRvb2wuaXRlbXN9KTtcblx0XHRcdGlmKHRoaXMucHJvcHMuc3RhdHVzVXBkYXRlICE9PSB1bmRlZmluZWQpe1xuXHRcdFx0XHR0aGlzLnByb3BzLnN0YXR1c1VwZGF0ZSh0aGlzLndvcmtvcmRlclRvb2wuaXRlbXMpO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7d29ya29yZGVyczpbXX0pO1xuXHRcdH1cblxuXHR9XG5cdHdvcmtvcmRlck9iaihpdGVtLGluZGV4KXtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8V29ya29yZGVyVGFzayBcblx0XHRcdFx0a2V5PXtpbmRleH0gXG5cdFx0XHRcdGluZGV4PXtpbmRleH0gXG5cdFx0XHRcdGxvY2F0aW9uX3JvdXRlPXtpdGVtLmxvY2F0aW9uX3JvdXRlfVxuXHRcdFx0XHRsb2NhdGlvbj17aXRlbS5sb2NhdGlvbn1cblx0XHRcdFx0dGFza3M9e2l0ZW0uc3VidGFza31cblx0XHRcdFx0c3RhdHVzPXtpdGVtLnN0YXR1c31cblx0XHRcdFx0dHlwZT17aXRlbS50eXBlfVxuXHRcdFx0XHR3b3Jrb3JkZXI9e2l0ZW0ubmFtZX1cblx0XHRcdFx0b25UYXNrQ2hlY2tlZD17dGhpcy5vblRhc2tDaGVja2VkfVxuXHRcdFx0XHRvblN0YXR1c0NoYW5nZWQ9e3RoaXMub25TdGF0dXNDaGFuZ2VkfVxuXHRcdFx0XHRyb3V0ZT17aXRlbS5yb3V0ZX1cblx0XHRcdC8+XG5cdFx0KTtcblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gICAgICAgIFJlbmRlclxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdHJlbmRlcigpe1xuXHRcdGlmICh0aGlzLnN0YXRlLndvcmtvcmRlcnM9PT0wfHx0aGlzLnN0YXRlLndvcmtvcmRlcnM9PT11bmRlZmluZWQpe1xuXHRcdFx0cmV0dXJuICg8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+PGgzPk5vIFdvcmtvcmRlcnM8L2gzPjwvZGl2Pik7XG5cdFx0fVxuXHRcdHZhciB0b2RvPVtdO1xuXHRcdHZhciBjb21wbGV0ZT1bXTtcblx0XHR0aGlzLnN0YXRlLndvcmtvcmRlcnMubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblx0XHRcdGlmIChpdGVtLnN0YXR1cyE9J0NvbXBsZXRlJyYmaXRlbS5zdGF0dXMhPSdJbmNvbXBsZXRlJyl7XG5cdFx0XHRcdHRvZG8ucHVzaCh0aGlzLndvcmtvcmRlck9iaihpdGVtLGluZGV4KSk7XG5cdFx0XHRcdGlmKHRvZG8ubGVuZ3RoJTM9PT0wKXt0b2RvLnB1c2goPGRpdiBjbGFzc05hbWU9J2NsZWFyZml4Jz48L2Rpdj4pfVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGNvbXBsZXRlLnB1c2godGhpcy53b3Jrb3JkZXJPYmooaXRlbSxpbmRleCkpO1xuXHRcdFx0XHRpZihjb21wbGV0ZS5sZW5ndGglMz09PTApe2NvbXBsZXRlLnB1c2goPGRpdiBjbGFzc05hbWU9J2NsZWFyZml4Jz48L2Rpdj4pfVxuXHRcdFx0fVxuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0dmFyIGNvbXBsZXRlSGVhZGVyPSg8aDM+Q29tcGxldGUgV29yayBPcmRlcnM8L2gzPik7XG5cdFx0aWYoY29tcGxldGUubGVuZ3RoPT0wKXtcblx0XHRcdGNvbXBsZXRlSGVhZGVyPVwiXCI7XG5cdFx0fVxuXG5cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIndvcmtvcmRlcl9jb250YWluZXJcIj5cblx0XHRcdFx0PGRpdj48YnIvPlxuXHRcdFx0XHRcdHt0b2RvfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPjwvZGl2PlxuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdHtjb21wbGV0ZUhlYWRlcn1cblx0XHRcdFx0XHR7Y29tcGxldGV9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNsZWFyZml4XCI+PC9kaXY+XG5cdFx0XHRcdDxici8+XG5cdFx0XHRcdDxXb3Jrb3JkZXJGb3JtTW9kYWxcblx0XHRcdFx0XHRpZD17XCJjcmVhdGUtd28tXCIrdGhpcy5wcm9wcy5jcmV3LnJlcGxhY2UoXCIgXCIsXCItXCIpfVxuXHRcdFx0XHQvPlxuXG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXG5cdH07XHRcbn1cblxuZXhwb3J0IGNsYXNzIFdvcmtvcmRlckZvcm1Nb2RhbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR2YXIgZmllbGRzPVtcdFx0XG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiYXV0b0NvbXBsZXRlXCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiB0aGlzLnNvbWVGdW5jdGlvbixcblx0XHRcdFx0bGFibGU6XCJWaW5leWFyZFwiLFxuXHRcdFx0XHRkb2N0eXBlOlwiVmluZXlhcmRcIixcblx0XHRcdFx0ZG9jdmFsdWU6XCJuYW1lXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiaW5wdXRcIixcblx0XHRcdFx0dHlwZTpcIm51bWJlclwiLFxuXHRcdFx0XHRvbkNoYW5nZTogdGhpcy5zb21lRnVuY3Rpb24sXG5cdFx0XHRcdGxhYmxlOlwiUHJpb3JpdHlcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJkYXRlXCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiB0aGlzLnNvbWVGdW5jdGlvbixcblx0XHRcdFx0bGFibGU6XCJEYXRlXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwic2VsZWN0XCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiB0aGlzLnNvbWVGdW5jdGlvbixcblx0XHRcdFx0bGFibGU6XCJUeXBlXCIsXG5cdFx0XHRcdG9wdGlvbnM6W1xuXHRcdFx0XHRcdFwiV2F0ZXJpbmdcIixcblx0XHRcdFx0XHRcIlBydW5uaW5nXCIsXG5cdFx0XHRcdFx0XCJSZXBhaXJcIixcblx0XHRcdFx0XHRcIlNwcmF5aW5nXCJcblx0XHRcdFx0XVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJhdXRvQ29tcGxldGVcIixcblx0XHRcdFx0b25DaGFuZ2U6IHRoaXMuc29tZUZ1bmN0aW9uLFxuXHRcdFx0XHRsYWJsZTpcIkNyZXdcIixcblx0XHRcdFx0ZG9jdHlwZTpcIkNyZXdcIixcblx0XHRcdFx0ZG9jdmFsdWU6XCJuYW1lXCIsXG5cdFx0XHRcdGRvY2xhYmxlOlwiY3Jld19sZWFkX2Z1bGxfbmFtZVwiXG5cdFx0XHR9XG5cblx0XHRdXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XHRcdFx0XHRcblx0XHRcdFx0PGEgXG5cdFx0XHRcdFx0aHJlZj1cIiNcIiBcblx0XHRcdFx0XHRjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIlxuXHRcdFx0XHRcdG9uQ2xpY2s9e2Z1bmN0aW9uKCl7JCgnIycrIHRoaXMucHJvcHMuaWQpLm1vZGFsKCl9LmJpbmQodGhpcyl9XG5cdFx0XHRcdFx0PlxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tcGx1c1wiPjwvc3Bhbj4gTmV3IFdvcmsgT3JkZXI8L2E+XG5cdFx0XHRcdDxNb2RhbCBcblx0XHRcdFx0XHRpZD17dGhpcy5wcm9wcy5pZH0gXG5cdFx0XHRcdFx0c3VibWl0VGV4dD1cIlN1Ym1pdFwiIFxuXHRcdFx0XHRcdHRpdGxlPVwiQ3JlYXRlIE5ldyBXb3Jrb3JkZXJcIlxuXHRcdFx0XHRcdHN1Ym1pdD17dGhpcy5vblN0YXR1c0NoYW5nZWR9PlxuXG5cdFx0XHRcdFx0PEZvcm1cblx0XHRcdFx0XHRcdGlkPVwiQ3JlYXRlV29ya29yZGVyRm9ybVwiXG5cdFx0XHRcdFx0XHR0eXBlPVwiaG9yaXpvbnRhbFwiXG5cdFx0XHRcdFx0XHRmaWVsZHM9e2ZpZWxkc31cblx0XHRcdFx0XHQvPlxuXG5cdFx0XHRcdDwvTW9kYWw+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2tDaGVjayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHRjb25zb2xlLmxvZyh0aGlzLnByb3BzLmNoZWNrZWQpO1xuXHRcdHRoaXMudGFza0NoZWNrZWQgPSB0aGlzLnRhc2tDaGVja2VkLmJpbmQodGhpcyk7XG5cdH1cblx0dGFza0NoZWNrZWQoZSl7XG5cdFx0dGhpcy5wcm9wcy50YXNrQ2hlY2tlZCh0aGlzLnByb3BzLmluZGV4LCB0aGlzLnByb3BzLmNoZWNrZWQpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IGNoZWNrZWQgPSB0aGlzLnByb3BzLmNoZWNrZWQgPyBcImxpbmUtdGhyb3VnaFwiIDogXCJcIjtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9e2NoZWNrZWR9PlxuXHRcdFx0XHRcdDxpbnB1dCBvbkNoYW5nZT17dGhpcy50YXNrQ2hlY2tlZH0gdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD17dGhpcy5wcm9wcy5jaGVja2VkfSAvPlxuXHRcdFx0XHRcdHt0aGlzLnByb3BzLmxhYmxlfVxuXHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVx0XG59IiwiXG4vKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmltcG9ydCBUYXNrQ2hlY2sgZnJvbSAnLi90YXNrQ2hlY2snXG5pbXBvcnQgQ3JlYXRlSXNzdWUgZnJvbSAnLi9jcmVhdGVJc3N1ZSdcbmltcG9ydCBNb2RhbCBmcm9tICcuLi91dGlscy9tb2RhbCdcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXb3Jrb3JkZXJUYXNrIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuc3RhdGU9e1xuXHRcdFx0aXNzdWVzOltdLFxuXHRcdFx0dGl0bGU6JycsXG5cdFx0XHRtb2RhbDonbmV3Jyxcblx0XHRcdG1vZGFsUHJpb3JpdHk6J2xvdycsXG5cdFx0XHRtb2RhbFRpdGxlOicnLFxuXHRcdFx0bW9kYWxEZXNjcmlwdGlvbjonJyxcblx0XHRcdG1vZGFsTmFtZTonJ1xuXHRcdH07XG5cdFx0dGhpcy50YXNrQ2hlY2tlZD10aGlzLnRhc2tDaGVja2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5zdGF0dXNDaGFuZ2U9dGhpcy5zdGF0dXNDaGFuZ2UuYmluZCh0aGlzKTtcblx0XHR0aGlzLmFjdGl2YXRlTW9kYWxOZXc9dGhpcy5hY3RpdmF0ZU1vZGFsTmV3LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5hY3RpdmF0ZU1vZGFsRWRpdD10aGlzLmFjdGl2YXRlTW9kYWxFZGl0LmJpbmQodGhpcyk7XG5cdFx0XG5cdFx0dGhpcy5zdWJtaXRJc3N1ZT10aGlzLnN1Ym1pdElzc3VlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5tb2RhbFRpdGxlQ2hhbmdlPXRoaXMubW9kYWxUaXRsZUNoYW5nZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMubW9kYWxEZXNjcmlwdGlvbkNoYW5nZT10aGlzLm1vZGFsRGVzY3JpcHRpb25DaGFuZ2UuYmluZCh0aGlzKTtcblx0XHR0aGlzLm1vZGFsUHJpb3JpdHlDaGFuZ2U9dGhpcy5tb2RhbFByaW9yaXR5Q2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5pc3N1ZUNoYW5nZWQ9dGhpcy5pc3N1ZUNoYW5nZWQuYmluZCh0aGlzKTtcblxuXG5cdFx0dGhpcy5tb2RhbElkPVwiaXNzdWUtZm9ybS1cIit0aGlzLnByb3BzLndvcmtvcmRlcjtcblxuXHRcdFxuXHRcdHRoaXMuaXNzdWVUb29sID0gbmV3IHBzLmFwaVRvb2woe1wid29ya19vcmRlclwiOnRoaXMucHJvcHMud29ya29yZGVyfSx7ZG9jdHlwZTonSXNzdWUnfSx0aGlzLmlzc3VlQ2hhbmdlZCk7XG5cblxuXHR9XG5cdHRhc2tDaGVja2VkKGUpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe3RpdGxlOlwiQ0hFQ0tFRFwifSk7XG5cdH1cblx0aXNDaGVja2VkKHZhbHVlKXtcbiAgICBcdHJldHVybiAoKHZhbHVlPT09dGhpcy5zdGF0ZS5zZWxlY3RlZCkgPydjaGVja2VkIGxpbmUtdGhyb3VnaCc6J2RlZmF1bHQnKTtcbiAgXHR9XG4gIFx0dGFza0NoZWNrZWQoaW5kZXgsY2hlY2tlZCl7XG4gIFx0XHR2YXIgd29faW5kZXg9dGhpcy5wcm9wcy5pbmRleDtcbiAgXHRcdHRoaXMucHJvcHMub25UYXNrQ2hlY2tlZCh3b19pbmRleCxpbmRleCxjaGVja2VkKTtcbiAgXHR9XG4gIFx0c3RhdHVzQ2hhbmdlKGUpe1xuICBcdFx0dGhpcy5wcm9wcy5vblN0YXR1c0NoYW5nZWQoZS50YXJnZXQudmFsdWUsdGhpcy5wcm9wcy5pbmRleCk7XG5cbiAgXHR9XG4gIFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRcdFx0SVNTVUUgRlVOQ1RJT05TXG4gIFx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICBcdG1vZGFsVGl0bGVDaGFuZ2UoZSl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7bW9kYWxUaXRsZTplLnRhcmdldC52YWx1ZX0pO1xuICBcdH1cblx0bW9kYWxQcmlvcml0eUNoYW5nZShlKXtcblx0XHR0aGlzLnNldFN0YXRlKHttb2RhbFByaW9yaXR5OmUudGFyZ2V0LnZhbHVlfSk7XG5cdH1cblx0bW9kYWxEZXNjcmlwdGlvbkNoYW5nZShlKXtcblx0XHR0aGlzLnNldFN0YXRlKHttb2RhbERlc2NyaXB0aW9uOmUudGFyZ2V0LnZhbHVlfSk7XG5cdH1cbiAgXHRhY3RpdmF0ZU1vZGFsTmV3KCl7XG4gIFx0XHR0aGlzLnNldFN0YXRlKHttb2RhbDpcIm5ld1wifSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7bW9kYWxQcmlvcml0eTonJ30pO1xuXHRcdHRoaXMuc2V0U3RhdGUoe21vZGFsRGVzY3JpcHRpb246Jyd9KTtcblx0XHR0aGlzLnNldFN0YXRlKHttb2RhbFRpdGxlOicnfSk7XG4gIFx0XHQkKCcjJyt0aGlzLm1vZGFsSWQpLm1vZGFsKCk7XG4gIFx0fVxuICBcdGFjdGl2YXRlTW9kYWxFZGl0KGlzc3VlKXtcblx0XHR0aGlzLnNldFN0YXRlKHttb2RhbDppc3N1ZX0pO1xuXHRcdHRoaXMuc2V0U3RhdGUoe21vZGFsUHJpb3JpdHk6aXNzdWUucHJpb3JpdHl9KTtcblx0XHR0aGlzLnNldFN0YXRlKHttb2RhbERlc2NyaXB0aW9uOmlzc3VlLmlzc3VlfSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7bW9kYWxUaXRsZTppc3N1ZS50aXRsZX0pO1xuXHRcdHRoaXMuc2V0U3RhdGUoe21vZGFsTmFtZTppc3N1ZS5uYW1lfSk7XG4gIFx0XHQkKCcjJyt0aGlzLm1vZGFsSWQpLm1vZGFsKCk7XG4gIFx0fVxuICBcdGlzc3VlQ2hhbmdlZCgpe1xuXG5cdFx0dGhpcy5zZXRTdGF0ZSh7aXNzdWVzOnRoaXMuaXNzdWVUb29sLml0ZW1zfSk7XG5cdH1cbiAgXHRzdWJtaXRJc3N1ZShlKXtcbiAgXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdHZhciBuZXdJdGVtPXtcblx0XHRcdHRpdGxlOnRoaXMuc3RhdGUubW9kYWxUaXRsZSxcblx0XHRcdGlzc3VlOnRoaXMuc3RhdGUubW9kYWxEZXNjcmlwdGlvbixcblx0XHRcdHByaW9yaXR5OnRoaXMuc3RhdGUubW9kYWxQcmlvcml0eSxcblx0XHRcdHZpbmV5YXJkOnRoaXMucHJvcHMubG9jYXRpb24sXG5cdFx0XHR3b3JrX29yZGVyOnRoaXMucHJvcHMud29ya29yZGVyXG5cdFx0fVxuXHRcdGlmKHRoaXMuc3RhdGUubW9kYWw9PVwibmV3XCIpe1xuXHRcdFx0dGhpcy5pc3N1ZVRvb2wuY3JlYXRlKG5ld0l0ZW0sZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdHBzLnN1Y2Nlc3NBbGVydChcIklzc3VlIFwiICtpdGVtLnRpdGxlKyBcIiBjcmVhdGVkLlwiKVxuXHRcdFx0fSk7XG5cdFx0fWVsc2V7XG5cdFx0XHRuZXdJdGVtLm5hbWU9dGhpcy5zdGF0ZS5tb2RhbE5hbWU7XG5cdFx0XHR0aGlzLmlzc3VlVG9vbC51cGRhdGUobmV3SXRlbSxmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0cHMuc3VjY2Vzc0FsZXJ0KFwiSXNzdWUgXCIgK2l0ZW0udGl0bGUrXCIgdXBkYXRlZC5cIilcblx0XHRcdH0pO1xuXHRcdH1cblx0XHQvL2Nsb3NlIG1vZGFsXG5cdFx0JCgnIycrdGhpcy5tb2RhbElkKS5tb2RhbCgndG9nZ2xlJyk7XG5cdH1cblxuXG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHRpdGxlPVwid2VsY29tZVwiO1xuXHRcdHZhciBtYWluQ2xhc3M9e1xuXHRcdFx0J0NvbXBsZXRlJzoncGFuZWwtc3VjY2VzcycsXG5cdFx0XHQnSW5jb21wbGV0ZSc6J3BhbmVsLWRhbmdlcicsXG5cdFx0XHQnUGVuZGluZyc6J3BhbmVsLWRlZmF1bHQnLFxuXHRcdFx0J1N0YXJ0ZWQnOidwYW5lbC13YXJuaW5nJ1xuXHRcdH1bdGhpcy5wcm9wcy5zdGF0dXNdO1xuXHRcdG1haW5DbGFzcyA9IG1haW5DbGFzcyArIFwiIHBhbmVsIHdvcmtvcmRlclwiO1xuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPSdjb2wtbWQtNCBjb2wtc20tNCc+XG5cdFx0XHRcdDxNb2RhbCBcblx0XHRcdFx0XHRpZD17dGhpcy5tb2RhbElkfSBcblx0XHRcdFx0XHRzdWJtaXRUZXh0PVwiU3VibWl0XCIgXG5cdFx0XHRcdFx0dGl0bGU9XCJDcmVhdGUgSXNzdWUgRm9yXCJcblx0XHRcdFx0XHRzdWJtaXQ9e3RoaXMuc3VibWl0SXNzdWV9PlxuXG5cdFx0XHRcdFx0XHQ8ZmllbGRzZXQ+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdFx0XHRcdFx0XHRcdDxsYWJlbD5Jc3N1ZSBUaXRsZTwvbGFiZWw+XG5cdFx0XHRcdFx0XHRcdFx0PGlucHV0IFxuXHRcdFx0XHRcdFx0XHRcdFx0dHlwZT1cInRleHRcIiBcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIFxuXHRcdFx0XHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9XCJJc3N1ZSBUaXRsZVwiIFxuXHRcdFx0XHRcdFx0XHRcdFx0dmFsdWU9e3RoaXMuc3RhdGUubW9kYWxUaXRsZX0gXG5cdFx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5tb2RhbFRpdGxlQ2hhbmdlfVxuXHRcdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHRcdFx0XHRcdFx0XHQ8bGFiZWw+UHJpb3JpdHk8L2xhYmVsPlxuXHRcdFx0XHRcdFx0XHRcdDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdmFsdWU9e3RoaXMuc3RhdGUubW9kYWxQcmlvcml0eX0gb25DaGFuZ2U9e3RoaXMubW9kYWxQcmlvcml0eUNoYW5nZS5iaW5kKHRoaXMpfT5cblx0XHRcdFx0XHRcdFx0XHRcdDxvcHRpb24+TG93PC9vcHRpb24+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8b3B0aW9uPk1lZGl1bTwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0XHRcdFx0PG9wdGlvbj5IaWdoPC9vcHRpb24+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8b3B0aW9uPkNyaXRpY2FsPC9vcHRpb24+XG5cdFx0XHRcdFx0XHRcdFx0PC9zZWxlY3Q+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHRcdFx0XHRcdFx0ICBcdDxsYWJlbD5Jc3N1ZSBEZXRhaWxzOjwvbGFiZWw+XG5cdFx0XHRcdFx0XHRcdCAgXHQ8dGV4dGFyZWEgXG5cdFx0XHRcdFx0XHRcdCAgXHRcdGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIFxuXHRcdFx0XHRcdFx0XHQgIFx0XHRyb3dzPVwiM1wiIFxuXHRcdFx0XHRcdFx0XHQgIFx0XHRwbGFjZWhvbGRlcj1cIklzc3VlIERldGFpbHNcIiBcblx0XHRcdFx0XHRcdFx0ICBcdFx0dmFsdWU9e3RoaXMuc3RhdGUubW9kYWxEZXNjcmlwdGlvbn1cblx0XHRcdFx0XHRcdFx0ICBcdFx0b25DaGFuZ2U9e3RoaXMubW9kYWxEZXNjcmlwdGlvbkNoYW5nZX1cblx0XHRcdFx0XHRcdFx0ICBcdD48L3RleHRhcmVhPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDwvZmllbGRzZXQ+XG5cdFx0XHRcdDwvTW9kYWw+XG5cdFx0XHQ8ZGl2IGlkPVwiXCIgY2xhc3NOYW1lPXttYWluQ2xhc3N9PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWhlYWRpbmdcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuXHRcdFx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInBhbmVsLXRpdGxlIGNvbC14cy0xMFwiPlxuXHRcdFx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9XCJmbG9hdC1sZWZ0XCIgaHJlZj17dGhpcy5wcm9wcy5sb2NhdGlvbl9yb3V0ZX0+e3RoaXMucHJvcHMubG9jYXRpb259PC9hPlxuXHRcdFx0XHRcdFx0PC9oMz5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTIgY3JlYXRlLWlzc3VlLWhlYWRlci1idXR0b24tY29udGFpbmVyXCIgPlxuXG5cblx0XHRcdFx0XHRcdFx0PENyZWF0ZUlzc3VlXG5cdFx0XHRcdFx0XHRcdFx0aXNzdWVzPXt0aGlzLnN0YXRlLmlzc3Vlc31cblx0XHRcdFx0XHRcdFx0XHRhY3RpdmF0ZU1vZGFsTmV3PXt0aGlzLmFjdGl2YXRlTW9kYWxOZXd9XG5cdFx0XHRcdFx0XHRcdFx0YWN0aXZhdGVNb2RhbEVkaXQ9e3RoaXMuYWN0aXZhdGVNb2RhbEVkaXR9XG5cdFx0XHRcdFx0XHRcdFx0d29ya29yZGVyPXt0aGlzLnByb3BzLndvcmtvcmRlcn1cblxuXHRcdFx0XHRcdFx0XHQvPlxuXG5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XG5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtYm9keVwiPlxuXHRcdFx0XHRcdDxkaXY+e3RoaXMucHJvcHMudHlwZX08L2Rpdj5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbFwiPlN0YXR1czwvbGFiZWw+XG5cdFx0XHRcdFx0PHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgc3RhdHVzXCIgdmFsdWU9e3RoaXMucHJvcHMuc3RhdHVzfSBvbkNoYW5nZT17dGhpcy5zdGF0dXNDaGFuZ2V9PlxuXHRcdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIlBlbmRpbmdcIj5QZW5kaW5nPC9vcHRpb24+XG5cdFx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPVwiU3RhcnRlZFwiPlN0YXJ0ZWQ8L29wdGlvbj5cblx0XHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9XCJDb21wbGV0ZVwiPkNvbXBsZXRlPC9vcHRpb24+XG5cdFx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPVwiSW5jb21wbGV0ZVwiPkluY29tcGxldGU8L29wdGlvbj5cblx0XHRcdFx0XHQ8L3NlbGVjdD5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hlY2tfYm94ZXNcIj5cblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dGhpcy5wcm9wcy50YXNrcy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXHRcdFx0XHRcdFx0XHRcdHZhciBjaGVja2VkPWl0ZW0uc3RhdHVzP3RydWU6ZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuICg8VGFza0NoZWNrIGtleT17aW5kZXh9IGluZGV4PXtpbmRleH0gbGFibGU9e2l0ZW0udGFza30gY2hlY2tlZD17Y2hlY2tlZH0gdGFza0NoZWNrZWQ9e3RoaXMudGFza0NoZWNrZWR9Lz4pO1xuXHRcdFx0XHRcdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdFx0PGEgY2xhc3NOYW1lPVwiXCIgaHJlZj17dGhpcy5wcm9wcy5yb3V0ZX0+TW9yZSBJbmZvcm1hdGlvbjwvYT5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuXG5cbiIsImltcG9ydCBBY29yZGlhbkNvbnRlbnQgZnJvbSAnLi9hY29yZGlhbkNvbnRlbnQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjb3JkaWFuIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWdyb3VwXCIgaWQ9e3RoaXMucHJvcHMuaWR9IHJvbGU9XCJ0YWJsaXN0XCIgYXJpYS1tdWx0aXNlbGVjdGFibGU9XCJ0cnVlXCI+XG5cdFx0XHRcdHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWNvcmRpYW5Db250ZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMucmVuZGVySGVhZCA9IHRoaXMucmVuZGVySGVhZC5iaW5kKHRoaXMpO1xuXHR9XG5cdHJlbmRlckhlYWQoaWQpe1xuXG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYW5lbC1oZWFkaW5nXCIgXG5cdFx0XHRcdHJvbGU9XCJ0YWJcIiBcblx0XHRcdFx0b25DbGljaz17XG5cdFx0XHRcdFx0ZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGlkKTtcblx0XHRcdFx0XHRcdCQoJyMnK3RoaXMucHJvcHMucGFyZW50SWQrJyAuYWNvcmRpYW4tY29udGVudC5pbicpLm5vdCgnIycraWQpLmNvbGxhcHNlKCdoaWRlJyk7XG5cdFx0XHRcdFx0XHQkKCcjJytpZCkuY29sbGFwc2UoJ3RvZ2dsZScpO1xuXHRcdFx0XHRcdH0uYmluZCh0aGlzKVxuXHRcdFx0XHR9XG5cdFx0XHRcdD5cblx0XHRcdFx0PGg0IGNsYXNzTmFtZT1cInBhbmVsLXRpdGxlXCI+XG5cdFx0XHRcdFx0PGEgcm9sZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBkYXRhLXBhcmVudD17JyMnK3RoaXMucHJvcHMucGFyZW50SWR9IGFyaWEtZXhwYW5kZWQ9eyh0aGlzLnByb3BzLmFjdGl2ZSk/IHRydWU6ZmFsc2V9ICA+XG5cdFx0XHQgIFx0XHRcdHt0aGlzLnByb3BzLnRpdGxlfVxuXHRcdFx0XHRcdDwvYT5cblx0XHRcdFx0PC9oND5cblx0XHRcdFx0e3RoaXMucHJvcHMuZXh0cmFIZWFkfVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR2YXIgaWQgPXRoaXMucHJvcHMuaWQ7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFuZWwgcGFuZWwtZGVmYXVsdFwiPlxuXHRcdFx0XHR7dGhpcy5yZW5kZXJIZWFkKGlkKX1cblx0XHRcdFx0PGRpdiBpZD17aWR9IFxuXHRcdFx0XHRcdGNsYXNzTmFtZT17KHRoaXMucHJvcHMuYWN0aXZlKT8gXCJhY29yZGlhbi1jb250ZW50IHBhbmVsLWNvbGxhcHNlIGNvbGxhcHNlIGluXCI6XCJhY29yZGlhbi1jb250ZW50IHBhbmVsLWNvbGxhcHNlIGNvbGxhcHNlXCJ9IFxuXHRcdFx0XHRcdHJvbGU9XCJ0YWJwYW5lbFwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtYm9keVwiPlxuXHRcdFx0XHRcdFx0eyB0aGlzLnByb3BzLmNoaWxkcmVuIH1cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cbiAgXHRcdCk7XG5cdH1cbn1cbiIsIi8qIGZvcm1zICovXG4vKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnN1Ym1pdD10aGlzLnN1Ym1pdC5iaW5kKHRoaXMpO1xuXHR9XG5cdHN1Ym1pdChlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5wcm9wcy5zdWJtaXQoZSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dmFyIGZvcm09W107XG5cdFx0dmFyIGZvcm1UeXBlcz17XG5cdFx0XHRzZWxlY3RcdDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IChpdGVtLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS52YWx1ZTtcblx0XHRcdFx0dmFyIGxhYmxlID0gKGl0ZW0ubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmxhYmxlO1xuXHRcdFx0XHR2YXIgb3B0aW9ucyA9IChpdGVtLm9wdGlvbnMgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLm9wdGlvbnM7XG5cdFx0XHRcdHZhciBjbGFzc05hbWUgPSAoaXRlbS5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmNsYXNzTmFtZTtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8U2VsZWN0XG5cdFx0XHRcdFx0XHRrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9IFxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXtjbGFzc05hbWV9XG5cdFx0XHRcdFx0XHRsYWJsZT17bGFibGV9XG5cdFx0XHRcdFx0XHRvcHRpb25zPXtvcHRpb25zfVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRpbnB1dCBcdDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciB0eXBlID0gKGl0ZW0udHlwZSA9PT0gdW5kZWZpbmVkKSA/IFwidGV4dFwiOiBpdGVtLnR5cGU7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IChpdGVtLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS52YWx1ZTtcblx0XHRcdFx0dmFyIHBsYWNlaG9sZGVyID0gKGl0ZW0ucGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnBsYWNlaG9sZGVyO1xuXHRcdFx0XHR2YXIgbGFibGUgPSAoaXRlbS5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ubGFibGU7XG5cdFx0XHRcdHZhciBjbGFzc05hbWUgPSAoaXRlbS5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmNsYXNzTmFtZTtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8SW5wdXRcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH0gXG5cdFx0XHRcdFx0XHR0eXBlPXt0eXBlfVxuXHRcdFx0XHRcdFx0dmFsdWU9e3ZhbHVlfVxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuXHRcdFx0XHRcdFx0bGFibGU9e2xhYmxlfVxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXtjbGFzc05hbWV9XG5cdFx0XHRcdFx0XHRpbnB1dENoYW5nZWQ9e2Z1bmN0aW9uKGUpe3ZhciB0ZXN0O319XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGxhYmxlIFx0OiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0cmV0dXJuICggIFxuICAgIFx0XHRcdFx0PGxhYmVsIGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH0gPntpdGVtLmxhYmxlfTwvbGFiZWw+XG5cbiAgICBcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0cmFkaW9cdDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHJldHVybiAoPGRpdj48L2Rpdj4pO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0dGV4dGFyZWE6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHRyZXR1cm4gKDxkaXY+PC9kaXY+KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGhlYWRlcjogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHJldHVybig8aDMga2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fSA+e2l0ZW0ubGFibGV9PC9oMz4pXG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRkYXRlOiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0dmFyIHZhbHVlID0gKGl0ZW0udmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnZhbHVlO1xuXHRcdFx0XHR2YXIgbGFibGUgPSAoaXRlbS5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ubGFibGU7XG5cdFx0XHRcdHZhciBwbGFjZWhvbGRlciA9IChpdGVtLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5wbGFjZWhvbGRlcjtcblx0XHRcdFx0dmFyIGNsYXNzTmFtZSA9IChpdGVtLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uY2xhc3NOYW1lO1xuXHRcdFx0XHRyZXR1cm4oXG5cdFx0XHRcdFx0PERhdGVJbnB1dFxuXHRcdFx0XHRcdFx0a2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fSBcblx0XHRcdFx0XHRcdHZhbHVlPXt2YWx1ZX1cblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cblx0XHRcdFx0XHRcdGxhYmxlPXtsYWJsZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0aW5wdXRDaGFuZ2VkPXtmdW5jdGlvbihlKXtpdGVtLm9uQ2hhbmdlKGUpfX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0YXV0b0NvbXBsZXRlOiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0dmFyIHZhbHVlID0gKGl0ZW0udmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnZhbHVlO1xuXHRcdFx0XHR2YXIgbGFibGUgPSAoaXRlbS5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ubGFibGU7XG5cdFx0XHRcdHZhciBwbGFjZWhvbGRlciA9IChpdGVtLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5wbGFjZWhvbGRlcjtcblx0XHRcdFx0dmFyIGNsYXNzTmFtZSA9IChpdGVtLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uY2xhc3NOYW1lO1xuXHRcdFx0XHRyZXR1cm4oXG5cdFx0XHRcdFx0PEF3ZXNvbXBsZXRlSW5wdXRcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH1cblx0XHRcdFx0XHRcdGRvY3R5cGU9e2l0ZW0uZG9jdHlwZX1cblx0XHRcdFx0XHRcdGRvY3ZhbHVlPXtpdGVtLmRvY3ZhbHVlfVxuXHRcdFx0XHRcdFx0ZG9jbGFibGU9e2l0ZW0uZG9jbGFibGV9XG5cdFx0XHRcdFx0XHR2YWx1ZT17dmFsdWV9XG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG5cdFx0XHRcdFx0XHRsYWJsZT17bGFibGV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e2NsYXNzTmFtZX1cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKX19XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKVxuXHRcdH1cblx0XHR0aGlzLnByb3BzLmZpZWxkcy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXG5cdFx0XHRmb3JtLnB1c2goZm9ybVR5cGVzW2l0ZW0uZmllbGRdKGl0ZW0saW5kZXgpKTtcblx0XHR9LmJpbmQodGhpcykpO1xuXHRcdC8vZm9yKHZhciB4PTA7IHggPCB0aGlzLnByb3BzLmZlaWxkcy5sZW5ndGggeCsrOyApXG5cdFx0dmFyIGNsYXNzTmFtZSA9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwicmVhY3QtZm9ybVwiOiBcImZvcm0taG9yaXpvbnRhbCByZWFjdC1mb3JtIFwiK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHJldHVybihcblx0XHRcdDxmb3JtIGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cblx0XHRcdFx0PGZpZWxkc2V0PlxuXHRcdFx0XHR7Zm9ybX1cblx0XHRcdFx0eyB0aGlzLnByb3BzLmNoaWxkcmVuIH1cblx0XHRcdFx0PC9maWVsZHNldD5cblx0XHRcdDwvZm9ybT5cblx0XHQpO1xuXHR9XG59XG5cblxuXG5leHBvcnQgY2xhc3MgU2VsZWN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuaW5wdXRDaGFuZ2U9dGhpcy5pbnB1dENoYW5nZS5iaW5kKHRoaXMpO1xuXG5cdH1cblx0aW5wdXRDaGFuZ2UoZSl7XG5cdFx0dGhpcy5wcm9wcy5pbnB1dENoYW5nZWQoKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMubGFibGUgPSAodGhpcy5wcm9wcy5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMubGFibGU7XG5cdFx0dGhpcy5vcHRpb25zID0gKHRoaXMucHJvcHMub3B0aW9ucyA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMub3B0aW9ucztcblx0XHR0aGlzLmNsYXNzTmFtZT0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJmb3JtLWNvbnRyb2xcIjogXCJmb3JtLWNvbnRyb2xcIiArdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0dmFyIG9wdGlvbnM9W107XG5cdFx0dmFyIG91dHB1dD1cIlwiO1xuXG5cblx0XHR0aGlzLm9wdGlvbnMubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblx0XHRcdHZhciBncm91cD1bXTtcblx0XHRcdGlmKGl0ZW0uZ3JvdXAgIT09IHVuZGVmaW5lZCl7XG5cdFx0XHRcdGl0ZW0ub3B0aW9ucy5tYXAoZnVuY3Rpb24oaW5uZXJJdGVtLGluZGV4KXtcblx0XHRcdFx0XHRncm91cC5wdXNoKCA8b3B0aW9uIGtleT17aXRlbS5ncm91cCtpbmRleH0+IHtpbm5lckl0ZW19IDwvb3B0aW9uPilcblx0XHRcdFx0fSlcblx0XHRcdFx0b3B0aW9ucy5wdXNoKDxvcHRncm91cCBrZXk9e2l0ZW0uZ3JvdXB9IGxhYmVsPXtpdGVtLmdyb3VwfT4ge2dyb3VwfTwvb3B0Z3JvdXA+KTtcblxuXHRcdFx0fVxuXHRcdFx0ZWxzZXtcblx0XHRcdFx0b3B0aW9ucy5wdXNoKCA8b3B0aW9uIGtleT17aW5kZXh9PiB7aXRlbX0gPC9vcHRpb24+KVxuXHRcdFx0fVxuXG5cdFx0XHRcblx0XHR9LmJpbmQodGhpcykpO1xuXHRcdFxuXG5cdFx0dmFyIHNlbGVjdD0oXG5cdFx0XHQ8c2VsZWN0IGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9IHZhbHVlPXt0aGlzLnZhbHVlfT5cblx0XHRcdFx0e29wdGlvbnN9XG5cdFx0XHQ8L3NlbGVjdD5cblx0XHQpO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMubGFibGUgIT09IHVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLmxhYmxlID09XCJcIil7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBcIj5cblx0XHQgICAgXHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD5cblx0XHQgICAgXHRcdDxkaXY+XG5cdFx0ICAgIFx0XHR7c2VsZWN0fVxuXHRcdCAgICBcdFx0PC9kaXY+XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdCAgICAgIFx0XHR7c2VsZWN0fVxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5pbnB1dENoYW5nZT10aGlzLmlucHV0Q2hhbmdlLmJpbmQodGhpcyk7XG5cblx0fVxuXHRpbnB1dENoYW5nZShlKXtcblx0XHR0aGlzLnByb3BzLmlucHV0Q2hhbmdlZCgpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHRoaXMudHlwZSA9ICh0aGlzLnByb3BzLnR5cGUgPT09IHVuZGVmaW5lZCkgPyBcInRleHRcIjogdGhpcy5wcm9wcy50eXBlO1xuXHRcdHRoaXMudmFsdWUgPSAodGhpcy5wcm9wcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMudmFsdWU7XG5cdFx0dGhpcy5wbGFjZWhvbGRlciA9ICh0aGlzLnByb3BzLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5wbGFjZWhvbGRlcjtcblx0XHR0aGlzLmxhYmxlID0gKHRoaXMucHJvcHMubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLmxhYmxlO1xuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblx0XHR0aGlzLmNsYXNzTmFtZT0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJmb3JtLWNvbnRyb2xcIjogXCJmb3JtLWNvbnRyb2wgXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHZhciBpbnB1dD0oIDxpbnB1dCB0eXBlPXt0aGlzLnR5cGV9IGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9IHBsYWNlaG9sZGVyPXt0aGlzLnBsYWNlaG9sZGVyfSB2YWx1ZT17dGhpcy52YWx1ZX0gLz4pO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMubGFibGUgIT09IHVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLmxhYmxlID09XCJcIil7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBcIj5cblx0XHQgICAgXHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD5cblx0XHQgICAgXHRcdDxkaXYgY2xhc3NOYW1lPVwiXCI+XG5cdFx0ICAgICAgXHRcdFx0e2lucHV0fVxuXHRcdCAgICBcdFx0PC9kaXY+XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdCAgICAgIFx0XHR7aW5wdXR9XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5leHBvcnQgY2xhc3MgRGF0ZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuaW5wdXRDaGFuZ2U9dGhpcy5pbnB1dENoYW5nZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZGF0ZUluaXQ9dGhpcy5kYXRlSW5pdC5iaW5kKHRoaXMpO1xuXG5cdH1cblx0aW5wdXRDaGFuZ2UoZSl7XG5cdFx0dGhpcy5wcm9wcy5pbnB1dENoYW5nZWQoKTtcblx0fVxuXHRkYXRlSW5pdCgpe1xuXHRcdCQoJy5pbnB1dC1ncm91cC5kYXRlIC5kYXRlcGljaycpLmRhdGVwaWNrZXIoe1xuXHRcdCAgICB0b2RheUJ0bjogXCJsaW5rZWRcIixcblx0XHQgICAgb3JpZW50YXRpb246IFwiYm90dG9tIHJpZ2h0XCIsXG5cdFx0ICAgIGF1dG9jbG9zZTogdHJ1ZSxcblx0XHQgICAgdG9kYXlIaWdobGlnaHQ6IHRydWVcblx0XHR9KS5vbignY2hhbmdlRGF0ZScsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdHZhciBldmVudCA9IG5ldyBFdmVudCgnaW5wdXQnLCB7IGJ1YmJsZXM6IHRydWUgfSk7XG5cdFx0XHRlLnRhcmdldC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblx0XHR9KTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMucGxhY2Vob2xkZXIgPSAodGhpcy5wcm9wcy5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXI7XG5cdFx0dGhpcy5sYWJsZSA9ICh0aGlzLnByb3BzLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5sYWJsZTtcblx0XHR2YXIgb3V0cHV0PVwiXCI7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jb250cm9sIGRhdGVwaWNrXCI6IFwiZm9ybS1jb250cm9sIGRhdGVwaWNrIFwiICt0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHR2YXIgaW5wdXQ9KCBcblx0XHRcdDxpbnB1dFxuXHRcdFx0XHRyZWY9e3RoaXMuZGF0ZUluaXR9IFxuXHRcdFx0XHR0eXBlPVwidGV4dFwiXG5cdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9XG5cdFx0XHRcdHBsYWNlaG9sZGVyPXt0aGlzLnBsYWNlaG9sZGVyfSAgXG5cdFx0XHRcdHZhbHVlPXt0aGlzLnZhbHVlfSBcblx0XHRcdFx0b25DaGFuZ2U9e3RoaXMucHJvcHMuaW5wdXRDaGFuZ2VkfVxuXHRcdFx0XHQvPlxuXG5cdFx0KTtcblxuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy5sYWJsZSA9PVwiXCIpe1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdCAgXHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdCAgXHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWxcIj57dGhpcy5wcm9wcy5sYWJsZX08L2xhYmVsPlxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cCBkYXRlXCI+XG5cdFx0XHRcdFx0XHR7aW5wdXR9XG5cdFx0XHRcdCAgXHRcdDxzcGFuIGNsYXNzTmFtZT1cImlucHV0LWdyb3VwLWFkZG9uXCI+XG5cdFx0XHRcdCAgXHRcdFx0PGkgY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi10aFwiPjwvaT5cblx0XHRcdFx0ICBcdFx0PC9zcGFuPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHQgIFx0KTtcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdG91dHB1dCA9IChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAgZGF0ZVwiPlxuXG5cdFx0XHRcdFx0XHR7aW5wdXR9XG5cdFx0XHRcdCAgXHRcdDxzcGFuIGNsYXNzTmFtZT1cImlucHV0LWdyb3VwLWFkZG9uXCI+XG5cdFx0XHRcdCAgXHRcdFx0PGkgY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi10aFwiPjwvaT5cblx0XHRcdFx0ICBcdFx0PC9zcGFuPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5leHBvcnQgY2xhc3MgQXdlc29tcGxldGVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblxuXHRcdC8qICAgRG8gdGhlIGJpbmQgdGhpbmcgICovXG5cdFx0dGhpcy5jcmVhdGVMaXN0PXRoaXMuY3JlYXRlTGlzdC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZG9jQ2hhbmdlZD10aGlzLmRvY0NoYW5nZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLmNvbXBvbmVudERpZE1vdW50PXRoaXMuY29tcG9uZW50RGlkTW91bnQuYmluZCh0aGlzKTtcblx0XHR0aGlzLmlucHV0Q2hhbmdlPXRoaXMuaW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcblx0XHR0aGlzLmF1dG9jb21wbGV0ZT10aGlzLmF1dG9jb21wbGV0ZS5iaW5kKHRoaXMpO1xuXHRcdC8vdGhpcy53b3Jrb3JkZXJPYmo9dGhpcy5vblN0YXR1c0NoYW5nZWQuYmluZCh0aGlzKTtcblx0XHQvKiAgICAgICAgICBlbmQgICAgICAgICAgKi9cblx0XHR0aGlzLml0ZW1saXN0PVtdO1xuXHRcdHRoaXMuc3RhdGU9e2l0ZW1saXN0OltdfTtcblx0XHR0aGlzLl9pc01vdW50ZWQ9ZmFsc2U7XG5cdFx0dmFyIGFyZ3M9e307XG5cdFx0dmFyIG9wdGlvbnM9e2RvY3R5cGU6dGhpcy5wcm9wcy5kb2N0eXBlfTtcblx0XHR0aGlzLmxpc3RUb29sID0gbmV3IHBzLmFwaVRvb2woe30sIG9wdGlvbnMgLHRoaXMuZG9jQ2hhbmdlZCk7XG5cdFx0aWYgKHRoaXMubGlzdFRvb2wuaXRlbXM9PT11bmRlZmluZWQgfHx0aGlzLmxpc3RUb29sLml0ZW1zPT09IDAgfHx0aGlzLmxpc3RUb29sLml0ZW1zPT09bnVsbCApe1xuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5zdGF0ZS5saXN0PXRoaXMubGlzdFRvb2wuaXRlbXM7XG5cdFx0fVxuXG5cdFx0dGhpcy5jcmVhdGVMaXN0KCk7XG5cdH1cblx0ZG9jQ2hhbmdlZCgpe1xuXHRcdHRoaXMuY3JlYXRlTGlzdCgpO1xuXHR9XG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0dGhpcy5faXNNb3VudGVkPXRydWU7XG5cblx0fVxuXHRjcmVhdGVMaXN0KCl7XG5cdFx0dGhpcy5pdGVtbGlzdD1bXTtcblx0XHRpZiAodGhpcy5wcm9wcy5kb2NsYWJsZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMubGlzdFRvb2wuaXRlbXMgIT09IHVuZGVmaW5lZCl7XG5cdFx0XHRmb3IobGV0IGl0ZW0gb2YgdGhpcy5saXN0VG9vbC5pdGVtcyl7XG5cdFx0XHRcdHZhciB0ZW1wID1baXRlbVt0aGlzLnByb3BzLmRvY2xhYmxlXSxpdGVtW3RoaXMucHJvcHMuZG9jdmFsdWVdXTtcblx0XHRcdFx0dGhpcy5pdGVtbGlzdC5wdXNoKHRlbXApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIGlmKHRoaXMubGlzdFRvb2wuaXRlbXMgIT09IHVuZGVmaW5lZCl7XG5cdFx0XHRmb3IobGV0IGl0ZW0gb2YgdGhpcy5saXN0VG9vbC5pdGVtcyl7XG5cdFx0XHRcdHRoaXMuaXRlbWxpc3QucHVzaChpdGVtW3RoaXMucHJvcHMuZG9jdmFsdWVdKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYodGhpcy5faXNNb3VudGVkKXtcblx0XHRcdC8vdGhpcy5zZXRTdGF0ZSh7aXRlbWxpc3Q6dGhpcy5zdGF0ZS5pdGVtbGlzdH0pO1xuXHRcdH1cblx0XHQkKGRvY3VtZW50KS50cmlnZ2VyKCdsaXN0TG9hZCcgKyB0aGlzLnByb3BzLmRvY3R5cGUpO1xuXHR9XG5cblx0YXV0b2NvbXBsZXRlKGlucHV0KXtcblx0XHR2YXIgY29uZmlnPSB7XG5cdFx0XHRcdG1pbkNoYXJzOiAwLFxuXHRcdFx0XHRtYXhJdGVtczogOTksXG5cdFx0XHRcdGF1dG9GaXJzdDogdHJ1ZSxcblx0XHRcdFx0ZmlsdGVyOiBBd2Vzb21wbGV0ZS5GSUxURVJfU1RBUlRTV0lUSFxuXHRcdFx0fVxuXHRcdGlmKHRoaXMucHJvcHMuZG9jbGFibGUgIT09IHVuZGVmaW5lZCApe1xuXHRcdFx0Y29uZmlnLml0ZW09IGZ1bmN0aW9uKGl0ZW0sIGlucHV0KSB7XG5cdFx0XHRcdHZhciBkID0gaXRlbTtcblx0XHRcdFx0dmFyIGh0bWwgPSBcIjxzcGFuPlwiICsgX18oaXRlbS5sYWJlbCkrIFwiPC9zcGFuPjxicj48c3Bhbj48c21hbGw+XCIraXRlbS52YWx1ZStcIjwvc21hbGw+PC9zcGFuPlwiO1xuXHRcdFx0XHRyZXR1cm4gJCgnPGxpPjwvbGk+Jylcblx0XHRcdFx0XHQuZGF0YSgnaXRlbS5hdXRvY29tcGxldGUnLCBpdGVtKVxuXHRcdFx0XHRcdC5odG1sKCc8YT48cD4nICsgaHRtbCArICc8L3A+PC9hPicpXG5cdFx0XHRcdFx0LmdldCgwKTtcblx0XHRcdH1cblxuXHRcdH1lbHNle1xuXHRcdFx0Y29uZmlnLml0ZW09ZnVuY3Rpb24oaXRlbSwgaW5wdXQpIHtcblx0XHRcdFx0dmFyIGQgPSBpdGVtO1xuXHRcdFx0XHR2YXIgaHRtbCA9IFwiPHNwYW4+XCIgKyBfXyhpdGVtKSsgXCI8L3NwYW4+XCI7XG5cdFx0XHRcdHJldHVybiAkKCc8bGk+PC9saT4nKVxuXHRcdFx0XHRcdC5kYXRhKCdpdGVtLmF1dG9jb21wbGV0ZScsIGl0ZW0pXG5cdFx0XHRcdFx0Lmh0bWwoJzxhPjxwPicgKyBodG1sICsgJzwvcD48L2E+Jylcblx0XHRcdFx0XHQuZ2V0KDApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLmF3ID0gbmV3IEF3ZXNvbXBsZXRlKGlucHV0LGNvbmZpZyk7XG5cdFx0aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRcdCdhd2Vzb21wbGV0ZS1zZWxlY3Rjb21wbGV0ZScsXG5cdFx0XHRcdHRoaXMuaW5wdXRDaGFuZ2Vcblx0XHQpO1xuXHRcdC8vICQoJyNwb28nKS5mb2N1cyhmdW5jdGlvbigpe1xuXHRcdC8vIFx0XHR0aGlzLmF3Lm9wZW4oKTtcblx0XHQvLyB9LmJpbmQodGhpcykpO1xuXHRcdC8vY29uc29sZS5sb2coKVxuXHRcdC8vIGlucHV0LnRhcmdldC5vbmZvY3VzKCBmdW5jdGlvbigpIHtcblx0XHQvLyBcdGNvbnNvbGUubG9nKGZvY3VzKTtcblx0XHQvLyBcdGlmIChhdy51bC5oYXNBdHRyaWJ1dGUoJ2hpZGRlbicpKSB7XG5cdFx0Ly8gXHRcdGF3Lm9wZW4oKTtcblx0XHQvLyBcdH1cblx0XHQvLyBcdGVsc2Uge1xuXHRcdC8vIFx0XHRhdy5jbG9zZSgpO1xuXHRcdC8vIFx0fVxuXHRcdC8vIH0pO1xuXHRcdC8vIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJvbmJsdXJcIiwgZnVuY3Rpb24oKSB7XG5cdFx0Ly8gXHRpZiAoYXcudWwuY2hpbGROb2Rlcy5sZW5ndGggPT09IDApIHtcblx0XHQvLyBcdFx0YXcubWluQ2hhcnMgPSAwO1xuXHRcdC8vIFx0XHRhdy5ldmFsdWF0ZSgpO1xuXHRcdC8vIFx0fVxuXHRcdC8vIFx0ZWxzZSB7XG5cdFx0Ly8gXHRcdGF3LmNsb3NlKCk7XG5cdFx0Ly8gXHR9XG5cdFx0Ly8gfSk7XG5cblx0XHR0aGlzLmF3Lmxpc3Q9dGhpcy5pdGVtTGlzdDtcblx0XHQkKGRvY3VtZW50KS5iaW5kKCdsaXN0TG9hZCcgKyB0aGlzLnByb3BzLmRvY3R5cGUsZnVuY3Rpb24oKXtcblx0XHRcdHRoaXMuYXcubGlzdD10aGlzLml0ZW1saXN0O1xuXHRcdH0uYmluZCh0aGlzKSk7XG5cdH1cblx0aW5wdXRDaGFuZ2UoZSl7XG5cdFx0dGhpcy5wcm9wcy5pbnB1dENoYW5nZWQoZSk7XG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnR5cGUgPSAodGhpcy5wcm9wcy50eXBlID09PSB1bmRlZmluZWQpID8gXCJ0ZXh0XCI6IHRoaXMucHJvcHMudHlwZTtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMucGxhY2Vob2xkZXIgPSAodGhpcy5wcm9wcy5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXI7XG5cdFx0dGhpcy5sYWJsZSA9ICh0aGlzLnByb3BzLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5sYWJsZTtcblx0XHR2YXIgb3V0cHV0PVwiXCI7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jb250cm9sIGF3ZXNvbXBsZXRlXCI6IFwiZm9ybS1jb250cm9sIGF3ZXNvbXBsZXRlIFwiICt0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHR2YXIgaW5wdXQ9KCA8aW5wdXQgXG5cdFx0XHRcdFx0dHlwZT17dGhpcy50eXBlfSBcblx0XHRcdFx0XHRjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfSBcblx0XHRcdFx0XHRwbGFjZWhvbGRlcj17dGhpcy5wbGFjZWhvbGRlcn0gXG5cdFx0XHRcdFx0cmVmPXt0aGlzLmF1dG9jb21wbGV0ZX1cblx0XHQgICAgICAgICAgXHRvbkNoYW5nZT17dGhpcy5pbnB1dENoYW5nZX0gXG5cdFx0ICAgICAgICAgIC8+KTtcblxuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy5sYWJsZSA9PVwiXCIpe1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgXCI+XG5cdFx0ICAgIFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbFwiPnt0aGlzLnByb3BzLmxhYmxlfTwvbGFiZWw+XG5cdFx0ICAgIFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIlwiPlxuXHRcdCAgICAgIFx0XHRcdHtpbnB1dH1cblx0XHQgICAgXHRcdDwvZGl2PlxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHQgICAgICBcdFx0e2lucHV0fVxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5cbiIsIi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZGFsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuc3VibWl0PXRoaXMuc3VibWl0LmJpbmQodGhpcyk7XG5cdH1cblx0c3VibWl0KGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR0aGlzLnByb3BzLnN1Ym1pdChlKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsIGZhZGUgdGV4dC1sZWZ0IHBhbmVsLWRlZmF1bHRcIiBpZD17dGhpcy5wcm9wcy5pZH0gdGFiSW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiBhcmlhLWxhYmVsbGVkYnk9XCJleGFtcGxlTW9kYWxMYWJlbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZ1wiIHJvbGU9XCJkb2N1bWVudFwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1oZWFkZXJcIj5cblx0XHRcdFx0XHRcdFx0PGg0IGNsYXNzTmFtZT1cIm1vZGFsLXRpdGxlXCIgaWQ9XCJleGFtcGxlTW9kYWxMYWJlbFwiPnt0aGlzLnByb3BzLnRpdGxlfTwvaDQ+XG5cdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGRpc3BsYXk9XCJub25lXCIgY2xhc3NOYW1lPVwiY2xvc2UgaGlkZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+XG5cdFx0XHRcdFx0XHRcdDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+XG5cdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XG5cdFx0XHRcdFx0XHRcdFx0eyB0aGlzLnByb3BzLmNoaWxkcmVuIH1cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZm9vdGVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNsb3NlPC9idXR0b24+XG5cdFx0XHRcdFx0XHRcdFx0PGJ1dHRvbiBcblx0XHRcdFx0XHRcdFx0XHRcdHR5cGU9XCJzdWJtaXRcIiBcblx0XHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMuc3VibWl0fSBcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiID5cblx0XHRcdFx0XHRcdFx0XHRcdFx0e3RoaXMucHJvcHMuc3VibWl0VGV4dH1cblx0XHRcdFx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5cbiIsIlxuaW1wb3J0IEFjb3JkaWFuIGZyb20gJy4uLy4uL3B1YmxpYy9qcy9tb2R1bGVzL3V0aWxzL2Fjb3JkaWFuJ1xuaW1wb3J0IEFjb3JkaWFuQ29udGVudCBmcm9tICcuLi8uLi9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9hY29yZGlhbkNvbnRlbnQnXG5pbXBvcnQgRGF5c1dvcmtvcmRlcnMgZnJvbSAnLi4vLi4vcHVibGljL2pzL21vZHVsZXMvZGF5c193b3Jrb3JkZXJzL2RheXNXb3Jrb3JkZXJzJ1xuaW1wb3J0IEZvcm0gZnJvbSAnLi4vLi4vcHVibGljL2pzL21vZHVsZXMvdXRpbHMvZm9ybXMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyZXdEYXNoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXG5cdFx0dGhpcy5jcmV3Q2hhbmdlZD10aGlzLmNyZXdDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jcmV3c0Fjb3JkaW9uPXRoaXMuY3Jld3NBY29yZGlvbi5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZGF0ZUNoYW5nZWQ9dGhpcy5kYXRlQ2hhbmdlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMud29ya09yZGVyU3RhdHVzPXRoaXMud29ya09yZGVyU3RhdHVzLmJpbmQodGhpcyk7XG5cblxuXHRcdHRoaXMuY3VycmVudFVzZXI9cHMuaW5pdEN1cnJlbnRVc2VyKCk7XG5cdFx0dGhpcy5jdXJyZW50VXNlci5nZXQoe30sZnVuY3Rpb24oaXRlbXMpe1xuXHRcdFx0aWYodGhpcy5jdXJyZW50VXNlci5pdGVtcy51c2VybmFtZT09XCJHdWVzdFwiKXtcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uID0gXCIvbG9naW5cIjtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHQkKGRvY3VtZW50KS50cmlnZ2VyKFwidXNlckxvYWRlZFwiKTtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZyhcImFmdGVyIExvYWRcIix0aGlzLmN1cnJlbnRVc2VyLml0ZW1zKTtcblx0XHRcdH1cblx0XHR9LmJpbmQodGhpcykpOyBcblx0XHQvL3RoaXMuc3RhdGU9e307XG5cdFx0dGhpcy5zdGF0ZT17XG5cdFx0XHRjcmV3OltdLFxuXHRcdFx0c3RhdHVzOltdLFxuXHRcdFx0dGl0bGU6JycsXG5cdFx0XHR1c2VyaW5mbzp0aGlzLmN1cnJlbnRVc2VyLml0ZW1zLFxuXHRcdFx0c2VsZWN0ZWREYXRlOm1vbWVudCgpLmZvcm1hdChcIk1NL0REL1lZWVlcIilcblx0XHR9O1xuXHRcdGNvbnNvbGUubG9nKHRoaXMuY3VycmVudFVzZXIuaXRlbXMudG9kYXkpO1xuXHRcdHRoaXMuY3Jld1Rvb2wgPSBuZXcgcHMuYXBpVG9vbCh7fSx7ZG9jdHlwZTonQ3Jldyd9LHRoaXMuY3Jld0NoYW5nZWQpO1xuXHRcdHRoaXMuYWNvcmRpYW5JZD1cImNyZXctZGFzaC1hY29yZGlhblwiO1xuXHR9XG5cbiAgXHRjcmV3Q2hhbmdlZCgpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe2NyZXc6dGhpcy5jcmV3VG9vbC5pdGVtc30pO1xuXHR9XG5cdGRhdGVDaGFuZ2VkKGUpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkRGF0ZTplLnRhcmdldC52YWx1ZX0pO1xuXHR9XG5cdHdvcmtPcmRlclN0YXR1cyhpbmRleCl7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKGl0ZW1zKXtcblx0XHRcdHZhciBzdGF0dXM9XCJOb25lXCI7XG5cdFx0XHRmb3IgKGxldCBpdGVtIG9mIGl0ZW1zKXtcblx0XHRcdFx0aWYoaXRlbS5zdGF0dXM9PVwiU3RhcnRlZFwiKXtcblx0XHRcdFx0XHRzdGF0dXM9XCJXb3JraW5nXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoaXRlbS5zdGF0dXM9PVwiQ29tcGxldGVcIiAmJiBzdGF0dXMhPVwiV29ya2luZ1wiKXtcblx0XHRcdFx0XHRzdGF0dXM9XCJDb21wbGV0ZWRcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZihpdGVtLnN0YXR1cz09XCJQZW5kaW5nXCIgJiYgc3RhdHVzPT1cIkNvbXBsZXRlZFwiKXtcblx0XHRcdFx0XHRzdGF0dXM9XCJEcml2aW5nXCI7XG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXHRcdFx0dGhpcy5zdGF0ZS5zdGF0dXNbaW5kZXhdPXN0YXR1cztcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3N0YXR1czp0aGlzLnN0YXRlLnN0YXR1c30pO1xuXHRcdH0uYmluZCh0aGlzKTtcblx0fVxuXG5cdGNyZXdzQWNvcmRpb24oKXtcblx0XHRcdC8vaWYgYWxsIHBlbmRpbmcgJiYgY2xvY2tlZCBpbiBkcml2aW5nXG5cdFx0XHQvL2lmIG5vdCBjbG9ja2VkIGluOiBub3Qgc3RyYXRlZFxuXHRcdFx0Ly9jbG9ja2VkIG91dDogY2xvY2tlZCBvdXRcblxuXG5cdFx0dmFyIGNvbnZlcnRlZERhdGUgPSBtb21lbnQodGhpcy5zdGF0ZS5zZWxlY3RlZERhdGUsICdNTS9ERC9ZWVlZJykuZm9ybWF0KCdZWVlZLU1NLUREJyk7XG5cdFx0dmFyIG91dHB1dD1bXTtcblx0XHR0aGlzLnN0YXRlLmNyZXcubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblx0XHRcdGlmKHRoaXMuc3RhdGUuc3RhdHVzW2luZGV4XT09PXVuZGVmaW5lZCl7XG5cdFx0XHRcdHRoaXMuc3RhdGUuc3RhdHVzW2luZGV4XT1cIk5vIFdvcmsgT3JkZXJzXCI7XG5cdFx0XHR9XG5cdFx0XHRvdXRwdXQucHVzaCgoXG5cdFx0XHRcdDxBY29yZGlhbkNvbnRlbnRcblx0XHRcdFx0XHRrZXk9e3RoaXMuYWNvcmRpYW5JZCtpbmRleH1cblx0XHRcdFx0XHRpZD17dGhpcy5hY29yZGlhbklkK2luZGV4fVxuXHRcdFx0XHRcdHRpdGxlPXtpdGVtLmNyZXdfbmFtZX1cblx0XHRcdFx0XHRhY3RpdmU9eyhpbmRleD09PTApP3RydWU6ZmFsc2V9XG5cdFx0XHRcdFx0cGFyZW50SWQ9e3RoaXMuYWNvcmRpYW5JZH1cblx0XHRcdFx0PlxuXHRcdFx0XHRcdHt0aGlzLnN0YXRlLnN0YXR1c1tpbmRleF19XG5cdFx0XHRcdFx0PERheXNXb3Jrb3JkZXJzIFxuXHRcdFx0XHRcdFx0ZGF0ZT17Y29udmVydGVkRGF0ZX1cblx0XHRcdFx0XHRcdGNyZXc9e2l0ZW0ubmFtZX1cblx0XHRcdFx0XHRcdHN0YXR1c1VwZGF0ZT17dGhpcy53b3JrT3JkZXJTdGF0dXMoaW5kZXgpfVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdDwvQWNvcmRpYW5Db250ZW50PikpO1x0XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gKDxkaXY+XG5cdFx0XHQ8Rm9ybVxuXHRcdFx0XHRjbGFzc05hbWU9XCJjZW50ZXItYmxvY2sgc2hvcnRcIlxuXHRcdFx0XHR0eXBlPVwiaG9yaXpvbnRhbFwiXG5cdFx0XHRcdGZpZWxkcz17W3tcblx0XHRcdFx0XHRmaWVsZDpcImRhdGVcIixcblx0XHRcdFx0XHR2YWx1ZTp0aGlzLnN0YXRlLnNlbGVjdGVkRGF0ZSxcblx0XHRcdFx0XHRvbkNoYW5nZTogdGhpcy5kYXRlQ2hhbmdlZCxcblx0XHRcdFx0XHRjbGFzc05hbWU6XCJpbnB1dC1sZ1wiLFxuXHRcdFx0XHRcdGtleTpcIm90aGVyM1wiXG5cdFx0XHRcdH1dfVxuXHRcdFx0Lz5cblx0XHRcdDxBY29yZGlhbiBpZD17dGhpcy5hY29yZGlhbklkfT5cblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvQWNvcmRpYW4+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHJldHVybig8ZGl2Pnt0aGlzLmNyZXdzQWNvcmRpb24oKX08L2Rpdj4pO1xuXHR9XG59XG5cblxuY29uc3QgYXBwPSAkKCcjYXBwJylbMF07XG4oZnVuY3Rpb24oKXtcblx0ZnJhcHBlLnJlYWR5KGZ1bmN0aW9uKCl7XG5cdFx0UmVhY3RET00ucmVuZGVyKCBcblx0XHQ8Q3Jld0Rhc2ggLz4sYXBwICk7XG5cdH0pXG5cbn0pKCk7XG5cbi8qXG5cdFx0XHRcdFx0PERheXNXb3Jrb3JkZXJzIFxuXHRcdFx0XHRcdFx0ZGF0ZT17dGhpcy5wcm9wcy5kYXRlfVxuXHRcdFx0XHRcdFx0Y3Jldz17aXRlbS5uYW1lfVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0Ki8iXX0=
