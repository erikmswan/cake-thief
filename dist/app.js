'use strict';

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// our main function

// given a capacity and a number of categories of items with properties of
// weight and value, and also knowing that one can duplicate items from each
// category without limit,
// maximize value without the total weight exceeding the capacity

function max_duffel_bag_value(cakeData) {
    var cakes = cakeData.cakes,
        capacity = cakeData.capacity;

    var newCakeData = _lodash2.default.cloneDeep(cakes);

    // handle the case where we have a cake with 0 weight or 0 value
    var zeroWeightItem = [];
    // handle the case where nothing can fit in the capacity;
    var canCarryAtLeastOneThing = false;

    _lodash2.default.each(newCakeData, function (cake) {
        var weight = cake[0];

        // if the weight is less than capacity, then we can carry at least
        // one thing
        // console.log(weight, capacity);
        if (weight < capacity) {
            canCarryAtLeastOneThing = true;
        }

        // if 0 weight, push this item to the zeroWeightItem array
        if (weight === 0) {
            zeroWeightItem.push(cake);
        }
    });

    // if we can't carry anything, return nothing
    if (!canCarryAtLeastOneThing) {
        return {
            cakes: [],
            totalValue: 0,
            numberOfCakes: 0,
            numberOfCakeTypes: 0,
            capacity: capacity
        };
    }

    // if we found a zero weight item, we just duplicate it infinite times for
    // infinite value.
    if (zeroWeightItem.length > 0) {
        return {
            cakes: zeroWeightItem,
            totalValue: Infinity,
            numberOfCakes: Infinity,
            numberOfCakeTypes: 1,
            capacity: capacity
        };
    }

    // and now, the actual logic


    // base case so we return the expected type
    return {
        cakes: [],
        totalValue: 0,
        numberOfCakes: 0,
        numberOfCakeTypes: 0,
        capacity: capacity
    };
}

console.log(max_duffel_bag_value(_models2.default));