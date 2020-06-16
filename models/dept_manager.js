const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dept_managerFields = {
  from_date: Date,
  to_date: Date,
  EmployeeID: Schema.Types.ObjectId,
  DepartmentID: Schema.Types.ObjectId,
};

const dept_managerSchema = new Schema(dept_managerFields);

const Dept_manager = mongoose.model("Dept_Manager", dept_managerSchema);
if (!Dept_manager.collection.collection) {
  Dept_manager.createCollection();
}

module.exports = { dept_managerFields, Dept_manager };
