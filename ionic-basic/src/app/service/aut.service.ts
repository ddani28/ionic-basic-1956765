import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { initializeApp } from "firebase/app"
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { User } from '../models/user';
import { getFirestore, collection, addDoc, getDocs,  doc, setDoc, deleteDoc } from 'firebase/firestore';
import { Lugar } from '../interface/lugar';
import { getDatabase } from "firebase/database";
const firebaseApp = initializeApp(environment.firebaseConfig);
const dbCloudFirestore = getFirestore(firebaseApp);

@Injectable({
  providedIn: 'root'
})
export class AutService {
  public isLoged : any = false;
  auth: Auth;
  db = dbCloudFirestore;
  constructor() {
    this.auth = getAuth(firebaseApp);
    onAuthStateChanged(this.auth, (user: null | undefined) => {
      if(user!= undefined || user != null){
        this.isLoged = user;
      }
    });
   }

   tieneSesion(){
    return this.isLoged;
   }

   getStateAuth(){
    return this.auth;
   }
     //login
  onLogin(user: User): Promise<any>{
      return signInWithEmailAndPassword(this.auth, user.email, user.password);
  }
   //register
   onRegister(user: User): Promise<any>{
      return  createUserWithEmailAndPassword(this.auth, user.email, user.password);
  }   
  async altaLugar(lugar: Lugar){
    const lugarTemp: any ={
      nombre:lugar.nombre,
      ubicacion: {longitud:'', latitud:''}
    };
    const docRef = await addDoc(collection(this.db,'lugar'), lugarTemp);
    console.log("Documento escrito con id: "+docRef.id);
  }

  async getLugares(destinos: Lugar[]) {
    await getDocs(collection(this.db, 'lugar'))
    .then((querySnapshot: any)=>{
      destinos.splice(0, destinos.length);
      querySnapshot.forEach((doc: any)=>{
        let data: any = doc.data();
          let lugar: Lugar = new Lugar();
          lugar.nombre = data.nombre;
          lugar.id = doc.id;
          console.log(doc.id);
          destinos.push(lugar);
      });
    })
    .catch((error: string)=>{
      console.log('Ocurrio un erro en el guardardo:'+error);
    });
  } 
  
  updateLugares(id: any, lugar: any): Promise<any>{
    const docRef = doc(this.db, 'lugar', id);
    const lugarAux = {nombre: lugar.nombre,
      ubicacion:{latitud:'', longitud:''}
    };

    return setDoc(docRef, lugarAux);
  }

  deleteLugar(id: any): Promise<any>{
    const docRef = doc(this.db, 'lugar', id);
    return deleteDoc(docRef);
  }

}