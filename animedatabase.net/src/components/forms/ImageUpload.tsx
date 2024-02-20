"use client";

import { useState } from "react";

export default function ImageUpload() {
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
		try {
			const file = e.target.files?.[0];
			if (!file) throw new Error("File is not selected");

			const formData = new FormData();
			formData.append("image", file);

			const response = await fetch("http://localhost:3010/user/avatar", {
				method: "POST",
				body: formData,
				credentials: "include",
			});

			if (!response.ok) throw new Error("Error uploading image");

			const data = await response.json();
			setImageUrl(data.imageUrl);
		} catch (error) {
			console.error("Error uploading image: ", error);
		}
	}
	return (
		<div className="">
			<input type="file" onChange={handleImageUpload} />
			{imageUrl && <img src={imageUrl} alt="Uploaded" />}
		</div>
	);
}
