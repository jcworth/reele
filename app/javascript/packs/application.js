// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)


// ----------------------------------------------------
// Note(lewagon): ABOVE IS RAILS DEFAULT CONFIGURATION
// WRITE YOUR OWN JS STARTING FROM HERE 👇
// ----------------------------------------------------
import "bootstrap";

import WaveSurfer from "wavesurfer.js";

// IMPORT SORTABLE FUNCTIONS
import { initSortable } from '../components/sortable';
import { profileSortable, featuredSortable } from '../components/profile_sortable'
// import { projectFeature, projects } from '../components/_profile_sortable.js'

const audioDiv = document.querySelector('#waveform')
if (audioDiv) {
  const waveform = WaveSurfer.create({
    container: audioDiv,
    mediaControls: true,
    waveColor: '#D9DCFF',
    progressColor: '#4353FF',
    cursorColor: '#4353FF',
    barWidth: 4,
    barRadius: 2,
    cursorWidth: 1,
    height: 150,
    barGap: 2
  })
  waveform.load(audioDiv.dataset.audio);
  document.querySelector('#waveform-play').addEventListener('click', () => {
    waveform.play();
  });
  document.querySelector('#waveform-pause').addEventListener('click', () => {
    waveform.pause()
  })
}

$('.carousel').carousel({
  interval: false
})

// CALL SORTABLE FUNCTION

document.addEventListener('turbolinks:load', () => {
  // Call your JS functions here
  // [...]
  initSortable();
  profileSortable();
  featuredSortable();
});

