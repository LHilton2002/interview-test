import React from "react";
import { useEffect, useState } from "react";

import { profileData } from "@/app/api/profile/route";
import Head from "next/head";

import "./profile.css";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch("/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      }
    };

    fetchProfile();
  }, []);

  return (
    <section className="header">
      <Head>
        <title>Profile Page</title>
      </Head>
      <div className="container">
        <div className="profile">
          <img
            className="profile-image"
            src="https://picsum.photos/200"
            alt="profile"
          />
          <div className="profile-info">
            <h2 className="profile-name">{profileData.username}</h2>
            <ul className="profile-details">{profileData.email}</ul>
            <p className="profile-bio">{profileData.bio}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
