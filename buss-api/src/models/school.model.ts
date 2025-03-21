import mongoose, { Model, Schema } from "mongoose";
import { SchoolType } from "../../types/type";

const schoolSchema = new Schema<SchoolType>({
  name: {
    type: String,
    required: [true, "School name is required"],
    unique: true,
  },
  address: {
    type: String,
    required: [true, "School address is required"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "School phone number is required"],
    min: [10, "Phone number must be 10 digits"],
    max: [13, "Phone number not be larger then 13 digits"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "School email is required"],
    unique: true,
  },
  logo: {
    type: String,
    required: [true, "School logo is required"],
    unique: true,
  },
  schoolCode: {
    type: String,
    required: [true, "School code is required"],
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const School: Model<SchoolType> = mongoose.model("School", schoolSchema);

export default School;
