import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";

import { profileData } from "@/app/api/profile/route";
import Head from "next/head";

import "./profile.css";
import "styles/globals.css";


const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
}

const ProfilePage = () => {
  useAuth();

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

  const userPosts = [
    {
      id: 1,
      imageUrl: "https://picsum.photos/300",
      description: "placeholder user post 1",
    },
    {
      id: 2,
      imageUrl: "https://picsum.photos/300",
      description: "placeholder user post 2",
    },
    {
      id: 3,
      imageUrl: "https://picsum.photos/300",
      description: "placeholder user post 3",
    },
  ]

  return (
    <section>
      <Head>
        <title>Profile Page</title>
      </Head>
      <header className="header">
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
      <button className="fixed top-0 left-0 p-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={handleLogout}>Logout</button>
      </header>

      <div className="fixed top-15 left-5 container mt-8">
        <div className="grid grid-cols-3 gap-4">
          {userPosts.map((post) => (
            <div key={post.id} className="bg-white shadow-md rounded-lg p-4">
              <img className="post-image" src={post.imageUrl} alt="post" />
              <p className="post-description">{post.description}</p>
      </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
