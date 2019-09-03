export function install() {
    window.addEventListener('beforeinstallprompt', (e: any) => {
        console.log(e);
        e.promt();
    });
}