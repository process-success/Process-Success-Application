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
			var issueCount = " ";
			if (this.props.issues !== null) {
				issueCount = this.props.issues.length === 0 ? "" : this.props.issues.length + " ";
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
					issueCount,
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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
		_this.createWorkorder = _this.createWorkorder.bind(_this);
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
		key: 'createWorkorder',
		value: function createWorkorder(item) {
			item.date = moment(item.date, "MM/DD/YYYY").format('YYYY-MM-DD');
			this.workorderTool.create(item, function (item) {
				ps.successAlert("Workorder " + item.name + " created.");
			});
		}
	}, {
		key: 'workorderObj',
		value: function workorderObj(item, index) {
			return React.createElement(_workorderTask2.default, {
				key: index + this.props.crew,
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
					if (todo.length + 1 % 4 === 0) {

						todo.push(React.createElement('div', { className: 'clearfix spacer' }));
					}
				} else {
					complete.push(this.workorderObj(item, index));
					if (complete.length % 3 === 0) {
						complete.push(React.createElement('div', { className: 'clearfix spacer' }));
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

			// var date=this.props.date;
			// date=moment(date,'YYYY-MM-DD').format("MM/DD/YYYY");
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
					date: moment(this.props.date, 'YYYY-MM-DD').format("MM/DD/YYYY"),
					createWorkorder: this.createWorkorder
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

		var _this2 = _possibleConstructorReturn(this, (WorkorderFormModal.__proto__ || Object.getPrototypeOf(WorkorderFormModal)).call(this, props));

		_this2.submit = _this2.submit.bind(_this2);
		_this2.state = {
			location: "",
			priority: 1,
			type: "Pruning",
			status: "Pending",
			date: _this2.props.date,
			crew: _this2.props.crew
		};
		return _this2;
	}

	_createClass(WorkorderFormModal, [{
		key: 'submit',
		value: function submit(e) {
			if (this.state.location == "" || this.state.crew == "" || moment(this.state.date, "MM/DD/YYYY").isValid() !== true) {
				console.log("not valid");
			} else {
				var copy = ps.clone(this.state);
				$('#' + this.props.id).modal('hide');
				this.setState({ location: "" });
				this.props.createWorkorder(copy);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _ref;

			var fields = [{
				field: "autoComplete",
				onChange: function (e) {
					this.setState({ location: e.target.value });
				}.bind(this),
				value: this.state.location,
				required: true,
				lable: "Vineyard",
				doctype: "Vineyard",
				docvalue: "name"
			}, {
				field: "input",
				className: "vineyard-input",
				type: "number",
				onChange: function (e) {
					this.setState({ priority: e.target.value });
				}.bind(this),
				value: this.state.priority,
				lable: "Priority"
			}, {
				field: "date",
				required: true,
				onChange: function (e) {
					this.setState({ date: e.target.value });
				}.bind(this),
				value: this.state.date,
				lable: "Date"
			}, {
				field: "select",
				onChange: function (e) {
					this.setState({ type: e.target.value });
				}.bind(this),
				value: this.state.type,
				lable: "Type",
				options: ["Watering", "Pruning", "Repair", "Spraying"]
			}, {
				field: "select",
				onChange: function (e) {
					this.setState({ status: e.target.value });
				}.bind(this),
				value: this.state.status,
				lable: "Status",
				disabled: true,
				options: ["Pending"]
			}, (_ref = {
				field: "autoComplete",
				onChange: this.someFunction,
				lable: "Crew",
				required: true,
				readonly: "ture",
				doctype: "Crew",
				docvalue: "name",
				doclable: "crew_lead_full_name"
			}, _defineProperty(_ref, 'onChange', function (e) {
				this.setState({ crew: e.target.value });
			}.bind(this)), _defineProperty(_ref, 'value', this.state.crew), _ref), {
				field: "button",
				type: "submit",
				value: "Create Work Order",
				className: "btn-primary pull-right",
				onClick: this.submit
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
						submit: false
					},
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
				{ className: "checkbox row" },
				React.createElement(
					"div",
					{ className: "col-xs-8" },
					React.createElement(
						"label",
						{ className: checked },
						React.createElement("input", {
							className: "big-checkbox",
							onChange: function () {
								this.props.taskChecked(this.props.item, checked);
							}.bind(this),
							type: "checkbox",
							checked: this.props.checked }),
						this.props.lable
					)
				),
				React.createElement(
					"div",
					{ className: "edit col-xs-4" },
					React.createElement(
						"button",
						{
							type: "button",
							className: "btn btn-default inline-task",
							onClick: this.props.editTask
						},
						React.createElement("span", { className: "glyphicon glyphicon-edit", "aria-hidden": "true" })
					)
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
exports.VineyardTasks = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _taskCheck = require('./taskCheck');

var _taskCheck2 = _interopRequireDefault(_taskCheck);

var _createIssue = require('./createIssue');

var _createIssue2 = _interopRequireDefault(_createIssue);

var _modal = require('../utils/modal');

var _modal2 = _interopRequireDefault(_modal);

var _forms = require('../utils/forms');

var _sprayForm = require('../vineyard/sprayForm');

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
			mainClass = mainClass + " panel workorder ps-panel";
			var route = this.props.route === undefined ? "Not Created" : React.createElement(
				'a',
				{ className: '', href: this.props.route },
				'More Information'
			);
			var tasks = "";
			if (this.props.tasks !== undefined) {
				tasks = [];
				this.props.tasks.map(function (item, index) {
					var checked = item.status ? true : false;
					tasks.push(React.createElement(_taskCheck2.default, { key: index, index: index, lable: item.task, checked: checked, taskChecked: this.taskChecked }));
				}.bind(this));
			}
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
							tasks,
							React.createElement(VineyardTasks, { workorder: this.props.workorder, vineyard: this.props.location })
						),
						React.createElement(
							'div',
							null,
							route
						)
					)
				)
			);
		}
	}]);

	return WorkorderTask;
}(React.Component);

exports.default = WorkorderTask;

var VineyardTasks = exports.VineyardTasks = function (_React$Component2) {
	_inherits(VineyardTasks, _React$Component2);

	function VineyardTasks(props) {
		_classCallCheck(this, VineyardTasks);

		var _this2 = _possibleConstructorReturn(this, (VineyardTasks.__proto__ || Object.getPrototypeOf(VineyardTasks)).call(this, props));

		_this2.modalNewTask = _this2.modalNewTask.bind(_this2);
		_this2.taskChecked = _this2.taskChecked.bind(_this2);
		_this2.taskChanged = _this2.taskChanged.bind(_this2);
		_this2.editTask = _this2.editTask.bind(_this2);
		_this2.getForm = _this2.getForm.bind(_this2);
		_this2.modalId = "task-form" + _this2.props.workorder;

		_this2.tasksTool = new ps.apiTool({ "work_order": _this2.props.workorder }, ps.apiSetup.vineyardTasks, _this2.taskChanged);
		_this2.state = {
			tasks: _this2.tasksTool.items,
			formState: "taskType",
			formMode: "create",
			editItem: null
		};
		return _this2;
	}

	_createClass(VineyardTasks, [{
		key: 'modalNewTask',
		value: function modalNewTask() {
			this.setState({
				formState: "taskType",
				editItem: null,
				formMode: "create"
			});
			$('#' + this.modalId).modal();
		}
	}, {
		key: 'isChecked',
		value: function isChecked(value) {
			//return ((value===this.state.selected) ?'checked line-through':'default');
		}
	}, {
		key: 'taskChanged',
		value: function taskChanged() {
			this.setState({ tasks: this.tasksTool.items });
		}
	}, {
		key: 'taskChecked',
		value: function taskChecked(item) {
			item.complete = item.complete ? 0 : 1;
			this.tasksTool.update(item);
		}
	}, {
		key: 'editTask',
		value: function editTask(item) {
			this.setState({
				formState: item.doctype,
				editItem: item,
				formMode: "edit"
			});
			$('#' + this.modalId).modal();
		}
	}, {
		key: 'renderTasks',
		value: function renderTasks() {
			var tasks = [];
			if (this.state.tasks !== undefined && this.state.tasks !== null) {
				tasks = [];
				this.state.tasks.map(function (item, index) {
					//var checked=item.status?true:false;
					tasks.push(React.createElement(_taskCheck2.default, {
						key: index,
						index: index,
						item: item,
						lable: item.doctype,
						checked: item.complete,
						taskChecked: this.taskChecked,
						editTask: function (e) {
							this.editTask(item);
						}.bind(this)
					}));
				}.bind(this));
			}
			return tasks;
		}
	}, {
		key: 'getForm',
		value: function getForm() {
			var formsObj = {
				taskType: function () {
					return React.createElement(_forms.Select, {
						className: '',
						lable: 'Task Type',
						options: [" "].concat(ps.apiSetup.vineyardTasks.doctype),
						inputChanged: function (e) {
							this.setState({ formState: e.target.value });
						}.bind(this)
					});
				}.bind(this),
				Spraying: function (item) {
					if (item == undefined) {
						item = null;
					}
					return React.createElement(_sprayForm.SprayForm, {
						id: this.props.workorder,
						mode: this.state.formMode,
						item: item,
						date: false,
						vineyard: false,
						itemChange: function (copy) {
							this.setState({ editItem: copy });
						}.bind(this),
						create: function (copy) {
							copy.doctype = "Spraying";
							copy.work_order = this.props.workorder;
							copy.vineyard = this.props.vineyard;
							this.tasksTool.create(copy);
							$('#' + this.modalId).modal('toggle');
						}.bind(this),
						edit: function (copy) {
							this.tasksTool.update(copy);
							$('#' + this.modalId).modal('toggle');
						}.bind(this),
						'delete': function (copy) {
							this.tasksTool.delete(copy);
							$('#' + this.modalId).modal('toggle');
						}.bind(this)
					});
				}.bind(this),
				Pruning: function (item) {

					if (item === undefined) {
						return React.createElement(_sprayForm.PruningForm, {
							id: 'createSprayEntry',
							createSprayEntry: function createSprayEntry() {}
						});
					}
				}.bind(this)
			};

			return formsObj[this.state.formState](this.state.editItem);
		}
	}, {
		key: 'render',
		value: function render() {
			var fieldsSpray = [{
				field: "button",
				type: "submit",
				value: "Create Spraying Entry",
				className: "btn-primary pull-right",
				onClick: this.submit
			}];
			var tasks = this.renderTasks();
			var form = this.getForm();
			var lable = "Create New Task";
			return React.createElement(
				'div',
				{ className: '' },
				tasks,
				React.createElement(
					'div',
					{ className: 'checkbox row addbutton' },
					React.createElement(
						'div',
						{ className: 'edit' },
						React.createElement(
							'button',
							{
								type: 'button',
								className: 'btn btn-default inline-task',
								onClick: this.modalNewTask
							},
							React.createElement('span', { className: 'glyphicon glyphicon-plus ', 'aria-hidden': 'true' }),
							' Add Task'
						)
					)
				),
				React.createElement(
					_modal2.default,
					{
						id: this.modalId,
						submitText: 'Submit',
						title: lable,
						submit: false
					},
					form
				)
			);
		}
	}]);

	return VineyardTasks;
}(React.Component);

},{"../utils/forms":7,"../utils/modal":8,"../vineyard/sprayForm":9,"./createIssue":1,"./taskCheck":3}],5:[function(require,module,exports){
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
					console.log("check");
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
					console.log(item.field);
					console.log(index);
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
				value: this.value,
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

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SprayForm = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _forms = require("../utils/forms");

var _forms2 = _interopRequireDefault(_forms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SprayForm = exports.SprayForm = function (_React$Component) {
	_inherits(SprayForm, _React$Component);

	function SprayForm(props) {
		_classCallCheck(this, SprayForm);

		var _this = _possibleConstructorReturn(this, (SprayForm.__proto__ || Object.getPrototypeOf(SprayForm)).call(this, props));

		_this.componentWillUpdate = _this.componentWillUpdate.bind(_this);
		_this.submit = _this.submit.bind(_this);
		_this.save = _this.save.bind(_this);
		_this.delete = _this.delete.bind(_this);
		return _this;
	}

	_createClass(SprayForm, [{
		key: "componentWillUpdate",
		value: function componentWillUpdate() {}
	}, {
		key: "submit",
		value: function submit(e) {
			//if(this.props.item.vineyard=="" ||this.props.item.spray_type=="" || (moment(this.props.item.date,"MM/DD/YYYY").isValid())!==true){
			//	console.log("not valid");
			//}else{
			e.preventDefault();
			this.props.create(this.props.item);
			//}
		}
	}, {
		key: "save",
		value: function save(e) {
			// if(this.props.item.vineyard=="" ||this.props.item.spray_type=="" || (moment(this.props.item.date,"MM/DD/YYYY").isValid())!==true){
			// 	console.log("not valid");
			// }else{
			e.preventDefault();
			this.props.edit(this.props.item);
			// }
		}
	}, {
		key: "delete",
		value: function _delete(e) {
			e.preventDefault();
			this.props.delete(this.props.item);
		}
	}, {
		key: "render",
		value: function render() {
			var createHidden = this.props.mode != "create" ? " hidden" : " nope";
			var editHidden = this.props.mode != "edit" ? " hidden" : " nope";

			if (this.props.item == null) {
				var copy = {
					vineyard: "",
					season: "",
					date: moment().format("MM/DD/YYYY"),
					sprayType: "",
					quantity: 0
				};
			} else {
				var copy = ps.clone(this.props.item);
			}

			console.log(this.props.item);
			console.log(copy);
			var formElements = {
				date: [{}, {
					field: "date",
					required: true,
					onChange: function (e) {
						copy.date = e.target.value;
						this.props.itemChange(copy);
					}.bind(this),
					value: copy.date,
					lable: "Date"
				}],
				vineyard: [{}, {
					field: "autoComplete",
					onChange: function (e) {
						copy.vineyard = e.target.value;
						this.props.itemChange(copy);
					}.bind(this),
					value: copy.vineyard,
					required: true,
					lable: "Vineyard",
					doctype: "Vineyard",
					docvalue: "name"
				}],
				field: [{}, {
					field: "autoComplete",
					onChange: function (e) {
						copy.field = e.target.value;
						this.props.itemChange(copy);
					}.bind(this),
					value: copy.field,
					required: true,
					lable: "Vineyard",
					doctype: "Vineyard Field",
					filter: { vineyard: copy.vineyard },
					docvalue: "name"
				}],
				workorder: [{}, {
					field: "autoComplete",
					onChange: function (e) {
						copy.work_order = e.target.value;
						this.props.itemChange(copy);
					}.bind(this),
					value: copy.work_order,
					required: true,
					lable: "Vineyard",
					doctype: "work_order",
					docvalue: "name"
				}]
			};

			var fields = [formElements.vineyard[this.props.vineyard], {
				field: "autoComplete",
				onChange: function (e) {
					copy.season = e.target.value;
					this.props.itemChange(copy);
				}.bind(this),
				value: copy.season,
				required: true,
				lable: "Season",
				doctype: "Season",
				docvalue: "name"
			}, formElements.date[this.props.vineyard], {
				field: "autoComplete",
				onChange: function (e) {
					copy.spray_type = e.target.value;
					this.props.itemChange(copy);
				}.bind(this),
				value: copy.spray_type,
				required: true,
				lable: "Spray Type",
				doctype: "Spray Type",
				docvalue: "name"
			}, {
				field: "input",
				className: "vineyard-input",
				type: "number",
				onChange: function (e) {
					copy.quantity = e.target.value;
					this.props.itemChange(copy);
				}.bind(this),
				value: copy.quantity,
				lable: "quantity"
			}, {
				field: "button",
				type: "submit",
				value: "Create Spraying Entry",
				className: "btn-primary pull-right" + createHidden,
				onClick: this.submit
			}, {
				field: "button",
				type: "submit",
				value: "Save",
				className: "btn-success pull-right" + editHidden,
				onClick: this.save
			}, {
				field: "button",
				type: "submit",
				value: "Delete",
				className: "btn-danger pull-right" + editHidden,
				onClick: this.delete
			}];
			return React.createElement(
				"div",
				null,
				React.createElement(_forms2.default, {
					id: this.props.id,
					type: "horizontal",
					fields: fields

				})
			);
		}
	}]);

	return SprayForm;
}(React.Component);
// {
// 	field:"select",
// 	onChange: function(e){ 
// 		copy.type=e.target.value;
// 		this.props.itemChange(copy);
// 	}.bind(this),
// 	lable:"Style",
// 	options:[
// 		"Cane",
// 		"Hybrid",
// 		"Head Train",
// 		"Bilateral Train",
// 		"Two Bud",
// 		"Spur",
// 		"Trunk"
// 	]
// },
// {
// 	field:"check",
// 	className:"big-checkbox",
// 	onChange: function(e){ 
// 		copy.b_lock=e.target.value;
// 		this.props.itemChange(copy);
// 	}.bind(this),
// 	lable:"B-Lock"
// },
// {
// 	field:"check",
// 	className:"big-checkbox",
// 	onChange: function(e){ 
// 		copy.removed=e.target.value;
// 		this.props.itemChange(copy);
// 	}.bind(this),
// 	lable:"Pruning Removed"
// },
// {
// 	field:"check",
// 	className:"big-checkbox",
// 	onChange: function(e){ 
// 		copy.tap_removed=e.target.value;
// 		this.props.itemChange(copy);
// 	}.bind(this),
// 	lable:"Tap Removed"
// },
// {
// 	field:"check",
// 	className:"big-checkbox",
// 	onChange: function(e){ 
// 		copy.pre_prune=e.target.value;
// 		this.props.itemChange(copy);
// 	}.bind(this),
// 	lable:"Pre Prune"
// },

},{"../utils/forms":7}],10:[function(require,module,exports){
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

},{"../../public/js/modules/days_workorders/daysWorkorders":2,"../../public/js/modules/utils/acordian":5,"../../public/js/modules/utils/acordianContent":6,"../../public/js/modules/utils/forms":7}]},{},[10])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c193b3Jrb3JkZXJzL2NyZWF0ZUlzc3VlLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy9kYXlzX3dvcmtvcmRlcnMvZGF5c1dvcmtvcmRlcnMuanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL2RheXNfd29ya29yZGVycy90YXNrQ2hlY2suanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL2RheXNfd29ya29yZGVycy93b3Jrb3JkZXJUYXNrLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9hY29yZGlhbi5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdXRpbHMvYWNvcmRpYW5Db250ZW50LmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9mb3Jtcy5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdXRpbHMvbW9kYWwuanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL3ZpbmV5YXJkL3NwcmF5Rm9ybS5qc3giLCJwcm9jZXNzX3N1Y2Nlc3Mvd3d3L2Rhc2hib2FyZC9kYXNoLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7O0lBR3FCLFc7OztBQUNwQixzQkFBWSxLQUFaLEVBQWtCO0FBQUE7O0FBQUEsd0hBQ1gsS0FEVzs7QUFFakIsUUFBSyxhQUFMLEdBQW1CLE1BQUssYUFBTCxDQUFtQixJQUFuQixPQUFuQjtBQUNBLFFBQUssY0FBTCxHQUFvQixNQUFLLGNBQUwsQ0FBb0IsSUFBcEIsT0FBcEI7QUFIaUI7QUFJakI7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QUFLLFVBQW5CO0FBQ0U7QUFERjtBQVpPLElBQVI7QUFpQkE7OzsyQkFDTztBQUNQLFVBQU87QUFBQTtBQUFBO0FBQU0sU0FBSyxhQUFMO0FBQU4sSUFBUDtBQUNBOzs7O0VBMUdvQyxNQUFNLFM7O2tCQUF2QixROzs7QUE4R3JCLElBQU0sTUFBSyxFQUFFLE1BQUYsRUFBVSxDQUFWLENBQVg7QUFDQSxDQUFDLFlBQVU7QUFDVixRQUFPLEtBQVAsQ0FBYSxZQUFVO0FBQ3RCLFdBQVMsTUFBVCxDQUNBLG9CQUFDLFFBQUQsT0FEQSxFQUNhLEdBRGI7QUFFQSxFQUhEO0FBS0EsQ0FORCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDcmVhdGVJc3N1ZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKVxuXHRcdHRoaXMubW9kYWxOZXdJc3N1ZT10aGlzLm1vZGFsTmV3SXNzdWUuYmluZCh0aGlzKTtcblx0XHR0aGlzLm1vZGFsRWRpdElzc3VlPXRoaXMubW9kYWxFZGl0SXNzdWUuYmluZCh0aGlzKTtcblx0fVxuXHR0b29sVGlwKCl7XG5cdFx0JChmdW5jdGlvbiAoKSB7XG5cdFx0IFx0JCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoKTtcblx0XHR9KVxuXHR9XG5cdG1vZGFsTmV3SXNzdWUoZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMucHJvcHMuYWN0aXZhdGVNb2RhbE5ldygpO1xuXHR9XG5cdG1vZGFsRWRpdElzc3VlKGl0ZW0sZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGNvbnNvbGUubG9nKGl0ZW0pXG5cdFx0dGhpcy5wcm9wcy5hY3RpdmF0ZU1vZGFsRWRpdChpdGVtKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHRcdFx0XHQvLyBcdFx0ZGF0YS10b2dnbGU9XCJtb2RhbFwiIFxuXHRcdFx0XHRcdC8vIGRhdGEtdGFyZ2V0PXtcIiNcIit0aGlzLnBvcFVwSWR9XG5cdFx0XHRcdCAvLyBcdGFyaWEtbGFiZWw9XCJDcmVhdGUgSXNzdWVcIiBcblx0XHRcdFx0IC8vIFx0ZGF0YS10b2dnbGU9XCJ0b29sdGlwXCIgXG5cdFx0XHRcdCAvLyBcdGRhdGEtcGxhY2VtZW50PVwidG9wXCIgXG5cdFx0XHRcdCAvLyBcdHRpdGxlPVwiSXNzdWVcIiBcblx0XHRcdFx0XHQvLyByZWY9e3RoaXMudG9vbFRpcH1cdFx0XHRcdFx0Ly8gb25DbGljaz17IHRoaXMucG9wVXB9ID5cblx0XHR2YXIgZHJvcGRvd25JdGVtcz1bXTtcblx0XHRpZih0aGlzLnByb3BzLmlzc3VlcyE9PW51bGwpe1xuXHRcdFx0dGhpcy5wcm9wcy5pc3N1ZXMubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblx0XHRcdFx0aWYgKGl0ZW0uc3RhdHVzID09J1N1Ym1pdHRlZCcgfHwgaXRlbS5zdGF0dXM9PSdBc3NpZ25lZCcpe1xuXHRcdFx0XHRcdGRyb3Bkb3duSXRlbXMucHVzaChcblx0XHRcdFx0XHRcdDxsaSBrZXk9e2luZGV4fT4gXG5cdFx0XHRcdFx0XHRcdDxhIGNsYXNzTmFtZT1cImRyb3Bkb3duLWl0ZW1cIiBcblx0XHRcdFx0XHRcdFx0XHRocmVmPVwiI1wiIFxuXHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMubW9kYWxFZGl0SXNzdWUuYmluZCh0aGlzLGl0ZW0pfSBcblx0XHRcdFx0XHRcdFx0PntpdGVtLnRpdGxlfTwvYT5cblx0XHRcdFx0XHRcdDwvbGk+KTtcblx0XHRcdFx0fVxuXHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHR9XG5cdFx0dmFyIGlzc3VlQ291bnQ9XCIgXCI7XG5cdFx0aWYodGhpcy5wcm9wcy5pc3N1ZXMhPT1udWxsKXtcblx0XHRcdGlzc3VlQ291bnQ9KHRoaXMucHJvcHMuaXNzdWVzLmxlbmd0aD09PTApP1wiXCI6dGhpcy5wcm9wcy5pc3N1ZXMubGVuZ3RoK1wiIFwiO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImRyb3Bkb3duIGRyb3Bkb3duLXBhbmVsLXJpZ2h0XCI+XG5cblx0XHRcdFx0PGJ1dHRvblxuXHRcdFx0XHRcdGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdCBidG4teHMgZHJvcGRvd24tdG9nZ2xlIGZ1bGwtaGVhZGVyLWJ1dHRvbiBjb3JuZXJcIiBcblx0XHRcdFx0XHR0eXBlPVwiYnV0dG9uXCIgXG5cdFx0XHRcdFx0ZGF0YS10b2dnbGU9XCJkcm9wZG93blwiIFxuXHRcdFx0XHRcdGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCIgXG5cdFx0XHRcdFx0YXJpYS1leHBhbmRlZD1cImZhbHNlXCIgPlxuXG5cdFx0XHRcdCBcdHtpc3N1ZUNvdW50fTxzcGFuIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tZXhjbGFtYXRpb24tc2lnblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cblx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdDx1bCBjbGFzc05hbWU9XCJkcm9wZG93bi1tZW51XCI+XG5cdFx0XHRcdCAgICA8bGkgY2xhc3NOYW1lPVwiZHJvcGRvd24taGVhZGVyXCI+SXNzdWVzPC9saT5cblx0XHRcdFx0ICAgIHtkcm9wZG93bkl0ZW1zfVxuXHRcdFx0XHQgICAgPGxpIHJvbGU9XCJzZXBhcmF0b3JcIiBjbGFzc05hbWU9XCJkaXZpZGVyXCI+PC9saT5cblx0XHRcdFx0ICAgIDxsaT48YSBcblx0XHRcdFx0ICAgIFx0Y2xhc3NOYW1lPVwiZHJvcGRvd24taXRlbVwiXG5cdFx0XHRcdCAgICBcdG9uQ2xpY2s9e3RoaXMubW9kYWxOZXdJc3N1ZX1cblx0XHRcdFx0ICAgIFx0aHJlZj1cIiNcIiA+ICsgTmV3IElzc3VlPC9hPjwvbGk+XG5cdFx0XHRcdDwvdWw+XG5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuXG4iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmltcG9ydCBXb3Jrb3JkZXJUYXNrIGZyb20gJy4vd29ya29yZGVyVGFzayc7XG5cbmltcG9ydCBGb3JtIGZyb20gJy4uL3V0aWxzL2Zvcm1zJ1xuaW1wb3J0IE1vZGFsIGZyb20gJy4uL3V0aWxzL21vZGFsJ1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF5c1dvcmtvcmRlcnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dmFyIGFyZ3M9e307XG5cdFx0YXJncy5jcmV3PXRoaXMucHJvcHMuY3Jldztcblx0XHRhcmdzLmRhdGU9dGhpcy5wcm9wcy5kYXRlO1xuXHRcdC8qICAgRG8gdGhlIGJpbmQgdGhpbmcgICovXG5cdFx0dGhpcy5vblRhc2tDaGVja2VkPXRoaXMub25UYXNrQ2hlY2tlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMub25TdGF0dXNDaGFuZ2VkPXRoaXMub25TdGF0dXNDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy53b3JrT3JkZXJDaGFuZ2VkPXRoaXMud29ya09yZGVyQ2hhbmdlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuc29ja2V0VXBkYXRlPXRoaXMuc29ja2V0VXBkYXRlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzPXRoaXMuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcy5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY3JlYXRlV29ya29yZGVyPXRoaXMuY3JlYXRlV29ya29yZGVyLmJpbmQodGhpcyk7XG5cdFx0Ly90aGlzLndvcmtvcmRlck9iaj10aGlzLm9uU3RhdHVzQ2hhbmdlZC5iaW5kKHRoaXMpO1xuXHRcdC8qICAgICAgICAgIGVuZCAgICAgICAgICAqL1xuXG5cdFx0dGhpcy5zdGF0ZT17d29ya29yZGVyczpbXX07XG5cblx0XHR2YXIgYXJncz17fTtcblx0XHRhcmdzLmNyZXc9dGhpcy5wcm9wcy5jcmV3O1xuXHRcdGFyZ3MuZGF0ZT10aGlzLnByb3BzLmRhdGU7XG5cdFx0dGhpcy53b3Jrb3JkZXJUb29sID0gbmV3IHBzLmFwaVRvb2woYXJncyxwcy5hcGlTZXR1cC53b3JrT3JkZXJzLHRoaXMud29ya09yZGVyQ2hhbmdlZCk7XG5cdFx0aWYgKHRoaXMud29ya29yZGVyVG9vbC5pdGVtcz09PXVuZGVmaW5lZCB8fHRoaXMud29ya29yZGVyVG9vbC5pdGVtcz09PSAwIHx8dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zPT09bnVsbCApe1xuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5zdGF0ZS53b3Jrb3JkZXJzPXRoaXMud29ya29yZGVyVG9vbC5pdGVtcztcblx0XHR9XG5cblx0fVxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XG5cblx0XHRpZihuZXh0UHJvcHMuY3JldyE9dGhpcy5wcm9wcy5jcmV3IHx8IG5leHRQcm9wcy5kYXRlIT10aGlzLnByb3BzLmRhdGUgKXtcblxuXHRcdFx0dmFyIGFyZ3M9e307XG5cdFx0XHRhcmdzLmNyZXc9bmV4dFByb3BzLmNyZXc7XG5cdFx0XHRhcmdzLmRhdGU9bmV4dFByb3BzLmRhdGU7XG5cdFx0XHR0aGlzLndvcmtvcmRlclRvb2wgPSBuZXcgcHMuYXBpVG9vbChhcmdzLHBzLmFwaVNldHVwLndvcmtPcmRlcnMsdGhpcy53b3JrT3JkZXJDaGFuZ2VkKTtcblx0XHRcdGlmICh0aGlzLndvcmtvcmRlclRvb2wuaXRlbXM9PT11bmRlZmluZWQgfHx0aGlzLndvcmtvcmRlclRvb2wuaXRlbXM9PT0gMCB8fHRoaXMud29ya29yZGVyVG9vbC5pdGVtcz09PW51bGwgKXtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7d29ya29yZGVyczpbXX0pO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3dvcmtvcmRlcnM6dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zfSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0c29ja2V0VXBkYXRlKCl7XG5cblx0fVxuXHRvblRhc2tDaGVja2VkKHdvX2luZGV4LGluZGV4LGNoZWNrKXtcblx0XHR0aGlzLndvcmtvcmRlclRvb2wuaXRlbXNbd29faW5kZXhdLnN1YnRhc2tbaW5kZXhdLnN0YXR1cz1jaGVjaz8wOjE7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7d29ya29yZGVyczp0aGlzLndvcmtvcmRlclRvb2wuaXRlbXN9KTtcblx0XHR0aGlzLndvcmtvcmRlclRvb2wudXBkYXRlKHRoaXMud29ya29yZGVyVG9vbC5pdGVtc1t3b19pbmRleF0pO1xuXHRcdHZhciBjaGVja2VkVGV4dD1jaGVjaz9cInVuY2hlY2tlZC5cIjpcImNoZWNrZWQuXCJcblx0XHQvL3BzLnN1Y2Nlc3NBbGVydCh0aGlzLndvcmtvcmRlclRvb2wuaXRlbXNbd29faW5kZXhdLnN1YnRhc2tbaW5kZXhdLnRhc2sgK1wiIFwiKyBjaGVja2VkVGV4dCApO1xuXHR9XG5cdG9uU3RhdHVzQ2hhbmdlZChzdGF0dXMsIGluZGV4KXtcblx0XHR0aGlzLndvcmtvcmRlclRvb2wuaXRlbXNbaW5kZXhdLnN0YXR1cz1zdGF0dXM7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7d29ya29yZGVyczp0aGlzLndvcmtvcmRlclRvb2wuaXRlbXN9KTtcblx0XHR0aGlzLndvcmtvcmRlclRvb2wudXBkYXRlKHRoaXMud29ya29yZGVyVG9vbC5pdGVtc1tpbmRleF0pO1xuXHRcdGlmKHN0YXR1cz09XCJDb21wbGV0ZVwiKXtcblx0XHRcdHBzLnN1Y2Nlc3NBbGVydChcIldvcmtvcmRlciBjb21wbGV0ZWQhXCIpO1xuXHRcdH1cblx0fVxuXHR3b3JrT3JkZXJDaGFuZ2VkKCl7XG5cblx0XHRpZiAodGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zIT09bnVsbCl7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHt3b3Jrb3JkZXJzOnRoaXMud29ya29yZGVyVG9vbC5pdGVtc30pO1xuXHRcdFx0aWYodGhpcy5wcm9wcy5zdGF0dXNVcGRhdGUgIT09IHVuZGVmaW5lZCl7XG5cdFx0XHRcdHRoaXMucHJvcHMuc3RhdHVzVXBkYXRlKHRoaXMud29ya29yZGVyVG9vbC5pdGVtcyk7XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHt3b3Jrb3JkZXJzOltdfSk7XG5cdFx0fVxuXG5cdH1cblx0Y3JlYXRlV29ya29yZGVyKGl0ZW0pe1xuXHRcdGl0ZW0uZGF0ZT1tb21lbnQoaXRlbS5kYXRlLFwiTU0vREQvWVlZWVwiKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcblx0XHR0aGlzLndvcmtvcmRlclRvb2wuY3JlYXRlKGl0ZW0sZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRwcy5zdWNjZXNzQWxlcnQoXCJXb3Jrb3JkZXIgXCIgK2l0ZW0ubmFtZSsgXCIgY3JlYXRlZC5cIilcblx0XHR9KTtcblxuXHR9XG5cdHdvcmtvcmRlck9iaihpdGVtLGluZGV4KXtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8V29ya29yZGVyVGFzayBcblx0XHRcdFx0a2V5PXtpbmRleCArIHRoaXMucHJvcHMuY3Jld30gXG5cdFx0XHRcdGluZGV4PXtpbmRleH0gXG5cdFx0XHRcdGxvY2F0aW9uX3JvdXRlPXtpdGVtLmxvY2F0aW9uX3JvdXRlfVxuXHRcdFx0XHRsb2NhdGlvbj17aXRlbS5sb2NhdGlvbn1cblx0XHRcdFx0dGFza3M9e2l0ZW0uc3VidGFza31cblx0XHRcdFx0c3RhdHVzPXtpdGVtLnN0YXR1c31cblx0XHRcdFx0dHlwZT17aXRlbS50eXBlfVxuXHRcdFx0XHR3b3Jrb3JkZXI9e2l0ZW0ubmFtZX1cblx0XHRcdFx0b25UYXNrQ2hlY2tlZD17dGhpcy5vblRhc2tDaGVja2VkfVxuXHRcdFx0XHRvblN0YXR1c0NoYW5nZWQ9e3RoaXMub25TdGF0dXNDaGFuZ2VkfVxuXHRcdFx0XHRyb3V0ZT17aXRlbS5yb3V0ZX1cblx0XHRcdC8+XG5cdFx0KTtcblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gICAgICAgIFJlbmRlclxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdHJlbmRlcigpe1xuXHRcdGlmICh0aGlzLnN0YXRlLndvcmtvcmRlcnM9PT0wfHx0aGlzLnN0YXRlLndvcmtvcmRlcnM9PT11bmRlZmluZWQpe1xuXHRcdFx0cmV0dXJuICg8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+PGgzPk5vIFdvcmtvcmRlcnM8L2gzPjwvZGl2Pik7XG5cdFx0fVxuXHRcdHZhciB0b2RvPVtdO1xuXHRcdHZhciBjb21wbGV0ZT1bXTtcblx0XHR0aGlzLnN0YXRlLndvcmtvcmRlcnMubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblx0XHRcdGlmIChpdGVtLnN0YXR1cyE9J0NvbXBsZXRlJyYmaXRlbS5zdGF0dXMhPSdJbmNvbXBsZXRlJyl7XG5cdFx0XHRcdHRvZG8ucHVzaCh0aGlzLndvcmtvcmRlck9iaihpdGVtLGluZGV4KSk7XG5cdFx0XHRcdGlmKHRvZG8ubGVuZ3RoKzElND09PTApe1xuXG5cdFx0XHRcdFx0dG9kby5wdXNoKDxkaXYgY2xhc3NOYW1lPSdjbGVhcmZpeCBzcGFjZXInPjwvZGl2Pilcblx0XHRcdFx0fVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGNvbXBsZXRlLnB1c2godGhpcy53b3Jrb3JkZXJPYmooaXRlbSxpbmRleCkpO1xuXHRcdFx0XHRpZihjb21wbGV0ZS5sZW5ndGglMz09PTApe2NvbXBsZXRlLnB1c2goPGRpdiBjbGFzc05hbWU9J2NsZWFyZml4IHNwYWNlcic+PC9kaXY+KX1cblx0XHRcdH1cblx0XHR9LmJpbmQodGhpcykpO1xuXHRcdHZhciBjb21wbGV0ZUhlYWRlcj0oPGgzPkNvbXBsZXRlIFdvcmsgT3JkZXJzPC9oMz4pO1xuXHRcdGlmKGNvbXBsZXRlLmxlbmd0aD09MCl7XG5cdFx0XHRjb21wbGV0ZUhlYWRlcj1cIlwiO1xuXHRcdH1cblxuXHRcdC8vIHZhciBkYXRlPXRoaXMucHJvcHMuZGF0ZTtcblx0XHQvLyBkYXRlPW1vbWVudChkYXRlLCdZWVlZLU1NLUREJykuZm9ybWF0KFwiTU0vREQvWVlZWVwiKTtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIndvcmtvcmRlcl9jb250YWluZXJcIj5cblx0XHRcdFx0PGRpdj48YnIvPlxuXHRcdFx0XHRcdHt0b2RvfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPjwvZGl2PlxuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdHtjb21wbGV0ZUhlYWRlcn1cblx0XHRcdFx0XHR7Y29tcGxldGV9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNsZWFyZml4XCI+PC9kaXY+XG5cdFx0XHRcdDxici8+XG5cdFx0XHRcdDxXb3Jrb3JkZXJGb3JtTW9kYWxcblx0XHRcdFx0XHRpZD17XCJjcmVhdGUtd28tXCIrdGhpcy5wcm9wcy5jcmV3LnJlcGxhY2UoXCIgXCIsXCItXCIpfVxuXHRcdFx0XHRcdGNyZXc9e3RoaXMucHJvcHMuY3Jld31cblx0XHRcdFx0XHRkYXRlPXttb21lbnQodGhpcy5wcm9wcy5kYXRlLCdZWVlZLU1NLUREJykuZm9ybWF0KFwiTU0vREQvWVlZWVwiKX1cblx0XHRcdFx0XHRjcmVhdGVXb3Jrb3JkZXI9e3RoaXMuY3JlYXRlV29ya29yZGVyfVxuXHRcdFx0XHQvPlxuXG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXG5cdH07XHRcbn1cblxuZXhwb3J0IGNsYXNzIFdvcmtvcmRlckZvcm1Nb2RhbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblxuXHRcdHRoaXMuc3VibWl0PXRoaXMuc3VibWl0LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5zdGF0ZT17XG5cdFx0XHRsb2NhdGlvbjpcIlwiLFxuXHRcdFx0cHJpb3JpdHk6MSxcblx0XHRcdHR5cGU6XCJQcnVuaW5nXCIsXG5cdFx0XHRzdGF0dXM6XCJQZW5kaW5nXCIsXG5cdFx0XHRkYXRlOnRoaXMucHJvcHMuZGF0ZSxcblx0XHRcdGNyZXc6dGhpcy5wcm9wcy5jcmV3XG5cdFx0fVxuXHR9XG5cblx0c3VibWl0KGUpe1xuXHRcdGlmKHRoaXMuc3RhdGUubG9jYXRpb249PVwiXCIgfHx0aGlzLnN0YXRlLmNyZXc9PVwiXCIgfHwgKG1vbWVudCh0aGlzLnN0YXRlLmRhdGUsXCJNTS9ERC9ZWVlZXCIpLmlzVmFsaWQoKSkhPT10cnVlKXtcblx0XHRcdGNvbnNvbGUubG9nKFwibm90IHZhbGlkXCIpO1xuXHRcdH1lbHNle1xuXHRcdFx0dmFyIGNvcHk9cHMuY2xvbmUodGhpcy5zdGF0ZSk7XG5cdFx0XHQkKCcjJysgdGhpcy5wcm9wcy5pZCkubW9kYWwoJ2hpZGUnKVxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7bG9jYXRpb246XCJcIn0pXG5cdFx0XHR0aGlzLnByb3BzLmNyZWF0ZVdvcmtvcmRlcihjb3B5KTtcblx0XHR9XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dmFyIGZpZWxkcz1bXHRcdFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImF1dG9Db21wbGV0ZVwiLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7bG9jYXRpb246ZS50YXJnZXQudmFsdWV9KVxuXHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdHZhbHVlOnRoaXMuc3RhdGUubG9jYXRpb24sXG5cdFx0XHRcdHJlcXVpcmVkOnRydWUsXG5cdFx0XHRcdGxhYmxlOlwiVmluZXlhcmRcIixcblx0XHRcdFx0ZG9jdHlwZTpcIlZpbmV5YXJkXCIsXG5cdFx0XHRcdGRvY3ZhbHVlOlwibmFtZVwiXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImlucHV0XCIsXG5cdFx0XHRcdGNsYXNzTmFtZTpcInZpbmV5YXJkLWlucHV0XCIsXG5cdFx0XHRcdHR5cGU6XCJudW1iZXJcIixcblx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3ByaW9yaXR5OmUudGFyZ2V0LnZhbHVlfSlcblx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHR2YWx1ZTp0aGlzLnN0YXRlLnByaW9yaXR5LFxuXHRcdFx0XHRsYWJsZTpcIlByaW9yaXR5XCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiZGF0ZVwiLFxuXHRcdFx0XHRyZXF1aXJlZDp0cnVlLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7ZGF0ZTplLnRhcmdldC52YWx1ZX0pO1xuXHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdHZhbHVlOnRoaXMuc3RhdGUuZGF0ZSxcblx0XHRcdFx0bGFibGU6XCJEYXRlXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwic2VsZWN0XCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHt0eXBlOmUudGFyZ2V0LnZhbHVlfSlcblx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHR2YWx1ZTp0aGlzLnN0YXRlLnR5cGUsXG5cdFx0XHRcdGxhYmxlOlwiVHlwZVwiLFxuXHRcdFx0XHRvcHRpb25zOltcblx0XHRcdFx0XHRcIldhdGVyaW5nXCIsXG5cdFx0XHRcdFx0XCJQcnVuaW5nXCIsXG5cdFx0XHRcdFx0XCJSZXBhaXJcIixcblx0XHRcdFx0XHRcIlNwcmF5aW5nXCJcblx0XHRcdFx0XVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJzZWxlY3RcIixcblx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3N0YXR1czplLnRhcmdldC52YWx1ZX0pXG5cdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0dmFsdWU6dGhpcy5zdGF0ZS5zdGF0dXMsXG5cdFx0XHRcdGxhYmxlOlwiU3RhdHVzXCIsXG5cdFx0XHRcdGRpc2FibGVkOnRydWUsXG5cdFx0XHRcdG9wdGlvbnM6W1xuXHRcdFx0XHRcdFwiUGVuZGluZ1wiXG5cdFx0XHRcdF1cblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiYXV0b0NvbXBsZXRlXCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiB0aGlzLnNvbWVGdW5jdGlvbixcblx0XHRcdFx0bGFibGU6XCJDcmV3XCIsXG5cdFx0XHRcdHJlcXVpcmVkOnRydWUsXG5cdFx0XHRcdHJlYWRvbmx5OlwidHVyZVwiLFxuXHRcdFx0XHRkb2N0eXBlOlwiQ3Jld1wiLFxuXHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIixcblx0XHRcdFx0ZG9jbGFibGU6XCJjcmV3X2xlYWRfZnVsbF9uYW1lXCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtjcmV3OmUudGFyZ2V0LnZhbHVlfSlcblx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHR2YWx1ZTp0aGlzLnN0YXRlLmNyZXcsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImJ1dHRvblwiLFxuXHRcdFx0XHR0eXBlOlwic3VibWl0XCIsXG5cdFx0XHRcdHZhbHVlOlwiQ3JlYXRlIFdvcmsgT3JkZXJcIixcblx0XHRcdFx0Y2xhc3NOYW1lOlwiYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiLFxuXHRcdFx0XHRvbkNsaWNrOnRoaXMuc3VibWl0XG5cdFx0XHR9XG5cblxuXHRcdF1cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cdFx0XHRcdFxuXHRcdFx0XHQ8YSBcblx0XHRcdFx0XHRocmVmPVwiI1wiIFxuXHRcdFx0XHRcdGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiXG5cdFx0XHRcdFx0b25DbGljaz17ZnVuY3Rpb24oKXskKCcjJysgdGhpcy5wcm9wcy5pZCkubW9kYWwoKX0uYmluZCh0aGlzKX1cblx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzXCI+PC9zcGFuPiBOZXcgV29yayBPcmRlcjwvYT5cblx0XHRcdFx0PE1vZGFsIFxuXHRcdFx0XHRcdGlkPXt0aGlzLnByb3BzLmlkfSBcblx0XHRcdFx0XHRzdWJtaXRUZXh0PVwiU3VibWl0XCIgXG5cdFx0XHRcdFx0dGl0bGU9XCJDcmVhdGUgTmV3IFdvcmtvcmRlclwiXG5cdFx0XHRcdFx0c3VibWl0PXtmYWxzZX1cblx0XHRcdFx0XHQ+XG5cblx0XHRcdFx0XHQ8Rm9ybVxuXHRcdFx0XHRcdFx0aWQ9XCJDcmVhdGVXb3Jrb3JkZXJGb3JtXCJcblx0XHRcdFx0XHRcdHR5cGU9XCJob3Jpem9udGFsXCJcblx0XHRcdFx0XHRcdGZpZWxkcz17ZmllbGRzfVxuXG5cdFx0XHRcdFx0Lz5cblxuXHRcdFx0XHQ8L01vZGFsPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuIiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrQ2hlY2sgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy50YXNrQ2hlY2tlZCA9IHRoaXMudGFza0NoZWNrZWQuYmluZCh0aGlzKTtcblx0fVxuXHR0YXNrQ2hlY2tlZChlKXtcblx0XHR0aGlzLnByb3BzLnRhc2tDaGVja2VkKHRoaXMucHJvcHMuaW5kZXgsIHRoaXMucHJvcHMuY2hlY2tlZCk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3QgY2hlY2tlZCA9IHRoaXMucHJvcHMuY2hlY2tlZCA/IFwibGluZS10aHJvdWdoXCIgOiBcIlwiO1xuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hlY2tib3ggcm93XCI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLThcIj5cblx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT17Y2hlY2tlZH0+XG5cdFx0XHRcdFx0PGlucHV0IFxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiYmlnLWNoZWNrYm94XCIgXG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17ZnVuY3Rpb24oKXt0aGlzLnByb3BzLnRhc2tDaGVja2VkKHRoaXMucHJvcHMuaXRlbSwgY2hlY2tlZCk7fS5iaW5kKHRoaXMpfSBcblx0XHRcdFx0XHRcdHR5cGU9XCJjaGVja2JveFwiIFxuXHRcdFx0XHRcdFx0Y2hlY2tlZD17dGhpcy5wcm9wcy5jaGVja2VkfSAvPlxuXHRcdFx0XHRcdHt0aGlzLnByb3BzLmxhYmxlfVxuXHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJlZGl0IGNvbC14cy00XCI+IFxuXHRcdFx0XHRcdDxidXR0b24gXG5cdFx0XHRcdFx0XHR0eXBlPVwiYnV0dG9uXCIgXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHQgaW5saW5lLXRhc2tcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17dGhpcy5wcm9wcy5lZGl0VGFza31cblx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tZWRpdFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cblx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XHRcbn0iLCJcbi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuaW1wb3J0IFRhc2tDaGVjayBmcm9tICcuL3Rhc2tDaGVjaydcbmltcG9ydCBDcmVhdGVJc3N1ZSBmcm9tICcuL2NyZWF0ZUlzc3VlJ1xuaW1wb3J0IE1vZGFsIGZyb20gJy4uL3V0aWxzL21vZGFsJ1xuaW1wb3J0IHtGb3JtLCBTZWxlY3R9IGZyb20gJy4uL3V0aWxzL2Zvcm1zJ1xuaW1wb3J0IHtTcHJheUZvcm0sUHJ1bmluZ0Zvcm19IGZyb20gJy4uL3ZpbmV5YXJkL3NwcmF5Rm9ybSdcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXb3Jrb3JkZXJUYXNrIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuc3RhdGU9e1xuXHRcdFx0aXNzdWVzOltdLFxuXHRcdFx0dGl0bGU6JycsXG5cdFx0XHRtb2RhbDonbmV3Jyxcblx0XHRcdG1vZGFsUHJpb3JpdHk6J2xvdycsXG5cdFx0XHRtb2RhbFRpdGxlOicnLFxuXHRcdFx0bW9kYWxEZXNjcmlwdGlvbjonJyxcblx0XHRcdG1vZGFsTmFtZTonJ1xuXHRcdH07XG5cdFx0dGhpcy50YXNrQ2hlY2tlZD10aGlzLnRhc2tDaGVja2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5zdGF0dXNDaGFuZ2U9dGhpcy5zdGF0dXNDaGFuZ2UuYmluZCh0aGlzKTtcblx0XHR0aGlzLmFjdGl2YXRlTW9kYWxOZXc9dGhpcy5hY3RpdmF0ZU1vZGFsTmV3LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5hY3RpdmF0ZU1vZGFsRWRpdD10aGlzLmFjdGl2YXRlTW9kYWxFZGl0LmJpbmQodGhpcyk7XG5cdFx0XG5cdFx0dGhpcy5zdWJtaXRJc3N1ZT10aGlzLnN1Ym1pdElzc3VlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5tb2RhbFRpdGxlQ2hhbmdlPXRoaXMubW9kYWxUaXRsZUNoYW5nZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMubW9kYWxEZXNjcmlwdGlvbkNoYW5nZT10aGlzLm1vZGFsRGVzY3JpcHRpb25DaGFuZ2UuYmluZCh0aGlzKTtcblx0XHR0aGlzLm1vZGFsUHJpb3JpdHlDaGFuZ2U9dGhpcy5tb2RhbFByaW9yaXR5Q2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5pc3N1ZUNoYW5nZWQ9dGhpcy5pc3N1ZUNoYW5nZWQuYmluZCh0aGlzKTtcblxuXG5cdFx0dGhpcy5tb2RhbElkPVwiaXNzdWUtZm9ybS1cIit0aGlzLnByb3BzLndvcmtvcmRlcjtcblxuXHRcdFxuXHRcdHRoaXMuaXNzdWVUb29sID0gbmV3IHBzLmFwaVRvb2woe1wid29ya19vcmRlclwiOnRoaXMucHJvcHMud29ya29yZGVyfSx7ZG9jdHlwZTonSXNzdWUnfSx0aGlzLmlzc3VlQ2hhbmdlZCk7XG5cblxuXHR9XG5cdHRhc2tDaGVja2VkKGUpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe3RpdGxlOlwiQ0hFQ0tFRFwifSk7XG5cdH1cblx0aXNDaGVja2VkKHZhbHVlKXtcbiAgICBcdHJldHVybiAoKHZhbHVlPT09dGhpcy5zdGF0ZS5zZWxlY3RlZCkgPydjaGVja2VkIGxpbmUtdGhyb3VnaCc6J2RlZmF1bHQnKTtcbiAgXHR9XG4gIFx0dGFza0NoZWNrZWQoaW5kZXgsY2hlY2tlZCl7XG4gIFx0XHR2YXIgd29faW5kZXg9dGhpcy5wcm9wcy5pbmRleDtcbiAgXHRcdHRoaXMucHJvcHMub25UYXNrQ2hlY2tlZCh3b19pbmRleCxpbmRleCxjaGVja2VkKTtcbiAgXHR9XG4gIFx0c3RhdHVzQ2hhbmdlKGUpe1xuICBcdFx0dGhpcy5wcm9wcy5vblN0YXR1c0NoYW5nZWQoZS50YXJnZXQudmFsdWUsdGhpcy5wcm9wcy5pbmRleCk7XG5cbiAgXHR9XG4gIFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRcdFx0SVNTVUUgRlVOQ1RJT05TXG4gIFx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICBcdG1vZGFsVGl0bGVDaGFuZ2UoZSl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7bW9kYWxUaXRsZTplLnRhcmdldC52YWx1ZX0pO1xuICBcdH1cblx0bW9kYWxQcmlvcml0eUNoYW5nZShlKXtcblx0XHR0aGlzLnNldFN0YXRlKHttb2RhbFByaW9yaXR5OmUudGFyZ2V0LnZhbHVlfSk7XG5cdH1cblx0bW9kYWxEZXNjcmlwdGlvbkNoYW5nZShlKXtcblx0XHR0aGlzLnNldFN0YXRlKHttb2RhbERlc2NyaXB0aW9uOmUudGFyZ2V0LnZhbHVlfSk7XG5cdH1cbiAgXHRhY3RpdmF0ZU1vZGFsTmV3KCl7XG4gIFx0XHR0aGlzLnNldFN0YXRlKHttb2RhbDpcIm5ld1wifSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7bW9kYWxQcmlvcml0eTonJ30pO1xuXHRcdHRoaXMuc2V0U3RhdGUoe21vZGFsRGVzY3JpcHRpb246Jyd9KTtcblx0XHR0aGlzLnNldFN0YXRlKHttb2RhbFRpdGxlOicnfSk7XG4gIFx0XHQkKCcjJyt0aGlzLm1vZGFsSWQpLm1vZGFsKCk7XG4gIFx0fVxuICBcdGFjdGl2YXRlTW9kYWxFZGl0KGlzc3VlKXtcblx0XHR0aGlzLnNldFN0YXRlKHttb2RhbDppc3N1ZX0pO1xuXHRcdHRoaXMuc2V0U3RhdGUoe21vZGFsUHJpb3JpdHk6aXNzdWUucHJpb3JpdHl9KTtcblx0XHR0aGlzLnNldFN0YXRlKHttb2RhbERlc2NyaXB0aW9uOmlzc3VlLmlzc3VlfSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7bW9kYWxUaXRsZTppc3N1ZS50aXRsZX0pO1xuXHRcdHRoaXMuc2V0U3RhdGUoe21vZGFsTmFtZTppc3N1ZS5uYW1lfSk7XG4gIFx0XHQkKCcjJyt0aGlzLm1vZGFsSWQpLm1vZGFsKCk7XG4gIFx0fVxuICBcdGlzc3VlQ2hhbmdlZCgpe1xuXG5cdFx0dGhpcy5zZXRTdGF0ZSh7aXNzdWVzOnRoaXMuaXNzdWVUb29sLml0ZW1zfSk7XG5cdH1cbiAgXHRzdWJtaXRJc3N1ZShlKXtcbiAgXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdHZhciBuZXdJdGVtPXtcblx0XHRcdHRpdGxlOnRoaXMuc3RhdGUubW9kYWxUaXRsZSxcblx0XHRcdGlzc3VlOnRoaXMuc3RhdGUubW9kYWxEZXNjcmlwdGlvbixcblx0XHRcdHByaW9yaXR5OnRoaXMuc3RhdGUubW9kYWxQcmlvcml0eSxcblx0XHRcdHZpbmV5YXJkOnRoaXMucHJvcHMubG9jYXRpb24sXG5cdFx0XHR3b3JrX29yZGVyOnRoaXMucHJvcHMud29ya29yZGVyXG5cdFx0fVxuXHRcdGlmKHRoaXMuc3RhdGUubW9kYWw9PVwibmV3XCIpe1xuXHRcdFx0dGhpcy5pc3N1ZVRvb2wuY3JlYXRlKG5ld0l0ZW0sZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdHBzLnN1Y2Nlc3NBbGVydChcIklzc3VlIFwiICtpdGVtLnRpdGxlKyBcIiBjcmVhdGVkLlwiKVxuXHRcdFx0fSk7XG5cdFx0fWVsc2V7XG5cdFx0XHRuZXdJdGVtLm5hbWU9dGhpcy5zdGF0ZS5tb2RhbE5hbWU7XG5cdFx0XHR0aGlzLmlzc3VlVG9vbC51cGRhdGUobmV3SXRlbSxmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0cHMuc3VjY2Vzc0FsZXJ0KFwiSXNzdWUgXCIgK2l0ZW0udGl0bGUrXCIgdXBkYXRlZC5cIilcblx0XHRcdH0pO1xuXHRcdH1cblx0XHQvL2Nsb3NlIG1vZGFsXG5cdFx0JCgnIycrdGhpcy5tb2RhbElkKS5tb2RhbCgndG9nZ2xlJyk7XG5cdH1cblxuXG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHRpdGxlPVwid2VsY29tZVwiO1xuXHRcdHZhciBtYWluQ2xhc3M9e1xuXHRcdFx0J0NvbXBsZXRlJzoncGFuZWwtc3VjY2VzcycsXG5cdFx0XHQnSW5jb21wbGV0ZSc6J3BhbmVsLWRhbmdlcicsXG5cdFx0XHQnUGVuZGluZyc6J3BhbmVsLWRlZmF1bHQnLFxuXHRcdFx0J1N0YXJ0ZWQnOidwYW5lbC13YXJuaW5nJ1xuXHRcdH1bdGhpcy5wcm9wcy5zdGF0dXNdO1xuXHRcdG1haW5DbGFzcyA9IG1haW5DbGFzcyArIFwiIHBhbmVsIHdvcmtvcmRlciBwcy1wYW5lbFwiO1xuXHRcdHZhciByb3V0ZT0odGhpcy5wcm9wcy5yb3V0ZT09PXVuZGVmaW5lZCk/XCJOb3QgQ3JlYXRlZFwiOig8YSBjbGFzc05hbWU9XCJcIiBocmVmPXt0aGlzLnByb3BzLnJvdXRlfT5Nb3JlIEluZm9ybWF0aW9uPC9hPik7XG5cdFx0dmFyIHRhc2tzPVwiXCI7XG5cdFx0aWYodGhpcy5wcm9wcy50YXNrcyE9PXVuZGVmaW5lZCl7XG5cdFx0XHR0YXNrcz1bXTtcblx0XHRcdHRoaXMucHJvcHMudGFza3MubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblx0XHRcdFx0dmFyIGNoZWNrZWQ9aXRlbS5zdGF0dXM/dHJ1ZTpmYWxzZTtcblx0XHRcdFx0dGFza3MucHVzaCg8VGFza0NoZWNrIGtleT17aW5kZXh9IGluZGV4PXtpbmRleH0gbGFibGU9e2l0ZW0udGFza30gY2hlY2tlZD17Y2hlY2tlZH0gdGFza0NoZWNrZWQ9e3RoaXMudGFza0NoZWNrZWR9Lz4pO1xuXHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nY29sLW1kLTQgY29sLXNtLTQnPlxuXHRcdFx0XHQ8TW9kYWwgXG5cdFx0XHRcdFx0aWQ9e3RoaXMubW9kYWxJZH0gXG5cdFx0XHRcdFx0c3VibWl0VGV4dD1cIlN1Ym1pdFwiIFxuXHRcdFx0XHRcdHRpdGxlPVwiQ3JlYXRlIElzc3VlIEZvclwiXG5cdFx0XHRcdFx0c3VibWl0PXt0aGlzLnN1Ym1pdElzc3VlfT5cblxuXHRcdFx0XHRcdFx0PGZpZWxkc2V0PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHRcdFx0XHRcdFx0XHQ8bGFiZWw+SXNzdWUgVGl0bGU8L2xhYmVsPlxuXHRcdFx0XHRcdFx0XHRcdDxpbnB1dCBcblx0XHRcdFx0XHRcdFx0XHRcdHR5cGU9XCJ0ZXh0XCIgXG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBcblx0XHRcdFx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwiSXNzdWUgVGl0bGVcIiBcblx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlPXt0aGlzLnN0YXRlLm1vZGFsVGl0bGV9IFxuXHRcdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMubW9kYWxUaXRsZUNoYW5nZX1cblx0XHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRcdFx0PGxhYmVsPlByaW9yaXR5PC9sYWJlbD5cblx0XHRcdFx0XHRcdFx0XHQ8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHZhbHVlPXt0aGlzLnN0YXRlLm1vZGFsUHJpb3JpdHl9IG9uQ2hhbmdlPXt0aGlzLm1vZGFsUHJpb3JpdHlDaGFuZ2UuYmluZCh0aGlzKX0+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8b3B0aW9uPkxvdzwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0XHRcdFx0PG9wdGlvbj5NZWRpdW08L29wdGlvbj5cblx0XHRcdFx0XHRcdFx0XHRcdDxvcHRpb24+SGlnaDwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0XHRcdFx0PG9wdGlvbj5Dcml0aWNhbDwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0XHRcdDwvc2VsZWN0PlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRcdCAgXHQ8bGFiZWw+SXNzdWUgRGV0YWlsczo8L2xhYmVsPlxuXHRcdFx0XHRcdFx0XHQgIFx0PHRleHRhcmVhIFxuXHRcdFx0XHRcdFx0XHQgIFx0XHRjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBcblx0XHRcdFx0XHRcdFx0ICBcdFx0cm93cz1cIjNcIiBcblx0XHRcdFx0XHRcdFx0ICBcdFx0cGxhY2Vob2xkZXI9XCJJc3N1ZSBEZXRhaWxzXCIgXG5cdFx0XHRcdFx0XHRcdCAgXHRcdHZhbHVlPXt0aGlzLnN0YXRlLm1vZGFsRGVzY3JpcHRpb259XG5cdFx0XHRcdFx0XHRcdCAgXHRcdG9uQ2hhbmdlPXt0aGlzLm1vZGFsRGVzY3JpcHRpb25DaGFuZ2V9XG5cdFx0XHRcdFx0XHRcdCAgXHQ+PC90ZXh0YXJlYT5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8L2ZpZWxkc2V0PlxuXHRcdFx0XHQ8L01vZGFsPlxuXHRcdFx0PGRpdiBpZD1cIlwiIGNsYXNzTmFtZT17bWFpbkNsYXNzfT5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYW5lbC1oZWFkaW5nXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cblx0XHRcdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJwYW5lbC10aXRsZSBjb2wteHMtOFwiPlxuXHRcdFx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9XCJmbG9hdC1sZWZ0XCIgaHJlZj17dGhpcy5wcm9wcy5sb2NhdGlvbl9yb3V0ZX0+e3RoaXMucHJvcHMubG9jYXRpb259PC9hPlxuXHRcdFx0XHRcdFx0PC9oMz5cblxuXG5cblx0XHRcdFx0XHRcdFx0PENyZWF0ZUlzc3VlXG5cdFx0XHRcdFx0XHRcdFx0aXNzdWVzPXt0aGlzLnN0YXRlLmlzc3Vlc31cblx0XHRcdFx0XHRcdFx0XHRhY3RpdmF0ZU1vZGFsTmV3PXt0aGlzLmFjdGl2YXRlTW9kYWxOZXd9XG5cdFx0XHRcdFx0XHRcdFx0YWN0aXZhdGVNb2RhbEVkaXQ9e3RoaXMuYWN0aXZhdGVNb2RhbEVkaXR9XG5cdFx0XHRcdFx0XHRcdFx0d29ya29yZGVyPXt0aGlzLnByb3BzLndvcmtvcmRlcn1cblxuXHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNsZWFyZml4XCI+PC9kaXY+XG5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFxuXG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWJvZHlcIj5cblx0XHRcdFx0XHQ8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCBzdGF0dXNcIiB2YWx1ZT17dGhpcy5wcm9wcy5zdGF0dXN9IG9uQ2hhbmdlPXt0aGlzLnN0YXR1c0NoYW5nZX0+XG5cdFx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPVwiUGVuZGluZ1wiPlBlbmRpbmc8L29wdGlvbj5cblx0XHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9XCJTdGFydGVkXCI+U3RhcnRlZDwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIkNvbXBsZXRlXCI+Q29tcGxldGU8L29wdGlvbj5cblx0XHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9XCJJbmNvbXBsZXRlXCI+SW5jb21wbGV0ZTwvb3B0aW9uPlxuXHRcdFx0XHRcdDwvc2VsZWN0PlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja19ib3hlc1wiPlxuXG5cdFx0XHRcdFx0XHR7dGFza3N9XG5cdFx0XHRcdFx0XHQ8VmluZXlhcmRUYXNrcyB3b3Jrb3JkZXI9e3RoaXMucHJvcHMud29ya29yZGVyfSB2aW5leWFyZD17dGhpcy5wcm9wcy5sb2NhdGlvbn0vPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHR7cm91dGV9XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cblxuXG5cbmV4cG9ydCBjbGFzcyBWaW5leWFyZFRhc2tzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXG5cdFx0dGhpcy5tb2RhbE5ld1Rhc2s9dGhpcy5tb2RhbE5ld1Rhc2suYmluZCh0aGlzKTtcblx0XHR0aGlzLnRhc2tDaGVja2VkPXRoaXMudGFza0NoZWNrZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnRhc2tDaGFuZ2VkPXRoaXMudGFza0NoYW5nZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLmVkaXRUYXNrPXRoaXMuZWRpdFRhc2suYmluZCh0aGlzKTtcblx0XHR0aGlzLmdldEZvcm09dGhpcy5nZXRGb3JtLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5tb2RhbElkPVwidGFzay1mb3JtXCIrdGhpcy5wcm9wcy53b3Jrb3JkZXI7XG5cblx0XHR0aGlzLnRhc2tzVG9vbCA9IG5ldyBwcy5hcGlUb29sKHtcIndvcmtfb3JkZXJcIjp0aGlzLnByb3BzLndvcmtvcmRlcn0scHMuYXBpU2V0dXAudmluZXlhcmRUYXNrcyx0aGlzLnRhc2tDaGFuZ2VkKTtcblx0XHR0aGlzLnN0YXRlPXtcblx0XHRcdHRhc2tzOnRoaXMudGFza3NUb29sLml0ZW1zLFxuXHRcdFx0Zm9ybVN0YXRlOiBcInRhc2tUeXBlXCIsXG5cdFx0XHRmb3JtTW9kZTpcImNyZWF0ZVwiLFxuXHRcdFx0ZWRpdEl0ZW06bnVsbFxuXHRcdH07XG5cdH1cblx0bW9kYWxOZXdUYXNrKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRmb3JtU3RhdGU6XCJ0YXNrVHlwZVwiLFxuXHRcdFx0ZWRpdEl0ZW06bnVsbCxcblx0XHRcdGZvcm1Nb2RlOlwiY3JlYXRlXCJcblx0XHR9KTtcblx0XHQkKCcjJyt0aGlzLm1vZGFsSWQpLm1vZGFsKCk7XG5cdH1cblx0aXNDaGVja2VkKHZhbHVlKXtcbiAgICBcdC8vcmV0dXJuICgodmFsdWU9PT10aGlzLnN0YXRlLnNlbGVjdGVkKSA/J2NoZWNrZWQgbGluZS10aHJvdWdoJzonZGVmYXVsdCcpO1xuICBcdH1cbiAgXHR0YXNrQ2hhbmdlZCgpe1xuICBcdFx0dGhpcy5zZXRTdGF0ZSh7dGFza3M6dGhpcy50YXNrc1Rvb2wuaXRlbXN9KTtcbiAgXHR9XG4gIFx0dGFza0NoZWNrZWQoaXRlbSl7XG4gIFx0XHRpdGVtLmNvbXBsZXRlPWl0ZW0uY29tcGxldGU/MDoxO1xuICBcdFx0dGhpcy50YXNrc1Rvb2wudXBkYXRlKGl0ZW0pO1xuICBcdH1cbiAgXHRlZGl0VGFzayhpdGVtKXtcbiAgXHRcdHRoaXMuc2V0U3RhdGUoXG4gIFx0XHRcdHtcbiAgXHRcdFx0XHRmb3JtU3RhdGU6aXRlbS5kb2N0eXBlLFxuICBcdFx0XHRcdGVkaXRJdGVtOml0ZW0sXG4gIFx0XHRcdFx0Zm9ybU1vZGU6XCJlZGl0XCJcbiAgXHRcdFx0fSk7XG4gIFx0XHQkKCcjJyt0aGlzLm1vZGFsSWQpLm1vZGFsKCk7XG4gIFx0fVxuICBcdHJlbmRlclRhc2tzKCl7XG4gIFx0XHR2YXIgdGFza3M9W107XG4gIFx0XHRpZih0aGlzLnN0YXRlLnRhc2tzIT09dW5kZWZpbmVkJiZ0aGlzLnN0YXRlLnRhc2tzIT09bnVsbCl7XG5cdFx0XHR0YXNrcz1bXTtcblx0XHRcdHRoaXMuc3RhdGUudGFza3MubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblx0XHRcdFx0Ly92YXIgY2hlY2tlZD1pdGVtLnN0YXR1cz90cnVlOmZhbHNlO1xuXHRcdFx0XHR0YXNrcy5wdXNoKFxuXHRcdFx0XHRcdDxUYXNrQ2hlY2sgXG5cdFx0XHRcdFx0XHRrZXk9e2luZGV4fVxuXHRcdFx0XHRcdFx0aW5kZXg9e2luZGV4fVxuXHRcdFx0XHRcdFx0aXRlbT17aXRlbX1cblx0XHRcdFx0XHRcdGxhYmxlPXtpdGVtLmRvY3R5cGV9XG5cdFx0XHRcdFx0XHRjaGVja2VkPXtpdGVtLmNvbXBsZXRlfVxuXHRcdFx0XHRcdFx0dGFza0NoZWNrZWQ9e3RoaXMudGFza0NoZWNrZWR9XG5cdFx0XHRcdFx0XHRlZGl0VGFzaz17ZnVuY3Rpb24oZSl7IHRoaXMuZWRpdFRhc2soaXRlbSl9LmJpbmQodGhpcyl9XG5cdFx0XHRcdFx0Lz4pO1xuXHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdH1cblx0XHRyZXR1cm4gdGFza3M7XG4gIFx0fVxuICBcdGdldEZvcm0oKXtcbiAgXHRcdHZhciBmb3Jtc09iaj17XG5cdFx0XHR0YXNrVHlwZTpmdW5jdGlvbigpe1xuXHRcdFx0XHRyZXR1cm4oXHRcblx0XHRcdFx0PFNlbGVjdFxuXHRcdFx0XHRcdGNsYXNzTmFtZT1cIlwiXG5cdFx0XHRcdFx0bGFibGU9XCJUYXNrIFR5cGVcIlxuXHRcdFx0XHRcdG9wdGlvbnM9e1tcIiBcIl0uY29uY2F0KHBzLmFwaVNldHVwLnZpbmV5YXJkVGFza3MuZG9jdHlwZSl9XG5cdFx0XHRcdFx0aW5wdXRDaGFuZ2VkPXtcblx0XHRcdFx0XHRcdGZ1bmN0aW9uKGUpe3RoaXMuc2V0U3RhdGUoe2Zvcm1TdGF0ZTplLnRhcmdldC52YWx1ZX0pfS5iaW5kKHRoaXMpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQvPlxuXHRcdFx0KX0uYmluZCh0aGlzKSxcblx0XHRcdFNwcmF5aW5nOmZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0XHRpZihpdGVtPT11bmRlZmluZWQpe1xuXHRcdFx0XHRcdGl0ZW09bnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gKFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdDxTcHJheUZvcm1cblx0XHRcdFx0XHRcdGlkPXt0aGlzLnByb3BzLndvcmtvcmRlcn1cblx0XHRcdFx0XHRcdG1vZGU9e3RoaXMuc3RhdGUuZm9ybU1vZGV9XG5cdFx0XHRcdFx0XHRpdGVtPXtpdGVtfVxuXHRcdFx0XHRcdFx0ZGF0ZT17ZmFsc2V9XG5cdFx0XHRcdFx0XHR2aW5leWFyZD17ZmFsc2V9XG5cdFx0XHRcdFx0XHRpdGVtQ2hhbmdlPXtcblx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24oY29weSl7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7ZWRpdEl0ZW06Y29weX0pXG5cdFx0XHRcdFx0XHRcdH0uYmluZCh0aGlzKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y3JlYXRlPXtcblx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24oY29weSl7XG5cdFx0XHRcdFx0XHRcdFx0Y29weS5kb2N0eXBlPVwiU3ByYXlpbmdcIjtcblx0XHRcdFx0XHRcdFx0XHRjb3B5Lndvcmtfb3JkZXI9dGhpcy5wcm9wcy53b3Jrb3JkZXI7XG5cdFx0XHRcdFx0XHRcdFx0Y29weS52aW5leWFyZD10aGlzLnByb3BzLnZpbmV5YXJkO1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMudGFza3NUb29sLmNyZWF0ZShjb3B5KTtcblx0XHRcdFx0XHRcdFx0XHQkKCcjJyt0aGlzLm1vZGFsSWQpLm1vZGFsKCd0b2dnbGUnKTtcblx0XHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlZGl0PXtcblx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24oY29weSl7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy50YXNrc1Rvb2wudXBkYXRlKGNvcHkpO1xuXHRcdFx0XHRcdFx0XHRcdCQoJyMnK3RoaXMubW9kYWxJZCkubW9kYWwoJ3RvZ2dsZScpO1xuXHRcdFx0XHRcdFx0XHR9LmJpbmQodGhpcylcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGRlbGV0ZT17XG5cdFx0XHRcdFx0XHRcdGZ1bmN0aW9uKGNvcHkpe1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMudGFza3NUb29sLmRlbGV0ZShjb3B5KTtcblx0XHRcdFx0XHRcdFx0XHQkKCcjJyt0aGlzLm1vZGFsSWQpLm1vZGFsKCd0b2dnbGUnKTtcblx0XHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpfVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFBydW5pbmc6ZnVuY3Rpb24oaXRlbSl7XG5cblx0XHRcdFx0aWYoaXRlbT09PXVuZGVmaW5lZCl7XG5cdFx0XHRcdFx0cmV0dXJuIChcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdDxQcnVuaW5nRm9ybVxuXHRcdFx0XHRcdFx0XHRpZD1cImNyZWF0ZVNwcmF5RW50cnlcIlxuXHRcdFx0XHRcdFx0XHRjcmVhdGVTcHJheUVudHJ5PXtmdW5jdGlvbigpe319XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fS5iaW5kKHRoaXMpXG5cdFx0fTtcblxuXHRcdHJldHVybiBmb3Jtc09ialt0aGlzLnN0YXRlLmZvcm1TdGF0ZV0odGhpcy5zdGF0ZS5lZGl0SXRlbSk7XG4gIFx0fVxuXHRyZW5kZXIoKXtcblx0XHR2YXIgZmllbGRzU3ByYXk9W1x0XHRcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJidXR0b25cIixcblx0XHRcdFx0dHlwZTpcInN1Ym1pdFwiLFxuXHRcdFx0XHR2YWx1ZTpcIkNyZWF0ZSBTcHJheWluZyBFbnRyeVwiLFxuXHRcdFx0XHRjbGFzc05hbWU6XCJidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIsXG5cdFx0XHRcdG9uQ2xpY2s6dGhpcy5zdWJtaXRcblx0XHRcdH1cblx0XHRdXG5cdFx0dmFyIHRhc2tzPXRoaXMucmVuZGVyVGFza3MoKTtcblx0XHR2YXIgZm9ybT10aGlzLmdldEZvcm0oKTtcblx0XHR2YXIgbGFibGU9XCJDcmVhdGUgTmV3IFRhc2tcIjtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nJz5cblx0XHRcdHt0YXNrc31cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hlY2tib3ggcm93IGFkZGJ1dHRvblwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImVkaXRcIj4gXG5cdFx0XHRcdFx0PGJ1dHRvbiBcblx0XHRcdFx0XHRcdHR5cGU9XCJidXR0b25cIiBcblx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdCBpbmxpbmUtdGFza1wiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLm1vZGFsTmV3VGFza31cblx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLXBsdXMgXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPiBBZGQgVGFza1xuXHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8TW9kYWwgXG5cdFx0XHRcdFx0aWQ9e3RoaXMubW9kYWxJZH0gXG5cdFx0XHRcdFx0c3VibWl0VGV4dD1cIlN1Ym1pdFwiIFxuXHRcdFx0XHRcdHRpdGxlPXtsYWJsZX1cblx0XHRcdFx0XHRzdWJtaXQ9e2ZhbHNlfVxuXHRcdFx0XHRcdD5cblx0XHRcdFx0XHR7Zm9ybX1cblx0XHRcdFx0PC9Nb2RhbD5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuXG4iLCJpbXBvcnQgQWNvcmRpYW5Db250ZW50IGZyb20gJy4vYWNvcmRpYW5Db250ZW50J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY29yZGlhbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYW5lbC1ncm91cFwiIGlkPXt0aGlzLnByb3BzLmlkfSByb2xlPVwidGFibGlzdFwiIGFyaWEtbXVsdGlzZWxlY3RhYmxlPVwidHJ1ZVwiPlxuXHRcdFx0XHR7IHRoaXMucHJvcHMuY2hpbGRyZW4gfVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjb3JkaWFuQ29udGVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnJlbmRlckhlYWQgPSB0aGlzLnJlbmRlckhlYWQuYmluZCh0aGlzKTtcblx0fVxuXHRyZW5kZXJIZWFkKGlkKXtcblxuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtaGVhZGluZ1wiIFxuXHRcdFx0XHRyb2xlPVwidGFiXCIgXG5cdFx0XHRcdG9uQ2xpY2s9e1xuXHRcdFx0XHRcdGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhpZCk7XG5cdFx0XHRcdFx0XHQkKCcjJyt0aGlzLnByb3BzLnBhcmVudElkKycgLmFjb3JkaWFuLWNvbnRlbnQuaW4nKS5ub3QoJyMnK2lkKS5jb2xsYXBzZSgnaGlkZScpO1xuXHRcdFx0XHRcdFx0JCgnIycraWQpLmNvbGxhcHNlKCd0b2dnbGUnKTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcylcblx0XHRcdFx0fVxuXHRcdFx0XHQ+XG5cdFx0XHRcdDxoNCBjbGFzc05hbWU9XCJwYW5lbC10aXRsZVwiPlxuXHRcdFx0XHRcdDxhIHJvbGU9XCJidXR0b25cIiBkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCIgZGF0YS1wYXJlbnQ9eycjJyt0aGlzLnByb3BzLnBhcmVudElkfSBhcmlhLWV4cGFuZGVkPXsodGhpcy5wcm9wcy5hY3RpdmUpPyB0cnVlOmZhbHNlfSAgPlxuXHRcdFx0ICBcdFx0XHR7dGhpcy5wcm9wcy50aXRsZX1cblx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdDwvaDQ+XG5cdFx0XHRcdHt0aGlzLnByb3BzLmV4dHJhSGVhZH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dmFyIGlkID10aGlzLnByb3BzLmlkO1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsIHBhbmVsLWRlZmF1bHRcIj5cblx0XHRcdFx0e3RoaXMucmVuZGVySGVhZChpZCl9XG5cdFx0XHRcdDxkaXYgaWQ9e2lkfSBcblx0XHRcdFx0XHRjbGFzc05hbWU9eyh0aGlzLnByb3BzLmFjdGl2ZSk/IFwiYWNvcmRpYW4tY29udGVudCBwYW5lbC1jb2xsYXBzZSBjb2xsYXBzZSBpblwiOlwiYWNvcmRpYW4tY29udGVudCBwYW5lbC1jb2xsYXBzZSBjb2xsYXBzZVwifSBcblx0XHRcdFx0XHRyb2xlPVwidGFicGFuZWxcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWJvZHlcIj5cblx0XHRcdFx0XHRcdHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG4gIFx0XHQpO1xuXHR9XG59XG4iLCIvKiBmb3JtcyAqL1xuLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5cblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5zdWJtaXQ9dGhpcy5zdWJtaXQuYmluZCh0aGlzKTtcblx0fVxuXHRzdWJtaXQoZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMucHJvcHMuc3VibWl0KGUpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHZhciBmb3JtPVtdO1xuXHRcdHZhciBmb3JtVHlwZXM9e1xuXHRcdFx0c2VsZWN0XHQ6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHR2YXIgb3B0aW5hbD1bXCJ2YWx1ZVwiLFwibGFibGVcIixcIm9wdGlvbnNcIixcImNsYXNzTmFtZVwiLFwicmVhZG9ubHlcIixcImRpc2FibGVcIixcInJlcXVpcmVcIl07XG5cdFx0XHRcdHZhciBwcm9wcz1wcy5pbml0UHJvcHMob3B0aW5hbCxpdGVtKTtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8U2VsZWN0XG5cdFx0XHRcdFx0XHRrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9XG5cdFx0XHRcdFx0XHR2YWx1ZT17cHJvcHMudmFsdWV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e3Byb3BzLmNsYXNzTmFtZX1cblx0XHRcdFx0XHRcdGxhYmxlPXtwcm9wcy5sYWJsZX1cblx0XHRcdFx0XHRcdG9wdGlvbnM9e3Byb3BzLm9wdGlvbnN9XG5cdFx0XHRcdFx0XHRyZWFkT25seT17cHJvcHMucmVhZG9ubHl9XG5cdFx0XHRcdFx0XHRkaXNhYmxlZD17cHJvcHMuZGlzYWJsZWR9XG5cdFx0XHRcdFx0XHRyZXF1aXJlZD17cHJvcHMucmVxdWlyZWR9XG5cdFx0XHRcdFx0XHRpbnB1dENoYW5nZWQ9e2Z1bmN0aW9uKGUpe2l0ZW0ub25DaGFuZ2UoZSk7fX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0Y2hlY2sgOiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJjaGVja1wiKTtcblx0XHRcdFx0dmFyIHByb3BzPVtcInZhbHVlXCIsXCJsYWJsZVwiLFwiY2xhc3NOYW1lXCIsXCJyZWFkb25seVwiLFwiZGlzYWJsZVwiLFwicmVxdWlyZVwiLFwidmFsdWVcIl07XG5cdFx0XHRcdHByb3BzPXBzLmluaXRQcm9wcyhwcm9wcyxpdGVtKTtcblxuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxDaGVja1xuXHRcdFx0XHRcdFx0a2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fVxuXHRcdFx0XHRcdFx0dmFsdWU9e3Byb3BzLnZhbHVlfVxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXtwcm9wcy5jbGFzc05hbWV9XG5cdFx0XHRcdFx0XHRsYWJsZT17cHJvcHMubGFibGV9XG5cdFx0XHRcdFx0XHRyZWFkT25seT17cHJvcHMucmVhZG9ubHl9XG5cdFx0XHRcdFx0XHRkaXNhYmxlZD17cHJvcHMuZGlzYWJsZWR9XG5cdFx0XHRcdFx0XHRyZXF1aXJlZD17cHJvcHMucmVxdWlyZWR9XG5cdFx0XHRcdFx0XHRpbnB1dENoYW5nZWQ9e2Z1bmN0aW9uKGUpe2l0ZW0ub25DaGFuZ2UoZSk7fX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXG5cdFx0XHR0ZXh0YXJlYSA6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHR2YXIgcHJvcHM9W1widmFsdWVcIixcImxhYmxlXCIsXCJjbGFzc05hbWVcIixcInJlYWRvbmx5XCIsXCJkaXNhYmxlXCIsXCJyZXF1aXJlXCIsXCJ2YWx1ZVwiXTtcblx0XHRcdFx0cHJvcHM9cHMuaW5pdFByb3BzKHByb3BzLGl0ZW0pO1xuXG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PFRleHRhcmVhXG5cdFx0XHRcdFx0XHRrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9XG5cdFx0XHRcdFx0XHR2YWx1ZT17cHJvcHMudmFsdWV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e3Byb3BzLmNsYXNzTmFtZX1cblx0XHRcdFx0XHRcdGxhYmxlPXtwcm9wcy5sYWJsZX1cblx0XHRcdFx0XHRcdHJlYWRPbmx5PXtwcm9wcy5yZWFkb25seX1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXtwcm9wcy5kaXNhYmxlZH1cblx0XHRcdFx0XHRcdHJlcXVpcmVkPXtwcm9wcy5yZXF1aXJlZH1cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKTt9fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRpbnB1dCBcdDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciB0eXBlID0gKGl0ZW0udHlwZSA9PT0gdW5kZWZpbmVkKSA/IFwidGV4dFwiOiBpdGVtLnR5cGU7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IChpdGVtLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS52YWx1ZTtcblx0XHRcdFx0dmFyIHBsYWNlaG9sZGVyID0gKGl0ZW0ucGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnBsYWNlaG9sZGVyO1xuXHRcdFx0XHR2YXIgbGFibGUgPSAoaXRlbS5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ubGFibGU7XG5cdFx0XHRcdHZhciBjbGFzc05hbWUgPSAoaXRlbS5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmNsYXNzTmFtZTtcblx0XHRcdFx0dmFyIHJlYWRvbmx5ID0gKGl0ZW0ucmVhZG9ubHkgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnJlYWRvbmx5O1xuXHRcdFx0XHR2YXIgZGlzYWJsZWQgPSAoaXRlbS5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uZGlzYWJsZWQ7XG5cdFx0XHRcdHZhciByZXF1aXJlZCA9IChpdGVtLnJlcXVpcmVkID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5yZXF1aXJlZDtcblx0XHRcdFx0XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PElucHV0XG5cdFx0XHRcdFx0XHRrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9IFxuXHRcdFx0XHRcdFx0dHlwZT17dHlwZX1cblx0XHRcdFx0XHRcdHZhbHVlPXt2YWx1ZX1cblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cblx0XHRcdFx0XHRcdGxhYmxlPXtsYWJsZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0cmVhZG9ubHk9e3JlYWRvbmx5fVxuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ9e2Rpc2FibGVkfVxuXHRcdFx0XHRcdFx0cmVxdWlyZWQ9e3JlcXVpcmVkfVxuXHRcdFx0XHRcdFx0aW5wdXRDaGFuZ2VkPXtmdW5jdGlvbihlKXtpdGVtLm9uQ2hhbmdlKGUpfX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0bGFibGUgXHQ6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHRyZXR1cm4gKCAgXG4gICAgXHRcdFx0XHQ8bGFiZWwga2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fSA+e2l0ZW0ubGFibGV9PC9sYWJlbD5cblxuICAgIFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRyYWRpb1x0OiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0cmV0dXJuICg8ZGl2PjwvZGl2Pik7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRoZWFkZXI6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHRyZXR1cm4oPGgzIGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH0gPntpdGVtLmxhYmxlfTwvaDM+KVxuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0ZGF0ZTogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IChpdGVtLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS52YWx1ZTtcblx0XHRcdFx0dmFyIGxhYmxlID0gKGl0ZW0ubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmxhYmxlO1xuXHRcdFx0XHR2YXIgcGxhY2Vob2xkZXIgPSAoaXRlbS5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucGxhY2Vob2xkZXI7XG5cdFx0XHRcdHZhciBjbGFzc05hbWUgPSAoaXRlbS5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmNsYXNzTmFtZTtcblx0XHRcdFx0dmFyIHJlYWRvbmx5ID0gKGl0ZW0ucmVhZG9ubHkgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnJlYWRvbmx5O1xuXHRcdFx0XHR2YXIgZGlzYWJsZWQgPSAoaXRlbS5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uZGlzYWJsZWQ7XG5cdFx0XHRcdHZhciByZXF1aXJlZCA9IChpdGVtLnJlcXVpcmVkID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5yZXF1aXJlZDtcblx0XHRcdFx0cmV0dXJuKFxuXHRcdFx0XHRcdDxEYXRlSW5wdXRcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH0gXG5cdFx0XHRcdFx0XHR2YWx1ZT17dmFsdWV9XG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG5cdFx0XHRcdFx0XHRsYWJsZT17bGFibGV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e2NsYXNzTmFtZX1cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKX19XG5cdFx0XHRcdFx0XHRyZWFkb25seT17cmVhZG9ubHl9XG5cdFx0XHRcdFx0XHRkaXNhYmxlZD17ZGlzYWJsZWR9XG5cdFx0XHRcdFx0XHRyZXF1aXJlZD17cmVxdWlyZWR9XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGF1dG9Db21wbGV0ZTogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IChpdGVtLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS52YWx1ZTtcblx0XHRcdFx0dmFyIGxhYmxlID0gKGl0ZW0ubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmxhYmxlO1xuXHRcdFx0XHR2YXIgcGxhY2Vob2xkZXIgPSAoaXRlbS5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucGxhY2Vob2xkZXI7XG5cdFx0XHRcdHZhciBjbGFzc05hbWUgPSAoaXRlbS5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmNsYXNzTmFtZTtcblx0XHRcdFx0dmFyIHJlYWRvbmx5ID0gKGl0ZW0ucmVhZG9ubHkgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnJlYWRvbmx5O1xuXHRcdFx0XHR2YXIgZGlzYWJsZWQgPSAoaXRlbS5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uZGlzYWJsZWQ7XG5cdFx0XHRcdHZhciByZXF1aXJlZCA9IChpdGVtLnJlcXVpcmVkID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5yZXF1aXJlZDtcblxuXHRcdFx0XHRyZXR1cm4oXG5cdFx0XHRcdFx0PEF3ZXNvbXBsZXRlSW5wdXRcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH1cblx0XHRcdFx0XHRcdGRvY3R5cGU9e2l0ZW0uZG9jdHlwZX1cblx0XHRcdFx0XHRcdGRvY3ZhbHVlPXtpdGVtLmRvY3ZhbHVlfVxuXHRcdFx0XHRcdFx0ZG9jbGFibGU9e2l0ZW0uZG9jbGFibGV9XG5cdFx0XHRcdFx0XHR2YWx1ZT17dmFsdWV9XG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG5cdFx0XHRcdFx0XHRsYWJsZT17bGFibGV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e2NsYXNzTmFtZX1cblx0XHRcdFx0XHRcdHJlYWRvbmx5PXtyZWFkb25seX1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXtkaXNhYmxlZH1cblx0XHRcdFx0XHRcdHJlcXVpcmVkPXtyZXF1aXJlZH1cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKX19XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGJ1dHRvbjogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IChpdGVtLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS52YWx1ZTtcblx0XHRcdFx0dmFyIGNsYXNzTmFtZSA9IChpdGVtLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uY2xhc3NOYW1lO1xuXHRcdFx0XHR2YXIgZGlzYWJsZWQgPSAoaXRlbS5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uZGlzYWJsZWQ7XG5cdFx0XHRcdHJldHVybihcblx0XHRcdFx0XHQ8QnV0dG9uXG5cdFx0XHRcdFx0XHRrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9XG5cdFx0XHRcdFx0XHR2YWx1ZT17dmFsdWV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e2NsYXNzTmFtZX1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXtkaXNhYmxlZH1cblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2Z1bmN0aW9uKGUpe2l0ZW0ub25DbGljayhlKX19XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKVxuXHRcdH1cblx0XHR0aGlzLnByb3BzLmZpZWxkcy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXHRcdFx0aWYoJC5pc0VtcHR5T2JqZWN0KGl0ZW0pKXtcblxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGl0ZW0uZmllbGQpO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhpbmRleCk7XG5cdFx0XHRcdGZvcm0ucHVzaChmb3JtVHlwZXNbaXRlbS5maWVsZF0oaXRlbSxpbmRleCkpO1xuXHRcdFx0fVxuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0Ly9mb3IodmFyIHg9MDsgeCA8IHRoaXMucHJvcHMuZmVpbGRzLmxlbmd0aCB4Kys7IClcblx0XHR2YXIgY2xhc3NOYW1lID0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJyZWFjdC1mb3JtXCI6IFwiZm9ybS1ob3Jpem9udGFsIHJlYWN0LWZvcm0gXCIrdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGZvcm0gY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxuXHRcdFx0XHQ8ZmllbGRzZXQ+XG5cdFx0XHRcdHt0aGlzLnByb3BzLmJlZm9yZX1cblx0XHRcdFx0e2Zvcm19XG5cdFx0XHRcdHsgdGhpcy5wcm9wcy5jaGlsZHJlbn1cblx0XHRcdFx0PC9maWVsZHNldD5cblx0XHRcdDwvZm9ybT5cblx0XHQpO1xuXHR9XG59XG5cblxuXG5leHBvcnQgY2xhc3MgU2VsZWN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuaW5wdXRDaGFuZ2U9dGhpcy5pbnB1dENoYW5nZS5iaW5kKHRoaXMpO1xuXG5cdH1cblx0aW5wdXRDaGFuZ2UoZSl7XG5cdFx0dGhpcy5wcm9wcy5pbnB1dENoYW5nZWQoKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMubGFibGUgPSAodGhpcy5wcm9wcy5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMubGFibGU7XG5cdFx0dGhpcy5vcHRpb25zID0gKHRoaXMucHJvcHMub3B0aW9ucyA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMub3B0aW9ucztcblx0XHR0aGlzLmNsYXNzTmFtZT0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJmb3JtLWNvbnRyb2xcIjogXCJmb3JtLWNvbnRyb2xcIiArdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0dGhpcy5kaXNhYmxlZCA9ICh0aGlzLnByb3BzLmRpc2FibGVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PWZhbHNlfHx0aGlzLnByb3BzLmRpc2FibGVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVxdWlyZWQgPSAodGhpcy5wcm9wcy5yZXF1aXJlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1mYWxzZXx8dGhpcy5wcm9wcy5yZXF1aXJlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlYWRvbmx5ID0gKHRoaXMucHJvcHMucmVhZG9ubHkgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZWFkb25seT09ZmFsc2V8fHRoaXMucHJvcHMucmVhZG9ubHk9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dmFyIG9wdGlvbnM9W107XG5cdFx0dmFyIG91dHB1dD1cIlwiO1xuXG5cblx0XHR0aGlzLm9wdGlvbnMubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblx0XHRcdHZhciBncm91cD1bXTtcblx0XHRcdGlmKGl0ZW0uZ3JvdXAgIT09IHVuZGVmaW5lZCl7XG5cdFx0XHRcdGl0ZW0ub3B0aW9ucy5tYXAoZnVuY3Rpb24oaW5uZXJJdGVtLGluZGV4KXtcblx0XHRcdFx0XHRncm91cC5wdXNoKCA8b3B0aW9uIGtleT17aXRlbS5ncm91cCtpbmRleH0+IHtpbm5lckl0ZW19IDwvb3B0aW9uPilcblx0XHRcdFx0fSlcblx0XHRcdFx0b3B0aW9ucy5wdXNoKDxvcHRncm91cCBrZXk9e2l0ZW0uZ3JvdXB9IGxhYmVsPXtpdGVtLmdyb3VwfT4ge2dyb3VwfTwvb3B0Z3JvdXA+KTtcblxuXHRcdFx0fVxuXHRcdFx0ZWxzZXtcblx0XHRcdFx0b3B0aW9ucy5wdXNoKCA8b3B0aW9uIGtleT17aW5kZXh9PiB7aXRlbX0gPC9vcHRpb24+KVxuXHRcdFx0fVxuXG5cdFx0XHRcblx0XHR9LmJpbmQodGhpcykpO1xuXG5cdFx0dmFyIHNlbGVjdD0oXG5cdFx0XHQ8c2VsZWN0IFxuXHRcdFx0XHRjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfSBcblx0XHRcdFx0dmFsdWU9e3RoaXMudmFsdWV9IFxuXHRcdFx0XHRvbkNoYW5nZT17dGhpcy5wcm9wcy5pbnB1dENoYW5nZWR9XG5cdFx0XHRcdGRpc2FibGVkPXt0aGlzLmRpc2FibGVkfVxuXHQgICAgICAgICAgXHRyZWFkT25seT17dGhpcy5yZWFkb25seX1cblx0ICAgICAgICAgIFx0cmVxdWlyZWQ9e3RoaXMucmVxdWlyZWR9XG5cdFx0XHRcdD5cblx0XHRcdFx0e29wdGlvbnN9XG5cdFx0XHQ8L3NlbGVjdD5cblx0XHQpO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMubGFibGUgIT09IHVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLmxhYmxlID09XCJcIil7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBcIj5cblx0XHQgICAgXHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD5cblx0XHQgICAgXHRcdDxkaXY+XG5cdFx0ICAgIFx0XHR7c2VsZWN0fVxuXHRcdCAgICBcdFx0PC9kaXY+XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdCAgICAgIFx0XHR7c2VsZWN0fVxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5pbnB1dENoYW5nZT10aGlzLmlucHV0Q2hhbmdlLmJpbmQodGhpcyk7XG5cblx0fVxuXHRpbnB1dENoYW5nZShlKXtcblx0XHR0aGlzLnByb3BzLmlucHV0Q2hhbmdlZChlKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnR5cGUgPSAodGhpcy5wcm9wcy50eXBlID09PSB1bmRlZmluZWQpID8gXCJ0ZXh0XCI6IHRoaXMucHJvcHMudHlwZTtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMucGxhY2Vob2xkZXIgPSAodGhpcy5wcm9wcy5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXI7XG5cdFx0dGhpcy5sYWJsZSA9ICh0aGlzLnByb3BzLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5sYWJsZTtcblx0XHR2YXIgb3V0cHV0PVwiXCI7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jb250cm9sXCI6IFwiZm9ybS1jb250cm9sIFwiICt0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHR0aGlzLmRpc2FibGVkID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5kaXNhYmxlZD09ZmFsc2V8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZXF1aXJlZCA9ICh0aGlzLnByb3BzLnJlcXVpcmVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVxdWlyZWQ9PWZhbHNlfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVhZG9ubHkgPSAodGhpcy5wcm9wcy5yZWFkb25seSA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1mYWxzZXx8dGhpcy5wcm9wcy5yZWFkb25seT09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR2YXIgaW5wdXQ9KCBcblx0XHRcdDxpbnB1dCBcblx0XHRcdFx0dHlwZT17dGhpcy50eXBlfSBcblx0XHRcdFx0Y2xhc3NOYW1lPXt0aGlzLmNsYXNzTmFtZX0gXG5cdFx0XHRcdHBsYWNlaG9sZGVyPXt0aGlzLnBsYWNlaG9sZGVyfSBcblx0XHRcdFx0dmFsdWU9e3RoaXMudmFsdWV9XG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnByb3BzLmlucHV0Q2hhbmdlZH1cblx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdCAgICAgICAgICBcdHJlYWRPbmx5PXt0aGlzLnJlYWRvbmx5fVxuXHQgICAgICAgICAgXHRyZXF1aXJlZD17dGhpcy5yZXF1aXJlZH1cblx0XHRcdC8+XG5cdFx0KTtcblxuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy5sYWJsZSA9PVwiXCIpe1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgXCI+XG5cdFx0ICAgIFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbFwiPnt0aGlzLnByb3BzLmxhYmxlfTwvbGFiZWw+XG5cdFx0ICAgIFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIlwiPlxuXHRcdCAgICAgIFx0XHRcdHtpbnB1dH1cblx0XHQgICAgXHRcdDwvZGl2PlxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHQgICAgICBcdFx0e2lucHV0fVxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgQ2hlY2sgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5pbnB1dENoYW5nZT10aGlzLmlucHV0Q2hhbmdlLmJpbmQodGhpcyk7XG5cblx0fVxuXHRpbnB1dENoYW5nZShlKXtcblx0XHR0aGlzLnByb3BzLmlucHV0Q2hhbmdlZChlKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyAwIDogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLnBsYWNlaG9sZGVyID0gKHRoaXMucHJvcHMucGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnBsYWNlaG9sZGVyO1xuXHRcdHRoaXMubGFibGUgPSAodGhpcy5wcm9wcy5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMubGFibGU7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jaGVjay1pbnB1dFwiOiBcImZvcm0tY2hlY2staW5wdXQgXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlcXVpcmVkID0gKHRoaXMucHJvcHMucmVxdWlyZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZXF1aXJlZD09ZmFsc2V8fHRoaXMucHJvcHMucmVxdWlyZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZWFkb25seSA9ICh0aGlzLnByb3BzLnJlYWRvbmx5ID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVhZG9ubHk9PWZhbHNlfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdFxuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblx0XHR2YXIgaW5wdXQ9KCBcblx0XHRcdDxpbnB1dCBcblx0XHRcdFx0dHlwZT1cImNoZWNrYm94XCIgXG5cdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9IFxuXHRcdFx0XHR2YWx1ZT17dGhpcy52YWx1ZX1cblx0XHRcdFx0b25DaGFuZ2U9e3RoaXMucHJvcHMuaW5wdXRDaGFuZ2VkfVxuXHRcdFx0XHRkaXNhYmxlZD17dGhpcy5kaXNhYmxlZH1cblx0ICAgICAgICAgIFx0cmVhZE9ubHk9e3RoaXMucmVhZG9ubHl9XG5cdCAgICAgICAgICBcdHJlcXVpcmVkPXt0aGlzLnJlcXVpcmVkfVxuXHRcdFx0Lz5cblx0XHQpO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMubGFibGUgIT09IHVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLmxhYmxlID09XCJcIil7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHQgICAgXHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+XG5cdFx0ICAgICAgXHRcdFx0e2lucHV0fXt0aGlzLnByb3BzLmxhYmxlfVxuXHRcdCAgICAgIFx0XHQ8L2xhYmVsPlxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0ICAgICAgXHRcdHtpbnB1dH1cblx0XHQgIFx0XHQ8L2Rpdj5cblx0XHQgIFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbmV4cG9ydCBjbGFzcyBUZXh0YXJlYSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLmlucHV0Q2hhbmdlPXRoaXMuaW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcblxuXHR9XG5cdGlucHV0Q2hhbmdlKGUpe1xuXHRcdHRoaXMucHJvcHMuaW5wdXRDaGFuZ2VkKGUpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHRoaXMudmFsdWUgPSAodGhpcy5wcm9wcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IDAgOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMucGxhY2Vob2xkZXIgPSAodGhpcy5wcm9wcy5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXI7XG5cdFx0dGhpcy5sYWJsZSA9ICh0aGlzLnByb3BzLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5sYWJsZTtcblx0XHR0aGlzLmNsYXNzTmFtZT0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJmb3JtLWNvbnRyb2xcIjogXCJmb3JtLWNvbnRyb2wgXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlcXVpcmVkID0gKHRoaXMucHJvcHMucmVxdWlyZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZXF1aXJlZD09ZmFsc2V8fHRoaXMucHJvcHMucmVxdWlyZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZWFkb25seSA9ICh0aGlzLnByb3BzLnJlYWRvbmx5ID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVhZG9ubHk9PWZhbHNlfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucm93cyA9ICh0aGlzLnByb3BzLnJvd3MgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yb3dzPT1cIlwiKSA/IDM6IHRoaXMucHJvcHMucm93cztcblx0XHR2YXIgb3V0cHV0PVwiXCI7XG5cdFx0dmFyIGlucHV0PSggXG5cdFx0XHQ8dGV4dGFyZWEgXG5cdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9IFxuXHRcdFx0XHR2YWx1ZT17dGhpcy52YWx1ZX1cblx0XHRcdFx0b25DaGFuZ2U9e3RoaXMucHJvcHMuaW5wdXRDaGFuZ2VkfVxuXHRcdFx0XHRyb3dzPXt0aGlzLnJvd3N9XG5cdFx0XHRcdGRpc2FibGVkPXt0aGlzLmRpc2FibGVkfVxuXHQgICAgICAgICAgXHRyZWFkT25seT17dGhpcy5yZWFkb25seX1cblx0ICAgICAgICAgIFx0cmVxdWlyZWQ9e3RoaXMucmVxdWlyZWR9XG5cdFx0XHQvPlxuXHRcdCk7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkIHx8IHRoaXMucHJvcHMubGFibGUgPT1cIlwiKXtcblx0XHRcdG91dHB1dCA9IChcblx0XHRcdFx0PGRpdj5cblx0XHQgICAgXHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+XG5cdFx0ICAgICAgXHRcdFx0e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD57aW5wdXR9XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiXCI+XG5cdFx0ICAgICAgXHRcdHtpbnB1dH1cblx0XHQgIFx0XHQ8L2Rpdj5cblx0XHQgIFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbmV4cG9ydCBjbGFzcyBEYXRlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5kYXRlSW5pdD10aGlzLmRhdGVJbml0LmJpbmQodGhpcyk7XG5cdH1cblx0ZGF0ZUluaXQoKXtcblx0XHQkKCcuaW5wdXQtZ3JvdXAuZGF0ZSAuZGF0ZXBpY2snKS5kYXRlcGlja2VyKHtcblx0XHQgICAgdG9kYXlCdG46IFwibGlua2VkXCIsXG5cdFx0ICAgIG9yaWVudGF0aW9uOiBcImJvdHRvbSByaWdodFwiLFxuXHRcdCAgICBhdXRvY2xvc2U6IHRydWUsXG5cdFx0ICAgIHRvZGF5SGlnaGxpZ2h0OiB0cnVlXG5cdFx0fSkub24oJ2NoYW5nZURhdGUnLCBmdW5jdGlvbihlKSB7XG5cdFx0XHR2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2lucHV0JywgeyBidWJibGVzOiB0cnVlIH0pO1xuXHRcdFx0ZS50YXJnZXQuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cdFx0fSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLnBsYWNlaG9sZGVyID0gKHRoaXMucHJvcHMucGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnBsYWNlaG9sZGVyO1xuXHRcdHRoaXMubGFibGUgPSAodGhpcy5wcm9wcy5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMubGFibGU7XG5cdFx0dGhpcy5kaXNhYmxlZCA9ICh0aGlzLnByb3BzLmRpc2FibGVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PWZhbHNlfHx0aGlzLnByb3BzLmRpc2FibGVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVxdWlyZWQgPSAodGhpcy5wcm9wcy5yZXF1aXJlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1mYWxzZXx8dGhpcy5wcm9wcy5yZXF1aXJlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlYWRvbmx5ID0gKHRoaXMucHJvcHMucmVhZG9ubHkgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZWFkb25seT09ZmFsc2V8fHRoaXMucHJvcHMucmVhZG9ubHk9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cblxuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblx0XHR0aGlzLmNsYXNzTmFtZT0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJmb3JtLWNvbnRyb2wgZGF0ZXBpY2tcIjogXCJmb3JtLWNvbnRyb2wgZGF0ZXBpY2sgXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHZhciBpbnB1dD0oIFxuXHRcdFx0PGlucHV0XG5cdFx0XHRcdHJlZj17dGhpcy5kYXRlSW5pdH0gXG5cdFx0XHRcdHR5cGU9XCJ0ZXh0XCJcblx0XHRcdFx0Y2xhc3NOYW1lPXt0aGlzLmNsYXNzTmFtZX1cblx0XHRcdFx0cGxhY2Vob2xkZXI9e3RoaXMucGxhY2Vob2xkZXJ9ICBcblx0XHRcdFx0dmFsdWU9e3RoaXMudmFsdWV9IFxuXHRcdFx0XHRvbkNoYW5nZT17dGhpcy5wcm9wcy5pbnB1dENoYW5nZWR9XG5cdFx0XHRcdGRpc2FibGVkPXt0aGlzLmRpc2FibGVkfVxuXHQgICAgICAgICAgXHRyZWFkT25seT17dGhpcy5yZWFkb25seX1cblx0ICAgICAgICAgIFx0cmVxdWlyZWQ9e3RoaXMucmVxdWlyZWR9XG5cdFx0XHRcdC8+XG5cblx0XHQpO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMubGFibGUgIT09IHVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLmxhYmxlID09XCJcIil7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0ICBcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG5cdFx0ICBcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbFwiPnt0aGlzLnByb3BzLmxhYmxlfTwvbGFiZWw+XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwIGRhdGVcIj5cblx0XHRcdFx0XHRcdHtpbnB1dH1cblx0XHRcdFx0ICBcdFx0PHNwYW4gY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAtYWRkb25cIj5cblx0XHRcdFx0ICBcdFx0XHQ8aSBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLXRoXCI+PC9pPlxuXHRcdFx0XHQgIFx0XHQ8L3NwYW4+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cCBkYXRlXCI+XG5cblx0XHRcdFx0XHRcdHtpbnB1dH1cblx0XHRcdFx0ICBcdFx0PHNwYW4gY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAtYWRkb25cIj5cblx0XHRcdFx0ICBcdFx0XHQ8aSBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLXRoXCI+PC9pPlxuXHRcdFx0XHQgIFx0XHQ8L3NwYW4+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHQgIFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbmV4cG9ydCBjbGFzcyBBd2Vzb21wbGV0ZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXG5cdFx0LyogICBEbyB0aGUgYmluZCB0aGluZyAgKi9cblx0XHR0aGlzLmNyZWF0ZUxpc3Q9dGhpcy5jcmVhdGVMaXN0LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5kb2NDaGFuZ2VkPXRoaXMuZG9jQ2hhbmdlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY29tcG9uZW50RGlkTW91bnQ9dGhpcy5jb21wb25lbnREaWRNb3VudC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuaW5wdXRDaGFuZ2U9dGhpcy5pbnB1dENoYW5nZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuYXV0b2NvbXBsZXRlPXRoaXMuYXV0b2NvbXBsZXRlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jb21wb25lbnRXaWxsVW5tb3VudD10aGlzLmNvbXBvbmVudFdpbGxVbm1vdW50LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5yZWZDYWxsPXRoaXMucmVmQ2FsbC5iaW5kKHRoaXMpO1xuXHRcdFxuXHRcdC8vdGhpcy53b3Jrb3JkZXJPYmo9dGhpcy5vblN0YXR1c0NoYW5nZWQuYmluZCh0aGlzKTtcblx0XHQvKiAgICAgICAgICBlbmQgICAgICAgICAgKi9cblx0XHR0aGlzLml0ZW1saXN0PVtdO1xuXHRcdHRoaXMuc3RhdGU9e2l0ZW1saXN0OltdfTtcblx0XHR0aGlzLl9pc01vdW50ZWQ9ZmFsc2U7XG5cdFx0dmFyIGFyZ3M9e307XG5cdFx0dmFyIG9wdGlvbnM9e2RvY3R5cGU6dGhpcy5wcm9wcy5kb2N0eXBlfTtcblx0XHR2YXIgZmlsdGVyPXt9O1xuXHRcdGlmICh0aGlzLnByb3BzLmZpbHRlcj09dW5kZWZpbmVkIHx8IHRoaXMucHJvcHMuZmlsdGVyPT1udWxsKXtcblx0XHRcblx0XHR9ZWxzZXtcblx0XHRcdGZpbHRlcj0gdGhpcy5wcm9wcy5maWx0ZXI7XG5cdFx0fVxuXHRcdHRoaXMubGlzdFRvb2wgPSBuZXcgcHMuYXBpVG9vbChmaWx0ZXIsIG9wdGlvbnMgLHRoaXMuZG9jQ2hhbmdlZCk7XG5cdFx0aWYgKHRoaXMubGlzdFRvb2wuaXRlbXM9PT11bmRlZmluZWQgfHx0aGlzLmxpc3RUb29sLml0ZW1zPT09IDAgfHx0aGlzLmxpc3RUb29sLml0ZW1zPT09bnVsbCApe1xuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5zdGF0ZS5saXN0PXRoaXMubGlzdFRvb2wuaXRlbXM7XG5cdFx0fVxuXG5cdFx0dGhpcy5jcmVhdGVMaXN0KCk7XG5cdH1cblx0ZG9jQ2hhbmdlZCgpe1xuXHRcdHRoaXMuY3JlYXRlTGlzdCgpO1xuXHR9XG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0dGhpcy5faXNNb3VudGVkPXRydWU7XG5cdFx0dGhpcy5hdXRvY29tcGxldGUoKTtcblxuXHR9XG5cdGNyZWF0ZUxpc3QoKXtcblx0XHR0aGlzLml0ZW1saXN0PVtdO1xuXHRcdC8vbGFibGUgYW5kIHZhbHVlXG5cdFx0aWYgKHRoaXMucHJvcHMuZG9jbGFibGUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmxpc3RUb29sLml0ZW1zICE9PSB1bmRlZmluZWQgJiYgdGhpcy5saXN0VG9vbC5pdGVtcyAhPT0gbnVsbCl7XG5cdFx0XHRmb3IobGV0IGl0ZW0gb2YgdGhpcy5saXN0VG9vbC5pdGVtcyl7XG5cdFx0XHRcdHZhciB0ZW1wID1baXRlbVt0aGlzLnByb3BzLmRvY2xhYmxlXSxpdGVtW3RoaXMucHJvcHMuZG9jdmFsdWVdXTtcblx0XHRcdFx0dGhpcy5pdGVtbGlzdC5wdXNoKHRlbXApO1xuXHRcdFx0fVxuXHRcdFx0JChkb2N1bWVudCkudHJpZ2dlcignbGlzdExvYWQnICsgdGhpcy5wcm9wcy5kb2N0eXBlKTtcblx0XHR9XG5cdFx0Ly9qdXN0IGxhYmxlXG5cdFx0ZWxzZSBpZih0aGlzLmxpc3RUb29sLml0ZW1zICE9PSB1bmRlZmluZWQgJiYgdGhpcy5saXN0VG9vbC5pdGVtcyAhPT0gbnVsbCl7XG5cdFx0XHRmb3IobGV0IGl0ZW0gb2YgdGhpcy5saXN0VG9vbC5pdGVtcyl7XG5cdFx0XHRcdHRoaXMuaXRlbWxpc3QucHVzaChpdGVtW3RoaXMucHJvcHMuZG9jdmFsdWVdKTtcblx0XHRcdH1cblx0XHRcdCQoZG9jdW1lbnQpLnRyaWdnZXIoJ2xpc3RMb2FkJyArIHRoaXMucHJvcHMuZG9jdHlwZS5yZXBsYWNlKFwiIFwiLFwiXCIpKTtcblx0XHR9XG5cdH1cblx0Y29tcG9uZW50V2lsbFVubW91bnQoKXtcblx0XHQvLyBjb25zb2xlLmxvZyhcIkhFTExPXCIpO1xuXHRcdC8vIHRoaXMuYXcuZGVzdHJveSgpO1xuXHRcdC8vIGRlbGV0ZSB0aGlzLmF3O1xuXHRcdC8vIGNvbnNvbGUubG9nKFwiVEVTVFwiKTtcblx0fVxuXHRyZWZDYWxsKGlucHV0KXtcblx0XHR0aGlzLmlucHV0PWlucHV0O1xuXHR9XG5cdGF1dG9jb21wbGV0ZShpbnB1dCl7XG5cdFx0aW5wdXQ9dGhpcy5pbnB1dDtcblx0XHR2YXIgY29uZmlnPSB7XG5cdFx0XHRcdG1pbkNoYXJzOiAwLFxuXHRcdFx0XHRtYXhJdGVtczogOTksXG5cdFx0XHRcdGF1dG9GaXJzdDogdHJ1ZSxcblx0XHRcdFx0ZmlsdGVyOiBBd2Vzb21wbGV0ZS5GSUxURVJfU1RBUlRTV0lUSFxuXHRcdFx0fVxuXHRcdGlmKHRoaXMucHJvcHMuZG9jbGFibGUgIT09IHVuZGVmaW5lZCApe1xuXHRcdFx0Y29uZmlnLml0ZW09IGZ1bmN0aW9uKGl0ZW0sIGlucHV0KSB7XG5cdFx0XHRcdHZhciBkID0gaXRlbTtcblx0XHRcdFx0dmFyIGh0bWwgPSBcIjxzcGFuPlwiICsgX18oaXRlbS5sYWJlbCkrIFwiPC9zcGFuPjxicj48c3Bhbj48c21hbGw+XCIraXRlbS52YWx1ZStcIjwvc21hbGw+PC9zcGFuPlwiO1xuXHRcdFx0XHRyZXR1cm4gJCgnPGxpPjwvbGk+Jylcblx0XHRcdFx0XHQuZGF0YSgnaXRlbS5hdXRvY29tcGxldGUnLCBpdGVtKVxuXHRcdFx0XHRcdC5odG1sKCc8YT48cD4nICsgaHRtbCArICc8L3A+PC9hPicpXG5cdFx0XHRcdFx0LmdldCgwKTtcblx0XHRcdH1cblxuXHRcdH1lbHNle1xuXHRcdFx0Y29uZmlnLml0ZW09ZnVuY3Rpb24oaXRlbSwgaW5wdXQpIHtcblx0XHRcdFx0dmFyIGQgPSBpdGVtO1xuXHRcdFx0XHR2YXIgaHRtbCA9IFwiPHNwYW4+XCIgKyBfXyhpdGVtKSsgXCI8L3NwYW4+XCI7XG5cdFx0XHRcdHJldHVybiAkKCc8bGk+PC9saT4nKVxuXHRcdFx0XHRcdC5kYXRhKCdpdGVtLmF1dG9jb21wbGV0ZScsIGl0ZW0pXG5cdFx0XHRcdFx0Lmh0bWwoJzxhPjxwPicgKyBodG1sICsgJzwvcD48L2E+Jylcblx0XHRcdFx0XHQuZ2V0KDApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLmF3ID0gbmV3IEF3ZXNvbXBsZXRlKGlucHV0LGNvbmZpZyk7XG5cdFx0aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRcdCdhd2Vzb21wbGV0ZS1zZWxlY3Rjb21wbGV0ZScsXG5cdFx0XHRcdHRoaXMuaW5wdXRDaGFuZ2Vcblx0XHQpO1xuXHRcdCQoaW5wdXQpLmNsaWNrKCBmdW5jdGlvbigpIHtcblx0XHRcdGlmICh0aGlzLmF3LnVsLmNoaWxkTm9kZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdHRoaXMuYXcubWluQ2hhcnMgPSAwO1xuXHRcdFx0XHR0aGlzLmF3LmV2YWx1YXRlKCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmICh0aGlzLmF3LnVsLmhhc0F0dHJpYnV0ZSgnaGlkZGVuJykpIHtcblx0XHRcdFx0dGhpcy5hdy5vcGVuKCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dGhpcy5hdy5jbG9zZSgpO1xuXHRcdFx0fVxuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5hdy5saXN0PXRoaXMuaXRlbUxpc3Q7XG5cdFx0JChkb2N1bWVudCkuYmluZCgnbGlzdExvYWQnICsgdGhpcy5wcm9wcy5kb2N0eXBlLnJlcGxhY2UoXCIgXCIsXCJcIiksZnVuY3Rpb24oKXtcblx0XHRcdHRoaXMuYXcubGlzdD10aGlzLml0ZW1saXN0O1xuXHRcdH0uYmluZCh0aGlzKSk7XG5cdH1cblx0aW5wdXRDaGFuZ2UoZSl7XG5cdFx0dGhpcy5wcm9wcy5pbnB1dENoYW5nZWQoZSk7XG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnR5cGUgPSAodGhpcy5wcm9wcy50eXBlID09PSB1bmRlZmluZWQpID8gXCJ0ZXh0XCI6IHRoaXMucHJvcHMudHlwZTtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMucGxhY2Vob2xkZXIgPSAodGhpcy5wcm9wcy5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXI7XG5cdFx0dGhpcy5sYWJsZSA9ICh0aGlzLnByb3BzLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5sYWJsZTtcblx0XHR0aGlzLmRpc2FibGVkID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5kaXNhYmxlZD09ZmFsc2V8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZXF1aXJlZCA9ICh0aGlzLnByb3BzLnJlcXVpcmVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVxdWlyZWQ9PWZhbHNlfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVhZG9ubHkgPSAodGhpcy5wcm9wcy5yZWFkb25seSA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1mYWxzZXx8dGhpcy5wcm9wcy5yZWFkb25seT09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblxuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblx0XHR0aGlzLmNsYXNzTmFtZT0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJmb3JtLWNvbnRyb2wgYXdlc29tcGxldGVcIjogXCJmb3JtLWNvbnRyb2wgYXdlc29tcGxldGUgXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHZhciBpbnB1dD0oIDxpbnB1dFxuXHRcdFx0XHRcdHZhbHVlPXt0aGlzLnZhbHVlfVxuXG5cdFx0XHRcdFx0dHlwZT17dGhpcy50eXBlfSBcblx0XHRcdFx0XHRjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfSBcblx0XHRcdFx0XHRwbGFjZWhvbGRlcj17dGhpcy5wbGFjZWhvbGRlcn0gXG5cdFx0XHRcdFx0cmVmPXt0aGlzLnJlZkNhbGx9XG5cdFx0ICAgICAgICAgIFx0b25DaGFuZ2U9e3RoaXMuaW5wdXRDaGFuZ2V9XG5cdFx0ICAgICAgICAgIFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdFx0ICAgICAgICAgIFx0cmVhZE9ubHk9e3RoaXMucmVhZG9ubHl9XG5cdFx0ICAgICAgICAgIFx0cmVxdWlyZWQ9e3RoaXMucmVxdWlyZWR9XG5cdFx0ICAgICAgICAgIC8+KTtcblxuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy5sYWJsZSA9PVwiXCIpe1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgXCI+XG5cdFx0ICAgIFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbFwiPnt0aGlzLnByb3BzLmxhYmxlfTwvbGFiZWw+XG5cdFx0ICAgIFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIlwiPlxuXHRcdCAgICAgIFx0XHRcdHtpbnB1dH1cblx0XHQgICAgXHRcdDwvZGl2PlxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHQgICAgICBcdFx0e2lucHV0fVxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuZXhwb3J0IGNsYXNzIEJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy50eXBlID0gKHRoaXMucHJvcHMudHlwZSA9PT0gdW5kZWZpbmVkKSA/IFwidGV4dFwiOiB0aGlzLnByb3BzLnR5cGU7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLmRpc2FibGVkID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5kaXNhYmxlZD09ZmFsc2V8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dmFyIG91dHB1dD1cIlwiO1xuXHRcdHRoaXMuY2xhc3NOYW1lPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcImJ0blwiOiBcImJ0biBcIiArdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0dmFyIGlucHV0PSggXG5cdFx0XHQ8YnV0dG9uIFxuXHRcdFx0XHR0eXBlPXt0aGlzLnR5cGV9XG5cdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9IFxuXHRcdFx0XHR2YWx1ZT17dGhpcy52YWx1ZX1cblx0XHRcdFx0b25DbGljaz17dGhpcy5wcm9wcy5vbkNsaWNrfVxuXHRcdFx0XHRkaXNhYmxlZD17dGhpcy5kaXNhYmxlZH1cblx0XHRcdD57dGhpcy52YWx1ZX08L2J1dHRvbj5cblx0XHQpO1xuXG5cblx0XHRvdXRwdXQgPSAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0ICAgICAgXHRcdHtpbnB1dH1cblx0ICBcdFx0PC9kaXY+XG5cdCAgXHQpO1xuXG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuIiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kYWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5zdWJtaXQ9dGhpcy5zdWJtaXQuYmluZCh0aGlzKTtcblx0fVxuXHRzdWJtaXQoZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMucHJvcHMuc3VibWl0KGUpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHZhciBmb290ZXI9XCJcIjtcblx0XHRpZih0aGlzLnByb3BzLnN1Ym1pdCE9PSBmYWxzZSl7XG5cdFx0XHRmb290ZXI9KFx0XHRcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1mb290ZXJcIj5cblx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXNlY29uZGFyeVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2xvc2U8L2J1dHRvbj5cblx0XHRcdFx0XHQ8YnV0dG9uIFxuXHRcdFx0XHRcdFx0dHlwZT1cInN1Ym1pdFwiIFxuXHRcdFx0XHRcdFx0b25DbGljaz17dGhpcy5zdWJtaXR9IFxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgPlxuXHRcdFx0XHRcdFx0XHR7dGhpcy5wcm9wcy5zdWJtaXRUZXh0fVxuXHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdClcblx0XHR9XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbCBmYWRlIHRleHQtbGVmdCBwYW5lbC1kZWZhdWx0XCIgaWQ9e3RoaXMucHJvcHMuaWR9IHRhYkluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCIgYXJpYS1sYWJlbGxlZGJ5PVwiZXhhbXBsZU1vZGFsTGFiZWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2dcIiByb2xlPVwiZG9jdW1lbnRcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XG5cdFx0XHRcdFx0XHRcdDxoNCBjbGFzc05hbWU9XCJtb2RhbC10aXRsZVwiIGlkPVwiZXhhbXBsZU1vZGFsTGFiZWxcIj57dGhpcy5wcm9wcy50aXRsZX08L2g0PlxuXHRcdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBkaXNwbGF5PVwibm9uZVwiIGNsYXNzTmFtZT1cImNsb3NlIGhpZGVcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPlxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxuXHRcdFx0XHRcdFx0XHRcdHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHR7Zm9vdGVyfVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuXG4iLCJpbXBvcnQgRm9ybSBmcm9tICcuLi91dGlscy9mb3JtcydcblxuXG5leHBvcnQgY2xhc3MgU3ByYXlGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuY29tcG9uZW50V2lsbFVwZGF0ZT10aGlzLmNvbXBvbmVudFdpbGxVcGRhdGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLnN1Ym1pdD10aGlzLnN1Ym1pdC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuc2F2ZT10aGlzLnNhdmUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmRlbGV0ZT10aGlzLmRlbGV0ZS5iaW5kKHRoaXMpO1xuXHR9XG5cdGNvbXBvbmVudFdpbGxVcGRhdGUoKXtcblxuXHR9XG5cdHN1Ym1pdChlKXtcblx0XHQvL2lmKHRoaXMucHJvcHMuaXRlbS52aW5leWFyZD09XCJcIiB8fHRoaXMucHJvcHMuaXRlbS5zcHJheV90eXBlPT1cIlwiIHx8IChtb21lbnQodGhpcy5wcm9wcy5pdGVtLmRhdGUsXCJNTS9ERC9ZWVlZXCIpLmlzVmFsaWQoKSkhPT10cnVlKXtcblx0XHQvL1x0Y29uc29sZS5sb2coXCJub3QgdmFsaWRcIik7XG5cdFx0Ly99ZWxzZXtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRoaXMucHJvcHMuY3JlYXRlKHRoaXMucHJvcHMuaXRlbSk7XG5cdFx0Ly99XG5cdH1cblx0c2F2ZShlKXtcblx0XHQvLyBpZih0aGlzLnByb3BzLml0ZW0udmluZXlhcmQ9PVwiXCIgfHx0aGlzLnByb3BzLml0ZW0uc3ByYXlfdHlwZT09XCJcIiB8fCAobW9tZW50KHRoaXMucHJvcHMuaXRlbS5kYXRlLFwiTU0vREQvWVlZWVwiKS5pc1ZhbGlkKCkpIT09dHJ1ZSl7XG5cdFx0Ly8gXHRjb25zb2xlLmxvZyhcIm5vdCB2YWxpZFwiKTtcblx0XHQvLyB9ZWxzZXtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRoaXMucHJvcHMuZWRpdCh0aGlzLnByb3BzLml0ZW0pO1xuXHRcdC8vIH1cblx0fVxuXHRkZWxldGUoZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMucHJvcHMuZGVsZXRlKHRoaXMucHJvcHMuaXRlbSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dmFyIGNyZWF0ZUhpZGRlbj0odGhpcy5wcm9wcy5tb2RlIT1cImNyZWF0ZVwiKT9cIiBoaWRkZW5cIjpcIiBub3BlXCI7XG5cdFx0dmFyIGVkaXRIaWRkZW49KHRoaXMucHJvcHMubW9kZSE9XCJlZGl0XCIpP1wiIGhpZGRlblwiOlwiIG5vcGVcIjtcblx0XHRcblx0XHRpZih0aGlzLnByb3BzLml0ZW09PW51bGwpe1xuXHRcdFx0dmFyIGNvcHk9e1xuXHRcdFx0XHR2aW5leWFyZDpcIlwiLFxuXHRcdFx0XHRzZWFzb246XCJcIixcblx0XHRcdFx0ZGF0ZTptb21lbnQoKS5mb3JtYXQoXCJNTS9ERC9ZWVlZXCIpLFxuXHRcdFx0XHRzcHJheVR5cGU6XCJcIixcblx0XHRcdFx0cXVhbnRpdHk6MFxuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0dmFyIGNvcHk9cHMuY2xvbmUodGhpcy5wcm9wcy5pdGVtKTtcblx0XHR9XG5cblx0XHRjb25zb2xlLmxvZyh0aGlzLnByb3BzLml0ZW0pO1xuXHRcdGNvbnNvbGUubG9nKGNvcHkpO1xuXHRcdHZhciBmb3JtRWxlbWVudHM9e1xuXHRcdFx0ZGF0ZTpbe30sXG5cdFx0XHR7XG5cdFx0XHRcdFx0ZmllbGQ6XCJkYXRlXCIsXG5cdFx0XHRcdFx0cmVxdWlyZWQ6dHJ1ZSxcblx0XHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0XHRjb3B5LmRhdGU9ZS50YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRcdHZhbHVlOmNvcHkuZGF0ZSxcblx0XHRcdFx0XHRsYWJsZTpcIkRhdGVcIlxuXHRcdFx0fV0sXG5cdFx0XHR2aW5leWFyZDpbe30se1xuXHRcdFx0XHRmaWVsZDpcImF1dG9Db21wbGV0ZVwiLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0Y29weS52aW5leWFyZD1lLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0dmFsdWU6Y29weS52aW5leWFyZCxcblx0XHRcdFx0cmVxdWlyZWQ6dHJ1ZSxcblx0XHRcdFx0bGFibGU6XCJWaW5leWFyZFwiLFxuXHRcdFx0XHRkb2N0eXBlOlwiVmluZXlhcmRcIixcblx0XHRcdFx0ZG9jdmFsdWU6XCJuYW1lXCJcblx0XHRcdH1dLFxuXHRcdFx0ZmllbGQ6W3t9LHtcblx0XHRcdFx0ZmllbGQ6XCJhdXRvQ29tcGxldGVcIixcblx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdGNvcHkuZmllbGQ9ZS50YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdHZhbHVlOmNvcHkuZmllbGQsXG5cdFx0XHRcdHJlcXVpcmVkOnRydWUsXG5cdFx0XHRcdGxhYmxlOlwiVmluZXlhcmRcIixcblx0XHRcdFx0ZG9jdHlwZTpcIlZpbmV5YXJkIEZpZWxkXCIsXG5cdFx0XHRcdGZpbHRlcjp7dmluZXlhcmQ6Y29weS52aW5leWFyZH0sXG5cdFx0XHRcdGRvY3ZhbHVlOlwibmFtZVwiXG5cdFx0XHR9XSxcblx0XHRcdHdvcmtvcmRlcjpbe30se1xuXHRcdFx0XHRmaWVsZDpcImF1dG9Db21wbGV0ZVwiLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0Y29weS53b3JrX29yZGVyPWUudGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHR2YWx1ZTpjb3B5Lndvcmtfb3JkZXIsXG5cdFx0XHRcdHJlcXVpcmVkOnRydWUsXG5cdFx0XHRcdGxhYmxlOlwiVmluZXlhcmRcIixcblx0XHRcdFx0ZG9jdHlwZTpcIndvcmtfb3JkZXJcIixcblx0XHRcdFx0ZG9jdmFsdWU6XCJuYW1lXCJcblx0XHRcdH1dXG5cdFx0fVxuXG5cdFx0dmFyIGZpZWxkcz1bXG5cdFx0XHRmb3JtRWxlbWVudHMudmluZXlhcmRbdGhpcy5wcm9wcy52aW5leWFyZF0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiYXV0b0NvbXBsZXRlXCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRjb3B5LnNlYXNvbj1lLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0dmFsdWU6Y29weS5zZWFzb24sXG5cdFx0XHRcdHJlcXVpcmVkOnRydWUsXG5cdFx0XHRcdGxhYmxlOlwiU2Vhc29uXCIsXG5cdFx0XHRcdGRvY3R5cGU6XCJTZWFzb25cIixcblx0XHRcdFx0ZG9jdmFsdWU6XCJuYW1lXCJcblx0XHRcdH0sXG5cdFx0XHRmb3JtRWxlbWVudHMuZGF0ZVt0aGlzLnByb3BzLnZpbmV5YXJkXSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJhdXRvQ29tcGxldGVcIixcblx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpeyBcblx0XHRcdFx0XHRjb3B5LnNwcmF5X3R5cGU9ZS50YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdHZhbHVlOmNvcHkuc3ByYXlfdHlwZSxcblx0XHRcdFx0cmVxdWlyZWQ6dHJ1ZSxcblx0XHRcdFx0bGFibGU6XCJTcHJheSBUeXBlXCIsXG5cdFx0XHRcdGRvY3R5cGU6XCJTcHJheSBUeXBlXCIsXG5cdFx0XHRcdGRvY3ZhbHVlOlwibmFtZVwiXG5cdFx0XHR9LFxuXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiaW5wdXRcIixcblx0XHRcdFx0Y2xhc3NOYW1lOlwidmluZXlhcmQtaW5wdXRcIixcblx0XHRcdFx0dHlwZTpcIm51bWJlclwiLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0Y29weS5xdWFudGl0eT1lLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0dmFsdWU6Y29weS5xdWFudGl0eSxcblx0XHRcdFx0bGFibGU6XCJxdWFudGl0eVwiXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImJ1dHRvblwiLFxuXHRcdFx0XHR0eXBlOlwic3VibWl0XCIsXG5cdFx0XHRcdHZhbHVlOlwiQ3JlYXRlIFNwcmF5aW5nIEVudHJ5XCIsXG5cdFx0XHRcdGNsYXNzTmFtZTpcImJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIiArIGNyZWF0ZUhpZGRlbixcblx0XHRcdFx0b25DbGljazp0aGlzLnN1Ym1pdFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJidXR0b25cIixcblx0XHRcdFx0dHlwZTpcInN1Ym1pdFwiLFxuXHRcdFx0XHR2YWx1ZTpcIlNhdmVcIixcblx0XHRcdFx0Y2xhc3NOYW1lOlwiYnRuLXN1Y2Nlc3MgcHVsbC1yaWdodFwiKyBlZGl0SGlkZGVuLFxuXHRcdFx0XHRvbkNsaWNrOnRoaXMuc2F2ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJidXR0b25cIixcblx0XHRcdFx0dHlwZTpcInN1Ym1pdFwiLFxuXHRcdFx0XHR2YWx1ZTpcIkRlbGV0ZVwiLFxuXHRcdFx0XHRjbGFzc05hbWU6XCJidG4tZGFuZ2VyIHB1bGwtcmlnaHRcIisgZWRpdEhpZGRlbixcblx0XHRcdFx0b25DbGljazp0aGlzLmRlbGV0ZVxuXHRcdFx0fVxuXG5cblx0XHRdXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XHRcdFxuXHRcdFx0XHQ8Rm9ybVxuXHRcdFx0XHRcdGlkPXt0aGlzLnByb3BzLmlkfVxuXHRcdFx0XHRcdHR5cGU9XCJob3Jpem9udGFsXCJcblx0XHRcdFx0XHRmaWVsZHM9e2ZpZWxkc31cblxuXHRcdFx0XHQvPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXHRcdFx0Ly8ge1xuXHRcdFx0Ly8gXHRmaWVsZDpcInNlbGVjdFwiLFxuXHRcdFx0Ly8gXHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7IFxuXHRcdFx0Ly8gXHRcdGNvcHkudHlwZT1lLnRhcmdldC52YWx1ZTtcblx0XHRcdC8vIFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHQvLyBcdH0uYmluZCh0aGlzKSxcblx0XHRcdC8vIFx0bGFibGU6XCJTdHlsZVwiLFxuXHRcdFx0Ly8gXHRvcHRpb25zOltcblx0XHRcdC8vIFx0XHRcIkNhbmVcIixcblx0XHRcdC8vIFx0XHRcIkh5YnJpZFwiLFxuXHRcdFx0Ly8gXHRcdFwiSGVhZCBUcmFpblwiLFxuXHRcdFx0Ly8gXHRcdFwiQmlsYXRlcmFsIFRyYWluXCIsXG5cdFx0XHQvLyBcdFx0XCJUd28gQnVkXCIsXG5cdFx0XHQvLyBcdFx0XCJTcHVyXCIsXG5cdFx0XHQvLyBcdFx0XCJUcnVua1wiXG5cdFx0XHQvLyBcdF1cblx0XHRcdC8vIH0sXG5cdFx0XHQvLyB7XG5cdFx0XHQvLyBcdGZpZWxkOlwiY2hlY2tcIixcblx0XHRcdC8vIFx0Y2xhc3NOYW1lOlwiYmlnLWNoZWNrYm94XCIsXG5cdFx0XHQvLyBcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXsgXG5cdFx0XHQvLyBcdFx0Y29weS5iX2xvY2s9ZS50YXJnZXQudmFsdWU7XG5cdFx0XHQvLyBcdFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0Ly8gXHR9LmJpbmQodGhpcyksXG5cdFx0XHQvLyBcdGxhYmxlOlwiQi1Mb2NrXCJcblx0XHRcdC8vIH0sXG5cdFx0XHQvLyB7XG5cdFx0XHQvLyBcdGZpZWxkOlwiY2hlY2tcIixcblx0XHRcdC8vIFx0Y2xhc3NOYW1lOlwiYmlnLWNoZWNrYm94XCIsXG5cdFx0XHQvLyBcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXsgXG5cdFx0XHQvLyBcdFx0Y29weS5yZW1vdmVkPWUudGFyZ2V0LnZhbHVlO1xuXHRcdFx0Ly8gXHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdC8vIFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0Ly8gXHRsYWJsZTpcIlBydW5pbmcgUmVtb3ZlZFwiXG5cdFx0XHQvLyB9LFxuXHRcdFx0Ly8ge1xuXHRcdFx0Ly8gXHRmaWVsZDpcImNoZWNrXCIsXG5cdFx0XHQvLyBcdGNsYXNzTmFtZTpcImJpZy1jaGVja2JveFwiLFxuXHRcdFx0Ly8gXHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7IFxuXHRcdFx0Ly8gXHRcdGNvcHkudGFwX3JlbW92ZWQ9ZS50YXJnZXQudmFsdWU7XG5cdFx0XHQvLyBcdFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0Ly8gXHR9LmJpbmQodGhpcyksXG5cdFx0XHQvLyBcdGxhYmxlOlwiVGFwIFJlbW92ZWRcIlxuXHRcdFx0Ly8gfSxcblx0XHRcdC8vIHtcblx0XHRcdC8vIFx0ZmllbGQ6XCJjaGVja1wiLFxuXHRcdFx0Ly8gXHRjbGFzc05hbWU6XCJiaWctY2hlY2tib3hcIixcblx0XHRcdC8vIFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpeyBcblx0XHRcdC8vIFx0XHRjb3B5LnByZV9wcnVuZT1lLnRhcmdldC52YWx1ZTtcblx0XHRcdC8vIFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHQvLyBcdH0uYmluZCh0aGlzKSxcblx0XHRcdC8vIFx0bGFibGU6XCJQcmUgUHJ1bmVcIlxuXHRcdFx0Ly8gfSxcblxuXG5cblxuXG5cbiIsIlxuaW1wb3J0IEFjb3JkaWFuIGZyb20gJy4uLy4uL3B1YmxpYy9qcy9tb2R1bGVzL3V0aWxzL2Fjb3JkaWFuJ1xuaW1wb3J0IEFjb3JkaWFuQ29udGVudCBmcm9tICcuLi8uLi9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9hY29yZGlhbkNvbnRlbnQnXG5pbXBvcnQgRGF5c1dvcmtvcmRlcnMgZnJvbSAnLi4vLi4vcHVibGljL2pzL21vZHVsZXMvZGF5c193b3Jrb3JkZXJzL2RheXNXb3Jrb3JkZXJzJ1xuaW1wb3J0IEZvcm0gZnJvbSAnLi4vLi4vcHVibGljL2pzL21vZHVsZXMvdXRpbHMvZm9ybXMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyZXdEYXNoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXG5cdFx0dGhpcy5jcmV3Q2hhbmdlZD10aGlzLmNyZXdDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jcmV3c0Fjb3JkaW9uPXRoaXMuY3Jld3NBY29yZGlvbi5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZGF0ZUNoYW5nZWQ9dGhpcy5kYXRlQ2hhbmdlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMud29ya09yZGVyU3RhdHVzPXRoaXMud29ya09yZGVyU3RhdHVzLmJpbmQodGhpcyk7XG5cblxuXHRcdHRoaXMuY3VycmVudFVzZXI9cHMuaW5pdEN1cnJlbnRVc2VyKCk7XG5cdFx0dGhpcy5jdXJyZW50VXNlci5nZXQoe30sZnVuY3Rpb24oaXRlbXMpe1xuXHRcdFx0aWYodGhpcy5jdXJyZW50VXNlci5pdGVtcy51c2VybmFtZT09XCJHdWVzdFwiKXtcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uID0gXCIvbG9naW5cIjtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHQkKGRvY3VtZW50KS50cmlnZ2VyKFwidXNlckxvYWRlZFwiKTtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZyhcImFmdGVyIExvYWRcIix0aGlzLmN1cnJlbnRVc2VyLml0ZW1zKTtcblx0XHRcdH1cblx0XHR9LmJpbmQodGhpcykpOyBcblx0XHQvL3RoaXMuc3RhdGU9e307XG5cdFx0dGhpcy5zdGF0ZT17XG5cdFx0XHRjcmV3OltdLFxuXHRcdFx0c3RhdHVzOltdLFxuXHRcdFx0dGl0bGU6JycsXG5cdFx0XHR1c2VyaW5mbzp0aGlzLmN1cnJlbnRVc2VyLml0ZW1zLFxuXHRcdFx0c2VsZWN0ZWREYXRlOm1vbWVudCgpLmZvcm1hdChcIk1NL0REL1lZWVlcIilcblx0XHR9O1xuXHRcdGNvbnNvbGUubG9nKHRoaXMuY3VycmVudFVzZXIuaXRlbXMudG9kYXkpO1xuXHRcdHRoaXMuY3Jld1Rvb2wgPSBuZXcgcHMuYXBpVG9vbCh7fSx7ZG9jdHlwZTonQ3Jldyd9LHRoaXMuY3Jld0NoYW5nZWQpO1xuXHRcdHRoaXMuYWNvcmRpYW5JZD1cImNyZXctZGFzaC1hY29yZGlhblwiO1xuXHR9XG5cbiAgXHRjcmV3Q2hhbmdlZCgpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe2NyZXc6dGhpcy5jcmV3VG9vbC5pdGVtc30pO1xuXHR9XG5cdGRhdGVDaGFuZ2VkKGUpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkRGF0ZTplLnRhcmdldC52YWx1ZX0pO1xuXHR9XG5cdHdvcmtPcmRlclN0YXR1cyhpbmRleCl7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKGl0ZW1zKXtcblx0XHRcdHZhciBzdGF0dXM9XCJOb25lXCI7XG5cdFx0XHRmb3IgKGxldCBpdGVtIG9mIGl0ZW1zKXtcblx0XHRcdFx0aWYoaXRlbS5zdGF0dXM9PVwiU3RhcnRlZFwiKXtcblx0XHRcdFx0XHRzdGF0dXM9XCJXb3JraW5nXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoaXRlbS5zdGF0dXM9PVwiQ29tcGxldGVcIiAmJiBzdGF0dXMhPVwiV29ya2luZ1wiKXtcblx0XHRcdFx0XHRzdGF0dXM9XCJDb21wbGV0ZWRcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZihpdGVtLnN0YXR1cz09XCJQZW5kaW5nXCIgJiYgc3RhdHVzPT1cIkNvbXBsZXRlZFwiKXtcblx0XHRcdFx0XHRzdGF0dXM9XCJEcml2aW5nXCI7XG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXHRcdFx0dGhpcy5zdGF0ZS5zdGF0dXNbaW5kZXhdPXN0YXR1cztcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3N0YXR1czp0aGlzLnN0YXRlLnN0YXR1c30pO1xuXHRcdH0uYmluZCh0aGlzKTtcblx0fVxuXG5cdGNyZXdzQWNvcmRpb24oKXtcblx0XHRcdC8vaWYgYWxsIHBlbmRpbmcgJiYgY2xvY2tlZCBpbiBkcml2aW5nXG5cdFx0XHQvL2lmIG5vdCBjbG9ja2VkIGluOiBub3Qgc3RyYXRlZFxuXHRcdFx0Ly9jbG9ja2VkIG91dDogY2xvY2tlZCBvdXRcblxuXG5cdFx0dmFyIGNvbnZlcnRlZERhdGUgPSBtb21lbnQodGhpcy5zdGF0ZS5zZWxlY3RlZERhdGUsICdNTS9ERC9ZWVlZJykuZm9ybWF0KCdZWVlZLU1NLUREJyk7XG5cdFx0dmFyIG91dHB1dD1bXTtcblx0XHR0aGlzLnN0YXRlLmNyZXcubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblx0XHRcdGlmKHRoaXMuc3RhdGUuc3RhdHVzW2luZGV4XT09PXVuZGVmaW5lZCl7XG5cdFx0XHRcdHRoaXMuc3RhdGUuc3RhdHVzW2luZGV4XT1cIk5vIFdvcmsgT3JkZXJzXCI7XG5cdFx0XHR9XG5cdFx0XHRvdXRwdXQucHVzaCgoXG5cdFx0XHRcdDxBY29yZGlhbkNvbnRlbnRcblx0XHRcdFx0XHRrZXk9e3RoaXMuYWNvcmRpYW5JZCtpbmRleH1cblx0XHRcdFx0XHRpZD17dGhpcy5hY29yZGlhbklkK2luZGV4fVxuXHRcdFx0XHRcdHRpdGxlPXtpdGVtLmNyZXdfbmFtZX1cblx0XHRcdFx0XHRhY3RpdmU9eyhpbmRleD09PTApP3RydWU6ZmFsc2V9XG5cdFx0XHRcdFx0cGFyZW50SWQ9e3RoaXMuYWNvcmRpYW5JZH1cblx0XHRcdFx0PlxuXHRcdFx0XHRcdHt0aGlzLnN0YXRlLnN0YXR1c1tpbmRleF19XG5cdFx0XHRcdFx0PERheXNXb3Jrb3JkZXJzIFxuXHRcdFx0XHRcdFx0ZGF0ZT17Y29udmVydGVkRGF0ZX1cblx0XHRcdFx0XHRcdGNyZXc9e2l0ZW0ubmFtZX1cblx0XHRcdFx0XHRcdHN0YXR1c1VwZGF0ZT17dGhpcy53b3JrT3JkZXJTdGF0dXMoaW5kZXgpfVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdDwvQWNvcmRpYW5Db250ZW50PikpO1x0XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gKDxkaXY+XG5cdFx0XHQ8Rm9ybVxuXHRcdFx0XHRjbGFzc05hbWU9XCJjZW50ZXItYmxvY2sgc2hvcnRcIlxuXHRcdFx0XHR0eXBlPVwiaG9yaXpvbnRhbFwiXG5cdFx0XHRcdGZpZWxkcz17W3tcblx0XHRcdFx0XHRmaWVsZDpcImRhdGVcIixcblx0XHRcdFx0XHR2YWx1ZTp0aGlzLnN0YXRlLnNlbGVjdGVkRGF0ZSxcblx0XHRcdFx0XHRvbkNoYW5nZTogdGhpcy5kYXRlQ2hhbmdlZCxcblx0XHRcdFx0XHRjbGFzc05hbWU6XCJpbnB1dC1sZ1wiLFxuXHRcdFx0XHRcdGtleTpcIm90aGVyM1wiXG5cdFx0XHRcdH1dfVxuXHRcdFx0Lz5cblx0XHRcdDxBY29yZGlhbiBpZD17dGhpcy5hY29yZGlhbklkfT5cblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvQWNvcmRpYW4+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHJldHVybig8ZGl2Pnt0aGlzLmNyZXdzQWNvcmRpb24oKX08L2Rpdj4pO1xuXHR9XG59XG5cblxuY29uc3QgYXBwPSAkKCcjYXBwJylbMF07XG4oZnVuY3Rpb24oKXtcblx0ZnJhcHBlLnJlYWR5KGZ1bmN0aW9uKCl7XG5cdFx0UmVhY3RET00ucmVuZGVyKCBcblx0XHQ8Q3Jld0Rhc2ggLz4sYXBwICk7XG5cdH0pXG5cbn0pKCk7XG4iXX0=
