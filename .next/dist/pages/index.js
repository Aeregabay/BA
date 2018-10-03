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

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _SearchBar = require("../components/SearchBar");

var _SearchBar2 = _interopRequireDefault(_SearchBar);

var _Header = require("../components/Header");

var _Header2 = _interopRequireDefault(_Header);

var _Footer = require("../components/Footer");

var _Footer2 = _interopRequireDefault(_Footer);

var _routes = require("../routes");

var _myprofile = require("./myprofile");

var _myprofile2 = _interopRequireDefault(_myprofile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "C:\\BA\\BA\\pages\\index.js?entry";


var App = function (_Component) {
  (0, _inherits3.default)(App, _Component);

  function App(props) {
    (0, _classCallCheck3.default)(this, App);

    var _this = (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).call(this, props));

    _this.toProfile = function (e) {
      _routes.Router.push("/myprofile");
    };

    _this.state = {
      searchTerm: "",
      items: [],
      selectedItem: null
    };
    return _this;
  }

  (0, _createClass3.default)(App, [{
    key: "itemSearch",
    value: function itemSearch(searchTerm) {
      this.setState({
        searchTerm: searchTerm
      });
      console.log(this.state.searchTerm);
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 32
        }
      }, _react2.default.createElement(_Header2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        }
      }), _react2.default.createElement("button", { onClick: this.toProfile, __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        }
      }, "My Profile"), _react2.default.createElement(_SearchBar2.default, { itemSearch: this.itemSearch.bind(this), __source: {
          fileName: _jsxFileName,
          lineNumber: 35
        }
      }), _react2.default.createElement(_Footer2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 36
        }
      }));
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;
// ReactDOM.render(<App />, document.getElementById("app"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzXFxpbmRleC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIlJlYWN0RE9NIiwiU2VhcmNoQmFyIiwiSGVhZGVyIiwiRm9vdGVyIiwiTGluayIsIlJvdXRlciIsIk15UHJvZmlsZSIsIkFwcCIsInByb3BzIiwidG9Qcm9maWxlIiwicHVzaCIsInN0YXRlIiwic2VhcmNoVGVybSIsIml0ZW1zIiwic2VsZWN0ZWRJdGVtIiwic2V0U3RhdGUiLCJjb25zb2xlIiwibG9nIiwiaXRlbVNlYXJjaCIsImJpbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFTOzs7O0FBQ2hCLEFBQU87Ozs7QUFDUCxBQUFPLEFBQWU7Ozs7QUFDdEIsQUFBTyxBQUFZOzs7O0FBQ25CLEFBQU8sQUFBWTs7OztBQUNuQixBQUFTLEFBQU0sQUFBYzs7QUFDN0IsQUFBTyxBQUFlOzs7Ozs7Ozs7SUFFaEIsQTsrQkFDSjs7ZUFBQSxBQUFZLE9BQU87d0NBQUE7O2dJQUFBLEFBQ1g7O1VBRFcsQUFnQm5CLFlBQVksYUFBSyxBQUNmO3FCQUFBLEFBQU8sS0FBUCxBQUFZLEFBQ2I7QUFsQmtCLEFBRWpCOztVQUFBLEFBQUs7a0JBQVEsQUFDQyxBQUNaO2FBRlcsQUFFSixBQUNQO29CQUxlLEFBRWpCLEFBQWEsQUFHRztBQUhILEFBQ1g7V0FJSDs7Ozs7K0IsQUFFVSxZQUFZLEFBQ3JCO1dBQUEsQUFBSztvQkFBTCxBQUFjLEFBR2Q7QUFIYyxBQUNaO2NBRUYsQUFBUSxJQUFJLEtBQUEsQUFBSyxNQUFqQixBQUF1QixBQUN4Qjs7Ozs2QkFNUSxBQUNQOzZCQUNFLGNBQUE7O29CQUFBO3NCQUFBLEFBQ0U7QUFERjtBQUFBLE9BQUEsa0JBQ0UsQUFBQzs7b0JBQUQ7c0JBREYsQUFDRSxBQUNBO0FBREE7QUFBQSwwQkFDQSxjQUFBLFlBQVEsU0FBUyxLQUFqQixBQUFzQjtvQkFBdEI7c0JBQUE7QUFBQTtTQUZGLEFBRUUsQUFDQSwrQkFBQSxBQUFDLHFDQUFVLFlBQVksS0FBQSxBQUFLLFdBQUwsQUFBZ0IsS0FBdkMsQUFBdUIsQUFBcUI7b0JBQTVDO3NCQUhGLEFBR0UsQUFDQTtBQURBOzBCQUNBLEFBQUM7O29CQUFEO3NCQUxKLEFBQ0UsQUFJRSxBQUdMO0FBSEs7QUFBQTs7Ozs7QSxBQTNCVSxBQWlDbEI7O2tCQUFBLEFBQWU7QUFDZiIsImZpbGUiOiJpbmRleC5qcz9lbnRyeSIsInNvdXJjZVJvb3QiOiJDOi9CQS9CQSJ9