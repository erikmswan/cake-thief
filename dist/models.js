'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


// input with edge case of 0 value cakes

var cakes = {
    capacity: 40.5,
    cakes: [{ weight: 2.4, value: 60 }, { weight: 9.6, value: 50 }, { weight: 4.1, value: 40 }, { weight: 8.9, value: 20 }, { weight: 3, value: 70 }, { weight: 20.1, value: 0 }, { weight: 15, value: 0 }, { weight: 13, value: 0 }]
};

// input with edge case of 0 weight cakes

// const cakes: Input = {
//     capacity : 40,
//     cakes    : [
//         { weight: 2, value: 60 },
//         { weight: 9, value: 50 },
//         { weight: 4, value: 40 },
//         { weight: 8, value: 20 },
//         { weight: 3, value: 70 },
//         { weight: 20, value: 0 },
//         { weight: 15, value: 0 },
//         { weight: 13, value: 0 },
//         { weight: 0, value: 1 },
//         { weight: 0, value: 5 },
//         { weight: 0, value: 9 }
//     ]
// };


// input with edge case of both 0 weight and 0 value cakes

// const cakes: Input = {
//     capacity : 40,
//     cakes    : [
//         { weight: 2, value: 60 },
//         { weight: 9, value: 50 },
//         { weight: 4, value: 40 },
//         { weight: 8, value: 20 },
//         { weight: 3, value: 70 },
//         { weight: 20, value: 0 },
//         { weight: 15, value: 0 },
//         { weight: 13, value: 0 },
//         { weight: 0, value: 0 },
//         { weight: 0, value: 0 }
//     ]
// };


// input with edge case of 0 capacity

// const cakes: Input = {
//     capacity : 0,
//     cakes    : [
//         { weight: 2, value: 60 },
//         { weight: 9, value: 50 },
//         { weight: 4, value: 40 },
//         { weight: 8, value: 20 },
//         { weight: 3, value: 70 },
//         { weight: 20, value: 0 },
//         { weight: 15, value: 0 },
//         { weight: 13, value: 0 }
//     ]
// };

exports.default = cakes;