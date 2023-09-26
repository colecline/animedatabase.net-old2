"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext"; // Adjust the path as needed
import { useRouter } from "next/navigation";

const UserDashboard: React.FC = () => {
	const { user, logout, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading && !user) {
			router.push("/login");
		}
	}, [user, loading, router]);

	if (!user && !loading) return <p>Please Login to View Dashboard</p>;
	if (loading) return <p>Loading...</p>;

	return (
		<div>
			<h1>Welcome to your Dashboard, {user.username}</h1>
			<button onClick={logout}>Logout</button>
			{/* Render your user-specific data here */}
			{user && (
				<div>
					<p>ID: {user.id}</p>
					<p>Username: {user.username}</p>
					<p>Email: {user.email}</p>
					<p>Created At: {user.createdAt}</p>
				</div>
			)}
		</div>
	);
};

export default UserDashboard;
