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

var _routes = require("../routes");

var _semanticUiReact = require("semantic-ui-react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "D:\\OneDrive - uzh.ch\\Documents\\Uni\\BA\\dApp\\dapp-project\\components\\Layout.js";


var Layout = function (_Component) {
  (0, _inherits3.default)(Layout, _Component);

  function Layout(props) {
    (0, _classCallCheck3.default)(this, Layout);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Layout.__proto__ || (0, _getPrototypeOf2.default)(Layout)).call(this, props));

    _this.toProfile = function (e) {
      _routes.Router.push("/myprofile");
    };

    _this.toSettings = function (e) {
      _routes.Router.push("/settings");
    };

    _this.toLogin = function (e) {
      _routes.Router.push("/login");
    };

    _this.toRegister = function (e) {
      _routes.Router.push("/register");
    };

    _this.toHome = function (e) {
      _routes.Router.push("/");
    };

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(Layout, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        }
      }, _react2.default.createElement("link", {
        rel: "stylesheet",
        href: "//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        }
      }), _react2.default.createElement("h1", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        }
      }, "This is the global header"), _react2.default.createElement(_semanticUiReact.Button, {
        color: "black",
        onClick: this.toHome,
        content: "Home",
        icon: "Home",
        labelPosition: "right",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        }
      }), _react2.default.createElement(_semanticUiReact.Button.Group, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 41
        }
      }, _react2.default.createElement(_semanticUiReact.Button, {
        primary: true,
        icon: "add",
        onClick: this.toProfile,
        content: "My Profile",
        labelPosition: "right",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 42
        }
      }), _react2.default.createElement(_semanticUiReact.Button, {
        color: "grey",
        icon: "minus",
        onClick: this.toSettings,
        content: "Settings",
        labelPosition: "right",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 49
        }
      })), _react2.default.createElement(_semanticUiReact.Button.Group, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 57
        }
      }, _react2.default.createElement(_semanticUiReact.Button, { positive: true, onClick: this.toLogin, content: "Login", __source: {
          fileName: _jsxFileName,
          lineNumber: 58
        }
      }), _react2.default.createElement(_semanticUiReact.Button.Or, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 59
        }
      }), _react2.default.createElement(_semanticUiReact.Button, { color: "purple", onClick: this.toRegister, content: "Register", __source: {
          fileName: _jsxFileName,
          lineNumber: 60
        }
      })), this.props.children, _react2.default.createElement("h1", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 64
        }
      }, "This is the global footer"));
    }
  }]);

  return Layout;
}(_react.Component);

