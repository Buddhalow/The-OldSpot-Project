import SPPlaylistListElement from '/js/plugins/spotify/components/playlistlist.js';
import SPSearchHeaderElement from '/js/plugins/spotify/elements/searchheader.js';
import SPPlaylistContextElement from '/js/plugins/spotify/elements/playlistcontext.js';
import SPShowContextElement from '/js/plugins/spotify/elements/showcontext.js';
import SPTrackContextElement from '/js/plugins/spotify/elements/trackcontext.js';
import SPEpisodeContextElement from '/js/plugins/spotify/elements/episodecontext.js';
import SPResourceContextElement from '/js/plugins/spotify/elements/resourcecontext.js';
import SPPlaylistElement from '/js/plugins/spotify/elements/playlist.js';
import SPShowElement from '/js/plugins/spotify/elements/show.js';
import SPTrackControlsElement from '/js/plugins/spotify/elements/trackcontrols.js';
import SPAboutArtistElement from '/js/plugins/spotify/elements/aboutartist.js';
import SPAudioBookElement from '/js/plugins/spotify/elements/audiobook.js';
import SPAudioBookContextElement from '/js/plugins/spotify/elements/audiobookcontext.js';
import SPTopListElement from '/js/plugins/spotify/elements/toplist.js';
import SPMenuDataSource from '/js/controls/menudatasource.js';
import store from '/js/plugins/spotify/player.js';

customElements.define('sp-playlist', SPPlaylistElement);
customElements.define('sp-show', SPShowElement);
customElements.define('sp-spotifysearchheader', SPSearchHeaderElement);
customElements.define('sp-playlistlist', SPPlaylistListElement);
customElements.define('sp-playlistcontext', SPPlaylistContextElement);
customElements.define('sp-showcontext', SPShowContextElement);
customElements.define('sp-resourcecontext', SPResourceContextElement);
customElements.define('sp-trackcontext', SPTrackContextElement);
customElements.define('sp-episodecontext', SPEpisodeContextElement);
customElements.define('sp-trackcontrols', SPTrackControlsElement);
customElements.define('sp-audiobook', SPAudioBookElement);
customElements.define('sp-audiobookcontext', SPAudioBookContextElement);
customElements.define('sp-toplist', SPTopListElement);
customElements.define('sp-spotifyaboutartist', SPAboutArtistElement);
document.addEventListener('hook_appfooter', (e) => {
    if (e.priority !== 0) return;
    document.querySelector('sp-hook[data-hook-id="appfooter"]').appendChild(document.createElement('sp-trackcontrols'));
})
document.addEventListener('viewload', async (e) => {
    if (/^bungalow:internal:start$/.test(e.detail.uri)) {
        /* var categoriesTab = e.detail.addTab('categories', '<i class="fa fa-spotify"></i> Categores');
        var container = document.createElement('div');
        container.style.display = 'flex';
        container.style.justifyContent = 'center';
        container.style.alignItems = 'center';
        container.style.width = '100%';
        container.style.height = '100%';
        categoriesTab.appendChild(container);
        categoriesTab.innerHTML = '<sp-flow uri="spotify:category"></sp-flow>'
        var genresTab = e.detail.addTab('genres', '<i class="fa fa-spotify"></i> Genres');
        container = document.createElement('div');
        container.style.display = 'flex';
        container.style.justifyContent = 'center';
        container.style.alignItems = 'center';
        container.style.width = '100%';
        container.style.height = '100%';
        genresTab.appendChild(container);
        genresTab.innerHTML = '<div class="container"><sp-resourcecontext showcolumnheaders="true" fields="name" uri="spotify:genre"></sp-table></div>'*/

    }
})
document.addEventListener('mainmenuload', (e) => {
    let menu = document.createElement('sp-menu');
    let sidebarmenu = document.querySelector('sp-sidebarmenu');
    menu.setAttribute('id', 'spotify-menu');
    sidebarmenu.menu = document.createElement('sp-menu');
    sidebarmenu.label = document.createElement('label');
    sidebarmenu.label.innerHTML = '<i class="fa fa-spotify"></i> ' + _e('Spotify');
  //  sidebarmenu.appendChild(sidebarmenu.label);

    var data =  [
        {
            name: _e('Library'),
            uri: 'spotify:library'
        },
        {
            name: _e('Playlists'),
            uri: 'spotify:library:playlists'
        }
    ];
    sidebarmenu.menu.dataSource = new SPMenuDataSource(
        data
    );
    sidebarmenu.appendChild(sidebarmenu.menu);
});
document.addEventListener('hook_startview', (e) => {
    let hook = document.querySelector('sp-hook[data-hook-id="startview"]');
    let view = document.createElement('sp-spotifystartview');
    hook.appendChild(view);
})
/*
document.addEventListener('hook_searchview', (e) => {
    if (e.data instanceof Object) {
        let hook = document.querySelector('sp-hook[data-hook-id="searchview"]');

        let search = hook.querySelector('sp-spotifysearchview[uri="' + e.data.uri + '"]');
        if (!search) {
            search = document.createElement('sp-spotifysearchview');
            hook.appendChild(search);
            search.setAttribute('uri', e.data.uri);
            $(search).show();
        } else {
            $(search).show();
        }

    }
})
*/
document.addEventListener('hook_rightsidebar', (e) => {
    if (e.priority !== 0) return;
    let hook = document.querySelector('sp-hook[data-hook-id="rightsidebar"]');


});
document.addEventListener('hook_appfooter', (e) => {
    if (e.priority !== 0) return;
    if (e.data instanceof Object) {
        let hook = document.querySelector('sp-hook[data-hook-id="appfooter"]');

        var playingBar = document.createElement('input');
        playingBar.setAttribute('type', 'range');
        playingBar.setAttribute('id', 'player_position');
        appendChild(this.playingBar)
        var player = document.createElement('div');
        player.style = 'display: flex; flex-direction: row; align-items: center; justify-content: center';
        player.innerHTML = '<sp-button id="player_previous_btn" class="fa fa-fast-backward"></sp-button><sp-button id="player_play_pause_btn" class="fa fa-play"></sp-button><sp-button id="player_next_btn" class="fa fa-fast-forward"></sp-button>';
        hook.appendChild(this.player);
    }
});

