let showdown = require("showdown");
let jQuery = require("jquery");
let flowchart = require("flowchart.js");
import "../_lib/mathjax3/mj3-tex2svg-global.dist";
import * as _ from "underscore";

function decodeLang(text) {
    return text
      .replace(/¨D/g, '$')
      .replace(/¨T/g, '¨')
      .trim();
}

let flowchartExt = function () {
    let matches = [];
    jQuery(document.head).append('<style>flow-container{display:block;text-align:center;}</style>');
    return [{
        type: 'lang',
        filter: function (text, converter, options) {
            return text.replace(/```\s*flow\s*\n+(((?!```)[^])+)\n+```/gm, function (wholeMatch, match) {
                matches.push(decodeLang(match));
                return '%flowchart_placeholder' + _.size(matches) + '%';
            });
        }
    }, {
        type: 'output',
        filter: function (text, converter, options) {
            if (!_.isEmpty(matches)) {
                let jqCanvas = jQuery('<div id="__canvas">').css({
                    position: 'absolute',
                    top: '-1000px',
                    left: '-1000px'
                }).appendTo(document.body);

                let chart = null;
                _.forEach(matches, function (match, i) {
                    let pattern = '%flowchart_placeholder' + (i + 1) + '%';
                    text = text.replace(new RegExp(pattern, 'g'), function () {
                        if (match) {
                            if (chart) {
                                chart.clean();
                            }
                            try {
                                chart = flowchart.parse(match);
                                chart.drawSVG('__canvas');
                                return '<flow-container>' + jqCanvas.html() + '</flow-container>';
                            } catch (e) {
                                console.log(e);
                            }
                        }
                        return match;
                    });
                });

                matches = [];
                jqCanvas.remove();
            }

            return text;
        }
    }]
};

let mathjaxExt = function () {
    let matches = {display: [], inline: []};
    jQuery(document.head).append(MathJax.Stylesheet());
    jQuery(document.head).append('<style>mjx-container>svg{font-size:1.2em;}</style>');
    return [{
        type: 'lang',
        filter: function (text, converter, options) {
            // filter $ & $$ in code blocks
            let codeMatches = [];
            text = text.replace(/```\s*\w+\s*\n+(((?!```)[^])+)\n+```/gm, function (match) {
                codeMatches.push(match);
                return '%code-placeholder' + _.size(codeMatches) + '%';
            });

            // display
            text = text.replace(/([^\\])¨D¨D(((?!¨D¨D)[^])+)[^\\]?¨D¨D/gm, function (wholeMatch, prevMatch, match) {
                matches.display.push(decodeLang(match));
                return prevMatch + '%mathjax-display-placeholder' + _.size(matches.display) + '%';
            });
            // inline
            text = text.replace(/([^\\])¨D(((?!¨D)[^\n])+)[^\\]?¨D/g, function (wholeMatch, prevMatch, match) {
                matches.inline.push(decodeLang(match));
                return prevMatch + '%mathjax-inline-placeholder' + _.size(matches.inline) + '%';
            });

            _.forEach(codeMatches, function (match, i) {
                text = text.replace(new RegExp('%code-placeholder' + (i + 1) + '%', 'g'), function () {
                    return match;
                });
            });

            return text;
        }
    }, {
        type: 'output',
        filter: function (text, converter, options) {
            if (!_.isEmpty(matches.display) || !_.isEmpty(matches.inline)) {
                // display
                _.forEach(matches.display, function (match, i) {
                    let pattern = '%mathjax-display-placeholder' + (i + 1) + '%';
                    text = text.replace(new RegExp(pattern, 'g'), function () {
                        MathJax.Reset();
                        return MathJax.Typeset(match, true).outerHTML;
                    });
                });
                // inline
                _.forEach(matches.inline, function (match, i) {
                    let pattern = '%mathjax-inline-placeholder' + (i + 1) + '%';
                    text = text.replace(new RegExp(pattern, 'g'), function () {
                        MathJax.Reset();
                        return MathJax.Typeset(match, false).outerHTML;
                    });
                });

                matches.display = [];
                matches.inline = [];
            }
            return text.replace(/\\\$/g, '$');
        }
    }]
};

showdown.extension('mathjax', mathjaxExt);
showdown.extension('flowchart', flowchartExt);

export {showdown};