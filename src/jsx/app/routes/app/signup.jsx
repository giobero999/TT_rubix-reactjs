var Header = require('../../common/header.jsx');
var Sidebar = require('../../common/sidebar.jsx');
var Footer = require('../../common/footer.jsx');

var Body = React.createClass({
  mixins: [ReactRouter.State, ReactRouter.Navigation],
  back: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.transitionTo('/app/confirm');
  },


handleSubmit:function(e){
    e.preventDefault();
    e.stopPropagation();
    console.log("redirecting..");

	var userEmail = document.getElementById('useremail');

	if (fieldsAreNotEmpty()){
		if(checkPass()){

			console.log("yvelaferi shevsebulia")
			var formData = {
			  emailaddress: this.refs.emailaddress.getDOMNode().value,
			  emailaddress2: this.refs.emailaddress2.getDOMNode().value,
			  useremail: this.refs.useremail.getDOMNode().value,
			  customerid: this.refs.customerid.getDOMNode().value,
			  customername: this.refs.customername.getDOMNode().value,
			  city: this.refs.city.getDOMNode().value,
			  country: this.refs.country.getDOMNode().value,
			  postcode: this.refs.postcode.getDOMNode().value,
			  password: this.refs.password.getDOMNode().value,
			  passwordconfirm: this.refs.passwordconfirm.getDOMNode().value,
			  phone: this.refs.phone.getDOMNode().value,
			  director: this.refs.director.getDOMNode().value,
			  username: this.refs.username.getDOMNode().value
			}; //Array
			console.log("rformdatas shemdeg");

			$.ajax({
			  url: "registerurl",
			  type: "POST",
			  data: formData,
			  success: function (data, textStatus, jqXHR) {
				console.log("received=" + data);
				if (data == 1) {
				  $('#error_msg').html("User exists");
				} else {
				  $('#error_msg').html("success redirecting..");
				  $(location).attr('href', '/index.html');
				}

				console.log("submited");
				//data - response from server
			  },
			  error: function (jqXHR, textStatus, errorThrown) {
				console.log("error");
			  }
			});
		}
    // this.transitionTo('/app/confirm');
    }
	else{
      console.log("romeligaca veli aravaliduria");
    }

},
componentDidMount: function() {
    $('html').addClass('authentication');
    $('#phone,#postcode').keypress(function (e) {
     //if the letter is not digit then display error and don't type anything
     if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57))
      {
        return false;
    }
   });
  },
  componentWillUnmount: function() {
    $('html').removeClass('authentication');
  },
  render: function() {
    return (
      <Container id='auth-container' className='signup' >
        <Container id='auth-row'>
          <Container id='auth-cell'>
            <Grid>
              <Row>
                <Col lg={12}>
                  <PanelContainer noControls>
                    <Panel>
                      <PanelBody style={{padding: 0}}>
                        <div className='text-center bg-darkblue fg-white'>
                          <h3 style={{margin: 0, padding: 25}}>Sign up</h3>
                         <div id="error_msg"></div>
                        </div>
                        <div>
                          <div style={{padding: 25, paddingTop: 0, paddingBottom: 0, margin: 'auto', marginBottom: 25, marginTop: 25}}>
                            <Form onSubmit={this.handleSubmit}>
                              <FormGroup>
                                <InputGroup md>
                                  <InputGroupAddon>
                                    <Icon glyph='icon-fontello-user' />
                                  </InputGroupAddon>
                                  <Input autoFocus type='text' ref = 'customername' id='customername' className='border-focus-blue' placeholder='Customer Name' />
		                              <InputGroupAddon>
                                    <Icon glyph='icon-fontello-th-large' />
                                  </InputGroupAddon>
                                  <Input autoFocus type='text' ref='customerid' id='customerid' className='border-focus-blue' placeholder='Customer ID' />
                                </InputGroup>
                              </FormGroup>

                              <FormGroup>
                                <InputGroup md>
                                  <InputGroupAddon>
                                    <Icon glyph='icon-fontello-reply' />
                                  </InputGroupAddon>
                                  <Input type='text' id='emailaddress' ref='emailaddress' className='border-focus-blue' placeholder='Address Line' require />
                                  <InputGroupAddon>
                                    <Icon glyph='icon-fontello-reply' />
                                  </InputGroupAddon>
                                  <Input type='text' id='emailaddress2' ref='emailaddress2' className='border-focus-blue' placeholder='Address Line 2' />
                                </InputGroup>
                              </FormGroup>

                              <FormGroup>
                                <InputGroup md>
                                  <InputGroupAddon>
                                    <Icon glyph='icon-fontello-asterisk' />
                                  </InputGroupAddon>
                                  <Input type='text' id='city'  ref = 'city' className='border-focus-blue' placeholder='City'/>
                                   <InputGroupAddon>
                                    <Icon glyph='icon-fontello-asterisk' />
                                  </InputGroupAddon>
                                  <Input type='text' id='country' ref = 'country' className='border-focus-blue' placeholder='Country'/>
                                  <InputGroupAddon>
                                    <Icon glyph='icon-fontello-asterisk' />
                                  </InputGroupAddon>
                                  <Input type="text" id='postcode' ref = 'postcode' className='border-focus-blue' placeholder='Post Code' require/>
                                </InputGroup>
                              </FormGroup>
                              <FormGroup>
                                <InputGroup md>
                                  <InputGroupAddon>
                                    <Icon glyph='icon-fontello-phone' />
                                  </InputGroupAddon>
                                  <Input type='text' className="textfield" id = 'phone' ref='phone' className='border-focus-blue' placeholder='Phone' onkeypress="return isNumber(event)"  />
			                            <InputGroupAddon>
                                    <Icon glyph='icon-fontello-user' />
                                  </InputGroupAddon>
                                  <Input type='text' id='director' ref='director' className='border-focus-blue' placeholder='Director'/>
                                </InputGroup>
                              </FormGroup>
                              <FormGroup>
                                <InputGroup md>
                                  <InputGroupAddon>
                                    <Icon glyph='icon-fontello-user' />
                                  </InputGroupAddon>
                                  <Input type='text' id='username' ref='username' className='border-focus-blue' placeholder='Username'  />
                                </InputGroup>
                              </FormGroup>
                              <FormGroup>
                                <InputGroup md>
                                  <InputGroupAddon>
                                    <Icon glyph='icon-fontello-mail-alt' />
                                  </InputGroupAddon>
                                  <Input type='email' id='useremail' ref='useremail' className='border-focus-blue' placeholder='Email' />
                                </InputGroup>
                              </FormGroup>
                              <FormGroup>
                                <InputGroup md>
                                  <InputGroupAddon>
                                    <Icon glyph='icon-fontello-key' />
                                  </InputGroupAddon>
                                  <Input type='password' id='password' ref='password' className='border-focus-blue' placeholder='password' />
                                </InputGroup>
                              </FormGroup>
                              <FormGroup>
                                <InputGroup md>
                                  <InputGroupAddon>
                                    <Icon glyph='icon-fontello-key' />
                                  </InputGroupAddon>
                                  <Input type='password' id='passwordconfirm' ref='passwordconfirm' className='border-focus-blue' placeholder='repeat password' />
                                  <span id="confirmMessage" className="confirmMessage" onpaste="return false;" ></span>
                                </InputGroup>
                              </FormGroup>

                              <FormGroup>

                                <Grid>
                                  <Row>
                                    <Col xs={12} collapseLeft collapseRight>
                                      <Button type='submit' outlined lg bsStyle='blue' block >Create account</Button>
                                    </Col>
                                  </Row>
                                </Grid>
                              </FormGroup>
                            </Form>
                          </div>
                          <div className='bg-hoverblue fg-black50 text-center' style={{padding: 25, paddingTop: 12.5}}>
                            <div style={{marginBottom: 12.5}}>SIGN UP WITH</div>
                            <Grid>
                              <Row>
                                <Col xs={12} sm={6} className='facebook-container' smCollapseLeft smCollapseRight>
                                  <Button block type='submit' id='facebook-btn' lg bsStyle='darkblue' onClick={this.back}>
                                    <Icon glyph='icon-fontello-facebook' />
                                    <span>Facebook</span>
                                  </Button>
                                </Col>
                                <Col xs={12} sm={6} className='' smCollapseLeft smCollapseRight>
                                  <Button block type='submit' id='twitter-btn' lg bsStyle='darkblue' onClick={this.back}>
                                    <Icon glyph='icon-fontello-twitter' />
                                    <span>Twitter</span>
                                  </Button>
                                </Col>
                              </Row>
                            </Grid>
                            <div style={{marginTop: 25}}>
                              Already have an account? <Link to='/app/login'>Login</Link>
                            </div>
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

function checkPass()
{
  console.log("check passwordshi vart")
  console.log("check passwordshi vart cvlilebaa")
  var pass1 = document.getElementById('password');
  console.log(pass1.value)
  var pass2 = document.getElementById('passwordconfirm');
  console.log(pass2.value)

  var message = document.getElementById('confirmMessage');

  var goodColor = "#66cc66";
  var badColor = "#ff6666";

  if(pass1.value == pass2.value && pass2.value != ""){
	//massage.style.backgroundColor=white;
	//massage.innerHTML="";
    console.log("pass1.value == pass2.value")
    pass2.style.borderColor = goodColor;
    message.style.color = goodColor;
    message.innerHTML = "Passwords Match!";
    console.log("Password Match");
    return true;
  }else if(pass1.value != pass2.value){
    console.log("pass1.value AR UDRIS pass2.value")
    pass2.style.borderColor = badColor;
    message.style.color = badColor;
    message.innerHTML = "Passwords Do Not Match!"
    console.log("Passwords Do Not Match!")
    return false;
  }
}

function fieldsAreNotEmpty(){

  var userEmail = document.getElementById('useremail');
  var address = document.getElementById('emailaddress');
  var address2 = document.getElementById('emailaddress2');
  var customerId = document.getElementById('customerid');
  var customerName = document.getElementById('customername');
  var city = document.getElementById('city');
  var country = document.getElementById('country');
  var postCode = document.getElementById('postcode');
  var password = document.getElementById('password');
  var phone = document.getElementById('phone');
  var director = document.getElementById('director');
  var username = document.getElementById('username');
  var badColor = "#ff6666";
  var count = 0.

  if(customerName.value == ""){
    customerName.style.borderColor = badColor;
	count = count + 1;
  }
  else{
	customerName.style.borderColor = "lightblue";
  }
  if(customerId.value == ""){
    customerId.style.borderColor = badColor;
	count = count + 1;
  }else{
	customerId.style.borderColor = "lightblue";
  }
  if(address.value == ""){
    address.style.borderColor = badColor;
	count = count + 1;
  }else{
	address.style.borderColor = "lightblue";
  }
  if(address2.value == ""){
    address2.style.borderColor = badColor;
	count = count + 1;
  }else{
	address2.style.borderColor = "lightblue";
  }
  if(city.value == ""){
    city.style.borderColor = badColor;
	count = count + 1;
  }else{
	city.style.borderColor = "lightblue";
  }
  if(country.value == ""){
    country.style.borderColor = badColor;
	count = count + 1;
  }else{
	country.style.borderColor = "lightblue";
  }
  if(postCode.value == ""){
    postCode.style.borderColor = badColor;
	count = count + 1;
  }else{
	postCode.style.borderColor = "lightblue";
  }
  if(phone.value == ""){
    phone.style.borderColor = badColor;
	count =count + 1;
  }else{
	phone.style.borderColor = "lightblue";
  }
  if(director.value == ""){
    director.style.borderColor = badColor;
	count = count + 1;
  }else{
	director.style.borderColor = "lightblue";
  }
  if(username.value == ""){
    username.style.borderColor = badColor;
	count += 1;
  }else{
	username.style.borderColor = "lightblue";
  }
   if(userEmail.value == ""){
    userEmail.style.borderColor = badColor;
	count = count + 1;
  }else{
	userEmail.style.borderColor = "lightblue";
  }
  if(password.value == ""){
    password.style.borderColor = badColor;
	count = count + 1;
  }else{
	password.style.borderColor = "lightblue";
  }
  if (count > 0) return false;
  return true;
}

function isNumber(evt) {
	console.log("isNumeric metodshi")
    evt = (evt) ? evt : window.event;
	console.log("evt is win")
	console.log(evt)
	console.log("evt is shemdeg")
    var charCode = (evt.which) ? evt.which : evt.keyCode;
	console.log(charCode)
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		console.log(charCode)

        return false;
    }
    return true;
}

var classSet = React.addons.classSet;
var SignupPage = React.createClass({
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

module.exports = SignupPage;
