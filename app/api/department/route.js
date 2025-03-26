import connectDB from "@/config/mongodb";
import Department from "@/models/Department";
import User from "@/models/User";
import { NextResponse } from "next/server";

// CREATE DEPARTMENT (POST)
export async function POST(req) {
  await connectDB();
  const { name, hod, faculty } = await req.json();

  if (!name) return NextResponse.json({ error: "Department name is required" }, { status: 400 });

  const existingDepartment = await Department.findOne({ name: name.toUpperCase() });
  if (existingDepartment) return NextResponse.json({ error: "Department already exists" }, { status: 400 });

  const newDepartment = await Department.create({
    name: name.toUpperCase(),
    hod: hod || null,
    faculty: Array.isArray(faculty) ? faculty : [],
  });

  return NextResponse.json({ message: "Department created successfully", departmentId: newDepartment._id }, { status: 201 });
}

// UPDATE DEPARTMENT (PUT)
export async function PUT(req) {
  await connectDB();
  const { departmentId, name, hod, faculty } = await req.json();

  if (!departmentId) return NextResponse.json({ error: "Department ID is required" }, { status: 400 });

  const department = await Department.findById(departmentId);
  if (!department) return NextResponse.json({ error: "Department not found" }, { status: 404 });

  if (name) department.name = name.toUpperCase();
  if (hod) department.hod = hod;
  if (faculty) department.faculty = Array.isArray(faculty) ? faculty : [];

  await department.save();
  return NextResponse.json({ message: "Department updated successfully" }, { status: 200 });
}

// DELETE DEPARTMENT (DELETE)
export async function DELETE(req) {
  await connectDB();
  const { departmentId } = await req.json();

  if (!departmentId) return NextResponse.json({ error: "Department ID is required" }, { status: 400 });

  const department = await Department.findByIdAndDelete(departmentId);
  if (!department) return NextResponse.json({ error: "Department not found" }, { status: 404 });

  return NextResponse.json({ message: "Department deleted successfully" }, { status: 200 });
}

// FETCH DEPARTMENTS (GET)
export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const departmentId = searchParams.get("departmentId");

  if (departmentId) {
    // Fetch a single department by ID
    const department = await Department.findById(departmentId)
      .populate("hod", "-password")
      .populate({
        path: "faculty",
        select: "-password",
        options: { strictPopulate: false }, // Ensure full population
      });

    if (!department) {
      return NextResponse.json({ error: "Department not found" }, { status: 404 });
    }
    return NextResponse.json(department, { status: 200 });
  }

  // Fetch all departments
  const departments = await Department.find()
    .populate("hod", "-password")
    .populate({
      path: "faculty",
      select: "-password",
      options: { strictPopulate: false },
    });

  return NextResponse.json(departments, { status: 200 });
}