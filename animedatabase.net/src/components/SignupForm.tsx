"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
	stepOneUserValidationSchema,
	stepTwoUserValidationSchema,
} from "../util/user.validator";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useRouter } from "next/navigation";

export default function SignupForm() {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (values: any, { setStatus }) => {
		if (step === 1) {
			setFormData(values);
			setStep(2);
		} else if (step === 2) {
			setIsLoading(true);
			const submitData = { ...formData, ...values };
			try {
				const response = await fetch("http://localhost:3010/users", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(submitData),
				});

				if (!response.ok) {
					const error = await response.json();
					console.error("Registration failed", error);
					setStatus(error || "Registration failed");
					return;
				}

				console.log("Registration success!");
				router.push("/");
			} catch (error) {
				console.error("Submission Error:", error);
				setStatus("Registration failed. Please try again later.");
			} finally {
				setIsLoading(false);
			}
		}
	};
	return (
		<Formik
			initialValues={{
				username: "",
				email: "",
				password: "",
				terms: false,
			}}
			validationSchema={
				step === 1
					? toFormikValidationSchema(stepOneUserValidationSchema)
					: toFormikValidationSchema(stepTwoUserValidationSchema)
			}
			onSubmit={handleSubmit}
			validateOnChange={true}
		>
			{({ status }) => (
				<Form className="border border-zinc-300 p-10 rounded-md">
					<div>
						<h3 className="font-bold text-2xl">Sign Up</h3>
						<p className="text-sm text-zinc-500 mt-1">
							Fill out the information below to create an account.
						</p>
					</div>
					<label
						htmlFor="username"
						className="block font-semibold text-sm mt-4"
					>
						Username
					</label>
					<div className="flex mt-1">
						<div className="bg-zinc-300 text-zinc-500 px-2 rounded-l-md py-2">
							@
						</div>
						<Field
							id="username"
							name="username"
							type="text"
							className="py-2 border border-zinc-300 rounded-r-md w-80 px-2 text-sm focus:outline-zinc-400"
						/>
					</div>
					{}

					{step === 2 && (
						<>
							<label
								htmlFor="email"
								className="block font-semibold text-sm mt-4"
							>
								Email
							</label>
							<Field
								id="email"
								name="email"
								type="email"
								className="mt-1 py-2 border border-zinc-300 w-full rounded-md px-2 text-sm focus:outline-zinc-400"
							/>
							<ErrorMessage
								name="email"
								component="div"
								className="text-sm text-red-400 mt-1"
							/>

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

							<div className="flex mt-4">
								<Field type="checkbox" name="terms" />
								<label className="ml-2 block text-sm text-zinc-600">
									I agree to the Terms of Service
								</label>
							</div>
							<ErrorMessage
								name="terms"
								component="div"
								className="text-sm text-red-400 mt-1"
							/>
						</>
					)}

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
							) : step === 1 ? (
								"Next"
							) : (
								"Create an account"
							)}
						</button>
						<a href="/login" className="text-zinc-500 text-xs mt-1">
							Already have an account? Sign in.
						</a>
					</div>
				</Form>
			)}
		</Formik>
	);
}
