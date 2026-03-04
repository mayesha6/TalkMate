import { Types } from "mongoose";

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
}
export enum AccountStatus {
  ACTIVE = "ACTIVE",
  DISABLED = "DISABLED",
}

export interface IAuthProvider {
  provider: "google" | "credentials";
  providerId: string;
}

export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  picture?: string;
  isDeleted?: boolean;
  isActive?: IsActive;
  isVerified?: boolean;
  role: Role;
  accountStatus: AccountStatus;
  lastLogin?: Date;
  auths: IAuthProvider[];
  createdAt?: Date;
  updatedAt?: Date;
}
