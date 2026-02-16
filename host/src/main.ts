import "./app.postcss";
import { initFederation } from "@softarc/native-federation";

(async () => {
  try {
    // Only attempt federation in development mode
    const isDevelopment = location.hostname.includes("localhost") || location.hostname.includes("127.0.0.1");

    if (isDevelopment) {
      try {
        // Load federation config
        let mfesConfig;
        try {
          const response = await fetch("/mfes-config.json");
          if (!response.ok) {
            throw new Error(`Failed to fetch mfes-config.json: ${response.status}`);
          }
          mfesConfig = await response.json();
        } catch (configError) {
          console.warn("Could not load mfes-config.json:", configError);
          // Default config for development
          mfesConfig = {
            remote: `${location.protocol}//${location.host.split(':')[0]}:4174/remoteEntry.json`
          };
        }

        console.log("Federation config (dev):", mfesConfig);

        try {
          await initFederation(mfesConfig);
          console.log("Federation initialized successfully");
        } catch (federationError) {
          console.warn("Federation initialization failed (remote may not be available):", federationError);
          // Continue without remote modules
        }
      } catch (error) {
        console.warn("Skipping federation setup:", error);
      }
    } else {
      // Production: Skip federation since remote isn't deployed
      console.log("Production mode: Skipping federation setup (remote not deployed)");
    }

    await import("./bootstrap");
  } catch (error) {
    console.error("Fatal error during app initialization:", error);
    // Attempt to load bootstrap even if federation failed
    try {
      await import("./bootstrap");
    } catch (bootstrapError) {
      console.error("Failed to load bootstrap:", bootstrapError);
    }
  }
})();
