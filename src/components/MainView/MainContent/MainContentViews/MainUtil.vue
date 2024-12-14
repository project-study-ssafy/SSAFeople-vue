<template>
  <div>
    <AppHeader :type="1" text="유틸 화면" />

    <AppButton button-type="square-border" text="test" />
    <AppButton button-type="ellipse-border" text="test" />
    <AppButton button-type="square-filled" text="test" />
    <AppButton button-type="ellipse-filled" text="test" />
  </div>
</template>

<script setup>
import { AppHeader, AppButton } from "@/components";
</script>
<style scoped></style>
