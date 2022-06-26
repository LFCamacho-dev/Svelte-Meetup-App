<script>
    import meetups from './Meetups/meetups-store.js';
    import Header from "./UI/Header.svelte";
    import MeetupGrid from "./Meetups/MeetupGrid.svelte";
    import EditMeetup from './Meetups/EditMeetup.svelte';
    import MeetupDetail from './Meetups/MeetupDetail.svelte'
    import LoadingSpinner from './UI/LoadingSpinner.svelte';
    import Error from './UI/Error.svelte';

    let editMode;
    // let loadedMeetups = meetups;
    let pageData = {};
    let editedId;
    let page ='overview';
    let isLoading = true;
    let error;
    
    fetch("https://svelte-course-32e52-default-rtdb.firebaseio.com/meetups.json")
    .then(res => {
        if (!res.ok){
            // <Error message="{Failed}"/>
            throw new Error ('Failed! An error occurred, please try again.');
        }
        return res.json();
    })
    .then(data => {
        const loadedMeetups = [];
        for(const key in data) {
            loadedMeetups.push({
                ...data[key],
                id: key
            })
        }
        setTimeout(() => {
            isLoading = false;
            meetups.setMeetups(loadedMeetups.reverse());
        }, 1000);
    })
    .catch(err => {
        error = err;
        isLoading = false;
        console.log(err);
    });

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

    function clearError(){
        error = null;
    }


</script>


<style>
    main{
        margin-top: 5rem;
    }
   
</style>



<Header />
<main>  
    {#if error}
     <Error message={error.message} on:cancel={clearError}/>
    {:else}
        {#if page === 'overview'}
        
        {#if editMode === 'edit'}    
        <EditMeetup id={editedId} on:save="{saveMeetup}" on:cancel={cancelMeetup} />
        {/if}
        {#if isLoading}
        <LoadingSpinner /> 
        {:else}
        <MeetupGrid 
        meetups={$meetups} 
        on:showdetails={showDetails} 
        on:edit={startEdit} 
        on:add={() => {editMode = 'edit'}}/>
        {/if}
        {:else if page === 'details'}
        <MeetupDetail id={pageData.id} on:close={closeDetails}/>
        {/if}
    {/if}
</main>


