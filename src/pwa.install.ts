export function install() {
    window.addEventListener('beforeinstallprompt', (e) => {
        deferredPrompt = e;
        console.log(e);
        e.promt();
    });
}