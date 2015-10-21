var Header = require('../../common/header.jsx');
var Sidebar = require('../../common/sidebar.jsx');
var Footer = require('../../common/footer.jsx');

var Body = React.createClass({
  render: function() {
    return (
      <Container id='body'>
        <Grid gutterBottom>
          <Row>
            <Col sm={12} className='text-center'>
              <PanelContainer>
                <Panel>
                  <PanelBody>
                    <Grid>
                      <Row>
                        <Col xs={12}>
                          <div>
                            <Icon style={{fontSize: 160, lineHeight: 1}} glyph='icon-stroke-gap-icons-Mail' />
                          </div>

                          <h4 style={{marginBottom:10}}>
                            Thank you for registration...
                          </h4>
                          <h3 style={{marginBottom: 15, marginTop: 0}}>Please check your E-mail!</h3>
                          <h4>After verifing your E-mail you can log in</h4>
                        </Col>
                          <Col>
                            <Grid>
                              <Row>
                                <Col xs={12}  className='text-center' style={{marginBottom: 55, marginTop: 20}}>
                                    <Link to='/app/login'><Button lg  style={{marginBottom: 0}} bsStyle='success'>Log In</Button></Link>
                                </Col>
                              </Row>
                            </Grid>
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
var Confirm = React.createClass({
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

module.exports = Confirm;
