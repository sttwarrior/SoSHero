import React, {useState} from "react"
import HeroList from "./heroList"

// style corresponding to msgTypes: 
// std prompt: black
// text-danger: red
// text-success: green
const PromptMsg = (props) => <h6 className={props.msgType}>{props.msg}</h6>

const SearchAPI = (props) => {

    // Hooker which updates prompt msg
    const [prompt, setPrompt] = useState(
        <PromptMsg msg="Search for your favorite super heros!" msgType=""/>)
 
    // Hooker to store data fetched from API
    const [queryList, setQuery] = useState([])

    // Create a map to track selected heros
    const selList = new Array(queryList.length).fill(false)

    // Call SuperHero API to fetch data
    const apiCall = (heroName) => {
        
        // Because I can't pass CORS check of Chrome, I use a proxy to send request.
        // Sometimes the proxy is busy and slow down the whole webapp or even reject requests.
        const proxySever = "https://cors-anywhere.herokuapp.com/"
        // const proxySever = "" 
        fetch(`${proxySever}https://superheroapi.com/api/3023293161017339/search/${heroName}`
        )
        .then(response => {
            // fetch data, use promise.
            return response.json()
        })
        .then(data => {
            // Work with JSON data here
            let badHero = false //record if we filter some bad heros and prompt the user
            let query = [] 
            let msgBad = "Found a bad hero matching your search...but we only serve justice! "
            let msgSuc = "Now add the heroes to your list!"

            //push data if get successful feedback
            if(data.response === "success"){
                data.results.forEach(hero => {
                    //use hero name as the charDict's unique key at the App.js
                    let name = hero.biography["full-name"]?`${hero.name} (${hero.biography["full-name"]})`:hero.name
                    if(name in props.charDict){return} //skip if the hero is already in the list
                    if(hero.biography["alignment"] ==="bad"){
                        badHero = true //change flag
                        return
                    }
                    query.push({
                        name: name,
                        pwrStat: hero.powerstats,
                        imgLnk: hero.image.url,
                    })
                });
                
                //set prompt msg
                if(query.length!==0){
                    setPrompt(
                        <PromptMsg msg={badHero?msgBad+msgSuc:msgSuc} msgType="text-success"/>
                    )
                }else{
                    setPrompt(
                        <PromptMsg msg={badHero?msgBad:"The hero(s) is already in your list!"} msgType="text-danger"/>
                    )
                }
                setQuery(query)

            //Successfully connect the API but without a match
            }else if(data.response === "error"){
                setPrompt(<PromptMsg msg="No match for your search...please try another one." msgType="text-danger"/>)

            }
        })
        .catch(err => {
        //Fail to connect to API, either because of the CORS issue and can't reach the proxy mediator 
            if(err instanceof TypeError && err.message === "Failed to fetch"){
                setPrompt(
                    <PromptMsg msg="The proxy server is not avalible now...please try it later!" msgType="text-danger"/>
                )
            }else{setPrompt(<PromptMsg msg="Unknow Error, not able to fetch data" msgType="text-danger"/>)}
        })
    }

    //search eventHandler
    const searchChars = (e) => {
        setPrompt(<PromptMsg msg="Searching...waiting for reponse from the API server" msgType=""/>)
        e.preventDefault()
        let charName = e.target.Name.value
        charName = charName.replace(/\s/g, "") //Trim off whitespaces
        if(charName === ""){
            setPrompt(<PromptMsg msg="Sorry, the input can't be blank." msgType="text-danger"/>)
        }
        else{apiCall(charName)} //call API to search
    };

    //Record the user's selection
    const selListener = (listID, sel) => {
        selList[listID] = sel
    }

    //Update selected heros to charDict. This will cause rerendering component curList.
    const addChars = (e) =>{
        let list = []
        for (let i=0; i<selList.length; i++){
            if (selList[i]) {list.push(queryList[i])}
        }
        if(list.length !== 0){
            props.addChars(list)
            setPrompt(<PromptMsg msg="The hero(s) has been added in your list." msgType="text-success"/>)
        }else if(queryList.length === 0){
            setPrompt(<PromptMsg msg="Please search for a hero first!" msgType="text-danger"/>)

        }else(
            setPrompt(<PromptMsg msg="Don't forget to select someone!" msgType="text-danger"/>)
        )
    }
    
    return(
        <div className="container-fluid mt-3">
            <div className="row">
                    
                <div className="col">
                    <form className="form" onSubmit = {searchChars}>
                        <input
                            type="text"
                            name="Name"
                            placeholder="Input a hero's name!"
                        />                        
                        <input type="submit" value="Search"/>
                        <input type="button" value="Add Hero" onClick={addChars} />
                    </form>                
                </div>
                <div className="col">
                    {prompt}
                </div>
            </div>
            <div className="row mt-2">
                <HeroList charList={queryList} listUpdater={(listID, sel) => selListener(listID, sel)}/>
            </div>        
        </div>
    )
    
}

export default SearchAPI