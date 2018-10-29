import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  documents: Document[];

  getDocument(id: string): Document {
    for(let document of this.documents){
      if(document.id === id){
        return document
      }
    }
    return null;
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  constructor() { 
    this.documents = MOCKDOCUMENTS;
  }
}
