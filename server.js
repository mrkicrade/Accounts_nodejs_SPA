const express = require('express');
const mongojs = require('mongojs');
const db = mongojs('acc', ['accounts']);

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use(express.static(__dirname +'/public'));

app.get('/get_data', (req, res) => {
    db.accounts.find((err, data) => {
        res.send(JSON.stringify(data));
    });
})

app.post('/save', (req, res) => {
    console.log(req.body);
    
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let deposit_2 = req.body.deposit_2;
    let card_2 = req.body.card_2;
    
    db.accounts.insert({
        first_name : first_name,
        last_name : last_name,
        deposit : deposit_2,
        card : card_2
    }, (err, data) => {
        res.redirect('/');
        
    })
})

app.post('/delete', (req, res) => {
    let id = req.body.id;
    // console.log(id);

    db.accounts.remove({"_id" : db.ObjectId(id)}, (err, data) => {
        res.redirect('/');
    })
})

app.post('/get_edit', (req, res) => {
    let id = req.body.id;
    // console.log(id);

    db.accounts.findOne({"_id" : db.ObjectId(id)}, (err, data) => {
        // console.log(data);
        res.send(JSON.stringify(data));
    })
})

app.post('/edit_account', (req, res) => {
    console.log(JSON.parse(JSON.stringify(req.body)));
    
    let id = req.body.idEditAccount;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let deposit = req.body.deposit;
    let card = req.body.card;
   
    db.accounts.update({"_id" : db.ObjectId(id)} , {$set : {
        first_name : first_name,
        last_name : last_name,
        deposit : deposit,
        card : card
    }}, (err, data) => {
        res.redirect('/')
    })
})

app.listen(3000, () => {
    console.log('Listening to port 3000');
})
