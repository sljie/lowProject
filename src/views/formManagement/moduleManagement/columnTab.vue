<template>
  <div class="columnTab">
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
				<el-form-item label="列编号:" required>
					<el-input v-model="form.name" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="列名:" required>
					<el-input v-model="form.name" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="列宽:" required>
					<el-input v-model="form.name" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="排序字段:" required>
					<el-input v-model="form.name" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="显示顺序:" required>
					<el-input v-model="form.name" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="是否导出列:" required>
					<el-select size="mini" v-model="form.region">
						<el-option label="1" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="对齐方式:" required>
					<el-select size="mini" v-model="form.region">
						<el-option label="1" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="左右列表标志:" required>
					<el-select size="mini" v-model="form.region">
						<el-option label="1" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="是否权限认证:" required>
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
	name: 'columnTab',
  data() {
		return{
			tableData:[],
			tableHeader: [{
				"calignment":"center",
				"ccolumnname":"对应实体类的名字",
				"ccolumnnumber":"cclassname",
				"cmodulenumber":"SYSMODCOL",
				"csortfields":"cclassname",
				"cstaffname":"自动",
				"cstaffwork":"sunny",
				"cwidth":"150",
				"fkSysModcol":"9a8f5bd3-6800-4615-95bb-5a6d694f41a1",
				"fkSysModshowplan":"4f45a75f-b239-4787-81f7-e6bb821f4044",
				"fkSysStaff":"d7e2c852-17f6-11ea-b617-00505687a749",
				"id":"0f889c24-4d0e-480a-87ef-d79781fcac06",
				"ndisplayorder":10,
				"ndisplaystate":1,
				"nexportstatus":0,
				"nlocking":0,
				"nupanddownlistlogo":1,
				"ts":1576028834000
				},{
				"calignment":"center",
				"ccolumnname":"列编号",
				"ccolumnnumber":"ccolumnnumber",
				"cmodulenumber":"SYSMODCOL",
				"csortfields":"ccolumnnumber",
				"cstaffname":"自动",
				"cstaffwork":"sunny",
				"cwidth":"150",
				"fkSysModcol":"88a5452e-b403-4989-8d36-98425c050dc2",
				"fkSysModshowplan":"4f45a75f-b239-4787-81f7-e6bb821f4044",
				"fkSysStaff":"d7e2c852-17f6-11ea-b617-00505687a749",
				"id":"150f7921-bd2d-4c42-9d08-1506303512cf",
				"ndisplayorder":2,
				"ndisplaystate":1,
				"nexportstatus":0,
				"nlocking":0,
				"nupanddownlistlogo":1,
				"ts":1576028835000
        },{
				"calignment":"center",
				"ccolumnname":"靠左，居中，靠右",
				"ccolumnnumber":"calignment",
				"cmodulenumber":"SYSMODCOL",
				"csortfields":"calignment",
				"cstaffname":"自动",
				"cstaffwork":"sunny",
				"cwidth":"150",
				"fkSysModcol":"5d70ebce-399d-4e0d-b4e5-0b343e749f3a",
				"fkSysModshowplan":"4f45a75f-b239-4787-81f7-e6bb821f4044",
				"fkSysStaff":"d7e2c852-17f6-11ea-b617-00505687a749",
				"id":"2d6c939b-2d84-405a-8281-1cb486d9b754",
				"ndisplayorder":8,
				"ndisplaystate":1,
				"nexportstatus":0,
				"nlocking":0,
				"nupanddownlistlogo":1,
				"ts":1576028834000
        },{
				"calignment":"center",
				"ccolumnname":"是否导出列（0：是；1：否）",
				"ccolumnnumber":"nexportstatus",
				"cmodulenumber":"SYSMODCOL",
				"csortfields":"nexportstatus",
				"cstaffname":"自动",
				"cstaffwork":"sunny",
				"cwidth":"150",
				"fkSysModcol":"e882caff-b6f8-46e0-b388-f2c709cf53b6",
				"fkSysModshowplan":"4f45a75f-b239-4787-81f7-e6bb821f4044",
				"fkSysStaff":"d7e2c852-17f6-11ea-b617-00505687a749",
				"id":"33e6ae5d-3979-4dee-ad7b-786b3fbf5af3",
				"ndisplayorder":7,
				"ndisplaystate":1,
				"nexportstatus":0,
				"nlocking":0,
				"nupanddownlistlogo":1,
				"ts":1576028835000
        },{
				"calignment":"center",
				"ccolumnname":"登记人名称",
				"ccolumnnumber":"cstaffname",
				"cmodulenumber":"SYSMODCOL",
				"csortfields":"cstaffname",
				"cstaffname":"自动",
				"cstaffwork":"sunny",
				"cwidth":"150",
				"fkSysModcol":"9545e99c-8719-482a-9b8f-23293db46fb5",
				"fkSysModshowplan":"4f45a75f-b239-4787-81f7-e6bb821f4044",
				"fkSysStaff":"d7e2c852-17f6-11ea-b617-00505687a749",
				"id":"3f92e130-a9ff-4d89-9303-761f07edae58",
				"ndisplayorder":12,
				"ndisplaystate":1,
				"nexportstatus":0,
				"nlocking":0,
				"nupanddownlistlogo":1,
				"ts":1576028835000
        },{
				"calignment":"center",
				"ccolumnname":"是否权限认证，默认0不认证",
				"ccolumnnumber":"nauth",
				"cmodulenumber":"SYSMODCOL",
				"csortfields":"nauth",
				"cstaffname":"自动",
				"cstaffwork":"sunny",
				"cwidth":"150",
				"fkSysModcol":"5a9be226-c53d-466d-890a-c1efb70c537a",
				"fkSysModshowplan":"4f45a75f-b239-4787-81f7-e6bb821f4044",
				"fkSysStaff":"d7e2c852-17f6-11ea-b617-00505687a749",
				"id":"50f5eab9-8737-4677-9d3e-10f7eda58c97",
				"ndisplayorder":11,
				"ndisplaystate":1,
				"nexportstatus":0,
				"nlocking":0,
				"nupanddownlistlogo":1,
				"ts":1576028835000
        },{
				"calignment":"center",
				"ccolumnname":"上下列表标志(1上2下)",
				"ccolumnnumber":"nupanddownlistlogo",
				"cmodulenumber":"SYSMODCOL",
				"csortfields":"nupanddownlistlogo",
				"cstaffname":"自动",
				"cstaffwork":"sunny",
				"cwidth":"150",
				"fkSysModcol":"d126f074-bc08-43ab-ad9c-bcb49e59bf79",
				"fkSysModshowplan":"4f45a75f-b239-4787-81f7-e6bb821f4044",
				"fkSysStaff":"d7e2c852-17f6-11ea-b617-00505687a749",
				"id":"68e8c437-7db0-4f30-8347-2ea2697c3eb0",
				"ndisplayorder":9,
				"ndisplaystate":1,
				"nexportstatus":0,
				"nlocking":0,
				"nupanddownlistlogo":1,
				"ts":1576028835000
        },{
				"calignment":"center",
				"ccolumnname":"宽度",
				"ccolumnnumber":"cwidth",
				"cmodulenumber":"SYSMODCOL",
				"csortfields":"cwidth",
				"cstaffname":"自动",
				"cstaffwork":"sunny",
				"cwidth":"150",
				"fkSysModcol":"17779775-bb85-47c1-ba05-1f12c9221ae3",
				"fkSysModshowplan":"4f45a75f-b239-4787-81f7-e6bb821f4044",
				"fkSysStaff":"d7e2c852-17f6-11ea-b617-00505687a749",
				"id":"6e317147-0c1c-4603-b9b5-aeaf75aa9c65",
				"ndisplayorder":4,
				"ndisplaystate":1,
				"nexportstatus":0,
				"nlocking":0,
				"nupanddownlistlogo":1,
				"ts":1576028835000
				},{
				"calignment":"center",
				"ccolumnname":"列名",
				"ccolumnnumber":"ccolumnname",
				"cmodulenumber":"SYSMODCOL",
				"csortfields":"ccolumnname",
				"cstaffname":"自动",
				"cstaffwork":"sunny",
				"cwidth":"150",
				"fkSysModcol":"17e9ee1c-54be-4bf6-a77e-00eea51a7a62",
				"fkSysModshowplan":"4f45a75f-b239-4787-81f7-e6bb821f4044",
				"fkSysStaff":"d7e2c852-17f6-11ea-b617-00505687a749",
				"id":"8ee91592-5afa-4a40-8a24-08ed56b94589",
				"ndisplayorder":3,
				"ndisplaystate":1,
				"nexportstatus":0,
				"nlocking":0,
				"nupanddownlistlogo":1,
				"ts":1576028835000
        },{
				"calignment":"center",
				"ccolumnname":"状态",
				"ccolumnnumber":"nmanagestatus",
				"cmodulenumber":"SYSMODCOL",
				"csortfields":"nmanagestatus",
				"cstaffname":"自动",
				"cstaffwork":"sunny",
				"cwidth":"150",
				"fkSysModcol":"b624ce27-cb66-11e8-b406-0050568e74b3",
				"fkSysModshowplan":"4f45a75f-b239-4787-81f7-e6bb821f4044",
				"fkSysStaff":"d7e2c852-17f6-11ea-b617-00505687a749",
				"id":"a2cf6fcb-c309-4dba-8f6d-fbe328743f88",
				"ndisplayorder":4,
				"ndisplaystate":1,
				"nexportstatus":0,
				"nlocking":0,
				"nupanddownlistlogo":1,
				"ts":1576028835000
        },{
				"calignment":"center",
				"ccolumnname":"显示顺序",
				"ccolumnnumber":"ndisplayorder",
				"cmodulenumber":"SYSMODCOL",
				"csortfields":"ndisplayorder",
				"cstaffname":"自动",
				"cstaffwork":"sunny",
				"cwidth":"150",
				"fkSysModcol":"1ed628d2-9eeb-4187-a1ad-d7b6ea732587",
				"fkSysModshowplan":"4f45a75f-b239-4787-81f7-e6bb821f4044",
				"fkSysStaff":"d7e2c852-17f6-11ea-b617-00505687a749",
				"id":"b74dd977-472c-4bb4-94a8-521c49bdbc83",
				"ndisplayorder":6,
				"ndisplaystate":1,
				"nexportstatus":0,
				"nlocking":0,
				"nupanddownlistlogo":1,
        "ts":1576028835000
        },{
				"calignment":"center",
				"ccolumnname":"模块编号",
				"ccolumnnumber":"cmodulenumber",
				"cmodulenumber":"SYSMODCOL",
				"csortfields":"cmodulenumber",
				"cstaffname":"自动",
				"cstaffwork":"sunny",
				"cwidth":"150",
				"fkSysModcol":"434c0864-bb31-40c6-b6f8-44fd04466557",
				"fkSysModshowplan":"4f45a75f-b239-4787-81f7-e6bb821f4044",
				"fkSysStaff":"d7e2c852-17f6-11ea-b617-00505687a749",
				"id":"d7fd5965-54e3-4544-80dc-ea26f67c93ac",
				"ndisplayorder":1,
				"ndisplaystate":1,
				"nexportstatus":0,
				"nlocking":0,
				"nupanddownlistlogo":1,
				"ts":1576028835000
        },{
				"calignment":"center",
				"ccolumnname":"checkbox",
				"ccolumnnumber":"",
				"cmodulenumber":"SYSMODCOL",
				"csortfields":"",
				"cstaffname":"自动",
				"cstaffwork":"sunny",
				"cwidth":"55",
				"fkSysModcol":"afbb0a0d-4436-4b30-9786-63eaf5f1c7a0",
				"fkSysModshowplan":"4f45a75f-b239-4787-81f7-e6bb821f4044",
				"fkSysStaff":"d7e2c852-17f6-11ea-b617-00505687a749",
				"id":"e8ca8ebf-725e-43fb-8dc3-b79272d448d7",
				"ndisplayorder":0,
				"ndisplaystate":1,
				"nexportstatus":0,
				"nlocking":0,
				"nupanddownlistlogo":1,
				"ts":1576028834000
				}, {
				"calignment":"center",
				"ccolumnname":"排序字段",
				"ccolumnnumber":"csortfields",
				"cmodulenumber":"SYSMODCOL",
				"csortfields":"csortfields",
				"cstaffname":"自动",
				"cstaffwork":"sunny",
				"cwidth":"150",
				"fkSysModcol":"08359c3f-988c-4d18-a2d5-0c93ccb84154",
				"fkSysModshowplan":"4f45a75f-b239-4787-81f7-e6bb821f4044",
				"fkSysStaff":"d7e2c852-17f6-11ea-b617-00505687a749",
				"id":"e97cc1ee-0d40-45eb-8568-df2f14b57cf8",
				"ndisplayorder":5,
				"ndisplaystate":1,
				"nexportstatus":0,
				"nlocking":0,
				"nupanddownlistlogo":1,
				"ts":1576028835000
      }],
			total: 0,
			dialogTitle:'查询列项-新增',
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
.columnTab{
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