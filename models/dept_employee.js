const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dept_employeeFields = {
  from_date: Date,
  to_date: Date,
  EmployeeID: Schema.Types.ObjectId,
  DepartmentID: Schema.Types.ObjectId,
};

const dept_employeeSchema = new Schema(dept_employeeFields);

const Dept_employee = mongoose.model("Dept_employee", dept_employeeSchema);
if (!Dept_employee.collection.collection) {
  Dept_employee.createCollection();
}

module.exports = { dept_employeeFields, Dept_employee };
