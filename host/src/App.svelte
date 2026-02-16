<script>
	import {
		App,
		Page,
		Panel,
		Navbar,
		List,
		ListItem,
		Block,
		Tabbar,
		TabbarLink,
		Link,
		Popup,
		Range,
	} from 'konsta/svelte';
	import { loadRemoteModule } from '@softarc/native-federation';
	import { musics } from './mocks/musics';
	import { onMount, mount } from 'svelte';
	import { NEXT_SONG_EVENT } from '../../shared/shared';
	import {
		currentPage,
		panelOpen,
		nowPlayingOpen,
		navigateTo,
		goBack,
		pageHistory,
	} from './stores/navigation';
	import { activeTrack, nextTrack, playTrack } from './stores/media';

	import HomePage from './components/pages/HomePage.svelte';
	import SearchPage from './components/pages/SearchPage.svelte';
	import LibraryPage from './components/pages/LibraryPage.svelte';
	import NowPlayingPage from './components/pages/NowPlayingPage.svelte';

	// MFE remote placeholder
	let remoteAppTarget;

	// Track state — player is ACTIVE by default
	let currentTrack = musics[0]?.items[0];
	$: {
		const track = $activeTrack;
		// Find the section with the matching name
		const section = musics.find(s => s.name === track.sectionName);
		currentTrack = section?.items[track.index];
	}
	let isPlaying = true;
	let miniProgress = 32;

	const onNextSong = () => {
		const track = $activeTrack;
		const section = musics.find(s => s.name === track.sectionName);
		const allTracks = section?.items || [];
		const newIndex = (track.index + 1) % allTracks.length;
		playTrack(track.sectionName, newIndex);
	};

	onMount(function () {
		window.addEventListener(NEXT_SONG_EVENT, onNextSong);

		// Load remote module after component mounts
		(async () => {
			try {
				const app = await loadRemoteModule('remote', './remote-mediaplayer');
				if (remoteAppTarget) {
					mount(app.default, { target: remoteAppTarget });
				}
			} catch (e) {
				console.warn('Remote media player not available:', e);
			}
		})();

		return () => window.removeEventListener(NEXT_SONG_EVENT, onNextSong);
	});

	// Responsive detection
	let innerWidth = 0;
	$: isDesktop = innerWidth >= 1024;
	$: isTablet = innerWidth >= 768 && innerWidth < 1024;
	$: isMobile = innerWidth < 768;

	// Dynamic navbar title
	$: navbarTitle = $currentPage === 'home' ? 'Browse' : $currentPage === 'search' ? 'Search' : $currentPage === 'library' ? 'Your Library' : 'Browse';
</script>

<svelte:window bind:innerWidth />

