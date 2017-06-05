
// @flow

import type { DataModel,
              ResultModel } from './types';
import cakes                from './models';
import _                    from 'lodash';


// our main function

// given a capacity and a number of categories of items with properties of
// weight and value, and also knowing that one can duplicate items from each
// category without limit,
// maximize value without the total weight exceeding the capacity

function max_duffel_bag_value(cakeData: DataModel): ResultModel {

    const { cakes,
            capacity } = cakeData;

    // clone the data so we can freely mutate it,
    // and filter out cakes with 0 value
    const newCakeData  = _.filter(cakes, cake => cake[1] > 0);


    // it's based on a value ratio of value to weight. The most valuable stuff
    // gets put in first. Then once we can't put in anymore, we go down the list
    // of stuff with the highest value ratio whose weight is less than the
    // remaining capacity. We keep doing this until we run out of cakes.

    newCakeData.sort((cakeA, cakeB) => {
        // value / weight
        const a = cakeA[1] / cakeA[0];
        const b = cakeB[1] / cakeB[0];

        return a < b;
    });

    console.log(newCakeData);

    // Now we do the cascade to fill our bag.


    // Handle the case we have 0 weight and some value cakes
    // const zeroWeightItems = _.filter(newCakeData, cake => {
    //     return cake[1] / cake[0] === Infinity;
    // });
    //
    // if (zeroWeightItems.length > 0) {
    //     return {
    //         cakes             : zeroWeightItems,
    //         totalValue        : Infinity,
    //         numberOfCakes     : Infinity,
    //         numberOfCakeTypes : zeroWeightItems.length,
    //         capacity
    //     };
    // }








    // base case so we return the expected type
    return {
        cakes             : [],
        totalValue        : 0,
        numberOfCakes     : 0,
        numberOfCakeTypes : 0,
        capacity
    };
}

console.log(max_duffel_bag_value(cakes));
