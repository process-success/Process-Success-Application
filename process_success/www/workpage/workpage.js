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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c190aW1lc2hlZXRzL0RheXNUaW1lU2hlZXRzLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy9kYXlzX3RpbWVzaGVldHMvY2xvY2tpbi5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c190aW1lc2hlZXRzL2VtcGxveWVlVGltZS5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c190aW1lc2hlZXRzL3RpbWVTaGVldC5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c193b3Jrb3JkZXJzL0RheXNXb3Jrb3JkZXJzLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy9kYXlzX3dvcmtvcmRlcnMvVGFza0NoZWNrLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy9kYXlzX3dvcmtvcmRlcnMvY3JlYXRlSXNzdWUuanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL2RheXNfd29ya29yZGVycy93b3Jrb3JkZXJUYXNrLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9tb2RhbC5qc3giLCJwcm9jZXNzX3N1Y2Nlc3Mvd3d3L3dvcmtwYWdlL3dvcmtwYWdlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OytlQUhBOzs7SUFLcUIsYzs7O0FBQ3BCLHlCQUFZLEtBQVosRUFBa0I7QUFBQTs7QUFBQSw4SEFDWCxLQURXOztBQUVqQixRQUFLLEtBQUwsR0FBVyxFQUFDLE9BQU0sRUFBUCxFQUFY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SyxLQUFMLENBQVcsS0FBWCxDQUFpQjtBQUN2QjtBQUNBO0FBSkQ7QUFERDtBQWZELEtBREQ7QUEwQkE7O0FBRUQsVUFBTztBQUFBO0FBQUE7QUFDTDtBQURLLElBQVA7QUFJQTs7OztFQWxIcUIsTUFBTSxTOztBQXFIN0IsQ0FBQyxZQUFVO0FBQ1YsUUFBTyxLQUFQLENBQWEsWUFBVTtBQUN0QixXQUFTLE1BQVQsQ0FDQSxvQkFBQyxRQUFELE9BREEsRUFFQyxVQUZEO0FBR0EsRUFKRDtBQU1BLENBUEQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5pbXBvcnQgRW1wbG95ZWVUaW1lIGZyb20gJy4vZW1wbG95ZWVUaW1lJztcbmltcG9ydCBUaW1lU2hlZXQgZnJvbSAnLi90aW1lU2hlZXQnO1xuaW1wb3J0IENsb2NrSW4gZnJvbSAnLi9jbG9ja2luJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF5c1RpbWVTaGVldHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5zdGF0ZT17aXRlbXM6W119O1xuXHRcdHRoaXMuc3RhdGUudGltZT0nJztcblx0XHR0aGlzLmFkZD17fTtcblxuXHRcdC8qICAgICBEbyB0aGUgYmluZCB0aGluZyAgICAgICovXG5cblx0XHQvL1RpbWUgZW1wbG95ZWUgbGluZSBpdGVtXG5cdFx0dGhpcy50aW1lQ2hhbmdlZD10aGlzLnRpbWVDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy51cGRhdGVUaW1lPXRoaXMudXBkYXRlVGltZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZGVsZXRlRW1wbG95ZWU9dGhpcy5kZWxldGVFbXBsb3llZS5iaW5kKHRoaXMpO1xuXG5cdFx0dGhpcy51cGRhdGVGcm9tU2VydmVyPXRoaXMudXBkYXRlRnJvbVNlcnZlci5iaW5kKHRoaXMpO1xuXHRcdHRoaXMudGltZVNoZWV0V3JhcHBlcj10aGlzLnRpbWVTaGVldFdyYXBwZXIuYmluZCh0aGlzKTtcblxuXHRcdHRoaXMuYWRkRW1wbG95ZWU9dGhpcy5hZGRFbXBsb3llZS5iaW5kKHRoaXMpXG5cdFx0dGhpcy51cGRhdGVGcm9tU2VydmVyUGFyYW09dGhpcy51cGRhdGVGcm9tU2VydmVyUGFyYW0uYmluZCh0aGlzKTtcblxuXHRcdHRoaXMuY2xvY2tJbj10aGlzLmNsb2NrSW4uYmluZCh0aGlzKTtcblx0XHR0aGlzLmNsb2NrT3V0PXRoaXMuY2xvY2tPdXQuYmluZCh0aGlzKTtcblx0XHQvKiAgICBlbmQgQmluZCBkaW5nIGRpbmcgICAgICAgICAqL1xuXG5cdFx0dGhpcy5hdXRvY29tcGxldGVBcnI9W107XG5cdFx0dmFyIGFyZ3M9e307XG5cblx0XHQvL0dyYWIgdGhlIGVtcGxveWVlIHRpbWVzaGVldCBkYXRhXG5cdFx0dGhpcy5vYmpUb29sPXBzLmluaXRUaW1lU2hlZXRzKClcblx0XHR0aGlzLm9ialRvb2wuZ2V0KHtkYXRlOnByb3BzLmRhdGV9LGZ1bmN0aW9uKCl7XG5cdFx0XHR0aGlzLnVwZGF0ZUZyb21TZXJ2ZXIoKTtcblx0XHRcdHRoaXMub2JqVG9vbC5yZWFjdFNldHVwKHRoaXMudXBkYXRlRnJvbVNlcnZlcik7XG5cdFx0fS5iaW5kKHRoaXMpKTtcblxuXHRcdGlmICh0aGlzLm9ialRvb2wuaXRlbXM9PT11bmRlZmluZWQgfHx0aGlzLm9ialRvb2wuaXRlbXM9PT0gMCApe1xuXHRcdH1lbHNle3RoaXMuc3RhdGUuaXRlbXM9dGhpcy5vYmpUb29sLml0ZW1zO31cblxuXHRcdC8vR3JhYiB0aGUgZW1wbG95ZWUgbGlzdFxuXHRcdHZhciB0b29sPXBzLmluaXRFbXBsb3llZUxpc3QoKTtcblx0XHR0b29sLmdldCh7fSxmdW5jdGlvbigpe1xuXHRcdFx0cHMuZW1wbG95ZWVfbGFibGVzPSB0b29sLml0ZW1zLm1hcChmdW5jdGlvbihvYmopIHsgXG5cdFx0XHRcdHZhciByT2JqID0ge307XG5cdFx0XHRcdHJPYmoubGFiZWw9b2JqLmZ1bGxfbmFtZTtcblx0XHRcdFx0ck9iai52YWx1ZT1vYmoubmFtZTtcblx0XHRcdFx0cmV0dXJuIHJPYmo7XG5cdFx0XHR9KTtcblx0XHRcdCQoZG9jdW1lbnQpLnRyaWdnZXIoXCJlbXBsb3llZUxhYmxlc0xvYWRlZFwiKTtcblx0XHR9KTtcblxuXG5cdFx0XG5cblx0fVxuXG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gaGVscGVyIEZ1bmN0aW9uXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tXG5cdHVwZGF0ZUZyb21TZXJ2ZXIoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtpdGVtczp0aGlzLm9ialRvb2wuaXRlbXN9KTtcblx0fVxuXHR1cGRhdGVGcm9tU2VydmVyUGFyYW0oZGF0YSxpbmRleCl7XG5cdFx0dGhpcy5vYmpUb29sLml0ZW1zW2luZGV4XT1kYXRhO1xuXHRcdHRoaXMuc2V0U3RhdGUoe2l0ZW1zOnRoaXMub2JqVG9vbC5pdGVtc30pO1xuXHR9XG5cdGNyZXdzVGltZXNoZWV0SW5kZXgoY3Jldyl7XG5cdFx0Zm9yICh2YXIgaT0wOyBpIDwgdGhpcy5vYmpUb29sLml0ZW1zLmxlbmd0aDsgaSsrKXtcblx0XHRcdHZhciBpdGVtPXRoaXMub2JqVG9vbC5pdGVtc1tpXTtcblx0XHRcdGlmKGl0ZW0uY3Jldz09Y3Jldyl7XG5cdFx0XHRcdHJldHVybiBpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRnZXRJbmRleFRpbWVzaGVldCh0aW1lc2hlZXQpe1xuXHRcdHJldHVybiB0aGlzLm9ialRvb2wuZ2V0X2luZGV4X29mX2l0ZW0odGltZXNoZWV0KTtcblx0fVxuXHRnZXRJbmRleEVtcGxveWVlKHRpbWVzaGVldEluZGV4LGVtcGxveWVlTmFtZSl7XG5cdFx0dmFyIGVtcGxveWVlcz10aGlzLm9ialRvb2wuaXRlbXNbdGltZXNoZWV0SW5kZXhdLmVtcGxveWVlcztcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGVtcGxveWVlcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRpZiAoZW1wbG95ZWVOYW1lPT1lbXBsb3llZXNbaV0uZW1wbG95ZWUpe1xuXHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdH1cblx0XHR9XG5cblx0fVxuXG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gICAgICAgVGltZXNoZWV0IFdyYXBwZXIgRnVuY3Rpb25zXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHRcblxuXHRjbG9ja0luKHRpbWUsY3Jldyl7XG5cblx0XHR2YXIgdHNfaW5kZXg9dGhpcy5jcmV3c1RpbWVzaGVldEluZGV4KGNyZXcpO1xuXG5cdFx0dGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXM7XG5cdFx0Zm9yICh2YXIgaT0wOyBpIDwgdGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXMubGVuZ3RoOyBpKyspe1xuXHRcdFx0dGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXNbaV0uc3RhcnQ9dGltZTtcblx0XHR9XG5cdFx0dGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5zdGF0dXM9XCJDbG9ja2VkIEluXCI7XG5cdFx0dGhpcy5vYmpUb29sLnVwZGF0ZSh0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdKTtcblx0XHR0aGlzLnNldFN0YXRlKHtpdGVtczp0aGlzLm9ialRvb2wuaXRlbXN9KTtcblx0fVxuXHRjbG9ja091dCh0aW1lLGNyZXcpe1xuXG5cdFx0dmFyIHRzX2luZGV4PXRoaXMuY3Jld3NUaW1lc2hlZXRJbmRleChjcmV3KTtcblxuXHRcdHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzO1xuXHRcdGZvciAodmFyIGk9MDsgaSA8IHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzLmxlbmd0aDsgaSsrKXtcblx0XHRcdHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzW2ldLmVuZD10aW1lO1xuXHRcdH1cblx0XHR0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLnN0YXR1cz1cIkNsb2NrZWQgT3V0XCI7XG5cdFx0dGhpcy5vYmpUb29sLnVwZGF0ZSh0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdKTtcblx0XHR0aGlzLnNldFN0YXRlKHtpdGVtczp0aGlzLm9ialRvb2wuaXRlbXN9KTtcblx0fVxuXHRhZGRFbXBsb3llZSh0c19uYW1lLCBlbXBsb3llZV9uYW1lKXtcblx0XHR2YXIgdHNfaW5kZXggPSB0aGlzLmdldEluZGV4VGltZXNoZWV0KHRzX25hbWUpO1xuXHRcdHZhciBlbXBsb3llZUluZGV4ID0gdGhpcy5nZXRJbmRleEVtcGxveWVlKHRzX2luZGV4LGVtcGxveWVlX25hbWUpO1xuXG5cdFx0dmFyIHVwZGF0ZUNhbGxiYWNrPWZ1bmN0aW9uKGluZGV4KXtcblx0XHRcdHJldHVybiBmdW5jdGlvbihkYXRhKXtcdFx0XHRcblx0XHRcdFx0dGhpcy51cGRhdGVGcm9tU2VydmVyUGFyYW0oZGF0YSxpbmRleCk7XG5cdFx0XHR9LmJpbmQodGhpcyk7XG5cdFx0fS5iaW5kKHRoaXMpO1xuXG5cdFx0Zm9yICh2YXIgaT0wOyBpIDwgdGhpcy5vYmpUb29sLml0ZW1zLmxlbmd0aDsgaSsrKXtcblx0XHRcdHZhciBpdGVtID0gdGhpcy5vYmpUb29sLml0ZW1zW2ldO1xuXHRcdFx0aWYoaXRlbS5uYW1lPT10c19uYW1lKXtcblx0XHRcdFx0Zm9yICh2YXIgeD0wOyB4IDwgaXRlbS5lbXBsb3llZXMubGVuZ3RoOyB4Kyspe1xuXHRcdFx0XHRcdHZhciBjb250YWluZXIgPSBpdGVtLmVtcGxveWVlc1t4XTtcblx0XHRcdFx0XHRpZiAoY29udGFpbmVyLmVtcGxveWVlPT1lbXBsb3llZV9uYW1lKXtcblx0XHRcdFx0XHRcdHJldHVybiBcImR1cGxpY2F0ZVwiO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLm9ialRvb2wuaXRlbXNbaV0uZW1wbG95ZWVzLnB1c2goeyBlbXBsb3llZSA6IGVtcGxveWVlX25hbWUsIG5ldzonMSd9KTtcblx0XHRcdFx0dGhpcy5vYmpUb29sLnVwZGF0ZSh0aGlzLm9ialRvb2wuaXRlbXNbaV0sdXBkYXRlQ2FsbGJhY2soaSksMSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0dmFyIGRvbmU9MTtcblx0XHRcdFx0aWYoaXRlbS5lbXBsb3llZXMubGVuZ3RoPjApe1xuXHRcdFx0XHRcdGZvciAodmFyIHg9MDsgeCA8IGl0ZW0uZW1wbG95ZWVzLmxlbmd0aCAmJiBkb25lOyB4Kyspe1xuXHRcdFx0XHRcdFx0dmFyIGNvbnRhaW5lciA9IGl0ZW0uZW1wbG95ZWVzW3hdO1xuXHRcdFx0XHRcdFx0aWYgKGNvbnRhaW5lci5lbXBsb3llZT09ZW1wbG95ZWVfbmFtZSl7XG5cdFx0XHRcdFx0XHRcdHRoaXMub2JqVG9vbC5pdGVtc1tpXS5lbXBsb3llZXMuc3BsaWNlKHgsIDEpO1xuXHRcdFx0XHRcdFx0XHR0aGlzLm9ialRvb2wuY2hhbmdlZCh0aGlzLm9ialRvb2wuaXRlbXNbaV0pO1xuXHRcdFx0XHRcdFx0XHRkb25lPTA7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdH07XG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vICAgICAgICAgICBUaW1lc2hlZXQgV3JhcHBlclxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVx0XG5cdHRpbWVTaGVldFdyYXBwZXIoaXRlbSxpbmRleCl7XG5cdFx0dmFyIGVtcGxveWVlX291dHB1dD1bXTtcblx0XHRpZihpdGVtLmVtcGxveWVlcz09PXVuZGVmaW5lZCl7XG5cblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdHZhciBlbXBsb3llZU91dHB1dD1pdGVtLmVtcGxveWVlcy5tYXAoZnVuY3Rpb24oaXRlbV9lbXBsb3llZSxpbmRleF9lbXBsb3llZSl7XG5cdFx0XHQgXHRlbXBsb3llZV9vdXRwdXQucHVzaCh0aGlzLmVtcGxveWVlTGluZUl0ZW0oaXRlbV9lbXBsb3llZSxpdGVtLm5hbWUsaW5kZXhfZW1wbG95ZWUpKTtcblx0XHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuKFxuXG5cdFx0XHQ8VGltZVNoZWV0IFxuXHRcdFx0XHRuYW1lPXtpdGVtLm5hbWV9XG5cdFx0XHRcdGRhdGU9e2l0ZW0uZGF0ZX1cblx0XHRcdFx0Y3Jldz17aXRlbS5jcmV3fVxuXHRcdFx0XHRlbXBsb3llZXM9e2VtcGxveWVlX291dHB1dH1cblx0XHRcdFx0YWRkRW1wbG95ZWU9e3RoaXMuYWRkRW1wbG95ZWV9XG5cdFx0XHRcdG9uVXBkYXRlPXt0aGlzLnVwZGF0ZX1cblx0XHRcdC8+XG5cblx0XHQpO1xuXHR9XG5cblxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vICAgICAgIEVtcGxveWVlIFRpbWUgRm9ybSBMaW5laXRlbVxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRkZWxldGVFbXBsb3llZShlbXBsb3llZSx0aW1lc2hlZXQpe1xuXHRcdHZhciB0c19pbmRleCA9IHRoaXMuZ2V0SW5kZXhUaW1lc2hlZXQodGltZXNoZWV0KTtcblx0XHR2YXIgZG9uZT0xO1xuXHRcdHZhciBpdGVtPXRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF07XG5cdFx0aWYoaXRlbS5lbXBsb3llZXMubGVuZ3RoPjApe1xuXHRcdFx0Zm9yICh2YXIgeD0wOyB4IDwgaXRlbS5lbXBsb3llZXMubGVuZ3RoICYmIGRvbmU7IHgrKyl7XG5cdFx0XHRcdHZhciBjb250YWluZXIgPSBpdGVtLmVtcGxveWVlc1t4XTtcblx0XHRcdFx0aWYgKGNvbnRhaW5lci5lbXBsb3llZT09ZW1wbG95ZWUpe1xuXHRcdFx0XHRcdHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzLnNwbGljZSh4LCAxKTtcblx0XHRcdFx0XHQvL8aSY29uc29sZS5sb2codGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XSk7XG5cdFx0XHRcdFx0dGhpcy5vYmpUb29sLnVwZGF0ZSh0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdKTtcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtpdGVtczp0aGlzLm9ialRvb2wuaXRlbXN9KTtcblx0XHRcdFx0XHRkb25lPTA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHR0aW1lQ2hhbmdlZChwb3NpdGlvbixlbXBsb3llZSx0aW1lc2hlZXQsdmFsdWUpe1xuXHRcdHZhciB0c19pbmRleCA9IHRoaXMuZ2V0SW5kZXhUaW1lc2hlZXQodGltZXNoZWV0KTtcblx0XHR2YXIgZW1wbG95ZWVJbmRleCA9IHRoaXMuZ2V0SW5kZXhFbXBsb3llZSh0c19pbmRleCxlbXBsb3llZSk7XG5cdFx0dGhpcy5zdGF0XG5cdFx0aWYocG9zaXRpb249PSdlbmQnKXtcblx0XHRcdHRoaXMuc3RhdGUuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlc1tlbXBsb3llZUluZGV4XS5lbmQ9dmFsdWU7XG5cdFx0fVxuXHRcdGVsc2V7dGhpcy5zdGF0ZS5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzW2VtcGxveWVlSW5kZXhdLnN0YXJ0PXZhbHVlfVxuXHQgICAgdGhpcy5zZXRTdGF0ZSh7aXRlbXM6dGhpcy5zdGF0ZS5pdGVtc30pO1xuXHR9XG5cdHVwZGF0ZVRpbWUocG9zaXRpb24sZW1wbG95ZWUsdGltZXNoZWV0LHZhbHVlKXtcblx0XHR2YXIgdHNfaW5kZXggPSB0aGlzLmdldEluZGV4VGltZXNoZWV0KHRpbWVzaGVldCk7XG5cdFx0dmFyIGVtcGxveWVlSW5kZXggPSB0aGlzLmdldEluZGV4RW1wbG95ZWUodHNfaW5kZXgsZW1wbG95ZWUpO1xuXHRcdHZhciBzYXZlPTA7XG5cdFx0dmFsdWU9cHMudGltZV9hZGRfZGlnaXRzKHZhbHVlKVxuXHRcdGlmKHBvc2l0aW9uPT0nZW5kJyAmJiBwcy50aW1lX2FkZF9mcm9udF96ZXJvKHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzW2VtcGxveWVlSW5kZXhdLmVuZCkgIT0gcHMudGltZV9hZGRfZGlnaXRzKHZhbHVlKSl7IFxuXHRcdFx0dGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXNbZW1wbG95ZWVJbmRleF0uZW5kPXBzLnRpbWVfYWRkX2RpZ2l0cyh2YWx1ZSk7XG5cdFx0XHRzYXZlPTE7XG5cdFx0fVxuXHQgICAgaWYocG9zaXRpb249PSdzdGFydCcgJiYgcHMudGltZV9hZGRfZnJvbnRfemVybyh0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlc1tlbXBsb3llZUluZGV4XS5zdGFydCkgIT0gcHMudGltZV9hZGRfZGlnaXRzKHZhbHVlKSl7XG5cdCAgICBcdHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzW2VtcGxveWVlSW5kZXhdLnN0YXJ0PXBzLnRpbWVfYWRkX2RpZ2l0cyh2YWx1ZSk7XG5cdCAgICBcdHNhdmU9MTtcblx0ICAgIH1cblx0ICAgIGlmKHNhdmUpe1xuXHRcdCAgICB0aGlzLnNldFN0YXRlKHtpdGVtczp0aGlzLm9ialRvb2wuaXRlbXN9KTtcblx0XHQgICAgdGhpcy5vYmpUb29sLnVwZGF0ZSh0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLGZ1bmN0aW9uKCl7XG5cdFx0ICAgIFx0cHMuc3VjY2Vzc0FsZXJ0KHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzW2VtcGxveWVlSW5kZXhdLmVtcGxveWVlX25hbWUrXCIgdGltZSB1cGRhdGVkIVwiKTtcblx0XHQgICAgfS5iaW5kKHRoaXMpKTtcblx0XHR9XG5cdH1cblx0ZW1wbG95ZWVMaW5lSXRlbShlbXBsb3llZV9jb250YWluZXIsdGltZV9zaGVldCxlbXBsb3llZV9pbmRleCl7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PEVtcGxveWVlVGltZVxuXHRcdFx0XHRrZXk9e2VtcGxveWVlX2luZGV4fVxuXHRcdFx0XHR0aW1lc2hlZXQ9e3RpbWVfc2hlZXR9XG5cdFx0XHRcdGVtcGxveWVlX25hbWU9e2VtcGxveWVlX2NvbnRhaW5lci5lbXBsb3llZV9uYW1lfVxuXHRcdFx0XHRlbXBsb3llZT17ZW1wbG95ZWVfY29udGFpbmVyLmVtcGxveWVlfVxuXHRcdFx0XHRzdGFydD17cHMudGltZV9hZGRfZnJvbnRfemVybyhlbXBsb3llZV9jb250YWluZXIuc3RhcnQpfVxuXHRcdFx0XHRlbmQ9e3BzLnRpbWVfYWRkX2Zyb250X3plcm8oZW1wbG95ZWVfY29udGFpbmVyLmVuZCl9XG5cdFx0XHRcdHVwZGF0ZVRpbWU9e3RoaXMudXBkYXRlVGltZX1cblx0XHRcdFx0dGltZUNoYW5nZWQ9e3RoaXMudGltZUNoYW5nZWR9XG5cdFx0XHRcdGRlbGV0ZUVtcGxveWVlPXt0aGlzLmRlbGV0ZUVtcGxveWVlfVxuXHRcdFx0Lz5cblx0XHQpO1xuXHR9XG5cblxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gICAgICAgIFJlbmRlclxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdHJlbmRlcigpe1xuXHRcdC8vaGFuZGVsIGVtcHR5IHJldHVyblxuXHRcdGlmICh0aGlzLnN0YXRlLml0ZW1zLmxlbmd0aD09PTB8fHRoaXMuc3RhdGUuaXRlbXM9PT11bmRlZmluZWQpe1xuXHRcdFx0cmV0dXJuICg8ZGl2Pk5vIFRpbWUgU2hlZXRzLCBzdGFydCBieSA8YSBocmVmPVwiL2Rlc2tcIj5jcmVhdGluZyBzb21lIGNyZXdzITwvYT48L2Rpdj4pO1xuXHRcdH1cblx0XHR2YXIgb3V0cHV0PVtdXG5cdFx0dGhpcy5zdGF0ZS5pdGVtcy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXHRcdFx0aWYoaXRlbS5jcmV3PT10aGlzLnByb3BzLmNyZXcpe1xuXHRcdFx0XHRvdXRwdXQudW5zaGlmdCh0aGlzLnRpbWVTaGVldFdyYXBwZXIoaXRlbSxpbmRleCkpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdG91dHB1dC5wdXNoKHRoaXMudGltZVNoZWV0V3JhcHBlcihpdGVtLGluZGV4KSk7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKHRoaXMpKTtcblxuXHRcdHZhciB0c19pbmRleD10aGlzLmNyZXdzVGltZXNoZWV0SW5kZXgodGhpcy5wcm9wcy5jcmV3KTtcblx0XHR2YXIgc3RhdHVzPScnO1xuXHRcdGlmICh0c19pbmRleD09dW5kZWZpbmVkKXt2YXIgc3RhdHVzPWZhbHNlO31cblx0XHRlbHNle3N0YXR1cyA9dGhpcy5zdGF0ZS5pdGVtc1t0c19pbmRleF0uc3RhdHVzfVxuXHRcdFxuXG5cdFx0Ly9NQUlOIFJFTkRFUlxuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPXt0aGlzLnByb3BzLnBhZ2U9PSdtYWluJz8nJzonaGlkZGVuJ30+XG5cdFx0XHRcdFx0PENsb2NrSW5cblx0XHRcdFx0XHRcdGNsb2NrSW49e3RoaXMuY2xvY2tJbn1cblx0XHRcdFx0XHRcdGNsb2NrT3V0PXt0aGlzLmNsb2NrT3V0fVxuXHRcdFx0XHRcdFx0c3RhdHVzPXtzdGF0dXN9XG5cdFx0XHRcdFx0XHRmdWxsX25hbWU9e3RoaXMucHJvcHMuZnVsbF9uYW1lfVxuXHRcdFx0XHRcdFx0ZGF0ZT17dGhpcy5wcm9wcy5kYXRlfVxuXHRcdFx0XHRcdFx0Y3Jldz17dGhpcy5wcm9wcy5jcmV3fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17dGhpcy5wcm9wcy5wYWdlPT0ndGltZXNoZWV0Jz8nJzonaGlkZGVuJ30+XG5cdFx0XHRcdFx0PGJyLz5cblx0XHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXG5cdFx0KTtcblxuXHR9O1x0XG59XG5cblxuXG5cblxuIiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbG9ja0luIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMudG9nZ2xlVGltZUlucHV0PXRoaXMudG9nZ2xlVGltZUlucHV0LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jbG9ja0luPXRoaXMuY2xvY2tJbi5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY2xvY2tPdXQ9dGhpcy5jbG9ja091dC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMub25DaGFuZ2U9dGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpO1xuXG5cdFx0dGhpcy5zdGF0ZT17XG5cdFx0XHRkYXRlOm5ldyBEYXRlKCksXG5cdFx0XHRzcGVjaWZ5VGltZTpmYWxzZVxuXHRcdH07XG5cblx0fVxuXHRjbG9ja0luKGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRpZih0aGlzLnN0YXRlLnNwZWNpZnlUaW1lPT1mYWxzZSl7XG5cdFx0XHR2YXIgdGltZT10aGlzLnN0YXRlLmRhdGUudG9Mb2NhbGVUaW1lU3RyaW5nKFtdLCB7aG91cjogJzItZGlnaXQnLCBtaW51dGU6JzItZGlnaXQnLGhvdXIxMjogZmFsc2V9KVxuXHRcdFx0Ly9jb25zb2xlLmxvZyh0aW1lKTtcblx0XHRcdHBzLnN1Y2Nlc3NBbGVydChcIkNsb2NrZWQgaW4gYXQgXCIgKyB0aGlzLnN0YXRlLmRhdGUudG9Mb2NhbGVUaW1lU3RyaW5nKFtdLCB7aG91cjogJzItZGlnaXQnLCBtaW51dGU6JzItZGlnaXQnfSkpXG5cdFx0XHR0aGlzLnByb3BzLmNsb2NrSW4odGltZSwgdGhpcy5wcm9wcy5jcmV3KVxuXHRcdH1lbHNle1xuXHRcdFx0Ly9jb25zb2xlLmxvZyh0aGlzLnN0YXRlLnRpbWUpXG5cdFx0XHRpZih0aGlzLnN0YXRlLnRpbWUhPXVuZGVmaW5lZCl7XG5cdFx0XHRcdHRoaXMucHJvcHMuY2xvY2tJbih0aGlzLnN0YXRlLnRpbWUsIHRoaXMucHJvcHMuY3Jldyk7XG5cdFx0XHRcdHBzLnN1Y2Nlc3NBbGVydChcIkNsb2NrZWQgaW5cIik7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Ly9pbnZhbGlkIHRpbWUgZXJyb3Jcblx0XHRcdFx0cHMuZmFpbEFsZXJ0KFwiSW52YWxpZCB0aW1lLlwiKVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRjbG9ja091dChlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0aWYodGhpcy5zdGF0ZS5zcGVjaWZ5VGltZT09ZmFsc2Upe1xuXHRcdFx0dmFyIHRpbWU9dGhpcy5zdGF0ZS5kYXRlLnRvTG9jYWxlVGltZVN0cmluZyhbXSwge2hvdXI6ICcyLWRpZ2l0JywgbWludXRlOicyLWRpZ2l0Jyxob3VyMTI6IGZhbHNlfSlcblx0XHRcdC8vY29uc29sZS5sb2codGltZSk7XG5cdFx0XHRwcy5zdWNjZXNzQWxlcnQoXCJDbG9ja2VkIG91dCBhdCBcIiArIHRoaXMuc3RhdGUuZGF0ZS50b0xvY2FsZVRpbWVTdHJpbmcoW10sIHtob3VyOiAnMi1kaWdpdCcsIG1pbnV0ZTonMi1kaWdpdCd9KStcIiBIYXZlIGEgZ3JlYXQgbmlnaHQhXCIpXG5cdFx0XHR0aGlzLnByb3BzLmNsb2NrT3V0KHRpbWUsIHRoaXMucHJvcHMuY3Jldylcblx0XHR9ZWxzZXtcblx0XHRcdC8vY29uc29sZS5sb2codGhpcy5zdGF0ZS50aW1lKVxuXHRcdFx0aWYodGhpcy5zdGF0ZS50aW1lIT11bmRlZmluZWQpe1xuXHRcdFx0XHR0aGlzLnByb3BzLmNsb2NrT3V0KHRoaXMuc3RhdGUudGltZSwgdGhpcy5wcm9wcy5jcmV3KTtcblx0XHRcdFx0cHMuc3VjY2Vzc0FsZXJ0KFwiQ2xvY2tlZCBPdXQhICBIYXZlIGEgZ3JlYXQgbmlnaHQhXCIpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdC8vaW52YWxpZCB0aW1lIGVycm9yXG5cdFx0XHRcdHBzLmZhaWxBbGVydChcIkludmFsaWQgdGltZS5cIilcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0dG9nZ2xlVGltZUlucHV0KGUpe1xuXHRcdC8vY29uc29sZS5sb2codGhpcy5zdGF0ZS5zcGVjaWZ5VGltZSk7XG5cdFx0aWYodGhpcy5zdGF0ZS5zcGVjaWZ5VGltZSl7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtzcGVjaWZ5VGltZTpmYWxzZX0pO1xuXHRcdH1cblx0XHRlbHNle3RoaXMuc2V0U3RhdGUoe3NwZWNpZnlUaW1lOnRydWV9KTt9XG5cdH1cblx0b25DaGFuZ2UoZSl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7dGltZTplLnRhcmdldC52YWx1ZX0pO1xuXHR9XG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdHRoaXMudGltZXJJRCA9IHNldEludGVydmFsKCgpID0+IHRoaXMudGljaygpLDEwMDAwKTtcblx0fVxuXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuXHRcdGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcklEKTtcblx0fVxuXG5cdHRpY2soKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRkYXRlOiBuZXcgRGF0ZSgpXG5cdFx0fSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cblx0XG5cdFx0dmFyIHZhbHVlcz17XG5cdFx0XHQnQ3JlYXRlZCc6W3RoaXMuY2xvY2tJbiwnQ2xvY2sgSW4nLCdidG4gYnRuLWxnIGJ0bi1zdWNjZXNzIGJ0bi1ibG9jayddLFxuXHRcdFx0J0Nsb2NrZWQgSW4nOlt0aGlzLmNsb2NrT3V0LCAnQ2xvY2sgT3V0JywgJ2J0biBidG4tbGcgYnRuLXN1Y2Nlc3MgYnRuLWJsb2NrJyBdLFxuXHRcdFx0J0Nsb2NrZWQgT3V0JzpbdGhpcy5jbG9ja091dCwgJ0NoYW5nZSBDbG9ja291dCBUaW1lJywnYnRuIGJ0bi1sZyBidG4tc3VjY2VzcyBidG4tYmxvY2snXSxcblx0XHRcdCdTdWJtaW50ZWQnOlsnJywnQWxyZWFkeSBTdWJtaW50ZWQnLCdidG4gYnRuLWxnIGJ0bi1zdWNjZXNzIGJ0bi1ibG9jayddLFxuXHRcdFx0J0Fwcm92ZWQnOlsnJywnQWxyZWFkeSBTdWJtaW50ZWQnLCdidG4gYnRuLWxnIGJ0bi1zdWNjZXNzIGJ0bi1ibG9jayddXG5cdFx0fVt0aGlzLnByb3BzLnN0YXR1c107XG5cdFx0dmFyIG91dHB1dD0nJztcblx0XHRpZiAodmFsdWVzPT11bmRlZmluZWQpe1xuXHRcdFx0b3V0cHV0PSg8YSBocmVmPVwiI3RpbWVzaGVldFwiPllvdSBhcmUgbm90IGluIGEgVGltZSBTaGVldCBhZGQgeW91cnNlbGYuPC9hPik7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHR2YXIgaW5wdXRGaWVsZCA9ICggPGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9e3ZhbHVlc1syXX0gb25DbGljaz17dmFsdWVzWzBdfSB2YWx1ZT17dmFsdWVzWzFdfSAvPik7XG5cdFx0XHRvdXRwdXQ9KFxuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8aDMgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cblx0XHRcdFx0XHRXZWxjb21lIDxzcGFuIGNsYXNzTmFtZT1cInVzZXJuYW1lXCI+e3RoaXMucHJvcHMuZnVsbF9uYW1lfTwvc3Bhbj5cblx0XHRcdFx0PC9oMz5cblx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+e3RoaXMuc3RhdGUuZGF0ZS50b0xvY2FsZVRpbWVTdHJpbmcoW10sIHtob3VyOiAnMi1kaWdpdCcsIG1pbnV0ZTonMi1kaWdpdCd9KX0gb24ge3RoaXMuc3RhdGUuZGF0ZS50b0RhdGVTdHJpbmcoKX0gPC9oMz5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2Nsb2NrSW4nPlxuXHRcdFx0XHRcdDxmb3JtIGNsYXNzTmFtZT1cImZvcm0tY2hlY2tpblwiIHJvbGU9XCJmb3JtXCI+XG5cdFx0XHRcdFx0XHR7aW5wdXRGaWVsZH1cblx0XHRcdFx0XHRcdDxici8+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndGV4dC1jZW50ZXInPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PGlucHV0IFxuXHRcdFx0XHRcdFx0XHRcdFx0dHlwZT1cInRpbWVcIiBcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT17dGhpcy5zdGF0ZS5zcGVjaWZ5VGltZSA/ICdmb3JtLWNvbnRyb2wgc21hbGwtdGltZSc6J2hpZGRlbid9IFxuXHRcdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG5cdFx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxici8+XG5cdFx0XHRcdFx0XHRcdDxhIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiIG9uQ2xpY2s9e3RoaXMudG9nZ2xlVGltZUlucHV0fT57dGhpcy5zdGF0ZS5zcGVjaWZ5VGltZT8nIC0gVXNlIEN1cnJlbnQgVGltZSc6JyArIFNwZWNpZnkgYSBUaW1lJ308L2E+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Zvcm0+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybihcblx0XHRcdDxkaXY+XG5cdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59IiwiXG4vKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERheXNUaW1lU2hlZXRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdC8vQmluZGluZyBkaW5nXG5cdFx0dGhpcy5jaGFuZ2VkU3RhcnQ9dGhpcy5jaGFuZ2VkU3RhcnQuYmluZCh0aGlzKVxuXHRcdHRoaXMuY2hhbmdlZEVuZD10aGlzLmNoYW5nZWRFbmQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnVwZGF0ZVN0YXJ0PXRoaXMudXBkYXRlU3RhcnQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnVwZGF0ZUVuZD10aGlzLnVwZGF0ZUVuZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZGVsZXRlPXRoaXMuZGVsZXRlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5rZXlQcmVzc2VkU3RhcnQ9dGhpcy5rZXlQcmVzc2VkU3RhcnQuYmluZCh0aGlzKTtcblx0XHR0aGlzLmtleVByZXNzZWRFbmQ9dGhpcy5rZXlQcmVzc2VkRW5kLmJpbmQodGhpcyk7XG5cdH1cblx0Y2hhbmdlZFN0YXJ0KGUpe1xuXHRcdHRoaXMucHJvcHMudGltZUNoYW5nZWQgICgnc3RhcnQnLHRoaXMucHJvcHMuZW1wbG95ZWUsdGhpcy5wcm9wcy50aW1lc2hlZXQsZS50YXJnZXQudmFsdWUpO1xuXHR9XG5cdGNoYW5nZWRFbmQoZSl7XG5cdFx0dGhpcy5wcm9wcy50aW1lQ2hhbmdlZCgnZW5kJyx0aGlzLnByb3BzLmVtcGxveWVlLHRoaXMucHJvcHMudGltZXNoZWV0LGUudGFyZ2V0LnZhbHVlKTtcblx0fVxuXHR1cGRhdGVTdGFydChlKXtcblx0XHRpZihlLnRhcmdldC52YWx1ZSE9Jycpe1xuXHRcdFx0dGhpcy5wcm9wcy51cGRhdGVUaW1lKCdzdGFydCcsdGhpcy5wcm9wcy5lbXBsb3llZSx0aGlzLnByb3BzLnRpbWVzaGVldCwgZS50YXJnZXQudmFsdWUpO1xuXHRcdH1cblx0fVxuXHR1cGRhdGVFbmQoZSl7XG5cdFx0aWYoZS50YXJnZXQudmFsdWUhPScnKXtcblx0XHRcdHRoaXMucHJvcHMudXBkYXRlVGltZSgnZW5kJyx0aGlzLnByb3BzLmVtcGxveWVlLHRoaXMucHJvcHMudGltZXNoZWV0LCBlLnRhcmdldC52YWx1ZSk7XG5cdFx0fVxuXHR9XG5cdGRlbGV0ZShlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5wcm9wcy5kZWxldGVFbXBsb3llZSh0aGlzLnByb3BzLmVtcGxveWVlLHRoaXMucHJvcHMudGltZXNoZWV0KTtcblx0fVxuXHRrZXlQcmVzc2VkU3RhcnQoZSkge1xuXHQgICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSB7XG5cdCAgICBcdGUucHJldmVudERlZmF1bHQoKTtcblx0ICAgIFx0aWYodGhpcy5wcm9wcy5zdGFydCE9Jycpe1xuXHRcdFx0XHR0aGlzLnByb3BzLnVwZGF0ZVRpbWUoJ3N0YXJ0Jyx0aGlzLnByb3BzLmVtcGxveWVlLHRoaXMucHJvcHMudGltZXNoZWV0LCB0aGlzLnByb3BzLnN0YXJ0KTtcblx0XHRcdH1cblx0ICAgIH1cblx0IH1cblx0a2V5UHJlc3NlZEVuZChlKSB7XG5cdCAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcblx0ICAgIFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHQgICAgXHRpZih0aGlzLnByb3BzLmVuZCE9Jycpe1xuXHRcdFx0XHR0aGlzLnByb3BzLnVwZGF0ZVRpbWUoJ3N0YXJ0Jyx0aGlzLnByb3BzLmVtcGxveWVlLHRoaXMucHJvcHMudGltZXNoZWV0LCB0aGlzLnByb3BzLmVuZCk7XG5cdFx0XHR9XG5cdCAgICB9XG5cdCB9XG5cdHJlbmRlcigpe1xuXHRcdHJldHVybihcblx0XHRcdDxsaSBjbGFzc05hbWU9XCJsaXN0LWdyb3VwLWl0ZW1cIiA+XG5cdFx0XHRcdDxmb3JtICBjbGFzc05hbWU9XCJmb3JtLWlubGluZSByb3cgZGF5X3RpbWVfZm9ybV9yb3dcIj5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbCBjb2wtbWQtMyBjb2wtc20tMyBjb2wteHMtMTIgdGV4dC1jZW50ZXIgZGF5X3RpbWVfZm9ybV9yb3dfZWxlbWVudFwiPjxzdHJvbmc+eyB0aGlzLnByb3BzLmVtcGxveWVlX25hbWV9PC9zdHJvbmc+PC9sYWJlbD5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTMgY29sLXNtLTMgY29sLXhzLTEyIGRheV90aW1lX2Zvcm1fcm93X2VsZW1lbnRcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXBcIj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cC1hZGRvblwiPlN0YXJ0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxpbnB1dCBcblx0XHRcdFx0XHRcdFx0XHR0eXBlPVwidGltZVwiIFxuXHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCBzdGFydFwiIFxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlPXt0aGlzLnByb3BzLnN0YXJ0fVxuXHRcdFx0XHRcdFx0XHRcdG9uQmx1cj17dGhpcy51cGRhdGVTdGFydH1cblx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5jaGFuZ2VkU3RhcnR9XG5cdFx0XHRcdFx0XHRcdFx0b25LZXlQcmVzcz17dGhpcy5rZXlQcmVzc2VkU3RhcnR9XG5cblx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTMgY29sLXNtLTMgY29sLXhzLTEyIGRheV90aW1lX2Zvcm1fcm93X2VsZW1lbnRcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXBcIj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cC1hZGRvblwiPkVuZDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8aW5wdXQgXG5cdFx0XHRcdFx0XHRcdFx0dHlwZT1cInRpbWVcIiBcblx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgZW5kXCIgXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU9e3RoaXMucHJvcHMuZW5kfVxuXHRcdFx0XHRcdFx0XHRcdG9uQmx1cj17dGhpcy51cGRhdGVFbmR9XG5cdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuY2hhbmdlZEVuZH1cblx0XHRcdFx0XHRcdFx0XHRvbktleVByZXNzPXt0aGlzLmtleVByZXNzZWRFbmR9XG5cdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTMgY29sLXNtLTMgY29sLXhzLTEyIHRleHQtY2VudGVyIGRheV90aW1lX2Zvcm1fcm93X2VsZW1lbnRcIj5cblx0XHRcdFx0XHRcdDxidXR0b24gXG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImRlbGV0ZSBidG4gYnRuLWRhbmdlclwiXG5cdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMuZGVsZXRlfVxuXHRcdFx0XHRcdFx0PkRlbGV0ZTwvYnV0dG9uPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Zvcm0+XG5cdFx0XHQ8L2xpPlxuXHRcdCk7XG5cdH1cbn0iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZVNoZWV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdC8qICAgICBEbyB0aGUgYmluZCB0aGluZyAgICAgICovXG5cdFx0dGhpcy5hdXRvY29tcGxldGU9dGhpcy5hdXRvY29tcGxldGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmFkZENoYW5nZWQ9dGhpcy5hZGRDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5hZGRDbGlja2VkPXRoaXMuYWRkQ2xpY2tlZC5iaW5kKHRoaXMpO1xuXHR9XG5cblx0YXV0b2NvbXBsZXRlKGlucHV0KXtcblx0XHR2YXIgY29uZmlnID0ge1xuXHRcdFx0bWluQ2hhcnM6IDAsXG5cdFx0XHRtYXhJdGVtczogOTksXG5cdFx0XHRhdXRvRmlyc3Q6IHRydWUsXG5cdFx0XHRmaWx0ZXI6IGZ1bmN0aW9uKGl0ZW0sIGlucHV0KSB7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IGl0ZW0udmFsdWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0aWYodmFsdWUuaW5kZXhPZignaXNfYWN0aW9uJykgIT09IC0xIHx8XG5cdFx0XHRcdFx0dmFsdWUuaW5kZXhPZihpbnB1dCkgIT09IC0xKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRpdGVtOiBmdW5jdGlvbihpdGVtLCBpbnB1dCkge1xuXHRcdFx0XHR2YXIgZCA9IGl0ZW07XG5cdFx0XHRcdHZhciBodG1sID0gXCI8c3Bhbj5cIiArIF9fKGl0ZW0ubGFiZWwgfHwgaXRlbS52YWx1ZSkgKyBcIjwvc3Bhbj5cIjtcblx0XHRcdFx0cmV0dXJuICQoJzxsaT48L2xpPicpXG5cdFx0XHRcdFx0LmRhdGEoJ2l0ZW0uYXV0b2NvbXBsZXRlJywgaXRlbSlcblx0XHRcdFx0XHQuaHRtbCgnPGE+PHA+JyArIGh0bWwgKyAnPC9wPjwvYT4nKVxuXHRcdFx0XHRcdC5nZXQoMCk7XG5cdFx0XHR9XG5cdFx0fTtcblx0XHR2YXIgYXcgPSBuZXcgQXdlc29tcGxldGUoaW5wdXQsY29uZmlnKTtcblx0XHRpbnB1dC5hZGRFdmVudExpc3RlbmVyKFxuXHRcdFx0J2F3ZXNvbXBsZXRlLXNlbGVjdGNvbXBsZXRlJyxcblx0XHRcdFx0dGhpcy5hZGRDaGFuZ2VkXG5cdFx0KTtcblx0XHRhdy5saXN0PXBzLmVtcGxveWVlX2xhYmxlc1xuXHRcdCQoZG9jdW1lbnQpLmJpbmQoJ2VtcGxveWVlTGFibGVzTG9hZGVkJyxmdW5jdGlvbigpe1xuXHRcdFx0YXcubGlzdD1wcy5lbXBsb3llZV9sYWJsZXM7XG5cdFx0fSk7XG5cdH1cblx0YWRkQ2hhbmdlZChlKXtcblx0XHR0aGlzLmFkZD1lLnRhcmdldC52YWx1ZTtcblx0fTtcblx0YWRkQ2xpY2tlZChlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dmFyIHdvX25hbWU9dGhpcy5wcm9wcy5uYW1lO1xuXHRcdHZhciBlbXBsb3llZV9uYW1lPXRoaXMuYWRkO1xuXHRcdC8vQ2FsbCBiYWNrIGZvciBiaW5kaW5nP1xuXHRcdHZhciB1cGRhdGVDYWxsYmFjaz1mdW5jdGlvbihpbmRleCl7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oZGF0YSl7XHRcdFx0XG5cdFx0XHRcdHRoaXMudXBkYXRlRnJvbVNlcnZlclBhcmFtKGRhdGEsaW5kZXgpO1xuXHRcdFx0fS5iaW5kKHRoaXMpO1xuXHRcdH0uYmluZCh0aGlzKTtcblx0XHR0aGlzLnByb3BzLmFkZEVtcGxveWVlKHdvX25hbWUsIGVtcGxveWVlX25hbWUpO1xuXHR9O1xuXHRyZW5kZXIoKXtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsIHBhbmVsLWRlZmF1bHQgcm93XCI+XG5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYW5lbC1oZWFkaW5nXCI+XG5cdFx0XHRcdFx0PGg0IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+IFRpbWUgU2hlZXQge3RoaXMucHJvcHMuZGF0ZX0gZm9yIHt0aGlzLnByb3BzLmNyZXd9IDwvaDQ+XG5cdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdDx1bCBjbGFzc05hbWU9XCJsaXN0LWdyb3VwXCIgPlxuXHRcdFx0XHRcdDxkaXYgaWQ9J2Zvcm1zJz5cblx0XHRcdFx0XHRcdHt0aGlzLnByb3BzLmVtcGxveWVlc31cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC91bD5cblx0XHRcdCAgXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtZm9vdGVyIGNvbC1tZC0xMiB0ZXh0LWxlZnQgbGlzdC1ncm91cC1pdGVtXCI+XG5cdFx0XHRcdFx0PGZvcm0gY2xhc3NOYW1lPVwiZm9ybS1pbmxpbmUgcm93IFwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBjb2wtbWQtMyBjb2wtc20tMiBjb2wteHMtMTIgdXBkYXRlX2Rpdl9lbGVtZW50XCI+XG5cdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tc3VjY2Vzc1wiPlVwZGF0ZTwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInRleHQtcmlnaHQgY29sLW1kLTYgY29sLXNtLTYgY29sLXhzLTQgXCI+XG5cdFx0XHRcdFx0XHRcdDxidXR0b24gXG5cdFx0XHRcdFx0XHRcdFx0dHlwZT1cInN1Ym1pdFwiIFxuXHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiXG5cdFx0XHRcdFx0XHRcdFx0b25DbGljaz17dGhpcy5hZGRDbGlja2VkfVxuXHRcdFx0XHRcdFx0XHRcdD4rIEFkZDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgdGV4dC1sZWZ0IGNvbC1tZC0zIGNvbC1zbS00IGNvbC14cy02IFwiPjxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXBcIj5cblx0XHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJ0ZXh0XCIgXG5cdFx0XHRcdFx0XHRcdFx0cmVmPXt0aGlzLmF1dG9jb21wbGV0ZX1cbiAgICAgICAgICBcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5hZGRDaGFuZ2VkfSBcbiAgICAgICAgICBcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJuZXdfZW1wbG95ZWVzIGZvcm0tY29udHJvbCBhd2Vzb21wbGV0ZVwiIFxuICAgICAgICAgIFx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwiZW1wbG95ZWVcIiAvPlxuXHRcdFx0XHRcdFx0PC9kaXY+PC9kaXY+XG5cdFx0XHRcdFx0PC9mb3JtPlxuXHRcdFx0XHRcdFxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuIiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5pbXBvcnQgV29ya29yZGVyVGFzayBmcm9tICcuL3dvcmtvcmRlclRhc2snO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERheXNXb3Jrb3JkZXJzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHZhciBhcmdzPXt9O1xuXHRcdGFyZ3MuY3Jldz10aGlzLnByb3BzLmNyZXc7XG5cdFx0YXJncy5kYXRlPXRoaXMucHJvcHMuZGF0ZTtcblxuXHRcdC8qICAgRG8gdGhlIGJpbmQgdGhpbmcgICovXG5cdFx0dGhpcy5vblRhc2tDaGVja2VkPXRoaXMub25UYXNrQ2hlY2tlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMub25TdGF0dXNDaGFuZ2VkPXRoaXMub25TdGF0dXNDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy51cGRhdGVGcm9tU2VydmVyPXRoaXMudXBkYXRlRnJvbVNlcnZlci5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuc29ja2V0VXBkYXRlPXRoaXMuc29ja2V0VXBkYXRlLmJpbmQodGhpcyk7XG5cdFx0Ly90aGlzLndvcmtvcmRlck9iaj10aGlzLm9uU3RhdHVzQ2hhbmdlZC5iaW5kKHRoaXMpO1xuXHRcdC8qICAgICAgICAgIGVuZCAgICAgICAgICAqL1xuXG5cdFx0dGhpcy5zdGF0ZT17d29ya29yZGVyczpbXX07XG5cdFx0dGhpcy53b3Jrb3JkZXJUb29sPXBzLmluaXRXb3Jrb3JkZXIoKTtcblx0XHR0aGlzLndvcmtvcmRlclRvb2wuZ2V0KGFyZ3MsZnVuY3Rpb24oKXtcblx0XHRcdHRoaXMudXBkYXRlRnJvbVNlcnZlcigpO1xuXHRcdFx0dGhpcy53b3Jrb3JkZXJUb29sLnJlYWN0U2V0dXAodGhpcy51cGRhdGVGcm9tU2VydmVyKTtcblx0XHR9LmJpbmQodGhpcykpO1xuXHRcdGlmICh0aGlzLndvcmtvcmRlclRvb2wuaXRlbXM9PT11bmRlZmluZWQgfHx0aGlzLndvcmtvcmRlclRvb2wuaXRlbXM9PT0gMCApe1xuXG5cdFx0fWVsc2V7dGhpcy5zdGF0ZS53b3Jrb3JkZXJzPXRoaXMud29ya29yZGVyVG9vbC5pdGVtczt9XG5cdH1cblx0c29ja2V0VXBkYXRlKCl7XG5cblx0fVxuXHRvblRhc2tDaGVja2VkKHdvX2luZGV4LGluZGV4LGNoZWNrKXtcblx0XHR0aGlzLndvcmtvcmRlclRvb2wuaXRlbXNbd29faW5kZXhdLnN1YnRhc2tbaW5kZXhdLnN0YXR1cz1jaGVjaz8wOjE7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7d29ya29yZGVyczp0aGlzLndvcmtvcmRlclRvb2wuaXRlbXN9KTtcblx0XHR0aGlzLndvcmtvcmRlclRvb2wudXBkYXRlKHRoaXMud29ya29yZGVyVG9vbC5pdGVtc1t3b19pbmRleF0pO1xuXHRcdHZhciBjaGVja2VkVGV4dD1jaGVjaz9cInVuY2hlY2tlZC5cIjpcImNoZWNrZWQuXCJcblx0XHQvL3BzLnN1Y2Nlc3NBbGVydCh0aGlzLndvcmtvcmRlclRvb2wuaXRlbXNbd29faW5kZXhdLnN1YnRhc2tbaW5kZXhdLnRhc2sgK1wiIFwiKyBjaGVja2VkVGV4dCApO1xuXHR9XG5cdG9uU3RhdHVzQ2hhbmdlZChzdGF0dXMsIGluZGV4KXtcblx0XHR0aGlzLndvcmtvcmRlclRvb2wuaXRlbXNbaW5kZXhdLnN0YXR1cz1zdGF0dXM7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7d29ya29yZGVyczp0aGlzLndvcmtvcmRlclRvb2wuaXRlbXN9KTtcblx0XHR0aGlzLndvcmtvcmRlclRvb2wudXBkYXRlKHRoaXMud29ya29yZGVyVG9vbC5pdGVtc1tpbmRleF0pO1xuXHRcdGlmKHN0YXR1cz09XCJDb21wbGV0ZVwiKXtcblx0XHRcdHBzLnN1Y2Nlc3NBbGVydChcIldvcmtvcmRlciBjb21wbGV0ZWQhXCIpO1xuXHRcdH1cblx0fVxuXHR1cGRhdGVGcm9tU2VydmVyKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7d29ya29yZGVyczp0aGlzLndvcmtvcmRlclRvb2wuaXRlbXN9KTtcblx0fVxuXHR3b3Jrb3JkZXJPYmooaXRlbSxpbmRleCl7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PFdvcmtvcmRlclRhc2sgXG5cdFx0XHRcdGtleT17aW5kZXh9IFxuXHRcdFx0XHRpbmRleD17aW5kZXh9IFxuXHRcdFx0XHRsb2NhdGlvbl9yb3V0ZT17aXRlbS5sb2NhdGlvbl9yb3V0ZX1cblx0XHRcdFx0bG9jYXRpb249e2l0ZW0ubG9jYXRpb259XG5cdFx0XHRcdHRhc2tzPXtpdGVtLnN1YnRhc2t9XG5cdFx0XHRcdHN0YXR1cz17aXRlbS5zdGF0dXN9XG5cdFx0XHRcdHdvcmtvcmRlcj17aXRlbS5uYW1lfVxuXHRcdFx0XHRvblRhc2tDaGVja2VkPXt0aGlzLm9uVGFza0NoZWNrZWR9XG5cdFx0XHRcdG9uU3RhdHVzQ2hhbmdlZD17dGhpcy5vblN0YXR1c0NoYW5nZWR9XG5cdFx0XHRcdHJvdXRlPXtpdGVtLnJvdXRlfVxuXHRcdFx0Lz5cblx0XHQpO1xuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyAgICAgICAgUmVuZGVyXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0cmVuZGVyKCl7XG5cdFx0aWYgKHRoaXMuc3RhdGUud29ya29yZGVycz09PTB8fHRoaXMuc3RhdGUud29ya29yZGVycz09PXVuZGVmaW5lZCl7XG5cdFx0XHRyZXR1cm4gKDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj48aDM+Tm8gV29ya29yZGVyczwvaDM+PC9kaXY+KTtcblx0XHR9XG5cdFx0dmFyIHRvZG89W107XG5cdFx0dmFyIGNvbXBsZXRlPVtdO1xuXHRcdHRoaXMuc3RhdGUud29ya29yZGVycy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXHRcdFx0aWYgKGl0ZW0uc3RhdHVzIT0nQ29tcGxldGUnJiZpdGVtLnN0YXR1cyE9J0luY29tcGxldGUnKXtcblx0XHRcdFx0dG9kby5wdXNoKHRoaXMud29ya29yZGVyT2JqKGl0ZW0saW5kZXgpKTtcblx0XHRcdFx0aWYodG9kby5sZW5ndGglMz09PTApe3RvZG8ucHVzaCg8ZGl2IGNsYXNzTmFtZT0nY2xlYXJmaXgnPjwvZGl2Pil9XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Y29tcGxldGUucHVzaCh0aGlzLndvcmtvcmRlck9iaihpdGVtLGluZGV4KSk7XG5cdFx0XHRcdGlmKGNvbXBsZXRlLmxlbmd0aCUzPT09MCl7Y29tcGxldGUucHVzaCg8ZGl2IGNsYXNzTmFtZT0nY2xlYXJmaXgnPjwvZGl2Pil9XG5cdFx0XHR9XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIndvcmtvcmRlcl9jb250YWluZXJcIj5cblx0XHRcdFx0PGRpdj48YnIvPlxuXHRcdFx0XHRcdHt0b2RvfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPjwvZGl2PlxuXHRcdFx0XHQ8ZGl2PjxoMz5Db21wbGV0ZSBXb3Jrb3JkZXJzPC9oMz5cblx0XHRcdFx0XHR7Y29tcGxldGV9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblxuXHR9O1x0XG59XG4iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2tDaGVjayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHRjb25zb2xlLmxvZyh0aGlzLnByb3BzLmNoZWNrZWQpO1xuXHRcdHRoaXMudGFza0NoZWNrZWQgPSB0aGlzLnRhc2tDaGVja2VkLmJpbmQodGhpcyk7XG5cdH1cblx0dGFza0NoZWNrZWQoZSl7XG5cdFx0dGhpcy5wcm9wcy50YXNrQ2hlY2tlZCh0aGlzLnByb3BzLmluZGV4LCB0aGlzLnByb3BzLmNoZWNrZWQpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IGNoZWNrZWQgPSB0aGlzLnByb3BzLmNoZWNrZWQgPyBcImxpbmUtdGhyb3VnaFwiIDogXCJcIjtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9e2NoZWNrZWR9PlxuXHRcdFx0XHRcdDxpbnB1dCBvbkNoYW5nZT17dGhpcy50YXNrQ2hlY2tlZH0gdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD17dGhpcy5wcm9wcy5jaGVja2VkfSAvPlxuXHRcdFx0XHRcdHt0aGlzLnByb3BzLmxhYmxlfVxuXHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVx0XG59IiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5pbXBvcnQgTW9kYWwgZnJvbSAnLi4vdXRpbHMvbW9kYWwnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyZWF0ZUlzc3VlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpXG5cdFx0dGhpcy5wb3BVcD10aGlzLnBvcFVwLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5wb3BVcElkPVwiY3JlYXRlLWlzc3VlLWZvcm0tXCIrdGhpcy5wcm9wcy53b3Jrb3JkZXI7XG5cdH1cblx0dG9vbFRpcCgpe1xuXHRcdCQoZnVuY3Rpb24gKCkge1xuXHRcdCBcdCQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKCk7XG5cdFx0fSlcblx0XHRcblx0fVxuXHRwb3BVcCgpe1xuXHRcdCQoJyMnK3RoaXMucG9wVXBJZCkubW9kYWwoKTtcblx0fVxuXHRzdWJtaXQoKXtcblx0XHR0aGlzLm9ialRvb2w9cHMuaW5pdElzc3VlKCk7XG5cdFx0cHMuaW5pdElzc3VlLnVwZGF0ZSgpO1xuXHRcdGNvbnNvbGUubG9nKFwic2F2ZVwiKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInRleHQtcmlnaHRcIj5cblx0XHRcdFx0PGJ1dHRvbiBcblx0XHRcdFx0XHRkYXRhLXRvZ2dsZT1cIm1vZGFsXCIgXG5cdFx0XHRcdFx0ZGF0YS10YXJnZXQ9e1wiI1wiK3RoaXMucG9wVXBJZH1cblx0XHRcdFx0IFx0dHlwZT1cImJ1dHRvblwiIFxuXHRcdFx0XHQgXHRjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHQgYnRuLXhzIGNyZWF0ZS1pc3N1ZVwiIFxuXHRcdFx0XHQgXHRhcmlhLWxhYmVsPVwiQ3JlYXRlIElzc3VlXCIgXG5cdFx0XHRcdCBcdGRhdGEtdG9nZ2xlPVwidG9vbHRpcFwiIFxuXHRcdFx0XHQgXHRkYXRhLXBsYWNlbWVudD1cInRvcFwiIFxuXHRcdFx0XHQgXHR0aXRsZT1cIklzc3VlXCIgXG5cdFx0XHRcdFx0cmVmPXt0aGlzLnRvb2xUaXB9IFxuXHRcdFx0XHRcdG9uQ2xpY2s9eyB0aGlzLnBvcFVwfSA+XG5cblx0XHRcdFx0IFx0PHNwYW4gY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1leGNsYW1hdGlvbi1zaWduXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxuXHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0PE1vZGFsIFxuXHRcdFx0XHRcdGlkPXt0aGlzLnBvcFVwSWR9IFxuXHRcdFx0XHRcdHN1Ym1pdFRleHQ9XCJTdWJtaXRcIiBcblx0XHRcdFx0XHR0aXRsZT1cIkNyZWF0ZSBJc3N1ZSBGb3IgVmluZXlhcmRcIlxuXHRcdFx0XHRcdHN1Ym1pdD17dGhpcy5zdWJtaXR9PlxuXG5cdFx0XHRcdFx0XHQ8ZmllbGRzZXQ+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdFx0XHRcdFx0XHRcdDxsYWJlbD5Jc3N1ZSBUaXRsZTwvbGFiZWw+XG5cdFx0XHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJJc3N1ZSBUaXRsZVwiIC8+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHRcdFx0XHRcdFx0XHQ8bGFiZWw+UHJpb3JpdHk8L2xhYmVsPlxuXHRcdFx0XHRcdFx0XHRcdDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgPlxuXHRcdFx0XHRcdFx0XHRcdFx0PG9wdGlvbj5Mb3c8L29wdGlvbj5cblx0XHRcdFx0XHRcdFx0XHRcdDxvcHRpb24+TWVkaXVtPC9vcHRpb24+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8b3B0aW9uPkhpZ2g8L29wdGlvbj5cblx0XHRcdFx0XHRcdFx0XHRcdDxvcHRpb24+Q3JpdGljYWw8L29wdGlvbj5cblx0XHRcdFx0XHRcdFx0XHQ8L3NlbGVjdD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdFx0XHRcdFx0XHQgIFx0PGxhYmVsPklzc3VlIERldGFpbHM6PC9sYWJlbD5cblx0XHRcdFx0XHRcdFx0ICBcdDx0ZXh0YXJlYSBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiByb3dzPVwiM1wiIHBsYWNlaG9sZGVyPVwiSXNzdWUgRGV0YWlsc1wiPjwvdGV4dGFyZWE+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PC9maWVsZHNldD5cblxuXHRcdFx0XHQ8L01vZGFsPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5cbiIsIlxuLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5pbXBvcnQgVGFza0NoZWNrIGZyb20gJy4vVGFza0NoZWNrJ1xuaW1wb3J0IENyZWF0ZUlzc3VlIGZyb20gJy4vY3JlYXRlSXNzdWUnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdvcmtvcmRlclRhc2sgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5zdGF0ZSA9e3RpdGxlOlwiZGVyZWtcIn07XG5cdFx0dGhpcy50YXNrQ2hlY2tlZD10aGlzLnRhc2tDaGVja2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5zdGF0dXNDaGFuZ2U9dGhpcy5zdGF0dXNDaGFuZ2UuYmluZCh0aGlzKTtcblx0fVxuXHR0YXNrQ2hlY2tlZChlKXtcblx0XHR0aGlzLnNldFN0YXRlKHt0aXRsZTpcIkNIRUNLRURcIn0pO1xuXHR9XG5cdGlzQ2hlY2tlZCh2YWx1ZSl7XG4gICAgXHRyZXR1cm4gKCh2YWx1ZT09PXRoaXMuc3RhdGUuc2VsZWN0ZWQpID8nY2hlY2tlZCBsaW5lLXRocm91Z2gnOidkZWZhdWx0Jyk7XG4gIFx0fVxuICBcdHRhc2tDaGVja2VkKGluZGV4LGNoZWNrZWQpe1xuICBcdFx0dmFyIHdvX2luZGV4PXRoaXMucHJvcHMuaW5kZXg7XG4gIFx0XHR0aGlzLnByb3BzLm9uVGFza0NoZWNrZWQod29faW5kZXgsaW5kZXgsY2hlY2tlZCk7XG4gIFx0fVxuICBcdHN0YXR1c0NoYW5nZShlKXtcbiAgXHRcdHRoaXMucHJvcHMub25TdGF0dXNDaGFuZ2VkKGUudGFyZ2V0LnZhbHVlLHRoaXMucHJvcHMuaW5kZXgpO1xuXG4gIFx0fVxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB0aXRsZT1cIndlbGNvbWVcIjtcblx0XHR2YXIgbWFpbkNsYXNzPXtcblx0XHRcdCdDb21wbGV0ZSc6J3BhbmVsLXN1Y2Nlc3MnLFxuXHRcdFx0J0luY29tcGxldGUnOidwYW5lbC1kYW5nZXInLFxuXHRcdFx0J1BlbmRpbmcnOidwYW5lbC1kZWZhdWx0Jyxcblx0XHRcdCdTdGFydGVkJzoncGFuZWwtd2FybmluZydcblx0XHR9W3RoaXMucHJvcHMuc3RhdHVzXTtcblx0XHRtYWluQ2xhc3MgPSBtYWluQ2xhc3MgKyBcIiBwYW5lbCB3b3Jrb3JkZXJcIjtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nY29sLW1kLTQgY29sLXNtLTQnPlxuXHRcdFx0PGRpdiBpZD1cIlwiIGNsYXNzTmFtZT17bWFpbkNsYXNzfT5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYW5lbC1oZWFkaW5nXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cblx0XHRcdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJwYW5lbC10aXRsZSBjb2wteHMtMTBcIj5cblx0XHRcdFx0XHRcdFx0PGEgY2xhc3NOYW1lPVwiZmxvYXQtbGVmdFwiIGhyZWY9e3RoaXMucHJvcHMubG9jYXRpb25fcm91dGV9Pnt0aGlzLnByb3BzLmxvY2F0aW9ufTwvYT5cblx0XHRcdFx0XHRcdDwvaDM+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0yIGNyZWF0ZS1pc3N1ZS1oZWFkZXItYnV0dG9uLWNvbnRhaW5lclwiID5cblx0XHRcdFx0XHRcdFx0PENyZWF0ZUlzc3VlXG5cdFx0XHRcdFx0XHRcdFx0d29ya29yZGVyPXt0aGlzLnByb3BzLndvcmtvcmRlcn1cblx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XG5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtYm9keVwiPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+U3RhdHVzPC9sYWJlbD5cblx0XHRcdFx0XHQ8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCBzdGF0dXNcIiB2YWx1ZT17dGhpcy5wcm9wcy5zdGF0dXN9IG9uQ2hhbmdlPXt0aGlzLnN0YXR1c0NoYW5nZX0+XG5cdFx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPVwiUGVuZGluZ1wiPlBlbmRpbmc8L29wdGlvbj5cblx0XHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9XCJTdGFydGVkXCI+U3RhcnRlZDwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIkNvbXBsZXRlXCI+Q29tcGxldGU8L29wdGlvbj5cblx0XHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9XCJJbmNvbXBsZXRlXCI+SW5jb21wbGV0ZTwvb3B0aW9uPlxuXHRcdFx0XHRcdDwvc2VsZWN0PlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja19ib3hlc1wiPlxuXHRcdFx0XHRcdFx0e3RoaXMucHJvcHMudGFza3MubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblx0XHRcdFx0XHRcdFx0dmFyIGNoZWNrZWQ9aXRlbS5zdGF0dXM/dHJ1ZTpmYWxzZTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuICg8VGFza0NoZWNrIGtleT17aW5kZXh9IGluZGV4PXtpbmRleH0gbGFibGU9e2l0ZW0udGFza30gY2hlY2tlZD17Y2hlY2tlZH0gdGFza0NoZWNrZWQ9e3RoaXMudGFza0NoZWNrZWR9Lz4pO1xuXHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpKX1cblxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9XCJcIiBocmVmPXt0aGlzLnByb3BzLnJvdXRlfT5Nb3JlIEluZm9ybWF0aW9uPC9hPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5cblxuIiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kYWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5zdWJtaXQ9dGhpcy5zdWJtaXQuYmluZCh0aGlzKTtcblx0fVxuXHRzdWJtaXQoZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMucHJvcHMuc3VibWl0KCk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbCBmYWRlIHRleHQtbGVmdCBwYW5lbC1kZWZhdWx0XCIgaWQ9e3RoaXMucHJvcHMuaWR9IHRhYkluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCIgYXJpYS1sYWJlbGxlZGJ5PVwiZXhhbXBsZU1vZGFsTGFiZWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2dcIiByb2xlPVwiZG9jdW1lbnRcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XG5cdFx0XHRcdFx0XHRcdDxoNCBjbGFzc05hbWU9XCJtb2RhbC10aXRsZVwiIGlkPVwiZXhhbXBsZU1vZGFsTGFiZWxcIj57dGhpcy5wcm9wcy50aXRsZX08L2g0PlxuXHRcdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBkaXNwbGF5PVwibm9uZVwiIGNsYXNzTmFtZT1cImNsb3NlIGhpZGVcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPlxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PGZvcm0+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxuXHRcdFx0XHRcdFx0XHRcdHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWZvb3RlclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tc2Vjb25kYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DbG9zZTwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0XHRcdDxidXR0b24gXG5cdFx0XHRcdFx0XHRcdFx0XHR0eXBlPVwic3VibWl0XCIgXG5cdFx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLnN1Ym1pdH0gXG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiA+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHt0aGlzLnByb3BzLnN1Ym1pdFRleHR9XG5cdFx0XHRcdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PC9mb3JtPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuXG4iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmltcG9ydCBEYXlzV29ya29yZGVycyBmcm9tICcuLi8uLi9wdWJsaWMvanMvbW9kdWxlcy9kYXlzX3dvcmtvcmRlcnMvRGF5c1dvcmtvcmRlcnMnXG5pbXBvcnQgRGF5c1RpbWVzaGVldHMgZnJvbSAnLi4vLi4vcHVibGljL2pzL21vZHVsZXMvZGF5c190aW1lc2hlZXRzL0RheXNUaW1lU2hlZXRzJ1xuXG4vL2NvbnN0IGFwcD0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpO1xuY29uc3QgYXBwPSAkKCcjYXBwJylbMF07XG5jb25zdCB0aW1lc2hlZXRzPSAkKCcjdGltZScpWzBdO1xuXG5jbGFzcyBXb3JrUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblxuXHRcdC8qIGJpbmQgZGluZyBkaW5nICovXG5cdFx0dGhpcy5tYWluQ2xpY2tlZD10aGlzLm1haW5DbGlja2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy53b3Jrb3JkZXJzQ2xpY2tlZD10aGlzLndvcmtvcmRlcnNDbGlja2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy50aW1lc2hlZXRDbGlja2VkPXRoaXMudGltZXNoZWV0Q2xpY2tlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuaGFuZGVsQ2xvY2tJbj10aGlzLmhhbmRlbENsb2NrSW4uYmluZCh0aGlzKTtcblx0XHR0aGlzLmhhbmRlbFJvdXRlPXRoaXMuaGFuZGVsUm91dGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLnN0YXRlVXBkYXRlPXRoaXMuc3RhdGVVcGRhdGUuYmluZCh0aGlzKTtcblx0XHRcblxuXHRcdC8vSGFuZGVsIFVzZXIgbE9hZFxuXHRcdHRoaXMuY3VycmVudFVzZXI9cHMuaW5pdEN1cnJlbnRVc2VyKCk7XG5cdFx0dGhpcy5jdXJyZW50VXNlci5nZXQoe30sZnVuY3Rpb24oaXRlbXMpe1xuXHRcdFx0aWYodGhpcy5jdXJyZW50VXNlci5pdGVtcy51c2VybmFtZT09XCJHdWVzdFwiKXtcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uID0gXCIvbG9naW5cIjtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHQkKGRvY3VtZW50KS50cmlnZ2VyKFwidXNlckxvYWRlZFwiKTtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZyhcImFmdGVyIExvYWRcIix0aGlzLmN1cnJlbnRVc2VyLml0ZW1zKTtcblx0XHRcdH1cblx0XHR9LmJpbmQodGhpcykpO1xuXHRcdHRoaXMuc3RhdGU9e2l0ZW1zOnRoaXMuY3VycmVudFVzZXIuaXRlbXN9O1xuXHRcdCQoZG9jdW1lbnQpLmJpbmQoJ3VzZXJMb2FkZWQnLHRoaXMuc3RhdGVVcGRhdGUpO1xuXG5cblx0XHQvL1JvdXRpbmdcblx0XHQkKHdpbmRvdykub24oXCJoYXNoY2hhbmdlXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5oYW5kZWxSb3V0ZSgpO1xuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0dmFyIHJvdXRlID0gd2luZG93LmxvY2F0aW9uLmhhc2guc2xpY2UoMSk7XG5cdFx0aWYoIXJvdXRlKSByb3V0ZSA9IFwiI21haW5cIjtcblx0XHR0aGlzLnN0YXRlLnBhZ2U9cm91dGU7XG5cdFx0aWYgKCF3aW5kb3cubG9jYXRpb24uaGFzaCkge1xuXHRcdFx0d2luZG93LmxvY2F0aW9uLmhhc2ggPSBcIiNtYWluXCI7XG5cdFx0fVxuXHRcdCQod2luZG93KS50cmlnZ2VyKFwiaGFzaGNoYW5nZVwiKTtcblxuXHR9XG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0XG5cdH1cblx0c3RhdGVVcGRhdGUoKXtcblx0XHQvL2FsZXJ0KFwidXBkYXRlXCIpO1xuXHRcdHRoaXMuc3RhdGUuaXRlbXM9dGhpcy5jdXJyZW50VXNlci5pdGVtcztcblx0XHR0aGlzLnNldFN0YXRlKHRoaXMuc3RhdGUpO1xuXG5cdH1cblx0aGFuZGVsUm91dGUoKXtcblx0XHR2YXIgcm91dGUgPSB3aW5kb3cubG9jYXRpb24uaGFzaC5zbGljZSgxKTtcblx0XHR2YXIgcGFnZXM9e1xuXHRcdFx0bWFpbjp0aGlzLm1haW5DbGlja2VkLFxuXHRcdFx0d29ya29yZGVyczp0aGlzLndvcmtvcmRlcnNDbGlja2VkLFxuXHRcdFx0dGltZXNoZWV0OnRoaXMudGltZXNoZWV0Q2xpY2tlZFxuXHRcdH1bcm91dGVdKCk7XG5cdH1cblx0aGFuZGVsQ2xvY2tJbigpe1xuXG5cdH1cblx0bWFpbkNsaWNrZWQoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtwYWdlOidtYWluJ30pO1xuXHR9XG5cdHdvcmtvcmRlcnNDbGlja2VkKCl7XG5cblx0XHR0aGlzLnNldFN0YXRlKHtwYWdlOid3b3Jrb3JkZXJzJ30pO1xuXG5cdH1cblx0dGltZXNoZWV0Q2xpY2tlZCgpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe3BhZ2U6J3RpbWVzaGVldCd9KTtcblxuXHR9XG5cdC8vPEFmZml4V3JhcHBlciBjbGFzc05hbWU9XCJzdGlja3lfc3VibmF2IHRleHQtY2VudGVyXCIgIG9mZnNldD17MTQwfSBoZWlnaHQ9XCI0MHB4XCI+PC9BZmZpeFdyYXBwZXI+XG5cdHJlbmRlcigpe1xuXHRcdHZhciBvdXRwdXQ9Jyc7XG5cdFx0aWYgKHRoaXMuc3RhdGUuaXRlbXMudXNlcm5hbWU9PVwiR3Vlc3RcInx8dGhpcy5zdGF0ZS5pdGVtcy51c2VybmFtZT09XCJBZG1pbmlzdHJhdG9yXCIpe1xuXHRcdFx0b3V0cHV0PSg8aDM+R2V1c3QgT3IgQWRtaW48L2gzPik7XG5cdFx0fVxuXHRcdGVsc2UgaWYodGhpcy5zdGF0ZS5pdGVtcy5sZW5ndGg9PT0wKXtcblx0XHRcdG91dHB1dD0oPGgzPk5vIFVzZXIgRGF0YTwvaDM+KTtcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdG91dHB1dD0oXG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0PHVsIGNsYXNzTmFtZT1cIm5hdiBuYXYtcGlsbHMgY2VudGVyLXBpbGxzXCI+XG5cdFx0XHRcdFx0XHQ8bGkgb25DbGljaz17dGhpcy5tYWluQ2xpY2tlZH0gcm9sZT1cInByZXNlbnRhdGlvblwiIGNsYXNzTmFtZT17dGhpcy5zdGF0ZS5wYWdlPT0nbWFpbic/J2FjdGl2ZSc6Jyd9PjxhIGhyZWY9XCIjbWFpblwiPk1haW48L2E+PC9saT5cblx0XHRcdFx0XHRcdDxsaSBvbkNsaWNrPXt0aGlzLndvcmtvcmRlcnNDbGlja2VkfSByb2xlPVwicHJlc2VudGF0aW9uXCIgY2xhc3NOYW1lPXt0aGlzLnN0YXRlLnBhZ2U9PSd3b3Jrb3JkZXJzJz8nYWN0aXZlJzonJ30+PGEgaHJlZj1cIiN3b3Jrb3JkZXJzXCI+V29ya29yZGVyczwvYT48L2xpPlxuXHRcdFx0XHRcdFx0PGxpIG9uQ2xpY2s9e3RoaXMudGltZXNoZWV0Q2xpY2tlZH0gcm9sZT1cInByZXNlbnRhdGlvblwiIGNsYXNzTmFtZT17dGhpcy5zdGF0ZS5wYWdlPT0ndGltZXNoZWV0Jz8nYWN0aXZlJzonJ30+PGEgaHJlZj1cIiN0aW1lc2hlZXRcIj5UaW1lIFNoZWV0czwvYT48L2xpPlxuXHRcdFx0XHRcdDwvdWw+XG5cdFx0XHRcdFx0PGJyLz5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17dGhpcy5zdGF0ZS5wYWdlPT0ndGltZXNoZWV0JyB8fCB0aGlzLnN0YXRlLnBhZ2U9PSdtYWluJz8nJzonaGlkZGVuJ30+XG5cdFx0XHRcdFx0XHQ8RGF5c1RpbWVzaGVldHMgXG5cdFx0XHRcdFx0XHRcdGRhdGU9e3RoaXMuc3RhdGUuaXRlbXMudG9kYXl9XG5cdFx0XHRcdFx0XHRcdGZ1bGxfbmFtZT17dGhpcy5zdGF0ZS5pdGVtcy5jdXJyZW50X3VzZXIuZnVsbF9uYW1lfVxuXHRcdFx0XHRcdFx0XHRwYWdlPXt0aGlzLnN0YXRlLnBhZ2V9XG5cdFx0XHRcdFx0XHRcdGNyZXc9e3RoaXMuc3RhdGUuaXRlbXMuY3Jld31cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e3RoaXMuc3RhdGUucGFnZT09J3dvcmtvcmRlcnMnPycnOidoaWRkZW4nfT5cblx0XHRcdFx0XHRcdDxEYXlzV29ya29yZGVycyBcblx0XHRcdFx0XHRcdFx0Y3Jldz17dGhpcy5zdGF0ZS5pdGVtcy5jcmV3fSBcblx0XHRcdFx0XHRcdFx0ZGF0ZT17dGhpcy5zdGF0ZS5pdGVtcy50b2RheX1cblx0XHRcdFx0XHRcdFx0Ly9jb21wbGV0ZWQ9e3RoaXMuc3RhdGUuY29tcGxldGVkfVxuXHRcdFx0XHRcdFx0XHQvL2lucHJvZ3Jlc3M9e3RoaXMuc3RhdGUuaW5wcm9ncmVzc31cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRyZXR1cm4oPGRpdj5cblx0XHRcdHtvdXRwdXR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbihmdW5jdGlvbigpe1xuXHRmcmFwcGUucmVhZHkoZnVuY3Rpb24oKXtcblx0XHRSZWFjdERPTS5yZW5kZXIoIFxuXHRcdDxXb3JrUGFnZSAvPlxuXHQsIHRpbWVzaGVldHMgKTtcblx0fSlcblxufSkoKTtcblxuXG5cblxuXG4iXX0=
