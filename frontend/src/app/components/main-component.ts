import { Component, inject, input } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { LocaleService } from "../services/locale.service";

@Component({
    selector: 'app-main-component',
    template: `
        <router-outlet />
    `,
    imports: [RouterOutlet]
})
export class MainComponent {
    private readonly translate = inject(TranslateService);
    private readonly localeService = inject(LocaleService);

    locale = input.required<string>()

    constructor() {
        this.translate.addLangs(['fr-FR', 'en-US']);
        this.translate.setDefaultLang('fr-FR');
    }
}