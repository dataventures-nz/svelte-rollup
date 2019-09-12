<script>
	import { getContext, setContext } from 'svelte';

	const { getMap } = getContext("map");
	const map = getMap();
	export let name;
	export let type;
	export let tiles;
	export let options = {};
	export let minzoom = 0;
	export let maxzoom = 14;
	let container
	let maploaded=false
	setContext("mapSourceName",name);

	map.on('load', function() {
		let x = {name, type, tiles, minzoom, maxzoom, ...options}
		let src = map.addSource(name, {type, tiles, minzoom, maxzoom, ...options})
		console.log("mapSourceName",name)
		maploaded=true
	})

</script>

<div bind:this={container}>
	{#if maploaded}
		<slot></slot>
	{/if}
</div>
