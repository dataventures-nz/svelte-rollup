<script>
	import { onMount, setContext } from 'svelte';
//	import mapbox from 'mapbox-gl';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	mapboxgl.accessToken = "pk.eyJ1IjoiZGF0YXZlbnR1cmVzIiwiYSI6ImNqc2MzbXdkbDAxNzI0M3BubGx2OXZwc28ifQ.ZtDrTImrICdc8-TkI6FIfg"

	export let lat;
	export let lon;
	export let zoom;
	export let minZoom;
	export let style;

	let container;
	export let map;

	setContext("map", {
		getMap: () => map
	});

	onMount(() => {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = 'https://unpkg.com/mapbox-gl/dist/mapbox-gl.css';

		link.onload = () => {
			map = new mapboxgl.Map({
				container,
				center: [lon, lat],
				style,
				zoom,
				minZoom
			});
			dispatch('mapready', {map});
		};

		document.head.appendChild(link);

		return () => {
			map.remove();
			link.parentNode.removeChild(link);
		};
	});
</script>

<style>
	div {
		width: 100%;
		height: 100%;
	}
</style>

<div bind:this={container}>
	{#if map}
		<slot></slot>
	{/if}
</div>
