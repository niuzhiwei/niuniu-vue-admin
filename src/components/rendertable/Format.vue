//自定义展示数据格式
<template functional>
  <div v-html="props.format(props.value,props.data)"></div>
</template>
