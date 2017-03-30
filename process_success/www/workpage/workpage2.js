(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _workorderTask = require('./workorderTask');

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
		key: 'socketUpdate',
		value: function socketUpdate() {}
	}, {
		key: 'onTaskChecked',
		value: function onTaskChecked(wo_index, index, check) {
			this.workorderTool.items[wo_index].subtask[index].status = check ? 0 : 1;
			this.setState({ workorders: this.workorderTool.items });
			this.workorderTool.update(this.workorderTool.items[wo_index]);
		}
	}, {
		key: 'onStatusChanged',
		value: function onStatusChanged(status, index) {
			this.workorderTool.items[index].status = status;
			this.setState({ workorders: this.workorderTool.items });
			this.workorderTool.update(this.workorderTool.items[index]);
		}
	}, {
		key: 'updateFromServer',
		value: function updateFromServer() {
			console.log("UPDATE FROM SERVER CALLED");
			this.setState({ workorders: this.workorderTool.items });
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
			if (this.state.workorders === 0 || this.state.workorders == 0) {
				return React.createElement(
					'div',
					null,
					'No Workorders'
				);
			}
			var todo = [];
			var complete = [];
			this.state.workorders.map(function (item, index) {
				if (item.status != 'Complete' || item.status != 'Incomplete') {
					todo.push(this.workorderObj(item, index));
				} else {
					complete.push(this.workorderObj(item, index));
				}
			}.bind(this));
			return React.createElement(
				'div',
				{ className: 'workorder_container' },
				React.createElement(
					'div',
					null,
					React.createElement(
						'h1',
						null,
						'Workorders'
					),
					todo
				),
				React.createElement(
					'div',
					null,
					React.createElement(
						'h1',
						null,
						'Complete'
					),
					complete
				)
			);
		}
	}]);

	return DaysWorkorders;
}(React.Component);

exports.default = DaysWorkorders;

},{"./workorderTask":3}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _TaskCheck = require("./TaskCheck");

