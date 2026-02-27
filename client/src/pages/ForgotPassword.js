import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // 📩 Send OTP
  const handleSendOtp = async () => {
    if (!email) {
      setMessage("Please enter your email");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/send-otp", { email });
      setMessage(res.data.msg);
      setOtpSent(true);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Error sending OTP");
    }
  };

  // ✅ Verify OTP
  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post("http://localhost:5000/verify-otp", { email, otp });
      if (res.data.success) {
        setMessage("OTP verified! You can now change your password.");
        setOtpVerified(true);
      }
    } catch (err) {
      setMessage(err.response?.data?.msg || "Invalid OTP");
    }
  };

  // 🔑 Change Password
  const handleChangePassword = async () => {
    if (!newPassword) {
      setMessage("Please enter a new password");
      return;
    }

    try {
      // For now, just simulate password change
      // In real app, you would call your backend to update the password
      setMessage("Password changed successfully!");
      setTimeout(() => navigate("/login"), 2000); // redirect to login
    } catch (err) {
      setMessage("Error changing password");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Forgot Password</h2>

      {message && <div className="alert alert-info">{message}</div>}

      {!otpSent && (
        <>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn btn-primary w-100" onClick={handleSendOtp}>
            Send OTP
          </button>
        </>
      )}

      {otpSent && !otpVerified && (
        <>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button className="btn btn-success w-100" onClick={handleVerifyOtp}>
            Verify OTP
          </button>
        </>
      )}

      {otpVerified && (
        <>
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button className="btn btn-warning w-100" onClick={handleChangePassword}>
            Change Password
          </button>
        </>
      )}
    </div>
  );
}

export default ForgotPassword;