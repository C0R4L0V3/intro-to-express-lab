const express = require('express');
const app = express();
const PORT = 3000
  
// 1. Be Polite, Greet the User
// --- DONT FORGET TO TURN NODEMON ON ---


app.get('/', (req, res) =>{
    res.send(`<h1>Home page</h1>`)
});

app.get('/greetings/:username', (req, res) =>{
    res.send(`<h1> Hello ${req.params.username} <h1>`)
});


//1. Be Polite, Greet the User

//sets pathway to  roll
app.get('/roll/:num', (req, res) => {
    //validates if its a number
    const number = req.params.num
    //random number generator
    const max = number;
    const roll = Math.floor(Math.random() * max) //<<-- random num generator

    if (isNaN(number)){
        return res.send('You must specify a number.') //<<-- if not a number returns this string
    };      // return statement guards against causing an error, could alsoe wrap the bottom in an else block

    res.send(`You rolled a ${roll}`) //<<-- if a number, returns this string
});

//3. I Want THAT One!

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

app.get('/collectibles/:index', (req, res) =>{

    const index  = req.params.index     //<<--- deconstructes the parameter to be a number

    const item = collectibles[index] //<<--- makes the item the value of the idexed object

    // collectibles.forEach((index) =>{ //<<--- loop is not needed
        if (index < 0 || index > collectibles.length){ //<<-- determines if the number falls within the array index limits
            return res.send(`This item is not yet in stock. Check back soon!`) // returns if index is not in the array
        }
        res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`) // responds if the index is within the array
    // })
});


//4. Filter Shoes by Query Parameters

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];


app.get('/shoes', (req, res) => {
    console.log(req.query);
    

    //cam back to this after getting a better understanding of the filter method - thansk to Glenn


    let filterShoes = shoes
    // const maxPrice = req.query.maxPrice //<<-- set query for the max price
    // const type = req.query.type //<<-- sets query for type
    //   shoes.forEach((shoe) => {
   
    if (req.query.minPrice){
        const minPrice = req.query.minPrice; //<<-- sets query for min price
        filterShoes = filterShoes.filter(shoe => shoe.price >= minPrice); //<<-- this should filter?
    }
    if (req.query.maxPrice){
        const maxPrice = req.query.maxPrice; //<<-- sets query for min price
        filterShoes = filterShoes.filter(shoe => shoe.price <= maxPrice); //<<-- this should filter?
    }
    if (req.query.shoeType){
        const shoeType = req.query.shoeType;
        filterShoes = filterShoes.filter(shoe => shoe.type === shoeType);

    }
    // })
    return res.send(JSON.stringify(filterShoes)) // <<-- this is something i'mm need to read up on!
});





app.listen(PORT, () =>{
    console.log(`Server is online on PORT ${PORT}`)
})