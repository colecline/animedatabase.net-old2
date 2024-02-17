import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import "@/styles/globals.css";

type RootLayoutProps = {
	children: ReactNode;
};

export const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans"
});

function RootLayout({ children }: RootLayoutProps) {
	return (
		<html>
			<body className={cn("bg-background min-h-screen font-sans antialiased", fontSans.variable)}>
				{children}
			</body>
		</html>
	);
}

export default RootLayout;
