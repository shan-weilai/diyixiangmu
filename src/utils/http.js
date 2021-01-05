import axios from "axios"
import qs from "qs"
import Vue from "vue"
import {erroralert} from "./alert"
import store from "../store"
import router from "../router"

//开发环境使用  8080
let baseUrl="/api"
Vue.prototype.$pre = "http://localhost:3000"

//生产环境使用  打包
// let baseUrl=""
// Vue.prototype.$pre = ""

//请求拦截:设置请求头
axios.interceptors.request.use(config=>{
    if(config.url!==baseUrl+"/api/userlogin"){
        config.headers.authorization=store.state.userInfo.token
    }
    return config
})
//响应拦截
axios.interceptors.response.use(res => {

    //18.统一处理失败
    if (res.data.code !== 200) {
        erroralert(res.data.msg)
    }
    //统一处理list是null的情况
    if (!res.data.list) {
        res.data.list = []
    }
    //掉线处理
    if(res.data.msg==="登录已过期或访问权限受限"){
        //清除用户登录的信息 userInfo
        store.dispatch("changeUser",{})
        //跳到登录页面
        router.push("/login")
    }

    console.group("本次请求地址是：" + res.config.url)
    console.log(res);
    console.groupEnd()
    return res
})


//商品分类post 需要传递文件：
function dataToFormData(user){
    let data=new FormData()
    for(let i in user){
        data.append(i,user[i])
    }
    return data
}

//登录
export let reqLogin = (user) => {
    return axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data: qs.stringify(user)
    })
}


        // 菜单管理

// 菜单管理添加按钮 
export const reqmenuAdd=(user)=>{
    return axios({
        url:baseUrl+"/api/menuadd",
        method:"post",
        data:qs.stringify(user)
    })
}


// 菜单列表
export let tianjialist=()=>{
    return axios({
        url:baseUrl + "/api/menulist",
        params:{
            istree:true
        }
    })
}

// 菜单删除
export let caidanshanchu=(obj)=>{
    return axios({
        url:baseUrl+"/api/menudelete",
        method:"post",
        data:qs.stringify(obj)
    })
}

//一条数据
export let reqMenuDetail=(obj)=>{
    return axios({
        url:baseUrl+"/api/menuinfo",
        params:obj
    })
}

//修改接口
export let reqMenuUpdate=(user)=>{
    return axios({
        url:baseUrl+"/api/menuedit",
        method:"post",
        data:qs.stringify(user)
    })
}




                                                // 角色管理
//角色添加
export let reqroleAdd=(user)=>{
    return axios({
        url:baseUrl+"/api/roleadd",
        method:"post",
        data:qs.stringify(user)
    })
}

//角色列表
export let reqroleList=()=>{
    return axios({
        url:baseUrl+"/api/rolelist",
    })
}

//角色  一条数据
export let reqroleDetail=(user)=>{
    return axios({
        url:baseUrl+"/api/roleinfo",
        method:"get",
        params:user
    })
}

//角色修改
export let reqroleUpdate=(user)=>{
    return axios({
        url:baseUrl+"/api/roleedit",
        method:"post",
        data:qs.stringify(user)
    })
}


//角色删除
export let reqroleDel = (user)=>{
    return axios({
        url:baseUrl+"/api/roledelete",
        method:"post",
        data:qs.stringify(user)
    })
}



//管理员管理

//管理员添加
export let  reqmanageAdd = (user)=>{
    return axios({
        url:baseUrl + "/api/useradd",
        method:"post",
        data:qs.stringify(user)
    })
}

//管理员总数
export let reqmanagecount=()=>{
    return axios({
        url:baseUrl+"/api/usercount"
    })
}

//管理员列表
export let reqmanageList=(obj)=>{
    return axios({
        url:baseUrl +"/api/userlist",
        method:"get",
        params:obj
    })
}


//管理员获取
export let reqmanageDetail = (user)=>{
    return axios({
        url:baseUrl +"/api/userinfo",
        method:"get",
        params:user
    })
}

//管理员修改
export let reqmanageUpdate = (user)=>{
    return axios({
        url:baseUrl+"/api/useredit",
        method:"post",
        data:qs.stringify(user)

    })
}

//管理员删除
export let reqmanageDel = (user) =>{
    return axios({
        url:baseUrl+"/api/userdelete",
        method:"post",
        data:qs.stringify(user)
    })
}




//分类管理
//添加数据
export let reqcateAdd = (user)=>{
    //需要传递文件
    return axios({
        url:baseUrl + "/api/cateadd",
        method:"post",
        data:dataToFormData(user)
    })
}

//分类列表
export let reqcateList = (p) =>{
    return axios({
        url:baseUrl + "/api/catelist",
        method:"get",
        params:p
    })
}

//获取一条信息 
export let reqcateDetail = (user) =>{
    return axios({
        url:baseUrl +"/api/cateinfo",
        method:"get",
        params:user
    })
}


//商品分类修改
export let reqcateUpdate = (user)=>{
    return axios({
        url: baseUrl+"/api/cateedit",
        method:"post",
        data:dataToFormData(user)
    })
}

//商品分类删除
export let reqcateDel = (user)=>{
    return axios({
        url:baseUrl+"/api/catedelete",
        method:"post",
        data:qs.stringify(user)
    })
}



// 商品规格管理

//添加 user={}
export let reqspecsAdd = (user) => {

    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(user)
    })
}

//列表 p={page:1,size:500}
export let reqspecsList = (p) => {
    return axios({
        url: baseUrl + "/api/specslist",
        params: p
    })
}

//详情 user={id:1}
export let reqspecsDetail = (user) => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: user
    })
}

//修改 user={id:"必填",img:file,specsname:""}
export let reqspecsUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(user)
    })
}

//删除 user={id:1}
export let reqspecsDel = (user) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify(user)
    })
}

//总数
export let reqspecsCount = () => {
    return axios({
        url: baseUrl + "/api/specscount"
    })
}

// 商品规格管理 


// 商品管理 

//添加 user={}
export let reqgoodsAdd = (user) => {

    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: dataToFormData(user)
    })
}

//列表 p={page:1,size:500}
export let reqgoodsList = (p) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        params: p
    })
}

//详情 user={id:1}
export let reqgoodsDetail = (user) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: user
    })
}

//修改 user={id:"必填",img:file,goodsname:""}
export let reqgoodsUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: dataToFormData(user)
    })
}

//删除 user={id:1}
export let reqgoodsDel = (user) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify(user)
    })
}

//总数
export let reqgoodsCount = () => {
    return axios({
        url: baseUrl + "/api/goodscount"
    })
}

// 商品管理