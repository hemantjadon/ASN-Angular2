# app-layout

* It lays out the elements appropriately.

* It is essentially a `paper-drawer-paner`.

* The `responsive-width` is set large so that drawer is always closed until opend
by javascript, this toggling is handled by `events`.

* This element listens to two events for opening/closing of drawer :

  + `open-app-drawer` => Opens app-drawer.

  + `close-app-drawer` => Closes app-drawer
