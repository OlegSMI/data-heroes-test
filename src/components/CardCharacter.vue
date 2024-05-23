<template>
  <div class="card-wrapper">
    <ImageCharacter :image="image" />
    <div class="card__content">
      <div class="card__content_title">
        <h2>{{ title }}</h2>
        <StatusIcon :status="status" :species="species"></StatusIcon>
      </div>
      <div class="card__content_location">
        <span :style="{ color: '#9E9E9E' }">Last known location:</span>
        {{ location }}
      </div>
      <div class="card__content_first-seen">
        <span :style="{ color: '#9E9E9E' }">First seen in:</span>
        {{ episodename }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useEpisodes } from "../api/useEpisodes";
import { Status } from "../interfaces/ICharacter";
import ImageCharacter from "./cardCharacter/ImageCharacter.vue";
import StatusIcon from "./cardCharacter/StatusIcon.vue";

const props = defineProps<{
  title: string;
  status: Status;
  species: string;
  location: string;
  episode: string;
  image: string;
}>();

const { getFirstEpisode } = useEpisodes();
const episodename = ref<string>("");

onMounted(async () => {
  let splitStringEpisode = props.episode.split("/");
  const indexEpisode: number = Number(splitStringEpisode.slice(-1)[0]);
  episodename.value = await getFirstEpisode(indexEpisode);
});
</script>

<style lang="scss" scoped>
.card-wrapper {
  width: 600px;
  height: 220px;
  display: flex;
  overflow: hidden;
  background: rgb(60, 62, 68);
  border-radius: 0.5rem;
  margin: 0.75rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;

  .card {
    &__content {
      flex: 3 1 0%;
      position: relative;
      padding: 0.75rem;
      color: rgb(255, 255, 255);
      display: flex;
      flex-direction: column;
      text-align: start;

      &_title {
        font-size: 1.5rem;
        -webkit-box-pack: start;
        justify-content: flex-start;
      }

      &_location {
        flex: 1 1 0%;
        display: flex;
        flex-direction: column;
        -moz-box-pack: center;
        justify-content: center;
      }
    }
  }
}
</style>
