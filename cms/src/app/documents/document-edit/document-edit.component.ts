import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {DocumentsService} from "../documents.service";
import {Router, ActivatedRoute} from "@angular/router";
import { Document } from "../document";

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  subscription: Subscription;
  oldDocument: Document;
  editMode: boolean = false;
  index: number;
  constructor(private documentsService: DocumentsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('idx')) {
          this.oldDocument = this.documentsService.getDocument(params['idx']);
          this.editMode = true;
          console.log(params['idx']);
        } else {
          this.editMode = false;
          this.oldDocument = null;
        }
      }
    );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(value) {
    let newDocument = new Document(null,
                              value.name,
    value.description,
    value.documentUrl, null);

    if (this.editMode) {
      newDocument.id = this.oldDocument.id;
      this.documentsService.updateDocument(this.oldDocument, newDocument).subscribe();
    } else {
      this.documentsService.addDocument(newDocument).subscribe();
    }

    this.router.navigate(['documents']);
  }

  onCancel() {
    this.router.navigate(['documents']);
  }

}
