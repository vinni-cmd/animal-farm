import express from "express";
import cors from "cors";

// lets build an express server with node.js that will give us a back-end that we can use to run search queries against

// server job will be to take query/url param, that contains the text that the user just typed , filter results and send them back to client
//Express.js is a popular tool oor building rest apis with javascript
// here we will use it to create a simple api end point that we will use to make our server accessible on the internet via HTTP
// Initialize the express app
const app = express();
// in express we can opt in different features like cors by using middleware (we do that by calling app.use)
// allows our front end application to make req to server from a different url - cors a web security feature
app.use(cors());
// middleware that will automatically parse any json that is sen to the server
app.use(express.json());

// make some fake data with the Chance library
import Chance from "chance";
const chance = new Chance();
// create array that we can map to some other data
// trick to convert array to an array of integers that go from 0 to x - wrap array in brackets and use spread syntax on its keys -this creates a new array based on th eindex of the original - would be a lot easier if js supported ranges out of the box
// then we use map to map it to an array of random values (objects that contain the id/index val and some randomly generated properties)- end result: array with 25o objects in it
const animals = [...Array(250).keys()].map((id) => {
  return {
    id,
    // random generated properties
    type: chance.animal(),
    age: chance.age(),
    name: chance.name(),
  };
});

// lets make this data accessible
// by creating a http endpoint (get endpoint) to search for the animals - will leave endpoint argument(first), that reps url path, blank for now since we will only have one endpoint in our app. second argument is a callback that will run some code on theserver whenever user visits the above endpoint- run this function on each request

app.get("/", (req, res) => {
  // a url can contain extra data in it call query parameters seperated by a ? in this demo we will pass in a parameter called q that reps the text that the user is trying to search
  const q = (req.query.q) || "";
  const results = animals.filter((animal) =>
    animal.type.toLowerCase().includes(q.toLowerCase())
  );

  // send fitered data back to front-end
  res.send(results);
});

// start server up on specific port

app.listen(8080, () => console.log("Listening on port http://localhost:8080"));
