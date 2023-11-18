import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { 
    this.storage.create();
  }

  setValue(key: string, value: any){
    this.storage.set(key, value);    
  }
  getValue(key: string): Promise<any>{
    return this.storage.get(key);
  }
  borrarItem(nombreItem: string){
    this.storage.remove(nombreItem);
  }

  limpiarStorage(): Promise<any>{
    console.log('clear storage')
    return this.storage.clear();;
  }
}