document.addEventListener('hook_startview', async (e) => {
    if (e.priority !== 1) return;
    let hook = document.querySelector('sp-hook[data-hook-id="startview"]');
    let elm = document.createElement('elm');
    let result = await store.request('GET', 'spotify:browse:new-releases', null, null, false, true);
    let result2 = await store.request('GET', 'spotify:me:top:artist', null, null, false, true);
    elm.innerHTML = `
        <div style="width: 500pt">
            <h2 style="padding-left: 20pt; color: #aaffaa">What's New?</h2>   
            <div style="flex-direction: row; display: flex; align-content: stretch; flex-wrap: wrap; justify-content: stretch; width: 100%">   
                ${result.albums.items.slice(0, 8).map(a => `
                     <sp-link uri="${a.uri}" style="padding: 20pt"><sp-image src="${a.images[0].url}" style="width:76pt; height: 76pt" /></sp-link>
                `).join('')}
            </div>
        </div>
        <hr>
        <div style="width: 500pt" class="hidden-2010">
            <h2 style="padding-left: 20pt; color: #ffaaff">Artists you might like</h2>
            <fieldset style="padding: 20pt">
                <legend></legend>
                <div style="flex-direction: row; display: flex; flex-wrap: wrap; align-content: space-between; height: 230pt; justify-content: space-between; width: 100%">   
                    ${result2.items.slice(0, 8).map(a => `
                         <sp-link uri="${a.uri}"><sp-image src="${a.images[0].url}" width="100%" /></sp-link>
                    `).join('')}
                </div>
            </fieldset>
        </div>
    `;
    hook.appendChild(elm);


});


document.addEventListener('viewload', (e) => {
    if (/^bungalow:search:(.*)$/.test(e.detail.uri)) {
        var tab = e.detail.addTab('spotify-search', '<i class="fa fa-spotify"></i> Tracks');
        var container = document.createElement('div');
        container.style.display = 'flex';
        container.style.width = '100%';
        container.style.height = '100%';
        tab.appendChild(container);
        tab.style.height = '100%';
        tab.style.alignItems = 'center';
        tab.style.justifyContent = 'center';
        let uri = 'spotify:' + (e.detail.uri.split(/:/g).slice(1).join(':'))
        let search = container.querySelector('spotify-searchview[uri="' + uri + '"]');
        if (!search) {
            search = document.createElement('spotify-searchview');
            container.appendChild(search);
            search.setAttribute('uri', 'spotify:' + (e.detail.uri.split(/:/g).slice(1).join(':')));
            $(search).show();
        } else {
        }

    }
})

document.addEventListener('hook_album', (e) => {
    if (e.data instanceof Object) {
        let hook = document.querySelector('sp-hook[data-hook-id="searchview"]');

        let search = hook.querySelector('spotify-searchview[uri="' + e.detail.uri + '"]');
        if (!search) {
            search = document.createElement('spotify-searchview');
            hook.appendChild(search);
            search.setAttribute('uri', e.detail.uri);
            $(search).show();
        } else {
            $(search).show();
        }
    }
})
document.addEventListener('viewstackloaded', () => {

});

