;(function () {
    'use strict';

    /**
     * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
     *
     * @codingstandard ftlabs-jsv2
     * @copyright The Financial Times Limited [All Rights Reserved]
     * @license MIT License (see LICENSE.txt)
     */

    /*jslint browser:true, node:true*/
    /*global define, Event, Node*/


    /**
     * Instantiate fast-clicking listeners on the specified layer.
     *
     * @constructor
     * @param {Element} layer The layer to listen on
     * @param {Object} [options={}] The options to override the defaults
     */
    function FastClick(layer, options) {
        var oldOnClick;

        options = options || {};

        /**
         * Whether a click is currently being tracked.
         *
         * @type boolean
         */
        this.trackingClick = false;


        /**
         * Timestamp for when click tracking started.
         *
         * @type number
         */
        this.trackingClickStart = 0;


        /**
         * The element being tracked for a click.
         *
         * @type EventTarget
         */
        this.targetElement = null;


        /**
         * X-coordinate of touch start event.
         *
         * @type number
         */
        this.touchStartX = 0;


        /**
         * Y-coordinate of touch start event.
         *
         * @type number
         */
        this.touchStartY = 0;


        /**
         * ID of the last touch, retrieved from Touch.identifier.
         *
         * @type number
         */
        this.lastTouchIdentifier = 0;


        /**
         * Touchmove boundary, beyond which a click will be cancelled.
         *
         * @type number
         */
        this.touchBoundary = options.touchBoundary || 10;


        /**
         * The FastClick layer.
         *
         * @type Element
         */
        this.layer = layer;

        /**
         * The minimum time between tap(touchstart and touchend) events
         *
         * @type number
         */
        this.tapDelay = options.tapDelay || 200;

        /**
         * The maximum time for a tap
         *
         * @type number
         */
        this.tapTimeout = options.tapTimeout || 700;

        if (FastClick.notNeeded(layer)) {
            return;
        }

        // Some old versions of Android don't have Function.prototype.bind
        function bind(method, context) {
            return function() { return method.apply(context, arguments); };
        }


        var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
        var context = this;
        for (var i = 0, l = methods.length; i < l; i++) {
            context[methods[i]] = bind(context[methods[i]], context);
        }

        // Set up event handlers as required
        if (deviceIsAndroid) {
            layer.addEventListener('mouseover', this.onMouse, true);
            layer.addEventListener('mousedown', this.onMouse, true);
            layer.addEventListener('mouseup', this.onMouse, true);
        }

        layer.addEventListener('click', this.onClick, true);
        layer.addEventListener('touchstart', this.onTouchStart, false);
        layer.addEventListener('touchmove', this.onTouchMove, false);
        layer.addEventListener('touchend', this.onTouchEnd, false);
        layer.addEventListener('touchcancel', this.onTouchCancel, false);

        // Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
        // which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
        // layer when they are cancelled.
        if (!Event.prototype.stopImmediatePropagation) {
            layer.removeEventListener = function(type, callback, capture) {
                var rmv = Node.prototype.removeEventListener;
                if (type === 'click') {
                    rmv.call(layer, type, callback.hijacked || callback, capture);
                } else {
                    rmv.call(layer, type, callback, capture);
                }
            };

            layer.addEventListener = function(type, callback, capture) {
                var adv = Node.prototype.addEventListener;
                if (type === 'click') {
                    adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
                            if (!event.propagationStopped) {
                                callback(event);
                            }
                        }), capture);
                } else {
                    adv.call(layer, type, callback, capture);
                }
            };
        }

        // If a handler is already declared in the element's onclick attribute, it will be fired before
        // FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
        // adding it as listener.
        if (typeof layer.onclick === 'function') {

            // Android browser on at least 3.2 requires a new reference to the function in layer.onclick
            // - the old one won't work if passed to addEventListener directly.
            oldOnClick = layer.onclick;
            layer.addEventListener('click', function(event) {
                oldOnClick(event);
            }, false);
            layer.onclick = null;
        }
    }

    /**
     * Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
     *
     * @type boolean
     */
    var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

    /**
     * Android requires exceptions.
     *
     * @type boolean
     */
    var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


    /**
     * iOS requires exceptions.
     *
     * @type boolean
     */
    var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


    /**
     * iOS 4 requires an exception for select elements.
     *
     * @type boolean
     */
    var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


    /**
     * iOS 6.0-7.* requires the target element to be manually derived
     *
     * @type boolean
     */
    var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

    /**
     * BlackBerry requires exceptions.
     *
     * @type boolean
     */
    var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

    /**
     * Determine whether a given element requires a native click.
     *
     * @param {EventTarget|Element} target Target DOM element
     * @returns {boolean} Returns true if the element needs a native click
     */
    FastClick.prototype.needsClick = function(target) {
        switch (target.nodeName.toLowerCase()) {

            // Don't send a synthetic click to disabled inputs (issue #62)
            case 'button':
            case 'select':
            case 'textarea':
                if (target.disabled) {
                    return true;
                }

                break;
            case 'input':

                // File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
                if ((deviceIsIOS && target.type === 'file') || target.disabled) {
                    return true;
                }

                break;
            case 'label':
            case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
            case 'video':
                return true;
        }

        return (/\bneedsclick\b/).test(target.className);
    };


    /**
     * Determine whether a given element requires a call to focus to simulate click into element.
     *
     * @param {EventTarget|Element} target Target DOM element
     * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
     */
    FastClick.prototype.needsFocus = function(target) {
        switch (target.nodeName.toLowerCase()) {
            case 'textarea':
                return true;
            case 'select':
                return !deviceIsAndroid;
            case 'input':
                switch (target.type) {
                    case 'button':
                    case 'checkbox':
                    case 'file':
                    case 'image':
                    case 'radio':
                    case 'submit':
                        return false;
                }

                // No point in attempting to focus disabled inputs
                return !target.disabled && !target.readOnly;
            default:
                return (/\bneedsfocus\b/).test(target.className);
        }
    };


    /**
     * Send a click event to the specified element.
     *
     * @param {EventTarget|Element} targetElement
     * @param {Event} event
     */
    FastClick.prototype.sendClick = function(targetElement, event) {
        var clickEvent, touch;

        // On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
        if (document.activeElement && document.activeElement !== targetElement) {
            document.activeElement.blur();
        }

        touch = event.changedTouches[0];

        // Synthesise a click event, with an extra attribute so it can be tracked
        clickEvent = document.createEvent('MouseEvents');
        clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
        clickEvent.forwardedTouchEvent = true;
        targetElement.dispatchEvent(clickEvent);
    };

    FastClick.prototype.determineEventType = function(targetElement) {

        //Issue #159: Android Chrome Select Box does not open with a synthetic click event
        if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
            return 'mousedown';
        }

        return 'click';
    };


    /**
     * @param {EventTarget|Element} targetElement
     */
    FastClick.prototype.focus = function(targetElement) {
        var length;

        // Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
        if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
            length = targetElement.value.length;
            targetElement.setSelectionRange(length, length);
        } else {
            targetElement.focus();
        }
    };


    /**
     * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
     *
     * @param {EventTarget|Element} targetElement
     */
    FastClick.prototype.updateScrollParent = function(targetElement) {
        var scrollParent, parentElement;

        scrollParent = targetElement.fastClickScrollParent;

        // Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
        // target element was moved to another parent.
        if (!scrollParent || !scrollParent.contains(targetElement)) {
            parentElement = targetElement;
            do {
                if (parentElement.scrollHeight > parentElement.offsetHeight) {
                    scrollParent = parentElement;
                    targetElement.fastClickScrollParent = parentElement;
                    break;
                }

                parentElement = parentElement.parentElement;
            } while (parentElement);
        }

        // Always update the scroll top tracker if possible.
        if (scrollParent) {
            scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
        }
    };


    /**
     * @param {EventTarget} targetElement
     * @returns {Element|EventTarget}
     */
    FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

        // On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
        if (eventTarget.nodeType === Node.TEXT_NODE) {
            return eventTarget.parentNode;
        }

        return eventTarget;
    };


    /**
     * On touch start, record the position and scroll offset.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onTouchStart = function(event) {
        var targetElement, touch, selection;

        // Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
        if (event.targetTouches.length > 1) {
            return true;
        }

        targetElement = this.getTargetElementFromEventTarget(event.target);
        touch = event.targetTouches[0];

        if (deviceIsIOS) {

            // Only trusted events will deselect text on iOS (issue #49)
            selection = window.getSelection();
            if (selection.rangeCount && !selection.isCollapsed) {
                return true;
            }

            if (!deviceIsIOS4) {

                // Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
                // when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
                // with the same identifier as the touch event that previously triggered the click that triggered the alert.
                // Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
                // immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
                // Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
                // which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
                // random integers, it's safe to to continue if the identifier is 0 here.
                if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
                    event.preventDefault();
                    return false;
                }

                this.lastTouchIdentifier = touch.identifier;

                // If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
                // 1) the user does a fling scroll on the scrollable layer
                // 2) the user stops the fling scroll with another tap
                // then the event.target of the last 'touchend' event will be the element that was under the user's finger
                // when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
                // is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
                this.updateScrollParent(targetElement);
            }
        }

        this.trackingClick = true;
        this.trackingClickStart = event.timeStamp;
        this.targetElement = targetElement;

        this.touchStartX = touch.pageX;
        this.touchStartY = touch.pageY;

        // Prevent phantom clicks on fast double-tap (issue #36)
        if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
            event.preventDefault();
        }

        return true;
    };


    /**
     * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.touchHasMoved = function(event) {
        var touch = event.changedTouches[0], boundary = this.touchBoundary;

        if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
            return true;
        }

        return false;
    };


    /**
     * Update the last position.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onTouchMove = function(event) {
        if (!this.trackingClick) {
            return true;
        }

        // If the touch has moved, cancel the click tracking
        if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
            this.trackingClick = false;
            this.targetElement = null;
        }

        return true;
    };


    /**
     * Attempt to find the labelled control for the given label element.
     *
     * @param {EventTarget|HTMLLabelElement} labelElement
     * @returns {Element|null}
     */
    FastClick.prototype.findControl = function(labelElement) {

        // Fast path for newer browsers supporting the HTML5 control attribute
        if (labelElement.control !== undefined) {
            return labelElement.control;
        }

        // All browsers under test that support touch events also support the HTML5 htmlFor attribute
        if (labelElement.htmlFor) {
            return document.getElementById(labelElement.htmlFor);
        }

        // If no for attribute exists, attempt to retrieve the first labellable descendant element
        // the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
        return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
    };


    /**
     * On touch end, determine whether to send a click event at once.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onTouchEnd = function(event) {
        var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

        if (!this.trackingClick) {
            return true;
        }

        // Prevent phantom clicks on fast double-tap (issue #36)
        if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
            this.cancelNextClick = true;
            return true;
        }

        if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
            return true;
        }

        // Reset to prevent wrong click cancel on input (issue #156).
        this.cancelNextClick = false;

        this.lastClickTime = event.timeStamp;

        trackingClickStart = this.trackingClickStart;
        this.trackingClick = false;
        this.trackingClickStart = 0;

        // On some iOS devices, the targetElement supplied with the event is invalid if the layer
        // is performing a transition or scroll, and has to be re-detected manually. Note that
        // for this to function correctly, it must be called *after* the event target is checked!
        // See issue #57; also filed as rdar://13048589 .
        if (deviceIsIOSWithBadTarget) {
            touch = event.changedTouches[0];

            // In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
            targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
            targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
        }

        targetTagName = targetElement.tagName.toLowerCase();
        if (targetTagName === 'label') {
            forElement = this.findControl(targetElement);
            if (forElement) {
                this.focus(targetElement);
                if (deviceIsAndroid) {
                    return false;
                }

                targetElement = forElement;
            }
        } else if (this.needsFocus(targetElement)) {

            // Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
            // Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
            if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
                this.targetElement = null;
                return false;
            }

            this.focus(targetElement);
            this.sendClick(targetElement, event);

            // Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
            // Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
            if (!deviceIsIOS || targetTagName !== 'select') {
                this.targetElement = null;
                event.preventDefault();
            }

            return false;
        }

        if (deviceIsIOS && !deviceIsIOS4) {

            // Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
            // and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
            scrollParent = targetElement.fastClickScrollParent;
            if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
                return true;
            }
        }

        // Prevent the actual click from going though - unless the target node is marked as requiring
        // real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
        if (!this.needsClick(targetElement)) {
            event.preventDefault();
            this.sendClick(targetElement, event);
        }

        return false;
    };


    /**
     * On touch cancel, stop tracking the click.
     *
     * @returns {void}
     */
    FastClick.prototype.onTouchCancel = function() {
        this.trackingClick = false;
        this.targetElement = null;
    };


    /**
     * Determine mouse events which should be permitted.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onMouse = function(event) {

        // If a target element was never set (because a touch event was never fired) allow the event
        if (!this.targetElement) {
            return true;
        }

        if (event.forwardedTouchEvent) {
            return true;
        }

        // Programmatically generated events targeting a specific element should be permitted
        if (!event.cancelable) {
            return true;
        }

        // Derive and check the target element to see whether the mouse event needs to be permitted;
        // unless explicitly enabled, prevent non-touch click events from triggering actions,
        // to prevent ghost/doubleclicks.
        if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

            // Prevent any user-added listeners declared on FastClick element from being fired.
            if (event.stopImmediatePropagation) {
                event.stopImmediatePropagation();
            } else {

                // Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
                event.propagationStopped = true;
            }

            // Cancel the event
            event.stopPropagation();
            event.preventDefault();

            return false;
        }

        // If the mouse event is permitted, return true for the action to go through.
        return true;
    };


    /**
     * On actual clicks, determine whether this is a touch-generated click, a click action occurring
     * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
     * an actual click which should be permitted.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onClick = function(event) {
        var permitted;

        // It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
        if (this.trackingClick) {
            this.targetElement = null;
            this.trackingClick = false;
            return true;
        }

        // Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
        if (event.target.type === 'submit' && event.detail === 0) {
            return true;
        }

        permitted = this.onMouse(event);

        // Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
        if (!permitted) {
            this.targetElement = null;
        }

        // If clicks are permitted, return true for the action to go through.
        return permitted;
    };


    /**
     * Remove all FastClick's event listeners.
     *
     * @returns {void}
     */
    FastClick.prototype.destroy = function() {
        var layer = this.layer;

        if (deviceIsAndroid) {
            layer.removeEventListener('mouseover', this.onMouse, true);
            layer.removeEventListener('mousedown', this.onMouse, true);
            layer.removeEventListener('mouseup', this.onMouse, true);
        }

        layer.removeEventListener('click', this.onClick, true);
        layer.removeEventListener('touchstart', this.onTouchStart, false);
        layer.removeEventListener('touchmove', this.onTouchMove, false);
        layer.removeEventListener('touchend', this.onTouchEnd, false);
        layer.removeEventListener('touchcancel', this.onTouchCancel, false);
    };


    /**
     * Check whether FastClick is needed.
     *
     * @param {Element} layer The layer to listen on
     */
    FastClick.notNeeded = function(layer) {
        var metaViewport;
        var chromeVersion;
        var blackberryVersion;
        var firefoxVersion;

        // Devices that don't support touch don't need FastClick
        if (typeof window.ontouchstart === 'undefined') {
            return true;
        }

        // Chrome version - zero for other browsers
        chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

        if (chromeVersion) {

            if (deviceIsAndroid) {
                metaViewport = document.querySelector('meta[name=viewport]');

                if (metaViewport) {
                    // Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
                    if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
                        return true;
                    }
                    // Chrome 32 and above with width=device-width or less don't need FastClick
                    if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
                        return true;
                    }
                }

                // Chrome desktop doesn't need FastClick (issue #15)
            } else {
                return true;
            }
        }

        if (deviceIsBlackBerry10) {
            blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

            // BlackBerry 10.3+ does not require Fastclick library.
            // https://github.com/ftlabs/fastclick/issues/251
            if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
                metaViewport = document.querySelector('meta[name=viewport]');

                if (metaViewport) {
                    // user-scalable=no eliminates click delay.
                    if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
                        return true;
                    }
                    // width=device-width (or less than device-width) eliminates click delay.
                    if (document.documentElement.scrollWidth <= window.outerWidth) {
                        return true;
                    }
                }
            }
        }

        // IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
        if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
            return true;
        }

        // Firefox version - zero for other browsers
        firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

        if (firefoxVersion >= 27) {
            // Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

            metaViewport = document.querySelector('meta[name=viewport]');
            if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
                return true;
            }
        }

        // IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
        // http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
        if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
            return true;
        }

        return false;
    };


    /**
     * Factory method for creating a FastClick object
     *
     * @param {Element} layer The layer to listen on
     * @param {Object} [options={}] The options to override the defaults
     */
    FastClick.attach = function(layer, options) {
        return new FastClick(layer, options);
    };


    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

        // AMD. Register as an anonymous module.
        define(function() {
            return FastClick;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = FastClick.attach;
        module.exports.FastClick = FastClick;
    } else {
        window.FastClick = FastClick;
    }
}());


