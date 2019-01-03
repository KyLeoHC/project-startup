<template>
    <div class="article-container">
        <reader :content="content"></reader>
    </div>
</template>
<script>
    import reader from '../../components/reader';
    import {fetchArticleContent} from '../../services/article';
    import {cloneObjRecursion} from '@/utils';

    export default {
        data() {
            return {
                content: ''
            };
        },
        components: {
            reader
        },
        mounted() {
            fetchArticleContent().then(response => {
                this.content = response.article;
            });
            window.originalObj = {a: {n: {c: ['a', 'b', 'c'], d: 4}, p: 1}, l: 456};
            window.originalObj.c = window.originalObj.a;
            window.originalObj.a.c = window.originalObj.c;
            window.newObj = cloneObjRecursion(window.originalObj);
            console.log(window.originalObj, window.newObj);
        }
    };
</script>
<style lang="stylus">
    .article-container {
        height 100%
        padding 40px 0;
        font-size 16px;
        background url(/static/images/skin-default.jpg) no-repeat no-repeat
        background-size cover
        overflow hidden
    }
</style>
