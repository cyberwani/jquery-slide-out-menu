(function($) {

    $.dropDown = function(el, o) {

        var d = {
            wrapper: '#subnav',
            inner: '.container',
            close: '.close',
            animspeed: 100,
            revealspeed: 100
        }

        var m = this;

        m.init = function() {

            m.settings = $.extend({}, d, o);
            m.nav = $(el);
            m.wrapper = $(m.settings.wrapper);
            m.inner = $(m.settings.wrapper).find(m.settings.inner);
            m.nav_links = m.nav.find('a');
            m.close = m.wrapper.find(m.settings.close);
            m.is_open = false;
            m.now_open = [];
            m.to_show = [];

            m.nav.on('click','a',function(e){

                e.preventDefault();
                m.nav_links.removeClass('active');
                m.to_show = m.wrapper.find('#'+$(this).attr('data-menu'));

                if(m.to_show[0] === m.now_open[0]){
                    hide_menu();
                }
                else{
                    if(!m.is_open){
                        show_menu();
                    }
                    else{   
                        switch_menu();
                    }
                }

                $(this).addClass('active');

            });

            m.close.on('click', function(e){

                e.preventDefault();

                m.now_open.stop().animate({'opacity':0}, 'fast', function(){
                    m.close.hide();
                    m.inner.hide('fast',function(){
                        m.is_open = false;
                        m.now_open.hide();
                        m.now_open = [];
                        m.nav_links.removeClass('active');
                    });
                })

            });
            
        }

        var show_menu = function() {

            m.to_show.stop().show();

            m.inner.stop().show('fast', function(){
                m.to_show.stop().animate({'opacity':1});
                m.close.stop().show();
            });    

            m.is_open = true;
            m.now_open = m.to_show;

        }

        var hide_menu = function() {

            m.now_open.stop().animate({'opacity':0},'fast',function(){
                m.close.stop().hide();
                m.inner.stop().hide('fast',function(){
                    m.now_open.stop().hide();
                    m.now_open = [];
                    m.is_open = false;
                });
            });

        }

        var switch_menu = function() {

            m.now_open.stop().animate({'opacity':0},'fast',function(){
                m.now_open.hide();
                m.to_show.stop().show();
                m.to_show.stop().animate({'opacity':1},'fast');
                m.now_open = m.to_show;
            });

        }

        m.init();

    }

    $.fn.dropDown = function(o) {

        return this.each(function() {
            if (undefined == $(this).data('dropDown')) {
                var menu = new $.dropDown(this, o);
                $(this).data('dropDown', menu);
            }
        });

    }

})(jQuery);

$('.rsac-nav').dropDown();