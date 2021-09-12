import Head from 'next/head';

//import getAllIds function
  //this will take the information from the created json string to this pasge
import {getAllIds , getData } from "../lib/data.js"

//create instance of getStaticProps to return the data for one person
  //this will load everytime id.js loads for a specific route (ie: /1, /2 ...etc)
export async function getStaticProps({params} /*params from getAllIds function*/){

  //asynchronus to execute when receiving param from the getAllIds()
  const itemData = await getData(params.id /* get the param and then find the id property to send back*/);
  return {
    props:{
    itemData
    } 
  };
}

//create an instance of the getStaticPaths() to report to next all the dynamic urls
export async function getStaticPaths(){
  //call the json data from api/get.js
  const allPaths = getAllIds();
  return {
    allPaths,
    fallback: false; //what happens if a dynamic path doesnt exist 404 error
  };
}


//react component with the data acquired
export default function Entry({itemData}){
  <article class="card col-6">
    <div class="card-body">
      <h5 class="card-title">
        <a href="https://finalfantasy.fandom.com/wiki/Ryne">{itemData.character}</a>
      </h5>
      <h6 class="card-subtitled mb-2 text-text-muted">
        <a href="https://en.wikipedia.org/wiki/Final_Fantasy_XIV:_Shadowbringers">{itemData.game}</a>
      </h6>
      <p class="card-text">{itemData.year}</p>
      <p class="card-text">{itemData.genre}</p>
    </div>
  </article>
}