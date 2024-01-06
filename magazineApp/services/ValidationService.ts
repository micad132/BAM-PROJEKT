const checkPasswords = (firstPassword: string, secondPassword: string): boolean => firstPassword === secondPassword;

export const ValidationService = { checkPasswords };

export const sanitizeData = (value: string): string => value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
