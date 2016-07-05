# app-navbar

* This is the top `navbar` of the page.

* It is essentially a _*paper-toolbar*_ but _*iron-media-queries*_ are used to
show/hide nav and drawer buttons.

* It has three _*iron-media-query breakpoints*_:

  + `(min-width : 768px)` => Expanded nav only visible above this query.
  Below the breakpoint the nav disappears and hamburger shows.

  + `(max-width : 767px) and (min-width : 361px)` => Shows hamburger with full
  title.

  + `(max-width : 360px)` => Shows hamburger with short title

* The hamburger (`paper-icon-button`), is the `app-drawer` controller,

  + `on-tap` => It fires the event `open-app-drawer`.
