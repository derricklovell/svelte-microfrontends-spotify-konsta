<script>
	import { Block, Chip } from 'konsta/svelte';
	import { musics } from '../../mocks/musics';

	let activeIndex = 0;

	const categories = ['All', 'Music', 'Podcasts', 'Charts', 'New Releases'];
	let activeCategory = 'All';

	export function setActiveIndex(idx) {
		activeIndex = idx;
	}
</script>

<div class="w-full">
	<!-- Category chips -->
	<div class="px-4 pt-3 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
		{#each categories as cat}
			<Chip
				class="shrink-0 cursor-pointer {activeCategory === cat ? '!bg-tahoe-accent !text-white' : '!bg-tahoe-surface-solid !text-tahoe-text-secondary'}"
				on:click={() => (activeCategory = cat)}
			>
				{cat}
			</Chip>
		{/each}
	</div>

	<!-- Music sections -->
	{#each musics as { name, items }}
		<div class="px-4 pt-5 pb-1 flex justify-between items-center">
			<h2 class="text-white text-lg font-semibold">{name}</h2>
			<span class="text-tahoe-accent text-sm font-medium cursor-pointer hover:underline">See All</span>
		</div>

		<!-- Desktop: horizontal grid -->
		<div class="hidden md:block px-4 pb-2">
			<div class="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
				{#each items as { image, name: trackName, publisher }, index}
					<div
						class="tahoe-card p-3 cursor-pointer {index === activeIndex ? 'ring-2 ring-tahoe-accent' : ''}"
						on:click={() => (activeIndex = index)}
						on:keydown={() => {}}
						role="button"
						tabindex="0"
					>
						<img src={image} alt={trackName} class="w-full aspect-square object-cover rounded-xl mb-3" />
						<div class="text-white font-medium text-sm truncate">{trackName}</div>
						{#if publisher}
							<div class="text-tahoe-text-secondary text-xs mt-1 truncate">{publisher}</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<!-- Mobile: horizontal scroll list -->
		<div class="md:hidden overflow-x-auto no-scrollbar">
			<div class="flex gap-3 px-4 pb-2 pt-2">
				{#each items as { image, name: trackName, publisher }, index}
					<div
						class="tahoe-card p-2.5 cursor-pointer shrink-0 w-36 {index === activeIndex ? 'ring-2 ring-tahoe-accent' : ''}"
						on:click={() => (activeIndex = index)}
						on:keydown={() => {}}
						role="button"
						tabindex="0"
					>
						<img src={image} alt={trackName} class="w-full aspect-square object-cover rounded-lg mb-2" />
						<div class="text-white font-medium text-xs truncate">{trackName}</div>
						{#if publisher}
							<div class="text-tahoe-text-secondary text-[11px] mt-0.5 truncate">{publisher}</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>

<style>
	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}
	.no-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