<App theme="ios" safeAreas dark>
	<!-- Side Panel (mobile/tablet slide-out) -->
	{#if !isDesktop}
		<Panel
			side="left"
			opened={$panelOpen}
			onBackdropClick={() => panelOpen.set(false)}
			colors={{
				bgIos: 'bg-[#1a1a1c]',
				bgMaterial: 'bg-[#1a1a1c]',
			}}
		>
			<Page colors={{ bgIos: 'bg-transparent', bgMaterial: 'bg-transparent' }}>
				<Navbar
					title="Music"
					colors={{
						bgIos: 'bg-transparent',
						bgMaterial: 'bg-transparent',
						titleIos: 'text-white',
						titleMaterial: 'text-white',
					}}
				/>
				<Block class="!mt-2 !mb-4 !px-4">
					<div class="flex items-center gap-3">
						<div class="w-10 h-10 rounded-xl bg-gradient-to-br from-tahoe-accent to-purple-600 flex items-center justify-center">
							<svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
								<path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
							</svg>
						</div>
						<div>
							<div class="text-white font-semibold text-lg">Music</div>
							<div class="text-tahoe-text-tertiary text-xs">Player</div>
						</div>
					</div>
				</Block>
				<List strong inset colors={{ bgIos: 'bg-tahoe-surface-solid', bgMaterial: 'bg-tahoe-surface-solid' }}>
					<ListItem title="Home" link on:click={() => { navigateTo('home'); panelOpen.set(false); }}
						colors={{ titleIos: $currentPage === 'home' ? 'text-tahoe-accent' : 'text-white', titleMaterial: $currentPage === 'home' ? 'text-tahoe-accent' : 'text-white' }}
					>
						<svelte:fragment slot="media">
							<svg class="w-5 h-5 {$currentPage === 'home' ? 'text-tahoe-accent' : 'text-tahoe-text-secondary'}" fill="currentColor" viewBox="0 0 20 20">
								<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
							</svg>
						</svelte:fragment>
					</ListItem>
					<ListItem title="Search" link on:click={() => { navigateTo('search'); panelOpen.set(false); }}
						colors={{ titleIos: $currentPage === 'search' ? 'text-tahoe-accent' : 'text-white', titleMaterial: $currentPage === 'search' ? 'text-tahoe-accent' : 'text-white' }}
					>
						<svelte:fragment slot="media">
							<svg class="w-5 h-5 {$currentPage === 'search' ? 'text-tahoe-accent' : 'text-tahoe-text-secondary'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
						</svelte:fragment>
					</ListItem>
					<ListItem title="Your Library" link on:click={() => { navigateTo('library'); panelOpen.set(false); }}
						colors={{ titleIos: $currentPage === 'library' ? 'text-tahoe-accent' : 'text-white', titleMaterial: $currentPage === 'library' ? 'text-tahoe-accent' : 'text-white' }}
					>
						<svelte:fragment slot="media">
							<svg class="w-5 h-5 {$currentPage === 'library' ? 'text-tahoe-accent' : 'text-tahoe-text-secondary'}" fill="currentColor" viewBox="0 0 20 20">
								<path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
							</svg>
						</svelte:fragment>
					</ListItem>
				</List>
				<Block class="!px-4 !mt-6">
					<h3 class="text-tahoe-text-tertiary text-xs uppercase tracking-wider font-semibold mb-3">Quick Access</h3>
				</Block>
				<List strong inset colors={{ bgIos: 'bg-tahoe-surface-solid', bgMaterial: 'bg-tahoe-surface-solid' }}>
					<ListItem title="Liked Songs" subtitle="147 songs" link
						colors={{ titleIos: 'text-white', titleMaterial: 'text-white', subtitleIos: 'text-tahoe-text-tertiary', subtitleMaterial: 'text-tahoe-text-tertiary' }}
					>
						<svelte:fragment slot="media">
							<div class="w-8 h-8 rounded-md bg-gradient-to-br from-purple-600 to-blue-400 flex items-center justify-center">
								<svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" /></svg>
							</div>
						</svelte:fragment>
					</ListItem>
					<ListItem title="Recently Played" subtitle="Updated just now" link
						colors={{ titleIos: 'text-white', titleMaterial: 'text-white', subtitleIos: 'text-tahoe-text-tertiary', subtitleMaterial: 'text-tahoe-text-tertiary' }}
					>
						<svelte:fragment slot="media">
							<div class="w-8 h-8 rounded-md bg-tahoe-elevated flex items-center justify-center">
								<svg class="w-4 h-4 text-tahoe-text-secondary" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" /></svg>
							</div>
						</svelte:fragment>
					</ListItem>
				</List>
			</Page>
		</Panel>
	{/if}

	<!-- Now Playing Popup (mobile full-screen) -->
	<Popup
		opened={$nowPlayingOpen && isMobile}
		onBackdropClick={() => nowPlayingOpen.set(false)}
		colors={{ bgIos: 'bg-[#1a1a1c]', bgMaterial: 'bg-[#1a1a1c]' }}
	>
		<NowPlayingPage {isPlaying} on:togglePlay={() => (isPlaying = !isPlaying)} on:nextSong={onNextSong} />
	</Popup>

	<!-- Main Layout (NO nested Page — just divs for content flow) -->
	<Page colors={{ bgIos: 'bg-[#1a1a1c]', bgMaterial: 'bg-[#1a1a1c]' }}>
		<div class="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 text-xs z-50 pointer-events-none">
			Test: innerWidth={innerWidth}, isMobile={isMobile}
		</div>
		<div class="flex h-full w-full">
			<!-- Desktop sidebar (persistent) -->
			{#if isDesktop}
				<aside class="w-64 xl:w-72 shrink-0 h-full tahoe-panel border-r border-tahoe-separator overflow-y-auto tahoe-scroll">
					<div class="px-5 pt-5 pb-2">
						<div class="flex items-center gap-3">
							<div class="w-9 h-9 rounded-xl bg-gradient-to-br from-tahoe-accent to-purple-600 flex items-center justify-center">
								<svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" /></svg>
							</div>
							<span class="text-white font-semibold text-lg">Music</span>
						</div>
					</div>
					<nav class="mt-4 px-3">
						{#each [
							{ id: 'home', label: 'Home', icon: 'M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z', fill: true },
							{ id: 'search', label: 'Search', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', fill: false },
							{ id: 'library', label: 'Your Library', icon: 'M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z', fill: true },
						] as navItem}
							<button
								class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors {$currentPage === navItem.id ? 'tahoe-nav-active text-white' : 'text-tahoe-text-secondary hover:text-white hover:bg-white/5'}"
								on:click={() => navigateTo(navItem.id)}
							>
								{#if navItem.fill}
									<svg class="w-5 h-5 {$currentPage === navItem.id ? 'text-tahoe-accent' : ''}" fill="currentColor" viewBox="0 0 20 20"><path d={navItem.icon} /></svg>
								{:else}
									<svg class="w-5 h-5 {$currentPage === navItem.id ? 'text-tahoe-accent' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={navItem.icon} /></svg>
								{/if}
								<span class="font-medium text-sm">{navItem.label}</span>
							</button>
						{/each}
					</nav>
					<div class="mx-5 my-4 border-t border-tahoe-separator"></div>
					<div class="px-5 mb-2">
						<h3 class="text-tahoe-text-tertiary text-[11px] uppercase tracking-wider font-semibold">Playlists</h3>
					</div>
					<nav class="px-3 pb-4">
						{#each [
							{ name: 'Liked Songs', count: '147 songs', gradient: 'from-purple-600 to-blue-400', iconPath: 'M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z' },
							{ name: 'Chill Vibes', count: '42 songs', gradient: null, iconPath: 'M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z' },
							{ name: 'Workout Energy', count: '38 songs', gradient: null, iconPath: 'M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z' },
							{ name: 'Study Focus', count: '65 songs', gradient: null, iconPath: 'M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z' },
						] as playlist}
							<button class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-tahoe-text-secondary hover:text-white hover:bg-white/5 transition-colors">
								<div class="w-8 h-8 rounded-md {playlist.gradient ? `bg-gradient-to-br ${playlist.gradient}` : 'bg-tahoe-elevated'} flex items-center justify-center shrink-0">
									<svg class="w-4 h-4 {playlist.gradient ? 'text-white' : 'text-tahoe-text-secondary'}" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d={playlist.iconPath} clip-rule="evenodd" /></svg>
								</div>
								<div class="min-w-0">
									<div class="text-sm font-medium truncate">{playlist.name}</div>
									<div class="text-[11px] text-tahoe-text-tertiary">{playlist.count}</div>
								</div>
							</button>
						{/each}
					</nav>
				</aside>
			{/if}

			<!-- Main content column -->
			<div class="flex-1 flex flex-col h-full min-w-0">
				<!-- Top bar -->
				{#if !isDesktop}
					<div class="tahoe-toolbar border-b border-tahoe-separator shrink-0 z-30">
						<div class="flex items-center h-11 px-4">
							<button class="text-tahoe-accent mr-3 -ml-1" on:click={() => panelOpen.set(true)}>
								<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
							</button>
							<h1 class="text-white font-semibold text-[17px] flex-1">{navbarTitle}</h1>
							<button class="text-tahoe-text-secondary">
								<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" /></svg>
							</button>
						</div>
					</div>
				{:else}
					<div class="tahoe-toolbar border-b border-tahoe-separator shrink-0 z-30">
						<div class="flex items-center h-12 px-6">
							<h1 class="text-white font-semibold text-xl flex-1">{navbarTitle}</h1>
							<button class="text-tahoe-text-secondary hover:text-white transition-colors">
								<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" /></svg>
							</button>
						</div>
					</div>
				{/if}

				<!-- Scrollable page content -->
				<div class="flex-1 overflow-y-auto tahoe-scroll">
					<div style="padding-bottom: {isMobile ? '10rem' : isTablet ? '5.5rem' : '5.5rem'};">
						{#if $currentPage === 'home'}
							<HomePage />
						{:else if $currentPage === 'search'}
							<SearchPage />
						{:else if $currentPage === 'library'}
							<LibraryPage />
						{/if}
					</div>
				</div>
			</div>
		</div>
	</Page>

	<!-- MOBILE: Fixed mini player — sits between content and tabbar -->
	{#if isMobile && currentTrack && !$nowPlayingOpen}
		<div class="fixed left-0 right-0 z-[100] now-playing-gradient border-t border-tahoe-separator" style="bottom: 50px;">
			<div
				class="w-full flex items-center px-3 py-2 gap-3 cursor-pointer hover:bg-white/5 transition-colors"
				on:click={() => nowPlayingOpen.set(true)}
				role="button"
				tabindex="0"
				on:keydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						nowPlayingOpen.set(true);
					}
				}}
			>
				<div class="relative shrink-0">
					<img src={currentTrack.image} alt={currentTrack.name} class="w-10 h-10 rounded-lg object-cover" />
					{#if currentTrack.type === 'video' || currentTrack.type === 'movie'}
						<div class="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
							<svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
								<path d="M8 5v14l11-7z" />
							</svg>
						</div>
					{/if}
				</div>
				<div class="flex-1 min-w-0 text-left">
					<div class="text-white text-sm font-medium truncate">{currentTrack.name}</div>
					<div class="text-tahoe-text-secondary text-xs truncate">{currentTrack.publisher || ''}</div>
				</div>
				<button class="text-white p-2" on:click|stopPropagation={() => (isPlaying = !isPlaying)}>
					{#if isPlaying}
						<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" /></svg>
					{:else}
						<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
					{/if}
				</button>
				<button class="text-white p-2" on:click|stopPropagation={onNextSong}>
					<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
				</button>
			</div>
			<div class="h-0.5 bg-tahoe-separator">
				<div class="h-full bg-tahoe-accent transition-all" style="width: {miniProgress}%"></div>
			</div>
		</div>
	{/if}

	<!-- TABLET/DESKTOP: Fixed bottom player bar -->
	{#if !isMobile && currentTrack}
		<div class="fixed bottom-0 left-0 right-0 z-[100] now-playing-gradient border-t border-tahoe-separator" style="height: 72px;">
			<div class="flex items-center h-full px-4 gap-4">
				<!-- Left: Track info -->
				<div class="flex items-center gap-3 w-1/4 min-w-0" style="margin-left: {isDesktop ? '16rem' : '0'};">
					<img src={currentTrack.image} alt={currentTrack.name} class="w-12 h-12 rounded-lg object-cover shrink-0" />
					<div class="min-w-0">
						<div class="text-white text-sm font-medium truncate">{currentTrack.name}</div>
						<div class="text-tahoe-text-secondary text-xs truncate">{currentTrack.publisher || ''}</div>
					</div>
					<button class="text-tahoe-text-secondary hover:text-white transition-colors shrink-0 ml-2">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
					</button>
				</div>

				<!-- Center: Controls + progress -->
				<div class="flex-1 flex flex-col items-center max-w-xl mx-auto">
					<div class="flex items-center gap-4 mb-1">
						<button class="text-tahoe-text-secondary hover:text-white transition-colors">
							<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" /></svg>
						</button>
						<button class="text-white hover:scale-105 transition-transform">
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg>
						</button>
						<button class="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform" on:click={() => (isPlaying = !isPlaying)}>
							{#if isPlaying}
								<svg class="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" /></svg>
							{:else}
								<svg class="w-4 h-4 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
							{/if}
						</button>
						<button class="text-white hover:scale-105 transition-transform" on:click={onNextSong}>
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
						</button>
						<button class="text-tahoe-text-secondary hover:text-white transition-colors">
							<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" /></svg>
						</button>
					</div>
					<div class="w-full flex items-center gap-2">
						<span class="text-tahoe-text-tertiary text-[11px] w-8 text-right">1:12</span>
						<div class="flex-1">
							<Range value={miniProgress} min={0} max={100} step={1} />
						</div>
						<span class="text-tahoe-text-tertiary text-[11px] w-8">3:45</span>
					</div>
				</div>

				<!-- Right: Volume -->
				<div class="flex items-center gap-3 w-1/4 justify-end">
					<button class="text-tahoe-text-secondary hover:text-white transition-colors hidden lg:block">
						<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" /></svg>
					</button>
					<svg class="w-4 h-4 text-tahoe-text-secondary shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
					<div class="w-24 hidden md:block">
						<Range value={75} min={0} max={100} step={1} />
					</div>
				</div>
			</div>
			<!-- MFE remote target (hidden) -->
			<div class="hidden" bind:this={remoteAppTarget}></div>
		</div>
	{/if}

	<!-- Mobile Tabbar — hidden when NowPlaying popup is open -->
	{#if isMobile && !$nowPlayingOpen}
		<Tabbar
			icons
			labels
			class="!fixed !bottom-0 !left-0 !right-0 !z-[90]"
			colors={{
				bgIos: 'bg-[#1a1a1c]/95 backdrop-blur-xl',
			}}
		>
			<TabbarLink
				active={$currentPage === 'home'}
				label="Home"
				on:click={() => navigateTo('home')}
				colors={{
					textActiveIos: 'text-tahoe-accent',
					textIos: 'text-tahoe-text-secondary',
					iconBgActiveIos: 'bg-transparent',
					iconBgIos: 'bg-transparent',
				}}
			>
				<svelte:fragment slot="icon">
					<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
				</svelte:fragment>
			</TabbarLink>
			<TabbarLink
				active={$currentPage === 'search'}
				label="Search"
				on:click={() => navigateTo('search')}
				colors={{
					textActiveIos: 'text-tahoe-accent',
					textIos: 'text-tahoe-text-secondary',
					iconBgActiveIos: 'bg-transparent',
					iconBgIos: 'bg-transparent',
				}}
			>
				<svelte:fragment slot="icon">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
				</svelte:fragment>
			</TabbarLink>
			<TabbarLink
				active={$currentPage === 'library'}
				label="Library"
				on:click={() => navigateTo('library')}
				colors={{
					textActiveIos: 'text-tahoe-accent',
					textIos: 'text-tahoe-text-secondary',
					iconBgActiveIos: 'bg-transparent',
					iconBgIos: 'bg-transparent',
				}}
			>
				<svelte:fragment slot="icon">
					<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /></svg>
				</svelte:fragment>
			</TabbarLink>
		</Tabbar>
	{/if}
</App>
