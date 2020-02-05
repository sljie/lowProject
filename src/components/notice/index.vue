<template>
<div class="notice">
	<el-breadcrumb separator="/" style="margin-bottom: 20px;">
		<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		<el-breadcrumb-item>公告管理</el-breadcrumb-item>
	</el-breadcrumb>
	<div class="common-panel">
		<el-button type="primary" size="small" @click="addNotice()">添加公告</el-button>
		<el-table :data="tableData" style="width: 100%" size="small" v-loading="loading">
			<el-table-column prop="content" label="内容"></el-table-column>
			<el-table-column prop="createtime" label="创建时间" :formatter="createtimeFormatter"></el-table-column>
			<el-table-column prop="updatetime" label="更新时间" :formatter="updatetimeFormatter"></el-table-column>
			<el-table-column prop="addname" label="发布人"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button v-if="scope.row.ispermission === '1'" type="warning" size="small" @click="editNotice(scope.row)">修改</el-button>
					<el-button v-if="scope.row.ispermission === '1'" type="danger" size="small" @click="deleteConfirm(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>

	<el-pagination
  :current-page="pageOption.pageNum"
  :page-size="pageOption.rows"
  @current-change="toPage"
  class="pagination"
  layout="total, prev, pager, next, jumper" :total="pageOption.total">
	</el-pagination>

  <el-dialog
    title="删除提示"
    :visible.sync="deleteDialogShow"
    width="30%">
    <span>确认删除该公告？</span>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="deleteDialogShow = false">取 消</el-button>
      <el-button size="small" type="danger" @click="deleteNotice()">删除</el-button>
    </span>
  </el-dialog>

	<notice-modal
	:title="modalOption.title"
	@submit-ok="submitOk()"
	:isShow="modalOption.isShow"
	@before-close="modalOption.isShow = false"
	:editData="modalOption.editData"> </notice-modal>
</div>
</template>
<script>
import NoticeModal from './modal'
import constants from '@/js/constants'
import * as types from '@/store/mutation-types'
import moment from 'moment'
export default {
	components: {
		NoticeModal
	},
	data() {
		return {
			tableData: [],
			loading: false,
			modalOption: {
				isShow: false
			},
      deleteDialogShow: false,
      deleteItem: null,
			pageOption: {
				total: 0,
				pageNum: 1,
				rows: constants.PAGESIZE
			},
		}
	},
	mounted() {
		this.noticeList()
	},
	methods: {
		refreshData() {
			this.modalOption.isShow = false
			this.pageOption.pageNum = 1
			this.noticeList()
		},
		submitOk() {
			eBus.send(constants.HEADER, { mutationType: types.NOTICES }) // 通知 跑马灯刷新
			this.refreshData()
		},
		noticeList() {
			if (this.loading) {
				return
			}
			this.loading = true
			axios({
				url: '/PublishPlatform/projectManage/messageshow',
				method: 'post',
				params: {
					page: this.pageOption.pageNum,
					rows: this.pageOption.rows,
				}
			}).then(res => {
				this.loading = false
				if (res.success) {
					this.tableData = res.data.list
					this.pageOption.total = res.data.total
				}
			}).catch(error => {
				this.loading = false
			})
		},
		addNotice() {
			this.modalOption = {
				isShow: true,
				title: '添加公告'
			}
		},
		editNotice(item) {
			this.modalOption = {
				isShow: true,
				title: '编辑公告',
				editData: item
			}
		},
    deleteConfirm(item) {
      this.deleteItem = item
      this.deleteDialogShow = true
    },
		deleteNotice() {
			var data = new FormData()
			data.append('id', this.deleteItem.id)
			axios({
				url: '/PublishPlatform/projectManage/messagedelete',
				method: 'post',
				data
			}).then(res => {
				if (res.success) {
					this.$message({
						message:  '删除成功',
						type: 'success'
					})

					eBus.send(constants.HEADER, { mutationType: types.NOTICES }) // 通知 跑马灯刷新
					this.refreshData()
				} else {
					this.$message.error(res.msg)
				}
			}).catch(error => {
				this.$message.error('删除失败')
			})
			this.deleteDialogShow = false
		},
		createtimeFormatter(row, column, cellValue) {
			cellValue = moment(new Date(row.createtime)).format('YYYY-MM-DD HH:mm')
			return cellValue
		},
		updatetimeFormatter(row, column, cellValue) {
			cellValue = moment(new Date(row.updatetime)).format('YYYY-MM-DD HH:mm')
			return cellValue
		},
		toPage(pageNum) {
			this.pageOption.pageNum = pageNum
			this.noticeList()
		},
	}
}
</script>

<style lang="scss" scoped>
.notice {}
.pagination {
    background: white;
    // padding-top: 20px;
    // padding-bottom: 20px;
    padding-bottom: 15px;
    text-align: right;
    padding-right: 15px;
}
</style>
