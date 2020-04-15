<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";

  let meetups = [
    {
      id: "m1",
      title: "Coding Bootcamp",
      subtitle: "Learn to code in 2 hours",
      description:
        "In this meetup, we will have some experts that teach you how to code",
      imageUrl:
        "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80",
      address: "Escuela De Educación Media, Palos 210, C1160 ACB, Buenos Aires",
      contactEmail: "code@test.com",
      isFavorite: false
    },
    {
      id: "m2",
      title: "Run together",
      subtitle: "Learn to run",
      description: "Running sessions",
      imageUrl:
        "https://images.unsplash.com/photo-1517508601843-6db360377d23?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      address: "Badwater Basin, Death Valley, California",
      contactEmail: "run@test.com",
      isFavorite: false
    }
  ];

  let editMode;

  function addMeetup() {
    const newMeetup = {
      id: Math.random().toString(),
      title: title,
      subtitle: subtitle,
      imageUrl: imageUrl,
      description: description,
      contactEmail: email,
      address: address
    };

    meetups = [newMeetup, ...meetups];
  }

  function toggleFavorite(event) {
    const id = event.detail;
    const updatedMeetup = {...meetups.find(m => m.id === id)};
    updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
    const meetupIndex = meetups.findIndex(m => m.id === id)
    const updatedMeetups = [...meetups];
    updatedMeetups[meetupIndex] = updatedMeetup;
    meetups = updatedMeetups;
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }
</style>

<Header />

<main>
  <Button caption="New Meetup" on:click="{() => editMode = 'add'}" />
  {#if editMode === 'add'}
    <EditMeetup />
  {/if}
  <MeetupGrid {meetups} on:togglefavorite="{toggleFavorite}" />
</main>
