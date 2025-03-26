import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, uppercase: true },
  hod: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  faculty: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
}, { timestamps: true });

export default mongoose.models.Department || mongoose.model("Department", DepartmentSchema);
