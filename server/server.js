const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const app =express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(cors({origin:true,credentials:true}));
const stripe = require("stripe")("sk_test_51MWjJWDYsi3lOS9dEKk6GoDbqr3Shg0kiry1KkHFgzDOf4nQz6uffRewyj2lxLIc8qGSICMFPWj4CWP6xkuzerLt00w3XyUBRO");

app.post("/checkout",async(req,res,next)=>{
    try{
        const session = await stripe.checkout.sessions.create({
            mode:"payment",
            line_items: req.body.items.map((item)=>({
                price:'{{PRICE_ID}}',
                quantity: 1,
              })),
            success_url:"http://localhost:4242/success.html",
            cancel_url:"http://localhost:4242/cancel.html",
        });
        res.status(200).json(session);
    }catch(error){
        next(error);
    }
});
app.listen(4242,()=>console.log('app is running in the correct way'));