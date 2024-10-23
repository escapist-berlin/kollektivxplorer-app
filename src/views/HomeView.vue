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
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import KollektivXReleases from '/src/assets/KollektivXData.json';

const search = ref('');
const headers = ref([
  { title: 'Cover', key: 'image', sortable: false },
  { title: 'Artists', key: 'artists' },
  { title: 'Title', key: 'title' },
  { title: 'Labels', key: 'labels' },
  { title: 'Formats', key: 'formats' },
  { title: 'Country', key: 'country' },
  { title: 'Released', key: 'released' },
  { title: 'Genres', key: 'genres' },
  { title: 'Styles', key: 'styles' },
  { title: 'Actions', key: 'actions', sortable: false },
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
</script>