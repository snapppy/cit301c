import { Component, OnInit } from '@angular/core';
import {Document} from '../document';
import {DocumentsService} from "../documents.service";
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  private documents: Document[] = [];
  constructor(private documentsService: DocumentsService) { }

  ngOnInit() {
    this.documentsService.getDocuments().subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    );
  }

}
