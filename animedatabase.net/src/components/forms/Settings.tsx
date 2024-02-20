"use client";

import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation"; // Corrected from "next/navigation"
import { useAuth } from "../../contexts/AuthContext";

export default function SettingsForm() {
	const { user, loading } = useAuth();
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		if (!loading && !user) router.push("/login");
	}, [loading, user, router]);

	if (loading || !user)
		return (
			<img
				src="/loading-ring.svg"
				alt="Loading..."
				width="20"
				height="20"
				className="mx-auto invert"
			/>
		);

	const handleSubmit = async (values) => {
		setIsSubmitting(true);
		try {
			const response = await fetch("http://localhost:3010/user", {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
				credentials: "include",
			});

			if (!response.ok) throw new Error("Failed to update the user.");

			// Add any additional logic for successful update
			router.push(`/user/${user.username}`);
		} catch (error) {
			console.error(error);
			// Handle errors
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Formik
			enableReinitialize={true}
			initialValues={{
				displayName: user?.displayName || "",
				bio: user?.bio || "",
				location: user?.location || "",
				website: user?.website || "",
			}}
			onSubmit={handleSubmit}
		>
			{({ status }) => (
				<Form className="bg-white mt-10 p-10 rounded-md w-1/2 mx-auto">
					<h2 className="mb-4 font-bold text-2xl">
						Account Settings
					</h2>
					<div>
						<label
							htmlFor="displayName"
							className="block font-semibold text-sm mt-4"
						>
							Display Name
						</label>
						<Field
							id="displayName"
							name="displayName"
							type="text"
							className="mt-1 py-2 border border-zinc-300 rounded-md w-full px-2 text-sm focus:outline-zinc-400"
						/>
					</div>

					<div>
						<label className="block font-semibold text-sm mt-4">
							Username
						</label>
						<span className="block py-2 px-2 text-sm border rounded-md mt-1 bg-zinc-300 text-zinc-600">
							{user?.username}
						</span>
					</div>

					<div>
						<label className="block font-semibold text-sm mt-4">
							Email
						</label>
						<span className="block py-2 px-2 text-sm border rounded-md mt-1 bg-zinc-300 text-zinc-600">
							{user?.email}
						</span>
					</div>

					<div>
						<label
							htmlFor="bio"
							className="block font-semibold text-sm mt-4"
						>
							Bio
						</label>
						<Field
							as="textarea"
							maxLength="300"
							id="bio"
							name="bio"
							className="mt-1 py-2 border border-zinc-300 rounded-md w-full px-2 text-sm focus:outline-zinc-400"
						/>
					</div>

					<div>
						<label
							htmlFor="location"
							className="block font-semibold text-sm mt-4"
						>
							Location
						</label>
						<Field
							id="location"
							name="location"
							type="text"
							className="mt-1 py-2 border border-zinc-300 rounded-md w-full px-2 text-sm focus:outline-zinc-400"
						/>
					</div>

					<div>
						<label
							htmlFor="website"
							className="block font-semibold text-sm mt-4"
						>
							Website
						</label>
						<Field
							id="website"
							name="website"
							type="text"
							className="mt-1 py-2 border border-zinc-300 rounded-md w-full px-2 text-sm focus:outline-zinc-400"
						/>
					</div>

					{/* Remaining components... */}

					<div>
						<button
							type="submit"
							className="bg-zinc-900 text-zinc-100 w-full py-2 text-sm font-semibold rounded-md mt-4"
							disabled={isSubmitting}
						>
							{isSubmitting ? (
								<img
									src="/loading-ring.svg"
									alt="Loading..."
									width="20"
									height="20"
									className="mx-auto invert"
								/>
							) : (
								"Update"
							)}
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
}
