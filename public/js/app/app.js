/*! rubix - v2.3.0 - 2015-11-20 [copyright: SketchPixy LLP, email: support@sketchpixy.com] */
(function() {
/*DO NOT MODIFY*/

//
// showdown.js -- A javascript port of Markdown.
//
// Copyright (c) 2007 John Fraser.
//
// Original Markdown Copyright (c) 2004-2005 John Gruber
//   <http://daringfireball.net/projects/markdown/>
//
// Redistributable under a BSD-style open source license.
// See license.txt for more information.
//
// The full source distribution is at:
//
//        A A L
//        T C A
//        T K B
//
//   <http://www.attacklab.net/>
//
//
// Wherever possible, Showdown is a straight, line-by-line port
// of the Perl version of Markdown.
//
// This is not a normal parser design; it's basically just a
// series of string substitutions.  It's hard to read and
// maintain this way,  but keeping Showdown close to the original
// design makes it easier to port new features.
//
// More importantly, Showdown behaves like markdown.pl in most
// edge cases.  So web applications can do client-side preview
// in Javascript, and then build identical HTML on the server.
//
// This port needs the new RegExp functionality of ECMA 262,
// 3rd Edition (i.e. Javascript 1.5).  Most modern web browsers
// should do fine.  Even with the new regular expression features,
// We do a lot of work to emulate Perl's regex functionality.
// The tricky changes in this file mostly have the "attacklab:"
// label.  Major or self-explanatory changes don't.
//
// Smart diff tools like Araxis Merge will be able to match up
// this file with markdown.pl in a useful way.  A little tweaking
// helps: in a copy of markdown.pl, replace "#" with "//" and
// replace "$text" with "text".  Be sure to ignore whitespace
// and line endings.
//
//
// Showdown usage:
//
//   var text = "Markdown *rocks*.";
//
//   var converter = new Showdown.converter();
//   var html = converter.makeHtml(text);
//
//   alert(html);
//
// Note: move the sample code to the bottom of this
// file before uncommenting it.
//
//
// Showdown namespace
//
var Showdown={extensions:{}},forEach=Showdown.forEach=function(a,b){if(typeof a.forEach=="function")a.forEach(b);else{var c,d=a.length;for(c=0;c<d;c++)b(a[c],c,a)}},stdExtName=function(a){return a.replace(/[_-]||\s/g,"").toLowerCase()};Showdown.converter=function(a){var b,c,d,e=0,f=[],g=[];if(typeof module!="undefind"&&typeof exports!="undefined"&&typeof require!="undefind"){var h=require("fs");if(h){var i=h.readdirSync((__dirname||".")+"/extensions").filter(function(a){return~a.indexOf(".js")}).map(function(a){return a.replace(/\.js$/,"")});Showdown.forEach(i,function(a){var b=stdExtName(a);Showdown.extensions[b]=require("./extensions/"+a)})}}this.makeHtml=function(a){return b={},c={},d=[],a=a.replace(/~/g,"~T"),a=a.replace(/\$/g,"~D"),a=a.replace(/\r\n/g,"\n"),a=a.replace(/\r/g,"\n"),a="\n\n"+a+"\n\n",a=M(a),a=a.replace(/^[ \t]+$/mg,""),Showdown.forEach(f,function(b){a=k(b,a)}),a=z(a),a=m(a),a=l(a),a=o(a),a=K(a),a=a.replace(/~D/g,"$$"),a=a.replace(/~T/g,"~"),Showdown.forEach(g,function(b){a=k(b,a)}),a};if(a&&a.extensions){var j=this;Showdown.forEach(a.extensions,function(a){typeof a=="string"&&(a=Showdown.extensions[stdExtName(a)]);if(typeof a!="function")throw"Extension '"+a+"' could not be loaded.  It was either not found or is not a valid extension.";Showdown.forEach(a(j),function(a){a.type?a.type==="language"||a.type==="lang"?f.push(a):(a.type==="output"||a.type==="html")&&g.push(a):g.push(a)})})}var k=function(a,b){if(a.regex){var c=new RegExp(a.regex,"g");return b.replace(c,a.replace)}if(a.filter)return a.filter(b)},l=function(a){return a+="~0",a=a.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|(?=~0))/gm,function(a,d,e,f,g){return d=d.toLowerCase(),b[d]=G(e),f?f+g:(g&&(c[d]=g.replace(/"/g,"&quot;")),"")}),a=a.replace(/~0/,""),a},m=function(a){a=a.replace(/\n/g,"\n\n");var b="p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del|style|section|header|footer|nav|article|aside",c="p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|style|section|header|footer|nav|article|aside";return a=a.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm,n),a=a.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|style|section|header|footer|nav|article|aside)\b[^\r]*?<\/\2>[ \t]*(?=\n+)\n)/gm,n),a=a.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,n),a=a.replace(/(\n\n[ ]{0,3}<!(--[^\r]*?--\s*)+>[ \t]*(?=\n{2,}))/g,n),a=a.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,n),a=a.replace(/\n\n/g,"\n"),a},n=function(a,b){var c=b;return c=c.replace(/\n\n/g,"\n"),c=c.replace(/^\n/,""),c=c.replace(/\n+$/g,""),c="\n\n~K"+(d.push(c)-1)+"K\n\n",c},o=function(a){a=v(a);var b=A("<hr />");return a=a.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm,b),a=a.replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm,b),a=a.replace(/^[ ]{0,2}([ ]?\_[ ]?){3,}[ \t]*$/gm,b),a=x(a),a=y(a),a=E(a),a=m(a),a=F(a),a},p=function(a){return a=B(a),a=q(a),a=H(a),a=t(a),a=r(a),a=I(a),a=G(a),a=D(a),a=a.replace(/  +\n/g," <br />\n"),a},q=function(a){var b=/(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;return a=a.replace(b,function(a){var b=a.replace(/(.)<\/?code>(?=.)/g,"$1`");return b=N(b,"\\`*_"),b}),a},r=function(a){return a=a.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,s),a=a.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?(.*?(?:\(.*?\).*?)?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,s),a=a.replace(/(\[([^\[\]]+)\])()()()()()/g,s),a},s=function(a,d,e,f,g,h,i,j){j==undefined&&(j="");var k=d,l=e,m=f.toLowerCase(),n=g,o=j;if(n==""){m==""&&(m=l.toLowerCase().replace(/ ?\n/g," ")),n="#"+m;if(b[m]!=undefined)n=b[m],c[m]!=undefined&&(o=c[m]);else{if(!(k.search(/\(\s*\)$/m)>-1))return k;n=""}}n=N(n,"*_");var p='<a href="'+n+'"';return o!=""&&(o=o.replace(/"/g,"&quot;"),o=N(o,"*_"),p+=' title="'+o+'"'),p+=">"+l+"</a>",p},t=function(a){return a=a.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,u),a=a.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,u),a},u=function(a,d,e,f,g,h,i,j){var k=d,l=e,m=f.toLowerCase(),n=g,o=j;o||(o="");if(n==""){m==""&&(m=l.toLowerCase().replace(/ ?\n/g," ")),n="#"+m;if(b[m]==undefined)return k;n=b[m],c[m]!=undefined&&(o=c[m])}l=l.replace(/"/g,"&quot;"),n=N(n,"*_");var p='<img src="'+n+'" alt="'+l+'"';return o=o.replace(/"/g,"&quot;"),o=N(o,"*_"),p+=' title="'+o+'"',p+=" />",p},v=function(a){function b(a){return a.replace(/[^\w]/g,"").toLowerCase()}return a=a.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm,function(a,c){return A('<h1 id="'+b(c)+'">'+p(c)+"</h1>")}),a=a.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm,function(a,c){return A('<h2 id="'+b(c)+'">'+p(c)+"</h2>")}),a=a.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm,function(a,c,d){var e=c.length;return A("<h"+e+' id="'+b(d)+'">'+p(d)+"</h"+e+">")}),a},w,x=function(a){a+="~0";var b=/^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;return e?a=a.replace(b,function(a,b,c){var d=b,e=c.search(/[*+-]/g)>-1?"ul":"ol";d=d.replace(/\n{2,}/g,"\n\n\n");var f=w(d);return f=f.replace(/\s+$/,""),f="<"+e+">"+f+"</"+e+">\n",f}):(b=/(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g,a=a.replace(b,function(a,b,c,d){var e=b,f=c,g=d.search(/[*+-]/g)>-1?"ul":"ol",f=f.replace(/\n{2,}/g,"\n\n\n"),h=w(f);return h=e+"<"+g+">\n"+h+"</"+g+">\n",h})),a=a.replace(/~0/,""),a};w=function(a){return e++,a=a.replace(/\n{2,}$/,"\n"),a+="~0",a=a.replace(/(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+([^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm,function(a,b,c,d,e){var f=e,g=b,h=c;return g||f.search(/\n{2,}/)>-1?f=o(L(f)):(f=x(L(f)),f=f.replace(/\n$/,""),f=p(f)),"<li>"+f+"</li>\n"}),a=a.replace(/~0/g,""),e--,a};var y=function(a){return a+="~0",a=a.replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g,function(a,b,c){var d=b,e=c;return d=C(L(d)),d=M(d),d=d.replace(/^\n+/g,""),d=d.replace(/\n+$/g,""),d="<pre><code>"+d+"\n</code></pre>",A(d)+e}),a=a.replace(/~0/,""),a},z=function(a){return a+="~0",a=a.replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g,function(a,b,c){var d=b,e=c;return e=C(e),e=M(e),e=e.replace(/^\n+/g,""),e=e.replace(/\n+$/g,""),e="<pre><code"+(d?' class="'+d+'"':"")+">"+e+"\n</code></pre>",A(e)}),a=a.replace(/~0/,""),a},A=function(a){return a=a.replace(/(^\n+|\n+$)/g,""),"\n\n~K"+(d.push(a)-1)+"K\n\n"},B=function(a){return a=a.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,function(a,b,c,d,e){var f=d;return f=f.replace(/^([ \t]*)/g,""),f=f.replace(/[ \t]*$/g,""),f=C(f),b+"<code>"+f+"</code>"}),a},C=function(a){return a=a.replace(/&/g,"&amp;"),a=a.replace(/</g,"&lt;"),a=a.replace(/>/g,"&gt;"),a=N(a,"*_{}[]\\",!1),a},D=function(a){return a=a.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g,"<strong>$2</strong>"),a=a.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g,"<em>$2</em>"),a},E=function(a){return a=a.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm,function(a,b){var c=b;return c=c.replace(/^[ \t]*>[ \t]?/gm,"~0"),c=c.replace(/~0/g,""),c=c.replace(/^[ \t]+$/gm,""),c=o(c),c=c.replace(/(^|\n)/g,"$1  "),c=c.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm,function(a,b){var c=b;return c=c.replace(/^  /mg,"~0"),c=c.replace(/~0/g,""),c}),A("<blockquote>\n"+c+"\n</blockquote>")}),a},F=function(a){a=a.replace(/^\n+/g,""),a=a.replace(/\n+$/g,"");var b=a.split(/\n{2,}/g),c=[],e=b.length;for(var f=0;f<e;f++){var g=b[f];g.search(/~K(\d+)K/g)>=0?c.push(g):g.search(/\S/)>=0&&(g=p(g),g=g.replace(/^([ \t]*)/g,"<p>"),g+="</p>",c.push(g))}e=c.length;for(var f=0;f<e;f++)while(c[f].search(/~K(\d+)K/)>=0){var h=d[RegExp.$1];h=h.replace(/\$/g,"$$$$"),c[f]=c[f].replace(/~K\d+K/,h)}return c.join("\n\n")},G=function(a){return a=a.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g,"&amp;"),a=a.replace(/<(?![a-z\/?\$!])/gi,"&lt;"),a},H=function(a){return a=a.replace(/\\(\\)/g,O),a=a.replace(/\\([`*_{}\[\]()>#+-.!])/g,O),a},I=function(a){return a=a.replace(/<((https?|ftp|dict):[^'">\s]+)>/gi,'<a href="$1">$1</a>'),a=a.replace(/<(?:mailto:)?([-.\w]+\@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi,function(a,b){return J(K(b))}),a},J=function(a){var b=[function(a){return"&#"+a.charCodeAt(0)+";"},function(a){return"&#x"+a.charCodeAt(0).toString(16)+";"},function(a){return a}];return a="mailto:"+a,a=a.replace(/./g,function(a){if(a=="@")a=b[Math.floor(Math.random()*2)](a);else if(a!=":"){var c=Math.random();a=c>.9?b[2](a):c>.45?b[1](a):b[0](a)}return a}),a='<a href="'+a+'">'+a+"</a>",a=a.replace(/">.+:/g,'">'),a},K=function(a){return a=a.replace(/~E(\d+)E/g,function(a,b){var c=parseInt(b);return String.fromCharCode(c)}),a},L=function(a){return a=a.replace(/^(\t|[ ]{1,4})/gm,"~0"),a=a.replace(/~0/g,""),a},M=function(a){return a=a.replace(/\t(?=\t)/g,"    "),a=a.replace(/\t/g,"~A~B"),a=a.replace(/~B(.+?)~A/g,function(a,b,c){var d=b,e=4-d.length%4;for(var f=0;f<e;f++)d+=" ";return d}),a=a.replace(/~A/g,"    "),a=a.replace(/~B/g,""),a},N=function(a,b,c){var d="(["+b.replace(/([\[\]\\])/g,"\\$1")+"])";c&&(d="\\\\"+d);var e=new RegExp(d,"g");return a=a.replace(e,O),a},O=function(a,b){var c=b.charCodeAt(0);return"~E"+c+"E"}},typeof module!="undefined"&&(module.exports=Showdown),typeof define=="function"&&define.amd&&define("showdown",function(){return Showdown});

/*REACT-ROUTER*/
var _RTR_=window.ReactRouter || {};
var Route=_RTR_.Route,
    Link=_RTR_.Link,
    DefaultRoute=_RTR_.DefaultRoute,
    NotFoundRoute=_RTR_.NotFoundRoute,
    RouteHandler=_RTR_.RouteHandler;

/*REACTBOOTSTRAP+EXTRAS*/
var _RB32_=window.ReactBootstrap || {};
var Container=_RB32_.Container,
    Grid=_RB32_.Grid,
    Row=_RB32_.Row,
    Col=_RB32_.Col,
    ColMixin=_RB32_.ColMixin,
    Lead=_RB32_.Lead,
    Table=_RB32_.Table,
    Form=_RB32_.Form,
    FormGroup=_RB32_.FormGroup,
    Label=_RB32_.Label,
    Input=_RB32_.Input,
    InputGroup=_RB32_.InputGroup,
    InputGroupAddon=_RB32_.InputGroupAddon,
    InputGroupButton=_RB32_.InputGroupButton,
    Checkbox=_RB32_.Checkbox,
    Radio=_RB32_.Radio,
    Button=_RB32_.Button,
    Textarea=_RB32_.Textarea,
    Select=_RB32_.Select,
    Static=_RB32_.Static,
    Icon=_RB32_.Icon,
    HelpBlock=_RB32_.HelpBlock,
    Img=_RB32_.Img,
    Caret=_RB32_.Caret,
    Dropdown=_RB32_.Dropdown,
    DropdownButton=_RB32_.DropdownButton,
    Menu=_RB32_.Menu,
    MenuItem=_RB32_.MenuItem,
    ButtonGroup=_RB32_.ButtonGroup,
    ButtonToolbar=_RB32_.ButtonToolbar,
    Tab=_RB32_.Tab,
    TabPane=_RB32_.TabPane,
    TabList=_RB32_.TabList,
    TabContent=_RB32_.TabContent,
    TabContainer=_RB32_.TabContainer,
    Nav=_RB32_.Nav,
    NavBar=_RB32_.NavBar,
    NavText=_RB32_.NavText,
    NavLink=_RB32_.NavLink,
    NavItem=_RB32_.NavItem,
    NavForm=_RB32_.NavForm,
    NavBrand=_RB32_.NavBrand,
    NavHeader=_RB32_.NavHeader,
    NavToggle=_RB32_.NavToggle,
    NavButton=_RB32_.NavButton,
    NavContent=_RB32_.NavContent,
    BLink=_RB32_.BLink,
    Breadcrumb=_RB32_.Breadcrumb,
    Page=_RB32_.Page,
    Pager=_RB32_.Pager,
    Pagination=_RB32_.Pagination,
    Badge=_RB32_.Badge,
    BLabel=_RB32_.BLabel,
    Jumbotron=_RB32_.Jumbotron,
    Progress=_RB32_.Progress,
    ProgressGroup=_RB32_.ProgressGroup,
    Media=_RB32_.Media,
    MediaDiv=_RB32_.MediaDiv,
    MediaBody=_RB32_.MediaBody,
    MediaList=_RB32_.MediaList,
    MediaObject=_RB32_.MediaObject,
    MediaHeading=_RB32_.MediaHeading,
    ListGroup=_RB32_.ListGroup,
    ListGroupItem=_RB32_.ListGroupItem,
    ListGroupItemText=_RB32_.ListGroupItemText,
    ListGroupItemHeading=_RB32_.ListGroupItemHeading,
    Well=_RB32_.Well,
    Modal=_RB32_.Modal,
    ModalBody=_RB32_.ModalBody,
    ModalHeader=_RB32_.ModalHeader,
    ModalFooter=_RB32_.ModalFooter,
    ModalManager=_RB32_.ModalManager,
    Panel=_RB32_.Panel,
    PanelBody=_RB32_.PanelBody,
    PanelHeader=_RB32_.PanelHeader,
    PanelFooter=_RB32_.PanelFooter,
    PanelLeft=_RB32_.PanelLeft,
    PanelRight=_RB32_.PanelRight,
    PanelContainer=_RB32_.PanelContainer,
    LoremIpsum=_RB32_.LoremIpsum,
    TimelineView=_RB32_.TimelineView,
    TimelineItem=_RB32_.TimelineItem,
    TimelineHeader=_RB32_.TimelineHeader,
    TimelineIcon=_RB32_.TimelineIcon,
    TimelineAvatar=_RB32_.TimelineAvatar,
    TimelineTitle=_RB32_.TimelineTitle,
    TimelineBody=_RB32_.TimelineBody,
    Accordian=_RB32_.Accordian,
    AccordianPane=_RB32_.AccordianPane,
    AccordianTitle=_RB32_.AccordianTitle,
    AccordianContent=_RB32_.AccordianContent,
    IonTabContainer=_RB32_.IonTabContainer,
    IonTabHead=_RB32_.IonTabHead,
    IonTabBody=_RB32_.IonTabBody,
    IonTab=_RB32_.IonTab,
    IonTabItem=_RB32_.IonTabItem,
    PricingTable=_RB32_.PricingTable,
    PricingFeature=_RB32_.PricingFeature,
    PricingTableBody=_RB32_.PricingTableBody,
    PricingTablePrice=_RB32_.PricingTablePrice,
    PricingTableHeader=_RB32_.PricingTableHeader,
    PricingTableContainer=_RB32_.PricingTableContainer,
    PricingButtonContainer=_RB32_.PricingButtonContainer,
    Alert=_RB32_.Alert,
    AlertLink=_RB32_.AlertLink,
    Tag=_RB32_.Tag,
    Sidebar=_RB32_.Sidebar,
    SidebarNav=_RB32_.SidebarNav,
    SidebarBtn=_RB32_.SidebarBtn,
    SidebarMixin=_RB32_.SidebarMixin,
    SidebarNavItem=_RB32_.SidebarNavItem,
    SidebarControls=_RB32_.SidebarControls,
    SidebarControlBtn=_RB32_.SidebarControlBtn,
    TransitionEndEvent='webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';

/*L20N*/
var _RL20n_=window.ReactL20n;
var l20n=_RL20n_.l20n,
    Entity=_RL20n_.Entity;

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/* Initialize Locales */
	l20n.initializeLocales('app', {
	  'locales': ['en-US'],
	  'default': 'en-US'
	});

	/* Initializing touch events */
	React.initializeTouchEvents(true);

	__webpack_require__(1);

	var routes = __webpack_require__(6);

	Pace.once('hide', function() {
	  $('#pace-loader').removeClass('pace-big').addClass('pace-small');
	});

	var InitializeRouter = function(View) {
	  // cleanup
	  if(window.Rubix) window.Rubix.Cleanup();
	  Pace.restart();
	  if(window.hasOwnProperty('ga') && typeof window.ga === 'function') {
	    window.ga('send', 'pageview', {
	     'page': window.location.pathname + window.location.search  + window.location.hash
	    });
	  }

	  React.render(React.createElement(View, null), document.getElementById('app-container'), function() {
	    // l20n initialized only after everything is rendered/updated

	    l20n.ready();
	    setTimeout(function() {
	      $('body').removeClass('fade-out');
	    }, 500);
	  });
	};

	if(Modernizr.history)
	  ReactRouter.run(routes, ReactRouter.HistoryLocation, InitializeRouter);
	else
	  ReactRouter.run(routes, InitializeRouter);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __HUA = (function () { var React = __webpack_require__(2); var getHotUpdateAPI = __webpack_require__(3); return getHotUpdateAPI(React, "preloader.jsx", module.id); })(); if (false) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "preloader.jsx" + ": " + err.message); } }); module.hot.dispose(function () { var nextTick = require("/Users/George/Desktop/TT_rubix-reactjs/node_modules/react-hot-loader/node_modules/next-tick/index.js"); nextTick(__HUA.updateMountedInstances); }); }

	var Ploader = __HUA.createClass({displayName: "Ploader",
	  getInitialState: function() {
	    return {
	      display: 'none'
	    };
	  },
	  show: function(cb) {
	    this.setState({display: 'block'}, cb);
	  },
	  hide: function(cb) {
	    this.setState({display: 'none'}, cb);
	  },
	  render: function() {
	    return (
	      React.createElement("div", {className: "preloader", style: {display: this.state.display}}, 
	        React.createElement("img", {src: "/imgs/preloader.gif", width: "128", height: "128"})
	      )
	    );
	  }
	});

	window.Preloader = React.render(React.createElement(Ploader, null), document.getElementById('app-preloader'));


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var updaters = {},
	    makeModuleUpdater = __webpack_require__(4);

	function getHotUpdateAPI(React, filename, moduleId) {
	  var exists = updaters.hasOwnProperty(moduleId);
	  if (!exists) {
	    updaters[moduleId] = makeModuleUpdater(React, filename);
	  }

	  var updater = updaters[moduleId];
	  return {
	    createClass: exists ? updater.updateClass : updater.createClass,
	    updateMountedInstances: updater.updateMountedInstances
	  };
	}

	module.exports = getHotUpdateAPI;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Provides `createClass` and `updateClass` which can be used as drop-in
	 * replacement for `React.createClass` in a module. If multiple components
	 * are defined in the same module, assumes their `displayName`s are different.
	 */
	module.exports = function (React, filename) {
	  var componentUpdaters = {};

	  function createClass(spec) {
	    var displayName = spec.displayName,
	        componentUpdater;

	    if (componentUpdaters[displayName]) {
	      throw new Error(
	        'Found duplicate displayName in ' + filename + ': "' + displayName + '".\n' +
	        'react-hot-loader uses displayName to distinguish between several components in one file.'
	      );
	    }

	    componentUpdater = __webpack_require__(5)(React);
	    componentUpdaters[displayName] = componentUpdater;

	    return componentUpdater.createClass(spec);
	  }

	  function updateClass(spec) {
	    var displayName = spec.displayName,
	        componentUpdater = componentUpdaters[displayName];

	    return componentUpdater ?
	      componentUpdater.updateClass(spec) :
	      createClass(spec);
	  }

	  function updateMountedInstances() {
	    Object.keys(componentUpdaters).forEach(function (displayName) {
	      componentUpdaters[displayName].updateMountedInstances();
	    });
	  }

	  return {
	    createClass: createClass,
	    updateClass: updateClass,
	    updateMountedInstances: updateMountedInstances
	  };
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Provides `createClass` and `updateClass` which can be used to create and
	 * later patch a single component with a new version of itself.
	 */
	module.exports = function (React) {
	  var mounted = [];

	  /**
	   * Keeps track of mounted instances.
	   */
	  var TrackInstancesMixin = {
	    componentDidMount: function () {
	      mounted.push(this);
	    },

	    componentWillUnmount: function () {
	      mounted.splice(mounted.indexOf(this), 1);
	    }
	  };


	  /**
	   * Establishes a prototype as the "source of truth" and updates its methods on
	   * subsequent invocations, also patching fresh prototypes to pass calls to it.
	   */
	  var assimilatePrototype = (function () {
	    var storedPrototype,
	        knownPrototypes = [];

	    function wrapFunction(key) {
	      return function () {
	        if (storedPrototype[key]) {
	          return storedPrototype[key].apply(this, arguments);
	        }
	      };
	    }

	    function patchProperty(proto, key) {
	      proto[key] = storedPrototype[key];

	      if (typeof proto[key] !== 'function' ||
	        key === 'type' ||
	        key === 'constructor') {
	        return;
	      }

	      proto[key] = wrapFunction(key);

	      if (proto.__reactAutoBindMap[key]) {
	        proto.__reactAutoBindMap[key] = proto[key];
	      }
	    }

	    function updateStoredPrototype(freshPrototype) {
	      storedPrototype = {};

	      for (var key in freshPrototype) {
	        if (freshPrototype.hasOwnProperty(key)) {
	          storedPrototype[key] = freshPrototype[key];
	        }
	      }
	    }

	    function reconcileWithStoredPrototypes(freshPrototype) {
	      knownPrototypes.push(freshPrototype);
	      knownPrototypes.forEach(function (proto) {
	        for (var key in storedPrototype) {
	          patchProperty(proto, key);
	        }
	      });
	    }

	    return function (freshPrototype) {
	      updateStoredPrototype(freshPrototype);
	      reconcileWithStoredPrototypes(freshPrototype);
	    };
	  })();


	  /**
	   * Mixes instance tracking into the spec, lets React produce a fresh version
	   * of the component and assimilates its changes into the old version.
	   */
	  function injectMixinAndAssimilatePrototype(spec) {
	    spec.mixins = spec.mixins || [];
	    spec.mixins.push(TrackInstancesMixin);
	    var Component = (React.createClass)(spec);
	    assimilatePrototype(Component.type.prototype);
	    return Component;
	  }


	  /**
	   * Updates a React component recursively, so even if children define funky
	   * `shouldComponentUpdate`, they are forced to re-render.
	   */
	  function forceUpdateTree(instance) {
	    if (instance.forceUpdate) {
	      instance.forceUpdate();
	    }

	    if (instance._renderedComponent) {
	      forceUpdateTree(instance._renderedComponent);
	    }

	    for (var key in instance._renderedChildren) {
	      forceUpdateTree(instance._renderedChildren[key]);
	    }
	  }


	  var Component;

	  /**
	   * Proxies React.createClass to enable hot updates.
	   */
	  function createClass(spec) {
	    if (Component) {
	      throw new Error('createClass may only be called once for a given updater.');
	    }

	    Component = injectMixinAndAssimilatePrototype(spec);
	    return Component;
	  }

	  /**
	   * Proxies React.createClass to apply hot update.
	   */
	  function updateClass(spec) {
	    if (!Component) {
	      throw new Error('updateClass may only be called after createClass.');
	    }

	    injectMixinAndAssimilatePrototype(spec);
	    return Component;
	  }

	  /**
	   * Re-binds methods of mounted instances and re-renders them.
	   */
	  function updateMountedInstances() {
	    mounted.forEach(function (instance) {
	      instance._bindAutoBindMethods();
	      forceUpdateTree(instance);
	    });
	  }

	  return {
	    createClass: createClass,
	    updateClass: updateClass,
	    updateMountedInstances: updateMountedInstances
	  };
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* ERROR PAGES */
	var notfound = __webpack_require__(7);

	var homepage = __webpack_require__(11);
	var billing = __webpack_require__(12);

	/* APP PAGES */
	var login = __webpack_require__(13);
	var signup = __webpack_require__(14);
	var blank = __webpack_require__(15);

	// assets
	var upload = __webpack_require__(16);
	var crop = __webpack_require__(17);
	var gallery = __webpack_require__(18);


	var tables = __webpack_require__(19);
	var campaigns = __webpack_require__(20);

	var zones = __webpack_require__(21);
	var time = __webpack_require__(22);
	var Tmap = __webpack_require__(26);

	var statistics = __webpack_require__(27);

	/* ROUTES */
	module.exports = (
	  React.createElement(Route, {handler: ReactRouter.RouteHandler}, 
	    React.createElement(DefaultRoute, {handler: homepage}), 
	    React.createElement(Route, {path: "/", handler: homepage}), 
	    React.createElement(NotFoundRoute, {handler: notfound}), 
	    React.createElement(Route, {path: "/app/profile", handler: homepage}), 
	    React.createElement(Route, {path: "/app/campaigns", handler: campaigns}), 
	    React.createElement(Route, {path: "/app/assets/upload", handler: upload}), 
	    React.createElement(Route, {path: "/app/assets/crop", handler: crop}), 
	    React.createElement(Route, {path: "/app/assets/gallery", handler: gallery}), 
	    React.createElement(Route, {path: "/app/zones", handler: zones}), 
	    React.createElement(Route, {path: "/app/map", handler: Tmap}), 
	    React.createElement(Route, {path: "/app/login", handler: login}), 
	    React.createElement(Route, {path: "/app/signup", handler: signup}), 
	    React.createElement(Route, {path: "/app/time", handler: time}), 
	    React.createElement(Route, {path: "/app/tables", handler: tables}), 
	    React.createElement(Route, {path: "/app/billing", handler: billing}), 
	    React.createElement(Route, {path: "/app/charts/statistics", handler: statistics})


	  )
	);


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __HUA = (function () { var React = __webpack_require__(2); var getHotUpdateAPI = __webpack_require__(3); return getHotUpdateAPI(React, "notfound.jsx", module.id); })(); if (false) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "notfound.jsx" + ": " + err.message); } }); module.hot.dispose(function () { var nextTick = require("/Users/George/Desktop/TT_rubix-reactjs/node_modules/react-hot-loader/node_modules/next-tick/index.js"); nextTick(__HUA.updateMountedInstances); }); }

	var Header = __webpack_require__(8);
	var Sidebar = __webpack_require__(9);
	var Footer = __webpack_require__(10);

	var Body = __HUA.createClass({displayName: "Body",
	  render: function() {
	    return (
	      React.createElement(Container, {id: "body"}, 
	        React.createElement(Grid, {gutterBottom: true}, 
	          React.createElement(Row, null, 
	            React.createElement(Col, {sm: 12, className: "text-center"}, 
	              React.createElement(PanelContainer, null, 
	                React.createElement(Panel, null, 
	                  React.createElement(PanelBody, null, 
	                    React.createElement(Grid, null, 
	                      React.createElement(Row, null, 
	                        React.createElement(Col, {xs: 12}, 
	                          React.createElement("div", null, 
	                            React.createElement(Icon, {style: {fontSize: 288, lineHeight: 1}, glyph: "icon-mfizz-ghost"})
	                          ), 
	                          React.createElement("h1", {style: {marginBottom: 25, marginTop: 0}}, "Page not found!")
	                        )
	                      )
	                    )
	                  )
	                )
	              )
	            )
	          )
	        )
	      )
	    );
	  }
	});

	var classSet = React.addons.classSet;
	var PageNotFound = __HUA.createClass({displayName: "PageNotFound",
	  mixins: [SidebarMixin],
	  render: function() {
	    var classes = classSet({
	      'container-open': this.state.open
	    });
	    return (
	      React.createElement(Container, {id: "container", className: classes}, 
	        React.createElement(Sidebar, null), 
	        React.createElement(Header, null), 
	        React.createElement(Body, null), 
	        React.createElement(Footer, null)
	      )
	    );
	  }
	});

	module.exports = PageNotFound;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __HUA = (function () { var React = __webpack_require__(2); var getHotUpdateAPI = __webpack_require__(3); return getHotUpdateAPI(React, "header.jsx", module.id); })(); if (false) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "header.jsx" + ": " + err.message); } }); module.hot.dispose(function () { var nextTick = require("/Users/George/Desktop/TT_rubix-reactjs/node_modules/react-hot-loader/node_modules/next-tick/index.js"); nextTick(__HUA.updateMountedInstances); }); }

	var Brand = __HUA.createClass({displayName: "Brand",
	  render: function() {
	    return (
	      React.createElement(NavHeader, React.__spread({},  this.props), 
	        React.createElement(NavBrand, {tabIndex: "-1"}, 
	          React.createElement("img", {src: "/imgs/logo.png", alt: "Taxitube", width: "80", height: "50"})
	        )
	      )
	    );
	  }
	});

	var Navigation = __HUA.createClass({displayName: "Navigation",
	  mixins: [ReactRouter.State, ReactRouter.Navigation],
	  render: function() {
	    var props = React.mergeProps({
	      className: 'pull-right'
	    }, this.props);

	    return (
	      React.createElement(NavContent, React.__spread({},  props), 
	        React.createElement(Nav, null, 
	          React.createElement(NavItem, {className: "logout", href: "#"}, 
	            React.createElement(Icon, {bundle: "fontello", glyph: "off-1"})
	          )
	        )
	      )
	    );
	  }
	});

	var Header = __HUA.createClass({displayName: "Header",
	  render: function() {
	    return (
	      React.createElement(Grid, React.__spread({},  this.props, {id: "navbar"}), 
	        React.createElement(Row, null, 
	          React.createElement(Col, {xs: 12}, 
	            React.createElement(NavBar, {fixedTop: true, id: "rubix-nav-header"}, 
	              React.createElement(Container, {fluid: true}, 
	                React.createElement(Row, null, 
	                  React.createElement(Col, {xs: 3, visible: "xs"}, 
	                    React.createElement(SidebarBtn, null)
	                  ), 
	                  React.createElement(Col, {xs: 6, sm: 4}, 
	                    React.createElement(Brand, null)
	                  ), 
	                  React.createElement(Col, {xs: 3, sm: 8}, 
	                    React.createElement(Navigation, null)
	                  )
	                )
	              )
	            )
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = Header;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __HUA = (function () { var React = __webpack_require__(2); var getHotUpdateAPI = __webpack_require__(3); return getHotUpdateAPI(React, "sidebar.jsx", module.id); })(); if (false) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "sidebar.jsx" + ": " + err.message); } }); module.hot.dispose(function () { var nextTick = require("/Users/George/Desktop/TT_rubix-reactjs/node_modules/react-hot-loader/node_modules/next-tick/index.js"); nextTick(__HUA.updateMountedInstances); }); }

	var ApplicationSidebar = __HUA.createClass({displayName: "ApplicationSidebar",
	  render: function() {
	    return (
	      React.createElement("div", null, 
	      React.createElement(Grid, {gutterBottom: true}, 
	        React.createElement(Row, null, 
	          React.createElement(Col, {xs: 12}, 
	            React.createElement("div", {className: "sidebar-header"}, "User Interface"), 
	            React.createElement("div", {className: "sidebar-nav-container"}, 
	              React.createElement(SidebarNav, {style: {marginBottom: 0}}, 
	                React.createElement(SidebarNavItem, {glyph: "icon-ikons-user-square ", name: "Profile", href: "/app/profile"}), 

	                React.createElement(SidebarNavItem, {glyph: "icon-ikons-login", name: "Login", href: "/app/login"}), 
	                React.createElement(SidebarNavItem, {glyph: "icon-simple-line-icons-users", name: "Signup", href: "/app/signup"})
	              )
	            )
	          )
	        )
	      ), 

	        React.createElement(Grid, null, 
	          React.createElement(Row, null, 
	            React.createElement(Col, {xs: 12}, 
	              React.createElement("div", {className: "sidebar-header"}, "PAGES"), 
	              React.createElement("div", {className: "sidebar-nav-container"}, 
	                React.createElement(SidebarNav, {style: {marginBottom: 0}}, 
	                  React.createElement(SidebarNavItem, {href: "/app/campaigns", glyph: "icon-fontello-th-2", name: "Campaigns"}), 
	                  React.createElement(SidebarNavItem, {href: "/app/tables", glyph: "icon-fontello-view-mode", name: "Tables"})
	                ), 

	                React.createElement(SidebarNav, null, 
	                  React.createElement(SidebarNavItem, {glyph: "icon-feather-mail", name: React.createElement("span", null, "assets")}, 
	                    React.createElement(SidebarNav, null, 
	                      React.createElement(SidebarNavItem, {href: "/app/assets/gallery", glyph: "icon-ikons-crop", name: "Gallery"}), 
	                      React.createElement(SidebarNavItem, {href: "/app/assets/upload", glyph: "icon-stroke-gap-icons-Download", name: "Upload Files"}), 
	                      React.createElement(SidebarNavItem, {href: "/app/assets/crop", glyph: "icon-ikons-crop", name: "Cropping"})
	                    )
	                  )
	                ), 

	                React.createElement(SidebarNav, null, 
	                  React.createElement(SidebarNavItem, {href: "/app/zones", glyph: "icon-ikons-pin-2", name: "Zones"}), 
	                  React.createElement(SidebarNavItem, {href: "/app/time", glyph: "icon-ikons-time", name: "Time"}), 
	                  React.createElement(SidebarNavItem, {href: "/app/map", glyph: "icon-ikons-map", name: "Map"})
	                ), 

	                React.createElement(SidebarNav, {style: {marginBottom: 0}}, 
	                  React.createElement(SidebarNavItem, {href: "/app/charts/statistics", glyph: "icon-nargela-statistics", name: "Statistics"}), 
	                  React.createElement(SidebarNavItem, {href: "/app/billing", glyph: "icon-stroke-gap-icons-Goto", name: "Billing"})
	                )

	              )
	            )
	          )
	        )

	      )
	    );
	  }
	});

	var DummySidebar = __HUA.createClass({displayName: "DummySidebar",
	  render: function() {
	    return (
	      React.createElement(Grid, null, 
	        React.createElement(Row, null, 
	          React.createElement(Col, {xs: 12}, 
	            React.createElement("div", {className: "sidebar-header"}, "DUMMY SIDEBAR"), 
	            React.createElement(LoremIpsum, {query: "1p"})
	          )
	        )
	      )
	    );
	  }
	});

	var SidebarSection = __HUA.createClass({displayName: "SidebarSection",
	  render: function() {
	    return (
	      React.createElement("div", React.__spread({id: "sidebar"},  this.props), 
	        React.createElement("div", {id: "avatar"}, 
	          React.createElement(Grid, null, 
	            React.createElement(Row, {className: "fg-white"}, 
	              React.createElement(Col, {xs: 4, collapseRight: true}, 
	                React.createElement("img", {src: "/imgs/avatars/avatar0.png", width: "40", height: "40"})
	              ), 
	              React.createElement(Col, {xs: 8, collapseLeft: true, id: "avatar-col"}, 
	                React.createElement("div", {style: {top: 23, fontSize: 16, lineHeight: 1, position: 'relative'}}, "Anna Sanchez"), 
	                React.createElement("div", null, 
	                  React.createElement(Progress, {id: "demo-progress", value: 30, min: 0, max: 100, color: "#ffffff"}), 
	                  React.createElement("a", {href: "#"}, React.createElement(Icon, {id: "demo-icon", bundle: "fontello", glyph: "lock-5"}))
	                )
	              )
	            )
	          )
	        ), 
	        React.createElement(SidebarControls, null, 
	          React.createElement(SidebarControlBtn, {bundle: "fontello", glyph: "docs", sidebar: 0}), 
	          React.createElement(SidebarControlBtn, {bundle: "fontello", glyph: "chat-1", sidebar: 1}), 
	          React.createElement(SidebarControlBtn, {bundle: "fontello", glyph: "chart-pie-2", sidebar: 2}), 
	          React.createElement(SidebarControlBtn, {bundle: "fontello", glyph: "th-list-2", sidebar: 3}), 
	          React.createElement(SidebarControlBtn, {bundle: "fontello", glyph: "bell-5", sidebar: 4})
	        ), 
	        React.createElement("div", {id: "sidebar-container"}, 
	          React.createElement(Sidebar, {sidebar: 0, active: true}, 
	            React.createElement(ApplicationSidebar, null)
	          ), 
	          React.createElement(Sidebar, {sidebar: 1}, 
	            React.createElement("p", null, "Taxitube")
	          ), 
	          React.createElement(Sidebar, {sidebar: 2}, 
	            React.createElement(DummySidebar, null)
	          ), 
	          React.createElement(Sidebar, {sidebar: 3}, 
	            React.createElement(DummySidebar, null)
	          ), 
	          React.createElement(Sidebar, {sidebar: 4}, 
	            React.createElement(DummySidebar, null)
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = SidebarSection;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __HUA = (function () { var React = __webpack_require__(2); var getHotUpdateAPI = __webpack_require__(3); return getHotUpdateAPI(React, "footer.jsx", module.id); })(); if (false) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "footer.jsx" + ": " + err.message); } }); module.hot.dispose(function () { var nextTick = require("/Users/George/Desktop/TT_rubix-reactjs/node_modules/react-hot-loader/node_modules/next-tick/index.js"); nextTick(__HUA.updateMountedInstances); }); }

	var Footer = __HUA.createClass({displayName: "Footer",
	  getInitialState: function() {
	    return {
	      version: 0
	    };
	  },
	  componentDidMount: function() {
	    this.setState({
	      version: document.getElementsByTagName('body')[0].getAttribute('data-version')
	    });
	  },
	  render: function() {
	    return (
	      React.createElement("div", {id: "footer-container"}, 
	        React.createElement(Grid, {id: "footer", className: "text-center"}, 
	          React.createElement(Row, null, 
	            React.createElement(Col, {xs: 12}, 
	              React.createElement("div", null, "© 2015 TaxiTube Team - v", this.state.version)
	            )
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = Footer;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __HUA = (function () { var React = __webpack_require__(2); var getHotUpdateAPI = __webpack_require__(3); return getHotUpdateAPI(React, "profile.jsx", module.id); })(); if (false) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "profile.jsx" + ": " + err.message); } }); module.hot.dispose(function () { var nextTick = require("/Users/George/Desktop/TT_rubix-reactjs/node_modules/react-hot-loader/node_modules/next-tick/index.js"); nextTick(__HUA.updateMountedInstances); }); }

	var Header = __webpack_require__(8);
	var Sidebar = __webpack_require__(9);
	var Footer = __webpack_require__(10);

	var SocialBanner = __HUA.createClass({displayName: "SocialBanner",
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
	      React.createElement("div", {style: {height: 350, marginTop: -25, backgroundImage: 'url(/imgs/shots/Blick_auf_Manhattan.JPG)', backgroundSize: 'cover', position: 'relative', marginBottom: 25, backgroundPosition: 'center'}}, 
	        React.createElement("div", {className: "social-cover", style: {position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)'}}
	        ), 
	        React.createElement("div", {className: "social-desc"}, 
	          React.createElement("div", null, 
	            React.createElement("h1", {className: "fg-white"}, "Campaign Name"), 
	            React.createElement("h5", {className: "fg-white", style: {opacity: 0.8}}, "Campaign Address"), 
	            React.createElement("div", {style: {marginTop: 50}}, 
	              React.createElement("div", {style: {display: 'inline-block'}}, 
	                React.createElement(Button, {id: "likeCount", retainBackground: true, rounded: true, bsStyle: "orange75", active: this.state.likeActive, onClick: this.handleLike}, 
	                  React.createElement(Icon, {glyph: "icon-fontello-heart-1"})
	                ), 
	                React.createElement(Label, {className: "social-like-count", htmlFor: "likeCount"}, React.createElement("span", {className: this.state.likeTextStyle}, this.state.likeCount, " likes"))
	              )
	            )
	          )
	        ), 
	        React.createElement("div", {className: "social-avatar"}, 
	          React.createElement(Img, {src: "/imgs/avatars/avatar.jpg", height: "100", width: "100", style: {display: 'block', borderRadius: 100, border: '2px solid #fff', margin: 'auto', marginTop: 50}}), 
	          React.createElement("h4", {className: "fg-white text-center"}, "Username"), 
	          React.createElement("h5", {className: "fg-white text-center", style: {opacity: 0.8}}, "User Position"), 
	          React.createElement("hr", {className: "border-black75", style: {borderWidth: 2}}), 
	          React.createElement("div", {className: "text-center"}, 
	            React.createElement(Button, {outlined: true, inverse: true, retainBackground: true, active: this.state.followActive, bsStyle: "brightblue", onClick: this.handleFollow}, 
	              React.createElement("span", null, this.state.follow)
	            )
	          )
	        )
	      )
	    );
	  }
	});

	var Body = __HUA.createClass({displayName: "Body",
	  componentDidMount: function() {
	    $('html').addClass('social');

	  },
	  componentWillUnmount: function() {
	    $('html').removeClass('social');
	  },
	  render: function() {
	    return (
	      React.createElement(Container, {id: "body", className: "social"}, 
	        React.createElement(SocialBanner, null), 
	        React.createElement(Grid, null, 
	          React.createElement(Row, null, 
	            React.createElement(Col, {xs: 12}, 
	              React.createElement(PanelContainer, {noControls: true}, 
	                React.createElement(Panel, {className: "force-collapse"}, 
	                  React.createElement(PanelHeader, {className: "bg-red fg-white tabs"}, 
	                    React.createElement(TabContainer, null, 
	                      React.createElement(TabList, null, 
	                        React.createElement(Tab, {pane: "tpc_hf:home", active: true}, 
	                          React.createElement(Icon, {bundle: "fontello", glyph: "home"})
	                        ), 
	                        React.createElement(Tab, {pane: "tpc_hf:profile"}, 
	                          React.createElement(Icon, {bundle: "fontello", glyph: "user"})
	                        ), 
	                        React.createElement(Tab, {pane: "tpc_hf:settings"}, 
	                          React.createElement(Icon, {bundle: "fontello", glyph: "cog"})
	                        ), 
	                        React.createElement(Tab, {pane: "tpc_hf:users"}, 
	                          React.createElement(Icon, {bundle: "fontello", glyph: "key"})
	                        )
	                      )
	                    )
	                  ), 
	                  React.createElement(PanelBody, null, 
	                    React.createElement(Grid, null, 
	                      React.createElement(Row, null, 
	                        React.createElement(Col, {xs: 12}, 
	                          React.createElement(TabContent, null, 
	                            React.createElement(TabPane, {tab: "tpc_hf:home", active: true}, 
	                            React.createElement(Grid, null, 
	                              React.createElement(Row, null, 
	                                React.createElement(Col, {xs: 12, style: {padding:0}}, 
	                                  React.createElement("h3", null, "My Campaigns"), 
	                                  React.createElement(Table, {striped: true, bordered: true, className: "tablesaw", "data-mode": "swipe", "data-sortable": true, "data-sortable-switch": true, "data-mode-switch": true}, 
	                                    React.createElement("thead", null, 
	                                      React.createElement("tr", null, 
	                                        React.createElement("th", {"data-sortable-col": true, "data-sortable-default-col": true, "data-priority": "persist"}, "ID"), 
	                                        React.createElement("th", {"data-sortable-col": true, "data-priority": "3"}, "Campagn Name"), 
	                                        React.createElement("th", {"data-sortable-col": true, "data-priority": "2"}, "End Date "), 
	                                        React.createElement("th", {"data-sortable-col": true, "data-priority": "1"}, React.createElement("abbr", {title: "Rotten Tomato Rating"}, "Number of Times Played")), 
	                                        React.createElement("th", {"data-sortable-col": true, "data-priority": "4"}, "Total Spent"), 
	                                        React.createElement("th", {"data-sortable-col": true, "data-priority": "5"}, "Max Budget"), 
	                                        React.createElement("th", {"data-sortable-col": true, "data-priority": "6"}, "Active (ON/OFF)"), 
	                                        React.createElement("th", {"data-sortable-col": true, "data-priority": "7"}, "View")
	                                      )
	                                    ), 
	                                    React.createElement("tbody", null, 
	                                      React.createElement("tr", null, 
	                                        React.createElement("td", null, "1"), 
	                                        React.createElement("td", null, "Xmas"), 
	                                        React.createElement("td", null, "27/10/2015"), 
	                                        React.createElement("td", null, "4"), 
	                                        React.createElement("td", null, "$57"), 
	                                        React.createElement("td", null, "$200"), 
	                                        React.createElement("td", null, "on/off"), 
	                                        React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                                      ), 
	                                      React.createElement("tr", null, 
	                                        React.createElement("td", null, "2"), 
	                                        React.createElement("td", null, "Summer"), 
	                                        React.createElement("td", null, "2/10/2015"), 
	                                        React.createElement("td", null, "1"), 
	                                        React.createElement("td", null, "$10"), 
	                                        React.createElement("td", null, "$225"), 
	                                        React.createElement("td", null, "on/off"), 
	                                        React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                                      ), 
	                                      React.createElement("tr", null, 
	                                        React.createElement("td", null, "3"), 
	                                        React.createElement("td", null, "Independence day"), 
	                                        React.createElement("td", null, "27/8/2015"), 
	                                        React.createElement("td", null, "15"), 
	                                        React.createElement("td", null, "$200"), 
	                                        React.createElement("td", null, "$1000"), 
	                                        React.createElement("td", null, "on/off"), 
	                                        React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                                      ), 
	                                      React.createElement("tr", null, 
	                                        React.createElement("td", null, "4"), 
	                                        React.createElement("td", null, "Halloween"), 
	                                        React.createElement("td", null, "5/4/2015"), 
	                                        React.createElement("td", null, "7"), 
	                                        React.createElement("td", null, "$150"), 
	                                        React.createElement("td", null, "$210"), 
	                                        React.createElement("td", null, "on/off"), 
	                                        React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                                      ), 
	                                       React.createElement("tr", null, 
	                                        React.createElement("td", null, "5"), 
	                                        React.createElement("td", null, "The Christmas Feast and Santa Claus"), 
	                                        React.createElement("td", null, "27/10/2015"), 
	                                        React.createElement("td", null, "4"), 
	                                        React.createElement("td", null, "$57"), 
	                                        React.createElement("td", null, "$200"), 
	                                        React.createElement("td", null, "on/off"), 
	                                        React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                                      ), 
	                                      React.createElement("tr", null, 
	                                        React.createElement("td", null, "1"), 
	                                        React.createElement("td", null, "public holidays"), 
	                                        React.createElement("td", null, "27/10/2015"), 
	                                        React.createElement("td", null, "4"), 
	                                        React.createElement("td", null, "$57"), 
	                                        React.createElement("td", null, "$200"), 
	                                        React.createElement("td", null, "on/off"), 
	                                        React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                                      ), 
	                                      React.createElement("tr", null, 
	                                        React.createElement("td", null, "1"), 
	                                        React.createElement("td", null, "Mother’s Day"), 
	                                        React.createElement("td", null, "27/10/2015"), 
	                                        React.createElement("td", null, "4"), 
	                                        React.createElement("td", null, "$57"), 
	                                        React.createElement("td", null, "$200"), 
	                                        React.createElement("td", null, "on/off"), 
	                                        React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                                      ), 
	                                       React.createElement("tr", null, 
	                                        React.createElement("td", null, "1"), 
	                                        React.createElement("td", null, "spring"), 
	                                        React.createElement("td", null, "27/10/2015"), 
	                                        React.createElement("td", null, "4"), 
	                                        React.createElement("td", null, "$57"), 
	                                        React.createElement("td", null, "$200"), 
	                                        React.createElement("td", null, "on/off"), 
	                                        React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                                      ), 
	                                       React.createElement("tr", null, 
	                                        React.createElement("td", null, "1"), 
	                                        React.createElement("td", null, "Winter"), 
	                                        React.createElement("td", null, "27/10/2015"), 
	                                        React.createElement("td", null, "4"), 
	                                        React.createElement("td", null, "$57"), 
	                                        React.createElement("td", null, "$200"), 
	                                        React.createElement("td", null, "on/off"), 
	                                        React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                                      ), 
	                                       React.createElement("tr", null, 
	                                        React.createElement("td", null, "1"), 
	                                        React.createElement("td", null, "autumn"), 
	                                        React.createElement("td", null, "27/10/2015"), 
	                                        React.createElement("td", null, "4"), 
	                                        React.createElement("td", null, "$57"), 
	                                        React.createElement("td", null, "$200"), 
	                                        React.createElement("td", null, "on/off"), 
	                                        React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                                      ), 
	                                       React.createElement("tr", null, 
	                                        React.createElement("td", null, "1"), 
	                                        React.createElement("td", null, "Christmas"), 
	                                        React.createElement("td", null, "27/10/2015"), 
	                                        React.createElement("td", null, "4"), 
	                                        React.createElement("td", null, "$57"), 
	                                        React.createElement("td", null, "$200"), 
	                                        React.createElement("td", null, "on/off"), 
	                                        React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                                      ), 
	                                       React.createElement("tr", null, 
	                                        React.createElement("td", null, "1"), 
	                                        React.createElement("td", null, "Summer"), 
	                                        React.createElement("td", null, "27/10/2015"), 
	                                        React.createElement("td", null, "4"), 
	                                        React.createElement("td", null, "57$"), 
	                                        React.createElement("td", null, "$200"), 
	                                        React.createElement("td", null, "on/off"), 
	                                        React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                                      ), 
	                                       React.createElement("tr", null, 
	                                        React.createElement("td", null, "1"), 
	                                        React.createElement("td", null, "Mother’s Day"), 
	                                        React.createElement("td", null, "27/10/2015"), 
	                                        React.createElement("td", null, "4"), 
	                                        React.createElement("td", null, "$57"), 
	                                        React.createElement("td", null, "$200"), 
	                                        React.createElement("td", null, "on/off"), 
	                                        React.createElement("td", {className: "text-center"}, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info center-block"}, "Info"), ' ')
	                                      )
	                                    )
	                                  )
	                                )
	                              )
	                            )
	                            ), 
	                            React.createElement(TabPane, {tab: "tpc_hf:profile"}, 
	                              React.createElement("h4", null, "About"), 
	                              React.createElement("p", null, React.createElement(LoremIpsum, {query: "2s"}))
	                            ), 
	                            React.createElement(TabPane, {tab: "tpc_hf:settings"}, 
	                              React.createElement("h4", null, "Settings"), 
	                              React.createElement("p", null, React.createElement(LoremIpsum, {query: "2s"}))
	                            ), 
	                            React.createElement(TabPane, {tab: "tpc_hf:users"}, 
	                              React.createElement("h4", null, "Change"), 
	                              React.createElement("p", null, React.createElement(LoremIpsum, {query: "3s"}))
	                            )


	                          )
	                        )
	                      )
	                    )
	                  )
	                )
	              )
	            )
	          )
	        ), 
	        this.props.children
	      )
	    );
	  }
	});

	var classSet = React.addons.classSet;
	var Social = __HUA.createClass({displayName: "Social",
	  mixins: [SidebarMixin],
	  render: function() {
	    var classes = classSet({
	      'container-open': this.state.open
	    });
	    return (
	      React.createElement(Container, {id: "container", className: classes}, 
	        React.createElement(Sidebar, null), 
	        React.createElement(Header, {pressed: true}), 
	        React.createElement(Body, null), 
	        React.createElement(Footer, null)
	      )
	    );
	  }
	});

	module.exports = Social;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __HUA = (function () { var React = __webpack_require__(2); var getHotUpdateAPI = __webpack_require__(3); return getHotUpdateAPI(React, "billing.jsx", module.id); })(); if (false) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "billing.jsx" + ": " + err.message); } }); module.hot.dispose(function () { var nextTick = require("/Users/George/Desktop/TT_rubix-reactjs/node_modules/react-hot-loader/node_modules/next-tick/index.js"); nextTick(__HUA.updateMountedInstances); }); }

	var Header = __webpack_require__(8);
	var Sidebar = __webpack_require__(9);
	var Footer = __webpack_require__(10);

	var Body = __HUA.createClass({displayName: "Body",
	  render: function() {
	    return (
	      React.createElement(Container, {id: "body"}, 
	        React.createElement(Grid, null, 
	          React.createElement(Row, null, 
	            React.createElement(Col, {xs: 12}, 
	              React.createElement(PanelContainer, {noControls: true}, 
	                React.createElement(Panel, null, 
	                  React.createElement(PanelHeader, null, 
	                    React.createElement(Grid, null, 
	                      React.createElement(Row, null, 
	                        React.createElement(Col, {xs: 6, style: {paddingTop: 25}}, 
	                          React.createElement("div", null, React.createElement("img", {src: "/imgs/logo.png"})), React.createElement("br", null), 
	                          React.createElement("address", null, 
	                            React.createElement("strong", {className: "fg-black50"}, "LionTech Dummy Corp."), React.createElement("br", null), 
	                            "123 Folsom Ave, Suite 600", React.createElement("br", null), 
	                            "San Francisco, CA 94107", React.createElement("br", null), 
	                            React.createElement("abbr", {title: "Phone"}, "P:"), " (123) 456-7890", React.createElement("br", null), 
	                            React.createElement("div", {className: "hidden-print"}, React.createElement("abbr", {title: "Email"}, "E:"), ' ', React.createElement("a", {href: "mailto:support@sketchpixy.com"}, "support@sketchpixy.com"))
	                          )
	                        ), 
	                        React.createElement(Col, {xs: 6, className: "text-right", style: {paddingTop: 25}}, 
	                          React.createElement("h2", {className: "fg-black", style: {margin: 0, marginBottom: 12.5}}, "Invoice #006699"), 
	                          React.createElement("div", null, "Issued April 24th, 2014"), 
	                          React.createElement("div", {className: "fg-red hidden-print"}, "Payment due September 25th, 2014"), React.createElement("br", null), 
	                          React.createElement("address", null, 
	                            React.createElement("strong", {className: "fg-black50"}, "SuperTech Client."), React.createElement("br", null), 
	                            "795 Folsom Ave, Suite 300", React.createElement("br", null), 
	                            "San Francisco, CA 12345", React.createElement("br", null), 
	                            React.createElement("abbr", {title: "Phone"}, "P:"), " (098) 765-4321"
	                          )
	                        )
	                      )
	                    ), 
	                    React.createElement("hr", {className: "hidden-print", style: {marginTop: 0}})
	                  ), 
	                  React.createElement(PanelBody, null, 
	                    React.createElement(Grid, null, 
	                      React.createElement(Row, null, 
	                        React.createElement(Col, {xs: 12}, 
	                          React.createElement(Table, {striped: true}, 
	                            React.createElement("thead", {className: "bg-darkgrayishblue75 fg-white"}, 
	                              React.createElement("tr", null, 
	                                React.createElement("th", null, "#"), 
	                                React.createElement("th", null, "Item"), 
	                                React.createElement("th", null, "Quantity"), 
	                                React.createElement("th", null, "Unit Price"), 
	                                React.createElement("th", null, "Sub-total")
	                              )
	                            ), 
	                            React.createElement("tbody", null, 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "1"), 
	                                React.createElement("td", null, "Website wireframe for 5 pages"), 
	                                React.createElement("td", null, "10 hours"), 
	                                React.createElement("td", null, "$75"), 
	                                React.createElement("td", null, "$750")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "2"), 
	                                React.createElement("td", null, "Design and layout of 5 pages in Photoshop"), 
	                                React.createElement("td", null, "20 hours"), 
	                                React.createElement("td", null, "$75"), 
	                                React.createElement("td", null, "$1,500")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "3"), 
	                                React.createElement("td", null, "Logo design"), 
	                                React.createElement("td", null, "1"), 
	                                React.createElement("td", null, "$500"), 
	                                React.createElement("td", null, "$500")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "4"), 
	                                React.createElement("td", null, "PSD to HTML coding"), 
	                                React.createElement("td", null, "25 hours"), 
	                                React.createElement("td", null, "$100"), 
	                                React.createElement("td", null, "$2,500")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "5"), 
	                                React.createElement("td", null, "E-Commerce development"), 
	                                React.createElement("td", null, "10 hours"), 
	                                React.createElement("td", null, "$100"), 
	                                React.createElement("td", null, "$1,000")
	                              )
	                            ), 
	                            React.createElement("tfoot", {className: "bg-darkgrayishblue75 fg-white"}, 
	                              React.createElement("tr", null, 
	                                React.createElement("th", {colSpan: "3"}), 
	                                React.createElement("th", null, "Total"), 
	                                React.createElement("th", null, "$6,250")
	                              )
	                            )
	                          )
	                        )
	                      )
	                    ), 
	                    React.createElement("hr", {className: "hidden-print", style: {marginTop: 0}}), 
	                    React.createElement(Grid, null, 
	                      React.createElement(Row, null, 
	                        React.createElement(Col, {xs: 8}, 
	                          React.createElement("p", null, 
	                            React.createElement(LoremIpsum, {query: "6s"})
	                          ), 
	                          React.createElement("p", null, 
	                            React.createElement("strong", null, "Thank you very much for choosing us. It was a pleasure to have worked with you.")
	                          ), 
	                          React.createElement("p", null, 
	                            React.createElement("img", {src: "/imgs/shots/paypal.jpg", style: {marginLeft: -8, marginRight: -8}})
	                          )
	                        ), 
	                        React.createElement(Col, {xs: 4}, 
	                          React.createElement("div", {className: "bg-darkgrayishblue75 text-uppercase text-centered"}, 
	                              React.createElement("h5", {className: "subheader fg-white", style: {margin: 0, padding: 12.5}}, "amount due")
	                          ), 
	                          React.createElement("div", null, 
	                              React.createElement(Table, null, 
	                                React.createElement("tbody", null, 
	                                  React.createElement("tr", null, 
	                                    React.createElement("td", null, "Subtotal"), 
	                                    React.createElement("td", null, "$6,250")
	                                  ), 
	                                  React.createElement("tr", null, 
	                                    React.createElement("td", null, "Tax (2%)"), 
	                                    React.createElement("td", null, "$125")
	                                  ), 
	                                  React.createElement("tr", null, 
	                                    React.createElement("td", null, "Total"), 
	                                    React.createElement("td", null, "$6,375")
	                                  )
	                                )
	                              )
	                          )
	                        )
	                      )
	                    ), 
	                    React.createElement("hr", {className: "hidden-print", style: {marginTop: 0}}), 
	                    React.createElement(Grid, {className: "hidden-print"}, 
	                      React.createElement(Row, null, 
	                        React.createElement(Col, {xs: 12, className: "text-right"}, 
	                          React.createElement("div", null, React.createElement(Button, {outlined: true, lg: true, bsStyle: "darkgrayishblue75", onClick: window.print}, "print invoice")), React.createElement("br", null)
	                        )
	                      )
	                    )
	                  )
	                )
	              )
	            )
	          )
	        )
	      )
	    );
	  }
	});

	var classSet = React.addons.classSet;
	var Billing = __HUA.createClass({displayName: "Billing",
	  mixins: [SidebarMixin],
	  render: function() {
	    var classes = classSet({
	      'container-open': this.state.open
	    });
	    return (
	      React.createElement(Container, {id: "container", className: classes}, 
	        React.createElement(Sidebar, null), 
	        React.createElement(Header, null), 
	        React.createElement(Body, null), 
	        React.createElement(Footer, null)
	      )
	    );
	  }
	});

	module.exports = Billing;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __HUA = (function () { var React = __webpack_require__(2); var getHotUpdateAPI = __webpack_require__(3); return getHotUpdateAPI(React, "login.jsx", module.id); })(); if (false) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "login.jsx" + ": " + err.message); } }); module.hot.dispose(function () { var nextTick = require("/Users/George/Desktop/TT_rubix-reactjs/node_modules/react-hot-loader/node_modules/next-tick/index.js"); nextTick(__HUA.updateMountedInstances); }); }

	var Header = __webpack_require__(8);
	var Sidebar = __webpack_require__(9);
	var Footer = __webpack_require__(10);

	var Body = __HUA.createClass({displayName: "Body",
	  mixins: [ReactRouter.State, ReactRouter.Navigation],
	  back: function(e) {
	    e.preventDefault();
	    e.stopPropagation();
	    this.transitionTo('/app/billing');
	  },
	  handleSubmit:function(e){
	      e.preventDefault();
	      e.stopPropagation();
	      console.log("redirecting..");
	  },
	  componentDidMount: function() {
	    $('html').addClass('authentication');
	  },
	  componentWillUnmount: function() {
	    $('html').removeClass('authentication');
	  },
	  render: function() {
	    // var className = this.props.active ? 'active' : null;
	    return (
	      React.createElement(Container, {id: "auth-container", className: "login"}, 
	        React.createElement(Container, {id: "auth-row"}, 
	          React.createElement(Container, {id: "auth-cell"}, 
	            React.createElement(Grid, null, 
	              React.createElement(Row, null, 
	                React.createElement(Col, {sm: 12}, 
	                  React.createElement(PanelContainer, {noControls: true, style: {borderRadius:0}}, 
	                    React.createElement(Panel, null, 
	                      React.createElement(PanelBody, {style: {padding: 0, borderRadius:1}}, 
	                        React.createElement("div", {className: "text-center bg-red fg-white login-header-bg"}, 
	                          React.createElement("h3", {style: {margin: 0, padding: 20, fontSize:30}}, "Sign in to Taxitube")
	                        ), 
	                        React.createElement("div", {className: "bg-hoverblue fg-black50 text-center", style: {padding: 12.5}}, 

	                          React.createElement("div", {style: {marginTop: 12.5, marginBottom: 8.5}}, 
	                            React.createElement(Button, {id: "facebook-btn", lg: true, bsStyle: "darkblue", type: "submit", onClick: this.back}, 
	                              React.createElement(Icon, {glyph: "icon-fontello-facebook"}), 
	                              React.createElement("span", null, "Sign in ", React.createElement("span", {className: "hidden-xs"}, "with facebook"))
	                            )
	                          ), 
	                          React.createElement("div", null, 
	                            React.createElement("a", {id: "twitter-link", href: "#", onClick: this.back}, React.createElement(Icon, {glyph: "icon-fontello-twitter"}), React.createElement("span", null, " or with twitter"))
	                          )
	                        ), 
	                        React.createElement("div", null, 
	                          React.createElement("div", {className: "text-center", style: {padding: 12.5}}, 
	                            "or use your taxitube account"
	                          ), 
	                          React.createElement("div", {style: {padding: 2, paddingTop: 0, paddingBottom: 0, margin: 20, marginBottom: 5, marginTop: 10}}, 
	                            React.createElement(Form, {onSubmit: this.handleSubmit}, 
	                              React.createElement(FormGroup, null, 
	                                React.createElement(InputGroup, {lg: true}, 
	                                  React.createElement(InputGroupAddon, null, 
	                                    React.createElement(Icon, {glyph: "icon-fontello-user"})
	                                  ), 
	                                  React.createElement(Input, {autoFocus: true, 
	                                         type: "text", 
	                                         id: "emailaddress", 
	                                         className: "border-focus-blue", 
	                                         placeholder: "username"}
	                                         )
	                                )
	                              ), 
	                              React.createElement(FormGroup, null, 
	                                React.createElement(InputGroup, {lg: true}, 
	                                  React.createElement(InputGroupAddon, null, 
	                                    React.createElement(Icon, {glyph: "icon-fontello-key"})
	                                  ), 
	                                  React.createElement(Input, {type: "password", 
	                                         id: "password", 
	                                         className: "border-focus-blue", 
	                                         placeholder: "password"}
	                                         )
	                                )
	                              ), 
	                              React.createElement(FormGroup, null, 
	                                React.createElement(Grid, null, 
	                                  React.createElement(Row, null, 
	                                    React.createElement(Col, {xs: 6, collapseLeft: true, collapseRight: true, style: {paddingTop: 10}}, 
	                                      React.createElement(Link, {to: "/app/signup"}, "Create a taxitube account")
	                                    ), 
	                                    React.createElement(Col, {xs: 6, collapseLeft: true, collapseRight: true, className: "text-right"}, 
	                                      React.createElement(Button, {lg: true, 
	                                              type: "submit", 
	                                              bsStyle: "red", 
	                                              className: "login"}, 
	                                            "Login"
	                                      )
	                                    )
	                                  )
	                                )
	                              )
	                            )
	                          )
	                        )
	                      )
	                    )
	                  )
	                )
	              )
	            )
	          )
	        )
	      )
	    );
	  }
	});

	function emplyValues(){
	  var username = document.getElementById('emailaddress');
	  var password = document.getElementById('password');
	  var badColor = "red";

	  if(username.value == ""){
	    username.style.borderColor = badColor;
		count = count + 1;
	  }
	  else{
		username.style.borderColor = "lightblue";
	  }

	  if(password.value == ""){
	    password.style.borderColor = badColor;
		count = count + 1;
	  }
	  else{
		password.style.borderColor = "lightblue";
	  }
	  if (count > 0) return false;
	    return true;
	}

	var classSet = React.addons.classSet;
	var LoginPage = __HUA.createClass({displayName: "LoginPage",
	  mixins: [SidebarMixin],
	  render: function() {
	    var classes = classSet({
	      'container-open': this.state.open
	    });
	    return (
	      React.createElement(Container, {id: "container", className: classes}, 
	        React.createElement(Body, null)
	      )
	    );
	  }
	});

	module.exports = LoginPage;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __HUA = (function () { var React = __webpack_require__(2); var getHotUpdateAPI = __webpack_require__(3); return getHotUpdateAPI(React, "signup.jsx", module.id); })(); if (false) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "signup.jsx" + ": " + err.message); } }); module.hot.dispose(function () { var nextTick = require("/Users/George/Desktop/TT_rubix-reactjs/node_modules/react-hot-loader/node_modules/next-tick/index.js"); nextTick(__HUA.updateMountedInstances); }); }

	var Header = __webpack_require__(8);
	var Sidebar = __webpack_require__(9);
	var Footer = __webpack_require__(10);

	var Body = __HUA.createClass({displayName: "Body",
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
	      React.createElement(Container, {id: "auth-container", className: "signup"}, 
	        React.createElement(Container, {id: "auth-row"}, 
	          React.createElement(Container, {id: "auth-cell"}, 
	            React.createElement(Grid, null, 
	              React.createElement(Row, null, 
	                React.createElement(Col, {lg: 12}, 
	                  React.createElement(PanelContainer, {noControls: true}, 
	                    React.createElement(Panel, null, 
	                      React.createElement(PanelBody, {style: {padding: 0}}, 
	                        React.createElement("div", {className: "text-center bg-darkblue fg-white"}, 
	                          React.createElement("h3", {style: {margin: 0, padding: 25}}, "Sign up"), 
	                         React.createElement("div", {id: "error_msg"})
	                        ), 
	                        React.createElement("div", null, 
	                          React.createElement("div", {style: {padding: 25, paddingTop: 0, paddingBottom: 0, margin: 'auto', marginBottom: 25, marginTop: 25}}, 
	                            React.createElement(Form, {onSubmit: this.handleSubmit}, 
	                              React.createElement(FormGroup, null, 
	                                React.createElement(InputGroup, {md: true}, 
	                                  React.createElement(InputGroupAddon, null, 
	                                    React.createElement(Icon, {glyph: "icon-fontello-user"})
	                                  ), 
	                                  React.createElement(Input, {autoFocus: true, type: "text", ref: "customername", id: "customername", className: "border-focus-blue", placeholder: "Customer Name"}), 
			                              React.createElement(InputGroupAddon, null, 
	                                    React.createElement(Icon, {glyph: "icon-fontello-th-large"})
	                                  ), 
	                                  React.createElement(Input, {autoFocus: true, type: "text", ref: "customerid", id: "customerid", className: "border-focus-blue", placeholder: "Customer ID"})
	                                )
	                              ), 

	                              React.createElement(FormGroup, null, 
	                                React.createElement(InputGroup, {md: true}, 
	                                  React.createElement(InputGroupAddon, null, 
	                                    React.createElement(Icon, {glyph: "icon-fontello-reply"})
	                                  ), 
	                                  React.createElement(Input, {type: "text", id: "emailaddress", ref: "emailaddress", className: "border-focus-blue", placeholder: "Address Line", require: true}), 
	                                  React.createElement(InputGroupAddon, null, 
	                                    React.createElement(Icon, {glyph: "icon-fontello-reply"})
	                                  ), 
	                                  React.createElement(Input, {type: "text", id: "emailaddress2", ref: "emailaddress2", className: "border-focus-blue", placeholder: "Address Line 2"})
	                                )
	                              ), 

	                              React.createElement(FormGroup, null, 
	                                React.createElement(InputGroup, {md: true}, 
	                                  React.createElement(InputGroupAddon, null, 
	                                    React.createElement(Icon, {glyph: "icon-fontello-asterisk"})
	                                  ), 
	                                  React.createElement(Input, {type: "text", id: "city", ref: "city", className: "border-focus-blue", placeholder: "City"}), 
	                                   React.createElement(InputGroupAddon, null, 
	                                    React.createElement(Icon, {glyph: "icon-fontello-asterisk"})
	                                  ), 
	                                  React.createElement(Input, {type: "text", id: "country", ref: "country", className: "border-focus-blue", placeholder: "Country"}), 
	                                  React.createElement(InputGroupAddon, null, 
	                                    React.createElement(Icon, {glyph: "icon-fontello-asterisk"})
	                                  ), 
	                                  React.createElement(Input, {type: "text", id: "postcode", ref: "postcode", className: "border-focus-blue", placeholder: "Post Code", require: true})
	                                )
	                              ), 
	                              React.createElement(FormGroup, null, 
	                                React.createElement(InputGroup, {md: true}, 
	                                  React.createElement(InputGroupAddon, null, 
	                                    React.createElement(Icon, {glyph: "icon-fontello-phone"})
	                                  ), 
	                                  React.createElement(Input, {type: "text", className: "textfield", id: "phone", ref: "phone", className: "border-focus-blue", placeholder: "Phone", onkeypress: "return isNumber(event)"}), 
				                            React.createElement(InputGroupAddon, null, 
	                                    React.createElement(Icon, {glyph: "icon-fontello-user"})
	                                  ), 
	                                  React.createElement(Input, {type: "text", id: "director", ref: "director", className: "border-focus-blue", placeholder: "Director"})
	                                )
	                              ), 
	                              React.createElement(FormGroup, null, 
	                                React.createElement(InputGroup, {md: true}, 
	                                  React.createElement(InputGroupAddon, null, 
	                                    React.createElement(Icon, {glyph: "icon-fontello-user"})
	                                  ), 
	                                  React.createElement(Input, {type: "text", id: "username", ref: "username", className: "border-focus-blue", placeholder: "Username"})
	                                )
	                              ), 
	                              React.createElement(FormGroup, null, 
	                                React.createElement(InputGroup, {md: true}, 
	                                  React.createElement(InputGroupAddon, null, 
	                                    React.createElement(Icon, {glyph: "icon-fontello-mail-alt"})
	                                  ), 
	                                  React.createElement(Input, {type: "email", id: "useremail", ref: "useremail", className: "border-focus-blue", placeholder: "Email"})
	                                )
	                              ), 
	                              React.createElement(FormGroup, null, 
	                                React.createElement(InputGroup, {md: true}, 
	                                  React.createElement(InputGroupAddon, null, 
	                                    React.createElement(Icon, {glyph: "icon-fontello-key"})
	                                  ), 
	                                  React.createElement(Input, {type: "password", id: "password", ref: "password", className: "border-focus-blue", placeholder: "password"})
	                                )
	                              ), 
	                              React.createElement(FormGroup, null, 
	                                React.createElement(InputGroup, {md: true}, 
	                                  React.createElement(InputGroupAddon, null, 
	                                    React.createElement(Icon, {glyph: "icon-fontello-key"})
	                                  ), 
	                                  React.createElement(Input, {type: "password", id: "passwordconfirm", ref: "passwordconfirm", className: "border-focus-blue", placeholder: "repeat password"}), 
	                                  React.createElement("span", {id: "confirmMessage", className: "confirmMessage", onpaste: "return false;"})
	                                )
	                              ), 

	                              React.createElement(FormGroup, null, 

	                                React.createElement(Grid, null, 
	                                  React.createElement(Row, null, 
	                                    React.createElement(Col, {xs: 12, collapseLeft: true, collapseRight: true}, 
	                                      React.createElement(Button, {type: "submit", outlined: true, lg: true, bsStyle: "blue", block: true}, "Create account")
	                                    )
	                                  )
	                                )
	                              )
	                            )
	                          ), 
	                          React.createElement("div", {className: "bg-hoverblue fg-black50 text-center", style: {padding: 25, paddingTop: 12.5}}, 
	                            React.createElement("div", {style: {marginBottom: 12.5}}, "SIGN UP WITH"), 
	                            React.createElement(Grid, null, 
	                              React.createElement(Row, null, 
	                                React.createElement(Col, {xs: 12, sm: 6, className: "facebook-container", smCollapseLeft: true, smCollapseRight: true}, 
	                                  React.createElement(Button, {block: true, type: "submit", id: "facebook-btn", lg: true, bsStyle: "darkblue", onClick: this.back}, 
	                                    React.createElement(Icon, {glyph: "icon-fontello-facebook"}), 
	                                    React.createElement("span", null, "Facebook")
	                                  )
	                                ), 
	                                React.createElement(Col, {xs: 12, sm: 6, className: "", smCollapseLeft: true, smCollapseRight: true}, 
	                                  React.createElement(Button, {block: true, type: "submit", id: "twitter-btn", lg: true, bsStyle: "darkblue", onClick: this.back}, 
	                                    React.createElement(Icon, {glyph: "icon-fontello-twitter"}), 
	                                    React.createElement("span", null, "Twitter")
	                                  )
	                                )
	                              )
	                            ), 
	                            React.createElement("div", {style: {marginTop: 25}}, 
	                              "Already have an account? ", React.createElement(Link, {to: "/app/login"}, "Login")
	                            )
	                          )
	                        )
	                      )
	                    )
	                  )
	                )
	              )
	            )
	          )
	        )
	      )
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
	var SignupPage = __HUA.createClass({displayName: "SignupPage",
	  mixins: [SidebarMixin],
	  render: function() {
	    var classes = classSet({
	      'container-open': this.state.open
	    });
	    return (
	      React.createElement(Container, {id: "container", className: classes}, 
	        React.createElement(Body, null)
	      )
	    );
	  }
	});

	module.exports = SignupPage;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __HUA = (function () { var React = __webpack_require__(2); var getHotUpdateAPI = __webpack_require__(3); return getHotUpdateAPI(React, "blank.jsx", module.id); })(); if (false) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "blank.jsx" + ": " + err.message); } }); module.hot.dispose(function () { var nextTick = require("/Users/George/Desktop/TT_rubix-reactjs/node_modules/react-hot-loader/node_modules/next-tick/index.js"); nextTick(__HUA.updateMountedInstances); }); }

	var Header = __webpack_require__(8);
	var Sidebar = __webpack_require__(9);
	var Footer = __webpack_require__(10);

	var Body = __HUA.createClass({displayName: "Body",
	  render: function() {
	    return (
	      React.createElement(Container, {id: "body"}, 
	        React.createElement(Grid, null, 
	          React.createElement(Row, null, 
	            React.createElement(Col, {sm: 12}, 
	              React.createElement(PanelContainer, null, 
	                React.createElement(Panel, null, 
	                  React.createElement(PanelBody, {className: "text-center"}, 
	                    React.createElement("p", null, "BLANK PAGE")
	                  )
	                )
	              )
	            )
	          )
	        )
	      )
	    );
	  }
	});

	var Page = __HUA.createClass({displayName: "Page",
	  mixins: [SidebarMixin],
	  render: function() {
	    var classes = React.addons.classSet({
	      'container-open': this.state.open
	    });
	    return (
	      React.createElement(Container, {id: "container", className: classes}, 
	        React.createElement(Sidebar, null), 
	        React.createElement(Header, null), 
	        React.createElement(Body, null), 
	        React.createElement(Footer, null)
	      )
	    );
	  }
	});

	module.exports = Page;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __HUA = (function () { var React = __webpack_require__(2); var getHotUpdateAPI = __webpack_require__(3); return getHotUpdateAPI(React, "upload.jsx", module.id); })(); if (false) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "upload.jsx" + ": " + err.message); } }); module.hot.dispose(function () { var nextTick = require("/Users/George/Desktop/TT_rubix-reactjs/node_modules/react-hot-loader/node_modules/next-tick/index.js"); nextTick(__HUA.updateMountedInstances); }); }

	var Header = __webpack_require__(8);
	var Sidebar = __webpack_require__(9);
	var Footer = __webpack_require__(10);

	var Body = __HUA.createClass({displayName: "Body",
	  componentDidMount: function() {
	    var myDropzone = $('#my-awesome-dropzone');
	    myDropzone.dropzone({
	      paramName: "file", // The name that will be used to transfer the file
	      maxFilesize: 3, // MB
	      parallelUploads:1,
	      addRemoveLinks: true,
	      maxFiles:1,
	      createImageThumbnails:true,
	      acceptedFiles:".jpeg, .png, .mp4",
	      accept: function(file, done) {
	        done();
	      },
	      init: function() {
	        this.on("success", function(file) {
	          $('.next').prop('disabled', false);
	         });
	         this.on("removedfile", function(file) {
	           $('.next').prop('disabled', true);
	          });
	      }
	    });

	    var wizard = function(){
	        $('#wizard-1').steps({
	          autoFocus: true
	      });
	    };
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
	      React.createElement(Container, {id: "body"}, 
	        React.createElement(Grid, null, 
	          React.createElement(Row, null, 
	            React.createElement(Col, {sm: 12}, 
	              React.createElement(PanelContainer, {noControls: true}, 
	                React.createElement(Panel, null, 
	                  React.createElement(PanelHeader, {className: "bg-darkgreen45 fg-white", style: {margin: 0}}, 
	                    React.createElement(Grid, null, 
	                      React.createElement(Row, null, 
	                        React.createElement(Col, {xs: 12}, 
	                          React.createElement("h3", null, "Standart Package")
	                        )
	                      )
	                    )
	                  ), 
	                  React.createElement(PanelBody, null, 
	                    React.createElement(Grid, null, 
	                      React.createElement(Row, null, 
	                        React.createElement(Col, {xs: 12}, 
	                          React.createElement("h3", null, "upload file(*.jpg, *.png, *.mp4)")
	                        )
	                      )
	                    )
	                  ), 
	                  React.createElement(PanelBody, null, 

	                    React.createElement(Grid, null, 
	                      React.createElement(Row, null, 
	                        React.createElement(Col, {xs: 12}, 
	                          React.createElement(Form, {action: "/dropzone/file-upload", 
	                                className: "dropzone", 
	                                id: "my-awesome-dropzone"}
	                          )
	                        ), 
	                        React.createElement(Col, {xs: 12}, 
	                          React.createElement(Link, {to: "/app/file-utilities/cropping"}, 
	                            React.createElement(Button, {lg: true, disabled: true, style: {marginBottom: 5}, bsStyle: "success pull-right next"}, "next"), ' '
	                          )
	                        )
	                      )
	                    )
	                  )
	                )
	              )
	            )
	          )
	        )
	      )
	    );
	  }
	});

	var classSet = React.addons.classSet;
	var Standart = __HUA.createClass({displayName: "Standart",
	  mixins: [SidebarMixin],
	  render: function() {
	    var classes = classSet({
	      'container-open': this.state.open
	    });
	    return (
	      React.createElement(Container, {id: "container", className: classes}, 
	        React.createElement(Sidebar, null), 
	        React.createElement(Header, null), 
	        React.createElement(Body, null), 
	        React.createElement(Footer, null)
	      )
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


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __HUA = (function () { var React = __webpack_require__(2); var getHotUpdateAPI = __webpack_require__(3); return getHotUpdateAPI(React, "crop.jsx", module.id); })(); if (false) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "crop.jsx" + ": " + err.message); } }); module.hot.dispose(function () { var nextTick = require("/Users/George/Desktop/TT_rubix-reactjs/node_modules/react-hot-loader/node_modules/next-tick/index.js"); nextTick(__HUA.updateMountedInstances); }); }

	var Header = __webpack_require__(8);
	var Sidebar = __webpack_require__(9);
	var Footer = __webpack_require__(10);

	var Body = __HUA.createClass({displayName: "Body",
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
	      React.createElement(Container, {id: "body"}, 
	        React.createElement(Grid, null, 
	          React.createElement(Row, null, 
	          React.createElement(Col, {sm: 12}, 
	            React.createElement(PanelContainer, {noControls: true}, 
	              React.createElement(Panel, null, 
	                React.createElement(PanelHeader, {className: "bg-red fg-white", style: {margin: 0}}, 
	                  React.createElement(Grid, null, 
	                    React.createElement(Row, null, 
	                      React.createElement(Col, {xs: 12}, 
	                        React.createElement("h3", null, "jCrop : Aspect Ratio with Preview Pane")
	                      )

	                    )
	                  )
	                ), 
	                React.createElement(PanelBody, null, 
	                  React.createElement(Grid, null, 
	                    React.createElement(Row, null, 
	                      React.createElement(Col, {xs: 12}, 
	                        React.createElement("br", null), 
	                        React.createElement(Grid, null, 
	                          React.createElement(Row, null, 
	                            React.createElement(Col, {sm: 8, collapseLeft: true, collapseRight: true}, 
	                              React.createElement("img", {src: "/imgs/unsplash/hot-air-baloon.jpg", ref: "aspectwithpreview", alt: "[Jcrop example]", width: "100%", height: "350"})
	                            ), 
	                            React.createElement(Col, {sm: 4, collapseLeft: true, collapseRight: true}, 
	                              React.createElement("div", {id: "preview-pane", style: {display: 'block', position: 'absolute', zIndex: 2000, top: 10, right: '-250px', padding: 6, border: '1px rgba(0,0,0,.4) solid', background: 'white', borderRadius: 6}}, 
	                                React.createElement("div", {className: "preview-container", style: {width: 225, height: 170, overflow: 'hidden'}}, 
	                                  React.createElement("img", {src: "/imgs/unsplash/hot-air-baloon.jpg", alt: "[Jcrop example]", className: "jcrop-preview", alt: "Preview", width: "100%"})
	                                )
	                              )
	                            )
	                          )
	                        ), 
	                        React.createElement("br", null), 
	                        React.createElement("div", {className: "description"}, 
	                          React.createElement("p", null, 
	                            React.createElement("b", null, "An example implementing a preview pane."), 
	                              "Obviously the most visual demo, the preview pane is accomplished" + ' ' +
	                              "entirely outside of Jcrop with a simple jQuery-flavored callback." + ' ' +
	                              "This type of interface could be useful for creating a thumbnail" + ' ' +
	                              "or avatar. The onChange event handler is used to update the" + ' ' +
	                              "view in the preview pane."
	                          )
	                        )
	                      ), 
	                      React.createElement(Col, {xs: 12}, 
	                        React.createElement(Link, {to: "/app/zones"}, 
	                          React.createElement(Button, {lg: true, style: {marginBottom: 5}, bsStyle: "success pull-right next"}, "next"), ' '
	                        )
	                      )
	                    )
	                  )
	                )
	              )
	            )

	          )
	          )
	        )
	      )
	    );
	  }
	});

	var classSet = React.addons.classSet;
	var Crop = __HUA.createClass({displayName: "Crop",
	  mixins: [SidebarMixin],
	  render: function() {
	    var classes = classSet({
	      'container-open': this.state.open
	    });
	    return (
	      React.createElement(Container, {id: "container", className: classes}, 
	        React.createElement(Sidebar, null), 
	        React.createElement(Header, null), 
	        React.createElement(Body, null), 
	        React.createElement(Footer, null)
	      )
	    );
	  }
	});

	module.exports = Crop;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __HUA = (function () { var React = __webpack_require__(2); var getHotUpdateAPI = __webpack_require__(3); return getHotUpdateAPI(React, "gallery.jsx", module.id); })(); if (false) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "gallery.jsx" + ": " + err.message); } }); module.hot.dispose(function () { var nextTick = require("/Users/George/Desktop/TT_rubix-reactjs/node_modules/react-hot-loader/node_modules/next-tick/index.js"); nextTick(__HUA.updateMountedInstances); }); }

	var Header = __webpack_require__(8);
	var Sidebar = __webpack_require__(9);
	var Footer = __webpack_require__(10);

	var GalleryItem = __HUA.createClass({displayName: "GalleryItem",
	  getInitialState: function() {
	    return {
	      active: this.props.active || false,
	      counts: (Math.round(Math.random() * 20) + 4)
	    };
	  },
	  handleIncrement: function(e) {
	    if(this.state.active) return;
	    this.setState({
	      active: true,
	      counts: this.state.counts+1
	    });
	  },
	  render: function() {
	    return (
	      React.createElement(PanelContainer, null, 
	        React.createElement(Panel, null, 
	          React.createElement(PanelHeader, null, 
	            React.createElement(Grid, {className: "gallery-item"}, 
	              React.createElement(Row, null, 
	                React.createElement(Col, {xs: 12, style: {padding: 12.5}}, 
	                  React.createElement("a", {className: "gallery-1 gallery-item-link", href: '/imgs/gallery/'+this.props.image+'.jpg', title: this.props.title}, 
	                    React.createElement(Img, {responsive: true, src: '/imgs/gallery/'+this.props.image+'-thumb.jpg', alt: this.props.title, width: "200", height: "150"}), 
	                    React.createElement("div", {className: "black-wrapper text-center"}, 
	                      React.createElement(Table, {style: {height: '100%', width: '100%'}}, 
	                        React.createElement("tbody", null, 
	                          React.createElement("tr", null, 
	                            React.createElement("td", null, 
	                              React.createElement(Icon, {glyph: "icon-outlined-magnifier-plus icon-3x"})
	                            )
	                          )
	                        )
	                      )
	                    )
	                  ), 
	                  React.createElement("div", {className: "text-center"}, 
	                    React.createElement("h4", {className: "fg-darkgrayishblue75 hidden-xs", style: {textTransform: 'uppercase'}}, this.props.title), 
	                    React.createElement("h6", {className: "fg-darkgrayishblue75 visible-xs", style: {textTransform: 'uppercase'}}, this.props.title), 
	                    React.createElement("h5", {className: "fg-darkgray50 hidden-xs", style: {textTransform: 'uppercase'}}, this.props.subtitle), 
	                    React.createElement("h6", {className: "visible-xs", style: {textTransform: 'uppercase'}}, React.createElement("small", {className: "fg-darkgray50"}, this.props.subtitle)), 
	                      React.createElement(Button, {outlined: true, onlyOnHover: true, bsStyle: "red", className: "fav-btn", active: this.state.active, onClick: this.handleIncrement}, 
	                        React.createElement(Icon, {glyph: "icon-flatline-heart"}), 
	                        React.createElement("span", {className: "counts"}, this.state.counts)
	                      )
	                  )
	                )
	              )
	            )
	          )
	        )
	      )
	    );
	  }
	});

	var Body = __HUA.createClass({displayName: "Body",
	  componentDidMount: function() {
	    var links = document.getElementsByClassName('gallery-1');
	    $('.gallery-1').unbind('click').bind('click', function(event) {
	      blueimp.Gallery(links, {
	        index: $(this).get(0),
	        event: event
	      });
	    });
	  },
	  render: function() {
	    return (
	      React.createElement(Container, {id: "body"}, 
	        React.createElement(Grid, null, 
	          React.createElement(Row, {className: "gallery-view"}, 
	            React.createElement(Col, {xs: 6, sm: 4, collapseRight: true}, 
	              React.createElement(GalleryItem, {image: "tumblr_n6es0tRk5w1st5lhmo1_1280", title: "skyline", subtitle: "10th Dec - 12th Dec"})
	            ), 
	            React.createElement(Col, {xs: 6, sm: 4, collapseRight: true}, 
	              React.createElement(GalleryItem, {active: true, image: "tumblr_n6eszmeQMR1st5lhmo1_1280", title: "me at ny", subtitle: "11th Dec - 12th Dec"})
	            ), 
	            React.createElement(Col, {xs: 6, sm: 4, collapseRight: true}, 
	              React.createElement(GalleryItem, {image: "tumblr_n6rzkfxeOR1st5lhmo1_1280", title: "vintage cameras", subtitle: "13th Dec - 14th Dec"})
	            ), 
	            React.createElement(Col, {xs: 6, sm: 4, collapseRight: true}, 
	              React.createElement(GalleryItem, {image: "tumblr_n6rztipoQy1st5lhmo1_1280", title: "columns", subtitle: "13th Dec - 14th Dec"})
	            ), 
	            React.createElement(Col, {xs: 6, sm: 4, collapseRight: true}, 
	              React.createElement(GalleryItem, {image: "tumblr_n7fg2vYZ741st5lhmo1_1280", title: "peak", subtitle: "14th Dec - 15th Dec"})
	            ), 
	            React.createElement(Col, {xs: 6, sm: 4, collapseRight: true}, 
	              React.createElement(GalleryItem, {image: "tumblr_n7fgnop0bz1st5lhmo1_1280", title: "Mac", subtitle: "14th Dec - 15th Dec"})
	            ), 
	            React.createElement(Col, {xs: 6, sm: 4, collapseRight: true}, 
	              React.createElement(GalleryItem, {image: "tumblr_n7yhe1sTa41st5lhmo1_1280", title: "Taxi cabs", subtitle: "14th Dec - 15th Dec"})
	            ), 
	            React.createElement(Col, {xs: 6, sm: 4, collapseRight: true}, 
	              React.createElement(GalleryItem, {image: "tumblr_n8gxs0oWZ21st5lhmo1_1280", title: "Golden gate", subtitle: "14th Dec - 15th Dec"})
	            ), 
	            React.createElement(Col, {xs: 6, sm: 4, collapseRight: true}, 
	              React.createElement(GalleryItem, {image: "tumblr_n9hyqfJavs1st5lhmo1_1280", title: "Empire state", subtitle: "14th Dec - 15th Dec"})
	            )
	          )
	        ), 
	        this.props.children
	      )
	    );
	  }
	});

	var classSet = React.addons.classSet;
	var GalleryPage = __HUA.createClass({displayName: "GalleryPage",
	  mixins: [SidebarMixin],
	  render: function() {
	    var classes = classSet({
	      'container-open': this.state.open
	    });
	    return (
	      React.createElement(Container, {id: "container", className: classes}, 
	        React.createElement(Sidebar, null), 
	        React.createElement(Header, null), 
	        React.createElement(Body, null), 
	        React.createElement(Footer, null)
	      )
	    );
	  }
	});

	module.exports = GalleryPage;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __HUA = (function () { var React = __webpack_require__(2); var getHotUpdateAPI = __webpack_require__(3); return getHotUpdateAPI(React, "tables.jsx", module.id); })(); if (false) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "tables.jsx" + ": " + err.message); } }); module.hot.dispose(function () { var nextTick = require("/Users/George/Desktop/TT_rubix-reactjs/node_modules/react-hot-loader/node_modules/next-tick/index.js"); nextTick(__HUA.updateMountedInstances); }); }

	var Header = __webpack_require__(8);
	var Sidebar = __webpack_require__(9);
	var Footer = __webpack_require__(10);



	var Body = __HUA.createClass({displayName: "Body",
	  componentDidMount: function() {
	    $('.tablesaw').table();
	  },
	  render: function() {
	    return (
	      React.createElement(Container, {id: "body"}, 
	        React.createElement(Grid, null, 
	          React.createElement(Row, null, 
	            React.createElement(Col, {xs: 12}, 
	              React.createElement(PanelContainer, {noControls: true}, 
	                React.createElement(Panel, null, 
	                  React.createElement(PanelHeader, {className: "bg-red fg-white"}, 
	                    React.createElement(Grid, null, 
	                      React.createElement(Row, null, 
	                        React.createElement(Col, {xs: 12}, 
	                          React.createElement("h3", null, "My Campaigns")
	                        )
	                      )
	                    )
	                  ), 
	                  React.createElement(PanelBody, null, 
	                    React.createElement(Grid, null, 
	                      React.createElement(Row, null, 
	                        React.createElement(Col, {xs: 12}, 
	                          React.createElement("p", null, "Swipe Mode, ModeSwitch, Sortable, SortableSwitch"), 
	                          React.createElement(Table, {striped: true, bordered: true, className: "tablesaw", "data-mode": "swipe", "data-sortable": true, "data-sortable-switch": true, "data-mode-switch": true}, 
	                            React.createElement("thead", null, 
	                              React.createElement("tr", null, 
	                                React.createElement("th", {"data-sortable-col": true, "data-sortable-default-col": true, "data-priority": "persist"}, "ID"), 
	                                React.createElement("th", {"data-sortable-col": true, "data-priority": "3"}, "Campagn Name"), 
	                                React.createElement("th", {"data-sortable-col": true, "data-priority": "2"}, "End Date "), 
	                                React.createElement("th", {"data-sortable-col": true, "data-priority": "1"}, React.createElement("abbr", {title: "Rotten Tomato Rating"}, "Number of Times Played")), 
	                                React.createElement("th", {"data-sortable-col": true, "data-priority": "4"}, "Total Spent"), 
	                                React.createElement("th", {"data-sortable-col": true, "data-priority": "5"}, "Max Budget"), 
	                                React.createElement("th", {"data-sortable-col": true, "data-priority": "6"}, "Active (ON/OFF)"), 
	                                React.createElement("th", {"data-sortable-col": true, "data-priority": "7"}, "View")
	                              )
	                            ), 
	                            React.createElement("tbody", null, 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "1"), 
	                                React.createElement("td", null, "Xmas"), 
	                                React.createElement("td", null, "27/10/2015"), 
	                                React.createElement("td", null, "4"), 
	                                React.createElement("td", null, "$57"), 
	                                React.createElement("td", null, "$200"), 
	                                React.createElement("td", null, "on/off"), 
	                                React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "2"), 
	                                React.createElement("td", null, "Summer"), 
	                                React.createElement("td", null, "2/10/2015"), 
	                                React.createElement("td", null, "1"), 
	                                React.createElement("td", null, "$10"), 
	                                React.createElement("td", null, "$225"), 
	                                React.createElement("td", null, "on/off"), 
	                                React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "3"), 
	                                React.createElement("td", null, "Independence day"), 
	                                React.createElement("td", null, "27/8/2015"), 
	                                React.createElement("td", null, "15"), 
	                                React.createElement("td", null, "$200"), 
	                                React.createElement("td", null, "$1000"), 
	                                React.createElement("td", null, "on/off"), 
	                                React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "4"), 
	                                React.createElement("td", null, "Halloween"), 
	                                React.createElement("td", null, "5/4/2015"), 
	                                React.createElement("td", null, "7"), 
	                                React.createElement("td", null, "$150"), 
	                                React.createElement("td", null, "$210"), 
	                                React.createElement("td", null, "on/off"), 
	                                React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                              ), 
	                               React.createElement("tr", null, 
	                                React.createElement("td", null, "5"), 
	                                React.createElement("td", null, "The Christmas Feast and Santa Claus"), 
	                                React.createElement("td", null, "27/10/2015"), 
	                                React.createElement("td", null, "4"), 
	                                React.createElement("td", null, "$57"), 
	                                React.createElement("td", null, "$200"), 
	                                React.createElement("td", null, "on/off"), 
	                                React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "1"), 
	                                React.createElement("td", null, "public holidays"), 
	                                React.createElement("td", null, "27/10/2015"), 
	                                React.createElement("td", null, "4"), 
	                                React.createElement("td", null, "$57"), 
	                                React.createElement("td", null, "$200"), 
	                                React.createElement("td", null, "on/off"), 
	                                React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "1"), 
	                                React.createElement("td", null, "Mother’s Day"), 
	                                React.createElement("td", null, "27/10/2015"), 
	                                React.createElement("td", null, "4"), 
	                                React.createElement("td", null, "$57"), 
	                                React.createElement("td", null, "$200"), 
	                                React.createElement("td", null, "on/off"), 
	                                React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                              ), 
	                               React.createElement("tr", null, 
	                                React.createElement("td", null, "1"), 
	                                React.createElement("td", null, "spring"), 
	                                React.createElement("td", null, "27/10/2015"), 
	                                React.createElement("td", null, "4"), 
	                                React.createElement("td", null, "$57"), 
	                                React.createElement("td", null, "$200"), 
	                                React.createElement("td", null, "on/off"), 
	                                React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                              ), 
	                               React.createElement("tr", null, 
	                                React.createElement("td", null, "1"), 
	                                React.createElement("td", null, "Winter"), 
	                                React.createElement("td", null, "27/10/2015"), 
	                                React.createElement("td", null, "4"), 
	                                React.createElement("td", null, "$57"), 
	                                React.createElement("td", null, "$200"), 
	                                React.createElement("td", null, "on/off"), 
	                                React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                              ), 
	                               React.createElement("tr", null, 
	                                React.createElement("td", null, "1"), 
	                                React.createElement("td", null, "autumn"), 
	                                React.createElement("td", null, "27/10/2015"), 
	                                React.createElement("td", null, "4"), 
	                                React.createElement("td", null, "$57"), 
	                                React.createElement("td", null, "$200"), 
	                                React.createElement("td", null, "on/off"), 
	                                React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                              ), 
	                               React.createElement("tr", null, 
	                                React.createElement("td", null, "1"), 
	                                React.createElement("td", null, "Christmas"), 
	                                React.createElement("td", null, "27/10/2015"), 
	                                React.createElement("td", null, "4"), 
	                                React.createElement("td", null, "$57"), 
	                                React.createElement("td", null, "$200"), 
	                                React.createElement("td", null, "on/off"), 
	                                React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                              ), 
	                               React.createElement("tr", null, 
	                                React.createElement("td", null, "1"), 
	                                React.createElement("td", null, "Summer"), 
	                                React.createElement("td", null, "27/10/2015"), 
	                                React.createElement("td", null, "4"), 
	                                React.createElement("td", null, "57$"), 
	                                React.createElement("td", null, "$200"), 
	                                React.createElement("td", null, "on/off"), 
	                                React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                              ), 
	                               React.createElement("tr", null, 
	                                React.createElement("td", null, "1"), 
	                                React.createElement("td", null, "Mother’s Day"), 
	                                React.createElement("td", null, "27/10/2015"), 
	                                React.createElement("td", null, "4"), 
	                                React.createElement("td", null, "$57"), 
	                                React.createElement("td", null, "$200"), 
	                                React.createElement("td", null, "on/off"), 
	                                React.createElement("td", {className: "text-center"}, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info center-block"}, "Info"), ' ')
	                              )

	                            )

	                          )
	                        )
	                      )
	                    )
	                  )
	                )
	              )
	            )
	          )
	        )
	      )
	    );
	  }
	});

	var classSet = React.addons.classSet;
	var Tablesaw = __HUA.createClass({displayName: "Tablesaw",
	  mixins: [SidebarMixin],
	  render: function() {
	    var classes = classSet({
	      'container-open': this.state.open
	    });
	    return (
	      React.createElement(Container, {id: "container", className: classes}, 
	        React.createElement(Sidebar, null), 
	        React.createElement(Header, null), 
	        React.createElement(Body, null), 
	        React.createElement(Footer, null)
	      )
	    );
	  }
	});



	module.exports = Tablesaw;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __HUA = (function () { var React = __webpack_require__(2); var getHotUpdateAPI = __webpack_require__(3); return getHotUpdateAPI(React, "campaigns.jsx", module.id); })(); if (false) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "campaigns.jsx" + ": " + err.message); } }); module.hot.dispose(function () { var nextTick = require("/Users/George/Desktop/TT_rubix-reactjs/node_modules/react-hot-loader/node_modules/next-tick/index.js"); nextTick(__HUA.updateMountedInstances); }); }

	var Header = __webpack_require__(8);
	var Sidebar = __webpack_require__(9);
	var Footer = __webpack_require__(10);

	var Body = __HUA.createClass({displayName: "Body",
	  componentDidMount: function() {
	    $('#example')
	      .addClass('nowrap')
	      .dataTable({
	        responsive: true,
	        columnDefs: [
	          { targets: [-1, -5], className: 'dt-body-right' }
	        ]
	    });
	    var table = $('#example').DataTable();

	   $('#example tbody').on( 'click', 'tr', function () {
	       if ( $(this).hasClass('selected') ) {
	           $(this).removeClass('selected');
	       }
	       else {
	           table.$('tr.selected').removeClass('selected');
	           $(this).addClass('selected');
	       }
	   } );

	   $('#button').click( function () {
	       table.row('.selected').remove().draw( false );
	   } );



	  },
	  gold: function() {
	    e.preventDefault();
	    e.stopPropagation();
	    this.transitionTo('/app/invoice');
	  },
	  getModal: function() {
	    return (
	      React.createElement(Modal, null, 
	        React.createElement(ModalHeader, null, 
	          React.createElement(Button, {onClick: ModalManager.remove, onTouchEnd: ModalManager.remove, close: true}), 
	          React.createElement("h4", {className: "modal-title"}, "Packages")
	        ), 
	        React.createElement(ModalBody, null, 
	          React.createElement("p", null, "What package do you prefer")
	        ), 
	        React.createElement(ModalFooter, {onClick: ModalManager.remove, onTouchEnd: ModalManager.remove}, 
	          React.createElement(Link, {to: "/app/assets/upload", style: {border:0}}, React.createElement(Button, {bsStyle: "primary", style: { marginRight:15}}, "Standart")), 
	          React.createElement("span", null, "or"), 
	          React.createElement(Link, {to: "/app/assets/upload", style: {border:0}}, React.createElement(Button, {bsStyle: "danger", style: {borderRadius:8,  marginLeft:15}}, "Gold"))
	        )
	      )
	    );
	  },

	  render: function() {
	    return (
	      React.createElement(Container, {id: "body"}, 
	        React.createElement(Grid, null, 
	          React.createElement(Row, null, 
	            React.createElement(Col, {xs: 12}, 
	              React.createElement(PanelContainer, {noControls: true}, 
	                React.createElement(Panel, null, 
	                  React.createElement(PanelBody, null, 
	                    React.createElement(Grid, null, 
	                      React.createElement(Row, null, 
	                        React.createElement(Col, {xs: 12}, 
	                          React.createElement("div", {className: "text-right"}, 
	                              React.createElement(Button, {lg: true, style: {margin: 15, borderRadius:3}, bsStyle: "warning", id: "button-click", onClick: ModalManager.create.bind(this, this.getModal()), onTouchEnd: ModalManager.create.bind(this, this.getModal())}, "Create Campaign")

	                        )
	                      ), 
	                        React.createElement(Col, {xs: 12}, 
	                          React.createElement(Table, {id: "example", className: "display", cellSpacing: "0", width: "100%"}, 
	                          React.createElement("thead", null, 
	                            React.createElement("tr", null, 
	                              React.createElement("th", null, "ID"), 
	                              React.createElement("th", null, "Campagn Name"), 
	                              React.createElement("th", null, "End Date"), 
	                              React.createElement("th", null, "Number of times played"), 
	                              React.createElement("th", null, "Total Spent"), 
	                              React.createElement("th", null, "Max Budget"), 
	                              React.createElement("th", null, "Active (ON/OFF)"), 
	                              React.createElement("th", null, "View")
	                            )
	                          ), 
	                          React.createElement("tbody", null, 
	                            React.createElement("tr", null, 
	                              React.createElement("td", null, "1"), 
	                              React.createElement("td", null, "Xmas"), 
	                              React.createElement("td", null, "27/10/2015"), 
	                              React.createElement("td", null, "4"), 
	                              React.createElement("td", null, "$57"), 
	                              React.createElement("td", null, "$200"), 
	                              React.createElement("td", null, "on/off"), 
	                              React.createElement("td", null, 
	                                React.createElement(Link, {to: "/app/zones"}, 
	                                  React.createElement(Button, {sm: true, style: {marginBottom: 5}, bsStyle: "info pull-right next"}, "info"), ' '
	                                )
	                              )
	                            ), 
	                            React.createElement("tr", null, 
	                              React.createElement("td", null, "2"), 
	                              React.createElement("td", null, "Summer"), 
	                              React.createElement("td", null, "2/10/2015"), 
	                              React.createElement("td", null, "1"), 
	                              React.createElement("td", null, "$10"), 
	                              React.createElement("td", null, "$225"), 
	                              React.createElement("td", null, "on/off"), 
	                              React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                            ), 
	                            React.createElement("tr", null, 
	                              React.createElement("td", null, "3"), 
	                              React.createElement("td", null, "Independence day"), 
	                              React.createElement("td", null, "27/8/2015"), 
	                              React.createElement("td", null, "15"), 
	                              React.createElement("td", null, "$200"), 
	                              React.createElement("td", null, "$1000"), 
	                              React.createElement("td", null, "on/off"), 
	                              React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                            ), 
	                            React.createElement("tr", null, 
	                              React.createElement("td", null, "4"), 
	                              React.createElement("td", null, "Halloween"), 
	                              React.createElement("td", null, "5/4/2015"), 
	                              React.createElement("td", null, "7"), 
	                              React.createElement("td", null, "$150"), 
	                              React.createElement("td", null, "$210"), 
	                              React.createElement("td", null, "on/off"), 
	                              React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                            ), 
	                             React.createElement("tr", null, 
	                              React.createElement("td", null, "5"), 
	                              React.createElement("td", null, "The Christmas Feast and Santa Claus"), 
	                              React.createElement("td", null, "27/10/2015"), 
	                              React.createElement("td", null, "4"), 
	                              React.createElement("td", null, "$57"), 
	                              React.createElement("td", null, "$200"), 
	                              React.createElement("td", null, "on/off"), 
	                              React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                            ), 
	                            React.createElement("tr", null, 
	                              React.createElement("td", null, "1"), 
	                              React.createElement("td", null, "public holidays"), 
	                              React.createElement("td", null, "27/10/2015"), 
	                              React.createElement("td", null, "4"), 
	                              React.createElement("td", null, "$57"), 
	                              React.createElement("td", null, "$200"), 
	                              React.createElement("td", null, "on/off"), 
	                              React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                            ), 
	                            React.createElement("tr", null, 
	                              React.createElement("td", null, "1"), 
	                              React.createElement("td", null, "Mother’s Day"), 
	                              React.createElement("td", null, "27/10/2015"), 
	                              React.createElement("td", null, "4"), 
	                              React.createElement("td", null, "$57"), 
	                              React.createElement("td", null, "$200"), 
	                              React.createElement("td", null, "on/off"), 
	                              React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                            ), 
	                             React.createElement("tr", null, 
	                              React.createElement("td", null, "1"), 
	                              React.createElement("td", null, "spring"), 
	                              React.createElement("td", null, "27/10/2015"), 
	                              React.createElement("td", null, "4"), 
	                              React.createElement("td", null, "$57"), 
	                              React.createElement("td", null, "$200"), 
	                              React.createElement("td", null, "on/off"), 
	                              React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                            ), 
	                             React.createElement("tr", null, 
	                              React.createElement("td", null, "1"), 
	                              React.createElement("td", null, "Winter"), 
	                              React.createElement("td", null, "27/10/2015"), 
	                              React.createElement("td", null, "4"), 
	                              React.createElement("td", null, "$57"), 
	                              React.createElement("td", null, "$200"), 
	                              React.createElement("td", null, "on/off"), 
	                              React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                            ), 
	                             React.createElement("tr", null, 
	                              React.createElement("td", null, "1"), 
	                              React.createElement("td", null, "autumn"), 
	                              React.createElement("td", null, "27/10/2015"), 
	                              React.createElement("td", null, "4"), 
	                              React.createElement("td", null, "$57"), 
	                              React.createElement("td", null, "$200"), 
	                              React.createElement("td", null, "on/off"), 
	                              React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                            ), 
	                             React.createElement("tr", null, 
	                              React.createElement("td", null, "1"), 
	                              React.createElement("td", null, "Christmas"), 
	                              React.createElement("td", null, "27/10/2015"), 
	                              React.createElement("td", null, "4"), 
	                              React.createElement("td", null, "$57"), 
	                              React.createElement("td", null, "$200"), 
	                              React.createElement("td", null, "on/off"), 
	                              React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                            ), 
	                             React.createElement("tr", null, 
	                              React.createElement("td", null, "1"), 
	                              React.createElement("td", null, "Summer"), 
	                              React.createElement("td", null, "27/10/2015"), 
	                              React.createElement("td", null, "4"), 
	                              React.createElement("td", null, "57$"), 
	                              React.createElement("td", null, "$200"), 
	                              React.createElement("td", null, "on/off"), 
	                              React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info"}, "Info"), ' ')
	                            ), 
	                             React.createElement("tr", null, 
	                              React.createElement("td", null, "1"), 
	                              React.createElement("td", null, "Mother’s Day"), 
	                              React.createElement("td", null, "27/10/2015"), 
	                              React.createElement("td", null, "4"), 
	                              React.createElement("td", null, "$57"), 
	                              React.createElement("td", null, "$200"), 
	                              React.createElement("td", null, "on/off"), 
	                              React.createElement("td", {className: "text-center"}, React.createElement(Button, {sm: true, outlined: true, style: {marginBottom: 5}, bsStyle: "info center-block"}, "Info"), ' ')
	                            )

	                          )
	                          ), 
	                          React.createElement("br", null), 
	                            React.createElement(Button, {sm: true, style: {margin: 15, borderRadius:3}, id: "button", bsStyle: "danger"}, "delete campagn")
	                        )
	                      )
	                    )
	                  )
	                )
	              )
	            )
	          )
	        )
	      )
	    );
	  }
	});

	var classSet = React.addons.classSet;
	var BootstrapTables = __HUA.createClass({displayName: "BootstrapTables",
	  mixins: [SidebarMixin],
	  render: function() {
	    var classes = classSet({
	      'container-open': this.state.open
	    });
	    return (
	      React.createElement(Container, {id: "container", className: classes}, 
	        React.createElement(Sidebar, null), 
	        React.createElement(Header, null), 
	        React.createElement(Body, null), 
	        React.createElement(Footer, null)
	      )
	    );
	  }
	});

	module.exports = BootstrapTables;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __HUA = (function () { var React = __webpack_require__(2); var getHotUpdateAPI = __webpack_require__(3); return getHotUpdateAPI(React, "zones.jsx", module.id); })(); if (false) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "zones.jsx" + ": " + err.message); } }); module.hot.dispose(function () { var nextTick = require("/Users/George/Desktop/TT_rubix-reactjs/node_modules/react-hot-loader/node_modules/next-tick/index.js"); nextTick(__HUA.updateMountedInstances); }); }

	var Header = __webpack_require__(8);
	var Sidebar = __webpack_require__(9);
	var Footer = __webpack_require__(10);

	var MapContainer = __HUA.createClass({displayName: "MapContainer",
	  render: function() {
	    return (
	      React.createElement(PanelContainer, {noControls: true}, 
	        React.createElement(Panel, null, 
	          React.createElement(PanelBody, {style: {padding: 25}}, 
	            React.createElement("h4", {className: "text-center", style: {marginTop: 0}}, this.props.name), 
	            this.props.children, 
	            React.createElement("div", {id: this.props.id, style: {height: 450}})
	          )
	        )
	      )
	    );
	  }
	});

	var Body = __HUA.createClass({displayName: "Body",
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
	      React.createElement(Container, {id: "body", noControls: true}, 
	        React.createElement(Grid, null, 
	          React.createElement(Row, null, 
	            React.createElement(Col, {sm: 12, collapseRight: true}, 
	              React.createElement(MapContainer, {id: "markers", name: "Create Zone"})
	            )
	          ), 
	          React.createElement(PanelContainer, null, 
	            React.createElement(Panel, null, 
	              React.createElement(PanelBody, null, 
	                React.createElement(Grid, null, 
	                  React.createElement(Row, null, 
	                    React.createElement(Col, {xs: 12}, 
	                      React.createElement("h4", {style: {marginTop: 0}}, "Hover table"), 
	                      React.createElement(Table, {hover: true}, 
	                        React.createElement("thead", null, 
	                          React.createElement("tr", null, 
	                            React.createElement("th", null, "Location"), 
	                            React.createElement("th", null, "Radius"), 
	                            React.createElement("th", null, "Max Bid"), 
	                            React.createElement("th", null, "Times"), 
	                            React.createElement("th", null, "Days"), 
	                            React.createElement("th", null, "Edit"), 
	                            React.createElement("th", null, "Check")
	                          )
	                        ), 
	                        React.createElement("tbody", null, 
	                          React.createElement("tr", null, 
	                            React.createElement("td", null, "Zone 1"), 
	                            React.createElement("td", null, "100"), 
	                            React.createElement("td", null, "0.2$"), 
	                            React.createElement("td", null, 
	                              React.createElement("a", {href: "#", key: this.state.refresh, className: "times", "data-type": "select2", "data-placement": "left", "data-pk": "1", "data-title": "Enter tags"}, "12:00 - 18:00")
	                            ), 
	                            React.createElement("td", null, 
	                              React.createElement("a", {href: "#", key: this.state.refresh, className: "days", "data-type": "select2", "data-placement": "left", "data-pk": "1", "data-title": "Enter tags"}, "Monday, Friday")
	                            ), 
	                            React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, bsStyle: "green", onClick: this.toggleEditable}, "Edit")), 
	                            React.createElement("td", null, 
	                              React.createElement(Checkbox, {value: "option1", name: "checkbox-options"})
	                            )
	                          ), 
	                          React.createElement("tr", null, 
	                            React.createElement("td", null, "Zone 2"), 
	                            React.createElement("td", null, "50"), 
	                            React.createElement("td", null, "0.8$"), 
	                            React.createElement("td", null, 
	                              React.createElement("a", {href: "#", key: this.state.refresh, className: "times", "data-type": "select2", "data-placement": "left", "data-pk": "1", "data-title": "Enter tags"}, "12:00 - 18:00")
	                            ), 
	                            React.createElement("td", null, 
	                              React.createElement("a", {href: "#", key: this.state.refresh, className: "days", "data-type": "select2", "data-placement": "left", "data-pk": "1", "data-title": "Enter tags"}, "Monday")
	                            ), 
	                            React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, bsStyle: "green", onClick: this.toggleEditable}, "Edit")), 
	                            React.createElement("td", null, 
	                              React.createElement(Checkbox, {value: "option1", name: "checkbox-options"})
	                            )
	                          ), 
	                          React.createElement("tr", null, 
	                            React.createElement("td", null, "Zone 3"), 
	                            React.createElement("td", null, "70"), 
	                            React.createElement("td", null, "0.9$"), 
	                            React.createElement("td", null, 
	                              React.createElement("a", {href: "#", key: this.state.refresh, className: "times", "data-type": "select2", "data-placement": "left", "data-pk": "1", "data-title": "Enter tags"}, "12:00 - 18:00")
	                            ), 
	                            React.createElement("td", null, 
	                              React.createElement("a", {href: "#", key: this.state.refresh, className: "days", "data-type": "select2", "data-placement": "left", "data-pk": "1", "data-title": "Enter tags"}, "Tursday, Monday")
	                            ), 
	                            React.createElement("td", null, React.createElement(Button, {sm: true, outlined: true, bsStyle: "green", onClick: this.toggleEditable}, "Edit")), 
	                            React.createElement("td", null, 
	                              React.createElement(Checkbox, {value: "option1", name: "checkbox-options"})
	                            )
	                          )
	                        )
	                      )
	                    )
	                  ), 
	                  React.createElement(Row, null, 
	                    React.createElement(Col, {xs: 12}, 
	                      React.createElement(Link, {to: "/app/time"}, 
	                        React.createElement(Button, {lg: true, style: {marginBottom: 5}, bsStyle: "success pull-right next"}, "next"), ' '
	                      )
	                    )
	                  )
	                )
	              )
	            )
	          )
	        )
	      )
	    );
	  }
	});

	var classSet = React.addons.classSet;
	var MorrisJSPage = __HUA.createClass({displayName: "MorrisJSPage",
	  mixins: [SidebarMixin],
	  render: function() {
	    var classes = classSet({
	      'container-open': this.state.open
	    });
	    return (
	      React.createElement(Container, {id: "container", className: classes}, 
	        React.createElement(Sidebar, null), 
	        React.createElement(Header, null), 
	        React.createElement(Body, null), 
	        React.createElement(Footer, null)
	      )
	    );
	  }
	});

	module.exports = MorrisJSPage;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __HUA = (function () { var React = __webpack_require__(2); var getHotUpdateAPI = __webpack_require__(3); return getHotUpdateAPI(React, "time.jsx", module.id); })(); if (false) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "time.jsx" + ": " + err.message); } }); module.hot.dispose(function () { var nextTick = require("/Users/George/Desktop/TT_rubix-reactjs/node_modules/react-hot-loader/node_modules/next-tick/index.js"); nextTick(__HUA.updateMountedInstances); }); }

	var Header = __webpack_require__(8);
	var Sidebar = __webpack_require__(9);
	var Footer = __webpack_require__(10);

	var ReactStyle = __webpack_require__(23);

	var Contact = __HUA.createClass({displayName: "Contact",
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
	      React.createElement("tr", null, 
	        React.createElement("td", {style: {verticalAlign: 'middle', borderTop: this.props.noBorder ? 'none': null}}, 
	          React.createElement("img", {src: '/imgs/avatars/'+this.props.avatar+'.png'})
	        ), 
	        React.createElement("td", {style: {verticalAlign: 'middle', borderTop: this.props.noBorder ? 'none': null}}, 
	          this.props.name
	        ), 
	        React.createElement("td", {style: {verticalAlign: 'middle', borderTop: this.props.noBorder ? 'none': null}, className: "text-right"}, 
	          React.createElement(Button, {onlyOnHover: true, bsStyle: "orange", active: this.state.invited, onClick: this.handleClick}, 
	            this.state.invitedText
	          )
	        )
	      )
	    );
	  }
	});

	var Body = __HUA.createClass({displayName: "Body",
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
	      min: 20,
	      max: 5000,
	      type: 'single',
	      step: 20,
	      postfix: ' $',
	      prettify: true,
	      hasGrid: true
	    });
	  },


	 render: function() {
	   return (
	     React.createElement(Container, {id: "body"}, 
	       React.createElement(Grid, null, 
	         React.createElement(Row, null, 
	         React.createElement(PanelHeader, {className: "bg-green fg-white"}, 
	           React.createElement(Grid, null, 
	             React.createElement(Row, null, 
	               React.createElement(Col, {xs: 12}, 
	                 React.createElement("h3", null, "Time")
	               )
	             )
	           )
	         ), 
	           React.createElement(Grid, null, 
	           React.createElement(Col, {sm: 12}, 
	             React.createElement(PanelContainer, {noControls: true}, 
	               React.createElement(Panel, {horizontal: true, className: "force-collapse"}, 
	                 React.createElement(PanelBody, {className: "panel-sm-7", style: {padding: 0}}, 
	                   React.createElement(Col, {sm: 6, style: {paddingTop: 15}}, 
	                    React.createElement("h3", null, "max budget"), 
	                    React.createElement("div", null, 
	                      React.createElement(Input, {type: "text", id: "example_3", ref: "example_3"})
	                    )
	                   ), 
	                   React.createElement(Col, {sm: 6}, 
	                     React.createElement(InputGroup, {className: "date", ref: "datetimepicker1"}, 
	                       React.createElement(Input, {type: "text", className: "form-control"}), 
	                       React.createElement(InputGroupAddon, null, 
	                         React.createElement(Icon, {glyph: "icon-fontello-calendar"})
	                       )
	                     ), 
	                     React.createElement("div", null, 
	                       React.createElement("h3", null, "End Date"), 
	                       React.createElement("div", {id: "datetimepicker1-parent", 
	                            className: "datetimepicker-inline"}
	                       )
	                     )
	                   ), 
	                     React.createElement(Col, {xs: 12}, 
	                       React.createElement(Link, {to: "/app/campaigns"}, 
	                         React.createElement(Button, {lg: true, style: {marginBottom: 5}, bsStyle: "success pull-right next"}, "FINISH"), ' '
	                       )
	                     )
	                 )
	               )
	             )
	           )

	           )
	         )
	       )
	     )
	   );
	 }

	 });

	var classSet = React.addons.classSet;
	var Time = __HUA.createClass({displayName: "Time",
	 mixins: [SidebarMixin],
	 render: function() {
	   var classes = classSet({
	     'dashboard': true,
	     'container-open': this.state.open
	   });
	   return (
	     React.createElement(Container, {id: "container", className: classes}, 
	       React.createElement(Sidebar, null), 
	       React.createElement(Header, null), 
	       React.createElement(Body, null), 
	       React.createElement(Footer, null)
	     )
	   );
	 }
	});

	module.exports = Time;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @providesModule ReactStyle
	 */

	var ReactStyleRules = __webpack_require__(24);
	var ReactStyleRulesManager = __webpack_require__(25);

	/**
	 * @constructor
	 */
	function ReactStyle() {
	  // Stylesheet has limits in Internet Explorer 8 and 9 so we need to
	  // shard style rules into several stylesheets.
	  // 1. A sheet may contain up to 4095 rules.
	  // 2. A sheet may @import up to 31 sheets
	  // See http://bit.ly/mARqBv
	  this._rulesManager = new ReactStyleRulesManager(4095, 31);
	  this._listenersMap = {};
	  this._changeEvent = {target: this, type: 'change'};
	}

	/**
	 * @param {object} rulesMap
	 * @return {ReactStyleRules}
	 */
	ReactStyle.prototype.create = function(rulesMap) {
	  return new ReactStyleRules(rulesMap);
	};

	/**
	 * @param {ReactStyleRules} styleRules
	 * @return {ReactStyle}
	 */
	ReactStyle.prototype.addRules = function(styleRules) {
	  if (this._rulesManager.addRules(styleRules)) {
	    this.dispatchEvent(this._changeEvent);
	  }
	  return this;
	};

	/**
	 * @return {array<object>}
	 */
	ReactStyle.prototype.renderToComponents = function() {
	  return this._rulesManager.renderToComponents();
	};

	/**
	 * Implements W3C {EventTarget} interface
	 * @param {string} type
	 * @param {function|EventListener}
	 */
	ReactStyle.prototype.addEventListener = function(type, listener) {
	  var listeners = this._listenersMap[type] || [];
	  if (listeners.indexOf(listener) < 0) {
	    listeners.push(listener);
	  }
	  this._listenersMap[type] = listeners;
	};

	/**
	 * Implements W3C {EventTarget} interface
	 * @param {string} type
	 * @param {function|EventListener}
	 */
	ReactStyle.prototype.removeEventListener = function(type, listener) {
	  var listeners = this._listenersMap[type];
	  if (listeners) {
	    var idx = listeners.indexOf(listener);
	    if (idx > -1) {
	      listener.splice(listener);
	    }
	  }
	};

	/**
	 * Implements W3C {EventTarget} interface
	 * @param {object} evt
	 * @return {boolean}
	 */
	ReactStyle.prototype.dispatchEvent = function(evt) {
	  var type = evt.type;
	  var listeners = this._listenersMap[type];
	  if (listeners) {
	    for (var i = 0, j = listeners.length; i < j; i++) {
	      var handler = listeners[i];
	      if (handler.handleEvent) {
	        handler.handleEvent.call(this, evt);
	      } else {
	        handler.call(this, evt);
	      }
	    }
	  }
	  return true;
	};


	// Export the singleton instance.
	module.exports = new ReactStyle();


