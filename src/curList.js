import React,{useState} from "react"
import HeroList from "./heroList"
import DataVis from "./dataVis"

// style corresponding to msgTypes: 
// std prompt: black
// text-danger: red
// text-success: green
const PromptMsg = (props) => <h6 className={props.msgType}>{props.msg}</h6>

//this component present the user's list of heros and pass data to visualizer
const CurList = (props) => {
    
    const [prompt, setPrompt] = useState(
        <PromptMsg msg="Select heros to compare their PowerStats!" msgType="stdPrmt"/>)
    
    const [compList, setComp] = useState([])
    const curList = []
    for (let char in props.charDict){
        curList.push({
            name: char,
            pwrStat: props.charDict[char].pwrStat,
            imgLnk: props.charDict[char].imgLnk,
        })
    }
    const selList = new Array(curList.length).fill(false) //default they are all unselected
    
    //update selected heros
    const selListener = (listID, sel) => {
        selList[listID] = sel
    }

    //update heros in the charDict and remove selected ones
    const rmnChars = (e) =>{
        let list = []
        for (let i=0; i<selList.length; i++){
            if (selList[i]) {list.push(curList[i])}
        }
        if(list.length !== 0){
            props.rmvChars(list)
            setPrompt(<PromptMsg msg="Hero(s) have been removed" msgType="text-success"/>)
        }else(
            setPrompt(<PromptMsg msg="Don't forget to select a hero!" msgType="text-danger"/>)
        )  
    }

    //generate an array of data according to the user's selection and process them into a format for visualization
    const compChars = (e) => {
        let list = []
        for (let i=0; i<selList.length; i++){
            if (selList[i]) {
                let char = curList[i]
                list.push({
                    name: char.name,
                    intelligence:(char.pwrStat.intelligence!=="null") ? char.pwrStat.intelligence : 0,
                    strength:    (char.pwrStat.strength!=="null")     ? char.pwrStat.strength : 0,
                    speed:       (char.pwrStat.speed!=="null")        ? char.pwrStat.speed : 0,
                    durability:  (char.pwrStat.durability!=="null")   ? char.pwrStat.durability : 0,
                    power:       (char.pwrStat.power!=="null")        ? char.pwrStat.power : 0,
                    combat:      (char.pwrStat.combat!=="null")       ? char.pwrStat.combat : 0
                })
            }
        }
        //prevent some edge cases
        if(list.length !== 0){
            setComp(list)
            setPrompt(<PromptMsg msg="The comparison has been generated" msgType="text-success"/>)
        }else(
            setPrompt(<PromptMsg msg="Don't forget to select a hero!" msgType="text-danger"/>)
        )      
    }
    
    return(
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col">  
                    <input type="button" value="Remove Hero" onClick={rmnChars} />
                    <input type="button" value="Go Compare!" onClick={compChars} />
                    <br/>
                    <br/>
                    Current Heros:
                </div>
                <div className="col">
                    {prompt}
                </div>
            </div>
            <div className="row mt-2">
                <HeroList charList={curList} listUpdater={(listID, sel) => selListener(listID, sel)}/>
            </div>
            <div className="row mt-2">
                <DataVis compList = {compList}/>
            </div>
        </div>
    )
}

export default CurList