<template>
    <div class="loader-container">
        <div class="loader"></div>
    </div>
</template>

<script>
    export default {
        name: 'Loader',
    }
</script>

<style scoped>
    .loader-container{
        width: 100%;
        text-align: center;
    }
    .loader {
        display: inline-block;
        width: 80px;
        height: 80px;
    }
    .loader:after {
        content: " ";
        display: block;
        width: 64px;
        height: 64px;
        margin: 8px;
        border-radius: 50%;
        border: 6px solid rgba(255,255,255,0.2);
        border-color: rgba(255,255,255,0.2) transparent rgba(255,255,255,0.2) transparent;
        animation: loader 1.2s linear infinite;
    }
    @keyframes loader {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
