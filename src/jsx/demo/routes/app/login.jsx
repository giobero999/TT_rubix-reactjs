var Header = require('../../common/header.jsx');
var Sidebar = require('../../common/sidebar.jsx');
var Footer = require('../../common/footer.jsx');

var Body = React.createClass({
  mixins: [ReactRouter.State, ReactRouter.Navigation],
  back: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.transitionTo('/app/invoice');
  },
  componentDidMount: function() {
    $('html').addClass('authentication');
  },
  componentWillUnmount: function() {
    $('html').removeClass('authentication');
  },
  render: function() {
    return (
      <Container id='auth-container' className='login'>
        <Container id='auth-row'>
          <Container id='auth-cell'>
            <Grid>
              <Row>
                <Col sm={12} >
                  <PanelContainer noControls style={{borderRadius:0}}>
                    <Panel >
                      <PanelBody style={{padding: 0, borderRadius:1}} >
                        <div className='text-center bg-red fg-white login-header-bg'>
                          <h3 style={{margin: 0, padding: 20, fontSize:30}}>Sign in to Taxitube</h3>
                        </div>
                        <div className='bg-hoverblue fg-black50 text-center' style={{padding: 12.5}}>

                          <div style={{marginTop: 12.5, marginBottom: 8.5}}>
                            <Button id='facebook-btn' lg bsStyle='darkblue' type='submit' onClick={this.back}>
                              <Icon glyph='icon-fontello-facebook' />
                              <span>Sign in <span className='hidden-xs'>with facebook</span></span>
                            </Button>
                          </div>
                          <div>
                            <a id='twitter-link' href='#' onClick={this.back}><Icon glyph='icon-fontello-twitter' /><span> or with twitter</span></a>
                          </div>
                        </div>
                        <div>
                          <div className='text-center' style={{padding: 12.5}}>
                            or use your taxitube account
                          </div>
                          <div style={{padding: 2, paddingTop: 0, paddingBottom: 0, margin: 20, marginBottom: 5, marginTop: 10}}>
                            <Form onSubmit={this.back}>
                              <FormGroup>
                                <InputGroup lg>
                                  <InputGroupAddon>
                                    <Icon glyph='icon-fontello-user' />
                                  </InputGroupAddon>
                                  <Input autoFocus type='text' id='emailaddress' className='border-focus-blue' placeholder='username' />
                                </InputGroup>
                              </FormGroup>
                              <FormGroup>
                                <InputGroup lg>
                                  <InputGroupAddon>
                                    <Icon glyph='icon-fontello-key' />
                                  </InputGroupAddon>
                                  <Input type='password' id='password' className='border-focus-blue' placeholder='password' />
                                </InputGroup>
                              </FormGroup>
                              <FormGroup>
                                <Grid>
                                  <Row>
                                    <Col xs={6} collapseLeft collapseRight style={{paddingTop: 10}}>
                                      <Link to='/app/signup' >Create a taxitube account</Link>
                                    </Col>
                                    <Col xs={6} collapseLeft collapseRight className='text-right'>
                                      <Button  lg type='submit'  bsStyle='red' onClick={this.back}>Login</Button>
                                    </Col>
                                  </Row>
                                </Grid>
                              </FormGroup>
                            </Form>
                          </div>
                        </div>
                      </PanelBody>
                    </Panel>
                  </PanelContainer>
                </Col>
              </Row>
            </Grid>
          </Container>
        </Container>
      </Container>
    );
  }
});

var classSet = React.addons.classSet;
var LoginPage = React.createClass({
  mixins: [SidebarMixin],
  render: function() {
    var classes = classSet({
      'container-open': this.state.open
    });
    return (
      <Container id='container' className={classes}>
        <Body/>
      </Container>
    );
  }
});

module.exports = LoginPage;
