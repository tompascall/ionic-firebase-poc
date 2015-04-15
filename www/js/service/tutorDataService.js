'use strict';

angular.module('poc')

.value('tutorDataService', [
  {
    name: 'Kelly Barnett',
    rating: 5,
    ageRangeLevel: '5-11',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_01.jpg',
    specialities: ['arithmetic', 'algebra'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    female: true,
    male: false
  },
  {
    name: 'John Preston',
    rating: 4,
    ageRangeLevel: '11-18',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_02.jpeg',
    specialities: ['functions', 'geometry', 'trigonometry','differentiation', 'integration'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    female: false,
    male: true
  },
  {
    name: 'Priscilla Fowler',
    rating: 3,
    ageRangeLevel: '18+',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_03.jpg',
    specialities: ['differentiation', 'integration'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    female: true,
    male: false
  },
  {
    name: 'George Roberts',
    rating: 2,
    ageRangeLevel: '11-18',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_04.jpg',
    specialities: ['trigonometry'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    female: false,
    male: true
  },
  {
    name: 'Jamie Middleton',
    rating: 1,
    ageRangeLevel: '11-18',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_05.jpg',
    specialities: ['algebra', 'geometry'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    female: true,
    male: false
  },
  {
    name: 'Carol Henderson',
    rating: 0,
    ageRangeLevel: '5-11',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_07.jpeg',
    specialities: ['algebra'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    female: true,
    male: false
  },
  {
    name: 'Lucas Wong',
    rating: 1,
    ageRangeLevel: '5-11',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_06.jpg',
    specialities: ['arithmetic'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    female: false,
    male: true
  },
  {
    name: 'Brian Miske',
    rating: 2,
    ageRangeLevel: '18+',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_08.gif',
    specialities: ['vectors', 'differentiation', 'functions'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    female: false,
    male: true
  },
  {
    name: 'Katie Luddy',
    rating: 3,
    ageRangeLevel: '18+',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_09.jpg',
    specialities: ['functions', 'vectors', 'graphs'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    female: true,
    male: false
  },
  {
    name: 'John Moore',
    rating: 4,
    ageRangeLevel: '5-11',
    profilePhotoUrl: 'https://s3-eu-west-1.amazonaws.com/profile.photo.01/animal_profile_10.jpg',
    specialities: ['algebra'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
    ' do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    female: false,
    male: true
  }
])
