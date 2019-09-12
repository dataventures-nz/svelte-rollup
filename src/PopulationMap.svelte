<script>
    import Map from './Map.svelte';
    import MapSource from './MapSource.svelte';
    import MapLayer from './MapLayer.svelte';

    const tiles = ["http://ec2-13-210-14-170.ap-southeast-2.compute.amazonaws.com/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=stats:sa2_2018_non_ocean&STYLE=&TILEMATRIX=EPSG:900913:{z}&TILEMATRIXSET=EPSG:900913&FORMAT=application/vnd.mapbox-vector-tile&TILECOL={x}&TILEROW={y}"]
    const fill = {
        "paint": {
            "fill-color": ["coalesce", ["feature-state", "color"], "#627BC1"],
            "fill-opacity":
                    ["case",
                        ["boolean", ["feature-state", "hover"], false], 0.25,
                        ["boolean", ["feature-state", "selected"], false], 0.8,
                        0
					],
        }
    };
    const lines = {
        "paint": {
            "line-color": ["case",
                ["boolean", ["feature-state", "hover"], false], ["coalesce", ["feature-state", "color"], "#627BC1"],
                ["boolean", ["feature-state", "selected"], false], ["coalesce", ["feature-state", "color"], "#627BC1"],
                "#627BC1"],
            "line-width": ["case", ["boolean", ["feature-state", "hover"], false], 1.5, ["boolean", ["feature-state", "selected"], false], 1.5, 0.8],
            "line-opacity": ["case", ["boolean", ["feature-state", "hover"], false], 1, ["boolean", ["feature-state", "selected"], false], 1, 0.5],
        }
    };

    let map;
    let hoveredStateId;

    export let selectedSA2 = [];

    function mousemoveHandler(event) {
        const details = event.detail;
        if (details.features.length > 0) {
            var feature = details.features[0];
            if (hoveredStateId) {
				let selection = {source: details.source, sourceLayer: details.sourcelayer, id: hoveredStateId};
				map.setFeatureState(selection, {hover: false});
            }
            hoveredStateId = details.features[0].id;
			let selection = {source: details.source, sourceLayer: details.sourcelayer, id: hoveredStateId};
            map.setFeatureState(selection, {hover: true});
        }
    }

    function mouseleaveHandler(event) {
        const details = event.detail;
        if (hoveredStateId) {
			let selection = {
				source: details.source,
				sourceLayer: details.sourcelayer,
				id: hoveredStateId
			};
			map.setFeatureState(selection, {hover: false});
        }
        hoveredStateId = null;
    }

    function handle_mapready(event) {
        console.log("map ready", event);
        map = event.detail.map
    }

    function addSelected(id, source, sourceLayer) {
        let selection = {id, source, sourceLayer}
        map.setFeatureState(selection, {selected: true, color: colour(next_colour)});
    }

    function removeSelected(id, source, sourceLayer) {
        let selection = {id, source, sourceLayer}
        map.setFeatureState(selection, {selected: false})
        map.removeFeatureState(selection, "color");
    }

    function toggleIds(sa2s, source, layer) {
        const addingSA2 = _.without(sa2, selectedSA2);
        const removingSA2 = _.intersection(sa2, selectedSA2);
        selectedSA2 = _.xor(selectedSA2, [sa2]) // toggle values
        addingSA2.forEach((sa2) => addSelected(sa2, source, layer))
        removingSA2.forEach((sa2) => removeSelected(sa2, source, layer))
    }

    function handleMouseClick(e) {
        let features = e.detail.features;
        if (features.length === 0) {
            return
        }
        var feature = e.features[0];
        let sa2 = feature.properties.sa22018__1;
        toggleIds([sa2], e.details.source, e.details.sourceLayer)
    }

</script>

<Map lat={-41.5} lon={172} zoom={4.8} minZoom={3.5} style='mapbox://styles/dataventures/cjzaospfz0i1l1cn3kcuof5ix' on:mapready={handle_mapready}>
    <MapSource name="sa2" type="vector" tiles={tiles}>
        <MapLayer id="sa2-fill" type="fill" sourcelayer="sa2_2018_non_ocean" options={fill} on:click={handleMouseClick}
                  on:mousemove={mousemoveHandler} on:mouseleave={mouseleaveHandler}></MapLayer>
        <MapLayer id="sa2-lines" type="line" sourcelayer="sa2_2018_non_ocean" options={lines}></MapLayer>
    </MapSource>
</Map>
