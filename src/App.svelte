<script>
    import PopulationMap from './PopulationMap.svelte';
    import  "regenerator-runtime";

    import Login from './Login.svelte'
    import 'bulma/css/bulma.css';
    //import 'font-awesome/css/font-awesome.min.css';
    import './style.scss'
</script>


<nav class="navbar is-transparent">
    <div class="navbar-brand">
        <img id='svglogo' alt="" src='./assets/DV-logo-Horizontal-reverse.svg' width="300"/>
    </div>

    <div class="navbar-end">
        <div class="navbar-item">
            <div class="buttons">
                <Login></Login>
            </div>
        </div>
    </div>
</nav>


<div class="columns" style="height:100%">
    <div class="column is-one-third">
        <PopulationMap></PopulationMap>
    </div>
    <div class="column">whatever is left</div>
</div>
