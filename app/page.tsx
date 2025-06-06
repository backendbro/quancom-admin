"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f4f8",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem", color: "#0070f3" }}>
        Welcome to WeTransfer!
      </h1>
      <p style={{ fontSize: "1.25rem", color: "#333", maxWidth: "500px", marginBottom: "2rem" }}>
        Your one-stop admin panel and dashboard to manage everything easily.
      </p>
      <button
        style={{
          padding: "0.75rem 2rem",
          fontSize: "1.1rem",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#0070f3",
          color: "white",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0, 112, 243, 0.4)",
          transition: "background-color 0.3s ease",
        }}
        onClick={() => router.push("/sign-in")}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#005bb5")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0070f3")}
      >
        Get Started
      </button>
    </div>
  );
}
