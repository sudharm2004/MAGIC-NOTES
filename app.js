console.log('welcome to notes app');
window.onload = showNotes();

//CODE TO MAKE TITLE AND NOTES EDITABLE
var originalNotesTitle = "";
var originalNotes = "";
//TO SAVE THE INNERTEXT OF TITLE ON CLICK
function saveTitle(element) {
    originalNotesTitle = element;
    originalNotesTitle=originalNotesTitle.replace(/\n/g, '<br>');
    // console.log(originalNotesTitle);
}
//TO SAVE THE INNERTEXT OF TITLE ON BLUR INTO THE LOCAL STORAGE
function editTitle(element) {
    var text = element;
    text=text.replace(/\n/g, '<br>');
    // console.log(text);
    let notesobj = JSON.parse(localStorage.getItem('notes'));
    notesobj.forEach(function (elem, index) {
        if (elem.title == originalNotesTitle) {
            elem.title = text;
        }
    });
    localStorage.setItem('notes', JSON.stringify(notesobj));
}
//TO SAVE THE INNERTEXT OF NOTES ON CLICK
function saveNotes(element) {
    // console.log(element);
    originalNotes = element;
    originalNotes=originalNotes.replace(/\n/g, '<br>');

}
//TO SAVE THE INNERTEXT OF NOTES ON BLUR INTO THE LOCAL STORAGE
function editNotes(element) {
    // console.log(element);
    var text = element;
    text=text.replace(/\n/g, '<br>');
    let notesobj = JSON.parse(localStorage.getItem('notes'));
    notesobj.forEach(function (elem, index) {
        if (elem.notes == originalNotes) {
            elem.notes = text;
        }
    });
    localStorage.setItem('notes', JSON.stringify(notesobj));
}

//FUNCTION TO CHECK WHETEHER THE SAME TITLE IS ALREADY PRESENT OR NOT
function checkTitle(title) {
    // console.log('checkTitle');
    // console.log(title);
    let notes = localStorage.getItem('notes');
    let notesobj = JSON.parse(notes);
    if(notes !=null)
    {
        for (let i = 0; i < notesobj.length; i++) {
            if (notesobj[i].title == title) {
                console.log('true');
                return 1;
            }
        }
    }
    
    return 0;
}

//GRABBING ADD NOTES WALA BUTTON U
let addBtn = document.getElementById('addBtn');

//ADDING EVENT LISTNER TO THE ADD NOTES WALA BUTTON THAT WILL STORE THE VALUE IN LOCAL STORAGE FIRST AND THEN USING showNotes() FUNCTION IT WILL PRINT ALL THE NOTES WE ADDED
addBtn.addEventListener('click', function () {
    //GRABBING THE TEXT AREA IN WHICH WE ARE WRITING THE THE NOTE
    let addTxt = document.getElementById('addTxt');
    let noteTitle = document.getElementById('addTitle');
    addTitle.value=addTitle.value.replace(/\n/g, '<br>');
    addTitle.value=addTitle.value.trim();
    if (addTitle.value == "" || addTxt.value == "") {
        alert("Please fill all the fields");
    }
    else if (checkTitle(addTitle.value)==1) {
        alert("Title already exists");
    }
    else {
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
            star:-1
        }
        notes_title_obj.notes = notes_title_obj.notes.replace(/\n/g, '<br>');
        //adding the text that we enetered into notesobj array
        notesobj.push(notes_title_obj);
        //now to store the array(notesobj) we use stringify
        localStorage.setItem('notes', JSON.stringify(notesobj));
        addTxt.value = "";
        addTitle.value = "";
        showNotes();
    }
});


