import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "jwt-secret-key-103";

// Generating JWT token
export function generateToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role }, 
    SECRET_KEY, 
    { expiresIn: "1d" }
  );
}

// Verifing JWT token validity
export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch {
    return null;
  }
}
