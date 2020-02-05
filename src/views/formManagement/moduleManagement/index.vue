<template>
  <div class="moduleManagement" id="moduleManagement">
    <!-- 模块名 -->
    <div class="view-header">
        <div class="title">模块配置</div>
    </div>
    <div class="moduleManagement-container VueDragZone">
      <drag-zone class="zone">
        <drag-content class="content c1">
          <div class="item i1" style="width:1000px;">
            <div class="tree-container">
              <div style="padding:15px" class="tree-div">
								<el-input placeholder="输入关键字过滤(上限200条)" v-model="filterText" class="tree-input" size="mini"></el-input><el-button size="mini" style="margin-left: 15px;" type="primary"  @click="insertmenu()">新增一级菜单</el-button>
								<el-tree  :data="treeData" :props="moduleprops" node-key="id" draggable @node-drop="handleNodeDrop" :allow-drop="allowDrop" @node-click="handleNodeClick" :highlight-current=true :filter-node-method="filterNode" ref="tree" class="tree" :v-loading="treeLoading" :render-content="renderContentDrag"></el-tree>
							</div>
            </div>
          </div>
        </drag-content>
        <drag-handle class="handle" ref="handle"></drag-handle>
        <drag-content class="content c2">
          <div class="item i2">
            <div class="right-container">
              <el-tabs v-model="tabActiveName" type="border-card" >
								<el-tab-pane label="查询项" name="first">
									<searchTab></searchTab>
								</el-tab-pane>
								<el-tab-pane label="显示列" name="second">
									<columnTab></columnTab>
								</el-tab-pane>
								<el-tab-pane label="按钮" name="third">
									<buttonTab></buttonTab>
								</el-tab-pane>
							</el-tabs>
            </div>
          </div>
        </drag-content>
      </drag-zone>
    </div>
  </div>
</template>

