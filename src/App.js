import React, {useState} from 'react';
import SearchAPI from "./searchAPI"
import CurList from "./curList"

// I prefer functinal components for its terse and elegant presentation
const App = () => {

  //charDict centralizes user's hero list as a dictionary
  //charDict will be synchronized to all the other components 
  const [charDict, setDict] = useState({})
  
  //pass this function to API searcher to update 
  const addChars = (chars) => {
    let dict = {}
    chars.forEach(char => {
        dict[char.name] = {
          pwrStat: char.pwrStat,
          imgLnk: char.imgLnk,
        }
    })
    setDict({...charDict, ...dict})
  }

  //pass this function to child component "heroList" to remove heros and render the chart
  const rmvChars = (chars) => {
    let dict = JSON.parse(JSON.stringify(charDict)) //clone the existent charDict
    chars.forEach(char => {delete dict[char.name]})
    setDict(dict)
  }

  //use Bootstrap library to reach responsive design
  //the two main components are SearchAPI and CurList
  return (
    <div className="container bg-light py-3">
      <div className="row">
        <div className="col-10 mx-auto">
          <h4 className="display-4 my-3">Super Hero Search Engine</h4>
          <h5 className="mt-2">Find your favorite hero(s) and compare their power with other heros</h5>
          <p className="lead">
          1. Input a hero's name in the search bar and then hit search button<br/>
          2. Add the hero(s) in your list. (We only serve justice, so bad heros are out.<br/>
          3. Select heros in your list and customize a powerStat comparison for them!
          </p>
          <SearchAPI addChars = {(chars) => addChars(chars)} charDict = {charDict}/>
          <CurList rmvChars = {(chars) => rmvChars(chars)} charDict = {charDict} />
        </div>
      </div>
    </div>
  );
}

export default App;