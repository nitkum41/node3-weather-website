const request = require('request')

const forecast=(longitude,latitude,callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=29a1761d6929d3bdb95f4ae6d5766466&query="+ latitude + "," + longitude +"&units=f"

    request({url , json:true},(error,{body})=>{

            if(error){
                callback("Unable to connect to weather serveice",undefined)
            }
            else if(body.error){
        
                callback("Unable to find location",undefined)
        
            }
            else{
        
                callback(undefined," It is currently "+body.current.temperature+"degrees out. There is "+ body.current.precip+" % chance of rain.")
            }
        })

}




module.exports=forecast