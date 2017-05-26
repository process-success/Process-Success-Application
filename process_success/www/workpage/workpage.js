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
					{ className: this.props.page == 'main' ? '' : 'hidden' },
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

},{"./clockIn":2,"./employeeTime":3,"./timeSheet":4}],2:[function(require,module,exports){
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
		_this.workOrderChanged = _this.workOrderChanged.bind(_this);
		_this.socketUpdate = _this.socketUpdate.bind(_this);
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
		key: "workOrderChanged",
		value: function workOrderChanged() {
			if (this.workorderTool.items !== null) {
				this.setState({ workorders: this.workorderTool.items });
			}
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
			console.log("issue tool alert -----------  ");
			console.log(this.issueTool.items);
			this.setState({ issues: this.issueTool.items });
		}
	}, {
		key: 'submitIssue',
		value: function submitIssue(e) {
			e.preventDefault();
			console.log("save");
			console.log(this.state.modal);
			var newItem = {
				title: this.state.modalTitle,
				issue: this.state.modalDescription,
				priority: this.state.modalPriority,
				vineyard: this.props.location,
				work_order: this.props.workorder
			};
			if (this.state.modal == "new") {
				this.issueTool.create(newItem, function (item) {
					console.log("MEOW");
					ps.successAlert("Issue " + item.title + " created.");
				});
			} else {
				newItem.name = this.state.modalName;
				this.issueTool.update(newItem, function (item) {
					console.log("MEOW");
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

},{"../utils/modal":9,"./createIssue":6,"./taskCheck":7}],9:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c190aW1lc2hlZXRzL0RheXNUaW1lU2hlZXRzLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy9kYXlzX3RpbWVzaGVldHMvY2xvY2tJbi5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c190aW1lc2hlZXRzL2VtcGxveWVlVGltZS5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c190aW1lc2hlZXRzL3RpbWVTaGVldC5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c193b3Jrb3JkZXJzL0RheXNXb3Jrb3JkZXJzLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy9kYXlzX3dvcmtvcmRlcnMvY3JlYXRlSXNzdWUuanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL2RheXNfd29ya29yZGVycy90YXNrQ2hlY2suanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL2RheXNfd29ya29yZGVycy93b3Jrb3JkZXJUYXNrLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9tb2RhbC5qc3giLCJwcm9jZXNzX3N1Y2Nlc3Mvd3d3L3dvcmtwYWdlL3dvcmtwYWdlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OytlQUhBOzs7SUFLcUIsYzs7O0FBQ3BCLHlCQUFZLEtBQVosRUFBa0I7QUFBQTs7QUFBQSw4SEFDWCxLQURXOztBQUVqQixRQUFLLEtBQUwsR0FBVyxFQUFDLE9BQU0sRUFBUCxFQUFY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QSxDQVBEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuaW1wb3J0IEVtcGxveWVlVGltZSBmcm9tICcuL2VtcGxveWVlVGltZSc7XG5pbXBvcnQgVGltZVNoZWV0IGZyb20gJy4vdGltZVNoZWV0JztcbmltcG9ydCBDbG9ja0luIGZyb20gJy4vY2xvY2tJbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERheXNUaW1lU2hlZXRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuc3RhdGU9e2l0ZW1zOltdfTtcblx0XHR0aGlzLnN0YXRlLnRpbWU9Jyc7XG5cdFx0dGhpcy5hZGQ9e307XG5cblx0XHQvKiAgICAgRG8gdGhlIGJpbmQgdGhpbmcgICAgICAqL1xuXG5cdFx0Ly9UaW1lIGVtcGxveWVlIGxpbmUgaXRlbVxuXHRcdHRoaXMudGltZUNoYW5nZWQ9dGhpcy50aW1lQ2hhbmdlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMudXBkYXRlVGltZT10aGlzLnVwZGF0ZVRpbWUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmRlbGV0ZUVtcGxveWVlPXRoaXMuZGVsZXRlRW1wbG95ZWUuYmluZCh0aGlzKTtcblxuXHRcdHRoaXMudXBkYXRlRnJvbVNlcnZlcj10aGlzLnVwZGF0ZUZyb21TZXJ2ZXIuYmluZCh0aGlzKTtcblx0XHR0aGlzLnRpbWVTaGVldFdyYXBwZXI9dGhpcy50aW1lU2hlZXRXcmFwcGVyLmJpbmQodGhpcyk7XG5cblx0XHR0aGlzLmFkZEVtcGxveWVlPXRoaXMuYWRkRW1wbG95ZWUuYmluZCh0aGlzKVxuXHRcdHRoaXMudXBkYXRlRnJvbVNlcnZlclBhcmFtPXRoaXMudXBkYXRlRnJvbVNlcnZlclBhcmFtLmJpbmQodGhpcyk7XG5cblx0XHR0aGlzLmNsb2NrSW49dGhpcy5jbG9ja0luLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jbG9ja091dD10aGlzLmNsb2NrT3V0LmJpbmQodGhpcyk7XG5cdFx0LyogICAgZW5kIEJpbmQgZGluZyBkaW5nICAgICAgICAgKi9cblxuXHRcdHRoaXMuYXV0b2NvbXBsZXRlQXJyPVtdO1xuXHRcdHZhciBhcmdzPXt9O1xuXG5cdFx0Ly9HcmFiIHRoZSBlbXBsb3llZSB0aW1lc2hlZXQgZGF0YVxuXHRcdHRoaXMub2JqVG9vbD1wcy5pbml0VGltZVNoZWV0cygpXG5cdFx0dGhpcy5vYmpUb29sLmdldCh7ZGF0ZTpwcm9wcy5kYXRlfSxmdW5jdGlvbigpe1xuXHRcdFx0dGhpcy51cGRhdGVGcm9tU2VydmVyKCk7XG5cdFx0XHR0aGlzLm9ialRvb2wucmVhY3RTZXR1cCh0aGlzLnVwZGF0ZUZyb21TZXJ2ZXIpO1xuXHRcdH0uYmluZCh0aGlzKSk7XG5cblx0XHRpZiAodGhpcy5vYmpUb29sLml0ZW1zPT09dW5kZWZpbmVkIHx8dGhpcy5vYmpUb29sLml0ZW1zPT09IDAgKXtcblx0XHR9ZWxzZXt0aGlzLnN0YXRlLml0ZW1zPXRoaXMub2JqVG9vbC5pdGVtczt9XG5cblx0XHQvL0dyYWIgdGhlIGVtcGxveWVlIGxpc3Rcblx0XHR2YXIgdG9vbD1wcy5pbml0RW1wbG95ZWVMaXN0KCk7XG5cdFx0dG9vbC5nZXQoe30sZnVuY3Rpb24oKXtcblx0XHRcdHBzLmVtcGxveWVlX2xhYmxlcz0gdG9vbC5pdGVtcy5tYXAoZnVuY3Rpb24ob2JqKSB7IFxuXHRcdFx0XHR2YXIgck9iaiA9IHt9O1xuXHRcdFx0XHRyT2JqLmxhYmVsPW9iai5mdWxsX25hbWU7XG5cdFx0XHRcdHJPYmoudmFsdWU9b2JqLm5hbWU7XG5cdFx0XHRcdHJldHVybiByT2JqO1xuXHRcdFx0fSk7XG5cdFx0XHQkKGRvY3VtZW50KS50cmlnZ2VyKFwiZW1wbG95ZWVMYWJsZXNMb2FkZWRcIik7XG5cdFx0fSk7XG5cblxuXHRcdFxuXG5cdH1cblxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIGhlbHBlciBGdW5jdGlvblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLVxuXHR1cGRhdGVGcm9tU2VydmVyKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7aXRlbXM6dGhpcy5vYmpUb29sLml0ZW1zfSk7XG5cdH1cblx0dXBkYXRlRnJvbVNlcnZlclBhcmFtKGRhdGEsaW5kZXgpe1xuXHRcdHRoaXMub2JqVG9vbC5pdGVtc1tpbmRleF09ZGF0YTtcblx0XHR0aGlzLnNldFN0YXRlKHtpdGVtczp0aGlzLm9ialRvb2wuaXRlbXN9KTtcblx0fVxuXHRjcmV3c1RpbWVzaGVldEluZGV4KGNyZXcpe1xuXHRcdGZvciAodmFyIGk9MDsgaSA8IHRoaXMub2JqVG9vbC5pdGVtcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHR2YXIgaXRlbT10aGlzLm9ialRvb2wuaXRlbXNbaV07XG5cdFx0XHRpZihpdGVtLmNyZXc9PWNyZXcpe1xuXHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0Z2V0SW5kZXhUaW1lc2hlZXQodGltZXNoZWV0KXtcblx0XHRyZXR1cm4gdGhpcy5vYmpUb29sLmdldF9pbmRleF9vZl9pdGVtKHRpbWVzaGVldCk7XG5cdH1cblx0Z2V0SW5kZXhFbXBsb3llZSh0aW1lc2hlZXRJbmRleCxlbXBsb3llZU5hbWUpe1xuXHRcdHZhciBlbXBsb3llZXM9dGhpcy5vYmpUb29sLml0ZW1zW3RpbWVzaGVldEluZGV4XS5lbXBsb3llZXM7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlbXBsb3llZXMubGVuZ3RoOyBpKyspe1xuXHRcdFx0aWYgKGVtcGxveWVlTmFtZT09ZW1wbG95ZWVzW2ldLmVtcGxveWVlKXtcblx0XHRcdFx0cmV0dXJuIGk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdH1cblxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vICAgICAgIFRpbWVzaGVldCBXcmFwcGVyIEZ1bmN0aW9uc1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVx0XG5cblx0Y2xvY2tJbih0aW1lLGNyZXcpe1xuXG5cdFx0dmFyIHRzX2luZGV4PXRoaXMuY3Jld3NUaW1lc2hlZXRJbmRleChjcmV3KTtcblxuXHRcdHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzO1xuXHRcdGZvciAodmFyIGk9MDsgaSA8IHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzLmxlbmd0aDsgaSsrKXtcblx0XHRcdHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzW2ldLnN0YXJ0PXRpbWU7XG5cdFx0fVxuXHRcdHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uc3RhdHVzPVwiQ2xvY2tlZCBJblwiO1xuXHRcdHRoaXMub2JqVG9vbC51cGRhdGUodGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7aXRlbXM6dGhpcy5vYmpUb29sLml0ZW1zfSk7XG5cdH1cblx0Y2xvY2tPdXQodGltZSxjcmV3KXtcblxuXHRcdHZhciB0c19pbmRleD10aGlzLmNyZXdzVGltZXNoZWV0SW5kZXgoY3Jldyk7XG5cblx0XHR0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlcztcblx0XHRmb3IgKHZhciBpPTA7IGkgPCB0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHR0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlc1tpXS5lbmQ9dGltZTtcblx0XHR9XG5cdFx0dGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5zdGF0dXM9XCJDbG9ja2VkIE91dFwiO1xuXHRcdHRoaXMub2JqVG9vbC51cGRhdGUodGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7aXRlbXM6dGhpcy5vYmpUb29sLml0ZW1zfSk7XG5cdH1cblx0YWRkRW1wbG95ZWUodHNfbmFtZSwgZW1wbG95ZWVfbmFtZSl7XG5cdFx0dmFyIHRzX2luZGV4ID0gdGhpcy5nZXRJbmRleFRpbWVzaGVldCh0c19uYW1lKTtcblx0XHR2YXIgZW1wbG95ZWVJbmRleCA9IHRoaXMuZ2V0SW5kZXhFbXBsb3llZSh0c19pbmRleCxlbXBsb3llZV9uYW1lKTtcblxuXHRcdHZhciB1cGRhdGVDYWxsYmFjaz1mdW5jdGlvbihpbmRleCl7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oZGF0YSl7XHRcdFx0XG5cdFx0XHRcdHRoaXMudXBkYXRlRnJvbVNlcnZlclBhcmFtKGRhdGEsaW5kZXgpO1xuXHRcdFx0fS5iaW5kKHRoaXMpO1xuXHRcdH0uYmluZCh0aGlzKTtcblxuXHRcdGZvciAodmFyIGk9MDsgaSA8IHRoaXMub2JqVG9vbC5pdGVtcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHR2YXIgaXRlbSA9IHRoaXMub2JqVG9vbC5pdGVtc1tpXTtcblx0XHRcdGlmKGl0ZW0ubmFtZT09dHNfbmFtZSl7XG5cdFx0XHRcdGZvciAodmFyIHg9MDsgeCA8IGl0ZW0uZW1wbG95ZWVzLmxlbmd0aDsgeCsrKXtcblx0XHRcdFx0XHR2YXIgY29udGFpbmVyID0gaXRlbS5lbXBsb3llZXNbeF07XG5cdFx0XHRcdFx0aWYgKGNvbnRhaW5lci5lbXBsb3llZT09ZW1wbG95ZWVfbmFtZSl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gXCJkdXBsaWNhdGVcIjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5vYmpUb29sLml0ZW1zW2ldLmVtcGxveWVlcy5wdXNoKHsgZW1wbG95ZWUgOiBlbXBsb3llZV9uYW1lLCBuZXc6JzEnfSk7XG5cdFx0XHRcdHRoaXMub2JqVG9vbC51cGRhdGUodGhpcy5vYmpUb29sLml0ZW1zW2ldLHVwZGF0ZUNhbGxiYWNrKGkpLDEpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHZhciBkb25lPTE7XG5cdFx0XHRcdGlmKGl0ZW0uZW1wbG95ZWVzLmxlbmd0aD4wKXtcblx0XHRcdFx0XHRmb3IgKHZhciB4PTA7IHggPCBpdGVtLmVtcGxveWVlcy5sZW5ndGggJiYgZG9uZTsgeCsrKXtcblx0XHRcdFx0XHRcdHZhciBjb250YWluZXIgPSBpdGVtLmVtcGxveWVlc1t4XTtcblx0XHRcdFx0XHRcdGlmIChjb250YWluZXIuZW1wbG95ZWU9PWVtcGxveWVlX25hbWUpe1xuXHRcdFx0XHRcdFx0XHR0aGlzLm9ialRvb2wuaXRlbXNbaV0uZW1wbG95ZWVzLnNwbGljZSh4LCAxKTtcblx0XHRcdFx0XHRcdFx0dGhpcy5vYmpUb29sLmNoYW5nZWQodGhpcy5vYmpUb29sLml0ZW1zW2ldKTtcblx0XHRcdFx0XHRcdFx0ZG9uZT0wO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHR9O1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyAgICAgICAgICAgVGltZXNoZWV0IFdyYXBwZXJcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cdFxuXHR0aW1lU2hlZXRXcmFwcGVyKGl0ZW0saW5kZXgpe1xuXHRcdHZhciBlbXBsb3llZV9vdXRwdXQ9W107XG5cdFx0aWYoaXRlbS5lbXBsb3llZXM9PT11bmRlZmluZWQpe1xuXG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHR2YXIgZW1wbG95ZWVPdXRwdXQ9aXRlbS5lbXBsb3llZXMubWFwKGZ1bmN0aW9uKGl0ZW1fZW1wbG95ZWUsaW5kZXhfZW1wbG95ZWUpe1xuXHRcdFx0IFx0ZW1wbG95ZWVfb3V0cHV0LnB1c2godGhpcy5lbXBsb3llZUxpbmVJdGVtKGl0ZW1fZW1wbG95ZWUsaXRlbS5uYW1lLGluZGV4X2VtcGxveWVlKSk7XG5cdFx0XHR9LmJpbmQodGhpcykpO1xuXHRcdH1cblxuXHRcdHJldHVybihcblxuXHRcdFx0PFRpbWVTaGVldFxuXHRcdFx0XHRrZXk9e2luZGV4fSBcblx0XHRcdFx0bmFtZT17aXRlbS5uYW1lfVxuXHRcdFx0XHRkYXRlPXtpdGVtLmRhdGV9XG5cdFx0XHRcdGNyZXc9e2l0ZW0uY3Jld31cblx0XHRcdFx0ZW1wbG95ZWVzPXtlbXBsb3llZV9vdXRwdXR9XG5cdFx0XHRcdGFkZEVtcGxveWVlPXt0aGlzLmFkZEVtcGxveWVlfVxuXHRcdFx0XHRvblVwZGF0ZT17dGhpcy51cGRhdGV9XG5cdFx0XHQvPlxuXG5cdFx0KTtcblx0fVxuXG5cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyAgICAgICBFbXBsb3llZSBUaW1lIEZvcm0gTGluZWl0ZW1cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0ZGVsZXRlRW1wbG95ZWUoZW1wbG95ZWUsdGltZXNoZWV0KXtcblx0XHR2YXIgdHNfaW5kZXggPSB0aGlzLmdldEluZGV4VGltZXNoZWV0KHRpbWVzaGVldCk7XG5cdFx0dmFyIGRvbmU9MTtcblx0XHR2YXIgaXRlbT10aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdO1xuXHRcdGlmKGl0ZW0uZW1wbG95ZWVzLmxlbmd0aD4wKXtcblx0XHRcdGZvciAodmFyIHg9MDsgeCA8IGl0ZW0uZW1wbG95ZWVzLmxlbmd0aCAmJiBkb25lOyB4Kyspe1xuXHRcdFx0XHR2YXIgY29udGFpbmVyID0gaXRlbS5lbXBsb3llZXNbeF07XG5cdFx0XHRcdGlmIChjb250YWluZXIuZW1wbG95ZWU9PWVtcGxveWVlKXtcblx0XHRcdFx0XHR0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlcy5zcGxpY2UoeCwgMSk7XG5cdFx0XHRcdFx0Ly/GkmNvbnNvbGUubG9nKHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0pO1xuXHRcdFx0XHRcdHRoaXMub2JqVG9vbC51cGRhdGUodGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XSk7XG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7aXRlbXM6dGhpcy5vYmpUb29sLml0ZW1zfSk7XG5cdFx0XHRcdFx0ZG9uZT0wO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0dGltZUNoYW5nZWQocG9zaXRpb24sZW1wbG95ZWUsdGltZXNoZWV0LHZhbHVlKXtcblx0XHR2YXIgdHNfaW5kZXggPSB0aGlzLmdldEluZGV4VGltZXNoZWV0KHRpbWVzaGVldCk7XG5cdFx0dmFyIGVtcGxveWVlSW5kZXggPSB0aGlzLmdldEluZGV4RW1wbG95ZWUodHNfaW5kZXgsZW1wbG95ZWUpO1xuXHRcdHRoaXMuc3RhdFxuXHRcdGlmKHBvc2l0aW9uPT0nZW5kJyl7XG5cdFx0XHR0aGlzLnN0YXRlLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXNbZW1wbG95ZWVJbmRleF0uZW5kPXZhbHVlO1xuXHRcdH1cblx0XHRlbHNle3RoaXMuc3RhdGUuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlc1tlbXBsb3llZUluZGV4XS5zdGFydD12YWx1ZX1cblx0ICAgIHRoaXMuc2V0U3RhdGUoe2l0ZW1zOnRoaXMuc3RhdGUuaXRlbXN9KTtcblx0fVxuXHR1cGRhdGVUaW1lKHBvc2l0aW9uLGVtcGxveWVlLHRpbWVzaGVldCx2YWx1ZSl7XG5cdFx0dmFyIHRzX2luZGV4ID0gdGhpcy5nZXRJbmRleFRpbWVzaGVldCh0aW1lc2hlZXQpO1xuXHRcdHZhciBlbXBsb3llZUluZGV4ID0gdGhpcy5nZXRJbmRleEVtcGxveWVlKHRzX2luZGV4LGVtcGxveWVlKTtcblx0XHR2YXIgc2F2ZT0wO1xuXHRcdHZhbHVlPXBzLnRpbWVfYWRkX2RpZ2l0cyh2YWx1ZSlcblx0XHRpZihwb3NpdGlvbj09J2VuZCcgJiYgcHMudGltZV9hZGRfZnJvbnRfemVybyh0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlc1tlbXBsb3llZUluZGV4XS5lbmQpICE9IHBzLnRpbWVfYWRkX2RpZ2l0cyh2YWx1ZSkpeyBcblx0XHRcdHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzW2VtcGxveWVlSW5kZXhdLmVuZD1wcy50aW1lX2FkZF9kaWdpdHModmFsdWUpO1xuXHRcdFx0c2F2ZT0xO1xuXHRcdH1cblx0ICAgIGlmKHBvc2l0aW9uPT0nc3RhcnQnICYmIHBzLnRpbWVfYWRkX2Zyb250X3plcm8odGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXNbZW1wbG95ZWVJbmRleF0uc3RhcnQpICE9IHBzLnRpbWVfYWRkX2RpZ2l0cyh2YWx1ZSkpe1xuXHQgICAgXHR0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlc1tlbXBsb3llZUluZGV4XS5zdGFydD1wcy50aW1lX2FkZF9kaWdpdHModmFsdWUpO1xuXHQgICAgXHRzYXZlPTE7XG5cdCAgICB9XG5cdCAgICBpZihzYXZlKXtcblx0XHQgICAgdGhpcy5zZXRTdGF0ZSh7aXRlbXM6dGhpcy5vYmpUb29sLml0ZW1zfSk7XG5cdFx0ICAgIHRoaXMub2JqVG9vbC51cGRhdGUodGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XSxmdW5jdGlvbigpe1xuXHRcdCAgICBcdHBzLnN1Y2Nlc3NBbGVydCh0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlc1tlbXBsb3llZUluZGV4XS5lbXBsb3llZV9uYW1lK1wiIHRpbWUgdXBkYXRlZCFcIik7XG5cdFx0ICAgIH0uYmluZCh0aGlzKSk7XG5cdFx0fVxuXHR9XG5cdGVtcGxveWVlTGluZUl0ZW0oZW1wbG95ZWVfY29udGFpbmVyLHRpbWVfc2hlZXQsZW1wbG95ZWVfaW5kZXgpe1xuXHRcdHJldHVybihcblx0XHRcdDxFbXBsb3llZVRpbWVcblx0XHRcdFx0a2V5PXtlbXBsb3llZV9pbmRleH1cblx0XHRcdFx0dGltZXNoZWV0PXt0aW1lX3NoZWV0fVxuXHRcdFx0XHRlbXBsb3llZV9uYW1lPXtlbXBsb3llZV9jb250YWluZXIuZW1wbG95ZWVfbmFtZX1cblx0XHRcdFx0ZW1wbG95ZWU9e2VtcGxveWVlX2NvbnRhaW5lci5lbXBsb3llZX1cblx0XHRcdFx0c3RhcnQ9e3BzLnRpbWVfYWRkX2Zyb250X3plcm8oZW1wbG95ZWVfY29udGFpbmVyLnN0YXJ0KX1cblx0XHRcdFx0ZW5kPXtwcy50aW1lX2FkZF9mcm9udF96ZXJvKGVtcGxveWVlX2NvbnRhaW5lci5lbmQpfVxuXHRcdFx0XHR1cGRhdGVUaW1lPXt0aGlzLnVwZGF0ZVRpbWV9XG5cdFx0XHRcdHRpbWVDaGFuZ2VkPXt0aGlzLnRpbWVDaGFuZ2VkfVxuXHRcdFx0XHRkZWxldGVFbXBsb3llZT17dGhpcy5kZWxldGVFbXBsb3llZX1cblx0XHRcdC8+XG5cdFx0KTtcblx0fVxuXG5cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vICAgICAgICBSZW5kZXJcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRyZW5kZXIoKXtcblx0XHQvL2hhbmRlbCBlbXB0eSByZXR1cm5cblx0XHRpZiAodGhpcy5zdGF0ZS5pdGVtcy5sZW5ndGg9PT0wfHx0aGlzLnN0YXRlLml0ZW1zPT09dW5kZWZpbmVkKXtcblx0XHRcdHJldHVybiAoPGRpdj5ObyBUaW1lIFNoZWV0cywgc3RhcnQgYnkgPGEgaHJlZj1cIi9kZXNrXCI+Y3JlYXRpbmcgc29tZSBjcmV3cyE8L2E+PC9kaXY+KTtcblx0XHR9XG5cdFx0dmFyIG91dHB1dD1bXVxuXHRcdHRoaXMuc3RhdGUuaXRlbXMubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblx0XHRcdGlmKGl0ZW0uY3Jldz09dGhpcy5wcm9wcy5jcmV3KXtcblx0XHRcdFx0b3V0cHV0LnVuc2hpZnQodGhpcy50aW1lU2hlZXRXcmFwcGVyKGl0ZW0saW5kZXgpKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRvdXRwdXQucHVzaCh0aGlzLnRpbWVTaGVldFdyYXBwZXIoaXRlbSxpbmRleCkpO1xuXHRcdFx0fVxuXHRcdH0uYmluZCh0aGlzKSk7XG5cblx0XHR2YXIgdHNfaW5kZXg9dGhpcy5jcmV3c1RpbWVzaGVldEluZGV4KHRoaXMucHJvcHMuY3Jldyk7XG5cdFx0dmFyIHN0YXR1cz0nJztcblx0XHRpZiAodHNfaW5kZXg9PXVuZGVmaW5lZCl7dmFyIHN0YXR1cz1mYWxzZTt9XG5cdFx0ZWxzZXtzdGF0dXMgPXRoaXMuc3RhdGUuaXRlbXNbdHNfaW5kZXhdLnN0YXR1c31cblx0XHRcblxuXHRcdC8vTUFJTiBSRU5ERVJcblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17dGhpcy5wcm9wcy5wYWdlPT0nbWFpbic/Jyc6J2hpZGRlbid9PlxuXHRcdFx0XHRcdDxDbG9ja0luXG5cdFx0XHRcdFx0XHRjbG9ja0luPXt0aGlzLmNsb2NrSW59XG5cdFx0XHRcdFx0XHRjbG9ja091dD17dGhpcy5jbG9ja091dH1cblx0XHRcdFx0XHRcdHN0YXR1cz17c3RhdHVzfVxuXHRcdFx0XHRcdFx0ZnVsbF9uYW1lPXt0aGlzLnByb3BzLmZ1bGxfbmFtZX1cblx0XHRcdFx0XHRcdGRhdGU9e3RoaXMucHJvcHMuZGF0ZX1cblx0XHRcdFx0XHRcdGNyZXc9e3RoaXMucHJvcHMuY3Jld31cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e3RoaXMucHJvcHMucGFnZT09J3RpbWVzaGVldCc/Jyc6J2hpZGRlbid9PlxuXHRcdFx0XHRcdDxici8+XG5cdFx0XHRcdFx0e291dHB1dH1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblxuXHRcdCk7XG5cblx0fTtcdFxufVxuXG5cblxuXG5cbiIsIi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xvY2tJbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnRvZ2dsZVRpbWVJbnB1dD10aGlzLnRvZ2dsZVRpbWVJbnB1dC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY2xvY2tJbj10aGlzLmNsb2NrSW4uYmluZCh0aGlzKTtcblx0XHR0aGlzLmNsb2NrT3V0PXRoaXMuY2xvY2tPdXQuYmluZCh0aGlzKTtcblx0XHR0aGlzLm9uQ2hhbmdlPXRoaXMub25DaGFuZ2UuYmluZCh0aGlzKTtcblxuXHRcdHRoaXMuc3RhdGU9e1xuXHRcdFx0ZGF0ZTpuZXcgRGF0ZSgpLFxuXHRcdFx0c3BlY2lmeVRpbWU6ZmFsc2Vcblx0XHR9O1xuXG5cdH1cblx0Y2xvY2tJbihlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0aWYodGhpcy5zdGF0ZS5zcGVjaWZ5VGltZT09ZmFsc2Upe1xuXHRcdFx0dmFyIHRpbWU9dGhpcy5zdGF0ZS5kYXRlLnRvTG9jYWxlVGltZVN0cmluZyhbXSwge2hvdXI6ICcyLWRpZ2l0JywgbWludXRlOicyLWRpZ2l0Jyxob3VyMTI6IGZhbHNlfSlcblx0XHRcdC8vY29uc29sZS5sb2codGltZSk7XG5cdFx0XHRwcy5zdWNjZXNzQWxlcnQoXCJDbG9ja2VkIGluIGF0IFwiICsgdGhpcy5zdGF0ZS5kYXRlLnRvTG9jYWxlVGltZVN0cmluZyhbXSwge2hvdXI6ICcyLWRpZ2l0JywgbWludXRlOicyLWRpZ2l0J30pKVxuXHRcdFx0dGhpcy5wcm9wcy5jbG9ja0luKHRpbWUsIHRoaXMucHJvcHMuY3Jldylcblx0XHR9ZWxzZXtcblx0XHRcdC8vY29uc29sZS5sb2codGhpcy5zdGF0ZS50aW1lKVxuXHRcdFx0aWYodGhpcy5zdGF0ZS50aW1lIT11bmRlZmluZWQpe1xuXHRcdFx0XHR0aGlzLnByb3BzLmNsb2NrSW4odGhpcy5zdGF0ZS50aW1lLCB0aGlzLnByb3BzLmNyZXcpO1xuXHRcdFx0XHRwcy5zdWNjZXNzQWxlcnQoXCJDbG9ja2VkIGluXCIpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdC8vaW52YWxpZCB0aW1lIGVycm9yXG5cdFx0XHRcdHBzLmZhaWxBbGVydChcIkludmFsaWQgdGltZS5cIilcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0Y2xvY2tPdXQoZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGlmKHRoaXMuc3RhdGUuc3BlY2lmeVRpbWU9PWZhbHNlKXtcblx0XHRcdHZhciB0aW1lPXRoaXMuc3RhdGUuZGF0ZS50b0xvY2FsZVRpbWVTdHJpbmcoW10sIHtob3VyOiAnMi1kaWdpdCcsIG1pbnV0ZTonMi1kaWdpdCcsaG91cjEyOiBmYWxzZX0pXG5cdFx0XHQvL2NvbnNvbGUubG9nKHRpbWUpO1xuXHRcdFx0cHMuc3VjY2Vzc0FsZXJ0KFwiQ2xvY2tlZCBvdXQgYXQgXCIgKyB0aGlzLnN0YXRlLmRhdGUudG9Mb2NhbGVUaW1lU3RyaW5nKFtdLCB7aG91cjogJzItZGlnaXQnLCBtaW51dGU6JzItZGlnaXQnfSkrXCIgSGF2ZSBhIGdyZWF0IG5pZ2h0IVwiKVxuXHRcdFx0dGhpcy5wcm9wcy5jbG9ja091dCh0aW1lLCB0aGlzLnByb3BzLmNyZXcpXG5cdFx0fWVsc2V7XG5cdFx0XHQvL2NvbnNvbGUubG9nKHRoaXMuc3RhdGUudGltZSlcblx0XHRcdGlmKHRoaXMuc3RhdGUudGltZSE9dW5kZWZpbmVkKXtcblx0XHRcdFx0dGhpcy5wcm9wcy5jbG9ja091dCh0aGlzLnN0YXRlLnRpbWUsIHRoaXMucHJvcHMuY3Jldyk7XG5cdFx0XHRcdHBzLnN1Y2Nlc3NBbGVydChcIkNsb2NrZWQgT3V0ISAgSGF2ZSBhIGdyZWF0IG5pZ2h0IVwiKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHQvL2ludmFsaWQgdGltZSBlcnJvclxuXHRcdFx0XHRwcy5mYWlsQWxlcnQoXCJJbnZhbGlkIHRpbWUuXCIpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHRvZ2dsZVRpbWVJbnB1dChlKXtcblx0XHQvL2NvbnNvbGUubG9nKHRoaXMuc3RhdGUuc3BlY2lmeVRpbWUpO1xuXHRcdGlmKHRoaXMuc3RhdGUuc3BlY2lmeVRpbWUpe1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7c3BlY2lmeVRpbWU6ZmFsc2V9KTtcblx0XHR9XG5cdFx0ZWxzZXt0aGlzLnNldFN0YXRlKHtzcGVjaWZ5VGltZTp0cnVlfSk7fVxuXHR9XG5cdG9uQ2hhbmdlKGUpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe3RpbWU6ZS50YXJnZXQudmFsdWV9KTtcblx0fVxuXHRjb21wb25lbnREaWRNb3VudCgpIHtcblx0XHR0aGlzLnRpbWVySUQgPSBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLnRpY2soKSwxMDAwMCk7XG5cdH1cblxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcblx0XHRjbGVhckludGVydmFsKHRoaXMudGltZXJJRCk7XG5cdH1cblxuXHR0aWNrKCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0ZGF0ZTogbmV3IERhdGUoKVxuXHRcdH0pO1xuXHR9XG5cdHJlbmRlcigpe1xuXG5cdFxuXHRcdHZhciB2YWx1ZXM9e1xuXHRcdFx0J0NyZWF0ZWQnOlt0aGlzLmNsb2NrSW4sJ0Nsb2NrIEluJywnYnRuIGJ0bi1sZyBidG4tc3VjY2VzcyBidG4tYmxvY2snXSxcblx0XHRcdCdDbG9ja2VkIEluJzpbdGhpcy5jbG9ja091dCwgJ0Nsb2NrIE91dCcsICdidG4gYnRuLWxnIGJ0bi1zdWNjZXNzIGJ0bi1ibG9jaycgXSxcblx0XHRcdCdDbG9ja2VkIE91dCc6W3RoaXMuY2xvY2tPdXQsICdDaGFuZ2UgQ2xvY2tvdXQgVGltZScsJ2J0biBidG4tbGcgYnRuLXN1Y2Nlc3MgYnRuLWJsb2NrJ10sXG5cdFx0XHQnU3VibWludGVkJzpbJycsJ0FscmVhZHkgU3VibWludGVkJywnYnRuIGJ0bi1sZyBidG4tc3VjY2VzcyBidG4tYmxvY2snXSxcblx0XHRcdCdBcHJvdmVkJzpbJycsJ0FscmVhZHkgU3VibWludGVkJywnYnRuIGJ0bi1sZyBidG4tc3VjY2VzcyBidG4tYmxvY2snXVxuXHRcdH1bdGhpcy5wcm9wcy5zdGF0dXNdO1xuXHRcdHZhciBvdXRwdXQ9Jyc7XG5cdFx0aWYgKHZhbHVlcz09dW5kZWZpbmVkKXtcblx0XHRcdG91dHB1dD0oPGEgaHJlZj1cIiN0aW1lc2hlZXRcIj5Zb3UgYXJlIG5vdCBpbiBhIFRpbWUgU2hlZXQgYWRkIHlvdXJzZWxmLjwvYT4pO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0dmFyIGlucHV0RmllbGQgPSAoIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPXt2YWx1ZXNbMl19IG9uQ2xpY2s9e3ZhbHVlc1swXX0gdmFsdWU9e3ZhbHVlc1sxXX0gLz4pO1xuXHRcdFx0b3V0cHV0PShcblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG5cdFx0XHRcdFx0V2VsY29tZSA8c3BhbiBjbGFzc05hbWU9XCJ1c2VybmFtZVwiPnt0aGlzLnByb3BzLmZ1bGxfbmFtZX08L3NwYW4+XG5cdFx0XHRcdDwvaDM+XG5cdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnt0aGlzLnN0YXRlLmRhdGUudG9Mb2NhbGVUaW1lU3RyaW5nKFtdLCB7aG91cjogJzItZGlnaXQnLCBtaW51dGU6JzItZGlnaXQnfSl9IG9uIHt0aGlzLnN0YXRlLmRhdGUudG9EYXRlU3RyaW5nKCl9IDwvaDM+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdjbG9ja0luJz5cblx0XHRcdFx0XHQ8Zm9ybSBjbGFzc05hbWU9XCJmb3JtLWNoZWNraW5cIiByb2xlPVwiZm9ybVwiPlxuXHRcdFx0XHRcdFx0e2lucHV0RmllbGR9XG5cdFx0XHRcdFx0XHQ8YnIvPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3RleHQtY2VudGVyJz5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxpbnB1dCBcblx0XHRcdFx0XHRcdFx0XHRcdHR5cGU9XCJ0aW1lXCIgXG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9e3RoaXMuc3RhdGUuc3BlY2lmeVRpbWUgPyAnZm9ybS1jb250cm9sIHNtYWxsLXRpbWUnOidoaWRkZW4nfSBcblx0XHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxuXHRcdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8YnIvPlxuXHRcdFx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHRcIiBvbkNsaWNrPXt0aGlzLnRvZ2dsZVRpbWVJbnB1dH0+e3RoaXMuc3RhdGUuc3BlY2lmeVRpbWU/JyAtIFVzZSBDdXJyZW50IFRpbWUnOicgKyBTcGVjaWZ5IGEgVGltZSd9PC9hPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9mb3JtPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSIsIlxuLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXlzVGltZVNoZWV0cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHQvL0JpbmRpbmcgZGluZ1xuXHRcdHRoaXMuY2hhbmdlZFN0YXJ0PXRoaXMuY2hhbmdlZFN0YXJ0LmJpbmQodGhpcylcblx0XHR0aGlzLmNoYW5nZWRFbmQ9dGhpcy5jaGFuZ2VkRW5kLmJpbmQodGhpcyk7XG5cdFx0dGhpcy51cGRhdGVTdGFydD10aGlzLnVwZGF0ZVN0YXJ0LmJpbmQodGhpcyk7XG5cdFx0dGhpcy51cGRhdGVFbmQ9dGhpcy51cGRhdGVFbmQuYmluZCh0aGlzKTtcblx0XHR0aGlzLmRlbGV0ZT10aGlzLmRlbGV0ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMua2V5UHJlc3NlZFN0YXJ0PXRoaXMua2V5UHJlc3NlZFN0YXJ0LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5rZXlQcmVzc2VkRW5kPXRoaXMua2V5UHJlc3NlZEVuZC5iaW5kKHRoaXMpO1xuXHR9XG5cdGNoYW5nZWRTdGFydChlKXtcblx0XHR0aGlzLnByb3BzLnRpbWVDaGFuZ2VkICAoJ3N0YXJ0Jyx0aGlzLnByb3BzLmVtcGxveWVlLHRoaXMucHJvcHMudGltZXNoZWV0LGUudGFyZ2V0LnZhbHVlKTtcblx0fVxuXHRjaGFuZ2VkRW5kKGUpe1xuXHRcdHRoaXMucHJvcHMudGltZUNoYW5nZWQoJ2VuZCcsdGhpcy5wcm9wcy5lbXBsb3llZSx0aGlzLnByb3BzLnRpbWVzaGVldCxlLnRhcmdldC52YWx1ZSk7XG5cdH1cblx0dXBkYXRlU3RhcnQoZSl7XG5cdFx0aWYoZS50YXJnZXQudmFsdWUhPScnKXtcblx0XHRcdHRoaXMucHJvcHMudXBkYXRlVGltZSgnc3RhcnQnLHRoaXMucHJvcHMuZW1wbG95ZWUsdGhpcy5wcm9wcy50aW1lc2hlZXQsIGUudGFyZ2V0LnZhbHVlKTtcblx0XHR9XG5cdH1cblx0dXBkYXRlRW5kKGUpe1xuXHRcdGlmKGUudGFyZ2V0LnZhbHVlIT0nJyl7XG5cdFx0XHR0aGlzLnByb3BzLnVwZGF0ZVRpbWUoJ2VuZCcsdGhpcy5wcm9wcy5lbXBsb3llZSx0aGlzLnByb3BzLnRpbWVzaGVldCwgZS50YXJnZXQudmFsdWUpO1xuXHRcdH1cblx0fVxuXHRkZWxldGUoZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMucHJvcHMuZGVsZXRlRW1wbG95ZWUodGhpcy5wcm9wcy5lbXBsb3llZSx0aGlzLnByb3BzLnRpbWVzaGVldCk7XG5cdH1cblx0a2V5UHJlc3NlZFN0YXJ0KGUpIHtcblx0ICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xuXHQgICAgXHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdCAgICBcdGlmKHRoaXMucHJvcHMuc3RhcnQhPScnKXtcblx0XHRcdFx0dGhpcy5wcm9wcy51cGRhdGVUaW1lKCdzdGFydCcsdGhpcy5wcm9wcy5lbXBsb3llZSx0aGlzLnByb3BzLnRpbWVzaGVldCwgdGhpcy5wcm9wcy5zdGFydCk7XG5cdFx0XHR9XG5cdCAgICB9XG5cdCB9XG5cdGtleVByZXNzZWRFbmQoZSkge1xuXHQgICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSB7XG5cdCAgICBcdGUucHJldmVudERlZmF1bHQoKTtcblx0ICAgIFx0aWYodGhpcy5wcm9wcy5lbmQhPScnKXtcblx0XHRcdFx0dGhpcy5wcm9wcy51cGRhdGVUaW1lKCdzdGFydCcsdGhpcy5wcm9wcy5lbXBsb3llZSx0aGlzLnByb3BzLnRpbWVzaGVldCwgdGhpcy5wcm9wcy5lbmQpO1xuXHRcdFx0fVxuXHQgICAgfVxuXHQgfVxuXHRyZW5kZXIoKXtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8bGkgY2xhc3NOYW1lPVwibGlzdC1ncm91cC1pdGVtXCIgPlxuXHRcdFx0XHQ8Zm9ybSAgY2xhc3NOYW1lPVwiZm9ybS1pbmxpbmUgcm93IGRheV90aW1lX2Zvcm1fcm93XCI+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWwgY29sLW1kLTMgY29sLXNtLTMgY29sLXhzLTEyIHRleHQtY2VudGVyIGRheV90aW1lX2Zvcm1fcm93X2VsZW1lbnRcIj48c3Ryb25nPnsgdGhpcy5wcm9wcy5lbXBsb3llZV9uYW1lfTwvc3Ryb25nPjwvbGFiZWw+XG5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC0zIGNvbC1zbS0zIGNvbC14cy0xMiBkYXlfdGltZV9mb3JtX3Jvd19lbGVtZW50XCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAtYWRkb25cIj5TdGFydDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8aW5wdXQgXG5cdFx0XHRcdFx0XHRcdFx0dHlwZT1cInRpbWVcIiBcblx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgc3RhcnRcIiBcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17dGhpcy5wcm9wcy5zdGFydH1cblx0XHRcdFx0XHRcdFx0XHRvbkJsdXI9e3RoaXMudXBkYXRlU3RhcnR9XG5cdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuY2hhbmdlZFN0YXJ0fVxuXHRcdFx0XHRcdFx0XHRcdG9uS2V5UHJlc3M9e3RoaXMua2V5UHJlc3NlZFN0YXJ0fVxuXG5cdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC0zIGNvbC1zbS0zIGNvbC14cy0xMiBkYXlfdGltZV9mb3JtX3Jvd19lbGVtZW50XCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAtYWRkb25cIj5FbmQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGlucHV0IFxuXHRcdFx0XHRcdFx0XHRcdHR5cGU9XCJ0aW1lXCIgXG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIGVuZFwiIFxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlPXt0aGlzLnByb3BzLmVuZH1cblx0XHRcdFx0XHRcdFx0XHRvbkJsdXI9e3RoaXMudXBkYXRlRW5kfVxuXHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmNoYW5nZWRFbmR9XG5cdFx0XHRcdFx0XHRcdFx0b25LZXlQcmVzcz17dGhpcy5rZXlQcmVzc2VkRW5kfVxuXHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC0zIGNvbC1zbS0zIGNvbC14cy0xMiB0ZXh0LWNlbnRlciBkYXlfdGltZV9mb3JtX3Jvd19lbGVtZW50XCI+XG5cdFx0XHRcdFx0XHQ8YnV0dG9uIFxuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJkZWxldGUgYnRuIGJ0bi1kYW5nZXJcIlxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLmRlbGV0ZX1cblx0XHRcdFx0XHRcdD5EZWxldGU8L2J1dHRvbj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9mb3JtPlxuXHRcdFx0PC9saT5cblx0XHQpO1xuXHR9XG59IiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbWVTaGVldCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHQvKiAgICAgRG8gdGhlIGJpbmQgdGhpbmcgICAgICAqL1xuXHRcdHRoaXMuYXV0b2NvbXBsZXRlPXRoaXMuYXV0b2NvbXBsZXRlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5hZGRDaGFuZ2VkPXRoaXMuYWRkQ2hhbmdlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuYWRkQ2xpY2tlZD10aGlzLmFkZENsaWNrZWQuYmluZCh0aGlzKTtcblx0fVxuXG5cdGF1dG9jb21wbGV0ZShpbnB1dCl7XG5cdFx0dmFyIGNvbmZpZyA9IHtcblx0XHRcdG1pbkNoYXJzOiAwLFxuXHRcdFx0bWF4SXRlbXM6IDk5LFxuXHRcdFx0YXV0b0ZpcnN0OiB0cnVlLFxuXHRcdFx0ZmlsdGVyOiBmdW5jdGlvbihpdGVtLCBpbnB1dCkge1xuXHRcdFx0XHR2YXIgdmFsdWUgPSBpdGVtLnZhbHVlLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdGlmKHZhbHVlLmluZGV4T2YoJ2lzX2FjdGlvbicpICE9PSAtMSB8fFxuXHRcdFx0XHRcdHZhbHVlLmluZGV4T2YoaW5wdXQpICE9PSAtMSkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0aXRlbTogZnVuY3Rpb24oaXRlbSwgaW5wdXQpIHtcblx0XHRcdFx0dmFyIGQgPSBpdGVtO1xuXHRcdFx0XHR2YXIgaHRtbCA9IFwiPHNwYW4+XCIgKyBfXyhpdGVtLmxhYmVsIHx8IGl0ZW0udmFsdWUpICsgXCI8L3NwYW4+XCI7XG5cdFx0XHRcdHJldHVybiAkKCc8bGk+PC9saT4nKVxuXHRcdFx0XHRcdC5kYXRhKCdpdGVtLmF1dG9jb21wbGV0ZScsIGl0ZW0pXG5cdFx0XHRcdFx0Lmh0bWwoJzxhPjxwPicgKyBodG1sICsgJzwvcD48L2E+Jylcblx0XHRcdFx0XHQuZ2V0KDApO1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0dmFyIGF3ID0gbmV3IEF3ZXNvbXBsZXRlKGlucHV0LGNvbmZpZyk7XG5cdFx0aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRcdCdhd2Vzb21wbGV0ZS1zZWxlY3Rjb21wbGV0ZScsXG5cdFx0XHRcdHRoaXMuYWRkQ2hhbmdlZFxuXHRcdCk7XG5cdFx0YXcubGlzdD1wcy5lbXBsb3llZV9sYWJsZXNcblx0XHQkKGRvY3VtZW50KS5iaW5kKCdlbXBsb3llZUxhYmxlc0xvYWRlZCcsZnVuY3Rpb24oKXtcblx0XHRcdGF3Lmxpc3Q9cHMuZW1wbG95ZWVfbGFibGVzO1xuXHRcdH0pO1xuXHR9XG5cdGFkZENoYW5nZWQoZSl7XG5cdFx0dGhpcy5hZGQ9ZS50YXJnZXQudmFsdWU7XG5cdH07XG5cdGFkZENsaWNrZWQoZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHZhciB3b19uYW1lPXRoaXMucHJvcHMubmFtZTtcblx0XHR2YXIgZW1wbG95ZWVfbmFtZT10aGlzLmFkZDtcblx0XHQvL0NhbGwgYmFjayBmb3IgYmluZGluZz9cblx0XHR2YXIgdXBkYXRlQ2FsbGJhY2s9ZnVuY3Rpb24oaW5kZXgpe1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKGRhdGEpe1x0XHRcdFxuXHRcdFx0XHR0aGlzLnVwZGF0ZUZyb21TZXJ2ZXJQYXJhbShkYXRhLGluZGV4KTtcblx0XHRcdH0uYmluZCh0aGlzKTtcblx0XHR9LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5wcm9wcy5hZGRFbXBsb3llZSh3b19uYW1lLCBlbXBsb3llZV9uYW1lKTtcblx0fTtcblx0cmVuZGVyKCl7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYW5lbCBwYW5lbC1kZWZhdWx0IHJvd1wiPlxuXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtaGVhZGluZ1wiPlxuXHRcdFx0XHRcdDxoNCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPiBUaW1lIFNoZWV0IHt0aGlzLnByb3BzLmRhdGV9IGZvciB7dGhpcy5wcm9wcy5jcmV3fSA8L2g0PlxuXHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHQ8dWwgY2xhc3NOYW1lPVwibGlzdC1ncm91cFwiID5cblx0XHRcdFx0XHQ8ZGl2IGlkPSdmb3Jtcyc+XG5cdFx0XHRcdFx0XHR7dGhpcy5wcm9wcy5lbXBsb3llZXN9XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvdWw+XG5cdFx0XHQgIFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWZvb3RlciBjb2wtbWQtMTIgdGV4dC1sZWZ0IGxpc3QtZ3JvdXAtaXRlbVwiPlxuXHRcdFx0XHRcdDxmb3JtIGNsYXNzTmFtZT1cImZvcm0taW5saW5lIHJvdyBcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgY29sLW1kLTMgY29sLXNtLTIgY29sLXhzLTEyIHVwZGF0ZV9kaXZfZWxlbWVudFwiPlxuXHRcdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXN1Y2Nlc3NcIj5VcGRhdGU8L2J1dHRvbj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXJpZ2h0IGNvbC1tZC02IGNvbC1zbS02IGNvbC14cy00IFwiPlxuXHRcdFx0XHRcdFx0XHQ8YnV0dG9uIFxuXHRcdFx0XHRcdFx0XHRcdHR5cGU9XCJzdWJtaXRcIiBcblx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHRcIlxuXHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMuYWRkQ2xpY2tlZH1cblx0XHRcdFx0XHRcdFx0XHQ+KyBBZGQ8L2J1dHRvbj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIHRleHQtbGVmdCBjb2wtbWQtMyBjb2wtc20tNCBjb2wteHMtNiBcIj48ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwidGV4dFwiIFxuXHRcdFx0XHRcdFx0XHRcdHJlZj17dGhpcy5hdXRvY29tcGxldGV9XG4gICAgICAgICAgXHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuYWRkQ2hhbmdlZH0gXG4gICAgICAgICAgXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwibmV3X2VtcGxveWVlcyBmb3JtLWNvbnRyb2wgYXdlc29tcGxldGVcIiBcbiAgICAgICAgICBcdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj1cImVtcGxveWVlXCIgLz5cblx0XHRcdFx0XHRcdDwvZGl2PjwvZGl2PlxuXHRcdFx0XHRcdDwvZm9ybT5cblx0XHRcdFx0XHRcblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbiIsIi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuaW1wb3J0IFdvcmtvcmRlclRhc2sgZnJvbSAnLi93b3Jrb3JkZXJUYXNrJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXlzV29ya29yZGVycyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR2YXIgYXJncz17fTtcblx0XHRhcmdzLmNyZXc9dGhpcy5wcm9wcy5jcmV3O1xuXHRcdGFyZ3MuZGF0ZT10aGlzLnByb3BzLmRhdGU7XG5cblx0XHQvKiAgIERvIHRoZSBiaW5kIHRoaW5nICAqL1xuXHRcdHRoaXMub25UYXNrQ2hlY2tlZD10aGlzLm9uVGFza0NoZWNrZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLm9uU3RhdHVzQ2hhbmdlZD10aGlzLm9uU3RhdHVzQ2hhbmdlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMud29ya09yZGVyQ2hhbmdlZD10aGlzLndvcmtPcmRlckNoYW5nZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnNvY2tldFVwZGF0ZT10aGlzLnNvY2tldFVwZGF0ZS5iaW5kKHRoaXMpO1xuXHRcdC8vdGhpcy53b3Jrb3JkZXJPYmo9dGhpcy5vblN0YXR1c0NoYW5nZWQuYmluZCh0aGlzKTtcblx0XHQvKiAgICAgICAgICBlbmQgICAgICAgICAgKi9cblxuXHRcdHRoaXMuc3RhdGU9e3dvcmtvcmRlcnM6W119O1xuXG5cdFx0dmFyIGFyZ3M9e307XG5cdFx0IGFyZ3MuY3Jldz10aGlzLnByb3BzLmNyZXc7XG5cdFx0YXJncy5kYXRlPXRoaXMucHJvcHMuZGF0ZTtcblx0XHR0aGlzLndvcmtvcmRlclRvb2wgPSBuZXcgcHMuYXBpVG9vbChhcmdzLHBzLmFwaVNldHVwLndvcmtPcmRlcnMsdGhpcy53b3JrT3JkZXJDaGFuZ2VkKTtcblxuXHRcdGlmICh0aGlzLndvcmtvcmRlclRvb2wuaXRlbXM9PT11bmRlZmluZWQgfHx0aGlzLndvcmtvcmRlclRvb2wuaXRlbXM9PT0gMCB8fHRoaXMud29ya29yZGVyVG9vbC5pdGVtcz09PW51bGwgKXtcblxuXHRcdH1lbHNle3RoaXMuc3RhdGUud29ya29yZGVycz10aGlzLndvcmtvcmRlclRvb2wuaXRlbXM7fVxuXHR9XG5cdHNvY2tldFVwZGF0ZSgpe1xuXG5cdH1cblx0b25UYXNrQ2hlY2tlZCh3b19pbmRleCxpbmRleCxjaGVjayl7XG5cdFx0dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zW3dvX2luZGV4XS5zdWJ0YXNrW2luZGV4XS5zdGF0dXM9Y2hlY2s/MDoxO1xuXHRcdHRoaXMuc2V0U3RhdGUoe3dvcmtvcmRlcnM6dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zfSk7XG5cdFx0dGhpcy53b3Jrb3JkZXJUb29sLnVwZGF0ZSh0aGlzLndvcmtvcmRlclRvb2wuaXRlbXNbd29faW5kZXhdKTtcblx0XHR2YXIgY2hlY2tlZFRleHQ9Y2hlY2s/XCJ1bmNoZWNrZWQuXCI6XCJjaGVja2VkLlwiXG5cdFx0Ly9wcy5zdWNjZXNzQWxlcnQodGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zW3dvX2luZGV4XS5zdWJ0YXNrW2luZGV4XS50YXNrICtcIiBcIisgY2hlY2tlZFRleHQgKTtcblx0fVxuXHRvblN0YXR1c0NoYW5nZWQoc3RhdHVzLCBpbmRleCl7XG5cdFx0dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zW2luZGV4XS5zdGF0dXM9c3RhdHVzO1xuXHRcdHRoaXMuc2V0U3RhdGUoe3dvcmtvcmRlcnM6dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zfSk7XG5cdFx0dGhpcy53b3Jrb3JkZXJUb29sLnVwZGF0ZSh0aGlzLndvcmtvcmRlclRvb2wuaXRlbXNbaW5kZXhdKTtcblx0XHRpZihzdGF0dXM9PVwiQ29tcGxldGVcIil7XG5cdFx0XHRwcy5zdWNjZXNzQWxlcnQoXCJXb3Jrb3JkZXIgY29tcGxldGVkIVwiKTtcblx0XHR9XG5cdH1cblx0d29ya09yZGVyQ2hhbmdlZCgpe1xuXHRcdGlmICh0aGlzLndvcmtvcmRlclRvb2wuaXRlbXMhPT1udWxsKXtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3dvcmtvcmRlcnM6dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zfSk7XG5cdFx0fVxuXHR9XG5cdHdvcmtvcmRlck9iaihpdGVtLGluZGV4KXtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8V29ya29yZGVyVGFzayBcblx0XHRcdFx0a2V5PXtpbmRleH0gXG5cdFx0XHRcdGluZGV4PXtpbmRleH0gXG5cdFx0XHRcdGxvY2F0aW9uX3JvdXRlPXtpdGVtLmxvY2F0aW9uX3JvdXRlfVxuXHRcdFx0XHRsb2NhdGlvbj17aXRlbS5sb2NhdGlvbn1cblx0XHRcdFx0dGFza3M9e2l0ZW0uc3VidGFza31cblx0XHRcdFx0c3RhdHVzPXtpdGVtLnN0YXR1c31cblx0XHRcdFx0dHlwZT17aXRlbS50eXBlfVxuXHRcdFx0XHR3b3Jrb3JkZXI9e2l0ZW0ubmFtZX1cblx0XHRcdFx0b25UYXNrQ2hlY2tlZD17dGhpcy5vblRhc2tDaGVja2VkfVxuXHRcdFx0XHRvblN0YXR1c0NoYW5nZWQ9e3RoaXMub25TdGF0dXNDaGFuZ2VkfVxuXHRcdFx0XHRyb3V0ZT17aXRlbS5yb3V0ZX1cblx0XHRcdC8+XG5cdFx0KTtcblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gICAgICAgIFJlbmRlclxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdHJlbmRlcigpe1xuXHRcdGlmICh0aGlzLnN0YXRlLndvcmtvcmRlcnM9PT0wfHx0aGlzLnN0YXRlLndvcmtvcmRlcnM9PT11bmRlZmluZWQpe1xuXHRcdFx0cmV0dXJuICg8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+PGgzPk5vIFdvcmtvcmRlcnM8L2gzPjwvZGl2Pik7XG5cdFx0fVxuXHRcdHZhciB0b2RvPVtdO1xuXHRcdHZhciBjb21wbGV0ZT1bXTtcblx0XHR0aGlzLnN0YXRlLndvcmtvcmRlcnMubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KXtcblx0XHRcdGlmIChpdGVtLnN0YXR1cyE9J0NvbXBsZXRlJyYmaXRlbS5zdGF0dXMhPSdJbmNvbXBsZXRlJyl7XG5cdFx0XHRcdHRvZG8ucHVzaCh0aGlzLndvcmtvcmRlck9iaihpdGVtLGluZGV4KSk7XG5cdFx0XHRcdGlmKHRvZG8ubGVuZ3RoJTM9PT0wKXt0b2RvLnB1c2goPGRpdiBjbGFzc05hbWU9J2NsZWFyZml4Jz48L2Rpdj4pfVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGNvbXBsZXRlLnB1c2godGhpcy53b3Jrb3JkZXJPYmooaXRlbSxpbmRleCkpO1xuXHRcdFx0XHRpZihjb21wbGV0ZS5sZW5ndGglMz09PTApe2NvbXBsZXRlLnB1c2goPGRpdiBjbGFzc05hbWU9J2NsZWFyZml4Jz48L2Rpdj4pfVxuXHRcdFx0fVxuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ3b3Jrb3JkZXJfY29udGFpbmVyXCI+XG5cdFx0XHRcdDxkaXY+PGJyLz5cblx0XHRcdFx0XHR7dG9kb31cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj48L2Rpdj5cblx0XHRcdFx0PGRpdj48aDM+Q29tcGxldGUgV29ya29yZGVyczwvaDM+XG5cdFx0XHRcdFx0e2NvbXBsZXRlfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cblx0fTtcdFxufVxuIiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3JlYXRlSXNzdWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcylcblx0XHR0aGlzLm1vZGFsTmV3SXNzdWU9dGhpcy5tb2RhbE5ld0lzc3VlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5tb2RhbEVkaXRJc3N1ZT10aGlzLm1vZGFsRWRpdElzc3VlLmJpbmQodGhpcyk7XG5cdH1cblx0dG9vbFRpcCgpe1xuXHRcdCQoZnVuY3Rpb24gKCkge1xuXHRcdCBcdCQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKCk7XG5cdFx0fSlcblx0fVxuXHRtb2RhbE5ld0lzc3VlKGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR0aGlzLnByb3BzLmFjdGl2YXRlTW9kYWxOZXcoKTtcblx0fVxuXHRtb2RhbEVkaXRJc3N1ZShpdGVtLGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRjb25zb2xlLmxvZyhpdGVtKVxuXHRcdHRoaXMucHJvcHMuYWN0aXZhdGVNb2RhbEVkaXQoaXRlbSk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0XHRcdFx0Ly8gXHRcdGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBcblx0XHRcdFx0XHQvLyBkYXRhLXRhcmdldD17XCIjXCIrdGhpcy5wb3BVcElkfVxuXHRcdFx0XHQgLy8gXHRhcmlhLWxhYmVsPVwiQ3JlYXRlIElzc3VlXCIgXG5cdFx0XHRcdCAvLyBcdGRhdGEtdG9nZ2xlPVwidG9vbHRpcFwiIFxuXHRcdFx0XHQgLy8gXHRkYXRhLXBsYWNlbWVudD1cInRvcFwiIFxuXHRcdFx0XHQgLy8gXHR0aXRsZT1cIklzc3VlXCIgXG5cdFx0XHRcdFx0Ly8gcmVmPXt0aGlzLnRvb2xUaXB9XHRcdFx0XHRcdC8vIG9uQ2xpY2s9eyB0aGlzLnBvcFVwfSA+XG5cdFx0dmFyIGRyb3Bkb3duSXRlbXM9W107XG5cdFx0aWYodGhpcy5wcm9wcy5pc3N1ZXMhPT1udWxsKXtcblx0XHRcdHRoaXMucHJvcHMuaXNzdWVzLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCl7XG5cdFx0XHRcdGlmIChpdGVtLnN0YXR1cyA9PSdTdWJtaXR0ZWQnIHx8IGl0ZW0uc3RhdHVzPT0nQXNzaWduZWQnKXtcblx0XHRcdFx0XHRkcm9wZG93bkl0ZW1zLnB1c2goXG5cdFx0XHRcdFx0XHQ8bGkga2V5PXtpbmRleH0+IFxuXHRcdFx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9XCJkcm9wZG93bi1pdGVtXCIgXG5cdFx0XHRcdFx0XHRcdFx0aHJlZj1cIiNcIiBcblx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLm1vZGFsRWRpdElzc3VlLmJpbmQodGhpcyxpdGVtKX0gXG5cdFx0XHRcdFx0XHRcdD57aXRlbS50aXRsZX08L2E+XG5cdFx0XHRcdFx0XHQ8L2xpPik7XG5cdFx0XHRcdH1cblx0XHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0fVxuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidGV4dC1yaWdodFwiPlxuXG5cdFx0XHRcdDxidXR0b25cblx0XHRcdFx0XHRjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHQgYnRuLXhzIGRyb3Bkb3duLXRvZ2dsZSBjcmVhdGUtaXNzdWVcIiBcblx0XHRcdFx0XHR0eXBlPVwiYnV0dG9uXCIgXG5cdFx0XHRcdFx0ZGF0YS10b2dnbGU9XCJkcm9wZG93blwiIFxuXHRcdFx0XHRcdGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCIgXG5cdFx0XHRcdFx0YXJpYS1leHBhbmRlZD1cImZhbHNlXCIgPlxuXG5cdFx0XHRcdCBcdDxzcGFuIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tZXhjbGFtYXRpb24tc2lnblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cblx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdDx1bCBjbGFzc05hbWU9XCJkcm9wZG93bi1tZW51XCI+XG5cdFx0XHRcdCAgICA8bGkgY2xhc3NOYW1lPVwiZHJvcGRvd24taGVhZGVyXCI+SXNzdWVzPC9saT5cblx0XHRcdFx0ICAgIHtkcm9wZG93bkl0ZW1zfVxuXHRcdFx0XHQgICAgPGxpIHJvbGU9XCJzZXBhcmF0b3JcIiBjbGFzc05hbWU9XCJkaXZpZGVyXCI+PC9saT5cblx0XHRcdFx0ICAgIDxsaT48YSBcblx0XHRcdFx0ICAgIFx0Y2xhc3NOYW1lPVwiZHJvcGRvd24taXRlbVwiXG5cdFx0XHRcdCAgICBcdG9uQ2xpY2s9e3RoaXMubW9kYWxOZXdJc3N1ZX1cblx0XHRcdFx0ICAgIFx0aHJlZj1cIiNcIiA+ICsgTmV3IElzc3VlPC9hPjwvbGk+XG5cdFx0XHRcdDwvdWw+XG5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuXG4iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2tDaGVjayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHRjb25zb2xlLmxvZyh0aGlzLnByb3BzLmNoZWNrZWQpO1xuXHRcdHRoaXMudGFza0NoZWNrZWQgPSB0aGlzLnRhc2tDaGVja2VkLmJpbmQodGhpcyk7XG5cdH1cblx0dGFza0NoZWNrZWQoZSl7XG5cdFx0dGhpcy5wcm9wcy50YXNrQ2hlY2tlZCh0aGlzLnByb3BzLmluZGV4LCB0aGlzLnByb3BzLmNoZWNrZWQpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IGNoZWNrZWQgPSB0aGlzLnByb3BzLmNoZWNrZWQgPyBcImxpbmUtdGhyb3VnaFwiIDogXCJcIjtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9e2NoZWNrZWR9PlxuXHRcdFx0XHRcdDxpbnB1dCBvbkNoYW5nZT17dGhpcy50YXNrQ2hlY2tlZH0gdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD17dGhpcy5wcm9wcy5jaGVja2VkfSAvPlxuXHRcdFx0XHRcdHt0aGlzLnByb3BzLmxhYmxlfVxuXHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVx0XG59IiwiXG4vKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmltcG9ydCBUYXNrQ2hlY2sgZnJvbSAnLi90YXNrQ2hlY2snXG5pbXBvcnQgQ3JlYXRlSXNzdWUgZnJvbSAnLi9jcmVhdGVJc3N1ZSdcbmltcG9ydCBNb2RhbCBmcm9tICcuLi91dGlscy9tb2RhbCdcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXb3Jrb3JkZXJUYXNrIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuc3RhdGU9e1xuXHRcdFx0aXNzdWVzOltdLFxuXHRcdFx0dGl0bGU6JycsXG5cdFx0XHRtb2RhbDonbmV3Jyxcblx0XHRcdG1vZGFsUHJpb3JpdHk6J2xvdycsXG5cdFx0XHRtb2RhbFRpdGxlOicnLFxuXHRcdFx0bW9kYWxEZXNjcmlwdGlvbjonJyxcblx0XHRcdG1vZGFsTmFtZTonJ1xuXHRcdH07XG5cdFx0dGhpcy50YXNrQ2hlY2tlZD10aGlzLnRhc2tDaGVja2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5zdGF0dXNDaGFuZ2U9dGhpcy5zdGF0dXNDaGFuZ2UuYmluZCh0aGlzKTtcblx0XHR0aGlzLmFjdGl2YXRlTW9kYWxOZXc9dGhpcy5hY3RpdmF0ZU1vZGFsTmV3LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5hY3RpdmF0ZU1vZGFsRWRpdD10aGlzLmFjdGl2YXRlTW9kYWxFZGl0LmJpbmQodGhpcyk7XG5cdFx0XG5cdFx0dGhpcy5zdWJtaXRJc3N1ZT10aGlzLnN1Ym1pdElzc3VlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5tb2RhbFRpdGxlQ2hhbmdlPXRoaXMubW9kYWxUaXRsZUNoYW5nZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMubW9kYWxEZXNjcmlwdGlvbkNoYW5nZT10aGlzLm1vZGFsRGVzY3JpcHRpb25DaGFuZ2UuYmluZCh0aGlzKTtcblx0XHR0aGlzLm1vZGFsUHJpb3JpdHlDaGFuZ2U9dGhpcy5tb2RhbFByaW9yaXR5Q2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5pc3N1ZUNoYW5nZWQ9dGhpcy5pc3N1ZUNoYW5nZWQuYmluZCh0aGlzKTtcblxuXG5cdFx0dGhpcy5tb2RhbElkPVwiaXNzdWUtZm9ybS1cIit0aGlzLnByb3BzLndvcmtvcmRlcjtcblxuXHRcdFxuXHRcdHRoaXMuaXNzdWVUb29sID0gbmV3IHBzLmFwaVRvb2woe1wid29ya19vcmRlclwiOnRoaXMucHJvcHMud29ya29yZGVyfSx7ZG9jdHlwZTonSXNzdWUnfSx0aGlzLmlzc3VlQ2hhbmdlZCk7XG5cblxuXHR9XG5cdHRhc2tDaGVja2VkKGUpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe3RpdGxlOlwiQ0hFQ0tFRFwifSk7XG5cdH1cblx0aXNDaGVja2VkKHZhbHVlKXtcbiAgICBcdHJldHVybiAoKHZhbHVlPT09dGhpcy5zdGF0ZS5zZWxlY3RlZCkgPydjaGVja2VkIGxpbmUtdGhyb3VnaCc6J2RlZmF1bHQnKTtcbiAgXHR9XG4gIFx0dGFza0NoZWNrZWQoaW5kZXgsY2hlY2tlZCl7XG4gIFx0XHR2YXIgd29faW5kZXg9dGhpcy5wcm9wcy5pbmRleDtcbiAgXHRcdHRoaXMucHJvcHMub25UYXNrQ2hlY2tlZCh3b19pbmRleCxpbmRleCxjaGVja2VkKTtcbiAgXHR9XG4gIFx0c3RhdHVzQ2hhbmdlKGUpe1xuICBcdFx0dGhpcy5wcm9wcy5vblN0YXR1c0NoYW5nZWQoZS50YXJnZXQudmFsdWUsdGhpcy5wcm9wcy5pbmRleCk7XG5cbiAgXHR9XG4gIFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRcdFx0SVNTVUUgRlVOQ1RJT05TXG4gIFx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICBcdG1vZGFsVGl0bGVDaGFuZ2UoZSl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7bW9kYWxUaXRsZTplLnRhcmdldC52YWx1ZX0pO1xuICBcdH1cblx0bW9kYWxQcmlvcml0eUNoYW5nZShlKXtcblx0XHR0aGlzLnNldFN0YXRlKHttb2RhbFByaW9yaXR5OmUudGFyZ2V0LnZhbHVlfSk7XG5cdH1cblx0bW9kYWxEZXNjcmlwdGlvbkNoYW5nZShlKXtcblx0XHR0aGlzLnNldFN0YXRlKHttb2RhbERlc2NyaXB0aW9uOmUudGFyZ2V0LnZhbHVlfSk7XG5cdH1cbiAgXHRhY3RpdmF0ZU1vZGFsTmV3KCl7XG4gIFx0XHR0aGlzLnNldFN0YXRlKHttb2RhbDpcIm5ld1wifSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7bW9kYWxQcmlvcml0eTonJ30pO1xuXHRcdHRoaXMuc2V0U3RhdGUoe21vZGFsRGVzY3JpcHRpb246Jyd9KTtcblx0XHR0aGlzLnNldFN0YXRlKHttb2RhbFRpdGxlOicnfSk7XG4gIFx0XHQkKCcjJyt0aGlzLm1vZGFsSWQpLm1vZGFsKCk7XG4gIFx0fVxuICBcdGFjdGl2YXRlTW9kYWxFZGl0KGlzc3VlKXtcblx0XHR0aGlzLnNldFN0YXRlKHttb2RhbDppc3N1ZX0pO1xuXHRcdHRoaXMuc2V0U3RhdGUoe21vZGFsUHJpb3JpdHk6aXNzdWUucHJpb3JpdHl9KTtcblx0XHR0aGlzLnNldFN0YXRlKHttb2RhbERlc2NyaXB0aW9uOmlzc3VlLmlzc3VlfSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7bW9kYWxUaXRsZTppc3N1ZS50aXRsZX0pO1xuXHRcdHRoaXMuc2V0U3RhdGUoe21vZGFsTmFtZTppc3N1ZS5uYW1lfSk7XG4gIFx0XHQkKCcjJyt0aGlzLm1vZGFsSWQpLm1vZGFsKCk7XG4gIFx0fVxuICBcdGlzc3VlQ2hhbmdlZCgpe1xuXHRcdGNvbnNvbGUubG9nKFwiaXNzdWUgdG9vbCBhbGVydCAtLS0tLS0tLS0tLSAgXCIpO1xuXHRcdGNvbnNvbGUubG9nKHRoaXMuaXNzdWVUb29sLml0ZW1zKTtcblx0XHR0aGlzLnNldFN0YXRlKHtpc3N1ZXM6dGhpcy5pc3N1ZVRvb2wuaXRlbXN9KTtcblx0fVxuICBcdHN1Ym1pdElzc3VlKGUpe1xuICBcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGNvbnNvbGUubG9nKFwic2F2ZVwiKTtcblx0XHRjb25zb2xlLmxvZyh0aGlzLnN0YXRlLm1vZGFsKTtcblx0XHR2YXIgbmV3SXRlbT17XG5cdFx0XHR0aXRsZTp0aGlzLnN0YXRlLm1vZGFsVGl0bGUsXG5cdFx0XHRpc3N1ZTp0aGlzLnN0YXRlLm1vZGFsRGVzY3JpcHRpb24sXG5cdFx0XHRwcmlvcml0eTp0aGlzLnN0YXRlLm1vZGFsUHJpb3JpdHksXG5cdFx0XHR2aW5leWFyZDp0aGlzLnByb3BzLmxvY2F0aW9uLFxuXHRcdFx0d29ya19vcmRlcjp0aGlzLnByb3BzLndvcmtvcmRlclxuXHRcdH1cblx0XHRpZih0aGlzLnN0YXRlLm1vZGFsPT1cIm5ld1wiKXtcblx0XHRcdHRoaXMuaXNzdWVUb29sLmNyZWF0ZShuZXdJdGVtLGZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIk1FT1dcIik7XG5cdFx0XHRcdHBzLnN1Y2Nlc3NBbGVydChcIklzc3VlIFwiICtpdGVtLnRpdGxlKyBcIiBjcmVhdGVkLlwiKVxuXHRcdFx0fSk7XG5cdFx0fWVsc2V7XG5cdFx0XHRuZXdJdGVtLm5hbWU9dGhpcy5zdGF0ZS5tb2RhbE5hbWU7XG5cdFx0XHR0aGlzLmlzc3VlVG9vbC51cGRhdGUobmV3SXRlbSxmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJNRU9XXCIpO1xuXHRcdFx0XHRwcy5zdWNjZXNzQWxlcnQoXCJJc3N1ZSBcIiAraXRlbS50aXRsZStcIiB1cGRhdGVkLlwiKVxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdC8vY2xvc2UgbW9kYWxcblx0XHQkKCcjJyt0aGlzLm1vZGFsSWQpLm1vZGFsKCd0b2dnbGUnKTtcblx0fVxuXG5cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3QgdGl0bGU9XCJ3ZWxjb21lXCI7XG5cdFx0dmFyIG1haW5DbGFzcz17XG5cdFx0XHQnQ29tcGxldGUnOidwYW5lbC1zdWNjZXNzJyxcblx0XHRcdCdJbmNvbXBsZXRlJzoncGFuZWwtZGFuZ2VyJyxcblx0XHRcdCdQZW5kaW5nJzoncGFuZWwtZGVmYXVsdCcsXG5cdFx0XHQnU3RhcnRlZCc6J3BhbmVsLXdhcm5pbmcnXG5cdFx0fVt0aGlzLnByb3BzLnN0YXR1c107XG5cdFx0bWFpbkNsYXNzID0gbWFpbkNsYXNzICsgXCIgcGFuZWwgd29ya29yZGVyXCI7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9J2NvbC1tZC00IGNvbC1zbS00Jz5cblx0XHRcdFx0PE1vZGFsIFxuXHRcdFx0XHRcdGlkPXt0aGlzLm1vZGFsSWR9IFxuXHRcdFx0XHRcdHN1Ym1pdFRleHQ9XCJTdWJtaXRcIiBcblx0XHRcdFx0XHR0aXRsZT1cIkNyZWF0ZSBJc3N1ZSBGb3JcIlxuXHRcdFx0XHRcdHN1Ym1pdD17dGhpcy5zdWJtaXRJc3N1ZX0+XG5cblx0XHRcdFx0XHRcdDxmaWVsZHNldD5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRcdFx0PGxhYmVsPklzc3VlIFRpdGxlPC9sYWJlbD5cblx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgXG5cdFx0XHRcdFx0XHRcdFx0XHR0eXBlPVwidGV4dFwiIFxuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgXG5cdFx0XHRcdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj1cIklzc3VlIFRpdGxlXCIgXG5cdFx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17dGhpcy5zdGF0ZS5tb2RhbFRpdGxlfSBcblx0XHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLm1vZGFsVGl0bGVDaGFuZ2V9XG5cdFx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdFx0XHRcdFx0XHRcdDxsYWJlbD5Qcmlvcml0eTwvbGFiZWw+XG5cdFx0XHRcdFx0XHRcdFx0PHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiB2YWx1ZT17dGhpcy5zdGF0ZS5tb2RhbFByaW9yaXR5fSBvbkNoYW5nZT17dGhpcy5tb2RhbFByaW9yaXR5Q2hhbmdlLmJpbmQodGhpcyl9PlxuXHRcdFx0XHRcdFx0XHRcdFx0PG9wdGlvbj5Mb3c8L29wdGlvbj5cblx0XHRcdFx0XHRcdFx0XHRcdDxvcHRpb24+TWVkaXVtPC9vcHRpb24+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8b3B0aW9uPkhpZ2g8L29wdGlvbj5cblx0XHRcdFx0XHRcdFx0XHRcdDxvcHRpb24+Q3JpdGljYWw8L29wdGlvbj5cblx0XHRcdFx0XHRcdFx0XHQ8L3NlbGVjdD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdFx0XHRcdFx0XHQgIFx0PGxhYmVsPklzc3VlIERldGFpbHM6PC9sYWJlbD5cblx0XHRcdFx0XHRcdFx0ICBcdDx0ZXh0YXJlYSBcblx0XHRcdFx0XHRcdFx0ICBcdFx0Y2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgXG5cdFx0XHRcdFx0XHRcdCAgXHRcdHJvd3M9XCIzXCIgXG5cdFx0XHRcdFx0XHRcdCAgXHRcdHBsYWNlaG9sZGVyPVwiSXNzdWUgRGV0YWlsc1wiIFxuXHRcdFx0XHRcdFx0XHQgIFx0XHR2YWx1ZT17dGhpcy5zdGF0ZS5tb2RhbERlc2NyaXB0aW9ufVxuXHRcdFx0XHRcdFx0XHQgIFx0XHRvbkNoYW5nZT17dGhpcy5tb2RhbERlc2NyaXB0aW9uQ2hhbmdlfVxuXHRcdFx0XHRcdFx0XHQgIFx0PjwvdGV4dGFyZWE+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PC9maWVsZHNldD5cblx0XHRcdFx0PC9Nb2RhbD5cblx0XHRcdDxkaXYgaWQ9XCJcIiBjbGFzc05hbWU9e21haW5DbGFzc30+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtaGVhZGluZ1wiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG5cdFx0XHRcdFx0XHQ8aDMgY2xhc3NOYW1lPVwicGFuZWwtdGl0bGUgY29sLXhzLTEwXCI+XG5cdFx0XHRcdFx0XHRcdDxhIGNsYXNzTmFtZT1cImZsb2F0LWxlZnRcIiBocmVmPXt0aGlzLnByb3BzLmxvY2F0aW9uX3JvdXRlfT57dGhpcy5wcm9wcy5sb2NhdGlvbn08L2E+XG5cdFx0XHRcdFx0XHQ8L2gzPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMiBjcmVhdGUtaXNzdWUtaGVhZGVyLWJ1dHRvbi1jb250YWluZXJcIiA+XG5cblxuXHRcdFx0XHRcdFx0XHQ8Q3JlYXRlSXNzdWVcblx0XHRcdFx0XHRcdFx0XHRpc3N1ZXM9e3RoaXMuc3RhdGUuaXNzdWVzfVxuXHRcdFx0XHRcdFx0XHRcdGFjdGl2YXRlTW9kYWxOZXc9e3RoaXMuYWN0aXZhdGVNb2RhbE5ld31cblx0XHRcdFx0XHRcdFx0XHRhY3RpdmF0ZU1vZGFsRWRpdD17dGhpcy5hY3RpdmF0ZU1vZGFsRWRpdH1cblx0XHRcdFx0XHRcdFx0XHR3b3Jrb3JkZXI9e3RoaXMucHJvcHMud29ya29yZGVyfVxuXG5cdFx0XHRcdFx0XHRcdC8+XG5cblxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcblxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYW5lbC1ib2R5XCI+XG5cdFx0XHRcdFx0PGRpdj57dGhpcy5wcm9wcy50eXBlfTwvZGl2PlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+U3RhdHVzPC9sYWJlbD5cblx0XHRcdFx0XHQ8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCBzdGF0dXNcIiB2YWx1ZT17dGhpcy5wcm9wcy5zdGF0dXN9IG9uQ2hhbmdlPXt0aGlzLnN0YXR1c0NoYW5nZX0+XG5cdFx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPVwiUGVuZGluZ1wiPlBlbmRpbmc8L29wdGlvbj5cblx0XHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9XCJTdGFydGVkXCI+U3RhcnRlZDwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIkNvbXBsZXRlXCI+Q29tcGxldGU8L29wdGlvbj5cblx0XHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9XCJJbmNvbXBsZXRlXCI+SW5jb21wbGV0ZTwvb3B0aW9uPlxuXHRcdFx0XHRcdDwvc2VsZWN0PlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja19ib3hlc1wiPlxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0aGlzLnByb3BzLnRhc2tzLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCl7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGNoZWNrZWQ9aXRlbS5zdGF0dXM/dHJ1ZTpmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gKDxUYXNrQ2hlY2sga2V5PXtpbmRleH0gaW5kZXg9e2luZGV4fSBsYWJsZT17aXRlbS50YXNrfSBjaGVja2VkPXtjaGVja2VkfSB0YXNrQ2hlY2tlZD17dGhpcy50YXNrQ2hlY2tlZH0vPik7XG5cdFx0XHRcdFx0XHRcdH0uYmluZCh0aGlzKSlcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9XCJcIiBocmVmPXt0aGlzLnByb3BzLnJvdXRlfT5Nb3JlIEluZm9ybWF0aW9uPC9hPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5cblxuIiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kYWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5zdWJtaXQ9dGhpcy5zdWJtaXQuYmluZCh0aGlzKTtcblx0fVxuXHRzdWJtaXQoZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMucHJvcHMuc3VibWl0KGUpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwgZmFkZSB0ZXh0LWxlZnQgcGFuZWwtZGVmYXVsdFwiIGlkPXt0aGlzLnByb3BzLmlkfSB0YWJJbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiIGFyaWEtbGFiZWxsZWRieT1cImV4YW1wbGVNb2RhbExhYmVsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nXCIgcm9sZT1cImRvY3VtZW50XCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWhlYWRlclwiPlxuXHRcdFx0XHRcdFx0XHQ8aDQgY2xhc3NOYW1lPVwibW9kYWwtdGl0bGVcIiBpZD1cImV4YW1wbGVNb2RhbExhYmVsXCI+e3RoaXMucHJvcHMudGl0bGV9PC9oND5cblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgZGlzcGxheT1cIm5vbmVcIiBjbGFzc05hbWU9XCJjbG9zZSBoaWRlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj5cblx0XHRcdFx0XHRcdFx0PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxmb3JtPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHlcIj5cblx0XHRcdFx0XHRcdFx0XHR7IHRoaXMucHJvcHMuY2hpbGRyZW4gfVxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1mb290ZXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXNlY29uZGFyeVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2xvc2U8L2J1dHRvbj5cblx0XHRcdFx0XHRcdFx0XHQ8YnV0dG9uIFxuXHRcdFx0XHRcdFx0XHRcdFx0dHlwZT1cInN1Ym1pdFwiIFxuXHRcdFx0XHRcdFx0XHRcdFx0b25DbGljaz17dGhpcy5zdWJtaXR9IFxuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHR7dGhpcy5wcm9wcy5zdWJtaXRUZXh0fVxuXHRcdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDwvZm9ybT5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cblxuIiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5pbXBvcnQgRGF5c1dvcmtvcmRlcnMgZnJvbSAnLi4vLi4vcHVibGljL2pzL21vZHVsZXMvZGF5c193b3Jrb3JkZXJzL0RheXNXb3Jrb3JkZXJzJ1xuaW1wb3J0IERheXNUaW1lc2hlZXRzIGZyb20gJy4uLy4uL3B1YmxpYy9qcy9tb2R1bGVzL2RheXNfdGltZXNoZWV0cy9EYXlzVGltZVNoZWV0cydcblxuLy9jb25zdCBhcHA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKTtcbmNvbnN0IGFwcD0gJCgnI2FwcCcpWzBdO1xuY29uc3QgdGltZXNoZWV0cz0gJCgnI3RpbWUnKVswXTtcblxuY2xhc3MgV29ya1BhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cblx0XHQvKiBiaW5kIGRpbmcgZGluZyAqL1xuXHRcdHRoaXMubWFpbkNsaWNrZWQ9dGhpcy5tYWluQ2xpY2tlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMud29ya29yZGVyc0NsaWNrZWQ9dGhpcy53b3Jrb3JkZXJzQ2xpY2tlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMudGltZXNoZWV0Q2xpY2tlZD10aGlzLnRpbWVzaGVldENsaWNrZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLmhhbmRlbENsb2NrSW49dGhpcy5oYW5kZWxDbG9ja0luLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5oYW5kZWxSb3V0ZT10aGlzLmhhbmRlbFJvdXRlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5zdGF0ZVVwZGF0ZT10aGlzLnN0YXRlVXBkYXRlLmJpbmQodGhpcyk7XG5cdFx0XG5cblx0XHQvL0hhbmRlbCBVc2VyIGxPYWRcblx0XHQvLyBpZiAoIGZyYXBwZS51c2VyX2lkID09IFwiQWRtaW5pc3RyYXRvclwiICl7XG5cdFx0Ly8gXHR3aW5kb3cubG9jYXRpb24gPSBcIi9kZXNrXCI7XG5cdFx0Ly8gfVxuXHRcdC8vIGlmICggZnJhcHBlLnVzZXJfaWQgPT0gXCJHZXVzdFwiKXtcblx0XHQvLyBcdHdpbmRvdy5sb2NhdGlvbiA9IFwiL2xvZ2luXCI7XG5cdFx0Ly8gfVxuXHRcdHRoaXMuY3VycmVudFVzZXI9cHMuaW5pdEN1cnJlbnRVc2VyKCk7XG5cdFx0dGhpcy5jdXJyZW50VXNlci5nZXQoe30sZnVuY3Rpb24oaXRlbXMpe1xuXHRcdFx0aWYodGhpcy5jdXJyZW50VXNlci5pdGVtcy51c2VybmFtZT09XCJHdWVzdFwiKXtcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uID0gXCIvbG9naW5cIjtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHQkKGRvY3VtZW50KS50cmlnZ2VyKFwidXNlckxvYWRlZFwiKTtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZyhcImFmdGVyIExvYWRcIix0aGlzLmN1cnJlbnRVc2VyLml0ZW1zKTtcblx0XHRcdH1cblx0XHR9LmJpbmQodGhpcykpOyBcblx0XHR0aGlzLnN0YXRlPXtpdGVtczp0aGlzLmN1cnJlbnRVc2VyLml0ZW1zfTtcblx0XHQkKGRvY3VtZW50KS5iaW5kKCd1c2VyTG9hZGVkJyx0aGlzLnN0YXRlVXBkYXRlKTtcblxuXG5cdFx0Ly9Sb3V0aW5nXG5cdFx0JCh3aW5kb3cpLm9uKFwiaGFzaGNoYW5nZVwiLCBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuaGFuZGVsUm91dGUoKTtcblx0XHR9LmJpbmQodGhpcykpO1xuXHRcdHZhciByb3V0ZSA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnNsaWNlKDEpO1xuXHRcdGlmKCFyb3V0ZSkgcm91dGUgPSBcIiNtYWluXCI7XG5cdFx0dGhpcy5zdGF0ZS5wYWdlPXJvdXRlO1xuXHRcdGlmICghd2luZG93LmxvY2F0aW9uLmhhc2gpIHtcblx0XHRcdHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gXCIjbWFpblwiO1xuXHRcdH1cblx0XHQkKHdpbmRvdykudHJpZ2dlcihcImhhc2hjaGFuZ2VcIik7XG5cblx0fVxuXHRjb21wb25lbnREaWRNb3VudCgpe1xuXHRcdFxuXHR9XG5cdHN0YXRlVXBkYXRlKCl7XG5cdFx0Ly9hbGVydChcInVwZGF0ZVwiKTtcblx0XHR0aGlzLnN0YXRlLml0ZW1zPXRoaXMuY3VycmVudFVzZXIuaXRlbXM7XG5cdFx0dGhpcy5zZXRTdGF0ZSh0aGlzLnN0YXRlKTtcblxuXHR9XG5cdGhhbmRlbFJvdXRlKCl7XG5cdFx0dmFyIHJvdXRlID0gd2luZG93LmxvY2F0aW9uLmhhc2guc2xpY2UoMSk7XG5cdFx0dmFyIHBhZ2VzPXtcblx0XHRcdG1haW46dGhpcy5tYWluQ2xpY2tlZCxcblx0XHRcdHdvcmtvcmRlcnM6dGhpcy53b3Jrb3JkZXJzQ2xpY2tlZCxcblx0XHRcdHRpbWVzaGVldDp0aGlzLnRpbWVzaGVldENsaWNrZWRcblx0XHR9W3JvdXRlXSgpO1xuXHR9XG5cdGhhbmRlbENsb2NrSW4oKXtcblxuXHR9XG5cdG1haW5DbGlja2VkKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7cGFnZTonbWFpbid9KTtcblx0fVxuXHR3b3Jrb3JkZXJzQ2xpY2tlZCgpe1xuXG5cdFx0dGhpcy5zZXRTdGF0ZSh7cGFnZTond29ya29yZGVycyd9KTtcblxuXHR9XG5cdHRpbWVzaGVldENsaWNrZWQoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtwYWdlOid0aW1lc2hlZXQnfSk7XG5cblx0fVxuXHQvLzxBZmZpeFdyYXBwZXIgY2xhc3NOYW1lPVwic3RpY2t5X3N1Ym5hdiB0ZXh0LWNlbnRlclwiICBvZmZzZXQ9ezE0MH0gaGVpZ2h0PVwiNDBweFwiPjwvQWZmaXhXcmFwcGVyPlxuXHRyZW5kZXIoKXtcblx0XHR2YXIgb3V0cHV0PScnO1xuXHRcdGlmICh0aGlzLnN0YXRlLml0ZW1zLnVzZXJuYW1lPT1cIkd1ZXN0XCJ8fHRoaXMuc3RhdGUuaXRlbXMudXNlcm5hbWU9PVwiQWRtaW5pc3RyYXRvclwiKXtcblx0XHRcdG91dHB1dD0oPGgzPkd1ZXN0IE9yIEFkbWluPC9oMz4pO1xuXHRcdH1cblx0XHRlbHNlIGlmKHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoPT09MCl7XG5cdFx0XHRvdXRwdXQ9KDxoMz5ObyBVc2VyIERhdGE8L2gzPik7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRvdXRwdXQ9KFxuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdDx1bCBjbGFzc05hbWU9XCJuYXYgbmF2LXBpbGxzIGNlbnRlci1waWxsc1wiPlxuXHRcdFx0XHRcdFx0PGxpIG9uQ2xpY2s9e3RoaXMubWFpbkNsaWNrZWR9IHJvbGU9XCJwcmVzZW50YXRpb25cIiBjbGFzc05hbWU9e3RoaXMuc3RhdGUucGFnZT09J21haW4nPydhY3RpdmUnOicnfT48YSBocmVmPVwiI21haW5cIj5NYWluPC9hPjwvbGk+XG5cdFx0XHRcdFx0XHQ8bGkgb25DbGljaz17dGhpcy53b3Jrb3JkZXJzQ2xpY2tlZH0gcm9sZT1cInByZXNlbnRhdGlvblwiIGNsYXNzTmFtZT17dGhpcy5zdGF0ZS5wYWdlPT0nd29ya29yZGVycyc/J2FjdGl2ZSc6Jyd9PjxhIGhyZWY9XCIjd29ya29yZGVyc1wiPldvcmtvcmRlcnM8L2E+PC9saT5cblx0XHRcdFx0XHRcdDxsaSBvbkNsaWNrPXt0aGlzLnRpbWVzaGVldENsaWNrZWR9IHJvbGU9XCJwcmVzZW50YXRpb25cIiBjbGFzc05hbWU9e3RoaXMuc3RhdGUucGFnZT09J3RpbWVzaGVldCc/J2FjdGl2ZSc6Jyd9PjxhIGhyZWY9XCIjdGltZXNoZWV0XCI+VGltZSBTaGVldHM8L2E+PC9saT5cblx0XHRcdFx0XHQ8L3VsPlxuXHRcdFx0XHRcdDxici8+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e3RoaXMuc3RhdGUucGFnZT09J3RpbWVzaGVldCcgfHwgdGhpcy5zdGF0ZS5wYWdlPT0nbWFpbic/Jyc6J2hpZGRlbid9PlxuXHRcdFx0XHRcdFx0PERheXNUaW1lc2hlZXRzIFxuXHRcdFx0XHRcdFx0XHRkYXRlPXt0aGlzLnN0YXRlLml0ZW1zLnRvZGF5fVxuXHRcdFx0XHRcdFx0XHRmdWxsX25hbWU9e3RoaXMuc3RhdGUuaXRlbXMuY3VycmVudF91c2VyLmZ1bGxfbmFtZX1cblx0XHRcdFx0XHRcdFx0cGFnZT17dGhpcy5zdGF0ZS5wYWdlfVxuXHRcdFx0XHRcdFx0XHRjcmV3PXt0aGlzLnN0YXRlLml0ZW1zLmNyZXd9XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPXt0aGlzLnN0YXRlLnBhZ2U9PSd3b3Jrb3JkZXJzJz8nJzonaGlkZGVuJ30+XG5cdFx0XHRcdFx0XHQ8RGF5c1dvcmtvcmRlcnMgXG5cdFx0XHRcdFx0XHRcdGNyZXc9e3RoaXMuc3RhdGUuaXRlbXMuY3Jld30gXG5cdFx0XHRcdFx0XHRcdGRhdGU9e3RoaXMuc3RhdGUuaXRlbXMudG9kYXl9XG5cdFx0XHRcdFx0XHRcdC8vY29tcGxldGVkPXt0aGlzLnN0YXRlLmNvbXBsZXRlZH1cblx0XHRcdFx0XHRcdFx0Ly9pbnByb2dyZXNzPXt0aGlzLnN0YXRlLmlucHJvZ3Jlc3N9XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuKDxkaXY+XG5cdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG4oZnVuY3Rpb24oKXtcblx0ZnJhcHBlLnJlYWR5KGZ1bmN0aW9uKCl7XG5cdFx0UmVhY3RET00ucmVuZGVyKCBcblx0XHQ8V29ya1BhZ2UgLz5cblx0LCB0aW1lc2hlZXRzICk7XG5cdH0pXG5cbn0pKCk7XG5cblxuXG5cblxuIl19
