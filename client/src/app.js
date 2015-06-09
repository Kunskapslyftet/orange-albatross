import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';

export class App {
  configureRouter(config, router){
    config.title = 'Aurelia';
    config.map([
				{ route: ['','welcome'],  moduleId: './welcome',      nav: true, title:'Welcome' },
      	{ route: 'flickr',        moduleId: './flickr',       nav: true },
      	{ route: 'event',        	moduleId: './event',       	nav: true },
      	{ route: 'activity',      moduleId: './activity',     nav: true },
      	{ route: 'group/:id',     moduleId: './group',       	nav: false },
      	{ route: 'group-list',    moduleId: './group-list',  	nav: true, title:'Groups'},
      	{ route: 'athlete',       moduleId: './athlete',  		nav: true },
        { route: 'group-create',  moduleId: './group-create', nav: false },
      	{ route: 'child-router',  moduleId: './child-router', nav: true, title:'Child Router' }
    ]);

			this.router = router;
  }
}
