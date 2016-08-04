// Generated by CoffeeScript 1.10.0
(function() {
  var identifyVars, isLabelKey, parseUri, parseValue,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  module.exports = function(input) {
    var ref, results, varName, vars, varsWithLabel, varsWithout;
    if (typeof input === 'string') {
      input = JSON.parse(input);
    }
    vars = input.head.vars;
    results = input.results.bindings;
    if (vars.length === 1) {
      varName = vars[0];
      return results.map(function(result) {
        return parseValue(result[varName]);
      }).filter(function(result) {
        return result != null;
      });
    } else {
      ref = identifyVars(vars), varsWithLabel = ref[0], varsWithout = ref[1];
      return results.map(function(result) {
        var i, j, len, len1, simpifiedResult;
        simpifiedResult = {};
        for (i = 0, len = varsWithLabel.length; i < len; i++) {
          varName = varsWithLabel[i];
          simpifiedResult[varName] = {
            value: parseValue(result[varName]),
            label: result[varName + "Label"].value
          };
        }
        for (j = 0, len1 = varsWithout.length; j < len1; j++) {
          varName = varsWithout[j];
          simpifiedResult[varName] = parseValue(result[varName]);
        }
        return simpifiedResult;
      });
    }
  };

  parseValue = function(valueObj) {
    if (valueObj == null) {
      return;
    }
    switch (valueObj.type) {
      case 'uri':
        return parseUri(valueObj.value);
      case 'bnode':
        return null;
      default:
        switch (valueObj.datatype.replace('http://www.w3.org/2001/XMLSchema#', '')) {
          case 'decimal':
          case 'integer':
          case 'float':
          case 'double':
            return parseFloat(valueObj.value);
          case 'boolean':
            return valueObj.value === 'true';
          default:
            return valueObj.value;
        }
    }
  };

  parseUri = function(uri) {
    return uri.replace('http://www.wikidata.org/entity/', '');
  };

  isLabelKey = function(key) {
    return /^\w+Label$/.test(key);
  };

  identifyVars = function(vars) {
    var i, len, ref, varName, varsWithLabel, varsWithoutLabel;
    varsWithLabel = [];
    varsWithoutLabel = [];
    for (i = 0, len = vars.length; i < len; i++) {
      varName = vars[i];
      if (ref = varName + "Label", indexOf.call(vars, ref) >= 0) {
        varsWithLabel.push(varName);
      } else if (!/^\w+Label$/.test(varName)) {
        varsWithoutLabel.push(varName);
      }
    }
    return [varsWithLabel, varsWithoutLabel];
  };

}).call(this);
