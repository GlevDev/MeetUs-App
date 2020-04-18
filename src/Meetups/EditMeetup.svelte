<script>
  import meetups from "./meetup-store.js";
  import { createEventDispatcher } from "svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";
  import { isEmpty, isValidEmail } from "../helpers/validation.js";

  export let id = null;

  let title = "";
  let subtitle = "";
  let address = "";
  let email = "";
  let imageUrl = "";
  let description = "";

  if (id) {
    const unsubscribe = meetups.subscribe(items => {
      const selectedMeetup = items.find(i => i.id === id);
      title = selectedMeetup.title;
      subtitle = selectedMeetup.subtitle;
      address = selectedMeetup.address;
      email = selectedMeetup.contactEmail;
      imageUrl = selectedMeetup.imageUrl;
      description = selectedMeetup.description;
    });

    unsubscribe();
  }

  const dispatch = createEventDispatcher();

  $: titleValid = !isEmpty(title);
  $: subtitleValid = !isEmpty(subtitle);
  $: addressValid = !isEmpty(address);
  $: descriptionValid = !isEmpty(description);
  $: imageUrlValid = !isEmpty(imageUrl);
  $: emailValid = isValidEmail(email);
  $: formIsValid =
    titleValid &&
    subtitleValid &&
    addressValid &&
    descriptionValid &&
    imageUrlValid &&
    emailValid;

  function submitForm() {
    const newMeetup = {
      title,
      subtitle,
      imageUrl,
      description,
      contactEmail: email,
      address
    };

    if (id) {
      meetups.updateMeetup(id, newMeetup);
    } else {
      fetch("https://svelte-course-4e0aa.firebaseio.com/meetups.json", {
        method: 'POST',
        body: JSON.stringify({...newMeetup, isFavorite: false}),
        headers: { 'Content-Type': 'application/json'}
      }).then(res => {
        if(!res.ok) {
          throw new Error('An error occurred, please try again!');
        }
        return res.json();
      }).then(data => {
        meetups.addMeetup({...newMeetup, isFavorite: false, id: data.name});
      }).catch(err => {
        console.log(err)
      })
    }

    dispatch("save");
  }

  function deleteMeetup() {
    meetups.removeMeetup(id);
    dispatch("save");
  }

  function cancel() {
    dispatch("cancel");
  }
</script>

<style>
  form {
    width: 100%;
  }
</style>

<Modal title="Edit Meetup Data" on:cancel>
  <form on:submit|preventDefault={submitForm}>
    <TextInput
      id="title"
      label="Title"
      valid={titleValid}
      validityMessage="Please enter a valid title."
      value={title}
      on:input={event => (title = event.target.value)} />
    <TextInput
      id="subtitle"
      label="Subtitle"
      valid={subtitleValid}
      validityMessage="Please enter a valid subtitle."
      value={subtitle}
      on:input={event => (subtitle = event.target.value)} />
    <TextInput
      id="address"
      label="Address"
      valid={addressValid}
      validityMessage="Please enter a valid address."
      value={address}
      on:input={event => (address = event.target.value)} />
    <TextInput
      id="imageUrl"
      label="Image URL"
      valid={imageUrlValid}
      validityMessage="Please enter a valid image url."
      value={imageUrl}
      on:input={event => (imageUrl = event.target.value)} />
    <TextInput
      id="email"
      label="E-mail"
      valid={emailValid}
      validityMessage="Please enter a valid E-mail."
      value={email}
      on:input={event => (email = event.target.value)}
      type="email" />
    <TextInput
      controlType="textarea"
      id="description"
      label="Description"
      valid={descriptionValid}
      validityMessage="Please enter a valid description."
      bind:value={description}
      rows="3" />
  </form>
  <div slot="footer">
    <Button mode="outline" on:click={cancel}>Cancel</Button>
    <Button on:click={submitForm} disabled={!formIsValid}>Save</Button>
    {#if id}
      <Button on:click={deleteMeetup}>Delete</Button>
    {/if}
  </div>
</Modal>
