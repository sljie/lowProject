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
					type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
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
      <el-table-column label="版本" width="150px;">
				<template slot-scope="scope">
					<div class="version">
						{{scope.row | versionFilter}}
						<span class="new-tag" v-if="hasNewVersion(scope.row)">有新版本 {{'v' + scope.row.version}}</span>
					</div>
				</template>
			</el-table-column>
      <el-table-column label="开发人员">
				<template slot-scope="scope">
					<div class="tag">
						{{scope.row.developer | devFilter}}
					</div>
				</template>
			</el-table-column>
      <el-table-column label="状态" property="state">
				<template slot-scope="scope">
					<span :class="stateStyle(scope.row)">{{ scope.row | stateFilter(status)}}</span>
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
							v-if="hasTestBtn(scope.row)"
							@click="startTest(scope.$index, scope.row)">测试</el-button>
						<el-button
							class="action-btn"
							size="mini"
							type="primary"
							v-if="hasNewVersion(scope.row)"
							@click="handleUpdate(scope.row)">更新</el-button>
						<el-button
							class="action-btn"
							size="mini"
							@click="toProjectDetail(scope.$index, scope.row)">查看</el-button>
						<el-button
							class="action-btn"
							size="mini"
							type="success"
							v-if="scope.row.istestnow === '1'"
							@click="handlePass(scope.row, true)">通过</el-button>
						<el-button
							class="action-btn"
							size="mini"
							type="danger"
							v-if="scope.row.istestnow === '1'"
							@click="handlePass(scope.row, false)">不通过</el-button>
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

	<log-window
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
import LogWindow from '@/components/commons/logWindow'

export default {
	components: {
		LogWindow
	},
	data() {
		return {
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
		},
		stateFilter: function(row, status) {
			if(row.state === '10') { // 更新中
				return '更新中'
			}
			return row.istestnow === '1' ? '测试中' : status[row.state]
		},
		versionFilter(row) {
			if (row.istestnow === '1') {
				return  'v' + row.testversion
			} else {
				if (row.state !== '2') {  //测试中
					return 'v' + row.version
				}else if (row.testversion) {
					 return row.version > row.testversion ? ('v' + row.testversion): ('v' + row.version)
				} else {
					 return 'v' + row.version
				}
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
		hasNewVersion(row) {
			 return row.istestnow === '1' && row.state === '1' && row.testversion && row.testversion < row.version
		},
		hasTestBtn(row) {
			// 1 待测试
			 return row.state === '1' && (row.istestnow === null || row.istestnow === '0')
		},
		refreshData() {
			this.closeProjectModal()
			this.pageOption.pageNum = 1
			this.projectList()
		},
		projectList() {
			if (this.loading) {
				return
			}
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
		openDelModal(row) {
			this.delDialogShow = true
			this.delItem = row
		},
		startTest(index, row) {
			if(!row.testenvironment) {
				this.$message.warning('尚未配置测试环境地址')
			} else {
				var data = this.packFormData(row)
				var preState = row.state
				row.state = '2'
				data.append('sign', constants.SIGN_CODE_2) // 测试信号
				axios.post('/PublishPlatform/projectManage/addDeprecordOrUpdate', data).then(res => {
					if (res.success) {
						this.logWindowOption = { isShow: false }
						this.$notify.success({
          		title: '测试环境部署完成',
          		message:  `项目名称：${row.projectname}`
        		})
						this.projectList()
					} else {
						row.state = preState
						this.$message.error(res.msg)
					}
				})
				this.logWindowOption = {
					isShow: true,
					query: this.logQuery(row)
				}
			}
		},
		handleUpdate(row) {
			if(!row.testenvironment) {
				this.$message.warning('尚未配置测试环境地址')
			} else {
				var data = this.packFormData(row)
				var preState = row.state
				row.state = '10' // 更新中
				data.append('sign', constants.SIGN_CODE_9) // 更新信号
				axios.post('/PublishPlatform/projectManage/addDeprecordOrUpdate', data).then(res => {
					if (res.success) {
						this.logWindowOption = { isShow: false }
						this.$notify.success({
          		title: '更新测试环境部署完成',
          		message:  `项目名称：${row.projectname}`
        		})
						row.state = '2' // 测试中
						row.testversion = row.version
					} else {
						row.state = preState
						this.$message.error(res.msg)
					}
				})
				this.logWindowOption = {
					isShow: true,
					query: this.logQuery(row)
				}
			}
		},
		handlePass(row, isPass) {
			var data = this.packFormData(row)
			isPass ?
				data.append('sign', constants.SIGN_CODE_3): // 通过
				data.append('sign', constants.SIGN_CODE_4) // 不通过
			axios.post('/PublishPlatform/projectManage/addDeprecordOrUpdate', data).then(res => {
				if (res.success) {
					if (isPass) {
						this.$message.success('已通过')
					} else {
						this.$message.success('处理成功')
					}
					this.projectList()
				} else {
					this.$message.error(res.msg)
				}
			})
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
			var testversion = row.testversion ? row.testversion : ''
			data.append('testversion', testversion)
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
		stateStyle(row) {
			var state = row.state
			if (row.istestnow === '1') {
				return 'state-purple'
			} else {
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
			}
		},
		packSearchData() {
			const data = new FormData();
			var result = {
				tester: this.formData.tester ? this.formData.tester : '',
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
			this.formData.tester = ''
			this.pageOption.pageNum = 1;
			this.projectList()
		},
		onlyLookMe() {
			this.$refs.form.resetFields()
			this.formData = {
				tester: this.user.nickname,
				projectname: '',
				developer: '',
				state: '',
				date: null
			}
			console.log(this.formData)
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
.version {
	position: relative;
}
.new-tag {
	margin-left: 15px;
	display: inline-block;
	height: 20px;
	border-top-right-radius:3px;
	border-bottom-right-radius:3px;
	line-height: 20px;
	background: red;
	padding-left: 4px;
	padding-right: 8px;
	color: white;
	position: relative;
	font-size: 12px;
	&:before {
		content: '';
		display: block;
		width: 0;
 		height: 0;
		position: absolute;
		top: 0;
		left: -13px;
 		border-top: 10px solid transparent;
 		border-right: 13px solid red;
 		border-bottom: 10px solid transparent;
	}
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
