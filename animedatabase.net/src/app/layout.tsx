import type { ReactNode } from "react";

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
