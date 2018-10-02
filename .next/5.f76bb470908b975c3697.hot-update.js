webpackHotUpdate(5,{

/***/ 384:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(41);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(42);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(46);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(348);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _SearchBar = __webpack_require__(385);

var _SearchBar2 = _interopRequireDefault(_SearchBar);

var _Header = __webpack_require__(386);

var _Header2 = _interopRequireDefault(_Header);

var _Footer = __webpack_require__(387);

var _Footer2 = _interopRequireDefault(_Footer);

var _link = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../next/link\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _link2 = _interopRequireDefault(_link);

var _MyProfile = __webpack_require__(388);

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

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "D:\\OneDrive - uzh.ch\\Documents\\Uni\\BA\\dApp\\dapp-project\\pages\\index.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\OneDrive - uzh.ch\\Documents\\Uni\\BA\\dApp\\dapp-project\\pages\\index.js"); } } })();
    (function (Component, route) {
      if (false) return
      if (false) return

      var qs = __webpack_require__(84)
      var params = qs.parse(__resourceQuery.slice(1))
      if (params.entry == null) return

      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/")
  
/* WEBPACK VAR INJECTION */}.call(exports, "?entry"))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS5mNzZiYjQ3MDkwOGI5NzVjMzY5Ny5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGFnZXM/ODdiMDU2MSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XHJcbmltcG9ydCBTZWFyY2hCYXIgZnJvbSBcIi4uL2NvbXBvbmVudHMvU2VhcmNoQmFyXCI7XHJcbmltcG9ydCBIZWFkZXIgZnJvbSBcIi4uL2NvbXBvbmVudHMvSGVhZGVyXCI7XHJcbmltcG9ydCBGb290ZXIgZnJvbSBcIi4uL2NvbXBvbmVudHMvRm9vdGVyXCI7XHJcbmltcG9ydCBMaW5rIGZyb20gXCIuLi9uZXh0L2xpbmtcIjtcclxuXHJcbmltcG9ydCBNeVByb2ZpbGUgZnJvbSBcIi4vTXlQcm9maWxlXCI7XHJcblxyXG5jbGFzcyBBcHAgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBzZWFyY2hUZXJtOiBcIlwiLFxyXG4gICAgICBpdGVtczogW10sXHJcbiAgICAgIHNlbGVjdGVkSXRlbTogbnVsbFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGl0ZW1TZWFyY2goc2VhcmNoVGVybSkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIHNlYXJjaFRlcm1cclxuICAgIH0pO1xyXG4gICAgY29uc29sZS5sb2codGhpcy5zdGF0ZS5zZWFyY2hUZXJtKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPEhlYWRlciAvPlxyXG4gICAgICAgIDxMaW5rIGhyZWY9XCIvbXlwcm9maWxlXCI+XHJcbiAgICAgICAgICA8YnV0dG9uPk15IFByb2ZpbGU8L2J1dHRvbj5cclxuICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgPFNlYXJjaEJhciBpdGVtU2VhcmNoPXt0aGlzLml0ZW1TZWFyY2guYmluZCh0aGlzKX0gLz5cclxuICAgICAgICA8Rm9vdGVyIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcDtcclxuLy8gUmVhY3RET00ucmVuZGVyKDxBcHAgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwXCIpKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcGFnZXM/ZW50cnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7Ozs7O0FBRUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUVBO0FBQ0E7QUFBQTtBQUZBO0FBSUE7Ozs7O0FBR0E7QUFBQTtBQUdBO0FBRkE7QUFFQTs7OztBQUlBO0FBQ0E7O0FBQUE7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFDQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFEQTtBQUNBOztBQUFBO0FBR0E7QUFIQTtBQUFBOzs7Ozs7O0FBTUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBIiwic291cmNlUm9vdCI6IiJ9