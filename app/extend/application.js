const path = require('path');

module.exports = {
    // 方法扩展
    package(key) {
        const pack = getPack();
        return key ? pack[key] : pack
    },
    get allPackage() {
        return getPack();
    }
};


function getPack() {
    const filePath = path.join(process.cwd(), "package.json")
    const pack = require(filePath)
    return pack
}