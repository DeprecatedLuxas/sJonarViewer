const CracoAlias = require("craco-alias");

const path = require('path')
module.exports = {
    reactScriptsVersion: "react-scripts",
    webpack: {
        alias: {
            Test: path.resolve(__dirname, "public")
        },
        plugins: [
        ],
        configure: (webpackConfig, {env, paths}) => { 
            
            return webpackConfig; 
        }
    },
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: "tsconfig",
                baseUrl: "../",
                tsConfigPath: "./tsconfig.paths.json"
            }
        },
        {
            plugin: {
                overrideWebpackConfig: ({ webpackConfig, cracoConfig, pluginOptions, context: {
                    paths
                }}) => {
                    const absolutePath = path.resolve(paths.appPath, pluginOptions.path);
                    const moduleScopePlugin = webpackConfig.resolve.plugins.find(plugin => plugin.appSrcs && plugin.allowedFiles);

                    if (moduleScopePlugin) {
                        moduleScopePlugin.appSrcs.push(absolutePath);
                    }

                    webpackConfig.resolve.alias = Object.assign(webpackConfig.resolve.alias, {
                        [pluginOptions.path]: absolutePath,
                      });
                  
                    return webpackConfig;
                }
            },
            options: {
                path: "../config.json"
            }
        }
    ]
}