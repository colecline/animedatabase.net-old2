"use client";

import React from "react";
import Link from "next/link";

import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuTrigger,
	NavigationMenuContent,
	NavigationMenuLink,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const browse: { title: string; href: string; description: string }[] = [
	{
		title: "Anime",
		href: "/anime",
		description: "Browse anime content",
	},
	{
		title: "Manga",
		href: "/manga",
		description: "Browse manga content",
	},
];

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
	({ className, title, children, ...props }, ref) => {
		return (
			<li>
				<NavigationMenuLink asChild>
					<a
						ref={ref}
						className={cn(
							"hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
							className,
						)}
						{...props}>
						<div className="text-sm font-medium leading-none">{title}</div>
						<p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
					</a>
				</NavigationMenuLink>
			</li>
		);
	},
);
ListItem.displayName = "ListItem";

function Navbar() {
	return (
		<NavigationMenu>
			<NavigationMenuList className="space-x-2">
				<NavigationMenuItem>
					<NavigationMenuTrigger>Browse</NavigationMenuTrigger>

					<NavigationMenuContent>
						<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
							{browse.map((item) => (
								<ListItem key={item.title} title={item.title} href={item.href}>
									{item.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link href="/submissions" legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>Submissions</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

export default Navbar;
