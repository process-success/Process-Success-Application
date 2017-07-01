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

},{"../utils/forms":9,"../utils/modal":10,"./workorderTask":8}],6:[function(require,module,exports){
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

},{"../utils/forms":9,"../utils/modal":10,"../vineyard/sprayForm":11,"./createIssue":6,"./taskCheck":7}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{"../utils/forms":9}],12:[function(require,module,exports){
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

},{"../../public/js/modules/days_timesheets/DaysTimeSheets":1}]},{},[12])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c190aW1lc2hlZXRzL0RheXNUaW1lU2hlZXRzLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy9kYXlzX3RpbWVzaGVldHMvY2xvY2tJbi5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c190aW1lc2hlZXRzL2VtcGxveWVlVGltZS5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c190aW1lc2hlZXRzL3RpbWVTaGVldC5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c193b3Jrb3JkZXJzL0RheXNXb3Jrb3JkZXJzLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy9kYXlzX3dvcmtvcmRlcnMvY3JlYXRlSXNzdWUuanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL2RheXNfd29ya29yZGVycy90YXNrQ2hlY2suanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL2RheXNfd29ya29yZGVycy93b3Jrb3JkZXJUYXNrLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9mb3Jtcy5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdXRpbHMvbW9kYWwuanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL3ZpbmV5YXJkL3NwcmF5Rm9ybS5qc3giLCJwcm9jZXNzX3N1Y2Nlc3Mvd3d3L3dvcmtwYWdlL3dvcmtwYWdlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQ0E7Ozs7QUFDQTs7OztBQUNBOzs7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QUFKO0FBSEo7QUFEUixNQURaO0FBU1k7QUFBQTtBQUFBLFFBQUssV0FBVSxZQUFmO0FBQ0k7QUFBQTtBQUFBLFNBQUssV0FBVSxhQUFmO0FBQ0k7QUFDakIsY0FBTSxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLEtBRE47QUFFakIsbUJBQVcsS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixZQUFqQixDQUE4QixTQUZ4QjtBQUdqQixjQUFNLEtBQUssS0FBTCxDQUFXLElBSEE7QUFJakIsY0FBTSxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCO0FBSk47QUFESjtBQURKO0FBVFosS0FERDtBQXNCQTs7QUFFRCxVQUFPO0FBQUE7QUFBQTtBQUNMO0FBREssSUFBUDtBQUlBOzs7O0VBcEhxQixNQUFNLFM7O0FBdUg3QixDQUFDLFlBQVU7QUFDVixRQUFPLEtBQVAsQ0FBYSxZQUFVO0FBQ3RCLFdBQVMsTUFBVCxDQUNBLG9CQUFDLFFBQUQsT0FEQSxFQUVDLFVBRkQ7QUFHQSxFQUpEO0FBTUEsQ0FQRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmltcG9ydCBEYXlzV29ya29yZGVycyBmcm9tICcuLi9kYXlzX3dvcmtvcmRlcnMvRGF5c1dvcmtvcmRlcnMnXG5pbXBvcnQgRW1wbG95ZWVUaW1lIGZyb20gJy4vZW1wbG95ZWVUaW1lJztcbmltcG9ydCBUaW1lU2hlZXQgZnJvbSAnLi90aW1lU2hlZXQnO1xuaW1wb3J0IENsb2NrSW4gZnJvbSAnLi9jbG9ja0luJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF5c1RpbWVTaGVldHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5zdGF0ZT17aXRlbXM6W119O1xuXHRcdHRoaXMuc3RhdGUudGltZT0nJztcblx0XHR0aGlzLmFkZD17fTtcblxuXHRcdC8qICAgICBEbyB0aGUgYmluZCB0aGluZyAgICAgICovXG5cblx0XHQvL1RpbWUgZW1wbG95ZWUgbGluZSBpdGVtXG5cdFx0dGhpcy50aW1lQ2hhbmdlZD10aGlzLnRpbWVDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy51cGRhdGVUaW1lPXRoaXMudXBkYXRlVGltZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZGVsZXRlRW1wbG95ZWU9dGhpcy5kZWxldGVFbXBsb3llZS5iaW5kKHRoaXMpO1xuXG5cdFx0dGhpcy51cGRhdGVGcm9tU2VydmVyPXRoaXMudXBkYXRlRnJvbVNlcnZlci5iaW5kKHRoaXMpO1xuXHRcdHRoaXMudGltZVNoZWV0V3JhcHBlcj10aGlzLnRpbWVTaGVldFdyYXBwZXIuYmluZCh0aGlzKTtcblxuXHRcdHRoaXMuYWRkRW1wbG95ZWU9dGhpcy5hZGRFbXBsb3llZS5iaW5kKHRoaXMpXG5cdFx0dGhpcy51cGRhdGVGcm9tU2VydmVyUGFyYW09dGhpcy51cGRhdGVGcm9tU2VydmVyUGFyYW0uYmluZCh0aGlzKTtcblxuXHRcdHRoaXMuY2xvY2tJbj10aGlzLmNsb2NrSW4uYmluZCh0aGlzKTtcblx0XHR0aGlzLmNsb2NrT3V0PXRoaXMuY2xvY2tPdXQuYmluZCh0aGlzKTtcblx0XHQvKiAgICBlbmQgQmluZCBkaW5nIGRpbmcgICAgICAgICAqL1xuXG5cdFx0dGhpcy5hdXRvY29tcGxldGVBcnI9W107XG5cdFx0dmFyIGFyZ3M9e307XG5cblx0XHQvL0dyYWIgdGhlIGVtcGxveWVlIHRpbWVzaGVldCBkYXRhXG5cdFx0dGhpcy5vYmpUb29sPXBzLmluaXRUaW1lU2hlZXRzKClcblx0XHR0aGlzLm9ialRvb2wuZ2V0KHtkYXRlOnByb3BzLmRhdGV9LGZ1bmN0aW9uKCl7XG5cdFx0XHR0aGlzLnVwZGF0ZUZyb21TZXJ2ZXIoKTtcblx0XHRcdHRoaXMub2JqVG9vbC5yZWFjdFNldHVwKHRoaXMudXBkYXRlRnJvbVNlcnZlcik7XG5cdFx0fS5iaW5kKHRoaXMpKTtcblxuXHRcdGlmICh0aGlzLm9ialRvb2wuaXRlbXM9PT11bmRlZmluZWQgfHx0aGlzLm9ialRvb2wuaXRlbXM9PT0gMCApe1xuXHRcdH1lbHNle3RoaXMuc3RhdGUuaXRlbXM9dGhpcy5vYmpUb29sLml0ZW1zO31cblxuXHRcdC8vR3JhYiB0aGUgZW1wbG95ZWUgbGlzdFxuXHRcdHZhciB0b29sPXBzLmluaXRFbXBsb3llZUxpc3QoKTtcblx0XHR0b29sLmdldCh7fSxmdW5jdGlvbigpe1xuXHRcdFx0cHMuZW1wbG95ZWVfbGFibGVzPSB0b29sLml0ZW1zLm1hcChmdW5jdGlvbihvYmopIHsgXG5cdFx0XHRcdHZhciByT2JqID0ge307XG5cdFx0XHRcdHJPYmoubGFiZWw9b2JqLmZ1bGxfbmFtZTtcblx0XHRcdFx0ck9iai52YWx1ZT1vYmoubmFtZTtcblx0XHRcdFx0cmV0dXJuIHJPYmo7XG5cdFx0XHR9KTtcblx0XHRcdCQoZG9jdW1lbnQpLnRyaWdnZXIoXCJlbXBsb3llZUxhYmxlc0xvYWRlZFwiKTtcblx0XHR9KTtcblxuXG5cdFx0XG5cblx0fVxuXG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gaGVscGVyIEZ1bmN0aW9uXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tXG5cdHVwZGF0ZUZyb21TZXJ2ZXIoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtpdGVtczp0aGlzLm9ialRvb2wuaXRlbXN9KTtcblx0fVxuXHR1cGRhdGVGcm9tU2VydmVyUGFyYW0oZGF0YSxpbmRleCl7XG5cdFx0dGhpcy5vYmpUb29sLml0ZW1zW2luZGV4XT1kYXRhO1xuXHRcdHRoaXMuc2V0U3RhdGUoe2l0ZW1zOnRoaXMub2JqVG9vbC5pdGVtc30pO1xuXHR9XG5cdGNyZXdzVGltZXNoZWV0SW5kZXgoY3Jldyl7XG5cdFx0Zm9yICh2YXIgaT0wOyBpIDwgdGhpcy5vYmpUb29sLml0ZW1zLmxlbmd0aDsgaSsrKXtcblx0XHRcdHZhciBpdGVtPXRoaXMub2JqVG9vbC5pdGVtc1tpXTtcblx0XHRcdGlmKGl0ZW0uY3Jldz09Y3Jldyl7XG5cdFx0XHRcdHJldHVybiBpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRnZXRJbmRleFRpbWVzaGVldCh0aW1lc2hlZXQpe1xuXHRcdHJldHVybiB0aGlzLm9ialRvb2wuZ2V0X2luZGV4X29mX2l0ZW0odGltZXNoZWV0KTtcblx0fVxuXHRnZXRJbmRleEVtcGxveWVlKHRpbWVzaGVldEluZGV4LGVtcGxveWVlTmFtZSl7XG5cdFx0dmFyIGVtcGxveWVlcz10aGlzLm9ialRvb2wuaXRlbXNbdGltZXNoZWV0SW5kZXhdLmVtcGxveWVlcztcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGVtcGxveWVlcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRpZiAoZW1wbG95ZWVOYW1lPT1lbXBsb3llZXNbaV0uZW1wbG95ZWUpe1xuXHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdH1cblx0XHR9XG5cblx0fVxuXG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gICAgICAgVGltZXNoZWV0IFdyYXBwZXIgRnVuY3Rpb25zXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHRcblxuXHRjbG9ja0luKHRpbWUsY3Jldyl7XG5cblx0XHR2YXIgdHNfaW5kZXg9dGhpcy5jcmV3c1RpbWVzaGVldEluZGV4KGNyZXcpO1xuXG5cdFx0dGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXM7XG5cdFx0Zm9yICh2YXIgaT0wOyBpIDwgdGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXMubGVuZ3RoOyBpKyspe1xuXHRcdFx0dGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXNbaV0uc3RhcnQ9dGltZTtcblx0XHR9XG5cdFx0dGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5zdGF0dXM9XCJDbG9ja2VkIEluXCI7XG5cdFx0dGhpcy5vYmpUb29sLnVwZGF0ZSh0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdKTtcblx0XHR0aGlzLnNldFN0YXRlKHtpdGVtczp0aGlzLm9ialRvb2wuaXRlbXN9KTtcblx0fVxuXHRjbG9ja091dCh0aW1lLGNyZXcpe1xuXG5cdFx0dmFyIHRzX2luZGV4PXRoaXMuY3Jld3NUaW1lc2hlZXRJbmRleChjcmV3KTtcblxuXHRcdHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzO1xuXHRcdGZvciAodmFyIGk9MDsgaSA8IHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzLmxlbmd0aDsgaSsrKXtcblx0XHRcdHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzW2ldLmVuZD10aW1lO1xuXHRcdH1cblx0XHR0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLnN0YXR1cz1cIkNsb2NrZWQgT3V0XCI7XG5cdFx0dGhpcy5vYmpUb29sLnVwZGF0ZSh0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdKTtcblx0XHR0aGlzLnNldFN0YXRlKHtpdGVtczp0aGlzLm9ialRvb2wuaXRlbXN9KTtcblx0fVxuXHRhZGRFbXBsb3llZSh0c19uYW1lLCBlbXBsb3llZV9uYW1lKXtcblx0XHR2YXIgdHNfaW5kZXggPSB0aGlzLmdldEluZGV4VGltZXNoZWV0KHRzX25hbWUpO1xuXHRcdHZhciBlbXBsb3llZUluZGV4ID0gdGhpcy5nZXRJbmRleEVtcGxveWVlKHRzX2luZGV4LGVtcGxveWVlX25hbWUpO1xuXG5cdFx0dmFyIHVwZGF0ZUNhbGxiYWNrPWZ1bmN0aW9uKGluZGV4KXtcblx0XHRcdHJldHVybiBmdW5jdGlvbihkYXRhKXtcdFx0XHRcblx0XHRcdFx0dGhpcy51cGRhdGVGcm9tU2VydmVyUGFyYW0oZGF0YSxpbmRleCk7XG5cdFx0XHR9LmJpbmQodGhpcyk7XG5cdFx0fS5iaW5kKHRoaXMpO1xuXG5cdFx0Zm9yICh2YXIgaT0wOyBpIDwgdGhpcy5vYmpUb29sLml0ZW1zLmxlbmd0aDsgaSsrKXtcblx0XHRcdHZhciBpdGVtID0gdGhpcy5vYmpUb29sLml0ZW1zW2ldO1xuXHRcdFx0aWYoaXRlbS5uYW1lPT10c19uYW1lKXtcblx0XHRcdFx0Zm9yICh2YXIgeD0wOyB4IDwgaXRlbS5lbXBsb3llZXMubGVuZ3RoOyB4Kyspe1xuXHRcdFx0XHRcdHZhciBjb250YWluZXIgPSBpdGVtLmVtcGxveWVlc1t4XTtcblx0XHRcdFx0XHRpZiAoY29udGFpbmVyLmVtcGxveWVlPT1lbXBsb3llZV9uYW1lKXtcblx0XHRcdFx0XHRcdHJldHVybiBcImR1cGxpY2F0ZVwiO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLm9ialRvb2wuaXRlbXNbaV0uZW1wbG95ZWVzLnB1c2goeyBlbXBsb3llZSA6IGVtcGxveWVlX25hbWUsIG5ldzonMSd9KTtcblx0XHRcdFx0dGhpcy5vYmpUb29sLnVwZGF0ZSh0aGlzLm9ialRvb2wuaXRlbXNbaV0sdXBkYXRlQ2FsbGJhY2soaSksMSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0dmFyIGRvbmU9MTtcblx0XHRcdFx0aWYoaXRlbS5lbXBsb3llZXMubGVuZ3RoPjApe1xuXHRcdFx0XHRcdGZvciAodmFyIHg9MDsgeCA8IGl0ZW0uZW1wbG95ZWVzLmxlbmd0aCAmJiBkb25lOyB4Kyspe1xuXHRcdFx0XHRcdFx0dmFyIGNvbnRhaW5lciA9IGl0ZW0uZW1wbG95ZWVzW3hdO1xuXHRcdFx0XHRcdFx0aWYgKGNvbnRhaW5lci5lbXBsb3llZT09ZW1wbG95ZWVfbmFtZSl7XG5cdFx0XHRcdFx0XHRcdHRoaXMub2JqVG9vbC5pdGVtc1tpXS5lbXBsb3llZXMuc3BsaWNlKHgsIDEpO1xuXHRcdFx0XHRcdFx0XHR0aGlzLm9ialRvb2wuY2hhbmdlZCh0aGlzLm9ialRvb2wuaXRlbXNbaV0pO1xuXHRcdFx0XHRcdFx0XHRkb25lPTA7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdH07XG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vICAgICAgICAgICBUaW1lc2hlZXQgV3JhcHBlclxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVx0XG5cdHRpbWVTaGVldFdyYXBwZXIoaXRlbSxpbmRleCl7XG5cdFx0dmFyIGVtcGxveWVlX291dHB1dD1bXTtcblx0XHRpZihpdGVtLmVtcGxveWVlcz09PXVuZGVmaW5lZCl7XG5cblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdHZhciBlbXBsb3llZU91dHB1dD1pdGVtLmVtcGxveWVlcy5tYXAoZnVuY3Rpb24oaXRlbV9lbXBsb3llZSxpbmRleF9lbXBsb3llZSl7XG5cdFx0XHQgXHRlbXBsb3llZV9vdXRwdXQucHVzaCh0aGlzLmVtcGxveWVlTGluZUl0ZW0oaXRlbV9lbXBsb3llZSxpdGVtLm5hbWUsaW5kZXhfZW1wbG95ZWUpKTtcblx0XHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuKFxuXG5cdFx0XHQ8VGltZVNoZWV0XG5cdFx0XHRcdGtleT17aW5kZXh9IFxuXHRcdFx0XHRuYW1lPXtpdGVtLm5hbWV9XG5cdFx0XHRcdGRhdGU9e2l0ZW0uZGF0ZX1cblx0XHRcdFx0Y3Jldz17aXRlbS5jcmV3fVxuXHRcdFx0XHRlbXBsb3llZXM9e2VtcGxveWVlX291dHB1dH1cblx0XHRcdFx0YWRkRW1wbG95ZWU9e3RoaXMuYWRkRW1wbG95ZWV9XG5cdFx0XHRcdG9uVXBkYXRlPXt0aGlzLnVwZGF0ZX1cblx0XHRcdC8+XG5cblx0XHQpO1xuXHR9XG5cblxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vICAgICAgIEVtcGxveWVlIFRpbWUgRm9ybSBMaW5laXRlbVxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRkZWxldGVFbXBsb3llZShlbXBsb3llZSx0aW1lc2hlZXQpe1xuXHRcdHZhciB0c19pbmRleCA9IHRoaXMuZ2V0SW5kZXhUaW1lc2hlZXQodGltZXNoZWV0KTtcblx0XHR2YXIgZG9uZT0xO1xuXHRcdHZhciBpdGVtPXRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF07XG5cdFx0aWYoaXRlbS5lbXBsb3llZXMubGVuZ3RoPjApe1xuXHRcdFx0Zm9yICh2YXIgeD0wOyB4IDwgaXRlbS5lbXBsb3llZXMubGVuZ3RoICYmIGRvbmU7IHgrKyl7XG5cdFx0XHRcdHZhciBjb250YWluZXIgPSBpdGVtLmVtcGxveWVlc1t4XTtcblx0XHRcdFx0aWYgKGNvbnRhaW5lci5lbXBsb3llZT09ZW1wbG95ZWUpe1xuXHRcdFx0XHRcdHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzLnNwbGljZSh4LCAxKTtcblx0XHRcdFx0XHQvL8aSY29uc29sZS5sb2codGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XSk7XG5cdFx0XHRcdFx0dGhpcy5vYmpUb29sLnVwZGF0ZSh0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdKTtcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtpdGVtczp0aGlzLm9ialRvb2wuaXRlbXN9KTtcblx0XHRcdFx0XHRkb25lPTA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHR0aW1lQ2hhbmdlZChwb3NpdGlvbixlbXBsb3llZSx0aW1lc2hlZXQsdmFsdWUpe1xuXHRcdHZhciB0c19pbmRleCA9IHRoaXMuZ2V0SW5kZXhUaW1lc2hlZXQodGltZXNoZWV0KTtcblx0XHR2YXIgZW1wbG95ZWVJbmRleCA9IHRoaXMuZ2V0SW5kZXhFbXBsb3llZSh0c19pbmRleCxlbXBsb3llZSk7XG5cdFx0dGhpcy5zdGF0XG5cdFx0aWYocG9zaXRpb249PSdlbmQnKXtcblx0XHRcdHRoaXMuc3RhdGUuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlc1tlbXBsb3llZUluZGV4XS5lbmQ9dmFsdWU7XG5cdFx0fVxuXHRcdGVsc2V7dGhpcy5zdGF0ZS5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzW2VtcGxveWVlSW5kZXhdLnN0YXJ0PXZhbHVlfVxuXHQgICAgdGhpcy5zZXRTdGF0ZSh7aXRlbXM6dGhpcy5zdGF0ZS5pdGVtc30pO1xuXHR9XG5cdHVwZGF0ZVRpbWUocG9zaXRpb24sZW1wbG95ZWUsdGltZXNoZWV0LHZhbHVlKXtcblx0XHR2YXIgdHNfaW5kZXggPSB0aGlzLmdldEluZGV4VGltZXNoZWV0KHRpbWVzaGVldCk7XG5cdFx0dmFyIGVtcGxveWVlSW5kZXggPSB0aGlzLmdldEluZGV4RW1wbG95ZWUodHNfaW5kZXgsZW1wbG95ZWUpO1xuXHRcdHZhciBzYXZlPTA7XG5cdFx0dmFsdWU9cHMudGltZV9hZGRfZGlnaXRzKHZhbHVlKVxuXHRcdGlmKHBvc2l0aW9uPT0nZW5kJyAmJiBwcy50aW1lX2FkZF9mcm9udF96ZXJvKHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzW2VtcGxveWVlSW5kZXhdLmVuZCkgIT0gcHMudGltZV9hZGRfZGlnaXRzKHZhbHVlKSl7IFxuXHRcdFx0dGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXNbZW1wbG95ZWVJbmRleF0uZW5kPXBzLnRpbWVfYWRkX2RpZ2l0cyh2YWx1ZSk7XG5cdFx0XHRzYXZlPTE7XG5cdFx0fVxuXHQgICAgaWYocG9zaXRpb249PSdzdGFydCcgJiYgcHMudGltZV9hZGRfZnJvbnRfemVybyh0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlc1tlbXBsb3llZUluZGV4XS5zdGFydCkgIT0gcHMudGltZV9hZGRfZGlnaXRzKHZhbHVlKSl7XG5cdCAgICBcdHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzW2VtcGxveWVlSW5kZXhdLnN0YXJ0PXBzLnRpbWVfYWRkX2RpZ2l0cyh2YWx1ZSk7XG5cdCAgICBcdHNhdmU9MTtcblx0ICAgIH1cblx0ICAgIGlmKHNhdmUpe1xuXHRcdCAgICB0aGlzLnNldFN0YXRlKHtpdGVtczp0aGlzLm9ialRvb2wuaXRlbXN9KTtcblx0XHQgICAgdGhpcy5vYmpUb29sLnVwZGF0ZSh0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLGZ1bmN0aW9uKCl7XG5cdFx0ICAgIFx0cHMuc3VjY2Vzc0FsZXJ0KHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzW2VtcGxveWVlSW5kZXhdLmVtcGxveWVlX25hbWUrXCIgdGltZSB1cGRhdGVkIVwiKTtcblx0XHQgICAgfS5iaW5kKHRoaXMpKTtcblx0XHR9XG5cdH1cblx0ZW1wbG95ZWVMaW5lSXRlbShlbXBsb3llZV9jb250YWluZXIsdGltZV9zaGVldCxlbXBsb3llZV9pbmRleCl7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PEVtcGxveWVlVGltZVxuXHRcdFx0XHRrZXk9e2VtcGxveWVlX2luZGV4fVxuXHRcdFx0XHR0aW1lc2hlZXQ9e3RpbWVfc2hlZXR9XG5cdFx0XHRcdGVtcGxveWVlX25hbWU9e2VtcGxveWVlX2NvbnRhaW5lci5lbXBsb3llZV9uYW1lfVxuXHRcdFx0XHRlbXBsb3llZT17ZW1wbG95ZWVfY29udGFpbmVyLmVtcGxveWVlfVxuXHRcdFx0XHRzdGFydD17cHMudGltZV9hZGRfZnJvbnRfemVybyhlbXBsb3llZV9jb250YWluZXIuc3RhcnQpfVxuXHRcdFx0XHRlbmQ9e3BzLnRpbWVfYWRkX2Zyb250X3plcm8oZW1wbG95ZWVfY29udGFpbmVyLmVuZCl9XG5cdFx0XHRcdHVwZGF0ZVRpbWU9e3RoaXMudXBkYXRlVGltZX1cblx0XHRcdFx0dGltZUNoYW5nZWQ9e3RoaXMudGltZUNoYW5nZWR9XG5cdFx0XHRcdGRlbGV0ZUVtcGxveWVlPXt0aGlzLmRlbGV0ZUVtcGxveWVlfVxuXHRcdFx0Lz5cblx0XHQpO1xuXHR9XG5cblxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gICAgICAgIFJlbmRlclxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdHJlbmRlcigpe1xuXHRcdC8vaGFuZGVsIGVtcHR5IHJldHVyblxuXHRcdGlmICh0aGlzLnN0YXRlLml0ZW1zLmxlbmd0aD09PTB8fHRoaXMuc3RhdGUuaXRlbXM9PT11bmRlZmluZWQpe1xuXHRcdFx0cmV0dXJuICg8ZGl2Pk5vIFRpbWUgU2hlZXRzLCBzdGFydCBieSA8YSBocmVmPVwiL2Rlc2tcIj5jcmVhdGluZyBzb21lIGNyZXdzITwvYT48L2Rpdj4pO1xuXHRcdH1cblx0XHR2YXIgb3V0cHV0PVtdXG5cdFx0dGhpcy5zdGF0ZS5pdGVtcy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXHRcdFx0aWYoaXRlbS5jcmV3PT10aGlzLnByb3BzLmNyZXcpe1xuXHRcdFx0XHRvdXRwdXQudW5zaGlmdCh0aGlzLnRpbWVTaGVldFdyYXBwZXIoaXRlbSxpbmRleCkpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdG91dHB1dC5wdXNoKHRoaXMudGltZVNoZWV0V3JhcHBlcihpdGVtLGluZGV4KSk7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKHRoaXMpKTtcblxuXHRcdHZhciB0c19pbmRleD10aGlzLmNyZXdzVGltZXNoZWV0SW5kZXgodGhpcy5wcm9wcy5jcmV3KTtcblx0XHR2YXIgc3RhdHVzPScnO1xuXHRcdGlmICh0c19pbmRleD09dW5kZWZpbmVkKXt2YXIgc3RhdHVzPWZhbHNlO31cblx0XHRlbHNle3N0YXR1cyA9dGhpcy5zdGF0ZS5pdGVtc1t0c19pbmRleF0uc3RhdHVzfVxuXHRcdFxuXG5cdFx0Ly9NQUlOIFJFTkRFUlxuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidGFiLXBhbmUgZmFkZSBpbiBhY3RpdmVcIiBpZD1cImNsb2NrSW5UYWJcIj5cblx0XHRcdFx0XHQ8Q2xvY2tJblxuXHRcdFx0XHRcdFx0Y2xvY2tJbj17dGhpcy5jbG9ja0lufVxuXHRcdFx0XHRcdFx0Y2xvY2tPdXQ9e3RoaXMuY2xvY2tPdXR9XG5cdFx0XHRcdFx0XHRzdGF0dXM9e3N0YXR1c31cblx0XHRcdFx0XHRcdGZ1bGxfbmFtZT17dGhpcy5wcm9wcy5mdWxsX25hbWV9XG5cdFx0XHRcdFx0XHRkYXRlPXt0aGlzLnByb3BzLmRhdGV9XG5cdFx0XHRcdFx0XHRjcmV3PXt0aGlzLnByb3BzLmNyZXd9XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidGFiLXBhbmUgZmFkZVwiIGlkPVwidGltZVNoZWV0VGFiXCI+XG5cdFx0XHRcdFx0PGJyLz5cblx0XHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ0YWItcGFuZSBmYWRlXCIgaWQ9XCJ3b3JrT3JkZXJUYWJcIj5cblx0XHRcdFx0XHRcdDxEYXlzV29ya29yZGVycyBcblx0XHRcdFx0XHRcdFx0ZGF0ZT17dGhpcy5wcm9wcy5kYXRlfVxuXHRcdFx0XHRcdFx0XHRjcmV3PXt0aGlzLnByb3BzLmNyZXd9XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXG5cdFx0KTtcblxuXHR9O1x0XG59XG5cblxuXG5cblxuIiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbG9ja0luIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMudG9nZ2xlVGltZUlucHV0PXRoaXMudG9nZ2xlVGltZUlucHV0LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jbG9ja0luPXRoaXMuY2xvY2tJbi5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY2xvY2tPdXQ9dGhpcy5jbG9ja091dC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMub25DaGFuZ2U9dGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpO1xuXG5cdFx0dGhpcy5zdGF0ZT17XG5cdFx0XHRkYXRlOm5ldyBEYXRlKCksXG5cdFx0XHRzcGVjaWZ5VGltZTpmYWxzZVxuXHRcdH07XG5cblx0fVxuXHRjbG9ja0luKGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRpZih0aGlzLnN0YXRlLnNwZWNpZnlUaW1lPT1mYWxzZSl7XG5cdFx0XHR2YXIgdGltZT10aGlzLnN0YXRlLmRhdGUudG9Mb2NhbGVUaW1lU3RyaW5nKFtdLCB7aG91cjogJzItZGlnaXQnLCBtaW51dGU6JzItZGlnaXQnLGhvdXIxMjogZmFsc2V9KVxuXHRcdFx0Ly9jb25zb2xlLmxvZyh0aW1lKTtcblx0XHRcdHBzLnN1Y2Nlc3NBbGVydChcIkNsb2NrZWQgaW4gYXQgXCIgKyB0aGlzLnN0YXRlLmRhdGUudG9Mb2NhbGVUaW1lU3RyaW5nKFtdLCB7aG91cjogJzItZGlnaXQnLCBtaW51dGU6JzItZGlnaXQnfSkpXG5cdFx0XHR0aGlzLnByb3BzLmNsb2NrSW4odGltZSwgdGhpcy5wcm9wcy5jcmV3KVxuXHRcdH1lbHNle1xuXHRcdFx0Ly9jb25zb2xlLmxvZyh0aGlzLnN0YXRlLnRpbWUpXG5cdFx0XHRpZih0aGlzLnN0YXRlLnRpbWUhPXVuZGVmaW5lZCl7XG5cdFx0XHRcdHRoaXMucHJvcHMuY2xvY2tJbih0aGlzLnN0YXRlLnRpbWUsIHRoaXMucHJvcHMuY3Jldyk7XG5cdFx0XHRcdHBzLnN1Y2Nlc3NBbGVydChcIkNsb2NrZWQgaW5cIik7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Ly9pbnZhbGlkIHRpbWUgZXJyb3Jcblx0XHRcdFx0cHMuZmFpbEFsZXJ0KFwiSW52YWxpZCB0aW1lLlwiKVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRjbG9ja091dChlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0aWYodGhpcy5zdGF0ZS5zcGVjaWZ5VGltZT09ZmFsc2Upe1xuXHRcdFx0dmFyIHRpbWU9dGhpcy5zdGF0ZS5kYXRlLnRvTG9jYWxlVGltZVN0cmluZyhbXSwge2hvdXI6ICcyLWRpZ2l0JywgbWludXRlOicyLWRpZ2l0Jyxob3VyMTI6IGZhbHNlfSlcblx0XHRcdC8vY29uc29sZS5sb2codGltZSk7XG5cdFx0XHRwcy5zdWNjZXNzQWxlcnQoXCJDbG9ja2VkIG91dCBhdCBcIiArIHRoaXMuc3RhdGUuZGF0ZS50b0xvY2FsZVRpbWVTdHJpbmcoW10sIHtob3VyOiAnMi1kaWdpdCcsIG1pbnV0ZTonMi1kaWdpdCd9KStcIiBIYXZlIGEgZ3JlYXQgbmlnaHQhXCIpXG5cdFx0XHR0aGlzLnByb3BzLmNsb2NrT3V0KHRpbWUsIHRoaXMucHJvcHMuY3Jldylcblx0XHR9ZWxzZXtcblx0XHRcdC8vY29uc29sZS5sb2codGhpcy5zdGF0ZS50aW1lKVxuXHRcdFx0aWYodGhpcy5zdGF0ZS50aW1lIT11bmRlZmluZWQpe1xuXHRcdFx0XHR0aGlzLnByb3BzLmNsb2NrT3V0KHRoaXMuc3RhdGUudGltZSwgdGhpcy5wcm9wcy5jcmV3KTtcblx0XHRcdFx0cHMuc3VjY2Vzc0FsZXJ0KFwiQ2xvY2tlZCBPdXQhICBIYXZlIGEgZ3JlYXQgbmlnaHQhXCIpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdC8vaW52YWxpZCB0aW1lIGVycm9yXG5cdFx0XHRcdHBzLmZhaWxBbGVydChcIkludmFsaWQgdGltZS5cIilcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0dG9nZ2xlVGltZUlucHV0KGUpe1xuXHRcdC8vY29uc29sZS5sb2codGhpcy5zdGF0ZS5zcGVjaWZ5VGltZSk7XG5cdFx0aWYodGhpcy5zdGF0ZS5zcGVjaWZ5VGltZSl7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtzcGVjaWZ5VGltZTpmYWxzZX0pO1xuXHRcdH1cblx0XHRlbHNle3RoaXMuc2V0U3RhdGUoe3NwZWNpZnlUaW1lOnRydWV9KTt9XG5cdH1cblx0b25DaGFuZ2UoZSl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7dGltZTplLnRhcmdldC52YWx1ZX0pO1xuXHR9XG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdHRoaXMudGltZXJJRCA9IHNldEludGVydmFsKCgpID0+IHRoaXMudGljaygpLDEwMDAwKTtcblx0fVxuXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuXHRcdGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcklEKTtcblx0fVxuXG5cdHRpY2soKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRkYXRlOiBuZXcgRGF0ZSgpXG5cdFx0fSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cblx0XG5cdFx0dmFyIHZhbHVlcz17XG5cdFx0XHQnQ3JlYXRlZCc6W3RoaXMuY2xvY2tJbiwnQ2xvY2sgSW4nLCdidG4gYnRuLWxnIGJ0bi1zdWNjZXNzIGJ0bi1ibG9jayddLFxuXHRcdFx0J0Nsb2NrZWQgSW4nOlt0aGlzLmNsb2NrT3V0LCAnQ2xvY2sgT3V0JywgJ2J0biBidG4tbGcgYnRuLXN1Y2Nlc3MgYnRuLWJsb2NrJyBdLFxuXHRcdFx0J0Nsb2NrZWQgT3V0JzpbdGhpcy5jbG9ja091dCwgJ0NoYW5nZSBDbG9ja291dCBUaW1lJywnYnRuIGJ0bi1sZyBidG4tc3VjY2VzcyBidG4tYmxvY2snXSxcblx0XHRcdCdTdWJtaW50ZWQnOlsnJywnQWxyZWFkeSBTdWJtaW50ZWQnLCdidG4gYnRuLWxnIGJ0bi1zdWNjZXNzIGJ0bi1ibG9jayddLFxuXHRcdFx0J0Fwcm92ZWQnOlsnJywnQWxyZWFkeSBTdWJtaW50ZWQnLCdidG4gYnRuLWxnIGJ0bi1zdWNjZXNzIGJ0bi1ibG9jayddXG5cdFx0fVt0aGlzLnByb3BzLnN0YXR1c107XG5cdFx0dmFyIG91dHB1dD0nJztcblx0XHRpZiAodmFsdWVzPT11bmRlZmluZWQpe1xuXHRcdFx0b3V0cHV0PSg8YSBocmVmPVwiI3RpbWVzaGVldFwiPllvdSBhcmUgbm90IGluIGEgVGltZSBTaGVldCBhZGQgeW91cnNlbGYuPC9hPik7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHR2YXIgaW5wdXRGaWVsZCA9ICggPGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9e3ZhbHVlc1syXX0gb25DbGljaz17dmFsdWVzWzBdfSB2YWx1ZT17dmFsdWVzWzFdfSAvPik7XG5cdFx0XHRvdXRwdXQ9KFxuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8aDMgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cblx0XHRcdFx0XHRXZWxjb21lIDxzcGFuIGNsYXNzTmFtZT1cInVzZXJuYW1lXCI+e3RoaXMucHJvcHMuZnVsbF9uYW1lfTwvc3Bhbj5cblx0XHRcdFx0PC9oMz5cblx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+e3RoaXMuc3RhdGUuZGF0ZS50b0xvY2FsZVRpbWVTdHJpbmcoW10sIHtob3VyOiAnMi1kaWdpdCcsIG1pbnV0ZTonMi1kaWdpdCd9KX0gb24ge3RoaXMuc3RhdGUuZGF0ZS50b0RhdGVTdHJpbmcoKX0gPC9oMz5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2Nsb2NrSW4nPlxuXHRcdFx0XHRcdDxmb3JtIGNsYXNzTmFtZT1cImZvcm0tY2hlY2tpblwiIHJvbGU9XCJmb3JtXCI+XG5cdFx0XHRcdFx0XHR7aW5wdXRGaWVsZH1cblx0XHRcdFx0XHRcdDxici8+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndGV4dC1jZW50ZXInPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PGlucHV0IFxuXHRcdFx0XHRcdFx0XHRcdFx0dHlwZT1cInRpbWVcIiBcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5zdGF0ZS5zcGVjaWZ5VGltZSA/ICdmb3JtLWNvbnRyb2wgc21hbGwtdGltZSc6J2hpZGRlbid9IFxuXHRcdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG5cdFx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxici8+XG5cdFx0XHRcdFx0XHRcdDxhIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiIG9uQ2xpY2s9e3RoaXMudG9nZ2xlVGltZUlucHV0fT57dGhpcy5zdGF0ZS5zcGVjaWZ5VGltZT8nIC0gVXNlIEN1cnJlbnQgVGltZSc6JyArIFNwZWNpZnkgYSBUaW1lJ308L2E+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Zvcm0+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59IiwiXG4vKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERheXNUaW1lU2hlZXRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdC8vQmluZGluZyBkaW5nXG5cdFx0dGhpcy5jaGFuZ2VkU3RhcnQ9dGhpcy5jaGFuZ2VkU3RhcnQuYmluZCh0aGlzKVxuXHRcdHRoaXMuY2hhbmdlZEVuZD10aGlzLmNoYW5nZWRFbmQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnVwZGF0ZVN0YXJ0PXRoaXMudXBkYXRlU3RhcnQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnVwZGF0ZUVuZD10aGlzLnVwZGF0ZUVuZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZGVsZXRlPXRoaXMuZGVsZXRlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5rZXlQcmVzc2VkU3RhcnQ9dGhpcy5rZXlQcmVzc2VkU3RhcnQuYmluZCh0aGlzKTtcblx0XHR0aGlzLmtleVByZXNzZWRFbmQ9dGhpcy5rZXlQcmVzc2VkRW5kLmJpbmQodGhpcyk7XG5cdH1cblx0Y2hhbmdlZFN0YXJ0KGUpe1xuXHRcdHRoaXMucHJvcHMudGltZUNoYW5nZWQgICgnc3RhcnQnLHRoaXMucHJvcHMuZW1wbG95ZWUsdGhpcy5wcm9wcy50aW1lc2hlZXQsZS50YXJnZXQudmFsdWUpO1xuXHR9XG5cdGNoYW5nZWRFbmQoZSl7XG5cdFx0dGhpcy5wcm9wcy50aW1lQ2hhbmdlZCgnZW5kJyx0aGlzLnByb3BzLmVtcGxveWVlLHRoaXMucHJvcHMudGltZXNoZWV0LGUudGFyZ2V0LnZhbHVlKTtcblx0fVxuXHR1cGRhdGVTdGFydChlKXtcblx0XHRpZihlLnRhcmdldC52YWx1ZSE9Jycpe1xuXHRcdFx0dGhpcy5wcm9wcy51cGRhdGVUaW1lKCdzdGFydCcsdGhpcy5wcm9wcy5lbXBsb3llZSx0aGlzLnByb3BzLnRpbWVzaGVldCwgZS50YXJnZXQudmFsdWUpO1xuXHRcdH1cblx0fVxuXHR1cGRhdGVFbmQoZSl7XG5cdFx0aWYoZS50YXJnZXQudmFsdWUhPScnKXtcblx0XHRcdHRoaXMucHJvcHMudXBkYXRlVGltZSgnZW5kJyx0aGlzLnByb3BzLmVtcGxveWVlLHRoaXMucHJvcHMudGltZXNoZWV0LCBlLnRhcmdldC52YWx1ZSk7XG5cdFx0fVxuXHR9XG5cdGRlbGV0ZShlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5wcm9wcy5kZWxldGVFbXBsb3llZSh0aGlzLnByb3BzLmVtcGxveWVlLHRoaXMucHJvcHMudGltZXNoZWV0KTtcblx0fVxuXHRrZXlQcmVzc2VkU3RhcnQoZSkge1xuXHQgICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSB7XG5cdCAgICBcdGUucHJldmVudERlZmF1bHQoKTtcblx0ICAgIFx0aWYodGhpcy5wcm9wcy5zdGFydCE9Jycpe1xuXHRcdFx0XHR0aGlzLnByb3BzLnVwZGF0ZVRpbWUoJ3N0YXJ0Jyx0aGlzLnByb3BzLmVtcGxveWVlLHRoaXMucHJvcHMudGltZXNoZWV0LCB0aGlzLnByb3BzLnN0YXJ0KTtcblx0XHRcdH1cblx0ICAgIH1cblx0IH1cblx0a2V5UHJlc3NlZEVuZChlKSB7XG5cdCAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcblx0ICAgIFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHQgICAgXHRpZih0aGlzLnByb3BzLmVuZCE9Jycpe1xuXHRcdFx0XHR0aGlzLnByb3BzLnVwZGF0ZVRpbWUoJ3N0YXJ0Jyx0aGlzLnByb3BzLmVtcGxveWVlLHRoaXMucHJvcHMudGltZXNoZWV0LCB0aGlzLnByb3BzLmVuZCk7XG5cdFx0XHR9XG5cdCAgICB9XG5cdCB9XG5cdHJlbmRlcigpe1xuXHRcdHJldHVybihcblx0XHRcdDxsaSBjbGFzc05hbWU9XCJsaXN0LWdyb3VwLWl0ZW1cIiA+XG5cdFx0XHRcdDxmb3JtICBjbGFzc05hbWU9XCJmb3JtLWlubGluZSByb3cgZGF5X3RpbWVfZm9ybV9yb3dcIj5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbCBjb2wtbWQtMyBjb2wtc20tMyBjb2wteHMtMTIgdGV4dC1jZW50ZXIgZGF5X3RpbWVfZm9ybV9yb3dfZWxlbWVudFwiPjxzdHJvbmc+eyB0aGlzLnByb3BzLmVtcGxveWVlX25hbWV9PC9zdHJvbmc+PC9sYWJlbD5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTMgY29sLXNtLTMgY29sLXhzLTYgZGF5X3RpbWVfZm9ybV9yb3dfZWxlbWVudFwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cFwiPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwLWFkZG9uXCI+U3RhcnQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGlucHV0IFxuXHRcdFx0XHRcdFx0XHRcdHR5cGU9XCJ0aW1lXCIgXG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIHN0YXJ0XCIgXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU9e3RoaXMucHJvcHMuc3RhcnR9XG5cdFx0XHRcdFx0XHRcdFx0b25CbHVyPXt0aGlzLnVwZGF0ZVN0YXJ0fVxuXHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmNoYW5nZWRTdGFydH1cblx0XHRcdFx0XHRcdFx0XHRvbktleVByZXNzPXt0aGlzLmtleVByZXNzZWRTdGFydH1cblxuXHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtMyBjb2wtc20tMyBjb2wteHMtNiBkYXlfdGltZV9mb3JtX3Jvd19lbGVtZW50XCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAtYWRkb25cIj5FbmQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGlucHV0IFxuXHRcdFx0XHRcdFx0XHRcdHR5cGU9XCJ0aW1lXCIgXG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIGVuZFwiIFxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlPXt0aGlzLnByb3BzLmVuZH1cblx0XHRcdFx0XHRcdFx0XHRvbkJsdXI9e3RoaXMudXBkYXRlRW5kfVxuXHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmNoYW5nZWRFbmR9XG5cdFx0XHRcdFx0XHRcdFx0b25LZXlQcmVzcz17dGhpcy5rZXlQcmVzc2VkRW5kfVxuXHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC0zIGNvbC1zbS0zIGNvbC14cy0xMiB0ZXh0LWNlbnRlciBkYXlfdGltZV9mb3JtX3Jvd19lbGVtZW50XCI+XG5cdFx0XHRcdFx0XHQ8YnV0dG9uIFxuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJkZWxldGUgYnRuIGJ0bi1kYW5nZXJcIlxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLmRlbGV0ZX1cblx0XHRcdFx0XHRcdD5EZWxldGU8L2J1dHRvbj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9mb3JtPlxuXHRcdFx0PC9saT5cblx0XHQpO1xuXHR9XG59IiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbWVTaGVldCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHQvKiAgICAgRG8gdGhlIGJpbmQgdGhpbmcgICAgICAqL1xuXHRcdHRoaXMuYXV0b2NvbXBsZXRlPXRoaXMuYXV0b2NvbXBsZXRlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5hZGRDaGFuZ2VkPXRoaXMuYWRkQ2hhbmdlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuYWRkQ2xpY2tlZD10aGlzLmFkZENsaWNrZWQuYmluZCh0aGlzKTtcblx0fVxuXG5cdGF1dG9jb21wbGV0ZShpbnB1dCl7XG5cdFx0dmFyIGNvbmZpZyA9IHtcblx0XHRcdG1pbkNoYXJzOiAwLFxuXHRcdFx0bWF4SXRlbXM6IDk5LFxuXHRcdFx0YXV0b0ZpcnN0OiB0cnVlLFxuXHRcdFx0aXRlbTogZnVuY3Rpb24oaXRlbSwgaW5wdXQpIHtcblx0XHRcdFx0dmFyIGQgPSBpdGVtO1xuXHRcdFx0XHR2YXIgaHRtbCA9IFwiPHNwYW4+XCIgKyBfXyhpdGVtLmxhYmVsKSsgXCI8L3NwYW4+PGJyPjxzcGFuPjxzbWFsbD5cIitpdGVtLnZhbHVlK1wiPC9zbWFsbD48L3NwYW4+XCI7XG5cdFx0XHRcdHJldHVybiAkKCc8bGk+PC9saT4nKVxuXHRcdFx0XHRcdC5kYXRhKCdpdGVtLmF1dG9jb21wbGV0ZScsIGl0ZW0pXG5cdFx0XHRcdFx0Lmh0bWwoJzxhPjxwPicgKyBodG1sICsgJzwvcD48L2E+Jylcblx0XHRcdFx0XHQuZ2V0KDApO1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0dmFyIGF3ID0gbmV3IEF3ZXNvbXBsZXRlKGlucHV0LGNvbmZpZyk7XG5cdFx0aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRcdCdhd2Vzb21wbGV0ZS1zZWxlY3Rjb21wbGV0ZScsXG5cdFx0XHRcdHRoaXMuYWRkQ2hhbmdlZFxuXHRcdCk7XG5cdFx0YXcubGlzdD1wcy5lbXBsb3llZV9sYWJsZXNcblx0XHQkKGRvY3VtZW50KS5iaW5kKCdlbXBsb3llZUxhYmxlc0xvYWRlZCcsZnVuY3Rpb24oKXtcblx0XHRcdGF3Lmxpc3Q9cHMuZW1wbG95ZWVfbGFibGVzO1xuXHRcdH0pO1xuXHR9XG5cdGFkZENoYW5nZWQoZSl7XG5cdFx0dGhpcy5hZGQ9ZS50YXJnZXQudmFsdWU7XG5cdH07XG5cdGFkZENsaWNrZWQoZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHZhciB3b19uYW1lPXRoaXMucHJvcHMubmFtZTtcblx0XHR2YXIgZW1wbG95ZWVfbmFtZT10aGlzLmFkZDtcblx0XHQvL0NhbGwgYmFjayBmb3IgYmluZGluZz9cblx0XHR2YXIgdXBkYXRlQ2FsbGJhY2s9ZnVuY3Rpb24oaW5kZXgpe1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKGRhdGEpe1x0XHRcdFxuXHRcdFx0XHR0aGlzLnVwZGF0ZUZyb21TZXJ2ZXJQYXJhbShkYXRhLGluZGV4KTtcblx0XHRcdH0uYmluZCh0aGlzKTtcblx0XHR9LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5wcm9wcy5hZGRFbXBsb3llZSh3b19uYW1lLCBlbXBsb3llZV9uYW1lKTtcblx0fTtcblx0cmVuZGVyKCl7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYW5lbCBwYW5lbC1kZWZhdWx0IHJvd1wiPlxuXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtaGVhZGluZ1wiPlxuXHRcdFx0XHRcdDxoNCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPiBUaW1lIFNoZWV0IHt0aGlzLnByb3BzLmRhdGV9IGZvciB7dGhpcy5wcm9wcy5jcmV3fSA8L2g0PlxuXHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHQ8dWwgY2xhc3NOYW1lPVwibGlzdC1ncm91cFwiID5cblx0XHRcdFx0XHQ8ZGl2IGlkPSdmb3Jtcyc+XG5cdFx0XHRcdFx0XHR7dGhpcy5wcm9wcy5lbXBsb3llZXN9XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvdWw+XG5cdFx0XHQgIFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWZvb3RlciBjb2wtbWQtMTIgdGV4dC1sZWZ0IGxpc3QtZ3JvdXAtaXRlbVwiPlxuXHRcdFx0XHRcdDxmb3JtIGNsYXNzTmFtZT1cImZvcm0taW5saW5lIHJvdyBcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgY29sLW1kLTMgY29sLXNtLTIgY29sLXhzLTEyIHVwZGF0ZV9kaXZfZWxlbWVudFwiPlxuXHRcdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXN1Y2Nlc3NcIj5VcGRhdGU8L2J1dHRvbj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXJpZ2h0IGNvbC1tZC02IGNvbC1zbS02IGNvbC14cy00IFwiPlxuXHRcdFx0XHRcdFx0XHQ8YnV0dG9uIFxuXHRcdFx0XHRcdFx0XHRcdHR5cGU9XCJzdWJtaXRcIiBcblx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHRcIlxuXHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMuYWRkQ2xpY2tlZH1cblx0XHRcdFx0XHRcdFx0XHQ+KyBBZGQ8L2J1dHRvbj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIHRleHQtbGVmdCBjb2wtbWQtMyBjb2wtc20tNCBjb2wteHMtNiBcIj48ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwidGV4dFwiIFxuXHRcdFx0XHRcdFx0XHRcdHJlZj17dGhpcy5hdXRvY29tcGxldGV9XG4gICAgICAgICAgXHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuYWRkQ2hhbmdlZH0gXG4gICAgICAgICAgXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwibmV3X2VtcGxveWVlcyBmb3JtLWNvbnRyb2wgYXdlc29tcGxldGVcIiBcbiAgICAgICAgICBcdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj1cImVtcGxveWVlXCIgLz5cblx0XHRcdFx0XHRcdDwvZGl2PjwvZGl2PlxuXHRcdFx0XHRcdDwvZm9ybT5cblx0XHRcdFx0XHRcblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbiIsIi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuaW1wb3J0IFdvcmtvcmRlclRhc2sgZnJvbSAnLi93b3Jrb3JkZXJUYXNrJztcblxuaW1wb3J0IEZvcm0gZnJvbSAnLi4vdXRpbHMvZm9ybXMnXG5pbXBvcnQgTW9kYWwgZnJvbSAnLi4vdXRpbHMvbW9kYWwnXG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXlzV29ya29yZGVycyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR2YXIgYXJncz17fTtcblx0XHRhcmdzLmNyZXc9dGhpcy5wcm9wcy5jcmV3O1xuXHRcdGFyZ3MuZGF0ZT10aGlzLnByb3BzLmRhdGU7XG5cdFx0LyogICBEbyB0aGUgYmluZCB0aGluZyAgKi9cblx0XHR0aGlzLm9uVGFza0NoZWNrZWQ9dGhpcy5vblRhc2tDaGVja2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5vblN0YXR1c0NoYW5nZWQ9dGhpcy5vblN0YXR1c0NoYW5nZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLndvcmtPcmRlckNoYW5nZWQ9dGhpcy53b3JrT3JkZXJDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5zb2NrZXRVcGRhdGU9dGhpcy5zb2NrZXRVcGRhdGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM9dGhpcy5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jcmVhdGVXb3Jrb3JkZXI9dGhpcy5jcmVhdGVXb3Jrb3JkZXIuYmluZCh0aGlzKTtcblx0XHQvL3RoaXMud29ya29yZGVyT2JqPXRoaXMub25TdGF0dXNDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0LyogICAgICAgICAgZW5kICAgICAgICAgICovXG5cblx0XHR0aGlzLnN0YXRlPXt3b3Jrb3JkZXJzOltdfTtcblxuXHRcdHZhciBhcmdzPXt9O1xuXHRcdGFyZ3MuY3Jldz10aGlzLnByb3BzLmNyZXc7XG5cdFx0YXJncy5kYXRlPXRoaXMucHJvcHMuZGF0ZTtcblx0XHR0aGlzLndvcmtvcmRlclRvb2wgPSBuZXcgcHMuYXBpVG9vbChhcmdzLHBzLmFwaVNldHVwLndvcmtPcmRlcnMsdGhpcy53b3JrT3JkZXJDaGFuZ2VkKTtcblx0XHRpZiAodGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zPT09dW5kZWZpbmVkIHx8dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zPT09IDAgfHx0aGlzLndvcmtvcmRlclRvb2wuaXRlbXM9PT1udWxsICl7XG5cdFx0fWVsc2V7XG5cdFx0XHR0aGlzLnN0YXRlLndvcmtvcmRlcnM9dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zO1xuXHRcdH1cblxuXHR9XG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtcblxuXHRcdGlmKG5leHRQcm9wcy5jcmV3IT10aGlzLnByb3BzLmNyZXcgfHwgbmV4dFByb3BzLmRhdGUhPXRoaXMucHJvcHMuZGF0ZSApe1xuXG5cdFx0XHR2YXIgYXJncz17fTtcblx0XHRcdGFyZ3MuY3Jldz1uZXh0UHJvcHMuY3Jldztcblx0XHRcdGFyZ3MuZGF0ZT1uZXh0UHJvcHMuZGF0ZTtcblx0XHRcdHRoaXMud29ya29yZGVyVG9vbCA9IG5ldyBwcy5hcGlUb29sKGFyZ3MscHMuYXBpU2V0dXAud29ya09yZGVycyx0aGlzLndvcmtPcmRlckNoYW5nZWQpO1xuXHRcdFx0aWYgKHRoaXMud29ya29yZGVyVG9vbC5pdGVtcz09PXVuZGVmaW5lZCB8fHRoaXMud29ya29yZGVyVG9vbC5pdGVtcz09PSAwIHx8dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zPT09bnVsbCApe1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHt3b3Jrb3JkZXJzOltdfSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7d29ya29yZGVyczp0aGlzLndvcmtvcmRlclRvb2wuaXRlbXN9KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRzb2NrZXRVcGRhdGUoKXtcblxuXHR9XG5cdG9uVGFza0NoZWNrZWQod29faW5kZXgsaW5kZXgsY2hlY2spe1xuXHRcdHRoaXMud29ya29yZGVyVG9vbC5pdGVtc1t3b19pbmRleF0uc3VidGFza1tpbmRleF0uc3RhdHVzPWNoZWNrPzA6MTtcblx0XHR0aGlzLnNldFN0YXRlKHt3b3Jrb3JkZXJzOnRoaXMud29ya29yZGVyVG9vbC5pdGVtc30pO1xuXHRcdHRoaXMud29ya29yZGVyVG9vbC51cGRhdGUodGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zW3dvX2luZGV4XSk7XG5cdFx0dmFyIGNoZWNrZWRUZXh0PWNoZWNrP1widW5jaGVja2VkLlwiOlwiY2hlY2tlZC5cIlxuXHRcdC8vcHMuc3VjY2Vzc0FsZXJ0KHRoaXMud29ya29yZGVyVG9vbC5pdGVtc1t3b19pbmRleF0uc3VidGFza1tpbmRleF0udGFzayArXCIgXCIrIGNoZWNrZWRUZXh0ICk7XG5cdH1cblx0b25TdGF0dXNDaGFuZ2VkKHN0YXR1cywgaW5kZXgpe1xuXHRcdHRoaXMud29ya29yZGVyVG9vbC5pdGVtc1tpbmRleF0uc3RhdHVzPXN0YXR1cztcblx0XHR0aGlzLnNldFN0YXRlKHt3b3Jrb3JkZXJzOnRoaXMud29ya29yZGVyVG9vbC5pdGVtc30pO1xuXHRcdHRoaXMud29ya29yZGVyVG9vbC51cGRhdGUodGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zW2luZGV4XSk7XG5cdFx0aWYoc3RhdHVzPT1cIkNvbXBsZXRlXCIpe1xuXHRcdFx0cHMuc3VjY2Vzc0FsZXJ0KFwiV29ya29yZGVyIGNvbXBsZXRlZCFcIik7XG5cdFx0fVxuXHR9XG5cdHdvcmtPcmRlckNoYW5nZWQoKXtcblxuXHRcdGlmICh0aGlzLndvcmtvcmRlclRvb2wuaXRlbXMhPT1udWxsKXtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3dvcmtvcmRlcnM6dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zfSk7XG5cdFx0XHRpZih0aGlzLnByb3BzLnN0YXR1c1VwZGF0ZSAhPT0gdW5kZWZpbmVkKXtcblx0XHRcdFx0dGhpcy5wcm9wcy5zdGF0dXNVcGRhdGUodGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zKTtcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3dvcmtvcmRlcnM6W119KTtcblx0XHR9XG5cblx0fVxuXHRjcmVhdGVXb3Jrb3JkZXIoaXRlbSl7XG5cdFx0aXRlbS5kYXRlPW1vbWVudChpdGVtLmRhdGUsXCJNTS9ERC9ZWVlZXCIpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xuXHRcdHRoaXMud29ya29yZGVyVG9vbC5jcmVhdGUoaXRlbSxmdW5jdGlvbihpdGVtKXtcblx0XHRcdHBzLnN1Y2Nlc3NBbGVydChcIldvcmtvcmRlciBcIiAraXRlbS5uYW1lKyBcIiBjcmVhdGVkLlwiKVxuXHRcdH0pO1xuXG5cdH1cblx0d29ya29yZGVyT2JqKGl0ZW0saW5kZXgpe1xuXHRcdHJldHVybihcblx0XHRcdDxXb3Jrb3JkZXJUYXNrIFxuXHRcdFx0XHRrZXk9e2luZGV4ICsgdGhpcy5wcm9wcy5jcmV3fSBcblx0XHRcdFx0aW5kZXg9e2luZGV4fSBcblx0XHRcdFx0bG9jYXRpb25fcm91dGU9e2l0ZW0ubG9jYXRpb25fcm91dGV9XG5cdFx0XHRcdGxvY2F0aW9uPXtpdGVtLmxvY2F0aW9ufVxuXHRcdFx0XHR0YXNrcz17aXRlbS5zdWJ0YXNrfVxuXHRcdFx0XHRzdGF0dXM9e2l0ZW0uc3RhdHVzfVxuXHRcdFx0XHR0eXBlPXtpdGVtLnR5cGV9XG5cdFx0XHRcdHdvcmtvcmRlcj17aXRlbS5uYW1lfVxuXHRcdFx0XHRvblRhc2tDaGVja2VkPXt0aGlzLm9uVGFza0NoZWNrZWR9XG5cdFx0XHRcdG9uU3RhdHVzQ2hhbmdlZD17dGhpcy5vblN0YXR1c0NoYW5nZWR9XG5cdFx0XHRcdHJvdXRlPXtpdGVtLnJvdXRlfVxuXHRcdFx0Lz5cblx0XHQpO1xuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyAgICAgICAgUmVuZGVyXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0cmVuZGVyKCl7XG5cdFx0aWYgKHRoaXMuc3RhdGUud29ya29yZGVycz09PTB8fHRoaXMuc3RhdGUud29ya29yZGVycz09PXVuZGVmaW5lZCl7XG5cdFx0XHRyZXR1cm4gKDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj48aDM+Tm8gV29ya29yZGVyczwvaDM+PC9kaXY+KTtcblx0XHR9XG5cdFx0dmFyIHRvZG89W107XG5cdFx0dmFyIGNvbXBsZXRlPVtdO1xuXHRcdHRoaXMuc3RhdGUud29ya29yZGVycy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXHRcdFx0aWYgKGl0ZW0uc3RhdHVzIT0nQ29tcGxldGUnJiZpdGVtLnN0YXR1cyE9J0luY29tcGxldGUnKXtcblx0XHRcdFx0dG9kby5wdXNoKHRoaXMud29ya29yZGVyT2JqKGl0ZW0saW5kZXgpKTtcblx0XHRcdFx0aWYodG9kby5sZW5ndGgrMSU0PT09MCl7XG5cblx0XHRcdFx0XHR0b2RvLnB1c2goPGRpdiBjbGFzc05hbWU9J2NsZWFyZml4IHNwYWNlcic+PC9kaXY+KVxuXHRcdFx0XHR9XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Y29tcGxldGUucHVzaCh0aGlzLndvcmtvcmRlck9iaihpdGVtLGluZGV4KSk7XG5cdFx0XHRcdGlmKGNvbXBsZXRlLmxlbmd0aCUzPT09MCl7Y29tcGxldGUucHVzaCg8ZGl2IGNsYXNzTmFtZT0nY2xlYXJmaXggc3BhY2VyJz48L2Rpdj4pfVxuXHRcdFx0fVxuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0dmFyIGNvbXBsZXRlSGVhZGVyPSg8aDM+Q29tcGxldGUgV29yayBPcmRlcnM8L2gzPik7XG5cdFx0aWYoY29tcGxldGUubGVuZ3RoPT0wKXtcblx0XHRcdGNvbXBsZXRlSGVhZGVyPVwiXCI7XG5cdFx0fVxuXG5cdFx0Ly8gdmFyIGRhdGU9dGhpcy5wcm9wcy5kYXRlO1xuXHRcdC8vIGRhdGU9bW9tZW50KGRhdGUsJ1lZWVktTU0tREQnKS5mb3JtYXQoXCJNTS9ERC9ZWVlZXCIpO1xuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwid29ya29yZGVyX2NvbnRhaW5lclwiPlxuXHRcdFx0XHQ8ZGl2Pjxici8+XG5cdFx0XHRcdFx0e3RvZG99XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNsZWFyZml4XCI+PC9kaXY+XG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0e2NvbXBsZXRlSGVhZGVyfVxuXHRcdFx0XHRcdHtjb21wbGV0ZX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj48L2Rpdj5cblx0XHRcdFx0PGJyLz5cblx0XHRcdFx0PFdvcmtvcmRlckZvcm1Nb2RhbFxuXHRcdFx0XHRcdGlkPXtcImNyZWF0ZS13by1cIit0aGlzLnByb3BzLmNyZXcucmVwbGFjZShcIiBcIixcIi1cIil9XG5cdFx0XHRcdFx0Y3Jldz17dGhpcy5wcm9wcy5jcmV3fVxuXHRcdFx0XHRcdGRhdGU9e21vbWVudCh0aGlzLnByb3BzLmRhdGUsJ1lZWVktTU0tREQnKS5mb3JtYXQoXCJNTS9ERC9ZWVlZXCIpfVxuXHRcdFx0XHRcdGNyZWF0ZVdvcmtvcmRlcj17dGhpcy5jcmVhdGVXb3Jrb3JkZXJ9XG5cdFx0XHRcdC8+XG5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cblx0fTtcdFxufVxuXG5leHBvcnQgY2xhc3MgV29ya29yZGVyRm9ybU1vZGFsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXG5cdFx0dGhpcy5zdWJtaXQ9dGhpcy5zdWJtaXQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnN0YXRlPXtcblx0XHRcdGxvY2F0aW9uOlwiXCIsXG5cdFx0XHRwcmlvcml0eToxLFxuXHRcdFx0dHlwZTpcIlBydW5pbmdcIixcblx0XHRcdHN0YXR1czpcIlBlbmRpbmdcIixcblx0XHRcdGRhdGU6dGhpcy5wcm9wcy5kYXRlLFxuXHRcdFx0Y3Jldzp0aGlzLnByb3BzLmNyZXdcblx0XHR9XG5cdH1cblxuXHRzdWJtaXQoZSl7XG5cdFx0aWYodGhpcy5zdGF0ZS5sb2NhdGlvbj09XCJcIiB8fHRoaXMuc3RhdGUuY3Jldz09XCJcIiB8fCAobW9tZW50KHRoaXMuc3RhdGUuZGF0ZSxcIk1NL0REL1lZWVlcIikuaXNWYWxpZCgpKSE9PXRydWUpe1xuXHRcdFx0Y29uc29sZS5sb2coXCJub3QgdmFsaWRcIik7XG5cdFx0fWVsc2V7XG5cdFx0XHR2YXIgY29weT1wcy5jbG9uZSh0aGlzLnN0YXRlKTtcblx0XHRcdCQoJyMnKyB0aGlzLnByb3BzLmlkKS5tb2RhbCgnaGlkZScpXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtsb2NhdGlvbjpcIlwifSlcblx0XHRcdHRoaXMucHJvcHMuY3JlYXRlV29ya29yZGVyKGNvcHkpO1xuXHRcdH1cblx0fVxuXHRyZW5kZXIoKXtcblx0XHR2YXIgZmllbGRzPVtcdFx0XG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiYXV0b0NvbXBsZXRlXCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtsb2NhdGlvbjplLnRhcmdldC52YWx1ZX0pXG5cdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0dmFsdWU6dGhpcy5zdGF0ZS5sb2NhdGlvbixcblx0XHRcdFx0cmVxdWlyZWQ6dHJ1ZSxcblx0XHRcdFx0bGFibGU6XCJWaW5leWFyZFwiLFxuXHRcdFx0XHRkb2N0eXBlOlwiVmluZXlhcmRcIixcblx0XHRcdFx0ZG9jdmFsdWU6XCJuYW1lXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiaW5wdXRcIixcblx0XHRcdFx0Y2xhc3NOYW1lOlwidmluZXlhcmQtaW5wdXRcIixcblx0XHRcdFx0dHlwZTpcIm51bWJlclwiLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7cHJpb3JpdHk6ZS50YXJnZXQudmFsdWV9KVxuXHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdHZhbHVlOnRoaXMuc3RhdGUucHJpb3JpdHksXG5cdFx0XHRcdGxhYmxlOlwiUHJpb3JpdHlcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJkYXRlXCIsXG5cdFx0XHRcdHJlcXVpcmVkOnRydWUsXG5cdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtkYXRlOmUudGFyZ2V0LnZhbHVlfSk7XG5cdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0dmFsdWU6dGhpcy5zdGF0ZS5kYXRlLFxuXHRcdFx0XHRsYWJsZTpcIkRhdGVcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJzZWxlY3RcIixcblx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3R5cGU6ZS50YXJnZXQudmFsdWV9KVxuXHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdHZhbHVlOnRoaXMuc3RhdGUudHlwZSxcblx0XHRcdFx0bGFibGU6XCJUeXBlXCIsXG5cdFx0XHRcdG9wdGlvbnM6W1xuXHRcdFx0XHRcdFwiV2F0ZXJpbmdcIixcblx0XHRcdFx0XHRcIlBydW5pbmdcIixcblx0XHRcdFx0XHRcIlJlcGFpclwiLFxuXHRcdFx0XHRcdFwiU3ByYXlpbmdcIlxuXHRcdFx0XHRdXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcInNlbGVjdFwiLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7c3RhdHVzOmUudGFyZ2V0LnZhbHVlfSlcblx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHR2YWx1ZTp0aGlzLnN0YXRlLnN0YXR1cyxcblx0XHRcdFx0bGFibGU6XCJTdGF0dXNcIixcblx0XHRcdFx0ZGlzYWJsZWQ6dHJ1ZSxcblx0XHRcdFx0b3B0aW9uczpbXG5cdFx0XHRcdFx0XCJQZW5kaW5nXCJcblx0XHRcdFx0XVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJhdXRvQ29tcGxldGVcIixcblx0XHRcdFx0b25DaGFuZ2U6IHRoaXMuc29tZUZ1bmN0aW9uLFxuXHRcdFx0XHRsYWJsZTpcIkNyZXdcIixcblx0XHRcdFx0cmVxdWlyZWQ6dHJ1ZSxcblx0XHRcdFx0cmVhZG9ubHk6XCJ0dXJlXCIsXG5cdFx0XHRcdGRvY3R5cGU6XCJDcmV3XCIsXG5cdFx0XHRcdGRvY3ZhbHVlOlwibmFtZVwiLFxuXHRcdFx0XHRkb2NsYWJsZTpcImNyZXdfbGVhZF9mdWxsX25hbWVcIixcblx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe2NyZXc6ZS50YXJnZXQudmFsdWV9KVxuXHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdHZhbHVlOnRoaXMuc3RhdGUuY3Jldyxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiYnV0dG9uXCIsXG5cdFx0XHRcdHR5cGU6XCJzdWJtaXRcIixcblx0XHRcdFx0dmFsdWU6XCJDcmVhdGUgV29yayBPcmRlclwiLFxuXHRcdFx0XHRjbGFzc05hbWU6XCJidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIsXG5cdFx0XHRcdG9uQ2xpY2s6dGhpcy5zdWJtaXRcblx0XHRcdH1cblxuXG5cdFx0XVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2Plx0XHRcdFx0XG5cdFx0XHRcdDxhIFxuXHRcdFx0XHRcdGhyZWY9XCIjXCIgXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCJcblx0XHRcdFx0XHRvbkNsaWNrPXtmdW5jdGlvbigpeyQoJyMnKyB0aGlzLnByb3BzLmlkKS5tb2RhbCgpfS5iaW5kKHRoaXMpfVxuXHRcdFx0XHRcdD5cblx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLXBsdXNcIj48L3NwYW4+IE5ldyBXb3JrIE9yZGVyPC9hPlxuXHRcdFx0XHQ8TW9kYWwgXG5cdFx0XHRcdFx0aWQ9e3RoaXMucHJvcHMuaWR9IFxuXHRcdFx0XHRcdHN1Ym1pdFRleHQ9XCJTdWJtaXRcIiBcblx0XHRcdFx0XHR0aXRsZT1cIkNyZWF0ZSBOZXcgV29ya29yZGVyXCJcblx0XHRcdFx0XHRzdWJtaXQ9e2ZhbHNlfVxuXHRcdFx0XHRcdD5cblxuXHRcdFx0XHRcdDxGb3JtXG5cdFx0XHRcdFx0XHRpZD1cIkNyZWF0ZVdvcmtvcmRlckZvcm1cIlxuXHRcdFx0XHRcdFx0dHlwZT1cImhvcml6b250YWxcIlxuXHRcdFx0XHRcdFx0ZmllbGRzPXtmaWVsZHN9XG5cblx0XHRcdFx0XHQvPlxuXG5cdFx0XHRcdDwvTW9kYWw+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG4iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDcmVhdGVJc3N1ZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKVxuXHRcdHRoaXMubW9kYWxOZXdJc3N1ZT10aGlzLm1vZGFsTmV3SXNzdWUuYmluZCh0aGlzKTtcblx0XHR0aGlzLm1vZGFsRWRpdElzc3VlPXRoaXMubW9kYWxFZGl0SXNzdWUuYmluZCh0aGlzKTtcblx0fVxuXHR0b29sVGlwKCl7XG5cdFx0JChmdW5jdGlvbiAoKSB7XG5cdFx0IFx0JCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoKTtcblx0XHR9KVxuXHR9XG5cdG1vZGFsTmV3SXNzdWUoZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMucHJvcHMuYWN0aXZhdGVNb2RhbE5ldygpO1xuXHR9XG5cdG1vZGFsRWRpdElzc3VlKGl0ZW0sZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGNvbnNvbGUubG9nKGl0ZW0pXG5cdFx0dGhpcy5wcm9wcy5hY3RpdmF0ZU1vZGFsRWRpdChpdGVtKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHRcdFx0XHQvLyBcdFx0ZGF0YS10b2dnbGU9XCJtb2RhbFwiIFxuXHRcdFx0XHRcdC8vIGRhdGEtdGFyZ2V0PXtcIiNcIit0aGlzLnBvcFVwSWR9XG5cdFx0XHRcdCAvLyBcdGFyaWEtbGFiZWw9XCJDcmVhdGUgSXNzdWVcIiBcblx0XHRcdFx0IC8vIFx0ZGF0YS10b2dnbGU9XCJ0b29sdGlwXCIgXG5cdFx0XHRcdCAvLyBcdGRhdGEtcGxhY2VtZW50PVwidG9wXCIgXG5cdFx0XHRcdCAvLyBcdHRpdGxlPVwiSXNzdWVcIiBcblx0XHRcdFx0XHQvLyByZWY9e3RoaXMudG9vbFRpcH1cdFx0XHRcdFx0Ly8gb25DbGljaz17IHRoaXMucG9wVXB9ID5cblx0XHR2YXIgZHJvcGRvd25JdGVtcz1bXTtcblx0XHRpZih0aGlzLnByb3BzLmlzc3VlcyE9PW51bGwpe1xuXHRcdFx0dGhpcy5wcm9wcy5pc3N1ZXMubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblx0XHRcdFx0aWYgKGl0ZW0uc3RhdHVzID09J1N1Ym1pdHRlZCcgfHwgaXRlbS5zdGF0dXM9PSdBc3NpZ25lZCcpe1xuXHRcdFx0XHRcdGRyb3Bkb3duSXRlbXMucHVzaChcblx0XHRcdFx0XHRcdDxsaSBrZXk9e2luZGV4fT4gXG5cdFx0XHRcdFx0XHRcdDxhIGNsYXNzTmFtZT1cImRyb3Bkb3duLWl0ZW1cIiBcblx0XHRcdFx0XHRcdFx0XHRocmVmPVwiI1wiIFxuXHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMubW9kYWxFZGl0SXNzdWUuYmluZCh0aGlzLGl0ZW0pfSBcblx0XHRcdFx0XHRcdFx0PntpdGVtLnRpdGxlfTwvYT5cblx0XHRcdFx0XHRcdDwvbGk+KTtcblx0XHRcdFx0fVxuXHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHR9XG5cdFx0dmFyIGlzc3VlQ291bnQ9XCIgXCI7XG5cdFx0aWYodGhpcy5wcm9wcy5pc3N1ZXMhPT1udWxsKXtcblx0XHRcdGlzc3VlQ291bnQ9KHRoaXMucHJvcHMuaXNzdWVzLmxlbmd0aD09PTApP1wiXCI6dGhpcy5wcm9wcy5pc3N1ZXMubGVuZ3RoK1wiIFwiO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImRyb3Bkb3duIGRyb3Bkb3duLXBhbmVsLXJpZ2h0XCI+XG5cblx0XHRcdFx0PGJ1dHRvblxuXHRcdFx0XHRcdGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdCBidG4teHMgZHJvcGRvd24tdG9nZ2xlIGZ1bGwtaGVhZGVyLWJ1dHRvbiBjb3JuZXJcIiBcblx0XHRcdFx0XHR0eXBlPVwiYnV0dG9uXCIgXG5cdFx0XHRcdFx0ZGF0YS10b2dnbGU9XCJkcm9wZG93blwiIFxuXHRcdFx0XHRcdGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCIgXG5cdFx0XHRcdFx0YXJpYS1leHBhbmRlZD1cImZhbHNlXCIgPlxuXG5cdFx0XHRcdCBcdHtpc3N1ZUNvdW50fTxzcGFuIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tZXhjbGFtYXRpb24tc2lnblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cblx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdDx1bCBjbGFzc05hbWU9XCJkcm9wZG93bi1tZW51XCI+XG5cdFx0XHRcdCAgICA8bGkgY2xhc3NOYW1lPVwiZHJvcGRvd24taGVhZGVyXCI+SXNzdWVzPC9saT5cblx0XHRcdFx0ICAgIHtkcm9wZG93bkl0ZW1zfVxuXHRcdFx0XHQgICAgPGxpIHJvbGU9XCJzZXBhcmF0b3JcIiBjbGFzc05hbWU9XCJkaXZpZGVyXCI+PC9saT5cblx0XHRcdFx0ICAgIDxsaT48YSBcblx0XHRcdFx0ICAgIFx0Y2xhc3NOYW1lPVwiZHJvcGRvd24taXRlbVwiXG5cdFx0XHRcdCAgICBcdG9uQ2xpY2s9e3RoaXMubW9kYWxOZXdJc3N1ZX1cblx0XHRcdFx0ICAgIFx0aHJlZj1cIiNcIiA+ICsgTmV3IElzc3VlPC9hPjwvbGk+XG5cdFx0XHRcdDwvdWw+XG5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuXG4iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2tDaGVjayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnRhc2tDaGVja2VkID0gdGhpcy50YXNrQ2hlY2tlZC5iaW5kKHRoaXMpO1xuXHR9XG5cdHRhc2tDaGVja2VkKGUpe1xuXHRcdHRoaXMucHJvcHMudGFza0NoZWNrZWQodGhpcy5wcm9wcy5pbmRleCwgdGhpcy5wcm9wcy5jaGVja2VkKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCBjaGVja2VkID0gdGhpcy5wcm9wcy5jaGVja2VkID8gXCJsaW5lLXRocm91Z2hcIiA6IFwiXCI7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja2JveCByb3dcIj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtOFwiPlxuXHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPXtjaGVja2VkfT5cblx0XHRcdFx0XHQ8aW5wdXQgXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJiaWctY2hlY2tib3hcIiBcblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXtmdW5jdGlvbigpe3RoaXMucHJvcHMudGFza0NoZWNrZWQodGhpcy5wcm9wcy5pdGVtLCBjaGVja2VkKTt9LmJpbmQodGhpcyl9IFxuXHRcdFx0XHRcdFx0dHlwZT1cImNoZWNrYm94XCIgXG5cdFx0XHRcdFx0XHRjaGVja2VkPXt0aGlzLnByb3BzLmNoZWNrZWR9IC8+XG5cdFx0XHRcdFx0e3RoaXMucHJvcHMubGFibGV9XG5cdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImVkaXQgY29sLXhzLTRcIj4gXG5cdFx0XHRcdFx0PGJ1dHRvbiBcblx0XHRcdFx0XHRcdHR5cGU9XCJidXR0b25cIiBcblx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdCBpbmxpbmUtdGFza1wiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLnByb3BzLmVkaXRUYXNrfVxuXHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1lZGl0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxuXHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cdFxufSIsIlxuLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5pbXBvcnQgVGFza0NoZWNrIGZyb20gJy4vdGFza0NoZWNrJ1xuaW1wb3J0IENyZWF0ZUlzc3VlIGZyb20gJy4vY3JlYXRlSXNzdWUnXG5pbXBvcnQgTW9kYWwgZnJvbSAnLi4vdXRpbHMvbW9kYWwnXG5pbXBvcnQge0Zvcm0sIFNlbGVjdH0gZnJvbSAnLi4vdXRpbHMvZm9ybXMnXG5pbXBvcnQge1NwcmF5Rm9ybSxQcnVuaW5nRm9ybX0gZnJvbSAnLi4vdmluZXlhcmQvc3ByYXlGb3JtJ1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdvcmtvcmRlclRhc2sgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5zdGF0ZT17XG5cdFx0XHRpc3N1ZXM6W10sXG5cdFx0XHR0aXRsZTonJyxcblx0XHRcdG1vZGFsOiduZXcnLFxuXHRcdFx0bW9kYWxQcmlvcml0eTonbG93Jyxcblx0XHRcdG1vZGFsVGl0bGU6JycsXG5cdFx0XHRtb2RhbERlc2NyaXB0aW9uOicnLFxuXHRcdFx0bW9kYWxOYW1lOicnXG5cdFx0fTtcblx0XHR0aGlzLnRhc2tDaGVja2VkPXRoaXMudGFza0NoZWNrZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnN0YXR1c0NoYW5nZT10aGlzLnN0YXR1c0NoYW5nZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuYWN0aXZhdGVNb2RhbE5ldz10aGlzLmFjdGl2YXRlTW9kYWxOZXcuYmluZCh0aGlzKTtcblx0XHR0aGlzLmFjdGl2YXRlTW9kYWxFZGl0PXRoaXMuYWN0aXZhdGVNb2RhbEVkaXQuYmluZCh0aGlzKTtcblx0XHRcblx0XHR0aGlzLnN1Ym1pdElzc3VlPXRoaXMuc3VibWl0SXNzdWUuYmluZCh0aGlzKTtcblx0XHR0aGlzLm1vZGFsVGl0bGVDaGFuZ2U9dGhpcy5tb2RhbFRpdGxlQ2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5tb2RhbERlc2NyaXB0aW9uQ2hhbmdlPXRoaXMubW9kYWxEZXNjcmlwdGlvbkNoYW5nZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMubW9kYWxQcmlvcml0eUNoYW5nZT10aGlzLm1vZGFsUHJpb3JpdHlDaGFuZ2UuYmluZCh0aGlzKTtcblx0XHR0aGlzLmlzc3VlQ2hhbmdlZD10aGlzLmlzc3VlQ2hhbmdlZC5iaW5kKHRoaXMpO1xuXG5cblx0XHR0aGlzLm1vZGFsSWQ9XCJpc3N1ZS1mb3JtLVwiK3RoaXMucHJvcHMud29ya29yZGVyO1xuXG5cdFx0XG5cdFx0dGhpcy5pc3N1ZVRvb2wgPSBuZXcgcHMuYXBpVG9vbCh7XCJ3b3JrX29yZGVyXCI6dGhpcy5wcm9wcy53b3Jrb3JkZXJ9LHtkb2N0eXBlOidJc3N1ZSd9LHRoaXMuaXNzdWVDaGFuZ2VkKTtcblxuXG5cdH1cblx0dGFza0NoZWNrZWQoZSl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7dGl0bGU6XCJDSEVDS0VEXCJ9KTtcblx0fVxuXHRpc0NoZWNrZWQodmFsdWUpe1xuICAgIFx0cmV0dXJuICgodmFsdWU9PT10aGlzLnN0YXRlLnNlbGVjdGVkKSA/J2NoZWNrZWQgbGluZS10aHJvdWdoJzonZGVmYXVsdCcpO1xuICBcdH1cbiAgXHR0YXNrQ2hlY2tlZChpbmRleCxjaGVja2VkKXtcbiAgXHRcdHZhciB3b19pbmRleD10aGlzLnByb3BzLmluZGV4O1xuICBcdFx0dGhpcy5wcm9wcy5vblRhc2tDaGVja2VkKHdvX2luZGV4LGluZGV4LGNoZWNrZWQpO1xuICBcdH1cbiAgXHRzdGF0dXNDaGFuZ2UoZSl7XG4gIFx0XHR0aGlzLnByb3BzLm9uU3RhdHVzQ2hhbmdlZChlLnRhcmdldC52YWx1ZSx0aGlzLnByb3BzLmluZGV4KTtcblxuICBcdH1cbiAgXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdFx0XHRJU1NVRSBGVU5DVElPTlNcbiAgXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4gIFx0bW9kYWxUaXRsZUNoYW5nZShlKXtcblx0XHR0aGlzLnNldFN0YXRlKHttb2RhbFRpdGxlOmUudGFyZ2V0LnZhbHVlfSk7XG4gIFx0fVxuXHRtb2RhbFByaW9yaXR5Q2hhbmdlKGUpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe21vZGFsUHJpb3JpdHk6ZS50YXJnZXQudmFsdWV9KTtcblx0fVxuXHRtb2RhbERlc2NyaXB0aW9uQ2hhbmdlKGUpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe21vZGFsRGVzY3JpcHRpb246ZS50YXJnZXQudmFsdWV9KTtcblx0fVxuICBcdGFjdGl2YXRlTW9kYWxOZXcoKXtcbiAgXHRcdHRoaXMuc2V0U3RhdGUoe21vZGFsOlwibmV3XCJ9KTtcblx0XHR0aGlzLnNldFN0YXRlKHttb2RhbFByaW9yaXR5OicnfSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7bW9kYWxEZXNjcmlwdGlvbjonJ30pO1xuXHRcdHRoaXMuc2V0U3RhdGUoe21vZGFsVGl0bGU6Jyd9KTtcbiAgXHRcdCQoJyMnK3RoaXMubW9kYWxJZCkubW9kYWwoKTtcbiAgXHR9XG4gIFx0YWN0aXZhdGVNb2RhbEVkaXQoaXNzdWUpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe21vZGFsOmlzc3VlfSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7bW9kYWxQcmlvcml0eTppc3N1ZS5wcmlvcml0eX0pO1xuXHRcdHRoaXMuc2V0U3RhdGUoe21vZGFsRGVzY3JpcHRpb246aXNzdWUuaXNzdWV9KTtcblx0XHR0aGlzLnNldFN0YXRlKHttb2RhbFRpdGxlOmlzc3VlLnRpdGxlfSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7bW9kYWxOYW1lOmlzc3VlLm5hbWV9KTtcbiAgXHRcdCQoJyMnK3RoaXMubW9kYWxJZCkubW9kYWwoKTtcbiAgXHR9XG4gIFx0aXNzdWVDaGFuZ2VkKCl7XG5cblx0XHR0aGlzLnNldFN0YXRlKHtpc3N1ZXM6dGhpcy5pc3N1ZVRvb2wuaXRlbXN9KTtcblx0fVxuICBcdHN1Ym1pdElzc3VlKGUpe1xuICBcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0dmFyIG5ld0l0ZW09e1xuXHRcdFx0dGl0bGU6dGhpcy5zdGF0ZS5tb2RhbFRpdGxlLFxuXHRcdFx0aXNzdWU6dGhpcy5zdGF0ZS5tb2RhbERlc2NyaXB0aW9uLFxuXHRcdFx0cHJpb3JpdHk6dGhpcy5zdGF0ZS5tb2RhbFByaW9yaXR5LFxuXHRcdFx0dmluZXlhcmQ6dGhpcy5wcm9wcy5sb2NhdGlvbixcblx0XHRcdHdvcmtfb3JkZXI6dGhpcy5wcm9wcy53b3Jrb3JkZXJcblx0XHR9XG5cdFx0aWYodGhpcy5zdGF0ZS5tb2RhbD09XCJuZXdcIil7XG5cdFx0XHR0aGlzLmlzc3VlVG9vbC5jcmVhdGUobmV3SXRlbSxmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0cHMuc3VjY2Vzc0FsZXJ0KFwiSXNzdWUgXCIgK2l0ZW0udGl0bGUrIFwiIGNyZWF0ZWQuXCIpXG5cdFx0XHR9KTtcblx0XHR9ZWxzZXtcblx0XHRcdG5ld0l0ZW0ubmFtZT10aGlzLnN0YXRlLm1vZGFsTmFtZTtcblx0XHRcdHRoaXMuaXNzdWVUb29sLnVwZGF0ZShuZXdJdGVtLGZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0XHRwcy5zdWNjZXNzQWxlcnQoXCJJc3N1ZSBcIiAraXRlbS50aXRsZStcIiB1cGRhdGVkLlwiKVxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdC8vY2xvc2UgbW9kYWxcblx0XHQkKCcjJyt0aGlzLm1vZGFsSWQpLm1vZGFsKCd0b2dnbGUnKTtcblx0fVxuXG5cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3QgdGl0bGU9XCJ3ZWxjb21lXCI7XG5cdFx0dmFyIG1haW5DbGFzcz17XG5cdFx0XHQnQ29tcGxldGUnOidwYW5lbC1zdWNjZXNzJyxcblx0XHRcdCdJbmNvbXBsZXRlJzoncGFuZWwtZGFuZ2VyJyxcblx0XHRcdCdQZW5kaW5nJzoncGFuZWwtZGVmYXVsdCcsXG5cdFx0XHQnU3RhcnRlZCc6J3BhbmVsLXdhcm5pbmcnXG5cdFx0fVt0aGlzLnByb3BzLnN0YXR1c107XG5cdFx0bWFpbkNsYXNzID0gbWFpbkNsYXNzICsgXCIgcGFuZWwgd29ya29yZGVyIHBzLXBhbmVsXCI7XG5cdFx0dmFyIHJvdXRlPSh0aGlzLnByb3BzLnJvdXRlPT09dW5kZWZpbmVkKT9cIk5vdCBDcmVhdGVkXCI6KDxhIGNsYXNzTmFtZT1cIlwiIGhyZWY9e3RoaXMucHJvcHMucm91dGV9Pk1vcmUgSW5mb3JtYXRpb248L2E+KTtcblx0XHR2YXIgdGFza3M9XCJcIjtcblx0XHRpZih0aGlzLnByb3BzLnRhc2tzIT09dW5kZWZpbmVkKXtcblx0XHRcdHRhc2tzPVtdO1xuXHRcdFx0dGhpcy5wcm9wcy50YXNrcy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXHRcdFx0XHR2YXIgY2hlY2tlZD1pdGVtLnN0YXR1cz90cnVlOmZhbHNlO1xuXHRcdFx0XHR0YXNrcy5wdXNoKDxUYXNrQ2hlY2sga2V5PXtpbmRleH0gaW5kZXg9e2luZGV4fSBsYWJsZT17aXRlbS50YXNrfSBjaGVja2VkPXtjaGVja2VkfSB0YXNrQ2hlY2tlZD17dGhpcy50YXNrQ2hlY2tlZH0vPik7XG5cdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0fVxuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPSdjb2wtbWQtNCBjb2wtc20tNCc+XG5cdFx0XHRcdDxNb2RhbCBcblx0XHRcdFx0XHRpZD17dGhpcy5tb2RhbElkfSBcblx0XHRcdFx0XHRzdWJtaXRUZXh0PVwiU3VibWl0XCIgXG5cdFx0XHRcdFx0dGl0bGU9XCJDcmVhdGUgSXNzdWUgRm9yXCJcblx0XHRcdFx0XHRzdWJtaXQ9e3RoaXMuc3VibWl0SXNzdWV9PlxuXG5cdFx0XHRcdFx0XHQ8ZmllbGRzZXQ+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdFx0XHRcdFx0XHRcdDxsYWJlbD5Jc3N1ZSBUaXRsZTwvbGFiZWw+XG5cdFx0XHRcdFx0XHRcdFx0PGlucHV0IFxuXHRcdFx0XHRcdFx0XHRcdFx0dHlwZT1cInRleHRcIiBcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIFxuXHRcdFx0XHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9XCJJc3N1ZSBUaXRsZVwiIFxuXHRcdFx0XHRcdFx0XHRcdFx0dmFsdWU9e3RoaXMuc3RhdGUubW9kYWxUaXRsZX0gXG5cdFx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5tb2RhbFRpdGxlQ2hhbmdlfVxuXHRcdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHRcdFx0XHRcdFx0XHQ8bGFiZWw+UHJpb3JpdHk8L2xhYmVsPlxuXHRcdFx0XHRcdFx0XHRcdDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdmFsdWU9e3RoaXMuc3RhdGUubW9kYWxQcmlvcml0eX0gb25DaGFuZ2U9e3RoaXMubW9kYWxQcmlvcml0eUNoYW5nZS5iaW5kKHRoaXMpfT5cblx0XHRcdFx0XHRcdFx0XHRcdDxvcHRpb24+TG93PC9vcHRpb24+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8b3B0aW9uPk1lZGl1bTwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0XHRcdFx0PG9wdGlvbj5IaWdoPC9vcHRpb24+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8b3B0aW9uPkNyaXRpY2FsPC9vcHRpb24+XG5cdFx0XHRcdFx0XHRcdFx0PC9zZWxlY3Q+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHRcdFx0XHRcdFx0ICBcdDxsYWJlbD5Jc3N1ZSBEZXRhaWxzOjwvbGFiZWw+XG5cdFx0XHRcdFx0XHRcdCAgXHQ8dGV4dGFyZWEgXG5cdFx0XHRcdFx0XHRcdCAgXHRcdGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIFxuXHRcdFx0XHRcdFx0XHQgIFx0XHRyb3dzPVwiM1wiIFxuXHRcdFx0XHRcdFx0XHQgIFx0XHRwbGFjZWhvbGRlcj1cIklzc3VlIERldGFpbHNcIiBcblx0XHRcdFx0XHRcdFx0ICBcdFx0dmFsdWU9e3RoaXMuc3RhdGUubW9kYWxEZXNjcmlwdGlvbn1cblx0XHRcdFx0XHRcdFx0ICBcdFx0b25DaGFuZ2U9e3RoaXMubW9kYWxEZXNjcmlwdGlvbkNoYW5nZX1cblx0XHRcdFx0XHRcdFx0ICBcdD48L3RleHRhcmVhPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDwvZmllbGRzZXQ+XG5cdFx0XHRcdDwvTW9kYWw+XG5cdFx0XHQ8ZGl2IGlkPVwiXCIgY2xhc3NOYW1lPXttYWluQ2xhc3N9PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWhlYWRpbmdcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuXHRcdFx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInBhbmVsLXRpdGxlIGNvbC14cy04XCI+XG5cdFx0XHRcdFx0XHRcdDxhIGNsYXNzTmFtZT1cImZsb2F0LWxlZnRcIiBocmVmPXt0aGlzLnByb3BzLmxvY2F0aW9uX3JvdXRlfT57dGhpcy5wcm9wcy5sb2NhdGlvbn08L2E+XG5cdFx0XHRcdFx0XHQ8L2gzPlxuXG5cblxuXHRcdFx0XHRcdFx0XHQ8Q3JlYXRlSXNzdWVcblx0XHRcdFx0XHRcdFx0XHRpc3N1ZXM9e3RoaXMuc3RhdGUuaXNzdWVzfVxuXHRcdFx0XHRcdFx0XHRcdGFjdGl2YXRlTW9kYWxOZXc9e3RoaXMuYWN0aXZhdGVNb2RhbE5ld31cblx0XHRcdFx0XHRcdFx0XHRhY3RpdmF0ZU1vZGFsRWRpdD17dGhpcy5hY3RpdmF0ZU1vZGFsRWRpdH1cblx0XHRcdFx0XHRcdFx0XHR3b3Jrb3JkZXI9e3RoaXMucHJvcHMud29ya29yZGVyfVxuXG5cdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj48L2Rpdj5cblxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XG5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtYm9keVwiPlxuXHRcdFx0XHRcdDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIHN0YXR1c1wiIHZhbHVlPXt0aGlzLnByb3BzLnN0YXR1c30gb25DaGFuZ2U9e3RoaXMuc3RhdHVzQ2hhbmdlfT5cblx0XHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9XCJQZW5kaW5nXCI+UGVuZGluZzwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIlN0YXJ0ZWRcIj5TdGFydGVkPC9vcHRpb24+XG5cdFx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPVwiQ29tcGxldGVcIj5Db21wbGV0ZTwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIkluY29tcGxldGVcIj5JbmNvbXBsZXRlPC9vcHRpb24+XG5cdFx0XHRcdFx0PC9zZWxlY3Q+XG5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoZWNrX2JveGVzXCI+XG5cblx0XHRcdFx0XHRcdHt0YXNrc31cblx0XHRcdFx0XHRcdDxWaW5leWFyZFRhc2tzIHdvcmtvcmRlcj17dGhpcy5wcm9wcy53b3Jrb3JkZXJ9IHZpbmV5YXJkPXt0aGlzLnByb3BzLmxvY2F0aW9ufS8+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRcdHtyb3V0ZX1cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuXG5cblxuZXhwb3J0IGNsYXNzIFZpbmV5YXJkVGFza3MgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cblx0XHR0aGlzLm1vZGFsTmV3VGFzaz10aGlzLm1vZGFsTmV3VGFzay5iaW5kKHRoaXMpO1xuXHRcdHRoaXMudGFza0NoZWNrZWQ9dGhpcy50YXNrQ2hlY2tlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMudGFza0NoYW5nZWQ9dGhpcy50YXNrQ2hhbmdlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZWRpdFRhc2s9dGhpcy5lZGl0VGFzay5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZ2V0Rm9ybT10aGlzLmdldEZvcm0uYmluZCh0aGlzKTtcblx0XHR0aGlzLm1vZGFsSWQ9XCJ0YXNrLWZvcm1cIit0aGlzLnByb3BzLndvcmtvcmRlcjtcblxuXHRcdHRoaXMudGFza3NUb29sID0gbmV3IHBzLmFwaVRvb2woe1wid29ya19vcmRlclwiOnRoaXMucHJvcHMud29ya29yZGVyfSxwcy5hcGlTZXR1cC52aW5leWFyZFRhc2tzLHRoaXMudGFza0NoYW5nZWQpO1xuXHRcdHRoaXMuc3RhdGU9e1xuXHRcdFx0dGFza3M6dGhpcy50YXNrc1Rvb2wuaXRlbXMsXG5cdFx0XHRmb3JtU3RhdGU6IFwidGFza1R5cGVcIixcblx0XHRcdGZvcm1Nb2RlOlwiY3JlYXRlXCIsXG5cdFx0XHRlZGl0SXRlbTpudWxsXG5cdFx0fTtcblx0fVxuXHRtb2RhbE5ld1Rhc2soKXtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGZvcm1TdGF0ZTpcInRhc2tUeXBlXCIsXG5cdFx0XHRlZGl0SXRlbTpudWxsLFxuXHRcdFx0Zm9ybU1vZGU6XCJjcmVhdGVcIlxuXHRcdH0pO1xuXHRcdCQoJyMnK3RoaXMubW9kYWxJZCkubW9kYWwoKTtcblx0fVxuXHRpc0NoZWNrZWQodmFsdWUpe1xuICAgIFx0Ly9yZXR1cm4gKCh2YWx1ZT09PXRoaXMuc3RhdGUuc2VsZWN0ZWQpID8nY2hlY2tlZCBsaW5lLXRocm91Z2gnOidkZWZhdWx0Jyk7XG4gIFx0fVxuICBcdHRhc2tDaGFuZ2VkKCl7XG4gIFx0XHR0aGlzLnNldFN0YXRlKHt0YXNrczp0aGlzLnRhc2tzVG9vbC5pdGVtc30pO1xuICBcdH1cbiAgXHR0YXNrQ2hlY2tlZChpdGVtKXtcbiAgXHRcdGl0ZW0uY29tcGxldGU9aXRlbS5jb21wbGV0ZT8wOjE7XG4gIFx0XHR0aGlzLnRhc2tzVG9vbC51cGRhdGUoaXRlbSk7XG4gIFx0fVxuICBcdGVkaXRUYXNrKGl0ZW0pe1xuICBcdFx0dGhpcy5zZXRTdGF0ZShcbiAgXHRcdFx0e1xuICBcdFx0XHRcdGZvcm1TdGF0ZTppdGVtLmRvY3R5cGUsXG4gIFx0XHRcdFx0ZWRpdEl0ZW06aXRlbSxcbiAgXHRcdFx0XHRmb3JtTW9kZTpcImVkaXRcIlxuICBcdFx0XHR9KTtcbiAgXHRcdCQoJyMnK3RoaXMubW9kYWxJZCkubW9kYWwoKTtcbiAgXHR9XG4gIFx0cmVuZGVyVGFza3MoKXtcbiAgXHRcdHZhciB0YXNrcz1bXTtcbiAgXHRcdGlmKHRoaXMuc3RhdGUudGFza3MhPT11bmRlZmluZWQmJnRoaXMuc3RhdGUudGFza3MhPT1udWxsKXtcblx0XHRcdHRhc2tzPVtdO1xuXHRcdFx0dGhpcy5zdGF0ZS50YXNrcy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXHRcdFx0XHQvL3ZhciBjaGVja2VkPWl0ZW0uc3RhdHVzP3RydWU6ZmFsc2U7XG5cdFx0XHRcdHRhc2tzLnB1c2goXG5cdFx0XHRcdFx0PFRhc2tDaGVjayBcblx0XHRcdFx0XHRcdGtleT17aW5kZXh9XG5cdFx0XHRcdFx0XHRpbmRleD17aW5kZXh9XG5cdFx0XHRcdFx0XHRpdGVtPXtpdGVtfVxuXHRcdFx0XHRcdFx0bGFibGU9e2l0ZW0uZG9jdHlwZX1cblx0XHRcdFx0XHRcdGNoZWNrZWQ9e2l0ZW0uY29tcGxldGV9XG5cdFx0XHRcdFx0XHR0YXNrQ2hlY2tlZD17dGhpcy50YXNrQ2hlY2tlZH1cblx0XHRcdFx0XHRcdGVkaXRUYXNrPXtmdW5jdGlvbihlKXsgdGhpcy5lZGl0VGFzayhpdGVtKX0uYmluZCh0aGlzKX1cblx0XHRcdFx0XHQvPik7XG5cdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0fVxuXHRcdHJldHVybiB0YXNrcztcbiAgXHR9XG4gIFx0Z2V0Rm9ybSgpe1xuICBcdFx0dmFyIGZvcm1zT2JqPXtcblx0XHRcdHRhc2tUeXBlOmZ1bmN0aW9uKCl7XG5cdFx0XHRcdHJldHVybihcdFxuXHRcdFx0XHQ8U2VsZWN0XG5cdFx0XHRcdFx0Y2xhc3NOYW1lPVwiXCJcblx0XHRcdFx0XHRsYWJsZT1cIlRhc2sgVHlwZVwiXG5cdFx0XHRcdFx0b3B0aW9ucz17W1wiIFwiXS5jb25jYXQocHMuYXBpU2V0dXAudmluZXlhcmRUYXNrcy5kb2N0eXBlKX1cblx0XHRcdFx0XHRpbnB1dENoYW5nZWQ9e1xuXHRcdFx0XHRcdFx0ZnVuY3Rpb24oZSl7dGhpcy5zZXRTdGF0ZSh7Zm9ybVN0YXRlOmUudGFyZ2V0LnZhbHVlfSl9LmJpbmQodGhpcylcblx0XHRcdFx0XHR9XG5cdFx0XHRcdC8+XG5cdFx0XHQpfS5iaW5kKHRoaXMpLFxuXHRcdFx0U3ByYXlpbmc6ZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdGlmKGl0ZW09PXVuZGVmaW5lZCl7XG5cdFx0XHRcdFx0aXRlbT1udWxsO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiAoXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0PFNwcmF5Rm9ybVxuXHRcdFx0XHRcdFx0aWQ9e3RoaXMucHJvcHMud29ya29yZGVyfVxuXHRcdFx0XHRcdFx0bW9kZT17dGhpcy5zdGF0ZS5mb3JtTW9kZX1cblx0XHRcdFx0XHRcdGl0ZW09e2l0ZW19XG5cdFx0XHRcdFx0XHRkYXRlPXtmYWxzZX1cblx0XHRcdFx0XHRcdHZpbmV5YXJkPXtmYWxzZX1cblx0XHRcdFx0XHRcdGl0ZW1DaGFuZ2U9e1xuXHRcdFx0XHRcdFx0XHRmdW5jdGlvbihjb3B5KXtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtlZGl0SXRlbTpjb3B5fSlcblx0XHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjcmVhdGU9e1xuXHRcdFx0XHRcdFx0XHRmdW5jdGlvbihjb3B5KXtcblx0XHRcdFx0XHRcdFx0XHRjb3B5LmRvY3R5cGU9XCJTcHJheWluZ1wiO1xuXHRcdFx0XHRcdFx0XHRcdGNvcHkud29ya19vcmRlcj10aGlzLnByb3BzLndvcmtvcmRlcjtcblx0XHRcdFx0XHRcdFx0XHRjb3B5LnZpbmV5YXJkPXRoaXMucHJvcHMudmluZXlhcmQ7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy50YXNrc1Rvb2wuY3JlYXRlKGNvcHkpO1xuXHRcdFx0XHRcdFx0XHRcdCQoJyMnK3RoaXMubW9kYWxJZCkubW9kYWwoJ3RvZ2dsZScpO1xuXHRcdFx0XHRcdFx0XHR9LmJpbmQodGhpcylcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVkaXQ9e1xuXHRcdFx0XHRcdFx0XHRmdW5jdGlvbihjb3B5KXtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnRhc2tzVG9vbC51cGRhdGUoY29weSk7XG5cdFx0XHRcdFx0XHRcdFx0JCgnIycrdGhpcy5tb2RhbElkKS5tb2RhbCgndG9nZ2xlJyk7XG5cdFx0XHRcdFx0XHRcdH0uYmluZCh0aGlzKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZGVsZXRlPXtcblx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24oY29weSl7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy50YXNrc1Rvb2wuZGVsZXRlKGNvcHkpO1xuXHRcdFx0XHRcdFx0XHRcdCQoJyMnK3RoaXMubW9kYWxJZCkubW9kYWwoJ3RvZ2dsZScpO1xuXHRcdFx0XHRcdFx0XHR9LmJpbmQodGhpcyl9XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblxuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0UHJ1bmluZzpmdW5jdGlvbihpdGVtKXtcblxuXHRcdFx0XHRpZihpdGVtPT09dW5kZWZpbmVkKXtcblx0XHRcdFx0XHRyZXR1cm4gKFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0PFBydW5pbmdGb3JtXG5cdFx0XHRcdFx0XHRcdGlkPVwiY3JlYXRlU3ByYXlFbnRyeVwiXG5cdFx0XHRcdFx0XHRcdGNyZWF0ZVNwcmF5RW50cnk9e2Z1bmN0aW9uKCl7fX1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9LmJpbmQodGhpcylcblx0XHR9O1xuXG5cdFx0cmV0dXJuIGZvcm1zT2JqW3RoaXMuc3RhdGUuZm9ybVN0YXRlXSh0aGlzLnN0YXRlLmVkaXRJdGVtKTtcbiAgXHR9XG5cdHJlbmRlcigpe1xuXHRcdHZhciBmaWVsZHNTcHJheT1bXHRcdFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImJ1dHRvblwiLFxuXHRcdFx0XHR0eXBlOlwic3VibWl0XCIsXG5cdFx0XHRcdHZhbHVlOlwiQ3JlYXRlIFNwcmF5aW5nIEVudHJ5XCIsXG5cdFx0XHRcdGNsYXNzTmFtZTpcImJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIixcblx0XHRcdFx0b25DbGljazp0aGlzLnN1Ym1pdFxuXHRcdFx0fVxuXHRcdF1cblx0XHR2YXIgdGFza3M9dGhpcy5yZW5kZXJUYXNrcygpO1xuXHRcdHZhciBmb3JtPXRoaXMuZ2V0Rm9ybSgpO1xuXHRcdHZhciBsYWJsZT1cIkNyZWF0ZSBOZXcgVGFza1wiO1xuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPScnPlxuXHRcdFx0e3Rhc2tzfVxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja2JveCByb3cgYWRkYnV0dG9uXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZWRpdFwiPiBcblx0XHRcdFx0XHQ8YnV0dG9uIFxuXHRcdFx0XHRcdFx0dHlwZT1cImJ1dHRvblwiIFxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0IGlubGluZS10YXNrXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMubW9kYWxOZXdUYXNrfVxuXHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tcGx1cyBcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+IEFkZCBUYXNrXG5cdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxNb2RhbCBcblx0XHRcdFx0XHRpZD17dGhpcy5tb2RhbElkfSBcblx0XHRcdFx0XHRzdWJtaXRUZXh0PVwiU3VibWl0XCIgXG5cdFx0XHRcdFx0dGl0bGU9e2xhYmxlfVxuXHRcdFx0XHRcdHN1Ym1pdD17ZmFsc2V9XG5cdFx0XHRcdFx0PlxuXHRcdFx0XHRcdHtmb3JtfVxuXHRcdFx0XHQ8L01vZGFsPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5cbiIsIi8qIGZvcm1zICovXG4vKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cblxuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnN1Ym1pdD10aGlzLnN1Ym1pdC5iaW5kKHRoaXMpO1xuXHR9XG5cdHN1Ym1pdChlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5wcm9wcy5zdWJtaXQoZSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dmFyIGZvcm09W107XG5cdFx0dmFyIGZvcm1UeXBlcz17XG5cdFx0XHRzZWxlY3RcdDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciBvcHRpbmFsPVtcInZhbHVlXCIsXCJsYWJsZVwiLFwib3B0aW9uc1wiLFwiY2xhc3NOYW1lXCIsXCJyZWFkb25seVwiLFwiZGlzYWJsZVwiLFwicmVxdWlyZVwiXTtcblx0XHRcdFx0dmFyIHByb3BzPXBzLmluaXRQcm9wcyhvcHRpbmFsLGl0ZW0pO1xuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxTZWxlY3Rcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH1cblx0XHRcdFx0XHRcdHZhbHVlPXtwcm9wcy52YWx1ZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17cHJvcHMuY2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0bGFibGU9e3Byb3BzLmxhYmxlfVxuXHRcdFx0XHRcdFx0b3B0aW9ucz17cHJvcHMub3B0aW9uc31cblx0XHRcdFx0XHRcdHJlYWRPbmx5PXtwcm9wcy5yZWFkb25seX1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXtwcm9wcy5kaXNhYmxlZH1cblx0XHRcdFx0XHRcdHJlcXVpcmVkPXtwcm9wcy5yZXF1aXJlZH1cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKTt9fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRjaGVjayA6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcImNoZWNrXCIpO1xuXHRcdFx0XHR2YXIgcHJvcHM9W1widmFsdWVcIixcImxhYmxlXCIsXCJjbGFzc05hbWVcIixcInJlYWRvbmx5XCIsXCJkaXNhYmxlXCIsXCJyZXF1aXJlXCIsXCJ2YWx1ZVwiXTtcblx0XHRcdFx0cHJvcHM9cHMuaW5pdFByb3BzKHByb3BzLGl0ZW0pO1xuXG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PENoZWNrXG5cdFx0XHRcdFx0XHRrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9XG5cdFx0XHRcdFx0XHR2YWx1ZT17cHJvcHMudmFsdWV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e3Byb3BzLmNsYXNzTmFtZX1cblx0XHRcdFx0XHRcdGxhYmxlPXtwcm9wcy5sYWJsZX1cblx0XHRcdFx0XHRcdHJlYWRPbmx5PXtwcm9wcy5yZWFkb25seX1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXtwcm9wcy5kaXNhYmxlZH1cblx0XHRcdFx0XHRcdHJlcXVpcmVkPXtwcm9wcy5yZXF1aXJlZH1cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKTt9fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cblx0XHRcdHRleHRhcmVhIDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciBwcm9wcz1bXCJ2YWx1ZVwiLFwibGFibGVcIixcImNsYXNzTmFtZVwiLFwicmVhZG9ubHlcIixcImRpc2FibGVcIixcInJlcXVpcmVcIixcInZhbHVlXCJdO1xuXHRcdFx0XHRwcm9wcz1wcy5pbml0UHJvcHMocHJvcHMsaXRlbSk7XG5cblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8VGV4dGFyZWFcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH1cblx0XHRcdFx0XHRcdHZhbHVlPXtwcm9wcy52YWx1ZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17cHJvcHMuY2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0bGFibGU9e3Byb3BzLmxhYmxlfVxuXHRcdFx0XHRcdFx0cmVhZE9ubHk9e3Byb3BzLnJlYWRvbmx5fVxuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ9e3Byb3BzLmRpc2FibGVkfVxuXHRcdFx0XHRcdFx0cmVxdWlyZWQ9e3Byb3BzLnJlcXVpcmVkfVxuXHRcdFx0XHRcdFx0aW5wdXRDaGFuZ2VkPXtmdW5jdGlvbihlKXtpdGVtLm9uQ2hhbmdlKGUpO319XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGlucHV0IFx0OiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0dmFyIHR5cGUgPSAoaXRlbS50eXBlID09PSB1bmRlZmluZWQpID8gXCJ0ZXh0XCI6IGl0ZW0udHlwZTtcblx0XHRcdFx0dmFyIHZhbHVlID0gKGl0ZW0udmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnZhbHVlO1xuXHRcdFx0XHR2YXIgcGxhY2Vob2xkZXIgPSAoaXRlbS5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucGxhY2Vob2xkZXI7XG5cdFx0XHRcdHZhciBsYWJsZSA9IChpdGVtLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5sYWJsZTtcblx0XHRcdFx0dmFyIGNsYXNzTmFtZSA9IChpdGVtLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uY2xhc3NOYW1lO1xuXHRcdFx0XHR2YXIgcmVhZG9ubHkgPSAoaXRlbS5yZWFkb25seSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucmVhZG9ubHk7XG5cdFx0XHRcdHZhciBkaXNhYmxlZCA9IChpdGVtLmRpc2FibGVkID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5kaXNhYmxlZDtcblx0XHRcdFx0dmFyIHJlcXVpcmVkID0gKGl0ZW0ucmVxdWlyZWQgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnJlcXVpcmVkO1xuXHRcdFx0XHRcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8SW5wdXRcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH0gXG5cdFx0XHRcdFx0XHR0eXBlPXt0eXBlfVxuXHRcdFx0XHRcdFx0dmFsdWU9e3ZhbHVlfVxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuXHRcdFx0XHRcdFx0bGFibGU9e2xhYmxlfVxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXtjbGFzc05hbWV9XG5cdFx0XHRcdFx0XHRyZWFkb25seT17cmVhZG9ubHl9XG5cdFx0XHRcdFx0XHRkaXNhYmxlZD17ZGlzYWJsZWR9XG5cdFx0XHRcdFx0XHRyZXF1aXJlZD17cmVxdWlyZWR9XG5cdFx0XHRcdFx0XHRpbnB1dENoYW5nZWQ9e2Z1bmN0aW9uKGUpe2l0ZW0ub25DaGFuZ2UoZSl9fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRsYWJsZSBcdDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHJldHVybiAoICBcbiAgICBcdFx0XHRcdDxsYWJlbCBrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9ID57aXRlbS5sYWJsZX08L2xhYmVsPlxuXG4gICAgXHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdHJhZGlvXHQ6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHRyZXR1cm4gKDxkaXY+PC9kaXY+KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGhlYWRlcjogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHJldHVybig8aDMga2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fSA+e2l0ZW0ubGFibGV9PC9oMz4pXG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRkYXRlOiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0dmFyIHZhbHVlID0gKGl0ZW0udmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnZhbHVlO1xuXHRcdFx0XHR2YXIgbGFibGUgPSAoaXRlbS5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ubGFibGU7XG5cdFx0XHRcdHZhciBwbGFjZWhvbGRlciA9IChpdGVtLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5wbGFjZWhvbGRlcjtcblx0XHRcdFx0dmFyIGNsYXNzTmFtZSA9IChpdGVtLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uY2xhc3NOYW1lO1xuXHRcdFx0XHR2YXIgcmVhZG9ubHkgPSAoaXRlbS5yZWFkb25seSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucmVhZG9ubHk7XG5cdFx0XHRcdHZhciBkaXNhYmxlZCA9IChpdGVtLmRpc2FibGVkID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5kaXNhYmxlZDtcblx0XHRcdFx0dmFyIHJlcXVpcmVkID0gKGl0ZW0ucmVxdWlyZWQgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnJlcXVpcmVkO1xuXHRcdFx0XHRyZXR1cm4oXG5cdFx0XHRcdFx0PERhdGVJbnB1dFxuXHRcdFx0XHRcdFx0a2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fSBcblx0XHRcdFx0XHRcdHZhbHVlPXt2YWx1ZX1cblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cblx0XHRcdFx0XHRcdGxhYmxlPXtsYWJsZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0aW5wdXRDaGFuZ2VkPXtmdW5jdGlvbihlKXtpdGVtLm9uQ2hhbmdlKGUpfX1cblx0XHRcdFx0XHRcdHJlYWRvbmx5PXtyZWFkb25seX1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXtkaXNhYmxlZH1cblx0XHRcdFx0XHRcdHJlcXVpcmVkPXtyZXF1aXJlZH1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0YXV0b0NvbXBsZXRlOiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0dmFyIHZhbHVlID0gKGl0ZW0udmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnZhbHVlO1xuXHRcdFx0XHR2YXIgbGFibGUgPSAoaXRlbS5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ubGFibGU7XG5cdFx0XHRcdHZhciBwbGFjZWhvbGRlciA9IChpdGVtLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5wbGFjZWhvbGRlcjtcblx0XHRcdFx0dmFyIGNsYXNzTmFtZSA9IChpdGVtLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uY2xhc3NOYW1lO1xuXHRcdFx0XHR2YXIgcmVhZG9ubHkgPSAoaXRlbS5yZWFkb25seSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucmVhZG9ubHk7XG5cdFx0XHRcdHZhciBkaXNhYmxlZCA9IChpdGVtLmRpc2FibGVkID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5kaXNhYmxlZDtcblx0XHRcdFx0dmFyIHJlcXVpcmVkID0gKGl0ZW0ucmVxdWlyZWQgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnJlcXVpcmVkO1xuXG5cdFx0XHRcdHJldHVybihcblx0XHRcdFx0XHQ8QXdlc29tcGxldGVJbnB1dFxuXHRcdFx0XHRcdFx0a2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fVxuXHRcdFx0XHRcdFx0ZG9jdHlwZT17aXRlbS5kb2N0eXBlfVxuXHRcdFx0XHRcdFx0ZG9jdmFsdWU9e2l0ZW0uZG9jdmFsdWV9XG5cdFx0XHRcdFx0XHRkb2NsYWJsZT17aXRlbS5kb2NsYWJsZX1cblx0XHRcdFx0XHRcdHZhbHVlPXt2YWx1ZX1cblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cblx0XHRcdFx0XHRcdGxhYmxlPXtsYWJsZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0cmVhZG9ubHk9e3JlYWRvbmx5fVxuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ9e2Rpc2FibGVkfVxuXHRcdFx0XHRcdFx0cmVxdWlyZWQ9e3JlcXVpcmVkfVxuXHRcdFx0XHRcdFx0aW5wdXRDaGFuZ2VkPXtmdW5jdGlvbihlKXtpdGVtLm9uQ2hhbmdlKGUpfX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0YnV0dG9uOiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0dmFyIHZhbHVlID0gKGl0ZW0udmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnZhbHVlO1xuXHRcdFx0XHR2YXIgY2xhc3NOYW1lID0gKGl0ZW0uY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5jbGFzc05hbWU7XG5cdFx0XHRcdHZhciBkaXNhYmxlZCA9IChpdGVtLmRpc2FibGVkID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5kaXNhYmxlZDtcblx0XHRcdFx0cmV0dXJuKFxuXHRcdFx0XHRcdDxCdXR0b25cblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH1cblx0XHRcdFx0XHRcdHZhbHVlPXt2YWx1ZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ9e2Rpc2FibGVkfVxuXHRcdFx0XHRcdFx0b25DbGljaz17ZnVuY3Rpb24oZSl7aXRlbS5vbkNsaWNrKGUpfX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpXG5cdFx0fVxuXHRcdHRoaXMucHJvcHMuZmllbGRzLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCl7XG5cdFx0XHRpZigkLmlzRW1wdHlPYmplY3QoaXRlbSkpe1xuXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Y29uc29sZS5sb2coaXRlbS5maWVsZCk7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGluZGV4KTtcblx0XHRcdFx0Zm9ybS5wdXNoKGZvcm1UeXBlc1tpdGVtLmZpZWxkXShpdGVtLGluZGV4KSk7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0XHQvL2Zvcih2YXIgeD0wOyB4IDwgdGhpcy5wcm9wcy5mZWlsZHMubGVuZ3RoIHgrKzsgKVxuXHRcdHZhciBjbGFzc05hbWUgPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcInJlYWN0LWZvcm1cIjogXCJmb3JtLWhvcml6b250YWwgcmVhY3QtZm9ybSBcIit0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8Zm9ybSBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG5cdFx0XHRcdDxmaWVsZHNldD5cblx0XHRcdFx0e3RoaXMucHJvcHMuYmVmb3JlfVxuXHRcdFx0XHR7Zm9ybX1cblx0XHRcdFx0eyB0aGlzLnByb3BzLmNoaWxkcmVufVxuXHRcdFx0XHQ8L2ZpZWxkc2V0PlxuXHRcdFx0PC9mb3JtPlxuXHRcdCk7XG5cdH1cbn1cblxuXG5cbmV4cG9ydCBjbGFzcyBTZWxlY3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5pbnB1dENoYW5nZT10aGlzLmlucHV0Q2hhbmdlLmJpbmQodGhpcyk7XG5cblx0fVxuXHRpbnB1dENoYW5nZShlKXtcblx0XHR0aGlzLnByb3BzLmlucHV0Q2hhbmdlZCgpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHRoaXMudmFsdWUgPSAodGhpcy5wcm9wcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMudmFsdWU7XG5cdFx0dGhpcy5sYWJsZSA9ICh0aGlzLnByb3BzLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5sYWJsZTtcblx0XHR0aGlzLm9wdGlvbnMgPSAodGhpcy5wcm9wcy5vcHRpb25zID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5vcHRpb25zO1xuXHRcdHRoaXMuY2xhc3NOYW1lPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcImZvcm0tY29udHJvbFwiOiBcImZvcm0tY29udHJvbFwiICt0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHR0aGlzLmRpc2FibGVkID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5kaXNhYmxlZD09ZmFsc2V8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZXF1aXJlZCA9ICh0aGlzLnByb3BzLnJlcXVpcmVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVxdWlyZWQ9PWZhbHNlfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVhZG9ubHkgPSAodGhpcy5wcm9wcy5yZWFkb25seSA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1mYWxzZXx8dGhpcy5wcm9wcy5yZWFkb25seT09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR2YXIgb3B0aW9ucz1bXTtcblx0XHR2YXIgb3V0cHV0PVwiXCI7XG5cblxuXHRcdHRoaXMub3B0aW9ucy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXHRcdFx0dmFyIGdyb3VwPVtdO1xuXHRcdFx0aWYoaXRlbS5ncm91cCAhPT0gdW5kZWZpbmVkKXtcblx0XHRcdFx0aXRlbS5vcHRpb25zLm1hcChmdW5jdGlvbihpbm5lckl0ZW0saW5kZXgpe1xuXHRcdFx0XHRcdGdyb3VwLnB1c2goIDxvcHRpb24ga2V5PXtpdGVtLmdyb3VwK2luZGV4fT4ge2lubmVySXRlbX0gPC9vcHRpb24+KVxuXHRcdFx0XHR9KVxuXHRcdFx0XHRvcHRpb25zLnB1c2goPG9wdGdyb3VwIGtleT17aXRlbS5ncm91cH0gbGFiZWw9e2l0ZW0uZ3JvdXB9PiB7Z3JvdXB9PC9vcHRncm91cD4pO1xuXG5cdFx0XHR9XG5cdFx0XHRlbHNle1xuXHRcdFx0XHRvcHRpb25zLnB1c2goIDxvcHRpb24ga2V5PXtpbmRleH0+IHtpdGVtfSA8L29wdGlvbj4pXG5cdFx0XHR9XG5cblx0XHRcdFxuXHRcdH0uYmluZCh0aGlzKSk7XG5cblx0XHR2YXIgc2VsZWN0PShcblx0XHRcdDxzZWxlY3QgXG5cdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9IFxuXHRcdFx0XHR2YWx1ZT17dGhpcy52YWx1ZX0gXG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnByb3BzLmlucHV0Q2hhbmdlZH1cblx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdCAgICAgICAgICBcdHJlYWRPbmx5PXt0aGlzLnJlYWRvbmx5fVxuXHQgICAgICAgICAgXHRyZXF1aXJlZD17dGhpcy5yZXF1aXJlZH1cblx0XHRcdFx0PlxuXHRcdFx0XHR7b3B0aW9uc31cblx0XHRcdDwvc2VsZWN0PlxuXHRcdCk7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkIHx8IHRoaXMucHJvcHMubGFibGUgPT1cIlwiKXtcblx0XHRcdG91dHB1dCA9IChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIFwiPlxuXHRcdCAgICBcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWxcIj57dGhpcy5wcm9wcy5sYWJsZX08L2xhYmVsPlxuXHRcdCAgICBcdFx0PGRpdj5cblx0XHQgICAgXHRcdHtzZWxlY3R9XG5cdFx0ICAgIFx0XHQ8L2Rpdj5cblx0XHQgIFx0XHQ8L2Rpdj5cblx0XHQgIFx0KTtcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdG91dHB1dCA9IChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG5cdFx0ICAgICAgXHRcdHtzZWxlY3R9XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLmlucHV0Q2hhbmdlPXRoaXMuaW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcblxuXHR9XG5cdGlucHV0Q2hhbmdlKGUpe1xuXHRcdHRoaXMucHJvcHMuaW5wdXRDaGFuZ2VkKGUpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHRoaXMudHlwZSA9ICh0aGlzLnByb3BzLnR5cGUgPT09IHVuZGVmaW5lZCkgPyBcInRleHRcIjogdGhpcy5wcm9wcy50eXBlO1xuXHRcdHRoaXMudmFsdWUgPSAodGhpcy5wcm9wcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMudmFsdWU7XG5cdFx0dGhpcy5wbGFjZWhvbGRlciA9ICh0aGlzLnByb3BzLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5wbGFjZWhvbGRlcjtcblx0XHR0aGlzLmxhYmxlID0gKHRoaXMucHJvcHMubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLmxhYmxlO1xuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblx0XHR0aGlzLmNsYXNzTmFtZT0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJmb3JtLWNvbnRyb2xcIjogXCJmb3JtLWNvbnRyb2wgXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlcXVpcmVkID0gKHRoaXMucHJvcHMucmVxdWlyZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZXF1aXJlZD09ZmFsc2V8fHRoaXMucHJvcHMucmVxdWlyZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZWFkb25seSA9ICh0aGlzLnByb3BzLnJlYWRvbmx5ID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVhZG9ubHk9PWZhbHNlfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHZhciBpbnB1dD0oIFxuXHRcdFx0PGlucHV0IFxuXHRcdFx0XHR0eXBlPXt0aGlzLnR5cGV9IFxuXHRcdFx0XHRjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfSBcblx0XHRcdFx0cGxhY2Vob2xkZXI9e3RoaXMucGxhY2Vob2xkZXJ9IFxuXHRcdFx0XHR2YWx1ZT17dGhpcy52YWx1ZX1cblx0XHRcdFx0b25DaGFuZ2U9e3RoaXMucHJvcHMuaW5wdXRDaGFuZ2VkfVxuXHRcdFx0XHRkaXNhYmxlZD17dGhpcy5kaXNhYmxlZH1cblx0ICAgICAgICAgIFx0cmVhZE9ubHk9e3RoaXMucmVhZG9ubHl9XG5cdCAgICAgICAgICBcdHJlcXVpcmVkPXt0aGlzLnJlcXVpcmVkfVxuXHRcdFx0Lz5cblx0XHQpO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMubGFibGUgIT09IHVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLmxhYmxlID09XCJcIil7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBcIj5cblx0XHQgICAgXHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD5cblx0XHQgICAgXHRcdDxkaXYgY2xhc3NOYW1lPVwiXCI+XG5cdFx0ICAgICAgXHRcdFx0e2lucHV0fVxuXHRcdCAgICBcdFx0PC9kaXY+XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdCAgICAgIFx0XHR7aW5wdXR9XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBDaGVjayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLmlucHV0Q2hhbmdlPXRoaXMuaW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcblxuXHR9XG5cdGlucHV0Q2hhbmdlKGUpe1xuXHRcdHRoaXMucHJvcHMuaW5wdXRDaGFuZ2VkKGUpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHRoaXMudmFsdWUgPSAodGhpcy5wcm9wcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IDAgOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMucGxhY2Vob2xkZXIgPSAodGhpcy5wcm9wcy5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXI7XG5cdFx0dGhpcy5sYWJsZSA9ICh0aGlzLnByb3BzLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5sYWJsZTtcblx0XHR0aGlzLmNsYXNzTmFtZT0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJmb3JtLWNoZWNrLWlucHV0XCI6IFwiZm9ybS1jaGVjay1pbnB1dCBcIiArdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0dGhpcy5kaXNhYmxlZCA9ICh0aGlzLnByb3BzLmRpc2FibGVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PWZhbHNlfHx0aGlzLnByb3BzLmRpc2FibGVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVxdWlyZWQgPSAodGhpcy5wcm9wcy5yZXF1aXJlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1mYWxzZXx8dGhpcy5wcm9wcy5yZXF1aXJlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlYWRvbmx5ID0gKHRoaXMucHJvcHMucmVhZG9ubHkgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZWFkb25seT09ZmFsc2V8fHRoaXMucHJvcHMucmVhZG9ubHk9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0XG5cdFx0dmFyIG91dHB1dD1cIlwiO1xuXHRcdHZhciBpbnB1dD0oIFxuXHRcdFx0PGlucHV0IFxuXHRcdFx0XHR0eXBlPVwiY2hlY2tib3hcIiBcblx0XHRcdFx0Y2xhc3NOYW1lPXt0aGlzLmNsYXNzTmFtZX0gXG5cdFx0XHRcdHZhbHVlPXt0aGlzLnZhbHVlfVxuXHRcdFx0XHRvbkNoYW5nZT17dGhpcy5wcm9wcy5pbnB1dENoYW5nZWR9XG5cdFx0XHRcdGRpc2FibGVkPXt0aGlzLmRpc2FibGVkfVxuXHQgICAgICAgICAgXHRyZWFkT25seT17dGhpcy5yZWFkb25seX1cblx0ICAgICAgICAgIFx0cmVxdWlyZWQ9e3RoaXMucmVxdWlyZWR9XG5cdFx0XHQvPlxuXHRcdCk7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkIHx8IHRoaXMucHJvcHMubGFibGUgPT1cIlwiKXtcblx0XHRcdG91dHB1dCA9IChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdCAgICBcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWxcIj5cblx0XHQgICAgICBcdFx0XHR7aW5wdXR9e3RoaXMucHJvcHMubGFibGV9XG5cdFx0ICAgICAgXHRcdDwvbGFiZWw+XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHQgICAgICBcdFx0e2lucHV0fVxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuZXhwb3J0IGNsYXNzIFRleHRhcmVhIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuaW5wdXRDaGFuZ2U9dGhpcy5pbnB1dENoYW5nZS5iaW5kKHRoaXMpO1xuXG5cdH1cblx0aW5wdXRDaGFuZ2UoZSl7XG5cdFx0dGhpcy5wcm9wcy5pbnB1dENoYW5nZWQoZSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gMCA6IHRoaXMucHJvcHMudmFsdWU7XG5cdFx0dGhpcy5wbGFjZWhvbGRlciA9ICh0aGlzLnByb3BzLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5wbGFjZWhvbGRlcjtcblx0XHR0aGlzLmxhYmxlID0gKHRoaXMucHJvcHMubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLmxhYmxlO1xuXHRcdHRoaXMuY2xhc3NOYW1lPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcImZvcm0tY29udHJvbFwiOiBcImZvcm0tY29udHJvbCBcIiArdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0dGhpcy5kaXNhYmxlZCA9ICh0aGlzLnByb3BzLmRpc2FibGVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PWZhbHNlfHx0aGlzLnByb3BzLmRpc2FibGVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVxdWlyZWQgPSAodGhpcy5wcm9wcy5yZXF1aXJlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1mYWxzZXx8dGhpcy5wcm9wcy5yZXF1aXJlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlYWRvbmx5ID0gKHRoaXMucHJvcHMucmVhZG9ubHkgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZWFkb25seT09ZmFsc2V8fHRoaXMucHJvcHMucmVhZG9ubHk9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yb3dzID0gKHRoaXMucHJvcHMucm93cyA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJvd3M9PVwiXCIpID8gMzogdGhpcy5wcm9wcy5yb3dzO1xuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblx0XHR2YXIgaW5wdXQ9KCBcblx0XHRcdDx0ZXh0YXJlYSBcblx0XHRcdFx0Y2xhc3NOYW1lPXt0aGlzLmNsYXNzTmFtZX0gXG5cdFx0XHRcdHZhbHVlPXt0aGlzLnZhbHVlfVxuXHRcdFx0XHRvbkNoYW5nZT17dGhpcy5wcm9wcy5pbnB1dENoYW5nZWR9XG5cdFx0XHRcdHJvd3M9e3RoaXMucm93c31cblx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdCAgICAgICAgICBcdHJlYWRPbmx5PXt0aGlzLnJlYWRvbmx5fVxuXHQgICAgICAgICAgXHRyZXF1aXJlZD17dGhpcy5yZXF1aXJlZH1cblx0XHRcdC8+XG5cdFx0KTtcblxuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy5sYWJsZSA9PVwiXCIpe1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2PlxuXHRcdCAgICBcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWxcIj5cblx0XHQgICAgICBcdFx0XHR7dGhpcy5wcm9wcy5sYWJsZX08L2xhYmVsPntpbnB1dH1cblx0XHQgIFx0XHQ8L2Rpdj5cblx0XHQgIFx0KTtcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdG91dHB1dCA9IChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJcIj5cblx0XHQgICAgICBcdFx0e2lucHV0fVxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuZXhwb3J0IGNsYXNzIERhdGVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLmRhdGVJbml0PXRoaXMuZGF0ZUluaXQuYmluZCh0aGlzKTtcblx0fVxuXHRkYXRlSW5pdCgpe1xuXHRcdCQoJy5pbnB1dC1ncm91cC5kYXRlIC5kYXRlcGljaycpLmRhdGVwaWNrZXIoe1xuXHRcdCAgICB0b2RheUJ0bjogXCJsaW5rZWRcIixcblx0XHQgICAgb3JpZW50YXRpb246IFwiYm90dG9tIHJpZ2h0XCIsXG5cdFx0ICAgIGF1dG9jbG9zZTogdHJ1ZSxcblx0XHQgICAgdG9kYXlIaWdobGlnaHQ6IHRydWVcblx0XHR9KS5vbignY2hhbmdlRGF0ZScsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdHZhciBldmVudCA9IG5ldyBFdmVudCgnaW5wdXQnLCB7IGJ1YmJsZXM6IHRydWUgfSk7XG5cdFx0XHRlLnRhcmdldC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblx0XHR9KTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMucGxhY2Vob2xkZXIgPSAodGhpcy5wcm9wcy5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXI7XG5cdFx0dGhpcy5sYWJsZSA9ICh0aGlzLnByb3BzLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5sYWJsZTtcblx0XHR0aGlzLmRpc2FibGVkID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5kaXNhYmxlZD09ZmFsc2V8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZXF1aXJlZCA9ICh0aGlzLnByb3BzLnJlcXVpcmVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVxdWlyZWQ9PWZhbHNlfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVhZG9ubHkgPSAodGhpcy5wcm9wcy5yZWFkb25seSA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1mYWxzZXx8dGhpcy5wcm9wcy5yZWFkb25seT09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblxuXG5cdFx0dmFyIG91dHB1dD1cIlwiO1xuXHRcdHRoaXMuY2xhc3NOYW1lPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcImZvcm0tY29udHJvbCBkYXRlcGlja1wiOiBcImZvcm0tY29udHJvbCBkYXRlcGljayBcIiArdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0dmFyIGlucHV0PSggXG5cdFx0XHQ8aW5wdXRcblx0XHRcdFx0cmVmPXt0aGlzLmRhdGVJbml0fSBcblx0XHRcdFx0dHlwZT1cInRleHRcIlxuXHRcdFx0XHRjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfVxuXHRcdFx0XHRwbGFjZWhvbGRlcj17dGhpcy5wbGFjZWhvbGRlcn0gIFxuXHRcdFx0XHR2YWx1ZT17dGhpcy52YWx1ZX0gXG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnByb3BzLmlucHV0Q2hhbmdlZH1cblx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdCAgICAgICAgICBcdHJlYWRPbmx5PXt0aGlzLnJlYWRvbmx5fVxuXHQgICAgICAgICAgXHRyZXF1aXJlZD17dGhpcy5yZXF1aXJlZH1cblx0XHRcdFx0Lz5cblxuXHRcdCk7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkIHx8IHRoaXMucHJvcHMubGFibGUgPT1cIlwiKXtcblx0XHRcdG91dHB1dCA9IChcblx0XHQgIFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHQgIFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD5cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAgZGF0ZVwiPlxuXHRcdFx0XHRcdFx0e2lucHV0fVxuXHRcdFx0XHQgIFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cC1hZGRvblwiPlxuXHRcdFx0XHQgIFx0XHRcdDxpIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tdGhcIj48L2k+XG5cdFx0XHRcdCAgXHRcdDwvc3Bhbj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwIGRhdGVcIj5cblxuXHRcdFx0XHRcdFx0e2lucHV0fVxuXHRcdFx0XHQgIFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cC1hZGRvblwiPlxuXHRcdFx0XHQgIFx0XHRcdDxpIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tdGhcIj48L2k+XG5cdFx0XHRcdCAgXHRcdDwvc3Bhbj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuZXhwb3J0IGNsYXNzIEF3ZXNvbXBsZXRlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cblx0XHQvKiAgIERvIHRoZSBiaW5kIHRoaW5nICAqL1xuXHRcdHRoaXMuY3JlYXRlTGlzdD10aGlzLmNyZWF0ZUxpc3QuYmluZCh0aGlzKTtcblx0XHR0aGlzLmRvY0NoYW5nZWQ9dGhpcy5kb2NDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jb21wb25lbnREaWRNb3VudD10aGlzLmNvbXBvbmVudERpZE1vdW50LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5pbnB1dENoYW5nZT10aGlzLmlucHV0Q2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5hdXRvY29tcGxldGU9dGhpcy5hdXRvY29tcGxldGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmNvbXBvbmVudFdpbGxVbm1vdW50PXRoaXMuY29tcG9uZW50V2lsbFVubW91bnQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnJlZkNhbGw9dGhpcy5yZWZDYWxsLmJpbmQodGhpcyk7XG5cdFx0XG5cdFx0Ly90aGlzLndvcmtvcmRlck9iaj10aGlzLm9uU3RhdHVzQ2hhbmdlZC5iaW5kKHRoaXMpO1xuXHRcdC8qICAgICAgICAgIGVuZCAgICAgICAgICAqL1xuXHRcdHRoaXMuaXRlbWxpc3Q9W107XG5cdFx0dGhpcy5zdGF0ZT17aXRlbWxpc3Q6W119O1xuXHRcdHRoaXMuX2lzTW91bnRlZD1mYWxzZTtcblx0XHR2YXIgYXJncz17fTtcblx0XHR2YXIgb3B0aW9ucz17ZG9jdHlwZTp0aGlzLnByb3BzLmRvY3R5cGV9O1xuXHRcdHZhciBmaWx0ZXI9e307XG5cdFx0aWYgKHRoaXMucHJvcHMuZmlsdGVyPT11bmRlZmluZWQgfHwgdGhpcy5wcm9wcy5maWx0ZXI9PW51bGwpe1xuXHRcdFxuXHRcdH1lbHNle1xuXHRcdFx0ZmlsdGVyPSB0aGlzLnByb3BzLmZpbHRlcjtcblx0XHR9XG5cdFx0dGhpcy5saXN0VG9vbCA9IG5ldyBwcy5hcGlUb29sKGZpbHRlciwgb3B0aW9ucyAsdGhpcy5kb2NDaGFuZ2VkKTtcblx0XHRpZiAodGhpcy5saXN0VG9vbC5pdGVtcz09PXVuZGVmaW5lZCB8fHRoaXMubGlzdFRvb2wuaXRlbXM9PT0gMCB8fHRoaXMubGlzdFRvb2wuaXRlbXM9PT1udWxsICl7XG5cdFx0fWVsc2V7XG5cdFx0XHR0aGlzLnN0YXRlLmxpc3Q9dGhpcy5saXN0VG9vbC5pdGVtcztcblx0XHR9XG5cblx0XHR0aGlzLmNyZWF0ZUxpc3QoKTtcblx0fVxuXHRkb2NDaGFuZ2VkKCl7XG5cdFx0dGhpcy5jcmVhdGVMaXN0KCk7XG5cdH1cblx0Y29tcG9uZW50RGlkTW91bnQoKXtcblx0XHR0aGlzLl9pc01vdW50ZWQ9dHJ1ZTtcblx0XHR0aGlzLmF1dG9jb21wbGV0ZSgpO1xuXG5cdH1cblx0Y3JlYXRlTGlzdCgpe1xuXHRcdHRoaXMuaXRlbWxpc3Q9W107XG5cdFx0Ly9sYWJsZSBhbmQgdmFsdWVcblx0XHRpZiAodGhpcy5wcm9wcy5kb2NsYWJsZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMubGlzdFRvb2wuaXRlbXMgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmxpc3RUb29sLml0ZW1zICE9PSBudWxsKXtcblx0XHRcdGZvcihsZXQgaXRlbSBvZiB0aGlzLmxpc3RUb29sLml0ZW1zKXtcblx0XHRcdFx0dmFyIHRlbXAgPVtpdGVtW3RoaXMucHJvcHMuZG9jbGFibGVdLGl0ZW1bdGhpcy5wcm9wcy5kb2N2YWx1ZV1dO1xuXHRcdFx0XHR0aGlzLml0ZW1saXN0LnB1c2godGVtcCk7XG5cdFx0XHR9XG5cdFx0XHQkKGRvY3VtZW50KS50cmlnZ2VyKCdsaXN0TG9hZCcgKyB0aGlzLnByb3BzLmRvY3R5cGUpO1xuXHRcdH1cblx0XHQvL2p1c3QgbGFibGVcblx0XHRlbHNlIGlmKHRoaXMubGlzdFRvb2wuaXRlbXMgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmxpc3RUb29sLml0ZW1zICE9PSBudWxsKXtcblx0XHRcdGZvcihsZXQgaXRlbSBvZiB0aGlzLmxpc3RUb29sLml0ZW1zKXtcblx0XHRcdFx0dGhpcy5pdGVtbGlzdC5wdXNoKGl0ZW1bdGhpcy5wcm9wcy5kb2N2YWx1ZV0pO1xuXHRcdFx0fVxuXHRcdFx0JChkb2N1bWVudCkudHJpZ2dlcignbGlzdExvYWQnICsgdGhpcy5wcm9wcy5kb2N0eXBlLnJlcGxhY2UoXCIgXCIsXCJcIikpO1xuXHRcdH1cblx0fVxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuXHRcdC8vIGNvbnNvbGUubG9nKFwiSEVMTE9cIik7XG5cdFx0Ly8gdGhpcy5hdy5kZXN0cm95KCk7XG5cdFx0Ly8gZGVsZXRlIHRoaXMuYXc7XG5cdFx0Ly8gY29uc29sZS5sb2coXCJURVNUXCIpO1xuXHR9XG5cdHJlZkNhbGwoaW5wdXQpe1xuXHRcdHRoaXMuaW5wdXQ9aW5wdXQ7XG5cdH1cblx0YXV0b2NvbXBsZXRlKGlucHV0KXtcblx0XHRpbnB1dD10aGlzLmlucHV0O1xuXHRcdHZhciBjb25maWc9IHtcblx0XHRcdFx0bWluQ2hhcnM6IDAsXG5cdFx0XHRcdG1heEl0ZW1zOiA5OSxcblx0XHRcdFx0YXV0b0ZpcnN0OiB0cnVlLFxuXHRcdFx0XHRmaWx0ZXI6IEF3ZXNvbXBsZXRlLkZJTFRFUl9TVEFSVFNXSVRIXG5cdFx0XHR9XG5cdFx0aWYodGhpcy5wcm9wcy5kb2NsYWJsZSAhPT0gdW5kZWZpbmVkICl7XG5cdFx0XHRjb25maWcuaXRlbT0gZnVuY3Rpb24oaXRlbSwgaW5wdXQpIHtcblx0XHRcdFx0dmFyIGQgPSBpdGVtO1xuXHRcdFx0XHR2YXIgaHRtbCA9IFwiPHNwYW4+XCIgKyBfXyhpdGVtLmxhYmVsKSsgXCI8L3NwYW4+PGJyPjxzcGFuPjxzbWFsbD5cIitpdGVtLnZhbHVlK1wiPC9zbWFsbD48L3NwYW4+XCI7XG5cdFx0XHRcdHJldHVybiAkKCc8bGk+PC9saT4nKVxuXHRcdFx0XHRcdC5kYXRhKCdpdGVtLmF1dG9jb21wbGV0ZScsIGl0ZW0pXG5cdFx0XHRcdFx0Lmh0bWwoJzxhPjxwPicgKyBodG1sICsgJzwvcD48L2E+Jylcblx0XHRcdFx0XHQuZ2V0KDApO1xuXHRcdFx0fVxuXG5cdFx0fWVsc2V7XG5cdFx0XHRjb25maWcuaXRlbT1mdW5jdGlvbihpdGVtLCBpbnB1dCkge1xuXHRcdFx0XHR2YXIgZCA9IGl0ZW07XG5cdFx0XHRcdHZhciBodG1sID0gXCI8c3Bhbj5cIiArIF9fKGl0ZW0pKyBcIjwvc3Bhbj5cIjtcblx0XHRcdFx0cmV0dXJuICQoJzxsaT48L2xpPicpXG5cdFx0XHRcdFx0LmRhdGEoJ2l0ZW0uYXV0b2NvbXBsZXRlJywgaXRlbSlcblx0XHRcdFx0XHQuaHRtbCgnPGE+PHA+JyArIGh0bWwgKyAnPC9wPjwvYT4nKVxuXHRcdFx0XHRcdC5nZXQoMCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuYXcgPSBuZXcgQXdlc29tcGxldGUoaW5wdXQsY29uZmlnKTtcblx0XHRpbnB1dC5hZGRFdmVudExpc3RlbmVyKFxuXHRcdFx0J2F3ZXNvbXBsZXRlLXNlbGVjdGNvbXBsZXRlJyxcblx0XHRcdFx0dGhpcy5pbnB1dENoYW5nZVxuXHRcdCk7XG5cdFx0JChpbnB1dCkuY2xpY2soIGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKHRoaXMuYXcudWwuY2hpbGROb2Rlcy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0dGhpcy5hdy5taW5DaGFycyA9IDA7XG5cdFx0XHRcdHRoaXMuYXcuZXZhbHVhdGUoKTtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKHRoaXMuYXcudWwuaGFzQXR0cmlidXRlKCdoaWRkZW4nKSkge1xuXHRcdFx0XHR0aGlzLmF3Lm9wZW4oKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHR0aGlzLmF3LmNsb3NlKCk7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLmF3Lmxpc3Q9dGhpcy5pdGVtTGlzdDtcblx0XHQkKGRvY3VtZW50KS5iaW5kKCdsaXN0TG9hZCcgKyB0aGlzLnByb3BzLmRvY3R5cGUucmVwbGFjZShcIiBcIixcIlwiKSxmdW5jdGlvbigpe1xuXHRcdFx0dGhpcy5hdy5saXN0PXRoaXMuaXRlbWxpc3Q7XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0fVxuXHRpbnB1dENoYW5nZShlKXtcblx0XHR0aGlzLnByb3BzLmlucHV0Q2hhbmdlZChlKTtcblx0fVxuXG5cdHJlbmRlcigpe1xuXHRcdHRoaXMudHlwZSA9ICh0aGlzLnByb3BzLnR5cGUgPT09IHVuZGVmaW5lZCkgPyBcInRleHRcIjogdGhpcy5wcm9wcy50eXBlO1xuXHRcdHRoaXMudmFsdWUgPSAodGhpcy5wcm9wcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMudmFsdWU7XG5cdFx0dGhpcy5wbGFjZWhvbGRlciA9ICh0aGlzLnByb3BzLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5wbGFjZWhvbGRlcjtcblx0XHR0aGlzLmxhYmxlID0gKHRoaXMucHJvcHMubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLmxhYmxlO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlcXVpcmVkID0gKHRoaXMucHJvcHMucmVxdWlyZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZXF1aXJlZD09ZmFsc2V8fHRoaXMucHJvcHMucmVxdWlyZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZWFkb25seSA9ICh0aGlzLnByb3BzLnJlYWRvbmx5ID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVhZG9ubHk9PWZhbHNlfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXG5cdFx0dmFyIG91dHB1dD1cIlwiO1xuXHRcdHRoaXMuY2xhc3NOYW1lPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcImZvcm0tY29udHJvbCBhd2Vzb21wbGV0ZVwiOiBcImZvcm0tY29udHJvbCBhd2Vzb21wbGV0ZSBcIiArdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0dmFyIGlucHV0PSggPGlucHV0XG5cdFx0XHRcdFx0dmFsdWU9e3RoaXMudmFsdWV9XG5cblx0XHRcdFx0XHR0eXBlPXt0aGlzLnR5cGV9IFxuXHRcdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9IFxuXHRcdFx0XHRcdHBsYWNlaG9sZGVyPXt0aGlzLnBsYWNlaG9sZGVyfSBcblx0XHRcdFx0XHRyZWY9e3RoaXMucmVmQ2FsbH1cblx0XHQgICAgICAgICAgXHRvbkNoYW5nZT17dGhpcy5pbnB1dENoYW5nZX1cblx0XHQgICAgICAgICAgXHRkaXNhYmxlZD17dGhpcy5kaXNhYmxlZH1cblx0XHQgICAgICAgICAgXHRyZWFkT25seT17dGhpcy5yZWFkb25seX1cblx0XHQgICAgICAgICAgXHRyZXF1aXJlZD17dGhpcy5yZXF1aXJlZH1cblx0XHQgICAgICAgICAgLz4pO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMubGFibGUgIT09IHVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLmxhYmxlID09XCJcIil7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBcIj5cblx0XHQgICAgXHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD5cblx0XHQgICAgXHRcdDxkaXYgY2xhc3NOYW1lPVwiXCI+XG5cdFx0ICAgICAgXHRcdFx0e2lucHV0fVxuXHRcdCAgICBcdFx0PC9kaXY+XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdCAgICAgIFx0XHR7aW5wdXR9XG5cdFx0ICBcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5leHBvcnQgY2xhc3MgQnV0dG9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnR5cGUgPSAodGhpcy5wcm9wcy50eXBlID09PSB1bmRlZmluZWQpID8gXCJ0ZXh0XCI6IHRoaXMucHJvcHMudHlwZTtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR2YXIgb3V0cHV0PVwiXCI7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiYnRuXCI6IFwiYnRuIFwiICt0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHR2YXIgaW5wdXQ9KCBcblx0XHRcdDxidXR0b24gXG5cdFx0XHRcdHR5cGU9e3RoaXMudHlwZX1cblx0XHRcdFx0Y2xhc3NOYW1lPXt0aGlzLmNsYXNzTmFtZX0gXG5cdFx0XHRcdHZhbHVlPXt0aGlzLnZhbHVlfVxuXHRcdFx0XHRvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2xpY2t9XG5cdFx0XHRcdGRpc2FibGVkPXt0aGlzLmRpc2FibGVkfVxuXHRcdFx0Pnt0aGlzLnZhbHVlfTwvYnV0dG9uPlxuXHRcdCk7XG5cblxuXHRcdG91dHB1dCA9IChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHQgICAgICBcdFx0e2lucHV0fVxuXHQgIFx0XHQ8L2Rpdj5cblx0ICBcdCk7XG5cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG4iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RhbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnN1Ym1pdD10aGlzLnN1Ym1pdC5iaW5kKHRoaXMpO1xuXHR9XG5cdHN1Ym1pdChlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5wcm9wcy5zdWJtaXQoZSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dmFyIGZvb3Rlcj1cIlwiO1xuXHRcdGlmKHRoaXMucHJvcHMuc3VibWl0IT09IGZhbHNlKXtcblx0XHRcdGZvb3Rlcj0oXHRcdFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWZvb3RlclwiPlxuXHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tc2Vjb25kYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DbG9zZTwvYnV0dG9uPlxuXHRcdFx0XHRcdDxidXR0b24gXG5cdFx0XHRcdFx0XHR0eXBlPVwic3VibWl0XCIgXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLnN1Ym1pdH0gXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiA+XG5cdFx0XHRcdFx0XHRcdHt0aGlzLnByb3BzLnN1Ym1pdFRleHR9XG5cdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KVxuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsIGZhZGUgdGV4dC1sZWZ0IHBhbmVsLWRlZmF1bHRcIiBpZD17dGhpcy5wcm9wcy5pZH0gdGFiSW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiBhcmlhLWxhYmVsbGVkYnk9XCJleGFtcGxlTW9kYWxMYWJlbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZ1wiIHJvbGU9XCJkb2N1bWVudFwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1oZWFkZXJcIj5cblx0XHRcdFx0XHRcdFx0PGg0IGNsYXNzTmFtZT1cIm1vZGFsLXRpdGxlXCIgaWQ9XCJleGFtcGxlTW9kYWxMYWJlbFwiPnt0aGlzLnByb3BzLnRpdGxlfTwvaDQ+XG5cdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGRpc3BsYXk9XCJub25lXCIgY2xhc3NOYW1lPVwiY2xvc2UgaGlkZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+XG5cdFx0XHRcdFx0XHRcdDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+XG5cdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XG5cdFx0XHRcdFx0XHRcdFx0eyB0aGlzLnByb3BzLmNoaWxkcmVuIH1cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdHtmb290ZXJ9XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5cbiIsImltcG9ydCBGb3JtIGZyb20gJy4uL3V0aWxzL2Zvcm1zJ1xuXG5cbmV4cG9ydCBjbGFzcyBTcHJheUZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5jb21wb25lbnRXaWxsVXBkYXRlPXRoaXMuY29tcG9uZW50V2lsbFVwZGF0ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuc3VibWl0PXRoaXMuc3VibWl0LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5zYXZlPXRoaXMuc2F2ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZGVsZXRlPXRoaXMuZGVsZXRlLmJpbmQodGhpcyk7XG5cdH1cblx0Y29tcG9uZW50V2lsbFVwZGF0ZSgpe1xuXG5cdH1cblx0c3VibWl0KGUpe1xuXHRcdC8vaWYodGhpcy5wcm9wcy5pdGVtLnZpbmV5YXJkPT1cIlwiIHx8dGhpcy5wcm9wcy5pdGVtLnNwcmF5X3R5cGU9PVwiXCIgfHwgKG1vbWVudCh0aGlzLnByb3BzLml0ZW0uZGF0ZSxcIk1NL0REL1lZWVlcIikuaXNWYWxpZCgpKSE9PXRydWUpe1xuXHRcdC8vXHRjb25zb2xlLmxvZyhcIm5vdCB2YWxpZFwiKTtcblx0XHQvL31lbHNle1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dGhpcy5wcm9wcy5jcmVhdGUodGhpcy5wcm9wcy5pdGVtKTtcblx0XHQvL31cblx0fVxuXHRzYXZlKGUpe1xuXHRcdC8vIGlmKHRoaXMucHJvcHMuaXRlbS52aW5leWFyZD09XCJcIiB8fHRoaXMucHJvcHMuaXRlbS5zcHJheV90eXBlPT1cIlwiIHx8IChtb21lbnQodGhpcy5wcm9wcy5pdGVtLmRhdGUsXCJNTS9ERC9ZWVlZXCIpLmlzVmFsaWQoKSkhPT10cnVlKXtcblx0XHQvLyBcdGNvbnNvbGUubG9nKFwibm90IHZhbGlkXCIpO1xuXHRcdC8vIH1lbHNle1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dGhpcy5wcm9wcy5lZGl0KHRoaXMucHJvcHMuaXRlbSk7XG5cdFx0Ly8gfVxuXHR9XG5cdGRlbGV0ZShlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5wcm9wcy5kZWxldGUodGhpcy5wcm9wcy5pdGVtKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR2YXIgY3JlYXRlSGlkZGVuPSh0aGlzLnByb3BzLm1vZGUhPVwiY3JlYXRlXCIpP1wiIGhpZGRlblwiOlwiIG5vcGVcIjtcblx0XHR2YXIgZWRpdEhpZGRlbj0odGhpcy5wcm9wcy5tb2RlIT1cImVkaXRcIik/XCIgaGlkZGVuXCI6XCIgbm9wZVwiO1xuXHRcdFxuXHRcdGlmKHRoaXMucHJvcHMuaXRlbT09bnVsbCl7XG5cdFx0XHR2YXIgY29weT17XG5cdFx0XHRcdHZpbmV5YXJkOlwiXCIsXG5cdFx0XHRcdHNlYXNvbjpcIlwiLFxuXHRcdFx0XHRkYXRlOm1vbWVudCgpLmZvcm1hdChcIk1NL0REL1lZWVlcIiksXG5cdFx0XHRcdHNwcmF5VHlwZTpcIlwiLFxuXHRcdFx0XHRxdWFudGl0eTowXG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHR2YXIgY29weT1wcy5jbG9uZSh0aGlzLnByb3BzLml0ZW0pO1xuXHRcdH1cblxuXHRcdGNvbnNvbGUubG9nKHRoaXMucHJvcHMuaXRlbSk7XG5cdFx0Y29uc29sZS5sb2coY29weSk7XG5cdFx0dmFyIGZvcm1FbGVtZW50cz17XG5cdFx0XHRkYXRlOlt7fSxcblx0XHRcdHtcblx0XHRcdFx0XHRmaWVsZDpcImRhdGVcIixcblx0XHRcdFx0XHRyZXF1aXJlZDp0cnVlLFxuXHRcdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRcdGNvcHkuZGF0ZT1lLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdFx0dmFsdWU6Y29weS5kYXRlLFxuXHRcdFx0XHRcdGxhYmxlOlwiRGF0ZVwiXG5cdFx0XHR9XSxcblx0XHRcdHZpbmV5YXJkOlt7fSx7XG5cdFx0XHRcdGZpZWxkOlwiYXV0b0NvbXBsZXRlXCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRjb3B5LnZpbmV5YXJkPWUudGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHR2YWx1ZTpjb3B5LnZpbmV5YXJkLFxuXHRcdFx0XHRyZXF1aXJlZDp0cnVlLFxuXHRcdFx0XHRsYWJsZTpcIlZpbmV5YXJkXCIsXG5cdFx0XHRcdGRvY3R5cGU6XCJWaW5leWFyZFwiLFxuXHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIlxuXHRcdFx0fV0sXG5cdFx0XHRmaWVsZDpbe30se1xuXHRcdFx0XHRmaWVsZDpcImF1dG9Db21wbGV0ZVwiLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0Y29weS5maWVsZD1lLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0dmFsdWU6Y29weS5maWVsZCxcblx0XHRcdFx0cmVxdWlyZWQ6dHJ1ZSxcblx0XHRcdFx0bGFibGU6XCJWaW5leWFyZFwiLFxuXHRcdFx0XHRkb2N0eXBlOlwiVmluZXlhcmQgRmllbGRcIixcblx0XHRcdFx0ZmlsdGVyOnt2aW5leWFyZDpjb3B5LnZpbmV5YXJkfSxcblx0XHRcdFx0ZG9jdmFsdWU6XCJuYW1lXCJcblx0XHRcdH1dLFxuXHRcdFx0d29ya29yZGVyOlt7fSx7XG5cdFx0XHRcdGZpZWxkOlwiYXV0b0NvbXBsZXRlXCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRjb3B5Lndvcmtfb3JkZXI9ZS50YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdHZhbHVlOmNvcHkud29ya19vcmRlcixcblx0XHRcdFx0cmVxdWlyZWQ6dHJ1ZSxcblx0XHRcdFx0bGFibGU6XCJWaW5leWFyZFwiLFxuXHRcdFx0XHRkb2N0eXBlOlwid29ya19vcmRlclwiLFxuXHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIlxuXHRcdFx0fV1cblx0XHR9XG5cblx0XHR2YXIgZmllbGRzPVtcblx0XHRcdGZvcm1FbGVtZW50cy52aW5leWFyZFt0aGlzLnByb3BzLnZpbmV5YXJkXSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJhdXRvQ29tcGxldGVcIixcblx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdGNvcHkuc2Vhc29uPWUudGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHR2YWx1ZTpjb3B5LnNlYXNvbixcblx0XHRcdFx0cmVxdWlyZWQ6dHJ1ZSxcblx0XHRcdFx0bGFibGU6XCJTZWFzb25cIixcblx0XHRcdFx0ZG9jdHlwZTpcIlNlYXNvblwiLFxuXHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIlxuXHRcdFx0fSxcblx0XHRcdGZvcm1FbGVtZW50cy5kYXRlW3RoaXMucHJvcHMudmluZXlhcmRdLFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImF1dG9Db21wbGV0ZVwiLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7IFxuXHRcdFx0XHRcdGNvcHkuc3ByYXlfdHlwZT1lLnRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0dmFsdWU6Y29weS5zcHJheV90eXBlLFxuXHRcdFx0XHRyZXF1aXJlZDp0cnVlLFxuXHRcdFx0XHRsYWJsZTpcIlNwcmF5IFR5cGVcIixcblx0XHRcdFx0ZG9jdHlwZTpcIlNwcmF5IFR5cGVcIixcblx0XHRcdFx0ZG9jdmFsdWU6XCJuYW1lXCJcblx0XHRcdH0sXG5cblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJpbnB1dFwiLFxuXHRcdFx0XHRjbGFzc05hbWU6XCJ2aW5leWFyZC1pbnB1dFwiLFxuXHRcdFx0XHR0eXBlOlwibnVtYmVyXCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRjb3B5LnF1YW50aXR5PWUudGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHR2YWx1ZTpjb3B5LnF1YW50aXR5LFxuXHRcdFx0XHRsYWJsZTpcInF1YW50aXR5XCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiYnV0dG9uXCIsXG5cdFx0XHRcdHR5cGU6XCJzdWJtaXRcIixcblx0XHRcdFx0dmFsdWU6XCJDcmVhdGUgU3ByYXlpbmcgRW50cnlcIixcblx0XHRcdFx0Y2xhc3NOYW1lOlwiYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiICsgY3JlYXRlSGlkZGVuLFxuXHRcdFx0XHRvbkNsaWNrOnRoaXMuc3VibWl0XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImJ1dHRvblwiLFxuXHRcdFx0XHR0eXBlOlwic3VibWl0XCIsXG5cdFx0XHRcdHZhbHVlOlwiU2F2ZVwiLFxuXHRcdFx0XHRjbGFzc05hbWU6XCJidG4tc3VjY2VzcyBwdWxsLXJpZ2h0XCIrIGVkaXRIaWRkZW4sXG5cdFx0XHRcdG9uQ2xpY2s6dGhpcy5zYXZlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImJ1dHRvblwiLFxuXHRcdFx0XHR0eXBlOlwic3VibWl0XCIsXG5cdFx0XHRcdHZhbHVlOlwiRGVsZXRlXCIsXG5cdFx0XHRcdGNsYXNzTmFtZTpcImJ0bi1kYW5nZXIgcHVsbC1yaWdodFwiKyBlZGl0SGlkZGVuLFxuXHRcdFx0XHRvbkNsaWNrOnRoaXMuZGVsZXRlXG5cdFx0XHR9XG5cblxuXHRcdF1cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cdFx0XG5cdFx0XHRcdDxGb3JtXG5cdFx0XHRcdFx0aWQ9e3RoaXMucHJvcHMuaWR9XG5cdFx0XHRcdFx0dHlwZT1cImhvcml6b250YWxcIlxuXHRcdFx0XHRcdGZpZWxkcz17ZmllbGRzfVxuXG5cdFx0XHRcdC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cdFx0XHQvLyB7XG5cdFx0XHQvLyBcdGZpZWxkOlwic2VsZWN0XCIsXG5cdFx0XHQvLyBcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXsgXG5cdFx0XHQvLyBcdFx0Y29weS50eXBlPWUudGFyZ2V0LnZhbHVlO1xuXHRcdFx0Ly8gXHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdC8vIFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0Ly8gXHRsYWJsZTpcIlN0eWxlXCIsXG5cdFx0XHQvLyBcdG9wdGlvbnM6W1xuXHRcdFx0Ly8gXHRcdFwiQ2FuZVwiLFxuXHRcdFx0Ly8gXHRcdFwiSHlicmlkXCIsXG5cdFx0XHQvLyBcdFx0XCJIZWFkIFRyYWluXCIsXG5cdFx0XHQvLyBcdFx0XCJCaWxhdGVyYWwgVHJhaW5cIixcblx0XHRcdC8vIFx0XHRcIlR3byBCdWRcIixcblx0XHRcdC8vIFx0XHRcIlNwdXJcIixcblx0XHRcdC8vIFx0XHRcIlRydW5rXCJcblx0XHRcdC8vIFx0XVxuXHRcdFx0Ly8gfSxcblx0XHRcdC8vIHtcblx0XHRcdC8vIFx0ZmllbGQ6XCJjaGVja1wiLFxuXHRcdFx0Ly8gXHRjbGFzc05hbWU6XCJiaWctY2hlY2tib3hcIixcblx0XHRcdC8vIFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpeyBcblx0XHRcdC8vIFx0XHRjb3B5LmJfbG9jaz1lLnRhcmdldC52YWx1ZTtcblx0XHRcdC8vIFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHQvLyBcdH0uYmluZCh0aGlzKSxcblx0XHRcdC8vIFx0bGFibGU6XCJCLUxvY2tcIlxuXHRcdFx0Ly8gfSxcblx0XHRcdC8vIHtcblx0XHRcdC8vIFx0ZmllbGQ6XCJjaGVja1wiLFxuXHRcdFx0Ly8gXHRjbGFzc05hbWU6XCJiaWctY2hlY2tib3hcIixcblx0XHRcdC8vIFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpeyBcblx0XHRcdC8vIFx0XHRjb3B5LnJlbW92ZWQ9ZS50YXJnZXQudmFsdWU7XG5cdFx0XHQvLyBcdFx0dGhpcy5wcm9wcy5pdGVtQ2hhbmdlKGNvcHkpO1xuXHRcdFx0Ly8gXHR9LmJpbmQodGhpcyksXG5cdFx0XHQvLyBcdGxhYmxlOlwiUHJ1bmluZyBSZW1vdmVkXCJcblx0XHRcdC8vIH0sXG5cdFx0XHQvLyB7XG5cdFx0XHQvLyBcdGZpZWxkOlwiY2hlY2tcIixcblx0XHRcdC8vIFx0Y2xhc3NOYW1lOlwiYmlnLWNoZWNrYm94XCIsXG5cdFx0XHQvLyBcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXsgXG5cdFx0XHQvLyBcdFx0Y29weS50YXBfcmVtb3ZlZD1lLnRhcmdldC52YWx1ZTtcblx0XHRcdC8vIFx0XHR0aGlzLnByb3BzLml0ZW1DaGFuZ2UoY29weSk7XG5cdFx0XHQvLyBcdH0uYmluZCh0aGlzKSxcblx0XHRcdC8vIFx0bGFibGU6XCJUYXAgUmVtb3ZlZFwiXG5cdFx0XHQvLyB9LFxuXHRcdFx0Ly8ge1xuXHRcdFx0Ly8gXHRmaWVsZDpcImNoZWNrXCIsXG5cdFx0XHQvLyBcdGNsYXNzTmFtZTpcImJpZy1jaGVja2JveFwiLFxuXHRcdFx0Ly8gXHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7IFxuXHRcdFx0Ly8gXHRcdGNvcHkucHJlX3BydW5lPWUudGFyZ2V0LnZhbHVlO1xuXHRcdFx0Ly8gXHRcdHRoaXMucHJvcHMuaXRlbUNoYW5nZShjb3B5KTtcblx0XHRcdC8vIFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0Ly8gXHRsYWJsZTpcIlByZSBQcnVuZVwiXG5cdFx0XHQvLyB9LFxuXG5cblxuXG5cblxuIiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG4vL2ltcG9ydCBEYXlzV29ya29yZGVycyBmcm9tICcuLi8uLi9wdWJsaWMvanMvbW9kdWxlcy9kYXlzX3dvcmtvcmRlcnMvRGF5c1dvcmtvcmRlcnMnXG5pbXBvcnQgRGF5c1RpbWVzaGVldHMgZnJvbSAnLi4vLi4vcHVibGljL2pzL21vZHVsZXMvZGF5c190aW1lc2hlZXRzL0RheXNUaW1lU2hlZXRzJ1xuXG4vL2NvbnN0IGFwcD0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpO1xuY29uc3QgYXBwPSAkKCcjYXBwJylbMF07XG5jb25zdCB0aW1lc2hlZXRzPSAkKCcjdGltZScpWzBdO1xuXG5jbGFzcyBXb3JrUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblxuXHRcdC8qIGJpbmQgZGluZyBkaW5nICovXG5cdFx0dGhpcy5tYWluQ2xpY2tlZD10aGlzLm1haW5DbGlja2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy53b3Jrb3JkZXJzQ2xpY2tlZD10aGlzLndvcmtvcmRlcnNDbGlja2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy50aW1lc2hlZXRDbGlja2VkPXRoaXMudGltZXNoZWV0Q2xpY2tlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuaGFuZGVsQ2xvY2tJbj10aGlzLmhhbmRlbENsb2NrSW4uYmluZCh0aGlzKTtcblx0XHR0aGlzLmhhbmRlbFJvdXRlPXRoaXMuaGFuZGVsUm91dGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLnN0YXRlVXBkYXRlPXRoaXMuc3RhdGVVcGRhdGUuYmluZCh0aGlzKTtcblx0XHRcblxuXHRcdC8vSGFuZGVsIFVzZXIgbE9hZFxuXHRcdC8vIGlmICggZnJhcHBlLnVzZXJfaWQgPT0gXCJBZG1pbmlzdHJhdG9yXCIgKXtcblx0XHQvLyBcdHdpbmRvdy5sb2NhdGlvbiA9IFwiL2Rlc2tcIjtcblx0XHQvLyB9XG5cdFx0Ly8gaWYgKCBmcmFwcGUudXNlcl9pZCA9PSBcIkdldXN0XCIpe1xuXHRcdC8vIFx0d2luZG93LmxvY2F0aW9uID0gXCIvbG9naW5cIjtcblx0XHQvLyB9XG5cdFx0dGhpcy5jdXJyZW50VXNlcj1wcy5pbml0Q3VycmVudFVzZXIoKTtcblx0XHR0aGlzLmN1cnJlbnRVc2VyLmdldCh7fSxmdW5jdGlvbihpdGVtcyl7XG5cdFx0XHRpZih0aGlzLmN1cnJlbnRVc2VyLml0ZW1zLnVzZXJuYW1lPT1cIkd1ZXN0XCIpe1xuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24gPSBcIi9sb2dpblwiO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdCQoZG9jdW1lbnQpLnRyaWdnZXIoXCJ1c2VyTG9hZGVkXCIpO1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKFwiYWZ0ZXIgTG9hZFwiLHRoaXMuY3VycmVudFVzZXIuaXRlbXMpO1xuXHRcdFx0fVxuXHRcdH0uYmluZCh0aGlzKSk7IFxuXHRcdHRoaXMuc3RhdGU9e2l0ZW1zOnRoaXMuY3VycmVudFVzZXIuaXRlbXN9O1xuXHRcdCQoZG9jdW1lbnQpLmJpbmQoJ3VzZXJMb2FkZWQnLHRoaXMuc3RhdGVVcGRhdGUpO1xuXG5cblx0XHQvL1JvdXRpbmdcblx0XHQkKHdpbmRvdykub24oXCJoYXNoY2hhbmdlXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5oYW5kZWxSb3V0ZSgpO1xuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0dmFyIHJvdXRlID0gd2luZG93LmxvY2F0aW9uLmhhc2guc2xpY2UoMSk7XG5cdFx0aWYoIXJvdXRlKSByb3V0ZSA9IFwiI21haW5cIjtcblx0XHR0aGlzLnN0YXRlLnBhZ2U9cm91dGU7XG5cdFx0aWYgKCF3aW5kb3cubG9jYXRpb24uaGFzaCkge1xuXHRcdFx0d2luZG93LmxvY2F0aW9uLmhhc2ggPSBcIiNtYWluXCI7XG5cdFx0fVxuXHRcdCQod2luZG93KS50cmlnZ2VyKFwiaGFzaGNoYW5nZVwiKTtcblxuXHR9XG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0XG5cdH1cblx0c3RhdGVVcGRhdGUoKXtcblx0XHQvL2FsZXJ0KFwidXBkYXRlXCIpO1xuXHRcdHRoaXMuc3RhdGUuaXRlbXM9dGhpcy5jdXJyZW50VXNlci5pdGVtcztcblx0XHR0aGlzLnNldFN0YXRlKHRoaXMuc3RhdGUpO1xuXG5cdH1cblx0aGFuZGVsUm91dGUoKXtcblx0XHR2YXIgcm91dGUgPSB3aW5kb3cubG9jYXRpb24uaGFzaC5zbGljZSgxKTtcblx0XHR2YXIgcGFnZXM9e1xuXHRcdFx0bWFpbjp0aGlzLm1haW5DbGlja2VkLFxuXHRcdFx0d29ya29yZGVyczp0aGlzLndvcmtvcmRlcnNDbGlja2VkLFxuXHRcdFx0dGltZXNoZWV0OnRoaXMudGltZXNoZWV0Q2xpY2tlZFxuXHRcdH1bcm91dGVdKCk7XG5cdH1cblx0aGFuZGVsQ2xvY2tJbigpe1xuXG5cdH1cblx0bWFpbkNsaWNrZWQoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtwYWdlOidtYWluJ30pO1xuXHR9XG5cdHdvcmtvcmRlcnNDbGlja2VkKCl7XG5cblx0XHR0aGlzLnNldFN0YXRlKHtwYWdlOid3b3Jrb3JkZXJzJ30pO1xuXG5cdH1cblx0dGltZXNoZWV0Q2xpY2tlZCgpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe3BhZ2U6J3RpbWVzaGVldCd9KTtcblxuXHR9XG5cdC8vPEFmZml4V3JhcHBlciBjbGFzc05hbWU9XCJzdGlja3lfc3VibmF2IHRleHQtY2VudGVyXCIgIG9mZnNldD17MTQwfSBoZWlnaHQ9XCI0MHB4XCI+PC9BZmZpeFdyYXBwZXI+XG5cdHJlbmRlcigpe1xuXHRcdHZhciBvdXRwdXQ9Jyc7XG5cdFx0aWYgKHRoaXMuc3RhdGUuaXRlbXMudXNlcm5hbWU9PVwiR3Vlc3RcInx8dGhpcy5zdGF0ZS5pdGVtcy51c2VybmFtZT09XCJBZG1pbmlzdHJhdG9yXCIpe1xuXHRcdFx0b3V0cHV0PSg8aDM+R3Vlc3QgT3IgQWRtaW48L2gzPik7XG5cdFx0fVxuXHRcdGVsc2UgaWYodGhpcy5zdGF0ZS5pdGVtcy5sZW5ndGg9PT0wKXtcblx0XHRcdG91dHB1dD0oPGgzPk5vIFVzZXIgRGF0YTwvaDM+KTtcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdG91dHB1dD0oXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFuZWwgd2l0aC1uYXYtdGFicyBwYW5lbC1wcmltYXJ5XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1oZWFkaW5nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibmF2IG5hdi10YWJzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImFjdGl2ZVwiPjxhIGhyZWY9XCIjY2xvY2tJblRhYlwiIGRhdGEtdG9nZ2xlPVwidGFiXCI+TWFpbjwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiI3dvcmtPcmRlclRhYlwiIGRhdGEtdG9nZ2xlPVwidGFiXCI+V29yayBPcmRlcnM8L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIiN0aW1lU2hlZXRUYWJcIiBkYXRhLXRvZ2dsZT1cInRhYlwiPlRpbWUgU2hlZXRzPC9hPjwvbGk+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFiLWNvbnRlbnRcIj5cdFx0XHRcdFxuICAgICAgICAgICAgICAgICAgICAgICAgPERheXNUaW1lc2hlZXRzIFxuXHRcdFx0XHRcdFx0XHRkYXRlPXt0aGlzLnN0YXRlLml0ZW1zLnRvZGF5fVxuXHRcdFx0XHRcdFx0XHRmdWxsX25hbWU9e3RoaXMuc3RhdGUuaXRlbXMuY3VycmVudF91c2VyLmZ1bGxfbmFtZX1cblx0XHRcdFx0XHRcdFx0cGFnZT17dGhpcy5zdGF0ZS5wYWdlfVxuXHRcdFx0XHRcdFx0XHRjcmV3PXt0aGlzLnN0YXRlLml0ZW1zLmNyZXd9XG5cdFx0XHRcdFx0XHQvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRyZXR1cm4oPGRpdj5cblx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbihmdW5jdGlvbigpe1xuXHRmcmFwcGUucmVhZHkoZnVuY3Rpb24oKXtcblx0XHRSZWFjdERPTS5yZW5kZXIoIFxuXHRcdDxXb3JrUGFnZSAvPlxuXHQsIHRpbWVzaGVldHMgKTtcblx0fSlcblxufSkoKTtcblxuXG5cblxuXG4iXX0=
