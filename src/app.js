
// @flow

import type { Input,
              Cakes,
              BagResult,
              FullResult } from './types';
import cakes               from './models';
import _                   from 'lodash';
import util                from 'util';


// given a capacity and a number of categories of items with properties of
// weight and value, and also knowing that one can duplicate items from each
// category without limit,
// maximize value without the total weight exceeding the capacity

function max_duffel_bag_value(cakeData: Input): FullResult {

    const { cakes,
            capacity } = cakeData;

    // clone the data so we can freely mutate it,
    // and filter out cakes with 0 value, as we will never put them in the bag
    // but we do want to save them to return
    const valuableCakes  = _.filter(cakes, cake => cake.value > 0);
    const worthlessCakes = _.filter(cakes, cake => cake.value <= 0);


    // Handle the case we have 0 weight and some value cakes.
    // We would stuff our bag with it infinitely for infinite value.
    const zeroWeightCakes = _.filter(valuableCakes, cake => {
        return cake.value / cake.weight === Infinity;
    });

    if (zeroWeightCakes.length > 0) {
        return {
            bag               : _.map(zeroWeightCakes, cake => [cake]),
            totalValue        : Infinity,
            numberOfCakes     : Infinity,
            numberOfCakeTypes : zeroWeightCakes.length,
            worthlessCakes,
            totalCapacity     : capacity,
            remainingCapacity : capacity
        };
    }


    // the big idea:
    // it's based on a value ratio of value to weight. The most valuable stuff
    // gets put in first. Then once we can't put in anymore, we go down the list
    // of stuff with the highest value ratio whose weight is less than the
    // remaining capacity. We keep doing this until we run out of cakes.

    // filter out cakes with 0 weight as we've already handled that case
    const weightedValuableCakes = _.filter(valuableCakes, cake => cake.weight > 0);

    weightedValuableCakes.sort((cakeA, cakeB) => {
        const a = cakeA.value / cakeA.weight;
        const b = cakeB.value / cakeB.weight;
        return a < b;
    });

    console.log('sorted cakes! ', weightedValuableCakes, '\n\n');

    // now that the data is prepared, fill the bag
    const { bag,
            totalValue,
            numberOfCakes,
            remainingCapacity } = fill_the_bag(weightedValuableCakes, capacity);

    return {
        bag,
        totalValue,
        numberOfCakes,
        numberOfCakeTypes : bag.length,
        worthlessCakes,
        totalCapacity     : capacity,
        remainingCapacity
    };
}

function fill_the_bag(cakes: Cakes, capacity: number): BagResult {

    let bag        = [];
    let totalValue = 0;
    // we use categoryIndex so we can return an array of caketype arrays.
    // this secondary index keeps track of that inner index.
    let categoryIndex = 0;

    for (let i = 0; i < cakes.length; i++) {

        // gather the current caketype
        const thisCakeType = cakes[i];

        // did we fill the bag with anything?
        // if so, we'll need to increment the categoryIndex
        let filledTheBag = false;

        // only fill the bag if we have space left
        while (thisCakeType.weight <= capacity) {

            // create the array at this categoryIndex if it doesn't exist
            if (!Array.isArray(bag[categoryIndex])) {
                bag[categoryIndex] = [];
            }

            if (Array.isArray(bag[categoryIndex])) {
                // we're filling the bag!
                filledTheBag = true;
                totalValue  += thisCakeType.value;
                bag[categoryIndex].push(thisCakeType);

                // reduce the remaining space...
                capacity -= thisCakeType.weight;
            }
        }

        if (filledTheBag) categoryIndex++;
    }

    return {
        bag,
        totalValue,
        remainingCapacity : capacity,
        numberOfCakes     : _.reduce(bag, (sum, category) => sum + category.length, 0)
    };
}

const result = max_duffel_bag_value(cakes);

// print the results
_.each(result.bag, (category, index) => {
    console.log(`Cake type index: ${index}\n`);
    _.each(category, cake => {
        console.log( util.inspect(cake, { colors: true }) );
    });
});
delete result.bag;
console.log(`\n`, result);
