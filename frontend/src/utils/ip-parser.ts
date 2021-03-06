

export function convertIpToInteger(ip: string) {
    return (
        ip.split(".").reduce((ipInt: number, octet: string) => {
            return (ipInt << 8) + parseInt(octet, 10);
        }, 0) >>> 0
    );
}
export function convertIntegerToIp(ipInt: number) {
    return (
        (ipInt >>> 24) +
        "." +
        ((ipInt >> 16) & 255) +
        "." +
        ((ipInt >> 8) & 255) +
        "." +
        (ipInt & 255)
    );
}

