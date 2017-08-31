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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c190aW1lc2hlZXRzL0RheXNUaW1lU2hlZXRzLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy9kYXlzX3RpbWVzaGVldHMvY2xvY2tJbi5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c190aW1lc2hlZXRzL2VtcGxveWVlVGltZS5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c190aW1lc2hlZXRzL3RpbWVTaGVldC5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c193b3Jrb3JkZXJzL0RheXNXb3Jrb3JkZXJzLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy9kYXlzX3dvcmtvcmRlcnMvY3JlYXRlSXNzdWUuanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL2RheXNfd29ya29yZGVycy90YXNrQ2hlY2suanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL2RheXNfd29ya29yZGVycy93b3Jrb3JkZXJUYXNrLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9kb2N0eXBlRm9ybS5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdXRpbHMvZm9ybXMuanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL3V0aWxzL21vZGFsLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy92aW5leWFyZC9zcHJheUZvcm0uanN4IiwicHJvY2Vzc19zdWNjZXNzL3d3dy93b3JrcGFnZS93b3JrcGFnZS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFB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b290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmltcG9ydCBEYXlzV29ya29yZGVycyBmcm9tICcuLi9kYXlzX3dvcmtvcmRlcnMvRGF5c1dvcmtvcmRlcnMnXG5pbXBvcnQgRW1wbG95ZWVUaW1lIGZyb20gJy4vZW1wbG95ZWVUaW1lJztcbmltcG9ydCBUaW1lU2hlZXQgZnJvbSAnLi90aW1lU2hlZXQnO1xuaW1wb3J0IENsb2NrSW4gZnJvbSAnLi9jbG9ja0luJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF5c1RpbWVTaGVldHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5zdGF0ZT17aXRlbXM6W119O1xuXHRcdHRoaXMuc3RhdGUudGltZT0nJztcblx0XHR0aGlzLmFkZD17fTtcblxuXHRcdC8qICAgICBEbyB0aGUgYmluZCB0aGluZyAgICAgICovXG5cblx0XHQvL1RpbWUgZW1wbG95ZWUgbGluZSBpdGVtXG5cdFx0dGhpcy50aW1lQ2hhbmdlZD10aGlzLnRpbWVDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy51cGRhdGVUaW1lPXRoaXMudXBkYXRlVGltZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZGVsZXRlRW1wbG95ZWU9dGhpcy5kZWxldGVFbXBsb3llZS5iaW5kKHRoaXMpO1xuXG5cdFx0dGhpcy51cGRhdGVGcm9tU2VydmVyPXRoaXMudXBkYXRlRnJvbVNlcnZlci5iaW5kKHRoaXMpO1xuXHRcdHRoaXMudGltZVNoZWV0V3JhcHBlcj10aGlzLnRpbWVTaGVldFdyYXBwZXIuYmluZCh0aGlzKTtcblxuXHRcdHRoaXMuYWRkRW1wbG95ZWU9dGhpcy5hZGRFbXBsb3llZS5iaW5kKHRoaXMpXG5cdFx0dGhpcy51cGRhdGVGcm9tU2VydmVyUGFyYW09dGhpcy51cGRhdGVGcm9tU2VydmVyUGFyYW0uYmluZCh0aGlzKTtcblxuXHRcdHRoaXMuY2xvY2tJbj10aGlzLmNsb2NrSW4uYmluZCh0aGlzKTtcblx0XHR0aGlzLmNsb2NrT3V0PXRoaXMuY2xvY2tPdXQuYmluZCh0aGlzKTtcblx0XHQvKiAgICBlbmQgQmluZCBkaW5nIGRpbmcgICAgICAgICAqL1xuXG5cdFx0dGhpcy5hdXRvY29tcGxldGVBcnI9W107XG5cdFx0dmFyIGFyZ3M9e307XG5cblx0XHQvL0dyYWIgdGhlIGVtcGxveWVlIHRpbWVzaGVldCBkYXRhXG5cdFx0dGhpcy5vYmpUb29sPXBzLmluaXRUaW1lU2hlZXRzKClcblx0XHR0aGlzLm9ialRvb2wuZ2V0KHtkYXRlOnByb3BzLmRhdGV9LGZ1bmN0aW9uKCl7XG5cdFx0XHR0aGlzLnVwZGF0ZUZyb21TZXJ2ZXIoKTtcblx0XHRcdHRoaXMub2JqVG9vbC5yZWFjdFNldHVwKHRoaXMudXBkYXRlRnJvbVNlcnZlcik7XG5cdFx0fS5iaW5kKHRoaXMpKTtcblxuXHRcdGlmICh0aGlzLm9ialRvb2wuaXRlbXM9PT11bmRlZmluZWQgfHx0aGlzLm9ialRvb2wuaXRlbXM9PT0gMCApe1xuXHRcdH1lbHNle3RoaXMuc3RhdGUuaXRlbXM9dGhpcy5vYmpUb29sLml0ZW1zO31cblxuXHRcdC8vR3JhYiB0aGUgZW1wbG95ZWUgbGlzdFxuXHRcdHZhciB0b29sPXBzLmluaXRFbXBsb3llZUxpc3QoKTtcblx0XHR0b29sLmdldCh7fSxmdW5jdGlvbigpe1xuXHRcdFx0cHMuZW1wbG95ZWVfbGFibGVzPSB0b29sLml0ZW1zLm1hcChmdW5jdGlvbihvYmopIHtcblx0XHRcdFx0dmFyIHJPYmogPSB7fTtcblx0XHRcdFx0ck9iai5sYWJlbD1vYmouZnVsbF9uYW1lO1xuXHRcdFx0XHRyT2JqLnZhbHVlPW9iai5uYW1lO1xuXHRcdFx0XHRyZXR1cm4gck9iajtcblx0XHRcdH0pO1xuXHRcdFx0JChkb2N1bWVudCkudHJpZ2dlcihcImVtcGxveWVlTGFibGVzTG9hZGVkXCIpO1xuXHRcdH0pO1xuXG5cblxuXG5cdH1cblxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIGhlbHBlciBGdW5jdGlvblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLVxuXHR1cGRhdGVGcm9tU2VydmVyKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7aXRlbXM6dGhpcy5vYmpUb29sLml0ZW1zfSk7XG5cdH1cblx0dXBkYXRlRnJvbVNlcnZlclBhcmFtKGRhdGEsaW5kZXgpe1xuXHRcdHRoaXMub2JqVG9vbC5pdGVtc1tpbmRleF09ZGF0YTtcblx0XHR0aGlzLnNldFN0YXRlKHtpdGVtczp0aGlzLm9ialRvb2wuaXRlbXN9KTtcblx0fVxuXHRjcmV3c1RpbWVzaGVldEluZGV4KGNyZXcpe1xuXHRcdGZvciAodmFyIGk9MDsgaSA8IHRoaXMub2JqVG9vbC5pdGVtcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHR2YXIgaXRlbT10aGlzLm9ialRvb2wuaXRlbXNbaV07XG5cdFx0XHRpZihpdGVtLmNyZXc9PWNyZXcpe1xuXHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0Z2V0SW5kZXhUaW1lc2hlZXQodGltZXNoZWV0KXtcblx0XHRyZXR1cm4gdGhpcy5vYmpUb29sLmdldF9pbmRleF9vZl9pdGVtKHRpbWVzaGVldCk7XG5cdH1cblx0Z2V0SW5kZXhFbXBsb3llZSh0aW1lc2hlZXRJbmRleCxlbXBsb3llZU5hbWUpe1xuXHRcdHZhciBlbXBsb3llZXM9dGhpcy5vYmpUb29sLml0ZW1zW3RpbWVzaGVldEluZGV4XS5lbXBsb3llZXM7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlbXBsb3llZXMubGVuZ3RoOyBpKyspe1xuXHRcdFx0aWYgKGVtcGxveWVlTmFtZT09ZW1wbG95ZWVzW2ldLmVtcGxveWVlKXtcblx0XHRcdFx0cmV0dXJuIGk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdH1cblxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vICAgICAgIFRpbWVzaGVldCBXcmFwcGVyIEZ1bmN0aW9uc1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdGNsb2NrSW4odGltZSxjcmV3KXtcblxuXHRcdHZhciB0c19pbmRleD10aGlzLmNyZXdzVGltZXNoZWV0SW5kZXgoY3Jldyk7XG5cblx0XHR0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlcztcblx0XHRmb3IgKHZhciBpPTA7IGkgPCB0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHR0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlc1tpXS5zdGFydD10aW1lO1xuXHRcdH1cblx0XHR0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLnN0YXR1cz1cIkNsb2NrZWQgSW5cIjtcblx0XHR0aGlzLm9ialRvb2wudXBkYXRlKHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0pO1xuXHRcdHRoaXMuc2V0U3RhdGUoe2l0ZW1zOnRoaXMub2JqVG9vbC5pdGVtc30pO1xuXHR9XG5cdGNsb2NrT3V0KHRpbWUsY3Jldyl7XG5cblx0XHR2YXIgdHNfaW5kZXg9dGhpcy5jcmV3c1RpbWVzaGVldEluZGV4KGNyZXcpO1xuXG5cdFx0dGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXM7XG5cdFx0Zm9yICh2YXIgaT0wOyBpIDwgdGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXMubGVuZ3RoOyBpKyspe1xuXHRcdFx0dGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXNbaV0uZW5kPXRpbWU7XG5cdFx0fVxuXHRcdHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uc3RhdHVzPVwiQ2xvY2tlZCBPdXRcIjtcblx0XHR0aGlzLm9ialRvb2wudXBkYXRlKHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0pO1xuXHRcdHRoaXMuc2V0U3RhdGUoe2l0ZW1zOnRoaXMub2JqVG9vbC5pdGVtc30pO1xuXHR9XG5cdGFkZEVtcGxveWVlKHRzX25hbWUsIGVtcGxveWVlX25hbWUpe1xuXHRcdHZhciB0c19pbmRleCA9IHRoaXMuZ2V0SW5kZXhUaW1lc2hlZXQodHNfbmFtZSk7XG5cdFx0dmFyIGVtcGxveWVlSW5kZXggPSB0aGlzLmdldEluZGV4RW1wbG95ZWUodHNfaW5kZXgsZW1wbG95ZWVfbmFtZSk7XG5cblx0XHR2YXIgdXBkYXRlQ2FsbGJhY2s9ZnVuY3Rpb24oaW5kZXgpe1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKGRhdGEpe1xuXHRcdFx0XHR0aGlzLnVwZGF0ZUZyb21TZXJ2ZXJQYXJhbShkYXRhLGluZGV4KTtcblx0XHRcdH0uYmluZCh0aGlzKTtcblx0XHR9LmJpbmQodGhpcyk7XG5cblx0XHRmb3IgKHZhciBpPTA7IGkgPCB0aGlzLm9ialRvb2wuaXRlbXMubGVuZ3RoOyBpKyspe1xuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzLm9ialRvb2wuaXRlbXNbaV07XG5cdFx0XHRpZihpdGVtLm5hbWU9PXRzX25hbWUpe1xuXHRcdFx0XHRmb3IgKHZhciB4PTA7IHggPCBpdGVtLmVtcGxveWVlcy5sZW5ndGg7IHgrKyl7XG5cdFx0XHRcdFx0dmFyIGNvbnRhaW5lciA9IGl0ZW0uZW1wbG95ZWVzW3hdO1xuXHRcdFx0XHRcdGlmIChjb250YWluZXIuZW1wbG95ZWU9PWVtcGxveWVlX25hbWUpe1xuXHRcdFx0XHRcdFx0cmV0dXJuIFwiZHVwbGljYXRlXCI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMub2JqVG9vbC5pdGVtc1tpXS5lbXBsb3llZXMucHVzaCh7IGVtcGxveWVlIDogZW1wbG95ZWVfbmFtZSwgbmV3OicxJ30pO1xuXHRcdFx0XHR0aGlzLm9ialRvb2wudXBkYXRlKHRoaXMub2JqVG9vbC5pdGVtc1tpXSx1cGRhdGVDYWxsYmFjayhpKSwxKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR2YXIgZG9uZT0xO1xuXHRcdFx0XHRpZihpdGVtLmVtcGxveWVlcy5sZW5ndGg+MCl7XG5cdFx0XHRcdFx0Zm9yICh2YXIgeD0wOyB4IDwgaXRlbS5lbXBsb3llZXMubGVuZ3RoICYmIGRvbmU7IHgrKyl7XG5cdFx0XHRcdFx0XHR2YXIgY29udGFpbmVyID0gaXRlbS5lbXBsb3llZXNbeF07XG5cdFx0XHRcdFx0XHRpZiAoY29udGFpbmVyLmVtcGxveWVlPT1lbXBsb3llZV9uYW1lKXtcblx0XHRcdFx0XHRcdFx0dGhpcy5vYmpUb29sLml0ZW1zW2ldLmVtcGxveWVlcy5zcGxpY2UoeCwgMSk7XG5cdFx0XHRcdFx0XHRcdHRoaXMub2JqVG9vbC5jaGFuZ2VkKHRoaXMub2JqVG9vbC5pdGVtc1tpXSk7XG5cdFx0XHRcdFx0XHRcdGRvbmU9MDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0fTtcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gICAgICAgICAgIFRpbWVzaGVldCBXcmFwcGVyXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdHRpbWVTaGVldFdyYXBwZXIoaXRlbSxpbmRleCl7XG5cdFx0dmFyIGVtcGxveWVlX291dHB1dD1bXTtcblx0XHRpZihpdGVtLmVtcGxveWVlcz09PXVuZGVmaW5lZCl7XG5cblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdHZhciBlbXBsb3llZU91dHB1dD1pdGVtLmVtcGxveWVlcy5tYXAoZnVuY3Rpb24oaXRlbV9lbXBsb3llZSxpbmRleF9lbXBsb3llZSl7XG5cdFx0XHQgXHRlbXBsb3llZV9vdXRwdXQucHVzaCh0aGlzLmVtcGxveWVlTGluZUl0ZW0oaXRlbV9lbXBsb3llZSxpdGVtLm5hbWUsaW5kZXhfZW1wbG95ZWUpKTtcblx0XHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuKFxuXG5cdFx0XHQ8VGltZVNoZWV0XG5cdFx0XHRcdGtleT17aW5kZXh9XG5cdFx0XHRcdG5hbWU9e2l0ZW0ubmFtZX1cblx0XHRcdFx0ZGF0ZT17aXRlbS5kYXRlfVxuXHRcdFx0XHRjcmV3PXtpdGVtLmNyZXd9XG5cdFx0XHRcdGVtcGxveWVlcz17ZW1wbG95ZWVfb3V0cHV0fVxuXHRcdFx0XHRhZGRFbXBsb3llZT17dGhpcy5hZGRFbXBsb3llZX1cblx0XHRcdFx0b25VcGRhdGU9e3RoaXMudXBkYXRlfVxuXHRcdFx0Lz5cblxuXHRcdCk7XG5cdH1cblxuXG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gICAgICAgRW1wbG95ZWUgVGltZSBGb3JtIExpbmVpdGVtXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdGRlbGV0ZUVtcGxveWVlKGVtcGxveWVlLHRpbWVzaGVldCl7XG5cdFx0dmFyIHRzX2luZGV4ID0gdGhpcy5nZXRJbmRleFRpbWVzaGVldCh0aW1lc2hlZXQpO1xuXHRcdHZhciBkb25lPTE7XG5cdFx0dmFyIGl0ZW09dGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XTtcblx0XHRpZihpdGVtLmVtcGxveWVlcy5sZW5ndGg+MCl7XG5cdFx0XHRmb3IgKHZhciB4PTA7IHggPCBpdGVtLmVtcGxveWVlcy5sZW5ndGggJiYgZG9uZTsgeCsrKXtcblx0XHRcdFx0dmFyIGNvbnRhaW5lciA9IGl0ZW0uZW1wbG95ZWVzW3hdO1xuXHRcdFx0XHRpZiAoY29udGFpbmVyLmVtcGxveWVlPT1lbXBsb3llZSl7XG5cdFx0XHRcdFx0dGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXMuc3BsaWNlKHgsIDEpO1xuXHRcdFx0XHRcdC8vxpJjb25zb2xlLmxvZyh0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdKTtcblx0XHRcdFx0XHR0aGlzLm9ialRvb2wudXBkYXRlKHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0pO1xuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe2l0ZW1zOnRoaXMub2JqVG9vbC5pdGVtc30pO1xuXHRcdFx0XHRcdGRvbmU9MDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHRpbWVDaGFuZ2VkKHBvc2l0aW9uLGVtcGxveWVlLHRpbWVzaGVldCx2YWx1ZSl7XG5cdFx0dmFyIHRzX2luZGV4ID0gdGhpcy5nZXRJbmRleFRpbWVzaGVldCh0aW1lc2hlZXQpO1xuXHRcdHZhciBlbXBsb3llZUluZGV4ID0gdGhpcy5nZXRJbmRleEVtcGxveWVlKHRzX2luZGV4LGVtcGxveWVlKTtcblx0XHR0aGlzLnN0YXRcblx0XHRpZihwb3NpdGlvbj09J2VuZCcpe1xuXHRcdFx0dGhpcy5zdGF0ZS5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzW2VtcGxveWVlSW5kZXhdLmVuZD12YWx1ZTtcblx0XHR9XG5cdFx0ZWxzZXt0aGlzLnN0YXRlLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXNbZW1wbG95ZWVJbmRleF0uc3RhcnQ9dmFsdWV9XG5cdCAgICB0aGlzLnNldFN0YXRlKHtpdGVtczp0aGlzLnN0YXRlLml0ZW1zfSk7XG5cdH1cblx0dXBkYXRlVGltZShwb3NpdGlvbixlbXBsb3llZSx0aW1lc2hlZXQsdmFsdWUpe1xuXHRcdHZhciB0c19pbmRleCA9IHRoaXMuZ2V0SW5kZXhUaW1lc2hlZXQodGltZXNoZWV0KTtcblx0XHR2YXIgZW1wbG95ZWVJbmRleCA9IHRoaXMuZ2V0SW5kZXhFbXBsb3llZSh0c19pbmRleCxlbXBsb3llZSk7XG5cdFx0dmFyIHNhdmU9MDtcblx0XHR2YWx1ZT1wcy50aW1lX2FkZF9kaWdpdHModmFsdWUpXG5cdFx0aWYocG9zaXRpb249PSdlbmQnICYmIHBzLnRpbWVfYWRkX2Zyb250X3plcm8odGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXNbZW1wbG95ZWVJbmRleF0uZW5kKSAhPSBwcy50aW1lX2FkZF9kaWdpdHModmFsdWUpKXtcblx0XHRcdHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzW2VtcGxveWVlSW5kZXhdLmVuZD1wcy50aW1lX2FkZF9kaWdpdHModmFsdWUpO1xuXHRcdFx0c2F2ZT0xO1xuXHRcdH1cblx0ICAgIGlmKHBvc2l0aW9uPT0nc3RhcnQnICYmIHBzLnRpbWVfYWRkX2Zyb250X3plcm8odGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXNbZW1wbG95ZWVJbmRleF0uc3RhcnQpICE9IHBzLnRpbWVfYWRkX2RpZ2l0cyh2YWx1ZSkpe1xuXHQgICAgXHR0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlc1tlbXBsb3llZUluZGV4XS5zdGFydD1wcy50aW1lX2FkZF9kaWdpdHModmFsdWUpO1xuXHQgICAgXHRzYXZlPTE7XG5cdCAgICB9XG5cdCAgICBpZihzYXZlKXtcblx0XHQgICAgdGhpcy5zZXRTdGF0ZSh7aXRlbXM6dGhpcy5vYmpUb29sLml0ZW1zfSk7XG5cdFx0ICAgIHRoaXMub2JqVG9vbC51cGRhdGUodGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XSxmdW5jdGlvbigpe1xuXHRcdCAgICBcdHBzLnN1Y2Nlc3NBbGVydCh0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlc1tlbXBsb3llZUluZGV4XS5lbXBsb3llZV9uYW1lK1wiIHRpbWUgdXBkYXRlZCFcIik7XG5cdFx0ICAgIH0uYmluZCh0aGlzKSk7XG5cdFx0fVxuXHR9XG5cdGVtcGxveWVlTGluZUl0ZW0oZW1wbG95ZWVfY29udGFpbmVyLHRpbWVfc2hlZXQsZW1wbG95ZWVfaW5kZXgpe1xuXHRcdHJldHVybihcblx0XHRcdDxFbXBsb3llZVRpbWVcblx0XHRcdFx0a2V5PXtlbXBsb3llZV9pbmRleH1cblx0XHRcdFx0dGltZXNoZWV0PXt0aW1lX3NoZWV0fVxuXHRcdFx0XHRlbXBsb3llZV9uYW1lPXtlbXBsb3llZV9jb250YWluZXIuZW1wbG95ZWVfbmFtZX1cblx0XHRcdFx0ZW1wbG95ZWU9e2VtcGxveWVlX2NvbnRhaW5lci5lbXBsb3llZX1cblx0XHRcdFx0c3RhcnQ9e3BzLnRpbWVfYWRkX2Zyb250X3plcm8oZW1wbG95ZWVfY29udGFpbmVyLnN0YXJ0KX1cblx0XHRcdFx0ZW5kPXtwcy50aW1lX2FkZF9mcm9udF96ZXJvKGVtcGxveWVlX2NvbnRhaW5lci5lbmQpfVxuXHRcdFx0XHR1cGRhdGVUaW1lPXt0aGlzLnVwZGF0ZVRpbWV9XG5cdFx0XHRcdHRpbWVDaGFuZ2VkPXt0aGlzLnRpbWVDaGFuZ2VkfVxuXHRcdFx0XHRkZWxldGVFbXBsb3llZT17dGhpcy5kZWxldGVFbXBsb3llZX1cblx0XHRcdC8+XG5cdFx0KTtcblx0fVxuXG5cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vICAgICAgICBSZW5kZXJcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRyZW5kZXIoKXtcblx0XHQvL2hhbmRlbCBlbXB0eSByZXR1cm5cblx0XHRpZiAodGhpcy5zdGF0ZS5pdGVtcy5sZW5ndGg9PT0wfHx0aGlzLnN0YXRlLml0ZW1zPT09dW5kZWZpbmVkKXtcblx0XHRcdHJldHVybiAoPGRpdj5ObyBUaW1lIFNoZWV0cywgc3RhcnQgYnkgPGEgaHJlZj1cIi9kZXNrXCI+Y3JlYXRpbmcgc29tZSBjcmV3cyE8L2E+PC9kaXY+KTtcblx0XHR9XG5cdFx0dmFyIG91dHB1dD1bXVxuXHRcdHRoaXMuc3RhdGUuaXRlbXMubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblx0XHRcdGlmKGl0ZW0uY3Jldz09dGhpcy5wcm9wcy5jcmV3KXtcblx0XHRcdFx0b3V0cHV0LnVuc2hpZnQodGhpcy50aW1lU2hlZXRXcmFwcGVyKGl0ZW0saW5kZXgpKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRvdXRwdXQucHVzaCh0aGlzLnRpbWVTaGVldFdyYXBwZXIoaXRlbSxpbmRleCkpO1xuXHRcdFx0fVxuXHRcdH0uYmluZCh0aGlzKSk7XG5cblx0XHR2YXIgdHNfaW5kZXg9dGhpcy5jcmV3c1RpbWVzaGVldEluZGV4KHRoaXMucHJvcHMuY3Jldyk7XG5cdFx0dmFyIHN0YXR1cz0nJztcblx0XHRpZiAodHNfaW5kZXg9PXVuZGVmaW5lZCl7dmFyIHN0YXR1cz1mYWxzZTt9XG5cdFx0ZWxzZXtzdGF0dXMgPXRoaXMuc3RhdGUuaXRlbXNbdHNfaW5kZXhdLnN0YXR1c31cblxuXG5cdFx0Ly9NQUlOIFJFTkRFUlxuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidGFiLXBhbmUgZmFkZSBpbiBhY3RpdmVcIiBpZD1cImNsb2NrSW5UYWJcIj5cblx0XHRcdFx0XHQ8Q2xvY2tJblxuXHRcdFx0XHRcdFx0Y2xvY2tJbj17dGhpcy5jbG9ja0lufVxuXHRcdFx0XHRcdFx0Y2xvY2tPdXQ9e3RoaXMuY2xvY2tPdXR9XG5cdFx0XHRcdFx0XHRzdGF0dXM9e3N0YXR1c31cblx0XHRcdFx0XHRcdGZ1bGxfbmFtZT17dGhpcy5wcm9wcy5mdWxsX25hbWV9XG5cdFx0XHRcdFx0XHRkYXRlPXt0aGlzLnByb3BzLmRhdGV9XG5cdFx0XHRcdFx0XHRjcmV3PXt0aGlzLnByb3BzLmNyZXd9XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidGFiLXBhbmUgZmFkZVwiIGlkPVwidGltZVNoZWV0VGFiXCI+XG5cdFx0XHRcdFx0PGJyLz5cblx0XHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ0YWItcGFuZSBmYWRlXCIgaWQ9XCJ3b3JrT3JkZXJUYWJcIj5cblx0XHRcdFx0XHRcdDxEYXlzV29ya29yZGVyc1xuXHRcdFx0XHRcdFx0XHRkYXRlPXt0aGlzLnByb3BzLmRhdGV9XG5cdFx0XHRcdFx0XHRcdGNyZXc9e3RoaXMucHJvcHMuY3Jld31cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cblx0XHQpO1xuXG5cdH07XG59XG4iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsb2NrSW4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy50b2dnbGVUaW1lSW5wdXQ9dGhpcy50b2dnbGVUaW1lSW5wdXQuYmluZCh0aGlzKTtcblx0XHR0aGlzLmNsb2NrSW49dGhpcy5jbG9ja0luLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jbG9ja091dD10aGlzLmNsb2NrT3V0LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5vbkNoYW5nZT10aGlzLm9uQ2hhbmdlLmJpbmQodGhpcyk7XG5cblx0XHR0aGlzLnN0YXRlPXtcblx0XHRcdGRhdGU6bmV3IERhdGUoKSxcblx0XHRcdHNwZWNpZnlUaW1lOmZhbHNlXG5cdFx0fTtcblxuXHR9XG5cdGNsb2NrSW4oZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGlmKHRoaXMuc3RhdGUuc3BlY2lmeVRpbWU9PWZhbHNlKXtcblx0XHRcdHZhciB0aW1lPXRoaXMuc3RhdGUuZGF0ZS50b0xvY2FsZVRpbWVTdHJpbmcoW10sIHtob3VyOiAnMi1kaWdpdCcsIG1pbnV0ZTonMi1kaWdpdCcsaG91cjEyOiBmYWxzZX0pXG5cdFx0XHQvL2NvbnNvbGUubG9nKHRpbWUpO1xuXHRcdFx0cHMuc3VjY2Vzc0FsZXJ0KFwiQ2xvY2tlZCBpbiBhdCBcIiArIHRoaXMuc3RhdGUuZGF0ZS50b0xvY2FsZVRpbWVTdHJpbmcoW10sIHtob3VyOiAnMi1kaWdpdCcsIG1pbnV0ZTonMi1kaWdpdCd9KSlcblx0XHRcdHRoaXMucHJvcHMuY2xvY2tJbih0aW1lLCB0aGlzLnByb3BzLmNyZXcpXG5cdFx0fWVsc2V7XG5cdFx0XHQvL2NvbnNvbGUubG9nKHRoaXMuc3RhdGUudGltZSlcblx0XHRcdGlmKHRoaXMuc3RhdGUudGltZSE9dW5kZWZpbmVkKXtcblx0XHRcdFx0dGhpcy5wcm9wcy5jbG9ja0luKHRoaXMuc3RhdGUudGltZSwgdGhpcy5wcm9wcy5jcmV3KTtcblx0XHRcdFx0cHMuc3VjY2Vzc0FsZXJ0KFwiQ2xvY2tlZCBpblwiKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHQvL2ludmFsaWQgdGltZSBlcnJvclxuXHRcdFx0XHRwcy5mYWlsQWxlcnQoXCJJbnZhbGlkIHRpbWUuXCIpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGNsb2NrT3V0KGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRpZih0aGlzLnN0YXRlLnNwZWNpZnlUaW1lPT1mYWxzZSl7XG5cdFx0XHR2YXIgdGltZT10aGlzLnN0YXRlLmRhdGUudG9Mb2NhbGVUaW1lU3RyaW5nKFtdLCB7aG91cjogJzItZGlnaXQnLCBtaW51dGU6JzItZGlnaXQnLGhvdXIxMjogZmFsc2V9KVxuXHRcdFx0Ly9jb25zb2xlLmxvZyh0aW1lKTtcblx0XHRcdHBzLnN1Y2Nlc3NBbGVydChcIkNsb2NrZWQgb3V0IGF0IFwiICsgdGhpcy5zdGF0ZS5kYXRlLnRvTG9jYWxlVGltZVN0cmluZyhbXSwge2hvdXI6ICcyLWRpZ2l0JywgbWludXRlOicyLWRpZ2l0J30pK1wiIEhhdmUgYSBncmVhdCBuaWdodCFcIilcblx0XHRcdHRoaXMucHJvcHMuY2xvY2tPdXQodGltZSwgdGhpcy5wcm9wcy5jcmV3KVxuXHRcdH1lbHNle1xuXHRcdFx0Ly9jb25zb2xlLmxvZyh0aGlzLnN0YXRlLnRpbWUpXG5cdFx0XHRpZih0aGlzLnN0YXRlLnRpbWUhPXVuZGVmaW5lZCl7XG5cdFx0XHRcdHRoaXMucHJvcHMuY2xvY2tPdXQodGhpcy5zdGF0ZS50aW1lLCB0aGlzLnByb3BzLmNyZXcpO1xuXHRcdFx0XHRwcy5zdWNjZXNzQWxlcnQoXCJDbG9ja2VkIE91dCEgIEhhdmUgYSBncmVhdCBuaWdodCFcIik7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Ly9pbnZhbGlkIHRpbWUgZXJyb3Jcblx0XHRcdFx0cHMuZmFpbEFsZXJ0KFwiSW52YWxpZCB0aW1lLlwiKVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHR0b2dnbGVUaW1lSW5wdXQoZSl7XG5cdFx0Ly9jb25zb2xlLmxvZyh0aGlzLnN0YXRlLnNwZWNpZnlUaW1lKTtcblx0XHRpZih0aGlzLnN0YXRlLnNwZWNpZnlUaW1lKXtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3NwZWNpZnlUaW1lOmZhbHNlfSk7XG5cdFx0fVxuXHRcdGVsc2V7dGhpcy5zZXRTdGF0ZSh7c3BlY2lmeVRpbWU6dHJ1ZX0pO31cblx0fVxuXHRvbkNoYW5nZShlKXtcblx0XHR0aGlzLnNldFN0YXRlKHt0aW1lOmUudGFyZ2V0LnZhbHVlfSk7XG5cdH1cblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0dGhpcy50aW1lcklEID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy50aWNrKCksMTAwMDApO1xuXHR9XG5cblx0Y29tcG9uZW50V2lsbFVubW91bnQoKSB7XG5cdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVySUQpO1xuXHR9XG5cblx0dGljaygpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGRhdGU6IG5ldyBEYXRlKClcblx0XHR9KTtcblx0fVxuXHRyZW5kZXIoKXtcblxuXHRcblx0XHR2YXIgdmFsdWVzPXtcblx0XHRcdCdDcmVhdGVkJzpbdGhpcy5jbG9ja0luLCdDbG9jayBJbicsJ2J0biBidG4tbGcgYnRuLXN1Y2Nlc3MgYnRuLWJsb2NrJ10sXG5cdFx0XHQnQ2xvY2tlZCBJbic6W3RoaXMuY2xvY2tPdXQsICdDbG9jayBPdXQnLCAnYnRuIGJ0bi1sZyBidG4tc3VjY2VzcyBidG4tYmxvY2snIF0sXG5cdFx0XHQnQ2xvY2tlZCBPdXQnOlt0aGlzLmNsb2NrT3V0LCAnQ2hhbmdlIENsb2Nrb3V0IFRpbWUnLCdidG4gYnRuLWxnIGJ0bi1zdWNjZXNzIGJ0bi1ibG9jayddLFxuXHRcdFx0J1N1Ym1pbnRlZCc6WycnLCdBbHJlYWR5IFN1Ym1pbnRlZCcsJ2J0biBidG4tbGcgYnRuLXN1Y2Nlc3MgYnRuLWJsb2NrJ10sXG5cdFx0XHQnQXByb3ZlZCc6WycnLCdBbHJlYWR5IFN1Ym1pbnRlZCcsJ2J0biBidG4tbGcgYnRuLXN1Y2Nlc3MgYnRuLWJsb2NrJ11cblx0XHR9W3RoaXMucHJvcHMuc3RhdHVzXTtcblx0XHR2YXIgb3V0cHV0PScnO1xuXHRcdGlmICh2YWx1ZXM9PXVuZGVmaW5lZCl7XG5cdFx0XHRvdXRwdXQ9KDxhIGhyZWY9XCIjdGltZXNoZWV0XCI+WW91IGFyZSBub3QgaW4gYSBUaW1lIFNoZWV0IGFkZCB5b3Vyc2VsZi48L2E+KTtcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdHZhciBpbnB1dEZpZWxkID0gKCA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT17dmFsdWVzWzJdfSBvbkNsaWNrPXt2YWx1ZXNbMF19IHZhbHVlPXt2YWx1ZXNbMV19IC8+KTtcblx0XHRcdG91dHB1dD0oXG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuXHRcdFx0XHRcdFdlbGNvbWUgPHNwYW4gY2xhc3NOYW1lPVwidXNlcm5hbWVcIj57dGhpcy5wcm9wcy5mdWxsX25hbWV9PC9zcGFuPlxuXHRcdFx0XHQ8L2gzPlxuXHRcdFx0XHQ8aDMgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57dGhpcy5zdGF0ZS5kYXRlLnRvTG9jYWxlVGltZVN0cmluZyhbXSwge2hvdXI6ICcyLWRpZ2l0JywgbWludXRlOicyLWRpZ2l0J30pfSBvbiB7dGhpcy5zdGF0ZS5kYXRlLnRvRGF0ZVN0cmluZygpfSA8L2gzPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nY2xvY2tJbic+XG5cdFx0XHRcdFx0PGZvcm0gY2xhc3NOYW1lPVwiZm9ybS1jaGVja2luXCIgcm9sZT1cImZvcm1cIj5cblx0XHRcdFx0XHRcdHtpbnB1dEZpZWxkfVxuXHRcdFx0XHRcdFx0PGJyLz5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd0ZXh0LWNlbnRlcic+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgXG5cdFx0XHRcdFx0XHRcdFx0XHR0eXBlPVwidGltZVwiIFxuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXt0aGlzLnN0YXRlLnNwZWNpZnlUaW1lID8gJ2Zvcm0tY29udHJvbCBzbWFsbC10aW1lJzonaGlkZGVuJ30gXG5cdFx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cblx0XHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGJyLz5cblx0XHRcdFx0XHRcdFx0PGEgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCIgb25DbGljaz17dGhpcy50b2dnbGVUaW1lSW5wdXR9Pnt0aGlzLnN0YXRlLnNwZWNpZnlUaW1lPycgLSBVc2UgQ3VycmVudCBUaW1lJzonICsgU3BlY2lmeSBhIFRpbWUnfTwvYT5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZm9ybT5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0iLCJcbi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF5c1RpbWVTaGVldHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0Ly9CaW5kaW5nIGRpbmdcblx0XHR0aGlzLmNoYW5nZWRTdGFydD10aGlzLmNoYW5nZWRTdGFydC5iaW5kKHRoaXMpXG5cdFx0dGhpcy5jaGFuZ2VkRW5kPXRoaXMuY2hhbmdlZEVuZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMudXBkYXRlU3RhcnQ9dGhpcy51cGRhdGVTdGFydC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMudXBkYXRlRW5kPXRoaXMudXBkYXRlRW5kLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5kZWxldGU9dGhpcy5kZWxldGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmtleVByZXNzZWRTdGFydD10aGlzLmtleVByZXNzZWRTdGFydC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMua2V5UHJlc3NlZEVuZD10aGlzLmtleVByZXNzZWRFbmQuYmluZCh0aGlzKTtcblx0fVxuXHRjaGFuZ2VkU3RhcnQoZSl7XG5cdFx0dGhpcy5wcm9wcy50aW1lQ2hhbmdlZCAgKCdzdGFydCcsdGhpcy5wcm9wcy5lbXBsb3llZSx0aGlzLnByb3BzLnRpbWVzaGVldCxlLnRhcmdldC52YWx1ZSk7XG5cdH1cblx0Y2hhbmdlZEVuZChlKXtcblx0XHR0aGlzLnByb3BzLnRpbWVDaGFuZ2VkKCdlbmQnLHRoaXMucHJvcHMuZW1wbG95ZWUsdGhpcy5wcm9wcy50aW1lc2hlZXQsZS50YXJnZXQudmFsdWUpO1xuXHR9XG5cdHVwZGF0ZVN0YXJ0KGUpe1xuXHRcdGlmKGUudGFyZ2V0LnZhbHVlIT0nJyl7XG5cdFx0XHR0aGlzLnByb3BzLnVwZGF0ZVRpbWUoJ3N0YXJ0Jyx0aGlzLnByb3BzLmVtcGxveWVlLHRoaXMucHJvcHMudGltZXNoZWV0LCBlLnRhcmdldC52YWx1ZSk7XG5cdFx0fVxuXHR9XG5cdHVwZGF0ZUVuZChlKXtcblx0XHRpZihlLnRhcmdldC52YWx1ZSE9Jycpe1xuXHRcdFx0dGhpcy5wcm9wcy51cGRhdGVUaW1lKCdlbmQnLHRoaXMucHJvcHMuZW1wbG95ZWUsdGhpcy5wcm9wcy50aW1lc2hlZXQsIGUudGFyZ2V0LnZhbHVlKTtcblx0XHR9XG5cdH1cblx0ZGVsZXRlKGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR0aGlzLnByb3BzLmRlbGV0ZUVtcGxveWVlKHRoaXMucHJvcHMuZW1wbG95ZWUsdGhpcy5wcm9wcy50aW1lc2hlZXQpO1xuXHR9XG5cdGtleVByZXNzZWRTdGFydChlKSB7XG5cdCAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcblx0ICAgIFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHQgICAgXHRpZih0aGlzLnByb3BzLnN0YXJ0IT0nJyl7XG5cdFx0XHRcdHRoaXMucHJvcHMudXBkYXRlVGltZSgnc3RhcnQnLHRoaXMucHJvcHMuZW1wbG95ZWUsdGhpcy5wcm9wcy50aW1lc2hlZXQsIHRoaXMucHJvcHMuc3RhcnQpO1xuXHRcdFx0fVxuXHQgICAgfVxuXHQgfVxuXHRrZXlQcmVzc2VkRW5kKGUpIHtcblx0ICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xuXHQgICAgXHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdCAgICBcdGlmKHRoaXMucHJvcHMuZW5kIT0nJyl7XG5cdFx0XHRcdHRoaXMucHJvcHMudXBkYXRlVGltZSgnc3RhcnQnLHRoaXMucHJvcHMuZW1wbG95ZWUsdGhpcy5wcm9wcy50aW1lc2hlZXQsIHRoaXMucHJvcHMuZW5kKTtcblx0XHRcdH1cblx0ICAgIH1cblx0IH1cblx0cmVuZGVyKCl7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGxpIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaXRlbVwiID5cblx0XHRcdFx0PGZvcm0gIGNsYXNzTmFtZT1cImZvcm0taW5saW5lIHJvdyBkYXlfdGltZV9mb3JtX3Jvd1wiPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsIGNvbC1tZC0zIGNvbC1zbS0zIGNvbC14cy0xMiB0ZXh0LWNlbnRlciBkYXlfdGltZV9mb3JtX3Jvd19lbGVtZW50XCI+PHN0cm9uZz57IHRoaXMucHJvcHMuZW1wbG95ZWVfbmFtZX08L3N0cm9uZz48L2xhYmVsPlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtMyBjb2wtc20tMyBjb2wteHMtNiBkYXlfdGltZV9mb3JtX3Jvd19lbGVtZW50XCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAtYWRkb25cIj5TdGFydDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8aW5wdXQgXG5cdFx0XHRcdFx0XHRcdFx0dHlwZT1cInRpbWVcIiBcblx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgc3RhcnRcIiBcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17dGhpcy5wcm9wcy5zdGFydH1cblx0XHRcdFx0XHRcdFx0XHRvbkJsdXI9e3RoaXMudXBkYXRlU3RhcnR9XG5cdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuY2hhbmdlZFN0YXJ0fVxuXHRcdFx0XHRcdFx0XHRcdG9uS2V5UHJlc3M9e3RoaXMua2V5UHJlc3NlZFN0YXJ0fVxuXG5cdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC0zIGNvbC1zbS0zIGNvbC14cy02IGRheV90aW1lX2Zvcm1fcm93X2VsZW1lbnRcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXBcIj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cC1hZGRvblwiPkVuZDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8aW5wdXQgXG5cdFx0XHRcdFx0XHRcdFx0dHlwZT1cInRpbWVcIiBcblx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgZW5kXCIgXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU9e3RoaXMucHJvcHMuZW5kfVxuXHRcdFx0XHRcdFx0XHRcdG9uQmx1cj17dGhpcy51cGRhdGVFbmR9XG5cdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuY2hhbmdlZEVuZH1cblx0XHRcdFx0XHRcdFx0XHRvbktleVByZXNzPXt0aGlzLmtleVByZXNzZWRFbmR9XG5cdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTMgY29sLXNtLTMgY29sLXhzLTEyIHRleHQtY2VudGVyIGRheV90aW1lX2Zvcm1fcm93X2VsZW1lbnRcIj5cblx0XHRcdFx0XHRcdDxidXR0b24gXG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImRlbGV0ZSBidG4gYnRuLWRhbmdlclwiXG5cdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMuZGVsZXRlfVxuXHRcdFx0XHRcdFx0PkRlbGV0ZTwvYnV0dG9uPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Zvcm0+XG5cdFx0XHQ8L2xpPlxuXHRcdCk7XG5cdH1cbn0iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZVNoZWV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdC8qICAgICBEbyB0aGUgYmluZCB0aGluZyAgICAgICovXG5cdFx0dGhpcy5hdXRvY29tcGxldGU9dGhpcy5hdXRvY29tcGxldGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmFkZENoYW5nZWQ9dGhpcy5hZGRDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5hZGRDbGlja2VkPXRoaXMuYWRkQ2xpY2tlZC5iaW5kKHRoaXMpO1xuXHR9XG5cblx0YXV0b2NvbXBsZXRlKGlucHV0KXtcblx0XHR2YXIgY29uZmlnID0ge1xuXHRcdFx0bWluQ2hhcnM6IDAsXG5cdFx0XHRtYXhJdGVtczogOTksXG5cdFx0XHRhdXRvRmlyc3Q6IHRydWUsXG5cdFx0XHRpdGVtOiBmdW5jdGlvbihpdGVtLCBpbnB1dCkge1xuXHRcdFx0XHR2YXIgZCA9IGl0ZW07XG5cdFx0XHRcdHZhciBodG1sID0gXCI8c3Bhbj5cIiArIF9fKGl0ZW0ubGFiZWwpKyBcIjwvc3Bhbj48YnI+PHNwYW4+PHNtYWxsPlwiK2l0ZW0udmFsdWUrXCI8L3NtYWxsPjwvc3Bhbj5cIjtcblx0XHRcdFx0cmV0dXJuICQoJzxsaT48L2xpPicpXG5cdFx0XHRcdFx0LmRhdGEoJ2l0ZW0uYXV0b2NvbXBsZXRlJywgaXRlbSlcblx0XHRcdFx0XHQuaHRtbCgnPGE+PHA+JyArIGh0bWwgKyAnPC9wPjwvYT4nKVxuXHRcdFx0XHRcdC5nZXQoMCk7XG5cdFx0XHR9XG5cdFx0fTtcblx0XHR2YXIgYXcgPSBuZXcgQXdlc29tcGxldGUoaW5wdXQsY29uZmlnKTtcblx0XHRpbnB1dC5hZGRFdmVudExpc3RlbmVyKFxuXHRcdFx0J2F3ZXNvbXBsZXRlLXNlbGVjdGNvbXBsZXRlJyxcblx0XHRcdFx0dGhpcy5hZGRDaGFuZ2VkXG5cdFx0KTtcblx0XHRhdy5saXN0PXBzLmVtcGxveWVlX2xhYmxlc1xuXHRcdCQoZG9jdW1lbnQpLmJpbmQoJ2VtcGxveWVlTGFibGVzTG9hZGVkJyxmdW5jdGlvbigpe1xuXHRcdFx0YXcubGlzdD1wcy5lbXBsb3llZV9sYWJsZXM7XG5cdFx0fSk7XG5cdH1cblx0YWRkQ2hhbmdlZChlKXtcblx0XHR0aGlzLmFkZD1lLnRhcmdldC52YWx1ZTtcblx0fTtcblx0YWRkQ2xpY2tlZChlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dmFyIHdvX25hbWU9dGhpcy5wcm9wcy5uYW1lO1xuXHRcdHZhciBlbXBsb3llZV9uYW1lPXRoaXMuYWRkO1xuXHRcdC8vQ2FsbCBiYWNrIGZvciBiaW5kaW5nP1xuXHRcdHZhciB1cGRhdGVDYWxsYmFjaz1mdW5jdGlvbihpbmRleCl7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oZGF0YSl7XHRcdFx0XG5cdFx0XHRcdHRoaXMudXBkYXRlRnJvbVNlcnZlclBhcmFtKGRhdGEsaW5kZXgpO1xuXHRcdFx0fS5iaW5kKHRoaXMpO1xuXHRcdH0uYmluZCh0aGlzKTtcblx0XHR0aGlzLnByb3BzLmFkZEVtcGxveWVlKHdvX25hbWUsIGVtcGxveWVlX25hbWUpO1xuXHR9O1xuXHRyZW5kZXIoKXtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsIHBhbmVsLWRlZmF1bHQgcm93XCI+XG5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYW5lbC1oZWFkaW5nXCI+XG5cdFx0XHRcdFx0PGg0IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+IFRpbWUgU2hlZXQge3RoaXMucHJvcHMuZGF0ZX0gZm9yIHt0aGlzLnByb3BzLmNyZXd9IDwvaDQ+XG5cdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdDx1bCBjbGFzc05hbWU9XCJsaXN0LWdyb3VwXCIgPlxuXHRcdFx0XHRcdDxkaXYgaWQ9J2Zvcm1zJz5cblx0XHRcdFx0XHRcdHt0aGlzLnByb3BzLmVtcGxveWVlc31cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC91bD5cblx0XHRcdCAgXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtZm9vdGVyIGNvbC1tZC0xMiB0ZXh0LWxlZnQgbGlzdC1ncm91cC1pdGVtXCI+XG5cdFx0XHRcdFx0PGZvcm0gY2xhc3NOYW1lPVwiZm9ybS1pbmxpbmUgcm93IFwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBjb2wtbWQtMyBjb2wtc20tMiBjb2wteHMtMTIgdXBkYXRlX2Rpdl9lbGVtZW50XCI+XG5cdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tc3VjY2Vzc1wiPlVwZGF0ZTwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInRleHQtcmlnaHQgY29sLW1kLTYgY29sLXNtLTYgY29sLXhzLTQgXCI+XG5cdFx0XHRcdFx0XHRcdDxidXR0b24gXG5cdFx0XHRcdFx0XHRcdFx0dHlwZT1cInN1Ym1pdFwiIFxuXHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiXG5cdFx0XHRcdFx0XHRcdFx0b25DbGljaz17dGhpcy5hZGRDbGlja2VkfVxuXHRcdFx0XHRcdFx0XHRcdD4rIEFkZDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgdGV4dC1sZWZ0IGNvbC1tZC0zIGNvbC1zbS00IGNvbC14cy02IFwiPjxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXBcIj5cblx0XHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJ0ZXh0XCIgXG5cdFx0XHRcdFx0XHRcdFx0cmVmPXt0aGlzLmF1dG9jb21wbGV0ZX1cbiAgICAgICAgICBcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5hZGRDaGFuZ2VkfSBcbiAgICAgICAgICBcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJuZXdfZW1wbG95ZWVzIGZvcm0tY29udHJvbCBhd2Vzb21wbGV0ZVwiIFxuICAgICAgICAgIFx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwiZW1wbG95ZWVcIiAvPlxuXHRcdFx0XHRcdFx0PC9kaXY+PC9kaXY+XG5cdFx0XHRcdFx0PC9mb3JtPlxuXHRcdFx0XHRcdFxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuIiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5pbXBvcnQgV29ya29yZGVyVGFzayBmcm9tICcuL3dvcmtvcmRlclRhc2snO1xuXG5pbXBvcnQgRm9ybSBmcm9tICcuLi91dGlscy9mb3JtcydcbmltcG9ydCBNb2RhbCBmcm9tICcuLi91dGlscy9tb2RhbCdcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERheXNXb3Jrb3JkZXJzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHZhciBhcmdzPXt9O1xuXHRcdGFyZ3MuY3Jldz10aGlzLnByb3BzLmNyZXc7XG5cdFx0YXJncy5kYXRlPXRoaXMucHJvcHMuZGF0ZTtcblx0XHQvKiAgIERvIHRoZSBiaW5kIHRoaW5nICAqL1xuXHRcdHRoaXMub25UYXNrQ2hlY2tlZD10aGlzLm9uVGFza0NoZWNrZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLm9uU3RhdHVzQ2hhbmdlZD10aGlzLm9uU3RhdHVzQ2hhbmdlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMud29ya09yZGVyQ2hhbmdlZD10aGlzLndvcmtPcmRlckNoYW5nZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnNvY2tldFVwZGF0ZT10aGlzLnNvY2tldFVwZGF0ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcz10aGlzLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMuYmluZCh0aGlzKTtcblx0XHR0aGlzLmNyZWF0ZVdvcmtvcmRlcj10aGlzLmNyZWF0ZVdvcmtvcmRlci5iaW5kKHRoaXMpO1xuXHRcdC8vdGhpcy53b3Jrb3JkZXJPYmo9dGhpcy5vblN0YXR1c0NoYW5nZWQuYmluZCh0aGlzKTtcblx0XHQvKiAgICAgICAgICBlbmQgICAgICAgICAgKi9cblxuXHRcdHRoaXMuc3RhdGU9e3dvcmtvcmRlcnM6W119O1xuXG5cdFx0dmFyIGFyZ3M9e307XG5cdFx0YXJncy5jcmV3PXRoaXMucHJvcHMuY3Jldztcblx0XHRhcmdzLmRhdGU9dGhpcy5wcm9wcy5kYXRlO1xuXHRcdHRoaXMud29ya29yZGVyVG9vbCA9IG5ldyBwcy5hcGlUb29sKGFyZ3MscHMuYXBpU2V0dXAud29ya09yZGVycyx0aGlzLndvcmtPcmRlckNoYW5nZWQpO1xuXHRcdGlmICh0aGlzLndvcmtvcmRlclRvb2wuaXRlbXM9PT11bmRlZmluZWQgfHx0aGlzLndvcmtvcmRlclRvb2wuaXRlbXM9PT0gMCB8fHRoaXMud29ya29yZGVyVG9vbC5pdGVtcz09PW51bGwgKXtcblx0XHR9ZWxzZXtcblx0XHRcdHRoaXMuc3RhdGUud29ya29yZGVycz10aGlzLndvcmtvcmRlclRvb2wuaXRlbXM7XG5cdFx0fVxuXG5cdH1cblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xuXG5cdFx0aWYobmV4dFByb3BzLmNyZXchPXRoaXMucHJvcHMuY3JldyB8fCBuZXh0UHJvcHMuZGF0ZSE9dGhpcy5wcm9wcy5kYXRlICl7XG5cblx0XHRcdHZhciBhcmdzPXt9O1xuXHRcdFx0YXJncy5jcmV3PW5leHRQcm9wcy5jcmV3O1xuXHRcdFx0YXJncy5kYXRlPW5leHRQcm9wcy5kYXRlO1xuXHRcdFx0dGhpcy53b3Jrb3JkZXJUb29sID0gbmV3IHBzLmFwaVRvb2woYXJncyxwcy5hcGlTZXR1cC53b3JrT3JkZXJzLHRoaXMud29ya09yZGVyQ2hhbmdlZCk7XG5cdFx0XHRpZiAodGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zPT09dW5kZWZpbmVkIHx8dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zPT09IDAgfHx0aGlzLndvcmtvcmRlclRvb2wuaXRlbXM9PT1udWxsICl7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3dvcmtvcmRlcnM6W119KTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHt3b3Jrb3JkZXJzOnRoaXMud29ya29yZGVyVG9vbC5pdGVtc30pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHNvY2tldFVwZGF0ZSgpe1xuXG5cdH1cblx0b25UYXNrQ2hlY2tlZCh3b19pbmRleCxpbmRleCxjaGVjayl7XG5cdFx0dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zW3dvX2luZGV4XS5zdWJ0YXNrW2luZGV4XS5zdGF0dXM9Y2hlY2s/MDoxO1xuXHRcdHRoaXMuc2V0U3RhdGUoe3dvcmtvcmRlcnM6dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zfSk7XG5cdFx0dGhpcy53b3Jrb3JkZXJUb29sLnVwZGF0ZSh0aGlzLndvcmtvcmRlclRvb2wuaXRlbXNbd29faW5kZXhdKTtcblx0XHR2YXIgY2hlY2tlZFRleHQ9Y2hlY2s/XCJ1bmNoZWNrZWQuXCI6XCJjaGVja2VkLlwiXG5cdFx0Ly9wcy5zdWNjZXNzQWxlcnQodGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zW3dvX2luZGV4XS5zdWJ0YXNrW2luZGV4XS50YXNrICtcIiBcIisgY2hlY2tlZFRleHQgKTtcblx0fVxuXHRvblN0YXR1c0NoYW5nZWQoc3RhdHVzLCBpbmRleCl7XG5cdFx0dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zW2luZGV4XS5zdGF0dXM9c3RhdHVzO1xuXHRcdHRoaXMuc2V0U3RhdGUoe3dvcmtvcmRlcnM6dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zfSk7XG5cdFx0dGhpcy53b3Jrb3JkZXJUb29sLnVwZGF0ZSh0aGlzLndvcmtvcmRlclRvb2wuaXRlbXNbaW5kZXhdKTtcblx0XHRpZihzdGF0dXM9PVwiQ29tcGxldGVcIil7XG5cdFx0XHRwcy5zdWNjZXNzQWxlcnQoXCJXb3Jrb3JkZXIgY29tcGxldGVkIVwiKTtcblx0XHR9XG5cdH1cblx0d29ya09yZGVyQ2hhbmdlZCgpe1xuXG5cdFx0aWYgKHRoaXMud29ya29yZGVyVG9vbC5pdGVtcyE9PW51bGwpe1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7d29ya29yZGVyczp0aGlzLndvcmtvcmRlclRvb2wuaXRlbXN9KTtcblx0XHRcdGlmKHRoaXMucHJvcHMuc3RhdHVzVXBkYXRlICE9PSB1bmRlZmluZWQpe1xuXHRcdFx0XHR0aGlzLnByb3BzLnN0YXR1c1VwZGF0ZSh0aGlzLndvcmtvcmRlclRvb2wuaXRlbXMpO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7d29ya29yZGVyczpbXX0pO1xuXHRcdH1cblxuXHR9XG5cdGNyZWF0ZVdvcmtvcmRlcihpdGVtKXtcblx0XHRpdGVtLmRhdGU9bW9tZW50KGl0ZW0uZGF0ZSxcIk1NL0REL1lZWVlcIikuZm9ybWF0KCdZWVlZLU1NLUREJyk7XG5cdFx0dGhpcy53b3Jrb3JkZXJUb29sLmNyZWF0ZShpdGVtLGZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0cHMuc3VjY2Vzc0FsZXJ0KFwiV29ya29yZGVyIFwiICtpdGVtLm5hbWUrIFwiIGNyZWF0ZWQuXCIpXG5cdFx0fSk7XG5cblx0fVxuXHR3b3Jrb3JkZXJPYmooaXRlbSxpbmRleCl7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PFdvcmtvcmRlclRhc2sgXG5cdFx0XHRcdGtleT17aW5kZXggKyB0aGlzLnByb3BzLmNyZXd9IFxuXHRcdFx0XHRpbmRleD17aW5kZXh9IFxuXHRcdFx0XHRsb2NhdGlvbl9yb3V0ZT17aXRlbS5sb2NhdGlvbl9yb3V0ZX1cblx0XHRcdFx0bG9jYXRpb249e2l0ZW0ubG9jYXRpb259XG5cdFx0XHRcdHRhc2tzPXtpdGVtLnN1YnRhc2t9XG5cdFx0XHRcdHN0YXR1cz17aXRlbS5zdGF0dXN9XG5cdFx0XHRcdHR5cGU9e2l0ZW0udHlwZX1cblx0XHRcdFx0d29ya29yZGVyPXtpdGVtLm5hbWV9XG5cdFx0XHRcdG9uVGFza0NoZWNrZWQ9e3RoaXMub25UYXNrQ2hlY2tlZH1cblx0XHRcdFx0b25TdGF0dXNDaGFuZ2VkPXt0aGlzLm9uU3RhdHVzQ2hhbmdlZH1cblx0XHRcdFx0cm91dGU9e2l0ZW0ucm91dGV9XG5cdFx0XHQvPlxuXHRcdCk7XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vICAgICAgICBSZW5kZXJcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRyZW5kZXIoKXtcblx0XHRpZiAodGhpcy5zdGF0ZS53b3Jrb3JkZXJzPT09MHx8dGhpcy5zdGF0ZS53b3Jrb3JkZXJzPT09dW5kZWZpbmVkKXtcblx0XHRcdHJldHVybiAoPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPjxoMz5ObyBXb3Jrb3JkZXJzPC9oMz48L2Rpdj4pO1xuXHRcdH1cblx0XHR2YXIgdG9kbz1bXTtcblx0XHR2YXIgY29tcGxldGU9W107XG5cdFx0dGhpcy5zdGF0ZS53b3Jrb3JkZXJzLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCl7XG5cdFx0XHRpZiAoaXRlbS5zdGF0dXMhPSdDb21wbGV0ZScmJml0ZW0uc3RhdHVzIT0nSW5jb21wbGV0ZScpe1xuXHRcdFx0XHR0b2RvLnB1c2godGhpcy53b3Jrb3JkZXJPYmooaXRlbSxpbmRleCkpO1xuXHRcdFx0XHRpZih0b2RvLmxlbmd0aCsxJTQ9PT0wKXtcblxuXHRcdFx0XHRcdHRvZG8ucHVzaCg8ZGl2IGNsYXNzTmFtZT0nY2xlYXJmaXggc3BhY2VyJz48L2Rpdj4pXG5cdFx0XHRcdH1cblx0XHRcdH1lbHNle1xuXHRcdFx0XHRjb21wbGV0ZS5wdXNoKHRoaXMud29ya29yZGVyT2JqKGl0ZW0saW5kZXgpKTtcblx0XHRcdFx0aWYoY29tcGxldGUubGVuZ3RoJTM9PT0wKXtjb21wbGV0ZS5wdXNoKDxkaXYgY2xhc3NOYW1lPSdjbGVhcmZpeCBzcGFjZXInPjwvZGl2Pil9XG5cdFx0XHR9XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0XHR2YXIgY29tcGxldGVIZWFkZXI9KDxoMz5Db21wbGV0ZSBXb3JrIE9yZGVyczwvaDM+KTtcblx0XHRpZihjb21wbGV0ZS5sZW5ndGg9PTApe1xuXHRcdFx0Y29tcGxldGVIZWFkZXI9XCJcIjtcblx0XHR9XG5cblx0XHQvLyB2YXIgZGF0ZT10aGlzLnByb3BzLmRhdGU7XG5cdFx0Ly8gZGF0ZT1tb21lbnQoZGF0ZSwnWVlZWS1NTS1ERCcpLmZvcm1hdChcIk1NL0REL1lZWVlcIik7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ3b3Jrb3JkZXJfY29udGFpbmVyXCI+XG5cdFx0XHRcdDxkaXY+PGJyLz5cblx0XHRcdFx0XHR7dG9kb31cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj48L2Rpdj5cblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHR7Y29tcGxldGVIZWFkZXJ9XG5cdFx0XHRcdFx0e2NvbXBsZXRlfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPjwvZGl2PlxuXHRcdFx0XHQ8YnIvPlxuXHRcdFx0XHQ8V29ya29yZGVyRm9ybU1vZGFsXG5cdFx0XHRcdFx0aWQ9e1wiY3JlYXRlLXdvLVwiK3RoaXMucHJvcHMuY3Jldy5yZXBsYWNlKFwiIFwiLFwiLVwiKX1cblx0XHRcdFx0XHRjcmV3PXt0aGlzLnByb3BzLmNyZXd9XG5cdFx0XHRcdFx0ZGF0ZT17bW9tZW50KHRoaXMucHJvcHMuZGF0ZSwnWVlZWS1NTS1ERCcpLmZvcm1hdChcIk1NL0REL1lZWVlcIil9XG5cdFx0XHRcdFx0Y3JlYXRlV29ya29yZGVyPXt0aGlzLmNyZWF0ZVdvcmtvcmRlcn1cblx0XHRcdFx0Lz5cblxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblxuXHR9O1x0XG59XG5cbmV4cG9ydCBjbGFzcyBXb3Jrb3JkZXJGb3JtTW9kYWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cblx0XHR0aGlzLnN1Ym1pdD10aGlzLnN1Ym1pdC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuc3RhdGU9e1xuXHRcdFx0bG9jYXRpb246XCJcIixcblx0XHRcdHByaW9yaXR5OjEsXG5cdFx0XHR0eXBlOlwiUHJ1bmluZ1wiLFxuXHRcdFx0c3RhdHVzOlwiUGVuZGluZ1wiLFxuXHRcdFx0ZGF0ZTp0aGlzLnByb3BzLmRhdGUsXG5cdFx0XHRjcmV3OnRoaXMucHJvcHMuY3Jld1xuXHRcdH1cblx0fVxuXG5cdHN1Ym1pdChlKXtcblx0XHRpZih0aGlzLnN0YXRlLmxvY2F0aW9uPT1cIlwiIHx8dGhpcy5zdGF0ZS5jcmV3PT1cIlwiIHx8IChtb21lbnQodGhpcy5zdGF0ZS5kYXRlLFwiTU0vREQvWVlZWVwiKS5pc1ZhbGlkKCkpIT09dHJ1ZSl7XG5cdFx0XHRjb25zb2xlLmxvZyhcIm5vdCB2YWxpZFwiKTtcblx0XHR9ZWxzZXtcblx0XHRcdHZhciBjb3B5PXBzLmNsb25lKHRoaXMuc3RhdGUpO1xuXHRcdFx0JCgnIycrIHRoaXMucHJvcHMuaWQpLm1vZGFsKCdoaWRlJylcblx0XHRcdHRoaXMuc2V0U3RhdGUoe2xvY2F0aW9uOlwiXCJ9KVxuXHRcdFx0dGhpcy5wcm9wcy5jcmVhdGVXb3Jrb3JkZXIoY29weSk7XG5cdFx0fVxuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHZhciBmaWVsZHM9W1x0XHRcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJhdXRvQ29tcGxldGVcIixcblx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe2xvY2F0aW9uOmUudGFyZ2V0LnZhbHVlfSlcblx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHR2YWx1ZTp0aGlzLnN0YXRlLmxvY2F0aW9uLFxuXHRcdFx0XHRyZXF1aXJlZDp0cnVlLFxuXHRcdFx0XHRsYWJsZTpcIlZpbmV5YXJkXCIsXG5cdFx0XHRcdGRvY3R5cGU6XCJWaW5leWFyZFwiLFxuXHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJpbnB1dFwiLFxuXHRcdFx0XHRjbGFzc05hbWU6XCJ2aW5leWFyZC1pbnB1dFwiLFxuXHRcdFx0XHR0eXBlOlwibnVtYmVyXCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtwcmlvcml0eTplLnRhcmdldC52YWx1ZX0pXG5cdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0dmFsdWU6dGhpcy5zdGF0ZS5wcmlvcml0eSxcblx0XHRcdFx0bGFibGU6XCJQcmlvcml0eVwiXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImRhdGVcIixcblx0XHRcdFx0cmVxdWlyZWQ6dHJ1ZSxcblx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe2RhdGU6ZS50YXJnZXQudmFsdWV9KTtcblx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHR2YWx1ZTp0aGlzLnN0YXRlLmRhdGUsXG5cdFx0XHRcdGxhYmxlOlwiRGF0ZVwiXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcInNlbGVjdFwiLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7dHlwZTplLnRhcmdldC52YWx1ZX0pXG5cdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0dmFsdWU6dGhpcy5zdGF0ZS50eXBlLFxuXHRcdFx0XHRsYWJsZTpcIlR5cGVcIixcblx0XHRcdFx0b3B0aW9uczpbXG5cdFx0XHRcdFx0XCJXYXRlcmluZ1wiLFxuXHRcdFx0XHRcdFwiUHJ1bmluZ1wiLFxuXHRcdFx0XHRcdFwiUmVwYWlyXCIsXG5cdFx0XHRcdFx0XCJTcHJheWluZ1wiXG5cdFx0XHRcdF1cblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwic2VsZWN0XCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtzdGF0dXM6ZS50YXJnZXQudmFsdWV9KVxuXHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdHZhbHVlOnRoaXMuc3RhdGUuc3RhdHVzLFxuXHRcdFx0XHRsYWJsZTpcIlN0YXR1c1wiLFxuXHRcdFx0XHRkaXNhYmxlZDp0cnVlLFxuXHRcdFx0XHRvcHRpb25zOltcblx0XHRcdFx0XHRcIlBlbmRpbmdcIlxuXHRcdFx0XHRdXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImF1dG9Db21wbGV0ZVwiLFxuXHRcdFx0XHRvbkNoYW5nZTogdGhpcy5zb21lRnVuY3Rpb24sXG5cdFx0XHRcdGxhYmxlOlwiQ3Jld1wiLFxuXHRcdFx0XHRyZXF1aXJlZDp0cnVlLFxuXHRcdFx0XHRyZWFkb25seTpcInR1cmVcIixcblx0XHRcdFx0ZG9jdHlwZTpcIkNyZXdcIixcblx0XHRcdFx0ZG9jdmFsdWU6XCJuYW1lXCIsXG5cdFx0XHRcdGRvY2xhYmxlOlwiY3Jld19sZWFkX2Z1bGxfbmFtZVwiLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7Y3JldzplLnRhcmdldC52YWx1ZX0pXG5cdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0dmFsdWU6dGhpcy5zdGF0ZS5jcmV3LFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJidXR0b25cIixcblx0XHRcdFx0dHlwZTpcInN1Ym1pdFwiLFxuXHRcdFx0XHR2YWx1ZTpcIkNyZWF0ZSBXb3JrIE9yZGVyXCIsXG5cdFx0XHRcdGNsYXNzTmFtZTpcImJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIixcblx0XHRcdFx0b25DbGljazp0aGlzLnN1Ym1pdFxuXHRcdFx0fVxuXG5cblx0XHRdXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XHRcdFx0XHRcblx0XHRcdFx0PGEgXG5cdFx0XHRcdFx0aHJlZj1cIiNcIiBcblx0XHRcdFx0XHRjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIlxuXHRcdFx0XHRcdG9uQ2xpY2s9e2Z1bmN0aW9uKCl7JCgnIycrIHRoaXMucHJvcHMuaWQpLm1vZGFsKCl9LmJpbmQodGhpcyl9XG5cdFx0XHRcdFx0PlxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tcGx1c1wiPjwvc3Bhbj4gTmV3IFdvcmsgT3JkZXI8L2E+XG5cdFx0XHRcdDxNb2RhbCBcblx0XHRcdFx0XHRpZD17dGhpcy5wcm9wcy5pZH0gXG5cdFx0XHRcdFx0c3VibWl0VGV4dD1cIlN1Ym1pdFwiIFxuXHRcdFx0XHRcdHRpdGxlPVwiQ3JlYXRlIE5ldyBXb3Jrb3JkZXJcIlxuXHRcdFx0XHRcdHN1Ym1pdD17ZmFsc2V9XG5cdFx0XHRcdFx0PlxuXG5cdFx0XHRcdFx0PEZvcm1cblx0XHRcdFx0XHRcdGlkPVwiQ3JlYXRlV29ya29yZGVyRm9ybVwiXG5cdFx0XHRcdFx0XHR0eXBlPVwiaG9yaXpvbnRhbFwiXG5cdFx0XHRcdFx0XHRmaWVsZHM9e2ZpZWxkc31cblxuXHRcdFx0XHRcdC8+XG5cblx0XHRcdFx0PC9Nb2RhbD5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbiIsIi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyZWF0ZUlzc3VlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpXG5cdFx0dGhpcy5tb2RhbE5ld0lzc3VlPXRoaXMubW9kYWxOZXdJc3N1ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMubW9kYWxFZGl0SXNzdWU9dGhpcy5tb2RhbEVkaXRJc3N1ZS5iaW5kKHRoaXMpO1xuXHR9XG5cdHRvb2xUaXAoKXtcblx0XHQkKGZ1bmN0aW9uICgpIHtcblx0XHQgXHQkKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJykudG9vbHRpcCgpO1xuXHRcdH0pXG5cdH1cblx0bW9kYWxOZXdJc3N1ZShlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5wcm9wcy5hY3RpdmF0ZU1vZGFsTmV3KCk7XG5cdH1cblx0bW9kYWxFZGl0SXNzdWUoaXRlbSxlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0Y29uc29sZS5sb2coaXRlbSlcblx0XHR0aGlzLnByb3BzLmFjdGl2YXRlTW9kYWxFZGl0KGl0ZW0pO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHZhciBkcm9wZG93bkl0ZW1zPVtdO1xuXHRcdGlmKHRoaXMucHJvcHMuaXNzdWVzIT09bnVsbCl7XG5cdFx0XHR0aGlzLnByb3BzLmlzc3Vlcy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXHRcdFx0XHRpZiAoaXRlbS5zdGF0dXMgPT0nT3Blbicpe1xuXHRcdFx0XHRcdGRyb3Bkb3duSXRlbXMucHVzaChcblx0XHRcdFx0XHRcdDxsaSBrZXk9e2luZGV4fT4gXG5cdFx0XHRcdFx0XHRcdDxhIGNsYXNzTmFtZT1cImRyb3Bkb3duLWl0ZW1cIiBcblx0XHRcdFx0XHRcdFx0XHRocmVmPVwiI1wiIFxuXHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMubW9kYWxFZGl0SXNzdWUuYmluZCh0aGlzLGl0ZW0pfSBcblx0XHRcdFx0XHRcdFx0PntpdGVtLmlzc3VlX3RpdGxlfTwvYT5cblx0XHRcdFx0XHRcdDwvbGk+KTtcblx0XHRcdFx0fVxuXHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHR9XG5cdFx0dmFyIGlzc3VlQ291bnQ9XCIgXCI7XG5cdFx0aWYodGhpcy5wcm9wcy5pc3N1ZXMhPT1udWxsICYmIHRoaXMucHJvcHMuaXNzdWVzLmxlbmd0aCE9PW51bGwpe1xuXHRcdFx0dmFyIGNvdW50ID0gMDtcblx0XHRcdGZvcih2YXIgeD0wOyB4IDwgdGhpcy5wcm9wcy5pc3N1ZXMubGVuZ3RoO3grKyl7XG5cdFx0XHRcdGlmKHRoaXMucHJvcHMuaXNzdWVzW3hdLnN0YXR1cz09XCJPcGVuXCIpe1xuXHRcdFx0XHRcdGNvdW50Kys7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlzc3VlQ291bnQ9KGNvdW50PT09MCk/XCJcIjpjb3VudCtcIiBcIjtcblx0XHR9XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJkcm9wZG93biBkcm9wZG93bi1wYW5lbC1yaWdodFwiPlxuXG5cdFx0XHRcdDxidXR0b25cblx0XHRcdFx0XHRjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHQgYnRuLXhzIGRyb3Bkb3duLXRvZ2dsZSBmdWxsLWhlYWRlci1idXR0b24gY29ybmVyXCIgXG5cdFx0XHRcdFx0dHlwZT1cImJ1dHRvblwiIFxuXHRcdFx0XHRcdGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBcblx0XHRcdFx0XHRhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIFxuXHRcdFx0XHRcdGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiID5cblxuXHRcdFx0XHQgXHR7aXNzdWVDb3VudH08c3BhbiBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLWV4Y2xhbWF0aW9uLXNpZ25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XG5cdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHQ8dWwgY2xhc3NOYW1lPVwiZHJvcGRvd24tbWVudVwiPlxuXHRcdFx0XHQgICAgPGxpIGNsYXNzTmFtZT1cImRyb3Bkb3duLWhlYWRlclwiPklzc3VlczwvbGk+XG5cdFx0XHRcdCAgICB7ZHJvcGRvd25JdGVtc31cblx0XHRcdFx0ICAgIDxsaSByb2xlPVwic2VwYXJhdG9yXCIgY2xhc3NOYW1lPVwiZGl2aWRlclwiPjwvbGk+XG5cdFx0XHRcdCAgICA8bGk+PGEgXG5cdFx0XHRcdCAgICBcdGNsYXNzTmFtZT1cImRyb3Bkb3duLWl0ZW1cIlxuXHRcdFx0XHQgICAgXHRvbkNsaWNrPXt0aGlzLm1vZGFsTmV3SXNzdWV9XG5cdFx0XHRcdCAgICBcdGhyZWY9XCIjXCIgPiArIE5ldyBJc3N1ZTwvYT48L2xpPlxuXHRcdFx0XHQ8L3VsPlxuXG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cblxuIiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrQ2hlY2sgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy50YXNrQ2hlY2tlZCA9IHRoaXMudGFza0NoZWNrZWQuYmluZCh0aGlzKTtcblx0fVxuXHR0YXNrQ2hlY2tlZChlKXtcblx0XHR0aGlzLnByb3BzLnRhc2tDaGVja2VkKHRoaXMucHJvcHMuaW5kZXgsIHRoaXMucHJvcHMuY2hlY2tlZCk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3QgY2hlY2tlZCA9IHRoaXMucHJvcHMuY2hlY2tlZCA/IFwibGluZS10aHJvdWdoXCIgOiBcIlwiO1xuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hlY2tib3ggcm93XCI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLThcIj5cblx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT17Y2hlY2tlZH0+XG5cdFx0XHRcdFx0PGlucHV0IFxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiYmlnLWNoZWNrYm94XCIgXG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17ZnVuY3Rpb24oKXt0aGlzLnByb3BzLnRhc2tDaGVja2VkKHRoaXMucHJvcHMuaXRlbSwgY2hlY2tlZCk7fS5iaW5kKHRoaXMpfSBcblx0XHRcdFx0XHRcdHR5cGU9XCJjaGVja2JveFwiIFxuXHRcdFx0XHRcdFx0Y2hlY2tlZD17dGhpcy5wcm9wcy5jaGVja2VkfSAvPlxuXHRcdFx0XHRcdHt0aGlzLnByb3BzLmxhYmxlfVxuXHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJlZGl0IGNvbC14cy00XCI+IFxuXHRcdFx0XHRcdDxidXR0b24gXG5cdFx0XHRcdFx0XHR0eXBlPVwiYnV0dG9uXCIgXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHQgaW5saW5lLXRhc2tcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17dGhpcy5wcm9wcy5lZGl0VGFza31cblx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tZWRpdFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cblx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XHRcbn0iLCJcbi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuaW1wb3J0IFRhc2tDaGVjayBmcm9tICcuL3Rhc2tDaGVjaydcbmltcG9ydCBDcmVhdGVJc3N1ZSBmcm9tICcuL2NyZWF0ZUlzc3VlJ1xuaW1wb3J0IE1vZGFsIGZyb20gJy4uL3V0aWxzL21vZGFsJ1xuaW1wb3J0IHtGb3JtLCBTZWxlY3R9IGZyb20gJy4uL3V0aWxzL2Zvcm1zJ1xuaW1wb3J0IHtTcHJheUZvcm0sUHJ1bmluZ0Zvcm19IGZyb20gJy4uL3ZpbmV5YXJkL3NwcmF5Rm9ybSdcbmltcG9ydCBEb2N0eXBlRm9ybSBmcm9tICcuLi91dGlscy9kb2N0eXBlRm9ybSdcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXb3Jrb3JkZXJUYXNrIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuc3RhdGU9e1xuXHRcdFx0aXNzdWVzOltdLFxuXHRcdFx0dGl0bGU6JycsXG5cdFx0XHRtb2RhbDonbmV3Jyxcblx0XHRcdG1vZGFsUHJpb3JpdHk6J2xvdycsXG5cdFx0XHRtb2RhbFRpdGxlOicnLFxuXHRcdFx0bW9kYWxEZXNjcmlwdGlvbjonJyxcblx0XHRcdG1vZGFsTmFtZTonJ1xuXHRcdH07XG5cdFx0dGhpcy50YXNrQ2hlY2tlZD10aGlzLnRhc2tDaGVja2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5zdGF0dXNDaGFuZ2U9dGhpcy5zdGF0dXNDaGFuZ2UuYmluZCh0aGlzKTtcblx0XHR0aGlzLmFjdGl2YXRlTW9kYWxOZXc9dGhpcy5hY3RpdmF0ZU1vZGFsTmV3LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5hY3RpdmF0ZU1vZGFsRWRpdD10aGlzLmFjdGl2YXRlTW9kYWxFZGl0LmJpbmQodGhpcyk7XG5cblx0XHR0aGlzLmlzc3VlRm9ybUNoYW5nZT10aGlzLmlzc3VlRm9ybUNoYW5nZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY3JlYXRlSXNzdWU9dGhpcy5jcmVhdGVJc3N1ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZWRpdElzc3VlPXRoaXMuZWRpdElzc3VlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5kZWxldGVJc3N1ZT10aGlzLmRlbGV0ZUlzc3VlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jbG9zZT10aGlzLmNsb3NlLmJpbmQodGhpcyk7XG5cblx0XHR0aGlzLmlzc3VlQ2hhbmdlZD10aGlzLmlzc3VlQ2hhbmdlZC5iaW5kKHRoaXMpO1xuXG5cblx0XHR0aGlzLm1vZGFsSWQ9XCJpc3N1ZS1mb3JtLVwiK3RoaXMucHJvcHMud29ya29yZGVyO1xuXG5cdFx0XG5cdFx0dGhpcy5pc3N1ZVRvb2wgPSBuZXcgcHMuYXBpVG9vbCh7XCJ3b3JrX29yZGVyXCI6dGhpcy5wcm9wcy53b3Jrb3JkZXJ9LHtkb2N0eXBlOidJc3N1ZSd9LHRoaXMuaXNzdWVDaGFuZ2VkKTtcblxuXG5cdH1cblx0dGFza0NoZWNrZWQoZSl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7dGl0bGU6XCJDSEVDS0VEXCJ9KTtcblx0fVxuXHRpc0NoZWNrZWQodmFsdWUpe1xuICAgIFx0cmV0dXJuICgodmFsdWU9PT10aGlzLnN0YXRlLnNlbGVjdGVkKSA/J2NoZWNrZWQgbGluZS10aHJvdWdoJzonZGVmYXVsdCcpO1xuICBcdH1cbiAgXHR0YXNrQ2hlY2tlZChpbmRleCxjaGVja2VkKXtcbiAgXHRcdHZhciB3b19pbmRleD10aGlzLnByb3BzLmluZGV4O1xuICBcdFx0dGhpcy5wcm9wcy5vblRhc2tDaGVja2VkKHdvX2luZGV4LGluZGV4LGNoZWNrZWQpO1xuICBcdH1cbiAgXHRzdGF0dXNDaGFuZ2UoZSl7XG4gIFx0XHR0aGlzLnByb3BzLm9uU3RhdHVzQ2hhbmdlZChlLnRhcmdldC52YWx1ZSx0aGlzLnByb3BzLmluZGV4KTtcblxuICBcdH1cbiAgXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdFx0XHRJU1NVRSBGVU5DVElPTlNcbiAgXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgXHRhY3RpdmF0ZU1vZGFsTmV3KCl7XG4gIFx0XHR0aGlzLnNldFN0YXRlKHtpc3N1ZU1vZGU6XCJjcmVhdGVcIn0pO1xuICBcdFx0dGhpcy5zZXRTdGF0ZSh7aXNzdWU6e319KTtcbiAgXHRcdCQoJyMnK3RoaXMubW9kYWxJZCkubW9kYWwoKTtcbiAgXHR9XG4gIFx0YWN0aXZhdGVNb2RhbEVkaXQoaXNzdWUpe1xuICBcdFx0dGhpcy5zZXRTdGF0ZSh7aXNzdWVNb2RlOlwiZWRpdFwifSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7aXNzdWU6aXNzdWV9KTtcbiAgXHRcdCQoJyMnK3RoaXMubW9kYWxJZCkubW9kYWwoKTtcbiAgXHR9XG4gIFx0aXNzdWVGb3JtQ2hhbmdlKGlzc3VlKXtcbiAgXHRcdHRoaXMuc2V0U3RhdGUoe2lzc3VlOmlzc3VlfSk7XG4gIFx0fVxuICBcdGlzc3VlQ2hhbmdlZCgpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe2lzc3Vlczp0aGlzLmlzc3VlVG9vbC5pdGVtc30pO1xuXHR9XG4gIFx0Y3JlYXRlSXNzdWUoaXRlbSl7XG4gIFx0XHQvL2NvbnNvbGUubG9nKHRoaXMuc3RhdGUuaXNzdWUpO1xuXHRcdGl0ZW0udmluZXlhcmQ9dGhpcy5wcm9wcy5sb2NhdGlvbjtcblx0XHRpdGVtLndvcmtfb3JkZXI9dGhpcy5wcm9wcy53b3Jrb3JkZXI7XG5cdFx0dGhpcy5pc3N1ZVRvb2wuY3JlYXRlKGl0ZW0sZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRwcy5zdWNjZXNzQWxlcnQoXCJJc3N1ZSBcIiAraXRlbS50aXRsZSsgXCIgY3JlYXRlZC5cIilcblx0XHR9KTtcblx0XHQkKCcjJyt0aGlzLm1vZGFsSWQpLm1vZGFsKCd0b2dnbGUnKTtcblx0fVxuXHRkZWxldGVJc3N1ZShpdGVtKXtcbiAgXHRcdHRoaXMuaXNzdWVUb29sLmRlbGV0ZShpdGVtKTtcblx0XHQkKCcjJyt0aGlzLm1vZGFsSWQpLm1vZGFsKCd0b2dnbGUnKTtcblx0fVxuXHRlZGl0SXNzdWUoaXRlbSl7XG5cdFx0dGhpcy5pc3N1ZVRvb2wudXBkYXRlKGl0ZW0sZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRwcy5zdWNjZXNzQWxlcnQoXCJJc3N1ZSBcIiAraXRlbS50aXRsZStcIiB1cGRhdGVkLlwiKVxuXHRcdH0pO1xuXHRcdCQoJyMnK3RoaXMubW9kYWxJZCkubW9kYWwoJ3RvZ2dsZScpO1xuXHR9XG5cdGNsb3NlKCl7XG5cdFx0JCgnIycrdGhpcy5tb2RhbElkKS5tb2RhbCgndG9nZ2xlJyk7XG5cdH1cblxuXG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHRpdGxlPVwid2VsY29tZVwiO1xuXHRcdHZhciBtYWluQ2xhc3M9e1xuXHRcdFx0J0NvbXBsZXRlJzoncGFuZWwtc3VjY2VzcycsXG5cdFx0XHQnSW5jb21wbGV0ZSc6J3BhbmVsLWRhbmdlcicsXG5cdFx0XHQnUGVuZGluZyc6J3BhbmVsLWRlZmF1bHQnLFxuXHRcdFx0J1N0YXJ0ZWQnOidwYW5lbC13YXJuaW5nJ1xuXHRcdH1bdGhpcy5wcm9wcy5zdGF0dXNdO1xuXHRcdG1haW5DbGFzcyA9IG1haW5DbGFzcyArIFwiIHBhbmVsIHdvcmtvcmRlciBwcy1wYW5lbFwiO1xuXHRcdHZhciByb3V0ZT0odGhpcy5wcm9wcy5yb3V0ZT09PXVuZGVmaW5lZCk/XCJOb3QgQ3JlYXRlZFwiOig8YSBjbGFzc05hbWU9XCJcIiBocmVmPXt0aGlzLnByb3BzLnJvdXRlfT5Nb3JlIEluZm9ybWF0aW9uPC9hPik7XG5cdFx0dmFyIHRhc2tzPVwiXCI7XG5cdFx0aWYodGhpcy5wcm9wcy50YXNrcyE9PXVuZGVmaW5lZCl7XG5cdFx0XHR0YXNrcz1bXTtcblx0XHRcdHRoaXMucHJvcHMudGFza3MubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblx0XHRcdFx0dmFyIGNoZWNrZWQ9aXRlbS5zdGF0dXM/dHJ1ZTpmYWxzZTtcblx0XHRcdFx0dGFza3MucHVzaCg8VGFza0NoZWNrIGtleT17aW5kZXh9IGluZGV4PXtpbmRleH0gbGFibGU9e2l0ZW0udGFza30gY2hlY2tlZD17Y2hlY2tlZH0gdGFza0NoZWNrZWQ9e3RoaXMudGFza0NoZWNrZWR9Lz4pO1xuXHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdH1cblxuXHRcdHZhciBtb2RhbFRpdGxlID0gXCJcIjtcblx0XHRpZih0aGlzLnN0YXRlLmlzc3VlTW9kZSl7XG5cdFx0XHRtb2RhbFRpdGxlID0gXCJDcmVhdGUgSXNzdWVcIjtcblx0XHR9ZWxzZXtcblx0XHRcdG1vZGFsVGl0bGUgPSBcIkVkaXQgSXNzdWVcIjtcblx0XHR9XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9J2NvbC1tZC00IGNvbC1zbS00Jz5cblx0XHRcdFx0PE1vZGFsIFxuXHRcdFx0XHRcdGlkPXt0aGlzLm1vZGFsSWR9IFxuXHRcdFx0XHRcdHN1Ym1pdFRleHQ9XCJTdWJtaXRcIiBcblx0XHRcdFx0XHR0aXRsZT1cIkNyZWF0ZSBJc3N1ZSBGb3JcIlxuXHRcdFx0XHRcdHN1Ym1pdD17ZmFsc2V9XG5cdFx0XHRcdFx0PlxuXG5cdFx0XHRcdFx0XHQ8RG9jdHlwZUZvcm0gXG5cdFx0XHRcdFx0XHRcdGNsb3NlPXt0aGlzLmNsb3NlfVxuXHRcdFx0XHRcdFx0XHRpdGVtQ2hhbmdlPXt0aGlzLmlzc3VlRm9ybUNoYW5nZX1cblx0XHRcdFx0XHRcdFx0Y3JlYXRlPXt0aGlzLmNyZWF0ZUlzc3VlfVxuXHRcdFx0XHRcdFx0XHRlZGl0PXt0aGlzLmVkaXRJc3N1ZX1cblx0XHRcdFx0XHRcdFx0ZGVsZXRlPXt0aGlzLmRlbGV0ZUlzc3VlfVxuXHRcdFx0XHRcdFx0XHRtb2RlPXt0aGlzLnN0YXRlLmlzc3VlTW9kZX1cblx0XHRcdFx0XHRcdFx0aXRlbT17dGhpcy5zdGF0ZS5pc3N1ZX1cblx0XHRcdFx0XHRcdFx0aWQ9e3RoaXMucHJvcHMud29ya29yZGVyfVxuXG5cdFx0XHRcdFx0XHRcdGRvY3R5cGU9XCJJc3N1ZVwiXG5cdFx0XHRcdFx0XHRcdGlzc3VlX3RpdGxlPXt7YWN0aXZlOjF9fVxuXHRcdFx0XHRcdFx0XHRpc3N1ZT17e1xuXHRcdFx0XHRcdFx0XHRcdGFjdGl2ZToxLFxuXHRcdFx0XHRcdFx0XHRcdHR5cGU6XCJ0ZXh0YXJlYVwiIFxuXHRcdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0XHRwcmlvcml0eT17e1xuXHRcdFx0XHRcdFx0XHRcdGFjdGl2ZToxLFxuXHRcdFx0XHRcdFx0XHRcdGRlZmF1bHQ6XCJMb3dcIlxuXHRcdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0XHRzdGF0dXM9e3tcblx0XHRcdFx0XHRcdFx0XHRhY3RpdmU6MSxcblx0XHRcdFx0XHRcdFx0XHRkZWZhdWx0OlwiT3BlblwiXG5cdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHQvPiBcdFxuXHRcdFx0XHQ8L01vZGFsPlxuXHRcdFx0PGRpdiBpZD1cIlwiIGNsYXNzTmFtZT17bWFpbkNsYXNzfT5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYW5lbC1oZWFkaW5nXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cblx0XHRcdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJwYW5lbC10aXRsZSBjb2wteHMtOFwiPlxuXHRcdFx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9XCJmbG9hdC1sZWZ0XCIgaHJlZj17dGhpcy5wcm9wcy5sb2NhdGlvbl9yb3V0ZX0+e3RoaXMucHJvcHMubG9jYXRpb259PC9hPlxuXHRcdFx0XHRcdFx0PC9oMz5cblxuXG5cblx0XHRcdFx0XHRcdFx0PENyZWF0ZUlzc3VlXG5cdFx0XHRcdFx0XHRcdFx0aXNzdWVzPXt0aGlzLnN0YXRlLmlzc3Vlc31cblx0XHRcdFx0XHRcdFx0XHRhY3RpdmF0ZU1vZGFsTmV3PXt0aGlzLmFjdGl2YXRlTW9kYWxOZXd9XG5cdFx0XHRcdFx0XHRcdFx0YWN0aXZhdGVNb2RhbEVkaXQ9e3RoaXMuYWN0aXZhdGVNb2RhbEVkaXR9XG5cdFx0XHRcdFx0XHRcdFx0d29ya29yZGVyPXt0aGlzLnByb3BzLndvcmtvcmRlcn1cblxuXHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNsZWFyZml4XCI+PC9kaXY+XG5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFxuXG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWJvZHlcIj5cblx0XHRcdFx0XHQ8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCBzdGF0dXNcIiB2YWx1ZT17dGhpcy5wcm9wcy5zdGF0dXN9IG9uQ2hhbmdlPXt0aGlzLnN0YXR1c0NoYW5nZX0+XG5cdFx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPVwiUGVuZGluZ1wiPlBlbmRpbmc8L29wdGlvbj5cblx0XHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9XCJTdGFydGVkXCI+U3RhcnRlZDwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIkNvbXBsZXRlXCI+Q29tcGxldGU8L29wdGlvbj5cblx0XHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9XCJJbmNvbXBsZXRlXCI+SW5jb21wbGV0ZTwvb3B0aW9uPlxuXHRcdFx0XHRcdDwvc2VsZWN0PlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja19ib3hlc1wiPlxuXG5cdFx0XHRcdFx0XHR7dGFza3N9XG5cdFx0XHRcdFx0XHQ8VmluZXlhcmRUYXNrcyB3b3Jrb3JkZXI9e3RoaXMucHJvcHMud29ya29yZGVyfSB2aW5leWFyZD17dGhpcy5wcm9wcy5sb2NhdGlvbn0vPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHR7cm91dGV9XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cblxuXG5cbmV4cG9ydCBjbGFzcyBWaW5leWFyZFRhc2tzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXG5cdFx0dGhpcy5tb2RhbE5ld1Rhc2s9dGhpcy5tb2RhbE5ld1Rhc2suYmluZCh0aGlzKTtcblx0XHR0aGlzLnRhc2tDaGVja2VkPXRoaXMudGFza0NoZWNrZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnRhc2tDaGFuZ2VkPXRoaXMudGFza0NoYW5nZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLmVkaXRUYXNrPXRoaXMuZWRpdFRhc2suYmluZCh0aGlzKTtcblx0XHR0aGlzLmdldEZvcm09dGhpcy5nZXRGb3JtLmJpbmQodGhpcyk7XG5cblx0XHR0aGlzLmRlbGV0ZT10aGlzLmRlbGV0ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY2xvc2U9dGhpcy5jbG9zZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMudXBkYXRlPXRoaXMudXBkYXRlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jcmVhdGU9dGhpcy5jcmVhdGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLm9uQ2hhbmdlPXRoaXMub25DaGFuZ2UuYmluZCh0aGlzKTtcblx0XHRcblxuXHRcdHRoaXMubW9kYWxJZD1cInRhc2stZm9ybVwiK3RoaXMucHJvcHMud29ya29yZGVyO1xuXHRcdFxuXHRcdHRoaXMudGFza3NUb29sID0gbmV3IHBzLmFwaVRvb2woe1wid29ya19vcmRlclwiOnRoaXMucHJvcHMud29ya29yZGVyfSxwcy5hcGlTZXR1cC52aW5leWFyZFRhc2tzLHRoaXMudGFza0NoYW5nZWQpO1xuXHRcdHRoaXMuc3RhdGU9e1xuXHRcdFx0dGFza3M6dGhpcy50YXNrc1Rvb2wuaXRlbXMsXG5cdFx0XHRmb3JtU3RhdGU6IFwidGFza1R5cGVcIixcblx0XHRcdGZvcm1Nb2RlOlwiY3JlYXRlXCIsXG5cdFx0XHRlZGl0SXRlbTpudWxsXG5cdFx0fTtcblx0fVxuXHRtb2RhbE5ld1Rhc2soKXtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGZvcm1TdGF0ZTpcInRhc2tUeXBlXCIsXG5cdFx0XHRlZGl0SXRlbTpudWxsLFxuXHRcdFx0Zm9ybU1vZGU6XCJjcmVhdGVcIlxuXHRcdH0pO1xuXHRcdCQoJyMnK3RoaXMubW9kYWxJZCkubW9kYWwoKTtcblx0fVxuXHRpc0NoZWNrZWQodmFsdWUpe1xuICAgIFx0Ly9yZXR1cm4gKCh2YWx1ZT09PXRoaXMuc3RhdGUuc2VsZWN0ZWQpID8nY2hlY2tlZCBsaW5lLXRocm91Z2gnOidkZWZhdWx0Jyk7XG4gIFx0fVxuICBcdHRhc2tDaGFuZ2VkKCl7XG4gIFx0XHR0aGlzLnNldFN0YXRlKHt0YXNrczp0aGlzLnRhc2tzVG9vbC5pdGVtc30pO1xuICBcdH1cbiAgXHR0YXNrQ2hlY2tlZChpdGVtKXtcbiAgXHRcdGl0ZW0uY29tcGxldGU9aXRlbS5jb21wbGV0ZT8wOjE7XG4gIFx0XHR0aGlzLnRhc2tzVG9vbC51cGRhdGUoaXRlbSk7XG4gIFx0fVxuICBcdGVkaXRUYXNrKGl0ZW0pe1xuICBcdFx0Y29uc29sZS5sb2coXCJlZGl0IHRhc2sgY2FsbGVkXCIpO1xuICBcdFx0Y29uc29sZS5sb2coaXRlbSk7XG4gIFx0XHR0aGlzLnNldFN0YXRlKFxuICBcdFx0XHR7XG4gIFx0XHRcdFx0Zm9ybVN0YXRlOml0ZW0uZG9jdHlwZS5yZXBsYWNlKC9cXHMvZywgJycpLFxuICBcdFx0XHRcdGVkaXRJdGVtOml0ZW0sXG4gIFx0XHRcdFx0Zm9ybU1vZGU6XCJlZGl0XCJcbiAgXHRcdFx0fSk7XG4gIFx0XHQkKCcjJyt0aGlzLm1vZGFsSWQpLm1vZGFsKCk7XG4gIFx0fVxuICBcdHJlbmRlclRhc2tzKCl7XG4gIFx0XHR2YXIgdGFza3M9W107XG4gIFx0XHRpZih0aGlzLnN0YXRlLnRhc2tzIT09dW5kZWZpbmVkJiZ0aGlzLnN0YXRlLnRhc2tzIT09bnVsbCl7XG5cdFx0XHR0YXNrcz1bXTtcblx0XHRcdHRoaXMuc3RhdGUudGFza3MubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblx0XHRcdFx0Ly92YXIgY2hlY2tlZD1pdGVtLnN0YXR1cz90cnVlOmZhbHNlO1xuXHRcdFx0XHR0YXNrcy5wdXNoKFxuXHRcdFx0XHRcdDxUYXNrQ2hlY2sgXG5cdFx0XHRcdFx0XHRrZXk9e2luZGV4fVxuXHRcdFx0XHRcdFx0aW5kZXg9e2luZGV4fVxuXHRcdFx0XHRcdFx0aXRlbT17aXRlbX1cblx0XHRcdFx0XHRcdGxhYmxlPXtpdGVtLmRvY3R5cGV9XG5cdFx0XHRcdFx0XHRjaGVja2VkPXtpdGVtLmNvbXBsZXRlfVxuXHRcdFx0XHRcdFx0dGFza0NoZWNrZWQ9e3RoaXMudGFza0NoZWNrZWR9XG5cdFx0XHRcdFx0XHRlZGl0VGFzaz17ZnVuY3Rpb24oZSl7dGhpcy5lZGl0VGFzayhpdGVtKTt9LmJpbmQodGhpcyl9XG5cdFx0XHRcdFx0Lz4pO1xuXHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdH1cblx0XHRyZXR1cm4gdGFza3M7XG4gIFx0fVxuICBcdGRlbGV0ZShjb3B5KXtcbiAgXHRcdHRoaXMudGFza3NUb29sLmRlbGV0ZShjb3B5KTtcblx0XHQkKCcjJyt0aGlzLm1vZGFsSWQpLm1vZGFsKCd0b2dnbGUnKTtcblx0fVxuICBcdGNsb3NlKGUpe1xuICBcdFx0Y29uc29sZS5sb2coXCJjbG9zZVwiKTtcbiAgXHRcdCQoJyMnK3RoaXMubW9kYWxJZCkubW9kYWwoJ3RvZ2dsZScpO1xuICBcdH1cbiAgXHR1cGRhdGUoY29weSl7XG4gIFx0XHR0aGlzLnRhc2tzVG9vbC51cGRhdGUoY29weSk7XG5cdFx0JCgnIycrdGhpcy5tb2RhbElkKS5tb2RhbCgndG9nZ2xlJyk7XG4gIFx0fVxuICBcdGNyZWF0ZShpdGVtLGRvY3R5cGUpe1xuXHRcdGl0ZW0ud29ya19vcmRlcj10aGlzLnByb3BzLndvcmtvcmRlcjtcblx0XHRpdGVtLnZpbmV5YXJkPXRoaXMucHJvcHMudmluZXlhcmQ7XG5cdFx0aXRlbS5kb2N0eXBlPWRvY3R5cGU7XG5cdFx0dGhpcy50YXNrc1Rvb2wuY3JlYXRlKGl0ZW0pO1xuXHRcdCQoJyMnK3RoaXMubW9kYWxJZCkubW9kYWwoJ3RvZ2dsZScpO1xuICBcdH1cbiAgXHRvbkNoYW5nZShjb3B5KXtcbiAgXHRcdHRoaXMuc2V0U3RhdGUoe2VkaXRJdGVtOmNvcHl9KVxuICBcdH1cbiAgXHRnZXRGb3JtKCl7XG4gIFx0XHR2YXIgZm9ybXNPYmo9e1xuXHRcdFx0dGFza1R5cGU6ZnVuY3Rpb24oKXtcblx0XHRcdFx0cmV0dXJuKFx0XG5cdFx0XHRcdDxTZWxlY3Rcblx0XHRcdFx0XHRjbGFzc05hbWU9XCJcIlxuXHRcdFx0XHRcdGxhYmxlPVwiVGFzayBUeXBlXCJcblx0XHRcdFx0XHRvcHRpb25zPXtbXCIgXCJdLmNvbmNhdChwcy5hcGlTZXR1cC52aW5leWFyZFRhc2tzLmRvY3R5cGUpfVxuXHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17XG5cdFx0XHRcdFx0XHRmdW5jdGlvbihlKXt0aGlzLnNldFN0YXRlKHtmb3JtU3RhdGU6ICBlLnRhcmdldC52YWx1ZS5yZXBsYWNlKC9cXHMvZywgJycpICB9KX0uYmluZCh0aGlzKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0Lz5cblx0XHRcdCl9LmJpbmQodGhpcyksXG5cdFx0XHRTcHJheWluZzpmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0cmV0dXJuIChcdFx0XHRcdFx0XG5cdFx0XHRcdFx0PERvY3R5cGVGb3JtIFxuXHRcdFx0XHRcdFx0Y2xvc2U9e3RoaXMuY2xvc2V9XG5cdFx0XHRcdFx0XHRpdGVtQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxuXHRcdFx0XHRcdFx0Y3JlYXRlPXt0aGlzLmNyZWF0ZX1cblx0XHRcdFx0XHRcdGVkaXQ9e3RoaXMudXBkYXRlfVxuXHRcdFx0XHRcdFx0ZGVsZXRlPXt0aGlzLmRlbGV0ZX1cblx0XHRcdFx0XHRcdG1vZGU9e3RoaXMuc3RhdGUuZm9ybU1vZGV9XG5cdFx0XHRcdFx0XHRpdGVtPXtpdGVtfVxuXHRcdFx0XHRcdFx0aWQ9e3RoaXMucHJvcHMud29ya29yZGVyfVxuXG5cdFx0XHRcdFx0XHRkb2N0eXBlPVwiU3ByYXlpbmdcIlxuXHRcdFx0XHRcdFx0c2Vhc29uPXt7YWN0aXZlOjF9fVxuXHRcdFx0XHRcdFx0bm90ZT17e1xuXHRcdFx0XHRcdFx0XHRhY3RpdmU6MSxcblx0XHRcdFx0XHRcdFx0dHlwZTpcInRleHRhcmVhXCIgXG5cdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0c3ByYXlfdHlwZT17e2FjdGl2ZToxfX1cblxuXHRcdFx0XHRcdC8+IFx0XHRcblx0XHRcdFx0KTtcblxuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0SGFydmVzdDpmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0cmV0dXJuIChcdFx0XHRcdFx0XG5cdFx0XHRcdFx0PERvY3R5cGVGb3JtIFxuXHRcdFx0XHRcdFx0Y2xvc2U9e3RoaXMuY2xvc2V9XG5cdFx0XHRcdFx0XHRpdGVtQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxuXHRcdFx0XHRcdFx0Y3JlYXRlPXt0aGlzLmNyZWF0ZX1cblx0XHRcdFx0XHRcdGVkaXQ9e3RoaXMudXBkYXRlfVxuXHRcdFx0XHRcdFx0ZGVsZXRlPXt0aGlzLmRlbGV0ZX1cblx0XHRcdFx0XHRcdG1vZGU9e3RoaXMuc3RhdGUuZm9ybU1vZGV9XG5cdFx0XHRcdFx0XHRpdGVtPXtpdGVtfVxuXHRcdFx0XHRcdFx0aWQ9e3RoaXMucHJvcHMud29ya29yZGVyfVxuXG5cdFx0XHRcdFx0XHRkb2N0eXBlPVwiSGFydmVzdFwiXG5cdFx0XHRcdFx0XHRzZWFzb249e3thY3RpdmU6MX19XG5cdFx0XHRcdFx0XHRub3RlPXt7XG5cdFx0XHRcdFx0XHRcdGFjdGl2ZToxLFxuXHRcdFx0XHRcdFx0XHR0eXBlOlwidGV4dGFyZWFcIiBcblx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHRwb3VuZHM9e3thY3RpdmU6MX19XG5cdFx0XHRcdFx0XHRwb3N0X2hhcnZlc3Rfd2F0ZXI9e3thY3RpdmU6MX19XG5cblx0XHRcdFx0XHQvPiBcdFx0XG5cdFx0XHRcdCk7XG5cblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdEJpcmROZXRzOmZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0XHRyZXR1cm4gKFx0XHRcdFx0XHRcblx0XHRcdFx0XHQ8RG9jdHlwZUZvcm0gXG5cdFx0XHRcdFx0XHRjbG9zZT17dGhpcy5jbG9zZX1cblx0XHRcdFx0XHRcdGl0ZW1DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG5cdFx0XHRcdFx0XHRjcmVhdGU9e3RoaXMuY3JlYXRlfVxuXHRcdFx0XHRcdFx0ZWRpdD17dGhpcy51cGRhdGV9XG5cdFx0XHRcdFx0XHRkZWxldGU9e3RoaXMuZGVsZXRlfVxuXHRcdFx0XHRcdFx0bW9kZT17dGhpcy5zdGF0ZS5mb3JtTW9kZX1cblx0XHRcdFx0XHRcdGl0ZW09e2l0ZW19XG5cdFx0XHRcdFx0XHRpZD17dGhpcy5wcm9wcy53b3Jrb3JkZXJ9XG5cblx0XHRcdFx0XHRcdGRvY3R5cGU9XCJCaXJkIE5ldHNcIlxuXHRcdFx0XHRcdFx0c2Vhc29uPXt7YWN0aXZlOjF9fVxuXHRcdFx0XHRcdFx0bm90ZT17e1xuXHRcdFx0XHRcdFx0XHRhY3RpdmU6MSxcblx0XHRcdFx0XHRcdFx0dHlwZTpcInRleHRhcmVhXCIgXG5cdFx0XHRcdFx0XHR9fVxuXG5cdFx0XHRcdFx0Lz4gXHRcdFxuXHRcdFx0XHQpO1xuXG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRXYXRlcmluZzpmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0cmV0dXJuIChcdFx0XHRcdFx0XG5cdFx0XHRcdFx0PERvY3R5cGVGb3JtIFxuXHRcdFx0XHRcdFx0Y2xvc2U9e3RoaXMuY2xvc2V9XG5cdFx0XHRcdFx0XHRpdGVtQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxuXHRcdFx0XHRcdFx0Y3JlYXRlPXt0aGlzLmNyZWF0ZX1cblx0XHRcdFx0XHRcdGVkaXQ9e3RoaXMudXBkYXRlfVxuXHRcdFx0XHRcdFx0ZGVsZXRlPXt0aGlzLmRlbGV0ZX1cblx0XHRcdFx0XHRcdG1vZGU9e3RoaXMuc3RhdGUuZm9ybU1vZGV9XG5cdFx0XHRcdFx0XHRpdGVtPXtpdGVtfVxuXHRcdFx0XHRcdFx0aWQ9e3RoaXMucHJvcHMud29ya29yZGVyfVxuXG5cdFx0XHRcdFx0XHRkb2N0eXBlPVwiV2F0ZXJpbmdcIlxuXHRcdFx0XHRcdFx0c2Vhc29uPXt7YWN0aXZlOjF9fVxuXHRcdFx0XHRcdFx0bm90ZT17e1xuXHRcdFx0XHRcdFx0XHRhY3RpdmU6MSxcblx0XHRcdFx0XHRcdFx0dHlwZTpcInRleHRhcmVhXCIgXG5cdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0ZHVyYXRpb249e3thY3RpdmU6MX19XG5cblx0XHRcdFx0XHQvPiBcdFx0XG5cdFx0XHRcdCk7XG5cblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdENhbm9weTpmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0cmV0dXJuIChcdFx0XHRcdFx0XG5cdFx0XHRcdFx0PERvY3R5cGVGb3JtIFxuXHRcdFx0XHRcdFx0Y2xvc2U9e3RoaXMuY2xvc2V9XG5cdFx0XHRcdFx0XHRpdGVtQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxuXHRcdFx0XHRcdFx0Y3JlYXRlPXt0aGlzLmNyZWF0ZX1cblx0XHRcdFx0XHRcdGVkaXQ9e3RoaXMudXBkYXRlfVxuXHRcdFx0XHRcdFx0ZGVsZXRlPXt0aGlzLmRlbGV0ZX1cblx0XHRcdFx0XHRcdG1vZGU9e3RoaXMuc3RhdGUuZm9ybU1vZGV9XG5cdFx0XHRcdFx0XHRpdGVtPXtpdGVtfVxuXHRcdFx0XHRcdFx0aWQ9e3RoaXMucHJvcHMud29ya29yZGVyfVxuXG5cdFx0XHRcdFx0XHRkb2N0eXBlPVwiQ2Fub3B5XCJcblx0XHRcdFx0XHRcdHNlYXNvbj17e2FjdGl2ZToxfX1cblx0XHRcdFx0XHRcdG5vdGU9e3tcblx0XHRcdFx0XHRcdFx0YWN0aXZlOjEsXG5cdFx0XHRcdFx0XHRcdHR5cGU6XCJ0ZXh0YXJlYVwiIFxuXHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdHR5cGU9e3thY3RpdmU6MX19XG5cblx0XHRcdFx0XHQvPiBcdFx0XG5cdFx0XHRcdCk7XG5cblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFBydW5pbmc6ZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coXCJNT0RFXCIsIHRoaXMuc3RhdGUuZm9ybU1vZGUpO1xuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxEb2N0eXBlRm9ybSBcblx0XHRcdFx0XHRcdGNsb3NlPXt0aGlzLmNsb3NlfVxuXHRcdFx0XHRcdFx0aXRlbUNoYW5nZT17dGhpcy5vbkNoYW5nZX1cblx0XHRcdFx0XHRcdGNyZWF0ZT17dGhpcy5jcmVhdGV9XG5cdFx0XHRcdFx0XHRlZGl0PXt0aGlzLnVwZGF0ZX1cblx0XHRcdFx0XHRcdGRlbGV0ZT17dGhpcy5kZWxldGV9XG5cdFx0XHRcdFx0XHRtb2RlPXt0aGlzLnN0YXRlLmZvcm1Nb2RlfVxuXHRcdFx0XHRcdFx0aXRlbT17aXRlbX1cblx0XHRcdFx0XHRcdGlkPXt0aGlzLnByb3BzLndvcmtvcmRlcn1cblxuXHRcdFx0XHRcdFx0ZG9jdHlwZT1cIlBydW5pbmdcIlxuXHRcdFx0XHRcdFx0c2Vhc29uPXt7YWN0aXZlOjF9fVxuXHRcdFx0XHRcdFx0bm90ZT17e1xuXHRcdFx0XHRcdFx0XHRhY3RpdmU6MSxcblx0XHRcdFx0XHRcdFx0dHlwZTpcInRleHRhcmVhXCIgXG5cdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0dHlwZT17e2FjdGl2ZToxfX1cblx0XHRcdFx0XHRcdGJfbG9jaz17e2FjdGl2ZToxfX1cblx0XHRcdFx0XHRcdHJlbW92ZWQ9e3thY3RpdmU6MX19XG5cdFx0XHRcdFx0XHRwcmVfcHJ1bmU9e3thY3RpdmU6MX19XG5cdFx0XHRcdFx0XHR0YXBfcmVtb3ZlZD17e2FjdGl2ZToxfX1cblxuXHRcdFx0XHRcdC8+IFx0XHRcblx0XHRcdFx0KTtcblxuXHRcdFx0fS5iaW5kKHRoaXMpXG5cdFx0fTtcblx0XHQvL2NvbnNvbGUubG9nKFwiZ2V0IGZvcm0gY2FsbGVkXCIpO1xuXHRcdHJldHVybiBmb3Jtc09ialt0aGlzLnN0YXRlLmZvcm1TdGF0ZV0odGhpcy5zdGF0ZS5lZGl0SXRlbSk7XG4gIFx0fVxuXHRyZW5kZXIoKXtcblx0XHR2YXIgZmllbGRzU3ByYXk9W1x0XHRcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJidXR0b25cIixcblx0XHRcdFx0dHlwZTpcInN1Ym1pdFwiLFxuXHRcdFx0XHR2YWx1ZTpcIkNyZWF0ZSBTcHJheWluZyBFbnRyeVwiLFxuXHRcdFx0XHRjbGFzc05hbWU6XCJidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIsXG5cdFx0XHRcdG9uQ2xpY2s6dGhpcy5zdWJtaXRcblx0XHRcdH1cblx0XHRdXG5cdFx0dmFyIHRhc2tzPXRoaXMucmVuZGVyVGFza3MoKTtcblx0XHR2YXIgZm9ybT10aGlzLmdldEZvcm0oKTtcblx0XHR2YXIgbGFibGU9XCJDcmVhdGUgTmV3IFRhc2tcIjtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nJz5cblx0XHRcdHt0YXNrc31cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hlY2tib3ggcm93IGFkZGJ1dHRvblwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImVkaXRcIj4gXG5cdFx0XHRcdFx0PGJ1dHRvbiBcblx0XHRcdFx0XHRcdHR5cGU9XCJidXR0b25cIiBcblx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdCBpbmxpbmUtdGFza1wiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLm1vZGFsTmV3VGFza31cblx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLXBsdXMgXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPiBBZGQgVGFza1xuXHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8TW9kYWwgXG5cdFx0XHRcdFx0aWQ9e3RoaXMubW9kYWxJZH0gXG5cdFx0XHRcdFx0c3VibWl0VGV4dD1cIlN1Ym1pdFwiIFxuXHRcdFx0XHRcdHRpdGxlPXtsYWJsZX1cblx0XHRcdFx0XHRzdWJtaXQ9e2ZhbHNlfVxuXHRcdFx0XHRcdD5cblx0XHRcdFx0XHR7Zm9ybX1cblx0XHRcdFx0PC9Nb2RhbD5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuXG4iLCJpbXBvcnQgRm9ybSBmcm9tICcuLi91dGlscy9mb3JtcydcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N0eXBlRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLmNvbXBvbmVudFdpbGxVcGRhdGU9dGhpcy5jb21wb25lbnRXaWxsVXBkYXRlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5kb2N0eXBlVG9vbFVwZGF0ZT10aGlzLmRvY3R5cGVUb29sVXBkYXRlLmJpbmQodGhpcyk7XG5cblx0XHR0aGlzLnN1Ym1pdD10aGlzLnN1Ym1pdC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuc2F2ZT10aGlzLnNhdmUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmRlbGV0ZT10aGlzLmRlbGV0ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZG9jdHlwZVRvb2wgPSBuZXcgcHMuYXBpVG9vbCh7bmFtZTp0aGlzLnByb3BzLmRvY3R5cGV9LHtkb2N0eXBlOidEb2NUeXBlJ30sdGhpcy5kb2N0eXBlVG9vbFVwZGF0ZSx0aGlzLmZvcmNlVXBkYXRlKTtcblx0XHR0aGlzLnN0YXRlPXtpdGVtczp0aGlzLmRvY3R5cGVUb29sLml0ZW1zfTtcblx0XHQvL3RoaXMuZG9jdHlwZVRvb2wgPSBuZXcgcHMuYXBpVG9vbCh7bmFtZTp0aGlzLnByb3BzLmRvY3R5cGV9LHtkb2N0eXBlOidEb2NUeXBlJ30sdGhpcy5kb2N0eXBlVG9vbFVwZGF0ZSk7XG5cdH1cblx0Y29tcG9uZW50V2lsbFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSl7XG5cdFx0aWYodGhpcy5wcm9wcy5kb2N0eXBlICE9IG5leHRQcm9wcy5kb2N0eXBlKXtcblx0XHRcdHRoaXMuZG9jdHlwZVRvb2wgPSBuZXcgcHMuYXBpVG9vbCh7bmFtZTpuZXh0UHJvcHMuZG9jdHlwZX0se2RvY3R5cGU6J0RvY1R5cGUnfSx0aGlzLmRvY3R5cGVUb29sVXBkYXRlLHRoaXMuZm9yY2VVcGRhdGUpO1xuXHRcdH1cblx0fVxuXHRkb2N0eXBlVG9vbFVwZGF0ZSgpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe2l0ZW1zOnRoaXMuZG9jdHlwZVRvb2wuaXRlbXN9KVxuXHR9XG5cdHN1Ym1pdChlKXtcblx0XHQvL0ZPUk0gVkFMSURBVElPTlxuXHRcdC8vaWYodGhpcy5wcm9wcy5pdGVtLnZpbmV5YXJkPT1cIlwiIHx8dGhpcy5wcm9wcy5pdGVtLnNwcmF5X3R5cGU9PVwiXCIgfHwgKG1vbWVudCh0aGlzLnByb3BzLml0ZW0uZGF0ZSxcIk1NL0REL1lZWVlcIikuaXNWYWxpZCgpKSE9PXRydWUpe1xuXHRcdC8vXHRjb25zb2xlLmxvZyhcIm5vdCB2YWxpZFwiKTtcblx0XHQvL31lbHNle1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dGhpcy5wcm9wcy5jcmVhdGUodGhpcy5wcm9wcy5pdGVtLHRoaXMucHJvcHMuZG9jdHlwZSk7XG5cdFx0Ly99XG5cdH1cblx0c2F2ZShlKXtcblx0XHQvLyBpZih0aGlzLnByb3BzLml0ZW0udmluZXlhcmQ9PVwiXCIgfHx0aGlzLnByb3BzLml0ZW0uc3ByYXlfdHlwZT09XCJcIiB8fCAobW9tZW50KHRoaXMucHJvcHMuaXRlbS5kYXRlLFwiTU0vREQvWVlZWVwiKS5pc1ZhbGlkKCkpIT09dHJ1ZSl7XG5cdFx0Ly8gXHRjb25zb2xlLmxvZyhcIm5vdCB2YWxpZFwiKTtcblx0XHQvLyB9ZWxzZXtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRoaXMucHJvcHMuZWRpdCh0aGlzLnByb3BzLml0ZW0pO1xuXHRcdC8vIH1cblx0fVxuXHRkZWxldGUoZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMucHJvcHMuZGVsZXRlKHRoaXMucHJvcHMuaXRlbSk7XG5cdH1cblx0Y3JlYXRlRm9ybUpzb24oKXtcblx0XHR2YXIgY3JlYXRlSGlkZGVuPSh0aGlzLnByb3BzLm1vZGUhPVwiY3JlYXRlXCIpP1wiIGhpZGRlblwiOlwiIG5vcGVcIjtcblx0XHR2YXIgZWRpdEhpZGRlbj0odGhpcy5wcm9wcy5tb2RlIT1cImVkaXRcIik/XCIgaGlkZGVuXCI6XCIgbm9wZVwiO1xuXHRcdHZhciBmaWVsZHNKc29uPXRoaXMuc3RhdGUuaXRlbXNbMF0uZmllbGRzO1xuXHRcdHZhciBmaWVsZHM9W107XG5cdFx0dmFyIGZpZWxkT2JqZWN0PXtcblx0XHRcdExpbms6IGZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGZpZWxkOlwiYXV0b0NvbXBsZXRlXCIsXG5cdFx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdFx0Y29weVtpdGVtLmZpZWxkbmFtZV09ZS50YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRcdGxhYmxlOml0ZW0ubGFiZWwsXG5cdFx0XHRcdFx0dmFsdWU6Y29weVtpdGVtLmZpZWxkbmFtZV0sXG5cdFx0XHRcdFx0ZG9jdHlwZTppdGVtLm9wdGlvbnMsXG5cdFx0XHRcdFx0ZG9jdmFsdWU6XCJuYW1lXCJcblx0XHRcdFx0fVxuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0Q2hlY2s6IGZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGZpZWxkOlwiY2hlY2tcIixcblx0XHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0XHRjb3B5W2l0ZW0uZmllbGRuYW1lXT1lLnRhcmdldC5jaGVja2VkO1xuXHRcdFx0XHRcdFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0XHRsYWJsZTppdGVtLmxhYmVsLFxuXHRcdFx0XHRcdHZhbHVlOmNvcHlbaXRlbS5maWVsZG5hbWVdLFxuXHRcdFx0XHRcdGNsYXNzTmFtZTogXCJiaWctY2hlY2tib3hcIlxuXHRcdFx0XHR9XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRJbnQ6IGZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGZpZWxkOlwiaW5wdXRcIixcblx0XHRcdFx0XHR0eXBlOlwibnVtYmVyXCIsXG5cdFx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdFx0Y29weVtpdGVtLmZpZWxkbmFtZV09ZS50YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRcdHZhbHVlOmNvcHlbaXRlbS5maWVsZG5hbWVdLFxuXHRcdFx0XHRcdGxhYmxlOml0ZW0ubGFiZWxcblx0XHRcdFx0fTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFNlbGVjdDogZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdHZhciBvcHRpb25zPWl0ZW0ub3B0aW9ucy5zcGxpdCggXCJcXG5cIiApO1xuXHRcdFx0XHQvLyBpZihjb3B5W2l0ZW0uZmllbGRuYW1lXSE9XCJcIil7XG5cdFx0XHRcdC8vIFx0Y29weVtpdGVtLmZpZWxkbmFtZV09b3B0aW9uc1swXTtcblx0XHRcdFx0Ly8gXHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHRcdC8vIH1cblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRmaWVsZDpcInNlbGVjdFwiLFxuXHRcdFx0XHRcdHR5cGU6XCJudW1iZXJcIixcblx0XHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0XHRjb3B5W2l0ZW0uZmllbGRuYW1lXT1lLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdFx0bGFibGU6aXRlbS5sYWJlbCxcblx0XHRcdFx0XHR2YWx1ZTpjb3B5W2l0ZW0uZmllbGRuYW1lXSxcblx0XHRcdFx0XHRvcHRpb25zOm9wdGlvbnNcblx0XHRcdFx0fTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdERhdGE6IGZ1bmN0aW9uKGl0ZW0scHJvcE9wdGlvbnMpe1xuXHRcdFx0XHRpZihwcm9wT3B0aW9ucy50eXBlPT1cInRleHRhcmVhXCIpe1xuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRmaWVsZDpcInRleHRhcmVhXCIsXG5cdFx0XHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0XHRcdGNvcHlbaXRlbS5maWVsZG5hbWVdPWUudGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdFx0XHR2YWx1ZTpjb3B5W2l0ZW0uZmllbGRuYW1lXSxcblx0XHRcdFx0XHRcdGxhYmxlOml0ZW0ubGFiZWxcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdGZpZWxkOlwiaW5wdXRcIixcblx0XHRcdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRcdFx0Y29weVtpdGVtLmZpZWxkbmFtZV09ZS50YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0XHRcdHZhbHVlOmNvcHlbaXRlbS5maWVsZG5hbWVdLFxuXHRcdFx0XHRcdFx0bGFibGU6aXRlbS5sYWJlbFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdERhdGU6IGZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGZpZWxkOlwiZGF0ZVwiLFxuXHRcdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRcdGNvcHlbaXRlbS5maWVsZG5hbWVdPWUudGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0XHRsYWJsZTppdGVtLmxhYmVsXG5cdFx0XHRcdH1cblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHR9XG5cblx0XHRpZih0aGlzLnByb3BzLml0ZW09PW51bGwpe1xuXHRcdFx0dmFyIGNvcHk9e31cblx0XHR9ZWxzZXtcblx0XHRcdHZhciBjb3B5PXBzLmNsb25lKHRoaXMucHJvcHMuaXRlbSk7XG5cdFx0fVxuXG5cdFx0Ly9sb29wIHRoZSBqc29uIG9iamVjdFxuXHRcdC8vcHJvYmFibHkgY2hhbmdlIHRoaXMgdG8gd2lsbE1vdW50XG5cdFx0Y29uc29sZS5sb2coZmllbGRzSnNvbik7XG5cblx0XHRmb3IodmFyIHggPSAwOyB4IDwgZmllbGRzSnNvbi5sZW5ndGg7IHgrKyl7XG5cdFx0XHR2YXIgY3VycmVudEZpZWxkPWZpZWxkc0pzb25beF07XG5cdFx0XHRjb25zb2xlLmxvZyhjdXJyZW50RmllbGQuZmllbGRuYW1lKTtcblx0XHRcdC8vIGNoZWNrIGlmIHRoaXMgZmllbGQgd2FzIGVuYWJsZWRcblxuXHRcdFx0aWYgKHRoaXMucHJvcHNbY3VycmVudEZpZWxkLmZpZWxkbmFtZV0pe1xuXHRcdFx0XHQvL3RoZXJlIGlzIGEgcHJvcHMgZm9yIHRoaXMgZmllbGRcblxuXHRcdFx0XHRpZih0aGlzLnByb3BzW2N1cnJlbnRGaWVsZC5maWVsZG5hbWVdLmFjdGl2ZSA9PT0gMSl7XG5cdFx0XHRcdFx0Ly9hbmQgdGhlIGZpZWxkIGlzIHNldCB0byBhY3RpdmVcblxuXHRcdFx0XHRcdGlmKGZpZWxkT2JqZWN0W2N1cnJlbnRGaWVsZC5maWVsZHR5cGVdKXtcblx0XHRcdFx0XHRcdC8vRmVpbGQgdHlwZSBjYW4gYmUgaGFuZGxlZD9cblx0XHRcdFx0XHRcdC8vaGFuZGxlIHRoZSBjcmVhdGlvbiBvZiBjb3B5IGFuZCB0aGUgZGVmYXVsdCB2YWx1ZXNcblxuXHRcdFx0XHRcdFx0aWYodGhpcy5wcm9wcy5tb2RlPT1cImNyZWF0ZVwiKXtcblx0XHRcdFx0XHRcdFx0aWYoY29weVtjdXJyZW50RmllbGQuZmllbGRuYW1lXSl7XG5cdFx0XHRcdFx0XHRcdFx0Ly90aGUgZmllbGQgYWxyZWFkeSBleGlzdHNcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRlbHNlIGlmKHRoaXMucHJvcHNbY3VycmVudEZpZWxkLmZpZWxkbmFtZV0uZGVmYXVsdCl7XG5cdFx0XHRcdFx0XHRcdFx0Ly9zZXQgdG8gZGVmYXVsdCB2YWx1ZVxuXHRcdFx0XHRcdFx0XHRcdGNvcHlbY3VycmVudEZpZWxkLmZpZWxkbmFtZV09dGhpcy5wcm9wc1tjdXJyZW50RmllbGQuZmllbGRuYW1lXS5kZWZhdWx0O1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0XHRcdFx0Y29weVtjdXJyZW50RmllbGQuZmllbGRuYW1lXT1cIlwiO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKGN1cnJlbnRGaWVsZC5maWVsZG5hbWUpO1xuXHRcdFx0XHRcdFx0ZmllbGRzLnB1c2goZmllbGRPYmplY3RbY3VycmVudEZpZWxkLmZpZWxkdHlwZV0oY3VycmVudEZpZWxkLHRoaXMucHJvcHNbY3VycmVudEZpZWxkLmZpZWxkbmFtZV0pKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoIShcImRvY3R5cGVcIiBpbiBjb3B5KSl7XG5cdFx0XHRjb3B5LmRvY3R5cGU9dGhpcy5wcm9wcy5kb2N0eXBlO1xuXHRcdH1cblx0XHQvL2FkZGluZyBidXR0b24gZmVpbGRzXG5cdFx0aWYodGhpcy5wcm9wcy5jbG9zZSl7XG5cdFx0XHRmaWVsZHMucHVzaCh7XG5cdFx0XHRcdGZpZWxkOlwiYnV0dG9uXCIsXG5cdFx0XHRcdHR5cGU6XCJzdWJtaXRcIixcblx0XHRcdFx0dmFsdWU6XCJDcmVhdGUgXCIgKyB0aGlzLnByb3BzLmRvY3R5cGUgKyBcIiBFbnRyeVwiLFxuXHRcdFx0XHRjbGFzc05hbWU6XCJidG4tcHJpbWFyeSBwdWxsLXJpZ2h0IFwiICsgY3JlYXRlSGlkZGVuLFxuXHRcdFx0XHRvbkNsaWNrOnRoaXMuc3VibWl0XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0aWYodGhpcy5wcm9wcy5jcmVhdGUpe1xuXHRcdFx0ZmllbGRzLnB1c2goe1xuXHRcdFx0XHRcdGZpZWxkOlwiYnV0dG9uXCIsXG5cdFx0XHRcdFx0dmFsdWU6XCJDbG9zZVwiLFxuXHRcdFx0XHRcdGNsYXNzTmFtZTpcInB1bGwtcmlnaHQgXCIrIGVkaXRIaWRkZW4sXG5cdFx0XHRcdFx0b25DbGljazpmdW5jdGlvbihlKXsgZS5wcmV2ZW50RGVmYXVsdCgpO3RoaXMucHJvcHMuY2xvc2UoKTt9LmJpbmQodGhpcylcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRpZih0aGlzLnByb3BzLmRlbGV0ZSl7XG5cdFx0XHRmaWVsZHMucHVzaCh7XG5cdFx0XHRcdFx0ZmllbGQ6XCJidXR0b25cIixcblx0XHRcdFx0XHR0eXBlOlwic3VibWl0XCIsXG5cdFx0XHRcdFx0dmFsdWU6XCJEZWxldGVcIixcblx0XHRcdFx0XHRjbGFzc05hbWU6XCJidG4tZGFuZ2VyIHB1bGwtcmlnaHQgXCIrIGVkaXRIaWRkZW4sXG5cdFx0XHRcdFx0b25DbGljazp0aGlzLmRlbGV0ZVxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGZpZWxkcy5wdXNoKFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImJ1dHRvblwiLFxuXHRcdFx0XHR0eXBlOlwic3VibWl0XCIsXG5cdFx0XHRcdHZhbHVlOlwiU2F2ZVwiLFxuXHRcdFx0XHRjbGFzc05hbWU6XCJidG4tc3VjY2VzcyBwdWxsLXJpZ2h0IFwiKyBlZGl0SGlkZGVuLFxuXHRcdFx0XHRvbkNsaWNrOnRoaXMuc2F2ZVxuXHRcdFx0fSk7XG5cdFx0cmV0dXJuIGZpZWxkcztcblx0fVxuXHRyZW5kZXIoKXtcblx0XHRjb25zb2xlLmxvZyhcInJlbmRlciBhcmVhXCIpO1xuXHRcdHZhciBvdXRwdXQ9e307XG5cdFx0aWYodGhpcy5zdGF0ZS5pdGVtcyE9PW51bGwpe1xuXHRcdFx0dmFyIGZpZWxkcz10aGlzLmNyZWF0ZUZvcm1Kc29uKCk7XG5cdFx0XHRjb25zb2xlLmxvZyhmaWVsZHMpO1xuXHRcdFx0dmFyIG91dHB1dCA9IChcblx0XHRcdFx0PEZvcm1cblx0XHRcdFx0XHRpZD17dGhpcy5wcm9wcy5pZH1cblx0XHRcdFx0XHR0eXBlPVwiaG9yaXpvbnRhbFwiXG5cdFx0XHRcdFx0ZmllbGRzPXtmaWVsZHN9XG5cdFx0XHRcdC8+KTtcblx0XHR9ZWxzZXtcblx0XHRcdG91dHB1dCA9ICg8ZGl2PiBMb2FkaW5nLi4uIDwvZGl2Pik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+e1wiSE9SRVwifVxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuIiwiLyogZm9ybXMgKi9cbi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuc3VibWl0PXRoaXMuc3VibWl0LmJpbmQodGhpcyk7XG5cdH1cblx0c3VibWl0KGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR0aGlzLnByb3BzLnN1Ym1pdChlKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR2YXIgZm9ybT1bXTtcblx0XHR2YXIgZm9ybVR5cGVzPXtcblx0XHRcdHNlbGVjdFx0OiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0dmFyIG9wdGluYWw9W1widmFsdWVcIixcImxhYmxlXCIsXCJvcHRpb25zXCIsXCJjbGFzc05hbWVcIixcInJlYWRvbmx5XCIsXCJkaXNhYmxlZFwiLFwicmVxdWlyZVwiXTtcblx0XHRcdFx0dmFyIHByb3BzPXBzLmluaXRQcm9wcyhvcHRpbmFsLGl0ZW0pO1xuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxTZWxlY3Rcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH1cblx0XHRcdFx0XHRcdHZhbHVlPXtwcm9wcy52YWx1ZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17cHJvcHMuY2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0bGFibGU9e3Byb3BzLmxhYmxlfVxuXHRcdFx0XHRcdFx0b3B0aW9ucz17cHJvcHMub3B0aW9uc31cblx0XHRcdFx0XHRcdHJlYWRvbmx5PXtwcm9wcy5yZWFkb25seX1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXtwcm9wcy5kaXNhYmxlZH1cblx0XHRcdFx0XHRcdHJlcXVpcmVkPXtwcm9wcy5yZXF1aXJlZH1cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKTt9fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRjaGVjayA6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHR2YXIgcHJvcHM9W1widmFsdWVcIixcImxhYmxlXCIsXCJjbGFzc05hbWVcIixcInJlYWRvbmx5XCIsXCJkaXNhYmxlZFwiLFwicmVxdWlyZVwiLFwidmFsdWVcIl07XG5cdFx0XHRcdHByb3BzPXBzLmluaXRQcm9wcyhwcm9wcyxpdGVtKTtcblxuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxDaGVja1xuXHRcdFx0XHRcdFx0a2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fVxuXHRcdFx0XHRcdFx0dmFsdWU9e3Byb3BzLnZhbHVlfVxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXtwcm9wcy5jbGFzc05hbWV9XG5cdFx0XHRcdFx0XHRsYWJsZT17cHJvcHMubGFibGV9XG5cdFx0XHRcdFx0XHRyZWFkT25seT17cHJvcHMucmVhZG9ubHl9XG5cdFx0XHRcdFx0XHRkaXNhYmxlZD17cHJvcHMuZGlzYWJsZWR9XG5cdFx0XHRcdFx0XHRyZXF1aXJlZD17cHJvcHMucmVxdWlyZWR9XG5cdFx0XHRcdFx0XHRpbnB1dENoYW5nZWQ9e2Z1bmN0aW9uKGUpe2l0ZW0ub25DaGFuZ2UoZSk7fX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXG5cdFx0XHR0ZXh0YXJlYSA6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHR2YXIgcHJvcHM9W1widmFsdWVcIixcImxhYmxlXCIsXCJjbGFzc05hbWVcIixcInJlYWRvbmx5XCIsXCJkaXNhYmxlZFwiLFwicmVxdWlyZVwiLFwidmFsdWVcIixcInJvd3NcIl07XG5cdFx0XHRcdHByb3BzPXBzLmluaXRQcm9wcyhwcm9wcyxpdGVtKTtcblxuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxUZXh0YXJlYVxuXHRcdFx0XHRcdFx0a2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fVxuXHRcdFx0XHRcdFx0dmFsdWU9e3Byb3BzLnZhbHVlfVxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXtwcm9wcy5jbGFzc05hbWV9XG5cdFx0XHRcdFx0XHRsYWJsZT17cHJvcHMubGFibGV9XG5cdFx0XHRcdFx0XHRyZWFkT25seT17cHJvcHMucmVhZG9ubHl9XG5cdFx0XHRcdFx0XHRkaXNhYmxlZD17cHJvcHMuZGlzYWJsZWR9XG5cdFx0XHRcdFx0XHRyZXF1aXJlZD17cHJvcHMucmVxdWlyZWR9XG5cdFx0XHRcdFx0XHRyb3dzPXtwcm9wcy5yb3dzfVxuXHRcdFx0XHRcdFx0aW5wdXRDaGFuZ2VkPXtmdW5jdGlvbihlKXtpdGVtLm9uQ2hhbmdlKGUpO319XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGlucHV0IFx0OiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0dmFyIHByb3BzPVtcInR5cGVcIixcInZhbHVlXCIsXCJwbGFjZWhvbGRlclwiLFwibGFibGVcIixcImNsYXNzTmFtZVwiLFwicmVhZG9ubHlcIixcImRpc2FibGVkXCIsXCJyZXF1aXJlZFwiLFwiZXJyb3JcIl07XG5cdFx0XHRcdHByb3BzPXBzLmluaXRQcm9wcyhwcm9wcyxpdGVtKTtcblx0XHRcdFx0aWYocHJvcHMudHlwZT09XCJcIil7XG5cdFx0XHRcdFx0cHJvcHMudHlwZT1cInRleHRcIjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PElucHV0XG5cdFx0XHRcdFx0XHRrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9XG5cdFx0XHRcdFx0XHR0eXBlPXtwcm9wcy50eXBlfVxuXHRcdFx0XHRcdFx0dmFsdWU9e3Byb3BzLnZhbHVlfVxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9e3Byb3BzLnBsYWNlaG9sZGVyfVxuXHRcdFx0XHRcdFx0bGFibGU9e3Byb3BzLmxhYmxlfVxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXtwcm9wcy5jbGFzc05hbWV9XG5cdFx0XHRcdFx0XHRyZWFkb25seT17cHJvcHMucmVhZG9ubHl9XG5cdFx0XHRcdFx0XHRkaXNhYmxlZD17cHJvcHMuZGlzYWJsZWR9XG5cdFx0XHRcdFx0XHRyZXF1aXJlZD17cHJvcHMucmVxdWlyZWR9XG5cdFx0XHRcdFx0XHRlcnJvcj17cHJvcHMuZXJyb3J9XG5cdFx0XHRcdFx0XHRpbnB1dENoYW5nZWQ9e2Z1bmN0aW9uKGUpe2l0ZW0ub25DaGFuZ2UoZSl9fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRsYWJsZSBcdDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHJldHVybiAoXG4gICAgXHRcdFx0XHQ8bGFiZWwga2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fSA+e2l0ZW0ubGFibGV9PC9sYWJlbD5cblxuICAgIFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRyYWRpb1x0OiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0cmV0dXJuICg8ZGl2PjwvZGl2Pik7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRoZWFkZXI6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHRyZXR1cm4oPGgzIGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH0gPntpdGVtLmxhYmxlfTwvaDM+KVxuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0ZGF0ZTogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IChpdGVtLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS52YWx1ZTtcblx0XHRcdFx0dmFyIGxhYmxlID0gKGl0ZW0ubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmxhYmxlO1xuXHRcdFx0XHR2YXIgcGxhY2Vob2xkZXIgPSAoaXRlbS5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucGxhY2Vob2xkZXI7XG5cdFx0XHRcdHZhciBjbGFzc05hbWUgPSAoaXRlbS5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmNsYXNzTmFtZTtcblx0XHRcdFx0dmFyIHJlYWRvbmx5ID0gKGl0ZW0ucmVhZG9ubHkgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnJlYWRvbmx5O1xuXHRcdFx0XHR2YXIgZGlzYWJsZWQgPSAoaXRlbS5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uZGlzYWJsZWQ7XG5cdFx0XHRcdHZhciByZXF1aXJlZCA9IChpdGVtLnJlcXVpcmVkID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5yZXF1aXJlZDtcblx0XHRcdFx0cmV0dXJuKFxuXHRcdFx0XHRcdDxEYXRlSW5wdXRcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH1cblx0XHRcdFx0XHRcdHZhbHVlPXt2YWx1ZX1cblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cblx0XHRcdFx0XHRcdGxhYmxlPXtsYWJsZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0aW5wdXRDaGFuZ2VkPXtmdW5jdGlvbihlKXtpdGVtLm9uQ2hhbmdlKGUpfX1cblx0XHRcdFx0XHRcdHJlYWRvbmx5PXtyZWFkb25seX1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXtkaXNhYmxlZH1cblx0XHRcdFx0XHRcdHJlcXVpcmVkPXtyZXF1aXJlZH1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0YXV0b0NvbXBsZXRlOiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0dmFyIHZhbHVlID0gKGl0ZW0udmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnZhbHVlO1xuXHRcdFx0XHR2YXIgbGFibGUgPSAoaXRlbS5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ubGFibGU7XG5cdFx0XHRcdHZhciBwbGFjZWhvbGRlciA9IChpdGVtLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5wbGFjZWhvbGRlcjtcblx0XHRcdFx0dmFyIGNsYXNzTmFtZSA9IChpdGVtLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uY2xhc3NOYW1lO1xuXHRcdFx0XHR2YXIgcmVhZG9ubHkgPSAoaXRlbS5yZWFkb25seSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucmVhZG9ubHk7XG5cdFx0XHRcdHZhciBkaXNhYmxlZCA9IChpdGVtLmRpc2FibGVkID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5kaXNhYmxlZDtcblx0XHRcdFx0dmFyIHJlcXVpcmVkID0gKGl0ZW0ucmVxdWlyZWQgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnJlcXVpcmVkO1xuXG5cdFx0XHRcdHJldHVybihcblx0XHRcdFx0XHQ8QXdlc29tcGxldGVJbnB1dFxuXHRcdFx0XHRcdFx0a2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fVxuXHRcdFx0XHRcdFx0ZG9jdHlwZT17aXRlbS5kb2N0eXBlfVxuXHRcdFx0XHRcdFx0ZG9jdmFsdWU9e2l0ZW0uZG9jdmFsdWV9XG5cdFx0XHRcdFx0XHRkb2NsYWJsZT17aXRlbS5kb2NsYWJsZX1cblx0XHRcdFx0XHRcdHZhbHVlPXt2YWx1ZX1cblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cblx0XHRcdFx0XHRcdGxhYmxlPXtsYWJsZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0cmVhZG9ubHk9e3JlYWRvbmx5fVxuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ9e2Rpc2FibGVkfVxuXHRcdFx0XHRcdFx0cmVxdWlyZWQ9e3JlcXVpcmVkfVxuXHRcdFx0XHRcdFx0aW5wdXRDaGFuZ2VkPXtmdW5jdGlvbihlKXtpdGVtLm9uQ2hhbmdlKGUpfX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0YnV0dG9uOiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0dmFyIG9wdGluYWw9W1widmFsdWVcIixcImNsYXNzTmFtZVwiLFwiZGlzYWJsZWRcIixcImljb25cIl07XG5cdFx0XHRcdHZhciBwcm9wcz1wcy5pbml0UHJvcHMob3B0aW5hbCxpdGVtKTtcblx0XHRcdFx0cmV0dXJuKFxuXHRcdFx0XHRcdDxCdXR0b25cblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH1cblx0XHRcdFx0XHRcdHZhbHVlPXtwcm9wcy52YWx1ZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17cHJvcHMuY2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ9e3Byb3BzLmRpc2FibGVkfVxuXHRcdFx0XHRcdFx0aWNvbj17cHJvcHMuaWNvbn1cblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2Z1bmN0aW9uKGUpe2l0ZW0ub25DbGljayhlKX19XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKVxuXHRcdH1cblx0XHR0aGlzLnByb3BzLmZpZWxkcy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXHRcdFx0aWYoJC5pc0VtcHR5T2JqZWN0KGl0ZW0pKXtcblxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGlmKHRoaXMucHJvcHMudHlwZT09XCJpbmxpbmVcIil7XG5cdFx0XHRcdFx0dmFyIHJvd0NsYXNzPTEyL3RoaXMucHJvcHMucm93cztcblx0XHRcdFx0XHRyb3dDbGFzcz1cImNvbC14cy1cIityb3dDbGFzcztcblx0XHRcdFx0XHRmb3JtLnB1c2goPGRpdiBjbGFzc05hbWU9e3Jvd0NsYXNzfT57Zm9ybVR5cGVzW2l0ZW0uZmllbGRdKGl0ZW0saW5kZXgpfTwvZGl2Pik7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZXtmb3JtLnB1c2goPGRpdiBjbGFzc05hbWU9e3Jvd0NsYXNzfT57Zm9ybVR5cGVzW2l0ZW0uZmllbGRdKGl0ZW0saW5kZXgpfTwvZGl2Pik7fVxuXHRcdFx0fVxuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0Ly9mb3IodmFyIHg9MDsgeCA8IHRoaXMucHJvcHMuZmVpbGRzLmxlbmd0aCB4Kys7IClcblx0XHR2YXIgY2xhc3NOYW1lID0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJyZWFjdC1mb3JtXCI6IFwicmVhY3QtZm9ybSBcIit0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8Zm9ybSBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG5cdFx0XHRcdDxmaWVsZHNldD5cblx0XHRcdFx0e3RoaXMucHJvcHMuYmVmb3JlfVxuXHRcdFx0XHR7Zm9ybX1cblx0XHRcdFx0eyB0aGlzLnByb3BzLmNoaWxkcmVufVxuXHRcdFx0XHQ8L2ZpZWxkc2V0PlxuXHRcdFx0PC9mb3JtPlxuXHRcdCk7XG5cdH1cbn1cblxuXG5cbmV4cG9ydCBjbGFzcyBTZWxlY3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5pbnB1dENoYW5nZT10aGlzLmlucHV0Q2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblxuXHR9XG5cdGlucHV0Q2hhbmdlKGUpe1xuXHRcdHRoaXMucHJvcHMuaW5wdXRDaGFuZ2VkKCk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLmxhYmxlID0gKHRoaXMucHJvcHMubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLmxhYmxlO1xuXHRcdHRoaXMub3B0aW9ucyA9ICh0aGlzLnByb3BzLm9wdGlvbnMgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLm9wdGlvbnM7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jb250cm9sXCI6IFwiZm9ybS1jb250cm9sXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlcXVpcmVkID0gKHRoaXMucHJvcHMucmVxdWlyZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZXF1aXJlZD09ZmFsc2V8fHRoaXMucHJvcHMucmVxdWlyZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZWFkb25seSA9ICh0aGlzLnByb3BzLnJlYWRvbmx5ID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVhZG9ubHk9PWZhbHNlfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHZhciBvcHRpb25zPVtdO1xuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblxuXG5cdFx0dGhpcy5vcHRpb25zLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCl7XG5cdFx0XHR2YXIgZ3JvdXA9W107XG5cdFx0XHRpZihpdGVtLmdyb3VwICE9PSB1bmRlZmluZWQpe1xuXHRcdFx0XHRpdGVtLm9wdGlvbnMubWFwKGZ1bmN0aW9uKGlubmVySXRlbSxpbmRleCl7XG5cdFx0XHRcdFx0Z3JvdXAucHVzaCggPG9wdGlvbiBrZXk9e2l0ZW0uZ3JvdXAraW5kZXh9IHZhbHVlPXtpbm5lckl0ZW19PiB7aW5uZXJJdGVtfSA8L29wdGlvbj4pXG5cdFx0XHRcdH0pXG5cdFx0XHRcdG9wdGlvbnMucHVzaCg8b3B0Z3JvdXAga2V5PXtpdGVtLmdyb3VwfSBsYWJlbD17aXRlbS5ncm91cH0+IHtncm91cH08L29wdGdyb3VwPik7XG5cblx0XHRcdH1cblx0XHRcdGVsc2V7XG5cdFx0XHRcdG9wdGlvbnMucHVzaCggPG9wdGlvbiBrZXk9e2luZGV4fSB2YWx1ZT17aXRlbX0+IHtpdGVtfSA8L29wdGlvbj4pXG5cdFx0XHR9XG5cblxuXHRcdH0uYmluZCh0aGlzKSk7XG5cblx0XHR2YXIgc2VsZWN0PShcblx0XHRcdDxzZWxlY3Rcblx0XHRcdFx0Y2xhc3NOYW1lPXt0aGlzLmNsYXNzTmFtZX1cblx0XHRcdFx0dmFsdWU9e3RoaXMudmFsdWV9XG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnByb3BzLmlucHV0Q2hhbmdlZH1cblx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdCAgICAgICAgICBcdHJlYWRPbmx5PXt0aGlzLnJlYWRvbmx5fVxuXHQgICAgICAgICAgXHRyZXF1aXJlZD17dGhpcy5yZXF1aXJlZH1cblx0XHRcdFx0PlxuXHRcdFx0XHR7b3B0aW9uc31cblx0XHRcdDwvc2VsZWN0PlxuXHRcdCk7XG5cblx0XHR2YXIgbGFibGU9XCJcIjtcblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMucHJvcHMubGFibGUgIT09IFwiXCIpe1xuXHRcdFx0bGFibGU9KDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD4pO1xuXHRcdH1cblx0XHRvdXRwdXQgPSAoPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+e2xhYmxlfXtzZWxlY3R9PC9kaXY+KTtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5pbnB1dENoYW5nZT10aGlzLmlucHV0Q2hhbmdlLmJpbmQodGhpcyk7XG5cblx0fVxuXHRpbnB1dENoYW5nZShlKXtcblx0XHR0aGlzLnByb3BzLmlucHV0Q2hhbmdlZChlKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnR5cGUgPSAodGhpcy5wcm9wcy50eXBlID09PSB1bmRlZmluZWQpID8gXCJ0ZXh0XCI6IHRoaXMucHJvcHMudHlwZTtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMucGxhY2Vob2xkZXIgPSAodGhpcy5wcm9wcy5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXI7XG5cdFx0dGhpcy5sYWJsZSA9ICh0aGlzLnByb3BzLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5sYWJsZTtcblx0XHR2YXIgb3V0cHV0PVwiXCI7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jb250cm9sXCI6IFwiZm9ybS1jb250cm9sIFwiICt0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHR0aGlzLmRpc2FibGVkID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5kaXNhYmxlZD09ZmFsc2V8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZXF1aXJlZCA9ICh0aGlzLnByb3BzLnJlcXVpcmVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVxdWlyZWQ9PWZhbHNlfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVhZG9ubHkgPSAodGhpcy5wcm9wcy5yZWFkb25seSA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1mYWxzZXx8dGhpcy5wcm9wcy5yZWFkb25seT09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblxuXHRcdHZhciBpbnB1dD0oXG5cdFx0XHQ8aW5wdXRcblx0XHRcdFx0dHlwZT17dGhpcy50eXBlfVxuXHRcdFx0XHRjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfVxuXHRcdFx0XHRwbGFjZWhvbGRlcj17dGhpcy5wbGFjZWhvbGRlcn1cblx0XHRcdFx0dmFsdWU9e3RoaXMudmFsdWV9XG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnByb3BzLmlucHV0Q2hhbmdlZH1cblx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdCAgICAgICAgICBcdHJlYWRPbmx5PXt0aGlzLnJlYWRvbmx5fVxuXHQgICAgICAgICAgXHRyZXF1aXJlZD17dGhpcy5yZXF1aXJlZH1cblx0XHRcdC8+XG5cdFx0KTtcblx0XHR2YXIgd3JhcHBlckNsYXNzPVwiZm9ybS1ncm91cFwiO1xuXHRcdGlmKHRoaXMucHJvcHMuZXJyb3Ipe1xuXHRcdFx0XHR3cmFwcGVyQ2xhc3MrPSBcIiBcIitcImhhcy1lcnJvclwiO1xuXHRcdH1cblx0XHR2YXIgbGFibGU9XCJcIjtcblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMucHJvcHMubGFibGUgIT09IFwiXCIpe1xuXHRcdFx0bGFibGU9KDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD4pO1xuXHRcdH1cblx0XHRvdXRwdXQgPSAoPGRpdiBjbGFzc05hbWU9e3dyYXBwZXJDbGFzc30+e2xhYmxlfXtpbnB1dH08L2Rpdj4pO1xuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBDaGVjayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLmlucHV0Q2hhbmdlPXRoaXMuaW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcblxuXG5cdH1cblx0aW5wdXRDaGFuZ2UoZSl7XG5cblx0XHR0aGlzLnByb3BzLmlucHV0Q2hhbmdlZChlKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyAwIDogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLnBsYWNlaG9sZGVyID0gKHRoaXMucHJvcHMucGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnBsYWNlaG9sZGVyO1xuXHRcdHRoaXMubGFibGUgPSAodGhpcy5wcm9wcy5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMubGFibGU7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jaGVjay1pbnB1dFwiOiBcImZvcm0tY2hlY2staW5wdXQgXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlcXVpcmVkID0gKHRoaXMucHJvcHMucmVxdWlyZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZXF1aXJlZD09ZmFsc2V8fHRoaXMucHJvcHMucmVxdWlyZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZWFkb25seSA9ICh0aGlzLnByb3BzLnJlYWRvbmx5ID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVhZG9ubHk9PWZhbHNlfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXG5cdFx0dmFyIG91dHB1dD1cIlwiO1xuXHRcdHZhciBpbnB1dD0oXG5cdFx0XHQ8aW5wdXRcblx0XHRcdFx0dHlwZT1cImNoZWNrYm94XCJcblx0XHRcdFx0Y2xhc3NOYW1lPXt0aGlzLmNsYXNzTmFtZX1cblx0XHRcdFx0Y2hlY2tlZD17dGhpcy52YWx1ZX1cblxuXHRcdFx0XHRvbkNoYW5nZT17dGhpcy5wcm9wcy5pbnB1dENoYW5nZWR9XG5cdFx0XHRcdGRpc2FibGVkPXt0aGlzLmRpc2FibGVkfVxuXHQgICAgICAgICAgXHRyZWFkT25seT17dGhpcy5yZWFkb25seX1cblx0ICAgICAgICAgIFx0cmVxdWlyZWQ9e3RoaXMucmVxdWlyZWR9XG5cdFx0XHQvPlxuXHRcdCk7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkIHx8IHRoaXMucHJvcHMubGFibGUgPT1cIlwiKXtcblx0XHRcdG91dHB1dCA9IChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdCAgICBcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWxcIj5cblx0XHQgICAgICBcdFx0XHR7aW5wdXR9e3RoaXMucHJvcHMubGFibGV9XG5cdFx0ICAgICAgXHRcdDwvbGFiZWw+XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHQgICAgICBcdFx0e2lucHV0fVxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuZXhwb3J0IGNsYXNzIFRleHRhcmVhIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuaW5wdXRDaGFuZ2U9dGhpcy5pbnB1dENoYW5nZS5iaW5kKHRoaXMpO1xuXG5cdH1cblx0aW5wdXRDaGFuZ2UoZSl7XG5cdFx0dGhpcy5wcm9wcy5pbnB1dENoYW5nZWQoZSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gMCA6IHRoaXMucHJvcHMudmFsdWU7XG5cdFx0dGhpcy5wbGFjZWhvbGRlciA9ICh0aGlzLnByb3BzLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5wbGFjZWhvbGRlcjtcblx0XHR0aGlzLmxhYmxlID0gKHRoaXMucHJvcHMubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLmxhYmxlO1xuXHRcdHRoaXMuY2xhc3NOYW1lPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcImZvcm0tY29udHJvbFwiOiBcImZvcm0tY29udHJvbCBcIiArdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0dGhpcy5kaXNhYmxlZCA9ICh0aGlzLnByb3BzLmRpc2FibGVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PWZhbHNlfHx0aGlzLnByb3BzLmRpc2FibGVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVxdWlyZWQgPSAodGhpcy5wcm9wcy5yZXF1aXJlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1mYWxzZXx8dGhpcy5wcm9wcy5yZXF1aXJlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlYWRvbmx5ID0gKHRoaXMucHJvcHMucmVhZG9ubHkgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZWFkb25seT09ZmFsc2V8fHRoaXMucHJvcHMucmVhZG9ubHk9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yb3dzID0gKHRoaXMucHJvcHMucm93cyA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJvd3M9PVwiXCIpID8gMzogdGhpcy5wcm9wcy5yb3dzO1xuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblx0XHR2YXIgaW5wdXQ9KFxuXHRcdFx0PHRleHRhcmVhXG5cdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9XG5cdFx0XHRcdHZhbHVlPXt0aGlzLnZhbHVlfVxuXHRcdFx0XHRvbkNoYW5nZT17dGhpcy5wcm9wcy5pbnB1dENoYW5nZWR9XG5cdFx0XHRcdHJvd3M9e3RoaXMucm93c31cblx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdCAgICAgICAgICBcdHJlYWRPbmx5PXt0aGlzLnJlYWRvbmx5fVxuXHQgICAgICAgICAgXHRyZXF1aXJlZD17dGhpcy5yZXF1aXJlZH1cblx0XHRcdC8+XG5cdFx0KTtcblx0XHR2YXIgbGFibGU9XCJcIjtcblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMucHJvcHMubGFibGUgIT09IFwiXCIpe1xuXHRcdFx0bGFibGU9KDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD4pO1xuXHRcdH1cblx0XHRvdXRwdXQgPSAoPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+e2xhYmxlfXtpbnB1dH08L2Rpdj4pO1xuXHRcdHJldHVybihcblx0XHRcdDxkaXY+e291dHB1dH08L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5leHBvcnQgY2xhc3MgRGF0ZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuZGF0ZUluaXQ9dGhpcy5kYXRlSW5pdC5iaW5kKHRoaXMpO1xuXHR9XG5cdGRhdGVJbml0KCl7XG5cdFx0JCgnLmlucHV0LWdyb3VwLmRhdGUgLmRhdGVwaWNrJykuZGF0ZXBpY2tlcih7XG5cdFx0ICAgIHRvZGF5QnRuOiBcImxpbmtlZFwiLFxuXHRcdCAgICBvcmllbnRhdGlvbjogXCJib3R0b20gcmlnaHRcIixcblx0XHQgICAgYXV0b2Nsb3NlOiB0cnVlLFxuXHRcdCAgICB0b2RheUhpZ2hsaWdodDogdHJ1ZVxuXHRcdH0pLm9uKCdjaGFuZ2VEYXRlJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0dmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdpbnB1dCcsIHsgYnViYmxlczogdHJ1ZSB9KTtcblx0XHRcdGUudGFyZ2V0LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHRoaXMudmFsdWUgPSAodGhpcy5wcm9wcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMudmFsdWU7XG5cdFx0dGhpcy5wbGFjZWhvbGRlciA9ICh0aGlzLnByb3BzLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5wbGFjZWhvbGRlcjtcblx0XHR0aGlzLmxhYmxlID0gKHRoaXMucHJvcHMubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLmxhYmxlO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlcXVpcmVkID0gKHRoaXMucHJvcHMucmVxdWlyZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZXF1aXJlZD09ZmFsc2V8fHRoaXMucHJvcHMucmVxdWlyZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZWFkb25seSA9ICh0aGlzLnByb3BzLnJlYWRvbmx5ID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVhZG9ubHk9PWZhbHNlfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXG5cblx0XHR2YXIgb3V0cHV0PVwiXCI7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jb250cm9sIGRhdGVwaWNrXCI6IFwiZm9ybS1jb250cm9sIGRhdGVwaWNrIFwiICt0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHR2YXIgaW5wdXQ9KFxuXHRcdFx0PGlucHV0XG5cdFx0XHRcdHJlZj17dGhpcy5kYXRlSW5pdH1cblx0XHRcdFx0dHlwZT1cInRleHRcIlxuXHRcdFx0XHRjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfVxuXHRcdFx0XHRwbGFjZWhvbGRlcj17dGhpcy5wbGFjZWhvbGRlcn1cblx0XHRcdFx0dmFsdWU9e3RoaXMudmFsdWV9XG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnByb3BzLmlucHV0Q2hhbmdlZH1cblx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdCAgICAgICAgICBcdHJlYWRPbmx5PXt0aGlzLnJlYWRvbmx5fVxuXHQgICAgICAgICAgXHRyZXF1aXJlZD17dGhpcy5yZXF1aXJlZH1cblx0XHRcdFx0Lz5cblxuXHRcdCk7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkIHx8IHRoaXMucHJvcHMubGFibGUgPT1cIlwiKXtcblx0XHRcdG91dHB1dCA9IChcblx0XHQgIFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHQgIFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAgZGF0ZVwiPlxuXHRcdFx0XHRcdFx0e2lucHV0fVxuXHRcdFx0XHQgIFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cC1hZGRvblwiPlxuXHRcdFx0XHQgIFx0XHRcdDxpIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tdGhcIj48L2k+XG5cdFx0XHRcdCAgXHRcdDwvc3Bhbj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwIGRhdGVcIj5cblxuXHRcdFx0XHRcdFx0e2lucHV0fVxuXHRcdFx0XHQgIFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cC1hZGRvblwiPlxuXHRcdFx0XHQgIFx0XHRcdDxpIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tdGhcIj48L2k+XG5cdFx0XHRcdCAgXHRcdDwvc3Bhbj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuZXhwb3J0IGNsYXNzIEF3ZXNvbXBsZXRlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cblx0XHQvKiAgIERvIHRoZSBiaW5kIHRoaW5nICAqL1xuXHRcdHRoaXMuY3JlYXRlTGlzdD10aGlzLmNyZWF0ZUxpc3QuYmluZCh0aGlzKTtcblx0XHR0aGlzLmRvY0NoYW5nZWQ9dGhpcy5kb2NDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jb21wb25lbnREaWRNb3VudD10aGlzLmNvbXBvbmVudERpZE1vdW50LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5pbnB1dENoYW5nZT10aGlzLmlucHV0Q2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5hdXRvY29tcGxldGU9dGhpcy5hdXRvY29tcGxldGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmNvbXBvbmVudFdpbGxVbm1vdW50PXRoaXMuY29tcG9uZW50V2lsbFVubW91bnQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnJlZkNhbGw9dGhpcy5yZWZDYWxsLmJpbmQodGhpcyk7XG5cblx0XHQvL3RoaXMud29ya29yZGVyT2JqPXRoaXMub25TdGF0dXNDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0LyogICAgICAgICAgZW5kICAgICAgICAgICovXG5cdFx0dGhpcy5pdGVtbGlzdD1bXTtcblx0XHR0aGlzLnN0YXRlPXtpdGVtbGlzdDpbXX07XG5cdFx0dGhpcy5faXNNb3VudGVkPWZhbHNlO1xuXHRcdHZhciBhcmdzPXt9O1xuXHRcdHZhciBvcHRpb25zPXtkb2N0eXBlOnRoaXMucHJvcHMuZG9jdHlwZX07XG5cdFx0dmFyIGZpbHRlcj17fTtcblx0XHRpZiAodGhpcy5wcm9wcy5maWx0ZXI9PXVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLmZpbHRlcj09bnVsbCl7XG5cblx0XHR9ZWxzZXtcblx0XHRcdGZpbHRlcj0gdGhpcy5wcm9wcy5maWx0ZXI7XG5cdFx0fVxuXHRcdHRoaXMubGlzdFRvb2wgPSBuZXcgcHMuYXBpVG9vbChmaWx0ZXIsIG9wdGlvbnMgLHRoaXMuZG9jQ2hhbmdlZCk7XG5cdFx0aWYgKHRoaXMubGlzdFRvb2wuaXRlbXM9PT11bmRlZmluZWQgfHx0aGlzLmxpc3RUb29sLml0ZW1zPT09IDAgfHx0aGlzLmxpc3RUb29sLml0ZW1zPT09bnVsbCApe1xuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5zdGF0ZS5saXN0PXRoaXMubGlzdFRvb2wuaXRlbXM7XG5cdFx0fVxuXG5cdFx0dGhpcy5jcmVhdGVMaXN0KCk7XG5cdH1cblx0ZG9jQ2hhbmdlZCgpe1xuXHRcdHRoaXMuY3JlYXRlTGlzdCgpO1xuXHR9XG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0dGhpcy5faXNNb3VudGVkPXRydWU7XG5cdFx0dGhpcy5hdXRvY29tcGxldGUoKTtcblxuXHR9XG5cdGNyZWF0ZUxpc3QoKXtcblx0XHR0aGlzLml0ZW1saXN0PVtdO1xuXHRcdC8vbGFibGUgYW5kIHZhbHVlXG5cdFx0aWYgKHRoaXMucHJvcHMuZG9jbGFibGUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmxpc3RUb29sLml0ZW1zICE9PSB1bmRlZmluZWQgJiYgdGhpcy5saXN0VG9vbC5pdGVtcyAhPT0gbnVsbCl7XG5cdFx0XHRmb3IobGV0IGl0ZW0gb2YgdGhpcy5saXN0VG9vbC5pdGVtcyl7XG5cdFx0XHRcdHZhciB0ZW1wID1baXRlbVt0aGlzLnByb3BzLmRvY2xhYmxlXSxpdGVtW3RoaXMucHJvcHMuZG9jdmFsdWVdXTtcblx0XHRcdFx0dGhpcy5pdGVtbGlzdC5wdXNoKHRlbXApO1xuXHRcdFx0fVxuXHRcdFx0JChkb2N1bWVudCkudHJpZ2dlcignbGlzdExvYWQnICsgdGhpcy5wcm9wcy5kb2N0eXBlKTtcblx0XHR9XG5cdFx0Ly9qdXN0IGxhYmxlXG5cdFx0ZWxzZSBpZih0aGlzLmxpc3RUb29sLml0ZW1zICE9PSB1bmRlZmluZWQgJiYgdGhpcy5saXN0VG9vbC5pdGVtcyAhPT0gbnVsbCl7XG5cdFx0XHRmb3IobGV0IGl0ZW0gb2YgdGhpcy5saXN0VG9vbC5pdGVtcyl7XG5cdFx0XHRcdHRoaXMuaXRlbWxpc3QucHVzaChpdGVtW3RoaXMucHJvcHMuZG9jdmFsdWVdKTtcblx0XHRcdH1cblx0XHRcdCQoZG9jdW1lbnQpLnRyaWdnZXIoJ2xpc3RMb2FkJyArIHRoaXMucHJvcHMuZG9jdHlwZS5yZXBsYWNlKFwiIFwiLFwiXCIpKTtcblx0XHR9XG5cdH1cblx0Y29tcG9uZW50V2lsbFVubW91bnQoKXtcblx0XHQvLyBjb25zb2xlLmxvZyhcIkhFTExPXCIpO1xuXHRcdC8vIHRoaXMuYXcuZGVzdHJveSgpO1xuXHRcdC8vIGRlbGV0ZSB0aGlzLmF3O1xuXHRcdC8vIGNvbnNvbGUubG9nKFwiVEVTVFwiKTtcblx0fVxuXHRyZWZDYWxsKGlucHV0KXtcblx0XHR0aGlzLmlucHV0PWlucHV0O1xuXHR9XG5cdGF1dG9jb21wbGV0ZShpbnB1dCl7XG5cdFx0aW5wdXQ9dGhpcy5pbnB1dDtcblx0XHR2YXIgY29uZmlnPSB7XG5cdFx0XHRcdG1pbkNoYXJzOiAwLFxuXHRcdFx0XHRtYXhJdGVtczogOTksXG5cdFx0XHRcdGF1dG9GaXJzdDogdHJ1ZSxcblx0XHRcdFx0ZmlsdGVyOiBBd2Vzb21wbGV0ZS5GSUxURVJfU1RBUlRTV0lUSFxuXHRcdFx0fVxuXHRcdGlmKHRoaXMucHJvcHMuZG9jbGFibGUgIT09IHVuZGVmaW5lZCApe1xuXHRcdFx0Y29uZmlnLml0ZW09IGZ1bmN0aW9uKGl0ZW0sIGlucHV0KSB7XG5cdFx0XHRcdHZhciBkID0gaXRlbTtcblx0XHRcdFx0dmFyIGh0bWwgPSBcIjxzcGFuPlwiICsgX18oaXRlbS5sYWJlbCkrIFwiPC9zcGFuPjxicj48c3Bhbj48c21hbGw+XCIraXRlbS52YWx1ZStcIjwvc21hbGw+PC9zcGFuPlwiO1xuXHRcdFx0XHRyZXR1cm4gJCgnPGxpPjwvbGk+Jylcblx0XHRcdFx0XHQuZGF0YSgnaXRlbS5hdXRvY29tcGxldGUnLCBpdGVtKVxuXHRcdFx0XHRcdC5odG1sKCc8YT48cD4nICsgaHRtbCArICc8L3A+PC9hPicpXG5cdFx0XHRcdFx0LmdldCgwKTtcblx0XHRcdH1cblxuXHRcdH1lbHNle1xuXHRcdFx0Y29uZmlnLml0ZW09ZnVuY3Rpb24oaXRlbSwgaW5wdXQpIHtcblx0XHRcdFx0dmFyIGQgPSBpdGVtO1xuXHRcdFx0XHR2YXIgaHRtbCA9IFwiPHNwYW4+XCIgKyBfXyhpdGVtKSsgXCI8L3NwYW4+XCI7XG5cdFx0XHRcdHJldHVybiAkKCc8bGk+PC9saT4nKVxuXHRcdFx0XHRcdC5kYXRhKCdpdGVtLmF1dG9jb21wbGV0ZScsIGl0ZW0pXG5cdFx0XHRcdFx0Lmh0bWwoJzxhPjxwPicgKyBodG1sICsgJzwvcD48L2E+Jylcblx0XHRcdFx0XHQuZ2V0KDApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLmF3ID0gbmV3IEF3ZXNvbXBsZXRlKGlucHV0LGNvbmZpZyk7XG5cdFx0aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRcdCdhd2Vzb21wbGV0ZS1zZWxlY3Rjb21wbGV0ZScsXG5cdFx0XHRcdHRoaXMuaW5wdXRDaGFuZ2Vcblx0XHQpO1xuXHRcdCQoaW5wdXQpLmNsaWNrKCBmdW5jdGlvbigpIHtcblx0XHRcdGlmICh0aGlzLmF3LnVsLmNoaWxkTm9kZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdHRoaXMuYXcubWluQ2hhcnMgPSAwO1xuXHRcdFx0XHR0aGlzLmF3LmV2YWx1YXRlKCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmICh0aGlzLmF3LnVsLmhhc0F0dHJpYnV0ZSgnaGlkZGVuJykpIHtcblx0XHRcdFx0dGhpcy5hdy5vcGVuKCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dGhpcy5hdy5jbG9zZSgpO1xuXHRcdFx0fVxuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5hdy5saXN0PXRoaXMuaXRlbUxpc3Q7XG5cdFx0JChkb2N1bWVudCkuYmluZCgnbGlzdExvYWQnICsgdGhpcy5wcm9wcy5kb2N0eXBlLnJlcGxhY2UoXCIgXCIsXCJcIiksZnVuY3Rpb24oKXtcblx0XHRcdHRoaXMuYXcubGlzdD10aGlzLml0ZW1saXN0O1xuXHRcdH0uYmluZCh0aGlzKSk7XG5cdH1cblx0aW5wdXRDaGFuZ2UoZSl7XG5cdFx0dGhpcy5wcm9wcy5pbnB1dENoYW5nZWQoZSk7XG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnR5cGUgPSAodGhpcy5wcm9wcy50eXBlID09PSB1bmRlZmluZWQpID8gXCJ0ZXh0XCI6IHRoaXMucHJvcHMudHlwZTtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMucGxhY2Vob2xkZXIgPSAodGhpcy5wcm9wcy5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXI7XG5cdFx0dGhpcy5sYWJsZSA9ICh0aGlzLnByb3BzLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5sYWJsZTtcblx0XHR0aGlzLmRpc2FibGVkID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5kaXNhYmxlZD09ZmFsc2V8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZXF1aXJlZCA9ICh0aGlzLnByb3BzLnJlcXVpcmVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVxdWlyZWQ9PWZhbHNlfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVhZG9ubHkgPSAodGhpcy5wcm9wcy5yZWFkb25seSA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1mYWxzZXx8dGhpcy5wcm9wcy5yZWFkb25seT09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblxuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblx0XHR0aGlzLmNsYXNzTmFtZT0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJmb3JtLWNvbnRyb2wgYXdlc29tcGxldGVcIjogXCJmb3JtLWNvbnRyb2wgYXdlc29tcGxldGUgXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHZhciBpbnB1dD0oIDxpbnB1dFxuXHRcdFx0XHRcdHZhbHVlPXt0aGlzLnZhbHVlfVxuXG5cdFx0XHRcdFx0dHlwZT17dGhpcy50eXBlfVxuXHRcdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9XG5cdFx0XHRcdFx0cGxhY2Vob2xkZXI9e3RoaXMucGxhY2Vob2xkZXJ9XG5cdFx0XHRcdFx0cmVmPXt0aGlzLnJlZkNhbGx9XG5cdFx0ICAgICAgICAgIFx0b25DaGFuZ2U9e3RoaXMuaW5wdXRDaGFuZ2V9XG5cdFx0ICAgICAgICAgIFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdFx0ICAgICAgICAgIFx0cmVhZE9ubHk9e3RoaXMucmVhZG9ubHl9XG5cdFx0ICAgICAgICAgIFx0cmVxdWlyZWQ9e3RoaXMucmVxdWlyZWR9XG5cdFx0ICAgICAgICAgIC8+KTtcblxuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy5sYWJsZSA9PVwiXCIpe1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgXCI+XG5cdFx0ICAgIFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbFwiPnt0aGlzLnByb3BzLmxhYmxlfTwvbGFiZWw+XG5cdFx0ICAgIFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIlwiPlxuXHRcdCAgICAgIFx0XHRcdHtpbnB1dH1cblx0XHQgICAgXHRcdDwvZGl2PlxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHQgICAgICBcdFx0e2lucHV0fVxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuZXhwb3J0IGNsYXNzIEJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy50eXBlID0gKHRoaXMucHJvcHMudHlwZSA9PT0gdW5kZWZpbmVkKSA/IFwidGV4dFwiOiB0aGlzLnByb3BzLnR5cGU7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLmRpc2FibGVkID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5kaXNhYmxlZD09ZmFsc2V8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dmFyIG91dHB1dD1cIlwiO1xuXHRcdHRoaXMuY2xhc3NOYW1lPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcImJ0blwiOiBcImJ0biBcIiArdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0dmFyIGljb249XCJcIjtcblx0XHRpZih0aGlzLnByb3BzLmljb24hPT0gdW5kZWZpbmVkICYmIHRoaXMucHJvcHMuaWNvbiE9PVwiXCIpe1xuXHRcdFx0dmFyIGljb25DbGFzcz1cImdseXBoaWNvbiBcIiArdGhpcy5wcm9wcy5pY29uO1xuXHRcdFx0aWNvbj0oPHNwYW4gY2xhc3NOYW1lPXtpY29uQ2xhc3N9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj4pO1xuXHRcdH1cblx0XHR2YXIgaW5wdXQ9KFxuXHRcdFx0PGJ1dHRvblxuXHRcdFx0XHR0eXBlPXt0aGlzLnR5cGV9XG5cdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9XG5cdFx0XHRcdHZhbHVlPXt0aGlzLnZhbHVlfVxuXHRcdFx0XHRvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2xpY2t9XG5cdFx0XHRcdGRpc2FibGVkPXt0aGlzLmRpc2FibGVkfVxuXHRcdFx0PntpY29ufSB7dGhpcy52YWx1ZX08L2J1dHRvbj5cblx0XHQpO1xuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHQgIFx0XHR7aW5wdXR9XG5cdCAgXHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RhbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnN1Ym1pdD10aGlzLnN1Ym1pdC5iaW5kKHRoaXMpO1xuXHR9XG5cdHN1Ym1pdChlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5wcm9wcy5zdWJtaXQoZSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dmFyIGZvb3Rlcj1cIlwiO1xuXHRcdGlmKHRoaXMucHJvcHMuc3VibWl0IT09IGZhbHNlKXtcblx0XHRcdGZvb3Rlcj0oXHRcdFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWZvb3RlclwiPlxuXHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tc2Vjb25kYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DbG9zZTwvYnV0dG9uPlxuXHRcdFx0XHRcdDxidXR0b24gXG5cdFx0XHRcdFx0XHR0eXBlPVwic3VibWl0XCIgXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLnN1Ym1pdH0gXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiA+XG5cdFx0XHRcdFx0XHRcdHt0aGlzLnByb3BzLnN1Ym1pdFRleHR9XG5cdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KVxuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsIGZhZGUgdGV4dC1sZWZ0IHBhbmVsLWRlZmF1bHRcIiBpZD17dGhpcy5wcm9wcy5pZH0gdGFiSW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiBhcmlhLWxhYmVsbGVkYnk9XCJleGFtcGxlTW9kYWxMYWJlbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZ1wiIHJvbGU9XCJkb2N1bWVudFwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1oZWFkZXJcIj5cblx0XHRcdFx0XHRcdFx0PGg0IGNsYXNzTmFtZT1cIm1vZGFsLXRpdGxlXCIgaWQ9XCJleGFtcGxlTW9kYWxMYWJlbFwiPnt0aGlzLnByb3BzLnRpdGxlfTwvaDQ+XG5cdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGRpc3BsYXk9XCJub25lXCIgY2xhc3NOYW1lPVwiY2xvc2UgaGlkZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+XG5cdFx0XHRcdFx0XHRcdDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+XG5cdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XG5cdFx0XHRcdFx0XHRcdFx0eyB0aGlzLnByb3BzLmNoaWxkcmVuIH1cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdHtmb290ZXJ9XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5cbiIsImltcG9ydCBGb3JtIGZyb20gJy4uL3V0aWxzL2Zvcm1zJ1xuXG5cbmV4cG9ydCBjbGFzcyBTcHJheUZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5jb21wb25lbnRXaWxsVXBkYXRlPXRoaXMuY29tcG9uZW50V2lsbFVwZGF0ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuc3VibWl0PXRoaXMuc3VibWl0LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5zYXZlPXRoaXMuc2F2ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZGVsZXRlPXRoaXMuZGVsZXRlLmJpbmQodGhpcyk7XG5cdH1cblx0Y29tcG9uZW50V2lsbFVwZGF0ZSgpe1xuXHR9XG5cdHN1Ym1pdChlKXtcblx0XHQvL2lmKHRoaXMucHJvcHMuaXRlbS52aW5leWFyZD09XCJcIiB8fHRoaXMucHJvcHMuaXRlbS5zcHJheV90eXBlPT1cIlwiIHx8IChtb21lbnQodGhpcy5wcm9wcy5pdGVtLmRhdGUsXCJNTS9ERC9ZWVlZXCIpLmlzVmFsaWQoKSkhPT10cnVlKXtcblx0XHQvL1x0Y29uc29sZS5sb2coXCJub3QgdmFsaWRcIik7XG5cdFx0Ly99ZWxzZXtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRoaXMucHJvcHMuY3JlYXRlKHRoaXMucHJvcHMuaXRlbSk7XG5cdFx0Ly99XG5cdH1cblx0c2F2ZShlKXtcblx0XHQvLyBpZih0aGlzLnByb3BzLml0ZW0udmluZXlhcmQ9PVwiXCIgfHx0aGlzLnByb3BzLml0ZW0uc3ByYXlfdHlwZT09XCJcIiB8fCAobW9tZW50KHRoaXMucHJvcHMuaXRlbS5kYXRlLFwiTU0vREQvWVlZWVwiKS5pc1ZhbGlkKCkpIT09dHJ1ZSl7XG5cdFx0Ly8gXHRjb25zb2xlLmxvZyhcIm5vdCB2YWxpZFwiKTtcblx0XHQvLyB9ZWxzZXtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRoaXMucHJvcHMuZWRpdCh0aGlzLnByb3BzLml0ZW0pO1xuXHRcdC8vIH1cblx0fVxuXHRkZWxldGUoZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMucHJvcHMuZGVsZXRlKHRoaXMucHJvcHMuaXRlbSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dmFyIGNyZWF0ZUhpZGRlbj0odGhpcy5wcm9wcy5tb2RlIT1cImNyZWF0ZVwiKT9cIiBoaWRkZW5cIjpcIiBub3BlXCI7XG5cdFx0dmFyIGVkaXRIaWRkZW49KHRoaXMucHJvcHMubW9kZSE9XCJlZGl0XCIpP1wiIGhpZGRlblwiOlwiIG5vcGVcIjtcblxuXHRcdGlmKHRoaXMucHJvcHMuaXRlbT09bnVsbCl7XG5cdFx0XHR2YXIgY29weT17XG5cdFx0XHRcdHZpbmV5YXJkOlwiXCIsXG5cdFx0XHRcdHNlYXNvbjpcIlwiLFxuXHRcdFx0XHRkYXRlOm1vbWVudCgpLmZvcm1hdChcIk1NL0REL1lZWVlcIiksXG5cdFx0XHRcdHNwcmF5VHlwZTpcIlwiLFxuXHRcdFx0XHRxdWFudGl0eTowXG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHR2YXIgY29weT1wcy5jbG9uZSh0aGlzLnByb3BzLml0ZW0pO1xuXHRcdH1cblxuXHRcdGNvbnNvbGUubG9nKHRoaXMucHJvcHMuaXRlbSk7XG5cdFx0Y29uc29sZS5sb2coY29weSk7XG5cdFx0dmFyIGZvcm1FbGVtZW50cz17XG5cdFx0XHRkYXRlOlt7fSxcblx0XHRcdHtcblx0XHRcdFx0XHRmaWVsZDpcImRhdGVcIixcblx0XHRcdFx0XHRyZXF1aXJlZDp0cnVlLFxuXHRcdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRcdGNvcHkuZGF0ZT1lLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdFx0dmFsdWU6Y29weS5kYXRlLFxuXHRcdFx0XHRcdGxhYmxlOlwiRGF0ZVwiXG5cdFx0XHR9XSxcblx0XHRcdHZpbmV5YXJkOlt7fSx7XG5cdFx0XHRcdGZpZWxkOlwiYXV0b0NvbXBsZXRlXCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRjb3B5LnZpbmV5YXJkPWUudGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHR2YWx1ZTpjb3B5LnZpbmV5YXJkLFxuXHRcdFx0XHRyZXF1aXJlZDp0cnVlLFxuXHRcdFx0XHRsYWJsZTpcIlZpbmV5YXJkXCIsXG5cdFx0XHRcdGRvY3R5cGU6XCJWaW5leWFyZFwiLFxuXHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIlxuXHRcdFx0fV0sXG5cdFx0XHRmaWVsZDpbe30se1xuXHRcdFx0XHRmaWVsZDpcImF1dG9Db21wbGV0ZVwiLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0Y29weS5maWVsZD1lLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0dmFsdWU6Y29weS5maWVsZCxcblx0XHRcdFx0cmVxdWlyZWQ6dHJ1ZSxcblx0XHRcdFx0bGFibGU6XCJWaW5leWFyZFwiLFxuXHRcdFx0XHRkb2N0eXBlOlwiVmluZXlhcmQgRmllbGRcIixcblx0XHRcdFx0ZmlsdGVyOnt2aW5leWFyZDpjb3B5LnZpbmV5YXJkfSxcblx0XHRcdFx0ZG9jdmFsdWU6XCJuYW1lXCJcblx0XHRcdH1dLFxuXHRcdFx0d29ya29yZGVyOlt7fSx7XG5cdFx0XHRcdGZpZWxkOlwiYXV0b0NvbXBsZXRlXCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRjb3B5Lndvcmtfb3JkZXI9ZS50YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdHZhbHVlOmNvcHkud29ya19vcmRlcixcblx0XHRcdFx0cmVxdWlyZWQ6dHJ1ZSxcblx0XHRcdFx0bGFibGU6XCJWaW5leWFyZFwiLFxuXHRcdFx0XHRkb2N0eXBlOlwid29ya19vcmRlclwiLFxuXHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIlxuXHRcdFx0fV1cblx0XHR9XG5cblx0XHR2YXIgZmllbGRzPVtcblx0XHRcdGZvcm1FbGVtZW50cy52aW5leWFyZFt0aGlzLnByb3BzLnZpbmV5YXJkXSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJhdXRvQ29tcGxldGVcIixcblx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdGNvcHkuc2Vhc29uPWUudGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHR2YWx1ZTpjb3B5LnNlYXNvbixcblx0XHRcdFx0cmVxdWlyZWQ6dHJ1ZSxcblx0XHRcdFx0bGFibGU6XCJTZWFzb25cIixcblx0XHRcdFx0ZG9jdHlwZTpcIlNlYXNvblwiLFxuXHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIlxuXHRcdFx0fSxcblx0XHRcdGZvcm1FbGVtZW50cy5kYXRlW3RoaXMucHJvcHMudmluZXlhcmRdLFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImF1dG9Db21wbGV0ZVwiLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0Y29weS5zcHJheV90eXBlPWUudGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHR2YWx1ZTpjb3B5LnNwcmF5X3R5cGUsXG5cdFx0XHRcdHJlcXVpcmVkOnRydWUsXG5cdFx0XHRcdGxhYmxlOlwiU3ByYXkgVHlwZVwiLFxuXHRcdFx0XHRkb2N0eXBlOlwiU3ByYXkgVHlwZVwiLFxuXHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIlxuXHRcdFx0fSxcblxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImlucHV0XCIsXG5cdFx0XHRcdGNsYXNzTmFtZTpcInZpbmV5YXJkLWlucHV0XCIsXG5cdFx0XHRcdHR5cGU6XCJudW1iZXJcIixcblx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdGNvcHkucXVhbnRpdHk9ZS50YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdHZhbHVlOmNvcHkucXVhbnRpdHksXG5cdFx0XHRcdGxhYmxlOlwicXVhbnRpdHlcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJidXR0b25cIixcblx0XHRcdFx0dHlwZTpcInN1Ym1pdFwiLFxuXHRcdFx0XHR2YWx1ZTpcIkNyZWF0ZSBTcHJheWluZyBFbnRyeVwiLFxuXHRcdFx0XHRjbGFzc05hbWU6XCJidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIgKyBjcmVhdGVIaWRkZW4sXG5cdFx0XHRcdG9uQ2xpY2s6dGhpcy5zdWJtaXRcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiYnV0dG9uXCIsXG5cdFx0XHRcdHR5cGU6XCJzdWJtaXRcIixcblx0XHRcdFx0dmFsdWU6XCJTYXZlXCIsXG5cdFx0XHRcdGNsYXNzTmFtZTpcImJ0bi1zdWNjZXNzIHB1bGwtcmlnaHRcIisgZWRpdEhpZGRlbixcblx0XHRcdFx0b25DbGljazp0aGlzLnNhdmVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiYnV0dG9uXCIsXG5cdFx0XHRcdHR5cGU6XCJzdWJtaXRcIixcblx0XHRcdFx0dmFsdWU6XCJEZWxldGVcIixcblx0XHRcdFx0Y2xhc3NOYW1lOlwiYnRuLWRhbmdlciBwdWxsLXJpZ2h0XCIrIGVkaXRIaWRkZW4sXG5cdFx0XHRcdG9uQ2xpY2s6dGhpcy5kZWxldGVcblx0XHRcdH1cblx0XHRdXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxGb3JtXG5cdFx0XHRcdFx0aWQ9e3RoaXMucHJvcHMuaWR9XG5cdFx0XHRcdFx0dHlwZT1cImhvcml6b250YWxcIlxuXHRcdFx0XHRcdGZpZWxkcz17ZmllbGRzfVxuXG5cdFx0XHRcdC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbi8vaW1wb3J0IERheXNXb3Jrb3JkZXJzIGZyb20gJy4uLy4uL3B1YmxpYy9qcy9tb2R1bGVzL2RheXNfd29ya29yZGVycy9EYXlzV29ya29yZGVycydcbmltcG9ydCBEYXlzVGltZXNoZWV0cyBmcm9tICcuLi8uLi9wdWJsaWMvanMvbW9kdWxlcy9kYXlzX3RpbWVzaGVldHMvRGF5c1RpbWVTaGVldHMnXG5cbi8vY29uc3QgYXBwPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJyk7XG5jb25zdCBhcHA9ICQoJyNhcHAnKVswXTtcbmNvbnN0IHRpbWVzaGVldHM9ICQoJyN0aW1lJylbMF07XG5cbmNsYXNzIFdvcmtQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXG5cdFx0LyogYmluZCBkaW5nIGRpbmcgKi9cblx0XHR0aGlzLm1haW5DbGlja2VkPXRoaXMubWFpbkNsaWNrZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLndvcmtvcmRlcnNDbGlja2VkPXRoaXMud29ya29yZGVyc0NsaWNrZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnRpbWVzaGVldENsaWNrZWQ9dGhpcy50aW1lc2hlZXRDbGlja2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5oYW5kZWxDbG9ja0luPXRoaXMuaGFuZGVsQ2xvY2tJbi5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuaGFuZGVsUm91dGU9dGhpcy5oYW5kZWxSb3V0ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuc3RhdGVVcGRhdGU9dGhpcy5zdGF0ZVVwZGF0ZS5iaW5kKHRoaXMpO1xuXHRcdFxuXG5cdFx0Ly9IYW5kZWwgVXNlciBsT2FkXG5cdFx0Ly8gaWYgKCBmcmFwcGUudXNlcl9pZCA9PSBcIkFkbWluaXN0cmF0b3JcIiApe1xuXHRcdC8vIFx0d2luZG93LmxvY2F0aW9uID0gXCIvZGVza1wiO1xuXHRcdC8vIH1cblx0XHQvLyBpZiAoIGZyYXBwZS51c2VyX2lkID09IFwiR2V1c3RcIil7XG5cdFx0Ly8gXHR3aW5kb3cubG9jYXRpb24gPSBcIi9sb2dpblwiO1xuXHRcdC8vIH1cblx0XHR0aGlzLmN1cnJlbnRVc2VyPXBzLmluaXRDdXJyZW50VXNlcigpO1xuXHRcdHRoaXMuY3VycmVudFVzZXIuZ2V0KHt9LGZ1bmN0aW9uKGl0ZW1zKXtcblx0XHRcdGlmKHRoaXMuY3VycmVudFVzZXIuaXRlbXMudXNlcm5hbWU9PVwiR3Vlc3RcIil7XG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbiA9IFwiL2xvZ2luXCI7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0JChkb2N1bWVudCkudHJpZ2dlcihcInVzZXJMb2FkZWRcIik7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coXCJhZnRlciBMb2FkXCIsdGhpcy5jdXJyZW50VXNlci5pdGVtcyk7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKHRoaXMpKTsgXG5cdFx0dGhpcy5zdGF0ZT17aXRlbXM6dGhpcy5jdXJyZW50VXNlci5pdGVtc307XG5cdFx0JChkb2N1bWVudCkuYmluZCgndXNlckxvYWRlZCcsdGhpcy5zdGF0ZVVwZGF0ZSk7XG5cblxuXHRcdC8vUm91dGluZ1xuXHRcdCQod2luZG93KS5vbihcImhhc2hjaGFuZ2VcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmhhbmRlbFJvdXRlKCk7XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0XHR2YXIgcm91dGUgPSB3aW5kb3cubG9jYXRpb24uaGFzaC5zbGljZSgxKTtcblx0XHRpZighcm91dGUpIHJvdXRlID0gXCIjbWFpblwiO1xuXHRcdHRoaXMuc3RhdGUucGFnZT1yb3V0ZTtcblx0XHRpZiAoIXdpbmRvdy5sb2NhdGlvbi5oYXNoKSB7XG5cdFx0XHR3aW5kb3cubG9jYXRpb24uaGFzaCA9IFwiI21haW5cIjtcblx0XHR9XG5cdFx0JCh3aW5kb3cpLnRyaWdnZXIoXCJoYXNoY2hhbmdlXCIpO1xuXG5cdH1cblx0Y29tcG9uZW50RGlkTW91bnQoKXtcblx0XHRcblx0fVxuXHRzdGF0ZVVwZGF0ZSgpe1xuXHRcdC8vYWxlcnQoXCJ1cGRhdGVcIik7XG5cdFx0dGhpcy5zdGF0ZS5pdGVtcz10aGlzLmN1cnJlbnRVc2VyLml0ZW1zO1xuXHRcdHRoaXMuc2V0U3RhdGUodGhpcy5zdGF0ZSk7XG5cblx0fVxuXHRoYW5kZWxSb3V0ZSgpe1xuXHRcdHZhciByb3V0ZSA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnNsaWNlKDEpO1xuXHRcdHZhciBwYWdlcz17XG5cdFx0XHRtYWluOnRoaXMubWFpbkNsaWNrZWQsXG5cdFx0XHR3b3Jrb3JkZXJzOnRoaXMud29ya29yZGVyc0NsaWNrZWQsXG5cdFx0XHR0aW1lc2hlZXQ6dGhpcy50aW1lc2hlZXRDbGlja2VkXG5cdFx0fVtyb3V0ZV0oKTtcblx0fVxuXHRoYW5kZWxDbG9ja0luKCl7XG5cblx0fVxuXHRtYWluQ2xpY2tlZCgpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe3BhZ2U6J21haW4nfSk7XG5cdH1cblx0d29ya29yZGVyc0NsaWNrZWQoKXtcblxuXHRcdHRoaXMuc2V0U3RhdGUoe3BhZ2U6J3dvcmtvcmRlcnMnfSk7XG5cblx0fVxuXHR0aW1lc2hlZXRDbGlja2VkKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7cGFnZTondGltZXNoZWV0J30pO1xuXG5cdH1cblx0Ly88QWZmaXhXcmFwcGVyIGNsYXNzTmFtZT1cInN0aWNreV9zdWJuYXYgdGV4dC1jZW50ZXJcIiAgb2Zmc2V0PXsxNDB9IGhlaWdodD1cIjQwcHhcIj48L0FmZml4V3JhcHBlcj5cblx0cmVuZGVyKCl7XG5cdFx0dmFyIG91dHB1dD0nJztcblx0XHRpZiAodGhpcy5zdGF0ZS5pdGVtcy51c2VybmFtZT09XCJHdWVzdFwifHx0aGlzLnN0YXRlLml0ZW1zLnVzZXJuYW1lPT1cIkFkbWluaXN0cmF0b3JcIil7XG5cdFx0XHRvdXRwdXQ9KDxoMz5HdWVzdCBPciBBZG1pbjwvaDM+KTtcblx0XHR9XG5cdFx0ZWxzZSBpZih0aGlzLnN0YXRlLml0ZW1zLmxlbmd0aD09PTApe1xuXHRcdFx0b3V0cHV0PSg8aDM+Tm8gVXNlciBEYXRhPC9oMz4pO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0b3V0cHV0PShcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYW5lbCB3aXRoLW5hdi10YWJzIHBhbmVsLXByaW1hcnlcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWhlYWRpbmdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJuYXYgbmF2LXRhYnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiYWN0aXZlXCI+PGEgaHJlZj1cIiNjbG9ja0luVGFiXCIgZGF0YS10b2dnbGU9XCJ0YWJcIj5NYWluPC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIjd29ya09yZGVyVGFiXCIgZGF0YS10b2dnbGU9XCJ0YWJcIj5Xb3JrIE9yZGVyczwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiI3RpbWVTaGVldFRhYlwiIGRhdGEtdG9nZ2xlPVwidGFiXCI+VGltZSBTaGVldHM8L2E+PC9saT5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWItY29udGVudFwiPlx0XHRcdFx0XG4gICAgICAgICAgICAgICAgICAgICAgICA8RGF5c1RpbWVzaGVldHMgXG5cdFx0XHRcdFx0XHRcdGRhdGU9e3RoaXMuc3RhdGUuaXRlbXMudG9kYXl9XG5cdFx0XHRcdFx0XHRcdGZ1bGxfbmFtZT17dGhpcy5zdGF0ZS5pdGVtcy5jdXJyZW50X3VzZXIuZnVsbF9uYW1lfVxuXHRcdFx0XHRcdFx0XHRwYWdlPXt0aGlzLnN0YXRlLnBhZ2V9XG5cdFx0XHRcdFx0XHRcdGNyZXc9e3RoaXMuc3RhdGUuaXRlbXMuY3Jld31cblx0XHRcdFx0XHRcdC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHJldHVybig8ZGl2PlxuXHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuKGZ1bmN0aW9uKCl7XG5cdGZyYXBwZS5yZWFkeShmdW5jdGlvbigpe1xuXHRcdFJlYWN0RE9NLnJlbmRlciggXG5cdFx0PFdvcmtQYWdlIC8+XG5cdCwgdGltZXNoZWV0cyApO1xuXHR9KVxuXG59KSgpO1xuXG5cblxuXG5cbiJdfQ==
