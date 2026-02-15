<script>
	import { createEventDispatcher } from 'svelte';
	import { Range } from 'konsta/svelte';
	import { nowPlayingOpen } from '../../stores/navigation';
	import { musics } from '../../mocks/musics';

	const dispatch = createEventDispatcher();

	export let activeIndex = 0;
	export let isPlaying = true;

	$: currentTrack = musics[0]?.items[activeIndex] || musics[0]?.items[0];

	let progress = 32;
	let volume = 75;
	let isShuffled = false;
	let repeatMode = 0;
</script>

<div class="h-full w-full flex flex-col bg-[#1a1a1c] overflow-y-auto">
	<!-- Header -->
	<div class="tahoe-toolbar shrink-0">
		<div class="flex items-center justify-between h-11 px-4 pt-2">
			<button class="text-tahoe-accent p-1 -ml-1" on:click={() => nowPlayingOpen.set(false)}>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
				</svg>
			</button>
			<div class="text-center flex-1">
				<div class="text-tahoe-text-secondary text-[11px] uppercase tracking-wider font-medium">Playing From</div>
				<div class="text-white text-sm font-medium">Your top mixes</div>
			</div>
			<button class="text-tahoe-text-secondary p-1 -mr-1">
				<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
					<path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
				</svg>
			</button>
		</div>
	</div>

	<!-- Album Art -->
	<div class="px-8 mt-4 flex-shrink-0">
		<div class="w-full aspect-square max-w-sm mx-auto rounded-2xl overflow-hidden shadow-2xl">
			{#if currentTrack}
				<img src={currentTrack.image} alt={currentTrack.name} class="w-full h-full object-cover" />
			{:else}
				<div class="w-full h-full bg-tahoe-elevated flex items-center justify-center">
					<svg class="w-20 h-20 text-tahoe-text-tertiary" fill="currentColor" viewBox="0 0 20 20">
						<path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
					</svg>
				</div>
			{/if}
		</div>
	</div>

	<!-- Track Info -->
	<div class="px-8 mt-6 flex justify-between items-start flex-shrink-0">
		<div class="min-w-0 flex-1 mr-4">
			<h2 class="text-white text-xl font-bold truncate">{currentTrack?.name || 'No Track'}</h2>
			<p class="text-tahoe-text-secondary text-base mt-1 truncate">{currentTrack?.publisher || ''}</p>
		</div>
		<button class="text-tahoe-text-secondary hover:text-tahoe-accent transition-colors mt-1 shrink-0">
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
			</svg>
		</button>
	</div>

	<!-- Progress -->
	<div class="px-8 mt-6 flex-shrink-0">
		<Range value={progress} min={0} max={100} step={1} onInput={(e) => (progress = e.target.value)} />
		<div class="flex justify-between mt-1">
			<span class="text-tahoe-text-tertiary text-xs">1:12</span>
			<span class="text-tahoe-text-tertiary text-xs">3:45</span>
		</div>
	</div>

	<!-- Controls -->
	<div class="flex items-center justify-between px-8 mt-4 flex-shrink-0">
		<button class="transition-colors {isShuffled ? 'text-tahoe-accent' : 'text-tahoe-text-secondary'}" on:click={() => (isShuffled = !isShuffled)}>
			<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" /></svg>
		</button>
		<button class="text-white">
			<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg>
		</button>
		<button class="w-16 h-16 rounded-full bg-white flex items-center justify-center active:scale-95 transition-transform" on:click={() => dispatch('togglePlay')}>
			{#if isPlaying}
				<svg class="w-7 h-7 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" /></svg>
			{:else}
				<svg class="w-7 h-7 text-black ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
			{/if}
		</button>
		<button class="text-white" on:click={() => dispatch('nextSong')}>
			<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
		</button>
		<button class="relative transition-colors {repeatMode > 0 ? 'text-tahoe-accent' : 'text-tahoe-text-secondary'}" on:click={() => (repeatMode = (repeatMode + 1) % 3)}>
			<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" /></svg>
			{#if repeatMode === 2}
				<span class="absolute -top-1 -right-1 text-[8px] font-bold text-tahoe-accent">1</span>
			{/if}
		</button>
	</div>

	<!-- Volume -->
	<div class="px-8 mt-6 flex items-center gap-3 flex-shrink-0">
		<svg class="w-4 h-4 text-tahoe-text-tertiary shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3z" /></svg>
		<div class="flex-1">
			<Range value={volume} min={0} max={100} step={1} onInput={(e) => (volume = e.target.value)} />
		</div>
		<svg class="w-4 h-4 text-tahoe-text-tertiary shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
	</div>

	<div class="h-8 flex-shrink-0"></div>
</div>
