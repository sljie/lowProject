<template>
<div class="projectDetail">
	<el-breadcrumb separator="/" style="margin-bottom: 20px;">
		<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		<el-breadcrumb-item :to="{ path: '/' }">项目列表</el-breadcrumb-item>
		<el-breadcrumb-item >项目详情</el-breadcrumb-item>
	</el-breadcrumb>
	<div class="item">
		<fieldset>
			<legend>项目详情</legend>
			<div class="content">
				<el-row>
					<el-col :span="8">项目名称：{{project.projectname}}</el-col>
					<el-col :span="8">创建时间：{{project.createtime | timeFilter}}</el-col>
					<el-col :span="8">开发环境地址：{{project.devenvironment}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">当前版本：v{{project.version}}</el-col>
					<el-col :span="8">更新时间：{{project.updatetime | timeFilter}}</el-col>
					<el-col :span="8">测试环境地址：{{project.testenvironment}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">开发人员：{{project.developer | personFilter}}</el-col>
					<el-col :span="8">Git 地址：{{project.giturl}}</el-col>
					<el-col :span="8">生产环境地址：{{project.proenvironment}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">测试人员：{{project.tester | personFilter}}</el-col>
					<el-col :span="16">war包地址：{{project.warpath}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">运维人员：{{project.operation}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">当前状态：<span :class="stateStyle(project.state)">{{status[project.state]}}</span></el-col>
				</el-row>
			</div>
		</fieldset>
	</div>
	<div class="item">
		<fieldset>
			<legend>部署记录</legend>
			<div class="content">
        <el-table :data="publishHistories" style="width: 100%">
					<el-table-column prop="version" label="版本"></el-table-column>
					<el-table-column prop="operator" label="操作者"></el-table-column>
					<el-table-column prop="deploycomment" label="部署备注"></el-table-column>
					<el-table-column prop="deploytime" label="部署时间" :formatter="deployTimeFormatter"></el-table-column>
					<el-table-column prop="deployenvironment" label="部署环境" :formatter="deployFormatter"></el-table-column>
					<el-table-column prop="state" label="版本状态"></el-table-column>
				</el-table>
			</div>
		</fieldset>
	</div>

	<div class="item">
		<fieldset>
			<legend>修改记录</legend>
			<div class="content">
				<el-table :data="motifyHistories" style="width: 100%">
					<el-table-column prop="opeartioncontent" label="修改项"></el-table-column>
					<el-table-column prop="oldvalue" label="旧值"></el-table-column>
					<el-table-column prop="newvalue" label="新值"></el-table-column>
					<el-table-column prop="operationname" label="操作人"></el-table-column>
					<el-table-column prop="operationtime" label="修改时间" :formatter="operationFormatter"></el-table-column>
				</el-table>
			</div>
		</fieldset>
	</div>
</div>
</template>

<script>
import moment from 'moment'
export default {
	data() {
		return {
			projectId: null,
			project: {},
			motifyHistories: [],
			publishHistories: [],
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
        '11': '回滚中'
			},
		}
	},
	filters: {
		timeFilter(time) {
			return moment(new Date(time)).format('YYYY-MM-DD HH:mm')
		},
		personFilter: function(dev) {
			if (dev) {
				return dev.split(',').join(' ')
			} else {
				return ''
			}
		}
	},
	mounted() {
		this.projectId = this.$route.query.projectId
		if (typeof this.projectId !== 'undefined') {
			this.getProject()
			this.getPublishHistory()
			this.getMotifyHistory()
		}
	},
	methods: {
		getProject() {
			var data = new FormData()
			data.append('id', this.projectId)
			axios({
				url: '/PublishPlatform/projectManage/queryBycondition',
				method: 'post',
				data
			}).then(res => {
				if (res.success) {
					if (res.data.list.length > 0) {
						this.project = res.data.list[0]
					}
				}
			}).catch(error => {})
		},
		getPublishHistory() {
			var data = new FormData()
			data.append('id', this.projectId)
			axios({
				url: '/PublishPlatform/projectManage/deprecordshow',
				method: 'post',
				data
			}).then(res => {
				if (res.success) {
					this.publishHistories = res.data
				}
			}).catch(error => {})
		},
		getMotifyHistory() {
			var data = new FormData()
			data.append('id', this.projectId)
			axios({
				url: '/PublishPlatform/projectManage/updatelogshow',
				method: 'post',
				data
			}).then(res => {
				if (res.success) {
					this.motifyHistories = res.data
				}
			}).catch(error => {})
		},
		stateStyle(state) {
			if (state === '0') {
				return 'state-blue'
			} else if (state === '1' || state === '3') {
				return 'state-orange'
			} else if (state === '2') {
				return 'state-purple'
			} else if (state === '5') {
				return 'state-green'
			} else if (state === '4' || state === '6') {
				return 'state-red'
			} else {
				return ''
			}
		},
    operationFormatter(row, column, cellValue) {
      cellValue = moment(new Date(row.operationtime)).format('YYYY-MM-DD HH:mm')
      return cellValue
    },
    deployTimeFormatter(row, column, cellValue) {
      cellValue = moment(new Date(row.deploytime)).format('YYYY-MM-DD HH:mm')
      return cellValue
    },
    deployFormatter(row, column, cellValue) {
      switch (row.deployenvironment) {
        case '1':
          return '开发环境'
        case '2':
          return '测试环境'
        default:
          return row.deployenvironment
      }
    }
	}
}
</script>

<style lang="scss" scoped>
.projectDetail {

}
.item {
	background: white;
    padding: 15px;
    .content {
        padding: 5px;
    }
}

.el-row {
		word-wrap: break-word;
    margin-bottom: 20px;
    font-size: 14px;
}

legend {
    font-weight: bold;
}

.state-blue {
    color: #689BFC;
}
.state-orange {
    color: #FECB2F;
}
.state-purple {
    color: #851D85;
}
.state-green {
    color: #8ED55D;
}
.state-red {
    color: #FC0D1B;
}
</style>
