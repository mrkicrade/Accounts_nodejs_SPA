// S E L E C T O R S

let accounts = document.querySelector('#acc');
let addAcc = document.querySelector('#addAcc');
let editDeleteAcc = document.querySelector('#editDeleteAcc');
let tbody = document.querySelector('#tbody');
let mainRow = document.querySelector('#mainRow');
let addForm = document.querySelector('#addForm');
let firstName = document.querySelector('#firstName');
let lastName = document.querySelector('#lastName');
let deposit = document.querySelector('#deposit');
let card = document.querySelector('#card');
let saveBtn = document.querySelector('#saveBtn');
let editDeleteRow = document.querySelector('#editDeleteRow');
let tbody2 = document.querySelector('#tbody2');
let editRow = document.querySelector('#editForm');
let accountEdit = document.querySelector('#accountEdit');


// E V E N T S

accounts.addEventListener('click', showMainView);
addAcc.addEventListener('click', showForm);
editDeleteAcc.addEventListener('click', editDelete);
saveBtn.addEventListener('click', saveForm);


// F U N C T I O N S

function showMainView(){
    mainRow.style.display = 'block';
    addForm.style.display = 'none';
    editDeleteRow.style.display = 'none';
    editRow.style.display = 'none';
    let data = new Promise((resolve, reject) => {
        let xml = new XMLHttpRequest();
        xml.open('get', '/get_data');
        xml.onreadystatechange = function(){
            if (xml.readyState == 4 && xml.status == 200) {
                // console.log(xml.responseText);
                resolve(JSON.parse(this.responseText));
            }
        }
        xml.send();
    });
    data.then((data) => {
        let text = ``;
        for (let i = 0; i < data.length; i++) {
            text += `
                <tr>
                    <td>${data[i].first_name}</td>
                    <td>${data[i].last_name}</td>
                    <td>${data[i].deposit}</td>
                    <td>${data[i].card}</td>
                </tr>
            `
        }
        tbody.innerHTML = text;
    })
}

function showForm(){
    mainRow.style.display = 'none';
    addForm.style.display = 'block';
    editDeleteRow.style.display = 'none';
    editRow.style.display = 'none';
}

function saveForm(e){
    e.preventDefault();
    
    let firstNameVal = firstName.value;
    let lastNameVal = lastName.value;
    let depositVal = deposit.value;
    let cardVal = card.value;
    
    let xml = new XMLHttpRequest();
    xml.open('post', '/save');
    xml.onreadystatechange = function(){
        if (xml.readyState === 4 && xml.status === 200) {
            // console.log(xml.responseText);
            showMainView();
        }
    }
    xml.setRequestHeader('Content-Type', 'application/json');
    xml.send(JSON.stringify({
        first_name : firstNameVal,
        last_name : lastNameVal,
        deposit_2 : depositVal,
        card_2 : cardVal
    }));
    
}

function editDelete(){
    mainRow.style.display = 'none';
    addForm.style.display = 'none';
    editDeleteRow.style.display = 'block';
    editRow.style.display = 'none';
    let data = new Promise((resolve, reject) => {
        let xml = new XMLHttpRequest();
        xml.open('get', '/get_data');
        xml.onreadystatechange = function(){
            if (xml.readyState == 4 && xml.status == 200) {
                // console.log(xml.responseText);
                resolve(JSON.parse(this.responseText));
            }
        }
        xml.send();
    });
    data.then((data) => {
        let text = ``;
        for (let i = 0; i < data.length; i++) {
            text += `
                <tr>
                    <td>${data[i].first_name}</td>
                    <td>${data[i].last_name}</td>
                    <td>${data[i].deposit}</td>
                    <td>${data[i].card}</td>
                    <td><button data-id="${data[i]._id}" class="edit btn btn-sm btn-primary">Edit</button></td>
                    <td><button id="${data[i]._id}" class=" delete btn btn-sm btn-danger">Delete</button></td>
                </tr>
            `
        }
        tbody2.innerHTML = text;
        let delBtns = document.querySelectorAll('.delete');
        for (let i = 0; i < delBtns.length; i++) {
            delBtns[i].addEventListener('click', deleteAccount);
        }
        let editBtns = document.querySelectorAll('.edit');
        for (let i = 0; i < editBtns.length; i++) {
            editBtns[i].addEventListener('click', editAccount);
        }
    })
}

function deleteAccount(){
    let xml = new XMLHttpRequest();
    xml.open('post', '/delete');
    xml.onreadystatechange = function(){
        if (xml.readyState === 4 && xml.status === 200) {
            console.log(xml.responseText);
            showMainView();
        }
    }
    xml.setRequestHeader("Content-Type", 'application/json');
    xml.send(JSON.stringify({id : this.getAttribute('id')}));
}

function editAccount() {
    mainRow.style.display = 'none';
    addForm.style.display = 'none';
    editDeleteRow.style.display = 'none';
    editRow.style.display = 'block';

    let data = new Promise((resolve, rejected) => {
        let xml = new XMLHttpRequest();
        xml.open('post', '/get_edit');
        xml.onreadystatechange = function(){
            if (xml.readyState === 4 && xml.status === 200 ) {
                resolve(JSON.parse(xml.responseText));
                // console.log(JSON.parse(xml.responseText));
            }
        }
        xml.setRequestHeader("Content-Type", 'application/json');
        xml.send(JSON.stringify({id : this.getAttribute('data-id')}))
    })
    data.then((data) => {
        // console.log(data);
        
        let text = ``;
            text += `
            <div class="col-10 offset-1">
            <h4 class="display-4">Edit Account</h4>
            <div class="row">
                <div class="col-10 offset-1">
                    <form action="/edit_account" method="POST">
                        <input id="idEditAccount" type="hidden" name="idEditAccount" value="${data._id}"><br>
                        <input id="editFirstName" type="text" name="first_name" placeholder="first name" class="form-control" value="${data.first_name}"><br>
                        <input id="editLastName" type="text" name="last_name" placeholder="last name" class="form-control" value="${data.last_name}"><br>
                        <input id="editDeposit" type="text" name="deposit" placeholder="deposit" class="form-control" value="${data.deposit}"><br>
                        <input id="editCard" type="text" name="card" placeholder="card" class="form-control" value="${data.card}"><br>
                        <button id="editBtn" class="btn btn-primary form-control">Edit</button>
                    </form>
                </div>
            </div>
        </div>
            `
        accountEdit.innerHTML = text;
        let editId = document.querySelector('#idEditAccount');
        let editFirstName = document.querySelector('#editFirstName');
        let editLastName = document.querySelector('#editLastName');
        let editDeposit = document.querySelector('#editDeposit');
        let editCard = document.querySelector('#editCard');
        let editBtn = document.querySelector('#editBtn');
        editBtn.addEventListener('click', editSave);
    })
}

function editSave(){
    // e.preventDefault();

    let xml = new XMLHttpRequest();
    xml.open('post', '/edit_account');
    xml.onreadystatechange = function(){
        if (xml.readyState === 4 && xml.status === 200) {
            console.log(xml.responseText);
            showMainView();
        }
    }
    editIdVal = editId.value;
    
    
    xml.send(JSON.stringify({
        id : editIdVal,
        first_name : editFirstName.value,
        last_name : editLastName.value,
        deposit : editDeposit.value,
        card : editCard.value
    }));
}

showMainView();
