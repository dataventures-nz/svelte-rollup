<script>
    function clicked(e) {

    }

    function focusout(e) {

    }
</script>

<div on:click={clicked}>title</div>
<div on:focusout={focusout}>
    <slot></slot>
</div>
