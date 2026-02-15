<script>
	import { List, ListItem, Segmented, SegmentedButton } from 'konsta/svelte';

	let activeSegment = 0;
	const segments = ['Playlists', 'Artists', 'Albums'];

	const playlists = [
		{ name: 'Liked Songs', count: 147, icon: 'heart' },
		{ name: 'Chill Vibes', count: 42, icon: 'music' },
		{ name: 'Workout Energy', count: 38, icon: 'music' },
		{ name: 'Study Focus', count: 65, icon: 'music' },
		{ name: 'Road Trip Mix', count: 53, icon: 'music' },
		{ name: 'Evening Acoustic', count: 29, icon: 'music' },
	];

	const artists = [
		{ name: 'Martin Garrix', followers: '18.2M' },
		{ name: 'Tiësto', followers: '12.4M' },
		{ name: 'Vicetone', followers: '2.1M' },
		{ name: 'Alan Walker', followers: '24.8M' },
		{ name: 'James Hype', followers: '3.5M' },
		{ name: 'Jax Jones', followers: '5.7M' },
	];

	const albums = [
		{ name: 'Starlight EP', artist: 'Martin Garrix', year: '2023' },
		{ name: 'The Motto', artist: 'Tiësto', year: '2022' },
		{ name: 'Nevada', artist: 'Vicetone', year: '2016' },
		{ name: 'Different World', artist: 'Alan Walker', year: '2018' },
		{ name: 'Ferrari EP', artist: 'James Hype', year: '2023' },
	];
</script>

<div class="w-full">
	<!-- Segmented Control -->
	<div class="px-4 pt-3 pb-1">
		<Segmented strong rounded
			colors={{
				strongBgIos: 'bg-tahoe-surface-solid',
				strongBgMaterial: 'bg-tahoe-surface-solid',
			}}
		>
			{#each segments as seg, i}
				<SegmentedButton
					active={activeSegment === i}
					on:click={() => (activeSegment = i)}
				>
					{seg}
				</SegmentedButton>
			{/each}
		</Segmented>
	</div>

	<!-- Content based on active segment -->
	{#if activeSegment === 0}
		<List strong inset outline class="!mt-4"
			colors={{
				bgIos: 'bg-tahoe-surface-solid',
				bgMaterial: 'bg-tahoe-surface-solid',
			}}
		>
			{#each playlists as playlist}
				<ListItem
					title={playlist.name}
					after={`${playlist.count} songs`}
					link
					colors={{
						titleIos: 'text-white',
						titleMaterial: 'text-white',
						afterIos: 'text-tahoe-text-tertiary',
						afterMaterial: 'text-tahoe-text-tertiary',
					}}
				>
					<svelte:fragment slot="media">
						<div class="w-12 h-12 rounded-lg flex items-center justify-center {playlist.icon === 'heart' ? 'bg-gradient-to-br from-purple-600 to-blue-400' : 'bg-tahoe-elevated'}">
							{#if playlist.icon === 'heart'}
								<svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
								</svg>
							{:else}
								<svg class="w-5 h-5 text-tahoe-text-secondary" fill="currentColor" viewBox="0 0 20 20">
									<path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
								</svg>
							{/if}
						</div>
					</svelte:fragment>
				</ListItem>
			{/each}
		</List>
	{:else if activeSegment === 1}
		<List strong inset outline class="!mt-4"
			colors={{
				bgIos: 'bg-tahoe-surface-solid',
				bgMaterial: 'bg-tahoe-surface-solid',
			}}
		>
			{#each artists as artist}
				<ListItem
					title={artist.name}
					subtitle={`${artist.followers} followers`}
					link
					colors={{
						titleIos: 'text-white',
						titleMaterial: 'text-white',
						subtitleIos: 'text-tahoe-text-secondary',
						subtitleMaterial: 'text-tahoe-text-secondary',
					}}
				>
					<svelte:fragment slot="media">
						<div class="w-12 h-12 rounded-full bg-tahoe-elevated flex items-center justify-center">
							<svg class="w-5 h-5 text-tahoe-text-secondary" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
							</svg>
						</div>
					</svelte:fragment>
				</ListItem>
			{/each}
		</List>
	{:else}
		<List strong inset outline class="!mt-4"
			colors={{
				bgIos: 'bg-tahoe-surface-solid',
				bgMaterial: 'bg-tahoe-surface-solid',
			}}
		>
			{#each albums as album}
				<ListItem
					title={album.name}
					subtitle={`${album.artist} · ${album.year}`}
					link
					colors={{
						titleIos: 'text-white',
						titleMaterial: 'text-white',
						subtitleIos: 'text-tahoe-text-secondary',
						subtitleMaterial: 'text-tahoe-text-secondary',
					}}
				>
					<svelte:fragment slot="media">
						<div class="w-12 h-12 rounded-lg bg-tahoe-elevated flex items-center justify-center">
							<svg class="w-5 h-5 text-tahoe-text-secondary" fill="currentColor" viewBox="0 0 20 20">
								<path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
							</svg>
						</div>
					</svelte:fragment>
				</ListItem>
			{/each}
		</List>
	{/if}
</div>
