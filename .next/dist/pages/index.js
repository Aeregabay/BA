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

var _link = require("../next/link");

var _link2 = _interopRequireDefault(_link);

var _MyProfile = require("./MyProfile");

var _MyProfile2 = _interopRequireDefault(_MyProfile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "D:\\OneDrive - uzh.ch\\Documents\\Uni\\BA\\dApp\\dapp-project\\pages\\index.js?entry";


var App = function (_Component) {
  (0, _inherits3.default)(App, _Component);

  function App(props) {
    (0, _classCallCheck3.default)(this, App);

    var _this = (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).call(this, props));

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
          lineNumber: 29
        }
      }, _react2.default.createElement(_Header2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 30
        }
      }), _react2.default.createElement(_link2.default, { href: "/myprofile", __source: {
          fileName: _jsxFileName,
          lineNumber: 31
        }
      }, _react2.default.createElement("button", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 32
        }
      }, "My Profile")), _react2.default.createElement(_SearchBar2.default, { itemSearch: this.itemSearch.bind(this), __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        }
      }), _react2.default.createElement(_Footer2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 35
        }
      }));
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;
// ReactDOM.render(<App />, document.getElementById("app"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzXFxpbmRleC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIlJlYWN0RE9NIiwiU2VhcmNoQmFyIiwiSGVhZGVyIiwiRm9vdGVyIiwiTGluayIsIk15UHJvZmlsZSIsIkFwcCIsInByb3BzIiwic3RhdGUiLCJzZWFyY2hUZXJtIiwiaXRlbXMiLCJzZWxlY3RlZEl0ZW0iLCJzZXRTdGF0ZSIsImNvbnNvbGUiLCJsb2ciLCJpdGVtU2VhcmNoIiwiYmluZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPLEFBQVM7Ozs7QUFDaEIsQUFBTzs7OztBQUNQLEFBQU8sQUFBZTs7OztBQUN0QixBQUFPLEFBQVk7Ozs7QUFDbkIsQUFBTyxBQUFZOzs7O0FBQ25CLEFBQU8sQUFBVTs7OztBQUVqQixBQUFPLEFBQWU7Ozs7Ozs7OztJLEFBRWhCOytCQUNKOztlQUFBLEFBQVksT0FBTzt3Q0FBQTs7Z0lBQUEsQUFDWCxBQUNOOztVQUFBLEFBQUs7a0JBQVEsQUFDQyxBQUNaO2FBRlcsQUFFSixBQUNQO29CQUxlLEFBRWpCLEFBQWEsQUFHRztBQUhILEFBQ1g7V0FJSDs7Ozs7K0IsQUFFVSxZQUFZLEFBQ3JCO1dBQUEsQUFBSztvQkFBTCxBQUFjLEFBR2Q7QUFIYyxBQUNaO2NBRUYsQUFBUSxJQUFJLEtBQUEsQUFBSyxNQUFqQixBQUF1QixBQUN4Qjs7Ozs2QkFFUSxBQUNQOzZCQUNFLGNBQUE7O29CQUFBO3NCQUFBLEFBQ0U7QUFERjtBQUFBLE9BQUEsa0JBQ0UsQUFBQzs7b0JBQUQ7c0JBREYsQUFDRSxBQUNBO0FBREE7QUFBQSwwQkFDQSxBQUFDLGdDQUFLLE1BQU4sQUFBVztvQkFBWDtzQkFBQSxBQUNFO0FBREY7eUJBQ0UsY0FBQTs7b0JBQUE7c0JBQUE7QUFBQTtBQUFBLFNBSEosQUFFRSxBQUNFLEFBRUYsZ0NBQUEsQUFBQyxxQ0FBVSxZQUFZLEtBQUEsQUFBSyxXQUFMLEFBQWdCLEtBQXZDLEFBQXVCLEFBQXFCO29CQUE1QztzQkFMRixBQUtFLEFBQ0E7QUFEQTswQkFDQSxBQUFDOztvQkFBRDtzQkFQSixBQUNFLEFBTUUsQUFHTDtBQUhLO0FBQUE7Ozs7O0EsQUF6QlUsQUErQmxCOztrQkFBQSxBQUFlO0FBQ2YiLCJmaWxlIjoiaW5kZXguanM/ZW50cnkiLCJzb3VyY2VSb290IjoiRDovT25lRHJpdmUgLSB1emguY2gvRG9jdW1lbnRzL1VuaS9CQS9kQXBwL2RhcHAtcHJvamVjdCJ9