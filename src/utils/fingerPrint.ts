import FingerprintJS from '@fingerprintjs/fingerprintjs';

const fingerPrintPromise = FingerprintJS.load();

export async function createFingerPrint(){
    const fp = await fingerPrintPromise;
    const result = await fp.get();
    return result.visitorId;
}
