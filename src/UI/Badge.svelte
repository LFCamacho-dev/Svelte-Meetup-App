<script>
    import { fade, slide, scale, fly } from 'svelte/transition';
</script>

<span transition:fly="{{ y: 10 }}">
    <slot/>
</span>


<style>
    span{
        display: inline-block;
        margin: 0 0.25rem;
        border-radius: 3px;
        border: 1px solid #cf0056;
        background-color: #cf0056;
        color:white;
        padding: 0 0.5rem;
        font-size: 0.8rem;
        font-family: 'Lato', sans-serif;
    }
</style>