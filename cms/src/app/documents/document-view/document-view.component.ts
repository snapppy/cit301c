import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {DocumentsService} from "../documents.service";
import { Document } from "../document";
import { WindRefService } from "../../wind-ref.service";
@Component({
  selector: 'cms-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.css']
})
export class DocumentViewComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  documentIdx: number;
  document: Document;
  nativeWindow: any;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private documentsService: DocumentsService,
              private windRef: WindRefService) {
    this.nativeWindow = windRef.getNativeWindow();
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(
      (params: any) => {
       this.documentIdx = params['idx'];
       console.log(this.documentIdx);
       this.document = this.documentsService.getDocument(this.documentIdx);
       console.log(this.document);
      }
    )
  }

  onView() {
    if (!this.document) {
      return;
    }

    let currentUrl = this.document.url;
    this.nativeWindow.open(currentUrl);
  }

  onDelete() {
    this.documentsService.deleteDocument(this.document).subscribe();
    this.router.navigate(['/documents']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
