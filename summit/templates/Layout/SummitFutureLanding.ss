
<div class="tokyo-landing-wrapper boston" style="background: url('{$SummitImage.Image.getURL()}') no-repeat center center">
    <div class="container">
    	<div class="row">
    		<div class="col-sm-12">
                <a href="/summit/">
                    <img class="tokyo-landing-logo" src="/summit/images/summit-logo-red.svg" onerror="this.onerror=null; this.src=/summit/images/summit-logo.png" alt="OpenStack Infrastructure Summit">
                </a>
                <div class="save-the-date"> Save The Date! </div>
    			<h1> $IntroText </h1>
                <div class="summit-location">$MainTitle</div>
                <div class="summit-date">
                   $Summit.DateLabel
                   <br>
                   $LocSubtitle
                </div>
                <h1>SPONSORSHIP INFORMATION</h1>
                <div> 
                    <% if ProspectusUrl %>
                        <a href="{$ProspectusUrl}" class="btn register-btn-lrg" style="margin: 10px;">
                            Sponsorship Prospectus
                            <i class="fa fa-cloud-download"></i>
                        </a>
                    <% end_if %>
                    <% if RegisterUrl %>
                        <a href="{$RegisterUrl}" class="btn register-btn-lrg" style="margin: 10px;">Register Now</a>
                        <p style="margin-top:30px;">
                            <em>More details coming soon...</em>
                        </p>
                    <% end_if %>
                </div>
                <div class="landing-social">
                    <a target="_blank" class="social-icons landing-twitter" onclick="return windowpop(this.href, 545, 433)" href="http://twitter.com/share?text={$ShareText}&url={$AbsoluteLink}"></a>
                    <a target="_blank" class="social-icons landing-facebook" onclick="return windowpop(this.href, 545, 433)" 
                     href="https://www.facebook.com/dialog/feed?
                              app_id={$SiteConfig.getOGApplicationID()}
                              &display=popup&
                              caption=OpenStack
                              &description={$ShareText}
                              &link={$AbsoluteLink}
                              &redirect_uri=https://facebook.com" ></a>
                    <a href="http://www.linkedin.com/shareArticle?mini=true&url={$AbsoluteLink}&title=OpenStack Summit&summary={$ShareText}" target="_blank" class="social-icons landing-linkedin"></a>
                </div>
            </div>
        </div>
    </div>
    <a href="{$PhotoUrl}" class="photo-credit" data-toggle="tooltip" data-placement="left" title="{$PhotoTitle}" target="_blank">
        <i class="fa fa-info-circle"></i>
    </a>
</div>
