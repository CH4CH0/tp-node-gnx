const graphql = require("graphql");
const Title = require("../models/title.js").Title;
const gnx = require("@simtlix/gnx");
const graphqlIsoDate = require("graphql-iso-date");

const EmployeeType = require("./employee.js");
const Employee = require("../models/employee.js").Employee;

const { GraphQLDate } = graphqlIsoDate;
const { GraphQLString, GraphQLID, GraphQLObjectType } = graphql;

const {
  ValidateDates,
  CantDeleteObjectWithEmployee,
} = require("../validators/generic.validator.js");

const TitleType = new GraphQLObjectType({
  name: "TitleType",
  description: "Represent a Title",
  extensions: {
    validations: {
      CREATE: [ValidateDates],
      UPDATE: [ValidateDates],
      DELETE: [CantDeleteObjectWithEmployee],
    },
  },
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
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

gnx.connect(Title, TitleType, "Title", "Titles");
module.exports = TitleType;
