export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    username: string;
    password: string;
    email: string;
    role: {
      id: number;
      roleName: string;
      description: string;
      createdAt: string;
      updatedAt: string;
    };
    avatarUrl: string | null;
    createdAt: string;
    updatedAt: string;
    credentialsNonExpired: boolean;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
  };
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  role: {
    id: number;
    roleName: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  status: string;
  gender: string;
  birthDate: string;
  studentId: string;
  className: string;
  course: string;
  ethnicity: string;
  religion: string;
  address: string;
  hometown: string;
  major: string;
  department: string;
  classCode: string;
  phone: string;
  job: string;
}