//以上是FastClick库，是为了处理ios端的click时间中300毫秒延时

Date.prototype.format = function(fmt) {
     var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt;
}
// 以上是日期格式化函数

function closeWin() {
	api.sendEvent({
	    name:'new_init'
    });
    api.closeWin();
}

//自定义打开新窗口
function open_window(windir,winname,pageobj) {
    if(!pageobj){
        pageobj = {};//默认赋值
    }
    api.openWin({
        name: winname,
        url: 'widget://html/'+windir+'/'+winname+'.html',
        pageParam: pageobj
    });
}

function go_back_url(frm_name) {
    api.historyBack({
        frameName: frm_name
    }, function(ret, err) {
        if (!ret.status) {
            //api.closeWin();
        }
    });
}

function body_click_init() {
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
            FastClick.attach(document.body);
        }, false);
    }
}

//0:iPhone 1:Android
function ismobile(test){
    var u = navigator.userAgent, app = navigator.appVersion;
    if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
        if(window.location.href.indexOf("?mobile")<0){
            try{
                if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)){
                    return '0';
                }else{
                    return '1';
                }
            }catch(e){}
        }
    }else if( u.indexOf('iPad') > -1){
        return '0';
    }else{
        return '1';
    }
};
if(ismobile() == 0){
    body_click_init();
}else{
    //console.log('is Android');
}

