import { Injectable } from '@angular/core';
import {Document} from './document';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';
@Injectable()
export class DocumentsService {
  private documents: Document[] = [];
  constructor() { }

  getDocuments() {
    this.documents = MOCKDOCUMENTS;
    return this.documents;
  }

  getDocument(index: number) {
    return this.documents[index];
  }

  deleteDocument (document: Document) {
    this.documents.splice(this.documents.indexOf(document), 1);
  }

  addDocument(document: Document) {
    this.documents.push(document);
  }

  updateDocument(oldDoc: Document, newDoc: Document) {
    this.documents[this.documents.indexOf(oldDoc)] = newDoc;
  }
}
