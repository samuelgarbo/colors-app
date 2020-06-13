// // Small devices (landscape phones, 576px and up)
// @media (min-width: 576px) { ... }

// // Medium devices (tablets, 768px and up)
// @media (min-width: 768px) { ... }

// // Large devices (desktops, 992px and up)
// @media (min-width: 992px) { ... }

// // Extra large devices (large desktops, 1200px and up)
// @media (min-width: 1200px) { ... }

export default {
        
    down(size){
        const breakPoints = {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px'
        };
        return `@media(max-width: ${breakPoints[size]})`
    }
}