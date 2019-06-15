'use strict'

const assert = require('assert');
const ServerResponse = require('http').ServerResponse;

module.exports = beforeResponse;

/**
 * hook before koa response.
 * 
 * @param {Object} options
 * @return {Function}
 * @api public
 */

function beforeResponse(options) {
  options = options || {};
  options.beforeResponse = options.beforeResponse || function () { };
  assert(typeof options.beforeResponse === 'function', 'options.beforeResponse should be a function!');

  return function (ctx, next) {

    const end = ServerResponse.prototype.end;
    // hack end
    ctx.res.end = function (chunk, encoding, callback) {
      let _callback = function () {
        options.beforeResponse(ctx);
      }
      const argument = [chunk, encoding, callback].reduce((result, cur) => {
        if (cur === undefined) return result;
        if (typeof cur === 'function') {
          result[0] = function () {
            cur();
            options.beforeResponse(ctx);
          };
          return result;
        }
        result.push(cur);
        return result;
      },
        [_callback]
      );
      argument.push(argument.shift());
      return end.apply(this, argument);
    }
    next();
  }
}