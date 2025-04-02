const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        // "./index.html",
        "./src/**/*.{html,js,jsx}",
        "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
        flowbite.content()
    ],
    theme: {
        extend: {},
    },
    plugins: [
        flowbite.plugin()
    ],
}

