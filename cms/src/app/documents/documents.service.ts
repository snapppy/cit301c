import {Injectable, EventEmitter} from '@angular/core';
import {Document} from './document';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class DocumentsService {
  private documents: Document[] = [];
  getDocumentEmitter = new EventEmitter<Document[]>();
  currentDocumentId: string;
  constructor(private http: Http) {
    this.initDocuments();
    this.currentDocumentId = '1';
  }

  getDocuments() {
    this.documents = MOCKDOCUMENTS;
    return this.documents;
  }

  getDocument(index: number) {
    return this.documents[index];
  }

  deleteDocument (document: Document) {
    this.documents.splice(this.documents.indexOf(document), 1);
    this.storeDocuments();
  }

  addDocument(document: Document) {
    this.documents.push(document);
    this.storeDocuments();
  }

  updateDocument(oldDoc: Document, newDoc: Document) {
    this.documents[this.documents.indexOf(oldDoc)] = newDoc;
    this.storeDocuments();
  }

  initDocuments() {
    return this.http.get('https://jameswcms.firebaseio.com/documents.json')
      .map((response: Response) => response.json())
      .subscribe(
        (data: Document[]) => {
          this.documents = data;
          this.getDocumentEmitter.emit(this.documents);
        }

      );
  }

  storeDocuments() {
    const body = JSON.stringify(this.documents);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put('https://jameswcms.firebaseio.com/documents.json',
      body, {headers: headers}).toPromise();
  }
}