function server(){
var mq = api.require('meiQia');

	var param = {
	    appkey: "f61ca5079cf2ef691b1ea3afdf53370f"
	};

	mq.initMeiQia(param, function(ret, err) {
	    if (ret) {

	        console.log(JSON.stringify(ret));
	        mq.show();
	    } else {


	    }
	})

}


function focus(){//解决IOS端的input无法再次点击的问题

	if(api.systemType=='ios'){
		var softInput = api.require('softInputMgr');
	    softInput.toggleKeyboard();
	}
}
function openKeyup(id){
  var softInput = api.require('softInputMgr');
   if(api.systemType=='android') return;
   softInput.toggleKeyboard();
   // 将相应的输入框获取焦点
   document.getElementById(id).focus()
}
function check_login(windir,winname,pageobj){

		var token = $api.getStorage('token');
		if(!token){
      if(!pageobj){
          pageobj = {};//默认赋值
      }
			api.openWin({
	            name: 'login_win',
	            url: 'widget://html/login/index.html',
              bgColor:"#fff",
	            animation:{
	            	type:"movein",
	            	subType:"from_bottom",
	            	duration:300
	            },
              pageParam: pageobj
	        });
		}else{
			open_window(windir,winname)
		}

}

function is_login(){
  var token = $api.getStorage('token');
  if(!token){
      api.openWin({
          name: 'login_win',
          url: 'widget://html/login/index.html',
          bgColor:"#fff",
          animation:{
            type:"movein",
            subType:"from_bottom",
            duration:300
          }
      });

      return;
  }

}

