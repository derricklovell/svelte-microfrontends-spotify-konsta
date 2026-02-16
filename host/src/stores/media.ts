import { writable } from 'svelte/store';

export interface ActiveTrack {
	sectionName: string;
	index: number;
}

export const activeTrack = writable<ActiveTrack>({
	sectionName: 'Your top mixes',
	index: 0,
});

export function playTrack(sectionName: string, index: number) {
	activeTrack.set({ sectionName, index });
}

export function nextTrack(sectionName: string, totalItems: number) {
	activeTrack.update((current) => {
		if (current.sectionName === sectionName) {
			return {
				sectionName,
				index: (current.index + 1) % totalItems,
			};
		}
		return current;
	});
}

export function previousTrack(sectionName: string, totalItems: number) {
	activeTrack.update((current) => {
		if (current.sectionName === sectionName) {
			return {
				sectionName,
				index: Math.max(0, current.index - 1),
			};
		}
		return current;
	});
}
