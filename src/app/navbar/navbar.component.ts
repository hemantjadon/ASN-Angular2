import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { TitleService } from '../shared/services/title.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit,OnDestroy {
  private pageTitle: string;
  private pageTitle_subscription: Subscription;
  constructor(
    private ts: TitleService
  ) { }

  ngOnInit() {
    this.pageTitle_subscription = this.ts.title.subscribe(title => {
      this.pageTitle = title;
    });
  }

  ngOnDestroy() {
    this.pageTitle_subscription.unsubscribe();
  }
}
