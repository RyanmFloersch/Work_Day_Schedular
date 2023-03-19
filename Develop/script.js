// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //


  var timeBlock = document.querySelectorAll('.time-block');

  for (block of timeBlock){
    block.addEventListener('click', function(event){
      var targetElement = event.target;      
      if(event.target.classList.contains('saveBtn')){
        var descri = this.querySelector('.description');
        localStorage.setItem(this.id, descri.value);

      }

    });

  }






  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

var now = dayjs(); 
console.log(now.date());
console.log(now.day());
console.log(now.year());


function setUserData(){
  for(var i =0; i < localStorage.length; i++){
    var elements =localStorage.key(i);
    var elementID = '#' + elements; 
    var elementValue = localStorage.getItem(elements);
    var retrievedElement = document.querySelector(elementID);
    var descri = retrievedElement.querySelector("textarea");
    descri.value = elementValue;    
  }
}

function setState(){

  var blocks = document.querySelectorAll(".time-block");
  var currentHour = "hour-" + dayjs().format('HH');
  
  currentHour = parseInt(currentHour.slice(5));
  console.log(currentHour);
  for( el of blocks){
    el.classList.remove('past');
    el.classList.remove('present');
    el.classList.remove('future');
    var elementHour = parseInt(el.id.slice(5));
    if(elementHour == currentHour){
      el.classList.add('present');
    }else if(elementHour < currentHour){
      el.classList.add('past');
    }else if(elementHour > currentHour){
      el.classList.add('future');
    }

  }

}



function getSuffix(day){
  number = parseInt(day);
  if( number == 1){
    return 'st';
  }else if(number == 2){
    return 'nd';
  }else if( number == 3 ){
    return '';
  }else{
    return "th";
  }
}

function setDate(){


  var date = dayjs().format('dddd,MMMM DD' );
  var suffix = getSuffix(dayjs().day())
  
  date = date + suffix;
  console.log(date);


  var dateArea = document.querySelector("#currentDay");
  dateArea.innerText1 = date;

}

setDate();
setUserData();
setState();


});
