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
              <PanelContainer>
                <Panel>
                  <PanelHeader className='bg-red fg-white'>
                    <Grid>
                      <Row>
                        <Col xs={12}>
                          <h3>My Campaigns</h3>
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
