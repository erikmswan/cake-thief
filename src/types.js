
// @flow



// Input

export type Cake  = { weight: number, value: number };
export type Cakes = Array<Cake>;

export type Input = {
    capacity : number,
    cakes    : Cakes
};



// Output

export type ResultCakes = Array<?Cakes>;

export type BagResult = {
    bag               : ResultCakes,
    totalValue        : number,
    numberOfCakes     : number,
    remainingCapacity : number
};

export type FullResult = BagResult & {
    totalCapacity     : number,
    numberOfCakeTypes : number
};
