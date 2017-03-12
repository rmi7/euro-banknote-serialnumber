#!/usr/bin/env node
"use strict"

// serialnumber starts with an allowed alphabetic character at index 0
// series 1 has a number at index 1, series 2 has a alphabetic character at index 1
// the remaining 10 characters are always numeric
const SERIALNUMBER_REGEX = /^([D-HL-NPS-VX-Z])([0-9]|[A-Z])([0-9]{10}$)/i

const getChecksum = (code) => {
    switch (code.toUpperCase()) {
        case 'P': // netherlands
        case 'Y': // greece
        case 'G': // cyprus
            return 1
        case 'F': // malta
        case 'X': // germany
            return 2
        case 'E': // slovakia
        case 'N': // austria
            return 3
        case 'D': // estonia
        case 'M': // portugal
        case 'V': // spain
            return 4
        case 'U': // france
        case 'L': // finland
            return 5
        case 'T': // ireland
            return 6
        case 'S': // italy
            return 7
        case 'H': // slovenia
        case 'Z': // belgium
            return 9
    }
}

const getAsciiCode = (val) => {
    return val.toUpperCase().charCodeAt(0)
}

const calcSum = (num) => {
    let sum = 0

    while (num > 0) {
        sum += num % 10
        num = Math.floor(num / 10)
    }

    return sum
}

const calcRoot = (sum) => {
    let root = sum

    while (root > 9) {
        root = root % 10 + Math.floor(root / 10)
    }

    return root
}

const verify = (val) => {
    if (!val || typeof val !== "string" || val.length !== 12 || !SERIALNUMBER_REGEX.test(val)) {
        return false
    }

    const country_code = val.slice(0, 1)

    // series 2 has an alphabetic character at index 1, it should be replaced with
    // its ascii code. And convert the string to a number (parse it as radix 10)
    const digits = parseInt(val.slice(1).replace(/^[a-z]/i, ($1) => $1.toUpperCase().charCodeAt(0)), 10)

    // use a shortcut by calculating a digital root (sum digits until there is only 1 digit left)
    const ascii = calcRoot(getAsciiCode(country_code))
    const root = calcRoot(calcSum(digits))

    // get predefined checksum digit belongng to a specific country code
    const checksum = getChecksum(country_code)

    // use both methods:
    // method 1: sum of all digits is divisible by 9,
    // method 2: sum of all digits is equal to the checksum digit
    if (((calcRoot(ascii + root)) % 9) || (checksum !== root)) {
        return false
    }

    return true
}

//
// Exports/CLI execution
//

if (require.main === module) {
    // used as a cli tool

    const cli_info =
    `
        NAME
            euro-banknote-serialnumber -- verifies a Euro banknote serial number

        USAGE
            euro-banknote-serialnumber --verify <serialnumber>   verifies that the given serialnumber is valid

        euro-banknote-serialnumber -h         outputs help (your looking at it)
        euro-banknote-serialnumber --help     outputs help (your looking at it)
        euro-banknote-serialnumber            outputs help (your looking at it)
    `

    const args = process.argv.slice(2)

    if (args[0]) {

        // check for help command
        if (["--help", "-h"].indexOf(args[0]) !== -1) {
            console.log(cli_info)
            process.exit(0)
        }

        if (args.length === 2 && args[0] === "--verify") {
            // output a string indictaing valid or invalid
            // and exit the process with the correct code( 0=valid, 1=notvalid)
            // so the command can be used in pipes:
            if (verify(args[1])) {
                console.log(`valid: ${args[1]}`)
                process.exit(0)
            } else {
                console.log(`invalid ${args[1]}`)
                process.exit(1)
            }
        }
    }

    console.log(cli_info)
    process.exit(0)

} else {
    // module is required in a node applicatio
    exports.verify = verify
}
