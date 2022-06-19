var { graphql, buildSchema } = require("graphql");

var schema = buildSchema(`
type Query{
    hello: String
}`);

var rootValue = { hello: () => "hello world" };
var source = "{ hello }";
graphql({ schema, source, rootValue }).then((res) => console.log(res));
