export interface UserFormData {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
  address: string;
  isBuyer: boolean;
  profilePicture?: string;
}

export interface UserFormErrors {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
  city: string;
  country: string;
}

export interface AddressForm {
  city: string;
  country: string;
}
