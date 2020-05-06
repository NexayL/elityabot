module.exports = (client) => {
    client.user.setPresence({
        game: {
            name: "?help For help"
        }
    });
};
