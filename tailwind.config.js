export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx,html}'
    ],
    theme: {
        extend: {
            colors: {
                'flags-fundo': {
                    alto: "#A6E7D8",
                    medio: "#9598FD",
                    baixo: "#FFC5C5"
                },
                'flags-texto': {
                    alto: "#008767",
                    medio: "#0004FF",
                    baixo: "#DF0404"
                }
            },
            screens: {
                mobile: '980px',
                tablet: '1130px',
                laptop: '1351px',
                fullhd: '1897px',
            },
            fontFamily: {},
        },
    },
    plugins: [],
}
