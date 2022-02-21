var express = require('express');
var emplmodel=require('../module/employee');
var router = express.Router();
var detail=emplmodel.find({});
 


 router.get('/', function(req, res, next) {
  detail.exec(function(err,data)
  {
    if(err) throw err;
    res.render('index', { title: 'Employee Record' , records:data});
  });
  
});

router.post('/',  function(req, res, next) {
  var empDetails = new emplmodel({
    name: req.body.uname,
    email: req.body.email,
    etype: req.body.emptype,
    hourlyrate: req.body.hrlyrate,
    totalhour: req.body.ttlhr,
    total: parseInt(req.body.hrlyrate) * parseInt(req.body.ttlhr),

  });
  

  empDetails.save(function(err,res1){

 
     if(err) throw err;
    detail.exec(function(err,data){
      if(err) throw err;
      res.render('index', { title: 'Employee Records', records:data });
        });
  });
  
  
});

router.post('/search/', function(req, res, next) {

  var flrtName = req.body.fltrname;
  var flrtEmail = req.body.fltremail;
  var fltremptype = req.body.fltremptype;
  
  if(flrtName !='' && flrtEmail !='' && fltremptype !='' ){

   var flterParameter={ $and:[{ name:flrtName},
  {$and:[{email:flrtEmail},{etype:fltremptype}]}
  ]
   }
  }else if(flrtName !='' && flrtEmail =='' && fltremptype !=''){
    var flterParameter={ $and:[{ name:flrtName},{etype:fltremptype}]
       }
  }else if(flrtName =='' && flrtEmail !='' && fltremptype !=''){

    var flterParameter={ $and:[{ email:flrtEmail},{etype:fltremptype}]
       }
  }else if(flrtName =='' && flrtEmail =='' && fltremptype !=''){

    var flterParameter={etype:fltremptype
       }
  }else{
    var flterParameter={}
  }
  var employeeFilter =emplmodel.find(flterParameter);
  employeeFilter.exec(function(err,data){
      if(err) throw err;
      res.render('index', { title: 'Employee Records', records:data });
        });
  
  
});

module.exports = router;
