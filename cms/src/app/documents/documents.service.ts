import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  documentSelectedEvent = new EventEmitter<Document[]>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();

  documents: Document[] = [];
  maxDocumentId: number;

  constructor(private http: HttpClient) {
    // this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  storeDocuments(): any {
    this.documents = JSON.parse(JSON.stringify(this.documents));
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put('https://cms-data-9c4e6.firebaseio.com/documents.json', this.documents, { headers: header})
    .subscribe(
      (documents: Document[]) => {
        this.documentListChangedEvent.next(this.documents.slice());
      }
    );
  }

  getDocuments() {
    this.http.get('https://cms-data-9c4e6.firebaseio.com/documents.json')
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.documents.sort((a, b) => (a['name'] < b['name']) ? 1 : (a['name'] > b['name']) ? -1 : 0);
          this.documentListChangedEvent.next(this.documents.slice());
        }, (error: any) => {
          console.log('something bad happened...');
        }
      );
  }

  getDocument(id: string): Document {
    for (let document of this.documents) {
      if (document.id === id) {
        return document
      }
    }
    return null;
  }

  // getDocuments(): Document[] {
  //   return this.documents.slice();
  // }

  getMaxId(): number {
    let maxId = 0;
    for (let document of this.documents) {
      let currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (newDocument == null || newDocument == undefined) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = String(this.maxDocumentId);
    this.documents.push(newDocument);
    // let documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (originalDocument === null || newDocument === null || newDocument === undefined || originalDocument === undefined) {
      return;
    }

    let pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    let documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if (document === null || document === undefined) {
      return;
    }

    let pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    let documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments();
  }
}
