<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte"

  let title = "";
  let subtitle = "";
  let address = "";
  let email = "";
  let imageUrl = "";
  let description = "";

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
      contactEmail: "code@test.com"
    },
    {
      id: "m2",
      title: "Run together",
      subtitle: "Learn to run",
      description: "Running sessions",
      imageUrl:
        "https://images.unsplash.com/photo-1517508601843-6db360377d23?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      address: "Badwater Basin, Death Valley, California",
      contactEmail: "run@test.com"
    }
  ];

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
</script>

<style>
  main {
    margin-top: 5rem;
  }

  form {
    width: 30rem;
    max-width: 90%;
    margin: auto;
  }
</style>

<Header />

<main>
  <form on:submit|preventDefault={addMeetup}>
    <TextInput
      id="title"
      label="Title"
      value={title}
      on:input={event => title = event.target.value}
      type="text" />
    <TextInput
      id="subtitle"
      label="Subtitle"
      value={subtitle}
      on:input={event => subtitle = event.target.value}
      type="text" />
    <TextInput
      id="address"
      label="Address"
      value={address}
      on:input={event => address = event.target.value}
      type="text" />
    <TextInput
      id="imageUrl"
      label="Image URL"
      value={imageUrl}
      on:input={event => imageUrl = event.target.value}
      type="text" />
    <TextInput
      id="email"
      label="E-mail"
      value={email}
      on:input={event => email = event.target.value}
      type="email" />
    <TextInput
      controlType="textarea"
      id="description"
      label="Description"
      value={description}
      on:input={event => description = event.target.value}
      type="text"
      rows="3" />
    <Button type="submit" caption="Save" />
  </form>
  <MeetupGrid {meetups} />
</main>
