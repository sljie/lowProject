
function request(url,method,data){
    return axios({
        url:url,
        method:method,
        params:data
    })
}
//事件页面start
/******
 *  事件列表接口
 * *****/
export function eventList(data){
    return request('/v1/tag/events/fuzzy','post',{
        page:1,
        rows:10,
        ...data
    })
}
/*****
 *  下拉框返回参数接口
 * ******/
export function getSelectList(){
    return request('/funnel/pages','post',{})
}

/*****
 *  删除事件接口
 * ******/
export function deleteEvent(id){
    return request('/v1/tag/event/del','post',{
        eventId:id
    })
}

/******
 *  停用接口
 * *****/
export function changeStatus(data){
    return request('/v1/tag/event/update','post',{
        ...data
    })
}


/******
 *  创建接口
 * ****/
export function createEvent(data){
    return request('/v1/tag/event','post',{
        ...data
    })
}


/****
 *  获得编辑信息
 * ******/
export function getEventEditInfo(id){
    return request('/v1/tag/event/get','post',{
        id:id
    })
}

//事件页面end




//标签管理页面start

/*****
 *  左边tree接口
 * *****/
export function treeInfo(){
    return request('/v1/tag/category/tree','post',{})
}


/*******
 *  tableList 获取接口
 * ******/ 
export function labelTableList(){
    return request('/v1/tag/category/tree','post',{})
}

/****
 *  tree 添加子集
 * ****/
export function addChild(data){
    return request('/v1/tag/category','post',{
        ...data
    })
}

/****
 *  tree 编辑当前节点接口
 * ****/
export function editDom(data){
    return request('/v1/tag/category/update','post',data)
}

/****
 *  tree 删除当前节点接口
 * ****/
export function deleteDom(id){
    return request('/v1/tag/category/del','post',{
        categoryId:id
    })
}


/******
 *  tableList 查询接口
 * ****/
export function getLabelList(data){
    return request('/v1/tag/infos/fuzzy','post',{
        page:1,
        rows:10,
        tagName:'',
        ...data
    })
}

/*****
 *  添加标签接口
 * *****/
export function addLabel(name,id){
    return request('/v1/tag/info','post',{
        tagName:name,
        tagCategoryId:id
    })
}


/*****
 *  编辑标签接口
 * *****/
export function editLabel(name,id,tagCategoryId){
    return request('/v1/tag/info/update','post',{
        tagName:name,
        id:id,
        tagCategoryId:tagCategoryId
    })
}

/****
 *  标签页停用，开启方法
 * ****/
export function labelChangeStatus(data){
    return request('/v1/tag/info/update','post',data)
}

/***
 *  批量删除方法
 * ******/
export function deleteSome(ids){
    return request('/v1/batch/tag/info/del','post',{
        tagInfoIds:JSON.stringify(ids)
    })
}


/***
 *  添加事件接口
 * *******/
export function addEvent(data){
    return request('/v1/tag/category/link','post',data)
}




//标签管理页面end