"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignInPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(
        "https://quamcon-backend.onrender.com/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      const data = await res.json();
      const token = data.token as string;
      localStorage.setItem("admin_token", token);
      router.push("/admin/dashboard");
    } catch (err: any) {
      console.error("Unexpected error logging in:", err);
      setError("Network or server error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="app app-login p-0">
      <div className="row g-0 app-auth-wrapper">
        <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center p-5">
          <div className="d-flex flex-column align-content-end">
            <div className="app-auth-body mx-auto">
              <div className="app-auth-branding mb-4">
                <a className="app-logo" href="/">
                  <Image
                    className="logo-icon me-2"
                    src="/assets/images/app-logo.svg"
                    alt="logo"
                    width={40}
                    height={40}
                  />
                </a>
              </div>
              <h2 className="auth-heading text-center mb-5">Log in to Admin</h2>

              {error && (
                <div
                  style={{
                    backgroundColor: "#f8d7da",
                    color: "#721c24",
                    padding: "0.75rem 1rem",
                    borderRadius: "0.25rem",
                    marginBottom: "1rem",
                  }}
                >
                  {error}
                </div>
              )}

              <div className="auth-form-container text-start">
                <form className="auth-form login-form" onSubmit={handleSubmit}>
                  <div className="email mb-3">
                    <label className="sr-only" htmlFor="signin-email">
                      Username
                    </label>
                    <input
                      id="signin-email"
                      name="admin_username"
                      type="text"
                      className="form-control signin-email"
                      value="admin"
                      readOnly
                      required
                    />
                  </div>
                  <div className="password mb-3">
                    <label className="sr-only" htmlFor="signin-password">
                      Password
                    </label>
                    <input
                      id="signin-password"
                      name="admin_password"
                      type="password"
                      className="form-control signin-password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn app-btn-primary w-100 theme-btn mx-auto"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Logging in...
                        </>
                      ) : (
                        "Admin Login"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <footer className="app-auth-footer">
              <div className="container text-center py-3">{/* Optional footer */}</div>
            </footer>
          </div>
        </div>

        <div className="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
          <div className="auth-background-holder" />
          <div className="auth-background-mask" />
          <div className="auth-background-overlay p-3 p-lg-5">
            <div className="d-flex flex-column align-content-end h-100">
              <div className="h-100"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
