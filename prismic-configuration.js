import Prismic from 'prismic-javascript'

// Prismic API endpoint
export const apiEndpoint = 'https://sodium4agency.cdn.prismic.io/api/v2'

// Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
export const accessToken =
    'MC5ZRnp0ZXhNQUFDTUFPT0Rs.77-977-9dwU577-977-9fu-_ve-_ve-_vVrvv73vv71x77-977-9SBR577-9Ke-_ve-_ve-_ve-_ve-_vQPvv73vv73vv73vv70'

// Client method to query Prismic
export const client = Prismic.client(apiEndpoint, { accessToken })
