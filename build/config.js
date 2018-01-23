var path = require('path')
module.exports = {
    src: [{
            name: 'base',
            path: path.resolve(__dirname, '../base/dist'),
            distName: 'base'
        },
        {
            name: 'orderresult',
            path: path.resolve(__dirname, '../orderresult/dist'),
            distName: 'orderresult'
        },
        {
            name: 'testreport',
            path: path.resolve(__dirname, '../testreport/dist'),
            distName: 'testreport'
        },
        {
            name: 'stricselection',
            path: path.resolve(__dirname, '../stricselection/dist'),
            distName: 'stricselection'
        },
        {
            name: 'commonactivities',
            path: path.resolve(__dirname, '../commonactivities/dist'),
            distName: 'commonactivities'
        }
    ],
    dist: {
        path: path.resolve(__dirname, '../../wap')
    },
    exclude: ['.map']
}