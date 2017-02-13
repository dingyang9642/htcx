var React = require('react');
var tableStyle = require('./table.useable.css');

var TableEle = React.createClass({
    componentWillMount: function () {
        tableStyle.use();
    },
    componentWillUnmount: function() {
        tableStyle.unuse();
    },
    componentDidMount: function() {
        
    },
    getDefaultProps: function() {
        return {
            /**
             * 传递参数格式说明
             * @type {Object}
             * @example
             * {
                    head: [
                        {id: 1, title: '区县'},
                        {id: 2, title: '面积'}
                    ],
                    body: [
                        [{id: 1, data: '浦东新区'}, {id: 2, data: 100}],
                        [{id: 5, data: '青浦区'}, {id: 6, data: 200}]
                    ]
                };
             */
            datas: {
                head: [],
                body: []
            }
        };
    },
    render: function() {
        var datas = this.props.datas;
        var tHead = datas.head;
        var tBody = datas.body;
        return (
            <div>
                <table className='agri-table'>
                    <thead><tr>
                        {tHead.map(function (head, index) {
                            return (
                                <td key={ index } className=''>
                                   {head.title}
                                </td>
                            );
                        })}
                    </tr></thead>
                    <tbody>
                        {tBody.map(function (body, index) {
                            return (
                                <tr key={ index } className=''>
                                    {body.map(function (data, index) {
                                        return (
                                            <td key={ index } className=''>
                                                {data.data}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}                        
                    </tbody>
                </table>
            </div>
        );
    }
});


module.exports = TableEle;