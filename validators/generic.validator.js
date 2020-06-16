const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;
const { Employee } = require("../models/employee.js");

const CantDeleteObjectWithEmployee = {
  validate: async function (typeName, originalObject, materializedObject) {
    const EmployeeFinded = await Employee.findOne({
      EmployeeID: materializedObject.EmployeeID,
    });

    if (EmployeeFinded) {
      throw new CantDeleteObjectWithEmployeeError(typeName);
    }
  },
};

class CantDeleteObjectWithEmployeeError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "The current object have 1 employee related",
      "CantDeleteObjectWithEmployeeError"
    );
  }
}

const ValidateDates = {
  validate: async function (typeName, originalObject, materializedObject) {
    const from_date = new Date(materializedObject.from_date);
    const to_date = new Date(materializedObject.to_date);

    if (from_date > to_date) {
      throw new FromDateCantBeGreaterThanToDate(typeName);
    }
  },
};

class FromDateCantBeGreaterThanToDate extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "from_date must be smaller than to_date",
      "FromDateCantBeGreaterThanToDate"
    );
  }
}

module.exports = { ValidateDates, CantDeleteObjectWithEmployee };
