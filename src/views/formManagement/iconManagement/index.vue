<template>
  <div class="iconManagement">
	<!-- 模块名 -->
	<div class="view-header">
		 <div class="title">图标管理</div>
	</div>
	<div class="main">
		<el-tabs v-model="tabActiveName" >
    <el-tab-pane v-for="(tab,index) in tabList" :key="index" :label="tab.label" :name="tab.index">
			<div class="iconContainer">
				<div v-for="(icon,index) in iconList" :key="index" style="display:inline-block;">
					<el-popover
						placement="right"
						trigger="hover">
						<div>
							<span>图标名：{{icon}}</span>
							<br>
							<el-button size="mini" type="primary" style="padding: 5px 8px;">编辑</el-button>
							<el-button size="mini" type="danger" style="padding: 5px 8px;">删除</el-button>
						</div>
						<div slot="reference" class="iconbox">
							<i :class="icon"></i>
						</div>
					</el-popover>
				</div>
				
				
			</div>
		</el-tab-pane>
  </el-tabs>
	</div>
	
  </div>
</template>

<script>
export default {
	name: 'iconManagement',
  data() {
		return{
			tabActiveName:'first',
			tabList:[
				{
					label:'工艺类图标',
					index:'first',
					iconList:[]
				},
				{
					label:'生产类图标',
					index:'second',
					iconList:[]
				},
				{
					label:'质量类图标',
					index:'third',
					iconList:[]
				},
				{
					label:'仓储类图标',
					index:'fouth',
					iconList:[]
				}
			],
			iconList:[
				'el-icon-platform-eleme',
				'el-icon-eleme',
				'el-icon-delete-solid',
				'el-icon-delete',
				'el-icon-s-tools',
				'el-icon-setting',
				'el-icon-user-solid',
				'el-icon-user',
				'el-icon-phone',
				'el-icon-phone-outline',
				'el-icon-more',
				'el-icon-more-outline',
				'el-icon-star-on',
				'el-icon-star-off',
				'el-icon-s-goods',
				'el-icon-goods',
				'el-icon-warning',
				'el-icon-warning-outline',
				'el-icon-question',
				'el-icon-info',
				'el-icon-remove',
			],
			showDelete:false
		}
	},
	methods:{
	}
}
</script>

<style lang='scss'>
.iconManagement{
	.view-header{
		height: 30px;
		line-height: 35px;
		display: flex;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-ms-flex-flow: row nowrap;
		flex-flow: row nowrap;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		background-color: #eef1f8;
		padding-right: 5px;
		width: 100%;
		.title {
			font-size: 14px;
			text-indent: 10px;
			font-weight: 700;
			color: #0093e0;
		}
	}
	.main{
		margin: 5px;
		.el-button--mini{
			padding: 5px 8px;
		}
		.iconContainer{
			.iconbox{
				border: 2px solid #6f6f6f;
				width: 50px;
				height: 50px;
				margin: 20px;
				padding: 5px;
				display: inline-block;
				line-height: 40px;
    		text-align: center;
				i{
					font-size: 24px;
				}
			}	
		}
		
	}
}
</style>