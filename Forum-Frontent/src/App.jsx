import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, useDebugValue } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import LoginPage from "./Scenes/LoginPage/LoginPage";
import Navbar from "./Scenes/Navbar/Navbar";
import Home from "./Scenes/Home/Home";
import { useEffect } from "react";
import axios from "axios";
import { refreshUser } from "./states/index.js";
import Thread from "./Scenes/Thread/Thread";
import Profile from "./Scenes/ProfilePage/Profile";
import SavedThread from "./Scenes/SavedThreads/SavedThreads";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { ParticleConfigLight, ParticleConfigdark } from "./particle-config.js";
import { useCallback } from "react";
import { setSearchModal } from "./states/index.js";
import Subforum from "./Scenes/SubForum/SubForum";

function App() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);
  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);
  const mode = useSelector((state) => state.mode);
  const dispatch = useDispatch();
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const state = useSelector((state) => state);
  useEffect(() => {
    if (state.user) {
      axios
        .get(
          `http://localhost:3001/auth/refreshUser?userId=${state.user._id}`,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          },
        )
        .then((res) => dispatch(refreshUser({ user: res.data.user })));
    }
  }, []);
  useEffect(() => {
    const handleToggleSearch = (event) => {
      if ((event.key === "/" || event.key === "k") && event.ctrlKey) {
        dispatch(setSearchModal());
      }
    };
    window.addEventListener("keydown", handleToggleSearch);
    return () => {
      window.removeEventListener("keydown", handleToggleSearch);
    };
  }, []);
  return (
    <>
      {/* <Particles
        init={particlesInit}
        loaded={particlesLoaded}
        options={
          theme.palette.mode === "dark"
            ? ParticleConfigdark
            : ParticleConfigLight
        }
      /> */}
      <div
        className="app"
        style={{
          overflow: state.user ? "hidden" : "auto",
          // backdropFilter: "blur(1px),brightness(10%)",
        }}
      >
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {state.user && <Navbar />}
            <Routes>
              {state.user ? (
                <>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/thread/:id" element={<Thread />} />
                  <Route path="/user/:id" element={<Profile />} />
                  <Route path="/saved" element={<SavedThread />} />
                  <Route path="/subforum/:id" element={<Subforum />} />
                  <Route path="*" element={<Home />} />
                </>
              ) : (
                <Route path="*" element={<LoginPage />} />
              )}
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
