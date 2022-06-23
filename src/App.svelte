<script>
    import Header from "./UI/Header.svelte";
    import MeetupGrid from "./Meetups/MeetupGrid.svelte";
    import TextInput from './UI/TextInput.svelte';
    import Button from './UI/Button.svelte';
    import EditMeetup from './Meetups/EditMeetup.svelte'

    let editMode;

    let meetups = [
        {
            id: "m1",
            title: 'Coding Bootcamp',
            subtitle: 'Learn to code in 2 hours',
            description: ' In this meetup, we will have some experts that teach you how to code.',
            imageUrl: 'https://theme.zdassets.com/theme_assets/2041222/941c03ffc2153edb01f292ecc494df2ddd27e6b0.jpg',
            address: '123 Nerd Rd. New York, NY 32523',
            contactEmail: 'code@email.com',
            isFavorite: false
        },
        {
            id: "m2",
            title: 'Swimming Together',
            subtitle: 'Going for a swim while others coders',
            description: ' In this meetup, we\'ll be simple going for a swim.',
            imageUrl: 'https://ca-times.brightspotcdn.com/dims4/default/d4ec59e/2147483647/strip/true/crop/640x360+0+0/resize/1200x675!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F2f%2Fde%2F067ae98f44b28febab94414c29a3%2Fla-ca-bonnie-tsui-why-we-swim-081.JPG',
            address: '123 Nerd Rd. New York, NY 32523',
            contactEmail: 'swim@email.com',
            isFavorite: false
        },
    ]
 

        const addMeetup = (e) => {
            const newMeetup = {
                id: Math.random().toString(),
                title: e.detail.title,
                subtitle: e.detail.subtitle,
                description: e.detail.description,
                imageUrl: e.detail.imageUrl,
                address: e.detail.address,
                contactEmail: e.detail.email
            }
            // console.log(newMeetup);
            meetups = [newMeetup, ...meetups];
            editMode = null
        }

        function toggleFavorite(event) {
            const id = event.detail;
            const updatedMeetup = {...meetups.find(m => m.id === id)};
            updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
            const meetupindex = meetups.findIndex(m => m.id === id);
            const updatedMeetups = [...meetups];
            updatedMeetups[meetupindex] = updatedMeetup;
            meetups = updatedMeetups;
        }

</script>


<style>
    main{
        margin-top: 5rem;
    }

    .meetup-controls {
        margin: 1rem;
    }
    
</style>



<Header />

<main>    
    <Button on:click="{() => editMode = 'add'}">New Meetup</Button>
    <div class="meetup-controls">

        {#if editMode === 'add'}    
        <EditMeetup on:save="{addMeetup}"/>
        {/if}
        
    </div>
    <MeetupGrid meetups = {meetups} on:togglefavorite="{toggleFavorite}"/>
</main>


