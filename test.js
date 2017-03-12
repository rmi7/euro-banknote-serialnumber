"use strict"

const chai = require("chai")
const expect = chai.expect

const euroBanknoteSN = require("./")

const VALID_SERIALNUMBERS_SERIES1 = [
    "X55266826871",
    "U77882681066",
    "Z74542963239",
    "L40424180045",
    "L25388047085",
    "X30284111711",
    "Z34108189488",
    "l25388047085"
]

const VALID_SERIALNUMBERS_SERIES2 = [
    "NA4532489209",
    "VA0436214792",
    "vA0436214792",
    "Va0436214792",
    "va0436214792"
]

const INVALID_SERIALNUMBERS = [
    "A25388047085",
    "L25388049086",
    "Z34108189460",
    "X00000000000",
    "Z3410818948",
    "34108189488",
    "ZA34108189488",
    "VAA436214792",
    "VA043621479",
    "a string"
]

const NOT_A_STRING = [
    "",
    0,
    7,
    false,
    true,
    undefined,
    null,
    Infinity,
    NaN,
    [],
    ["a"],
    {},
    {"a":1},
    function(){}
]

describe("euro-banknote-serialnumber", () => {
    INVALID_SERIALNUMBERS.forEach((val) => {
        it(`fails for invalid serialnumber (series 1): ${val}`, () => {
            expect(euroBanknoteSN.verify(val)).to.equal(false)
        })
    })

    NOT_A_STRING.forEach((val) => {
        it(`fails for values that are not a valid string: ${val}`, () => {
            expect(euroBanknoteSN.verify(val)).to.equal(false)
        })
    })

    VALID_SERIALNUMBERS_SERIES1.forEach((val) => {
        it(`succeeds for valid serialnumber (series 1): ${val}`, () => {
            expect(euroBanknoteSN.verify(val)).to.equal(true)
        })
    })

    VALID_SERIALNUMBERS_SERIES2.forEach((val) => {
        it(`succeeds for valid serialnumber (series 2): ${val}`, () => {
            expect(euroBanknoteSN.verify(val)).to.equal(true)
        })
    })
})
