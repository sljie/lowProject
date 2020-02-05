<template>
<div>
    <el-row :gutter="20">
        <!-- <el-col :span="6">
            <el-input v-model="labelSearchName" placeholder="标签"></el-input>
        </el-col>
        <el-col :span="1.5" style = 'margin-top:7px'>
            更新时间
        </el-col>  
        <el-col :span="8.5">
            <el-date-picker
            v-model="searchTime"
            type="datetimerange"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker>
        </el-col>
        <el-col :span="4">
            <el-select v-model="selectEvent" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.pageName"
                :value="item.id">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="2">
            <el-button type="warning" @click='searchInfo'>搜索</el-button>
        </el-col> -->
        <el-col :span="2">
            <el-button type="primary" @click='createEvent'>创建事件</el-button>
        </el-col>
    </el-row>
</div>
</template>
<style lang="scss" scoped>

</style>
<script>
import { getSelectList } from "@/server/api";
export default {

data() {
return {
    labelSearchName: "",    //搜索标签名称
    searchTime:'',          //搜索时间
    selectEvent: "",        //搜索事件
    options: [],            //下拉框数据
       
}
},
mounted() {
    // this.selectInfo()
    // this.$store.dispatch("selectInfo");
},
methods: {
    /******
     *  下拉框方法
     * ****/
    selectInfo(){
        let _self = this;
        getSelectList()
        .then(res => {
            console.log(res)
            if(res.success){
                return _self.options = res.data;
            }else{
                return _self.$message.error(res.errorMsg);
            }
        })
        .catch(err => {
          console.log(err);
        });
    },



    createEvent(){
        this.$emit('show-editLog','创建事件');
        
    },
    searchInfo(){

        let funnelPageId = this.selectEvent || '',
            eventName = this.labelSearchName || '',
            startTime = this.searchTime[0] || '',
            endTime = this.searchTime[1] || '';
        let data = {
            funnelPageId:funnelPageId,
            eventName:eventName,
            startTime:startTime,
            endTime:endTime
        }
        this.$store.dispatch("initList",data);

        
    }
},
}
</script>