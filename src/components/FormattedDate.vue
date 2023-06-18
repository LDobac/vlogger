<template>
    <p class="date">&#x1F4C5; {{formattedDate}}</p>
</template>

<script lang="ts">
import dayjs from "dayjs";
import { computed, defineComponent, PropType, toRefs } from "vue";

export default defineComponent({
    name : "FormattedDate",
    props : {
        date : {
            type : [String, Object] as PropType<string | dayjs.Dayjs>,
        }
    },
    setup(props) {
        const { date } = toRefs(props);

        const formattedDate = computed(() => {
            if (typeof date.value == "string")
            {
                return dayjs(date.value).format("YYYY년 MM월 DD일");
            }

            return (date.value as dayjs.Dayjs).format("YYYY년 MM월 DD일");
        });

        return {
            formattedDate,
        };
    },
});
</script>

<style lang="scss" scoped>
.date {
    @include m-sm {
        font-size: 0.9rem;
    }
}
</style>