import { useEffect, useState } from "react";
import {
  X,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";

import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  updateProfile
} from "firebase/auth";

import auth from "../firebase/auth";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

function ProfileModal({
  isOpen,
  onClose
}) {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] =
    useState("profile");

  const [name, setName] =
    useState("");

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);


  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
    }
  }, [user, isOpen]);


  if (!isOpen) {
    return null;
  }


  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!user) return;

    const trimmedName = name.trim();

    if (!trimmedName) {
      showToast(
        "Name cannot be empty",
        "error"
      );

      return;
    }

    try {
      setLoading(true);

      await updateProfile(user, {
        displayName: trimmedName
      });

      /*
        Update Firestore user profile also
      */

      const { doc, updateDoc } =
        await import("firebase/firestore");

      const { default: db } =
        await import("../firebase/firestore");

      const userRef = doc(
        db,
        "users",
        user.uid
      );

      await updateDoc(userRef, {
        name: trimmedName
      });

      showToast(
        "Profile updated successfully",
        "success"
      );

      onClose();

    } catch (error) {
      console.error(
        "Profile update error:",
        error
      );

      showToast(
        "Failed to update profile",
        "error"
      );

    } finally {
      setLoading(false);
    }
  };


  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!user) return;

    if (!currentPassword) {
      showToast(
        "Enter your current password",
        "error"
      );

      return;
    }

    if (!newPassword) {
      showToast(
        "Enter a new password",
        "error"
      );

      return;
    }

    if (newPassword.length < 6) {
      showToast(
        "Password must be at least 6 characters",
        "error"
      );

      return;
    }

    if (newPassword !== confirmPassword) {
      showToast(
        "New passwords do not match",
        "error"
      );

      return;
    }

    if (currentPassword === newPassword) {
      showToast(
        "New password must be different",
        "error"
      );

      return;
    }

    try {
      setLoading(true);

      /*
        Re-authenticate user
      */

      const credential =
        EmailAuthProvider.credential(
          user.email,
          currentPassword
        );

      await reauthenticateWithCredential(
        user,
        credential
      );

      /*
        Update password
      */

      await updatePassword(
        user,
        newPassword
      );

      showToast(
        "Password changed successfully",
        "success"
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setActiveTab("profile");

    } catch (error) {
      console.error(
        "Change password error:",
        error
      );

      if (
        error.code ===
        "auth/invalid-credential"
      ) {
        showToast(
          "Current password is incorrect",
          "error"
        );
      } else if (
        error.code ===
        "auth/wrong-password"
      ) {
        showToast(
          "Current password is incorrect",
          "error"
        );
      } else if (
        error.code ===
        "auth/too-many-requests"
      ) {
        showToast(
          "Too many attempts. Try again later.",
          "error"
        );
      } else {
        showToast(
          "Failed to change password",
          "error"
        );
      }

    } finally {
      setLoading(false);
    }
  };


  return (
    <div
      className="profile-modal-overlay"
      onClick={onClose}
    >

      <div
        className="profile-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        {/* HEADER */}

        <div className="profile-modal-header">

          <div>
            <h2>
              Profile Settings
            </h2>

            <p>
              Manage your account
            </p>
          </div>

          <button
            className="profile-modal-close"
            onClick={onClose}
          >
            <X size={20} />
          </button>

        </div>


        {/* PROFILE HEADER */}

        <div className="profile-user-header">

          <div className="profile-avatar-large">

            {user?.displayName
              ?.charAt(0)
              .toUpperCase() ||
              user?.email
                ?.charAt(0)
                .toUpperCase() ||
              "U"}

          </div>

          <div>

            <h3>
              {user?.displayName ||
                "User"}
            </h3>

            <p>
              {user?.email}
            </p>

          </div>

        </div>


        {/* TABS */}

        <div className="profile-tabs">

          <button
            className={
              activeTab === "profile"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab("profile")
            }
          >
            <User size={16} />
            Profile
          </button>


          <button
            className={
              activeTab === "password"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab("password")
            }
          >
            <Lock size={16} />
            Change Password
          </button>

        </div>


        {/* PROFILE TAB */}

        {activeTab === "profile" && (

          <form
            className="profile-form"
            onSubmit={handleUpdateProfile}
          >

            <div className="profile-form-group">

              <label>
                Full Name
              </label>

              <div className="profile-input-wrapper">

                <User size={18} />

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Enter your name"
                />

              </div>

            </div>


            <div className="profile-form-group">

              <label>
                Email
              </label>

              <div className="profile-input-wrapper disabled">

                <Mail size={18} />

                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                />

              </div>

              <small>
                Email address cannot be changed
                from here.
              </small>

            </div>


            <button
              type="submit"
              className="profile-save-btn"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : "Save Changes"}
            </button>

          </form>

        )}


        {/* PASSWORD TAB */}

        {activeTab === "password" && (

          <form
            className="profile-form"
            onSubmit={handleChangePassword}
          >

            {/* CURRENT PASSWORD */}

            <div className="profile-form-group">

              <label>
                Current Password
              </label>

              <div className="profile-input-wrapper">

                <Lock size={18} />

                <input
                  type={
                    showCurrentPassword
                      ? "text"
                      : "password"
                  }
                  value={currentPassword}
                  onChange={(e) =>
                    setCurrentPassword(
                      e.target.value
                    )
                  }
                  placeholder="Enter current password"
                />

                <button
                  type="button"
                  className="password-eye-btn"
                  onClick={() =>
                    setShowCurrentPassword(
                      (prev) => !prev
                    )
                  }
                >
                  {showCurrentPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>


            {/* NEW PASSWORD */}

            <div className="profile-form-group">

              <label>
                New Password
              </label>

              <div className="profile-input-wrapper">

                <Lock size={18} />

                <input
                  type={
                    showNewPassword
                      ? "text"
                      : "password"
                  }
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(
                      e.target.value
                    )
                  }
                  placeholder="Enter new password"
                />

                <button
                  type="button"
                  className="password-eye-btn"
                  onClick={() =>
                    setShowNewPassword(
                      (prev) => !prev
                    )
                  }
                >
                  {showNewPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

              <small>
                Minimum 6 characters.
              </small>

            </div>


            {/* CONFIRM PASSWORD */}

            <div className="profile-form-group">

              <label>
                Confirm New Password
              </label>

              <div className="profile-input-wrapper">

                <Lock size={18} />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  placeholder="Confirm new password"
                />

                <button
                  type="button"
                  className="password-eye-btn"
                  onClick={() =>
                    setShowConfirmPassword(
                      (prev) => !prev
                    )
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>


            <button
              type="submit"
              className="profile-save-btn"
              disabled={loading}
            >
              {loading
                ? "Changing Password..."
                : "Change Password"}
            </button>

          </form>

        )}

      </div>

    </div>
  );
}

export default ProfileModal;