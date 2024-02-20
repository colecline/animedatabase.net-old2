"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface User {
	id: string;
	username: string;
	email: string;
	createdAt: Date;
	profilePicture?: string; // optional
	displayName?: string; // Optional displayName
	bio?: string; // Optional bio
	location?: string; // Optional location
	website?: string; // Optional website
}

interface AuthContextProps {
	user: User | null;
	login: (username: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	loading: boolean;
}

const AuthContext = createContext<Partial<AuthContextProps>>({});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	async function login(username: string, password: string) {
		try {
			const res = await fetch("http://localhost:3010/users/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
				credentials: "include",
			});

			if (!res.ok) throw new Error("Login failed");

			const userData = await res.json();
			setUser(userData);
		} catch (err) {
			console.error(err);
		}
	}

	async function logout() {
		try {
			const res = await fetch("http://localhost:3010/users/logout", {
				method: "POST",
				credentials: "include",
			});

			if (!res.ok) throw new Error("Logout failed");

			setUser(null);
		} catch (err) {
			console.error(err);
		}
	}

	useEffect(() => {
		async function fetchCurrentUser() {
			try {
				const res = await fetch("http://localhost:3010/user", {
					credentials: "include",
				});

				if (res.ok) {
					const user = await res.json();
					setUser(user);
				}
			} catch (error) {
				console.log("Error Fetching User: ", error.message);
			} finally {
				setLoading(false);
			}
		}

		fetchCurrentUser();
	}, []);

	return <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext);
}
