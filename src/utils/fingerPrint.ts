import FingerprintJS from '@fingerprintjs/fingerprintjs';

export async function createFingerPrint(){
    const fingerPrintPromise = await FingerprintJS.load();
    const result = await fingerPrintPromise.get();
    return result.visitorId;
}
