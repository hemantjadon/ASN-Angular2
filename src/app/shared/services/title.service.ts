import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TitleService {
  private _title: Subject<string> = new Subject<string>();
  public title: Observable<string> = this._title.asObservable();

  constructor () { }

  public setTitle (title: string): void {
    this._title.next(title);
  }
}
