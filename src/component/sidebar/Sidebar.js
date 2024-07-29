import React from 'react'
import Sort from "./sort/Sort"
import WhereToWatch from "./whereToWatch/WhereToWatch"
import Fillter from "./fillter/Fillter"

export default function Sidebar() {
   
        

  return (

    
    <div className='fillter'>

        <h2 className='title-fillter'>Popular Movies</h2>
                                      <div><Sort/></div>
        <div style={{paddingTop:"1rem"}}><WhereToWatch/></div>

        <div style={{paddingTop:"1rem"}}><Fillter/></div>

        

</div>
)
}

      