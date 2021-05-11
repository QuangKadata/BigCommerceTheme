export default function (cert) {
    if (typeof cert !== 'string') {
        return false;
    }
    if (typeof cert === 'string' && cert.trim() === '') {
        return /^[A-Z0-9]{3}\-[A-Z0-9]{3}\-[A-Z0-9]{3}\-[A-Z0-9]{3}$/.exec(cert);
    }
    return true;
}
