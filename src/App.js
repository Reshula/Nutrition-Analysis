import { useEffect, useState } from 'react';
import  LoaderPage  from './Loader/LoaderPage';
import { Nutrition } from "./Nutrition";
import Image from './nutrition.jpg';
import imageGym from './gym-nutrition.jpg'
import ImageScale from './screen-nutrition.jpg';
import Swal from 'sweetalert2';
import './App.css';


function App() {

const MY_ID = 'a97dc4d3';
const MY_KEY = '196b95d36fd654dc4afdf2ad74370b0c'


const [mySearch, setMySearch] = useState ();
const [wordSubmmited, setWordSubmmited] = useState('');
const [myNutrition, setMyNutrition] = useState ();
const [stateLoader, setStateLoader] = useState(false);


const getNutrition = async (ingr) =>{
  setStateLoader(true);
  const response = await fetch(`https://api.edamam.com/api/nutrition-details?app_id=${MY_ID}&app_key=${MY_KEY}`,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingr: ingr })
    
  })

   

  if(response.ok) {
    setStateLoader(false);
    const data = await response.json();
    console.log(data)
    setMyNutrition(data);
  }
    else {
      setStateLoader(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Add unit!",
        
      });

  }

}

useEffect(() => {
  if (wordSubmmited !== '') {
    let ingr = wordSubmmited.split(/[,,;,\n,\r]/);
    getNutrition(ingr);
  }
}, [wordSubmmited])


useEffect(() =>{
const timer = setTimeout (() =>setStateLoader(false), 3000);
return() => clearTimeout(timer)

}, [])

const myRecipeSearch = e => {
  setMySearch(e.target.value);
}
const finalSearch = e => {
  e.preventDefault();
  setWordSubmmited(mySearch);
}
  return (
    <div className="App">
      {stateLoader && <LoaderPage />}
      <div>
      <ul className="nav">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About Us</a></li> 
      </ul>
      </div>
      <div className='image-container'>
      <img  src={Image} alt="food" className="hero-img"  />
      <div className="centered">
        <h1> Nutrition Tracking Made Easy</h1>
      <form onSubmit={finalSearch}>
        <input
          placeholder="Search food..."
          onChange={myRecipeSearch}
        />
        <button type="submit">Get Started</button>
      </form>
      </div>
      </div> 
      <div className='imageScale-container'>
      <img className='ImageScale'  src={ImageScale} alt ='scale'/>
      <div className="bottom-center">
        <h3> A Better Food Diary Experience</h3>
        <p>Our food database is curated by trained staff to avoid the errors, missing nutrition data, and duplicates that plague other food diary services.</p>
      </div>
      </div>
      <div className='table'>
        {
          myNutrition && <p>{myNutrition.calories} kcal</p>
        }
        {
          myNutrition && Object.values(myNutrition.totalNutrients)
            .map(({ label, quantity, unit,index }) =>
              <Nutrition
               key={index}
                label={label}
                quantity={quantity}
                unit={unit}
              />
            )
        }
      </div>
      <div className='container-gym'>
        <img className='image-gym' src={imageGym} alt='gym'/>
        <div className='position-left'>
          <h3>Premium Features Are Standard</h3>
        </div>
      </div>
    </div>
  );
}

export default App;
