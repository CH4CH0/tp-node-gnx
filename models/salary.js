const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salaryFields = {
  salary: Number,
  from_date: Date,
  to_date: Date,
  EmployeeID: Schema.Types.ObjectId,
};

const salarySchema = new Schema(salaryFields);

const Salary = mongoose.model("Salary", salarySchema);
if (!Salary.collection.collection) {
  Salary.createCollection();
}

module.exports = { salaryFields, Salary };
