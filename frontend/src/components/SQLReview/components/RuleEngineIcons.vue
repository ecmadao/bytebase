<template>
  <div v-for="engine in engineList" :key="engine" class="relative w-4">
    <RuleEngineIcon :engine="engine" />
  </div>
</template>

<script lang="ts" setup>
import type { Engine } from "@/types/proto/v1/common";

defineProps<{
  engineList: Engine[];
}>();
</script>
