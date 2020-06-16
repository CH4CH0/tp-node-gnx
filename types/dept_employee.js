const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const graphqlIsoDate = require("graphql-iso-date");

const Dept_employee = require("../models/dept_employee.js").Dept_employee;

const Department = require("../models/department.js").Department;
const DepartmentType = require("./department.js");

const EmployeeType = require("./employee.js");
const Employee = require("../models/employee.js").Employee;

const { GraphQLDate } = graphqlIsoDate;

const { GraphQLObjectType } = graphql;

const {
  EmployeeCantHave2Titles,
  cannotBeAssignedInTheSamePortionOfTime,
} = require("../validators/dept_employee.validator.js");

const {
  ValidateDates,
  CantDeleteObjectWithEmployee,
} = require("../validators/generic.validator.js");

const Dept_employeeType = new GraphQLObjectType({
  name: "Dept_employeeType",
  description: "Represents a Dept_employee",
  extensions: {
    validations: {
      CREATE: [
        EmployeeCantHave2Titles,
        cannotBeAssignedInTheSamePortionOfTime,
        ValidateDates,
      ],
      UPDATE: [
        EmployeeCantHave2Titles,
        cannotBeAssignedInTheSamePortionOfTime,
        ValidateDates,
      ],
      DELETE: [CantDeleteObjectWithEmployee],
    },
  },
  fields: () => ({
    from_date: { type: GraphQLDate },
    to_date: { type: GraphQLDate },
    department: {
      type: DepartmentType,
      extensions: {
        relation: {
          connectionField: "DepartmentID",
        },
      },
      resolve(parent, args) {
        return Department.findById(parent.DepartmentID);
      },
    },
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

gnx.connect(
  Dept_employee,
  Dept_employeeType,
  "Dept_employee",
  "Dept_employees"
);
module.exports = Dept_employeeType;
