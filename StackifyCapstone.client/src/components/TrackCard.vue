<template>
  {{ track.name }}
</template>

<script>

import { Track } from "../models/Track.js";

export default {
  props: {track: {type: Track || Object, required: true}},
setup() {
  return {};
},
};
</script>


<style>
</style>