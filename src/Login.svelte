<script>
import { onMount, setContext } from 'svelte';
import  "regenerator-runtime";

//
// import createAuth0Client from '@auth0/auth0-spa-js';

const domain = 'dataventures.au.auth0.com'
const client_id = 'AfwkL2LbJnQq1noRgp012S710Wn2rB7N'
const audience = 'csv-service'
const scope = 'openid'
const location = window.location
const returnTo = location.protocol + "/" + "/" + location.hostname + ":" + location.port + "/index.html"
console.log("Login component loaded")

var auth0
export var user
export function getToken() {
	return auth0.getTokenSilently()
}

onMount(() => {
	const link = document.createElement('script');
	link.src = 'https://cdn.auth0.com/js/auth0-spa-js/1.0/auth0-spa-js.production.js';
	link.onload = async () => {
			console.log("loaded!!", createAuth0Client)
			auth0 = await createAuth0Client({domain,client_id,audience,scope,"redirect_uri":returnTo})
			window.addEventListener('load', async () => {
			  const redirectResult = await auth0.handleRedirectCallback();
			  //logged in. you can get the user profile like this:
			  user = await auth0.getUser();
			  console.log(user);
			});
			// enable log in button

	}

	document.head.appendChild(link);
	return () => {
		// map.remove();
		link.parentNode.removeChild(link);
	};
});

async function login() {
	var isAuthenticated = await auth0.isAuthenticated();
	user = await auth0.getUser()
	if (!user) {
		auth0.loginWithRedirect();
	}
}

function logout() {
	console.log("attempting logout")
  auth0.logout({returnTo});
}
</script>

{#if user}
	<img id="#userpic" alt="user picture" src={user.picture} on:click={logout} />
{:else}
	<button id="btn-login" disabled={!auth0} on:click={login}>Log in</button>
{/if}
