const express = require("express"); // express instantiation
const cors = require("cors"); // cors instantiation
const app = express(); // instance of our app
const pool = require("./db"); // set up database manipulation via PostgreSQL

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)
const bodyParser = require("body-parser")
const cors = require("cors")
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create a todo

app.post("/raffle", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos

app.get("/raffle", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM raffle");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo

app.get("/raffle/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM raffle WHERE raffle_id = $1", [
      id
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

app.put("/raffle/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE raffle SET description = $1 WHERE raffle_id = $2",
      [description, id]
    );

    res.json("Raffle was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

app.delete("/raffle/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM raffle WHERE raffle_id = $1", [
      id
    ]);
    res.json("Raffle was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/payment", cors(), async(req, res) => {
  let {amount, id} = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      // provide details of purchase, like currency type, amount, cards
    })
  } catch { // error handling }
}) 
app.listen(process.env.port || 5000, () => {
  console.log("Server is listening on port 5000")
})

const [user, userState] = useState("") // username initially blank
