import Link from "next/link";

import { Navbar } from "@/components/layout/Navbar";
import { ThemeButton } from "@/components/ui/theme-button";

function Header() {
	return (
		<header>
			<div className="mx-auto flex max-w-7xl justify-between py-4">
				<div className="flex space-x-4">
					<Link href="/" className="my-auto text-lg font-extrabold">
						ADB
					</Link>
					<Navbar />
				</div>
				<div>
					<ThemeButton />
				</div>
			</div>
		</header>
	);
}

export { Header };
