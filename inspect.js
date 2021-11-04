const fs = require('fs');
const path = require('path');
const process = require('process');

let errorCount = 0;

function getAllFiles(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(__dirname, dirPath, "/", file));
    }
  })

  return arrayOfFiles;
}

const allFiles = getAllFiles("./definitions");
console.log("Found "+allFiles.length+" files.");
const allJSONFiles = allFiles.filter(p => p.endsWith('json'));
console.log("Found "+allJSONFiles.length+" JSON files.");

const allStructures = [];
allJSONFiles.forEach(function (e) { 
	s = JSON.parse(fs.readFileSync(e, 'utf8')); 
	if (Array.isArray(s)) {
		s.forEach(t => allStructures.push(t));
	} else {
		allStructures.push(s);
	}
});
console.log("Found "+allStructures.length+" structures.");

/*
 * Check unicity of the structures
 */
let structuresByType = {};
allStructures.forEach(function (s) {
	if (!s.type) {
		console.log("Structure "+s+" is missing a type field");
		errorCount++;
	}
	if (structuresByType[s.type]) {
		console.log("Structure "+s.type+" is already defined");
		errorCount++;
	}
	structuresByType[s.type] = s;
});
console.log("Found "+(Object.keys(structuresByType).length)+" unique well-identified structures.");
//Object.keys(structuresByType).sort((a,b) => (a.localeCompare(b))).forEach(e => console.log(e));

/*
 * inspect parentType fields
 * we check that each value of a parentType field matches a value of a type field
 */
let parentTypes = {};
let rootStructures = {};
Object.keys(structuresByType).forEach(
	function(e) { 
		// console.log(e);
		s = structuresByType[e];
		if (s.parentType === null) {
			// console.log("Found "+e+" as root structure.");
			rootStructures[s.type] = true; 
		} else if (!parentTypes[s.parentType]) {
			// console.log("Found "+s.parentType+" as parent structure.");
			parentTypes[s.parentType] = 1;
			if (!structuresByType[s.parentType]) {
				console.log("parentType "+s.parentType+" not defined.");
				errorCount++;
			}
		} else {
			parentTypes[s.parentType]++;
		}
	}
);
console.log("Found "+Object.keys(rootStructures).length+" root structures.");
//console.log("Parent types: ", parentTypes);

/*
 * inspect fields
 * makes sure each field has a type
 * TODO: flatten fields first
 */
let fieldsByType = {};
let noFields = [];
Object.keys(structuresByType).forEach(
	function(e) { 
		s = structuresByType[e];
		if (s.fields) {
			s.fields.forEach(function (f) {
				if (f.namespace && f.namespace !== "ISOBMFF") return;
				if (f.type) {
					if (!fieldsByType[f.type]) {
						fieldsByType[f.type] = 0;
					}
					fieldsByType[f.type]++;
				} else {
					console.log("Field "+f.name+" in "+e+" has no type!");
					errorCount++;
				}
			});
		} else {
			noFields.push(s);
		}
	}
);
console.log("Found "+Object.keys(fieldsByType).length+" unique field types.");
//console.log(fieldsByType);
console.log("Found "+noFields.length+" structures without fields.");
//console.log(noFields);

/*
 * inspect array entry types
 * makes sure each array entry has a type
 */
let arrayEntryBaseTypesByType = {};
let arrayEntryTypesByType = {};
let fieldsNoArrayEntryType = [];
function processField(f) {
	if (f.type === "Array") {
		if (f.arrayEntryBaseType) {
			if (!arrayEntryBaseTypesByType[f.arrayEntryBaseType]) {
				arrayEntryBaseTypesByType[f.arrayEntryBaseType] = 0;
			}						
			arrayEntryBaseTypesByType[f.arrayEntryBaseType]++;
			if (!structuresByType[f.arrayEntryBaseType]) {
				console.log(f.arrayEntryBaseType+" is not a defined type!");
				errorCount++;
			}
		} else if (f.arrayEntryType) {
			if (!arrayEntryTypesByType[f.arrayEntryType]) {
				arrayEntryTypesByType[f.arrayEntryType] = 0;
			}						
			arrayEntryTypesByType[f.arrayEntryType]++;
		} else {
			fieldsNoArrayEntryType.push(f);
		}
	}	
	if (f.fields) {
		if (Array.isArray(f.fields)) {
			f.fields.forEach(processField);		
		} else {
			console.log("fields is not Array");
		}
	}
}

Object.keys(structuresByType).forEach(
	function(e) { 
		s = structuresByType[e];
		if (s.fields) {
			if (Array.isArray(s.fields)) {
				s.fields.forEach(processField);
			} else {
				console.log("fields is not Array");
			}
		}
	}
);
console.log("Found "+Object.keys(arrayEntryBaseTypesByType).length+" array base entry types.");
//console.log("Array field base entry types: ", arrayEntryBaseTypesByType);
console.log("Found "+Object.keys(arrayEntryTypesByType).length+" array entry types.");
//console.log("Array field entry types: ", arrayEntryTypesByType);
console.log("Found "+fieldsNoArrayEntryType.length+" array fields without base type.");
//console.log(fieldsNoArrayEntryType);

/*
 * inspect flags
 * makes sure each flag has a name and a value
 */
let structureWithFlags = [];
Object.keys(structuresByType).forEach(
	function(e) { 
		s = structuresByType[e];
		if (s.flags) {
			structureWithFlags.push(s);
			s.flags.forEach(function(f) {
				if (!f.name) {
					console.log("Missing name in flag definition in "+e);
					errorCount++;
				}
				if (!f.value) {
					console.log("Missing value in flag definition in "+e);
					errorCount++;
				}
			});
		}
	}
);
console.log("Found "+structureWithFlags.length+" structures with flags.");
// console.log(structureWithFlags);

process.exit(errorCount > 0 ? 1 : 0)
