import AuthProvider from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

import { Inter as FontSans } from "next/font/google";

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
						<main className="flex min-h-screen">{children}</main>
					</AuthProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
