<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">
        {{ $t('msg.uploadExcel.upload') }}
      </el-button>
    </div>

    <input
      ref="excelUploadInput"
      class="excel-upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleChange"
    />
    <!-- https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API -->
    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <i class="el-icon-upload" />
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { getHeaderRow } from './utils'
import XLSX from 'xlsx'
const props = defineProps({
  // 上传前回调
  beforeUpload: Function,
  // 成功回调
  onSuccess: Function
})
const loading = ref(false)
const excelUploadInput = ref(null)
const handleUpload = () => {
  excelUploadInput.value.click()
}
const handleChange = e => {
  const files = e.target.files
  const rawFile = files[0]
  if (!rawFile) return
  upload(rawFile)
}
const handleDragover = () => {}
const handleDrop = () => {}

const upload = rawFile => {
  excelUploadInput.value.value = null
  if (!props.beforeUpload) {
    renderData(rawFile)
    return
  }
  const before = props.beforeUpload(rawFile)
  if (before) {
    renderData(rawFile)
  }
}
/**
 * 读取数据
 */
const renderData = rawFile => {
  loading.value = true
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    // 读取操作完成时触发
    reader.onload = e => {
      // 1.获取解析后的数据
      const data = e.target.result
      // 2.利用xlsx对数据解析
      const workbook = XLSX.read(data, { type: 'array' })
      // 3.获取第一章表格名称
      const firstSheetName = workbook.SheetNames[0]
      // 4.读取sheet1的数据
      const workSheet = workbook.Sheets[firstSheetName]
      // 5.解析数据表头
      const header = getHeaderRow(workSheet)
      // 6.解析数据体
      const results = XLSX.utils.sheet_add_json(workSheet)
      // 7.传入解析后的数据
      generateData({ header, results })
      // 8。处理loading和回调
      loading.value = false
      resolve()
    }
    reader.readAsArrayBuffer(rawFile)
  })
}
/**
 * 根据导入内容生成数据
 */
const generateData = excelData => {
  props.onSuccess && props.onSuccess(excelData)
}
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