/***/ },
/* 24 */
/***/ function(module, exports) {

	/**
	 * @providesModule ReactStyleRules
	 */

	'use strict'

	/**
	 * @type {RegExp}
	 */
	var CLASSNAME_SELECTOR_PATTERN = /(\.)([a-zA-Z_\-][a-zA-Z_\-\d]*)/ig;

	/**
	 * @type {RegExp}
	 */
	var HYPHENATE_PATTERN = /([a-z])([A-Z])/g;

	/**
	 * @type {number}
	 */
	var _namespaceID = 0;

	/**
	 * @param {object} rulesMap
	 * @constructor
	 */
	function ReactStyleRules(rulesMap) {
	  var namespace = '';
	  var i = 0;
	  var rules = [];
	  var replacer = namespaceReplacer.bind(null, this, namespace);
	  for (var selectors in rulesMap) {
	    var ruleText = namespacify(selectors, replacer) + '{';
	    var declarations = rulesMap[selectors];
	    for (var property in declarations) {
	      var value = declarations[property];
	      ruleText += hyphenate(property) + ':' + value + ';';
	    }
	    ruleText += '}';
	    rules[i] = ruleText.replace("\\", '');
	    i++;
	  }

	  this._rules = rules;
	  this._namespace = namespace;
	  this.length = rules.length;
	}

	/**
	 * @return {string}
	 */
	ReactStyleRules.prototype.toString = function() {
	  return this._rules.join('\n');
	};

	/**
	 * @param {string} str
	 * @param {string} newSubStr
	 * @return {string}
	 */
	function namespacify(str, newSubStr) {
	  return str.replace(CLASSNAME_SELECTOR_PATTERN, newSubStr);
	}

	/**
	 * @param {object} classNameMap
	 * @param {string} namespace
	 * @param {string} m1
	 * @param {string} m2
	 * @param {string} className
	 * @return {string}
	 */
	function namespaceReplacer(classNameMap, namespace, m1, m2, className) {
	  var newClassName = namespace + className;
	  classNameMap[className] = newClassName;
	  return '.\\' + newClassName;
	}

	/**
	 * @param {string} str
	 * @return {string}
	 */
	function hyphenate(str) {
	  return str.replace(HYPHENATE_PATTERN, '$1-$2').toLowerCase();
	}

	module.exports = ReactStyleRules;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @providesModule ReactStyleRulesManager
	 * @jsx React.DOM
	 */

	'use strict'

	var ReactStyleRules = __webpack_require__(24);

	/**
	 * @param {number} maxRulesLengthPerStyle
	 * @param {number} maxComponentsLength
	 * @constructor
	 */
	function ReactStyleRulesManager(maxRulesLengthPerStyle, maxComponentsLength) {
	  /**
	   * @type {array<ReactStyleRules>}
	   */
	  this._styleRulesList = [];

	  /**
	   * @type {number}
	   */
	  this._maxRulesLengthPerStyle = maxRulesLengthPerStyle;

	  /**
	   * @type {number}
	   */
	  this._maxComponentsLength = maxComponentsLength;
	}

	/**
	 * @param {ReactStyleRules} styleRules
	 * @return {boolean}
	 */
	ReactStyleRulesManager.prototype.addRules = function(styleRules) {
	  if (!styleRules || styleRules.constructor !== ReactStyleRules) {
	    throw new Error('Invalid rules');
	  }
	  var styleRulesList = this._styleRulesList;
	  for (var i = 0, j = styleRulesList.lenth; i < j; i++) {
	    var anotherReactStyleRules = styleRulesList[i];
	    if (anotherReactStyleRules === styleRules) {
	      return false;
	    }
	  }
	  styleRulesList.push(styleRules);
	  return true;
	};


	/**
	 * @return {array<object>}
	 */
	ReactStyleRulesManager.prototype.renderToComponents = function() {
	  var styleRulesList = this._styleRulesList;
	  var components = [];
	  var cssText = '';
	  var rulesCount = 0;
	  var index = 0;
	  var maxRulesLengthPerStyle = this._maxRulesLengthPerStyle;
	  var maxComponentsLength = this._maxComponentsLength;

	  for (var i = 0, j = styleRulesList.length; i < j; i++) {
	    var styleRules = styleRulesList[i];
	    var newRulesCount = rulesCount + styleRules.length;
	    if (newRulesCount > maxRulesLengthPerStyle) {
	      if (cssText) {
	        components.push(
	          React.createElement("style", {
	            key: 's' + (index++), 
	            dangerouslySetInnerHTML: {__html: cssText}}
	          )
	        );
	        cssText = '';
	        rulesCount = 0;
	      }
	    } else {
	      rulesCount = newRulesCount;
	      cssText += styleRules.toString();
	    }
	  }

	  if (cssText) {
	    components.push(
	      React.createElement("style", {
	        key: 's' + (index++), 
	        dangerouslySetInnerHTML: {__html: cssText}}
	      )
	    );
	    cssText = null;
	  }

	  if (components.lenth > maxComponentsLength) {
	    throw new Error('Too many styles');
	  }

	  return components;
	}

	module.exports = ReactStyleRulesManager;



/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var __HUA = (function () { var React = __webpack_require__(2); var getHotUpdateAPI = __webpack_require__(3); return getHotUpdateAPI(React, "map.jsx", module.id); })(); if (false) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "map.jsx" + ": " + err.message); } }); module.hot.dispose(function () { var nextTick = require("/Users/George/Desktop/TT_rubix-reactjs/node_modules/react-hot-loader/node_modules/next-tick/index.js"); nextTick(__HUA.updateMountedInstances); }); }

	var Header = __webpack_require__(8);
	var Sidebar = __webpack_require__(9);
	var Footer = __webpack_require__(10);

	var MapContainer = __HUA.createClass({displayName: "MapContainer",
	  render: function() {
	    return (
	      React.createElement(PanelContainer, {noControls: true}, 
	        React.createElement(Panel, null, 
	          React.createElement(PanelBody, {style: {padding: 5}}, 
	            React.createElement("h4", {className: "text-center", style: {marginTop: 0}}, this.props.name), 
	            this.props.children, 
	            React.createElement("div", {id: this.props.id, style: {height: 600}})
	          )
	        )
	      )
	    );
	  }
	});

	var Body = __HUA.createClass({displayName: "Body",
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

	      map.addMarker({
	        lat: -12.043833,
	        lng: -77.029333,
	        title: 'Lima',
	        infoWindow: {
	          content: '<p>Some content here!</p>'
	        }
	      });

	      map.addMarker({
	        lat: -12.043833,
	        lng: -77.031333,
	        title: 'Lima',
	        infoWindow: {
	          content: '<p>Some content here!</p>'
	        }
	      });

	    })();

	  },

	  render: function() {
	    return (
	      React.createElement(Container, {id: "body"}, 
	        React.createElement(Grid, null, 
	          React.createElement(PanelContainer, {noControls: true}, 
	            React.createElement(Panel, null, 
	              React.createElement(PanelBody, null, 
	                React.createElement(Grid, null, 
	                  React.createElement(Row, null, 
	                    React.createElement(Col, {sm: 12}, 
	                      React.createElement(MapContainer, {id: "markers", name: "Live streaming"})
	                    )
	                  )
	                )
	              )
	            )
	          )
	        )
	      )
	    );
	  }
	});

	var classSet = React.addons.classSet;
	var MorrisJSPage = __HUA.createClass({displayName: "MorrisJSPage",
	  mixins: [SidebarMixin],
	  render: function() {
	    var classes = classSet({
	      'container-open': this.state.open
	    });
	    return (
	      React.createElement(Container, {id: "container", className: classes}, 
	        React.createElement(Sidebar, null), 
	        React.createElement(Header, null), 
	        React.createElement(Body, null), 
	        React.createElement(Footer, null)
	      )
	    );
	  }
	});

	module.exports = MorrisJSPage;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __HUA = (function () { var React = __webpack_require__(2); var getHotUpdateAPI = __webpack_require__(3); return getHotUpdateAPI(React, "morris.jsx", module.id); })(); if (false) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "morris.jsx" + ": " + err.message); } }); module.hot.dispose(function () { var nextTick = require("/Users/George/Desktop/TT_rubix-reactjs/node_modules/react-hot-loader/node_modules/next-tick/index.js"); nextTick(__HUA.updateMountedInstances); }); }

	var Header = __webpack_require__(8);
	var Sidebar = __webpack_require__(9);
	var Footer = __webpack_require__(10);

	var ChartContainer = __HUA.createClass({displayName: "ChartContainer",
	  render: function() {
	    return (
	      React.createElement(PanelContainer, {noOverflow: true}, 
	        React.createElement(Panel, null, 
	          React.createElement(PanelBody, {style: {padding: 25}, className: "text-center"}, 
	            React.createElement("h4", null, this.props.name), 
	            React.createElement("div", {id: this.props.id})
	          )
	        )
	      )
	    );
	  }
	});

	var Body = __HUA.createClass({displayName: "Body",
	  componentDidMount: function() {
	    (function() {
	      // data stolen from http://howmanyleft.co.uk/vehicle/jaguar_'e'_type
	      var tax_data = [
	           {"period": "2011 Q3", "licensed": 3407, "sorned": 660},
	           {"period": "2011 Q2", "licensed": 3351, "sorned": 629},
	           {"period": "2011 Q1", "licensed": 3269, "sorned": 618},
	           {"period": "2010 Q4", "licensed": 3246, "sorned": 661},
	           {"period": "2009 Q4", "licensed": 3171, "sorned": 676},
	           {"period": "2008 Q4", "licensed": 3155, "sorned": 681},
	           {"period": "2007 Q4", "licensed": 3226, "sorned": 620},
	           {"period": "2006 Q4", "licensed": 3245, "sorned": null},
	           {"period": "2005 Q4", "licensed": 3289, "sorned": null}
	      ];
	      Morris.Line({
	        element: 'hero-graph',
	        data: tax_data,
	        xkey: 'period',
	        ykeys: ['licensed', 'sorned'],
	        labels: ['Licensed', 'Off the road']
	      });

	      Morris.Donut({
	        element: 'hero-donut',
	        data: [
	          {label: 'Jam', value: 25 },
	          {label: 'Frosted', value: 40 },
	          {label: 'Custard', value: 25 },
	          {label: 'Sugar', value: 10 }
	        ],
	        formatter: function (y) { return y + "%" }
	      });

	      Morris.Area({
	        element: 'hero-area',
	        data: [
	          {period: '2010 Q1', iphone: 2666, ipad: null, itouch: 2647},
	          {period: '2010 Q2', iphone: 2778, ipad: 2294, itouch: 2441},
	          {period: '2010 Q3', iphone: 4912, ipad: 1969, itouch: 2501},
	          {period: '2010 Q4', iphone: 3767, ipad: 3597, itouch: 5689},
	          {period: '2011 Q1', iphone: 6810, ipad: 1914, itouch: 2293},
	          {period: '2011 Q2', iphone: 5670, ipad: 4293, itouch: 1881},
	          {period: '2011 Q3', iphone: 4820, ipad: 3795, itouch: 1588},
	          {period: '2011 Q4', iphone: 15073, ipad: 5967, itouch: 5175},
	          {period: '2012 Q1', iphone: 10687, ipad: 4460, itouch: 2028},
	          {period: '2012 Q2', iphone: 8432, ipad: 5713, itouch: 1791}
	        ],
	        xkey: 'period',
	        ykeys: ['iphone', 'ipad', 'itouch'],
	        labels: ['iPhone', 'iPad', 'iPod Touch'],
	        pointSize: 2,
	        hideHover: 'auto'
	      });

	      Morris.Bar({
	        element: 'hero-bar',
	        data: [
	          {device: 'iPhone', geekbench: 136},
	          {device: 'iPhone 3G', geekbench: 137},
	          {device: 'iPhone 3GS', geekbench: 275},
	          {device: 'iPhone 4', geekbench: 380},
	          {device: 'iPhone 4S', geekbench: 655},
	          {device: 'iPhone 5', geekbench: 1571}
	        ],
	        xkey: 'device',
	        ykeys: ['geekbench'],
	        labels: ['Geekbench'],
	        barRatio: 0.4,
	        xLabelAngle: 35,
	        hideHover: 'auto'
	      });
	    })();
	  },
	  render: function() {
	    return (
	      React.createElement(Container, {id: "body"}, 
	        React.createElement(Grid, null, 
	          React.createElement(Row, null, 
	            React.createElement(Col, {sm: 6, collapseRight: true}, 
	              React.createElement(ChartContainer, {id: "hero-graph", name: "Jaguar 'E' Type vehicles in the UK"}), 
	              React.createElement(ChartContainer, {id: "hero-area", name: "Quarterly Apple iOS device unit sales"})
	            ), 
	            React.createElement(Col, {sm: 6}, 
	              React.createElement(ChartContainer, {id: "hero-bar", name: "iPhone CPU benchmarks"}), 
	              React.createElement(ChartContainer, {id: "hero-donut", name: "Donut Flavours"})
	            )
	          )
	        )
	      )
	    );
	  }
	});

	var classSet = React.addons.classSet;
	var MorrisJSPage = __HUA.createClass({displayName: "MorrisJSPage",
	  mixins: [SidebarMixin],
	  render: function() {
	    var classes = classSet({
	      'container-open': this.state.open
	    });
	    return (
	      React.createElement(Container, {id: "container", className: classes}, 
	        React.createElement(Sidebar, null), 
	        React.createElement(Header, null), 
	        React.createElement(Body, null), 
	        React.createElement(Footer, null)
	      )
	    );
	  }
	});

	module.exports = MorrisJSPage;


/***/ }
/******/ ]);
})();