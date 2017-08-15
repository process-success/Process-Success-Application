(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DaysWorkorders = require('../days_workorders/DaysWorkorders');

var _DaysWorkorders2 = _interopRequireDefault(_DaysWorkorders);

var _employeeTime = require('./employeeTime');

var _employeeTime2 = _interopRequireDefault(_employeeTime);

var _timeSheet = require('./timeSheet');

var _timeSheet2 = _interopRequireDefault(_timeSheet);

var _clockIn = require('./clockIn');

var _clockIn2 = _interopRequireDefault(_clockIn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*jshint ignore:start */


var DaysTimeSheets = function (_React$Component) {
	_inherits(DaysTimeSheets, _React$Component);

	function DaysTimeSheets(props) {
		_classCallCheck(this, DaysTimeSheets);

		var _this = _possibleConstructorReturn(this, (DaysTimeSheets.__proto__ || Object.getPrototypeOf(DaysTimeSheets)).call(this, props));

		_this.state = { items: [] };
		_this.state.time = '';
		_this.add = {};

		/*     Do the bind thing      */

		//Time employee line item
		_this.timeChanged = _this.timeChanged.bind(_this);
		_this.updateTime = _this.updateTime.bind(_this);
		_this.deleteEmployee = _this.deleteEmployee.bind(_this);

		_this.updateFromServer = _this.updateFromServer.bind(_this);
		_this.timeSheetWrapper = _this.timeSheetWrapper.bind(_this);

		_this.addEmployee = _this.addEmployee.bind(_this);
		_this.updateFromServerParam = _this.updateFromServerParam.bind(_this);

		_this.clockIn = _this.clockIn.bind(_this);
		_this.clockOut = _this.clockOut.bind(_this);
		/*    end Bind ding ding         */

		_this.autocompleteArr = [];
		var args = {};

		//Grab the employee timesheet data
		_this.objTool = ps.initTimeSheets();
		_this.objTool.get({ date: props.date }, function () {
			this.updateFromServer();
			this.objTool.reactSetup(this.updateFromServer);
		}.bind(_this));

		if (_this.objTool.items === undefined || _this.objTool.items === 0) {} else {
			_this.state.items = _this.objTool.items;
		}

		//Grab the employee list
		var tool = ps.initEmployeeList();
		tool.get({}, function () {
			ps.employee_lables = tool.items.map(function (obj) {
				var rObj = {};
				rObj.label = obj.full_name;
				rObj.value = obj.name;
				return rObj;
			});
			$(document).trigger("employeeLablesLoaded");
		});

		return _this;
	}

	//------------------
	// helper Function
	//------------------


	_createClass(DaysTimeSheets, [{
		key: 'updateFromServer',
		value: function updateFromServer() {
			this.setState({ items: this.objTool.items });
		}
	}, {
		key: 'updateFromServerParam',
		value: function updateFromServerParam(data, index) {
			this.objTool.items[index] = data;
			this.setState({ items: this.objTool.items });
		}
	}, {
		key: 'crewsTimesheetIndex',
		value: function crewsTimesheetIndex(crew) {
			for (var i = 0; i < this.objTool.items.length; i++) {
				var item = this.objTool.items[i];
				if (item.crew == crew) {
					return i;
				}
			}
		}
	}, {
		key: 'getIndexTimesheet',
		value: function getIndexTimesheet(timesheet) {
			return this.objTool.get_index_of_item(timesheet);
		}
	}, {
		key: 'getIndexEmployee',
		value: function getIndexEmployee(timesheetIndex, employeeName) {
			var employees = this.objTool.items[timesheetIndex].employees;
			for (var i = 0; i < employees.length; i++) {
				if (employeeName == employees[i].employee) {
					return i;
				}
			}
		}

		//------------------------------------------
		//       Timesheet Wrapper Functions
		//------------------------------------------

	}, {
		key: 'clockIn',
		value: function clockIn(time, crew) {

			var ts_index = this.crewsTimesheetIndex(crew);

			this.objTool.items[ts_index].employees;
			for (var i = 0; i < this.objTool.items[ts_index].employees.length; i++) {
				this.objTool.items[ts_index].employees[i].start = time;
			}
			this.objTool.items[ts_index].status = "Clocked In";
			this.objTool.update(this.objTool.items[ts_index]);
			this.setState({ items: this.objTool.items });
		}
	}, {
		key: 'clockOut',
		value: function clockOut(time, crew) {

			var ts_index = this.crewsTimesheetIndex(crew);

			this.objTool.items[ts_index].employees;
			for (var i = 0; i < this.objTool.items[ts_index].employees.length; i++) {
				this.objTool.items[ts_index].employees[i].end = time;
			}
			this.objTool.items[ts_index].status = "Clocked Out";
			this.objTool.update(this.objTool.items[ts_index]);
			this.setState({ items: this.objTool.items });
		}
	}, {
		key: 'addEmployee',
		value: function addEmployee(ts_name, employee_name) {
			var ts_index = this.getIndexTimesheet(ts_name);
			var employeeIndex = this.getIndexEmployee(ts_index, employee_name);

			var updateCallback = function (index) {
				return function (data) {
					this.updateFromServerParam(data, index);
				}.bind(this);
			}.bind(this);

			for (var i = 0; i < this.objTool.items.length; i++) {
				var item = this.objTool.items[i];
				if (item.name == ts_name) {
					for (var x = 0; x < item.employees.length; x++) {
						var container = item.employees[x];
						if (container.employee == employee_name) {
							return "duplicate";
						}
					}
					this.objTool.items[i].employees.push({ employee: employee_name, new: '1' });
					this.objTool.update(this.objTool.items[i], updateCallback(i), 1);
				} else {
					var done = 1;
					if (item.employees.length > 0) {
						for (var x = 0; x < item.employees.length && done; x++) {
							var container = item.employees[x];
							if (container.employee == employee_name) {
								this.objTool.items[i].employees.splice(x, 1);
								this.objTool.changed(this.objTool.items[i]);
								done = 0;
							}
						}
					}
				}
			}
		}
	}, {
		key: 'timeSheetWrapper',

		//------------------------------------------
		//           Timesheet Wrapper
		//------------------------------------------
		value: function timeSheetWrapper(item, index) {
			var employee_output = [];
			if (item.employees === undefined) {} else {
				var employeeOutput = item.employees.map(function (item_employee, index_employee) {
					employee_output.push(this.employeeLineItem(item_employee, item.name, index_employee));
				}.bind(this));
			}

			return React.createElement(_timeSheet2.default, {
				key: index,
				name: item.name,
				date: item.date,
				crew: item.crew,
				employees: employee_output,
				addEmployee: this.addEmployee,
				onUpdate: this.update
			});
		}

		//------------------------------------------
		//       Employee Time Form Lineitem
		//------------------------------------------

	}, {
		key: 'deleteEmployee',
		value: function deleteEmployee(employee, timesheet) {
			var ts_index = this.getIndexTimesheet(timesheet);
			var done = 1;
			var item = this.objTool.items[ts_index];
			if (item.employees.length > 0) {
				for (var x = 0; x < item.employees.length && done; x++) {
					var container = item.employees[x];
					if (container.employee == employee) {
						this.objTool.items[ts_index].employees.splice(x, 1);
						//ƒconsole.log(this.objTool.items[ts_index]);
						this.objTool.update(this.objTool.items[ts_index]);
						this.setState({ items: this.objTool.items });
						done = 0;
					}
				}
			}
		}
	}, {
		key: 'timeChanged',
		value: function timeChanged(position, employee, timesheet, value) {
			var ts_index = this.getIndexTimesheet(timesheet);
			var employeeIndex = this.getIndexEmployee(ts_index, employee);
			this.stat;
			if (position == 'end') {
				this.state.items[ts_index].employees[employeeIndex].end = value;
			} else {
				this.state.items[ts_index].employees[employeeIndex].start = value;
			}
			this.setState({ items: this.state.items });
		}
	}, {
		key: 'updateTime',
		value: function updateTime(position, employee, timesheet, value) {
			var ts_index = this.getIndexTimesheet(timesheet);
			var employeeIndex = this.getIndexEmployee(ts_index, employee);
			var save = 0;
			value = ps.time_add_digits(value);
			if (position == 'end' && ps.time_add_front_zero(this.objTool.items[ts_index].employees[employeeIndex].end) != ps.time_add_digits(value)) {
				this.objTool.items[ts_index].employees[employeeIndex].end = ps.time_add_digits(value);
				save = 1;
			}
			if (position == 'start' && ps.time_add_front_zero(this.objTool.items[ts_index].employees[employeeIndex].start) != ps.time_add_digits(value)) {
				this.objTool.items[ts_index].employees[employeeIndex].start = ps.time_add_digits(value);
				save = 1;
			}
			if (save) {
				this.setState({ items: this.objTool.items });
				this.objTool.update(this.objTool.items[ts_index], function () {
					ps.successAlert(this.objTool.items[ts_index].employees[employeeIndex].employee_name + " time updated!");
				}.bind(this));
			}
		}
	}, {
		key: 'employeeLineItem',
		value: function employeeLineItem(employee_container, time_sheet, employee_index) {
			return React.createElement(_employeeTime2.default, {
				key: employee_index,
				timesheet: time_sheet,
				employee_name: employee_container.employee_name,
				employee: employee_container.employee,
				start: ps.time_add_front_zero(employee_container.start),
				end: ps.time_add_front_zero(employee_container.end),
				updateTime: this.updateTime,
				timeChanged: this.timeChanged,
				deleteEmployee: this.deleteEmployee
			});
		}

		//-----------------------
		//        Render
		//-----------------------

	}, {
		key: 'render',
		value: function render() {
			//handel empty return
			if (this.state.items.length === 0 || this.state.items === undefined) {
				return React.createElement(
					'div',
					null,
					'No Time Sheets, start by ',
					React.createElement(
						'a',
						{ href: '/desk' },
						'creating some crews!'
					)
				);
			}
			var output = [];
			this.state.items.map(function (item, index) {
				if (item.crew == this.props.crew) {
					output.unshift(this.timeSheetWrapper(item, index));
				} else {
					output.push(this.timeSheetWrapper(item, index));
				}
			}.bind(this));

			var ts_index = this.crewsTimesheetIndex(this.props.crew);
			var status = '';
			if (ts_index == undefined) {
				var status = false;
			} else {
				status = this.state.items[ts_index].status;
			}

			//MAIN RENDER
			return React.createElement(
				'div',
				null,
				React.createElement(
					'div',
					{ className: 'tab-pane fade in active', id: 'clockInTab' },
					React.createElement(_clockIn2.default, {
						clockIn: this.clockIn,
						clockOut: this.clockOut,
						status: status,
						full_name: this.props.full_name,
						date: this.props.date,
						crew: this.props.crew
					})
				),
				React.createElement(
					'div',
					{ className: 'tab-pane fade', id: 'timeSheetTab' },
					React.createElement('br', null),
					output
				),
				React.createElement(
					'div',
					{ className: 'tab-pane fade', id: 'workOrderTab' },
					React.createElement(_DaysWorkorders2.default, {
						date: this.props.date,
						crew: this.props.crew
					})
				)
			);
		}
	}]);

	return DaysTimeSheets;
}(React.Component);

exports.default = DaysTimeSheets;

},{"../days_workorders/DaysWorkorders":5,"./clockIn":2,"./employeeTime":3,"./timeSheet":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*jshint ignore:start */
var ClockIn = function (_React$Component) {
	_inherits(ClockIn, _React$Component);

	function ClockIn(props) {
		_classCallCheck(this, ClockIn);

		var _this = _possibleConstructorReturn(this, (ClockIn.__proto__ || Object.getPrototypeOf(ClockIn)).call(this, props));

		_this.toggleTimeInput = _this.toggleTimeInput.bind(_this);
		_this.clockIn = _this.clockIn.bind(_this);
		_this.clockOut = _this.clockOut.bind(_this);
		_this.onChange = _this.onChange.bind(_this);

		_this.state = {
			date: new Date(),
			specifyTime: false
		};

		return _this;
	}

	_createClass(ClockIn, [{
		key: 'clockIn',
		value: function clockIn(e) {
			e.preventDefault();
			if (this.state.specifyTime == false) {
				var time = this.state.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
				//console.log(time);
				ps.successAlert("Clocked in at " + this.state.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
				this.props.clockIn(time, this.props.crew);
			} else {
				//console.log(this.state.time)
				if (this.state.time != undefined) {
					this.props.clockIn(this.state.time, this.props.crew);
					ps.successAlert("Clocked in");
				} else {
					//invalid time error
					ps.failAlert("Invalid time.");
				}
			}
		}
	}, {
		key: 'clockOut',
		value: function clockOut(e) {
			e.preventDefault();
			if (this.state.specifyTime == false) {
				var time = this.state.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
				//console.log(time);
				ps.successAlert("Clocked out at " + this.state.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " Have a great night!");
				this.props.clockOut(time, this.props.crew);
			} else {
				//console.log(this.state.time)
				if (this.state.time != undefined) {
					this.props.clockOut(this.state.time, this.props.crew);
					ps.successAlert("Clocked Out!  Have a great night!");
				} else {
					//invalid time error
					ps.failAlert("Invalid time.");
				}
			}
		}
	}, {
		key: 'toggleTimeInput',
		value: function toggleTimeInput(e) {
			//console.log(this.state.specifyTime);
			if (this.state.specifyTime) {
				this.setState({ specifyTime: false });
			} else {
				this.setState({ specifyTime: true });
			}
		}
	}, {
		key: 'onChange',
		value: function onChange(e) {
			this.setState({ time: e.target.value });
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			this.timerID = setInterval(function () {
				return _this2.tick();
			}, 10000);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			clearInterval(this.timerID);
		}
	}, {
		key: 'tick',
		value: function tick() {
			this.setState({
				date: new Date()
			});
		}
	}, {
		key: 'render',
		value: function render() {

			var values = {
				'Created': [this.clockIn, 'Clock In', 'btn btn-lg btn-success btn-block'],
				'Clocked In': [this.clockOut, 'Clock Out', 'btn btn-lg btn-success btn-block'],
				'Clocked Out': [this.clockOut, 'Change Clockout Time', 'btn btn-lg btn-success btn-block'],
				'Subminted': ['', 'Already Subminted', 'btn btn-lg btn-success btn-block'],
				'Aproved': ['', 'Already Subminted', 'btn btn-lg btn-success btn-block']
			}[this.props.status];
			var output = '';
			if (values == undefined) {
				output = React.createElement(
					'a',
					{ href: '#timesheet' },
					'You are not in a Time Sheet add yourself.'
				);
			} else {
				var inputField = React.createElement('input', { type: 'button', className: values[2], onClick: values[0], value: values[1] });
				output = React.createElement(
					'div',
					null,
					React.createElement(
						'h3',
						{ className: 'text-center' },
						'Welcome ',
						React.createElement(
							'span',
							{ className: 'username' },
							this.props.full_name
						)
					),
					React.createElement(
						'h3',
						{ className: 'text-center' },
						this.state.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
						' on ',
						this.state.date.toDateString(),
						' '
					),
					React.createElement(
						'div',
						{ className: 'clockIn' },
						React.createElement(
							'form',
							{ className: 'form-checkin', role: 'form' },
							inputField,
							React.createElement('br', null),
							React.createElement(
								'div',
								{ className: 'text-center' },
								React.createElement(
									'div',
									{ className: 'text-center' },
									React.createElement('input', {
										type: 'time',
										className: this.state.specifyTime ? 'form-control small-time' : 'hidden',
										onChange: this.onChange
									})
								),
								React.createElement('br', null),
								React.createElement(
									'a',
									{ className: 'btn btn-default', onClick: this.toggleTimeInput },
									this.state.specifyTime ? ' - Use Current Time' : ' + Specify a Time'
								)
							)
						)
					)
				);
			}
			return React.createElement(
				'div',
				null,
				output
			);
		}
	}]);

	return ClockIn;
}(React.Component);

exports.default = ClockIn;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*jshint ignore:start */
var DaysTimeSheets = function (_React$Component) {
	_inherits(DaysTimeSheets, _React$Component);

	function DaysTimeSheets(props) {
		_classCallCheck(this, DaysTimeSheets);

		//Binding ding
		var _this = _possibleConstructorReturn(this, (DaysTimeSheets.__proto__ || Object.getPrototypeOf(DaysTimeSheets)).call(this, props));

		_this.changedStart = _this.changedStart.bind(_this);
		_this.changedEnd = _this.changedEnd.bind(_this);
		_this.updateStart = _this.updateStart.bind(_this);
		_this.updateEnd = _this.updateEnd.bind(_this);
		_this.delete = _this.delete.bind(_this);
		_this.keyPressedStart = _this.keyPressedStart.bind(_this);
		_this.keyPressedEnd = _this.keyPressedEnd.bind(_this);
		return _this;
	}

	_createClass(DaysTimeSheets, [{
		key: 'changedStart',
		value: function changedStart(e) {
			this.props.timeChanged('start', this.props.employee, this.props.timesheet, e.target.value);
		}
	}, {
		key: 'changedEnd',
		value: function changedEnd(e) {
			this.props.timeChanged('end', this.props.employee, this.props.timesheet, e.target.value);
		}
	}, {
		key: 'updateStart',
		value: function updateStart(e) {
			if (e.target.value != '') {
				this.props.updateTime('start', this.props.employee, this.props.timesheet, e.target.value);
			}
		}
	}, {
		key: 'updateEnd',
		value: function updateEnd(e) {
			if (e.target.value != '') {
				this.props.updateTime('end', this.props.employee, this.props.timesheet, e.target.value);
			}
		}
	}, {
		key: 'delete',
		value: function _delete(e) {
			e.preventDefault();
			this.props.deleteEmployee(this.props.employee, this.props.timesheet);
		}
	}, {
		key: 'keyPressedStart',
		value: function keyPressedStart(e) {
			if (e.key === 'Enter') {
				e.preventDefault();
				if (this.props.start != '') {
					this.props.updateTime('start', this.props.employee, this.props.timesheet, this.props.start);
				}
			}
		}
	}, {
		key: 'keyPressedEnd',
		value: function keyPressedEnd(e) {
			if (e.key === 'Enter') {
				e.preventDefault();
				if (this.props.end != '') {
					this.props.updateTime('start', this.props.employee, this.props.timesheet, this.props.end);
				}
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'li',
				{ className: 'list-group-item' },
				React.createElement(
					'form',
					{ className: 'form-inline row day_time_form_row' },
					React.createElement(
						'label',
						{ className: 'control-label col-md-3 col-sm-3 col-xs-12 text-center day_time_form_row_element' },
						React.createElement(
							'strong',
							null,
							this.props.employee_name
						)
					),
					React.createElement(
						'div',
						{ className: 'col-md-3 col-sm-3 col-xs-6 day_time_form_row_element' },
						React.createElement(
							'div',
							{ className: 'input-group' },
							React.createElement(
								'div',
								{ className: 'input-group-addon' },
								'Start'
							),
							React.createElement('input', {
								type: 'time',
								className: 'form-control start',
								value: this.props.start,
								onBlur: this.updateStart,
								onChange: this.changedStart,
								onKeyPress: this.keyPressedStart

							})
						)
					),
					React.createElement(
						'div',
						{ className: 'col-md-3 col-sm-3 col-xs-6 day_time_form_row_element' },
						React.createElement(
							'div',
							{ className: 'input-group' },
							React.createElement(
								'div',
								{ className: 'input-group-addon' },
								'End'
							),
							React.createElement('input', {
								type: 'time',
								className: 'form-control end',
								value: this.props.end,
								onBlur: this.updateEnd,
								onChange: this.changedEnd,
								onKeyPress: this.keyPressedEnd
							})
						)
					),
					React.createElement(
						'div',
						{ className: 'col-md-3 col-sm-3 col-xs-12 text-center day_time_form_row_element' },
						React.createElement(
							'button',
							{
								className: 'delete btn btn-danger',
								onClick: this.delete
							},
							'Delete'
						)
					)
				)
			);
		}
	}]);

	return DaysTimeSheets;
}(React.Component);

exports.default = DaysTimeSheets;

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

var TimeSheet = function (_React$Component) {
	_inherits(TimeSheet, _React$Component);

	function TimeSheet(props) {
		_classCallCheck(this, TimeSheet);

		/*     Do the bind thing      */
		var _this = _possibleConstructorReturn(this, (TimeSheet.__proto__ || Object.getPrototypeOf(TimeSheet)).call(this, props));

		_this.autocomplete = _this.autocomplete.bind(_this);
		_this.addChanged = _this.addChanged.bind(_this);
		_this.addClicked = _this.addClicked.bind(_this);
		return _this;
	}

	_createClass(TimeSheet, [{
		key: "autocomplete",
		value: function autocomplete(input) {
			var config = {
				minChars: 0,
				maxItems: 99,
				autoFirst: true,
				item: function item(_item, input) {
					var d = _item;
					var html = "<span>" + __(_item.label) + "</span><br><span><small>" + _item.value + "</small></span>";
					return $('<li></li>').data('item.autocomplete', _item).html('<a><p>' + html + '</p></a>').get(0);
				}
			};
			var aw = new Awesomplete(input, config);
			input.addEventListener('awesomplete-selectcomplete', this.addChanged);
			aw.list = ps.employee_lables;
			$(document).bind('employeeLablesLoaded', function () {
				aw.list = ps.employee_lables;
			});
		}
	}, {
		key: "addChanged",
		value: function addChanged(e) {
			this.add = e.target.value;
		}
	}, {
		key: "addClicked",
		value: function addClicked(e) {
			e.preventDefault();
			var wo_name = this.props.name;
			var employee_name = this.add;
			//Call back for binding?
			var updateCallback = function (index) {
				return function (data) {
					this.updateFromServerParam(data, index);
				}.bind(this);
			}.bind(this);
			this.props.addEmployee(wo_name, employee_name);
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "panel panel-default row" },
				React.createElement(
					"div",
					{ className: "panel-heading" },
					React.createElement(
						"h4",
						{ className: "text-center" },
						" Time Sheet ",
						this.props.date,
						" for ",
						this.props.crew,
						" "
					)
				),
				React.createElement(
					"ul",
					{ className: "list-group" },
					React.createElement(
						"div",
						{ id: "forms" },
						this.props.employees
					)
				),
				React.createElement(
					"div",
					{ className: "panel-footer col-md-12 text-left list-group-item" },
					React.createElement(
						"form",
						{ className: "form-inline row " },
						React.createElement(
							"div",
							{ className: "text-center col-md-3 col-sm-2 col-xs-12 update_div_element" },
							React.createElement(
								"button",
								{ type: "button", className: "btn btn-success" },
								"Update"
							)
						),
						React.createElement(
							"div",
							{ className: "text-right col-md-6 col-sm-6 col-xs-4 " },
							React.createElement(
								"button",
								{
									type: "submit",
									className: "btn btn-default",
									onClick: this.addClicked
								},
								"+ Add"
							)
						),
						React.createElement(
							"div",
							{ className: "form-group text-left col-md-3 col-sm-4 col-xs-6 " },
							React.createElement(
								"div",
								{ className: "input-group" },
								React.createElement("input", { type: "text",
									ref: this.autocomplete,
									onChange: this.addChanged,
									className: "new_employees form-control awesomplete",
									placeholder: "employee" })
							)
						)
					)
				)
			);
		}
	}]);

	return TimeSheet;
}(React.Component);

exports.default = TimeSheet;

},{}],5:[function(require,module,exports){
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

},{"../utils/forms":10,"../utils/modal":11,"./workorderTask":8}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{"../utils/doctypeForm":9,"../utils/forms":10,"../utils/modal":11,"../vineyard/sprayForm":12,"./createIssue":6,"./taskCheck":7}],9:[function(require,module,exports){
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

},{"../utils/forms":10}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{"../utils/forms":10}],13:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DaysTimeSheets = require('../../public/js/modules/days_timesheets/DaysTimeSheets');

