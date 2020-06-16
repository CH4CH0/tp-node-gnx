const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;
const { Department } = require("../models/department.js");

const CantRepeatName = {
  validate: async function (typeName, originalObject, materializedObject) {
    const DeptFinded = await Department.findOne({
      dept_name: materializedObject.dept_name,
    });

    if (DeptFinded && DeptFinded._id != materializedObject.id) {
      throw new CantRepeatDptNameError(typeName);
    }
  },
};

class CantRepeatDptNameError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Cant be 2 departments with the same dept_name",
      "CantRepeatDptNameError"
    );
  }
}

module.exports = { CantRepeatName };
