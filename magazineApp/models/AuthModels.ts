export type LoginData = {
    username: string,
    password: string,
    confirmPassword: string,
}

export type RegisterData = {
    username: string,
    password: string,
    confirmPassword: string,
    postalCode: string,
    city: string,
}

export type RegisterRequestData = {
    username: string,
    password: string,
    postalCode: string,
    city: string,
}

export type LoginError = {
    usernameError: string,
    passwordError: string,
    confirmPasswordError: string,
}

export type RegisterError = {
    usernameError: string,
    passwordError: string,
    confirmPasswordError: string,
    cityError: string,
    postalCodeError: string,

}

export const INITIAL_LOGIN_DATA: LoginData = {
  username: '',
  password: '',
  confirmPassword: '',
};

export const INITIAL_REGISTER_DATA: RegisterData = {
  username: '',
  password: '',
  confirmPassword: '',
  city: '',
  postalCode: '',
};

export const INITIAL_LOGIN_ERROR_DATA: LoginError = {
  usernameError: '',
  passwordError: '',
  confirmPasswordError: '',
};

export const INITIAL_REGISTER_ERROR_DATA: RegisterError = {
  usernameError: '',
  passwordError: '',
  confirmPasswordError: '',
  cityError: '',
  postalCodeError: '',
};