function open_meiQia() {
    var mq = api.require('meiQia');//配置初始化美洽需要的appkey
    var param = {
        appkey: "f61ca5079cf2ef691b1ea3afdf53370f"//初始化美洽
    };
    mq.initMeiQia(param, function(ret, err) {
        if (ret) {
            //初始化成功
            mq.setTitleColor({
                color: "#4A4A4A"
            });
            mq.setTitleBarColor({
                color: "#ffffff"//设置标题栏背景颜色
            });
            mq.show();
        } else {

            alert(JSON.stringify(err));//初始化失败
        }
    })
}


function resize(){
	var winHeight = $(window).height();   //获取当前页面高度
		$(window).resize(function(){
		   var thisHeight=$(this).height();
      //  console.log(thisHeight)
		    if(winHeight - thisHeight >50){
		         $("footer").hide();
		    }else{
		        $("footer").show();

		    }
		});
}

function get_data(name){

	var td = api.require('talkingData');
	   td.onPageStart({pageName:name});
	   td.onPageEnd({pageName:name});
}
function err_ajax(err){
  if(err.statusCode==500||err.statusCode==404){
      api.toast({
          msg: '请求失败，服务端异常！',
          duration: 2000,
          location: 'bottom'
      });

  }else{
    api.toast({
        msg: '加载失败，请检查网络连接',
        duration: 2000,
        location: 'bottom'
    });
  }
}
function is_lon_lat(callBack){

    //验证照相、相册、存储、通知权限（有需要可以继续增加，详看对应文档）https://docs.apicloud.com/Client-API/api#hasPermission
    var resultList = api.hasPermission({
        list:['location']
    });

    var _permission = new Array();
    for (var i = 0; i < resultList.length; i++) {
        if(resultList[i].granted == false){
            _permission.push(resultList[i].name);
        }
    }

    if(!!_permission && JSON.stringify(_permission) != '[]'){
        api.requestPermission({
            list:_permission,
            code:1
        }, function(ret, err){
            for (var i = 0; i < ret.list.length; i++) {
              if(ret.list[i].granted == false){
                  api.confirm({
                      title: '缺少权限，将导致部分功能无法使用',
                      msg: '请确认开启对应权限。',
                      buttons: ['确定开启', '取消']
                  }, function(ret, err) {
                      if(ret.buttonIndex == 1){
                        is_lon_lat(callBack);
                      }else{
                          return;
                      }

                  });
              }else{
                  return;
              }
            }
        });
    }else{
        return;
    }
}

