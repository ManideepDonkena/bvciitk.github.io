var arrPresent = [];
var section_present = document.getElementById("all-speakers-present");
var m_contents_present = document.getElementById("model_contents_present");

$(document).ready(function () {
    // Fetch data from CSV defined in CONFIG
    if (typeof CONFIG !== 'undefined' && CONFIG.alumniUrl && typeof fetchCSVData === 'function') {
        fetchCSVData(CONFIG.alumniUrl).then(data => {
            arrPresent = data;
            // Ensure IDs are generated if missing
            arrPresent.forEach(item => {
                if (!item.id) item.id = "";
            });
            filterApp();
        });
    } else {
        console.error("Config or Data Loader not found. Falling back to empty list.");
        filterApp();
    }
});

function removeAllChildNodes(element) {
    while (element.firstChild) {
        element.firstChild.remove();
    }
}

function filterApp(filter = 0) {
    removeAllChildNodes(m_contents_present);
    var paras = document.getElementsByClassName('new_row');
    while (paras.length > 0) {
        paras[0].parentNode.removeChild(paras[0]);
    }

    if (filter == 0 || filter.target.value == "all") {
        for (var i = 0; i < arrPresent.length; i++) {
            arrPresent[i].id = "sp" + i.toString();
            addspeakerNew(i);
        }
    }
    else {
        var fil = parseInt(filter.target.value, 10);
        // alert(fil);
        var k = 0;
        for (var i = 0; i < arrPresent.length; i++) {
            if (fil == arrPresent[i].gradyr) {
                arrPresent[i].id = "sp" + i.toString();
                addspeakerNew(k, i);
                k++;
            }
        }
    }
}

//function will add a speaker by using
// the data from the Xth position of the array
function addspeakerNew(x, i = x) {
    //creates an model element to be appended to the m_content class=============================

    // The first word in the name of the variables tells
    // about the type of element
    // and the numbers after these tells us about the
    // position with respect to the parent element
    var div1 = document.createElement("div");
    div1.classList.add("md-modal");

    //can change this md-effect-8 class if want an different effect
    div1.classList.add("md-effect-8");
    div1.setAttribute("id", arrPresent[i].id);
    var div11 = document.createElement("div");
    div11.classList.add("md-content");
    var div111 = document.createElement("div");
    div111.classList.add("md-box-wrapper");
    var div112 = document.createElement("div");
    div112.classList.add("md-close-wrapper");
    var button1121 = document.createElement("button");
    button1121.classList.add("md-close");
    button1121.innerText = "Close";
    var div1111 = document.createElement("div");
    div1111.classList.add("md-pic-wrapper");
    var div1112 = document.createElement("div");
    div1112.classList.add("md-disc");
    div1112.innerHTML = arrPresent[i].about;
    var img11111 = document.createElement("img");
    img11111.setAttribute("src", arrPresent[i].pic);
    var h111112 = document.createElement("h2");
    h111112.innerText = arrPresent[i].name;
    var p11 = document.createElement("div");
    var p22 = document.createElement("div");
    var p33 = document.createElement("div");
    p11.innerText = arrPresent[i].who3;
    p22.innerText = arrPresent[i].who1;
    p33.innerText = arrPresent[i].who2;
    div1111.appendChild(img11111);
    div1111.appendChild(h111112);
    div1111.appendChild(p11);
    div1111.appendChild(p22);
    div1111.appendChild(p33);
    div111.appendChild(div1111);
    div111.appendChild(div1112);
    div112.appendChild(button1121);
    div11.appendChild(div111);
    div11.appendChild(div112);
    div1.appendChild(div11);
    m_contents_present.appendChild(div1);
    //-------------------------------------------------------------------

    //Creates a new row if previous row is completely filled
    if (x % 4 == 0) {
        var row = document.createElement("div");
        row.classList.add("row");
        row.classList.add("new_row");
        var bgrid = document.createElement("div");
        bgrid.classList.add("bgrid-fourth");
        bgrid.classList.add("s-bgrid-third");
        bgrid.classList.add("tab-bgrid-half");
        bgrid.classList.add("mob-bgrid-whole");
        bgrid.classList.add("group");
        //adds a pseudo class 'row-detect' to detect row
        bgrid.classList.add("row-detect-present");
        row.appendChild(bgrid);
        section_present.appendChild(row);
    }
    //============================================================

    // Creates an element to be appended to the row
    var bid = "b" + arrPresent[i].id;
    var link = "javascript:run_model('" + arrPresent[i].id + "','" + bid + "')";
    var ddiv1 = document.createElement("div");
    ddiv1.classList.add("bgrid");
    ddiv1.classList.add("member");
    var da11 = document.createElement("a");
    da11.setAttribute("id", bid);
    da11.setAttribute("href", link);
    var ddiv111 = document.createElement("div");
    ddiv111.classList.add("speaker-pic-wrapper");
    var dimg1111 = document.createElement("img");
    dimg1111.setAttribute("src", arrPresent[i].pic);
    dimg1111.classList.add("speaker-pic");
    var dh31112 = document.createElement("div");
    dh31112.innerText = "Click to know more";
    dh31112.classList.add("speaker-pic-hover");
    var ddiv112 = document.createElement("div");
    ddiv112.classList.add("speaker-name");
    var dh21121 = document.createElement("h2");
    dh21121.innerText = arrPresent[i].name;
    var p = document.createElement("div");
    var p1 = document.createElement("div");
    var p2 = document.createElement("div");
    p1.innerText = arrPresent[i].who1;
    p2.innerText = arrPresent[i].who2;
    ddiv111.appendChild(dimg1111);
    ddiv111.appendChild(dh31112);
    ddiv112.appendChild(dh21121);
    ddiv112.appendChild(p);
    p.appendChild(p1);
    p.appendChild(p2);
    da11.appendChild(ddiv111);
    da11.appendChild(ddiv112);
    ddiv1.appendChild(da11);

    //Detect The last row by the "row-detect" class
    //and adds the created element
    var sbgrid = document.getElementsByClassName("row-detect-present");
    var num = sbgrid.length - 1;
    sbgrid[num].appendChild(ddiv1);
}

// Smoothscrolling 
var ssSmoothScroll = function () {

    $('.smoothscroll').on('click', function (e) {
        var target = this.hash,
            $target = $(target);

        e.preventDefault();
        e.stopPropagation();

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 800, 'swing').promise().done(function () {

            // check if menu is open
            if ($('body').hasClass('menu-is-open')) {
                $('#header-menu-trigger').trigger('click');
            }

            window.location.hash = target;
        });
    });
};
ssSmoothScroll();
