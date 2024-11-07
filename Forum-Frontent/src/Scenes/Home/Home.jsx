import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import AppSection from "../AppSection/AppSection";
export default function Home() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);
  return user && <AppSection />;
}
