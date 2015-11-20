var Header = require('../../common/header.jsx');
var Sidebar = require('../../common/sidebar.jsx');
var Footer = require('../../common/footer.jsx');

var MapContainer = React.createClass({
  render: function() {
    return (
      <PanelContainer noControls>
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

  toggleEditable: function() {
    $('.times, .days').editable('toggleDisabled');
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

    // tags
    $('.times').editable({
      mode: this.state.mode,
      inputclass: 'input-large',
      select2: {
        tags: ['08:00 - 12:00', '12:00 - 18:00', '18:00 - 24:00', '24:00 - 08:00'],
        tokenSeparators: [',', ' ']
      },
      disabled:true
    });
    $('.days').editable({
      mode: this.state.mode,
      inputclass: 'input-large',
      select2: {
        tags: ['monday', 'Tuesday', 'Wednesday', 'Thursday','Friday','Saturday','Sunday'],
        tokenSeparators: [',', ' ']
      },
      disabled:true
    });
  },


  render: function() {
    return (
      <Container id='body' noControls>
        <Grid>
          <Row>
            <Col sm={12} collapseRight>
              <MapContainer id='markers' name='Create Zone' />
            </Col>
          </Row>
          <PanelContainer >
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
                            <th>Max Bid</th>
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
                            <td>0.2$</td>
                            <td>
                              <a href='#' key={this.state.refresh} className='times' data-type='select2' data-placement='left' data-pk='1' data-title='Enter tags'>12:00 - 18:00</a>
                            </td>
                            <td>
                              <a href='#' key={this.state.refresh} className='days' data-type='select2' data-placement='left' data-pk='1' data-title='Enter tags'>Monday, Friday</a>
                            </td>
                            <td><Button sm outlined bsStyle='green' onClick={this.toggleEditable}>Edit</Button></td>
                            <td>
                              <Checkbox value='option1' name='checkbox-options'></Checkbox>
                            </td>
                          </tr>
                          <tr>
                            <td>Zone 2</td>
                            <td>50</td>
                            <td>0.8$</td>
                            <td>
                              <a href='#' key={this.state.refresh} className='times' data-type='select2' data-placement='left' data-pk='1' data-title='Enter tags'>12:00 - 18:00</a>
                            </td>
                            <td>
                              <a href='#' key={this.state.refresh} className='days' data-type='select2' data-placement='left' data-pk='1' data-title='Enter tags'>Monday</a>
                            </td>
                            <td><Button sm outlined bsStyle='green' onClick={this.toggleEditable}>Edit</Button></td>
                            <td>
                              <Checkbox value='option1' name='checkbox-options'></Checkbox>
                            </td>
                          </tr>
                          <tr>
                            <td>Zone 3</td>
                            <td>70</td>
                            <td>0.9$</td>
                            <td>
                              <a href='#' key={this.state.refresh} className='times' data-type='select2' data-placement='left' data-pk='1' data-title='Enter tags'>12:00 - 18:00</a>
                            </td>
                            <td>
                              <a href='#' key={this.state.refresh} className='days' data-type='select2' data-placement='left' data-pk='1' data-title='Enter tags'>Tursday, Monday</a>
                            </td>
                            <td><Button sm outlined bsStyle='green' onClick={this.toggleEditable}>Edit</Button></td>
                            <td>
                              <Checkbox value='option1' name='checkbox-options'></Checkbox>
                            </td>
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
