# Euro banknote serialnumber

**ZERO DEPENDENCIES**

This module will verify/validate that a given serial number is a valid Euro banknote serial number.

The list of allowed country codes (and corresponding checksum digits) can be found in
[this wikipedia page](https://en.wikipedia.org/wiki/Euro_banknotes#Serial_number).

I converted this to javascript from an old C assignment I did at university, see `/old_c/checksum.c`.

## Install

To use in a node application:
```bash
npm install euro-banknote-serialnumber
```

To use as a cli tool
```bash
npm install -g euro-banknote-serialnumber
```

## Usage

In a node application:
```javascript
const euroBanknoteSN = require("euro-banknote-serialnumber")

const check1 = euroBanknoteSN.verify("L25388049086")
// check1 === false (it's invalid)

const check2 = euroBanknoteSN.verify("X30284111711")
// check2 === true (it's a valid series 1 banknote serial number)

const check3 = euroBanknoteSN.verify("NA4532489209")
// check3 === true (it's a valid series 2 banknote serial number)
```

As a cli tool:
```bash
euro-banknote-serialnumber --help
euro-banknote-serialnumber -h
euro-banknote-serialnumber
# outputs help about the command

euro-banknote-serialnumber
# outputs a random public IPv4 address

euro-banknote-serialnumber --verify L25388049086
# outputs 'invalid' and return code is 1 (so you can use it in pipes)

euro-banknote-serialnumber --verify X30284111711
# outputs 'valid: X30284111711' and return code 0 (so you can use it in pipes)

euro-banknote-serialnumber --verify NA4532489209
# outputs 'valid: NA4532489209' and return code 0 (so you can use it in pipes)
```

## License

MIT
