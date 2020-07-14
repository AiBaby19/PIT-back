export interface User {
    id?: number;
    userId?: number;
    email: string;
    password: string
    isAdmin?: boolean
    token?: string;
  }