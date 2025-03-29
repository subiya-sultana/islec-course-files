import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    semester: { type: Number, required: true },
    year: { type: Number, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
    faculty: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
  

export default mongoose.models.Subject || mongoose.model("Subject", SubjectSchema);
