/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(1);
const UsersSearch = __webpack_require__(3);
$(document).ready(() => {
  $('button.follow-toggle').each((idx, el) => { new FollowToggle(el); });
  $('nav.users-search').each((idx, el) => { new UsersSearch(el); });
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtils = __webpack_require__(2);

class FollowToggle {
  constructor(el) {
    this.$el = $(el);
    this.userId = this.$el.attr("data-user-id");
    this.followState = this.$el.attr("data-initial-follow-state");
    this.disabled = false;
    if (this.followState === "false") {
      this.followState = false;
    } else {
      this.followState = true;
    }
    this.$el.on('click', (e) => this.handleClick(e));
    this.render();
  }

  render() {
    console.log(this.followState === false);
    if (this.followState === false) {
      this.$el.text('Follow!');
    } else {
      this.$el.text('Unfollow!');
    }
    this.$el.prop('disabled', this.disabled);
  }

  async handleClick(e) {
    e.preventDefault();
    this.disabled = true;
    this.render();
    if (this.followState) {
    await  APIUtils.unfollowUser(this.userId);
    } else {
    await  APIUtils.followUser(this.userId);
    }
    this.followState = !this.followState;
    this.disabled = false;
    this.render();
  }

}


module.exports = FollowToggle;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const APIUtil = {
  followUser: id => {
    $.ajax({
      url: `/users/${id}/follow`,
      type: 'POST',
      dataType: 'json',
      });

  },

  unfollowUser: id => {
    $.ajax({
      url: `/users/${id}/follow`,
      type: 'DELETE',
      dataType: 'json',
      });
  }
};

module.exports = APIUtil;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

class UsersSearch {
  constructor(el) {
    this.$el = $(el);
    this.$input = $(`${el} > label > input`);
    console.log(this.$input);
    console.log("working");
  }
}
module.exports = UsersSearch;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map