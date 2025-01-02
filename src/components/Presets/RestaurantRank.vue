<template>
  <div
    class="p-[28px_20px] border-gray-200 border bg-white rounded-lg shadow-sm"
  >
    <div class="flex justify-between items-center mb-4">
      <AppHeader :type="4" :text="props.title" />
      <button
        class="px-3 py-1 rounded-full border border-[var(--ssafy-blue)] font-[600] text-[var(--ssafy-blue)] text-sm transition hover:bg-[#3396f4] hover:text-white"
      >
        더보기
      </button>
    </div>

    <div class="space-y-4">
      <div
        v-for="(restaurant, index) in restaurants"
        :key="restaurant.id"
        class="flex items-center py-3 border-b border-gray-100 last:border-0"
      >
        <div class="w-32 h-24 rounded-lg overflow-hidden mr-4 relative">
          <div
            class="flex justify-center items-center w-6 h-6 bg-[#3396f4] text-white rounded-lg text-sm font-bold mr-3 absolute left-1 top-1"
          >
            {{ index + 1 }}
          </div>
          <img
            :src="restaurant.image"
            :alt="restaurant.name"
            class="w-full h-full object-cover bg-[#eee]"
          />
        </div>
        <div class="flex-1">
          <h4 class="font-bold text-base mb-1">{{ restaurant.name }}</h4>
          <div class="flex items-center gap-1 mb-1">
            <span class="text-yellow-400">⭐</span>
            <span class="font-medium">{{ restaurant.rating }}</span>
            <span class="text-sm text-gray-500"
              >리뷰 {{ restaurant.reviews }}</span
            >
          </div>
          <p class="text-sm text-gray-600 line-clamp-2">
            {{ restaurant.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { AppHeader } from "@/components";
const props = defineProps({
  title: String,
});

const restaurants = [
  {
    id: 1,
    name: "파티세리 소신",
    image: "/path/to/image1.jpg",
    rating: 4.5,
    reviews: 123,
    description:
      "Lorem ipsum dolor sit amet consectetur. Condimentum enim turpis etiam.",
  },
  {
    id: 2,
    name: "파티세리 소신",
    image: "/path/to/image2.jpg",
    rating: 4.5,
    reviews: 123,
    description:
      "Lorem ipsum dolor sit amet consectetur. Condimentum enim turpis etiam.",
  },
  {
    id: 3,
    name: "파티세리 소신",
    image: "/path/to/image3.jpg",
    rating: 4.5,
    reviews: 123,
    description:
      "Lorem ipsum dolor sit amet consectetur. Condimentum enim turpis etiam.",
  },
  {
    id: 4,
    name: "파티세리 소신",
    image: "/path/to/image4.jpg",
    rating: 4.5,
    reviews: 123,
    description:
      "Lorem ipsum dolor sit amet consectetur. Condimentum enim turpis etiam.",
  },
];
</script>
