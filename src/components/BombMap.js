import { useState } from 'react';
import './css/BombMap.css';
import DepartmentRegular from '../images/BombMap/DepartmentRegular.png';
import DragonRegular from '../images/BombMap/DragonRegular.png';
import ArmoryRegular from '../images/BombMap/ArmoryRegular.png';
import InfirmaryRegular from '../images/BombMap/InfirmaryRegular.png';
import TankRegular from '../images/BombMap/TankRegular.png';
import SupplyRegular from '../images/BombMap/SupplyRegular.png';
import DepartmentSelected from '../images/BombMap/DepartmentSelected.png';
import DragonSelected from '../images/BombMap/DragonSelected.png';
import ArmorySelected from '../images/BombMap/ArmorySelected.png';
import InfirmarySelected from '../images/BombMap/InfirmarySelected.png';
import TankSelected from '../images/BombMap/TankSelected.png';
import SupplySelected from '../images/BombMap/SupplySelected.png';
import BombPopup from './BombPopup';

const selected_locations = [];

function BombMap() {

    const [DepartmentState, setDepartmentState] = useState(DepartmentRegular);
    const [DragonState, setDragonState] = useState(DragonRegular);
    const [ArmoryState, setArmoryState] = useState(ArmoryRegular);
    const [InfirmaryState, setInfirmaryState] = useState(InfirmaryRegular);
    const [TankState, setTankState] = useState(TankRegular);
    const [SupplyState, setSupplyState] = useState(SupplyRegular);
    
    const LocationStates = {
        "Department Store": {
            "Regular" : DepartmentRegular,
            "Selected" : DepartmentSelected,
            "Set" : setDepartmentState
        },
        "Dragon Command" : {
            "Regular" : DragonRegular,
            "Selected" : DragonSelected,
            "Set" : setDragonState
        },
        "Armory" : {
            "Regular" : ArmoryRegular,
            "Selected" : ArmorySelected,
            "Set" : setArmoryState
        },
        "Infirmary" : {
            "Regular" : InfirmaryRegular,
            "Selected" : InfirmarySelected,
            "Set" : setInfirmaryState
        },
        "Tank Factory" : {
            "Regular" : TankRegular,
            "Selected" : TankSelected,
            "Set" : setTankState
        },
        "Supply Depot" : {
            "Regular" : SupplyRegular,
            "Selected" : SupplySelected,
            "Set" : setSupplyState
        }
    }

    const [BombOrder,setBombOrder] = useState([]);
    const [PopupVis,setPopupVis] = useState(false);
    

    const LocationSelection = (location,set_state) => {

        set_state(LocationStates[location]["Selected"]);
        selected_locations.push(location);
        if(selected_locations.length === 6){
            console.log(selected_locations);
            const temp = {...selected_locations}
            setBombOrder(temp);
            console.log(BombOrder);
            for (const loc of selected_locations){
                LocationStates[loc]["Set"](LocationStates[loc]["Regular"]);
            }
            setPopupVis(true);
            selected_locations.length = 0;
        }

        return;
    }

     return(
        <div>
            
            <li className='BombMapContainer'><button onClick={() => {LocationSelection("Tank Factory", setTankState)}} disabled={TankState===TankSelected}><img src={TankState} alt={""}></img></button>
            
                <ul className='BombMapSubcontainer'>
                    <button onClick={() => {LocationSelection("Dragon Command", setDragonState)}} disabled={DragonState===DragonSelected}><img src={DragonState} alt={""}></img></button>
                    <li className='BombMapContainer'>
                        <button onClick={() => {LocationSelection("Infirmary", setInfirmaryState)}} disabled={InfirmaryState===InfirmarySelected}><img src={InfirmaryState} alt={""}></img></button>
                        <button onClick={() => {LocationSelection("Armory", setArmoryState)}} disabled={ArmoryState===ArmorySelected}><img src={ArmoryState} alt={""}></img></button>
                    </li>
                    <button onClick={() => {LocationSelection("Department Store", setDepartmentState)}} disabled={DepartmentState===DepartmentSelected}><img src={DepartmentState} alt={""}></img></button>
                </ul>
                
            

            <button onClick={() => {LocationSelection("Supply Depot", setSupplyState)}} disabled={SupplyState===SupplySelected}><img src={SupplyState} alt={""}></img></button>
            </li>
            
            <BombPopup Values={BombOrder} open={PopupVis} OnClose={setPopupVis} className="BombPopup"></BombPopup>

        </div>
     )

}

export default BombMap;