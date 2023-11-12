/// <reference types="https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/types/firefox-webext-browser/index.d.ts" />

const manifest: browser._manifest.WebExtensionManifest = {
	manifest_version: 3,
	name: "mkr/tabs",
	version: "0.0.0",
	permissions: ["tabs", "cookies", "contextualIdentities"],
	background: { scripts: ["ext/background.js"] },
	page_action: { default_popup: "ext/popup.html", default_title: "mkr/tabs" },
	commands: {
		// "search": { description: "Launch search", suggested_key: { default: "Ctrl+Shift+F" } },
		"search-tab": { description: "Launch search tab", suggested_key: { default: "Ctrl+Shift+F" } },
	},
};

console.log(JSON.stringify(manifest, null, "\t"));
