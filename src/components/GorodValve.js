import { useEffect, useState } from 'react';
import './css/ValveButton.css';

const LocationData = [
    { Name:"Dragon Command",
    },
    {Name:"Armory",  
    },
    {Name:"Supply Depot",
    },
    {Name:"Infirmary", 
    },
    {Name:"Tank Factory",
    },
    {Name:"Department Store",
    }
]

const PathData = {
    "Dragon Command": {
        1:"Supply Depot",
        2:"Department Store",
        3:"Infirmary"
        },
    "Armory":{
        1:"Supply Depot",
        2:"Tank Factory",
        3:"Department Store"
      },
    "Supply Depot":{
        1:"Dragon Command",
        2:"Armory",
        3:"Tank Factory"
      },
    "Infirmary":{
        1:"Department Store",
        2:"Tank Factory",
        3:"Dragon Command"
    },
    "Tank Factory":{
        1:"Infirmary",
        2:"Supply Depot",
        3:"Armory"
      },
    "Department Store":{
        1:"Armory",
        2:"Infirmary",
        3:"Dragon Command"
      }
    }

const HandleButtonLogic = (location,set_state,curr_state,colors) => {
    if(curr_state === colors["Selected"]){set_state[location](colors["Regular"]); return}
    for (const key of Object.keys(set_state)){
        if(key === location){
            set_state[location](colors["Selected"]) 
            
        } else{set_state[key](colors["Regular"])}
    }
    
    }

function GorodValves() {
    //------Variable declarations-------
    const [GreenDCState, setGreenDCState] = useState("RegularGreen");
    const [GreenAState, setGreenAState] = useState("RegularGreen");
    const [GreenSDState, setGreenSDState] = useState("RegularGreen");
    const [GreenIState, setGreenIState] = useState("RegularGreen");
    const [GreenTFState, setGreenTFState] = useState("RegularGreen");
    const [GreenDSState, setGreenDSState] = useState("RegularGreen");

    const [PinkDCState, setPinkDCState] = useState("RegularPink");
    const [PinkAState, setPinkAState] = useState("RegularPink");
    const [PinkSDState, setPinkSDState] = useState("RegularPink");
    const [PinkIState, setPinkIState] = useState("RegularPink");
    const [PinkTFState, setPinkTFState] = useState("RegularPink");
    const [PinkDSState, setPinkDSState] = useState("RegularPink");

    const GreenLocationStates = {
    "Dragon Command":GreenDCState,
    "Armory":GreenAState,
    "Supply Depot":GreenSDState,
    "Infirmary":GreenIState,
    "Tank Factory":GreenTFState,
    "Department Store":GreenDSState
    }

    const PinkLocationStates = {
    "Dragon Command":PinkDCState,
    "Armory":PinkAState,
    "Supply Depot":PinkSDState,
    "Infirmary":PinkIState,
    "Tank Factory":PinkTFState,
    "Department Store":PinkDSState
    }

    const GreenLocationStateCalls = {
    "Dragon Command":setGreenDCState,
    "Armory":setGreenAState,
    "Supply Depot":setGreenSDState,
    "Infirmary":setGreenIState,
    "Tank Factory":setGreenTFState,
    "Department Store":setGreenDSState
    }

    const PinkLocationStateCalls = {
    "Dragon Command":setPinkDCState,
    "Armory":setPinkAState,
    "Supply Depot":setPinkSDState,
    "Infirmary":setPinkIState,
    "Tank Factory":setPinkTFState,
    "Department Store":setPinkDSState
    }

    const GreenColors = {
        "Regular":"RegularGreen",
        "Selected":"SelectedGreen",
    }

    const PinkColors = {
        "Regular":"RegularPink",
        "Selected":"SelectedPink",
    }

    const [CurrGreen, setCurrGreen] = useState("None");
    const [CurrPink, setCurrPink] = useState("None");
    useEffect(()=> CheckToSolve());

    const [DCNum, setDCNum] = useState("");
    const [ANum, setANum] = useState("");
    const [SDNum, setSDNum] = useState("");
    const [INum, setINum] = useState("");
    const [TFNum, setTFNum] = useState("");
    const [DSNum, setDSNum] = useState("");


    const LocationNumbers = 
    {
        "Dragon Command":DCNum,
        "Armory":ANum,
        "Supply Depot":SDNum,
        "Infirmary":INum,
        "Tank Factory":TFNum,
        "Department Store":DSNum
    }

    const LocationNumbersCalls = 
    {
        "Dragon Command":setDCNum,
        "Armory":setANum,
        "Supply Depot":setSDNum,
        "Infirmary":setINum,
        "Tank Factory":setTFNum,
        "Department Store":setDSNum
    }

    const [ErrorMessage,setErrorMessage]  = useState("");

    //------Function Definitions------
    const CheckToSolve = () => {
        setDCNum("");
        setANum("");
        setSDNum("");
        setINum("");
        setTFNum("");
        setDSNum("");
        setErrorMessage("");

        if(
            CurrGreen === "None" ||
            CurrPink === "None" ||
            GreenLocationStates[CurrGreen] === GreenColors["Regular"] ||
            PinkLocationStates[CurrPink] === PinkColors["Regular"] 
        ){
            console.log("Waiting for two selections"); 
            return;
        }
        if(CurrGreen === CurrPink){
            console.log("Invalid Input, green light and code cylinder can not be at the same location");
            setErrorMessage("Invalid Input, green light and code cylinder can not be at the same location");
            return;
        }
            console.log("Valid input, creating solution");

            const solution = SolverHelper(new Map(), CurrGreen, CurrPink);
            console.log(solution);
            for (const [key, value] of Object.entries(solution)){
                LocationNumbersCalls[key]("Set valve to "+value);
            }
            LocationNumbersCalls[CurrPink]("Code Cylinder is here")
        return;
    }

    const SolverHelper = (visited, current, end) => {
        
        for (const [key, value] of Object.entries(PathData[current])){
            const keys_list = Object.keys(visited);
            if((!keys_list.includes(value) || keys_list.length ===0)){
                if(keys_list.length < 4 && value !== end){
                    const cloned_list = {...visited};
                    cloned_list[current] = key;
                    const return_val = SolverHelper(cloned_list,value,end);
                    if(Object.keys(return_val).length === 5){
                        return return_val;
                    }
                } else if(keys_list.length === 4 && value === end){
                    const cloned_list = {...visited};
                    cloned_list[current] = key;
                    return cloned_list;
                }
            }
        }
        return [];
    }

    //------Webpage Return------
    return(
        <div className="GorodValves">
            <h1>Valve Solver</h1>
            <h2>

                <table>
                    {LocationData.map((locat) => (

                        <tr>
                        <th>
                            {locat.Name}
                        </th>
                        <th>
                            <button onClick={() => {HandleButtonLogic(locat.Name,GreenLocationStateCalls,GreenLocationStates[locat.Name],GreenColors); setCurrGreen(locat.Name);}} className={GreenLocationStates[locat.Name]}>Green</button>
                        </th>
                        <th>
                            <button onClick={() => {HandleButtonLogic(locat.Name,PinkLocationStateCalls,PinkLocationStates[locat.Name],PinkColors); setCurrPink(locat.Name);}} className={PinkLocationStates[locat.Name]}>codec</button>
                        </th>
                        <th>
                            {LocationNumbers[locat.Name]}
                        </th>
                    </tr>

                    ))}
                    
                </table>
                <div>{ErrorMessage}</div>
            </h2>
        </div>
    )
}

export default GorodValves;