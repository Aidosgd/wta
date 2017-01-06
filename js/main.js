new WOW().init();

$(document).ready(function() {
    $('#wtaText').mouseParallax({ moveFactor: 5 });
    $('#wtaCircle').mouseParallax({ moveFactor: 10 });

    var mapAnimation = false;

    $(window).scroll(function() {
        if ($(this).scrollTop() >= 50 && mapAnimation == false) {
            mapAnimation = true;
            $('.map-img').animate({
                'bottom': 10 + '%'
            })
        }

        if ($(this).scrollTop() === 0 && mapAnimation == true) {
            mapAnimation = false;
            $('.map-img').animate({
                'bottom': 23 + '%'
            })
        }
    });

    $(function() {
        var $sidebar   = $("#sidebar"),
            $window    = $(window),
            offset     = $sidebar.offset(),
            topPadding = 300;

        $window.scroll(function() {
            if ($window.scrollTop() > offset.top - 200) {
                $sidebar.stop().css({
                    marginTop: $window.scrollTop() - offset.top + topPadding
                });
            } else {
                $sidebar.stop().css({
                    marginTop: 100
                });
            }
        });

    });

    $(document).on('click', 'a', function(event){
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top - 100
        }, 500);
    });

    var lastId, topMenu = $("#sidebar"),
    topMenuHeight = topMenu.outerHeight()+15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
    });

    // Bind to scroll
    $(window).scroll(function(){
        // Get container scroll position
        var fromTop = $(this).scrollTop()+topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function(){
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length-1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("active")
                .end().filter("[href='#"+id+"']").parent().addClass("active");
        }
    });
});