var _DaysTimeSheets2 = _interopRequireDefault(_DaysTimeSheets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*jshint ignore:start */
//import DaysWorkorders from '../../public/js/modules/days_workorders/DaysWorkorders'


//const app= document.getElementById('app');
var app = $('#app')[0];
var timesheets = $('#time')[0];

var WorkPage = function (_React$Component) {
	_inherits(WorkPage, _React$Component);

	function WorkPage(props) {
		_classCallCheck(this, WorkPage);

		/* bind ding ding */
		var _this = _possibleConstructorReturn(this, (WorkPage.__proto__ || Object.getPrototypeOf(WorkPage)).call(this, props));

		_this.mainClicked = _this.mainClicked.bind(_this);
		_this.workordersClicked = _this.workordersClicked.bind(_this);
		_this.timesheetClicked = _this.timesheetClicked.bind(_this);
		_this.handelClockIn = _this.handelClockIn.bind(_this);
		_this.handelRoute = _this.handelRoute.bind(_this);
		_this.stateUpdate = _this.stateUpdate.bind(_this);

		//Handel User lOad
		// if ( frappe.user_id == "Administrator" ){
		// 	window.location = "/desk";
		// }
		// if ( frappe.user_id == "Geust"){
		// 	window.location = "/login";
		// }
		_this.currentUser = ps.initCurrentUser();
		_this.currentUser.get({}, function (items) {
			if (this.currentUser.items.username == "Guest") {
				window.location = "/login";
			} else {
				$(document).trigger("userLoaded");
				//console.log("after Load",this.currentUser.items);
			}
		}.bind(_this));
		_this.state = { items: _this.currentUser.items };
		$(document).bind('userLoaded', _this.stateUpdate);

		//Routing
		$(window).on("hashchange", function () {
			this.handelRoute();
		}.bind(_this));
		var route = window.location.hash.slice(1);
		if (!route) route = "#main";
		_this.state.page = route;
		if (!window.location.hash) {
			window.location.hash = "#main";
		}
		$(window).trigger("hashchange");

		return _this;
	}

	_createClass(WorkPage, [{
		key: 'componentDidMount',
		value: function componentDidMount() {}
	}, {
		key: 'stateUpdate',
		value: function stateUpdate() {
			//alert("update");
			this.state.items = this.currentUser.items;
			this.setState(this.state);
		}
	}, {
		key: 'handelRoute',
		value: function handelRoute() {
			var route = window.location.hash.slice(1);
			var pages = {
				main: this.mainClicked,
				workorders: this.workordersClicked,
				timesheet: this.timesheetClicked
			}[route]();
		}
	}, {
		key: 'handelClockIn',
		value: function handelClockIn() {}
	}, {
		key: 'mainClicked',
		value: function mainClicked() {
			this.setState({ page: 'main' });
		}
	}, {
		key: 'workordersClicked',
		value: function workordersClicked() {

			this.setState({ page: 'workorders' });
		}
	}, {
		key: 'timesheetClicked',
		value: function timesheetClicked() {
			this.setState({ page: 'timesheet' });
		}
		//<AffixWrapper className="sticky_subnav text-center"  offset={140} height="40px"></AffixWrapper>

	}, {
		key: 'render',
		value: function render() {
			var output = '';
			if (this.state.items.username == "Guest" || this.state.items.username == "Administrator") {
				output = React.createElement(
					'h3',
					null,
					'Guest Or Admin'
				);
			} else if (this.state.items.length === 0) {
				output = React.createElement(
					'h3',
					null,
					'No User Data'
				);
			} else {
				output = React.createElement(
					'div',
					{ className: 'panel with-nav-tabs panel-primary' },
					React.createElement(
						'div',
						{ className: 'panel-heading' },
						React.createElement(
							'ul',
							{ className: 'nav nav-tabs' },
							React.createElement(
								'li',
								{ className: 'active' },
								React.createElement(
									'a',
									{ href: '#clockInTab', 'data-toggle': 'tab' },
									'Main'
								)
							),
							React.createElement(
								'li',
								null,
								React.createElement(
									'a',
									{ href: '#workOrderTab', 'data-toggle': 'tab' },
									'Work Orders'
								)
							),
							React.createElement(
								'li',
								null,
								React.createElement(
									'a',
									{ href: '#timeSheetTab', 'data-toggle': 'tab' },
									'Time Sheets'
								)
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'panel-body' },
						React.createElement(
							'div',
							{ className: 'tab-content' },
							React.createElement(_DaysTimeSheets2.default, {
								date: this.state.items.today,
								full_name: this.state.items.current_user.full_name,
								page: this.state.page,
								crew: this.state.items.crew
							})
						)
					)
				);
			}

			return React.createElement(
				'div',
				null,
				output
			);
		}
	}]);

	return WorkPage;
}(React.Component);

(function () {
	frappe.ready(function () {
		ReactDOM.render(React.createElement(WorkPage, null), timesheets);
	});
})();

},{"../../public/js/modules/days_timesheets/DaysTimeSheets":1}]},{},[13])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c190aW1lc2hlZXRzL0RheXNUaW1lU2hlZXRzLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy9kYXlzX3RpbWVzaGVldHMvY2xvY2tJbi5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c190aW1lc2hlZXRzL2VtcGxveWVlVGltZS5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c190aW1lc2hlZXRzL3RpbWVTaGVldC5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c193b3Jrb3JkZXJzL0RheXNXb3Jrb3JkZXJzLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy9kYXlzX3dvcmtvcmRlcnMvY3JlYXRlSXNzdWUuanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL2RheXNfd29ya29yZGVycy90YXNrQ2hlY2suanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL2RheXNfd29ya29yZGVycy93b3Jrb3JkZXJUYXNrLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9kb2N0eXBlRm9ybS5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdXRpbHMvZm9ybXMuanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL3V0aWxzL21vZGFsLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy92aW5leWFyZC9zcHJheUZvcm0uanN4IiwicHJvY2Vzc19zdWNjZXNzL3d3dy93b3JrcGFnZS93b3JrcGFnZS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFB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QUFBQSxTQUFJLFdBQVUsY0FBZDtBQUNJO0FBQUE7QUFBQSxVQUFJLFdBQVUsUUFBZDtBQUF1QjtBQUFBO0FBQUEsV0FBRyxNQUFLLGFBQVIsRUFBc0IsZUFBWSxLQUFsQztBQUFBO0FBQUE7QUFBdkIsUUFESjtBQUVJO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQSxXQUFHLE1BQUssZUFBUixFQUF3QixlQUFZLEtBQXBDO0FBQUE7QUFBQTtBQUFKLFFBRko7QUFHSTtBQUFBO0FBQUE7QUFBSTtBQUFBO0FBQUEsV0FBRyxNQUFLLGVBQVIsRUFBd0IsZUFBWSxLQUFwQztBQUFBO0FBQUE7QUFBSjtBQUhKO0FBRFIsTUFEWjtBQVNZO0FBQUE7QUFBQSxRQUFLLFdBQVUsWUFBZjtBQUNJO0FBQUE7QUFBQSxTQUFLLFdBQVUsYUFBZjtBQUNJO0FBQ2pCLGNBQU0sS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixLQUROO0FBRWpCLG1CQUFXLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsWUFBakIsQ0FBOEIsU0FGeEI7QUFHakIsY0FBTSxLQUFLLEtBQUwsQ0FBVyxJQUhBO0FBSWpCLGNBQU0sS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQjtBQUpOO0FBREo7QUFESjtBQVRaLEtBREQ7QUFzQkE7O0FBRUQsVUFBTztBQUFBO0FBQUE7QUFDTDtBQURLLElBQVA7QUFJQTs7OztFQXBIcUIsTUFBTSxTOztBQXVIN0IsQ0FBQyxZQUFVO0FBQ1YsUUFBTyxLQUFQLENBQWEsWUFBVTtBQUN0QixXQUFTLE1BQVQsQ0FDQSxvQkFBQyxRQUFELE9BREEsRUFFQyxVQUZEO0FBR0EsRUFKRDtBQU1BLENBUEQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5pbXBvcnQgRGF5c1dvcmtvcmRlcnMgZnJvbSAnLi4vZGF5c193b3Jrb3JkZXJzL0RheXNXb3Jrb3JkZXJzJ1xuaW1wb3J0IEVtcGxveWVlVGltZSBmcm9tICcuL2VtcGxveWVlVGltZSc7XG5pbXBvcnQgVGltZVNoZWV0IGZyb20gJy4vdGltZVNoZWV0JztcbmltcG9ydCBDbG9ja0luIGZyb20gJy4vY2xvY2tJbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERheXNUaW1lU2hlZXRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuc3RhdGU9e2l0ZW1zOltdfTtcblx0XHR0aGlzLnN0YXRlLnRpbWU9Jyc7XG5cdFx0dGhpcy5hZGQ9e307XG5cblx0XHQvKiAgICAgRG8gdGhlIGJpbmQgdGhpbmcgICAgICAqL1xuXG5cdFx0Ly9UaW1lIGVtcGxveWVlIGxpbmUgaXRlbVxuXHRcdHRoaXMudGltZUNoYW5nZWQ9dGhpcy50aW1lQ2hhbmdlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMudXBkYXRlVGltZT10aGlzLnVwZGF0ZVRpbWUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmRlbGV0ZUVtcGxveWVlPXRoaXMuZGVsZXRlRW1wbG95ZWUuYmluZCh0aGlzKTtcblxuXHRcdHRoaXMudXBkYXRlRnJvbVNlcnZlcj10aGlzLnVwZGF0ZUZyb21TZXJ2ZXIuYmluZCh0aGlzKTtcblx0XHR0aGlzLnRpbWVTaGVldFdyYXBwZXI9dGhpcy50aW1lU2hlZXRXcmFwcGVyLmJpbmQodGhpcyk7XG5cblx0XHR0aGlzLmFkZEVtcGxveWVlPXRoaXMuYWRkRW1wbG95ZWUuYmluZCh0aGlzKVxuXHRcdHRoaXMudXBkYXRlRnJvbVNlcnZlclBhcmFtPXRoaXMudXBkYXRlRnJvbVNlcnZlclBhcmFtLmJpbmQodGhpcyk7XG5cblx0XHR0aGlzLmNsb2NrSW49dGhpcy5jbG9ja0luLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jbG9ja091dD10aGlzLmNsb2NrT3V0LmJpbmQodGhpcyk7XG5cdFx0LyogICAgZW5kIEJpbmQgZGluZyBkaW5nICAgICAgICAgKi9cblxuXHRcdHRoaXMuYXV0b2NvbXBsZXRlQXJyPVtdO1xuXHRcdHZhciBhcmdzPXt9O1xuXG5cdFx0Ly9HcmFiIHRoZSBlbXBsb3llZSB0aW1lc2hlZXQgZGF0YVxuXHRcdHRoaXMub2JqVG9vbD1wcy5pbml0VGltZVNoZWV0cygpXG5cdFx0dGhpcy5vYmpUb29sLmdldCh7ZGF0ZTpwcm9wcy5kYXRlfSxmdW5jdGlvbigpe1xuXHRcdFx0dGhpcy51cGRhdGVGcm9tU2VydmVyKCk7XG5cdFx0XHR0aGlzLm9ialRvb2wucmVhY3RTZXR1cCh0aGlzLnVwZGF0ZUZyb21TZXJ2ZXIpO1xuXHRcdH0uYmluZCh0aGlzKSk7XG5cblx0XHRpZiAodGhpcy5vYmpUb29sLml0ZW1zPT09dW5kZWZpbmVkIHx8dGhpcy5vYmpUb29sLml0ZW1zPT09IDAgKXtcblx0XHR9ZWxzZXt0aGlzLnN0YXRlLml0ZW1zPXRoaXMub2JqVG9vbC5pdGVtczt9XG5cblx0XHQvL0dyYWIgdGhlIGVtcGxveWVlIGxpc3Rcblx0XHR2YXIgdG9vbD1wcy5pbml0RW1wbG95ZWVMaXN0KCk7XG5cdFx0dG9vbC5nZXQoe30sZnVuY3Rpb24oKXtcblx0XHRcdHBzLmVtcGxveWVlX2xhYmxlcz0gdG9vbC5pdGVtcy5tYXAoZnVuY3Rpb24ob2JqKSB7XG5cdFx0XHRcdHZhciByT2JqID0ge307XG5cdFx0XHRcdHJPYmoubGFiZWw9b2JqLmZ1bGxfbmFtZTtcblx0XHRcdFx0ck9iai52YWx1ZT1vYmoubmFtZTtcblx0XHRcdFx0cmV0dXJuIHJPYmo7XG5cdFx0XHR9KTtcblx0XHRcdCQoZG9jdW1lbnQpLnRyaWdnZXIoXCJlbXBsb3llZUxhYmxlc0xvYWRlZFwiKTtcblx0XHR9KTtcblxuXG5cblxuXHR9XG5cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBoZWxwZXIgRnVuY3Rpb25cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS1cblx0dXBkYXRlRnJvbVNlcnZlcigpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe2l0ZW1zOnRoaXMub2JqVG9vbC5pdGVtc30pO1xuXHR9XG5cdHVwZGF0ZUZyb21TZXJ2ZXJQYXJhbShkYXRhLGluZGV4KXtcblx0XHR0aGlzLm9ialRvb2wuaXRlbXNbaW5kZXhdPWRhdGE7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7aXRlbXM6dGhpcy5vYmpUb29sLml0ZW1zfSk7XG5cdH1cblx0Y3Jld3NUaW1lc2hlZXRJbmRleChjcmV3KXtcblx0XHRmb3IgKHZhciBpPTA7IGkgPCB0aGlzLm9ialRvb2wuaXRlbXMubGVuZ3RoOyBpKyspe1xuXHRcdFx0dmFyIGl0ZW09dGhpcy5vYmpUb29sLml0ZW1zW2ldO1xuXHRcdFx0aWYoaXRlbS5jcmV3PT1jcmV3KXtcblx0XHRcdFx0cmV0dXJuIGk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGdldEluZGV4VGltZXNoZWV0KHRpbWVzaGVldCl7XG5cdFx0cmV0dXJuIHRoaXMub2JqVG9vbC5nZXRfaW5kZXhfb2ZfaXRlbSh0aW1lc2hlZXQpO1xuXHR9XG5cdGdldEluZGV4RW1wbG95ZWUodGltZXNoZWV0SW5kZXgsZW1wbG95ZWVOYW1lKXtcblx0XHR2YXIgZW1wbG95ZWVzPXRoaXMub2JqVG9vbC5pdGVtc1t0aW1lc2hlZXRJbmRleF0uZW1wbG95ZWVzO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZW1wbG95ZWVzLmxlbmd0aDsgaSsrKXtcblx0XHRcdGlmIChlbXBsb3llZU5hbWU9PWVtcGxveWVlc1tpXS5lbXBsb3llZSl7XG5cdFx0XHRcdHJldHVybiBpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHR9XG5cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyAgICAgICBUaW1lc2hlZXQgV3JhcHBlciBGdW5jdGlvbnNcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRjbG9ja0luKHRpbWUsY3Jldyl7XG5cblx0XHR2YXIgdHNfaW5kZXg9dGhpcy5jcmV3c1RpbWVzaGVldEluZGV4KGNyZXcpO1xuXG5cdFx0dGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXM7XG5cdFx0Zm9yICh2YXIgaT0wOyBpIDwgdGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXMubGVuZ3RoOyBpKyspe1xuXHRcdFx0dGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXNbaV0uc3RhcnQ9dGltZTtcblx0XHR9XG5cdFx0dGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5zdGF0dXM9XCJDbG9ja2VkIEluXCI7XG5cdFx0dGhpcy5vYmpUb29sLnVwZGF0ZSh0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdKTtcblx0XHR0aGlzLnNldFN0YXRlKHtpdGVtczp0aGlzLm9ialRvb2wuaXRlbXN9KTtcblx0fVxuXHRjbG9ja091dCh0aW1lLGNyZXcpe1xuXG5cdFx0dmFyIHRzX2luZGV4PXRoaXMuY3Jld3NUaW1lc2hlZXRJbmRleChjcmV3KTtcblxuXHRcdHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzO1xuXHRcdGZvciAodmFyIGk9MDsgaSA8IHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzLmxlbmd0aDsgaSsrKXtcblx0XHRcdHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzW2ldLmVuZD10aW1lO1xuXHRcdH1cblx0XHR0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLnN0YXR1cz1cIkNsb2NrZWQgT3V0XCI7XG5cdFx0dGhpcy5vYmpUb29sLnVwZGF0ZSh0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdKTtcblx0XHR0aGlzLnNldFN0YXRlKHtpdGVtczp0aGlzLm9ialRvb2wuaXRlbXN9KTtcblx0fVxuXHRhZGRFbXBsb3llZSh0c19uYW1lLCBlbXBsb3llZV9uYW1lKXtcblx0XHR2YXIgdHNfaW5kZXggPSB0aGlzLmdldEluZGV4VGltZXNoZWV0KHRzX25hbWUpO1xuXHRcdHZhciBlbXBsb3llZUluZGV4ID0gdGhpcy5nZXRJbmRleEVtcGxveWVlKHRzX2luZGV4LGVtcGxveWVlX25hbWUpO1xuXG5cdFx0dmFyIHVwZGF0ZUNhbGxiYWNrPWZ1bmN0aW9uKGluZGV4KXtcblx0XHRcdHJldHVybiBmdW5jdGlvbihkYXRhKXtcblx0XHRcdFx0dGhpcy51cGRhdGVGcm9tU2VydmVyUGFyYW0oZGF0YSxpbmRleCk7XG5cdFx0XHR9LmJpbmQodGhpcyk7XG5cdFx0fS5iaW5kKHRoaXMpO1xuXG5cdFx0Zm9yICh2YXIgaT0wOyBpIDwgdGhpcy5vYmpUb29sLml0ZW1zLmxlbmd0aDsgaSsrKXtcblx0XHRcdHZhciBpdGVtID0gdGhpcy5vYmpUb29sLml0ZW1zW2ldO1xuXHRcdFx0aWYoaXRlbS5uYW1lPT10c19uYW1lKXtcblx0XHRcdFx0Zm9yICh2YXIgeD0wOyB4IDwgaXRlbS5lbXBsb3llZXMubGVuZ3RoOyB4Kyspe1xuXHRcdFx0XHRcdHZhciBjb250YWluZXIgPSBpdGVtLmVtcGxveWVlc1t4XTtcblx0XHRcdFx0XHRpZiAoY29udGFpbmVyLmVtcGxveWVlPT1lbXBsb3llZV9uYW1lKXtcblx0XHRcdFx0XHRcdHJldHVybiBcImR1cGxpY2F0ZVwiO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLm9ialRvb2wuaXRlbXNbaV0uZW1wbG95ZWVzLnB1c2goeyBlbXBsb3llZSA6IGVtcGxveWVlX25hbWUsIG5ldzonMSd9KTtcblx0XHRcdFx0dGhpcy5vYmpUb29sLnVwZGF0ZSh0aGlzLm9ialRvb2wuaXRlbXNbaV0sdXBkYXRlQ2FsbGJhY2soaSksMSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0dmFyIGRvbmU9MTtcblx0XHRcdFx0aWYoaXRlbS5lbXBsb3llZXMubGVuZ3RoPjApe1xuXHRcdFx0XHRcdGZvciAodmFyIHg9MDsgeCA8IGl0ZW0uZW1wbG95ZWVzLmxlbmd0aCAmJiBkb25lOyB4Kyspe1xuXHRcdFx0XHRcdFx0dmFyIGNvbnRhaW5lciA9IGl0ZW0uZW1wbG95ZWVzW3hdO1xuXHRcdFx0XHRcdFx0aWYgKGNvbnRhaW5lci5lbXBsb3llZT09ZW1wbG95ZWVfbmFtZSl7XG5cdFx0XHRcdFx0XHRcdHRoaXMub2JqVG9vbC5pdGVtc1tpXS5lbXBsb3llZXMuc3BsaWNlKHgsIDEpO1xuXHRcdFx0XHRcdFx0XHR0aGlzLm9ialRvb2wuY2hhbmdlZCh0aGlzLm9ialRvb2wuaXRlbXNbaV0pO1xuXHRcdFx0XHRcdFx0XHRkb25lPTA7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdH07XG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vICAgICAgICAgICBUaW1lc2hlZXQgV3JhcHBlclxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHR0aW1lU2hlZXRXcmFwcGVyKGl0ZW0saW5kZXgpe1xuXHRcdHZhciBlbXBsb3llZV9vdXRwdXQ9W107XG5cdFx0aWYoaXRlbS5lbXBsb3llZXM9PT11bmRlZmluZWQpe1xuXG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHR2YXIgZW1wbG95ZWVPdXRwdXQ9aXRlbS5lbXBsb3llZXMubWFwKGZ1bmN0aW9uKGl0ZW1fZW1wbG95ZWUsaW5kZXhfZW1wbG95ZWUpe1xuXHRcdFx0IFx0ZW1wbG95ZWVfb3V0cHV0LnB1c2godGhpcy5lbXBsb3llZUxpbmVJdGVtKGl0ZW1fZW1wbG95ZWUsaXRlbS5uYW1lLGluZGV4X2VtcGxveWVlKSk7XG5cdFx0XHR9LmJpbmQodGhpcykpO1xuXHRcdH1cblxuXHRcdHJldHVybihcblxuXHRcdFx0PFRpbWVTaGVldFxuXHRcdFx0XHRrZXk9e2luZGV4fVxuXHRcdFx0XHRuYW1lPXtpdGVtLm5hbWV9XG5cdFx0XHRcdGRhdGU9e2l0ZW0uZGF0ZX1cblx0XHRcdFx0Y3Jldz17aXRlbS5jcmV3fVxuXHRcdFx0XHRlbXBsb3llZXM9e2VtcGxveWVlX291dHB1dH1cblx0XHRcdFx0YWRkRW1wbG95ZWU9e3RoaXMuYWRkRW1wbG95ZWV9XG5cdFx0XHRcdG9uVXBkYXRlPXt0aGlzLnVwZGF0ZX1cblx0XHRcdC8+XG5cblx0XHQpO1xuXHR9XG5cblxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vICAgICAgIEVtcGxveWVlIFRpbWUgRm9ybSBMaW5laXRlbVxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRkZWxldGVFbXBsb3llZShlbXBsb3llZSx0aW1lc2hlZXQpe1xuXHRcdHZhciB0c19pbmRleCA9IHRoaXMuZ2V0SW5kZXhUaW1lc2hlZXQodGltZXNoZWV0KTtcblx0XHR2YXIgZG9uZT0xO1xuXHRcdHZhciBpdGVtPXRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF07XG5cdFx0aWYoaXRlbS5lbXBsb3llZXMubGVuZ3RoPjApe1xuXHRcdFx0Zm9yICh2YXIgeD0wOyB4IDwgaXRlbS5lbXBsb3llZXMubGVuZ3RoICYmIGRvbmU7IHgrKyl7XG5cdFx0XHRcdHZhciBjb250YWluZXIgPSBpdGVtLmVtcGxveWVlc1t4XTtcblx0XHRcdFx0aWYgKGNvbnRhaW5lci5lbXBsb3llZT09ZW1wbG95ZWUpe1xuXHRcdFx0XHRcdHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzLnNwbGljZSh4LCAxKTtcblx0XHRcdFx0XHQvL8aSY29uc29sZS5sb2codGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XSk7XG5cdFx0XHRcdFx0dGhpcy5vYmpUb29sLnVwZGF0ZSh0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdKTtcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtpdGVtczp0aGlzLm9ialRvb2wuaXRlbXN9KTtcblx0XHRcdFx0XHRkb25lPTA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHR0aW1lQ2hhbmdlZChwb3NpdGlvbixlbXBsb3llZSx0aW1lc2hlZXQsdmFsdWUpe1xuXHRcdHZhciB0c19pbmRleCA9IHRoaXMuZ2V0SW5kZXhUaW1lc2hlZXQodGltZXNoZWV0KTtcblx0XHR2YXIgZW1wbG95ZWVJbmRleCA9IHRoaXMuZ2V0SW5kZXhFbXBsb3llZSh0c19pbmRleCxlbXBsb3llZSk7XG5cdFx0dGhpcy5zdGF0XG5cdFx0aWYocG9zaXRpb249PSdlbmQnKXtcblx0XHRcdHRoaXMuc3RhdGUuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlc1tlbXBsb3llZUluZGV4XS5lbmQ9dmFsdWU7XG5cdFx0fVxuXHRcdGVsc2V7dGhpcy5zdGF0ZS5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzW2VtcGxveWVlSW5kZXhdLnN0YXJ0PXZhbHVlfVxuXHQgICAgdGhpcy5zZXRTdGF0ZSh7aXRlbXM6dGhpcy5zdGF0ZS5pdGVtc30pO1xuXHR9XG5cdHVwZGF0ZVRpbWUocG9zaXRpb24sZW1wbG95ZWUsdGltZXNoZWV0LHZhbHVlKXtcblx0XHR2YXIgdHNfaW5kZXggPSB0aGlzLmdldEluZGV4VGltZXNoZWV0KHRpbWVzaGVldCk7XG5cdFx0dmFyIGVtcGxveWVlSW5kZXggPSB0aGlzLmdldEluZGV4RW1wbG95ZWUodHNfaW5kZXgsZW1wbG95ZWUpO1xuXHRcdHZhciBzYXZlPTA7XG5cdFx0dmFsdWU9cHMudGltZV9hZGRfZGlnaXRzKHZhbHVlKVxuXHRcdGlmKHBvc2l0aW9uPT0nZW5kJyAmJiBwcy50aW1lX2FkZF9mcm9udF96ZXJvKHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzW2VtcGxveWVlSW5kZXhdLmVuZCkgIT0gcHMudGltZV9hZGRfZGlnaXRzKHZhbHVlKSl7XG5cdFx0XHR0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlc1tlbXBsb3llZUluZGV4XS5lbmQ9cHMudGltZV9hZGRfZGlnaXRzKHZhbHVlKTtcblx0XHRcdHNhdmU9MTtcblx0XHR9XG5cdCAgICBpZihwb3NpdGlvbj09J3N0YXJ0JyAmJiBwcy50aW1lX2FkZF9mcm9udF96ZXJvKHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzW2VtcGxveWVlSW5kZXhdLnN0YXJ0KSAhPSBwcy50aW1lX2FkZF9kaWdpdHModmFsdWUpKXtcblx0ICAgIFx0dGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXNbZW1wbG95ZWVJbmRleF0uc3RhcnQ9cHMudGltZV9hZGRfZGlnaXRzKHZhbHVlKTtcblx0ICAgIFx0c2F2ZT0xO1xuXHQgICAgfVxuXHQgICAgaWYoc2F2ZSl7XG5cdFx0ICAgIHRoaXMuc2V0U3RhdGUoe2l0ZW1zOnRoaXMub2JqVG9vbC5pdGVtc30pO1xuXHRcdCAgICB0aGlzLm9ialRvb2wudXBkYXRlKHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0sZnVuY3Rpb24oKXtcblx0XHQgICAgXHRwcy5zdWNjZXNzQWxlcnQodGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXNbZW1wbG95ZWVJbmRleF0uZW1wbG95ZWVfbmFtZStcIiB0aW1lIHVwZGF0ZWQhXCIpO1xuXHRcdCAgICB9LmJpbmQodGhpcykpO1xuXHRcdH1cblx0fVxuXHRlbXBsb3llZUxpbmVJdGVtKGVtcGxveWVlX2NvbnRhaW5lcix0aW1lX3NoZWV0LGVtcGxveWVlX2luZGV4KXtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8RW1wbG95ZWVUaW1lXG5cdFx0XHRcdGtleT17ZW1wbG95ZWVfaW5kZXh9XG5cdFx0XHRcdHRpbWVzaGVldD17dGltZV9zaGVldH1cblx0XHRcdFx0ZW1wbG95ZWVfbmFtZT17ZW1wbG95ZWVfY29udGFpbmVyLmVtcGxveWVlX25hbWV9XG5cdFx0XHRcdGVtcGxveWVlPXtlbXBsb3llZV9jb250YWluZXIuZW1wbG95ZWV9XG5cdFx0XHRcdHN0YXJ0PXtwcy50aW1lX2FkZF9mcm9udF96ZXJvKGVtcGxveWVlX2NvbnRhaW5lci5zdGFydCl9XG5cdFx0XHRcdGVuZD17cHMudGltZV9hZGRfZnJvbnRfemVybyhlbXBsb3llZV9jb250YWluZXIuZW5kKX1cblx0XHRcdFx0dXBkYXRlVGltZT17dGhpcy51cGRhdGVUaW1lfVxuXHRcdFx0XHR0aW1lQ2hhbmdlZD17dGhpcy50aW1lQ2hhbmdlZH1cblx0XHRcdFx0ZGVsZXRlRW1wbG95ZWU9e3RoaXMuZGVsZXRlRW1wbG95ZWV9XG5cdFx0XHQvPlxuXHRcdCk7XG5cdH1cblxuXG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyAgICAgICAgUmVuZGVyXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0cmVuZGVyKCl7XG5cdFx0Ly9oYW5kZWwgZW1wdHkgcmV0dXJuXG5cdFx0aWYgKHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoPT09MHx8dGhpcy5zdGF0ZS5pdGVtcz09PXVuZGVmaW5lZCl7XG5cdFx0XHRyZXR1cm4gKDxkaXY+Tm8gVGltZSBTaGVldHMsIHN0YXJ0IGJ5IDxhIGhyZWY9XCIvZGVza1wiPmNyZWF0aW5nIHNvbWUgY3Jld3MhPC9hPjwvZGl2Pik7XG5cdFx0fVxuXHRcdHZhciBvdXRwdXQ9W11cblx0XHR0aGlzLnN0YXRlLml0ZW1zLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCl7XG5cdFx0XHRpZihpdGVtLmNyZXc9PXRoaXMucHJvcHMuY3Jldyl7XG5cdFx0XHRcdG91dHB1dC51bnNoaWZ0KHRoaXMudGltZVNoZWV0V3JhcHBlcihpdGVtLGluZGV4KSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0b3V0cHV0LnB1c2godGhpcy50aW1lU2hlZXRXcmFwcGVyKGl0ZW0saW5kZXgpKTtcblx0XHRcdH1cblx0XHR9LmJpbmQodGhpcykpO1xuXG5cdFx0dmFyIHRzX2luZGV4PXRoaXMuY3Jld3NUaW1lc2hlZXRJbmRleCh0aGlzLnByb3BzLmNyZXcpO1xuXHRcdHZhciBzdGF0dXM9Jyc7XG5cdFx0aWYgKHRzX2luZGV4PT11bmRlZmluZWQpe3ZhciBzdGF0dXM9ZmFsc2U7fVxuXHRcdGVsc2V7c3RhdHVzID10aGlzLnN0YXRlLml0ZW1zW3RzX2luZGV4XS5zdGF0dXN9XG5cblxuXHRcdC8vTUFJTiBSRU5ERVJcblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInRhYi1wYW5lIGZhZGUgaW4gYWN0aXZlXCIgaWQ9XCJjbG9ja0luVGFiXCI+XG5cdFx0XHRcdFx0PENsb2NrSW5cblx0XHRcdFx0XHRcdGNsb2NrSW49e3RoaXMuY2xvY2tJbn1cblx0XHRcdFx0XHRcdGNsb2NrT3V0PXt0aGlzLmNsb2NrT3V0fVxuXHRcdFx0XHRcdFx0c3RhdHVzPXtzdGF0dXN9XG5cdFx0XHRcdFx0XHRmdWxsX25hbWU9e3RoaXMucHJvcHMuZnVsbF9uYW1lfVxuXHRcdFx0XHRcdFx0ZGF0ZT17dGhpcy5wcm9wcy5kYXRlfVxuXHRcdFx0XHRcdFx0Y3Jldz17dGhpcy5wcm9wcy5jcmV3fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInRhYi1wYW5lIGZhZGVcIiBpZD1cInRpbWVTaGVldFRhYlwiPlxuXHRcdFx0XHRcdDxici8+XG5cdFx0XHRcdFx0e291dHB1dH1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidGFiLXBhbmUgZmFkZVwiIGlkPVwid29ya09yZGVyVGFiXCI+XG5cdFx0XHRcdFx0XHQ8RGF5c1dvcmtvcmRlcnNcblx0XHRcdFx0XHRcdFx0ZGF0ZT17dGhpcy5wcm9wcy5kYXRlfVxuXHRcdFx0XHRcdFx0XHRjcmV3PXt0aGlzLnByb3BzLmNyZXd9XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXG5cdFx0KTtcblxuXHR9O1xufVxuIiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbG9ja0luIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMudG9nZ2xlVGltZUlucHV0PXRoaXMudG9nZ2xlVGltZUlucHV0LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jbG9ja0luPXRoaXMuY2xvY2tJbi5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY2xvY2tPdXQ9dGhpcy5jbG9ja091dC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMub25DaGFuZ2U9dGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpO1xuXG5cdFx0dGhpcy5zdGF0ZT17XG5cdFx0XHRkYXRlOm5ldyBEYXRlKCksXG5cdFx0XHRzcGVjaWZ5VGltZTpmYWxzZVxuXHRcdH07XG5cblx0fVxuXHRjbG9ja0luKGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRpZih0aGlzLnN0YXRlLnNwZWNpZnlUaW1lPT1mYWxzZSl7XG5cdFx0XHR2YXIgdGltZT10aGlzLnN0YXRlLmRhdGUudG9Mb2NhbGVUaW1lU3RyaW5nKFtdLCB7aG91cjogJzItZGlnaXQnLCBtaW51dGU6JzItZGlnaXQnLGhvdXIxMjogZmFsc2V9KVxuXHRcdFx0Ly9jb25zb2xlLmxvZyh0aW1lKTtcblx0XHRcdHBzLnN1Y2Nlc3NBbGVydChcIkNsb2NrZWQgaW4gYXQgXCIgKyB0aGlzLnN0YXRlLmRhdGUudG9Mb2NhbGVUaW1lU3RyaW5nKFtdLCB7aG91cjogJzItZGlnaXQnLCBtaW51dGU6JzItZGlnaXQnfSkpXG5cdFx0XHR0aGlzLnByb3BzLmNsb2NrSW4odGltZSwgdGhpcy5wcm9wcy5jcmV3KVxuXHRcdH1lbHNle1xuXHRcdFx0Ly9jb25zb2xlLmxvZyh0aGlzLnN0YXRlLnRpbWUpXG5cdFx0XHRpZih0aGlzLnN0YXRlLnRpbWUhPXVuZGVmaW5lZCl7XG5cdFx0XHRcdHRoaXMucHJvcHMuY2xvY2tJbih0aGlzLnN0YXRlLnRpbWUsIHRoaXMucHJvcHMuY3Jldyk7XG5cdFx0XHRcdHBzLnN1Y2Nlc3NBbGVydChcIkNsb2NrZWQgaW5cIik7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Ly9pbnZhbGlkIHRpbWUgZXJyb3Jcblx0XHRcdFx0cHMuZmFpbEFsZXJ0KFwiSW52YWxpZCB0aW1lLlwiKVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRjbG9ja091dChlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0aWYodGhpcy5zdGF0ZS5zcGVjaWZ5VGltZT09ZmFsc2Upe1xuXHRcdFx0dmFyIHRpbWU9dGhpcy5zdGF0ZS5kYXRlLnRvTG9jYWxlVGltZVN0cmluZyhbXSwge2hvdXI6ICcyLWRpZ2l0JywgbWludXRlOicyLWRpZ2l0Jyxob3VyMTI6IGZhbHNlfSlcblx0XHRcdC8vY29uc29sZS5sb2codGltZSk7XG5cdFx0XHRwcy5zdWNjZXNzQWxlcnQoXCJDbG9ja2VkIG91dCBhdCBcIiArIHRoaXMuc3RhdGUuZGF0ZS50b0xvY2FsZVRpbWVTdHJpbmcoW10sIHtob3VyOiAnMi1kaWdpdCcsIG1pbnV0ZTonMi1kaWdpdCd9KStcIiBIYXZlIGEgZ3JlYXQgbmlnaHQhXCIpXG5cdFx0XHR0aGlzLnByb3BzLmNsb2NrT3V0KHRpbWUsIHRoaXMucHJvcHMuY3Jldylcblx0XHR9ZWxzZXtcblx0XHRcdC8vY29uc29sZS5sb2codGhpcy5zdGF0ZS50aW1lKVxuXHRcdFx0aWYodGhpcy5zdGF0ZS50aW1lIT11bmRlZmluZWQpe1xuXHRcdFx0XHR0aGlzLnByb3BzLmNsb2NrT3V0KHRoaXMuc3RhdGUudGltZSwgdGhpcy5wcm9wcy5jcmV3KTtcblx0XHRcdFx0cHMuc3VjY2Vzc0FsZXJ0KFwiQ2xvY2tlZCBPdXQhICBIYXZlIGEgZ3JlYXQgbmlnaHQhXCIpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdC8vaW52YWxpZCB0aW1lIGVycm9yXG5cdFx0XHRcdHBzLmZhaWxBbGVydChcIkludmFsaWQgdGltZS5cIilcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0dG9nZ2xlVGltZUlucHV0KGUpe1xuXHRcdC8vY29uc29sZS5sb2codGhpcy5zdGF0ZS5zcGVjaWZ5VGltZSk7XG5cdFx0aWYodGhpcy5zdGF0ZS5zcGVjaWZ5VGltZSl7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtzcGVjaWZ5VGltZTpmYWxzZX0pO1xuXHRcdH1cblx0XHRlbHNle3RoaXMuc2V0U3RhdGUoe3NwZWNpZnlUaW1lOnRydWV9KTt9XG5cdH1cblx0b25DaGFuZ2UoZSl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7dGltZTplLnRhcmdldC52YWx1ZX0pO1xuXHR9XG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdHRoaXMudGltZXJJRCA9IHNldEludGVydmFsKCgpID0+IHRoaXMudGljaygpLDEwMDAwKTtcblx0fVxuXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuXHRcdGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcklEKTtcblx0fVxuXG5cdHRpY2soKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRkYXRlOiBuZXcgRGF0ZSgpXG5cdFx0fSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cblx0XG5cdFx0dmFyIHZhbHVlcz17XG5cdFx0XHQnQ3JlYXRlZCc6W3RoaXMuY2xvY2tJbiwnQ2xvY2sgSW4nLCdidG4gYnRuLWxnIGJ0bi1zdWNjZXNzIGJ0bi1ibG9jayddLFxuXHRcdFx0J0Nsb2NrZWQgSW4nOlt0aGlzLmNsb2NrT3V0LCAnQ2xvY2sgT3V0JywgJ2J0biBidG4tbGcgYnRuLXN1Y2Nlc3MgYnRuLWJsb2NrJyBdLFxuXHRcdFx0J0Nsb2NrZWQgT3V0JzpbdGhpcy5jbG9ja091dCwgJ0NoYW5nZSBDbG9ja291dCBUaW1lJywnYnRuIGJ0bi1sZyBidG4tc3VjY2VzcyBidG4tYmxvY2snXSxcblx0XHRcdCdTdWJtaW50ZWQnOlsnJywnQWxyZWFkeSBTdWJtaW50ZWQnLCdidG4gYnRuLWxnIGJ0bi1zdWNjZXNzIGJ0bi1ibG9jayddLFxuXHRcdFx0J0Fwcm92ZWQnOlsnJywnQWxyZWFkeSBTdWJtaW50ZWQnLCdidG4gYnRuLWxnIGJ0bi1zdWNjZXNzIGJ0bi1ibG9jayddXG5cdFx0fVt0aGlzLnByb3BzLnN0YXR1c107XG5cdFx0dmFyIG91dHB1dD0nJztcblx0XHRpZiAodmFsdWVzPT11bmRlZmluZWQpe1xuXHRcdFx0b3V0cHV0PSg8YSBocmVmPVwiI3RpbWVzaGVldFwiPllvdSBhcmUgbm90IGluIGEgVGltZSBTaGVldCBhZGQgeW91cnNlbGYuPC9hPik7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHR2YXIgaW5wdXRGaWVsZCA9ICggPGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9e3ZhbHVlc1syXX0gb25DbGljaz17dmFsdWVzWzBdfSB2YWx1ZT17dmFsdWVzWzFdfSAvPik7XG5cdFx0XHRvdXRwdXQ9KFxuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8aDMgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cblx0XHRcdFx0XHRXZWxjb21lIDxzcGFuIGNsYXNzTmFtZT1cInVzZXJuYW1lXCI+e3RoaXMucHJvcHMuZnVsbF9uYW1lfTwvc3Bhbj5cblx0XHRcdFx0PC9oMz5cblx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+e3RoaXMuc3RhdGUuZGF0ZS50b0xvY2FsZVRpbWVTdHJpbmcoW10sIHtob3VyOiAnMi1kaWdpdCcsIG1pbnV0ZTonMi1kaWdpdCd9KX0gb24ge3RoaXMuc3RhdGUuZGF0ZS50b0RhdGVTdHJpbmcoKX0gPC9oMz5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2Nsb2NrSW4nPlxuXHRcdFx0XHRcdDxmb3JtIGNsYXNzTmFtZT1cImZvcm0tY2hlY2tpblwiIHJvbGU9XCJmb3JtXCI+XG5cdFx0XHRcdFx0XHR7aW5wdXRGaWVsZH1cblx0XHRcdFx0XHRcdDxici8+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndGV4dC1jZW50ZXInPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PGlucHV0IFxuXHRcdFx0XHRcdFx0XHRcdFx0dHlwZT1cInRpbWVcIiBcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5zdGF0ZS5zcGVjaWZ5VGltZSA/ICdmb3JtLWNvbnRyb2wgc21hbGwtdGltZSc6J2hpZGRlbid9IFxuXHRcdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG5cdFx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxici8+XG5cdFx0XHRcdFx0XHRcdDxhIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiIG9uQ2xpY2s9e3RoaXMudG9nZ2xlVGltZUlucHV0fT57dGhpcy5zdGF0ZS5zcGVjaWZ5VGltZT8nIC0gVXNlIEN1cnJlbnQgVGltZSc6JyArIFNwZWNpZnkgYSBUaW1lJ308L2E+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Zvcm0+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59IiwiXG4vKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERheXNUaW1lU2hlZXRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdC8vQmluZGluZyBkaW5nXG5cdFx0dGhpcy5jaGFuZ2VkU3RhcnQ9dGhpcy5jaGFuZ2VkU3RhcnQuYmluZCh0aGlzKVxuXHRcdHRoaXMuY2hhbmdlZEVuZD10aGlzLmNoYW5nZWRFbmQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnVwZGF0ZVN0YXJ0PXRoaXMudXBkYXRlU3RhcnQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnVwZGF0ZUVuZD10aGlzLnVwZGF0ZUVuZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZGVsZXRlPXRoaXMuZGVsZXRlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5rZXlQcmVzc2VkU3RhcnQ9dGhpcy5rZXlQcmVzc2VkU3RhcnQuYmluZCh0aGlzKTtcblx0XHR0aGlzLmtleVByZXNzZWRFbmQ9dGhpcy5rZXlQcmVzc2VkRW5kLmJpbmQodGhpcyk7XG5cdH1cblx0Y2hhbmdlZFN0YXJ0KGUpe1xuXHRcdHRoaXMucHJvcHMudGltZUNoYW5nZWQgICgnc3RhcnQnLHRoaXMucHJvcHMuZW1wbG95ZWUsdGhpcy5wcm9wcy50aW1lc2hlZXQsZS50YXJnZXQudmFsdWUpO1xuXHR9XG5cdGNoYW5nZWRFbmQoZSl7XG5cdFx0dGhpcy5wcm9wcy50aW1lQ2hhbmdlZCgnZW5kJyx0aGlzLnByb3BzLmVtcGxveWVlLHRoaXMucHJvcHMudGltZXNoZWV0LGUudGFyZ2V0LnZhbHVlKTtcblx0fVxuXHR1cGRhdGVTdGFydChlKXtcblx0XHRpZihlLnRhcmdldC52YWx1ZSE9Jycpe1xuXHRcdFx0dGhpcy5wcm9wcy51cGRhdGVUaW1lKCdzdGFydCcsdGhpcy5wcm9wcy5lbXBsb3llZSx0aGlzLnByb3BzLnRpbWVzaGVldCwgZS50YXJnZXQudmFsdWUpO1xuXHRcdH1cblx0fVxuXHR1cGRhdGVFbmQoZSl7XG5cdFx0aWYoZS50YXJnZXQudmFsdWUhPScnKXtcblx0XHRcdHRoaXMucHJvcHMudXBkYXRlVGltZSgnZW5kJyx0aGlzLnByb3BzLmVtcGxveWVlLHRoaXMucHJvcHMudGltZXNoZWV0LCBlLnRhcmdldC52YWx1ZSk7XG5cdFx0fVxuXHR9XG5cdGRlbGV0ZShlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5wcm9wcy5kZWxldGVFbXBsb3llZSh0aGlzLnByb3BzLmVtcGxveWVlLHRoaXMucHJvcHMudGltZXNoZWV0KTtcblx0fVxuXHRrZXlQcmVzc2VkU3RhcnQoZSkge1xuXHQgICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSB7XG5cdCAgICBcdGUucHJldmVudERlZmF1bHQoKTtcblx0ICAgIFx0aWYodGhpcy5wcm9wcy5zdGFydCE9Jycpe1xuXHRcdFx0XHR0aGlzLnByb3BzLnVwZGF0ZVRpbWUoJ3N0YXJ0Jyx0aGlzLnByb3BzLmVtcGxveWVlLHRoaXMucHJvcHMudGltZXNoZWV0LCB0aGlzLnByb3BzLnN0YXJ0KTtcblx0XHRcdH1cblx0ICAgIH1cblx0IH1cblx0a2V5UHJlc3NlZEVuZChlKSB7XG5cdCAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcblx0ICAgIFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHQgICAgXHRpZih0aGlzLnByb3BzLmVuZCE9Jycpe1xuXHRcdFx0XHR0aGlzLnByb3BzLnVwZGF0ZVRpbWUoJ3N0YXJ0Jyx0aGlzLnByb3BzLmVtcGxveWVlLHRoaXMucHJvcHMudGltZXNoZWV0LCB0aGlzLnByb3BzLmVuZCk7XG5cdFx0XHR9XG5cdCAgICB9XG5cdCB9XG5cdHJlbmRlcigpe1xuXHRcdHJldHVybihcblx0XHRcdDxsaSBjbGFzc05hbWU9XCJsaXN0LWdyb3VwLWl0ZW1cIiA+XG5cdFx0XHRcdDxmb3JtICBjbGFzc05hbWU9XCJmb3JtLWlubGluZSByb3cgZGF5X3RpbWVfZm9ybV9yb3dcIj5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbCBjb2wtbWQtMyBjb2wtc20tMyBjb2wteHMtMTIgdGV4dC1jZW50ZXIgZGF5X3RpbWVfZm9ybV9yb3dfZWxlbWVudFwiPjxzdHJvbmc+eyB0aGlzLnByb3BzLmVtcGxveWVlX25hbWV9PC9zdHJvbmc+PC9sYWJlbD5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTMgY29sLXNtLTMgY29sLXhzLTYgZGF5X3RpbWVfZm9ybV9yb3dfZWxlbWVudFwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cFwiPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwLWFkZG9uXCI+U3RhcnQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGlucHV0IFxuXHRcdFx0XHRcdFx0XHRcdHR5cGU9XCJ0aW1lXCIgXG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIHN0YXJ0XCIgXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU9e3RoaXMucHJvcHMuc3RhcnR9XG5cdFx0XHRcdFx0XHRcdFx0b25CbHVyPXt0aGlzLnVwZGF0ZVN0YXJ0fVxuXHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmNoYW5nZWRTdGFydH1cblx0XHRcdFx0XHRcdFx0XHRvbktleVByZXNzPXt0aGlzLmtleVByZXNzZWRTdGFydH1cblxuXHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtMyBjb2wtc20tMyBjb2wteHMtNiBkYXlfdGltZV9mb3JtX3Jvd19lbGVtZW50XCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAtYWRkb25cIj5FbmQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGlucHV0IFxuXHRcdFx0XHRcdFx0XHRcdHR5cGU9XCJ0aW1lXCIgXG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIGVuZFwiIFxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlPXt0aGlzLnByb3BzLmVuZH1cblx0XHRcdFx0XHRcdFx0XHRvbkJsdXI9e3RoaXMudXBkYXRlRW5kfVxuXHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmNoYW5nZWRFbmR9XG5cdFx0XHRcdFx0XHRcdFx0b25LZXlQcmVzcz17dGhpcy5rZXlQcmVzc2VkRW5kfVxuXHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC0zIGNvbC1zbS0zIGNvbC14cy0xMiB0ZXh0LWNlbnRlciBkYXlfdGltZV9mb3JtX3Jvd19lbGVtZW50XCI+XG5cdFx0XHRcdFx0XHQ8YnV0dG9uIFxuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJkZWxldGUgYnRuIGJ0bi1kYW5nZXJcIlxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLmRlbGV0ZX1cblx0XHRcdFx0XHRcdD5EZWxldGU8L2J1dHRvbj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9mb3JtPlxuXHRcdFx0PC9saT5cblx0XHQpO1xuXHR9XG59IiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbWVTaGVldCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHQvKiAgICAgRG8gdGhlIGJpbmQgdGhpbmcgICAgICAqL1xuXHRcdHRoaXMuYXV0b2NvbXBsZXRlPXRoaXMuYXV0b2NvbXBsZXRlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5hZGRDaGFuZ2VkPXRoaXMuYWRkQ2hhbmdlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuYWRkQ2xpY2tlZD10aGlzLmFkZENsaWNrZWQuYmluZCh0aGlzKTtcblx0fVxuXG5cdGF1dG9jb21wbGV0ZShpbnB1dCl7XG5cdFx0dmFyIGNvbmZpZyA9IHtcblx0XHRcdG1pbkNoYXJzOiAwLFxuXHRcdFx0bWF4SXRlbXM6IDk5LFxuXHRcdFx0YXV0b0ZpcnN0OiB0cnVlLFxuXHRcdFx0aXRlbTogZnVuY3Rpb24oaXRlbSwgaW5wdXQpIHtcblx0XHRcdFx0dmFyIGQgPSBpdGVtO1xuXHRcdFx0XHR2YXIgaHRtbCA9IFwiPHNwYW4+XCIgKyBfXyhpdGVtLmxhYmVsKSsgXCI8L3NwYW4+PGJyPjxzcGFuPjxzbWFsbD5cIitpdGVtLnZhbHVlK1wiPC9zbWFsbD48L3NwYW4+XCI7XG5cdFx0XHRcdHJldHVybiAkKCc8bGk+PC9saT4nKVxuXHRcdFx0XHRcdC5kYXRhKCdpdGVtLmF1dG9jb21wbGV0ZScsIGl0ZW0pXG5cdFx0XHRcdFx0Lmh0bWwoJzxhPjxwPicgKyBodG1sICsgJzwvcD48L2E+Jylcblx0XHRcdFx0XHQuZ2V0KDApO1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0dmFyIGF3ID0gbmV3IEF3ZXNvbXBsZXRlKGlucHV0LGNvbmZpZyk7XG5cdFx0aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRcdCdhd2Vzb21wbGV0ZS1zZWxlY3Rjb21wbGV0ZScsXG5cdFx0XHRcdHRoaXMuYWRkQ2hhbmdlZFxuXHRcdCk7XG5cdFx0YXcubGlzdD1wcy5lbXBsb3llZV9sYWJsZXNcblx0XHQkKGRvY3VtZW50KS5iaW5kKCdlbXBsb3llZUxhYmxlc0xvYWRlZCcsZnVuY3Rpb24oKXtcblx0XHRcdGF3Lmxpc3Q9cHMuZW1wbG95ZWVfbGFibGVzO1xuXHRcdH0pO1xuXHR9XG5cdGFkZENoYW5nZWQoZSl7XG5cdFx0dGhpcy5hZGQ9ZS50YXJnZXQudmFsdWU7XG5cdH07XG5cdGFkZENsaWNrZWQoZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHZhciB3b19uYW1lPXRoaXMucHJvcHMubmFtZTtcblx0XHR2YXIgZW1wbG95ZWVfbmFtZT10aGlzLmFkZDtcblx0XHQvL0NhbGwgYmFjayBmb3IgYmluZGluZz9cblx0XHR2YXIgdXBkYXRlQ2FsbGJhY2s9ZnVuY3Rpb24oaW5kZXgpe1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKGRhdGEpe1x0XHRcdFxuXHRcdFx0XHR0aGlzLnVwZGF0ZUZyb21TZXJ2ZXJQYXJhbShkYXRhLGluZGV4KTtcblx0XHRcdH0uYmluZCh0aGlzKTtcblx0XHR9LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5wcm9wcy5hZGRFbXBsb3llZSh3b19uYW1lLCBlbXBsb3llZV9uYW1lKTtcblx0fTtcblx0cmVuZGVyKCl7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYW5lbCBwYW5lbC1kZWZhdWx0IHJvd1wiPlxuXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtaGVhZGluZ1wiPlxuXHRcdFx0XHRcdDxoNCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPiBUaW1lIFNoZWV0IHt0aGlzLnByb3BzLmRhdGV9IGZvciB7dGhpcy5wcm9wcy5jcmV3fSA8L2g0PlxuXHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHQ8dWwgY2xhc3NOYW1lPVwibGlzdC1ncm91cFwiID5cblx0XHRcdFx0XHQ8ZGl2IGlkPSdmb3Jtcyc+XG5cdFx0XHRcdFx0XHR7dGhpcy5wcm9wcy5lbXBsb3llZXN9XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvdWw+XG5cdFx0XHQgIFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWZvb3RlciBjb2wtbWQtMTIgdGV4dC1sZWZ0IGxpc3QtZ3JvdXAtaXRlbVwiPlxuXHRcdFx0XHRcdDxmb3JtIGNsYXNzTmFtZT1cImZvcm0taW5saW5lIHJvdyBcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgY29sLW1kLTMgY29sLXNtLTIgY29sLXhzLTEyIHVwZGF0ZV9kaXZfZWxlbWVudFwiPlxuXHRcdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXN1Y2Nlc3NcIj5VcGRhdGU8L2J1dHRvbj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXJpZ2h0IGNvbC1tZC02IGNvbC1zbS02IGNvbC14cy00IFwiPlxuXHRcdFx0XHRcdFx0XHQ8YnV0dG9uIFxuXHRcdFx0XHRcdFx0XHRcdHR5cGU9XCJzdWJtaXRcIiBcblx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHRcIlxuXHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMuYWRkQ2xpY2tlZH1cblx0XHRcdFx0XHRcdFx0XHQ+KyBBZGQ8L2J1dHRvbj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIHRleHQtbGVmdCBjb2wtbWQtMyBjb2wtc20tNCBjb2wteHMtNiBcIj48ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwidGV4dFwiIFxuXHRcdFx0XHRcdFx0XHRcdHJlZj17dGhpcy5hdXRvY29tcGxldGV9XG4gICAgICAgICAgXHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuYWRkQ2hhbmdlZH0gXG4gICAgICAgICAgXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwibmV3X2VtcGxveWVlcyBmb3JtLWNvbnRyb2wgYXdlc29tcGxldGVcIiBcbiAgICAgICAgICBcdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj1cImVtcGxveWVlXCIgLz5cblx0XHRcdFx0XHRcdDwvZGl2PjwvZGl2PlxuXHRcdFx0XHRcdDwvZm9ybT5cblx0XHRcdFx0XHRcblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbiIsIi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuaW1wb3J0IFdvcmtvcmRlclRhc2sgZnJvbSAnLi93b3Jrb3JkZXJUYXNrJztcblxuaW1wb3J0IEZvcm0gZnJvbSAnLi4vdXRpbHMvZm9ybXMnXG5pbXBvcnQgTW9kYWwgZnJvbSAnLi4vdXRpbHMvbW9kYWwnXG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXlzV29ya29yZGVycyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR2YXIgYXJncz17fTtcblx0XHRhcmdzLmNyZXc9dGhpcy5wcm9wcy5jcmV3O1xuXHRcdGFyZ3MuZGF0ZT10aGlzLnByb3BzLmRhdGU7XG5cdFx0LyogICBEbyB0aGUgYmluZCB0aGluZyAgKi9cblx0XHR0aGlzLm9uVGFza0NoZWNrZWQ9dGhpcy5vblRhc2tDaGVja2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5vblN0YXR1c0NoYW5nZWQ9dGhpcy5vblN0YXR1c0NoYW5nZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLndvcmtPcmRlckNoYW5nZWQ9dGhpcy53b3JrT3JkZXJDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5zb2NrZXRVcGRhdGU9dGhpcy5zb2NrZXRVcGRhdGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM9dGhpcy5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jcmVhdGVXb3Jrb3JkZXI9dGhpcy5jcmVhdGVXb3Jrb3JkZXIuYmluZCh0aGlzKTtcblx0XHQvL3RoaXMud29ya29yZGVyT2JqPXRoaXMub25TdGF0dXNDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0LyogICAgICAgICAgZW5kICAgICAgICAgICovXG5cblx0XHR0aGlzLnN0YXRlPXt3b3Jrb3JkZXJzOltdfTtcblxuXHRcdHZhciBhcmdzPXt9O1xuXHRcdGFyZ3MuY3Jldz10aGlzLnByb3BzLmNyZXc7XG5cdFx0YXJncy5kYXRlPXRoaXMucHJvcHMuZGF0ZTtcblx0XHR0aGlzLndvcmtvcmRlclRvb2wgPSBuZXcgcHMuYXBpVG9vbChhcmdzLHBzLmFwaVNldHVwLndvcmtPcmRlcnMsdGhpcy53b3JrT3JkZXJDaGFuZ2VkKTtcblx0XHRpZiAodGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zPT09dW5kZWZpbmVkIHx8dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zPT09IDAgfHx0aGlzLndvcmtvcmRlclRvb2wuaXRlbXM9PT1udWxsICl7XG5cdFx0fWVsc2V7XG5cdFx0XHR0aGlzLnN0YXRlLndvcmtvcmRlcnM9dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zO1xuXHRcdH1cblxuXHR9XG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtcblxuXHRcdGlmKG5leHRQcm9wcy5jcmV3IT10aGlzLnByb3BzLmNyZXcgfHwgbmV4dFByb3BzLmRhdGUhPXRoaXMucHJvcHMuZGF0ZSApe1xuXG5cdFx0XHR2YXIgYXJncz17fTtcblx0XHRcdGFyZ3MuY3Jldz1uZXh0UHJvcHMuY3Jldztcblx0XHRcdGFyZ3MuZGF0ZT1uZXh0UHJvcHMuZGF0ZTtcblx0XHRcdHRoaXMud29ya29yZGVyVG9vbCA9IG5ldyBwcy5hcGlUb29sKGFyZ3MscHMuYXBpU2V0dXAud29ya09yZGVycyx0aGlzLndvcmtPcmRlckNoYW5nZWQpO1xuXHRcdFx0aWYgKHRoaXMud29ya29yZGVyVG9vbC5pdGVtcz09PXVuZGVmaW5lZCB8fHRoaXMud29ya29yZGVyVG9vbC5pdGVtcz09PSAwIHx8dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zPT09bnVsbCApe1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHt3b3Jrb3JkZXJzOltdfSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7d29ya29yZGVyczp0aGlzLndvcmtvcmRlclRvb2wuaXRlbXN9KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRzb2NrZXRVcGRhdGUoKXtcblxuXHR9XG5cdG9uVGFza0NoZWNrZWQod29faW5kZXgsaW5kZXgsY2hlY2spe1xuXHRcdHRoaXMud29ya29yZGVyVG9vbC5pdGVtc1t3b19pbmRleF0uc3VidGFza1tpbmRleF0uc3RhdHVzPWNoZWNrPzA6MTtcblx0XHR0aGlzLnNldFN0YXRlKHt3b3Jrb3JkZXJzOnRoaXMud29ya29yZGVyVG9vbC5pdGVtc30pO1xuXHRcdHRoaXMud29ya29yZGVyVG9vbC51cGRhdGUodGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zW3dvX2luZGV4XSk7XG5cdFx0dmFyIGNoZWNrZWRUZXh0PWNoZWNrP1widW5jaGVja2VkLlwiOlwiY2hlY2tlZC5cIlxuXHRcdC8vcHMuc3VjY2Vzc0FsZXJ0KHRoaXMud29ya29yZGVyVG9vbC5pdGVtc1t3b19pbmRleF0uc3VidGFza1tpbmRleF0udGFzayArXCIgXCIrIGNoZWNrZWRUZXh0ICk7XG5cdH1cblx0b25TdGF0dXNDaGFuZ2VkKHN0YXR1cywgaW5kZXgpe1xuXHRcdHRoaXMud29ya29yZGVyVG9vbC5pdGVtc1tpbmRleF0uc3RhdHVzPXN0YXR1cztcblx0XHR0aGlzLnNldFN0YXRlKHt3b3Jrb3JkZXJzOnRoaXMud29ya29yZGVyVG9vbC5pdGVtc30pO1xuXHRcdHRoaXMud29ya29yZGVyVG9vbC51cGRhdGUodGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zW2luZGV4XSk7XG5cdFx0aWYoc3RhdHVzPT1cIkNvbXBsZXRlXCIpe1xuXHRcdFx0cHMuc3VjY2Vzc0FsZXJ0KFwiV29ya29yZGVyIGNvbXBsZXRlZCFcIik7XG5cdFx0fVxuXHR9XG5cdHdvcmtPcmRlckNoYW5nZWQoKXtcblxuXHRcdGlmICh0aGlzLndvcmtvcmRlclRvb2wuaXRlbXMhPT1udWxsKXtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3dvcmtvcmRlcnM6dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zfSk7XG5cdFx0XHRpZih0aGlzLnByb3BzLnN0YXR1c1VwZGF0ZSAhPT0gdW5kZWZpbmVkKXtcblx0XHRcdFx0dGhpcy5wcm9wcy5zdGF0dXNVcGRhdGUodGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zKTtcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3dvcmtvcmRlcnM6W119KTtcblx0XHR9XG5cblx0fVxuXHRjcmVhdGVXb3Jrb3JkZXIoaXRlbSl7XG5cdFx0aXRlbS5kYXRlPW1vbWVudChpdGVtLmRhdGUsXCJNTS9ERC9ZWVlZXCIpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xuXHRcdHRoaXMud29ya29yZGVyVG9vbC5jcmVhdGUoaXRlbSxmdW5jdGlvbihpdGVtKXtcblx0XHRcdHBzLnN1Y2Nlc3NBbGVydChcIldvcmtvcmRlciBcIiAraXRlbS5uYW1lKyBcIiBjcmVhdGVkLlwiKVxuXHRcdH0pO1xuXG5cdH1cblx0d29ya29yZGVyT2JqKGl0ZW0saW5kZXgpe1xuXHRcdHJldHVybihcblx0XHRcdDxXb3Jrb3JkZXJUYXNrIFxuXHRcdFx0XHRrZXk9e2luZGV4ICsgdGhpcy5wcm9wcy5jcmV3fSBcblx0XHRcdFx0aW5kZXg9e2luZGV4fSBcblx0XHRcdFx0bG9jYXRpb25fcm91dGU9e2l0ZW0ubG9jYXRpb25fcm91dGV9XG5cdFx0XHRcdGxvY2F0aW9uPXtpdGVtLmxvY2F0aW9ufVxuXHRcdFx0XHR0YXNrcz17aXRlbS5zdWJ0YXNrfVxuXHRcdFx0XHRzdGF0dXM9e2l0ZW0uc3RhdHVzfVxuXHRcdFx0XHR0eXBlPXtpdGVtLnR5cGV9XG5cdFx0XHRcdHdvcmtvcmRlcj17aXRlbS5uYW1lfVxuXHRcdFx0XHRvblRhc2tDaGVja2VkPXt0aGlzLm9uVGFza0NoZWNrZWR9XG5cdFx0XHRcdG9uU3RhdHVzQ2hhbmdlZD17dGhpcy5vblN0YXR1c0NoYW5nZWR9XG5cdFx0XHRcdHJvdXRlPXtpdGVtLnJvdXRlfVxuXHRcdFx0Lz5cblx0XHQpO1xuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyAgICAgICAgUmVuZGVyXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0cmVuZGVyKCl7XG5cdFx0aWYgKHRoaXMuc3RhdGUud29ya29yZGVycz09PTB8fHRoaXMuc3RhdGUud29ya29yZGVycz09PXVuZGVmaW5lZCl7XG5cdFx0XHRyZXR1cm4gKDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj48aDM+Tm8gV29ya29yZGVyczwvaDM+PC9kaXY+KTtcblx0XHR9XG5cdFx0dmFyIHRvZG89W107XG5cdFx0dmFyIGNvbXBsZXRlPVtdO1xuXHRcdHRoaXMuc3RhdGUud29ya29yZGVycy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXHRcdFx0aWYgKGl0ZW0uc3RhdHVzIT0nQ29tcGxldGUnJiZpdGVtLnN0YXR1cyE9J0luY29tcGxldGUnKXtcblx0XHRcdFx0dG9kby5wdXNoKHRoaXMud29ya29yZGVyT2JqKGl0ZW0saW5kZXgpKTtcblx0XHRcdFx0aWYodG9kby5sZW5ndGgrMSU0PT09MCl7XG5cblx0XHRcdFx0XHR0b2RvLnB1c2goPGRpdiBjbGFzc05hbWU9J2NsZWFyZml4IHNwYWNlcic+PC9kaXY+KVxuXHRcdFx0XHR9XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Y29tcGxldGUucHVzaCh0aGlzLndvcmtvcmRlck9iaihpdGVtLGluZGV4KSk7XG5cdFx0XHRcdGlmKGNvbXBsZXRlLmxlbmd0aCUzPT09MCl7Y29tcGxldGUucHVzaCg8ZGl2IGNsYXNzTmFtZT0nY2xlYXJmaXggc3BhY2VyJz48L2Rpdj4pfVxuXHRcdFx0fVxuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0dmFyIGNvbXBsZXRlSGVhZGVyPSg8aDM+Q29tcGxldGUgV29yayBPcmRlcnM8L2gzPik7XG5cdFx0aWYoY29tcGxldGUubGVuZ3RoPT0wKXtcblx0XHRcdGNvbXBsZXRlSGVhZGVyPVwiXCI7XG5cdFx0fVxuXG5cdFx0Ly8gdmFyIGRhdGU9dGhpcy5wcm9wcy5kYXRlO1xuXHRcdC8vIGRhdGU9bW9tZW50KGRhdGUsJ1lZWVktTU0tREQnKS5mb3JtYXQoXCJNTS9ERC9ZWVlZXCIpO1xuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwid29ya29yZGVyX2NvbnRhaW5lclwiPlxuXHRcdFx0XHQ8ZGl2Pjxici8+XG5cdFx0XHRcdFx0e3RvZG99XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNsZWFyZml4XCI+PC9kaXY+XG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0e2NvbXBsZXRlSGVhZGVyfVxuXHRcdFx0XHRcdHtjb21wbGV0ZX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj48L2Rpdj5cblx0XHRcdFx0PGJyLz5cblx0XHRcdFx0PFdvcmtvcmRlckZvcm1Nb2RhbFxuXHRcdFx0XHRcdGlkPXtcImNyZWF0ZS13by1cIit0aGlzLnByb3BzLmNyZXcucmVwbGFjZShcIiBcIixcIi1cIil9XG5cdFx0XHRcdFx0Y3Jldz17dGhpcy5wcm9wcy5jcmV3fVxuXHRcdFx0XHRcdGRhdGU9e21vbWVudCh0aGlzLnByb3BzLmRhdGUsJ1lZWVktTU0tREQnKS5mb3JtYXQoXCJNTS9ERC9ZWVlZXCIpfVxuXHRcdFx0XHRcdGNyZWF0ZVdvcmtvcmRlcj17dGhpcy5jcmVhdGVXb3Jrb3JkZXJ9XG5cdFx0XHRcdC8+XG5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cblx0fTtcdFxufVxuXG5leHBvcnQgY2xhc3MgV29ya29yZGVyRm9ybU1vZGFsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXG5cdFx0dGhpcy5zdWJtaXQ9dGhpcy5zdWJtaXQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnN0YXRlPXtcblx0XHRcdGxvY2F0aW9uOlwiXCIsXG5cdFx0XHRwcmlvcml0eToxLFxuXHRcdFx0dHlwZTpcIlBydW5pbmdcIixcblx0XHRcdHN0YXR1czpcIlBlbmRpbmdcIixcblx0XHRcdGRhdGU6dGhpcy5wcm9wcy5kYXRlLFxuXHRcdFx0Y3Jldzp0aGlzLnByb3BzLmNyZXdcblx0XHR9XG5cdH1cblxuXHRzdWJtaXQoZSl7XG5cdFx0aWYodGhpcy5zdGF0ZS5sb2NhdGlvbj09XCJcIiB8fHRoaXMuc3RhdGUuY3Jldz09XCJcIiB8fCAobW9tZW50KHRoaXMuc3RhdGUuZGF0ZSxcIk1NL0REL1lZWVlcIikuaXNWYWxpZCgpKSE9PXRydWUpe1xuXHRcdFx0Y29uc29sZS5sb2coXCJub3QgdmFsaWRcIik7XG5cdFx0fWVsc2V7XG5cdFx0XHR2YXIgY29weT1wcy5jbG9uZSh0aGlzLnN0YXRlKTtcblx0XHRcdCQoJyMnKyB0aGlzLnByb3BzLmlkKS5tb2RhbCgnaGlkZScpXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtsb2NhdGlvbjpcIlwifSlcblx0XHRcdHRoaXMucHJvcHMuY3JlYXRlV29ya29yZGVyKGNvcHkpO1xuXHRcdH1cblx0fVxuXHRyZW5kZXIoKXtcblx0XHR2YXIgZmllbGRzPVtcdFx0XG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiYXV0b0NvbXBsZXRlXCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtsb2NhdGlvbjplLnRhcmdldC52YWx1ZX0pXG5cdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0dmFsdWU6dGhpcy5zdGF0ZS5sb2NhdGlvbixcblx0XHRcdFx0cmVxdWlyZWQ6dHJ1ZSxcblx0XHRcdFx0bGFibGU6XCJWaW5leWFyZFwiLFxuXHRcdFx0XHRkb2N0eXBlOlwiVmluZXlhcmRcIixcblx0XHRcdFx0ZG9jdmFsdWU6XCJuYW1lXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiaW5wdXRcIixcblx0XHRcdFx0Y2xhc3NOYW1lOlwidmluZXlhcmQtaW5wdXRcIixcblx0XHRcdFx0dHlwZTpcIm51bWJlclwiLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7cHJpb3JpdHk6ZS50YXJnZXQudmFsdWV9KVxuXHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdHZhbHVlOnRoaXMuc3RhdGUucHJpb3JpdHksXG5cdFx0XHRcdGxhYmxlOlwiUHJpb3JpdHlcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJkYXRlXCIsXG5cdFx0XHRcdHJlcXVpcmVkOnRydWUsXG5cdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtkYXRlOmUudGFyZ2V0LnZhbHVlfSk7XG5cdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0dmFsdWU6dGhpcy5zdGF0ZS5kYXRlLFxuXHRcdFx0XHRsYWJsZTpcIkRhdGVcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJzZWxlY3RcIixcblx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3R5cGU6ZS50YXJnZXQudmFsdWV9KVxuXHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdHZhbHVlOnRoaXMuc3RhdGUudHlwZSxcblx0XHRcdFx0bGFibGU6XCJUeXBlXCIsXG5cdFx0XHRcdG9wdGlvbnM6W1xuXHRcdFx0XHRcdFwiV2F0ZXJpbmdcIixcblx0XHRcdFx0XHRcIlBydW5pbmdcIixcblx0XHRcdFx0XHRcIlJlcGFpclwiLFxuXHRcdFx0XHRcdFwiU3ByYXlpbmdcIlxuXHRcdFx0XHRdXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcInNlbGVjdFwiLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7c3RhdHVzOmUudGFyZ2V0LnZhbHVlfSlcblx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHR2YWx1ZTp0aGlzLnN0YXRlLnN0YXR1cyxcblx0XHRcdFx0bGFibGU6XCJTdGF0dXNcIixcblx0XHRcdFx0ZGlzYWJsZWQ6dHJ1ZSxcblx0XHRcdFx0b3B0aW9uczpbXG5cdFx0XHRcdFx0XCJQZW5kaW5nXCJcblx0XHRcdFx0XVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJhdXRvQ29tcGxldGVcIixcblx0XHRcdFx0b25DaGFuZ2U6IHRoaXMuc29tZUZ1bmN0aW9uLFxuXHRcdFx0XHRsYWJsZTpcIkNyZXdcIixcblx0XHRcdFx0cmVxdWlyZWQ6dHJ1ZSxcblx0XHRcdFx0cmVhZG9ubHk6XCJ0dXJlXCIsXG5cdFx0XHRcdGRvY3R5cGU6XCJDcmV3XCIsXG5cdFx0XHRcdGRvY3ZhbHVlOlwibmFtZVwiLFxuXHRcdFx0XHRkb2NsYWJsZTpcImNyZXdfbGVhZF9mdWxsX25hbWVcIixcblx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe2NyZXc6ZS50YXJnZXQudmFsdWV9KVxuXHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdHZhbHVlOnRoaXMuc3RhdGUuY3Jldyxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiYnV0dG9uXCIsXG5cdFx0XHRcdHR5cGU6XCJzdWJtaXRcIixcblx0XHRcdFx0dmFsdWU6XCJDcmVhdGUgV29yayBPcmRlclwiLFxuXHRcdFx0XHRjbGFzc05hbWU6XCJidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIsXG5cdFx0XHRcdG9uQ2xpY2s6dGhpcy5zdWJtaXRcblx0XHRcdH1cblxuXG5cdFx0XVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2Plx0XHRcdFx0XG5cdFx0XHRcdDxhIFxuXHRcdFx0XHRcdGhyZWY9XCIjXCIgXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCJcblx0XHRcdFx0XHRvbkNsaWNrPXtmdW5jdGlvbigpeyQoJyMnKyB0aGlzLnByb3BzLmlkKS5tb2RhbCgpfS5iaW5kKHRoaXMpfVxuXHRcdFx0XHRcdD5cblx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLXBsdXNcIj48L3NwYW4+IE5ldyBXb3JrIE9yZGVyPC9hPlxuXHRcdFx0XHQ8TW9kYWwgXG5cdFx0XHRcdFx0aWQ9e3RoaXMucHJvcHMuaWR9IFxuXHRcdFx0XHRcdHN1Ym1pdFRleHQ9XCJTdWJtaXRcIiBcblx0XHRcdFx0XHR0aXRsZT1cIkNyZWF0ZSBOZXcgV29ya29yZGVyXCJcblx0XHRcdFx0XHRzdWJtaXQ9e2ZhbHNlfVxuXHRcdFx0XHRcdD5cblxuXHRcdFx0XHRcdDxGb3JtXG5cdFx0XHRcdFx0XHRpZD1cIkNyZWF0ZVdvcmtvcmRlckZvcm1cIlxuXHRcdFx0XHRcdFx0dHlwZT1cImhvcml6b250YWxcIlxuXHRcdFx0XHRcdFx0ZmllbGRzPXtmaWVsZHN9XG5cblx0XHRcdFx0XHQvPlxuXG5cdFx0XHRcdDwvTW9kYWw+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDcmVhdGVJc3N1ZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKVxuXHRcdHRoaXMubW9kYWxOZXdJc3N1ZT10aGlzLm1vZGFsTmV3SXNzdWUuYmluZCh0aGlzKTtcblx0XHR0aGlzLm1vZGFsRWRpdElzc3VlPXRoaXMubW9kYWxFZGl0SXNzdWUuYmluZCh0aGlzKTtcblx0fVxuXHR0b29sVGlwKCl7XG5cdFx0JChmdW5jdGlvbiAoKSB7XG5cdFx0IFx0JCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoKTtcblx0XHR9KVxuXHR9XG5cdG1vZGFsTmV3SXNzdWUoZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMucHJvcHMuYWN0aXZhdGVNb2RhbE5ldygpO1xuXHR9XG5cdG1vZGFsRWRpdElzc3VlKGl0ZW0sZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGNvbnNvbGUubG9nKGl0ZW0pXG5cdFx0dGhpcy5wcm9wcy5hY3RpdmF0ZU1vZGFsRWRpdChpdGVtKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR2YXIgZHJvcGRvd25JdGVtcz1bXTtcblx0XHRpZih0aGlzLnByb3BzLmlzc3VlcyE9PW51bGwpe1xuXHRcdFx0dGhpcy5wcm9wcy5pc3N1ZXMubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblx0XHRcdFx0aWYgKGl0ZW0uc3RhdHVzID09J09wZW4nKXtcblx0XHRcdFx0XHRkcm9wZG93bkl0ZW1zLnB1c2goXG5cdFx0XHRcdFx0XHQ8bGkga2V5PXtpbmRleH0+IFxuXHRcdFx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9XCJkcm9wZG93bi1pdGVtXCIgXG5cdFx0XHRcdFx0XHRcdFx0aHJlZj1cIiNcIiBcblx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLm1vZGFsRWRpdElzc3VlLmJpbmQodGhpcyxpdGVtKX0gXG5cdFx0XHRcdFx0XHRcdD57aXRlbS5pc3N1ZV90aXRsZX08L2E+XG5cdFx0XHRcdFx0XHQ8L2xpPik7XG5cdFx0XHRcdH1cblx0XHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0fVxuXHRcdHZhciBpc3N1ZUNvdW50PVwiIFwiO1xuXHRcdGlmKHRoaXMucHJvcHMuaXNzdWVzIT09bnVsbCAmJiB0aGlzLnByb3BzLmlzc3Vlcy5sZW5ndGghPT1udWxsKXtcblx0XHRcdHZhciBjb3VudCA9IDA7XG5cdFx0XHRmb3IodmFyIHg9MDsgeCA8IHRoaXMucHJvcHMuaXNzdWVzLmxlbmd0aDt4Kyspe1xuXHRcdFx0XHRpZih0aGlzLnByb3BzLmlzc3Vlc1t4XS5zdGF0dXM9PVwiT3BlblwiKXtcblx0XHRcdFx0XHRjb3VudCsrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpc3N1ZUNvdW50PShjb3VudD09PTApP1wiXCI6Y291bnQrXCIgXCI7XG5cdFx0fVxuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZHJvcGRvd24gZHJvcGRvd24tcGFuZWwtcmlnaHRcIj5cblxuXHRcdFx0XHQ8YnV0dG9uXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi14cyBkcm9wZG93bi10b2dnbGUgZnVsbC1oZWFkZXItYnV0dG9uIGNvcm5lclwiIFxuXHRcdFx0XHRcdHR5cGU9XCJidXR0b25cIiBcblx0XHRcdFx0XHRkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgXG5cdFx0XHRcdFx0YXJpYS1oYXNwb3B1cD1cInRydWVcIiBcblx0XHRcdFx0XHRhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIiA+XG5cblx0XHRcdFx0IFx0e2lzc3VlQ291bnR9PHNwYW4gY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1leGNsYW1hdGlvbi1zaWduXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxuXHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0PHVsIGNsYXNzTmFtZT1cImRyb3Bkb3duLW1lbnVcIj5cblx0XHRcdFx0ICAgIDxsaSBjbGFzc05hbWU9XCJkcm9wZG93bi1oZWFkZXJcIj5Jc3N1ZXM8L2xpPlxuXHRcdFx0XHQgICAge2Ryb3Bkb3duSXRlbXN9XG5cdFx0XHRcdCAgICA8bGkgcm9sZT1cInNlcGFyYXRvclwiIGNsYXNzTmFtZT1cImRpdmlkZXJcIj48L2xpPlxuXHRcdFx0XHQgICAgPGxpPjxhIFxuXHRcdFx0XHQgICAgXHRjbGFzc05hbWU9XCJkcm9wZG93bi1pdGVtXCJcblx0XHRcdFx0ICAgIFx0b25DbGljaz17dGhpcy5tb2RhbE5ld0lzc3VlfVxuXHRcdFx0XHQgICAgXHRocmVmPVwiI1wiID4gKyBOZXcgSXNzdWU8L2E+PC9saT5cblx0XHRcdFx0PC91bD5cblxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5cbiIsIi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFza0NoZWNrIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMudGFza0NoZWNrZWQgPSB0aGlzLnRhc2tDaGVja2VkLmJpbmQodGhpcyk7XG5cdH1cblx0dGFza0NoZWNrZWQoZSl7XG5cdFx0dGhpcy5wcm9wcy50YXNrQ2hlY2tlZCh0aGlzLnByb3BzLmluZGV4LCB0aGlzLnByb3BzLmNoZWNrZWQpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IGNoZWNrZWQgPSB0aGlzLnByb3BzLmNoZWNrZWQgPyBcImxpbmUtdGhyb3VnaFwiIDogXCJcIjtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoZWNrYm94IHJvd1wiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy04XCI+XG5cdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9e2NoZWNrZWR9PlxuXHRcdFx0XHRcdDxpbnB1dCBcblx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImJpZy1jaGVja2JveFwiIFxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9e2Z1bmN0aW9uKCl7dGhpcy5wcm9wcy50YXNrQ2hlY2tlZCh0aGlzLnByb3BzLml0ZW0sIGNoZWNrZWQpO30uYmluZCh0aGlzKX0gXG5cdFx0XHRcdFx0XHR0eXBlPVwiY2hlY2tib3hcIiBcblx0XHRcdFx0XHRcdGNoZWNrZWQ9e3RoaXMucHJvcHMuY2hlY2tlZH0gLz5cblx0XHRcdFx0XHR7dGhpcy5wcm9wcy5sYWJsZX1cblx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZWRpdCBjb2wteHMtNFwiPiBcblx0XHRcdFx0XHQ8YnV0dG9uIFxuXHRcdFx0XHRcdFx0dHlwZT1cImJ1dHRvblwiIFxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0IGlubGluZS10YXNrXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMucHJvcHMuZWRpdFRhc2t9XG5cdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLWVkaXRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XG5cdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVx0XG59IiwiXG4vKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmltcG9ydCBUYXNrQ2hlY2sgZnJvbSAnLi90YXNrQ2hlY2snXG5pbXBvcnQgQ3JlYXRlSXNzdWUgZnJvbSAnLi9jcmVhdGVJc3N1ZSdcbmltcG9ydCBNb2RhbCBmcm9tICcuLi91dGlscy9tb2RhbCdcbmltcG9ydCB7Rm9ybSwgU2VsZWN0fSBmcm9tICcuLi91dGlscy9mb3JtcydcbmltcG9ydCB7U3ByYXlGb3JtLFBydW5pbmdGb3JtfSBmcm9tICcuLi92aW5leWFyZC9zcHJheUZvcm0nXG5pbXBvcnQgRG9jdHlwZUZvcm0gZnJvbSAnLi4vdXRpbHMvZG9jdHlwZUZvcm0nXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29ya29yZGVyVGFzayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnN0YXRlPXtcblx0XHRcdGlzc3VlczpbXSxcblx0XHRcdHRpdGxlOicnLFxuXHRcdFx0bW9kYWw6J25ldycsXG5cdFx0XHRtb2RhbFByaW9yaXR5Oidsb3cnLFxuXHRcdFx0bW9kYWxUaXRsZTonJyxcblx0XHRcdG1vZGFsRGVzY3JpcHRpb246JycsXG5cdFx0XHRtb2RhbE5hbWU6Jydcblx0XHR9O1xuXHRcdHRoaXMudGFza0NoZWNrZWQ9dGhpcy50YXNrQ2hlY2tlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuc3RhdHVzQ2hhbmdlPXRoaXMuc3RhdHVzQ2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5hY3RpdmF0ZU1vZGFsTmV3PXRoaXMuYWN0aXZhdGVNb2RhbE5ldy5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuYWN0aXZhdGVNb2RhbEVkaXQ9dGhpcy5hY3RpdmF0ZU1vZGFsRWRpdC5iaW5kKHRoaXMpO1xuXG5cdFx0dGhpcy5pc3N1ZUZvcm1DaGFuZ2U9dGhpcy5pc3N1ZUZvcm1DaGFuZ2UuYmluZCh0aGlzKTtcblx0XHR0aGlzLmNyZWF0ZUlzc3VlPXRoaXMuY3JlYXRlSXNzdWUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmVkaXRJc3N1ZT10aGlzLmVkaXRJc3N1ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZGVsZXRlSXNzdWU9dGhpcy5kZWxldGVJc3N1ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY2xvc2U9dGhpcy5jbG9zZS5iaW5kKHRoaXMpO1xuXG5cdFx0dGhpcy5pc3N1ZUNoYW5nZWQ9dGhpcy5pc3N1ZUNoYW5nZWQuYmluZCh0aGlzKTtcblxuXG5cdFx0dGhpcy5tb2RhbElkPVwiaXNzdWUtZm9ybS1cIit0aGlzLnByb3BzLndvcmtvcmRlcjtcblxuXHRcdFxuXHRcdHRoaXMuaXNzdWVUb29sID0gbmV3IHBzLmFwaVRvb2woe1wid29ya19vcmRlclwiOnRoaXMucHJvcHMud29ya29yZGVyfSx7ZG9jdHlwZTonSXNzdWUnfSx0aGlzLmlzc3VlQ2hhbmdlZCk7XG5cblxuXHR9XG5cdHRhc2tDaGVja2VkKGUpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe3RpdGxlOlwiQ0hFQ0tFRFwifSk7XG5cdH1cblx0aXNDaGVja2VkKHZhbHVlKXtcbiAgICBcdHJldHVybiAoKHZhbHVlPT09dGhpcy5zdGF0ZS5zZWxlY3RlZCkgPydjaGVja2VkIGxpbmUtdGhyb3VnaCc6J2RlZmF1bHQnKTtcbiAgXHR9XG4gIFx0dGFza0NoZWNrZWQoaW5kZXgsY2hlY2tlZCl7XG4gIFx0XHR2YXIgd29faW5kZXg9dGhpcy5wcm9wcy5pbmRleDtcbiAgXHRcdHRoaXMucHJvcHMub25UYXNrQ2hlY2tlZCh3b19pbmRleCxpbmRleCxjaGVja2VkKTtcbiAgXHR9XG4gIFx0c3RhdHVzQ2hhbmdlKGUpe1xuICBcdFx0dGhpcy5wcm9wcy5vblN0YXR1c0NoYW5nZWQoZS50YXJnZXQudmFsdWUsdGhpcy5wcm9wcy5pbmRleCk7XG5cbiAgXHR9XG4gIFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRcdFx0SVNTVUUgRlVOQ1RJT05TXG4gIFx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gIFx0YWN0aXZhdGVNb2RhbE5ldygpe1xuICBcdFx0dGhpcy5zZXRTdGF0ZSh7aXNzdWVNb2RlOlwiY3JlYXRlXCJ9KTtcbiAgXHRcdHRoaXMuc2V0U3RhdGUoe2lzc3VlOnt9fSk7XG4gIFx0XHQkKCcjJyt0aGlzLm1vZGFsSWQpLm1vZGFsKCk7XG4gIFx0fVxuICBcdGFjdGl2YXRlTW9kYWxFZGl0KGlzc3VlKXtcbiAgXHRcdHRoaXMuc2V0U3RhdGUoe2lzc3VlTW9kZTpcImVkaXRcIn0pO1xuXHRcdHRoaXMuc2V0U3RhdGUoe2lzc3VlOmlzc3VlfSk7XG4gIFx0XHQkKCcjJyt0aGlzLm1vZGFsSWQpLm1vZGFsKCk7XG4gIFx0fVxuICBcdGlzc3VlRm9ybUNoYW5nZShpc3N1ZSl7XG4gIFx0XHR0aGlzLnNldFN0YXRlKHtpc3N1ZTppc3N1ZX0pO1xuICBcdH1cbiAgXHRpc3N1ZUNoYW5nZWQoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtpc3N1ZXM6dGhpcy5pc3N1ZVRvb2wuaXRlbXN9KTtcblx0fVxuICBcdGNyZWF0ZUlzc3VlKGl0ZW0pe1xuICBcdFx0Ly9jb25zb2xlLmxvZyh0aGlzLnN0YXRlLmlzc3VlKTtcblx0XHRpdGVtLnZpbmV5YXJkPXRoaXMucHJvcHMubG9jYXRpb247XG5cdFx0aXRlbS53b3JrX29yZGVyPXRoaXMucHJvcHMud29ya29yZGVyO1xuXHRcdHRoaXMuaXNzdWVUb29sLmNyZWF0ZShpdGVtLGZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0cHMuc3VjY2Vzc0FsZXJ0KFwiSXNzdWUgXCIgK2l0ZW0udGl0bGUrIFwiIGNyZWF0ZWQuXCIpXG5cdFx0fSk7XG5cdFx0JCgnIycrdGhpcy5tb2RhbElkKS5tb2RhbCgndG9nZ2xlJyk7XG5cdH1cblx0ZGVsZXRlSXNzdWUoaXRlbSl7XG4gIFx0XHR0aGlzLmlzc3VlVG9vbC5kZWxldGUoaXRlbSk7XG5cdFx0JCgnIycrdGhpcy5tb2RhbElkKS5tb2RhbCgndG9nZ2xlJyk7XG5cdH1cblx0ZWRpdElzc3VlKGl0ZW0pe1xuXHRcdHRoaXMuaXNzdWVUb29sLnVwZGF0ZShpdGVtLGZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0cHMuc3VjY2Vzc0FsZXJ0KFwiSXNzdWUgXCIgK2l0ZW0udGl0bGUrXCIgdXBkYXRlZC5cIilcblx0XHR9KTtcblx0XHQkKCcjJyt0aGlzLm1vZGFsSWQpLm1vZGFsKCd0b2dnbGUnKTtcblx0fVxuXHRjbG9zZSgpe1xuXHRcdCQoJyMnK3RoaXMubW9kYWxJZCkubW9kYWwoJ3RvZ2dsZScpO1xuXHR9XG5cblxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB0aXRsZT1cIndlbGNvbWVcIjtcblx0XHR2YXIgbWFpbkNsYXNzPXtcblx0XHRcdCdDb21wbGV0ZSc6J3BhbmVsLXN1Y2Nlc3MnLFxuXHRcdFx0J0luY29tcGxldGUnOidwYW5lbC1kYW5nZXInLFxuXHRcdFx0J1BlbmRpbmcnOidwYW5lbC1kZWZhdWx0Jyxcblx0XHRcdCdTdGFydGVkJzoncGFuZWwtd2FybmluZydcblx0XHR9W3RoaXMucHJvcHMuc3RhdHVzXTtcblx0XHRtYWluQ2xhc3MgPSBtYWluQ2xhc3MgKyBcIiBwYW5lbCB3b3Jrb3JkZXIgcHMtcGFuZWxcIjtcblx0XHR2YXIgcm91dGU9KHRoaXMucHJvcHMucm91dGU9PT11bmRlZmluZWQpP1wiTm90IENyZWF0ZWRcIjooPGEgY2xhc3NOYW1lPVwiXCIgaHJlZj17dGhpcy5wcm9wcy5yb3V0ZX0+TW9yZSBJbmZvcm1hdGlvbjwvYT4pO1xuXHRcdHZhciB0YXNrcz1cIlwiO1xuXHRcdGlmKHRoaXMucHJvcHMudGFza3MhPT11bmRlZmluZWQpe1xuXHRcdFx0dGFza3M9W107XG5cdFx0XHR0aGlzLnByb3BzLnRhc2tzLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCl7XG5cdFx0XHRcdHZhciBjaGVja2VkPWl0ZW0uc3RhdHVzP3RydWU6ZmFsc2U7XG5cdFx0XHRcdHRhc2tzLnB1c2goPFRhc2tDaGVjayBrZXk9e2luZGV4fSBpbmRleD17aW5kZXh9IGxhYmxlPXtpdGVtLnRhc2t9IGNoZWNrZWQ9e2NoZWNrZWR9IHRhc2tDaGVja2VkPXt0aGlzLnRhc2tDaGVja2VkfS8+KTtcblx0XHRcdH0uYmluZCh0aGlzKSlcblx0XHR9XG5cblx0XHR2YXIgbW9kYWxUaXRsZSA9IFwiXCI7XG5cdFx0aWYodGhpcy5zdGF0ZS5pc3N1ZU1vZGUpe1xuXHRcdFx0bW9kYWxUaXRsZSA9IFwiQ3JlYXRlIElzc3VlXCI7XG5cdFx0fWVsc2V7XG5cdFx0XHRtb2RhbFRpdGxlID0gXCJFZGl0IElzc3VlXCI7XG5cdFx0fVxuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPSdjb2wtbWQtNCBjb2wtc20tNCc+XG5cdFx0XHRcdDxNb2RhbCBcblx0XHRcdFx0XHRpZD17dGhpcy5tb2RhbElkfSBcblx0XHRcdFx0XHRzdWJtaXRUZXh0PVwiU3VibWl0XCIgXG5cdFx0XHRcdFx0dGl0bGU9XCJDcmVhdGUgSXNzdWUgRm9yXCJcblx0XHRcdFx0XHRzdWJtaXQ9e2ZhbHNlfVxuXHRcdFx0XHRcdD5cblxuXHRcdFx0XHRcdFx0PERvY3R5cGVGb3JtIFxuXHRcdFx0XHRcdFx0XHRjbG9zZT17dGhpcy5jbG9zZX1cblx0XHRcdFx0XHRcdFx0aXRlbUNoYW5nZT17dGhpcy5pc3N1ZUZvcm1DaGFuZ2V9XG5cdFx0XHRcdFx0XHRcdGNyZWF0ZT17dGhpcy5jcmVhdGVJc3N1ZX1cblx0XHRcdFx0XHRcdFx0ZWRpdD17dGhpcy5lZGl0SXNzdWV9XG5cdFx0XHRcdFx0XHRcdGRlbGV0ZT17dGhpcy5kZWxldGVJc3N1ZX1cblx0XHRcdFx0XHRcdFx0bW9kZT17dGhpcy5zdGF0ZS5pc3N1ZU1vZGV9XG5cdFx0XHRcdFx0XHRcdGl0ZW09e3RoaXMuc3RhdGUuaXNzdWV9XG5cdFx0XHRcdFx0XHRcdGlkPXt0aGlzLnByb3BzLndvcmtvcmRlcn1cblxuXHRcdFx0XHRcdFx0XHRkb2N0eXBlPVwiSXNzdWVcIlxuXHRcdFx0XHRcdFx0XHRpc3N1ZV90aXRsZT17e2FjdGl2ZToxfX1cblx0XHRcdFx0XHRcdFx0aXNzdWU9e3tcblx0XHRcdFx0XHRcdFx0XHRhY3RpdmU6MSxcblx0XHRcdFx0XHRcdFx0XHR0eXBlOlwidGV4dGFyZWFcIiBcblx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdFx0cHJpb3JpdHk9e3tcblx0XHRcdFx0XHRcdFx0XHRhY3RpdmU6MSxcblx0XHRcdFx0XHRcdFx0XHRkZWZhdWx0OlwiTG93XCJcblx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdFx0c3RhdHVzPXt7XG5cdFx0XHRcdFx0XHRcdFx0YWN0aXZlOjEsXG5cdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcIk9wZW5cIlxuXHRcdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0Lz4gXHRcblx0XHRcdFx0PC9Nb2RhbD5cblx0XHRcdDxkaXYgaWQ9XCJcIiBjbGFzc05hbWU9e21haW5DbGFzc30+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtaGVhZGluZ1wiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG5cdFx0XHRcdFx0XHQ8aDMgY2xhc3NOYW1lPVwicGFuZWwtdGl0bGUgY29sLXhzLThcIj5cblx0XHRcdFx0XHRcdFx0PGEgY2xhc3NOYW1lPVwiZmxvYXQtbGVmdFwiIGhyZWY9e3RoaXMucHJvcHMubG9jYXRpb25fcm91dGV9Pnt0aGlzLnByb3BzLmxvY2F0aW9ufTwvYT5cblx0XHRcdFx0XHRcdDwvaDM+XG5cblxuXG5cdFx0XHRcdFx0XHRcdDxDcmVhdGVJc3N1ZVxuXHRcdFx0XHRcdFx0XHRcdGlzc3Vlcz17dGhpcy5zdGF0ZS5pc3N1ZXN9XG5cdFx0XHRcdFx0XHRcdFx0YWN0aXZhdGVNb2RhbE5ldz17dGhpcy5hY3RpdmF0ZU1vZGFsTmV3fVxuXHRcdFx0XHRcdFx0XHRcdGFjdGl2YXRlTW9kYWxFZGl0PXt0aGlzLmFjdGl2YXRlTW9kYWxFZGl0fVxuXHRcdFx0XHRcdFx0XHRcdHdvcmtvcmRlcj17dGhpcy5wcm9wcy53b3Jrb3JkZXJ9XG5cblx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPjwvZGl2PlxuXG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcblxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYW5lbC1ib2R5XCI+XG5cdFx0XHRcdFx0PHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgc3RhdHVzXCIgdmFsdWU9e3RoaXMucHJvcHMuc3RhdHVzfSBvbkNoYW5nZT17dGhpcy5zdGF0dXNDaGFuZ2V9PlxuXHRcdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIlBlbmRpbmdcIj5QZW5kaW5nPC9vcHRpb24+XG5cdFx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPVwiU3RhcnRlZFwiPlN0YXJ0ZWQ8L29wdGlvbj5cblx0XHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9XCJDb21wbGV0ZVwiPkNvbXBsZXRlPC9vcHRpb24+XG5cdFx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPVwiSW5jb21wbGV0ZVwiPkluY29tcGxldGU8L29wdGlvbj5cblx0XHRcdFx0XHQ8L3NlbGVjdD5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hlY2tfYm94ZXNcIj5cblxuXHRcdFx0XHRcdFx0e3Rhc2tzfVxuXHRcdFx0XHRcdFx0PFZpbmV5YXJkVGFza3Mgd29ya29yZGVyPXt0aGlzLnByb3BzLndvcmtvcmRlcn0gdmluZXlhcmQ9e3RoaXMucHJvcHMubG9jYXRpb259Lz5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdFx0e3JvdXRlfVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5cblxuXG5leHBvcnQgY2xhc3MgVmluZXlhcmRUYXNrcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblxuXHRcdHRoaXMubW9kYWxOZXdUYXNrPXRoaXMubW9kYWxOZXdUYXNrLmJpbmQodGhpcyk7XG5cdFx0dGhpcy50YXNrQ2hlY2tlZD10aGlzLnRhc2tDaGVja2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy50YXNrQ2hhbmdlZD10aGlzLnRhc2tDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5lZGl0VGFzaz10aGlzLmVkaXRUYXNrLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5nZXRGb3JtPXRoaXMuZ2V0Rm9ybS5iaW5kKHRoaXMpO1xuXG5cdFx0dGhpcy5kZWxldGU9dGhpcy5kZWxldGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmNsb3NlPXRoaXMuY2xvc2UuYmluZCh0aGlzKTtcblx0XHR0aGlzLnVwZGF0ZT10aGlzLnVwZGF0ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY3JlYXRlPXRoaXMuY3JlYXRlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5vbkNoYW5nZT10aGlzLm9uQ2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0XG5cblx0XHR0aGlzLm1vZGFsSWQ9XCJ0YXNrLWZvcm1cIit0aGlzLnByb3BzLndvcmtvcmRlcjtcblx0XHRcblx0XHR0aGlzLnRhc2tzVG9vbCA9IG5ldyBwcy5hcGlUb29sKHtcIndvcmtfb3JkZXJcIjp0aGlzLnByb3BzLndvcmtvcmRlcn0scHMuYXBpU2V0dXAudmluZXlhcmRUYXNrcyx0aGlzLnRhc2tDaGFuZ2VkKTtcblx0XHR0aGlzLnN0YXRlPXtcblx0XHRcdHRhc2tzOnRoaXMudGFza3NUb29sLml0ZW1zLFxuXHRcdFx0Zm9ybVN0YXRlOiBcInRhc2tUeXBlXCIsXG5cdFx0XHRmb3JtTW9kZTpcImNyZWF0ZVwiLFxuXHRcdFx0ZWRpdEl0ZW06bnVsbFxuXHRcdH07XG5cdH1cblx0bW9kYWxOZXdUYXNrKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRmb3JtU3RhdGU6XCJ0YXNrVHlwZVwiLFxuXHRcdFx0ZWRpdEl0ZW06bnVsbCxcblx0XHRcdGZvcm1Nb2RlOlwiY3JlYXRlXCJcblx0XHR9KTtcblx0XHQkKCcjJyt0aGlzLm1vZGFsSWQpLm1vZGFsKCk7XG5cdH1cblx0aXNDaGVja2VkKHZhbHVlKXtcbiAgICBcdC8vcmV0dXJuICgodmFsdWU9PT10aGlzLnN0YXRlLnNlbGVjdGVkKSA/J2NoZWNrZWQgbGluZS10aHJvdWdoJzonZGVmYXVsdCcpO1xuICBcdH1cbiAgXHR0YXNrQ2hhbmdlZCgpe1xuICBcdFx0dGhpcy5zZXRTdGF0ZSh7dGFza3M6dGhpcy50YXNrc1Rvb2wuaXRlbXN9KTtcbiAgXHR9XG4gIFx0dGFza0NoZWNrZWQoaXRlbSl7XG4gIFx0XHRpdGVtLmNvbXBsZXRlPWl0ZW0uY29tcGxldGU/MDoxO1xuICBcdFx0dGhpcy50YXNrc1Rvb2wudXBkYXRlKGl0ZW0pO1xuICBcdH1cbiAgXHRlZGl0VGFzayhpdGVtKXtcbiAgXHRcdGNvbnNvbGUubG9nKFwiZWRpdCB0YXNrIGNhbGxlZFwiKTtcbiAgXHRcdGNvbnNvbGUubG9nKGl0ZW0pO1xuICBcdFx0dGhpcy5zZXRTdGF0ZShcbiAgXHRcdFx0e1xuICBcdFx0XHRcdGZvcm1TdGF0ZTppdGVtLmRvY3R5cGUucmVwbGFjZSgvXFxzL2csICcnKSxcbiAgXHRcdFx0XHRlZGl0SXRlbTppdGVtLFxuICBcdFx0XHRcdGZvcm1Nb2RlOlwiZWRpdFwiXG4gIFx0XHRcdH0pO1xuICBcdFx0JCgnIycrdGhpcy5tb2RhbElkKS5tb2RhbCgpO1xuICBcdH1cbiAgXHRyZW5kZXJUYXNrcygpe1xuICBcdFx0dmFyIHRhc2tzPVtdO1xuICBcdFx0aWYodGhpcy5zdGF0ZS50YXNrcyE9PXVuZGVmaW5lZCYmdGhpcy5zdGF0ZS50YXNrcyE9PW51bGwpe1xuXHRcdFx0dGFza3M9W107XG5cdFx0XHR0aGlzLnN0YXRlLnRhc2tzLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCl7XG5cdFx0XHRcdC8vdmFyIGNoZWNrZWQ9aXRlbS5zdGF0dXM/dHJ1ZTpmYWxzZTtcblx0XHRcdFx0dGFza3MucHVzaChcblx0XHRcdFx0XHQ8VGFza0NoZWNrIFxuXHRcdFx0XHRcdFx0a2V5PXtpbmRleH1cblx0XHRcdFx0XHRcdGluZGV4PXtpbmRleH1cblx0XHRcdFx0XHRcdGl0ZW09e2l0ZW19XG5cdFx0XHRcdFx0XHRsYWJsZT17aXRlbS5kb2N0eXBlfVxuXHRcdFx0XHRcdFx0Y2hlY2tlZD17aXRlbS5jb21wbGV0ZX1cblx0XHRcdFx0XHRcdHRhc2tDaGVja2VkPXt0aGlzLnRhc2tDaGVja2VkfVxuXHRcdFx0XHRcdFx0ZWRpdFRhc2s9e2Z1bmN0aW9uKGUpe3RoaXMuZWRpdFRhc2soaXRlbSk7fS5iaW5kKHRoaXMpfVxuXHRcdFx0XHRcdC8+KTtcblx0XHRcdH0uYmluZCh0aGlzKSlcblx0XHR9XG5cdFx0cmV0dXJuIHRhc2tzO1xuICBcdH1cbiAgXHRkZWxldGUoY29weSl7XG4gIFx0XHR0aGlzLnRhc2tzVG9vbC5kZWxldGUoY29weSk7XG5cdFx0JCgnIycrdGhpcy5tb2RhbElkKS5tb2RhbCgndG9nZ2xlJyk7XG5cdH1cbiAgXHRjbG9zZShlKXtcbiAgXHRcdGNvbnNvbGUubG9nKFwiY2xvc2VcIik7XG4gIFx0XHQkKCcjJyt0aGlzLm1vZGFsSWQpLm1vZGFsKCd0b2dnbGUnKTtcbiAgXHR9XG4gIFx0dXBkYXRlKGNvcHkpe1xuICBcdFx0dGhpcy50YXNrc1Rvb2wudXBkYXRlKGNvcHkpO1xuXHRcdCQoJyMnK3RoaXMubW9kYWxJZCkubW9kYWwoJ3RvZ2dsZScpO1xuICBcdH1cbiAgXHRjcmVhdGUoaXRlbSxkb2N0eXBlKXtcblx0XHRpdGVtLndvcmtfb3JkZXI9dGhpcy5wcm9wcy53b3Jrb3JkZXI7XG5cdFx0aXRlbS52aW5leWFyZD10aGlzLnByb3BzLnZpbmV5YXJkO1xuXHRcdGl0ZW0uZG9jdHlwZT1kb2N0eXBlO1xuXHRcdHRoaXMudGFza3NUb29sLmNyZWF0ZShpdGVtKTtcblx0XHQkKCcjJyt0aGlzLm1vZGFsSWQpLm1vZGFsKCd0b2dnbGUnKTtcbiAgXHR9XG4gIFx0b25DaGFuZ2UoY29weSl7XG4gIFx0XHR0aGlzLnNldFN0YXRlKHtlZGl0SXRlbTpjb3B5fSlcbiAgXHR9XG4gIFx0Z2V0Rm9ybSgpe1xuICBcdFx0dmFyIGZvcm1zT2JqPXtcblx0XHRcdHRhc2tUeXBlOmZ1bmN0aW9uKCl7XG5cdFx0XHRcdHJldHVybihcdFxuXHRcdFx0XHQ8U2VsZWN0XG5cdFx0XHRcdFx0Y2xhc3NOYW1lPVwiXCJcblx0XHRcdFx0XHRsYWJsZT1cIlRhc2sgVHlwZVwiXG5cdFx0XHRcdFx0b3B0aW9ucz17W1wiIFwiXS5jb25jYXQocHMuYXBpU2V0dXAudmluZXlhcmRUYXNrcy5kb2N0eXBlKX1cblx0XHRcdFx0XHRpbnB1dENoYW5nZWQ9e1xuXHRcdFx0XHRcdFx0ZnVuY3Rpb24oZSl7dGhpcy5zZXRTdGF0ZSh7Zm9ybVN0YXRlOiAgZS50YXJnZXQudmFsdWUucmVwbGFjZSgvXFxzL2csICcnKSAgfSl9LmJpbmQodGhpcylcblx0XHRcdFx0XHR9XG5cdFx0XHRcdC8+XG5cdFx0XHQpfS5iaW5kKHRoaXMpLFxuXHRcdFx0U3ByYXlpbmc6ZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdHJldHVybiAoXHRcdFx0XHRcdFxuXHRcdFx0XHRcdDxEb2N0eXBlRm9ybSBcblx0XHRcdFx0XHRcdGNsb3NlPXt0aGlzLmNsb3NlfVxuXHRcdFx0XHRcdFx0aXRlbUNoYW5nZT17dGhpcy5vbkNoYW5nZX1cblx0XHRcdFx0XHRcdGNyZWF0ZT17dGhpcy5jcmVhdGV9XG5cdFx0XHRcdFx0XHRlZGl0PXt0aGlzLnVwZGF0ZX1cblx0XHRcdFx0XHRcdGRlbGV0ZT17dGhpcy5kZWxldGV9XG5cdFx0XHRcdFx0XHRtb2RlPXt0aGlzLnN0YXRlLmZvcm1Nb2RlfVxuXHRcdFx0XHRcdFx0aXRlbT17aXRlbX1cblx0XHRcdFx0XHRcdGlkPXt0aGlzLnByb3BzLndvcmtvcmRlcn1cblxuXHRcdFx0XHRcdFx0ZG9jdHlwZT1cIlNwcmF5aW5nXCJcblx0XHRcdFx0XHRcdHNlYXNvbj17e2FjdGl2ZToxfX1cblx0XHRcdFx0XHRcdG5vdGU9e3tcblx0XHRcdFx0XHRcdFx0YWN0aXZlOjEsXG5cdFx0XHRcdFx0XHRcdHR5cGU6XCJ0ZXh0YXJlYVwiIFxuXHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdHNwcmF5X3R5cGU9e3thY3RpdmU6MX19XG5cblx0XHRcdFx0XHQvPiBcdFx0XG5cdFx0XHRcdCk7XG5cblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdEhhcnZlc3Q6ZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdHJldHVybiAoXHRcdFx0XHRcdFxuXHRcdFx0XHRcdDxEb2N0eXBlRm9ybSBcblx0XHRcdFx0XHRcdGNsb3NlPXt0aGlzLmNsb3NlfVxuXHRcdFx0XHRcdFx0aXRlbUNoYW5nZT17dGhpcy5vbkNoYW5nZX1cblx0XHRcdFx0XHRcdGNyZWF0ZT17dGhpcy5jcmVhdGV9XG5cdFx0XHRcdFx0XHRlZGl0PXt0aGlzLnVwZGF0ZX1cblx0XHRcdFx0XHRcdGRlbGV0ZT17dGhpcy5kZWxldGV9XG5cdFx0XHRcdFx0XHRtb2RlPXt0aGlzLnN0YXRlLmZvcm1Nb2RlfVxuXHRcdFx0XHRcdFx0aXRlbT17aXRlbX1cblx0XHRcdFx0XHRcdGlkPXt0aGlzLnByb3BzLndvcmtvcmRlcn1cblxuXHRcdFx0XHRcdFx0ZG9jdHlwZT1cIkhhcnZlc3RcIlxuXHRcdFx0XHRcdFx0c2Vhc29uPXt7YWN0aXZlOjF9fVxuXHRcdFx0XHRcdFx0bm90ZT17e1xuXHRcdFx0XHRcdFx0XHRhY3RpdmU6MSxcblx0XHRcdFx0XHRcdFx0dHlwZTpcInRleHRhcmVhXCIgXG5cdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0cG91bmRzPXt7YWN0aXZlOjF9fVxuXHRcdFx0XHRcdFx0cG9zdF9oYXJ2ZXN0X3dhdGVyPXt7YWN0aXZlOjF9fVxuXG5cdFx0XHRcdFx0Lz4gXHRcdFxuXHRcdFx0XHQpO1xuXG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRCaXJkTmV0czpmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0cmV0dXJuIChcdFx0XHRcdFx0XG5cdFx0XHRcdFx0PERvY3R5cGVGb3JtIFxuXHRcdFx0XHRcdFx0Y2xvc2U9e3RoaXMuY2xvc2V9XG5cdFx0XHRcdFx0XHRpdGVtQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxuXHRcdFx0XHRcdFx0Y3JlYXRlPXt0aGlzLmNyZWF0ZX1cblx0XHRcdFx0XHRcdGVkaXQ9e3RoaXMudXBkYXRlfVxuXHRcdFx0XHRcdFx0ZGVsZXRlPXt0aGlzLmRlbGV0ZX1cblx0XHRcdFx0XHRcdG1vZGU9e3RoaXMuc3RhdGUuZm9ybU1vZGV9XG5cdFx0XHRcdFx0XHRpdGVtPXtpdGVtfVxuXHRcdFx0XHRcdFx0aWQ9e3RoaXMucHJvcHMud29ya29yZGVyfVxuXG5cdFx0XHRcdFx0XHRkb2N0eXBlPVwiQmlyZCBOZXRzXCJcblx0XHRcdFx0XHRcdHNlYXNvbj17e2FjdGl2ZToxfX1cblx0XHRcdFx0XHRcdG5vdGU9e3tcblx0XHRcdFx0XHRcdFx0YWN0aXZlOjEsXG5cdFx0XHRcdFx0XHRcdHR5cGU6XCJ0ZXh0YXJlYVwiIFxuXHRcdFx0XHRcdFx0fX1cblxuXHRcdFx0XHRcdC8+IFx0XHRcblx0XHRcdFx0KTtcblxuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0V2F0ZXJpbmc6ZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdHJldHVybiAoXHRcdFx0XHRcdFxuXHRcdFx0XHRcdDxEb2N0eXBlRm9ybSBcblx0XHRcdFx0XHRcdGNsb3NlPXt0aGlzLmNsb3NlfVxuXHRcdFx0XHRcdFx0aXRlbUNoYW5nZT17dGhpcy5vbkNoYW5nZX1cblx0XHRcdFx0XHRcdGNyZWF0ZT17dGhpcy5jcmVhdGV9XG5cdFx0XHRcdFx0XHRlZGl0PXt0aGlzLnVwZGF0ZX1cblx0XHRcdFx0XHRcdGRlbGV0ZT17dGhpcy5kZWxldGV9XG5cdFx0XHRcdFx0XHRtb2RlPXt0aGlzLnN0YXRlLmZvcm1Nb2RlfVxuXHRcdFx0XHRcdFx0aXRlbT17aXRlbX1cblx0XHRcdFx0XHRcdGlkPXt0aGlzLnByb3BzLndvcmtvcmRlcn1cblxuXHRcdFx0XHRcdFx0ZG9jdHlwZT1cIldhdGVyaW5nXCJcblx0XHRcdFx0XHRcdHNlYXNvbj17e2FjdGl2ZToxfX1cblx0XHRcdFx0XHRcdG5vdGU9e3tcblx0XHRcdFx0XHRcdFx0YWN0aXZlOjEsXG5cdFx0XHRcdFx0XHRcdHR5cGU6XCJ0ZXh0YXJlYVwiIFxuXHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdGR1cmF0aW9uPXt7YWN0aXZlOjF9fVxuXG5cdFx0XHRcdFx0Lz4gXHRcdFxuXHRcdFx0XHQpO1xuXG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRDYW5vcHk6ZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdHJldHVybiAoXHRcdFx0XHRcdFxuXHRcdFx0XHRcdDxEb2N0eXBlRm9ybSBcblx0XHRcdFx0XHRcdGNsb3NlPXt0aGlzLmNsb3NlfVxuXHRcdFx0XHRcdFx0aXRlbUNoYW5nZT17dGhpcy5vbkNoYW5nZX1cblx0XHRcdFx0XHRcdGNyZWF0ZT17dGhpcy5jcmVhdGV9XG5cdFx0XHRcdFx0XHRlZGl0PXt0aGlzLnVwZGF0ZX1cblx0XHRcdFx0XHRcdGRlbGV0ZT17dGhpcy5kZWxldGV9XG5cdFx0XHRcdFx0XHRtb2RlPXt0aGlzLnN0YXRlLmZvcm1Nb2RlfVxuXHRcdFx0XHRcdFx0aXRlbT17aXRlbX1cblx0XHRcdFx0XHRcdGlkPXt0aGlzLnByb3BzLndvcmtvcmRlcn1cblxuXHRcdFx0XHRcdFx0ZG9jdHlwZT1cIkNhbm9weVwiXG5cdFx0XHRcdFx0XHRzZWFzb249e3thY3RpdmU6MX19XG5cdFx0XHRcdFx0XHRub3RlPXt7XG5cdFx0XHRcdFx0XHRcdGFjdGl2ZToxLFxuXHRcdFx0XHRcdFx0XHR0eXBlOlwidGV4dGFyZWFcIiBcblx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHR0eXBlPXt7YWN0aXZlOjF9fVxuXG5cdFx0XHRcdFx0Lz4gXHRcdFxuXHRcdFx0XHQpO1xuXG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRQcnVuaW5nOmZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKFwiTU9ERVwiLCB0aGlzLnN0YXRlLmZvcm1Nb2RlKTtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8RG9jdHlwZUZvcm0gXG5cdFx0XHRcdFx0XHRjbG9zZT17dGhpcy5jbG9zZX1cblx0XHRcdFx0XHRcdGl0ZW1DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG5cdFx0XHRcdFx0XHRjcmVhdGU9e3RoaXMuY3JlYXRlfVxuXHRcdFx0XHRcdFx0ZWRpdD17dGhpcy51cGRhdGV9XG5cdFx0XHRcdFx0XHRkZWxldGU9e3RoaXMuZGVsZXRlfVxuXHRcdFx0XHRcdFx0bW9kZT17dGhpcy5zdGF0ZS5mb3JtTW9kZX1cblx0XHRcdFx0XHRcdGl0ZW09e2l0ZW19XG5cdFx0XHRcdFx0XHRpZD17dGhpcy5wcm9wcy53b3Jrb3JkZXJ9XG5cblx0XHRcdFx0XHRcdGRvY3R5cGU9XCJQcnVuaW5nXCJcblx0XHRcdFx0XHRcdHNlYXNvbj17e2FjdGl2ZToxfX1cblx0XHRcdFx0XHRcdG5vdGU9e3tcblx0XHRcdFx0XHRcdFx0YWN0aXZlOjEsXG5cdFx0XHRcdFx0XHRcdHR5cGU6XCJ0ZXh0YXJlYVwiIFxuXHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdHR5cGU9e3thY3RpdmU6MX19XG5cdFx0XHRcdFx0XHRiX2xvY2s9e3thY3RpdmU6MX19XG5cdFx0XHRcdFx0XHRyZW1vdmVkPXt7YWN0aXZlOjF9fVxuXHRcdFx0XHRcdFx0cHJlX3BydW5lPXt7YWN0aXZlOjF9fVxuXHRcdFx0XHRcdFx0dGFwX3JlbW92ZWQ9e3thY3RpdmU6MX19XG5cblx0XHRcdFx0XHQvPiBcdFx0XG5cdFx0XHRcdCk7XG5cblx0XHRcdH0uYmluZCh0aGlzKVxuXHRcdH07XG5cdFx0Ly9jb25zb2xlLmxvZyhcImdldCBmb3JtIGNhbGxlZFwiKTtcblx0XHRyZXR1cm4gZm9ybXNPYmpbdGhpcy5zdGF0ZS5mb3JtU3RhdGVdKHRoaXMuc3RhdGUuZWRpdEl0ZW0pO1xuICBcdH1cblx0cmVuZGVyKCl7XG5cdFx0dmFyIGZpZWxkc1NwcmF5PVtcdFx0XG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiYnV0dG9uXCIsXG5cdFx0XHRcdHR5cGU6XCJzdWJtaXRcIixcblx0XHRcdFx0dmFsdWU6XCJDcmVhdGUgU3ByYXlpbmcgRW50cnlcIixcblx0XHRcdFx0Y2xhc3NOYW1lOlwiYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiLFxuXHRcdFx0XHRvbkNsaWNrOnRoaXMuc3VibWl0XG5cdFx0XHR9XG5cdFx0XVxuXHRcdHZhciB0YXNrcz10aGlzLnJlbmRlclRhc2tzKCk7XG5cdFx0dmFyIGZvcm09dGhpcy5nZXRGb3JtKCk7XG5cdFx0dmFyIGxhYmxlPVwiQ3JlYXRlIE5ldyBUYXNrXCI7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9Jyc+XG5cdFx0XHR7dGFza3N9XG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoZWNrYm94IHJvdyBhZGRidXR0b25cIj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJlZGl0XCI+IFxuXHRcdFx0XHRcdDxidXR0b24gXG5cdFx0XHRcdFx0XHR0eXBlPVwiYnV0dG9uXCIgXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHQgaW5saW5lLXRhc2tcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17dGhpcy5tb2RhbE5ld1Rhc2t9XG5cdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzIFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj4gQWRkIFRhc2tcblx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PE1vZGFsIFxuXHRcdFx0XHRcdGlkPXt0aGlzLm1vZGFsSWR9IFxuXHRcdFx0XHRcdHN1Ym1pdFRleHQ9XCJTdWJtaXRcIiBcblx0XHRcdFx0XHR0aXRsZT17bGFibGV9XG5cdFx0XHRcdFx0c3VibWl0PXtmYWxzZX1cblx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0e2Zvcm19XG5cdFx0XHRcdDwvTW9kYWw+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cblxuIiwiaW1wb3J0IEZvcm0gZnJvbSAnLi4vdXRpbHMvZm9ybXMnXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdHlwZUZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5jb21wb25lbnRXaWxsVXBkYXRlPXRoaXMuY29tcG9uZW50V2lsbFVwZGF0ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZG9jdHlwZVRvb2xVcGRhdGU9dGhpcy5kb2N0eXBlVG9vbFVwZGF0ZS5iaW5kKHRoaXMpO1xuXG5cdFx0dGhpcy5zdWJtaXQ9dGhpcy5zdWJtaXQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnNhdmU9dGhpcy5zYXZlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5kZWxldGU9dGhpcy5kZWxldGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmRvY3R5cGVUb29sID0gbmV3IHBzLmFwaVRvb2woe25hbWU6dGhpcy5wcm9wcy5kb2N0eXBlfSx7ZG9jdHlwZTonRG9jVHlwZSd9LHRoaXMuZG9jdHlwZVRvb2xVcGRhdGUsdGhpcy5mb3JjZVVwZGF0ZSk7XG5cdFx0dGhpcy5zdGF0ZT17aXRlbXM6dGhpcy5kb2N0eXBlVG9vbC5pdGVtc307XG5cdFx0Ly90aGlzLmRvY3R5cGVUb29sID0gbmV3IHBzLmFwaVRvb2woe25hbWU6dGhpcy5wcm9wcy5kb2N0eXBlfSx7ZG9jdHlwZTonRG9jVHlwZSd9LHRoaXMuZG9jdHlwZVRvb2xVcGRhdGUpO1xuXHR9XG5cdGNvbXBvbmVudFdpbGxVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpe1xuXHRcdGlmKHRoaXMucHJvcHMuZG9jdHlwZSAhPSBuZXh0UHJvcHMuZG9jdHlwZSl7XG5cdFx0XHR0aGlzLmRvY3R5cGVUb29sID0gbmV3IHBzLmFwaVRvb2woe25hbWU6bmV4dFByb3BzLmRvY3R5cGV9LHtkb2N0eXBlOidEb2NUeXBlJ30sdGhpcy5kb2N0eXBlVG9vbFVwZGF0ZSx0aGlzLmZvcmNlVXBkYXRlKTtcblx0XHR9XG5cdH1cblx0ZG9jdHlwZVRvb2xVcGRhdGUoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtpdGVtczp0aGlzLmRvY3R5cGVUb29sLml0ZW1zfSlcblx0fVxuXHRzdWJtaXQoZSl7XG5cdFx0Ly9GT1JNIFZBTElEQVRJT04gXG5cdFx0Ly9pZih0aGlzLnByb3BzLml0ZW0udmluZXlhcmQ9PVwiXCIgfHx0aGlzLnByb3BzLml0ZW0uc3ByYXlfdHlwZT09XCJcIiB8fCAobW9tZW50KHRoaXMucHJvcHMuaXRlbS5kYXRlLFwiTU0vREQvWVlZWVwiKS5pc1ZhbGlkKCkpIT09dHJ1ZSl7XG5cdFx0Ly9cdGNvbnNvbGUubG9nKFwibm90IHZhbGlkXCIpO1xuXHRcdC8vfWVsc2V7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR0aGlzLnByb3BzLmNyZWF0ZSh0aGlzLnByb3BzLml0ZW0sdGhpcy5wcm9wcy5kb2N0eXBlKTtcblx0XHQvL31cblx0fVxuXHRzYXZlKGUpe1xuXHRcdC8vIGlmKHRoaXMucHJvcHMuaXRlbS52aW5leWFyZD09XCJcIiB8fHRoaXMucHJvcHMuaXRlbS5zcHJheV90eXBlPT1cIlwiIHx8IChtb21lbnQodGhpcy5wcm9wcy5pdGVtLmRhdGUsXCJNTS9ERC9ZWVlZXCIpLmlzVmFsaWQoKSkhPT10cnVlKXtcblx0XHQvLyBcdGNvbnNvbGUubG9nKFwibm90IHZhbGlkXCIpO1xuXHRcdC8vIH1lbHNle1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dGhpcy5wcm9wcy5lZGl0KHRoaXMucHJvcHMuaXRlbSk7XG5cdFx0Ly8gfVxuXHR9XG5cdGRlbGV0ZShlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5wcm9wcy5kZWxldGUodGhpcy5wcm9wcy5pdGVtKTtcblx0fVxuXHRjcmVhdGVGb3JtSnNvbigpe1xuXHRcdHZhciBjcmVhdGVIaWRkZW49KHRoaXMucHJvcHMubW9kZSE9XCJjcmVhdGVcIik/XCIgaGlkZGVuXCI6XCIgbm9wZVwiO1xuXHRcdHZhciBlZGl0SGlkZGVuPSh0aGlzLnByb3BzLm1vZGUhPVwiZWRpdFwiKT9cIiBoaWRkZW5cIjpcIiBub3BlXCI7XG5cdFx0dmFyIGZpZWxkc0pzb249dGhpcy5zdGF0ZS5pdGVtc1swXS5maWVsZHM7XG5cdFx0dmFyIGZpZWxkcz1bXTtcblx0XHR2YXIgZmllbGRPYmplY3Q9e1xuXHRcdFx0TGluazogZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZmllbGQ6XCJhdXRvQ29tcGxldGVcIixcblx0XHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0XHRjb3B5W2l0ZW0uZmllbGRuYW1lXT1lLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdFx0bGFibGU6aXRlbS5sYWJlbCxcblx0XHRcdFx0XHR2YWx1ZTpjb3B5W2l0ZW0uZmllbGRuYW1lXSxcblx0XHRcdFx0XHRkb2N0eXBlOml0ZW0ub3B0aW9ucyxcblx0XHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIlxuXHRcdFx0XHR9XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRDaGVjazogZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZmllbGQ6XCJjaGVja1wiLFxuXHRcdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRcdGNvcHlbaXRlbS5maWVsZG5hbWVdPWUudGFyZ2V0LmNoZWNrZWQ7XG5cdFx0XHRcdFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRcdGxhYmxlOml0ZW0ubGFiZWwsXG5cdFx0XHRcdFx0dmFsdWU6Y29weVtpdGVtLmZpZWxkbmFtZV0sXG5cdFx0XHRcdFx0Y2xhc3NOYW1lOiBcImJpZy1jaGVja2JveFwiXG5cdFx0XHRcdH1cblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdEludDogZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZmllbGQ6XCJpbnB1dFwiLFxuXHRcdFx0XHRcdHR5cGU6XCJudW1iZXJcIixcblx0XHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0XHRjb3B5W2l0ZW0uZmllbGRuYW1lXT1lLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdFx0dmFsdWU6Y29weVtpdGVtLmZpZWxkbmFtZV0sXG5cdFx0XHRcdFx0bGFibGU6aXRlbS5sYWJlbFxuXHRcdFx0XHR9O1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0U2VsZWN0OiBmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0dmFyIG9wdGlvbnM9aXRlbS5vcHRpb25zLnNwbGl0KCBcIlxcblwiICk7XG5cdFx0XHRcdC8vIGlmKGNvcHlbaXRlbS5maWVsZG5hbWVdIT1cIlwiKXtcblx0XHRcdFx0Ly8gXHRjb3B5W2l0ZW0uZmllbGRuYW1lXT1vcHRpb25zWzBdO1xuXHRcdFx0XHQvLyBcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0Ly8gfVxuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGZpZWxkOlwic2VsZWN0XCIsXG5cdFx0XHRcdFx0dHlwZTpcIm51bWJlclwiLFxuXHRcdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRcdGNvcHlbaXRlbS5maWVsZG5hbWVdPWUudGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0XHRsYWJsZTppdGVtLmxhYmVsLFxuXHRcdFx0XHRcdHZhbHVlOmNvcHlbaXRlbS5maWVsZG5hbWVdLFxuXHRcdFx0XHRcdG9wdGlvbnM6b3B0aW9uc1xuXHRcdFx0XHR9O1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0RGF0YTogZnVuY3Rpb24oaXRlbSxwcm9wT3B0aW9ucyl7XG5cdFx0XHRcdGlmKHByb3BPcHRpb25zLnR5cGU9PVwidGV4dGFyZWFcIil7XG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdGZpZWxkOlwidGV4dGFyZWFcIixcblx0XHRcdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRcdFx0Y29weVtpdGVtLmZpZWxkbmFtZV09ZS50YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0XHRcdHZhbHVlOmNvcHlbaXRlbS5maWVsZG5hbWVdLFxuXHRcdFx0XHRcdFx0bGFibGU6aXRlbS5sYWJlbFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0ZmllbGQ6XCJpbnB1dFwiLFxuXHRcdFx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdFx0XHRjb3B5W2l0ZW0uZmllbGRuYW1lXT1lLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHRcdFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRcdFx0dmFsdWU6Y29weVtpdGVtLmZpZWxkbmFtZV0sXG5cdFx0XHRcdFx0XHRsYWJsZTppdGVtLmxhYmVsXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0RGF0ZTogZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZmllbGQ6XCJkYXRlXCIsXG5cdFx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdFx0Y29weVtpdGVtLmZpZWxkbmFtZV09ZS50YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRcdGxhYmxlOml0ZW0ubGFiZWxcblx0XHRcdFx0fVxuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdH1cblxuXHRcdGlmKHRoaXMucHJvcHMuaXRlbT09bnVsbCl7XG5cdFx0XHR2YXIgY29weT17fVxuXHRcdH1lbHNle1xuXHRcdFx0dmFyIGNvcHk9cHMuY2xvbmUodGhpcy5wcm9wcy5pdGVtKTtcblx0XHR9XG5cblx0XHQvL2xvb3AgdGhlIGpzb24gb2JqZWN0XG5cdFx0Ly9wcm9iYWJseSBjaGFuZ2UgdGhpcyB0byB3aWxsTW91bnRcblx0XHRjb25zb2xlLmxvZyhmaWVsZHNKc29uKTtcblxuXHRcdGZvcih2YXIgeCA9IDA7IHggPCBmaWVsZHNKc29uLmxlbmd0aDsgeCsrKXtcblx0XHRcdHZhciBjdXJyZW50RmllbGQ9ZmllbGRzSnNvblt4XTtcblx0XHRcdGNvbnNvbGUubG9nKGN1cnJlbnRGaWVsZC5maWVsZG5hbWUpO1xuXHRcdFx0Ly8gY2hlY2sgaWYgdGhpcyBmaWVsZCB3YXMgZW5hYmxlZFxuXG5cdFx0XHRpZiAodGhpcy5wcm9wc1tjdXJyZW50RmllbGQuZmllbGRuYW1lXSl7XG5cdFx0XHRcdC8vdGhlcmUgaXMgYSBwcm9wcyBmb3IgdGhpcyBmaWVsZFxuXG5cdFx0XHRcdGlmKHRoaXMucHJvcHNbY3VycmVudEZpZWxkLmZpZWxkbmFtZV0uYWN0aXZlID09PSAxKXtcblx0XHRcdFx0XHQvL2FuZCB0aGUgZmllbGQgaXMgc2V0IHRvIGFjdGl2ZVxuXG5cdFx0XHRcdFx0aWYoZmllbGRPYmplY3RbY3VycmVudEZpZWxkLmZpZWxkdHlwZV0pe1xuXHRcdFx0XHRcdFx0Ly9GZWlsZCB0eXBlIGNhbiBiZSBoYW5kbGVkP1xuXHRcdFx0XHRcdFx0Ly9oYW5kbGUgdGhlIGNyZWF0aW9uIG9mIGNvcHkgYW5kIHRoZSBkZWZhdWx0IHZhbHVlc1xuXG5cdFx0XHRcdFx0XHRpZih0aGlzLnByb3BzLm1vZGU9PVwiY3JlYXRlXCIpe1xuXHRcdFx0XHRcdFx0XHRpZihjb3B5W2N1cnJlbnRGaWVsZC5maWVsZG5hbWVdKXtcblx0XHRcdFx0XHRcdFx0XHQvL3RoZSBmaWVsZCBhbHJlYWR5IGV4aXN0c1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGVsc2UgaWYodGhpcy5wcm9wc1tjdXJyZW50RmllbGQuZmllbGRuYW1lXS5kZWZhdWx0KXtcblx0XHRcdFx0XHRcdFx0XHQvL3NldCB0byBkZWZhdWx0IHZhbHVlXG5cdFx0XHRcdFx0XHRcdFx0Y29weVtjdXJyZW50RmllbGQuZmllbGRuYW1lXT10aGlzLnByb3BzW2N1cnJlbnRGaWVsZC5maWVsZG5hbWVdLmRlZmF1bHQ7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHRcdFx0XHRjb3B5W2N1cnJlbnRGaWVsZC5maWVsZG5hbWVdPVwiXCI7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8vY29uc29sZS5sb2coY3VycmVudEZpZWxkLmZpZWxkbmFtZSk7XG5cdFx0XHRcdFx0XHRmaWVsZHMucHVzaChmaWVsZE9iamVjdFtjdXJyZW50RmllbGQuZmllbGR0eXBlXShjdXJyZW50RmllbGQsdGhpcy5wcm9wc1tjdXJyZW50RmllbGQuZmllbGRuYW1lXSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRpZighKFwiZG9jdHlwZVwiIGluIGNvcHkpKXtcblx0XHRcdGNvcHkuZG9jdHlwZT10aGlzLnByb3BzLmRvY3R5cGU7XG5cdFx0fVxuXHRcdC8vYWRkaW5nIGJ1dHRvbiBmZWlsZHNcblx0XHRmaWVsZHMucHVzaCh7XG5cdFx0XHRcdGZpZWxkOlwiYnV0dG9uXCIsXG5cdFx0XHRcdHR5cGU6XCJzdWJtaXRcIixcblx0XHRcdFx0dmFsdWU6XCJDcmVhdGUgXCIgKyB0aGlzLnByb3BzLmRvY3R5cGUgKyBcIiBFbnRyeVwiLFxuXHRcdFx0XHRjbGFzc05hbWU6XCJidG4tcHJpbWFyeSBwdWxsLXJpZ2h0IFwiICsgY3JlYXRlSGlkZGVuLFxuXHRcdFx0XHRvbkNsaWNrOnRoaXMuc3VibWl0XG5cdFx0XHR9KTtcblx0XHRpZih0aGlzLnByb3BzLmNsb3NlKXtcblx0XHRcdGZpZWxkcy5wdXNoKHtcblx0XHRcdFx0XHRmaWVsZDpcImJ1dHRvblwiLFxuXHRcdFx0XHRcdHZhbHVlOlwiQ2xvc2VcIixcblx0XHRcdFx0XHRjbGFzc05hbWU6XCJwdWxsLXJpZ2h0IFwiKyBlZGl0SGlkZGVuLFxuXHRcdFx0XHRcdG9uQ2xpY2s6ZnVuY3Rpb24oZSl7IGUucHJldmVudERlZmF1bHQoKTt0aGlzLnByb3BzLmNsb3NlKCk7fS5iaW5kKHRoaXMpXG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZmllbGRzLnB1c2goe1xuXHRcdFx0XHRmaWVsZDpcImJ1dHRvblwiLFxuXHRcdFx0XHR0eXBlOlwic3VibWl0XCIsXG5cdFx0XHRcdHZhbHVlOlwiRGVsZXRlXCIsXG5cdFx0XHRcdGNsYXNzTmFtZTpcImJ0bi1kYW5nZXIgcHVsbC1yaWdodCBcIisgZWRpdEhpZGRlbixcblx0XHRcdFx0b25DbGljazp0aGlzLmRlbGV0ZVxuXHRcdH0pO1xuXHRcdGZpZWxkcy5wdXNoKFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImJ1dHRvblwiLFxuXHRcdFx0XHR0eXBlOlwic3VibWl0XCIsXG5cdFx0XHRcdHZhbHVlOlwiU2F2ZVwiLFxuXHRcdFx0XHRjbGFzc05hbWU6XCJidG4tc3VjY2VzcyBwdWxsLXJpZ2h0IFwiKyBlZGl0SGlkZGVuLFxuXHRcdFx0XHRvbkNsaWNrOnRoaXMuc2F2ZVxuXHRcdFx0fSk7XG5cdFx0cmV0dXJuIGZpZWxkcztcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR2YXIgb3V0cHV0PXt9O1xuXHRcdGlmKHRoaXMuc3RhdGUuaXRlbXMhPT1udWxsKXtcblx0XHRcdHZhciBmaWVsZHM9dGhpcy5jcmVhdGVGb3JtSnNvbigpO1xuXHRcdFx0dmFyIG91dHB1dCA9IChcdFx0XHRcdFxuXHRcdFx0XHQ8Rm9ybVxuXHRcdFx0XHRcdGlkPXt0aGlzLnByb3BzLmlkfVxuXHRcdFx0XHRcdHR5cGU9XCJob3Jpem9udGFsXCJcblx0XHRcdFx0XHRmaWVsZHM9e2ZpZWxkc31cblx0XHRcdFx0Lz4pO1xuXHRcdH1lbHNleyBcblx0XHRcdG91dHB1dCA9ICg8ZGl2PiBMb2FkaW5nLi4uIDwvZGl2Pik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XHRcdFxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuIiwiLyogZm9ybXMgKi9cbi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuc3VibWl0PXRoaXMuc3VibWl0LmJpbmQodGhpcyk7XG5cdH1cblx0c3VibWl0KGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR0aGlzLnByb3BzLnN1Ym1pdChlKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR2YXIgZm9ybT1bXTtcblx0XHR2YXIgZm9ybVR5cGVzPXtcblx0XHRcdHNlbGVjdFx0OiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0dmFyIG9wdGluYWw9W1widmFsdWVcIixcImxhYmxlXCIsXCJvcHRpb25zXCIsXCJjbGFzc05hbWVcIixcInJlYWRvbmx5XCIsXCJkaXNhYmxlZFwiLFwicmVxdWlyZVwiXTtcblx0XHRcdFx0dmFyIHByb3BzPXBzLmluaXRQcm9wcyhvcHRpbmFsLGl0ZW0pO1xuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxTZWxlY3Rcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH1cblx0XHRcdFx0XHRcdHZhbHVlPXtwcm9wcy52YWx1ZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17cHJvcHMuY2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0bGFibGU9e3Byb3BzLmxhYmxlfVxuXHRcdFx0XHRcdFx0b3B0aW9ucz17cHJvcHMub3B0aW9uc31cblx0XHRcdFx0XHRcdHJlYWRvbmx5PXtwcm9wcy5yZWFkb25seX1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXtwcm9wcy5kaXNhYmxlZH1cblx0XHRcdFx0XHRcdHJlcXVpcmVkPXtwcm9wcy5yZXF1aXJlZH1cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKTt9fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRjaGVjayA6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHR2YXIgcHJvcHM9W1widmFsdWVcIixcImxhYmxlXCIsXCJjbGFzc05hbWVcIixcInJlYWRvbmx5XCIsXCJkaXNhYmxlZFwiLFwicmVxdWlyZVwiLFwidmFsdWVcIl07XG5cdFx0XHRcdHByb3BzPXBzLmluaXRQcm9wcyhwcm9wcyxpdGVtKTtcblxuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxDaGVja1xuXHRcdFx0XHRcdFx0a2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fVxuXHRcdFx0XHRcdFx0dmFsdWU9e3Byb3BzLnZhbHVlfVxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXtwcm9wcy5jbGFzc05hbWV9XG5cdFx0XHRcdFx0XHRsYWJsZT17cHJvcHMubGFibGV9XG5cdFx0XHRcdFx0XHRyZWFkT25seT17cHJvcHMucmVhZG9ubHl9XG5cdFx0XHRcdFx0XHRkaXNhYmxlZD17cHJvcHMuZGlzYWJsZWR9XG5cdFx0XHRcdFx0XHRyZXF1aXJlZD17cHJvcHMucmVxdWlyZWR9XG5cdFx0XHRcdFx0XHRpbnB1dENoYW5nZWQ9e2Z1bmN0aW9uKGUpe2l0ZW0ub25DaGFuZ2UoZSk7fX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXG5cdFx0XHR0ZXh0YXJlYSA6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHR2YXIgcHJvcHM9W1widmFsdWVcIixcImxhYmxlXCIsXCJjbGFzc05hbWVcIixcInJlYWRvbmx5XCIsXCJkaXNhYmxlZFwiLFwicmVxdWlyZVwiLFwidmFsdWVcIixcInJvd3NcIl07XG5cdFx0XHRcdHByb3BzPXBzLmluaXRQcm9wcyhwcm9wcyxpdGVtKTtcblxuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxUZXh0YXJlYVxuXHRcdFx0XHRcdFx0a2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fVxuXHRcdFx0XHRcdFx0dmFsdWU9e3Byb3BzLnZhbHVlfVxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXtwcm9wcy5jbGFzc05hbWV9XG5cdFx0XHRcdFx0XHRsYWJsZT17cHJvcHMubGFibGV9XG5cdFx0XHRcdFx0XHRyZWFkT25seT17cHJvcHMucmVhZG9ubHl9XG5cdFx0XHRcdFx0XHRkaXNhYmxlZD17cHJvcHMuZGlzYWJsZWR9XG5cdFx0XHRcdFx0XHRyZXF1aXJlZD17cHJvcHMucmVxdWlyZWR9XG5cdFx0XHRcdFx0XHRyb3dzPXtwcm9wcy5yb3dzfVxuXHRcdFx0XHRcdFx0aW5wdXRDaGFuZ2VkPXtmdW5jdGlvbihlKXtpdGVtLm9uQ2hhbmdlKGUpO319XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGlucHV0IFx0OiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0dmFyIHByb3BzPVtcInR5cGVcIixcInZhbHVlXCIsXCJwbGFjZWhvbGRlclwiLFwibGFibGVcIixcImNsYXNzTmFtZVwiLFwicmVhZG9ubHlcIixcImRpc2FibGVkXCIsXCJyZXF1aXJlZFwiLFwiZXJyb3JcIl07XG5cdFx0XHRcdHByb3BzPXBzLmluaXRQcm9wcyhwcm9wcyxpdGVtKTtcblx0XHRcdFx0aWYocHJvcHMudHlwZT09XCJcIil7XG5cdFx0XHRcdFx0cHJvcHMudHlwZT1cInRleHRcIjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PElucHV0XG5cdFx0XHRcdFx0XHRrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9XG5cdFx0XHRcdFx0XHR0eXBlPXtwcm9wcy50eXBlfVxuXHRcdFx0XHRcdFx0dmFsdWU9e3Byb3BzLnZhbHVlfVxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9e3Byb3BzLnBsYWNlaG9sZGVyfVxuXHRcdFx0XHRcdFx0bGFibGU9e3Byb3BzLmxhYmxlfVxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXtwcm9wcy5jbGFzc05hbWV9XG5cdFx0XHRcdFx0XHRyZWFkb25seT17cHJvcHMucmVhZG9ubHl9XG5cdFx0XHRcdFx0XHRkaXNhYmxlZD17cHJvcHMuZGlzYWJsZWR9XG5cdFx0XHRcdFx0XHRyZXF1aXJlZD17cHJvcHMucmVxdWlyZWR9XG5cdFx0XHRcdFx0XHRlcnJvcj17cHJvcHMuZXJyb3J9XG5cdFx0XHRcdFx0XHRpbnB1dENoYW5nZWQ9e2Z1bmN0aW9uKGUpe2l0ZW0ub25DaGFuZ2UoZSl9fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRsYWJsZSBcdDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHJldHVybiAoXG4gICAgXHRcdFx0XHQ8bGFiZWwga2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fSA+e2l0ZW0ubGFibGV9PC9sYWJlbD5cblxuICAgIFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRyYWRpb1x0OiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0cmV0dXJuICg8ZGl2PjwvZGl2Pik7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRoZWFkZXI6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHRyZXR1cm4oPGgzIGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH0gPntpdGVtLmxhYmxlfTwvaDM+KVxuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0ZGF0ZTogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IChpdGVtLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS52YWx1ZTtcblx0XHRcdFx0dmFyIGxhYmxlID0gKGl0ZW0ubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmxhYmxlO1xuXHRcdFx0XHR2YXIgcGxhY2Vob2xkZXIgPSAoaXRlbS5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucGxhY2Vob2xkZXI7XG5cdFx0XHRcdHZhciBjbGFzc05hbWUgPSAoaXRlbS5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmNsYXNzTmFtZTtcblx0XHRcdFx0dmFyIHJlYWRvbmx5ID0gKGl0ZW0ucmVhZG9ubHkgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnJlYWRvbmx5O1xuXHRcdFx0XHR2YXIgZGlzYWJsZWQgPSAoaXRlbS5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uZGlzYWJsZWQ7XG5cdFx0XHRcdHZhciByZXF1aXJlZCA9IChpdGVtLnJlcXVpcmVkID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5yZXF1aXJlZDtcblx0XHRcdFx0cmV0dXJuKFxuXHRcdFx0XHRcdDxEYXRlSW5wdXRcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH1cblx0XHRcdFx0XHRcdHZhbHVlPXt2YWx1ZX1cblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cblx0XHRcdFx0XHRcdGxhYmxlPXtsYWJsZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0aW5wdXRDaGFuZ2VkPXtmdW5jdGlvbihlKXtpdGVtLm9uQ2hhbmdlKGUpfX1cblx0XHRcdFx0XHRcdHJlYWRvbmx5PXtyZWFkb25seX1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXtkaXNhYmxlZH1cblx0XHRcdFx0XHRcdHJlcXVpcmVkPXtyZXF1aXJlZH1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0YXV0b0NvbXBsZXRlOiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0dmFyIHZhbHVlID0gKGl0ZW0udmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnZhbHVlO1xuXHRcdFx0XHR2YXIgbGFibGUgPSAoaXRlbS5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ubGFibGU7XG5cdFx0XHRcdHZhciBwbGFjZWhvbGRlciA9IChpdGVtLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5wbGFjZWhvbGRlcjtcblx0XHRcdFx0dmFyIGNsYXNzTmFtZSA9IChpdGVtLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uY2xhc3NOYW1lO1xuXHRcdFx0XHR2YXIgcmVhZG9ubHkgPSAoaXRlbS5yZWFkb25seSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucmVhZG9ubHk7XG5cdFx0XHRcdHZhciBkaXNhYmxlZCA9IChpdGVtLmRpc2FibGVkID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5kaXNhYmxlZDtcblx0XHRcdFx0dmFyIHJlcXVpcmVkID0gKGl0ZW0ucmVxdWlyZWQgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnJlcXVpcmVkO1xuXG5cdFx0XHRcdHJldHVybihcblx0XHRcdFx0XHQ8QXdlc29tcGxldGVJbnB1dFxuXHRcdFx0XHRcdFx0a2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fVxuXHRcdFx0XHRcdFx0ZG9jdHlwZT17aXRlbS5kb2N0eXBlfVxuXHRcdFx0XHRcdFx0ZG9jdmFsdWU9e2l0ZW0uZG9jdmFsdWV9XG5cdFx0XHRcdFx0XHRkb2NsYWJsZT17aXRlbS5kb2NsYWJsZX1cblx0XHRcdFx0XHRcdHZhbHVlPXt2YWx1ZX1cblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cblx0XHRcdFx0XHRcdGxhYmxlPXtsYWJsZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0cmVhZG9ubHk9e3JlYWRvbmx5fVxuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ9e2Rpc2FibGVkfVxuXHRcdFx0XHRcdFx0cmVxdWlyZWQ9e3JlcXVpcmVkfVxuXHRcdFx0XHRcdFx0aW5wdXRDaGFuZ2VkPXtmdW5jdGlvbihlKXtpdGVtLm9uQ2hhbmdlKGUpfX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0YnV0dG9uOiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0dmFyIG9wdGluYWw9W1widmFsdWVcIixcImNsYXNzTmFtZVwiLFwiZGlzYWJsZWRcIixcImljb25cIl07XG5cdFx0XHRcdHZhciBwcm9wcz1wcy5pbml0UHJvcHMob3B0aW5hbCxpdGVtKTtcblx0XHRcdFx0cmV0dXJuKFxuXHRcdFx0XHRcdDxCdXR0b25cblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH1cblx0XHRcdFx0XHRcdHZhbHVlPXtwcm9wcy52YWx1ZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17cHJvcHMuY2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ9e3Byb3BzLmRpc2FibGVkfVxuXHRcdFx0XHRcdFx0aWNvbj17cHJvcHMuaWNvbn1cblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2Z1bmN0aW9uKGUpe2l0ZW0ub25DbGljayhlKX19XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKVxuXHRcdH1cblx0XHR0aGlzLnByb3BzLmZpZWxkcy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXHRcdFx0aWYoJC5pc0VtcHR5T2JqZWN0KGl0ZW0pKXtcblxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGlmKHRoaXMucHJvcHMudHlwZT09XCJpbmxpbmVcIil7XG5cdFx0XHRcdFx0dmFyIHJvd0NsYXNzPTEyL3RoaXMucHJvcHMucm93cztcblx0XHRcdFx0XHRyb3dDbGFzcz1cImNvbC14cy1cIityb3dDbGFzcztcblx0XHRcdFx0XHRmb3JtLnB1c2goPGRpdiBjbGFzc05hbWU9e3Jvd0NsYXNzfT57Zm9ybVR5cGVzW2l0ZW0uZmllbGRdKGl0ZW0saW5kZXgpfTwvZGl2Pik7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZXtmb3JtLnB1c2goPGRpdiBjbGFzc05hbWU9e3Jvd0NsYXNzfT57Zm9ybVR5cGVzW2l0ZW0uZmllbGRdKGl0ZW0saW5kZXgpfTwvZGl2Pik7fVxuXHRcdFx0fVxuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0Ly9mb3IodmFyIHg9MDsgeCA8IHRoaXMucHJvcHMuZmVpbGRzLmxlbmd0aCB4Kys7IClcblx0XHR2YXIgY2xhc3NOYW1lID0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJyZWFjdC1mb3JtXCI6IFwicmVhY3QtZm9ybSBcIit0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8Zm9ybSBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG5cdFx0XHRcdDxmaWVsZHNldD5cblx0XHRcdFx0e3RoaXMucHJvcHMuYmVmb3JlfVxuXHRcdFx0XHR7Zm9ybX1cblx0XHRcdFx0eyB0aGlzLnByb3BzLmNoaWxkcmVufVxuXHRcdFx0XHQ8L2ZpZWxkc2V0PlxuXHRcdFx0PC9mb3JtPlxuXHRcdCk7XG5cdH1cbn1cblxuXG5cbmV4cG9ydCBjbGFzcyBTZWxlY3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5pbnB1dENoYW5nZT10aGlzLmlucHV0Q2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblxuXHR9XG5cdGlucHV0Q2hhbmdlKGUpe1xuXHRcdHRoaXMucHJvcHMuaW5wdXRDaGFuZ2VkKCk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLmxhYmxlID0gKHRoaXMucHJvcHMubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLmxhYmxlO1xuXHRcdHRoaXMub3B0aW9ucyA9ICh0aGlzLnByb3BzLm9wdGlvbnMgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLm9wdGlvbnM7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jb250cm9sXCI6IFwiZm9ybS1jb250cm9sXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlcXVpcmVkID0gKHRoaXMucHJvcHMucmVxdWlyZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZXF1aXJlZD09ZmFsc2V8fHRoaXMucHJvcHMucmVxdWlyZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZWFkb25seSA9ICh0aGlzLnByb3BzLnJlYWRvbmx5ID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVhZG9ubHk9PWZhbHNlfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHZhciBvcHRpb25zPVtdO1xuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblxuXG5cdFx0dGhpcy5vcHRpb25zLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCl7XG5cdFx0XHR2YXIgZ3JvdXA9W107XG5cdFx0XHRpZihpdGVtLmdyb3VwICE9PSB1bmRlZmluZWQpe1xuXHRcdFx0XHRpdGVtLm9wdGlvbnMubWFwKGZ1bmN0aW9uKGlubmVySXRlbSxpbmRleCl7XG5cdFx0XHRcdFx0Z3JvdXAucHVzaCggPG9wdGlvbiBrZXk9e2l0ZW0uZ3JvdXAraW5kZXh9IHZhbHVlPXtpbm5lckl0ZW19PiB7aW5uZXJJdGVtfSA8L29wdGlvbj4pXG5cdFx0XHRcdH0pXG5cdFx0XHRcdG9wdGlvbnMucHVzaCg8b3B0Z3JvdXAga2V5PXtpdGVtLmdyb3VwfSBsYWJlbD17aXRlbS5ncm91cH0+IHtncm91cH08L29wdGdyb3VwPik7XG5cblx0XHRcdH1cblx0XHRcdGVsc2V7XG5cdFx0XHRcdG9wdGlvbnMucHVzaCggPG9wdGlvbiBrZXk9e2luZGV4fSB2YWx1ZT17aXRlbX0+IHtpdGVtfSA8L29wdGlvbj4pXG5cdFx0XHR9XG5cblxuXHRcdH0uYmluZCh0aGlzKSk7XG5cblx0XHR2YXIgc2VsZWN0PShcblx0XHRcdDxzZWxlY3Rcblx0XHRcdFx0Y2xhc3NOYW1lPXt0aGlzLmNsYXNzTmFtZX1cblx0XHRcdFx0dmFsdWU9e3RoaXMudmFsdWV9XG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnByb3BzLmlucHV0Q2hhbmdlZH1cblx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdCAgICAgICAgICBcdHJlYWRPbmx5PXt0aGlzLnJlYWRvbmx5fVxuXHQgICAgICAgICAgXHRyZXF1aXJlZD17dGhpcy5yZXF1aXJlZH1cblx0XHRcdFx0PlxuXHRcdFx0XHR7b3B0aW9uc31cblx0XHRcdDwvc2VsZWN0PlxuXHRcdCk7XG5cblx0XHR2YXIgbGFibGU9XCJcIjtcblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMucHJvcHMubGFibGUgIT09IFwiXCIpe1xuXHRcdFx0bGFibGU9KDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD4pO1xuXHRcdH1cblx0XHRvdXRwdXQgPSAoPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+e2xhYmxlfXtzZWxlY3R9PC9kaXY+KTtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5pbnB1dENoYW5nZT10aGlzLmlucHV0Q2hhbmdlLmJpbmQodGhpcyk7XG5cblx0fVxuXHRpbnB1dENoYW5nZShlKXtcblx0XHR0aGlzLnByb3BzLmlucHV0Q2hhbmdlZChlKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnR5cGUgPSAodGhpcy5wcm9wcy50eXBlID09PSB1bmRlZmluZWQpID8gXCJ0ZXh0XCI6IHRoaXMucHJvcHMudHlwZTtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMucGxhY2Vob2xkZXIgPSAodGhpcy5wcm9wcy5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXI7XG5cdFx0dGhpcy5sYWJsZSA9ICh0aGlzLnByb3BzLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5sYWJsZTtcblx0XHR2YXIgb3V0cHV0PVwiXCI7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jb250cm9sXCI6IFwiZm9ybS1jb250cm9sIFwiICt0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHR0aGlzLmRpc2FibGVkID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5kaXNhYmxlZD09ZmFsc2V8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZXF1aXJlZCA9ICh0aGlzLnByb3BzLnJlcXVpcmVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVxdWlyZWQ9PWZhbHNlfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVhZG9ubHkgPSAodGhpcy5wcm9wcy5yZWFkb25seSA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1mYWxzZXx8dGhpcy5wcm9wcy5yZWFkb25seT09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblxuXHRcdHZhciBpbnB1dD0oXG5cdFx0XHQ8aW5wdXRcblx0XHRcdFx0dHlwZT17dGhpcy50eXBlfVxuXHRcdFx0XHRjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfVxuXHRcdFx0XHRwbGFjZWhvbGRlcj17dGhpcy5wbGFjZWhvbGRlcn1cblx0XHRcdFx0dmFsdWU9e3RoaXMudmFsdWV9XG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnByb3BzLmlucHV0Q2hhbmdlZH1cblx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdCAgICAgICAgICBcdHJlYWRPbmx5PXt0aGlzLnJlYWRvbmx5fVxuXHQgICAgICAgICAgXHRyZXF1aXJlZD17dGhpcy5yZXF1aXJlZH1cblx0XHRcdC8+XG5cdFx0KTtcblx0XHR2YXIgd3JhcHBlckNsYXNzPVwiZm9ybS1ncm91cFwiO1xuXHRcdGlmKHRoaXMucHJvcHMuZXJyb3Ipe1xuXHRcdFx0XHR3cmFwcGVyQ2xhc3MrPSBcIiBcIitcImhhcy1lcnJvclwiO1xuXHRcdH1cblx0XHR2YXIgbGFibGU9XCJcIjtcblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMucHJvcHMubGFibGUgIT09IFwiXCIpe1xuXHRcdFx0bGFibGU9KDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD4pO1xuXHRcdH1cblx0XHRvdXRwdXQgPSAoPGRpdiBjbGFzc05hbWU9e3dyYXBwZXJDbGFzc30+e2xhYmxlfXtpbnB1dH08L2Rpdj4pO1xuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBDaGVjayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLmlucHV0Q2hhbmdlPXRoaXMuaW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcblxuXG5cdH1cblx0aW5wdXRDaGFuZ2UoZSl7XG5cblx0XHR0aGlzLnByb3BzLmlucHV0Q2hhbmdlZChlKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyAwIDogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLnBsYWNlaG9sZGVyID0gKHRoaXMucHJvcHMucGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnBsYWNlaG9sZGVyO1xuXHRcdHRoaXMubGFibGUgPSAodGhpcy5wcm9wcy5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMubGFibGU7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jaGVjay1pbnB1dFwiOiBcImZvcm0tY2hlY2staW5wdXQgXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlcXVpcmVkID0gKHRoaXMucHJvcHMucmVxdWlyZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZXF1aXJlZD09ZmFsc2V8fHRoaXMucHJvcHMucmVxdWlyZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZWFkb25seSA9ICh0aGlzLnByb3BzLnJlYWRvbmx5ID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVhZG9ubHk9PWZhbHNlfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXG5cdFx0dmFyIG91dHB1dD1cIlwiO1xuXHRcdHZhciBpbnB1dD0oXG5cdFx0XHQ8aW5wdXRcblx0XHRcdFx0dHlwZT1cImNoZWNrYm94XCJcblx0XHRcdFx0Y2xhc3NOYW1lPXt0aGlzLmNsYXNzTmFtZX1cblx0XHRcdFx0Y2hlY2tlZD17dGhpcy52YWx1ZX1cblxuXHRcdFx0XHRvbkNoYW5nZT17dGhpcy5wcm9wcy5pbnB1dENoYW5nZWR9XG5cdFx0XHRcdGRpc2FibGVkPXt0aGlzLmRpc2FibGVkfVxuXHQgICAgICAgICAgXHRyZWFkT25seT17dGhpcy5yZWFkb25seX1cblx0ICAgICAgICAgIFx0cmVxdWlyZWQ9e3RoaXMucmVxdWlyZWR9XG5cdFx0XHQvPlxuXHRcdCk7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkIHx8IHRoaXMucHJvcHMubGFibGUgPT1cIlwiKXtcblx0XHRcdG91dHB1dCA9IChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdCAgICBcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWxcIj5cblx0XHQgICAgICBcdFx0XHR7aW5wdXR9e3RoaXMucHJvcHMubGFibGV9XG5cdFx0ICAgICAgXHRcdDwvbGFiZWw+XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHQgICAgICBcdFx0e2lucHV0fVxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuZXhwb3J0IGNsYXNzIFRleHRhcmVhIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuaW5wdXRDaGFuZ2U9dGhpcy5pbnB1dENoYW5nZS5iaW5kKHRoaXMpO1xuXG5cdH1cblx0aW5wdXRDaGFuZ2UoZSl7XG5cdFx0dGhpcy5wcm9wcy5pbnB1dENoYW5nZWQoZSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gMCA6IHRoaXMucHJvcHMudmFsdWU7XG5cdFx0dGhpcy5wbGFjZWhvbGRlciA9ICh0aGlzLnByb3BzLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5wbGFjZWhvbGRlcjtcblx0XHR0aGlzLmxhYmxlID0gKHRoaXMucHJvcHMubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLmxhYmxlO1xuXHRcdHRoaXMuY2xhc3NOYW1lPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcImZvcm0tY29udHJvbFwiOiBcImZvcm0tY29udHJvbCBcIiArdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0dGhpcy5kaXNhYmxlZCA9ICh0aGlzLnByb3BzLmRpc2FibGVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PWZhbHNlfHx0aGlzLnByb3BzLmRpc2FibGVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVxdWlyZWQgPSAodGhpcy5wcm9wcy5yZXF1aXJlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1mYWxzZXx8dGhpcy5wcm9wcy5yZXF1aXJlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlYWRvbmx5ID0gKHRoaXMucHJvcHMucmVhZG9ubHkgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZWFkb25seT09ZmFsc2V8fHRoaXMucHJvcHMucmVhZG9ubHk9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yb3dzID0gKHRoaXMucHJvcHMucm93cyA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJvd3M9PVwiXCIpID8gMzogdGhpcy5wcm9wcy5yb3dzO1xuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblx0XHR2YXIgaW5wdXQ9KFxuXHRcdFx0PHRleHRhcmVhXG5cdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9XG5cdFx0XHRcdHZhbHVlPXt0aGlzLnZhbHVlfVxuXHRcdFx0XHRvbkNoYW5nZT17dGhpcy5wcm9wcy5pbnB1dENoYW5nZWR9XG5cdFx0XHRcdHJvd3M9e3RoaXMucm93c31cblx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdCAgICAgICAgICBcdHJlYWRPbmx5PXt0aGlzLnJlYWRvbmx5fVxuXHQgICAgICAgICAgXHRyZXF1aXJlZD17dGhpcy5yZXF1aXJlZH1cblx0XHRcdC8+XG5cdFx0KTtcblx0XHR2YXIgbGFibGU9XCJcIjtcblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMucHJvcHMubGFibGUgIT09IFwiXCIpe1xuXHRcdFx0bGFibGU9KDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD4pO1xuXHRcdH1cblx0XHRvdXRwdXQgPSAoPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+e2xhYmxlfXtpbnB1dH08L2Rpdj4pO1xuXHRcdHJldHVybihcblx0XHRcdDxkaXY+e291dHB1dH08L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5leHBvcnQgY2xhc3MgRGF0ZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuZGF0ZUluaXQ9dGhpcy5kYXRlSW5pdC5iaW5kKHRoaXMpO1xuXHR9XG5cdGRhdGVJbml0KCl7XG5cdFx0JCgnLmlucHV0LWdyb3VwLmRhdGUgLmRhdGVwaWNrJykuZGF0ZXBpY2tlcih7XG5cdFx0ICAgIHRvZGF5QnRuOiBcImxpbmtlZFwiLFxuXHRcdCAgICBvcmllbnRhdGlvbjogXCJib3R0b20gcmlnaHRcIixcblx0XHQgICAgYXV0b2Nsb3NlOiB0cnVlLFxuXHRcdCAgICB0b2RheUhpZ2hsaWdodDogdHJ1ZVxuXHRcdH0pLm9uKCdjaGFuZ2VEYXRlJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0dmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdpbnB1dCcsIHsgYnViYmxlczogdHJ1ZSB9KTtcblx0XHRcdGUudGFyZ2V0LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHRoaXMudmFsdWUgPSAodGhpcy5wcm9wcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMudmFsdWU7XG5cdFx0dGhpcy5wbGFjZWhvbGRlciA9ICh0aGlzLnByb3BzLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5wbGFjZWhvbGRlcjtcblx0XHR0aGlzLmxhYmxlID0gKHRoaXMucHJvcHMubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLmxhYmxlO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlcXVpcmVkID0gKHRoaXMucHJvcHMucmVxdWlyZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZXF1aXJlZD09ZmFsc2V8fHRoaXMucHJvcHMucmVxdWlyZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZWFkb25seSA9ICh0aGlzLnByb3BzLnJlYWRvbmx5ID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVhZG9ubHk9PWZhbHNlfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXG5cblx0XHR2YXIgb3V0cHV0PVwiXCI7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jb250cm9sIGRhdGVwaWNrXCI6IFwiZm9ybS1jb250cm9sIGRhdGVwaWNrIFwiICt0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHR2YXIgaW5wdXQ9KFxuXHRcdFx0PGlucHV0XG5cdFx0XHRcdHJlZj17dGhpcy5kYXRlSW5pdH1cblx0XHRcdFx0dHlwZT1cInRleHRcIlxuXHRcdFx0XHRjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfVxuXHRcdFx0XHRwbGFjZWhvbGRlcj17dGhpcy5wbGFjZWhvbGRlcn1cblx0XHRcdFx0dmFsdWU9e3RoaXMudmFsdWV9XG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnByb3BzLmlucHV0Q2hhbmdlZH1cblx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdCAgICAgICAgICBcdHJlYWRPbmx5PXt0aGlzLnJlYWRvbmx5fVxuXHQgICAgICAgICAgXHRyZXF1aXJlZD17dGhpcy5yZXF1aXJlZH1cblx0XHRcdFx0Lz5cblxuXHRcdCk7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkIHx8IHRoaXMucHJvcHMubGFibGUgPT1cIlwiKXtcblx0XHRcdG91dHB1dCA9IChcblx0XHQgIFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHQgIFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAgZGF0ZVwiPlxuXHRcdFx0XHRcdFx0e2lucHV0fVxuXHRcdFx0XHQgIFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cC1hZGRvblwiPlxuXHRcdFx0XHQgIFx0XHRcdDxpIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tdGhcIj48L2k+XG5cdFx0XHRcdCAgXHRcdDwvc3Bhbj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwIGRhdGVcIj5cblxuXHRcdFx0XHRcdFx0e2lucHV0fVxuXHRcdFx0XHQgIFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cC1hZGRvblwiPlxuXHRcdFx0XHQgIFx0XHRcdDxpIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tdGhcIj48L2k+XG5cdFx0XHRcdCAgXHRcdDwvc3Bhbj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuZXhwb3J0IGNsYXNzIEF3ZXNvbXBsZXRlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cblx0XHQvKiAgIERvIHRoZSBiaW5kIHRoaW5nICAqL1xuXHRcdHRoaXMuY3JlYXRlTGlzdD10aGlzLmNyZWF0ZUxpc3QuYmluZCh0aGlzKTtcblx0XHR0aGlzLmRvY0NoYW5nZWQ9dGhpcy5kb2NDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jb21wb25lbnREaWRNb3VudD10aGlzLmNvbXBvbmVudERpZE1vdW50LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5pbnB1dENoYW5nZT10aGlzLmlucHV0Q2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5hdXRvY29tcGxldGU9dGhpcy5hdXRvY29tcGxldGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmNvbXBvbmVudFdpbGxVbm1vdW50PXRoaXMuY29tcG9uZW50V2lsbFVubW91bnQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnJlZkNhbGw9dGhpcy5yZWZDYWxsLmJpbmQodGhpcyk7XG5cblx0XHQvL3RoaXMud29ya29yZGVyT2JqPXRoaXMub25TdGF0dXNDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0LyogICAgICAgICAgZW5kICAgICAgICAgICovXG5cdFx0dGhpcy5pdGVtbGlzdD1bXTtcblx0XHR0aGlzLnN0YXRlPXtpdGVtbGlzdDpbXX07XG5cdFx0dGhpcy5faXNNb3VudGVkPWZhbHNlO1xuXHRcdHZhciBhcmdzPXt9O1xuXHRcdHZhciBvcHRpb25zPXtkb2N0eXBlOnRoaXMucHJvcHMuZG9jdHlwZX07XG5cdFx0dmFyIGZpbHRlcj17fTtcblx0XHRpZiAodGhpcy5wcm9wcy5maWx0ZXI9PXVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLmZpbHRlcj09bnVsbCl7XG5cblx0XHR9ZWxzZXtcblx0XHRcdGZpbHRlcj0gdGhpcy5wcm9wcy5maWx0ZXI7XG5cdFx0fVxuXHRcdHRoaXMubGlzdFRvb2wgPSBuZXcgcHMuYXBpVG9vbChmaWx0ZXIsIG9wdGlvbnMgLHRoaXMuZG9jQ2hhbmdlZCk7XG5cdFx0aWYgKHRoaXMubGlzdFRvb2wuaXRlbXM9PT11bmRlZmluZWQgfHx0aGlzLmxpc3RUb29sLml0ZW1zPT09IDAgfHx0aGlzLmxpc3RUb29sLml0ZW1zPT09bnVsbCApe1xuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5zdGF0ZS5saXN0PXRoaXMubGlzdFRvb2wuaXRlbXM7XG5cdFx0fVxuXG5cdFx0dGhpcy5jcmVhdGVMaXN0KCk7XG5cdH1cblx0ZG9jQ2hhbmdlZCgpe1xuXHRcdHRoaXMuY3JlYXRlTGlzdCgpO1xuXHR9XG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0dGhpcy5faXNNb3VudGVkPXRydWU7XG5cdFx0dGhpcy5hdXRvY29tcGxldGUoKTtcblxuXHR9XG5cdGNyZWF0ZUxpc3QoKXtcblx0XHR0aGlzLml0ZW1saXN0PVtdO1xuXHRcdC8vbGFibGUgYW5kIHZhbHVlXG5cdFx0aWYgKHRoaXMucHJvcHMuZG9jbGFibGUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmxpc3RUb29sLml0ZW1zICE9PSB1bmRlZmluZWQgJiYgdGhpcy5saXN0VG9vbC5pdGVtcyAhPT0gbnVsbCl7XG5cdFx0XHRmb3IobGV0IGl0ZW0gb2YgdGhpcy5saXN0VG9vbC5pdGVtcyl7XG5cdFx0XHRcdHZhciB0ZW1wID1baXRlbVt0aGlzLnByb3BzLmRvY2xhYmxlXSxpdGVtW3RoaXMucHJvcHMuZG9jdmFsdWVdXTtcblx0XHRcdFx0dGhpcy5pdGVtbGlzdC5wdXNoKHRlbXApO1xuXHRcdFx0fVxuXHRcdFx0JChkb2N1bWVudCkudHJpZ2dlcignbGlzdExvYWQnICsgdGhpcy5wcm9wcy5kb2N0eXBlKTtcblx0XHR9XG5cdFx0Ly9qdXN0IGxhYmxlXG5cdFx0ZWxzZSBpZih0aGlzLmxpc3RUb29sLml0ZW1zICE9PSB1bmRlZmluZWQgJiYgdGhpcy5saXN0VG9vbC5pdGVtcyAhPT0gbnVsbCl7XG5cdFx0XHRmb3IobGV0IGl0ZW0gb2YgdGhpcy5saXN0VG9vbC5pdGVtcyl7XG5cdFx0XHRcdHRoaXMuaXRlbWxpc3QucHVzaChpdGVtW3RoaXMucHJvcHMuZG9jdmFsdWVdKTtcblx0XHRcdH1cblx0XHRcdCQoZG9jdW1lbnQpLnRyaWdnZXIoJ2xpc3RMb2FkJyArIHRoaXMucHJvcHMuZG9jdHlwZS5yZXBsYWNlKFwiIFwiLFwiXCIpKTtcblx0XHR9XG5cdH1cblx0Y29tcG9uZW50V2lsbFVubW91bnQoKXtcblx0XHQvLyBjb25zb2xlLmxvZyhcIkhFTExPXCIpO1xuXHRcdC8vIHRoaXMuYXcuZGVzdHJveSgpO1xuXHRcdC8vIGRlbGV0ZSB0aGlzLmF3O1xuXHRcdC8vIGNvbnNvbGUubG9nKFwiVEVTVFwiKTtcblx0fVxuXHRyZWZDYWxsKGlucHV0KXtcblx0XHR0aGlzLmlucHV0PWlucHV0O1xuXHR9XG5cdGF1dG9jb21wbGV0ZShpbnB1dCl7XG5cdFx0aW5wdXQ9dGhpcy5pbnB1dDtcblx0XHR2YXIgY29uZmlnPSB7XG5cdFx0XHRcdG1pbkNoYXJzOiAwLFxuXHRcdFx0XHRtYXhJdGVtczogOTksXG5cdFx0XHRcdGF1dG9GaXJzdDogdHJ1ZSxcblx0XHRcdFx0ZmlsdGVyOiBBd2Vzb21wbGV0ZS5GSUxURVJfU1RBUlRTV0lUSFxuXHRcdFx0fVxuXHRcdGlmKHRoaXMucHJvcHMuZG9jbGFibGUgIT09IHVuZGVmaW5lZCApe1xuXHRcdFx0Y29uZmlnLml0ZW09IGZ1bmN0aW9uKGl0ZW0sIGlucHV0KSB7XG5cdFx0XHRcdHZhciBkID0gaXRlbTtcblx0XHRcdFx0dmFyIGh0bWwgPSBcIjxzcGFuPlwiICsgX18oaXRlbS5sYWJlbCkrIFwiPC9zcGFuPjxicj48c3Bhbj48c21hbGw+XCIraXRlbS52YWx1ZStcIjwvc21hbGw+PC9zcGFuPlwiO1xuXHRcdFx0XHRyZXR1cm4gJCgnPGxpPjwvbGk+Jylcblx0XHRcdFx0XHQuZGF0YSgnaXRlbS5hdXRvY29tcGxldGUnLCBpdGVtKVxuXHRcdFx0XHRcdC5odG1sKCc8YT48cD4nICsgaHRtbCArICc8L3A+PC9hPicpXG5cdFx0XHRcdFx0LmdldCgwKTtcblx0XHRcdH1cblxuXHRcdH1lbHNle1xuXHRcdFx0Y29uZmlnLml0ZW09ZnVuY3Rpb24oaXRlbSwgaW5wdXQpIHtcblx0XHRcdFx0dmFyIGQgPSBpdGVtO1xuXHRcdFx0XHR2YXIgaHRtbCA9IFwiPHNwYW4+XCIgKyBfXyhpdGVtKSsgXCI8L3NwYW4+XCI7XG5cdFx0XHRcdHJldHVybiAkKCc8bGk+PC9saT4nKVxuXHRcdFx0XHRcdC5kYXRhKCdpdGVtLmF1dG9jb21wbGV0ZScsIGl0ZW0pXG5cdFx0XHRcdFx0Lmh0bWwoJzxhPjxwPicgKyBodG1sICsgJzwvcD48L2E+Jylcblx0XHRcdFx0XHQuZ2V0KDApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLmF3ID0gbmV3IEF3ZXNvbXBsZXRlKGlucHV0LGNvbmZpZyk7XG5cdFx0aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRcdCdhd2Vzb21wbGV0ZS1zZWxlY3Rjb21wbGV0ZScsXG5cdFx0XHRcdHRoaXMuaW5wdXRDaGFuZ2Vcblx0XHQpO1xuXHRcdCQoaW5wdXQpLmNsaWNrKCBmdW5jdGlvbigpIHtcblx0XHRcdGlmICh0aGlzLmF3LnVsLmNoaWxkTm9kZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdHRoaXMuYXcubWluQ2hhcnMgPSAwO1xuXHRcdFx0XHR0aGlzLmF3LmV2YWx1YXRlKCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmICh0aGlzLmF3LnVsLmhhc0F0dHJpYnV0ZSgnaGlkZGVuJykpIHtcblx0XHRcdFx0dGhpcy5hdy5vcGVuKCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dGhpcy5hdy5jbG9zZSgpO1xuXHRcdFx0fVxuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5hdy5saXN0PXRoaXMuaXRlbUxpc3Q7XG5cdFx0JChkb2N1bWVudCkuYmluZCgnbGlzdExvYWQnICsgdGhpcy5wcm9wcy5kb2N0eXBlLnJlcGxhY2UoXCIgXCIsXCJcIiksZnVuY3Rpb24oKXtcblx0XHRcdHRoaXMuYXcubGlzdD10aGlzLml0ZW1saXN0O1xuXHRcdH0uYmluZCh0aGlzKSk7XG5cdH1cblx0aW5wdXRDaGFuZ2UoZSl7XG5cdFx0dGhpcy5wcm9wcy5pbnB1dENoYW5nZWQoZSk7XG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnR5cGUgPSAodGhpcy5wcm9wcy50eXBlID09PSB1bmRlZmluZWQpID8gXCJ0ZXh0XCI6IHRoaXMucHJvcHMudHlwZTtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMucGxhY2Vob2xkZXIgPSAodGhpcy5wcm9wcy5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXI7XG5cdFx0dGhpcy5sYWJsZSA9ICh0aGlzLnByb3BzLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5sYWJsZTtcblx0XHR0aGlzLmRpc2FibGVkID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5kaXNhYmxlZD09ZmFsc2V8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZXF1aXJlZCA9ICh0aGlzLnByb3BzLnJlcXVpcmVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVxdWlyZWQ9PWZhbHNlfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVhZG9ubHkgPSAodGhpcy5wcm9wcy5yZWFkb25seSA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1mYWxzZXx8dGhpcy5wcm9wcy5yZWFkb25seT09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblxuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblx0XHR0aGlzLmNsYXNzTmFtZT0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJmb3JtLWNvbnRyb2wgYXdlc29tcGxldGVcIjogXCJmb3JtLWNvbnRyb2wgYXdlc29tcGxldGUgXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHZhciBpbnB1dD0oIDxpbnB1dFxuXHRcdFx0XHRcdHZhbHVlPXt0aGlzLnZhbHVlfVxuXG5cdFx0XHRcdFx0dHlwZT17dGhpcy50eXBlfVxuXHRcdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9XG5cdFx0XHRcdFx0cGxhY2Vob2xkZXI9e3RoaXMucGxhY2Vob2xkZXJ9XG5cdFx0XHRcdFx0cmVmPXt0aGlzLnJlZkNhbGx9XG5cdFx0ICAgICAgICAgIFx0b25DaGFuZ2U9e3RoaXMuaW5wdXRDaGFuZ2V9XG5cdFx0ICAgICAgICAgIFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdFx0ICAgICAgICAgIFx0cmVhZE9ubHk9e3RoaXMucmVhZG9ubHl9XG5cdFx0ICAgICAgICAgIFx0cmVxdWlyZWQ9e3RoaXMucmVxdWlyZWR9XG5cdFx0ICAgICAgICAgIC8+KTtcblxuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy5sYWJsZSA9PVwiXCIpe1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgXCI+XG5cdFx0ICAgIFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbFwiPnt0aGlzLnByb3BzLmxhYmxlfTwvbGFiZWw+XG5cdFx0ICAgIFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIlwiPlxuXHRcdCAgICAgIFx0XHRcdHtpbnB1dH1cblx0XHQgICAgXHRcdDwvZGl2PlxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHQgICAgICBcdFx0e2lucHV0fVxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuZXhwb3J0IGNsYXNzIEJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy50eXBlID0gKHRoaXMucHJvcHMudHlwZSA9PT0gdW5kZWZpbmVkKSA/IFwidGV4dFwiOiB0aGlzLnByb3BzLnR5cGU7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLmRpc2FibGVkID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5kaXNhYmxlZD09ZmFsc2V8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dmFyIG91dHB1dD1cIlwiO1xuXHRcdHRoaXMuY2xhc3NOYW1lPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcImJ0blwiOiBcImJ0biBcIiArdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0dmFyIGljb249XCJcIjtcblx0XHRpZih0aGlzLnByb3BzLmljb24hPT0gdW5kZWZpbmVkICYmIHRoaXMucHJvcHMuaWNvbiE9PVwiXCIpe1xuXHRcdFx0dmFyIGljb25DbGFzcz1cImdseXBoaWNvbiBcIiArdGhpcy5wcm9wcy5pY29uO1xuXHRcdFx0aWNvbj0oPHNwYW4gY2xhc3NOYW1lPXtpY29uQ2xhc3N9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj4pO1xuXHRcdH1cblx0XHR2YXIgaW5wdXQ9KFxuXHRcdFx0PGJ1dHRvblxuXHRcdFx0XHR0eXBlPXt0aGlzLnR5cGV9XG5cdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9XG5cdFx0XHRcdHZhbHVlPXt0aGlzLnZhbHVlfVxuXHRcdFx0XHRvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2xpY2t9XG5cdFx0XHRcdGRpc2FibGVkPXt0aGlzLmRpc2FibGVkfVxuXHRcdFx0PntpY29ufSB7dGhpcy52YWx1ZX08L2J1dHRvbj5cblx0XHQpO1xuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHQgIFx0XHR7aW5wdXR9XG5cdCAgXHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RhbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnN1Ym1pdD10aGlzLnN1Ym1pdC5iaW5kKHRoaXMpO1xuXHR9XG5cdHN1Ym1pdChlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5wcm9wcy5zdWJtaXQoZSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dmFyIGZvb3Rlcj1cIlwiO1xuXHRcdGlmKHRoaXMucHJvcHMuc3VibWl0IT09IGZhbHNlKXtcblx0XHRcdGZvb3Rlcj0oXHRcdFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWZvb3RlclwiPlxuXHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tc2Vjb25kYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DbG9zZTwvYnV0dG9uPlxuXHRcdFx0XHRcdDxidXR0b24gXG5cdFx0XHRcdFx0XHR0eXBlPVwic3VibWl0XCIgXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLnN1Ym1pdH0gXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiA+XG5cdFx0XHRcdFx0XHRcdHt0aGlzLnByb3BzLnN1Ym1pdFRleHR9XG5cdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KVxuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsIGZhZGUgdGV4dC1sZWZ0IHBhbmVsLWRlZmF1bHRcIiBpZD17dGhpcy5wcm9wcy5pZH0gdGFiSW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiBhcmlhLWxhYmVsbGVkYnk9XCJleGFtcGxlTW9kYWxMYWJlbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZ1wiIHJvbGU9XCJkb2N1bWVudFwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1oZWFkZXJcIj5cblx0XHRcdFx0XHRcdFx0PGg0IGNsYXNzTmFtZT1cIm1vZGFsLXRpdGxlXCIgaWQ9XCJleGFtcGxlTW9kYWxMYWJlbFwiPnt0aGlzLnByb3BzLnRpdGxlfTwvaDQ+XG5cdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGRpc3BsYXk9XCJub25lXCIgY2xhc3NOYW1lPVwiY2xvc2UgaGlkZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+XG5cdFx0XHRcdFx0XHRcdDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+XG5cdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XG5cdFx0XHRcdFx0XHRcdFx0eyB0aGlzLnByb3BzLmNoaWxkcmVuIH1cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdHtmb290ZXJ9XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5cbiIsImltcG9ydCBGb3JtIGZyb20gJy4uL3V0aWxzL2Zvcm1zJ1xuXG5cbmV4cG9ydCBjbGFzcyBTcHJheUZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5jb21wb25lbnRXaWxsVXBkYXRlPXRoaXMuY29tcG9uZW50V2lsbFVwZGF0ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuc3VibWl0PXRoaXMuc3VibWl0LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5zYXZlPXRoaXMuc2F2ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZGVsZXRlPXRoaXMuZGVsZXRlLmJpbmQodGhpcyk7XG5cdH1cblx0Y29tcG9uZW50V2lsbFVwZGF0ZSgpe1xuXHR9XG5cdHN1Ym1pdChlKXtcblx0XHQvL2lmKHRoaXMucHJvcHMuaXRlbS52aW5leWFyZD09XCJcIiB8fHRoaXMucHJvcHMuaXRlbS5zcHJheV90eXBlPT1cIlwiIHx8IChtb21lbnQodGhpcy5wcm9wcy5pdGVtLmRhdGUsXCJNTS9ERC9ZWVlZXCIpLmlzVmFsaWQoKSkhPT10cnVlKXtcblx0XHQvL1x0Y29uc29sZS5sb2coXCJub3QgdmFsaWRcIik7XG5cdFx0Ly99ZWxzZXtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRoaXMucHJvcHMuY3JlYXRlKHRoaXMucHJvcHMuaXRlbSk7XG5cdFx0Ly99XG5cdH1cblx0c2F2ZShlKXtcblx0XHQvLyBpZih0aGlzLnByb3BzLml0ZW0udmluZXlhcmQ9PVwiXCIgfHx0aGlzLnByb3BzLml0ZW0uc3ByYXlfdHlwZT09XCJcIiB8fCAobW9tZW50KHRoaXMucHJvcHMuaXRlbS5kYXRlLFwiTU0vREQvWVlZWVwiKS5pc1ZhbGlkKCkpIT09dHJ1ZSl7XG5cdFx0Ly8gXHRjb25zb2xlLmxvZyhcIm5vdCB2YWxpZFwiKTtcblx0XHQvLyB9ZWxzZXtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRoaXMucHJvcHMuZWRpdCh0aGlzLnByb3BzLml0ZW0pO1xuXHRcdC8vIH1cblx0fVxuXHRkZWxldGUoZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMucHJvcHMuZGVsZXRlKHRoaXMucHJvcHMuaXRlbSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dmFyIGNyZWF0ZUhpZGRlbj0odGhpcy5wcm9wcy5tb2RlIT1cImNyZWF0ZVwiKT9cIiBoaWRkZW5cIjpcIiBub3BlXCI7XG5cdFx0dmFyIGVkaXRIaWRkZW49KHRoaXMucHJvcHMubW9kZSE9XCJlZGl0XCIpP1wiIGhpZGRlblwiOlwiIG5vcGVcIjtcblxuXHRcdGlmKHRoaXMucHJvcHMuaXRlbT09bnVsbCl7XG5cdFx0XHR2YXIgY29weT17XG5cdFx0XHRcdHZpbmV5YXJkOlwiXCIsXG5cdFx0XHRcdHNlYXNvbjpcIlwiLFxuXHRcdFx0XHRkYXRlOm1vbWVudCgpLmZvcm1hdChcIk1NL0REL1lZWVlcIiksXG5cdFx0XHRcdHNwcmF5VHlwZTpcIlwiLFxuXHRcdFx0XHRxdWFudGl0eTowXG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHR2YXIgY29weT1wcy5jbG9uZSh0aGlzLnByb3BzLml0ZW0pO1xuXHRcdH1cblxuXHRcdGNvbnNvbGUubG9nKHRoaXMucHJvcHMuaXRlbSk7XG5cdFx0Y29uc29sZS5sb2coY29weSk7XG5cdFx0dmFyIGZvcm1FbGVtZW50cz17XG5cdFx0XHRkYXRlOlt7fSxcblx0XHRcdHtcblx0XHRcdFx0XHRmaWVsZDpcImRhdGVcIixcblx0XHRcdFx0XHRyZXF1aXJlZDp0cnVlLFxuXHRcdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRcdGNvcHkuZGF0ZT1lLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdFx0dmFsdWU6Y29weS5kYXRlLFxuXHRcdFx0XHRcdGxhYmxlOlwiRGF0ZVwiXG5cdFx0XHR9XSxcblx0XHRcdHZpbmV5YXJkOlt7fSx7XG5cdFx0XHRcdGZpZWxkOlwiYXV0b0NvbXBsZXRlXCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRjb3B5LnZpbmV5YXJkPWUudGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHR2YWx1ZTpjb3B5LnZpbmV5YXJkLFxuXHRcdFx0XHRyZXF1aXJlZDp0cnVlLFxuXHRcdFx0XHRsYWJsZTpcIlZpbmV5YXJkXCIsXG5cdFx0XHRcdGRvY3R5cGU6XCJWaW5leWFyZFwiLFxuXHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIlxuXHRcdFx0fV0sXG5cdFx0XHRmaWVsZDpbe30se1xuXHRcdFx0XHRmaWVsZDpcImF1dG9Db21wbGV0ZVwiLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0Y29weS5maWVsZD1lLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0dmFsdWU6Y29weS5maWVsZCxcblx0XHRcdFx0cmVxdWlyZWQ6dHJ1ZSxcblx0XHRcdFx0bGFibGU6XCJWaW5leWFyZFwiLFxuXHRcdFx0XHRkb2N0eXBlOlwiVmluZXlhcmQgRmllbGRcIixcblx0XHRcdFx0ZmlsdGVyOnt2aW5leWFyZDpjb3B5LnZpbmV5YXJkfSxcblx0XHRcdFx0ZG9jdmFsdWU6XCJuYW1lXCJcblx0XHRcdH1dLFxuXHRcdFx0d29ya29yZGVyOlt7fSx7XG5cdFx0XHRcdGZpZWxkOlwiYXV0b0NvbXBsZXRlXCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRjb3B5Lndvcmtfb3JkZXI9ZS50YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdHZhbHVlOmNvcHkud29ya19vcmRlcixcblx0XHRcdFx0cmVxdWlyZWQ6dHJ1ZSxcblx0XHRcdFx0bGFibGU6XCJWaW5leWFyZFwiLFxuXHRcdFx0XHRkb2N0eXBlOlwid29ya19vcmRlclwiLFxuXHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIlxuXHRcdFx0fV1cblx0XHR9XG5cblx0XHR2YXIgZmllbGRzPVtcblx0XHRcdGZvcm1FbGVtZW50cy52aW5leWFyZFt0aGlzLnByb3BzLnZpbmV5YXJkXSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJhdXRvQ29tcGxldGVcIixcblx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdGNvcHkuc2Vhc29uPWUudGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHR2YWx1ZTpjb3B5LnNlYXNvbixcblx0XHRcdFx0cmVxdWlyZWQ6dHJ1ZSxcblx0XHRcdFx0bGFibGU6XCJTZWFzb25cIixcblx0XHRcdFx0ZG9jdHlwZTpcIlNlYXNvblwiLFxuXHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIlxuXHRcdFx0fSxcblx0XHRcdGZvcm1FbGVtZW50cy5kYXRlW3RoaXMucHJvcHMudmluZXlhcmRdLFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImF1dG9Db21wbGV0ZVwiLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0Y29weS5zcHJheV90eXBlPWUudGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHR2YWx1ZTpjb3B5LnNwcmF5X3R5cGUsXG5cdFx0XHRcdHJlcXVpcmVkOnRydWUsXG5cdFx0XHRcdGxhYmxlOlwiU3ByYXkgVHlwZVwiLFxuXHRcdFx0XHRkb2N0eXBlOlwiU3ByYXkgVHlwZVwiLFxuXHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIlxuXHRcdFx0fSxcblxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImlucHV0XCIsXG5cdFx0XHRcdGNsYXNzTmFtZTpcInZpbmV5YXJkLWlucHV0XCIsXG5cdFx0XHRcdHR5cGU6XCJudW1iZXJcIixcblx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdGNvcHkucXVhbnRpdHk9ZS50YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdHZhbHVlOmNvcHkucXVhbnRpdHksXG5cdFx0XHRcdGxhYmxlOlwicXVhbnRpdHlcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJidXR0b25cIixcblx0XHRcdFx0dHlwZTpcInN1Ym1pdFwiLFxuXHRcdFx0XHR2YWx1ZTpcIkNyZWF0ZSBTcHJheWluZyBFbnRyeVwiLFxuXHRcdFx0XHRjbGFzc05hbWU6XCJidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIgKyBjcmVhdGVIaWRkZW4sXG5cdFx0XHRcdG9uQ2xpY2s6dGhpcy5zdWJtaXRcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiYnV0dG9uXCIsXG5cdFx0XHRcdHR5cGU6XCJzdWJtaXRcIixcblx0XHRcdFx0dmFsdWU6XCJTYXZlXCIsXG5cdFx0XHRcdGNsYXNzTmFtZTpcImJ0bi1zdWNjZXNzIHB1bGwtcmlnaHRcIisgZWRpdEhpZGRlbixcblx0XHRcdFx0b25DbGljazp0aGlzLnNhdmVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiYnV0dG9uXCIsXG5cdFx0XHRcdHR5cGU6XCJzdWJtaXRcIixcblx0XHRcdFx0dmFsdWU6XCJEZWxldGVcIixcblx0XHRcdFx0Y2xhc3NOYW1lOlwiYnRuLWRhbmdlciBwdWxsLXJpZ2h0XCIrIGVkaXRIaWRkZW4sXG5cdFx0XHRcdG9uQ2xpY2s6dGhpcy5kZWxldGVcblx0XHRcdH1cblx0XHRdXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxGb3JtXG5cdFx0XHRcdFx0aWQ9e3RoaXMucHJvcHMuaWR9XG5cdFx0XHRcdFx0dHlwZT1cImhvcml6b250YWxcIlxuXHRcdFx0XHRcdGZpZWxkcz17ZmllbGRzfVxuXG5cdFx0XHRcdC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbi8vaW1wb3J0IERheXNXb3Jrb3JkZXJzIGZyb20gJy4uLy4uL3B1YmxpYy9qcy9tb2R1bGVzL2RheXNfd29ya29yZGVycy9EYXlzV29ya29yZGVycydcbmltcG9ydCBEYXlzVGltZXNoZWV0cyBmcm9tICcuLi8uLi9wdWJsaWMvanMvbW9kdWxlcy9kYXlzX3RpbWVzaGVldHMvRGF5c1RpbWVTaGVldHMnXG5cbi8vY29uc3QgYXBwPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJyk7XG5jb25zdCBhcHA9ICQoJyNhcHAnKVswXTtcbmNvbnN0IHRpbWVzaGVldHM9ICQoJyN0aW1lJylbMF07XG5cbmNsYXNzIFdvcmtQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXG5cdFx0LyogYmluZCBkaW5nIGRpbmcgKi9cblx0XHR0aGlzLm1haW5DbGlja2VkPXRoaXMubWFpbkNsaWNrZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLndvcmtvcmRlcnNDbGlja2VkPXRoaXMud29ya29yZGVyc0NsaWNrZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnRpbWVzaGVldENsaWNrZWQ9dGhpcy50aW1lc2hlZXRDbGlja2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5oYW5kZWxDbG9ja0luPXRoaXMuaGFuZGVsQ2xvY2tJbi5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuaGFuZGVsUm91dGU9dGhpcy5oYW5kZWxSb3V0ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuc3RhdGVVcGRhdGU9dGhpcy5zdGF0ZVVwZGF0ZS5iaW5kKHRoaXMpO1xuXHRcdFxuXG5cdFx0Ly9IYW5kZWwgVXNlciBsT2FkXG5cdFx0Ly8gaWYgKCBmcmFwcGUudXNlcl9pZCA9PSBcIkFkbWluaXN0cmF0b3JcIiApe1xuXHRcdC8vIFx0d2luZG93LmxvY2F0aW9uID0gXCIvZGVza1wiO1xuXHRcdC8vIH1cblx0XHQvLyBpZiAoIGZyYXBwZS51c2VyX2lkID09IFwiR2V1c3RcIil7XG5cdFx0Ly8gXHR3aW5kb3cubG9jYXRpb24gPSBcIi9sb2dpblwiO1xuXHRcdC8vIH1cblx0XHR0aGlzLmN1cnJlbnRVc2VyPXBzLmluaXRDdXJyZW50VXNlcigpO1xuXHRcdHRoaXMuY3VycmVudFVzZXIuZ2V0KHt9LGZ1bmN0aW9uKGl0ZW1zKXtcblx0XHRcdGlmKHRoaXMuY3VycmVudFVzZXIuaXRlbXMudXNlcm5hbWU9PVwiR3Vlc3RcIil7XG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbiA9IFwiL2xvZ2luXCI7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0JChkb2N1bWVudCkudHJpZ2dlcihcInVzZXJMb2FkZWRcIik7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coXCJhZnRlciBMb2FkXCIsdGhpcy5jdXJyZW50VXNlci5pdGVtcyk7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKHRoaXMpKTsgXG5cdFx0dGhpcy5zdGF0ZT17aXRlbXM6dGhpcy5jdXJyZW50VXNlci5pdGVtc307XG5cdFx0JChkb2N1bWVudCkuYmluZCgndXNlckxvYWRlZCcsdGhpcy5zdGF0ZVVwZGF0ZSk7XG5cblxuXHRcdC8vUm91dGluZ1xuXHRcdCQod2luZG93KS5vbihcImhhc2hjaGFuZ2VcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmhhbmRlbFJvdXRlKCk7XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0XHR2YXIgcm91dGUgPSB3aW5kb3cubG9jYXRpb24uaGFzaC5zbGljZSgxKTtcblx0XHRpZighcm91dGUpIHJvdXRlID0gXCIjbWFpblwiO1xuXHRcdHRoaXMuc3RhdGUucGFnZT1yb3V0ZTtcblx0XHRpZiAoIXdpbmRvdy5sb2NhdGlvbi5oYXNoKSB7XG5cdFx0XHR3aW5kb3cubG9jYXRpb24uaGFzaCA9IFwiI21haW5cIjtcblx0XHR9XG5cdFx0JCh3aW5kb3cpLnRyaWdnZXIoXCJoYXNoY2hhbmdlXCIpO1xuXG5cdH1cblx0Y29tcG9uZW50RGlkTW91bnQoKXtcblx0XHRcblx0fVxuXHRzdGF0ZVVwZGF0ZSgpe1xuXHRcdC8vYWxlcnQoXCJ1cGRhdGVcIik7XG5cdFx0dGhpcy5zdGF0ZS5pdGVtcz10aGlzLmN1cnJlbnRVc2VyLml0ZW1zO1xuXHRcdHRoaXMuc2V0U3RhdGUodGhpcy5zdGF0ZSk7XG5cblx0fVxuXHRoYW5kZWxSb3V0ZSgpe1xuXHRcdHZhciByb3V0ZSA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnNsaWNlKDEpO1xuXHRcdHZhciBwYWdlcz17XG5cdFx0XHRtYWluOnRoaXMubWFpbkNsaWNrZWQsXG5cdFx0XHR3b3Jrb3JkZXJzOnRoaXMud29ya29yZGVyc0NsaWNrZWQsXG5cdFx0XHR0aW1lc2hlZXQ6dGhpcy50aW1lc2hlZXRDbGlja2VkXG5cdFx0fVtyb3V0ZV0oKTtcblx0fVxuXHRoYW5kZWxDbG9ja0luKCl7XG5cblx0fVxuXHRtYWluQ2xpY2tlZCgpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe3BhZ2U6J21haW4nfSk7XG5cdH1cblx0d29ya29yZGVyc0NsaWNrZWQoKXtcblxuXHRcdHRoaXMuc2V0U3RhdGUoe3BhZ2U6J3dvcmtvcmRlcnMnfSk7XG5cblx0fVxuXHR0aW1lc2hlZXRDbGlja2VkKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7cGFnZTondGltZXNoZWV0J30pO1xuXG5cdH1cblx0Ly88QWZmaXhXcmFwcGVyIGNsYXNzTmFtZT1cInN0aWNreV9zdWJuYXYgdGV4dC1jZW50ZXJcIiAgb2Zmc2V0PXsxNDB9IGhlaWdodD1cIjQwcHhcIj48L0FmZml4V3JhcHBlcj5cblx0cmVuZGVyKCl7XG5cdFx0dmFyIG91dHB1dD0nJztcblx0XHRpZiAodGhpcy5zdGF0ZS5pdGVtcy51c2VybmFtZT09XCJHdWVzdFwifHx0aGlzLnN0YXRlLml0ZW1zLnVzZXJuYW1lPT1cIkFkbWluaXN0cmF0b3JcIil7XG5cdFx0XHRvdXRwdXQ9KDxoMz5HdWVzdCBPciBBZG1pbjwvaDM+KTtcblx0XHR9XG5cdFx0ZWxzZSBpZih0aGlzLnN0YXRlLml0ZW1zLmxlbmd0aD09PTApe1xuXHRcdFx0b3V0cHV0PSg8aDM+Tm8gVXNlciBEYXRhPC9oMz4pO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0b3V0cHV0PShcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYW5lbCB3aXRoLW5hdi10YWJzIHBhbmVsLXByaW1hcnlcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWhlYWRpbmdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJuYXYgbmF2LXRhYnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiYWN0aXZlXCI+PGEgaHJlZj1cIiNjbG9ja0luVGFiXCIgZGF0YS10b2dnbGU9XCJ0YWJcIj5NYWluPC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIjd29ya09yZGVyVGFiXCIgZGF0YS10b2dnbGU9XCJ0YWJcIj5Xb3JrIE9yZGVyczwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiI3RpbWVTaGVldFRhYlwiIGRhdGEtdG9nZ2xlPVwidGFiXCI+VGltZSBTaGVldHM8L2E+PC9saT5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWItY29udGVudFwiPlx0XHRcdFx0XG4gICAgICAgICAgICAgICAgICAgICAgICA8RGF5c1RpbWVzaGVldHMgXG5cdFx0XHRcdFx0XHRcdGRhdGU9e3RoaXMuc3RhdGUuaXRlbXMudG9kYXl9XG5cdFx0XHRcdFx0XHRcdGZ1bGxfbmFtZT17dGhpcy5zdGF0ZS5pdGVtcy5jdXJyZW50X3VzZXIuZnVsbF9uYW1lfVxuXHRcdFx0XHRcdFx0XHRwYWdlPXt0aGlzLnN0YXRlLnBhZ2V9XG5cdFx0XHRcdFx0XHRcdGNyZXc9e3RoaXMuc3RhdGUuaXRlbXMuY3Jld31cblx0XHRcdFx0XHRcdC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHJldHVybig8ZGl2PlxuXHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuKGZ1bmN0aW9uKCl7XG5cdGZyYXBwZS5yZWFkeShmdW5jdGlvbigpe1xuXHRcdFJlYWN0RE9NLnJlbmRlciggXG5cdFx0PFdvcmtQYWdlIC8+XG5cdCwgdGltZXNoZWV0cyApO1xuXHR9KVxuXG59KSgpO1xuXG5cblxuXG5cbiJdfQ==
