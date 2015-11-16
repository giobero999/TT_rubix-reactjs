/*! rubix - v2.3.0 - 2015-11-13 [copyright: SketchPixy LLP, email: support@sketchpixy.com] */
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

	/* APP PAGES */
	var login = __webpack_require__(11);
	var signup = __webpack_require__(12);
	var profile = __webpack_require__(13);
	var blank = __webpack_require__(14);
	var upload = __webpack_require__(15);
	var crop = __webpack_require__(16);

	var campaigns = __webpack_require__(17);
	var zones = __webpack_require__(18);

	/* ROUTES */
	module.exports = (
	  React.createElement(Route, {handler: ReactRouter.RouteHandler}, 
	    React.createElement(DefaultRoute, {handler: blank}), 
	    React.createElement(Route, {path: "/", handler: blank}), 
	    React.createElement(NotFoundRoute, {handler: notfound}), 
	    React.createElement(Route, {path: "/app/campaigns", handler: campaigns}), 
	    React.createElement(Route, {path: "/app/profile", handler: profile}), 
	    React.createElement(Route, {path: "/app/upload", handler: upload}), 
	    React.createElement(Route, {path: "/app/zones", handler: zones}), 
	    React.createElement(Route, {path: "/app/crop", handler: crop}), 
	    React.createElement(Route, {path: "/app/login", handler: login}), 
	    React.createElement(Route, {path: "/app/signup", handler: signup})


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
	                React.createElement(SidebarNavItem, {glyph: "icon-feather-share", name: "Profile", href: "/app/profile"}), 
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
	                  React.createElement(SidebarNavItem, {href: "/app/campaigns", glyph: "icon-fontello-th-2", name: "Campaigns"})
	                ), 
	                React.createElement(SidebarNav, {style: {marginBottom: 0}}, 
	                  React.createElement(SidebarNavItem, {glyph: "icon-feather-mail", name: React.createElement("span", null, "files")}, 
	                    React.createElement(SidebarNav, null, 
	                      React.createElement(SidebarNavItem, {href: "/app/upload", glyph: "icon-stroke-gap-icons-Download", name: "Upload Files"}), 
	                      React.createElement(SidebarNavItem, {href: "/app/crop", glyph: "icon-ikons-crop", name: "Cropping"})
	                    )
	                  ), 
	                    React.createElement(SidebarNavItem, {href: "/app/zones", glyph: "icon-ikons-pin-2", name: "Zones"})
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
	            React.createElement(DummySidebar, null)
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
	              React.createElement("div", null, "© 2014 SketchPixy Creative - v", this.state.version)
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

	var __HUA = (function () { var React = __webpack_require__(2); var getHotUpdateAPI = __webpack_require__(3); return getHotUpdateAPI(React, "login.jsx", module.id); })(); if (false) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "login.jsx" + ": " + err.message); } }); module.hot.dispose(function () { var nextTick = require("/Users/George/Desktop/TT_rubix-reactjs/node_modules/react-hot-loader/node_modules/next-tick/index.js"); nextTick(__HUA.updateMountedInstances); }); }

	var Header = __webpack_require__(8);
	var Sidebar = __webpack_require__(9);
	var Footer = __webpack_require__(10);

	var Body = __HUA.createClass({displayName: "Body",
	  mixins: [ReactRouter.State, ReactRouter.Navigation],
	  back: function(e) {
	    e.preventDefault();
	    e.stopPropagation();
	    this.transitionTo('/app/invoice');
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
	                                              className: "login"

	                                            }, 
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
/* 12 */
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
/* 13 */
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
	            React.createElement("h1", {className: "fg-white"}, "Empire State, NY, USA"), 
	            React.createElement("h5", {className: "fg-white", style: {opacity: 0.8}}, "- Aug 20th, 2014"), 
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
	          React.createElement("h4", {className: "fg-white text-center"}, "Anna Sanchez"), 
	          React.createElement("h5", {className: "fg-white text-center", style: {opacity: 0.8}}, "DevOps Engineer, NY"), 
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
	    (function() {
	      // create a map in the "map" div, set the view to a given place and zoom
	      var map = L.map('map', {
	        scrollWheelZoom: false
	      }).setView([40.7127, -74.0059], 16);

	      // add an OpenStreetMap tile layer
	      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	      }).addTo(map);

	      // add a marker in the given location, attach some popup content to it and open the popup
	      L.marker([40.7127, -74.0059]).addTo(map)
	          .openPopup();
	    })();
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
	            React.createElement(Col, {sm: 6, collapseRight: true}, 
	              React.createElement(PanelContainer, null, 
	                React.createElement(PanelBody, {style: {padding: 12.5}}, 
	                  React.createElement(Textarea, {rows: "3", placeholder: "What's on your mind?", style: {border: 'none'}})
	                ), 
	                React.createElement(PanelFooter, {className: "fg-black75 bg-gray", style: {padding: '12.5px 25px'}}, 
	                  React.createElement(Grid, null, 
	                    React.createElement(Row, null, 
	                      React.createElement(Col, {xs: 6, collapseLeft: true, collapseRight: true}, 
	                        React.createElement("a", {href: "#", style: {border: 'none'}}, React.createElement(Icon, {glyph: "icon-dripicons-location icon-1-and-quarter-x fg-text", style: {marginRight: 25}})), 
	                        React.createElement("a", {href: "#", style: {border: 'none'}}, React.createElement(Icon, {glyph: "icon-dripicons-camera icon-1-and-quarter-x fg-text", style: {marginRight: 25}})), 
	                        React.createElement("a", {href: "#", style: {border: 'none'}}, React.createElement(Icon, {glyph: "icon-dripicons-calendar icon-1-and-quarter-x fg-text", style: {marginRight: 25}}))
	                      ), 
	                      React.createElement(Col, {xs: 6, className: "text-right", collapseLeft: true, collapseRight: true}, 
	                        React.createElement(Button, {bsStyle: "darkgreen45"}, "send")
	                      )
	                    )
	                  )
	                )
	              ), 
	              React.createElement(PanelContainer, null, 
	                React.createElement(PanelBody, {style: {padding: 25, paddingTop: 12.5}}, 
	                  React.createElement("div", {className: "inbox-avatar"}, 
	                    React.createElement("img", {src: "/imgs/avatars/avatar7.png", width: "40", height: "40"}), 
	                    React.createElement("div", {className: "inbox-avatar-name"}, 
	                      React.createElement("div", {className: "fg-darkgrayishblue75"}, "Toby King"), 
	                      React.createElement("div", {className: "fg-text"}, React.createElement("small", null, "Wisconsin, USA"))
	                    ), 
	                    React.createElement("div", {className: "inbox-date hidden-sm hidden-xs fg-text text-right"}, 
	                      React.createElement("div", {style: {position: 'relative', top: 0}}, React.createElement(Icon, {glyph: "icon-fontello-anchor icon-1-and-quarter-x"})), 
	                      React.createElement("div", {style: {position: 'relative', top: -10}}, React.createElement("small", null, React.createElement("strong", null, "2 hours ago")))
	                    )
	                  ), 
	                  React.createElement("div", null, 
	                    React.createElement("div", {className: "fg-text"}, 
	                      "I'll be out of my mind and you'll be out of ideas pretty soon. So let's spend the afternoon in a cold hot air balloon. Leave your jacket behind. Lean out and touch the tree tops over town. I can't wait to kiss the ground wherever we touch back down."
	                    )
	                  ), 
	                  React.createElement("div", {style: {margin: -25, marginTop: 25}}, 
	                    React.createElement(Img, {responsive: true, src: "/imgs/gallery/tumblr_n8zm8ndGiY1st5lhmo1_1280.jpg"})
	                  )
	                ), 
	                React.createElement(PanelFooter, {noRadius: true, className: "fg-black75 bg-gray", style: {padding: '12.5px 25px', margin: 0}}, 
	                  React.createElement(Grid, {className: "fg-text"}, 
	                    React.createElement(Row, null, 
	                      React.createElement(Col, {xs: 6, collapseLeft: true, collapseRight: true}, 
	                        React.createElement("a", {href: "#", className: "fg-text", style: {border: 'none', marginRight: 25}}, React.createElement(Icon, {glyph: "icon-dripicons-thumbs-up icon-1-and-quarter-x"}), React.createElement("span", {style: {position: 'relative', top: -2, left: 3}}, "Like"))
	                      ), 
	                      React.createElement(Col, {xs: 6, className: "text-right", collapseLeft: true, collapseRight: true}, 
	                        React.createElement("span", {style: {top: 5, position: 'relative'}}, React.createElement("strong", null, "523"), " people like this")
	                      )
	                    )
	                  )
	                ), 
	                React.createElement(PanelFooter, {style: {padding: 25, paddingTop: 0, paddingBottom: 0}}, 
	                  React.createElement("div", {className: "inbox-avatar", style: {borderBottom: '1px solid #EAEDF1'}}, 
	                    React.createElement("img", {src: "/imgs/avatars/avatar0.png", width: "30", height: "30", style: {verticalAlign: 'top', top: 10, position: 'relative'}}), 
	                    React.createElement("div", {className: "inbox-avatar-name"}, 
	                      React.createElement("div", {className: "fg-darkgrayishblue75"}, "Anna Sanchez"), 
	                      React.createElement("div", {className: "fg-text"}, React.createElement("small", null, "Nice!"))
	                    ), 
	                    React.createElement("div", {className: "inbox-date hidden-sm hidden-xs fg-text text-right"}, 
	                      React.createElement("div", null, React.createElement("small", null, React.createElement("strong", null, "22 minutes ago")))
	                    )
	                  ), 
	                  React.createElement("div", {className: "inbox-avatar", style: {borderBottom: '1px solid #EAEDF1'}}, 
	                    React.createElement("img", {src: "/imgs/avatars/avatar9.png", width: "30", height: "30", style: {verticalAlign: 'top', top: 10, position: 'relative'}}), 
	                    React.createElement("div", {className: "inbox-avatar-name"}, 
	                      React.createElement("div", {className: "fg-darkgrayishblue75"}, "Ava Parry"), 
	                      React.createElement("div", {className: "fg-text"}, React.createElement("small", null, "Woah! Beautiful pic and beautiful quote! Whats the source?"))
	                    ), 
	                    React.createElement("div", {className: "inbox-date hidden-sm hidden-xs fg-text text-right"}, 
	                      React.createElement("div", null, React.createElement("small", null, React.createElement("strong", null, "2 minutes ago")))
	                    )
	                  ), 
	                  React.createElement("div", {className: "inbox-avatar", style: {borderBottom: '1px solid #EAEDF1'}}, 
	                    React.createElement("img", {src: "/imgs/avatars/avatar7.png", width: "30", height: "30", style: {verticalAlign: 'top', top: 10, position: 'relative'}}), 
	                    React.createElement("div", {className: "inbox-avatar-name"}, 
	                      React.createElement("div", {className: "fg-darkgrayishblue75"}, "Ava Parry"), 
	                      React.createElement("div", {className: "fg-text"}, React.createElement("small", null, "Thanks guys! Appreciate! :)")), 
	                      React.createElement("div", {className: "fg-text"}, React.createElement("small", null, "Source: ", React.createElement("em", null, "Owl City, Ocean Eyes")))
	                    ), 
	                    React.createElement("div", {className: "inbox-date hidden-sm hidden-xs fg-text text-right"}, 
	                      React.createElement("div", null, React.createElement("small", null, React.createElement("strong", null, "few seconds ago")))
	                    )
	                  )
	                ), 
	                React.createElement(PanelFooter, {style: {padding: 12.5}}, 
	                  React.createElement(Textarea, {rows: "1", placeholder: "Write a comment...", style: {border: 'none'}})
	                )
	              )
	            ), 
	            React.createElement(Col, {sm: 6}, 
	              React.createElement(PanelContainer, null, 
	                React.createElement(PanelBody, {style: {padding: 25, paddingTop: 12.5}}, 
	                  React.createElement("div", {className: "inbox-avatar"}, 
	                    React.createElement("img", {src: "/imgs/avatars/avatar5.png", width: "40", height: "40"}), 
	                    React.createElement("div", {className: "inbox-avatar-name"}, 
	                      React.createElement("div", {className: "fg-darkgrayishblue75"}, "Jordyn Ouellet created an event"), 
	                      React.createElement("div", {className: "fg-text"}, React.createElement("small", null, "Austin, USA"))
	                    ), 
	                    React.createElement("div", {className: "inbox-date hidden-sm hidden-xs fg-text text-right"}, 
	                      React.createElement("div", {style: {position: 'relative', top: 0}}, React.createElement(Icon, {glyph: "icon-ikons-calendar icon-1-and-quarter-x"})), 
	                      React.createElement("div", {style: {position: 'relative', top: -10}}, React.createElement("small", null, React.createElement("strong", null, "3 hours ago")))
	                    )
	                  ), 
	                  React.createElement("div", null, 
	                    React.createElement("div", {className: "fg-darkgreen45"}, React.createElement("strong", null, "Birthday party on my Yacht in New York.")), 
	                    React.createElement("div", {className: "fg-text"}, "July 10 at 10:00pm"), 
	                    React.createElement("div", {className: "fg-text"}, "New York, USA")
	                  ), 
	                  React.createElement("div", {style: {margin: -25, marginTop: 25}}, 
	                    React.createElement("div", null, 
	                      React.createElement("div", {id: "map", className: "map leaflet-container leaflet-fade-anim", style: {height: 300}})
	                    )
	                  )
	                ), 
	                React.createElement(PanelFooter, {noRadius: true, className: "fg-black75 bg-gray", style: {padding: '12.5px 25px', margin: 0}}, 
	                  React.createElement(Grid, {className: "fg-text"}, 
	                    React.createElement(Row, null, 
	                      React.createElement(Col, {xs: 6, collapseLeft: true, collapseRight: true}, 
	                        React.createElement("a", {href: "#", className: "fg-text", style: {border: 'none', marginRight: 25}}, React.createElement(Icon, {glyph: "icon-dripicons-thumbs-up icon-1-and-quarter-x"}), React.createElement("span", {style: {position: 'relative', top: -2, left: 3}}, "Like"))
	                      ), 
	                      React.createElement(Col, {xs: 6, className: "text-right", collapseLeft: true, collapseRight: true}, 
	                        React.createElement("span", {style: {top: 5, position: 'relative'}}, React.createElement("strong", null, "600"), " people like this")
	                      )
	                    )
	                  )
	                ), 
	                React.createElement(PanelFooter, {style: {padding: 12.5}}, 
	                  React.createElement(Textarea, {rows: "1", placeholder: "Write a comment...", style: {border: 'none'}})
	                )
	              ), 
	              React.createElement(PanelContainer, null, 
	                React.createElement(PanelBody, {style: {padding: 25, paddingTop: 12.5}}, 
	                  React.createElement("div", {className: "inbox-avatar"}, 
	                    React.createElement("img", {src: "/imgs/avatars/avatar9.png", width: "40", height: "40"}), 
	                    React.createElement("div", {className: "inbox-avatar-name"}, 
	                      React.createElement("div", {className: "fg-darkgrayishblue75"}, "Ava Parry"), 
	                      React.createElement("div", {className: "fg-text"}, React.createElement("small", null, "Massachusetts, USA"))
	                    ), 
	                    React.createElement("div", {className: "inbox-date hidden-sm hidden-xs fg-text text-right"}, 
	                      React.createElement("div", {style: {position: 'relative', top: 0}}, React.createElement(Icon, {glyph: "icon-feather-video icon-1-and-quarter-x"})), 
	                      React.createElement("div", {style: {position: 'relative', top: -10}}, React.createElement("small", null, React.createElement("strong", null, "4 hours ago")))
	                    )
	                  ), 
	                  React.createElement("div", null, 
	                    React.createElement("div", {className: "fg-darkgreen45"}, 
	                      React.createElement("strong", null, "1983 Historic Apple Keynote by Steve Jobs")
	                    )
	                  ), 
	                  React.createElement("div", {style: {margin: -25, marginTop: 25}}, 
	                    React.createElement("div", {className: "embed-responsive embed-responsive-16by9"}, 
	                      React.createElement("iframe", {className: "embed-responsive-item", src: "//www.youtube.com/embed/lSiQA6KKyJo?rel=0", allowFullScreen: true})
	                    )
	                  )
	                ), 
	                React.createElement(PanelFooter, {noRadius: true, className: "fg-black75 bg-gray", style: {padding: '12.5px 25px', margin: 0}}, 
	                  React.createElement(Grid, {className: "fg-text"}, 
	                    React.createElement(Row, null, 
	                      React.createElement(Col, {xs: 6, collapseLeft: true, collapseRight: true}, 
	                        React.createElement("a", {href: "#", className: "fg-text", style: {border: 'none', marginRight: 25}}, React.createElement(Icon, {glyph: "icon-dripicons-thumbs-up icon-1-and-quarter-x"}), React.createElement("span", {style: {position: 'relative', top: -2, left: 3}}, "Like"))
	                      ), 
	                      React.createElement(Col, {xs: 6, className: "text-right", collapseLeft: true, collapseRight: true}, 
	                        React.createElement("span", {style: {top: 5, position: 'relative'}}, React.createElement("strong", null, "4,350"), " people like this")
	                      )
	                    )
	                  )
	                ), 
	                React.createElement(PanelFooter, {style: {padding: 25, paddingTop: 0, paddingBottom: 0}}, 
	                  React.createElement("div", {className: "inbox-avatar", style: {borderBottom: '1px solid #EAEDF1'}}, 
	                    React.createElement("img", {src: "/imgs/avatars/avatar0.png", width: "30", height: "30", style: {verticalAlign: 'top', top: 10, position: 'relative'}}), 
	                    React.createElement("div", {className: "inbox-avatar-name"}, 
	                      React.createElement("div", {className: "fg-darkgrayishblue75"}, "Anna Sanchez"), 
	                      React.createElement("div", {className: "fg-text"}, React.createElement("small", null, "Love this! It also features the Superbowl ad")), 
	                      React.createElement("div", {className: "fg-text", style: {marginTop: -5}}, React.createElement("small", null, "which is considered the greatest ad of all time!")), 
	                      React.createElement("div", {className: "fg-text"}, React.createElement("small", null, "Thanks for sharing!"))
	                    ), 
	                    React.createElement("div", {className: "inbox-date hidden-sm hidden-xs fg-text text-right"}, 
	                      React.createElement("div", null, React.createElement("small", null, React.createElement("strong", null, "4 hours ago")))
	                    )
	                  ), 
	                  React.createElement("div", {className: "inbox-avatar", style: {borderBottom: '1px solid #EAEDF1'}}, 
	                    React.createElement("img", {src: "/imgs/avatars/avatar9.png", width: "30", height: "30", style: {verticalAlign: 'top', top: 10, position: 'relative'}}), 
	                    React.createElement("div", {className: "inbox-avatar-name"}, 
	                      React.createElement("div", {className: "fg-darkgrayishblue75"}, "Ava Parry"), 
	                      React.createElement("div", {className: "fg-text"}, React.createElement("small", null, React.createElement("strong", null, "Welcome! :)")))
	                    ), 
	                    React.createElement("div", {className: "inbox-date hidden-sm hidden-xs fg-text text-right"}, 
	                      React.createElement("div", null, React.createElement("small", null, React.createElement("strong", null, "4 hours ago")))
	                    )
	                  )
	                ), 
	                React.createElement(PanelFooter, {style: {padding: 12.5}}, 
	                  React.createElement(Textarea, {rows: "1", placeholder: "Write a comment...", style: {border: 'none'}})
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
/* 14 */
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
/* 15 */
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
	              React.createElement(PanelContainer, {controlStyles: "bg-darkgreen45 fg-white"}, 
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
/* 16 */
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
	            React.createElement(PanelContainer, {controlStyles: "bg-red fg-white"}, 
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
/* 17 */
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
	          React.createElement(Link, {to: "/app/file-utilities/standart", style: {border:0}}, React.createElement(Button, {bsStyle: "primary", style: { marginRight:15}}, "Standart")), 
	          React.createElement("span", null, "or"), 
	          React.createElement(Link, {to: "/app/file-utilities/standart", style: {border:0}}, React.createElement(Button, {bsStyle: "danger", style: {borderRadius:8,  marginLeft:15}}, "Gold"))
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
	              React.createElement(PanelContainer, null, 

	                React.createElement(Panel, null, 
	                  React.createElement(PanelBody, null, 
	                    React.createElement(Grid, null, 
	                      React.createElement(Row, null, 
	                        React.createElement(Col, {xs: 12}, 
	                          React.createElement("div", {className: "text-right"}, 
	                              React.createElement(Button, {lg: true, style: {margin: 15, borderRadius:3}, bsStyle: "danger", id: "button-click", onClick: ModalManager.create.bind(this, this.getModal()), onTouchEnd: ModalManager.create.bind(this, this.getModal())}, "Create Campaign")
	                        )
	                      ), 
	                        React.createElement(Col, {xs: 12}, 
	                          React.createElement(Table, {id: "example", className: "display", cellSpacing: "0", width: "100%"}, 
	                            React.createElement("thead", null, 
	                              React.createElement("tr", null, 
	                                React.createElement("th", null, "Name"), 
	                                React.createElement("th", null, "Position"), 
	                                React.createElement("th", null, "Office"), 
	                                React.createElement("th", null, "Age"), 
	                                React.createElement("th", null, "Start date"), 
	                                React.createElement("th", null, "Salary")

	                              )
	                            ), 
	                            React.createElement("tfoot", null, 
	                              React.createElement("tr", null, 
	                                React.createElement("th", null, "Name"), 
	                                React.createElement("th", null, "Position"), 
	                                React.createElement("th", null, "Office"), 
	                                React.createElement("th", null, "Age"), 
	                                React.createElement("th", null, "Start date"), 
	                                React.createElement("th", null, "Salary")
	                              )
	                            ), 
	                            React.createElement("tbody", null, 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Tiger Nixon"), 
	                                React.createElement("td", null, "System Architect"), 
	                                React.createElement("td", null, "Edinburgh"), 
	                                React.createElement("td", null, "61"), 
	                                React.createElement("td", null, "2011/04/25"), 
	                                React.createElement("td", null, "$320,800")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Garrett Winters"), 
	                                React.createElement("td", null, "Accountant"), 
	                                React.createElement("td", null, "Tokyo"), 
	                                React.createElement("td", null, "63"), 
	                                React.createElement("td", null, "2011/07/25"), 
	                                React.createElement("td", null, "$170,750")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Ashton Cox"), 
	                                React.createElement("td", null, "Junior Technical Author"), 
	                                React.createElement("td", null, "San Francisco"), 
	                                React.createElement("td", null, "66"), 
	                                React.createElement("td", null, "2009/01/12"), 
	                                React.createElement("td", null, "$86,000")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Cedric Kelly"), 
	                                React.createElement("td", null, "Senior Javascript Developer"), 
	                                React.createElement("td", null, "Edinburgh"), 
	                                React.createElement("td", null, "22"), 
	                                React.createElement("td", null, "2012/03/29"), 
	                                React.createElement("td", null, "$433,060")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Airi Satou"), 
	                                React.createElement("td", null, "Accountant"), 
	                                React.createElement("td", null, "Tokyo"), 
	                                React.createElement("td", null, "33"), 
	                                React.createElement("td", null, "2008/11/28"), 
	                                React.createElement("td", null, "$162,700")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Brielle Williamson"), 
	                                React.createElement("td", null, "Integration Specialist"), 
	                                React.createElement("td", null, "New York"), 
	                                React.createElement("td", null, "61"), 
	                                React.createElement("td", null, "2012/12/02"), 
	                                React.createElement("td", null, "$372,000")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Herrod Chandler"), 
	                                React.createElement("td", null, "Sales Assistant"), 
	                                React.createElement("td", null, "San Francisco"), 
	                                React.createElement("td", null, "59"), 
	                                React.createElement("td", null, "2012/08/06"), 
	                                React.createElement("td", null, "$137,500")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Rhona Davidson"), 
	                                React.createElement("td", null, "Integration Specialist"), 
	                                React.createElement("td", null, "Tokyo"), 
	                                React.createElement("td", null, "55"), 
	                                React.createElement("td", null, "2010/10/14"), 
	                                React.createElement("td", null, "$327,900")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Colleen Hurst"), 
	                                React.createElement("td", null, "Javascript Developer"), 
	                                React.createElement("td", null, "San Francisco"), 
	                                React.createElement("td", null, "39"), 
	                                React.createElement("td", null, "2009/09/15"), 
	                                React.createElement("td", null, "$205,500")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Sonya Frost"), 
	                                React.createElement("td", null, "Software Engineer"), 
	                                React.createElement("td", null, "Edinburgh"), 
	                                React.createElement("td", null, "23"), 
	                                React.createElement("td", null, "2008/12/13"), 
	                                React.createElement("td", null, "$103,600")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Jena Gaines"), 
	                                React.createElement("td", null, "Office Manager"), 
	                                React.createElement("td", null, "London"), 
	                                React.createElement("td", null, "30"), 
	                                React.createElement("td", null, "2008/12/19"), 
	                                React.createElement("td", null, "$90,560")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Quinn Flynn"), 
	                                React.createElement("td", null, "Support Lead"), 
	                                React.createElement("td", null, "Edinburgh"), 
	                                React.createElement("td", null, "22"), 
	                                React.createElement("td", null, "2013/03/03"), 
	                                React.createElement("td", null, "$342,000")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Charde Marshall"), 
	                                React.createElement("td", null, "Regional Director"), 
	                                React.createElement("td", null, "San Francisco"), 
	                                React.createElement("td", null, "36"), 
	                                React.createElement("td", null, "2008/10/16"), 
	                                React.createElement("td", null, "$470,600")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Haley Kennedy"), 
	                                React.createElement("td", null, "Senior Marketing Designer"), 
	                                React.createElement("td", null, "London"), 
	                                React.createElement("td", null, "43"), 
	                                React.createElement("td", null, "2012/12/18"), 
	                                React.createElement("td", null, "$313,500")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Tatyana Fitzpatrick"), 
	                                React.createElement("td", null, "Regional Director"), 
	                                React.createElement("td", null, "London"), 
	                                React.createElement("td", null, "19"), 
	                                React.createElement("td", null, "2010/03/17"), 
	                                React.createElement("td", null, "$385,750")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Michael Silva"), 
	                                React.createElement("td", null, "Marketing Designer"), 
	                                React.createElement("td", null, "London"), 
	                                React.createElement("td", null, "66"), 
	                                React.createElement("td", null, "2012/11/27"), 
	                                React.createElement("td", null, "$198,500")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Paul Byrd"), 
	                                React.createElement("td", null, "Chief Financial Officer (CFO)"), 
	                                React.createElement("td", null, "New York"), 
	                                React.createElement("td", null, "64"), 
	                                React.createElement("td", null, "2010/06/09"), 
	                                React.createElement("td", null, "$725,000")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Gloria Little"), 
	                                React.createElement("td", null, "Systems Administrator"), 
	                                React.createElement("td", null, "New York"), 
	                                React.createElement("td", null, "59"), 
	                                React.createElement("td", null, "2009/04/10"), 
	                                React.createElement("td", null, "$237,500")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Bradley Greer"), 
	                                React.createElement("td", null, "Software Engineer"), 
	                                React.createElement("td", null, "London"), 
	                                React.createElement("td", null, "41"), 
	                                React.createElement("td", null, "2012/10/13"), 
	                                React.createElement("td", null, "$132,000")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Dai Rios"), 
	                                React.createElement("td", null, "Personnel Lead"), 
	                                React.createElement("td", null, "Edinburgh"), 
	                                React.createElement("td", null, "35"), 
	                                React.createElement("td", null, "2012/09/26"), 
	                                React.createElement("td", null, "$217,500")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Jenette Caldwell"), 
	                                React.createElement("td", null, "Development Lead"), 
	                                React.createElement("td", null, "New York"), 
	                                React.createElement("td", null, "30"), 
	                                React.createElement("td", null, "2011/09/03"), 
	                                React.createElement("td", null, "$345,000")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Yuri Berry"), 
	                                React.createElement("td", null, "Chief Marketing Officer (CMO)"), 
	                                React.createElement("td", null, "New York"), 
	                                React.createElement("td", null, "40"), 
	                                React.createElement("td", null, "2009/06/25"), 
	                                React.createElement("td", null, "$675,000")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Caesar Vance"), 
	                                React.createElement("td", null, "Pre-Sales Support"), 
	                                React.createElement("td", null, "New York"), 
	                                React.createElement("td", null, "21"), 
	                                React.createElement("td", null, "2011/12/12"), 
	                                React.createElement("td", null, "$106,450")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Doris Wilder"), 
	                                React.createElement("td", null, "Sales Assistant"), 
	                                React.createElement("td", null, "Sidney"), 
	                                React.createElement("td", null, "23"), 
	                                React.createElement("td", null, "2010/09/20"), 
	                                React.createElement("td", null, "$85,600")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Angelica Ramos"), 
	                                React.createElement("td", null, "Chief Executive Officer (CEO)"), 
	                                React.createElement("td", null, "London"), 
	                                React.createElement("td", null, "47"), 
	                                React.createElement("td", null, "2009/10/09"), 
	                                React.createElement("td", null, "$1,200,000")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Gavin Joyce"), 
	                                React.createElement("td", null, "Developer"), 
	                                React.createElement("td", null, "Edinburgh"), 
	                                React.createElement("td", null, "42"), 
	                                React.createElement("td", null, "2010/12/22"), 
	                                React.createElement("td", null, "$92,575")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Jennifer Chang"), 
	                                React.createElement("td", null, "Regional Director"), 
	                                React.createElement("td", null, "Singapore"), 
	                                React.createElement("td", null, "28"), 
	                                React.createElement("td", null, "2010/11/14"), 
	                                React.createElement("td", null, "$357,650")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Brenden Wagner"), 
	                                React.createElement("td", null, "Software Engineer"), 
	                                React.createElement("td", null, "San Francisco"), 
	                                React.createElement("td", null, "28"), 
	                                React.createElement("td", null, "2011/06/07"), 
	                                React.createElement("td", null, "$206,850")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Fiona Green"), 
	                                React.createElement("td", null, "Chief Operating Officer (COO)"), 
	                                React.createElement("td", null, "San Francisco"), 
	                                React.createElement("td", null, "48"), 
	                                React.createElement("td", null, "2010/03/11"), 
	                                React.createElement("td", null, "$850,000")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Shou Itou"), 
	                                React.createElement("td", null, "Regional Marketing"), 
	                                React.createElement("td", null, "Tokyo"), 
	                                React.createElement("td", null, "20"), 
	                                React.createElement("td", null, "2011/08/14"), 
	                                React.createElement("td", null, "$163,000")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Michelle House"), 
	                                React.createElement("td", null, "Integration Specialist"), 
	                                React.createElement("td", null, "Sidney"), 
	                                React.createElement("td", null, "37"), 
	                                React.createElement("td", null, "2011/06/02"), 
	                                React.createElement("td", null, "$95,400")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Suki Burks"), 
	                                React.createElement("td", null, "Developer"), 
	                                React.createElement("td", null, "London"), 
	                                React.createElement("td", null, "53"), 
	                                React.createElement("td", null, "2009/10/22"), 
	                                React.createElement("td", null, "$114,500")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Prescott Bartlett"), 
	                                React.createElement("td", null, "Technical Author"), 
	                                React.createElement("td", null, "London"), 
	                                React.createElement("td", null, "27"), 
	                                React.createElement("td", null, "2011/05/07"), 
	                                React.createElement("td", null, "$145,000")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Gavin Cortez"), 
	                                React.createElement("td", null, "Team Leader"), 
	                                React.createElement("td", null, "San Francisco"), 
	                                React.createElement("td", null, "22"), 
	                                React.createElement("td", null, "2008/10/26"), 
	                                React.createElement("td", null, "$235,500")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Martena Mccray"), 
	                                React.createElement("td", null, "Post-Sales support"), 
	                                React.createElement("td", null, "Edinburgh"), 
	                                React.createElement("td", null, "46"), 
	                                React.createElement("td", null, "2011/03/09"), 
	                                React.createElement("td", null, "$324,050")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Unity Butler"), 
	                                React.createElement("td", null, "Marketing Designer"), 
	                                React.createElement("td", null, "San Francisco"), 
	                                React.createElement("td", null, "47"), 
	                                React.createElement("td", null, "2009/12/09"), 
	                                React.createElement("td", null, "$85,675")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Howard Hatfield"), 
	                                React.createElement("td", null, "Office Manager"), 
	                                React.createElement("td", null, "San Francisco"), 
	                                React.createElement("td", null, "51"), 
	                                React.createElement("td", null, "2008/12/16"), 
	                                React.createElement("td", null, "$164,500")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Hope Fuentes"), 
	                                React.createElement("td", null, "Secretary"), 
	                                React.createElement("td", null, "San Francisco"), 
	                                React.createElement("td", null, "41"), 
	                                React.createElement("td", null, "2010/02/12"), 
	                                React.createElement("td", null, "$109,850")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Vivian Harrell"), 
	                                React.createElement("td", null, "Financial Controller"), 
	                                React.createElement("td", null, "San Francisco"), 
	                                React.createElement("td", null, "62"), 
	                                React.createElement("td", null, "2009/02/14"), 
	                                React.createElement("td", null, "$452,500")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Timothy Mooney"), 
	                                React.createElement("td", null, "Office Manager"), 
	                                React.createElement("td", null, "London"), 
	                                React.createElement("td", null, "37"), 
	                                React.createElement("td", null, "2008/12/11"), 
	                                React.createElement("td", null, "$136,200")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Jackson Bradshaw"), 
	                                React.createElement("td", null, "Director"), 
	                                React.createElement("td", null, "New York"), 
	                                React.createElement("td", null, "65"), 
	                                React.createElement("td", null, "2008/09/26"), 
	                                React.createElement("td", null, "$645,750")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Olivia Liang"), 
	                                React.createElement("td", null, "Support Engineer"), 
	                                React.createElement("td", null, "Singapore"), 
	                                React.createElement("td", null, "64"), 
	                                React.createElement("td", null, "2011/02/03"), 
	                                React.createElement("td", null, "$234,500")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Bruno Nash"), 
	                                React.createElement("td", null, "Software Engineer"), 
	                                React.createElement("td", null, "London"), 
	                                React.createElement("td", null, "38"), 
	                                React.createElement("td", null, "2011/05/03"), 
	                                React.createElement("td", null, "$163,500")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Sakura Yamamoto"), 
	                                React.createElement("td", null, "Support Engineer"), 
	                                React.createElement("td", null, "Tokyo"), 
	                                React.createElement("td", null, "37"), 
	                                React.createElement("td", null, "2009/08/19"), 
	                                React.createElement("td", null, "$139,575")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Thor Walton"), 
	                                React.createElement("td", null, "Developer"), 
	                                React.createElement("td", null, "New York"), 
	                                React.createElement("td", null, "61"), 
	                                React.createElement("td", null, "2013/08/11"), 
	                                React.createElement("td", null, "$98,540")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Finn Camacho"), 
	                                React.createElement("td", null, "Support Engineer"), 
	                                React.createElement("td", null, "San Francisco"), 
	                                React.createElement("td", null, "47"), 
	                                React.createElement("td", null, "2009/07/07"), 
	                                React.createElement("td", null, "$87,500")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Serge Baldwin"), 
	                                React.createElement("td", null, "Data Coordinator"), 
	                                React.createElement("td", null, "Singapore"), 
	                                React.createElement("td", null, "64"), 
	                                React.createElement("td", null, "2012/04/09"), 
	                                React.createElement("td", null, "$138,575")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Zenaida Frank"), 
	                                React.createElement("td", null, "Software Engineer"), 
	                                React.createElement("td", null, "New York"), 
	                                React.createElement("td", null, "63"), 
	                                React.createElement("td", null, "2010/01/04"), 
	                                React.createElement("td", null, "$125,250")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Zorita Serrano"), 
	                                React.createElement("td", null, "Software Engineer"), 
	                                React.createElement("td", null, "San Francisco"), 
	                                React.createElement("td", null, "56"), 
	                                React.createElement("td", null, "2012/06/01"), 
	                                React.createElement("td", null, "$115,000")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Jennifer Acosta"), 
	                                React.createElement("td", null, "Junior Javascript Developer"), 
	                                React.createElement("td", null, "Edinburgh"), 
	                                React.createElement("td", null, "43"), 
	                                React.createElement("td", null, "2013/02/01"), 
	                                React.createElement("td", null, "$75,650")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Cara Stevens"), 
	                                React.createElement("td", null, "Sales Assistant"), 
	                                React.createElement("td", null, "New York"), 
	                                React.createElement("td", null, "46"), 
	                                React.createElement("td", null, "2011/12/06"), 
	                                React.createElement("td", null, "$145,600")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Hermione Butler"), 
	                                React.createElement("td", null, "Regional Director"), 
	                                React.createElement("td", null, "London"), 
	                                React.createElement("td", null, "47"), 
	                                React.createElement("td", null, "2011/03/21"), 
	                                React.createElement("td", null, "$356,250")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Lael Greer"), 
	                                React.createElement("td", null, "Systems Administrator"), 
	                                React.createElement("td", null, "London"), 
	                                React.createElement("td", null, "21"), 
	                                React.createElement("td", null, "2009/02/27"), 
	                                React.createElement("td", null, "$103,500")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Jonas Alexander"), 
	                                React.createElement("td", null, "Developer"), 
	                                React.createElement("td", null, "San Francisco"), 
	                                React.createElement("td", null, "30"), 
	                                React.createElement("td", null, "2010/07/14"), 
	                                React.createElement("td", null, "$86,500")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Shad Decker"), 
	                                React.createElement("td", null, "Regional Director"), 
	                                React.createElement("td", null, "Edinburgh"), 
	                                React.createElement("td", null, "51"), 
	                                React.createElement("td", null, "2008/11/13"), 
	                                React.createElement("td", null, "$183,000")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Michael Bruce"), 
	                                React.createElement("td", null, "Javascript Developer"), 
	                                React.createElement("td", null, "Singapore"), 
	                                React.createElement("td", null, "29"), 
	                                React.createElement("td", null, "2011/06/27"), 
	                                React.createElement("td", null, "$183,000")
	                              ), 
	                              React.createElement("tr", null, 
	                                React.createElement("td", null, "Donna Snider"), 
	                                React.createElement("td", null, "Customer Support"), 
	                                React.createElement("td", null, "New York"), 
	                                React.createElement("td", null, "27"), 
	                                React.createElement("td", null, "2011/01/25"), 
	                                React.createElement("td", null, "$112,000")
	                              )
	                            )
	                          ), 
	                          React.createElement("br", null)
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __HUA = (function () { var React = __webpack_require__(2); var getHotUpdateAPI = __webpack_require__(3); return getHotUpdateAPI(React, "zones.jsx", module.id); })(); if (false) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "zones.jsx" + ": " + err.message); } }); module.hot.dispose(function () { var nextTick = require("/Users/George/Desktop/TT_rubix-reactjs/node_modules/react-hot-loader/node_modules/next-tick/index.js"); nextTick(__HUA.updateMountedInstances); }); }

	var Header = __webpack_require__(8);
	var Sidebar = __webpack_require__(9);
	var Footer = __webpack_require__(10);

	var MapContainer = __HUA.createClass({displayName: "MapContainer",
	  render: function() {
	    return (
	      React.createElement(PanelContainer, null, 
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




	  },
	  render: function() {
	    return (
	      React.createElement(Container, {id: "body"}, 
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
	                            React.createElement("td", null, "O.8$"), 
	                            React.createElement("td", null, "8:00")
	                          ), 
	                          React.createElement("tr", null, 
	                            React.createElement("td", null, "2"), 
	                            React.createElement("td", null, "Jacob"), 
	                            React.createElement("td", null, "Thornton"), 
	                            React.createElement("td", null, "@fat")
	                          ), 
	                          React.createElement("tr", null, 
	                            React.createElement("td", null, "3"), 
	                            React.createElement("td", null, "Larry"), 
	                            React.createElement("td", null, "the Bird"), 
	                            React.createElement("td", null, "@twitter")
	                          )
	                        )
	                      )
	                    )
	                  ), 
	                  React.createElement(Row, null, 
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