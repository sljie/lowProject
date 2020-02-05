<template>
<div class="projects">
	<el-form :model="formData" label-width="80px" class="form" ref="form">
		<el-row>
			<el-col :span="12">
				<el-form-item label="项目名称">
					<el-input v-model="formData.projectname" size='small'></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="开发人员">
					<el-input v-model="formData.developer" size='small'></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="12">
				<el-form-item label="创建时间">
					<el-date-picker size='small' v-model="formData.date" :editable="false"
					type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"
					></el-date-picker>
				</el-form-item>
			</el-col>
			<el-col :span="7">
				<el-form-item label="状态">
					<el-select v-model="formData.state" size="small" placeholder="请选择" :clearable="true">
						<el-option v-for="(value, key) in status" :key="value" :label="value" :value="key">
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="5">
				<el-form-item style="text-align:right;" label-width="0">
					<el-button type="primary" size="small" @click="onSearch">筛选</el-button>
					<el-button type="primary" size="small" @click="onlyLookMe">仅看我的</el-button>
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>
  <div class="table-p">
    <el-table v-loading="loading" size="small" :data="tableData" style="width: 100%">
      <el-table-column label="项目名称" property="projectname"></el-table-column>
      <el-table-column label="版本" property="version" :formatter="(row, column, cellValue) => 'v' + row.version"></el-table-column>
      <el-table-column label="开发人员">
				<template slot-scope="scope">
					<div class="tag">
						{{scope.row.developer | devFilter}}
					</div>
				</template>
			</el-table-column>
      <el-table-column label="状态" property="state">
				<template slot-scope="scope">
					<span :class="stateStyle(scope.row.state)">{{status[scope.row.state]}}</span>
				</template>
			</el-table-column>
      <el-table-column label="创建时间" property="createtime" :formatter="createTimeFormatter"></el-table-column>
      <el-table-column label="更新时间" property="updatetime" :formatter="updateTimeFormatter"></el-table-column>
      <el-table-column label="操作" width="300px;">
        <template slot-scope="scope">
					<div v-if="scope.row.ispermission === '1'">
						<el-button
							class="action-btn"
							size="mini"
							type="primary"
							v-if="scope.row.state === '7'"
							@click="submitPublish(scope.$index, scope.row)">发布</el-button>
						<el-button
							class="action-btn"
							size="mini"
							@click="toProjectDetail(scope.$index, scope.row)">查看</el-button>
						<el-button size="mini" type="warning"
							class="action-btn"
							@click="handleEdit(scope.$index, scope.row)">修改</el-button>
					</div>
					<el-button
						v-else
						class="action-btn"
						size="mini"
						@click="toProjectDetail(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <el-pagination
		:current-page="pageOption.pageNum"
		:page-size="pageOption.rows"
		@current-change="toPage"
    class="pagination"
    layout="total, prev, pager, next, jumper"
    :total="pageOption.total">
  </el-pagination>

	<project-modal
		:editData="projectModalOption.editData"
		@submit-ok="refreshData()"
		:isShow="projectModalOption.isShow"
		:title="projectModalOption.title"
		@before-close="closeProjectModal">
	</project-modal>

	<log-window
		:serverList="logWindowOption.serverList"
		:query="logWindowOption.query"
		:isShow="logWindowOption.isShow"
		@close="logWindowOption.isShow = false">
	</log-window>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import constants from '@/js/constants'
import * as types from '@/store/mutation-types'
import moment from 'moment'
import ProjectModal from '@/components/projects/projectModal'
import LogWindow from '@/components/commons/logWindow'

