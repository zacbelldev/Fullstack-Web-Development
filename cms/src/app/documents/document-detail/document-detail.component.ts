import { Component, OnInit } from '@angular/core';
import { DocumentsService } from '../documents.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  document: Document;

  constructor(private documentService: DocumentsService, private router: Router, private route: ActivatedRoute) { 
    this.document = this.documentService.getDocuments();
  }

  ngOnInit() {
  }

}
