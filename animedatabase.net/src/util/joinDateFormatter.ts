export default function joinDateFormatter(date: string) {
	const toDate = new Date(date);
	const formatter = new Intl.DateTimeFormat("en", {
		month: "long",
		year: "numeric",
	});
	return formatter.format(toDate);
}
