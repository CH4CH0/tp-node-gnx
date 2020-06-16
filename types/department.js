const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const Department = require("../models/department.js").Department;

const { GraphQLString, GraphQLID, GraphQLObjectType } = graphql;

const { CantRepeatName } = require("../validators/department.validator");

const DepartmentType = new GraphQLObjectType({
  name: "DepartmentType",
  description: "Represent a department",
  extensions: {
    validations: {
      CREATE: [CantRepeatName],
    },
  },
  fields: () => ({
    id: { type: GraphQLID },
    dept_name: { type: GraphQLString },
  }),
});

gnx.connect(Department, DepartmentType, "Department", "Departments");
module.exports = DepartmentType;
