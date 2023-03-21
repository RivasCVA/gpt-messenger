const Color = {
    white: '#ffffff',
    offWhite: '#fffeee',
    secondaryWhite: '#f2f2f2',
    black: '#000000',
    offBlack: '#343434',
    green: '#1eae98',
    red: '#ed4337',
    purple: '#ba55d3',
    blue: '#5499c7',
};

export default Color;

/**
 * Converts a Color attribute to RGB(A).
 * @param hex The hexadecimal string value.
 * @param alpha Optional alpha value [0, 1].
 */
export const HexToRGB = (hex: string, alpha?: number): string => {
    const h = '0123456789ABCDEF';
    const r = h.indexOf(hex[1]) * 16 + h.indexOf(hex[2]);
    const g = h.indexOf(hex[3]) * 16 + h.indexOf(hex[4]);
    const b = h.indexOf(hex[5]) * 16 + h.indexOf(hex[6]);
    if (alpha !== undefined) {
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return `rgb(${r}, ${g}, ${b})`;
};
