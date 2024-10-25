<template>
  <div>
    <AppHeader :type="1" text="홈 화면" />

    <AppButton type="square-border" text="test" />
    <AppButton type="ellipse-border" text="test" />
    <AppButton type="square-filled" text="test" />
    <AppButton type="ellipse-filled" text="test" />
  </div>
</template>

<script setup>
import { AppHeader, AppButton } from "@/components";
</script>
<style scoped></style>
