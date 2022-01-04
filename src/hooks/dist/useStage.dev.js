"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStage = void 0;

var _react = require("react");

var _gameHelpers = require("../gameHelpers");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useStage = function useStage(player, resetPlayer) {
  var _useState = (0, _react.useState)((0, _gameHelpers.createStage)()),
      _useState2 = _slicedToArray(_useState, 2),
      stage = _useState2[0],
      setStage = _useState2[1];

  (0, _react.useEffect)(function () {
    var updateStage = function updateStage(prevStage) {
      var newStage = prevStage.map(function (row) {
        return row.map(function (cell) {
          return cell[1] === 'clear' ? [0, 'clear'] : cell;
        });
      });
      player.tetromino.forEach(function (row, y) {
        row.forEach(function (value, x) {
          if (value !== 0) {
            newStage[y + player.pos.y][x = player.pos.x] = [value, "".concat(player.collided ? 'marged' : 'clear')];
          }
        });
      });
      console.log(newStage);
      return newStage;
    };

    setStage(function (prev) {
      return updateStage(prev);
    });
  }, [player.collided, player.pos.x, player.pos.y, player.tetromino]);
  return [stage, setStage];
};

exports.useStage = useStage;