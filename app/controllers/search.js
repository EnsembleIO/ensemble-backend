// ElasticSearch client
var esclient = require('../../server').esclient;

exports.companySearch = function(req, res) {

  //var indexes = req.query.indexes;
  //var types = req.query.types;
  //var search = req.query.search;
  var indexes = "hackathon";
  var types = "news";
  var search = "4599-6654-4298-2051";
  console.log('### in companySearch (type: ' + types + ', index: ' + indexes  + ' , search: ' + search + ')');

  esclient.search({
    index: indexes,
    type: types,
    body: {
      query: {
        match_phrase_prefix: {
          "target.id": 'urn:ensemble:margaux'
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
