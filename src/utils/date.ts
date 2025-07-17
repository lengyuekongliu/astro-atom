import type { CollectionEntry } from "astro:content";
import { siteConfig } from "@/site.config";

export function getFormattedDate(
	date: Date | undefined,
	options?: Intl.DateTimeFormatOptions,
): string {
	if (date === undefined) {
		return "Invalid Date";
	}

	return new Intl.DateTimeFormat(siteConfig.date.locale, {
		...options,
	}).format(date);
}

export function formatDate(date: Date | undefined) {
	if (date === undefined) {
		return "Invalid Date";
	}
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}年${month}月${day}日`;
}

export function collectionDateSort(
	a: CollectionEntry<"post">,
	b: CollectionEntry<"post">,
) {
	return b.data.publishDate.getTime() - a.data.publishDate.getTime();
}
