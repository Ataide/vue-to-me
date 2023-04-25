<template>
  <section class="base-container">
    <slot />
  </section>
</template>

<style scoped>
.base-container {
  @apply grid sm:grid-cols-2 md:grid-cols-3 mx-0;
}
</style>