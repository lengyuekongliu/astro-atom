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

export function collectionDateSort(
	a: CollectionEntry<"post">,
	b: CollectionEntry<"post">,
) {
	return b.data.publishDate.getTime() - a.data.publishDate.getTime();
}
