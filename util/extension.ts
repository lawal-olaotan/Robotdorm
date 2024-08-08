const environment = process.env.NEXT_PUBLIC_DEVENV
export const extensionId = () => {
    const id = environment !== 'production' ? "eekndbllknniickgmngbbalepibpkfff" : "iebnenlmoeolohhmbjilijlgpjbjljhm"
    return id
} 

