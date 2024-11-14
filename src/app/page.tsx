// /app/page.tsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
    return (
        <div>
            <h1 className="text-center">Chào mừng đến với Ứng dụng của tôi!</h1>
            <p className="text-center">
                Đây là một ứng dụng mẫu được xây dựng bằng <strong>Next.js</strong> và <strong>React</strong>.
            </p>
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <img src="https://via.placeholder.com/150" className="card-img-top" alt="Feature 1" />
                        <div className="card-body">
                            <h5 className="card-title">Tính năng 1</h5>
                            <p className="card-text">Mô tả về tính năng 1 của ứng dụng này.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <img src="https://via.placeholder.com/150" className="card-img-top" alt="Feature 2" />
                        <div className="card-body">
                            <h5 className="card-title">Tính năng 2</h5>
                            <p className="card-text">Mô tả về tính năng 2 của ứng dụng này.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <img src="https://via.placeholder.com/150" className="card-img-top" alt="Feature 3" />
                        <div className="card-body">
                            <h5 className="card-title">Tính năng 3</h5>
                            <p className="card-text">Mô tả về tính năng 3 của ứng dụng này.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
