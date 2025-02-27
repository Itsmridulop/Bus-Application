interface UserType {
  _id: string;
  name: string;
  email: string;
  phone: string;
  photo: string;
  route: string | null;
  stop: string | null;
  role: "student" | "driver" | "admin";
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
}

interface StopType {
  _id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  user?: string;
}

export { LocationType, RouteType, StopType, UserType };
