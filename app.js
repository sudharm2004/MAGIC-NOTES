console.log('welcome to notes app');
window.onload = showNotes(), onload_stars();

//GRABBING ADD NOTES WALA BUTTON U
let addBtn = document.getElementById('addBtn');

//ADDING EVENT LISTNER TO THE ADD NOTES WALA BUTTON THAT WILL STORE THE VALUE IN LOCAL STORAGE FIRST AND THEN USING showNotes() FUNCTION IT WILL PRINT ALL THE NOTES WE ADDED
addBtn.addEventListener('click', function () {
    //GRABBING THE TEXT AREA IN WHICH WE ARE WRITING THE THE NOTE
    let addTxt = document.getElementById('addTxt');
    let noteTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');
    let notesobj;
    if (notes == null) {
        notesobj = []
    }
    else {
        //since we have stored the string entered as array we use parse to access the array of 
        //strings
        notesobj = JSON.parse(notes);
    }
    let notes_title_obj = {
        title: addTitle.value,
        notes: addTxt.value,
    }
    notes_title_obj.notes = notes_title_obj.notes.replace(/\n/g, '<br>');
    //adding the text that we enetered into notesobj array
    notesobj.push(notes_title_obj);
    //now to store the array(notesobj) we use stringify
    localStorage.setItem('notes', JSON.stringify(notesobj));
    addTxt.value = "";
    addTitle.value = "";
    showNotes();
    onload_stars();
});


//FUNCTION TO ADD NOTES 
function showNotes() {
    let notes = localStorage.getItem('notes');
    let notesobj;
    //WE HAVE TO IF-ELSE HERE BECAUSE WHEN WE WILL OPEN PAGE FOR FIRST TIME IT IS LOADED /ALL THE NOTES ARE DELETED AND THEN IT WILL RUN THIS FUNCTION BUT AT THAT TIME THERE IS NOTHING IN NOTES ITS NULL(NOTES DOESN'T EVEN EXIST YET) SO WE CREATE EMPTY ARRAY AND IF ARRAY IS EMPTY ITS CONDITION IS CHECKED WHILE ADDING INNERHTML..HENCE "NOTHING TO SHOW"ADD NOTES" " IS DONE
    if (notes == null) {
        notesobj = []
    }
    else {
        notesobj = JSON.parse(notes);
    }


    //SAME LOGIC AS NOTES
    let notesTitle = localStorage.getItem('notesTitle');
    let notesTitleObj;
    if (notesTitle == null) {
        notesTitleObj = []
    }
    else {
        notesTitleObj = JSON.parse(notesTitle);
    }

    let html = "";
    notesobj.forEach(function (element, index) {
        html += `
<div class="notesCard my-2 mx-2 card" style="width: 18rem;">
    <div class="card-body">
    <div style="display:flex; justify-content:space-between;">
        <h4 class="card-title noteTitle" contenteditable="true">${element.title}</h4><span class="fa fa-star checked fa-lg star-icon" onclick="star(this.id)" id="${index * 100 + 1}"></span>
    </div>
    <hr>
      <p class="card-text" contenteditable="true">${element.notes}</p>
      <a id="${index}" class="btn btn-primary" onclick="deleteNote(this.id)">Delete Note</a>  


    </div>
  </div>
`;
    });
    // console.log(html);
    let addelm = document.getElementById('notes');
    //NOTESOBJ IS [] IF ALL THE NOTES CREATED ARE DELETED AND PAGE IS RELOADED AGAIN....SO ITS LENGTH IS ZERO SO WE WRITE WHAT IS WRITTEN IN IF CONDITION
    if (notesobj.length == 0) {
        addelm.innerHTML = `Nothing to show "Add Notes"`
    } else {
        addelm.innerHTML = html;
    }
}


