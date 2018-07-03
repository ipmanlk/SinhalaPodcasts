//set side menu
$(document).on("pagecreate", "#index", function (e) {
    var activePage = this;
    $("#sideMenu").one("panelbeforeopen", function () {
        var screen = $.mobile.getScreenHeight(),
            header = $(".ui-header", activePage).hasClass("ui-header-fixed") ? $(".ui-header", activePage).outerHeight() - 1 : $(".ui-header", activePage).outerHeight(),
            //footer = $(".ui-footer", activePage).hasClass("ui-footer-fixed") ? $(".ui-footer", activePage).outerHeight() - 1 : $(".ui-footer", activePage).outerHeight(),
            // panelheight = screen - header - footer;
            panelheight = screen - header;
        $('.ui-panel').css({
            'top': header,
            'min-height': panelheight
        });
    });
});
