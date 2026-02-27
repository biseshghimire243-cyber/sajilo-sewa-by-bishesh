import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔐 Normal Login (temporary)
  const handleLogin = (e) => {
  e.preventDefault();

  // inside handleLogin
if (email === "admin@gmail.com" && password === "123456") {
  const userData = {
    email,
    name: "Admin User",
    photo: "https://i.pravatar.cc/40" // random avatar image
  };
  
  // store in localStorage
  localStorage.setItem("user", JSON.stringify(userData));

  // redirect to home with success message
  navigate("/", { state: { success: "Successfully logged in!" } });
}else {
    setMessage("❌ Invalid email or password");
  }
};
  // 📩 SEND OTP
  const handleForgotPassword = async () => {
    if (!email) {
      setMessage("⚠ Please enter your Gmail first.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/send-otp", {
        email,
      });

      setOtpSent(true);
      setMessage("📩 OTP sent to your Gmail!");
    } catch (error) {
      setMessage("❌ Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // ✅ VERIFY OTP
  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/verify-otp", {
        email,
        otp,
      });

      if (res.data.success) {
        setMessage("✅ OTP Verified! You can now reset password.");
      }
    } catch (error) {
      setMessage("❌ Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="login-card shadow p-4">
        <h2 className="text-center mb-4">Login</h2>

        {message && (
          <div className="alert alert-info text-center">{message}</div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Gmail</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Gmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {!showForgot && (
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}

          {!showForgot ? (
            <>
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>

              <div className="text-center mt-3">
                <span
                  className="text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setShowForgot(true);
                    setMessage("");
                  }}
                >
                  Forgot Password?
                </span>
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-warning w-100"
                onClick={handleForgotPassword}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>

              {otpSent && (
                <div className="mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />

                  <button
                    type="button"
                    className="btn btn-success w-100 mt-2"
                    onClick={handleVerifyOtp}
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                </div>
              )}

              <div className="text-center mt-3">
                <span
                  className="text-secondary"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setShowForgot(false);
                    setOtpSent(false);
                    setOtp("");
                    setMessage("");
                  }}
                >
                  Back to Login
                </span>
              </div>
            </>
          )}
        </form>

        <div className="text-center mt-4">
          <button className="btn btn-danger w-100">
            Continue with Gmail
          </button>
        </div>
      </div>

      <style>
        {`
          .login-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #007bff, #00c6ff);
          }
          .login-card {
            width: 400px;
            border-radius: 15px;
            background: white;
          }
          .btn-primary,
          .btn-warning,
          .btn-success {
            border-radius: 50px;
          }
        `}
      </style>
    </div>
  );
}

export default Login;