//FUNCTION TO ADD NOTES 
function showNotes() {
    // console.log('shownotes called');
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
    <div style="display:flex; justify-content:space-between;">
        <h4 class="card-title noteTitle" contenteditable="true" onclick="saveTitle(this.innerText)" onblur="editTitle(this.innerText)" style="max-width:190px;">${element.title}</h4><span class="fa fa-star checked fa-lg star-icon" onclick="star(this.id)" id="${index * 100 + 1}" style="color: black;"></span>
    </div>
    <hr>
      <p class="card-text" contenteditable="true" onclick="saveNotes(this.innerText)" onblur="editNotes(this.innerText)">${element.notes}</p>
      <a id="${index}" class="btn btn-primary" onclick="deleteNote(this.id)">Delete Note</a>  


    </div>
  </div>
`;
    });
    let addelm = document.getElementById('notes');
    //NOTESOBJ IS [] IF ALL THE NOTES CREATED ARE DELETED AND PAGE IS RELOADED AGAIN....SO ITS LENGTH IS ZERO SO WE WRITE WHAT IS WRITTEN IN IF CONDITION
    if (notesobj.length == 0) {
        addelm.innerHTML = `Nothing to show "Add Notes"`
    } else {
        addelm.innerHTML = html;
    }
    onload_stars();
}


//FUNCTION TO DELETE THE NODE
function deleteNote(id) {
    //CODE TO REMOVE THE NOTE(DESIRED NOTE) TEXT FROM LOCAL STORAGE
    let notes = localStorage.getItem('notes');
    let notesobj = JSON.parse(notes);
    notesobj.splice(id, 1);
    let id_star=id*100+1;
    //CODE TO CHANGE THE VALUE OF STARS BY -100 THAT ARE GREATER THAN CURRENT VALUE TO MAKE IT SAME AS BEFORE DELETION
    notesobj.forEach(element => {
            if (element['star']>id_star) {
                element['star'] = element['star']-100;
        }
    });
    localStorage.setItem('notes', JSON.stringify(notesobj));
    showNotes();
}

function sortNote() {
    let notes = localStorage.getItem('notes');
    let notesobj;
    if (notes == null) {
        notesobj = []
    }
    else {
        notesobj = JSON.parse(notes);
    }
    // console.log(notesobj);
    let starsarray=[];
    let unstarsarray=[];
    notesobj.forEach(function (element) {
        if (element['star']>-1) {
            starsarray.push(element);
        }
        else{
            unstarsarray.push(element)
        }
    });
    starsarray.forEach(function (element,index) {
        element['star']=index*100+1;
    })
    notesobj=starsarray.concat(unstarsarray);
    localStorage.setItem('notes', JSON.stringify(notesobj));
    // console.log(notesobj);
    // console.log('sortnote called');
    showNotes();
}

//FUNCTION TO CHANGE THE COLOR OF STAR AND STORING ITS ID IN LOCAL STORAGE
function star(element) {
    let star=document.getElementById(element);
    let notes = localStorage.getItem('notes');
    let title = star.previousElementSibling.innerText
    let notesobj;
    if (notes == null) {
        notesobj = []
    }
    else {
        //since we have stored the string entered as array we use parse to access the array of 
        //strings
        notesobj = JSON.parse(notes);
    }
    // console.log(star.style.color)
    if (star.style.color == "black") {
        star.style.color = "#0800ff";
        notesobj.forEach(function (elem,index) {
            if (elem['title']==title) {
                elem['star']=element;
            }
        })
    } else {
        // console.log(notesobj);
    // console.log(star,title);
        star.style.color = "black";
        notesobj.forEach(function (elem,index) {
            if (elem['title']==title) {
                elem['star']=-1;
            }
        })
    }
    localStorage.setItem('notes', JSON.stringify(notesobj));
    // console.log(notesobj);
    sortNote();
}

//FUNCTION TO SHOW THE STARS THAT ARE STORED IN LOCAL STORAGE WHEN THE WEBSITE IS RELOADED OR WHEN WE ADD A NOTE(AS SHOWNOTES FUNCTION IS RUNNS WHEN WE ADD A NOTE)
function onload_stars() {
    // console.log('onload_stars called');
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
    if (notesobj != null)  {
        if (notesobj.length!=0) {
            notesobj.forEach(element => {
                if (element['star']>-1) {
                    let star= document.getElementById(element['star']);
                    star.style.color = "#0800ff"; 
                }
            });   
        }
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
        // console.log(typeof (cardTxt), cardTxt, noteTitle);

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
