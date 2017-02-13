var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router/lib/Router');
var browserHistory = require('react-router/lib/browserHistory');
var projectName = "htcx";

var App = React.createClass({
    render: function() {
        return (
            <div className="ecnu-page">
                {this.props.children}
            </div>
        );
    }
});

var subRoutes = [
    {
        path: 'detail',
        getComponent: function (nextState, cb) {
            require.ensure([], function (require) {
                cb(null, require('./page/detail/detail.jsx'));
            }, 'detail');
        },
        onEnter: function () {
            
        },
        onLeave: function () {

        }
    },
    {
        path: '*',
        onEnter: function (nextState, replace) {
            // 如果是其他路由则跳转到首页
            replace('/' + projectName);
        }
    }
];

var RootRoute = {
    childRoutes: [{
        path: '/' + projectName,
        component: App,
        indexRoute: {
            getComponent: function (nextState, cb) {
                require.ensure([], function (require) {
                    cb(null, require('./page/home/home.jsx'));
                }, 'home');
            },
        },
        childRoutes: subRoutes
    }]
};

window.onload = function() {
    ReactDOM.render((
        <Router routes={RootRoute} history={browserHistory}/>
    ), document.querySelector('#htcx-app'));
};