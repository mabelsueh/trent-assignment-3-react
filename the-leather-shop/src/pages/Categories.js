import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

import {
    useHistory,
} from "react-router-dom";

export default function MenuBar(){

    const [categories, setCategories] = useState([]);

    const history = useHistory();

    // const context = useContext(UserContext)
    // console.log("CONTEXT PROFILE: ", context.profile)
    // console.log("CONTEXT ADDRESS: ", context.address_id)

    useEffect(() => {
        fetchApi();
    },[])

    async function fetchApi(){
        let response = await axios.get('https://8080-a3d5bfe8-e545-435f-aa79-ead619c8cac6.ws-us03.gitpod.io/api/products');
        setCategories(response.data)
    }

    function changeRoute(categoryTitle){
        let newCategoryTitle = ""
        if(categoryTitle.includes(' ')){
            let index = categoryTitle.indexOf(' ')
            let firstString = categoryTitle.slice(0, index)
            let secondString = categoryTitle.slice(index+1)
            newCategoryTitle = (firstString.concat(secondString)).toLowerCase()
        }
        history.push(`/products/${newCategoryTitle}`)
    }

    function renderCategories(){
        let jsx = []
        for(let category of categories){
            jsx.push(
                <React.Fragment>
                    <Button variant="outline-dark" style={{fontSize:"25px", width:"100%"}} onClick={() => changeRoute(category.category)}>{category.category}</Button>
                </React.Fragment>
            )
        }
        return jsx;
    }

    return(
        <React.Fragment>
            {renderCategories()}
        </React.Fragment>
    )
}