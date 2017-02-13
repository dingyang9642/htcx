/**
 * @file 数据管理模块
 * @author dingyang(dingyang9642@126.com)
 */

var React = require('react');
var commonPageStyle = require('../../component/widget/common/common.css');
var dataPageStyle = require('./detail.useable.css');
// 首页顶部标题栏部分
var HeaderElement = require('../../component/widget/header/header.jsx');
// 首页底部状态栏部分
var FooterElement = require('../../component/widget/footer/footer.jsx');

var dataComponent = React.createClass({
	getInitialState: function() {
		return {

		};
	},
	componentWillMount: function () {
        dataPageStyle.use();
    },
    componentWillUnmount: function() {
        dataPageStyle.unuse();
    },
    render: function() {
        return (
            <div className="data-box">
                <HeaderElement title='data'/>
                <FooterElement/>
            </div>
        );
    }
});
module.exports = dataComponent;