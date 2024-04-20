export function decimalToBinaryArray(decimal: number): number[] {
    // Check if the number is within the allowed range and is an integer
    if (!Number.isInteger(decimal) || decimal < 0 || decimal > 31) {
        throw new Error("Input must be a non-negative integer less than 32.");
    }

    // Convert the number to a binary string and pad it to ensure 5 bits
    const binaryString = decimal.toString(2).padStart(5, '0');

    // Convert padded binary string to an array of numbers
    return binaryString.split('').map(bit => parseInt(bit, 10));
}