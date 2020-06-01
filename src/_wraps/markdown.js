let showdown = require("showdown");
let jQuery = require("jquery");
let flowChart = require("flowchart.js");

function decodeLang(text) {
    return text
      .replace(/¨D/g, '$')
      .replace(/¨T/g, '¨')
      .trim();
}

let flowchartExt = {
    type: 'flowchart',
    filter: function (text, converter, options) {

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
                                    //ignored
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
    }
};

showdown.extension("flowchart", flowchartExt);

export {showdown};