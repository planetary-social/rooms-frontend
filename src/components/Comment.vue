<template>
  <div class="col-12">
    {{ comment?.text }}
  </div>
</template>
<script>
  export default {
    name: 'Comment',
    props: {
      comment: Object
    }
  }
</script>