const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;
const { Dept_employee } = require("../models/dept_employee.js");

const EmployeeCantHave2Titles = {
  validate: async function (typeName, originalObject, materializedObject) {
    const EmployeeFinded = await Dept_employee.findOne({
      EmployeeID: materializedObject.EmployeeID,
    });

    if (EmployeeFinded !== null) {
      throw new EmployeeCantHave2TitlesError(typeName);
    }
  },
};

class EmployeeCantHave2TitlesError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "The same employee cannot have 2 titles with the same dept_name",
      "EmployeeCantHave2TitlesError"
    );
  }
}

const cannotBeAssignedInTheSamePortionOfTime = {
  validate: async function (typeName, originalObject, materializedObject) {
    const EmployeeFinded = await Dept_employee.findOne({
      from_date: materializedObject.from_date,
    });

    if (EmployeeFinded != null) {
      const EmployeeFindedToDate = new Date(EmployeeFinded.to_date);
      const ActualEmployeeToDate = new Date(materializedObject.to_date);

      if (EmployeeFindedToDate.toString() == ActualEmployeeToDate.toString()) {
        throw new cannotBeAssignedInTheSamePortionOfTimeError(typeName);
      }
    }
  },
};

class cannotBeAssignedInTheSamePortionOfTimeError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Cant be 2 employees assigned to the same department in the same portion of time",
      "cannotBeAssignedInTheSamePortionOfTimeError"
    );
  }
}

module.exports = {
  EmployeeCantHave2Titles,
  cannotBeAssignedInTheSamePortionOfTime,
};
