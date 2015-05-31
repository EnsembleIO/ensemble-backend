// ElasticSearch client
var esclient = require('../../server').esclient;

exports.companySearch = function(req, res) {

  var search = req.query.search;
  var indexes = "hackathon";
  var types = "news";
  console.log('### in companySearch (type: ' + types + ', index: ' + indexes  + ' , search: ' + search + ')');

  esclient.search({
    index: indexes,
    type: types,
    body: {
      size: 20,
      sort:{
        "published" : "desc" 
      },
      query: {
        match_phrase_prefix: {
          "target.id": 'urn:ensemble:member:' + search
        }
      }
    }
  }).then(function (body) {
    var hits = body.hits.hits;
    res.send(hits);
  }, function (error) {
    console.log(error.message);
  });  
}
