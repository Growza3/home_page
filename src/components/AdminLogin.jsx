import React, { useState, useEffect } from "react";
import styles from "../styles/AdminLogin.module.css";
import { FaUserSecret, FaUser, FaUnlockAlt, FaEye, FaCalendar } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const [dateInfo, setDateInfo] = useState({
    month: "",
    weekday: "",
    time: "",
  });

  // Predefined Admin Credentials
  const adminCredentials = {
    productManager: { username: "product_manager", password: "pm1234", path: "/admin" },
    orderManager: { username: "order_manager", password: "om1234", path: "/orderadmin"  },
    userManager: { username: "user_manager", password: "um1234", path: "/useradmin" },
    superAdmin: { username: "superadmin", password: "admin@123", path: "/superadmin" },
  };

  useEffect(() => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const updateTime = () => {
      const today = new Date();
      let hours = today.getHours();
      const minutes = today.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // Convert 24-hour format to 12-hour

      setDateInfo({
        month: ` ${months[today.getMonth()]} ${today.getDate()}`,
        weekday: days[today.getDay()],
        time: ` ${hours}:${minutes} ${ampm}`,
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if credentials match any of the predefined admins
    const matchedAdmin = Object.values(adminCredentials).find(
      (admin) => admin.username === username && admin.password === password
    );

    if (matchedAdmin) {
      alert(`Welcome, ${username}!`);
      setError(""); 
      navigate(matchedAdmin.path);
      // Redirect or set user session here
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>ADMIN</h1>
        <div className={styles.card}>
          <div className={styles.signInSection}>
            <div className={styles.adminIcon}>
              <FaUserSecret />
            </div>
            <form onSubmit={handleLogin}>
              <div className={styles.inputGroup}>
                <FaUser className={styles.icon} />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  autoComplete="off"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <FaUnlockAlt className={styles.icon} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={password}
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <FaEye
                  className={styles.viewIcon}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ opacity: showPassword ? 1 : 0.5 }}
                />
              </div>
              {error && <p className={styles.errorMessage}>{error}</p>}
              <button type="submit" className={styles.submitButton}>
                Let me in
              </button>
            </form>
          </div>
          <div className={styles.dateSection}>
            <FaCalendar className={styles.calendarIcon} />
            <div>{dateInfo.month}</div>
            <div>{dateInfo.weekday}</div>
            <div>{dateInfo.time}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
