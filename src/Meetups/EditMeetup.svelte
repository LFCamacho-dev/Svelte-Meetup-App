<script>
    import {createEventDispatcher} from 'svelte'
    import TextInput from '../UI/TextInput.svelte';
    import Button from '../UI/Button.svelte';

    const dispatch = createEventDispatcher();


    let title = '';
    let subtitle = '';
    let address = '';
    let email = '';
    let description = '';
    let imageUrl = '';

    function submitForm() {
       dispatch('save', {
        title: title,
        subtitle: subtitle,
        address: address,
        email: email,
        description: description,
        imageUrl: imageUrl,
       });
    }
</script>

<form on:submit|preventDefault="{submitForm}">

    <TextInput id="title" label="Title"  value={title} on:input={(e) => title = e.target.value} />
    <TextInput id="subtitle" label="Subtitle"  value={subtitle} on:input={(e) => subtitle = e.target.value} />
    <TextInput id="imageUrl" label="Image URL"  value={imageUrl} on:input={(e) => imageUrl = e.target.value} />
    <TextInput id="address" label="Address"  value={address} on:input={(e) => address = e.target.value} />
    <TextInput controlType="email" id="email" label="Email"  value={email} on:input={(e) => email = e.target.value} />
    <TextInput controlType="textarea" id="description" label="Description"  value={description} on:input={(e) => description = e.target.value} rows="3"/>

    <Button type="submit">Add Meetup</Button>
</form>


<style>
    form {
        width: 30rem;
        max-width: 90%;
        margin: 0 auto;
    }
</style>
