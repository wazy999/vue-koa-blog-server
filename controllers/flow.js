const statistical = require('../models/statistical.js');
const { update } = require('../models/statistical.js');

class flow{
    async findFlow(ctx){
        let data
        const whereStr = {'pageType':"common"};
        await statistical.find(whereStr,(err,res)=>{
          if(err){
            console.log(err)
          }else{
            data = res
          }
        }) 
        ctx.body = {
            success: true,
            data:data
        };
    }
    async getFlow(ctx){
        const whereStr = {'pageType':"common"};
        let data = ""
        await statistical.find(whereStr,(err,res)=>{
          if(err){
            console.log(err)
          }else{
            data = res
          }
        }) 
        // 查询是否有数据 没有数据初始化数据
        if(!data.length){
          data = [{UV:1,PV:1,pageType:"common",date:new Date()}]
          await statistical.create(data[0],(err,res)=>{
            console.log(2)
            if(err){
              console.log(err)
            }
          })
        }    
        let update = {}
        if(!ctx.query.uuid){
            update = {'UV':++data[0].UV}
            await statistical.updateMany(whereStr,update,(err,res)=>{
              if(err){
                console.log(err)
              }else{
                console.log(3)
              }
            })
        }
        update = {'PV':++data[0].PV}
        console.log(update)
        await statistical.updateMany(whereStr,update,(err,res)=>{
          if(err){
            console.log(err)
          }else{
            console.log(4)
          }
        })
        ctx.body = {
            success: true,  
            data: true
        };
    }
}
module.exports = new flow();    //对象
