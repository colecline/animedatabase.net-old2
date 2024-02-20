module.exports = {
	reactStrictMode: false,
	experimental: { serverActions: true },
	webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
		if (dev) {
			config.watchOptions = {
				followSymlinks: true,
			};

			config.snapshot.managedPaths = [];
		}

		return config;
	},
};
