const { Type } = require("../db");


function verifyTypeName(name) {
  if (!name) throw new Error("a name is required for the Type"); 
  return name.toLowerCase()
}

async function verifyDuplicateType(name) {
  let TypeInDb = await Type.findOne({ where: { name } });
  if (TypeInDb) throw new Error(`the type ${TypeInDb.name}  already exists`);
}

async function verifyTypeId(id) {
  if (!id) throw new Error("you must provide a type id");
  if(!/^[1-9][0-9]*$/.test(id)) throw new Error("the id must be a number");

  let TypeInDb = await Type.findByPk(id);
  if (!TypeInDb) throw new Error("the id does not correspond to an existing type");

  return TypeInDb;
}

module.exports = {verifyTypeName, verifyDuplicateType, verifyTypeId}