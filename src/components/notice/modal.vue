<template>
<div class="modal">
	<el-dialog :title="title" :visible.sync="isShow" :before-close="handleClose" @open="open()" @close="close()" width="600px">

		<el-form :model="form" ref="form" :rules="rules">
			<el-form-item label="" prop="content">
				<el-input type="textarea" v-model="form.content"></el-input>
			</el-form-item>
		</el-form>

		<span slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleClose()">取 消</el-button>
      <el-button size="small" type="primary" @click="preSubmit()">{{isEdit ? '保存' : '添加'}}</el-button>
  </span>
	</el-dialog>
</div>
</template>

<script>
export default {
	props: {
		editData: {
			type: Object,
			default: () => {
				return null
			}
		},
		title: {
			type: String,
			default: '提示'
		},
		isShow: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			isEdit: false,
			rules: {
				content: [{
					required: true,
					message: '请输入公告内容',
					trigger: 'blur'
				}, ],
			},
			form: {}
		}
	},
	mounted() {

	},
	methods: {
		preSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.submit()
          return true
        } else {
          return false
        }
      })
		},
    submit() {
			var data = new FormData()
			var keys = Object.keys(this.form)
			keys.forEach(key => {
				data.append(key, this.form[key] ? this.form[key] : '')
			})
			var requestUrl = this.isEdit ?
				'/PublishPlatform/projectManage/messageupdate' :
				'/PublishPlatform/projectManage/messageadd'
			axios({
				url: requestUrl,
				method: 'post',
				data
			}).then(res => {
				if (res.success) {
					let msg = this.isEdit ? '保存成功':'添加成功'
					this.$message({
						message: msg,
						type: 'success'
					})
					this.submitOk()
				} else {
					this.$message.error(res.msg)
				}
			}).catch(error => {
				let msg = this.isEdit ? '保存失败':'添加失败'
				this.$message.error(msg)
			})
    },
		reset() {
			this.form = {}
		},
		handleClose() {
			this.$emit('before-close')
		},
		submitOk() {
			this.$emit('submit-ok')
		},
		open() {
			this.form = {}
			console.log('open')
			if (this.editData) {
				this.isEdit = Object.keys(this.editData).length > 0
				this.form.id = this.editData.id
				this.form.addname = this.editData.addname
				this.form.ispermission = this.editData.ispermission
				this.form.content = this.editData.content
			} else {
				this.isEdit = false
			}
		},
		close() {
			this.$refs['form'].resetFields()
		}
	}
}
</script>

<style lang="scss" scoped>
.modal {}
</style>
