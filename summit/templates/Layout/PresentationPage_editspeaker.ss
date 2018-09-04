<% include PresentationPage_HeaderNav CurrentStep=3 %>

<div class="presentation-app-body">
	<div class="container">
		<div class="row">
			<div class="col-lg-3 col-md-3">
				<% include SpeakerSidebar ActiveLink='presentations' %>
			</div>
			<div class="col-lg-9 col-md-9">
				<div class="presentation-main-panel">
					<div class="main-panel-section">
						<h2>Edit Your Speaker/Moderator Information</h2>
					</div>
					$EditSpeakerForm
				</div>
			</div>
		</div>
	</div>
</div>
