<template>
  <div class="searchTab">
    <div class="btnList">
			<el-button size="mini" icon="el-icon-edit-outline">新增</el-button>
			<el-button size="mini" icon="el-icon-edit-outline">编辑</el-button>
			<el-button size="mini" icon="el-icon-edit-outline">删除</el-button>
			<el-button size="mini" icon="el-icon-edit-outline">启用</el-button>
			<el-button size="mini" icon="el-icon-edit-outline">禁用</el-button>
			<el-button size="mini" icon="el-icon-edit-outline">刷新</el-button>
    </div>
    <div class="table">
			<el-table :data="tableData" border style="width: 100%;flex:4;cursor:pointer;">
      	<el-table-column v-for="(header, index) in tableHeader"	 v-if="header.ccolumnname === 'checkbox'" type="selection" width="55" header-align="center" align="center" :fixed="header.fixed"  :prop="header.isCheck"></el-table-column>
				<el-table-column v-for="(header, index) in tableHeader"	 v-if="header.ccolumnname !== 'checkbox'" :sort-by='header.csortfields' :prop="header.ccolumnnumber" :label="header.ccolumnname" :width="header.cwidth" :fixed="header.fixed" :sortable='customsort(header.sort)' :formatter="columnFormat" header-align="center" align="center" :min-width="isNaN(header.width)?'150':header.width"> </el-table-column>
			</el-table>
    </div>
		<el-pagination @current-change="handleCurrentChange" :page-sizes="[200]" :page-size="200" background layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" class="dialog">
			<el-form :model="form">
				<el-form-item label="模块编号:" required>
					<el-input v-model="form.name" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="功能编号:" required>
					<el-input v-model="form.name" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="功能名称:" required>
					<el-input v-model="form.name" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="类型:" required>
					<el-select size="mini" v-model="form.region" placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="是否在移动端显示:" required>
					<el-select size="mini" v-model="form.region" placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { fastSort } from '@/utils/common'
