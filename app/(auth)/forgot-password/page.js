import Head from "next/head";
import React from "react";

export const metadata = {
    title: "Course Files - Forgot Password",
};

const ForgotPassword = () => {
      
    return (
        <>
            <div className="container-xxl">
                <div className="authentication-wrapper authentication-basic container-p-y">
                    <div className="authentication-inner py-4" style={{ maxWidth: "420px", margin: "0 auto" }}>
                        <div className="card">
                            <div className="card-body text-center">
                                <h4 className="mb-2">Forgot Password? 🔒</h4>
                                <p className="mb-4">
                                    Enter your email and we will send you instructions to reset your password
                                </p>
                                <form className="mb-3">
                                    <div className="mb-3 text-start">
                                        <label htmlFor="email" className="form-label">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            autoFocus
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary d-grid w-100">
                                        Send Reset Link
                                    </button>
                                </form>
                                <div className="text-center">
                                    <a href="/login" className="d-flex align-items-center justify-content-center">
                                        <i className="bx bx-chevron-left scaleX-n1-rtl bx-sm"></i>
                                        Back to login
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
