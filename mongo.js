import { MongoClient, ObjectId } from "mongodb";
import { uri } from "./credentials.js";

const client = new MongoClient(uri)
const db = client.db("sample_restaurants")
const restaurantsCollection = db.collection("restaurants")

let query = { name: { $regex: /chicken/i } }
let restaurantArray = await restaurantsCollection
  .find(query)
  .limit(5)
  .toArray()

for (let i = 0; i <restaurantArray.length; i++) {
  console.log(restaurantArray[i].name)
}

const newRestaurant = {
  name: "Tyler's Sushi and Dim Sum",
  borough: "Boca Raton",
  cuisine: "Asian",
  restaurant_id: 710420,
  grades: [{date: "2022-10-10", grade: "A"},
   {date: "2021-11-25", grade: "A"}],
  address: {
    building: 22,
    street: "West Elm St",
    zipcode: 33431,
  },
};

const results = await restaurantsCollection.insertOne(newRestaurant);
console.log("Your new restaurant:", results);