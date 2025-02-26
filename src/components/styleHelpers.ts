/**
 * Gets the tailwind class to let masonry type elements how far should they stretch in rows
 * @param length The length of the string to contain
 * @param tolerance The approximate tolerance of length by line
 * @returns A tailwindcss row span class
 * This function is very verbose because tailwindcss v4 and vite are not working together on postcss config, 
 * so we need to let tailwind know we are passing a relevant className beforehand.
 */
export function getRowSpanClassName(length: number, tolerance: number = 45) {
    if (length / tolerance > 12) return 'row-span-full'
    switch (Math.max(Math.ceil(length/tolerance), 1)) {
        case 1:
            return 'row-span-1';
        case 2:
            return 'row-span-2';
        case 3:
            return 'row-span-3';
        case 4:
            return 'row-span-4';
        case 5:
            return 'row-span-5';
        case 6:
            return 'row-span-6';
        case 7:
            return 'row-span-7';
        case 8:
            return 'row-span-8';
        case 9:
            return 'row-span-9';
        case 10:
            return 'row-span-10';
        case 11:
            return 'row-span-11';
        default:
            return 'row-span-12';
    }
}