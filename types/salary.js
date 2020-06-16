const graphql = require("graphql");
const Salary = require("../models/salary.js").Salary;
const gnx = require("@simtlix/gnx");
const graphqlIsoDate = require("graphql-iso-date");

const EmployeeType = require("./employee.js");
const Employee = require("../models/employee.js").Employee;

const { GraphQLDate } = graphqlIsoDate;

const { GraphQLID, GraphQLObjectType, GraphQLInt } = graphql;

const {
  ValidateDates,
  CantDeleteObjectWithEmployee,
} = require("../validators/generic.validator.js");

const SalaryType = new GraphQLObjectType({
  name: "SalaryType",
  description: "Represent a salary",
  extensions: {
    validations: {
      CREATE: [ValidateDates],
      UPDATE: [ValidateDates],
      DELETE: [CantDeleteObjectWithEmployee],
    },
  },
  fields: () => ({
    id: { type: GraphQLID },
    salary: { type: GraphQLInt },
    from_date: { type: GraphQLDate },
    to_date: { type: GraphQLDate },
    employee: {
      type: EmployeeType,
      extensions: {
        relation: {
          connectionField: "EmployeeID",
        },
      },
      resolve(parent, args) {
        return Employee.findById(parent.EmployeeID);
      },
    },
  }),
});

gnx.connect(Salary, SalaryType, "Salary", "Salaries");
module.exports = SalaryType;
