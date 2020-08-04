import { Address } from './address.model';

export interface User {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  roles: string[];
  token: string;
  address: Address;
}
