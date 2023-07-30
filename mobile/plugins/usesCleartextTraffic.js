const { createRunOncePlugin, withAndroidManifest } = require('@expo/config-plugins')

const usesCleartextTraffic = (config) => {
    return withAndroidManifest(config, (config) => {
        const { modResults } = config
        const { manifest } = modResults

        if (!Array.isArray(manifest.application)) {
            console.warn('usesCleartextTraffic: No application array in manifest')
            return modResults
        }

        const application = manifest.application.length > 0 && manifest.application[0]

        if (!application) {
            console.warn("usesCleartextTraffic: No .MainApplication")
            return modResults
        }

        manifest.$ = {
            ...manifest.$,
            'xmlns:tools': 'http://schemas.android.com/tools',
        }

        application.$['tools:replace'] = 'android:usesCleartextTraffic'
        application.$['android:usesCleartextTraffic'] = 'true'

        return config
    })
}

module.exports = createRunOncePlugin(
    usesCleartextTraffic,
    'usesCleartextTraffic',
    '1.0.0'
)