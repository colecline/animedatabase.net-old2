"use client";

import {
	Cloud,
	CreditCard,
	Github,
	Keyboard,
	LifeBuoy,
	LogOut,
	Mail,
	MessageSquare,
	Plus,
	PlusCircle,
	Settings,
	User,
	UserPlus,
	Users,
	NotebookText,
	BookPlus,
	Book,
	Sun,
	Moon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "next-themes";
import Link from "next/link";

export function HeaderAvatar() {
	const { user, login, logout } = useAuth();
	const { setTheme, theme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar>
					{user === null ? (
						""
					) : (
						<AvatarImage
							src={`https://animedatabase.s3.us-east-2.amazonaws.com/avatars/${user.profilePicture}`}
							alt="@shadcn"
						/>
					)}
					<AvatarFallback></AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>{user === null ? "My Account" : `@${user.username}`}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<Link href={`/${user.username}`}>
							<User className="mr-2 h-4 w-4" />
							<span>Profile</span>
							<DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Link href={"/account/settings"}>
							<Settings className="mr-2 h-4 w-4" />
							<span>Settings</span>
							<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href={`/${user.username}/list`}>
						<NotebookText className="mr-2 h-4 w-4" />
						<span>Anime List</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href={`/${user.username}/submissions`}>
						<BookPlus className="mr-2 h-4 w-4" />
						<span>Submissions</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				{theme === "dark" ? (
					<DropdownMenuItem onClick={() => setTheme("light")} onSelect={(event) => event.preventDefault()}>
						<Moon className="mr-2 h-4 w-4" />
						<span>Dark mode</span>
					</DropdownMenuItem>
				) : (
					<DropdownMenuItem onClick={() => setTheme("dark")} onSelect={(event) => event.preventDefault()}>
						<Sun className="mr-2 h-4 w-4" />
						<span>Light mode</span>
					</DropdownMenuItem>
				)}
				{/* <DropdownMenu>
						<DropdownMenuTrigger className="w-full text-left flex">
							<Sun className="mr-2 h-4 w-4 my-auto rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
							i<span>Theme</span>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu> */}
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => logout()}>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Log out</span>
					<DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
