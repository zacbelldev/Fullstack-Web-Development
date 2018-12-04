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

  storeDocuments() {
    this.documents = JSON.parse(JSON.stringify(this.documents));
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put('https://cms-data-9c4e6.firebaseio.com/documents.json', this.documents, { headers: header })
      .subscribe(
        (documents: Document[]) => {
          this.documentListChangedEvent.next(this.documents.slice());
        }
      );
  }

  getDocuments() {
    // this.http.get('https://cms-data-9c4e6.firebaseio.com/documents.json')
    this.http.get('https://localhost:3000/documents')
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
    if (!newDocument) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    newDocument.id = '';
    const strDocument = JSON.stringify(newDocument);

    this.http.post('http://localhost:3000/documents', strDocument, { headers: headers })
      // .map(
      //   (res: Response) => {
      //     return res.json().obj;
      //   })
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.documentChangedEvent.next(this.documents.slice());
        });
    // this.maxDocumentId++;
    // newDocument.id = String(this.maxDocumentId);
    // this.documents.push(newDocument);
    // this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const strDocument = JSON.stringify(newDocument);

    this.http.patch('http://localhost:3000/documents/' + originalDocument.id
      , strDocument
      , { headers: headers })
      // .map(
      //   (res: Response) => {
      //     return res.json().obj;
      //   })
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.documentChangedEvent.next(this.documents.slice());
        });

    // newDocument.id = originalDocument.id;
    // this.documents[pos] = newDocument;
    // this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if (document === null || document === undefined) {
      return;
    }

    this.http.delete('http://localhost:3000/documents/' + document.id)
    // .map(
      //   (res: Response) => {
      //     return res.json().obj;
      //   })
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.documentChangedEvent.next(this.documents.slice());
        });

    // let pos = this.documents.indexOf(document);
    // if (pos < 0) {
    //   return;
    // }
    // this.documents.splice(pos, 1);
    // this.storeDocuments();
  }
}
