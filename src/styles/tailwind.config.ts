/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      typography: (theme: (arg0: string) => any) => ({
        DEFAULT: {
          css: {
            a: {
              "font-weight": "bold",
              "text-decoration": "none",
              '&:hover': {
                "text-decoration": "underline",
                "text-underline-offset": "2px"
              },
            },
            code: {
              "padding-left": "0.5rem",
              "padding-right": "0.5rem",
              "padding-top": "0.25rem",
              "padding-bottom": "0.25rem",
              "font-size": "0.875rem",
              "line-height": "1.25rem",
              "border-radius": "0.5rem",
              "background-color": theme("colors.color-150")
            },
          },
        },
        citrus: {
          css: {
            "--tw-prose-body": theme("colors.textColor / 1"),
            "--tw-prose-bold": theme("colors.textColor / 1"),
            "--tw-prose-bullets": theme("colors.textColor / 1"),
            "--tw-prose-code": theme("colors.color-600 / 1"),
            "--tw-prose-headings": theme("colors.color-600 / 1"),
            // "--tw-prose-hr": "0.5px dashed #666",
            "--tw-prose-links": theme("colors.link / 1"),
            "--tw-prose-quotes": theme("colors.quote / 1"),
            // "--tw-prose-th-borders": "#666",
            "code::before": { content: "none" },
            "code::after": { content: "none" },
          },
        },
      }),
    },
  },
}