<template>
    <p class="date">{{formattedDate}}</p>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { computed, toRefs } from "vue";

const props = defineProps<{date: string | dayjs.Dayjs}>();

const { date } = toRefs(props);

const formatString = "YYYY년 MM월 DD일";

const formattedDate = computed(() => {
    if (typeof date.value === "string")
    {
        return dayjs(date.value).format(formatString);
    }

    return (date.value as dayjs.Dayjs).format(formatString);
});
</script>

<style lang="scss" scoped>
.date {
    display: inline;
    color: #000000ab;

    @include m-sm {
        font-size: 0.9rem;
    }
}
</style>