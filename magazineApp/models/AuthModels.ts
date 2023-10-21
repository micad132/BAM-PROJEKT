export type LoginData = {
    email: string,
    password: string,
    confirmPassword: string,
}

export type RegisterData = {
    email: string,
    password: string,
    confirmPassword: string,
    postalCode: string,
    city: string,
}

export const INITIAL_LOGIN_DATA: LoginData = {
  email: '',
  password: '',
  confirmPassword: '',
};

export const INITIAL_REGISTER_DATA: RegisterData = {
  email: '',
  password: '',
  confirmPassword: '',
  city: '',
  postalCode: '',
};
