<template>
  <div class="default-box">
    <slot />
  </div>
</template>

<script>
export default {
 
};
</script>

<style>
.default-box {
  @apply flex items-center justify-center bg-gray-200 h-52 w-full sm:rounded sm:shadow border border-gray-300;
}

</style>