import type { ReactNode } from "react";

import "@/styles/globals.css";

type RootLayoutProps = {
	children: ReactNode;
};

function RootLayout({ children }: RootLayoutProps) {
	return (
		<html>
			<body>{children}</body>
		</html>
	);
}

export default RootLayout;
