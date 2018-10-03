"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "C:\\BA\\BA\\components\\SearchBar.js";


var SearchBar = function (_Component) {
  (0, _inherits3.default)(SearchBar, _Component);

  function SearchBar(props) {
    (0, _classCallCheck3.default)(this, SearchBar);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SearchBar.__proto__ || (0, _getPrototypeOf2.default)(SearchBar)).call(this, props));

    _this.state = { term: "What are you looking for?" };
    return _this;
  }

  (0, _createClass3.default)(SearchBar, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("div", { className: "search-bar", __source: {
          fileName: _jsxFileName,
          lineNumber: 10
        }
      }, _react2.default.createElement("input", {
        value: this.state.term,
        onChange: this.handleChange.bind(this),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 11
        }
      }));
    }
  }, {
    key: "handleChange",
    value: function handleChange(e) {
      var term = e.target.value;
      this.setState({ term: term });
      this.props.itemSearch(term);
    }
  }]);

  return SearchBar;
}(_react.Component);

exports.default = SearchBar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHNcXFNlYXJjaEJhci5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIlNlYXJjaEJhciIsInByb3BzIiwic3RhdGUiLCJ0ZXJtIiwiaGFuZGxlQ2hhbmdlIiwiYmluZCIsImUiLCJ0YXJnZXQiLCJ2YWx1ZSIsInNldFN0YXRlIiwiaXRlbVNlYXJjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPLEFBQVM7Ozs7Ozs7OztJQUVWLEE7cUNBQ0o7O3FCQUFBLEFBQVksT0FBTzt3Q0FBQTs7NElBQUEsQUFDWCxBQUNOOztVQUFBLEFBQUssUUFBUSxFQUFFLE1BRkUsQUFFakIsQUFBYSxBQUFRO1dBQ3RCOzs7Ozs2QkFDUSxBQUNQOzZCQUNFLGNBQUEsU0FBSyxXQUFMLEFBQWU7b0JBQWY7c0JBQUEsQUFDRTtBQURGO09BQUE7ZUFFVyxLQUFBLEFBQUssTUFEZCxBQUNvQixBQUNsQjtrQkFBVSxLQUFBLEFBQUssYUFBTCxBQUFrQixLQUY5QixBQUVZLEFBQXVCOztvQkFGbkM7c0JBRkosQUFDRSxBQUNFLEFBTUw7QUFOSztBQUNFOzs7O2lDQU9LLEEsR0FBRyxBQUNkO1VBQU0sT0FBTyxFQUFBLEFBQUUsT0FBZixBQUFzQixBQUN0QjtXQUFBLEFBQUssU0FBUyxFQUFFLE1BQWhCLEFBQWMsQUFDZDtXQUFBLEFBQUssTUFBTCxBQUFXLFdBQVgsQUFBc0IsQUFDdkI7Ozs7O0FBcEJxQixBLEFBdUJ4Qjs7a0JBQUEsQUFBZSIsImZpbGUiOiJTZWFyY2hCYXIuanMiLCJzb3VyY2VSb290IjoiQzovQkEvQkEifQ==