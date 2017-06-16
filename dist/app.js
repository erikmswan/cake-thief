'use strict';

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// given a capacity and a number of categories of items with properties of
// weight and value, and also knowing that one can duplicate items from each
// category without limit,
// maximize value without the total weight exceeding the capacity

function max_duffel_bag_value(cakeData) {
    var cakes = cakeData.cakes,
        capacity = cakeData.capacity;

    // clone the data so we can freely mutate it,
    // and filter out cakes with 0 value, as we will never put them in the bag
    // but we do want to save them to return

    var valuableCakes = _lodash2.default.filter(cakes, function (cake) {
        return cake.value > 0;
    });
    var worthlessCakes = _lodash2.default.filter(cakes, function (cake) {
        return cake.value <= 0;
    });

    // Handle the case we have 0 weight and some value cakes.
    // We would stuff our bag with it infinitely for infinite value.
    var zeroWeightCakes = _lodash2.default.filter(valuableCakes, function (cake) {
        return cake.value / cake.weight === Infinity;
    });

    if (zeroWeightCakes.length > 0) {
        return {
            bag: _lodash2.default.map(zeroWeightCakes, function (cake) {
                return [cake];
            }),
            totalValue: Infinity,
            numberOfCakes: Infinity,
            numberOfCakeTypes: zeroWeightCakes.length,
            worthlessCakes: worthlessCakes,
            totalCapacity: capacity,
            remainingCapacity: capacity
        };
    }

    // the big idea:
    // it's based on a value ratio of value to weight. The most valuable stuff
    // gets put in first. Then once we can't put in anymore, we go down the list
    // of stuff with the highest value ratio whose weight is less than the
    // remaining capacity. We keep doing this until we run out of cakes.

    // filter out cakes with 0 weight as we've already handled that case
    var weightedValuableCakes = _lodash2.default.filter(valuableCakes, function (cake) {
        return cake.weight > 0;
    });

    weightedValuableCakes.sort(function (cakeA, cakeB) {
        var a = cakeA.value / cakeA.weight;
        var b = cakeB.value / cakeB.weight;
        return a < b;
    });

    // now that the data is prepared, fill the bag

    var _fill_the_bag = fill_the_bag(weightedValuableCakes, capacity),
        bag = _fill_the_bag.bag,
        totalValue = _fill_the_bag.totalValue,
        numberOfCakes = _fill_the_bag.numberOfCakes,
        remainingCapacity = _fill_the_bag.remainingCapacity;

    return {
        bag: bag,
        totalValue: totalValue,
        numberOfCakes: numberOfCakes,
        numberOfCakeTypes: bag.length,
        worthlessCakes: worthlessCakes,
        totalCapacity: capacity,
        remainingCapacity: remainingCapacity
    };
}

function fill_the_bag(cakes, capacity) {

    var bag = [];
    var totalValue = 0;
    // we use categoryIndex so we can return an array of caketype arrays.
    // this secondary index keeps track of that inner index.
    var categoryIndex = 0;

    for (var i = 0; i < cakes.length; i++) {

        // gather the current caketype
        var thisCakeType = cakes[i];

        // did we fill the bag with anything?
        // if so, we'll need to increment the categoryIndex
        var filledTheBag = false;

        // only fill the bag if we have space left
        while (thisCakeType.weight <= capacity) {

            // create the array at this categoryIndex if it doesn't exist
            if (!Array.isArray(bag[categoryIndex])) {
                bag[categoryIndex] = [];
            }

            if (Array.isArray(bag[categoryIndex])) {
                // we're filling the bag!
                filledTheBag = true;
                totalValue += thisCakeType.value;
                bag[categoryIndex].push(thisCakeType);

                // reduce the remaining space...
                capacity -= thisCakeType.weight;
            }
        }

        if (filledTheBag) categoryIndex++;
    }

    return {
        bag: bag,
        totalValue: totalValue,
        remainingCapacity: capacity,
        numberOfCakes: _lodash2.default.reduce(bag, function (sum, category) {
            return sum + category.length;
        }, 0)
    };
}

var result = max_duffel_bag_value(_models2.default);

// print the results
console.log('\nThe input:\n\n', _models2.default.cakes);
console.log('\nTotal capacity: ' + _models2.default.capacity + '\n');
console.log('\nThe output:\n');
_lodash2.default.each(result.bag, function (category, index) {
    console.log('Cake type index: ' + index);
    _lodash2.default.each(category, function (cake) {
        console.log(_util2.default.inspect(cake, { colors: true }));
    });
    console.log('\n');
});
delete result.bag;
console.log(result);