// 海报点击展开
var haibaoPicList=document.getElementsByClassName("haibao-pic");
var haibaoTextList=document.getElementsByClassName("haibao-text");
var showBtnList=document.getElementsByClassName("show-btn");
	
function haibaoShow(index){
	haibaoPicList[index].style.width = "75%";
 	haibaoTextList[index].style.display = "block";
    showBtnList[index].innerHTML=">>";
    showBtnList[index].href="javascript:haibaoHide("+index+");";
}

function haibaoHide(index){
	haibaoPicList[index].style.width = "100%";
    haibaoTextList[index].style.display='none';
    showBtnList[index].innerHTML="<<";
    showBtnList[index].href="javascript:haibaoShow("+index+");";
}




var base_url = "http://192.168.3.68:8082";  ///workers-web
//var upload_url = "http://duomi.yunxiaochengxu.top";//七牛云

var uploadModuleOrFunctionFiles_url = base_url + '/center/uploadModuleOrFunctionFiles';//图片上传
var uploadModuleOrFunctionFile_url = base_url + '/center/uploadModuleOrFunctionFile';//图片上传
//首页
var icon_list_url = base_url + '/dyapp/index/icon_list';//首页五个图标
var association_list_url  = base_url + '/dyapp/index/association_list';//协会列表
var association_detail_url = base_url + '/dyapp/index/association_detail';//协会详情
var dynamic_detail_url = base_url + '/dyapp/index/dynamic_detail';//协会 动态/规程/政策详情
var home_dynamic_url = base_url + '/dyapp/index/home_dynamic';//首页协会动态
//通用赛事
var matchs_list_url = base_url + '/dyapp/index/matchs_list';//赛事列表 首页推荐 协会 钓场 数据
var matchs_detail_url = base_url + '/dyapp/index/matchs_detail';//賽事詳情
var vedios_list_url = base_url + '/dyapp/index/vedios_list';//协会视频列表
var address_data_list_url = base_url + '/dyapp/index/data_list';//地址列表 赛事筛选
var my_match_coupon_url = base_url + '/dyapp/index/my_match_coupon';//我的参赛卷
var my_match_coupon_detail_url = base_url + '/dyapp/index/my_match_coupon_detail';//我的参赛卷详情
//钓场
var angling_site_list_url = base_url + '/dyapp/angling/angling_site_list';//钓场列表




