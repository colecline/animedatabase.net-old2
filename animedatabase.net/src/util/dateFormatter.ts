export default function dateFormatter(date: string) {
	const options: Intl.DateTimeFormatOptions = {
		month: "long" as const, // "September"
		day: "numeric" as const, // "16"
		year: "numeric" as const, // "2023"
		hour: "numeric" as const, // "4"
		minute: "2-digit" as const, // "00"
		timeZoneName: "short" as const, // "CST"
		hour12: true,
	};

	const formatter = new Intl.DateTimeFormat("en-US", options);
	return formatter.format(new Date(date));
}
