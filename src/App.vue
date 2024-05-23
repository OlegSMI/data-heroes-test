<template>
  <div class="container">
    <div class="filters_area">
      <input class="input_area" v-model="inputName" />
      <select class="select_area" v-model="selectStatus">
        <option value="alive">Alive</option>
        <option :value="null" selected>NULL</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
      <v-btn @click="setFilters">Apply</v-btn>
    </div>
    <div class="wrapper-cards">
      <CardCharacter
        v-for="character in characters"
        :key="character.name"
        :title="character.name"
        :image="character.image"
        :status="character.status"
        :species="character.species"
        :location="character.location.name"
        :episode="character.episode[0]"
      ></CardCharacter>
    </div>
    <v-pagination v-model="currentPage" :length="pagesCount" :total-visible="7">
      <template #prev>
        <v-btn @click="setPaginate(currentPage - 1)"> Prev </v-btn>
      </template>
      <template #item="{ page }">
        <v-btn
          @click="setPaginate(Number(page))"
          :color="currentPage === Number(page) ? 'warning' : ''"
          >{{ page }}</v-btn
        >
      </template>
      <template #next>
        <v-btn @click="setPaginate(currentPage + 1)"> Next </v-btn>
      </template>
    </v-pagination>
  </div>
</template>

<script setup lang="ts">
import { Ref, onMounted, ref } from "vue";
import { useCharacters } from "./api/useCharacters";
import CardCharacter from "./components/CardCharacter.vue";
import { ICharacter, Status } from "./interfaces/ICharacter";
import { IResponse } from "./interfaces/IRest";

const characters: Ref<ICharacter[]> = ref([]);
const currentPage: Ref<number> = ref(1);
const pagesCount: Ref<number> = ref(1);
const inputName: Ref<string> = ref("");
const selectStatus: Ref<Status | null> = ref(null);

const { getAllCharacters, getFilteredCharacters } = useCharacters();

onMounted(async () => {
  const data: IResponse<ICharacter> = await getAllCharacters();
  characters.value = data.results;
  pagesCount.value = data.info.pages;
});

const setFilters = async () => {
  const data: IResponse<ICharacter> = await getFilteredCharacters({
    name: inputName.value,
    status: selectStatus.value,
  });
  characters.value = data.results;
  pagesCount.value = data.info.pages;
  currentPage.value = 1;
};

const setPaginate = async (page: number) => {
  if (page === 0 || page > pagesCount.value) return;

  currentPage.value = page;
  const data: IResponse<ICharacter> = await getFilteredCharacters({
    name: inputName.value,
    status: selectStatus.value,
    page: page,
  });
  characters.value = data.results;
  pagesCount.value = data.info.pages;
};
</script>

<style lang="scss" scoped>
.wrapper-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.filters_area {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  .input_area {
    border: 1px solid white;
  }

  .select_area {
    border: 1px solid white;
  }
}
.pagination {
  display: flex;

  .page {
    padding: 10px;
    margin: 10px;
    border: 1px solid black;
    cursor: pointer;
  }

  .active {
    background-color: black;
    color: white;
  }
}
</style>
