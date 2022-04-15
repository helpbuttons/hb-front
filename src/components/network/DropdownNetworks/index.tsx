//a variation of dropddown specific for networks
//libraries
import { useState, useEffect } from "react";

//functions
import { GetNetworksEvent } from "./data.tsx";
import { SetNetworkByIdEvent } from "./data.tsx";

//services
import { NetworkService } from 'services/Networks';
import { store } from 'pages/index';
import { useRef } from 'store/Store';
import { INetwork } from 'services/Networks/network.type.tsx';


export default function DropdownNetworks({ ...props}) {

  let [networks, setNetworks] = useState([]);
  let [selectedNetwork, setSelectedNetwork] = useState(INetwork);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState("");

  const onChange = (e) => {

    const userInput = e.target.value;
    // Filter our suggestions that don't contain the user's input
    const unLinked = networksArray;
    setInput(e.target.value);
    setFilteredSuggestions(unLinked);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);

  };

  const onClick = (e) => {

   console.log(e.target.attributes.data_id.nodeValue + e.target.attributes.label.value);
   //setInput(e.target.innerText); uncomment iif we want to externalize inputs from the component
   SetNetworkByIdEvent(e.target.attributes.data_id.nodeValue, setSelectedNetwork);
   setFilteredSuggestions([]);
   setActiveSuggestionIndex(0);
   setShowSuggestions(false);

  };


  //get networks into array
  let networksArray = networks.nets ? networks.nets : networks;

  const options = networksArray.map((net, i) => (

      <option key={net.id} data_id={net.id} className="dropdown-nets__dropdown-option" label={net.name} value={net.name} onClick={onClick}>{net.name}</option>

  ));

  console.log(options);

  useEffect(() => {

    //call networks array before rendering
    networks = GetNetworksEvent(setNetworks);

  }, [])

  return (

    <>
      <input className="dropdown-nets__dropdown-trigger dropdown__dropdown" autoComplete="on" onChange={onChange} list="" id="input" name="browsers" placeholder="Search other Network" type='text'></input>

        {showSuggestions && input &&
          <datalist className="dropdown-nets__dropdown-content" id='listid'>
            {options}
          </datalist>
        }

    </>


  );
}
