<!DOCTYPE html><html class="vyprhtml" lang="en" dir="ltr"><head><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><link rel="stylesheet" type="text/css" href="/user/vyprvpn/css/styles.css"><link rel="stylesheet" href="//fonts.googleapis.com/css?family=Open+Sans:300,400,700"><script type="text/javascript"><% nvram('vyprvpn_username,vyprvpn_password,vyprvpn_user,vyprvpn_reconnect,vyprvpn_analytics'); %></script><script type="text/javascript" src="/user/vyprvpn/js/lib/merge.js"></script><script type="text/javascript">_nvram = nvram; <% nvram('web_css,wan_ipaddr,vyprvpn_username,vyprvpn_password,vyprvpn_location,vyprvpn_protocol,vyprvpn_connected_ip,vyprvpn_connection_time,vyprvpn_app_version') %> if (typeof merge !== 'undefined') { nvram = merge(nvram,_nvram); }</script><script type="text/javascript">_console=console;</script><script type="text/javascript" src="/tomato.js"></script><script type="text/javascript">console=_console;</script></head><body id="settings" class="vyprbody"><div id="content"><div id="waiting" hidden data-vypr-visible-if-status="updating"></div><div data-vypr-role="messagewrap" class="vypr--messagewrap"><p class="vypr--message layout-global" data-vypr-role="template"><button class="type-icon vypr--message-close" data-vypr-action="message-close"><i class="ir i-close">X</i></button> <i class="ir i-message vypr--message-icon">!</i> <span class="vypr--message-text" data-vypr-role="message-text"></span></p></div><div class="sectiontitle type-major" data-vypr-visible-if-status="online">Settings</div><div id="vypr-settings-sections" hidden data-vypr-visible-if-status="online"><div class="sectiontitle">Connection</div><div class="section" id="vypr-setting-connection"><div class="view settingslist vypr--formfields-wrap size-auto"><div class="autosaveblock layout-paragraph" id="vypr-setting-reconnect-block"><div class="settingslist-item"><input class="settingslist-item-field vypr--formfields-input" type="checkbox" id="vypr-setting-reconnect" value="1"/><label class="settingslist-item-label" for="vypr-setting-reconnect">Automatically reconnect when disconnected</label><div class="settingslist-item"><label class="settingslist-item-label" for="vypr-setting-reconnect-limit">Reconnection attempts:</label><span class="vypr--formfields-selectwrap type-inline"><select class="settingslist-item-field vypr--formfields-input" id="vypr-setting-reconnect-limit"><option value="1">1 time</option><option value="5">5 times</option><option value="10">10 times</option><option value="20" selected="selected">20 times</option></select></span></div></div><i class="ir i-status autosaveblock-icon position-top-right">&hellip;</i></div><div class="autosaveblock layout-paragraph" id="vypr-setting-analytics-block"><div class="settingslist-item"><input class="settingslist-item-field vypr--formfields-input" type="checkbox" id="vypr-setting-analytics" value="1"/><label class="settingslist-item-label" for="vypr-setting-analytics">Help improve VyprVPN by sending non-personally identifiable app data</label></div><i class="ir i-status autosaveblock-icon position-right">&hellip;</i></div></div></div><div class="sectiontitle">VyprVPN Router App</div><div class="section" id="vypr-setting-application"><div class="view"><dl><dt>Current Version:</dt><dd><b><var id="vypr-app-version-current"></var></b></dd></dl><div hidden data-vypr-visible-if-update="none"><p><small>We check for updates once a day. Click the button below to check for an update now.</small></p><p><button type="button" id="vypr--app-update-check" data-vypr-action="update-check" class="type-unknown">Check for Updates</button> <span data-vypr-role="messagewrap" class="vypr--messagewrap"><span class="vypr--message layout-local layout-indented" data-vypr-role="template"><i class="ir i-message vypr--message-icon">!</i> <span class="vypr--message-text" data-vypr-role="message-text"></span></span></span></p></div><div hidden data-vypr-visible-if-update="app" class="changelog"><span class="changelog-notice">Update Available!</span><dl class="changelog-title"><dt>VyprVPN Router App</dt><dd><var id="vypr-app-version-latest"></var></dd></dl><div id="vypr-app-changelog" class="changelog-content"></div><ul class="vypr--binarydisplay changelog-warning" id="vypr--app-update-notice"><li class="vypr--binarydisplay-item is-true"><p class="vypr--message layout-local"><span class="vypr--message-text">This update will require a reboot.</span></p></li></ul><button type="button" id="vypr--app-update-start" data-vypr-action="update-start" class="type-success changelog-button">Update Now</button></div></div></div><div class="sectiontitle">Account</div><div class="section" id="vypr-setting-account"><div class="view settingslist" hidden data-vypr-visible-if-status="logged"><p class="settingslist-item"><span class="settingslist-item-key">Username:</span> <var class="settingslist-item-value" id="vypr--logged-in-username">username@example.com</var></p><p><a href="//www.goldenfrog.com/controlpanel" target="_blank" class="link">Manage Account Settings</a></p><button type="button" id="vypr--logout-button" class="type-danger">Log Out</button></div><div class="view" hidden data-vypr-visible-if-status="not-logged"><button type="button" id="vypr--login-button" data-vypr-action="login" class="type-primary">Log In</button></div></div></div></div></body></html>