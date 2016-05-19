/* global window, document */

import React from 'react';
import Router from 'react-router';

window.React = React;

let routes = require('./src/routes');

Router.run(routes, Router.HistoryLocation, function(Root, state) {
    React.render(<Root />, document.getElementById('app'));

    console.log('Rendered app on client');
});