var park_match_url = base_url + '/dyapp/index/park_match';//立即报名 (不收费)
var part_match_wxpay_url = base_url + '/dyapp/wx/part_match_wxpay';//自营协会赛事报名微信支付
var part_match_alipay_url = base_url + '/dyapp/alipay/part_match_alipay';//自营协会赛事报名支付宝支付

//banners
var index_banners_url = base_url + '/dyapp/index/banners';//Banner
//登录
var pass_account_url = base_url + '/dyapp/login/pass_login';//登录 1
var login_url = base_url + '/dyapp/login/login';//创建账号登录 1
var wx_login_url = base_url + '/dyapp/login/wx_login';//微信登陆 1
var send_reg_code_url = base_url + '/dyapp/login/send_reg_code';//创建账号登录 1
var forget_password_url = base_url + '/dyapp/login/forget_password';//忘记密码发送验证码 1
var pass_code_url = base_url + '/dyapp/login/pass_code';//忘记密码判断验证码 1
var check_code_url = base_url + '/dyapp/login/check_code';//判断登陆验证码是否正确 1
var reset_pwd_url = base_url + '/dyapp/login/reset_pwd';//忘记密码保存  1
var wx_send_reg_code_url = base_url + '/dyapp/login/wx_send_reg_code';//微信登陆手机获取验证码 1
var wx_check_code_url = base_url + '/dyapp/login/wx_check_code';//微信登陆判断验证码 1
// 我的修改手机号
var show_phone_url = base_url + '/dyapp/login/show_phone';//更换手机号时显示当前登录的手机号 1
var update_password_url = base_url + '/dyapp/login/update_password';//密码修改 1
var next_step_url = base_url + '/dyapp/login/next_step';//更换手机号点击下一步 1
var information_change_getMobileCode_url = base_url + '/dyapp/login/information_change_getMobileCode';//信息变更发送验证码
var new_phone_save_url = base_url+ '/dyapp/login/new_phone_save';//绑定新手机号点击确认 1
var wx_unbind_url = base_url + '/dyapp/login/wx_unbind';//微信解绑 1
var wx_binding_url = base_url + '/dyapp/login/wx_binding';//微信绑定 1
var xy_url = base_url + '/dyapp/my/user_agreement';//协议  1
var policy_url = base_url + '/dyapp/my/privacy_policy';//政策  1


