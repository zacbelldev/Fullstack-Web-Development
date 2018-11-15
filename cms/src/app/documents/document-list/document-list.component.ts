import { Component, OnInit, OnDestroy } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  documents: Document[] = [];

  constructor(private documentService: DocumentsService) {
    this.documentService.getDocuments();
  }

  ngOnInit() {
    this.subscription = this.documentService.documentListChangedEvent
    .subscribe(
      (documentsList: Document[]) => {
        this.documents = documentsList;
      }
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
