import { writable } from 'svelte/store';

export type PageName = 'home' | 'search' | 'library' | 'nowplaying';

export const currentPage = writable<PageName>('home');
export const pageHistory = writable<PageName[]>(['home']);
export const panelOpen = writable(false);
export const nowPlayingOpen = writable(false);

export function navigateTo(page: PageName) {
	currentPage.set(page);
	pageHistory.update((h) => [...h, page]);
}

export function goBack() {
	pageHistory.update((h) => {
		if (h.length > 1) {
			h.pop();
			const prev = h[h.length - 1];
			currentPage.set(prev);
			return h;
		}
		return h;
	});
}
