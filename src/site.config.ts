import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
	// Used as both a meta property (src/components/BaseHead.astro L:31 + L:49) & the generated satori png (src/pages/og-image/[slug].png.ts)
	author: "KongLiu",
	// Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
	date: {
		locale: "zh-CN"
	},
	// Used as the default description meta property and webmanifest description
	description: "An opinionated starter theme for Astro",
	// HTML lang property, found in src/layouts/Base.astro L:18 & astro.config.ts L:48
	lang: "zh-CN",
	// Meta property, found in src/components/BaseHead.astro L:42
	ogLocale: "zh-CN",
	// Used to construct the meta title property found in src/components/BaseHead.astro L:11, and webmanifest name found in astro.config.ts L:42
	title: "KongLiu's Blog",
	icp: "粤ICP备2024236056号"
};

// Used to generate links in both the Header & Footer.
export const menuLinks: { path: string; title: string }[] = [
	{
		path: "/",
		title: "主页",
	},
	{
		path: "/archive",
		title: "归档",
	},
	{
		path: "/tags",
		title: "标签",
	},
	{
		path: "/about",
		title: "关于",
	},
];