<template>
    <div class="article-container">
        <reader :content="content"></reader>
    </div>
</template>
<script>
    import reader from '../../components/reader';
    import {fetchArticleContent} from '../../services/article';

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
