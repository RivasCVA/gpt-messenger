const String = {
    EMPTY: '',
    WHITE_SPACE: ' ',
};

export default String;

/**
 * Removes all white space from the string.
 * Trims the edges and removes white spaces in the middle of the string.
 * @param str String to process.
 */
export const removeAllWhiteSpace = (str: string): string => {
    return str.trim().replaceAll(String.WHITE_SPACE, String.EMPTY);
};

/**
 * Validates the email to check if it matches a basic email format.
 * @param email Email to check.
 */
export const isValidEmail = (email: string): boolean => {
    return /^\S+@\S+\.\S+$/.test(email);
};
