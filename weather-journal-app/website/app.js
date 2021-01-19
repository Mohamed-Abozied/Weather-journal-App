/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '';

// Event listener to add function to existing HTML DOM element & Function called by event listener */
document.getElementById('generate').addEventListener('click', ()=>{


  const newZip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  if(!newZip || !feelings){
    alert('Please Fill The Boxes!');
    return;
  }

  getWeather(newZip)
  .then((data)=>{

    postData('http://localhost:3000/add', {
      temp: data.main.temp , 
      date: newDate, 
      feelings: feelings});
  })

  .then(()=>updateUI());
});

/* Function to GET Web API Data*/
const getWeather = async (newZip)=>{
  const res = await fetch(`${baseURL}${newZip}${apiKey}`)
  try{
    const data = await res.json();
    return data;
    
  } catch(error){
    console.log('error', error);
  }
}


/* Function to POST data */ 
const postData = async ( baseURL = '', data = {})=>{
    
  const req = await fetch(baseURL, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)       
  });

    try {
      const newData = await req.json();
      console.log('post data',newData);
      return newData;
    }
    catch(error) {
      console.log("error", error)
    }
}
/* Updating UI with the latest Data */
const updateUI = async ()=>{
  const req = await fetch('http://localhost:3000/all');

  try{
    const allData = await req.json();
    document.getElementById('date').innerHTML = 'Date :' + allData.date;
    document.getElementById('temp').innerHTML = 'Temprature :' + allData.temp;
    document.getElementById('content').innerHTML = 'Feeling :' + allData.feelings;

  }catch(error){
    console.log('error', error);
  }
}