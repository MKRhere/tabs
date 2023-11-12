import { State } from "./deps/hyperactive.ts";

export type Tab = browser.tabs.Tab;
export type Container = browser.contextualIdentities.ContextualIdentity;

export const list = () => browser.tabs.query({});

export const tabs = new State(await list());
const update = async () => tabs.publish(await list());
browser.tabs.onCreated.addListener(update);
browser.tabs.onUpdated.addListener(update);
browser.tabs.onRemoved.addListener(update);

export const show = (tabId?: number) => tabId && browser.tabs.update(tabId, { active: true });
export const remove = (tabId?: number | number[]) => tabId && browser.tabs.remove(tabId);
export const containers = () => browser.contextualIdentities.query({});
export const filterByWindow = (windowId: number) => (tab: Tab) => tab.windowId === windowId;
export const filterByContainer = (id: string) => (tab: Tab) => tab.cookieStoreId === id;
export const filterByDomain =
	(domain: string, includeSubdomains = false) =>
	(tab: Tab) => {
		const { hostname } = new URL(tab.url!);
		return includeSubdomains ? hostname.endsWith(domain) : hostname === domain;
	};
