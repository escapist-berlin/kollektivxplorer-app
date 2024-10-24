<template>
  <div>
    <h1>Welcome to KollektivXplorer</h1>

    <v-card flat>
      <template v-slot:text>
        <v-text-field
            v-model="search"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            hide-details
            single-line
        ></v-text-field>
      </template>

      <v-row>
        <v-col cols="8">
          <v-data-table
            :custom-filter="filterByFields"
            :headers="headers"
            :items="KollektivXReleases"
            :search="search"
            height="750"
            width="auto"
            item-value="name"
          >
            <template v-slot:item.image="{ item }">
              <a
                  :href="item.uri"
                  target="_blank"
              >
                <img :src="item.thumb" alt="Cover">
              </a>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-btn
                    variant="text"
                    icon
                    @click="addToPlayer(item)">
                  <v-icon
                      color="primary"
                      size="small">
                    mdi-play-circle
                  </v-icon>
                </v-btn>
            </template>

            <template v-slot:item.artists="{ item }">
              <span>
                <a
                    v-for="(artist, index) in item.artists"
                    :key="artist.id"
                    :href="`https://www.discogs.com/artist/${artist.id}`"
                    target="_blank"
                >
                  {{ artist.name }}
                  <template v-if="index !== item.artists.length - 1 && item.artists.length > 1"> , </template>
                </a>
              </span>
            </template>

            <template v-slot:item.title="{ item }">
              <span>
                <a
                    :href="item.uri"
                    target="_blank"
                >
                  {{ item.title }}
                </a>
              </span>
            </template>

            <template v-slot:item.labels="{ item }">
              <span>
                <a
                    v-for="(label, index) in item.labels"
                    :key="label.id"
                    :href="`https://www.discogs.com/label/${label.id}`"
                    target="_blank"
                >
                  {{ label.name }}
                  <template v-if="index !== item.labels.length - 1 && item.labels.length > 1"> , </template>
                </a>
              </span>
            </template>

            <template v-slot:item.formats="{ item }">
              <span>
                <template v-for="(format, index) in item.formats" :key="index">
                  {{ format.name }},
                  <template v-if="format.descriptions && format.descriptions.length">
                    {{ format.descriptions.join(', ') }}
                  </template>
                  <template v-if="index !== item.formats.length - 1"> , </template>
                </template>
              </span>
            </template>

            <template v-slot:item.genres="{ item }">
              <span>
                {{ item.genres.join(', ') }}
              </span>
            </template>

            <template v-slot:item.styles="{ item }">
              <span>
                {{ item.styles.join(', ') }}
              </span>
            </template>
          </v-data-table>
        </v-col>

        <v-col cols="4" class="pt-2">
          <v-card flat>
            <!-- Navigation Buttons -->
            <v-row>
              <v-col cols="6" class="d-flex">
                <v-btn
                    variant="text"
                    icon
                    size="small"
                    @click="prevRelease"
                    class="ml-2 align-self-start">
                  <v-icon>
                    mdi-arrow-left
                  </v-icon>
                </v-btn>
                <v-btn
                    variant="text"
                    icon
                    size="small"
                    @click="nextRelease"
                    class="ml-2 align-self-start">
                  <v-icon>
                    mdi-arrow-right
                  </v-icon>
                </v-btn>
              </v-col>

              <v-col cols="6" class="d-flex">
                <v-chip
                    size="small"
                    class="align-self-end">
                    {{ playerReleases.length }} Releases in Player
                </v-chip>
              </v-col>
              <v-divider />
            </v-row>

            <!-- Release Info Section -->
            <v-row>
              <v-col cols="2">
                <v-img
                    :src="currentRelease?.thumb"
                    alt="Cover"
                    max-width="60">
                </v-img>
              </v-col>
              <v-col cols="8" class="d-flex flex-column">
                <span class="align-self-start">{{ currentRelease?.artists?.map(artist => artist.name)?.join(', ') }}</span>
                <strong class="align-self-start">
                  <span >{{ currentRelease?.title }}</span>
                </strong>
              </v-col>

              <!-- Remove Button -->
              <v-col cols="2" class="d-flex justify-end">
                <v-btn
                    variant="text"
                    icon
                    size="small"
                    @click="removeCurrentRelease">
                    <v-icon
                        color="red"
                        size="small">
                      mdi-close
                    </v-icon>
                </v-btn>
              </v-col>

              <v-col class="d-flex flex-column pt-0">
                <small class="align-self-start">
                  <strong>{{ currentRelease?.labels?.map(label => label.name)?.join(', ') }}</strong> - {{ currentRelease?.released }}
                </small>
                <small class="align-self-start">
                  {{ currentRelease?.genres?.join(', ') }} > {{ currentRelease?.styles?.join(', ') }}
                </small>
              </v-col>
              <v-divider />
            </v-row>

            <!-- YouTube Player -->
            <v-row>
              <v-col>
                <iframe
                    v-if="currentVideoUrl"
                    :src="currentVideoUrl"
                    width="100%"
                    height="218"
                    allow="autoplay"
                ></iframe>
              </v-col>
              <v-divider />
            </v-row>

            <!-- Playlist Section -->
            <v-row>
              <v-col class="pt-0">
                <v-list lines="one">
                  <v-list-item
                      v-for="(track, index) in currentRelease?.videos"
                      :key="index"
                      :class="{ highlight: isCurrentVideo(track?.uri) }"
                      @click="playVideo(track?.uri)"
                      >
                      <small>{{ track?.title }}</small>
                  </v-list-item>
                </v-list>
                <v-divider />
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import KollektivXReleases from '/src/assets/KollektivXData.json';

