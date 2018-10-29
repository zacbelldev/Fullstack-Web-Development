import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

  constructor(private documentService: DocumentsService) {
    this.documents = this.documentService.getDocuments();
  }

  ngOnInit() {
  }

}
