import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { Header } from "@/components/layout/Header";

type RootLayoutProps = {
	children: ReactNode;
};

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans"
});

function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={cn("bg-background min-h-screen font-sans antialiased", fontSans.variable)}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<Header />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}

export default RootLayout;
