import connectDB from "@/config/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
    await connectDB();
    const { email, password, role } = await req.json();

    if (!email || !password || !role) {
        return new Response(JSON.stringify({ error: "Please fill all details first." }), { status: 400 });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
        return new Response(JSON.stringify({ error: "Invalid Email!" }), { status: 401 });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return new Response(JSON.stringify({ error: "Invalid password!" }), { status: 401 });
    }

    // Ensure user is logging in from the correct role (convert request role to uppercase)
    if (user.role !== role.toUpperCase()) {
        return new Response(JSON.stringify({ error: `You must log in as ${user.role}` }), { status: 403 });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    return new Response(JSON.stringify({ message: "Login successful", token, role: user.role }), { status: 200 });

}
