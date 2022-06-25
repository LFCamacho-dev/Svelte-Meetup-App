<script>
    import meetups from './Meetups/meetups-store.js';
    import Header from "./UI/Header.svelte";
    import MeetupGrid from "./Meetups/MeetupGrid.svelte";
    import Button from './UI/Button.svelte';
    import EditMeetup from './Meetups/EditMeetup.svelte';
    import MeetupDetail from './Meetups/MeetupDetail.svelte'

    let editMode;
    let loadedMeetups = meetups;
    let pageData = {};
    let editedId;

    let page ='overview';
    

    function saveMeetup (e) {        
        editMode = null;
        editedId = null;
    }

    function cancelMeetup() {
        editMode = null;
        editedId = null;
    }

    function showDetails (event) {
        page = 'details';
        pageData.id = event.detail;
    }

    function closeDetails() {
        page = 'overview';
        pageData = {};
    }

    function startEdit(event) {
        editMode = 'edit';
        editedId = event.detail;
    }


</script>


<style>
    main{
        margin-top: 5rem;
    }
   
</style>



<Header />
<main>  
    {#if page === 'overview'}
          
        {#if editMode === 'edit'}    
        <EditMeetup id={editedId} on:save="{saveMeetup}" on:cancel={cancelMeetup} />
        {/if}

        <MeetupGrid 
        meetups={$meetups} 
        on:showdetails={showDetails} 
        on:edit={startEdit} 
        on:add={() => {editMode = 'edit'}}/>
    {:else if page === 'details'}
        <MeetupDetail id={pageData.id} on:close={closeDetails}/>
    {/if}
</main>


