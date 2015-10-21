var Header = require('../../common/header.jsx');
var Sidebar = require('../../common/sidebar.jsx');
var Footer = require('../../common/footer.jsx');

var Body = React.createClass({
  componentDidMount: function() {
    $('#my-awesome-dropzone').dropzone({
      paramName: "file", // The name that will be used to transfer the file
      maxFilesize: 2, // MB
      accept: function(file, done) {
        done();
      }
    });
    $('#wizard-1').steps({
      autoFocus: true
    });

    $("#form-2").validate({
      rules: {
        confirm_password: {
          equalTo: "#password"
        }
      }
    });
  },
  render: function() {
    return (
      <Container id='body'>
        <Grid>
          <Row>
            <Col sm={12}>
              <PanelContainer controlStyles='bg-darkgreen45 fg-white'>
                <Panel>
                  <PanelHeader className='bg-darkgreen45 fg-white' style={{margin: 0}}>
                    <Grid>
                      <Row>
                        <Col xs={12}>
                          <h3>Standart Package</h3>
                        </Col>
                      </Row>
                    </Grid>
                  </PanelHeader>
                  <PanelBody>

                  </PanelBody>
                  <PanelBody>
                    <Grid>

                      <Row>
                        <Col xs={12}>
                          <Form action='/dropzone/file-upload'
                                className='dropzone'
                                id='my-awesome-dropzone'>
                          </Form>
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
var Standart = React.createClass({
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

module.exports = Standart;

/* start wizard
----------
  <Row>
    <Col xs={12}>
      <div id='wizard-1'>
        <h1>First Step</h1>
        <div>drop or click to upload your picture</div>

        <h1>Second Step</h1>
        <div><LoremIpsum query='5s' /></div>
      </div>
    </Col>
  </Row>
--------
end wizard */
