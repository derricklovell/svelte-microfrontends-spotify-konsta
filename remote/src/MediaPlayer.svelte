<script>
	import { Block, Button, Range, Toolbar, Link } from 'konsta/svelte';
	import { NEXT_SONG_EVENT } from '../../shared/shared';

	let isPlaying = false;
	let progress = 0;
	let volume = 75;
	let isShuffled = false;
	let repeatMode = 0;
</script>

<div class="now-playing-gradient border-t border-tahoe-separator h-[72px] w-full fixed bottom-0 left-0 z-50">
	<div class="flex items-center h-full px-4 gap-4 max-w-screen-2xl mx-auto">
		<!-- Left: Track info placeholder -->
		<div class="flex items-center gap-3 w-1/4 min-w-0">
			<div class="w-12 h-12 rounded-lg bg-tahoe-elevated shrink-0 flex items-center justify-center">
				<svg class="w-5 h-5 text-tahoe-text-tertiary" fill="currentColor" viewBox="0 0 20 20">
					<path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
				</svg>
			</div>
			<div class="min-w-0">
				<div class="text-white text-sm font-medium truncate">Waiting...</div>
				<div class="text-tahoe-text-secondary text-xs truncate">Select a track</div>
			</div>
		</div>

		<!-- Center: Controls + progress -->
		<div class="flex-1 flex flex-col items-center max-w-xl mx-auto">
			<div class="flex items-center gap-4 mb-1">
				<!-- Shuffle -->
				<button
					class="transition-colors {isShuffled ? 'text-tahoe-accent' : 'text-tahoe-text-secondary'} hover:text-white"
					on:click={() => (isShuffled = !isShuffled)}
				>
					<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
						<path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
					</svg>
				</button>

				<!-- Previous -->
				<button class="text-white hover:scale-105 transition-transform">
					<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
						<path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
					</svg>
				</button>

				<!-- Play/Pause -->
				<button
					class="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
					on:click={() => (isPlaying = !isPlaying)}
				>
					{#if isPlaying}
						<svg class="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
							<path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
						</svg>
					{:else}
						<svg class="w-4 h-4 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M8 5v14l11-7z" />
						</svg>
					{/if}
				</button>

				<!-- Next -->
				<Button
					clear
					small
					class="!p-0 !min-w-0"
					on:click={() => {
						const customEvent = new CustomEvent(NEXT_SONG_EVENT);
						window.dispatchEvent(customEvent);
					}}
				>
					<svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
						<path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
					</svg>
				</Button>

				<!-- Repeat -->
				<button
					class="transition-colors relative {repeatMode > 0 ? 'text-tahoe-accent' : 'text-tahoe-text-secondary'} hover:text-white"
					on:click={() => (repeatMode = (repeatMode + 1) % 3)}
				>
					<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
						<path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
					</svg>
					{#if repeatMode === 2}
						<span class="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[7px] font-bold text-tahoe-accent">1</span>
					{/if}
				</button>
			</div>

			<!-- Progress bar -->
			<div class="w-full flex items-center gap-2">
				<span class="text-tahoe-text-tertiary text-[11px] w-8 text-right tabular-nums">0:00</span>
				<div class="flex-1">
					<Range
						value={progress}
						min={0}
						max={100}
						step={1}
						onInput={(e) => (progress = e.target.value)}
					/>
				</div>
				<span class="text-tahoe-text-tertiary text-[11px] w-8 tabular-nums">0:00</span>
			</div>
		</div>

		<!-- Right: Volume + extras -->
		<div class="flex items-center gap-3 w-1/4 justify-end">
			<!-- Queue -->
			<button class="text-tahoe-text-secondary hover:text-white transition-colors hidden lg:block">
				<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
					<path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
				</svg>
			</button>

			<!-- Device -->
			<button class="text-tahoe-text-secondary hover:text-white transition-colors hidden lg:block">
				<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clip-rule="evenodd" />
				</svg>
			</button>

			<!-- Volume -->
			<svg class="w-4 h-4 text-tahoe-text-secondary shrink-0" fill="currentColor" viewBox="0 0 24 24">
				<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
			</svg>
			<div class="w-24 hidden md:block">
				<Range
					value={volume}
					min={0}
					max={100}
					step={1}
					onInput={(e) => (volume = e.target.value)}
				/>
			</div>
		</div>
	</div>
</div>

<style>
	.now-playing-gradient {
		background: linear-gradient(180deg, rgba(44, 44, 46, 0.9) 0%, rgba(30, 30, 30, 0.95) 100%);
		backdrop-filter: blur(40px);
		-webkit-backdrop-filter: blur(40px);
	}

	.text-tahoe-text-secondary {
		color: rgba(235, 235, 245, 0.6);
	}

	.text-tahoe-text-tertiary {
		color: rgba(235, 235, 245, 0.3);
	}

	.text-tahoe-accent {
		color: #0A84FF;
	}

	.bg-tahoe-elevated {
		background: rgba(58, 58, 60, 0.75);
	}

	.border-tahoe-separator {
		border-color: rgba(84, 84, 88, 0.65);
	}
</style>
