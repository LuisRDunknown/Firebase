const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv/config');

import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDccs2Hyj3ltR17aCwU2iWN7HyoU7BpWQM",
    authDomain: "back-firebase-a9a0c.firebaseapp.com",
    projectId: "back-firebase-a9a0c",
    storageBucket: "back-firebase-a9a0c.appspot.com",
    messagingSenderId: "726607001252",
    appId: "1:726607001252:web:87da12a33dd733d9945831"
  };

  const firebase = initializeApp(firebaseConfig);
  const bd = getFirestore()

  const app = express()
  const corsOptions = {
    origin: "*",
    optionSuccessStatus: 200
  }

  app.use(express.json())
  app.use(cors(corsOptions))

  app.post('/create', async (req, res) => {
    const { nombre, apaterno, amaterno, telefono, ciudad, estado, tipo } = req.body

    if (nombre.length < 3){
        res.json({ 'alert': 'El nombre debe tener minimo de 3 caracter'})
        
    }
  })
  app.get('/read', async (req, res) => {

  })
  app.put('/update', async (req, res) => {

  })

  app.delete('/delete', async (req, res) => {

  })

  const PORT = process.env.PORT || 20000

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })