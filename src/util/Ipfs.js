import { useState } from 'react'
import { create } from 'ipfs-http-client'
import React from "react"
const client = create('https://ipfs.infura.io:5001/api/v0')

function Ipfs() {
  const [fileUrl, updateFileUrl] = useState(``)
  
  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(file)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      updateFileUrl(url)
      var urlString = url+"";
      var FileSaver = require('file-saver');
      var blob = new Blob([urlString], {type: "text/plain;charset=utf-8"});
      console.log(blob);
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
  return (
    <div>
      <h1>IPFS Upload</h1>
      <input
        type="file"
        onChange={onChange}
      />
    </div>
  );
}

export default Ipfs;