export interface Role {
  id: number;
  name: string;
  description: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserCtx {
  id: number;
  username: string;
  email: string;
  provider: string;
  password: string;
  resetPasswordToken?: any;
  confirmationToken?: any;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  role: Role;
}
