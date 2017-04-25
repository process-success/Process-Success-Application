(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _employeeTime = require('./employeeTime');

var _employeeTime2 = _interopRequireDefault(_employeeTime);

var _timeSheet = require('./timeSheet');

var _timeSheet2 = _interopRequireDefault(_timeSheet);

var _clockin = require('./clockin');

var _clockin2 = _interopRequireDefault(_clockin);

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
			console.log("UPDATE");
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
						console.log(this.objTool.items[ts_index]);
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
			console.log("in renders", this.state.items);
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
			console.log("TS INDEX!!!", ts_index);
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
					{ className: this.props.page == 'main' ? '' : 'hidden' },
					React.createElement(_clockin2.default, {
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
					{ className: this.props.page == 'timesheet' ? '' : 'hidden' },
					React.createElement('br', null),
					output
				)
			);
		}
	}]);

	return DaysTimeSheets;
}(React.Component);

exports.default = DaysTimeSheets;

},{"./clockin":2,"./employeeTime":3,"./timeSheet":4}],2:[function(require,module,exports){
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
				console.log(time);
				ps.successAlert("Clocked in at " + this.state.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
				this.props.clockIn(time, this.props.crew);
			} else {
				console.log(this.state.time);
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
				console.log(time);
				ps.successAlert("Clocked out at " + this.state.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " Have a great night!");
				this.props.clockOut(time, this.props.crew);
			} else {
				console.log(this.state.time);
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
			console.log(this.state.specifyTime);
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
				filter: function filter(item, input) {
					var value = item.value.toLowerCase();
					if (value.indexOf('is_action') !== -1 || value.indexOf(input) !== -1) {
						return true;
					}
				},
				item: function item(_item, input) {
					var d = _item;
					var html = "<span>" + __(_item.label || _item.value) + "</span>";
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
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _workorderTask = require("./workorderTask");

var _workorderTask2 = _interopRequireDefault(_workorderTask);

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
		_this.updateFromServer = _this.updateFromServer.bind(_this);
		_this.socketUpdate = _this.socketUpdate.bind(_this);
		//this.workorderObj=this.onStatusChanged.bind(this);
		/*          end          */

		_this.state = { workorders: [] };
		_this.workorderTool = ps.initWorkorder();
		_this.workorderTool.get(args, function () {
			this.updateFromServer();
			this.workorderTool.reactSetup(this.updateFromServer);
		}.bind(_this));
		if (_this.workorderTool.items === undefined || _this.workorderTool.items === 0) {} else {
			_this.state.workorders = _this.workorderTool.items;
		}
		return _this;
	}

	_createClass(DaysWorkorders, [{
		key: "socketUpdate",
		value: function socketUpdate() {}
	}, {
		key: "onTaskChecked",
		value: function onTaskChecked(wo_index, index, check) {
			this.workorderTool.items[wo_index].subtask[index].status = check ? 0 : 1;
			this.setState({ workorders: this.workorderTool.items });
			this.workorderTool.update(this.workorderTool.items[wo_index]);
			var checkedText = check ? "unchecked." : "checked.";
			//ps.successAlert(this.workorderTool.items[wo_index].subtask[index].task +" "+ checkedText );
		}
	}, {
		key: "onStatusChanged",
		value: function onStatusChanged(status, index) {
			this.workorderTool.items[index].status = status;
			this.setState({ workorders: this.workorderTool.items });
			this.workorderTool.update(this.workorderTool.items[index]);
			if (status == "Complete") {
				ps.successAlert("Workorder completed!");
			}
		}
	}, {
		key: "updateFromServer",
		value: function updateFromServer() {
			this.setState({ workorders: this.workorderTool.items });
		}
	}, {
		key: "workorderObj",
		value: function workorderObj(item, index) {
			return React.createElement(_workorderTask2.default, {
				key: index,
				index: index,
				location_route: item.location_route,
				location: item.location,
				tasks: item.subtask,
				status: item.status,
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
		key: "render",
		value: function render() {
			if (this.state.workorders === 0 || this.state.workorders === undefined) {
				return React.createElement(
					"div",
					{ className: "text-center" },
					React.createElement(
						"h3",
						null,
						"No Workorders"
					)
				);
			}
			var todo = [];
			var complete = [];
			this.state.workorders.map(function (item, index) {
				if (item.status != 'Complete' && item.status != 'Incomplete') {
					todo.push(this.workorderObj(item, index));
					if (todo.length % 3 === 0) {
						todo.push(React.createElement("div", { className: "clearfix" }));
					}
				} else {
					complete.push(this.workorderObj(item, index));
					if (complete.length % 3 === 0) {
						complete.push(React.createElement("div", { className: "clearfix" }));
					}
				}
			}.bind(this));
			return React.createElement(
				"div",
				{ className: "workorder_container" },
				React.createElement(
					"div",
					null,
					React.createElement("br", null),
					todo
				),
				React.createElement("div", { className: "clearfix" }),
				React.createElement(
					"div",
					null,
					React.createElement(
						"h3",
						null,
						"Complete Workorders"
					),
					complete
				)
			);
		}
	}]);

	return DaysWorkorders;
}(React.Component);

exports.default = DaysWorkorders;

},{"./workorderTask":8}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _modal = require('../utils/modal');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*jshint ignore:start */


var CreateIssue = function (_React$Component) {
	_inherits(CreateIssue, _React$Component);

	function CreateIssue(props) {
		_classCallCheck(this, CreateIssue);

		var _this = _possibleConstructorReturn(this, (CreateIssue.__proto__ || Object.getPrototypeOf(CreateIssue)).call(this, props));

		_this.popUp = _this.popUp.bind(_this);
		_this.popUpId = "create-issue-form-" + _this.props.workorder;
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
		key: 'popUp',
		value: function popUp() {
			$('#' + this.popUpId).modal();
		}
	}, {
		key: 'submit',
		value: function submit() {
			this.objTool = ps.initIssue();
			ps.initIssue.update();
			console.log("save");
		}
	}, {
		key: 'render',
		value: function render() {
			var _React$createElement;

			return React.createElement(
				'div',
				{ className: 'text-right' },
				React.createElement(
					'button',
					(_React$createElement = {
						'data-toggle': 'modal',
						'data-target': "#" + this.popUpId,
						type: 'button',
						className: 'btn btn-default btn-xs create-issue',
						'aria-label': 'Create Issue'
					}, _defineProperty(_React$createElement, 'data-toggle', 'tooltip'), _defineProperty(_React$createElement, 'data-placement', 'top'), _defineProperty(_React$createElement, 'title', 'Issue'), _defineProperty(_React$createElement, 'ref', this.toolTip), _defineProperty(_React$createElement, 'onClick', this.popUp), _React$createElement),
					React.createElement('span', { className: 'glyphicon glyphicon-exclamation-sign', 'aria-hidden': 'true' })
				),
				React.createElement(
					_modal2.default,
					{
						id: this.popUpId,
						submitText: 'Submit',
						title: 'Create Issue For Vineyard',
						submit: this.submit },
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
							React.createElement('input', { type: 'text', className: 'form-control', placeholder: 'Issue Title' })
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
								{ className: 'form-control' },
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
							React.createElement('textarea', { className: 'form-control', rows: '3', placeholder: 'Issue Details' })
						)
					)
				)
			);
		}
	}]);

	return CreateIssue;
}(React.Component);

exports.default = CreateIssue;

},{"../utils/modal":9}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _TaskCheck = require('./TaskCheck');

var _TaskCheck2 = _interopRequireDefault(_TaskCheck);

var _createIssue = require('./createIssue');

var _createIssue2 = _interopRequireDefault(_createIssue);

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

		_this.state = { title: "derek" };
		_this.taskChecked = _this.taskChecked.bind(_this);
		_this.statusChange = _this.statusChange.bind(_this);
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
									workorder: this.props.workorder
								})
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'panel-body' },
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
								return React.createElement(_TaskCheck2.default, { key: index, index: index, lable: item.task, checked: checked, taskChecked: this.taskChecked });
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

},{"./TaskCheck":6,"./createIssue":7}],9:[function(require,module,exports){
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
			this.props.submit();
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
							"form",
							null,
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
				)
			);
		}
	}]);

	return Modal;
}(React.Component);

exports.default = Modal;

},{}],10:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DaysWorkorders = require('../../public/js/modules/days_workorders/DaysWorkorders');

var _DaysWorkorders2 = _interopRequireDefault(_DaysWorkorders);

var _DaysTimeSheets = require('../../public/js/modules/days_timesheets/DaysTimeSheets');

