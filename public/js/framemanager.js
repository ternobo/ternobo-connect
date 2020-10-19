var TernoboEmbed = {
    currentFrameId: '',
    currentFrameHeight: 0,
    lastFrameId: '',
    lastFrameHeight: 0,
    resizeTimerId: null,

    init: function () {
        if (TernoboEmbed.resizeTimerId === null) {
            TernoboEmbed.resizeTimerId = window.setInterval(TernoboEmbed.resizeFrames, 500);
        }
    },

    resizeFrames: function () {
        TernoboEmbed.retrieveFrameIdAndHeight();
        if ((TernoboEmbed.currentFrameId !== TernoboEmbed.lastFrameId) || (TernoboEmbed.currentFrameHeight !== TernoboEmbed.lastFrameHeight)) {
            var iframe = document.getElementById(TernoboEmbed.currentFrameId.toString());
            if (iframe === null)
                return;

            iframe.style.height = TernoboEmbed.currentFrameHeight.toString() + "px";

            TernoboEmbed.lastFrameId = TernoboEmbed.currentFrameId;
            TernoboEmbed.lastFrameHeight = TernoboEmbed.currentFrameHeight;
            window.location.hash = '';
            iframe.removeAttribute("onload");
        }

    },

    retrieveFrameIdAndHeight: function () {

        if (window.location.hash.length == 0)
            return;

        var hashValue = window.location.hash.substring(1);

        if ((hashValue == null) || (hashValue.length == 0))
            return;

        var pairs = hashValue.split('&');

        if ((pairs != null) && (pairs.length > 0)) {

            for (var i = 0; i < pairs.length; i++) {

                var pair = pairs[i].split('=');

                if ((pair != null) && (pair.length > 0)) {

                    if (pair[0] == 'frameId') {

                        if ((pair[1] != null) && (pair[1].length > 0)) {

                            TernoboEmbed.currentFrameId = pair[1];
                        }
                    } else if (pair[0] == 'height') {

                        var height = parseInt(pair[1]);

                        if (!isNaN(height)) {

                            TernoboEmbed.currentFrameHeight = height;
                            TernoboEmbed.currentFrameHeight += 15;

                        }
                    }
                }
            }
        }

    },

    registerFrame: function (frame) {

        var currentLocation = location.href;
        var hashIndex = currentLocation.indexOf('#');

        if (hashIndex > -1) {

            currentLocation = currentLocation.substring(0, hashIndex);
        }

        frame.contentWindow.location = frame.src + '?frameId=' + frame.id + '#' + currentLocation;
        frame.removeAttribute("onload");
    }
};

window.setTimeout(TernoboEmbed.init, 300);
window.TernoboEmbed = TernoboEmbed;