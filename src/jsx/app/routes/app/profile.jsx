var Header = require('../../common/header.jsx');
var Sidebar = require('../../common/sidebar.jsx');
var Footer = require('../../common/footer.jsx');

var SocialBanner = React.createClass({
  getInitialState: function() {
    return {
      follow: 'follow me',
      followActive: false,
      likeCount: 999,
      likeActive: false,
      likeTextStyle: 'fg-white'
    };
  },
  handleFollow: function() {
    this.setState({
      follow: 'followed',
      followActive: true
    });
  },
  handleLike: function() {
    this.setState({
      likeCount: 1000,
      likeActive: true,
      likeTextStyle: 'fg-orange75'
    });
  },
  render: function() {
    return (
      <div style={{height: 350, marginTop: -25, backgroundImage: 'url(/imgs/shots/Blick_auf_Manhattan.JPG)', backgroundSize: 'cover', position: 'relative', marginBottom: 25, backgroundPosition: 'center'}}>
        <div className='social-cover' style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
        </div>
        <div className='social-desc'>
          <div>
            <h1 className='fg-white'>Campaign Name</h1>
            <h5 className='fg-white' style={{opacity: 0.8}}>Campaign Address</h5>
            <div style={{marginTop: 50}}>
              <div style={{display: 'inline-block'}}>
                <Button id='likeCount' retainBackground rounded bsStyle='orange75' active={this.state.likeActive} onClick={this.handleLike}>
                  <Icon glyph='icon-fontello-heart-1' />
                </Button>
                <Label className='social-like-count' htmlFor='likeCount'><span className={this.state.likeTextStyle}>{this.state.likeCount} likes</span></Label>
              </div>
            </div>
          </div>
        </div>
        <div className='social-avatar'>
          <Img src='/imgs/avatars/avatar.jpg' height='100' width='100' style={{display: 'block', borderRadius: 100, border: '2px solid #fff', margin: 'auto', marginTop: 50}} />
          <h4 className='fg-white text-center'>Username</h4>
          <h5 className='fg-white text-center' style={{opacity: 0.8}}>User Position</h5>
          <hr className='border-black75' style={{borderWidth: 2}}/>
          <div className='text-center'>
            <Button outlined inverse retainBackground active={this.state.followActive} bsStyle='brightblue' onClick={this.handleFollow}>
              <span>{this.state.follow}</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }
});

var Body = React.createClass({
  componentDidMount: function() {
    $('html').addClass('social');

  },
  componentWillUnmount: function() {
    $('html').removeClass('social');
  },
  render: function() {
    return (
      <Container id='body' className='social'>
        <SocialBanner />
        <Grid>
          <Row>
            <Col xs={12}>
              <PanelContainer noControls>
                <Panel className='force-collapse'>
                  <PanelHeader className='bg-red fg-white tabs'>
                    <TabContainer>
                      <TabList>
                        <Tab pane='tpc_hf:home' active>
                          <Icon bundle='fontello' glyph='home'/>
                        </Tab>
                        <Tab pane='tpc_hf:profile'>
                          <Icon bundle='fontello' glyph='user'/>
                        </Tab>
                        <Tab pane='tpc_hf:settings'>
                          <Icon bundle='fontello' glyph='cog'/>
                        </Tab>
                        <Tab pane='tpc_hf:users'>
                          <Icon bundle='fontello' glyph='key'/>
                        </Tab>
                      </TabList>
                    </TabContainer>
                  </PanelHeader>
                  <PanelBody>
                    <Grid>
                      <Row>
                        <Col xs={12}>
                          <TabContent>
                            <TabPane tab='tpc_hf:home' active >
                            <Grid>
                              <Row>
                                <Col xs={12} style={{padding:0}}>
                                  <h3>My Campaigns</h3>
                                  <Table striped bordered className='tablesaw' data-mode="swipe" data-sortable data-sortable-switch data-mode-switch>
                                    <thead>
                                      <tr>
                                        <th data-sortable-col data-sortable-default-col data-priority='persist'>ID</th>
                                        <th data-sortable-col data-priority='3'>Campagn Name</th>
                                        <th data-sortable-col data-priority='2'>End Date </th>
                                        <th data-sortable-col data-priority='1'><abbr title='Rotten Tomato Rating'>Number of Times Played</abbr></th>
                                        <th data-sortable-col data-priority='4'>Total Spent</th>
                                        <th data-sortable-col data-priority='5'>Max Budget</th>
                                        <th data-sortable-col data-priority='6'>Active (ON/OFF)</th>
                                        <th data-sortable-col data-priority='7'>View</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>1</td>
                                        <td>Xmas</td>
                                        <td>27/10/2015</td>
                                        <td>4</td>
                                        <td>$57</td>
                                        <td>$200</td>
                                        <td>on/off</td>
                                        <td><Button sm outlined style={{marginBottom: 5}} bsStyle='info'>Info</Button>{' '}</td>
                                      </tr>
                                      <tr>
                                        <td>2</td>
                                        <td>Summer</td>
                                        <td>2/10/2015</td>
                                        <td>1</td>
                                        <td>$10</td>
                                        <td>$225</td>
                                        <td>on/off</td>
                                        <td><Button sm outlined style={{marginBottom: 5}} bsStyle='info'>Info</Button>{' '}</td>
                                      </tr>
                                      <tr>
                                        <td>3</td>
                                        <td>Independence day</td>
                                        <td>27/8/2015</td>
                                        <td>15</td>
                                        <td>$200</td>
                                        <td>$1000</td>
                                        <td>on/off</td>
                                        <td><Button sm outlined style={{marginBottom: 5}} bsStyle='info'>Info</Button>{' '}</td>
                                      </tr>
                                      <tr>
                                        <td>4</td>
                                        <td>Halloween</td>
                                        <td>5/4/2015</td>
                                        <td>7</td>
                                        <td>$150</td>
                                        <td>$210</td>
                                        <td>on/off</td>
                                        <td><Button sm outlined style={{marginBottom: 5}} bsStyle='info'>Info</Button>{' '}</td>
                                      </tr>
                                       <tr>
                                        <td>5</td>
                                        <td>The Christmas Feast and Santa Claus</td>
                                        <td>27/10/2015</td>
                                        <td>4</td>
                                        <td>$57</td>
                                        <td>$200</td>
                                        <td>on/off</td>
                                        <td><Button sm outlined style={{marginBottom: 5}} bsStyle='info'>Info</Button>{' '}</td>
                                      </tr>
                                      <tr>
                                        <td>1</td>
                                        <td>public holidays</td>
                                        <td>27/10/2015</td>
                                        <td>4</td>
                                        <td>$57</td>
                                        <td>$200</td>
                                        <td>on/off</td>
                                        <td><Button sm outlined style={{marginBottom: 5}} bsStyle='info'>Info</Button>{' '}</td>
                                      </tr>
                                      <tr>
                                        <td>1</td>
                                        <td>Mother’s Day</td>
                                        <td>27/10/2015</td>
                                        <td>4</td>
                                        <td>$57</td>
                                        <td>$200</td>
                                        <td>on/off</td>
                                        <td><Button sm outlined style={{marginBottom: 5}} bsStyle='info'>Info</Button>{' '}</td>
                                      </tr>
                                       <tr>
                                        <td>1</td>
                                        <td>spring</td>
                                        <td>27/10/2015</td>
                                        <td>4</td>
                                        <td>$57</td>
                                        <td>$200</td>
                                        <td>on/off</td>
                                        <td><Button sm outlined style={{marginBottom: 5}} bsStyle='info'>Info</Button>{' '}</td>
                                      </tr>
                                       <tr>
                                        <td>1</td>
                                        <td>Winter</td>
                                        <td>27/10/2015</td>
                                        <td>4</td>
                                        <td>$57</td>
                                        <td>$200</td>
                                        <td>on/off</td>
                                        <td><Button sm outlined style={{marginBottom: 5}} bsStyle='info'>Info</Button>{' '}</td>
                                      </tr>
                                       <tr>
                                        <td>1</td>
                                        <td>autumn</td>
                                        <td>27/10/2015</td>
                                        <td>4</td>
                                        <td>$57</td>
                                        <td>$200</td>
                                        <td>on/off</td>
                                        <td><Button sm outlined style={{marginBottom: 5}} bsStyle='info'>Info</Button>{' '}</td>
                                      </tr>
                                       <tr>
                                        <td>1</td>
                                        <td>Christmas</td>
                                        <td>27/10/2015</td>
                                        <td>4</td>
                                        <td>$57</td>
                                        <td>$200</td>
                                        <td>on/off</td>
                                        <td><Button sm outlined style={{marginBottom: 5}} bsStyle='info'>Info</Button>{' '}</td>
                                      </tr>
                                       <tr>
                                        <td>1</td>
                                        <td>Summer</td>
                                        <td>27/10/2015</td>
                                        <td>4</td>
                                        <td>57$</td>
                                        <td>$200</td>
                                        <td>on/off</td>
                                        <td><Button sm outlined style={{marginBottom: 5}} bsStyle='info'>Info</Button>{' '}</td>
                                      </tr>
                                       <tr>
                                        <td>1</td>
                                        <td>Mother’s Day</td>
                                        <td>27/10/2015</td>
                                        <td>4</td>
                                        <td>$57</td>
                                        <td>$200</td>
                                        <td>on/off</td>
                                        <td className="text-center"><Button sm outlined style={{marginBottom: 5}} bsStyle='info center-block'>Info</Button>{' '}</td>
                                      </tr>
                                    </tbody>
                                  </Table>
                                </Col>
                              </Row>
                            </Grid>
                            </TabPane>
                            <TabPane tab='tpc_hf:profile'>
                              <h4>About</h4>
                              <p><LoremIpsum query='2s'/></p>
                            </TabPane>
                            <TabPane tab='tpc_hf:settings'>
                              <h4>Settings</h4>
                              <p><LoremIpsum query='2s'/></p>
                            </TabPane>
                            <TabPane tab='tpc_hf:users'>
                              <h4>Change</h4>
                              <p><LoremIpsum query='3s'/></p>
                            </TabPane>


                          </TabContent>
                        </Col>
                      </Row>
                    </Grid>
                  </PanelBody>
                </Panel>
              </PanelContainer>
            </Col>
          </Row>
        </Grid>
        {this.props.children}
      </Container>
    );
  }
});

var classSet = React.addons.classSet;
var Social = React.createClass({
  mixins: [SidebarMixin],
  render: function() {
    var classes = classSet({
      'container-open': this.state.open
    });
    return (
      <Container id='container' className={classes}>
        <Sidebar />
        <Header pressed />
        <Body/>
        <Footer />
      </Container>
    );
  }
});

module.exports = Social;
