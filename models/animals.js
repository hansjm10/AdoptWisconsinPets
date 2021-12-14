const mongoose = require('mongoose');

var animalScheme = mongoose.Schema({
    id: Number,
    organization_id: String,
    url: String,
    type: String,
    species: String,
    breeds: {
        primary: String,
        secondary: String,
        mixed: String,
        unknown: String,
    },
    colors: {
        primary: String,
        secondary: String,
        tertiary: String,
    },
    age: String,
    gender: String,
    size: String,
    coat: String,
    attributes: {
        spayed_neutred: Boolean,
        house_trained: Boolean,
        declawed: String,
        special_needs: Boolean,
        shots_current: Boolean,
    },
    environment:{
        children: Boolean,
        dogs: Boolean,
        cats: Boolean
    },
    tags: Array,
    name: String,
    description: String,
    organization_animal_id: String,
    photos: [{
        small: String,
        medium: String,
        full: String,
    }],
    primary_photo_cropped: {
        small: String,
        medium: String,
        large: String,
        full: String,
    },
    videos: [{
        embed: String
    }],
    status: String,
    status_changed_at: String,
    published_at: String,
    distance: Number,
    contact: {
        email: String,
        phone: String,
        address: {
            address1: String,
            address2: String,
            city: String,
            state: String,
            postcode: String,
            country: String,
        }
    },
    _links: {
        self: {
            href: String
        },
        type: {
            href: String,

        },
        organization: {
            href: String,
        }
    } 
})
module.exports = animalCollection = mongoose.model('animals', animalScheme)