var _TaskCheck2 = _interopRequireDefault(_TaskCheck);

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
		key: "taskChecked",
		value: function taskChecked(e) {
			this.setState({ title: "CHECKED" });
		}
	}, {
		key: "isChecked",
		value: function isChecked(value) {
			return value === this.state.selected ? 'checked line-through' : 'default';
		}
	}, {
		key: "taskChecked",
		value: function taskChecked(index, checked) {
			var wo_index = this.props.index;
			this.props.onTaskChecked(wo_index, index, checked);
		}
	}, {
		key: "statusChange",
		value: function statusChange(e) {
			this.props.onStatusChanged(e.target.value, this.props.index);
		}
	}, {
		key: "render",
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
				"div",
				{ className: "col-md-4 col-sm-4" },
				React.createElement(
					"div",
					{ id: "", className: mainClass },
					React.createElement(
						"div",
						{ className: "panel-heading" },
						React.createElement(
							"h3",
							{ className: "panel-title" },
							React.createElement(
								"a",
								{ href: this.props.location_route },
								this.props.location
							)
						)
					),
					React.createElement(
						"div",
						{ className: "panel-body" },
						React.createElement(
							"label",
							{ className: "control-label" },
							"Status"
						),
						React.createElement(
							"select",
							{ className: "form-control status", value: this.props.status, onChange: this.statusChange },
							React.createElement(
								"option",
								{ value: "Pending" },
								"Pending"
							),
							React.createElement(
								"option",
								{ value: "Started" },
								"Started"
							),
							React.createElement(
								"option",
								{ value: "Complete" },
								"Complete"
							),
							React.createElement(
								"option",
								{ value: "Incomplete" },
								"Incomplete"
							)
						),
						React.createElement(
							"div",
							{ className: "check_boxes" },
							this.props.tasks.map(function (item, index) {
								var checked = item.status ? true : false;
								return React.createElement(_TaskCheck2.default, { key: index, index: index, lable: item.task, checked: checked, taskChecked: this.taskChecked });
							}.bind(this))
						),
						React.createElement(
							"div",
							null,
							React.createElement(
								"a",
								{ className: "", href: this.props.route },
								"More Information"
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

},{"./TaskCheck":2}],4:[function(require,module,exports){
'use strict';

var _workorderTask = require('../../public/js/modules/workorderTask');

var _workorderTask2 = _interopRequireDefault(_workorderTask);

var _DaysWorkorders = require('../../public/js/modules/DaysWorkorders');

var _DaysWorkorders2 = _interopRequireDefault(_DaysWorkorders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*jshint ignore:start */
var app = document.getElementById('app');

//ReactDOM.render(<WorkorderTask />, app );
ReactDOM.render(React.createElement(_DaysWorkorders2.default, { crew: 'Crew 1', date: '2017-03-29' }), app);

},{"../../public/js/modules/DaysWorkorders":1,"../../public/js/modules/workorderTask":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvRGF5c1dvcmtvcmRlcnMuanN4IiwicHJvY2Vzc19zdWNjZXNzL3B1YmxpYy9qcy9tb2R1bGVzL1Rhc2tDaGVjay5qc3giLCJwcm9jZXNzX3N1Y2Nlc3MvcHVibGljL2pzL21vZHVsZXMvd29ya29yZGVyVGFzay5qc3giLCJwcm9jZXNzX3N1Y2Nlc3Mvd3d3L3dvcmtwYWdlL3dvcmtwYWdlMi5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0NBOzs7Ozs7Ozs7OytlQURBOzs7SUFJcUIsYzs7O0FBQ3BCLHlCQUFZLEtBQVosRUFBa0I7QUFBQTs7QUFBQSw4SEFDWCxLQURXOztBQUVqQixNQUFJLE9BQUssRUFBVDtBQUNBLE9BQUssSUFBTCxHQUFVLE1BQUssS0FBTCxDQUFXLElBQXJCO0FBQ0EsT0FBSyxJQUFMLEdBQVUsTUFBSyxLQUFMLENBQVcsSUFBckI7O0FBRUE7QUFDQSxRQUFLLGFBQUwsR0FBbUIsTUFBSyxhQUFMLENBQW1CLElBQW5CLE9BQW5CO0FBQ0EsUUFBSyxlQUFMLEdBQXFCLE1BQUssZUFBTCxDQUFxQixJQUFyQixPQUFyQjtBQUNBLFFBQUssZ0JBQUwsR0FBc0IsTUFBSyxnQkFBTCxDQUFzQixJQUF0QixPQUF0QjtBQUNBLFFBQUssWUFBTCxHQUFrQixNQUFLLFlBQUwsQ0FBa0IsSUFBbEIsT0FBbEI7QUFDQTtBQUNBOztBQUVBLFFBQUssS0FBTCxHQUFXLEVBQUMsWUFBVyxFQUFaLEVBQVg7QUFDQSxRQUFLLGFBQUwsR0FBbUIsR0FBRyxhQUFILEVBQW5CO0FBQ0EsUUFBSyxhQUFMLENBQW1CLEdBQW5CLENBQXVCLElBQXZCLEVBQTRCLFlBQVU7QUFDckMsUUFBSyxnQkFBTDtBQUNBLFFBQUssYUFBTCxDQUFtQixVQUFuQixDQUE4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QUFBO0FBQUEsVUFBUSxPQUFNLFlBQWQ7QUFBQTtBQUFBO0FBSkQsT0FGRDtBQVNDO0FBQUE7QUFBQSxTQUFLLFdBQVUsYUFBZjtBQUNFLFlBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsR0FBakIsQ0FBcUIsVUFBUyxJQUFULEVBQWUsS0FBZixFQUFxQjtBQUMxQyxZQUFJLFVBQVEsS0FBSyxNQUFMLEdBQVksSUFBWixHQUFpQixLQUE3QjtBQUNBLGVBQVEsMkNBQVcsS0FBSyxLQUFoQixFQUF1QixPQUFPLEtBQTlCLEVBQXFDLE9BQU8sS0FBSyxJQUFqRCxFQUF1RCxTQUFTLE9BQWhFLEVBQXlFLGFBQWEsS0FBSyxXQUEzRixHQUFSO0FBQ0EsUUFIcUIsQ0FHcEIsSUFIb0IsQ0FHZixJQUhlLENBQXJCO0FBREYsT0FURDtBQWdCQztBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUEsVUFBRyxXQUFVLEVBQWIsRUFBZ0IsTUFBTSxLQUFLLEtBQUwsQ0FBVyxLQUFqQztBQUFBO0FBQUE7QUFEQTtBQWhCRDtBQU5EO0FBREEsSUFERDtBQStCQTs7OztFQTdEeUMsTUFBTSxTOztrQkFBNUIsYTs7Ozs7QUNIckI7Ozs7QUFDQTs7Ozs7O0FBRkE7QUFJQSxJQUFNLE1BQUssU0FBUyxjQUFULENBQXdCLEtBQXhCLENBQVg7O0FBRUE7QUFDQSxTQUFTLE1BQVQsQ0FBZ0IsZ0RBQWdCLE1BQUssUUFBckIsRUFBOEIsTUFBSyxZQUFuQyxHQUFoQixFQUFtRSxHQUFuRSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmltcG9ydCBXb3Jrb3JkZXJUYXNrIGZyb20gJy4vd29ya29yZGVyVGFzayc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF5c1dvcmtvcmRlcnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dmFyIGFyZ3M9e307XG5cdFx0YXJncy5jcmV3PXRoaXMucHJvcHMuY3Jldztcblx0XHRhcmdzLmRhdGU9dGhpcy5wcm9wcy5kYXRlO1xuXG5cdFx0LyogICBEbyB0aGUgYmluZCB0aGluZyAgKi9cblx0XHR0aGlzLm9uVGFza0NoZWNrZWQ9dGhpcy5vblRhc2tDaGVja2VkLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5vblN0YXR1c0NoYW5nZWQ9dGhpcy5vblN0YXR1c0NoYW5nZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnVwZGF0ZUZyb21TZXJ2ZXI9dGhpcy51cGRhdGVGcm9tU2VydmVyLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5zb2NrZXRVcGRhdGU9dGhpcy5zb2NrZXRVcGRhdGUuYmluZCh0aGlzKTtcblx0XHQvL3RoaXMud29ya29yZGVyT2JqPXRoaXMub25TdGF0dXNDaGFuZ2VkLmJpbmQodGhpcyk7XG5cdFx0LyogICAgICAgICAgZW5kICAgICAgICAgICovXG5cblx0XHR0aGlzLnN0YXRlPXt3b3Jrb3JkZXJzOltdfTtcblx0XHR0aGlzLndvcmtvcmRlclRvb2w9cHMuaW5pdFdvcmtvcmRlcigpO1xuXHRcdHRoaXMud29ya29yZGVyVG9vbC5nZXQoYXJncyxmdW5jdGlvbigpe1xuXHRcdFx0dGhpcy51cGRhdGVGcm9tU2VydmVyKCk7XG5cdFx0XHR0aGlzLndvcmtvcmRlclRvb2wucmVhY3RTZXR1cCh0aGlzLnVwZGF0ZUZyb21TZXJ2ZXIpO1xuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0aWYgKHRoaXMud29ya29yZGVyVG9vbC5pdGVtcz09PXVuZGVmaW5lZCB8fHRoaXMud29ya29yZGVyVG9vbC5pdGVtcz09PSAwICl7XG5cblx0XHR9ZWxzZXt0aGlzLnN0YXRlLndvcmtvcmRlcnM9dGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zO31cblx0fVxuXHRzb2NrZXRVcGRhdGUoKXtcblxuXHR9XG5cdG9uVGFza0NoZWNrZWQod29faW5kZXgsaW5kZXgsY2hlY2spe1xuXHRcdHRoaXMud29ya29yZGVyVG9vbC5pdGVtc1t3b19pbmRleF0uc3VidGFza1tpbmRleF0uc3RhdHVzPWNoZWNrPzA6MTtcblx0XHR0aGlzLnNldFN0YXRlKHt3b3Jrb3JkZXJzOnRoaXMud29ya29yZGVyVG9vbC5pdGVtc30pO1xuXHRcdHRoaXMud29ya29yZGVyVG9vbC51cGRhdGUodGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zW3dvX2luZGV4XSk7XG5cdH1cblx0b25TdGF0dXNDaGFuZ2VkKHN0YXR1cywgaW5kZXgpe1xuXHRcdHRoaXMud29ya29yZGVyVG9vbC5pdGVtc1tpbmRleF0uc3RhdHVzPXN0YXR1cztcblx0XHR0aGlzLnNldFN0YXRlKHt3b3Jrb3JkZXJzOnRoaXMud29ya29yZGVyVG9vbC5pdGVtc30pO1xuXHRcdHRoaXMud29ya29yZGVyVG9vbC51cGRhdGUodGhpcy53b3Jrb3JkZXJUb29sLml0ZW1zW2luZGV4XSk7XG5cdH1cblx0dXBkYXRlRnJvbVNlcnZlcigpe1xuXHRcdGNvbnNvbGUubG9nKFwiVVBEQVRFIEZST00gU0VSVkVSIENBTExFRFwiKTtcblx0XHR0aGlzLnNldFN0YXRlKHt3b3Jrb3JkZXJzOnRoaXMud29ya29yZGVyVG9vbC5pdGVtc30pO1xuXHR9XG5cdHdvcmtvcmRlck9iaihpdGVtLGluZGV4KXtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8V29ya29yZGVyVGFzayBcblx0XHRcdFx0a2V5PXtpbmRleH0gXG5cdFx0XHRcdGluZGV4PXtpbmRleH0gXG5cdFx0XHRcdGxvY2F0aW9uX3JvdXRlPXtpdGVtLmxvY2F0aW9uX3JvdXRlfVxuXHRcdFx0XHRsb2NhdGlvbj17aXRlbS5sb2NhdGlvbn1cblx0XHRcdFx0dGFza3M9e2l0ZW0uc3VidGFza31cblx0XHRcdFx0c3RhdHVzPXtpdGVtLnN0YXR1c31cblx0XHRcdFx0b25UYXNrQ2hlY2tlZD17dGhpcy5vblRhc2tDaGVja2VkfVxuXHRcdFx0XHRvblN0YXR1c0NoYW5nZWQ9e3RoaXMub25TdGF0dXNDaGFuZ2VkfVxuXHRcdFx0XHRyb3V0ZT17aXRlbS5yb3V0ZX1cblx0XHRcdC8+XG5cdFx0KTtcblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gICAgICAgIFJlbmRlclxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdHJlbmRlcigpe1xuXHRcdGlmICh0aGlzLnN0YXRlLndvcmtvcmRlcnM9PT0wfHx0aGlzLnN0YXRlLndvcmtvcmRlcnM9PTApe1xuXHRcdFx0cmV0dXJuICg8ZGl2Pk5vIFdvcmtvcmRlcnM8L2Rpdj4pO1xuXHRcdH1cblx0XHR2YXIgdG9kbz1bXTtcblx0XHR2YXIgY29tcGxldGU9W107XG5cdFx0dGhpcy5zdGF0ZS53b3Jrb3JkZXJzLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCl7XG5cdFx0XHRpZiAoaXRlbS5zdGF0dXMhPSdDb21wbGV0ZSd8fGl0ZW0uc3RhdHVzIT0nSW5jb21wbGV0ZScpe1xuXHRcdFx0XHR0b2RvLnB1c2godGhpcy53b3Jrb3JkZXJPYmooaXRlbSxpbmRleCkpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGNvbXBsZXRlLnB1c2godGhpcy53b3Jrb3JkZXJPYmooaXRlbSxpbmRleCkpO1xuXHRcdFx0fVxuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ3b3Jrb3JkZXJfY29udGFpbmVyXCI+XG5cdFx0XHRcdDxkaXY+PGgxPldvcmtvcmRlcnM8L2gxPlxuXHRcdFx0XHRcdHt0b2RvfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdj48aDE+Q29tcGxldGU8L2gxPlxuXHRcdFx0XHRcdHtjb21wbGV0ZX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXG5cdH07XHRcbn1cbiIsIi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFza0NoZWNrIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdGNvbnNvbGUubG9nKHRoaXMucHJvcHMuY2hlY2tlZCk7XG5cdFx0dGhpcy50YXNrQ2hlY2tlZCA9IHRoaXMudGFza0NoZWNrZWQuYmluZCh0aGlzKTtcblx0fVxuXHR0YXNrQ2hlY2tlZChlKXtcblx0XHR0aGlzLnByb3BzLnRhc2tDaGVja2VkKHRoaXMucHJvcHMuaW5kZXgsIHRoaXMucHJvcHMuY2hlY2tlZCk7XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3QgY2hlY2tlZCA9IHRoaXMucHJvcHMuY2hlY2tlZCA/IFwibGluZS10aHJvdWdoXCIgOiBcIlwiO1xuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT17Y2hlY2tlZH0+XG5cdFx0XHRcdFx0PGlucHV0IG9uQ2hhbmdlPXt0aGlzLnRhc2tDaGVja2VkfSB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPXt0aGlzLnByb3BzLmNoZWNrZWR9IC8+XG5cdFx0XHRcdFx0e3RoaXMucHJvcHMubGFibGV9XG5cdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XHRcbn0iLCJcbi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuaW1wb3J0IFRhc2tDaGVjayBmcm9tICcuL1Rhc2tDaGVjaydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29ya29yZGVyVGFzayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnN0YXRlID17dGl0bGU6XCJkZXJla1wifTtcblx0XHR0aGlzLnRhc2tDaGVja2VkPXRoaXMudGFza0NoZWNrZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnN0YXR1c0NoYW5nZT10aGlzLnN0YXR1c0NoYW5nZS5iaW5kKHRoaXMpO1xuXHR9XG5cdHRhc2tDaGVja2VkKGUpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe3RpdGxlOlwiQ0hFQ0tFRFwifSk7XG5cdH1cblx0aXNDaGVja2VkKHZhbHVlKXtcbiAgICBcdHJldHVybiAoKHZhbHVlPT09dGhpcy5zdGF0ZS5zZWxlY3RlZCkgPydjaGVja2VkIGxpbmUtdGhyb3VnaCc6J2RlZmF1bHQnKTtcbiAgXHR9XG4gIFx0dGFza0NoZWNrZWQoaW5kZXgsY2hlY2tlZCl7XG4gIFx0XHR2YXIgd29faW5kZXg9dGhpcy5wcm9wcy5pbmRleDtcbiAgXHRcdHRoaXMucHJvcHMub25UYXNrQ2hlY2tlZCh3b19pbmRleCxpbmRleCxjaGVja2VkKTtcbiAgXHR9XG4gIFx0c3RhdHVzQ2hhbmdlKGUpe1xuICBcdFx0dGhpcy5wcm9wcy5vblN0YXR1c0NoYW5nZWQoZS50YXJnZXQudmFsdWUsdGhpcy5wcm9wcy5pbmRleCk7XG5cbiAgXHR9XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHRpdGxlPVwid2VsY29tZVwiO1xuXHRcdHZhciBtYWluQ2xhc3M9e1xuXHRcdFx0J0NvbXBsZXRlJzoncGFuZWwtc3VjY2VzcycsXG5cdFx0XHQnSW5jb21wbGV0ZSc6J3BhbmVsLWRhbmdlcicsXG5cdFx0XHQnUGVuZGluZyc6J3BhbmVsLWRlZmF1bHQnLFxuXHRcdFx0J1N0YXJ0ZWQnOidwYW5lbC13YXJuaW5nJ1xuXHRcdH1bdGhpcy5wcm9wcy5zdGF0dXNdO1xuXHRcdG1haW5DbGFzcyA9IG1haW5DbGFzcyArIFwiIHBhbmVsIHdvcmtvcmRlclwiO1xuXHRcdHJldHVybihcblx0XHRcdDxkaXYgY2xhc3NOYW1lPSdjb2wtbWQtNCBjb2wtc20tNCc+XG5cdFx0XHQ8ZGl2IGlkPVwiXCIgY2xhc3NOYW1lPXttYWluQ2xhc3N9PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWhlYWRpbmdcIj5cblx0XHRcdFx0XHQ8aDMgY2xhc3NOYW1lPVwicGFuZWwtdGl0bGVcIj5cblx0XHRcdFx0XHRcdDxhIGhyZWY9e3RoaXMucHJvcHMubG9jYXRpb25fcm91dGV9Pnt0aGlzLnByb3BzLmxvY2F0aW9ufTwvYT5cblx0XHRcdFx0XHQ8L2gzPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYW5lbC1ib2R5XCI+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWxcIj5TdGF0dXM8L2xhYmVsPlxuXHRcdFx0XHRcdDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIHN0YXR1c1wiIHZhbHVlPXt0aGlzLnByb3BzLnN0YXR1c30gb25DaGFuZ2U9e3RoaXMuc3RhdHVzQ2hhbmdlfT5cblx0XHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9XCJQZW5kaW5nXCI+UGVuZGluZzwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIlN0YXJ0ZWRcIj5TdGFydGVkPC9vcHRpb24+XG5cdFx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPVwiQ29tcGxldGVcIj5Db21wbGV0ZTwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIkluY29tcGxldGVcIj5JbmNvbXBsZXRlPC9vcHRpb24+XG5cdFx0XHRcdFx0PC9zZWxlY3Q+XG5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoZWNrX2JveGVzXCI+XG5cdFx0XHRcdFx0XHR7dGhpcy5wcm9wcy50YXNrcy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuXHRcdFx0XHRcdFx0XHR2YXIgY2hlY2tlZD1pdGVtLnN0YXR1cz90cnVlOmZhbHNlO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gKDxUYXNrQ2hlY2sga2V5PXtpbmRleH0gaW5kZXg9e2luZGV4fSBsYWJsZT17aXRlbS50YXNrfSBjaGVja2VkPXtjaGVja2VkfSB0YXNrQ2hlY2tlZD17dGhpcy50YXNrQ2hlY2tlZH0vPik7XG5cdFx0XHRcdFx0XHR9LmJpbmQodGhpcykpfVxuXG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9XCJcIiBocmVmPXt0aGlzLnByb3BzLnJvdXRlfT5Nb3JlIEluZm9ybWF0aW9uPC9hPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5cblxuIiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5pbXBvcnQgV29ya29yZGVyVGFzayBmcm9tICcuLi8uLi9wdWJsaWMvanMvbW9kdWxlcy93b3Jrb3JkZXJUYXNrJ1xuaW1wb3J0IERheXNXb3Jrb3JkZXJzIGZyb20gJy4uLy4uL3B1YmxpYy9qcy9tb2R1bGVzL0RheXNXb3Jrb3JkZXJzJ1xuXG5jb25zdCBhcHA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKTtcblxuLy9SZWFjdERPTS5yZW5kZXIoPFdvcmtvcmRlclRhc2sgLz4sIGFwcCApO1xuUmVhY3RET00ucmVuZGVyKDxEYXlzV29ya29yZGVycyBjcmV3PVwiQ3JldyAxXCIgZGF0ZT1cIjIwMTctMDMtMjlcIi8+LCBhcHAgKTtcbiJdfQ==
