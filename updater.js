const _ = require('underscore');
const path = require('path');
const mongoose = require('mongoose');
const Update = mongoose.model('Update');

// ** Only need these when running in isolation of index.js**
// require('requiredir')('./models');
// const config = require('./config');
// mongoose.connect(config.db.uri, { useMongoClient: true });
// mongoose.Promise = global.Promise;

console.log('Applying DB updates...');

// Store a list of updated requiring application
let updatesToApply = [];

// Get a list of updates that need to be applied
const updatesFolder = require('requiredir')(path.resolve(__dirname, './updates'));
// Strip out the keys added by requiredir
const listOfUpdates = _.omit(updatesFolder, ['length', 'toArray']);

// For each update in the folder, check if it's been run or run it
Object.keys(listOfUpdates).forEach((element) => {
	Update.findOne({name: element}).exec((err, update) => {
		if (err) {
			console.error(err);
			throw new Error(err);
		}
		else if (update){
      // The update has already been applied
			console.log(update.name + ' update already applied');
		} else {
      // We need to apply the update
			console.log(`Applying update ${element}`);

      // Find the model by extracting the the key
			Object.keys(listOfUpdates[element]).forEach((model) => {

        // Assign the model and list of documents to add
				const Model = mongoose.model(model);
				const parentModel = listOfUpdates[element];
				const arrayOfDocs = parentModel[model];

        // For each document supplied, save it to the model
				_.each(arrayOfDocs, (doc) => {
					const newDoc = new Model(doc);
					newDoc.save((err, savedDoc) => {
						if(err){
							console.error(err)
						} else {
							console.log(`Added new ${model}: ${savedDoc._id}`)
						}
					});
          // Once the array is over, consider the update applied
					if(arrayOfDocs.indexOf(doc) + 1 == arrayOfDocs.length) {
						// Then consider the updated applied and save it
						const successfulUpdate = new Update({name: element});
						successfulUpdate.save((err, update) => {
							console.log(`Applied update: ${update.name}`);
						});
					}
				});
			});
		}
	})
});


function applyUpdate(model, modelData) {
	return new Promise((resolve, reject) => {
		if(!model || modelData) {
			reject('Model or data not supplied')
		}

    // There is NO safety here because we don't know what we're updating
		const Model = mongoose.model(model);
    // Try making a model
		const newModel = new Model(modelData);
		newModel.save((err, savedModel) => {
			if(err){
				reject(err);
			} else {
				resolve(savedModel);
			}
		});
	});
}


//
// getListOfUpdates()
// 	.then((appliedUpdates) => {
// 		getListOfUpdatesToApply(appliedUpdates)
// 		.then((updatesToApply) => {
// 			_.each(updatesToApply, (update) => {
// 				console.log(update);
// 			})
//       // Do something with the list of updates that need to be applied
// 		})
// 	})
// 	.catch((err) => {
// 		console.error(err);
// 		throw new Error(err);
// 	});


// Run updates for any that haven't been run
// Add the update to the DB
