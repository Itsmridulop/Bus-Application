interface UserType {
  _id: string;
  name: string;
  email: string;
  phone: string;
  photo: string;
  route: string | null;
  stop: string | null;
  school: string | null;
  role: "student" | "driver" | "admin" | "super-admin";
  password: string;
  passwordConfirm?: string; // Made optional to handle the case after validation
  isActive: boolean;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  passwordChangedAt?: Date;

  correctPassword(
    candidatePassword: string,
    userPassword: string,
  ): Promise<boolean>;
  changedPasswordAfter(JWTTimestamp: number): boolean;
  createPasswordResetToken(): string;
}

interface LocationType {
  latitude: number;
  longitude: number;
  address: string;
  user: string;
  createdAt: Date;
  updatedAt: Date | null;
}

interface RouteType {
  _id: string;
  routeNumber: number;
  routeName: string;
  stops: string[]; // Stops are now objects with a 'value' field
  status: "arrival" | "return";
  user?: string;
  school: string;
}

interface StopType {
  _id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  school?: string;
  user?: string;
}

interface SchoolType {
  _id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  logo: string;
  schoolCode: string;
  isActive?: boolean;
}

export { LocationType, RouteType, StopType, SchoolType, UserType };
