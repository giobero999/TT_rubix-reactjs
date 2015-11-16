var Header = require('../../common/header.jsx');
var Sidebar = require('../../common/sidebar.jsx');
var Footer = require('../../common/footer.jsx');

var MapContainer = React.createClass({
  render: function() {
    return (
      <PanelContainer>
        <Panel>
          <PanelBody style={{padding: 25}}>
            <h4 className='text-center' style={{marginTop: 0}}>{this.props.name}</h4>
            {this.props.children}
            <div id={this.props.id} style={{height: 450}}></div>
          </PanelBody>
        </Panel>
      </PanelContainer>
    );
  }
});

var Body = React.createClass({
  geocode: null,
  routingmap: null,
  getInitialState: function() {
    return {
      routeslist: []
    };
  },
  geoCode: function(address) {
    GMaps.geocode({
      address: address,
      callback: function(results, status) {
        if (status == 'OK') {
          var latlng = results[0].geometry.location;
          this.geocode.setCenter(latlng.lat(), latlng.lng());
          this.geocode.addMarker({
            lat: latlng.lat(),
            lng: latlng.lng(),
            infoWindow: {
              content: '<div><strong>Address:</strong> '+results[0].formatted_address+'</div>'
            }
          });
        }
      }.bind(this)
    });
  },
  componentDidMount: function() {


    (function() {
      var map = new GMaps({
        scrollwheel: false,
        div: '#markers',
        zoom: 16,
        lat: -12.043333,
        lng: -77.028333
      });

      map.addMarker({
        lat: -12.043333,
        lng: -77.028333,
        title: 'Lima',
        click: function(e) {
          alert('You clicked in this marker');
        }
      });

      map.addMarker({
        lat: -12.043333,
        lng: -77.029333,
        title: 'Lima',
        infoWindow: {
          content: '<p>Some content here!</p>'
        }
      });
    })();




  },
  render: function() {
    return (
      <Container id='body'>
        <Grid>
          <Row>
            <Col sm={12} collapseRight>
              <MapContainer id='markers' name='Create Zone' />
            </Col>
          </Row>
          <PanelContainer>
            <Panel>
              <PanelBody>
                <Grid>
                  <Row>
                    <Col xs={12}>
                      <h4 style={{marginTop: 0}}>Hover table</h4>
                      <Table hover>
                        <thead>
                          <tr>
                            <th>Location</th>
                            <th>Radius</th>
                            <th>Times</th>
                            <th>Days</th>
                            <th>Edit</th>
                            <th>Check</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Zone 1</td>
                            <td>100</td>
                            <td>O.8$</td>
                            <td>8:00</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <Link to="/app/time">
                        <Button lg  style={{marginBottom: 5}} bsStyle='success pull-right next' >next</Button>{' '}
                      </Link>
                    </Col>
                  </Row>
                </Grid>
              </PanelBody>
            </Panel>
          </PanelContainer>
        </Grid>
      </Container>
    );
  }
});

var classSet = React.addons.classSet;
var MorrisJSPage = React.createClass({
  mixins: [SidebarMixin],
  render: function() {
    var classes = classSet({
      'container-open': this.state.open
    });
    return (
      <Container id='container' className={classes}>
        <Sidebar />
        <Header />
        <Body />
        <Footer />
      </Container>
    );
  }
});

module.exports = MorrisJSPage;
