import SPViewElement from '/js/concepts/music/views/view.js';
import {getParentElementByClass} from "/js/util/dom.js";
import store from '/js/concepts/music/store.js';

export default class SPSearchViewElement extends SPViewElement {
    connectedCallback() {
        super.connectedCallback();
        if (!this.created3) {
            this.classList.add('sp-view');
            this.header = document.createElement('div');
            this.header.innerHTML = "<div style='padding: 13pt'><h3>Search results for '<span id='q'>'</span>";
            this.appendChild(this.header);
            this.trackcontext = document.createElement('sp-trackcontext');
            this.trackcontext.setAttribute('expands', 'true');
            this.appendChild(this.trackcontext);

            this.trackcontext.setAttribute('showcolumnheaders', 'true');
            this.trackcontext.header = (this.header);
            this.trackcontext.view = getParentElementByClass(this, 'sp-view');
            this.created3 = true;
        }
    }
    attachedCallback() {
        this.trackcontext.render()
    }
    activate() {
        let uri = ''
        if (this.hasAttribute('uri')) {
            uri = this.getAttribute('uri');
        } else {
            uri = "music:search"
        }
        let query = uri .substr('music:search:'.length);
        window.GlobalTabBar.setState({
            id: query,
            uri: uri,
            name: query,
            type: 'search',
            objects: [{
                name: _e('Search'),
                id: 'overview'
            }],
            object: {
                name: query,
                uri: 'music:search:' + query
            }
        })
    }
    acceptsUri(uri) {
        return /^music:search:(.*)$/.test(uri);
    }
    navigate() {

    }
    async attributeChangedCallback(attrName, oldVal, newVal) {
        if (!newVal) return;
        if (attrName === 'uri') {
            let query = newVal.split(/:/)[2];
            this.trackcontext.query = query;
            this.trackcontext.setAttribute('uri', 'music:search?q=' + query + '&type=track');
            let artists = await store.request('GET', 'music:search?q=' + query + '&type=artist');
            let albums = await store.request('GET', 'music:search?q=' + query + '&type=album');
            this.header.innerHTML = `
                <div class="container">
                    <div class="row">
                        <div class="col-md-4" style="padding: 20pt">
                            <h3>Artists</h3>
                                                 
                                ${artists.objects.slice(0, 5).map(a => `<sp-link uri="${a.uri}">${a.name}</sp-link>`).join(', ')}
                            
                        </div>
                        <div class="col-md-4" style="padding: 20pt">
                            <h3>Albums</h3>
                                           
                                ${albums.objects.slice(0, 5).map(a => `<sp-link uri="${a.uri}">${ a.name}</sp-link>`).join(', ')}
                            
                        </div>
                        <div class="col-md-4" style="padding: 20pt">
                             <h2>About X hits</h2>
                             <p>Matched x artists, x albums and x tracks</p>
                        </div>
                      </div>
                 </div>︎
`;
            this.activate();
            /* let tracks = $.getJSON('/api/music/search/' + query + '/track');
            let albums = $.getJSON('/api/music/search/' + query + '/release');
            let artists = $.getJSON('/api/music/search/' + query + '/artist');
            this.querySelector('sp-musicsearchheader').state = ({
                tracks: tracks,
                artists: artists,
                albums: albums
            });*/
        }
    }
}
