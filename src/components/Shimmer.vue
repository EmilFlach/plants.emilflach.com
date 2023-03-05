<template>
    <div v-if="singleShimmer" class="shimmer" :class="classes"></div>

    <div v-if="type === 'text'">
        <div v-for="x in 5" :key="x" class="shimmer" :class="classes"></div>
    </div>
</template>

<script>
    export default {
        name: 'Shimmer',
        props: ['loaded', 'type'],
        computed: {
            singleShimmer() {
                return this.type !== 'text';
            },
            classes() {
                return this.shimmerType + this.show;
            },
            show() {
                switch (this.type) {
                    case 'img':
                        return !this.loaded ? ' show-relative' : '';
                    case 'list-img':
                        return !this.loaded ? ' show-relative' : '';
                    case 'text':
                        return !this.loaded ? ' show-relative' : '';
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
                    case 'list-img':
                        return 'shimmer-list-img';
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

    .shimmer-list-img {
        position: fixed;
        display: block;
        width: 100%;
        height: 15rem;
        border-radius: 1rem;
        transition: opacity 0s ease-in-out;
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

    .shimmer-img {
        position: fixed;
        height: 50vh;
        width: 100%;
        border-radius: 1rem;
    }

    @media only screen and (min-width: 40rem) {
        .shimmer-img {
            width: 20rem;
        }
    }

    @media only screen and (min-width: 60rem) {
        .shimmer-img {
            width: 40rem;
        }
    }

    @media only screen and (min-width: 70rem) {
        .shimmer-img {
            width: 50rem;
        }
    }



    .show {
        opacity: 1;
    }

    .show-relative {
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