// pick
var pick_list_url = base_url + '/dyapp/pick/pick_list';//资讯列表
var pick_detail_url = base_url + '/dyapp/pick/pick_detail';//资讯详情

// 入驻
var shopEnterNotice_url=base_url+'/dyapp/shop/shopEnterNotice'; //商铺入驻介绍
var shopType_url=base_url+'/dyapp/shop/shopType'; // 商铺入驻时要选择的商铺类型
var shopEnterSub_url=base_url+'/dyapp/shop/shopEnterSub'; //商铺入驻提交
var shopAuditList_url=base_url+'/dyapp/shop/shopAuditList'; //提交审核后跳转的审核列表
var shopAttestationAliPay_url=base_url+'/dyapp/shopAlipay/shopAttestationAliPay'; //商铺认证 支付宝支付
var shopAttestationWxPay_url=base_url+'/dyapp/shopWxPay/shopAttestationWxPay' ;// 商铺认证 微信支付

// 商铺
var shopList_url=base_url+'/dyapp/shop/shopList'; //商铺列表
var shopDetail_url=base_url+'/dyapp/shop/shopDetail'; //点击商铺到商铺详情
var checkShopCollect_url=base_url+'/dyapp/shop/checkShopCollect'; //商铺收藏、取消收藏
var goodsList_url=base_url+'/dyapp/goods/goodsList'; //商品列表（商铺下面的商品、专区下面的商品，二级分类下的商品，搜索，销量，价格排序）
var classifyOneList_url=base_url+'/dyapp/goods/classifyOneList';  //首页商品的一级分类
var classifyList_url=base_url+'/dyapp/goods/classifyList'; //点击更多查看商品的一二级分类
var choicenessShopList_url=base_url+'/dyapp/goods/choicenessShopList'; // 精选商家列表
var recommendedForYou_url=base_url+'/dyapp/goods/recommendedForYou' ; //为你推荐列表
var prefectureList_url=base_url+'/dyapp/goods/prefectureList'; //首页显示每个专区的两个商品
var goodDetail_url=base_url+'/dyapp/goods/goodDetail'; //商品详情
var goodColl_url=base_url+'/dyapp/goods/goodColl' ; //商品收藏、取消收藏
var findEvaluatesByProductId_url=base_url+'/dyapp/goods/findEvaluatesByProductId' ; //查看该商品的所有评论
var goodSpec_url=base_url+'/dyapp/goods/goodSpec'; //商品规格
var addGoodNum_url=base_url+'/dyapp/goods/addGoodNum'; //商品详情规格添加数量
var selectCart_url=base_url+'/dyapp/cart/selectCart'; //购物车全选与全不选
var cartNum_url=base_url+'/dyapp/cart/cartNum'; //商城中购物车数量
// 购物车
var cartAdd_url=base_url+'/dyapp/cart/cartAdd' ; //加入购物车
var goodsSubmit_url=base_url+'/dyapp/goods/goodsSubmit' ; //立即购买 到确认订单页面
var goodsWxBuy_url=base_url+'/dyapp/goodWxPay/goodsWxBuy' ; //商品直接立即购买 微信支付
var goodsAlipayBuy_url=base_url+'/dyapp/goodAlipay/goodsAlipayBuy' ; //商品直接立即购买 支付宝支付
var cartList_url=base_url+'/dyapp/cart/cartList'; //购物车列表
var cartSubmit_url=base_url+'/dyapp/cart/cartSubmit';//点击购物车提交到确认订单页面
var checkCart_url=base_url+'/dyapp/cart/checkCart'; //单选和取消勾选;
var addToCartGoodNum_url=base_url+'/dyapp/cart/addToCartGoodNum'; //购物车添加数量
var minusToCartGoodNum_url=base_url+'/dyapp/cart/minusToCartGoodNum';//购物车减数量
var cartDelete_url=base_url+'/dyapp/cart/cartDelete';  //清空商品和删除单个商品
var shopCartSelect_url=base_url+'/dyapp/cart/shopCartSelect'; //购物车商铺的全选与不选
var cartWxBuy_url=base_url+'/dyapp/goodWxPay/cartWxBuy';  //购物车提交 微信支付
var cartAlipayBuy_url=base_url+'/dyapp/goodAlipay/cartAlipayBuy'; //购物车 支付宝支付
var shopCartSelect_url=base_url+'/dyapp/cart/shopCartSelect'  ;//购物车商铺的全选与不选


