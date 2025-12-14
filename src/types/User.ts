export type Role = "Admin" | "HR" | "Employee";

export interface User {
  id: string;
  email: string;
  role: Role;
  user_avatar?: string;
  first_name?: string;
  last_name?: string;
}
