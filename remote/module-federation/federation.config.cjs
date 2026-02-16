const {
  withNativeFederation,
} = require("@softarc/native-federation/build");

module.exports = withNativeFederation({
  name: "remote",
  exposes: {
    "./remote-mediaplayer": "./src/MediaPlayer.svelte"
  },
  shared: {},
  skipSharingNextInternals: true
});
