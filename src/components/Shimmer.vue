<template>
    <div v-if="singleShimmer" class="shimmer" :class="classes"></div>

    <div v-if="type === 'text'">
        <div v-for="x in 5" :key="x" class="shimmer" :class="classes"></div>
    </div>

    <div v-if="type === 'plant-list'" class="shimmer-plants">
        <div v-for="x in 7" :key="x" class="shimmer" :class="classes"></div>
    </div>
</template>

<script>
    export default {
        name: 'Shimmer',
        props: ['loaded', 'type'],
        computed: {
            singleShimmer() {
                return this.type !== 'text' && this.type !== 'plant-list';
            },
            classes() {
                return this.shimmerType + this.show;
            },
            show() {
                switch (this.type) {
                    case 'plant-list':
                        return !this.loaded ? ' show-plant-list' : '';
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
                    case 'plant-list':
                        return 'shimmer-plant-list';
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

    .shimmer-plants {
        padding: 0.5rem;
        columns: 2 9rem;
        column-gap: 0.5rem;
    }
    .shimmer-plant-list {
        position: fixed;
        display: inline-block;
        vertical-align: top;
        margin-top: 0.5rem;
        width: 100%;
        height: 400px;
        border-radius: 1rem;
    }

    @media only screen and (min-width: 40rem) {
        .shimmer-plants {
            padding: 1rem;
            columns: 8 18rem;
            column-gap: 1rem;
            max-width: 80rem;
            margin: 0 auto;
        }

        .shimmer-plant-list {
            margin-top: 1rem;
        }
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

    .show-plant-list {
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
