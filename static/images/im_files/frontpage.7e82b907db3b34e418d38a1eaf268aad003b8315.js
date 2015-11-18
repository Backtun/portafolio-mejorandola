define("app/ui/login_form",["module","require","exports","core/component"],function(module, require, exports) {
function loginForm(){this.defaultAttrs({forgotPasswordLinkSelector:".forgot",accountIdentifierInputSelector:'[name="session[username_or_email]"]'}),this.navigateToPasswordReset=function(a){a.stopPropagation(),a.preventDefault();var b=this.$accountIdentifierInput.val(),c=b?"?account_identifier="+encodeURIComponent(b):"";this.trigger("uiNavigate",{href:this.forgotPasswordHref+c})},this.after("initialize",function(){this.$accountIdentifierInput=this.select("accountIdentifierInputSelector"),this.forgotPasswordHref=this.select("forgotPasswordLinkSelector").attr("href"),this.on("click",{forgotPasswordLinkSelector:this.navigateToPasswordReset})})}var defineComponent=require("core/component");module.exports=defineComponent(loginForm)
});
define("app/data/frontpage_scribe",["module","require","exports","core/component","app/data/with_scribe"],function(module, require, exports) {
function frontpageScribe(){this.frontpageScribes={signin:{component:"login_callout",element:"form",action:"login_click"},signup:{component:"signup_callout",element:"form",action:"signup_click"},search:{component:"main",element:"search_field",action:"search"},language:{component:"footer",element:"language_selector",action:"select"}},this.scribeFrontpageForm=function(a,b){var c=a.target.className.match(/signin|signup|language|search/);c.length&&this.scribe(this.frontpageScribes[c[0]])},this.scribeFrontpageLink=function(a,b){var c=a.target.className;c=="signup-welcome-link"?this.scribe({component:"lifeline",element:"welcome_text",action:"signup_click"}):c.indexOf("app-store")!=-1?this.scribe({page:"front",section:"front",component:"download",element:"ios",action:"click"}):c.indexOf("google-play")!=-1?this.scribe({page:"front",section:"front",component:"download",element:"android",action:"click"}):$(a.target).parent().hasClass("devices-link")?this.scribe({page:"front",section:"front",component:"download",element:"other",action:"click"}):c.indexOf("tweet-text")!=-1?this.scribe({page:"front",section:"front",component:"tweet",element:"lohp_tweet_text",action:"click"}):c.indexOf("tweet-username")!=-1?this.scribe({page:"front",section:"front",component:"tweet",element:"lohp_tweet_username",action:"click"}):c.indexOf("tweet-time")!=-1&&this.scribe({page:"front",section:"front",component:"tweet",element:"lohp_tweet_time",action:"click"})},this.after("initialize",function(){this.on("submit",this.scribeFrontpageForm),this.on("click",this.scribeFrontpageLink)})}var defineComponent=require("core/component"),withScribe=require("app/data/with_scribe");module.exports=defineComponent(frontpageScribe,withScribe)
});
define("app/ui/cookie_warning",["module","require","exports","core/component"],function(module, require, exports) {
function cookieWarning(){this.cookiesEnabled=function(){var a=!!navigator.cookieEnabled;if(typeof navigator.cookieEnabled=="undefined"||$.browser.msie)document.cookie="cookies_enabled",a=document.cookie.indexOf("cookies_enabled")!=-1;return a},this.showWarning=function(){this.cookiesEnabled()||this.$node.show("fast")},this.after("initialize",function(){this.on(document,"uiSwiftLoaded",this.showWarning)})}var component=require("core/component");module.exports=component(cookieWarning)
});
define("app/ui/track_ga_events",["module","require","exports","core/component"],function(module, require, exports) {
function trackGAEvent(){this.defaultAttrs({signinSelector:".signin-wrapper, .js-front-signin, .signin-dialog-body",incompleteNUXSelector:".StartPreviewLinks .js-skip-step"}),this.trackIncompleteNUX=function(){this.trigger("GATrackEvent",{gaEvent:"NUX-not-complete"})},this.trackExistingUserSignin=function(){this.trigger("GATrackEvent",{gaEvent:"existing-user-signin"})},this.after("initialize",function(){this.on("submit",{signinSelector:this.trackExistingUserSignin}),this.on("click",{incompleteNUXSelector:this.trackIncompleteNUX})})}var defineComponent=require("core/component"),TrackGAEvent=defineComponent(trackGAEvent);module.exports=TrackGAEvent
});
define("app/ui/macaw_nymizer_signin_conversion",["module","require","exports","core/component"],function(module, require, exports) {
function macawNymizerSigninConversion(){this.defaultAttrs({signinSelector:".signin-wrapper, .js-front-signin, .signin-dialog-body"}),this.signinConversion=function(){this.trigger("MNConversion",{mnType:"signin"})},this.after("initialize",function(){this.on("submit",{signinSelector:this.signinConversion})})}var defineComponent=require("core/component"),MacawNymizerSigninConversion=defineComponent(macawNymizerSigninConversion);module.exports=MacawNymizerSigninConversion
});
define("app/ui/search_input",["module","require","exports","core/component"],function(module, require, exports) {
function searchInput(){this.defaultAttrs({magnifyingGlassSelector:".js-search-action",inputFieldSelector:"#search-query",query:"",searchPathWithQuery:"/search?q=query&src=typd",focusClass:"focus"}),this.addFocusStyles=function(a){this.$node.addClass(this.attr.focusClass),this.$input.addClass(this.attr.focusClass),this.trigger("uiSearchInputFocused")},this.removeFocusStyles=function(a){this.$node.removeClass(this.attr.focusClass),this.$input.removeClass(this.attr.focusClass)},this.executeTypeaheadSelection=function(a,b){b.source!="account"&&this.$input.val(b.display);if(b.isClick)return;this.trigger("uiNavigate",{href:b.href})},this.submitQuery=function(a,b){this.trigger("uiSearchQuery",{query:b.query,source:"search"}),this.trigger("uiNavigate",{href:this.attr.searchPathWithQuery.replace("query",encodeURIComponent(b.query))})},this.searchFormSubmit=function(a,b){a.preventDefault(),this.trigger(this.$input,"uiTypeaheadInputSubmit")},this.after("initialize",function(){this.$input=this.select("inputFieldSelector"),this.$input.val(this.attr.query),this.on("uiTypeaheadItemSelected",this.executeTypeaheadSelection),this.on("uiTypeaheadSubmitQuery",this.submitQuery),this.on(this.$input,"focus",this.addFocusStyles),this.on(this.$input,"blur",this.removeFocusStyles),this.on("submit",this.searchFormSubmit),this.on(this.select("magnifyingGlassSelector"),"click",this.searchFormSubmit)})}var defineComponent=require("core/component");module.exports=defineComponent(searchInput)
});
define("app/data/search_input_scribe",["module","require","exports","core/component","app/data/with_scribe","app/utils/scribe_item_types"],function(module, require, exports) {
function searchInputScribe(){var a={account:function(a){var b={message:a.input,items:[{id:a.query,item_type:itemTypes.user,position:a.index}],format_version:2,event_info:a.item?a.item.origin:undefined};this.scribe("profile_click",a,b)},search:function(b){if(this.lastCompletion&&b.query===this.lastCompletion.query)a.topics.call(this,this.lastCompletion);else{var c={items:[{item_query:b.query,item_type:itemTypes.search}],format_version:2};this.scribe("search",b,c)}},topics:function(a){var b={message:a.input,items:[{item_query:a.query,item_type:itemTypes.search,position:a.index}],format_version:2};this.scribe("search",a,b)},account_search:function(a){this.scribe("people_search",a,{query:a.input})},saved_search:function(a){var b={message:a.input,items:[{item_query:a.query,item_type:itemTypes.savedSearch,position:a.index}],format_version:2};this.scribe({element:"saved_search",action:"search"},a,b)},recent_search:function(a){var b={message:a.input,items:[{item_query:a.query,item_type:itemTypes.search,position:a.index}],format_version:2};this.scribe({element:"recent_search",action:"search"},a,b)},concierge:function(a){var b={message:a.input,items:[{item_query:a.query,item_type:itemTypes.search,position:a.index}],format_version:2};this.scribe({element:"typeahead_concierge",action:"search"},a,b)}};this.storeCompletionData=function(a,b){a.type=="uiTypeaheadItemSelected"||a.type=="uiSearchQuery"?this.scribeSelection(a,b):b.fromSelectionEvent||(this.lastCompletion=b)},this.scribeSelection=function(b,c){a[c.source]&&a[c.source].call(this,c)},this.after("initialize",function(){this.scribeOnEvent("uiSearchInputFocused","focus_field"),this.on("uiTypeaheadItemComplete uiTypeaheadItemSelected uiSearchQuery",this.storeCompletionData)})}var defineComponent=require("core/component"),withScribe=require("app/data/with_scribe"),itemTypes=require("app/utils/scribe_item_types");module.exports=defineComponent(searchInputScribe,withScribe)
});
define("app/data/typeahead/with_cache",["module","require","exports"],function(module, require, exports) {
function WithCache(){this.defaultAttrs({cache_limit:10}),this.getCachedSuggestions=function(a){return this.cache[a]?this.cache[a].value:null},this.clearCache=function(){this.cache={NEWEST:null,OLDEST:null,COUNT:0,LIMIT:this.attr.cache_limit}},this.deleteCachedSuggestions=function(a){return this.cache[a]?(this.cache.COUNT>1&&(a==this.cache.NEWEST.query?(this.cache.NEWEST=this.cache.NEWEST.before,this.cache.NEWEST.after=null):a==this.cache.OLDEST.query?(this.cache.OLDEST=this.cache.OLDEST.after,this.cache.OLDEST.before=null):(this.cache[a].after.before=this.cache[a].before,this.cache[a].before.after=this.cache[a].after)),delete this.cache[a],this.cache.COUNT-=1,!0):!1},this.setCachedSuggestions=function(a,b){if(this.cache.LIMIT===0)return;this.deleteCachedSuggestions(a),this.cache.COUNT>=this.cache.LIMIT&&this.deleteCachedSuggestions(this.cache.OLDEST.query),this.cache.COUNT==0?(this.cache[a]={query:a,value:b,before:null,after:null},this.cache.NEWEST=this.cache[a],this.cache.OLDEST=this.cache[a]):(this.cache[a]={query:a,value:b,before:this.cache.NEWEST,after:null},this.cache.NEWEST.after=this.cache[a],this.cache.NEWEST=this.cache[a]),this.cache.COUNT+=1},this.aroundGetSuggestions=function(a,b,c){var d=c.id+":"+c.query,e=this.getCachedSuggestions(d);if(e){this.triggerSuggestionsEvent(c.id,c.query,e);return}a(b,c)},this.afterTriggerSuggestionsEvent=function(a,b,c,d){if(d)return;var e=a+":"+b;this.setCachedSuggestions(e,c)},this.after("triggerSuggestionsEvent",this.afterTriggerSuggestionsEvent),this.around("getSuggestions",this.aroundGetSuggestions),this.after("initialize",function(){this.clearCache(),this.on("uiTypeaheadDeleteRecentSearch",this.clearCache)})}module.exports=WithCache
});
define("app/utils/typeahead_helpers",["module","require","exports"],function(module, require, exports) {
function tokenizeText(a){return a.trim().toLowerCase().split(/[\s_,.-]+/)}function getFirstChar(a){var b;return multiByteRegex.test(a.substr(0,1))?b=a.substr(0,2):b=a.charAt(0),b}var multiByteRegex=/[\uD800-\uDFFF]/;module.exports={tokenizeText:tokenizeText,getFirstChar:getFirstChar}
});
define("app/data/with_datasource_helpers",["module","require","exports","app/data/user_info"],function(module, require, exports) {
function withDatasourceHelpers(){this.prefetch=function(a,b){var c={prefetch:!0,result_type:b,count:this.getPrefetchCount(),media_tagging_in_prefetch:this.shouldIncludeCanMediaTag(),experiments:!!this.attr.typeaheadExperiments&&this.attr.typeaheadExperiments.join(",")};c[b+"_cache_age"]=this.storage.getCacheAge(this.attr.storageHash,this.attr.ttl_ms),this.get({url:a,headers:{"X-Phx":!0},data:c,eventData:{},success:this.processResults.bind(this),error:this.useStaleData.bind(this)})},this.useStaleData=function(){this.extendTTL(),this.getDataFromLocalStorage()},this.extendTTL=function(){var a=this.getStorageKeys();for(var b=0;b<a.length;b++)this.storage.updateTTL(a[b],this.attr.ttl_ms)},this.loadData=function(a,b){var c=this.getStorageKeys().some(function(a){return this.storage.isExpired(a)},this);c||this.isMetadataExpired()?this.prefetch(a,b):this.getDataFromLocalStorage()},this.isIE8=function(){return $.browser.msie&&parseInt($.browser.version,10)===8},this.getProtocol=function(){return window.location.protocol},this.shouldIncludeCanMediaTag=function(){return userInfo.getDecider("enable_media_tag_prefetch")}}var userInfo=require("app/data/user_info");module.exports=withDatasourceHelpers
});
define("app/data/typeahead/accounts_datasource",["module","require","exports","app/utils/typeahead_helpers","app/utils/storage/custom","app/data/with_data","core/compose","core/utils","app/data/with_datasource_helpers"],function(module, require, exports) {
function accountsDatasource(a){this.attr={id:null,ttl_ms:1728e5,localStorageCount:1200,ie8LocalStorageCount:1e3,limit:6,version:4,localQueriesEnabled:!1,remoteQueriesEnabled:!1,onlyDMable:!1,onlyShowUsersWithCanMediaTag:!1,currentUserId:null,storageAdjacencyList:"userAdjacencyList",storageHash:"userHash",storageProtocol:"protocol",storageVersion:"userVersion",remotePath:"/i/search/typeahead.json",remoteType:"users",prefetchPath:"/i/search/typeahead.json",prefetchType:"users",storageBlackList:"userBlackList",maxLengthBlacklist:100,typeaheadExperiments:[]},this.attr=util.merge(this.attr,a),this.after=$.noop,this.defaultAttrs=$.noop,compose.mixin(this,[withData,withDatasourceHelpers]),this.getPrefetchCount=function(){return this.isIE8()&&this.attr.localStorageCount>this.attr.ie8LocalStorageCount?this.attr.ie8LocalStorageCount:this.attr.localStorageCount},this.isMetadataExpired=function(){var a=this.storage.getItem(this.attr.storageVersion),b=this.storage.getItem(this.attr.storageProtocol);return a==this.attr.version&&b==this.getProtocol()?!1:!0},this.getStorageKeys=function(){return[this.attr.storageVersion,this.attr.storageHash,this.attr.storageAdjacencyList,this.attr.storageProtocol]},this.getDataFromLocalStorage=function(){this.userHash=this.storage.getItem(this.attr.storageHash)||this.userHash,this.adjacencyList=this.storage.getItem(this.attr.storageAdjacencyList)||this.adjacencyList},this.processResults=function(a){if(!a||!a[this.attr.prefetchType]){this.useStaleData();return}a[this.attr.prefetchType].forEach(function(a){a.tokens=a.tokens.map(function(a){return typeof a=="string"?a:a.token}),a.prefetched=!0,this.userHash[a.id]=a,a.tokens.forEach(function(b){var c=helpers.getFirstChar(b);c.trim().length&&(this.adjacencyList[c]===undefined&&(this.adjacencyList[c]=[]),this.adjacencyList[c].indexOf(a.id)===-1&&this.adjacencyList[c].push(a.id))},this)},this),this.storage.setItem(this.attr.storageHash,this.userHash,this.attr.ttl_ms),this.storage.setItem(this.attr.storageAdjacencyList,this.adjacencyList,this.attr.ttl_ms),this.storage.setItem(this.attr.storageVersion,this.attr.version,this.attr.ttl_ms),this.storage.setItem(this.attr.storageProtocol,this.getProtocol(),this.attr.ttl_ms)},this.getLocalSuggestions=function(a){if(!this.attr.localQueriesEnabled)return[];var b=helpers.tokenizeText(a.query.replace("@","")),c=this.getPotentiallyMatchingIds(b),d=this.getAccountsFromIds(c),e=d.filter(this.matcher(b));return e.sort(this.sorter),e=e.slice(0,this.attr.limit),e},this.getPotentiallyMatchingIds=function(a){var b=[];return a.map(function(a){var c=this.adjacencyList[helpers.getFirstChar(a)];c&&(b=b.concat(c))},this),b=util.uniqueArray(b),b},this.getAccountsFromIds=function(a){var b=[];return a.forEach(function(a){var c=this.userHash[a];c&&b.push(c)},this),b},this.matcher=function(a){return function(b){var c=b.tokens,d=[];if(this.attr.onlyDMable&&!b.is_dm_able)return!1;if(!this.isEligibleForMediaTagSuggestion(b))return!1;var e=a.every(function(a){var b=c.filter(function(b){return b.indexOf(a)===0});return b.length});if(e)return b}.bind(this)},this.sorter=function(a,b){function e(a,b){var c=a.score_boost?a.score_boost:0,d=b.score_boost?b.score_boost:0,e=a.rounded_score?a.rounded_score:0,f=b.rounded_score?b.rounded_score:0;return f+d-(e+c)}var c=a.prefetched,d=b.prefetched;return c&&!d?-1:d&&!c?1:e(a,b)},this.processRemoteSuggestions=function(a,b,c){var d=c[this.attr.id]||[],e={};return d.forEach(function(a){e[a.id]=!0},this),this.requiresRemoteSuggestions(a.queryData)&&b[this.attr.remoteType]&&b[this.attr.remoteType].forEach(function(a){!e[a.id]&&(!this.attr.onlyDMable||a.is_dm_able)&&this.isEligibleForMediaTagSuggestion(a)&&d.push(a)},this),c[this.attr.id]=d.slice(0,this.attr.limit),c[this.attr.id].forEach(function(a){this.removeBlacklistSocialContext(a)},this),c},this.removeBlacklistSocialContext=function(a){a.first_connecting_user_id in this.socialContextBlackList&&(a.first_connecting_user_name=undefined,a.first_connecting_user_id=undefined)},this.requiresRemoteSuggestions=function(a){return!a||!a.query?!1:a.accountsWithoutAtSignLocalOnly?this.attr.remoteQueriesEnabled&&(helpers.getFirstChar(a.query)=="@"||a.atSignRemoved):this.attr.remoteQueriesEnabled},this.isEligibleForMediaTagSuggestion=function(a){return!this.attr.onlyShowUsersWithCanMediaTag||a.can_media_tag||a.id==this.attr.currentUserId},this.initialize=function(){var a=customStorage({withExpiry:!0});this.storage=new a("typeahead"),this.adjacencyList={},this.userHash={},this.attr.localQueriesEnabled&&this.loadData(this.attr.prefetchPath,this.attr.prefetchType),this.socialContextBlackList=this.storage.getItem(this.attr.storageBlackList)||{}},this.initialize()}var helpers=require("app/utils/typeahead_helpers"),customStorage=require("app/utils/storage/custom"),withData=require("app/data/with_data"),compose=require("core/compose"),util=require("core/utils"),withDatasourceHelpers=require("app/data/with_datasource_helpers");module.exports=accountsDatasource
});
define("app/data/typeahead/saved_searches_datasource",["module","require","exports","core/utils"],function(module, require, exports) {
function savedSearchesDatasource(a){this.attr={id:null,items:[],limit:0,searchPathWithQuery:"/search?src=savs&q=",querySource:"saved_search_click"},this.attr=util.merge(this.attr,a),this.getRemoteSuggestions=function(a,b,c){return c},this.requiresRemoteSuggestions=function(a){return!1},this.getLocalSuggestions=function(a){return!a||!a.query?this.attr.items:this.attr.items.filter(function(b){return b.name.indexOf(a.query)==0}).slice(0,this.attr.limit)},this.addSavedSearch=function(a){if(!a||!a.query)return;this.attr.items.push({id:a.id,id_str:a.id_str,name:a.name,query:a.query,saved_search_path:this.attr.searchPathWithQuery+encodeURIComponent(a.query),search_query_source:this.attr.querySource})},this.removeSavedSearch=function(a){if(!a||!a.query)return;var b=this.attr.items;for(var c=0;c<b.length;c++)if(b[c].query===a.query||b[c].name===a.query){b.splice(c,1);return}}}var util=require("core/utils");module.exports=savedSearchesDatasource
});
define("app/data/typeahead/recent_searches_datasource",["module","require","exports","core/utils","app/utils/storage/custom","app/data/with_datasource_helpers"],function(module, require, exports) {
function recentSearchesDatasource(a){this.attr={id:null,limit:4,storageList:"recentSearchesList",maxLength:100,ttl_ms:12096e5,searchPathWithQuery:"/search?src=typd&q=",querySource:"typed_query"},this.attr=util.merge(this.attr,a),this.getRemoteSuggestions=function(a,b,c){return c},this.requiresRemoteSuggestions=function(){return!1},this.removeAllRecentSearches=function(){this.items=[],this.updateStorage()},this.getLocalSuggestions=function(a){return!a||a.query===""?this.items.slice(0,this.attr.limit):this.items.filter(function(b){return b.name.indexOf(a.query)==0}).slice(0,this.attr.limit)},this.updateStorage=function(){this.storage.setItem(this.attr.storageList,this.items,this.attr.ttl_ms)},this.removeOneRecentSearch=function(a){this.removeRecentSearchFromList(a.query),this.updateStorage()},this.addRecentSearch=function(a){if(!a||!a.query)return;a.query=a.query.trim(),this.updateRecentSearchList(a),this.updateStorage()},this.updateRecentSearchList=function(a){var b=this.items,c={normalized_name:a.query.toLowerCase(),name:a.query,recent_search_path:this.attr.searchPathWithQuery+encodeURIComponent(a.query),search_query_source:this.attr.querySource};this.removeRecentSearchFromList(a.query),b.unshift(c),b.length>this.attr.maxLength&&b.pop()},this.removeRecentSearchFromList=function(a){var b=this.items,c=-1,d=a.toLowerCase();for(var e=0;e<b.length;e++)if(b[e].normalized_name===d){c=e;break}c!==-1&&b.splice(c,1)},this.initialize=function(){var a=customStorage({withExpiry:!0});this.storage=new a("typeahead"),this.items=this.storage.getItem(this.attr.storageList)||[]},this.initialize()}var util=require("core/utils"),customStorage=require("app/utils/storage/custom"),withDatasourceHelpers=require("app/data/with_datasource_helpers");module.exports=recentSearchesDatasource
});
define("app/data/typeahead/with_external_event_listeners",["module","require","exports","app/utils/typeahead_helpers"],function(module, require, exports) {
function WithExternalEventListeners(){this.defaultAttrs({weights:{CACHED_PROFILE_VISIT:10,UNCACHED_PROFILE_VISIT:75,FOLLOW:100}}),this.cleanupUserData=function(a){this.removeAccount(a),this.addToUserBlacklist(a)},this.onFollowStateChange=function(a,b){if(!b.userId)return;switch(b.newState){case"blocked":this.cleanupUserData(b.userId);break;case"not-following":this.cleanupUserData(b.userId);break;case"following":b.user&&(this.adjustScoreBoost(b.user,this.attr.weights.FOLLOW),this.addAccount(b.user,"following"),this.removeUserFromBlacklist(b.userId))}this.updateLocalStorage()},this.onProfileVisit=function(a,b){var c=this.datasources.accounts.userHash[b.id];c?this.adjustScoreBoost(c,this.attr.weights.CACHED_PROFILE_VISIT):(this.adjustScoreBoost(b,this.attr.weights.UNCACHED_PROFILE_VISIT),this.addAccount(b,"visit")),this.updateLocalStorage()},this.updateLocalStorage=function(){this.datasources.accounts.storage.setItem("userHash",this.datasources.accounts.userHash,this.datasources.accounts.attr.ttl),this.datasources.accounts.storage.setItem("adjacencyList",this.datasources.accounts.adjacencyList,this.datasources.accounts.attr.ttl),this.datasources.accounts.storage.setItem("version",this.datasources.accounts.attr.version,this.datasources.accounts.attr.ttl)},this.removeAccount=function(a){if(!this.datasources.accounts.userHash[a])return;var b=this.datasources.accounts.userHash[a].tokens;b.forEach(function(b){var c=this.datasources.accounts.adjacencyList[b.charAt(0)];if(!c)return;var d=c.indexOf(a);if(d===-1)return;c.splice(d,1)},this),delete this.datasources.accounts.userHash[a]},this.adjustScoreBoost=function(a,b){a.score_boost?a.score_boost+=b:a.score_boost=b},this.addAccount=function(a,b){this.datasources.accounts.userHash[a.id]=a,a.tokens=["@"+a.screen_name,a.screen_name].concat(helpers.tokenizeText(a.name)),a.social_proof=b==="following"?1:0,a.tokens.forEach(function(b){var c=b.charAt(0);if(!b.trim().length)return;if(!this.datasources.accounts.adjacencyList[c]){this.datasources.accounts.adjacencyList[c]=[a.id];return}this.datasources.accounts.adjacencyList[c].indexOf(a.id)===-1&&this.datasources.accounts.adjacencyList[c].push(a.id)},this)},this.removeOldAccountsInBlackList=function(){var a,b,c=0,d=this.datasources.accounts.attr.maxLengthBlacklist||100,e=this.datasources.accounts.socialContextBlackList,f=(new Date).getTime(),g=this.datasources.accounts.attr.ttl_ms;for(b in e){var h=e[b]+g;h<f?delete e[b]:(a=a||b,a=e[a]>e[b]?b:a,c+=1)}d<c&&delete e[a]},this.updateBlacklistLocalStorage=function(a){this.datasources.accounts.storage.setItem("userBlackList",a,this.attr.ttl)},this.addToUserBlacklist=function(a){var b=this.datasources.accounts.socialContextBlackList;b[a]=(new Date).getTime(),this.removeOldAccountsInBlackList(),this.updateBlacklistLocalStorage(b)},this.removeUserFromBlacklist=function(a){var b=this.datasources.accounts.socialContextBlackList;this.removeOldAccountsInBlackList(),b[a]&&(delete b[a],this.updateBlacklistLocalStorage(b))},this.checkItemTypeForRecentSearch=function(a){return a==="saved_search"||a==="topics"||a==="recent_search"?!0:!1},this.addSavedSearch=function(a,b){this.datasources.savedSearches.addSavedSearch(b)},this.removeSavedSearch=function(a,b){this.datasources.savedSearches.removeSavedSearch(b)},this.addRecentSearch=function(a,b){b.source==="search"?this.datasources.recentSearches.addRecentSearch({query:b.query}):this.checkItemTypeForRecentSearch(b.source)&&b.isSearchInput&&this.datasources.recentSearches.addRecentSearch({query:b.query})},this.removeRecentSearch=function(a,b){b.deleteAll?this.datasources.recentSearches.removeAllRecentSearches():this.datasources.recentSearches.removeOneRecentSearch(b),$(a.target).trigger("dataTypeaheadRecentSearchDeleted")},this.updateSelectedUsers=function(a,b){this.datasources.selectedUsers.updateSelectedUsers(b)},this.setTrendLocations=function(a,b){this.datasources.trendLocations.setTrendLocations(b)},this.updatePrefill=function(a,b){this.datasources.prefillUsers.updateRecentlySelectedUsers(b)},this.setupEventListeners=function(a){switch(a){case"accounts":this.on("dataFollowStateChange",this.onFollowStateChange),this.on("profileVisit",this.onProfileVisit);break;case"savedSearches":this.on(document,"dataAddedSavedSearch",this.addSavedSearch),this.on(document,"dataRemovedSavedSearch",this.removeSavedSearch);break;case"recentSearches":this.on("uiSearchQuery uiTypeaheadItemSelected",this.addRecentSearch),this.on("uiTypeaheadDeleteRecentSearch",this.removeRecentSearch);break;case"trendLocations":this.on(document,"dataLoadedTrendLocations",this.setTrendLocations);break;case"selectedUsers":this.on("uiUpdatedSelectedUsers",this.updateSelectedUsers);break;case"prefillUsers":this.on("uiUpdateRecentTags",this.updatePrefill)}}}var helpers=require("app/utils/typeahead_helpers");module.exports=WithExternalEventListeners
});
define("app/data/typeahead/topics_datasource",["module","require","exports","app/utils/typeahead_helpers","app/utils/storage/custom","app/data/with_data","core/compose","core/utils","app/data/with_datasource_helpers","core/i18n"],function(module, require, exports) {
function topicsDatasource(a){this.attr={id:null,ttl_ms:216e5,limit:4,version:4,storageAdjacencyList:"topicsAdjacencyList",storageHash:"topicsHash",storageVersion:"topicsVersion",prefetchLimit:500,localQueriesEnabled:!1,remoteQueriesEnabled:!1,remotePath:"/i/search/typeahead.json",remoteType:"topics",prefetchPath:"/i/search/typeahead.json",prefetchType:"topics",basePath:"/search?",modePathMap:{images:"mode=photos",videos:"mode=videos",news:"mode=news",users:"mode=users"},querySourcePathTypeahead:"src=tyah"},this.attr=util.merge(this.attr,a),this.after=$.noop,this.defaultAttrs=$.noop,compose.mixin(this,[withData,withDatasourceHelpers]),this.getStorageKeys=function(){return[this.attr.storageVersion,this.attr.storageHash,this.attr.storageAdjacencyList]},this.getPrefetchCount=function(){return this.attr.prefetchLimit},this.isMetadataExpired=function(){var a=this.storage.getItem(this.attr.storageVersion);return a!==this.attr.version},this.getDataFromLocalStorage=function(){this.topicsHash=this.storage.getItem(this.attr.storageHash)||this.topicsHash,this.adjacencyList=this.storage.getItem(this.attr.storageAdjacencyList)||this.adjacencyList},this.processResults=function(a){if(!a||!a[this.attr.prefetchType]){this.useStaleData();return}a[this.attr.prefetchType].forEach(function(a){var b=a.topic;a.searchPath=this.constructSearchPath(b,null),this.topicsHash[b]=a,a.tokens.forEach(function(a){var c=helpers.getFirstChar(a.token);this.adjacencyList[c]===undefined&&(this.adjacencyList[c]=[]),this.adjacencyList[c].indexOf(b)===-1&&this.adjacencyList[c].push(b)},this)},this),this.storage.setItem(this.attr.storageHash,this.topicsHash,this.attr.ttl_ms),this.storage.setItem(this.attr.storageAdjacencyList,this.adjacencyList,this.attr.ttl_ms),this.storage.setItem(this.attr.storageVersion,this.attr.version,this.attr.ttl_ms)},this.getLocalSuggestions=function(a){if(!this.attr.localQueriesEnabled)return[];var b=a.query.toLowerCase(),c=helpers.getFirstChar(b);if(this.attr.remoteType=="hashtags"&&HASHTAG_CHARS.indexOf(c)===-1)return[];var d=this.adjacencyList[c]||[];d=this.getTopicObjectsFromStrings(d);var e=d.filter(function(a){return a.topic.toLowerCase().indexOf(b)===0},this);return e.sort(function(a,b){return b.rounded_score-a.rounded_score}.bind(this)),e=e.slice(0,this.attr.limit),e},this.getTopicObjectsFromStrings=function(a){var b=[];return a.forEach(function(a){var c=this.topicsHash[a];c&&b.push(c)},this),b},this.requiresRemoteSuggestions=function(a){var b=helpers.getFirstChar(a.query),c=a.topicsMustStartWithHashtag&&HASHTAG_CHARS.indexOf(b)===-1;return!a||!a.query||c?!1:this.attr.remoteQueriesEnabled},this.processRemoteSuggestions=function(a,b,c){var d=c[this.attr.id]||[],e={};return d.forEach(function(a){var b=a.topic||a.hashtag;e[b.toLowerCase()]=!0},this),b[this.attr.remoteType]&&b[this.attr.remoteType].forEach(function(a){var b=a.topic||a.hashtag,c=a.filter;c&&(a.name=this.constructName(b,c)),a.searchPath=this.constructSearchPath(b,c),e[b.toLowerCase()]||d.push(a)},this),c[this.attr.id]=d.slice(0,this.attr.limit),c},this.constructName=function(a,b){var c={images:_('Fotos de <strong>{{topic}}</strong>',{topic:a}),videos:_('V\xeddeos de <strong>{{topic}}</strong>',{topic:a}),news:_('Noticias sobre <strong>{{topic}}</strong>',{topic:a}),users:_('Personas relacionadas con <strong>{{topic}}</strong>',{topic:a})};return c[b]},this.constructSearchPath=function(a,b){var c=["q="+encodeURIComponent(a)],d=b?this.attr.modePathMap[b]:"";return d&&c.push(d),c.push(this.attr.querySourcePathTypeahead),this.attr.basePath+c.join("&")},this.initialize=function(){var a=customStorage({withExpiry:!0});this.storage=new a("typeahead"),this.topicsHash={},this.adjacencyList={},this.attr.localQueriesEnabled&&this.loadData(this.attr.prefetchPath,this.attr.prefetchType)},this.initialize()}var helpers=require("app/utils/typeahead_helpers"),customStorage=require("app/utils/storage/custom"),withData=require("app/data/with_data"),compose=require("core/compose"),util=require("core/utils"),withDatasourceHelpers=require("app/data/with_datasource_helpers"),_=require("core/i18n"),HASHTAG_CHARS=["$","#","＃"];module.exports=topicsDatasource
});
define("app/data/typeahead/trend_locations_datasource",["module","require","exports","core/utils","core/i18n"],function(module, require, exports) {
function trendLocationsDatasource(a){var b={woeid:-1,placeTypeCode:-1,name:_('No se encontraron resultados. Intenta seleccionando desde una lista.')};this.attr={id:null,items:[],limit:10},this.attr=util.merge(this.attr,a),this.getRemoteSuggestions=function(a,b,c){return c},this.requiresRemoteSuggestions=function(a){return!1},this.getLocalSuggestions=function(a){var c=this.attr.items,d=function(a){return a.replace(/\s+/g,"").toLowerCase()};if(a&&a.query){var e=d(a.query);c=this.attr.items.filter(function(a){return d(a.name).indexOf(e)==0})}return c.length?c.slice(0,this.attr.limit):[b]},this.setTrendLocations=function(a){this.attr.items=a.trendLocations}}var util=require("core/utils"),_=require("core/i18n");module.exports=trendLocationsDatasource
});
define("app/data/typeahead/concierge_datasource",["module","require","exports","core/compose","core/utils","core/i18n","app/utils/storage/custom","app/data/with_data","app/data/with_datasource_helpers"],function(module, require, exports) {
function conciergeDatasource(a){this.attr={id:null,ttl_ms:216e5,limit:3,version:1,storageList:"conciergeList",storageVersion:"conciergeVersion",prefetchLimit:3,localQueriesEnabled:!1,remoteQueriesEnabled:!1,prefetchPath:"/i/search/typeahead.json",prefetchType:"oneclick",remotePath:"/i/search/typeahead.json",remoteType:"oneclick",basePath:"/search?",scribeMap:{images:"photos",videos:"video",news:"news",users:"people"},nameMap:{"images near":_('Fotos cerca de ti'),"images follow":_('Fotos de las personas que sigues'),"videos near":_('V\xeddeos cerca de ti'),"videos follow":_('V\xeddeos de las personas que sigues'),"news near":_('Noticias cerca de ti'),"news follow":_('Noticias compartidas por las personas que sigues'),"users near":_('Personas cerca de ti')},modePathMap:{images:"mode=photos",videos:"mode=videos",news:"mode=news",users:"mode=users"},locationFilterPath:"near=me",followFilterPath:"f=follows",querySourcePath:"src=taoc",querySource:"typeahead_oneclick",typeaheadExperiments:[]},this.attr=util.merge(this.attr,a),this.after=$.noop,this.defaultAttrs=$.noop,compose.mixin(this,[withData,withDatasourceHelpers]),this.getStorageKeys=function(){return[this.attr.storageVersion,this.attr.storageList]},this.getPrefetchCount=function(){return this.attr.prefetchLimit},this.isMetadataExpired=function(){var a=this.storage.getItem(this.attr.storageVersion);return a!==this.attr.version},this.getDataFromLocalStorage=function(){this.conciergeList=this.storage.getItem(this.attr.storageList)||this.conciergeList},this.processResults=function(a){if(!a||!a[this.attr.prefetchType]){this.useStaleData();return}a[this.attr.prefetchType].forEach(function(a){var b=this.constructConciergeSuggestion(a);b&&this.conciergeList.push(b)},this),this.storage.setItem(this.attr.storageList,this.conciergeList,this.attr.ttl_ms),this.storage.setItem(this.attr.storageVersion,this.attr.version,this.attr.ttl_ms)},this.getLocalSuggestions=function(a){return!a||a.query===""?this.conciergeList.slice(0,this.attr.limit):[]},this.requiresRemoteSuggestions=function(a){return a&&a.query===""?this.attr.remoteQueriesEnabled:!1},this.processRemoteSuggestions=function(a,b,c){var d=c[this.attr.id]||[];if(b[this.attr.remoteType]){var e=b[this.attr.remoteType];for(var f=0;f<e.length;f++){var g=this.constructConciergeSuggestion(e[f]);if(g){var h=d.push(g);if(h>=this.attr.limit)break}}}return c[this.attr.id]=d.slice(0,this.attr.limit),c},this.constructConciergeSuggestion=function(a){var b=a.filter,c=!!a.location,d=!!a.follow,e=a.topic,f=this.constructName(b,c,d,e);return f?{topic:e,searchPath:this.constructSearchPath(b,c,d,e),name:f,querySource:this.attr.querySource,searchDetails:this.constructScribeDetails(b,c,d,e)}:null},this.constructName=function(a,b,c,d){var e=b?" near":"",f=c?" follow":"",g=d||this.attr.nameMap[a+e+f];return g},this.constructSearchPath=function(a,b,c,d){var e=[this.attr.querySourcePath],f=a?this.attr.modePathMap[a]:"";return f&&e.push(f),b&&e.push(this.attr.locationFilterPath),c&&e.push(this.attr.followFilterPath),d&&e.push("q="+encodeURIComponent(d)),this.attr.basePath+e.join("&")},this.constructScribeDetails=function(a,b,c,d){var e={result_type:this.attr.scribeMap[a]||"everything",social_filter:c?"following":"all"};return d&&(e.query=d),b&&(e.near="me"),e},this.initialize=function(){var a=customStorage({withExpiry:!0});this.storage=new a("typeahead"),this.conciergeList=[],this.attr.localQueriesEnabled&&this.loadData(this.attr.prefetchPath,this.attr.prefetchType)},this.initialize()}var compose=require("core/compose"),util=require("core/utils"),_=require("core/i18n"),customStorage=require("app/utils/storage/custom"),withData=require("app/data/with_data"),withDatasourceHelpers=require("app/data/with_datasource_helpers");module.exports=conciergeDatasource
});
define("app/data/typeahead/selected_users_datasource",["module","require","exports","core/utils"],function(module, require, exports) {
function selectedUsersDatasource(a){this.attr={id:null,maxLength:100,querySource:"typed_query",items:[]},this.attr=util.merge(this.attr,a),this.getRemoteSuggestions=function(a,b,c){return c},this.requiresRemoteSuggestions=function(){return!1},this.removeAllSelectedUsers=function(){this.attr.items=[]},this.getLocalSuggestions=function(a){return this.attr.items.slice(0,this.attr.maxLength)},this.updateSelectedUsers=function(a){this.attr.items=a.items}}var util=require("core/utils");module.exports=selectedUsersDatasource
});
define("app/data/typeahead/prefill_users_datasource",["module","require","exports","core/utils","app/utils/storage/custom","app/data/with_datasource_helpers"],function(module, require, exports) {
function prefillUsersDatasource(a){this.attr={id:null,maxLength:10,querySource:"typed_query",customItems:[],ttl_ms:12096e5,storageList:"recentlySelectedList"},this.attr=util.merge(this.attr,a),this.getRemoteSuggestions=function(a,b,c){return c},this.requiresRemoteSuggestions=function(){return!1},this.updateStorage=function(){this.storage.setItem(this.attr.storageList,this.storageItems,this.attr.ttl_ms)},this.updateRecentlySelectedUsers=function(a){var b=this.storageItems;a.items.forEach(function(a){this.removeRecentUserFromList(a),b.unshift(a),b.length>this.attr.maxLength&&(this.storageItems=b.slice(0,this.attr.maxLength))},this),this.updateStorage()},this.removeRecentUserFromList=function(a){var b=this.storageItems,c=this.getSuggestionIndexById(a,b);c!=-1&&b.splice(c,1)},this.getSuggestionIndexById=function(a,b){for(var c=0;c<b.length;c++)if(b[c].id==a.id)return c;return-1},this.getLocalSuggestions=function(a){var b=this.storageItems.slice(0,this.attr.maxLength);for(var c=0;b.length<this.attr.maxLength&&c<this.attr.customItems.length;c++){var d=this.attr.customItems[c];this.getSuggestionIndexById(b,d)==-1&&b.push(d)}return b},this.updateCustomItems=function(a){this.attr.customItems=a.items},this.initialize=function(){var a=customStorage({withExpiry:!0});this.storage=new a("typeahead"),this.storageItems=this.storage.getItem(this.attr.storageList)||[]},this.initialize()}var util=require("core/utils"),customStorage=require("app/utils/storage/custom"),withDatasourceHelpers=require("app/data/with_datasource_helpers");module.exports=prefillUsersDatasource
});
define("app/data/typeahead/typeahead",["module","require","exports","core/component","core/utils","app/data/with_data","app/data/typeahead/with_cache","app/data/typeahead/accounts_datasource","app/data/typeahead/saved_searches_datasource","app/data/typeahead/recent_searches_datasource","app/data/typeahead/with_external_event_listeners","app/data/typeahead/topics_datasource","app/data/typeahead/trend_locations_datasource","app/data/typeahead/concierge_datasource","app/data/typeahead/selected_users_datasource","app/data/typeahead/prefill_users_datasource"],function(module, require, exports) {
function typeahead(){this.defaultAttrs({limit:10,remoteDebounceInterval:300,remoteThrottleInterval:300,outstandingRemoteRequestCount:0,queuedRequestData:!1,outstandingRemoteRequestMax:6,useThrottle:!1,tweetContextEnabled:!1,topicsWithFiltersEnabled:!1,typeaheadExperiments:[]}),this.triggerSuggestionsEvent=function(a,b,c){this.trigger("dataTypeaheadSuggestionsResults",{suggestions:c,queryData:b,id:a})},this.hasAnySuggestions=function(a,b){return b.some(function(b){return a[b]&&a[b].length})},this.needsRemoteRequest=function(a,b){return b.some(function(b){return this.datasources[b]&&this.datasources[b].requiresRemoteSuggestions&&this.datasources[b].requiresRemoteSuggestions(a)},this)},this.getLocalSuggestions=function(a,b){var c={};return b.forEach(function(b){if(!this.datasources[b])return;var d=this.datasources[b].getLocalSuggestions(a);d.length&&(d.forEach(function(a){a.origin="prefetched"}),c[b]=d)},this),c},this.processRemoteSuggestions=function(a){this.adjustRequestCount(-1);var b=a.sourceEventData,c=b.suggestions||{};b.datasources.forEach(function(d){var e=d.processRemoteSuggestions(b,a,c);if(e[d.attr.id]&&e[d.attr.id].length){for(var f in e)e[f].forEach(function(a){a.origin=a.origin||"remote"});b.suggestions[d.attr.id]=e[d.attr.id]}},this),this.processSuggestionsByDataset(c),this.triggerSuggestionsEvent(b.id,b.queryData,c),this.makeQueuedRemoteRequestIfPossible()},this.getRemoteSuggestions=function(a,b,c,d){if(!b||!this.needsRemoteRequest(b,d))return;this.request[a]||(this.attr.useThrottle?this.request[a]=utils.throttle(this.splitRemoteRequests.bind(this),this.attr.remoteThrottleInterval):this.request[a]=utils.debounce(this.splitRemoteRequests.bind(this),this.attr.remoteDebounceInterval)),b.query.indexOf("@")===0&&(b.query=b.query.substring(1),b.atSignRemoved=!0),this.request[a](a,b,c,d)},this.makeQueuedRemoteRequestIfPossible=function(){if(this.attr.outstandingRemoteRequestCount===this.attr.outstandingRemoteRequestMax-1&&this.attr.queuedRequestData){var a=this.attr.queuedRequestData;this.getRemoteSuggestions(a.id,a.queryData,a.suggestions,a.datasources),this.attr.queuedRequestData=!1}},this.adjustRequestCount=function(a){this.attr.outstandingRemoteRequestCount+=a},this.canMakeRemoteRequest=function(a){return this.attr.outstandingRemoteRequestCount<this.attr.outstandingRemoteRequestMax?!0:(this.attr.queuedRequestData=a,!1)},this.processRemoteRequestError=function(){this.adjustRequestCount(-1),this.makeQueuedRemoteRequestIfPossible()},this.splitRemoteRequests=function(a,b,c,d){var e={};d.forEach(function(a){if(this[a]&&this[a].requiresRemoteSuggestions&&this[a].requiresRemoteSuggestions(b)){var c=this[a];e[c.attr.remotePath]?e[c.attr.remotePath].push(c):e[c.attr.remotePath]=[c]}},this.datasources);for(var f in e){this.executeRemoteRequest(a,b,c,e[f]);break}},this.executeRemoteRequest=function(a,b,c,d){var e={id:a,queryData:b,suggestions:c,datasources:d};if(!this.canMakeRemoteRequest(e))return;if(!this.attr.tweetContextEnabled||b.tweetContext&&b.tweetContext.length>1e3)b.tweetContext=undefined;this.adjustRequestCount(1),this.get({url:d[0].attr.remotePath,headers:{"X-Phx":!0},data:{q:b.query,tweet_context:b.tweetContext,count:this.attr.limit,result_type:d.map(function(a){return a.attr.remoteType}).join(","),filters:this.attr.topicsWithFiltersEnabled,src:b.typeaheadSrc,experiments:this.attr.typeaheadExperiments.join(",")},eventData:e,success:this.processRemoteSuggestions.bind(this),error:this.processRemoteRequestError.bind(this)})},this.truncateTopicsWithRecentSearches=function(a){if(!a.topics||!a.recentSearches)return;var b=a.recentSearches.length,c=4-b;a.topics=a.topics.slice(0,c)},this.dedupSuggestions=function(a,b,c){function e(){return b.some(function(a){return a in c})}function f(a){var b=a.topic||a.name;return!d[b.toLowerCase()]}if(!c[a]||!e())return;var d={};c[a].forEach(function(a){var b=a.name||a.topic;d[b.toLowerCase()]=!0}),b.forEach(function(a){a in c&&(c[a]=c[a].filter(f))})},this.processSuggestionsByDataset=function(a){this.dedupSuggestions("recentSearches",["topics"],a),this.truncateTopicsWithRecentSearches(a)},this.getSuggestions=function(a,b){if(typeof b=="undefined")throw"No parameters specified";if(!b.datasources)throw"No datasources specified";if(typeof b.queryData=="undefined")throw"No query data specified";if(typeof b.queryData.query=="undefined")throw"No query specified";if(!b.id)throw"No id specified";var c=this.getLocalSuggestions(b.queryData,b.datasources);this.processSuggestionsByDataset(c);var d=b.queryData.query!=="@"&&this.needsRemoteRequest(b.queryData,b.datasources);(this.hasAnySuggestions(c,b.datasources)||!d)&&this.triggerSuggestionsEvent(b.id,b.queryData,c),d&&this.getRemoteSuggestions(b.id,b.queryData,c,b.datasources)},this.addDatasource=function(a,b,c){var d=c[b]||{};if(!d.enabled)return;globalDataSources.hasOwnProperty(b)?this.datasources[b]=globalDataSources[b]:globalDataSources[b]=this.datasources[b]=new a(utils.merge(d,{id:b})),this.setupEventListeners(b)},this.after("initialize",function(a,b){this.datasources={},this.request={},this.addDatasource(accountsDatasource,"accounts",b),this.addDatasource(accountsDatasource,"dmAccounts",b),this.addDatasource(accountsDatasource,"mediaTagAccounts",b),this.addDatasource(savedSearchesDatasource,"savedSearches",b),this.addDatasource(recentSearchesDatasource,"recentSearches",b),this.addDatasource(topicsDatasource,"topics",b),this.addDatasource(topicsDatasource,"hashtags",utils.merge(b,{hashtags:{remoteType:"hashtags"}},!0)),this.addDatasource(trendLocationsDatasource,"trendLocations",b),this.addDatasource(conciergeDatasource,"concierge",b),this.addDatasource(selectedUsersDatasource,"selectedUsers",b),this.addDatasource(prefillUsersDatasource,"prefillUsers",b),this.on("uiNeedsTypeaheadSuggestions",this.getSuggestions)})}var defineComponent=require("core/component"),utils=require("core/utils"),withData=require("app/data/with_data"),withCache=require("app/data/typeahead/with_cache"),accountsDatasource=require("app/data/typeahead/accounts_datasource"),savedSearchesDatasource=require("app/data/typeahead/saved_searches_datasource"),recentSearchesDatasource=require("app/data/typeahead/recent_searches_datasource"),withExternalEventListeners=require("app/data/typeahead/with_external_event_listeners"),topicsDatasource=require("app/data/typeahead/topics_datasource"),trendLocationsDatasource=require("app/data/typeahead/trend_locations_datasource"),conciergeDatasource=require("app/data/typeahead/concierge_datasource"),selectedUsersDatasource=require("app/data/typeahead/selected_users_datasource"),prefillUsersDatasource=require("app/data/typeahead/prefill_users_datasource");module.exports=defineComponent(typeahead,withData,withCache,withExternalEventListeners);var globalDataSources={}
});
/*! twitter-text-js 1.9.2 (c) 2012 Twitter, Inc. http://www.apache.org/licenses/LICENSE-2.0 */provide("lib/twitter-text",function(a){var b={};/*!
 * twitter-text-js 1.9.2
 *
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this work except in compliance with the License.
 * You may obtain a copy of the License at:
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 */(function(){function c(a,c){return c=c||"",typeof a!="string"&&(a.global&&c.indexOf("g")<0&&(c+="g"),a.ignoreCase&&c.indexOf("i")<0&&(c+="i"),a.multiline&&c.indexOf("m")<0&&(c+="m"),a=a.source),new RegExp(a.replace(/#\{(\w+)\}/g,function(a,c){var d=b.txt.regexen[c]||"";return typeof d!="string"&&(d=d.source),d}),c)}function d(a,b){return a.replace(/#\{(\w+)\}/g,function(a,c){return b[c]||""})}function e(a,b,c){var d=String.fromCharCode(b);return c!==b&&(d+="-"+String.fromCharCode(c)),a.push(d),a}function q(a){var b={};for(var c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b}function u(a,b,c){return c?!a||a.match(b)&&RegExp["$&"]===a:typeof a=="string"&&a.match(b)&&RegExp["$&"]===a}b.txt={},b.txt.regexen={};var a={"&":"&amp;",">":"&gt;","<":"&lt;",'"':"&quot;","'":"&#39;"};b.txt.htmlEscape=function(b){return b&&b.replace(/[&"'><]/g,function(b){return a[b]})},b.txt.regexSupplant=c,b.txt.stringSupplant=d,b.txt.addCharsToCharClass=e;var f=String.fromCharCode,g=[f(32),f(133),f(160),f(5760),f(6158),f(8232),f(8233),f(8239),f(8287),f(12288)];e(g,9,13),e(g,8192,8202);var h=[f(65534),f(65279),f(65535)];e(h,8234,8238),b.txt.regexen.spaces_group=c(g.join("")),b.txt.regexen.spaces=c("["+g.join("")+"]"),b.txt.regexen.invalid_chars_group=c(h.join("")),b.txt.regexen.punct=/\!'#%&'\(\)*\+,\\\-\.\/:;<=>\?@\[\]\^_{|}~\$/,b.txt.regexen.rtl_chars=/[\u0600-\u06FF]|[\u0750-\u077F]|[\u0590-\u05FF]|[\uFE70-\uFEFF]/gm,b.txt.regexen.non_bmp_code_pairs=/[\uD800-\uDBFF][\uDC00-\uDFFF]/gm;var i=[];e(i,1024,1279),e(i,1280,1319),e(i,11744,11775),e(i,42560,42655),e(i,1425,1471),e(i,1473,1474),e(i,1476,1477),e(i,1479,1479),e(i,1488,1514),e(i,1520,1524),e(i,64274,64296),e(i,64298,64310),e(i,64312,64316),e(i,64318,64318),e(i,64320,64321),e(i,64323,64324),e(i,64326,64335),e(i,1552,1562),e(i,1568,1631),e(i,1646,1747),e(i,1749,1756),e(i,1758,1768),e(i,1770,1775),e(i,1786,1788),e(i,1791,1791),e(i,1872,1919),e(i,2208,2208),e(i,2210,2220),e(i,2276,2302),e(i,64336,64433),e(i,64467,64829),e(i,64848,64911),e(i,64914,64967),e(i,65008,65019),e(i,65136,65140),e(i,65142,65276),e(i,8204,8204),e(i,3585,3642),e(i,3648,3662),e(i,4352,4607),e(i,12592,12677),e(i,43360,43391),e(i,44032,55215),e(i,55216,55295),e(i,65441,65500),e(i,12449,12538),e(i,12540,12542),e(i,65382,65439),e(i,65392,65392),e(i,65296,65305),e(i,65313,65338),e(i,65345,65370),e(i,12353,12438),e(i,12441,12446),e(i,13312,19903),e(i,19968,40959),e(i,173824,177983),e(i,177984,178207),e(i,194560,195103),e(i,12291,12291),e(i,12293,12293),e(i,12347,12347),b.txt.regexen.nonLatinHashtagChars=c(i.join(""));var j=[];e(j,192,214),e(j,216,246),e(j,248,255),e(j,256,591),e(j,595,596),e(j,598,599),e(j,601,601),e(j,603,603),e(j,611,611),e(j,616,616),e(j,623,623),e(j,626,626),e(j,649,649),e(j,651,651),e(j,699,699),e(j,768,879),e(j,7680,7935),b.txt.regexen.latinAccentChars=c(j.join("")),b.txt.regexen.hashSigns=/[#＃]/,b.txt.regexen.hashtagAlpha=c(/[a-z_#{latinAccentChars}#{nonLatinHashtagChars}]/i),b.txt.regexen.hashtagAlphaNumeric=c(/[a-z0-9_#{latinAccentChars}#{nonLatinHashtagChars}]/i),b.txt.regexen.endHashtagMatch=c(/^(?:#{hashSigns}|:\/\/)/),b.txt.regexen.hashtagBoundary=c(/(?:^|$|[^&a-z0-9_#{latinAccentChars}#{nonLatinHashtagChars}])/),b.txt.regexen.validHashtag=c(/(#{hashtagBoundary})(#{hashSigns})(#{hashtagAlphaNumeric}*#{hashtagAlpha}#{hashtagAlphaNumeric}*)/gi),b.txt.regexen.validMentionPrecedingChars=/(?:^|[^a-zA-Z0-9_!#$%&*@＠]|(?:rt|RT|rT|Rt):?)/,b.txt.regexen.atSigns=/[@＠]/,b.txt.regexen.validMentionOrList=c("(#{validMentionPrecedingChars})(#{atSigns})([a-zA-Z0-9_]{1,20})(/[a-zA-Z][a-zA-Z0-9_-]{0,24})?","g"),b.txt.regexen.validReply=c(/^(?:#{spaces})*#{atSigns}([a-zA-Z0-9_]{1,20})/),b.txt.regexen.endMentionMatch=c(/^(?:#{atSigns}|[#{latinAccentChars}]|:\/\/)/),b.txt.regexen.validUrlPrecedingChars=c(/(?:[^A-Za-z0-9@＠$#＃#{invalid_chars_group}]|^)/),b.txt.regexen.invalidUrlWithoutProtocolPrecedingChars=/[-_.\/]$/,b.txt.regexen.invalidDomainChars=d("#{punct}#{spaces_group}#{invalid_chars_group}",b.txt.regexen),b.txt.regexen.validDomainChars=c(/[^#{invalidDomainChars}]/),b.txt.regexen.validSubdomain=c(/(?:(?:#{validDomainChars}(?:[_-]|#{validDomainChars})*)?#{validDomainChars}\.)/),b.txt.regexen.validDomainName=c(/(?:(?:#{validDomainChars}(?:-|#{validDomainChars})*)?#{validDomainChars}\.)/),b.txt.regexen.validGTLD=c(RegExp("(?:(?:academy|accountants|active|actor|aero|agency|airforce|archi|army|arpa|asia|associates|attorney|audio|autos|axa|bar|bargains|bayern|beer|berlin|best|bid|bike|bio|biz|black|blackfriday|blue|bmw|boutique|brussels|build|builders|buzz|bzh|cab|camera|camp|cancerresearch|capetown|capital|cards|care|career|careers|cash|cat|catering|center|ceo|cheap|christmas|church|citic|claims|cleaning|clinic|clothing|club|codes|coffee|college|cologne|com|community|company|computer|condos|construction|consulting|contractors|cooking|cool|coop|country|credit|creditcard|cruises|cuisinella|dance|dating|degree|democrat|dental|dentist|desi|diamonds|digital|direct|directory|discount|dnp|domains|durban|edu|education|email|engineer|engineering|enterprises|equipment|estate|eus|events|exchange|expert|exposed|fail|farm|feedback|finance|financial|fish|fishing|fitness|flights|florist|foo|foundation|frogans|fund|furniture|futbol|gal|gallery|gift|gives|glass|global|globo|gmo|gop|gov|graphics|gratis|green|gripe|guide|guitars|guru|hamburg|haus|hiphop|hiv|holdings|holiday|homes|horse|host|house|immobilien|industries|info|ink|institute|insure|int|international|investments|jetzt|jobs|joburg|juegos|kaufen|kim|kitchen|kiwi|koeln|kred|land|lawyer|lease|lgbt|life|lighting|limited|limo|link|loans|london|lotto|luxe|luxury|maison|management|mango|market|marketing|media|meet|menu|miami|mil|mini|mobi|moda|moe|monash|mortgage|moscow|motorcycles|museum|nagoya|name|navy|net|neustar|nhk|ninja|nyc|okinawa|onl|org|organic|ovh|paris|partners|parts|photo|photography|photos|physio|pics|pictures|pink|place|plumbing|post|press|pro|productions|properties|pub|qpon|quebec|recipes|red|rehab|reise|reisen|ren|rentals|repair|report|republican|rest|reviews|rich|rio|rocks|rodeo|ruhr|ryukyu|saarland|schmidt|schule|scot|services|sexy|shiksha|shoes|singles|social|software|sohu|solar|solutions|soy|space|spiegel|supplies|supply|support|surf|surgery|suzuki|systems|tattoo|tax|technology|tel|tienda|tips|tirol|today|tokyo|tools|town|toys|trade|training|travel|university|uno|vacations|vegas|ventures|versicherung|vet|viajes|villas|vision|vlaanderen|vodka|vote|voting|voto|voyage|wang|watch|webcam|website|wed|wien|wiki|works|wtc|wtf|xxx|xyz|yachts|yokohama|zone|дети|москва|онлайн|орг|сайт|بازار|شبكة|موقع|संगठन|みんな|世界|中信|中文网|公司|公益|商城|商标|在线|我爱你|政务|机构|游戏|移动|组织机构|网址|网络|集团|삼성)(?=[^0-9a-zA-Z@]|$))")),b.txt.regexen.validCCTLD=c(RegExp("(?:(?:ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bl|bm|bn|bo|bq|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cw|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mf|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|ss|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|za|zm|zw|мкд|мон|рф|срб|укр|қаз|الاردن|الجزائر|السعودية|المغرب|امارات|ایران|بھارت|تونس|سودان|سورية|عمان|فلسطين|قطر|مصر|مليسيا|پاکستان|भारत|বাংলা|ভারত|ਭਾਰਤ|ભારત|இந்தியா|இலங்கை|சிங்கப்பூர்|భారత్|ලංකා|ไทย|გე|中国|中國|台湾|台灣|新加坡|香港|한국)(?=[^0-9a-zA-Z@]|$))")),b.txt.regexen.validPunycode=c(/(?:xn--[0-9a-z]+)/),b.txt.regexen.validSpecialCCTLD=c(RegExp("(?:(?:co|tv)(?=[^0-9a-zA-Z@]|$))")),b.txt.regexen.validDomain=c(/(?:#{validSubdomain}*#{validDomainName}(?:#{validGTLD}|#{validCCTLD}|#{validPunycode}))/),b.txt.regexen.validAsciiDomain=c(/(?:(?:[\-a-z0-9#{latinAccentChars}]+)\.)+(?:#{validGTLD}|#{validCCTLD}|#{validPunycode})/gi),b.txt.regexen.invalidShortDomain=c(/^#{validDomainName}#{validCCTLD}$/i),b.txt.regexen.validSpecialShortDomain=c(/^#{validDomainName}#{validSpecialCCTLD}$/i),b.txt.regexen.validPortNumber=c(/[0-9]+/),b.txt.regexen.validGeneralUrlPathChars=c(/[a-z0-9!\*';:=\+,\.\$\/%#\[\]\-_~@|&#{latinAccentChars}]/i),b.txt.regexen.validUrlBalancedParens=c("\\((?:#{validGeneralUrlPathChars}+|(?:#{validGeneralUrlPathChars}*\\(#{validGeneralUrlPathChars}+\\)#{validGeneralUrlPathChars}*))\\)","i"),b.txt.regexen.validUrlPathEndingChars=c(/[\+\-a-z0-9=_#\/#{latinAccentChars}]|(?:#{validUrlBalancedParens})/i),b.txt.regexen.validUrlPath=c("(?:(?:#{validGeneralUrlPathChars}*(?:#{validUrlBalancedParens}#{validGeneralUrlPathChars}*)*#{validUrlPathEndingChars})|(?:@#{validGeneralUrlPathChars}+/))","i"),b.txt.regexen.validUrlQueryChars=/[a-z0-9!?\*'@\(\);:&=\+\$\/%#\[\]\-_\.,~|]/i,b.txt.regexen.validUrlQueryEndingChars=/[a-z0-9_&=#\/]/i,b.txt.regexen.extractUrl=c("((#{validUrlPrecedingChars})((https?:\\/\\/)?(#{validDomain})(?::(#{validPortNumber}))?(\\/#{validUrlPath}*)?(\\?#{validUrlQueryChars}*#{validUrlQueryEndingChars})?))","gi"),b.txt.regexen.validTcoUrl=/^https?:\/\/t\.co\/[a-z0-9]+/i,b.txt.regexen.urlHasProtocol=/^https?:\/\//i,b.txt.regexen.urlHasHttps=/^https:\/\//i,b.txt.regexen.cashtag=/[a-z]{1,6}(?:[._][a-z]{1,2})?/i,b.txt.regexen.validCashtag=c("(^|#{spaces})(\\$)(#{cashtag})(?=$|\\s|[#{punct}])","gi"),b.txt.regexen.validateUrlUnreserved=/[a-z0-9\-._~]/i,b.txt.regexen.validateUrlPctEncoded=/(?:%[0-9a-f]{2})/i,b.txt.regexen.validateUrlSubDelims=/[!$&'()*+,;=]/i,b.txt.regexen.validateUrlPchar=c("(?:#{validateUrlUnreserved}|#{validateUrlPctEncoded}|#{validateUrlSubDelims}|[:|@])","i"),b.txt.regexen.validateUrlScheme=/(?:[a-z][a-z0-9+\-.]*)/i,b.txt.regexen.validateUrlUserinfo=c("(?:#{validateUrlUnreserved}|#{validateUrlPctEncoded}|#{validateUrlSubDelims}|:)*","i"),b.txt.regexen.validateUrlDecOctet=/(?:[0-9]|(?:[1-9][0-9])|(?:1[0-9]{2})|(?:2[0-4][0-9])|(?:25[0-5]))/i,b.txt.regexen.validateUrlIpv4=c(/(?:#{validateUrlDecOctet}(?:\.#{validateUrlDecOctet}){3})/i),b.txt.regexen.validateUrlIpv6=/(?:\[[a-f0-9:\.]+\])/i,b.txt.regexen.validateUrlIp=c("(?:#{validateUrlIpv4}|#{validateUrlIpv6})","i"),b.txt.regexen.validateUrlSubDomainSegment=/(?:[a-z0-9](?:[a-z0-9_\-]*[a-z0-9])?)/i,b.txt.regexen.validateUrlDomainSegment=/(?:[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?)/i,b.txt.regexen.validateUrlDomainTld=/(?:[a-z](?:[a-z0-9\-]*[a-z0-9])?)/i,b.txt.regexen.validateUrlDomain=c(/(?:(?:#{validateUrlSubDomainSegment]}\.)*(?:#{validateUrlDomainSegment]}\.)#{validateUrlDomainTld})/i),b.txt.regexen.validateUrlHost=c("(?:#{validateUrlIp}|#{validateUrlDomain})","i"),b.txt.regexen.validateUrlUnicodeSubDomainSegment=/(?:(?:[a-z0-9]|[^\u0000-\u007f])(?:(?:[a-z0-9_\-]|[^\u0000-\u007f])*(?:[a-z0-9]|[^\u0000-\u007f]))?)/i,b.txt.regexen.validateUrlUnicodeDomainSegment=/(?:(?:[a-z0-9]|[^\u0000-\u007f])(?:(?:[a-z0-9\-]|[^\u0000-\u007f])*(?:[a-z0-9]|[^\u0000-\u007f]))?)/i,b.txt.regexen.validateUrlUnicodeDomainTld=/(?:(?:[a-z]|[^\u0000-\u007f])(?:(?:[a-z0-9\-]|[^\u0000-\u007f])*(?:[a-z0-9]|[^\u0000-\u007f]))?)/i,b.txt.regexen.validateUrlUnicodeDomain=c(/(?:(?:#{validateUrlUnicodeSubDomainSegment}\.)*(?:#{validateUrlUnicodeDomainSegment}\.)#{validateUrlUnicodeDomainTld})/i),b.txt.regexen.validateUrlUnicodeHost=c("(?:#{validateUrlIp}|#{validateUrlUnicodeDomain})","i"),b.txt.regexen.validateUrlPort=/[0-9]{1,5}/,b.txt.regexen.validateUrlUnicodeAuthority=c("(?:(#{validateUrlUserinfo})@)?(#{validateUrlUnicodeHost})(?::(#{validateUrlPort}))?","i"),b.txt.regexen.validateUrlAuthority=c("(?:(#{validateUrlUserinfo})@)?(#{validateUrlHost})(?::(#{validateUrlPort}))?","i"),b.txt.regexen.validateUrlPath=c(/(\/#{validateUrlPchar}*)*/i),b.txt.regexen.validateUrlQuery=c(/(#{validateUrlPchar}|\/|\?)*/i),b.txt.regexen.validateUrlFragment=c(/(#{validateUrlPchar}|\/|\?)*/i),b.txt.regexen.validateUrlUnencoded=c("^(?:([^:/?#]+):\\/\\/)?([^/?#]*)([^?#]*)(?:\\?([^#]*))?(?:#(.*))?$","i");var k="tweet-url list-slug",l="tweet-url username",m="tweet-url hashtag",n="tweet-url cashtag",o={urlClass:!0,listClass:!0,usernameClass:!0,hashtagClass:!0,cashtagClass:!0,usernameUrlBase:!0,listUrlBase:!0,hashtagUrlBase:!0,cashtagUrlBase:!0,usernameUrlBlock:!0,listUrlBlock:!0,hashtagUrlBlock:!0,linkUrlBlock:!0,usernameIncludeSymbol:!0,suppressLists:!0,suppressNoFollow:!0,targetBlank:!0,suppressDataScreenName:!0,urlEntities:!0,symbolTag:!0,textWithSymbolTag:!0,urlTarget:!0,invisibleTagAttrs:!0,linkAttributeBlock:!0,linkTextBlock:!0,htmlEscapeNonEntities:!0},p={disabled:!0,readonly:!0,multiple:!0,checked:!0};b.txt.tagAttrs=function(a){var c="";for(var d in a){var e=a[d];p[d]&&(e=e?d:null);if(e==null)continue;c+=" "+b.txt.htmlEscape(d)+'="'+b.txt.htmlEscape(e.toString())+'"'}return c},b.txt.linkToText=function(a,c,e,f){f.suppressNoFollow||(e.rel="nofollow"),f.linkAttributeBlock&&f.linkAttributeBlock(a,e),f.linkTextBlock&&(c=f.linkTextBlock(a,c));var g={text:c,attr:b.txt.tagAttrs(e)};return d("<a#{attr}>#{text}</a>",g)},b.txt.linkToTextWithSymbol=function(a,c,d,e,f){var g=f.symbolTag?"<"+f.symbolTag+">"+c+"</"+f.symbolTag+">":c;d=b.txt.htmlEscape(d);var h=f.textWithSymbolTag?"<"+f.textWithSymbolTag+">"+d+"</"+f.textWithSymbolTag+">":d;return f.usernameIncludeSymbol||!c.match(b.txt.regexen.atSigns)?b.txt.linkToText(a,g+h,e,f):g+b.txt.linkToText(a,h,e,f)},b.txt.linkToHashtag=function(a,c,d){var e=c.substring(a.indices[0],a.indices[0]+1),f=b.txt.htmlEscape(a.hashtag),g=q(d.htmlAttrs||{});return g.href=d.hashtagUrlBase+f,g.title="#"+f,g["class"]=d.hashtagClass,f.charAt(0).match(b.txt.regexen.rtl_chars)&&(g["class"]+=" rtl"),d.targetBlank&&(g.target="_blank"),b.txt.linkToTextWithSymbol(a,e,f,g,d)},b.txt.linkToCashtag=function(a,c,d){var e=b.txt.htmlEscape(a.cashtag),f=q(d.htmlAttrs||{});return f.href=d.cashtagUrlBase+e,f.title="$"+e,f["class"]=d.cashtagClass,d.targetBlank&&(f.target="_blank"),b.txt.linkToTextWithSymbol(a,"$",e,f,d)},b.txt.linkToMentionAndList=function(a,c,d){var e=c.substring(a.indices[0],a.indices[0]+1),f=b.txt.htmlEscape(a.screenName),g=b.txt.htmlEscape(a.listSlug),h=a.listSlug&&!d.suppressLists,i=q(d.htmlAttrs||{});return i["class"]=h?d.listClass:d.usernameClass,i.href=h?d.listUrlBase+f+g:d.usernameUrlBase+f,!h&&!d.suppressDataScreenName&&(i["data-screen-name"]=f),d.targetBlank&&(i.target="_blank"),b.txt.linkToTextWithSymbol(a,e,h?f+g:f,i,d)},b.txt.linkToUrl=function(a,c,d){var e=a.url,f=e,g=b.txt.htmlEscape(f),h=d.urlEntities&&d.urlEntities[e]||a;h.display_url&&(g=b.txt.linkTextWithEntity(h,d));var i=q(d.htmlAttrs||{});return e.match(b.txt.regexen.urlHasProtocol)||(e="http://"+e),i.href=e,d.targetBlank&&(i.target="_blank"),d.urlClass&&(i["class"]=d.urlClass),d.urlTarget&&(i.target=d.urlTarget),!d.title&&h.display_url&&(i.title=h.expanded_url),b.txt.linkToText(a,g,i,d)},b.txt.linkTextWithEntity=function(a,c){var e=a.display_url,f=a.expanded_url,g=e.replace(/…/g,"");if(f.indexOf(g)!=-1){var h=f.indexOf(g),i={displayUrlSansEllipses:g,beforeDisplayUrl:f.substr(0,h),afterDisplayUrl:f.substr(h+g.length),precedingEllipsis:e.match(/^…/)?"…":"",followingEllipsis:e.match(/…$/)?"…":""};for(var j in i)i.hasOwnProperty(j)&&(i[j]=b.txt.htmlEscape(i[j]));return i.invisible=c.invisibleTagAttrs,d("<span class='tco-ellipsis'>#{precedingEllipsis}<span #{invisible}>&nbsp;</span></span><span #{invisible}>#{beforeDisplayUrl}</span><span class='js-display-url'>#{displayUrlSansEllipses}</span><span #{invisible}>#{afterDisplayUrl}</span><span class='tco-ellipsis'><span #{invisible}>&nbsp;</span>#{followingEllipsis}</span>",i)}return e},b.txt.autoLinkEntities=function(a,c,d){d=q(d||{}),d.hashtagClass=d.hashtagClass||m,d.hashtagUrlBase=d.hashtagUrlBase||"https://twitter.com/#!/search?q=%23",d.cashtagClass=d.cashtagClass||n,d.cashtagUrlBase=d.cashtagUrlBase||"https://twitter.com/#!/search?q=%24",d.listClass=d.listClass||k,d.usernameClass=d.usernameClass||l,d.usernameUrlBase=d.usernameUrlBase||"https://twitter.com/",d.listUrlBase=d.listUrlBase||"https://twitter.com/",d.htmlAttrs=b.txt.extractHtmlAttrsFromOptions(d),d.invisibleTagAttrs=d.invisibleTagAttrs||"style='position:absolute;left:-9999px;'";var e,f,g;if(d.urlEntities){e={};for(f=0,g=d.urlEntities.length;f<g;f++)e[d.urlEntities[f].url]=d.urlEntities[f];d.urlEntities=e}var h="",i=0;c.sort(function(a,b){return a.indices[0]-b.indices[0]});var j=d.htmlEscapeNonEntities?b.txt.htmlEscape:function(a){return a};for(var f=0;f<c.length;f++){var o=c[f];h+=j(a.substring(i,o.indices[0])),o.url?h+=b.txt.linkToUrl(o,a,d):o.hashtag?h+=b.txt.linkToHashtag(o,a,d):o.screenName?h+=b.txt.linkToMentionAndList(o,a,d):o.cashtag&&(h+=b.txt.linkToCashtag(o,a,d)),i=o.indices[1]}return h+=j(a.substring(i,a.length)),h},b.txt.autoLinkWithJSON=function(a,c,d){if(c.user_mentions)for(var e=0;e<c.user_mentions.length;e++)c.user_mentions[e].screenName=c.user_mentions[e].screen_name;if(c.hashtags)for(var e=0;e<c.hashtags.length;e++)c.hashtags[e].hashtag=c.hashtags[e].text;if(c.symbols)for(var e=0;e<c.symbols.length;e++)c.symbols[e].cashtag=c.symbols[e].text;var f=[];for(var g in c)f=f.concat(c[g]);return b.txt.modifyIndicesFromUnicodeToUTF16(a,f),b.txt.autoLinkEntities(a,f,d)},b.txt.extractHtmlAttrsFromOptions=function(a){var b={};for(var c in a){var d=a[c];if(o[c])continue;p[c]&&(d=d?c:null);if(d==null)continue;b[c]=d}return b},b.txt.autoLink=function(a,c){var d=b.txt.extractEntitiesWithIndices(a,{extractUrlsWithoutProtocol:!1});return b.txt.autoLinkEntities(a,d,c)},b.txt.autoLinkUsernamesOrLists=function(a,c){var d=b.txt.extractMentionsOrListsWithIndices(a);return b.txt.autoLinkEntities(a,d,c)},b.txt.autoLinkHashtags=function(a,c){var d=b.txt.extractHashtagsWithIndices(a);return b.txt.autoLinkEntities(a,d,c)},b.txt.autoLinkCashtags=function(a,c){var d=b.txt.extractCashtagsWithIndices(a);return b.txt.autoLinkEntities(a,d,c)},b.txt.autoLinkUrlsCustom=function(a,c){var d=b.txt.extractUrlsWithIndices(a,{extractUrlsWithoutProtocol:!1});return b.txt.autoLinkEntities(a,d,c)},b.txt.removeOverlappingEntities=function(a){a.sort(function(a,b){return a.indices[0]-b.indices[0]});var b=a[0];for(var c=1;c<a.length;c++)b.indices[1]>a[c].indices[0]?(a.splice(c,1),c--):b=a[c]},b.txt.extractEntitiesWithIndices=function(a,c){var d=b.txt.extractUrlsWithIndices(a,c).concat(b.txt.extractMentionsOrListsWithIndices(a)).concat(b.txt.extractHashtagsWithIndices(a,{checkUrlOverlap:!1})).concat(b.txt.extractCashtagsWithIndices(a));return d.length==0?[]:(b.txt.removeOverlappingEntities(d),d)},b.txt.extractMentions=function(a){var c=[],d=b.txt.extractMentionsWithIndices(a);for(var e=0;e<d.length;e++){var f=d[e].screenName;c.push(f)}return c},b.txt.extractMentionsWithIndices=function(a){var c=[],d,e=b.txt.extractMentionsOrListsWithIndices(a);for(var f=0;f<e.length;f++)d=e[f],d.listSlug==""&&c.push({screenName:d.screenName,indices:d.indices});return c},b.txt.extractMentionsOrListsWithIndices=function(a){if(!a||!a.match(b.txt.regexen.atSigns))return[];var c=[],d;return a.replace(b.txt.regexen.validMentionOrList,function(a,d,e,f,g,h,i){var j=i.slice(h+a.length);if(!j.match(b.txt.regexen.endMentionMatch)){g=g||"";var k=h+d.length,l=k+f.length+g.length+1;c.push({screenName:f,listSlug:g,indices:[k,l]})}}),c},b.txt.extractReplies=function(a){if(!a)return null;var c=a.match(b.txt.regexen.validReply);return!c||RegExp.rightContext.match(b.txt.regexen.endMentionMatch)?null:c[1]},b.txt.extractUrls=function(a,c){var d=[],e=b.txt.extractUrlsWithIndices(a,c);for(var f=0;f<e.length;f++)d.push(e[f].url);return d},b.txt.extractUrlsWithIndices=function(a,c){c||(c={extractUrlsWithoutProtocol:!0});if(!a||(c.extractUrlsWithoutProtocol?!a.match(/\./):!a.match(/:/)))return[];var d=[];while(b.txt.regexen.extractUrl.exec(a)){var e=RegExp.$2,f=RegExp.$3,g=RegExp.$4,h=RegExp.$5,i=RegExp.$7,j=b.txt.regexen.extractUrl.lastIndex,k=j-f.length;if(!g){if(!c.extractUrlsWithoutProtocol||e.match(b.txt.regexen.invalidUrlWithoutProtocolPrecedingChars))continue;var l=null,m=0;h.replace(b.txt.regexen.validAsciiDomain,function(a){var c=h.indexOf(a,m);m=c+a.length,l={url:a,indices:[k+c,k+m]},(i||a.match(b.txt.regexen.validSpecialShortDomain)||!a.match(b.txt.regexen.invalidShortDomain))&&d.push(l)});if(l==null)continue;i&&(l.url=f.replace(h,l.url),l.indices[1]=j)}else f.match(b.txt.regexen.validTcoUrl)&&(f=RegExp.lastMatch,j=k+f.length),d.push({url:f,indices:[k,j]})}return d},b.txt.extractHashtags=function(a){var c=[],d=b.txt.extractHashtagsWithIndices(a);for(var e=0;e<d.length;e++)c.push(d[e].hashtag);return c},b.txt.extractHashtagsWithIndices=function(a,c){c||(c={checkUrlOverlap:!0});if(!a||!a.match(b.txt.regexen.hashSigns))return[];var d=[];a.replace(b.txt.regexen.validHashtag,function(a,c,e,f,g,h){var i=h.slice(g+a.length);if(i.match(b.txt.regexen.endHashtagMatch))return;var j=g+c.length,k=j+f.length+1;d.push({hashtag:f,indices:[j,k]})});if(c.checkUrlOverlap){var e=b.txt.extractUrlsWithIndices(a);if(e.length>0){var f=d.concat(e);b.txt.removeOverlappingEntities(f),d=[];for(var g=0;g<f.length;g++)f[g].hashtag&&d.push(f[g])}}return d},b.txt.extractCashtags=function(a){var c=[],d=b.txt.extractCashtagsWithIndices(a);for(var e=0;e<d.length;e++)c.push(d[e].cashtag);return c},b.txt.extractCashtagsWithIndices=function(a){if(!a||a.indexOf("$")==-1)return[];var c=[];return a.replace(b.txt.regexen.validCashtag,function(a,b,d,e,f,g){var h=f+b.length,i=h+e.length+1;c.push({cashtag:e,indices:[h,i]})}),c},b.txt.modifyIndicesFromUnicodeToUTF16=function(a,c){b.txt.convertUnicodeIndices(a,c,!1)},b.txt.modifyIndicesFromUTF16ToUnicode=function(a,c){b.txt.convertUnicodeIndices(a,c,!0)},b.txt.getUnicodeTextLength=function(a){return a.replace(b.txt.regexen.non_bmp_code_pairs," ").length},b.txt.convertUnicodeIndices=function(a,b,c){if(b.length==0)return;var d=0,e=0;b.sort(function(a,b){return a.indices[0]-b.indices[0]});var f=0,g=b[0];while(d<a.length){if(g.indices[0]==(c?d:e)){var h=g.indices[1]-g.indices[0];g.indices[0]=c?e:d,g.indices[1]=g.indices[0]+h,f++;if(f==b.length)break;g=b[f]}var i=a.charCodeAt(d);55296<=i&&i<=56319&&d<a.length-1&&(i=a.charCodeAt(d+1),56320<=i&&i<=57343&&d++),e++,d++}},b.txt.splitTags=function(a){var b=a.split("<"),c,d=[],e;for(var f=0;f<b.length;f+=1){e=b[f];if(!e)d.push("");else{c=e.split(">");for(var g=0;g<c.length;g+=1)d.push(c[g])}}return d},b.txt.hitHighlight=function(a,c,d){var e="em";c=c||[],d=d||{};if(c.length===0)return a;var f=d.tag||e,g=["<"+f+">","</"+f+">"],h=b.txt.splitTags(a),i,j,k="",l=0,m=h[0],n=0,o=0,p=!1,q=m,r=[],s,t,u,v,w;for(i=0;i<c.length;i+=1)for(j=0;j<c[i].length;j+=1)r.push(c[i][j]);for(s=0;s<r.length;s+=1){t=r[s],u=g[s%2],v=!1;while(m!=null&&t>=n+m.length)k+=q.slice(o),p&&t===n+q.length&&(k+=u,v=!0),h[l+1]&&(k+="<"+h[l+1]+">"),n+=q.length,o=0,l+=2,m=h[l],q=m,p=!1;!v&&m!=null?(w=t-n,k+=q.slice(o,w)+u,o=w,s%2===0?p=!0:p=!1):v||(v=!0,k+=u)}if(m!=null){o<q.length&&(k+=q.slice(o));for(s=l+1;s<h.length;s+=1)k+=s%2===0?h[s]:"<"+h[s]+">"}return k};var r=140,s=[f(65534),f(65279),f(65535),f(8234),f(8235),f(8236),f(8237),f(8238)];b.txt.getTweetLength=function(a,c){c||(c={short_url_length:22,short_url_length_https:23});var d=b.txt.getUnicodeTextLength(a),e=b.txt.extractUrlsWithIndices(a);b.txt.modifyIndicesFromUTF16ToUnicode(a,e);for(var f=0;f<e.length;f++)d+=e[f].indices[0]-e[f].indices[1],e[f].url.toLowerCase().match(b.txt.regexen.urlHasHttps)?d+=c.short_url_length_https:d+=c.short_url_length;return d},b.txt.isInvalidTweet=function(a){if(!a)return"empty";if(b.txt.getTweetLength(a)>r)return"too_long";for(var c=0;c<s.length;c++)if(a.indexOf(s[c])>=0)return"invalid_characters";return!1},b.txt.isValidTweetText=function(a){return!b.txt.isInvalidTweet(a)},b.txt.isValidUsername=function(a){if(!a)return!1;var c=b.txt.extractMentions(a);return c.length===1&&c[0]===a.slice(1)};var t=c(/^#{validMentionOrList}$/);b.txt.isValidList=function(a){var b=a.match(t);return!!b&&b[1]==""&&!!b[4]},b.txt.isValidHashtag=function(a){if(!a)return!1;var c=b.txt.extractHashtags(a);return c.length===1&&c[0]===a.slice(1)},b.txt.isValidUrl=function(a,c,d){c==null&&(c=!0),d==null&&(d=!0);if(!a)return!1;var e=a.match(b.txt.regexen.validateUrlUnencoded);if(!e||e[0]!==a)return!1;var f=e[1],g=e[2],h=e[3],i=e[4],j=e[5];return(!d||u(f,b.txt.regexen.validateUrlScheme)&&f.match(/^https?$/i))&&u(h,b.txt.regexen.validateUrlPath)&&u(i,b.txt.regexen.validateUrlQuery,!0)&&u(j,b.txt.regexen.validateUrlFragment,!0)?c&&u(g,b.txt.regexen.validateUrlUnicodeAuthority)||!c&&u(g,b.txt.regexen.validateUrlAuthority):!1},typeof module!="undefined"&&module.exports&&(module.exports=b.txt)})(),a(b.txt)})
define("app/data/typeahead/typeahead_scribe",["module","require","exports","core/component","app/data/with_scribe","lib/twitter-text","app/utils/scribe_item_types"],function(module, require, exports) {
function typeaheadScribe(){this.defaultAttrs({tweetboxSelector:".tweet-box-shadow"}),this.storeCompletionData=function(a,b){if(b.scribeContext&&b.scribeContext.component=="tweet_box"){var c=b.source=="account"?"@"+b.display:b.display;this.completions.push(c)}},this.handleTweetCompletion=function(a,b){if(b.scribeContext.component!="tweet_box")return;var c=$(a.target).find(this.attr.tweetboxSelector).val(),d=twitterText.extractEntitiesWithIndices(c).filter(function(a){return a.screenName||a.cashtag||a.hashtag});d=d.map(function(a){return c.slice(a.indices[0],a.indices[1])});var e=d.filter(function(a){return this.completions.indexOf(a)>=0},this);this.completions=[];if(d.length==0)return;var f={query:b.query,message:d.length,event_info:e.length,format_version:2};this.scribe("entities",b,f)},this.scribeSelection=function(a,b){if(b.fromSelectionEvent&&a.type=="uiTypeaheadItemComplete")return;var c={element:"typeahead_"+b.source,action:"select"},d;a.type=="uiTypeaheadItemComplete"?d="autocomplete":b.isClick?d="click":a.type=="uiTypeaheadItemSelected"&&(d="key_select");var e={position:b.index,description:d};b.source=="account"?(e.item_type=itemTypes.user,e.id=b.query):b.source=="topics"?(e.item_type=itemTypes.search,e.item_query=b.query):b.source=="saved_search"?(e.item_type=itemTypes.savedSearch,e.item_query=b.query):b.source=="recent_search"?(e.item_type=itemTypes.search,e.item_query=b.query):b.source=="trend_location"?(e.item_type=itemTypes.trend,e.item_query=b.item.woeid,b.item.woeid==-1&&(c.action="no_results")):b.source=="concierge"&&(e.item_type=itemTypes.search,e.item_query=b.query||b.item.name);var f={message:b.input,items:[e],format_version:2,event_info:b.item?b.item.origin:null,search_details:b.item?b.item.searchDetails:null};this.scribe(c,b,f)},this.after("initialize",function(){this.completions=[],this.on("uiTypeaheadItemComplete uiTypeaheadItemSelected",this.storeCompletionData),this.on("uiTypeaheadItemComplete uiTypeaheadItemSelected",this.scribeSelection),this.on("uiTweetboxTweetSuccess uiTweetboxReplySuccess",this.handleTweetCompletion)})}var defineComponent=require("core/component"),withScribe=require("app/data/with_scribe"),twitterText=require("lib/twitter-text"),itemTypes=require("app/utils/scribe_item_types");module.exports=defineComponent(typeaheadScribe,withScribe)
});
define("app/utils/caret",["module","require","exports"],function(module, require, exports) {
var caret={getPosition:function(a){try{if(document.selection){var b=document.selection.createRange();return b.moveStart("character",-a.value.length),b.text.length}if(typeof a.selectionStart=="number")return a.selectionStart}catch(c){}return 0},setPosition:function(a,b){try{if(document.selection){var c=a.createTextRange();c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",b),c.select()}else typeof a.selectionStart=="number"&&(a.selectionStart=b,a.selectionEnd=b)}catch(d){}},getSelection:function(){return window.getSelection?window.getSelection().toString():document.selection.createRange().text}};module.exports=caret
});
define("app/utils/event_support",["module","require","exports"],function(module, require, exports) {
var supportedEvents={},checkEventsSupport=function(a,b){return a.forEach(function(a){checkEventSupported(a,b[a])},this),supportedEvents},checkEventSupported=function(a,b){var c=document.createElement(b||"div"),d="on"+a,e=d in c;return e||(c.setAttribute(d,"return;"),e=typeof c[d]=="function"),c=null,supportedEvents[a]=e,e},eventSupport={checkEvents:function(a,b){checkEventsSupport(a,b||{})},browserSupports:function(a,b){return supportedEvents[a]===undefined&&checkEventSupported(a,b),supportedEvents[a]}};module.exports=eventSupport
});
define("app/utils/string",["module","require","exports"],function(module, require, exports) {
function isWhitespaceChar(a){var b=a.charCodeAt(0);return b<=32?!0:!1}function subtractOne(a,b){if(a=="")return"";var c=a.split(""),d=c.pop();return a=c.join(""),d=="0"?subtractOne(a,!0)+"9":(d-=1,a==""&&d==0?b?"":"0":a+d)}function isDigitChar(a){var b=a.charCodeAt(0);return b>=48&&b<=57?!0:!1}function compareRight(a,b){var c=0,d=0,e=0,f,g;for(;;d++,e++){f=a.charAt(d),g=b.charAt(e);if(!isDigitChar(f)&&!isDigitChar(g))return c;if(!isDigitChar(f))return-1;if(!isDigitChar(g))return 1;f<g?c===0&&(c=-1):f>g&&c===0&&(c=1)}}var utils={compare:function(a,b){var c=0,d=0,e,f,g,h,i;if(a===b)return 0;typeof a=="number"&&(a=a.toString()),typeof b=="number"&&(b=b.toString());for(;;){if(c>100)return;e=f=0,g=a.charAt(c),h=b.charAt(d);while(isWhitespaceChar(g)||g=="0")g=="0"?e++:e=0,g=a.charAt(++c);while(isWhitespaceChar(h)||h=="0")h=="0"?f++:f=0,h=b.charAt(++d);if(isDigitChar(g)&&isDigitChar(h)&&(i=compareRight(a.substring(c),b.substring(d)))!=0)return i;if(g==0&&h==0)return e-f;if(g<h)return-1;if(g>h)return 1;++c,++d}},wordAtPosition:function(a,b,c,d){c=c||/[^\s]+/g,d=d||0;var e=null;return a.replace(c,function(){var a=arguments[d],c=arguments[arguments.length-2];c<=b&&c+a.length>=b&&(e=a)}),e},parseBigInt:function(a){return isNaN(Number(a))?NaN:a.toString()},subtractOne:subtractOne};module.exports=utils
});
define("app/utils/rtl_text",["module","require","exports","lib/twitter-text"],function(module, require, exports) {
var TwitterText=require("lib/twitter-text"),RTLText=function(){function q(a){try{return document.activeElement===a}catch(b){return!1}}function r(a){if(!q(a))return 0;var b;if(typeof a.selectionStart=="number")return a.selectionStart;if(document.selection){a.focus(),b=document.selection.createRange(),b.moveStart("character",-a.value.length);var c=b.text.length;return c}}function s(a,b){if(!q(a))return;if(typeof a.selectionStart=="number")a.selectionStart=b,a.selectionEnd=b;else if(document.selection){var c=a.createTextRange();c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",b),c.select()}}function t(a,b,c){var d=0,e="",f=b(a);for(var g=0;g<f.length;g++){var h=f[g],i="";h.screenName&&(i="screenName"),h.hashtag&&(i="hashtag"),h.url&&(i="url"),h.cashtag&&(i="cashtag");var j={entityText:a.slice(h.indices[0],h.indices[1]),entityType:i};e+=a.slice(d,h.indices[0])+c(j),d=h.indices[1]}return e+a.slice(d,a.length)}function u(a){var b=a.match(c),d=a;if(b||l==="rtl")d=t(d,TwitterText.extractEntitiesWithIndices,function(a){if(a.entityType==="screenName")return e+a.entityText+f;if(a.entityType==="hashtag")return a.entityText.charAt(1).match(c)?a.entityText:e+a.entityText;if(a.entityType==="url")return a.entityText+e;if(a.entityType==="cashtag")return e+a.entityText});return d}function v(a){var b,c=a.target?a.target:a.srcElement,e=a.which?a.which:a.keyCode;if(e===g.BACKSPACE)b=-1;else{if(e!==g.DELETE)return;b=0}var f=r(c),h=c.value,i=0,j;do j=h.charAt(f+b)||"",j&&(f+=b,i++,h=h.slice(0,f)+h.slice(f+1,h.length));while(j.match(d));i>1&&(c.value=h,s(c,f),a.preventDefault?a.preventDefault():a.returnValue=!1)}function w(a){return a.replace(d,"")}function x(a){var d=a.match(c);a=a.replace(k,"");var e=0,f=a.replace(m,""),g=l;if(!f||!f.replace(/#/g,""))return g==="rtl"?!0:!1;if(!d)return!1;if(a){var h=TwitterText.extractMentionsWithIndices(a),i=h.length,j;for(j=0;j<i;j++)e+=h[j].screenName.length+1;var n=TwitterText.extractUrlsWithIndices(a),o=n.length;for(j=0;j<o;j++)e+=n[j].url.length+2}var p=f.length-e;return p>0&&d.length/p>b}function y(a){var b=a.target||a.srcElement;a.type!=="keydown"||a.keyCode!==91&&a.keyCode!==16&&a.keyCode!==88&&a.keyCode!==17?a.type==="keyup"&&(a.keyCode===91||a.keyCode===16||a.keyCode===88||a.keyCode===17)&&(o[String(a.keyCode)]=!1):o[String(a.keyCode)]=!0,(!p&&o[91]||p&&o[17])&&o[16]&&o[88]&&(n=!0,b.dir==="rtl"?z("ltr",b):z("rtl",b),o={91:!1,16:!1,88:!1,17:!1})}function z(a,b){b.setAttribute("dir",a),b.style.direction=a,b.style.textAlign=a==="rtl"?"right":"left"}"use strict";var a={},b=.3,c=/[\u0590-\u083F]|[\u08A0-\u08FF]|[\uFB1D-\uFDFF]|[\uFE70-\uFEFF]/gm,d=/\u200e|\u200f/gm,e="‎",f="‏",g={BACKSPACE:8,DELETE:46},h=0,i=20,j=!1,k="",l="",m=/^\s+|\s+$/g,n=!1,o={91:!1,16:!1,88:!1,17:!1},p=navigator.userAgent.indexOf("Mac")===-1;return a.onTextChange=function(b){var c=b||window.event;y(b),c.type==="keydown"&&v(c),a.setText(c.target||c.srcElement)},a.setText=function(a){l||(a.style.direction?l=a.style.direction:a.dir?l=a.dir:document.body.style.direction?l=document.body.style.direction:l=document.body.dir),arguments.length===2&&(l=a.ownerDocument.documentElement.className,k=arguments[1]);var b=a.value;if(!b)return;var c=w(b);j=x(c);var d=u(c),e=j?"rtl":"ltr";d!==b&&(a.value=d,s(a,r(a)+d.length-c.length)),n||z(e,a)},a.textLength=function(a){var b=w(a),c=TwitterText.extractUrls(b),d=b.length-c.join("").length,e=c.length;for(var f=0;f<e;f++)d+=i,/^https:/.test(c[f])&&(d+=1);return h=d},a.cleanText=function(a){return w(a)},a.addRTLMarkers=function(a){return u(a)},a.shouldBeRTL=function(a){return x(a)},a}();typeof module!="undefined"&&module.exports&&(module.exports=RTLText)
});
define("app/ui/typeahead/typeahead_input",["module","require","exports","core/component","app/utils/caret","app/utils/event_support","app/utils/typeahead_helpers","app/utils/string","lib/twitter-text","app/utils/rtl_text"],function(module, require, exports) {
function typeaheadInput(){this.defaultAttrs({inputSelector:"#search-query",buttonSelector:".nav-search",dropdownSelectedItemSelector:".typeahead-items li.selected",completeAllEntities:!1,includeTweetContext:!1,tweetContextEnabled:!1,allowAccountsWithoutAtSign:!1,inputIsTweetbox:!1}),this.getDefaultKeycodes=function(){var a={13:{name:"ENTER",event:"uiTypeaheadInputSubmit",on:"keypress",preventDefault:!0,enabled:!0},9:{name:"TAB",event:"uiTypeaheadInputTab",on:"keydown",preventDefault:!0,canCauseComplete:!0,enabled:!0},37:{name:"LEFT",event:"uiTypeaheadInputLeft",on:"keydown",canCauseComplete:!0,enabled:!0},39:{name:"RIGHT",event:"uiTypeaheadInputRight",on:"keydown",canCauseComplete:!0,enabled:!0},38:{name:"UP",event:"uiTypeaheadInputMoveUp",on:"keydown",preventDefault:!0,enabled:!0},40:{name:"DOWN",event:"uiTypeaheadInputMoveDown",on:"keydown",preventDefault:!0,enabled:!0}};return a},this.setPreventKeyDefault=function(a,b){this.KEY_CODE_MAP[b.key].preventDefault=b.preventDefault},this.toggleTextareaActions=function(a){this.KEY_CODE_MAP[13].enabled=a,this.KEY_CODE_MAP[38].enabled=a,this.KEY_CODE_MAP[40].enabled=a},this.enableTextareaActionWatching=function(){this.toggleTextareaActions(!0)},this.disableTextareaActionWatching=function(){this.toggleTextareaActions(!1)},this.clearCurrentQuery=function(a){this.currentQuery=null},this.focusInput=function(a){this.$input.focus()},this.click=function(a){this.updateCaretPosition()},this.ignoreNextFocus=function(a){this.ignoreFocus=!0},this.updateCaretPosition=function(){if(this.ignoreFocus){this.ignoreFocus=!1;return}this.richTextareaMode||this.trigger(this.$input,"uiTextChanged",{text:this.$input.val(),position:caret.getPosition(this.$input[0])})},this.modifierKeyPressed=function(a){var b=this.KEY_CODE_MAP[a.which||a.keyCode],c=a.type=="keydown"&&a.which==16||a.type=="keyup"&&a.which==16;if(b&&b.enabled){if(a.type!==b.on)return;if(b.name=="TAB"&&a.shiftKey)return;if(this.releaseTabKey&&b.name=="TAB")return;if(b.preventDefault)if(this.attr.inputIsTweetbox&&b.name==="ENTER"){var d=this.select("dropdownSelectedItemSelector");d.length&&a.preventDefault()}else a.preventDefault();b.canCauseComplete&&this.isValidCompletionAction(b.event)&&(this.textareaMode||(this.releaseTabKey=!0),this.trigger(this.$input,"uiTypeaheadInputAutocomplete")),this.trigger(this.$input,b.event),this.updateCaretPosition()}else{if(a.keyCode==27)return;c||(this.releaseTabKey=!1),this.supportsInputEvent||this.handleInputChange(a)}},this.handleInputChange=function(a){this.richTextareaMode||(RTLText.onTextChange(a),this.trigger(this.$input,"uiTextChanged",{text:this.$input.val(),position:caret.getPosition(this.$input[0])}))},this.getCurrentWord=function(){var a;if(this.textareaMode){var b=twitterText.extractEntitiesWithIndices(this.text);b.forEach(function(b){var c=b.screenName&&!b.listSlug,d=this.attr.completeAllEntities&&(b.cashtag||b.hashtag),e=this.position>b.indices[0]&&this.position<=b.indices[1];(c||d)&&e&&(a=this.text.slice(b.indices[0],b.indices[1]))},this),this.attr.allowAccountsWithoutAtSign&&!a&&(a=this.getCurrentWordUsingRegex(REAL_NAME_REGEXP_ONE_WORD)||this.getCurrentWordUsingRegex(REAL_NAME_REGEXP_TWO_WORD))}else a=this.text.trim()==""?"":this.text;return a},this.getCurrentWordUsingRegex=function(a){var b=stringUtils.wordAtPosition(this.text,this.position,a,1);if(b){var c=b.split(/\s+/),d=c.every(function(a){var b=helpers.getFirstChar(a);return b==b.toUpperCase()});if(d)return b}},this.completeInput=function(a,b){a.stopPropagation();var c=b.value||b.query,d=c!==this.currentQuery&&(b.source!="account"||b.item.screen_name!==this.currentQuery);if(!d)return;var e=c;b.source=="account"&&(e=(this.textareaMode?"@":"")+b.item.screen_name,this.currentQuery=b.item.screen_name);if(this.textareaMode){var f=this.replaceWordAtPosition(this.text,this.position,b.input,e+" ");(!this.richTextareaMode||a.type=="uiTypeaheadItemSelected")&&this.$input.focus(),this.$input.trigger("uiChangeTextAndPosition",f)}else b.source!="account"&&this.$input.val(e),a.type!="uiTypeaheadItemSelected"&&(this.$input.focus(),this.setQuery(e));b.fromSelectionEvent=a.type=="uiTypeaheadItemSelected",this.trigger(this.$input,"uiTypeaheadItemComplete",b)},this.replaceWordAtPosition=function(a,b,c,d){var e=null;c=c.replace(UNSAFE_REGEX_CHARS,function(a){return"\\"+a});var a=a.replace(new RegExp(c+"\\s?","g"),function(){var a=arguments[0],c=arguments[arguments.length-2];return c<=b&&c+a.length>=b?(e=c+d.length,d):a});return{text:a,position:e}},this.isValidCompletionAction=function(a){var b=this.$input.attr("dir")==="rtl";return!this.textareaMode||a!=="uiTypeaheadInputRight"&&a!=="uiTypeaheadInputLeft"?b&&a==="uiTypeaheadInputRight"?!1:!b&&a==="uiTypeaheadInputLeft"?!1:!!this.text&&this.position!=this.text.length&&(a==="uiTypeaheadInputRight"||b&&a==="uiTypeaheadInputLeft")?!1:!0:!1},this.setQuery=function(a){var b;a=a?RTLText.cleanText(a):"";if(this.currentQuery==null||this.currentQuery!==a){this.currentQuery=a,b=a.length>0?0:-1,this.$button.attr("tabIndex",b);var c=this.attr.tweetContextEnabled&&this.attr.includeTweetContext?this.text:undefined;this.trigger(this.$input,"uiTypeaheadInputChanged",{value:this.currentQuery,tweetContext:c})}},this.setRTLMarkers=function(){RTLText.setText(this.$input.get(0))},this.clearInput=function(){this.$input.val(""),this.clearCurrentQuery(),this.$button.attr("tabIndex",-1),this.releaseTabKey=!1},this.saveTextAndPosition=function(a,b){if(b.position==Number.MAX_VALUE)return;this.text=b.text,this.position=b.position;var c=this.getCurrentWord();this.setQuery(c)},this.after("initialize",function(){this.$input=this.select("inputSelector"),this.textareaMode=!this.$input.is("input"),this.richTextareaMode=this.$input.is(".rich-editor"),this.$button=this.select("buttonSelector"),this.KEY_CODE_MAP=this.getDefaultKeycodes(),this.richTextareaMode&&this.disableTextareaActionWatching(),this.supportsInputEvent=eventSupport.browserSupports("input","input"),this.$button.attr("tabIndex",-1),this.on(this.$input,"keyup keydown keypress paste",this.modifierKeyPressed),this.on(this.$input,"input",this.handleInputChange),this.on("dataTypeaheadRecentSearchDeleted",this.focusInput),this.on("uiRemoveSavedSearch",this.focusInput),this.on(this.$input,"focus",this.updateCaretPosition),this.on("uiTypeaheadSelectionCleared",this.updateCaretPosition),this.on(this.$input,"uiTypeaheadIgnoreNextFocus",this.ignoreNextFocus),this.$input.is(":focus")&&this.updateCaretPosition(),this.on(this.$input,"blur",this.clearCurrentQuery),this.textareaMode&&(this.on(this.$input,"click",this.click),this.on("uiTypeaheadResultsShown",this.enableTextareaActionWatching),this.on("uiTypeaheadResultsHidden",this.disableTextareaActionWatching)),this.on("uiTextChanged",this.saveTextAndPosition),this.on(document,"uiBeforePageChanged",this.clearInput),this.on("uiTypeaheadSetPreventDefault",this.setPreventKeyDefault),this.on(document,"uiSwiftLoaded uiPageChanged",this.setRTLMarkers),this.on("uiTypeaheadItemPossiblyComplete uiTypeaheadItemSelected",this.completeInput)})}var defineComponent=require("core/component"),caret=require("app/utils/caret"),eventSupport=require("app/utils/event_support"),helpers=require("app/utils/typeahead_helpers"),stringUtils=require("app/utils/string"),twitterText=require("lib/twitter-text"),RTLText=require("app/utils/rtl_text");module.exports=defineComponent(typeaheadInput);var UNSAFE_REGEX_CHARS=/[[\]\\*?(){}.+$^]/g,REAL_NAME_REGEXP_ONE_WORD=twitterText.regexSupplant(/([a-z#{latinAccentChars}#{nonLatinHashtagChars}]{4,})/gi),REAL_NAME_REGEXP_TWO_WORD=twitterText.regexSupplant(/(?=((^|\b)[A-Z#{nonLatinHashtagChars}][A-Za-z#{latinAccentChars}#{nonLatinHashtagChars}]*\s[A-Z#{nonLatinHashtagChars}][A-Za-z#{latinAccentChars}#{nonLatinHashtagChars}]*))/g)
});
define("app/ui/typeahead/accounts_renderer",["module","require","exports","core/i18n","core/component"],function(module, require, exports) {
function accountsRenderer(){this.defaultAttrs({accountsListSelector:".js-typeahead-accounts",accountsItemSelector:".typeahead-account-item",accountsShortcutSelector:".typeahead-accounts-shortcut",accountsShortcutShow:!1,datasources:["accounts"],socialContextMapping:{FOLLOWING:1,FOLLOWS:8}}),this.renderAccounts=function(a,b){this.$accountsList.find(this.attr.accountsItemSelector).remove();var c=[];this.attr.datasources.forEach(function(a){c=c.concat(b.suggestions[a]||[])});if(!c.length){this.clearAccounts();return}this.updateShortcut(b.queryData.query),c.forEach(function(a){var b=this.$accountItemTemplate.clone(!1);b.attr("data-user-id",a.id),b.attr("data-user-screenname",a.screen_name),b.data("item",a);var c=b.find("a");c.attr("href","/"+a.screen_name),c.attr("data-search-query",a.id),c.find(".avatar").attr("src",this.getAvatar(a)),c.find(".fullname").text(a.name),c.find(".username b").text(a.screen_name),a.verified&&c.find(".js-verified").removeClass("hidden");if(this.attr.deciders.showDebugInfo){var d=a.prefetched;c.attr("title",(d?"local":"remote")+" user, score: "+a.rounded_score)}if(a.social_proof!==0&&this.attr.deciders.showSocialContext){var e=c.find(".typeahead-social-context"),f=this.getSocialContext(a);f&&(e.text(f),c.addClass("has-social-context"))}b.insertBefore(this.$accountsShortcut)},this),this.$accountsList.addClass("has-results"),this.$accountsList.show()},this.getAvatar=function(a){var b=a.profile_image_url_https,c=this.attr.deciders.showSocialContext;return b&&(b=b.replace(/^https?:/,""),b=c?b:b.replace(/_normal(\..*)?$/i,"_mini$1")),b},this.isMutualFollow=function(a){return this.currentUserFollowsAccount(a)&&this.accountFollowsCurrentUser(a)},this.currentUserFollowsAccount=function(a){var b=this.attr.socialContextMapping.FOLLOWING;return!!(a&b)},this.accountFollowsCurrentUser=function(a){var b=this.attr.socialContextMapping.FOLLOWS;return!!(a&b)},this.getSocialContext=function(a){var b=a.social_proof;return this.isMutualFollow(b)?_('Se siguen mutuamente'):this.currentUserFollowsAccount(b)?_('Siguiendo'):this.accountFollowsCurrentUser(b)?_('Te sigue'):a.first_connecting_user_name?a.connecting_user_count>1?_('Seguido por {{user}} y otros {{number}}',{user:a.first_connecting_user_name,number:a.connecting_user_count}):_('Seguido por {{user}}',{user:a.first_connecting_user_name}):!1},this.updateShortcut=function(a){this.$accountsShortcut.toggle(this.attr.accountsShortcutShow);var b=this.$accountsShortcut.find("a");b.attr("href","/search/users?q="+encodeURIComponent(a)),b.attr("data-search-query",a),a=$("<div/>").text(a).html(),b.html(_('Buscar <strong>{{query}}</strong> en todas las personas',{query:a}))},this.clearAccounts=function(){this.$accountsList.removeClass("has-results"),this.$accountsList.hide()},this.after("initialize",function(){this.$accountsList=this.select("accountsListSelector").first(),this.$accountsShortcut=this.select("accountsShortcutSelector").first(),this.$accountItemTemplate=this.select("accountsItemSelector").first().clone(!1),this.$accountsList.hide(),this.on("uiTypeaheadRenderResults",this.renderAccounts)})}var _=require("core/i18n"),defineComponent=require("core/component");module.exports=defineComponent(accountsRenderer)
});
define("app/ui/typeahead/saved_searches_renderer",["module","require","exports","core/component"],function(module, require, exports) {
function savedSearchesRenderer(){this.defaultAttrs({savedSearchesListSelector:".saved-searches-list",savedSearchesSelector:".saved-searches-list",savedSearchesItemSelector:".typeahead-saved-search-item",savedSearchesItemAnchorSelector:"a.js-nav",savedSearchesTitleSelector:".saved-searches-title",savedSearchesBlockSelector:".typeahead-saved-searches",savedSearchesRemoveSelector:".typeahead-saved-search-item .close",datasources:["savedSearches"]}),this.renderSavedSearches=function(a,b){this.$savedSearchesList.empty();var c=[];this.attr.datasources.forEach(function(a){c=c.concat(b.suggestions[a]||[])});if(c.length===0){this.$savedSearchesTitle.hide(),this.$savedSearchesBlock.removeClass("has-items");return}var d=b.queryData.query==="",e=this.$savedSearchesTitle.attr("id");c.reverse(),c.forEach(function(a){var b=this.$savedSearchItemTemplate.clone(!1);b.data("item",a);var c=b.find("a");c.attr("href",a.saved_search_path),c.attr("data-search-query",a.query),c.attr("data-query-source",a.search_query_source),c.attr("data-saved-search-id",a.id),c.append($("<span>").text(a.name)),d&&c.attr("aria-describedby",e),this.$savedSearchesList.append(b)},this),this.$savedSearchesTitle.toggle(d),this.$savedSearchesBlock.addClass("has-items")},this.removeSavedSearch=function(a,b){var c=$(a.target).closest(this.attr.savedSearchesItemSelector),d=c.find(this.attr.savedSearchesItemAnchorSelector),e=d.data("saved-search-id");c.siblings().length==0&&(this.$savedSearchesTitle.hide(),this.$savedSearchesBlock.removeClass("has-items")),c.remove(),this.trigger("uiRemoveSavedSearch",{id:e,component:"top_bar_searchbox"})},this.after("initialize",function(){this.$savedSearchItemTemplate=this.select("savedSearchesItemSelector").clone(!1),this.$savedSearchesList=this.select("savedSearchesSelector"),this.$savedSearchesTitle=this.select("savedSearchesTitleSelector"),this.$savedSearchesBlock=this.select("savedSearchesBlockSelector"),this.on("uiTypeaheadRenderResults",this.renderSavedSearches),this.on("click",{savedSearchesRemoveSelector:this.removeSavedSearch})})}var defineComponent=require("core/component");module.exports=defineComponent(savedSearchesRenderer)
});
define("app/ui/typeahead/recent_searches_renderer",["module","require","exports","core/component"],function(module, require, exports) {
function recentSearchesRenderer(){this.defaultAttrs({recentSearchesSelector:".recent-searches-list",recentSearchesItemSelector:".typeahead-recent-search-item",recentSearchesDismissSelector:".typeahead-recent-search-item .close",recentSearchesBlockSelector:".typeahead-recent-searches",recentSearchesTitleSelector:".recent-searches-title",recentSearchesClearAllSelector:".clear-recent-searches",datasources:["recentSearches"]}),this.deleteRecentSearch=function(a,b){var c=$(a.target).closest(this.attr.recentSearchesItemSelector),d=c.find("a.js-nav"),e=d.data("search-query");this.$recentSearchesList.children().length==1&&(this.$recentSearchesTitle.hide(),this.$recentSearchesBlock.removeClass("has-results"),this.$recentSearchesBlock.removeClass("has-items"),this.$recentSearchesClearAll.hide()),c.remove(),this.trigger("uiTypeaheadDeleteRecentSearch",{query:e})},this.deleteAllRecentSearches=function(a,b){this.$recentSearchesList.empty(),this.$recentSearchesTitle.hide(),this.$recentSearchesBlock.removeClass("has-results"),this.$recentSearchesBlock.removeClass("has-items"),this.$recentSearchesClearAll.hide(),this.trigger("uiTypeaheadDeleteRecentSearch",{deleteAll:!0})},this.renderRecentSearches=function(a,b){this.$recentSearchesList.empty();var c=this.attr.datasources.map(function(a){return b.suggestions[a]||[]}).reduce(function(a,b){return a.concat(b)});c.forEach(function(a){var b=this.$recentSearchItemTemplate.clone(!1);b.data("item",a);var c=b.find("a");c.attr("href",a.recent_search_path),c.attr("data-search-query",a.name),c.attr("data-query-source",a.search_query_source),c.append($("<span>").text(a.name)),this.$recentSearchesList.append(b)},this);var d=c.length!==0,e=b.queryData.query==="",f=e&&d;this.$recentSearchesBlock.toggleClass("has-results",!e&&d),this.$recentSearchesBlock.toggleClass("has-items",d),this.$recentSearchesTitle.toggle(f),this.$recentSearchesClearAll.toggle(f)},this.after("initialize",function(){this.$recentSearchItemTemplate=this.select("recentSearchesItemSelector").clone(!1),this.$recentSearchesList=this.select("recentSearchesSelector"),this.$recentSearchesBlock=this.select("recentSearchesBlockSelector"),this.$recentSearchesTitle=this.select("recentSearchesTitleSelector"),this.$recentSearchesClearAll=this.select("recentSearchesClearAllSelector"),this.on("click",{recentSearchesDismissSelector:this.deleteRecentSearch,recentSearchesClearAllSelector:this.deleteAllRecentSearches}),this.on("uiTypeaheadRenderResults",this.renderRecentSearches),this.on("uiTypeaheadDeleteAllRecentSearches",this.deleteAllRecentSearches)})}var defineComponent=require("core/component");module.exports=defineComponent(recentSearchesRenderer)
});
define("app/ui/typeahead/topics_renderer",["module","require","exports","core/i18n","core/component"],function(module, require, exports) {
function topicsRenderer(){this.defaultAttrs({includeSearchGlass:!0,parseHashtags:!1,topicsListSelector:".topics-list",topicsItemSelector:".typeahead-topic-item",datasources:["topics"],emptySocialContextClass:"empty-topics-social-context"}),this.isHashOrCashtag=function(a){return a==="#"||a==="$"},this.renderTopics=function(a,b){this.$topicsList.empty();var c=[],d=b.queryData&&b.queryData.query;this.attr.datasources.forEach(function(a){c=c.concat(b.suggestions[a]||[])});if(!c.length){this.clearTopics();return}c.forEach(function(a){var b=this.$topicsItemTemplate.clone(!1);b.data("item",a);var c=b.find("a"),e=a.topic||a.hashtag;c.attr("href",a.searchPath),c.attr("data-search-query",e);var f=e.charAt(0),g=this.attr.parseHashtags&&this.isHashOrCashtag(f),h=a.location&&this.attr.deciders.showTypeaheadTopicSocialContext;if(g){var i=$("<span>").text(f);i.append($("<strong>").text(e.slice(1))),c.append(i)}else if(h){var j=c.find(".typeahead-social-context");j.text(this.getSocialContext(a)),j.show(),c.children().last().before($("<span>").text(e))}else if(d&&this.attr.deciders.reverseBoldingEnabled){var k=this.isHashOrCashtag(d.charAt(0)),l=this.isHashOrCashtag(e.charAt(0)),m=!k&&l?1:0,i=$("<span>").text(e.substr(0,d.length+m));i.append($("<strong>").text(e.slice(d.length+m))),c.append(i)}else a.name?c.html(a.name):c.append($("<span>").text(e)),this.attr.deciders.showTypeaheadTopicSocialContext&&c.addClass(this.attr.emptySocialContextClass);b.appendTo(this.$topicsList)},this),this.$topicsList.addClass("has-results"),this.$topicsList.show()},this.getSocialContext=function(a){return _('Tendencia en {{location}}',{location:a.location})},this.clearTopics=function(a){this.$topicsList.removeClass("has-results"),this.$topicsList.hide()},this.after("initialize",function(){this.$topicsItemTemplate=this.select("topicsItemSelector").clone(!1),this.attr.includeSearchGlass||this.$topicsItemTemplate.find(".icon.generic-search").remove(),this.$topicsList=this.select("topicsListSelector"),this.$topicsList.hide(),this.on("uiTypeaheadRenderResults",this.renderTopics)})}var _=require("core/i18n"),defineComponent=require("core/component");module.exports=defineComponent(topicsRenderer)
});
define("app/ui/typeahead/trend_locations_renderer",["module","require","exports","core/component","core/i18n"],function(module, require, exports) {
function trendLocationsRenderer(){this.defaultAttrs({typeaheadItemClass:"typeahead-item",trendLocationsListSelector:".typeahead-trend-locations-list",trendLocationsItemSelector:".typeahead-trend-locations-item",datasources:["trendLocations"]}),this.renderTrendLocations=function(a,b){this.$trendLocationsList.empty();var c=[];this.attr.datasources.forEach(function(a){c=c.concat(b.suggestions[a]||[])}),c.forEach(function(a){var b=this.$trendLocationItemTemplate.clone(!1),c=b.find("a");b.data("item",a),c.attr("data-search-query",a.name),c.attr("href","#"),c.append(this.getLocationHtml(a)),a.woeid==-1&&(b.removeClass(this.attr.typeaheadItemClass),c.attr("data-search-query","")),b.appendTo(this.$trendLocationsList)},this)},this.getLocationHtml=function(a){var b=$("<span>");switch(a.placeTypeCode){case placeTypeMapping.WORLDWIDE:case placeTypeMapping.NOT_FOUND:b.text(a.name);break;case placeTypeMapping.COUNTRY:b.html(a.name+"  "+_('(Todas las ciudades)'));break;default:b.text([a.name,a.countryName].join(", "))}return b},this.after("initialize",function(){this.$trendLocationItemTemplate=this.select("trendLocationsItemSelector").clone(!1),this.$trendLocationsList=this.select("trendLocationsListSelector"),this.on("uiTypeaheadRenderResults",this.renderTrendLocations)})}var defineComponent=require("core/component"),_=require("core/i18n");module.exports=defineComponent(trendLocationsRenderer);var placeTypeMapping={WORLDWIDE:19,COUNTRY:12,CITY:7,NOT_FOUND:-1}
});
define("app/ui/typeahead/concierge_renderer",["module","require","exports","core/component"],function(module, require, exports) {
function conciergeRenderer(){this.defaultAttrs({conciergeBlockSelector:".typeahead-concierge",conciergeListSelector:".typeahead-concierge-list",conciergeItemSelector:".typeahead-concierge-item",datasource:"concierge"}),this.renderConcierge=function(a,b){this.$conciergeList.empty();var c=b.suggestions&&b.suggestions[this.attr.datasource]||[],d=!!c.length;c.forEach(function(a){var b=this.$conciergeItemTemplate.clone(!1),c=b.find("a");b.data("item",a),c.attr("href",a.searchPath),c.attr("data-search-query",a.topic),c.attr("data-query-source",a.querySource),c.append($("<span>").text(a.name)),this.$conciergeList.append(b)},this),this.$conciergeBlock.toggleClass("has-items",d),this.$conciergeBlock.toggle(d)},this.after("initialize",function(){this.$conciergeItemTemplate=this.select("conciergeItemSelector").clone(!1),this.$conciergeBlock=this.select("conciergeBlockSelector"),this.$conciergeList=this.select("conciergeListSelector"),this.on("uiTypeaheadRenderResults",this.renderConcierge)})}var defineComponent=require("core/component");module.exports=defineComponent(conciergeRenderer)
});
define("app/ui/typeahead/selected_users_renderer",["module","require","exports","core/i18n","core/component"],function(module, require, exports) {
function mediaTaggingRenderer(){function a(a,b){if(!b)return!1;for(var c=0;c<b.length;c++)if(a.id==b[c].id)return!0;return!1}this.defaultAttrs({rootSelector:".typeahead-user-select",accountsListSelector:".js-typeahead-accounts",accountsItemSelector:".typeahead-account-item",selectedItemSelector:".typeahead-selected-item",accountsEndPlaceholderSelector:".typeahead-accounts-end",selectedEndPlaceholderSelector:".typeahead-selected-end",emptyTextSelector:".typeahead-empty-suggestions",selectedListSelector:".js-typeahead-selected",mediaTaggingSelector:".tagging-dropdown",datasources:["accounts","selectedUsers"],socialContextMapping:{FOLLOWING:1,FOLLOWS:8}}),this.renderAccounts=function(a,b){this.$accountsList.find(this.attr.accountsItemSelector).remove(),this.$selectedList.find(this.attr.selectedItemSelector).remove();var c=b.suggestions.selectedUsers||[],d;b.queryData?d=b.queryData.query||"":d="";var e=[];this.attr.datasources.forEach(function(a){if(a=="accounts"||a=="mediaTagAccounts"||a=="prefillUsers"&&d.length==0&&c.length==0)e=e.concat(b.suggestions[a]||[])}),e&&e.length>0?(e.forEach(function(a){var b=this.$accountItemTemplate.clone(!1);this.addUser(b,this.$accountsEnd,a,c)},this),this.$accountsList.addClass("has-results"),this.$accountsList.show()):this.clearAccounts();var f=e&&e.length>0,g=d.length>0,h=c&&c.length>0;!f&&!g&&h?(c.forEach(function(a){var b=this.$selectedItemTemplate.clone(!1);this.addUser(b,this.$selectedEnd,a,c)},this),this.$selectedList.addClass("has-results"),this.$selectedList.show()):this.clearSelected();var i=this.select("emptyTextSelector").first(),j=b.suggestions.prefillUsers&&e.length-b.suggestions.prefillUsers.length==0;j&&c.length==0&&e.length>0?i.show():i.hide(),a.stopPropagation()},this.addUser=function(b,c,d,e){b.attr("data-user-id",d.id),b.attr("data-user-screenname",d.screen_name),b.data("item",d);var f=b.find("a");f.attr("href","/"+d.screen_name),f.attr("data-search-query",d.id),f.find(".avatar").attr("src",this.getAvatar(d)),f.find(".fullname").text(d.name),f.find(".username b").text(d.screen_name),d.verified&&f.find(".js-verified").removeClass("hidden"),a(d,e)?(b.addClass("selected-user"),f.attr("aria-selected","true")):f.attr("aria-selected","false");var g=this.$node.hasClass("photo-tagging-container");g&&d.can_media_tag===!1&&b.addClass("cannot-select");if(this.attr.deciders.showDebugInfo){var h=d.prefetched;f.attr("title",(h?"local":"remote")+" user, score: "+d.rounded_score)}if(d.social_proof!==0&&this.attr.deciders.showSocialContext){var i=f.find(".typeahead-social-context"),j=this.getSocialContext(d);j&&(i.text(j),f.addClass("has-social-context"))}b.insertBefore(c)},this.getAvatar=function(a){var b=a.profile_image_url_https,c=this.attr.deciders.showSocialContext;return b&&(b=b.replace(/^https?:/,""),b=c?b:b.replace(/_normal(\..*)?$/i,"_mini$1")),b},this.isMutualFollow=function(a){return this.currentUserFollowsAccount(a)&&this.accountFollowsCurrentUser(a)},this.currentUserFollowsAccount=function(a){var b=this.attr.socialContextMapping.FOLLOWING;return!!(a&b)},this.accountFollowsCurrentUser=function(a){var b=this.attr.socialContextMapping.FOLLOWS;return!!(a&b)},this.getSocialContext=function(a){var b=a.social_proof;return this.isMutualFollow(b)?_('Se siguen mutuamente'):this.currentUserFollowsAccount(b)?_('Siguiendo'):this.accountFollowsCurrentUser(b)?_('Te sigue'):a.first_connecting_user_name?a.connecting_user_count>1?_('Seguido por {{user}} y otros {{number}}',{user:a.first_connecting_user_name,number:a.connecting_user_count}):_('Seguido por {{user}}',{user:a.first_connecting_user_name}):!1},this.clearAccounts=function(){this.$accountsList.removeClass("has-results"),this.$accountsList.hide()},this.clearSelected=function(){this.$selectedList.removeClass("has-results"),this.$selectedList.hide()},this.after("initialize",function(){this.$accountsList=this.select("accountsListSelector"),this.$selectedList=this.select("selectedListSelector"),this.$accountsEnd=this.select("accountsEndPlaceholderSelector"),this.$accountItemTemplate=this.select("accountsItemSelector").clone(!1),this.$selectedItemTemplate=this.select("selectedItemSelector").clone(!1),this.$selectedEnd=this.select("selectedEndPlaceholderSelector"),this.$accountsList.hide(),this.on("uiTypeaheadRenderResults",this.renderAccounts)})}var _=require("core/i18n"),defineComponent=require("core/component");module.exports=defineComponent(mediaTaggingRenderer)
});
define("app/ui/typeahead/typeahead_dropdown",["module","require","exports","core/component","core/utils","app/ui/typeahead/accounts_renderer","app/ui/typeahead/saved_searches_renderer","app/ui/typeahead/recent_searches_renderer","app/ui/typeahead/topics_renderer","app/ui/typeahead/trend_locations_renderer","app/ui/typeahead/concierge_renderer","app/ui/typeahead/selected_users_renderer","app/utils/rtl_text"],function(module, require, exports) {
function typeaheadDropdown(){this.defaultAttrs({inputSelector:"#search-query",dropdownSelector:".dropdown-menu.typeahead",itemsContainerSelector:".typeahead-items",itemsSelector:".typeahead-items li",itemAnchorsSelector:".typeahead-items li a",itemSelector:".typeahead-item",categoryTitle:".typeahead-category-title",selectedItemSelector:".typeahead-items li.selected",selectedClass:"selected",blockLinkActions:!1,alwaysOpen:!1,deciders:{showDebugInfo:!1,showSocialContext:!1,showTypeaheadTopicSocialContext:!1},autocompleteAccounts:!0,datasourceRenders:[["concierge",["concierge"]],["savedSearches",["savedSearches"]],["recentSearches",["recentSearches"]],["topics",["topics"]],["accounts",["accounts"]]],datasourceOptions:{},typeaheadSrc:"UNKNOWN",templateContainerSelector:".dropdown-inner",recentSearchesListSelector:".typeahead-recent-searches",savedSearchesListSelector:".typeahead-saved-searches",topicsListSelector:".typeahead-topics",accountsListSelector:".js-typeahead-accounts",trendLocationsListSelector:".typeahead-trend-locations-list",conciergeSelector:".typeahead-concierge",userSelectSelector:".typeahead-user-select",selectedListSelector:".typeahead-selected",renderLimit:undefined}),this.mouseOver=function(a,b){this.clearSelected(),$(b.el).addClass(this.attr.selectedClass)},this.clearSelected=function(){this.select("itemsSelector").removeClass(this.attr.selectedClass)},this.moveSelection=function(a){var b=this.select("itemsSelector").filter(":visible"),c=b.filter(".selected");c.removeClass(this.attr.selectedClass),c.find("a").removeAttr("aria-selected"),this.$input.removeAttr("aria-activedescendant");var d=b.index(c)+a;d=(d+1)%(b.length+1)-1;if(d===-1){this.trigger("uiTypeaheadSelectionCleared");return}d<-1&&(d=b.length-1);var e=b.eq(d),f=e.find("a");e.addClass(this.attr.selectedClass),f.attr("aria-selected",!0),this.$input.attr("aria-activedescendant",f.attr("id"))},this.moveSelectionUp=function(a){this.moveSelection(-1)},this.moveSelectionDown=function(a){this.moveSelection(1)},this.dropdownIsOpen=function(){if(this.attr.alwaysOpen)return!0;if(window.DEBUG&&window.DEBUG.enabled&&this.openState!==this.$dropdown.is(":visible"))throw new Error("Dropdown markup and internal openState variable are out of sync.");return this.openState},this.show=function(){this.$dropdown.show(),this.$input.attr("aria-expanded",!0),this.openState=!0},this.hide=function(a){if(this.mouseIsOverDropdown)return;if(!this.dropdownIsOpen()||this.attr.alwaysOpen)return;this.$dropdown.find(".selected a").removeAttr("aria-selected"),this.$dropdown.hide(),this.$input.attr("aria-expanded",!1),this.$input.removeAttr("aria-activedescendant"),this.openState=!1},this.hideAndManageEsc=function(a){if(!this.dropdownIsOpen()||this.attr.alwaysOpen)return;this.forceHide(),a.preventDefault(),a.stopPropagation()},this.forceHide=function(){this.clearMouseTracking(),this.hide()},this.inputValueUpdated=function(a,b){this.lastQuery=b.value;var c=utils.merge(this.attr.datasourceOptions,{query:b.value,tweetContext:b.tweetContext,typeaheadSrc:this.attr.typeaheadSrc});this.trigger("uiNeedsTypeaheadSuggestions",{datasources:this.datasources,queryData:c,id:this.getDropdownId()})},this.getDropdownId=function(){return this.dropdownId||(this.dropdownId="swift_typeahead_dropdown_"+Math.floor(Math.random()*1e6)),this.dropdownId},this.checkIfSelectionFromSearchInput=function(a){return a.closest("form").find("input").hasClass("search-input")},this.triggerSelectionEvent=function(a,b){this.attr.blockLinkActions&&a.preventDefault();var c=this.select("itemsSelector"),d=c.filter(".selected").first();if(d.length==0)return;var e=d.find("a"),f=d.index(),g=this.lastQuery,h=e.attr("data-search-query"),i=e.attr("data-query-source");d.removeClass(this.attr.selectedClass),this.$input.removeAttr("aria-activedescendant");if(!g&&!h&&i!=="typeahead_oneclick")return;var j=this.getItemData(d);this.trigger("uiTypeaheadItemSelected",{isSearchInput:this.checkIfSelectionFromSearchInput(e),index:f,source:e.data("ds"),query:h,input:g,display:d.data("user-screenname")||h,href:e.attr("href"),isClick:a.originalEvent?a.originalEvent.type==="click":!1,item:j}),this.forceHide()},this.getItemData=function(a){return a.data("item")},this.submitQuery=function(a,b){var c=this.select("itemsSelector").filter(".selected").first();if(c.length){this.triggerSelectionEvent(a,b);return}var d=this.$input.val();if(d.trim()==="")return;this.trigger("uiTypeaheadSubmitQuery",{query:RTLText.cleanText(d)}),this.forceHide()},this.getSelectedCompletion=function(){var a=this.select("itemsSelector").filter(".selected").first();!a.length&&this.dropdownIsOpen()&&(a=this.select("itemsSelector").filter(".typeahead-item").first());if(!a.length||this.$dropdown.attr("id")!=a.closest(this.attr.dropdownSelector).attr("id"))return;var b=a.find("a"),c=b.data("search-query"),d=this.select("itemsSelector"),e=d.index(a),f=this.lastQuery;if(b.data("ds")=="account"&&!this.attr.autocompleteAccounts)return;var g=this.getItemData(a);this.trigger("uiTypeaheadItemPossiblyComplete",{value:c,source:b.data("ds"),index:e,query:c,item:g,display:a.data("user-screenname")||c,input:f,href:b.attr("href")||""})},this.renderResults=function(a){if(!this.attr.renderLimit){this.trigger("uiTypeaheadRenderResults",a);return}var b=0,c=0,d=0,e={},f=a.suggestions,g=this.attr.renderLimit;this.datasources.forEach(function(f){a.suggestions[f]&&d<g&&(b=g-d,c=a.suggestions[f].length<b?a.suggestions[f].length:b,e[f]=a.suggestions[f].slice(0,c),d+=c)}),a.suggestions=e,this.trigger("uiTypeaheadRenderResults",a),a.suggestions=f},this.updateDropdown=function(a,b){var c=this.$input.is(document.activeElement);if(b.id!==this.getDropdownId()||!b.queryData.atSignRemoved&&b.queryData.query!==this.lastQuery||b.queryData.atSignRemoved&&b.queryData.query!==this.lastQuery.substring(1)||!c&&!this.attr.alwaysOpen)return;var d=this.select("itemsSelector").filter(".selected").first(),e=d.find("a").data("ds"),f=d.find("a").data("search-query");this.renderResults(b);if(e&&f){var g=this.select("itemsSelector").find("[data-ds='"+e+"'][data-search-query='"+f+"']");g.closest("li").addClass(this.attr.selectedClass)}var h="typeahead-item-";this.select("itemAnchorsSelector").each(function(a,b){$(b).attr("id",h+a)});var i=this.datasources.map(function(a){return b.suggestions[a]?b.suggestions[a].length:0}),j=i.reduce(function(a,b){return a+b}),k=!!b.queryData.query;j>0&&(c||this.attr.alwaysOpen)?(this.show(),this.trigger("uiTypeaheadSetPreventDefault",{preventDefault:k,key:9}),this.trigger("uiTypeaheadResultsShown",{numResults:j,query:b.queryData.query})):(this.forceHide(),this.trigger("uiTypeaheadSetPreventDefault",{preventDefault:!1,key:9}),this.trigger("uiTypeaheadResultsHidden"))},this.trackMouse=function(a,b){this.mouseIsOverDropdown=!0},this.clearMouseTracking=function(a,b){this.mouseIsOverDropdown=!1,this.clearSelected()},this.resetTemplates=function(){this.$templateContainer.empty(),this.$templateContainer.append(this.$conciergeTemplate),this.$templateContainer.append(this.$savedSearchesTemplate),this.$templateContainer.append(this.$recentSearchesTemplate),this.$templateContainer.append(this.$topicsTemplate),this.$templateContainer.append(this.$accountsTemplate),this.$templateContainer.append(this.$trendLocationsTemplate),this.$templateContainer.append(this.$userSelectTemplate)},this.addRenderer=function(a,b,c){c=utils.merge(c,{datasources:b});var d="block"+this.blockCount++;a==="accounts"?(this.$accountsTemplate.clone().addClass(d).appendTo(this.$templateContainer),AccountsRenderer.attachTo(this.$node,utils.merge(c,{accountsListSelector:this.attr.accountsListSelector+"."+d}))):a==="topics"?(this.$topicsTemplate.clone().addClass(d).appendTo(this.$templateContainer),TopicsRenderer.attachTo(this.$node,utils.merge(c,{topicsListSelector:this.attr.topicsListSelector+"."+d}))):a==="savedSearches"?(this.$savedSearchesTemplate.clone().addClass(d).appendTo(this.$templateContainer),SavedSearchesRenderer.attachTo(this.$node,utils.merge(c,{savedSearchesListSelector:this.attr.savedSearchesListSelector+"."+d}))):a==="recentSearches"?(this.$recentSearchesTemplate.clone().addClass(d).appendTo(this.$templateContainer),RecentSearchesRenderer.attachTo(this.$node,utils.merge(c,{recentSearchesListSelector:this.attr.recentSearchesListSelector+"."+d}))):a==="trendLocations"?(this.$trendLocationsTemplate.clone().addClass(d).appendTo(this.$templateContainer),TrendLocationsRenderer.attachTo(this.$node,utils.merge(c,{trendLocationsListSelector:this.attr.trendLocationsListSelector+"."+d}))):a==="concierge"?(this.$conciergeTemplate.clone().addClass(d).appendTo(this.$templateContainer),ConciergeRenderer.attachTo(this.$node,utils.merge(c,{conciergeSelector:this.attr.conciergeSelector+"."+d}))):a==="selectedUsers"&&(this.$userSelectTemplate.clone().addClass(d).appendTo(this.$templateContainer),SelectedUsersRenderer.attachTo(this.$node,utils.merge(c,{rootSelector:this.attr.userSelectSelector+"."+d,accountsListSelector:this.attr.accountsListSelector,selectedListSelector:this.attr.selectedListSelector})),this.$dropdown.attr("aria-multiselectable","true"))},this.applyARIAToInput=function(){instances+=1;var a="typeahead-dropdown-"+instances;this.$dropdown.attr("id",a),this.$input.attr({"aria-autocomplete":"list","aria-expanded":!1,"aria-owns":a})},this.before("teardown",this.resetTemplates),this.after("initialize",function(a,b){this.openState=!1,this.$input=this.select("inputSelector").first(),this.$dropdown=this.select("dropdownSelector").first(),this.applyARIAToInput(),this.$templateContainer=this.select("templateContainerSelector").first(),this.$accountsTemplate=this.select("accountsListSelector").first().clone(!1),this.$savedSearchesTemplate=this.select("savedSearchesListSelector").first().clone(!1),this.$recentSearchesTemplate=this.select("recentSearchesListSelector").first().clone(!1),this.$topicsTemplate=this.select("topicsListSelector").first().clone(!1),this.$trendLocationsTemplate=this.select("trendLocationsListSelector").first().clone(!1),this.$conciergeTemplate=this.select("conciergeSelector").first().clone(!1),this.$userSelectTemplate=this.select("userSelectSelector").first().clone(!1),this.$templateContainer.empty(),this.datasources=[],this.attr.datasourceRenders.forEach(function(a){this.datasources=this.datasources.concat(a[1])},this),this.datasources=utils.uniqueArray(this.datasources),this.blockCount=0,this.attr.datasourceRenders.forEach(function(a){this.addRenderer(a[0],a[1],b)},this),this.on(this.$input,"blur",this.hide),this.on(this.$input,"uiTypeaheadInputSubmit",this.submitQuery),this.on(this.$input,"uiTypeaheadInputChanged",this.inputValueUpdated),this.on(this.$input,"uiTypeaheadInputMoveUp",this.moveSelectionUp),this.on(this.$input,"uiTypeaheadInputMoveDown",this.moveSelectionDown),this.on(this.$input,"uiTypeaheadInputAutocomplete",this.getSelectedCompletion),this.on(this.$input,"uiTypeaheadInputTab",this.clearMouseTracking),this.on(this.$input,"uiShortcutEsc",this.hideAndManageEsc),this.on(this.$dropdown,"mouseenter",this.trackMouse),this.on(this.$dropdown,"mouseleave",this.clearMouseTracking),this.on(document,"dataTypeaheadSuggestionsResults",this.updateDropdown),this.on(document,"uiBeforePageChanged",this.forceHide),this.on("mouseover",{itemsSelector:this.mouseOver}),this.on("click",{itemsSelector:this.triggerSelectionEvent}),this.attr.alwaysOpen&&(this.$input.attr("aria-expanded",!0),this.$dropdown.show().attr("aria-hidden",!1),this.openState=!0)})}var defineComponent=require("core/component"),utils=require("core/utils"),AccountsRenderer=require("app/ui/typeahead/accounts_renderer"),SavedSearchesRenderer=require("app/ui/typeahead/saved_searches_renderer"),RecentSearchesRenderer=require("app/ui/typeahead/recent_searches_renderer"),TopicsRenderer=require("app/ui/typeahead/topics_renderer"),TrendLocationsRenderer=require("app/ui/typeahead/trend_locations_renderer"),ConciergeRenderer=require("app/ui/typeahead/concierge_renderer"),SelectedUsersRenderer=require("app/ui/typeahead/selected_users_renderer"),RTLText=require("app/utils/rtl_text"),instances=0;module.exports=defineComponent(typeaheadDropdown)
});
define("app/utils/setup_polling_with_backoff",["module","require","exports","core/clock","core/utils"],function(module, require, exports) {
function setupPollingWithBackoff(a,b,c){var d={focusedInterval:3e4,blurredInterval:9e4,backoffFactor:2};c=utils.merge(d,c);var e=clock.setIntervalEvent(a,c.focusedInterval,c.eventData);return $(document).on("uiPageHidden",e.backoff.bind(e,c.blurredInterval,c.backoffFactor)),$(document).on("uiPageVisible",e.cancelBackoff.bind(e)),e}var clock=require("core/clock"),utils=require("core/utils");module.exports=setupPollingWithBackoff
});
define("app/data/trends",["module","require","exports","core/component","app/utils/setup_polling_with_backoff","app/data/with_data"],function(module, require, exports) {
var defineComponent = require('core/component'), setupPollingWithBackoff = require('app/utils/setup_polling_with_backoff'), withData = require('app/data/with_data');
module.exports = defineComponent(trendsData, withData);
function trendsData() {
    this.defaultAttrs({
        src: 'module',
        $backoffNode: $(window),
        trendsPollingOptions: {
            focusedInterval: 5 * 60 * 1000,
            blurredInterval: 20 * 60 * 1000,
            eventData: { source: 'clock' }
        }
    });
    this.makeTrendsRequest = function (data) {
        var woeid = data.woeid;
        var source = data.source;
        var success = function (results) {
            results.source = source;
            this.trigger('dataTrendsRefreshed', results);
        };
        // TODO(DISCOFE-536): Remove pc param once server always returns promoted trends
        // for logged in users.
        this.get({
            url: '/trends',
            eventData: data,
            data: {
                k: this.currentCacheKey,
                woeid: woeid,
                pc: true,
                personalized: data.personalized,
                src: this.attr.src,
                show_context: this.attr.show_context
            },
            success: success.bind(this),
            error: 'dataTrendsRefreshedError'
        });
    };
    this.makeTrendsDialogRequest = function (data, isUpdate) {
        var reqData = {
                woeid: data.woeid,
                personalized: data.personalized,
                pc: true
            };
        var success = function (results) {
            this.trigger('dataGotTrendsDialog', results);
            if (this.currentWoeid && this.currentWoeid !== results.woeid) {
                this.trigger('dataTrendsLocationChanged');
            }
            this.currentWoeid = results.woeid;
            if (results.trends_cache_key) {
                this.currentCacheKey = results.trends_cache_key;
                // after the user changes their settings,
                // clear the push state cache so that on
                // navigation, this component will initialize
                // with the new trendsCacheKey.
                this.trigger('dataPageMutated');
            }
            // SEARCHFE-1021: This triggers a request to MS to render the trends data after a request has been sent
            // to MR to write the new trends settings. This does not work properly when running local monorail because writes
            // are not properly preserved. Testing in this area is limited to ensuring that the correct response is sent to MS.
            // There are separate tests to ensure that these requests are handled properly.
            if (results.update_module_html) {
                this.trigger('uiRefreshTrends', results);
            }
        };
        var xhr = isUpdate ? this.post : this.get;
        xhr.call(this, {
            url: '/trends/dialog',
            eventData: data,
            data: reqData,
            success: success.bind(this),
            error: 'dataGotTrendsDialogError'
        });
    };
    this.changeTrendsLocation = function (event, data) {
        this.makeTrendsDialogRequest(data, true);
    };
    this.refreshTrends = function (event, data) {
        data = data || {};
        this.makeTrendsRequest(data);
    };
    this.getTrendsDialog = function (event, data) {
        data = data || {};
        this.makeTrendsDialogRequest(data);
    };
    this.updateTrendsCacheKey = function (event, data) {
        this.currentCacheKey = data.trendsCacheKey;
    };
    this.after('initialize', function () {
        // the trends module is served with http caching.
        // a cache key is included in every request so
        // that for every trends setting, a unique url
        // is used.
        this.currentCacheKey = this.attr.trendsCacheKey;
        this.timer = setupPollingWithBackoff('uiRefreshTrends', this.attr.$backoffNode, this.attr.trendsPollingOptions);
        this.on('uiWantsTrendsDialog', this.getTrendsDialog);
        this.on('uiChangeTrendsLocation', this.changeTrendsLocation);
        this.on('uiRefreshTrends', this.refreshTrends);
        // TODO(DISCOFE-482): Remove this temporary hack once we have
        // a trends location write endpoint.
        this.on('dataTempTrendsCacheKeyChanged', this.updateTrendsCacheKey);
    });
}
});
define("app/data/trends/location_dialog",["module","require","exports","core/component","app/data/with_data"],function(module, require, exports) {
var defineComponent = require('core/component'), withData = require('app/data/with_data');
module.exports = defineComponent(trendsLocationDialogData, withData);
function trendsLocationDialogData() {
    this.getTrendsLocationDialog = function (event, data) {
        var success = function (results) {
            this.trigger('dataGotTrendsLocationDialog', results);
            if (results.trendLocations) {
                this.trigger('dataLoadedTrendLocations', { trendLocations: results.trendLocations });
            }
        };
        this.get({
            url: '/trends/location_dialog',
            eventData: data,
            success: success.bind(this),
            error: 'dataGotTrendsLocationDialogError'
        });
    };
    this.updateTrendsLocation = function (event, data) {
        var location = data.location || {};
        // TODO(DISCOFE-536): Remove pc param once server always returns promoted trends
        // for logged in users.
        var reqData = {
                woeid: location.woeid,
                personalized: data.personalized,
                pc: true
            };
        var success = function (results) {
            this.trigger('dataChangedTrendLocation', {
                personalized: results.personalized,
                location: location
            });
            if (results.trends_cache_key) {
                // TODO(DISCOFE-482): Remove this temporary hack once we have
                // a trends location write endpoint.
                this.trigger('dataTempTrendsCacheKeyChanged', { trendsCacheKey: results.trends_cache_key });
                // after the user changes their settings,
                // clear the push state cache so that on
                // navigation, this component will initialize
                // with the new trendsCacheKey.
                this.trigger('dataPageMutated');
            }
            // SEARCHFE-1021: This triggers a request to MS to render the trends data after a request has been sent
            // to MR to write the new trends settings. This does not work properly when running local monorail because writes
            // are not properly preserved. Testing in this area is limited to ensuring that the correct response is sent to MS.
            // There are separate tests to ensure that these requests are handled properly.
            if (results.update_module_html) {
                this.trigger('uiRefreshTrends', results);
            }
        };
        // TODO(DISCOFE-482): Posting to the monorail endpoint until we
        // have a MS write endpoint.
        this.post({
            url: '/trends/dialog',
            eventData: data,
            data: reqData,
            success: success.bind(this),
            error: 'dataGotTrendsLocationDialogError'
        });
    };
    this.after('initialize', function () {
        this.on('uiWantsTrendsLocationDialog', this.getTrendsLocationDialog);
        this.on('uiChangeLocation', this.updateTrendsLocation);
    });
}
;
});
define("app/data/trends/recent_locations",["module","require","exports","core/component","app/utils/storage/custom","app/data/with_data"],function(module, require, exports) {
var defineComponent = require('core/component'), customStorage = require('app/utils/storage/custom'), withData = require('app/data/with_data');
module.exports = defineComponent(trendsRecentLocations, withData);
function trendsRecentLocations() {
    this.defaultAttrs({
        storageName: 'recent_trend_locations',
        storageKey: 'locations',
        maxRecentLocations: 5
    });
    this.initializeStorage = function () {
        var Storage = customStorage({
                withArray: true,
                withMaxElements: true
            });
        this.storage = new Storage(this.attr.storageName);
        this.storage.setMaxElements(this.attr.storageKey, this.attr.maxRecentLocations);
    };
    this.getRecentTrendLocations = function () {
        this.trigger('dataGotRecentTrendLocations', { trendLocations: this.storage.getArray(this.attr.storageKey) });
    };
    this.saveRecentLocation = function (e, data) {
        var location = data.location || {};
        // Only save a locations with a woeid (personalized with not have one)
        // that are not in the list already.
        if (!location.woeid || this.hasRecentLocation(location.woeid)) {
            return;
        }
        this.storage.push(this.attr.storageKey, location);
        // Rebroadcast trend locations so UI can update accordingly.
        this.getRecentTrendLocations();
    };
    this.hasRecentLocation = function (woeid) {
        var locations = this.storage.getArray(this.attr.storageKey);
        return locations.some(function (loc) {
            return loc.woeid === woeid;
        });
    };
    this.after('initialize', function () {
        this.initializeStorage();
        this.on('uiWantsRecentTrendLocations', this.getRecentTrendLocations);
        this.on('dataChangedTrendLocation', this.saveRecentLocation);
    });
}
;
});
define("app/utils/scribe_event_initiators",["module","require","exports"],function(module, require, exports) {
// no_unit_test
module.exports = {
    clientSideUser: 0,
    serverSideUser: 1,
    clientSideApp: 2,
    serverSideApp: 3
};
});
define("app/data/trends_scribe",["module","require","exports","core/component","app/data/with_scribe","app/utils/scribe_item_types","app/utils/scribe_event_initiators"],function(module, require, exports) {
var defineComponent = require('core/component'), withScribe = require('app/data/with_scribe'), itemTypes = require('app/utils/scribe_item_types'), eventInitiators = require('app/utils/scribe_event_initiators');
module.exports = defineComponent(trendsScribe, withScribe);
function trendsScribe() {
    // web:*:*:trends:trend:search
    this.scribeTrendClick = function (e, data) {
        this.scribe('search', data);
    };
    // web:*:*:trends:more:click
    this.scribeMoreClick = function (e, data) {
        this.scribe('click', data);
    };
    // Data should contain: items, initial, source
    this.prepareScribeData = function (data) {
        var items = [];
        var resultsType = data.initial ? 'initial' : 'newer';
        var scribeData = { referring_event: resultsType };
        var isPromoted = false;
        scribeData.items = data.items.map(function (trend, pos) {
            var item = {
                    name: trend.name,
                    item_type: itemTypes.trend,
                    item_query: trend.name,
                    position: pos
                };
            if (trend.promotedTrendId) {
                item.promoted_id = trend.promotedTrendId;
                isPromoted = true;
            }
            return item;
        });
        if (isPromoted) {
            scribeData.promoted = isPromoted;
        }
        if (data.source === 'clock') {
            scribeData.event_initiator = eventInitiators.clientSideApp;
        }
        return scribeData;
    };
    // web:*:*:trends:<initial|newer>:<results|no_results>
    this.scribeTrendsResults = function (e, data) {
        var scribeData = this.prepareScribeData(data);
        var scribeContext = {
                element: scribeData.referring_event,
                action: data.items && data.items.length ? 'results' : 'no_results'
            };
        this.scribe(scribeContext, data, scribeData);
        if (data.initial) {
            this.scribeTrendsImpression(data);
        }
    };
    // web:*:*:trends::impression
    this.scribeTrendsImpression = function (data) {
        this.scribe('impression', data);
    };
    this.after('initialize', function () {
        this.scribeOnEvent('uiTrendsDialogOpened', 'open');
        this.on('uiTrendSelected', this.scribeTrendClick);
        this.on('uiShowMoreTrends', this.scribeMoreClick);
        this.on('uiTrendsDisplayed', this.scribeTrendsResults);
    });
}
});
define("app/ui/with_item_actions",["module","require","exports","core/utils","core/compose","app/data/user_info","app/ui/with_interaction_data","app/data/with_card_metadata"],function(module, require, exports) {
function withItemActions(){compose.mixin(this,[withInteractionData,withCardMetadata]),this.defaultAttrs({showSimpleProfilePopup:!1,profileHoversEnabled:!1,pageContainer:"#doc",nestedContainerSelector:".js-stream-item .in-reply-to, .js-expansion-container",showWithScreenNameSelector:".show-popup-with-screen-name, .twitter-atreply",showWithIdSelector:".show-popup-with-id, .js-user-profile-link",searchtagSelector:".twitter-hashtag, .twitter-cashtag",cashtagSelector:".twitter-cashtag",geoPivotSelector:".js-geo-pivot-link",itemLinkSelector:".twitter-timeline-link",cardInteractionLinkSelector:".js-card2-interaction-link",cardExternalLinkSelector:".js-card2-external-link",viewMoreItemSelector:".view-more-container",inSnapbackExperiment:!1,snapbackSkipProfilePopup:!1}),this.showProfilePopupWithScreenName=function(a,b){var c=$(a.target).closest(this.attr.showWithScreenNameSelector).text();c[0]==="@"&&(c=c.substring(1));var d={screenName:c},e=this.getCardDataFromTweet($(a.target));b=utils.merge(this.interactionData(a,d),e),this.showProfile(a,b)},this.showProfilePopupWithId=function(a,b){var c=this.getCardDataFromTweet($(a.target));b=utils.merge(this.interactionDataWithCard(a),c),this.showProfile(a,b)},this.showProfile=function(a,b){this.attr.profileHoversEnabled&&a.type=="mouseover"?this.trigger(a.target,"uiShowProfileHover",b):this.skipProfilePopup(a)||this.modifierKey(a)?this.trigger(a.target,"uiShowProfileNewWindow",b):(a.preventDefault(),this.trigger("uiShowProfilePopup",utils.merge({simple_profile:this.attr.showSimpleProfilePopup},b)))},this.hideHover=function(a,b){var c=this.getCardDataFromTweet($(a.target));b=utils.merge(this.interactionData(a),c),this.trigger("uiHideProfileHover",b)},this.searchtagClick=function(a,b){var c=$(a.target),d=c.closest(this.attr.searchtagSelector),e=d.is(this.attr.cashtagSelector)?"uiCashtagClick":"uiHashtagClick",f={query:d.text()};this.trigger(e,this.interactionData(a,f))},this.isCardUrl=function(a){var b=/^(https?:\/\/)?cards(-staging|-beta)?.twitter.com/;return b.test(a)},this.geoPivotClick=function(a,b){var c={placeId:$(b.el).data("place-id")};this.trigger("uiGeoPivotClick",this.interactionData(a,c))},this.itemLinkClick=function(a,b){function c(a){return!!a.parents(".permalink").length}var d=$(a.target).closest(this.attr.itemLinkSelector),e,f={url:d.attr("data-expanded-url")||d.attr("href"),tcoUrl:d.attr("href"),text:d.text()};f=utils.merge(f,this.getCardDataFromTweet($(a.target))),(f.cardName==="promotion"||f.cardType==="promotions")&&this.isCardUrl(f.url)&&!c($(a.target))&&(a.preventDefault(),e=d.parents(".stream-item"),this.trigger(e,"uiPromotionCardUrlClick")),this.trigger("uiItemLinkClick",this.interactionData(a,f))},this.cardLinkClick=function(a,b,c){var d=$(b.target).closest(this.attr.cardLinkSelector),e=this.getCardDataFromTweet($(b.target));this.trigger(a,this.interactionDataWithCard(b,e))},this.getUserIdFromElement=function(a){return a.length?a.data("user-id"):null},this.itemSelected=function(a,b){var c=this.getCardDataFromTweet($(a.target));b.organicExpansion&&this.trigger("uiItemSelected",utils.merge(this.interactionData(a),c))},this.itemDeselected=function(a,b){var c=this.getCardDataFromTweet($(a.target));this.trigger("uiItemDeselected",utils.merge(this.interactionData(a),c))},this.isNested=function(){return this.$node.closest(this.attr.nestedContainerSelector).length},this.skipProfilePopup=function(a){var b=$(a.target).parents(".media-tagging-block").length>0;return b?!1:this.attr.snapbackExperimentOptions?!this.attr.snapbackExperimentOptions.profilePopup:userInfo.getDecider("disable_profile_popup")||this.attr.profileHoversEnabled||this.attr.disableProfilePopup},this.modifierKey=function(a){if(a.shiftKey||a.ctrlKey||a.metaKey||a.which>1)return!0},this.removeTweetsFromUser=function(a,b){var c=this.$node.find("[data-user-id="+b.userId+"].js-stream-tweet");c.parent().remove(),this.trigger("uiRemovedSomeTweets")},this.navigateToViewMoreURL=function(a){var b=$(a.target),c;b.find(this.attr.viewMoreItemSelector).length&&(c=b.find(".view-more-link"),this.trigger(c,"uiNavigate",{href:c.attr("href")}))},this.after("initialize",function(){this.isNested()||(this.on("click",{showWithScreenNameSelector:this.showProfilePopupWithScreenName,showWithIdSelector:this.showProfilePopupWithId,searchtagSelector:this.searchtagClick,geoPivotSelector:this.geoPivotClick,itemLinkSelector:this.itemLinkClick,cardExternalLinkSelector:this.cardLinkClick.bind(this,"uiCardExternalLinkClick"),cardInteractionLinkSelector:this.cardLinkClick.bind(this,"uiCardInteractionLinkClick")}),this.attr.profileHoversEnabled&&(this.on("mouseover",{showWithScreenNameSelector:this.showProfilePopupWithScreenName,showWithIdSelector:this.showProfilePopupWithId}),this.on("mouseout",{showWithScreenNameSelector:this.hideHover,showWithIdSelector:this.hideHover})),this.on("uiHasExpandedTweet uiHasClickedTweet",this.itemSelected),this.on("uiHasCollapsedTweet",this.itemDeselected),this.on("uiRemoveTweetsFromUser",this.removeTweetsFromUser),this.on("uiShortcutEnter",this.navigateToViewMoreURL))})}var utils=require("core/utils"),compose=require("core/compose"),userInfo=require("app/data/user_info"),withInteractionData=require("app/ui/with_interaction_data"),withCardMetadata=require("app/data/with_card_metadata");module.exports=withItemActions
});
define("app/ui/trends/trends",["module","require","exports","core/component","app/utils/scribe_item_types","app/ui/with_item_actions"],function(module, require, exports) {
var defineComponent = require('core/component');
var itemTypes = require('app/utils/scribe_item_types');
var withItemActions = require('app/ui/with_item_actions');
module.exports = defineComponent(trendsModule, withItemActions);
function trendsModule() {
    this.defaultAttrs({
        showMoreLinkSelector: '.js-show-more-trends-container',
        hiddenTrendsSelector: '.js-hidden-trends',
        changeLinkSelector: '.change-trends',
        trendsInnerSelector: '.trends-inner',
        trendItemSelector: '.js-trend-item',
        promotedTweetProofSelector: '.tweet-proof-container.promoted-tweet',
        trendLinkItemSelector: '.js-trend-item a',
        eventTrendClass: 'event-trend',
        itemType: 'trend',
        displaySource: 'module'
    });
    this.openChangeTrendsDialog = function (e) {
        this.trigger('uiShowTrendsLocationDialog');
        e.preventDefault();
    };
    this.showMoreTrends = function (e, data) {
        this.select('hiddenTrendsSelector').show();
        this.select('showMoreLinkSelector').hide();
        this.moreTrendsShown = true;
        this.trigger('uiShowMoreTrends', { scribeContext: { element: 'more' } });
    };
    this.updateModuleContent = function (e, data) {
        var isInitial = this.$node.hasClass('hidden');
        var source = data.source;
        this.select('trendsInnerSelector').html(data.module_html);
        this.currentWoeid = data.woeid;
        // Unhide trends with animation
        if (this.attr.displaySource === 'front-page') {
            this.$node.slideDown().removeClass('hidden');
        } else {
            this.$node.fadeIn().removeClass('hidden');
        }
        if (this.moreTrendsShown) {
            this.select('hiddenTrendsSelector').show();
            this.select('showMoreLinkSelector').hide();
        }
        var trends = this.getTrendData(this.select('trendItemSelector'));
        this.trigger('uiTrendsDisplayed', {
            items: trends,
            initial: isInitial,
            source: source,
            scribeData: { woeid: this.currentWoeid }
        });
        var tweetproof = this.getPromotedTweetProofData(this.select('promotedTweetProofSelector'));
        this.trigger('uiTweetsDisplayed', { tweets: tweetproof });
    };
    this.trendSelected = function (e, data) {
        var $item = $(data.el).closest(this.attr.trendItemSelector);
        var trend = this.getTrendData($item)[0];
        var pos = $item.index();
        var item = {
                name: trend.name,
                item_query: trend.name,
                position: pos,
                item_type: itemTypes.trend
            };
        var scribeData = {
                position: pos,
                query: trend.name,
                url: $item.find('a').attr('href'),
                woeid: this.currentWoeid
            };
        if (trend.promotedTrendId) {
            item.promoted_id = trend.promotedTrendId;
            scribeData.promoted = true;
        }
        scribeData.items = [item];
        this.trigger('uiTrendSelected', {
            isPromoted: !!trend.promotedTrendId,
            promotedTrendId: trend.promotedTrendId,
            scribeContext: { element: 'trend' },
            scribeData: scribeData
        });
    };
    this.getTrendData = function ($trends) {
        return $trends.map(function () {
            var $this = $(this);
            return {
                name: $this.data('trend-name'),
                promotedTrendId: $this.data('promoted-trend-id'),
                trendingEvent: $this.hasClass('event-trend')
            };
        }).toArray();
    };
    this.getPromotedTweetProofData = function ($tweets) {
        return $tweets.map(function (i, el) {
            return { impressionId: $(el).data('impression-id') };
        }).toArray();
    };
    this.after('initialize', function () {
        this.moreTrendsShown = false;
        this.on(document, 'dataTrendsRefreshed', this.updateModuleContent);
        this.on('click', {
            changeLinkSelector: this.openChangeTrendsDialog,
            trendLinkItemSelector: this.trendSelected,
            showMoreLinkSelector: this.showMoreTrends
        });
        this.trigger('uiRefreshTrends');
    });
}
});
define("app/ui/trends/trends_dialog",["module","require","exports","core/component","app/ui/with_dialog"],function(module, require, exports) {
var defineComponent = require('core/component'), withDialog = require('app/ui/with_dialog');
module.exports = defineComponent(trendsDialog, withDialog);
function trendsDialog() {
    this.defaultAttrs({
        contentSelector: '#trends_dialog_content',
        trendItemSelector: '.js-trend-link',
        toggleSelector: '.customize-by-location',
        personalizedSelector: '.trends-personalized',
        byLocationSelector: '.trends-by-location',
        doneSelector: '.done',
        selectDefaultSelector: '.select-default',
        errorSelector: '.trends-dialog-error p',
        loadingSelector: '.loading',
        deciderPersonalizedTrends: false
    });
    this.openTrendsDialog = function (e, data) {
        this.trigger('uiTrendsDialogOpened');
        // if the user has already opened the dialog once,
        // there should already be content. no need for
        // a call to the endpoint- just select the active view
        if (this.hasContent()) {
            this.selectActiveView();
        } else {
            this.trigger('uiWantsTrendsDialog');
        }
        this.$node.removeClass('has-error');
        this.open();
    };
    this.showPersonalizedView = function () {
        this.select('byLocationSelector').hide();
        this.select('personalizedSelector').show();
        this.trigger(this.$dialog, 'uiDialogContentChanged');
    };
    this.showLocationView = function () {
        this.select('personalizedSelector').hide();
        this.select('byLocationSelector').show();
        this.trigger(this.$dialog, 'uiDialogContentChanged');
    };
    this.updateDialogContent = function (e, data) {
        var isKeepingItPersonalized = this.attr.personalized && data.personalized;
        this.attr.personalized = data.personalized;
        this.currentWoeid = data.woeid;
        // Only substitute the content if it's not keeping it personalized otherwise we
        // may change what the user is looking at on a refresh.
        if (isKeepingItPersonalized && !this.hasError()) {
            return;
        }
        this.select('contentSelector').html(data.dialog_html);
        this.selectActiveView();
        !data.personalized && this.markSelected(data.woeid);
    };
    this.selectActiveView = function () {
        this.isPersonalized() ? this.showPersonalizedView() : this.showLocationView();
    };
    this.showError = function (e, data) {
        this.select('byLocationSelector').hide();
        this.select('personalizedSelector').hide();
        this.$node.addClass('has-error');
        this.select('errorSelector').html(data.message);
        this.trigger(this.$dialog, 'uiDialogContentChanged');
    };
    this.hasContent = function () {
        return this.select('loadingSelector').length == 0 && !this.hasError();
    };
    this.hasError = function () {
        return this.$node.hasClass('has-error');
    };
    this.markSelected = function (woeid) {
        this.select('trendItemSelector').removeClass('selected').filter('[data-woeid=' + woeid + ']').addClass('selected');
    };
    this.clearSelectedBreadcrumb = function () {
        this.select('selectedBreadCrumbSelector').removeClass('checkmark');
    };
    this.changeSelectedItem = function (e, data) {
        var woeid = $(data.el).data('woeid');
        if (this.isPersonalized() || woeid !== this.currentWoeid) {
            this.markSelected(woeid);
            this.trigger('uiChangeTrendsLocation', { woeid: woeid });
        }
        e.preventDefault();
    };
    this.selectDefault = function (e, data) {
        var personalized = !!$(e.target).data('personalized');
        var data = {};
        if (personalized) {
            data.personalized = true;
        } else {
            data.woeid = 1;
        }
        this.trigger('uiChangeTrendsLocation', data);
        this.close();
    };
    this.toggleView = function (e, data) {
        if (this.select('personalizedSelector').is(':visible')) {
            this.showLocationView();
        } else {
            this.showPersonalizedView();
        }
    };
    this.isPersonalized = function () {
        return this.attr.deciderPersonalizedTrends && this.attr.personalized;
    };
    this.after('initialize', function () {
        this.select('byLocationSelector').hide();
        this.select('personalizedSelector').hide();
        this.on(document, 'uiShowTrendsLocationDialog', this.openTrendsDialog);
        this.on(document, 'dataGotTrendsDialog', this.updateDialogContent);
        this.on(document, 'dataGotTrendsDialogError', this.showError);
        this.on('click', {
            trendItemSelector: this.changeSelectedItem,
            toggleSelector: this.toggleView,
            doneSelector: this.close,
            selectDefaultSelector: this.selectDefault
        });
    });
}
;
});
define("app/ui/trends/dialog/with_location_info",["module","require","exports"],function(module, require, exports) {
module.exports = withLocationInfo;
function withLocationInfo() {
    this.defaultAttrs({
        location: {},
        personalized: false
    });
    this.setLocationInfo = function (event, data) {
        this.attr.personalized = !!data.personalized;
        this.attr.location = data.location || {};
        this.trigger('uiLocationInfoUpdated');
    };
    this.changeLocationInfo = function (location) {
        this.trigger('uiChangeLocation', { location: location });
    };
    this.setPersonalizedTrends = function () {
        this.trigger('uiChangeLocation', { personalized: true });
    };
    this.after('initialize', function () {
        this.on(document, 'dataChangedTrendLocation', this.setLocationInfo);
    });
}
;
});
define("app/ui/trends/dialog/location_dropdown",["module","require","exports","core/component","app/ui/trends/dialog/with_location_info"],function(module, require, exports) {
var defineComponent = require('core/component'), withLocationInfo = require('app/ui/trends/dialog/with_location_info');
module.exports = defineComponent(trendsLocationDropdown, withLocationInfo);
function trendsLocationDropdown() {
    this.defaultAttrs({
        regionsSelector: 'select[name="regions"]',
        citiesSelector: 'select[name="cities"]'
    });
    this.initializeCities = function () {
        this.citiesByRegionWoeid = {};
        var $cities = this.$cities.find('option');
        $cities.each(function (index, city) {
            var $city = $(city);
            var woeid = $city.data('woeid');
            if (!this.citiesByRegionWoeid[woeid]) {
                this.citiesByRegionWoeid[woeid] = [];
            }
            this.citiesByRegionWoeid[woeid].push($city);
        }.bind(this));
    };
    this.updateDropdown = function () {
        var woeid = this.$regions.val();
        // Default to the empty string if we don't have any cities.
        // This should only happen for the default case (when no region
        // is selected).
        var $cities = this.citiesByRegionWoeid[woeid] || '';
        this.$cities.empty();
        this.$cities.html($cities);
    };
    this.updateRegion = function () {
        this.updateDropdown();
        // Select the default option (the region) and trigger the
        // change event. The default option (All cities) stores the
        // woeid of the region.
        var $defaultOption = this.$cities.children().first();
        if ($defaultOption.length) {
            $defaultOption.prop('selected', true);
            $defaultOption.change();
        }
    };
    this.updateCity = function () {
        var $selectedOption = this.$cities.find('option:selected');
        var woeid = parseInt($selectedOption.val(), 10);
        var name = $selectedOption.data('name');
        // Store the current selection so we can reset if another
        // component changes the location.
        this.currentSelection = woeid;
        this.changeLocationInfo({
            woeid: woeid,
            name: name
        });
    };
    this.possiblyClearSelection = function () {
        if (this.currentSelection != this.attr.location.woeid) {
            this.reset();
        }
    };
    this.reset = function () {
        this.currentSelection = null;
        var $defaultRegion = this.$regions.find('option[value=""]');
        $defaultRegion.prop('selected', true);
        this.updateDropdown();
    };
    this.after('initialize', function () {
        this.$regions = this.select('regionsSelector');
        this.$cities = this.select('citiesSelector');
        this.initializeCities();
        this.on(this.$regions, 'change', this.updateRegion);
        this.on(this.$cities, 'change', this.updateCity);
        this.on(document, 'uiTrendsDialogReset', this.reset);
        this.on('uiLocationInfoUpdated', this.possiblyClearSelection);
        this.updateDropdown();
    });
}
;
});
define("app/ui/trends/dialog/location_search",["module","require","exports","core/component","app/ui/trends/dialog/with_location_info","app/ui/typeahead/typeahead_dropdown","app/ui/typeahead/typeahead_input"],function(module, require, exports) {
var defineComponent = require('core/component'), withLocationInfo = require('app/ui/trends/dialog/with_location_info'), TypeaheadDropdown = require('app/ui/typeahead/typeahead_dropdown'), TypeaheadInput = require('app/ui/typeahead/typeahead_input');
module.exports = defineComponent(trendsLocationSearch, withLocationInfo);
function trendsLocationSearch() {
    this.defaultAttrs({ inputSelector: 'input.trends-location-search-input' });
    this.executeTypeaheadSelection = function (e, data) {
        // Special case the "No Results" item click.
        if (data.item.woeid == -1) {
            this.trigger('uiTrendsLocationSearchNoResults');
            return;
        }
        // Store the current selection so we can clear out the
        // search input if the location changes.
        this.currentSelection = data.item;
        this.changeLocationInfo({
            woeid: data.item.woeid,
            name: data.item.name
        });
    };
    this.possiblyClearSelection = function () {
        if (this.currentSelection && this.currentSelection.woeid != this.attr.location.woeid) {
            this.reset();
        }
    };
    this.reset = function (e, data) {
        this.currentSelection = null;
        this.$input.val('');
    };
    this.after('initialize', function () {
        this.$input = this.select('inputSelector');
        this.on('uiTypeaheadItemSelected uiTypeaheadItemComplete', this.executeTypeaheadSelection);
        this.on('uiLocationInfoUpdated', this.possiblyClearSelection);
        this.on(document, 'uiTrendsDialogReset', this.reset);
        TypeaheadInput.attachTo(this.$node, { inputSelector: this.attr.inputSelector });
        TypeaheadDropdown.attachTo(this.$node, {
            inputSelector: this.attr.inputSelector,
            blockLinkActions: true,
            datasourceRenders: [[
                    'trendLocations',
                    ['trendLocations']
                ]],
            deciders: this.attr.typeaheadData,
            eventData: { scribeContext: { component: 'trends_location_search' } }
        });
    });
}
;
});
define("app/ui/trends/dialog/current_location",["module","require","exports","core/component","app/ui/trends/dialog/with_location_info"],function(module, require, exports) {
var defineComponent = require('core/component'), withLocationInfo = require('app/ui/trends/dialog/with_location_info');
module.exports = defineComponent(trendsCurrentLocation, withLocationInfo);
function trendsCurrentLocation() {
    this.defaultAttrs({
        personalizedSelector: '.js-location-personalized',
        nonpersonalizedSelector: '.js-location-nonpersonalized',
        currentLocationSelector: '.current-location'
    });
    this.updateView = function () {
        // Make sure this is an actual boolean value.
        if (!this.attr.personalized) {
            this.select('currentLocationSelector').text(this.attr.location.name);
        }
        this.select('nonpersonalizedSelector').toggle(!this.attr.personalized);
        this.select('personalizedSelector').toggle(!!this.attr.personalized);
    };
    this.after('initialize', function () {
        this.updateView();
        this.on('uiLocationInfoUpdated', this.updateView);
    });
}
;
});
define("app/ui/trends/dialog/with_location_list_picker",["module","require","exports","core/compose","app/ui/trends/dialog/with_location_info"],function(module, require, exports) {
var compose = require('core/compose'), withLocationInfo = require('app/ui/trends/dialog/with_location_info');
module.exports = withLocationListPicker;
function withLocationListPicker() {
    compose.mixin(this, [withLocationInfo]);
    this.defaultAttrs({
        locationSelector: '.trend-location-picker-item',
        selectedAttr: 'selected'
    });
    this.selectLocation = function (event, data) {
        event.preventDefault();
        var $item = $(data.el);
        var location = {
                woeid: $item.data('woeid'),
                name: $item.data('name')
            };
        this.changeLocationInfo(location);
        this.showSelected(location.woeid, false);
    };
    this.showSelected = function (woeid, isPersonalized) {
        var locations = this.select('locationSelector');
        locations.removeClass(this.attr.selectedAttr);
        // Only show the selection for non-personalized users.
        if (!isPersonalized && woeid) {
            locations.filter('[data-woeid="' + woeid + '"]').addClass(this.attr.selectedAttr);
        }
    };
    this.locationInfoUpdated = function () {
        this.showSelected(this.attr.location.woeid, this.attr.personalized);
    };
    this.after('initialize', function () {
        this.on('uiLocationInfoUpdated', this.locationInfoUpdated);
        this.on('click', { locationSelector: this.selectLocation });
        this.showSelected(this.attr.location.woeid, this.attr.personalized);
    });
}
;
});
define("app/ui/trends/dialog/nearby_trends",["module","require","exports","core/component","app/ui/trends/dialog/with_location_list_picker"],function(module, require, exports) {
var defineComponent = require('core/component'), withLocationListPicker = require('app/ui/trends/dialog/with_location_list_picker');
module.exports = defineComponent(trendsNearby, withLocationListPicker);
function trendsNearby() {
}
;
});
define("app/ui/trends/dialog/recent_trends",["module","require","exports","core/component","app/ui/trends/dialog/with_location_list_picker"],function(module, require, exports) {
var defineComponent = require('core/component'), withLocationListPicker = require('app/ui/trends/dialog/with_location_list_picker');
module.exports = defineComponent(trendsRecent, withLocationListPicker);
function trendsRecent() {
    this.defaultAttrs({ listContainerSelector: '.trend-location-picker' });
    this.loadTrendLocations = function (e, data) {
        var locations = data.trendLocations;
        this.$list.empty();
        locations.forEach(function (location) {
            var $item = this.$template.clone(false);
            var $link = $item.find('button');
            $link.text(location.name);
            // Need to use attr instead of data so that we can
            // updated selected locations.
            $link.attr('data-woeid', location.woeid);
            $link.attr('data-name', location.name);
            this.$list.append($item);
        }, this);
        this.$node.toggle(locations.length > 0);
    };
    this.after('initialize', function () {
        this.$list = this.select('listContainerSelector');
        this.$template = this.$list.find('li:first').clone(false);
        this.on(document, 'dataGotRecentTrendLocations', this.loadTrendLocations);
        this.trigger('uiWantsRecentTrendLocations');
    });
}
;
});
define("app/ui/trends/dialog/dialog",["module","require","exports","core/component","app/ui/with_dialog","app/ui/trends/dialog/location_dropdown","app/ui/trends/dialog/location_search","app/ui/trends/dialog/current_location","app/ui/trends/dialog/nearby_trends","app/ui/trends/dialog/recent_trends","app/ui/trends/dialog/with_location_info"],function(module, require, exports) {
var defineComponent = require('core/component'), withDialog = require('app/ui/with_dialog'), LocationDropdown = require('app/ui/trends/dialog/location_dropdown'), LocationSearch = require('app/ui/trends/dialog/location_search'), CurrentLocation = require('app/ui/trends/dialog/current_location'), NearbyTrends = require('app/ui/trends/dialog/nearby_trends'), RecentTrends = require('app/ui/trends/dialog/recent_trends'), withLocationInfo = require('app/ui/trends/dialog/with_location_info');
module.exports = defineComponent(trendsLocationDialog, withDialog, withLocationInfo);
function trendsLocationDialog() {
    this.defaultAttrs({
        contentSelector: '#trends_dialog_content',
        quickSelectSelector: '#trend-locations-quick-select',
        dropdownSelector: '#trend-locations-dropdown-select',
        personalizedSelector: '.trends-personalized',
        nonPersonalizedSelector: '.trends-by-location',
        changeTrendsSelector: '.customize-by-location',
        showDropdownSelector: '.js-show-dropdown-select',
        showQuickSelectSelector: '.js-show-quick-select',
        searchSelector: '.trends-search-locations',
        nearbySelector: '.trends-nearby-locations',
        recentSelector: '.trends-recent-locations',
        currentLocationSelector: '.trends-current-location',
        loadingSelector: '#trend-locations-loading',
        defaultSelector: '.select-default',
        doneSelector: '.done',
        errorSelector: '.trends-dialog-error p',
        errorClass: 'has-error'
    });
    this.openDialog = function (e, data) {
        this.trigger('uiTrendsDialogOpened');
        // Remotely load the dialog html on initial open.
        if (!this.initialized) {
            this.trigger('uiWantsTrendsLocationDialog');
            this.initialized = true;
        } else {
            // Only call setCurrentView when the dialog is already initialized.
            // Otherwise the call will happen after data is remotely loaded.
            this.setCurrentView();
        }
        this.$node.removeClass('has-error');
        this.open();
    };
    this.setCurrentView = function () {
        if (this.attr.personalized) {
            this.showPersonalizedView();
        } else {
            this.showNonpersonalizedView();
        }
        this.trigger(this.$dialog, 'uiDialogContentChanged');
    };
    this.showPersonalizedView = function () {
        this.select('nonPersonalizedSelector').hide();
        this.select('personalizedSelector').show();
        this.trigger(this.$dialog, 'uiDialogContentChanged');
    };
    this.showNonpersonalizedView = function () {
        this.select('personalizedSelector').hide();
        this.select('nonPersonalizedSelector').show();
        this.trigger(this.$dialog, 'uiDialogContentChanged');
    };
    this.showQuickSelectContainer = function (e, data) {
        this.showNonpersonalizedView();
        this.select('dropdownSelector').hide();
        this.select('quickSelectSelector').show();
        this.trigger(this.$dialog, 'uiDialogContentChanged');
    };
    this.showDropdownContainer = function (e, data) {
        this.showNonpersonalizedView();
        this.select('quickSelectSelector').hide();
        this.select('dropdownSelector').show();
        this.trigger(this.$dialog, 'uiDialogContentChanged');
    };
    this.hideViews = function () {
        this.select('personalizedSelector').hide();
        this.select('nonPersonalizedSelector').hide();
    };
    this.showError = function (e, data) {
        this.hideViews();
        this.hideLoading();
        this.initialized = false;
        this.$node.addClass(this.attr.errorClass);
        this.select('errorSelector').html(data.message);
        this.trigger(this.$dialog, 'uiDialogContentChanged');
    };
    this.selectDefault = function (e, data) {
        var $button = $(e.target);
        var personalized = !!$button.data('personalized');
        if (personalized) {
            this.setPersonalizedTrends();
        } else {
            this.changeLocationInfo({
                name: $button.data('name'),
                woeid: $button.data('woeid')
            });
        }
        this.close();
    };
    this.reset = function (e, data) {
        this.showQuickSelectContainer();
        this.trigger('uiTrendsDialogReset');
    };
    this.initializeDialog = function (e, data) {
        this.select('contentSelector').html(data.dialog_html);
        this.setLocationInfo(e, data);
        this.initializeComponents();
        this.setCurrentView();
    };
    this.showLoading = function () {
        this.select('loadingSelector').show();
        this.trigger(this.$dialog, 'uiDialogContentChanged');
    };
    this.hideLoading = function () {
        this.select('loadingSelector').hide();
    };
    this.initializeComponents = function (e, data) {
        CurrentLocation.attachTo(this.attr.currentLocationSelector, {
            location: this.attr.location,
            personalized: this.attr.personalized
        });
        LocationSearch.attachTo(this.attr.searchSelector, { typeaheadData: this.attr.typeaheadData });
        LocationDropdown.attachTo(this.attr.dropdownSelector);
        NearbyTrends.attachTo(this.attr.nearbySelector, {
            location: this.attr.location,
            personalized: this.attr.personalized
        });
        RecentTrends.attachTo(this.attr.recentSelector, {
            location: this.attr.location,
            personalized: this.attr.personalized
        });
    };
    this.after('initialize', function () {
        this.hideViews();
        this.on('uiChangeLocation', this.showLoading);
        this.on('uiTrendsLocationSearchNoResults', this.showDropdownContainer);
        this.on(document, 'uiShowTrendsLocationDialog', this.openDialog);
        this.on('uiDialogClosed', this.reset);
        this.on(document, 'dataGotTrendsLocationDialog', this.initializeDialog);
        this.on(document, 'dataGotTrendsLocationDialogError', this.showError);
        this.on('uiLocationInfoUpdated', this.hideLoading);
        this.on('click', {
            doneSelector: this.close,
            defaultSelector: this.selectDefault,
            changeTrendsSelector: this.showNonpersonalizedView,
            showDropdownSelector: this.showDropdownContainer,
            showQuickSelectSelector: this.showQuickSelectContainer
        });
    });
}
;
});
define("app/boot/trends",["module","require","exports","app/data/trends","app/data/trends/location_dialog","app/data/trends/recent_locations","app/data/trends_scribe","app/ui/trends/trends","app/ui/trends/trends_dialog","app/ui/trends/dialog/dialog","core/utils"],function(module, require, exports) {
// no_unit_test
var TrendsData = require('app/data/trends'), TrendsLocationDialogData = require('app/data/trends/location_dialog'), TrendsRecentLocationsData = require('app/data/trends/recent_locations'), TrendsScribe = require('app/data/trends_scribe'), TrendsModule = require('app/ui/trends/trends'), TrendsDialog = require('app/ui/trends/trends_dialog'), TrendsLocationDialog = require('app/ui/trends/dialog/dialog'), utils = require('core/utils');
module.exports = function initialize(options) {
    // TODO(DISCOFE-518): Separate trends module and dialog scribe components.
    // TODO(DISCOFE-519): Separate trends module and dialog data components.
    TrendsScribe.attachTo(document, options);
    TrendsData.attachTo(document, utils.merge(options, { show_context: options.show_context }));
    TrendsModule.attachTo('.module.trends', {
        loggedIn: options.loggedIn,
        displaySource: options.src,
        eventData: { scribeContext: { component: 'trends' } }
    });
    if (options.trendsLocationDialogEnabled) {
        TrendsLocationDialogData.attachTo(document, options);
        TrendsRecentLocationsData.attachTo(document, options);
        TrendsLocationDialog.attachTo('#trends_dialog', {
            typeaheadData: options.typeaheadData,
            eventData: { scribeContext: { component: 'trends_location_dialog' } }
        });
    } else {
        TrendsDialog.attachTo('#trends_dialog', {
            deciderPersonalizedTrends: options.decider_personalized_trends,
            eventData: { scribeContext: { component: 'trends_dialog' } }
        });
    }
};
});
define("app/pages/frontpage",["module","require","exports","app/boot/common","app/boot/logged_out","app/ui/login_form","app/data/frontpage_scribe","app/ui/cookie_warning","app/utils/cookie","app/ui/track_ga_events","app/ui/macaw_nymizer_signin_conversion","app/ui/search_input","app/data/search_input_scribe","app/data/typeahead/typeahead","app/data/typeahead/typeahead_scribe","app/ui/typeahead/typeahead_input","app/ui/typeahead/typeahead_dropdown","core/utils","app/boot/trends"],function(module, require, exports) {
var bootCommon=require("app/boot/common"),bootLoggedOut=require("app/boot/logged_out"),LoginForm=require("app/ui/login_form"),FrontpageScribe=require("app/data/frontpage_scribe"),CookieWarning=require("app/ui/cookie_warning"),cookie=require("app/utils/cookie"),SigninGAEvent=require("app/ui/track_ga_events"),MacawNymizerSigninConversion=require("app/ui/macaw_nymizer_signin_conversion"),SearchInput=require("app/ui/search_input"),SearchInputScribe=require("app/data/search_input_scribe"),TypeaheadData=require("app/data/typeahead/typeahead"),TypeaheadScribe=require("app/data/typeahead/typeahead_scribe"),TypeaheadInput=require("app/ui/typeahead/typeahead_input"),TypeaheadDropdown=require("app/ui/typeahead/typeahead_dropdown"),utils=require("core/utils"),trends=require("app/boot/trends");module.exports=function(a){bootCommon(a),bootLoggedOut(a),$('.front-signin input[name="session[username_or_email]"]').focus(),a.passwordResetAdvancedLoginForm&&LoginForm.attachTo(".js-front-signin"),FrontpageScribe.attachTo(document,a),document.activeElement.tagName.toLowerCase()!="input"&&$(".front-signin .email-input").focus();var b=$('input[name="remember_me"]');b.prop("checked",cookie("remember_checked_on")!=="0"),CookieWarning.attachTo("#front-no-cookies-warn"),SigninGAEvent.attachTo(".js-front-signin"),MacawNymizerSigninConversion.attachTo(".js-front-signin");if(a.lohpSearchBoxEnabled){var c=a.lohpCenteredSearchBoxEnabled?"#front-page-search":"#global-nav-search",d=a.lohpCenteredSearchBoxEnabled?"front_page_searchbox":"top_bar_searchbox";SearchInput.attachTo(c,{eventData:{scribeContext:{component:d,element:""}}}),SearchInputScribe.attachTo(c,{noTeardown:!0});var e=[["topics",["topics"]],["accounts",["accounts"]],["concierge",["concierge"]]];TypeaheadScribe.attachTo(document,{noTeardown:!0}),TypeaheadData.attachTo(document,a.typeaheadData,{noTeardown:!0}),TypeaheadInput.attachTo(c),TypeaheadDropdown.attachTo(c,{datasourceRenders:e,accountsShortcutShow:!0,autocompleteAccounts:!1,typeaheadSrc:"SEARCH_BOX",deciders:utils.merge(a.typeaheadData,{showSocialContext:a.typeaheadData.showSearchAccountSocialContext}),eventData:{scribeContext:{component:d,element:"typeahead"}}})}a.lohpTrendsEnabled&&trends(utils.merge(a,{src:"front-page",show_context:!1}))}
});
define("app/data/login_scribe",["module","require","exports","core/component","app/data/with_scribe"],function(module, require, exports) {
function LoginScribe(){this.scribeSignupClick=function(a,b){this.scribe({component:"signup_callout",element:"signup_link",action:"click"},b)},this.after("initialize",function(){this.on("uiSignupLinkClicked",this.scribeSignupClick)})}var defineComponent=require("core/component"),withScribe=require("app/data/with_scribe");module.exports=defineComponent(LoginScribe,withScribe)
});
define("app/pages/login",["module","require","exports","app/boot/common","app/ui/login_form","app/data/login_scribe","core/i18n","app/ui/track_ga_events","app/ui/macaw_nymizer_signin_conversion"],function(module, require, exports) {
var boot=require("app/boot/common"),LoginForm=require("app/ui/login_form"),LoginScribe=require("app/data/login_scribe"),_=require("core/i18n"),SigninGAEvent=require("app/ui/track_ga_events"),MacawNymizerSigninConversion=require("app/ui/macaw_nymizer_signin_conversion");module.exports=function(a){boot(a),a.passwordResetAdvancedLoginForm&&LoginForm.attachTo(".signin-wrapper"),LoginScribe.attachTo(document,a),$("#login-signup-link").click(function(a){$(document).trigger("uiSignupLinkClicked")}),$(".signin-wrapper").data("login-message")&&$(document).trigger("uiShowMessage",{message:_('Debes iniciar sesi\xf3n para hacer eso')}),$(".js-username-field").focus(),SigninGAEvent.attachTo(".signin-wrapper"),MacawNymizerSigninConversion.attachTo(".signin-wrapper")}
});