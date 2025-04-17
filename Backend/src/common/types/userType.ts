export interface User {
  userid: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  lastLogin: string;
  role: string;
}

export interface AddUser {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}

export interface UpdateUser {
  firstname?: string;
  lastname?: string;
  username?: string;
}

export interface UserParser {
  userid?: string;
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  password?: string;
  createdAt?: string;
  lastLogin?: string;
  role?: string;
}
