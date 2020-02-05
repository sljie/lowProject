import * as types from "../mutation-types";
import constants from "@/js/constants";
import { eventList, treeInfo, getLabelList,getEventEditInfo } from "@/server/api";
const state = {
  user: null,
  persons: [], //人员数据

  //label页面所需公共参数
  label: {
    selectList: [], //标签管理，复选框选中项
    treeInfo: [], //左边和弹框嵌套树状信息
    labelList: {}, //label页面tableList所需参数
    loading: true,
    //搜索框所需字段
    labelSearchName: "", //搜索标签名
    searchTime: [], //搜索时间
    selectEvent: "", //搜索事件
    selectLeftTreeId: "", //左边树选中id
    editInfo: {} //编辑的时候字段
  },

  //events页面所需公共参数
  events: {
    tableList: {}, //table组建所需参数
    selectList: {},
    loading: true,
    editInfo:{}   //记录修改信息
  }
};

const getters = {
  user: state => state.user,
  persons: state => state.persons,
  label: state => state.label,
  events: state => state.events
};

const actions = {
  login({ commit, dispatch }) {
    // 0 开发  2 测试 3 运维
    axios.get("/login").then(res => {
      if (res.success) {
        var result = {
          mutationType: types.LOGIN,
          data: res
        };
        dispatch("getPersons");
        commit(types.LOGIN, result);
      }
    });
  },
  getPersons({ commit }) {
    // axios.get('/PublishPlatform/projectManage/allUsers').then(res => {
    //   if (res.success) {
    //     commit(types.PERSONS, res.data)
    //   }
    // })
  },

  /*****
   *  改变选中项数据
   * *****/
  changeSelectData({ commit }, v) {
    commit(types.CHANGE, v);
  },

  /******
   *  events页面公共方法 start
   * ******/

  //events页面获取table数据接口
  initList({ commit }, data = {}) {
    state.events.loading = true;
    eventList(data)
      .then(res => {
        if (res.success) {
          commit("eventInfo", res);
        } else {
          this.$message.error(res.errorMsg);
          return;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },

  /******
   *  下拉框方法
   * ****/
  selectInfo({ commit }) {
    eventList({page:'',rows:''})
      .then(res => {
        console.log(res);
        if (res.success) {
          commit("getList", res);
        } else {
          return this.$message.error(res.errorMsg);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },


  /****
   *  点击编辑记录信息
   * ****/
  editInfoFun({ commit },{id,cb}=item){
    getEventEditInfo(id)
      .then(res => {
        console.log(res);
        if (res.success) {
          res.cb = cb;
          commit("editInfoId", res);
        } else {
          return this.$message.error(res.errorMsg);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },


  /******
   *  events页面公共方法 end
   * ******/
  //////////////////////////////////////



  /******
   *  label页面公共方法 start
   * ******/

  /*****
   *  tree 字段信息
   * ****/
  getTreeInfo({ commit, dispatch }, bol) {
    treeInfo()
      .then(res => {
        console.log(res);
        if (res.success) {
          commit("treeList", res);
          if (bol) {
            dispatch("getLabelInfo");
          }
        } else {
          return this.$message.error(res.errorMsg);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },

  /*****
   *  tableList 字段信息
   * ****/
  getLabelInfo(
    { commit },
    data = { tagCategoryId: state.label.selectLeftTreeId }
  ) {
    state.label.loading = true;
    getLabelList(data)
      .then(res => {
        if (res.success) {
          commit("labelInfo", res);
        } else {
          this.$message.error(res.errorMsg);
          return;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },

  /****
   *  设置搜索字段
   * *****/
  setSearchData({ commit }, data) {
    commit("setData", data);
  },

  /****
   *  保存修改信息
   * ******/
  saveOldEditInfo({ commit }, data) {
    commit("saveData", data);
  },

  /******
   *  左边的树点击记录id
   * ****/
  clickTreeNode({ commit }, data) {
    commit("saveId", data);
  },

  /*****
   *  切换页面初始化字段
   * ***/
  changeIndexInit({ commit }){
    commit("dataInit");
  }

  /******
   *  label页面公共方法 end
   * ******/
  //////////////////////////////////
};

const mutations = {
  [types.LOGIN](state, result) {
    state.user = result.data;
    eBus.send(constants.MAIN, result);
    eBus.send(constants.PROJECTS, result);
    eBus.send(constants.HEADER, result);
    eBus.send(constants.ADDCOL, result);
  },
  [types.PERSONS](state, result) {
    state.persons = result;
  },
  [types.CHANGE](state, v) {
    state.label.selectList = v;
  },

  eventInfo(state, result) {
    state.events.loading = false;
    state.events.tableList = result;
  },

  getList(state, result) {
    state.events.selectList = result;
  },

  treeList(state, result) {
    state.label.treeInfo = result.data || [];
    state.label.selectLeftTreeId =result.data[0]&& result.data[0].id || '';
  },

  labelInfo(state, result) {
    state.label.loading = false;
    state.label.labelList = result;
  },

  setData(state, result) {
    state.label.labelSearchName = result.labelSearchName;
    state.label.searchTime = result.searchTime;
    state.label.selectEvent = result.selectEvent;
  },

  saveData(state, result) {
    state.label.editInfo = result;
  },

  saveId(state, result) {
    state.label.selectLeftTreeId = result;
  },

  editInfoId(state, result){
    
    state.events.editInfo = result.data;
    result.cb&&result.cb();
  },

  dataInit(state){
    state.label.labelSearchName = '';
    state.label.searchTime = [];
    state.label.selectEvent = '';
    state.label.selectLeftTreeId = '';
  }

};

export default {
  state,
  getters,
  actions,
  mutations
};
