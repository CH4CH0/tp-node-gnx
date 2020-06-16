const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const Employee = require("../models/employee.js").Employee;
const graphqlIsoDate = require("graphql-iso-date");
const GenderTypeEnum = require("./enums/gender.enum");

const { GraphQLDate } = graphqlIsoDate;

const { GraphQLString, GraphQLID, GraphQLObjectType, GraphQLInt } = graphql;

const {
  CantRepeatDni,
  CantBeUnder18,
} = require("../validators/employee.validator.js");

const EmployeeType = new GraphQLObjectType({
  name: "EmployeeType",
  description: "Represent employees",
  extensions: {
    validations: {
      CREATE: [CantRepeatDni, CantBeUnder18],
      UPDATE: [CantRepeatDni],
    },
  },
  fields: () => ({
    id: { type: GraphQLID },
    dni: { type: GraphQLInt },
    birth_date: { type: GraphQLDate },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    gender: { type: GenderTypeEnum },
    hire_date: { type: GraphQLDate },
  }),
});

gnx.connect(Employee, EmployeeType, "Employee", "Employees");
module.exports = EmployeeType;
