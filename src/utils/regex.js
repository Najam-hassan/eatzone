export const isValidWebUrl = s =>
    /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi.test(s);
export const isAlphabetsWithSpaces = s => /^[A-Za-z\s]+$/i.test(s);
export const isValidNumber = s => /^[0-9]+$/i.test(s);