export default {
	name: 'searchTab',
  data() {
		return{
			tableData:[],
			tableHeader:[
				{
					"calignment": "center",
					"ccolumnname": "类型",
					"ccolumnnumber": "ntype",
					"cmodulenumber": "SYSMODULE",
					"csortfields": "ntype",
					"cstaffname": "自动",
					"cstaffwork": "sunny",
					"cwidth": "150",
					"fkSysModcol": "aaed0836-d183-448d-9c04-528aafa12d7b",
					"fkSysModshowplan": "191b8489-2c64-4e75-b0cf-86756137616f",
					"fkSysStaff": "b3081703-f493-11e8-b406-0050568e74b3",
					"id": "1e98bb5b-0225-4902-b4f9-77d7a9e7bb50",
					"ndisplayorder": 7,
					"ndisplaystate": 1,
					"nexportstatus": 0,
					"nlocking": 0,
					"nupanddownlistlogo": 1,
					"ts": 1573026294000
				},
				{
					"calignment": "center",
					"ccolumnname": "checkbox",
					"ccolumnnumber": "",
					"cmodulenumber": "SYSMODULE",
					"csortfields": "id",
					"cstaffname": "自动",
					"cstaffwork": "sunny",
					"cwidth": "55",
					"fkSysModcol": "1428dc91-a9a2-11e8-b406-0050568e74b3",
					"fkSysModshowplan": "191b8489-2c64-4e75-b0cf-86756137616f",
					"fkSysStaff": "b3081703-f493-11e8-b406-0050568e74b3",
					"id": "3163f610-3595-459c-bb17-8b0ed8fac68e",
					"ndisplayorder": 0,
					"ndisplaystate": 1,
					"nexportstatus": 0,
					"nlocking": 0,
					"nupanddownlistlogo": 1,
					"ts": 1573026294000
				},
				{
					"calignment": "center",
					"ccolumnname": "功能编号",
					"ccolumnnumber": "cnum",
					"cmodulenumber": "SYSMODULE",
					"csortfields": "cnum",
					"cstaffname": "自动",
					"cstaffwork": "sunny",
					"cwidth": "150",
					"fkSysModcol": "2c59afb0-9bee-4a6d-aed5-bd190869f0ab",
					"fkSysModshowplan": "191b8489-2c64-4e75-b0cf-86756137616f",
					"fkSysStaff": "b3081703-f493-11e8-b406-0050568e74b3",
					"id": "462c4885-bed4-44fe-bac8-8b71df37b3f6",
					"ndisplayorder": 2,
					"ndisplaystate": 1,
					"nexportstatus": 0,
					"nlocking": 0,
					"nupanddownlistlogo": 1,
					"ts": 1573026294000
				},
				{
					"calignment": "center",
					"ccolumnname": "登记人姓名",
					"ccolumnnumber": "cstaffname",
					"cmodulenumber": "SYSMODULE",
					"csortfields": "cstaffname",
					"cstaffname": "自动",
					"cstaffwork": "sunny",
					"cwidth": "150",
					"fkSysModcol": "edc3fe20-908d-44e4-ad73-a608e2448b65",
					"fkSysModshowplan": "191b8489-2c64-4e75-b0cf-86756137616f",
					"fkSysStaff": "b3081703-f493-11e8-b406-0050568e74b3",
					"id": "4be444d6-ac8e-44cb-ba40-1f933bf7d17d",
					"ndisplayorder": 9,
					"ndisplaystate": 1,
					"nexportstatus": 0,
					"nlocking": 0,
					"nupanddownlistlogo": 1,
					"ts": 1573026294000
				},
				{
					"calignment": "center",
					"ccolumnname": "最后更新时间",
					"ccolumnnumber": "ddate",
					"cmodulenumber": "SYSMODULE",
					"csortfields": "ddate",
					"cstaffname": "自动",
					"cstaffwork": "sunny",
					"cwidth": "150",
					"fkSysModcol": "ef65ddb8-e839-46e5-a4db-4d4da16e87fa",
					"fkSysModshowplan": "191b8489-2c64-4e75-b0cf-86756137616f",
					"fkSysStaff": "b3081703-f493-11e8-b406-0050568e74b3",
					"id": "55135520-3f5c-4159-8e7d-922a5282e10f",
					"ndisplayorder": 12,
					"ndisplaystate": 1,
					"nexportstatus": 0,
					"nlocking": 0,
					"nupanddownlistlogo": 1,
					"ts": 1573026294000
				},
				{
					"calignment": "center",
					"ccolumnname": "是否启用",
					"ccolumnnumber": "nmanagestatus",
					"cmodulenumber": "SYSMODULE",
					"csortfields": "nmanagestatus",
					"cstaffname": "自动",
					"cstaffwork": "sunny",
					"cwidth": "150",
					"fkSysModcol": "7bfd14e2-4d53-4301-808a-a3aff5aa8005",
					"fkSysModshowplan": "191b8489-2c64-4e75-b0cf-86756137616f",
					"fkSysStaff": "b3081703-f493-11e8-b406-0050568e74b3",
					"id": "862c4d33-8539-4d44-8e26-2a2fd78a7172",
					"ndisplayorder": 5,
					"ndisplaystate": 1,
					"nexportstatus": 0,
					"nlocking": 0,
					"nupanddownlistlogo": 1,
					"ts": 1573026294000
				},
				{
					"calignment": "center",
					"ccolumnname": "登记人工号",
					"ccolumnnumber": "cstaffwork",
					"cmodulenumber": "SYSMODULE",
					"csortfields": "cstaffwork",
					"cstaffname": "自动",
					"cstaffwork": "sunny",
					"cwidth": "150",
					"fkSysModcol": "81bc0c5a-c216-4568-9294-07be6c6f3999",
					"fkSysModshowplan": "191b8489-2c64-4e75-b0cf-86756137616f",
					"fkSysStaff": "b3081703-f493-11e8-b406-0050568e74b3",
					"id": "b488fada-c6d2-4485-b6f0-9edce0c5db4e",
					"ndisplayorder": 8,
					"ndisplaystate": 1,
					"nexportstatus": 0,
					"nlocking": 0,
					"nupanddownlistlogo": 1,
					"ts": 1573026294000
				},
				{
					"calignment": "center",
					"ccolumnname": "是否在移动端显示",
					"ccolumnnumber": "nshowonphone",
					"cmodulenumber": "SYSMODULE",
					"csortfields": "nshowonphone",
					"cstaffname": "自动",
					"cstaffwork": "sunny",
					"cwidth": "150",
					"fkSysModcol": "f2b577a8-a5d9-4d2b-8c40-5c0e33fdebb2",
					"fkSysModshowplan": "191b8489-2c64-4e75-b0cf-86756137616f",
					"fkSysStaff": "b3081703-f493-11e8-b406-0050568e74b3",
					"id": "db95bc23-42bf-4277-978f-e47c26b82946",
					"ndisplayorder": 6,
					"ndisplaystate": 1,
					"nexportstatus": 0,
					"nlocking": 0,
					"nupanddownlistlogo": 1,
					"ts": 1573026294000
				},
				{
					"calignment": "center",
					"ccolumnname": "模块编号",
					"ccolumnnumber": "cmodnum",
					"cmodulenumber": "SYSMODULE",
					"csortfields": "cmodnum",
					"cstaffname": "自动",
					"cstaffwork": "sunny",
					"cwidth": "150",
					"fkSysModcol": "2fe612a7-45d0-4090-9e2f-964bd0757aab",
					"fkSysModshowplan": "191b8489-2c64-4e75-b0cf-86756137616f",
					"fkSysStaff": "b3081703-f493-11e8-b406-0050568e74b3",
					"id": "e50d8c41-a9f8-45ca-b80a-1d4967c6cde1",
					"ndisplayorder": 1,
					"ndisplaystate": 1,
					"nexportstatus": 0,
					"nlocking": 0,
					"nupanddownlistlogo": 1,
					"ts": 1573026294000
				},
				{
					"calignment": "center",
					"ccolumnname": "功能名称",
					"ccolumnnumber": "cname",
					"cmodulenumber": "SYSMODULE",
					"csortfields": "cname",
					"cstaffname": "自动",
					"cstaffwork": "sunny",
					"cwidth": "150",
					"fkSysModcol": "4e67e2c9-c614-4515-955e-1e1fc94dce2d",
					"fkSysModshowplan": "191b8489-2c64-4e75-b0cf-86756137616f",
					"fkSysStaff": "b3081703-f493-11e8-b406-0050568e74b3",
					"id": "ebc033e4-13f1-4fd8-8297-126343e54587",
					"ndisplayorder": 3,
					"ndisplaystate": 1,
					"nexportstatus": 0,
					"nlocking": 0,
					"nupanddownlistlogo": 1,
					"ts": 1573026294000
				}
  		],
			total: 0,
			dialogTitle:'查询项-新增',
			dialogVisible:false,
			form:{
				name:''
			}
		}
	},
	mounted() {
		this.tableHeader.sort(fastSort('ndisplayorder'))
  },
	methods:{
		customsort: function(sort) {
      if (!sort) {
        return false
      }
      return 'custom'
		},
		/** @description 日期格式化处理 */
    columnFormat: function(row, column, cellValue) {
      const self = this
      // if (column.property == 'cfactory') {
      //   var factoryList = self.$store.state.permission.factoryList
      //   if (factoryList[cellValue]) {
      //     return factoryList[cellValue]
      //   }
      // } else if (column.property == 'ncompany') {
      //   var companyList = self.$store.state.permission.companyList
      //   if (companyList[cellValue]) {
      //     return companyList[cellValue]
      //   }
      // }
      // if (column.property.startsWith('d')) {
      //   var date = row[column.property]
      //   if (date === undefined) {
      //     return ''
      //   }
      //   if (self.moduleData.format.hasOwnProperty(column.property)) {
      //     return dateFormat(date, self.moduleData.format[column.property])
      //   }
      //   return dateFormat(date, 'yyyy-MM-dd hh:mm:ss')
      // } else {
      //   for (const item in self.moduleData.format) {
      //     if (column.property === item) {
      //       const dataFor = self.moduleData.format[item]
      //       if (dataFor instanceof Array) {
      //         for (const item1 of dataFor) {
      //           if (item1.cnum === cellValue) {
      //             return self.$t(self.moduleData.moduleName + '.' + item1.cname)
      //           }
      //         }
      //       } else {
      //         return self.moduleData.format[item](cellValue)
      //       }
      //     }
      //   }
      // }
      return cellValue
    },
		/** @description 分页跳转获取表格数据*/
    handleCurrentChange: function(pageNo) {
      // 分页跳转后滚动条置顶
      const outTable = document.getElementsByClassName('handleCurrentChange')
      if (outTable && outTable.length > 0) {
        for (let i = 0; i < outTable.length; i++) {
          outTable[i].querySelector('.el-table__body-wrapper').scrollTop = 0
        }
      }
      this.pageNo = pageNo
      this.GetTableBody(pageNo, this.treeDic, this.order)
    },
	}
}
</script>

<style lang='scss'>
.searchTab{
	height: 100%;
	display: flex;
  flex-flow: column;
  justify-content: space-between;
	.btnList{
		display: flex;
    flex-flow: row wrap;
		padding: 5px;
		height: 34px;
		overflow: hidden;
		.el-button {
      display: flex;
      flex-flow: row;
      align-items: center;
      margin-bottom: 5px;
      & > i {
        color: #0093e0 !important;
      }
    }
		.el-button--mini{
			padding: 5px 8px;
		}
	}
	.table{
		flex: 3;
		display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-flow: column;
    flex-flow: column;
		.el-table{
			flex: 1;
			.el-table__body-wrapper {
				height: calc(100% - 50px);
				overflow: auto!important;
			}
			.el-dialog__header {
				background-color: #eef1f8 !important;
				height: 35px;
				padding: 5px 15px 10px !important;
				.el-dialog__title {
					color: #0093e0 !important;
					font-size: 16px !important;
					font-weight: bold;
				}
			}
		}
	}
	.dialog{
		.el-form-item__label{
			width: 150px;
		}
		.el-input{
			width: 200px;
		}
	}
}
</style>