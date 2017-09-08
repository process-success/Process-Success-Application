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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c193b3Jrb3JkZXJzL2NyZWF0ZUlzc3VlLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy9kYXlzX3dvcmtvcmRlcnMvZGF5c1dvcmtvcmRlcnMuanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL2RheXNfd29ya29yZGVycy90YXNrQ2hlY2suanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL2RheXNfd29ya29yZGVycy93b3Jrb3JkZXJUYXNrLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9hY29yZGlhbi5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdXRpbHMvYWNvcmRpYW5Db250ZW50LmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9kb2N0eXBlRm9ybS5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdXRpbHMvZm9ybXMuanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL3V0aWxzL21vZGFsLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy92aW5leWFyZC9zcHJheUZvcm0uanN4IiwicHJvY2Vzc19zdWNjZXNzL3d3dy9kYXNoYm9hcmQvZGFzaC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOztJQUdxQixXOzs7QUFDcEIsc0JBQVksS0FBWixFQUFrQjtBQUFBOztBQUFBLHdIQUNYLEtBRFc7O0FBRWpCLFFBQUssYUFBTCxHQUFtQixNQUFLLGFBQUwsQ0FBbUIsSUFBbkIsT0FBbkI7QUFDQSxRQUFLLGNBQUwsR0FBb0IsTUFBSyxj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QUFpQkE7OzsyQkFDTztBQUNQLFVBQU87QUFBQTtBQUFBO0FBQU0sU0FBSyxhQUFMO0FBQU4sSUFBUDtBQUNBOzs7O0VBMUdvQyxNQUFNLFM7O2tCQUF2QixROzs7QUE4R3JCLElBQU0sTUFBSyxFQUFFLE1BQUYsRUFBVSxDQUFWLENBQVg7QUFDQSxDQUFDLFlBQVU7QUFDVixRQUFPLEtBQVAsQ0FBYSxZQUFVO0FBQ3RCLFdBQVMsTUFBVCxDQUNBLG9CQUFDLFFBQUQsT0FEQSxFQUNhLEdBRGI7QUFFQSxFQUhEO0FBS0EsQ0FORCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDcmVhdGVJc3N1ZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKVxuXHRcdHRoaXMubW9kYWxOZXdJc3N1ZT10aGlzLm1vZGFsTmV3SXNzdWUuYmluZCh0aGlzKTtcblx0XHR0aGlzLm1vZGFsRWRpdElzc3VlPXRoaXMubW9kYWxFZGl0SXNzdWUuYmluZCh0aGlzKTtcblx0fVxuXHR0b29sVGlwKCl7XG5cdFx0JChmdW5jdGlvbiAoKSB7XG5cdFx0IFx0JCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoKTtcblx0XHR9KVxuXHR9XG5cdG1vZGFsTmV3SXNzdWUoZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMucHJvcHMuYWN0aXZhdGVNb2RhbE5ldygpO1xuXHR9XG5cdG1vZGFsRWRpdElzc3VlKGl0ZW0sZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGNvbnNvbGUubG9nKGl0ZW0pXG5cdFx0dGhpcy5wcm9wcy5hY3RpdmF0ZU1vZGFsRWRpdChpdGVtKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR2YXIgZHJvcGRvd25JdGVtcz1bXTtcblx0XHRpZih0aGlzLnByb3BzLmlzc3VlcyE9PW51bGwpe1xuXHRcdFx0dGhpcy5wcm9wcy5pc3N1ZXMubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblx0XHRcdFx0aWYgKGl0ZW0uc3RhdHVzID09J09wZW4nKXtcblx0XHRcdFx0XHRkcm9wZG93bkl0ZW1zLnB1c2goXG5cdFx0XHRcdFx0XHQ8bGkga2V5PXtpbmRleH0+IFxuXHRcdFx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9XCJkcm9wZG93bi1pdGVtXCIgXG5cdFx0XHRcdFx0XHRcdFx0aHJlZj1cIiNcIiBcblx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLm1vZGFsRWRpdElzc3VlLmJpbmQodGhpcyxpdGVtKX0gXG5cdFx0XHRcdFx0XHRcdD57aXRlbS5pc3N1ZV90aXRsZX08L2E+XG5cdFx0XHRcdFx0XHQ8L2xpPik7XG5cdFx0XHRcdH1cblx0XHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0fVxuXHRcdHZhciBpc3N1ZUNvdW50PVwiIFwiO1xuXHRcdGlmKHRoaXMucHJvcHMuaXNzdWVzIT09bnVsbCAmJiB0aGlzLnByb3BzLmlzc3Vlcy5sZW5ndGghPT1udWxsKXtcblx0XHRcdHZhciBjb3VudCA9IDA7XG5cdFx0XHRmb3IodmFyIHg9MDsgeCA8IHRoaXMucHJvcHMuaXNzdWVzLmxlbmd0aDt4Kyspe1xuXHRcdFx0XHRpZih0aGlzLnByb3BzLmlzc3Vlc1t4XS5zdGF0dXM9PVwiT3BlblwiKXtcblx0XHRcdFx0XHRjb3VudCsrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpc3N1ZUNvdW50PShjb3VudD09PTApP1wiXCI6Y291bnQrXCIgXCI7XG5cdFx0fVxuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZHJvcGRvd24gZHJvcGRvd24tcGFuZWwtcmlnaHRcIj5cblxuXHRcdFx0XHQ8YnV0dG9uXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi14cyBkcm9wZG93bi10b2dnbGUgZnVsbC1oZWFkZXItYnV0dG9uIGNvcm5lclwiIFxuXHRcdFx0XHRcdHR5cGU9XCJidXR0b25cIiBcblx0XHRcdFx0XHRkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgXG5cdFx0XHRcdFx0YXJpYS1oYXNwb3B1cD1cInRydWVcIiBcblx0XHRcdFx0XHRhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIiA+XG5cblx0XHRcdFx0IFx0e2lzc3VlQ291bnR9PHNwYW4gY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1leGNsYW1hdGlvbi1zaWduXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxuXHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0PHVsIGNsYXNzTmFtZT1cImRyb3Bkb3duLW1lbnVcIj5cblx0XHRcdFx0ICAgIDxsaSBjbGFzc05hbWU9XCJkcm9wZG93bi1oZWFkZXJcIj5Jc3N1ZXM8L2xpPlxuXHRcdFx0XHQgICAge2Ryb3Bkb3duSXRlbXN9XG5cdFx0XHRcdCAgICA8bGkgcm9sZT1cInNlcGFyYXRvclwiIGNsYXNzTmFtZT1cImRpdmlkZXJcIj48L2xpPlxuXHRcdFx0XHQgICAgPGxpPjxhIFxuXHRcdFx0XHQgICAgXHRjbGFzc05hbWU9XCJkcm9wZG93bi1pdGVtXCJcblx0XHRcdFx0ICAgIFx0b25DbGljaz17dGhpcy5tb2RhbE5ld0lzc3VlfVxuXHRcdFx0XHQgICAgXHRocmVmPVwiI1wiID4gKyBOZXcgSXNzdWU8L2E+PC9saT5cblx0XHRcdFx0PC91bD5cblxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5cbiIsIi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuaW1wb3J0IFdvcmtvcmRlclRhc2sgZnJvbSAnLi93b3Jrb3JkZXJUYXNrJztcblxuaW1wb3J0IEZvcm0gZnJvbSAnLi4vdXRpbHMvZm9ybXMnXG5pbXBvcnQgTW9kYWwgZnJvbSAnLi4vdXRpbHMvbW9kYWwnXG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXlzV29ya29yZGVycyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR2YXIgYXJncz17fTtcblx0XHRhcmdzLmNyZXc9dGhpcy5wcm9wcy5jcmV3O1xuXHRcdGFyZ3MuZGF0ZT10aGlzLnByb3BzLmRhdGU7XG5cdFx0LyogICBEbyB0aGUgYmluZCB0aGluZyAgKi9cblx0XHR0aGlzLm9uVGFza0NoZWNrZWQ9dGhpcy5vblRhc2tDaGVja2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5vblN0YXR1c0NoYW5nZWQ9dGhpcy5vblN0YXR1c0NoYW5nZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLndvcmtPcmRlckNoYW5nZWQ9dGhpcy53b3JrT3JkZXJDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5zb2NrZXRVcGRhdGU9dGhpcy5zb2NrZXRVcGRhdGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM9dGhpcy5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jcmVhdGVXb3Jrb3JkZXI9dGhpcy5jcmVhdGVXb3Jrb3JkZXIuYmluZCh0aGlzKTtcblx0XHQvL3RoaXMud29ya29yZGVyT2JqPXRoaXMub25TdGF0dXNDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0LyogICAgICAgICAgZW5kICAgICAgICAgICovXG5cblx0XHR0aGlzLnN0YXRlPXt3b3Jrb3JkZXJzOltdfTtcblxuXHRcdHZhciBhcmdzPXt9O1xuXHRcdGFyZ3MuY3Jldz10aGlzLnByb3BzLmNyZXc7XG5cdFx0YXJncy5kYXRlPXRoaXMucHJvcHMuZGF0ZTtcblx0XHR0aGlzLndvcmtvcmRlclRvb2wgPSBuZXcgcHMuYXBpVG9vbChhcmdzLHBzLmFwaVNldHVwLndvcmtPcmRlcnMsdGhpcy53b3JrT3JkZXJDaGFuZ2VkKTtcblx0XHRpZiAodGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zPT09dW5kZWZpbmVkIHx8dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zPT09IDAgfHx0aGlzLndvcmtvcmRlclRvb2wuaXRlbXM9PT1udWxsICl7XG5cdFx0fWVsc2V7XG5cdFx0XHR0aGlzLnN0YXRlLndvcmtvcmRlcnM9dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zO1xuXHRcdH1cblxuXHR9XG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtcblxuXHRcdGlmKG5leHRQcm9wcy5jcmV3IT10aGlzLnByb3BzLmNyZXcgfHwgbmV4dFByb3BzLmRhdGUhPXRoaXMucHJvcHMuZGF0ZSApe1xuXG5cdFx0XHR2YXIgYXJncz17fTtcblx0XHRcdGFyZ3MuY3Jldz1uZXh0UHJvcHMuY3Jldztcblx0XHRcdGFyZ3MuZGF0ZT1uZXh0UHJvcHMuZGF0ZTtcblx0XHRcdHRoaXMud29ya29yZGVyVG9vbCA9IG5ldyBwcy5hcGlUb29sKGFyZ3MscHMuYXBpU2V0dXAud29ya09yZGVycyx0aGlzLndvcmtPcmRlckNoYW5nZWQpO1xuXHRcdFx0aWYgKHRoaXMud29ya29yZGVyVG9vbC5pdGVtcz09PXVuZGVmaW5lZCB8fHRoaXMud29ya29yZGVyVG9vbC5pdGVtcz09PSAwIHx8dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zPT09bnVsbCApe1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHt3b3Jrb3JkZXJzOltdfSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7d29ya29yZGVyczp0aGlzLndvcmtvcmRlclRvb2wuaXRlbXN9KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRzb2NrZXRVcGRhdGUoKXtcblxuXHR9XG5cdG9uVGFza0NoZWNrZWQod29faW5kZXgsaW5kZXgsY2hlY2spe1xuXHRcdHRoaXMud29ya29yZGVyVG9vbC5pdGVtc1t3b19pbmRleF0uc3VidGFza1tpbmRleF0uc3RhdHVzPWNoZWNrPzA6MTtcblx0XHR0aGlzLnNldFN0YXRlKHt3b3Jrb3JkZXJzOnRoaXMud29ya29yZGVyVG9vbC5pdGVtc30pO1xuXHRcdHRoaXMud29ya29yZGVyVG9vbC51cGRhdGUodGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zW3dvX2luZGV4XSk7XG5cdFx0dmFyIGNoZWNrZWRUZXh0PWNoZWNrP1widW5jaGVja2VkLlwiOlwiY2hlY2tlZC5cIlxuXHRcdC8vcHMuc3VjY2Vzc0FsZXJ0KHRoaXMud29ya29yZGVyVG9vbC5pdGVtc1t3b19pbmRleF0uc3VidGFza1tpbmRleF0udGFzayArXCIgXCIrIGNoZWNrZWRUZXh0ICk7XG5cdH1cblx0b25TdGF0dXNDaGFuZ2VkKHN0YXR1cywgaW5kZXgpe1xuXHRcdHRoaXMud29ya29yZGVyVG9vbC5pdGVtc1tpbmRleF0uc3RhdHVzPXN0YXR1cztcblx0XHR0aGlzLnNldFN0YXRlKHt3b3Jrb3JkZXJzOnRoaXMud29ya29yZGVyVG9vbC5pdGVtc30pO1xuXHRcdHRoaXMud29ya29yZGVyVG9vbC51cGRhdGUodGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zW2luZGV4XSk7XG5cdFx0aWYoc3RhdHVzPT1cIkNvbXBsZXRlXCIpe1xuXHRcdFx0cHMuc3VjY2Vzc0FsZXJ0KFwiV29ya29yZGVyIGNvbXBsZXRlZCFcIik7XG5cdFx0fVxuXHR9XG5cdHdvcmtPcmRlckNoYW5nZWQoKXtcblxuXHRcdGlmICh0aGlzLndvcmtvcmRlclRvb2wuaXRlbXMhPT1udWxsKXtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3dvcmtvcmRlcnM6dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zfSk7XG5cdFx0XHRpZih0aGlzLnByb3BzLnN0YXR1c1VwZGF0ZSAhPT0gdW5kZWZpbmVkKXtcblx0XHRcdFx0dGhpcy5wcm9wcy5zdGF0dXNVcGRhdGUodGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zKTtcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3dvcmtvcmRlcnM6W119KTtcblx0XHR9XG5cblx0fVxuXHRjcmVhdGVXb3Jrb3JkZXIoaXRlbSl7XG5cdFx0aXRlbS5kYXRlPW1vbWVudChpdGVtLmRhdGUsXCJNTS9ERC9ZWVlZXCIpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xuXHRcdHRoaXMud29ya29yZGVyVG9vbC5jcmVhdGUoaXRlbSxmdW5jdGlvbihpdGVtKXtcblx0XHRcdHBzLnN1Y2Nlc3NBbGVydChcIldvcmtvcmRlciBcIiAraXRlbS5uYW1lKyBcIiBjcmVhdGVkLlwiKVxuXHRcdH0pO1xuXG5cdH1cblx0d29ya29yZGVyT2JqKGl0ZW0saW5kZXgpe1xuXHRcdHJldHVybihcblx0XHRcdDxXb3Jrb3JkZXJUYXNrIFxuXHRcdFx0XHRrZXk9e2luZGV4ICsgdGhpcy5wcm9wcy5jcmV3fSBcblx0XHRcdFx0aW5kZXg9e2luZGV4fSBcblx0XHRcdFx0bG9jYXRpb25fcm91dGU9e2l0ZW0ubG9jYXRpb25fcm91dGV9XG5cdFx0XHRcdGxvY2F0aW9uPXtpdGVtLmxvY2F0aW9ufVxuXHRcdFx0XHR0YXNrcz17aXRlbS5zdWJ0YXNrfVxuXHRcdFx0XHRzdGF0dXM9e2l0ZW0uc3RhdHVzfVxuXHRcdFx0XHR0eXBlPXtpdGVtLnR5cGV9XG5cdFx0XHRcdHdvcmtvcmRlcj17aXRlbS5uYW1lfVxuXHRcdFx0XHRvblRhc2tDaGVja2VkPXt0aGlzLm9uVGFza0NoZWNrZWR9XG5cdFx0XHRcdG9uU3RhdHVzQ2hhbmdlZD17dGhpcy5vblN0YXR1c0NoYW5nZWR9XG5cdFx0XHRcdHJvdXRlPXtpdGVtLnJvdXRlfVxuXHRcdFx0Lz5cblx0XHQpO1xuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyAgICAgICAgUmVuZGVyXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0cmVuZGVyKCl7XG5cdFx0aWYgKHRoaXMuc3RhdGUud29ya29yZGVycz09PTB8fHRoaXMuc3RhdGUud29ya29yZGVycz09PXVuZGVmaW5lZCl7XG5cdFx0XHRyZXR1cm4gKDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj48aDM+Tm8gV29ya29yZGVyczwvaDM+PC9kaXY+KTtcblx0XHR9XG5cdFx0dmFyIHRvZG89W107XG5cdFx0dmFyIGNvbXBsZXRlPVtdO1xuXHRcdHRoaXMuc3RhdGUud29ya29yZGVycy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXHRcdFx0aWYgKGl0ZW0uc3RhdHVzIT0nQ29tcGxldGUnJiZpdGVtLnN0YXR1cyE9J0luY29tcGxldGUnKXtcblx0XHRcdFx0dG9kby5wdXNoKHRoaXMud29ya29yZGVyT2JqKGl0ZW0saW5kZXgpKTtcblx0XHRcdFx0aWYodG9kby5sZW5ndGgrMSU0PT09MCl7XG5cblx0XHRcdFx0XHR0b2RvLnB1c2goPGRpdiBjbGFzc05hbWU9J2NsZWFyZml4IHNwYWNlcic+PC9kaXY+KVxuXHRcdFx0XHR9XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Y29tcGxldGUucHVzaCh0aGlzLndvcmtvcmRlck9iaihpdGVtLGluZGV4KSk7XG5cdFx0XHRcdGlmKGNvbXBsZXRlLmxlbmd0aCUzPT09MCl7Y29tcGxldGUucHVzaCg8ZGl2IGNsYXNzTmFtZT0nY2xlYXJmaXggc3BhY2VyJz48L2Rpdj4pfVxuXHRcdFx0fVxuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0dmFyIGNvbXBsZXRlSGVhZGVyPSg8aDM+Q29tcGxldGUgV29yayBPcmRlcnM8L2gzPik7XG5cdFx0aWYoY29tcGxldGUubGVuZ3RoPT0wKXtcblx0XHRcdGNvbXBsZXRlSGVhZGVyPVwiXCI7XG5cdFx0fVxuXG5cdFx0Ly8gdmFyIGRhdGU9dGhpcy5wcm9wcy5kYXRlO1xuXHRcdC8vIGRhdGU9bW9tZW50KGRhdGUsJ1lZWVktTU0tREQnKS5mb3JtYXQoXCJNTS9ERC9ZWVlZXCIpO1xuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwid29ya29yZGVyX2NvbnRhaW5lclwiPlxuXHRcdFx0XHQ8ZGl2Pjxici8+XG5cdFx0XHRcdFx0e3RvZG99XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNsZWFyZml4XCI+PC9kaXY+XG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0e2NvbXBsZXRlSGVhZGVyfVxuXHRcdFx0XHRcdHtjb21wbGV0ZX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj48L2Rpdj5cblx0XHRcdFx0PGJyLz5cblx0XHRcdFx0PFdvcmtvcmRlckZvcm1Nb2RhbFxuXHRcdFx0XHRcdGlkPXtcImNyZWF0ZS13by1cIit0aGlzLnByb3BzLmNyZXcucmVwbGFjZShcIiBcIixcIi1cIil9XG5cdFx0XHRcdFx0Y3Jldz17dGhpcy5wcm9wcy5jcmV3fVxuXHRcdFx0XHRcdGRhdGU9e21vbWVudCh0aGlzLnByb3BzLmRhdGUsJ1lZWVktTU0tREQnKS5mb3JtYXQoXCJNTS9ERC9ZWVlZXCIpfVxuXHRcdFx0XHRcdGNyZWF0ZVdvcmtvcmRlcj17dGhpcy5jcmVhdGVXb3Jrb3JkZXJ9XG5cdFx0XHRcdC8+XG5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cblx0fTtcdFxufVxuXG5leHBvcnQgY2xhc3MgV29ya29yZGVyRm9ybU1vZGFsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXG5cdFx0dGhpcy5zdWJtaXQ9dGhpcy5zdWJtaXQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnN0YXRlPXtcblx0XHRcdGxvY2F0aW9uOlwiXCIsXG5cdFx0XHRwcmlvcml0eToxLFxuXHRcdFx0dHlwZTpcIlBydW5pbmdcIixcblx0XHRcdHN0YXR1czpcIlBlbmRpbmdcIixcblx0XHRcdGRhdGU6dGhpcy5wcm9wcy5kYXRlLFxuXHRcdFx0Y3Jldzp0aGlzLnByb3BzLmNyZXdcblx0XHR9XG5cdH1cblxuXHRzdWJtaXQoZSl7XG5cdFx0aWYodGhpcy5zdGF0ZS5sb2NhdGlvbj09XCJcIiB8fHRoaXMuc3RhdGUuY3Jldz09XCJcIiB8fCAobW9tZW50KHRoaXMuc3RhdGUuZGF0ZSxcIk1NL0REL1lZWVlcIikuaXNWYWxpZCgpKSE9PXRydWUpe1xuXHRcdFx0Y29uc29sZS5sb2coXCJub3QgdmFsaWRcIik7XG5cdFx0fWVsc2V7XG5cdFx0XHR2YXIgY29weT1wcy5jbG9uZSh0aGlzLnN0YXRlKTtcblx0XHRcdCQoJyMnKyB0aGlzLnByb3BzLmlkKS5tb2RhbCgnaGlkZScpXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtsb2NhdGlvbjpcIlwifSlcblx0XHRcdHRoaXMucHJvcHMuY3JlYXRlV29ya29yZGVyKGNvcHkpO1xuXHRcdH1cblx0fVxuXHRyZW5kZXIoKXtcblx0XHR2YXIgZmllbGRzPVtcdFx0XG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiYXV0b0NvbXBsZXRlXCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtsb2NhdGlvbjplLnRhcmdldC52YWx1ZX0pXG5cdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0dmFsdWU6dGhpcy5zdGF0ZS5sb2NhdGlvbixcblx0XHRcdFx0cmVxdWlyZWQ6dHJ1ZSxcblx0XHRcdFx0bGFibGU6XCJWaW5leWFyZFwiLFxuXHRcdFx0XHRkb2N0eXBlOlwiVmluZXlhcmRcIixcblx0XHRcdFx0ZG9jdmFsdWU6XCJuYW1lXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiaW5wdXRcIixcblx0XHRcdFx0Y2xhc3NOYW1lOlwidmluZXlhcmQtaW5wdXRcIixcblx0XHRcdFx0dHlwZTpcIm51bWJlclwiLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7cHJpb3JpdHk6ZS50YXJnZXQudmFsdWV9KVxuXHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdHZhbHVlOnRoaXMuc3RhdGUucHJpb3JpdHksXG5cdFx0XHRcdGxhYmxlOlwiUHJpb3JpdHlcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJkYXRlXCIsXG5cdFx0XHRcdHJlcXVpcmVkOnRydWUsXG5cdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtkYXRlOmUudGFyZ2V0LnZhbHVlfSk7XG5cdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0dmFsdWU6dGhpcy5zdGF0ZS5kYXRlLFxuXHRcdFx0XHRsYWJsZTpcIkRhdGVcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJzZWxlY3RcIixcblx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3R5cGU6ZS50YXJnZXQudmFsdWV9KVxuXHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdHZhbHVlOnRoaXMuc3RhdGUudHlwZSxcblx0XHRcdFx0bGFibGU6XCJUeXBlXCIsXG5cdFx0XHRcdG9wdGlvbnM6W1xuXHRcdFx0XHRcdFwiV2F0ZXJpbmdcIixcblx0XHRcdFx0XHRcIlBydW5pbmdcIixcblx0XHRcdFx0XHRcIlJlcGFpclwiLFxuXHRcdFx0XHRcdFwiU3ByYXlpbmdcIlxuXHRcdFx0XHRdXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcInNlbGVjdFwiLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7c3RhdHVzOmUudGFyZ2V0LnZhbHVlfSlcblx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHR2YWx1ZTp0aGlzLnN0YXRlLnN0YXR1cyxcblx0XHRcdFx0bGFibGU6XCJTdGF0dXNcIixcblx0XHRcdFx0ZGlzYWJsZWQ6dHJ1ZSxcblx0XHRcdFx0b3B0aW9uczpbXG5cdFx0XHRcdFx0XCJQZW5kaW5nXCJcblx0XHRcdFx0XVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJhdXRvQ29tcGxldGVcIixcblx0XHRcdFx0b25DaGFuZ2U6IHRoaXMuc29tZUZ1bmN0aW9uLFxuXHRcdFx0XHRsYWJsZTpcIkNyZXdcIixcblx0XHRcdFx0cmVxdWlyZWQ6dHJ1ZSxcblx0XHRcdFx0cmVhZG9ubHk6XCJ0dXJlXCIsXG5cdFx0XHRcdGRvY3R5cGU6XCJDcmV3XCIsXG5cdFx0XHRcdGRvY3ZhbHVlOlwibmFtZVwiLFxuXHRcdFx0XHRkb2NsYWJsZTpcImNyZXdfbGVhZF9mdWxsX25hbWVcIixcblx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe2NyZXc6ZS50YXJnZXQudmFsdWV9KVxuXHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdHZhbHVlOnRoaXMuc3RhdGUuY3Jldyxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiYnV0dG9uXCIsXG5cdFx0XHRcdHR5cGU6XCJzdWJtaXRcIixcblx0XHRcdFx0dmFsdWU6XCJDcmVhdGUgV29yayBPcmRlclwiLFxuXHRcdFx0XHRjbGFzc05hbWU6XCJidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIsXG5cdFx0XHRcdG9uQ2xpY2s6dGhpcy5zdWJtaXRcblx0XHRcdH1cblxuXG5cdFx0XVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2Plx0XHRcdFx0XG5cdFx0XHRcdDxhIFxuXHRcdFx0XHRcdGhyZWY9XCIjXCIgXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCJcblx0XHRcdFx0XHRvbkNsaWNrPXtmdW5jdGlvbigpeyQoJyMnKyB0aGlzLnByb3BzLmlkKS5tb2RhbCgpfS5iaW5kKHRoaXMpfVxuXHRcdFx0XHRcdD5cblx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLXBsdXNcIj48L3NwYW4+IE5ldyBXb3JrIE9yZGVyPC9hPlxuXHRcdFx0XHQ8TW9kYWwgXG5cdFx0XHRcdFx0aWQ9e3RoaXMucHJvcHMuaWR9IFxuXHRcdFx0XHRcdHN1Ym1pdFRleHQ9XCJTdWJtaXRcIiBcblx0XHRcdFx0XHR0aXRsZT1cIkNyZWF0ZSBOZXcgV29ya29yZGVyXCJcblx0XHRcdFx0XHRzdWJtaXQ9e2ZhbHNlfVxuXHRcdFx0XHRcdD5cblxuXHRcdFx0XHRcdDxGb3JtXG5cdFx0XHRcdFx0XHRpZD1cIkNyZWF0ZVdvcmtvcmRlckZvcm1cIlxuXHRcdFx0XHRcdFx0dHlwZT1cImhvcml6b250YWxcIlxuXHRcdFx0XHRcdFx0ZmllbGRzPXtmaWVsZHN9XG5cblx0XHRcdFx0XHQvPlxuXG5cdFx0XHRcdDwvTW9kYWw+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2tDaGVjayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnRhc2tDaGVja2VkID0gdGhpcy50YXNrQ2hlY2tlZC5iaW5kKHRoaXMpO1xuXHR9XG5cdHRhc2tDaGVja2VkKGUpe1xuXHRcdHRoaXMucHJvcHMudGFza0NoZWNrZWQodGhpcy5wcm9wcy5pbmRleCwgdGhpcy5wcm9wcy5jaGVja2VkKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCBjaGVja2VkID0gdGhpcy5wcm9wcy5jaGVja2VkID8gXCJsaW5lLXRocm91Z2hcIiA6IFwiXCI7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja2JveCByb3dcIj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtOFwiPlxuXHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPXtjaGVja2VkfT5cblx0XHRcdFx0XHQ8aW5wdXQgXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJiaWctY2hlY2tib3hcIiBcblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXtmdW5jdGlvbigpe3RoaXMucHJvcHMudGFza0NoZWNrZWQodGhpcy5wcm9wcy5pdGVtLCBjaGVja2VkKTt9LmJpbmQodGhpcyl9IFxuXHRcdFx0XHRcdFx0dHlwZT1cImNoZWNrYm94XCIgXG5cdFx0XHRcdFx0XHRjaGVja2VkPXt0aGlzLnByb3BzLmNoZWNrZWR9IC8+XG5cdFx0XHRcdFx0e3RoaXMucHJvcHMubGFibGV9XG5cdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImVkaXQgY29sLXhzLTRcIj4gXG5cdFx0XHRcdFx0PGJ1dHRvbiBcblx0XHRcdFx0XHRcdHR5cGU9XCJidXR0b25cIiBcblx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdCBpbmxpbmUtdGFza1wiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLnByb3BzLmVkaXRUYXNrfVxuXHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1lZGl0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxuXHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cdFxufSIsIlxuLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5pbXBvcnQgVGFza0NoZWNrIGZyb20gJy4vdGFza0NoZWNrJ1xuaW1wb3J0IENyZWF0ZUlzc3VlIGZyb20gJy4vY3JlYXRlSXNzdWUnXG5pbXBvcnQgTW9kYWwgZnJvbSAnLi4vdXRpbHMvbW9kYWwnXG5pbXBvcnQge0Zvcm0sIFNlbGVjdH0gZnJvbSAnLi4vdXRpbHMvZm9ybXMnXG5pbXBvcnQge1NwcmF5Rm9ybSxQcnVuaW5nRm9ybX0gZnJvbSAnLi4vdmluZXlhcmQvc3ByYXlGb3JtJ1xuaW1wb3J0IERvY3R5cGVGb3JtIGZyb20gJy4uL3V0aWxzL2RvY3R5cGVGb3JtJ1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdvcmtvcmRlclRhc2sgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5zdGF0ZT17XG5cdFx0XHRpc3N1ZXM6W10sXG5cdFx0XHR0aXRsZTonJyxcblx0XHRcdG1vZGFsOiduZXcnLFxuXHRcdFx0bW9kYWxQcmlvcml0eTonbG93Jyxcblx0XHRcdG1vZGFsVGl0bGU6JycsXG5cdFx0XHRtb2RhbERlc2NyaXB0aW9uOicnLFxuXHRcdFx0bW9kYWxOYW1lOicnXG5cdFx0fTtcblx0XHR0aGlzLnRhc2tDaGVja2VkPXRoaXMudGFza0NoZWNrZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnN0YXR1c0NoYW5nZT10aGlzLnN0YXR1c0NoYW5nZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuYWN0aXZhdGVNb2RhbE5ldz10aGlzLmFjdGl2YXRlTW9kYWxOZXcuYmluZCh0aGlzKTtcblx0XHR0aGlzLmFjdGl2YXRlTW9kYWxFZGl0PXRoaXMuYWN0aXZhdGVNb2RhbEVkaXQuYmluZCh0aGlzKTtcblxuXHRcdHRoaXMuaXNzdWVGb3JtQ2hhbmdlPXRoaXMuaXNzdWVGb3JtQ2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jcmVhdGVJc3N1ZT10aGlzLmNyZWF0ZUlzc3VlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5lZGl0SXNzdWU9dGhpcy5lZGl0SXNzdWUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmRlbGV0ZUlzc3VlPXRoaXMuZGVsZXRlSXNzdWUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmNsb3NlPXRoaXMuY2xvc2UuYmluZCh0aGlzKTtcblxuXHRcdHRoaXMuaXNzdWVDaGFuZ2VkPXRoaXMuaXNzdWVDaGFuZ2VkLmJpbmQodGhpcyk7XG5cblxuXHRcdHRoaXMubW9kYWxJZD1cImlzc3VlLWZvcm0tXCIrdGhpcy5wcm9wcy53b3Jrb3JkZXI7XG5cblx0XHRcblx0XHR0aGlzLmlzc3VlVG9vbCA9IG5ldyBwcy5hcGlUb29sKHtcIndvcmtfb3JkZXJcIjp0aGlzLnByb3BzLndvcmtvcmRlcn0se2RvY3R5cGU6J0lzc3VlJ30sdGhpcy5pc3N1ZUNoYW5nZWQpO1xuXG5cblx0fVxuXHR0YXNrQ2hlY2tlZChlKXtcblx0XHR0aGlzLnNldFN0YXRlKHt0aXRsZTpcIkNIRUNLRURcIn0pO1xuXHR9XG5cdGlzQ2hlY2tlZCh2YWx1ZSl7XG4gICAgXHRyZXR1cm4gKCh2YWx1ZT09PXRoaXMuc3RhdGUuc2VsZWN0ZWQpID8nY2hlY2tlZCBsaW5lLXRocm91Z2gnOidkZWZhdWx0Jyk7XG4gIFx0fVxuICBcdHRhc2tDaGVja2VkKGluZGV4LGNoZWNrZWQpe1xuICBcdFx0dmFyIHdvX2luZGV4PXRoaXMucHJvcHMuaW5kZXg7XG4gIFx0XHR0aGlzLnByb3BzLm9uVGFza0NoZWNrZWQod29faW5kZXgsaW5kZXgsY2hlY2tlZCk7XG4gIFx0fVxuICBcdHN0YXR1c0NoYW5nZShlKXtcbiAgXHRcdHRoaXMucHJvcHMub25TdGF0dXNDaGFuZ2VkKGUudGFyZ2V0LnZhbHVlLHRoaXMucHJvcHMuaW5kZXgpO1xuXG4gIFx0fVxuICBcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0XHRcdElTU1VFIEZVTkNUSU9OU1xuICBcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICBcdGFjdGl2YXRlTW9kYWxOZXcoKXtcbiAgXHRcdHRoaXMuc2V0U3RhdGUoe2lzc3VlTW9kZTpcImNyZWF0ZVwifSk7XG4gIFx0XHR0aGlzLnNldFN0YXRlKHtpc3N1ZTp7fX0pO1xuICBcdFx0JCgnIycrdGhpcy5tb2RhbElkKS5tb2RhbCgpO1xuICBcdH1cbiAgXHRhY3RpdmF0ZU1vZGFsRWRpdChpc3N1ZSl7XG4gIFx0XHR0aGlzLnNldFN0YXRlKHtpc3N1ZU1vZGU6XCJlZGl0XCJ9KTtcblx0XHR0aGlzLnNldFN0YXRlKHtpc3N1ZTppc3N1ZX0pO1xuICBcdFx0JCgnIycrdGhpcy5tb2RhbElkKS5tb2RhbCgpO1xuICBcdH1cbiAgXHRpc3N1ZUZvcm1DaGFuZ2UoaXNzdWUpe1xuICBcdFx0dGhpcy5zZXRTdGF0ZSh7aXNzdWU6aXNzdWV9KTtcbiAgXHR9XG4gIFx0aXNzdWVDaGFuZ2VkKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7aXNzdWVzOnRoaXMuaXNzdWVUb29sLml0ZW1zfSk7XG5cdH1cbiAgXHRjcmVhdGVJc3N1ZShpdGVtKXtcbiAgXHRcdC8vY29uc29sZS5sb2codGhpcy5zdGF0ZS5pc3N1ZSk7XG5cdFx0aXRlbS52aW5leWFyZD10aGlzLnByb3BzLmxvY2F0aW9uO1xuXHRcdGl0ZW0ud29ya19vcmRlcj10aGlzLnByb3BzLndvcmtvcmRlcjtcblx0XHR0aGlzLmlzc3VlVG9vbC5jcmVhdGUoaXRlbSxmdW5jdGlvbihpdGVtKXtcblx0XHRcdHBzLnN1Y2Nlc3NBbGVydChcIklzc3VlIFwiICtpdGVtLnRpdGxlKyBcIiBjcmVhdGVkLlwiKVxuXHRcdH0pO1xuXHRcdCQoJyMnK3RoaXMubW9kYWxJZCkubW9kYWwoJ3RvZ2dsZScpO1xuXHR9XG5cdGRlbGV0ZUlzc3VlKGl0ZW0pe1xuICBcdFx0dGhpcy5pc3N1ZVRvb2wuZGVsZXRlKGl0ZW0pO1xuXHRcdCQoJyMnK3RoaXMubW9kYWxJZCkubW9kYWwoJ3RvZ2dsZScpO1xuXHR9XG5cdGVkaXRJc3N1ZShpdGVtKXtcblx0XHR0aGlzLmlzc3VlVG9vbC51cGRhdGUoaXRlbSxmdW5jdGlvbihpdGVtKXtcblx0XHRcdHBzLnN1Y2Nlc3NBbGVydChcIklzc3VlIFwiICtpdGVtLnRpdGxlK1wiIHVwZGF0ZWQuXCIpXG5cdFx0fSk7XG5cdFx0JCgnIycrdGhpcy5tb2RhbElkKS5tb2RhbCgndG9nZ2xlJyk7XG5cdH1cblx0Y2xvc2UoKXtcblx0XHQkKCcjJyt0aGlzLm1vZGFsSWQpLm1vZGFsKCd0b2dnbGUnKTtcblx0fVxuXG5cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3QgdGl0bGU9XCJ3ZWxjb21lXCI7XG5cdFx0dmFyIG1haW5DbGFzcz17XG5cdFx0XHQnQ29tcGxldGUnOidwYW5lbC1zdWNjZXNzJyxcblx0XHRcdCdJbmNvbXBsZXRlJzoncGFuZWwtZGFuZ2VyJyxcblx0XHRcdCdQZW5kaW5nJzoncGFuZWwtZGVmYXVsdCcsXG5cdFx0XHQnU3RhcnRlZCc6J3BhbmVsLXdhcm5pbmcnXG5cdFx0fVt0aGlzLnByb3BzLnN0YXR1c107XG5cdFx0bWFpbkNsYXNzID0gbWFpbkNsYXNzICsgXCIgcGFuZWwgd29ya29yZGVyIHBzLXBhbmVsXCI7XG5cdFx0dmFyIHJvdXRlPSh0aGlzLnByb3BzLnJvdXRlPT09dW5kZWZpbmVkKT9cIk5vdCBDcmVhdGVkXCI6KDxhIGNsYXNzTmFtZT1cIlwiIGhyZWY9e3RoaXMucHJvcHMucm91dGV9Pk1vcmUgSW5mb3JtYXRpb248L2E+KTtcblx0XHR2YXIgdGFza3M9XCJcIjtcblx0XHRpZih0aGlzLnByb3BzLnRhc2tzIT09dW5kZWZpbmVkKXtcblx0XHRcdHRhc2tzPVtdO1xuXHRcdFx0dGhpcy5wcm9wcy50YXNrcy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXHRcdFx0XHR2YXIgY2hlY2tlZD1pdGVtLnN0YXR1cz90cnVlOmZhbHNlO1xuXHRcdFx0XHR0YXNrcy5wdXNoKDxUYXNrQ2hlY2sga2V5PXtpbmRleH0gaW5kZXg9e2luZGV4fSBsYWJsZT17aXRlbS50YXNrfSBjaGVja2VkPXtjaGVja2VkfSB0YXNrQ2hlY2tlZD17dGhpcy50YXNrQ2hlY2tlZH0vPik7XG5cdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0fVxuXG5cdFx0dmFyIG1vZGFsVGl0bGUgPSBcIlwiO1xuXHRcdGlmKHRoaXMuc3RhdGUuaXNzdWVNb2RlKXtcblx0XHRcdG1vZGFsVGl0bGUgPSBcIkNyZWF0ZSBJc3N1ZVwiO1xuXHRcdH1lbHNle1xuXHRcdFx0bW9kYWxUaXRsZSA9IFwiRWRpdCBJc3N1ZVwiO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nY29sLW1kLTQgY29sLXNtLTQnPlxuXHRcdFx0XHQ8TW9kYWwgXG5cdFx0XHRcdFx0aWQ9e3RoaXMubW9kYWxJZH0gXG5cdFx0XHRcdFx0c3VibWl0VGV4dD1cIlN1Ym1pdFwiIFxuXHRcdFx0XHRcdHRpdGxlPVwiQ3JlYXRlIElzc3VlIEZvclwiXG5cdFx0XHRcdFx0c3VibWl0PXtmYWxzZX1cblx0XHRcdFx0XHQ+XG5cblx0XHRcdFx0XHRcdDxEb2N0eXBlRm9ybSBcblx0XHRcdFx0XHRcdFx0Y2xvc2U9e3RoaXMuY2xvc2V9XG5cdFx0XHRcdFx0XHRcdGl0ZW1DaGFuZ2U9e3RoaXMuaXNzdWVGb3JtQ2hhbmdlfVxuXHRcdFx0XHRcdFx0XHRjcmVhdGU9e3RoaXMuY3JlYXRlSXNzdWV9XG5cdFx0XHRcdFx0XHRcdGVkaXQ9e3RoaXMuZWRpdElzc3VlfVxuXHRcdFx0XHRcdFx0XHRkZWxldGU9e3RoaXMuZGVsZXRlSXNzdWV9XG5cdFx0XHRcdFx0XHRcdG1vZGU9e3RoaXMuc3RhdGUuaXNzdWVNb2RlfVxuXHRcdFx0XHRcdFx0XHRpdGVtPXt0aGlzLnN0YXRlLmlzc3VlfVxuXHRcdFx0XHRcdFx0XHRpZD17dGhpcy5wcm9wcy53b3Jrb3JkZXJ9XG5cblx0XHRcdFx0XHRcdFx0ZG9jdHlwZT1cIklzc3VlXCJcblx0XHRcdFx0XHRcdFx0aXNzdWVfdGl0bGU9e3thY3RpdmU6MX19XG5cdFx0XHRcdFx0XHRcdGlzc3VlPXt7XG5cdFx0XHRcdFx0XHRcdFx0YWN0aXZlOjEsXG5cdFx0XHRcdFx0XHRcdFx0dHlwZTpcInRleHRhcmVhXCIgXG5cdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHRcdHByaW9yaXR5PXt7XG5cdFx0XHRcdFx0XHRcdFx0YWN0aXZlOjEsXG5cdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcIkxvd1wiXG5cdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHRcdHN0YXR1cz17e1xuXHRcdFx0XHRcdFx0XHRcdGFjdGl2ZToxLFxuXHRcdFx0XHRcdFx0XHRcdGRlZmF1bHQ6XCJPcGVuXCJcblx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdC8+IFx0XG5cdFx0XHRcdDwvTW9kYWw+XG5cdFx0XHQ8ZGl2IGlkPVwiXCIgY2xhc3NOYW1lPXttYWluQ2xhc3N9PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWhlYWRpbmdcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuXHRcdFx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInBhbmVsLXRpdGxlIGNvbC14cy04XCI+XG5cdFx0XHRcdFx0XHRcdDxhIGNsYXNzTmFtZT1cImZsb2F0LWxlZnRcIiBocmVmPXt0aGlzLnByb3BzLmxvY2F0aW9uX3JvdXRlfT57dGhpcy5wcm9wcy5sb2NhdGlvbn08L2E+XG5cdFx0XHRcdFx0XHQ8L2gzPlxuXG5cblxuXHRcdFx0XHRcdFx0XHQ8Q3JlYXRlSXNzdWVcblx0XHRcdFx0XHRcdFx0XHRpc3N1ZXM9e3RoaXMuc3RhdGUuaXNzdWVzfVxuXHRcdFx0XHRcdFx0XHRcdGFjdGl2YXRlTW9kYWxOZXc9e3RoaXMuYWN0aXZhdGVNb2RhbE5ld31cblx0XHRcdFx0XHRcdFx0XHRhY3RpdmF0ZU1vZGFsRWRpdD17dGhpcy5hY3RpdmF0ZU1vZGFsRWRpdH1cblx0XHRcdFx0XHRcdFx0XHR3b3Jrb3JkZXI9e3RoaXMucHJvcHMud29ya29yZGVyfVxuXG5cdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj48L2Rpdj5cblxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XG5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtYm9keVwiPlxuXHRcdFx0XHRcdDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIHN0YXR1c1wiIHZhbHVlPXt0aGlzLnByb3BzLnN0YXR1c30gb25DaGFuZ2U9e3RoaXMuc3RhdHVzQ2hhbmdlfT5cblx0XHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9XCJQZW5kaW5nXCI+UGVuZGluZzwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIlN0YXJ0ZWRcIj5TdGFydGVkPC9vcHRpb24+XG5cdFx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPVwiQ29tcGxldGVcIj5Db21wbGV0ZTwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIkluY29tcGxldGVcIj5JbmNvbXBsZXRlPC9vcHRpb24+XG5cdFx0XHRcdFx0PC9zZWxlY3Q+XG5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoZWNrX2JveGVzXCI+XG5cblx0XHRcdFx0XHRcdHt0YXNrc31cblx0XHRcdFx0XHRcdDxWaW5leWFyZFRhc2tzIHdvcmtvcmRlcj17dGhpcy5wcm9wcy53b3Jrb3JkZXJ9IHZpbmV5YXJkPXt0aGlzLnByb3BzLmxvY2F0aW9ufS8+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRcdHtyb3V0ZX1cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuXG5cblxuZXhwb3J0IGNsYXNzIFZpbmV5YXJkVGFza3MgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cblx0XHR0aGlzLm1vZGFsTmV3VGFzaz10aGlzLm1vZGFsTmV3VGFzay5iaW5kKHRoaXMpO1xuXHRcdHRoaXMudGFza0NoZWNrZWQ9dGhpcy50YXNrQ2hlY2tlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMudGFza0NoYW5nZWQ9dGhpcy50YXNrQ2hhbmdlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZWRpdFRhc2s9dGhpcy5lZGl0VGFzay5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZ2V0Rm9ybT10aGlzLmdldEZvcm0uYmluZCh0aGlzKTtcblxuXHRcdHRoaXMuZGVsZXRlPXRoaXMuZGVsZXRlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jbG9zZT10aGlzLmNsb3NlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy51cGRhdGU9dGhpcy51cGRhdGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmNyZWF0ZT10aGlzLmNyZWF0ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMub25DaGFuZ2U9dGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpO1xuXHRcdFxuXG5cdFx0dGhpcy5tb2RhbElkPVwidGFzay1mb3JtXCIrdGhpcy5wcm9wcy53b3Jrb3JkZXI7XG5cdFx0XG5cdFx0dGhpcy50YXNrc1Rvb2wgPSBuZXcgcHMuYXBpVG9vbCh7XCJ3b3JrX29yZGVyXCI6dGhpcy5wcm9wcy53b3Jrb3JkZXJ9LHBzLmFwaVNldHVwLnZpbmV5YXJkVGFza3MsdGhpcy50YXNrQ2hhbmdlZCk7XG5cdFx0dGhpcy5zdGF0ZT17XG5cdFx0XHR0YXNrczp0aGlzLnRhc2tzVG9vbC5pdGVtcyxcblx0XHRcdGZvcm1TdGF0ZTogXCJ0YXNrVHlwZVwiLFxuXHRcdFx0Zm9ybU1vZGU6XCJjcmVhdGVcIixcblx0XHRcdGVkaXRJdGVtOm51bGxcblx0XHR9O1xuXHR9XG5cdG1vZGFsTmV3VGFzaygpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Zm9ybVN0YXRlOlwidGFza1R5cGVcIixcblx0XHRcdGVkaXRJdGVtOm51bGwsXG5cdFx0XHRmb3JtTW9kZTpcImNyZWF0ZVwiXG5cdFx0fSk7XG5cdFx0JCgnIycrdGhpcy5tb2RhbElkKS5tb2RhbCgpO1xuXHR9XG5cdGlzQ2hlY2tlZCh2YWx1ZSl7XG4gICAgXHQvL3JldHVybiAoKHZhbHVlPT09dGhpcy5zdGF0ZS5zZWxlY3RlZCkgPydjaGVja2VkIGxpbmUtdGhyb3VnaCc6J2RlZmF1bHQnKTtcbiAgXHR9XG4gIFx0dGFza0NoYW5nZWQoKXtcbiAgXHRcdHRoaXMuc2V0U3RhdGUoe3Rhc2tzOnRoaXMudGFza3NUb29sLml0ZW1zfSk7XG4gIFx0fVxuICBcdHRhc2tDaGVja2VkKGl0ZW0pe1xuICBcdFx0aXRlbS5jb21wbGV0ZT1pdGVtLmNvbXBsZXRlPzA6MTtcbiAgXHRcdHRoaXMudGFza3NUb29sLnVwZGF0ZShpdGVtKTtcbiAgXHR9XG4gIFx0ZWRpdFRhc2soaXRlbSl7XG4gIFx0XHRjb25zb2xlLmxvZyhcImVkaXQgdGFzayBjYWxsZWRcIik7XG4gIFx0XHRjb25zb2xlLmxvZyhpdGVtKTtcbiAgXHRcdHRoaXMuc2V0U3RhdGUoXG4gIFx0XHRcdHtcbiAgXHRcdFx0XHRmb3JtU3RhdGU6aXRlbS5kb2N0eXBlLnJlcGxhY2UoL1xccy9nLCAnJyksXG4gIFx0XHRcdFx0ZWRpdEl0ZW06aXRlbSxcbiAgXHRcdFx0XHRmb3JtTW9kZTpcImVkaXRcIlxuICBcdFx0XHR9KTtcbiAgXHRcdCQoJyMnK3RoaXMubW9kYWxJZCkubW9kYWwoKTtcbiAgXHR9XG4gIFx0cmVuZGVyVGFza3MoKXtcbiAgXHRcdHZhciB0YXNrcz1bXTtcbiAgXHRcdGlmKHRoaXMuc3RhdGUudGFza3MhPT11bmRlZmluZWQmJnRoaXMuc3RhdGUudGFza3MhPT1udWxsKXtcblx0XHRcdHRhc2tzPVtdO1xuXHRcdFx0dGhpcy5zdGF0ZS50YXNrcy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXHRcdFx0XHQvL3ZhciBjaGVja2VkPWl0ZW0uc3RhdHVzP3RydWU6ZmFsc2U7XG5cdFx0XHRcdHRhc2tzLnB1c2goXG5cdFx0XHRcdFx0PFRhc2tDaGVjayBcblx0XHRcdFx0XHRcdGtleT17aW5kZXh9XG5cdFx0XHRcdFx0XHRpbmRleD17aW5kZXh9XG5cdFx0XHRcdFx0XHRpdGVtPXtpdGVtfVxuXHRcdFx0XHRcdFx0bGFibGU9e2l0ZW0uZG9jdHlwZX1cblx0XHRcdFx0XHRcdGNoZWNrZWQ9e2l0ZW0uY29tcGxldGV9XG5cdFx0XHRcdFx0XHR0YXNrQ2hlY2tlZD17dGhpcy50YXNrQ2hlY2tlZH1cblx0XHRcdFx0XHRcdGVkaXRUYXNrPXtmdW5jdGlvbihlKXt0aGlzLmVkaXRUYXNrKGl0ZW0pO30uYmluZCh0aGlzKX1cblx0XHRcdFx0XHQvPik7XG5cdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0fVxuXHRcdHJldHVybiB0YXNrcztcbiAgXHR9XG4gIFx0ZGVsZXRlKGNvcHkpe1xuICBcdFx0dGhpcy50YXNrc1Rvb2wuZGVsZXRlKGNvcHkpO1xuXHRcdCQoJyMnK3RoaXMubW9kYWxJZCkubW9kYWwoJ3RvZ2dsZScpO1xuXHR9XG4gIFx0Y2xvc2UoZSl7XG4gIFx0XHRjb25zb2xlLmxvZyhcImNsb3NlXCIpO1xuICBcdFx0JCgnIycrdGhpcy5tb2RhbElkKS5tb2RhbCgndG9nZ2xlJyk7XG4gIFx0fVxuICBcdHVwZGF0ZShjb3B5KXtcbiAgXHRcdHRoaXMudGFza3NUb29sLnVwZGF0ZShjb3B5KTtcblx0XHQkKCcjJyt0aGlzLm1vZGFsSWQpLm1vZGFsKCd0b2dnbGUnKTtcbiAgXHR9XG4gIFx0Y3JlYXRlKGl0ZW0sZG9jdHlwZSl7XG5cdFx0aXRlbS53b3JrX29yZGVyPXRoaXMucHJvcHMud29ya29yZGVyO1xuXHRcdGl0ZW0udmluZXlhcmQ9dGhpcy5wcm9wcy52aW5leWFyZDtcblx0XHRpdGVtLmRvY3R5cGU9ZG9jdHlwZTtcblx0XHR0aGlzLnRhc2tzVG9vbC5jcmVhdGUoaXRlbSk7XG5cdFx0JCgnIycrdGhpcy5tb2RhbElkKS5tb2RhbCgndG9nZ2xlJyk7XG4gIFx0fVxuICBcdG9uQ2hhbmdlKGNvcHkpe1xuICBcdFx0dGhpcy5zZXRTdGF0ZSh7ZWRpdEl0ZW06Y29weX0pXG4gIFx0fVxuICBcdGdldEZvcm0oKXtcbiAgXHRcdHZhciBmb3Jtc09iaj17XG5cdFx0XHR0YXNrVHlwZTpmdW5jdGlvbigpe1xuXHRcdFx0XHRyZXR1cm4oXHRcblx0XHRcdFx0PFNlbGVjdFxuXHRcdFx0XHRcdGNsYXNzTmFtZT1cIlwiXG5cdFx0XHRcdFx0bGFibGU9XCJUYXNrIFR5cGVcIlxuXHRcdFx0XHRcdG9wdGlvbnM9e1tcIiBcIl0uY29uY2F0KHBzLmFwaVNldHVwLnZpbmV5YXJkVGFza3MuZG9jdHlwZSl9XG5cdFx0XHRcdFx0aW5wdXRDaGFuZ2VkPXtcblx0XHRcdFx0XHRcdGZ1bmN0aW9uKGUpe3RoaXMuc2V0U3RhdGUoe2Zvcm1TdGF0ZTogIGUudGFyZ2V0LnZhbHVlLnJlcGxhY2UoL1xccy9nLCAnJykgIH0pfS5iaW5kKHRoaXMpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQvPlxuXHRcdFx0KX0uYmluZCh0aGlzKSxcblx0XHRcdFNwcmF5aW5nOmZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0XHRyZXR1cm4gKFx0XHRcdFx0XHRcblx0XHRcdFx0XHQ8RG9jdHlwZUZvcm0gXG5cdFx0XHRcdFx0XHRjbG9zZT17dGhpcy5jbG9zZX1cblx0XHRcdFx0XHRcdGl0ZW1DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG5cdFx0XHRcdFx0XHRjcmVhdGU9e3RoaXMuY3JlYXRlfVxuXHRcdFx0XHRcdFx0ZWRpdD17dGhpcy51cGRhdGV9XG5cdFx0XHRcdFx0XHRkZWxldGU9e3RoaXMuZGVsZXRlfVxuXHRcdFx0XHRcdFx0bW9kZT17dGhpcy5zdGF0ZS5mb3JtTW9kZX1cblx0XHRcdFx0XHRcdGl0ZW09e2l0ZW19XG5cdFx0XHRcdFx0XHRpZD17dGhpcy5wcm9wcy53b3Jrb3JkZXJ9XG5cblx0XHRcdFx0XHRcdGRvY3R5cGU9XCJTcHJheWluZ1wiXG5cdFx0XHRcdFx0XHRzZWFzb249e3thY3RpdmU6MX19XG5cdFx0XHRcdFx0XHRub3RlPXt7XG5cdFx0XHRcdFx0XHRcdGFjdGl2ZToxLFxuXHRcdFx0XHRcdFx0XHR0eXBlOlwidGV4dGFyZWFcIiBcblx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHRzcHJheV90eXBlPXt7YWN0aXZlOjF9fVxuXG5cdFx0XHRcdFx0Lz4gXHRcdFxuXHRcdFx0XHQpO1xuXG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRIYXJ2ZXN0OmZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0XHRyZXR1cm4gKFx0XHRcdFx0XHRcblx0XHRcdFx0XHQ8RG9jdHlwZUZvcm0gXG5cdFx0XHRcdFx0XHRjbG9zZT17dGhpcy5jbG9zZX1cblx0XHRcdFx0XHRcdGl0ZW1DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG5cdFx0XHRcdFx0XHRjcmVhdGU9e3RoaXMuY3JlYXRlfVxuXHRcdFx0XHRcdFx0ZWRpdD17dGhpcy51cGRhdGV9XG5cdFx0XHRcdFx0XHRkZWxldGU9e3RoaXMuZGVsZXRlfVxuXHRcdFx0XHRcdFx0bW9kZT17dGhpcy5zdGF0ZS5mb3JtTW9kZX1cblx0XHRcdFx0XHRcdGl0ZW09e2l0ZW19XG5cdFx0XHRcdFx0XHRpZD17dGhpcy5wcm9wcy53b3Jrb3JkZXJ9XG5cblx0XHRcdFx0XHRcdGRvY3R5cGU9XCJIYXJ2ZXN0XCJcblx0XHRcdFx0XHRcdHNlYXNvbj17e2FjdGl2ZToxfX1cblx0XHRcdFx0XHRcdG5vdGU9e3tcblx0XHRcdFx0XHRcdFx0YWN0aXZlOjEsXG5cdFx0XHRcdFx0XHRcdHR5cGU6XCJ0ZXh0YXJlYVwiIFxuXHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdHBvdW5kcz17e2FjdGl2ZToxfX1cblx0XHRcdFx0XHRcdHBvc3RfaGFydmVzdF93YXRlcj17e2FjdGl2ZToxfX1cblxuXHRcdFx0XHRcdC8+IFx0XHRcblx0XHRcdFx0KTtcblxuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0QmlyZE5ldHM6ZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdHJldHVybiAoXHRcdFx0XHRcdFxuXHRcdFx0XHRcdDxEb2N0eXBlRm9ybSBcblx0XHRcdFx0XHRcdGNsb3NlPXt0aGlzLmNsb3NlfVxuXHRcdFx0XHRcdFx0aXRlbUNoYW5nZT17dGhpcy5vbkNoYW5nZX1cblx0XHRcdFx0XHRcdGNyZWF0ZT17dGhpcy5jcmVhdGV9XG5cdFx0XHRcdFx0XHRlZGl0PXt0aGlzLnVwZGF0ZX1cblx0XHRcdFx0XHRcdGRlbGV0ZT17dGhpcy5kZWxldGV9XG5cdFx0XHRcdFx0XHRtb2RlPXt0aGlzLnN0YXRlLmZvcm1Nb2RlfVxuXHRcdFx0XHRcdFx0aXRlbT17aXRlbX1cblx0XHRcdFx0XHRcdGlkPXt0aGlzLnByb3BzLndvcmtvcmRlcn1cblxuXHRcdFx0XHRcdFx0ZG9jdHlwZT1cIkJpcmQgTmV0c1wiXG5cdFx0XHRcdFx0XHRzZWFzb249e3thY3RpdmU6MX19XG5cdFx0XHRcdFx0XHRub3RlPXt7XG5cdFx0XHRcdFx0XHRcdGFjdGl2ZToxLFxuXHRcdFx0XHRcdFx0XHR0eXBlOlwidGV4dGFyZWFcIiBcblx0XHRcdFx0XHRcdH19XG5cblx0XHRcdFx0XHQvPiBcdFx0XG5cdFx0XHRcdCk7XG5cblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFdhdGVyaW5nOmZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0XHRyZXR1cm4gKFx0XHRcdFx0XHRcblx0XHRcdFx0XHQ8RG9jdHlwZUZvcm0gXG5cdFx0XHRcdFx0XHRjbG9zZT17dGhpcy5jbG9zZX1cblx0XHRcdFx0XHRcdGl0ZW1DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG5cdFx0XHRcdFx0XHRjcmVhdGU9e3RoaXMuY3JlYXRlfVxuXHRcdFx0XHRcdFx0ZWRpdD17dGhpcy51cGRhdGV9XG5cdFx0XHRcdFx0XHRkZWxldGU9e3RoaXMuZGVsZXRlfVxuXHRcdFx0XHRcdFx0bW9kZT17dGhpcy5zdGF0ZS5mb3JtTW9kZX1cblx0XHRcdFx0XHRcdGl0ZW09e2l0ZW19XG5cdFx0XHRcdFx0XHRpZD17dGhpcy5wcm9wcy53b3Jrb3JkZXJ9XG5cblx0XHRcdFx0XHRcdGRvY3R5cGU9XCJXYXRlcmluZ1wiXG5cdFx0XHRcdFx0XHRzZWFzb249e3thY3RpdmU6MX19XG5cdFx0XHRcdFx0XHRub3RlPXt7XG5cdFx0XHRcdFx0XHRcdGFjdGl2ZToxLFxuXHRcdFx0XHRcdFx0XHR0eXBlOlwidGV4dGFyZWFcIiBcblx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHRkdXJhdGlvbj17e2FjdGl2ZToxfX1cblxuXHRcdFx0XHRcdC8+IFx0XHRcblx0XHRcdFx0KTtcblxuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0Q2Fub3B5OmZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0XHRyZXR1cm4gKFx0XHRcdFx0XHRcblx0XHRcdFx0XHQ8RG9jdHlwZUZvcm0gXG5cdFx0XHRcdFx0XHRjbG9zZT17dGhpcy5jbG9zZX1cblx0XHRcdFx0XHRcdGl0ZW1DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG5cdFx0XHRcdFx0XHRjcmVhdGU9e3RoaXMuY3JlYXRlfVxuXHRcdFx0XHRcdFx0ZWRpdD17dGhpcy51cGRhdGV9XG5cdFx0XHRcdFx0XHRkZWxldGU9e3RoaXMuZGVsZXRlfVxuXHRcdFx0XHRcdFx0bW9kZT17dGhpcy5zdGF0ZS5mb3JtTW9kZX1cblx0XHRcdFx0XHRcdGl0ZW09e2l0ZW19XG5cdFx0XHRcdFx0XHRpZD17dGhpcy5wcm9wcy53b3Jrb3JkZXJ9XG5cblx0XHRcdFx0XHRcdGRvY3R5cGU9XCJDYW5vcHlcIlxuXHRcdFx0XHRcdFx0c2Vhc29uPXt7YWN0aXZlOjF9fVxuXHRcdFx0XHRcdFx0bm90ZT17e1xuXHRcdFx0XHRcdFx0XHRhY3RpdmU6MSxcblx0XHRcdFx0XHRcdFx0dHlwZTpcInRleHRhcmVhXCIgXG5cdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0dHlwZT17e2FjdGl2ZToxfX1cblxuXHRcdFx0XHRcdC8+IFx0XHRcblx0XHRcdFx0KTtcblxuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0UHJ1bmluZzpmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZyhcIk1PREVcIiwgdGhpcy5zdGF0ZS5mb3JtTW9kZSk7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PERvY3R5cGVGb3JtIFxuXHRcdFx0XHRcdFx0Y2xvc2U9e3RoaXMuY2xvc2V9XG5cdFx0XHRcdFx0XHRpdGVtQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxuXHRcdFx0XHRcdFx0Y3JlYXRlPXt0aGlzLmNyZWF0ZX1cblx0XHRcdFx0XHRcdGVkaXQ9e3RoaXMudXBkYXRlfVxuXHRcdFx0XHRcdFx0ZGVsZXRlPXt0aGlzLmRlbGV0ZX1cblx0XHRcdFx0XHRcdG1vZGU9e3RoaXMuc3RhdGUuZm9ybU1vZGV9XG5cdFx0XHRcdFx0XHRpdGVtPXtpdGVtfVxuXHRcdFx0XHRcdFx0aWQ9e3RoaXMucHJvcHMud29ya29yZGVyfVxuXG5cdFx0XHRcdFx0XHRkb2N0eXBlPVwiUHJ1bmluZ1wiXG5cdFx0XHRcdFx0XHRzZWFzb249e3thY3RpdmU6MX19XG5cdFx0XHRcdFx0XHRub3RlPXt7XG5cdFx0XHRcdFx0XHRcdGFjdGl2ZToxLFxuXHRcdFx0XHRcdFx0XHR0eXBlOlwidGV4dGFyZWFcIiBcblx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHR0eXBlPXt7YWN0aXZlOjF9fVxuXHRcdFx0XHRcdFx0Yl9sb2NrPXt7YWN0aXZlOjF9fVxuXHRcdFx0XHRcdFx0cmVtb3ZlZD17e2FjdGl2ZToxfX1cblx0XHRcdFx0XHRcdHByZV9wcnVuZT17e2FjdGl2ZToxfX1cblx0XHRcdFx0XHRcdHRhcF9yZW1vdmVkPXt7YWN0aXZlOjF9fVxuXG5cdFx0XHRcdFx0Lz4gXHRcdFxuXHRcdFx0XHQpO1xuXG5cdFx0XHR9LmJpbmQodGhpcylcblx0XHR9O1xuXHRcdC8vY29uc29sZS5sb2coXCJnZXQgZm9ybSBjYWxsZWRcIik7XG5cdFx0cmV0dXJuIGZvcm1zT2JqW3RoaXMuc3RhdGUuZm9ybVN0YXRlXSh0aGlzLnN0YXRlLmVkaXRJdGVtKTtcbiAgXHR9XG5cdHJlbmRlcigpe1xuXHRcdHZhciBmaWVsZHNTcHJheT1bXHRcdFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImJ1dHRvblwiLFxuXHRcdFx0XHR0eXBlOlwic3VibWl0XCIsXG5cdFx0XHRcdHZhbHVlOlwiQ3JlYXRlIFNwcmF5aW5nIEVudHJ5XCIsXG5cdFx0XHRcdGNsYXNzTmFtZTpcImJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIixcblx0XHRcdFx0b25DbGljazp0aGlzLnN1Ym1pdFxuXHRcdFx0fVxuXHRcdF1cblx0XHR2YXIgdGFza3M9dGhpcy5yZW5kZXJUYXNrcygpO1xuXHRcdHZhciBmb3JtPXRoaXMuZ2V0Rm9ybSgpO1xuXHRcdHZhciBsYWJsZT1cIkNyZWF0ZSBOZXcgVGFza1wiO1xuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPScnPlxuXHRcdFx0e3Rhc2tzfVxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja2JveCByb3cgYWRkYnV0dG9uXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZWRpdFwiPiBcblx0XHRcdFx0XHQ8YnV0dG9uIFxuXHRcdFx0XHRcdFx0dHlwZT1cImJ1dHRvblwiIFxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0IGlubGluZS10YXNrXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMubW9kYWxOZXdUYXNrfVxuXHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tcGx1cyBcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+IEFkZCBUYXNrXG5cdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxNb2RhbCBcblx0XHRcdFx0XHRpZD17dGhpcy5tb2RhbElkfSBcblx0XHRcdFx0XHRzdWJtaXRUZXh0PVwiU3VibWl0XCIgXG5cdFx0XHRcdFx0dGl0bGU9e2xhYmxlfVxuXHRcdFx0XHRcdHN1Ym1pdD17ZmFsc2V9XG5cdFx0XHRcdFx0PlxuXHRcdFx0XHRcdHtmb3JtfVxuXHRcdFx0XHQ8L01vZGFsPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5cbiIsImltcG9ydCBBY29yZGlhbkNvbnRlbnQgZnJvbSAnLi9hY29yZGlhbkNvbnRlbnQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjb3JkaWFuIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWdyb3VwXCIgaWQ9e3RoaXMucHJvcHMuaWR9IHJvbGU9XCJ0YWJsaXN0XCIgYXJpYS1tdWx0aXNlbGVjdGFibGU9XCJ0cnVlXCI+XG5cdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG4vL3tSZWFjdC5jbG9uZUVsZW1lbnQodGhpcy5wcm9wcy5jaGlsZHJlbiwgeyB0b2dnbGVBbGw6IHRoaXMucHJvcHMudG9nZ2xlQWxsIH0pfSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjb3JkaWFuQ29udGVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnJlbmRlckhlYWQgPSB0aGlzLnJlbmRlckhlYWQuYmluZCh0aGlzKTtcblx0XHRjb25zb2xlLmxvZyh0aGlzLnByb3BzLnRvZ2dsZUFsbCk7XG5cdH1cblx0cmVuZGVySGVhZChpZCl7XG5cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWhlYWRpbmdcIiBcblx0XHRcdFx0cm9sZT1cInRhYlwiIFxuXHRcdFx0XHRvbkNsaWNrPXtcblx0XHRcdFx0XHRmdW5jdGlvbigpe1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2codGhpcy5wcm9wcy50b2dnbGVBbGwpO1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2codGhpcy5wcm9wcy50b2dnbGVBbGw9PWZhbHNlKTtcblx0XHRcdFx0XHRcdGlmKHRoaXMucHJvcHMudG9nZ2xlQWxsPT1mYWxzZSl7XG5cdFx0XHRcdFx0XHRcdCQoJyMnK2lkKS5jb2xsYXBzZSgndG9nZ2xlJyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNle1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coaWQpO1xuXHRcdFx0XHRcdFx0XHQkKCcjJyt0aGlzLnByb3BzLnBhcmVudElkKycgLmFjb3JkaWFuLWNvbnRlbnQuaW4nKS5ub3QoJyMnK2lkKS5jb2xsYXBzZSgnaGlkZScpO1xuXHRcdFx0XHRcdFx0XHQkKCcjJytpZCkuY29sbGFwc2UoJ3RvZ2dsZScpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0uYmluZCh0aGlzKVxuXHRcdFx0XHR9XG5cdFx0XHRcdD5cblx0XHRcdFx0PGg0IGNsYXNzTmFtZT1cInBhbmVsLXRpdGxlXCI+XG5cdFx0XHRcdFx0PGEgcm9sZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBkYXRhLXBhcmVudD17JyMnK3RoaXMucHJvcHMucGFyZW50SWR9IGFyaWEtZXhwYW5kZWQ9eyh0aGlzLnByb3BzLmFjdGl2ZSk/IHRydWU6ZmFsc2V9ICA+XG5cdFx0XHQgIFx0XHRcdHt0aGlzLnByb3BzLnRpdGxlfVxuXHRcdFx0XHRcdDwvYT5cblx0XHRcdFx0PC9oND5cblx0XHRcdFx0e3RoaXMucHJvcHMuZXh0cmFIZWFkfVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR2YXIgaWQgPXRoaXMucHJvcHMuaWQ7XG5cdFx0dmFyIGNsYXNzTmFtZT0odGhpcy5wcm9wcy5hY3RpdmUpPyBcImFjb3JkaWFuLWNvbnRlbnQgcGFuZWwtY29sbGFwc2UgY29sbGFwc2UgaW5cIjpcImFjb3JkaWFuLWNvbnRlbnQgcGFuZWwtY29sbGFwc2UgY29sbGFwc2VcIjtcblx0XHRpZih0aGlzLnByb3BzLmNsYXNzTmFtZSl7XG5cdFx0XHRjbGFzc05hbWU9Y2xhc3NOYW1lK1wiIFwiK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdH1cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYW5lbCBwYW5lbC1kZWZhdWx0IGFjb3JkaWFuLXBhbmVsXCI+XG5cdFx0XHRcdHt0aGlzLnJlbmRlckhlYWQoaWQpfVxuXHRcdFx0XHQ8ZGl2IGlkPXtpZH0gXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPXtjbGFzc05hbWV9IFxuXHRcdFx0XHRcdHJvbGU9XCJ0YWJwYW5lbFwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtYm9keVwiPlxuXHRcdFx0XHRcdFx0eyB0aGlzLnByb3BzLmNoaWxkcmVuIH1cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cbiAgXHRcdCk7XG5cdH1cbn1cbiIsImltcG9ydCBGb3JtIGZyb20gJy4uL3V0aWxzL2Zvcm1zJ1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3R5cGVGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuY29tcG9uZW50V2lsbFVwZGF0ZT10aGlzLmNvbXBvbmVudFdpbGxVcGRhdGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmRvY3R5cGVUb29sVXBkYXRlPXRoaXMuZG9jdHlwZVRvb2xVcGRhdGUuYmluZCh0aGlzKTtcblxuXHRcdHRoaXMuc3VibWl0PXRoaXMuc3VibWl0LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5zYXZlPXRoaXMuc2F2ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZGVsZXRlPXRoaXMuZGVsZXRlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5kb2N0eXBlVG9vbCA9IG5ldyBwcy5hcGlUb29sKHtuYW1lOnRoaXMucHJvcHMuZG9jdHlwZX0se2RvY3R5cGU6J0RvY1R5cGUnfSx0aGlzLmRvY3R5cGVUb29sVXBkYXRlLHRoaXMuZm9yY2VVcGRhdGUpO1xuXHRcdHRoaXMuc3RhdGU9e2l0ZW1zOnRoaXMuZG9jdHlwZVRvb2wuaXRlbXN9O1xuXHRcdC8vdGhpcy5kb2N0eXBlVG9vbCA9IG5ldyBwcy5hcGlUb29sKHtuYW1lOnRoaXMucHJvcHMuZG9jdHlwZX0se2RvY3R5cGU6J0RvY1R5cGUnfSx0aGlzLmRvY3R5cGVUb29sVXBkYXRlKTtcblx0fVxuXHRjb21wb25lbnRXaWxsVXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKXtcblx0XHRpZih0aGlzLnByb3BzLmRvY3R5cGUgIT0gbmV4dFByb3BzLmRvY3R5cGUpe1xuXHRcdFx0dGhpcy5kb2N0eXBlVG9vbCA9IG5ldyBwcy5hcGlUb29sKHtuYW1lOm5leHRQcm9wcy5kb2N0eXBlfSx7ZG9jdHlwZTonRG9jVHlwZSd9LHRoaXMuZG9jdHlwZVRvb2xVcGRhdGUsdGhpcy5mb3JjZVVwZGF0ZSk7XG5cdFx0fVxuXHR9XG5cdGRvY3R5cGVUb29sVXBkYXRlKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7aXRlbXM6dGhpcy5kb2N0eXBlVG9vbC5pdGVtc30pXG5cdH1cblx0c3VibWl0KGUpe1xuXHRcdC8vRk9STSBWQUxJREFUSU9OXG5cdFx0Ly9pZih0aGlzLnByb3BzLml0ZW0udmluZXlhcmQ9PVwiXCIgfHx0aGlzLnByb3BzLml0ZW0uc3ByYXlfdHlwZT09XCJcIiB8fCAobW9tZW50KHRoaXMucHJvcHMuaXRlbS5kYXRlLFwiTU0vREQvWVlZWVwiKS5pc1ZhbGlkKCkpIT09dHJ1ZSl7XG5cdFx0Ly9cdGNvbnNvbGUubG9nKFwibm90IHZhbGlkXCIpO1xuXHRcdC8vfWVsc2V7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR0aGlzLnByb3BzLmNyZWF0ZSh0aGlzLnByb3BzLml0ZW0sdGhpcy5wcm9wcy5kb2N0eXBlKTtcblx0XHQvL31cblx0fVxuXHRzYXZlKGUpe1xuXHRcdC8vIGlmKHRoaXMucHJvcHMuaXRlbS52aW5leWFyZD09XCJcIiB8fHRoaXMucHJvcHMuaXRlbS5zcHJheV90eXBlPT1cIlwiIHx8IChtb21lbnQodGhpcy5wcm9wcy5pdGVtLmRhdGUsXCJNTS9ERC9ZWVlZXCIpLmlzVmFsaWQoKSkhPT10cnVlKXtcblx0XHQvLyBcdGNvbnNvbGUubG9nKFwibm90IHZhbGlkXCIpO1xuXHRcdC8vIH1lbHNle1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dGhpcy5wcm9wcy5lZGl0KHRoaXMucHJvcHMuaXRlbSk7XG5cdFx0Ly8gfVxuXHR9XG5cdGRlbGV0ZShlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5wcm9wcy5kZWxldGUodGhpcy5wcm9wcy5pdGVtKTtcblx0fVxuXHRjcmVhdGVGb3JtSnNvbigpe1xuXHRcdHZhciBjcmVhdGVIaWRkZW49KHRoaXMucHJvcHMubW9kZSE9XCJjcmVhdGVcIik/XCIgaGlkZGVuXCI6XCIgbm9wZVwiO1xuXHRcdHZhciBlZGl0SGlkZGVuPSh0aGlzLnByb3BzLm1vZGUhPVwiZWRpdFwiKT9cIiBoaWRkZW5cIjpcIiBub3BlXCI7XG5cdFx0dmFyIGZpZWxkc0pzb249dGhpcy5zdGF0ZS5pdGVtc1swXS5maWVsZHM7XG5cdFx0dmFyIGZpZWxkcz1bXTtcblx0XHR2YXIgZmllbGRPYmplY3Q9e1xuXHRcdFx0TGluazogZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZmllbGQ6XCJhdXRvQ29tcGxldGVcIixcblx0XHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0XHRjb3B5W2l0ZW0uZmllbGRuYW1lXT1lLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdFx0bGFibGU6aXRlbS5sYWJlbCxcblx0XHRcdFx0XHR2YWx1ZTpjb3B5W2l0ZW0uZmllbGRuYW1lXSxcblx0XHRcdFx0XHRkb2N0eXBlOml0ZW0ub3B0aW9ucyxcblx0XHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIlxuXHRcdFx0XHR9XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRDaGVjazogZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZmllbGQ6XCJjaGVja1wiLFxuXHRcdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRcdGNvcHlbaXRlbS5maWVsZG5hbWVdPWUudGFyZ2V0LmNoZWNrZWQ7XG5cdFx0XHRcdFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRcdGxhYmxlOml0ZW0ubGFiZWwsXG5cdFx0XHRcdFx0dmFsdWU6Y29weVtpdGVtLmZpZWxkbmFtZV0sXG5cdFx0XHRcdFx0Y2xhc3NOYW1lOiBcImJpZy1jaGVja2JveFwiXG5cdFx0XHRcdH1cblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdEludDogZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZmllbGQ6XCJpbnB1dFwiLFxuXHRcdFx0XHRcdHR5cGU6XCJudW1iZXJcIixcblx0XHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0XHRjb3B5W2l0ZW0uZmllbGRuYW1lXT1lLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdFx0dmFsdWU6Y29weVtpdGVtLmZpZWxkbmFtZV0sXG5cdFx0XHRcdFx0bGFibGU6aXRlbS5sYWJlbFxuXHRcdFx0XHR9O1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0U2VsZWN0OiBmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0dmFyIG9wdGlvbnM9aXRlbS5vcHRpb25zLnNwbGl0KCBcIlxcblwiICk7XG5cdFx0XHRcdC8vIGlmKGNvcHlbaXRlbS5maWVsZG5hbWVdIT1cIlwiKXtcblx0XHRcdFx0Ly8gXHRjb3B5W2l0ZW0uZmllbGRuYW1lXT1vcHRpb25zWzBdO1xuXHRcdFx0XHQvLyBcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0Ly8gfVxuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGZpZWxkOlwic2VsZWN0XCIsXG5cdFx0XHRcdFx0dHlwZTpcIm51bWJlclwiLFxuXHRcdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRcdGNvcHlbaXRlbS5maWVsZG5hbWVdPWUudGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0XHRsYWJsZTppdGVtLmxhYmVsLFxuXHRcdFx0XHRcdHZhbHVlOmNvcHlbaXRlbS5maWVsZG5hbWVdLFxuXHRcdFx0XHRcdG9wdGlvbnM6b3B0aW9uc1xuXHRcdFx0XHR9O1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0RGF0YTogZnVuY3Rpb24oaXRlbSxwcm9wT3B0aW9ucyl7XG5cdFx0XHRcdGlmKHByb3BPcHRpb25zLnR5cGU9PVwidGV4dGFyZWFcIil7XG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdGZpZWxkOlwidGV4dGFyZWFcIixcblx0XHRcdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRcdFx0Y29weVtpdGVtLmZpZWxkbmFtZV09ZS50YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0XHRcdHZhbHVlOmNvcHlbaXRlbS5maWVsZG5hbWVdLFxuXHRcdFx0XHRcdFx0bGFibGU6aXRlbS5sYWJlbFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0ZmllbGQ6XCJpbnB1dFwiLFxuXHRcdFx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdFx0XHRjb3B5W2l0ZW0uZmllbGRuYW1lXT1lLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHRcdFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRcdFx0dmFsdWU6Y29weVtpdGVtLmZpZWxkbmFtZV0sXG5cdFx0XHRcdFx0XHRsYWJsZTppdGVtLmxhYmVsXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0RGF0ZTogZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZmllbGQ6XCJkYXRlXCIsXG5cdFx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdFx0Y29weVtpdGVtLmZpZWxkbmFtZV09ZS50YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRcdGxhYmxlOml0ZW0ubGFiZWxcblx0XHRcdFx0fVxuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdH1cblxuXHRcdGlmKHRoaXMucHJvcHMuaXRlbT09bnVsbCl7XG5cdFx0XHR2YXIgY29weT17fVxuXHRcdH1lbHNle1xuXHRcdFx0dmFyIGNvcHk9cHMuY2xvbmUodGhpcy5wcm9wcy5pdGVtKTtcblx0XHR9XG5cblx0XHQvL2xvb3AgdGhlIGpzb24gb2JqZWN0XG5cdFx0Ly9wcm9iYWJseSBjaGFuZ2UgdGhpcyB0byB3aWxsTW91bnRcblx0XHRjb25zb2xlLmxvZyhmaWVsZHNKc29uKTtcblxuXHRcdGZvcih2YXIgeCA9IDA7IHggPCBmaWVsZHNKc29uLmxlbmd0aDsgeCsrKXtcblx0XHRcdHZhciBjdXJyZW50RmllbGQ9ZmllbGRzSnNvblt4XTtcblx0XHRcdGNvbnNvbGUubG9nKGN1cnJlbnRGaWVsZC5maWVsZG5hbWUpO1xuXHRcdFx0Ly8gY2hlY2sgaWYgdGhpcyBmaWVsZCB3YXMgZW5hYmxlZFxuXG5cdFx0XHRpZiAodGhpcy5wcm9wc1tjdXJyZW50RmllbGQuZmllbGRuYW1lXSl7XG5cdFx0XHRcdC8vdGhlcmUgaXMgYSBwcm9wcyBmb3IgdGhpcyBmaWVsZFxuXG5cdFx0XHRcdGlmKHRoaXMucHJvcHNbY3VycmVudEZpZWxkLmZpZWxkbmFtZV0uYWN0aXZlID09PSAxKXtcblx0XHRcdFx0XHQvL2FuZCB0aGUgZmllbGQgaXMgc2V0IHRvIGFjdGl2ZVxuXG5cdFx0XHRcdFx0aWYoZmllbGRPYmplY3RbY3VycmVudEZpZWxkLmZpZWxkdHlwZV0pe1xuXHRcdFx0XHRcdFx0Ly9GZWlsZCB0eXBlIGNhbiBiZSBoYW5kbGVkP1xuXHRcdFx0XHRcdFx0Ly9oYW5kbGUgdGhlIGNyZWF0aW9uIG9mIGNvcHkgYW5kIHRoZSBkZWZhdWx0IHZhbHVlc1xuXG5cdFx0XHRcdFx0XHRpZih0aGlzLnByb3BzLm1vZGU9PVwiY3JlYXRlXCIpe1xuXHRcdFx0XHRcdFx0XHRpZihjb3B5W2N1cnJlbnRGaWVsZC5maWVsZG5hbWVdKXtcblx0XHRcdFx0XHRcdFx0XHQvL3RoZSBmaWVsZCBhbHJlYWR5IGV4aXN0c1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGVsc2UgaWYodGhpcy5wcm9wc1tjdXJyZW50RmllbGQuZmllbGRuYW1lXS5kZWZhdWx0KXtcblx0XHRcdFx0XHRcdFx0XHQvL3NldCB0byBkZWZhdWx0IHZhbHVlXG5cdFx0XHRcdFx0XHRcdFx0Y29weVtjdXJyZW50RmllbGQuZmllbGRuYW1lXT10aGlzLnByb3BzW2N1cnJlbnRGaWVsZC5maWVsZG5hbWVdLmRlZmF1bHQ7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHRcdFx0XHRjb3B5W2N1cnJlbnRGaWVsZC5maWVsZG5hbWVdPVwiXCI7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8vY29uc29sZS5sb2coY3VycmVudEZpZWxkLmZpZWxkbmFtZSk7XG5cdFx0XHRcdFx0XHRmaWVsZHMucHVzaChmaWVsZE9iamVjdFtjdXJyZW50RmllbGQuZmllbGR0eXBlXShjdXJyZW50RmllbGQsdGhpcy5wcm9wc1tjdXJyZW50RmllbGQuZmllbGRuYW1lXSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRpZighKFwiZG9jdHlwZVwiIGluIGNvcHkpKXtcblx0XHRcdGNvcHkuZG9jdHlwZT10aGlzLnByb3BzLmRvY3R5cGU7XG5cdFx0fVxuXHRcdC8vYWRkaW5nIGJ1dHRvbiBmZWlsZHNcblx0XHRpZih0aGlzLnByb3BzLmNsb3NlKXtcblx0XHRcdGZpZWxkcy5wdXNoKHtcblx0XHRcdFx0ZmllbGQ6XCJidXR0b25cIixcblx0XHRcdFx0dHlwZTpcInN1Ym1pdFwiLFxuXHRcdFx0XHR2YWx1ZTpcIkNyZWF0ZSBcIiArIHRoaXMucHJvcHMuZG9jdHlwZSArIFwiIEVudHJ5XCIsXG5cdFx0XHRcdGNsYXNzTmFtZTpcImJ0bi1wcmltYXJ5IHB1bGwtcmlnaHQgXCIgKyBjcmVhdGVIaWRkZW4sXG5cdFx0XHRcdG9uQ2xpY2s6dGhpcy5zdWJtaXRcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRpZih0aGlzLnByb3BzLmNyZWF0ZSl7XG5cdFx0XHRmaWVsZHMucHVzaCh7XG5cdFx0XHRcdFx0ZmllbGQ6XCJidXR0b25cIixcblx0XHRcdFx0XHR2YWx1ZTpcIkNsb3NlXCIsXG5cdFx0XHRcdFx0Y2xhc3NOYW1lOlwicHVsbC1yaWdodCBcIisgZWRpdEhpZGRlbixcblx0XHRcdFx0XHRvbkNsaWNrOmZ1bmN0aW9uKGUpeyBlLnByZXZlbnREZWZhdWx0KCk7dGhpcy5wcm9wcy5jbG9zZSgpO30uYmluZCh0aGlzKVxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGlmKHRoaXMucHJvcHMuZGVsZXRlKXtcblx0XHRcdGZpZWxkcy5wdXNoKHtcblx0XHRcdFx0XHRmaWVsZDpcImJ1dHRvblwiLFxuXHRcdFx0XHRcdHR5cGU6XCJzdWJtaXRcIixcblx0XHRcdFx0XHR2YWx1ZTpcIkRlbGV0ZVwiLFxuXHRcdFx0XHRcdGNsYXNzTmFtZTpcImJ0bi1kYW5nZXIgcHVsbC1yaWdodCBcIisgZWRpdEhpZGRlbixcblx0XHRcdFx0XHRvbkNsaWNrOnRoaXMuZGVsZXRlXG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZmllbGRzLnB1c2goXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiYnV0dG9uXCIsXG5cdFx0XHRcdHR5cGU6XCJzdWJtaXRcIixcblx0XHRcdFx0dmFsdWU6XCJTYXZlXCIsXG5cdFx0XHRcdGNsYXNzTmFtZTpcImJ0bi1zdWNjZXNzIHB1bGwtcmlnaHQgXCIrIGVkaXRIaWRkZW4sXG5cdFx0XHRcdG9uQ2xpY2s6dGhpcy5zYXZlXG5cdFx0XHR9KTtcblx0XHRyZXR1cm4gZmllbGRzO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdGNvbnNvbGUubG9nKFwicmVuZGVyIGFyZWFcIik7XG5cdFx0dmFyIG91dHB1dD17fTtcblx0XHRpZih0aGlzLnN0YXRlLml0ZW1zIT09bnVsbCl7XG5cdFx0XHR2YXIgZmllbGRzPXRoaXMuY3JlYXRlRm9ybUpzb24oKTtcblx0XHRcdGNvbnNvbGUubG9nKGZpZWxkcyk7XG5cdFx0XHR2YXIgb3V0cHV0ID0gKFxuXHRcdFx0XHQ8Rm9ybVxuXHRcdFx0XHRcdGlkPXt0aGlzLnByb3BzLmlkfVxuXHRcdFx0XHRcdHR5cGU9XCJob3Jpem9udGFsXCJcblx0XHRcdFx0XHRmaWVsZHM9e2ZpZWxkc31cblx0XHRcdFx0Lz4pO1xuXHRcdH1lbHNle1xuXHRcdFx0b3V0cHV0ID0gKDxkaXY+IExvYWRpbmcuLi4gPC9kaXY+KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj57XCJIT1JFXCJ9XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCIvKiBmb3JtcyAqL1xuLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5cblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5zdWJtaXQ9dGhpcy5zdWJtaXQuYmluZCh0aGlzKTtcblx0fVxuXHRzdWJtaXQoZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMucHJvcHMuc3VibWl0KGUpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHZhciBmb3JtPVtdO1xuXHRcdHZhciBmb3JtVHlwZXM9e1xuXHRcdFx0c2VsZWN0XHQ6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHR2YXIgb3B0aW5hbD1bXCJ2YWx1ZVwiLFwibGFibGVcIixcIm9wdGlvbnNcIixcImNsYXNzTmFtZVwiLFwicmVhZG9ubHlcIixcImRpc2FibGVkXCIsXCJyZXF1aXJlXCJdO1xuXHRcdFx0XHR2YXIgcHJvcHM9cHMuaW5pdFByb3BzKG9wdGluYWwsaXRlbSk7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PFNlbGVjdFxuXHRcdFx0XHRcdFx0a2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fVxuXHRcdFx0XHRcdFx0dmFsdWU9e3Byb3BzLnZhbHVlfVxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXtwcm9wcy5jbGFzc05hbWV9XG5cdFx0XHRcdFx0XHRsYWJsZT17cHJvcHMubGFibGV9XG5cdFx0XHRcdFx0XHRvcHRpb25zPXtwcm9wcy5vcHRpb25zfVxuXHRcdFx0XHRcdFx0cmVhZG9ubHk9e3Byb3BzLnJlYWRvbmx5fVxuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ9e3Byb3BzLmRpc2FibGVkfVxuXHRcdFx0XHRcdFx0cmVxdWlyZWQ9e3Byb3BzLnJlcXVpcmVkfVxuXHRcdFx0XHRcdFx0aW5wdXRDaGFuZ2VkPXtmdW5jdGlvbihlKXtpdGVtLm9uQ2hhbmdlKGUpO319XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGNoZWNrIDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciBwcm9wcz1bXCJ2YWx1ZVwiLFwibGFibGVcIixcImNsYXNzTmFtZVwiLFwicmVhZG9ubHlcIixcImRpc2FibGVkXCIsXCJyZXF1aXJlXCIsXCJ2YWx1ZVwiXTtcblx0XHRcdFx0cHJvcHM9cHMuaW5pdFByb3BzKHByb3BzLGl0ZW0pO1xuXG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PENoZWNrXG5cdFx0XHRcdFx0XHRrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9XG5cdFx0XHRcdFx0XHR2YWx1ZT17cHJvcHMudmFsdWV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e3Byb3BzLmNsYXNzTmFtZX1cblx0XHRcdFx0XHRcdGxhYmxlPXtwcm9wcy5sYWJsZX1cblx0XHRcdFx0XHRcdHJlYWRPbmx5PXtwcm9wcy5yZWFkb25seX1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXtwcm9wcy5kaXNhYmxlZH1cblx0XHRcdFx0XHRcdHJlcXVpcmVkPXtwcm9wcy5yZXF1aXJlZH1cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKTt9fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cblx0XHRcdHRleHRhcmVhIDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciBwcm9wcz1bXCJ2YWx1ZVwiLFwibGFibGVcIixcImNsYXNzTmFtZVwiLFwicmVhZG9ubHlcIixcImRpc2FibGVkXCIsXCJyZXF1aXJlXCIsXCJ2YWx1ZVwiLFwicm93c1wiXTtcblx0XHRcdFx0cHJvcHM9cHMuaW5pdFByb3BzKHByb3BzLGl0ZW0pO1xuXG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PFRleHRhcmVhXG5cdFx0XHRcdFx0XHRrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9XG5cdFx0XHRcdFx0XHR2YWx1ZT17cHJvcHMudmFsdWV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e3Byb3BzLmNsYXNzTmFtZX1cblx0XHRcdFx0XHRcdGxhYmxlPXtwcm9wcy5sYWJsZX1cblx0XHRcdFx0XHRcdHJlYWRPbmx5PXtwcm9wcy5yZWFkb25seX1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXtwcm9wcy5kaXNhYmxlZH1cblx0XHRcdFx0XHRcdHJlcXVpcmVkPXtwcm9wcy5yZXF1aXJlZH1cblx0XHRcdFx0XHRcdHJvd3M9e3Byb3BzLnJvd3N9XG5cdFx0XHRcdFx0XHRpbnB1dENoYW5nZWQ9e2Z1bmN0aW9uKGUpe2l0ZW0ub25DaGFuZ2UoZSk7fX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0aW5wdXQgXHQ6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHR2YXIgcHJvcHM9W1widHlwZVwiLFwidmFsdWVcIixcInBsYWNlaG9sZGVyXCIsXCJsYWJsZVwiLFwiY2xhc3NOYW1lXCIsXCJyZWFkb25seVwiLFwiZGlzYWJsZWRcIixcInJlcXVpcmVkXCIsXCJlcnJvclwiXTtcblx0XHRcdFx0cHJvcHM9cHMuaW5pdFByb3BzKHByb3BzLGl0ZW0pO1xuXHRcdFx0XHRpZihwcm9wcy50eXBlPT1cIlwiKXtcblx0XHRcdFx0XHRwcm9wcy50eXBlPVwidGV4dFwiO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8SW5wdXRcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH1cblx0XHRcdFx0XHRcdHR5cGU9e3Byb3BzLnR5cGV9XG5cdFx0XHRcdFx0XHR2YWx1ZT17cHJvcHMudmFsdWV9XG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj17cHJvcHMucGxhY2Vob2xkZXJ9XG5cdFx0XHRcdFx0XHRsYWJsZT17cHJvcHMubGFibGV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e3Byb3BzLmNsYXNzTmFtZX1cblx0XHRcdFx0XHRcdHJlYWRvbmx5PXtwcm9wcy5yZWFkb25seX1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXtwcm9wcy5kaXNhYmxlZH1cblx0XHRcdFx0XHRcdHJlcXVpcmVkPXtwcm9wcy5yZXF1aXJlZH1cblx0XHRcdFx0XHRcdGVycm9yPXtwcm9wcy5lcnJvcn1cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKX19XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGxhYmxlIFx0OiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0cmV0dXJuIChcbiAgICBcdFx0XHRcdDxsYWJlbCBrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9ID57aXRlbS5sYWJsZX08L2xhYmVsPlxuXG4gICAgXHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdHJhZGlvXHQ6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHRyZXR1cm4gKDxkaXY+PC9kaXY+KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGhlYWRlcjogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHJldHVybig8aDMga2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fSA+e2l0ZW0ubGFibGV9PC9oMz4pXG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRkYXRlOiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0dmFyIHZhbHVlID0gKGl0ZW0udmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnZhbHVlO1xuXHRcdFx0XHR2YXIgbGFibGUgPSAoaXRlbS5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ubGFibGU7XG5cdFx0XHRcdHZhciBwbGFjZWhvbGRlciA9IChpdGVtLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5wbGFjZWhvbGRlcjtcblx0XHRcdFx0dmFyIGNsYXNzTmFtZSA9IChpdGVtLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uY2xhc3NOYW1lO1xuXHRcdFx0XHR2YXIgcmVhZG9ubHkgPSAoaXRlbS5yZWFkb25seSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucmVhZG9ubHk7XG5cdFx0XHRcdHZhciBkaXNhYmxlZCA9IChpdGVtLmRpc2FibGVkID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5kaXNhYmxlZDtcblx0XHRcdFx0dmFyIHJlcXVpcmVkID0gKGl0ZW0ucmVxdWlyZWQgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnJlcXVpcmVkO1xuXHRcdFx0XHRyZXR1cm4oXG5cdFx0XHRcdFx0PERhdGVJbnB1dFxuXHRcdFx0XHRcdFx0a2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fVxuXHRcdFx0XHRcdFx0dmFsdWU9e3ZhbHVlfVxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuXHRcdFx0XHRcdFx0bGFibGU9e2xhYmxlfVxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXtjbGFzc05hbWV9XG5cdFx0XHRcdFx0XHRpbnB1dENoYW5nZWQ9e2Z1bmN0aW9uKGUpe2l0ZW0ub25DaGFuZ2UoZSl9fVxuXHRcdFx0XHRcdFx0cmVhZG9ubHk9e3JlYWRvbmx5fVxuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ9e2Rpc2FibGVkfVxuXHRcdFx0XHRcdFx0cmVxdWlyZWQ9e3JlcXVpcmVkfVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRhdXRvQ29tcGxldGU6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHR2YXIgdmFsdWUgPSAoaXRlbS52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0udmFsdWU7XG5cdFx0XHRcdHZhciBsYWJsZSA9IChpdGVtLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5sYWJsZTtcblx0XHRcdFx0dmFyIHBsYWNlaG9sZGVyID0gKGl0ZW0ucGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnBsYWNlaG9sZGVyO1xuXHRcdFx0XHR2YXIgY2xhc3NOYW1lID0gKGl0ZW0uY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5jbGFzc05hbWU7XG5cdFx0XHRcdHZhciByZWFkb25seSA9IChpdGVtLnJlYWRvbmx5ID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5yZWFkb25seTtcblx0XHRcdFx0dmFyIGRpc2FibGVkID0gKGl0ZW0uZGlzYWJsZWQgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmRpc2FibGVkO1xuXHRcdFx0XHR2YXIgcmVxdWlyZWQgPSAoaXRlbS5yZXF1aXJlZCA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucmVxdWlyZWQ7XG5cblx0XHRcdFx0cmV0dXJuKFxuXHRcdFx0XHRcdDxBd2Vzb21wbGV0ZUlucHV0XG5cdFx0XHRcdFx0XHRrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9XG5cdFx0XHRcdFx0XHRkb2N0eXBlPXtpdGVtLmRvY3R5cGV9XG5cdFx0XHRcdFx0XHRkb2N2YWx1ZT17aXRlbS5kb2N2YWx1ZX1cblx0XHRcdFx0XHRcdGRvY2xhYmxlPXtpdGVtLmRvY2xhYmxlfVxuXHRcdFx0XHRcdFx0dmFsdWU9e3ZhbHVlfVxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuXHRcdFx0XHRcdFx0bGFibGU9e2xhYmxlfVxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXtjbGFzc05hbWV9XG5cdFx0XHRcdFx0XHRyZWFkb25seT17cmVhZG9ubHl9XG5cdFx0XHRcdFx0XHRkaXNhYmxlZD17ZGlzYWJsZWR9XG5cdFx0XHRcdFx0XHRyZXF1aXJlZD17cmVxdWlyZWR9XG5cdFx0XHRcdFx0XHRpbnB1dENoYW5nZWQ9e2Z1bmN0aW9uKGUpe2l0ZW0ub25DaGFuZ2UoZSl9fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRidXR0b246IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHR2YXIgb3B0aW5hbD1bXCJ2YWx1ZVwiLFwiY2xhc3NOYW1lXCIsXCJkaXNhYmxlZFwiLFwiaWNvblwiXTtcblx0XHRcdFx0dmFyIHByb3BzPXBzLmluaXRQcm9wcyhvcHRpbmFsLGl0ZW0pO1xuXHRcdFx0XHRyZXR1cm4oXG5cdFx0XHRcdFx0PEJ1dHRvblxuXHRcdFx0XHRcdFx0a2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fVxuXHRcdFx0XHRcdFx0dmFsdWU9e3Byb3BzLnZhbHVlfVxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXtwcm9wcy5jbGFzc05hbWV9XG5cdFx0XHRcdFx0XHRkaXNhYmxlZD17cHJvcHMuZGlzYWJsZWR9XG5cdFx0XHRcdFx0XHRpY29uPXtwcm9wcy5pY29ufVxuXHRcdFx0XHRcdFx0b25DbGljaz17ZnVuY3Rpb24oZSl7aXRlbS5vbkNsaWNrKGUpfX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpXG5cdFx0fVxuXHRcdHRoaXMucHJvcHMuZmllbGRzLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCl7XG5cdFx0XHRpZigkLmlzRW1wdHlPYmplY3QoaXRlbSkpe1xuXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0aWYodGhpcy5wcm9wcy50eXBlPT1cImlubGluZVwiKXtcblx0XHRcdFx0XHR2YXIgcm93Q2xhc3M9MTIvdGhpcy5wcm9wcy5yb3dzO1xuXHRcdFx0XHRcdHJvd0NsYXNzPVwiY29sLXhzLVwiK3Jvd0NsYXNzO1xuXHRcdFx0XHRcdGZvcm0ucHVzaCg8ZGl2IGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH0gY2xhc3NOYW1lPXtyb3dDbGFzc30+e2Zvcm1UeXBlc1tpdGVtLmZpZWxkXShpdGVtLGluZGV4KX08L2Rpdj4pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2V7Zm9ybS5wdXNoKDxkaXYga2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fSBjbGFzc05hbWU9e3Jvd0NsYXNzfT57Zm9ybVR5cGVzW2l0ZW0uZmllbGRdKGl0ZW0saW5kZXgpfTwvZGl2Pik7fVxuXHRcdFx0fVxuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0Ly9mb3IodmFyIHg9MDsgeCA8IHRoaXMucHJvcHMuZmVpbGRzLmxlbmd0aCB4Kys7IClcblx0XHR2YXIgY2xhc3NOYW1lID0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJyZWFjdC1mb3JtXCI6IFwicmVhY3QtZm9ybSBcIit0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8Zm9ybSBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG5cdFx0XHRcdDxmaWVsZHNldD5cblx0XHRcdFx0e3RoaXMucHJvcHMuYmVmb3JlfVxuXHRcdFx0XHR7Zm9ybX1cblx0XHRcdFx0eyB0aGlzLnByb3BzLmNoaWxkcmVufVxuXHRcdFx0XHQ8L2ZpZWxkc2V0PlxuXHRcdFx0PC9mb3JtPlxuXHRcdCk7XG5cdH1cbn1cblxuXG5cbmV4cG9ydCBjbGFzcyBTZWxlY3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5pbnB1dENoYW5nZT10aGlzLmlucHV0Q2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblxuXHR9XG5cdGlucHV0Q2hhbmdlKGUpe1xuXHRcdHRoaXMucHJvcHMuaW5wdXRDaGFuZ2VkKCk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLmxhYmxlID0gKHRoaXMucHJvcHMubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLmxhYmxlO1xuXHRcdHRoaXMub3B0aW9ucyA9ICh0aGlzLnByb3BzLm9wdGlvbnMgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLm9wdGlvbnM7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jb250cm9sXCI6IFwiZm9ybS1jb250cm9sXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlcXVpcmVkID0gKHRoaXMucHJvcHMucmVxdWlyZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZXF1aXJlZD09ZmFsc2V8fHRoaXMucHJvcHMucmVxdWlyZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZWFkb25seSA9ICh0aGlzLnByb3BzLnJlYWRvbmx5ID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVhZG9ubHk9PWZhbHNlfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHZhciBvcHRpb25zPVtdO1xuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblxuXG5cdFx0dGhpcy5vcHRpb25zLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCl7XG5cdFx0XHR2YXIgZ3JvdXA9W107XG5cdFx0XHRpZihpdGVtLmdyb3VwICE9PSB1bmRlZmluZWQpe1xuXHRcdFx0XHRpdGVtLm9wdGlvbnMubWFwKGZ1bmN0aW9uKGlubmVySXRlbSxpbmRleCl7XG5cdFx0XHRcdFx0Z3JvdXAucHVzaCggPG9wdGlvbiBrZXk9e2l0ZW0uZ3JvdXAraW5kZXh9IHZhbHVlPXtpbm5lckl0ZW19PiB7aW5uZXJJdGVtfSA8L29wdGlvbj4pXG5cdFx0XHRcdH0pXG5cdFx0XHRcdG9wdGlvbnMucHVzaCg8b3B0Z3JvdXAga2V5PXtpdGVtLmdyb3VwfSBsYWJlbD17aXRlbS5ncm91cH0+IHtncm91cH08L29wdGdyb3VwPik7XG5cblx0XHRcdH1cblx0XHRcdGVsc2V7XG5cdFx0XHRcdG9wdGlvbnMucHVzaCggPG9wdGlvbiBrZXk9e2luZGV4fSB2YWx1ZT17aXRlbX0+IHtpdGVtfSA8L29wdGlvbj4pXG5cdFx0XHR9XG5cblxuXHRcdH0uYmluZCh0aGlzKSk7XG5cblx0XHR2YXIgc2VsZWN0PShcblx0XHRcdDxzZWxlY3Rcblx0XHRcdFx0Y2xhc3NOYW1lPXt0aGlzLmNsYXNzTmFtZX1cblx0XHRcdFx0dmFsdWU9e3RoaXMudmFsdWV9XG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnByb3BzLmlucHV0Q2hhbmdlZH1cblx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdCAgICAgICAgICBcdHJlYWRPbmx5PXt0aGlzLnJlYWRvbmx5fVxuXHQgICAgICAgICAgXHRyZXF1aXJlZD17dGhpcy5yZXF1aXJlZH1cblx0XHRcdFx0PlxuXHRcdFx0XHR7b3B0aW9uc31cblx0XHRcdDwvc2VsZWN0PlxuXHRcdCk7XG5cblx0XHR2YXIgbGFibGU9XCJcIjtcblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMucHJvcHMubGFibGUgIT09IFwiXCIpe1xuXHRcdFx0bGFibGU9KDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD4pO1xuXHRcdH1cblx0XHRvdXRwdXQgPSAoPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+e2xhYmxlfXtzZWxlY3R9PC9kaXY+KTtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5pbnB1dENoYW5nZT10aGlzLmlucHV0Q2hhbmdlLmJpbmQodGhpcyk7XG5cblx0fVxuXHRpbnB1dENoYW5nZShlKXtcblx0XHR0aGlzLnByb3BzLmlucHV0Q2hhbmdlZChlKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnR5cGUgPSAodGhpcy5wcm9wcy50eXBlID09PSB1bmRlZmluZWQpID8gXCJ0ZXh0XCI6IHRoaXMucHJvcHMudHlwZTtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMucGxhY2Vob2xkZXIgPSAodGhpcy5wcm9wcy5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXI7XG5cdFx0dGhpcy5sYWJsZSA9ICh0aGlzLnByb3BzLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5sYWJsZTtcblx0XHR2YXIgb3V0cHV0PVwiXCI7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jb250cm9sXCI6IFwiZm9ybS1jb250cm9sIFwiICt0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHR0aGlzLmRpc2FibGVkID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5kaXNhYmxlZD09ZmFsc2V8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZXF1aXJlZCA9ICh0aGlzLnByb3BzLnJlcXVpcmVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVxdWlyZWQ9PWZhbHNlfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVhZG9ubHkgPSAodGhpcy5wcm9wcy5yZWFkb25seSA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1mYWxzZXx8dGhpcy5wcm9wcy5yZWFkb25seT09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblxuXHRcdHZhciBpbnB1dD0oXG5cdFx0XHQ8aW5wdXRcblx0XHRcdFx0dHlwZT17dGhpcy50eXBlfVxuXHRcdFx0XHRjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfVxuXHRcdFx0XHRwbGFjZWhvbGRlcj17dGhpcy5wbGFjZWhvbGRlcn1cblx0XHRcdFx0dmFsdWU9e3RoaXMudmFsdWV9XG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnByb3BzLmlucHV0Q2hhbmdlZH1cblx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdCAgICAgICAgICBcdHJlYWRPbmx5PXt0aGlzLnJlYWRvbmx5fVxuXHQgICAgICAgICAgXHRyZXF1aXJlZD17dGhpcy5yZXF1aXJlZH1cblx0XHRcdC8+XG5cdFx0KTtcblx0XHR2YXIgd3JhcHBlckNsYXNzPVwiZm9ybS1ncm91cFwiO1xuXHRcdGlmKHRoaXMucHJvcHMuZXJyb3Ipe1xuXHRcdFx0XHR3cmFwcGVyQ2xhc3MrPSBcIiBcIitcImhhcy1lcnJvclwiO1xuXHRcdH1cblx0XHR2YXIgbGFibGU9XCJcIjtcblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMucHJvcHMubGFibGUgIT09IFwiXCIpe1xuXHRcdFx0bGFibGU9KDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD4pO1xuXHRcdH1cblx0XHRvdXRwdXQgPSAoPGRpdiBjbGFzc05hbWU9e3dyYXBwZXJDbGFzc30+e2xhYmxlfXtpbnB1dH08L2Rpdj4pO1xuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBDaGVjayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLmlucHV0Q2hhbmdlPXRoaXMuaW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcblxuXG5cdH1cblx0aW5wdXRDaGFuZ2UoZSl7XG5cblx0XHR0aGlzLnByb3BzLmlucHV0Q2hhbmdlZChlKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyAwIDogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLnBsYWNlaG9sZGVyID0gKHRoaXMucHJvcHMucGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnBsYWNlaG9sZGVyO1xuXHRcdHRoaXMubGFibGUgPSAodGhpcy5wcm9wcy5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMubGFibGU7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jaGVjay1pbnB1dFwiOiBcImZvcm0tY2hlY2staW5wdXQgXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlcXVpcmVkID0gKHRoaXMucHJvcHMucmVxdWlyZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZXF1aXJlZD09ZmFsc2V8fHRoaXMucHJvcHMucmVxdWlyZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZWFkb25seSA9ICh0aGlzLnByb3BzLnJlYWRvbmx5ID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVhZG9ubHk9PWZhbHNlfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXG5cdFx0dmFyIG91dHB1dD1cIlwiO1xuXHRcdHZhciBpbnB1dD0oXG5cdFx0XHQ8aW5wdXRcblx0XHRcdFx0dHlwZT1cImNoZWNrYm94XCJcblx0XHRcdFx0Y2xhc3NOYW1lPXt0aGlzLmNsYXNzTmFtZX1cblx0XHRcdFx0Y2hlY2tlZD17dGhpcy52YWx1ZX1cblxuXHRcdFx0XHRvbkNoYW5nZT17dGhpcy5wcm9wcy5pbnB1dENoYW5nZWR9XG5cdFx0XHRcdGRpc2FibGVkPXt0aGlzLmRpc2FibGVkfVxuXHQgICAgICAgICAgXHRyZWFkT25seT17dGhpcy5yZWFkb25seX1cblx0ICAgICAgICAgIFx0cmVxdWlyZWQ9e3RoaXMucmVxdWlyZWR9XG5cdFx0XHQvPlxuXHRcdCk7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkIHx8IHRoaXMucHJvcHMubGFibGUgPT1cIlwiKXtcblx0XHRcdG91dHB1dCA9IChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdCAgICBcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWxcIj5cblx0XHQgICAgICBcdFx0XHR7aW5wdXR9e3RoaXMucHJvcHMubGFibGV9XG5cdFx0ICAgICAgXHRcdDwvbGFiZWw+XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHQgICAgICBcdFx0e2lucHV0fVxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuZXhwb3J0IGNsYXNzIFRleHRhcmVhIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuaW5wdXRDaGFuZ2U9dGhpcy5pbnB1dENoYW5nZS5iaW5kKHRoaXMpO1xuXG5cdH1cblx0aW5wdXRDaGFuZ2UoZSl7XG5cdFx0dGhpcy5wcm9wcy5pbnB1dENoYW5nZWQoZSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gMCA6IHRoaXMucHJvcHMudmFsdWU7XG5cdFx0dGhpcy5wbGFjZWhvbGRlciA9ICh0aGlzLnByb3BzLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5wbGFjZWhvbGRlcjtcblx0XHR0aGlzLmxhYmxlID0gKHRoaXMucHJvcHMubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLmxhYmxlO1xuXHRcdHRoaXMuY2xhc3NOYW1lPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcImZvcm0tY29udHJvbFwiOiBcImZvcm0tY29udHJvbCBcIiArdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0dGhpcy5kaXNhYmxlZCA9ICh0aGlzLnByb3BzLmRpc2FibGVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PWZhbHNlfHx0aGlzLnByb3BzLmRpc2FibGVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVxdWlyZWQgPSAodGhpcy5wcm9wcy5yZXF1aXJlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1mYWxzZXx8dGhpcy5wcm9wcy5yZXF1aXJlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlYWRvbmx5ID0gKHRoaXMucHJvcHMucmVhZG9ubHkgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZWFkb25seT09ZmFsc2V8fHRoaXMucHJvcHMucmVhZG9ubHk9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yb3dzID0gKHRoaXMucHJvcHMucm93cyA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJvd3M9PVwiXCIpID8gMzogdGhpcy5wcm9wcy5yb3dzO1xuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblx0XHR2YXIgaW5wdXQ9KFxuXHRcdFx0PHRleHRhcmVhXG5cdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9XG5cdFx0XHRcdHZhbHVlPXt0aGlzLnZhbHVlfVxuXHRcdFx0XHRvbkNoYW5nZT17dGhpcy5wcm9wcy5pbnB1dENoYW5nZWR9XG5cdFx0XHRcdHJvd3M9e3RoaXMucm93c31cblx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdCAgICAgICAgICBcdHJlYWRPbmx5PXt0aGlzLnJlYWRvbmx5fVxuXHQgICAgICAgICAgXHRyZXF1aXJlZD17dGhpcy5yZXF1aXJlZH1cblx0XHRcdC8+XG5cdFx0KTtcblx0XHR2YXIgbGFibGU9XCJcIjtcblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMucHJvcHMubGFibGUgIT09IFwiXCIpe1xuXHRcdFx0bGFibGU9KDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD4pO1xuXHRcdH1cblx0XHRvdXRwdXQgPSAoPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+e2xhYmxlfXtpbnB1dH08L2Rpdj4pO1xuXHRcdHJldHVybihcblx0XHRcdDxkaXY+e291dHB1dH08L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5leHBvcnQgY2xhc3MgRGF0ZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuZGF0ZUluaXQ9dGhpcy5kYXRlSW5pdC5iaW5kKHRoaXMpO1xuXHR9XG5cdGRhdGVJbml0KCl7XG5cdFx0JCgnLmlucHV0LWdyb3VwLmRhdGUgLmRhdGVwaWNrJykuZGF0ZXBpY2tlcih7XG5cdFx0ICAgIHRvZGF5QnRuOiBcImxpbmtlZFwiLFxuXHRcdCAgICBvcmllbnRhdGlvbjogXCJib3R0b20gcmlnaHRcIixcblx0XHQgICAgYXV0b2Nsb3NlOiB0cnVlLFxuXHRcdCAgICB0b2RheUhpZ2hsaWdodDogdHJ1ZVxuXHRcdH0pLm9uKCdjaGFuZ2VEYXRlJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0dmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdpbnB1dCcsIHsgYnViYmxlczogdHJ1ZSB9KTtcblx0XHRcdGUudGFyZ2V0LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHRoaXMudmFsdWUgPSAodGhpcy5wcm9wcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMudmFsdWU7XG5cdFx0dGhpcy5wbGFjZWhvbGRlciA9ICh0aGlzLnByb3BzLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5wbGFjZWhvbGRlcjtcblx0XHR0aGlzLmxhYmxlID0gKHRoaXMucHJvcHMubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLmxhYmxlO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlcXVpcmVkID0gKHRoaXMucHJvcHMucmVxdWlyZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZXF1aXJlZD09ZmFsc2V8fHRoaXMucHJvcHMucmVxdWlyZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZWFkb25seSA9ICh0aGlzLnByb3BzLnJlYWRvbmx5ID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVhZG9ubHk9PWZhbHNlfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXG5cblx0XHR2YXIgb3V0cHV0PVwiXCI7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jb250cm9sIGRhdGVwaWNrXCI6IFwiZm9ybS1jb250cm9sIGRhdGVwaWNrIFwiICt0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHR2YXIgaW5wdXQ9KFxuXHRcdFx0PGlucHV0XG5cdFx0XHRcdHJlZj17dGhpcy5kYXRlSW5pdH1cblx0XHRcdFx0dHlwZT1cInRleHRcIlxuXHRcdFx0XHRjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfVxuXHRcdFx0XHRwbGFjZWhvbGRlcj17dGhpcy5wbGFjZWhvbGRlcn1cblx0XHRcdFx0dmFsdWU9e3RoaXMudmFsdWV9XG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnByb3BzLmlucHV0Q2hhbmdlZH1cblx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdCAgICAgICAgICBcdHJlYWRPbmx5PXt0aGlzLnJlYWRvbmx5fVxuXHQgICAgICAgICAgXHRyZXF1aXJlZD17dGhpcy5yZXF1aXJlZH1cblx0XHRcdFx0Lz5cblxuXHRcdCk7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkIHx8IHRoaXMucHJvcHMubGFibGUgPT1cIlwiKXtcblx0XHRcdG91dHB1dCA9IChcblx0XHQgIFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHQgIFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAgZGF0ZVwiPlxuXHRcdFx0XHRcdFx0e2lucHV0fVxuXHRcdFx0XHQgIFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cC1hZGRvblwiPlxuXHRcdFx0XHQgIFx0XHRcdDxpIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tdGhcIj48L2k+XG5cdFx0XHRcdCAgXHRcdDwvc3Bhbj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwIGRhdGVcIj5cblxuXHRcdFx0XHRcdFx0e2lucHV0fVxuXHRcdFx0XHQgIFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cC1hZGRvblwiPlxuXHRcdFx0XHQgIFx0XHRcdDxpIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tdGhcIj48L2k+XG5cdFx0XHRcdCAgXHRcdDwvc3Bhbj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuZXhwb3J0IGNsYXNzIEF3ZXNvbXBsZXRlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cblx0XHQvKiAgIERvIHRoZSBiaW5kIHRoaW5nICAqL1xuXHRcdHRoaXMuY3JlYXRlTGlzdD10aGlzLmNyZWF0ZUxpc3QuYmluZCh0aGlzKTtcblx0XHR0aGlzLmRvY0NoYW5nZWQ9dGhpcy5kb2NDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jb21wb25lbnREaWRNb3VudD10aGlzLmNvbXBvbmVudERpZE1vdW50LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5pbnB1dENoYW5nZT10aGlzLmlucHV0Q2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5hdXRvY29tcGxldGU9dGhpcy5hdXRvY29tcGxldGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmNvbXBvbmVudFdpbGxVbm1vdW50PXRoaXMuY29tcG9uZW50V2lsbFVubW91bnQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnJlZkNhbGw9dGhpcy5yZWZDYWxsLmJpbmQodGhpcyk7XG5cblx0XHQvL3RoaXMud29ya29yZGVyT2JqPXRoaXMub25TdGF0dXNDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0LyogICAgICAgICAgZW5kICAgICAgICAgICovXG5cdFx0dGhpcy5pdGVtbGlzdD1bXTtcblx0XHR0aGlzLnN0YXRlPXtpdGVtbGlzdDpbXX07XG5cdFx0dGhpcy5faXNNb3VudGVkPWZhbHNlO1xuXHRcdHZhciBhcmdzPXt9O1xuXHRcdHZhciBvcHRpb25zPXtkb2N0eXBlOnRoaXMucHJvcHMuZG9jdHlwZX07XG5cdFx0dmFyIGZpbHRlcj17fTtcblx0XHRpZiAodGhpcy5wcm9wcy5maWx0ZXI9PXVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLmZpbHRlcj09bnVsbCl7XG5cblx0XHR9ZWxzZXtcblx0XHRcdGZpbHRlcj0gdGhpcy5wcm9wcy5maWx0ZXI7XG5cdFx0fVxuXHRcdHRoaXMubGlzdFRvb2wgPSBuZXcgcHMuYXBpVG9vbChmaWx0ZXIsIG9wdGlvbnMgLHRoaXMuZG9jQ2hhbmdlZCk7XG5cdFx0aWYgKHRoaXMubGlzdFRvb2wuaXRlbXM9PT11bmRlZmluZWQgfHx0aGlzLmxpc3RUb29sLml0ZW1zPT09IDAgfHx0aGlzLmxpc3RUb29sLml0ZW1zPT09bnVsbCApe1xuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5zdGF0ZS5saXN0PXRoaXMubGlzdFRvb2wuaXRlbXM7XG5cdFx0fVxuXG5cdFx0dGhpcy5jcmVhdGVMaXN0KCk7XG5cdH1cblx0ZG9jQ2hhbmdlZCgpe1xuXHRcdHRoaXMuY3JlYXRlTGlzdCgpO1xuXHR9XG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0dGhpcy5faXNNb3VudGVkPXRydWU7XG5cdFx0dGhpcy5hdXRvY29tcGxldGUoKTtcblxuXHR9XG5cdGNyZWF0ZUxpc3QoKXtcblx0XHR0aGlzLml0ZW1saXN0PVtdO1xuXHRcdC8vbGFibGUgYW5kIHZhbHVlXG5cdFx0aWYgKHRoaXMucHJvcHMuZG9jbGFibGUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmxpc3RUb29sLml0ZW1zICE9PSB1bmRlZmluZWQgJiYgdGhpcy5saXN0VG9vbC5pdGVtcyAhPT0gbnVsbCl7XG5cdFx0XHRmb3IobGV0IGl0ZW0gb2YgdGhpcy5saXN0VG9vbC5pdGVtcyl7XG5cdFx0XHRcdHZhciB0ZW1wID1baXRlbVt0aGlzLnByb3BzLmRvY2xhYmxlXSxpdGVtW3RoaXMucHJvcHMuZG9jdmFsdWVdXTtcblx0XHRcdFx0dGhpcy5pdGVtbGlzdC5wdXNoKHRlbXApO1xuXHRcdFx0fVxuXHRcdFx0JChkb2N1bWVudCkudHJpZ2dlcignbGlzdExvYWQnICsgdGhpcy5wcm9wcy5kb2N0eXBlKTtcblx0XHR9XG5cdFx0Ly9qdXN0IGxhYmxlXG5cdFx0ZWxzZSBpZih0aGlzLmxpc3RUb29sLml0ZW1zICE9PSB1bmRlZmluZWQgJiYgdGhpcy5saXN0VG9vbC5pdGVtcyAhPT0gbnVsbCl7XG5cdFx0XHRmb3IobGV0IGl0ZW0gb2YgdGhpcy5saXN0VG9vbC5pdGVtcyl7XG5cdFx0XHRcdHRoaXMuaXRlbWxpc3QucHVzaChpdGVtW3RoaXMucHJvcHMuZG9jdmFsdWVdKTtcblx0XHRcdH1cblx0XHRcdCQoZG9jdW1lbnQpLnRyaWdnZXIoJ2xpc3RMb2FkJyArIHRoaXMucHJvcHMuZG9jdHlwZS5yZXBsYWNlKFwiIFwiLFwiXCIpKTtcblx0XHR9XG5cdH1cblx0Y29tcG9uZW50V2lsbFVubW91bnQoKXtcblx0XHQvLyBjb25zb2xlLmxvZyhcIkhFTExPXCIpO1xuXHRcdC8vIHRoaXMuYXcuZGVzdHJveSgpO1xuXHRcdC8vIGRlbGV0ZSB0aGlzLmF3O1xuXHRcdC8vIGNvbnNvbGUubG9nKFwiVEVTVFwiKTtcblx0fVxuXHRyZWZDYWxsKGlucHV0KXtcblx0XHR0aGlzLmlucHV0PWlucHV0O1xuXHR9XG5cdGF1dG9jb21wbGV0ZShpbnB1dCl7XG5cdFx0aW5wdXQ9dGhpcy5pbnB1dDtcblx0XHR2YXIgY29uZmlnPSB7XG5cdFx0XHRcdG1pbkNoYXJzOiAwLFxuXHRcdFx0XHRtYXhJdGVtczogOTksXG5cdFx0XHRcdGF1dG9GaXJzdDogdHJ1ZSxcblx0XHRcdFx0ZmlsdGVyOiBBd2Vzb21wbGV0ZS5GSUxURVJfU1RBUlRTV0lUSFxuXHRcdFx0fVxuXHRcdGlmKHRoaXMucHJvcHMuZG9jbGFibGUgIT09IHVuZGVmaW5lZCApe1xuXHRcdFx0Y29uZmlnLml0ZW09IGZ1bmN0aW9uKGl0ZW0sIGlucHV0KSB7XG5cdFx0XHRcdHZhciBkID0gaXRlbTtcblx0XHRcdFx0dmFyIGh0bWwgPSBcIjxzcGFuPlwiICsgX18oaXRlbS5sYWJlbCkrIFwiPC9zcGFuPjxicj48c3Bhbj48c21hbGw+XCIraXRlbS52YWx1ZStcIjwvc21hbGw+PC9zcGFuPlwiO1xuXHRcdFx0XHRyZXR1cm4gJCgnPGxpPjwvbGk+Jylcblx0XHRcdFx0XHQuZGF0YSgnaXRlbS5hdXRvY29tcGxldGUnLCBpdGVtKVxuXHRcdFx0XHRcdC5odG1sKCc8YT48cD4nICsgaHRtbCArICc8L3A+PC9hPicpXG5cdFx0XHRcdFx0LmdldCgwKTtcblx0XHRcdH1cblxuXHRcdH1lbHNle1xuXHRcdFx0Y29uZmlnLml0ZW09ZnVuY3Rpb24oaXRlbSwgaW5wdXQpIHtcblx0XHRcdFx0dmFyIGQgPSBpdGVtO1xuXHRcdFx0XHR2YXIgaHRtbCA9IFwiPHNwYW4+XCIgKyBfXyhpdGVtKSsgXCI8L3NwYW4+XCI7XG5cdFx0XHRcdHJldHVybiAkKCc8bGk+PC9saT4nKVxuXHRcdFx0XHRcdC5kYXRhKCdpdGVtLmF1dG9jb21wbGV0ZScsIGl0ZW0pXG5cdFx0XHRcdFx0Lmh0bWwoJzxhPjxwPicgKyBodG1sICsgJzwvcD48L2E+Jylcblx0XHRcdFx0XHQuZ2V0KDApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLmF3ID0gbmV3IEF3ZXNvbXBsZXRlKGlucHV0LGNvbmZpZyk7XG5cdFx0aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRcdCdhd2Vzb21wbGV0ZS1zZWxlY3Rjb21wbGV0ZScsXG5cdFx0XHRcdHRoaXMuaW5wdXRDaGFuZ2Vcblx0XHQpO1xuXHRcdCQoaW5wdXQpLmNsaWNrKCBmdW5jdGlvbigpIHtcblx0XHRcdGlmICh0aGlzLmF3LnVsLmNoaWxkTm9kZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdHRoaXMuYXcubWluQ2hhcnMgPSAwO1xuXHRcdFx0XHR0aGlzLmF3LmV2YWx1YXRlKCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmICh0aGlzLmF3LnVsLmhhc0F0dHJpYnV0ZSgnaGlkZGVuJykpIHtcblx0XHRcdFx0dGhpcy5hdy5vcGVuKCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dGhpcy5hdy5jbG9zZSgpO1xuXHRcdFx0fVxuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5hdy5saXN0PXRoaXMuaXRlbUxpc3Q7XG5cdFx0JChkb2N1bWVudCkuYmluZCgnbGlzdExvYWQnICsgdGhpcy5wcm9wcy5kb2N0eXBlLnJlcGxhY2UoXCIgXCIsXCJcIiksZnVuY3Rpb24oKXtcblx0XHRcdHRoaXMuYXcubGlzdD10aGlzLml0ZW1saXN0O1xuXHRcdH0uYmluZCh0aGlzKSk7XG5cdH1cblx0aW5wdXRDaGFuZ2UoZSl7XG5cdFx0dGhpcy5wcm9wcy5pbnB1dENoYW5nZWQoZSk7XG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnR5cGUgPSAodGhpcy5wcm9wcy50eXBlID09PSB1bmRlZmluZWQpID8gXCJ0ZXh0XCI6IHRoaXMucHJvcHMudHlwZTtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMucGxhY2Vob2xkZXIgPSAodGhpcy5wcm9wcy5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXI7XG5cdFx0dGhpcy5sYWJsZSA9ICh0aGlzLnByb3BzLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5sYWJsZTtcblx0XHR0aGlzLmRpc2FibGVkID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5kaXNhYmxlZD09ZmFsc2V8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZXF1aXJlZCA9ICh0aGlzLnByb3BzLnJlcXVpcmVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVxdWlyZWQ9PWZhbHNlfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVhZG9ubHkgPSAodGhpcy5wcm9wcy5yZWFkb25seSA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1mYWxzZXx8dGhpcy5wcm9wcy5yZWFkb25seT09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblxuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblx0XHR0aGlzLmNsYXNzTmFtZT0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJmb3JtLWNvbnRyb2wgYXdlc29tcGxldGVcIjogXCJmb3JtLWNvbnRyb2wgYXdlc29tcGxldGUgXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHZhciBpbnB1dD0oIDxpbnB1dFxuXHRcdFx0XHRcdHZhbHVlPXt0aGlzLnZhbHVlfVxuXG5cdFx0XHRcdFx0dHlwZT17dGhpcy50eXBlfVxuXHRcdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9XG5cdFx0XHRcdFx0cGxhY2Vob2xkZXI9e3RoaXMucGxhY2Vob2xkZXJ9XG5cdFx0XHRcdFx0cmVmPXt0aGlzLnJlZkNhbGx9XG5cdFx0ICAgICAgICAgIFx0b25DaGFuZ2U9e3RoaXMuaW5wdXRDaGFuZ2V9XG5cdFx0ICAgICAgICAgIFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdFx0ICAgICAgICAgIFx0cmVhZE9ubHk9e3RoaXMucmVhZG9ubHl9XG5cdFx0ICAgICAgICAgIFx0cmVxdWlyZWQ9e3RoaXMucmVxdWlyZWR9XG5cdFx0ICAgICAgICAgIC8+KTtcblxuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy5sYWJsZSA9PVwiXCIpe1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgXCI+XG5cdFx0ICAgIFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbFwiPnt0aGlzLnByb3BzLmxhYmxlfTwvbGFiZWw+XG5cdFx0ICAgIFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIlwiPlxuXHRcdCAgICAgIFx0XHRcdHtpbnB1dH1cblx0XHQgICAgXHRcdDwvZGl2PlxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHQgICAgICBcdFx0e2lucHV0fVxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuZXhwb3J0IGNsYXNzIEJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy50eXBlID0gKHRoaXMucHJvcHMudHlwZSA9PT0gdW5kZWZpbmVkKSA/IFwidGV4dFwiOiB0aGlzLnByb3BzLnR5cGU7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLmRpc2FibGVkID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5kaXNhYmxlZD09ZmFsc2V8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dmFyIG91dHB1dD1cIlwiO1xuXHRcdHRoaXMuY2xhc3NOYW1lPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcImJ0blwiOiBcImJ0biBcIiArdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0dmFyIGljb249XCJcIjtcblx0XHRpZih0aGlzLnByb3BzLmljb24hPT0gdW5kZWZpbmVkICYmIHRoaXMucHJvcHMuaWNvbiE9PVwiXCIpe1xuXHRcdFx0dmFyIGljb25DbGFzcz1cImdseXBoaWNvbiBcIiArdGhpcy5wcm9wcy5pY29uO1xuXHRcdFx0aWNvbj0oPHNwYW4gY2xhc3NOYW1lPXtpY29uQ2xhc3N9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj4pO1xuXHRcdH1cblx0XHR2YXIgaW5wdXQ9KFxuXHRcdFx0PGJ1dHRvblxuXHRcdFx0XHR0eXBlPXt0aGlzLnR5cGV9XG5cdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9XG5cdFx0XHRcdHZhbHVlPXt0aGlzLnZhbHVlfVxuXHRcdFx0XHRvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2xpY2t9XG5cdFx0XHRcdGRpc2FibGVkPXt0aGlzLmRpc2FibGVkfVxuXHRcdFx0PntpY29ufSB7dGhpcy52YWx1ZX08L2J1dHRvbj5cblx0XHQpO1xuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHQgIFx0XHR7aW5wdXR9XG5cdCAgXHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RhbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnN1Ym1pdD10aGlzLnN1Ym1pdC5iaW5kKHRoaXMpO1xuXHR9XG5cdHN1Ym1pdChlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5wcm9wcy5zdWJtaXQoZSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dmFyIGZvb3Rlcj1cIlwiO1xuXHRcdGlmKHRoaXMucHJvcHMuc3VibWl0IT09IGZhbHNlKXtcblx0XHRcdGZvb3Rlcj0oXHRcdFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWZvb3RlclwiPlxuXHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tc2Vjb25kYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DbG9zZTwvYnV0dG9uPlxuXHRcdFx0XHRcdDxidXR0b24gXG5cdFx0XHRcdFx0XHR0eXBlPVwic3VibWl0XCIgXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLnN1Ym1pdH0gXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiA+XG5cdFx0XHRcdFx0XHRcdHt0aGlzLnByb3BzLnN1Ym1pdFRleHR9XG5cdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KVxuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsIGZhZGUgdGV4dC1sZWZ0IHBhbmVsLWRlZmF1bHRcIiBpZD17dGhpcy5wcm9wcy5pZH0gdGFiSW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiBhcmlhLWxhYmVsbGVkYnk9XCJleGFtcGxlTW9kYWxMYWJlbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZ1wiIHJvbGU9XCJkb2N1bWVudFwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1oZWFkZXJcIj5cblx0XHRcdFx0XHRcdFx0PGg0IGNsYXNzTmFtZT1cIm1vZGFsLXRpdGxlXCIgaWQ9XCJleGFtcGxlTW9kYWxMYWJlbFwiPnt0aGlzLnByb3BzLnRpdGxlfTwvaDQ+XG5cdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGRpc3BsYXk9XCJub25lXCIgY2xhc3NOYW1lPVwiY2xvc2UgaGlkZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+XG5cdFx0XHRcdFx0XHRcdDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+XG5cdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XG5cdFx0XHRcdFx0XHRcdFx0eyB0aGlzLnByb3BzLmNoaWxkcmVuIH1cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdHtmb290ZXJ9XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5cbiIsImltcG9ydCBGb3JtIGZyb20gJy4uL3V0aWxzL2Zvcm1zJ1xuXG5cbmV4cG9ydCBjbGFzcyBTcHJheUZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5jb21wb25lbnRXaWxsVXBkYXRlPXRoaXMuY29tcG9uZW50V2lsbFVwZGF0ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuc3VibWl0PXRoaXMuc3VibWl0LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5zYXZlPXRoaXMuc2F2ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZGVsZXRlPXRoaXMuZGVsZXRlLmJpbmQodGhpcyk7XG5cdH1cblx0Y29tcG9uZW50V2lsbFVwZGF0ZSgpe1xuXHR9XG5cdHN1Ym1pdChlKXtcblx0XHQvL2lmKHRoaXMucHJvcHMuaXRlbS52aW5leWFyZD09XCJcIiB8fHRoaXMucHJvcHMuaXRlbS5zcHJheV90eXBlPT1cIlwiIHx8IChtb21lbnQodGhpcy5wcm9wcy5pdGVtLmRhdGUsXCJNTS9ERC9ZWVlZXCIpLmlzVmFsaWQoKSkhPT10cnVlKXtcblx0XHQvL1x0Y29uc29sZS5sb2coXCJub3QgdmFsaWRcIik7XG5cdFx0Ly99ZWxzZXtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRoaXMucHJvcHMuY3JlYXRlKHRoaXMucHJvcHMuaXRlbSk7XG5cdFx0Ly99XG5cdH1cblx0c2F2ZShlKXtcblx0XHQvLyBpZih0aGlzLnByb3BzLml0ZW0udmluZXlhcmQ9PVwiXCIgfHx0aGlzLnByb3BzLml0ZW0uc3ByYXlfdHlwZT09XCJcIiB8fCAobW9tZW50KHRoaXMucHJvcHMuaXRlbS5kYXRlLFwiTU0vREQvWVlZWVwiKS5pc1ZhbGlkKCkpIT09dHJ1ZSl7XG5cdFx0Ly8gXHRjb25zb2xlLmxvZyhcIm5vdCB2YWxpZFwiKTtcblx0XHQvLyB9ZWxzZXtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRoaXMucHJvcHMuZWRpdCh0aGlzLnByb3BzLml0ZW0pO1xuXHRcdC8vIH1cblx0fVxuXHRkZWxldGUoZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMucHJvcHMuZGVsZXRlKHRoaXMucHJvcHMuaXRlbSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dmFyIGNyZWF0ZUhpZGRlbj0odGhpcy5wcm9wcy5tb2RlIT1cImNyZWF0ZVwiKT9cIiBoaWRkZW5cIjpcIiBub3BlXCI7XG5cdFx0dmFyIGVkaXRIaWRkZW49KHRoaXMucHJvcHMubW9kZSE9XCJlZGl0XCIpP1wiIGhpZGRlblwiOlwiIG5vcGVcIjtcblxuXHRcdGlmKHRoaXMucHJvcHMuaXRlbT09bnVsbCl7XG5cdFx0XHR2YXIgY29weT17XG5cdFx0XHRcdHZpbmV5YXJkOlwiXCIsXG5cdFx0XHRcdHNlYXNvbjpcIlwiLFxuXHRcdFx0XHRkYXRlOm1vbWVudCgpLmZvcm1hdChcIk1NL0REL1lZWVlcIiksXG5cdFx0XHRcdHNwcmF5VHlwZTpcIlwiLFxuXHRcdFx0XHRxdWFudGl0eTowXG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHR2YXIgY29weT1wcy5jbG9uZSh0aGlzLnByb3BzLml0ZW0pO1xuXHRcdH1cblxuXHRcdGNvbnNvbGUubG9nKHRoaXMucHJvcHMuaXRlbSk7XG5cdFx0Y29uc29sZS5sb2coY29weSk7XG5cdFx0dmFyIGZvcm1FbGVtZW50cz17XG5cdFx0XHRkYXRlOlt7fSxcblx0XHRcdHtcblx0XHRcdFx0XHRmaWVsZDpcImRhdGVcIixcblx0XHRcdFx0XHRyZXF1aXJlZDp0cnVlLFxuXHRcdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRcdGNvcHkuZGF0ZT1lLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdFx0dmFsdWU6Y29weS5kYXRlLFxuXHRcdFx0XHRcdGxhYmxlOlwiRGF0ZVwiXG5cdFx0XHR9XSxcblx0XHRcdHZpbmV5YXJkOlt7fSx7XG5cdFx0XHRcdGZpZWxkOlwiYXV0b0NvbXBsZXRlXCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRjb3B5LnZpbmV5YXJkPWUudGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHR2YWx1ZTpjb3B5LnZpbmV5YXJkLFxuXHRcdFx0XHRyZXF1aXJlZDp0cnVlLFxuXHRcdFx0XHRsYWJsZTpcIlZpbmV5YXJkXCIsXG5cdFx0XHRcdGRvY3R5cGU6XCJWaW5leWFyZFwiLFxuXHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIlxuXHRcdFx0fV0sXG5cdFx0XHRmaWVsZDpbe30se1xuXHRcdFx0XHRmaWVsZDpcImF1dG9Db21wbGV0ZVwiLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0Y29weS5maWVsZD1lLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0dmFsdWU6Y29weS5maWVsZCxcblx0XHRcdFx0cmVxdWlyZWQ6dHJ1ZSxcblx0XHRcdFx0bGFibGU6XCJWaW5leWFyZFwiLFxuXHRcdFx0XHRkb2N0eXBlOlwiVmluZXlhcmQgRmllbGRcIixcblx0XHRcdFx0ZmlsdGVyOnt2aW5leWFyZDpjb3B5LnZpbmV5YXJkfSxcblx0XHRcdFx0ZG9jdmFsdWU6XCJuYW1lXCJcblx0XHRcdH1dLFxuXHRcdFx0d29ya29yZGVyOlt7fSx7XG5cdFx0XHRcdGZpZWxkOlwiYXV0b0NvbXBsZXRlXCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRjb3B5Lndvcmtfb3JkZXI9ZS50YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdHZhbHVlOmNvcHkud29ya19vcmRlcixcblx0XHRcdFx0cmVxdWlyZWQ6dHJ1ZSxcblx0XHRcdFx0bGFibGU6XCJWaW5leWFyZFwiLFxuXHRcdFx0XHRkb2N0eXBlOlwid29ya19vcmRlclwiLFxuXHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIlxuXHRcdFx0fV1cblx0XHR9XG5cblx0XHR2YXIgZmllbGRzPVtcblx0XHRcdGZvcm1FbGVtZW50cy52aW5leWFyZFt0aGlzLnByb3BzLnZpbmV5YXJkXSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJhdXRvQ29tcGxldGVcIixcblx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdGNvcHkuc2Vhc29uPWUudGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHR2YWx1ZTpjb3B5LnNlYXNvbixcblx0XHRcdFx0cmVxdWlyZWQ6dHJ1ZSxcblx0XHRcdFx0bGFibGU6XCJTZWFzb25cIixcblx0XHRcdFx0ZG9jdHlwZTpcIlNlYXNvblwiLFxuXHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIlxuXHRcdFx0fSxcblx0XHRcdGZvcm1FbGVtZW50cy5kYXRlW3RoaXMucHJvcHMudmluZXlhcmRdLFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImF1dG9Db21wbGV0ZVwiLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0Y29weS5zcHJheV90eXBlPWUudGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHR2YWx1ZTpjb3B5LnNwcmF5X3R5cGUsXG5cdFx0XHRcdHJlcXVpcmVkOnRydWUsXG5cdFx0XHRcdGxhYmxlOlwiU3ByYXkgVHlwZVwiLFxuXHRcdFx0XHRkb2N0eXBlOlwiU3ByYXkgVHlwZVwiLFxuXHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIlxuXHRcdFx0fSxcblxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImlucHV0XCIsXG5cdFx0XHRcdGNsYXNzTmFtZTpcInZpbmV5YXJkLWlucHV0XCIsXG5cdFx0XHRcdHR5cGU6XCJudW1iZXJcIixcblx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdGNvcHkucXVhbnRpdHk9ZS50YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdHZhbHVlOmNvcHkucXVhbnRpdHksXG5cdFx0XHRcdGxhYmxlOlwicXVhbnRpdHlcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJidXR0b25cIixcblx0XHRcdFx0dHlwZTpcInN1Ym1pdFwiLFxuXHRcdFx0XHR2YWx1ZTpcIkNyZWF0ZSBTcHJheWluZyBFbnRyeVwiLFxuXHRcdFx0XHRjbGFzc05hbWU6XCJidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIgKyBjcmVhdGVIaWRkZW4sXG5cdFx0XHRcdG9uQ2xpY2s6dGhpcy5zdWJtaXRcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiYnV0dG9uXCIsXG5cdFx0XHRcdHR5cGU6XCJzdWJtaXRcIixcblx0XHRcdFx0dmFsdWU6XCJTYXZlXCIsXG5cdFx0XHRcdGNsYXNzTmFtZTpcImJ0bi1zdWNjZXNzIHB1bGwtcmlnaHRcIisgZWRpdEhpZGRlbixcblx0XHRcdFx0b25DbGljazp0aGlzLnNhdmVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiYnV0dG9uXCIsXG5cdFx0XHRcdHR5cGU6XCJzdWJtaXRcIixcblx0XHRcdFx0dmFsdWU6XCJEZWxldGVcIixcblx0XHRcdFx0Y2xhc3NOYW1lOlwiYnRuLWRhbmdlciBwdWxsLXJpZ2h0XCIrIGVkaXRIaWRkZW4sXG5cdFx0XHRcdG9uQ2xpY2s6dGhpcy5kZWxldGVcblx0XHRcdH1cblx0XHRdXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxGb3JtXG5cdFx0XHRcdFx0aWQ9e3RoaXMucHJvcHMuaWR9XG5cdFx0XHRcdFx0dHlwZT1cImhvcml6b250YWxcIlxuXHRcdFx0XHRcdGZpZWxkcz17ZmllbGRzfVxuXG5cdFx0XHRcdC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCJcbmltcG9ydCBBY29yZGlhbiBmcm9tICcuLi8uLi9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9hY29yZGlhbidcbmltcG9ydCBBY29yZGlhbkNvbnRlbnQgZnJvbSAnLi4vLi4vcHVibGljL2pzL21vZHVsZXMvdXRpbHMvYWNvcmRpYW5Db250ZW50J1xuaW1wb3J0IERheXNXb3Jrb3JkZXJzIGZyb20gJy4uLy4uL3B1YmxpYy9qcy9tb2R1bGVzL2RheXNfd29ya29yZGVycy9kYXlzV29ya29yZGVycydcbmltcG9ydCBGb3JtIGZyb20gJy4uLy4uL3B1YmxpYy9qcy9tb2R1bGVzL3V0aWxzL2Zvcm1zJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDcmV3RGFzaCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblxuXHRcdHRoaXMuY3Jld0NoYW5nZWQ9dGhpcy5jcmV3Q2hhbmdlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY3Jld3NBY29yZGlvbj10aGlzLmNyZXdzQWNvcmRpb24uYmluZCh0aGlzKTtcblx0XHR0aGlzLmRhdGVDaGFuZ2VkPXRoaXMuZGF0ZUNoYW5nZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLndvcmtPcmRlclN0YXR1cz10aGlzLndvcmtPcmRlclN0YXR1cy5iaW5kKHRoaXMpO1xuXG5cblx0XHR0aGlzLmN1cnJlbnRVc2VyPXBzLmluaXRDdXJyZW50VXNlcigpO1xuXHRcdHRoaXMuY3VycmVudFVzZXIuZ2V0KHt9LGZ1bmN0aW9uKGl0ZW1zKXtcblx0XHRcdGlmKHRoaXMuY3VycmVudFVzZXIuaXRlbXMudXNlcm5hbWU9PVwiR3Vlc3RcIil7XG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbiA9IFwiL2xvZ2luXCI7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0JChkb2N1bWVudCkudHJpZ2dlcihcInVzZXJMb2FkZWRcIik7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coXCJhZnRlciBMb2FkXCIsdGhpcy5jdXJyZW50VXNlci5pdGVtcyk7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKHRoaXMpKTsgXG5cdFx0Ly90aGlzLnN0YXRlPXt9O1xuXHRcdHRoaXMuc3RhdGU9e1xuXHRcdFx0Y3JldzpbXSxcblx0XHRcdHN0YXR1czpbXSxcblx0XHRcdHRpdGxlOicnLFxuXHRcdFx0dXNlcmluZm86dGhpcy5jdXJyZW50VXNlci5pdGVtcyxcblx0XHRcdHNlbGVjdGVkRGF0ZTptb21lbnQoKS5mb3JtYXQoXCJNTS9ERC9ZWVlZXCIpXG5cdFx0fTtcblx0XHRjb25zb2xlLmxvZyh0aGlzLmN1cnJlbnRVc2VyLml0ZW1zLnRvZGF5KTtcblx0XHR0aGlzLmNyZXdUb29sID0gbmV3IHBzLmFwaVRvb2woe30se2RvY3R5cGU6J0NyZXcnfSx0aGlzLmNyZXdDaGFuZ2VkKTtcblx0XHR0aGlzLmFjb3JkaWFuSWQ9XCJjcmV3LWRhc2gtYWNvcmRpYW5cIjtcblx0fVxuXG4gIFx0Y3Jld0NoYW5nZWQoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtjcmV3OnRoaXMuY3Jld1Rvb2wuaXRlbXN9KTtcblx0fVxuXHRkYXRlQ2hhbmdlZChlKXtcblx0XHR0aGlzLnNldFN0YXRlKHtzZWxlY3RlZERhdGU6ZS50YXJnZXQudmFsdWV9KTtcblx0fVxuXHR3b3JrT3JkZXJTdGF0dXMoaW5kZXgpe1xuXHRcdHJldHVybiBmdW5jdGlvbihpdGVtcyl7XG5cdFx0XHR2YXIgc3RhdHVzPVwiTm9uZVwiO1xuXHRcdFx0Zm9yIChsZXQgaXRlbSBvZiBpdGVtcyl7XG5cdFx0XHRcdGlmKGl0ZW0uc3RhdHVzPT1cIlN0YXJ0ZWRcIil7XG5cdFx0XHRcdFx0c3RhdHVzPVwiV29ya2luZ1wiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKGl0ZW0uc3RhdHVzPT1cIkNvbXBsZXRlXCIgJiYgc3RhdHVzIT1cIldvcmtpbmdcIil7XG5cdFx0XHRcdFx0c3RhdHVzPVwiQ29tcGxldGVkXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoaXRlbS5zdGF0dXM9PVwiUGVuZGluZ1wiICYmIHN0YXR1cz09XCJDb21wbGV0ZWRcIil7XG5cdFx0XHRcdFx0c3RhdHVzPVwiRHJpdmluZ1wiO1xuXHRcdFx0XHR9XG5cblx0XHRcdH1cblx0XHRcdHRoaXMuc3RhdGUuc3RhdHVzW2luZGV4XT1zdGF0dXM7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtzdGF0dXM6dGhpcy5zdGF0ZS5zdGF0dXN9KTtcblx0XHR9LmJpbmQodGhpcyk7XG5cdH1cblxuXHRjcmV3c0Fjb3JkaW9uKCl7XG5cdFx0XHQvL2lmIGFsbCBwZW5kaW5nICYmIGNsb2NrZWQgaW4gZHJpdmluZ1xuXHRcdFx0Ly9pZiBub3QgY2xvY2tlZCBpbjogbm90IHN0cmF0ZWRcblx0XHRcdC8vY2xvY2tlZCBvdXQ6IGNsb2NrZWQgb3V0XG5cblxuXHRcdHZhciBjb252ZXJ0ZWREYXRlID0gbW9tZW50KHRoaXMuc3RhdGUuc2VsZWN0ZWREYXRlLCAnTU0vREQvWVlZWScpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xuXHRcdHZhciBvdXRwdXQ9W107XG5cdFx0dGhpcy5zdGF0ZS5jcmV3Lm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCl7XG5cdFx0XHRpZih0aGlzLnN0YXRlLnN0YXR1c1tpbmRleF09PT11bmRlZmluZWQpe1xuXHRcdFx0XHR0aGlzLnN0YXRlLnN0YXR1c1tpbmRleF09XCJObyBXb3JrIE9yZGVyc1wiO1xuXHRcdFx0fVxuXHRcdFx0b3V0cHV0LnB1c2goKFxuXHRcdFx0XHQ8QWNvcmRpYW5Db250ZW50XG5cdFx0XHRcdFx0a2V5PXt0aGlzLmFjb3JkaWFuSWQraW5kZXh9XG5cdFx0XHRcdFx0aWQ9e3RoaXMuYWNvcmRpYW5JZCtpbmRleH1cblx0XHRcdFx0XHR0aXRsZT17aXRlbS5jcmV3X25hbWV9XG5cdFx0XHRcdFx0YWN0aXZlPXsoaW5kZXg9PT0wKT90cnVlOmZhbHNlfVxuXHRcdFx0XHRcdHBhcmVudElkPXt0aGlzLmFjb3JkaWFuSWR9XG5cdFx0XHRcdD5cblx0XHRcdFx0XHR7dGhpcy5zdGF0ZS5zdGF0dXNbaW5kZXhdfVxuXHRcdFx0XHRcdDxEYXlzV29ya29yZGVycyBcblx0XHRcdFx0XHRcdGRhdGU9e2NvbnZlcnRlZERhdGV9XG5cdFx0XHRcdFx0XHRjcmV3PXtpdGVtLm5hbWV9XG5cdFx0XHRcdFx0XHRzdGF0dXNVcGRhdGU9e3RoaXMud29ya09yZGVyU3RhdHVzKGluZGV4KX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQ8L0Fjb3JkaWFuQ29udGVudD4pKTtcdFxuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuICg8ZGl2PlxuXHRcdFx0PEZvcm1cblx0XHRcdFx0Y2xhc3NOYW1lPVwiY2VudGVyLWJsb2NrIHNob3J0XCJcblx0XHRcdFx0dHlwZT1cImhvcml6b250YWxcIlxuXHRcdFx0XHRmaWVsZHM9e1t7XG5cdFx0XHRcdFx0ZmllbGQ6XCJkYXRlXCIsXG5cdFx0XHRcdFx0dmFsdWU6dGhpcy5zdGF0ZS5zZWxlY3RlZERhdGUsXG5cdFx0XHRcdFx0b25DaGFuZ2U6IHRoaXMuZGF0ZUNoYW5nZWQsXG5cdFx0XHRcdFx0Y2xhc3NOYW1lOlwiaW5wdXQtbGdcIixcblx0XHRcdFx0XHRrZXk6XCJvdGhlcjNcIlxuXHRcdFx0XHR9XX1cblx0XHRcdC8+XG5cdFx0XHQ8QWNvcmRpYW4gaWQ9e3RoaXMuYWNvcmRpYW5JZH0+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L0Fjb3JkaWFuPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHRyZXR1cm4oPGRpdj57dGhpcy5jcmV3c0Fjb3JkaW9uKCl9PC9kaXY+KTtcblx0fVxufVxuXG5cbmNvbnN0IGFwcD0gJCgnI2FwcCcpWzBdO1xuKGZ1bmN0aW9uKCl7XG5cdGZyYXBwZS5yZWFkeShmdW5jdGlvbigpe1xuXHRcdFJlYWN0RE9NLnJlbmRlciggXG5cdFx0PENyZXdEYXNoIC8+LGFwcCApO1xuXHR9KVxuXG59KSgpO1xuIl19
