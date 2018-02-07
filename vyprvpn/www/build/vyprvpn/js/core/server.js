Vypr.prototype.doPageScript=function(){var a=this.getPageName();this.isVyprContentPage()||(a="header"),VyprVPNInit.loadScript("/user/vyprvpn/js/views/"+a+".js"),this.g_loaded_scripts.push(a)},Vypr.prototype.requestGetStatus=function(){var a=this;this.doRequest(["VYPRVPN_GET_STATUS"],this.handleGetStatusResponse,function(b){log.error("Error in requestGetStatus(): ",b),0===a.g_get_status_count&&this.setVyprError(this.constants.message.general.error.no_response)},null,function(a){log.warn("Timeout in requestGetStatus(). Limit reached at "+a+" attempts."),log.info("Ignoring timeout limit. Continuing to request status.")})&&0===this.g_get_status_count&&(this.enableFields(!1),log.status("Pending..."),this.handleGetStatusResponsePending())},Vypr.prototype.requestConnect=function(a,b){var c=this;this.doRequest(["VYPRVPN_CONNECT",a,b],this.handleConnectResponse,function(a){log.error("Error in requestConnect(): ",a),c.handleStatus("CONNECT_FAILED"),c.enableFields(!0)})&&(this.enableFields(!1),log.status("Requesting connect..."),c.handleStatus("CONNECTING"))},Vypr.prototype.requestDisconnect=function(){var a=this;this.doRequest(["VYPRVPN_DISCONNECT"],this.handleDisconnectResponse,function(b){log.error("Error in requestDisconnect(): ",b),a.enableFields(!0)})&&(this.enableFields(!1),log.status("Requesting disconnect..."),this.setViewAppStatus(this.constants.view.disconnecting))},Vypr.prototype.requestAppUpgradeInfo=function(){this.doRequest(["VYPRVPN_APP_UPGRADE_INFO"],this.handleAppUpgradeInfoResponse,function(a){log.error("Error in requestAppUpgradeInfo(): ",a),this.enableFields(!0)},!0)?(this.enableFields(!1),log.status("Requesting application upgrade information...")):log.error("Failed to request application upgrade information.")},Vypr.prototype.requestAppUpgradeCheck=function(){var a=this,b=!0,c=2.5,d=this.doRequest(["VYPRVPN_APP_UPGRADE_CHECK"],function(b){setTimeout(function(){a.handleAppUpgradeCheckResponse.apply(a,[b])},1e3*c)},function(a){log.error("Error in requestAppUpgradeCheck(): ",a),this.setVyprError("Failed to request application update availability."),this.populateAppUpgradeCheckMessage(null),this.enableFields(!0)},b),e=document.getElementById("vypr-setting-application");d?(this.enableFields(!1),this.clearMessages(e),log.status("Requesting application upgrade check...")):(log.error("Failed to request application upgrade check."),this.setVyprError("Failed to request application update availability."),this.populateAppUpgradeCheckMessage(null))},Vypr.prototype.requestAppUpgrade=function(a){var b=this.getCache("app_upgrade_info_version"),c=this.constants.message.upgrade.confirmation.app.replace("%s",b);if("CONNECTED"===this.getCache("app_status")&&(c+="\n\n"+this.constants.message.upgrade.confirmation.disconnect),!window.confirm(c))return!1;this.doRequest(["VYPRVPN_APP_UPGRADE"],this.handleAppUpgradeResponse)&&(this.enableFields(!1),log.status("Updating application..."),this.handleAppUpgradeResponse())},Vypr.prototype.parseResponse=function(a){var b='{"data":{}}';try{json=JSON.parse(a||b)}catch(c){json=JSON.parse(b),this.g_bad_data_count++,log.error("Error in parseResponse(): ",{response:a,error:c}),this.g_bad_data_count>0&&this.setVyprError(this.constants.message.general.error.bad_data)}return json},Vypr.prototype.handleGetStatusResponse=function(a){var b=this.parseResponse(a);b.data=b.data?b.data:{};var c=b.data.vyprvpn_app_avail,d=b.data.vyprvpn_connection_time;if(c&&this.requestAppUpgradeInfo(),"CONNECTED"===b.status&&this.handleTimeConnected(d),this.handleGetStatusResponseCache(b.data,b.status),"FAIL"==b.res)return this.handleFailResponse(a),b;log.success("Got status."),this.handleStatus(b.status),this.setCache("app_status",b.status)},Vypr.prototype.handleGetStatusResponsePending=function(){var a=this.getCache("app_status")||"PENDING",b=this.getCache("app_avail"),c=this.getCache("connection_time");b&&this.requestAppUpgradeInfo(),"CONNECTED"===a&&this.handleTimeConnected(c),log.status("Using cached status."),this.handleStatus(a)},Vypr.prototype.handleGetStatusResponseCache=function(a,b){var c=this.getCache("location")||this.getCache("protocol"),d="CONNECTED"===b,e=this.getCache("country_code");this.setCache("username",a.vyprvpn_username),this.setCache("password",a.vyprvpn_password),this.setCache("app_avail",a.vyprvpn_app_avail),this.setCache("app_version",a.vyprvpn_app_version),this.setCache("ip",a.vyprvpn_connected_ip),this.setCache("ip_disconnected",a.vyprvpn_disconnected_ip),!d&&c||(this.setCache("location",a.vyprvpn_location),this.setCache("protocol",a.vyprvpn_protocol)),e=this.getConnectionCountryCode(this.getCache("location")),this.setCache("country_code",e),this.setCache("default_config",a.vyprvpn_defbind),this.setCache("user",a.vyprvpn_user),this.setCache("reconnect",a.vyprvpn_reconnect),this.setCache("analytics",a.vyprvpn_analytics),this.setCache("user_css",a.vyprvpn_user_css)},Vypr.prototype.handleStatus=function(a){var b=this.getCache("app_status");switch(a){case"INVALID_STATE":case"INVALID_REQUEST":log.error("Invalid status or request."),this.setVyprError("VyprVPN router app experienced an error."),this.setViewAppStatus(this.constants.view.login),this.enableFields(!1);break;case"PENDING":log.status("VyprVPN response pending...");break;case"OFFLINE":log.error("VyprVPN offline."),this.setVyprError(this.constants.message.general.error.offline),this.enableFields(!1);break;case"INITIALIZING":log.status("VyprVPN initializing..."),this.setVyprWarning(this.constants.message.general.warning.init),this.enableFields(!1);break;case"STOPPING":log.status("VyprVPN stopping..."),this.clearMessages(),this.enableFields(!1);break;case"NOT_LOGGED_IN":log.status("Not logged in."),"LOGGING_OUT"===b&&this.clearMessages(),this.setViewAppStatus(this.constants.view.login),this.enableFields(!0);break;case"LOGGING_IN":log.status("Authenticating..."),this.clearMessages(),this.setViewAppStatus(this.constants.view.login),this.enableFields(!1);break;case"LOGGED_IN":log.status("Logged in."),"LOGGING_IN"===b&&this.clearMessages(),this.populateConnection(),this.setViewAppStatus(this.constants.view.not_connected),this.enableFields(!0);break;case"LOGIN_FAILED":"LOGIN_FAILED"===b&&log.warn("Login failed."),"LOGGING_IN"===b&&log.error("Login failed."),this.setViewAppStatus(this.constants.view.login),this.enableFields(!0);break;case"LOGGING_OUT":log.status("Logging out..."),this.clearMessages(),this.setViewAppStatus(this.constants.view.login),this.enableFields(!1);break;case"CONNECTING":log.status("Connecting..."),this.clearMessages(),this.populateConnection(),this.setViewAppStatus(this.constants.view.connecting),this.enableFields(!1);break;case"CONNECTED":log.status("Connected."),"CONNECTING"===b&&this.clearMessages(),this.populateConnection(),this.setViewAppStatus(this.constants.view.connected),this.enableFields(!0);break;case"CONNECT_FAILED":"CONNECT_FAILED"===b&&log.warn("Connection failed."),"CONNECTING"===b&&(log.error("Connection failed."),this.setVyprError("Failed to connect to remote server.")),this.populateConnection(),this.setViewAppStatus(this.constants.view.fail_connected),this.enableFields(!0);break;case"DISCONNECTING":log.status("Disconnecting..."),this.clearMessages(),this.setViewAppStatus(this.constants.view.disconnecting),this.unsetTimeConnected(),this.populateConnection(),this.enableFields(!1);break;default:log.warn("Unexpected status: "+a)}},Vypr.prototype.handleAppUpgradeInfoResponse=function(a){var b=this.parseResponse(a),c=["app"],d=b.data?b.data.version:void 0,e=this.hasAppUpgradeAvailable(d);return this.enableFields(!0),b.data?"FAIL"===b.res?(log.error(b.reason),!1):(log.status("Upgrade info received."),e?(log.success("Application upgrade available."),this.setViewUpdateStatus(c,!0),this.setCache("app_upgrade_info_version",b.data.version),this.setCache("app_upgrade_info_buildnum",b.data.buildnum),this.setCache("app_upgrade_info_reboot",b.data.reboot),this.setCache("app_upgrade_info_firmware",b.data.firmware),this.setCache("app_upgrade_info_architecture",b.data.architecture)):(log.info("Application upgrade not available."),this.setViewUpdateStatus(c,!1)),e):(log.warn("No response data found in method `handleAppUpgradeInfoResponse`.",b),this.setViewUpdateStatus(c,!1),null)},Vypr.prototype.handleAppUpgradeCheckResponse=function(a){var b=this.handleAppUpgradeInfoResponse(a);this.populateAppUpgradeCheckMessage(b),this.enableFields(!0)},Vypr.prototype.handleConnectResponse=function(a){var b=this.parseResponse(a);if("FAIL"==b.res)return this.handleFailResponse(a),void this.handleStatus("CONNECT_FAILED");log.success("Connection requested."),this.setCache("app_status","CONNECTING"),this.handleStatus("CONNECTING")},Vypr.prototype.handleConnectCancelResponse=function(a){if("FAIL"==this.parseResponse(a).res)return this.handleFailResponse(a),void this.handleStatus("CONNECT_CANCEL_FAILED");log.success("Conntection cancelation requested.")},Vypr.prototype.handleDisconnectResponse=function(a){if("FAIL"==this.parseResponse(a).res)return void this.handleFailResponse(a);log.success("Disconnection requested."),this.setCache("app_status","DISCONNECTING"),this.handleStatus("DISCONNECTING")},Vypr.prototype.handleAppUpgradeResponse=function(a){var b=this.parseResponse(a);document.getElementsByTagName("body")[0];if("FAIL"===b.res&&"ERR_TIMEOUT"!==b.reason)return void this.handleAppUpgradeFailure();log.success("Application upgrade process has begun."),this.startUpgrade("app")},Vypr.prototype.updateFromCache=function(a,b,c){return!a in this.cache.updateUi?void log.warn('No method found to update interface for cache key "'+a+'"'):!a in this.cache?void log.error('No cache found to update interface for cache key "'+a+'"'):(void 0!==b&&window.alert(b),void this.cache.updateUi[a].apply(this,[c]))},Vypr.prototype.updateConnectionTime=function(a){if("string"!=typeof a&&"number"!=typeof a)return log.error("Time format is invalid. Not updating."),!1;var b,c,d=document.querySelectorAll('[data-vypr-key="connection-time"]');for(b=0,c=d.length;b<c;++b){var e=d[b];VyprElementHelper.setTextContent(e,a)}},Vypr.prototype.enableFields=function(a){var b={shouldEnable:a};if(this.g_window_state_unload)return void log.warn("Preventing enable or disable of fields because page is changing.");this.enableFieldsById(a),this.isVyprFramePage()?this.messageSendToContentPage("vypr.dom.set.element.enable",b):this.isVyprContentPage()&&this.messageSendToFramePage("vypr.dom.set.element.enable",b)},Vypr.prototype.enableFieldsById=function(a){for(var b=!a,c=this.g_enable_fields_ids,d=[],e=0;e<c.length;e++){var f=c[e],g=document.getElementById(f);d.push(g)}VyprElementHelper.setAttributeBoolean(d,"disabled",b)},Vypr.prototype.setElementStatus=function(a,b){var c=this;void 0===a&&log.warn("Unable to set status. Element does not exist."),this.constants.elementStatus.forEach(function(d){d!==b&&VyprElementHelper.removeClass(a,c.constants.className[d])}),VyprElementHelper.addClass(a,this.constants.className[b]),window.setTimeout(function(){c.getElementStatus(a).indexOf("success")>-1&&c.setElementStatus(a,"")},2e3)},Vypr.prototype.getElementStatus=function(a){var b=this,c=[];return void 0===a&&log.warn("Unable to get status. Element does not exist."),this.constants.elementStatus.forEach(function(d){VyprElementHelper.hasClass(a,b.constants.className[d])&&c.push(d)}),c},Vypr.prototype.getBlock=function(a){return document.getElementById("vypr-setting-"+a+"-block")},Vypr.prototype.setBlockStatus=function(a,b){var c=this.getBlock(a)||void 0;this.setElementStatus(c,b)},Vypr.prototype.getConnectionData=function(){for(var a=["location","ip","time","protocol","country_code"],b=[],c=0;c<a.length;c++){var d=a[c],e=this.getCache(d)||void 0;if(!e)switch(d){case"location":e=this.getConnectionLocation(),this.setCache("location",e);break;case"protocol":e=this.getConnectionProtocol(),this.setCache("protocol",e);break;case"country_code":e=this.getConnectionCountryCode(this.getConnectionLocation()),this.setCache("country_code",e)}b.push(e)}return b},Vypr.prototype.getConnectionLocation=function(){var a=document.getElementById("vypr--select-server");return VyprElementHelper.getSelectedIndexValue(a)},Vypr.prototype.getConnectionProtocol=function(){var a=document.getElementById("vypr--select-protocol");return VyprElementHelper.getSelectedIndexValue(a)},Vypr.prototype.getConnectionCountryCode=function(a){var b,c,d="",e={},f=-1;if(!this.g_servers)return d;for(b=0,c=this.g_servers.length;b<c;b++)e=this.g_servers[b],e.name===a&&(f=b);return void 0!==this.g_servers[f]&&(d=this.g_servers[f].country_code.toLowerCase()),d},Vypr.prototype.populateConnection=function(){var a=this.getConnectionData(),b=a[0],c=a[1],d=this.getCache("ip_disconnected"),e=(a[2],a[3]),f=a[4];return this.populateConnectionLocation(b),this.populateConnectionLocationIcon(f),this.populateConnectionIp(c),this.populateConnectionProtocol(e),this.populatePublicIp(d),a},Vypr.prototype.populateConnectionLocation=function(a){for(var b=document.querySelectorAll('[data-vypr-key="connection-server"]'),c=0;c<b.length;++c){var d=b[c];VyprElementHelper.setTextContent(d,a||"")}this.setCache("location",a)},Vypr.prototype.populateConnectionLocationIcon=function(a){var b=document.querySelectorAll('[data-vypr-key="connection-server-icon"]');if(!a)return void log.warn("Abort country code population because `iconCode` is `"+a+"`.");for(var c=0;c<b.length;++c){var d=b[c],e=d.getAttribute("data-vypr-server"),f=d.getAttribute("alt");e!==a&&(d.setAttribute("data-vypr-server",a),d.setAttribute("alt",f),VyprElementHelper.addClass(d,this.constants.className.active))}this.setCache("country_code",a)},Vypr.prototype.populateConnectionIp=function(a){for(var b=document.querySelectorAll('[data-vypr-key="connection-ip"]'),c=0;c<b.length;++c){var d=b[c];VyprElementHelper.setTextContent(d,a||"")}this.setCache("ip",a)},Vypr.prototype.populateConnectionProtocol=function(a){for(var b=document.querySelectorAll('[data-vypr-key="connection-protocol"]'),c=0;c<b.length;++c){var d=b[c];VyprElementHelper.setTextContent(d,a||"")}this.setCache("protocol",a)},Vypr.prototype.populateConnectionTime=function(){var a=this.getConnectionTime(),b=this.formatTime(a);if(!1===b)return log.warn("Will not populate invalid time: "+a),!1;this.updateConnectionTime(b),this.isVyprContentPage()?this.messageSendToFramePage("vypr.dom.set.connection.time"):this.isVyprFramePage()&&this.messageSendToContentPage("vypr.dom.set.connection.time")},Vypr.prototype.populatePublicIp=function(a){for(var b=document.querySelectorAll('[data-vypr-key="public-ip"]'),c=0;c<b.length;++c){var d=b[c];VyprElementHelper.setTextContent(d,a)}this.setCache("ip_disconnected",a)},Vypr.prototype.populateAppUpgradeCheckMessage=function(a){var b=document.getElementById("vypr-setting-application");switch(a){case null:this.setVyprWarning("Check for update failed",b);break;case!1:this.setVyprSuccess("You are up to date",b);break;case!0:this.clearMessages(b)}},Vypr.prototype.handleTimeConnected=function(a){void 0===this.g_time_connected_interval?this.iniTimeConnected(Number(a)):this.setTimeConnected(Number(a))},Vypr.prototype.iniTimeConnected=function(a){var b=this;if(-1===a)return!1;this.setTimeConnected(a),this.populateConnectionTime(),this.g_time_connected_interval=setInterval(function(){b.populateConnectionTime()},1e3*this.g_time_connected_delay)},Vypr.prototype.setTimeConnected=function(a,b){var b=this.getTimeNow();this.g_time_connected_seconds=a,this.g_time_connected_timestamp=b},Vypr.prototype.getConnectionTime=function(){var a=this.getTimeNow(),b=this.g_time_connected_timestamp;return this.g_time_connected_seconds+a-b},Vypr.prototype.getTimeNow=function(){return Math.floor((new Date).getTime()/1e3)},Vypr.prototype.clearTimeConnected=function(){this.g_time_connected_seconds=-1,this.g_time_connected_timestamp=-1,this.g_time_connected_interval=clearInterval(this.g_time_connected_interval)},Vypr.prototype.unsetTimeConnected=function(){this.clearTimeConnected(),this.updateConnectionTime(""),this.isVyprContentPage()?this.messageSendToFramePage("vypr.dom.unset.connection.time"):this.isVyprFramePage()&&this.messageSendToContentPage("vypr.dom.unset.connection.time")},Vypr.prototype.formatTime=function(a){var b=function(a){return("0"+Math.round(a).toString()).slice(-2)},c=1e3*a;return a<0?(log.warn("Will not format negative time: "+diff),!1):!isNaN(a)&&(hh=Math.floor(c/1e3/60/60),c-=1e3*hh*60*60,mm=Math.floor(c/1e3/60),c-=1e3*mm*60,ss=Math.floor(c/1e3),c-=1e3*ss,b(hh)+":"+b(mm)+":"+b(ss))},Vypr.prototype.setEventHandlers=function(){this.handleVisibilityToggles(),this.handleConnectTriggers(),this.handleDisconnectTriggers(),this.handleMessageCloseTriggers(),this.handleLoginTriggers(),this.handleAppUpgradeTriggers(),this.handleAppUpgradeCheckTriggers(),this.handleMessages()},Vypr.prototype.handleEnter=function(a,b){var c;a&&a.which?c=a.which:window.event&&(c=window.event.keyCode),13==c&&("function"==typeof b?b():log.error("handleEnter: Callback is "+typeof b))},Vypr.prototype.handleLoginTriggers=function(){for(var a=document.querySelectorAll('[data-vypr-action="login"]'),b=0;b<a.length;++b){a[b].addEventListener("click",function(a){window.top.location=VyprUrlHelper.getWindowLocationOrigin(window.top.location)+"/user/vyprvpn-connection.asp"})}},Vypr.prototype.handleConnectTriggers=function(){for(var a=this,b=document.querySelectorAll('[data-vypr-action="connect"]'),c=0;c<b.length;++c){b[c].addEventListener("click",function(b){var c=a.getConnectionData(),d=c[0],e=c[3];c[4];d&&e?a.requestConnect.apply(a,[d,e]):(log.warn("Did not find connection data. Forwarding user to connection page."),window.top.location=VyprUrlHelper.getWindowLocationOrigin(window.top.location)+"/user/vyprvpn-connection.asp")},!1)}},Vypr.prototype.handleDisconnectTriggers=function(){var a,b,c=this,d=null,e=document.querySelectorAll('[data-vypr-action="disconnect"]');for(a=0,b=e.length;a<b;++a)d=e[a],d.addEventListener("click",function(a){c.requestDisconnect()},!1)},Vypr.prototype.handleAppUpgradeTriggers=function(){var a,b,c=this,d=c.getCache("app_upgrade_info_buildnum"),e=document.querySelectorAll('[data-vypr-action="update-start"]');for(a=0,b=e.length;a<b;++a)e[a].addEventListener("click",function(){c.requestAppUpgrade.apply(c,[d])},!1)},Vypr.prototype.handleAppUpgradeCheckTriggers=function(){var a,b,c=this,d=document.querySelectorAll('[data-vypr-action="update-check"]');for(a=0,b=d.length;a<b;++a)d[a].addEventListener("click",function(){c.requestAppUpgradeCheck()},!1)},Vypr.prototype.handleWindowUnload=function(){var a=this;window.onbeforeunload=function(){a.g_window_state_unload=!0,log.status("Page is being reloaded or left.")}},Vypr.prototype.handleMessages=function(){var a=this;this.messageReceive("vypr.dom.set.connection.location",function(b){a.populateConnectionLocation(b.location),a.populateConnectionLocationIcon(b.locationIcon)}),this.messageReceive("vypr.dom.set.connection.protocol",function(b){a.populateConnectionProtocol(b.protocol)}),this.messageReceive("vypr.dom.set.connection.time",function(b){var c=b?b.time:void 0;if(void 0===c){var d=a.getConnectionTime();c=a.formatTime(d)}a.updateConnectionTime(c)}),this.messageReceive("vypr.dom.unset.connection.time",function(b){a.clearTimeConnected(),a.updateConnectionTime("")}),this.messageReceive("vypr.dom.add.message",function(b){a.addMessage(b.message,b.type,b.contextEl,b.id)}),this.messageReceive("vypr.dom.remove.message",function(b){a.removeMessage(b.id,b.contextEl)}),this.messageReceive("vypr.dom.clear.messages",function(b){a.clearMessages(b.contextEl)}),this.messageReceive("vypr.dom.set.element.enable",function(b){a.enableFieldsById(b.shouldEnable)}),this.messageReceive("vypr.dom.reset.iframe.dimensions",function(b){a.updateIframe(b.options)}),this.messageReceive("vypr.poll.get.status.start",function(b){a.startGetStatus(b.isFromMessage)}),this.messageReceive("vypr.poll.get.status.stop",function(b){a.stopGetStatus(b.isFromMessage)})},Vypr.prototype.hasAppUpgradeAvailable=function(a){var b=this.getCache("app_version");return b=b?Number(b.replace(".","")):NaN,a=a?Number(a.replace(".","")):NaN,b<a},Vypr.prototype.init=function(){if(this.handleWindowUnload(),this.setEventHandlers(),this.populatePublicIp(this.getCache("ip_disconnected")),!0)return this.startGetStatus(),void(this.g_servers&&(this.populateServers(),this.populateConnection()));this.requestCGIVariables(function(a){this.g_cgi_port=a.cgi_port,this.startGetStatus()}.bind(this),function(){log.error("VyprVPN is not accessible."),this.setVyprError(this.constants.message.general.error.no_comm)}.bind(this))},Vypr.prototype.prep=function(){this.doPageScript()},VyprVPN.prep();