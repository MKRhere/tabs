import { article, button, p } from "../deps/elements.ts";
import { Tab, remove, show } from "../model.ts";

export const result = (tab: Tab) =>
	article(
		button({ on: { click: () => remove(tab.id) } }, "❌"),
		button({ on: { click: () => show(tab.id) } }, tab.title),
		p(tab.url),
	);
