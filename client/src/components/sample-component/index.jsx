import React from 'react';
import axios from 'axios';

function callServer() {
  axios.get('http://localhost:8000/users').then((response) => {
    console.log(response.data);
  });
}

export function SampleComponent() {
  return (
    <div>
      This is a sample component!
      {callServer()}
    </div>
  );
}
