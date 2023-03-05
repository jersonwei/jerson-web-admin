<script setup>
import UploadExcel from '@/components/UploadExcel/index.vue'
/**
 * 数据解析成功后的会调
 */
const onSuccess = excelData => {
  console.log(excelData)
}
</script>
<template>
  <UploadExcel :onSuccess="onSuccess"></UploadExcel>
</template>
<style lang="scss" scoped></style>
