<script>
    import Modal from './Modal.svelte';

    export let message;
</script>

<style>

</style>

<Modal title="A wild error appears!" on:cancel>
    <p>{message}</p>
</Modal>