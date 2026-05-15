import { Button, TextInput } from '@mantine/core'
import React, { useState } from 'react'
import Service from '../../utils/http.js'


export default function Input({setResponse}) {
   const service = new Service();
   const [payload, setPayload] = useState(
       {
           "originalUrl": "",
           "expiresAt": "",
           "title": "",
           "customUrl": ""
       }
   )


   const generateShortCode = async ()=>{
       const response = await service.post("s",payload)
       setResponse(response)
   }
   // POST
   // https://url-shortener-bootcamp.onrender.com/api/s
  
   // GET
   // https://url-shortener-bootcamp.onrender.com/api/s/Z_0HvF2
   return (
       <div>


           <TextInput
               label="Input label"
               withAsterisk
               description="Input description"
               placeholder="Input placeholder"
               onChange={(e) => {
                   // console.log(e.target.value)
                   setPayload( { ...payload ,originalUrl:e.target.value } )
               }}
           />
           <Button disabled={ payload.originalUrl == "" } onClick={(e) => {
               generateShortCode()
           }} variant="filled" color="green">Shorten Url</Button>
       </div>
   )
}