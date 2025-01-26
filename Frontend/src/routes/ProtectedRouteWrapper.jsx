import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const ProtectedRouteWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [token] = useState(() => localStorage.getItem("token"));

  const fetchProfile = async (url, token) => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setUser(response.data);
        setLoading(false);
      }
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
      console.log(error.message);
    }
  };

  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    if (!token) {
      navigate("/login");
    } else {
      fetchProfile(`${API_BASE_URL}/auth/profile`, token);
    }
  }, [navigate, token]);

  return (
    <>
      {loading ? (
        <div className="h-[100dvh] w-full flex items-center justify-center">
          <div className="loader"></div>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default ProtectedRouteWrapper;
