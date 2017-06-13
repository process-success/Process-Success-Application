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
						{ className: 'col-md-3 col-sm-3 col-xs-12 day_time_form_row_element' },
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
						{ className: 'col-md-3 col-sm-3 col-xs-12 day_time_form_row_element' },
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

},{}],8:[function(require,module,exports){
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

},{"../utils/modal":10,"./createIssue":6,"./taskCheck":7}],9:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{"../../public/js/modules/days_timesheets/DaysTimeSheets":1}]},{},[11])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c190aW1lc2hlZXRzL0RheXNUaW1lU2hlZXRzLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy9kYXlzX3RpbWVzaGVldHMvY2xvY2tJbi5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c190aW1lc2hlZXRzL2VtcGxveWVlVGltZS5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c190aW1lc2hlZXRzL3RpbWVTaGVldC5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c193b3Jrb3JkZXJzL0RheXNXb3Jrb3JkZXJzLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy9kYXlzX3dvcmtvcmRlcnMvY3JlYXRlSXNzdWUuanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL2RheXNfd29ya29yZGVycy90YXNrQ2hlY2suanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL2RheXNfd29ya29yZGVycy93b3Jrb3JkZXJUYXNrLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9mb3Jtcy5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvdXRpbHMvbW9kYWwuanN4IiwicHJvY2Vzc19zdWNjZXNzL3d3dy93b3JrcGFnZS93b3JrcGFnZS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0NBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OytlQUpBOzs7SUFNcUIsYzs7O0FBQ3BCLHlCQUFZLEtBQVosRUFBa0I7QUFB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RCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmltcG9ydCBEYXlzV29ya29yZGVycyBmcm9tICcuLi9kYXlzX3dvcmtvcmRlcnMvRGF5c1dvcmtvcmRlcnMnXG5pbXBvcnQgRW1wbG95ZWVUaW1lIGZyb20gJy4vZW1wbG95ZWVUaW1lJztcbmltcG9ydCBUaW1lU2hlZXQgZnJvbSAnLi90aW1lU2hlZXQnO1xuaW1wb3J0IENsb2NrSW4gZnJvbSAnLi9jbG9ja0luJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF5c1RpbWVTaGVldHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5zdGF0ZT17aXRlbXM6W119O1xuXHRcdHRoaXMuc3RhdGUudGltZT0nJztcblx0XHR0aGlzLmFkZD17fTtcblxuXHRcdC8qICAgICBEbyB0aGUgYmluZCB0aGluZyAgICAgICovXG5cblx0XHQvL1RpbWUgZW1wbG95ZWUgbGluZSBpdGVtXG5cdFx0dGhpcy50aW1lQ2hhbmdlZD10aGlzLnRpbWVDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy51cGRhdGVUaW1lPXRoaXMudXBkYXRlVGltZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZGVsZXRlRW1wbG95ZWU9dGhpcy5kZWxldGVFbXBsb3llZS5iaW5kKHRoaXMpO1xuXG5cdFx0dGhpcy51cGRhdGVGcm9tU2VydmVyPXRoaXMudXBkYXRlRnJvbVNlcnZlci5iaW5kKHRoaXMpO1xuXHRcdHRoaXMudGltZVNoZWV0V3JhcHBlcj10aGlzLnRpbWVTaGVldFdyYXBwZXIuYmluZCh0aGlzKTtcblxuXHRcdHRoaXMuYWRkRW1wbG95ZWU9dGhpcy5hZGRFbXBsb3llZS5iaW5kKHRoaXMpXG5cdFx0dGhpcy51cGRhdGVGcm9tU2VydmVyUGFyYW09dGhpcy51cGRhdGVGcm9tU2VydmVyUGFyYW0uYmluZCh0aGlzKTtcblxuXHRcdHRoaXMuY2xvY2tJbj10aGlzLmNsb2NrSW4uYmluZCh0aGlzKTtcblx0XHR0aGlzLmNsb2NrT3V0PXRoaXMuY2xvY2tPdXQuYmluZCh0aGlzKTtcblx0XHQvKiAgICBlbmQgQmluZCBkaW5nIGRpbmcgICAgICAgICAqL1xuXG5cdFx0dGhpcy5hdXRvY29tcGxldGVBcnI9W107XG5cdFx0dmFyIGFyZ3M9e307XG5cblx0XHQvL0dyYWIgdGhlIGVtcGxveWVlIHRpbWVzaGVldCBkYXRhXG5cdFx0dGhpcy5vYmpUb29sPXBzLmluaXRUaW1lU2hlZXRzKClcblx0XHR0aGlzLm9ialRvb2wuZ2V0KHtkYXRlOnByb3BzLmRhdGV9LGZ1bmN0aW9uKCl7XG5cdFx0XHR0aGlzLnVwZGF0ZUZyb21TZXJ2ZXIoKTtcblx0XHRcdHRoaXMub2JqVG9vbC5yZWFjdFNldHVwKHRoaXMudXBkYXRlRnJvbVNlcnZlcik7XG5cdFx0fS5iaW5kKHRoaXMpKTtcblxuXHRcdGlmICh0aGlzLm9ialRvb2wuaXRlbXM9PT11bmRlZmluZWQgfHx0aGlzLm9ialRvb2wuaXRlbXM9PT0gMCApe1xuXHRcdH1lbHNle3RoaXMuc3RhdGUuaXRlbXM9dGhpcy5vYmpUb29sLml0ZW1zO31cblxuXHRcdC8vR3JhYiB0aGUgZW1wbG95ZWUgbGlzdFxuXHRcdHZhciB0b29sPXBzLmluaXRFbXBsb3llZUxpc3QoKTtcblx0XHR0b29sLmdldCh7fSxmdW5jdGlvbigpe1xuXHRcdFx0cHMuZW1wbG95ZWVfbGFibGVzPSB0b29sLml0ZW1zLm1hcChmdW5jdGlvbihvYmopIHsgXG5cdFx0XHRcdHZhciByT2JqID0ge307XG5cdFx0XHRcdHJPYmoubGFiZWw9b2JqLmZ1bGxfbmFtZTtcblx0XHRcdFx0ck9iai52YWx1ZT1vYmoubmFtZTtcblx0XHRcdFx0cmV0dXJuIHJPYmo7XG5cdFx0XHR9KTtcblx0XHRcdCQoZG9jdW1lbnQpLnRyaWdnZXIoXCJlbXBsb3llZUxhYmxlc0xvYWRlZFwiKTtcblx0XHR9KTtcblxuXG5cdFx0XG5cblx0fVxuXG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gaGVscGVyIEZ1bmN0aW9uXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tXG5cdHVwZGF0ZUZyb21TZXJ2ZXIoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtpdGVtczp0aGlzLm9ialRvb2wuaXRlbXN9KTtcblx0fVxuXHR1cGRhdGVGcm9tU2VydmVyUGFyYW0oZGF0YSxpbmRleCl7XG5cdFx0dGhpcy5vYmpUb29sLml0ZW1zW2luZGV4XT1kYXRhO1xuXHRcdHRoaXMuc2V0U3RhdGUoe2l0ZW1zOnRoaXMub2JqVG9vbC5pdGVtc30pO1xuXHR9XG5cdGNyZXdzVGltZXNoZWV0SW5kZXgoY3Jldyl7XG5cdFx0Zm9yICh2YXIgaT0wOyBpIDwgdGhpcy5vYmpUb29sLml0ZW1zLmxlbmd0aDsgaSsrKXtcblx0XHRcdHZhciBpdGVtPXRoaXMub2JqVG9vbC5pdGVtc1tpXTtcblx0XHRcdGlmKGl0ZW0uY3Jldz09Y3Jldyl7XG5cdFx0XHRcdHJldHVybiBpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRnZXRJbmRleFRpbWVzaGVldCh0aW1lc2hlZXQpe1xuXHRcdHJldHVybiB0aGlzLm9ialRvb2wuZ2V0X2luZGV4X29mX2l0ZW0odGltZXNoZWV0KTtcblx0fVxuXHRnZXRJbmRleEVtcGxveWVlKHRpbWVzaGVldEluZGV4LGVtcGxveWVlTmFtZSl7XG5cdFx0dmFyIGVtcGxveWVlcz10aGlzLm9ialRvb2wuaXRlbXNbdGltZXNoZWV0SW5kZXhdLmVtcGxveWVlcztcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGVtcGxveWVlcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRpZiAoZW1wbG95ZWVOYW1lPT1lbXBsb3llZXNbaV0uZW1wbG95ZWUpe1xuXHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdH1cblx0XHR9XG5cblx0fVxuXG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gICAgICAgVGltZXNoZWV0IFdyYXBwZXIgRnVuY3Rpb25zXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHRcblxuXHRjbG9ja0luKHRpbWUsY3Jldyl7XG5cblx0XHR2YXIgdHNfaW5kZXg9dGhpcy5jcmV3c1RpbWVzaGVldEluZGV4KGNyZXcpO1xuXG5cdFx0dGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXM7XG5cdFx0Zm9yICh2YXIgaT0wOyBpIDwgdGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXMubGVuZ3RoOyBpKyspe1xuXHRcdFx0dGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXNbaV0uc3RhcnQ9dGltZTtcblx0XHR9XG5cdFx0dGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5zdGF0dXM9XCJDbG9ja2VkIEluXCI7XG5cdFx0dGhpcy5vYmpUb29sLnVwZGF0ZSh0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdKTtcblx0XHR0aGlzLnNldFN0YXRlKHtpdGVtczp0aGlzLm9ialRvb2wuaXRlbXN9KTtcblx0fVxuXHRjbG9ja091dCh0aW1lLGNyZXcpe1xuXG5cdFx0dmFyIHRzX2luZGV4PXRoaXMuY3Jld3NUaW1lc2hlZXRJbmRleChjcmV3KTtcblxuXHRcdHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzO1xuXHRcdGZvciAodmFyIGk9MDsgaSA8IHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzLmxlbmd0aDsgaSsrKXtcblx0XHRcdHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzW2ldLmVuZD10aW1lO1xuXHRcdH1cblx0XHR0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLnN0YXR1cz1cIkNsb2NrZWQgT3V0XCI7XG5cdFx0dGhpcy5vYmpUb29sLnVwZGF0ZSh0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdKTtcblx0XHR0aGlzLnNldFN0YXRlKHtpdGVtczp0aGlzLm9ialRvb2wuaXRlbXN9KTtcblx0fVxuXHRhZGRFbXBsb3llZSh0c19uYW1lLCBlbXBsb3llZV9uYW1lKXtcblx0XHR2YXIgdHNfaW5kZXggPSB0aGlzLmdldEluZGV4VGltZXNoZWV0KHRzX25hbWUpO1xuXHRcdHZhciBlbXBsb3llZUluZGV4ID0gdGhpcy5nZXRJbmRleEVtcGxveWVlKHRzX2luZGV4LGVtcGxveWVlX25hbWUpO1xuXG5cdFx0dmFyIHVwZGF0ZUNhbGxiYWNrPWZ1bmN0aW9uKGluZGV4KXtcblx0XHRcdHJldHVybiBmdW5jdGlvbihkYXRhKXtcdFx0XHRcblx0XHRcdFx0dGhpcy51cGRhdGVGcm9tU2VydmVyUGFyYW0oZGF0YSxpbmRleCk7XG5cdFx0XHR9LmJpbmQodGhpcyk7XG5cdFx0fS5iaW5kKHRoaXMpO1xuXG5cdFx0Zm9yICh2YXIgaT0wOyBpIDwgdGhpcy5vYmpUb29sLml0ZW1zLmxlbmd0aDsgaSsrKXtcblx0XHRcdHZhciBpdGVtID0gdGhpcy5vYmpUb29sLml0ZW1zW2ldO1xuXHRcdFx0aWYoaXRlbS5uYW1lPT10c19uYW1lKXtcblx0XHRcdFx0Zm9yICh2YXIgeD0wOyB4IDwgaXRlbS5lbXBsb3llZXMubGVuZ3RoOyB4Kyspe1xuXHRcdFx0XHRcdHZhciBjb250YWluZXIgPSBpdGVtLmVtcGxveWVlc1t4XTtcblx0XHRcdFx0XHRpZiAoY29udGFpbmVyLmVtcGxveWVlPT1lbXBsb3llZV9uYW1lKXtcblx0XHRcdFx0XHRcdHJldHVybiBcImR1cGxpY2F0ZVwiO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLm9ialRvb2wuaXRlbXNbaV0uZW1wbG95ZWVzLnB1c2goeyBlbXBsb3llZSA6IGVtcGxveWVlX25hbWUsIG5ldzonMSd9KTtcblx0XHRcdFx0dGhpcy5vYmpUb29sLnVwZGF0ZSh0aGlzLm9ialRvb2wuaXRlbXNbaV0sdXBkYXRlQ2FsbGJhY2soaSksMSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0dmFyIGRvbmU9MTtcblx0XHRcdFx0aWYoaXRlbS5lbXBsb3llZXMubGVuZ3RoPjApe1xuXHRcdFx0XHRcdGZvciAodmFyIHg9MDsgeCA8IGl0ZW0uZW1wbG95ZWVzLmxlbmd0aCAmJiBkb25lOyB4Kyspe1xuXHRcdFx0XHRcdFx0dmFyIGNvbnRhaW5lciA9IGl0ZW0uZW1wbG95ZWVzW3hdO1xuXHRcdFx0XHRcdFx0aWYgKGNvbnRhaW5lci5lbXBsb3llZT09ZW1wbG95ZWVfbmFtZSl7XG5cdFx0XHRcdFx0XHRcdHRoaXMub2JqVG9vbC5pdGVtc1tpXS5lbXBsb3llZXMuc3BsaWNlKHgsIDEpO1xuXHRcdFx0XHRcdFx0XHR0aGlzLm9ialRvb2wuY2hhbmdlZCh0aGlzLm9ialRvb2wuaXRlbXNbaV0pO1xuXHRcdFx0XHRcdFx0XHRkb25lPTA7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdH07XG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vICAgICAgICAgICBUaW1lc2hlZXQgV3JhcHBlclxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVx0XG5cdHRpbWVTaGVldFdyYXBwZXIoaXRlbSxpbmRleCl7XG5cdFx0dmFyIGVtcGxveWVlX291dHB1dD1bXTtcblx0XHRpZihpdGVtLmVtcGxveWVlcz09PXVuZGVmaW5lZCl7XG5cblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdHZhciBlbXBsb3llZU91dHB1dD1pdGVtLmVtcGxveWVlcy5tYXAoZnVuY3Rpb24oaXRlbV9lbXBsb3llZSxpbmRleF9lbXBsb3llZSl7XG5cdFx0XHQgXHRlbXBsb3llZV9vdXRwdXQucHVzaCh0aGlzLmVtcGxveWVlTGluZUl0ZW0oaXRlbV9lbXBsb3llZSxpdGVtLm5hbWUsaW5kZXhfZW1wbG95ZWUpKTtcblx0XHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuKFxuXG5cdFx0XHQ8VGltZVNoZWV0XG5cdFx0XHRcdGtleT17aW5kZXh9IFxuXHRcdFx0XHRuYW1lPXtpdGVtLm5hbWV9XG5cdFx0XHRcdGRhdGU9e2l0ZW0uZGF0ZX1cblx0XHRcdFx0Y3Jldz17aXRlbS5jcmV3fVxuXHRcdFx0XHRlbXBsb3llZXM9e2VtcGxveWVlX291dHB1dH1cblx0XHRcdFx0YWRkRW1wbG95ZWU9e3RoaXMuYWRkRW1wbG95ZWV9XG5cdFx0XHRcdG9uVXBkYXRlPXt0aGlzLnVwZGF0ZX1cblx0XHRcdC8+XG5cblx0XHQpO1xuXHR9XG5cblxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vICAgICAgIEVtcGxveWVlIFRpbWUgRm9ybSBMaW5laXRlbVxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRkZWxldGVFbXBsb3llZShlbXBsb3llZSx0aW1lc2hlZXQpe1xuXHRcdHZhciB0c19pbmRleCA9IHRoaXMuZ2V0SW5kZXhUaW1lc2hlZXQodGltZXNoZWV0KTtcblx0XHR2YXIgZG9uZT0xO1xuXHRcdHZhciBpdGVtPXRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF07XG5cdFx0aWYoaXRlbS5lbXBsb3llZXMubGVuZ3RoPjApe1xuXHRcdFx0Zm9yICh2YXIgeD0wOyB4IDwgaXRlbS5lbXBsb3llZXMubGVuZ3RoICYmIGRvbmU7IHgrKyl7XG5cdFx0XHRcdHZhciBjb250YWluZXIgPSBpdGVtLmVtcGxveWVlc1t4XTtcblx0XHRcdFx0aWYgKGNvbnRhaW5lci5lbXBsb3llZT09ZW1wbG95ZWUpe1xuXHRcdFx0XHRcdHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzLnNwbGljZSh4LCAxKTtcblx0XHRcdFx0XHQvL8aSY29uc29sZS5sb2codGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XSk7XG5cdFx0XHRcdFx0dGhpcy5vYmpUb29sLnVwZGF0ZSh0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdKTtcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtpdGVtczp0aGlzLm9ialRvb2wuaXRlbXN9KTtcblx0XHRcdFx0XHRkb25lPTA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHR0aW1lQ2hhbmdlZChwb3NpdGlvbixlbXBsb3llZSx0aW1lc2hlZXQsdmFsdWUpe1xuXHRcdHZhciB0c19pbmRleCA9IHRoaXMuZ2V0SW5kZXhUaW1lc2hlZXQodGltZXNoZWV0KTtcblx0XHR2YXIgZW1wbG95ZWVJbmRleCA9IHRoaXMuZ2V0SW5kZXhFbXBsb3llZSh0c19pbmRleCxlbXBsb3llZSk7XG5cdFx0dGhpcy5zdGF0XG5cdFx0aWYocG9zaXRpb249PSdlbmQnKXtcblx0XHRcdHRoaXMuc3RhdGUuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlc1tlbXBsb3llZUluZGV4XS5lbmQ9dmFsdWU7XG5cdFx0fVxuXHRcdGVsc2V7dGhpcy5zdGF0ZS5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzW2VtcGxveWVlSW5kZXhdLnN0YXJ0PXZhbHVlfVxuXHQgICAgdGhpcy5zZXRTdGF0ZSh7aXRlbXM6dGhpcy5zdGF0ZS5pdGVtc30pO1xuXHR9XG5cdHVwZGF0ZVRpbWUocG9zaXRpb24sZW1wbG95ZWUsdGltZXNoZWV0LHZhbHVlKXtcblx0XHR2YXIgdHNfaW5kZXggPSB0aGlzLmdldEluZGV4VGltZXNoZWV0KHRpbWVzaGVldCk7XG5cdFx0dmFyIGVtcGxveWVlSW5kZXggPSB0aGlzLmdldEluZGV4RW1wbG95ZWUodHNfaW5kZXgsZW1wbG95ZWUpO1xuXHRcdHZhciBzYXZlPTA7XG5cdFx0dmFsdWU9cHMudGltZV9hZGRfZGlnaXRzKHZhbHVlKVxuXHRcdGlmKHBvc2l0aW9uPT0nZW5kJyAmJiBwcy50aW1lX2FkZF9mcm9udF96ZXJvKHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzW2VtcGxveWVlSW5kZXhdLmVuZCkgIT0gcHMudGltZV9hZGRfZGlnaXRzKHZhbHVlKSl7IFxuXHRcdFx0dGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXNbZW1wbG95ZWVJbmRleF0uZW5kPXBzLnRpbWVfYWRkX2RpZ2l0cyh2YWx1ZSk7XG5cdFx0XHRzYXZlPTE7XG5cdFx0fVxuXHQgICAgaWYocG9zaXRpb249PSdzdGFydCcgJiYgcHMudGltZV9hZGRfZnJvbnRfemVybyh0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlc1tlbXBsb3llZUluZGV4XS5zdGFydCkgIT0gcHMudGltZV9hZGRfZGlnaXRzKHZhbHVlKSl7XG5cdCAgICBcdHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzW2VtcGxveWVlSW5kZXhdLnN0YXJ0PXBzLnRpbWVfYWRkX2RpZ2l0cyh2YWx1ZSk7XG5cdCAgICBcdHNhdmU9MTtcblx0ICAgIH1cblx0ICAgIGlmKHNhdmUpe1xuXHRcdCAgICB0aGlzLnNldFN0YXRlKHtpdGVtczp0aGlzLm9ialRvb2wuaXRlbXN9KTtcblx0XHQgICAgdGhpcy5vYmpUb29sLnVwZGF0ZSh0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLGZ1bmN0aW9uKCl7XG5cdFx0ICAgIFx0cHMuc3VjY2Vzc0FsZXJ0KHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzW2VtcGxveWVlSW5kZXhdLmVtcGxveWVlX25hbWUrXCIgdGltZSB1cGRhdGVkIVwiKTtcblx0XHQgICAgfS5iaW5kKHRoaXMpKTtcblx0XHR9XG5cdH1cblx0ZW1wbG95ZWVMaW5lSXRlbShlbXBsb3llZV9jb250YWluZXIsdGltZV9zaGVldCxlbXBsb3llZV9pbmRleCl7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PEVtcGxveWVlVGltZVxuXHRcdFx0XHRrZXk9e2VtcGxveWVlX2luZGV4fVxuXHRcdFx0XHR0aW1lc2hlZXQ9e3RpbWVfc2hlZXR9XG5cdFx0XHRcdGVtcGxveWVlX25hbWU9e2VtcGxveWVlX2NvbnRhaW5lci5lbXBsb3llZV9uYW1lfVxuXHRcdFx0XHRlbXBsb3llZT17ZW1wbG95ZWVfY29udGFpbmVyLmVtcGxveWVlfVxuXHRcdFx0XHRzdGFydD17cHMudGltZV9hZGRfZnJvbnRfemVybyhlbXBsb3llZV9jb250YWluZXIuc3RhcnQpfVxuXHRcdFx0XHRlbmQ9e3BzLnRpbWVfYWRkX2Zyb250X3plcm8oZW1wbG95ZWVfY29udGFpbmVyLmVuZCl9XG5cdFx0XHRcdHVwZGF0ZVRpbWU9e3RoaXMudXBkYXRlVGltZX1cblx0XHRcdFx0dGltZUNoYW5nZWQ9e3RoaXMudGltZUNoYW5nZWR9XG5cdFx0XHRcdGRlbGV0ZUVtcGxveWVlPXt0aGlzLmRlbGV0ZUVtcGxveWVlfVxuXHRcdFx0Lz5cblx0XHQpO1xuXHR9XG5cblxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gICAgICAgIFJlbmRlclxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdHJlbmRlcigpe1xuXHRcdC8vaGFuZGVsIGVtcHR5IHJldHVyblxuXHRcdGlmICh0aGlzLnN0YXRlLml0ZW1zLmxlbmd0aD09PTB8fHRoaXMuc3RhdGUuaXRlbXM9PT11bmRlZmluZWQpe1xuXHRcdFx0cmV0dXJuICg8ZGl2Pk5vIFRpbWUgU2hlZXRzLCBzdGFydCBieSA8YSBocmVmPVwiL2Rlc2tcIj5jcmVhdGluZyBzb21lIGNyZXdzITwvYT48L2Rpdj4pO1xuXHRcdH1cblx0XHR2YXIgb3V0cHV0PVtdXG5cdFx0dGhpcy5zdGF0ZS5pdGVtcy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXHRcdFx0aWYoaXRlbS5jcmV3PT10aGlzLnByb3BzLmNyZXcpe1xuXHRcdFx0XHRvdXRwdXQudW5zaGlmdCh0aGlzLnRpbWVTaGVldFdyYXBwZXIoaXRlbSxpbmRleCkpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdG91dHB1dC5wdXNoKHRoaXMudGltZVNoZWV0V3JhcHBlcihpdGVtLGluZGV4KSk7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKHRoaXMpKTtcblxuXHRcdHZhciB0c19pbmRleD10aGlzLmNyZXdzVGltZXNoZWV0SW5kZXgodGhpcy5wcm9wcy5jcmV3KTtcblx0XHR2YXIgc3RhdHVzPScnO1xuXHRcdGlmICh0c19pbmRleD09dW5kZWZpbmVkKXt2YXIgc3RhdHVzPWZhbHNlO31cblx0XHRlbHNle3N0YXR1cyA9dGhpcy5zdGF0ZS5pdGVtc1t0c19pbmRleF0uc3RhdHVzfVxuXHRcdFxuXG5cdFx0Ly9NQUlOIFJFTkRFUlxuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidGFiLXBhbmUgZmFkZSBpbiBhY3RpdmVcIiBpZD1cImNsb2NrSW5UYWJcIj5cblx0XHRcdFx0XHQ8Q2xvY2tJblxuXHRcdFx0XHRcdFx0Y2xvY2tJbj17dGhpcy5jbG9ja0lufVxuXHRcdFx0XHRcdFx0Y2xvY2tPdXQ9e3RoaXMuY2xvY2tPdXR9XG5cdFx0XHRcdFx0XHRzdGF0dXM9e3N0YXR1c31cblx0XHRcdFx0XHRcdGZ1bGxfbmFtZT17dGhpcy5wcm9wcy5mdWxsX25hbWV9XG5cdFx0XHRcdFx0XHRkYXRlPXt0aGlzLnByb3BzLmRhdGV9XG5cdFx0XHRcdFx0XHRjcmV3PXt0aGlzLnByb3BzLmNyZXd9XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidGFiLXBhbmUgZmFkZVwiIGlkPVwidGltZVNoZWV0VGFiXCI+XG5cdFx0XHRcdFx0PGJyLz5cblx0XHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ0YWItcGFuZSBmYWRlXCIgaWQ9XCJ3b3JrT3JkZXJUYWJcIj5cblx0XHRcdFx0XHRcdDxEYXlzV29ya29yZGVycyBcblx0XHRcdFx0XHRcdFx0ZGF0ZT17dGhpcy5wcm9wcy5kYXRlfVxuXHRcdFx0XHRcdFx0XHRjcmV3PXt0aGlzLnByb3BzLmNyZXd9XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXG5cdFx0KTtcblxuXHR9O1x0XG59XG5cblxuXG5cblxuIiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbG9ja0luIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMudG9nZ2xlVGltZUlucHV0PXRoaXMudG9nZ2xlVGltZUlucHV0LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jbG9ja0luPXRoaXMuY2xvY2tJbi5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY2xvY2tPdXQ9dGhpcy5jbG9ja091dC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMub25DaGFuZ2U9dGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpO1xuXG5cdFx0dGhpcy5zdGF0ZT17XG5cdFx0XHRkYXRlOm5ldyBEYXRlKCksXG5cdFx0XHRzcGVjaWZ5VGltZTpmYWxzZVxuXHRcdH07XG5cblx0fVxuXHRjbG9ja0luKGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRpZih0aGlzLnN0YXRlLnNwZWNpZnlUaW1lPT1mYWxzZSl7XG5cdFx0XHR2YXIgdGltZT10aGlzLnN0YXRlLmRhdGUudG9Mb2NhbGVUaW1lU3RyaW5nKFtdLCB7aG91cjogJzItZGlnaXQnLCBtaW51dGU6JzItZGlnaXQnLGhvdXIxMjogZmFsc2V9KVxuXHRcdFx0Ly9jb25zb2xlLmxvZyh0aW1lKTtcblx0XHRcdHBzLnN1Y2Nlc3NBbGVydChcIkNsb2NrZWQgaW4gYXQgXCIgKyB0aGlzLnN0YXRlLmRhdGUudG9Mb2NhbGVUaW1lU3RyaW5nKFtdLCB7aG91cjogJzItZGlnaXQnLCBtaW51dGU6JzItZGlnaXQnfSkpXG5cdFx0XHR0aGlzLnByb3BzLmNsb2NrSW4odGltZSwgdGhpcy5wcm9wcy5jcmV3KVxuXHRcdH1lbHNle1xuXHRcdFx0Ly9jb25zb2xlLmxvZyh0aGlzLnN0YXRlLnRpbWUpXG5cdFx0XHRpZih0aGlzLnN0YXRlLnRpbWUhPXVuZGVmaW5lZCl7XG5cdFx0XHRcdHRoaXMucHJvcHMuY2xvY2tJbih0aGlzLnN0YXRlLnRpbWUsIHRoaXMucHJvcHMuY3Jldyk7XG5cdFx0XHRcdHBzLnN1Y2Nlc3NBbGVydChcIkNsb2NrZWQgaW5cIik7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Ly9pbnZhbGlkIHRpbWUgZXJyb3Jcblx0XHRcdFx0cHMuZmFpbEFsZXJ0KFwiSW52YWxpZCB0aW1lLlwiKVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRjbG9ja091dChlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0aWYodGhpcy5zdGF0ZS5zcGVjaWZ5VGltZT09ZmFsc2Upe1xuXHRcdFx0dmFyIHRpbWU9dGhpcy5zdGF0ZS5kYXRlLnRvTG9jYWxlVGltZVN0cmluZyhbXSwge2hvdXI6ICcyLWRpZ2l0JywgbWludXRlOicyLWRpZ2l0Jyxob3VyMTI6IGZhbHNlfSlcblx0XHRcdC8vY29uc29sZS5sb2codGltZSk7XG5cdFx0XHRwcy5zdWNjZXNzQWxlcnQoXCJDbG9ja2VkIG91dCBhdCBcIiArIHRoaXMuc3RhdGUuZGF0ZS50b0xvY2FsZVRpbWVTdHJpbmcoW10sIHtob3VyOiAnMi1kaWdpdCcsIG1pbnV0ZTonMi1kaWdpdCd9KStcIiBIYXZlIGEgZ3JlYXQgbmlnaHQhXCIpXG5cdFx0XHR0aGlzLnByb3BzLmNsb2NrT3V0KHRpbWUsIHRoaXMucHJvcHMuY3Jldylcblx0XHR9ZWxzZXtcblx0XHRcdC8vY29uc29sZS5sb2codGhpcy5zdGF0ZS50aW1lKVxuXHRcdFx0aWYodGhpcy5zdGF0ZS50aW1lIT11bmRlZmluZWQpe1xuXHRcdFx0XHR0aGlzLnByb3BzLmNsb2NrT3V0KHRoaXMuc3RhdGUudGltZSwgdGhpcy5wcm9wcy5jcmV3KTtcblx0XHRcdFx0cHMuc3VjY2Vzc0FsZXJ0KFwiQ2xvY2tlZCBPdXQhICBIYXZlIGEgZ3JlYXQgbmlnaHQhXCIpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdC8vaW52YWxpZCB0aW1lIGVycm9yXG5cdFx0XHRcdHBzLmZhaWxBbGVydChcIkludmFsaWQgdGltZS5cIilcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0dG9nZ2xlVGltZUlucHV0KGUpe1xuXHRcdC8vY29uc29sZS5sb2codGhpcy5zdGF0ZS5zcGVjaWZ5VGltZSk7XG5cdFx0aWYodGhpcy5zdGF0ZS5zcGVjaWZ5VGltZSl7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtzcGVjaWZ5VGltZTpmYWxzZX0pO1xuXHRcdH1cblx0XHRlbHNle3RoaXMuc2V0U3RhdGUoe3NwZWNpZnlUaW1lOnRydWV9KTt9XG5cdH1cblx0b25DaGFuZ2UoZSl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7dGltZTplLnRhcmdldC52YWx1ZX0pO1xuXHR9XG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdHRoaXMudGltZXJJRCA9IHNldEludGVydmFsKCgpID0+IHRoaXMudGljaygpLDEwMDAwKTtcblx0fVxuXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuXHRcdGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcklEKTtcblx0fVxuXG5cdHRpY2soKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRkYXRlOiBuZXcgRGF0ZSgpXG5cdFx0fSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cblx0XG5cdFx0dmFyIHZhbHVlcz17XG5cdFx0XHQnQ3JlYXRlZCc6W3RoaXMuY2xvY2tJbiwnQ2xvY2sgSW4nLCdidG4gYnRuLWxnIGJ0bi1zdWNjZXNzIGJ0bi1ibG9jayddLFxuXHRcdFx0J0Nsb2NrZWQgSW4nOlt0aGlzLmNsb2NrT3V0LCAnQ2xvY2sgT3V0JywgJ2J0biBidG4tbGcgYnRuLXN1Y2Nlc3MgYnRuLWJsb2NrJyBdLFxuXHRcdFx0J0Nsb2NrZWQgT3V0JzpbdGhpcy5jbG9ja091dCwgJ0NoYW5nZSBDbG9ja291dCBUaW1lJywnYnRuIGJ0bi1sZyBidG4tc3VjY2VzcyBidG4tYmxvY2snXSxcblx0XHRcdCdTdWJtaW50ZWQnOlsnJywnQWxyZWFkeSBTdWJtaW50ZWQnLCdidG4gYnRuLWxnIGJ0bi1zdWNjZXNzIGJ0bi1ibG9jayddLFxuXHRcdFx0J0Fwcm92ZWQnOlsnJywnQWxyZWFkeSBTdWJtaW50ZWQnLCdidG4gYnRuLWxnIGJ0bi1zdWNjZXNzIGJ0bi1ibG9jayddXG5cdFx0fVt0aGlzLnByb3BzLnN0YXR1c107XG5cdFx0dmFyIG91dHB1dD0nJztcblx0XHRpZiAodmFsdWVzPT11bmRlZmluZWQpe1xuXHRcdFx0b3V0cHV0PSg8YSBocmVmPVwiI3RpbWVzaGVldFwiPllvdSBhcmUgbm90IGluIGEgVGltZSBTaGVldCBhZGQgeW91cnNlbGYuPC9hPik7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHR2YXIgaW5wdXRGaWVsZCA9ICggPGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9e3ZhbHVlc1syXX0gb25DbGljaz17dmFsdWVzWzBdfSB2YWx1ZT17dmFsdWVzWzFdfSAvPik7XG5cdFx0XHRvdXRwdXQ9KFxuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8aDMgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cblx0XHRcdFx0XHRXZWxjb21lIDxzcGFuIGNsYXNzTmFtZT1cInVzZXJuYW1lXCI+e3RoaXMucHJvcHMuZnVsbF9uYW1lfTwvc3Bhbj5cblx0XHRcdFx0PC9oMz5cblx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+e3RoaXMuc3RhdGUuZGF0ZS50b0xvY2FsZVRpbWVTdHJpbmcoW10sIHtob3VyOiAnMi1kaWdpdCcsIG1pbnV0ZTonMi1kaWdpdCd9KX0gb24ge3RoaXMuc3RhdGUuZGF0ZS50b0RhdGVTdHJpbmcoKX0gPC9oMz5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2Nsb2NrSW4nPlxuXHRcdFx0XHRcdDxmb3JtIGNsYXNzTmFtZT1cImZvcm0tY2hlY2tpblwiIHJvbGU9XCJmb3JtXCI+XG5cdFx0XHRcdFx0XHR7aW5wdXRGaWVsZH1cblx0XHRcdFx0XHRcdDxici8+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndGV4dC1jZW50ZXInPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PGlucHV0IFxuXHRcdFx0XHRcdFx0XHRcdFx0dHlwZT1cInRpbWVcIiBcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5zdGF0ZS5zcGVjaWZ5VGltZSA/ICdmb3JtLWNvbnRyb2wgc21hbGwtdGltZSc6J2hpZGRlbid9IFxuXHRcdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG5cdFx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxici8+XG5cdFx0XHRcdFx0XHRcdDxhIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiIG9uQ2xpY2s9e3RoaXMudG9nZ2xlVGltZUlucHV0fT57dGhpcy5zdGF0ZS5zcGVjaWZ5VGltZT8nIC0gVXNlIEN1cnJlbnQgVGltZSc6JyArIFNwZWNpZnkgYSBUaW1lJ308L2E+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Zvcm0+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59IiwiXG4vKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERheXNUaW1lU2hlZXRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdC8vQmluZGluZyBkaW5nXG5cdFx0dGhpcy5jaGFuZ2VkU3RhcnQ9dGhpcy5jaGFuZ2VkU3RhcnQuYmluZCh0aGlzKVxuXHRcdHRoaXMuY2hhbmdlZEVuZD10aGlzLmNoYW5nZWRFbmQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnVwZGF0ZVN0YXJ0PXRoaXMudXBkYXRlU3RhcnQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnVwZGF0ZUVuZD10aGlzLnVwZGF0ZUVuZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZGVsZXRlPXRoaXMuZGVsZXRlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5rZXlQcmVzc2VkU3RhcnQ9dGhpcy5rZXlQcmVzc2VkU3RhcnQuYmluZCh0aGlzKTtcblx0XHR0aGlzLmtleVByZXNzZWRFbmQ9dGhpcy5rZXlQcmVzc2VkRW5kLmJpbmQodGhpcyk7XG5cdH1cblx0Y2hhbmdlZFN0YXJ0KGUpe1xuXHRcdHRoaXMucHJvcHMudGltZUNoYW5nZWQgICgnc3RhcnQnLHRoaXMucHJvcHMuZW1wbG95ZWUsdGhpcy5wcm9wcy50aW1lc2hlZXQsZS50YXJnZXQudmFsdWUpO1xuXHR9XG5cdGNoYW5nZWRFbmQoZSl7XG5cdFx0dGhpcy5wcm9wcy50aW1lQ2hhbmdlZCgnZW5kJyx0aGlzLnByb3BzLmVtcGxveWVlLHRoaXMucHJvcHMudGltZXNoZWV0LGUudGFyZ2V0LnZhbHVlKTtcblx0fVxuXHR1cGRhdGVTdGFydChlKXtcblx0XHRpZihlLnRhcmdldC52YWx1ZSE9Jycpe1xuXHRcdFx0dGhpcy5wcm9wcy51cGRhdGVUaW1lKCdzdGFydCcsdGhpcy5wcm9wcy5lbXBsb3llZSx0aGlzLnByb3BzLnRpbWVzaGVldCwgZS50YXJnZXQudmFsdWUpO1xuXHRcdH1cblx0fVxuXHR1cGRhdGVFbmQoZSl7XG5cdFx0aWYoZS50YXJnZXQudmFsdWUhPScnKXtcblx0XHRcdHRoaXMucHJvcHMudXBkYXRlVGltZSgnZW5kJyx0aGlzLnByb3BzLmVtcGxveWVlLHRoaXMucHJvcHMudGltZXNoZWV0LCBlLnRhcmdldC52YWx1ZSk7XG5cdFx0fVxuXHR9XG5cdGRlbGV0ZShlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5wcm9wcy5kZWxldGVFbXBsb3llZSh0aGlzLnByb3BzLmVtcGxveWVlLHRoaXMucHJvcHMudGltZXNoZWV0KTtcblx0fVxuXHRrZXlQcmVzc2VkU3RhcnQoZSkge1xuXHQgICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSB7XG5cdCAgICBcdGUucHJldmVudERlZmF1bHQoKTtcblx0ICAgIFx0aWYodGhpcy5wcm9wcy5zdGFydCE9Jycpe1xuXHRcdFx0XHR0aGlzLnByb3BzLnVwZGF0ZVRpbWUoJ3N0YXJ0Jyx0aGlzLnByb3BzLmVtcGxveWVlLHRoaXMucHJvcHMudGltZXNoZWV0LCB0aGlzLnByb3BzLnN0YXJ0KTtcblx0XHRcdH1cblx0ICAgIH1cblx0IH1cblx0a2V5UHJlc3NlZEVuZChlKSB7XG5cdCAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcblx0ICAgIFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHQgICAgXHRpZih0aGlzLnByb3BzLmVuZCE9Jycpe1xuXHRcdFx0XHR0aGlzLnByb3BzLnVwZGF0ZVRpbWUoJ3N0YXJ0Jyx0aGlzLnByb3BzLmVtcGxveWVlLHRoaXMucHJvcHMudGltZXNoZWV0LCB0aGlzLnByb3BzLmVuZCk7XG5cdFx0XHR9XG5cdCAgICB9XG5cdCB9XG5cdHJlbmRlcigpe1xuXHRcdHJldHVybihcblx0XHRcdDxsaSBjbGFzc05hbWU9XCJsaXN0LWdyb3VwLWl0ZW1cIiA+XG5cdFx0XHRcdDxmb3JtICBjbGFzc05hbWU9XCJmb3JtLWlubGluZSByb3cgZGF5X3RpbWVfZm9ybV9yb3dcIj5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbCBjb2wtbWQtMyBjb2wtc20tMyBjb2wteHMtMTIgdGV4dC1jZW50ZXIgZGF5X3RpbWVfZm9ybV9yb3dfZWxlbWVudFwiPjxzdHJvbmc+eyB0aGlzLnByb3BzLmVtcGxveWVlX25hbWV9PC9zdHJvbmc+PC9sYWJlbD5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTMgY29sLXNtLTMgY29sLXhzLTEyIGRheV90aW1lX2Zvcm1fcm93X2VsZW1lbnRcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXBcIj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cC1hZGRvblwiPlN0YXJ0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxpbnB1dCBcblx0XHRcdFx0XHRcdFx0XHR0eXBlPVwidGltZVwiIFxuXHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCBzdGFydFwiIFxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlPXt0aGlzLnByb3BzLnN0YXJ0fVxuXHRcdFx0XHRcdFx0XHRcdG9uQmx1cj17dGhpcy51cGRhdGVTdGFydH1cblx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5jaGFuZ2VkU3RhcnR9XG5cdFx0XHRcdFx0XHRcdFx0b25LZXlQcmVzcz17dGhpcy5rZXlQcmVzc2VkU3RhcnR9XG5cblx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTMgY29sLXNtLTMgY29sLXhzLTEyIGRheV90aW1lX2Zvcm1fcm93X2VsZW1lbnRcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXBcIj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cC1hZGRvblwiPkVuZDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8aW5wdXQgXG5cdFx0XHRcdFx0XHRcdFx0dHlwZT1cInRpbWVcIiBcblx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgZW5kXCIgXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU9e3RoaXMucHJvcHMuZW5kfVxuXHRcdFx0XHRcdFx0XHRcdG9uQmx1cj17dGhpcy51cGRhdGVFbmR9XG5cdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuY2hhbmdlZEVuZH1cblx0XHRcdFx0XHRcdFx0XHRvbktleVByZXNzPXt0aGlzLmtleVByZXNzZWRFbmR9XG5cdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTMgY29sLXNtLTMgY29sLXhzLTEyIHRleHQtY2VudGVyIGRheV90aW1lX2Zvcm1fcm93X2VsZW1lbnRcIj5cblx0XHRcdFx0XHRcdDxidXR0b24gXG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImRlbGV0ZSBidG4gYnRuLWRhbmdlclwiXG5cdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMuZGVsZXRlfVxuXHRcdFx0XHRcdFx0PkRlbGV0ZTwvYnV0dG9uPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Zvcm0+XG5cdFx0XHQ8L2xpPlxuXHRcdCk7XG5cdH1cbn0iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZVNoZWV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdC8qICAgICBEbyB0aGUgYmluZCB0aGluZyAgICAgICovXG5cdFx0dGhpcy5hdXRvY29tcGxldGU9dGhpcy5hdXRvY29tcGxldGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmFkZENoYW5nZWQ9dGhpcy5hZGRDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5hZGRDbGlja2VkPXRoaXMuYWRkQ2xpY2tlZC5iaW5kKHRoaXMpO1xuXHR9XG5cblx0YXV0b2NvbXBsZXRlKGlucHV0KXtcblx0XHR2YXIgY29uZmlnID0ge1xuXHRcdFx0bWluQ2hhcnM6IDAsXG5cdFx0XHRtYXhJdGVtczogOTksXG5cdFx0XHRhdXRvRmlyc3Q6IHRydWUsXG5cdFx0XHRpdGVtOiBmdW5jdGlvbihpdGVtLCBpbnB1dCkge1xuXHRcdFx0XHR2YXIgZCA9IGl0ZW07XG5cdFx0XHRcdHZhciBodG1sID0gXCI8c3Bhbj5cIiArIF9fKGl0ZW0ubGFiZWwpKyBcIjwvc3Bhbj48YnI+PHNwYW4+PHNtYWxsPlwiK2l0ZW0udmFsdWUrXCI8L3NtYWxsPjwvc3Bhbj5cIjtcblx0XHRcdFx0cmV0dXJuICQoJzxsaT48L2xpPicpXG5cdFx0XHRcdFx0LmRhdGEoJ2l0ZW0uYXV0b2NvbXBsZXRlJywgaXRlbSlcblx0XHRcdFx0XHQuaHRtbCgnPGE+PHA+JyArIGh0bWwgKyAnPC9wPjwvYT4nKVxuXHRcdFx0XHRcdC5nZXQoMCk7XG5cdFx0XHR9XG5cdFx0fTtcblx0XHR2YXIgYXcgPSBuZXcgQXdlc29tcGxldGUoaW5wdXQsY29uZmlnKTtcblx0XHRpbnB1dC5hZGRFdmVudExpc3RlbmVyKFxuXHRcdFx0J2F3ZXNvbXBsZXRlLXNlbGVjdGNvbXBsZXRlJyxcblx0XHRcdFx0dGhpcy5hZGRDaGFuZ2VkXG5cdFx0KTtcblx0XHRhdy5saXN0PXBzLmVtcGxveWVlX2xhYmxlc1xuXHRcdCQoZG9jdW1lbnQpLmJpbmQoJ2VtcGxveWVlTGFibGVzTG9hZGVkJyxmdW5jdGlvbigpe1xuXHRcdFx0YXcubGlzdD1wcy5lbXBsb3llZV9sYWJsZXM7XG5cdFx0fSk7XG5cdH1cblx0YWRkQ2hhbmdlZChlKXtcblx0XHR0aGlzLmFkZD1lLnRhcmdldC52YWx1ZTtcblx0fTtcblx0YWRkQ2xpY2tlZChlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dmFyIHdvX25hbWU9dGhpcy5wcm9wcy5uYW1lO1xuXHRcdHZhciBlbXBsb3llZV9uYW1lPXRoaXMuYWRkO1xuXHRcdC8vQ2FsbCBiYWNrIGZvciBiaW5kaW5nP1xuXHRcdHZhciB1cGRhdGVDYWxsYmFjaz1mdW5jdGlvbihpbmRleCl7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oZGF0YSl7XHRcdFx0XG5cdFx0XHRcdHRoaXMudXBkYXRlRnJvbVNlcnZlclBhcmFtKGRhdGEsaW5kZXgpO1xuXHRcdFx0fS5iaW5kKHRoaXMpO1xuXHRcdH0uYmluZCh0aGlzKTtcblx0XHR0aGlzLnByb3BzLmFkZEVtcGxveWVlKHdvX25hbWUsIGVtcGxveWVlX25hbWUpO1xuXHR9O1xuXHRyZW5kZXIoKXtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsIHBhbmVsLWRlZmF1bHQgcm93XCI+XG5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYW5lbC1oZWFkaW5nXCI+XG5cdFx0XHRcdFx0PGg0IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+IFRpbWUgU2hlZXQge3RoaXMucHJvcHMuZGF0ZX0gZm9yIHt0aGlzLnByb3BzLmNyZXd9IDwvaDQ+XG5cdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdDx1bCBjbGFzc05hbWU9XCJsaXN0LWdyb3VwXCIgPlxuXHRcdFx0XHRcdDxkaXYgaWQ9J2Zvcm1zJz5cblx0XHRcdFx0XHRcdHt0aGlzLnByb3BzLmVtcGxveWVlc31cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC91bD5cblx0XHRcdCAgXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtZm9vdGVyIGNvbC1tZC0xMiB0ZXh0LWxlZnQgbGlzdC1ncm91cC1pdGVtXCI+XG5cdFx0XHRcdFx0PGZvcm0gY2xhc3NOYW1lPVwiZm9ybS1pbmxpbmUgcm93IFwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBjb2wtbWQtMyBjb2wtc20tMiBjb2wteHMtMTIgdXBkYXRlX2Rpdl9lbGVtZW50XCI+XG5cdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tc3VjY2Vzc1wiPlVwZGF0ZTwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInRleHQtcmlnaHQgY29sLW1kLTYgY29sLXNtLTYgY29sLXhzLTQgXCI+XG5cdFx0XHRcdFx0XHRcdDxidXR0b24gXG5cdFx0XHRcdFx0XHRcdFx0dHlwZT1cInN1Ym1pdFwiIFxuXHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiXG5cdFx0XHRcdFx0XHRcdFx0b25DbGljaz17dGhpcy5hZGRDbGlja2VkfVxuXHRcdFx0XHRcdFx0XHRcdD4rIEFkZDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgdGV4dC1sZWZ0IGNvbC1tZC0zIGNvbC1zbS00IGNvbC14cy02IFwiPjxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXBcIj5cblx0XHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJ0ZXh0XCIgXG5cdFx0XHRcdFx0XHRcdFx0cmVmPXt0aGlzLmF1dG9jb21wbGV0ZX1cbiAgICAgICAgICBcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5hZGRDaGFuZ2VkfSBcbiAgICAgICAgICBcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJuZXdfZW1wbG95ZWVzIGZvcm0tY29udHJvbCBhd2Vzb21wbGV0ZVwiIFxuICAgICAgICAgIFx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwiZW1wbG95ZWVcIiAvPlxuXHRcdFx0XHRcdFx0PC9kaXY+PC9kaXY+XG5cdFx0XHRcdFx0PC9mb3JtPlxuXHRcdFx0XHRcdFxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuIiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5pbXBvcnQgV29ya29yZGVyVGFzayBmcm9tICcuL3dvcmtvcmRlclRhc2snO1xuXG5pbXBvcnQgRm9ybSBmcm9tICcuLi91dGlscy9mb3JtcydcbmltcG9ydCBNb2RhbCBmcm9tICcuLi91dGlscy9tb2RhbCdcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERheXNXb3Jrb3JkZXJzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHZhciBhcmdzPXt9O1xuXHRcdGFyZ3MuY3Jldz10aGlzLnByb3BzLmNyZXc7XG5cdFx0YXJncy5kYXRlPXRoaXMucHJvcHMuZGF0ZTtcblx0XHQvKiAgIERvIHRoZSBiaW5kIHRoaW5nICAqL1xuXHRcdHRoaXMub25UYXNrQ2hlY2tlZD10aGlzLm9uVGFza0NoZWNrZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLm9uU3RhdHVzQ2hhbmdlZD10aGlzLm9uU3RhdHVzQ2hhbmdlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMud29ya09yZGVyQ2hhbmdlZD10aGlzLndvcmtPcmRlckNoYW5nZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnNvY2tldFVwZGF0ZT10aGlzLnNvY2tldFVwZGF0ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcz10aGlzLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMuYmluZCh0aGlzKTtcblx0XHQvL3RoaXMud29ya29yZGVyT2JqPXRoaXMub25TdGF0dXNDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0LyogICAgICAgICAgZW5kICAgICAgICAgICovXG5cblx0XHR0aGlzLnN0YXRlPXt3b3Jrb3JkZXJzOltdfTtcblxuXHRcdHZhciBhcmdzPXt9O1xuXHRcdGFyZ3MuY3Jldz10aGlzLnByb3BzLmNyZXc7XG5cdFx0YXJncy5kYXRlPXRoaXMucHJvcHMuZGF0ZTtcblx0XHR0aGlzLndvcmtvcmRlclRvb2wgPSBuZXcgcHMuYXBpVG9vbChhcmdzLHBzLmFwaVNldHVwLndvcmtPcmRlcnMsdGhpcy53b3JrT3JkZXJDaGFuZ2VkKTtcblx0XHRpZiAodGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zPT09dW5kZWZpbmVkIHx8dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zPT09IDAgfHx0aGlzLndvcmtvcmRlclRvb2wuaXRlbXM9PT1udWxsICl7XG5cdFx0fWVsc2V7XG5cdFx0XHR0aGlzLnN0YXRlLndvcmtvcmRlcnM9dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zO1xuXHRcdH1cblxuXHR9XG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtcblxuXHRcdGlmKG5leHRQcm9wcy5jcmV3IT10aGlzLnByb3BzLmNyZXcgfHwgbmV4dFByb3BzLmRhdGUhPXRoaXMucHJvcHMuZGF0ZSApe1xuXG5cdFx0XHR2YXIgYXJncz17fTtcblx0XHRcdGFyZ3MuY3Jldz1uZXh0UHJvcHMuY3Jldztcblx0XHRcdGFyZ3MuZGF0ZT1uZXh0UHJvcHMuZGF0ZTtcblx0XHRcdHRoaXMud29ya29yZGVyVG9vbCA9IG5ldyBwcy5hcGlUb29sKGFyZ3MscHMuYXBpU2V0dXAud29ya09yZGVycyx0aGlzLndvcmtPcmRlckNoYW5nZWQpO1xuXHRcdFx0aWYgKHRoaXMud29ya29yZGVyVG9vbC5pdGVtcz09PXVuZGVmaW5lZCB8fHRoaXMud29ya29yZGVyVG9vbC5pdGVtcz09PSAwIHx8dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zPT09bnVsbCApe1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHt3b3Jrb3JkZXJzOltdfSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7d29ya29yZGVyczp0aGlzLndvcmtvcmRlclRvb2wuaXRlbXN9KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRzb2NrZXRVcGRhdGUoKXtcblxuXHR9XG5cdG9uVGFza0NoZWNrZWQod29faW5kZXgsaW5kZXgsY2hlY2spe1xuXHRcdHRoaXMud29ya29yZGVyVG9vbC5pdGVtc1t3b19pbmRleF0uc3VidGFza1tpbmRleF0uc3RhdHVzPWNoZWNrPzA6MTtcblx0XHR0aGlzLnNldFN0YXRlKHt3b3Jrb3JkZXJzOnRoaXMud29ya29yZGVyVG9vbC5pdGVtc30pO1xuXHRcdHRoaXMud29ya29yZGVyVG9vbC51cGRhdGUodGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zW3dvX2luZGV4XSk7XG5cdFx0dmFyIGNoZWNrZWRUZXh0PWNoZWNrP1widW5jaGVja2VkLlwiOlwiY2hlY2tlZC5cIlxuXHRcdC8vcHMuc3VjY2Vzc0FsZXJ0KHRoaXMud29ya29yZGVyVG9vbC5pdGVtc1t3b19pbmRleF0uc3VidGFza1tpbmRleF0udGFzayArXCIgXCIrIGNoZWNrZWRUZXh0ICk7XG5cdH1cblx0b25TdGF0dXNDaGFuZ2VkKHN0YXR1cywgaW5kZXgpe1xuXHRcdHRoaXMud29ya29yZGVyVG9vbC5pdGVtc1tpbmRleF0uc3RhdHVzPXN0YXR1cztcblx0XHR0aGlzLnNldFN0YXRlKHt3b3Jrb3JkZXJzOnRoaXMud29ya29yZGVyVG9vbC5pdGVtc30pO1xuXHRcdHRoaXMud29ya29yZGVyVG9vbC51cGRhdGUodGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zW2luZGV4XSk7XG5cdFx0aWYoc3RhdHVzPT1cIkNvbXBsZXRlXCIpe1xuXHRcdFx0cHMuc3VjY2Vzc0FsZXJ0KFwiV29ya29yZGVyIGNvbXBsZXRlZCFcIik7XG5cdFx0fVxuXHR9XG5cdHdvcmtPcmRlckNoYW5nZWQoKXtcblx0XHRpZiAodGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zIT09bnVsbCl7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHt3b3Jrb3JkZXJzOnRoaXMud29ya29yZGVyVG9vbC5pdGVtc30pO1xuXHRcdFx0aWYodGhpcy5wcm9wcy5zdGF0dXNVcGRhdGUgIT09IHVuZGVmaW5lZCl7XG5cdFx0XHRcdHRoaXMucHJvcHMuc3RhdHVzVXBkYXRlKHRoaXMud29ya29yZGVyVG9vbC5pdGVtcyk7XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHt3b3Jrb3JkZXJzOltdfSk7XG5cdFx0fVxuXG5cdH1cblx0d29ya29yZGVyT2JqKGl0ZW0saW5kZXgpe1xuXHRcdHJldHVybihcblx0XHRcdDxXb3Jrb3JkZXJUYXNrIFxuXHRcdFx0XHRrZXk9e2luZGV4fSBcblx0XHRcdFx0aW5kZXg9e2luZGV4fSBcblx0XHRcdFx0bG9jYXRpb25fcm91dGU9e2l0ZW0ubG9jYXRpb25fcm91dGV9XG5cdFx0XHRcdGxvY2F0aW9uPXtpdGVtLmxvY2F0aW9ufVxuXHRcdFx0XHR0YXNrcz17aXRlbS5zdWJ0YXNrfVxuXHRcdFx0XHRzdGF0dXM9e2l0ZW0uc3RhdHVzfVxuXHRcdFx0XHR0eXBlPXtpdGVtLnR5cGV9XG5cdFx0XHRcdHdvcmtvcmRlcj17aXRlbS5uYW1lfVxuXHRcdFx0XHRvblRhc2tDaGVja2VkPXt0aGlzLm9uVGFza0NoZWNrZWR9XG5cdFx0XHRcdG9uU3RhdHVzQ2hhbmdlZD17dGhpcy5vblN0YXR1c0NoYW5nZWR9XG5cdFx0XHRcdHJvdXRlPXtpdGVtLnJvdXRlfVxuXHRcdFx0Lz5cblx0XHQpO1xuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyAgICAgICAgUmVuZGVyXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0cmVuZGVyKCl7XG5cdFx0aWYgKHRoaXMuc3RhdGUud29ya29yZGVycz09PTB8fHRoaXMuc3RhdGUud29ya29yZGVycz09PXVuZGVmaW5lZCl7XG5cdFx0XHRyZXR1cm4gKDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj48aDM+Tm8gV29ya29yZGVyczwvaDM+PC9kaXY+KTtcblx0XHR9XG5cdFx0dmFyIHRvZG89W107XG5cdFx0dmFyIGNvbXBsZXRlPVtdO1xuXHRcdHRoaXMuc3RhdGUud29ya29yZGVycy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXHRcdFx0aWYgKGl0ZW0uc3RhdHVzIT0nQ29tcGxldGUnJiZpdGVtLnN0YXR1cyE9J0luY29tcGxldGUnKXtcblx0XHRcdFx0dG9kby5wdXNoKHRoaXMud29ya29yZGVyT2JqKGl0ZW0saW5kZXgpKTtcblx0XHRcdFx0aWYodG9kby5sZW5ndGglMz09PTApe3RvZG8ucHVzaCg8ZGl2IGNsYXNzTmFtZT0nY2xlYXJmaXgnPjwvZGl2Pil9XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Y29tcGxldGUucHVzaCh0aGlzLndvcmtvcmRlck9iaihpdGVtLGluZGV4KSk7XG5cdFx0XHRcdGlmKGNvbXBsZXRlLmxlbmd0aCUzPT09MCl7Y29tcGxldGUucHVzaCg8ZGl2IGNsYXNzTmFtZT0nY2xlYXJmaXgnPjwvZGl2Pil9XG5cdFx0XHR9XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0XHR2YXIgY29tcGxldGVIZWFkZXI9KDxoMz5Db21wbGV0ZSBXb3JrIE9yZGVyczwvaDM+KTtcblx0XHRpZihjb21wbGV0ZS5sZW5ndGg9PTApe1xuXHRcdFx0Y29tcGxldGVIZWFkZXI9XCJcIjtcblx0XHR9XG5cblxuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwid29ya29yZGVyX2NvbnRhaW5lclwiPlxuXHRcdFx0XHQ8ZGl2Pjxici8+XG5cdFx0XHRcdFx0e3RvZG99XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNsZWFyZml4XCI+PC9kaXY+XG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0e2NvbXBsZXRlSGVhZGVyfVxuXHRcdFx0XHRcdHtjb21wbGV0ZX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj48L2Rpdj5cblx0XHRcdFx0PGJyLz5cblx0XHRcdFx0PFdvcmtvcmRlckZvcm1Nb2RhbFxuXHRcdFx0XHRcdGlkPXtcImNyZWF0ZS13by1cIit0aGlzLnByb3BzLmNyZXcucmVwbGFjZShcIiBcIixcIi1cIil9XG5cdFx0XHRcdC8+XG5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cblx0fTtcdFxufVxuXG5leHBvcnQgY2xhc3MgV29ya29yZGVyRm9ybU1vZGFsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHZhciBmaWVsZHM9W1x0XHRcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJhdXRvQ29tcGxldGVcIixcblx0XHRcdFx0b25DaGFuZ2U6IHRoaXMuc29tZUZ1bmN0aW9uLFxuXHRcdFx0XHRsYWJsZTpcIlZpbmV5YXJkXCIsXG5cdFx0XHRcdGRvY3R5cGU6XCJWaW5leWFyZFwiLFxuXHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJpbnB1dFwiLFxuXHRcdFx0XHR0eXBlOlwibnVtYmVyXCIsXG5cdFx0XHRcdG9uQ2hhbmdlOiB0aGlzLnNvbWVGdW5jdGlvbixcblx0XHRcdFx0bGFibGU6XCJQcmlvcml0eVwiXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImRhdGVcIixcblx0XHRcdFx0b25DaGFuZ2U6IHRoaXMuc29tZUZ1bmN0aW9uLFxuXHRcdFx0XHRsYWJsZTpcIkRhdGVcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZmllbGQ6XCJzZWxlY3RcIixcblx0XHRcdFx0b25DaGFuZ2U6IHRoaXMuc29tZUZ1bmN0aW9uLFxuXHRcdFx0XHRsYWJsZTpcIlR5cGVcIixcblx0XHRcdFx0b3B0aW9uczpbXG5cdFx0XHRcdFx0XCJXYXRlcmluZ1wiLFxuXHRcdFx0XHRcdFwiUHJ1bm5pbmdcIixcblx0XHRcdFx0XHRcIlJlcGFpclwiLFxuXHRcdFx0XHRcdFwiU3ByYXlpbmdcIlxuXHRcdFx0XHRdXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmaWVsZDpcImF1dG9Db21wbGV0ZVwiLFxuXHRcdFx0XHRvbkNoYW5nZTogdGhpcy5zb21lRnVuY3Rpb24sXG5cdFx0XHRcdGxhYmxlOlwiQ3Jld1wiLFxuXHRcdFx0XHRkb2N0eXBlOlwiQ3Jld1wiLFxuXHRcdFx0XHRkb2N2YWx1ZTpcIm5hbWVcIixcblx0XHRcdFx0ZG9jbGFibGU6XCJjcmV3X2xlYWRfZnVsbF9uYW1lXCJcblx0XHRcdH1cblxuXHRcdF1cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cdFx0XHRcdFxuXHRcdFx0XHQ8YSBcblx0XHRcdFx0XHRocmVmPVwiI1wiIFxuXHRcdFx0XHRcdGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiXG5cdFx0XHRcdFx0b25DbGljaz17ZnVuY3Rpb24oKXskKCcjJysgdGhpcy5wcm9wcy5pZCkubW9kYWwoKX0uYmluZCh0aGlzKX1cblx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzXCI+PC9zcGFuPiBOZXcgV29yayBPcmRlcjwvYT5cblx0XHRcdFx0PE1vZGFsIFxuXHRcdFx0XHRcdGlkPXt0aGlzLnByb3BzLmlkfSBcblx0XHRcdFx0XHRzdWJtaXRUZXh0PVwiU3VibWl0XCIgXG5cdFx0XHRcdFx0dGl0bGU9XCJDcmVhdGUgTmV3IFdvcmtvcmRlclwiXG5cdFx0XHRcdFx0c3VibWl0PXt0aGlzLm9uU3RhdHVzQ2hhbmdlZH0+XG5cblx0XHRcdFx0XHQ8Rm9ybVxuXHRcdFx0XHRcdFx0aWQ9XCJDcmVhdGVXb3Jrb3JkZXJGb3JtXCJcblx0XHRcdFx0XHRcdHR5cGU9XCJob3Jpem9udGFsXCJcblx0XHRcdFx0XHRcdGZpZWxkcz17ZmllbGRzfVxuXHRcdFx0XHRcdC8+XG5cblx0XHRcdFx0PC9Nb2RhbD5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cbiIsIi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyZWF0ZUlzc3VlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpXG5cdFx0dGhpcy5tb2RhbE5ld0lzc3VlPXRoaXMubW9kYWxOZXdJc3N1ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMubW9kYWxFZGl0SXNzdWU9dGhpcy5tb2RhbEVkaXRJc3N1ZS5iaW5kKHRoaXMpO1xuXHR9XG5cdHRvb2xUaXAoKXtcblx0XHQkKGZ1bmN0aW9uICgpIHtcblx0XHQgXHQkKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJykudG9vbHRpcCgpO1xuXHRcdH0pXG5cdH1cblx0bW9kYWxOZXdJc3N1ZShlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5wcm9wcy5hY3RpdmF0ZU1vZGFsTmV3KCk7XG5cdH1cblx0bW9kYWxFZGl0SXNzdWUoaXRlbSxlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0Y29uc29sZS5sb2coaXRlbSlcblx0XHR0aGlzLnByb3BzLmFjdGl2YXRlTW9kYWxFZGl0KGl0ZW0pO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdFx0XHRcdC8vIFx0XHRkYXRhLXRvZ2dsZT1cIm1vZGFsXCIgXG5cdFx0XHRcdFx0Ly8gZGF0YS10YXJnZXQ9e1wiI1wiK3RoaXMucG9wVXBJZH1cblx0XHRcdFx0IC8vIFx0YXJpYS1sYWJlbD1cIkNyZWF0ZSBJc3N1ZVwiIFxuXHRcdFx0XHQgLy8gXHRkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIiBcblx0XHRcdFx0IC8vIFx0ZGF0YS1wbGFjZW1lbnQ9XCJ0b3BcIiBcblx0XHRcdFx0IC8vIFx0dGl0bGU9XCJJc3N1ZVwiIFxuXHRcdFx0XHRcdC8vIHJlZj17dGhpcy50b29sVGlwfVx0XHRcdFx0XHQvLyBvbkNsaWNrPXsgdGhpcy5wb3BVcH0gPlxuXHRcdHZhciBkcm9wZG93bkl0ZW1zPVtdO1xuXHRcdGlmKHRoaXMucHJvcHMuaXNzdWVzIT09bnVsbCl7XG5cdFx0XHR0aGlzLnByb3BzLmlzc3Vlcy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXHRcdFx0XHRpZiAoaXRlbS5zdGF0dXMgPT0nU3VibWl0dGVkJyB8fCBpdGVtLnN0YXR1cz09J0Fzc2lnbmVkJyl7XG5cdFx0XHRcdFx0ZHJvcGRvd25JdGVtcy5wdXNoKFxuXHRcdFx0XHRcdFx0PGxpIGtleT17aW5kZXh9PiBcblx0XHRcdFx0XHRcdFx0PGEgY2xhc3NOYW1lPVwiZHJvcGRvd24taXRlbVwiIFxuXHRcdFx0XHRcdFx0XHRcdGhyZWY9XCIjXCIgXG5cdFx0XHRcdFx0XHRcdFx0b25DbGljaz17dGhpcy5tb2RhbEVkaXRJc3N1ZS5iaW5kKHRoaXMsaXRlbSl9IFxuXHRcdFx0XHRcdFx0XHQ+e2l0ZW0udGl0bGV9PC9hPlxuXHRcdFx0XHRcdFx0PC9saT4pO1xuXHRcdFx0XHR9XG5cdFx0XHR9LmJpbmQodGhpcykpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInRleHQtcmlnaHRcIj5cblxuXHRcdFx0XHQ8YnV0dG9uXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi14cyBkcm9wZG93bi10b2dnbGUgY3JlYXRlLWlzc3VlXCIgXG5cdFx0XHRcdFx0dHlwZT1cImJ1dHRvblwiIFxuXHRcdFx0XHRcdGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBcblx0XHRcdFx0XHRhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIFxuXHRcdFx0XHRcdGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiID5cblxuXHRcdFx0XHQgXHQ8c3BhbiBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLWV4Y2xhbWF0aW9uLXNpZ25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XG5cdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHQ8dWwgY2xhc3NOYW1lPVwiZHJvcGRvd24tbWVudVwiPlxuXHRcdFx0XHQgICAgPGxpIGNsYXNzTmFtZT1cImRyb3Bkb3duLWhlYWRlclwiPklzc3VlczwvbGk+XG5cdFx0XHRcdCAgICB7ZHJvcGRvd25JdGVtc31cblx0XHRcdFx0ICAgIDxsaSByb2xlPVwic2VwYXJhdG9yXCIgY2xhc3NOYW1lPVwiZGl2aWRlclwiPjwvbGk+XG5cdFx0XHRcdCAgICA8bGk+PGEgXG5cdFx0XHRcdCAgICBcdGNsYXNzTmFtZT1cImRyb3Bkb3duLWl0ZW1cIlxuXHRcdFx0XHQgICAgXHRvbkNsaWNrPXt0aGlzLm1vZGFsTmV3SXNzdWV9XG5cdFx0XHRcdCAgICBcdGhyZWY9XCIjXCIgPiArIE5ldyBJc3N1ZTwvYT48L2xpPlxuXHRcdFx0XHQ8L3VsPlxuXG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cblxuIiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrQ2hlY2sgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0Y29uc29sZS5sb2codGhpcy5wcm9wcy5jaGVja2VkKTtcblx0XHR0aGlzLnRhc2tDaGVja2VkID0gdGhpcy50YXNrQ2hlY2tlZC5iaW5kKHRoaXMpO1xuXHR9XG5cdHRhc2tDaGVja2VkKGUpe1xuXHRcdHRoaXMucHJvcHMudGFza0NoZWNrZWQodGhpcy5wcm9wcy5pbmRleCwgdGhpcy5wcm9wcy5jaGVja2VkKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCBjaGVja2VkID0gdGhpcy5wcm9wcy5jaGVja2VkID8gXCJsaW5lLXRocm91Z2hcIiA6IFwiXCI7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPXtjaGVja2VkfT5cblx0XHRcdFx0XHQ8aW5wdXQgb25DaGFuZ2U9e3RoaXMudGFza0NoZWNrZWR9IHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9e3RoaXMucHJvcHMuY2hlY2tlZH0gLz5cblx0XHRcdFx0XHR7dGhpcy5wcm9wcy5sYWJsZX1cblx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cdFxufSIsIlxuLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5pbXBvcnQgVGFza0NoZWNrIGZyb20gJy4vdGFza0NoZWNrJ1xuaW1wb3J0IENyZWF0ZUlzc3VlIGZyb20gJy4vY3JlYXRlSXNzdWUnXG5pbXBvcnQgTW9kYWwgZnJvbSAnLi4vdXRpbHMvbW9kYWwnXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29ya29yZGVyVGFzayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnN0YXRlPXtcblx0XHRcdGlzc3VlczpbXSxcblx0XHRcdHRpdGxlOicnLFxuXHRcdFx0bW9kYWw6J25ldycsXG5cdFx0XHRtb2RhbFByaW9yaXR5Oidsb3cnLFxuXHRcdFx0bW9kYWxUaXRsZTonJyxcblx0XHRcdG1vZGFsRGVzY3JpcHRpb246JycsXG5cdFx0XHRtb2RhbE5hbWU6Jydcblx0XHR9O1xuXHRcdHRoaXMudGFza0NoZWNrZWQ9dGhpcy50YXNrQ2hlY2tlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuc3RhdHVzQ2hhbmdlPXRoaXMuc3RhdHVzQ2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5hY3RpdmF0ZU1vZGFsTmV3PXRoaXMuYWN0aXZhdGVNb2RhbE5ldy5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuYWN0aXZhdGVNb2RhbEVkaXQ9dGhpcy5hY3RpdmF0ZU1vZGFsRWRpdC5iaW5kKHRoaXMpO1xuXHRcdFxuXHRcdHRoaXMuc3VibWl0SXNzdWU9dGhpcy5zdWJtaXRJc3N1ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMubW9kYWxUaXRsZUNoYW5nZT10aGlzLm1vZGFsVGl0bGVDaGFuZ2UuYmluZCh0aGlzKTtcblx0XHR0aGlzLm1vZGFsRGVzY3JpcHRpb25DaGFuZ2U9dGhpcy5tb2RhbERlc2NyaXB0aW9uQ2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5tb2RhbFByaW9yaXR5Q2hhbmdlPXRoaXMubW9kYWxQcmlvcml0eUNoYW5nZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuaXNzdWVDaGFuZ2VkPXRoaXMuaXNzdWVDaGFuZ2VkLmJpbmQodGhpcyk7XG5cblxuXHRcdHRoaXMubW9kYWxJZD1cImlzc3VlLWZvcm0tXCIrdGhpcy5wcm9wcy53b3Jrb3JkZXI7XG5cblx0XHRcblx0XHR0aGlzLmlzc3VlVG9vbCA9IG5ldyBwcy5hcGlUb29sKHtcIndvcmtfb3JkZXJcIjp0aGlzLnByb3BzLndvcmtvcmRlcn0se2RvY3R5cGU6J0lzc3VlJ30sdGhpcy5pc3N1ZUNoYW5nZWQpO1xuXG5cblx0fVxuXHR0YXNrQ2hlY2tlZChlKXtcblx0XHR0aGlzLnNldFN0YXRlKHt0aXRsZTpcIkNIRUNLRURcIn0pO1xuXHR9XG5cdGlzQ2hlY2tlZCh2YWx1ZSl7XG4gICAgXHRyZXR1cm4gKCh2YWx1ZT09PXRoaXMuc3RhdGUuc2VsZWN0ZWQpID8nY2hlY2tlZCBsaW5lLXRocm91Z2gnOidkZWZhdWx0Jyk7XG4gIFx0fVxuICBcdHRhc2tDaGVja2VkKGluZGV4LGNoZWNrZWQpe1xuICBcdFx0dmFyIHdvX2luZGV4PXRoaXMucHJvcHMuaW5kZXg7XG4gIFx0XHR0aGlzLnByb3BzLm9uVGFza0NoZWNrZWQod29faW5kZXgsaW5kZXgsY2hlY2tlZCk7XG4gIFx0fVxuICBcdHN0YXR1c0NoYW5nZShlKXtcbiAgXHRcdHRoaXMucHJvcHMub25TdGF0dXNDaGFuZ2VkKGUudGFyZ2V0LnZhbHVlLHRoaXMucHJvcHMuaW5kZXgpO1xuXG4gIFx0fVxuICBcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0XHRcdElTU1VFIEZVTkNUSU9OU1xuICBcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgXHRtb2RhbFRpdGxlQ2hhbmdlKGUpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe21vZGFsVGl0bGU6ZS50YXJnZXQudmFsdWV9KTtcbiAgXHR9XG5cdG1vZGFsUHJpb3JpdHlDaGFuZ2UoZSl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7bW9kYWxQcmlvcml0eTplLnRhcmdldC52YWx1ZX0pO1xuXHR9XG5cdG1vZGFsRGVzY3JpcHRpb25DaGFuZ2UoZSl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7bW9kYWxEZXNjcmlwdGlvbjplLnRhcmdldC52YWx1ZX0pO1xuXHR9XG4gIFx0YWN0aXZhdGVNb2RhbE5ldygpe1xuICBcdFx0dGhpcy5zZXRTdGF0ZSh7bW9kYWw6XCJuZXdcIn0pO1xuXHRcdHRoaXMuc2V0U3RhdGUoe21vZGFsUHJpb3JpdHk6Jyd9KTtcblx0XHR0aGlzLnNldFN0YXRlKHttb2RhbERlc2NyaXB0aW9uOicnfSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7bW9kYWxUaXRsZTonJ30pO1xuICBcdFx0JCgnIycrdGhpcy5tb2RhbElkKS5tb2RhbCgpO1xuICBcdH1cbiAgXHRhY3RpdmF0ZU1vZGFsRWRpdChpc3N1ZSl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7bW9kYWw6aXNzdWV9KTtcblx0XHR0aGlzLnNldFN0YXRlKHttb2RhbFByaW9yaXR5Omlzc3VlLnByaW9yaXR5fSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7bW9kYWxEZXNjcmlwdGlvbjppc3N1ZS5pc3N1ZX0pO1xuXHRcdHRoaXMuc2V0U3RhdGUoe21vZGFsVGl0bGU6aXNzdWUudGl0bGV9KTtcblx0XHR0aGlzLnNldFN0YXRlKHttb2RhbE5hbWU6aXNzdWUubmFtZX0pO1xuICBcdFx0JCgnIycrdGhpcy5tb2RhbElkKS5tb2RhbCgpO1xuICBcdH1cbiAgXHRpc3N1ZUNoYW5nZWQoKXtcblxuXHRcdHRoaXMuc2V0U3RhdGUoe2lzc3Vlczp0aGlzLmlzc3VlVG9vbC5pdGVtc30pO1xuXHR9XG4gIFx0c3VibWl0SXNzdWUoZSl7XG4gIFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHR2YXIgbmV3SXRlbT17XG5cdFx0XHR0aXRsZTp0aGlzLnN0YXRlLm1vZGFsVGl0bGUsXG5cdFx0XHRpc3N1ZTp0aGlzLnN0YXRlLm1vZGFsRGVzY3JpcHRpb24sXG5cdFx0XHRwcmlvcml0eTp0aGlzLnN0YXRlLm1vZGFsUHJpb3JpdHksXG5cdFx0XHR2aW5leWFyZDp0aGlzLnByb3BzLmxvY2F0aW9uLFxuXHRcdFx0d29ya19vcmRlcjp0aGlzLnByb3BzLndvcmtvcmRlclxuXHRcdH1cblx0XHRpZih0aGlzLnN0YXRlLm1vZGFsPT1cIm5ld1wiKXtcblx0XHRcdHRoaXMuaXNzdWVUb29sLmNyZWF0ZShuZXdJdGVtLGZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0XHRwcy5zdWNjZXNzQWxlcnQoXCJJc3N1ZSBcIiAraXRlbS50aXRsZSsgXCIgY3JlYXRlZC5cIilcblx0XHRcdH0pO1xuXHRcdH1lbHNle1xuXHRcdFx0bmV3SXRlbS5uYW1lPXRoaXMuc3RhdGUubW9kYWxOYW1lO1xuXHRcdFx0dGhpcy5pc3N1ZVRvb2wudXBkYXRlKG5ld0l0ZW0sZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdHBzLnN1Y2Nlc3NBbGVydChcIklzc3VlIFwiICtpdGVtLnRpdGxlK1wiIHVwZGF0ZWQuXCIpXG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0Ly9jbG9zZSBtb2RhbFxuXHRcdCQoJyMnK3RoaXMubW9kYWxJZCkubW9kYWwoJ3RvZ2dsZScpO1xuXHR9XG5cblxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB0aXRsZT1cIndlbGNvbWVcIjtcblx0XHR2YXIgbWFpbkNsYXNzPXtcblx0XHRcdCdDb21wbGV0ZSc6J3BhbmVsLXN1Y2Nlc3MnLFxuXHRcdFx0J0luY29tcGxldGUnOidwYW5lbC1kYW5nZXInLFxuXHRcdFx0J1BlbmRpbmcnOidwYW5lbC1kZWZhdWx0Jyxcblx0XHRcdCdTdGFydGVkJzoncGFuZWwtd2FybmluZydcblx0XHR9W3RoaXMucHJvcHMuc3RhdHVzXTtcblx0XHRtYWluQ2xhc3MgPSBtYWluQ2xhc3MgKyBcIiBwYW5lbCB3b3Jrb3JkZXJcIjtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nY29sLW1kLTQgY29sLXNtLTQnPlxuXHRcdFx0XHQ8TW9kYWwgXG5cdFx0XHRcdFx0aWQ9e3RoaXMubW9kYWxJZH0gXG5cdFx0XHRcdFx0c3VibWl0VGV4dD1cIlN1Ym1pdFwiIFxuXHRcdFx0XHRcdHRpdGxlPVwiQ3JlYXRlIElzc3VlIEZvclwiXG5cdFx0XHRcdFx0c3VibWl0PXt0aGlzLnN1Ym1pdElzc3VlfT5cblxuXHRcdFx0XHRcdFx0PGZpZWxkc2V0PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHRcdFx0XHRcdFx0XHQ8bGFiZWw+SXNzdWUgVGl0bGU8L2xhYmVsPlxuXHRcdFx0XHRcdFx0XHRcdDxpbnB1dCBcblx0XHRcdFx0XHRcdFx0XHRcdHR5cGU9XCJ0ZXh0XCIgXG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBcblx0XHRcdFx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwiSXNzdWUgVGl0bGVcIiBcblx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlPXt0aGlzLnN0YXRlLm1vZGFsVGl0bGV9IFxuXHRcdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMubW9kYWxUaXRsZUNoYW5nZX1cblx0XHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRcdFx0PGxhYmVsPlByaW9yaXR5PC9sYWJlbD5cblx0XHRcdFx0XHRcdFx0XHQ8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHZhbHVlPXt0aGlzLnN0YXRlLm1vZGFsUHJpb3JpdHl9IG9uQ2hhbmdlPXt0aGlzLm1vZGFsUHJpb3JpdHlDaGFuZ2UuYmluZCh0aGlzKX0+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8b3B0aW9uPkxvdzwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0XHRcdFx0PG9wdGlvbj5NZWRpdW08L29wdGlvbj5cblx0XHRcdFx0XHRcdFx0XHRcdDxvcHRpb24+SGlnaDwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0XHRcdFx0PG9wdGlvbj5Dcml0aWNhbDwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0XHRcdDwvc2VsZWN0PlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRcdCAgXHQ8bGFiZWw+SXNzdWUgRGV0YWlsczo8L2xhYmVsPlxuXHRcdFx0XHRcdFx0XHQgIFx0PHRleHRhcmVhIFxuXHRcdFx0XHRcdFx0XHQgIFx0XHRjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBcblx0XHRcdFx0XHRcdFx0ICBcdFx0cm93cz1cIjNcIiBcblx0XHRcdFx0XHRcdFx0ICBcdFx0cGxhY2Vob2xkZXI9XCJJc3N1ZSBEZXRhaWxzXCIgXG5cdFx0XHRcdFx0XHRcdCAgXHRcdHZhbHVlPXt0aGlzLnN0YXRlLm1vZGFsRGVzY3JpcHRpb259XG5cdFx0XHRcdFx0XHRcdCAgXHRcdG9uQ2hhbmdlPXt0aGlzLm1vZGFsRGVzY3JpcHRpb25DaGFuZ2V9XG5cdFx0XHRcdFx0XHRcdCAgXHQ+PC90ZXh0YXJlYT5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8L2ZpZWxkc2V0PlxuXHRcdFx0XHQ8L01vZGFsPlxuXHRcdFx0PGRpdiBpZD1cIlwiIGNsYXNzTmFtZT17bWFpbkNsYXNzfT5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYW5lbC1oZWFkaW5nXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cblx0XHRcdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJwYW5lbC10aXRsZSBjb2wteHMtMTBcIj5cblx0XHRcdFx0XHRcdFx0PGEgY2xhc3NOYW1lPVwiZmxvYXQtbGVmdFwiIGhyZWY9e3RoaXMucHJvcHMubG9jYXRpb25fcm91dGV9Pnt0aGlzLnByb3BzLmxvY2F0aW9ufTwvYT5cblx0XHRcdFx0XHRcdDwvaDM+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0yIGNyZWF0ZS1pc3N1ZS1oZWFkZXItYnV0dG9uLWNvbnRhaW5lclwiID5cblxuXG5cdFx0XHRcdFx0XHRcdDxDcmVhdGVJc3N1ZVxuXHRcdFx0XHRcdFx0XHRcdGlzc3Vlcz17dGhpcy5zdGF0ZS5pc3N1ZXN9XG5cdFx0XHRcdFx0XHRcdFx0YWN0aXZhdGVNb2RhbE5ldz17dGhpcy5hY3RpdmF0ZU1vZGFsTmV3fVxuXHRcdFx0XHRcdFx0XHRcdGFjdGl2YXRlTW9kYWxFZGl0PXt0aGlzLmFjdGl2YXRlTW9kYWxFZGl0fVxuXHRcdFx0XHRcdFx0XHRcdHdvcmtvcmRlcj17dGhpcy5wcm9wcy53b3Jrb3JkZXJ9XG5cblx0XHRcdFx0XHRcdFx0Lz5cblxuXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFxuXG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWJvZHlcIj5cblx0XHRcdFx0XHQ8ZGl2Pnt0aGlzLnByb3BzLnR5cGV9PC9kaXY+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWxcIj5TdGF0dXM8L2xhYmVsPlxuXHRcdFx0XHRcdDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIHN0YXR1c1wiIHZhbHVlPXt0aGlzLnByb3BzLnN0YXR1c30gb25DaGFuZ2U9e3RoaXMuc3RhdHVzQ2hhbmdlfT5cblx0XHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9XCJQZW5kaW5nXCI+UGVuZGluZzwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIlN0YXJ0ZWRcIj5TdGFydGVkPC9vcHRpb24+XG5cdFx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPVwiQ29tcGxldGVcIj5Db21wbGV0ZTwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIkluY29tcGxldGVcIj5JbmNvbXBsZXRlPC9vcHRpb24+XG5cdFx0XHRcdFx0PC9zZWxlY3Q+XG5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoZWNrX2JveGVzXCI+XG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHRoaXMucHJvcHMudGFza3MubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblx0XHRcdFx0XHRcdFx0XHR2YXIgY2hlY2tlZD1pdGVtLnN0YXR1cz90cnVlOmZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiAoPFRhc2tDaGVjayBrZXk9e2luZGV4fSBpbmRleD17aW5kZXh9IGxhYmxlPXtpdGVtLnRhc2t9IGNoZWNrZWQ9e2NoZWNrZWR9IHRhc2tDaGVja2VkPXt0aGlzLnRhc2tDaGVja2VkfS8+KTtcblx0XHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRcdDxhIGNsYXNzTmFtZT1cIlwiIGhyZWY9e3RoaXMucHJvcHMucm91dGV9Pk1vcmUgSW5mb3JtYXRpb248L2E+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cblxuXG4iLCIvKiBmb3JtcyAqL1xuLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5zdWJtaXQ9dGhpcy5zdWJtaXQuYmluZCh0aGlzKTtcblx0fVxuXHRzdWJtaXQoZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMucHJvcHMuc3VibWl0KGUpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHZhciBmb3JtPVtdO1xuXHRcdHZhciBmb3JtVHlwZXM9e1xuXHRcdFx0c2VsZWN0XHQ6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHR2YXIgdmFsdWUgPSAoaXRlbS52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0udmFsdWU7XG5cdFx0XHRcdHZhciBsYWJsZSA9IChpdGVtLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5sYWJsZTtcblx0XHRcdFx0dmFyIG9wdGlvbnMgPSAoaXRlbS5vcHRpb25zID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5vcHRpb25zO1xuXHRcdFx0XHR2YXIgY2xhc3NOYW1lID0gKGl0ZW0uY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5jbGFzc05hbWU7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PFNlbGVjdFxuXHRcdFx0XHRcdFx0a2V5PXt0aGlzLnByb3BzLmlkK2luZGV4fSBcblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0bGFibGU9e2xhYmxlfVxuXHRcdFx0XHRcdFx0b3B0aW9ucz17b3B0aW9uc31cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0aW5wdXQgXHQ6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHR2YXIgdHlwZSA9IChpdGVtLnR5cGUgPT09IHVuZGVmaW5lZCkgPyBcInRleHRcIjogaXRlbS50eXBlO1xuXHRcdFx0XHR2YXIgdmFsdWUgPSAoaXRlbS52YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0udmFsdWU7XG5cdFx0XHRcdHZhciBwbGFjZWhvbGRlciA9IChpdGVtLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5wbGFjZWhvbGRlcjtcblx0XHRcdFx0dmFyIGxhYmxlID0gKGl0ZW0ubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmxhYmxlO1xuXHRcdFx0XHR2YXIgY2xhc3NOYW1lID0gKGl0ZW0uY2xhc3NOYW1lID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS5jbGFzc05hbWU7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PElucHV0XG5cdFx0XHRcdFx0XHRrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9IFxuXHRcdFx0XHRcdFx0dHlwZT17dHlwZX1cblx0XHRcdFx0XHRcdHZhbHVlPXt2YWx1ZX1cblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cblx0XHRcdFx0XHRcdGxhYmxlPXtsYWJsZX1cblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuXHRcdFx0XHRcdFx0aW5wdXRDaGFuZ2VkPXtmdW5jdGlvbihlKXt2YXIgdGVzdDt9fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRsYWJsZSBcdDogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHJldHVybiAoICBcbiAgICBcdFx0XHRcdDxsYWJlbCBrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9ID57aXRlbS5sYWJsZX08L2xhYmVsPlxuXG4gICAgXHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdHJhZGlvXHQ6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHRyZXR1cm4gKDxkaXY+PC9kaXY+KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdHRleHRhcmVhOiBmdW5jdGlvbihpdGVtLGluZGV4KXtcblx0XHRcdFx0cmV0dXJuICg8ZGl2PjwvZGl2Pik7XG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHRoZWFkZXI6IGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuXHRcdFx0XHRyZXR1cm4oPGgzIGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH0gPntpdGVtLmxhYmxlfTwvaDM+KVxuXHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0ZGF0ZTogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IChpdGVtLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS52YWx1ZTtcblx0XHRcdFx0dmFyIGxhYmxlID0gKGl0ZW0ubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmxhYmxlO1xuXHRcdFx0XHR2YXIgcGxhY2Vob2xkZXIgPSAoaXRlbS5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucGxhY2Vob2xkZXI7XG5cdFx0XHRcdHZhciBjbGFzc05hbWUgPSAoaXRlbS5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmNsYXNzTmFtZTtcblx0XHRcdFx0cmV0dXJuKFxuXHRcdFx0XHRcdDxEYXRlSW5wdXRcblx0XHRcdFx0XHRcdGtleT17dGhpcy5wcm9wcy5pZCtpbmRleH0gXG5cdFx0XHRcdFx0XHR2YWx1ZT17dmFsdWV9XG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG5cdFx0XHRcdFx0XHRsYWJsZT17bGFibGV9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e2NsYXNzTmFtZX1cblx0XHRcdFx0XHRcdGlucHV0Q2hhbmdlZD17ZnVuY3Rpb24oZSl7aXRlbS5vbkNoYW5nZShlKX19XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0KTtcblx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdGF1dG9Db21wbGV0ZTogZnVuY3Rpb24oaXRlbSxpbmRleCl7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IChpdGVtLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogaXRlbS52YWx1ZTtcblx0XHRcdFx0dmFyIGxhYmxlID0gKGl0ZW0ubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmxhYmxlO1xuXHRcdFx0XHR2YXIgcGxhY2Vob2xkZXIgPSAoaXRlbS5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IGl0ZW0ucGxhY2Vob2xkZXI7XG5cdFx0XHRcdHZhciBjbGFzc05hbWUgPSAoaXRlbS5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiBpdGVtLmNsYXNzTmFtZTtcblx0XHRcdFx0cmV0dXJuKFxuXHRcdFx0XHRcdDxBd2Vzb21wbGV0ZUlucHV0XG5cdFx0XHRcdFx0XHRrZXk9e3RoaXMucHJvcHMuaWQraW5kZXh9XG5cdFx0XHRcdFx0XHRkb2N0eXBlPXtpdGVtLmRvY3R5cGV9XG5cdFx0XHRcdFx0XHRkb2N2YWx1ZT17aXRlbS5kb2N2YWx1ZX1cblx0XHRcdFx0XHRcdGRvY2xhYmxlPXtpdGVtLmRvY2xhYmxlfVxuXHRcdFx0XHRcdFx0dmFsdWU9e3ZhbHVlfVxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuXHRcdFx0XHRcdFx0bGFibGU9e2xhYmxlfVxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXtjbGFzc05hbWV9XG5cdFx0XHRcdFx0XHRpbnB1dENoYW5nZWQ9e2Z1bmN0aW9uKGUpe2l0ZW0ub25DaGFuZ2UoZSl9fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9LmJpbmQodGhpcylcblx0XHR9XG5cdFx0dGhpcy5wcm9wcy5maWVsZHMubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblxuXHRcdFx0Zm9ybS5wdXNoKGZvcm1UeXBlc1tpdGVtLmZpZWxkXShpdGVtLGluZGV4KSk7XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0XHQvL2Zvcih2YXIgeD0wOyB4IDwgdGhpcy5wcm9wcy5mZWlsZHMubGVuZ3RoIHgrKzsgKVxuXHRcdHZhciBjbGFzc05hbWUgPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcInJlYWN0LWZvcm1cIjogXCJmb3JtLWhvcml6b250YWwgcmVhY3QtZm9ybSBcIit0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8Zm9ybSBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG5cdFx0XHRcdDxmaWVsZHNldD5cblx0XHRcdFx0e2Zvcm19XG5cdFx0XHRcdHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9XG5cdFx0XHRcdDwvZmllbGRzZXQ+XG5cdFx0XHQ8L2Zvcm0+XG5cdFx0KTtcblx0fVxufVxuXG5cblxuZXhwb3J0IGNsYXNzIFNlbGVjdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLmlucHV0Q2hhbmdlPXRoaXMuaW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcblxuXHR9XG5cdGlucHV0Q2hhbmdlKGUpe1xuXHRcdHRoaXMucHJvcHMuaW5wdXRDaGFuZ2VkKCk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLmxhYmxlID0gKHRoaXMucHJvcHMubGFibGUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLmxhYmxlO1xuXHRcdHRoaXMub3B0aW9ucyA9ICh0aGlzLnByb3BzLm9wdGlvbnMgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLm9wdGlvbnM7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jb250cm9sXCI6IFwiZm9ybS1jb250cm9sXCIgK3RoaXMucHJvcHMuY2xhc3NOYW1lO1xuXHRcdHZhciBvcHRpb25zPVtdO1xuXHRcdHZhciBvdXRwdXQ9XCJcIjtcblxuXG5cdFx0dGhpcy5vcHRpb25zLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCl7XG5cdFx0XHR2YXIgZ3JvdXA9W107XG5cdFx0XHRpZihpdGVtLmdyb3VwICE9PSB1bmRlZmluZWQpe1xuXHRcdFx0XHRpdGVtLm9wdGlvbnMubWFwKGZ1bmN0aW9uKGlubmVySXRlbSxpbmRleCl7XG5cdFx0XHRcdFx0Z3JvdXAucHVzaCggPG9wdGlvbiBrZXk9e2l0ZW0uZ3JvdXAraW5kZXh9PiB7aW5uZXJJdGVtfSA8L29wdGlvbj4pXG5cdFx0XHRcdH0pXG5cdFx0XHRcdG9wdGlvbnMucHVzaCg8b3B0Z3JvdXAga2V5PXtpdGVtLmdyb3VwfSBsYWJlbD17aXRlbS5ncm91cH0+IHtncm91cH08L29wdGdyb3VwPik7XG5cblx0XHRcdH1cblx0XHRcdGVsc2V7XG5cdFx0XHRcdG9wdGlvbnMucHVzaCggPG9wdGlvbiBrZXk9e2luZGV4fT4ge2l0ZW19IDwvb3B0aW9uPilcblx0XHRcdH1cblxuXHRcdFx0XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRcblxuXHRcdHZhciBzZWxlY3Q9KFxuXHRcdFx0PHNlbGVjdCBjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfSB2YWx1ZT17dGhpcy52YWx1ZX0+XG5cdFx0XHRcdHtvcHRpb25zfVxuXHRcdFx0PC9zZWxlY3Q+XG5cdFx0KTtcblxuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy5sYWJsZSA9PVwiXCIpe1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgXCI+XG5cdFx0ICAgIFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbFwiPnt0aGlzLnByb3BzLmxhYmxlfTwvbGFiZWw+XG5cdFx0ICAgIFx0XHQ8ZGl2PlxuXHRcdCAgICBcdFx0e3NlbGVjdH1cblx0XHQgICAgXHRcdDwvZGl2PlxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHQgICAgICBcdFx0e3NlbGVjdH1cblx0XHQgIFx0XHQ8L2Rpdj5cblx0XHQgIFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIElucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuaW5wdXRDaGFuZ2U9dGhpcy5pbnB1dENoYW5nZS5iaW5kKHRoaXMpO1xuXG5cdH1cblx0aW5wdXRDaGFuZ2UoZSl7XG5cdFx0dGhpcy5wcm9wcy5pbnB1dENoYW5nZWQoKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnR5cGUgPSAodGhpcy5wcm9wcy50eXBlID09PSB1bmRlZmluZWQpID8gXCJ0ZXh0XCI6IHRoaXMucHJvcHMudHlwZTtcblx0XHR0aGlzLnZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHRoaXMucGxhY2Vob2xkZXIgPSAodGhpcy5wcm9wcy5wbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXI7XG5cdFx0dGhpcy5sYWJsZSA9ICh0aGlzLnByb3BzLmxhYmxlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy5sYWJsZTtcblx0XHR2YXIgb3V0cHV0PVwiXCI7XG5cdFx0dGhpcy5jbGFzc05hbWU9ICh0aGlzLnByb3BzLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSA/IFwiZm9ybS1jb250cm9sXCI6IFwiZm9ybS1jb250cm9sIFwiICt0aGlzLnByb3BzLmNsYXNzTmFtZTtcblx0XHR2YXIgaW5wdXQ9KCA8aW5wdXQgdHlwZT17dGhpcy50eXBlfSBjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfSBwbGFjZWhvbGRlcj17dGhpcy5wbGFjZWhvbGRlcn0gdmFsdWU9e3RoaXMudmFsdWV9IC8+KTtcblxuXHRcdGlmICh0aGlzLnByb3BzLmxhYmxlICE9PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy5sYWJsZSA9PVwiXCIpe1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgXCI+XG5cdFx0ICAgIFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbFwiPnt0aGlzLnByb3BzLmxhYmxlfTwvbGFiZWw+XG5cdFx0ICAgIFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIlwiPlxuXHRcdCAgICAgIFx0XHRcdHtpbnB1dH1cblx0XHQgICAgXHRcdDwvZGl2PlxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0b3V0cHV0ID0gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHQgICAgICBcdFx0e2lucHV0fVxuXHRcdCAgXHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuZXhwb3J0IGNsYXNzIERhdGVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLmlucHV0Q2hhbmdlPXRoaXMuaW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcblx0XHR0aGlzLmRhdGVJbml0PXRoaXMuZGF0ZUluaXQuYmluZCh0aGlzKTtcblxuXHR9XG5cdGlucHV0Q2hhbmdlKGUpe1xuXHRcdHRoaXMucHJvcHMuaW5wdXRDaGFuZ2VkKCk7XG5cdH1cblx0ZGF0ZUluaXQoKXtcblx0XHQkKCcuaW5wdXQtZ3JvdXAuZGF0ZSAuZGF0ZXBpY2snKS5kYXRlcGlja2VyKHtcblx0XHQgICAgdG9kYXlCdG46IFwibGlua2VkXCIsXG5cdFx0ICAgIG9yaWVudGF0aW9uOiBcImJvdHRvbSByaWdodFwiLFxuXHRcdCAgICBhdXRvY2xvc2U6IHRydWUsXG5cdFx0ICAgIHRvZGF5SGlnaGxpZ2h0OiB0cnVlXG5cdFx0fSkub24oJ2NoYW5nZURhdGUnLCBmdW5jdGlvbihlKSB7XG5cdFx0XHR2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2lucHV0JywgeyBidWJibGVzOiB0cnVlIH0pO1xuXHRcdFx0ZS50YXJnZXQuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cdFx0fSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLnBsYWNlaG9sZGVyID0gKHRoaXMucHJvcHMucGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnBsYWNlaG9sZGVyO1xuXHRcdHRoaXMubGFibGUgPSAodGhpcy5wcm9wcy5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMubGFibGU7XG5cdFx0dmFyIG91dHB1dD1cIlwiO1xuXHRcdHRoaXMuY2xhc3NOYW1lPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcImZvcm0tY29udHJvbCBkYXRlcGlja1wiOiBcImZvcm0tY29udHJvbCBkYXRlcGljayBcIiArdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0dmFyIGlucHV0PSggXG5cdFx0XHQ8aW5wdXRcblx0XHRcdFx0cmVmPXt0aGlzLmRhdGVJbml0fSBcblx0XHRcdFx0dHlwZT1cInRleHRcIlxuXHRcdFx0XHRjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfVxuXHRcdFx0XHRwbGFjZWhvbGRlcj17dGhpcy5wbGFjZWhvbGRlcn0gIFxuXHRcdFx0XHR2YWx1ZT17dGhpcy52YWx1ZX0gXG5cdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnByb3BzLmlucHV0Q2hhbmdlZH1cblx0XHRcdFx0Lz5cblxuXHRcdCk7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkIHx8IHRoaXMucHJvcHMubGFibGUgPT1cIlwiKXtcblx0XHRcdG91dHB1dCA9IChcblx0XHQgIFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHQgIFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFibGV9PC9sYWJlbD5cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAgZGF0ZVwiPlxuXHRcdFx0XHRcdFx0e2lucHV0fVxuXHRcdFx0XHQgIFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cC1hZGRvblwiPlxuXHRcdFx0XHQgIFx0XHRcdDxpIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tdGhcIj48L2k+XG5cdFx0XHRcdCAgXHRcdDwvc3Bhbj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0ICBcdCk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRvdXRwdXQgPSAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwIGRhdGVcIj5cblxuXHRcdFx0XHRcdFx0e2lucHV0fVxuXHRcdFx0XHQgIFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cC1hZGRvblwiPlxuXHRcdFx0XHQgIFx0XHRcdDxpIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tdGhcIj48L2k+XG5cdFx0XHRcdCAgXHRcdDwvc3Bhbj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdCAgXHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuZXhwb3J0IGNsYXNzIEF3ZXNvbXBsZXRlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cblx0XHQvKiAgIERvIHRoZSBiaW5kIHRoaW5nICAqL1xuXHRcdHRoaXMuY3JlYXRlTGlzdD10aGlzLmNyZWF0ZUxpc3QuYmluZCh0aGlzKTtcblx0XHR0aGlzLmRvY0NoYW5nZWQ9dGhpcy5kb2NDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jb21wb25lbnREaWRNb3VudD10aGlzLmNvbXBvbmVudERpZE1vdW50LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5pbnB1dENoYW5nZT10aGlzLmlucHV0Q2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5hdXRvY29tcGxldGU9dGhpcy5hdXRvY29tcGxldGUuYmluZCh0aGlzKTtcblx0XHQvL3RoaXMud29ya29yZGVyT2JqPXRoaXMub25TdGF0dXNDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0LyogICAgICAgICAgZW5kICAgICAgICAgICovXG5cdFx0dGhpcy5pdGVtbGlzdD1bXTtcblx0XHR0aGlzLnN0YXRlPXtpdGVtbGlzdDpbXX07XG5cdFx0dGhpcy5faXNNb3VudGVkPWZhbHNlO1xuXHRcdHZhciBhcmdzPXt9O1xuXHRcdHZhciBvcHRpb25zPXtkb2N0eXBlOnRoaXMucHJvcHMuZG9jdHlwZX07XG5cdFx0dGhpcy5saXN0VG9vbCA9IG5ldyBwcy5hcGlUb29sKHt9LCBvcHRpb25zICx0aGlzLmRvY0NoYW5nZWQpO1xuXHRcdGlmICh0aGlzLmxpc3RUb29sLml0ZW1zPT09dW5kZWZpbmVkIHx8dGhpcy5saXN0VG9vbC5pdGVtcz09PSAwIHx8dGhpcy5saXN0VG9vbC5pdGVtcz09PW51bGwgKXtcblx0XHR9ZWxzZXtcblx0XHRcdHRoaXMuc3RhdGUubGlzdD10aGlzLmxpc3RUb29sLml0ZW1zO1xuXHRcdH1cblxuXHRcdHRoaXMuY3JlYXRlTGlzdCgpO1xuXHR9XG5cdGRvY0NoYW5nZWQoKXtcblx0XHR0aGlzLmNyZWF0ZUxpc3QoKTtcblx0fVxuXHRjb21wb25lbnREaWRNb3VudCgpe1xuXHRcdHRoaXMuX2lzTW91bnRlZD10cnVlO1xuXG5cdH1cblx0Y3JlYXRlTGlzdCgpe1xuXHRcdHRoaXMuaXRlbWxpc3Q9W107XG5cdFx0aWYgKHRoaXMucHJvcHMuZG9jbGFibGUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmxpc3RUb29sLml0ZW1zICE9PSB1bmRlZmluZWQpe1xuXHRcdFx0Zm9yKGxldCBpdGVtIG9mIHRoaXMubGlzdFRvb2wuaXRlbXMpe1xuXHRcdFx0XHR2YXIgdGVtcCA9W2l0ZW1bdGhpcy5wcm9wcy5kb2NsYWJsZV0saXRlbVt0aGlzLnByb3BzLmRvY3ZhbHVlXV07XG5cdFx0XHRcdHRoaXMuaXRlbWxpc3QucHVzaCh0ZW1wKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSBpZih0aGlzLmxpc3RUb29sLml0ZW1zICE9PSB1bmRlZmluZWQpe1xuXHRcdFx0Zm9yKGxldCBpdGVtIG9mIHRoaXMubGlzdFRvb2wuaXRlbXMpe1xuXHRcdFx0XHR0aGlzLml0ZW1saXN0LnB1c2goaXRlbVt0aGlzLnByb3BzLmRvY3ZhbHVlXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHRoaXMuX2lzTW91bnRlZCl7XG5cdFx0XHQvL3RoaXMuc2V0U3RhdGUoe2l0ZW1saXN0OnRoaXMuc3RhdGUuaXRlbWxpc3R9KTtcblx0XHR9XG5cdFx0JChkb2N1bWVudCkudHJpZ2dlcignbGlzdExvYWQnICsgdGhpcy5wcm9wcy5kb2N0eXBlKTtcblx0fVxuXG5cdGF1dG9jb21wbGV0ZShpbnB1dCl7XG5cdFx0dmFyIGNvbmZpZz0ge1xuXHRcdFx0XHRtaW5DaGFyczogMCxcblx0XHRcdFx0bWF4SXRlbXM6IDk5LFxuXHRcdFx0XHRhdXRvRmlyc3Q6IHRydWUsXG5cdFx0XHRcdGZpbHRlcjogQXdlc29tcGxldGUuRklMVEVSX1NUQVJUU1dJVEhcblx0XHRcdH1cblx0XHRpZih0aGlzLnByb3BzLmRvY2xhYmxlICE9PSB1bmRlZmluZWQgKXtcblx0XHRcdGNvbmZpZy5pdGVtPSBmdW5jdGlvbihpdGVtLCBpbnB1dCkge1xuXHRcdFx0XHR2YXIgZCA9IGl0ZW07XG5cdFx0XHRcdHZhciBodG1sID0gXCI8c3Bhbj5cIiArIF9fKGl0ZW0ubGFiZWwpKyBcIjwvc3Bhbj48YnI+PHNwYW4+PHNtYWxsPlwiK2l0ZW0udmFsdWUrXCI8L3NtYWxsPjwvc3Bhbj5cIjtcblx0XHRcdFx0cmV0dXJuICQoJzxsaT48L2xpPicpXG5cdFx0XHRcdFx0LmRhdGEoJ2l0ZW0uYXV0b2NvbXBsZXRlJywgaXRlbSlcblx0XHRcdFx0XHQuaHRtbCgnPGE+PHA+JyArIGh0bWwgKyAnPC9wPjwvYT4nKVxuXHRcdFx0XHRcdC5nZXQoMCk7XG5cdFx0XHR9XG5cblx0XHR9ZWxzZXtcblx0XHRcdGNvbmZpZy5pdGVtPWZ1bmN0aW9uKGl0ZW0sIGlucHV0KSB7XG5cdFx0XHRcdHZhciBkID0gaXRlbTtcblx0XHRcdFx0dmFyIGh0bWwgPSBcIjxzcGFuPlwiICsgX18oaXRlbSkrIFwiPC9zcGFuPlwiO1xuXHRcdFx0XHRyZXR1cm4gJCgnPGxpPjwvbGk+Jylcblx0XHRcdFx0XHQuZGF0YSgnaXRlbS5hdXRvY29tcGxldGUnLCBpdGVtKVxuXHRcdFx0XHRcdC5odG1sKCc8YT48cD4nICsgaHRtbCArICc8L3A+PC9hPicpXG5cdFx0XHRcdFx0LmdldCgwKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5hdyA9IG5ldyBBd2Vzb21wbGV0ZShpbnB1dCxjb25maWcpO1xuXHRcdGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXG5cdFx0XHQnYXdlc29tcGxldGUtc2VsZWN0Y29tcGxldGUnLFxuXHRcdFx0XHR0aGlzLmlucHV0Q2hhbmdlXG5cdFx0KTtcblx0XHQvLyAkKCcjcG9vJykuZm9jdXMoZnVuY3Rpb24oKXtcblx0XHQvLyBcdFx0dGhpcy5hdy5vcGVuKCk7XG5cdFx0Ly8gfS5iaW5kKHRoaXMpKTtcblx0XHQvL2NvbnNvbGUubG9nKClcblx0XHQvLyBpbnB1dC50YXJnZXQub25mb2N1cyggZnVuY3Rpb24oKSB7XG5cdFx0Ly8gXHRjb25zb2xlLmxvZyhmb2N1cyk7XG5cdFx0Ly8gXHRpZiAoYXcudWwuaGFzQXR0cmlidXRlKCdoaWRkZW4nKSkge1xuXHRcdC8vIFx0XHRhdy5vcGVuKCk7XG5cdFx0Ly8gXHR9XG5cdFx0Ly8gXHRlbHNlIHtcblx0XHQvLyBcdFx0YXcuY2xvc2UoKTtcblx0XHQvLyBcdH1cblx0XHQvLyB9KTtcblx0XHQvLyBpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwib25ibHVyXCIsIGZ1bmN0aW9uKCkge1xuXHRcdC8vIFx0aWYgKGF3LnVsLmNoaWxkTm9kZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0Ly8gXHRcdGF3Lm1pbkNoYXJzID0gMDtcblx0XHQvLyBcdFx0YXcuZXZhbHVhdGUoKTtcblx0XHQvLyBcdH1cblx0XHQvLyBcdGVsc2Uge1xuXHRcdC8vIFx0XHRhdy5jbG9zZSgpO1xuXHRcdC8vIFx0fVxuXHRcdC8vIH0pO1xuXG5cdFx0dGhpcy5hdy5saXN0PXRoaXMuaXRlbUxpc3Q7XG5cdFx0JChkb2N1bWVudCkuYmluZCgnbGlzdExvYWQnICsgdGhpcy5wcm9wcy5kb2N0eXBlLGZ1bmN0aW9uKCl7XG5cdFx0XHR0aGlzLmF3Lmxpc3Q9dGhpcy5pdGVtbGlzdDtcblx0XHR9LmJpbmQodGhpcykpO1xuXHR9XG5cdGlucHV0Q2hhbmdlKGUpe1xuXHRcdHRoaXMucHJvcHMuaW5wdXRDaGFuZ2VkKGUpO1xuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy50eXBlID0gKHRoaXMucHJvcHMudHlwZSA9PT0gdW5kZWZpbmVkKSA/IFwidGV4dFwiOiB0aGlzLnByb3BzLnR5cGU7XG5cdFx0dGhpcy52YWx1ZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpID8gXCJcIjogdGhpcy5wcm9wcy52YWx1ZTtcblx0XHR0aGlzLnBsYWNlaG9sZGVyID0gKHRoaXMucHJvcHMucGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCkgPyBcIlwiOiB0aGlzLnByb3BzLnBsYWNlaG9sZGVyO1xuXHRcdHRoaXMubGFibGUgPSAodGhpcy5wcm9wcy5sYWJsZSA9PT0gdW5kZWZpbmVkKSA/IFwiXCI6IHRoaXMucHJvcHMubGFibGU7XG5cdFx0dmFyIG91dHB1dD1cIlwiO1xuXHRcdHRoaXMuY2xhc3NOYW1lPSAodGhpcy5wcm9wcy5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkgPyBcImZvcm0tY29udHJvbCBhd2Vzb21wbGV0ZVwiOiBcImZvcm0tY29udHJvbCBhd2Vzb21wbGV0ZSBcIiArdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cdFx0dmFyIGlucHV0PSggPGlucHV0IFxuXHRcdFx0XHRcdHR5cGU9e3RoaXMudHlwZX0gXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPXt0aGlzLmNsYXNzTmFtZX0gXG5cdFx0XHRcdFx0cGxhY2Vob2xkZXI9e3RoaXMucGxhY2Vob2xkZXJ9IFxuXHRcdFx0XHRcdHJlZj17dGhpcy5hdXRvY29tcGxldGV9XG5cdFx0ICAgICAgICAgIFx0b25DaGFuZ2U9e3RoaXMuaW5wdXRDaGFuZ2V9IFxuXHRcdCAgICAgICAgICAvPik7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5sYWJsZSAhPT0gdW5kZWZpbmVkIHx8IHRoaXMucHJvcHMubGFibGUgPT1cIlwiKXtcblx0XHRcdG91dHB1dCA9IChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIFwiPlxuXHRcdCAgICBcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWxcIj57dGhpcy5wcm9wcy5sYWJsZX08L2xhYmVsPlxuXHRcdCAgICBcdFx0PGRpdiBjbGFzc05hbWU9XCJcIj5cblx0XHQgICAgICBcdFx0XHR7aW5wdXR9XG5cdFx0ICAgIFx0XHQ8L2Rpdj5cblx0XHQgIFx0XHQ8L2Rpdj5cblx0XHQgIFx0KTtcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdG91dHB1dCA9IChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG5cdFx0ICAgICAgXHRcdHtpbnB1dH1cblx0XHQgIFx0XHQ8L2Rpdj5cblx0XHQgIFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuXG4iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RhbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnN1Ym1pdD10aGlzLnN1Ym1pdC5iaW5kKHRoaXMpO1xuXHR9XG5cdHN1Ym1pdChlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5wcm9wcy5zdWJtaXQoZSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbCBmYWRlIHRleHQtbGVmdCBwYW5lbC1kZWZhdWx0XCIgaWQ9e3RoaXMucHJvcHMuaWR9IHRhYkluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCIgYXJpYS1sYWJlbGxlZGJ5PVwiZXhhbXBsZU1vZGFsTGFiZWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2dcIiByb2xlPVwiZG9jdW1lbnRcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XG5cdFx0XHRcdFx0XHRcdDxoNCBjbGFzc05hbWU9XCJtb2RhbC10aXRsZVwiIGlkPVwiZXhhbXBsZU1vZGFsTGFiZWxcIj57dGhpcy5wcm9wcy50aXRsZX08L2g0PlxuXHRcdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBkaXNwbGF5PVwibm9uZVwiIGNsYXNzTmFtZT1cImNsb3NlIGhpZGVcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPlxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxuXHRcdFx0XHRcdFx0XHRcdHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWZvb3RlclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tc2Vjb25kYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DbG9zZTwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0XHRcdDxidXR0b24gXG5cdFx0XHRcdFx0XHRcdFx0XHR0eXBlPVwic3VibWl0XCIgXG5cdFx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLnN1Ym1pdH0gXG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiA+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHt0aGlzLnByb3BzLnN1Ym1pdFRleHR9XG5cdFx0XHRcdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuXG4iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbi8vaW1wb3J0IERheXNXb3Jrb3JkZXJzIGZyb20gJy4uLy4uL3B1YmxpYy9qcy9tb2R1bGVzL2RheXNfd29ya29yZGVycy9EYXlzV29ya29yZGVycydcbmltcG9ydCBEYXlzVGltZXNoZWV0cyBmcm9tICcuLi8uLi9wdWJsaWMvanMvbW9kdWxlcy9kYXlzX3RpbWVzaGVldHMvRGF5c1RpbWVTaGVldHMnXG5cbi8vY29uc3QgYXBwPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJyk7XG5jb25zdCBhcHA9ICQoJyNhcHAnKVswXTtcbmNvbnN0IHRpbWVzaGVldHM9ICQoJyN0aW1lJylbMF07XG5cbmNsYXNzIFdvcmtQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXG5cdFx0LyogYmluZCBkaW5nIGRpbmcgKi9cblx0XHR0aGlzLm1haW5DbGlja2VkPXRoaXMubWFpbkNsaWNrZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLndvcmtvcmRlcnNDbGlja2VkPXRoaXMud29ya29yZGVyc0NsaWNrZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnRpbWVzaGVldENsaWNrZWQ9dGhpcy50aW1lc2hlZXRDbGlja2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5oYW5kZWxDbG9ja0luPXRoaXMuaGFuZGVsQ2xvY2tJbi5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuaGFuZGVsUm91dGU9dGhpcy5oYW5kZWxSb3V0ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuc3RhdGVVcGRhdGU9dGhpcy5zdGF0ZVVwZGF0ZS5iaW5kKHRoaXMpO1xuXHRcdFxuXG5cdFx0Ly9IYW5kZWwgVXNlciBsT2FkXG5cdFx0Ly8gaWYgKCBmcmFwcGUudXNlcl9pZCA9PSBcIkFkbWluaXN0cmF0b3JcIiApe1xuXHRcdC8vIFx0d2luZG93LmxvY2F0aW9uID0gXCIvZGVza1wiO1xuXHRcdC8vIH1cblx0XHQvLyBpZiAoIGZyYXBwZS51c2VyX2lkID09IFwiR2V1c3RcIil7XG5cdFx0Ly8gXHR3aW5kb3cubG9jYXRpb24gPSBcIi9sb2dpblwiO1xuXHRcdC8vIH1cblx0XHR0aGlzLmN1cnJlbnRVc2VyPXBzLmluaXRDdXJyZW50VXNlcigpO1xuXHRcdHRoaXMuY3VycmVudFVzZXIuZ2V0KHt9LGZ1bmN0aW9uKGl0ZW1zKXtcblx0XHRcdGlmKHRoaXMuY3VycmVudFVzZXIuaXRlbXMudXNlcm5hbWU9PVwiR3Vlc3RcIil7XG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbiA9IFwiL2xvZ2luXCI7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0JChkb2N1bWVudCkudHJpZ2dlcihcInVzZXJMb2FkZWRcIik7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coXCJhZnRlciBMb2FkXCIsdGhpcy5jdXJyZW50VXNlci5pdGVtcyk7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKHRoaXMpKTsgXG5cdFx0dGhpcy5zdGF0ZT17aXRlbXM6dGhpcy5jdXJyZW50VXNlci5pdGVtc307XG5cdFx0JChkb2N1bWVudCkuYmluZCgndXNlckxvYWRlZCcsdGhpcy5zdGF0ZVVwZGF0ZSk7XG5cblxuXHRcdC8vUm91dGluZ1xuXHRcdCQod2luZG93KS5vbihcImhhc2hjaGFuZ2VcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmhhbmRlbFJvdXRlKCk7XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0XHR2YXIgcm91dGUgPSB3aW5kb3cubG9jYXRpb24uaGFzaC5zbGljZSgxKTtcblx0XHRpZighcm91dGUpIHJvdXRlID0gXCIjbWFpblwiO1xuXHRcdHRoaXMuc3RhdGUucGFnZT1yb3V0ZTtcblx0XHRpZiAoIXdpbmRvdy5sb2NhdGlvbi5oYXNoKSB7XG5cdFx0XHR3aW5kb3cubG9jYXRpb24uaGFzaCA9IFwiI21haW5cIjtcblx0XHR9XG5cdFx0JCh3aW5kb3cpLnRyaWdnZXIoXCJoYXNoY2hhbmdlXCIpO1xuXG5cdH1cblx0Y29tcG9uZW50RGlkTW91bnQoKXtcblx0XHRcblx0fVxuXHRzdGF0ZVVwZGF0ZSgpe1xuXHRcdC8vYWxlcnQoXCJ1cGRhdGVcIik7XG5cdFx0dGhpcy5zdGF0ZS5pdGVtcz10aGlzLmN1cnJlbnRVc2VyLml0ZW1zO1xuXHRcdHRoaXMuc2V0U3RhdGUodGhpcy5zdGF0ZSk7XG5cblx0fVxuXHRoYW5kZWxSb3V0ZSgpe1xuXHRcdHZhciByb3V0ZSA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnNsaWNlKDEpO1xuXHRcdHZhciBwYWdlcz17XG5cdFx0XHRtYWluOnRoaXMubWFpbkNsaWNrZWQsXG5cdFx0XHR3b3Jrb3JkZXJzOnRoaXMud29ya29yZGVyc0NsaWNrZWQsXG5cdFx0XHR0aW1lc2hlZXQ6dGhpcy50aW1lc2hlZXRDbGlja2VkXG5cdFx0fVtyb3V0ZV0oKTtcblx0fVxuXHRoYW5kZWxDbG9ja0luKCl7XG5cblx0fVxuXHRtYWluQ2xpY2tlZCgpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe3BhZ2U6J21haW4nfSk7XG5cdH1cblx0d29ya29yZGVyc0NsaWNrZWQoKXtcblxuXHRcdHRoaXMuc2V0U3RhdGUoe3BhZ2U6J3dvcmtvcmRlcnMnfSk7XG5cblx0fVxuXHR0aW1lc2hlZXRDbGlja2VkKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7cGFnZTondGltZXNoZWV0J30pO1xuXG5cdH1cblx0Ly88QWZmaXhXcmFwcGVyIGNsYXNzTmFtZT1cInN0aWNreV9zdWJuYXYgdGV4dC1jZW50ZXJcIiAgb2Zmc2V0PXsxNDB9IGhlaWdodD1cIjQwcHhcIj48L0FmZml4V3JhcHBlcj5cblx0cmVuZGVyKCl7XG5cdFx0dmFyIG91dHB1dD0nJztcblx0XHRpZiAodGhpcy5zdGF0ZS5pdGVtcy51c2VybmFtZT09XCJHdWVzdFwifHx0aGlzLnN0YXRlLml0ZW1zLnVzZXJuYW1lPT1cIkFkbWluaXN0cmF0b3JcIil7XG5cdFx0XHRvdXRwdXQ9KDxoMz5HdWVzdCBPciBBZG1pbjwvaDM+KTtcblx0XHR9XG5cdFx0ZWxzZSBpZih0aGlzLnN0YXRlLml0ZW1zLmxlbmd0aD09PTApe1xuXHRcdFx0b3V0cHV0PSg8aDM+Tm8gVXNlciBEYXRhPC9oMz4pO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0b3V0cHV0PShcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYW5lbCB3aXRoLW5hdi10YWJzIHBhbmVsLXByaW1hcnlcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWhlYWRpbmdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJuYXYgbmF2LXRhYnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiYWN0aXZlXCI+PGEgaHJlZj1cIiNjbG9ja0luVGFiXCIgZGF0YS10b2dnbGU9XCJ0YWJcIj5NYWluPC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIjd29ya09yZGVyVGFiXCIgZGF0YS10b2dnbGU9XCJ0YWJcIj5Xb3JrIE9yZGVyczwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiI3RpbWVTaGVldFRhYlwiIGRhdGEtdG9nZ2xlPVwidGFiXCI+VGltZSBTaGVldHM8L2E+PC9saT5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWItY29udGVudFwiPlx0XHRcdFx0XG4gICAgICAgICAgICAgICAgICAgICAgICA8RGF5c1RpbWVzaGVldHMgXG5cdFx0XHRcdFx0XHRcdGRhdGU9e3RoaXMuc3RhdGUuaXRlbXMudG9kYXl9XG5cdFx0XHRcdFx0XHRcdGZ1bGxfbmFtZT17dGhpcy5zdGF0ZS5pdGVtcy5jdXJyZW50X3VzZXIuZnVsbF9uYW1lfVxuXHRcdFx0XHRcdFx0XHRwYWdlPXt0aGlzLnN0YXRlLnBhZ2V9XG5cdFx0XHRcdFx0XHRcdGNyZXc9e3RoaXMuc3RhdGUuaXRlbXMuY3Jld31cblx0XHRcdFx0XHRcdC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHJldHVybig8ZGl2PlxuXHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuKGZ1bmN0aW9uKCl7XG5cdGZyYXBwZS5yZWFkeShmdW5jdGlvbigpe1xuXHRcdFJlYWN0RE9NLnJlbmRlciggXG5cdFx0PFdvcmtQYWdlIC8+XG5cdCwgdGltZXNoZWV0cyApO1xuXHR9KVxuXG59KSgpO1xuXG5cblxuXG5cbiJdfQ==
