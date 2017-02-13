var React = require('react');
var headerPageStyle = require('./header.useable.css');

var headerComponent = React.createClass({
	getInitialState: function() {
		return {
            
		};
	},
    getDefaultProps : function () {
        return {
            title : 'home'
        };
    },
    propTypes: {
        title: React.PropTypes.string.isRequired,
    },
	componentWillMount: function () {
        headerPageStyle.use();
    },
    componentWillUnmount: function() {
        headerPageStyle.unuse();
    },
    /**
     * 获取菜单栏列表list
     * @return {[type]} [description]
     */
    getMenuList: function() {

    },
    render: function() {
        return (
            <div className='header-box'>

            </div>
        );
    }
});
module.exports = headerComponent;