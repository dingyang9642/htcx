/**
 * @file 首页
 * @author dingyang(dingyang9642@126.com)
 */

var React = require('react');
var commonPageStyle = require('../../component/widget/common/common.css');
var homePageStyle = require('./home.useable.css');

// 首页顶部标题栏部分
var HeaderElement = require('../../component/widget/header/header.jsx');
// 首页中间内容部分
var ContentElement = require('./content/content.jsx');
// 首页底部状态栏部分
var FooterElement = require('../../component/widget/footer/footer.jsx');

var homeComponent = React.createClass({
	getInitialState: function() {
		return {

		};
	},
	componentWillMount: function () {
        homePageStyle.use();
    },
    componentWillUnmount: function() {
        homePageStyle.unuse();
    },
    render: function() {
        return (
            <div className="home-box">
                <HeaderElement title='home'/>
                <ContentElement/>
                <FooterElement/>
            </div>
        );
    }
});
module.exports = homeComponent;