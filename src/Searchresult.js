import React,{ useEffect,useState} from 'react'
import Searchpage from './Searchpage';
import axios from 'axios';
import './Searchresult.css';
import {Link} from 'react-router-dom';
// import { useHistory } from "react-router-dom";

function Searchresult({match}) {
    // const history = useHistory();
    const [mList, setmList] = useState([]);

    useEffect(() => { 
    //    console.log(match);
       async function fetchData() {
        let response = await axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=f37f89e5&s=${match.params.titlename}`);
         
        console.log(response) ;
        //if no movie found by the name then don't show error
        if(response.data.Response=="False") return( <h1>Enter correct name</h1>);

         setmList(response.data.Search);
      return response.data.Search;
    }
    fetchData();
    },[match]);


    return (
        <div>
          <Searchpage/>

        <div className="mList-container"> 
          <div className="mList-items">
            <div className="mList">
                {mList.map(movie => {
                
                    return (
                    <Link to={`/Searchpage/${match.params.titlename}/${movie.Title}`}>
                        <img    
                            key={`${movie.imdbID}`} 
                            src={`${movie.Poster}` }
                            alt={`${movie.Title}`}
                                />
                    </Link>
                   
                   );
                    
                }) }

             </div>
          </div>
        </div>    
        
        </div>

    )
}

export default Searchresult