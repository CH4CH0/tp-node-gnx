const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const graphqlIsoDate = require("graphql-iso-date");

const Dept_manager = require("../models/dept_manager.js").Dept_manager;

const Department = require("../models/department.js").Department;
const DepartmentType = require("./department.js");

const EmployeeType = require("./employee.js");
const Employee = require("../models/employee.js").Employee;

const { GraphQLDate } = graphqlIsoDate;

const { GraphQLObjectType } = graphql;

const {
  cannotBeAssignedInTheSamePortionOfTime,
} = require("../validators/dept_manager.validator.js");

const {
  ValidateDates,
  CantDeleteObjectWithEmployee,
} = require("../validators/generic.validator.js");

const Dept_managerType = new GraphQLObjectType({
  name: "Dept_managerType",
  description: "Represents a Dept_manager",
  extensions: {
    validations: {
      CREATE: [cannotBeAssignedInTheSamePortionOfTime, ValidateDates],
      UPDATE: [cannotBeAssignedInTheSamePortionOfTime, ValidateDates],
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

gnx.connect(Dept_manager, Dept_managerType, "Dept_manager", "Dept_managers");
module.exports = Dept_managerType;