const search = ref('');
const headers = ref([
  { title: 'Cover', key: 'image', sortable: false },
  { title: 'Actions', key: 'actions', sortable: false },
  { title: 'Artists', key: 'artists' },
  { title: 'Title', key: 'title' },
  { title: 'Labels', key: 'labels' },
  { title: 'Formats', key: 'formats' },
  { title: 'Country', key: 'country' },
  { title: 'Released', key: 'released' },
  { title: 'Genres', key: 'genres' },
  { title: 'Styles', key: 'styles' },
]);

function filterByFields(value, query, item) {
  if (!query) return true;
  const normalizedQuery = query.toLowerCase();

  if (typeof value === 'string') {
    return value.toLowerCase().includes(normalizedQuery);
  }

  if (Array.isArray(value)) {
    return value.some((val) =>
        typeof val === 'string' && val.toLowerCase().includes(normalizedQuery) ||
        typeof val === 'object' && val.name && val.name.toLowerCase().includes(normalizedQuery)
    );
  }

  return false;
}

// Media player
// Array to store all added releases
const playerReleases = ref([]);

const currentReleaseIndex = ref(0);
const currentRelease = ref(playerReleases.value[currentReleaseIndex.value] || {});
const currentVideoUrl = ref(null);
const currentVideoId = ref(null);

// Function to add a release to the player
function addToPlayer(item) {
  if (!playerReleases.value.includes(item)) {
    playerReleases.value.push(item);

    if (Object.keys(currentRelease.value).length === 0) {
      currentRelease.value = playerReleases.value[0];
      this.playVideo(currentRelease.value?.videos[0]?.uri);
    }
  }
}

// Functions to navigate between releases
function prevRelease() {
  if (currentReleaseIndex.value > 0) {
    currentReleaseIndex.value--;
    currentRelease.value = playerReleases.value[currentReleaseIndex.value];
  }
}

function nextRelease() {
  if (currentReleaseIndex.value < playerReleases.value.length - 1) {
    currentReleaseIndex.value++;
    currentRelease.value = playerReleases.value[currentReleaseIndex.value];
  }
}

// Show all releases (this could be expanded with a modal or a dropdown)
function showAllReleases() {
  console.log('All added releases:', playerReleases.value);
}

// Function to play selected YouTube track
function playVideo(url) {
  currentVideoId.value = new URL(url).searchParams.get('v');
  currentVideoUrl.value = `https://www.youtube.com/embed/${currentVideoId.value}?autoplay=1`;
}

// Function to check if the current track is the one playing
const isCurrentVideo = (trackUri) => {
  const trackId = trackUri.split('v=')[1];
  return trackId === currentVideoId.value;
};

// Function to remove the current release from the player
function removeCurrentRelease() {
  if (playerReleases.value.length > 0) {
    playerReleases.value.splice(currentReleaseIndex.value, 1);

    // Adjust the current release after removal
    if (playerReleases.value.length > 0) {
      currentReleaseIndex.value = Math.min(currentReleaseIndex.value, playerReleases.value.length - 1);
      currentRelease.value = playerReleases.value[currentReleaseIndex.value];
    } else {
      currentRelease.value = {};
      currentVideoUrl.value = null;
    }
  }
}
</script>

<style scoped>
.highlight {
  background-color: #e0f7fa;
  font-weight: bold;
}
</style>