export default {
	components: {
		ProjectModal, LogWindow
	},
	data() {
		return {
			projectModalOption: {
				isShow: false,
				title: '创建项目'
			},
			loading: false,
			pageOption: {
				total: 0,
				pageNum: 1,
				rows: constants.PAGESIZE
			},
			logWindowOption: {
				isShow: false,
				query: null
			},
			formData: {
				projectname: '',
				developer: '',
				state: '',
				date: null
			},
			status: {
				'0': '研发中',
				'1': '待测试',
				'2': '测试中',
				'3': '待发布',
				'4': '测试不通过',
				'5': '已发布',
				'6': '已回滚',
				'7': '待审核发布',
				'8': '部署中',
				'9': '发布中',
				'10': '更新中',
				'11': '回滚中',
				'12': '测试环境部署中'
			},
			tableData: [],
			options: []
		}
	},
	computed: {
		...mapGetters(['user'])
	},
	filters: {
		devFilter: function(dev) {
			if (dev) {
				return dev.split(',').join(' ')
			} else {
				return ''
			}
		}
	},
	mounted() {
		var _self = this
		if (this.user !== null) {
				_self.projectList()
		} else {
			eBus.register(constants.PROJECTS, function(data) {
				switch (data.mutationType) {
					case types.LOGIN:
						_self.projectList()
						break
				}
			})
		}
	},
	methods: {
		refreshData() {
			this.closeProjectModal()
			this.pageOption.pageNum = 1
			this.projectList()
		},
		projectList() {
			if (this.loading) return
			this.loading = true
			var data = this.packSearchData()
			axios({
				url: '/PublishPlatform/projectManage/queryBycondition',
				method: 'post',
				params: {
					page: this.pageOption.pageNum,
					rows: this.pageOption.rows,
				},
				data
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
		submitPublish(index, row) {

			if (row.state === '9') { //发布中
				this.logWindowOption = {
					isShow: true,
					serverList: this.buildServerList(row),
					query: this.logQuery(row)
				}
			} else if (!row.proenvironment) {
				this.$message.warning('尚未配置生产环境地址')
			} else {
				this.logWindowOption = {
					isShow: true,
					serverList: this.buildServerList(row),
					query: this.logQuery(row)
				}
				this.publish(row)
			}
		},
		buildServerList(row) {
			var hosts = row.proenvironment.split(',')
			var logHostList = []
			hosts.forEach(host => {
				logHostList.push({ host, checkStatus: 2 })
			})
			return logHostList
		},
		publish(row) {
			var data = this.packFormData(row)
			var preState = row.state
			row.state = '9' //发布中
			data.append('sign', constants.SIGN_CODE_5) // 发布
			var hosts = row.proenvironment.split(',')
			var start = (index) => {
				var everyProurl = ''
				console.warn('-----',hosts[index], index,'-----')
				if (index == hosts.length - 1) {
					everyProurl = hosts[index] + ':last'
				} else {
					if (hosts[index]) {
						everyProurl = hosts[index]
					}
				}
				axios.post('/PublishPlatform/projectManage/addDeprecordOrUpdate?everyProurl=' + everyProurl, data).then(res => {
					if (res.success) {
						this.logWindowOption.serverList[index].checkStatus = 1
						if (index == hosts.length - 1) {
							this.logWindowOption.isShow = false
							this.$notify.success({
	          		title: '发布完成',
	          		message:  `项目名称：${row.projectname}`
	        		})
							this.projectList()
						} else {
							index ++
							start(index)
						}
					} else {
						row.state = preState
						this.logWindowOption.serverList[index].checkStatus = 0
						this.logWindowOption.query = null
						if (index < hosts.length - 1) {
							for (var i = index + 1; i < hosts.length; i++) {
								this.logWindowOption.serverList[i].checkStatus = 3
							}
						}
					}
				})
				.catch( error => {
					console.error(error)
					this.$message.error('系统错误')
					row.state = preState
					this.logWindowOption.serverList[index].checkStatus = 0
					this.logWindowOption.query = null
					if (index < hosts.length - 1) {
						for (var i = index + 1; i < hosts.length; i++) {
							this.logWindowOption.serverList[i].checkStatus = 3
						}
					}
				})
			}
			start(0)
		},
		handleEdit(index, row) {
			this.projectModalOption = {
				isShow: true,
				title: '编辑项目',
				editData: row
			}
		},
		openDelModal(row) {
			this.delDialogShow = true
			this.delItem = row
		},
		packFormData(row) {
			var data = new FormData()
			data.append('state', row.state)
			data.append('giturl', row.giturl)
			data.append('warpath', row.warpath)
			data.append('devenvironment', row.devenvironment)
			data.append('testenvironment', row.testenvironment)
			data.append('proenvironment', row.proenvironment)
			data.append('developer', row.developer)
			data.append('tester', row.tester)
			data.append('operation', row.operation)
			data.append('projectname', row.projectname)
			data.append('id', row.id)
			data.append('version', row.version)
			return data
		},
 		logQuery(row) {
			return function(cb) {
				var data = new FormData()
				data.append('id', row.id)
				axios.post('/PublishPlatform/projectManage/logshow',data).then(res => {
					if (res.success) {
						cb(res.data)
					}
				})
			}
		},
		closeProjectModal() {
			this.projectModalOption.isShow= false
		},
		toPage(pageNum) {
			this.pageOption.pageNum = pageNum
			this.projectList()
		},
		toProjectDetail(index, row) {
			this.$router.push({
				name: 'projectDetail',
				query: {
					projectId: row.id
				}
			})
		},
		createTimeFormatter(row, column, cellValue) {
			cellValue = moment(new Date(row.createtime)).format('YYYY-MM-DD HH:mm')
			return cellValue
		},
		updateTimeFormatter(row, column, cellValue) {
			cellValue = moment(new Date(row.updatetime)).format('YYYY-MM-DD HH:mm')
			return cellValue
		},
		stateStyle(state) {
			if (state === '0') {
				return 'state-blue'
			} else if(state === '1' || state === '3') {
				return 'state-orange'
			} else if(state === '2') {
				return 'state-purple'
			} else if(state === '5') {
				return 'state-green'
			} else if(state === '4' || state === '6') {
				return 'state-red'
			} else {
				return ''
			}
		},
		packSearchData() {
			const data = new FormData();
			var result = {
				operation: this.formData.operation ? this.formData.operation : '',
				projectname: this.formData.projectname,
				developer: this.formData.developer,
				state: this.formData.state,
				starttime:  this.formData.date ? this.formData.date[0].getTime() : '',
				endtime:  this.formData.date ? this.formData.date[1].getTime() : ''
			}
			for (var key in result) {
				if (result.hasOwnProperty(key)) {
					data.append(key, result[key])
				}
			}
			return data
		},
		onSearch() {
			this.formData.operation = ''
			this.pageOption.pageNum = 1
			this.projectList()
		},
		onlyLookMe() {
			this.$refs.form.resetFields()
			this.formData = {
				operation: this.user.nickname,
				projectname: '',
				developer: '',
				state: '',
				date: null
			}
			this.pageOption.pageNum = 1
			this.projectList()
		}
	},
	beforeDestroy() {
		eBus.unregister(constants.PROJECTS)
	}
}
</script>

<style lang="scss" scoped>
.projects {}

.form {
  padding: 15px;
  background: white;
  margin-bottom: 10px;
}

.tag {
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}

.table-p {
  background: white;
  padding: 15px;
	.func-btns {
		padding-bottom: 10px;
	}
}
.pagination {
  background: white;
  // padding-top: 20px;
  // padding-bottom: 20px;
  padding-bottom: 15px;
  text-align: right;
	padding-right: 15px;
}
.state-blue {
	color: #689BFC;
}
.state-orange {
	color: #FECB2F;
}
.state-purple {
	color:#851D85;
}
.state-green {
	color: #8ED55D;
}
.state-red {
	color: #FC0D1B;
}
.action-btn {
	margin-bottom: 10px;
}
.el-button {
	margin-left: 0;
	margin-right: 5px;
}
</style>
