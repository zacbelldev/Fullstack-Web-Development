import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    // id: number, name: string, description: string, url: string, children: Document[]
    new Document(1, 'Document Name 1', 'description 1', 'https://www.google.com', null),
    new Document(1, 'Document Name 2', 'description 2', 'https://www.google.com', null),
    new Document(1, 'Document Name 3', 'description 3', 'https://www.google.com', null),
    new Document(1, 'Document Name 4', 'description 4', 'https://www.google.com', null),
    new Document(1, 'Document Name 5', 'description 5', 'https://www.google.com', null),
  ]

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
  }

  constructor() { }

  ngOnInit() {
  }

}
