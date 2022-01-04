"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePlayer = void 0;

var _react = require("react");

var _gameHelpers = require("../gameHelpers");

var _tetrominos = require("../tetrominos");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var usePlayer = function usePlayer() {
  var _useState = (0, _react.useState)({
    pos: {
      x: 0,
      y: 0
    },
    tetromino: (0, _tetrominos.randomTetromino)().shape,
    collided: false
  }),
      _useState2 = _slicedToArray(_useState, 2),
      player = _useState2[0],
      setPlayer = _useState2[1];

  var updatePlayerPos = function updatePlayerPos(_ref) {
    var x = _ref.x,
        y = _ref.y,
        collided = _ref.collided;
    setPlayer(function (prev) {
      return _objectSpread({}, prev, {
        pos: {
          x: prev.pos.x += x,
          y: prev.pos.y += y
        },
        collided: collided
      });
    });
  };

  var resetPlayer = (0, _react.useCallback)(function () {
    setPlayer({
      pos: {
        x: _gameHelpers.STAGE_WIDTH / 2 - 2,
        y: 0
      },
      tetromino: (0, _tetrominos.randomTetromino)().shape,
      collided: false
    });
  }, []);
  console.log((0, _tetrominos.randomTetromino)());
  return [player, updatePlayerPos, resetPlayer];
};

exports.usePlayer = usePlayer;