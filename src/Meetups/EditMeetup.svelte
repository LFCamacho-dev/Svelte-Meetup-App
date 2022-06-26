<script>
    import meetups from './meetups-store.js'
    import {createEventDispatcher} from 'svelte'
    import TextInput from '../UI/TextInput.svelte';
    import Button from '../UI/Button.svelte';
    import Modal from '../UI/Modal.svelte';
    import { isEmpty, isValidEmail } from '../helpers/validation';
    // import Error from '../UI/Error.svelte';
    
    const dispatch = createEventDispatcher();
    
    
    export let id = null;

    let title = '';
    let subtitle = '';
    let address = '';
    let email = '';
    let description = '';
    let imageUrl = '';

    if(id){

        const unsub = meetups.subscribe(items => {

            const selectedMeetup = items.find(m => m.id === id);          

            title = selectedMeetup.title;
            subtitle = selectedMeetup.subtitle;
            address = selectedMeetup.address;
            email = selectedMeetup.contactEmail;
            description = selectedMeetup.description;
            imageUrl = selectedMeetup.imageUrl;
        });

        unsub();
    }
   

    $: titleValid = !isEmpty(title);
    $: subtitleValid = !isEmpty(subtitle);
    $: addressValid = !isEmpty(address);
    $: emailValid = isValidEmail(email);
    $: descriptionValid = !isEmpty(description);
    $: imageURLValid = !isEmpty(imageUrl);
    $: formIsValid = titleValid && subtitleValid && addressValid && emailValid && descriptionValid && imageURLValid;

    function submitForm() {
        const meetupData = {
            // id: Math.random().toString(),
            title: title,
            subtitle: subtitle,
            description: description,
            imageUrl: imageUrl,
            address: address,
            contactEmail: email
        }
        
        if(id){
            fetch(`https://svelte-course-32e52-default-rtdb.firebaseio.com/meetups/${id}.json`, {
                method: 'PATCH',
                body: JSON.stringify(meetupData),
                header: { 'Content-Type': 'application/json'}
            })
            .then(res => {
                if (!res.ok){
                    throw new Error ('Failed! An error occurred, please try again.');
                }
                meetups.updateMeetup(id, meetupData)
            })
            .catch(error => {
                console.log(error)
            });
        } else {
            fetch("https://svelte-course-32e52-default-rtdb.firebaseio.com/meetups.json", {
                method: 'POST',
                body: JSON.stringify({...meetupData, isFavorite: false}),
                header: { 'Content-Type': 'application/json'}
            })
            .then(res => {
                if (!res.ok){
                    throw new Error ('Failed! An error occurred, please try again.');
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                meetups.addMeetup({
                    ...meetupData, 
                    isFavorite: false, 
                    id: data.name
                })
                meetups.addMeetup(meetupData);
                dispatch('save');
            })
            .catch(err => {
                console.log(err);
            });
        }

    }

    function cancel() {
        dispatch('cancel');
    }

    function deleteMeetup() {
        fetch(`https://svelte-course-32e52-default-rtdb.firebaseio.com/meetups/${id}.json`, {
                method: 'DELETE'
            })
            .then(res => {
                if (!res.ok){
                    throw new Error ('Failed! An error occurred, please try again.');
                }
                meetups.removeMeetup(id);
            })
            .catch(err => console.log(err));
        dispatch('save');
    }

</script>


<Modal title="Edit Meetup Data" on:cancel>    
    
    <form on:submit|preventDefault="{submitForm}">

        <TextInput id="title" label="Title"  value={title} on:input={(e) => title = e.target.value} valid="{titleValid}" validityMessage="{'Please enter a valid title.'}"/>
        <TextInput id="subtitle" label="Subtitle"  value={subtitle} on:input={(e) => subtitle = e.target.value} valid="{subtitleValid}" validityMessage="{'Please enter a valid subtitle.'}"/>
        <TextInput id="imageUrl" label="Image URL"  value={imageUrl} on:input={(e) => imageUrl = e.target.value} valid="{imageURLValid}" validityMessage="{'Please enter a valid URL.'}"/>
        <TextInput id="address" label="Address"  value={address} on:input={(e) => address = e.target.value} valid="{addressValid}" validityMessage="{'Please enter a valid address.'}"/>
        <TextInput controlType="email" id="email" label="Email"  value={email} on:input={(e) => email = e.target.value} valid="{emailValid}" validityMessage="{'Please enter a valid email.'}"/>
        <TextInput controlType="textarea" id="description" label="Description"  value={description} on:input={(e) => description = e.target.value} rows="3" valid="{descriptionValid}" validityMessage="{'Please enter a valid description.'}"/>

    </form>
    <div slot="footer">
        <Button type="button" mode="outline" on:click="{cancel}">Cancel</Button>
        <Button type="button" on:click={submitForm} disabled={!formIsValid}>Save</Button>

        {#if id}
            <Button type="button" on:click="{deleteMeetup}" >Delete</Button>
        {/if}
    </div>
</Modal>

<style>
    form {
        width: 100%;
    }
</style>
