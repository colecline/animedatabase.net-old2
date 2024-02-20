import AuthProvider from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";

import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { ThemeProvider } from "@/contexts/ThemeProvider";

export const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<AuthProvider>
						<Header />
						<main className="max-w-7xl mx-auto">{children}</main>
					</AuthProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
