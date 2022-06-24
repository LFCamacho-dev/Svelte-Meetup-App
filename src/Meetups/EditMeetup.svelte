<script>
    import {createEventDispatcher} from 'svelte'
    import TextInput from '../UI/TextInput.svelte';
    import Button from '../UI/Button.svelte';
    import Modal from '../UI/Modal.svelte';
    import { isEmpty, isValidEmail } from '../helpers/validation'

    const dispatch = createEventDispatcher();


    let title = '';
    let subtitle = '';
    let address = '';
    let email = '';
    let description = '';
    let imageUrl = '';

    $: titleValid = !isEmpty(title);
    $: subtitleValid = !isEmpty(subtitle);
    $: addressValid = !isEmpty(address);
    $: emailValid = isValidEmail(email);
    $: descriptionValid = !isEmpty(description);
    $: imageURLValid = !isEmpty(imageUrl);
    $: formIsValid = titleValid && subtitleValid && addressValid && emailValid && descriptionValid && imageURLValid;

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

    function cancel() {
        dispatch('cancel');
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
    </div>
</Modal>

<style>
    form {
        width: 100%;
    }
</style>
