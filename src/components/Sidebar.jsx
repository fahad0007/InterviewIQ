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
  Menu
} from "lucide-react";
import { FaReact } from "react-icons/fa";


import { useEffect, useState } from "react";


import { useAuth } from "../context/AuthContext";
import { getUserRole } from "../services/userService";

function Sidebar({mobile}) {
  const { user } = useAuth();

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkRole = async () => {

      if (!user) return;

      const role = await getUserRole(user.uid);

      setIsAdmin(role === "admin");

    };

    checkRole();
  }, [user]);




  

  return (
    <aside className={mobile? "mobile-sidebar": "sidebar" } >
      <div className="sidebar-section">
        <p className="sidebar-title">PREPARATION</p>

        <NavLink
          to="/"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
          end
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/javascript"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <BookOpen size={18} />
          <span>Javascript Round</span>
        </NavLink>

        <NavLink
          to="/coding"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <Code2 size={18} />
          <span>Coding Round</span>
        </NavLink>

        <NavLink
          to="/react"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <FaReact size={18} />
          <span>React Round</span>
        </NavLink>

        <NavLink
          to="/hr"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <Users size={18} />
          <span>HR Round</span>
        </NavLink>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-title">MY PROGRESS</p>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <Star size={18} />
          <span>Favorites</span>
        </NavLink>

        <NavLink
          to="/completed"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <CheckCircle2 size={18} />
          <span>Completed</span>
        </NavLink>

        <NavLink
          to="/analytics"
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
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <ShieldCheck size={18} />
            <span>Admin Panel</span>
          </NavLink>
        )}

      </div>

    </aside>
  );
}

export default Sidebar;