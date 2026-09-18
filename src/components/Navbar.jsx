import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Search,
  Moon,
  Sun,
  LogOut,
  ArrowRight,
  Menu
} from "lucide-react";

import { signOut } from "firebase/auth";

import auth from "../firebase/auth";
import { useAuth } from "../context/AuthContext";
import { useSearch } from "../context/SearchContext";

import { useTheme } from "../context/ThemeContext";
import ProfileModal from "./ProfileModal";


function Navbar({ mobile, handleMenu }) {

  const { theme, toggleTheme } = useTheme();

  const [profileModalOpen, setProfileModalOpen] =
    useState(false);

  const navigate = useNavigate();

  const { user } = useAuth();

  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    loading
  } = useSearch();

  const searchRef = useRef(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleQuestionClick = (question) => {
    setSearchTerm("");

    navigate(
      `/question/${question.type}/${question.id}`
    );
  };

  useEffect(() => {
    const handleKeyboard = (event) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();

        searchRef.current?.focus();
      }

      if (event.key === "Escape") {
        setSearchTerm("");
        searchRef.current?.blur();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyboard
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboard
      );
    };
  }, [setSearchTerm]);

  const initials =
    user?.displayName
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ||
    user?.email?.charAt(0).toUpperCase() ||
    "U";

  return (
    <header className="navbar">

      {/* Logo */}

      <Link to="/" className="logo">
        {/* <Menu size={28} className="mobile-menu" onClick={handleMenu} /> */}
        <div className="logo-icon" onClick={handleMenu}>
          IQ
        </div>

        <div>
          <h2>InterviewIQ</h2>

          <span>
            Interview Preparation
          </span>
        </div>
      </Link>


      {/* Search */}

      <div className="navbar-search-wrapper">

        <div className="navbar-search">

          <Search size={18} />

          <input
            ref={searchRef}
            type="text"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            placeholder="Search questions..."
          />

          <span className="search-shortcut">
            Ctrl K
          </span>

        </div>


        {/* Search Results */}

        {searchTerm.trim() && (
          <div className="search-results">

            {loading && (
              <div className="search-message">
                Searching...
              </div>
            )}

            {!loading &&
              searchResults.length === 0 && (
                <div className="search-message">
                  No questions found
                </div>
              )}

            {!loading &&
              searchResults.map((question) => (
                <button
                  key={question.id}
                  className="search-result"
                  onClick={() =>
                    handleQuestionClick(question)
                  }
                >

                  <div className="search-result-content">

                    <strong>
                      {question.question}
                    </strong>

                    <span>
                      {question.type} •{" "}
                      {question.category}
                    </span>

                  </div>

                  <ArrowRight size={16} />

                </button>
              ))}

          </div>
        )}

      </div>


      {/* Actions */}

      <div className="navbar-actions">

        <button
          className="icon-btn theme-toggle"
          onClick={toggleTheme}
          title={
            theme === "light"
              ? "Switch to dark mode"
              : "Switch to light mode"
          }
        >
          {theme === "light" ? (
            <Moon size={20} />
          ) : (
            <Sun size={20} />
          )}
        </button>


        <div className="profile-area">

          <button
            className="profile-btn"
            onClick={() =>
              setProfileModalOpen(true)
            }
          >
            {initials}
          </button>

          <button
            className="logout-btn"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut size={17} />
          </button>

        </div>

      </div>
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() =>
          setProfileModalOpen(false)
        }
      />
    </header>
  );
}

export default Navbar;