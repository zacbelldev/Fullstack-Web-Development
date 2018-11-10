import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor(
    private documentService: DocumentsService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        let id = params['id'];

        if (id === undefined || id === null) {
          this.editMode = false;
          return;
        }

        this.originalDocument = this.documentService.getDocument(id);

        if (this.originalDocument === undefined || this.originalDocument === null) {
          return;
        }

        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      });
  }

  onSubmit(form: NgForm) {

    let values = form.value;

    let newDocument = new Document('', values.title, values.description, values.url, null);

    if (this.editMode === true) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }

}
