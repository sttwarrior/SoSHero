import React, {useState, useEffect} from "react"

//when clicked, this component will appear in different visual effect and 
//update its grand-parent component, searchAPI or curList
const Hero = (props) => {

    const [heroSel, selHero] = useState(false)
    useEffect(() => {props.update(props.listID, heroSel)}) //update the state to its grand-parent

    //if the hero does not have a online photo, use the local one
    const imgLnk = (props.hero.imgLnk !== "")? props.hero.imgLnk : require("./img/unknown.jpg")
    return(
        <div className={"col-6 col-sm-4 col-md-3 col-lg-2 text-center p-2"}
             style={{backgroundColor: heroSel?"#e1f0e9":"#f4f9f7"}} 
             onClick={() => selHero(!heroSel)}
        >
            {heroSel?<span className="text-dark">SELECTED</span>:<span className="text-secondary">UNSELECTED</span>}
            <br/>
            <img className="rounded mx-auto" src={imgLnk} alt={props.hero.title} width={"100%"} height={"auto"}/>
            <br/>
            {props.hero.name}
        </div>
    )
}

//to render multiple <Hero /> components
const HeroList = (props) => {
    return props.charList.map( (char, index) => {
        return <Hero hero={char} key={char.name} listID={index} update={(listID, sel) => props.listUpdater(listID, sel)}/>
    })
}
export default HeroList