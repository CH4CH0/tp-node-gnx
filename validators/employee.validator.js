const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;
const { Employee } = require("../models/employee.js");

const CantRepeatDni = {
  validate: async function (typeName, originalObject, materializedObject) {
    const EmployeeFinded = await Employee.findOne({
      dni: materializedObject.dni,
    });

    if (EmployeeFinded && EmployeeFinded._id != materializedObject.id) {
      throw new CantRegisterEmployeeWithDniUsedError(typeName);
    }
  },
};

class CantRegisterEmployeeWithDniUsedError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Dni cant be repeated",
      "CantRegisterEmployeeWithDniUsedError"
    );
  }
}

const CantBeUnder18 = {
  validate: async function (typeName, originalObject, materializedObject) {
    const actualEmployee = materializedObject;

    const actualEmployeeBirthDate = new Date(actualEmployee.birth_date);
    const actualDate = new Date();

    if (actualDate.getFullYear() - actualEmployeeBirthDate.getFullYear() < 18) {
      throw new EmployeeCantBeUnder18Error(typeName);
    }
  },
};

class EmployeeCantBeUnder18Error extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "The employee cant be under 18 years old",
      "EmployeeCantBeUnder18Error"
    );
  }
}

module.exports = { CantRepeatDni, CantBeUnder18 };
