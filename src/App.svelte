<script>
  import meetups from './Meetups/meetup-store.js';
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";

  let editMode;

  function addMeetup(event) {
    const newMeetup = {
      title: event.detail.title,
      subtitle: event.detail.subtitle,
      imageUrl: event.detail.imageUrl,
      description: event.detail.description,
      contactEmail: event.detail.email,
      address: event.detail.address
    };

    meetups.addMeetup(newMeetup);

    editMode = null;
  }

  function cancelEdit() {
    editMode = null;
  }

  function toggleFavorite(event) {
    const id = event.detail;
    meetups.toggleFavorite(id);
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }

  .meetup-controls {
    margin: 1rem;
  }
</style>

<Header />

<main>
  <div class="meetup-controls">
    <Button on:click={() => (editMode = 'add')}>New Meetup</Button>
  </div>
  {#if editMode === 'add'}
    <EditMeetup on:save="{addMeetup}" on:cancel={cancelEdit} />
  {/if}
  <MeetupGrid meetups={$meetups} on:togglefavorite={toggleFavorite} />
</main>
