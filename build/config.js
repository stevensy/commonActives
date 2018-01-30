var path = require('path')
module.exports = {
    src: [
        {
            name: 'commonactivities',
            path: path.resolve(__dirname, '../commonactivities/dist'),
            distName: 'commonactivities'
        },{
            name: 'commonActivesLists',
            path:path.resolve(__dirname, '../commonActivesLists/dist'),
            distName: ''
        }
    ],
    dist: {
        path: path.resolve(__dirname, '../wap')
    },
    exclude: ['.map']
}