import type { CollectionEntry } from "astro:content";
import { siteConfig } from "@/site.config";
import dayjs from "dayjs";

export function getFormattedDate(
	date: Date | undefined,
): string {
	if (date === undefined) {
		return "Invalid Date";
	}
	return dayjs(date).format("YYYY年MM月DD日")
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
