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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c190aW1lc2hlZXRzL0RheXNUaW1lU2hlZXRzLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy9kYXlzX3RpbWVzaGVldHMvY2xvY2tJbi5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c190aW1lc2hlZXRzL2VtcGxveWVlVGltZS5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c190aW1lc2hlZXRzL3RpbWVTaGVldC5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvZGF5c193b3Jrb3JkZXJzL0RheXNXb3Jrb3JkZXJzLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy9kYXlzX3dvcmtvcmRlcnMvY3JlYXRlSXNzdWUuanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL2RheXNfd29ya29yZGVycy90YXNrQ2hlY2suanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL2RheXNfd29ya29yZGVycy93b3Jrb3JkZXJUYXNrLmpzeCIsInByb2Nlc3Nfc3VjY2Vzcy9wdWJsaWMvanMvbW9kdWxlcy91dGlscy9tb2RhbC5qc3giLCJwcm9jZXNzX3N1Y2Nlc3Mvd3d3L3dvcmtwYWdlL3dvcmtwYWdlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OytlQUhBOzs7SUFLcUIsYzs7O0FBQ3BCLHlCQUFZLEtBQVosRUFBa0I7QUFBQTs7QUFBQSw4SEFDWCxLQURXOztBQUVqQixRQUFLLEtBQUwsR0FBVyxFQUFDLE9BQU0sRUFBUCxFQUFYO0FBQ0EsUUFBSyxLQUFMLENBQVcsSUFBWCxHQUFnQixFQUFoQjtBQUNBLFFBQUssR0FBTCxHQUFTLEVBQVQ7O0FBRUE7O0FBRUE7QUFDQSxRQUFLLFdBQUwsR0FBaUIsTUFBSyxXQUFMLENBQWlCLElBQWpCLE9BQWpCO0FBQ0EsUUFBSyxVQUFMLEdBQWdCLE1BQUssVUFBTCxDQUFnQixJQUFoQixPQUFoQjtBQUNBLFFBQUssY0FBTCxHQUFvQixNQUFLLGNBQUwsQ0FBb0IsSUFBcEIsT0FBcEI7O0FBRUEsUUFBSyxnQkFBTCxHQUFzQixNQUFLLGdCQUFMLENBQXNCLElBQXRCLE9BQXRCO0FBQ0EsUUFBSyxnQkFBTCxHQUFzQixNQUFLLGdCQUFMLENBQXNCLElBQXRCLE9BQXRCOztBQUVBLFFBQUssV0FBTCxHQUFpQixNQUFLLFdBQUwsQ0FBaUIsSUFBakIsT0FBakI7QUFDQSxRQUFLLHFCQUFMLEdBQTJCLE1BQUsscUJBQUwsQ0FBMkIsSUFBM0IsT0FBM0I7O0FBRUEsUUFBSyxPQUFMLEdBQWEsTUFBSyxPQUFMLENBQWEsSUFBYixPQUFiO0FBQ0EsUUFBSyxRQUFMLEdBQWMsTUFBSyxRQUFMLENBQWMsSUFBZCxPQUFkO0FBQ0E7O0FBRUEsUUFBSyxlQUFMLEdBQXFCLEVBQXJCO0FBQ0EsTUFBSSxPQUFLLEVBQVQ7O0FBRUE7QUFDQSxRQUFLLE9BQUwsR0FBYSxHQUFHLGNBQUgsRUFBYjtBQUNBLFFBQUssT0FBTCxDQUFhLEdBQWIsQ0FBaUIsRUFBQyxNQUFLLE1BQU0sSUFBWixFQUFqQixFQUFtQyxZQUFVO0FBQzVDLFFBQUssZ0JBQUw7QUFDQSxRQUFLLE9BQUwsQ0FBYSxVQUFiLENBQXdCLEtBQUssZ0JBQTdCO0FBQ0EsR0FIa0MsQ0FHakMsSUFIaUMsT0FBbkM7O0FBS0EsTUFBSSxNQUFLLE9BQUwsQ0FBYSxLQUFiLEtBQXFCLFNBQXJCLElBQWlDLE1BQUssT0FBTCxDQUFhLEtBQWIsS0FBc0IsQ0FBM0QsRUFBOEQsQ0FDN0QsQ0FERCxNQUNLO0FBQUMsU0FBSyxLQUFMLENBQVcsS0FBWCxHQUFpQixNQUFLLE9BQUwsQ0FBYSxLQUE5QjtBQUFxQzs7QUFFM0M7QUFDQSxNQUFJLE9BQUssR0FBRyxnQkFBSCxFQUFUO0FBQ0EsT0FBSyxHQUFMLENBQVMsRUFBVCxFQUFZLFlBQVU7QUFDckIsTUFBRyxlQUFILEdBQW9CLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxVQUFTLEdBQVQsRUFBYztBQUNoRCxRQUFJLE9BQU8sRUFBWDtBQUNBLFNBQUssS0FBTCxHQUFXLElBQUksU0FBZjtBQUNBLFNBQUssS0FBTCxHQUFXLElBQUksSUFBZjtBQUNBLFdBQU8sSUFBUDtBQUNBLElBTG1CLENBQXBCO0FBTUEsS0FBRSxRQUFGLEVBQVksT0FBWixDQUFvQixzQkFBcEI7QUFDQSxHQVJEOztBQXRDaUI7QUFtRGpCOztBQUdEO0FBQ0E7QUFDQTs7Ozs7cUNBQ2tCO0FBQ2pCLFFBQUssUUFBTCxDQUFjLEVBQUMsT0FBTSxLQUFLLE9BQUwsQ0FBYSxLQUFwQixFQUFkO0FBQ0E7Ozt3Q0FDcUIsSSxFQUFLLEssRUFBTTtBQUNoQyxRQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLEtBQW5CLElBQTBCLElBQTFCO0FBQ0EsUUFBSyxRQUFMLENBQWMsRUFBQyxPQUFNLEtBQUssT0FBTCxDQUFhLEtBQXBCLEVBQWQ7QUFDQTs7O3NDQUNtQixJLEVBQUs7QUFDeEIsUUFBSyxJQUFJLElBQUUsQ0FBWCxFQUFjLElBQUksS0FBSyxPQUFMLENBQWEsS0FBYixDQUFtQixNQUFyQyxFQUE2QyxHQUE3QyxFQUFpRDtBQUNoRCxRQUFJLE9BQUssS0FBSyxPQUFMLENBQWEsS0FBYixDQUFtQixDQUFuQixDQUFUO0FBQ0EsUUFBRyxLQUFLLElBQUwsSUFBVyxJQUFkLEVBQW1CO0FBQ2xCLFlBQU8sQ0FBUDtBQUNBO0FBQ0Q7QUFDRDs7O29DQUNpQixTLEVBQVU7QUFDM0IsVUFBTyxLQUFLLE9BQUwsQ0FBYSxpQkFBYixDQUErQixTQUEvQixDQUFQO0FBQ0E7OzttQ0FDZ0IsYyxFQUFlLFksRUFBYTtBQUM1QyxPQUFJLFlBQVUsS0FBSyxPQUFMLENBQWEsS0FBYixDQUFtQixjQUFuQixFQUFtQyxTQUFqRDtBQUNBLFFBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxVQUFVLE1BQTlCLEVBQXNDLEdBQXRDLEVBQTBDO0FBQ3pDLFFBQUksZ0JBQWMsVUFBVSxDQUFWLEVBQWEsUUFBL0IsRUFBd0M7QUFDdkMsWUFBTyxDQUFQO0FBQ0E7QUFDRDtBQUVEOztBQUdEO0FBQ0E7QUFDQTs7OzswQkFFUSxJLEVBQUssSSxFQUFLOztBQUVqQixPQUFJLFdBQVMsS0FBSyxtQkFBTCxDQUF5QixJQUF6QixDQUFiOztBQUVBLFFBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsUUFBbkIsRUFBNkIsU0FBN0I7QUFDQSxRQUFLLElBQUksSUFBRSxDQUFYLEVBQWMsSUFBSSxLQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLFFBQW5CLEVBQTZCLFNBQTdCLENBQXVDLE1BQXpELEVBQWlFLEdBQWpFLEVBQXFFO0FBQ3BFLFNBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsUUFBbkIsRUFBNkIsU0FBN0IsQ0FBdUMsQ0FBdkMsRUFBMEMsS0FBMUMsR0FBZ0QsSUFBaEQ7QUFDQTtBQUNELFFBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsUUFBbkIsRUFBNkIsTUFBN0IsR0FBb0MsWUFBcEM7QUFDQSxRQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLEtBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsUUFBbkIsQ0FBcEI7QUFDQSxRQUFLLFFBQUwsQ0FBYyxFQUFDLE9BQU0sS0FBSyxPQUFMLENBQWEsS0FBcEIsRUFBZDtBQUNBOzs7MkJBQ1EsSSxFQUFLLEksRUFBSzs7QUFFbEIsT0FBSSxXQUFTLEtBQUssbUJBQUwsQ0FBeUIsSUFBekIsQ0FBYjs7QUFFQSxRQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLFFBQW5CLEVBQTZCLFNBQTdCO0FBQ0EsUUFBSyxJQUFJLElBQUUsQ0FBWCxFQUFjLElBQUksS0FBSyxPQUFMLENBQWEsS0FBYixDQUFtQixRQUFuQixFQUE2QixTQUE3QixDQUF1QyxNQUF6RCxFQUFpRSxHQUFqRSxFQUFxRTtBQUNwRSxTQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLFFBQW5CLEVBQTZCLFNBQTdCLENBQXVDLENBQXZDLEVBQTBDLEdBQTFDLEdBQThDLElBQTlDO0FBQ0E7QUFDRCxRQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLFFBQW5CLEVBQTZCLE1BQTdCLEdBQW9DLGFBQXBDO0FBQ0EsUUFBSyxPQUFMLENBQWEsTUFBYixDQUFvQixLQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLFFBQW5CLENBQXBCO0FBQ0EsUUFBSyxRQUFMLENBQWMsRUFBQyxPQUFNLEtBQUssT0FBTCxDQUFhLEtBQXBCLEVBQWQ7QUFDQTs7OzhCQUNXLE8sRUFBUyxhLEVBQWM7QUFDbEMsT0FBSSxXQUFXLEtBQUssaUJBQUwsQ0FBdUIsT0FBdkIsQ0FBZjtBQUNBLE9BQUksZ0JBQWdCLEtBQUssZ0JBQUwsQ0FBc0IsUUFBdEIsRUFBK0IsYUFBL0IsQ0FBcEI7O0FBRUEsT0FBSSxpQkFBZSxVQUFTLEtBQVQsRUFBZTtBQUNqQyxXQUFPLFVBQVMsSUFBVCxFQUFjO0FBQ3BCLFVBQUsscUJBQUwsQ0FBMkIsSUFBM0IsRUFBZ0MsS0FBaEM7QUFDQSxLQUZNLENBRUwsSUFGSyxDQUVBLElBRkEsQ0FBUDtBQUdBLElBSmtCLENBSWpCLElBSmlCLENBSVosSUFKWSxDQUFuQjs7QUFNQSxRQUFLLElBQUksSUFBRSxDQUFYLEVBQWMsSUFBSSxLQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE1BQXJDLEVBQTZDLEdBQTdDLEVBQWlEO0FBQ2hELFFBQUksT0FBTyxLQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLENBQW5CLENBQVg7QUFDQSxRQUFHLEtBQUssSUFBTCxJQUFXLE9BQWQsRUFBc0I7QUFDckIsVUFBSyxJQUFJLElBQUUsQ0FBWCxFQUFjLElBQUksS0FBSyxTQUFMLENBQWUsTUFBakMsRUFBeUMsR0FBekMsRUFBNkM7QUFDNUMsVUFBSSxZQUFZLEtBQUssU0FBTCxDQUFlLENBQWYsQ0FBaEI7QUFDQSxVQUFJLFVBQVUsUUFBVixJQUFvQixhQUF4QixFQUFzQztBQUNyQyxjQUFPLFdBQVA7QUFDQTtBQUNEO0FBQ0QsVUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixDQUFuQixFQUFzQixTQUF0QixDQUFnQyxJQUFoQyxDQUFxQyxFQUFFLFVBQVcsYUFBYixFQUE0QixLQUFJLEdBQWhDLEVBQXJDO0FBQ0EsVUFBSyxPQUFMLENBQWEsTUFBYixDQUFvQixLQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLENBQW5CLENBQXBCLEVBQTBDLGVBQWUsQ0FBZixDQUExQyxFQUE0RCxDQUE1RDtBQUNBLEtBVEQsTUFTSztBQUNKLFNBQUksT0FBSyxDQUFUO0FBQ0EsU0FBRyxLQUFLLFNBQUwsQ0FBZSxNQUFmLEdBQXNCLENBQXpCLEVBQTJCO0FBQzFCLFdBQUssSUFBSSxJQUFFLENBQVgsRUFBYyxJQUFJLEtBQUssU0FBTCxDQUFlLE1BQW5CLElBQTZCLElBQTNDLEVBQWlELEdBQWpELEVBQXFEO0FBQ3BELFdBQUksWUFBWSxLQUFLLFNBQUwsQ0FBZSxDQUFmLENBQWhCO0FBQ0EsV0FBSSxVQUFVLFFBQVYsSUFBb0IsYUFBeEIsRUFBc0M7QUFDckMsYUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixDQUFuQixFQUFzQixTQUF0QixDQUFnQyxNQUFoQyxDQUF1QyxDQUF2QyxFQUEwQyxDQUExQztBQUNBLGFBQUssT0FBTCxDQUFhLE9BQWIsQ0FBcUIsS0FBSyxPQUFMLENBQWEsS0FBYixDQUFtQixDQUFuQixDQUFyQjtBQUNBLGVBQUssQ0FBTDtBQUNBO0FBQ0Q7QUFDRDtBQUNEO0FBQ0Q7QUFFRDs7OztBQUNEO0FBQ0E7QUFDQTttQ0FDaUIsSSxFQUFLLEssRUFBTTtBQUMzQixPQUFJLGtCQUFnQixFQUFwQjtBQUNBLE9BQUcsS0FBSyxTQUFMLEtBQWlCLFNBQXBCLEVBQThCLENBRTdCLENBRkQsTUFHSTtBQUNILFFBQUksaUJBQWUsS0FBSyxTQUFMLENBQWUsR0FBZixDQUFtQixVQUFTLGFBQVQsRUFBdUIsY0FBdkIsRUFBc0M7QUFDMUUscUJBQWdCLElBQWhCLENBQXFCLEtBQUssZ0JBQUwsQ0FBc0IsYUFBdEIsRUFBb0MsS0FBSyxJQUF6QyxFQUE4QyxjQUE5QyxDQUFyQjtBQUNELEtBRnFDLENBRXBDLElBRm9DLENBRS9CLElBRitCLENBQW5CLENBQW5CO0FBR0E7O0FBRUQsVUFFQztBQUNDLFNBQUssS0FETjtBQUVDLFVBQU0sS0FBSyxJQUZaO0FBR0MsVUFBTSxLQUFLLElBSFo7QUFJQyxVQUFNLEtBQUssSUFKWjtBQUtDLGVBQVcsZUFMWjtBQU1DLGlCQUFhLEtBQUssV0FObkI7QUFPQyxjQUFVLEtBQUs7QUFQaEIsS0FGRDtBQWFBOztBQUlEO0FBQ0E7QUFDQTs7OztpQ0FDZSxRLEVBQVMsUyxFQUFVO0FBQ2pDLE9BQUksV0FBVyxLQUFLLGlCQUFMLENBQXVCLFNBQXZCLENBQWY7QUFDQSxPQUFJLE9BQUssQ0FBVDtBQUNBLE9BQUksT0FBSyxLQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLFFBQW5CLENBQVQ7QUFDQSxPQUFHLEtBQUssU0FBTCxDQUFlLE1BQWYsR0FBc0IsQ0FBekIsRUFBMkI7QUFDMUIsU0FBSyxJQUFJLElBQUUsQ0FBWCxFQUFjLElBQUksS0FBSyxTQUFMLENBQWUsTUFBbkIsSUFBNkIsSUFBM0MsRUFBaUQsR0FBakQsRUFBcUQ7QUFDcEQsU0FBSSxZQUFZLEtBQUssU0FBTCxDQUFlLENBQWYsQ0FBaEI7QUFDQSxTQUFJLFVBQVUsUUFBVixJQUFvQixRQUF4QixFQUFpQztBQUNoQyxXQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLFFBQW5CLEVBQTZCLFNBQTdCLENBQXVDLE1BQXZDLENBQThDLENBQTlDLEVBQWlELENBQWpEO0FBQ0E7QUFDQSxXQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLEtBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsUUFBbkIsQ0FBcEI7QUFDQSxXQUFLLFFBQUwsQ0FBYyxFQUFDLE9BQU0sS0FBSyxPQUFMLENBQWEsS0FBcEIsRUFBZDtBQUNBLGFBQUssQ0FBTDtBQUNBO0FBQ0Q7QUFDRDtBQUNEOzs7OEJBRVcsUSxFQUFTLFEsRUFBUyxTLEVBQVUsSyxFQUFNO0FBQzdDLE9BQUksV0FBVyxLQUFLLGlCQUFMLENBQXVCLFNBQXZCLENBQWY7QUFDQSxPQUFJLGdCQUFnQixLQUFLLGdCQUFMLENBQXNCLFFBQXRCLEVBQStCLFFBQS9CLENBQXBCO0FBQ0EsUUFBSyxJQUFMO0FBQ0EsT0FBRyxZQUFVLEtBQWIsRUFBbUI7QUFDbEIsU0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixRQUFqQixFQUEyQixTQUEzQixDQUFxQyxhQUFyQyxFQUFvRCxHQUFwRCxHQUF3RCxLQUF4RDtBQUNBLElBRkQsTUFHSTtBQUFDLFNBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsUUFBakIsRUFBMkIsU0FBM0IsQ0FBcUMsYUFBckMsRUFBb0QsS0FBcEQsR0FBMEQsS0FBMUQ7QUFBZ0U7QUFDbEUsUUFBSyxRQUFMLENBQWMsRUFBQyxPQUFNLEtBQUssS0FBTCxDQUFXLEtBQWxCLEVBQWQ7QUFDSDs7OzZCQUNVLFEsRUFBUyxRLEVBQVMsUyxFQUFVLEssRUFBTTtBQUM1QyxPQUFJLFdBQVcsS0FBSyxpQkFBTCxDQUF1QixTQUF2QixDQUFmO0FBQ0EsT0FBSSxnQkFBZ0IsS0FBSyxnQkFBTCxDQUFzQixRQUF0QixFQUErQixRQUEvQixDQUFwQjtBQUNBLE9BQUksT0FBSyxDQUFUO0FBQ0EsV0FBTSxHQUFHLGVBQUgsQ0FBbUIsS0FBbkIsQ0FBTjtBQUNBLE9BQUcsWUFBVSxLQUFWLElBQW1CLEdBQUcsbUJBQUgsQ0FBdUIsS0FBSyxPQUFMLENBQWEsS0FBYixDQUFtQixRQUFuQixFQUE2QixTQUE3QixDQUF1QyxhQUF2QyxFQUFzRCxHQUE3RSxLQUFxRixHQUFHLGVBQUgsQ0FBbUIsS0FBbkIsQ0FBM0csRUFBcUk7QUFDcEksU0FBSyxPQUFMLENBQWEsS0FBYixDQUFtQixRQUFuQixFQUE2QixTQUE3QixDQUF1QyxhQUF2QyxFQUFzRCxHQUF0RCxHQUEwRCxHQUFHLGVBQUgsQ0FBbUIsS0FBbkIsQ0FBMUQ7QUFDQSxXQUFLLENBQUw7QUFDQTtBQUNFLE9BQUcsWUFBVSxPQUFWLElBQXFCLEdBQUcsbUJBQUgsQ0FBdUIsS0FBSyxPQUFMLENBQWEsS0FBYixDQUFtQixRQUFuQixFQUE2QixTQUE3QixDQUF1QyxhQUF2QyxFQUFzRCxLQUE3RSxLQUF1RixHQUFHLGVBQUgsQ0FBbUIsS0FBbkIsQ0FBL0csRUFBeUk7QUFDeEksU0FBSyxPQUFMLENBQWEsS0FBYixDQUFtQixRQUFuQixFQUE2QixTQUE3QixDQUF1QyxhQUF2QyxFQUFzRCxLQUF0RCxHQUE0RCxHQUFHLGVBQUgsQ0FBbUIsS0FBbkIsQ0FBNUQ7QUFDQSxXQUFLLENBQUw7QUFDQTtBQUNELE9BQUcsSUFBSCxFQUFRO0FBQ1AsU0FBSyxRQUFMLENBQWMsRUFBQyxPQUFNLEtBQUssT0FBTCxDQUFhLEtBQXBCLEVBQWQ7QUFDQSxTQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLEtBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsUUFBbkIsQ0FBcEIsRUFBaUQsWUFBVTtBQUMxRCxRQUFHLFlBQUgsQ0FBZ0IsS0FBSyxPQUFMLENBQWEsS0FBYixDQUFtQixRQUFuQixFQUE2QixTQUE3QixDQUF1QyxhQUF2QyxFQUFzRCxhQUF0RCxHQUFvRSxnQkFBcEY7QUFDQSxLQUZnRCxDQUUvQyxJQUYrQyxDQUUxQyxJQUYwQyxDQUFqRDtBQUdIO0FBQ0Q7OzttQ0FDZ0Isa0IsRUFBbUIsVSxFQUFXLGMsRUFBZTtBQUM3RCxVQUNDO0FBQ0MsU0FBSyxjQUROO0FBRUMsZUFBVyxVQUZaO0FBR0MsbUJBQWUsbUJBQW1CLGFBSG5DO0FBSUMsY0FBVSxtQkFBbUIsUUFKOUI7QUFLQyxXQUFPLEdBQUcsbUJBQUgsQ0FBdUIsbUJBQW1CLEtBQTFDLENBTFI7QUFNQyxTQUFLLEdBQUcsbUJBQUgsQ0FBdUIsbUJBQW1CLEdBQTFDLENBTk47QUFPQyxnQkFBWSxLQUFLLFVBUGxCO0FBUUMsaUJBQWEsS0FBSyxXQVJuQjtBQVNDLG9CQUFnQixLQUFLO0FBVHRCLEtBREQ7QUFhQTs7QUFJRDtBQUNBO0FBQ0E7Ozs7MkJBQ1E7QUFDUDtBQUNBLE9BQUksS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixNQUFqQixLQUEwQixDQUExQixJQUE2QixLQUFLLEtBQUwsQ0FBVyxLQUFYLEtBQW1CLFNBQXBELEVBQThEO0FBQzdELFdBQVE7QUFBQTtBQUFBO0FBQUE7QUFBOEI7QUFBQTtBQUFBLFFBQUcsTUFBSyxPQUFSO0FBQUE7QUFBQTtBQUE5QixLQUFSO0FBQ0E7QUFDRCxPQUFJLFNBQU8sRUFBWDtBQUNBLFFBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsR0FBakIsQ0FBcUIsVUFBUyxJQUFULEVBQWUsS0FBZixFQUFxQjtBQUN6QyxRQUFHLEtBQUssSUFBTCxJQUFXLEtBQUssS0FBTCxDQUFXLElBQXpCLEVBQThCO0FBQzdCLFlBQU8sT0FBUCxDQUFlLEtBQUssZ0JBQUwsQ0FBc0IsSUFBdEIsRUFBMkIsS0FBM0IsQ0FBZjtBQUNBLEtBRkQsTUFFSztBQUNKLFlBQU8sSUFBUCxDQUFZLEtBQUssZ0JBQUwsQ0FBc0IsSUFBdEIsRUFBMkIsS0FBM0IsQ0FBWjtBQUNBO0FBQ0QsSUFOb0IsQ0FNbkIsSUFObUIsQ0FNZCxJQU5jLENBQXJCOztBQVFBLE9BQUksV0FBUyxLQUFLLG1CQUFMLENBQXlCLEtBQUssS0FBTCxDQUFXLElBQXBDLENBQWI7QUFDQSxPQUFJLFNBQU8sRUFBWDtBQUNBLE9BQUksWUFBVSxTQUFkLEVBQXdCO0FBQUMsUUFBSSxTQUFPLEtBQVg7QUFBa0IsSUFBM0MsTUFDSTtBQUFDLGFBQVEsS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixRQUFqQixFQUEyQixNQUFuQztBQUEwQzs7QUFHL0M7QUFDQSxVQUNDO0FBQUE7QUFBQTtBQUNDO0FBQUE7QUFBQSxPQUFLLFdBQVcsS0FBSyxLQUFMLENBQVcsSUFBWCxJQUFpQixNQUFqQixHQUF3QixFQUF4QixHQUEyQixRQUEzQztBQUNDO0FBQ0MsZUFBUyxLQUFLLE9BRGY7QUFFQyxnQkFBVSxLQUFLLFFBRmhCO0FBR0MsY0FBUSxNQUhUO0FBSUMsaUJBQVcsS0FBSyxLQUFMLENBQVcsU0FKdkI7QUFLQyxZQUFNLEtBQUssS0FBTCxDQUFXLElBTGxCO0FBTUMsWUFBTSxLQUFLLEtBQUwsQ0FBVztBQU5sQjtBQURELEtBREQ7QUFXQztBQUFBO0FBQUEsT0FBSyxXQUFXLEtBQUssS0FBTCxDQUFXLElBQVgsSUFBaUIsV0FBakIsR0FBNkIsRUFBN0IsR0FBZ0MsUUFBaEQ7QUFDQyxvQ0FERDtBQUVFO0FBRkY7QUFYRCxJQUREO0FBb0JBOzs7O0VBeFMwQyxNQUFNLFM7O2tCQUE3QixjOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0xyQjtJQUNxQixPOzs7QUFDcEIsa0JBQVksS0FBWixFQUFrQjtBQUFBOztBQUFBLGdIQUNYLEtBRFc7O0FBRWpCLFFBQUssZUFBTCxHQUFxQixNQUFLLGVBQUwsQ0FBcUIsSUFBckIsT0FBckI7QUFDQSxRQUFLLE9BQUwsR0FBYSxNQUFLLE9BQUwsQ0FBYSxJQUFiLE9BQWI7QUFDQSxRQUFLLFFBQUwsR0FBYyxNQUFLLFFBQUwsQ0FBYyxJQUFkLE9BQWQ7QUFDQSxRQUFLLFFBQUwsR0FBYyxNQUFLLFFBQUwsQ0FBYyxJQUFkLE9BQWQ7O0FBRUEsUUFBSyxLQUFMLEdBQVc7QUFDVixTQUFLLElBQUksSUFBSixFQURLO0FBRVYsZ0JBQVk7QUFGRixHQUFYOztBQVBpQjtBQVlqQjs7OzswQkFDTyxDLEVBQUU7QUFDVCxLQUFFLGNBQUY7QUFDQSxPQUFHLEtBQUssS0FBTCxDQUFXLFdBQVgsSUFBd0IsS0FBM0IsRUFBaUM7QUFDaEMsUUFBSSxPQUFLLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0Isa0JBQWhCLENBQW1DLEVBQW5DLEVBQXVDLEVBQUMsTUFBTSxTQUFQLEVBQWtCLFFBQU8sU0FBekIsRUFBbUMsUUFBUSxLQUEzQyxFQUF2QyxDQUFUO0FBQ0E7QUFDQSxPQUFHLFlBQUgsQ0FBZ0IsbUJBQW1CLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0Isa0JBQWhCLENBQW1DLEVBQW5DLEVBQXVDLEVBQUMsTUFBTSxTQUFQLEVBQWtCLFFBQU8sU0FBekIsRUFBdkMsQ0FBbkM7QUFDQSxTQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLElBQW5CLEVBQXlCLEtBQUssS0FBTCxDQUFXLElBQXBDO0FBQ0EsSUFMRCxNQUtLO0FBQ0o7QUFDQSxRQUFHLEtBQUssS0FBTCxDQUFXLElBQVgsSUFBaUIsU0FBcEIsRUFBOEI7QUFDN0IsVUFBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixLQUFLLEtBQUwsQ0FBVyxJQUE5QixFQUFvQyxLQUFLLEtBQUwsQ0FBVyxJQUEvQztBQUNBLFFBQUcsWUFBSCxDQUFnQixZQUFoQjtBQUNBLEtBSEQsTUFHSztBQUNKO0FBQ0EsUUFBRyxTQUFILENBQWEsZUFBYjtBQUNBO0FBQ0Q7QUFDRDs7OzJCQUNRLEMsRUFBRTtBQUNWLEtBQUUsY0FBRjtBQUNBLE9BQUcsS0FBSyxLQUFMLENBQVcsV0FBWCxJQUF3QixLQUEzQixFQUFpQztBQUNoQyxRQUFJLE9BQUssS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixrQkFBaEIsQ0FBbUMsRUFBbkMsRUFBdUMsRUFBQyxNQUFNLFNBQVAsRUFBa0IsUUFBTyxTQUF6QixFQUFtQyxRQUFRLEtBQTNDLEVBQXZDLENBQVQ7QUFDQTtBQUNBLE9BQUcsWUFBSCxDQUFnQixvQkFBb0IsS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixrQkFBaEIsQ0FBbUMsRUFBbkMsRUFBdUMsRUFBQyxNQUFNLFNBQVAsRUFBa0IsUUFBTyxTQUF6QixFQUF2QyxDQUFwQixHQUFnRyxzQkFBaEg7QUFDQSxTQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLElBQXBCLEVBQTBCLEtBQUssS0FBTCxDQUFXLElBQXJDO0FBQ0EsSUFMRCxNQUtLO0FBQ0o7QUFDQSxRQUFHLEtBQUssS0FBTCxDQUFXLElBQVgsSUFBaUIsU0FBcEIsRUFBOEI7QUFDN0IsVUFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixLQUFLLEtBQUwsQ0FBVyxJQUEvQixFQUFxQyxLQUFLLEtBQUwsQ0FBVyxJQUFoRDtBQUNBLFFBQUcsWUFBSCxDQUFnQixtQ0FBaEI7QUFDQSxLQUhELE1BR0s7QUFDSjtBQUNBLFFBQUcsU0FBSCxDQUFhLGVBQWI7QUFDQTtBQUNEO0FBQ0Q7OztrQ0FDZSxDLEVBQUU7QUFDakI7QUFDQSxPQUFHLEtBQUssS0FBTCxDQUFXLFdBQWQsRUFBMEI7QUFDekIsU0FBSyxRQUFMLENBQWMsRUFBQyxhQUFZLEtBQWIsRUFBZDtBQUNBLElBRkQsTUFHSTtBQUFDLFNBQUssUUFBTCxDQUFjLEVBQUMsYUFBWSxJQUFiLEVBQWQ7QUFBbUM7QUFDeEM7OzsyQkFDUSxDLEVBQUU7QUFDVixRQUFLLFFBQUwsQ0FBYyxFQUFDLE1BQUssRUFBRSxNQUFGLENBQVMsS0FBZixFQUFkO0FBQ0E7OztzQ0FDbUI7QUFBQTs7QUFDbkIsUUFBSyxPQUFMLEdBQWUsWUFBWTtBQUFBLFdBQU0sT0FBSyxJQUFMLEVBQU47QUFBQSxJQUFaLEVBQThCLEtBQTlCLENBQWY7QUFDQTs7O3lDQUVzQjtBQUN0QixpQkFBYyxLQUFLLE9BQW5CO0FBQ0E7Ozt5QkFFTTtBQUNOLFFBQUssUUFBTCxDQUFjO0FBQ2IsVUFBTSxJQUFJLElBQUo7QUFETyxJQUFkO0FBR0E7OzsyQkFDTzs7QUFHUCxPQUFJLFNBQU87QUFDVixlQUFVLENBQUMsS0FBSyxPQUFOLEVBQWMsVUFBZCxFQUF5QixrQ0FBekIsQ0FEQTtBQUVWLGtCQUFhLENBQUMsS0FBSyxRQUFOLEVBQWdCLFdBQWhCLEVBQTZCLGtDQUE3QixDQUZIO0FBR1YsbUJBQWMsQ0FBQyxLQUFLLFFBQU4sRUFBZ0Isc0JBQWhCLEVBQXVDLGtDQUF2QyxDQUhKO0FBSVYsaUJBQVksQ0FBQyxFQUFELEVBQUksbUJBQUosRUFBd0Isa0NBQXhCLENBSkY7QUFLVixlQUFVLENBQUMsRUFBRCxFQUFJLG1CQUFKLEVBQXdCLGtDQUF4QjtBQUxBLEtBTVQsS0FBSyxLQUFMLENBQVcsTUFORixDQUFYO0FBT0EsT0FBSSxTQUFPLEVBQVg7QUFDQSxPQUFJLFVBQVEsU0FBWixFQUFzQjtBQUNyQixhQUFRO0FBQUE7QUFBQSxPQUFHLE1BQUssWUFBUjtBQUFBO0FBQUEsS0FBUjtBQUNBLElBRkQsTUFHSTtBQUNILFFBQUksYUFBZSwrQkFBTyxNQUFLLFFBQVosRUFBcUIsV0FBVyxPQUFPLENBQVAsQ0FBaEMsRUFBMkMsU0FBUyxPQUFPLENBQVAsQ0FBcEQsRUFBK0QsT0FBTyxPQUFPLENBQVAsQ0FBdEUsR0FBbkI7QUFDQSxhQUNDO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQSxRQUFJLFdBQVUsYUFBZDtBQUFBO0FBQ1M7QUFBQTtBQUFBLFNBQU0sV0FBVSxVQUFoQjtBQUE0QixZQUFLLEtBQUwsQ0FBVztBQUF2QztBQURULE1BREE7QUFJQTtBQUFBO0FBQUEsUUFBSSxXQUFVLGFBQWQ7QUFBNkIsV0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixrQkFBaEIsQ0FBbUMsRUFBbkMsRUFBdUMsRUFBQyxNQUFNLFNBQVAsRUFBa0IsUUFBTyxTQUF6QixFQUF2QyxDQUE3QjtBQUFBO0FBQThHLFdBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsWUFBaEIsRUFBOUc7QUFBQTtBQUFBLE1BSkE7QUFLQTtBQUFBO0FBQUEsUUFBSyxXQUFVLFNBQWY7QUFDQztBQUFBO0FBQUEsU0FBTSxXQUFVLGNBQWhCLEVBQStCLE1BQUssTUFBcEM7QUFDRSxpQkFERjtBQUVDLHNDQUZEO0FBR0M7QUFBQTtBQUFBLFVBQUssV0FBVSxhQUFmO0FBQ0M7QUFBQTtBQUFBLFdBQUssV0FBVSxhQUFmO0FBQ0M7QUFDQyxnQkFBSyxNQUROO0FBRUMscUJBQVcsS0FBSyxLQUFMLENBQVcsV0FBWCxHQUF5Qix5QkFBekIsR0FBbUQsUUFGL0Q7QUFHQyxvQkFBVSxLQUFLO0FBSGhCO0FBREQsU0FERDtBQVFDLHVDQVJEO0FBU0M7QUFBQTtBQUFBLFdBQUcsV0FBVSxpQkFBYixFQUErQixTQUFTLEtBQUssZUFBN0M7QUFBK0QsY0FBSyxLQUFMLENBQVcsV0FBWCxHQUF1QixxQkFBdkIsR0FBNkM7QUFBNUc7QUFURDtBQUhEO0FBREQ7QUFMQSxLQUREO0FBeUJBO0FBQ0QsVUFDQztBQUFBO0FBQUE7QUFDRTtBQURGLElBREQ7QUFLQTs7OztFQXhIbUMsTUFBTSxTOztrQkFBdEIsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBckI7SUFDcUIsYzs7O0FBQ3BCLHlCQUFZLEtBQVosRUFBa0I7QUFBQTs7QUFFakI7QUFGaUIsOEhBQ1gsS0FEVzs7QUFHakIsUUFBSyxZQUFMLEdBQWtCLE1BQUssWUFBTCxDQUFrQixJQUFsQixPQUFsQjtBQUNBLFFBQUssVUFBTCxHQUFnQixNQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsT0FBaEI7QUFDQSxRQUFLLFdBQUwsR0FBaUIsTUFBSyxXQUFMLENBQWlCLElBQWpCLE9BQWpCO0FBQ0EsUUFBSyxTQUFMLEdBQWUsTUFBSyxTQUFMLENBQWUsSUFBZixPQUFmO0FBQ0EsUUFBSyxNQUFMLEdBQVksTUFBSyxNQUFMLENBQVksSUFBWixPQUFaO0FBQ0EsUUFBSyxlQUFMLEdBQXFCLE1BQUssZUFBTCxDQUFxQixJQUFyQixPQUFyQjtBQUNBLFFBQUssYUFBTCxHQUFtQixNQUFLLGFBQUwsQ0FBbUIsSUFBbkIsT0FBbkI7QUFUaUI7QUFVakI7Ozs7K0JBQ1ksQyxFQUFFO0FBQ2QsUUFBSyxLQUFMLENBQVcsV0FBWCxDQUF5QixPQUF6QixFQUFpQyxLQUFLLEtBQUwsQ0FBVyxRQUE1QyxFQUFxRCxLQUFLLEtBQUwsQ0FBVyxTQUFoRSxFQUEwRSxFQUFFLE1BQUYsQ0FBUyxLQUFuRjtBQUNBOzs7NkJBQ1UsQyxFQUFFO0FBQ1osUUFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixLQUF2QixFQUE2QixLQUFLLEtBQUwsQ0FBVyxRQUF4QyxFQUFpRCxLQUFLLEtBQUwsQ0FBVyxTQUE1RCxFQUFzRSxFQUFFLE1BQUYsQ0FBUyxLQUEvRTtBQUNBOzs7OEJBQ1csQyxFQUFFO0FBQ2IsT0FBRyxFQUFFLE1BQUYsQ0FBUyxLQUFULElBQWdCLEVBQW5CLEVBQXNCO0FBQ3JCLFNBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsT0FBdEIsRUFBOEIsS0FBSyxLQUFMLENBQVcsUUFBekMsRUFBa0QsS0FBSyxLQUFMLENBQVcsU0FBN0QsRUFBd0UsRUFBRSxNQUFGLENBQVMsS0FBakY7QUFDQTtBQUNEOzs7NEJBQ1MsQyxFQUFFO0FBQ1gsT0FBRyxFQUFFLE1BQUYsQ0FBUyxLQUFULElBQWdCLEVBQW5CLEVBQXNCO0FBQ3JCLFNBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsS0FBdEIsRUFBNEIsS0FBSyxLQUFMLENBQVcsUUFBdkMsRUFBZ0QsS0FBSyxLQUFMLENBQVcsU0FBM0QsRUFBc0UsRUFBRSxNQUFGLENBQVMsS0FBL0U7QUFDQTtBQUNEOzs7MEJBQ00sQyxFQUFFO0FBQ1IsS0FBRSxjQUFGO0FBQ0EsUUFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixLQUFLLEtBQUwsQ0FBVyxRQUFyQyxFQUE4QyxLQUFLLEtBQUwsQ0FBVyxTQUF6RDtBQUNBOzs7a0NBQ2UsQyxFQUFHO0FBQ2YsT0FBSSxFQUFFLEdBQUYsS0FBVSxPQUFkLEVBQXVCO0FBQ3RCLE1BQUUsY0FBRjtBQUNBLFFBQUcsS0FBSyxLQUFMLENBQVcsS0FBWCxJQUFrQixFQUFyQixFQUF3QjtBQUMxQixVQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLE9BQXRCLEVBQThCLEtBQUssS0FBTCxDQUFXLFFBQXpDLEVBQWtELEtBQUssS0FBTCxDQUFXLFNBQTdELEVBQXdFLEtBQUssS0FBTCxDQUFXLEtBQW5GO0FBQ0E7QUFDRTtBQUNIOzs7Z0NBQ1ksQyxFQUFHO0FBQ2IsT0FBSSxFQUFFLEdBQUYsS0FBVSxPQUFkLEVBQXVCO0FBQ3RCLE1BQUUsY0FBRjtBQUNBLFFBQUcsS0FBSyxLQUFMLENBQVcsR0FBWCxJQUFnQixFQUFuQixFQUFzQjtBQUN4QixVQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLE9BQXRCLEVBQThCLEtBQUssS0FBTCxDQUFXLFFBQXpDLEVBQWtELEtBQUssS0FBTCxDQUFXLFNBQTdELEVBQXdFLEtBQUssS0FBTCxDQUFXLEdBQW5GO0FBQ0E7QUFDRTtBQUNIOzs7MkJBQ007QUFDUCxVQUNDO0FBQUE7QUFBQSxNQUFJLFdBQVUsaUJBQWQ7QUFDQztBQUFBO0FBQUEsT0FBTyxXQUFVLG1DQUFqQjtBQUNDO0FBQUE7QUFBQSxRQUFPLFdBQVUsaUZBQWpCO0FBQW1HO0FBQUE7QUFBQTtBQUFVLFlBQUssS0FBTCxDQUFXO0FBQXJCO0FBQW5HLE1BREQ7QUFHQztBQUFBO0FBQUEsUUFBSyxXQUFVLHVEQUFmO0FBQ0M7QUFBQTtBQUFBLFNBQUssV0FBVSxhQUFmO0FBQ0M7QUFBQTtBQUFBLFVBQUssV0FBVSxtQkFBZjtBQUFBO0FBQUEsUUFERDtBQUVDO0FBQ0MsY0FBSyxNQUROO0FBRUMsbUJBQVUsb0JBRlg7QUFHQyxlQUFPLEtBQUssS0FBTCxDQUFXLEtBSG5CO0FBSUMsZ0JBQVEsS0FBSyxXQUpkO0FBS0Msa0JBQVUsS0FBSyxZQUxoQjtBQU1DLG9CQUFZLEtBQUs7O0FBTmxCO0FBRkQ7QUFERCxNQUhEO0FBa0JDO0FBQUE7QUFBQSxRQUFLLFdBQVUsdURBQWY7QUFDQztBQUFBO0FBQUEsU0FBSyxXQUFVLGFBQWY7QUFDQztBQUFBO0FBQUEsVUFBSyxXQUFVLG1CQUFmO0FBQUE7QUFBQSxRQUREO0FBRUM7QUFDQyxjQUFLLE1BRE47QUFFQyxtQkFBVSxrQkFGWDtBQUdDLGVBQU8sS0FBSyxLQUFMLENBQVcsR0FIbkI7QUFJQyxnQkFBUSxLQUFLLFNBSmQ7QUFLQyxrQkFBVSxLQUFLLFVBTGhCO0FBTUMsb0JBQVksS0FBSztBQU5sQjtBQUZEO0FBREQsTUFsQkQ7QUFnQ0M7QUFBQTtBQUFBLFFBQUssV0FBVSxtRUFBZjtBQUNDO0FBQUE7QUFBQTtBQUNDLG1CQUFVLHVCQURYO0FBRUMsaUJBQVMsS0FBSztBQUZmO0FBQUE7QUFBQTtBQUREO0FBaENEO0FBREQsSUFERDtBQTJDQTs7OztFQTVGMEMsTUFBTSxTOztrQkFBN0IsYzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGckI7O0lBRXFCLFM7OztBQUNwQixvQkFBWSxLQUFaLEVBQWtCO0FBQUE7O0FBRWpCO0FBRmlCLG9IQUNYLEtBRFc7O0FBR2pCLFFBQUssWUFBTCxHQUFrQixNQUFLLFlBQUwsQ0FBa0IsSUFBbEIsT0FBbEI7QUFDQSxRQUFLLFVBQUwsR0FBZ0IsTUFBSyxVQUFMLENBQWdCLElBQWhCLE9BQWhCO0FBQ0EsUUFBSyxVQUFMLEdBQWdCLE1BQUssVUFBTCxDQUFnQixJQUFoQixPQUFoQjtBQUxpQjtBQU1qQjs7OzsrQkFFWSxLLEVBQU07QUFDbEIsT0FBSSxTQUFTO0FBQ1osY0FBVSxDQURFO0FBRVosY0FBVSxFQUZFO0FBR1osZUFBVyxJQUhDO0FBSVosWUFBUSxnQkFBUyxJQUFULEVBQWUsS0FBZixFQUFzQjtBQUM3QixTQUFJLFFBQVEsS0FBSyxLQUFMLENBQVcsV0FBWCxFQUFaO0FBQ0EsU0FBRyxNQUFNLE9BQU4sQ0FBYyxXQUFkLE1BQStCLENBQUMsQ0FBaEMsSUFDRixNQUFNLE9BQU4sQ0FBYyxLQUFkLE1BQXlCLENBQUMsQ0FEM0IsRUFDOEI7QUFDN0IsYUFBTyxJQUFQO0FBQ0E7QUFDRCxLQVZXO0FBV1osVUFBTSxjQUFTLEtBQVQsRUFBZSxLQUFmLEVBQXNCO0FBQzNCLFNBQUksSUFBSSxLQUFSO0FBQ0EsU0FBSSxPQUFPLFdBQVcsR0FBRyxNQUFLLEtBQUwsSUFBYyxNQUFLLEtBQXRCLENBQVgsR0FBMEMsU0FBckQ7QUFDQSxZQUFPLEVBQUUsV0FBRixFQUNMLElBREssQ0FDQSxtQkFEQSxFQUNxQixLQURyQixFQUVMLElBRkssQ0FFQSxXQUFXLElBQVgsR0FBa0IsVUFGbEIsRUFHTCxHQUhLLENBR0QsQ0FIQyxDQUFQO0FBSUE7QUFsQlcsSUFBYjtBQW9CQSxPQUFJLEtBQUssSUFBSSxXQUFKLENBQWdCLEtBQWhCLEVBQXNCLE1BQXRCLENBQVQ7QUFDQSxTQUFNLGdCQUFOLENBQ0MsNEJBREQsRUFFRSxLQUFLLFVBRlA7QUFJQSxNQUFHLElBQUgsR0FBUSxHQUFHLGVBQVg7QUFDQSxLQUFFLFFBQUYsRUFBWSxJQUFaLENBQWlCLHNCQUFqQixFQUF3QyxZQUFVO0FBQ2pELE9BQUcsSUFBSCxHQUFRLEdBQUcsZUFBWDtBQUNBLElBRkQ7QUFHQTs7OzZCQUNVLEMsRUFBRTtBQUNaLFFBQUssR0FBTCxHQUFTLEVBQUUsTUFBRixDQUFTLEtBQWxCO0FBQ0E7Ozs2QkFDVSxDLEVBQUU7QUFDWixLQUFFLGNBQUY7QUFDQSxPQUFJLFVBQVEsS0FBSyxLQUFMLENBQVcsSUFBdkI7QUFDQSxPQUFJLGdCQUFjLEtBQUssR0FBdkI7QUFDQTtBQUNBLE9BQUksaUJBQWUsVUFBUyxLQUFULEVBQWU7QUFDakMsV0FBTyxVQUFTLElBQVQsRUFBYztBQUNwQixVQUFLLHFCQUFMLENBQTJCLElBQTNCLEVBQWdDLEtBQWhDO0FBQ0EsS0FGTSxDQUVMLElBRkssQ0FFQSxJQUZBLENBQVA7QUFHQSxJQUprQixDQUlqQixJQUppQixDQUlaLElBSlksQ0FBbkI7QUFLQSxRQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLE9BQXZCLEVBQWdDLGFBQWhDO0FBQ0E7OzsyQkFDTztBQUNQLFVBQ0M7QUFBQTtBQUFBLE1BQUssV0FBVSx5QkFBZjtBQUVDO0FBQUE7QUFBQSxPQUFLLFdBQVUsZUFBZjtBQUNDO0FBQUE7QUFBQSxRQUFJLFdBQVUsYUFBZDtBQUFBO0FBQXlDLFdBQUssS0FBTCxDQUFXLElBQXBEO0FBQUE7QUFBK0QsV0FBSyxLQUFMLENBQVcsSUFBMUU7QUFBQTtBQUFBO0FBREQsS0FGRDtBQU1DO0FBQUE7QUFBQSxPQUFJLFdBQVUsWUFBZDtBQUNDO0FBQUE7QUFBQSxRQUFLLElBQUcsT0FBUjtBQUNFLFdBQUssS0FBTCxDQUFXO0FBRGI7QUFERCxLQU5EO0FBWUM7QUFBQTtBQUFBLE9BQUssV0FBVSxrREFBZjtBQUNDO0FBQUE7QUFBQSxRQUFNLFdBQVUsa0JBQWhCO0FBQ0M7QUFBQTtBQUFBLFNBQUssV0FBVSw0REFBZjtBQUNDO0FBQUE7QUFBQSxVQUFRLE1BQUssUUFBYixFQUFzQixXQUFVLGlCQUFoQztBQUFBO0FBQUE7QUFERCxPQUREO0FBSUM7QUFBQTtBQUFBLFNBQUssV0FBVSx3Q0FBZjtBQUNDO0FBQUE7QUFBQTtBQUNDLGVBQUssUUFETjtBQUVDLG9CQUFVLGlCQUZYO0FBR0Msa0JBQVMsS0FBSztBQUhmO0FBQUE7QUFBQTtBQURELE9BSkQ7QUFXQztBQUFBO0FBQUEsU0FBSyxXQUFVLGtEQUFmO0FBQWtFO0FBQUE7QUFBQSxVQUFLLFdBQVUsYUFBZjtBQUNqRSx1Q0FBTyxNQUFLLE1BQVo7QUFDQyxjQUFLLEtBQUssWUFEWDtBQUVTLG1CQUFVLEtBQUssVUFGeEI7QUFHUyxvQkFBVSx3Q0FIbkI7QUFJUyxzQkFBWSxVQUpyQjtBQURpRTtBQUFsRTtBQVhEO0FBREQ7QUFaRCxJQUREO0FBcUNBOzs7O0VBN0ZxQyxNQUFNLFM7O2tCQUF4QixTOzs7Ozs7Ozs7OztBQ0RyQjs7Ozs7Ozs7OzsrZUFEQTs7O0lBSXFCLGM7OztBQUNwQix5QkFBWSxLQUFaLEVBQWtCO0FBQUE7O0FBQUEsOEhBQ1gsS0FEVzs7QUFFakIsTUFBSSxPQUFLLEVBQVQ7QUFDQSxPQUFLLElBQUwsR0FBVSxNQUFLLEtBQUwsQ0FBVyxJQUFyQjtBQUNBLE9BQUssSUFBTCxHQUFVLE1BQUssS0FBTCxDQUFXLElBQXJCOztBQUVBO0FBQ0EsUUFBSyxhQUFMLEdBQW1CLE1BQUssYUFBTCxDQUFtQixJQUFuQixPQUFuQjtBQUNBLFFBQUssZUFBTCxHQUFxQixNQUFLLGVBQUwsQ0FBcUIsSUFBckIsT0FBckI7QUFDQSxRQUFLLGdCQUFMLEdBQXNCLE1BQUssZ0JBQUwsQ0FBc0IsSUFBdEIsT0FBdEI7QUFDQSxRQUFLLFlBQUwsR0FBa0IsTUFBSyxZQUFMLENBQWtCLElBQWxCLE9BQWxCO0FBQ0E7QUFDQTs7QUFFQSxRQUFLLEtBQUwsR0FBVyxFQUFDLFlBQVcsRUFBWixFQUFYO0FBQ0EsUUFBSyxhQUFMLEdBQW1CLEdBQUcsYUFBSCxFQUFuQjtBQUNBLFFBQUssYUFBTCxDQUFtQixHQUFuQixDQUF1QixJQUF2QixFQUE0QixZQUFVO0FBQ3JDLFFBQUssZ0JBQUw7QUFDQSxRQUFLLGFBQUwsQ0FBbUIsVUFBbkIsQ0FBOEIsS0FBSyxnQkFBbkM7QUFDQSxHQUgyQixDQUcxQixJQUgwQixPQUE1QjtBQUlBLE1BQUksTUFBSyxhQUFMLENBQW1CLEtBQW5CLEtBQTJCLFNBQTNCLElBQXVDLE1BQUssYUFBTCxDQUFtQixLQUFuQixLQUE0QixDQUF2RSxFQUEwRSxDQUV6RSxDQUZELE1BRUs7QUFBQyxTQUFLLEtBQUwsQ0FBVyxVQUFYLEdBQXNCLE1BQUssYUFBTCxDQUFtQixLQUF6QztBQUFnRDtBQXRCckM7QUF1QmpCOzs7O2lDQUNhLENBRWI7OztnQ0FDYSxRLEVBQVMsSyxFQUFNLEssRUFBTTtBQUNsQyxRQUFLLGFBQUwsQ0FBbUIsS0FBbkIsQ0FBeUIsUUFBekIsRUFBbUMsT0FBbkMsQ0FBMkMsS0FBM0MsRUFBa0QsTUFBbEQsR0FBeUQsUUFBTSxDQUFOLEdBQVEsQ0FBakU7QUFDQSxRQUFLLFFBQUwsQ0FBYyxFQUFDLFlBQVcsS0FBSyxhQUFMLENBQW1CLEtBQS9CLEVBQWQ7QUFDQSxRQUFLLGFBQUwsQ0FBbUIsTUFBbkIsQ0FBMEIsS0FBSyxhQUFMLENBQW1CLEtBQW5CLENBQXlCLFFBQXpCLENBQTFCO0FBQ0EsT0FBSSxjQUFZLFFBQU0sWUFBTixHQUFtQixVQUFuQztBQUNBO0FBQ0E7OztrQ0FDZSxNLEVBQVEsSyxFQUFNO0FBQzdCLFFBQUssYUFBTCxDQUFtQixLQUFuQixDQUF5QixLQUF6QixFQUFnQyxNQUFoQyxHQUF1QyxNQUF2QztBQUNBLFFBQUssUUFBTCxDQUFjLEVBQUMsWUFBVyxLQUFLLGFBQUwsQ0FBbUIsS0FBL0IsRUFBZDtBQUNBLFFBQUssYUFBTCxDQUFtQixNQUFuQixDQUEwQixLQUFLLGFBQUwsQ0FBbUIsS0FBbkIsQ0FBeUIsS0FBekIsQ0FBMUI7QUFDQSxPQUFHLFVBQVEsVUFBWCxFQUFzQjtBQUNyQixPQUFHLFlBQUgsQ0FBZ0Isc0JBQWhCO0FBQ0E7QUFDRDs7O3FDQUNpQjtBQUNqQixRQUFLLFFBQUwsQ0FBYyxFQUFDLFlBQVcsS0FBSyxhQUFMLENBQW1CLEtBQS9CLEVBQWQ7QUFDQTs7OytCQUNZLEksRUFBSyxLLEVBQU07QUFDdkIsVUFDQztBQUNDLFNBQUssS0FETjtBQUVDLFdBQU8sS0FGUjtBQUdDLG9CQUFnQixLQUFLLGNBSHRCO0FBSUMsY0FBVSxLQUFLLFFBSmhCO0FBS0MsV0FBTyxLQUFLLE9BTGI7QUFNQyxZQUFRLEtBQUssTUFOZDtBQU9DLGVBQVcsS0FBSyxJQVBqQjtBQVFDLG1CQUFlLEtBQUssYUFSckI7QUFTQyxxQkFBaUIsS0FBSyxlQVR2QjtBQVVDLFdBQU8sS0FBSztBQVZiLEtBREQ7QUFjQTs7QUFFRDtBQUNBO0FBQ0E7Ozs7MkJBQ1E7QUFDUCxPQUFJLEtBQUssS0FBTCxDQUFXLFVBQVgsS0FBd0IsQ0FBeEIsSUFBMkIsS0FBSyxLQUFMLENBQVcsVUFBWCxLQUF3QixTQUF2RCxFQUFpRTtBQUNoRSxXQUFRO0FBQUE7QUFBQSxPQUFLLFdBQVUsYUFBZjtBQUE2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQTdCLEtBQVI7QUFDQTtBQUNELE9BQUksT0FBSyxFQUFUO0FBQ0EsT0FBSSxXQUFTLEVBQWI7QUFDQSxRQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLEdBQXRCLENBQTBCLFVBQVMsSUFBVCxFQUFlLEtBQWYsRUFBcUI7QUFDOUMsUUFBSSxLQUFLLE1BQUwsSUFBYSxVQUFiLElBQXlCLEtBQUssTUFBTCxJQUFhLFlBQTFDLEVBQXVEO0FBQ3RELFVBQUssSUFBTCxDQUFVLEtBQUssWUFBTCxDQUFrQixJQUFsQixFQUF1QixLQUF2QixDQUFWO0FBQ0EsU0FBRyxLQUFLLE1BQUwsR0FBWSxDQUFaLEtBQWdCLENBQW5CLEVBQXFCO0FBQUMsV0FBSyxJQUFMLENBQVUsNkJBQUssV0FBVSxVQUFmLEdBQVY7QUFBNEM7QUFDbEUsS0FIRCxNQUdLO0FBQ0osY0FBUyxJQUFULENBQWMsS0FBSyxZQUFMLENBQWtCLElBQWxCLEVBQXVCLEtBQXZCLENBQWQ7QUFDQSxTQUFHLFNBQVMsTUFBVCxHQUFnQixDQUFoQixLQUFvQixDQUF2QixFQUF5QjtBQUFDLGVBQVMsSUFBVCxDQUFjLDZCQUFLLFdBQVUsVUFBZixHQUFkO0FBQWdEO0FBQzFFO0FBQ0QsSUFSeUIsQ0FReEIsSUFSd0IsQ0FRbkIsSUFSbUIsQ0FBMUI7QUFTQSxVQUNDO0FBQUE7QUFBQSxNQUFLLFdBQVUscUJBQWY7QUFDQztBQUFBO0FBQUE7QUFBSyxvQ0FBTDtBQUNFO0FBREYsS0FERDtBQUlDLGlDQUFLLFdBQVUsVUFBZixHQUpEO0FBS0M7QUFBQTtBQUFBO0FBQUs7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUFMO0FBQ0U7QUFERjtBQUxELElBREQ7QUFZQTs7OztFQTdGMEMsTUFBTSxTOztrQkFBN0IsYzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKckI7O0lBR3FCLFc7OztBQUNwQixzQkFBWSxLQUFaLEVBQWtCO0FBQUE7O0FBQUEsd0hBQ1gsS0FEVzs7QUFFakIsUUFBSyxhQUFMLEdBQW1CLE1BQUssYUFBTCxDQUFtQixJQUFuQixPQUFuQjtBQUNBLFFBQUssY0FBTCxHQUFvQixNQUFLLGNBQUwsQ0FBb0IsSUFBcEIsT0FBcEI7QUFIaUI7QUFJakI7Ozs7NEJBQ1E7QUFDUixLQUFFLFlBQVk7QUFDWixNQUFFLHlCQUFGLEVBQTZCLE9BQTdCO0FBQ0QsSUFGRDtBQUdBOzs7Z0NBQ2EsQyxFQUFFO0FBQ2YsS0FBRSxjQUFGO0FBQ0EsUUFBSyxLQUFMLENBQVcsZ0JBQVg7QUFDQTs7O2lDQUNjLEksRUFBSyxDLEVBQUU7QUFDckIsS0FBRSxjQUFGO0FBQ0EsV0FBUSxHQUFSLENBQVksSUFBWjtBQUNBLFFBQUssS0FBTCxDQUFXLGlCQUFYLENBQTZCLElBQTdCO0FBQ0E7OzsyQkFDTztBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0gsT0FBSSxnQkFBYyxFQUFsQjtBQUNBLE9BQUcsS0FBSyxLQUFMLENBQVcsTUFBWCxLQUFvQixJQUF2QixFQUE0QjtBQUMzQixTQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLEdBQWxCLENBQXNCLFVBQVMsSUFBVCxFQUFlLEtBQWYsRUFBcUI7QUFDMUMsU0FBSSxLQUFLLE1BQUwsSUFBYyxXQUFkLElBQTZCLEtBQUssTUFBTCxJQUFhLFVBQTlDLEVBQXlEO0FBQ3hELG9CQUFjLElBQWQsQ0FDQztBQUFBO0FBQUEsU0FBSSxLQUFLLEtBQVQ7QUFDQztBQUFBO0FBQUEsVUFBRyxXQUFVLGVBQWI7QUFDQyxlQUFLLEdBRE47QUFFQyxrQkFBUyxLQUFLLGNBQUwsQ0FBb0IsSUFBcEIsQ0FBeUIsSUFBekIsRUFBOEIsSUFBOUI7QUFGVjtBQUdFLGFBQUs7QUFIUDtBQURELE9BREQ7QUFPQTtBQUNELEtBVnFCLENBVXBCLElBVm9CLENBVWYsSUFWZSxDQUF0QjtBQVdBO0FBQ0QsVUFDQztBQUFBO0FBQUEsTUFBSyxXQUFVLFlBQWY7QUFFQztBQUFBO0FBQUE7QUFDQyxpQkFBVSxxREFEWDtBQUVDLFlBQUssUUFGTjtBQUdDLHFCQUFZLFVBSGI7QUFJQyx1QkFBYyxNQUpmO0FBS0MsdUJBQWMsT0FMZjtBQU9FLG1DQUFNLFdBQVUsc0NBQWhCLEVBQXVELGVBQVksTUFBbkU7QUFQRixLQUZEO0FBV0M7QUFBQTtBQUFBLE9BQUksV0FBVSxlQUFkO0FBQ0k7QUFBQTtBQUFBLFFBQUksV0FBVSxpQkFBZDtBQUFBO0FBQUEsTUFESjtBQUVLLGtCQUZMO0FBR0ksaUNBQUksTUFBSyxXQUFULEVBQXFCLFdBQVUsU0FBL0IsR0FISjtBQUlJO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQTtBQUNILG1CQUFVLGVBRFA7QUFFSCxpQkFBUyxLQUFLLGFBRlg7QUFHSCxjQUFLLEdBSEY7QUFBQTtBQUFBO0FBQUo7QUFKSjtBQVhELElBREQ7QUF3QkE7Ozs7RUFsRXVDLE1BQU0sUzs7a0JBQTFCLFc7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSHJCO0lBQ3FCLFM7OztBQUNwQixvQkFBWSxLQUFaLEVBQWtCO0FBQUE7O0FBQUEsb0hBQ1gsS0FEVzs7QUFFakIsVUFBUSxHQUFSLENBQVksTUFBSyxLQUFMLENBQVcsT0FBdkI7QUFDQSxRQUFLLFdBQUwsR0FBbUIsTUFBSyxXQUFMLENBQWlCLElBQWpCLE9BQW5CO0FBSGlCO0FBSWpCOzs7OzhCQUNXLEMsRUFBRTtBQUNiLFFBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsS0FBSyxLQUFMLENBQVcsS0FBbEMsRUFBeUMsS0FBSyxLQUFMLENBQVcsT0FBcEQ7QUFDQTs7OzJCQUNPO0FBQ1AsT0FBTSxVQUFVLEtBQUssS0FBTCxDQUFXLE9BQVgsR0FBcUIsY0FBckIsR0FBc0MsRUFBdEQ7QUFDQSxVQUNDO0FBQUE7QUFBQSxNQUFLLFdBQVUsVUFBZjtBQUNDO0FBQUE7QUFBQSxPQUFPLFdBQVcsT0FBbEI7QUFDQyxvQ0FBTyxVQUFVLEtBQUssV0FBdEIsRUFBbUMsTUFBSyxVQUF4QyxFQUFtRCxTQUFTLEtBQUssS0FBTCxDQUFXLE9BQXZFLEdBREQ7QUFFRSxVQUFLLEtBQUwsQ0FBVztBQUZiO0FBREQsSUFERDtBQVFBOzs7O0VBbkJxQyxNQUFNLFM7O2tCQUF4QixTOzs7Ozs7Ozs7OztBQ0NyQjs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7O0FBSEE7OztJQU1xQixhOzs7QUFDcEIsd0JBQVksS0FBWixFQUFrQjtBQUFBOztBQUFBLDRIQUNYLEtBRFc7O0FBRWpCLFFBQUssS0FBTCxHQUFXO0FBQ1YsV0FBTyxFQURHO0FBRVYsVUFBTSxFQUZJO0FBR1YsVUFBTSxLQUhJO0FBSVYsa0JBQWMsS0FKSjtBQUtWLGVBQVcsRUFMRDtBQU1WLHFCQUFpQixFQU5QO0FBT1YsY0FBVTtBQVBBLEdBQVg7QUFTQSxRQUFLLFdBQUwsR0FBaUIsTUFBSyxXQUFMLENBQWlCLElBQWpCLE9BQWpCO0FBQ0EsUUFBSyxZQUFMLEdBQWtCLE1BQUssWUFBTCxDQUFrQixJQUFsQixPQUFsQjtBQUNBLFFBQUssZ0JBQUwsR0FBc0IsTUFBSyxnQkFBTCxDQUFzQixJQUF0QixPQUF0QjtBQUNBLFFBQUssaUJBQUwsR0FBdUIsTUFBSyxpQkFBTCxDQUF1QixJQUF2QixPQUF2Qjs7QUFFQSxRQUFLLFdBQUwsR0FBaUIsTUFBSyxXQUFMLENBQWlCLElBQWpCLE9BQWpCO0FBQ0EsUUFBSyxnQkFBTCxHQUFzQixNQUFLLGdCQUFMLENBQXNCLElBQXRCLE9BQXRCO0FBQ0EsUUFBSyxzQkFBTCxHQUE0QixNQUFLLHNCQUFMLENBQTRCLElBQTVCLE9BQTVCO0FBQ0EsUUFBSyxtQkFBTCxHQUF5QixNQUFLLG1CQUFMLENBQXlCLElBQXpCLE9BQXpCO0FBQ0EsUUFBSyxZQUFMLEdBQWtCLE1BQUssWUFBTCxDQUFrQixJQUFsQixPQUFsQjs7QUFHQSxRQUFLLE9BQUwsR0FBYSxnQkFBYyxNQUFLLEtBQUwsQ0FBVyxTQUF0Qzs7QUFHQSxRQUFLLFNBQUwsR0FBaUIsSUFBSSxHQUFHLE9BQVAsQ0FBZSxFQUFDLGNBQWEsTUFBSyxLQUFMLENBQVcsU0FBekIsRUFBZixFQUFtRCxFQUFDLFNBQVEsT0FBVCxFQUFuRCxFQUFxRSxNQUFLLFlBQTFFLENBQWpCOztBQTFCaUI7QUE2QmpCOzs7OzhCQUNXLEMsRUFBRTtBQUNiLFFBQUssUUFBTCxDQUFjLEVBQUMsT0FBTSxTQUFQLEVBQWQ7QUFDQTs7OzRCQUNTLEssRUFBTTtBQUNaLFVBQVMsVUFBUSxLQUFLLEtBQUwsQ0FBVyxRQUFwQixHQUErQixzQkFBL0IsR0FBc0QsU0FBOUQ7QUFDRDs7OzhCQUNXLEssRUFBTSxPLEVBQVE7QUFDekIsT0FBSSxXQUFTLEtBQUssS0FBTCxDQUFXLEtBQXhCO0FBQ0EsUUFBSyxLQUFMLENBQVcsYUFBWCxDQUF5QixRQUF6QixFQUFrQyxLQUFsQyxFQUF3QyxPQUF4QztBQUNBOzs7K0JBQ1ksQyxFQUFFO0FBQ2QsUUFBSyxLQUFMLENBQVcsZUFBWCxDQUEyQixFQUFFLE1BQUYsQ0FBUyxLQUFwQyxFQUEwQyxLQUFLLEtBQUwsQ0FBVyxLQUFyRDtBQUVBO0FBQ0Q7Ozs7OzttQ0FHaUIsQyxFQUFFO0FBQ3BCLFFBQUssUUFBTCxDQUFjLEVBQUMsWUFBVyxFQUFFLE1BQUYsQ0FBUyxLQUFyQixFQUFkO0FBQ0U7OztzQ0FDaUIsQyxFQUFFO0FBQ3JCLFFBQUssUUFBTCxDQUFjLEVBQUMsZUFBYyxFQUFFLE1BQUYsQ0FBUyxLQUF4QixFQUFkO0FBQ0E7Ozt5Q0FDc0IsQyxFQUFFO0FBQ3hCLFFBQUssUUFBTCxDQUFjLEVBQUMsa0JBQWlCLEVBQUUsTUFBRixDQUFTLEtBQTNCLEVBQWQ7QUFDQTs7O3FDQUNtQjtBQUNqQixRQUFLLFFBQUwsQ0FBYyxFQUFDLE9BQU0sS0FBUCxFQUFkO0FBQ0YsUUFBSyxRQUFMLENBQWMsRUFBQyxlQUFjLEVBQWYsRUFBZDtBQUNBLFFBQUssUUFBTCxDQUFjLEVBQUMsa0JBQWlCLEVBQWxCLEVBQWQ7QUFDQSxRQUFLLFFBQUwsQ0FBYyxFQUFDLFlBQVcsRUFBWixFQUFkO0FBQ0UsS0FBRSxNQUFJLEtBQUssT0FBWCxFQUFvQixLQUFwQjtBQUNBOzs7b0NBQ2lCLEssRUFBTTtBQUN6QixRQUFLLFFBQUwsQ0FBYyxFQUFDLE9BQU0sS0FBUCxFQUFkO0FBQ0EsUUFBSyxRQUFMLENBQWMsRUFBQyxlQUFjLE1BQU0sUUFBckIsRUFBZDtBQUNBLFFBQUssUUFBTCxDQUFjLEVBQUMsa0JBQWlCLE1BQU0sS0FBeEIsRUFBZDtBQUNBLFFBQUssUUFBTCxDQUFjLEVBQUMsWUFBVyxNQUFNLEtBQWxCLEVBQWQ7QUFDQSxRQUFLLFFBQUwsQ0FBYyxFQUFDLFdBQVUsTUFBTSxJQUFqQixFQUFkO0FBQ0UsS0FBRSxNQUFJLEtBQUssT0FBWCxFQUFvQixLQUFwQjtBQUNBOzs7aUNBQ2E7QUFDZixXQUFRLEdBQVIsQ0FBWSxnQ0FBWjtBQUNBLFdBQVEsR0FBUixDQUFZLEtBQUssU0FBTCxDQUFlLEtBQTNCO0FBQ0EsUUFBSyxRQUFMLENBQWMsRUFBQyxRQUFPLEtBQUssU0FBTCxDQUFlLEtBQXZCLEVBQWQ7QUFDQTs7OzhCQUNhLEMsRUFBRTtBQUNiLEtBQUUsY0FBRjtBQUNGLFdBQVEsR0FBUixDQUFZLE1BQVo7QUFDQSxXQUFRLEdBQVIsQ0FBWSxLQUFLLEtBQUwsQ0FBVyxLQUF2QjtBQUNBLE9BQUksVUFBUTtBQUNYLFdBQU0sS0FBSyxLQUFMLENBQVcsVUFETjtBQUVYLFdBQU0sS0FBSyxLQUFMLENBQVcsZ0JBRk47QUFHWCxjQUFTLEtBQUssS0FBTCxDQUFXLGFBSFQ7QUFJWCxjQUFTLEtBQUssS0FBTCxDQUFXLFFBSlQ7QUFLWCxnQkFBVyxLQUFLLEtBQUwsQ0FBVztBQUxYLElBQVo7QUFPQSxPQUFHLEtBQUssS0FBTCxDQUFXLEtBQVgsSUFBa0IsS0FBckIsRUFBMkI7QUFDMUIsU0FBSyxTQUFMLENBQWUsTUFBZixDQUFzQixPQUF0QixFQUE4QixVQUFTLElBQVQsRUFBYztBQUMzQyxhQUFRLEdBQVIsQ0FBWSxNQUFaO0FBQ0EsUUFBRyxZQUFILENBQWdCLFdBQVUsS0FBSyxLQUFmLEdBQXNCLFdBQXRDO0FBQ0EsS0FIRDtBQUlBLElBTEQsTUFLSztBQUNKLFlBQVEsSUFBUixHQUFhLEtBQUssS0FBTCxDQUFXLFNBQXhCO0FBQ0EsU0FBSyxTQUFMLENBQWUsTUFBZixDQUFzQixPQUF0QixFQUE4QixVQUFTLElBQVQsRUFBYztBQUMzQyxhQUFRLEdBQVIsQ0FBWSxNQUFaO0FBQ0EsUUFBRyxZQUFILENBQWdCLFdBQVUsS0FBSyxLQUFmLEdBQXFCLFdBQXJDO0FBQ0EsS0FIRDtBQUlBO0FBQ0Q7QUFDQSxLQUFFLE1BQUksS0FBSyxPQUFYLEVBQW9CLEtBQXBCLENBQTBCLFFBQTFCO0FBQ0E7OzsyQkFHTztBQUNQLE9BQU0sUUFBTSxTQUFaO0FBQ0EsT0FBSSxZQUFVO0FBQ2IsZ0JBQVcsZUFERTtBQUViLGtCQUFhLGNBRkE7QUFHYixlQUFVLGVBSEc7QUFJYixlQUFVO0FBSkcsS0FLWixLQUFLLEtBQUwsQ0FBVyxNQUxDLENBQWQ7QUFNQSxlQUFZLFlBQVksa0JBQXhCO0FBQ0EsVUFDQztBQUFBO0FBQUEsTUFBSyxXQUFVLG1CQUFmO0FBQ0M7QUFBQTtBQUFBO0FBQ0MsVUFBSSxLQUFLLE9BRFY7QUFFQyxrQkFBVyxRQUZaO0FBR0MsYUFBTSxrQkFIUDtBQUlDLGNBQVEsS0FBSyxXQUpkO0FBTUU7QUFBQTtBQUFBO0FBQ0M7QUFBQTtBQUFBLFNBQUssV0FBVSxZQUFmO0FBQ0M7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUREO0FBRUM7QUFDQyxjQUFLLE1BRE47QUFFQyxtQkFBVSxjQUZYO0FBR0MscUJBQVksYUFIYjtBQUlDLGVBQU8sS0FBSyxLQUFMLENBQVcsVUFKbkI7QUFLQyxrQkFBVSxLQUFLO0FBTGhCO0FBRkQsT0FERDtBQVdDO0FBQUE7QUFBQSxTQUFLLFdBQVUsWUFBZjtBQUNDO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFERDtBQUVDO0FBQUE7QUFBQSxVQUFRLFdBQVUsY0FBbEIsRUFBaUMsT0FBTyxLQUFLLEtBQUwsQ0FBVyxhQUFuRCxFQUFrRSxVQUFVLEtBQUssbUJBQUwsQ0FBeUIsSUFBekIsQ0FBOEIsSUFBOUIsQ0FBNUU7QUFDQztBQUFBO0FBQUE7QUFBQTtBQUFBLFNBREQ7QUFFQztBQUFBO0FBQUE7QUFBQTtBQUFBLFNBRkQ7QUFHQztBQUFBO0FBQUE7QUFBQTtBQUFBLFNBSEQ7QUFJQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSkQ7QUFGRCxPQVhEO0FBb0JDO0FBQUE7QUFBQSxTQUFLLFdBQVUsWUFBZjtBQUNHO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFESDtBQUVHO0FBQ0MsbUJBQVUsY0FEWDtBQUVDLGNBQUssR0FGTjtBQUdDLHFCQUFZLGVBSGI7QUFJQyxlQUFPLEtBQUssS0FBTCxDQUFXLGdCQUpuQjtBQUtDLGtCQUFVLEtBQUs7QUFMaEI7QUFGSDtBQXBCRDtBQU5GLEtBREQ7QUF1Q0E7QUFBQTtBQUFBLE9BQUssSUFBRyxFQUFSLEVBQVcsV0FBVyxTQUF0QjtBQUNDO0FBQUE7QUFBQSxRQUFLLFdBQVUsZUFBZjtBQUNDO0FBQUE7QUFBQSxTQUFLLFdBQVUsS0FBZjtBQUNDO0FBQUE7QUFBQSxVQUFJLFdBQVUsdUJBQWQ7QUFDQztBQUFBO0FBQUEsV0FBRyxXQUFVLFlBQWIsRUFBMEIsTUFBTSxLQUFLLEtBQUwsQ0FBVyxjQUEzQztBQUE0RCxjQUFLLEtBQUwsQ0FBVztBQUF2RTtBQURELFFBREQ7QUFJQztBQUFBO0FBQUEsVUFBSyxXQUFVLCtDQUFmO0FBR0M7QUFDQyxpQkFBUSxLQUFLLEtBQUwsQ0FBVyxNQURwQjtBQUVDLDJCQUFrQixLQUFLLGdCQUZ4QjtBQUdDLDRCQUFtQixLQUFLLGlCQUh6QjtBQUlDLG9CQUFXLEtBQUssS0FBTCxDQUFXOztBQUp2QjtBQUhEO0FBSkQ7QUFERCxNQUREO0FBdUJDO0FBQUE7QUFBQSxRQUFLLFdBQVUsWUFBZjtBQUNDO0FBQUE7QUFBQSxTQUFPLFdBQVUsZUFBakI7QUFBQTtBQUFBLE9BREQ7QUFFQztBQUFBO0FBQUEsU0FBUSxXQUFVLHFCQUFsQixFQUF3QyxPQUFPLEtBQUssS0FBTCxDQUFXLE1BQTFELEVBQWtFLFVBQVUsS0FBSyxZQUFqRjtBQUNDO0FBQUE7QUFBQSxVQUFRLE9BQU0sU0FBZDtBQUFBO0FBQUEsUUFERDtBQUVDO0FBQUE7QUFBQSxVQUFRLE9BQU0sU0FBZDtBQUFBO0FBQUEsUUFGRDtBQUdDO0FBQUE7QUFBQSxVQUFRLE9BQU0sVUFBZDtBQUFBO0FBQUEsUUFIRDtBQUlDO0FBQUE7QUFBQSxVQUFRLE9BQU0sWUFBZDtBQUFBO0FBQUE7QUFKRCxPQUZEO0FBU0M7QUFBQTtBQUFBLFNBQUssV0FBVSxhQUFmO0FBRUUsWUFBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixHQUFqQixDQUFxQixVQUFTLElBQVQsRUFBZSxLQUFmLEVBQXFCO0FBQ3pDLFlBQUksVUFBUSxLQUFLLE1BQUwsR0FBWSxJQUFaLEdBQWlCLEtBQTdCO0FBQ0EsZUFBUSwyQ0FBVyxLQUFLLEtBQWhCLEVBQXVCLE9BQU8sS0FBOUIsRUFBcUMsT0FBTyxLQUFLLElBQWpELEVBQXVELFNBQVMsT0FBaEUsRUFBeUUsYUFBYSxLQUFLLFdBQTNGLEdBQVI7QUFDQSxRQUhvQixDQUduQixJQUhtQixDQUdkLElBSGMsQ0FBckI7QUFGRixPQVREO0FBa0JDO0FBQUE7QUFBQTtBQUNDO0FBQUE7QUFBQSxVQUFHLFdBQVUsRUFBYixFQUFnQixNQUFNLEtBQUssS0FBTCxDQUFXLEtBQWpDO0FBQUE7QUFBQTtBQUREO0FBbEJEO0FBdkJEO0FBdkNBLElBREQ7QUF3RkE7Ozs7RUExTXlDLE1BQU0sUzs7a0JBQTVCLGE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUHJCOztJQUdxQixLOzs7QUFDcEIsZ0JBQVksS0FBWixFQUFrQjtBQUFBOztBQUFBLDRHQUNYLEtBRFc7O0FBRWpCLFFBQUssTUFBTCxHQUFZLE1BQUssTUFBTCxDQUFZLElBQVosT0FBWjtBQUZpQjtBQUdqQjs7Ozt5QkFDTSxDLEVBQUU7QUFDUixLQUFFLGNBQUY7QUFDQSxRQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLENBQWxCO0FBQ0E7OzsyQkFDTztBQUNQLFVBQ0M7QUFBQTtBQUFBLE1BQUssV0FBVSxvQ0FBZixFQUFvRCxJQUFJLEtBQUssS0FBTCxDQUFXLEVBQW5FLEVBQXVFLFVBQVMsSUFBaEYsRUFBcUYsTUFBSyxRQUExRixFQUFtRyxtQkFBZ0IsbUJBQW5ILEVBQXVJLGVBQVksTUFBbko7QUFDQztBQUFBO0FBQUEsT0FBSyxXQUFVLGNBQWYsRUFBOEIsTUFBSyxVQUFuQztBQUNDO0FBQUE7QUFBQSxRQUFLLFdBQVUsZUFBZjtBQUNDO0FBQUE7QUFBQSxTQUFLLFdBQVUsY0FBZjtBQUNDO0FBQUE7QUFBQSxVQUFJLFdBQVUsYUFBZCxFQUE0QixJQUFHLG1CQUEvQjtBQUFvRCxhQUFLLEtBQUwsQ0FBVztBQUEvRCxRQUREO0FBRUM7QUFBQTtBQUFBLFVBQVEsTUFBSyxRQUFiLEVBQXNCLFNBQVEsTUFBOUIsRUFBcUMsV0FBVSxZQUEvQyxFQUE0RCxnQkFBYSxPQUF6RSxFQUFpRixjQUFXLE9BQTVGO0FBQ0E7QUFBQTtBQUFBLFdBQU0sZUFBWSxNQUFsQjtBQUFBO0FBQUE7QUFEQTtBQUZELE9BREQ7QUFPQztBQUFBO0FBQUE7QUFDQztBQUFBO0FBQUEsVUFBSyxXQUFVLFlBQWY7QUFDRyxhQUFLLEtBQUwsQ0FBVztBQURkLFFBREQ7QUFJQztBQUFBO0FBQUEsVUFBSyxXQUFVLGNBQWY7QUFDQztBQUFBO0FBQUEsV0FBUSxNQUFLLFFBQWIsRUFBc0IsV0FBVSxtQkFBaEMsRUFBb0QsZ0JBQWEsT0FBakU7QUFBQTtBQUFBLFNBREQ7QUFFQztBQUFBO0FBQUE7QUFDQyxnQkFBSyxRQUROO0FBRUMsbUJBQVMsS0FBSyxNQUZmO0FBR0MscUJBQVUsaUJBSFg7QUFJRyxjQUFLLEtBQUwsQ0FBVztBQUpkO0FBRkQ7QUFKRDtBQVBEO0FBREQ7QUFERCxJQUREO0FBNEJBOzs7O0VBdENpQyxNQUFNLFM7O2tCQUFwQixLOzs7Ozs7O0FDRnJCOzs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBRkE7OztBQUlBO0FBQ0EsSUFBTSxNQUFLLEVBQUUsTUFBRixFQUFVLENBQVYsQ0FBWDtBQUNBLElBQU0sYUFBWSxFQUFFLE9BQUYsRUFBVyxDQUFYLENBQWxCOztJQUVNLFE7OztBQUNMLG1CQUFZLEtBQVosRUFBa0I7QUFBQTs7QUFHakI7QUFIaUIsa0hBQ1gsS0FEVzs7QUFJakIsUUFBSyxXQUFMLEdBQWlCLE1BQUssV0FBTCxDQUFpQixJQUFqQixPQUFqQjtBQUNBLFFBQUssaUJBQUwsR0FBdUIsTUFBSyxpQkFBTCxDQUF1QixJQUF2QixPQUF2QjtBQUNBLFFBQUssZ0JBQUwsR0FBc0IsTUFBSyxnQkFBTCxDQUFzQixJQUF0QixPQUF0QjtBQUNBLFFBQUssYUFBTCxHQUFtQixNQUFLLGFBQUwsQ0FBbUIsSUFBbkIsT0FBbkI7QUFDQSxRQUFLLFdBQUwsR0FBaUIsTUFBSyxXQUFMLENBQWlCLElBQWpCLE9BQWpCO0FBQ0EsUUFBSyxXQUFMLEdBQWlCLE1BQUssV0FBTCxDQUFpQixJQUFqQixPQUFqQjs7QUFHQTtBQUNBLFFBQUssV0FBTCxHQUFpQixHQUFHLGVBQUgsRUFBakI7QUFDQSxRQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsRUFBckIsRUFBd0IsVUFBUyxLQUFULEVBQWU7QUFDdEMsT0FBRyxLQUFLLFdBQUwsQ0FBaUIsS0FBakIsQ0FBdUIsUUFBdkIsSUFBaUMsT0FBcEMsRUFBNEM7QUFDM0MsV0FBTyxRQUFQLEdBQWtCLFFBQWxCO0FBQ0EsSUFGRCxNQUVLO0FBQ0osTUFBRSxRQUFGLEVBQVksT0FBWixDQUFvQixZQUFwQjtBQUNBO0FBQ0E7QUFDRCxHQVB1QixDQU90QixJQVBzQixPQUF4QjtBQVFBLFFBQUssS0FBTCxHQUFXLEVBQUMsT0FBTSxNQUFLLFdBQUwsQ0FBaUIsS0FBeEIsRUFBWDtBQUNBLElBQUUsUUFBRixFQUFZLElBQVosQ0FBaUIsWUFBakIsRUFBOEIsTUFBSyxXQUFuQzs7QUFHQTtBQUNBLElBQUUsTUFBRixFQUFVLEVBQVYsQ0FBYSxZQUFiLEVBQTJCLFlBQVc7QUFDckMsUUFBSyxXQUFMO0FBQ0EsR0FGMEIsQ0FFekIsSUFGeUIsT0FBM0I7QUFHQSxNQUFJLFFBQVEsT0FBTyxRQUFQLENBQWdCLElBQWhCLENBQXFCLEtBQXJCLENBQTJCLENBQTNCLENBQVo7QUFDQSxNQUFHLENBQUMsS0FBSixFQUFXLFFBQVEsT0FBUjtBQUNYLFFBQUssS0FBTCxDQUFXLElBQVgsR0FBZ0IsS0FBaEI7QUFDQSxNQUFJLENBQUMsT0FBTyxRQUFQLENBQWdCLElBQXJCLEVBQTJCO0FBQzFCLFVBQU8sUUFBUCxDQUFnQixJQUFoQixHQUF1QixPQUF2QjtBQUNBO0FBQ0QsSUFBRSxNQUFGLEVBQVUsT0FBVixDQUFrQixZQUFsQjs7QUFwQ2lCO0FBc0NqQjs7OztzQ0FDa0IsQ0FFbEI7OztnQ0FDWTtBQUNaO0FBQ0EsUUFBSyxLQUFMLENBQVcsS0FBWCxHQUFpQixLQUFLLFdBQUwsQ0FBaUIsS0FBbEM7QUFDQSxRQUFLLFFBQUwsQ0FBYyxLQUFLLEtBQW5CO0FBRUE7OztnQ0FDWTtBQUNaLE9BQUksUUFBUSxPQUFPLFFBQVAsQ0FBZ0IsSUFBaEIsQ0FBcUIsS0FBckIsQ0FBMkIsQ0FBM0IsQ0FBWjtBQUNBLE9BQUksUUFBTTtBQUNULFVBQUssS0FBSyxXQUREO0FBRVQsZ0JBQVcsS0FBSyxpQkFGUDtBQUdULGVBQVUsS0FBSztBQUhOLEtBSVIsS0FKUSxHQUFWO0FBS0E7OztrQ0FDYyxDQUVkOzs7Z0NBQ1k7QUFDWixRQUFLLFFBQUwsQ0FBYyxFQUFDLE1BQUssTUFBTixFQUFkO0FBQ0E7OztzQ0FDa0I7O0FBRWxCLFFBQUssUUFBTCxDQUFjLEVBQUMsTUFBSyxZQUFOLEVBQWQ7QUFFQTs7O3FDQUNpQjtBQUNqQixRQUFLLFFBQUwsQ0FBYyxFQUFDLE1BQUssV0FBTixFQUFkO0FBRUE7QUFDRDs7OzsyQkFDUTtBQUNQLE9BQUksU0FBTyxFQUFYO0FBQ0EsT0FBSSxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLFFBQWpCLElBQTJCLE9BQTNCLElBQW9DLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsUUFBakIsSUFBMkIsZUFBbkUsRUFBbUY7QUFDbEYsYUFBUTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQVI7QUFDQSxJQUZELE1BR0ssSUFBRyxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLE1BQWpCLEtBQTBCLENBQTdCLEVBQStCO0FBQ25DLGFBQVE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFSO0FBQ0EsSUFGSSxNQUdEO0FBQ0gsYUFDQztBQUFBO0FBQUE7QUFDQztBQUFBO0FBQUEsUUFBSSxXQUFVLDRCQUFkO0FBQ0M7QUFBQTtBQUFBLFNBQUksU0FBUyxLQUFLLFdBQWxCLEVBQStCLE1BQUssY0FBcEMsRUFBbUQsV0FBVyxLQUFLLEtBQUwsQ0FBVyxJQUFYLElBQWlCLE1BQWpCLEdBQXdCLFFBQXhCLEdBQWlDLEVBQS9GO0FBQW1HO0FBQUE7QUFBQSxVQUFHLE1BQUssT0FBUjtBQUFBO0FBQUE7QUFBbkcsT0FERDtBQUVDO0FBQUE7QUFBQSxTQUFJLFNBQVMsS0FBSyxpQkFBbEIsRUFBcUMsTUFBSyxjQUExQyxFQUF5RCxXQUFXLEtBQUssS0FBTCxDQUFXLElBQVgsSUFBaUIsWUFBakIsR0FBOEIsUUFBOUIsR0FBdUMsRUFBM0c7QUFBK0c7QUFBQTtBQUFBLFVBQUcsTUFBSyxhQUFSO0FBQUE7QUFBQTtBQUEvRyxPQUZEO0FBR0M7QUFBQTtBQUFBLFNBQUksU0FBUyxLQUFLLGdCQUFsQixFQUFvQyxNQUFLLGNBQXpDLEVBQXdELFdBQVcsS0FBSyxLQUFMLENBQVcsSUFBWCxJQUFpQixXQUFqQixHQUE2QixRQUE3QixHQUFzQyxFQUF6RztBQUE2RztBQUFBO0FBQUEsVUFBRyxNQUFLLFlBQVI7QUFBQTtBQUFBO0FBQTdHO0FBSEQsTUFERDtBQU1DLG9DQU5EO0FBT0M7QUFBQTtBQUFBLFFBQUssV0FBVyxLQUFLLEtBQUwsQ0FBVyxJQUFYLElBQWlCLFdBQWpCLElBQWdDLEtBQUssS0FBTCxDQUFXLElBQVgsSUFBaUIsTUFBakQsR0FBd0QsRUFBeEQsR0FBMkQsUUFBM0U7QUFDQztBQUNDLGFBQU0sS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixLQUR4QjtBQUVDLGtCQUFXLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsWUFBakIsQ0FBOEIsU0FGMUM7QUFHQyxhQUFNLEtBQUssS0FBTCxDQUFXLElBSGxCO0FBSUMsYUFBTSxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCO0FBSnhCO0FBREQsTUFQRDtBQWVDO0FBQUE7QUFBQSxRQUFLLFdBQVcsS0FBSyxLQUFMLENBQVcsSUFBWCxJQUFpQixZQUFqQixHQUE4QixFQUE5QixHQUFpQyxRQUFqRDtBQUNDO0FBQ0MsYUFBTSxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLElBRHhCO0FBRUMsYUFBTSxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCO0FBQ3ZCO0FBQ0E7QUFKRDtBQUREO0FBZkQsS0FERDtBQTBCQTs7QUFFRCxVQUFPO0FBQUE7QUFBQTtBQUNMO0FBREssSUFBUDtBQUlBOzs7O0VBbEhxQixNQUFNLFM7O0FBcUg3QixDQUFDLFlBQVU7QUFDVixRQUFPLEtBQVAsQ0FBYSxZQUFVO0FBQ3RCLFdBQVMsTUFBVCxDQUNBLG9CQUFDLFFBQUQsT0FEQSxFQUVDLFVBRkQ7QUFHQSxFQUpEO0FBTUEsQ0FQRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmltcG9ydCBFbXBsb3llZVRpbWUgZnJvbSAnLi9lbXBsb3llZVRpbWUnO1xuaW1wb3J0IFRpbWVTaGVldCBmcm9tICcuL3RpbWVTaGVldCc7XG5pbXBvcnQgQ2xvY2tJbiBmcm9tICcuL2Nsb2NrSW4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXlzVGltZVNoZWV0cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnN0YXRlPXtpdGVtczpbXX07XG5cdFx0dGhpcy5zdGF0ZS50aW1lPScnO1xuXHRcdHRoaXMuYWRkPXt9O1xuXG5cdFx0LyogICAgIERvIHRoZSBiaW5kIHRoaW5nICAgICAgKi9cblxuXHRcdC8vVGltZSBlbXBsb3llZSBsaW5lIGl0ZW1cblx0XHR0aGlzLnRpbWVDaGFuZ2VkPXRoaXMudGltZUNoYW5nZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnVwZGF0ZVRpbWU9dGhpcy51cGRhdGVUaW1lLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5kZWxldGVFbXBsb3llZT10aGlzLmRlbGV0ZUVtcGxveWVlLmJpbmQodGhpcyk7XG5cblx0XHR0aGlzLnVwZGF0ZUZyb21TZXJ2ZXI9dGhpcy51cGRhdGVGcm9tU2VydmVyLmJpbmQodGhpcyk7XG5cdFx0dGhpcy50aW1lU2hlZXRXcmFwcGVyPXRoaXMudGltZVNoZWV0V3JhcHBlci5iaW5kKHRoaXMpO1xuXG5cdFx0dGhpcy5hZGRFbXBsb3llZT10aGlzLmFkZEVtcGxveWVlLmJpbmQodGhpcylcblx0XHR0aGlzLnVwZGF0ZUZyb21TZXJ2ZXJQYXJhbT10aGlzLnVwZGF0ZUZyb21TZXJ2ZXJQYXJhbS5iaW5kKHRoaXMpO1xuXG5cdFx0dGhpcy5jbG9ja0luPXRoaXMuY2xvY2tJbi5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY2xvY2tPdXQ9dGhpcy5jbG9ja091dC5iaW5kKHRoaXMpO1xuXHRcdC8qICAgIGVuZCBCaW5kIGRpbmcgZGluZyAgICAgICAgICovXG5cblx0XHR0aGlzLmF1dG9jb21wbGV0ZUFycj1bXTtcblx0XHR2YXIgYXJncz17fTtcblxuXHRcdC8vR3JhYiB0aGUgZW1wbG95ZWUgdGltZXNoZWV0IGRhdGFcblx0XHR0aGlzLm9ialRvb2w9cHMuaW5pdFRpbWVTaGVldHMoKVxuXHRcdHRoaXMub2JqVG9vbC5nZXQoe2RhdGU6cHJvcHMuZGF0ZX0sZnVuY3Rpb24oKXtcblx0XHRcdHRoaXMudXBkYXRlRnJvbVNlcnZlcigpO1xuXHRcdFx0dGhpcy5vYmpUb29sLnJlYWN0U2V0dXAodGhpcy51cGRhdGVGcm9tU2VydmVyKTtcblx0XHR9LmJpbmQodGhpcykpO1xuXG5cdFx0aWYgKHRoaXMub2JqVG9vbC5pdGVtcz09PXVuZGVmaW5lZCB8fHRoaXMub2JqVG9vbC5pdGVtcz09PSAwICl7XG5cdFx0fWVsc2V7dGhpcy5zdGF0ZS5pdGVtcz10aGlzLm9ialRvb2wuaXRlbXM7fVxuXG5cdFx0Ly9HcmFiIHRoZSBlbXBsb3llZSBsaXN0XG5cdFx0dmFyIHRvb2w9cHMuaW5pdEVtcGxveWVlTGlzdCgpO1xuXHRcdHRvb2wuZ2V0KHt9LGZ1bmN0aW9uKCl7XG5cdFx0XHRwcy5lbXBsb3llZV9sYWJsZXM9IHRvb2wuaXRlbXMubWFwKGZ1bmN0aW9uKG9iaikgeyBcblx0XHRcdFx0dmFyIHJPYmogPSB7fTtcblx0XHRcdFx0ck9iai5sYWJlbD1vYmouZnVsbF9uYW1lO1xuXHRcdFx0XHRyT2JqLnZhbHVlPW9iai5uYW1lO1xuXHRcdFx0XHRyZXR1cm4gck9iajtcblx0XHRcdH0pO1xuXHRcdFx0JChkb2N1bWVudCkudHJpZ2dlcihcImVtcGxveWVlTGFibGVzTG9hZGVkXCIpO1xuXHRcdH0pO1xuXG5cblx0XHRcblxuXHR9XG5cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBoZWxwZXIgRnVuY3Rpb25cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS1cblx0dXBkYXRlRnJvbVNlcnZlcigpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe2l0ZW1zOnRoaXMub2JqVG9vbC5pdGVtc30pO1xuXHR9XG5cdHVwZGF0ZUZyb21TZXJ2ZXJQYXJhbShkYXRhLGluZGV4KXtcblx0XHR0aGlzLm9ialRvb2wuaXRlbXNbaW5kZXhdPWRhdGE7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7aXRlbXM6dGhpcy5vYmpUb29sLml0ZW1zfSk7XG5cdH1cblx0Y3Jld3NUaW1lc2hlZXRJbmRleChjcmV3KXtcblx0XHRmb3IgKHZhciBpPTA7IGkgPCB0aGlzLm9ialRvb2wuaXRlbXMubGVuZ3RoOyBpKyspe1xuXHRcdFx0dmFyIGl0ZW09dGhpcy5vYmpUb29sLml0ZW1zW2ldO1xuXHRcdFx0aWYoaXRlbS5jcmV3PT1jcmV3KXtcblx0XHRcdFx0cmV0dXJuIGk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGdldEluZGV4VGltZXNoZWV0KHRpbWVzaGVldCl7XG5cdFx0cmV0dXJuIHRoaXMub2JqVG9vbC5nZXRfaW5kZXhfb2ZfaXRlbSh0aW1lc2hlZXQpO1xuXHR9XG5cdGdldEluZGV4RW1wbG95ZWUodGltZXNoZWV0SW5kZXgsZW1wbG95ZWVOYW1lKXtcblx0XHR2YXIgZW1wbG95ZWVzPXRoaXMub2JqVG9vbC5pdGVtc1t0aW1lc2hlZXRJbmRleF0uZW1wbG95ZWVzO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZW1wbG95ZWVzLmxlbmd0aDsgaSsrKXtcblx0XHRcdGlmIChlbXBsb3llZU5hbWU9PWVtcGxveWVlc1tpXS5lbXBsb3llZSl7XG5cdFx0XHRcdHJldHVybiBpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHR9XG5cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyAgICAgICBUaW1lc2hlZXQgV3JhcHBlciBGdW5jdGlvbnNcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cdFxuXG5cdGNsb2NrSW4odGltZSxjcmV3KXtcblxuXHRcdHZhciB0c19pbmRleD10aGlzLmNyZXdzVGltZXNoZWV0SW5kZXgoY3Jldyk7XG5cblx0XHR0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlcztcblx0XHRmb3IgKHZhciBpPTA7IGkgPCB0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHR0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlc1tpXS5zdGFydD10aW1lO1xuXHRcdH1cblx0XHR0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLnN0YXR1cz1cIkNsb2NrZWQgSW5cIjtcblx0XHR0aGlzLm9ialRvb2wudXBkYXRlKHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0pO1xuXHRcdHRoaXMuc2V0U3RhdGUoe2l0ZW1zOnRoaXMub2JqVG9vbC5pdGVtc30pO1xuXHR9XG5cdGNsb2NrT3V0KHRpbWUsY3Jldyl7XG5cblx0XHR2YXIgdHNfaW5kZXg9dGhpcy5jcmV3c1RpbWVzaGVldEluZGV4KGNyZXcpO1xuXG5cdFx0dGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXM7XG5cdFx0Zm9yICh2YXIgaT0wOyBpIDwgdGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXMubGVuZ3RoOyBpKyspe1xuXHRcdFx0dGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXNbaV0uZW5kPXRpbWU7XG5cdFx0fVxuXHRcdHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uc3RhdHVzPVwiQ2xvY2tlZCBPdXRcIjtcblx0XHR0aGlzLm9ialRvb2wudXBkYXRlKHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0pO1xuXHRcdHRoaXMuc2V0U3RhdGUoe2l0ZW1zOnRoaXMub2JqVG9vbC5pdGVtc30pO1xuXHR9XG5cdGFkZEVtcGxveWVlKHRzX25hbWUsIGVtcGxveWVlX25hbWUpe1xuXHRcdHZhciB0c19pbmRleCA9IHRoaXMuZ2V0SW5kZXhUaW1lc2hlZXQodHNfbmFtZSk7XG5cdFx0dmFyIGVtcGxveWVlSW5kZXggPSB0aGlzLmdldEluZGV4RW1wbG95ZWUodHNfaW5kZXgsZW1wbG95ZWVfbmFtZSk7XG5cblx0XHR2YXIgdXBkYXRlQ2FsbGJhY2s9ZnVuY3Rpb24oaW5kZXgpe1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKGRhdGEpe1x0XHRcdFxuXHRcdFx0XHR0aGlzLnVwZGF0ZUZyb21TZXJ2ZXJQYXJhbShkYXRhLGluZGV4KTtcblx0XHRcdH0uYmluZCh0aGlzKTtcblx0XHR9LmJpbmQodGhpcyk7XG5cblx0XHRmb3IgKHZhciBpPTA7IGkgPCB0aGlzLm9ialRvb2wuaXRlbXMubGVuZ3RoOyBpKyspe1xuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzLm9ialRvb2wuaXRlbXNbaV07XG5cdFx0XHRpZihpdGVtLm5hbWU9PXRzX25hbWUpe1xuXHRcdFx0XHRmb3IgKHZhciB4PTA7IHggPCBpdGVtLmVtcGxveWVlcy5sZW5ndGg7IHgrKyl7XG5cdFx0XHRcdFx0dmFyIGNvbnRhaW5lciA9IGl0ZW0uZW1wbG95ZWVzW3hdO1xuXHRcdFx0XHRcdGlmIChjb250YWluZXIuZW1wbG95ZWU9PWVtcGxveWVlX25hbWUpe1xuXHRcdFx0XHRcdFx0cmV0dXJuIFwiZHVwbGljYXRlXCI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMub2JqVG9vbC5pdGVtc1tpXS5lbXBsb3llZXMucHVzaCh7IGVtcGxveWVlIDogZW1wbG95ZWVfbmFtZSwgbmV3OicxJ30pO1xuXHRcdFx0XHR0aGlzLm9ialRvb2wudXBkYXRlKHRoaXMub2JqVG9vbC5pdGVtc1tpXSx1cGRhdGVDYWxsYmFjayhpKSwxKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR2YXIgZG9uZT0xO1xuXHRcdFx0XHRpZihpdGVtLmVtcGxveWVlcy5sZW5ndGg+MCl7XG5cdFx0XHRcdFx0Zm9yICh2YXIgeD0wOyB4IDwgaXRlbS5lbXBsb3llZXMubGVuZ3RoICYmIGRvbmU7IHgrKyl7XG5cdFx0XHRcdFx0XHR2YXIgY29udGFpbmVyID0gaXRlbS5lbXBsb3llZXNbeF07XG5cdFx0XHRcdFx0XHRpZiAoY29udGFpbmVyLmVtcGxveWVlPT1lbXBsb3llZV9uYW1lKXtcblx0XHRcdFx0XHRcdFx0dGhpcy5vYmpUb29sLml0ZW1zW2ldLmVtcGxveWVlcy5zcGxpY2UoeCwgMSk7XG5cdFx0XHRcdFx0XHRcdHRoaXMub2JqVG9vbC5jaGFuZ2VkKHRoaXMub2JqVG9vbC5pdGVtc1tpXSk7XG5cdFx0XHRcdFx0XHRcdGRvbmU9MDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0fTtcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gICAgICAgICAgIFRpbWVzaGVldCBXcmFwcGVyXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHRcblx0dGltZVNoZWV0V3JhcHBlcihpdGVtLGluZGV4KXtcblx0XHR2YXIgZW1wbG95ZWVfb3V0cHV0PVtdO1xuXHRcdGlmKGl0ZW0uZW1wbG95ZWVzPT09dW5kZWZpbmVkKXtcblxuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0dmFyIGVtcGxveWVlT3V0cHV0PWl0ZW0uZW1wbG95ZWVzLm1hcChmdW5jdGlvbihpdGVtX2VtcGxveWVlLGluZGV4X2VtcGxveWVlKXtcblx0XHRcdCBcdGVtcGxveWVlX291dHB1dC5wdXNoKHRoaXMuZW1wbG95ZWVMaW5lSXRlbShpdGVtX2VtcGxveWVlLGl0ZW0ubmFtZSxpbmRleF9lbXBsb3llZSkpO1xuXHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4oXG5cblx0XHRcdDxUaW1lU2hlZXRcblx0XHRcdFx0a2V5PXtpbmRleH0gXG5cdFx0XHRcdG5hbWU9e2l0ZW0ubmFtZX1cblx0XHRcdFx0ZGF0ZT17aXRlbS5kYXRlfVxuXHRcdFx0XHRjcmV3PXtpdGVtLmNyZXd9XG5cdFx0XHRcdGVtcGxveWVlcz17ZW1wbG95ZWVfb3V0cHV0fVxuXHRcdFx0XHRhZGRFbXBsb3llZT17dGhpcy5hZGRFbXBsb3llZX1cblx0XHRcdFx0b25VcGRhdGU9e3RoaXMudXBkYXRlfVxuXHRcdFx0Lz5cblxuXHRcdCk7XG5cdH1cblxuXG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gICAgICAgRW1wbG95ZWUgVGltZSBGb3JtIExpbmVpdGVtXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdGRlbGV0ZUVtcGxveWVlKGVtcGxveWVlLHRpbWVzaGVldCl7XG5cdFx0dmFyIHRzX2luZGV4ID0gdGhpcy5nZXRJbmRleFRpbWVzaGVldCh0aW1lc2hlZXQpO1xuXHRcdHZhciBkb25lPTE7XG5cdFx0dmFyIGl0ZW09dGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XTtcblx0XHRpZihpdGVtLmVtcGxveWVlcy5sZW5ndGg+MCl7XG5cdFx0XHRmb3IgKHZhciB4PTA7IHggPCBpdGVtLmVtcGxveWVlcy5sZW5ndGggJiYgZG9uZTsgeCsrKXtcblx0XHRcdFx0dmFyIGNvbnRhaW5lciA9IGl0ZW0uZW1wbG95ZWVzW3hdO1xuXHRcdFx0XHRpZiAoY29udGFpbmVyLmVtcGxveWVlPT1lbXBsb3llZSl7XG5cdFx0XHRcdFx0dGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXMuc3BsaWNlKHgsIDEpO1xuXHRcdFx0XHRcdC8vxpJjb25zb2xlLmxvZyh0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdKTtcblx0XHRcdFx0XHR0aGlzLm9ialRvb2wudXBkYXRlKHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0pO1xuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe2l0ZW1zOnRoaXMub2JqVG9vbC5pdGVtc30pO1xuXHRcdFx0XHRcdGRvbmU9MDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHRpbWVDaGFuZ2VkKHBvc2l0aW9uLGVtcGxveWVlLHRpbWVzaGVldCx2YWx1ZSl7XG5cdFx0dmFyIHRzX2luZGV4ID0gdGhpcy5nZXRJbmRleFRpbWVzaGVldCh0aW1lc2hlZXQpO1xuXHRcdHZhciBlbXBsb3llZUluZGV4ID0gdGhpcy5nZXRJbmRleEVtcGxveWVlKHRzX2luZGV4LGVtcGxveWVlKTtcblx0XHR0aGlzLnN0YXRcblx0XHRpZihwb3NpdGlvbj09J2VuZCcpe1xuXHRcdFx0dGhpcy5zdGF0ZS5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzW2VtcGxveWVlSW5kZXhdLmVuZD12YWx1ZTtcblx0XHR9XG5cdFx0ZWxzZXt0aGlzLnN0YXRlLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXNbZW1wbG95ZWVJbmRleF0uc3RhcnQ9dmFsdWV9XG5cdCAgICB0aGlzLnNldFN0YXRlKHtpdGVtczp0aGlzLnN0YXRlLml0ZW1zfSk7XG5cdH1cblx0dXBkYXRlVGltZShwb3NpdGlvbixlbXBsb3llZSx0aW1lc2hlZXQsdmFsdWUpe1xuXHRcdHZhciB0c19pbmRleCA9IHRoaXMuZ2V0SW5kZXhUaW1lc2hlZXQodGltZXNoZWV0KTtcblx0XHR2YXIgZW1wbG95ZWVJbmRleCA9IHRoaXMuZ2V0SW5kZXhFbXBsb3llZSh0c19pbmRleCxlbXBsb3llZSk7XG5cdFx0dmFyIHNhdmU9MDtcblx0XHR2YWx1ZT1wcy50aW1lX2FkZF9kaWdpdHModmFsdWUpXG5cdFx0aWYocG9zaXRpb249PSdlbmQnICYmIHBzLnRpbWVfYWRkX2Zyb250X3plcm8odGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXNbZW1wbG95ZWVJbmRleF0uZW5kKSAhPSBwcy50aW1lX2FkZF9kaWdpdHModmFsdWUpKXsgXG5cdFx0XHR0aGlzLm9ialRvb2wuaXRlbXNbdHNfaW5kZXhdLmVtcGxveWVlc1tlbXBsb3llZUluZGV4XS5lbmQ9cHMudGltZV9hZGRfZGlnaXRzKHZhbHVlKTtcblx0XHRcdHNhdmU9MTtcblx0XHR9XG5cdCAgICBpZihwb3NpdGlvbj09J3N0YXJ0JyAmJiBwcy50aW1lX2FkZF9mcm9udF96ZXJvKHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0uZW1wbG95ZWVzW2VtcGxveWVlSW5kZXhdLnN0YXJ0KSAhPSBwcy50aW1lX2FkZF9kaWdpdHModmFsdWUpKXtcblx0ICAgIFx0dGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXNbZW1wbG95ZWVJbmRleF0uc3RhcnQ9cHMudGltZV9hZGRfZGlnaXRzKHZhbHVlKTtcblx0ICAgIFx0c2F2ZT0xO1xuXHQgICAgfVxuXHQgICAgaWYoc2F2ZSl7XG5cdFx0ICAgIHRoaXMuc2V0U3RhdGUoe2l0ZW1zOnRoaXMub2JqVG9vbC5pdGVtc30pO1xuXHRcdCAgICB0aGlzLm9ialRvb2wudXBkYXRlKHRoaXMub2JqVG9vbC5pdGVtc1t0c19pbmRleF0sZnVuY3Rpb24oKXtcblx0XHQgICAgXHRwcy5zdWNjZXNzQWxlcnQodGhpcy5vYmpUb29sLml0ZW1zW3RzX2luZGV4XS5lbXBsb3llZXNbZW1wbG95ZWVJbmRleF0uZW1wbG95ZWVfbmFtZStcIiB0aW1lIHVwZGF0ZWQhXCIpO1xuXHRcdCAgICB9LmJpbmQodGhpcykpO1xuXHRcdH1cblx0fVxuXHRlbXBsb3llZUxpbmVJdGVtKGVtcGxveWVlX2NvbnRhaW5lcix0aW1lX3NoZWV0LGVtcGxveWVlX2luZGV4KXtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8RW1wbG95ZWVUaW1lXG5cdFx0XHRcdGtleT17ZW1wbG95ZWVfaW5kZXh9XG5cdFx0XHRcdHRpbWVzaGVldD17dGltZV9zaGVldH1cblx0XHRcdFx0ZW1wbG95ZWVfbmFtZT17ZW1wbG95ZWVfY29udGFpbmVyLmVtcGxveWVlX25hbWV9XG5cdFx0XHRcdGVtcGxveWVlPXtlbXBsb3llZV9jb250YWluZXIuZW1wbG95ZWV9XG5cdFx0XHRcdHN0YXJ0PXtwcy50aW1lX2FkZF9mcm9udF96ZXJvKGVtcGxveWVlX2NvbnRhaW5lci5zdGFydCl9XG5cdFx0XHRcdGVuZD17cHMudGltZV9hZGRfZnJvbnRfemVybyhlbXBsb3llZV9jb250YWluZXIuZW5kKX1cblx0XHRcdFx0dXBkYXRlVGltZT17dGhpcy51cGRhdGVUaW1lfVxuXHRcdFx0XHR0aW1lQ2hhbmdlZD17dGhpcy50aW1lQ2hhbmdlZH1cblx0XHRcdFx0ZGVsZXRlRW1wbG95ZWU9e3RoaXMuZGVsZXRlRW1wbG95ZWV9XG5cdFx0XHQvPlxuXHRcdCk7XG5cdH1cblxuXG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyAgICAgICAgUmVuZGVyXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0cmVuZGVyKCl7XG5cdFx0Ly9oYW5kZWwgZW1wdHkgcmV0dXJuXG5cdFx0aWYgKHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoPT09MHx8dGhpcy5zdGF0ZS5pdGVtcz09PXVuZGVmaW5lZCl7XG5cdFx0XHRyZXR1cm4gKDxkaXY+Tm8gVGltZSBTaGVldHMsIHN0YXJ0IGJ5IDxhIGhyZWY9XCIvZGVza1wiPmNyZWF0aW5nIHNvbWUgY3Jld3MhPC9hPjwvZGl2Pik7XG5cdFx0fVxuXHRcdHZhciBvdXRwdXQ9W11cblx0XHR0aGlzLnN0YXRlLml0ZW1zLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCl7XG5cdFx0XHRpZihpdGVtLmNyZXc9PXRoaXMucHJvcHMuY3Jldyl7XG5cdFx0XHRcdG91dHB1dC51bnNoaWZ0KHRoaXMudGltZVNoZWV0V3JhcHBlcihpdGVtLGluZGV4KSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0b3V0cHV0LnB1c2godGhpcy50aW1lU2hlZXRXcmFwcGVyKGl0ZW0saW5kZXgpKTtcblx0XHRcdH1cblx0XHR9LmJpbmQodGhpcykpO1xuXG5cdFx0dmFyIHRzX2luZGV4PXRoaXMuY3Jld3NUaW1lc2hlZXRJbmRleCh0aGlzLnByb3BzLmNyZXcpO1xuXHRcdHZhciBzdGF0dXM9Jyc7XG5cdFx0aWYgKHRzX2luZGV4PT11bmRlZmluZWQpe3ZhciBzdGF0dXM9ZmFsc2U7fVxuXHRcdGVsc2V7c3RhdHVzID10aGlzLnN0YXRlLml0ZW1zW3RzX2luZGV4XS5zdGF0dXN9XG5cdFx0XG5cblx0XHQvL01BSU4gUkVOREVSXG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e3RoaXMucHJvcHMucGFnZT09J21haW4nPycnOidoaWRkZW4nfT5cblx0XHRcdFx0XHQ8Q2xvY2tJblxuXHRcdFx0XHRcdFx0Y2xvY2tJbj17dGhpcy5jbG9ja0lufVxuXHRcdFx0XHRcdFx0Y2xvY2tPdXQ9e3RoaXMuY2xvY2tPdXR9XG5cdFx0XHRcdFx0XHRzdGF0dXM9e3N0YXR1c31cblx0XHRcdFx0XHRcdGZ1bGxfbmFtZT17dGhpcy5wcm9wcy5mdWxsX25hbWV9XG5cdFx0XHRcdFx0XHRkYXRlPXt0aGlzLnByb3BzLmRhdGV9XG5cdFx0XHRcdFx0XHRjcmV3PXt0aGlzLnByb3BzLmNyZXd9XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPXt0aGlzLnByb3BzLnBhZ2U9PSd0aW1lc2hlZXQnPycnOidoaWRkZW4nfT5cblx0XHRcdFx0XHQ8YnIvPlxuXHRcdFx0XHRcdHtvdXRwdXR9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cblx0XHQpO1xuXG5cdH07XHRcbn1cblxuXG5cblxuXG4iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsb2NrSW4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy50b2dnbGVUaW1lSW5wdXQ9dGhpcy50b2dnbGVUaW1lSW5wdXQuYmluZCh0aGlzKTtcblx0XHR0aGlzLmNsb2NrSW49dGhpcy5jbG9ja0luLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jbG9ja091dD10aGlzLmNsb2NrT3V0LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5vbkNoYW5nZT10aGlzLm9uQ2hhbmdlLmJpbmQodGhpcyk7XG5cblx0XHR0aGlzLnN0YXRlPXtcblx0XHRcdGRhdGU6bmV3IERhdGUoKSxcblx0XHRcdHNwZWNpZnlUaW1lOmZhbHNlXG5cdFx0fTtcblxuXHR9XG5cdGNsb2NrSW4oZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGlmKHRoaXMuc3RhdGUuc3BlY2lmeVRpbWU9PWZhbHNlKXtcblx0XHRcdHZhciB0aW1lPXRoaXMuc3RhdGUuZGF0ZS50b0xvY2FsZVRpbWVTdHJpbmcoW10sIHtob3VyOiAnMi1kaWdpdCcsIG1pbnV0ZTonMi1kaWdpdCcsaG91cjEyOiBmYWxzZX0pXG5cdFx0XHQvL2NvbnNvbGUubG9nKHRpbWUpO1xuXHRcdFx0cHMuc3VjY2Vzc0FsZXJ0KFwiQ2xvY2tlZCBpbiBhdCBcIiArIHRoaXMuc3RhdGUuZGF0ZS50b0xvY2FsZVRpbWVTdHJpbmcoW10sIHtob3VyOiAnMi1kaWdpdCcsIG1pbnV0ZTonMi1kaWdpdCd9KSlcblx0XHRcdHRoaXMucHJvcHMuY2xvY2tJbih0aW1lLCB0aGlzLnByb3BzLmNyZXcpXG5cdFx0fWVsc2V7XG5cdFx0XHQvL2NvbnNvbGUubG9nKHRoaXMuc3RhdGUudGltZSlcblx0XHRcdGlmKHRoaXMuc3RhdGUudGltZSE9dW5kZWZpbmVkKXtcblx0XHRcdFx0dGhpcy5wcm9wcy5jbG9ja0luKHRoaXMuc3RhdGUudGltZSwgdGhpcy5wcm9wcy5jcmV3KTtcblx0XHRcdFx0cHMuc3VjY2Vzc0FsZXJ0KFwiQ2xvY2tlZCBpblwiKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHQvL2ludmFsaWQgdGltZSBlcnJvclxuXHRcdFx0XHRwcy5mYWlsQWxlcnQoXCJJbnZhbGlkIHRpbWUuXCIpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGNsb2NrT3V0KGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRpZih0aGlzLnN0YXRlLnNwZWNpZnlUaW1lPT1mYWxzZSl7XG5cdFx0XHR2YXIgdGltZT10aGlzLnN0YXRlLmRhdGUudG9Mb2NhbGVUaW1lU3RyaW5nKFtdLCB7aG91cjogJzItZGlnaXQnLCBtaW51dGU6JzItZGlnaXQnLGhvdXIxMjogZmFsc2V9KVxuXHRcdFx0Ly9jb25zb2xlLmxvZyh0aW1lKTtcblx0XHRcdHBzLnN1Y2Nlc3NBbGVydChcIkNsb2NrZWQgb3V0IGF0IFwiICsgdGhpcy5zdGF0ZS5kYXRlLnRvTG9jYWxlVGltZVN0cmluZyhbXSwge2hvdXI6ICcyLWRpZ2l0JywgbWludXRlOicyLWRpZ2l0J30pK1wiIEhhdmUgYSBncmVhdCBuaWdodCFcIilcblx0XHRcdHRoaXMucHJvcHMuY2xvY2tPdXQodGltZSwgdGhpcy5wcm9wcy5jcmV3KVxuXHRcdH1lbHNle1xuXHRcdFx0Ly9jb25zb2xlLmxvZyh0aGlzLnN0YXRlLnRpbWUpXG5cdFx0XHRpZih0aGlzLnN0YXRlLnRpbWUhPXVuZGVmaW5lZCl7XG5cdFx0XHRcdHRoaXMucHJvcHMuY2xvY2tPdXQodGhpcy5zdGF0ZS50aW1lLCB0aGlzLnByb3BzLmNyZXcpO1xuXHRcdFx0XHRwcy5zdWNjZXNzQWxlcnQoXCJDbG9ja2VkIE91dCEgIEhhdmUgYSBncmVhdCBuaWdodCFcIik7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Ly9pbnZhbGlkIHRpbWUgZXJyb3Jcblx0XHRcdFx0cHMuZmFpbEFsZXJ0KFwiSW52YWxpZCB0aW1lLlwiKVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHR0b2dnbGVUaW1lSW5wdXQoZSl7XG5cdFx0Ly9jb25zb2xlLmxvZyh0aGlzLnN0YXRlLnNwZWNpZnlUaW1lKTtcblx0XHRpZih0aGlzLnN0YXRlLnNwZWNpZnlUaW1lKXtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3NwZWNpZnlUaW1lOmZhbHNlfSk7XG5cdFx0fVxuXHRcdGVsc2V7dGhpcy5zZXRTdGF0ZSh7c3BlY2lmeVRpbWU6dHJ1ZX0pO31cblx0fVxuXHRvbkNoYW5nZShlKXtcblx0XHR0aGlzLnNldFN0YXRlKHt0aW1lOmUudGFyZ2V0LnZhbHVlfSk7XG5cdH1cblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0dGhpcy50aW1lcklEID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy50aWNrKCksMTAwMDApO1xuXHR9XG5cblx0Y29tcG9uZW50V2lsbFVubW91bnQoKSB7XG5cdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVySUQpO1xuXHR9XG5cblx0dGljaygpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGRhdGU6IG5ldyBEYXRlKClcblx0XHR9KTtcblx0fVxuXHRyZW5kZXIoKXtcblxuXHRcblx0XHR2YXIgdmFsdWVzPXtcblx0XHRcdCdDcmVhdGVkJzpbdGhpcy5jbG9ja0luLCdDbG9jayBJbicsJ2J0biBidG4tbGcgYnRuLXN1Y2Nlc3MgYnRuLWJsb2NrJ10sXG5cdFx0XHQnQ2xvY2tlZCBJbic6W3RoaXMuY2xvY2tPdXQsICdDbG9jayBPdXQnLCAnYnRuIGJ0bi1sZyBidG4tc3VjY2VzcyBidG4tYmxvY2snIF0sXG5cdFx0XHQnQ2xvY2tlZCBPdXQnOlt0aGlzLmNsb2NrT3V0LCAnQ2hhbmdlIENsb2Nrb3V0IFRpbWUnLCdidG4gYnRuLWxnIGJ0bi1zdWNjZXNzIGJ0bi1ibG9jayddLFxuXHRcdFx0J1N1Ym1pbnRlZCc6WycnLCdBbHJlYWR5IFN1Ym1pbnRlZCcsJ2J0biBidG4tbGcgYnRuLXN1Y2Nlc3MgYnRuLWJsb2NrJ10sXG5cdFx0XHQnQXByb3ZlZCc6WycnLCdBbHJlYWR5IFN1Ym1pbnRlZCcsJ2J0biBidG4tbGcgYnRuLXN1Y2Nlc3MgYnRuLWJsb2NrJ11cblx0XHR9W3RoaXMucHJvcHMuc3RhdHVzXTtcblx0XHR2YXIgb3V0cHV0PScnO1xuXHRcdGlmICh2YWx1ZXM9PXVuZGVmaW5lZCl7XG5cdFx0XHRvdXRwdXQ9KDxhIGhyZWY9XCIjdGltZXNoZWV0XCI+WW91IGFyZSBub3QgaW4gYSBUaW1lIFNoZWV0IGFkZCB5b3Vyc2VsZi48L2E+KTtcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdHZhciBpbnB1dEZpZWxkID0gKCA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT17dmFsdWVzWzJdfSBvbkNsaWNrPXt2YWx1ZXNbMF19IHZhbHVlPXt2YWx1ZXNbMV19IC8+KTtcblx0XHRcdG91dHB1dD0oXG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuXHRcdFx0XHRcdFdlbGNvbWUgPHNwYW4gY2xhc3NOYW1lPVwidXNlcm5hbWVcIj57dGhpcy5wcm9wcy5mdWxsX25hbWV9PC9zcGFuPlxuXHRcdFx0XHQ8L2gzPlxuXHRcdFx0XHQ8aDMgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57dGhpcy5zdGF0ZS5kYXRlLnRvTG9jYWxlVGltZVN0cmluZyhbXSwge2hvdXI6ICcyLWRpZ2l0JywgbWludXRlOicyLWRpZ2l0J30pfSBvbiB7dGhpcy5zdGF0ZS5kYXRlLnRvRGF0ZVN0cmluZygpfSA8L2gzPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nY2xvY2tJbic+XG5cdFx0XHRcdFx0PGZvcm0gY2xhc3NOYW1lPVwiZm9ybS1jaGVja2luXCIgcm9sZT1cImZvcm1cIj5cblx0XHRcdFx0XHRcdHtpbnB1dEZpZWxkfVxuXHRcdFx0XHRcdFx0PGJyLz5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd0ZXh0LWNlbnRlcic+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgXG5cdFx0XHRcdFx0XHRcdFx0XHR0eXBlPVwidGltZVwiIFxuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXt0aGlzLnN0YXRlLnNwZWNpZnlUaW1lID8gJ2Zvcm0tY29udHJvbCBzbWFsbC10aW1lJzonaGlkZGVuJ30gXG5cdFx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cblx0XHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGJyLz5cblx0XHRcdFx0XHRcdFx0PGEgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCIgb25DbGljaz17dGhpcy50b2dnbGVUaW1lSW5wdXR9Pnt0aGlzLnN0YXRlLnNwZWNpZnlUaW1lPycgLSBVc2UgQ3VycmVudCBUaW1lJzonICsgU3BlY2lmeSBhIFRpbWUnfTwvYT5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZm9ybT5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0e291dHB1dH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0iLCJcbi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF5c1RpbWVTaGVldHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0Ly9CaW5kaW5nIGRpbmdcblx0XHR0aGlzLmNoYW5nZWRTdGFydD10aGlzLmNoYW5nZWRTdGFydC5iaW5kKHRoaXMpXG5cdFx0dGhpcy5jaGFuZ2VkRW5kPXRoaXMuY2hhbmdlZEVuZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMudXBkYXRlU3RhcnQ9dGhpcy51cGRhdGVTdGFydC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMudXBkYXRlRW5kPXRoaXMudXBkYXRlRW5kLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5kZWxldGU9dGhpcy5kZWxldGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmtleVByZXNzZWRTdGFydD10aGlzLmtleVByZXNzZWRTdGFydC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMua2V5UHJlc3NlZEVuZD10aGlzLmtleVByZXNzZWRFbmQuYmluZCh0aGlzKTtcblx0fVxuXHRjaGFuZ2VkU3RhcnQoZSl7XG5cdFx0dGhpcy5wcm9wcy50aW1lQ2hhbmdlZCAgKCdzdGFydCcsdGhpcy5wcm9wcy5lbXBsb3llZSx0aGlzLnByb3BzLnRpbWVzaGVldCxlLnRhcmdldC52YWx1ZSk7XG5cdH1cblx0Y2hhbmdlZEVuZChlKXtcblx0XHR0aGlzLnByb3BzLnRpbWVDaGFuZ2VkKCdlbmQnLHRoaXMucHJvcHMuZW1wbG95ZWUsdGhpcy5wcm9wcy50aW1lc2hlZXQsZS50YXJnZXQudmFsdWUpO1xuXHR9XG5cdHVwZGF0ZVN0YXJ0KGUpe1xuXHRcdGlmKGUudGFyZ2V0LnZhbHVlIT0nJyl7XG5cdFx0XHR0aGlzLnByb3BzLnVwZGF0ZVRpbWUoJ3N0YXJ0Jyx0aGlzLnByb3BzLmVtcGxveWVlLHRoaXMucHJvcHMudGltZXNoZWV0LCBlLnRhcmdldC52YWx1ZSk7XG5cdFx0fVxuXHR9XG5cdHVwZGF0ZUVuZChlKXtcblx0XHRpZihlLnRhcmdldC52YWx1ZSE9Jycpe1xuXHRcdFx0dGhpcy5wcm9wcy51cGRhdGVUaW1lKCdlbmQnLHRoaXMucHJvcHMuZW1wbG95ZWUsdGhpcy5wcm9wcy50aW1lc2hlZXQsIGUudGFyZ2V0LnZhbHVlKTtcblx0XHR9XG5cdH1cblx0ZGVsZXRlKGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR0aGlzLnByb3BzLmRlbGV0ZUVtcGxveWVlKHRoaXMucHJvcHMuZW1wbG95ZWUsdGhpcy5wcm9wcy50aW1lc2hlZXQpO1xuXHR9XG5cdGtleVByZXNzZWRTdGFydChlKSB7XG5cdCAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcblx0ICAgIFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHQgICAgXHRpZih0aGlzLnByb3BzLnN0YXJ0IT0nJyl7XG5cdFx0XHRcdHRoaXMucHJvcHMudXBkYXRlVGltZSgnc3RhcnQnLHRoaXMucHJvcHMuZW1wbG95ZWUsdGhpcy5wcm9wcy50aW1lc2hlZXQsIHRoaXMucHJvcHMuc3RhcnQpO1xuXHRcdFx0fVxuXHQgICAgfVxuXHQgfVxuXHRrZXlQcmVzc2VkRW5kKGUpIHtcblx0ICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xuXHQgICAgXHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdCAgICBcdGlmKHRoaXMucHJvcHMuZW5kIT0nJyl7XG5cdFx0XHRcdHRoaXMucHJvcHMudXBkYXRlVGltZSgnc3RhcnQnLHRoaXMucHJvcHMuZW1wbG95ZWUsdGhpcy5wcm9wcy50aW1lc2hlZXQsIHRoaXMucHJvcHMuZW5kKTtcblx0XHRcdH1cblx0ICAgIH1cblx0IH1cblx0cmVuZGVyKCl7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGxpIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaXRlbVwiID5cblx0XHRcdFx0PGZvcm0gIGNsYXNzTmFtZT1cImZvcm0taW5saW5lIHJvdyBkYXlfdGltZV9mb3JtX3Jvd1wiPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsIGNvbC1tZC0zIGNvbC1zbS0zIGNvbC14cy0xMiB0ZXh0LWNlbnRlciBkYXlfdGltZV9mb3JtX3Jvd19lbGVtZW50XCI+PHN0cm9uZz57IHRoaXMucHJvcHMuZW1wbG95ZWVfbmFtZX08L3N0cm9uZz48L2xhYmVsPlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtMyBjb2wtc20tMyBjb2wteHMtMTIgZGF5X3RpbWVfZm9ybV9yb3dfZWxlbWVudFwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cFwiPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwLWFkZG9uXCI+U3RhcnQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGlucHV0IFxuXHRcdFx0XHRcdFx0XHRcdHR5cGU9XCJ0aW1lXCIgXG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIHN0YXJ0XCIgXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU9e3RoaXMucHJvcHMuc3RhcnR9XG5cdFx0XHRcdFx0XHRcdFx0b25CbHVyPXt0aGlzLnVwZGF0ZVN0YXJ0fVxuXHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmNoYW5nZWRTdGFydH1cblx0XHRcdFx0XHRcdFx0XHRvbktleVByZXNzPXt0aGlzLmtleVByZXNzZWRTdGFydH1cblxuXHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtMyBjb2wtc20tMyBjb2wteHMtMTIgZGF5X3RpbWVfZm9ybV9yb3dfZWxlbWVudFwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cFwiPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwLWFkZG9uXCI+RW5kPC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxpbnB1dCBcblx0XHRcdFx0XHRcdFx0XHR0eXBlPVwidGltZVwiIFxuXHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCBlbmRcIiBcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17dGhpcy5wcm9wcy5lbmR9XG5cdFx0XHRcdFx0XHRcdFx0b25CbHVyPXt0aGlzLnVwZGF0ZUVuZH1cblx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5jaGFuZ2VkRW5kfVxuXHRcdFx0XHRcdFx0XHRcdG9uS2V5UHJlc3M9e3RoaXMua2V5UHJlc3NlZEVuZH1cblx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtMyBjb2wtc20tMyBjb2wteHMtMTIgdGV4dC1jZW50ZXIgZGF5X3RpbWVfZm9ybV9yb3dfZWxlbWVudFwiPlxuXHRcdFx0XHRcdFx0PGJ1dHRvbiBcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiZGVsZXRlIGJ0biBidG4tZGFuZ2VyXCJcblx0XHRcdFx0XHRcdFx0b25DbGljaz17dGhpcy5kZWxldGV9XG5cdFx0XHRcdFx0XHQ+RGVsZXRlPC9idXR0b24+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZm9ybT5cblx0XHRcdDwvbGk+XG5cdFx0KTtcblx0fVxufSIsIi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaW1lU2hlZXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0LyogICAgIERvIHRoZSBiaW5kIHRoaW5nICAgICAgKi9cblx0XHR0aGlzLmF1dG9jb21wbGV0ZT10aGlzLmF1dG9jb21wbGV0ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuYWRkQ2hhbmdlZD10aGlzLmFkZENoYW5nZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLmFkZENsaWNrZWQ9dGhpcy5hZGRDbGlja2VkLmJpbmQodGhpcyk7XG5cdH1cblxuXHRhdXRvY29tcGxldGUoaW5wdXQpe1xuXHRcdHZhciBjb25maWcgPSB7XG5cdFx0XHRtaW5DaGFyczogMCxcblx0XHRcdG1heEl0ZW1zOiA5OSxcblx0XHRcdGF1dG9GaXJzdDogdHJ1ZSxcblx0XHRcdGZpbHRlcjogZnVuY3Rpb24oaXRlbSwgaW5wdXQpIHtcblx0XHRcdFx0dmFyIHZhbHVlID0gaXRlbS52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRpZih2YWx1ZS5pbmRleE9mKCdpc19hY3Rpb24nKSAhPT0gLTEgfHxcblx0XHRcdFx0XHR2YWx1ZS5pbmRleE9mKGlucHV0KSAhPT0gLTEpIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGl0ZW06IGZ1bmN0aW9uKGl0ZW0sIGlucHV0KSB7XG5cdFx0XHRcdHZhciBkID0gaXRlbTtcblx0XHRcdFx0dmFyIGh0bWwgPSBcIjxzcGFuPlwiICsgX18oaXRlbS5sYWJlbCB8fCBpdGVtLnZhbHVlKSArIFwiPC9zcGFuPlwiO1xuXHRcdFx0XHRyZXR1cm4gJCgnPGxpPjwvbGk+Jylcblx0XHRcdFx0XHQuZGF0YSgnaXRlbS5hdXRvY29tcGxldGUnLCBpdGVtKVxuXHRcdFx0XHRcdC5odG1sKCc8YT48cD4nICsgaHRtbCArICc8L3A+PC9hPicpXG5cdFx0XHRcdFx0LmdldCgwKTtcblx0XHRcdH1cblx0XHR9O1xuXHRcdHZhciBhdyA9IG5ldyBBd2Vzb21wbGV0ZShpbnB1dCxjb25maWcpO1xuXHRcdGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXG5cdFx0XHQnYXdlc29tcGxldGUtc2VsZWN0Y29tcGxldGUnLFxuXHRcdFx0XHR0aGlzLmFkZENoYW5nZWRcblx0XHQpO1xuXHRcdGF3Lmxpc3Q9cHMuZW1wbG95ZWVfbGFibGVzXG5cdFx0JChkb2N1bWVudCkuYmluZCgnZW1wbG95ZWVMYWJsZXNMb2FkZWQnLGZ1bmN0aW9uKCl7XG5cdFx0XHRhdy5saXN0PXBzLmVtcGxveWVlX2xhYmxlcztcblx0XHR9KTtcblx0fVxuXHRhZGRDaGFuZ2VkKGUpe1xuXHRcdHRoaXMuYWRkPWUudGFyZ2V0LnZhbHVlO1xuXHR9O1xuXHRhZGRDbGlja2VkKGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR2YXIgd29fbmFtZT10aGlzLnByb3BzLm5hbWU7XG5cdFx0dmFyIGVtcGxveWVlX25hbWU9dGhpcy5hZGQ7XG5cdFx0Ly9DYWxsIGJhY2sgZm9yIGJpbmRpbmc/XG5cdFx0dmFyIHVwZGF0ZUNhbGxiYWNrPWZ1bmN0aW9uKGluZGV4KXtcblx0XHRcdHJldHVybiBmdW5jdGlvbihkYXRhKXtcdFx0XHRcblx0XHRcdFx0dGhpcy51cGRhdGVGcm9tU2VydmVyUGFyYW0oZGF0YSxpbmRleCk7XG5cdFx0XHR9LmJpbmQodGhpcyk7XG5cdFx0fS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMucHJvcHMuYWRkRW1wbG95ZWUod29fbmFtZSwgZW1wbG95ZWVfbmFtZSk7XG5cdH07XG5cdHJlbmRlcigpe1xuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFuZWwgcGFuZWwtZGVmYXVsdCByb3dcIj5cblxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWhlYWRpbmdcIj5cblx0XHRcdFx0XHQ8aDQgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj4gVGltZSBTaGVldCB7dGhpcy5wcm9wcy5kYXRlfSBmb3Ige3RoaXMucHJvcHMuY3Jld30gPC9oND5cblx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0PHVsIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXBcIiA+XG5cdFx0XHRcdFx0PGRpdiBpZD0nZm9ybXMnPlxuXHRcdFx0XHRcdFx0e3RoaXMucHJvcHMuZW1wbG95ZWVzfVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L3VsPlxuXHRcdFx0ICBcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYW5lbC1mb290ZXIgY29sLW1kLTEyIHRleHQtbGVmdCBsaXN0LWdyb3VwLWl0ZW1cIj5cblx0XHRcdFx0XHQ8Zm9ybSBjbGFzc05hbWU9XCJmb3JtLWlubGluZSByb3cgXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIGNvbC1tZC0zIGNvbC1zbS0yIGNvbC14cy0xMiB1cGRhdGVfZGl2X2VsZW1lbnRcIj5cblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1zdWNjZXNzXCI+VXBkYXRlPC9idXR0b24+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidGV4dC1yaWdodCBjb2wtbWQtNiBjb2wtc20tNiBjb2wteHMtNCBcIj5cblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiBcblx0XHRcdFx0XHRcdFx0XHR0eXBlPVwic3VibWl0XCIgXG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCJcblx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLmFkZENsaWNrZWR9XG5cdFx0XHRcdFx0XHRcdFx0PisgQWRkPC9idXR0b24+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCB0ZXh0LWxlZnQgY29sLW1kLTMgY29sLXNtLTQgY29sLXhzLTYgXCI+PGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cFwiPlxuXHRcdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIiBcblx0XHRcdFx0XHRcdFx0XHRyZWY9e3RoaXMuYXV0b2NvbXBsZXRlfVxuICAgICAgICAgIFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLmFkZENoYW5nZWR9IFxuICAgICAgICAgIFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cIm5ld19lbXBsb3llZXMgZm9ybS1jb250cm9sIGF3ZXNvbXBsZXRlXCIgXG4gICAgICAgICAgXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9XCJlbXBsb3llZVwiIC8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj48L2Rpdj5cblx0XHRcdFx0XHQ8L2Zvcm0+XG5cdFx0XHRcdFx0XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG4iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmltcG9ydCBXb3Jrb3JkZXJUYXNrIGZyb20gJy4vd29ya29yZGVyVGFzayc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF5c1dvcmtvcmRlcnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dmFyIGFyZ3M9e307XG5cdFx0YXJncy5jcmV3PXRoaXMucHJvcHMuY3Jldztcblx0XHRhcmdzLmRhdGU9dGhpcy5wcm9wcy5kYXRlO1xuXG5cdFx0LyogICBEbyB0aGUgYmluZCB0aGluZyAgKi9cblx0XHR0aGlzLm9uVGFza0NoZWNrZWQ9dGhpcy5vblRhc2tDaGVja2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5vblN0YXR1c0NoYW5nZWQ9dGhpcy5vblN0YXR1c0NoYW5nZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnVwZGF0ZUZyb21TZXJ2ZXI9dGhpcy51cGRhdGVGcm9tU2VydmVyLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5zb2NrZXRVcGRhdGU9dGhpcy5zb2NrZXRVcGRhdGUuYmluZCh0aGlzKTtcblx0XHQvL3RoaXMud29ya29yZGVyT2JqPXRoaXMub25TdGF0dXNDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0LyogICAgICAgICAgZW5kICAgICAgICAgICovXG5cblx0XHR0aGlzLnN0YXRlPXt3b3Jrb3JkZXJzOltdfTtcblx0XHR0aGlzLndvcmtvcmRlclRvb2w9cHMuaW5pdFdvcmtvcmRlcigpO1xuXHRcdHRoaXMud29ya29yZGVyVG9vbC5nZXQoYXJncyxmdW5jdGlvbigpe1xuXHRcdFx0dGhpcy51cGRhdGVGcm9tU2VydmVyKCk7XG5cdFx0XHR0aGlzLndvcmtvcmRlclRvb2wucmVhY3RTZXR1cCh0aGlzLnVwZGF0ZUZyb21TZXJ2ZXIpO1xuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0aWYgKHRoaXMud29ya29yZGVyVG9vbC5pdGVtcz09PXVuZGVmaW5lZCB8fHRoaXMud29ya29yZGVyVG9vbC5pdGVtcz09PSAwICl7XG5cblx0XHR9ZWxzZXt0aGlzLnN0YXRlLndvcmtvcmRlcnM9dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zO31cblx0fVxuXHRzb2NrZXRVcGRhdGUoKXtcblxuXHR9XG5cdG9uVGFza0NoZWNrZWQod29faW5kZXgsaW5kZXgsY2hlY2spe1xuXHRcdHRoaXMud29ya29yZGVyVG9vbC5pdGVtc1t3b19pbmRleF0uc3VidGFza1tpbmRleF0uc3RhdHVzPWNoZWNrPzA6MTtcblx0XHR0aGlzLnNldFN0YXRlKHt3b3Jrb3JkZXJzOnRoaXMud29ya29yZGVyVG9vbC5pdGVtc30pO1xuXHRcdHRoaXMud29ya29yZGVyVG9vbC51cGRhdGUodGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zW3dvX2luZGV4XSk7XG5cdFx0dmFyIGNoZWNrZWRUZXh0PWNoZWNrP1widW5jaGVja2VkLlwiOlwiY2hlY2tlZC5cIlxuXHRcdC8vcHMuc3VjY2Vzc0FsZXJ0KHRoaXMud29ya29yZGVyVG9vbC5pdGVtc1t3b19pbmRleF0uc3VidGFza1tpbmRleF0udGFzayArXCIgXCIrIGNoZWNrZWRUZXh0ICk7XG5cdH1cblx0b25TdGF0dXNDaGFuZ2VkKHN0YXR1cywgaW5kZXgpe1xuXHRcdHRoaXMud29ya29yZGVyVG9vbC5pdGVtc1tpbmRleF0uc3RhdHVzPXN0YXR1cztcblx0XHR0aGlzLnNldFN0YXRlKHt3b3Jrb3JkZXJzOnRoaXMud29ya29yZGVyVG9vbC5pdGVtc30pO1xuXHRcdHRoaXMud29ya29yZGVyVG9vbC51cGRhdGUodGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zW2luZGV4XSk7XG5cdFx0aWYoc3RhdHVzPT1cIkNvbXBsZXRlXCIpe1xuXHRcdFx0cHMuc3VjY2Vzc0FsZXJ0KFwiV29ya29yZGVyIGNvbXBsZXRlZCFcIik7XG5cdFx0fVxuXHR9XG5cdHVwZGF0ZUZyb21TZXJ2ZXIoKXtcblx0XHR0aGlzLnNldFN0YXRlKHt3b3Jrb3JkZXJzOnRoaXMud29ya29yZGVyVG9vbC5pdGVtc30pO1xuXHR9XG5cdHdvcmtvcmRlck9iaihpdGVtLGluZGV4KXtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8V29ya29yZGVyVGFzayBcblx0XHRcdFx0a2V5PXtpbmRleH0gXG5cdFx0XHRcdGluZGV4PXtpbmRleH0gXG5cdFx0XHRcdGxvY2F0aW9uX3JvdXRlPXtpdGVtLmxvY2F0aW9uX3JvdXRlfVxuXHRcdFx0XHRsb2NhdGlvbj17aXRlbS5sb2NhdGlvbn1cblx0XHRcdFx0dGFza3M9e2l0ZW0uc3VidGFza31cblx0XHRcdFx0c3RhdHVzPXtpdGVtLnN0YXR1c31cblx0XHRcdFx0d29ya29yZGVyPXtpdGVtLm5hbWV9XG5cdFx0XHRcdG9uVGFza0NoZWNrZWQ9e3RoaXMub25UYXNrQ2hlY2tlZH1cblx0XHRcdFx0b25TdGF0dXNDaGFuZ2VkPXt0aGlzLm9uU3RhdHVzQ2hhbmdlZH1cblx0XHRcdFx0cm91dGU9e2l0ZW0ucm91dGV9XG5cdFx0XHQvPlxuXHRcdCk7XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vICAgICAgICBSZW5kZXJcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRyZW5kZXIoKXtcblx0XHRpZiAodGhpcy5zdGF0ZS53b3Jrb3JkZXJzPT09MHx8dGhpcy5zdGF0ZS53b3Jrb3JkZXJzPT09dW5kZWZpbmVkKXtcblx0XHRcdHJldHVybiAoPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPjxoMz5ObyBXb3Jrb3JkZXJzPC9oMz48L2Rpdj4pO1xuXHRcdH1cblx0XHR2YXIgdG9kbz1bXTtcblx0XHR2YXIgY29tcGxldGU9W107XG5cdFx0dGhpcy5zdGF0ZS53b3Jrb3JkZXJzLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCl7XG5cdFx0XHRpZiAoaXRlbS5zdGF0dXMhPSdDb21wbGV0ZScmJml0ZW0uc3RhdHVzIT0nSW5jb21wbGV0ZScpe1xuXHRcdFx0XHR0b2RvLnB1c2godGhpcy53b3Jrb3JkZXJPYmooaXRlbSxpbmRleCkpO1xuXHRcdFx0XHRpZih0b2RvLmxlbmd0aCUzPT09MCl7dG9kby5wdXNoKDxkaXYgY2xhc3NOYW1lPSdjbGVhcmZpeCc+PC9kaXY+KX1cblx0XHRcdH1lbHNle1xuXHRcdFx0XHRjb21wbGV0ZS5wdXNoKHRoaXMud29ya29yZGVyT2JqKGl0ZW0saW5kZXgpKTtcblx0XHRcdFx0aWYoY29tcGxldGUubGVuZ3RoJTM9PT0wKXtjb21wbGV0ZS5wdXNoKDxkaXYgY2xhc3NOYW1lPSdjbGVhcmZpeCc+PC9kaXY+KX1cblx0XHRcdH1cblx0XHR9LmJpbmQodGhpcykpO1xuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwid29ya29yZGVyX2NvbnRhaW5lclwiPlxuXHRcdFx0XHQ8ZGl2Pjxici8+XG5cdFx0XHRcdFx0e3RvZG99XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNsZWFyZml4XCI+PC9kaXY+XG5cdFx0XHRcdDxkaXY+PGgzPkNvbXBsZXRlIFdvcmtvcmRlcnM8L2gzPlxuXHRcdFx0XHRcdHtjb21wbGV0ZX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXG5cdH07XHRcbn1cbiIsIi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyZWF0ZUlzc3VlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpXG5cdFx0dGhpcy5tb2RhbE5ld0lzc3VlPXRoaXMubW9kYWxOZXdJc3N1ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMubW9kYWxFZGl0SXNzdWU9dGhpcy5tb2RhbEVkaXRJc3N1ZS5iaW5kKHRoaXMpO1xuXHR9XG5cdHRvb2xUaXAoKXtcblx0XHQkKGZ1bmN0aW9uICgpIHtcblx0XHQgXHQkKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJykudG9vbHRpcCgpO1xuXHRcdH0pXG5cdH1cblx0bW9kYWxOZXdJc3N1ZShlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5wcm9wcy5hY3RpdmF0ZU1vZGFsTmV3KCk7XG5cdH1cblx0bW9kYWxFZGl0SXNzdWUoaXRlbSxlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0Y29uc29sZS5sb2coaXRlbSlcblx0XHR0aGlzLnByb3BzLmFjdGl2YXRlTW9kYWxFZGl0KGl0ZW0pO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdFx0XHRcdC8vIFx0XHRkYXRhLXRvZ2dsZT1cIm1vZGFsXCIgXG5cdFx0XHRcdFx0Ly8gZGF0YS10YXJnZXQ9e1wiI1wiK3RoaXMucG9wVXBJZH1cblx0XHRcdFx0IC8vIFx0YXJpYS1sYWJlbD1cIkNyZWF0ZSBJc3N1ZVwiIFxuXHRcdFx0XHQgLy8gXHRkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIiBcblx0XHRcdFx0IC8vIFx0ZGF0YS1wbGFjZW1lbnQ9XCJ0b3BcIiBcblx0XHRcdFx0IC8vIFx0dGl0bGU9XCJJc3N1ZVwiIFxuXHRcdFx0XHRcdC8vIHJlZj17dGhpcy50b29sVGlwfVx0XHRcdFx0XHQvLyBvbkNsaWNrPXsgdGhpcy5wb3BVcH0gPlxuXHRcdHZhciBkcm9wZG93bkl0ZW1zPVtdO1xuXHRcdGlmKHRoaXMucHJvcHMuaXNzdWVzIT09bnVsbCl7XG5cdFx0XHR0aGlzLnByb3BzLmlzc3Vlcy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXHRcdFx0XHRpZiAoaXRlbS5zdGF0dXMgPT0nU3VibWl0dGVkJyB8fCBpdGVtLnN0YXR1cz09J0Fzc2lnbmVkJyl7XG5cdFx0XHRcdFx0ZHJvcGRvd25JdGVtcy5wdXNoKFxuXHRcdFx0XHRcdFx0PGxpIGtleT17aW5kZXh9PiBcblx0XHRcdFx0XHRcdFx0PGEgY2xhc3NOYW1lPVwiZHJvcGRvd24taXRlbVwiIFxuXHRcdFx0XHRcdFx0XHRcdGhyZWY9XCIjXCIgXG5cdFx0XHRcdFx0XHRcdFx0b25DbGljaz17dGhpcy5tb2RhbEVkaXRJc3N1ZS5iaW5kKHRoaXMsaXRlbSl9IFxuXHRcdFx0XHRcdFx0XHQ+e2l0ZW0udGl0bGV9PC9hPlxuXHRcdFx0XHRcdFx0PC9saT4pO1xuXHRcdFx0XHR9XG5cdFx0XHR9LmJpbmQodGhpcykpO1xuXHRcdH1cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInRleHQtcmlnaHRcIj5cblxuXHRcdFx0XHQ8YnV0dG9uXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi14cyBkcm9wZG93bi10b2dnbGUgY3JlYXRlLWlzc3VlXCIgXG5cdFx0XHRcdFx0dHlwZT1cImJ1dHRvblwiIFxuXHRcdFx0XHRcdGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBcblx0XHRcdFx0XHRhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIFxuXHRcdFx0XHRcdGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiID5cblxuXHRcdFx0XHQgXHQ8c3BhbiBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLWV4Y2xhbWF0aW9uLXNpZ25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XG5cdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHQ8dWwgY2xhc3NOYW1lPVwiZHJvcGRvd24tbWVudVwiPlxuXHRcdFx0XHQgICAgPGxpIGNsYXNzTmFtZT1cImRyb3Bkb3duLWhlYWRlclwiPklzc3VlczwvbGk+XG5cdFx0XHRcdCAgICB7ZHJvcGRvd25JdGVtc31cblx0XHRcdFx0ICAgIDxsaSByb2xlPVwic2VwYXJhdG9yXCIgY2xhc3NOYW1lPVwiZGl2aWRlclwiPjwvbGk+XG5cdFx0XHRcdCAgICA8bGk+PGEgXG5cdFx0XHRcdCAgICBcdGNsYXNzTmFtZT1cImRyb3Bkb3duLWl0ZW1cIlxuXHRcdFx0XHQgICAgXHRvbkNsaWNrPXt0aGlzLm1vZGFsTmV3SXNzdWV9XG5cdFx0XHRcdCAgICBcdGhyZWY9XCIjXCIgPiArIE5ldyBJc3N1ZTwvYT48L2xpPlxuXHRcdFx0XHQ8L3VsPlxuXG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cblxuIiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrQ2hlY2sgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0Y29uc29sZS5sb2codGhpcy5wcm9wcy5jaGVja2VkKTtcblx0XHR0aGlzLnRhc2tDaGVja2VkID0gdGhpcy50YXNrQ2hlY2tlZC5iaW5kKHRoaXMpO1xuXHR9XG5cdHRhc2tDaGVja2VkKGUpe1xuXHRcdHRoaXMucHJvcHMudGFza0NoZWNrZWQodGhpcy5wcm9wcy5pbmRleCwgdGhpcy5wcm9wcy5jaGVja2VkKTtcblx0fVxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCBjaGVja2VkID0gdGhpcy5wcm9wcy5jaGVja2VkID8gXCJsaW5lLXRocm91Z2hcIiA6IFwiXCI7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPXtjaGVja2VkfT5cblx0XHRcdFx0XHQ8aW5wdXQgb25DaGFuZ2U9e3RoaXMudGFza0NoZWNrZWR9IHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9e3RoaXMucHJvcHMuY2hlY2tlZH0gLz5cblx0XHRcdFx0XHR7dGhpcy5wcm9wcy5sYWJsZX1cblx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cdFxufSIsIlxuLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5pbXBvcnQgVGFza0NoZWNrIGZyb20gJy4vdGFza0NoZWNrJ1xuaW1wb3J0IENyZWF0ZUlzc3VlIGZyb20gJy4vY3JlYXRlSXNzdWUnXG5pbXBvcnQgTW9kYWwgZnJvbSAnLi4vdXRpbHMvbW9kYWwnXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29ya29yZGVyVGFzayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnN0YXRlPXtcblx0XHRcdGlzc3VlczpbXSxcblx0XHRcdHRpdGxlOicnLFxuXHRcdFx0bW9kYWw6J25ldycsXG5cdFx0XHRtb2RhbFByaW9yaXR5Oidsb3cnLFxuXHRcdFx0bW9kYWxUaXRsZTonJyxcblx0XHRcdG1vZGFsRGVzY3JpcHRpb246JycsXG5cdFx0XHRtb2RhbE5hbWU6Jydcblx0XHR9O1xuXHRcdHRoaXMudGFza0NoZWNrZWQ9dGhpcy50YXNrQ2hlY2tlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuc3RhdHVzQ2hhbmdlPXRoaXMuc3RhdHVzQ2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5hY3RpdmF0ZU1vZGFsTmV3PXRoaXMuYWN0aXZhdGVNb2RhbE5ldy5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuYWN0aXZhdGVNb2RhbEVkaXQ9dGhpcy5hY3RpdmF0ZU1vZGFsRWRpdC5iaW5kKHRoaXMpO1xuXHRcdFxuXHRcdHRoaXMuc3VibWl0SXNzdWU9dGhpcy5zdWJtaXRJc3N1ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMubW9kYWxUaXRsZUNoYW5nZT10aGlzLm1vZGFsVGl0bGVDaGFuZ2UuYmluZCh0aGlzKTtcblx0XHR0aGlzLm1vZGFsRGVzY3JpcHRpb25DaGFuZ2U9dGhpcy5tb2RhbERlc2NyaXB0aW9uQ2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5tb2RhbFByaW9yaXR5Q2hhbmdlPXRoaXMubW9kYWxQcmlvcml0eUNoYW5nZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuaXNzdWVDaGFuZ2VkPXRoaXMuaXNzdWVDaGFuZ2VkLmJpbmQodGhpcyk7XG5cblxuXHRcdHRoaXMubW9kYWxJZD1cImlzc3VlLWZvcm0tXCIrdGhpcy5wcm9wcy53b3Jrb3JkZXI7XG5cblx0XHRcblx0XHR0aGlzLmlzc3VlVG9vbCA9IG5ldyBwcy5hcGlUb29sKHtcIndvcmtfb3JkZXJcIjp0aGlzLnByb3BzLndvcmtvcmRlcn0se2RvY3R5cGU6J0lzc3VlJ30sdGhpcy5pc3N1ZUNoYW5nZWQpO1xuXG5cblx0fVxuXHR0YXNrQ2hlY2tlZChlKXtcblx0XHR0aGlzLnNldFN0YXRlKHt0aXRsZTpcIkNIRUNLRURcIn0pO1xuXHR9XG5cdGlzQ2hlY2tlZCh2YWx1ZSl7XG4gICAgXHRyZXR1cm4gKCh2YWx1ZT09PXRoaXMuc3RhdGUuc2VsZWN0ZWQpID8nY2hlY2tlZCBsaW5lLXRocm91Z2gnOidkZWZhdWx0Jyk7XG4gIFx0fVxuICBcdHRhc2tDaGVja2VkKGluZGV4LGNoZWNrZWQpe1xuICBcdFx0dmFyIHdvX2luZGV4PXRoaXMucHJvcHMuaW5kZXg7XG4gIFx0XHR0aGlzLnByb3BzLm9uVGFza0NoZWNrZWQod29faW5kZXgsaW5kZXgsY2hlY2tlZCk7XG4gIFx0fVxuICBcdHN0YXR1c0NoYW5nZShlKXtcbiAgXHRcdHRoaXMucHJvcHMub25TdGF0dXNDaGFuZ2VkKGUudGFyZ2V0LnZhbHVlLHRoaXMucHJvcHMuaW5kZXgpO1xuXG4gIFx0fVxuICBcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0XHRcdElTU1VFIEZVTkNUSU9OU1xuICBcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgXHRtb2RhbFRpdGxlQ2hhbmdlKGUpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe21vZGFsVGl0bGU6ZS50YXJnZXQudmFsdWV9KTtcbiAgXHR9XG5cdG1vZGFsUHJpb3JpdHlDaGFuZ2UoZSl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7bW9kYWxQcmlvcml0eTplLnRhcmdldC52YWx1ZX0pO1xuXHR9XG5cdG1vZGFsRGVzY3JpcHRpb25DaGFuZ2UoZSl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7bW9kYWxEZXNjcmlwdGlvbjplLnRhcmdldC52YWx1ZX0pO1xuXHR9XG4gIFx0YWN0aXZhdGVNb2RhbE5ldygpe1xuICBcdFx0dGhpcy5zZXRTdGF0ZSh7bW9kYWw6XCJuZXdcIn0pO1xuXHRcdHRoaXMuc2V0U3RhdGUoe21vZGFsUHJpb3JpdHk6Jyd9KTtcblx0XHR0aGlzLnNldFN0YXRlKHttb2RhbERlc2NyaXB0aW9uOicnfSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7bW9kYWxUaXRsZTonJ30pO1xuICBcdFx0JCgnIycrdGhpcy5tb2RhbElkKS5tb2RhbCgpO1xuICBcdH1cbiAgXHRhY3RpdmF0ZU1vZGFsRWRpdChpc3N1ZSl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7bW9kYWw6aXNzdWV9KTtcblx0XHR0aGlzLnNldFN0YXRlKHttb2RhbFByaW9yaXR5Omlzc3VlLnByaW9yaXR5fSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7bW9kYWxEZXNjcmlwdGlvbjppc3N1ZS5pc3N1ZX0pO1xuXHRcdHRoaXMuc2V0U3RhdGUoe21vZGFsVGl0bGU6aXNzdWUudGl0bGV9KTtcblx0XHR0aGlzLnNldFN0YXRlKHttb2RhbE5hbWU6aXNzdWUubmFtZX0pO1xuICBcdFx0JCgnIycrdGhpcy5tb2RhbElkKS5tb2RhbCgpO1xuICBcdH1cbiAgXHRpc3N1ZUNoYW5nZWQoKXtcblx0XHRjb25zb2xlLmxvZyhcImlzc3VlIHRvb2wgYWxlcnQgLS0tLS0tLS0tLS0gIFwiKTtcblx0XHRjb25zb2xlLmxvZyh0aGlzLmlzc3VlVG9vbC5pdGVtcyk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7aXNzdWVzOnRoaXMuaXNzdWVUb29sLml0ZW1zfSk7XG5cdH1cbiAgXHRzdWJtaXRJc3N1ZShlKXtcbiAgXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRjb25zb2xlLmxvZyhcInNhdmVcIik7XG5cdFx0Y29uc29sZS5sb2codGhpcy5zdGF0ZS5tb2RhbCk7XG5cdFx0dmFyIG5ld0l0ZW09e1xuXHRcdFx0dGl0bGU6dGhpcy5zdGF0ZS5tb2RhbFRpdGxlLFxuXHRcdFx0aXNzdWU6dGhpcy5zdGF0ZS5tb2RhbERlc2NyaXB0aW9uLFxuXHRcdFx0cHJpb3JpdHk6dGhpcy5zdGF0ZS5tb2RhbFByaW9yaXR5LFxuXHRcdFx0dmluZXlhcmQ6dGhpcy5wcm9wcy5sb2NhdGlvbixcblx0XHRcdHdvcmtfb3JkZXI6dGhpcy5wcm9wcy53b3Jrb3JkZXJcblx0XHR9XG5cdFx0aWYodGhpcy5zdGF0ZS5tb2RhbD09XCJuZXdcIil7XG5cdFx0XHR0aGlzLmlzc3VlVG9vbC5jcmVhdGUobmV3SXRlbSxmdW5jdGlvbihpdGVtKXtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJNRU9XXCIpO1xuXHRcdFx0XHRwcy5zdWNjZXNzQWxlcnQoXCJJc3N1ZSBcIiAraXRlbS50aXRsZSsgXCIgY3JlYXRlZC5cIilcblx0XHRcdH0pO1xuXHRcdH1lbHNle1xuXHRcdFx0bmV3SXRlbS5uYW1lPXRoaXMuc3RhdGUubW9kYWxOYW1lO1xuXHRcdFx0dGhpcy5pc3N1ZVRvb2wudXBkYXRlKG5ld0l0ZW0sZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiTUVPV1wiKTtcblx0XHRcdFx0cHMuc3VjY2Vzc0FsZXJ0KFwiSXNzdWUgXCIgK2l0ZW0udGl0bGUrXCIgdXBkYXRlZC5cIilcblx0XHRcdH0pO1xuXHRcdH1cblx0XHQvL2Nsb3NlIG1vZGFsXG5cdFx0JCgnIycrdGhpcy5tb2RhbElkKS5tb2RhbCgndG9nZ2xlJyk7XG5cdH1cblxuXG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHRpdGxlPVwid2VsY29tZVwiO1xuXHRcdHZhciBtYWluQ2xhc3M9e1xuXHRcdFx0J0NvbXBsZXRlJzoncGFuZWwtc3VjY2VzcycsXG5cdFx0XHQnSW5jb21wbGV0ZSc6J3BhbmVsLWRhbmdlcicsXG5cdFx0XHQnUGVuZGluZyc6J3BhbmVsLWRlZmF1bHQnLFxuXHRcdFx0J1N0YXJ0ZWQnOidwYW5lbC13YXJuaW5nJ1xuXHRcdH1bdGhpcy5wcm9wcy5zdGF0dXNdO1xuXHRcdG1haW5DbGFzcyA9IG1haW5DbGFzcyArIFwiIHBhbmVsIHdvcmtvcmRlclwiO1xuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPSdjb2wtbWQtNCBjb2wtc20tNCc+XG5cdFx0XHRcdDxNb2RhbCBcblx0XHRcdFx0XHRpZD17dGhpcy5tb2RhbElkfSBcblx0XHRcdFx0XHRzdWJtaXRUZXh0PVwiU3VibWl0XCIgXG5cdFx0XHRcdFx0dGl0bGU9XCJDcmVhdGUgSXNzdWUgRm9yXCJcblx0XHRcdFx0XHRzdWJtaXQ9e3RoaXMuc3VibWl0SXNzdWV9PlxuXG5cdFx0XHRcdFx0XHQ8ZmllbGRzZXQ+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuXHRcdFx0XHRcdFx0XHRcdDxsYWJlbD5Jc3N1ZSBUaXRsZTwvbGFiZWw+XG5cdFx0XHRcdFx0XHRcdFx0PGlucHV0IFxuXHRcdFx0XHRcdFx0XHRcdFx0dHlwZT1cInRleHRcIiBcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIFxuXHRcdFx0XHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9XCJJc3N1ZSBUaXRsZVwiIFxuXHRcdFx0XHRcdFx0XHRcdFx0dmFsdWU9e3RoaXMuc3RhdGUubW9kYWxUaXRsZX0gXG5cdFx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5tb2RhbFRpdGxlQ2hhbmdlfVxuXHRcdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHRcdFx0XHRcdFx0XHQ8bGFiZWw+UHJpb3JpdHk8L2xhYmVsPlxuXHRcdFx0XHRcdFx0XHRcdDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdmFsdWU9e3RoaXMuc3RhdGUubW9kYWxQcmlvcml0eX0gb25DaGFuZ2U9e3RoaXMubW9kYWxQcmlvcml0eUNoYW5nZS5iaW5kKHRoaXMpfT5cblx0XHRcdFx0XHRcdFx0XHRcdDxvcHRpb24+TG93PC9vcHRpb24+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8b3B0aW9uPk1lZGl1bTwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0XHRcdFx0PG9wdGlvbj5IaWdoPC9vcHRpb24+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8b3B0aW9uPkNyaXRpY2FsPC9vcHRpb24+XG5cdFx0XHRcdFx0XHRcdFx0PC9zZWxlY3Q+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblx0XHRcdFx0XHRcdFx0ICBcdDxsYWJlbD5Jc3N1ZSBEZXRhaWxzOjwvbGFiZWw+XG5cdFx0XHRcdFx0XHRcdCAgXHQ8dGV4dGFyZWEgXG5cdFx0XHRcdFx0XHRcdCAgXHRcdGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIFxuXHRcdFx0XHRcdFx0XHQgIFx0XHRyb3dzPVwiM1wiIFxuXHRcdFx0XHRcdFx0XHQgIFx0XHRwbGFjZWhvbGRlcj1cIklzc3VlIERldGFpbHNcIiBcblx0XHRcdFx0XHRcdFx0ICBcdFx0dmFsdWU9e3RoaXMuc3RhdGUubW9kYWxEZXNjcmlwdGlvbn1cblx0XHRcdFx0XHRcdFx0ICBcdFx0b25DaGFuZ2U9e3RoaXMubW9kYWxEZXNjcmlwdGlvbkNoYW5nZX1cblx0XHRcdFx0XHRcdFx0ICBcdD48L3RleHRhcmVhPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDwvZmllbGRzZXQ+XG5cdFx0XHRcdDwvTW9kYWw+XG5cdFx0XHQ8ZGl2IGlkPVwiXCIgY2xhc3NOYW1lPXttYWluQ2xhc3N9PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWhlYWRpbmdcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuXHRcdFx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInBhbmVsLXRpdGxlIGNvbC14cy0xMFwiPlxuXHRcdFx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9XCJmbG9hdC1sZWZ0XCIgaHJlZj17dGhpcy5wcm9wcy5sb2NhdGlvbl9yb3V0ZX0+e3RoaXMucHJvcHMubG9jYXRpb259PC9hPlxuXHRcdFx0XHRcdFx0PC9oMz5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTIgY3JlYXRlLWlzc3VlLWhlYWRlci1idXR0b24tY29udGFpbmVyXCIgPlxuXG5cblx0XHRcdFx0XHRcdFx0PENyZWF0ZUlzc3VlXG5cdFx0XHRcdFx0XHRcdFx0aXNzdWVzPXt0aGlzLnN0YXRlLmlzc3Vlc31cblx0XHRcdFx0XHRcdFx0XHRhY3RpdmF0ZU1vZGFsTmV3PXt0aGlzLmFjdGl2YXRlTW9kYWxOZXd9XG5cdFx0XHRcdFx0XHRcdFx0YWN0aXZhdGVNb2RhbEVkaXQ9e3RoaXMuYWN0aXZhdGVNb2RhbEVkaXR9XG5cdFx0XHRcdFx0XHRcdFx0d29ya29yZGVyPXt0aGlzLnByb3BzLndvcmtvcmRlcn1cblxuXHRcdFx0XHRcdFx0XHQvPlxuXG5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XG5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtYm9keVwiPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+U3RhdHVzPC9sYWJlbD5cblx0XHRcdFx0XHQ8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCBzdGF0dXNcIiB2YWx1ZT17dGhpcy5wcm9wcy5zdGF0dXN9IG9uQ2hhbmdlPXt0aGlzLnN0YXR1c0NoYW5nZX0+XG5cdFx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPVwiUGVuZGluZ1wiPlBlbmRpbmc8L29wdGlvbj5cblx0XHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9XCJTdGFydGVkXCI+U3RhcnRlZDwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIkNvbXBsZXRlXCI+Q29tcGxldGU8L29wdGlvbj5cblx0XHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9XCJJbmNvbXBsZXRlXCI+SW5jb21wbGV0ZTwvb3B0aW9uPlxuXHRcdFx0XHRcdDwvc2VsZWN0PlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja19ib3hlc1wiPlxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0aGlzLnByb3BzLnRhc2tzLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCl7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGNoZWNrZWQ9aXRlbS5zdGF0dXM/dHJ1ZTpmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gKDxUYXNrQ2hlY2sga2V5PXtpbmRleH0gaW5kZXg9e2luZGV4fSBsYWJsZT17aXRlbS50YXNrfSBjaGVja2VkPXtjaGVja2VkfSB0YXNrQ2hlY2tlZD17dGhpcy50YXNrQ2hlY2tlZH0vPik7XG5cdFx0XHRcdFx0XHRcdH0uYmluZCh0aGlzKSlcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9XCJcIiBocmVmPXt0aGlzLnByb3BzLnJvdXRlfT5Nb3JlIEluZm9ybWF0aW9uPC9hPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5cblxuIiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kYWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5zdWJtaXQ9dGhpcy5zdWJtaXQuYmluZCh0aGlzKTtcblx0fVxuXHRzdWJtaXQoZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMucHJvcHMuc3VibWl0KGUpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwgZmFkZSB0ZXh0LWxlZnQgcGFuZWwtZGVmYXVsdFwiIGlkPXt0aGlzLnByb3BzLmlkfSB0YWJJbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiIGFyaWEtbGFiZWxsZWRieT1cImV4YW1wbGVNb2RhbExhYmVsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nXCIgcm9sZT1cImRvY3VtZW50XCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWhlYWRlclwiPlxuXHRcdFx0XHRcdFx0XHQ8aDQgY2xhc3NOYW1lPVwibW9kYWwtdGl0bGVcIiBpZD1cImV4YW1wbGVNb2RhbExhYmVsXCI+e3RoaXMucHJvcHMudGl0bGV9PC9oND5cblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgZGlzcGxheT1cIm5vbmVcIiBjbGFzc05hbWU9XCJjbG9zZSBoaWRlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj5cblx0XHRcdFx0XHRcdFx0PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxmb3JtPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHlcIj5cblx0XHRcdFx0XHRcdFx0XHR7IHRoaXMucHJvcHMuY2hpbGRyZW4gfVxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1mb290ZXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXNlY29uZGFyeVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2xvc2U8L2J1dHRvbj5cblx0XHRcdFx0XHRcdFx0XHQ8YnV0dG9uIFxuXHRcdFx0XHRcdFx0XHRcdFx0dHlwZT1cInN1Ym1pdFwiIFxuXHRcdFx0XHRcdFx0XHRcdFx0b25DbGljaz17dGhpcy5zdWJtaXR9IFxuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHR7dGhpcy5wcm9wcy5zdWJtaXRUZXh0fVxuXHRcdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDwvZm9ybT5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cblxuIiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5pbXBvcnQgRGF5c1dvcmtvcmRlcnMgZnJvbSAnLi4vLi4vcHVibGljL2pzL21vZHVsZXMvZGF5c193b3Jrb3JkZXJzL0RheXNXb3Jrb3JkZXJzJ1xuaW1wb3J0IERheXNUaW1lc2hlZXRzIGZyb20gJy4uLy4uL3B1YmxpYy9qcy9tb2R1bGVzL2RheXNfdGltZXNoZWV0cy9EYXlzVGltZVNoZWV0cydcblxuLy9jb25zdCBhcHA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKTtcbmNvbnN0IGFwcD0gJCgnI2FwcCcpWzBdO1xuY29uc3QgdGltZXNoZWV0cz0gJCgnI3RpbWUnKVswXTtcblxuY2xhc3MgV29ya1BhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cblx0XHQvKiBiaW5kIGRpbmcgZGluZyAqL1xuXHRcdHRoaXMubWFpbkNsaWNrZWQ9dGhpcy5tYWluQ2xpY2tlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMud29ya29yZGVyc0NsaWNrZWQ9dGhpcy53b3Jrb3JkZXJzQ2xpY2tlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMudGltZXNoZWV0Q2xpY2tlZD10aGlzLnRpbWVzaGVldENsaWNrZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLmhhbmRlbENsb2NrSW49dGhpcy5oYW5kZWxDbG9ja0luLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5oYW5kZWxSb3V0ZT10aGlzLmhhbmRlbFJvdXRlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5zdGF0ZVVwZGF0ZT10aGlzLnN0YXRlVXBkYXRlLmJpbmQodGhpcyk7XG5cdFx0XG5cblx0XHQvL0hhbmRlbCBVc2VyIGxPYWRcblx0XHR0aGlzLmN1cnJlbnRVc2VyPXBzLmluaXRDdXJyZW50VXNlcigpO1xuXHRcdHRoaXMuY3VycmVudFVzZXIuZ2V0KHt9LGZ1bmN0aW9uKGl0ZW1zKXtcblx0XHRcdGlmKHRoaXMuY3VycmVudFVzZXIuaXRlbXMudXNlcm5hbWU9PVwiR3Vlc3RcIil7XG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbiA9IFwiL2xvZ2luXCI7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0JChkb2N1bWVudCkudHJpZ2dlcihcInVzZXJMb2FkZWRcIik7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coXCJhZnRlciBMb2FkXCIsdGhpcy5jdXJyZW50VXNlci5pdGVtcyk7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLnN0YXRlPXtpdGVtczp0aGlzLmN1cnJlbnRVc2VyLml0ZW1zfTtcblx0XHQkKGRvY3VtZW50KS5iaW5kKCd1c2VyTG9hZGVkJyx0aGlzLnN0YXRlVXBkYXRlKTtcblxuXG5cdFx0Ly9Sb3V0aW5nXG5cdFx0JCh3aW5kb3cpLm9uKFwiaGFzaGNoYW5nZVwiLCBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuaGFuZGVsUm91dGUoKTtcblx0XHR9LmJpbmQodGhpcykpO1xuXHRcdHZhciByb3V0ZSA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnNsaWNlKDEpO1xuXHRcdGlmKCFyb3V0ZSkgcm91dGUgPSBcIiNtYWluXCI7XG5cdFx0dGhpcy5zdGF0ZS5wYWdlPXJvdXRlO1xuXHRcdGlmICghd2luZG93LmxvY2F0aW9uLmhhc2gpIHtcblx0XHRcdHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gXCIjbWFpblwiO1xuXHRcdH1cblx0XHQkKHdpbmRvdykudHJpZ2dlcihcImhhc2hjaGFuZ2VcIik7XG5cblx0fVxuXHRjb21wb25lbnREaWRNb3VudCgpe1xuXHRcdFxuXHR9XG5cdHN0YXRlVXBkYXRlKCl7XG5cdFx0Ly9hbGVydChcInVwZGF0ZVwiKTtcblx0XHR0aGlzLnN0YXRlLml0ZW1zPXRoaXMuY3VycmVudFVzZXIuaXRlbXM7XG5cdFx0dGhpcy5zZXRTdGF0ZSh0aGlzLnN0YXRlKTtcblxuXHR9XG5cdGhhbmRlbFJvdXRlKCl7XG5cdFx0dmFyIHJvdXRlID0gd2luZG93LmxvY2F0aW9uLmhhc2guc2xpY2UoMSk7XG5cdFx0dmFyIHBhZ2VzPXtcblx0XHRcdG1haW46dGhpcy5tYWluQ2xpY2tlZCxcblx0XHRcdHdvcmtvcmRlcnM6dGhpcy53b3Jrb3JkZXJzQ2xpY2tlZCxcblx0XHRcdHRpbWVzaGVldDp0aGlzLnRpbWVzaGVldENsaWNrZWRcblx0XHR9W3JvdXRlXSgpO1xuXHR9XG5cdGhhbmRlbENsb2NrSW4oKXtcblxuXHR9XG5cdG1haW5DbGlja2VkKCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7cGFnZTonbWFpbid9KTtcblx0fVxuXHR3b3Jrb3JkZXJzQ2xpY2tlZCgpe1xuXG5cdFx0dGhpcy5zZXRTdGF0ZSh7cGFnZTond29ya29yZGVycyd9KTtcblxuXHR9XG5cdHRpbWVzaGVldENsaWNrZWQoKXtcblx0XHR0aGlzLnNldFN0YXRlKHtwYWdlOid0aW1lc2hlZXQnfSk7XG5cblx0fVxuXHQvLzxBZmZpeFdyYXBwZXIgY2xhc3NOYW1lPVwic3RpY2t5X3N1Ym5hdiB0ZXh0LWNlbnRlclwiICBvZmZzZXQ9ezE0MH0gaGVpZ2h0PVwiNDBweFwiPjwvQWZmaXhXcmFwcGVyPlxuXHRyZW5kZXIoKXtcblx0XHR2YXIgb3V0cHV0PScnO1xuXHRcdGlmICh0aGlzLnN0YXRlLml0ZW1zLnVzZXJuYW1lPT1cIkd1ZXN0XCJ8fHRoaXMuc3RhdGUuaXRlbXMudXNlcm5hbWU9PVwiQWRtaW5pc3RyYXRvclwiKXtcblx0XHRcdG91dHB1dD0oPGgzPkd1ZXN0IE9yIEFkbWluPC9oMz4pO1xuXHRcdH1cblx0XHRlbHNlIGlmKHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoPT09MCl7XG5cdFx0XHRvdXRwdXQ9KDxoMz5ObyBVc2VyIERhdGE8L2gzPik7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRvdXRwdXQ9KFxuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdDx1bCBjbGFzc05hbWU9XCJuYXYgbmF2LXBpbGxzIGNlbnRlci1waWxsc1wiPlxuXHRcdFx0XHRcdFx0PGxpIG9uQ2xpY2s9e3RoaXMubWFpbkNsaWNrZWR9IHJvbGU9XCJwcmVzZW50YXRpb25cIiBjbGFzc05hbWU9e3RoaXMuc3RhdGUucGFnZT09J21haW4nPydhY3RpdmUnOicnfT48YSBocmVmPVwiI21haW5cIj5NYWluPC9hPjwvbGk+XG5cdFx0XHRcdFx0XHQ8bGkgb25DbGljaz17dGhpcy53b3Jrb3JkZXJzQ2xpY2tlZH0gcm9sZT1cInByZXNlbnRhdGlvblwiIGNsYXNzTmFtZT17dGhpcy5zdGF0ZS5wYWdlPT0nd29ya29yZGVycyc/J2FjdGl2ZSc6Jyd9PjxhIGhyZWY9XCIjd29ya29yZGVyc1wiPldvcmtvcmRlcnM8L2E+PC9saT5cblx0XHRcdFx0XHRcdDxsaSBvbkNsaWNrPXt0aGlzLnRpbWVzaGVldENsaWNrZWR9IHJvbGU9XCJwcmVzZW50YXRpb25cIiBjbGFzc05hbWU9e3RoaXMuc3RhdGUucGFnZT09J3RpbWVzaGVldCc/J2FjdGl2ZSc6Jyd9PjxhIGhyZWY9XCIjdGltZXNoZWV0XCI+VGltZSBTaGVldHM8L2E+PC9saT5cblx0XHRcdFx0XHQ8L3VsPlxuXHRcdFx0XHRcdDxici8+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e3RoaXMuc3RhdGUucGFnZT09J3RpbWVzaGVldCcgfHwgdGhpcy5zdGF0ZS5wYWdlPT0nbWFpbic/Jyc6J2hpZGRlbid9PlxuXHRcdFx0XHRcdFx0PERheXNUaW1lc2hlZXRzIFxuXHRcdFx0XHRcdFx0XHRkYXRlPXt0aGlzLnN0YXRlLml0ZW1zLnRvZGF5fVxuXHRcdFx0XHRcdFx0XHRmdWxsX25hbWU9e3RoaXMuc3RhdGUuaXRlbXMuY3VycmVudF91c2VyLmZ1bGxfbmFtZX1cblx0XHRcdFx0XHRcdFx0cGFnZT17dGhpcy5zdGF0ZS5wYWdlfVxuXHRcdFx0XHRcdFx0XHRjcmV3PXt0aGlzLnN0YXRlLml0ZW1zLmNyZXd9XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPXt0aGlzLnN0YXRlLnBhZ2U9PSd3b3Jrb3JkZXJzJz8nJzonaGlkZGVuJ30+XG5cdFx0XHRcdFx0XHQ8RGF5c1dvcmtvcmRlcnMgXG5cdFx0XHRcdFx0XHRcdGNyZXc9e3RoaXMuc3RhdGUuaXRlbXMuY3Jld30gXG5cdFx0XHRcdFx0XHRcdGRhdGU9e3RoaXMuc3RhdGUuaXRlbXMudG9kYXl9XG5cdFx0XHRcdFx0XHRcdC8vY29tcGxldGVkPXt0aGlzLnN0YXRlLmNvbXBsZXRlZH1cblx0XHRcdFx0XHRcdFx0Ly9pbnByb2dyZXNzPXt0aGlzLnN0YXRlLmlucHJvZ3Jlc3N9XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuKDxkaXY+XG5cdFx0XHR7b3V0cHV0fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG4oZnVuY3Rpb24oKXtcblx0ZnJhcHBlLnJlYWR5KGZ1bmN0aW9uKCl7XG5cdFx0UmVhY3RET00ucmVuZGVyKCBcblx0XHQ8V29ya1BhZ2UgLz5cblx0LCB0aW1lc2hlZXRzICk7XG5cdH0pXG5cbn0pKCk7XG5cblxuXG5cblxuIl19
