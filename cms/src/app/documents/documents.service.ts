import {Injectable, EventEmitter} from '@angular/core';
import {Document} from './document';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs";

@Injectable()
export class DocumentsService {
  private documents: Document[] = [];
  getDocumentEmitter = new EventEmitter<Document[]>();
  currentDocumentId: string;
  constructor(private http: Http) {
    /*this.initDocuments();*/
    this.currentDocumentId = '1';
  }

  getDocuments() {
    /*this.documents = MOCKDOCUMENTS;*/
    return this.http.get('http://localhost:3000/documents')
      .map((response: Response) => {
        const documents = response.json().obj;
        let transformedDocuments: Document[] = [];
        for (let document of documents) {
          transformedDocuments.push(new Document(document.id, document.name, document.description
                                    , document.url, document.children));
        }
        this.documents = transformedDocuments;
        return transformedDocuments;
      })
      .catch((error: Response) => Observable.throw("Error in getDocuments Service"));
  }

  getDocument(index: number) {
    return this.documents[index];
  }

  deleteDocument (document: Document) {
    this.documents.splice(this.documents.indexOf(document), 1);
    return this.http.delete('http://localhost:3000/documents' + document.id)
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  addDocument(document: Document) {
    const body = JSON.stringify(document);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/documents', body, {headers: headers})
      .map((response: Response) => {
        const result = response.json();
        const document = new Document(result.id, result.name, result.description
          , result.url, result.children);
        return document;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  updateDocument(oldDoc: Document, newDoc: Document) {
    const body = JSON.stringify(document);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.patch('http://localhost:3000/documents' + newDoc.id, body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  /*initDocuments() {
    return this.http.get('https://jameswcms.firebaseio.com/documents.json')
      .map((response: Response) => response.json())
      .subscribe(
        (data: Document[]) => {
          this.documents = data;
          this.getDocumentEmitter.emit(this.documents);
        }

      );
  }*/

  /*storeDocuments() {
    const body = JSON.stringify(this.documents);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put('https://jameswcms.firebaseio.com/documents.json',
      body, {headers: headers}).toPromise();
  }*/
}
