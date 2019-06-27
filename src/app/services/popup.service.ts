import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable()
export class PopupService{
    constructor(private alertController: AlertController){}

    async showPopup(message: string, title?: string): Promise<HTMLIonAlertElement>{
        let popup = await this.alertController.create({
            message: message,
            header: title,
            buttons: ['OK']
        })
        await popup.present();
        return popup;
    }

    async dismiss(popup: HTMLIonAlertElement){
        await popup.dismiss();
    }
}