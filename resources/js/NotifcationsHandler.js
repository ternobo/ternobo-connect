
function sendNotification(title, body, icon) {
    return new Notification(title, {
        body: body,
        icon: icon
    });
}

function showAnnouncement(data) {
    let notificationEvent = new CustomEvent('announcement:new', {
        bubbles: true,
        detail: {
            announcement: data.message
        }
    });
    document.dispatchEvent(notificationEvent);
}

function setupNotifications(vue_app) {

    document.addEventListener('ternobo:userloaded', event => {
        let notification = new Audio("/sounds/notification1.mp3")

        let user = event.detail.user;

        if (user) {
            window.Echo.connector.socket.on("connection", () => {
                Echo.connector.socket.emit("clientInfo", { user_id: user.id, name: user.username });
            });

            if (window.hasOwnProperty("Notification")) {
                Notification.requestPermission();
            }



            //*********************************************************************** */
            // Setup Notitication Channel
            const notificationChannel = window.Echo.private("notification." + user.id);

            notificationChannel.listen("NotificationEvent", function (data) {
                let notificationEvent = new CustomEvent('notification:new', {
                    bubbles: true,
                    detail: {
                        notification: data.message
                    }
                });
                document.dispatchEvent(notificationEvent);
                vue_app.$store.$emit("addUnreadNotification");
            });
            //*********************************************************************** */




            //*********************************************************************** */
            // Setup Announcement Channel
            const announcementChannel = window.Echo.private("announcement");
            announcementChannel.listen("AnnouncementEvent", function (data) {
                showAnnouncement(data);
            });
            const userAnnouncementChannel = window.Echo.private("user." + user.id);
            userAnnouncementChannel.listen("AnnouncementEvent", function (data) {
                showAnnouncement(data);
            });
            //*********************************************************************** */


            //*********************************************************************** */
            // Setup Chat Channel
            const chatChannel = window.Echo.private("ternobo-chat.user." + user.id);
            chatChannel.listen("\\Ternobo\\TernoboChat\\Events\\MessageEvent", function (data) {
                if (!data.muted) {
                    if (vue_app.$store.state.url != "/chats") {
                        vue_app.$store.commit("addUnreadMessage");
                    }
                    notification.play();
                    if (window.hasOwnProperty("Notification") && Notification.permission == 'granted') {
                        sendNotification(data.message.sender.name, data.message.sender.name + ": " + (data.message.text != null ? data.message.text : data.message.type), window.location.origin + '/favicon-32x32.png');
                    }
                }

                let messageEvent = new CustomEvent('message:new', {
                    bubbles: true,
                    detail: {
                        message: data.message
                    }
                });
                document.dispatchEvent(messageEvent);
            });
            //*********************************************************************** */
        }

    });
}

export default setupNotifications;