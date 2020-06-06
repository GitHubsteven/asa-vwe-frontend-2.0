import {showdown} from '../_wraps/markdown';

let converter = new showdown.Converter({tables: true, extensions: ['flowchart', 'mathjax']});

export class ConvertService {
    constructor() {
    }

    /**
     * 将markdown 转化为html
     *
     * @param markdown markdown内容
     * @returns html内容
     */
    makeHtml(markdown) {
        return converter.makeHtml(markdown);
    }

    /**
     * 设置对象所有属性为null
     *
     * @param target 目标对象
     */
    clearObjVal(target) {
        if (!target) return;
        for (let i in target) {
            if (target.hasOwnProperty(i) && target[i]) {
                target[i] = null
            }
        }
    }

    /**
     * 判断物品属性时否为空
     * @param target
     * @returns {boolean}
     */
    isEmptyObj(target) {
        if (!target) return true;
        for (let i in target) {
            if (target.hasOwnProperty(i) && target[i]) {
                if (target[i]) return false;
            }
        }
        return true;
    }

    /**
     * 对数组进行分组
     *
     * @param list 数组
     * @param keyGetter 分组的key
     * @returns {Map<any, any>} es6的map
     */
    groupBy(list, keyGetter) {
        const map = new Map();
        list.forEach((item) => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return map;
    }

    /**
     * 分组评论
     *
     * @param comments 所有评论集合
     * @returns {any}
     */
    divideComment(comments) {
        return this.divideComment2(comments, null);
    }

    divideComment2(comments, firstLayer) {
        if (comments.length === 0) return comments;
        let refIds2CommentsMap = this.groupBy(comments, (ele) => ele.refId);
        let firstLayerComments = refIds2CommentsMap.get(firstLayer || null);
        for (let refId of refIds2CommentsMap.keys()) {
            if (!refId || refId === "null") continue;
            let refIdComments = comments.filter(item => {
                return refId === item._id;
            });
            let parentComment = refIdComments[0];
            if (parentComment) {
                parentComment.subComments = refIds2CommentsMap.get(refId) || [];
            }
        }
        return firstLayerComments;
    }

    /**
     * 生成sessionStorage的保存的key
     * @param scope 作用域：update | add
     * @param id blog.id，可以为空
     * @param name 命名，默认为vo-draft
     * @returns {*}
     */
    buildSessionKey(scope, id, name) {
        if (!name) name = "vo_draft";
        return scope + id + name;
    }
}