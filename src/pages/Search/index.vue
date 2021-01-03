<template>
  <div>
    搜索关键字:{{ $route.params.keyword }}
    <h3>params.keyword: {{ $route.params.keyword }}</h3>
    <h3>query.keyword2: {{ $route.query.keyword2 }}</h3>
  </div>
</template>

<script>
export default {
  name: "Search",
};
</script>

<style lang="less" scoped>
</style>
