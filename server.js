express=require('express')
app=express()
mongoose=require('mongoose')



mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true, useUnifiedTopology: true })
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })

let ContactModel=require('./Modules/contactlist')



            




app.get('/home',function(req,res){

ContactModel.find(function(err,contactlist){




res.send(contactlist)

})



}
)

app.get('/find/:id',function(req,res){

  ContactModel.findById(req.params.id,function(err,contactlist){
  
  
  
  
  res.send(contactlist)
  
  })
  
  
  
  }
  )

app.get('/add/:firstname/:lastname/:tel/:email', function (req, res) {

  
 let newcontact= new ContactModel ({firstname:req.params.firstname,lastname:req.params.lastname,telephone:req.params.tel,email:req.params.email})
 newcontact.save()
 .then(contacts=>{res.send(contacts)})
 .catch(err=>{console.log(err)})
})


app.get('/edit/:id/:firstname/:lastname/:tel/:email', function (req, res) {

  
  ContactModel.findByIdAndUpdate (req.params.id,
    {firstname:req.params.firstname,lastname:req.params.lastname,telephone:req.params.tel,email:req.params.email})
  
  .then(contacts=>{res.send(contacts)})
  .catch(err=>{console.log(err)})
 })


app.get('/delete/:firstname', function (req, res) {

 ContactModel.findOneAndDelete ({firstname:req.params.firstname})
 
 .then(contacts=>{res.send(contacts)})
 .catch(err=>{console.log(err)})
})










app.listen(5000 , (err)=>{

    if(err) console.log("server not running")
    
    else console.log ("sever running at port 5000")
    
    
    
    
    })