//FUNCTION TO DELETE THE NODE
function deleteNote(index) {
    //CODE TO REMOVE THE NOTE(DESIRED NOTE) TEXT FROM LOCAL STORAGE
    let notes = localStorage.getItem('notes');
    let notesobj = JSON.parse(notes);
    notesobj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesobj));
    //CODE TO REMOVE THE VALUE OF THE STAR STORED IN LOCAL STORAGE
    let stars = localStorage.getItem('stars');
    let starsobj = JSON.parse(stars);
    for (var i = 0; i < starsobj.length; i++) {
        if (starsobj[i] == index * 100 + 1) {
            starsobj.splice(i, 1);
        }
    }
    //CODE TO CHANGE THE VALUE OF STARS BY -100 THAT ARE GREATER THAN CURRENT VALUE TO MAKE IT SAME AS BEFORE DELETION
    for (var i = 0; i < starsobj.length; i++) {
        if (starsobj[i] > index * 100 + 1) {
            starsobj[i] = starsobj[i] - 100;
        }
    }
    console.log(starsobj);
    localStorage.setItem('stars', JSON.stringify(starsobj));
    showNotes();
    onload_stars();
}

//FUNCTION TO CHANGE THE COLOR OF STAR AND STORING ITS ID IN LOCAL STORAGE
function star(element) {
    let a = document.getElementById(element);
    let stars = localStorage.getItem('stars');
    let starsobj;

    if (stars == null) {
        starsobj = []
    }
    else {
        starsobj = JSON.parse(stars);
    }

    if (a.style.color == "lightgray") {
        a.style.color = "#0800ff";
        starsobj.push(element);
        localStorage.setItem('stars', JSON.stringify(starsobj));
    } else {
        a.style.color = "lightgray";
        for (var i = 0; i < starsobj.length; i++) {

            if (starsobj[i] === element) {
                starsobj.splice(i, 1);
            }

        }
        localStorage.setItem('stars', JSON.stringify(starsobj));
    }

}

//FUNCTION TO SHOW THE STARS THAT ARE STORED IN LOCAL STORAGE WHEN THE WEBSITE IS RELOADED OR WHEN WE ADD A NOTE(AS SHOWNOTES FUNCTION IS RUNNS WHEN WE ADD A NOTE)
function onload_stars() {
    let stars = localStorage.getItem('stars');
    let starsobj;
    if (stars == null) {
        starsobj = [];
    }
    else {
        starsobj = JSON.parse(stars);
    }
    if (starsobj.length == 0) {
        console.log("nothing to show");
    }
    else {
        Array.from(JSON.parse(localStorage.getItem('stars'))).forEach(function (element) {
            // console.log(element);
            let a = document.getElementById(element);
            a.style.color = "#0800ff";

        });
    }

}

//CODE TO FILTER THE SEARCHED NOTE
let search = document.getElementById('searchText');
search.addEventListener('input', function () {
    let inputVal = search.value;

    //CODE TO HIDE THE MAGIC NOTES INPUT FROM THE SCREEN
    let notesCard = document.getElementsByClassName('notesCard');
    console.log(notesCard);
    let input_note = document.getElementsByClassName('hide');
    Array.from(input_note).forEach(function (element) {
        element.style.display = 'none';
    }
    );

    //IN ORDER TO MAKE THE COMPARISON BETWEEN TEXT IN THE SEARCH BUTTON AND THE NOTES CASE INSENSITIVE AND SPACE INSENSITIVES BY MAKING WHOLE TEXT TO LOWERCASE AND REMOVING THE SPACE IN STARTING AND ENDING OF THE TEXT USING TRIM()
    inputVal = inputVal.toLowerCase();
    inputVal = inputVal.trim();


    //RUNNING FOR EACH NOTESCARD ELEMENT
    Array.from(notesCard).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        let noteTitle = element.querySelector(".noteTitle").innerText;
        console.log(typeof (cardTxt), cardTxt, noteTitle);

        //IN ORDER TO MAKE THE COMPARISON BETWEEN TEXT IN THE SEARCH BUTTON AND THE NOTES CASE INSENSITIVE AND SPACE INSENSITIVE
        cardTxt = cardTxt.toLowerCase();
        cardTxt = cardTxt.trim();
        noteTitle = noteTitle.toLowerCase();
        noteTitle = noteTitle.trim();

        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else if (noteTitle.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})

//FUNCTION TO SHOW THE MAGIC NOTES INPUT AND THE NOTES THAT HAVE BEEN HIDDEN WHICH WERE NOT FOUND IN EARLIER SEARCH
function onblurfun() {
    let input_note = document.getElementsByClassName('hide');
    Array.from(input_note).forEach(function (element) {
        element.style.display = 'block';
    }
    );
    let notesCard = document.getElementsByClassName('notesCard');
    Array.from(notesCard).forEach(function (element) {
        element.style.display = 'block';
    }
    );
    search.value = "";
};
