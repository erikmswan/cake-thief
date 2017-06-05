
// @flow

// TYPES


// Data models

type Cake  = [number, number];
type Cakes = Array<Cake>;

type DataModel = {
    capacity : number,
    cakes    : Cakes
};

type ResultModel = {
    cakes             : Cakes,
    totalValue        : number,
    numberOfCakes     : number,
    numberOfCakeTypes : number,
    capacity          : number
};

export type {
    DataModel,
    ResultModel
};
