import { Injectable } from '@angular/core';

@Injectable()
export class PwaInstallService{
    constructor(){
        console.log('pwa service start');
        window.addEventListener('beforeinstallprompt', (e: any) => {
            console.log(e);
            e.promt();
        });
    }
}