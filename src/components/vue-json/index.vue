<template>
    <div class="vjs__tree"
         :style="{
            'background-color': treeContentBackground,
            'position': currentDeep > 1 ? '' : 'relative',
            'margin-left': currentDeep === 1 && existCheckbox ? '30px' : ''
         }"
         @click.stop="handleClick($event)"
         @mouseover.stop="handleMouseover"
         @mouseout.stop="handleMouseout">
        <template v-if="selectable && existCheckbox" class="vjs-checkbox">
            <checkbox v-model="checkboxVal" @change="handleClick($event, true)"></checkbox>
        </template>
        <template v-if="Array.isArray(freezeData) || isObject(freezeData)">
            <brackets-left
                    :visible.sync="visible"
                    :data="freezeData"
                    :not-last-key="notLastKey">
                <span v-if="currentDeep > 1 && !Array.isArray(parentData)">{{ currentKey }}:</span>
            </brackets-left>
            <div class="vjs__tree__content"
                 v-for="(item, key, index) in freezeData"
                 :key="key"
                 v-if="visible && (isArrayData ? (key < maxLength) : (index < maxLength))">
                <vue-json
                        :parent-data="freezeData"
                        :data="item"
                        :deep="deep"
                        :path="path + (isArrayData ? `[${key}]` : `.${key}`)"
                        :path-checked="pathChecked"
                        :path-selectable="pathSelectable"
                        :selectable-type="selectableType"
                        :current-key="key"
                        :current-deep="currentDeep + 1"
                        @click="handleItemClick">
                </vue-json>
            </div>
            <div class="vjs-more-btn"
                 @click="page++"
                 v-if="visible && maxLength < countOfNode">
                点击展示更多({{maxLength}}/{{countOfNode}})
            </div>
            <brackets-right
                    :visible.sync="visible"
                    :data="freezeData"
                    :not-last-key="notLastKey">
            </brackets-right>
        </template>
        <simple-text
                :parentDataType="getDataType(parentData)"
                :dataType="getDataType(freezeData)"
                :text="freezeData + ''"
                :notLastKey="notLastKey"
                :currentKey="currentKey"
                v-else>
        </simple-text>
    </div>
</template>
<script>
    import VueJson from './index';
    import SimpleText from './simple-text';
    import Checkbox from './checkbox';
    import BracketsLeft from './brackets-left';
    import BracketsRight from './brackets-right';

    export default {
        name: 'vue-json',
        components: {
            SimpleText,
            Checkbox,
            BracketsLeft,
            BracketsRight,
            VueJson
        },
        props: {
            /* 外部可用 START */
            // 当前树的数据
            data: {},
            // 定义树的深度, 大于该深度的子树将不被展开
            deep: {
                type: Number,
                default: Infinity
            },
            // 数据层级顶级路径
            path: {
                type: String,
                default: 'root'
            },
            // 定义数据层级支持的选中方式, 默认无该功能
            selectableType: {
                type: String,
                default: '' // both, checkbox, tree
            },
            // 定义已选中的数据层级
            pathChecked: {
                type: Array,
                default: () => []
            },
            // 定义某个数据层级是否支持选中操作
            pathSelectable: {
                type: Function,
                default: () => true
            },
            // 限制一次能展示出来多少个节点，避免一次性加载过多数据导致页面卡死
            keyNumberLimit: {
                type: Number,
                default: 30
            },
            /* 外部可用 END */
            // 当前树的父级数据
            parentData: {},
            // 当前树的深度, 以根节点作为0开始, 所以第一层树的深度为1, 递归逐次递增
            currentDeep: {
                type: Number,
                default: 1
            },
            // 当前树的数据 data 为数组时 currentKey 表示索引, 为对象时表示键名
            currentKey: [Number, String]
        },
        data() {
            const page = 1;
            return {
                page,
                visible: this.currentDeep <= this.deep,
                treeContentBackground: 'transparent',
                checkboxVal: this.pathChecked.includes(this.path) // 复选框的值
            };
        },
        computed: {
            freezeData() {
                return Object.freeze(this.data);
            },
            isArrayData() {
                return Array.isArray(this.data);
            },
            countOfNode() {
                return this.isArrayData ? this.data.length : Object.keys(this.data).length;
            },
            maxLength() {
                return this.keyNumberLimit * this.page;
            },
            // 获取当前 data 中最后一项的 key 或 索引, 便于界面判断是否添加 ","
            lastKey() {
                if (Array.isArray(this.parentData)) {
                    return this.parentData.length - 1;
                } else if (this.isObject(this.parentData)) {
                    const arr = Object.keys(this.parentData);
                    return arr[arr.length - 1];
                }
            },
            // 是否不是最后一项
            notLastKey() {
                return this.currentKey !== this.lastKey;
            },
            // 当前的树是否支持选中功能
            selectable() {
                return this.pathSelectable(this.path, this.freezeData);
            },
            // 存在复选框
            existCheckbox() {
                return this.selectableType === 'both' || this.selectableType === 'checkbox';
            },
            // 存在mouseover
            existMouseover() {
                return this.selectableType === 'both' || this.selectableType === 'tree';
            }
        },
        methods: {
            /**
             * 触发组件的 click 事件
             * @param  {Boolean} changed 复选框值是否已改变(如果来自复选框 change 事件则已改变)
             */
            handleClick(event, changed = false) {
                // 由于 checkbox 也依赖该函数, 因此通过 changed 进行排除
                /* eslint no-mixed-operators:0 */
                if (!changed && !this.existMouseover || !this.selectable) return;
                changed || (this.checkboxVal = !this.checkboxVal);
                this.$emit('click', this.path, this.freezeData, this.checkboxVal);
            },
            // 处理子树触发的 click 事件, 并传递到顶层
            handleItemClick(path, data, checked) {
                this.$emit('click', path, data, checked);
            },
            handleMouseover() {
                this.existMouseover && this.selectable && (this.treeContentBackground = '#eee');
            },
            handleMouseout() {
                this.existMouseover && this.selectable && (this.treeContentBackground = 'transparent');
            },
            // 工具函数: 判断是否对象
            isObject(value) {
                return this.getDataType(value) === 'object';
            },
            // 获取数据类型
            getDataType(value) {
                // 若使用 typeof 会影响 webpack 压缩后体积变大
                return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
            }
        }
    };
