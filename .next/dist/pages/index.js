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

var _SearchBar = require("../components/SearchBar");

var _SearchBar2 = _interopRequireDefault(_SearchBar);

var _Layout = require("../components/Layout");

var _Layout2 = _interopRequireDefault(_Layout);

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
      return _react2.default.createElement(_Layout2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        }
      }, _react2.default.createElement(_SearchBar2.default, { itemSearch: this.itemSearch.bind(this), __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        }
      }));
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;
// ReactDOM.render(<App />, document.getElementById("app"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzXFxpbmRleC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIlNlYXJjaEJhciIsIkxheW91dCIsIkFwcCIsInByb3BzIiwic3RhdGUiLCJzZWFyY2hUZXJtIiwiaXRlbXMiLCJzZWxlY3RlZEl0ZW0iLCJzZXRTdGF0ZSIsImNvbnNvbGUiLCJsb2ciLCJpdGVtU2VhcmNoIiwiYmluZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPLEFBQVM7Ozs7QUFDaEIsQUFBTyxBQUFlOzs7O0FBRXRCLEFBQU8sQUFBWTs7Ozs7Ozs7O0ksQUFFYjsrQkFDSjs7ZUFBQSxBQUFZLE9BQU87d0NBQUE7O2dJQUFBLEFBQ1gsQUFDTjs7VUFBQSxBQUFLO2tCQUFRLEFBQ0MsQUFDWjthQUZXLEFBRUosQUFDUDtvQkFMZSxBQUVqQixBQUFhLEFBR0c7QUFISCxBQUNYO1dBSUg7Ozs7OytCLEFBRVUsWUFBWSxBQUNyQjtXQUFBLEFBQUs7b0JBQUwsQUFBYyxBQUdkO0FBSGMsQUFDWjtjQUVGLEFBQVEsSUFBSSxLQUFBLEFBQUssTUFBakIsQUFBdUIsQUFDeEI7Ozs7NkJBRVEsQUFDUDs2QkFDRSxBQUFDOztvQkFBRDtzQkFBQSxBQUNFO0FBREY7QUFBQSxPQUFBLGtCQUNFLEFBQUMscUNBQVUsWUFBWSxLQUFBLEFBQUssV0FBTCxBQUFnQixLQUF2QyxBQUF1QixBQUFxQjtvQkFBNUM7c0JBRkosQUFDRSxBQUNFLEFBR0w7QUFISzs7Ozs7O0FBcEJVLEEsQUEwQmxCOztrQkFBQSxBQUFlO0FBQ2YiLCJmaWxlIjoiaW5kZXguanM/ZW50cnkiLCJzb3VyY2VSb290IjoiRDovT25lRHJpdmUgLSB1emguY2gvRG9jdW1lbnRzL1VuaS9CQS9kQXBwL2RhcHAtcHJvamVjdCJ9