"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helperPluginUtils = require("@babel/helper-plugin-utils");

var defineMap = require("@babel/helper-define-map");

var _core = require("@babel/core");

var _default = (0, _helperPluginUtils.declare)(api => {
  api.assertVersion(7);
  return {
    name: "transform-property-mutators",
    visitor: {
      ObjectExpression(path, file) {
        const {
          node
        } = path;
        let hasAny = false;

        for (const prop of node.properties) {
          if (prop.kind === "get" || prop.kind === "set") {
            hasAny = true;
            break;
          }
        }

        if (!hasAny) return;
        const mutatorMap = {};
        node.properties = node.properties.filter(function (prop) {
          if (!prop.computed && (prop.kind === "get" || prop.kind === "set")) {
            defineMap.push(mutatorMap, prop, null, file);
            return false;
          } else {
            return true;
          }
        });
        path.replaceWith(_core.types.callExpression(_core.types.memberExpression(_core.types.identifier("Object"), _core.types.identifier("defineProperties")), [node, defineMap.toDefineObject(mutatorMap)]));
      }

    }
  };
});

exports.default = _default;