<script>
	import { onMount, getContext, setContext } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	const { getMap } = getContext("map");
	var source = getContext("mapSourceName");
	const map = getMap();

	export let id;
	export let type;
	export let sourcelayer;
	export let options ={};

// layout properties
	export let visible = true;
	export let background_color = "#000000";
	export let background_opacity = 1.0;

// layout fill properties
	export let fill_antialias = true;
	export let fill_opacity = 1.0;
	export let fill_color = '#000000';

	onMount(() => {
		source = getContext("mapSourceName")
		let layer = {id, type, "source-layer":sourcelayer, source, ...options};
		console.log("layer being added", layer)
		map.addLayer(layer);
		map.setLayoutProperty(id,'visibility', visible?'visible':'none')
		const eventtypes = ['mousedown','mouseup','click','dblclick','mousemove','mouseenter','mouseleave','mouseover','mouseout','contextmenu','touchstart','touchend','touchcancel'];
		eventtypes.forEach(eventtype => {
			map.on(eventtype, id, function(e) {
				dispatch(eventtype,{id,'event':e, 'features':e.features, source, sourcelayer})
			})
		})
	})

	$: if (map.getLayer(id)) { map.setLayoutProperty(id,'visibility', visible?'visible':'none') };

</script>

<div></div>
