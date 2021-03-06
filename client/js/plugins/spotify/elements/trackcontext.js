import SPTableElement from '/js/controls/table.js';
import SPTrackTableDesigner from '/js/plugins/spotify/designers/tracktabledesigner.js';
import SPResourceTableDataSource from '/js/plugins/spotify/datasources/resourcetabledatasource.js';
import SPTrackTableDelegate from '/js/plugins/spotify/elements/tracktabledelegate.js';

export default class SPTrackContextElement extends SPTableElement {
    connectedCallback() {
        super.connectedCallback();
        if (!this.created2) {
            this.columnheaders = ['_', 'name', 'duration', 'artists', 'album'];
            this.created2 = true;
            this.designer = new SPTrackTableDesigner();
            this.dataSource = new SPResourceTableDataSource('', this.query, this.fields, this.maxRows);
            this.delegate = new SPTrackTableDelegate(this);
            let uri =  this.getAttribute('uri');
        
            this.attributeChangedCallback('uri', null, uri);
            this.attributeChangedCallback('fields', null, this.getAttribute('fields'));
            this.created2 = true
        }
    }
}
