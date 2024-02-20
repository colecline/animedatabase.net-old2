import ImageUpload from "../../../../components/forms/ImageUpload";
import SettingsForm from "../../../../components/forms/Settings";

export default function Page() {
	return (
		<div>
			<SettingsForm />
			<div className="bg-white mx-auto p-10 w-1/2 mt-10 mb-10 shadow-md h-48 rounded-md">
				<h2 className="mb-4 font-bold text-2xl">Update Profile Picture</h2>
				<ImageUpload />
			</div>
		</div>
	);
}
