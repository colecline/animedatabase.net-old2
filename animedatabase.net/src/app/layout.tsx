import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/contexts/ThemeProvider";

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
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}

export default RootLayout;