var _DaysTimeSheets2 = _interopRequireDefault(_DaysTimeSheets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*jshint ignore:start */


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
		_this.currentUser = ps.initCurrentUser();
		_this.currentUser.get({}, function (items) {
			if (this.currentUser.items.username == "Guest") {
				window.location = "/login";
			} else {
				$(document).trigger("userLoaded");
				console.log("after Load", this.currentUser.items);
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
			console.log(this.state);

			var output = '';
			if (this.state.items.username == "Guest" || this.state.items.username == "Administrator") {
				output = React.createElement(
					'h3',
					null,
					'Geust Or Admin'
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
					null,
					React.createElement(
						'ul',
						{ className: 'nav nav-pills center-pills' },
						React.createElement(
							'li',
							{ onClick: this.mainClicked, role: 'presentation', className: this.state.page == 'main' ? 'active' : '' },
							React.createElement(
								'a',
								{ href: '#main' },
								'Main'
							)
						),
						React.createElement(
							'li',
							{ onClick: this.workordersClicked, role: 'presentation', className: this.state.page == 'workorders' ? 'active' : '' },
							React.createElement(
								'a',
								{ href: '#workorders' },
								'Workorders'
							)
						),
						React.createElement(
							'li',
							{ onClick: this.timesheetClicked, role: 'presentation', className: this.state.page == 'timesheet' ? 'active' : '' },
							React.createElement(
								'a',
								{ href: '#timesheet' },
								'Time Sheets'
							)
						)
					),
					React.createElement('br', null),
					React.createElement(
						'div',
						{ className: this.state.page == 'timesheet' || this.state.page == 'main' ? '' : 'hidden' },
						React.createElement(_DaysTimeSheets2.default, {
							date: this.state.items.today,
							full_name: this.state.items.current_user.full_name,
							page: this.state.page,
							crew: this.state.items.crew
						})
					),
					React.createElement(
						'div',
						{ className: this.state.page == 'workorders' ? '' : 'hidden' },
						React.createElement(_DaysWorkorders2.default, {
							crew: this.state.items.crew,
							date: this.state.items.today
							//completed={this.state.completed}
							//inprogress={this.state.inprogress}
						})
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

},{"../../public/js/modules/days_timesheets/DaysTimeSheets":1,"../../public/js/modules/days_workorders/DaysWorkorders":5}]},{},[10])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c190aW1lc2hlZXRzL0RheXNUaW1lU2hlZXRzLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy9kYXlzX3RpbWVzaGVldHMvY2xvY2tpbi5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c190aW1lc2hlZXRzL2VtcGxveWVlVGltZS5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c190aW1lc2hlZXRzL3RpbWVTaGVldC5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c193b3Jrb3JkZXJzL0RheXNXb3Jrb3JkZXJzLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy9kYXlzX3dvcmtvcmRlcnMvVGFza0NoZWNrLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy9kYXlzX3dvcmtvcmRlcnMvY3JlYXRlSXNzdWUuanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL2RheXNfd29ya29yZGVycy93b3Jrb3JkZXJUYXNrLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9tb2RhbC5qc3giLCJwcm9jZXNzX3N1Y2Nlc3Mvd3d3L3dvcmtwYWdlL3dvcmtwYWdlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OytlQUhBOzs7SUFLcUIsYzs7O0FBQ3BCLHlCQUFZLEtBQVosRUFBa0I7QUFBQTs7QUFBQSw4SEFDWCxLQURXOztBQUVqQixRQUFLLEtBQUwsR0FBVyxFQUFDLE9BQU0sRUFBUCxFQUFY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V0FBakIsSUFBZ0MsS0FBSyxLQUFMLENBQVcsSUFBWCxJQUFpQixNQUFqRCxHQUF3RCxFQUF4RCxHQUEyRCxRQUEzRTtBQUNDO0FBQ0MsYUFBTSxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLEtBRHhCO0FBRUMsa0JBQVcsS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixZQUFqQixDQUE4QixTQUYxQztBQUdDLGFBQU0sS0FBSyxLQUFMLENBQVcsSUFIbEI7QUFJQyxhQUFNLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUI7QUFKeEI7QUFERCxNQVBEO0FBZUM7QUFBQTtBQUFBLFFBQUssV0FBVyxLQUFLLEtBQUwsQ0FBVyxJQUFYLElBQWlCLFlBQWpCLEdBQThCLEVBQTlCLEdBQWlDLFFBQWpEO0FBQ0M7QUFDQyxhQUFNLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsSUFEeEI7QUFFQyxhQUFNLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUI7QUFDdkI7QUFDQTtBQUpEO0FBREQ7QUFmRCxLQUREO0FBMEJBOztBQUVELFVBQU87QUFBQTtBQUFBO0FBQ0w7QUFESyxJQUFQO0FBSUE7Ozs7RUFwSHFCLE1BQU0sUzs7QUF1SDdCLENBQUMsWUFBVTtBQUNWLFFBQU8sS0FBUCxDQUFhLFlBQVU7QUFDdEIsV0FBUyxNQUFULENBQ0Esb0JBQUMsUUFBRCxPQURBLEVBRUMsVUFGRDtBQUdBLEVBSkQ7QUFNQSxDQVBEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuaW1wb3J0IEVtcGxveWVlVGltZSBmcm9tICcuL2VtcGxveWVlVGltZSc7XG5pbXBvcnQgVGltZVNoZWV0IGZyb20gJy4vdGltZVNoZWV0JztcbmltcG9ydCBDbG9ja0luIGZyb20gJy4vY2xvY2tpbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERheXNUaW1lU2hlZXRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuc3RhdGU9e2l0ZW1zOltdfTtcblx0XHR0aGlzLnN0YXRlLnRpbWU9Jyc7XG5cdFx0dGhpcy5hZGQ9e307XG5cblx0XHQvKiAgICAgRG8gdGhlIGJpbmQgdGhpbmcgICAgICAqL1xuXG5cdFx0Ly9UaW1lIGVtcGxveWVlIGxpbmUgaXRlbVxuXHRcdHRoaXMudGltZUNoYW5nZWQ9dGhpcy50aW1lQ2hhbmdlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMudXBkYXRlVGltZT10aGlzLnVwZGF0ZVRpbWUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmRlbGV0ZUVtcGxveWVlPXRoaXMuZGVsZXRlRW1wbG95ZWUuYmluZCh0aGlzKTtcblxuXHRcdHRoaXMudXBkYXRlRnJvbVNlcnZlcj10aGlzLnVwZGF0ZUZyb21TZXJ2ZXIuYmluZCh0aGlzKTtcblx0XHR0aGlzLnRpbWVTaGVldFdyYXBwZXI9dGhpcy50aW1lU2hlZXRXcmFwcGVyLmJpbmQodGhpcyk7XG5cblx0XHR0aGlzLmFkZEVtcGxveWVlPXRoaXMuYWRkRW1wbG95ZWUuYmluZCh0aGlzKVxuXHRcdHRoaXMudXBkYXRlRnJvbVNlcnZlclBhcmFtPXRoaXMudXBkYXRlRnJvbVNlcnZlclBhcmFtLmJpbmQodGhpcyk7XG5cblx0XHR0aGlzLmNsb2NrSW49dGhpcy5jbG9ja0luLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jbG9ja091dD10aGlzLmNsb2NrT3V0LmJpbmQodGhpcyk7XG5cdFx0LyogICAgZW5kIEJpbmQgZGluZyBkaW5nICAgICAgICAgKi9cblxuXHRcdHRoaXMuYXV0b2NvbXBsZXRlQXJyPVtdO1xuXHRcdHZhciBhcmdzPXt9O1xuXG5cdFx0Ly9HcmFiIHRoZSBlbXBsb3llZSB0aW1lc2hlZXQgZGF0YVxuXHRcdHRoaXMub2JqVG9vbD1wcy5pbml0VGltZVNoZWV0cygpXG5cdFx0dGhpcy5vYmpUb29sLmdldCh7ZGF0ZTpwcm9wcy5kYXRlfSxmdW5jdGlvbigpe1xuXHRcdFx0dGhpcy51cGRhdGVGcm9tU2VydmVyKCk7XG5cdFx0XHR0aGlzLm9ialRvb2wucmVhY3RTZXR1cCh0aGlzLnVwZGF0ZUZyb21TZXJ2ZXIpO1xuXHRcdH0uYmluZCh0aGlzKSk7XG5cblx0XHRpZiAodGhpcy5vYmpUb29sLml0ZW1zPT09dW5kZWZpbmVkIHx8dGhpcy5vYmpUb29sLml0ZW1zPT09IDAgKXtcblx0XHR9ZWxzZXt0aGlzLnN0YXRlLml0ZW1zPXRoaXMub2JqVG9vbC5pdGVtczt9XG5cblx0XHQvL0dyYWIgdGhlIGVtcGxveWVlIGxpc3Rcblx0XHR2YXIgdG9vbD1wcy5pbml0RW1wbG95ZWVMaXN0KCk7XG5cdFx0dG9vbC5nZXQoe30sZnVuY3Rpb24oKXtcblx0XHRcdHBzLmVtcGxveWVlX2xhYmxlcz0gdG9vbC5pdGVtcy5tYXAoZnVuY3Rpb24ob2JqKSB7IFxuXHRcdFx0XHR2YXIgck9iaiA9IHt9O1xuXHRcdFx0XHRyT2JqLmxhYmVsPW9iai5mdWxsX25hbWU7XG5cdFx0XHRcdHJPYmoudmFsdWU9b2JqLm5hbWU7XG5cdFx0XHRcdHJldHVybiByT2JqO1xuXHRcdFx0fSk7XG5cdFx0XHQkKGRvY3VtZW50KS50cmlnZ2VyKFwiZW1wbG95ZWVMYWJsZXNMb2FkZWRcIik7XG5cdFx0fSk7XG5cblxuXHRcdFxuXG5cdH1cblxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIGhlbHBlciBGdW5jdGlvblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLVxuXHR1cGRhdGVGcm9tU2VydmVyKCl7XG5cdFx0Y29uc29sZS5sb2coXCJVUERBVEVcIik7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7aXRlbXM6dGhpcy5vYmpUb29sLml0ZW1zfSk7XG5cdH1cblx0dXBkYXRlRnJvbVNlcnZlclBhcmFtKGRhdGEsaW5kZXgpe1xuXHRcdHRoaXMub2JqVG9vbC5pdGVtc1tpbmRleF09ZGF0YTtcblx0XHR0aGlzLnNldFN0YXRlKHtpdGVtczp0aGlzLm9ialRvb2wuaXRlbXN9KTtcblx0fVxuXHRjcmV3c1RpbWVzaGVldEluZGV4KGNyZXcpe1xuXHRcdGZvciAodmFyIGk9MDsgaSA8IHRoaXMub2JqVG9vbC5pdGVtcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHR2YXIgaXRlbT10aGlzLm9ialRvb2wuaXRlbXNbaV07XG5cdFx0XHRpZihpdGVtLmNyZXc9PWNyZXcpe1xuXHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0Z2V0SW5kZXhUaW1lc2hlZXQodGltZXNoZWV0KXtcblx0XHRyZXR1cm4gdGhpcy5vYmpUb29sLmdldF9pbmRleF9vZl9pdGVtKHRpbWVzaGVldCk7XG5cdH1cblx0Z2V0SW5kZXhFbXBsb3llZSh0aW1lc2hlZXRJbmRleCxlbXBsb3llZU5hbWUpe1xuXHRcdHZhciBlbXBsb3llZXM9dGhpcy5vYmpUb29sLml0ZW1zW3RpbWVzaGVldEluZGV4XS5lbXBsb3llZXM7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlbXBsb3llZXMubGVuZ3RoOyBpKyspe1xuXHRcdFx0aWYgKGVtcGxveWVlTmFtZT09ZW1wbG95ZWVzW2ldLmVtcGxveWVlKXtcblx0XHRcdFx0cmV0dXJuIGk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdH1cblxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vICAgICAgIFRpbWVzaGVldCBXcmFwcGVyIEZ1bmN0aW9uc1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVx0XG5cblx0Y2xvY2tJbih0aW1lLGNyZXcpe1xuXG5cdFx0dmFyIHRzX2luZGV4PXRoaXMuY3Jld3NUaW1lc2hlZXRJbmRleChjcmV3KTtcblxuXHRcdHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzO1xuXHRcdGZvciAodmFyIGk9MDsgaSA8IHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzLmxlbmd0aDsgaSsrKXtcblx0XHRcdHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzW2ldLnN0YXJ0PXRpbWU7XG5cdFx0fVxuXHRcdHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uc3RhdHVzPVwiQ2xvY2tlZCBJblwiO1xuXHRcdHRoaXMub2JqVG9vbC51cGRhdGUodGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7aXRlbXM6dGhpcy5vYmpUb29sLml0ZW1zfSk7XG5cdH1cblx0Y2xvY2tPdXQodGltZSxjcmV3KXtcblxuXHRcdHZhciB0c19pbmRleD10aGlzLmNyZXdzVGltZXNoZWV0SW5kZXgoY3Jldyk7XG5cblx0XHR0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlcztcblx0XHRmb3IgKHZhciBpPTA7IGkgPCB0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHR0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlc1tpXS5lbmQ9dGltZTtcblx0XHR9XG5cdFx0dGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5zdGF0dXM9XCJDbG9ja2VkIE91dFwiO1xuXHRcdHRoaXMub2JqVG9vbC51cGRhdGUodGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7aXRlbXM6dGhpcy5vYmpUb29sLml0ZW1zfSk7XG5cdH1cblx0YWRkRW1wbG95ZWUodHNfbmFtZSwgZW1wbG95ZWVfbmFtZSl7XG5cdFx0dmFyIHRzX2luZGV4ID0gdGhpcy5nZXRJbmRleFRpbWVzaGVldCh0c19uYW1lKTtcblx0XHR2YXIgZW1wbG95ZWVJbmRleCA9IHRoaXMuZ2V0SW5kZXhFbXBsb3llZSh0c19pbmRleCxlbXBsb3llZV9uYW1lKTtcblxuXHRcdHZhciB1cGRhdGVDYWxsYmFjaz1mdW5jdGlvbihpbmRleCl7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oZGF0YSl7XHRcdFx0XG5cdFx0XHRcdHRoaXMudXBkYXRlRnJvbVNlcnZlclBhcmFtKGRhdGEsaW5kZXgpO1xuXHRcdFx0fS5iaW5kKHRoaXMpO1xuXHRcdH0uYmluZCh0aGlzKTtcblxuXHRcdGZvciAodmFyIGk9MDsgaSA8IHRoaXMub2JqVG9vbC5pdGVtcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHR2YXIgaXRlbSA9IHRoaXMub2JqVG9vbC5pdGVtc1tpXTtcblx0XHRcdGlmKGl0ZW0ubmFtZT09dHNfbmFtZSl7XG5cdFx0XHRcdGZvciAodmFyIHg9MDsgeCA8IGl0ZW0uZW1wbG95ZWVzLmxlbmd0aDsgeCsrKXtcblx0XHRcdFx0XHR2YXIgY29udGFpbmVyID0gaXRlbS5lbXBsb3llZXNbeF07XG5cdFx0XHRcdFx0aWYgKGNvbnRhaW5lci5lbXBsb3llZT09ZW1wbG95ZWVfbmFtZSl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gXCJkdXBsaWNhdGVcIjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5vYmpUb29sLml0ZW1zW2ldLmVtcGxveWVlcy5wdXNoKHsgZW1wbG95ZWUgOiBlbXBsb3llZV9uYW1lLCBuZXc6JzEnfSk7XG5cdFx0XHRcdHRoaXMub2JqVG9vbC51cGRhdGUodGhpcy5vYmpUb29sLml0ZW1zW2ldLHVwZGF0ZUNhbGxiYWNrKGkpLDEpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHZhciBkb25lPTE7XG5cdFx0XHRcdGlmKGl0ZW0uZW1wbG95ZWVzLmxlbmd0aD4wKXtcblx0XHRcdFx0XHRmb3IgKHZhciB4PTA7IHggPCBpdGVtLmVtcGxveWVlcy5sZW5ndGggJiYgZG9uZTsgeCsrKXtcblx0XHRcdFx0XHRcdHZhciBjb250YWluZXIgPSBpdGVtLmVtcGxveWVlc1t4XTtcblx0XHRcdFx0XHRcdGlmIChjb250YWluZXIuZW1wbG95ZWU9PWVtcGxveWVlX25hbWUpe1xuXHRcdFx0XHRcdFx0XHR0aGlzLm9ialRvb2wuaXRlbXNbaV0uZW1wbG95ZWVzLnNwbGljZSh4LCAxKTtcblx0XHRcdFx0XHRcdFx0dGhpcy5vYmpUb29sLmNoYW5nZWQodGhpcy5vYmpUb29sLml0ZW1zW2ldKTtcblx0XHRcdFx0XHRcdFx0ZG9uZT0wO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHR9O1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyAgICAgICAgICAgVGltZXNoZWV0IFdyYXBwZXJcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cdFxuXHR0aW1lU2hlZXRXcmFwcGVyKGl0ZW0saW5kZXgpe1xuXHRcdHZhciBlbXBsb3llZV9vdXRwdXQ9W107XG5cdFx0aWYoaXRlbS5lbXBsb3llZXM9PT11bmRlZmluZWQpe1xuXG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHR2YXIgZW1wbG95ZWVPdXRwdXQ9aXRlbS5lbXBsb3llZXMubWFwKGZ1bmN0aW9uKGl0ZW1fZW1wbG95ZWUsaW5kZXhfZW1wbG95ZWUpe1xuXHRcdFx0IFx0ZW1wbG95ZWVfb3V0cHV0LnB1c2godGhpcy5lbXBsb3llZUxpbmVJdGVtKGl0ZW1fZW1wbG95ZWUsaXRlbS5uYW1lLGluZGV4X2VtcGxveWVlKSk7XG5cdFx0XHR9LmJpbmQodGhpcykpO1xuXHRcdH1cblxuXHRcdHJldHVybihcblxuXHRcdFx0PFRpbWVTaGVldCBcblx0XHRcdFx0bmFtZT17aXRlbS5uYW1lfVxuXHRcdFx0XHRkYXRlPXtpdGVtLmRhdGV9XG5cdFx0XHRcdGNyZXc9e2l0ZW0uY3Jld31cblx0XHRcdFx0ZW1wbG95ZWVzPXtlbXBsb3llZV9vdXRwdXR9XG5cdFx0XHRcdGFkZEVtcGxveWVlPXt0aGlzLmFkZEVtcGxveWVlfVxuXHRcdFx0XHRvblVwZGF0ZT17dGhpcy51cGRhdGV9XG5cdFx0XHQvPlxuXG5cdFx0KTtcblx0fVxuXG5cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyAgICAgICBFbXBsb3llZSBUaW1lIEZvcm0gTGluZWl0ZW1cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0ZGVsZXRlRW1wbG95ZWUoZW1wbG95ZWUsdGltZXNoZWV0KXtcblx0XHR2YXIgdHNfaW5kZXggPSB0aGlzLmdldEluZGV4VGltZXNoZWV0KHRpbWVzaGVldCk7XG5cdFx0dmFyIGRvbmU9MTtcblx0XHR2YXIgaXRlbT10aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdO1xuXHRcdGlmKGl0ZW0uZW1wbG95ZWVzLmxlbmd0aD4wKXtcblx0XHRcdGZvciAodmFyIHg9MDsgeCA8IGl0ZW0uZW1wbG95ZWVzLmxlbmd0aCAmJiBkb25lOyB4Kyspe1xuXHRcdFx0XHR2YXIgY29udGFpbmVyID0gaXRlbS5lbXBsb3llZXNbeF07XG5cdFx0XHRcdGlmIChjb250YWluZXIuZW1wbG95ZWU9PWVtcGxveWVlKXtcblx0XHRcdFx0XHR0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlcy5zcGxpY2UoeCwgMSk7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2codGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XSk7XG5cdFx0XHRcdFx0dGhpcy5vYmpUb29sLnVwZGF0ZSh0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdKTtcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtpdGVtczp0aGlzLm9ialRvb2wuaXRlbXN9KTtcblx0XHRcdFx0XHRkb25lPTA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHR0aW1lQ2hhbmdlZChwb3NpdGlvbixlbXBsb3llZSx0aW1lc2hlZXQsdmFsdWUpe1xuXHRcdHZhciB0c19pbmRleCA9IHRoaXMuZ2V0SW5kZXhUaW1lc2hlZXQodGltZXNoZWV0KTtcblx0XHR2YXIgZW1wbG95ZWVJbmRleCA9IHRoaXMuZ2V0SW5kZXhFbXBsb3llZSh0c19pbmRleCxlbXBsb3llZSk7XG5cdFx0dGhpcy5zdGF0XG5cdFx0aWYocG9zaXRpb249PSdlbmQnKXtcblx0XHRcdHRoaXMuc3RhdGUuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlc1tlbXBsb3llZUluZGV4XS5lbmQ9dmFsdWU7XG5cdFx0fVxuXHRcdGVsc2V7dGhpcy5zdGF0ZS5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzW2VtcGxveWVlSW5kZXhdLnN0YXJ0PXZhbHVlfVxuXHQgICAgdGhpcy5zZXRTdGF0ZSh7aXRlbXM6dGhpcy5zdGF0ZS5pdGVtc30pO1xuXHR9XG5cdHVwZGF0ZVRpbWUocG9zaXRpb24sZW1wbG95ZWUsdGltZXNoZWV0LHZhbHVlKXtcblx0XHR2YXIgdHNfaW5kZXggPSB0aGlzLmdldEluZGV4VGltZXNoZWV0KHRpbWVzaGVldCk7XG5cdFx0dmFyIGVtcGxveWVlSW5kZXggPSB0aGlzLmdldEluZGV4RW1wbG95ZWUodHNfaW5kZXgsZW1wbG95ZWUpO1xuXHRcdHZhciBzYXZlPTA7XG5cdFx0dmFsdWU9cHMudGltZV9hZGRfZGlnaXRzKHZhbHVlKVxuXHRcdGlmKHBvc2l0aW9uPT0nZW5kJyAmJiBwcy50aW1lX2FkZF9mcm9udF96ZXJvKHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzW2VtcGxveWVlSW5kZXhdLmVuZCkgIT0gcHMudGltZV9hZGRfZGlnaXRzKHZhbHVlKSl7IFxuXHRcdFx0dGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXNbZW1wbG95ZWVJbmRleF0uZW5kPXBzLnRpbWVfYWRkX2RpZ2l0cyh2YWx1ZSk7XG5cdFx0XHRzYXZlPTE7XG5cdFx0fVxuXHQgICAgaWYocG9zaXRpb249PSdzdGFydCcgJiYgcHMudGltZV9hZGRfZnJvbnRfemVybyh0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlc1tlbXBsb3llZUluZGV4XS5zdGFydCkgIT0gcHMudGltZV9hZGRfZGlnaXRzKHZhbHVlKSl7XG5cdCAgICBcdHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzW2VtcGxveWVlSW5kZXhdLnN0YXJ0PXBzLnRpbWVfYWRkX2RpZ2l0cyh2YWx1ZSk7XG5cdCAgICBcdHNhdmU9MTtcblx0ICAgIH1cblx0ICAgIGlmKHNhdmUpe1xuXHRcdCAgICB0aGlzLnNldFN0YXRlKHtpdGVtczp0aGlzLm9ialRvb2wuaXRlbXN9KTtcblx0XHQgICAgdGhpcy5vYmpUb29sLnVwZGF0ZSh0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLGZ1bmN0aW9uKCl7XG5cdFx0ICAgIFx0cHMuc3VjY2Vzc0FsZXJ0KHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzW2VtcGxveWVlSW5kZXhdLmVtcGxveWVlX25hbWUrXCIgdGltZSB1cGRhdGVkIVwiKTtcblx0XHQgICAgfS5iaW5kKHRoaXMpKTtcblx0XHR9XG5cdH1cblx0ZW1wbG95ZWVMaW5lSXRlbShlbXBsb3llZV9jb250YWluZXIsdGltZV9zaGVldCxlbXBsb3llZV9pbmRleCl7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PEVtcGxveWVlVGltZVxuXHRcdFx0XHRrZXk9e2VtcGxveWVlX2luZGV4fVxuXHRcdFx0XHR0aW1lc2hlZXQ9e3RpbWVfc2hlZXR9XG5cdFx0XHRcdGVtcGxveWVlX25hbWU9e2VtcGxveWVlX2NvbnRhaW5lci5lbXBsb3llZV9uYW1lfVxuXHRcdFx0XHRlbXBsb3llZT17ZW1wbG95ZWVfY29udGFpbmVyLmVtcGxveWVlfVxuXHRcdFx0XHRzdGFydD17cHMudGltZV9hZGRfZnJvbnRfemVybyhlbXBsb3llZV9jb250YWluZXIuc3RhcnQpfVxuXHRcdFx0XHRlbmQ9e3BzLnRpbWVfYWRkX2Zyb250X3plcm8oZW1wbG95ZWVfY29udGFpbmVyLmVuZCl9XG5cdFx0XHRcdHVwZGF0ZVRpbWU9e3RoaXMudXBkYXRlVGltZX1cblx0XHRcdFx0dGltZUNoYW5nZWQ9e3RoaXMudGltZUNoYW5nZWR9XG5cdFx0XHRcdGRlbGV0ZUVtcGxveWVlPXt0aGlzLmRlbGV0ZUVtcGxveWVlfVxuXHRcdFx0Lz5cblx0XHQpO1xuXHR9XG5cblxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gICAgICAgIFJlbmRlclxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdHJlbmRlcigpe1xuXHRcdC8vaGFuZGVsIGVtcHR5IHJldHVyblxuXHRcdGNvbnNvbGUubG9nKFwiaW4gcmVuZGVyc1wiLHRoaXMuc3RhdGUuaXRlbXMpO1xuXHRcdGlmICh0aGlzLnN0YXRlLml0ZW1zLmxlbmd0aD09PTB8fHRoaXMuc3RhdGUuaXRlbXM9PT11bmRlZmluZWQpe1xuXHRcdFx0cmV0dXJuICg8ZGl2Pk5vIFRpbWUgU2hlZXRzLCBzdGFydCBieSA8YSBocmVmPVwiL2Rlc2tcIj5jcmVhdGluZyBzb21lIGNyZXdzITwvYT48L2Rpdj4pO1xuXHRcdH1cblx0XHR2YXIgb3V0cHV0PVtdXG5cdFx0dGhpcy5zdGF0ZS5pdGVtcy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXHRcdFx0aWYoaXRlbS5jcmV3PT10aGlzLnByb3BzLmNyZXcpe1xuXHRcdFx0XHRvdXRwdXQudW5zaGlmdCh0aGlzLnRpbWVTaGVldFdyYXBwZXIoaXRlbSxpbmRleCkpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdG91dHB1dC5wdXNoKHRoaXMudGltZVNoZWV0V3JhcHBlcihpdGVtLGluZGV4KSk7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKHRoaXMpKTtcblxuXHRcdHZhciB0c19pbmRleD10aGlzLmNyZXdzVGltZXNoZWV0SW5kZXgodGhpcy5wcm9wcy5jcmV3KTtcblx0XHRjb25zb2xlLmxvZyhcIlRTIElOREVYISEhXCIsIHRzX2luZGV4KTtcblx0XHR2YXIgc3RhdHVzPScnO1xuXHRcdGlmICh0c19pbmRleD09dW5kZWZpbmVkKXt2YXIgc3RhdHVzPWZhbHNlO31cblx0XHRlbHNle3N0YXR1cyA9dGhpcy5zdGF0ZS5pdGVtc1t0c19pbmRleF0uc3RhdHVzfVxuXHRcdFxuXG5cdFx0Ly9NQUlOIFJFTkRFUlxuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPXt0aGlzLnByb3BzLnBhZ2U9PSdtYWluJz8nJzonaGlkZGVuJ30+XG5cdFx0XHRcdFx0PENsb2NrSW5cblx0XHRcdFx0XHRcdGNsb2NrSW49e3RoaXMuY2xvY2tJbn1cblx0XHRcdFx0XHRcdGNsb2NrT3V0PXt0aGlzLmNsb2NrT3V0fVxuXHRcdFx0XHRcdFx0c3RhdHVzPXtzdGF0dXN9XG5cdFx0XHRcdFx0XHRmdWxsX25hbWU9e3RoaXMucHJvcHMuZnVsbF9uYW1lfVxuXHRcdFx0XHRcdFx0ZGF0ZT17dGhpcy5wcm9wcy5kYXRlfVxuXHRcdFx0XHRcdFx0Y3Jldz17dGhpcy5wcm9wcy5jcmV3fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17dGhpcy5wcm9wcy5wYWdlPT0ndGltZXNoZWV0Jz8nJzonaGlkZGVuJ30+XG5cdFx0XHRcdFx0PGJyLz5cblx0XHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXG5cdFx0KTtcblxuXHR9O1x0XG59XG5cblxuXG5cblxuIiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbG9ja0luIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMudG9nZ2xlVGltZUlucHV0PXRoaXMudG9nZ2xlVGltZUlucHV0LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jbG9ja0luPXRoaXMuY2xvY2tJbi5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY2xvY2tPdXQ9dGhpcy5jbG9ja091dC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMub25DaGFuZ2U9dGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpO1xuXG5cdFx0dGhpcy5zdGF0ZT17XG5cdFx0XHRkYXRlOm5ldyBEYXRlKCksXG5cdFx0XHRzcGVjaWZ5VGltZTpmYWxzZVxuXHRcdH07XG5cblx0fVxuXHRjbG9ja0luKGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRpZih0aGlzLnN0YXRlLnNwZWNpZnlUaW1lPT1mYWxzZSl7XG5cdFx0XHR2YXIgdGltZT10aGlzLnN0YXRlLmRhdGUudG9Mb2NhbGVUaW1lU3RyaW5nKFtdLCB7aG91cjogJzItZGlnaXQnLCBtaW51dGU6JzItZGlnaXQnLGhvdXIxMjogZmFsc2V9KVxuXHRcdFx0Y29uc29sZS5sb2codGltZSk7XG5cdFx0XHRwcy5zdWNjZXNzQWxlcnQoXCJDbG9ja2VkIGluIGF0IFwiICsgdGhpcy5zdGF0ZS5kYXRlLnRvTG9jYWxlVGltZVN0cmluZyhbXSwge2hvdXI6ICcyLWRpZ2l0JywgbWludXRlOicyLWRpZ2l0J30pKVxuXHRcdFx0dGhpcy5wcm9wcy5jbG9ja0luKHRpbWUsIHRoaXMucHJvcHMuY3Jldylcblx0XHR9ZWxzZXtcblx0XHRcdGNvbnNvbGUubG9nKHRoaXMuc3RhdGUudGltZSlcblx0XHRcdGlmKHRoaXMuc3RhdGUudGltZSE9dW5kZWZpbmVkKXtcblx0XHRcdFx0dGhpcy5wcm9wcy5jbG9ja0luKHRoaXMuc3RhdGUudGltZSwgdGhpcy5wcm9wcy5jcmV3KTtcblx0XHRcdFx0cHMuc3VjY2Vzc0FsZXJ0KFwiQ2xvY2tlZCBpblwiKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHQvL2ludmFsaWQgdGltZSBlcnJvclxuXHRcdFx0XHRwcy5mYWlsQWxlcnQoXCJJbnZhbGlkIHRpbWUuXCIpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGNsb2NrT3V0KGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRpZih0aGlzLnN0YXRlLnNwZWNpZnlUaW1lPT1mYWxzZSl7XG5cdFx0XHR2YXIgdGltZT10aGlzLnN0YXRlLmRhdGUudG9Mb2NhbGVUaW1lU3RyaW5nKFtdLCB7aG91cjogJzItZGlnaXQnLCBtaW51dGU6JzItZGlnaXQnLGhvdXIxMjogZmFsc2V9KVxuXHRcdFx0Y29uc29sZS5sb2codGltZSk7XG5cdFx0XHRwcy5zdWNjZXNzQWxlcnQoXCJDbG9ja2VkIG91dCBhdCBcIiArIHRoaXMuc3RhdGUuZGF0ZS50b0xvY2FsZVRpbWVTdHJpbmcoW10sIHtob3VyOiAnMi1kaWdpdCcsIG1pbnV0ZTonMi1kaWdpdCd9KStcIiBIYXZlIGEgZ3JlYXQgbmlnaHQhXCIpXG5cdFx0XHR0aGlzLnByb3BzLmNsb2NrT3V0KHRpbWUsIHRoaXMucHJvcHMuY3Jldylcblx0XHR9ZWxzZXtcblx0XHRcdGNvbnNvbGUubG9nKHRoaXMuc3RhdGUudGltZSlcblx0XHRcdGlmKHRoaXMuc3RhdGUudGltZSE9dW5kZWZpbmVkKXtcblx0XHRcdFx0dGhpcy5wcm9wcy5jbG9ja091dCh0aGlzLnN0YXRlLnRpbWUsIHRoaXMucHJvcHMuY3Jldyk7XG5cdFx0XHRcdHBzLnN1Y2Nlc3NBbGVydChcIkNsb2NrZWQgT3V0ISAgSGF2ZSBhIGdyZWF0IG5pZ2h0IVwiKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHQvL2ludmFsaWQgdGltZSBlcnJvclxuXHRcdFx0XHRwcy5mYWlsQWxlcnQoXCJJbnZhbGlkIHRpbWUuXCIpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHRvZ2dsZVRpbWVJbnB1dChlKXtcblx0XHRjb25zb2xlLmxvZyh0aGlzLnN0YXRlLnNwZWNpZnlUaW1lKTtcblx0XHRpZih0aGlzLnN0YXRlLnNwZWNpZnlUaW1lKXtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3NwZWNpZnlUaW1lOmZhbHNlfSk7XG5cdFx0fVxuXHRcdGVsc2V7dGhpcy5zZXRTdGF0ZSh7c3BlY2lmeVRpbWU6dHJ1ZX0pO31cblx0fVxuXHRvbkNoYW5nZShlKXtcblx0XHR0aGlzLnNldFN0YXRlKHt0aW1lOmUudGFyZ2V0LnZhbHVlfSk7XG5cdH1cblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0dGhpcy50aW1lcklEID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy50aWNrKCksMTAwMDApO1xuXHR9XG5cblx0Y29tcG9uZW50V2lsbFVubW91bnQoKSB7XG5cdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVySUQpO1xuXHR9XG5cblx0dGljaygpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGRhdGU6IG5ldyBEYXRlKClcblx0XHR9KTtcblx0fVxuXHRyZW5kZXIoKXtcblxuXHRcblx0XHR2YXIgdmFsdWVzPXtcblx0XHRcdCdDcmVhdGVkJzpbdGhpcy5jbG9ja0luLCdDbG9jayBJbicsJ2J0biBidG4tbGcgYnRuLXN1Y2Nlc3MgYnRuLWJsb2NrJ10sXG5cdFx0XHQnQ2xvY2tlZCBJbic6W3RoaXMuY2xvY2tPdXQsICdDbG9jayBPdXQnLCAnYnRuIGJ0bi1sZyBidG4tc3VjY2VzcyBidG4tYmxvY2snIF0sXG5cdFx0XHQnQ2xvY2tlZCBPdXQnOlt0aGlzLmNsb2NrT3V0LCAnQ2hhbmdlIENsb2Nrb3V0IFRpbWUnLCdidG4gYnRuLWxnIGJ0bi1zdWNjZXNzIGJ0bi1ibG9jayddLFxuXHRcdFx0J1N1Ym1pbnRlZCc6WycnLCdBbHJlYWR5IFN1Ym1pbnRlZCcsJ2J0biBidG4tbGcgYnRuLXN1Y2Nlc3MgYnRuLWJsb2NrJ10sXG5cdFx0XHQnQXByb3ZlZCc6WycnLCdBbHJlYWR5IFN1Ym1pbnRlZCcsJ2J0biBidG4tbGcgYnRuLXN1Y2Nlc3MgYnRuLWJsb2NrJ11cblx0XHR9W3RoaXMucHJvcHMuc3RhdHVzXTtcblx0XHR2YXIgb3V0cHV0PScnO1xuXHRcdGlmICh2YWx1ZXM9PXVuZGVmaW5lZCl7XG5cdFx0XHRvdXRwdXQ9KDxhIGhyZWY9XCIjdGltZXNoZWV0XCI+WW91IGFyZSBub3QgaW4gYSBUaW1lIFNoZWV0IGFkZCB5b3Vyc2VsZi48L2E+KTtcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdHZhciBpbnB1dEZpZWxkID0gKCA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT17dmFsdWVzWzJdfSBvbkNsaWNrPXt2YWx1ZXNbMF19IHZhbHVlPXt2YWx1ZXNbMV19IC8+KTtcblx0XHRcdG91dHB1dD0oXG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuXHRcdFx0XHRcdFdlbGNvbWUgPHNwYW4gY2xhc3NOYW1lPVwidXNlcm5hbWVcIj57dGhpcy5wcm9wcy5mdWxsX25hbWV9PC9zcGFuPlxuXHRcdFx0XHQ8L2gzPlxuXHRcdFx0XHQ8aDMgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57dGhpcy5zdGF0ZS5kYXRlLnRvTG9jYWxlVGltZVN0cmluZyhbXSwge2hvdXI6ICcyLWRpZ2l0JywgbWludXRlOicyLWRpZ2l0J30pfSBvbiB7dGhpcy5zdGF0ZS5kYXRlLnRvRGF0ZVN0cmluZygpfSA8L2gzPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nY2xvY2tJbic+XG5cdFx0XHRcdFx0PGZvcm0gY2xhc3NOYW1lPVwiZm9ybS1jaGVja2luXCIgcm9sZT1cImZvcm1cIj5cblx0XHRcdFx0XHRcdHtpbnB1dEZpZWxkfVxuXHRcdFx0XHRcdFx0PGJyLz5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd0ZXh0LWNlbnRlcic+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgXG5cdFx0XHRcdFx0XHRcdFx0XHR0eXBlPVwidGltZVwiIFxuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXt0aGlzLnN0YXRlLnNwZWNpZnlUaW1lID8gJ2Zvcm0tY29udHJvbCBzbWFsbC10aW1lJzonaGlkZGVuJ30gXG5cdFx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cblx0XHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGJyLz5cblx0XHRcdFx0XHRcdFx0PGEgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCIgb25DbGljaz17dGhpcy50b2dnbGVUaW1lSW5wdXR9Pnt0aGlzLnN0YXRlLnNwZWNpZnlUaW1lPycgLSBVc2UgQ3VycmVudCBUaW1lJzonICsgU3BlY2lmeSBhIFRpbWUnfTwvYT5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZm9ybT5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0iLCJcbi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF5c1RpbWVTaGVldHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0Ly9CaW5kaW5nIGRpbmdcblx0XHR0aGlzLmNoYW5nZWRTdGFydD10aGlzLmNoYW5nZWRTdGFydC5iaW5kKHRoaXMpXG5cdFx0dGhpcy5jaGFuZ2VkRW5kPXRoaXMuY2hhbmdlZEVuZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMudXBkYXRlU3RhcnQ9dGhpcy51cGRhdGVTdGFydC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMudXBkYXRlRW5kPXRoaXMudXBkYXRlRW5kLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5kZWxldGU9dGhpcy5kZWxldGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmtleVByZXNzZWRTdGFydD10aGlzLmtleVByZXNzZWRTdGFydC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMua2V5UHJlc3NlZEVuZD10aGlzLmtleVByZXNzZWRFbmQuYmluZCh0aGlzKTtcblx0fVxuXHRjaGFuZ2VkU3RhcnQoZSl7XG5cdFx0dGhpcy5wcm9wcy50aW1lQ2hhbmdlZCAgKCdzdGFydCcsdGhpcy5wcm9wcy5lbXBsb3llZSx0aGlzLnByb3BzLnRpbWVzaGVldCxlLnRhcmdldC52YWx1ZSk7XG5cdH1cblx0Y2hhbmdlZEVuZChlKXtcblx0XHR0aGlzLnByb3BzLnRpbWVDaGFuZ2VkKCdlbmQnLHRoaXMucHJvcHMuZW1wbG95ZWUsdGhpcy5wcm9wcy50aW1lc2hlZXQsZS50YXJnZXQudmFsdWUpO1xuXHR9XG5cdHVwZGF0ZVN0YXJ0KGUpe1xuXHRcdGlmKGUudGFyZ2V0LnZhbHVlIT0nJyl7XG5cdFx0XHR0aGlzLnByb3BzLnVwZGF0ZVRpbWUoJ3N0YXJ0Jyx0aGlzLnByb3BzLmVtcGxveWVlLHRoaXMucHJvcHMudGltZXNoZWV0LCBlLnRhcmdldC52YWx1ZSk7XG5cdFx0fVxuXHR9XG5cdHVwZGF0ZUVuZChlKXtcblx0XHRpZihlLnRhcmdldC52YWx1ZSE9Jycpe1xuXHRcdFx0dGhpcy5wcm9wcy51cGRhdGVUaW1lKCdlbmQnLHRoaXMucHJvcHMuZW1wbG95ZWUsdGhpcy5wcm9wcy50aW1lc2hlZXQsIGUudGFyZ2V0LnZhbHVlKTtcblx0XHR9XG5cdH1cblx0ZGVsZXRlKGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR0aGlzLnByb3BzLmRlbGV0ZUVtcGxveWVlKHRoaXMucHJvcHMuZW1wbG95ZWUsdGhpcy5wcm9wcy50aW1lc2hlZXQpO1xuXHR9XG5cdGtleVByZXNzZWRTdGFydChlKSB7XG5cdCAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcblx0ICAgIFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHQgICAgXHRpZih0aGlzLnByb3BzLnN0YXJ0IT0nJyl7XG5cdFx0XHRcdHRoaXMucHJvcHMudXBkYXRlVGltZSgnc3RhcnQnLHRoaXMucHJvcHMuZW1wbG95ZWUsdGhpcy5wcm9wcy50aW1lc2hlZXQsIHRoaXMucHJvcHMuc3RhcnQpO1xuXHRcdFx0fVxuXHQgICAgfVxuXHQgfVxuXHRrZXlQcmVzc2VkRW5kKGUpIHtcblx0ICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xuXHQgICAgXHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdCAgICBcdGlmKHRoaXMucHJvcHMuZW5kIT0nJyl7XG5cdFx0XHRcdHRoaXMucHJvcHMudXBkYXRlVGltZSgnc3RhcnQnLHRoaXMucHJvcHMuZW1wbG95ZWUsdGhpcy5wcm9wcy50aW1lc2hlZXQsIHRoaXMucHJvcHMuZW5kKTtcblx0XHRcdH1cblx0ICAgIH1cblx0IH1cblx0cmVuZGVyKCl7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGxpIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaXRlbVwiID5cblx0XHRcdFx0PGZvcm0gIGNsYXNzTmFtZT1cImZvcm0taW5saW5lIHJvdyBkYXlfdGltZV9mb3JtX3Jvd1wiPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsIGNvbC1tZC0zIGNvbC1zbS0zIGNvbC14cy0xMiB0ZXh0LWNlbnRlciBkYXlfdGltZV9mb3JtX3Jvd19lbGVtZW50XCI+PHN0cm9uZz57IHRoaXMucHJvcHMuZW1wbG95ZWVfbmFtZX08L3N0cm9uZz48L2xhYmVsPlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtMyBjb2wtc20tMyBjb2wteHMtMTIgZGF5X3RpbWVfZm9ybV9yb3dfZWxlbWVudFwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cFwiPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwLWFkZG9uXCI+U3RhcnQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGlucHV0IFxuXHRcdFx0XHRcdFx0XHRcdHR5cGU9XCJ0aW1lXCIgXG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIHN0YXJ0XCIgXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU9e3RoaXMucHJvcHMuc3RhcnR9XG5cdFx0XHRcdFx0XHRcdFx0b25CbHVyPXt0aGlzLnVwZGF0ZVN0YXJ0fVxuXHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmNoYW5nZWRTdGFydH1cblx0XHRcdFx0XHRcdFx0XHRvbktleVByZXNzPXt0aGlzLmtleVByZXNzZWRTdGFydH1cblxuXHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtMyBjb2wtc20tMyBjb2wteHMtMTIgZGF5X3RpbWVfZm9ybV9yb3dfZWxlbWVudFwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cFwiPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwLWFkZG9uXCI+RW5kPC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxpbnB1dCBcblx0XHRcdFx0XHRcdFx0XHR0eXBlPVwidGltZVwiIFxuXHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCBlbmRcIiBcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17dGhpcy5wcm9wcy5lbmR9XG5cdFx0XHRcdFx0XHRcdFx0b25CbHVyPXt0aGlzLnVwZGF0ZUVuZH1cblx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5jaGFuZ2VkRW5kfVxuXHRcdFx0XHRcdFx0XHRcdG9uS2V5UHJlc3M9e3RoaXMua2V5UHJlc3NlZEVuZH1cblx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtMyBjb2wtc20tMyBjb2wteHMtMTIgdGV4dC1jZW50ZXIgZGF5X3RpbWVfZm9ybV9yb3dfZWxlbWVudFwiPlxuXHRcdFx0XHRcdFx0PGJ1dHRvbiBcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiZGVsZXRlIGJ0biBidG4tZGFuZ2VyXCJcblx0XHRcdFx0XHRcdFx0b25DbGljaz17dGhpcy5kZWxldGV9XG5cdFx0XHRcdFx0XHQ+RGVsZXRlPC9idXR0b24+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZm9ybT5cblx0XHRcdDwvbGk+XG5cdFx0KTtcblx0fVxufSIsIi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaW1lU2hlZXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0LyogICAgIERvIHRoZSBiaW5kIHRoaW5nICAgICAgKi9cblx0XHR0aGlzLmF1dG9jb21wbGV0ZT10aGlzLmF1dG9jb21wbGV0ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuYWRkQ2hhbmdlZD10aGlzLmFkZENoYW5nZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLmFkZENsaWNrZWQ9dGhpcy5hZGRDbGlja2VkLmJpbmQodGhpcyk7XG5cdH1cblxuXHRhdXRvY29tcGxldGUoaW5wdXQpe1xuXHRcdHZhciBjb25maWcgPSB7XG5cdFx0XHRtaW5DaGFyczogMCxcblx0XHRcdG1heEl0ZW1zOiA5OSxcblx0XHRcdGF1dG9GaXJzdDogdHJ1ZSxcblx0XHRcdGZpbHRlcjogZnVuY3Rpb24oaXRlbSwgaW5wdXQpIHtcblx0XHRcdFx0dmFyIHZhbHVlID0gaXRlbS52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRpZih2YWx1ZS5pbmRleE9mKCdpc19hY3Rpb24nKSAhPT0gLTEgfHxcblx0XHRcdFx0XHR2YWx1ZS5pbmRleE9mKGlucHV0KSAhPT0gLTEpIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGl0ZW06IGZ1bmN0aW9uKGl0ZW0sIGlucHV0KSB7XG5cdFx0XHRcdHZhciBkID0gaXRlbTtcblx0XHRcdFx0dmFyIGh0bWwgPSBcIjxzcGFuPlwiICsgX18oaXRlbS5sYWJlbCB8fCBpdGVtLnZhbHVlKSArIFwiPC9zcGFuPlwiO1xuXHRcdFx0XHRyZXR1cm4gJCgnPGxpPjwvbGk+Jylcblx0XHRcdFx0XHQuZGF0YSgnaXRlbS5hdXRvY29tcGxldGUnLCBpdGVtKVxuXHRcdFx0XHRcdC5odG1sKCc8YT48cD4nICsgaHRtbCArICc8L3A+PC9hPicpXG5cdFx0XHRcdFx0LmdldCgwKTtcblx0XHRcdH1cblx0XHR9O1xuXHRcdHZhciBhdyA9IG5ldyBBd2Vzb21wbGV0ZShpbnB1dCxjb25maWcpO1xuXHRcdGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXG5cdFx0XHQnYXdlc29tcGxldGUtc2VsZWN0Y29tcGxldGUnLFxuXHRcdFx0XHR0aGlzLmFkZENoYW5nZWRcblx0XHQpO1xuXHRcdGF3Lmxpc3Q9cHMuZW1wbG95ZWVfbGFibGVzXG5cdFx0JChkb2N1bWVudCkuYmluZCgnZW1wbG95ZWVMYWJsZXNMb2FkZWQnLGZ1bmN0aW9uKCl7XG5cdFx0XHRhdy5saXN0PXBzLmVtcGxveWVlX2xhYmxlcztcblx0XHR9KTtcblx0fVxuXHRhZGRDaGFuZ2VkKGUpe1xuXHRcdHRoaXMuYWRkPWUudGFyZ2V0LnZhbHVlO1xuXHR9O1xuXHRhZGRDbGlja2VkKGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR2YXIgd29fbmFtZT10aGlzLnByb3BzLm5hbWU7XG5cdFx0dmFyIGVtcGxveWVlX25hbWU9dGhpcy5hZGQ7XG5cdFx0Ly9DYWxsIGJhY2sgZm9yIGJpbmRpbmc/XG5cdFx0dmFyIHVwZGF0ZUNhbGxiYWNrPWZ1bmN0aW9uKGluZGV4KXtcblx0XHRcdHJldHVybiBmdW5jdGlvbihkYXRhKXtcdFx0XHRcblx0XHRcdFx0dGhpcy51cGRhdGVGcm9tU2VydmVyUGFyYW0oZGF0YSxpbmRleCk7XG5cdFx0XHR9LmJpbmQodGhpcyk7XG5cdFx0fS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMucHJvcHMuYWRkRW1wbG95ZWUod29fbmFtZSwgZW1wbG95ZWVfbmFtZSk7XG5cdH07XG5cdHJlbmRlcigpe1xuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFuZWwgcGFuZWwtZGVmYXVsdCByb3dcIj5cblxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWhlYWRpbmdcIj5cblx0XHRcdFx0XHQ8aDQgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj4gVGltZSBTaGVldCB7dGhpcy5wcm9wcy5kYXRlfSBmb3Ige3RoaXMucHJvcHMuY3Jld30gPC9oND5cblx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0PHVsIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXBcIiA+XG5cdFx0XHRcdFx0PGRpdiBpZD0nZm9ybXMnPlxuXHRcdFx0XHRcdFx0e3RoaXMucHJvcHMuZW1wbG95ZWVzfVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L3VsPlxuXHRcdFx0ICBcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYW5lbC1mb290ZXIgY29sLW1kLTEyIHRleHQtbGVmdCBsaXN0LWdyb3VwLWl0ZW1cIj5cblx0XHRcdFx0XHQ8Zm9ybSBjbGFzc05hbWU9XCJmb3JtLWlubGluZSByb3cgXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIGNvbC1tZC0zIGNvbC1zbS0yIGNvbC14cy0xMiB1cGRhdGVfZGl2X2VsZW1lbnRcIj5cblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1zdWNjZXNzXCI+VXBkYXRlPC9idXR0b24+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidGV4dC1yaWdodCBjb2wtbWQtNiBjb2wtc20tNiBjb2wteHMtNCBcIj5cblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiBcblx0XHRcdFx0XHRcdFx0XHR0eXBlPVwic3VibWl0XCIgXG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCJcblx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLmFkZENsaWNrZWR9XG5cdFx0XHRcdFx0XHRcdFx0PisgQWRkPC9idXR0b24+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCB0ZXh0LWxlZnQgY29sLW1kLTMgY29sLXNtLTQgY29sLXhzLTYgXCI+PGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cFwiPlxuXHRcdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIiBcblx0XHRcdFx0XHRcdFx0XHRyZWY9e3RoaXMuYXV0b2NvbXBsZXRlfVxuICAgICAgICAgIFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmFkZENoYW5nZWR9IFxuICAgICAgICAgIFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cIm5ld19lbXBsb3llZXMgZm9ybS1jb250cm9sIGF3ZXNvbXBsZXRlXCIgXG4gICAgICAgICAgXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9XCJlbXBsb3llZVwiIC8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj48L2Rpdj5cblx0XHRcdFx0XHQ8L2Zvcm0+XG5cdFx0XHRcdFx0XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG4iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmltcG9ydCBXb3Jrb3JkZXJUYXNrIGZyb20gJy4vd29ya29yZGVyVGFzayc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF5c1dvcmtvcmRlcnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dmFyIGFyZ3M9e307XG5cdFx0YXJncy5jcmV3PXRoaXMucHJvcHMuY3Jldztcblx0XHRhcmdzLmRhdGU9dGhpcy5wcm9wcy5kYXRlO1xuXG5cdFx0LyogICBEbyB0aGUgYmluZCB0aGluZyAgKi9cblx0XHR0aGlzLm9uVGFza0NoZWNrZWQ9dGhpcy5vblRhc2tDaGVja2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5vblN0YXR1c0NoYW5nZWQ9dGhpcy5vblN0YXR1c0NoYW5nZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnVwZGF0ZUZyb21TZXJ2ZXI9dGhpcy51cGRhdGVGcm9tU2VydmVyLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5zb2NrZXRVcGRhdGU9dGhpcy5zb2NrZXRVcGRhdGUuYmluZCh0aGlzKTtcblx0XHQvL3RoaXMud29ya29yZGVyT2JqPXRoaXMub25TdGF0dXNDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0LyogICAgICAgICAgZW5kICAgICAgICAgICovXG5cblx0XHR0aGlzLnN0YXRlPXt3b3Jrb3JkZXJzOltdfTtcblx0XHR0aGlzLndvcmtvcmRlclRvb2w9cHMuaW5pdFdvcmtvcmRlcigpO1xuXHRcdHRoaXMud29ya29yZGVyVG9vbC5nZXQoYXJncyxmdW5jdGlvbigpe1xuXHRcdFx0dGhpcy51cGRhdGVGcm9tU2VydmVyKCk7XG5cdFx0XHR0aGlzLndvcmtvcmRlclRvb2wucmVhY3RTZXR1cCh0aGlzLnVwZGF0ZUZyb21TZXJ2ZXIpO1xuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0aWYgKHRoaXMud29ya29yZGVyVG9vbC5pdGVtcz09PXVuZGVmaW5lZCB8fHRoaXMud29ya29yZGVyVG9vbC5pdGVtcz09PSAwICl7XG5cblx0XHR9ZWxzZXt0aGlzLnN0YXRlLndvcmtvcmRlcnM9dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zO31cblx0fVxuXHRzb2NrZXRVcGRhdGUoKXtcblxuXHR9XG5cdG9uVGFza0NoZWNrZWQod29faW5kZXgsaW5kZXgsY2hlY2spe1xuXHRcdHRoaXMud29ya29yZGVyVG9vbC5pdGVtc1t3b19pbmRleF0uc3VidGFza1tpbmRleF0uc3RhdHVzPWNoZWNrPzA6MTtcblx0XHR0aGlzLnNldFN0YXRlKHt3b3Jrb3JkZXJzOnRoaXMud29ya29yZGVyVG9vbC5pdGVtc30pO1xuXHRcdHRoaXMud29ya29yZGVyVG9vbC51cGRhdGUodGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zW3dvX2luZGV4XSk7XG5cdFx0dmFyIGNoZWNrZWRUZXh0PWNoZWNrP1widW5jaGVja2VkLlwiOlwiY2hlY2tlZC5cIlxuXHRcdC8vcHMuc3VjY2Vzc0FsZXJ0KHRoaXMud29ya29yZGVyVG9vbC5pdGVtc1t3b19pbmRleF0uc3VidGFza1tpbmRleF0udGFzayArXCIgXCIrIGNoZWNrZWRUZXh0ICk7XG5cdH1cblx0b25TdGF0dXNDaGFuZ2VkKHN0YXR1cywgaW5kZXgpe1xuXHRcdHRoaXMud29ya29yZGVyVG9vbC5pdGVtc1tpbmRleF0uc3RhdHVzPXN0YXR1cztcblx0XHR0aGlzLnNldFN0YXRlKHt3b3Jrb3JkZXJzOnRoaXMud29ya29yZGVyVG9vbC5pdGVtc30pO1xuXHRcdHRoaXMud29ya29yZGVyVG9vbC51cGRhdGUodGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zW2luZGV4XSk7XG5cdFx0aWYoc3RhdHVzPT1cIkNvbXBsZXRlXCIpe1xuXHRcdFx0cHMuc3VjY2Vzc0FsZXJ0KFwiV29ya29yZGVyIGNvbXBsZXRlZCFcIik7XG5cdFx0fVxuXHR9XG5cdHVwZGF0ZUZyb21TZXJ2ZXIoKXtcblx0XHR0aGlzLnNldFN0YXRlKHt3b3Jrb3JkZXJzOnRoaXMud29ya29yZGVyVG9vbC5pdGVtc30pO1xuXHR9XG5cdHdvcmtvcmRlck9iaihpdGVtLGluZGV4KXtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8V29ya29yZGVyVGFzayBcblx0XHRcdFx0a2V5PXtpbmRleH0gXG5cdFx0XHRcdGluZGV4PXtpbmRleH0gXG5cdFx0XHRcdGxvY2F0aW9uX3JvdXRlPXtpdGVtLmxvY2F0aW9uX3JvdXRlfVxuXHRcdFx0XHRsb2NhdGlvbj17aXRlbS5sb2NhdGlvbn1cblx0XHRcdFx0dGFza3M9e2l0ZW0uc3VidGFza31cblx0XHRcdFx0c3RhdHVzPXtpdGVtLnN0YXR1c31cblx0XHRcdFx0d29ya29yZGVyPXtpdGVtLm5hbWV9XG5cdFx0XHRcdG9uVGFza0NoZWNrZWQ9e3RoaXMub25UYXNrQ2hlY2tlZH1cblx0XHRcdFx0b25TdGF0dXNDaGFuZ2VkPXt0aGlzLm9uU3RhdHVzQ2hhbmdlZH1cblx0XHRcdFx0cm91dGU9e2l0ZW0ucm91dGV9XG5cdFx0XHQvPlxuXHRcdCk7XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vICAgICAgICBSZW5kZXJcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRyZW5kZXIoKXtcblx0XHRpZiAodGhpcy5zdGF0ZS53b3Jrb3JkZXJzPT09MHx8dGhpcy5zdGF0ZS53b3Jrb3JkZXJzPT09dW5kZWZpbmVkKXtcblx0XHRcdHJldHVybiAoPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPjxoMz5ObyBXb3Jrb3JkZXJzPC9oMz48L2Rpdj4pO1xuXHRcdH1cblx0XHR2YXIgdG9kbz1bXTtcblx0XHR2YXIgY29tcGxldGU9W107XG5cdFx0dGhpcy5zdGF0ZS53b3Jrb3JkZXJzLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCl7XG5cdFx0XHRpZiAoaXRlbS5zdGF0dXMhPSdDb21wbGV0ZScmJml0ZW0uc3RhdHVzIT0nSW5jb21wbGV0ZScpe1xuXHRcdFx0XHR0b2RvLnB1c2godGhpcy53b3Jrb3JkZXJPYmooaXRlbSxpbmRleCkpO1xuXHRcdFx0XHRpZih0b2RvLmxlbmd0aCUzPT09MCl7dG9kby5wdXNoKDxkaXYgY2xhc3NOYW1lPSdjbGVhcmZpeCc+PC9kaXY+KX1cblx0XHRcdH1lbHNle1xuXHRcdFx0XHRjb21wbGV0ZS5wdXNoKHRoaXMud29ya29yZGVyT2JqKGl0ZW0saW5kZXgpKTtcblx0XHRcdFx0aWYoY29tcGxldGUubGVuZ3RoJTM9PT0wKXtjb21wbGV0ZS5wdXNoKDxkaXYgY2xhc3NOYW1lPSdjbGVhcmZpeCc+PC9kaXY+KX1cblx0XHRcdH1cblx0XHR9LmJpbmQodGhpcykpO1xuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwid29ya29yZGVyX2NvbnRhaW5lclwiPlxuXHRcdFx0XHQ8ZGl2Pjxici8+XG5cdFx0XHRcdFx0e3RvZG99XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNsZWFyZml4XCI+PC9kaXY+XG5cdFx0XHRcdDxkaXY+PGgzPkNvbXBsZXRlIFdvcmtvcmRlcnM8L2gzPlxuXHRcdFx0XHRcdHtjb21wbGV0ZX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXG5cdH07XHRcbn1cbiIsIi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFza0NoZWNrIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdGNvbnNvbGUubG9nKHRoaXMucHJvcHMuY2hlY2tlZCk7XG5cdFx0dGhpcy50YXNrQ2hlY2tlZCA9IHRoaXMudGFza0NoZWNrZWQuYmluZCh0aGlzKTtcblx0fVxuXHR0YXNrQ2hlY2tlZChlKXtcblx0XHR0aGlzLnByb3BzLnRhc2tDaGVja2VkKHRoaXMucHJvcHMuaW5kZXgsIHRoaXMucHJvcHMuY2hlY2tlZCk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3QgY2hlY2tlZCA9IHRoaXMucHJvcHMuY2hlY2tlZCA/IFwibGluZS10aHJvdWdoXCIgOiBcIlwiO1xuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT17Y2hlY2tlZH0+XG5cdFx0XHRcdFx0PGlucHV0IG9uQ2hhbmdlPXt0aGlzLnRhc2tDaGVja2VkfSB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPXt0aGlzLnByb3BzLmNoZWNrZWR9IC8+XG5cdFx0XHRcdFx0e3RoaXMucHJvcHMubGFibGV9XG5cdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XHRcbn0iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmltcG9ydCBNb2RhbCBmcm9tICcuLi91dGlscy9tb2RhbCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3JlYXRlSXNzdWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcylcblx0XHR0aGlzLnBvcFVwPXRoaXMucG9wVXAuYmluZCh0aGlzKTtcblx0XHR0aGlzLnBvcFVwSWQ9XCJjcmVhdGUtaXNzdWUtZm9ybS1cIit0aGlzLnByb3BzLndvcmtvcmRlcjtcblx0fVxuXHR0b29sVGlwKCl7XG5cdFx0JChmdW5jdGlvbiAoKSB7XG5cdFx0IFx0JCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoKTtcblx0XHR9KVxuXHRcdFxuXHR9XG5cdHBvcFVwKCl7XG5cdFx0JCgnIycrdGhpcy5wb3BVcElkKS5tb2RhbCgpO1xuXHR9XG5cdHN1Ym1pdCgpe1xuXHRcdHRoaXMub2JqVG9vbD1wcy5pbml0SXNzdWUoKTtcblx0XHRwcy5pbml0SXNzdWUudXBkYXRlKCk7XG5cdFx0Y29uc29sZS5sb2coXCJzYXZlXCIpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidGV4dC1yaWdodFwiPlxuXHRcdFx0XHQ8YnV0dG9uIFxuXHRcdFx0XHRcdGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBcblx0XHRcdFx0XHRkYXRhLXRhcmdldD17XCIjXCIrdGhpcy5wb3BVcElkfVxuXHRcdFx0XHQgXHR0eXBlPVwiYnV0dG9uXCIgXG5cdFx0XHRcdCBcdGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdCBidG4teHMgY3JlYXRlLWlzc3VlXCIgXG5cdFx0XHRcdCBcdGFyaWEtbGFiZWw9XCJDcmVhdGUgSXNzdWVcIiBcblx0XHRcdFx0IFx0ZGF0YS10b2dnbGU9XCJ0b29sdGlwXCIgXG5cdFx0XHRcdCBcdGRhdGEtcGxhY2VtZW50PVwidG9wXCIgXG5cdFx0XHRcdCBcdHRpdGxlPVwiSXNzdWVcIiBcblx0XHRcdFx0XHRyZWY9e3RoaXMudG9vbFRpcH0gXG5cdFx0XHRcdFx0b25DbGljaz17IHRoaXMucG9wVXB9ID5cblxuXHRcdFx0XHQgXHQ8c3BhbiBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLWV4Y2xhbWF0aW9uLXNpZ25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XG5cdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHQ8TW9kYWwgXG5cdFx0XHRcdFx0aWQ9e3RoaXMucG9wVXBJZH0gXG5cdFx0XHRcdFx0c3VibWl0VGV4dD1cIlN1Ym1pdFwiIFxuXHRcdFx0XHRcdHRpdGxlPVwiQ3JlYXRlIElzc3VlIEZvciBWaW5leWFyZFwiXG5cdFx0XHRcdFx0c3VibWl0PXt0aGlzLnN1Ym1pdH0+XG5cblx0XHRcdFx0XHRcdDxmaWVsZHNldD5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRcdFx0PGxhYmVsPklzc3VlIFRpdGxlPC9sYWJlbD5cblx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIklzc3VlIFRpdGxlXCIgLz5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdFx0XHRcdFx0XHRcdDxsYWJlbD5Qcmlvcml0eTwvbGFiZWw+XG5cdFx0XHRcdFx0XHRcdFx0PHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiA+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8b3B0aW9uPkxvdzwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0XHRcdFx0PG9wdGlvbj5NZWRpdW08L29wdGlvbj5cblx0XHRcdFx0XHRcdFx0XHRcdDxvcHRpb24+SGlnaDwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0XHRcdFx0PG9wdGlvbj5Dcml0aWNhbDwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0XHRcdDwvc2VsZWN0PlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRcdCAgXHQ8bGFiZWw+SXNzdWUgRGV0YWlsczo8L2xhYmVsPlxuXHRcdFx0XHRcdFx0XHQgIFx0PHRleHRhcmVhIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHJvd3M9XCIzXCIgcGxhY2Vob2xkZXI9XCJJc3N1ZSBEZXRhaWxzXCI+PC90ZXh0YXJlYT5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8L2ZpZWxkc2V0PlxuXG5cdFx0XHRcdDwvTW9kYWw+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cblxuIiwiXG4vKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmltcG9ydCBUYXNrQ2hlY2sgZnJvbSAnLi9UYXNrQ2hlY2snXG5pbXBvcnQgQ3JlYXRlSXNzdWUgZnJvbSAnLi9jcmVhdGVJc3N1ZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29ya29yZGVyVGFzayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnN0YXRlID17dGl0bGU6XCJkZXJla1wifTtcblx0XHR0aGlzLnRhc2tDaGVja2VkPXRoaXMudGFza0NoZWNrZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnN0YXR1c0NoYW5nZT10aGlzLnN0YXR1c0NoYW5nZS5iaW5kKHRoaXMpO1xuXHR9XG5cdHRhc2tDaGVja2VkKGUpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe3RpdGxlOlwiQ0hFQ0tFRFwifSk7XG5cdH1cblx0aXNDaGVja2VkKHZhbHVlKXtcbiAgICBcdHJldHVybiAoKHZhbHVlPT09dGhpcy5zdGF0ZS5zZWxlY3RlZCkgPydjaGVja2VkIGxpbmUtdGhyb3VnaCc6J2RlZmF1bHQnKTtcbiAgXHR9XG4gIFx0dGFza0NoZWNrZWQoaW5kZXgsY2hlY2tlZCl7XG4gIFx0XHR2YXIgd29faW5kZXg9dGhpcy5wcm9wcy5pbmRleDtcbiAgXHRcdHRoaXMucHJvcHMub25UYXNrQ2hlY2tlZCh3b19pbmRleCxpbmRleCxjaGVja2VkKTtcbiAgXHR9XG4gIFx0c3RhdHVzQ2hhbmdlKGUpe1xuICBcdFx0dGhpcy5wcm9wcy5vblN0YXR1c0NoYW5nZWQoZS50YXJnZXQudmFsdWUsdGhpcy5wcm9wcy5pbmRleCk7XG5cbiAgXHR9XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHRpdGxlPVwid2VsY29tZVwiO1xuXHRcdHZhciBtYWluQ2xhc3M9e1xuXHRcdFx0J0NvbXBsZXRlJzoncGFuZWwtc3VjY2VzcycsXG5cdFx0XHQnSW5jb21wbGV0ZSc6J3BhbmVsLWRhbmdlcicsXG5cdFx0XHQnUGVuZGluZyc6J3BhbmVsLWRlZmF1bHQnLFxuXHRcdFx0J1N0YXJ0ZWQnOidwYW5lbC13YXJuaW5nJ1xuXHRcdH1bdGhpcy5wcm9wcy5zdGF0dXNdO1xuXHRcdG1haW5DbGFzcyA9IG1haW5DbGFzcyArIFwiIHBhbmVsIHdvcmtvcmRlclwiO1xuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPSdjb2wtbWQtNCBjb2wtc20tNCc+XG5cdFx0XHQ8ZGl2IGlkPVwiXCIgY2xhc3NOYW1lPXttYWluQ2xhc3N9PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWhlYWRpbmdcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuXHRcdFx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInBhbmVsLXRpdGxlIGNvbC14cy0xMFwiPlxuXHRcdFx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9XCJmbG9hdC1sZWZ0XCIgaHJlZj17dGhpcy5wcm9wcy5sb2NhdGlvbl9yb3V0ZX0+e3RoaXMucHJvcHMubG9jYXRpb259PC9hPlxuXHRcdFx0XHRcdFx0PC9oMz5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTIgY3JlYXRlLWlzc3VlLWhlYWRlci1idXR0b24tY29udGFpbmVyXCIgPlxuXHRcdFx0XHRcdFx0XHQ8Q3JlYXRlSXNzdWVcblx0XHRcdFx0XHRcdFx0XHR3b3Jrb3JkZXI9e3RoaXMucHJvcHMud29ya29yZGVyfVxuXHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcblxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYW5lbC1ib2R5XCI+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWxcIj5TdGF0dXM8L2xhYmVsPlxuXHRcdFx0XHRcdDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIHN0YXR1c1wiIHZhbHVlPXt0aGlzLnByb3BzLnN0YXR1c30gb25DaGFuZ2U9e3RoaXMuc3RhdHVzQ2hhbmdlfT5cblx0XHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9XCJQZW5kaW5nXCI+UGVuZGluZzwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIlN0YXJ0ZWRcIj5TdGFydGVkPC9vcHRpb24+XG5cdFx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPVwiQ29tcGxldGVcIj5Db21wbGV0ZTwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIkluY29tcGxldGVcIj5JbmNvbXBsZXRlPC9vcHRpb24+XG5cdFx0XHRcdFx0PC9zZWxlY3Q+XG5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoZWNrX2JveGVzXCI+XG5cdFx0XHRcdFx0XHR7dGhpcy5wcm9wcy50YXNrcy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXHRcdFx0XHRcdFx0XHR2YXIgY2hlY2tlZD1pdGVtLnN0YXR1cz90cnVlOmZhbHNlO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gKDxUYXNrQ2hlY2sga2V5PXtpbmRleH0gaW5kZXg9e2luZGV4fSBsYWJsZT17aXRlbS50YXNrfSBjaGVja2VkPXtjaGVja2VkfSB0YXNrQ2hlY2tlZD17dGhpcy50YXNrQ2hlY2tlZH0vPik7XG5cdFx0XHRcdFx0XHR9LmJpbmQodGhpcykpfVxuXG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRcdDxhIGNsYXNzTmFtZT1cIlwiIGhyZWY9e3RoaXMucHJvcHMucm91dGV9Pk1vcmUgSW5mb3JtYXRpb248L2E+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cblxuXG4iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RhbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnN1Ym1pdD10aGlzLnN1Ym1pdC5iaW5kKHRoaXMpO1xuXHR9XG5cdHN1Ym1pdChlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5wcm9wcy5zdWJtaXQoKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsIGZhZGUgdGV4dC1sZWZ0IHBhbmVsLWRlZmF1bHRcIiBpZD17dGhpcy5wcm9wcy5pZH0gdGFiSW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiBhcmlhLWxhYmVsbGVkYnk9XCJleGFtcGxlTW9kYWxMYWJlbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZ1wiIHJvbGU9XCJkb2N1bWVudFwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1oZWFkZXJcIj5cblx0XHRcdFx0XHRcdFx0PGg0IGNsYXNzTmFtZT1cIm1vZGFsLXRpdGxlXCIgaWQ9XCJleGFtcGxlTW9kYWxMYWJlbFwiPnt0aGlzLnByb3BzLnRpdGxlfTwvaDQ+XG5cdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGRpc3BsYXk9XCJub25lXCIgY2xhc3NOYW1lPVwiY2xvc2UgaGlkZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+XG5cdFx0XHRcdFx0XHRcdDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+XG5cdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8Zm9ybT5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XG5cdFx0XHRcdFx0XHRcdFx0eyB0aGlzLnByb3BzLmNoaWxkcmVuIH1cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZm9vdGVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNsb3NlPC9idXR0b24+XG5cdFx0XHRcdFx0XHRcdFx0PGJ1dHRvbiBcblx0XHRcdFx0XHRcdFx0XHRcdHR5cGU9XCJzdWJtaXRcIiBcblx0XHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMuc3VibWl0fSBcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiID5cblx0XHRcdFx0XHRcdFx0XHRcdFx0e3RoaXMucHJvcHMuc3VibWl0VGV4dH1cblx0XHRcdFx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8L2Zvcm0+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5cbiIsIi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuaW1wb3J0IERheXNXb3Jrb3JkZXJzIGZyb20gJy4uLy4uL3B1YmxpYy9qcy9tb2R1bGVzL2RheXNfd29ya29yZGVycy9EYXlzV29ya29yZGVycydcbmltcG9ydCBEYXlzVGltZXNoZWV0cyBmcm9tICcuLi8uLi9wdWJsaWMvanMvbW9kdWxlcy9kYXlzX3RpbWVzaGVldHMvRGF5c1RpbWVTaGVldHMnXG5cbi8vY29uc3QgYXBwPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJyk7XG5jb25zdCBhcHA9ICQoJyNhcHAnKVswXTtcbmNvbnN0IHRpbWVzaGVldHM9ICQoJyN0aW1lJylbMF07XG5cbmNsYXNzIFdvcmtQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXG5cdFx0LyogYmluZCBkaW5nIGRpbmcgKi9cblx0XHR0aGlzLm1haW5DbGlja2VkPXRoaXMubWFpbkNsaWNrZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLndvcmtvcmRlcnNDbGlja2VkPXRoaXMud29ya29yZGVyc0NsaWNrZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnRpbWVzaGVldENsaWNrZWQ9dGhpcy50aW1lc2hlZXRDbGlja2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5oYW5kZWxDbG9ja0luPXRoaXMuaGFuZGVsQ2xvY2tJbi5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuaGFuZGVsUm91dGU9dGhpcy5oYW5kZWxSb3V0ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuc3RhdGVVcGRhdGU9dGhpcy5zdGF0ZVVwZGF0ZS5iaW5kKHRoaXMpO1xuXHRcdFxuXG5cdFx0Ly9IYW5kZWwgVXNlciBsT2FkXG5cdFx0dGhpcy5jdXJyZW50VXNlcj1wcy5pbml0Q3VycmVudFVzZXIoKTtcblx0XHR0aGlzLmN1cnJlbnRVc2VyLmdldCh7fSxmdW5jdGlvbihpdGVtcyl7XG5cdFx0XHRpZih0aGlzLmN1cnJlbnRVc2VyLml0ZW1zLnVzZXJuYW1lPT1cIkd1ZXN0XCIpe1xuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24gPSBcIi9sb2dpblwiO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdCQoZG9jdW1lbnQpLnRyaWdnZXIoXCJ1c2VyTG9hZGVkXCIpO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcImFmdGVyIExvYWRcIix0aGlzLmN1cnJlbnRVc2VyLml0ZW1zKTtcblx0XHRcdH1cblx0XHR9LmJpbmQodGhpcykpO1xuXHRcdHRoaXMuc3RhdGU9e2l0ZW1zOnRoaXMuY3VycmVudFVzZXIuaXRlbXN9O1xuXHRcdCQoZG9jdW1lbnQpLmJpbmQoJ3VzZXJMb2FkZWQnLHRoaXMuc3RhdGVVcGRhdGUpO1xuXG5cblx0XHQvL1JvdXRpbmdcblx0XHQkKHdpbmRvdykub24oXCJoYXNoY2hhbmdlXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5oYW5kZWxSb3V0ZSgpO1xuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0dmFyIHJvdXRlID0gd2luZG93LmxvY2F0aW9uLmhhc2guc2xpY2UoMSk7XG5cdFx0aWYoIXJvdXRlKSByb3V0ZSA9IFwiI21haW5cIjtcblx0XHR0aGlzLnN0YXRlLnBhZ2U9cm91dGU7XG5cdFx0aWYgKCF3aW5kb3cubG9jYXRpb24uaGFzaCkge1xuXHRcdFx0d2luZG93LmxvY2F0aW9uLmhhc2ggPSBcIiNtYWluXCI7XG5cdFx0fVxuXHRcdCQod2luZG93KS50cmlnZ2VyKFwiaGFzaGNoYW5nZVwiKTtcblxuXHR9XG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0XG5cdH1cblx0c3RhdGVVcGRhdGUoKXtcblx0XHQvL2FsZXJ0KFwidXBkYXRlXCIpO1xuXHRcdHRoaXMuc3RhdGUuaXRlbXM9dGhpcy5jdXJyZW50VXNlci5pdGVtcztcblx0XHR0aGlzLnNldFN0YXRlKHRoaXMuc3RhdGUpO1xuXG5cdH1cblx0aGFuZGVsUm91dGUoKXtcblx0XHR2YXIgcm91dGUgPSB3aW5kb3cubG9jYXRpb24uaGFzaC5zbGljZSgxKTtcblx0XHR2YXIgcGFnZXM9e1xuXHRcdFx0bWFpbjp0aGlzLm1haW5DbGlja2VkLFxuXHRcdFx0d29ya29yZGVyczp0aGlzLndvcmtvcmRlcnNDbGlja2VkLFxuXHRcdFx0dGltZXNoZWV0OnRoaXMudGltZXNoZWV0Q2xpY2tlZFxuXHRcdH1bcm91dGVdKCk7XG5cdH1cblx0aGFuZGVsQ2xvY2tJbigpe1xuXG5cdH1cblx0bWFpbkNsaWNrZWQoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtwYWdlOidtYWluJ30pO1xuXHR9XG5cdHdvcmtvcmRlcnNDbGlja2VkKCl7XG5cblx0XHR0aGlzLnNldFN0YXRlKHtwYWdlOid3b3Jrb3JkZXJzJ30pO1xuXG5cdH1cblx0dGltZXNoZWV0Q2xpY2tlZCgpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe3BhZ2U6J3RpbWVzaGVldCd9KTtcblxuXHR9XG5cdC8vPEFmZml4V3JhcHBlciBjbGFzc05hbWU9XCJzdGlja3lfc3VibmF2IHRleHQtY2VudGVyXCIgIG9mZnNldD17MTQwfSBoZWlnaHQ9XCI0MHB4XCI+PC9BZmZpeFdyYXBwZXI+XG5cdHJlbmRlcigpe1xuXHRcdGNvbnNvbGUubG9nKHRoaXMuc3RhdGUpO1xuXG5cdFx0dmFyIG91dHB1dD0nJztcblx0XHRpZiAodGhpcy5zdGF0ZS5pdGVtcy51c2VybmFtZT09XCJHdWVzdFwifHx0aGlzLnN0YXRlLml0ZW1zLnVzZXJuYW1lPT1cIkFkbWluaXN0cmF0b3JcIil7XG5cdFx0XHRvdXRwdXQ9KDxoMz5HZXVzdCBPciBBZG1pbjwvaDM+KTtcblx0XHR9XG5cdFx0ZWxzZSBpZih0aGlzLnN0YXRlLml0ZW1zLmxlbmd0aD09PTApe1xuXHRcdFx0b3V0cHV0PSg8aDM+Tm8gVXNlciBEYXRhPC9oMz4pO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0b3V0cHV0PShcblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHQ8dWwgY2xhc3NOYW1lPVwibmF2IG5hdi1waWxscyBjZW50ZXItcGlsbHNcIj5cblx0XHRcdFx0XHRcdDxsaSBvbkNsaWNrPXt0aGlzLm1haW5DbGlja2VkfSByb2xlPVwicHJlc2VudGF0aW9uXCIgY2xhc3NOYW1lPXt0aGlzLnN0YXRlLnBhZ2U9PSdtYWluJz8nYWN0aXZlJzonJ30+PGEgaHJlZj1cIiNtYWluXCI+TWFpbjwvYT48L2xpPlxuXHRcdFx0XHRcdFx0PGxpIG9uQ2xpY2s9e3RoaXMud29ya29yZGVyc0NsaWNrZWR9IHJvbGU9XCJwcmVzZW50YXRpb25cIiBjbGFzc05hbWU9e3RoaXMuc3RhdGUucGFnZT09J3dvcmtvcmRlcnMnPydhY3RpdmUnOicnfT48YSBocmVmPVwiI3dvcmtvcmRlcnNcIj5Xb3Jrb3JkZXJzPC9hPjwvbGk+XG5cdFx0XHRcdFx0XHQ8bGkgb25DbGljaz17dGhpcy50aW1lc2hlZXRDbGlja2VkfSByb2xlPVwicHJlc2VudGF0aW9uXCIgY2xhc3NOYW1lPXt0aGlzLnN0YXRlLnBhZ2U9PSd0aW1lc2hlZXQnPydhY3RpdmUnOicnfT48YSBocmVmPVwiI3RpbWVzaGVldFwiPlRpbWUgU2hlZXRzPC9hPjwvbGk+XG5cdFx0XHRcdFx0PC91bD5cblx0XHRcdFx0XHQ8YnIvPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPXt0aGlzLnN0YXRlLnBhZ2U9PSd0aW1lc2hlZXQnIHx8IHRoaXMuc3RhdGUucGFnZT09J21haW4nPycnOidoaWRkZW4nfT5cblx0XHRcdFx0XHRcdDxEYXlzVGltZXNoZWV0cyBcblx0XHRcdFx0XHRcdFx0ZGF0ZT17dGhpcy5zdGF0ZS5pdGVtcy50b2RheX1cblx0XHRcdFx0XHRcdFx0ZnVsbF9uYW1lPXt0aGlzLnN0YXRlLml0ZW1zLmN1cnJlbnRfdXNlci5mdWxsX25hbWV9XG5cdFx0XHRcdFx0XHRcdHBhZ2U9e3RoaXMuc3RhdGUucGFnZX1cblx0XHRcdFx0XHRcdFx0Y3Jldz17dGhpcy5zdGF0ZS5pdGVtcy5jcmV3fVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17dGhpcy5zdGF0ZS5wYWdlPT0nd29ya29yZGVycyc/Jyc6J2hpZGRlbid9PlxuXHRcdFx0XHRcdFx0PERheXNXb3Jrb3JkZXJzIFxuXHRcdFx0XHRcdFx0XHRjcmV3PXt0aGlzLnN0YXRlLml0ZW1zLmNyZXd9IFxuXHRcdFx0XHRcdFx0XHRkYXRlPXt0aGlzLnN0YXRlLml0ZW1zLnRvZGF5fVxuXHRcdFx0XHRcdFx0XHQvL2NvbXBsZXRlZD17dGhpcy5zdGF0ZS5jb21wbGV0ZWR9XG5cdFx0XHRcdFx0XHRcdC8vaW5wcm9ncmVzcz17dGhpcy5zdGF0ZS5pbnByb2dyZXNzfVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHJldHVybig8ZGl2PlxuXHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuKGZ1bmN0aW9uKCl7XG5cdGZyYXBwZS5yZWFkeShmdW5jdGlvbigpe1xuXHRcdFJlYWN0RE9NLnJlbmRlciggXG5cdFx0PFdvcmtQYWdlIC8+XG5cdCwgdGltZXNoZWV0cyApO1xuXHR9KVxuXG59KSgpO1xuXG5cblxuXG5cbiJdfQ==
