String.prototype.pad=function(a){for(var b=this;b.length<a;)b="0"+b;return b};var profilerRecords=[],xpathEvalNum=0,xpathEvalTime=0,xpathEvalTimePure=0;function Profiler(a){var b=(new Date).getTime();this.report=function(c){c=c||"time taken for "+a+" to execute in milliseconds: "+((new Date).getTime()-b);profilerRecords.push(c)}}
function divideIntoBatches(a,b){var c,d,e,f=[],g=[];for(c=0;c<a.length;c++)f.push({index:c,size:a[c]});for(;0<f.length;){e=[f[0].index];d=f[0].size;if(f[0].size<b)for(c=1;c<f.length;c++)d+f[c].size<b&&(e.push(f[c].index),d+=f[c].size);g.push(e);for(c=0;c<f.length;c++)for(d=0;d<e.length;d++)f[c].index===e[d]&&f.splice(c,1)}return g}var helper=new Helper;
function Helper(){this.setSettings=function(){var a,b,c=[{q:"return",s:"returnURL"},{q:"showbranch",s:"showBranch"},{q:"debug",s:"debug"},{q:"touch",s:"touch"},{q:"server",s:"serverURL"},{q:"form",s:"formURL"},{q:"id",s:"formId"},{q:"formName",s:"formId"},{q:"instanceId",s:"instanceId"},{q:"entityId",s:"entityId"}];for(a=0;a<c.length;a++)b=this.getQueryParam(c[a].q),settings[c[a].s]=null!==b?b:"undefined"!==typeof settings[c[a].s]?settings[c[a].s]:null};this.getQueryParam=function(a){var b=this.getAllQueryParams(),
c;for(c in b)if(c.toLowerCase()===a.toLowerCase())return b[c];return null};this.getAllQueryParams=function(){for(var a,b=window.location.search.substring(1).split("&"),c={},d=0;d<b.length;d++){var e=b[d].split("=");0<e[0].length&&(a=encodeURI(e[1]),a="true"===a?!0:"false"===a?!1:a,c[e[0]]=a)}return c}}
window.onload=function(){setTimeout(function(){var a,b,c={};if(window.performance){b=window.performance.timing;b=b.loadEventEnd-b.responseEnd;"undefined"!==typeof settings&&settings.debug&&(a=(a=window.localStorage.getItem("__loadLog"))?JSON.parse(a):[],a.push(b),10<a.length&&a.shift(),window.localStorage.setItem("__loadLog",JSON.stringify(a)));profilerRecords.push("total loading time: "+b+" milliseconds");for(var d in window.performance.timing)c[d]=window.performance.timing[d];window.opener&&(window.performance&&
window.postMessage)&&window.opener.postMessage(JSON.stringify(c),"*");$(profilerRecords).each(function(a,b){console.log(b)})}},0)};
(function(a){a.fn.getXPath=function(a){for(var c=this.first(),d=[c.prop("nodeName")],c=c.parent(),e=c.prop("nodeName");1==c.length&&e!==a&&"#document"!==e;)d.push(e),c=c.parent(),e=c.prop("nodeName");return"/"+d.reverse().join("/")};a.fn.toLargestWidth=function(b){var c=0,b=b||0;return this.each(function(){a(this).width()>c&&(c=a(this).width())}).each(function(){a(this).width(c+b)})};a.fn.toSmallestWidth=function(){var b=2E3;return this.each(function(){a(this).width()<b&&(b=a(this).width())}).each(function(){a(this).width(b)})};
a.fn.reverse=[].reverse;a.fn.alphanumeric=function(b){b=a.extend({ichars:"!@#$%^&*()+=[]\\';,/{}|\":<>?~`.- ",nchars:"",allow:""},b);return this.each(function(){b.nocaps&&(b.nchars+="ABCDEFGHIJKLMNOPQRSTUVWXYZ");b.allcaps&&(b.nchars+="abcdefghijklmnopqrstuvwxyz");for(var c=b.allow.split(""),d=0;d<c.length;d++)-1!=b.ichars.indexOf(c[d])&&(c[d]="\\"+c[d]);b.allow=c.join("|");var e=b.ichars+b.nchars,e=e.replace(RegExp(b.allow,"gi"),"");a(this).keypress(function(a){var b;b=a.charCode?String.fromCharCode(a.charCode):
String.fromCharCode(a.which);e.indexOf(b)!=-1&&a.preventDefault();a.ctrlKey&&b=="v"&&a.preventDefault()});a(this).bind("contextmenu",function(){return false})})};a.fn.numeric=function(b){var c="abcdefghijklmnopqrstuvwxyz",c=c+c.toUpperCase(),b=a.extend({nchars:c},b);return this.each(function(){a(this).alphanumeric(b)})};a.fn.alpha=function(b){b=a.extend({nchars:"1234567890"},b);return this.each(function(){a(this).alphanumeric(b)})};a.fn.capitalizeStart=function(a){a||(a=1);var c=this.contents().filter(function(){return 3==
this.nodeType}).first(),d=c.text(),a=d.split(" ",a).join(" ");c.length&&(c[0].nodeValue=d.slice(a.length),c.before('<span class="capitalize">'+a+"</span>"))}})(jQuery);/*
 Copyright 2012 Martijn van de Rijdt

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
var gui,printO;$(document).ready(function(){helper.setSettings();gui=new GUI;gui.init();"undefined"==typeof console&&(console={log:function(){}});"undefined"==typeof window.console.debug&&(console.debug=console.log);settings.debug||(window.console.log=function(){},window.console.debug=function(){});settings.touch?(Modernizr.touch=!0,$("html").addClass("touch")):!1===settings.touch&&(Modernizr.touch=!1,$("html").removeClass("touch"));printO=new Print});
function GUI(){this.supportLink='<a href="mailto:'+settings.supportEmail+'">'+settings.supportEmail+"</a>"}GUI.prototype.init=function(){this.nav.setup();this.pages.init();this.setEventHandlers();"function"===typeof this.setCustomEventHandlers&&this.setCustomEventHandlers();$("footer").detach().appendTo("#container");this.positionPageAndBar()};GUI.prototype.setup=function(){$(window).trigger("resize")};
GUI.prototype.setEventHandlers=function(){var a=this;$(document).on("click","#feedback-bar .close",function(){a.feedbackBar.hide();return!1});$(document).on("click",".touch #feedback-bar",function(){a.feedbackBar.hide()});$(document).on("click","#page .close",function(){a.pages.close();return!1});$("button.print").on("click",function(){printO.printForm()});$(document).on("click",'a[href^="#"]:not([href="#"]):not(nav ul li a)',function(a){var c=$(this).attr("href");console.log("captured click to nav page, href="+
c);"#"!==c&&(a.preventDefault(),$('nav li a[href="'+c+'"]').click())});$('nav ul li a[href^="#"]').click(function(b){b.preventDefault();b=$(this).attr("href").substr(1);a.pages.open(b);$(this).closest("li").addClass("active").siblings().removeClass("active")});$(window).on("onlinestatuschange",function(b,c){a.updateStatus.connection(c)});$(document).on("edit","form.jr",function(b,c){a.updateStatus.edit(c)});$(document).on("browsersupport",function(b,c){a.updateStatus.support(c)});$("#page, #feedback-bar").on("change",
function(){a.positionPageAndBar()});$(document).on("xpatherror",function(b,c){var d=settings.supportEmail;a.alert('A formula evaluation error occurred. Please contact <a href="mailto:'+d+"?subject=xpath errors for: "+location.href+"&body="+c+'" target="_blank" >'+d+'</a> with this error:<ul class="error-list"><li>'+c+"</li></ul>","Formula Error")})};
GUI.prototype.nav={setup:function(){$("article.page").each(function(){var a,b="",c;c=$(this).attr("id");a=$(this).attr("data-display-icon")?'<img src="/images/'+$(this).attr("data-display-icon")+'" alt="menu-icon" />':$(this).attr("data-display")?$(this).attr("data-display"):c;b=$(this).attr("data-title")?$(this).attr("data-title"):c;c=$(this).attr("data-ext-link")?$(this).attr("data-ext-link"):"#"+c;$('<li class=""><a href="'+c+'" title="'+b+'" >'+a+"</a></li>").appendTo($("nav ul"))})},reset:function(){$("nav ul li").removeClass("active")}};
GUI.prototype.pages={init:function(){this.$pages=$("<pages></pages>");$("article.page").detach().appendTo(this.$pages)},get:function(a){var b=this.$pages.find('article[id="'+a+'"]');return b=0<b.length?b:$('article[id="'+a+'"]')},isShowing:function(a){return 0<$("#page article.page"+("undefined"!==typeof a?'[id="'+a+'"]':"")).length},open:function(a){$("header");var b=this;this.isShowing(a)||(a=this.get(a),1!==a.length?console.error("page not found"):(this.isShowing()&&this.close(),$("#page .content").prepend(a.show()).trigger("change"),
$("#page").show(),$(".main").css("opacity","0.3"),$(window).on("resize.pageEvents",function(){$("#page").trigger("change")}),setTimeout(function(){$(window).on("click.pageEvents",function(a){console.log($(a.target).prop("nodeName"));0===$(a.target).parents(".btn-toolbar, label, fieldset").length&&b.close();return!0})},1E3)))},close:function(){var a=0<$("#page .page").length?$("#page .page").detach():[];0<a.length&&(this.$pages.append(a),$("#page").trigger("change"),$("nav ul li").removeClass("active"),
$(window).off(".pageEvents"));$(".main").css("opacity","1")}};GUI.prototype.feedbackBar={show:function(a,b){var c,b=b?1E3*b:1E4;$("#feedback-bar p").eq(1).remove();$("#feedback-bar p").html()!==a&&(c=$("<p></p>"),c.append(a),$("#feedback-bar").append(c));$("#feedback-bar").show().trigger("change");setTimeout(function(){typeof c!=="undefined"&&c.remove();$("#feedback-bar").trigger("change")},b)},hide:function(){$("#feedback-bar p").remove();$("#feedback-bar").trigger("change")}};
GUI.prototype.feedback=function(a,b,c,d){c=c||"Information";Modernizr.touch?d?this.confirm({msg:a,heading:c},d,b):this.alert(a,c,"info",b):this.feedbackBar.show(a,b)};
GUI.prototype.alert=function(a,b,c,d){var e,f=$("#dialog-alert"),c=c||"error",c="normal"===c?"":"alert alert-block alert-"+c;f.find(".modal-header h3").text(b||"Alert");f.find(".modal-body p").removeClass().addClass(c).html(a).capitalizeStart();f.modal({keyboard:!0,show:!0});f.on("hidden",function(){f.find(".modal-header h3, .modal-body p").html("");clearInterval(e)});if("number"===typeof d){var g=d.toString();f.find(".self-destruct-timer").text(g);e=setInterval(function(){g--;f.find(".self-destruct-timer").text(g)},
1E3);setTimeout(function(){clearInterval(e);f.find(".close").click()},1E3*d)}};
GUI.prototype.confirm=function(a,b,c){var d,e,f,g,h;"string"===typeof a?d=a:"string"===typeof a.msg&&(d=a.msg);d="undefined"!==typeof d?d:"Please confirm action";e="undefined"!==typeof a.heading?a.heading:"Are you sure?";f="undefined"!==typeof a.errorMsg?a.errorMsg:"";a="undefined"!==typeof a.dialog?a.dialog:"confirm";b="undefined"!==typeof b?b:{};b.posButton=b.posButton||"Confirm";b.negButton=b.negButton||"Cancel";b.posAction=b.posAction||function(){return false};b.negAction=b.negAction||function(){return false};
b.beforeAction=b.beforeAction||function(){};g=$("#dialog-"+a);g.find(".modal-header h3").text(e);g.find(".modal-body .msg").html(d).capitalizeStart();g.find(".modal-body .alert-error").html(f).show();f||g.find(".modal-body .alert-error").hide();g.modal({keyboard:!0,show:!0});g.on("shown",function(){b.beforeAction.call()});g.find("button.positive").on("click",function(){b.posAction.call();g.modal("hide")}).text(b.posButton);g.find("button.negative").on("click",function(){b.negAction.call();g.modal("hide")}).text(b.negButton);
g.on("hide",function(){g.off("shown hidden hide");g.find("button.positive, button.negative").off("click")});g.on("hidden",function(){g.find(".modal-body .msg, .modal-body .alert-error, button").text("")});if("number"===typeof c){var i=c.toString();g.find(".self-destruct-timer").text(i);h=setInterval(function(){i--;g.find(".self-destruct-timer").text(i)},1E3);setTimeout(function(){clearInterval(h);g.find(".close").click()},1E3*c)}};
GUI.prototype.confirmLogin=function(a,b){b=b||settings.serverURL;gui.confirm({msg:a||"<p>In order to submit your queued data, you need to login. If you want to do this now, you will be redirected, and loose unsaved information.</p><p>Would you like to login now or later?</p>",heading:"Login Required"},{posButton:"Log in now",negButton:"Later",posAction:function(){var a="?server="+encodeURIComponent(b)+"&return="+encodeURIComponent(location.href),a=a+(settings.formId?"&id="+settings.formId:""),a=a+
(settings.touch?"&touch="+settings.touch:""),a=a+(settings.debug?"&debug="+settings.debug:"");location.href=location.protocol+"//"+location.host+"/authenticate"+a},negAction:function(){console.log("login cancelled")},beforeAction:function(){}})};
GUI.prototype.showLoadErrors=function(a,b){var c='<ul class="error-list"><li>'+a.join("</li><li>")+"</li></ul",d="* "+a.join("* "),e=1<a.length?"s":"",f=settings.supportEmail;this.alert("<p>Error"+e+" occured during the loading of this form. "+(b||"")+'</p><br/><p>Please contact <a href="mailto:'+f+"?subject=loading errors for: "+location.href+"&body="+d+'" target="_blank" >'+f+"</a> with the link to this page and the error message"+e+" below:</p>"+c,"Loading Error"+e)};
GUI.prototype.updateStatus={connection:function(){},edit:function(a){a?$("header #status-editing").removeClass().addClass("ui-icon ui-icon-pencil").attr("title","Form is being edited."):$("header #status-editing").removeClass().attr("title","")},support:function(){},offlineLaunch:function(a){$(".drawer #status-offline-launch").text(a?"Offline Launch: Yes":"Offline Launch: No")}};
GUI.prototype.fillHeight=function(a){var b=$(window).height(),c=$("header").outerHeight(!0),a=a.outerHeight()-a.height();return b-c-a};
GUI.prototype.positionPageAndBar=function(){console.log("positionPageAndBar called");var a,b;a=$("header");b=a.outerHeight()||0;var c=$("#feedback-bar"),d=0<c.find("p").length?!0:!1,e=c.outerHeight(),f=$("#page"),g=this.pages.isShowing(),h=f.outerHeight();f.css({position:a.css("position")});if(0<a.length&&"fixed"!==a.css("position"))return d||c.hide(),g||f.hide(),!1;a=!d?0-e:b;b=!g?0-h:d?a+e:b;c.css("top",a);f.css("top",b)};
GUI.prototype.setSettings=function(a){var b,c=this;console.log("gui updateSettings() started");$.each(a,function(a,e){b=e?c.pages.get("settings").find('input[name="'+a+'"][value="'+e+'"]'):c.pages.get("settings").find('input[name="'+a+'"]');0<b.length&&b.attr("checked",e?!0:!1).trigger("change")})};
GUI.prototype.parseFormlist=function(a,b,c){var d,e="";console.log("list: ",a);if($.isEmptyObject(a))b.addClass("empty"),c||(e='<p class="alert alert-error">Error occurred during creation of form list or no forms found</p>');else{for(d in a)e+='<li><a class="btn btn-block btn-info" id="'+d+'" title="'+a[d].title+'" href="'+a[d].url+'" data-server="'+a[d].server+'" >'+a[d].name+"</a></li>";b.removeClass("empty")}b.find("ul").empty().append(e)};function Print(){this.setStyleSheet();this.setDpi()}
Print.prototype.setDpi=function(){var a,b=document.body.appendChild(document.createElement("DIV"));b.style.width="1in";b.style.padding="0";a=b.offsetWidth;b.parentNode.removeChild(b);this.dpi=a};Print.prototype.setStyleSheet=function(){this.styleSheet=this.getStyleSheet();this.$styleSheetLink=$('link[media="print"]:eq(0)')};Print.prototype.getStyleSheet=function(){for(var a=0;a<document.styleSheets.length;a++)if("print"===document.styleSheets[a].media.mediaText)return document.styleSheets[a];return null};
Print.prototype.styleToAll=function(){this.styleSheet||this.setStyleSheet();this.styleSheet.media.mediaText="all";this.$styleSheetLink.attr("media","all")};Print.prototype.styleReset=function(){this.styleSheet.media.mediaText="print";this.$styleSheetLink.attr("media","print")};Print.prototype.printForm=function(){this.removePageBreaks();this.removePossiblePageBreaks();this.styleToAll();this.addPageBreaks();this.styleReset();window.print()};Print.prototype.removePageBreaks=function(){$(".page-break").remove()};
Print.prototype.removePossiblePageBreaks=function(){$(".possible-break").remove()};
Print.prototype.addPossiblePageBreaks=function(){var a=$("<hr>",{"class":"possible-break"});this.removePossiblePageBreaks();$("form.jr").before(a.clone()).after(a.clone()).find("fieldset>legend, label:not(.geo)>input:not(input:radio, input:checkbox), label>select, label>textarea, .trigger>*, h4>*, h3>*, .jr-appearance-field-list>*").parent().each(function(){var b,c;b=$(this);return(c=b.prev().get(0))&&("H3"===c.nodeName||"H4"===c.nodeName)||$(c).hasClass("repeat-number")||0<b.parents("#jr-calculated-items, #jr-preload-items").length||
0<b.parents(".jr-appearance-field-list").length?null:b.before(a.clone())});$(".possible-break").each(function(){if($(this).prev().hasClass("possible-break"))return $(this).remove()})};
Print.prototype.addPageBreaks=function(){var a,b,c,d,e,f,g,h;g=9.5*this.dpi;d=function(a,b){this.begin=$(a);this.begin_top=this.begin.offset().top;this.end=$(b);this.end_top=this.end.offset().top;this.h=this.end_top-this.begin_top;if(0>this.h)throw console.debug("begin (top: "+this.begin_top+")",a),console.debug("end (top: "+this.end_top+")",b),Error("A question group has an invalid height.");};d.prototype.break_before=function(){var a,b;b=(a=this.begin.prev().get(0))?["after",a]:["before",this.begin.parent().get(0)];
a=b[0];return $(b[1])[a]("<hr class='page-break' />")};this.removePageBreaks();this.addPossiblePageBreaks();c=$(".possible-break");b=[];for(a=1;a<c.length;a++)b.push(new d(c[a-1],c[a]));d=0;c=[];a=[];f=0;for(h=b.length;f<h;f++)e=b[f],d+e.h>g?(a.push(c),c=[e],d=e.h):(c.push(e),d+=e.h);a.push(c);console.debug("pages: ",a);g=1;for(c=a.length;g<c;g++)b=a[g],0<b.length&&b[0].break_before();return $(".possible-break").remove()};/*
 Copyright 2012 Martijn van de Rijdt

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
function StorageLocal(){function a(a){var c;for(c=0;c<b.length;c++)if(a===b[c])return!0;return!1}var b="__settings null __history Firebug undefined __bookmark __counter __current_server __loadLog".split(" "),c=window.localStorage;this.init=function(){var a=this;$(document).on("submissionsuccess",function(b,c){a.removeRecord(c);console.log("After submission event was detected, tried to remove record with key: "+c)})};this.isSupported=function(){try{return"localStorage"in window&&null!==window.localStorage}catch(a){return!1}};
this.getForbiddenKeys=function(){return b};this.setRecord=function(b,e,f,g,h){if(!b||"string"!==typeof b||1>b.length)return console.error("no key or empty key provided for record: "+b),"require";b=b.trim();h="string"===typeof h?h.trim():null;g="undefined"!==typeof g&&!0===g?!0:!1;if("string"===typeof e.data&&a(b))return"forbidden";var i;if(i="string"===typeof e.data)if(i=h!==b)i=c.getItem(b)?!0:!1,i=i&&!0!==g;if(i||h===b&&!0!==g)return"existing";try{return"string"===typeof e.data&&(e.lastSaved=(new Date).getTime(),
c.setItem("__counter",JSON.stringify({counter:this.getCounterValue()}))),c.setItem(b,JSON.stringify(e)),console.debug("saved: "+b+", old key was: "+h),null!==h&&(""!==h&&h!==b)&&f&&(console.log("going to remove old record with key:"+h),this.removeRecord(h)),"success"}catch(j){if(22===j.code)return"full";console.log("error in store.setRecord:"+j.message,j);return"error"}};this.getRecord=function(a){var b;try{return b=JSON.parse(c.getItem(a))}catch(f){return console.error("error with loading data from store: "+
f.message),null}};this.removeRecord=function(a){try{return c.removeItem(a),$("form.jr").trigger("delete",JSON.stringify(this.getRecordList())),!0}catch(b){return console.log("error with removing data from store: "+b.message),!1}};this.getFormList=function(a){return"undefined"==typeof a?null:this.getRecord("__server_"+a)};this.getRecordList=function(){var a,b,c=[],g=this.getSurveyRecords(!1);for(a=0;a<g.length;a++)b=g[a],c.push({key:b.key,ready:b.ready,lastSaved:b.lastSaved});console.debug("formList returning "+
c.length+" items");c.sort(function(a,b){return b.lastSaved-a.lastSaved});return c};this.getSurveyRecords=function(b,e){var f,g,h=[],i={},b=b||!1,e=e||null;for(f=0;f<c.length;f++)if(g=c.key(f),i=this.getRecord(g),!a(g))try{i.key=g,g!==e&&(!b||"true"===i.ready||!0===i.ready)&&h.push(i)}catch(j){console.log("record found that was probably not in the correct JSON format (e.g. Firebug settings or corrupt record) (error: "+j.message+"), record was ignored")}return h};this.getSurveyDataArr=function(a,b){var c,
g,h=[];g=this.getSurveyRecords(a||!0,b);for(c=0;c<g.length;c++)h.push({name:g[c].key,data:g[c].data});return h};this.getSurveyDataOnlyArr=function(a){for(var b=this.getSurveyDataArr(a),c=[],a=0;a<b.length;a++)c.push(b[a].data);return 0<c.length?c:null};this.getCounterValue=function(){var a=this.getRecord("__counter");return((a&&"undefined"!==typeof a.counter&&isNumber(a.counter)?Number(a.counter):0)+1).toString().pad(4)}}function isNumber(a){return!isNaN(parseFloat(a))&&isFinite(a)};/*
 Copyright 2012 Martijn van de Rijdt

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
function Connection(){var a=this;this.CONNECTION_URL="/checkforconnection.php";this.SUBMISSION_URL="/data/submission";this.GETSURVEYURL_URL="/launch/get_survey_url";this.uploadOngoingBatchIndex=this.uploadOngoingID=this.currentOnlineStatus=null;this.uploadResult={win:[],fail:[]};this.uploadQueue=[];this.oRosaHelper=new this.ORosaHelper(this);this.init=function(){this.checkOnlineStatus();a=this;window.setInterval(function(){a.checkOnlineStatus()},15E3);$(window).on("offline online",function(){console.log("window network event detected");
a.setOnlineStatus(a.getOnlineStatus())});$(window).trigger("online")}}Connection.prototype.checkOnlineStatus=function(){var a,b=this;navigator.onLine?this.uploadOngoingID||$.ajax({type:"GET",url:this.CONNECTION_URL,cache:!1,dataType:"json",timeout:3E3,complete:function(c){a="undefined"!==typeof c.responseText&&"connected"===c.responseText;b.setOnlineStatus(a)}}):this.setOnlineStatus(!1)};Connection.prototype.getOnlineStatus=function(){return this.currentOnlineStatus};
Connection.prototype.setOnlineStatus=function(a){a!==this.currentOnlineStatus&&(console.log("online status changed to: "+a+", triggering window.onlinestatuschange"),$(window).trigger("onlinestatuschange",a));this.currentOnlineStatus=a};Connection.prototype.cancelSubmissionProcess=function(){this.uploadOngoingBatchIndex=this.uploadOngoingID=null;this.uploadResult={win:[],fail:[]};this.uploadQueue=[]};
Connection.prototype.uploadRecords=function(a,b,c){var d,e,f,b=b||!1,c=c||null;if(!a.name||!a.instanceID||!a.formData||!a.batches||"undefined"==typeof a.batchIndex)return!1;d=$.grep(this.uploadQueue,function(b){return a.instanceID===b.instanceID&&a.batchIndex===b.batchIndex});e=$.grep(this.uploadResult.win,function(b){return a.instanceID===b.instanceID&&a.batchIndex===b.batchIndex});f=this.uploadOngoingID===a.instanceID&&this.uploadOngoingBatchIndex===a.batchIndex;0===d.length&&0===e.length&&!f?(a.forced=
b,this.uploadQueue.push(a),this.uploadOngoingID||(this.uploadResult={win:[],fail:[]},this.uploadBatchesResult={},this.uploadOne(c))):d.forced=b;return!0};
Connection.prototype.uploadOne=function(a){var b,c,d=this,a="undefined"===typeof a||!a?{complete:function(a){$(document).trigger("submissioncomplete");d.processOpenRosaResponse(a.status,{name:b.name,instanceID:b.instanceID,batches:b.batches,batchIndex:b.batchIndex,forced:b.forced});d.uploadOne()},error:function(a,b){"timeout"===b?console.debug("submission request timed out"):console.error("error during submission, textStatus:",b)},success:function(){}}:a;0<this.uploadQueue.length&&(b=this.uploadQueue.pop(),
!1===this.currentOnlineStatus?this.processOpenRosaResponse(0,b):(this.uploadOngoingID=b.instanceID,this.uploadOngoingBatchIndex=b.batchIndex,c=b.formData,c.append("Date",(new Date).toUTCString()),console.debug("prepared to send: ",c),this.setOnlineStatus(null),$(document).trigger("submissionstart"),$.ajax(this.SUBMISSION_URL,{type:"POST",data:c,cache:!1,contentType:!1,processData:!1,timeout:3E5,complete:function(b,c){d.uploadOngoingID=null;d.uploadOngoingBatchIndex=null;a.complete(b,c)},error:a.error,
success:a.success})))};
Connection.prototype.processOpenRosaResponse=function(a,b){var c,d,e,f="";e=[];c="Contact "+settings.supportEmail+" please.";var g="Sorry, the enketo or formhub server is down. Please try again later or contact "+settings.supportEmail+" please.";c={"0":{success:!1,msg:"undefined"!==typeof jrDataStrToEdit?"Uploading of data failed. Please try again.":"Uploading of data failed (maybe offline) and will be tried again later."},200:{success:!1,msg:"Data server did not accept data. "+c},201:{success:!0,
msg:""},202:{success:!0,msg:""},"2xx":{success:!1,msg:"Unknown error occurred when submitting data. "+c},400:{success:!1,msg:"Data server did not accept data. Contact the survey administrator please."},403:{success:!1,msg:"You are not allowed to post data to this data server. Contact the survey administrator please."},404:{success:!1,msg:"Submission service on data server not found or not properly configured."},"4xx":{success:!1,msg:"Unknown submission problem on data server."},413:{success:!1,msg:"Data is too large. Please contact "+
settings.supportEmail+"."},500:{success:!1,msg:g},503:{success:!1,msg:g},"5xx":{success:!1,msg:g}};console.debug("submission results with status: "+a+" for ",b);b.batchText=1<b.batches?" (batch #"+(b.batchIndex+1)+" out of "+b.batches+")":"";if("undefined"!==typeof c[a])if(b.msg=c[a].msg,!0===c[a].success){if(1<b.batches){"undefined"==typeof this.uploadBatchesResult[b.instanceID]&&(this.uploadBatchesResult[b.instanceID]=[]);this.uploadBatchesResult[b.instanceID].push(b.batchIndex);for(c=0;c<b.batches;c++)-1===
$.inArray(c,this.uploadBatchesResult[b.instanceID])&&(d=!0)}d?console.debug("not all batches for instanceID have been submitted, current queue:",this.uploadQueue):$(document).trigger("submissionsuccess",[b.name,b.instanceID]);this.uploadResult.win.push(b)}else!1===c[a].success&&this.uploadResult.fail.push(b);else 401==a?(this.cancelSubmissionProcess(),gui.confirmLogin()):500<a?(console.error("Error during uploading, received unexpected statuscode: "+a),b.msg=c["5xx"].msg,this.uploadResult.fail.push(b)):
400<a?(console.error("Error during uploading, received unexpected statuscode: "+a),b.msg=c["4xx"].msg,this.uploadResult.fail.push(b)):200<a&&(console.error("Error during uploading, received unexpected statuscode: "+a),b.msg=c["2xx"].msg,this.uploadResult.fail.push(b));if(!(0<this.uploadQueue.length)){console.debug("online: "+this.currentOnlineStatus,this.uploadResult);if(0<this.uploadResult.win.length){for(c=0;c<this.uploadResult.win.length;c++)d=this.uploadResult.win[c].name,-1===$.inArray(d,e)&&
(e.push(d),f="undefined"!==typeof this.uploadResult.win[c].msg?f+this.uploadResult.win[c].msg+" ":"");d=1<e.length?" were":" was";e=e.join(", ");gui.feedback(e.substring(0,e.length)+d+" successfully uploaded. "+f);this.setOnlineStatus(!0)}if(0<this.uploadResult.fail.length){f="";if(!1!==this.currentOnlineStatus){for(c=0;c<this.uploadResult.fail.length;c++)this.uploadResult.fail[c].forced&&(f+=this.uploadResult.fail[c].name+this.uploadResult.fail[c].batchText+": "+this.uploadResult.fail[c].msg+"<br />");
f&&gui.alert(f,"Failed data submission")}this.setOnlineStatus(!1)}}};Connection.prototype.maxSubmissionSize=function(){var a,b=this;return"undefined"==typeof this.maxSize&&!this.maxSize?($.ajax("/data/max_size",{type:"GET",async:!1,timeout:5E3,success:function(c){a=parseInt(c,10)||5E6;a=104857600<a?104857600:a;b.maxSize=a},error:function(){a=5E6}}),a):this.maxSize};Connection.prototype.isValidURL=function(a){return/^(https?:\/\/)(([\da-z\.\-]+)\.([a-z\.]{2,6})|(([0-9]{1,3}\.){3}[0-9]{1,3}))([\/\w \.\-]*)*\/?[\/\w \.\-\=\&\?]*$/.test(a)};
Connection.prototype.getFormlist=function(a,b){b=this.getCallbacks(b);this.isValidURL(a)?$.ajax("/forms/get_list",{type:"GET",data:{server_url:a},cache:!1,contentType:"json",timeout:6E4,success:b.success,error:b.error,complete:b.complete}):b.error(null,"validationerror","not a valid URL")};
Connection.prototype.getSurveyURL=function(a,b,c){c=this.getCallbacks(c);!a||!this.isValidURL(a)?c.error(null,"validationerror","not a valid server URL"):!b||0===b.length?c.error(null,"validationerror","not a valid formId"):$.ajax({url:this.GETSURVEYURL_URL,type:"POST",data:{server_url:a,form_id:b},cache:!1,timeout:6E4,dataType:"json",success:c.success,error:c.error,complete:c.complete})};
Connection.prototype.getTransForm=function(a,b,c,d,e){var f=new FormData,e=this.getCallbacks(e),a=a||null,b=b||null,d=d||null,c=c||new Blob;0===c.size&&(!a||!b)&&!d?e.error(null,"validationerror","No form file or URLs provided"):0===c.size&&!this.isValidURL(a)&&!this.isValidURL(d)?e.error(null,"validationerror","Not a valid server or form url"):0===c.size&&!d&&(!b||0===b.length)?e.error(null,"validationerror","No form id provided"):(a&&f.append("server_url",a),b&&f.append("form_id",b),d&&f.append("form_url",
d),c&&f.append("xml_file",c),console.debug("form file: ",c),$.ajax("/transform/get_html_form",{type:"POST",cache:!1,contentType:!1,processData:!1,dataType:"xml",data:f,success:e.success,error:e.error,complete:e.complete}))};Connection.prototype.validateHTML=function(a,b){var c=new FormData,b=this.getCallbacks(b);c.append("level","error");c.append("content",a);$.ajax("/html5validate/",{type:"POST",data:c,contentType:!1,processData:!1,success:b.success,error:b.error,complete:b.complete})};
Connection.prototype.ORosaHelper=function(a){this.fragToServerURL=function(b,c){var d;d="";if(!c)return console.log("nothing to do"),null;console.debug("frag: "+c);if(a.isValidURL(c))return c;switch(b){case "http":case "https":d=/^http(|s):\/\//.test(c)?"":b+"://";d+=c;break;case "formhub_uni":case "formhub":d="https://formhub.org/"+c;break;case "appspot":d="https://"+c+".appspot.com"}if(!a.isValidURL(d))return console.error("not a valid url: "+d),null;console.log("server_url: "+d);return d}};
Connection.prototype.getNumberFormsLaunched=function(a){a=this.getCallbacks(a);$.ajax({url:"/front/get_number_launched_everywhere",dataType:"json",success:a.success,error:a.error,complete:a.complete})};Connection.prototype.loadGoogleMaps=function(a){var b=settings.mapsDynamicAPIKey||"",c=document.createElement("script");window.googleMapsInit=a;c.type="text/javascript";c.src="http://maps.googleapis.com/maps/api/js?v=3.exp&key="+b+"&sensor=false&libraries=places&callback=googleMapsInit";document.body.appendChild(c)};
Connection.prototype.getCallbacks=function(a){a=a||{};a.error=a.error||function(a,c,d){console.error(c+" : "+d)};a.complete=a.complete||function(){};a.success=a.success||function(){console.log("success!")};return a};/*
 Copyright 2012 Martijn van de Rijdt

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
function Cache(){this.CACHE_CHECK_INTERVAL=36E5}
Cache.prototype.init=function(){var a,b=this;if(!this.isSupported)return!1;a=window.applicationCache;if(a.status===a.UPDATEREADY)this.onUpdateReady();if(a.status===a.OBSOLETE)this.onObsolete();$(a).on("obsolete",function(){b.onObsolete()});$(a).on("cached",function(){b.onCached()});$(a).on("updateready",function(){if(a.status===a.UPDATEREADY)b.onUpdateReady()});$(a).on("error",function(a){b.onErrors(a)});$(a).on("noupdate",function(){b.onNoUpdate()});setInterval(function(){b.update()},this.CACHE_CHECK_INTERVAL);
return!0};Cache.prototype.update=function(){window.applicationCache.update()};Cache.prototype.onObsolete=function(){store.removeRecord("__bookmark");gui.confirm({msg:"Refreshing the page may restore it.",heading:"Offline-disabled.",errorMsg:"Application/form is no longer able to launch offline. "},{posButton:"Ok",negButton:"Refresh",posAction:function(){},negAction:function(){document.location.reload(!0)}});gui.updateStatus.offlineLaunch(!1)};
Cache.prototype.onCached=function(){this.showBookmarkMsg("This form works offline!    ",!0);gui.updateStatus.offlineLaunch(!0)};Cache.prototype.onNoUpdate=function(){this.showBookmarkMsg();gui.updateStatus.offlineLaunch(!0)};Cache.prototype.onUpdateReady=function(){applicationCache.swapCache();gui.feedback("A new version of this application or form has been downloaded. Refresh this page to load the updated version.",20,"Updated!",{posButton:"Refresh",negButton:"Cancel",posAction:function(){document.location.reload(!0)}})};
Cache.prototype.onErrors=function(a){!0===connection.currentOnlineStatus&&(console.error("HTML5 cache error event",a),gui.alert('There is a new version of this application or form available but an error occurs when trying to download it. Please try to refresh the page or send a bug report to <a href="mailto:'+settings.supportEmail+'">'+settings.supportEmail+"</a>."))};
Cache.prototype.showBookmarkMsg=function(a,b){var c,a=a||"",b=b||!1;c=(c=store.getRecord("__bookmark"))?c.shown:0;if(b||3>c)gui.feedback(a+"Bookmark this form for easy offline access. ",15),c++,store.setRecord("__bookmark",{shown:c})};Cache.prototype.isSupported=function(){return window.applicationCache?!0:!1};/*
 Copyright 2012 Martijn van de Rijdt & Modilabs

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
var connection,store,cache;window.addEventListener("load",function(){setTimeout(function(){window.scrollTo(0,1)},0)},!1);
$(document).ready(function(){var a,b={placement:"top",trigger:"click"},c={formhub:{tit:"Enter formhub account name",ex:"e.g. formhub_u",inp:"enter formhub account name"},formhub_uni:{tit:"Enter formhub account name",ex:"e.g. formhub_u",inp:"enter formhub account name",val:"formhub_u"},appspot:{tit:"Enter appspot subdomain name",ex:"e.g. opendatakit",inp:"enter appspot subdomain name"},http:{tit:"Enter http web address",ex:"e.g. formhub.org/formhub_u",inp:"enter web address"},https:{tit:"Enter https web address",
ex:"e.g. formhub.org/formhub_u",inp:"enter web address"}};connection=new Connection;store=new StorageLocal;$("html").attr("manifest")&&(cache=new Cache,cache.isSupported()&&(cache.init(),$(document).trigger("browsersupport","offline-launch")));gui.setup();a=gui.pages.get("settings");$("body").on("touchstart.dropdown",".dropdown-menu",function(a){a.stopPropagation()});a.find(".url-helper a").click(function(){var d,e;$(this).parent().addClass("active").siblings().removeClass("active");d=$(this).attr("data-value")||
settings.defaultServerURLHelper;d=c[d];e=d.val||"";a.find("input#server").attr("placeholder",d.inp).attr("title",d.tit).attr("data-content",d.ex).popover("destroy").popover(b);a.find("input#server").val()!==e&&a.find("input#server").val(e).trigger("change")}).addBack().find('[data-value="'+settings.defaultServerURLHelper+'"]').click();a.find("input#server").change(function(){a.find(".go").click()}).popover(b);$(document).on("click","#refresh-list, #page .go",function(){var b,c=a.find("input#server").val(),
f=a.find(".url-helper li.active > a").attr("data-value");if($("progress").css("display")==="none"){b={server:connection.oRosaHelper.fragToServerURL(f,c),helper:a.find(".url-helper li.active > a").attr("data-value"),inputValue:a.find("input#server").val()};if(b.server){$("progress").show();connection.getFormlist(b.server,{success:function(a,c){processFormlistResponse(a,c,b)},error:function(a){processFormlistResponse([],"",b,true);if(a.status===401){gui.confirmLogin("<p>This server requires you to login to view forms.</p><p>Would you like to login now?</p>",
b.server);store.setRecord("__current_server",{url:b.server,helper:b.helper,inputValue:b.inputValue,refresh:true},false,true)}}})}else processFormlistResponse([],null,b,true)}$('#page .close, header a:not(.collapsed)[data-toggle="collapse"]').click()});$("#form-list").on("click","a",function(){var a,b,c=$(this).attr("href");if(!c||c===""||c==="#"){console.log("going to request enketo url");a=$(this).attr("data-server");b=$(this).attr("id");connection.getSurveyURL(a,b,{success:function(c,f){c.serverURL=
a;c.formId=b;processSurveyURLResponse(c,f)}})}else return true;return false});$("#page").on("change",function(){a.find("input#server").popover("hide")});loadPreviousState();$(window).on("resize",function(){$(".paper").css("min-height",gui.fillHeight($(".paper")));$("#form-list li").length===0&&(!gui.pages.isShowing()&&!$("header nav").hasClass("in"))&&showVirginHint()}).trigger("resize")});
function loadPreviousState(){var a;a=gui.pages.get("settings");var b=store.getRecord("__current_server");b&&b.url&&(a.find(".url-helper li").removeClass("active").find('[data-value="'+b.helper+'"]').parent("li").addClass("active"),a.find("input#server").val(b.inputValue),a=store.getFormList(b.url),gui.parseFormlist(a,$("#form-list")),console.log("server state: ",b),"undefined"!==typeof b.refresh&&!0===b.refresh&&($("#refresh-list").click(),b.refresh=!1,store.setRecord("__current_server",b)))}
function showVirginHint(){var a,b;b=$('header a[data-toggle="collapse"]');a=$('nav [href="#settings"]');var c=b.is(":visible")?b:a;b.add(a).popover("destroy");c.popover({placement:"bottom",trigger:"manual",title:"load forms",content:"Go to settings to load a list of your forms."}).popover("show");b=c.next(".popover");a=b.offset().left;b.css({left:"auto",right:"17px"});a-=b.offset().left;b.find(".arrow").css("left",b.outerWidth()/2+a+"px");b.add(c).add("nav ul li a").click(function(){c.popover("destroy")})}
function processFormlistResponse(a,b,c,d){console.log("processing formlist response");"object"===typeof a&&!$.isEmptyObject(a)?(store.setRecord("__server_"+c.server,a,!1,!0),store.setRecord("__current_server",{url:c.server,helper:c.helper,inputValue:c.inputValue},!1,!0)):d&&(showVirginHint(),store.removeRecord("__current_server"));$("progress").hide();gui.parseFormlist(a,$("#form-list"),d)}
function processSurveyURLResponse(a){var b=a.url||null,c=a.serverURL||null,d=a.formId||null;console.debug(a);console.debug("processing link to:  "+b);b&&(c&&d)&&(a=store.getRecord("__server_"+c)||{},a[d].url=b,store.setRecord("__server_"+c,a,!1,!0),window.location=b)}Cache.prototype.showBookmarkMsg=function(){};
Cache.prototype.informUpdate=function(){return gui.confirm({msg:'<div class="alert alert-success">A new version of this application has been downloaded.</div><br/> Refresh the window to start using it.',heading:"Updated!"},{posButton:"Refresh",negButton:"Cancel",posAction:function(){document.location.reload(!0)}})};