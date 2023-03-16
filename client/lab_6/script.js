/*
  Hook this script to index.html
  by adding `<script src="script.js">` just before your closing `</body>` tag
*/

/* A quick filter that will return something based on a matching input */
function filterList(list, query) {
  return list.filter((item) =>{
     const lowerCaseName = item.name.toLowerCase();
     const lowerCaseQuery = query.toLowerCase();
     return lowerCaseName.includes(lowerCaseQuery);

  })
  /*
    Using the .filter array method, 
    return a list that is filtered by comparing the item name in lower case
    to the query in lower case

    Ask the TAs if you need help with this
  */
}
function getRandomIntInclusive(min,max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max-min+1) + min);
}

function injectHTML(){
  console.log('fired injectHTML');
  const target = document.querySelector("#restaurant_list");
  target.innerHTML = '';
  list.array.forEach((item) => {
    const str = `<li>${item.name}</li>`;
    target.innerHTML += str
  });
}

function cutRestaurantList(list){
  console.log("fired cut list");
  const range = [...Array(15).keys()];
  return newArray = range.map((item) =>{
    const index = getRandomIntInclusive(0,list.length -1);
    return list[index]
  })
}

async function mainEvent() { // the async keyword means we can make API requests
  const mainForm = document.querySelector('.main_form'); // This class name needs to be set on your form before you can listen for an event on it
  const filterButton = document.querySelector("#filter_button")
  const loadDataButton = document.querySelector("#data_load")
  const generateListButton = document.querySelector("#generate")
  // Add a querySelector that targets your filter button here
  const loadAnimation = document.querySelector("#data_load_animation");
  loadAnimation.style.display = "none";
  
  let currentList = []; // this is "scoped" to the main event function
  
  /* We need to listen to an "event" to have something happen in our page - here we're listening for a "submit" */
  loadDataButton.addEventListener('click', async (submitEvent) => { // async has to be declared on every function that needs to "await" something     
    console.log('Loading data'); 
    loadAnimation.style.display = "inline-block";

    /*
      ## GET requests and Javascript
        We would like to send our GET request so we can control what we do with the results
        Let's get those form results before sending off our GET request using the Fetch API
    
      ## Retrieving information from an API
        The Fetch API is relatively new,
        and is much more convenient than previous data handling methods.
        Here we make a basic GET request to the server using the Fetch method to the county
    */

    // Basic GET request - this replaces the form Action
    const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');

    // This changes the response from the GET into data we can use - an "object"
    currentList = await results.json();
    loadAnimation.style.display = "none";
    console.table(currentList); 

  });

filterButton.addEventListener('click',(event) => {
 console.log("clicked FilterButton");

 const formData = new FormData(mainForm)
 const formProps = Object.fromEntries(formData);

 console.log(formProps);
 const newList = filterList(currentList, formProps.resto);

 console.log(newList);
 injectHTML(newList);
})

}
generateListButton.addEventListener('click', (event)=> {
  console.log('generate new list');
  const cutRestaurantList = cutRestaurantList(currentList);
  console.log(restaurantsList)
  injectHTML(restaurantsList);
})

/*
  This adds an event listener that fires our main event only once our page elements have loaded
  The use of the async keyword means we can "await" events before continuing in our scripts
  In this case, we load some data when the form has submitted
*/
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
