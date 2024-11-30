'use client'

import React from "react";
import "@styles/home.scss";
import Link from "next/link";

const arr = [
  {
    name: "Trang Chủ",
    url: "/"
  },
  {
    name: "Thông Tin",
    url: "/thong-tin"
  }
];

export default function Home() {
  const navbarStyle = {
    backgroundColor: "#4e565e",
    padding: "10px 0",
    color: "#fff"
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 15px"
  };

  const heroStyle = {
    backgroundColor: "#f8f9fa",
    textAlign: "center",
    padding: "50px 0",
    color: "#333"
  };

  const featureStyle = {
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
    marginTop: "30px"
  };

  const cardStyle = {
    flex: "1",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    backgroundColor: "#fff"
  };

  const footerStyle = {
    backgroundColor: "#746a5a",
    color: "#fff",
    textAlign: "center",
    padding: "20px 0",
    marginTop: "50px"
  };

  return (
    <>
      {/* Hero Section */}
      <header style={heroStyle}>
        <div style={containerStyle}>
          <h1>Hệ Thống In Ấn Thông Minh</h1>
          <p style={{ fontSize: "18px" }}>
            Giải pháp in ấn nhanh chóng và tiện lợi dành cho sinh viên tại Đại học Bách khoa TP.HCM.
          </p>
        </div>
      </header>

      {/* Features Section */}
      <section style={{ padding: "50px 0", backgroundColor: "#f7f9fc" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                flex: "1",
                minWidth: "280px",
                border: "1px solid #e0e0e0",
                borderRadius: "10px",
                padding: "20px",
                backgroundColor: "#fff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
              }}
            >
              <h5 style={{ color: "#007bff", marginBottom: "10px" }}>Dễ Dàng Sử Dụng</h5>
              <p style={{ color: "#555" }}>
                Chỉ vài bước đơn giản để gửi tài liệu và nhận bản in hoàn hảo.
              </p>
            </div>

            <div
              style={{
                flex: "1",
                minWidth: "280px",
                border: "1px solid #e0e0e0",
                borderRadius: "10px",
                padding: "20px",
                backgroundColor: "#fff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
              }}
            >
              <h5 style={{ color: "#007bff", marginBottom: "10px" }}>Tích Hợp Nhiều Tính Năng</h5>
              <p style={{ color: "#555" }}>
                Hỗ trợ in màu, in hai mặt, và nhiều tùy chọn chất lượng khác.
              </p>
            </div>

            <div
              style={{
                flex: "1",
                minWidth: "280px",
                border: "1px solid #e0e0e0",
                borderRadius: "10px",
                padding: "20px",
                backgroundColor: "#fff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
              }}
            >
              <h5 style={{ color: "#007bff", marginBottom: "10px" }}>Tiết Kiệm Chi Phí</h5>
              <p style={{ color: "#555" }}>
                Giá cả hợp lý và tối ưu cho nhu cầu in ấn của sinh viên.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