</script>
<style lang="stylus">
    .vjs-checkbox {
        color: #1f2d3d;
        user-select: none;

        .vjs-checkbox__input {
            outline: 0;
            line-height: 1;
            vertical-align: middle;
            cursor: pointer;
            display: inline-block;
            position: relative;
            white-space: nowrap;
            &.is-checked .vjs-checkbox__inner {
                background-color: #20a0ff;
                border-color: #0190fe;
                &:after {
                    transform: rotate(45deg) scaleY(1);
                }
            }
        }

        .vjs-checkbox__inner {
            display: inline-block;
            position: relative;
            border: 1px solid #bfcbd9;
            border-radius: 4px;
            box-sizing: border-box;
            width: 18px;
            height: 18px;
            background-color: #fff;
            z-index: 1;
            transition: border-color .25s cubic-bezier(.71, -.46, .29, 1.46), background-color .25s cubic-bezier(.71, -.46, .29, 1.46);
            &:after {
                box-sizing: content-box;
                content: "";
                border: 2px solid #fff;
                border-left: 0;
                border-top: 0;
                height: 8px;
                left: 5px;
                position: absolute;
                top: 1px;
                transform: rotate(45deg) scaleY(0);
                width: 4px;
                transition: transform .15s cubic-bezier(.71, -.46, .88, .6) .05s;
                transform-origin: center;
            }
        }

        .vjs-checkbox__original {
            opacity: 0;
            outline: 0;
            position: absolute;
            margin: 0;
            width: 0;
            height: 0;
            left: -999px;
        }
    }

    content-padding = 1em; /* 树内容区域缩进2个英文字符, 此处1em为1个中文字符=2个英文字符 */

    .vjs__tree {
        font-family: "Monaco", "Menlo", "Consolas", "Bitstream Vera Sans Mono";
        font-size: 14px;

        .vjs-more-btn {
            padding-left 1em

            &:hover {
                cursor pointer
                color #00c6c6
            }
        }

        .vjs__tree__content {
            padding-left: content-padding;
            border-left: 1px dotted #ccc;
        }
        .vjs__tree__node {
            cursor: pointer;
            &:hover {
                color: #20a0ff;
            }
        }
        .vjs-checkbox {
            position: absolute;
            left: -30px;
        }
        .vjs__value__null {
            color: #ff4949;
        }
        .vjs__value__number,
        .vjs__value__boolean {
            color: #1d8ce0;
        }
        .vjs__value__string {
            color: #13ce66;
        }
    }
</style>
