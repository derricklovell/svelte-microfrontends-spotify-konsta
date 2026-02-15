<script>
	import { Searchbar, List, ListItem } from 'konsta/svelte';
	import { musics } from '../../mocks/musics';

	let searchValue = '';

	// Flatten all tracks for search
	$: allTracks = musics.flatMap((section) => section.items);
	$: filteredTracks = searchValue
		? allTracks.filter(
				(t) =>
					t.name.toLowerCase().includes(searchValue.toLowerCase()) ||
					t.publisher.toLowerCase().includes(searchValue.toLowerCase())
			)
		: allTracks;

	const genres = [
		{ name: 'Pop', color: '#FF375F' },
		{ name: 'Hip-Hop', color: '#FF9F0A' },
		{ name: 'Rock', color: '#FF453A' },
		{ name: 'Electronic', color: '#0A84FF' },
		{ name: 'Latin', color: '#30D158' },
		{ name: 'R&B', color: '#BF5AF2' },
		{ name: 'Indie', color: '#64D2FF' },
		{ name: 'Jazz', color: '#FFD60A' },
	];
</script>

<div class="w-full">
	<!-- Search bar -->
	<div class="px-4 pt-3 pb-1">
		<Searchbar
			placeholder="Artists, songs, or podcasts"
			value={searchValue}
			onInput={(e) => (searchValue = e.target.value)}
			onClear={() => (searchValue = '')}
		/>
	</div>

	{#if searchValue}
		<!-- Search results -->
		<div class="px-4 mt-2">
			<List strong inset outline class="!mb-0"
				colors={{
					bgIos: 'bg-tahoe-surface-solid',
					bgMaterial: 'bg-tahoe-surface-solid',
				}}
			>
				{#each filteredTracks as track}
					<ListItem
						title={track.name}
						subtitle={track.publisher || 'Song'}
						colors={{
							titleIos: 'text-white',
							titleMaterial: 'text-white',
							subtitleIos: 'text-tahoe-text-secondary',
							subtitleMaterial: 'text-tahoe-text-secondary',
						}}
					>
						<svelte:fragment slot="media">
							<img
								src={track.image}
								alt={track.name}
								class="w-12 h-12 rounded-lg object-cover"
							/>
						</svelte:fragment>
					</ListItem>
				{/each}
				{#if filteredTracks.length === 0}
					<ListItem
						title="No results found"
						colors={{
							titleIos: 'text-tahoe-text-secondary',
							titleMaterial: 'text-tahoe-text-secondary',
						}}
					/>
				{/if}
			</List>
		</div>
	{:else}
		<!-- Browse categories -->
		<div class="px-4 mt-4 mb-3">
			<h2 class="text-white text-lg font-semibold">Browse All</h2>
		</div>
		<div class="grid grid-cols-2 gap-3 px-4">
			{#each genres as genre}
				<div
					class="rounded-tahoe p-4 h-24 flex items-end cursor-pointer transition-transform hover:scale-[1.02]"
					style="background: linear-gradient(135deg, {genre.color}, {genre.color}88)"
				>
					<span class="text-white font-bold text-base">{genre.name}</span>
				</div>
			{/each}
		</div>
	{/if}
</div>
