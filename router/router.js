const zipcodes = require('zipcodes')
const distance = require('geolib')
const AnimalsCollection = require('../models/animals')
const animalPicture = require('../controller/animalPictures')
const url = require('url')
module.exports = (app) =>
{
    function decodeurl(url){
    const currentURL = new URL(url)
    const search_params = currentURL.searchParams;
    const zipcode = search_params.get('zipcode')
    const miles = search_params.get('miles')
    const error_code = search_params.get('error')
    const decoded = [zipcode,miles,error_code]
    return decoded
    }
app.get('/', function(req,res){
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    var noresults = false;
    var ziperror = false;
    const decodedurl = decodeurl(fullUrl)
    if(decodedurl[2] == "noresults")
    {
        noresults = true
    }
    else if(decodedurl[2] == "invalidzip")
    {
        ziperror = true
    }
    else{
        noresults = false;
        ziperror = false;
    }
    res.render('index.ejs', {
        title: "Wisconsin Dogs",
        zip_error: ziperror,
        noResult: noresults
    })
})
app.post('/', function(req,res,next){
    var zipcode = animalPicture.animalPicture(req,res,next)
    console.log(zipcode)
    var string = encodeURIComponent(zipcode)
    var miles = encodeURIComponent(req.body.miles)
    if(zipcode){
        return res.redirect('/page/1?zipcode='+string+'&miles='+miles)
    }
    else{
        return res.redirect('/?error=invalidzip')
    }
})

app.get('/page/:id', function(req,res){
    AnimalsCollection.find({}, function(err,data){
        if(!err)
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const urlparams = decodeurl(fullUrl)
    const zipcode = urlparams[0]
    const miles = urlparams[1]
    console.log(zipcode + "hit3")
    var count = data.length
    var address = []
    for(var i=0; i<count; i++)
    {
        if(zipcodes.distance(data[i].contact.address.postcode,zipcode) === null)
        {
            return res.redirect('/?error=invalidzip')
        }
        if(zipcodes.distance(data[i].contact.address.postcode,zipcode) <= miles)
        {
            try{
                data[i].photos[0].full
                address.push(data[i])
            }
            catch{
            }
        }
    }
    if(address.length == 0){
        return res.redirect('/?error=noresults')
    }
    else{
    req.session.noResults = false
    count = address.length
    var displayedAnimals = count - (20*req.params.id)
    console.log(displayedAnimals)
    var numbers_of_pages = Math.ceil(count / 20)
    res.render('animals.ejs',{
        error: "nice",
        displayed: displayedAnimals,
        photo_num: count,
        photo: address,
        pages: numbers_of_pages,
        name: address,
        url: address,
        dogs: count,
        zip: zipcode,
        mi: miles
    })}})
})
app.post('/page', function(req,res,next){
    zipcode = animalPicture.animalPicture(req,res,next)
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const urlparams = decodeurl(fullUrl)
    var miles = req.body.miles
    if(zipcode){
        return res.redirect('/page/1?zipcode='+string+'&miles='+miles)
    }
    else{
        return res.redirect('/?error=invalidzip')
    }
})
app.post('/', function(req,res){
    res.redirect('/')
    })

}