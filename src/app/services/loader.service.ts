import { LoadingController } from '@ionic/angular';
import { Constants } from '../shared/common/constants';
import { Injectable } from '@angular/core';

@Injectable()
export class LoaderService{

    constructor(private loadingController: LoadingController){}

    async showLoader(message?: string): Promise<HTMLIonLoadingElement>{
        let loader = await this.loadingController.create({
            message: (message)?message:Constants.pleaseWaitMessage
        });
        loader.present();
        return loader;
    }

    async dismissLoader(loader: HTMLIonLoadingElement){
        await loader.dismiss();
    }
}