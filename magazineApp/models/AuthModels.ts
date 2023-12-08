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
