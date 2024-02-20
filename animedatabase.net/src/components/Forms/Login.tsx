"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginValidationSchema } from "../../util/user.validator";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginForm() {
	const [formData, setFormData] = useState({});
	const { user, login, logout } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (values: any, { setStatus }) => {
		setIsLoading(true);
		if (login) {
			await login(values.username, values.password);
			setIsLoading(false);
			router.push("/");
		}
	};
	return (
		<Formik
			initialValues={{
				username: "",
				password: "",
			}}
			validationSchema={toFormikValidationSchema(loginValidationSchema)}
			onSubmit={handleSubmit}
			validateOnChange={true}
		>
			{({ status }) => (
				<Form className="border border-zinc-300 bg-white p-10 rounded-md">
					<div>
						<h3 className="font-bold text-2xl">Login</h3>
						<p className="text-sm text-zinc-500 mt-1">
							Fill out the information below to login to an
							account.
						</p>
					</div>
					<label
						htmlFor="username"
						className="block font-semibold text-sm mt-4"
					>
						Username
					</label>
					<div className="flex mt-1">
						<Field
							id="username"
							name="username"
							type="text"
							className="py-2 border border-zinc-300 rounded-md w-full px-2 text-sm focus:outline-zinc-400"
						/>
					</div>

					<label
						htmlFor="password"
						className="block font-semibold text-sm mt-4"
					>
						Password
					</label>
					<Field
						id="password"
						name="password"
						type="password"
						className="mt-1 py-2 border border-zinc-300 w-full rounded-md px-2 text-sm focus:outline-zinc-400"
					/>
					<ErrorMessage
						name="password"
						component="div"
						className="text-sm text-red-400 mt-1"
					/>

					{status && (
						<div className="text-red-500 bg-red-100 text-sm mt-4 p-2 rounded-md border border-red-300">
							{status}
						</div>
					)}

					<div>
						<button
							type="submit"
							className="bg-zinc-900 text-zinc-100 w-full py-2 text-sm font-semibold rounded-md mt-4"
							disabled={isLoading}
						>
							{isLoading ? (
								<img
									src="/loading-ring.svg"
									alt="Loading..."
									width="20"
									height="20"
									className="mx-auto invert"
								/>
							) : (
								"Login"
							)}
						</button>
						<a
							href="/register"
							className="text-zinc-500 text-xs mt-1"
						>
							Don't have an account? Sign up.
						</a>
					</div>
				</Form>
			)}
		</Formik>
	);
}
