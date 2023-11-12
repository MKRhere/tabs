/// <reference types="https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/types/firefox-webext-browser/index.d.ts" />

import { renderDOM, State, bind } from "./deps/hyperactive.ts";
import { body, div, form, input, ul, li } from "./deps/elements.ts";
import type { Document, HTMLDivElement, HTMLInputElement } from "./deps/dom.ts";
import { Tab, tabs } from "./model.ts";
import { result } from "./search/result.ts";
declare var document: Document;

const search = new State("");
const tokens = search.map(search =>
	search
		.split(" ")
		.map(token => token.trim().toLowerCase())
		.filter(Boolean),
);

const filter = (tabs: Tab[]) =>
	tabs.filter(tab => tokens.value.every(token => tab.title?.toLowerCase().includes(token)));

const filtered = new State<Tab[]>([]);
tabs.listen(async tabs => filtered.publish(filter(tabs)));
tokens.listen(async () => filtered.publish(filter(tabs.value)));

const content = div(
	form(bind(input({ type: "text", name: "search" }), search)),
	div({
		ref(el: HTMLDivElement) {
			filtered.listen(async tabs => renderDOM(el, ul(...tabs.map(tab => li(result(tab))))));
		},
	}),
);

const app = document.getElementById("app")!;
renderDOM(app, body(content));
