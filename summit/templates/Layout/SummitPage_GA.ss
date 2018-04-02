<% if GA_Data %>
    <% with GA_Data %>
        <!-- Google Code for SUMMIT SALES Conversion Page -->
        <script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js"></script>

        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-{$GAConversionId}"></script>

        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)};

            gtag('js', new Date());

            gtag('config', 'AW-{$GAConversionId}');

            gtag('event', 'conversion', {
                'send_to': 'AW-{$GAConversionId}/{$GAConversionLabel}',
                'transaction_id': ''
            });
        </script>

        <!-- End Google Code for SUMMIT SALES Conversion Page -->
        <!-- Google Code for STACK OVERFLOW Conversion Pixel -->
            <script type='text/javascript'>
            var axel = Math.random()+"";
            var a = axel * 10000000000000;
            document.write('<img src="https://pubads.g.doubleclick.net/activity;xsp=4376466;ord='+ a +'?" width=1 height=1 border=0/>');
            </script>
            <noscript>
            <img src="https://pubads.g.doubleclick.net/activity;xsp=4376466;ord=1?" width=1 height=1 border=0/>
            </noscript>
        <!-- End Google Code for STACK OVERFLOW Conversion Page -->
    <% end_with %>
<% end_if %>