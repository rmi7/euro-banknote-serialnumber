#include <stdio.h>

int  lookup_ascii_and_digit(char        code, int *ascii, int *digit);
void calc_sum_and_root     (long long number, int   *sum, int *root);

int main(void)
{
    char code;
    long long number;

    while (fscanf(stdin, "%c%11lld\n", &code, &number) == 2) {
        int sum, root, ascii, digit;

        printf("%c%011lld: ", code, number);

        if (lookup_ascii_and_digit(code, &ascii, &digit)) {
            printf("FAILED\n");
            continue;
        }

        calc_sum_and_root(number, &sum, &root);

        if (((ascii + sum) % 9) || (digit != root))
            printf("FAILED\n");
        else
            printf("OK\n");
    }

    return 0;
}

/**
 * lookup_ascii_and_digit - transforms code into ascii nr and checksum digit
 *
 * @code:
 * @ascii:
 * @digit:
 *
 * longer description
 */
int lookup_ascii_and_digit(char code, int *ascii, int *digit)
{
    // https://en.wikipedia.org/wiki/Euro_banknotes#Serial_number

    switch (code) {
        case 'P': // netherlands
        case 'Y': // greece
        case 'G': // cyprus
            *digit = 1; break;
        case 'F': // malta
        case 'X': // germany
            *digit = 2; break;
        case 'E': // slovakia
        case 'N': // austria
            *digit = 3; break;
        case 'D': // estonia
        case 'M': // portugal
        case 'V': // spain
            *digit = 4; break;
        case 'U': // france
        case 'L': // finland
            *digit = 5; break;
        case 'T': // ireland
            *digit = 6; break;
        case 'S': // italy
            *digit = 7; break;
        case 'H': // slovenia 
        case 'Z': // belgium
            *digit = 9; break;
        default :
            return -1; // ERROR, invalid code!
    }

    *ascii = (int)code;

    return 0;
}

/**
 * calc_sum_and_root - calculate sum of digits and digital root
 *
 * @number:
 * @sum:
 * @root:
 *
 * longer description
 */
void calc_sum_and_root(long long number, int *sum, int *root)
{
    // 11 digits, max sum is 9x11=99, min sum is 10x0+1=1
    int tmp = 0;

    // get sum of all 11 digits, sum is max 2 digits (99)
    while (number > 0) {
        tmp    += number % 10; // extract and add last digit
        number /= 10;          // chop off last digit
    }

    *sum = tmp;

    // sum 2 digits together until result is 1 digit
    while (tmp > 9)
        tmp = (tmp % 10) + (tmp / 10);

    *root = tmp;
}