exports.default = Layout;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHNcXExheW91dC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIlJvdXRlciIsIkJ1dHRvbiIsIkxheW91dCIsInByb3BzIiwidG9Qcm9maWxlIiwicHVzaCIsInRvU2V0dGluZ3MiLCJ0b0xvZ2luIiwidG9SZWdpc3RlciIsInRvSG9tZSIsInN0YXRlIiwiY2hpbGRyZW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFTOzs7O0FBQ2hCLEFBQVMsQUFBYzs7QUFDdkIsQUFBUzs7Ozs7OztJLEFBRUg7a0NBQ0o7O2tCQUFBLEFBQVksT0FBTzt3Q0FBQTs7c0lBQUEsQUFDWDs7VUFEVyxBQUtuQixZQUFZLGFBQUssQUFDZjtxQkFBQSxBQUFPLEtBQVAsQUFBWSxBQUNiO0FBUGtCOztVQUFBLEFBUW5CLGFBQWEsYUFBSyxBQUNoQjtxQkFBQSxBQUFPLEtBQVAsQUFBWSxBQUNiO0FBVmtCOztVQUFBLEFBV25CLFVBQVUsYUFBSyxBQUNiO3FCQUFBLEFBQU8sS0FBUCxBQUFZLEFBQ2I7QUFia0I7O1VBQUEsQUFjbkIsYUFBYSxhQUFLLEFBQ2hCO3FCQUFBLEFBQU8sS0FBUCxBQUFZLEFBQ2I7QUFoQmtCOztVQUFBLEFBaUJuQixTQUFTLGFBQUssQUFDWjtxQkFBQSxBQUFPLEtBQVAsQUFBWSxBQUNiO0FBbkJrQixBQUVqQjs7VUFBQSxBQUFLLFFBRlksQUFFakIsQUFBYTtXQUNkOzs7Ozs2QkFpQlEsQUFDUDs2QkFDRSxjQUFBOztvQkFBQTtzQkFBQSxBQUNFO0FBREY7QUFBQSxPQUFBO2FBQ0UsQUFDTSxBQUNKO2NBRkYsQUFFTzs7b0JBRlA7c0JBREYsQUFDRSxBQUlBO0FBSkE7QUFDRSwwQkFHRixjQUFBOztvQkFBQTtzQkFBQTtBQUFBO0FBQUEsU0FMRixBQUtFLEFBQ0EsOENBQUEsQUFBQztlQUFELEFBQ1EsQUFDTjtpQkFBUyxLQUZYLEFBRWdCLEFBQ2Q7aUJBSEYsQUFHVSxBQUNSO2NBSkYsQUFJTyxBQUNMO3VCQUxGLEFBS2dCOztvQkFMaEI7c0JBTkYsQUFNRSxBQU9BO0FBUEE7QUFDRSwwQkFNRCxjQUFELHdCQUFBLEFBQVE7O29CQUFSO3NCQUFBLEFBQ0U7QUFERjtBQUFBLHlCQUNFLEFBQUM7aUJBQUQsQUFFRTtjQUZGLEFBRU8sQUFDTDtpQkFBUyxLQUhYLEFBR2dCLEFBQ2Q7aUJBSkYsQUFJVSxBQUNSO3VCQUxGLEFBS2dCOztvQkFMaEI7c0JBREYsQUFDRSxBQU9BO0FBUEE7QUFDRSwwQkFNRixBQUFDO2VBQUQsQUFDUSxBQUNOO2NBRkYsQUFFTyxBQUNMO2lCQUFTLEtBSFgsQUFHZ0IsQUFDZDtpQkFKRixBQUlVLEFBQ1I7dUJBTEYsQUFLZ0I7O29CQUxoQjtzQkFyQkosQUFhRSxBQVFFLEFBUUY7QUFSRTtBQUNFLDJCQU9ILGNBQUQsd0JBQUEsQUFBUTs7b0JBQVI7c0JBQUEsQUFDRTtBQURGO0FBQUEseUJBQ0UsQUFBQyx5Q0FBTyxVQUFSLE1BQWlCLFNBQVMsS0FBMUIsQUFBK0IsU0FBUyxTQUF4QyxBQUFnRDtvQkFBaEQ7c0JBREYsQUFDRSxBQUNBO0FBREE7d0NBQ0EsQUFBQyx3QkFBRCxBQUFROztvQkFBUjtzQkFGRixBQUVFLEFBQ0E7QUFEQTtBQUFBLDBCQUNBLEFBQUMseUNBQU8sT0FBUixBQUFjLFVBQVMsU0FBUyxLQUFoQyxBQUFxQyxZQUFZLFNBQWpELEFBQXlEO29CQUF6RDtzQkFoQ0osQUE2QkUsQUFHRSxBQUdEO0FBSEM7Z0JBR0QsQUFBSyxNQW5DUixBQW1DYyxBQUNaLDBCQUFBLGNBQUE7O29CQUFBO3NCQUFBO0FBQUE7QUFBQSxTQXJDSixBQUNFLEFBb0NFLEFBR0w7Ozs7O0FBOURrQixBLEFBaUVyQjs7a0JBQUEsQUFBZSIsImZpbGUiOiJMYXlvdXQuanMiLCJzb3VyY2VSb290IjoiRDovT25lRHJpdmUgLSB1emguY2gvRG9jdW1lbnRzL1VuaS9CQS9kQXBwL2RhcHAtcHJvamVjdCJ9