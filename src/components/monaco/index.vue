<template>
  <div ref="container" class="monaco-editor" :style="`height: ${height}px`"></div>
</template>

<script>
import * as monaco from 'monaco-editor'
export default {
    name: 'AcMonaco',
    props: {
        opts: {
            type: Object,
            default() {
                return {}
            }
        },
        height: {
            type: Number,
            default: 300
        }
    },
    data() {
        return {
            // 主要配置
            defaultOpts: {
                value: '', // 编辑器的值
                theme: 'vs-dark', // 编辑器主题：vs, hc-black, or vs-dark，更多选择详见官网
                roundedSelection: false, // 右侧不显示编辑器预览框
                autoIndent: true // 自动缩进
            }

        }
    },
    watch: {
        opts: {
            handler(n) {
                this.init()
            },
            deep: true
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            // 初始化container的内容，销毁之前生成的编辑器
            this.$refs.container.innerHTML = ''
            
            this.editorOptions = Object.assign(this.defaultOpts, this.opts)
            // 生成编辑器对象
            this.monacoEditor = monaco.editor.create(this.$refs.container, this.editorOptions)
            // this.monacoEditor.setValue('var a = 1')
            const prettier = require('prettier/standalone')
            const prettierJs = require('prettier/parser-babylon')
            // console.log(prettier)
            console.log(prettierJs)
            var text = this.editorOptions.value

            function prettierCode (text) {
              return prettier.format(text,
                    { parser: 'babylon', plugins: [prettierJs]
                })
            
            }
            const editorContent = prettierCode(text)
            this.monacoEditor.setValue(editorContent)
            // 编辑器内容发生改变时触发
            this.monacoEditor.onDidChangeModelContent(() => {
                this.$emit('change', this.monacoEditor.getValue())
            })
        },
        // 供父组件调用手动获取值
        getVal() {
            return this.monacoEditor.getValue()
        }
    }
}
</script>