// mine
var addressList_url=base_url+'/dyapp/address/addressList' ;//地址列表
var addAddress_url=base_url+'/dyapp/address/addAddress' ; ///添加收货地址
var addressDel_url=base_url+'/dyapp/address/addressDel' ; //收货地址删除
var addressById_url=base_url+'/dyapp/address/addressById' ; //根据id查看地址详情
var addressUpdate_url=base_url+'/dyapp/address/addressUpdate' ; //地址修改

//order
var orderList_url=base_url+'/dyapp/goodsOrder/orderList' ;//我的订单列表
var confirmDelivery_url=base_url+'/dyapp/goodsOrder/confirmDelivery';// 确认收货
var cancelOrder_url=base_url+'/dyapp/goodsOrder/cancelOrder'; //取消订单
var productOrderById_url=base_url+'/dyapp/goodsOrder/productOrderById';  //根据订单id查看商品订单详情
var refundCauseList_url=base_url+'/dyapp/goodsOrder/refundCauseList';  //申请退款原因
var refundApply_url=base_url+'/dyapp/goodsOrder/refundApply';  //商品的订单列表中点击退款
var refundProgress_url=base_url+'/dyapp/goodsOrder/refundProgress';  //退款详情进展
var evaluateList_url=base_url+'/dyapp/goodsOrder/evaluateList'  ;//评价中心 商品
var addGoodEvaluate_url=base_url+'/dyapp/goodsOrder/addGoodEvaluate'; //添加商品评价
var checkGoodEvaluate_url=base_url+'/dyapp/goodsOrder/checkGoodEvaluate' ;//查看订单商品评论
var logisticsInformation_url=base_url+'/dyapp/goodsOrder/logisticsInformation' ;//物流信息
var orderAlipayBuy_url=base_url+'/dyapp/goodAlipay/orderAlipayBuy' ; //订单列表中的订单提交 支付宝支付
var orderWxBuy_url=base_url+'/dyapp/goodWxPay/orderWxBuy'; //订单列表中的订单提交 微信支付
var logisticsInformation_url=base_url+'/dyapp/goodsOrder/logisticsInformation'; //物流信息
