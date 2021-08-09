const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { dirname } = require('path')
const geoCode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()
const port =process.env.PORT || 3000

//path for express
const viewsPath = path.join(__dirname,'../templates/views')
const publicDirPath = path.join(__dirname,'../public')
const partialsPath = path.join(__dirname,'../templates/partials')

//handlebars
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//static
app.use(express.static(publicDirPath))


app.get('',(req,res)=>{
    res.render('index',{
        title : 'weather app',
        name: "Nitesh"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        msg : 'welcome to the help page',
        title:'Help',
        name: 'Nitesh'
       
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About Me',
        name: "Nitesh"
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Please enter an address"

        })
    }

        geoCode(req.query.address,(error,{longitude,latitude,location}={})=>{
            if(error){
                return res.send({error})
            }
           
            forecast(longitude,latitude,(error,forecastData)=>{
                if(error){
                    return res.send({error})
                }
                // console.log(location)
                // console.log(forecastData)
                return res.send({
                    forecast:forecastData,
                    location,
                    address:req.query.address
                    
                })
            })
        
        })
    



    

})

app.get('/products',(req,res)=>{
    res.send({
        products:[]

    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404',
        name: "Nitesh",
        errorMessage:'Help article not found'})
})


app.get('*',(req,res)=>{
    res.render('404',{
        title : '404',
        name: "Nitesh",
        errorMessage:'Page not found'})
})
app.listen(port,()=>{
    console.log("server runnung on port:"+ port )
})