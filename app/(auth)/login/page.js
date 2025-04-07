// User login page
"use client";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Head from "next/head";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", role: "FACULTY" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/login", formData);
      const { token, role } = response.data;
      if (!token || !role) throw new Error("Invalid response from server");
      Cookies.set("token", token);
      toast.success("Login successful!");
      router.push(`/dashboard/${role.toLowerCase()}`);
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Course Files - Login</title>
      </Head>
    
      <div className="container-xxl">
        <div className="authentication-wrapper authentication-basic container-p-y">
          <div className="authentication-inner w-100" style={{ maxWidth: "420px", margin: "0 auto" }}>
            <div className="card">
              <div className="card-body">

                {/* <div className="app-brand justify-content-center mb-4">
                  <Link href="/" className="app-brand-link gap-2">
                    <span className="app-brand-text demo text-body fw-bolder">MyApp</span>
                  </Link>
                </div> */}

                <h4 className="mb-2">Hello There! 👋</h4>
                <p className="mb-4">Please sign-in to your account</p>

                <form onSubmit={handleLogin} className="mb-3">
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-1 form-password-toggle">
                    <label className="form-label" htmlFor="password">Password</label>
                    <div className="input-group input-group-merge">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        className="form-control"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <span className="input-group-text cursor-pointer text-primary" onClick={() => setShowPassword(!showPassword)}>
                        <i className={`bx ${showPassword ? "bx-hide" : "bx-show"} text-muted`}></i>
                      </span>

                    </div>
                    <div className="d-flex justify-content-end mt-1">
                      <Link href="/forgot-password" className="small text-primary">Forgot password?</Link>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor="role">Role</label>
                    <select
                      name="role"
                      id="role"
                      className="form-select"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="ADMIN">Admin</option>
                      <option value="HOD">HOD</option>
                      <option value="FACULTY">Faculty</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                      {loading ? "Logging in..." : "Sign in"}
                    </button>
                  </div>
                </form>

                {/* <p className="text-center">
                  <span>New here?</span>
                  <Link href="/register"><span>&nbsp;Create an account</span></Link>
                </p> */}

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    
  );
}
