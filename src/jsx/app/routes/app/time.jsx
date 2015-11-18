var Header = require('../../common/header.jsx');
var Sidebar = require('../../common/sidebar.jsx');
var Footer = require('../../common/footer.jsx');

var ReactStyle = require('../../react-styles/src/ReactStyle.jsx');

var Contact = React.createClass({
  getInitialState: function() {
    return {
      invited: this.props.invited ? true : false,
      invitedText: this.props.invited ? 'invited' : 'invite'
    };
  },
  handleClick: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      invited: !this.state.invited,
      invitedText: (!this.state.invited) ? 'invited': 'invite'
    });
  },
  render: function() {
    return (
      <tr>
        <td style={{verticalAlign: 'middle', borderTop: this.props.noBorder ? 'none': null}}>
          <img src={'/imgs/avatars/'+this.props.avatar+'.png'} />
        </td>
        <td style={{verticalAlign: 'middle', borderTop: this.props.noBorder ? 'none': null}}>
          {this.props.name}
        </td>
        <td style={{verticalAlign: 'middle', borderTop: this.props.noBorder ? 'none': null}} className='text-right'>
          <Button onlyOnHover bsStyle='orange' active={this.state.invited} onClick={this.handleClick}>
            {this.state.invitedText}
          </Button>
        </td>
      </tr>
    );
  }
});

var Body = React.createClass({
  componentDidMount: function() {
    (function() {
      $(this.refs.datetimepicker1.getDOMNode()).datetimepicker({
        widgetParent: '#datetimepicker1-parent',
      }).hide();

    }.bind(this))();

    ReactStyle.addRules(ReactStyle.create({
      '#ex1': {
        background: '#000'
      }
    }));

    $('#example_3').ionRangeSlider({
      min: 0.1,
      max: 5,
      type: 'single',
      step: 0.1,
      postfix: ' $',
      prettify: false,
      hasGrid: true
    });
  },


 render: function() {
   return (
     <Container id='body'>
       <Grid>
         <Row>
         <PanelHeader className='bg-green fg-white'>
           <Grid>
             <Row>
               <Col xs={12}>
                 <h3>Time</h3>
               </Col>
             </Row>
           </Grid>
         </PanelHeader>
           <Grid>
           <Col sm={12}>
             <PanelContainer controlStyles='bg-brown50 fg-white'>
               <Panel horizontal className='force-collapse'>
                 <PanelBody className='panel-sm-7' style={{padding: 0}}>
                   <Col sm={6} style={{paddingTop: 15}}>
                    <h3>max budget</h3>
                    <div>
                      <Input type='text' id='example_3' ref='example_3' />
                    </div>
                   </Col>
                   <Col sm={6}>
                     <InputGroup className='date' ref='datetimepicker1'>
                       <Input type='text' className='form-control' />
                       <InputGroupAddon>
                         <Icon glyph='icon-fontello-calendar' />
                       </InputGroupAddon>
                     </InputGroup>
                     <div>
                       <h3>End Date</h3>
                       <div id='datetimepicker1-parent'
                            className='datetimepicker-inline'>
                       </div>
                     </div>
                   </Col>
                     <Col xs={12}>
                       <Link to="/app/campaigns">
                         <Button lg  style={{marginBottom: 5}} bsStyle='success pull-right next' >FINISH</Button>{' '}
                       </Link>
                     </Col>
                 </PanelBody>
               </Panel>
             </PanelContainer>
           </Col>

           </Grid>
         </Row>
       </Grid>
     </Container>
   );
 }

 });

var classSet = React.addons.classSet;
var Time = React.createClass({
 mixins: [SidebarMixin],
 render: function() {
   var classes = classSet({
     'dashboard': true,
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

module.exports = Time;
