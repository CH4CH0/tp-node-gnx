const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;
const { Dept_manager } = require("../models/dept_manager.js");

const cannotBeAssignedInTheSamePortionOfTime = {
  validate: async function (typeName, originalObject, materializedObject) {
    const EmployeeFinded = await Dept_manager.findOne({
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

module.exports = { cannotBeAssignedInTheSamePortionOfTime };
