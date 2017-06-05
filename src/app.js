
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

    const { cakes, capacity } = cakeData;
    const newCakeData  = _.cloneDeep(cakeData);

    // handle the case where we have a cake with 0 weight or 0 value
    let zeroWeightItem = [];
    // handle the case where nothing can fit in the capacity;
    let canCarryAtLeastOneThing = false;

    _.each(newCakeData, cake => {

        const weight = cake[0];

        // if the weight is less than capacity, then we can carry at least
        // one thing
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
            cakes             : [],
            totalValue        : 0,
            numberOfCakes     : 0,
            numberOfCakeTypes : 0,
            capacity
        };
    }

    // if we found a zero weight item, we just duplicate it infinite times for
    // infinite value.
    if (zeroWeightItem.length > 0) {
        return {
            cakes             : zeroWeightItem,
            totalValue        : Infinity,
            numberOfCakes     : Infinity,
            numberOfCakeTypes : 1,
            capacity
        };
    }



    // and now, the actual logic



}

max_duffel_bag_value(cakes);
