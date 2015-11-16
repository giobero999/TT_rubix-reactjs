var Header = require('../../common/header.jsx');
var Sidebar = require('../../common/sidebar.jsx');
var Footer = require('../../common/footer.jsx');

var Body = React.createClass({
  componentDidMount: function() {

    (function() {
      // Create variables (in this scope) to hold the API and image size
      var jcrop_api,
          boundx,
          boundy,

          // Grab some information about the preview pane
          $preview = $('#preview-pane'),
          $pcnt = $('#preview-pane .preview-container'),
          $pimg = $('#preview-pane .preview-container img'),

          xsize = $pcnt.width(),
          ysize = $pcnt.height();

      var updatePreview = function(c) {
        if (parseInt(c.w) > 0) {
          var rx = xsize / c.w;
          var ry = ysize / c.h;

          $pimg.css({
            width: Math.round(rx * boundx) + 'px',
            height: Math.round(ry * boundy) + 'px',
            marginLeft: '-' + Math.round(rx * c.x) + 'px',
            marginTop: '-' + Math.round(ry * c.y) + 'px'
          });
        }
      };

      $(this.refs.aspectwithpreview.getDOMNode()).Jcrop({
        onChange: updatePreview,
        onSelect: updatePreview,
        aspectRatio: 768 / 256,
        setSelect: [ 60, 50, 768, 256 ]
      },function(){
        // Use the API to get the real image size
        var bounds = this.getBounds();
        boundx = bounds[0];
        boundy = bounds[1];
        // Store the API in the jcrop_api variable
        jcrop_api = this;

        // Move the preview into the jcrop container for css positioning
        $preview.appendTo(jcrop_api.ui.holder);
      });
    }.bind(this))();

  },
  render: function() {
    return (
      <Container id='body'>
        <Grid>
          <Row>
          <Col sm={12}>
            <PanelContainer controlStyles='bg-red fg-white'>
              <Panel>
                <PanelHeader className='bg-red fg-white' style={{margin: 0}}>
                  <Grid>
                    <Row>
                      <Col xs={12}>
                        <h3>jCrop : Aspect Ratio with Preview Pane</h3>
                      </Col>

                    </Row>
                  </Grid>
                </PanelHeader>
                <PanelBody>
                  <Grid>
                    <Row>
                      <Col xs={12}>
                        <br/>
                        <Grid>
                          <Row>
                            <Col sm={8} collapseLeft collapseRight>
                              <img src='/imgs/unsplash/hot-air-baloon.jpg' ref='aspectwithpreview' alt='[Jcrop example]' width='100%' height='350' />
                            </Col>
                            <Col sm={4} collapseLeft collapseRight>
                              <div id='preview-pane' style={{display: 'block', position: 'absolute', zIndex: 2000, top: 10, right: '-250px', padding: 6, border: '1px rgba(0,0,0,.4) solid', background: 'white', borderRadius: 6}}>
                                <div className='preview-container' style={{width: 225, height: 170, overflow: 'hidden'}}>
                                  <img src='/imgs/unsplash/hot-air-baloon.jpg' alt='[Jcrop example]' className='jcrop-preview' alt='Preview' width='100%' />
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </Grid>
                        <br/>
                        <div className='description'>
                          <p>
                            <b>An example implementing a preview pane.</b>
                              Obviously the most visual demo, the preview pane is accomplished
                              entirely outside of Jcrop with a simple jQuery-flavored callback.
                              This type of interface could be useful for creating a thumbnail
                              or avatar. The onChange event handler is used to update the
                              view in the preview pane.
                          </p>
                        </div>
                      </Col>
                      <Col xs={12}>
                        <Link to="/app/zones">
                          <Button lg  style={{marginBottom: 5}} bsStyle='success pull-right next' >next</Button>{' '}
                        </Link>
                      </Col>
                    </Row>
                  </Grid>
                </PanelBody>
              </Panel>
            </PanelContainer>

          </Col>
          </Row>
        </Grid>
      </Container>
    );
  }
});

var classSet = React.addons.classSet;
var Crop = React.createClass({
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

module.exports = Crop;