<script>
import { dragZone, dragHandle, dragContent } from 'vue-drag-zone'
import searchTab from '@/views/formManagement/moduleManagement/searchTab.vue'
import columnTab from '@/views/formManagement/moduleManagement/columnTab.vue'
import buttonTab from '@/views/formManagement/moduleManagement/buttonTab.vue'
export default {
  name: 'moduleManagement',
  data() {
    return {
			treeLoading:false,
			filterText: '',
			moduleprops: {
        label: 'cmodname'
      },
      treeData: [
				{
					"cmodname": "主页",
					"cmodnumb": "home",
					"nhaschild": 1,
					"nhasworkflow": 0,
					"nmanagestatus": 0,
					"nmusthasworkflow": 0,
					"nshowonphone": 0,
					"nyngroup": 1,
					children:[{
						"cmodname": "主页面板显示",
						"cmodnumb": "homedisplay",
						"nhaschild": 1,
						"nhasworkflow": 0,
						"nmanagestatus": 0,
						"nmusthasworkflow": 0,
						"nshowonphone": 0,
						"nyngroup": 1,
					},{
						"cmodname": "主页图表显示",
						"cmodnumb": "homechart",
						"nhaschild": 1,
						"nhasworkflow": 0,
						"nmanagestatus": 0,
						"nmusthasworkflow": 0,
						"nshowonphone": 0,
						"nyngroup": 1,
					}]
				},
				{
					"cmodname": "个人任务中心",
    			"cmodnumb": "perTaskManagement",
					"nhaschild": 1,
					"nhasworkflow": 0,
					"nmanagestatus": 0,
					"nmusthasworkflow": 0,
					"nshowonphone": 0,
					"nyngroup": 1,
					children:[]
				},
				{
					"cmodname": "供应链管理",
    			"cmodnumb": "cooManagementMenu",
					"nhaschild": 1,
					"nhasworkflow": 0,
					"nmanagestatus": 0,
					"nmusthasworkflow": 0,
					"nshowonphone": 0,
					"nyngroup": 1,
					children:[]
				},
				{
					"cmodname": "供应链管理(供方)",
    			"cmodnumb": "cooSupplierManagementMenu",
					"nhaschild": 1,
					"nhasworkflow": 0,
					"nmanagestatus": 0,
					"nmusthasworkflow": 0,
					"nshowonphone": 0,
					"nyngroup": 1,
					children:[]
				},
				{
					"cmodname": "工艺管理",
    			"cmodnumb": "craftsManagement",
					"nhaschild": 1,
					"nhasworkflow": 0,
					"nmanagestatus": 0,
					"nmusthasworkflow": 0,
					"nshowonphone": 0,
					"nyngroup": 1,
					children:[]
				},
				{
					"cmodname": "计划管理",
    			"cmodnumb": "planManagement",
					"nhaschild": 1,
					"nhasworkflow": 0,
					"nmanagestatus": 1,
					"nmusthasworkflow": 0,
					"nshowonphone": 0,
					"nyngroup": 1,
					children:[]
				},
			],
			tabActiveName:'first',
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  components: {
    dragZone,
    dragHandle,
		dragContent,
		searchTab,
		columnTab,
		buttonTab
  },
  mounted() {
  },
  methods: {
		filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    renderContentDrag(h, { node, data, store }) {
      return (
        <span>
          <span class='el-tree-node__label'>{node.label}</span>
          <span>&nbsp;&nbsp;
            {data.nyngroup !== 3 && data.nhaschild === 1 ? <el-tooltip content='新增' placement='top'><el-button size='mini'type='text'icon='el-icon-plus' on-click={() => this.insert(node, data)}></el-button></el-tooltip> : ''}
          </span>
          <span>&nbsp;&nbsp;
            <el-tooltip content='编辑' placement='top'><el-button size='mini' type='text' icon='el-icon-edit' on-click={() => this.edit(node, data)}></el-button></el-tooltip>
          </span>
          <span>&nbsp;&nbsp;
            {data.nmanagestatus===1? <el-tooltip content='启用该模块' placement='top'><el-button size='mini' type='text' icon='el-icon-circle-close' on-click={() => this.changemanagestatus(node, data)}></el-button></el-tooltip>
              : <el-tooltip content='禁用该模块' placement='top'><el-button size='mini' type='text' icon='el-icon-circle-check' on-click={() => this.changemanagestatus(node, data)}></el-button></el-tooltip>}
          </span>
          <span>&nbsp;&nbsp;
            {data.nhasworkflow ? <el-tooltip content='工作流' placement='top'><i class='el-icon-sort' style='font-size: 12px;'></i></el-tooltip> : ''}
          </span>
          <span>&nbsp;&nbsp;
            {data.nshowonphone ? <el-tooltip content='手机端显示' placement='top'><i class='el-icon-mobile-phone' style='font-size: 12px;'></i></el-tooltip> : ''}
          </span>
        </span>
      )
		},
		allowDrop(draggingNode, dropNode, type) {
      if (dropNode.level === 3) {
        return type !== 'inner'
      } else {
        return true
      }
    },
    handleNodeDrop(draggingNode, dropNode, dropType, ev) {
      const self = this
      self.$confirm('确定拖曳到此节点', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const json = {}
        if (dropType === 'inner') {
          json.type = dropType
          json.dragid = draggingNode.data.id
          json.nparkeyid = dropNode.data.id
        } else {
          json.type = dropType
          json.dragid = draggingNode.data.id
          const nodes = dropNode.parent.childNodes
          // console.log(draggingNode.data.id)
          for (let i = 0; i < nodes.length; i++) {
            const element = nodes[i]
            // console.log(element.data.id)
            if (element.data.id === draggingNode.data.id) {
              if (dropType === 'before') {
                json.id = nodes[i + 1].data.id
              } else if (dropType === 'after') {
                json.id = nodes[i - 1].data.id
              }
            }
          }
        }
        const jsonStr = JSON.stringify(json)
        request({
          url: '/api/sysmodule/update/dragupdate',
          method: 'post',
          data: {
            jsonStr
          }
        }).then(res => {
          self.$message({
            message: '修改成功！',
            type: 'success'
          })
          self.refresh()
        })
      }).catch(() => {
        self.$message({
          type: 'info',
          message: '已取消'
        })
        self.refresh()
      })
		},
		 handleNodeClick(data, node) {
      const self = this
    },
  },
  activated: function() {
  },
  deactivated: function() {
  }

}
</script>
<style lang='scss'>
.moduleManagement {
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
  display: flex;
  flex-flow: column;
  min-height: calc(100vh - 91px);
  .moduleManagement-container {
    display: flex;
    flex-flow: row;
    flex: 1;
    .tree-container {
			background-color: #f0f7ff;
			.tree-div{
				padding: 0 !important;
				.tree{
					padding: 0 !important;
					min-width: 350px;
					background-color: #f0f7ff;
					::-webkit-scrollbar {
						display: none;
					}
				}
			.tree-input{
				width: 220px;
			}
			.el-tree-node__label{
				font-size:12px;
			}
			}
    }
  }
  .table-flex {
    width:100%;
  }
  .zone {
    width: 100%;
    position: relative;
    clear: both;
    display: flex;
    justify-content: space-between;
    .handle {
      margin: 0 3px;
      width: 4px;
      background-color: #f0f7ff;
    }
   
    .content {
      //width: calc((100% - 10px) / 2);
      overflow: hidden; //添加graph会有滚动条
    }
    .c1 {
      width: 400px;
      min-width: 50px;
      max-width: 700px;
      background-color: #f0f7ff;
      overflow: auto;
      .tree {
        min-width: 350px;
        height: 350px;
        background-color: #f0f7ff;
        .el-tree--highlight-current
          .el-tree-node.is-current
          > .el-tree-node__content {
          background-color: #b0e2ff;
        }
        .el-tree-node:focus > .el-tree-node__content,
        .el-tree-node__content:hover {
          background-color: #b0e2ff;
        }
      }
    }
    .c2 {
      width: calc((100% - 410px));
     display:flex;
     flex-flow:column;
     .item {
      width: 100%;
      flex: 1;
      display: flex;
      flex-flow: column;
      .right-container{
        flex:1;
				display:flex;
				.el-tabs--border-card {
					width: 100%;
					.el-tabs__content {
						padding: 0px;
					}
				}
      }
    }
    }
  }
}
</style>