const { Type } = require("../db");
const {verifyTypeName, verifyTypeId} = require("../verifications/Type.js");

async function getAllTypes() {
  let types = await Type.findAll();
  return types;
}

async function getTypeById(id) {
  let type = await verifyTypeId(id);
  return type;
}

async function getTypeByName(name) {
  name = await verifyTypeName(name);
  let type = await Type.findOne({where: { name }});
  return type;
}

module.exports = {getAllTypes, getTypeById, getTypeByName};