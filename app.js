console.log('welcome to notes app');

//GRABBING ADD NOTES WALA BUTTON U
let addBtn = document.getElementById('addBtn');

//ADDING EVENT LISTNER TO THE ADD NOTES WALA BUTTON THAT WILL STORE THE VALUE IN LOCAL STORAGE FIRST AND THEN USING showNotes() FUNCTION IT WILL PRINT ALL THE NOTES WE ADDED
addBtn.addEventListener('click', function () {
    //GRABBING THE TEXT AREA IN WHICH WE ARE WRITING THE THE NOTE
    let addTxt = document.getElementById('addTxt');
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
    //adding the text that we enetered into notesobj array
    notesobj.push(addTxt.value);
    //now to store the array(notesobj) we use stringify
    localStorage.setItem('notes', JSON.stringify(notesobj));
    addTxt.value = "";
    showNotes();
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
    let html = "";
    notesobj.forEach(function (element, index) {
        html += `
<div class="notesCard my-2 mx-2 card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${'NOTE' + (index + 1)}</h5>
      <p class="card-text">${element}</p>
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


window.onload = showNotes();

//FUNCTION TO DELETE THE NODE
function deleteNote(index) {
    // console.log(index);
    //CODE TO REMOVE THE NOTE(DESIRED NOTE) TEXT FROM LOCAL STORAGE
    let notes = localStorage.getItem('notes');
    let notesobj;
    if (notes == null) {
        notesobj = []
    }
    else {
        notesobj = JSON.parse(notes);
    }
    notesobj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesobj));
    showNotes();
}

//CODE TO FILTER THE SEARCHED NOTE
let search=document.getElementById('searchText');
search.addEventListener('input',function () {
    let inputVal=search.value;
    // console.log('input event fired',inputVal)

    let notesCard=document.getElementsByClassName('notesCard');
    //RUNNING FOR EACH NOTESCARD ELEMENT
    Array.from(notesCard).forEach(function (element) {
        let cardTxt=element.getElementsByTagName("p")[0].innerText;
        // console.log( typeof(cardTxt),cardTxt);
        if (cardTxt.includes(inputVal)) {
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    })
})
