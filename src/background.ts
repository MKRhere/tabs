/// <reference types="https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/types/firefox-webext-browser/index.d.ts" />

console.log("background script loaded");

browser.commands.onCommand.addListener(command => {
	console.log("onCommand event received for message: ", command);
	if (command === "search") return browser.action.openPopup();
	if (command === "search-tab") return browser.tabs.create({ url: "/ext/search.html" });
});
