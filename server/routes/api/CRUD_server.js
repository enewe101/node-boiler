"use strict";
const express = require('express');
const Entity = require('../../models/Document.js')

// Build and export the router.  This is called at the bottom of the file,
// after handlers are defined.
CRUD_server = function(Entity) {

	this.prepare_router = function() {
	  const router = express.Router();
	  router.post('/find', getEntities);
	  router.get('/:entity_id', getOneEntity);
	  router.post('/', createEntity);
	  router.put('/:entity_id', updateEntity);
	  router['delete']('/:entity_id', deleteEntities);
	  module.exports = router;
	};

	this.getEntities = function(req, res) {
	  Entity.find({}, function(err, entities){
		if(err) {
		  console.log(err);
		  res.send(err);
		} else {
		  res.json(entities);
		}
	  });
	};


	this.getOneEntity = function(req, res) {
	  Entity.findOne({'_id':req.params.entity_id}, function(err, entity) {
		if(err) {
		  console.log(err);
		  res.send(err);
		} else {
		  res.json(entity);
		}
	  });
	};

	this.createEntity = function(req, res) {
	  console.log('creating entity');
	  console.log(req.body);
	  req.body = convertIds(req.body, objectIdFields);
	  let new_entity = new Entity(req.body);
	  new_entity.save(function(err, entity) {
		if(err) {
		  console.log(err);
		  res.send(err);
		} else {
		  res.json(entity);
		}
	  });
	};


	this.updateEntity = function(req, res) {
	  let options = {'new':true, 'upsert':false};
	  if(req.body._options) {
		Object.assign(options, req.body._options);
		delete req.body._options;
	  }
	  Entity.findOneAndUpdate({'_id':req.params.entity_id}, req.body, options)
		.then(function(err, entity) {
		  if(err) {
			console.log(err);
			res.send(err);
		  } else {
			res.json(entity)
		  }
		}
	  );
	};


	this.deleteEntities = function(req, res) {
	  Entity.deleteOne({'_id':req.params.entity_id}, function(err) {
		if(err) {
		  console.log(err);
		  res.send(err);
		} else {
		  res.send('ok');
		}
	  });
	};
}


prepare_router();


// These functions are useful to automatically convert fields that are supposed
// to be ObjectIds from srings into actual objectIds.
const getFieldsThatAreObjectId = entity => {
  return Object.keys(entity.schema.paths).filter(
    key => entity.schema.paths[key].instance === 'ObjectID').reduce(
    (obj, x) => Object.assign(obj, { [x]: true }), {}
  );
}
const objectIdFields = getFieldsThatAreObjectId(Entity);
const convertIds = instance => {
  let convertedInstance = {};
  for(let key in instance) {
    if(objectIdFields[key]) {
      convertedInstance[key] = mongoose.Types.ObjectId(instance[key]);
    } else {
      convertedInstance[key] = instance[key];
    }
  }
  return convertedInstance
}


