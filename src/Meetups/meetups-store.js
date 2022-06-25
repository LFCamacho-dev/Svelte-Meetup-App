import { writable } from 'svelte/store'

const meetups = writable([
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
]);

const customMeetupsStore = {
    subscribe: meetups.subscribe,
    addMeetup: meetupData => {
        const newMeetup = {
            ...meetupData, 
            id: Math.random().toString(),
            isFavorite: false
        };
        meetups.update(items => {
            return [newMeetup, ...items];
        }); 
    },

    updateMeetup: (id, meetupData) => {
        meetups.update(items => {
            const meetupIndex = items.findIndex(i => i.id === id);
            const updatedMeetup = {...items[meetupIndex], ...meetupData};
            const updatedMeetups = [...items];
            updatedMeetups[meetupIndex] = updatedMeetup;
            return updatedMeetups;
        })
    },

    toggleFavorite: id => {
        meetups.update(items => {
            const updatedMeetup = {...items.find(m => m.id === id)};
            updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
            const meetupindex = items.findIndex(m => m.id === id);
            const updatedMeetups = [...items];
            updatedMeetups[meetupindex] = updatedMeetup;
            return updatedMeetups;
        });
    },

    removeMeetup: (id) => {
        meetups.update(items => {
            return items.filter(i => i.id !== id);
        });
    },
    
};

export default customMeetupsStore;