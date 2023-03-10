<script setup>
import { onActivated, ref, watch } from 'vue'
import { getUserManageList } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { useRouter } from 'vue-router'
import Export2Excel from './component/Export2Excel.vue'
import RolesDialog from './component/roles.vue'
const router = useRouter()
// 数据相关
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(2)
// 获取数据的方法
const getListData = async () => {
  const result = await getUserManageList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
}
// getListData()
// 监听语言切换
watchSwitchLang(getListData)
const onImportExcelClick = () => {
  router.push('/user/import')
}
const handleSizeChange = currentSize => {
  size.value = currentSize
  getListData()
}
const handleCurrentChange = currentPage => {
  page.value = currentPage
  getListData()
}
/**
 * excel 导出点击事件
 */
const exportToExcelVisible = ref(false)
const onToExcelClick = () => {
  exportToExcelVisible.value = true
}
onActivated(getListData)
/**
 * 查看角色的点击事件
 */
const roleDialogVisible = ref(false)
const selectUserId = ref('')
const onShowRoleClick = row => {
  console.log(row)
  roleDialogVisible.value = true
  selectUserId.value = row._id
  console.log(selectUserId.value)
}
// 保证每次打开重新获取用户角色数据
watch(roleDialogVisible, val => {
  if (!val) selectUserId.value = ''
})
</script>
<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button
          type="primary"
          @click="onImportExcelClick"
          v-permission="['importUser']"
        >
          {{ $t('msg.excel.importExcel') }}</el-button
        >
        <el-button type="success" @click="onToExcelClick">
          {{ $t('msg.excel.exportExcel') }}
        </el-button>
      </div>
    </el-card>
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" type="index" />
        <el-table-column prop="username" :label="$t('msg.excel.name')">
        </el-table-column>
        <el-table-column prop="mobile" :label="$t('msg.excel.mobile')">
        </el-table-column>
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="mini">{{
                item.title
              }}</el-tag>
            </div>
            <div v-else>
              <el-tag size="mini">{{ $t('msg.excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="openTime" :label="$t('msg.excel.openTime')">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="260"
        >
          <template #default="{row}">
            <el-button type="primary" size="mini">{{
              $t('msg.excel.show')
            }}</el-button>
            <el-button
              v-permission="['distributeRole']"
              type="info"
              @click="onShowRoleClick(row)"
              size="mini"
              >{{ $t('msg.excel.showRole') }}</el-button
            >
            <el-button
              type="danger"
              v-permission="['removeUser']"
              size="mini"
              >{{ $t('msg.excel.remove') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <Export2Excel v-model="exportToExcelVisible"></Export2Excel>
    <roles-dialog
      v-model="roleDialogVisible"
      :userId="selectUserId"
      @updateRole="getListData"
    ></roles-dialog>
  </div>
</template>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  ::v-deep .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  ::v-deep .el-tag {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
