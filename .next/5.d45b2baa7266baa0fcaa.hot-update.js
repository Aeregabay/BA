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
          lineNumber: 28
        }
      }, _react2.default.createElement(_Header2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        }
      }), _react2.default.createElement(Link, { href: "/myprofile", __source: {
          fileName: _jsxFileName,
          lineNumber: 30
        }
      }, _react2.default.createElement("button", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31
        }
      }, "My Profile")), _react2.default.createElement(_SearchBar2.default, { itemSearch: this.itemSearch.bind(this), __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        }
      }), _react2.default.createElement(_Footer2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        }
      }));
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;
// ReactDOM.render(<App />, document.getElementById("app"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzXFxpbmRleC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIlJlYWN0RE9NIiwiU2VhcmNoQmFyIiwiSGVhZGVyIiwiRm9vdGVyIiwiTXlQcm9maWxlIiwiQXBwIiwicHJvcHMiLCJzdGF0ZSIsInNlYXJjaFRlcm0iLCJpdGVtcyIsInNlbGVjdGVkSXRlbSIsInNldFN0YXRlIiwiY29uc29sZSIsImxvZyIsIml0ZW1TZWFyY2giLCJiaW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUzs7OztBQUNoQixBQUFPOzs7O0FBQ1AsQUFBTyxBQUFlOzs7O0FBQ3RCLEFBQU8sQUFBWTs7OztBQUNuQixBQUFPLEFBQVk7Ozs7QUFFbkIsQUFBTyxBQUFlOzs7Ozs7Ozs7SUFFaEIsQTsrQkFDSjs7ZUFBQSxBQUFZLE9BQU87d0NBQUE7O2dJQUFBLEFBQ1gsQUFDTjs7VUFBQSxBQUFLO2tCQUFRLEFBQ0MsQUFDWjthQUZXLEFBRUosQUFDUDtvQkFMZSxBQUVqQixBQUFhLEFBR0c7QUFISCxBQUNYO1dBSUg7Ozs7OytCQUVVLEEsWUFBWSxBQUNyQjtXQUFBLEFBQUs7b0JBQUwsQUFBYyxBQUdkO0FBSGMsQUFDWjtjQUVGLEFBQVEsSUFBSSxLQUFBLEFBQUssTUFBakIsQUFBdUIsQUFDeEI7Ozs7NkJBRVEsQUFDUDs2QkFDRSxjQUFBOztvQkFBQTtzQkFBQSxBQUNFO0FBREY7QUFBQSxPQUFBLGtCQUNFLEFBQUM7O29CQUFEO3NCQURGLEFBQ0UsQUFDQTtBQURBO0FBQUEsMEJBQ0MsY0FBRCxRQUFNLE1BQU4sQUFBVztvQkFBWDtzQkFBQSxBQUNFO0FBREY7eUJBQ0UsY0FBQTs7b0JBQUE7c0JBQUE7QUFBQTtBQUFBLFNBSEosQUFFRSxBQUNFLEFBRUYsZ0NBQUEsQUFBQyxxQ0FBVSxZQUFZLEtBQUEsQUFBSyxXQUFMLEFBQWdCLEtBQXZDLEFBQXVCLEFBQXFCO29CQUE1QztzQkFMRixBQUtFLEFBQ0E7QUFEQTswQkFDQSxBQUFDOztvQkFBRDtzQkFQSixBQUNFLEFBTUUsQUFHTDtBQUhLO0FBQUE7Ozs7O0EsQUF6QlUsQUErQmxCOztrQkFBQSxBQUFlO0FBQ2YiLCJmaWxlIjoiaW5kZXguanM/ZW50cnkiLCJzb3VyY2VSb290IjoiRDovT25lRHJpdmUgLSB1emguY2gvRG9jdW1lbnRzL1VuaS9CQS9kQXBwL2RhcHAtcHJvamVjdCJ9

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS5kNDViMmJhYTcyNjZiYWEwZmNhYS5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGFnZXM/YmRmODI4OSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XHJcbmltcG9ydCBTZWFyY2hCYXIgZnJvbSBcIi4uL2NvbXBvbmVudHMvU2VhcmNoQmFyXCI7XHJcbmltcG9ydCBIZWFkZXIgZnJvbSBcIi4uL2NvbXBvbmVudHMvSGVhZGVyXCI7XHJcbmltcG9ydCBGb290ZXIgZnJvbSBcIi4uL2NvbXBvbmVudHMvRm9vdGVyXCI7XHJcblxyXG5pbXBvcnQgTXlQcm9maWxlIGZyb20gXCIuL015UHJvZmlsZVwiO1xyXG5cclxuY2xhc3MgQXBwIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgc2VhcmNoVGVybTogXCJcIixcclxuICAgICAgaXRlbXM6IFtdLFxyXG4gICAgICBzZWxlY3RlZEl0ZW06IG51bGxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBpdGVtU2VhcmNoKHNlYXJjaFRlcm0pIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBzZWFyY2hUZXJtXHJcbiAgICB9KTtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUuc2VhcmNoVGVybSk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxIZWFkZXIgLz5cclxuICAgICAgICA8TGluayBocmVmPVwiL215cHJvZmlsZVwiPlxyXG4gICAgICAgICAgPGJ1dHRvbj5NeSBQcm9maWxlPC9idXR0b24+XHJcbiAgICAgICAgPC9MaW5rPlxyXG4gICAgICAgIDxTZWFyY2hCYXIgaXRlbVNlYXJjaD17dGhpcy5pdGVtU2VhcmNoLmJpbmQodGhpcyl9IC8+XHJcbiAgICAgICAgPEZvb3RlciAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcHA7XHJcbi8vIFJlYWN0RE9NLnJlbmRlcig8QXBwIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcFwiKSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3BhZ2VzP2VudHJ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUNBO0FBQ0E7Ozs7Ozs7OztBQUVBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFFQTtBQUNBO0FBQUE7QUFGQTtBQUlBOzs7OztBQUdBO0FBQUE7QUFHQTtBQUZBO0FBRUE7Ozs7QUFJQTtBQUNBOztBQUFBO0FBQ0E7QUFEQTtBQUFBOztBQUNBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBREE7QUFDQTs7QUFBQTtBQUdBO0FBSEE7QUFBQTs7Ozs7OztBQU1BO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==