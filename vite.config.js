import {defineConfig} from "vite";
import module from 'module'

export default defineConfig({
    ssr: {
        external: module.builtinModules,
        noExternal: true,
        optimizeDeps: {
            disabled: false
        }
    },
    build: {
        ssr: true,
        commonjsOptions: {
            include: [],
        },
        rollupOptions: {
            input: './index.js',
            external: module.builtinModules,
        }
    }
})
