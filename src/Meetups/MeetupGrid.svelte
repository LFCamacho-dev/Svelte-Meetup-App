<script>
    import { createEventDispatcher } from 'svelte';
    import { fade, slide, scale, fly } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import MeetupItem from './MeetupItem.svelte'
    import MeetupFilter from './MeetupFilter.svelte';
    import Button from '../UI/Button.svelte';    

    const dispatch = createEventDispatcher();

    export let meetups

    let favsOnly = false;

    $: filteredMeetups = favsOnly ? meetups.filter(m => m.isFavorite) : meetups;

    function setFilter(event) {
        favsOnly = event.detail === 1;
    }

</script>

<style>
    #meetups {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 1rem;
    }

    #meetup-controls, .meetups {
        margin: 1rem;
        display: flex;
        justify-content: space-between;
    }

@media (min-width: 768px) {
  #meetups {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

<section id="meetup-controls">
    <MeetupFilter on:select="{setFilter}"/>
    <Button on:click="{() => dispatch('add')}">New Meetup</Button>
</section>
{#if filteredMeetups.length === 0}
<section class="meetups">
    <p>No meetups found, you can start adding some.</p>
</section>
{:else}
<section id="meetups">
    {#each filteredMeetups as meetup (meetup.id)}
    <div transition:scale animate:flip={{delay: 150, duration: 300}}>
        <MeetupItem  
        id = {meetup.id}
        title = {meetup.title}
        subtitle = {meetup.subtitle}
        image = {meetup.imageUrl}
        description = {meetup.description}
        address = {meetup.address}    
        email = {meetup.contactEmail}
        isFav={meetup.isFavorite}
        on:showdetails
        on:edit
        />
    </div>
    {/each}
    
</section>
{/if}