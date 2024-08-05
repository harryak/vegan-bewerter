// Simple Fast Counter pseudo-random number generator with 128 bit state.
// https://stackoverflow.com/questions/521295/x/47593316#47593316
function sfc32(a: number, b: number, c: number, d: number): () => number {
    return function () {
        a |= 0;
        b |= 0;
        c |= 0;
        d |= 0;
        const t = (((a + b) | 0) + d) | 0;
        d = (d + 1) | 0;
        a = b ^ (b >>> 9);
        b = (c + (c << 3)) | 0;
        c = (c << 21) | (c >>> 11);
        c = (c + t) | 0;
        return (t >>> 0) / 4294967296;
    };
}

const seedGenerator = () => (Math.random() * 2 ** 32) >>> 0;
// Yield PRNG with (probably bad) seeds for current instance.
// Use current time, too, just in case Math.random yields the same value every time.
// It's not needed unless Math.random yields the exact same values on each page-load, which would be whack.
const prng = sfc32(seedGenerator(), seedGenerator(), seedGenerator(), Date.now());
// Advance PRNG for 15 times to take care of possibly sparse seeds, i.e. if Math.random yields really bad numbers.
for (let i = 0; i < 15; i++) prng();

/**
 * Generate a sufficiently random UID.
 *
 * @param length Length of random part (minimum 10).
 * @returns A pseudo-random string that can be used as a UID.
 */
export const generateUid = (length: number = 10): string => {
    // Minimum length of 10 for collision space of 36^10.
    length = Math.max(length, 10);

    return prng()
        .toString(36)
        .substring(2, length + 2);
};
