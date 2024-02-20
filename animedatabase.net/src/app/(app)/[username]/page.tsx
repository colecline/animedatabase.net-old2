import {
	MapPinIcon,
	LinkIcon,
	CalendarDaysIcon,
	CheckCircleIcon,
	EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import { CircleStackIcon, SparklesIcon, ScaleIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import joinDateFormatter from "../../../util/joinDateFormatter";

async function getData(username: string) {
	const res = await fetch(`http://localhost:3010/users/${username}`, {
		cache: "no-store",
	});

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}
	return res.json();
}

export default async function Page({ params }: { params: { username: string } }) {
	const data = await getData(params.username);
	return (
		<div>
			<div className="bg-white rounded-b-md">
				<div className="bg-zinc-700 w-full h-52"></div>
				<div className="flex justify-between">
					<div className="mx-6 flex">
						<div className="-my-16">
							{data.profilePicture ? (
								<img
									src={`https://animedatabase.s3.us-east-2.amazonaws.com/avatars/${data.profilePicture}`}
									className="h-40 w-40 rounded-md shadow-md"
								/>
							) : (
								<img src={`/default.jpg`} className="h-40 w-40 rounded-md shadow-md" />
							)}
						</div>

						<div className="ml-6 mt-6">
							<div className="flex space-x-2">
								<div className="flex space-x-1">
									<h1 className="text-2xl font-bold my-auto">
										{data.displayName ? data.displayName : data.username}
									</h1>
									{data.isVerified ? (
										<CheckCircleIcon className="h-5 w-5 text-blue-500 my-auto" />
									) : (
										""
									)}
								</div>
								<h3 className="my-auto text-zinc-500">@{data.username}</h3>
							</div>
							{/* <div className="mt-2 flex space-x-4">
								<div className="flex bg-zinc-100 px-4 text-center py-1 text-zinc-600 border border-zinc-200 rounded-md text-sm">
									Owner
									<SparklesIcon className="h-4 w-4 my-auto ml-2" />
								</div>
								<div className="flex bg-red-100 px-4 text-center py-1 text-red-600 border border-red-200 rounded-md text-sm">
									Database Admin
									<CircleStackIcon className="h-4 w-4 my-auto ml-2" />
								</div>
								<div className="flex bg-blue-100 px-4 text-center py-1 text-blue-600 border border-blue-200 rounded-md text-sm">
									Critic
									<ScaleIcon className="h-4 w-4 my-auto ml-2" />
								</div>
							</div> */}
							<div className="mt-2">
								<p className="text-zinc-800 text">{data.bio}</p>
							</div>
							<div className="flex space-x-4 mt-2 text-sm">
								{data.location ? (
									<div className="flex space-x-1">
										<MapPinIcon className="h-4 w-4 text-zinc-600 my-auto" />
										<p className="text-zinc-600">{data.location}</p>
									</div>
								) : (
									""
								)}
								{data.website ? (
									<div className="flex space-x-1">
										<LinkIcon className="h-4 w-4 text-zinc-600 my-auto" />
										<a href="https://youtube.com/bitbeq" className="text-blue-600">
											{data.website}
										</a>
									</div>
								) : (
									""
								)}
								<div className="flex space-x-1">
									<CalendarDaysIcon className="h-4 w-4 text-zinc-600 my-auto" />
									<p className="text-zinc-600">Joined {joinDateFormatter(data.createdAt)}</p>
								</div>
							</div>
							<div className="flex space-x-4 mt-2 mb-6 text-sm">
								<div className="flex space-x-1">
									<p className="font-bold text-zinc-800">{data.followingCount}</p>
									<p className="text-zinc-500">Following</p>
								</div>
								<div className="flex space-x-1">
									<p className="font-bold text-zinc-800">{data.followersCount}</p>
									<p className="text-zinc-500">Followers</p>
								</div>
							</div>
						</div>
					</div>
					<div className="mr-4 mt-4 flex space-x-2">
						<button className="flex text-white bg-indigo-600 h-10 px-8 rounded-md space-x-2 text-sm font-semibold">
							<span className="my-auto">Anime List</span>
							<ClipboardDocumentListIcon className="h-5 w-5 text-white my-auto" />
						</button>
						<button className="h-10 w-10 bg-zinc-200 rounded-md">
							<EllipsisHorizontalIcon className="h-5 w-5 text-zinc-500 mx-auto" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
{
	/* <div>
			<p>Username and Profile Picture</p>
			<p>Posts, Posts with Replies</p>
			<p>Anime + Manga Lists</p>
			<p>Tier Lists</p>
			<p>Badges and Achivements</p>
			<p>Bio, Social Links</p>
			<p>Favorite Anime, Characters</p>
			<p>Header</p>
			<p></p>
		</div> */
}
