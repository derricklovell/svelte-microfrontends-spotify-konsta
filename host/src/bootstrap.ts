import App from './App.svelte';
import { mount } from 'svelte';

const target = document.getElementById('app');
let app;

if (target) {
	app = mount(App, {
		target,
	});
}

export default app;
