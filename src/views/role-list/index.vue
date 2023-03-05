<script setup>
import { roleList } from '@/api/role'
import Distribute from './component/Distribute.vue'
import { watchSwitchLang } from '@/utils/i18n'
import { ref } from 'vue'

const allRoles = ref([])
const getRoleList = async () => {
  allRoles.value = await roleList()
}
getRoleList()
watchSwitchLang(getRoleList)
/**
 * 分配权限
 */
const distributePermissionVisible = ref(false)
const selectRoleId = ref('')
const onDistributePermissionClick = row => {
  distributePermissionVisible.value = true
  selectRoleId.value = row.id
}
</script>
<template>
  <div class="">
    <el-card>
      <el-table :data="allRoles" border style="width: 100%">
        <el-table-column :label="$t('msg.role.index')" type="index" width="120">
        </el-table-column>
        <el-table-column :label="$t('msg.role.name')" prop="title">
        </el-table-column>
        <el-table-column :label="$t('msg.role.desc')" prop="describe">
        </el-table-column>
        <el-table-column
          :label="$t('msg.role.action')"
          prop="action"
          width="260"
          #default="{row}"
        >
          <el-button
            type="primary"
            size="mini"
            v-permission="['distributePermission']"
            @click="onDistributePermissionClick(row)"
          >
            {{ $t('msg.role.assignPermissions') }}
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <Distribute
      v-model="distributePermissionVisible"
      :roleId="selectRoleId"
    ></Distribute>
  </div>
</template>
<style lang="scss" scoped></style>
