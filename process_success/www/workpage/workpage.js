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
				{ className: "checkbox row" },
				React.createElement(
					"div",
					{ className: "col-xs-8" },
					React.createElement(
						"label",
						{ className: checked },
						React.createElement("input", {
							className: "big-checkbox",
							onChange: this.taskChecked,
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
							React.createElement(VineyardTasks, { workorder: this.props.workorder })
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
		_this2.modalId = "task-form" + _this2.props.workorder;

		_this2.tasksTool = new ps.apiTool({ "work_order": _this2.props.workorder }, ps.apiSetup.vineyardTasks, _this2.taskChanged);
		_this2.state = {
			tasks: _this2.tasksTool.items,
			formState: "taskType"
		};
		return _this2;
	}

	_createClass(VineyardTasks, [{
		key: 'modalNewTask',
		value: function modalNewTask() {
			this.setState({ formState: "taskType" });
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
		value: function taskChecked(index, checked) {
			//var wo_index=this.props.index;
			//this.props.onTaskChecked(wo_index,index,checked);
		}
	}, {
		key: 'editTask',
		value: function editTask() {}
	}, {
		key: 'renderTasks',
		value: function renderTasks() {
			var tasks = [];
			if (this.state.tasks !== undefined && this.state.tasks !== null) {
				tasks = [];
				console.log(this.state.tasks);
				this.state.tasks.map(function (item, index) {
					var checked = item.status ? true : false;
					tasks.push(React.createElement(_taskCheck2.default, {
						key: index,
						index: index,
						lable: item.doctype,
						checked: item.complete,
						taskChecked: this.taskChecked,
						editTask: function (_editTask) {
							function editTask(_x) {
								return _editTask.apply(this, arguments);
							}

							editTask.toString = function () {
								return _editTask.toString();
							};

							return editTask;
						}(function (e) {
							editTask(item.name);
						})
					}));
				}.bind(this));
			}
			return tasks;
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

			var form = {};
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
						return React.createElement(_sprayForm.SprayForm, {
							id: this.props.workorder,
							createSprayEntry: function createSprayEntry() {}
						});
					}
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

			form = formsObj[this.state.formState]();
			// console.log(formsObj[this.state.formState]);
			// console.log(form);
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
					var value = item.value === undefined ? "" : item.value;
					var lable = item.lable === undefined ? "" : item.lable;
					var options = item.options === undefined ? "" : item.options;
					var className = item.className === undefined ? "" : item.className;
					var readonly = item.readonly === undefined ? "" : item.readonly;
					var disabled = item.disabled === undefined ? "" : item.disabled;
					var required = item.required === undefined ? "" : item.required;
					return React.createElement(Select, {
						key: this.props.id + index,
						value: value,
						className: className,
						lable: lable,
						options: options,
						readonly: readonly,
						disabled: disabled,
						required: required,
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

var DateInput = exports.DateInput = function (_React$Component4) {
	_inherits(DateInput, _React$Component4);

	function DateInput(props) {
		_classCallCheck(this, DateInput);

		var _this4 = _possibleConstructorReturn(this, (DateInput.__proto__ || Object.getPrototypeOf(DateInput)).call(this, props));

		_this4.dateInit = _this4.dateInit.bind(_this4);
		return _this4;
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
		_this5.componentWillUnmount = _this5.componentWillUnmount.bind(_this5);
		_this5.refCall = _this5.refCall.bind(_this5);

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

var Button = exports.Button = function (_React$Component6) {
	_inherits(Button, _React$Component6);

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
exports.PruningForm = exports.SprayForm = undefined;

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

		_this.submit = _this.submit.bind(_this);
		_this.state = {
			vineyard: "",
			season: "",
			date: moment().format("MM/DD/YYYY"),
			sprayType: "",
			quantity: 0
		};
		return _this;
	}

	_createClass(SprayForm, [{
		key: "submit",
		value: function submit(e) {
			if (this.state.vineyard == "" || this.state.spray_type == "" || moment(this.state.date, "MM/DD/YYYY").isValid() !== true) {
				console.log("not valid");
			} else {
				var copy = ps.clone(this.state);
				$('#' + this.props.id).modal('hide');
				this.state = {
					vineyard: "",
					season: "",
					date: moment().format("MM/DD/YYYY"),
					spray_type: "",
					quantity: 0
				};
				this.setState(this.state);
				console.log("IN SUBMIT");
				this.props.createSprayEntry(copy);
			}
		}
	}, {
		key: "render",
		value: function render() {
			var fields = [{
				field: "autoComplete",
				onChange: function (e) {
					this.setState({ vineyard: e.target.value });
				}.bind(this),
				value: this.state.vineyard,
				required: true,
				lable: "Vineyard",
				doctype: "Vineyard",
				docvalue: "name"
			}, {
				field: "autoComplete",
				onChange: function (e) {
					this.setState({ season: e.target.value });
				}.bind(this),
				value: this.state.season,
				required: true,
				lable: "Season",
				doctype: "Season",
				docvalue: "name"
			}, {
				field: "date",
				required: true,
				onChange: function (e) {
					this.setState({ date: e.target.value });
				}.bind(this),
				value: this.state.date,
				lable: "Date"
			}, {
				field: "autoComplete",
				onChange: function (e) {
					this.setState({ spray_type: e.target.value });
				}.bind(this),
				value: this.state.spray_type,
				required: true,
				lable: "Spray Type",
				doctype: "Spray Type",
				docvalue: "name"
			}, {
				field: "input",
				className: "vineyard-input",
				type: "number",
				onChange: function (e) {
					this.setState({ quantity: e.target.value });
				}.bind(this),
				value: this.state.quantity,
				lable: "quantity"
			}, {
				field: "button",
				type: "submit",
				value: "Create Spraying Entry",
				className: "btn-primary pull-right",
				onClick: this.submit
			}];
			return React.createElement(
				"div",
				null,
				"NEW SPRAY",
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

var PruningForm = exports.PruningForm = function (_React$Component2) {
	_inherits(PruningForm, _React$Component2);

	function PruningForm(props) {
		_classCallCheck(this, PruningForm);

		var _this2 = _possibleConstructorReturn(this, (PruningForm.__proto__ || Object.getPrototypeOf(PruningForm)).call(this, props));

		_this2.submit = _this2.submit.bind(_this2);
		_this2.state = {
			vineyard: "",
			season: "",
			date: moment().format("MM/DD/YYYY"),
			sprayType: "",
			quantity: 0
		};
		return _this2;
	}

	_createClass(PruningForm, [{
		key: "submit",
		value: function submit(e) {
			if (this.state.vineyard == "" || this.state.spray_type == "" || moment(this.state.date, "MM/DD/YYYY").isValid() !== true) {
				console.log("not valid");
			} else {
				var copy = ps.clone(this.state);
				$('#' + this.props.id).modal('hide');
				this.state = {
					vineyard: "",
					season: "",
					date: moment().format("MM/DD/YYYY"),
					spray_type: "",
					quantity: 0
				};
				this.setState(this.state);
				console.log("IN SUBMIT");
				this.props.createSprayEntry(copy);
			}
		}
	}, {
		key: "render",
		value: function render() {
			var fields = [{
				field: "date",
				required: true,
				onChange: function (e) {
					this.setState({ date: e.target.value });
				}.bind(this),
				value: this.state.date,
				lable: "Date"
			}, {
				field: "input",
				className: "vineyard-input",
				type: "number",
				onChange: function (e) {
					this.setState({ quantity: e.target.value });
				}.bind(this),
				value: this.state.quantity,
				lable: "quantity"
			}, {
				field: "button",
				type: "submit",
				value: "Create Spraying Entry",
				className: "btn-primary pull-right",
				onClick: this.submit
			}];
			return React.createElement(
				"div",
				null,
				"NEW PRUNNING",
				React.createElement(_forms2.default, {
					id: "CreateSprayingEntryForm",
					type: "horizontal",
					fields: fields

				})
			);
		}
	}]);

	return PruningForm;
}(React.Component);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c190aW1lc2hlZXRzL0RheXNUaW1lU2hlZXRzLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy9kYXlzX3RpbWVzaGVldHMvY2xvY2tJbi5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c190aW1lc2hlZXRzL2VtcGxveWVlVGltZS5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c190aW1lc2hlZXRzL3RpbWVTaGVldC5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c193b3Jrb3JkZXJzL0RheXNXb3Jrb3JkZXJzLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy9kYXlzX3dvcmtvcmRlcnMvY3JlYXRlSXNzdWUuanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL2RheXNfd29ya29yZGVycy90YXNrQ2hlY2suanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL2RheXNfd29ya29yZGVycy93b3Jrb3JkZXJUYXNrLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9mb3Jtcy5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdXRpbHMvbW9kYWwuanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL3ZpbmV5YXJkL3NwcmF5Rm9ybS5qc3giLCJwcm9jZXNzX3N1Y2Nlc3Mvd3d3L3dvcmtwYWdlL3dvcmtwYWdlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQ0E7Ozs7QUFDQTs7OztBQUNBOzs7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VyxJQUhBO0FBSWpCLGNBQU0sS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQjtBQUpOO0FBREo7QUFESjtBQVRaLEtBREQ7QUFzQkE7O0FBRUQsVUFBTztBQUFBO0FBQUE7QUFDTDtBQURLLElBQVA7QUFJQTs7OztFQXBIcUIsTUFBTSxTOztBQXVIN0IsQ0FBQyxZQUFVO0FBQ1YsUUFBTyxLQUFQLENBQWEsWUFBVTtBQUN0QixXQUFTLE1BQVQsQ0FDQSxvQkFBQyxRQUFELE9BREEsRUFFQyxVQUZEO0FBR0EsRUFKRDtBQU1BLENBUEQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5pbXBvcnQgRGF5c1dvcmtvcmRlcnMgZnJvbSAnLi4vZGF5c193b3Jrb3JkZXJzL0RheXNXb3Jrb3JkZXJzJ1xuaW1wb3J0IEVtcGxveWVlVGltZSBmcm9tICcuL2VtcGxveWVlVGltZSc7XG5pbXBvcnQgVGltZVNoZWV0IGZyb20gJy4vdGltZVNoZWV0JztcbmltcG9ydCBDbG9ja0luIGZyb20gJy4vY2xvY2tJbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERheXNUaW1lU2hlZXRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuc3RhdGU9e2l0ZW1zOltdfTtcblx0XHR0aGlzLnN0YXRlLnRpbWU9Jyc7XG5cdFx0dGhpcy5hZGQ9e307XG5cblx0XHQvKiAgICAgRG8gdGhlIGJpbmQgdGhpbmcgICAgICAqL1xuXG5cdFx0Ly9UaW1lIGVtcGxveWVlIGxpbmUgaXRlbVxuXHRcdHRoaXMudGltZUNoYW5nZWQ9dGhpcy50aW1lQ2hhbmdlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMudXBkYXRlVGltZT10aGlzLnVwZGF0ZVRpbWUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmRlbGV0ZUVtcGxveWVlPXRoaXMuZGVsZXRlRW1wbG95ZWUuYmluZCh0aGlzKTtcblxuXHRcdHRoaXMudXBkYXRlRnJvbVNlcnZlcj10aGlzLnVwZGF0ZUZyb21TZXJ2ZXIuYmluZCh0aGlzKTtcblx0XHR0aGlzLnRpbWVTaGVldFdyYXBwZXI9dGhpcy50aW1lU2hlZXRXcmFwcGVyLmJpbmQodGhpcyk7XG5cblx0XHR0aGlzLmFkZEVtcGxveWVlPXRoaXMuYWRkRW1wbG95ZWUuYmluZCh0aGlzKVxuXHRcdHRoaXMudXBkYXRlRnJvbVNlcnZlclBhcmFtPXRoaXMudXBkYXRlRnJvbVNlcnZlclBhcmFtLmJpbmQodGhpcyk7XG5cblx0XHR0aGlzLmNsb2NrSW49dGhpcy5jbG9ja0luLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jbG9ja091dD10aGlzLmNsb2NrT3V0LmJpbmQodGhpcyk7XG5cdFx0LyogICAgZW5kIEJpbmQgZGluZyBkaW5nICAgICAgICAgKi9cblxuXHRcdHRoaXMuYXV0b2NvbXBsZXRlQXJyPVtdO1xuXHRcdHZhciBhcmdzPXt9O1xuXG5cdFx0Ly9HcmFiIHRoZSBlbXBsb3llZSB0aW1lc2hlZXQgZGF0YVxuXHRcdHRoaXMub2JqVG9vbD1wcy5pbml0VGltZVNoZWV0cygpXG5cdFx0dGhpcy5vYmpUb29sLmdldCh7ZGF0ZTpwcm9wcy5kYXRlfSxmdW5jdGlvbigpe1xuXHRcdFx0dGhpcy51cGRhdGVGcm9tU2VydmVyKCk7XG5cdFx0XHR0aGlzLm9ialRvb2wucmVhY3RTZXR1cCh0aGlzLnVwZGF0ZUZyb21TZXJ2ZXIpO1xuXHRcdH0uYmluZCh0aGlzKSk7XG5cblx0XHRpZiAodGhpcy5vYmpUb29sLml0ZW1zPT09dW5kZWZpbmVkIHx8dGhpcy5vYmpUb29sLml0ZW1zPT09IDAgKXtcblx0XHR9ZWxzZXt0aGlzLnN0YXRlLml0ZW1zPXRoaXMub2JqVG9vbC5pdGVtczt9XG5cblx0XHQvL0dyYWIgdGhlIGVtcGxveWVlIGxpc3Rcblx0XHR2YXIgdG9vbD1wcy5pbml0RW1wbG95ZWVMaXN0KCk7XG5cdFx0dG9vbC5nZXQoe30sZnVuY3Rpb24oKXtcblx0XHRcdHBzLmVtcGxveWVlX2xhYmxlcz0gdG9vbC5pdGVtcy5tYXAoZnVuY3Rpb24ob2JqKSB7IFxuXHRcdFx0XHR2YXIgck9iaiA9IHt9O1xuXHRcdFx0XHRyT2JqLmxhYmVsPW9iai5mdWxsX25hbWU7XG5cdFx0XHRcdHJPYmoudmFsdWU9b2JqLm5hbWU7XG5cdFx0XHRcdHJldHVybiByT2JqO1xuXHRcdFx0fSk7XG5cdFx0XHQkKGRvY3VtZW50KS50cmlnZ2VyKFwiZW1wbG95ZWVMYWJsZXNMb2FkZWRcIik7XG5cdFx0fSk7XG5cblxuXHRcdFxuXG5cdH1cblxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIGhlbHBlciBGdW5jdGlvblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLVxuXHR1cGRhdGVGcm9tU2VydmVyKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7aXRlbXM6dGhpcy5vYmpUb29sLml0ZW1zfSk7XG5cdH1cblx0dXBkYXRlRnJvbVNlcnZlclBhcmFtKGRhdGEsaW5kZXgpe1xuXHRcdHRoaXMub2JqVG9vbC5pdGVtc1tpbmRleF09ZGF0YTtcblx0XHR0aGlzLnNldFN0YXRlKHtpdGVtczp0aGlzLm9ialRvb2wuaXRlbXN9KTtcblx0fVxuXHRjcmV3c1RpbWVzaGVldEluZGV4KGNyZXcpe1xuXHRcdGZvciAodmFyIGk9MDsgaSA8IHRoaXMub2JqVG9vbC5pdGVtcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHR2YXIgaXRlbT10aGlzLm9ialRvb2wuaXRlbXNbaV07XG5cdFx0XHRpZihpdGVtLmNyZXc9PWNyZXcpe1xuXHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0Z2V0SW5kZXhUaW1lc2hlZXQodGltZXNoZWV0KXtcblx0XHRyZXR1cm4gdGhpcy5vYmpUb29sLmdldF9pbmRleF9vZl9pdGVtKHRpbWVzaGVldCk7XG5cdH1cblx0Z2V0SW5kZXhFbXBsb3llZSh0aW1lc2hlZXRJbmRleCxlbXBsb3llZU5hbWUpe1xuXHRcdHZhciBlbXBsb3llZXM9dGhpcy5vYmpUb29sLml0ZW1zW3RpbWVzaGVldEluZGV4XS5lbXBsb3llZXM7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlbXBsb3llZXMubGVuZ3RoOyBpKyspe1xuXHRcdFx0aWYgKGVtcGxveWVlTmFtZT09ZW1wbG95ZWVzW2ldLmVtcGxveWVlKXtcblx0XHRcdFx0cmV0dXJuIGk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdH1cblxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vICAgICAgIFRpbWVzaGVldCBXcmFwcGVyIEZ1bmN0aW9uc1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVx0XG5cblx0Y2xvY2tJbih0aW1lLGNyZXcpe1xuXG5cdFx0dmFyIHRzX2luZGV4PXRoaXMuY3Jld3NUaW1lc2hlZXRJbmRleChjcmV3KTtcblxuXHRcdHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzO1xuXHRcdGZvciAodmFyIGk9MDsgaSA8IHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzLmxlbmd0aDsgaSsrKXtcblx0XHRcdHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzW2ldLnN0YXJ0PXRpbWU7XG5cdFx0fVxuXHRcdHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uc3RhdHVzPVwiQ2xvY2tlZCBJblwiO1xuXHRcdHRoaXMub2JqVG9vbC51cGRhdGUodGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7aXRlbXM6dGhpcy5vYmpUb29sLml0ZW1zfSk7XG5cdH1cblx0Y2xvY2tPdXQodGltZSxjcmV3KXtcblxuXHRcdHZhciB0c19pbmRleD10aGlzLmNyZXdzVGltZXNoZWV0SW5kZXgoY3Jldyk7XG5cblx0XHR0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlcztcblx0XHRmb3IgKHZhciBpPTA7IGkgPCB0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHR0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlc1tpXS5lbmQ9dGltZTtcblx0XHR9XG5cdFx0dGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5zdGF0dXM9XCJDbG9ja2VkIE91dFwiO1xuXHRcdHRoaXMub2JqVG9vbC51cGRhdGUodGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7aXRlbXM6dGhpcy5vYmpUb29sLml0ZW1zfSk7XG5cdH1cblx0YWRkRW1wbG95ZWUodHNfbmFtZSwgZW1wbG95ZWVfbmFtZSl7XG5cdFx0dmFyIHRzX2luZGV4ID0gdGhpcy5nZXRJbmRleFRpbWVzaGVldCh0c19uYW1lKTtcblx0XHR2YXIgZW1wbG95ZWVJbmRleCA9IHRoaXMuZ2V0SW5kZXhFbXBsb3llZSh0c19pbmRleCxlbXBsb3llZV9uYW1lKTtcblxuXHRcdHZhciB1cGRhdGVDYWxsYmFjaz1mdW5jdGlvbihpbmRleCl7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oZGF0YSl7XHRcdFx0XG5cdFx0XHRcdHRoaXMudXBkYXRlRnJvbVNlcnZlclBhcmFtKGRhdGEsaW5kZXgpO1xuXHRcdFx0fS5iaW5kKHRoaXMpO1xuXHRcdH0uYmluZCh0aGlzKTtcblxuXHRcdGZvciAodmFyIGk9MDsgaSA8IHRoaXMub2JqVG9vbC5pdGVtcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHR2YXIgaXRlbSA9IHRoaXMub2JqVG9vbC5pdGVtc1tpXTtcblx0XHRcdGlmKGl0ZW0ubmFtZT09dHNfbmFtZSl7XG5cdFx0XHRcdGZvciAodmFyIHg9MDsgeCA8IGl0ZW0uZW1wbG95ZWVzLmxlbmd0aDsgeCsrKXtcblx0XHRcdFx0XHR2YXIgY29udGFpbmVyID0gaXRlbS5lbXBsb3llZXNbeF07XG5cdFx0XHRcdFx0aWYgKGNvbnRhaW5lci5lbXBsb3llZT09ZW1wbG95ZWVfbmFtZSl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gXCJkdXBsaWNhdGVcIjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5vYmpUb29sLml0ZW1zW2ldLmVtcGxveWVlcy5wdXNoKHsgZW1wbG95ZWUgOiBlbXBsb3llZV9uYW1lLCBuZXc6JzEnfSk7XG5cdFx0XHRcdHRoaXMub2JqVG9vbC51cGRhdGUodGhpcy5vYmpUb29sLml0ZW1zW2ldLHVwZGF0ZUNhbGxiYWNrKGkpLDEpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHZhciBkb25lPTE7XG5cdFx0XHRcdGlmKGl0ZW0uZW1wbG95ZWVzLmxlbmd0aD4wKXtcblx0XHRcdFx0XHRmb3IgKHZhciB4PTA7IHggPCBpdGVtLmVtcGxveWVlcy5sZW5ndGggJiYgZG9uZTsgeCsrKXtcblx0XHRcdFx0XHRcdHZhciBjb250YWluZXIgPSBpdGVtLmVtcGxveWVlc1t4XTtcblx0XHRcdFx0XHRcdGlmIChjb250YWluZXIuZW1wbG95ZWU9PWVtcGxveWVlX25hbWUpe1xuXHRcdFx0XHRcdFx0XHR0aGlzLm9ialRvb2wuaXRlbXNbaV0uZW1wbG95ZWVzLnNwbGljZSh4LCAxKTtcblx0XHRcdFx0XHRcdFx0dGhpcy5vYmpUb29sLmNoYW5nZWQodGhpcy5vYmpUb29sLml0ZW1zW2ldKTtcblx0XHRcdFx0XHRcdFx0ZG9uZT0wO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHR9O1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyAgICAgICAgICAgVGltZXNoZWV0IFdyYXBwZXJcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cdFxuXHR0aW1lU2hlZXRXcmFwcGVyKGl0ZW0saW5kZXgpe1xuXHRcdHZhciBlbXBsb3llZV9vdXRwdXQ9W107XG5cdFx0aWYoaXRlbS5lbXBsb3llZXM9PT11bmRlZmluZWQpe1xuXG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHR2YXIgZW1wbG95ZWVPdXRwdXQ9aXRlbS5lbXBsb3llZXMubWFwKGZ1bmN0aW9uKGl0ZW1fZW1wbG95ZWUsaW5kZXhfZW1wbG95ZWUpe1xuXHRcdFx0IFx0ZW1wbG95ZWVfb3V0cHV0LnB1c2godGhpcy5lbXBsb3llZUxpbmVJdGVtKGl0ZW1fZW1wbG95ZWUsaXRlbS5uYW1lLGluZGV4X2VtcGxveWVlKSk7XG5cdFx0XHR9LmJpbmQodGhpcykpO1xuXHRcdH1cblxuXHRcdHJldHVybihcblxuXHRcdFx0PFRpbWVTaGVldFxuXHRcdFx0XHRrZXk9e2luZGV4fSBcblx0XHRcdFx0bmFtZT17aXRlbS5uYW1lfVxuXHRcdFx0XHRkYXRlPXtpdGVtLmRhdGV9XG5cdFx0XHRcdGNyZXc9e2l0ZW0uY3Jld31cblx0XHRcdFx0ZW1wbG95ZWVzPXtlbXBsb3llZV9vdXRwdXR9XG5cdFx0XHRcdGFkZEVtcGxveWVlPXt0aGlzLmFkZEVtcGxveWVlfVxuXHRcdFx0XHRvblVwZGF0ZT17dGhpcy51cGRhdGV9XG5cdFx0XHQvPlxuXG5cdFx0KTtcblx0fVxuXG5cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyAgICAgICBFbXBsb3llZSBUaW1lIEZvcm0gTGluZWl0ZW1cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0ZGVsZXRlRW1wbG95ZWUoZW1wbG95ZWUsdGltZXNoZWV0KXtcblx0XHR2YXIgdHNfaW5kZXggPSB0aGlzLmdldEluZGV4VGltZXNoZWV0KHRpbWVzaGVldCk7XG5cdFx0dmFyIGRvbmU9MTtcblx0XHR2YXIgaXRlbT10aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdO1xuXHRcdGlmKGl0ZW0uZW1wbG95ZWVzLmxlbmd0aD4wKXtcblx0XHRcdGZvciAodmFyIHg9MDsgeCA8IGl0ZW0uZW1wbG95ZWVzLmxlbmd0aCAmJiBkb25lOyB4Kyspe1xuXHRcdFx0XHR2YXIgY29udGFpbmVyID0gaXRlbS5lbXBsb3llZXNbeF07XG5cdFx0XHRcdGlmIChjb250YWluZXIuZW1wbG95ZWU9PWVtcGxveWVlKXtcblx0XHRcdFx0XHR0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlcy5zcGxpY2UoeCwgMSk7XG5cdFx0XHRcdFx0Ly/GkmNvbnNvbGUubG9nKHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0pO1xuXHRcdFx0XHRcdHRoaXMub2JqVG9vbC51cGRhdGUodGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XSk7XG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7aXRlbXM6dGhpcy5vYmpUb29sLml0ZW1zfSk7XG5cdFx0XHRcdFx0ZG9uZT0wO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0dGltZUNoYW5nZWQocG9zaXRpb24sZW1wbG95ZWUsdGltZXNoZWV0LHZhbHVlKXtcblx0XHR2YXIgdHNfaW5kZXggPSB0aGlzLmdldEluZGV4VGltZXNoZWV0KHRpbWVzaGVldCk7XG5cdFx0dmFyIGVtcGxveWVlSW5kZXggPSB0aGlzLmdldEluZGV4RW1wbG95ZWUodHNfaW5kZXgsZW1wbG95ZWUpO1xuXHRcdHRoaXMuc3RhdFxuXHRcdGlmKHBvc2l0aW9uPT0nZW5kJyl7XG5cdFx0XHR0aGlzLnN0YXRlLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXNbZW1wbG95ZWVJbmRleF0uZW5kPXZhbHVlO1xuXHRcdH1cblx0XHRlbHNle3RoaXMuc3RhdGUuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlc1tlbXBsb3llZUluZGV4XS5zdGFydD12YWx1ZX1cblx0ICAgIHRoaXMuc2V0U3RhdGUoe2l0ZW1zOnRoaXMuc3RhdGUuaXRlbXN9KTtcblx0fVxuXHR1cGRhdGVUaW1lKHBvc2l0aW9uLGVtcGxveWVlLHRpbWVzaGVldCx2YWx1ZSl7XG5cdFx0dmFyIHRzX2luZGV4ID0gdGhpcy5nZXRJbmRleFRpbWVzaGVldCh0aW1lc2hlZXQpO1xuXHRcdHZhciBlbXBsb3llZUluZGV4ID0gdGhpcy5nZXRJbmRleEVtcGxveWVlKHRzX2luZGV4LGVtcGxveWVlKTtcblx0XHR2YXIgc2F2ZT0wO1xuXHRcdHZhbHVlPXBzLnRpbWVfYWRkX2RpZ2l0cyh2YWx1ZSlcblx0XHRpZihwb3NpdGlvbj09J2VuZCcgJiYgcHMudGltZV9hZGRfZnJvbnRfemVybyh0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlc1tlbXBsb3llZUluZGV4XS5lbmQpICE9IHBzLnRpbWVfYWRkX2RpZ2l0cyh2YWx1ZSkpeyBcblx0XHRcdHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzW2VtcGxveWVlSW5kZXhdLmVuZD1wcy50aW1lX2FkZF9kaWdpdHModmFsdWUpO1xuXHRcdFx0c2F2ZT0xO1xuXHRcdH1cblx0ICAgIGlmKHBvc2l0aW9uPT0nc3RhcnQnICYmIHBzLnRpbWVfYWRkX2Zyb250X3plcm8odGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXNbZW1wbG95ZWVJbmRleF0uc3RhcnQpICE9IHBzLnRpbWVfYWRkX2RpZ2l0cyh2YWx1ZSkpe1xuXHQgICAgXHR0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlc1tlbXBsb3llZUluZGV4XS5zdGFydD1wcy50aW1lX2FkZF9kaWdpdHModmFsdWUpO1xuXHQgICAgXHRzYXZlPTE7XG5cdCAgICB9XG5cdCAgICBpZihzYXZlKXtcblx0XHQgICAgdGhpcy5zZXRTdGF0ZSh7aXRlbXM6dGhpcy5vYmpUb29sLml0ZW1zfSk7XG5cdFx0ICAgIHRoaXMub2JqVG9vbC51cGRhdGUodGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XSxmdW5jdGlvbigpe1xuXHRcdCAgICBcdHBzLnN1Y2Nlc3NBbGVydCh0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlc1tlbXBsb3llZUluZGV4XS5lbXBsb3llZV9uYW1lK1wiIHRpbWUgdXBkYXRlZCFcIik7XG5cdFx0ICAgIH0uYmluZCh0aGlzKSk7XG5cdFx0fVxuXHR9XG5cdGVtcGxveWVlTGluZUl0ZW0oZW1wbG95ZWVfY29udGFpbmVyLHRpbWVfc2hlZXQsZW1wbG95ZWVfaW5kZXgpe1xuXHRcdHJldHVybihcblx0XHRcdDxFbXBsb3llZVRpbWVcblx0XHRcdFx0a2V5PXtlbXBsb3llZV9pbmRleH1cblx0XHRcdFx0dGltZXNoZWV0PXt0aW1lX3NoZWV0fVxuXHRcdFx0XHRlbXBsb3llZV9uYW1lPXtlbXBsb3llZV9jb250YWluZXIuZW1wbG95ZWVfbmFtZX1cblx0XHRcdFx0ZW1wbG95ZWU9e2VtcGxveWVlX2NvbnRhaW5lci5lbXBsb3llZX1cblx0XHRcdFx0c3RhcnQ9e3BzLnRpbWVfYWRkX2Zyb250X3plcm8oZW1wbG95ZWVfY29udGFpbmVyLnN0YXJ0KX1cblx0XHRcdFx0ZW5kPXtwcy50aW1lX2FkZF9mcm9udF96ZXJvKGVtcGxveWVlX2NvbnRhaW5lci5lbmQpfVxuXHRcdFx0XHR1cGRhdGVUaW1lPXt0aGlzLnVwZGF0ZVRpbWV9XG5cdFx0XHRcdHRpbWVDaGFuZ2VkPXt0aGlzLnRpbWVDaGFuZ2VkfVxuXHRcdFx0XHRkZWxldGVFbXBsb3llZT17dGhpcy5kZWxldGVFbXBsb3llZX1cblx0XHRcdC8+XG5cdFx0KTtcblx0fVxuXG5cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vICAgICAgICBSZW5kZXJcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRyZW5kZXIoKXtcblx0XHQvL2hhbmRlbCBlbXB0eSByZXR1cm5cblx0XHRpZiAodGhpcy5zdGF0ZS5pdGVtcy5sZW5ndGg9PT0wfHx0aGlzLnN0YXRlLml0ZW1zPT09dW5kZWZpbmVkKXtcblx0XHRcdHJldHVybiAoPGRpdj5ObyBUaW1lIFNoZWV0cywgc3RhcnQgYnkgPGEgaHJlZj1cIi9kZXNrXCI+Y3JlYXRpbmcgc29tZSBjcmV3cyE8L2E+PC9kaXY+KTtcblx0XHR9XG5cdFx0dmFyIG91dHB1dD1bXVxuXHRcdHRoaXMuc3RhdGUuaXRlbXMubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblx0XHRcdGlmKGl0ZW0uY3Jldz09dGhpcy5wcm9wcy5jcmV3KXtcblx0XHRcdFx0b3V0cHV0LnVuc2hpZnQodGhpcy50aW1lU2hlZXRXcmFwcGVyKGl0ZW0saW5kZXgpKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRvdXRwdXQucHVzaCh0aGlzLnRpbWVTaGVldFdyYXBwZXIoaXRlbSxpbmRleCkpO1xuXHRcdFx0fVxuXHRcdH0uYmluZCh0aGlzKSk7XG5cblx0XHR2YXIgdHNfaW5kZXg9dGhpcy5jcmV3c1RpbWVzaGVldEluZGV4KHRoaXMucHJvcHMuY3Jldyk7XG5cdFx0dmFyIHN0YXR1cz0nJztcblx0XHRpZiAodHNfaW5kZXg9PXVuZGVmaW5lZCl7dmFyIHN0YXR1cz1mYWxzZTt9XG5cdFx0ZWxzZXtzdGF0dXMgPXRoaXMuc3RhdGUuaXRlbXNbdHNfaW5kZXhdLnN0YXR1c31cblx0XHRcblxuXHRcdC8vTUFJTiBSRU5ERVJcblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInRhYi1wYW5lIGZhZGUgaW4gYWN0aXZlXCIgaWQ9XCJjbG9ja0luVGFiXCI+XG5cdFx0XHRcdFx0PENsb2NrSW5cblx0XHRcdFx0XHRcdGNsb2NrSW49e3RoaXMuY2xvY2tJbn1cblx0XHRcdFx0XHRcdGNsb2NrT3V0PXt0aGlzLmNsb2NrT3V0fVxuXHRcdFx0XHRcdFx0c3RhdHVzPXtzdGF0dXN9XG5cdFx0XHRcdFx0XHRmdWxsX25hbWU9e3RoaXMucHJvcHMuZnVsbF9uYW1lfVxuXHRcdFx0XHRcdFx0ZGF0ZT17dGhpcy5wcm9wcy5kYXRlfVxuXHRcdFx0XHRcdFx0Y3Jldz17dGhpcy5wcm9wcy5jcmV3fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInRhYi1wYW5lIGZhZGVcIiBpZD1cInRpbWVTaGVldFRhYlwiPlxuXHRcdFx0XHRcdDxici8+XG5cdFx0XHRcdFx0e291dHB1dH1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidGFiLXBhbmUgZmFkZVwiIGlkPVwid29ya09yZGVyVGFiXCI+XG5cdFx0XHRcdFx0XHQ8RGF5c1dvcmtvcmRlcnMgXG5cdFx0XHRcdFx0XHRcdGRhdGU9e3RoaXMucHJvcHMuZGF0ZX1cblx0XHRcdFx0XHRcdFx0Y3Jldz17dGhpcy5wcm9wcy5jcmV3fVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblxuXHRcdCk7XG5cblx0fTtcdFxufVxuXG5cblxuXG5cbiIsIi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xvY2tJbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnRvZ2dsZVRpbWVJbnB1dD10aGlzLnRvZ2dsZVRpbWVJbnB1dC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY2xvY2tJbj10aGlzLmNsb2NrSW4uYmluZCh0aGlzKTtcblx0XHR0aGlzLmNsb2NrT3V0PXRoaXMuY2xvY2tPdXQuYmluZCh0aGlzKTtcblx0XHR0aGlzLm9uQ2hhbmdlPXRoaXMub25DaGFuZ2UuYmluZCh0aGlzKTtcblxuXHRcdHRoaXMuc3RhdGU9e1xuXHRcdFx0ZGF0ZTpuZXcgRGF0ZSgpLFxuXHRcdFx0c3BlY2lmeVRpbWU6ZmFsc2Vcblx0XHR9O1xuXG5cdH1cblx0Y2xvY2tJbihlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0aWYodGhpcy5zdGF0ZS5zcGVjaWZ5VGltZT09ZmFsc2Upe1xuXHRcdFx0dmFyIHRpbWU9dGhpcy5zdGF0ZS5kYXRlLnRvTG9jYWxlVGltZVN0cmluZyhbXSwge2hvdXI6ICcyLWRpZ2l0JywgbWludXRlOicyLWRpZ2l0Jyxob3VyMTI6IGZhbHNlfSlcblx0XHRcdC8vY29uc29sZS5sb2codGltZSk7XG5cdFx0XHRwcy5zdWNjZXNzQWxlcnQoXCJDbG9ja2VkIGluIGF0IFwiICsgdGhpcy5zdGF0ZS5kYXRlLnRvTG9jYWxlVGltZVN0cmluZyhbXSwge2hvdXI6ICcyLWRpZ2l0JywgbWludXRlOicyLWRpZ2l0J30pKVxuXHRcdFx0dGhpcy5wcm9wcy5jbG9ja0luKHRpbWUsIHRoaXMucHJvcHMuY3Jldylcblx0XHR9ZWxzZXtcblx0XHRcdC8vY29uc29sZS5sb2codGhpcy5zdGF0ZS50aW1lKVxuXHRcdFx0aWYodGhpcy5zdGF0ZS50aW1lIT11bmRlZmluZWQpe1xuXHRcdFx0XHR0aGlzLnByb3BzLmNsb2NrSW4odGhpcy5zdGF0ZS50aW1lLCB0aGlzLnByb3BzLmNyZXcpO1xuXHRcdFx0XHRwcy5zdWNjZXNzQWxlcnQoXCJDbG9ja2VkIGluXCIpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdC8vaW52YWxpZCB0aW1lIGVycm9yXG5cdFx0XHRcdHBzLmZhaWxBbGVydChcIkludmFsaWQgdGltZS5cIilcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0Y2xvY2tPdXQoZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGlmKHRoaXMuc3RhdGUuc3BlY2lmeVRpbWU9PWZhbHNlKXtcblx0XHRcdHZhciB0aW1lPXRoaXMuc3RhdGUuZGF0ZS50b0xvY2FsZVRpbWVTdHJpbmcoW10sIHtob3VyOiAnMi1kaWdpdCcsIG1pbnV0ZTonMi1kaWdpdCcsaG91cjEyOiBmYWxzZX0pXG5cdFx0XHQvL2NvbnNvbGUubG9nKHRpbWUpO1xuXHRcdFx0cHMuc3VjY2Vzc0FsZXJ0KFwiQ2xvY2tlZCBvdXQgYXQgXCIgKyB0aGlzLnN0YXRlLmRhdGUudG9Mb2NhbGVUaW1lU3RyaW5nKFtdLCB7aG91cjogJzItZGlnaXQnLCBtaW51dGU6JzItZGlnaXQnfSkrXCIgSGF2ZSBhIGdyZWF0IG5pZ2h0IVwiKVxuXHRcdFx0dGhpcy5wcm9wcy5jbG9ja091dCh0aW1lLCB0aGlzLnByb3BzLmNyZXcpXG5cdFx0fWVsc2V7XG5cdFx0XHQvL2NvbnNvbGUubG9nKHRoaXMuc3RhdGUudGltZSlcblx0XHRcdGlmKHRoaXMuc3RhdGUudGltZSE9dW5kZWZpbmVkKXtcblx0XHRcdFx0dGhpcy5wcm9wcy5jbG9ja091dCh0aGlzLnN0YXRlLnRpbWUsIHRoaXMucHJvcHMuY3Jldyk7XG5cdFx0XHRcdHBzLnN1Y2Nlc3NBbGVydChcIkNsb2NrZWQgT3V0ISAgSGF2ZSBhIGdyZWF0IG5pZ2h0IVwiKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHQvL2ludmFsaWQgdGltZSBlcnJvclxuXHRcdFx0XHRwcy5mYWlsQWxlcnQoXCJJbnZhbGlkIHRpbWUuXCIpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHRvZ2dsZVRpbWVJbnB1dChlKXtcblx0XHQvL2NvbnNvbGUubG9nKHRoaXMuc3RhdGUuc3BlY2lmeVRpbWUpO1xuXHRcdGlmKHRoaXMuc3RhdGUuc3BlY2lmeVRpbWUpe1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7c3BlY2lmeVRpbWU6ZmFsc2V9KTtcblx0XHR9XG5cdFx0ZWxzZXt0aGlzLnNldFN0YXRlKHtzcGVjaWZ5VGltZTp0cnVlfSk7fVxuXHR9XG5cdG9uQ2hhbmdlKGUpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe3RpbWU6ZS50YXJnZXQudmFsdWV9KTtcblx0fVxuXHRjb21wb25lbnREaWRNb3VudCgpIHtcblx0XHR0aGlzLnRpbWVySUQgPSBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLnRpY2soKSwxMDAwMCk7XG5cdH1cblxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcblx0XHRjbGVhckludGVydmFsKHRoaXMudGltZXJJRCk7XG5cdH1cblxuXHR0aWNrKCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0ZGF0ZTogbmV3IERhdGUoKVxuXHRcdH0pO1xuXHR9XG5cdHJlbmRlcigpe1xuXG5cdFxuXHRcdHZhciB2YWx1ZXM9e1xuXHRcdFx0J0NyZWF0ZWQnOlt0aGlzLmNsb2NrSW4sJ0Nsb2NrIEluJywnYnRuIGJ0bi1sZyBidG4tc3VjY2VzcyBidG4tYmxvY2snXSxcblx0XHRcdCdDbG9ja2VkIEluJzpbdGhpcy5jbG9ja091dCwgJ0Nsb2NrIE91dCcsICdidG4gYnRuLWxnIGJ0bi1zdWNjZXNzIGJ0bi1ibG9jaycgXSxcblx0XHRcdCdDbG9ja2VkIE91dCc6W3RoaXMuY2xvY2tPdXQsICdDaGFuZ2UgQ2xvY2tvdXQgVGltZScsJ2J0biBidG4tbGcgYnRuLXN1Y2Nlc3MgYnRuLWJsb2NrJ10sXG5cdFx0XHQnU3VibWludGVkJzpbJycsJ0FscmVhZHkgU3VibWludGVkJywnYnRuIGJ0bi1sZyBidG4tc3VjY2VzcyBidG4tYmxvY2snXSxcblx0XHRcdCdBcHJvdmVkJzpbJycsJ0FscmVhZHkgU3VibWludGVkJywnYnRuIGJ0bi1sZyBidG4tc3VjY2VzcyBidG4tYmxvY2snXVxuXHRcdH1bdGhpcy5wcm9wcy5zdGF0dXNdO1xuXHRcdHZhciBvdXRwdXQ9Jyc7XG5cdFx0aWYgKHZhbHVlcz09dW5kZWZpbmVkKXtcblx0XHRcdG91dHB1dD0oPGEgaHJlZj1cIiN0aW1lc2hlZXRcIj5Zb3UgYXJlIG5vdCBpbiBhIFRpbWUgU2hlZXQgYWRkIHlvdXJzZWxmLjwvYT4pO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0dmFyIGlucHV0RmllbGQgPSAoIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPXt2YWx1ZXNbMl19IG9uQ2xpY2s9e3ZhbHVlc1swXX0gdmFsdWU9e3ZhbHVlc1sxXX0gLz4pO1xuXHRcdFx0b3V0cHV0PShcblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG5cdFx0XHRcdFx0V2VsY29tZSA8c3BhbiBjbGFzc05hbWU9XCJ1c2VybmFtZVwiPnt0aGlzLnByb3BzLmZ1bGxfbmFtZX08L3NwYW4+XG5cdFx0XHRcdDwvaDM+XG5cdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnt0aGlzLnN0YXRlLmRhdGUudG9Mb2NhbGVUaW1lU3RyaW5nKFtdLCB7aG91cjogJzItZGlnaXQnLCBtaW51dGU6JzItZGlnaXQnfSl9IG9uIHt0aGlzLnN0YXRlLmRhdGUudG9EYXRlU3RyaW5nKCl9IDwvaDM+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdjbG9ja0luJz5cblx0XHRcdFx0XHQ8Zm9ybSBjbGFzc05hbWU9XCJmb3JtLWNoZWNraW5cIiByb2xlPVwiZm9ybVwiPlxuXHRcdFx0XHRcdFx0e2lucHV0RmllbGR9XG5cdFx0XHRcdFx0XHQ8YnIvPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3RleHQtY2VudGVyJz5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxpbnB1dCBcblx0XHRcdFx0XHRcdFx0XHRcdHR5cGU9XCJ0aW1lXCIgXG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9e3RoaXMuc3RhdGUuc3BlY2lmeVRpbWUgPyAnZm9ybS1jb250cm9sIHNtYWxsLXRpbWUnOidoaWRkZW4nfSBcblx0XHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxuXHRcdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8YnIvPlxuXHRcdFx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHRcIiBvbkNsaWNrPXt0aGlzLnRvZ2dsZVRpbWVJbnB1dH0+e3RoaXMuc3RhdGUuc3BlY2lmeVRpbWU/JyAtIFVzZSBDdXJyZW50IFRpbWUnOicgKyBTcGVjaWZ5IGEgVGltZSd9PC9hPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9mb3JtPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSIsIlxuLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXlzVGltZVNoZWV0cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHQvL0JpbmRpbmcgZGluZ1xuXHRcdHRoaXMuY2hhbmdlZFN0YXJ0PXRoaXMuY2hhbmdlZFN0YXJ0LmJpbmQodGhpcylcblx0XHR0aGlzLmNoYW5nZWRFbmQ9dGhpcy5jaGFuZ2VkRW5kLmJpbmQodGhpcyk7XG5cdFx0dGhpcy51cGRhdGVTdGFydD10aGlzLnVwZGF0ZVN0YXJ0LmJpbmQodGhpcyk7XG5cdFx0dGhpcy51cGRhdGVFbmQ9dGhpcy51cGRhdGVFbmQuYmluZCh0aGlzKTtcblx0XHR0aGlzLmRlbGV0ZT10aGlzLmRlbGV0ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMua2V5UHJlc3NlZFN0YXJ0PXRoaXMua2V5UHJlc3NlZFN0YXJ0LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5rZXlQcmVzc2VkRW5kPXRoaXMua2V5UHJlc3NlZEVuZC5iaW5kKHRoaXMpO1xuXHR9XG5cdGNoYW5nZWRTdGFydChlKXtcblx0XHR0aGlzLnByb3BzLnRpbWVDaGFuZ2VkICAoJ3N0YXJ0Jyx0aGlzLnByb3BzLmVtcGxveWVlLHRoaXMucHJvcHMudGltZXNoZWV0LGUudGFyZ2V0LnZhbHVlKTtcblx0fVxuXHRjaGFuZ2VkRW5kKGUpe1xuXHRcdHRoaXMucHJvcHMudGltZUNoYW5nZWQoJ2VuZCcsdGhpcy5wcm9wcy5lbXBsb3llZSx0aGlzLnByb3BzLnRpbWVzaGVldCxlLnRhcmdldC52YWx1ZSk7XG5cdH1cblx0dXBkYXRlU3RhcnQoZSl7XG5cdFx0aWYoZS50YXJnZXQudmFsdWUhPScnKXtcblx0XHRcdHRoaXMucHJvcHMudXBkYXRlVGltZSgnc3RhcnQnLHRoaXMucHJvcHMuZW1wbG95ZWUsdGhpcy5wcm9wcy50aW1lc2hlZXQsIGUudGFyZ2V0LnZhbHVlKTtcblx0XHR9XG5cdH1cblx0dXBkYXRlRW5kKGUpe1xuXHRcdGlmKGUudGFyZ2V0LnZhbHVlIT0nJyl7XG5cdFx0XHR0aGlzLnByb3BzLnVwZGF0ZVRpbWUoJ2VuZCcsdGhpcy5wcm9wcy5lbXBsb3llZSx0aGlzLnByb3BzLnRpbWVzaGVldCwgZS50YXJnZXQudmFsdWUpO1xuXHRcdH1cblx0fVxuXHRkZWxldGUoZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMucHJvcHMuZGVsZXRlRW1wbG95ZWUodGhpcy5wcm9wcy5lbXBsb3llZSx0aGlzLnByb3BzLnRpbWVzaGVldCk7XG5cdH1cblx0a2V5UHJlc3NlZFN0YXJ0KGUpIHtcblx0ICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xuXHQgICAgXHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdCAgICBcdGlmKHRoaXMucHJvcHMuc3RhcnQhPScnKXtcblx0XHRcdFx0dGhpcy5wcm9wcy51cGRhdGVUaW1lKCdzdGFydCcsdGhpcy5wcm9wcy5lbXBsb3llZSx0aGlzLnByb3BzLnRpbWVzaGVldCwgdGhpcy5wcm9wcy5zdGFydCk7XG5cdFx0XHR9XG5cdCAgICB9XG5cdCB9XG5cdGtleVByZXNzZWRFbmQoZSkge1xuXHQgICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSB7XG5cdCAgICBcdGUucHJldmVudERlZmF1bHQoKTtcblx0ICAgIFx0aWYodGhpcy5wcm9wcy5lbmQhPScnKXtcblx0XHRcdFx0dGhpcy5wcm9wcy51cGRhdGVUaW1lKCdzdGFydCcsdGhpcy5wcm9wcy5lbXBsb3llZSx0aGlzLnByb3BzLnRpbWVzaGVldCwgdGhpcy5wcm9wcy5lbmQpO1xuXHRcdFx0fVxuXHQgICAgfVxuXHQgfVxuXHRyZW5kZXIoKXtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8bGkgY2xhc3NOYW1lPVwibGlzdC1ncm91cC1pdGVtXCIgPlxuXHRcdFx0XHQ8Zm9ybSAgY2xhc3NOYW1lPVwiZm9ybS1pbmxpbmUgcm93IGRheV90aW1lX2Zvcm1fcm93XCI+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWwgY29sLW1kLTMgY29sLXNtLTMgY29sLXhzLTEyIHRleHQtY2VudGVyIGRheV90aW1lX2Zvcm1fcm93X2VsZW1lbnRcIj48c3Ryb25nPnsgdGhpcy5wcm9wcy5lbXBsb3llZV9uYW1lfTwvc3Ryb25nPjwvbGFiZWw+XG5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC0zIGNvbC1zbS0zIGNvbC14cy02IGRheV90aW1lX2Zvcm1fcm93X2VsZW1lbnRcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXBcIj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cC1hZGRvblwiPlN0YXJ0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxpbnB1dCBcblx0XHRcdFx0XHRcdFx0XHR0eXBlPVwidGltZVwiIFxuXHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCBzdGFydFwiIFxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlPXt0aGlzLnByb3BzLnN0YXJ0fVxuXHRcdFx0XHRcdFx0XHRcdG9uQmx1cj17dGhpcy51cGRhdGVTdGFydH1cblx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5jaGFuZ2VkU3RhcnR9XG5cdFx0XHRcdFx0XHRcdFx0b25LZXlQcmVzcz17dGhpcy5rZXlQcmVzc2VkU3RhcnR9XG5cblx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTMgY29sLXNtLTMgY29sLXhzLTYgZGF5X3RpbWVfZm9ybV9yb3dfZWxlbWVudFwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cFwiPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwLWFkZG9uXCI+RW5kPC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxpbnB1dCBcblx0XHRcdFx0XHRcdFx0XHR0eXBlPVwidGltZVwiIFxuXHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCBlbmRcIiBcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17dGhpcy5wcm9wcy5lbmR9XG5cdFx0XHRcdFx0XHRcdFx0b25CbHVyPXt0aGlzLnVwZGF0ZUVuZH1cblx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5jaGFuZ2VkRW5kfVxuXHRcdFx0XHRcdFx0XHRcdG9uS2V5UHJlc3M9e3RoaXMua2V5UHJlc3NlZEVuZH1cblx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtMyBjb2wtc20tMyBjb2wteHMtMTIgdGV4dC1jZW50ZXIgZGF5X3RpbWVfZm9ybV9yb3dfZWxlbWVudFwiPlxuXHRcdFx0XHRcdFx0PGJ1dHRvbiBcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiZGVsZXRlIGJ0biBidG4tZGFuZ2VyXCJcblx0XHRcdFx0XHRcdFx0b25DbGljaz17dGhpcy5kZWxldGV9XG5cdFx0XHRcdFx0XHQ+RGVsZXRlPC9idXR0b24+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZm9ybT5cblx0XHRcdDwvbGk+XG5cdFx0KTtcblx0fVxufSIsIi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaW1lU2hlZXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0LyogICAgIERvIHRoZSBiaW5kIHRoaW5nICAgICAgKi9cblx0XHR0aGlzLmF1dG9jb21wbGV0ZT10aGlzLmF1dG9jb21wbGV0ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuYWRkQ2hhbmdlZD10aGlzLmFkZENoYW5nZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLmFkZENsaWNrZWQ9dGhpcy5hZGRDbGlja2VkLmJpbmQodGhpcyk7XG5cdH1cblxuXHRhdXRvY29tcGxldGUoaW5wdXQpe1xuXHRcdHZhciBjb25maWcgPSB7XG5cdFx0XHRtaW5DaGFyczogMCxcblx0XHRcdG1heEl0ZW1zOiA5OSxcblx0XHRcdGF1dG9GaXJzdDogdHJ1ZSxcblx0XHRcdGl0ZW06IGZ1bmN0aW9uKGl0ZW0sIGlucHV0KSB7XG5cdFx0XHRcdHZhciBkID0gaXRlbTtcblx0XHRcdFx0dmFyIGh0bWwgPSBcIjxzcGFuPlwiICsgX18oaXRlbS5sYWJlbCkrIFwiPC9zcGFuPjxicj48c3Bhbj48c21hbGw+XCIraXRlbS52YWx1ZStcIjwvc21hbGw+PC9zcGFuPlwiO1xuXHRcdFx0XHRyZXR1cm4gJCgnPGxpPjwvbGk+Jylcblx0XHRcdFx0XHQuZGF0YSgnaXRlbS5hdXRvY29tcGxldGUnLCBpdGVtKVxuXHRcdFx0XHRcdC5odG1sKCc8YT48cD4nICsgaHRtbCArICc8L3A+PC9hPicpXG5cdFx0XHRcdFx0LmdldCgwKTtcblx0XHRcdH1cblx0XHR9O1xuXHRcdHZhciBhdyA9IG5ldyBBd2Vzb21wbGV0ZShpbnB1dCxjb25maWcpO1xuXHRcdGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXG5cdFx0XHQnYXdlc29tcGxldGUtc2VsZWN0Y29tcGxldGUnLFxuXHRcdFx0XHR0aGlzLmFkZENoYW5nZWRcblx0XHQpO1xuXHRcdGF3Lmxpc3Q9cHMuZW1wbG95ZWVfbGFibGVzXG5cdFx0JChkb2N1bWVudCkuYmluZCgnZW1wbG95ZWVMYWJsZXNMb2FkZWQnLGZ1bmN0aW9uKCl7XG5cdFx0XHRhdy5saXN0PXBzLmVtcGxveWVlX2xhYmxlcztcblx0XHR9KTtcblx0fVxuXHRhZGRDaGFuZ2VkKGUpe1xuXHRcdHRoaXMuYWRkPWUudGFyZ2V0LnZhbHVlO1xuXHR9O1xuXHRhZGRDbGlja2VkKGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR2YXIgd29fbmFtZT10aGlzLnByb3BzLm5hbWU7XG5cdFx0dmFyIGVtcGxveWVlX25hbWU9dGhpcy5hZGQ7XG5cdFx0Ly9DYWxsIGJhY2sgZm9yIGJpbmRpbmc/XG5cdFx0dmFyIHVwZGF0ZUNhbGxiYWNrPWZ1bmN0aW9uKGluZGV4KXtcblx0XHRcdHJldHVybiBmdW5jdGlvbihkYXRhKXtcdFx0XHRcblx0XHRcdFx0dGhpcy51cGRhdGVGcm9tU2VydmVyUGFyYW0oZGF0YSxpbmRleCk7XG5cdFx0XHR9LmJpbmQodGhpcyk7XG5cdFx0fS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMucHJvcHMuYWRkRW1wbG95ZWUod29fbmFtZSwgZW1wbG95ZWVfbmFtZSk7XG5cdH07XG5cdHJlbmRlcigpe1xuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFuZWwgcGFuZWwtZGVmYXVsdCByb3dcIj5cblxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWhlYWRpbmdcIj5cblx0XHRcdFx0XHQ8aDQgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj4gVGltZSBTaGVldCB7dGhpcy5wcm9wcy5kYXRlfSBmb3Ige3RoaXMucHJvcHMuY3Jld30gPC9oND5cblx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0PHVsIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXBcIiA+XG5cdFx0XHRcdFx0PGRpdiBpZD0nZm9ybXMnPlxuXHRcdFx0XHRcdFx0e3RoaXMucHJvcHMuZW1wbG95ZWVzfVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L3VsPlxuXHRcdFx0ICBcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYW5lbC1mb290ZXIgY29sLW1kLTEyIHRleHQtbGVmdCBsaXN0LWdyb3VwLWl0ZW1cIj5cblx0XHRcdFx0XHQ8Zm9ybSBjbGFzc05hbWU9XCJmb3JtLWlubGluZSByb3cgXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIGNvbC1tZC0zIGNvbC1zbS0yIGNvbC14cy0xMiB1cGRhdGVfZGl2X2VsZW1lbnRcIj5cblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1zdWNjZXNzXCI+VXBkYXRlPC9idXR0b24+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidGV4dC1yaWdodCBjb2wtbWQtNiBjb2wtc20tNiBjb2wteHMtNCBcIj5cblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiBcblx0XHRcdFx0XHRcdFx0XHR0eXBlPVwic3VibWl0XCIgXG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCJcblx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLmFkZENsaWNrZWR9XG5cdFx0XHRcdFx0XHRcdFx0PisgQWRkPC9idXR0b24+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCB0ZXh0LWxlZnQgY29sLW1kLTMgY29sLXNtLTQgY29sLXhzLTYgXCI+PGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cFwiPlxuXHRcdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIiBcblx0XHRcdFx0XHRcdFx0XHRyZWY9e3RoaXMuYXV0b2NvbXBsZXRlfVxuICAgICAgICAgIFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmFkZENoYW5nZWR9IFxuICAgICAgICAgIFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cIm5ld19lbXBsb3llZXMgZm9ybS1jb250cm9sIGF3ZXNvbXBsZXRlXCIgXG4gICAgICAgICAgXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9XCJlbXBsb3llZVwiIC8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj48L2Rpdj5cblx0XHRcdFx0XHQ8L2Zvcm0+XG5cdFx0XHRcdFx0XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG4iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmltcG9ydCBXb3Jrb3JkZXJUYXNrIGZyb20gJy4vd29ya29yZGVyVGFzayc7XG5cbmltcG9ydCBGb3JtIGZyb20gJy4uL3V0aWxzL2Zvcm1zJ1xuaW1wb3J0IE1vZGFsIGZyb20gJy4uL3V0aWxzL21vZGFsJ1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF5c1dvcmtvcmRlcnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dmFyIGFyZ3M9e307XG5cdFx0YXJncy5jcmV3PXRoaXMucHJvcHMuY3Jldztcblx0XHRhcmdzLmRhdGU9dGhpcy5wcm9wcy5kYXRlO1xuXHRcdC8qICAgRG8gdGhlIGJpbmQgdGhpbmcgICovXG5cdFx0dGhpcy5vblRhc2tDaGVja2VkPXRoaXMub25UYXNrQ2hlY2tlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMub25TdGF0dXNDaGFuZ2VkPXRoaXMub25TdGF0dXNDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy53b3JrT3JkZXJDaGFuZ2VkPXRoaXMud29ya09yZGVyQ2hhbmdlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuc29ja2V0VXBkYXRlPXRoaXMuc29ja2V0VXBkYXRlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzPXRoaXMuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcy5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY3JlYXRlV29ya29yZGVyPXRoaXMuY3JlYXRlV29ya29yZGVyLmJpbmQodGhpcyk7XG5cdFx0Ly90aGlzLndvcmtvcmRlck9iaj10aGlzLm9uU3RhdHVzQ2hhbmdlZC5iaW5kKHRoaXMpO1xuXHRcdC8qICAgICAgICAgIGVuZCAgICAgICAgICAqL1xuXG5cdFx0dGhpcy5zdGF0ZT17d29ya29yZGVyczpbXX07XG5cblx0XHR2YXIgYXJncz17fTtcblx0XHRhcmdzLmNyZXc9dGhpcy5wcm9wcy5jcmV3O1xuXHRcdGFyZ3MuZGF0ZT10aGlzLnByb3BzLmRhdGU7XG5cdFx0dGhpcy53b3Jrb3JkZXJUb29sID0gbmV3IHBzLmFwaVRvb2woYXJncyxwcy5hcGlTZXR1cC53b3JrT3JkZXJzLHRoaXMud29ya09yZGVyQ2hhbmdlZCk7XG5cdFx0aWYgKHRoaXMud29ya29yZGVyVG9vbC5pdGVtcz09PXVuZGVmaW5lZCB8fHRoaXMud29ya29yZGVyVG9vbC5pdGVtcz09PSAwIHx8dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zPT09bnVsbCApe1xuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5zdGF0ZS53b3Jrb3JkZXJzPXRoaXMud29ya29yZGVyVG9vbC5pdGVtcztcblx0XHR9XG5cblx0fVxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XG5cblx0XHRpZihuZXh0UHJvcHMuY3JldyE9dGhpcy5wcm9wcy5jcmV3IHx8IG5leHRQcm9wcy5kYXRlIT10aGlzLnByb3BzLmRhdGUgKXtcblxuXHRcdFx0dmFyIGFyZ3M9e307XG5cdFx0XHRhcmdzLmNyZXc9bmV4dFByb3BzLmNyZXc7XG5cdFx0XHRhcmdzLmRhdGU9bmV4dFByb3BzLmRhdGU7XG5cdFx0XHR0aGlzLndvcmtvcmRlclRvb2wgPSBuZXcgcHMuYXBpVG9vbChhcmdzLHBzLmFwaVNldHVwLndvcmtPcmRlcnMsdGhpcy53b3JrT3JkZXJDaGFuZ2VkKTtcblx0XHRcdGlmICh0aGlzLndvcmtvcmRlclRvb2wuaXRlbXM9PT11bmRlZmluZWQgfHx0aGlzLndvcmtvcmRlclRvb2wuaXRlbXM9PT0gMCB8fHRoaXMud29ya29yZGVyVG9vbC5pdGVtcz09PW51bGwgKXtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7d29ya29yZGVyczpbXX0pO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3dvcmtvcmRlcnM6dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zfSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0c29ja2V0VXBkYXRlKCl7XG5cblx0fVxuXHRvblRhc2tDaGVja2VkKHdvX2luZGV4LGluZGV4LGNoZWNrKXtcblx0XHR0aGlzLndvcmtvcmRlclRvb2wuaXRlbXNbd29faW5kZXhdLnN1YnRhc2tbaW5kZXhdLnN0YXR1cz1jaGVjaz8wOjE7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7d29ya29yZGVyczp0aGlzLndvcmtvcmRlclRvb2wuaXRlbXN9KTtcblx0XHR0aGlzLndvcmtvcmRlclRvb2wudXBkYXRlKHRoaXMud29ya29yZGVyVG9vbC5pdGVtc1t3b19pbmRleF0pO1xuXHRcdHZhciBjaGVja2VkVGV4dD1jaGVjaz9cInVuY2hlY2tlZC5cIjpcImNoZWNrZWQuXCJcblx0XHQvL3BzLnN1Y2Nlc3NBbGVydCh0aGlzLndvcmtvcmRlclRvb2wuaXRlbXNbd29faW5kZXhdLnN1YnRhc2tbaW5kZXhdLnRhc2sgK1wiIFwiKyBjaGVja2VkVGV4dCApO1xuXHR9XG5cdG9uU3RhdHVzQ2hhbmdlZChzdGF0dXMsIGluZGV4KXtcblx0XHR0aGlzLndvcmtvcmRlclRvb2wuaXRlbXNbaW5kZXhdLnN0YXR1cz1zdGF0dXM7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7d29ya29yZGVyczp0aGlzLndvcmtvcmRlclRvb2wuaXRlbXN9KTtcblx0XHR0aGlzLndvcmtvcmRlclRvb2wudXBkYXRlKHRoaXMud29ya29yZGVyVG9vbC5pdGVtc1tpbmRleF0pO1xuXHRcdGlmKHN0YXR1cz09XCJDb21wbGV0ZVwiKXtcblx0XHRcdHBzLnN1Y2Nlc3NBbGVydChcIldvcmtvcmRlciBjb21wbGV0ZWQhXCIpO1xuXHRcdH1cblx0fVxuXHR3b3JrT3JkZXJDaGFuZ2VkKCl7XG5cblx0XHRpZiAodGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zIT09bnVsbCl7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHt3b3Jrb3JkZXJzOnRoaXMud29ya29yZGVyVG9vbC5pdGVtc30pO1xuXHRcdFx0aWYodGhpcy5wcm9wcy5zdGF0dXNVcGRhdGUgIT09IHVuZGVmaW5lZCl7XG5cdFx0XHRcdHRoaXMucHJvcHMuc3RhdHVzVXBkYXRlKHRoaXMud29ya29yZGVyVG9vbC5pdGVtcyk7XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHt3b3Jrb3JkZXJzOltdfSk7XG5cdFx0fVxuXG5cdH1cblx0Y3JlYXRlV29ya29yZGVyKGl0ZW0pe1xuXHRcdGl0ZW0uZGF0ZT1tb21lbnQoaXRlbS5kYXRlLFwiTU0vREQvWVlZWVwiKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcblx0XHR0aGlzLndvcmtvcmRlclRvb2wuY3JlYXRlKGl0ZW0sZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRwcy5zdWNjZXNzQWxlcnQoXCJXb3Jrb3JkZXIgXCIgK2l0ZW0ubmFtZSsgXCIgY3JlYXRlZC5cIilcblx0XHR9KTtcblxuXHR9XG5cdHdvcmtvcmRlck9iaihpdGVtLGluZGV4KXtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8V29ya29yZGVyVGFzayBcblx0XHRcdFx0a2V5PXtpbmRleCArIHRoaXMucHJvcHMuY3Jld30gXG5cdFx0XHRcdGluZGV4PXtpbmRleH0gXG5cdFx0XHRcdGxvY2F0aW9uX3JvdXRlPXtpdGVtLmxvY2F0aW9uX3JvdXRlfVxuXHRcdFx0XHRsb2NhdGlvbj17aXRlbS5sb2NhdGlvbn1cblx0XHRcdFx0dGFza3M9e2l0ZW0uc3VidGFza31cblx0XHRcdFx0c3RhdHVzPXtpdGVtLnN0YXR1c31cblx0XHRcdFx0dHlwZT17aXRlbS50eXBlfVxuXHRcdFx0XHR3b3Jrb3JkZXI9e2l0ZW0ubmFtZX1cblx0XHRcdFx0b25UYXNrQ2hlY2tlZD17dGhpcy5vblRhc2tDaGVja2VkfVxuXHRcdFx0XHRvblN0YXR1c0NoYW5nZWQ9e3RoaXMub25TdGF0dXNDaGFuZ2VkfVxuXHRcdFx0XHRyb3V0ZT17aXRlbS5yb3V0ZX1cblx0XHRcdC8+XG5cdFx0KTtcblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gICAgICAgIFJlbmRlclxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdHJlbmRlcigpe1xuXHRcdGlmICh0aGlzLnN0YXRlLndvcmtvcmRlcnM9PT0wfHx0aGlzLnN0YXRlLndvcmtvcmRlcnM9PT11bmRlZmluZWQpe1xuXHRcdFx0cmV0dXJuICg8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+PGgzPk5vIFdvcmtvcmRlcnM8L2gzPjwvZGl2Pik7XG5cdFx0fVxuXHRcdHZhciB0b2RvPVtdO1xuXHRcdHZhciBjb21wbGV0ZT1bXTtcblx0XHR0aGlzLnN0YXRlLndvcmtvcmRlcnMubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblx0XHRcdGlmIChpdGVtLnN0YXR1cyE9J0NvbXBsZXRlJyYmaXRlbS5zdGF0dXMhPSdJbmNvbXBsZXRlJyl7XG5cdFx0XHRcdHRvZG8ucHVzaCh0aGlzLndvcmtvcmRlck9iaihpdGVtLGluZGV4KSk7XG5cdFx0XHRcdGlmKHRvZG8ubGVuZ3RoKzElND09PTApe1xuXG5cdFx0XHRcdFx0dG9kby5wdXNoKDxkaXYgY2xhc3NOYW1lPSdjbGVhcmZpeCBzcGFjZXInPjwvZGl2Pilcblx0XHRcdFx0fVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGNvbXBsZXRlLnB1c2godGhpcy53b3Jrb3JkZXJPYmooaXRlbSxpbmRleCkpO1xuXHRcdFx0XHRpZihjb21wbGV0ZS5sZW5ndGglMz09PTApe2NvbXBsZXRlLnB1c2goPGRpdiBjbGFzc05hbWU9J2NsZWFyZml4IHNwYWNlcic+PC9kaXY+KX1cblx0XHRcdH1cblx0XHR9LmJpbmQodGhpcykpO1xuXHRcdHZhciBjb21wbGV0ZUhlYWRlcj0oPGgzPkNvbXBsZXRlIFdvcmsgT3JkZXJzPC9oMz4pO1xuXHRcdGlmKGNvbXBsZXRlLmxlbmd0aD09MCl7XG5cdFx0XHRjb21wbGV0ZUhlYWRlcj1cIlwiO1xuXHRcdH1cblxuXHRcdC8vIHZhciBkYXRlPXRoaXMucHJvcHMuZGF0ZTtcblx0XHQvLyBkYXRlPW1vbWVudChkYXRlLCdZWVlZLU1NLUREJykuZm9ybWF0KFwiTU0vREQvWVlZWVwiKTtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIndvcmtvcmRlcl9jb250YWluZXJcIj5cblx0XHRcdFx0PGRpdj48YnIvPlxuXHRcdFx0XHRcdHt0b2RvfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPjwvZGl2PlxuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdHtjb21wbGV0ZUhlYWRlcn1cblx0XHRcdFx0XHR7Y29tcGxldGV9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNsZWFyZml4XCI+PC9kaXY+XG5cdFx0XHRcdDxici8+XG5cdFx0XHRcdDxXb3Jrb3JkZXJGb3JtTW9kYWxcblx0XHRcdFx0XHRpZD17XCJjcmVhdGUtd28tXCIrdGhpcy5wcm9wcy5jcmV3LnJlcGxhY2UoXCIgXCIsXCItXCIpfVxuXHRcdFx0XHRcdGNyZXc9e3RoaXMucHJvcHMuY3Jld31cblx0XHRcdFx0XHRkYXRlPXttb21lbnQodGhpcy5wcm9wcy5kYXRlLCdZWVlZLU1NLUREJykuZm9ybWF0KFwiTU0vREQvWVlZWVwiKX1cblx0XHRcdFx0XHRjcmVhdGVXb3Jrb3JkZXI9e3RoaXMuY3JlYXRlV29ya29yZGVyfVxuXHRcdFx0XHQvPlxuXG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXG5cdH07XHRcbn1cblxuZXhwb3J0IGNsYXNzIFdvcmtvcmRlckZvcm1Nb2RhbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblxuXHRcdHRoaXMuc3VibWl0PXRoaXMuc3VibWl0LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5zdGF0ZT17XG5cdFx0XHRsb2NhdGlvbjpcIlwiLFxuXHRcdFx0cHJpb3JpdHk6MSxcblx0XHRcdHR5cGU6XCJQcnVuaW5nXCIsXG5cdFx0XHRzdGF0dXM6XCJQZW5kaW5nXCIsXG5cdFx0XHRkYXRlOnRoaXMucHJvcHMuZGF0ZSxcblx0XHRcdGNyZXc6dGhpcy5wcm9wcy5jcmV3XG5cdFx0fVxuXHR9XG5cblx0c3VibWl0KGUpe1xuXHRcdGlmKHRoaXMuc3RhdGUubG9jYXRpb249PVwiXCIgfHx0aGlzLnN0YXRlLmNyZXc9PVwiXCIgfHwgKG1vbWVudCh0aGlzLnN0YXRlLmRhdGUsXCJNTS9ERC9ZWVlZXCIpLmlzVmFsaWQoKSkhPT10cnVlKXtcblx0XHRcdGNvbnNvbGUubG9nKFwibm90IHZhbGlkXCIpO1xuXHRcdH1lbHNle1xuXHRcdFx0dmFyIGNvcHk9cHMuY2xvbmUodGhpcy5zdGF0ZSk7XG5cdFx0XHQkKCcjJysgdGhpcy5wcm9wcy5pZCkubW9kYWwoJ2hpZGUnKVxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7bG9jYXRpb246XCJcIn0pXG5cdFx0XHR0aGlzLnByb3BzLmNyZWF0ZVdvcmtvcmRlcihjb3B5KTtcblx0XHR9XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dmFyIGZpZWxkcz1bXHRcdFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImF1dG9Db21wbGV0ZVwiLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7bG9jYXRpb246ZS50YXJnZXQudmFsdWV9KVxuXHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdHZhbHVlOnRoaXMuc3RhdGUubG9jYXRpb24sXG5cdFx0XHRcdHJlcXVpcmVkOnRydWUsXG5cdFx0XHRcdGxhYmxlOlwiVmluZXlhcmRcIixcblx0XHRcdFx0ZG9jdHlwZTpcIlZpbmV5YXJkXCIsXG5cdFx0XHRcdGRvY3ZhbHVlOlwibmFtZVwiXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImlucHV0XCIsXG5cdFx0XHRcdGNsYXNzTmFtZTpcInZpbmV5YXJkLWlucHV0XCIsXG5cdFx0XHRcdHR5cGU6XCJudW1iZXJcIixcblx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3ByaW9yaXR5OmUudGFyZ2V0LnZhbHVlfSlcblx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHR2YWx1ZTp0aGlzLnN0YXRlLnByaW9yaXR5LFxuXHRcdFx0XHRsYWJsZTpcIlByaW9yaXR5XCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiZGF0ZVwiLFxuXHRcdFx0XHRyZXF1aXJlZDp0cnVlLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7ZGF0ZTplLnRhcmdldC52YWx1ZX0pO1xuXHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdHZhbHVlOnRoaXMuc3RhdGUuZGF0ZSxcblx0XHRcdFx0bGFibGU6XCJEYXRlXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwic2VsZWN0XCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHt0eXBlOmUudGFyZ2V0LnZhbHVlfSlcblx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHR2YWx1ZTp0aGlzLnN0YXRlLnR5cGUsXG5cdFx0XHRcdGxhYmxlOlwiVHlwZVwiLFxuXHRcdFx0XHRvcHRpb25zOltcblx0XHRcdFx0XHRcIldhdGVyaW5nXCIsXG5cdFx0XHRcdFx0XCJQcnVuaW5nXCIsXG5cdFx0XHRcdFx0XCJSZXBhaXJcIixcblx0XHRcdFx0XHRcIlNwcmF5aW5nXCJcblx0XHRcdFx0XVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJzZWxlY3RcIixcblx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3N0YXR1czplLnRhcmdldC52YWx1ZX0pXG5cdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0dmFsdWU6dGhpcy5zdGF0ZS5zdGF0dXMsXG5cdFx0XHRcdGxhYmxlOlwiU3RhdHVzXCIsXG5cdFx0XHRcdGRpc2FibGVkOnRydWUsXG5cdFx0XHRcdG9wdGlvbnM6W1xuXHRcdFx0XHRcdFwiUGVuZGluZ1wiXG5cdFx0XHRcdF1cblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiYXV0b0NvbXBsZXRlXCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiB0aGlzLnNvbWVGdW5jdGlvbixcblx0XHRcdFx0bGFibGU6XCJDcmV3XCIsXG5cdFx0XHRcdHJlcXVpcmVkOnRydWUsXG5cdFx0XHRcdHJlYWRvbmx5OlwidHVyZVwiLFxuXHRcdFx0XHRkb2N0eXBlOlwiQ3Jld1wiLFxuXHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIixcblx0XHRcdFx0ZG9jbGFibGU6XCJjcmV3X2xlYWRfZnVsbF9uYW1lXCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtjcmV3OmUudGFyZ2V0LnZhbHVlfSlcblx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHR2YWx1ZTp0aGlzLnN0YXRlLmNyZXcsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImJ1dHRvblwiLFxuXHRcdFx0XHR0eXBlOlwic3VibWl0XCIsXG5cdFx0XHRcdHZhbHVlOlwiQ3JlYXRlIFdvcmsgT3JkZXJcIixcblx0XHRcdFx0Y2xhc3NOYW1lOlwiYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiLFxuXHRcdFx0XHRvbkNsaWNrOnRoaXMuc3VibWl0XG5cdFx0XHR9XG5cblxuXHRcdF1cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cdFx0XHRcdFxuXHRcdFx0XHQ8YSBcblx0XHRcdFx0XHRocmVmPVwiI1wiIFxuXHRcdFx0XHRcdGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiXG5cdFx0XHRcdFx0b25DbGljaz17ZnVuY3Rpb24oKXskKCcjJysgdGhpcy5wcm9wcy5pZCkubW9kYWwoKX0uYmluZCh0aGlzKX1cblx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzXCI+PC9zcGFuPiBOZXcgV29yayBPcmRlcjwvYT5cblx0XHRcdFx0PE1vZGFsIFxuXHRcdFx0XHRcdGlkPXt0aGlzLnByb3BzLmlkfSBcblx0XHRcdFx0XHRzdWJtaXRUZXh0PVwiU3VibWl0XCIgXG5cdFx0XHRcdFx0dGl0bGU9XCJDcmVhdGUgTmV3IFdvcmtvcmRlclwiXG5cdFx0XHRcdFx0c3VibWl0PXtmYWxzZX1cblx0XHRcdFx0XHQ+XG5cblx0XHRcdFx0XHQ8Rm9ybVxuXHRcdFx0XHRcdFx0aWQ9XCJDcmVhdGVXb3Jrb3JkZXJGb3JtXCJcblx0XHRcdFx0XHRcdHR5cGU9XCJob3Jpem9udGFsXCJcblx0XHRcdFx0XHRcdGZpZWxkcz17ZmllbGRzfVxuXG5cdFx0XHRcdFx0Lz5cblxuXHRcdFx0XHQ8L01vZGFsPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuIiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3JlYXRlSXNzdWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcylcblx0XHR0aGlzLm1vZGFsTmV3SXNzdWU9dGhpcy5tb2RhbE5ld0lzc3VlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5tb2RhbEVkaXRJc3N1ZT10aGlzLm1vZGFsRWRpdElzc3VlLmJpbmQodGhpcyk7XG5cdH1cblx0dG9vbFRpcCgpe1xuXHRcdCQoZnVuY3Rpb24gKCkge1xuXHRcdCBcdCQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKCk7XG5cdFx0fSlcblx0fVxuXHRtb2RhbE5ld0lzc3VlKGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR0aGlzLnByb3BzLmFjdGl2YXRlTW9kYWxOZXcoKTtcblx0fVxuXHRtb2RhbEVkaXRJc3N1ZShpdGVtLGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRjb25zb2xlLmxvZyhpdGVtKVxuXHRcdHRoaXMucHJvcHMuYWN0aXZhdGVNb2RhbEVkaXQoaXRlbSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0XHRcdFx0Ly8gXHRcdGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBcblx0XHRcdFx0XHQvLyBkYXRhLXRhcmdldD17XCIjXCIrdGhpcy5wb3BVcElkfVxuXHRcdFx0XHQgLy8gXHRhcmlhLWxhYmVsPVwiQ3JlYXRlIElzc3VlXCIgXG5cdFx0XHRcdCAvLyBcdGRhdGEtdG9nZ2xlPVwidG9vbHRpcFwiIFxuXHRcdFx0XHQgLy8gXHRkYXRhLXBsYWNlbWVudD1cInRvcFwiIFxuXHRcdFx0XHQgLy8gXHR0aXRsZT1cIklzc3VlXCIgXG5cdFx0XHRcdFx0Ly8gcmVmPXt0aGlzLnRvb2xUaXB9XHRcdFx0XHRcdC8vIG9uQ2xpY2s9eyB0aGlzLnBvcFVwfSA+XG5cdFx0dmFyIGRyb3Bkb3duSXRlbXM9W107XG5cdFx0aWYodGhpcy5wcm9wcy5pc3N1ZXMhPT1udWxsKXtcblx0XHRcdHRoaXMucHJvcHMuaXNzdWVzLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCl7XG5cdFx0XHRcdGlmIChpdGVtLnN0YXR1cyA9PSdTdWJtaXR0ZWQnIHx8IGl0ZW0uc3RhdHVzPT0nQXNzaWduZWQnKXtcblx0XHRcdFx0XHRkcm9wZG93bkl0ZW1zLnB1c2goXG5cdFx0XHRcdFx0XHQ8bGkga2V5PXtpbmRleH0+IFxuXHRcdFx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9XCJkcm9wZG93bi1pdGVtXCIgXG5cdFx0XHRcdFx0XHRcdFx0aHJlZj1cIiNcIiBcblx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLm1vZGFsRWRpdElzc3VlLmJpbmQodGhpcyxpdGVtKX0gXG5cdFx0XHRcdFx0XHRcdD57aXRlbS50aXRsZX08L2E+XG5cdFx0XHRcdFx0XHQ8L2xpPik7XG5cdFx0XHRcdH1cblx0XHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0fVxuXHRcdHZhciBpc3N1ZUNvdW50PVwiIFwiO1xuXHRcdGlmKHRoaXMucHJvcHMuaXNzdWVzIT09bnVsbCl7XG5cdFx0XHRpc3N1ZUNvdW50PSh0aGlzLnByb3BzLmlzc3Vlcy5sZW5ndGg9PT0wKT9cIlwiOnRoaXMucHJvcHMuaXNzdWVzLmxlbmd0aCtcIiBcIjtcblx0XHR9XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJkcm9wZG93biBkcm9wZG93bi1wYW5lbC1yaWdodFwiPlxuXG5cdFx0XHRcdDxidXR0b25cblx0XHRcdFx0XHRjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHQgYnRuLXhzIGRyb3Bkb3duLXRvZ2dsZSBmdWxsLWhlYWRlci1idXR0b24gY29ybmVyXCIgXG5cdFx0XHRcdFx0dHlwZT1cImJ1dHRvblwiIFxuXHRcdFx0XHRcdGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBcblx0XHRcdFx0XHRhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIFxuXHRcdFx0XHRcdGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiID5cblxuXHRcdFx0XHQgXHR7aXNzdWVDb3VudH08c3BhbiBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLWV4Y2xhbWF0aW9uLXNpZ25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XG5cdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHQ8dWwgY2xhc3NOYW1lPVwiZHJvcGRvd24tbWVudVwiPlxuXHRcdFx0XHQgICAgPGxpIGNsYXNzTmFtZT1cImRyb3Bkb3duLWhlYWRlclwiPklzc3VlczwvbGk+XG5cdFx0XHRcdCAgICB7ZHJvcGRvd25JdGVtc31cblx0XHRcdFx0ICAgIDxsaSByb2xlPVwic2VwYXJhdG9yXCIgY2xhc3NOYW1lPVwiZGl2aWRlclwiPjwvbGk+XG5cdFx0XHRcdCAgICA8bGk+PGEgXG5cdFx0XHRcdCAgICBcdGNsYXNzTmFtZT1cImRyb3Bkb3duLWl0ZW1cIlxuXHRcdFx0XHQgICAgXHRvbkNsaWNrPXt0aGlzLm1vZGFsTmV3SXNzdWV9XG5cdFx0XHRcdCAgICBcdGhyZWY9XCIjXCIgPiArIE5ldyBJc3N1ZTwvYT48L2xpPlxuXHRcdFx0XHQ8L3VsPlxuXG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cblxuIiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrQ2hlY2sgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0Y29uc29sZS5sb2codGhpcy5wcm9wcy5jaGVja2VkKTtcblx0XHR0aGlzLnRhc2tDaGVja2VkID0gdGhpcy50YXNrQ2hlY2tlZC5iaW5kKHRoaXMpO1xuXHR9XG5cdHRhc2tDaGVja2VkKGUpe1xuXHRcdHRoaXMucHJvcHMudGFza0NoZWNrZWQodGhpcy5wcm9wcy5pbmRleCwgdGhpcy5wcm9wcy5jaGVja2VkKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCBjaGVja2VkID0gdGhpcy5wcm9wcy5jaGVja2VkID8gXCJsaW5lLXRocm91Z2hcIiA6IFwiXCI7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja2JveCByb3dcIj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtOFwiPlxuXHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPXtjaGVja2VkfT5cblx0XHRcdFx0XHQ8aW5wdXQgXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJiaWctY2hlY2tib3hcIiBcblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnRhc2tDaGVja2VkfSBcblx0XHRcdFx0XHRcdHR5cGU9XCJjaGVja2JveFwiIFxuXHRcdFx0XHRcdFx0Y2hlY2tlZD17dGhpcy5wcm9wcy5jaGVja2VkfSAvPlxuXHRcdFx0XHRcdHt0aGlzLnByb3BzLmxhYmxlfVxuXHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJlZGl0IGNvbC14cy00XCI+IFxuXHRcdFx0XHRcdDxidXR0b24gXG5cdFx0XHRcdFx0XHR0eXBlPVwiYnV0dG9uXCIgXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHQgaW5saW5lLXRhc2tcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17dGhpcy5wcm9wcy5lZGl0VGFza31cblx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tZWRpdFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cblx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XHRcbn0iLCJcbi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuaW1wb3J0IFRhc2tDaGVjayBmcm9tICcuL3Rhc2tDaGVjaydcbmltcG9ydCBDcmVhdGVJc3N1ZSBmcm9tICcuL2NyZWF0ZUlzc3VlJ1xuaW1wb3J0IE1vZGFsIGZyb20gJy4uL3V0aWxzL21vZGFsJ1xuaW1wb3J0IHtGb3JtLCBTZWxlY3R9IGZyb20gJy4uL3V0aWxzL2Zvcm1zJ1xuaW1wb3J0IHtTcHJheUZvcm0sUHJ1bmluZ0Zvcm19IGZyb20gJy4uL3ZpbmV5YXJkL3NwcmF5Rm9ybSdcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXb3Jrb3JkZXJUYXNrIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuc3RhdGU9e1xuXHRcdFx0aXNzdWVzOltdLFxuXHRcdFx0dGl0bGU6JycsXG5cdFx0XHRtb2RhbDonbmV3Jyxcblx0XHRcdG1vZGFsUHJpb3JpdHk6J2xvdycsXG5cdFx0XHRtb2RhbFRpdGxlOicnLFxuXHRcdFx0bW9kYWxEZXNjcmlwdGlvbjonJyxcblx0XHRcdG1vZGFsTmFtZTonJ1xuXHRcdH07XG5cdFx0dGhpcy50YXNrQ2hlY2tlZD10aGlzLnRhc2tDaGVja2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5zdGF0dXNDaGFuZ2U9dGhpcy5zdGF0dXNDaGFuZ2UuYmluZCh0aGlzKTtcblx0XHR0aGlzLmFjdGl2YXRlTW9kYWxOZXc9dGhpcy5hY3RpdmF0ZU1vZGFsTmV3LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5hY3RpdmF0ZU1vZGFsRWRpdD10aGlzLmFjdGl2YXRlTW9kYWxFZGl0LmJpbmQodGhpcyk7XG5cdFx0XG5cdFx0dGhpcy5zdWJtaXRJc3N1ZT10aGlzLnN1Ym1pdElzc3VlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5tb2RhbFRpdGxlQ2hhbmdlPXRoaXMubW9kYWxUaXRsZUNoYW5nZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMubW9kYWxEZXNjcmlwdGlvbkNoYW5nZT10aGlzLm1vZGFsRGVzY3JpcHRpb25DaGFuZ2UuYmluZCh0aGlzKTtcblx0XHR0aGlzLm1vZGFsUHJpb3JpdHlDaGFuZ2U9dGhpcy5tb2RhbFByaW9yaXR5Q2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5pc3N1ZUNoYW5nZWQ9dGhpcy5pc3N1ZUNoYW5nZWQuYmluZCh0aGlzKTtcblxuXG5cdFx0dGhpcy5tb2RhbElkPVwiaXNzdWUtZm9ybS1cIit0aGlzLnByb3BzLndvcmtvcmRlcjtcblxuXHRcdFxuXHRcdHRoaXMuaXNzdWVUb29sID0gbmV3IHBzLmFwaVRvb2woe1wid29ya19vcmRlclwiOnRoaXMucHJvcHMud29ya29yZGVyfSx7ZG9jdHlwZTonSXNzdWUnfSx0aGlzLmlzc3VlQ2hhbmdlZCk7XG5cblxuXHR9XG5cdHRhc2tDaGVja2VkKGUpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe3RpdGxlOlwiQ0hFQ0tFRFwifSk7XG5cdH1cblx0aXNDaGVja2VkKHZhbHVlKXtcbiAgICBcdHJldHVybiAoKHZhbHVlPT09dGhpcy5zdGF0ZS5zZWxlY3RlZCkgPydjaGVja2VkIGxpbmUtdGhyb3VnaCc6J2RlZmF1bHQnKTtcbiAgXHR9XG4gIFx0dGFza0NoZWNrZWQoaW5kZXgsY2hlY2tlZCl7XG4gIFx0XHR2YXIgd29faW5kZXg9dGhpcy5wcm9wcy5pbmRleDtcbiAgXHRcdHRoaXMucHJvcHMub25UYXNrQ2hlY2tlZCh3b19pbmRleCxpbmRleCxjaGVja2VkKTtcbiAgXHR9XG4gIFx0c3RhdHVzQ2hhbmdlKGUpe1xuICBcdFx0dGhpcy5wcm9wcy5vblN0YXR1c0NoYW5nZWQoZS50YXJnZXQudmFsdWUsdGhpcy5wcm9wcy5pbmRleCk7XG5cbiAgXHR9XG4gIFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRcdFx0SVNTVUUgRlVOQ1RJT05TXG4gIFx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICBcdG1vZGFsVGl0bGVDaGFuZ2UoZSl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7bW9kYWxUaXRsZTplLnRhcmdldC52YWx1ZX0pO1xuICBcdH1cblx0bW9kYWxQcmlvcml0eUNoYW5nZShlKXtcblx0XHR0aGlzLnNldFN0YXRlKHttb2RhbFByaW9yaXR5OmUudGFyZ2V0LnZhbHVlfSk7XG5cdH1cblx0bW9kYWxEZXNjcmlwdGlvbkNoYW5nZShlKXtcblx0XHR0aGlzLnNldFN0YXRlKHttb2RhbERlc2NyaXB0aW9uOmUudGFyZ2V0LnZhbHVlfSk7XG5cdH1cbiAgXHRhY3RpdmF0ZU1vZGFsTmV3KCl7XG4gIFx0XHR0aGlzLnNldFN0YXRlKHttb2RhbDpcIm5ld1wifSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7bW9kYWxQcmlvcml0eTonJ30pO1xuXHRcdHRoaXMuc2V0U3RhdGUoe21vZGFsRGVzY3JpcHRpb246Jyd9KTtcblx0XHR0aGlzLnNldFN0YXRlKHttb2RhbFRpdGxlOicnfSk7XG4gIFx0XHQkKCcjJyt0aGlzLm1vZGFsSWQpLm1vZGFsKCk7XG4gIFx0fVxuICBcdGFjdGl2YXRlTW9kYWxFZGl0KGlzc3VlKXtcblx0XHR0aGlzLnNldFN0YXRlKHttb2RhbDppc3N1ZX0pO1xuXHRcdHRoaXMuc2V0U3RhdGUoe21vZGFsUHJpb3JpdHk6aXNzdWUucHJpb3JpdHl9KTtcblx0XHR0aGlzLnNldFN0YXRlKHttb2RhbERlc2NyaXB0aW9uOmlzc3VlLmlzc3VlfSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7bW9kYWxUaXRsZTppc3N1ZS50aXRsZX0pO1xuXHRcdHRoaXMuc2V0U3RhdGUoe21vZGFsTmFtZTppc3N1ZS5uYW1lfSk7XG4gIFx0XHQkKCcjJyt0aGlzLm1vZGFsSWQpLm1vZGFsKCk7XG4gIFx0fVxuICBcdGlzc3VlQ2hhbmdlZCgpe1xuXG5cdFx0dGhpcy5zZXRTdGF0ZSh7aXNzdWVzOnRoaXMuaXNzdWVUb29sLml0ZW1zfSk7XG5cdH1cbiAgXHRzdWJtaXRJc3N1ZShlKXtcbiAgXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdHZhciBuZXdJdGVtPXtcblx0XHRcdHRpdGxlOnRoaXMuc3RhdGUubW9kYWxUaXRsZSxcblx0XHRcdGlzc3VlOnRoaXMuc3RhdGUubW9kYWxEZXNjcmlwdGlvbixcblx0XHRcdHByaW9yaXR5OnRoaXMuc3RhdGUubW9kYWxQcmlvcml0eSxcblx0XHRcdHZpbmV5YXJkOnRoaXMucHJvcHMubG9jYXRpb24sXG5cdFx0XHR3b3JrX29yZGVyOnRoaXMucHJvcHMud29ya29yZGVyXG5cdFx0fVxuXHRcdGlmKHRoaXMuc3RhdGUubW9kYWw9PVwibmV3XCIpe1xuXHRcdFx0dGhpcy5pc3N1ZVRvb2wuY3JlYXRlKG5ld0l0ZW0sZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdHBzLnN1Y2Nlc3NBbGVydChcIklzc3VlIFwiICtpdGVtLnRpdGxlKyBcIiBjcmVhdGVkLlwiKVxuXHRcdFx0fSk7XG5cdFx0fWVsc2V7XG5cdFx0XHRuZXdJdGVtLm5hbWU9dGhpcy5zdGF0ZS5tb2RhbE5hbWU7XG5cdFx0XHR0aGlzLmlzc3VlVG9vbC51cGRhdGUobmV3SXRlbSxmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0cHMuc3VjY2Vzc0FsZXJ0KFwiSXNzdWUgXCIgK2l0ZW0udGl0bGUrXCIgdXBkYXRlZC5cIilcblx0XHRcdH0pO1xuXHRcdH1cblx0XHQvL2Nsb3NlIG1vZGFsXG5cdFx0JCgnIycrdGhpcy5tb2RhbElkKS5tb2RhbCgndG9nZ2xlJyk7XG5cdH1cblxuXG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHRpdGxlPVwid2VsY29tZVwiO1xuXHRcdHZhciBtYWluQ2xhc3M9e1xuXHRcdFx0J0NvbXBsZXRlJzoncGFuZWwtc3VjY2VzcycsXG5cdFx0XHQnSW5jb21wbGV0ZSc6J3BhbmVsLWRhbmdlcicsXG5cdFx0XHQnUGVuZGluZyc6J3BhbmVsLWRlZmF1bHQnLFxuXHRcdFx0J1N0YXJ0ZWQnOidwYW5lbC13YXJuaW5nJ1xuXHRcdH1bdGhpcy5wcm9wcy5zdGF0dXNdO1xuXHRcdG1haW5DbGFzcyA9IG1haW5DbGFzcyArIFwiIHBhbmVsIHdvcmtvcmRlciBwcy1wYW5lbFwiO1xuXHRcdHZhciByb3V0ZT0odGhpcy5wcm9wcy5yb3V0ZT09PXVuZGVmaW5lZCk/XCJOb3QgQ3JlYXRlZFwiOig8YSBjbGFzc05hbWU9XCJcIiBocmVmPXt0aGlzLnByb3BzLnJvdXRlfT5Nb3JlIEluZm9ybWF0aW9uPC9hPik7XG5cdFx0dmFyIHRhc2tzPVwiXCI7XG5cdFx0aWYodGhpcy5wcm9wcy50YXNrcyE9PXVuZGVmaW5lZCl7XG5cdFx0XHR0YXNrcz1bXTtcblx0XHRcdHRoaXMucHJvcHMudGFza3MubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblx0XHRcdFx0dmFyIGNoZWNrZWQ9aXRlbS5zdGF0dXM/dHJ1ZTpmYWxzZTtcblx0XHRcdFx0dGFza3MucHVzaCg8VGFza0NoZWNrIGtleT17aW5kZXh9IGluZGV4PXtpbmRleH0gbGFibGU9e2l0ZW0udGFza30gY2hlY2tlZD17Y2hlY2tlZH0gdGFza0NoZWNrZWQ9e3RoaXMudGFza0NoZWNrZWR9Lz4pO1xuXHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nY29sLW1kLTQgY29sLXNtLTQnPlxuXHRcdFx0XHQ8TW9kYWwgXG5cdFx0XHRcdFx0aWQ9e3RoaXMubW9kYWxJZH0gXG5cdFx0XHRcdFx0c3VibWl0VGV4dD1cIlN1Ym1pdFwiIFxuXHRcdFx0XHRcdHRpdGxlPVwiQ3JlYXRlIElzc3VlIEZvclwiXG5cdFx0XHRcdFx0c3VibWl0PXt0aGlzLnN1Ym1pdElzc3VlfT5cblxuXHRcdFx0XHRcdFx0PGZpZWxkc2V0PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHRcdFx0XHRcdFx0XHQ8bGFiZWw+SXNzdWUgVGl0bGU8L2xhYmVsPlxuXHRcdFx0XHRcdFx0XHRcdDxpbnB1dCBcblx0XHRcdFx0XHRcdFx0XHRcdHR5cGU9XCJ0ZXh0XCIgXG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBcblx0XHRcdFx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwiSXNzdWUgVGl0bGVcIiBcblx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlPXt0aGlzLnN0YXRlLm1vZGFsVGl0bGV9IFxuXHRcdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMubW9kYWxUaXRsZUNoYW5nZX1cblx0XHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRcdFx0PGxhYmVsPlByaW9yaXR5PC9sYWJlbD5cblx0XHRcdFx0XHRcdFx0XHQ8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHZhbHVlPXt0aGlzLnN0YXRlLm1vZGFsUHJpb3JpdHl9IG9uQ2hhbmdlPXt0aGlzLm1vZGFsUHJpb3JpdHlDaGFuZ2UuYmluZCh0aGlzKX0+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8b3B0aW9uPkxvdzwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0XHRcdFx0PG9wdGlvbj5NZWRpdW08L29wdGlvbj5cblx0XHRcdFx0XHRcdFx0XHRcdDxvcHRpb24+SGlnaDwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0XHRcdFx0PG9wdGlvbj5Dcml0aWNhbDwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0XHRcdDwvc2VsZWN0PlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRcdCAgXHQ8bGFiZWw+SXNzdWUgRGV0YWlsczo8L2xhYmVsPlxuXHRcdFx0XHRcdFx0XHQgIFx0PHRleHRhcmVhIFxuXHRcdFx0XHRcdFx0XHQgIFx0XHRjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBcblx0XHRcdFx0XHRcdFx0ICBcdFx0cm93cz1cIjNcIiBcblx0XHRcdFx0XHRcdFx0ICBcdFx0cGxhY2Vob2xkZXI9XCJJc3N1ZSBEZXRhaWxzXCIgXG5cdFx0XHRcdFx0XHRcdCAgXHRcdHZhbHVlPXt0aGlzLnN0YXRlLm1vZGFsRGVzY3JpcHRpb259XG5cdFx0XHRcdFx0XHRcdCAgXHRcdG9uQ2hhbmdlPXt0aGlzLm1vZGFsRGVzY3JpcHRpb25DaGFuZ2V9XG5cdFx0XHRcdFx0XHRcdCAgXHQ+PC90ZXh0YXJlYT5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8L2ZpZWxkc2V0PlxuXHRcdFx0XHQ8L01vZGFsPlxuXHRcdFx0PGRpdiBpZD1cIlwiIGNsYXNzTmFtZT17bWFpbkNsYXNzfT5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYW5lbC1oZWFkaW5nXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cblx0XHRcdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJwYW5lbC10aXRsZSBjb2wteHMtOFwiPlxuXHRcdFx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9XCJmbG9hdC1sZWZ0XCIgaHJlZj17dGhpcy5wcm9wcy5sb2NhdGlvbl9yb3V0ZX0+e3RoaXMucHJvcHMubG9jYXRpb259PC9hPlxuXHRcdFx0XHRcdFx0PC9oMz5cblxuXG5cblx0XHRcdFx0XHRcdFx0PENyZWF0ZUlzc3VlXG5cdFx0XHRcdFx0XHRcdFx0aXNzdWVzPXt0aGlzLnN0YXRlLmlzc3Vlc31cblx0XHRcdFx0XHRcdFx0XHRhY3RpdmF0ZU1vZGFsTmV3PXt0aGlzLmFjdGl2YXRlTW9kYWxOZXd9XG5cdFx0XHRcdFx0XHRcdFx0YWN0aXZhdGVNb2RhbEVkaXQ9e3RoaXMuYWN0aXZhdGVNb2RhbEVkaXR9XG5cdFx0XHRcdFx0XHRcdFx0d29ya29yZGVyPXt0aGlzLnByb3BzLndvcmtvcmRlcn1cblxuXHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNsZWFyZml4XCI+PC9kaXY+XG5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFxuXG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWJvZHlcIj5cblx0XHRcdFx0XHQ8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCBzdGF0dXNcIiB2YWx1ZT17dGhpcy5wcm9wcy5zdGF0dXN9IG9uQ2hhbmdlPXt0aGlzLnN0YXR1c0NoYW5nZX0+XG5cdFx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPVwiUGVuZGluZ1wiPlBlbmRpbmc8L29wdGlvbj5cblx0XHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9XCJTdGFydGVkXCI+U3RhcnRlZDwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIkNvbXBsZXRlXCI+Q29tcGxldGU8L29wdGlvbj5cblx0XHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9XCJJbmNvbXBsZXRlXCI+SW5jb21wbGV0ZTwvb3B0aW9uPlxuXHRcdFx0XHRcdDwvc2VsZWN0PlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja19ib3hlc1wiPlxuXG5cdFx0XHRcdFx0XHR7dGFza3N9XG5cdFx0XHRcdFx0XHQ8VmluZXlhcmRUYXNrcyB3b3Jrb3JkZXI9e3RoaXMucHJvcHMud29ya29yZGVyfSAvPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHR7cm91dGV9XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cblxuZXhwb3J0IGNsYXNzIFZpbmV5YXJkVGFza3MgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cblx0XHR0aGlzLm1vZGFsTmV3VGFzaz10aGlzLm1vZGFsTmV3VGFzay5iaW5kKHRoaXMpO1xuXHRcdHRoaXMudGFza0NoZWNrZWQ9dGhpcy50YXNrQ2hlY2tlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMudGFza0NoYW5nZWQ9dGhpcy50YXNrQ2hhbmdlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZWRpdFRhc2s9dGhpcy5lZGl0VGFzay5iaW5kKHRoaXMpO1xuXHRcdHRoaXMubW9kYWxJZD1cInRhc2stZm9ybVwiK3RoaXMucHJvcHMud29ya29yZGVyO1xuXG5cdFx0dGhpcy50YXNrc1Rvb2wgPSBuZXcgcHMuYXBpVG9vbCh7XCJ3b3JrX29yZGVyXCI6dGhpcy5wcm9wcy53b3Jrb3JkZXJ9LHBzLmFwaVNldHVwLnZpbmV5YXJkVGFza3MsdGhpcy50YXNrQ2hhbmdlZCk7XG5cdFx0dGhpcy5zdGF0ZT17XG5cdFx0XHR0YXNrczp0aGlzLnRhc2tzVG9vbC5pdGVtcyxcblx0XHRcdGZvcm1TdGF0ZTogXCJ0YXNrVHlwZVwiXG5cdFx0fTtcblx0fVxuXHRtb2RhbE5ld1Rhc2soKXtcblx0XHR0aGlzLnNldFN0YXRlKHtmb3JtU3RhdGU6IFwidGFza1R5cGVcIn0pO1xuXHRcdCQoJyMnK3RoaXMubW9kYWxJZCkubW9kYWwoKTtcblx0fVxuXHRpc0NoZWNrZWQodmFsdWUpe1xuICAgIFx0Ly9yZXR1cm4gKCh2YWx1ZT09PXRoaXMuc3RhdGUuc2VsZWN0ZWQpID8nY2hlY2tlZCBsaW5lLXRocm91Z2gnOidkZWZhdWx0Jyk7XG4gIFx0fVxuICBcdHRhc2tDaGFuZ2VkKCl7XG4gIFx0XHR0aGlzLnNldFN0YXRlKHt0YXNrczp0aGlzLnRhc2tzVG9vbC5pdGVtc30pO1xuICBcdH1cbiAgXHR0YXNrQ2hlY2tlZChpbmRleCxjaGVja2VkKXtcbiAgXHRcdC8vdmFyIHdvX2luZGV4PXRoaXMucHJvcHMuaW5kZXg7XG4gIFx0XHQvL3RoaXMucHJvcHMub25UYXNrQ2hlY2tlZCh3b19pbmRleCxpbmRleCxjaGVja2VkKTtcbiAgXHR9XG4gIFx0ZWRpdFRhc2soKXtcblxuICBcdH1cblxuICBcdHJlbmRlclRhc2tzKCl7XG4gIFx0XHR2YXIgdGFza3M9W107XG4gIFx0XHRpZih0aGlzLnN0YXRlLnRhc2tzIT09dW5kZWZpbmVkJiZ0aGlzLnN0YXRlLnRhc2tzIT09bnVsbCl7XG5cdFx0XHR0YXNrcz1bXTtcblx0XHRcdGNvbnNvbGUubG9nKHRoaXMuc3RhdGUudGFza3MpO1xuXHRcdFx0dGhpcy5zdGF0ZS50YXNrcy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXHRcdFx0XHR2YXIgY2hlY2tlZD1pdGVtLnN0YXR1cz90cnVlOmZhbHNlO1xuXHRcdFx0XHR0YXNrcy5wdXNoKFxuXHRcdFx0XHRcdDxUYXNrQ2hlY2sgXG5cdFx0XHRcdFx0XHRrZXk9e2luZGV4fSBcblx0XHRcdFx0XHRcdGluZGV4PXtpbmRleH0gXG5cdFx0XHRcdFx0XHRsYWJsZT17aXRlbS5kb2N0eXBlfSBcblx0XHRcdFx0XHRcdGNoZWNrZWQ9e2l0ZW0uY29tcGxldGV9IFxuXHRcdFx0XHRcdFx0dGFza0NoZWNrZWQ9e3RoaXMudGFza0NoZWNrZWR9XG5cdFx0XHRcdFx0XHRlZGl0VGFzaz17ZnVuY3Rpb24oZSl7IGVkaXRUYXNrKGl0ZW0ubmFtZSl9fVxuXHRcdFx0XHRcdC8+KTtcblx0XHRcdH0uYmluZCh0aGlzKSlcblx0XHR9XG5cdFx0cmV0dXJuIHRhc2tzO1xuICBcdH1cblx0cmVuZGVyKCl7XG5cdFx0dmFyIGZpZWxkc1NwcmF5PVtcdFx0XG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiYnV0dG9uXCIsXG5cdFx0XHRcdHR5cGU6XCJzdWJtaXRcIixcblx0XHRcdFx0dmFsdWU6XCJDcmVhdGUgU3ByYXlpbmcgRW50cnlcIixcblx0XHRcdFx0Y2xhc3NOYW1lOlwiYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiLFxuXHRcdFx0XHRvbkNsaWNrOnRoaXMuc3VibWl0XG5cdFx0XHR9XG5cdFx0XVxuXHRcdHZhciB0YXNrcz10aGlzLnJlbmRlclRhc2tzKCk7XG5cblxuXHRcdHZhciBmb3JtPXt9O1xuXHRcdHZhciBmb3Jtc09iaj17XG5cdFx0XHR0YXNrVHlwZTpmdW5jdGlvbigpe1xuXHRcdFx0XHRyZXR1cm4oXHRcblx0XHRcdFx0PFNlbGVjdFxuXHRcdFx0XHRcdGNsYXNzTmFtZT1cIlwiXG5cdFx0XHRcdFx0bGFibGU9XCJUYXNrIFR5cGVcIlxuXHRcdFx0XHRcdG9wdGlvbnM9e1tcIiBcIl0uY29uY2F0KHBzLmFwaVNldHVwLnZpbmV5YXJkVGFza3MuZG9jdHlwZSl9XG5cdFx0XHRcdFx0aW5wdXRDaGFuZ2VkPXtcblx0XHRcdFx0XHRcdGZ1bmN0aW9uKGUpe3RoaXMuc2V0U3RhdGUoe2Zvcm1TdGF0ZTplLnRhcmdldC52YWx1ZX0pfS5iaW5kKHRoaXMpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQvPlxuXHRcdFx0KX0uYmluZCh0aGlzKSxcblx0XHRcdFNwcmF5aW5nOmZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0XHRpZihpdGVtPT11bmRlZmluZWQpe1xuXHRcdFx0XHRcdHJldHVybiAoXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQ8U3ByYXlGb3JtXG5cdFx0XHRcdFx0XHRcdGlkPXt0aGlzLnByb3BzLndvcmtvcmRlcn1cblx0XHRcdFx0XHRcdFx0Y3JlYXRlU3ByYXlFbnRyeT17ZnVuY3Rpb24oKXt9fVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFBydW5pbmc6ZnVuY3Rpb24oaXRlbSl7XG5cblx0XHRcdFx0aWYoaXRlbT09PXVuZGVmaW5lZCl7XG5cdFx0XHRcdFx0cmV0dXJuIChcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdDxQcnVuaW5nRm9ybVxuXHRcdFx0XHRcdFx0XHRpZD1cImNyZWF0ZVNwcmF5RW50cnlcIlxuXHRcdFx0XHRcdFx0XHRjcmVhdGVTcHJheUVudHJ5PXtmdW5jdGlvbigpe319XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fS5iaW5kKHRoaXMpXG5cdFx0fTtcblxuXHRcdGZvcm09Zm9ybXNPYmpbdGhpcy5zdGF0ZS5mb3JtU3RhdGVdKCk7XG5cdFx0Ly8gY29uc29sZS5sb2coZm9ybXNPYmpbdGhpcy5zdGF0ZS5mb3JtU3RhdGVdKTtcblx0XHQvLyBjb25zb2xlLmxvZyhmb3JtKTtcblx0XHR2YXIgbGFibGU9XCJDcmVhdGUgTmV3IFRhc2tcIjtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nJz5cblx0XHRcdHt0YXNrc31cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hlY2tib3ggcm93IGFkZGJ1dHRvblwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImVkaXRcIj4gXG5cdFx0XHRcdFx0PGJ1dHRvbiBcblx0XHRcdFx0XHRcdHR5cGU9XCJidXR0b25cIiBcblx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdCBpbmxpbmUtdGFza1wiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLm1vZGFsTmV3VGFza31cblx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLXBsdXMgXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPiBBZGQgVGFza1xuXHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8TW9kYWwgXG5cdFx0XHRcdFx0aWQ9e3RoaXMubW9kYWxJZH0gXG5cdFx0XHRcdFx0c3VibWl0VGV4dD1cIlN1Ym1pdFwiIFxuXHRcdFx0XHRcdHRpdGxlPXtsYWJsZX1cblx0XHRcdFx0XHRzdWJtaXQ9e2ZhbHNlfVxuXHRcdFx0XHRcdD5cblx0XHRcdFx0XHR7Zm9ybX1cblx0XHRcdFx0PC9Nb2RhbD5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuXG5cblxuXG4iLCIvKiBmb3JtcyAqL1xuLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5zdWJtaXQ9dGhpcy5zdWJtaXQuYmluZCh0aGlzKTtcblx0fVxuXHRzdWJtaXQoZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMucHJvcHMuc3VibWl0KGUpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHZhciBmb3JtPVtdO1xuXHRcdHZhciBmb3JtVHlwZXM9e1xuXHRcdFx0c2VsZWN0XHQ6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHR2YXIgdmFsdWUgPSAoaXRlbS52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0udmFsdWU7XG5cdFx0XHRcdHZhciBsYWJsZSA9IChpdGVtLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5sYWJsZTtcblx0XHRcdFx0dmFyIG9wdGlvbnMgPSAoaXRlbS5vcHRpb25zID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5vcHRpb25zO1xuXHRcdFx0XHR2YXIgY2xhc3NOYW1lID0gKGl0ZW0uY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5jbGFzc05hbWU7XG5cdFx0XHRcdHZhciByZWFkb25seSA9IChpdGVtLnJlYWRvbmx5ID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5yZWFkb25seTtcblx0XHRcdFx0dmFyIGRpc2FibGVkID0gKGl0ZW0uZGlzYWJsZWQgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmRpc2FibGVkO1xuXHRcdFx0XHR2YXIgcmVxdWlyZWQgPSAoaXRlbS5yZXF1aXJlZCA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucmVxdWlyZWQ7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PFNlbGVjdFxuXHRcdFx0XHRcdFx0a2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fVxuXHRcdFx0XHRcdFx0dmFsdWU9e3ZhbHVlfVxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXtjbGFzc05hbWV9XG5cdFx0XHRcdFx0XHRsYWJsZT17bGFibGV9XG5cdFx0XHRcdFx0XHRvcHRpb25zPXtvcHRpb25zfVxuXHRcdFx0XHRcdFx0cmVhZG9ubHk9e3JlYWRvbmx5fVxuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ9e2Rpc2FibGVkfVxuXHRcdFx0XHRcdFx0cmVxdWlyZWQ9e3JlcXVpcmVkfVxuXHRcdFx0XHRcdFx0aW5wdXRDaGFuZ2VkPXtmdW5jdGlvbihlKXtpdGVtLm9uQ2hhbmdlKGUpO319XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGlucHV0IFx0OiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0dmFyIHR5cGUgPSAoaXRlbS50eXBlID09PSB1bmRlZmluZWQpID8gXCJ0ZXh0XCI6IGl0ZW0udHlwZTtcblx0XHRcdFx0dmFyIHZhbHVlID0gKGl0ZW0udmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnZhbHVlO1xuXHRcdFx0XHR2YXIgcGxhY2Vob2xkZXIgPSAoaXRlbS5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucGxhY2Vob2xkZXI7XG5cdFx0XHRcdHZhciBsYWJsZSA9IChpdGVtLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5sYWJsZTtcblx0XHRcdFx0dmFyIGNsYXNzTmFtZSA9IChpdGVtLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uY2xhc3NOYW1lO1xuXHRcdFx0XHR2YXIgcmVhZG9ubHkgPSAoaXRlbS5yZWFkb25seSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucmVhZG9ubHk7XG5cdFx0XHRcdHZhciBkaXNhYmxlZCA9IChpdGVtLmRpc2FibGVkID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5kaXNhYmxlZDtcblx0XHRcdFx0dmFyIHJlcXVpcmVkID0gKGl0ZW0ucmVxdWlyZWQgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnJlcXVpcmVkO1xuXHRcdFx0XHRcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8SW5wdXRcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH0gXG5cdFx0XHRcdFx0XHR0eXBlPXt0eXBlfVxuXHRcdFx0XHRcdFx0dmFsdWU9e3ZhbHVlfVxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuXHRcdFx0XHRcdFx0bGFibGU9e2xhYmxlfVxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXtjbGFzc05hbWV9XG5cdFx0XHRcdFx0XHRyZWFkb25seT17cmVhZG9ubHl9XG5cdFx0XHRcdFx0XHRkaXNhYmxlZD17ZGlzYWJsZWR9XG5cdFx0XHRcdFx0XHRyZXF1aXJlZD17cmVxdWlyZWR9XG5cdFx0XHRcdFx0XHRpbnB1dENoYW5nZWQ9e2Z1bmN0aW9uKGUpe2l0ZW0ub25DaGFuZ2UoZSl9fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRsYWJsZSBcdDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHJldHVybiAoICBcbiAgICBcdFx0XHRcdDxsYWJlbCBrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9ID57aXRlbS5sYWJsZX08L2xhYmVsPlxuXG4gICAgXHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdHJhZGlvXHQ6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHRyZXR1cm4gKDxkaXY+PC9kaXY+KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdHRleHRhcmVhOiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0cmV0dXJuICg8ZGl2PjwvZGl2Pik7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRoZWFkZXI6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHRyZXR1cm4oPGgzIGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH0gPntpdGVtLmxhYmxlfTwvaDM+KVxuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0ZGF0ZTogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IChpdGVtLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS52YWx1ZTtcblx0XHRcdFx0dmFyIGxhYmxlID0gKGl0ZW0ubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmxhYmxlO1xuXHRcdFx0XHR2YXIgcGxhY2Vob2xkZXIgPSAoaXRlbS5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucGxhY2Vob2xkZXI7XG5cdFx0XHRcdHZhciBjbGFzc05hbWUgPSAoaXRlbS5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmNsYXNzTmFtZTtcblx0XHRcdFx0dmFyIHJlYWRvbmx5ID0gKGl0ZW0ucmVhZG9ubHkgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnJlYWRvbmx5O1xuXHRcdFx0XHR2YXIgZGlzYWJsZWQgPSAoaXRlbS5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uZGlzYWJsZWQ7XG5cdFx0XHRcdHZhciByZXF1aXJlZCA9IChpdGVtLnJlcXVpcmVkID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5yZXF1aXJlZDtcblx0XHRcdFx0cmV0dXJuKFxuXHRcdFx0XHRcdDxEYXRlSW5wdXRcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH0gXG5cdFx0XHRcdFx0XHR2YWx1ZT17dmFsdWV9XG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG5cdFx0XHRcdFx0XHRsYWJsZT17bGFibGV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e2NsYXNzTmFtZX1cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKX19XG5cdFx0XHRcdFx0XHRyZWFkb25seT17cmVhZG9ubHl9XG5cdFx0XHRcdFx0XHRkaXNhYmxlZD17ZGlzYWJsZWR9XG5cdFx0XHRcdFx0XHRyZXF1aXJlZD17cmVxdWlyZWR9XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGF1dG9Db21wbGV0ZTogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IChpdGVtLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS52YWx1ZTtcblx0XHRcdFx0dmFyIGxhYmxlID0gKGl0ZW0ubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmxhYmxlO1xuXHRcdFx0XHR2YXIgcGxhY2Vob2xkZXIgPSAoaXRlbS5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucGxhY2Vob2xkZXI7XG5cdFx0XHRcdHZhciBjbGFzc05hbWUgPSAoaXRlbS5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmNsYXNzTmFtZTtcblx0XHRcdFx0dmFyIHJlYWRvbmx5ID0gKGl0ZW0ucmVhZG9ubHkgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLnJlYWRvbmx5O1xuXHRcdFx0XHR2YXIgZGlzYWJsZWQgPSAoaXRlbS5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uZGlzYWJsZWQ7XG5cdFx0XHRcdHZhciByZXF1aXJlZCA9IChpdGVtLnJlcXVpcmVkID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5yZXF1aXJlZDtcblxuXHRcdFx0XHRyZXR1cm4oXG5cdFx0XHRcdFx0PEF3ZXNvbXBsZXRlSW5wdXRcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH1cblx0XHRcdFx0XHRcdGRvY3R5cGU9e2l0ZW0uZG9jdHlwZX1cblx0XHRcdFx0XHRcdGRvY3ZhbHVlPXtpdGVtLmRvY3ZhbHVlfVxuXHRcdFx0XHRcdFx0ZG9jbGFibGU9e2l0ZW0uZG9jbGFibGV9XG5cdFx0XHRcdFx0XHR2YWx1ZT17dmFsdWV9XG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG5cdFx0XHRcdFx0XHRsYWJsZT17bGFibGV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e2NsYXNzTmFtZX1cblx0XHRcdFx0XHRcdHJlYWRvbmx5PXtyZWFkb25seX1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXtkaXNhYmxlZH1cblx0XHRcdFx0XHRcdHJlcXVpcmVkPXtyZXF1aXJlZH1cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKX19XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGJ1dHRvbjogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IChpdGVtLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS52YWx1ZTtcblx0XHRcdFx0dmFyIGNsYXNzTmFtZSA9IChpdGVtLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uY2xhc3NOYW1lO1xuXHRcdFx0XHR2YXIgZGlzYWJsZWQgPSAoaXRlbS5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0uZGlzYWJsZWQ7XG5cdFx0XHRcdHJldHVybihcblx0XHRcdFx0XHQ8QnV0dG9uXG5cdFx0XHRcdFx0XHRrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9XG5cdFx0XHRcdFx0XHR2YWx1ZT17dmFsdWV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e2NsYXNzTmFtZX1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXtkaXNhYmxlZH1cblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2Z1bmN0aW9uKGUpe2l0ZW0ub25DbGljayhlKX19XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKVxuXHRcdH1cblx0XHR0aGlzLnByb3BzLmZpZWxkcy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXG5cdFx0XHRmb3JtLnB1c2goZm9ybVR5cGVzW2l0ZW0uZmllbGRdKGl0ZW0saW5kZXgpKTtcblx0XHR9LmJpbmQodGhpcykpO1xuXHRcdC8vZm9yKHZhciB4PTA7IHggPCB0aGlzLnByb3BzLmZlaWxkcy5sZW5ndGggeCsrOyApXG5cdFx0dmFyIGNsYXNzTmFtZSA9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwicmVhY3QtZm9ybVwiOiBcImZvcm0taG9yaXpvbnRhbCByZWFjdC1mb3JtIFwiK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHJldHVybihcblx0XHRcdDxmb3JtIGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cblx0XHRcdFx0PGZpZWxkc2V0PlxuXHRcdFx0XHR7dGhpcy5wcm9wcy5iZWZvcmV9XG5cdFx0XHRcdHtmb3JtfVxuXHRcdFx0XHR7IHRoaXMucHJvcHMuY2hpbGRyZW59XG5cdFx0XHRcdDwvZmllbGRzZXQ+XG5cdFx0XHQ8L2Zvcm0+XG5cdFx0KTtcblx0fVxufVxuXG5cblxuZXhwb3J0IGNsYXNzIFNlbGVjdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLmlucHV0Q2hhbmdlPXRoaXMuaW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcblxuXHR9XG5cdGlucHV0Q2hhbmdlKGUpe1xuXHRcdHRoaXMucHJvcHMuaW5wdXRDaGFuZ2VkKCk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLmxhYmxlID0gKHRoaXMucHJvcHMubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLmxhYmxlO1xuXHRcdHRoaXMub3B0aW9ucyA9ICh0aGlzLnByb3BzLm9wdGlvbnMgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLm9wdGlvbnM7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jb250cm9sXCI6IFwiZm9ybS1jb250cm9sXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHRoaXMuZGlzYWJsZWQgPSAodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLmRpc2FibGVkPT1mYWxzZXx8dGhpcy5wcm9wcy5kaXNhYmxlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlcXVpcmVkID0gKHRoaXMucHJvcHMucmVxdWlyZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZXF1aXJlZD09ZmFsc2V8fHRoaXMucHJvcHMucmVxdWlyZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZWFkb25seSA9ICh0aGlzLnByb3BzLnJlYWRvbmx5ID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVhZG9ubHk9PWZhbHNlfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHZhciBvcHRpb25zPVtdO1xuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblxuXG5cdFx0dGhpcy5vcHRpb25zLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCl7XG5cdFx0XHR2YXIgZ3JvdXA9W107XG5cdFx0XHRpZihpdGVtLmdyb3VwICE9PSB1bmRlZmluZWQpe1xuXHRcdFx0XHRpdGVtLm9wdGlvbnMubWFwKGZ1bmN0aW9uKGlubmVySXRlbSxpbmRleCl7XG5cdFx0XHRcdFx0Z3JvdXAucHVzaCggPG9wdGlvbiBrZXk9e2l0ZW0uZ3JvdXAraW5kZXh9PiB7aW5uZXJJdGVtfSA8L29wdGlvbj4pXG5cdFx0XHRcdH0pXG5cdFx0XHRcdG9wdGlvbnMucHVzaCg8b3B0Z3JvdXAga2V5PXtpdGVtLmdyb3VwfSBsYWJlbD17aXRlbS5ncm91cH0+IHtncm91cH08L29wdGdyb3VwPik7XG5cblx0XHRcdH1cblx0XHRcdGVsc2V7XG5cdFx0XHRcdG9wdGlvbnMucHVzaCggPG9wdGlvbiBrZXk9e2luZGV4fT4ge2l0ZW19IDwvb3B0aW9uPilcblx0XHRcdH1cblxuXHRcdFx0XG5cdFx0fS5iaW5kKHRoaXMpKTtcblxuXHRcdHZhciBzZWxlY3Q9KFxuXHRcdFx0PHNlbGVjdCBcblx0XHRcdFx0Y2xhc3NOYW1lPXt0aGlzLmNsYXNzTmFtZX0gXG5cdFx0XHRcdHZhbHVlPXt0aGlzLnZhbHVlfSBcblx0XHRcdFx0b25DaGFuZ2U9e3RoaXMucHJvcHMuaW5wdXRDaGFuZ2VkfVxuXHRcdFx0XHRkaXNhYmxlZD17dGhpcy5kaXNhYmxlZH1cblx0ICAgICAgICAgIFx0cmVhZE9ubHk9e3RoaXMucmVhZG9ubHl9XG5cdCAgICAgICAgICBcdHJlcXVpcmVkPXt0aGlzLnJlcXVpcmVkfVxuXHRcdFx0XHQ+XG5cdFx0XHRcdHtvcHRpb25zfVxuXHRcdFx0PC9zZWxlY3Q+XG5cdFx0KTtcblxuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy5sYWJsZSA9PVwiXCIpe1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgXCI+XG5cdFx0ICAgIFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbFwiPnt0aGlzLnByb3BzLmxhYmxlfTwvbGFiZWw+XG5cdFx0ICAgIFx0XHQ8ZGl2PlxuXHRcdCAgICBcdFx0e3NlbGVjdH1cblx0XHQgICAgXHRcdDwvZGl2PlxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHQgICAgICBcdFx0e3NlbGVjdH1cblx0XHQgIFx0XHQ8L2Rpdj5cblx0XHQgIFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIElucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuaW5wdXRDaGFuZ2U9dGhpcy5pbnB1dENoYW5nZS5iaW5kKHRoaXMpO1xuXG5cdH1cblx0aW5wdXRDaGFuZ2UoZSl7XG5cdFx0dGhpcy5wcm9wcy5pbnB1dENoYW5nZWQoZSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy50eXBlID0gKHRoaXMucHJvcHMudHlwZSA9PT0gdW5kZWZpbmVkKSA/IFwidGV4dFwiOiB0aGlzLnByb3BzLnR5cGU7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLnBsYWNlaG9sZGVyID0gKHRoaXMucHJvcHMucGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnBsYWNlaG9sZGVyO1xuXHRcdHRoaXMubGFibGUgPSAodGhpcy5wcm9wcy5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMubGFibGU7XG5cdFx0dmFyIG91dHB1dD1cIlwiO1xuXHRcdHRoaXMuY2xhc3NOYW1lPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcImZvcm0tY29udHJvbFwiOiBcImZvcm0tY29udHJvbCBcIiArdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0dGhpcy5kaXNhYmxlZCA9ICh0aGlzLnByb3BzLmRpc2FibGVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PWZhbHNlfHx0aGlzLnByb3BzLmRpc2FibGVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVxdWlyZWQgPSAodGhpcy5wcm9wcy5yZXF1aXJlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1mYWxzZXx8dGhpcy5wcm9wcy5yZXF1aXJlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlYWRvbmx5ID0gKHRoaXMucHJvcHMucmVhZG9ubHkgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZWFkb25seT09ZmFsc2V8fHRoaXMucHJvcHMucmVhZG9ubHk9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dmFyIGlucHV0PSggXG5cdFx0XHQ8aW5wdXQgXG5cdFx0XHRcdHR5cGU9e3RoaXMudHlwZX0gXG5cdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9IFxuXHRcdFx0XHRwbGFjZWhvbGRlcj17dGhpcy5wbGFjZWhvbGRlcn0gXG5cdFx0XHRcdHZhbHVlPXt0aGlzLnZhbHVlfVxuXHRcdFx0XHRvbkNoYW5nZT17dGhpcy5wcm9wcy5pbnB1dENoYW5nZWR9XG5cdFx0XHRcdGRpc2FibGVkPXt0aGlzLmRpc2FibGVkfVxuXHQgICAgICAgICAgXHRyZWFkT25seT17dGhpcy5yZWFkb25seX1cblx0ICAgICAgICAgIFx0cmVxdWlyZWQ9e3RoaXMucmVxdWlyZWR9XG5cdFx0XHQvPlxuXHRcdCk7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkIHx8IHRoaXMucHJvcHMubGFibGUgPT1cIlwiKXtcblx0XHRcdG91dHB1dCA9IChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIFwiPlxuXHRcdCAgICBcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWxcIj57dGhpcy5wcm9wcy5sYWJsZX08L2xhYmVsPlxuXHRcdCAgICBcdFx0PGRpdiBjbGFzc05hbWU9XCJcIj5cblx0XHQgICAgICBcdFx0XHR7aW5wdXR9XG5cdFx0ICAgIFx0XHQ8L2Rpdj5cblx0XHQgIFx0XHQ8L2Rpdj5cblx0XHQgIFx0KTtcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdG91dHB1dCA9IChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG5cdFx0ICAgICAgXHRcdHtpbnB1dH1cblx0XHQgIFx0XHQ8L2Rpdj5cblx0XHQgIFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbmV4cG9ydCBjbGFzcyBEYXRlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5kYXRlSW5pdD10aGlzLmRhdGVJbml0LmJpbmQodGhpcyk7XG5cdH1cblx0ZGF0ZUluaXQoKXtcblx0XHQkKCcuaW5wdXQtZ3JvdXAuZGF0ZSAuZGF0ZXBpY2snKS5kYXRlcGlja2VyKHtcblx0XHQgICAgdG9kYXlCdG46IFwibGlua2VkXCIsXG5cdFx0ICAgIG9yaWVudGF0aW9uOiBcImJvdHRvbSByaWdodFwiLFxuXHRcdCAgICBhdXRvY2xvc2U6IHRydWUsXG5cdFx0ICAgIHRvZGF5SGlnaGxpZ2h0OiB0cnVlXG5cdFx0fSkub24oJ2NoYW5nZURhdGUnLCBmdW5jdGlvbihlKSB7XG5cdFx0XHR2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2lucHV0JywgeyBidWJibGVzOiB0cnVlIH0pO1xuXHRcdFx0ZS50YXJnZXQuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cdFx0fSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLnBsYWNlaG9sZGVyID0gKHRoaXMucHJvcHMucGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnBsYWNlaG9sZGVyO1xuXHRcdHRoaXMubGFibGUgPSAodGhpcy5wcm9wcy5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMubGFibGU7XG5cdFx0dGhpcy5kaXNhYmxlZCA9ICh0aGlzLnByb3BzLmRpc2FibGVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PWZhbHNlfHx0aGlzLnByb3BzLmRpc2FibGVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVxdWlyZWQgPSAodGhpcy5wcm9wcy5yZXF1aXJlZCA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1mYWxzZXx8dGhpcy5wcm9wcy5yZXF1aXJlZD09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblx0XHR0aGlzLnJlYWRvbmx5ID0gKHRoaXMucHJvcHMucmVhZG9ubHkgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5yZWFkb25seT09ZmFsc2V8fHRoaXMucHJvcHMucmVhZG9ubHk9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cblxuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblx0XHR0aGlzLmNsYXNzTmFtZT0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJmb3JtLWNvbnRyb2wgZGF0ZXBpY2tcIjogXCJmb3JtLWNvbnRyb2wgZGF0ZXBpY2sgXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHZhciBpbnB1dD0oIFxuXHRcdFx0PGlucHV0XG5cdFx0XHRcdHJlZj17dGhpcy5kYXRlSW5pdH0gXG5cdFx0XHRcdHR5cGU9XCJ0ZXh0XCJcblx0XHRcdFx0Y2xhc3NOYW1lPXt0aGlzLmNsYXNzTmFtZX1cblx0XHRcdFx0cGxhY2Vob2xkZXI9e3RoaXMucGxhY2Vob2xkZXJ9ICBcblx0XHRcdFx0dmFsdWU9e3RoaXMudmFsdWV9IFxuXHRcdFx0XHRvbkNoYW5nZT17dGhpcy5wcm9wcy5pbnB1dENoYW5nZWR9XG5cdFx0XHRcdGRpc2FibGVkPXt0aGlzLmRpc2FibGVkfVxuXHQgICAgICAgICAgXHRyZWFkT25seT17dGhpcy5yZWFkb25seX1cblx0ICAgICAgICAgIFx0cmVxdWlyZWQ9e3RoaXMucmVxdWlyZWR9XG5cdFx0XHRcdC8+XG5cblx0XHQpO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMubGFibGUgIT09IHVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLmxhYmxlID09XCJcIil7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0ICBcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG5cdFx0ICBcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbFwiPnt0aGlzLnByb3BzLmxhYmxlfTwvbGFiZWw+XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwIGRhdGVcIj5cblx0XHRcdFx0XHRcdHtpbnB1dH1cblx0XHRcdFx0ICBcdFx0PHNwYW4gY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAtYWRkb25cIj5cblx0XHRcdFx0ICBcdFx0XHQ8aSBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLXRoXCI+PC9pPlxuXHRcdFx0XHQgIFx0XHQ8L3NwYW4+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cCBkYXRlXCI+XG5cblx0XHRcdFx0XHRcdHtpbnB1dH1cblx0XHRcdFx0ICBcdFx0PHNwYW4gY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAtYWRkb25cIj5cblx0XHRcdFx0ICBcdFx0XHQ8aSBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLXRoXCI+PC9pPlxuXHRcdFx0XHQgIFx0XHQ8L3NwYW4+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHQgIFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbmV4cG9ydCBjbGFzcyBBd2Vzb21wbGV0ZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXG5cdFx0LyogICBEbyB0aGUgYmluZCB0aGluZyAgKi9cblx0XHR0aGlzLmNyZWF0ZUxpc3Q9dGhpcy5jcmVhdGVMaXN0LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5kb2NDaGFuZ2VkPXRoaXMuZG9jQ2hhbmdlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY29tcG9uZW50RGlkTW91bnQ9dGhpcy5jb21wb25lbnREaWRNb3VudC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuaW5wdXRDaGFuZ2U9dGhpcy5pbnB1dENoYW5nZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuYXV0b2NvbXBsZXRlPXRoaXMuYXV0b2NvbXBsZXRlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jb21wb25lbnRXaWxsVW5tb3VudD10aGlzLmNvbXBvbmVudFdpbGxVbm1vdW50LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5yZWZDYWxsPXRoaXMucmVmQ2FsbC5iaW5kKHRoaXMpO1xuXHRcdFxuXHRcdC8vdGhpcy53b3Jrb3JkZXJPYmo9dGhpcy5vblN0YXR1c0NoYW5nZWQuYmluZCh0aGlzKTtcblx0XHQvKiAgICAgICAgICBlbmQgICAgICAgICAgKi9cblx0XHR0aGlzLml0ZW1saXN0PVtdO1xuXHRcdHRoaXMuc3RhdGU9e2l0ZW1saXN0OltdfTtcblx0XHR0aGlzLl9pc01vdW50ZWQ9ZmFsc2U7XG5cdFx0dmFyIGFyZ3M9e307XG5cdFx0dmFyIG9wdGlvbnM9e2RvY3R5cGU6dGhpcy5wcm9wcy5kb2N0eXBlfTtcblx0XHR0aGlzLmxpc3RUb29sID0gbmV3IHBzLmFwaVRvb2woe30sIG9wdGlvbnMgLHRoaXMuZG9jQ2hhbmdlZCk7XG5cdFx0aWYgKHRoaXMubGlzdFRvb2wuaXRlbXM9PT11bmRlZmluZWQgfHx0aGlzLmxpc3RUb29sLml0ZW1zPT09IDAgfHx0aGlzLmxpc3RUb29sLml0ZW1zPT09bnVsbCApe1xuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5zdGF0ZS5saXN0PXRoaXMubGlzdFRvb2wuaXRlbXM7XG5cdFx0fVxuXG5cdFx0dGhpcy5jcmVhdGVMaXN0KCk7XG5cdH1cblx0ZG9jQ2hhbmdlZCgpe1xuXHRcdHRoaXMuY3JlYXRlTGlzdCgpO1xuXHR9XG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0dGhpcy5faXNNb3VudGVkPXRydWU7XG5cdFx0dGhpcy5hdXRvY29tcGxldGUoKTtcblxuXHR9XG5cdGNyZWF0ZUxpc3QoKXtcblx0XHR0aGlzLml0ZW1saXN0PVtdO1xuXHRcdC8vbGFibGUgYW5kIHZhbHVlXG5cdFx0aWYgKHRoaXMucHJvcHMuZG9jbGFibGUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmxpc3RUb29sLml0ZW1zICE9PSB1bmRlZmluZWQgJiYgdGhpcy5saXN0VG9vbC5pdGVtcyAhPT0gbnVsbCl7XG5cdFx0XHRmb3IobGV0IGl0ZW0gb2YgdGhpcy5saXN0VG9vbC5pdGVtcyl7XG5cdFx0XHRcdHZhciB0ZW1wID1baXRlbVt0aGlzLnByb3BzLmRvY2xhYmxlXSxpdGVtW3RoaXMucHJvcHMuZG9jdmFsdWVdXTtcblx0XHRcdFx0dGhpcy5pdGVtbGlzdC5wdXNoKHRlbXApO1xuXHRcdFx0fVxuXHRcdFx0JChkb2N1bWVudCkudHJpZ2dlcignbGlzdExvYWQnICsgdGhpcy5wcm9wcy5kb2N0eXBlKTtcblx0XHR9XG5cdFx0Ly9qdXN0IGxhYmxlXG5cdFx0ZWxzZSBpZih0aGlzLmxpc3RUb29sLml0ZW1zICE9PSB1bmRlZmluZWQgJiYgdGhpcy5saXN0VG9vbC5pdGVtcyAhPT0gbnVsbCl7XG5cdFx0XHRmb3IobGV0IGl0ZW0gb2YgdGhpcy5saXN0VG9vbC5pdGVtcyl7XG5cdFx0XHRcdHRoaXMuaXRlbWxpc3QucHVzaChpdGVtW3RoaXMucHJvcHMuZG9jdmFsdWVdKTtcblx0XHRcdH1cblx0XHRcdCQoZG9jdW1lbnQpLnRyaWdnZXIoJ2xpc3RMb2FkJyArIHRoaXMucHJvcHMuZG9jdHlwZS5yZXBsYWNlKFwiIFwiLFwiXCIpKTtcblx0XHR9XG5cdH1cblx0Y29tcG9uZW50V2lsbFVubW91bnQoKXtcblx0XHQvLyBjb25zb2xlLmxvZyhcIkhFTExPXCIpO1xuXHRcdC8vIHRoaXMuYXcuZGVzdHJveSgpO1xuXHRcdC8vIGRlbGV0ZSB0aGlzLmF3O1xuXHRcdC8vIGNvbnNvbGUubG9nKFwiVEVTVFwiKTtcblx0fVxuXHRyZWZDYWxsKGlucHV0KXtcblx0XHR0aGlzLmlucHV0PWlucHV0O1xuXHR9XG5cdGF1dG9jb21wbGV0ZShpbnB1dCl7XG5cdFx0aW5wdXQ9dGhpcy5pbnB1dDtcblx0XHR2YXIgY29uZmlnPSB7XG5cdFx0XHRcdG1pbkNoYXJzOiAwLFxuXHRcdFx0XHRtYXhJdGVtczogOTksXG5cdFx0XHRcdGF1dG9GaXJzdDogdHJ1ZSxcblx0XHRcdFx0ZmlsdGVyOiBBd2Vzb21wbGV0ZS5GSUxURVJfU1RBUlRTV0lUSFxuXHRcdFx0fVxuXHRcdGlmKHRoaXMucHJvcHMuZG9jbGFibGUgIT09IHVuZGVmaW5lZCApe1xuXHRcdFx0Y29uZmlnLml0ZW09IGZ1bmN0aW9uKGl0ZW0sIGlucHV0KSB7XG5cdFx0XHRcdHZhciBkID0gaXRlbTtcblx0XHRcdFx0dmFyIGh0bWwgPSBcIjxzcGFuPlwiICsgX18oaXRlbS5sYWJlbCkrIFwiPC9zcGFuPjxicj48c3Bhbj48c21hbGw+XCIraXRlbS52YWx1ZStcIjwvc21hbGw+PC9zcGFuPlwiO1xuXHRcdFx0XHRyZXR1cm4gJCgnPGxpPjwvbGk+Jylcblx0XHRcdFx0XHQuZGF0YSgnaXRlbS5hdXRvY29tcGxldGUnLCBpdGVtKVxuXHRcdFx0XHRcdC5odG1sKCc8YT48cD4nICsgaHRtbCArICc8L3A+PC9hPicpXG5cdFx0XHRcdFx0LmdldCgwKTtcblx0XHRcdH1cblxuXHRcdH1lbHNle1xuXHRcdFx0Y29uZmlnLml0ZW09ZnVuY3Rpb24oaXRlbSwgaW5wdXQpIHtcblx0XHRcdFx0dmFyIGQgPSBpdGVtO1xuXHRcdFx0XHR2YXIgaHRtbCA9IFwiPHNwYW4+XCIgKyBfXyhpdGVtKSsgXCI8L3NwYW4+XCI7XG5cdFx0XHRcdHJldHVybiAkKCc8bGk+PC9saT4nKVxuXHRcdFx0XHRcdC5kYXRhKCdpdGVtLmF1dG9jb21wbGV0ZScsIGl0ZW0pXG5cdFx0XHRcdFx0Lmh0bWwoJzxhPjxwPicgKyBodG1sICsgJzwvcD48L2E+Jylcblx0XHRcdFx0XHQuZ2V0KDApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLmF3ID0gbmV3IEF3ZXNvbXBsZXRlKGlucHV0LGNvbmZpZyk7XG5cdFx0aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRcdCdhd2Vzb21wbGV0ZS1zZWxlY3Rjb21wbGV0ZScsXG5cdFx0XHRcdHRoaXMuaW5wdXRDaGFuZ2Vcblx0XHQpO1xuXG5cdFx0dGhpcy5hdy5saXN0PXRoaXMuaXRlbUxpc3Q7XG5cdFx0JChkb2N1bWVudCkuYmluZCgnbGlzdExvYWQnICsgdGhpcy5wcm9wcy5kb2N0eXBlLnJlcGxhY2UoXCIgXCIsXCJcIiksZnVuY3Rpb24oKXtcblx0XHRcdHRoaXMuYXcubGlzdD10aGlzLml0ZW1saXN0O1xuXHRcdH0uYmluZCh0aGlzKSk7XG5cdH1cblx0aW5wdXRDaGFuZ2UoZSl7XG5cdFx0dGhpcy5wcm9wcy5pbnB1dENoYW5nZWQoZSk7XG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnR5cGUgPSAodGhpcy5wcm9wcy50eXBlID09PSB1bmRlZmluZWQpID8gXCJ0ZXh0XCI6IHRoaXMucHJvcHMudHlwZTtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMucGxhY2Vob2xkZXIgPSAodGhpcy5wcm9wcy5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXI7XG5cdFx0dGhpcy5sYWJsZSA9ICh0aGlzLnByb3BzLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5sYWJsZTtcblx0XHR0aGlzLmRpc2FibGVkID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5kaXNhYmxlZD09ZmFsc2V8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dGhpcy5yZXF1aXJlZCA9ICh0aGlzLnByb3BzLnJlcXVpcmVkID09PSB1bmRlZmluZWR8fHRoaXMucHJvcHMucmVxdWlyZWQ9PWZhbHNlfHx0aGlzLnByb3BzLnJlcXVpcmVkPT1cIlwiKSA/IGZhbHNlOiB0cnVlO1xuXHRcdHRoaXMucmVhZG9ubHkgPSAodGhpcy5wcm9wcy5yZWFkb25seSA9PT0gdW5kZWZpbmVkfHx0aGlzLnByb3BzLnJlYWRvbmx5PT1mYWxzZXx8dGhpcy5wcm9wcy5yZWFkb25seT09XCJcIikgPyBmYWxzZTogdHJ1ZTtcblxuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblx0XHR0aGlzLmNsYXNzTmFtZT0gKHRoaXMucHJvcHMuY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJmb3JtLWNvbnRyb2wgYXdlc29tcGxldGVcIjogXCJmb3JtLWNvbnRyb2wgYXdlc29tcGxldGUgXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHZhciBpbnB1dD0oIDxpbnB1dFxuXHRcdFx0XHRcdHZhbHVlPXt0aGlzLnZhbHVlfVxuXG5cdFx0XHRcdFx0dHlwZT17dGhpcy50eXBlfSBcblx0XHRcdFx0XHRjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfSBcblx0XHRcdFx0XHRwbGFjZWhvbGRlcj17dGhpcy5wbGFjZWhvbGRlcn0gXG5cdFx0XHRcdFx0cmVmPXt0aGlzLnJlZkNhbGx9XG5cdFx0ICAgICAgICAgIFx0b25DaGFuZ2U9e3RoaXMuaW5wdXRDaGFuZ2V9XG5cdFx0ICAgICAgICAgIFx0ZGlzYWJsZWQ9e3RoaXMuZGlzYWJsZWR9XG5cdFx0ICAgICAgICAgIFx0cmVhZE9ubHk9e3RoaXMucmVhZG9ubHl9XG5cdFx0ICAgICAgICAgIFx0cmVxdWlyZWQ9e3RoaXMucmVxdWlyZWR9XG5cdFx0ICAgICAgICAgIC8+KTtcblxuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy5sYWJsZSA9PVwiXCIpe1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgXCI+XG5cdFx0ICAgIFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbFwiPnt0aGlzLnByb3BzLmxhYmxlfTwvbGFiZWw+XG5cdFx0ICAgIFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIlwiPlxuXHRcdCAgICAgIFx0XHRcdHtpbnB1dH1cblx0XHQgICAgXHRcdDwvZGl2PlxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHQgICAgICBcdFx0e2lucHV0fVxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuZXhwb3J0IGNsYXNzIEJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy50eXBlID0gKHRoaXMucHJvcHMudHlwZSA9PT0gdW5kZWZpbmVkKSA/IFwidGV4dFwiOiB0aGlzLnByb3BzLnR5cGU7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLmRpc2FibGVkID0gKHRoaXMucHJvcHMuZGlzYWJsZWQgPT09IHVuZGVmaW5lZHx8dGhpcy5wcm9wcy5kaXNhYmxlZD09ZmFsc2V8fHRoaXMucHJvcHMuZGlzYWJsZWQ9PVwiXCIpID8gZmFsc2U6IHRydWU7XG5cdFx0dmFyIG91dHB1dD1cIlwiO1xuXHRcdHRoaXMuY2xhc3NOYW1lPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcImJ0blwiOiBcImJ0biBcIiArdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0dmFyIGlucHV0PSggXG5cdFx0XHQ8YnV0dG9uIFxuXHRcdFx0XHR0eXBlPXt0aGlzLnR5cGV9XG5cdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9IFxuXHRcdFx0XHR2YWx1ZT17dGhpcy52YWx1ZX1cblx0XHRcdFx0b25DbGljaz17dGhpcy5wcm9wcy5vbkNsaWNrfVxuXHRcdFx0XHRkaXNhYmxlZD17dGhpcy5kaXNhYmxlZH1cblx0XHRcdD57dGhpcy52YWx1ZX08L2J1dHRvbj5cblx0XHQpO1xuXG5cblx0XHRvdXRwdXQgPSAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0ICAgICAgXHRcdHtpbnB1dH1cblx0ICBcdFx0PC9kaXY+XG5cdCAgXHQpO1xuXG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuIiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kYWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5zdWJtaXQ9dGhpcy5zdWJtaXQuYmluZCh0aGlzKTtcblx0fVxuXHRzdWJtaXQoZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMucHJvcHMuc3VibWl0KGUpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHZhciBmb290ZXI9XCJcIjtcblx0XHRpZih0aGlzLnByb3BzLnN1Ym1pdCE9PSBmYWxzZSl7XG5cdFx0XHRmb290ZXI9KFx0XHRcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1mb290ZXJcIj5cblx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXNlY29uZGFyeVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2xvc2U8L2J1dHRvbj5cblx0XHRcdFx0XHQ8YnV0dG9uIFxuXHRcdFx0XHRcdFx0dHlwZT1cInN1Ym1pdFwiIFxuXHRcdFx0XHRcdFx0b25DbGljaz17dGhpcy5zdWJtaXR9IFxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgPlxuXHRcdFx0XHRcdFx0XHR7dGhpcy5wcm9wcy5zdWJtaXRUZXh0fVxuXHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdClcblx0XHR9XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbCBmYWRlIHRleHQtbGVmdCBwYW5lbC1kZWZhdWx0XCIgaWQ9e3RoaXMucHJvcHMuaWR9IHRhYkluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCIgYXJpYS1sYWJlbGxlZGJ5PVwiZXhhbXBsZU1vZGFsTGFiZWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2dcIiByb2xlPVwiZG9jdW1lbnRcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XG5cdFx0XHRcdFx0XHRcdDxoNCBjbGFzc05hbWU9XCJtb2RhbC10aXRsZVwiIGlkPVwiZXhhbXBsZU1vZGFsTGFiZWxcIj57dGhpcy5wcm9wcy50aXRsZX08L2g0PlxuXHRcdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBkaXNwbGF5PVwibm9uZVwiIGNsYXNzTmFtZT1cImNsb3NlIGhpZGVcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPlxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxuXHRcdFx0XHRcdFx0XHRcdHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHR7Zm9vdGVyfVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuXG4iLCJpbXBvcnQgRm9ybSBmcm9tICcuLi91dGlscy9mb3JtcydcblxuXG5leHBvcnQgY2xhc3MgU3ByYXlGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXG5cdFx0dGhpcy5zdWJtaXQ9dGhpcy5zdWJtaXQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnN0YXRlPXtcblx0XHRcdHZpbmV5YXJkOlwiXCIsXG5cdFx0XHRzZWFzb246XCJcIixcblx0XHRcdGRhdGU6bW9tZW50KCkuZm9ybWF0KFwiTU0vREQvWVlZWVwiKSxcblx0XHRcdHNwcmF5VHlwZTpcIlwiLFxuXHRcdFx0cXVhbnRpdHk6MFxuXHRcdH1cblx0fVxuXG5cdHN1Ym1pdChlKXtcblx0XHRpZih0aGlzLnN0YXRlLnZpbmV5YXJkPT1cIlwiIHx8dGhpcy5zdGF0ZS5zcHJheV90eXBlPT1cIlwiIHx8IChtb21lbnQodGhpcy5zdGF0ZS5kYXRlLFwiTU0vREQvWVlZWVwiKS5pc1ZhbGlkKCkpIT09dHJ1ZSl7XG5cdFx0XHRjb25zb2xlLmxvZyhcIm5vdCB2YWxpZFwiKTtcblx0XHR9ZWxzZXtcblx0XHRcdHZhciBjb3B5PXBzLmNsb25lKHRoaXMuc3RhdGUpO1xuXHRcdFx0JCgnIycrIHRoaXMucHJvcHMuaWQpLm1vZGFsKCdoaWRlJylcblx0XHRcdHRoaXMuc3RhdGU9e1xuXHRcdFx0XHR2aW5leWFyZDpcIlwiLFxuXHRcdFx0XHRzZWFzb246XCJcIixcblx0XHRcdFx0ZGF0ZTptb21lbnQoKS5mb3JtYXQoXCJNTS9ERC9ZWVlZXCIpLFxuXHRcdFx0XHRzcHJheV90eXBlOlwiXCIsXG5cdFx0XHRcdHF1YW50aXR5OjBcblx0XHRcdH1cblx0XHRcdHRoaXMuc2V0U3RhdGUodGhpcy5zdGF0ZSk7XG5cdFx0XHRjb25zb2xlLmxvZyhcIklOIFNVQk1JVFwiKTtcblx0XHRcdHRoaXMucHJvcHMuY3JlYXRlU3ByYXlFbnRyeShjb3B5KTtcblx0XHR9XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dmFyIGZpZWxkcz1bXHRcdFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImF1dG9Db21wbGV0ZVwiLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7dmluZXlhcmQ6ZS50YXJnZXQudmFsdWV9KVxuXHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdHZhbHVlOnRoaXMuc3RhdGUudmluZXlhcmQsXG5cdFx0XHRcdHJlcXVpcmVkOnRydWUsXG5cdFx0XHRcdGxhYmxlOlwiVmluZXlhcmRcIixcblx0XHRcdFx0ZG9jdHlwZTpcIlZpbmV5YXJkXCIsXG5cdFx0XHRcdGRvY3ZhbHVlOlwibmFtZVwiXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImF1dG9Db21wbGV0ZVwiLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7c2Vhc29uOmUudGFyZ2V0LnZhbHVlfSlcblx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHR2YWx1ZTp0aGlzLnN0YXRlLnNlYXNvbixcblx0XHRcdFx0cmVxdWlyZWQ6dHJ1ZSxcblx0XHRcdFx0bGFibGU6XCJTZWFzb25cIixcblx0XHRcdFx0ZG9jdHlwZTpcIlNlYXNvblwiLFxuXHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJkYXRlXCIsXG5cdFx0XHRcdHJlcXVpcmVkOnRydWUsXG5cdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtkYXRlOmUudGFyZ2V0LnZhbHVlfSk7XG5cdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0dmFsdWU6dGhpcy5zdGF0ZS5kYXRlLFxuXHRcdFx0XHRsYWJsZTpcIkRhdGVcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJhdXRvQ29tcGxldGVcIixcblx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGUpeyBcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtzcHJheV90eXBlOmUudGFyZ2V0LnZhbHVlfSlcblx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHR2YWx1ZTp0aGlzLnN0YXRlLnNwcmF5X3R5cGUsXG5cdFx0XHRcdHJlcXVpcmVkOnRydWUsXG5cdFx0XHRcdGxhYmxlOlwiU3ByYXkgVHlwZVwiLFxuXHRcdFx0XHRkb2N0eXBlOlwiU3ByYXkgVHlwZVwiLFxuXHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJpbnB1dFwiLFxuXHRcdFx0XHRjbGFzc05hbWU6XCJ2aW5leWFyZC1pbnB1dFwiLFxuXHRcdFx0XHR0eXBlOlwibnVtYmVyXCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtxdWFudGl0eTplLnRhcmdldC52YWx1ZX0pXG5cdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0dmFsdWU6dGhpcy5zdGF0ZS5xdWFudGl0eSxcblx0XHRcdFx0bGFibGU6XCJxdWFudGl0eVwiXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImJ1dHRvblwiLFxuXHRcdFx0XHR0eXBlOlwic3VibWl0XCIsXG5cdFx0XHRcdHZhbHVlOlwiQ3JlYXRlIFNwcmF5aW5nIEVudHJ5XCIsXG5cdFx0XHRcdGNsYXNzTmFtZTpcImJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIixcblx0XHRcdFx0b25DbGljazp0aGlzLnN1Ym1pdFxuXHRcdFx0fVxuXG5cblx0XHRdXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XHRcdFxuXHRcdFx0XHRORVcgU1BSQVlcblx0XHRcdFx0PEZvcm1cblx0XHRcdFx0XHRpZD17dGhpcy5wcm9wcy5pZH1cblx0XHRcdFx0XHR0eXBlPVwiaG9yaXpvbnRhbFwiXG5cdFx0XHRcdFx0ZmllbGRzPXtmaWVsZHN9XG5cblx0XHRcdFx0Lz5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuXG5leHBvcnQgY2xhc3MgUHJ1bmluZ0Zvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cblx0XHR0aGlzLnN1Ym1pdD10aGlzLnN1Ym1pdC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuc3RhdGU9e1xuXHRcdFx0dmluZXlhcmQ6XCJcIixcblx0XHRcdHNlYXNvbjpcIlwiLFxuXHRcdFx0ZGF0ZTptb21lbnQoKS5mb3JtYXQoXCJNTS9ERC9ZWVlZXCIpLFxuXHRcdFx0c3ByYXlUeXBlOlwiXCIsXG5cdFx0XHRxdWFudGl0eTowXG5cdFx0fVxuXHR9XG5cblx0c3VibWl0KGUpe1xuXHRcdGlmKHRoaXMuc3RhdGUudmluZXlhcmQ9PVwiXCIgfHx0aGlzLnN0YXRlLnNwcmF5X3R5cGU9PVwiXCIgfHwgKG1vbWVudCh0aGlzLnN0YXRlLmRhdGUsXCJNTS9ERC9ZWVlZXCIpLmlzVmFsaWQoKSkhPT10cnVlKXtcblx0XHRcdGNvbnNvbGUubG9nKFwibm90IHZhbGlkXCIpO1xuXHRcdH1lbHNle1xuXHRcdFx0dmFyIGNvcHk9cHMuY2xvbmUodGhpcy5zdGF0ZSk7XG5cdFx0XHQkKCcjJysgdGhpcy5wcm9wcy5pZCkubW9kYWwoJ2hpZGUnKVxuXHRcdFx0dGhpcy5zdGF0ZT17XG5cdFx0XHRcdHZpbmV5YXJkOlwiXCIsXG5cdFx0XHRcdHNlYXNvbjpcIlwiLFxuXHRcdFx0XHRkYXRlOm1vbWVudCgpLmZvcm1hdChcIk1NL0REL1lZWVlcIiksXG5cdFx0XHRcdHNwcmF5X3R5cGU6XCJcIixcblx0XHRcdFx0cXVhbnRpdHk6MFxuXHRcdFx0fVxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh0aGlzLnN0YXRlKTtcblx0XHRcdGNvbnNvbGUubG9nKFwiSU4gU1VCTUlUXCIpO1xuXHRcdFx0dGhpcy5wcm9wcy5jcmVhdGVTcHJheUVudHJ5KGNvcHkpO1xuXHRcdH1cblx0fVxuXHRyZW5kZXIoKXtcblx0XHR2YXIgZmllbGRzPVtcdFx0XG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiZGF0ZVwiLFxuXHRcdFx0XHRyZXF1aXJlZDp0cnVlLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7ZGF0ZTplLnRhcmdldC52YWx1ZX0pO1xuXHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdHZhbHVlOnRoaXMuc3RhdGUuZGF0ZSxcblx0XHRcdFx0bGFibGU6XCJEYXRlXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGZpZWxkOlwiaW5wdXRcIixcblx0XHRcdFx0Y2xhc3NOYW1lOlwidmluZXlhcmQtaW5wdXRcIixcblx0XHRcdFx0dHlwZTpcIm51bWJlclwiLFxuXHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7cXVhbnRpdHk6ZS50YXJnZXQudmFsdWV9KVxuXHRcdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRcdHZhbHVlOnRoaXMuc3RhdGUucXVhbnRpdHksXG5cdFx0XHRcdGxhYmxlOlwicXVhbnRpdHlcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJidXR0b25cIixcblx0XHRcdFx0dHlwZTpcInN1Ym1pdFwiLFxuXHRcdFx0XHR2YWx1ZTpcIkNyZWF0ZSBTcHJheWluZyBFbnRyeVwiLFxuXHRcdFx0XHRjbGFzc05hbWU6XCJidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIsXG5cdFx0XHRcdG9uQ2xpY2s6dGhpcy5zdWJtaXRcblx0XHRcdH1cblxuXG5cdFx0XVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2Plx0XHRcblx0XHRcdFx0TkVXIFBSVU5OSU5HXG5cdFx0XHRcdDxGb3JtXG5cdFx0XHRcdFx0aWQ9XCJDcmVhdGVTcHJheWluZ0VudHJ5Rm9ybVwiXG5cdFx0XHRcdFx0dHlwZT1cImhvcml6b250YWxcIlxuXHRcdFx0XHRcdGZpZWxkcz17ZmllbGRzfVxuXG5cdFx0XHRcdC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59IiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG4vL2ltcG9ydCBEYXlzV29ya29yZGVycyBmcm9tICcuLi8uLi9wdWJsaWMvanMvbW9kdWxlcy9kYXlzX3dvcmtvcmRlcnMvRGF5c1dvcmtvcmRlcnMnXG5pbXBvcnQgRGF5c1RpbWVzaGVldHMgZnJvbSAnLi4vLi4vcHVibGljL2pzL21vZHVsZXMvZGF5c190aW1lc2hlZXRzL0RheXNUaW1lU2hlZXRzJ1xuXG4vL2NvbnN0IGFwcD0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpO1xuY29uc3QgYXBwPSAkKCcjYXBwJylbMF07XG5jb25zdCB0aW1lc2hlZXRzPSAkKCcjdGltZScpWzBdO1xuXG5jbGFzcyBXb3JrUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblxuXHRcdC8qIGJpbmQgZGluZyBkaW5nICovXG5cdFx0dGhpcy5tYWluQ2xpY2tlZD10aGlzLm1haW5DbGlja2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy53b3Jrb3JkZXJzQ2xpY2tlZD10aGlzLndvcmtvcmRlcnNDbGlja2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy50aW1lc2hlZXRDbGlja2VkPXRoaXMudGltZXNoZWV0Q2xpY2tlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuaGFuZGVsQ2xvY2tJbj10aGlzLmhhbmRlbENsb2NrSW4uYmluZCh0aGlzKTtcblx0XHR0aGlzLmhhbmRlbFJvdXRlPXRoaXMuaGFuZGVsUm91dGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLnN0YXRlVXBkYXRlPXRoaXMuc3RhdGVVcGRhdGUuYmluZCh0aGlzKTtcblx0XHRcblxuXHRcdC8vSGFuZGVsIFVzZXIgbE9hZFxuXHRcdC8vIGlmICggZnJhcHBlLnVzZXJfaWQgPT0gXCJBZG1pbmlzdHJhdG9yXCIgKXtcblx0XHQvLyBcdHdpbmRvdy5sb2NhdGlvbiA9IFwiL2Rlc2tcIjtcblx0XHQvLyB9XG5cdFx0Ly8gaWYgKCBmcmFwcGUudXNlcl9pZCA9PSBcIkdldXN0XCIpe1xuXHRcdC8vIFx0d2luZG93LmxvY2F0aW9uID0gXCIvbG9naW5cIjtcblx0XHQvLyB9XG5cdFx0dGhpcy5jdXJyZW50VXNlcj1wcy5pbml0Q3VycmVudFVzZXIoKTtcblx0XHR0aGlzLmN1cnJlbnRVc2VyLmdldCh7fSxmdW5jdGlvbihpdGVtcyl7XG5cdFx0XHRpZih0aGlzLmN1cnJlbnRVc2VyLml0ZW1zLnVzZXJuYW1lPT1cIkd1ZXN0XCIpe1xuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24gPSBcIi9sb2dpblwiO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdCQoZG9jdW1lbnQpLnRyaWdnZXIoXCJ1c2VyTG9hZGVkXCIpO1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKFwiYWZ0ZXIgTG9hZFwiLHRoaXMuY3VycmVudFVzZXIuaXRlbXMpO1xuXHRcdFx0fVxuXHRcdH0uYmluZCh0aGlzKSk7IFxuXHRcdHRoaXMuc3RhdGU9e2l0ZW1zOnRoaXMuY3VycmVudFVzZXIuaXRlbXN9O1xuXHRcdCQoZG9jdW1lbnQpLmJpbmQoJ3VzZXJMb2FkZWQnLHRoaXMuc3RhdGVVcGRhdGUpO1xuXG5cblx0XHQvL1JvdXRpbmdcblx0XHQkKHdpbmRvdykub24oXCJoYXNoY2hhbmdlXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5oYW5kZWxSb3V0ZSgpO1xuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0dmFyIHJvdXRlID0gd2luZG93LmxvY2F0aW9uLmhhc2guc2xpY2UoMSk7XG5cdFx0aWYoIXJvdXRlKSByb3V0ZSA9IFwiI21haW5cIjtcblx0XHR0aGlzLnN0YXRlLnBhZ2U9cm91dGU7XG5cdFx0aWYgKCF3aW5kb3cubG9jYXRpb24uaGFzaCkge1xuXHRcdFx0d2luZG93LmxvY2F0aW9uLmhhc2ggPSBcIiNtYWluXCI7XG5cdFx0fVxuXHRcdCQod2luZG93KS50cmlnZ2VyKFwiaGFzaGNoYW5nZVwiKTtcblxuXHR9XG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0XG5cdH1cblx0c3RhdGVVcGRhdGUoKXtcblx0XHQvL2FsZXJ0KFwidXBkYXRlXCIpO1xuXHRcdHRoaXMuc3RhdGUuaXRlbXM9dGhpcy5jdXJyZW50VXNlci5pdGVtcztcblx0XHR0aGlzLnNldFN0YXRlKHRoaXMuc3RhdGUpO1xuXG5cdH1cblx0aGFuZGVsUm91dGUoKXtcblx0XHR2YXIgcm91dGUgPSB3aW5kb3cubG9jYXRpb24uaGFzaC5zbGljZSgxKTtcblx0XHR2YXIgcGFnZXM9e1xuXHRcdFx0bWFpbjp0aGlzLm1haW5DbGlja2VkLFxuXHRcdFx0d29ya29yZGVyczp0aGlzLndvcmtvcmRlcnNDbGlja2VkLFxuXHRcdFx0dGltZXNoZWV0OnRoaXMudGltZXNoZWV0Q2xpY2tlZFxuXHRcdH1bcm91dGVdKCk7XG5cdH1cblx0aGFuZGVsQ2xvY2tJbigpe1xuXG5cdH1cblx0bWFpbkNsaWNrZWQoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtwYWdlOidtYWluJ30pO1xuXHR9XG5cdHdvcmtvcmRlcnNDbGlja2VkKCl7XG5cblx0XHR0aGlzLnNldFN0YXRlKHtwYWdlOid3b3Jrb3JkZXJzJ30pO1xuXG5cdH1cblx0dGltZXNoZWV0Q2xpY2tlZCgpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe3BhZ2U6J3RpbWVzaGVldCd9KTtcblxuXHR9XG5cdC8vPEFmZml4V3JhcHBlciBjbGFzc05hbWU9XCJzdGlja3lfc3VibmF2IHRleHQtY2VudGVyXCIgIG9mZnNldD17MTQwfSBoZWlnaHQ9XCI0MHB4XCI+PC9BZmZpeFdyYXBwZXI+XG5cdHJlbmRlcigpe1xuXHRcdHZhciBvdXRwdXQ9Jyc7XG5cdFx0aWYgKHRoaXMuc3RhdGUuaXRlbXMudXNlcm5hbWU9PVwiR3Vlc3RcInx8dGhpcy5zdGF0ZS5pdGVtcy51c2VybmFtZT09XCJBZG1pbmlzdHJhdG9yXCIpe1xuXHRcdFx0b3V0cHV0PSg8aDM+R3Vlc3QgT3IgQWRtaW48L2gzPik7XG5cdFx0fVxuXHRcdGVsc2UgaWYodGhpcy5zdGF0ZS5pdGVtcy5sZW5ndGg9PT0wKXtcblx0XHRcdG91dHB1dD0oPGgzPk5vIFVzZXIgRGF0YTwvaDM+KTtcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdG91dHB1dD0oXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFuZWwgd2l0aC1uYXYtdGFicyBwYW5lbC1wcmltYXJ5XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1oZWFkaW5nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibmF2IG5hdi10YWJzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImFjdGl2ZVwiPjxhIGhyZWY9XCIjY2xvY2tJblRhYlwiIGRhdGEtdG9nZ2xlPVwidGFiXCI+TWFpbjwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiI3dvcmtPcmRlclRhYlwiIGRhdGEtdG9nZ2xlPVwidGFiXCI+V29yayBPcmRlcnM8L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIiN0aW1lU2hlZXRUYWJcIiBkYXRhLXRvZ2dsZT1cInRhYlwiPlRpbWUgU2hlZXRzPC9hPjwvbGk+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFiLWNvbnRlbnRcIj5cdFx0XHRcdFxuICAgICAgICAgICAgICAgICAgICAgICAgPERheXNUaW1lc2hlZXRzIFxuXHRcdFx0XHRcdFx0XHRkYXRlPXt0aGlzLnN0YXRlLml0ZW1zLnRvZGF5fVxuXHRcdFx0XHRcdFx0XHRmdWxsX25hbWU9e3RoaXMuc3RhdGUuaXRlbXMuY3VycmVudF91c2VyLmZ1bGxfbmFtZX1cblx0XHRcdFx0XHRcdFx0cGFnZT17dGhpcy5zdGF0ZS5wYWdlfVxuXHRcdFx0XHRcdFx0XHRjcmV3PXt0aGlzLnN0YXRlLml0ZW1zLmNyZXd9XG5cdFx0XHRcdFx0XHQvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRyZXR1cm4oPGRpdj5cblx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbihmdW5jdGlvbigpe1xuXHRmcmFwcGUucmVhZHkoZnVuY3Rpb24oKXtcblx0XHRSZWFjdERPTS5yZW5kZXIoIFxuXHRcdDxXb3JrUGFnZSAvPlxuXHQsIHRpbWVzaGVldHMgKTtcblx0fSlcblxufSkoKTtcblxuXG5cblxuXG4iXX0=
