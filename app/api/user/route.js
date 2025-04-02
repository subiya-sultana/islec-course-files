import connectDB from "@/config/mongodb";
import User from "@/models/User";
import Department from "@/models/Department";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// CREATE USER (POST)
export async function POST(req) {
	await connectDB();
	const { name, email, password, role, departments } = await req.json();

	if (!name || !email || !password || !role || !departments?.length)
		return NextResponse.json({ error: "All fields are required" }, { status: 400 });

	const lowerCaseEmail = email.toLowerCase();

	const existingUser = await User.findOne({ email: lowerCaseEmail });
	if (existingUser)
		return NextResponse.json({ error: "User already exists" }, { status: 400 });

	const hashedPassword = await bcrypt.hash(password, 10);
	const formattedRole = role.toUpperCase();
	if (!["ADMIN", "HOD", "FACULTY"].includes(formattedRole))
		return NextResponse.json({ error: "Invalid role" }, { status: 400 });

	// Validate that all department ObjectIds exist
	const departmentDocs = await Department.find({ _id: { $in: departments } });
	if (departmentDocs.length !== departments.length)
		return NextResponse.json({ error: "One or more departments not found" }, { status: 400 });

	const newUser = await User.create({
		name,
		email: lowerCaseEmail,
		password: hashedPassword,
		role: formattedRole,
		departments,
	});

	return NextResponse.json(
		{ message: "User registered successfully", userId: newUser._id },
		{ status: 201 }
	);
}


// UPDATE USER (PUT)
export async function PUT(req) {
	await connectDB();
	const { userId, name, email, password, role, departments } = await req.json();

	if (!userId) return NextResponse.json({ error: "User ID is required" }, { status: 400 });

	const user = await User.findById(userId);
	if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

	if (name) user.name = name;
	if (email) {
		const lowerCaseEmail = email.toLowerCase();

		const existingUser = await User.findOne({ email: lowerCaseEmail });
		if (existingUser && existingUser._id.toString() !== userId)
			return NextResponse.json({ error: "Email already in use" }, { status: 400 });

		user.email = lowerCaseEmail;
	}
	if (password) user.password = await bcrypt.hash(password, 10);
	if (role) {
		const formattedRole = role.toUpperCase();
		if (!["ADMIN", "HOD", "FACULTY"].includes(formattedRole))
			return NextResponse.json({ error: "Invalid role" }, { status: 400 });

		user.role = formattedRole;
	}
	if (departments) {
		const departmentDocs = await Department.find({ _id: { $in: departments } });
		if (departmentDocs.length !== departments.length)
			return NextResponse.json({ error: "One or more departments not found" }, { status: 400 });

		user.departments = departments;
	}

	await user.save();
	return NextResponse.json({ message: "User updated successfully" }, { status: 200 });
}


// DELETE USER (DELETE)
export async function DELETE(req) {
	await connectDB();
	const { userId } = await req.json();

	if (!userId) return NextResponse.json({ error: "User ID is required" }, { status: 400 });

	const user = await User.findByIdAndDelete(userId);
	if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

	return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
}


// FETCH USERS (GET)
export async function GET(req) {
	await connectDB();
	const { searchParams } = new URL(req.url);
	const userId = searchParams.get("userId");

	// fetch single user
	if (userId) {
		const user = await User.findById(userId).populate("departments", "name").select("-password");
		if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
		return NextResponse.json(user, { status: 200 });
	}

	// fetch all users
	const users = await User.find().populate("departments", "name").select("-password");
	return NextResponse.json(users, { status: 200 });
}
