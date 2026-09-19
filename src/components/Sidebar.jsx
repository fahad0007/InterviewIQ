import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Code2,
  Users,
  Star,
  CheckCircle2,
  BarChart3,
  ShieldCheck,
} from "lucide-react";
import { FaReact } from "react-icons/fa";

import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";
import { getUserRole } from "../services/userService";

function Sidebar({ mobile = false, isOpen, onClose }) {

  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkRole = async () => {
      if (!user) {
        setIsAdmin(false);
        return;
      }

      try {
        const role = await getUserRole(user.uid);
        setIsAdmin(role === "admin");
      } catch (error) {
        console.error(error);
      }
    };

    checkRole();
  }, [user]);


  const handleLinkClick = () => {
    if (mobile) {
      onClose();
    }
  };


  const sidebarContent = (
    <>
      <div className="sidebar-section">

        <p className="sidebar-title">
          PREPARATION
        </p>

        <NavLink
          to="/"
          end
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/javascript"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <BookOpen size={18} />
          <span>Javascript Round</span>
        </NavLink>

        <NavLink
          to="/coding"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <Code2 size={18} />
          <span>Coding Round</span>
        </NavLink>

        <NavLink
          to="/react"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <FaReact size={18} />
          <span>React Round</span>
        </NavLink>

        <NavLink
          to="/hr"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <Users size={18} />
          <span>HR Round</span>
        </NavLink>

      </div>


      <div className="sidebar-section">

        <p className="sidebar-title">
          MY PROGRESS
        </p>

        <NavLink
          to="/favorites"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <Star size={18} />
          <span>Favorites</span>
        </NavLink>

        <NavLink
          to="/completed"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <CheckCircle2 size={18} />
          <span>Completed</span>
        </NavLink>

        <NavLink
          to="/analytics"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <BarChart3 size={18} />
          <span>Analytics</span>
        </NavLink>

        {isAdmin && (
          <NavLink
            to="/admin"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <ShieldCheck size={18} />
            <span>Admin Panel</span>
          </NavLink>
        )}

      </div>
    </>
  );


  // DESKTOP
  if (!mobile) {
    return (
      <aside className="sidebar">
        {sidebarContent}
      </aside>
    );
  }


  // MOBILE
  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
        />
      )}

      <aside
        className={`mobile-sidebar ${
          isOpen ? "mobile-sidebar-open" : ""
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}

export default Sidebar;