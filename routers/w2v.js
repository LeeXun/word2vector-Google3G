var express = require('express');
var router = express();
var utils = require("../utils");
var fs = require( 'fs' );
var _ = require("lodash");
var w2v = require('word2vector');

console.time("read");
w2v.load(utils.GOOGLE_BIN);
console.timeEnd("read");
router.get('/',function(req, res){
  res.json([
    "/similarWords/:q",
    "/vectors/:qs",
    "/neighbors/:q",
    "/similarity/:q1/:q2",
  ]);
})

router.get('/similarWords/:q',function(req, res){
  res.json(w2v.getSimilarWords( req.params.q ));
})
router.get('/vectors/:qs',function(req, res){
  res.json(w2v.getVectors( req.params.qs.split(',') ));
})
router.get('/neighbors/:q',function(req, res){
  res.json(w2v.getNeighbors( w2v.getVector( req.params.q ) ));
})
router.get('/similarity/:q1/:q2',function(req, res){
  res.json(w2v.similarity(req.params.q1, req.params.q2));
})

module.exports = router;
