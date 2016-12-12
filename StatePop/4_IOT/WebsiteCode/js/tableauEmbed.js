

// window.onload=function() {
//
//
//     var vizDiv = document.getElementById("viz");
//     var vizURL = "https://public.tableau.com/profile/robert.mccauley#!/vizhome/Alexa_0/UnitedStates";
//     var tableau_options = {
//         width: '1200px',
//         height: '640px',
//         hideToolbar: true,
//         hideTabs: true
//
//     };
//
//     viz = new tableauSoftware.Viz(vizDiv, vizURL, tableau_options);
//
//
//
//     // var divElement = document.getElementById('viz1480283319774');
//     // var vizElement = divElement.getElementsByTagName('object')[0];
//     // vizElement.style.width = '100%';
//     // vizElement.style.height = (divElement.offsetWidth * 0.65) + 'px';
//     // var scriptElement = document.createElement('script');
//     // scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
//     // vizElement.parentNode.insertBefore(scriptElement, vizElement);
// }


var viz;

function initViz() {
    var containerDiv = document.getElementById("vizContainer"),
        url = "https://public.tableau.com/views/Alexa_0/StateGameMap",
        // https://public.tableau.com/views/Alexa_0/StateGameMap?:embed=y&:display_count=yes
        // url = "http://public.tableau.com/views/RegionalSampleWorkbook/Storms",
            options = {
                hideTabs: true,
                onFirstInteractive: function () {
                    console.log("Run this code when the viz has finished loading.");
                }
            };
            viz = new tableau.Viz(containerDiv, url, options); // Create a viz object and embed it in the container div.
     }
    // Read more at https://onlinehelp.tableau.com/current/api/js_api/en-us/JavaScriptAPI/js_api_sample_basic_embed.html#ceKpHMGLwPyWkz0c.99

// Read more at https://onlinehelp.tableau.com/current/api/js_api/en-us/JavaScriptAPI/js_api.htm#F9L9o81IoV8CQ9iB.99


function filterState(st) {
    // alert('filtering on ' + st);
    //var divElement = document.getElementById('vizContainer');
    //var vizElement = divElement.getElementsByTagName('object')[0];

    console.log('filter on ' + st + ' for you!');
    // console.log(typeof divElement);
    // console.log(typeof vizElement);

    sheet = viz.getWorkbook().getActiveSheet();

    if(sheet.getSheetType() == 'worksheet') {
        sheet.applyFilterAsync("State", st, tableau.FilterUpdateType.ADD);
        console.log("is a worksheet");
    }
    // else {
    //     worksheetArray = sheet.getWorksheets();
    //     console.log("is NOT a worksheet");
    //     worksheetArray[0].applyFilterAsync("State", st, 'ADD');
    // }




}