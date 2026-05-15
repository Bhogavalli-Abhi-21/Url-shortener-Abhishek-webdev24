import React, { useState } from 'react'
import Input from '../../Components/ShortnerUrl/Input'
import Response from '../../Components/ShortnerUrl/Response'


export default function ShortenUrl() {
 const [response,setResponse] = useState(null)


 return (
   <div>
     {
       response ? <Response response={response} /> : <Input setResponse={setResponse} />
     }
   </div>
 )
}