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
			var dropdownItems = [];
			if (this.props.issues !== null) {
				this.props.issues.map(function (item, index) {
					if (item.status == 'Open') {
						dropdownItems.push(React.createElement(
							'li',
							{ key: index },
							React.createElement(
								'a',
								{ className: 'dropdown-item',
									href: '#',
									onClick: this.modalEditIssue.bind(this, item)
								},
								item.issue_title
							)
						));
					}
				}.bind(this));
			}
			var issueCount = " ";
			if (this.props.issues !== null && this.props.issues.length !== null) {
				var count = 0;
				for (var x = 0; x < this.props.issues.length; x++) {
					if (this.props.issues[x].status == "Open") {
						count++;
					}
				}
				issueCount = count === 0 ? "" : count + " ";
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

},{"../utils/forms":8,"../utils/modal":9,"./workorderTask":4}],3:[function(require,module,exports){
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

var _doctypeForm = require('../utils/doctypeForm');

var _doctypeForm2 = _interopRequireDefault(_doctypeForm);

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

		_this.issueFormChange = _this.issueFormChange.bind(_this);
		_this.createIssue = _this.createIssue.bind(_this);
		_this.editIssue = _this.editIssue.bind(_this);
		_this.deleteIssue = _this.deleteIssue.bind(_this);
		_this.close = _this.close.bind(_this);

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
		key: 'activateModalNew',
		value: function activateModalNew() {
			this.setState({ issueMode: "create" });
			this.setState({ issue: {} });
			$('#' + this.modalId).modal();
		}
	}, {
		key: 'activateModalEdit',
		value: function activateModalEdit(issue) {
			this.setState({ issueMode: "edit" });
			this.setState({ issue: issue });
			$('#' + this.modalId).modal();
		}
	}, {
		key: 'issueFormChange',
		value: function issueFormChange(issue) {
			this.setState({ issue: issue });
		}
	}, {
		key: 'issueChanged',
		value: function issueChanged() {
			this.setState({ issues: this.issueTool.items });
		}
	}, {
		key: 'createIssue',
		value: function createIssue(item) {
			//console.log(this.state.issue);
			item.vineyard = this.props.location;
			item.work_order = this.props.workorder;
			this.issueTool.create(item, function (item) {
				ps.successAlert("Issue " + item.title + " created.");
			});
			$('#' + this.modalId).modal('toggle');
		}
	}, {
		key: 'deleteIssue',
		value: function deleteIssue(item) {
			this.issueTool.delete(item);
			$('#' + this.modalId).modal('toggle');
		}
	}, {
		key: 'editIssue',
		value: function editIssue(item) {
			this.issueTool.update(item, function (item) {
				ps.successAlert("Issue " + item.title + " updated.");
			});
			$('#' + this.modalId).modal('toggle');
		}
	}, {
		key: 'close',
		value: function close() {
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

			var modalTitle = "";
			if (this.state.issueMode) {
				modalTitle = "Create Issue";
			} else {
				modalTitle = "Edit Issue";
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
						submit: false
					},
					React.createElement(_doctypeForm2.default, {
						close: this.close,
						itemChange: this.issueFormChange,
						create: this.createIssue,
						edit: this.editIssue,
						'delete': this.deleteIssue,
						mode: this.state.issueMode,
						item: this.state.issue,
						id: this.props.workorder,

						doctype: 'Issue',
						issue_title: { active: 1 },
						issue: {
							active: 1,
							type: "textarea"
						},
						priority: {
							active: 1,
							default: "Low"
						},
						status: {
							active: 1,
							default: "Open"
						}
					})
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

		_this2.delete = _this2.delete.bind(_this2);
		_this2.close = _this2.close.bind(_this2);
		_this2.update = _this2.update.bind(_this2);
		_this2.create = _this2.create.bind(_this2);
		_this2.onChange = _this2.onChange.bind(_this2);

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
			console.log("edit task called");
			console.log(item);
			this.setState({
				formState: item.doctype.replace(/\s/g, ''),
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
		key: 'delete',
		value: function _delete(copy) {
			this.tasksTool.delete(copy);
			$('#' + this.modalId).modal('toggle');
		}
	}, {
		key: 'close',
		value: function close(e) {
			console.log("close");
			$('#' + this.modalId).modal('toggle');
		}
	}, {
		key: 'update',
		value: function update(copy) {
			this.tasksTool.update(copy);
			$('#' + this.modalId).modal('toggle');
		}
	}, {
		key: 'create',
		value: function create(item, doctype) {
			item.work_order = this.props.workorder;
			item.vineyard = this.props.vineyard;
			item.doctype = doctype;
			this.tasksTool.create(item);
			$('#' + this.modalId).modal('toggle');
		}
	}, {
		key: 'onChange',
		value: function onChange(copy) {
			this.setState({ editItem: copy });
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
							this.setState({ formState: e.target.value.replace(/\s/g, '') });
						}.bind(this)
					});
				}.bind(this),
				Spraying: function (item) {
					return React.createElement(_doctypeForm2.default, {
						close: this.close,
						itemChange: this.onChange,
						create: this.create,
						edit: this.update,
						'delete': this.delete,
						mode: this.state.formMode,
						item: item,
						id: this.props.workorder,

						doctype: 'Spraying',
						season: { active: 1 },
						note: {
							active: 1,
							type: "textarea"
						},
						spray_type: { active: 1 }

					});
				}.bind(this),
				Harvest: function (item) {
					return React.createElement(_doctypeForm2.default, {
						close: this.close,
						itemChange: this.onChange,
						create: this.create,
						edit: this.update,
						'delete': this.delete,
						mode: this.state.formMode,
						item: item,
						id: this.props.workorder,

						doctype: 'Harvest',
						season: { active: 1 },
						note: {
							active: 1,
							type: "textarea"
						},
						pounds: { active: 1 },
						post_harvest_water: { active: 1 }

					});
				}.bind(this),
				BirdNets: function (item) {
					return React.createElement(_doctypeForm2.default, {
						close: this.close,
						itemChange: this.onChange,
						create: this.create,
						edit: this.update,
						'delete': this.delete,
						mode: this.state.formMode,
						item: item,
						id: this.props.workorder,

						doctype: 'Bird Nets',
						season: { active: 1 },
						note: {
							active: 1,
							type: "textarea"
						}

					});
				}.bind(this),
				Watering: function (item) {
					return React.createElement(_doctypeForm2.default, {
						close: this.close,
						itemChange: this.onChange,
						create: this.create,
						edit: this.update,
						'delete': this.delete,
						mode: this.state.formMode,
						item: item,
						id: this.props.workorder,

						doctype: 'Watering',
						season: { active: 1 },
						note: {
							active: 1,
							type: "textarea"
						},
						duration: { active: 1 }

					});
				}.bind(this),
				Canopy: function (item) {
					return React.createElement(_doctypeForm2.default, {
						close: this.close,
						itemChange: this.onChange,
						create: this.create,
						edit: this.update,
						'delete': this.delete,
						mode: this.state.formMode,
						item: item,
						id: this.props.workorder,

						doctype: 'Canopy',
						season: { active: 1 },
						note: {
							active: 1,
							type: "textarea"
						},
						type: { active: 1 }

					});
				}.bind(this),
				Pruning: function (item) {
					//console.log("MODE", this.state.formMode);
					return React.createElement(_doctypeForm2.default, {
						close: this.close,
						itemChange: this.onChange,
						create: this.create,
						edit: this.update,
						'delete': this.delete,
						mode: this.state.formMode,
						item: item,
						id: this.props.workorder,

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

					});
				}.bind(this)
			};
			//console.log("get form called");
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

},{"../utils/doctypeForm":7,"../utils/forms":8,"../utils/modal":9,"../vineyard/sprayForm":10,"./createIssue":1,"./taskCheck":3}],5:[function(require,module,exports){
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

//{React.cloneElement(this.props.children, { toggleAll: this.props.toggleAll })}


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

},{}],7:[function(require,module,exports){
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

},{"../utils/forms":8}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{"../utils/forms":8}],11:[function(require,module,exports){
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

},{"../../public/js/modules/days_workorders/daysWorkorders":2,"../../public/js/modules/utils/acordian":5,"../../public/js/modules/utils/acordianContent":6,"../../public/js/modules/utils/forms":8}]},{},[11])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c193b3Jrb3JkZXJzL2NyZWF0ZUlzc3VlLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy9kYXlzX3dvcmtvcmRlcnMvZGF5c1dvcmtvcmRlcnMuanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL2RheXNfd29ya29yZGVycy90YXNrQ2hlY2suanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL2RheXNfd29ya29yZGVycy93b3Jrb3JkZXJUYXNrLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9hY29yZGlhbi5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdXRpbHMvYWNvcmRpYW5Db250ZW50LmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9kb2N0eXBlRm9ybS5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdXRpbHMvZm9ybXMuanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL3V0aWxzL21vZGFsLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy92aW5leWFyZC9zcHJheUZvcm0uanN4IiwicHJvY2Vzc19zdWNjZXNzL3d3dy9kYXNoMi9kYXNoLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7O0lBR3FCLFc7OztBQUNwQixzQkFBWSxLQUFaLEVBQWtCO0FBQUE7O0FBQUEsd0hBQ1gsS0FEVzs7QUFFakIsUUFBSyxhQUFMLEdBQW1CLE1BQUssYUFBTCxDQUFtQixJQUFuQixPQUFuQjtBQUNBLFFBQUssY0FBTCxHQUFvQixNQUFLLGNBQUws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QTs7OzJCQUNPO0FBQ1AsVUFBTztBQUFBO0FBQUE7QUFBTSxTQUFLLGFBQUw7QUFBTixJQUFQO0FBQ0E7Ozs7RUExR29DLE1BQU0sUzs7a0JBQXZCLFE7OztBQThHckIsSUFBTSxNQUFLLEVBQUUsTUFBRixFQUFVLENBQVYsQ0FBWDtBQUNBLENBQUMsWUFBVTtBQUNWLFFBQU8sS0FBUCxDQUFhLFlBQVU7QUFDdEIsV0FBUyxNQUFULENBQ0Esb0JBQUMsUUFBRCxPQURBLEVBQ2EsR0FEYjtBQUVBLEVBSEQ7QUFLQSxDQU5EIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyZWF0ZUlzc3VlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpXG5cdFx0dGhpcy5tb2RhbE5ld0lzc3VlPXRoaXMubW9kYWxOZXdJc3N1ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMubW9kYWxFZGl0SXNzdWU9dGhpcy5tb2RhbEVkaXRJc3N1ZS5iaW5kKHRoaXMpO1xuXHR9XG5cdHRvb2xUaXAoKXtcblx0XHQkKGZ1bmN0aW9uICgpIHtcblx0XHQgXHQkKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJykudG9vbHRpcCgpO1xuXHRcdH0pXG5cdH1cblx0bW9kYWxOZXdJc3N1ZShlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5wcm9wcy5hY3RpdmF0ZU1vZGFsTmV3KCk7XG5cdH1cblx0bW9kYWxFZGl0SXNzdWUoaXRlbSxlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0Y29uc29sZS5sb2coaXRlbSlcblx0XHR0aGlzLnByb3BzLmFjdGl2YXRlTW9kYWxFZGl0KGl0ZW0pO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHZhciBkcm9wZG93bkl0ZW1zPVtdO1xuXHRcdGlmKHRoaXMucHJvcHMuaXNzdWVzIT09bnVsbCl7XG5cdFx0XHR0aGlzLnByb3BzLmlzc3Vlcy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXHRcdFx0XHRpZiAoaXRlbS5zdGF0dXMgPT0nT3Blbicpe1xuXHRcdFx0XHRcdGRyb3Bkb3duSXRlbXMucHVzaChcblx0XHRcdFx0XHRcdDxsaSBrZXk9e2luZGV4fT4gXG5cdFx0XHRcdFx0XHRcdDxhIGNsYXNzTmFtZT1cImRyb3Bkb3duLWl0ZW1cIiBcblx0XHRcdFx0XHRcdFx0XHRocmVmPVwiI1wiIFxuXHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMubW9kYWxFZGl0SXNzdWUuYmluZCh0aGlzLGl0ZW0pfSBcblx0XHRcdFx0XHRcdFx0PntpdGVtLmlzc3VlX3RpdGxlfTwvYT5cblx0XHRcdFx0XHRcdDwvbGk+KTtcblx0XHRcdFx0fVxuXHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHR9XG5cdFx0dmFyIGlzc3VlQ291bnQ9XCIgXCI7XG5cdFx0aWYodGhpcy5wcm9wcy5pc3N1ZXMhPT1udWxsICYmIHRoaXMucHJvcHMuaXNzdWVzLmxlbmd0aCE9PW51bGwpe1xuXHRcdFx0dmFyIGNvdW50ID0gMDtcblx0XHRcdGZvcih2YXIgeD0wOyB4IDwgdGhpcy5wcm9wcy5pc3N1ZXMubGVuZ3RoO3grKyl7XG5cdFx0XHRcdGlmKHRoaXMucHJvcHMuaXNzdWVzW3hdLnN0YXR1cz09XCJPcGVuXCIpe1xuXHRcdFx0XHRcdGNvdW50Kys7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlzc3VlQ291bnQ9KGNvdW50PT09MCk/XCJcIjpjb3VudCtcIiBcIjtcblx0XHR9XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJkcm9wZG93biBkcm9wZG93bi1wYW5lbC1yaWdodFwiPlxuXG5cdFx0XHRcdDxidXR0b25cblx0XHRcdFx0XHRjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHQgYnRuLXhzIGRyb3Bkb3duLXRvZ2dsZSBmdWxsLWhlYWRlci1idXR0b24gY29ybmVyXCIgXG5cdFx0XHRcdFx0dHlwZT1cImJ1dHRvblwiIFxuXHRcdFx0XHRcdGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBcblx0XHRcdFx0XHRhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIFxuXHRcdFx0XHRcdGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiID5cblxuXHRcdFx0XHQgXHR7aXNzdWVDb3VudH08c3BhbiBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLWV4Y2xhbWF0aW9uLXNpZ25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XG5cdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHQ8dWwgY2xhc3NOYW1lPVwiZHJvcGRvd24tbWVudVwiPlxuXHRcdFx0XHQgICAgPGxpIGNsYXNzTmFtZT1cImRyb3Bkb3duLWhlYWRlclwiPklzc3VlczwvbGk+XG5cdFx0XHRcdCAgICB7ZHJvcGRvd25JdGVtc31cblx0XHRcdFx0ICAgIDxsaSByb2xlPVwic2VwYXJhdG9yXCIgY2xhc3NOYW1lPVwiZGl2aWRlclwiPjwvbGk+XG5cdFx0XHRcdCAgICA8bGk+PGEgXG5cdFx0XHRcdCAgICBcdGNsYXNzTmFtZT1cImRyb3Bkb3duLWl0ZW1cIlxuXHRcdFx0XHQgICAgXHRvbkNsaWNrPXt0aGlzLm1vZGFsTmV3SXNzdWV9XG5cdFx0XHRcdCAgICBcdGhyZWY9XCIjXCIgPiArIE5ldyBJc3N1ZTwvYT48L2xpPlxuXHRcdFx0XHQ8L3VsPlxuXG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cblxuIiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5pbXBvcnQgV29ya29yZGVyVGFzayBmcm9tICcuL3dvcmtvcmRlclRhc2snO1xuXG5pbXBvcnQgRm9ybSBmcm9tICcuLi91dGlscy9mb3JtcydcbmltcG9ydCBNb2RhbCBmcm9tICcuLi91dGlscy9tb2RhbCdcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERheXNXb3Jrb3JkZXJzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHZhciBhcmdzPXt9O1xuXHRcdGFyZ3MuY3Jldz10aGlzLnByb3BzLmNyZXc7XG5cdFx0YXJncy5kYXRlPXRoaXMucHJvcHMuZGF0ZTtcblx0XHQvKiAgIERvIHRoZSBiaW5kIHRoaW5nICAqL1xuXHRcdHRoaXMub25UYXNrQ2hlY2tlZD10aGlzLm9uVGFza0NoZWNrZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLm9uU3RhdHVzQ2hhbmdlZD10aGlzLm9uU3RhdHVzQ2hhbmdlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMud29ya09yZGVyQ2hhbmdlZD10aGlzLndvcmtPcmRlckNoYW5nZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnNvY2tldFVwZGF0ZT10aGlzLnNvY2tldFVwZGF0ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcz10aGlzLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMuYmluZCh0aGlzKTtcblx0XHR0aGlzLmNyZWF0ZVdvcmtvcmRlcj10aGlzLmNyZWF0ZVdvcmtvcmRlci5iaW5kKHRoaXMpO1xuXHRcdC8vdGhpcy53b3Jrb3JkZXJPYmo9dGhpcy5vblN0YXR1c0NoYW5nZWQuYmluZCh0aGlzKTtcblx0XHQvKiAgICAgICAgICBlbmQgICAgICAgICAgKi9cblxuXHRcdHRoaXMuc3RhdGU9e3dvcmtvcmRlcnM6W119O1xuXG5cdFx0dmFyIGFyZ3M9e307XG5cdFx0YXJncy5jcmV3PXRoaXMucHJvcHMuY3Jldztcblx0XHRhcmdzLmRhdGU9dGhpcy5wcm9wcy5kYXRlO1xuXHRcdHRoaXMud29ya29yZGVyVG9vbCA9IG5ldyBwcy5hcGlUb29sKGFyZ3MscHMuYXBpU2V0dXAud29ya09yZGVycyx0aGlzLndvcmtPcmRlckNoYW5nZWQpO1xuXHRcdGlmICh0aGlzLndvcmtvcmRlclRvb2wuaXRlbXM9PT11bmRlZmluZWQgfHx0aGlzLndvcmtvcmRlclRvb2wuaXRlbXM9PT0gMCB8fHRoaXMud29ya29yZGVyVG9vbC5pdGVtcz09PW51bGwgKXtcblx0XHR9ZWxzZXtcblx0XHRcdHRoaXMuc3RhdGUud29ya29yZGVycz10aGlzLndvcmtvcmRlclRvb2wuaXRlbXM7XG5cdFx0fVxuXG5cdH1cblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xuXG5cdFx0aWYobmV4dFByb3BzLmNyZXchPXRoaXMucHJvcHMuY3JldyB8fCBuZXh0UHJvcHMuZGF0ZSE9dGhpcy5wcm9wcy5kYXRlICl7XG5cblx0XHRcdHZhciBhcmdzPXt9O1xuXHRcdFx0YXJncy5jcmV3PW5leHRQcm9wcy5jcmV3O1xuXHRcdFx0YXJncy5kYXRlPW5leHRQcm9wcy5kYXRlO1xuXHRcdFx0dGhpcy53b3Jrb3JkZXJUb29sID0gbmV3IHBzLmFwaVRvb2woYXJncyxwcy5hcGlTZXR1cC53b3JrT3JkZXJzLHRoaXMud29ya09yZGVyQ2hhbmdlZCk7XG5cdFx0XHRpZiAodGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zPT09dW5kZWZpbmVkIHx8dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zPT09IDAgfHx0aGlzLndvcmtvcmRlclRvb2wuaXRlbXM9PT1udWxsICl7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3dvcmtvcmRlcnM6W119KTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHt3b3Jrb3JkZXJzOnRoaXMud29ya29yZGVyVG9vbC5pdGVtc30pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHNvY2tldFVwZGF0ZSgpe1xuXG5cdH1cblx0b25UYXNrQ2hlY2tlZCh3b19pbmRleCxpbmRleCxjaGVjayl7XG5cdFx0dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zW3dvX2luZGV4XS5zdWJ0YXNrW2luZGV4XS5zdGF0dXM9Y2hlY2s/MDoxO1xuXHRcdHRoaXMuc2V0U3RhdGUoe3dvcmtvcmRlcnM6dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zfSk7XG5cdFx0dGhpcy53b3Jrb3JkZXJUb29sLnVwZGF0ZSh0aGlzLndvcmtvcmRlclRvb2wuaXRlbXNbd29faW5kZXhdKTtcblx0XHR2YXIgY2hlY2tlZFRleHQ9Y2hlY2s/XCJ1bmNoZWNrZWQuXCI6XCJjaGVja2VkLlwiXG5cdFx0Ly9wcy5zdWNjZXNzQWxlcnQodGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zW3dvX2luZGV4XS5zdWJ0YXNrW2luZGV4XS50YXNrICtcIiBcIisgY2hlY2tlZFRleHQgKTtcblx0fVxuXHRvblN0YXR1c0NoYW5nZWQoc3RhdHVzLCBpbmRleCl7XG5cdFx0dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zW2luZGV4XS5zdGF0dXM9c3RhdHVzO1xuXHRcdHRoaXMuc2V0U3RhdGUoe3dvcmtvcmRlcnM6dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zfSk7XG5cdFx0dGhpcy53b3Jrb3JkZXJUb29sLnVwZGF0ZSh0aGlzLndvcmtvcmRlclRvb2wuaXRlbXNbaW5kZXhdKTtcblx0XHRpZihzdGF0dXM9PVwiQ29tcGxldGVcIil7XG5cdFx0XHRwcy5zdWNjZXNzQWxlcnQoXCJXb3Jrb3JkZXIgY29tcGxldGVkIVwiKTtcblx0XHR9XG5cdH1cblx0d29ya09yZGVyQ2hhbmdlZCgpe1xuXG5cdFx0aWYgKHRoaXMud29ya29yZGVyVG9vbC5pdGVtcyE9PW51bGwpe1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7d29ya29yZGVyczp0aGlzLndvcmtvcmRlclRvb2wuaXRlbXN9KTtcblx0XHRcdGlmKHRoaXMucHJvcHMuc3RhdHVzVXBkYXRlICE9PSB1bmRlZmluZWQpe1xuXHRcdFx0XHR0aGlzLnByb3BzLnN0YXR1c1VwZGF0ZSh0aGlzLndvcmtvcmRlclRvb2wuaXRlbXMpO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7d29ya29yZGVyczpbXX0pO1xuXHRcdH1cblxuXHR9XG5cdGNyZWF0ZVdvcmtvcmRlcihpdGVtKXtcblx0XHRpdGVtLmRhdGU9bW9tZW50KGl0ZW0uZGF0ZSxcIk1NL0REL1lZWVlcIikuZm9ybWF0KCdZWVlZLU1NLUREJyk7XG5cdFx0dGhpcy53b3Jrb3JkZXJUb29sLmNyZWF0ZShpdGVtLGZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0cHMuc3VjY2Vzc0FsZXJ0KFwiV29ya29yZGVyIFwiICtpdGVtLm5hbWUrIFwiIGNyZWF0ZWQuXCIpXG5cdFx0fSk7XG5cblx0fVxuXHR3b3Jrb3JkZXJPYmooaXRlbSxpbmRleCl7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PFdvcmtvcmRlclRhc2sgXG5cdFx0XHRcdGtleT17aW5kZXggKyB0aGlzLnByb3BzLmNyZXd9IFxuXHRcdFx0XHRpbmRleD17aW5kZXh9IFxuXHRcdFx0XHRsb2NhdGlvbl9yb3V0ZT17aXRlbS5sb2NhdGlvbl9yb3V0ZX1cblx0XHRcdFx0bG9jYXRpb249e2l0ZW0ubG9jYXRpb259XG5cdFx0XHRcdHRhc2tzPXtpdGVtLnN1YnRhc2t9XG5cdFx0XHRcdHN0YXR1cz17aXRlbS5zdGF0dXN9XG5cdFx0XHRcdHR5cGU9e2l0ZW0udHlwZX1cblx0XHRcdFx0d29ya29yZGVyPXtpdGVtLm5hbWV9XG5cdFx0XHRcdG9uVGFza0NoZWNrZWQ9e3RoaXMub25UYXNrQ2hlY2tlZH1cblx0XHRcdFx0b25TdGF0dXNDaGFuZ2VkPXt0aGlzLm9uU3RhdHVzQ2hhbmdlZH1cblx0XHRcdFx0cm91dGU9e2l0ZW0ucm91dGV9XG5cdFx0XHQvPlxuXHRcdCk7XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vICAgICAgICBSZW5kZXJcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRyZW5kZXIoKXtcblx0XHRpZiAodGhpcy5zdGF0ZS53b3Jrb3JkZXJzPT09MHx8dGhpcy5zdGF0ZS53b3Jrb3JkZXJzPT09dW5kZWZpbmVkKXtcblx0XHRcdHJldHVybiAoPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPjxoMz5ObyBXb3Jrb3JkZXJzPC9oMz48L2Rpdj4pO1xuXHRcdH1cblx0XHR2YXIgdG9kbz1bXTtcblx0XHR2YXIgY29tcGxldGU9W107XG5cdFx0dGhpcy5zdGF0ZS53b3Jrb3JkZXJzLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCl7XG5cdFx0XHRpZiAoaXRlbS5zdGF0dXMhPSdDb21wbGV0ZScmJml0ZW0uc3RhdHVzIT0nSW5jb21wbGV0ZScpe1xuXHRcdFx0XHR0b2RvLnB1c2godGhpcy53b3Jrb3JkZXJPYmooaXRlbSxpbmRleCkpO1xuXHRcdFx0XHRpZih0b2RvLmxlbmd0aCsxJTQ9PT0wKXtcblxuXHRcdFx0XHRcdHRvZG8ucHVzaCg8ZGl2IGNsYXNzTmFtZT0nY2xlYXJmaXggc3BhY2VyJz48L2Rpdj4pXG5cdFx0XHRcdH1cblx0XHRcdH1lbHNle1xuXHRcdFx0XHRjb21wbGV0ZS5wdXNoKHRoaXMud29ya29yZGVyT2JqKGl0ZW0saW5kZXgpKTtcblx0XHRcdFx0aWYoY29tcGxldGUubGVuZ3RoJTM9PT0wKXtjb21wbGV0ZS5wdXNoKDxkaXYgY2xhc3NOYW1lPSdjbGVhcmZpeCBzcGFjZXInPjwvZGl2Pil9XG5cdFx0XHR9XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0XHR2YXIgY29tcGxldGVIZWFkZXI9KDxoMz5Db21wbGV0ZSBXb3JrIE9yZGVyczwvaDM+KTtcblx0XHRpZihjb21wbGV0ZS5sZW5ndGg9PTApe1xuXHRcdFx0Y29tcGxldGVIZWFkZXI9XCJcIjtcblx0XHR9XG5cblx0XHQvLyB2YXIgZGF0ZT10aGlzLnByb3BzLmRhdGU7XG5cdFx0Ly8gZGF0ZT1tb21lbnQoZGF0ZSwnWVlZWS1NTS1ERCcpLmZvcm1hdChcIk1NL0REL1lZWVlcIik7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ3b3Jrb3JkZXJfY29udGFpbmVyXCI+XG5cdFx0XHRcdDxkaXY+PGJyLz5cblx0XHRcdFx0XHR7dG9kb31cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj48L2Rpdj5cblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHR7Y29tcGxldGVIZWFkZXJ9XG5cdFx0XHRcdFx0e2NvbXBsZXRlfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPjwvZGl2PlxuXHRcdFx0XHQ8YnIvPlxuXHRcdFx0XHQ8V29ya29yZGVyRm9ybU1vZGFsXG5cdFx0XHRcdFx0aWQ9e1wiY3JlYXRlLXdvLVwiK3RoaXMucHJvcHMuY3Jldy5yZXBsYWNlKFwiIFwiLFwiLVwiKX1cblx0XHRcdFx0XHRjcmV3PXt0aGlzLnByb3BzLmNyZXd9XG5cdFx0XHRcdFx0ZGF0ZT17bW9tZW50KHRoaXMucHJvcHMuZGF0ZSwnWVlZWS1NTS1ERCcpLmZvcm1hdChcIk1NL0REL1lZWVlcIil9XG5cdFx0XHRcdFx0Y3JlYXRlV29ya29yZGVyPXt0aGlzLmNyZWF0ZVdvcmtvcmRlcn1cblx0XHRcdFx0Lz5cblxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblxuXHR9O1x0XG59XG5cbmV4cG9ydCBjbGFzcyBXb3Jrb3JkZXJGb3JtTW9kYWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cblx0XHR0aGlzLnN1Ym1pdD10aGlzLnN1Ym1pdC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuc3RhdGU9e1xuXHRcdFx0bG9jYXRpb246XCJcIixcblx0XHRcdHByaW9yaXR5OjEsXG5cdFx0XHR0eXBlOlwiUHJ1bmluZ1wiLFxuXHRcdFx0c3RhdHVzOlwiUGVuZGluZ1wiLFxuXHRcdFx0ZGF0ZTp0aGlzLnByb3BzLmRhdGUsXG5cdFx0XHRjcmV3OnRoaXMucHJvcHMuY3Jld1xuXHRcdH1cblx0fVxuXG5cdHN1Ym1pdChlKXtcblx0XHRpZih0aGlzLnN0YXRlLmxvY2F0aW9uPT1cIlwiIHx8dGhpcy5zdGF0ZS5jcmV3PT1cIlwiIHx8IChtb21lbnQodGhpcy5zdGF0ZS5kYXRlLFwiTU0vREQvWVlZWVwiKS5pc1ZhbGlkKCkpIT09dHJ1ZSl7XG5cdFx0XHRjb25zb2xlLmxvZyhcIm5vdCB2YWxpZFwiKTtcblx0XHR9ZWxzZXtcblx0XHRcdHZhciBjb3B5PXBzLmNsb25lKHRoaXMuc3RhdGUpO1xuXHRcdFx0JCgnIycrIHRoaXMucHJvcHMuaWQpLm1vZGFsKCdoaWRlJylcblx0XHRcdHRoaXMuc2V0U3RhdGUoe2xvY2F0aW9uOlwiXCJ9KVxuXHRcdFx0dGhpcy5wcm9wcy5jcmVhdGVXb3Jrb3JkZXIoY29weSk7XG5cdFx0fVxuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHZhciBmaWVsZHM9W1x0XHRcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJhdXRvQ29tcGxldGVcIixcblx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe2xvY2F0aW9uOmUudGFyZ2V0LnZhbHVlfSlcblx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHR2YWx1ZTp0aGlzLnN0YXRlLmxvY2F0aW9uLFxuXHRcdFx0XHRyZXF1aXJlZDp0cnVlLFxuXHRcdFx0XHRsYWJsZTpcIlZpbmV5YXJkXCIsXG5cdFx0XHRcdGRvY3R5cGU6XCJWaW5leWFyZFwiLFxuXHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJpbnB1dFwiLFxuXHRcdFx0XHRjbGFzc05hbWU6XCJ2aW5leWFyZC1pbnB1dFwiLFxuXHRcdFx0XHR0eXBlOlwibnVtYmVyXCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtwcmlvcml0eTplLnRhcmdldC52YWx1ZX0pXG5cdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0dmFsdWU6dGhpcy5zdGF0ZS5wcmlvcml0eSxcblx0XHRcdFx0bGFibGU6XCJQcmlvcml0eVwiXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImRhdGVcIixcblx0XHRcdFx0cmVxdWlyZWQ6dHJ1ZSxcblx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe2RhdGU6ZS50YXJnZXQudmFsdWV9KTtcblx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHR2YWx1ZTp0aGlzLnN0YXRlLmRhdGUsXG5cdFx0XHRcdGxhYmxlOlwiRGF0ZVwiXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcInNlbGVjdFwiLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7dHlwZTplLnRhcmdldC52YWx1ZX0pXG5cdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0dmFsdWU6dGhpcy5zdGF0ZS50eXBlLFxuXHRcdFx0XHRsYWJsZTpcIlR5cGVcIixcblx0XHRcdFx0b3B0aW9uczpbXG5cdFx0XHRcdFx0XCJXYXRlcmluZ1wiLFxuXHRcdFx0XHRcdFwiUHJ1bmluZ1wiLFxuXHRcdFx0XHRcdFwiUmVwYWlyXCIsXG5cdFx0XHRcdFx0XCJTcHJheWluZ1wiXG5cdFx0XHRcdF1cblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwic2VsZWN0XCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtzdGF0dXM6ZS50YXJnZXQudmFsdWV9KVxuXHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdHZhbHVlOnRoaXMuc3RhdGUuc3RhdHVzLFxuXHRcdFx0XHRsYWJsZTpcIlN0YXR1c1wiLFxuXHRcdFx0XHRkaXNhYmxlZDp0cnVlLFxuXHRcdFx0XHRvcHRpb25zOltcblx0XHRcdFx0XHRcIlBlbmRpbmdcIlxuXHRcdFx0XHRdXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImF1dG9Db21wbGV0ZVwiLFxuXHRcdFx0XHRvbkNoYW5nZTogdGhpcy5zb21lRnVuY3Rpb24sXG5cdFx0XHRcdGxhYmxlOlwiQ3Jld1wiLFxuXHRcdFx0XHRyZXF1aXJlZDp0cnVlLFxuXHRcdFx0XHRyZWFkb25seTpcInR1cmVcIixcblx0XHRcdFx0ZG9jdHlwZTpcIkNyZXdcIixcblx0XHRcdFx0ZG9jdmFsdWU6XCJuYW1lXCIsXG5cdFx0XHRcdGRvY2xhYmxlOlwiY3Jld19sZWFkX2Z1bGxfbmFtZVwiLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7Y3JldzplLnRhcmdldC52YWx1ZX0pXG5cdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0dmFsdWU6dGhpcy5zdGF0ZS5jcmV3LFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJidXR0b25cIixcblx0XHRcdFx0dHlwZTpcInN1Ym1pdFwiLFxuXHRcdFx0XHR2YWx1ZTpcIkNyZWF0ZSBXb3JrIE9yZGVyXCIsXG5cdFx0XHRcdGNsYXNzTmFtZTpcImJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIixcblx0XHRcdFx0b25DbGljazp0aGlzLnN1Ym1pdFxuXHRcdFx0fVxuXG5cblx0XHRdXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XHRcdFx0XHRcblx0XHRcdFx0PGEgXG5cdFx0XHRcdFx0aHJlZj1cIiNcIiBcblx0XHRcdFx0XHRjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIlxuXHRcdFx0XHRcdG9uQ2xpY2s9e2Z1bmN0aW9uKCl7JCgnIycrIHRoaXMucHJvcHMuaWQpLm1vZGFsKCl9LmJpbmQodGhpcyl9XG5cdFx0XHRcdFx0PlxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tcGx1c1wiPjwvc3Bhbj4gTmV3IFdvcmsgT3JkZXI8L2E+XG5cdFx0XHRcdDxNb2RhbCBcblx0XHRcdFx0XHRpZD17dGhpcy5wcm9wcy5pZH0gXG5cdFx0XHRcdFx0c3VibWl0VGV4dD1cIlN1Ym1pdFwiIFxuXHRcdFx0XHRcdHRpdGxlPVwiQ3JlYXRlIE5ldyBXb3Jrb3JkZXJcIlxuXHRcdFx0XHRcdHN1Ym1pdD17ZmFsc2V9XG5cdFx0XHRcdFx0PlxuXG5cdFx0XHRcdFx0PEZvcm1cblx0XHRcdFx0XHRcdGlkPVwiQ3JlYXRlV29ya29yZGVyRm9ybVwiXG5cdFx0XHRcdFx0XHR0eXBlPVwiaG9yaXpvbnRhbFwiXG5cdFx0XHRcdFx0XHRmaWVsZHM9e2ZpZWxkc31cblxuXHRcdFx0XHRcdC8+XG5cblx0XHRcdFx0PC9Nb2RhbD5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbiIsIi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFza0NoZWNrIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMudGFza0NoZWNrZWQgPSB0aGlzLnRhc2tDaGVja2VkLmJpbmQodGhpcyk7XG5cdH1cblx0dGFza0NoZWNrZWQoZSl7XG5cdFx0dGhpcy5wcm9wcy50YXNrQ2hlY2tlZCh0aGlzLnByb3BzLmluZGV4LCB0aGlzLnByb3BzLmNoZWNrZWQpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IGNoZWNrZWQgPSB0aGlzLnByb3BzLmNoZWNrZWQgPyBcImxpbmUtdGhyb3VnaFwiIDogXCJcIjtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoZWNrYm94IHJvd1wiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy04XCI+XG5cdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9e2NoZWNrZWR9PlxuXHRcdFx0XHRcdDxpbnB1dCBcblx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImJpZy1jaGVja2JveFwiIFxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9e2Z1bmN0aW9uKCl7dGhpcy5wcm9wcy50YXNrQ2hlY2tlZCh0aGlzLnByb3BzLml0ZW0sIGNoZWNrZWQpO30uYmluZCh0aGlzKX0gXG5cdFx0XHRcdFx0XHR0eXBlPVwiY2hlY2tib3hcIiBcblx0XHRcdFx0XHRcdGNoZWNrZWQ9e3RoaXMucHJvcHMuY2hlY2tlZH0gLz5cblx0XHRcdFx0XHR7dGhpcy5wcm9wcy5sYWJsZX1cblx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZWRpdCBjb2wteHMtNFwiPiBcblx0XHRcdFx0XHQ8YnV0dG9uIFxuXHRcdFx0XHRcdFx0dHlwZT1cImJ1dHRvblwiIFxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0IGlubGluZS10YXNrXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMucHJvcHMuZWRpdFRhc2t9XG5cdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLWVkaXRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XG5cdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVx0XG59IiwiXG4vKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmltcG9ydCBUYXNrQ2hlY2sgZnJvbSAnLi90YXNrQ2hlY2snXG5pbXBvcnQgQ3JlYXRlSXNzdWUgZnJvbSAnLi9jcmVhdGVJc3N1ZSdcbmltcG9ydCBNb2RhbCBmcm9tICcuLi91dGlscy9tb2RhbCdcbmltcG9ydCB7Rm9ybSwgU2VsZWN0fSBmcm9tICcuLi91dGlscy9mb3JtcydcbmltcG9ydCB7U3ByYXlGb3JtLFBydW5pbmdGb3JtfSBmcm9tICcuLi92aW5leWFyZC9zcHJheUZvcm0nXG5pbXBvcnQgRG9jdHlwZUZvcm0gZnJvbSAnLi4vdXRpbHMvZG9jdHlwZUZvcm0nXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29ya29yZGVyVGFzayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnN0YXRlPXtcblx0XHRcdGlzc3VlczpbXSxcblx0XHRcdHRpdGxlOicnLFxuXHRcdFx0bW9kYWw6J25ldycsXG5cdFx0XHRtb2RhbFByaW9yaXR5Oidsb3cnLFxuXHRcdFx0bW9kYWxUaXRsZTonJyxcblx0XHRcdG1vZGFsRGVzY3JpcHRpb246JycsXG5cdFx0XHRtb2RhbE5hbWU6Jydcblx0XHR9O1xuXHRcdHRoaXMudGFza0NoZWNrZWQ9dGhpcy50YXNrQ2hlY2tlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuc3RhdHVzQ2hhbmdlPXRoaXMuc3RhdHVzQ2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5hY3RpdmF0ZU1vZGFsTmV3PXRoaXMuYWN0aXZhdGVNb2RhbE5ldy5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuYWN0aXZhdGVNb2RhbEVkaXQ9dGhpcy5hY3RpdmF0ZU1vZGFsRWRpdC5iaW5kKHRoaXMpO1xuXG5cdFx0dGhpcy5pc3N1ZUZvcm1DaGFuZ2U9dGhpcy5pc3N1ZUZvcm1DaGFuZ2UuYmluZCh0aGlzKTtcblx0XHR0aGlzLmNyZWF0ZUlzc3VlPXRoaXMuY3JlYXRlSXNzdWUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmVkaXRJc3N1ZT10aGlzLmVkaXRJc3N1ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZGVsZXRlSXNzdWU9dGhpcy5kZWxldGVJc3N1ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY2xvc2U9dGhpcy5jbG9zZS5iaW5kKHRoaXMpO1xuXG5cdFx0dGhpcy5pc3N1ZUNoYW5nZWQ9dGhpcy5pc3N1ZUNoYW5nZWQuYmluZCh0aGlzKTtcblxuXG5cdFx0dGhpcy5tb2RhbElkPVwiaXNzdWUtZm9ybS1cIit0aGlzLnByb3BzLndvcmtvcmRlcjtcblxuXHRcdFxuXHRcdHRoaXMuaXNzdWVUb29sID0gbmV3IHBzLmFwaVRvb2woe1wid29ya19vcmRlclwiOnRoaXMucHJvcHMud29ya29yZGVyfSx7ZG9jdHlwZTonSXNzdWUnfSx0aGlzLmlzc3VlQ2hhbmdlZCk7XG5cblxuXHR9XG5cdHRhc2tDaGVja2VkKGUpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe3RpdGxlOlwiQ0hFQ0tFRFwifSk7XG5cdH1cblx0aXNDaGVja2VkKHZhbHVlKXtcbiAgICBcdHJldHVybiAoKHZhbHVlPT09dGhpcy5zdGF0ZS5zZWxlY3RlZCkgPydjaGVja2VkIGxpbmUtdGhyb3VnaCc6J2RlZmF1bHQnKTtcbiAgXHR9XG4gIFx0dGFza0NoZWNrZWQoaW5kZXgsY2hlY2tlZCl7XG4gIFx0XHR2YXIgd29faW5kZXg9dGhpcy5wcm9wcy5pbmRleDtcbiAgXHRcdHRoaXMucHJvcHMub25UYXNrQ2hlY2tlZCh3b19pbmRleCxpbmRleCxjaGVja2VkKTtcbiAgXHR9XG4gIFx0c3RhdHVzQ2hhbmdlKGUpe1xuICBcdFx0dGhpcy5wcm9wcy5vblN0YXR1c0NoYW5nZWQoZS50YXJnZXQudmFsdWUsdGhpcy5wcm9wcy5pbmRleCk7XG5cbiAgXHR9XG4gIFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRcdFx0SVNTVUUgRlVOQ1RJT05TXG4gIFx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gIFx0YWN0aXZhdGVNb2RhbE5ldygpe1xuICBcdFx0dGhpcy5zZXRTdGF0ZSh7aXNzdWVNb2RlOlwiY3JlYXRlXCJ9KTtcbiAgXHRcdHRoaXMuc2V0U3RhdGUoe2lzc3VlOnt9fSk7XG4gIFx0XHQkKCcjJyt0aGlzLm1vZGFsSWQpLm1vZGFsKCk7XG4gIFx0fVxuICBcdGFjdGl2YXRlTW9kYWxFZGl0KGlzc3VlKXtcbiAgXHRcdHRoaXMuc2V0U3RhdGUoe2lzc3VlTW9kZTpcImVkaXRcIn0pO1xuXHRcdHRoaXMuc2V0U3RhdGUoe2lzc3VlOmlzc3VlfSk7XG4gIFx0XHQkKCcjJyt0aGlzLm1vZGFsSWQpLm1vZGFsKCk7XG4gIFx0fVxuICBcdGlzc3VlRm9ybUNoYW5nZShpc3N1ZSl7XG4gIFx0XHR0aGlzLnNldFN0YXRlKHtpc3N1ZTppc3N1ZX0pO1xuICBcdH1cbiAgXHRpc3N1ZUNoYW5nZWQoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtpc3N1ZXM6dGhpcy5pc3N1ZVRvb2wuaXRlbXN9KTtcblx0fVxuICBcdGNyZWF0ZUlzc3VlKGl0ZW0pe1xuICBcdFx0Ly9jb25zb2xlLmxvZyh0aGlzLnN0YXRlLmlzc3VlKTtcblx0XHRpdGVtLnZpbmV5YXJkPXRoaXMucHJvcHMubG9jYXRpb247XG5cdFx0aXRlbS53b3JrX29yZGVyPXRoaXMucHJvcHMud29ya29yZGVyO1xuXHRcdHRoaXMuaXNzdWVUb29sLmNyZWF0ZShpdGVtLGZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0cHMuc3VjY2Vzc0FsZXJ0KFwiSXNzdWUgXCIgK2l0ZW0udGl0bGUrIFwiIGNyZWF0ZWQuXCIpXG5cdFx0fSk7XG5cdFx0JCgnIycrdGhpcy5tb2RhbElkKS5tb2RhbCgndG9nZ2xlJyk7XG5cdH1cblx0ZGVsZXRlSXNzdWUoaXRlbSl7XG4gIFx0XHR0aGlzLmlzc3VlVG9vbC5kZWxldGUoaXRlbSk7XG5cdFx0JCgnIycrdGhpcy5tb2RhbElkKS5tb2RhbCgndG9nZ2xlJyk7XG5cdH1cblx0ZWRpdElzc3VlKGl0ZW0pe1xuXHRcdHRoaXMuaXNzdWVUb29sLnVwZGF0ZShpdGVtLGZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0cHMuc3VjY2Vzc0FsZXJ0KFwiSXNzdWUgXCIgK2l0ZW0udGl0bGUrXCIgdXBkYXRlZC5cIilcblx0XHR9KTtcblx0XHQkKCcjJyt0aGlzLm1vZGFsSWQpLm1vZGFsKCd0b2dnbGUnKTtcblx0fVxuXHRjbG9zZSgpe1xuXHRcdCQoJyMnK3RoaXMubW9kYWxJZCkubW9kYWwoJ3RvZ2dsZScpO1xuXHR9XG5cblxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB0aXRsZT1cIndlbGNvbWVcIjtcblx0XHR2YXIgbWFpbkNsYXNzPXtcblx0XHRcdCdDb21wbGV0ZSc6J3BhbmVsLXN1Y2Nlc3MnLFxuXHRcdFx0J0luY29tcGxldGUnOidwYW5lbC1kYW5nZXInLFxuXHRcdFx0J1BlbmRpbmcnOidwYW5lbC1kZWZhdWx0Jyxcblx0XHRcdCdTdGFydGVkJzoncGFuZWwtd2FybmluZydcblx0XHR9W3RoaXMucHJvcHMuc3RhdHVzXTtcblx0XHRtYWluQ2xhc3MgPSBtYWluQ2xhc3MgKyBcIiBwYW5lbCB3b3Jrb3JkZXIgcHMtcGFuZWxcIjtcblx0XHR2YXIgcm91dGU9KHRoaXMucHJvcHMucm91dGU9PT11bmRlZmluZWQpP1wiTm90IENyZWF0ZWRcIjooPGEgY2xhc3NOYW1lPVwiXCIgaHJlZj17dGhpcy5wcm9wcy5yb3V0ZX0+TW9yZSBJbmZvcm1hdGlvbjwvYT4pO1xuXHRcdHZhciB0YXNrcz1cIlwiO1xuXHRcdGlmKHRoaXMucHJvcHMudGFza3MhPT11bmRlZmluZWQpe1xuXHRcdFx0dGFza3M9W107XG5cdFx0XHR0aGlzLnByb3BzLnRhc2tzLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCl7XG5cdFx0XHRcdHZhciBjaGVja2VkPWl0ZW0uc3RhdHVzP3RydWU6ZmFsc2U7XG5cdFx0XHRcdHRhc2tzLnB1c2goPFRhc2tDaGVjayBrZXk9e2luZGV4fSBpbmRleD17aW5kZXh9IGxhYmxlPXtpdGVtLnRhc2t9IGNoZWNrZWQ9e2NoZWNrZWR9IHRhc2tDaGVja2VkPXt0aGlzLnRhc2tDaGVja2VkfS8+KTtcblx0XHRcdH0uYmluZCh0aGlzKSlcblx0XHR9XG5cblx0XHR2YXIgbW9kYWxUaXRsZSA9IFwiXCI7XG5cdFx0aWYodGhpcy5zdGF0ZS5pc3N1ZU1vZGUpe1xuXHRcdFx0bW9kYWxUaXRsZSA9IFwiQ3JlYXRlIElzc3VlXCI7XG5cdFx0fWVsc2V7XG5cdFx0XHRtb2RhbFRpdGxlID0gXCJFZGl0IElzc3VlXCI7XG5cdFx0fVxuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPSdjb2wtbWQtNCBjb2wtc20tNCc+XG5cdFx0XHRcdDxNb2RhbCBcblx0XHRcdFx0XHRpZD17dGhpcy5tb2RhbElkfSBcblx0XHRcdFx0XHRzdWJtaXRUZXh0PVwiU3VibWl0XCIgXG5cdFx0XHRcdFx0dGl0bGU9XCJDcmVhdGUgSXNzdWUgRm9yXCJcblx0XHRcdFx0XHRzdWJtaXQ9e2ZhbHNlfVxuXHRcdFx0XHRcdD5cblxuXHRcdFx0XHRcdFx0PERvY3R5cGVGb3JtIFxuXHRcdFx0XHRcdFx0XHRjbG9zZT17dGhpcy5jbG9zZX1cblx0XHRcdFx0XHRcdFx0aXRlbUNoYW5nZT17dGhpcy5pc3N1ZUZvcm1DaGFuZ2V9XG5cdFx0XHRcdFx0XHRcdGNyZWF0ZT17dGhpcy5jcmVhdGVJc3N1ZX1cblx0XHRcdFx0XHRcdFx0ZWRpdD17dGhpcy5lZGl0SXNzdWV9XG5cdFx0XHRcdFx0XHRcdGRlbGV0ZT17dGhpcy5kZWxldGVJc3N1ZX1cblx0XHRcdFx0XHRcdFx0bW9kZT17dGhpcy5zdGF0ZS5pc3N1ZU1vZGV9XG5cdFx0XHRcdFx0XHRcdGl0ZW09e3RoaXMuc3RhdGUuaXNzdWV9XG5cdFx0XHRcdFx0XHRcdGlkPXt0aGlzLnByb3BzLndvcmtvcmRlcn1cblxuXHRcdFx0XHRcdFx0XHRkb2N0eXBlPVwiSXNzdWVcIlxuXHRcdFx0XHRcdFx0XHRpc3N1ZV90aXRsZT17e2FjdGl2ZToxfX1cblx0XHRcdFx0XHRcdFx0aXNzdWU9e3tcblx0XHRcdFx0XHRcdFx0XHRhY3RpdmU6MSxcblx0XHRcdFx0XHRcdFx0XHR0eXBlOlwidGV4dGFyZWFcIiBcblx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdFx0cHJpb3JpdHk9e3tcblx0XHRcdFx0XHRcdFx0XHRhY3RpdmU6MSxcblx0XHRcdFx0XHRcdFx0XHRkZWZhdWx0OlwiTG93XCJcblx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdFx0c3RhdHVzPXt7XG5cdFx0XHRcdFx0XHRcdFx0YWN0aXZlOjEsXG5cdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcIk9wZW5cIlxuXHRcdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0Lz4gXHRcblx0XHRcdFx0PC9Nb2RhbD5cblx0XHRcdDxkaXYgaWQ9XCJcIiBjbGFzc05hbWU9e21haW5DbGFzc30+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtaGVhZGluZ1wiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG5cdFx0XHRcdFx0XHQ8aDMgY2xhc3NOYW1lPVwicGFuZWwtdGl0bGUgY29sLXhzLThcIj5cblx0XHRcdFx0XHRcdFx0PGEgY2xhc3NOYW1lPVwiZmxvYXQtbGVmdFwiIGhyZWY9e3RoaXMucHJvcHMubG9jYXRpb25fcm91dGV9Pnt0aGlzLnByb3BzLmxvY2F0aW9ufTwvYT5cblx0XHRcdFx0XHRcdDwvaDM+XG5cblxuXG5cdFx0XHRcdFx0XHRcdDxDcmVhdGVJc3N1ZVxuXHRcdFx0XHRcdFx0XHRcdGlzc3Vlcz17dGhpcy5zdGF0ZS5pc3N1ZXN9XG5cdFx0XHRcdFx0XHRcdFx0YWN0aXZhdGVNb2RhbE5ldz17dGhpcy5hY3RpdmF0ZU1vZGFsTmV3fVxuXHRcdFx0XHRcdFx0XHRcdGFjdGl2YXRlTW9kYWxFZGl0PXt0aGlzLmFjdGl2YXRlTW9kYWxFZGl0fVxuXHRcdFx0XHRcdFx0XHRcdHdvcmtvcmRlcj17dGhpcy5wcm9wcy53b3Jrb3JkZXJ9XG5cblx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPjwvZGl2PlxuXG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcblxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYW5lbC1ib2R5XCI+XG5cdFx0XHRcdFx0PHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgc3RhdHVzXCIgdmFsdWU9e3RoaXMucHJvcHMuc3RhdHVzfSBvbkNoYW5nZT17dGhpcy5zdGF0dXNDaGFuZ2V9PlxuXHRcdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIlBlbmRpbmdcIj5QZW5kaW5nPC9vcHRpb24+XG5cdFx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPVwiU3RhcnRlZFwiPlN0YXJ0ZWQ8L29wdGlvbj5cblx0XHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9XCJDb21wbGV0ZVwiPkNvbXBsZXRlPC9vcHRpb24+XG5cdFx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPVwiSW5jb21wbGV0ZVwiPkluY29tcGxldGU8L29wdGlvbj5cblx0XHRcdFx0XHQ8L3NlbGVjdD5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hlY2tfYm94ZXNcIj5cblxuXHRcdFx0XHRcdFx0e3Rhc2tzfVxuXHRcdFx0XHRcdFx0PFZpbmV5YXJkVGFza3Mgd29ya29yZGVyPXt0aGlzLnByb3BzLndvcmtvcmRlcn0gdmluZXlhcmQ9e3RoaXMucHJvcHMubG9jYXRpb259Lz5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdFx0e3JvdXRlfVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5cblxuXG5leHBvcnQgY2xhc3MgVmluZXlhcmRUYXNrcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblxuXHRcdHRoaXMubW9kYWxOZXdUYXNrPXRoaXMubW9kYWxOZXdUYXNrLmJpbmQodGhpcyk7XG5cdFx0dGhpcy50YXNrQ2hlY2tlZD10aGlzLnRhc2tDaGVja2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy50YXNrQ2hhbmdlZD10aGlzLnRhc2tDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5lZGl0VGFzaz10aGlzLmVkaXRUYXNrLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5nZXRGb3JtPXRoaXMuZ2V0Rm9ybS5iaW5kKHRoaXMpO1xuXG5cdFx0dGhpcy5kZWxldGU9dGhpcy5kZWxldGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmNsb3NlPXRoaXMuY2xvc2UuYmluZCh0aGlzKTtcblx0XHR0aGlzLnVwZGF0ZT10aGlzLnVwZGF0ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY3JlYXRlPXRoaXMuY3JlYXRlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5vbkNoYW5nZT10aGlzLm9uQ2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0XG5cblx0XHR0aGlzLm1vZGFsSWQ9XCJ0YXNrLWZvcm1cIit0aGlzLnByb3BzLndvcmtvcmRlcjtcblx0XHRcblx0XHR0aGlzLnRhc2tzVG9vbCA9IG5ldyBwcy5hcGlUb29sKHtcIndvcmtfb3JkZXJcIjp0aGlzLnByb3BzLndvcmtvcmRlcn0scHMuYXBpU2V0dXAudmluZXlhcmRUYXNrcyx0aGlzLnRhc2tDaGFuZ2VkKTtcblx0XHR0aGlzLnN0YXRlPXtcblx0XHRcdHRhc2tzOnRoaXMudGFza3NUb29sLml0ZW1zLFxuXHRcdFx0Zm9ybVN0YXRlOiBcInRhc2tUeXBlXCIsXG5cdFx0XHRmb3JtTW9kZTpcImNyZWF0ZVwiLFxuXHRcdFx0ZWRpdEl0ZW06bnVsbFxuXHRcdH07XG5cdH1cblx0bW9kYWxOZXdUYXNrKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRmb3JtU3RhdGU6XCJ0YXNrVHlwZVwiLFxuXHRcdFx0ZWRpdEl0ZW06bnVsbCxcblx0XHRcdGZvcm1Nb2RlOlwiY3JlYXRlXCJcblx0XHR9KTtcblx0XHQkKCcjJyt0aGlzLm1vZGFsSWQpLm1vZGFsKCk7XG5cdH1cblx0aXNDaGVja2VkKHZhbHVlKXtcbiAgICBcdC8vcmV0dXJuICgodmFsdWU9PT10aGlzLnN0YXRlLnNlbGVjdGVkKSA/J2NoZWNrZWQgbGluZS10aHJvdWdoJzonZGVmYXVsdCcpO1xuICBcdH1cbiAgXHR0YXNrQ2hhbmdlZCgpe1xuICBcdFx0dGhpcy5zZXRTdGF0ZSh7dGFza3M6dGhpcy50YXNrc1Rvb2wuaXRlbXN9KTtcbiAgXHR9XG4gIFx0dGFza0NoZWNrZWQoaXRlbSl7XG4gIFx0XHRpdGVtLmNvbXBsZXRlPWl0ZW0uY29tcGxldGU/MDoxO1xuICBcdFx0dGhpcy50YXNrc1Rvb2wudXBkYXRlKGl0ZW0pO1xuICBcdH1cbiAgXHRlZGl0VGFzayhpdGVtKXtcbiAgXHRcdGNvbnNvbGUubG9nKFwiZWRpdCB0YXNrIGNhbGxlZFwiKTtcbiAgXHRcdGNvbnNvbGUubG9nKGl0ZW0pO1xuICBcdFx0dGhpcy5zZXRTdGF0ZShcbiAgXHRcdFx0e1xuICBcdFx0XHRcdGZvcm1TdGF0ZTppdGVtLmRvY3R5cGUucmVwbGFjZSgvXFxzL2csICcnKSxcbiAgXHRcdFx0XHRlZGl0SXRlbTppdGVtLFxuICBcdFx0XHRcdGZvcm1Nb2RlOlwiZWRpdFwiXG4gIFx0XHRcdH0pO1xuICBcdFx0JCgnIycrdGhpcy5tb2RhbElkKS5tb2RhbCgpO1xuICBcdH1cbiAgXHRyZW5kZXJUYXNrcygpe1xuICBcdFx0dmFyIHRhc2tzPVtdO1xuICBcdFx0aWYodGhpcy5zdGF0ZS50YXNrcyE9PXVuZGVmaW5lZCYmdGhpcy5zdGF0ZS50YXNrcyE9PW51bGwpe1xuXHRcdFx0dGFza3M9W107XG5cdFx0XHR0aGlzLnN0YXRlLnRhc2tzLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCl7XG5cdFx0XHRcdC8vdmFyIGNoZWNrZWQ9aXRlbS5zdGF0dXM/dHJ1ZTpmYWxzZTtcblx0XHRcdFx0dGFza3MucHVzaChcblx0XHRcdFx0XHQ8VGFza0NoZWNrIFxuXHRcdFx0XHRcdFx0a2V5PXtpbmRleH1cblx0XHRcdFx0XHRcdGluZGV4PXtpbmRleH1cblx0XHRcdFx0XHRcdGl0ZW09e2l0ZW19XG5cdFx0XHRcdFx0XHRsYWJsZT17aXRlbS5kb2N0eXBlfVxuXHRcdFx0XHRcdFx0Y2hlY2tlZD17aXRlbS5jb21wbGV0ZX1cblx0XHRcdFx0XHRcdHRhc2tDaGVja2VkPXt0aGlzLnRhc2tDaGVja2VkfVxuXHRcdFx0XHRcdFx0ZWRpdFRhc2s9e2Z1bmN0aW9uKGUpe3RoaXMuZWRpdFRhc2soaXRlbSk7fS5iaW5kKHRoaXMpfVxuXHRcdFx0XHRcdC8+KTtcblx0XHRcdH0uYmluZCh0aGlzKSlcblx0XHR9XG5cdFx0cmV0dXJuIHRhc2tzO1xuICBcdH1cbiAgXHRkZWxldGUoY29weSl7XG4gIFx0XHR0aGlzLnRhc2tzVG9vbC5kZWxldGUoY29weSk7XG5cdFx0JCgnIycrdGhpcy5tb2RhbElkKS5tb2RhbCgndG9nZ2xlJyk7XG5cdH1cbiAgXHRjbG9zZShlKXtcbiAgXHRcdGNvbnNvbGUubG9nKFwiY2xvc2VcIik7XG4gIFx0XHQkKCcjJyt0aGlzLm1vZGFsSWQpLm1vZGFsKCd0b2dnbGUnKTtcbiAgXHR9XG4gIFx0dXBkYXRlKGNvcHkpe1xuICBcdFx0dGhpcy50YXNrc1Rvb2wudXBkYXRlKGNvcHkpO1xuXHRcdCQoJyMnK3RoaXMubW9kYWxJZCkubW9kYWwoJ3RvZ2dsZScpO1xuICBcdH1cbiAgXHRjcmVhdGUoaXRlbSxkb2N0eXBlKXtcblx0XHRpdGVtLndvcmtfb3JkZXI9dGhpcy5wcm9wcy53b3Jrb3JkZXI7XG5cdFx0aXRlbS52aW5leWFyZD10aGlzLnByb3BzLnZpbmV5YXJkO1xuXHRcdGl0ZW0uZG9jdHlwZT1kb2N0eXBlO1xuXHRcdHRoaXMudGFza3NUb29sLmNyZWF0ZShpdGVtKTtcblx0XHQkKCcjJyt0aGlzLm1vZGFsSWQpLm1vZGFsKCd0b2dnbGUnKTtcbiAgXHR9XG4gIFx0b25DaGFuZ2UoY29weSl7XG4gIFx0XHR0aGlzLnNldFN0YXRlKHtlZGl0SXRlbTpjb3B5fSlcbiAgXHR9XG4gIFx0Z2V0Rm9ybSgpe1xuICBcdFx0dmFyIGZvcm1zT2JqPXtcblx0XHRcdHRhc2tUeXBlOmZ1bmN0aW9uKCl7XG5cdFx0XHRcdHJldHVybihcdFxuXHRcdFx0XHQ8U2VsZWN0XG5cdFx0XHRcdFx0Y2xhc3NOYW1lPVwiXCJcblx0XHRcdFx0XHRsYWJsZT1cIlRhc2sgVHlwZVwiXG5cdFx0XHRcdFx0b3B0aW9ucz17W1wiIFwiXS5jb25jYXQocHMuYXBpU2V0dXAudmluZXlhcmRUYXNrcy5kb2N0eXBlKX1cblx0XHRcdFx0XHRpbnB1dENoYW5nZWQ9e1xuXHRcdFx0XHRcdFx0ZnVuY3Rpb24oZSl7dGhpcy5zZXRTdGF0ZSh7Zm9ybVN0YXRlOiAgZS50YXJnZXQudmFsdWUucmVwbGFjZSgvXFxzL2csICcnKSAgfSl9LmJpbmQodGhpcylcblx0XHRcdFx0XHR9XG5cdFx0XHRcdC8+XG5cdFx0XHQpfS5iaW5kKHRoaXMpLFxuXHRcdFx0U3ByYXlpbmc6ZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdHJldHVybiAoXHRcdFx0XHRcdFxuXHRcdFx0XHRcdDxEb2N0eXBlRm9ybSBcblx0XHRcdFx0XHRcdGNsb3NlPXt0aGlzLmNsb3NlfVxuXHRcdFx0XHRcdFx0aXRlbUNoYW5nZT17dGhpcy5vbkNoYW5nZX1cblx0XHRcdFx0XHRcdGNyZWF0ZT17dGhpcy5jcmVhdGV9XG5cdFx0XHRcdFx0XHRlZGl0PXt0aGlzLnVwZGF0ZX1cblx0XHRcdFx0XHRcdGRlbGV0ZT17dGhpcy5kZWxldGV9XG5cdFx0XHRcdFx0XHRtb2RlPXt0aGlzLnN0YXRlLmZvcm1Nb2RlfVxuXHRcdFx0XHRcdFx0aXRlbT17aXRlbX1cblx0XHRcdFx0XHRcdGlkPXt0aGlzLnByb3BzLndvcmtvcmRlcn1cblxuXHRcdFx0XHRcdFx0ZG9jdHlwZT1cIlNwcmF5aW5nXCJcblx0XHRcdFx0XHRcdHNlYXNvbj17e2FjdGl2ZToxfX1cblx0XHRcdFx0XHRcdG5vdGU9e3tcblx0XHRcdFx0XHRcdFx0YWN0aXZlOjEsXG5cdFx0XHRcdFx0XHRcdHR5cGU6XCJ0ZXh0YXJlYVwiIFxuXHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdHNwcmF5X3R5cGU9e3thY3RpdmU6MX19XG5cblx0XHRcdFx0XHQvPiBcdFx0XG5cdFx0XHRcdCk7XG5cblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdEhhcnZlc3Q6ZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdHJldHVybiAoXHRcdFx0XHRcdFxuXHRcdFx0XHRcdDxEb2N0eXBlRm9ybSBcblx0XHRcdFx0XHRcdGNsb3NlPXt0aGlzLmNsb3NlfVxuXHRcdFx0XHRcdFx0aXRlbUNoYW5nZT17dGhpcy5vbkNoYW5nZX1cblx0XHRcdFx0XHRcdGNyZWF0ZT17dGhpcy5jcmVhdGV9XG5cdFx0XHRcdFx0XHRlZGl0PXt0aGlzLnVwZGF0ZX1cblx0XHRcdFx0XHRcdGRlbGV0ZT17dGhpcy5kZWxldGV9XG5cdFx0XHRcdFx0XHRtb2RlPXt0aGlzLnN0YXRlLmZvcm1Nb2RlfVxuXHRcdFx0XHRcdFx0aXRlbT17aXRlbX1cblx0XHRcdFx0XHRcdGlkPXt0aGlzLnByb3BzLndvcmtvcmRlcn1cblxuXHRcdFx0XHRcdFx0ZG9jdHlwZT1cIkhhcnZlc3RcIlxuXHRcdFx0XHRcdFx0c2Vhc29uPXt7YWN0aXZlOjF9fVxuXHRcdFx0XHRcdFx0bm90ZT17e1xuXHRcdFx0XHRcdFx0XHRhY3RpdmU6MSxcblx0XHRcdFx0XHRcdFx0dHlwZTpcInRleHRhcmVhXCIgXG5cdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0cG91bmRzPXt7YWN0aXZlOjF9fVxuXHRcdFx0XHRcdFx0cG9zdF9oYXJ2ZXN0X3dhdGVyPXt7YWN0aXZlOjF9fVxuXG5cdFx0XHRcdFx0Lz4gXHRcdFxuXHRcdFx0XHQpO1xuXG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRCaXJkTmV0czpmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0cmV0dXJuIChcdFx0XHRcdFx0XG5cdFx0XHRcdFx0PERvY3R5cGVGb3JtIFxuXHRcdFx0XHRcdFx0Y2xvc2U9e3RoaXMuY2xvc2V9XG5cdFx0XHRcdFx0XHRpdGVtQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxuXHRcdFx0XHRcdFx0Y3JlYXRlPXt0aGlzLmNyZWF0ZX1cblx0XHRcdFx0XHRcdGVkaXQ9e3RoaXMudXBkYXRlfVxuXHRcdFx0XHRcdFx0ZGVsZXRlPXt0aGlzLmRlbGV0ZX1cblx0XHRcdFx0XHRcdG1vZGU9e3RoaXMuc3RhdGUuZm9ybU1vZGV9XG5cdFx0XHRcdFx0XHRpdGVtPXtpdGVtfVxuXHRcdFx0XHRcdFx0aWQ9e3RoaXMucHJvcHMud29ya29yZGVyfVxuXG5cdFx0XHRcdFx0XHRkb2N0eXBlPVwiQmlyZCBOZXRzXCJcblx0XHRcdFx0XHRcdHNlYXNvbj17e2FjdGl2ZToxfX1cblx0XHRcdFx0XHRcdG5vdGU9e3tcblx0XHRcdFx0XHRcdFx0YWN0aXZlOjEsXG5cdFx0XHRcdFx0XHRcdHR5cGU6XCJ0ZXh0YXJlYVwiIFxuXHRcdFx0XHRcdFx0fX1cblxuXHRcdFx0XHRcdC8+IFx0XHRcblx0XHRcdFx0KTtcblxuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0V2F0ZXJpbmc6ZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdHJldHVybiAoXHRcdFx0XHRcdFxuXHRcdFx0XHRcdDxEb2N0eXBlRm9ybSBcblx0XHRcdFx0XHRcdGNsb3NlPXt0aGlzLmNsb3NlfVxuXHRcdFx0XHRcdFx0aXRlbUNoYW5nZT17dGhpcy5vbkNoYW5nZX1cblx0XHRcdFx0XHRcdGNyZWF0ZT17dGhpcy5jcmVhdGV9XG5cdFx0XHRcdFx0XHRlZGl0PXt0aGlzLnVwZGF0ZX1cblx0XHRcdFx0XHRcdGRlbGV0ZT17dGhpcy5kZWxldGV9XG5cdFx0XHRcdFx0XHRtb2RlPXt0aGlzLnN0YXRlLmZvcm1Nb2RlfVxuXHRcdFx0XHRcdFx0aXRlbT17aXRlbX1cblx0XHRcdFx0XHRcdGlkPXt0aGlzLnByb3BzLndvcmtvcmRlcn1cblxuXHRcdFx0XHRcdFx0ZG9jdHlwZT1cIldhdGVyaW5nXCJcblx0XHRcdFx0XHRcdHNlYXNvbj17e2FjdGl2ZToxfX1cblx0XHRcdFx0XHRcdG5vdGU9e3tcblx0XHRcdFx0XHRcdFx0YWN0aXZlOjEsXG5cdFx0XHRcdFx0XHRcdHR5cGU6XCJ0ZXh0YXJlYVwiIFxuXHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdGR1cmF0aW9uPXt7YWN0aXZlOjF9fVxuXG5cdFx0XHRcdFx0Lz4gXHRcdFxuXHRcdFx0XHQpO1xuXG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRDYW5vcHk6ZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdHJldHVybiAoXHRcdFx0XHRcdFxuXHRcdFx0XHRcdDxEb2N0eXBlRm9ybSBcblx0XHRcdFx0XHRcdGNsb3NlPXt0aGlzLmNsb3NlfVxuXHRcdFx0XHRcdFx0aXRlbUNoYW5nZT17dGhpcy5vbkNoYW5nZX1cblx0XHRcdFx0XHRcdGNyZWF0ZT17dGhpcy5jcmVhdGV9XG5cdFx0XHRcdFx0XHRlZGl0PXt0aGlzLnVwZGF0ZX1cblx0XHRcdFx0XHRcdGRlbGV0ZT17dGhpcy5kZWxldGV9XG5cdFx0XHRcdFx0XHRtb2RlPXt0aGlzLnN0YXRlLmZvcm1Nb2RlfVxuXHRcdFx0XHRcdFx0aXRlbT17aXRlbX1cblx0XHRcdFx0XHRcdGlkPXt0aGlzLnByb3BzLndvcmtvcmRlcn1cblxuXHRcdFx0XHRcdFx0ZG9jdHlwZT1cIkNhbm9weVwiXG5cdFx0XHRcdFx0XHRzZWFzb249e3thY3RpdmU6MX19XG5cdFx0XHRcdFx0XHRub3RlPXt7XG5cdFx0XHRcdFx0XHRcdGFjdGl2ZToxLFxuXHRcdFx0XHRcdFx0XHR0eXBlOlwidGV4dGFyZWFcIiBcblx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHR0eXBlPXt7YWN0aXZlOjF9fVxuXG5cdFx0XHRcdFx0Lz4gXHRcdFxuXHRcdFx0XHQpO1xuXG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRQcnVuaW5nOmZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKFwiTU9ERVwiLCB0aGlzLnN0YXRlLmZvcm1Nb2RlKTtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8RG9jdHlwZUZvcm0gXG5cdFx0XHRcdFx0XHRjbG9zZT17dGhpcy5jbG9zZX1cblx0XHRcdFx0XHRcdGl0ZW1DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG5cdFx0XHRcdFx0XHRjcmVhdGU9e3RoaXMuY3JlYXRlfVxuXHRcdFx0XHRcdFx0ZWRpdD17dGhpcy51cGRhdGV9XG5cdFx0XHRcdFx0XHRkZWxldGU9e3RoaXMuZGVsZXRlfVxuXHRcdFx0XHRcdFx0bW9kZT17dGhpcy5zdGF0ZS5mb3JtTW9kZX1cblx0XHRcdFx0XHRcdGl0ZW09e2l0ZW19XG5cdFx0XHRcdFx0XHRpZD17dGhpcy5wcm9wcy53b3Jrb3JkZXJ9XG5cblx0XHRcdFx0XHRcdGRvY3R5cGU9XCJQcnVuaW5nXCJcblx0XHRcdFx0XHRcdHNlYXNvbj17e2FjdGl2ZToxfX1cblx0XHRcdFx0XHRcdG5vdGU9e3tcblx0XHRcdFx0XHRcdFx0YWN0aXZlOjEsXG5cdFx0XHRcdFx0XHRcdHR5cGU6XCJ0ZXh0YXJlYVwiIFxuXHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdHR5cGU9e3thY3RpdmU6MX19XG5cdFx0XHRcdFx0XHRiX2xvY2s9e3thY3RpdmU6MX19XG5cdFx0XHRcdFx0XHRyZW1vdmVkPXt7YWN0aXZlOjF9fVxuXHRcdFx0XHRcdFx0cHJlX3BydW5lPXt7YWN0aXZlOjF9fVxuXHRcdFx0XHRcdFx0dGFwX3JlbW92ZWQ9e3thY3RpdmU6MX19XG5cblx0XHRcdFx0XHQvPiBcdFx0XG5cdFx0XHRcdCk7XG5cblx0XHRcdH0uYmluZCh0aGlzKVxuXHRcdH07XG5cdFx0Ly9jb25zb2xlLmxvZyhcImdldCBmb3JtIGNhbGxlZFwiKTtcblx0XHRyZXR1cm4gZm9ybXNPYmpbdGhpcy5zdGF0ZS5mb3JtU3RhdGVdKHRoaXMuc3RhdGUuZWRpdEl0ZW0pO1xuICBcdH1cblx0cmVuZGVyKCl7XG5cdFx0dmFyIGZpZWxkc1NwcmF5PVtcdFx0XG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiYnV0dG9uXCIsXG5cdFx0XHRcdHR5cGU6XCJzdWJtaXRcIixcblx0XHRcdFx0dmFsdWU6XCJDcmVhdGUgU3ByYXlpbmcgRW50cnlcIixcblx0XHRcdFx0Y2xhc3NOYW1lOlwiYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiLFxuXHRcdFx0XHRvbkNsaWNrOnRoaXMuc3VibWl0XG5cdFx0XHR9XG5cdFx0XVxuXHRcdHZhciB0YXNrcz10aGlzLnJlbmRlclRhc2tzKCk7XG5cdFx0dmFyIGZvcm09dGhpcy5nZXRGb3JtKCk7XG5cdFx0dmFyIGxhYmxlPVwiQ3JlYXRlIE5ldyBUYXNrXCI7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9Jyc+XG5cdFx0XHR7dGFza3N9XG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoZWNrYm94IHJvdyBhZGRidXR0b25cIj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJlZGl0XCI+IFxuXHRcdFx0XHRcdDxidXR0b24gXG5cdFx0XHRcdFx0XHR0eXBlPVwiYnV0dG9uXCIgXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHQgaW5saW5lLXRhc2tcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17dGhpcy5tb2RhbE5ld1Rhc2t9XG5cdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzIFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj4gQWRkIFRhc2tcblx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PE1vZGFsIFxuXHRcdFx0XHRcdGlkPXt0aGlzLm1vZGFsSWR9IFxuXHRcdFx0XHRcdHN1Ym1pdFRleHQ9XCJTdWJtaXRcIiBcblx0XHRcdFx0XHR0aXRsZT17bGFibGV9XG5cdFx0XHRcdFx0c3VibWl0PXtmYWxzZX1cblx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0e2Zvcm19XG5cdFx0XHRcdDwvTW9kYWw+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cblxuIiwiaW1wb3J0IEFjb3JkaWFuQ29udGVudCBmcm9tICcuL2Fjb3JkaWFuQ29udGVudCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWNvcmRpYW4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtZ3JvdXBcIiBpZD17dGhpcy5wcm9wcy5pZH0gcm9sZT1cInRhYmxpc3RcIiBhcmlhLW11bHRpc2VsZWN0YWJsZT1cInRydWVcIj5cblx0XHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW59XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbi8ve1JlYWN0LmNsb25lRWxlbWVudCh0aGlzLnByb3BzLmNoaWxkcmVuLCB7IHRvZ2dsZUFsbDogdGhpcy5wcm9wcy50b2dnbGVBbGwgfSl9IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWNvcmRpYW5Db250ZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMucmVuZGVySGVhZCA9IHRoaXMucmVuZGVySGVhZC5iaW5kKHRoaXMpO1xuXHRcdGNvbnNvbGUubG9nKHRoaXMucHJvcHMudG9nZ2xlQWxsKTtcblx0fVxuXHRyZW5kZXJIZWFkKGlkKXtcblxuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtaGVhZGluZ1wiIFxuXHRcdFx0XHRyb2xlPVwidGFiXCIgXG5cdFx0XHRcdG9uQ2xpY2s9e1xuXHRcdFx0XHRcdGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLnByb3BzLnRvZ2dsZUFsbCk7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLnByb3BzLnRvZ2dsZUFsbD09ZmFsc2UpO1xuXHRcdFx0XHRcdFx0aWYodGhpcy5wcm9wcy50b2dnbGVBbGw9PWZhbHNlKXtcblx0XHRcdFx0XHRcdFx0JCgnIycraWQpLmNvbGxhcHNlKCd0b2dnbGUnKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhpZCk7XG5cdFx0XHRcdFx0XHRcdCQoJyMnK3RoaXMucHJvcHMucGFyZW50SWQrJyAuYWNvcmRpYW4tY29udGVudC5pbicpLm5vdCgnIycraWQpLmNvbGxhcHNlKCdoaWRlJyk7XG5cdFx0XHRcdFx0XHRcdCQoJyMnK2lkKS5jb2xsYXBzZSgndG9nZ2xlJyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpXG5cdFx0XHRcdH1cblx0XHRcdFx0PlxuXHRcdFx0XHQ8aDQgY2xhc3NOYW1lPVwicGFuZWwtdGl0bGVcIj5cblx0XHRcdFx0XHQ8YSByb2xlPVwiYnV0dG9uXCIgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiIGRhdGEtcGFyZW50PXsnIycrdGhpcy5wcm9wcy5wYXJlbnRJZH0gYXJpYS1leHBhbmRlZD17KHRoaXMucHJvcHMuYWN0aXZlKT8gdHJ1ZTpmYWxzZX0gID5cblx0XHRcdCAgXHRcdFx0e3RoaXMucHJvcHMudGl0bGV9XG5cdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHQ8L2g0PlxuXHRcdFx0XHR7dGhpcy5wcm9wcy5leHRyYUhlYWR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHZhciBpZCA9dGhpcy5wcm9wcy5pZDtcblx0XHR2YXIgY2xhc3NOYW1lPSh0aGlzLnByb3BzLmFjdGl2ZSk/IFwiYWNvcmRpYW4tY29udGVudCBwYW5lbC1jb2xsYXBzZSBjb2xsYXBzZSBpblwiOlwiYWNvcmRpYW4tY29udGVudCBwYW5lbC1jb2xsYXBzZSBjb2xsYXBzZVwiO1xuXHRcdGlmKHRoaXMucHJvcHMuY2xhc3NOYW1lKXtcblx0XHRcdGNsYXNzTmFtZT1jbGFzc05hbWUrXCIgXCIrdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0fVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsIHBhbmVsLWRlZmF1bHQgYWNvcmRpYW4tcGFuZWxcIj5cblx0XHRcdFx0e3RoaXMucmVuZGVySGVhZChpZCl9XG5cdFx0XHRcdDxkaXYgaWQ9e2lkfSBcblx0XHRcdFx0XHRjbGFzc05hbWU9e2NsYXNzTmFtZX0gXG5cdFx0XHRcdFx0cm9sZT1cInRhYnBhbmVsXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYW5lbC1ib2R5XCI+XG5cdFx0XHRcdFx0XHR7IHRoaXMucHJvcHMuY2hpbGRyZW4gfVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuICBcdFx0KTtcblx0fVxufVxuIiwiaW1wb3J0IEZvcm0gZnJvbSAnLi4vdXRpbHMvZm9ybXMnXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdHlwZUZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5jb21wb25lbnRXaWxsVXBkYXRlPXRoaXMuY29tcG9uZW50V2lsbFVwZGF0ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZG9jdHlwZVRvb2xVcGRhdGU9dGhpcy5kb2N0eXBlVG9vbFVwZGF0ZS5iaW5kKHRoaXMpO1xuXG5cdFx0dGhpcy5zdWJtaXQ9dGhpcy5zdWJtaXQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnNhdmU9dGhpcy5zYXZlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5kZWxldGU9dGhpcy5kZWxldGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmRvY3R5cGVUb29sID0gbmV3IHBzLmFwaVRvb2woe25hbWU6dGhpcy5wcm9wcy5kb2N0eXBlfSx7ZG9jdHlwZTonRG9jVHlwZSd9LHRoaXMuZG9jdHlwZVRvb2xVcGRhdGUsdGhpcy5mb3JjZVVwZGF0ZSk7XG5cdFx0dGhpcy5zdGF0ZT17aXRlbXM6dGhpcy5kb2N0eXBlVG9vbC5pdGVtc307XG5cdFx0Ly90aGlzLmRvY3R5cGVUb29sID0gbmV3IHBzLmFwaVRvb2woe25hbWU6dGhpcy5wcm9wcy5kb2N0eXBlfSx7ZG9jdHlwZTonRG9jVHlwZSd9LHRoaXMuZG9jdHlwZVRvb2xVcGRhdGUpO1xuXHR9XG5cdGNvbXBvbmVudFdpbGxVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpe1xuXHRcdGlmKHRoaXMucHJvcHMuZG9jdHlwZSAhPSBuZXh0UHJvcHMuZG9jdHlwZSl7XG5cdFx0XHR0aGlzLmRvY3R5cGVUb29sID0gbmV3IHBzLmFwaVRvb2woe25hbWU6bmV4dFByb3BzLmRvY3R5cGV9LHtkb2N0eXBlOidEb2NUeXBlJ30sdGhpcy5kb2N0eXBlVG9vbFVwZGF0ZSx0aGlzLmZvcmNlVXBkYXRlKTtcblx0XHR9XG5cdH1cblx0ZG9jdHlwZVRvb2xVcGRhdGUoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtpdGVtczp0aGlzLmRvY3R5cGVUb29sLml0ZW1zfSlcblx0fVxuXHRzdWJtaXQoZSl7XG5cdFx0Ly9GT1JNIFZBTElEQVRJT05cblx0XHQvL2lmKHRoaXMucHJvcHMuaXRlbS52aW5leWFyZD09XCJcIiB8fHRoaXMucHJvcHMuaXRlbS5zcHJheV90eXBlPT1cIlwiIHx8IChtb21lbnQodGhpcy5wcm9wcy5pdGVtLmRhdGUsXCJNTS9ERC9ZWVlZXCIpLmlzVmFsaWQoKSkhPT10cnVlKXtcblx0XHQvL1x0Y29uc29sZS5sb2coXCJub3QgdmFsaWRcIik7XG5cdFx0Ly99ZWxzZXtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRoaXMucHJvcHMuY3JlYXRlKHRoaXMucHJvcHMuaXRlbSx0aGlzLnByb3BzLmRvY3R5cGUpO1xuXHRcdC8vfVxuXHR9XG5cdHNhdmUoZSl7XG5cdFx0Ly8gaWYodGhpcy5wcm9wcy5pdGVtLnZpbmV5YXJkPT1cIlwiIHx8dGhpcy5wcm9wcy5pdGVtLnNwcmF5X3R5cGU9PVwiXCIgfHwgKG1vbWVudCh0aGlzLnByb3BzLml0ZW0uZGF0ZSxcIk1NL0REL1lZWVlcIikuaXNWYWxpZCgpKSE9PXRydWUpe1xuXHRcdC8vIFx0Y29uc29sZS5sb2coXCJub3QgdmFsaWRcIik7XG5cdFx0Ly8gfWVsc2V7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR0aGlzLnByb3BzLmVkaXQodGhpcy5wcm9wcy5pdGVtKTtcblx0XHQvLyB9XG5cdH1cblx0ZGVsZXRlKGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR0aGlzLnByb3BzLmRlbGV0ZSh0aGlzLnByb3BzLml0ZW0pO1xuXHR9XG5cdGNyZWF0ZUZvcm1Kc29uKCl7XG5cdFx0dmFyIGNyZWF0ZUhpZGRlbj0odGhpcy5wcm9wcy5tb2RlIT1cImNyZWF0ZVwiKT9cIiBoaWRkZW5cIjpcIiBub3BlXCI7XG5cdFx0dmFyIGVkaXRIaWRkZW49KHRoaXMucHJvcHMubW9kZSE9XCJlZGl0XCIpP1wiIGhpZGRlblwiOlwiIG5vcGVcIjtcblx0XHR2YXIgZmllbGRzSnNvbj10aGlzLnN0YXRlLml0ZW1zWzBdLmZpZWxkcztcblx0XHR2YXIgZmllbGRzPVtdO1xuXHRcdHZhciBmaWVsZE9iamVjdD17XG5cdFx0XHRMaW5rOiBmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRmaWVsZDpcImF1dG9Db21wbGV0ZVwiLFxuXHRcdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRcdGNvcHlbaXRlbS5maWVsZG5hbWVdPWUudGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0XHRsYWJsZTppdGVtLmxhYmVsLFxuXHRcdFx0XHRcdHZhbHVlOmNvcHlbaXRlbS5maWVsZG5hbWVdLFxuXHRcdFx0XHRcdGRvY3R5cGU6aXRlbS5vcHRpb25zLFxuXHRcdFx0XHRcdGRvY3ZhbHVlOlwibmFtZVwiXG5cdFx0XHRcdH1cblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdENoZWNrOiBmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRmaWVsZDpcImNoZWNrXCIsXG5cdFx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdFx0Y29weVtpdGVtLmZpZWxkbmFtZV09ZS50YXJnZXQuY2hlY2tlZDtcblx0XHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdFx0bGFibGU6aXRlbS5sYWJlbCxcblx0XHRcdFx0XHR2YWx1ZTpjb3B5W2l0ZW0uZmllbGRuYW1lXSxcblx0XHRcdFx0XHRjbGFzc05hbWU6IFwiYmlnLWNoZWNrYm94XCJcblx0XHRcdFx0fVxuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0SW50OiBmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRmaWVsZDpcImlucHV0XCIsXG5cdFx0XHRcdFx0dHlwZTpcIm51bWJlclwiLFxuXHRcdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRcdGNvcHlbaXRlbS5maWVsZG5hbWVdPWUudGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0XHR2YWx1ZTpjb3B5W2l0ZW0uZmllbGRuYW1lXSxcblx0XHRcdFx0XHRsYWJsZTppdGVtLmxhYmVsXG5cdFx0XHRcdH07XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRTZWxlY3Q6IGZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0XHR2YXIgb3B0aW9ucz1pdGVtLm9wdGlvbnMuc3BsaXQoIFwiXFxuXCIgKTtcblx0XHRcdFx0Ly8gaWYoY29weVtpdGVtLmZpZWxkbmFtZV0hPVwiXCIpe1xuXHRcdFx0XHQvLyBcdGNvcHlbaXRlbS5maWVsZG5hbWVdPW9wdGlvbnNbMF07XG5cdFx0XHRcdC8vIFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0XHQvLyB9XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZmllbGQ6XCJzZWxlY3RcIixcblx0XHRcdFx0XHR0eXBlOlwibnVtYmVyXCIsXG5cdFx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdFx0Y29weVtpdGVtLmZpZWxkbmFtZV09ZS50YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRcdGxhYmxlOml0ZW0ubGFiZWwsXG5cdFx0XHRcdFx0dmFsdWU6Y29weVtpdGVtLmZpZWxkbmFtZV0sXG5cdFx0XHRcdFx0b3B0aW9uczpvcHRpb25zXG5cdFx0XHRcdH07XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHREYXRhOiBmdW5jdGlvbihpdGVtLHByb3BPcHRpb25zKXtcblx0XHRcdFx0aWYocHJvcE9wdGlvbnMudHlwZT09XCJ0ZXh0YXJlYVwiKXtcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0ZmllbGQ6XCJ0ZXh0YXJlYVwiLFxuXHRcdFx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdFx0XHRjb3B5W2l0ZW0uZmllbGRuYW1lXT1lLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHRcdFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRcdFx0dmFsdWU6Y29weVtpdGVtLmZpZWxkbmFtZV0sXG5cdFx0XHRcdFx0XHRsYWJsZTppdGVtLmxhYmVsXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNle1xuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRmaWVsZDpcImlucHV0XCIsXG5cdFx0XHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0XHRcdGNvcHlbaXRlbS5maWVsZG5hbWVdPWUudGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdFx0XHR2YWx1ZTpjb3B5W2l0ZW0uZmllbGRuYW1lXSxcblx0XHRcdFx0XHRcdGxhYmxlOml0ZW0ubGFiZWxcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHREYXRlOiBmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRmaWVsZDpcImRhdGVcIixcblx0XHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0XHRjb3B5W2l0ZW0uZmllbGRuYW1lXT1lLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdFx0bGFibGU6aXRlbS5sYWJlbFxuXHRcdFx0XHR9XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0fVxuXG5cdFx0aWYodGhpcy5wcm9wcy5pdGVtPT1udWxsKXtcblx0XHRcdHZhciBjb3B5PXt9XG5cdFx0fWVsc2V7XG5cdFx0XHR2YXIgY29weT1wcy5jbG9uZSh0aGlzLnByb3BzLml0ZW0pO1xuXHRcdH1cblxuXHRcdC8vbG9vcCB0aGUganNvbiBvYmplY3Rcblx0XHQvL3Byb2JhYmx5IGNoYW5nZSB0aGlzIHRvIHdpbGxNb3VudFxuXHRcdGNvbnNvbGUubG9nKGZpZWxkc0pzb24pO1xuXG5cdFx0Zm9yKHZhciB4ID0gMDsgeCA8IGZpZWxkc0pzb24ubGVuZ3RoOyB4Kyspe1xuXHRcdFx0dmFyIGN1cnJlbnRGaWVsZD1maWVsZHNKc29uW3hdO1xuXHRcdFx0Y29uc29sZS5sb2coY3VycmVudEZpZWxkLmZpZWxkbmFtZSk7XG5cdFx0XHQvLyBjaGVjayBpZiB0aGlzIGZpZWxkIHdhcyBlbmFibGVkXG5cblx0XHRcdGlmICh0aGlzLnByb3BzW2N1cnJlbnRGaWVsZC5maWVsZG5hbWVdKXtcblx0XHRcdFx0Ly90aGVyZSBpcyBhIHByb3BzIGZvciB0aGlzIGZpZWxkXG5cblx0XHRcdFx0aWYodGhpcy5wcm9wc1tjdXJyZW50RmllbGQuZmllbGRuYW1lXS5hY3RpdmUgPT09IDEpe1xuXHRcdFx0XHRcdC8vYW5kIHRoZSBmaWVsZCBpcyBzZXQgdG8gYWN0aXZlXG5cblx0XHRcdFx0XHRpZihmaWVsZE9iamVjdFtjdXJyZW50RmllbGQuZmllbGR0eXBlXSl7XG5cdFx0XHRcdFx0XHQvL0ZlaWxkIHR5cGUgY2FuIGJlIGhhbmRsZWQ/XG5cdFx0XHRcdFx0XHQvL2hhbmRsZSB0aGUgY3JlYXRpb24gb2YgY29weSBhbmQgdGhlIGRlZmF1bHQgdmFsdWVzXG5cblx0XHRcdFx0XHRcdGlmKHRoaXMucHJvcHMubW9kZT09XCJjcmVhdGVcIil7XG5cdFx0XHRcdFx0XHRcdGlmKGNvcHlbY3VycmVudEZpZWxkLmZpZWxkbmFtZV0pe1xuXHRcdFx0XHRcdFx0XHRcdC8vdGhlIGZpZWxkIGFscmVhZHkgZXhpc3RzXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0ZWxzZSBpZih0aGlzLnByb3BzW2N1cnJlbnRGaWVsZC5maWVsZG5hbWVdLmRlZmF1bHQpe1xuXHRcdFx0XHRcdFx0XHRcdC8vc2V0IHRvIGRlZmF1bHQgdmFsdWVcblx0XHRcdFx0XHRcdFx0XHRjb3B5W2N1cnJlbnRGaWVsZC5maWVsZG5hbWVdPXRoaXMucHJvcHNbY3VycmVudEZpZWxkLmZpZWxkbmFtZV0uZGVmYXVsdDtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRlbHNle1xuXHRcdFx0XHRcdFx0XHRcdGNvcHlbY3VycmVudEZpZWxkLmZpZWxkbmFtZV09XCJcIjtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyhjdXJyZW50RmllbGQuZmllbGRuYW1lKTtcblx0XHRcdFx0XHRcdGZpZWxkcy5wdXNoKGZpZWxkT2JqZWN0W2N1cnJlbnRGaWVsZC5maWVsZHR5cGVdKGN1cnJlbnRGaWVsZCx0aGlzLnByb3BzW2N1cnJlbnRGaWVsZC5maWVsZG5hbWVdKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKCEoXCJkb2N0eXBlXCIgaW4gY29weSkpe1xuXHRcdFx0Y29weS5kb2N0eXBlPXRoaXMucHJvcHMuZG9jdHlwZTtcblx0XHR9XG5cdFx0Ly9hZGRpbmcgYnV0dG9uIGZlaWxkc1xuXHRcdGlmKHRoaXMucHJvcHMuY2xvc2Upe1xuXHRcdFx0ZmllbGRzLnB1c2goe1xuXHRcdFx0XHRmaWVsZDpcImJ1dHRvblwiLFxuXHRcdFx0XHR0eXBlOlwic3VibWl0XCIsXG5cdFx0XHRcdHZhbHVlOlwiQ3JlYXRlIFwiICsgdGhpcy5wcm9wcy5kb2N0eXBlICsgXCIgRW50cnlcIixcblx0XHRcdFx0Y2xhc3NOYW1lOlwiYnRuLXByaW1hcnkgcHVsbC1yaWdodCBcIiArIGNyZWF0ZUhpZGRlbixcblx0XHRcdFx0b25DbGljazp0aGlzLnN1Ym1pdFxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGlmKHRoaXMucHJvcHMuY3JlYXRlKXtcblx0XHRcdGZpZWxkcy5wdXNoKHtcblx0XHRcdFx0XHRmaWVsZDpcImJ1dHRvblwiLFxuXHRcdFx0XHRcdHZhbHVlOlwiQ2xvc2VcIixcblx0XHRcdFx0XHRjbGFzc05hbWU6XCJwdWxsLXJpZ2h0IFwiKyBlZGl0SGlkZGVuLFxuXHRcdFx0XHRcdG9uQ2xpY2s6ZnVuY3Rpb24oZSl7IGUucHJldmVudERlZmF1bHQoKTt0aGlzLnByb3BzLmNsb3NlKCk7fS5iaW5kKHRoaXMpXG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0aWYodGhpcy5wcm9wcy5kZWxldGUpe1xuXHRcdFx0ZmllbGRzLnB1c2goe1xuXHRcdFx0XHRcdGZpZWxkOlwiYnV0dG9uXCIsXG5cdFx0XHRcdFx0dHlwZTpcInN1Ym1pdFwiLFxuXHRcdFx0XHRcdHZhbHVlOlwiRGVsZXRlXCIsXG5cdFx0XHRcdFx0Y2xhc3NOYW1lOlwiYnRuLWRhbmdlciBwdWxsLXJpZ2h0IFwiKyBlZGl0SGlkZGVuLFxuXHRcdFx0XHRcdG9uQ2xpY2s6dGhpcy5kZWxldGVcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRmaWVsZHMucHVzaChcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJidXR0b25cIixcblx0XHRcdFx0dHlwZTpcInN1Ym1pdFwiLFxuXHRcdFx0XHR2YWx1ZTpcIlNhdmVcIixcblx0XHRcdFx0Y2xhc3NOYW1lOlwiYnRuLXN1Y2Nlc3MgcHVsbC1yaWdodCBcIisgZWRpdEhpZGRlbixcblx0XHRcdFx0b25DbGljazp0aGlzLnNhdmVcblx0XHRcdH0pO1xuXHRcdHJldHVybiBmaWVsZHM7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0Y29uc29sZS5sb2coXCJyZW5kZXIgYXJlYVwiKTtcblx0XHR2YXIgb3V0cHV0PXt9O1xuXHRcdGlmKHRoaXMuc3RhdGUuaXRlbXMhPT1udWxsKXtcblx0XHRcdHZhciBmaWVsZHM9dGhpcy5jcmVhdGVGb3JtSnNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2coZmllbGRzKTtcblx0XHRcdHZhciBvdXRwdXQgPSAoXG5cdFx0XHRcdDxGb3JtXG5cdFx0XHRcdFx0aWQ9e3RoaXMucHJvcHMuaWR9XG5cdFx0XHRcdFx0dHlwZT1cImhvcml6b250YWxcIlxuXHRcdFx0XHRcdGZpZWxkcz17ZmllbGRzfVxuXHRcdFx0XHQvPik7XG5cdFx0fWVsc2V7XG5cdFx0XHRvdXRwdXQgPSAoPGRpdj4gTG9hZGluZy4uLiA8L2Rpdj4pO1xuXHRcdH1cblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2PntcIkhPUkVcIn1cblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbiIsIi8qIGZvcm1zICovXG4vKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cblxuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnN1Ym1pdD10aGlzLnN1Ym1pdC5iaW5kKHRoaXMpO1xuXHR9XG5cdHN1Ym1pdChlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5wcm9wcy5zdWJtaXQoZSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dmFyIGZvcm09W107XG5cdFx0dmFyIGZvcm1UeXBlcz17XG5cdFx0XHRzZWxlY3RcdDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciBvcHRpbmFsPVtcInZhbHVlXCIsXCJsYWJsZVwiLFwib3B0aW9uc1wiLFwiY2xhc3NOYW1lXCIsXCJyZWFkb25seVwiLFwiZGlzYWJsZWRcIixcInJlcXVpcmVcIl07XG5cdFx0XHRcdHZhciBwcm9wcz1wcy5pbml0UHJvcHMob3B0aW5hbCxpdGVtKTtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8U2VsZWN0XG5cdFx0XHRcdFx0XHRrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9XG5cdFx0XHRcdFx0XHR2YWx1ZT17cHJvcHMudmFsdWV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e3Byb3BzLmNsYXNzTmFtZX1cblx0XHRcdFx0XHRcdGxhYmxlPXtwcm9wcy5sYWJsZX1cblx0XHRcdFx0XHRcdG9wdGlvbnM9e3Byb3BzLm9wdGlvbnN9XG5cdFx0XHRcdFx0XHRyZWFkb25seT17cHJvcHMucmVhZG9ubHl9XG5cdFx0XHRcdFx0XHRkaXNhYmxlZD17cHJvcHMuZGlzYWJsZWR9XG5cdFx0XHRcdFx0XHRyZXF1aXJlZD17cHJvcHMucmVxdWlyZWR9XG5cdFx0XHRcdFx0XHRpbnB1dENoYW5nZWQ9e2Z1bmN0aW9uKGUpe2l0ZW0ub25DaGFuZ2UoZSk7fX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0Y2hlY2sgOiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0dmFyIHByb3BzPVtcInZhbHVlXCIsXCJsYWJsZVwiLFwiY2xhc3NOYW1lXCIsXCJyZWFkb25seVwiLFwiZGlzYWJsZWRcIixcInJlcXVpcmVcIixcInZhbHVlXCJdO1xuXHRcdFx0XHRwcm9wcz1wcy5pbml0UHJvcHMocHJvcHMsaXRlbSk7XG5cblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8Q2hlY2tcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH1cblx0XHRcdFx0XHRcdHZhbHVlPXtwcm9wcy52YWx1ZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17cHJvcHMuY2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0bGFibGU9e3Byb3BzLmxhYmxlfVxuXHRcdFx0XHRcdFx0cmVhZE9ubHk9e3Byb3BzLnJlYWRvbmx5fVxuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ9e3Byb3BzLmRpc2FibGVkfVxuXHRcdFx0XHRcdFx0cmVxdWlyZWQ9e3Byb3BzLnJlcXVpcmVkfVxuXHRcdFx0XHRcdFx0aW5wdXRDaGFuZ2VkPXtmdW5jdGlvbihlKXtpdGVtLm9uQ2hhbmdlKGUpO319XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblxuXHRcdFx0dGV4dGFyZWEgOiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0dmFyIHByb3BzPVtcInZhbHVlXCIsXCJsYWJsZVwiLFwiY2xhc3NOYW1lXCIsXCJyZWFkb25seVwiLFwiZGlzYWJsZWRcIixcInJlcXVpcmVcIixcInZhbHVlXCIsXCJyb3dzXCJdO1xuXHRcdFx0XHRwcm9wcz1wcy5pbml0UHJvcHMocHJvcHMsaXRlbSk7XG5cblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8VGV4dGFyZWFcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH1cblx0XHRcdFx0XHRcdHZhbHVlPXtwcm9wcy52YWx1ZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17cHJvcHMuY2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0bGFibGU9e3Byb3BzLmxhYmxlfVxuXHRcdFx0XHRcdFx0cmVhZE9ubHk9e3Byb3BzLnJlYWRvbmx5fVxuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ9e3Byb3BzLmRpc2FibGVkfVxuXHRcdFx0XHRcdFx0cmVxdWlyZWQ9e3Byb3BzLnJlcXVpcmVkfVxuXHRcdFx0XHRcdFx0cm93cz17cHJvcHMucm93c31cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKTt9fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRpbnB1dCBcdDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciBwcm9wcz1bXCJ0eXBlXCIsXCJ2YWx1ZVwiLFwicGxhY2Vob2xkZXJcIixcImxhYmxlXCIsXCJjbGFzc05hbWVcIixcInJlYWRvbmx5XCIsXCJkaXNhYmxlZFwiLFwicmVxdWlyZWRcIixcImVycm9yXCJdO1xuXHRcdFx0XHRwcm9wcz1wcy5pbml0UHJvcHMocHJvcHMsaXRlbSk7XG5cdFx0XHRcdGlmKHByb3BzLnR5cGU9PVwiXCIpe1xuXHRcdFx0XHRcdHByb3BzLnR5cGU9XCJ0ZXh0XCI7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxJbnB1dFxuXHRcdFx0XHRcdFx0a2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fVxuXHRcdFx0XHRcdFx0dHlwZT17cHJvcHMudHlwZX1cblx0XHRcdFx0XHRcdHZhbHVlPXtwcm9wcy52YWx1ZX1cblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPXtwcm9wcy5wbGFjZWhvbGRlcn1cblx0XHRcdFx0XHRcdGxhYmxlPXtwcm9wcy5sYWJsZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17cHJvcHMuY2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0cmVhZG9ubHk9e3Byb3BzLnJlYWRvbmx5fVxuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ9e3Byb3BzLmRpc2FibGVkfVxuXHRcdFx0XHRcdFx0cmVxdWlyZWQ9e3Byb3BzLnJlcXVpcmVkfVxuXHRcdFx0XHRcdFx0ZXJyb3I9e3Byb3BzLmVycm9yfVxuXHRcdFx0XHRcdFx0aW5wdXRDaGFuZ2VkPXtmdW5jdGlvbihlKXtpdGVtLm9uQ2hhbmdlKGUpfX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0bGFibGUgXHQ6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHRyZXR1cm4gKFxuICAgIFx0XHRcdFx0PGxhYmVsIGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH0gPntpdGVtLmxhYmxlfTwvbGFiZWw+XG5cbiAgICBcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0cmFkaW9cdDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHJldHVybiAoPGRpdj48L2Rpdj4pO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0aGVhZGVyOiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0cmV0dXJuKDxoMyBrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9ID57aXRlbS5sYWJsZX08L2gzPilcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGRhdGU6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHR2YXIgdmFsdWUgPSAoaXRlbS52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0udmFsdWU7XG5cdFx0XHRcdHZhciBsYWJsZSA9IChpdGVtLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5sYWJsZTtcblx0XHRcdFx0dmFyIHBsYWNlaG9sZGVyID0gKGl0ZW0ucGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnBsYWNlaG9sZGVyO1xuXHRcdFx0XHR2YXIgY2xhc3NOYW1lID0gKGl0ZW0uY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5jbGFzc05hbWU7XG5cdFx0XHRcdHZhciByZWFkb25seSA9IChpdGVtLnJlYWRvbmx5ID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5yZWFkb25seTtcblx0XHRcdFx0dmFyIGRpc2FibGVkID0gKGl0ZW0uZGlzYWJsZWQgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmRpc2FibGVkO1xuXHRcdFx0XHR2YXIgcmVxdWlyZWQgPSAoaXRlbS5yZXF1aXJlZCA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucmVxdWlyZWQ7XG5cdFx0XHRcdHJldHVybihcblx0XHRcdFx0XHQ8RGF0ZUlucHV0XG5cdFx0XHRcdFx0XHRrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9XG5cdFx0XHRcdFx0XHR2YWx1ZT17dmFsdWV9XG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG5cdFx0XHRcdFx0XHRsYWJsZT17bGFibGV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e2NsYXNzTmFtZX1cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKX19XG5cdFx0XHRcdFx0XHRyZWFkb25seT17cmVhZG9ubHl9XG5cdFx0XHRcdFx0XHRkaXNhYmxlZD17ZGlzYWJsZWR9XG5cdFx0XHRcdFx0XHRyZXF1aXJlZD17cmVxdWlyZWR9XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGF1dG9Db21wbGV0ZTogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IChpdGVtLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS52YWx1ZTtcblx0XHRcdFx0dmFyIGxhYmxlID0gKGl0ZW0ubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmxhYmxlO1xuXHRcdFx0XHR2YXIgcGxhY2Vob2xkZXIgPSAoaXRlbS5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucGxhY2Vob2xkZXI7XG5cdFx0XHRcdHZhciBjbGFzc05hbWUgPSAoaXRlbS5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmNsYXNzTmFtZTtcblx0XHRcdFx0dmFyIHJlYWRvbmx5ID0gKGl0ZW0ucmVhZG9ubHkgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnJlYWRvbmx5O1xuXHRcdFx0XHR2YXIgZGlzYWJsZWQgPSAoaXRlbS5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uZGlzYWJsZWQ7XG5cdFx0XHRcdHZhciByZXF1aXJlZCA9IChpdGVtLnJlcXVpcmVkID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5yZXF1aXJlZDtcblxuXHRcdFx0XHRyZXR1cm4oXG5cdFx0XHRcdFx0PEF3ZXNvbXBsZXRlSW5wdXRcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH1cblx0XHRcdFx0XHRcdGRvY3R5cGU9e2l0ZW0uZG9jdHlwZX1cblx0XHRcdFx0XHRcdGRvY3ZhbHVlPXtpdGVtLmRvY3ZhbHVlfVxuXHRcdFx0XHRcdFx0ZG9jbGFibGU9e2l0ZW0uZG9jbGFibGV9XG5cdFx0XHRcdFx0XHR2YWx1ZT17dmFsdWV9XG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG5cdFx0XHRcdFx0XHRsYWJsZT17bGFibGV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e2NsYXNzTmFtZX1cblx0XHRcdFx0XHRcdHJlYWRvbmx5PXtyZWFkb25seX1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXtkaXNhYmxlZH1cblx0XHRcdFx0XHRcdHJlcXVpcmVkPXtyZXF1aXJlZH1cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKX19XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGJ1dHRvbjogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciBvcHRpbmFsPVtcInZhbHVlXCIsXCJjbGFzc05hbWVcIixcImRpc2FibGVkXCIsXCJpY29uXCJdO1xuXHRcdFx0XHR2YXIgcHJvcHM9cHMuaW5pdFByb3BzKG9wdGluYWwsaXRlbSk7XG5cdFx0XHRcdHJldHVybihcblx0XHRcdFx0XHQ8QnV0dG9uXG5cdFx0XHRcdFx0XHRrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9XG5cdFx0XHRcdFx0XHR2YWx1ZT17cHJvcHMudmFsdWV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e3Byb3BzLmNsYXNzTmFtZX1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXtwcm9wcy5kaXNhYmxlZH1cblx0XHRcdFx0XHRcdGljb249e3Byb3BzLmljb259XG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtmdW5jdGlvbihlKXtpdGVtLm9uQ2xpY2soZSl9fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcylcblx0XHR9XG5cdFx0dGhpcy5wcm9wcy5maWVsZHMubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblx0XHRcdGlmKCQuaXNFbXB0eU9iamVjdChpdGVtKSl7XG5cblx0XHRcdH1lbHNle1xuXHRcdFx0XHRpZih0aGlzLnByb3BzLnR5cGU9PVwiaW5saW5lXCIpe1xuXHRcdFx0XHRcdHZhciByb3dDbGFzcz0xMi90aGlzLnByb3BzLnJvd3M7XG5cdFx0XHRcdFx0cm93Q2xhc3M9XCJjb2wteHMtXCIrcm93Q2xhc3M7XG5cdFx0XHRcdFx0Zm9ybS5wdXNoKDxkaXYga2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fSBjbGFzc05hbWU9e3Jvd0NsYXNzfT57Zm9ybVR5cGVzW2l0ZW0uZmllbGRdKGl0ZW0saW5kZXgpfTwvZGl2Pik7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZXtmb3JtLnB1c2goPGRpdiBrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9IGNsYXNzTmFtZT17cm93Q2xhc3N9Pntmb3JtVHlwZXNbaXRlbS5maWVsZF0oaXRlbSxpbmRleCl9PC9kaXY+KTt9XG5cdFx0XHR9XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0XHQvL2Zvcih2YXIgeD0wOyB4IDwgdGhpcy5wcm9wcy5mZWlsZHMubGVuZ3RoIHgrKzsgKVxuXHRcdHZhciBjbGFzc05hbWUgPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcInJlYWN0LWZvcm1cIjogXCJyZWFjdC1mb3JtIFwiK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHJldHVybihcblx0XHRcdDxmb3JtIGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cblx0XHRcdFx0PGZpZWxkc2V0PlxuXHRcdFx0XHR7dGhpcy5wcm9wcy5iZWZvcmV9XG5cdFx0XHRcdHtmb3JtfVxuXHRcdFx0XHR7IHRoaXMucHJvcHMuY2hpbGRyZW59XG5cdFx0XHRcdDwvZmllbGRzZXQ+XG5cdFx0XHQ8L2Zvcm0+XG5cdFx0KTtcblx0fVxufVxuXG5cblxuZXhwb3J0IGNsYXNzIFNlbGVjdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLmlucHV0Q2hhbmdlPXRoaXMuaW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXG5cdH1cblx0aW5wdXRDaGFuZ2UoZSl7XG5cdFx0dGhpcy5wcm9wcy5pbnB1dENoYW5nZWQoKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMubGFibGUgPSAodGhpcy5wcm9wcy5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMubGFibGU7XG5cdFx0dGhpcy5vcHRpb25zID0gKHRoaXMucHJvcHMub3B0aW9ucyA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMub3B0aW9ucztcblx0XHR0aGlzLmNsYXNzTmFtZT0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJmb3JtLWNvbnRyb2xcIjogXCJmb3JtLWNvbnRyb2xcIiArdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0dGhpcy5kaXNhYmxlZCA9ICh0aGlzLnByb3BzLmRpc2FibGVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PWZhbHNlfHx0aGlzLnByb3BzLmRpc2FibGVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVxdWlyZWQgPSAodGhpcy5wcm9wcy5yZXF1aXJlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1mYWxzZXx8dGhpcy5wcm9wcy5yZXF1aXJlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlYWRvbmx5ID0gKHRoaXMucHJvcHMucmVhZG9ubHkgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZWFkb25seT09ZmFsc2V8fHRoaXMucHJvcHMucmVhZG9ubHk9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dmFyIG9wdGlvbnM9W107XG5cdFx0dmFyIG91dHB1dD1cIlwiO1xuXG5cblx0XHR0aGlzLm9wdGlvbnMubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblx0XHRcdHZhciBncm91cD1bXTtcblx0XHRcdGlmKGl0ZW0uZ3JvdXAgIT09IHVuZGVmaW5lZCl7XG5cdFx0XHRcdGl0ZW0ub3B0aW9ucy5tYXAoZnVuY3Rpb24oaW5uZXJJdGVtLGluZGV4KXtcblx0XHRcdFx0XHRncm91cC5wdXNoKCA8b3B0aW9uIGtleT17aXRlbS5ncm91cCtpbmRleH0gdmFsdWU9e2lubmVySXRlbX0+IHtpbm5lckl0ZW19IDwvb3B0aW9uPilcblx0XHRcdFx0fSlcblx0XHRcdFx0b3B0aW9ucy5wdXNoKDxvcHRncm91cCBrZXk9e2l0ZW0uZ3JvdXB9IGxhYmVsPXtpdGVtLmdyb3VwfT4ge2dyb3VwfTwvb3B0Z3JvdXA+KTtcblxuXHRcdFx0fVxuXHRcdFx0ZWxzZXtcblx0XHRcdFx0b3B0aW9ucy5wdXNoKCA8b3B0aW9uIGtleT17aW5kZXh9IHZhbHVlPXtpdGVtfT4ge2l0ZW19IDwvb3B0aW9uPilcblx0XHRcdH1cblxuXG5cdFx0fS5iaW5kKHRoaXMpKTtcblxuXHRcdHZhciBzZWxlY3Q9KFxuXHRcdFx0PHNlbGVjdFxuXHRcdFx0XHRjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfVxuXHRcdFx0XHR2YWx1ZT17dGhpcy52YWx1ZX1cblx0XHRcdFx0b25DaGFuZ2U9e3RoaXMucHJvcHMuaW5wdXRDaGFuZ2VkfVxuXHRcdFx0XHRkaXNhYmxlZD17dGhpcy5kaXNhYmxlZH1cblx0ICAgICAgICAgIFx0cmVhZE9ubHk9e3RoaXMucmVhZG9ubHl9XG5cdCAgICAgICAgICBcdHJlcXVpcmVkPXt0aGlzLnJlcXVpcmVkfVxuXHRcdFx0XHQ+XG5cdFx0XHRcdHtvcHRpb25zfVxuXHRcdFx0PC9zZWxlY3Q+XG5cdFx0KTtcblxuXHRcdHZhciBsYWJsZT1cIlwiO1xuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgJiYgdGhpcy5wcm9wcy5sYWJsZSAhPT0gXCJcIil7XG5cdFx0XHRsYWJsZT0oPGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWxcIj57dGhpcy5wcm9wcy5sYWJsZX08L2xhYmVsPik7XG5cdFx0fVxuXHRcdG91dHB1dCA9ICg8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj57bGFibGV9e3NlbGVjdH08L2Rpdj4pO1xuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLmlucHV0Q2hhbmdlPXRoaXMuaW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcblxuXHR9XG5cdGlucHV0Q2hhbmdlKGUpe1xuXHRcdHRoaXMucHJvcHMuaW5wdXRDaGFuZ2VkKGUpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHRoaXMudHlwZSA9ICh0aGlzLnByb3BzLnR5cGUgPT09IHVuZGVmaW5lZCkgPyBcInRleHRcIjogdGhpcy5wcm9wcy50eXBlO1xuXHRcdHRoaXMudmFsdWUgPSAodGhpcy5wcm9wcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMudmFsdWU7XG5cdFx0dGhpcy5wbGFjZWhvbGRlciA9ICh0aGlzLnByb3BzLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5wbGFjZWhvbGRlcjtcblx0XHR0aGlzLmxhYmxlID0gKHRoaXMucHJvcHMubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLmxhYmxlO1xuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblx0XHR0aGlzLmNsYXNzTmFtZT0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJmb3JtLWNvbnRyb2xcIjogXCJmb3JtLWNvbnRyb2wgXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlcXVpcmVkID0gKHRoaXMucHJvcHMucmVxdWlyZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZXF1aXJlZD09ZmFsc2V8fHRoaXMucHJvcHMucmVxdWlyZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZWFkb25seSA9ICh0aGlzLnByb3BzLnJlYWRvbmx5ID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVhZG9ubHk9PWZhbHNlfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXG5cdFx0dmFyIGlucHV0PShcblx0XHRcdDxpbnB1dFxuXHRcdFx0XHR0eXBlPXt0aGlzLnR5cGV9XG5cdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9XG5cdFx0XHRcdHBsYWNlaG9sZGVyPXt0aGlzLnBsYWNlaG9sZGVyfVxuXHRcdFx0XHR2YWx1ZT17dGhpcy52YWx1ZX1cblx0XHRcdFx0b25DaGFuZ2U9e3RoaXMucHJvcHMuaW5wdXRDaGFuZ2VkfVxuXHRcdFx0XHRkaXNhYmxlZD17dGhpcy5kaXNhYmxlZH1cblx0ICAgICAgICAgIFx0cmVhZE9ubHk9e3RoaXMucmVhZG9ubHl9XG5cdCAgICAgICAgICBcdHJlcXVpcmVkPXt0aGlzLnJlcXVpcmVkfVxuXHRcdFx0Lz5cblx0XHQpO1xuXHRcdHZhciB3cmFwcGVyQ2xhc3M9XCJmb3JtLWdyb3VwXCI7XG5cdFx0aWYodGhpcy5wcm9wcy5lcnJvcil7XG5cdFx0XHRcdHdyYXBwZXJDbGFzcys9IFwiIFwiK1wiaGFzLWVycm9yXCI7XG5cdFx0fVxuXHRcdHZhciBsYWJsZT1cIlwiO1xuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgJiYgdGhpcy5wcm9wcy5sYWJsZSAhPT0gXCJcIil7XG5cdFx0XHRsYWJsZT0oPGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWxcIj57dGhpcy5wcm9wcy5sYWJsZX08L2xhYmVsPik7XG5cdFx0fVxuXHRcdG91dHB1dCA9ICg8ZGl2IGNsYXNzTmFtZT17d3JhcHBlckNsYXNzfT57bGFibGV9e2lucHV0fTwvZGl2Pik7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIENoZWNrIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuaW5wdXRDaGFuZ2U9dGhpcy5pbnB1dENoYW5nZS5iaW5kKHRoaXMpO1xuXG5cblx0fVxuXHRpbnB1dENoYW5nZShlKXtcblxuXHRcdHRoaXMucHJvcHMuaW5wdXRDaGFuZ2VkKGUpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHRoaXMudmFsdWUgPSAodGhpcy5wcm9wcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IDAgOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMucGxhY2Vob2xkZXIgPSAodGhpcy5wcm9wcy5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXI7XG5cdFx0dGhpcy5sYWJsZSA9ICh0aGlzLnByb3BzLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5sYWJsZTtcblx0XHR0aGlzLmNsYXNzTmFtZT0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJmb3JtLWNoZWNrLWlucHV0XCI6IFwiZm9ybS1jaGVjay1pbnB1dCBcIiArdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0dGhpcy5kaXNhYmxlZCA9ICh0aGlzLnByb3BzLmRpc2FibGVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PWZhbHNlfHx0aGlzLnByb3BzLmRpc2FibGVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVxdWlyZWQgPSAodGhpcy5wcm9wcy5yZXF1aXJlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1mYWxzZXx8dGhpcy5wcm9wcy5yZXF1aXJlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlYWRvbmx5ID0gKHRoaXMucHJvcHMucmVhZG9ubHkgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZWFkb25seT09ZmFsc2V8fHRoaXMucHJvcHMucmVhZG9ubHk9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cblx0XHR2YXIgb3V0cHV0PVwiXCI7XG5cdFx0dmFyIGlucHV0PShcblx0XHRcdDxpbnB1dFxuXHRcdFx0XHR0eXBlPVwiY2hlY2tib3hcIlxuXHRcdFx0XHRjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfVxuXHRcdFx0XHRjaGVja2VkPXt0aGlzLnZhbHVlfVxuXG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnByb3BzLmlucHV0Q2hhbmdlZH1cblx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdCAgICAgICAgICBcdHJlYWRPbmx5PXt0aGlzLnJlYWRvbmx5fVxuXHQgICAgICAgICAgXHRyZXF1aXJlZD17dGhpcy5yZXF1aXJlZH1cblx0XHRcdC8+XG5cdFx0KTtcblxuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy5sYWJsZSA9PVwiXCIpe1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0ICAgIFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbFwiPlxuXHRcdCAgICAgIFx0XHRcdHtpbnB1dH17dGhpcy5wcm9wcy5sYWJsZX1cblx0XHQgICAgICBcdFx0PC9sYWJlbD5cblx0XHQgIFx0XHQ8L2Rpdj5cblx0XHQgIFx0KTtcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdG91dHB1dCA9IChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdCAgICAgIFx0XHR7aW5wdXR9XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5leHBvcnQgY2xhc3MgVGV4dGFyZWEgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5pbnB1dENoYW5nZT10aGlzLmlucHV0Q2hhbmdlLmJpbmQodGhpcyk7XG5cblx0fVxuXHRpbnB1dENoYW5nZShlKXtcblx0XHR0aGlzLnByb3BzLmlucHV0Q2hhbmdlZChlKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyAwIDogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLnBsYWNlaG9sZGVyID0gKHRoaXMucHJvcHMucGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnBsYWNlaG9sZGVyO1xuXHRcdHRoaXMubGFibGUgPSAodGhpcy5wcm9wcy5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMubGFibGU7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jb250cm9sXCI6IFwiZm9ybS1jb250cm9sIFwiICt0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHR0aGlzLmRpc2FibGVkID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5kaXNhYmxlZD09ZmFsc2V8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZXF1aXJlZCA9ICh0aGlzLnByb3BzLnJlcXVpcmVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVxdWlyZWQ9PWZhbHNlfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVhZG9ubHkgPSAodGhpcy5wcm9wcy5yZWFkb25seSA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1mYWxzZXx8dGhpcy5wcm9wcy5yZWFkb25seT09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJvd3MgPSAodGhpcy5wcm9wcy5yb3dzID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucm93cz09XCJcIikgPyAzOiB0aGlzLnByb3BzLnJvd3M7XG5cdFx0dmFyIG91dHB1dD1cIlwiO1xuXHRcdHZhciBpbnB1dD0oXG5cdFx0XHQ8dGV4dGFyZWFcblx0XHRcdFx0Y2xhc3NOYW1lPXt0aGlzLmNsYXNzTmFtZX1cblx0XHRcdFx0dmFsdWU9e3RoaXMudmFsdWV9XG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnByb3BzLmlucHV0Q2hhbmdlZH1cblx0XHRcdFx0cm93cz17dGhpcy5yb3dzfVxuXHRcdFx0XHRkaXNhYmxlZD17dGhpcy5kaXNhYmxlZH1cblx0ICAgICAgICAgIFx0cmVhZE9ubHk9e3RoaXMucmVhZG9ubHl9XG5cdCAgICAgICAgICBcdHJlcXVpcmVkPXt0aGlzLnJlcXVpcmVkfVxuXHRcdFx0Lz5cblx0XHQpO1xuXHRcdHZhciBsYWJsZT1cIlwiO1xuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgJiYgdGhpcy5wcm9wcy5sYWJsZSAhPT0gXCJcIil7XG5cdFx0XHRsYWJsZT0oPGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWxcIj57dGhpcy5wcm9wcy5sYWJsZX08L2xhYmVsPik7XG5cdFx0fVxuXHRcdG91dHB1dCA9ICg8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj57bGFibGV9e2lucHV0fTwvZGl2Pik7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj57b3V0cHV0fTwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbmV4cG9ydCBjbGFzcyBEYXRlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5kYXRlSW5pdD10aGlzLmRhdGVJbml0LmJpbmQodGhpcyk7XG5cdH1cblx0ZGF0ZUluaXQoKXtcblx0XHQkKCcuaW5wdXQtZ3JvdXAuZGF0ZSAuZGF0ZXBpY2snKS5kYXRlcGlja2VyKHtcblx0XHQgICAgdG9kYXlCdG46IFwibGlua2VkXCIsXG5cdFx0ICAgIG9yaWVudGF0aW9uOiBcImJvdHRvbSByaWdodFwiLFxuXHRcdCAgICBhdXRvY2xvc2U6IHRydWUsXG5cdFx0ICAgIHRvZGF5SGlnaGxpZ2h0OiB0cnVlXG5cdFx0fSkub24oJ2NoYW5nZURhdGUnLCBmdW5jdGlvbihlKSB7XG5cdFx0XHR2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2lucHV0JywgeyBidWJibGVzOiB0cnVlIH0pO1xuXHRcdFx0ZS50YXJnZXQuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cdFx0fSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLnBsYWNlaG9sZGVyID0gKHRoaXMucHJvcHMucGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnBsYWNlaG9sZGVyO1xuXHRcdHRoaXMubGFibGUgPSAodGhpcy5wcm9wcy5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMubGFibGU7XG5cdFx0dGhpcy5kaXNhYmxlZCA9ICh0aGlzLnByb3BzLmRpc2FibGVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PWZhbHNlfHx0aGlzLnByb3BzLmRpc2FibGVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVxdWlyZWQgPSAodGhpcy5wcm9wcy5yZXF1aXJlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1mYWxzZXx8dGhpcy5wcm9wcy5yZXF1aXJlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlYWRvbmx5ID0gKHRoaXMucHJvcHMucmVhZG9ubHkgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZWFkb25seT09ZmFsc2V8fHRoaXMucHJvcHMucmVhZG9ubHk9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cblxuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblx0XHR0aGlzLmNsYXNzTmFtZT0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJmb3JtLWNvbnRyb2wgZGF0ZXBpY2tcIjogXCJmb3JtLWNvbnRyb2wgZGF0ZXBpY2sgXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHZhciBpbnB1dD0oXG5cdFx0XHQ8aW5wdXRcblx0XHRcdFx0cmVmPXt0aGlzLmRhdGVJbml0fVxuXHRcdFx0XHR0eXBlPVwidGV4dFwiXG5cdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9XG5cdFx0XHRcdHBsYWNlaG9sZGVyPXt0aGlzLnBsYWNlaG9sZGVyfVxuXHRcdFx0XHR2YWx1ZT17dGhpcy52YWx1ZX1cblx0XHRcdFx0b25DaGFuZ2U9e3RoaXMucHJvcHMuaW5wdXRDaGFuZ2VkfVxuXHRcdFx0XHRkaXNhYmxlZD17dGhpcy5kaXNhYmxlZH1cblx0ICAgICAgICAgIFx0cmVhZE9ubHk9e3RoaXMucmVhZG9ubHl9XG5cdCAgICAgICAgICBcdHJlcXVpcmVkPXt0aGlzLnJlcXVpcmVkfVxuXHRcdFx0XHQvPlxuXG5cdFx0KTtcblxuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy5sYWJsZSA9PVwiXCIpe1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdCAgXHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdCAgXHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWxcIj57dGhpcy5wcm9wcy5sYWJsZX08L2xhYmVsPlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cCBkYXRlXCI+XG5cdFx0XHRcdFx0XHR7aW5wdXR9XG5cdFx0XHRcdCAgXHRcdDxzcGFuIGNsYXNzTmFtZT1cImlucHV0LWdyb3VwLWFkZG9uXCI+XG5cdFx0XHRcdCAgXHRcdFx0PGkgY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi10aFwiPjwvaT5cblx0XHRcdFx0ICBcdFx0PC9zcGFuPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHQgIFx0KTtcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdG91dHB1dCA9IChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAgZGF0ZVwiPlxuXG5cdFx0XHRcdFx0XHR7aW5wdXR9XG5cdFx0XHRcdCAgXHRcdDxzcGFuIGNsYXNzTmFtZT1cImlucHV0LWdyb3VwLWFkZG9uXCI+XG5cdFx0XHRcdCAgXHRcdFx0PGkgY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi10aFwiPjwvaT5cblx0XHRcdFx0ICBcdFx0PC9zcGFuPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5leHBvcnQgY2xhc3MgQXdlc29tcGxldGVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblxuXHRcdC8qICAgRG8gdGhlIGJpbmQgdGhpbmcgICovXG5cdFx0dGhpcy5jcmVhdGVMaXN0PXRoaXMuY3JlYXRlTGlzdC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZG9jQ2hhbmdlZD10aGlzLmRvY0NoYW5nZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLmNvbXBvbmVudERpZE1vdW50PXRoaXMuY29tcG9uZW50RGlkTW91bnQuYmluZCh0aGlzKTtcblx0XHR0aGlzLmlucHV0Q2hhbmdlPXRoaXMuaW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcblx0XHR0aGlzLmF1dG9jb21wbGV0ZT10aGlzLmF1dG9jb21wbGV0ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY29tcG9uZW50V2lsbFVubW91bnQ9dGhpcy5jb21wb25lbnRXaWxsVW5tb3VudC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMucmVmQ2FsbD10aGlzLnJlZkNhbGwuYmluZCh0aGlzKTtcblxuXHRcdC8vdGhpcy53b3Jrb3JkZXJPYmo9dGhpcy5vblN0YXR1c0NoYW5nZWQuYmluZCh0aGlzKTtcblx0XHQvKiAgICAgICAgICBlbmQgICAgICAgICAgKi9cblx0XHR0aGlzLml0ZW1saXN0PVtdO1xuXHRcdHRoaXMuc3RhdGU9e2l0ZW1saXN0OltdfTtcblx0XHR0aGlzLl9pc01vdW50ZWQ9ZmFsc2U7XG5cdFx0dmFyIGFyZ3M9e307XG5cdFx0dmFyIG9wdGlvbnM9e2RvY3R5cGU6dGhpcy5wcm9wcy5kb2N0eXBlfTtcblx0XHR2YXIgZmlsdGVyPXt9O1xuXHRcdGlmICh0aGlzLnByb3BzLmZpbHRlcj09dW5kZWZpbmVkIHx8IHRoaXMucHJvcHMuZmlsdGVyPT1udWxsKXtcblxuXHRcdH1lbHNle1xuXHRcdFx0ZmlsdGVyPSB0aGlzLnByb3BzLmZpbHRlcjtcblx0XHR9XG5cdFx0dGhpcy5saXN0VG9vbCA9IG5ldyBwcy5hcGlUb29sKGZpbHRlciwgb3B0aW9ucyAsdGhpcy5kb2NDaGFuZ2VkKTtcblx0XHRpZiAodGhpcy5saXN0VG9vbC5pdGVtcz09PXVuZGVmaW5lZCB8fHRoaXMubGlzdFRvb2wuaXRlbXM9PT0gMCB8fHRoaXMubGlzdFRvb2wuaXRlbXM9PT1udWxsICl7XG5cdFx0fWVsc2V7XG5cdFx0XHR0aGlzLnN0YXRlLmxpc3Q9dGhpcy5saXN0VG9vbC5pdGVtcztcblx0XHR9XG5cblx0XHR0aGlzLmNyZWF0ZUxpc3QoKTtcblx0fVxuXHRkb2NDaGFuZ2VkKCl7XG5cdFx0dGhpcy5jcmVhdGVMaXN0KCk7XG5cdH1cblx0Y29tcG9uZW50RGlkTW91bnQoKXtcblx0XHR0aGlzLl9pc01vdW50ZWQ9dHJ1ZTtcblx0XHR0aGlzLmF1dG9jb21wbGV0ZSgpO1xuXG5cdH1cblx0Y3JlYXRlTGlzdCgpe1xuXHRcdHRoaXMuaXRlbWxpc3Q9W107XG5cdFx0Ly9sYWJsZSBhbmQgdmFsdWVcblx0XHRpZiAodGhpcy5wcm9wcy5kb2NsYWJsZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMubGlzdFRvb2wuaXRlbXMgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmxpc3RUb29sLml0ZW1zICE9PSBudWxsKXtcblx0XHRcdGZvcihsZXQgaXRlbSBvZiB0aGlzLmxpc3RUb29sLml0ZW1zKXtcblx0XHRcdFx0dmFyIHRlbXAgPVtpdGVtW3RoaXMucHJvcHMuZG9jbGFibGVdLGl0ZW1bdGhpcy5wcm9wcy5kb2N2YWx1ZV1dO1xuXHRcdFx0XHR0aGlzLml0ZW1saXN0LnB1c2godGVtcCk7XG5cdFx0XHR9XG5cdFx0XHQkKGRvY3VtZW50KS50cmlnZ2VyKCdsaXN0TG9hZCcgKyB0aGlzLnByb3BzLmRvY3R5cGUpO1xuXHRcdH1cblx0XHQvL2p1c3QgbGFibGVcblx0XHRlbHNlIGlmKHRoaXMubGlzdFRvb2wuaXRlbXMgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmxpc3RUb29sLml0ZW1zICE9PSBudWxsKXtcblx0XHRcdGZvcihsZXQgaXRlbSBvZiB0aGlzLmxpc3RUb29sLml0ZW1zKXtcblx0XHRcdFx0dGhpcy5pdGVtbGlzdC5wdXNoKGl0ZW1bdGhpcy5wcm9wcy5kb2N2YWx1ZV0pO1xuXHRcdFx0fVxuXHRcdFx0JChkb2N1bWVudCkudHJpZ2dlcignbGlzdExvYWQnICsgdGhpcy5wcm9wcy5kb2N0eXBlLnJlcGxhY2UoXCIgXCIsXCJcIikpO1xuXHRcdH1cblx0fVxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuXHRcdC8vIGNvbnNvbGUubG9nKFwiSEVMTE9cIik7XG5cdFx0Ly8gdGhpcy5hdy5kZXN0cm95KCk7XG5cdFx0Ly8gZGVsZXRlIHRoaXMuYXc7XG5cdFx0Ly8gY29uc29sZS5sb2coXCJURVNUXCIpO1xuXHR9XG5cdHJlZkNhbGwoaW5wdXQpe1xuXHRcdHRoaXMuaW5wdXQ9aW5wdXQ7XG5cdH1cblx0YXV0b2NvbXBsZXRlKGlucHV0KXtcblx0XHRpbnB1dD10aGlzLmlucHV0O1xuXHRcdHZhciBjb25maWc9IHtcblx0XHRcdFx0bWluQ2hhcnM6IDAsXG5cdFx0XHRcdG1heEl0ZW1zOiA5OSxcblx0XHRcdFx0YXV0b0ZpcnN0OiB0cnVlLFxuXHRcdFx0XHRmaWx0ZXI6IEF3ZXNvbXBsZXRlLkZJTFRFUl9TVEFSVFNXSVRIXG5cdFx0XHR9XG5cdFx0aWYodGhpcy5wcm9wcy5kb2NsYWJsZSAhPT0gdW5kZWZpbmVkICl7XG5cdFx0XHRjb25maWcuaXRlbT0gZnVuY3Rpb24oaXRlbSwgaW5wdXQpIHtcblx0XHRcdFx0dmFyIGQgPSBpdGVtO1xuXHRcdFx0XHR2YXIgaHRtbCA9IFwiPHNwYW4+XCIgKyBfXyhpdGVtLmxhYmVsKSsgXCI8L3NwYW4+PGJyPjxzcGFuPjxzbWFsbD5cIitpdGVtLnZhbHVlK1wiPC9zbWFsbD48L3NwYW4+XCI7XG5cdFx0XHRcdHJldHVybiAkKCc8bGk+PC9saT4nKVxuXHRcdFx0XHRcdC5kYXRhKCdpdGVtLmF1dG9jb21wbGV0ZScsIGl0ZW0pXG5cdFx0XHRcdFx0Lmh0bWwoJzxhPjxwPicgKyBodG1sICsgJzwvcD48L2E+Jylcblx0XHRcdFx0XHQuZ2V0KDApO1xuXHRcdFx0fVxuXG5cdFx0fWVsc2V7XG5cdFx0XHRjb25maWcuaXRlbT1mdW5jdGlvbihpdGVtLCBpbnB1dCkge1xuXHRcdFx0XHR2YXIgZCA9IGl0ZW07XG5cdFx0XHRcdHZhciBodG1sID0gXCI8c3Bhbj5cIiArIF9fKGl0ZW0pKyBcIjwvc3Bhbj5cIjtcblx0XHRcdFx0cmV0dXJuICQoJzxsaT48L2xpPicpXG5cdFx0XHRcdFx0LmRhdGEoJ2l0ZW0uYXV0b2NvbXBsZXRlJywgaXRlbSlcblx0XHRcdFx0XHQuaHRtbCgnPGE+PHA+JyArIGh0bWwgKyAnPC9wPjwvYT4nKVxuXHRcdFx0XHRcdC5nZXQoMCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuYXcgPSBuZXcgQXdlc29tcGxldGUoaW5wdXQsY29uZmlnKTtcblx0XHRpbnB1dC5hZGRFdmVudExpc3RlbmVyKFxuXHRcdFx0J2F3ZXNvbXBsZXRlLXNlbGVjdGNvbXBsZXRlJyxcblx0XHRcdFx0dGhpcy5pbnB1dENoYW5nZVxuXHRcdCk7XG5cdFx0JChpbnB1dCkuY2xpY2soIGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKHRoaXMuYXcudWwuY2hpbGROb2Rlcy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0dGhpcy5hdy5taW5DaGFycyA9IDA7XG5cdFx0XHRcdHRoaXMuYXcuZXZhbHVhdGUoKTtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKHRoaXMuYXcudWwuaGFzQXR0cmlidXRlKCdoaWRkZW4nKSkge1xuXHRcdFx0XHR0aGlzLmF3Lm9wZW4oKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHR0aGlzLmF3LmNsb3NlKCk7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLmF3Lmxpc3Q9dGhpcy5pdGVtTGlzdDtcblx0XHQkKGRvY3VtZW50KS5iaW5kKCdsaXN0TG9hZCcgKyB0aGlzLnByb3BzLmRvY3R5cGUucmVwbGFjZShcIiBcIixcIlwiKSxmdW5jdGlvbigpe1xuXHRcdFx0dGhpcy5hdy5saXN0PXRoaXMuaXRlbWxpc3Q7XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0fVxuXHRpbnB1dENoYW5nZShlKXtcblx0XHR0aGlzLnByb3BzLmlucHV0Q2hhbmdlZChlKTtcblx0fVxuXG5cdHJlbmRlcigpe1xuXHRcdHRoaXMudHlwZSA9ICh0aGlzLnByb3BzLnR5cGUgPT09IHVuZGVmaW5lZCkgPyBcInRleHRcIjogdGhpcy5wcm9wcy50eXBlO1xuXHRcdHRoaXMudmFsdWUgPSAodGhpcy5wcm9wcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMudmFsdWU7XG5cdFx0dGhpcy5wbGFjZWhvbGRlciA9ICh0aGlzLnByb3BzLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5wbGFjZWhvbGRlcjtcblx0XHR0aGlzLmxhYmxlID0gKHRoaXMucHJvcHMubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLmxhYmxlO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlcXVpcmVkID0gKHRoaXMucHJvcHMucmVxdWlyZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZXF1aXJlZD09ZmFsc2V8fHRoaXMucHJvcHMucmVxdWlyZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZWFkb25seSA9ICh0aGlzLnByb3BzLnJlYWRvbmx5ID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVhZG9ubHk9PWZhbHNlfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXG5cdFx0dmFyIG91dHB1dD1cIlwiO1xuXHRcdHRoaXMuY2xhc3NOYW1lPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcImZvcm0tY29udHJvbCBhd2Vzb21wbGV0ZVwiOiBcImZvcm0tY29udHJvbCBhd2Vzb21wbGV0ZSBcIiArdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0dmFyIGlucHV0PSggPGlucHV0XG5cdFx0XHRcdFx0dmFsdWU9e3RoaXMudmFsdWV9XG5cblx0XHRcdFx0XHR0eXBlPXt0aGlzLnR5cGV9XG5cdFx0XHRcdFx0Y2xhc3NOYW1lPXt0aGlzLmNsYXNzTmFtZX1cblx0XHRcdFx0XHRwbGFjZWhvbGRlcj17dGhpcy5wbGFjZWhvbGRlcn1cblx0XHRcdFx0XHRyZWY9e3RoaXMucmVmQ2FsbH1cblx0XHQgICAgICAgICAgXHRvbkNoYW5nZT17dGhpcy5pbnB1dENoYW5nZX1cblx0XHQgICAgICAgICAgXHRkaXNhYmxlZD17dGhpcy5kaXNhYmxlZH1cblx0XHQgICAgICAgICAgXHRyZWFkT25seT17dGhpcy5yZWFkb25seX1cblx0XHQgICAgICAgICAgXHRyZXF1aXJlZD17dGhpcy5yZXF1aXJlZH1cblx0XHQgICAgICAgICAgLz4pO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMubGFibGUgIT09IHVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLmxhYmxlID09XCJcIil7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBcIj5cblx0XHQgICAgXHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD5cblx0XHQgICAgXHRcdDxkaXYgY2xhc3NOYW1lPVwiXCI+XG5cdFx0ICAgICAgXHRcdFx0e2lucHV0fVxuXHRcdCAgICBcdFx0PC9kaXY+XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdCAgICAgIFx0XHR7aW5wdXR9XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5leHBvcnQgY2xhc3MgQnV0dG9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnR5cGUgPSAodGhpcy5wcm9wcy50eXBlID09PSB1bmRlZmluZWQpID8gXCJ0ZXh0XCI6IHRoaXMucHJvcHMudHlwZTtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR2YXIgb3V0cHV0PVwiXCI7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiYnRuXCI6IFwiYnRuIFwiICt0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHR2YXIgaWNvbj1cIlwiO1xuXHRcdGlmKHRoaXMucHJvcHMuaWNvbiE9PSB1bmRlZmluZWQgJiYgdGhpcy5wcm9wcy5pY29uIT09XCJcIil7XG5cdFx0XHR2YXIgaWNvbkNsYXNzPVwiZ2x5cGhpY29uIFwiICt0aGlzLnByb3BzLmljb247XG5cdFx0XHRpY29uPSg8c3BhbiBjbGFzc05hbWU9e2ljb25DbGFzc30gYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPik7XG5cdFx0fVxuXHRcdHZhciBpbnB1dD0oXG5cdFx0XHQ8YnV0dG9uXG5cdFx0XHRcdHR5cGU9e3RoaXMudHlwZX1cblx0XHRcdFx0Y2xhc3NOYW1lPXt0aGlzLmNsYXNzTmFtZX1cblx0XHRcdFx0dmFsdWU9e3RoaXMudmFsdWV9XG5cdFx0XHRcdG9uQ2xpY2s9e3RoaXMucHJvcHMub25DbGlja31cblx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdFx0XHQ+e2ljb259IHt0aGlzLnZhbHVlfTwvYnV0dG9uPlxuXHRcdCk7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG5cdCAgXHRcdHtpbnB1dH1cblx0ICBcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbiIsIi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZGFsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuc3VibWl0PXRoaXMuc3VibWl0LmJpbmQodGhpcyk7XG5cdH1cblx0c3VibWl0KGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR0aGlzLnByb3BzLnN1Ym1pdChlKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR2YXIgZm9vdGVyPVwiXCI7XG5cdFx0aWYodGhpcy5wcm9wcy5zdWJtaXQhPT0gZmFsc2Upe1xuXHRcdFx0Zm9vdGVyPShcdFx0XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZm9vdGVyXCI+XG5cdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNsb3NlPC9idXR0b24+XG5cdFx0XHRcdFx0PGJ1dHRvbiBcblx0XHRcdFx0XHRcdHR5cGU9XCJzdWJtaXRcIiBcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMuc3VibWl0fSBcblx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiID5cblx0XHRcdFx0XHRcdFx0e3RoaXMucHJvcHMuc3VibWl0VGV4dH1cblx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQpXG5cdFx0fVxuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwgZmFkZSB0ZXh0LWxlZnQgcGFuZWwtZGVmYXVsdFwiIGlkPXt0aGlzLnByb3BzLmlkfSB0YWJJbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiIGFyaWEtbGFiZWxsZWRieT1cImV4YW1wbGVNb2RhbExhYmVsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nXCIgcm9sZT1cImRvY3VtZW50XCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWhlYWRlclwiPlxuXHRcdFx0XHRcdFx0XHQ8aDQgY2xhc3NOYW1lPVwibW9kYWwtdGl0bGVcIiBpZD1cImV4YW1wbGVNb2RhbExhYmVsXCI+e3RoaXMucHJvcHMudGl0bGV9PC9oND5cblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgZGlzcGxheT1cIm5vbmVcIiBjbGFzc05hbWU9XCJjbG9zZSBoaWRlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj5cblx0XHRcdFx0XHRcdFx0PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHlcIj5cblx0XHRcdFx0XHRcdFx0XHR7IHRoaXMucHJvcHMuY2hpbGRyZW4gfVxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0e2Zvb3Rlcn1cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cblxuIiwiaW1wb3J0IEZvcm0gZnJvbSAnLi4vdXRpbHMvZm9ybXMnXG5cblxuZXhwb3J0IGNsYXNzIFNwcmF5Rm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLmNvbXBvbmVudFdpbGxVcGRhdGU9dGhpcy5jb21wb25lbnRXaWxsVXBkYXRlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5zdWJtaXQ9dGhpcy5zdWJtaXQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnNhdmU9dGhpcy5zYXZlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5kZWxldGU9dGhpcy5kZWxldGUuYmluZCh0aGlzKTtcblx0fVxuXHRjb21wb25lbnRXaWxsVXBkYXRlKCl7XG5cdH1cblx0c3VibWl0KGUpe1xuXHRcdC8vaWYodGhpcy5wcm9wcy5pdGVtLnZpbmV5YXJkPT1cIlwiIHx8dGhpcy5wcm9wcy5pdGVtLnNwcmF5X3R5cGU9PVwiXCIgfHwgKG1vbWVudCh0aGlzLnByb3BzLml0ZW0uZGF0ZSxcIk1NL0REL1lZWVlcIikuaXNWYWxpZCgpKSE9PXRydWUpe1xuXHRcdC8vXHRjb25zb2xlLmxvZyhcIm5vdCB2YWxpZFwiKTtcblx0XHQvL31lbHNle1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dGhpcy5wcm9wcy5jcmVhdGUodGhpcy5wcm9wcy5pdGVtKTtcblx0XHQvL31cblx0fVxuXHRzYXZlKGUpe1xuXHRcdC8vIGlmKHRoaXMucHJvcHMuaXRlbS52aW5leWFyZD09XCJcIiB8fHRoaXMucHJvcHMuaXRlbS5zcHJheV90eXBlPT1cIlwiIHx8IChtb21lbnQodGhpcy5wcm9wcy5pdGVtLmRhdGUsXCJNTS9ERC9ZWVlZXCIpLmlzVmFsaWQoKSkhPT10cnVlKXtcblx0XHQvLyBcdGNvbnNvbGUubG9nKFwibm90IHZhbGlkXCIpO1xuXHRcdC8vIH1lbHNle1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dGhpcy5wcm9wcy5lZGl0KHRoaXMucHJvcHMuaXRlbSk7XG5cdFx0Ly8gfVxuXHR9XG5cdGRlbGV0ZShlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5wcm9wcy5kZWxldGUodGhpcy5wcm9wcy5pdGVtKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR2YXIgY3JlYXRlSGlkZGVuPSh0aGlzLnByb3BzLm1vZGUhPVwiY3JlYXRlXCIpP1wiIGhpZGRlblwiOlwiIG5vcGVcIjtcblx0XHR2YXIgZWRpdEhpZGRlbj0odGhpcy5wcm9wcy5tb2RlIT1cImVkaXRcIik/XCIgaGlkZGVuXCI6XCIgbm9wZVwiO1xuXG5cdFx0aWYodGhpcy5wcm9wcy5pdGVtPT1udWxsKXtcblx0XHRcdHZhciBjb3B5PXtcblx0XHRcdFx0dmluZXlhcmQ6XCJcIixcblx0XHRcdFx0c2Vhc29uOlwiXCIsXG5cdFx0XHRcdGRhdGU6bW9tZW50KCkuZm9ybWF0KFwiTU0vREQvWVlZWVwiKSxcblx0XHRcdFx0c3ByYXlUeXBlOlwiXCIsXG5cdFx0XHRcdHF1YW50aXR5OjBcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdHZhciBjb3B5PXBzLmNsb25lKHRoaXMucHJvcHMuaXRlbSk7XG5cdFx0fVxuXG5cdFx0Y29uc29sZS5sb2codGhpcy5wcm9wcy5pdGVtKTtcblx0XHRjb25zb2xlLmxvZyhjb3B5KTtcblx0XHR2YXIgZm9ybUVsZW1lbnRzPXtcblx0XHRcdGRhdGU6W3t9LFxuXHRcdFx0e1xuXHRcdFx0XHRcdGZpZWxkOlwiZGF0ZVwiLFxuXHRcdFx0XHRcdHJlcXVpcmVkOnRydWUsXG5cdFx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdFx0Y29weS5kYXRlPWUudGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0XHR2YWx1ZTpjb3B5LmRhdGUsXG5cdFx0XHRcdFx0bGFibGU6XCJEYXRlXCJcblx0XHRcdH1dLFxuXHRcdFx0dmluZXlhcmQ6W3t9LHtcblx0XHRcdFx0ZmllbGQ6XCJhdXRvQ29tcGxldGVcIixcblx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdGNvcHkudmluZXlhcmQ9ZS50YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdHZhbHVlOmNvcHkudmluZXlhcmQsXG5cdFx0XHRcdHJlcXVpcmVkOnRydWUsXG5cdFx0XHRcdGxhYmxlOlwiVmluZXlhcmRcIixcblx0XHRcdFx0ZG9jdHlwZTpcIlZpbmV5YXJkXCIsXG5cdFx0XHRcdGRvY3ZhbHVlOlwibmFtZVwiXG5cdFx0XHR9XSxcblx0XHRcdGZpZWxkOlt7fSx7XG5cdFx0XHRcdGZpZWxkOlwiYXV0b0NvbXBsZXRlXCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRjb3B5LmZpZWxkPWUudGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHR2YWx1ZTpjb3B5LmZpZWxkLFxuXHRcdFx0XHRyZXF1aXJlZDp0cnVlLFxuXHRcdFx0XHRsYWJsZTpcIlZpbmV5YXJkXCIsXG5cdFx0XHRcdGRvY3R5cGU6XCJWaW5leWFyZCBGaWVsZFwiLFxuXHRcdFx0XHRmaWx0ZXI6e3ZpbmV5YXJkOmNvcHkudmluZXlhcmR9LFxuXHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIlxuXHRcdFx0fV0sXG5cdFx0XHR3b3Jrb3JkZXI6W3t9LHtcblx0XHRcdFx0ZmllbGQ6XCJhdXRvQ29tcGxldGVcIixcblx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdGNvcHkud29ya19vcmRlcj1lLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0dmFsdWU6Y29weS53b3JrX29yZGVyLFxuXHRcdFx0XHRyZXF1aXJlZDp0cnVlLFxuXHRcdFx0XHRsYWJsZTpcIlZpbmV5YXJkXCIsXG5cdFx0XHRcdGRvY3R5cGU6XCJ3b3JrX29yZGVyXCIsXG5cdFx0XHRcdGRvY3ZhbHVlOlwibmFtZVwiXG5cdFx0XHR9XVxuXHRcdH1cblxuXHRcdHZhciBmaWVsZHM9W1xuXHRcdFx0Zm9ybUVsZW1lbnRzLnZpbmV5YXJkW3RoaXMucHJvcHMudmluZXlhcmRdLFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImF1dG9Db21wbGV0ZVwiLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0Y29weS5zZWFzb249ZS50YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdHZhbHVlOmNvcHkuc2Vhc29uLFxuXHRcdFx0XHRyZXF1aXJlZDp0cnVlLFxuXHRcdFx0XHRsYWJsZTpcIlNlYXNvblwiLFxuXHRcdFx0XHRkb2N0eXBlOlwiU2Vhc29uXCIsXG5cdFx0XHRcdGRvY3ZhbHVlOlwibmFtZVwiXG5cdFx0XHR9LFxuXHRcdFx0Zm9ybUVsZW1lbnRzLmRhdGVbdGhpcy5wcm9wcy52aW5leWFyZF0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiYXV0b0NvbXBsZXRlXCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRjb3B5LnNwcmF5X3R5cGU9ZS50YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdHZhbHVlOmNvcHkuc3ByYXlfdHlwZSxcblx0XHRcdFx0cmVxdWlyZWQ6dHJ1ZSxcblx0XHRcdFx0bGFibGU6XCJTcHJheSBUeXBlXCIsXG5cdFx0XHRcdGRvY3R5cGU6XCJTcHJheSBUeXBlXCIsXG5cdFx0XHRcdGRvY3ZhbHVlOlwibmFtZVwiXG5cdFx0XHR9LFxuXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiaW5wdXRcIixcblx0XHRcdFx0Y2xhc3NOYW1lOlwidmluZXlhcmQtaW5wdXRcIixcblx0XHRcdFx0dHlwZTpcIm51bWJlclwiLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0Y29weS5xdWFudGl0eT1lLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0dmFsdWU6Y29weS5xdWFudGl0eSxcblx0XHRcdFx0bGFibGU6XCJxdWFudGl0eVwiXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImJ1dHRvblwiLFxuXHRcdFx0XHR0eXBlOlwic3VibWl0XCIsXG5cdFx0XHRcdHZhbHVlOlwiQ3JlYXRlIFNwcmF5aW5nIEVudHJ5XCIsXG5cdFx0XHRcdGNsYXNzTmFtZTpcImJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIiArIGNyZWF0ZUhpZGRlbixcblx0XHRcdFx0b25DbGljazp0aGlzLnN1Ym1pdFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJidXR0b25cIixcblx0XHRcdFx0dHlwZTpcInN1Ym1pdFwiLFxuXHRcdFx0XHR2YWx1ZTpcIlNhdmVcIixcblx0XHRcdFx0Y2xhc3NOYW1lOlwiYnRuLXN1Y2Nlc3MgcHVsbC1yaWdodFwiKyBlZGl0SGlkZGVuLFxuXHRcdFx0XHRvbkNsaWNrOnRoaXMuc2F2ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJidXR0b25cIixcblx0XHRcdFx0dHlwZTpcInN1Ym1pdFwiLFxuXHRcdFx0XHR2YWx1ZTpcIkRlbGV0ZVwiLFxuXHRcdFx0XHRjbGFzc05hbWU6XCJidG4tZGFuZ2VyIHB1bGwtcmlnaHRcIisgZWRpdEhpZGRlbixcblx0XHRcdFx0b25DbGljazp0aGlzLmRlbGV0ZVxuXHRcdFx0fVxuXHRcdF1cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PEZvcm1cblx0XHRcdFx0XHRpZD17dGhpcy5wcm9wcy5pZH1cblx0XHRcdFx0XHR0eXBlPVwiaG9yaXpvbnRhbFwiXG5cdFx0XHRcdFx0ZmllbGRzPXtmaWVsZHN9XG5cblx0XHRcdFx0Lz5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbiIsIlxuaW1wb3J0IEFjb3JkaWFuIGZyb20gJy4uLy4uL3B1YmxpYy9qcy9tb2R1bGVzL3V0aWxzL2Fjb3JkaWFuJ1xuaW1wb3J0IEFjb3JkaWFuQ29udGVudCBmcm9tICcuLi8uLi9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9hY29yZGlhbkNvbnRlbnQnXG5pbXBvcnQgRGF5c1dvcmtvcmRlcnMgZnJvbSAnLi4vLi4vcHVibGljL2pzL21vZHVsZXMvZGF5c193b3Jrb3JkZXJzL2RheXNXb3Jrb3JkZXJzJ1xuaW1wb3J0IEZvcm0gZnJvbSAnLi4vLi4vcHVibGljL2pzL21vZHVsZXMvdXRpbHMvZm9ybXMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyZXdEYXNoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXG5cdFx0dGhpcy5jcmV3Q2hhbmdlZD10aGlzLmNyZXdDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jcmV3c0Fjb3JkaW9uPXRoaXMuY3Jld3NBY29yZGlvbi5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZGF0ZUNoYW5nZWQ9dGhpcy5kYXRlQ2hhbmdlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMud29ya09yZGVyU3RhdHVzPXRoaXMud29ya09yZGVyU3RhdHVzLmJpbmQodGhpcyk7XG5cblxuXHRcdHRoaXMuY3VycmVudFVzZXI9cHMuaW5pdEN1cnJlbnRVc2VyKCk7XG5cdFx0dGhpcy5jdXJyZW50VXNlci5nZXQoe30sZnVuY3Rpb24oaXRlbXMpe1xuXHRcdFx0aWYodGhpcy5jdXJyZW50VXNlci5pdGVtcy51c2VybmFtZT09XCJHdWVzdFwiKXtcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uID0gXCIvbG9naW5cIjtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHQkKGRvY3VtZW50KS50cmlnZ2VyKFwidXNlckxvYWRlZFwiKTtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZyhcImFmdGVyIExvYWRcIix0aGlzLmN1cnJlbnRVc2VyLml0ZW1zKTtcblx0XHRcdH1cblx0XHR9LmJpbmQodGhpcykpOyBcblx0XHQvL3RoaXMuc3RhdGU9e307XG5cdFx0dGhpcy5zdGF0ZT17XG5cdFx0XHRjcmV3OltdLFxuXHRcdFx0c3RhdHVzOltdLFxuXHRcdFx0dGl0bGU6JycsXG5cdFx0XHR1c2VyaW5mbzp0aGlzLmN1cnJlbnRVc2VyLml0ZW1zLFxuXHRcdFx0c2VsZWN0ZWREYXRlOm1vbWVudCgpLmZvcm1hdChcIk1NL0REL1lZWVlcIilcblx0XHR9O1xuXHRcdGNvbnNvbGUubG9nKHRoaXMuY3VycmVudFVzZXIuaXRlbXMudG9kYXkpO1xuXHRcdHRoaXMuY3Jld1Rvb2wgPSBuZXcgcHMuYXBpVG9vbCh7fSx7ZG9jdHlwZTonQ3Jldyd9LHRoaXMuY3Jld0NoYW5nZWQpO1xuXHRcdHRoaXMuYWNvcmRpYW5JZD1cImNyZXctZGFzaC1hY29yZGlhblwiO1xuXHR9XG5cbiAgXHRjcmV3Q2hhbmdlZCgpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe2NyZXc6dGhpcy5jcmV3VG9vbC5pdGVtc30pO1xuXHR9XG5cdGRhdGVDaGFuZ2VkKGUpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkRGF0ZTplLnRhcmdldC52YWx1ZX0pO1xuXHR9XG5cdHdvcmtPcmRlclN0YXR1cyhpbmRleCl7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKGl0ZW1zKXtcblx0XHRcdHZhciBzdGF0dXM9XCJOb25lXCI7XG5cdFx0XHRmb3IgKGxldCBpdGVtIG9mIGl0ZW1zKXtcblx0XHRcdFx0aWYoaXRlbS5zdGF0dXM9PVwiU3RhcnRlZFwiKXtcblx0XHRcdFx0XHRzdGF0dXM9XCJXb3JraW5nXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoaXRlbS5zdGF0dXM9PVwiQ29tcGxldGVcIiAmJiBzdGF0dXMhPVwiV29ya2luZ1wiKXtcblx0XHRcdFx0XHRzdGF0dXM9XCJDb21wbGV0ZWRcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZihpdGVtLnN0YXR1cz09XCJQZW5kaW5nXCIgJiYgc3RhdHVzPT1cIkNvbXBsZXRlZFwiKXtcblx0XHRcdFx0XHRzdGF0dXM9XCJEcml2aW5nXCI7XG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXHRcdFx0dGhpcy5zdGF0ZS5zdGF0dXNbaW5kZXhdPXN0YXR1cztcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3N0YXR1czp0aGlzLnN0YXRlLnN0YXR1c30pO1xuXHRcdH0uYmluZCh0aGlzKTtcblx0fVxuXG5cdGNyZXdzQWNvcmRpb24oKXtcblx0XHRcdC8vaWYgYWxsIHBlbmRpbmcgJiYgY2xvY2tlZCBpbiBkcml2aW5nXG5cdFx0XHQvL2lmIG5vdCBjbG9ja2VkIGluOiBub3Qgc3RyYXRlZFxuXHRcdFx0Ly9jbG9ja2VkIG91dDogY2xvY2tlZCBvdXRcblxuXG5cdFx0dmFyIGNvbnZlcnRlZERhdGUgPSBtb21lbnQodGhpcy5zdGF0ZS5zZWxlY3RlZERhdGUsICdNTS9ERC9ZWVlZJykuZm9ybWF0KCdZWVlZLU1NLUREJyk7XG5cdFx0dmFyIG91dHB1dD1bXTtcblx0XHR0aGlzLnN0YXRlLmNyZXcubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblx0XHRcdGlmKHRoaXMuc3RhdGUuc3RhdHVzW2luZGV4XT09PXVuZGVmaW5lZCl7XG5cdFx0XHRcdHRoaXMuc3RhdGUuc3RhdHVzW2luZGV4XT1cIk5vIFdvcmsgT3JkZXJzXCI7XG5cdFx0XHR9XG5cdFx0XHRvdXRwdXQucHVzaCgoXG5cdFx0XHRcdDxBY29yZGlhbkNvbnRlbnRcblx0XHRcdFx0XHRrZXk9e3RoaXMuYWNvcmRpYW5JZCtpbmRleH1cblx0XHRcdFx0XHRpZD17dGhpcy5hY29yZGlhbklkK2luZGV4fVxuXHRcdFx0XHRcdHRpdGxlPXtpdGVtLmNyZXdfbmFtZX1cblx0XHRcdFx0XHRhY3RpdmU9eyhpbmRleD09PTApP3RydWU6ZmFsc2V9XG5cdFx0XHRcdFx0cGFyZW50SWQ9e3RoaXMuYWNvcmRpYW5JZH1cblx0XHRcdFx0PlxuXHRcdFx0XHRcdHt0aGlzLnN0YXRlLnN0YXR1c1tpbmRleF19XG5cdFx0XHRcdFx0PERheXNXb3Jrb3JkZXJzIFxuXHRcdFx0XHRcdFx0ZGF0ZT17Y29udmVydGVkRGF0ZX1cblx0XHRcdFx0XHRcdGNyZXc9e2l0ZW0ubmFtZX1cblx0XHRcdFx0XHRcdHN0YXR1c1VwZGF0ZT17dGhpcy53b3JrT3JkZXJTdGF0dXMoaW5kZXgpfVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdDwvQWNvcmRpYW5Db250ZW50PikpO1x0XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gKDxkaXY+XG5cdFx0XHQ8Rm9ybVxuXHRcdFx0XHRjbGFzc05hbWU9XCJjZW50ZXItYmxvY2sgc2hvcnRcIlxuXHRcdFx0XHR0eXBlPVwiaG9yaXpvbnRhbFwiXG5cdFx0XHRcdGZpZWxkcz17W3tcblx0XHRcdFx0XHRmaWVsZDpcImRhdGVcIixcblx0XHRcdFx0XHR2YWx1ZTp0aGlzLnN0YXRlLnNlbGVjdGVkRGF0ZSxcblx0XHRcdFx0XHRvbkNoYW5nZTogdGhpcy5kYXRlQ2hhbmdlZCxcblx0XHRcdFx0XHRjbGFzc05hbWU6XCJpbnB1dC1sZ1wiLFxuXHRcdFx0XHRcdGtleTpcIm90aGVyM1wiXG5cdFx0XHRcdH1dfVxuXHRcdFx0Lz5cblx0XHRcdDxBY29yZGlhbiBpZD17dGhpcy5hY29yZGlhbklkfT5cblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvQWNvcmRpYW4+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHJldHVybig8ZGl2Pnt0aGlzLmNyZXdzQWNvcmRpb24oKX08L2Rpdj4pO1xuXHR9XG59XG5cblxuY29uc3QgYXBwPSAkKCcjYXBwJylbMF07XG4oZnVuY3Rpb24oKXtcblx0ZnJhcHBlLnJlYWR5KGZ1bmN0aW9uKCl7XG5cdFx0UmVhY3RET00ucmVuZGVyKCBcblx0XHQ8Q3Jld0Rhc2ggLz4sYXBwICk7XG5cdH0pXG5cbn0pKCk7XG4iXX0=
