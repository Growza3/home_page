import React from "react";
import { useSearchParams } from "react-router-dom";

const Profile = () => {
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username");
  const email = searchParams.get("email");

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">User Profile</h1>
      <p className="mt-2">Name: {username}</p>
      <p>Email: {email}</p>
    </div>
  );
};

export default Profile;
