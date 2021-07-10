function CompileHeader(){
	return `	<div class="bloc-sm mx-auto">
		<div class="header_bloc_logo">
			<a class="navbar-brand mx-auto flex" href="#">
				<img src="img/logo.png" alt="Orinoco" width="240" height="60" />
			</a>
			<button class="navbar-toggler navbar-light bg-light d-md-none .d-xs-block" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
		</div>
		<div class="header_bloc_nav header_nav_borders">
			<nav class="navbar navbar-expand-md">
				<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav mx-auto">
						<li class="nav-item active">
							<a class="nav-link" href="./index.html">Accueil</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">S'enregistrer</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Se Connecter</a>
						</li>
						<li class="nav-item">
							<a class="disabled nav-link" id="navlink-basket" href="basket.html" tabindex="-1" aria-disabled="true"><span class="visually-hidden">(current)</span>Panier</a>
						</li>
					</ul>
				</div>
			</nav>
		</div>
		<div class="navbar-hidden header_nav_borders"></div>
	</div>`;
}