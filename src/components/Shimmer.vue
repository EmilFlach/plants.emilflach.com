<template>
    <div v-if="type !== 'text'" class="shimmer" :class="classes"></div>

    <div v-if="type === 'text'">
        <div  v-for="x in 5" :key="x" class="shimmer" :class="classes"></div>
    </div>

</template>

<script>
    export default {
        name: 'Shimmer',
        props: ['loaded', 'type'],
        computed: {
            classes() {
                return this.shimmerType + this.show;
            },
            show() {
                switch (this.type) {
                    case 'text':
                        return !this.loaded ? ' show-text' : '';
                    default:
                        return !this.loaded ? ' show' : '';
                }
            },
            shimmerType() {
                switch (this.type) {
                    case 'h1':
                        return 'shimmer-h1';
                    case 'h2':
                        return 'shimmer-h2';
                    case 'img':
                        return 'shimmer-img';
                    case 'text':
                        return 'shimmer-text';
                    default:
                        return 'shimmer-text';
                }
            }
        }
    }
</script>
<style scoped>
    .shimmer {
        background: rgba(255,255,255,0.05) linear-gradient(to right, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.15) 35%, rgba(255,255,255,0.1) 60%, rgba(255,255,255,0.01) 100%) no-repeat;
        background-size: 40% 100%;
        opacity: 0;

        animation-duration: 1s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: shimmer;
        animation-timing-function: ease-in-out;
    }

    .shimmer-text {
        position: fixed;
        display: block;
        height: 1.5rem;
        margin-bottom: 0.5rem;
        width: 10rem;
        border-radius: 0.5rem;
    }

    .shimmer-img {
        position: fixed;
        height: 50vh;
        width: 100%;
        border-radius: 1rem;
        transition: opacity 0.2s ease-in-out;
    }

    .shimmer-h2 {
        position: absolute;
        display: inline-block;
        height: 2rem;
        width: 15rem;
        border-radius: 1rem;
    }

    .shimmer-h1 {
        position: absolute;
        display: inline-block;
        height: 2rem;
        width: 15rem;
        margin-top: 0.5rem;
        border-radius: 1rem;
    }

    .show {
        opacity: 1;
    }

    .show-text {
        opacity: 1;
        position: relative;
    }

    @keyframes shimmer {
        0% {
            background-position: -180% 0;
        }
        100% {
            background-position: 180% 0;
        }
    }
</style>
