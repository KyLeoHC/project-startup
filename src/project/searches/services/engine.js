/**
 * 通用搜索函数
 * @param keyword
 */
const search = function (keyword) {
    location.href = this.url.replace('{{keyword}}', encodeURIComponent(keyword));
};

/**
 * 获取搜索引擎列表
 * @returns {*[]}
 */
const getEngineList = () => {
    return [
        {
            id: 1,
            name: '百度',
            url: 'https://www.baidu.com/s?wd={{keyword}}',
            search
        },
        {
            id: 2,
            name: '搜狗',
            url: 'https://m.sogou.com/web/searchList.jsp?keyword={{keyword}}',
            search
        },
        {
            id: 3,
            name: 'google',
            url: 'https://www.google.com/search?q={{keyword}}',
            search
        },
        {
            id: 4,
            name: 'bing',
            url: 'https://cn.bing.com/search?q={{keyword}}',
            search
        }
    ];
};

export {getEngineList};
