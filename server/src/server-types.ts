export type Role = "Admin" | "HR" | "Employee";

export interface User {
  _id: string;
  email: string;
  password_hash: string;
  role: Role;

  isRemoteWork?: boolean;
  user_avatar?: string;

  first_name?: string;
  middle_name?: string;
  last_name?: string;

  first_native_name?: string;
  middle_native_name?: string;
  last_native_name?: string;

  department?: string;
  building?: string;
  room?: string;
  desk_number?: string | number;

  date_birth?: { year: number; month: number; day: number };

  manager_id?: string | null;
  manager?: { id?: string; first_name?: string; last_name?: string } | null;

  phone?: string;
  telegram?: string;
  cnumber?: string;
  citizenship?: string;

  visa?: Array<{
    issuing_country?: string;
    type?: string;
    start_date?: string | number;
    end_date?: string | number;
  }>;
}
