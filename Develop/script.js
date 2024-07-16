// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var today = dayjs().format('ddd, MMM DD YYYY');
  var currentHour = dayjs().hour();

  var timeBlockEl = document.getElementsByClassName("time-block");
  var timeBlock = document.getElementById("hour-"+currentHour);
  var currentDayEl = document.getElementById("currentDay");
  var currentTimeBlock = document.getElementById("hour-"+currentHour);
  var calendarEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];

  var saveButton = document.querySelectorAll(".saveBtn");

  Object.entries(timeBlockEl).forEach(([key, value]) => {
    var timeBlockId = value.id;
    var timeBlockHour = timeBlockId.substring(7,5);

    Object.entries(calendarEvents).forEach(([key, value]) => {
        if(value.hour == timeBlockHour){
            
            var calendarHour = document.getElementById("hour-"+timeBlockHour);
            document.querySelector("#hour-"+timeBlockHour +" > .description").value = value.value;
        }
    });

    if(timeBlockHour > currentHour){
      value.classList.remove("past");
      value.classList.add("future");
      value.classList.remove("present");
     }else if(timeBlockHour < currentHour){
      value.classList.add("past");
      value.classList.remove("future");
      value.classList.remove("present");
     }else{
      value.classList.remove("past");
      value.classList.remove("future");
      value.classList.add("present");
    }
  }
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  saveButton.forEach(function(button){
    button.addEventListener("click", function(){
        var parentId = this.parentNode.id;
        var parentEl = document.querySelector("#"+parentId);
        var parentHour = parentId.substring(7,5);
        var textAreaEl = parentEl.querySelector('.description');
        var task = textAreaEl.value;
        var calendarEvent = [];

        var obj = calendarEvents.find(function(entry) { 
            return entry.hour === parentHour; 
        });
        if (obj) {
            obj.value = task;
        } else {
            calendarEvents.push({hour: parentHour, value: task});
        }
    
        localStorage.setItem("calendarEvents", JSON.stringify(calendarEvents));

    });
  })
})