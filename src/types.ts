export type Role = "Admin" | "HR" | "Employee";

export interface Manager {
  id: string | number;
  first_name: string;
  last_name: string;
  role?: Role;
}

export interface Visa {
  type: string;
  issuing_country: string;
  start_date: string | number;
  end_date: string | number;
}

export interface User {
  _id: string | number;
  role: Role;

  first_name: string;
  last_name: string;

  first_native_name?: string;
  middle_native_name?: string;
  last_native_name?: string;

  department?: string;
  building?: string;
  room?: string;
  desk_number?: string;

  email?: string;
  phone?: string;
  telegram?: string;

  cnumber?: string;
  citizenship?: string;
  visa?: Visa[];

  manager_id?: string | number;
  manager?: Manager;

  user_avatar?: string;
}

export interface SignInResponse {
  success: boolean;
  user?: { id: string; role: Role; email?: string };
  message?: string;
}

export type UsersListResponse = User[];
