<template>
    <div class="flex">
        <div class="wrap-navbar"></div>
        <div class="wrap-content w-full">
            <div class="wrap-header flex"></div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ImasWrapper',
    props: {
        msg: String
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.wrap-navbar {
    min-width: 220px;
    width: 220px;
    max-width: 220px;
    height: 100vh;
    background: #2F4050;
}
.wrap-header {
    height: 60px;
    background: white;
    width: 100%;
}
.wrap-body {
    padding: 0 10px;
}
</style>
