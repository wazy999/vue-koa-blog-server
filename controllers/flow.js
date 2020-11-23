const statistical = require('../models/statistical.js');
const { update } = require('../models/statistical.js');

class flow{
    async findFlow(ctx){

        ctx.body = {
            success: true,
            data: {
                UV: ctx.query,//用户量
                PV: 1//访问量
            }
        };
    }
    async getFlow(ctx){
        const whereStr = {'pageType':"common"};
        let data = ""
        // 查询是否有数据 没有数据初始化数据
        await statistical.find(whereStr,(err,res)=>{
            if(err){
                console.log(err)
              }else{
                data = res
            }
        })
        console.log(data,"data")
        if(!data.length){
          data = [{UV:1,PV:1,pageType:"common",date:new Date()}]
          await statistical.create(data,(err,res)=>{
            if(err){
              console.log(err)
            }else{
            }
        })
        }
        let  update = {}
        console.log(ctx.query.uuid,"ctx.query.uid")
        if(!ctx.query.uuid){
            update = {'UV':++data[0].UV}
            await statistical.updateMany(whereStr,update,(err,res)=>{
              if(err){
                console.log(err)
              }else{
                console.log(res)
              }
            })
        }
        update = {'PV':++data[0].PV}
        console.log(update)
        await statistical.updateMany(whereStr,update,(err,res)=>{
          if(err){
            console.log(err)
          }else{
            console.log(res,"resres")
          }
        })
        ctx.body = {
            success: true,  
            data: true
        };
    }
}
module.exports = new flow();    //对象
