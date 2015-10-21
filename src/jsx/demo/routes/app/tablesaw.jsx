var Header = require('../../common/header.jsx');
var Sidebar = require('../../common/sidebar.jsx');
var Footer = require('../../common/footer.jsx');



var Body = React.createClass({
  componentDidMount: function() {
    $('.tablesaw').table();
  },
  render: function() {
    return (
      <Container id='body'>

        <Grid>
          <Row>
            <Col xs={12}>
              <PanelContainer noOverflow controlStyles='bg-purple fg-white'>
                <Panel>
                  <PanelHeader className='bg-purple fg-white'>
                    <Grid>
                      <Row>
                        <Col xs={12}>
                          <h3>Tablesaw: Kitchen Sink<Button inverse outlined style={{marginBottom: 5}} bsStyle='default'>add</Button>{' '}</h3>
                        </Col>
                      </Row>
                    </Grid>
                  </PanelHeader>
                  <PanelBody>
                    <Grid>
                      <Row>
                        <Col xs={12}>
                          <p>Swipe Mode, ModeSwitch, Sortable, SortableSwitch</p>
                          <Table striped bordered className='tablesaw' data-mode="swipe" data-sortable data-sortable-switch data-mode-switch>
                            <thead>
                              <tr>
                                <th data-sortable-col data-sortable-default-col data-priority='persist'>Movie Title</th>
                                <th data-sortable-col data-priority='3'>Rank</th>
                                <th data-sortable-col data-priority='2'>Year</th>
                                <th data-sortable-col data-priority='1'><abbr title='Rotten Tomato Rating'>Rating</abbr></th>
                                <th data-sortable-col data-priority='4'>Reviews</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td><a href='http://en.wikipedia.org/wiki/Citizen_Kane' data-rel='external'>Citizen Kne</a></td><td className='har'>1</td>
                                <td>1941</td>
                                <td>100%</td>
                                <td>74</td>
                                <td><button type="button" className="btn btn-default">view</button></td>
                              </tr>
                              <tr>
                                <td><a href='http://en.wikipedia.org/wiki/Casablanca_(film)' data-rel='external'>Casablanca</a></td>
                                <td>2</td>
                                <td>1942</td>
                                <td>97%</td>
                                <td>64</td>
                              </tr>
                              <tr>
                                <td><a href='http://en.wikipedia.org/wiki/The_Godfather' data-rel='external'>The Godfather</a></td>
                                <td>3</td>
                                <td>1972</td>
                                <td>97%</td>
                                <td>87</td>
                              </tr>
                              <tr>
                                <td><a href='http://en.wikipedia.org/wiki/Gone_with_the_Wind_(film)' data-rel='external'>Gone with the Wind</a></td>
                                <td>4</td>
                                <td>1939</td>
                                <td>96%</td>
                                <td>87</td>
                              </tr>
                              <tr>
                                <td><a href='http://en.wikipedia.org/wiki/Lawrence_of_Arabia_(film)' data-rel='external'>Lawrence of Arabia</a></td>
                                <td>5</td>
                                <td>1962</td>
                                <td>94%</td>
                                <td>87</td>
                              </tr>
                              <tr>
                                <td><a href='http://en.wikipedia.org/wiki/Lawrence_of_Arabia_(film)' data-rel='external'>Lawrence of Arabia</a></td>
                                <td>5</td>
                                <td>1962</td>
                                <td>94%</td>
                                <td>87</td>
                              </tr>
                              <tr>
                                <td><a href='http://en.wikipedia.org/wiki/Lawrence_of_Arabia_(film)' data-rel='external'>Lawrence of Arabia</a></td>
                                <td>5</td>
                                <td>1962</td>
                                <td>94%</td>
                                <td>87</td>
                              </tr>
                              <tr>
                                <td><a href='http://en.wikipedia.org/wiki/Lawrence_of_Arabia_(film)' data-rel='external'>Lawrence of Arabia</a></td>
                                <td>5</td>
                                <td>1962</td>
                                <td>94%</td>
                                <td>87</td>
                              </tr>
                              <tr>
                                <td><a href='http://en.wikipedia.org/wiki/Lawrence_of_Arabia_(film)' data-rel='external'>Lawrence of Arabia</a></td>
                                <td>5</td>
                                <td>1962</td>
                                <td>94%</td>
                                <td>87</td>
                              </tr>
                              <tr>
                                <td><a href='http://en.wikipedia.org/wiki/Lawrence_of_Arabia_(film)' data-rel='external'>Lawrence of Arabia</a></td>
                                <td>5</td>
                                <td>1962</td>
                                <td>94%</td>
                                <td>87</td>
                              </tr>
                              <tr>
                                <td><a href='http://en.wikipedia.org/wiki/Lawrence_of_Arabia_(film)' data-rel='external'>Lawrence of Arabia</a></td>
                                <td>5</td>
                                <td>1962</td>
                                <td>94%</td>
                                <td>87</td>
                              </tr>
                              <tr>
                                <td><a href='http://en.wikipedia.org/wiki/Lawrence_of_Arabia_(film)' data-rel='external'>Lawrence of Arabia</a></td>
                                <td>5</td>
                                <td>1962</td>
                                <td>94%</td>
                                <td>87</td>
                              </tr>
                              <tr>
                                <td><a href='http://en.wikipedia.org/wiki/Lawrence_of_Arabia_(film)' data-rel='external'>Lawrence of Arabia</a></td>
                                <td>5</td>
                                <td>1962</td>
                                <td>94%</td>
                                <td>87</td>
                              </tr>
                            </tbody>
                          </Table>
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
var Tablesaw = React.createClass({
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



module.exports = Tablesaw;
