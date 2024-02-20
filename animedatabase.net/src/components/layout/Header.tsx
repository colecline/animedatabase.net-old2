"use client";

import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";
import { HeaderAvatar } from "./AvatarDropdown";
import Navbar from "./Navbar";
import { Button, buttonVariants } from "@/components/ui/button";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NotebookText, Mail, Bell } from "lucide-react";

export default function Header() {
	const { user, login, logout } = useAuth();

	return (
		<nav>
			<div className="flex justify-between max-w-7xl mx-auto py-5">
				<div className="flex space-x-4">
					<Link href="/" className="my-auto text-lg font-extrabold">
						ADB
					</Link>
					<div className="flex space-x-2">
						<Navbar />
					</div>
				</div>
				<div className="flex space-x-2">
					<Link href={user !== null ? `/${user.username}/list` : `/register`}>
						<div
							className={cn(
								buttonVariants({
									variant: "ghost",
								}),
								"w-9 px-0",
							)}>
							<NotebookText className="h-4 w-4" />
						</div>
					</Link>
					<Button
						variant="outline"
						className={cn(
							"relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal my-auto text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64",
						)}>
						<span className="hidden lg:inline-flex">Search...</span>
						<span className="inline-flex lg:hidden">Search...</span>
						<kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
							<span className="text-xs">⌘</span>K
						</kbd>
					</Button>
					{user ? (
						<>
							<div className="flex space-x-2">
								<Link href={`/notifications`}>
									<div
										className={cn(
											buttonVariants({
												variant: "ghost",
											}),
											"w-9 px-0",
										)}>
										<Bell className="h-4 w-4" />
									</div>
								</Link>
								<Link href={`/messages`}>
									<div
										className={cn(
											buttonVariants({
												variant: "ghost",
											}),
											"w-9 px-0",
										)}>
										<Mail className="h-4 w-4" />
									</div>
								</Link>
								<HeaderAvatar />
							</div>
						</>
					) : (
						<>
							<div className="flex space-x-2">
								<Link className={navigationMenuTriggerStyle() + "my-auto"} href="/login">
									Login
								</Link>
								<Button asChild>
									<Link href={"/register"}>Sign up</Link>
								</Button>
							</div>
						</>
					)}
				</div>
			</div>
		</nav>
	);
}
