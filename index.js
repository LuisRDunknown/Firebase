const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv/config');

const { initializeApp } = require ('firebase/app')
const {collection, getDoc, getFirestore, setDoc ,doc, updateDoc, deleteDoc,getDocs} = require ('firebase/firestore')

const firebaseConfig = {
    apiKey: "AIzaSyDccs2Hyj3ltR17aCwU2iWN7HyoU7BpWQM",
    authDomain: "back-firebase-a9a0c.firebaseapp.com",
    projectId: "back-firebase-a9a0c",
    storageBucket: "back-firebase-a9a0c.appspot.com",
    messagingSenderId: "726607001252",
    appId: "1:726607001252:web:87da12a33dd733d9945831"
  };

  const firebase = initializeApp(firebaseConfig);
  const db = getFirestore()

  const app = express()
  const corsOptions = {
    "origin": "*",
    "optionSuccessStatus": 200
  }

  app.use(express.json())
  app.use(cors(corsOptions))

  app.post('/create', (req, res) => {
    const { nombre, apaterno, amaterno, direccion, telefono, ciudad, estado, email} = req.body

    if (!nombre || nombre.length < 3){
      res.json({ 'alert': 'El nombre debe tener minimo de 3 caracters'})
    }else if (!apaterno || apaterno.length < 3){
      res.json({ 'alert': 'El apellido debe tener minimo de 3 caracters'})
    }else if (!amaterno || amaterno.length < 3){
      res.json({ 'alert': 'El apellido materno debe tener minimo de 3 caracters'})
    }else if (!direccion || direccion.length < 3){
      res.json({ 'alert': 'La direccion debe tener minimo de 3 caracters'})
    }else if (!Number(telefono) || telefono.length != 10){
      res.json({ 'alert': 'Escribe un numero de telefono debe tener minimo de 10 caracters'})
    }else if (!ciudad || ciudad.length < 3){
      res.json({ 'alert': 'La ciudad debe tener minimo de 3 caracters'})
    }else if (!estado || estado.length < 3){
      res.json({ 'alert': 'El estado debe tener minimo de 3 caracters'})
    }else if (!email || !email.length){
      res.json({ 'alert': 'Debes introducir un email'})
    }else{
      const contactos = collection(db, 'contactos')

      //Verficar que el email no se repita
      getDoc(doc(contactos, email)).then((contacto) =>{
        if (contacto.exists()){
          res.json({ 'alert': 'El email ya esta registrado'})
        } else {
          const data = {
            nombre,
            apaterno,
            amaterno,
            direccion,
            telefono,
            ciudad,
            estado,
            email
          }

          setDoc(doc(contactos, email), data).then(() =>{
            res.json({ 'alert': 'Registro exitoso'})
          })
        }
      })
    }
  })

  app.get('/read', async (req,res) => {
    const colContactos = collection(db,'contactos')
    const docContactos = await getDocs(colContactos)
    let regresa = []
    docContactos.forEach((contacto) => {
        regresa.push(contacto.data())
    })
    res.json({
        'alert':'sucess',
        regresa
    })
    })
    
    app.post('/update',(req,res)=>{
        const{nombre,
            apaterno,
            amaterno,
            direccion,
            telefono,
            ciudad,
            estado,
            email}= req.body

            if(!nombre && nombre.length < 3){
                res.json({'alert': 'El nombre debe tener minimo 3 caracteres'})
            }
            else if(!apaterno || apaterno.length < 3){
                res.json({'alert': 'El apellido paterno debe tener minimo 3 caracteres'})
            }
            else if(!amaterno ||amaterno.length < 3){
                res.json({'alert': 'El apellido materno debe tener minimo 3 caracteres'})
            }
            else if(!direccion || direccion.length < 3){
                res.json({'alert': 'El apellido paterno debe tener minimo 3 caracteres'})
            }
            else if (!Number(telefono) || telefono.length != 10){
                res.json({'alert': 'Escribe un numero valido '})
            }
            else if(!ciudad || ciudad.length < 3){
                res.json({'alert': 'La cuidad  debe tener minimo 3 caracteres'})
            }
            else if(!estado || estado.length < 3){
                res.json({'alert': 'El aestado debe tener minimo 3 caracteres'})
            }
            else if(!email || email.length < 3){
                res.json({'alert': 'Debes introducior un correo electronico'})
            }else{
    
                const updateData = {
                    nombre,apaterno,amaterno,direccion,telefono,ciudad,estado,email
            }
        updateDoc(doc(db, 'contactos',email), updateData).then(() => {
        res.json({
            'alert':'update success'
        })
    }).catch((error)=>{
        res.json({
            'alert':error
                 })
                })
    
            }
    
        })

    app.post('/delete',(req,res)=>{
    
        const {email} = req.body
    
        const contactoBorrar = doc(db, 'contactos',email)
        deleteDoc(contactoBorrar)
        res.json({
            'alert':'delete success'
        
     })
    })

     const PORT = process.env.PORT || 20000
     app.listen(PORT,()=>{
        console.log(`Escuchando en el puerto: ${PORT}`)
     })