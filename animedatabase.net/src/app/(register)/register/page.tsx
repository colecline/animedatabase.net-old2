import SignupForm from "../../../components/Forms/Signup";

export default function Page() {
	return (
		<>
			<div
				className="w-1/2 bg-cover"
				style={{
					backgroundImage:
						"url('https://source.unsplash.com/random')",
				}}
			></div>
			<div className="w-1/2 flex items-center justify-center">
				<SignupForm />
			</div>
		</>
	);
}
