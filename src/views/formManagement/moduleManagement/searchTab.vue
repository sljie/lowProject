<template>
  <div class="searchTab">
    <div class="btnList">
			<el-button size="mini" icon="el-icon-edit-outline" @click="addBtnClick">新增</el-button>
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
			<el-form :model="form" :inline="true">
				<el-form-item label="参数属性:" required>
					<el-input v-model="form.name" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="文本:" required>
					<el-input v-model="form.name" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="类型:" required>
					<el-select size="mini" v-model="form.region">
						<el-option label="1" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="默认值:" >
					<el-input v-model="form.name" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="请求API接口:" >
					<el-input v-model="form.name" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="API参数:" >
					<el-input v-model="form.name" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="下拉选项:" required>
					<el-select size="mini" v-model="form.region">
						<el-option label="1" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="是否翻译:" required>
					<el-select size="mini" v-model="form.region">
						<el-option label="1" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="排序:" required>
					<el-input v-model="form.name" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="匹配原则:" required>
					<el-select size="mini" v-model="form.region">
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
			tableHeader: [{
				"calignment": "center",
				"ccolumnname": "登记人姓名",
				"ccolumnnumber": "cstaffname",
				"cmodulenumber": "sysModQuery",
				"csortfields": "cstaffname",
				"cstaffname": "自动",
				"cstaffwork": "sunny",
				"cwidth": "150",
				"fkSysModcol": "dd615c86-7777-4f0e-b28f-3dfd20eee7fd",
				"fkSysModshowplan": "14802f28-9957-4b25-974d-5f4e9d470254",
				"fkSysStaff": "b3081703-f493-11e8-b406-0050568e74b3",
				"id": "05a495c4-8f1a-4ce6-ba11-3fe33219f80f",
				"ndisplayorder": 10,
				"ndisplaystate": 1,
				"nexportstatus": 0,
				"nlocking": 0,
				"nupanddownlistlogo": 1,
				"ts": 1580883473000
				}, {
				"calignment": "center",
				"ccolumnname": "登记日期",
				"ccolumnnumber": "ddate",
				"cmodulenumber": "sysModQuery",
				"csortfields": "ddate",
				"cstaffname": "自动",
				"cstaffwork": "sunny",
				"cwidth": "150",
				"fkSysModcol": "6df40896-2222-4cf8-8cd2-3c38767895f5",
				"fkSysModshowplan": "14802f28-9957-4b25-974d-5f4e9d470254",
				"fkSysStaff": "b3081703-f493-11e8-b406-0050568e74b3",
				"id": "097e8a38-92fe-4ff1-8b0e-2f49a769482b",
				"ndisplayorder": 11,
				"ndisplaystate": 1,
				"nexportstatus": 0,
				"nlocking": 0,
				"nupanddownlistlogo": 1,
				"ts": 1580883473000
				}, {
				"calignment": "center",
				"ccolumnname": "类型",
				"ccolumnnumber": "ctype",
				"cmodulenumber": "sysModQuery",
				"csortfields": "ctype",
				"cstaffname": "自动",
				"cstaffwork": "sunny",
				"cwidth": "150",
				"fkSysModcol": "4ef26d4c-6f1a-485d-8044-ff0138de6063",
				"fkSysModshowplan": "14802f28-9957-4b25-974d-5f4e9d470254",
				"fkSysStaff": "b3081703-f493-11e8-b406-0050568e74b3",
				"id": "1f8ef096-a6fd-424e-8950-1ebc90428d89",
				"ndisplayorder": 4,
				"ndisplaystate": 1,
				"nexportstatus": 0,
				"nlocking": 0,
				"nupanddownlistlogo": 1,
				"ts": 1580883473000
				}, {
				"calignment": "center",
				"ccolumnname": "模块编号",
				"ccolumnnumber": "cmodnum",
				"cmodulenumber": "sysModQuery",
				"csortfields": "cmodnum",
				"cstaffname": "自动",
				"cstaffwork": "sunny",
				"cwidth": "150",
				"fkSysModcol": "0ceba21f-1111-4595-8290-e5a2cd0811ec",
				"fkSysModshowplan": "14802f28-9957-4b25-974d-5f4e9d470254",
				"fkSysStaff": "b3081703-f493-11e8-b406-0050568e74b3",
				"id": "3e0583b3-3ebc-471c-924b-67028c2a9342",
				"ndisplayorder": 1,
				"ndisplaystate": 1,
				"nexportstatus": 0,
				"nlocking": 0,
				"nupanddownlistlogo": 1,
				"ts": 1580883473000
				}, {
				"calignment": "center",
				"ccolumnname": "是否启用(0：启用；1：禁用)",
				"ccolumnnumber": "nmanagestatus",
				"cmodulenumber": "sysModQuery",
				"csortfields": "nmanagestatus",
				"cstaffname": "自动",
				"cstaffwork": "sunny",
				"cwidth": "150",
				"fkSysModcol": "b12a592a-4444-467f-a752-cb52490f9a88",
				"fkSysModshowplan": "14802f28-9957-4b25-974d-5f4e9d470254",
				"fkSysStaff": "b3081703-f493-11e8-b406-0050568e74b3",
				"id": "3f7e13e7-76b0-4eb7-86e3-a1b0d74959ff",
				"ndisplayorder": 5,
				"ndisplaystate": 1,
				"nexportstatus": 0,
				"nlocking": 0,
				"nupanddownlistlogo": 1,
				"ts": 1580883473000
				}, {
				"calignment": "center",
				"ccolumnname": "参数属性",
				"ccolumnnumber": "cnumb",
				"cmodulenumber": "sysModQuery",
				"csortfields": "cnumb",
				"cstaffname": "自动",
				"cstaffwork": "sunny",
				"cwidth": "150",
				"fkSysModcol": "f7e1805e-2cc4-11e8-873a-0050568e74b3",
				"fkSysModshowplan": "14802f28-9957-4b25-974d-5f4e9d470254",
				"fkSysStaff": "b3081703-f493-11e8-b406-0050568e74b3",
				"id": "4e586a2a-ae74-4910-8b95-8e7b3ada1532",
				"ndisplayorder": 2,
				"ndisplaystate": 1,
				"nexportstatus": 0,
				"nlocking": 0,
				"nupanddownlistlogo": 1,
				"ts": 1580883473000
				}, {
				"calignment": "center",
				"ccolumnname": "默认值",
				"ccolumnnumber": "cvalue",
				"cmodulenumber": "sysModQuery",
				"csortfields": "cvalue",
				"cstaffname": "自动",
				"cstaffwork": "sunny",
				"cwidth": "150",
				"fkSysModcol": "e4646b05-8994-4274-bcd9-ecb893407d64",
				"fkSysModshowplan": "14802f28-9957-4b25-974d-5f4e9d470254",
				"fkSysStaff": "b3081703-f493-11e8-b406-0050568e74b3",
				"id": "565c9cc1-2f31-4b34-af91-2c10c14c0538",
				"ndisplayorder": 6,
				"ndisplaystate": 1,
				"nexportstatus": 0,
				"nlocking": 0,
				"nupanddownlistlogo": 1,
				"ts": 1580883473000
				}, {
				"calignment": "center",
				"ccolumnname": "请求API接口",
				"ccolumnnumber": "capi",
				"cmodulenumber": "sysModQuery",
				"csortfields": "capi",
				"cstaffname": "自动",
				"cstaffwork": "sunny",
				"cwidth": "150",
				"fkSysModcol": "e2b4f9d9-2f4a-4e18-8cd7-fb8eebd429f2",
				"fkSysModshowplan": "14802f28-9957-4b25-974d-5f4e9d470254",
				"fkSysStaff": "b3081703-f493-11e8-b406-0050568e74b3",
				"id": "5e7c3a00-80ac-4e2a-9a6f-2569715d564b",
				"ndisplayorder": 7,
				"ndisplaystate": 1,
				"nexportstatus": 0,
				"nlocking": 0,
				"nupanddownlistlogo": 1,
				"ts": 1580883473000
				}, {
				"calignment": "center",
				"ccolumnname": "文本",
				"ccolumnnumber": "ctext",
				"cmodulenumber": "sysModQuery",
				"csortfields": "ctext",
				"cstaffname": "自动",
				"cstaffwork": "sunny",
				"cwidth": "150",
				"fkSysModcol": "bd3a2c8a-6666-42d7-b045-fe7015fd58c6",
				"fkSysModshowplan": "14802f28-9957-4b25-974d-5f4e9d470254",
				"fkSysStaff": "b3081703-f493-11e8-b406-0050568e74b3",
				"id": "69924f38-31aa-45b9-bfb4-64ebe87c780a",
				"ndisplayorder": 3,
				"ndisplaystate": 1,
				"nexportstatus": 0,
				"nlocking": 0,
				"nupanddownlistlogo": 1,
				"ts": 1580883473000
				}, {
				"calignment": "center",
				"ccolumnname": "checkbox",
				"ccolumnnumber": "",
				"cmodulenumber": "sysModQuery",
				"csortfields": "",
				"cstaffname": "自动",
				"cstaffwork": "sunny",
				"cwidth": "55",
				"fkSysModcol": "de6fa1a6-8888-4d90-add4-449ebac97eba",
				"fkSysModshowplan": "14802f28-9957-4b25-974d-5f4e9d470254",
				"fkSysStaff": "b3081703-f493-11e8-b406-0050568e74b3",
				"id": "9c48cdf0-34f8-4ae3-9156-f1e83ccc61c8",
				"ndisplayorder": 0,
				"ndisplaystate": 1,
				"nexportstatus": 0,
				"nlocking": 0,
				"nupanddownlistlogo": 1,
				"ts": 1580883473000
				}, {
				"calignment": "center",
				"ccolumnname": "排序",
				"ccolumnnumber": "ndisplayorder",
				"cmodulenumber": "sysModQuery",
				"csortfields": "ndisplayorder",
				"cstaffname": "自动",
				"cstaffwork": "sunny",
				"cwidth": "150",
				"fkSysModcol": "1f55375a-2cd7-11e8-873a-0050568e74b3",
				"fkSysModshowplan": "14802f28-9957-4b25-974d-5f4e9d470254",
				"fkSysStaff": "b3081703-f493-11e8-b406-0050568e74b3",
				"id": "c1ac1202-f38c-410b-8aff-79ebf09e80e1",
				"ndisplayorder": 9,
				"ndisplaystate": 1,
				"nexportstatus": 0,
				"nlocking": 0,
				"nupanddownlistlogo": 1,
				"ts": 1580883473000
				}, {
				"calignment": "center",
				"ccolumnname": "参数",
				"ccolumnnumber": "cparam",
				"cmodulenumber": "sysModQuery",
				"csortfields": "cparam",
				"cstaffname": "自动",
				"cstaffwork": "sunny",
				"cwidth": "150",
				"fkSysModcol": "9f5ad32c-0580-485e-bcd2-3ec85f457c71",
				"fkSysModshowplan": "14802f28-9957-4b25-974d-5f4e9d470254",
				"fkSysStaff": "b3081703-f493-11e8-b406-0050568e74b3",
				"id": "e4f883cc-32b1-4665-bc79-420e5c6cb5f1",
				"ndisplayorder": 8,
				"ndisplaystate": 1,
				"nexportstatus": 0,
				"nlocking": 0,
				"nupanddownlistlogo": 1,
				"ts": 1580883473000
			}],
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
		addBtnClick(){
			this.dialogVisible=true
		}
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
		}
	}
	.dialog{
		.el-form-item__label{
			width: 150px;
		}
		.el-input{
			width: 150px;
		}
	}
}
</style>