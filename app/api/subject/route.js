import connectDB from "@/config/mongodb";
import Subject from "@/models/Subject";
import { NextResponse } from "next/server";

// CREATE SUBJECT (POST)
export async function POST(req) {
  await connectDB();
  const { name, code, semester, year, department, faculty } = await req.json();

  if (!name || !code || !semester || !year || !department) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const existingSubject = await Subject.findOne({ code: code.toUpperCase() });
  if (existingSubject) {
    return NextResponse.json({ error: "Subject already exists" }, { status: 400 });
  }

  const newSubject = await Subject.create({
    name: name.toUpperCase(),
    code: code.toUpperCase(),
    semester,
    year,
    department,
    faculty: Array.isArray(faculty) ? faculty : [],
  });

  return NextResponse.json(
    { message: "Subject created successfully", subjectId: newSubject._id },
    { status: 201 }
  );
}

// UPDATE SUBJECT (PUT)
export async function PUT(req) {
  await connectDB();
  const { subjectId, name, code, semester, year, department, faculty } = await req.json();

  if (!subjectId) return NextResponse.json({ error: "Subject ID is required" }, { status: 400 });

  const subject = await Subject.findById(subjectId);
  if (!subject) return NextResponse.json({ error: "Subject not found" }, { status: 404 });

  if (name) subject.name = name.toUpperCase();
  if (code) subject.code = code.toUpperCase();
  if (semester) subject.semester = semester;
  if (year) subject.year = year;
  if (department) subject.department = department;
  if (faculty) subject.faculty = Array.isArray(faculty) ? faculty : [];

  await subject.save();
  return NextResponse.json({ message: "Subject updated successfully" }, { status: 200 });
}

// DELETE SUBJECT (DELETE)
export async function DELETE(req) {
  await connectDB();
  const { subjectId } = await req.json();

  if (!subjectId) return NextResponse.json({ error: "Subject ID is required" }, { status: 400 });

  const subject = await Subject.findByIdAndDelete(subjectId);
  if (!subject) return NextResponse.json({ error: "Subject not found" }, { status: 404 });

  return NextResponse.json({ message: "Subject deleted successfully" }, { status: 200 });
}

// FETCH SUBJECTS (GET)
export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const subjectId = searchParams.get("subjectId");

  // Fetch a single subject by ID
  if (subjectId) {
    const subject = await Subject.findById(subjectId)
      .populate("department")
      .populate("faculty");

    if (!subject) {
      return NextResponse.json({ error: "Subject not found" }, { status: 404 });
    }
    return NextResponse.json(subject, { status: 200 });
  }

  // Fetch all subjects
  const subjects = await Subject.find()
    .populate("department")
    .populate("faculty");

  return NextResponse.json(subjects, { status: 200 });
}
