export const checkPasswords = (firstPassword: string, secondPassword: string): boolean => firstPassword === secondPassword;

// const checkName = (name: string): boolean => name.
//
// const RegisterValidation = {
//
// }

export const ifStringIsInvalid = (value: string): boolean => value.includes('&lt') || value.includes('&gt') || value.length < 1;
export const sanitizeData = (value: string): string => value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
