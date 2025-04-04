//secretkeylistener.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SecretKeyListener = () => {
  const navigate = useNavigate();
  const [keySequence, setKeySequence] = useState([]);

  useEffect(() => {
    const secretCode = ["Shift", "A", "L"]; // Secret key sequence

    const handleKeyPress = (event) => {
      setKeySequence((prevKeys) => {
        const newKeys = [...prevKeys, event.key].slice(-secretCode.length);
        if (JSON.stringify(newKeys) === JSON.stringify(secretCode)) {
          navigate("/admin-login"); // Redirect to Admin Login Page
        }
        return newKeys;
      });
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [navigate]);

  return null; // This component doesn't render anything
};

export default SecretKeyListener;